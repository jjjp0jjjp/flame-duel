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
    let lost = false, dlgOK = true;
    for (let guard = 0; guard < 20 && ARC && !ARC.done; guard++) {
      const boss = ARC.i === ARC.L.length - 1; dlgOK = dlgOK && G.vs === 200 && ARC.dlg && ARC.dlg[0] === (boss ? BOSSL[0] : INTRO[2]) && (boss || ARC.dlg[1] === INTRO[ARC.L[ARC.i]]); G.vs = 0; seen.push(p2.ch.n + (p2.hm ? '×' + p2.hm : '') + '/難度' + G.diff);
      while (G.phase !== 'over') {
        if (G.phase === 'fight') { if (!lost && ARC.i === 1) { p1.st = 'ko'; } else p2.st = 'ko'; }
        step();
      }
      log.push(ARC.res);
      if (ARC.res === 'lose') lost = true;
      arcNext();
    }
    const done = !!(ARC && ARC.done), rec = localStorage.getItem('fd_arc');
    G.vs = 0; draw(); const story = dlgOK && done && ENDING.length === CH.length && INTRO.length === CH.length;
    toMenu();
    return { story, seen, log, done, rec, diff: G.diff, stage: G.stage, cont: JSON.parse(rec || '{}')[2] };
  });
  ok('街機劇情：每場開打前有對話、魔王戰專屬對白、通關顯示結局', arc.story);
  ok('街機：5 位對手各一次、最後是強化版的自己', arc.seen.length === 6 && new Set(arc.seen.map((s) => s[0])).size === 5 && /^影×1.3\/難度2$/.test(arc.seen[5]), arc.seen.join(' → '));
  ok('街機：輸了可以接關再戰同一位', arc.log.join(',') === 'win,lose,win,win,win,win' && arc.seen[1] === arc.seen[2], arc.log.join(','));
  ok('街機：通關後記錄接關次數，回選單還原難度與場景', arc.done && arc.cont === 1 && arc.diff === 0 && arc.stage === 1, JSON.stringify(arc));

  // ---- 3 對 3 隊伍戰、生存模式、一回合決勝與延續體力的重播
  const chain = await pg.evaluate(async () => {
    const out = {}, ko = (who) => { while (G.phase !== 'over') { if (G.phase === 'fight') who.st = 'ko'; step() } };
    // 隊伍戰：P1 先贏兩場、輸一場、再贏一場 → P1 勝
    TEAM = { A: [0, 1, 2], B: [3, 4, 5], ia: 0, ib: 0, ha: null, hb: null, mode: 1, res: null }; teamFight(); G.vs = 0;
    const seq = [];
    for (const lose of [0, 0, 1, 0]) { G.vs = 0; seq.push(CH[sel[0]].n + 'v' + CH[sel[1]].n); ko(lose ? p1 : p2); teamNext() }
    out.team = seq.join(',') === '烈v雷,烈v岩,烈v霜,鋼v霜' && TEAM && TEAM.done && G.msg.includes('P1');
    toMenu();
    // 生存：贏 4 場後輸 → 紀錄 4 勝、難度隨勝場上升
    localStorage.removeItem('fd_surv'); G.diff = 0; sel[0] = 6;
    SURV = { me: 6, n: 0, hp: null, d0: 0, last: -1, res: null }; survFight(); const diffs = [];
    for (let i = 0; i < 5; i++) { G.vs = 0; diffs.push(G.diff); ko(i < 4 ? p2 : p1); survNext() }
    out.surv = SURV.done && SURV.n === 4 && JSON.parse(localStorage.getItem('fd_surv'))[6] === 4 && diffs.join('') === '00011';
    toMenu(); out.restore = G.diff === 0 && !G.ft;
    // 延續體力的一回合對戰，重播後結果相同
    const KS = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'KeyU', 'KeyI', 'KeyJ', 'KeyK', 'KeyO', 'KeyL'];
    const hash = () => { const o = JSON.parse(snapAll()); delete o.v1; delete o.v2; delete o.a.ai; delete o.b.ai; return rbFnv(canon(o)) };
    HZ = 1; G.stage = 3; const MU0 = MU; MU = { m: 8 | 16, r: 0 };
    chainStart(2, 7, 1, 40, 70); G.vs = 0;
    for (let i = 0; i < 20000 && G.phase !== 'over'; i++) { for (const k of KS) { if (Math.random() < 0.06) { keys[k] = keys[k] ? 0 : 1; if (keys[k]) pend[k] = 1 } } step() }
    for (const k in keys) keys[k] = 0;
    const si = G.si, h = hash(), o = await codeDec(await codeEnc(rpPack())); startReplay(o); G.vs = 0; while (G.si < si) step();
    out.replay = hash() === h && G.phase === 'over' && G.hz === 1 && G.mu === 24; RP = null; HZ = 0; G.stage = 0; MU = MU0; toMenu();
    return out;
  });
  ok('隊伍戰：輪番上陣、輸的換人、最後判定勝負', chain.team);
  ok('生存：勝場累積、難度上升、保存最佳紀錄', chain.surv);
  ok('連戰結束後還原難度與回合設定', chain.restore);
  ok('延續體力的一回合對戰可正確重播', chain.replay);

  // ---- 對戰機制（用腳本輸入驗證）
  const mech = await pg.evaluate(() => {
    const H0 = human, out = {};
    const hash0 = () => { const o = JSON.parse(snapAll()); delete o.v1; delete o.v2; delete o.a.ai; delete o.b.ai; return rbFnv(canon(o)) };
    const setup = (a, b) => { sel[0] = a; sel[1] = b; startGame(2); G.vs = 0; while (G.phase !== 'fight') step(); p1.x = 400; p2.x = 470; p1.mt = p2.mt = 0 };
    // f(n) 回傳 [P1 輸入, P2 輸入]
    const run = (n, f) => { let k = 0; human = (K) => { const r = f(k); return Object.assign({}, NI, K === K1 ? r[0] : r[1]) }; for (let i = 0; i < n; i++) { step(); if (G.hitstop === 0) k++ } human = H0 };
    // 精準招架：P1 重拳，P2 在快打到前按 →
    setup(0, 0); run(40, (k) => [k === 0 ? { hp: 1 } : {}, k === 5 ? { l: 1 } : {}]);
    out.parry = p2.hp === p2.ch.hp && !p1.hit;
    // 確反：P2 在收招中被打，傷害比平常高
    setup(0, 0); p2.st = 'atk'; p2.atk = Object.assign({ key: 'hk' }, MV.hk); p2.t = MV.hk.su + MV.hk.ac + 2; const h0 = p2.hp;
    run(20, (k) => [k === 0 ? { hp: 1 } : {}, {}]); const dPun = h0 - p2.hp;
    setup(0, 0); const h1 = p2.hp; run(20, (k) => [k === 0 ? { hp: 1 } : {}, {}]); const dNorm = h1 - p2.hp;
    out.punish = dPun > dNorm * 1.15;
    // 受身：被升龍打飛時按攻擊鍵 → 很快爬起；掃堂腿是強制倒地不能受身
    setup(0, 0); let tch = false; run(70, (k) => [k === 0 ? { d: 1, lp: 1 } : {}, k > 12 && k < 30 && k % 2 ? { lk: 1 } : {}]); tch = p2.tch === 1 || (p2.st !== 'down' && p2.y >= GY);
    setup(0, 0); let hard = false; run(70, (k) => { if (p2.st === 'down') hard = hard || p2.dt > 20; return [k === 0 ? { d: 1, hk: 1 } : {}, k > 4 && k < 30 && k % 2 ? { lk: 1 } : {}] });
    out.tech = tch && hard;
    // 撞牆：把對手打飛到牆邊會反彈
    setup(1, 0); p1.x = 830; p2.x = 900; p1.dir = 1; p2.dir = -1; p1.mt = 100; let wb = false; run(60, (k) => { wb = wb || p2.wb === 1; return [k === 0 ? { sp: 1 } : {}, {}] });
    out.wall = wb;
    // 爆氣：被連段時按投技＋必殺，震開對手、每回合只能一次
    setup(0, 0); let bursted = false;
    run(80, (k) => { if (p2.st === 'hit' && p2.combo >= 2 && p2.bu) return [{}, { th: 1, sp: 1 }]; if (!p2.bu) bursted = true; return [[0, 6, 12, 18].includes(k) ? (k % 12 ? { hp: 1 } : { lp: 1 }) : {}, {}] });
    out.burst = bursted && p2.bu === 0 && (p1.kd === 1 || p1.st === 'down' || p1.st === 'hit');
    // 防禦耐久：一直擋重攻擊會破防
    setup(1, 0); let crushed = false;
    for (let r = 0; r < 12 && !crushed; r++) { p1.x = 400; p2.x = 470; run(40, (k) => { crushed = crushed || (p2.st === 'hit' && p2.stun > 30); return [k === 0 ? { hp: 1 } : {}, { d: 1 }] }) }
    out.guard = crushed;
    // 衝刺冷卻：衝刺後短時間內不能再衝刺；攻擊命中後的衝刺取消冷卻更長
    const dashes = (n, f) => { let c = 0, prev = ''; run(n, (k) => { const r = f(k); if (p1.st === 'dash' && prev !== 'dash') c++; prev = p1.st; return [r, {}] }); return c };
    setup(0, 0); p1.x = 200; p2.x = 760; const d1 = dashes(60, (k) => (k === 0 || k === 20 ? { dash: 1 } : {}));
    setup(0, 0); p1.x = 200; p2.x = 760; const d2 = dashes(60, (k) => (k === 0 || k === 45 ? { dash: 1 } : {}));
    setup(0, 0); let cancel = false, cd = 0; run(30, (k) => { if (!cancel && p1.st === 'dash') { cancel = true; cd = p1.dcd } return [k === 0 ? { lp: 1 } : k >= 5 && k <= 7 ? { dash: 1 } : {}, {}] });
    out.dashcd = d1 === 1 && d2 === 2 && cancel && cd >= 70;
    // 突變規則：低重力跳得高、玻璃大砲傷害高、吸血會回血、持久戰 99 秒、劇毒扣血但不倒下、狂熱衝刺無冷卻
    const MUb = MU, mu = (m, f) => { MU = { m, r: 0 }; const r = f(); MU = MUb; return r };
    const jumpH = (m) => mu(m, () => { setup(0, 0); let top = GY; run(60, (k) => { top = Math.min(top, p1.y); return [k === 0 ? { u: 1 } : {}, {}] }); return GY - top });
    const dmg = (m) => mu(m, () => { setup(0, 0); const h = p2.hp; p1.hp = 50; run(25, (k) => [k === 0 ? { hp: 1 } : {}, {}]); return [h - p2.hp, p1.hp] });
    const n0 = dmg(0), ng = dmg(8), nv = dmg(16);
    const tank = mu(32, () => { setup(0, 0); return G.time });
    const psn = mu(4, () => { setup(0, 0); p1.hp = 3; run(200, () => [{}, {}]); return p1.hp });
    const rush = mu(2, () => { setup(0, 0); p1.x = 200; p2.x = 760; let c = 0, prev = ''; run(40, (k) => { if (p1.st === 'dash' && prev !== 'dash') c++; prev = p1.st; return [k === 0 || k === 16 ? { dash: 1 } : {}, {}] }); return c });
    out.mutators = jumpH(1) > jumpH(0) * 1.5 && ng[0] > n0[0] * 1.5 && nv[1] > 50 && n0[1] === 50 && tank === 99 && psn === 1 && rush === 2;
    // 電腦性格：預設依角色、可指定、可隨機；不影響雙人對戰的確定性
    const AIP0 = AIP; AIP = 'def'; sel[0] = 4; sel[1] = 3; startGame(1); const pd = [p1.ai.pt, p2.ai.pt];
    AIP = 'grab'; startGame(1); const pg2 = p2.ai.pt; AIP = 'rand'; startGame(1); const pr = p2.ai.pt; AIP = AIP0; toMenu();
    out.aipt = pd[0] === 'grab' && pd[1] === 'zone' && pg2 === 'grab' && !!PTN[pr];
    // 每日挑戰：同一天題目固定、不同天不同；開局套用規則與強化版對手
    const sA = dailySpec('2026-01-01'), sB = dailySpec('2026-01-01'), sC = dailySpec('2026-01-02');
    dailyStart(); const dOK = G.mu === dailySpec(today()).mu && G.mu > 0 && p2.hm === 1.15 && G.ft === 1 && G.diff === 2; toMenu();
    out.daily = JSON.stringify(sA) === JSON.stringify(sB) && JSON.stringify(sA) !== JSON.stringify(sC) && dOK && !DAILY && G.diff !== undefined;
    // 簡易操作：連按輕拳自動接 輕→輕腳→重拳→必殺，傷害較低；並寫進重播
    const SV = SIMPLE; SIMPLE = [1, 0]; setup(0, 0); p1.mt = 60; let seen = [];
    run(70, (k) => { if (p1.st === 'atk' && p1.atk && !seen.includes(p1.atk.key)) seen.push(p1.atk.key); return [k % 3 === 0 ? { lp: 1 } : {}, {}] });
    const simpleOK = p1.sm === 1 && p2.sm === 0 && ['lp', 'lk', 'hp', 'sp'].every(m => seen.includes(m)) && REC && REC.s && REC.s[0] === 1;
    SIMPLE = [0, 0]; setup(0, 0); p1.mt = 60; let seen2 = []; run(70, (k) => { if (p1.st === 'atk' && p1.atk && !seen2.includes(p1.atk.key)) seen2.push(p1.atk.key); return [k % 3 === 0 ? { lp: 1 } : {}, {}] });
    SIMPLE = SV; out.simple = simpleOK && !seen2.includes('sp');
    // 迅移取消：重腳揮空後同時按輕拳＋重拳＋輕腳 → 立刻回到可行動，扣 50 氣
    setup(0, 0); p1.x = 200; p2.x = 700; p1.mt = 80; let rcAt = -1;
    run(30, (k) => { if (rcAt < 0 && p1.st === 'idle' && k > 0) rcAt = k; return [k === 0 ? { hk: 1 } : k === 4 ? { lp: 1, hp: 1, lk: 1 } : {}, {}] });
    out.rc = rcAt > 0 && rcAt <= 6 && Math.abs(p1.mt - 30) < 1;
    // 場景機關：火山噴發會打中站在噴口的人；沒開機關時不會
    const hz0 = HZ; const vol = (on) => { HZ = on; G.stage = 3; setup(0, 0); const x = vcX(Math.floor(G.frame / VC) + 1); const h = p2.hp; let n = 0; while (G.frame % VC !== 440 && n++ < 2000) { p2.x = x; p1.x = x > 450 ? 150 : 750; human = () => NI; step() } human = H0; return h - p2.hp };
    const dOn = vol(1), dOff = vol(0);
    // 雪原：被擊退會滑得比較遠
    const slide = (on) => { HZ = on; G.stage = 2; setup(0, 0); run(30, (k) => [k === 0 ? { hp: 1 } : {}, {}]); return p2.x };
    const sOn = slide(1), sOff = slide(0);
    // 夜城強風：颳風期間兩人都被往同一邊推；竹林道場鐘聲：雙方加 15 氣
    HZ = 1; G.stage = 0; setup(0, 0); human = () => NI; while (G.frame % WC !== 421) step(); const wx = [p1.x, p2.x], wd = wdDir(Math.floor(G.frame / WC)); for (let i = 0; i < 40; i++) step(); human = H0;
    const wind = (p1.x - wx[0]) * wd > 20 && (p2.x - wx[1]) * wd > 20;
    G.stage = 4; setup(0, 0); human = () => NI; while (G.frame % BC !== BC - 22) step(); p1.mt = p2.mt = 10; step(); step(); step(); human = H0;
    const bell = p1.mt >= 25 && p2.mt >= 25;
    HZ = hz0; G.stage = 0;
    out.hazard = dOn >= 7 && dOff === 0 && sOn > sOff + 5 && wind && bell;
    // 兩種畫風都能正常繪製（只影響畫面，不影響模擬）
    setup(3, 9); run(20, (k) => [k % 4 === 0 ? { hp: 1 } : {}, {}]); const hb = hash0(); ART = 0; OLW = 1; OUTX = 0; draw(); ART = 1; OLW = 1.6; OUTX = 2.4; draw(); out.art = hash0() === hb;
    // 減少閃光：不會設定全畫面閃色，且照常繪製
    CALM = 1; FL = null; flash('#fff', .5, 200); const noFlash = FL === null; draw(); CALM = 0; flash('#fff', .5, 200); out.calm = noFlash && (FL !== null || !qHigh()); FL = null;
    return out;
  });
  for (const [k, v] of Object.entries(mech)) ok('機制：' + { parry: '精準招架', punish: '確反加傷', tech: '受身與強制倒地', wall: '撞牆反彈', burst: '爆氣', guard: '防禦崩潰', simple: '簡易操作輔助連段', rc: '迅移取消', hazard: '場景機關（火山、雪原、強風、鐘聲）', art: '街機／經典畫風繪製', calm: '減少閃光', dashcd: '衝刺冷卻（衝刺取消冷卻較長）', mutators: '突變規則（低重力、玻璃大砲、吸血、持久戰、劇毒、狂熱）', daily: '每日挑戰（同一天題目固定）', aipt: '電腦性格（預設、指定、隨機）' }[k], v);

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
