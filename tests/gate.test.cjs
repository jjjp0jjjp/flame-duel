// 房間限流測試：
//   1. gateHit / gateKey 單元測試（rooms-worker 實際使用的程式）
//   2. 模擬伺服器把上限調成 3，第 4 次嘗試時遊戲要顯示「次數太多」
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
let fails = 0;
const ok = (n, c, d) => { console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? '  ' + d : '')); if (!c) fails++; };
(async () => {
  const { gateHit, gateKey } = await import('../rooms-worker/src/gate.js');
  const L = []; let allowed = 0;
  for (let i = 0; i < 50; i++) if (gateHit(L, 1000 + i, 40, 600000)) allowed++;
  ok('10 分鐘內最多 40 次', allowed === 40, allowed);
  ok('時間窗過後恢復', gateHit(L, 1000 + 600000 + 1, 40, 600000));
  ok('IPv6 以 /64 計算', gateKey('2001:db8:1:2:aaaa::1') === gateKey('2001:db8:1:2:bbbb::9') && gateKey('1.2.3.4') === '1.2.3.4');

  const srv = spawn(process.execPath, [path.join(__dirname, 'mockserver.js'), path.join(__dirname, '..', 'index.html'), '8791'], { env: { ...process.env, GATE: '3' } });
  await new Promise((r) => srv.stdout.once('data', r));
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.goto('http://localhost:8791/'); await pg.click('#b4');
  const msgs = [];
  for (let i = 0; i < 4; i++) {
    await pg.fill('#rc2', '1234'); await pg.click('#rj');
    await pg.waitForFunction(() => /找不到|太多/.test(document.getElementById('ns').textContent), null, { timeout: 8000 });
    msgs.push(await pg.innerText('#ns'));
    await pg.evaluate(() => { document.getElementById('ns').textContent = '' });
  }
  ok('前 3 次正常回應找不到房間', msgs.slice(0, 3).every((m) => m.includes('找不到')));
  ok('第 4 次顯示嘗試太多次', msgs[3].includes('太多'), msgs[3]);
  await b.close(); srv.kill();
  console.log(fails ? fails + ' 項失敗' : '全部通過'); process.exit(fails ? 1 : 0);
})();
