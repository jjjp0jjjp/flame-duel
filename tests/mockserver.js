// 本機模擬：提供遊戲頁面 + /api/ws，房間規則與 Cloudflare 上的 Room 相同
const http = require('http'), crypto = require('crypto'), fs = require('fs');
const FILE = process.argv[2], PORT = +process.argv[3] || 8790;
const ICE = process.env.ICE ? JSON.parse(process.env.ICE) : [];
const rooms = new Map(); // code -> {host, guest, specs}
const stats = { opened: 0, msgs: 0 };
// 和正式版相同的依 IP 限流（GATE 環境變數可調低來測試）
let gateHit = null; import('../rooms-worker/src/gate.js').then((m) => { gateHit = m.gateHit; });
const GATE = +process.env.GATE || 40, hits = new Map();
function frame(str, op = 1) {
  const p = Buffer.from(str); let h;
  if (p.length < 126) h = Buffer.from([0x80 | op, p.length]);
  else if (p.length < 65536) { h = Buffer.alloc(4); h[0] = 0x80 | op; h[1] = 126; h.writeUInt16BE(p.length, 2); }
  else { h = Buffer.alloc(10); h[0] = 0x80 | op; h[1] = 127; h.writeBigUInt64BE(BigInt(p.length), 2); }
  return Buffer.concat([h, p]);
}
function mkSock(sock, onMsg, onClose) {
  let buf = Buffer.alloc(0), closed = false;
  const S = {
    open: true,
    send: (o) => { if (S.open) sock.write(frame(JSON.stringify(o))); },
    close: (code = 1000) => { if (!S.open) return; S.open = false; const b = Buffer.alloc(2); b.writeUInt16BE(code); sock.write(Buffer.concat([Buffer.from([0x88, 2]), b])); setTimeout(() => sock.destroy(), 50); fin(); },
  };
  const fin = () => { if (closed) return; closed = true; S.open = false; onClose(S); };
  sock.on('data', (d) => {
    buf = Buffer.concat([buf, d]);
    for (;;) {
      if (buf.length < 2) return;
      const op = buf[0] & 15; let len = buf[1] & 127, off = 2;
      if (len === 126) { if (buf.length < 4) return; len = buf.readUInt16BE(2); off = 4; }
      else if (len === 127) { if (buf.length < 10) return; len = Number(buf.readBigUInt64BE(2)); off = 10; }
      const masked = buf[1] & 128; const mk = masked ? buf.slice(off, off + 4) : null; if (masked) off += 4;
      if (buf.length < off + len) return;
      const pl = Buffer.from(buf.slice(off, off + len)); if (mk) for (let i = 0; i < pl.length; i++) pl[i] ^= mk[i & 3];
      buf = buf.slice(off + len);
      if (op === 8) { S.close(1000); return; }
      if (op === 9) { sock.write(Buffer.concat([Buffer.from([0x8a, pl.length]), pl])); continue; }
      if (op === 1) onMsg(S, pl.toString());
    }
  });
  sock.on('close', fin); sock.on('error', fin);
  return S;
}
const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/' || u.pathname === '/index.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(fs.readFileSync(FILE)); return; }
  if (u.pathname === '/__stats') { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ ...stats, rooms: [...rooms.entries()].map(([k, v]) => [k, !!v.host, !!v.guest]) })); return; }
  res.writeHead(404); res.end('not found');
});
server.on('upgrade', (req, sock) => {
  const u = new URL(req.url, 'http://x');
  const code = u.searchParams.get('code') || '', role = u.searchParams.get('role');
  if (u.pathname !== '/api/ws' || !/^\d{4}$/.test(code)) { sock.end('HTTP/1.1 400 Bad Request\r\n\r\n'); return; }
  const acc = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + acc + '\r\n\r\n');
  stats.opened++;
  const R = rooms.get(code) || { host: null, guest: null, specs: new Map() };
  if (role === 'host' && !rooms.has(code)) rooms.set(code, R);
  const alive = (s) => s && s.open;
  const S = mkSock(sock, (s, msg) => {
    stats.msgs++; s.n = (s.n || 0) + 1;
    if (s.n > (s.role === 'host' && s.watch ? 400 : 40) || msg.length > 20000) { s.close(4002); return; }
    let o; try { o = JSON.parse(msg); } catch (e) { return; }
    if (!o) return;
    if (s.role === 'host' && ['open', 'playing', 'idle'].includes(o.t)) { if (o.t === 'open') s.watch = 1; else s.playing = o.t === 'playing'; return; }
    if (!['offer', 'answer', 'ice', 'bye'].includes(o.t)) return;
    if (s.role === 'spec') { if (alive(R.host)) R.host.send({ t: o.t, s: o.s, from: s.id }); return; }
    if (s.role === 'host' && typeof o.to === 'string') { const sp = R.specs.get(o.to); if (alive(sp)) sp.send({ t: o.t, s: o.s }); return; }
    const other = s.role === 'host' ? R.guest : R.host; if (alive(other)) other.send(o);
  }, (s) => {
    if (!s.role) return;
    if (s.role === 'spec') { R.specs.delete(s.id); if (alive(R.host)) R.host.send({ t: 'specleft', id: s.id }); return; }
    if (s.role === 'host') for (const sp of R.specs.values()) if (alive(sp)) sp.send({ t: 'left' });
    if (R[s.role] === s) R[s.role] = null;
    const other = s.role === 'host' ? R.guest : R.host; if (alive(other)) other.send({ t: 'left' });
    if (!R.host && !R.guest && !R.specs.size) rooms.delete(code);
  });
  const reject = (t) => { S.send({ t }); S.close(4000); };
  const ip = req.socket.remoteAddress || ''; if (!hits.has(ip)) hits.set(ip, []);
  if (gateHit && !gateHit(hits.get(ip), Date.now(), GATE)) return reject('slow');
  if (role === 'host') { if (alive(R.host)) return reject('taken'); S.role = 'host'; R.host = S; S.send({ t: 'hosted' }); }
  else if (role === 'spec') { if (!alive(R.host)) return reject('noroom'); if (!R.host.watch) return reject('nowatch'); if (R.specs.size >= 8) return reject('specfull'); S.role = 'spec'; S.id = Math.random().toString(36).slice(2, 8); R.specs.set(S.id, S); R.host.send({ t: 'spec', id: S.id, ice: ICE }); S.send({ t: 'watching', ice: ICE }); }
  else if (role === 'guest') { if (!alive(R.host)) return reject('noroom'); if (alive(R.guest) || R.host.playing) return reject('full'); S.role = 'guest'; R.guest = S; R.host.send({ t: 'peer', ice: ICE }); S.send({ t: 'joined', ice: ICE }); }
  else reject('bad');
});
server.listen(PORT, () => console.log('mock on', PORT));
