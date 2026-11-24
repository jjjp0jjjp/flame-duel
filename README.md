# 烈焰對決 Flame Duel

瀏覽器格鬥遊戲，單一 HTML 檔，不需安裝。支援本機雙人、對電腦，以及線上對戰（rollback 網路同步）。

線上版：https://flame-duel-fighter.pages.dev

## 線上對戰怎麼運作

1. **房間代碼（配對）**：`/api/ws` 由 Cloudflare Durable Object（`rooms-worker`）負責，一間房只收房主＋一位對手，只轉送 WebRTC 的 offer/answer，連上後就關閉 WebSocket。
2. **P2P 對戰**：對戰資料走 WebRTC DataChannel（unordered、不重傳），玩家之間直連。
3. **TURN 中繼**：配對成功時才向 Cloudflare Realtime TURN 申請 2 小時的短期憑證；直連打不通時自動改走中繼。
4. **手動代碼備援**：直接開檔案（file://）或伺服器連不上時，改用手動複製代碼。

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

- 4 位數代碼可被猜中；只能闖進一場對戰，拿不到其他資料。
- TURN 憑證只在配對成功後發出、2 小時過期；若被濫用可在 Cloudflare 後台撤銷 TURN key。機密值只放在 Worker secrets，不要提交到這個 repo。
