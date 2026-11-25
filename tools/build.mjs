// 從 src/ 組出兩個版本：
//   index.html                         獨立網頁版（WebRTC + 房間代碼配對）
//   claude-artifact/fighter_v2.html    claude.ai artifact 版（使用 artifact 的 room 功能）
// 共用程式在 src/js/（依檔名排序串接，全部在同一個 <script> 的全域範圍）；
// 兩版不同的部分在 src/web/ 與 src/artifact/：head、連線 UI、連線傳輸層、連線按鈕綁定。
// 用法：node tools/build.mjs          產生檔案
//       node tools/build.mjs --check  只檢查產生的檔案是否和 src/ 一致（CI 用）
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const rd = (p) => readFileSync(new URL(p, root), 'utf8');
const shared = readdirSync(new URL('src/js/', root)).filter((f) => f.endsWith('.js')).sort();
const NOTE = '// 此檔由 tools/build.mjs 從 src/ 產生，請改 src/ 後重新產生，不要直接修改。\n';
function build(v) {
  let js = NOTE;
  for (const f of shared) {
    js += rd('src/js/' + f);
    if (f === '20-net-state.js') js += rd(`src/${v}/transport.js`);
    if (f === '30-net-sync-ui.js') js += rd(`src/${v}/bind.js`);
  }
  return rd('src/page.html')
    .replace('<!--@HEAD-->\n', () => rd(`src/${v}/head.html`))
    .replace('<!--@NETUI-->', () => rd(`src/${v}/net-ui.html`))
    .replace('/*@JS*/\n', () => js);
}
const out = { 'index.html': build('web'), 'claude-artifact/fighter_v2.html': build('artifact') };
const check = process.argv.includes('--check');
let bad = 0;
for (const [p, s] of Object.entries(out)) {
  const u = new URL(p, root);
  if (check) {
    if (!existsSync(u) || readFileSync(u, 'utf8') !== s) { console.error('過期：' + p + '（請執行 node tools/build.mjs）'); bad = 1; }
  } else { writeFileSync(u, s); console.log(p, s.length, 'bytes'); }
}
process.exit(bad);
