import sys, json
from playwright.sync_api import sync_playwright
BASE = 'http://localhost:8790/'
CLIP = "navigator.clipboard.writeText=t=>{window.__clip=t;return Promise.resolve()};"
KS = ['KeyA', 'KeyD', 'KeyW', 'KeyS', 'KeyU', 'KeyI', 'KeyJ', 'KeyK', 'KeyO', 'KeyL']
res = []
def ok(name, cond, detail=''):
    res.append(('PASS ' if cond else 'FAIL ') + name + (('  ' + str(detail)) if detail else ''))
    print(res[-1], flush=True)
def stats(pg):
    return pg.evaluate("fetch('/__stats').then(r=>r.json())")
def play(pages, n):
    for i in range(n):
        for pg in pages:
            pg.evaluate("ks=>{for(const k of ks){const v=Math.random()<(k==='KeyA'||k==='KeyD'?.35:.18)?1:0;keys[k]=v;if(v)pend[k]=1}}", KS)
        pages[0].wait_for_timeout(100)
    for pg in pages:
        pg.evaluate("for(const k of Object.keys(keys))keys[k]=0")
with sync_playwright() as p:
    b = p.chromium.launch(args=['--disable-features=WebRtcHideLocalIpsWithMdns', '--allow-loopback-in-peer-connection'])
    ctx = b.new_context(viewport={'width': 1000, 'height': 820}); ctx.add_init_script(CLIP)
    errs = []
    def page():
        pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:150])); pg.goto(BASE); pg.wait_for_timeout(300); return pg
    A = page(); B = page(); st0 = stats(A)
    # 1. 房主建立房間
    A.evaluate("sel[0]=3;G.stage=3;lab()"); B.evaluate("sel[0]=4;lab()")
    A.click('#b4'); A.click('#rh')
    A.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000)
    code = A.inner_text('#rcode')
    ok('房主建立房間並顯示 4 位數代碼', code.isdigit() and len(code) == 4, code)
    A.screenshot(path='room_host.png', clip={'x': 0, 'y': 380, 'width': 1000, 'height': 440})
    # 2. 錯誤代碼
    B.click('#b4'); B.fill('#rc2', '0000' if code != '0000' else '1111'); B.click('#rj')
    B.wait_for_function("document.getElementById('ns').textContent.includes('找不到房間')", timeout=8000)
    ok('輸入不存在的代碼會提示找不到房間', True, B.inner_text('#ns'))
    # 3. 正確代碼加入（用鍵盤 Enter）
    B.fill('#rc2', code); B.press('#rc2', 'Enter')
    A.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000); B.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000)
    ok('房客輸入代碼後雙方自動連上並開戰', True, A.evaluate("[p1.ch.n,p2.ch.n,STG[G.stage].n]"))
    A.wait_for_timeout(500)
    st = stats(A); d = {'opened': st['opened'] - st0['opened'], 'msgs': st['msgs'] - st0['msgs'], 'rooms': st['rooms']}; st = d
    ok('連上後配對連線全部關閉（不再佔用伺服器）', len(st['rooms']) == 0, st)
    ok('握手只用了少量伺服器訊息', st['msgs'] <= 4, f"開了 {st['opened']} 條配對連線、轉送 {st['msgs']} 則訊息")
    A.wait_for_timeout(2500); play([A, B], 120); A.wait_for_timeout(800)
    ha = A.evaluate("NET.hash"); hb = B.evaluate("NET.hash"); com = [k for k in ha if k in hb]; mm = [k for k in com if ha[k] != hb[k]]
    ok('對戰中兩邊狀態同步', len(com) >= 5 and not mm, f'檢查點 {len(com)} 不一致 {len(mm)}')
    # 4. 打完再戰（走資料通道，不需要伺服器）
    for i in range(1200):
        if A.evaluate("G.phase") == 'over' and B.evaluate("G.phase") == 'over': break
        for pg in (A, B): pg.evaluate("ks=>{for(const k of ks){const v=Math.random()<.4?1:0;keys[k]=v;if(v)pend[k]=1}}", KS)
        A.wait_for_timeout(100)
    for pg in (A, B): pg.evaluate("for(const k of Object.keys(keys))keys[k]=0")
    A.wait_for_timeout(500)
    B.keyboard.press('Enter'); A.wait_for_timeout(600); A.keyboard.press('Enter')
    A.wait_for_function("NET.m===2&&G.phase!=='over'", timeout=10000); B.wait_for_function("NET.m===2&&G.phase!=='over'", timeout=10000)
    ok('整局打完後可直接再戰', True, A.evaluate("[NET.m,G.phase]"))
    A.keyboard.press('Escape'); B.wait_for_timeout(3500)
    ok('一方離開後雙方回到選單', A.evaluate("G.phase") == 'menu' and B.evaluate("G.phase") == 'menu')
    # 5. 邀請連結
    A.click('#b4'); A.click('#rh'); A.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000)
    code2 = A.inner_text('#rcode'); A.click('#rl'); A.wait_for_timeout(150); link = A.evaluate("window.__clip")
    ok('複製邀請連結格式正確', link == BASE + '#r=' + code2, link)
    C = ctx.new_page(); C.on('pageerror', lambda e: errs.append(str(e)[:150])); C.goto(link)
    A.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000); C.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000)
    ok('對手打開邀請連結就自動加入並連上', True, C.evaluate("location.hash===''"))
    A.keyboard.press('Escape'); C.wait_for_timeout(3500)
    # 5b. 遊戲已開著時在同一分頁貼上邀請連結
    A.click('#b4'); A.click('#rh'); A.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000); cx = A.inner_text('#rcode')
    X = page(); X.goto(BASE + '#r=' + cx)
    A.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000); X.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000)
    ok('遊戲已開著時貼上邀請連結也會自動加入', True)
    A.keyboard.press('Escape'); X.wait_for_timeout(3500)
    # 6. 房間已滿 / 房主離開 / 對手離開後房間保留
    A.click('#b4'); A.click('#rh'); A.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000); code3 = A.inner_text('#rcode')
    # 先擋住 A 處理對手加入，模擬握手進行中有第三人加入
    D = page(); D.click('#b4'); D.evaluate(f"()=>{{(async()=>{{window._w=await wsOpen('{code3}','guest')}})()}}"); D.wait_for_timeout(600)
    E = page(); E.click('#b4'); E.fill('#rc2', code3); E.click('#rj')
    E.wait_for_function("document.getElementById('ns').textContent.includes('已經有對手')", timeout=8000)
    ok('房間已有人時第三人會被擋下', True, E.inner_text('#ns'))
    D.evaluate("window._w.close()"); A.wait_for_timeout(800)
    ok('對手離開後房主的房間保留並繼續等待', '仍然開著' in A.inner_text('#ns'), A.inner_text('#ns'))
    E.fill('#rc2', code3); E.click('#rj')
    A.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000); E.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000)
    ok('同一個房間之後仍可讓新對手加入', True)
    A.keyboard.press('Escape'); E.wait_for_timeout(3500)
    A.click('#b4'); A.click('#rh'); A.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000); code4 = A.inner_text('#rcode')
    F = page(); F.click('#b4'); F.evaluate(f"()=>{{window._fm=[];(async()=>{{const w=await wsOpen('{code4}','guest');for(;;){{const m=await wsNext(w);window._fm.push(m.t);if(m.t==='closed')break}}}})()}}"); F.wait_for_timeout(500)
    A.click('#nx'); F.wait_for_timeout(800)
    ok('房主取消時對手收到離開通知', 'left' in F.evaluate("window._fm"), F.evaluate("window._fm"))
    # 7. 代碼衝突：同代碼第二個房主會被拒，房主自動換代碼
    G2 = page(); G2.click('#b4'); G2.click('#rh'); G2.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000); c5 = G2.inner_text('#rcode')
    H = page(); H.click('#b4')
    H.evaluate(f"(()=>{{let n=0;const R=Math.random;Math.random=()=>{{n++;return n===1?({c5}-1000)/9000+1e-9:R()}}}})()")
    H.click('#rh'); H.wait_for_function("document.getElementById('rcode').textContent.length===4", timeout=8000); c6 = H.inner_text('#rcode')
    ok('代碼撞到已存在的房間時自動換一個', c6 != c5 and len(c6) == 4, f'{c5} -> {c6}')
    # 8. 輸入框只收數字
    H.fill('#rc2', ''); H.type('#rc2', 'a1b2c3d4e5'); ok('代碼欄只能輸入 4 位數字', H.input_value('#rc2') == '1234', H.input_value('#rc2'))
    H.fill('#rc2', '12'); H.click('#rj'); ok('代碼不足 4 位會提示', '4 位數' in H.inner_text('#ns'), H.inner_text('#ns'))
    # 9. 手動流程仍可用
    M1 = page(); M2 = page(); M1.click('#b4'); M1.click('#manual summary'); M1.click('#nh')
    M1.wait_for_function("document.getElementById('mine').value.length>100", timeout=10000); M1.click('#ncl'); M1.wait_for_timeout(150); ml = M1.evaluate("window.__clip")
    M2 = ctx.new_page(); M2.on('pageerror', lambda e: errs.append(str(e)[:150])); M2.goto(ml); M2.wait_for_function("document.getElementById('mine').value.length>100", timeout=10000)
    M1.fill('#theirs', M2.input_value('#mine'))
    M1.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000); M2.wait_for_function("G.mode===4&&G.phase!=='menu'", timeout=15000)
    ok('手動交換代碼的備援方式仍然可用', True)
    print('\n'.join(res)); print('頁面錯誤:', errs or '無')
    print('RESULT', 'PASS' if all(r.startswith('PASS') for r in res) and not errs else 'FAIL')
    b.close()
