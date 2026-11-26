// 畫面比對測試：把固定的對戰場景畫出來，縮成 96×54 格（每格 10px）的平均亮度，和 tests/visual-baseline.json 比對。
// 抓的是「整塊東西沒畫出來／畫錯位置」這類問題（例如 HUD 消失、角色沒畫），抗鋸齒之類的小差異會被平均掉。
// 文字一律不畫：不同機器的字型不同，畫出來的字會不一樣。
//   node tests/visual.test.cjs            比對
//   node tests/visual.test.cjs --update   畫面是刻意改的：更新基準
// 不一致時，實際畫面會存到 tests/visual-out/<場景>.png（已加入 .gitignore）。
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const BASE = path.join(__dirname, 'visual-baseline.json'), OUT = path.join(__dirname, 'visual-out');
const GW = 96, GH = 54, BLOCK_TOL = 16, FAIL_FRAC = 0.008;
const UPDATE = process.argv.includes('--update');

// 場景：每個都從頭開一局，用固定輸入跑到指定狀態再畫
const SCENES = {
  'hud-arcade': () => { ART = 1; OLW = 1.6; OUTX = 2.4; fight(0, 1, 0); hitFor(12) },
  'hud-classic': () => { ART = 0; OLW = 1; OUTX = 0; fight(0, 1, 0); hitFor(12) },
  'round-text': () => { ART = 1; OLW = 1.6; OUTX = 2.4; sel[0] = 2; sel[1] = 5; G.stage = 4; startGame(2); G.vs = 0; for (let i = 0; i < 25; i++) step(); return 'keepMsg' },
  ...Object.fromEntries([0, 1, 2, 3, 4, 5, 6, 7].map((i) => ['chars-' + i + '-' + (i + 8), `() => { fight(${i}, ${i + 8}, ${i % 5}); pose(p1, 'sp', 2); pose(p2, 'hk', 1) }`])),
  'hazard-volcano': () => { HZ = 1; fight(0, 4, 3); human = () => NI; while (G.frame % VC !== 432) step(); HZ = 0 },
  'hazard-harbor': () => { HZ = 1; fight(6, 9, 1); HZ = 0 },
  'training': () => { sel[0] = 3; sel[1] = 0; G.stage = 2; startGame(3); G.vs = 0; while (G.phase !== 'fight') step(); let k = 0; human = (K) => Object.assign({}, NI, K === K1 ? (k % 9 === 0 ? { lp: 1 } : k % 9 === 4 ? { hp: 1 } : { r: 1 }) : {}); for (let i = 0; i < 60; i++) { step(); if (G.hitstop === 0) k++ } human = () => NI },
};

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  // 固定亂數、時間，並停掉自動迴圈：每次畫出來都一樣
  await pg.addInitScript(() => {
    let s = 12345; Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647;
    window.__T = 1000; performance.now = () => window.__T;
    window.requestAnimationFrame = () => 0;
    CanvasRenderingContext2D.prototype.fillText = CanvasRenderingContext2D.prototype.strokeText = function () {};
    try { localStorage.clear() } catch (e) {}
  });
  await pg.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => {
    QM = 1; QA = 0; CALM = 0; fitCanvas(); mute = true;
    window.fight = (a, c, st) => { sel[0] = a; sel[1] = c; G.stage = st; startGame(2); G.vs = 0; while (G.phase !== 'fight') step(); p1.x = 400; p2.x = 520; p1.mt = 75; p2.mt = 100; };
    window.hitFor = (n) => { const H0 = human; let k = 0; human = (K) => Object.assign({}, NI, K === K1 ? ([0, 6].includes(k) ? (k ? { hp: 1 } : { lp: 1 }) : {}) : {}); for (let i = 0; i < 40; i++) { step(); if (G.hitstop === 0) k++; if (p2.combo >= 2 && G.hitstop > 0) break } human = H0 };
    window.pose = (f, m, t) => { f.start(m); f.t = (f.atk.su || 0) + t };
    window.sample = () => {
      const d = ctx.getImageData(0, 0, cv.width, cv.height).data, bw = cv.width / 96, bh = cv.height / 54, o = new Uint8Array(96 * 54);
      for (let gy = 0; gy < 54; gy++) for (let gx = 0; gx < 96; gx++) {
        let l = 0, n = 0;
        for (let y = Math.floor(gy * bh); y < Math.floor((gy + 1) * bh); y++) for (let x = Math.floor(gx * bw); x < Math.floor((gx + 1) * bw); x++) { const i = (y * cv.width + x) * 4; l += d[i] * .3 + d[i + 1] * .59 + d[i + 2] * .11; n++ }
        o[gy * 96 + gx] = l / n;
      }
      return btoa(String.fromCharCode(...o));
    };
  });
  const base = !UPDATE && fs.existsSync(BASE) ? JSON.parse(fs.readFileSync(BASE, 'utf8')) : {};
  const now = {};
  let fails = 0;
  for (const [name, fn] of Object.entries(SCENES)) {
    const r = await pg.evaluate(`(() => { const keep = (${String(fn)})(); if (keep !== 'keepMsg') G.mt = 0; G.shake = 0; draw(); return { s: sample(), png: cv.toDataURL('image/png') } })()`);
    now[name] = r.s;
    if (UPDATE) { console.log('更新 ' + name); continue }
    if (!base[name]) { console.log('FAIL ' + name + '  沒有基準（請執行 --update）'); fails++; continue }
    const A = Buffer.from(base[name], 'base64'), B = Buffer.from(r.s, 'base64');
    let bad = 0, worst = 0;
    for (let i = 0; i < GW * GH; i++) { const dd = Math.abs(A[i] - B[i]); worst = Math.max(worst, dd); if (dd > BLOCK_TOL) bad++ }
    const frac = bad / (GW * GH), pass = frac <= FAIL_FRAC;
    if (process.env.VIS_DBG) { const c = (t) => { let n = 0; for (let i = 0; i < GW * GH; i++) { const dd = Math.abs(A[i] - B[i]); if (dd > t) n++ } return n }; console.log(name, 'worst', worst.toFixed(0), '>8:', c(8), '>16:', c(16), '>24:', c(24), '>48:', c(48)) }
    console.log((pass ? 'PASS ' : 'FAIL ') + '畫面：' + name + '  變動格子 ' + (frac * 100).toFixed(1) + '%');
    if (!pass) { fails++; fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(r.png.split(',')[1], 'base64')) }
  }
  // 手機版面：畫面完整在螢幕內、按鈕不超出螢幕；橫放時畫面要佔滿高度
  const { devices } = require('playwright');
  for (const [nm, dev] of [['手機橫放', devices['iPhone 13 landscape']], ['手機直放', devices['iPhone 13']]]) {
    const c2 = await b.newContext(dev), p2 = await c2.newPage();
    await p2.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
    const m = await p2.evaluate(() => { sel[0] = 0; sel[1] = 1; startGame(1); const c = cv.getBoundingClientRect(), p = $('pad').getBoundingClientRect(); return { vw: innerWidth, vh: innerHeight, c: [c.left, c.top, c.right, c.bottom], p: [p.left, p.top, p.right, p.bottom] } });
    const inV = (r) => r[0] >= -1 && r[1] >= -1 && r[2] <= m.vw + 1 && r[3] <= m.vh + 1;
    const okL = inV(m.c) && inV(m.p) && (nm === '手機直放' ? m.c[3] <= m.p[1] + 1 : m.c[3] - m.c[1] >= m.vh - 2);
    console.log((okL ? 'PASS ' : 'FAIL ') + '版面：' + nm + '  畫面 ' + m.c.map(Math.round) + '  按鈕 ' + m.p.map(Math.round));
    if (!okL) fails++;
    await c2.close();
  }
  if (errs.length) { console.log('FAIL 繪製過程出錯  ' + errs.slice(0, 3).join(' | ')); fails++ }
  if (UPDATE) fs.writeFileSync(BASE, JSON.stringify(now, null, 1) + '\n');
  await b.close();
  console.log(UPDATE ? '基準已更新' : fails ? fails + ' 項失敗' : '全部通過');
  process.exit(fails ? 1 : 0);
})();
