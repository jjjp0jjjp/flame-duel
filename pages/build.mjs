// 把 index.html 壓縮後嵌入 _worker.js（Pages 進階模式），輸出到 dist/
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { deflateRawSync } from 'node:zlib';
const html = readFileSync(new URL('../index.html', import.meta.url));
const b64 = deflateRawSync(html, { level: 9 }).toString('base64');
const tpl = readFileSync(new URL('./_worker.template.js', import.meta.url), 'utf8');
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/_worker.js', import.meta.url), tpl.replace('__B64__', () => JSON.stringify(b64)));
console.log('dist/_worker.js', html.length, 'bytes html');
