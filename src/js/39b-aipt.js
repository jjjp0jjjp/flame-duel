// ===== 電腦性格 =====
// 猛攻型一直逼近、防守反擊型等對手出招再反擊、遠攻型保持距離放飛行道具、投技型貼身就抓
const PTN={rush:'猛攻型',counter:'防守反擊型',zone:'遠攻型',grab:'投技型'};
// 角色預設性格（烈 鋼 影 雷 岩 霜 嵐 月 拳 蠍 蝶 機 刃 巫 獸 羽）
const CHPT=['zone','rush','rush','zone','grab','zone','rush','counter','rush','counter','counter','zone','counter','zone','grab','zone'];
let AIP='def';try{const v=localStorage.getItem('fd_aip');if(v&&(v==='def'||v==='rand'||PTN[v]))AIP=v}catch(e){}
function aiPers(f){const c=CH.indexOf(f.ch);if(AIP==='rand'){const k=Object.keys(PTN);return k[Math.floor(Math.random()*k.length)]}return AIP==='def'?CHPT[c]||'rush':AIP}
function aiApply(){if(!p1)return;p1.ai.pt=aiPers(p1);p2.ai.pt=aiPers(p2)}
function aipUI(){const el=$('aipr');if(!el)return;const L=[['def','角色預設'],...Object.entries(PTN),['rand','🎲 隨機']];
 el.innerHTML=L.map(([k,n])=>'<button data-k="'+k+'" class="'+(AIP===k?'on':'')+'">'+n+'</button>').join('');
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{AIP=b.dataset.k;try{localStorage.setItem('fd_aip',AIP)}catch(e){}snd(600,.05);aipUI()})}
aipUI();
