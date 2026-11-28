// 招式幀數表：在模擬裡實際打一次，量每招的起手、傷害、被防／命中後的優劣幀，並挑出離群的招式
//   node tools/frames.cjs            全部角色的摘要＋離群清單
//   node tools/frames.cjs 烈          只列這個角色的完整表
//   node tools/frames.cjs --json      輸出 JSON（給其他工具用）
//   PATCH='CH[0].mv.hp={d:13}' node tools/frames.cjs 烈    先試調數值再量
// 優劣幀＝對手能行動的幀 − 自己能行動的幀（正數＝自己先動）。KD＝對手倒地／被打飛。
const { chromium } = require('playwright');
const path = require('path');
const arg = process.argv.slice(2), JSONOUT = arg.includes('--json'), ONLY = arg.find((a) => !a.startsWith('--'));
// 地面招式與輸入
const MOVES = ['lp', 'hp', 'lk', 'hk', 'jab', 'lunge', 'push', 'spin', 'blp', 'bhp', 'flip', 'upper', 'dhp', 'dlk', 'sweep', 'sp', 'sp2', 'sp3', 'sp4', 'ex'];
const SLOT = { lp: '輕拳', hp: '重拳', lk: '輕腳', hk: '重腳', jab: '→輕拳', lunge: '→重拳', push: '→輕腳', spin: '→重腳', blp: '←輕拳', bhp: '←重拳', flip: '←重腳', upper: '↓輕拳', dhp: '↓重拳', dlk: '↓輕腳', sweep: '↓重腳', sp: '必殺', sp2: '→必殺', sp3: '←必殺', sp4: '↓投', ex: '超必殺' };
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage();
  pg.on('pageerror', (e) => console.error('頁面錯誤', e.message));
  await pg.addInitScript(() => { window.requestAnimationFrame = () => 0 });
  await pg.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  if (process.env.PATCH) await pg.evaluate(process.env.PATCH);
  const data = await pg.evaluate((MOVES) => {
    NOFX = 1; mute = true; const H0 = human;
    // 一次試打：對手在 dist 距離，blk＝是否正確防禦；回傳 null 表示沒打到
    const once = (c, m, dist, blk) => {
      sel[0] = c; sel[1] = 4; G.stage = 0; startGame(2); G.vs = 0; while (G.phase !== 'fight') step();
      p1.x = 300; p2.x = 300 + dist; p1.dir = 1; p2.dir = -1; p1.mt = 100; p2.mt = 0; p2.gd = 100;
      let low = false;
      human = (K) => { if (K === K1) return NI; return blk ? Object.assign({}, NI, { l: 0, r: 1, d: low ? 1 : 0 }) : NI };
      if (!p1.start(m)) return null;
      const a = p1.atk; low = !!a.low; if (a.throw && blk) return null;
      const hp0 = p2.hp; let res = null, t1 = 0, t2 = 0, kd = false, n = 0, su = null;
      while (n++ < 240) {
        step(); if (G.phase !== 'fight') break;
        if (!res && (p2.st === 'hit' || (p2.st === 'block' && p2.stun > 0) || p2.hp < hp0)) { res = p2.st === 'block' ? 'blk' : 'hit'; su = n }
        if (res) {
          if (p2.kd || p2.st === 'down' || (res === 'hit' && p2.y < GY - 4)) kd = true;
          if (!t1 && actable(p1)) t1 = n; if (!t2 && actable(p2)) t2 = n;
          if (t1 && t2) break;
        } else if (actable(p1) && n > 3) return null; // 招式結束了還沒打到
      }
      if (!res) return null;
      return { res, su, dmg: Math.round((hp0 - p2.hp) * 10) / 10, adv: kd ? 'KD' : (t1 && t2 ? t2 - t1 : null), cost: a.cost || 0, thr: !!a.throw, inv: !!a.inv, gb: !!a.gb, low: !!a.low, ovh: !!a.ovh, proj: a.type === 'proj' || a.type === 'strike', tot: a.su + a.ac + a.rc };
    };
    const out = [];
    for (let c = 0; c < CH.length; c++) {
      const row = { n: CH[c].n, mv: {} };
      for (const m of MOVES) {
        if ((m === 'sp4' && !CH[c].sp4) || (m !== 'sp4' && m in { sp: 1, sp2: 1, sp3: 1, ex: 1 } && !CH[c][m])) continue;
        let h = null, bl = null, d0 = 0;
        for (const d of [70, 100, 140, 190, 260, 360]) { h = once(c, m, d, false); if (h) { d0 = d; break } }
        if (!h) { row.mv[m] = { miss: 1 }; continue }
        bl = once(c, m, d0, true);
        row.mv[m] = { su: h.su, dmg: h.dmg, hit: h.adv, blk: bl ? (bl.res === 'blk' ? bl.adv : '破防') : '—', d: d0, cost: h.cost, thr: h.thr, inv: h.inv, gb: h.gb, low: h.low, ovh: h.ovh, proj: h.proj, tot: h.tot };
      }
      out.push(row);
    }
    human = H0; NOFX = 0; return out;
  }, MOVES);
  await b.close();
  if (JSONOUT) { console.log(JSON.stringify(data)); return }
  const pad = (s, n) => { s = String(s); let w = 0; for (const ch of s) w += ch.charCodeAt(0) > 255 ? 2 : 1; return s + ' '.repeat(Math.max(0, n - w)) };
  const fmt = (v) => (typeof v === 'number' ? (v > 0 ? '+' : '') + v : v == null ? '?' : v);
  const show = (row) => {
    console.log(`\n${row.n}　招式　　　　起手  傷害  命中後  被防後  距離  屬性`);
    for (const m of MOVES) { const x = row.mv[m]; if (!x) continue; if (x.miss) { console.log('　' + pad(SLOT[m], 12) + '（量不到：打不中木樁）'); continue }
      console.log('　' + pad(SLOT[m], 12) + pad(x.su, 6) + pad(x.dmg, 6) + pad(fmt(x.hit), 8) + pad(fmt(x.blk), 8) + pad(x.d, 6) + [x.thr ? '投' : '', x.inv ? '無敵' : '', x.gb ? '破防' : '', x.low ? '下段' : '', x.ovh ? '中段' : '', x.proj ? '飛行' : '', x.cost ? x.cost + '氣' : ''].filter(Boolean).join('・')) }
  };
  if (ONLY) { const r = data.find((x) => x.n === ONLY); if (r) show(r); else console.log('找不到角色 ' + ONLY); return }
  // 已確認是角色特色、刻意保留的離群項（新的離群項才需要處理）
  const KNOWN = { '影 輕拳': '速度型角色，輕攻擊較安全', '影 輕腳': '速度型角色，輕攻擊較安全', '岩 →重拳': '有霸體但起手 15 幀，傷害補償慢', '蠍 ↓輕拳': '傷害含 60 幀中毒' };
  // 離群：同一個位置（例如 →重拳）跟其他角色比，傷害或被防優劣幀差太多；以及明顯過強的組合
  const flags = [], known = [];
  for (const m of MOVES) {
    const all = data.map((r) => [r.n, r.mv[m]]).filter(([, x]) => x && !x.miss);
    for (const grp of [all.filter(([, x]) => x.thr), all.filter(([, x]) => !x.thr)]) { const xs = grp; if (xs.length < 3) continue;
    const st = (f) => { const v = xs.map(([, x]) => f(x)).filter((v) => typeof v === 'number'); const mu = v.reduce((s, x) => s + x, 0) / v.length, sd = Math.sqrt(v.reduce((s, x) => s + (x - mu) ** 2, 0) / v.length) || 1; return [mu, sd] };
    const [dm, ds] = st((x) => x.dmg), [bm, bs] = st((x) => x.blk);
    for (const [n, x] of xs) {
      const why = [];
      if ((x.dmg - dm) / ds > 2 && x.dmg > dm * 1.2) why.push(`傷害 ${x.dmg} 遠高於同位置平均 ${dm.toFixed(1)}`);
      if (typeof x.blk === 'number' && !x.proj && !x.gb && (x.blk - bm) / bs > 2 && x.blk > -2) why.push(`被防後 ${fmt(x.blk)} 遠優於平均 ${fmt(Math.round(bm))}`);
      if (typeof x.blk === 'number' && x.blk >= 3 && !x.proj && !x.gb && (!x.cost || x.cost >= 100)) why.push(`被防後還 ${fmt(x.blk)}（${x.cost >= 100 ? '超必殺被防不該先動' : '可以一直壓制'}）`);
      if (x.su <= 5 && x.dmg >= 12 && !x.cost && !x.inv && (typeof x.blk !== 'number' || x.blk > -10)) why.push(`起手 ${x.su} 幀、${x.dmg} 傷害，被防也不太虧`);
      if (why.length) (KNOWN[n + ' ' + SLOT[m]] ? known : flags).push(`${n} ${SLOT[m]}：${why.join('；')}` + (KNOWN[n + ' ' + SLOT[m]] ? `（${KNOWN[n + ' ' + SLOT[m]]}）` : ''));
    }
    }
  }
  console.log('每位角色：可量到的招式數、平均起手、被防後平均優劣幀、命中倒地招式數');
  for (const r of data) { const v = Object.values(r.mv).filter((x) => !x.miss), bk = v.map((x) => x.blk).filter((x) => typeof x === 'number');
    console.log('　' + pad(r.n, 4) + pad(v.length + ' 招', 7) + pad('起手 ' + (v.reduce((s, x) => s + x.su, 0) / v.length).toFixed(1), 11) + pad('被防 ' + fmt(Math.round(bk.reduce((s, x) => s + x, 0) / (bk.length || 1))), 10) + '倒地 ' + v.filter((x) => x.hit === 'KD').length) }
  console.log('\n需要檢查的離群招式（' + flags.length + '）：' + (flags.length ? '' : '無'));
  flags.forEach((f) => console.log('　' + f));
  if (known.length) { console.log('\n已知、刻意保留（' + known.length + '）：'); known.forEach((f) => console.log('　' + f)) }
})();
