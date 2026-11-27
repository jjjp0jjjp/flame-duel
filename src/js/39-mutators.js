// ===== 突變規則與每日挑戰 =====
// 規則用位元組合（G.mu），開局時決定，會寫進連線開局訊息與重播，雙方結果一致
const MUT=[
 {n:'低重力',d:'重力減半，跳得又高又久'},
 {n:'狂熱',d:'氣快速回復、衝刺沒有冷卻'},
 {n:'劇毒擂台',d:'雙方持續扣血（不會因此倒下）'},
 {n:'玻璃大砲',d:'所有傷害 ×1.7'},
 {n:'吸血擂台',d:'打中對手回復傷害的 35%'},
 {n:'持久戰',d:'傷害 ×0.6、回合 99 秒'}];
let MU={m:0,r:0};try{const o=JSON.parse(localStorage.getItem('fd_mu')||'null');if(o&&typeof o.m==='number')MU={m:o.m&63,r:o.r?1:0}}catch(e){}
// 隨機：抽 1～2 條，避免「玻璃大砲」和「持久戰」同時出現
function muRand(R){R=R||Math.random;const n=R()<.5?1:2;let m=0;while(true){m=0;for(let i=0;i<n;i++)m|=1<<Math.floor(R()*MUT.length);if((m&40)!==40)return m}}
const muPick=()=>MU.r?muRand():MU.m;
function muApply(){G.mu=G.muo!=null?(G.muo&63):muPick();G.muo=null;if(REC&&G.mu)REC.mu=G.mu}
const muNames=m=>MUT.filter((_,i)=>m>>i&1).map(x=>x.n).join('・');
function muUI(){const el=$('mutr');if(!el)return;el.innerHTML=MUT.map((x,i)=>'<button data-i="'+i+'" title="'+x.d+'" class="'+(MU.m>>i&1&&!MU.r?'on':'')+'">'+x.n+'</button>').join('')+'<button data-i="r" class="'+(MU.r?'on':'')+'" title="每場隨機抽 1～2 條規則">🎲 隨機</button>';
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const i=b.dataset.i;if(i==='r'){MU.r=MU.r?0:1}else{MU.r=0;MU.m^=1<<+i;if((MU.m&40)===40)MU.m^=i==='3'?32:8}try{localStorage.setItem('fd_mu',JSON.stringify(MU))}catch(e){}snd(600,.05);muUI()})}
function muHud(){if(!G.mu||G.phase==='menu'||!p1)return;ctx.save();ctx.textAlign='center';ctx.font='bold 12px '+FONT;const t='規則：'+muNames(G.mu),w=ctx.measureText(t).width+16;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(W/2-w/2,ART?80:74,w,17);ctx.fillStyle='#ff9d2e';ctx.fillText(t,W/2,ART?93:87);ctx.restore()}
// ---- 每日挑戰：用日期當種子，每天的題目固定
function seedRng(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}return()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);const t=(h^=h>>>16)>>>0;return t/4294967296}}
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function dailySpec(day){const R=seedRng('fd-daily-'+day),me=Math.floor(R()*CH.length);let op;do{op=Math.floor(R()*CH.length)}while(op===me);return{day,me,op,g:Math.floor(R()*STG.length),mu:muRand(R),hm:1.15}}
let DAILY=null;
function dailyBest(day){try{return(JSON.parse(localStorage.getItem('fd_daily')||'{}'))[day]||null}catch(e){return null}}
function dailyDesc(s){return'用「'+CH[s.me].n+'」在'+STG[s.g].n+'打倒強化版「'+CH[s.op].n+'」（體力 ×'+s.hm+'）　規則：'+muNames(s.mu)}
function dailyStart(){const s=dailySpec(today());DAILY={s,res:null,d0:G.diff,g0:G.stage};G.diff=2;G.stage=s.g;G.muo=s.mu;chainStart(s.me,s.op,1,null,null);p2.hm=(p2.hm||1)*s.hm;p2.reset();if(REC){REC.h=[p1.hm||1,p2.hm];REC.ini={ft:1,hp:[p1.hp,p2.hp]}}}
function dailyDone(){const D=DAILY;if(!D||D.score!=null||D.res!=='a')return;D.score=Math.round(p1.hp/(p1.ch.hp*(p1.hm||1))*100)+G.time*2;
 try{const r=JSON.parse(localStorage.getItem('fd_daily')||'{}');if(!r[D.s.day]||r[D.s.day]<D.score){r[D.s.day]=D.score;localStorage.setItem('fd_daily',JSON.stringify(r))}}catch(e){}}
function dailyTip(){const D=DAILY;if(D.res==='a'){dailyDone();return'挑戰成功！得分 '+D.score+'（剩餘體力％＋剩餘秒數×2）　今日最佳 '+dailyBest(D.s.day)+'　按 Enter 回選單'}return'挑戰失敗…明天會有新題目，今天也可以再挑戰　按 Enter 回選單'}
function dailyEnd(){if(DAILY){G.diff=DAILY.d0;G.stage=DAILY.g0;DAILY=null}}
function dailyCard(){const b=$('b10');if(!b)return;const s=dailySpec(today()),best=dailyBest(s.day);b.querySelector('small').textContent=CH[s.me].n+' vs 強化版'+CH[s.op].n+'・'+muNames(s.mu)+(best?'　今日最佳 '+best:'')}
$('b10').onclick=()=>{snd(500,.1);dailyStart()};
muUI();dailyCard();
