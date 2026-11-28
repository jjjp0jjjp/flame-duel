// ===== 爬塔模式：一路打電腦，每贏一層選一張強化卡，輸了就結束 =====
// 強化效果都掛在角色身上（倍率或 p 開頭的欄位），開局時依清單套用，並寫進重播（REC.pk）
const PERKS={
 atk:{n:'力量',d:'造成傷害 +10%',f:f=>{f.sdm*=1.1}},
 hp:{n:'強韌',d:'體力上限 +15%',f:f=>{f.hm=(f.hm||1)*1.15}},
 mg:{n:'鬥志',d:'集氣速度 +30%',f:f=>{f.smg*=1.3}},
 spd:{n:'迅捷',d:'移動速度 +8%',f:f=>{f.sspd*=1.08}},
 ls:{n:'嗜血',d:'打中對手回復傷害的 10%',f:f=>{f.pls=(f.pls||0)+.1}},
 mt:{n:'蓄勢',d:'每場開打就有 50 氣',f:f=>{f.pmt=Math.min(100,(f.pmt||0)+50)}},
 bu:{n:'不屈',d:'每回合可以爆氣兩次',f:f=>{f.pbu=2},once:1},
 th:{n:'荊棘',d:'被打中時反彈 15% 傷害給對手',f:f=>{f.pth=(f.pth||0)+.15}},
 dc:{n:'靈動',d:'衝刺冷卻減半',f:f=>{f.pdc=.5},once:1},
 heal:{n:'休整',d:'立刻回復 50% 體力（不佔強化）',heal:1}};
let TOWER=null;
function perkApply(){const L=G.pko||[TOWER&&G.mode===1?TOWER.perks:[],[]];G.pko=null;
 [p1,p2].forEach((f,k)=>{const l=(L[k]||[]).filter(id=>PERKS[id]&&!PERKS[id].heal);if(!l.length)return;l.forEach(id=>PERKS[id].f(f));f.pk=l.slice();f.reset()});
 if(REC&&(p1.pk||p2.pk))REC.pk=[p1.pk||[],p2.pk||[]]}
function towerBest(c){try{return(JSON.parse(localStorage.getItem('fd_tower')||'{}'))[c]||0}catch(e){return 0}}
function towerFight(){const T=TOWER;let c;do{c=Math.floor(Math.random()*CH.length)}while(c===T.last&&CH.length>1);T.last=c;
 const fl=T.floor,elite=fl%5===0;G.diff=fl<=2?0:fl<=5?1:2;G.stage=Math.floor(Math.random()*STG.length);G.muo=elite?muRand():0;
 SST=[T.sty,Math.random()<.5?1:0];chainStart(T.me,c,1,T.hp,null);SST=T.sst;
 const sc=Math.min(1.6,1+.05*(fl-1)+(elite?.1:0));if(sc!==1){p2.hm=(p2.hm||1)*sc;p2.reset()}
 if(T.hp!=null){p1.hp=p1.lag=Math.min(p1.ch.hp*(p1.hm||1),T.hp)}
 if(REC){REC.h=[p1.hm||1,p2.hm||1];REC.ini={ft:1,hp:[p1.hp,p2.hp]}}T.res=null;T.pick=null}
function towerStart(){TOWER={me:sel[0],sty:SST[0],sst:SST.slice(),floor:1,perks:[],hp:null,last:-1,res:null,d0:G.diff,g0:G.stage,done:0};towerFight()}
// 贏了：從 3 張卡選 1 張（已拿過、只能拿一次的不會再出現），選完進下一層
function towerPick(){const T=TOWER,pool=Object.keys(PERKS).filter(id=>!(PERKS[id].once&&T.perks.includes(id)));
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 const C=pool.slice(0,3),d=document.createElement('div');d.id='tpick';
 d.innerHTML='<div class="tp" style="width:min(640px,94vw);max-width:none;text-align:center"><b>第 '+T.floor+' 層突破！選一張強化</b><div class="cards">'+C.map(id=>'<button data-id="'+id+'"><b>'+PERKS[id].n+'</b><small>'+PERKS[id].d+'</small></button>').join('')+'</div><div style="font-size:12px;color:#aab">目前：'+(T.perks.map(id=>PERKS[id].n).join('、')||'無')+'</div></div>';
 document.body.appendChild(d);
 d.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{const id=b.dataset.id,mx=p1.ch.hp*(p1.hm||1);let hp=Math.min(mx,p1.hp+p1.ch.hp*.25);
  if(PERKS[id].heal)hp=Math.min(mx,hp+mx*.5);else T.perks.push(id);T.hp=hp;T.floor++;d.remove();snd(700,.1);towerFight()});
 const kd=e=>{const n={Digit1:0,Digit2:1,Digit3:2,Numpad1:0,Numpad2:1,Numpad3:2}[e.code];if(n!=null&&d.isConnected){const b=d.querySelectorAll('[data-id]')[n];if(b)b.click()}if(!d.isConnected)removeEventListener('keydown',kd)};addEventListener('keydown',kd);
 d.querySelector('.tp').insertAdjacentHTML('beforeend','<div style="font-size:12px;color:#8a8fa8">也可以按 1／2／3 選擇</div>');
 T.pick=d}
function towerNext(){const T=TOWER;if(!T||!T.res||T.pick)return;if(T.done){toMenu();return}
 if(T.res==='a'){achEv('tower',T.floor);towerPick();return}
 T.done=1;try{const r=JSON.parse(localStorage.getItem('fd_tower')||'{}');if((r[T.me]||0)<T.floor-1){r[T.me]=T.floor-1;localStorage.setItem('fd_tower',JSON.stringify(r))}}catch(e){}
 G.msg='止步第 '+T.floor+' 層';G.mt=G.mm=1e9}
function towerTip(){const T=TOWER;return T.done?'突破 '+(T.floor-1)+' 層（最佳 '+towerBest(T.me)+'）　按 Enter 回選單':T.res==='a'?'第 '+T.floor+' 層突破！按 Enter 選擇強化':'按 Enter 結算'}
function towerEnd(){if(TOWER){if(TOWER.pick)TOWER.pick.remove();G.diff=TOWER.d0;G.stage=TOWER.g0;SST=TOWER.sst;TOWER=null}}
function towerHud(){if(!TOWER||G.phase==='menu')return;ctx.save();ctx.textAlign='center';ctx.font='bold 14px '+FONT;ctx.fillStyle=TOWER.floor%5===0?'#ff6b6b':'#ffe14d';ctx.fillText('爬塔 第 '+TOWER.floor+' 層'+(TOWER.floor%5===0?'　精英':'')+(TOWER.perks.length?'　強化：'+TOWER.perks.map(id=>PERKS[id].n).join('・'):''),W/2,110);ctx.restore()}
function towerCard(){const b=$('b11');if(!b)return;const best=Math.max(0,...CH.map((_,i)=>towerBest(i)));b.querySelector('small').textContent='每層選一張強化卡，看你能爬多高'+(best?'　最佳 '+best+' 層':'')}
$('b11').onclick=()=>{snd(500,.1);towerStart()};towerCard();
