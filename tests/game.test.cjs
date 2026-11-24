// 遊戲本體自動測試（不需伺服器，直接開 file://）
//   node tests/game.test.cjs
// 1. 兩個版本都能載入，各模式隨機亂按 2000 幀不出錯
// 2. 確定性：同樣的輸入跑兩次，狀態雜湊必須相同
// 3. 回滾一致性：從中途快照 loadAll() 後重跑，結果必須和沒回滾時相同（連線對戰靠這個）
// 4. 每個角色的連段挑戰都打得出來（對五個角色、多種距離）
// 5. 新手教學可以從頭走到完成
const { chromium } = require('playwright');
const path = require('path');
const url = (f) => 'file://' + path.resolve(__dirname, '..', f);
let fails = 0;
const ok = (name, cond, detail) => {
  console.log((cond ? 'PASS ' : 'FAIL ') + name + (detail ? '  ' + detail : ''));
  if (!cond) fails++;
};

(async () => {
  const b = await chromium.launch();
  for (const f of ['index.html', 'claude-artifact/fighter_v2.html']) {
    const pg = await b.newPage();
    const errs = [];
    pg.on('pageerror', (e) => errs.push(e.message));
    await pg.goto(url(f));
    await pg.waitForTimeout(200);
    await pg.evaluate(() => {
      for (const m of [1, 2, 3]) {
        for (let c = 0; c < CH.length; c++) {
          sel[0] = c; sel[1] = (c + 2) % CH.length; startGame(m); G.vs = 0;
          for (let i = 0; i < 2000; i++) {
            for (const k of ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'KeyU', 'KeyI', 'KeyJ', 'KeyK', 'KeyO', 'KeyL', 'ArrowLeft', 'ArrowRight', 'KeyZ', 'KeyC']) {
              keys[k] = Math.random() < 0.2 ? 1 : 0; if (keys[k]) pend[k] = 1;
            }
            step(); if (i % 50 === 0) draw();
          }
          G.pause = false; toMenu();
        }
      }
    });
    ok(f + ' 載入並執行各模式', errs.length === 0, errs.slice(0, 3).join(' | '));
    await pg.close();
  }

  const pg = await b.newPage();
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto(url('index.html'));
  await pg.waitForTimeout(200);

  // ---- 確定性與回滾一致性
  const det = await pg.evaluate(() => {
    const KS = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'KeyU', 'KeyI', 'KeyJ', 'KeyK', 'KeyO', 'KeyL', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyZ', 'KeyX', 'KeyV', 'KeyB', 'KeyC', 'KeyN'];
    const res = [];
    const hash = () => rbFnv(canon(JSON.parse(snapAll())));
    for (let seed = 1; seed <= 6; seed++) {
      let s = seed * 7919;
      const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
      const N = 3000, inp = [];
      for (let i = 0; i < N; i++) inp.push(KS.map((k) => (rand() < (k.includes('A') || k.includes('D') || k.includes('Arrow') ? 0.35 : 0.12) ? 1 : 0)));
      const run = (from, snap) => {
        if (snap) loadAll(snap);
        let mid = null;
        for (let i = from; i < N; i++) {
          if (i === 1500) mid = snapAll();
          KS.forEach((k, j) => { keys[k] = inp[i][j]; if (keys[k]) pend[k] = 1; });
          step();
        }
        return [hash(), mid];
      };
      const setup = () => { sel[0] = seed % 5; sel[1] = (seed * 3) % 5; G.stage = seed % STG.length; startGame(2); G.vs = 0; for (const k in pend) pend[k] = 0; };
      setup(); const [h1, mid] = run(0);
      setup(); const [h2] = run(0);
      setup(); run(0); const [h3] = run(1500, mid);
      res.push([seed, h1, h2, h3, p1.wins + p2.wins]);
    }
    return res;
  });
  ok('確定性：同輸入兩次結果相同', det.every((r) => r[1] === r[2]), JSON.stringify(det.map((r) => r.slice(1, 3))));
  ok('回滾一致性：快照載入後重跑結果相同', det.every((r) => r[1] === r[3]));

  // ---- 重播：打完一整局 → 打包成連結 → 解碼重播，最後狀態必須完全相同
  const rp = await pg.evaluate(async () => {
    const out = [];
    const KS = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'KeyU', 'KeyI', 'KeyJ', 'KeyK', 'KeyO', 'KeyL', 'ArrowLeft', 'ArrowRight', 'KeyZ', 'KeyC'];
    // 比對遊戲狀態（不含按鍵邊緣偵測 v1/v2 與電腦 AI 的內部計時，重播時兩者都用不到）
    const hash = () => { const o = JSON.parse(snapAll()); delete o.v1; delete o.v2; delete o.a.ai; delete o.b.ai; return rbFnv(canon(o)) };
    for (const m of [1, 2]) {
      for (let c = 0; c < 5; c += 2) {
        sel[0] = c; sel[1] = (c + 1) % 5; startGame(m); G.vs = 0;
        for (let i = 0; i < 30000 && G.phase !== 'over'; i++) {
          for (const k of KS) { if (Math.random() < 0.06) { keys[k] = keys[k] ? 0 : 1; if (keys[k]) pend[k] = 1 } } // 按住一段時間才換，接近真人
          step();
        }
        for (const k in keys) keys[k] = 0;
        const si = G.si, h = hash(), link = await codeEnc(rpPack());
        const o = await codeDec(link);
        startReplay(o); G.vs = 0;
        while (G.si < si) step();
        out.push({ m, c, si, len: link.length, same: hash() === h, over: G.phase === 'over' });
        RP = null; toMenu();
      }
    }
    return out;
  });
  ok('重播：重播結果和原本完全相同', rp.every((r) => r.same && r.over), JSON.stringify(rp.map((r) => [r.m, r.si, r.same])));
  ok('重播連結長度合理（< 12000 字）', rp.every((r) => r.len < 12000), rp.map((r) => r.len).join(','));

  // ---- 街機模式流程（讓對手直接倒地，檢查關卡順序、魔王、接關、通關紀錄、設定還原）
  const arc = await pg.evaluate(() => {
    localStorage.removeItem('fd_arc');
    sel[0] = 2; sel[1] = 0; G.diff = 0; G.stage = 1;
    arcStart();
    const seen = [], log = [];
    let lost = false;
    for (let guard = 0; guard < 20 && ARC && !ARC.done; guard++) {
      G.vs = 0; seen.push(p2.ch.n + (p2.hm ? '×' + p2.hm : '') + '/難度' + G.diff);
      while (G.phase !== 'over') {
        if (G.phase === 'fight') { if (!lost && ARC.i === 1) { p1.st = 'ko'; } else p2.st = 'ko'; }
        step();
      }
      log.push(ARC.res);
      if (ARC.res === 'lose') lost = true;
      arcNext();
    }
    const done = !!(ARC && ARC.done), rec = localStorage.getItem('fd_arc');
    toMenu();
    return { seen, log, done, rec, diff: G.diff, stage: G.stage, cont: JSON.parse(rec || '{}')[2] };
  });
  ok('街機：5 位對手各一次、最後是強化版的自己', arc.seen.length === 6 && new Set(arc.seen.map((s) => s[0])).size === 5 && /^影×1.3\/難度2$/.test(arc.seen[5]), arc.seen.join(' → '));
  ok('街機：輸了可以接關再戰同一位', arc.log.join(',') === 'win,lose,win,win,win,win' && arc.seen[1] === arc.seen[2], arc.log.join(','));
  ok('街機：通關後記錄接關次數，回選單還原難度與場景', arc.done && arc.cont === 1 && arc.diff === 0 && arc.stage === 1, JSON.stringify(arc));

  // ---- 連段挑戰
  const tr = await pg.evaluate(() => {
    const KM = { lp: ['lp'], hp: ['hp'], lk: ['lk'], hk: ['hk'], jab: ['f', 'lp'], lunge: ['f', 'hp'], push: ['f', 'lk'], spin: ['f', 'hk'], flip: ['b', 'hk'], upper: ['d', 'lp'], sweep: ['d', 'lk'], sp: ['sp'], sp2: ['f', 'sp'], sp3: ['b', 'sp'], ex: ['d', 'sp'], ap: ['lp'], ak: ['lk'], asp: ['sp'] };
    const H0 = human, out = [];
    function run(c, ti, dist, o) {
      sel[0] = c; sel[1] = o; startGame(3); G.vs = 0;
      while (G.phase !== 'fight') step();
      TR.tr = ti; TR.seq = []; TR.ok = 0; p1.x = 380; p2.x = 380 + dist;
      const seq = TRIALS[c][ti]; let idx = 0, last = null, wait = false;
      human = (k) => {
        const i = Object.assign({}, NI); if (k !== K1 || idx >= seq.length) return i;
        if (wait) { if (p1.atk && p1.atk !== last) { last = p1.atk; wait = false } else return i }
        if (!(idx === 0 || (p1.atk === last && p1.hit && p1.t > p1.atk.su) || actable(p1))) return i;
        for (const x of KM[seq[idx]]) { if (x === 'f') i[p1.dir > 0 ? 'r' : 'l'] = 1; else if (x === 'b') i[p1.dir > 0 ? 'l' : 'r'] = 1; else i[x] = 1 }
        idx++; wait = true; return i;
      };
      for (let f = 0; f < 300 && !TR.ok; f++) step();
      human = H0; return TR.ok;
    }
    TRIALS.forEach((L, c) => L.forEach((seq, ti) => {
      let pass = false;
      for (const d of [60, 75, 90]) { if ([0, 1, 2, 3, 4].every((o) => run(c, ti, d, o))) { pass = true; break } }
      if (!pass) out.push(CH[c].n + ' ' + seq.join('→'));
    }));
    return out;
  });
  ok('連段挑戰全部打得出來', tr.length === 0, tr.join('；'));

  // ---- 新手教學
  const tut = await pg.evaluate(() => {
    const S = (n, ks) => { for (let i = 0; i < n; i++) { for (const k in keys) keys[k] = 0; (ks || []).forEach((k) => { keys[k] = 1; pend[k] = 1 }); step() } };
    const tap = (k, n = 1) => { S(1, [k]); S(n) };
    const near = () => { for (let i = 0; i < 60 && Math.abs(p1.x - p2.x) > 75; i++) S(1, ['KeyD']) };
    tutStart(); while (G.phase !== 'fight') step();
    S(50, ['KeyD']); tap('KeyW', 40); tap('KeyD', 3); tap('KeyD', 20);
    near(); tap('KeyU', 30); near(); tap('KeyK', 40); tap('KeyO', 60);
    for (let t = 0; t < 5 && TUT.i === 6; t++) { p1.x = 400; p2.x = 470; tap('KeyU', 6); tap('KeyI', 40) }
    S(400, ['KeyS']); S(1, ['KeyS', 'KeyO']); S(30);
    return TUT ? TUT.i + '/' + TUT.L.length : 'done';
  });
  ok('新手教學可以完成', tut === '9/9', tut);
  ok('測試過程沒有錯誤', errs.length === 0, errs.slice(0, 3).join(' | '));
  await b.close();
  console.log(fails ? fails + ' 項失敗' : '全部通過');
  process.exit(fails ? 1 : 0);
})();
