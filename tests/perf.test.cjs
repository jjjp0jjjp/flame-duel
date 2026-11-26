// 效能上限測試：在最吃效能的情況下量每幀耗時（模擬＋繪製），和同一台機器上的一般場景比較。
// 用「倍數」當主要標準，所以 CI 機器慢一點也不會誤報；另有一個寬鬆的絕對上限抓嚴重退化。
//   node tests/perf.test.cjs
const { chromium } = require('playwright');
const path = require('path');
const RATIO_MAX = 3.0, ABS_MAX = 80; // 重場景 p95 不可超過一般場景中位數的 3 倍，也不可超過 80ms
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  await pg.addInitScript(() => { window.requestAnimationFrame = () => 0 });
  await pg.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  const r = await pg.evaluate(() => {
    QM = 1; QA = 0; fitCanvas(); mute = true; ART = 1; OLW = 1.6; OUTX = 2.4;
    const run = (a, c, st, hz, inp, n) => {
      HZ = hz; sel[0] = a; sel[1] = c; G.stage = st; startGame(2); G.vs = 0; while (G.phase !== 'fight') step();
      const H0 = human; let k = 0; human = (K) => Object.assign({}, NI, inp(K === K1 ? 0 : 1, k));
      for (let i = 0; i < 60; i++) { step(); draw(); k++ } // 暖機
      const t = [];
      for (let i = 0; i < n; i++) { if (G.phase !== 'fight') { G.phase = 'fight'; G.time = 60 } p1.mt = p2.mt = 100; p1.hp = Math.max(p1.hp, 50); p2.hp = Math.max(p2.hp, 50); G.time = 60;
        const t0 = performance.now(); step(); draw(); ctx.getImageData(0, 0, 1, 1); t.push(performance.now() - t0); k++ }
      human = H0; HZ = 0; t.sort((x, y) => x - y);
      return { med: t[n >> 1], p95: t[Math.floor(n * .95)], max: t[n - 1], parts: parts.length };
    };
    // 一般：兩人站著走動
    const idle = run(0, 1, 0, 0, (s, k) => (k % 40 < 20 ? { r: 1 } : { l: 1 }), 300);
    // 最重：機甲 vs 雷，兩邊輪流放超必殺與必殺，火山噴發、觀眾歡呼
    const heavy = run(11, 3, 3, 1, (s, k) => { const c = (k + s * 23) % 46; return c === 0 ? { d: 1, sp: 1 } : c === 20 ? { sp: 1 } : c === 30 ? { r: 1, sp: 1 } : {} }, 400);
    return { idle, heavy };
  });
  const ratio = r.heavy.p95 / r.idle.med;
  const f = (o) => `中位數 ${o.med.toFixed(2)}ms  p95 ${o.p95.toFixed(2)}ms  最慢 ${o.max.toFixed(1)}ms`;
  console.log('一般場景 ' + f(r.idle));
  console.log('最重場景 ' + f(r.heavy) + `  粒子 ${r.heavy.parts}`);
  const pass = ratio <= RATIO_MAX && r.heavy.p95 <= ABS_MAX && !errs.length;
  console.log((pass ? 'PASS ' : 'FAIL ') + `效能：最重場景 p95 是一般場景中位數的 ${ratio.toFixed(2)} 倍（上限 ${RATIO_MAX}）` + (errs.length ? '  錯誤：' + errs[0] : ''));
  await b.close();
  console.log(pass ? '全部通過' : '1 項失敗');
  process.exit(pass ? 0 : 1);
})();
