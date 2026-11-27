// 平衡模擬：電腦對電腦打大量對局，輸出各角色組合的勝率
//   node tools/balance.cjs [每組場數=20] [難度 0-2=2]
//   PATCH='CH[4].hp=116' node tools/balance.cjs 40   先套用試調數值再模擬
// 注意：結果反映的是「這個 AI 用這個角色」的強弱，AI 不會每個角色的招都用得一樣好，
// 只適合抓出明顯失衡（例如某角色對所有人都 > 60%），不能取代真人對戰的感受。
const { chromium } = require('playwright');
const path = require('path');
const N = +process.argv[2] || 20, DIFF = process.argv[3] === undefined ? 2 : +process.argv[3];
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage();
  pg.on('pageerror', (e) => console.error('頁面錯誤', e.message));
  await pg.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  await pg.waitForTimeout(200);
  // PATCH 環境變數：先在頁面執行一段程式再模擬，用來試調數值，例如 PATCH='CH[4].hp=116'
  if (process.env.PATCH) await pg.evaluate(process.env.PATCH);
  const r = await pg.evaluate(([N, DIFF]) => {
    // 用無性格的中立打法比較角色本身（遊戲裡的電腦另有性格）
    const H0 = human; NOFX = 1; mute = true; AIP = 'bal';
    human = (k) => (k === K1 ? aiInput(p1, p2) : NI);
    const n = CH.length, win = [], len = [], perfect = [];
    for (let i = 0; i < n; i++) { win.push(Array(n).fill(0)); len.push(Array(n).fill(0)) }
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      for (let m = 0; m < N; m++) {
        // 左右各打一半，抵銷站位差異
        const sw = m % 2, a = sw ? j : i, c = sw ? i : j;
        sel[0] = a; sel[1] = c; G.diff = DIFF; startGame(1); G.vs = 0;
        let s = 0; while (G.phase !== 'over' && s < 40000) { step(); s++ }
        const w = p1.wins > p2.wins ? 0 : p2.wins > p1.wins ? 1 : -1;
        if (w >= 0) win[i][j] += (w === 0) !== !!sw ? 1 : 0; else win[i][j] += 0.5;
        len[i][j] += s;
        RP = null; REC = null; G.phase = 'menu';
      }
    }
    human = H0; NOFX = 0;
    return { names: CH.map((c) => c.n), win, len };
  }, [N, DIFF]);
  const pct = (x) => (100 * x / N).toFixed(0).padStart(4) + '%';
  console.log(`每組 ${N} 場、難度 ${DIFF}。列＝角色，欄＝對手，數字＝列角色勝率`);
  console.log('     ' + r.names.map((s) => '  ' + s + ' ').join(''));
  r.win.forEach((row, i) => {
    const avg = row.reduce((x, y, j) => (j === i ? x : x + y), 0) / (N * (row.length - 1));
    console.log(' ' + r.names[i] + '  ' + row.map(pct).join('') + '   平均 ' + (100 * avg).toFixed(0) + '%');
  });
  const tl = r.len.flat().reduce((x, y) => x + y, 0) / (N * r.len.length ** 2);
  console.log('平均一場 ' + (tl / 60).toFixed(0) + ' 秒（遊戲時間）');
  await b.close();
})();
