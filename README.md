# 烈焰對決 Flame Duel

瀏覽器格鬥遊戲，單一 HTML 檔，不需安裝。支援本機雙人、對電腦，以及線上對戰（rollback 網路同步）。

線上版：https://flame-duel-fighter.pages.dev

## 遊戲模式

- **單人 vs 電腦**：三種難度。普通以上的電腦會拆投、確反揮空、對空，也會記住你的習慣（常跳、常投、常放飛行道具、常防禦）調整打法。
- **街機模式**：依序打倒其他 4 位角色（後兩場難度提高），最後挑戰體力 ×1.3 的強化版自己；輸了可以接關，通關紀錄依角色保存。
- **雙人對戰**、**連線對戰**。
- **訓練模式**：判定框（F2）、招式幀數與命中／被防的優劣幀、木樁行為（站立／蹲防／隨機防禦／跳躍／防後反擊／重播錄製）、錄製木樁動作、每個角色 4 題連段挑戰。
- **新手教學**：9 步互動教學，從走路到超必殺。
- 按鍵可在「設定」更改（P1、P2 各自），也可調主音量／音樂／音效與觸控按鈕大小；手機使用虛擬搖桿。

## 線上對戰怎麼運作

1. **房間代碼（配對）**：`/api/ws` 由 Cloudflare Durable Object（`rooms-worker`）負責，一間房只收房主＋一位對手，只轉送 WebRTC 的 offer/answer，連上後就關閉 WebSocket。
2. **P2P 對戰**：對戰資料走 WebRTC DataChannel（unordered、不重傳），玩家之間直連。
3. **TURN 中繼**：配對成功時才向 Cloudflare Realtime TURN 申請 2 小時的短期憑證；直連打不通時自動改走中繼。
4. **手動代碼備援**：直接開檔案（file://）或伺服器連不上時，改用手動複製代碼。
5. **不同步自動修復**：雙方每 30 幀互傳狀態雜湊；不一致時房客向房主要「輸入都已確認」那一幀的完整狀態，從那裡回滾重算。
6. **限流**：同一個 IP（IPv6 以 /64 計）10 分鐘內最多建立／加入 40 次房間，超過時遊戲會提示稍後再試（計數器是以 `gate:<ip>` 命名的 `Room` Durable Object，不需要新增綁定）。

## 重播

遊戲是確定性的，所以只要記錄每一步雙方的輸入就能完整重現。單人、雙人、連線對戰結束後按 R（或畫面下方按鈕）會把這場的輸入壓縮成 `#rp=` 連結，一般一場約 1～6 千字；最近一場也會存在瀏覽器，選單可直接「觀看上一場重播」。

## 目錄

| 路徑 | 內容 |
|---|---|
| `src/page.html` | 頁面外框（HTML／CSS），`<!--@HEAD-->`、`<!--@NETUI-->`、`/*@JS*/` 由建置填入 |
| `src/js/` | 兩個版本共用的遊戲程式，依檔名順序串接（資料與音效、特效、角色、`class F`、輸入與 AI、遊戲流程、繪圖、連線同步、訓練／教學／設定） |
| `src/web/` | 獨立網頁版專屬：head、連線 UI、WebRTC 傳輸層、房間代碼配對 |
| `src/artifact/` | claude.ai artifact 版專屬：head、連線 UI、artifact room 傳輸層 |
| `tools/build.mjs` | 從 `src/` 產生 `index.html` 與 `claude-artifact/fighter_v2.html` |
| `index.html` | 遊戲本體（獨立網頁版，產生的檔案） |
| `claude-artifact/fighter_v2.html` | claude.ai artifact 版（產生的檔案，使用 artifact 的 room 功能，不走下面的伺服器） |
| `rooms-worker/` | 房間配對 Worker + Durable Object（`Room`） |
| `pages/_worker.template.js` | Pages 進階模式 worker：送出頁面、把 `/api/ws` 轉給 `ROOMS` |
| `pages/build.mjs` | 把 `index.html` 壓縮嵌入，產生 `dist/_worker.js` |
| `tests/` | 遊戲本體測試、本機模擬伺服器 + Playwright 雙視窗連線測試 |

## 開發

**改程式請改 `src/`，不要直接改 `index.html` 或 `claude-artifact/fighter_v2.html`**，改完執行：

```bash
npm install            # 只需要一次（裝 Playwright）
npm run build          # 產生兩個版本
npm test               # 檢查產生的檔案是否最新 + 遊戲本體測試
```

`tests/game.test.cjs` 會檢查：兩個版本都能載入並執行各模式、同樣輸入的結果完全一致（確定性）、從快照回滾重跑的結果一致（連線對戰靠這個）、每個角色的連段挑戰都打得出來、新手教學可以完成。GitHub Actions（`.github/workflows/ci.yml`）每次 push 都會跑這些測試和連線測試。

### 平衡模擬

```bash
node tools/balance.cjs 60 2                    # 電腦對電腦，每組 60 場、困難難度，輸出勝率表
PATCH='CH[4].hp=112' node tools/balance.cjs 40 # 先套用試調的數值再模擬
```

結果反映的是「這個 AI 用這個角色」的強弱，只適合抓出明顯失衡，不能取代真人試玩。目前的數值（困難難度，每組 60 場）各角色平均勝率約落在 38%～63%。

## 部署

```bash
# 1. 房間 Worker
cd rooms-worker
wrangler secret put TURN_KEY_ID      # Cloudflare Realtime TURN key id
wrangler secret put TURN_KEY_TOKEN   # 該 key 的 secret（只在建立時顯示一次）
wrangler deploy

# 2. Pages（專案需綁定 Durable Object：ROOMS → flame-duel-rooms 的 Room）
cd ..
node pages/build.mjs
wrangler pages deploy dist --project-name flame-duel-fighter
```

## 連線測試

```bash
node tests/mockserver.js index.html 8790 &
pip install playwright==1.63.0 && python tests/roomtest.py
```

## 注意

- 4 位數代碼可被猜中，但有依 IP 限流；猜中也只能闖進一場對戰，拿不到其他資料。
- TURN 憑證只在配對成功後發出、2 小時過期；若被濫用可在 Cloudflare 後台撤銷 TURN key。機密值只放在 Worker secrets，不要提交到這個 repo。
