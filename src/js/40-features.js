// ===== 輸入集中：每次 step 取得雙方輸入（訓練木樁、錄製、重播都走這裡）=====
let RP=null,REC=null;
function inputs(hs){
 if(RP)return rpNext();
 let a=G.mode===4?d1:human(K1,pv1),b;
 if(G.mode===1)b=hs?null:aiInput(p2,p1);
 else if(G.mode===2)b=human(K2,pv2);
 else if(G.mode===4)b=d2;
 else{const r=dummyIn(a);a=r[0];b=r[1]}
 if(REC)recPush(a,b);
 if(G.mode===3||RP)inRec(a,b);
 return[a,b];
}
// ===== 選角卡片 =====
const STAT=[['體力','hp',90,128],['速度','spd',3,5.1],['跳躍','jmp',12.5,16.2]];
const THUMB=[];
function makeThumbs(){CH.forEach((ch,i)=>{const c=document.createElement('canvas');c.width=120;c.height=144;
 ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,240,288);portrait(ch,'idle',120,272,1.25,1);ctx.restore();
 c.getContext('2d').drawImage(cv,0,0,240,288,0,0,120,144);THUMB[i]=c});ctx.clearRect(0,0,W,H)}
// ===== 主選單：選角網格、動態預覽、難度、場景 =====
let PT=0,PVF=0; // PT：目前在選 P1(0) 或 P2(1)
const STH=[];
const HEAD=[];
function makeHeads(){CH.forEach((ch,i)=>{const c=document.createElement('canvas');c.width=c.height=200;
 ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,240,460);portrait(ch,'',92,356,2.3,1);ctx.restore();
 c.getContext('2d').drawImage(cv,0,0,200,200,0,0,200,200);HEAD[i]=c});ctx.clearRect(0,0,W,H)}
function selUI(){
 const g=$('grid');
 if(!g.children.length)CH.forEach((ch,i)=>{const b=document.createElement('button');b.className='cell';b.title=ch.n+'・'+ch.ds;b.style.background='radial-gradient(circle at 50% 38%,'+ch.col+'66,#0b0b1e 72%)';
  const c=document.createElement('canvas');c.width=c.height=200;c.getContext('2d').drawImage(HEAD[i],0,0);
  b.appendChild(c);b.insertAdjacentHTML('beforeend','<span class="nm">'+ch.n+'</span><span class="bd b1">1P</span><span class="bd b2">2P</span>');
  b.onclick=()=>{sel[PT]=i;snd(600+i*40,.06,'triangle',.05);if(PT===0&&!selUI.p2){selUI.p2=1;PT=1}lab()};
  b.onmouseenter=()=>{selUI.hv=i;selUI()};b.onmouseleave=()=>{selUI.hv=-1;selUI()};g.appendChild(b)});
 [...g.children].forEach((b,i)=>{const a=sel[0]===i,c=sel[1]===i;b.classList.toggle('p1',a);b.classList.toggle('p2',c);b.classList.toggle('cur',sel[PT]===i);b.querySelector('.b1').style.display=a?'':'none';b.querySelector('.b2').style.display=c?'':'none'});
 [...$('ptabs').querySelectorAll('[data-p]')].forEach(b=>b.classList.toggle('on',+b.dataset.p===PT));
 const i=selUI.hv>=0?selUI.hv:sel[PT],ch=CH[i];
 $('pvinfo').innerHTML='<h3 style="color:'+ch.col+'">'+ch.n+'</h3><div>'+ch.ds+'</div>'+STAT.map(s=>'<div class="st"><span>'+s[0]+'</span><i><u style="width:'+Math.round(100*(ch[s[1]]-s[2])/(s[3]-s[2]))+'%;background:'+ch.col+'"></u></i><span>'+ch[s[1]]+'</span></div>').join('')+'<div class="ps">被動：'+CHM[i].p+'</div><div class="mv">'+CHM[i].m.slice(0,3).map(x=>x[0]+' '+x[1].replace(/（.*）/,'')).join('　')+'</div>';
 $('vsline').innerHTML='<span style="color:'+CH[sel[0]].col+'">P1 '+CH[sel[0]].n+'</span>　VS　<span style="color:'+CH[sel[1]].col+'">'+CH[sel[1]].n+' P2</span>';
 [...$('dfseg').children].forEach(b=>b.classList.toggle('on',+b.dataset.v===G.diff));
 const sg=$('stgs');if(!sg.children.length)STG.forEach((S,k)=>{const b=document.createElement('button');b.title=S.n;const c=document.createElement('canvas');c.width=168;c.height=94;c.getContext('2d').drawImage(STH[k],0,0,168,94);b.appendChild(c);b.insertAdjacentHTML('beforeend','<span>'+S.n+'</span>');b.onclick=()=>{G.stage=k;lab()};sg.appendChild(b)});
 [...sg.children].forEach((b,k)=>b.classList.toggle('on',k===G.stage));
}
function makeStageThumbs(){const rs=RS;RS=1;STG.forEach((S,k)=>{STH[k]=makeBg(S)});RS=rs}
// 預覽：選單開著時，在（被選單蓋住的）主畫布上畫角色，再複製到預覽框；輪流顯示出場與勝利姿勢
function menuTick(){
 if(G.phase!=='menu'||$('menu').style.display==='none')return;
 PVF++;const i=selUI.hv>=0?selUI.hv:sel[PT],ch=CH[i],f0=G.frame;G.frame=PVF;
 ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,300,340);portrait(ch,PVF%360<180?'intro':'win',150,320,1.7,1);ctx.restore();G.frame=f0;
 const pc=$('pv').getContext('2d'),g=pc.createRadialGradient(150,200,10,150,200,200);g.addColorStop(0,ch.col+'66');g.addColorStop(1,'#0b0b1e');pc.fillStyle=g;pc.fillRect(0,0,300,340);pc.drawImage(cv,0,0,300,340,0,0,300,340);
}
$('ptabs').querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{PT=+b.dataset.p;selUI.p2=1;lab()});
$('rnd').onclick=()=>{sel[PT]=Math.random()*CH.length|0;snd(700,.08,'triangle',.05);lab()};
[...$('dfseg').children].forEach(b=>b.onclick=()=>{G.diff=+b.dataset.v;lab()});
selUI.hv=-1;
// 方向鍵在選單上移動選角游標（焦點不在輸入框時）
addEventListener('keydown',e=>{if(G.phase!=='menu'||$('menu').style.display==='none'||KCAP)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;
 const mv={ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4}[e.code];if(mv===undefined)return;e.preventDefault();sel[PT]=(sel[PT]+mv+CH.length)%CH.length;lab()});
// ===== 訓練模式 =====
const DUM=['站立','蹲防','隨機防禦','跳躍','防後反擊','重播錄製'];
const TR={dm:0,rec:0,buf:[],pi:0,rb:0,ra:null,ps:0,tr:-1,seq:[],ok:0,okT:0};
let FD=null,TUT=null;
function dummyIn(a){
 if(TR.rec){if(TR.buf.length<900)TR.buf.push(a);else trRec();return[NI,a]}
 const b=Object.assign({},NI),m=TR.dm,to=p1.x>p2.x?'r':'l';
 if(TUT&&TUT.i===TUT.L.length-2){if(Math.abs(p1.x-p2.x)>85)b[to]=1;else if(p2.st!=="atk"&&p2.st!=="hit"&&G.frame%45===0)b.hp=1;return[a,b]}
 if(m===1)b.d=1;
 else if(m===2){if(p1.atk&&p1.atk!==TR.ra){TR.ra=p1.atk;TR.rb=Math.random()<.5}if(!p1.atk)TR.ra=null;if(TR.rb&&p1.atk)b.d=1}
 else if(m===3){if(p2.y>=GY&&G.frame%45===0)b.u=1}
 else if(m===4){b.d=1;const st=p2.stun>0||p2.st==='hit'||p2.st==='down';if(p2.stun===1||(p2.st==='down'&&p2.dt===6))b.lp=1;TR.ps=st}
 else if(m===5&&TR.buf.length){b.l=0;Object.assign(b,TR.buf[TR.pi++%TR.buf.length])}
 return[a,b];
}
function trRec(){if(TR.rec){TR.rec=0;if(TR.buf.length){TR.dm=5;TR.pi=0}}else{TR.rec=1;TR.buf=[];trReset()}tbar()}
function trReset(){p1.reset();p2.reset();projs=[];FD=null;G.cam={z:1,cx:W/2}}
const MVN={lp:'輕拳',hp:'重拳',lk:'輕腳',hk:'重腳',jab:'前手刺拳',lunge:'突進肘擊',push:'推踢',spin:'迴旋踢',flip:'後空翻踢',upper:'升龍拳',sweep:'掃堂腿',th:'投技',th2:'背摔',ap:'空拳',ak:'飛踢',dive:'俯衝踢',ctr:'反擊'};
const SPI={sp:0,sp2:1,sp3:2,asp:3,ex:4,sp4:5};
const mvName=(f,k)=>(f.ch.nm&&f.ch.nm[k])||(k==='sp4'&&f.ch.sp4n?f.ch.sp4n.replace(/（.*）/,''):0)||MVN[k]||(SPI[k]!==undefined?CHM[CH.indexOf(f.ch)].m[SPI[k]][1].replace(/（.*）/,''):k);
const actable=f=>f.y>=GY&&(f.st==='idle'||f.st==='walk'||(f.st==='block'&&f.stun===0));
function trainTick(){
 fmRec();
 if(G.phase!=='fight')return;
 if(TUT)tutTick();
 const a=p1.atk;
 if(a&&p1.st==='atk'&&(!FD||FD.a!==a))FD={a,k:a.key,n:mvName(p1,a.key),su:a.su+1,ac:a.ac,rc:a.rc,res:'',adv:null,t1:0,t2:0};
 if(!FD)return;
 if(!FD.res&&p1.hit)FD.res=p2.st==='hit'?'命中':p2.st==='block'?'被防':'接觸';
 if(FD.res&&FD.adv===null&&!FD.kd){
  if(p2.kd||p2.st==='down'||p2.y<GY-4&&FD.res==='命中'){FD.kd=1;return}
  if(!FD.t1&&actable(p1))FD.t1=G.frame;if(!FD.t2&&actable(p2))FD.t2=G.frame;
  if(FD.t1&&FD.t2)FD.adv=FD.t2-FD.t1;
 }
}
// 連段挑戰：依序命中指定招式（用自動測試確認每題都打得出來）
const TRIALS=[
 [['lp','hp'],['lk','hk','sp'],['upper','ap'],['lp','hp','ex']],
 [['lp','hp'],['lk','hk','sp'],['lp','lk','lunge'],['lk','hp','sp','ex']],
 [['lp','hp'],['lp','lk','hk','sp'],['jab','lunge','sp'],['lp','hp','sp','ex']],
 [['lp','hp'],['lk','hk','sp'],['jab','lunge','sp'],['lp','upper','ak']],
 [['lp','hp'],['lp','lk','hk'],['lk','push'],['lp','hk','sp2']],
 [['lp','hp'],['lp','lk','hk'],['lk','hk','sp3'],['lp','hp','ex']],
 [['lp','hp'],['lk','hk','sp'],['jab','push','sp'],['lp','hp','ex']],
 [['lp','hp'],['lk','hk','sp'],['jab','lunge','sp2'],['lp','hp','ex']],
 [['lp','hp'],['jab','push','sp'],['lp','lunge','sp2'],['lp','hp','ex']],
 [['lp','hp'],['lp','lk','hk'],['jab','hp','sp3'],['lk','push','sp']],
 [['lp','hp'],['lp','lunge'],['lk','hk','sp2'],['lp','hp','ex']],
 [['lp','hp'],['lp','lk','hk'],['jab','lunge','sp3'],['lk','hk','sp3']],
 [['lp','hp'],['lp','lk','hk'],['jab','lunge','sp'],['lp','hp','sp3']],
 [['lp','hp'],['lp','lk','hk'],['jab','push','sp3'],['lp','hp','ex']],
 [['lp','hp'],['lp','lk','hk'],['lp','lk','sp2'],['lp','hp','ex']],
 [['lp','hp'],['lp','lk','hk'],['jab','lunge','sp'],['upper','ap']]];
const trialList=()=>TRIALS[CH.indexOf(p1.ch)]||TRIALS[0];
function trHit(a,combo){
 const k=a.mk||a.key;
 if(a===TR.la&&combo>1)return;TR.la=a; // 多段攻擊只算一次
 if(TUT)TUT.hits.push(k);
 if(TR.tr<0||TR.ok)return;
 if(combo===1)TR.seq=[];TR.seq.push(k);
 const t=trialList()[TR.tr];
 if(TR.seq.length===t.length&&TR.seq.every((x,i)=>x===t[i])){TR.ok=1;TR.okT=90;sfx('round')}
}
function trialNext(){TR.tr++;if(TR.tr>=trialList().length)TR.tr=-1;TR.seq=[];TR.ok=0;if(TR.tr>=0)trReset();tbar()}
function tbar(){const on=G.mode===3&&G.phase!=='menu'&&!TUT;$('tbar').style.display=on?'flex':'none';if(!on)return;
 $('tb-hb').textContent='判定框：'+(G.hb?'開':'關');$('tb-dm').textContent='木樁：'+DUM[TR.dm];$('tb-rec').textContent=TR.rec?'■ 停止錄製':'● 錄製木樁';$('tb-tr').textContent='連段挑戰：'+(TR.tr<0?'關':(TR.tr+1)+'／'+trialList().length)}
function trainHud(){
 ctx.save();ctx.textAlign='left';ctx.font='14px '+FONT;
 const L=[];
 if(FD){L.push(['招式：'+FD.n+'　起手 '+FD.su+'・持續 '+FD.ac+'・收招 '+FD.rc,'#fff']);
  if(FD.res)L.push([FD.res+(FD.kd?'：對手倒地':FD.adv===null?'：計算中…':'：'+(FD.adv>0?'+':'')+FD.adv+' 幀（'+(FD.adv>0?'你先動':FD.adv<0?'對手先動':'同時')+'）'),FD.res==='命中'?'#ffe14d':'#7ec8ff'])}
 if(TR.rec)L.push(['● 錄製中：用 P1 按鍵操作木樁（'+(TR.buf.length/60).toFixed(1)+'／15 秒），再按一次「停止錄製」','#ff6b6b']);
 else if(TR.dm===5)L.push(['木樁正在重播你錄的動作（'+(TR.buf.length/60).toFixed(1)+' 秒循環）','#cfd2ff']);
 fmDraw();inDraw(0,12);
 if(L.length){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(12,H-44-L.length*22,620,L.length*22+8);L.forEach((l,i)=>{ctx.fillStyle=l[1];ctx.fillText(l[0],22,H-26-L.length*22+i*22)})}
 if(TR.tr>=0){const t=trialList()[TR.tr],n=TR.ok?t.length:(()=>{let k=0;while(k<TR.seq.length&&TR.seq[k]===t[k])k++;return k})();
  ctx.textAlign='center';ctx.font='bold 20px '+FONT;const s=t.map((k,i)=>(i<n?'✔':'')+mvName(p1,k)).join(' → ');
  ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(W/2-300,92,600,58);ctx.fillStyle='#ffe14d';ctx.fillText('連段挑戰 '+(TR.tr+1)+'／'+trialList().length,W/2,116);ctx.fillStyle=TR.ok?'#3ddc6a':'#fff';ctx.fillText(TR.ok?'成功！'+s:s,W/2,142);
  if(TR.ok&&--TR.okT<=0)trialNext()}
 ctx.restore();
}
// ===== 新手教學 =====
function tutStart(){TUT={i:0,c:0,hits:[],blk:0,L:[
 [()=>'用 '+KN(0,0)+'／'+KN(0,1)+' 左右走動',()=>p1.st==='walk'&&++TUT.c>40],
 [()=>'按 '+KN(0,2)+' 跳躍',()=>p1.y<GY-25],
 [()=>'快速連按兩下 '+KN(0,1)+'（或 '+KN(0,0)+'）衝刺',()=>p1.st==='dash'],
 [()=>'走近木樁，按 '+KN(0,4)+' 輕拳打中它',()=>TUT.hits.includes('lp')],
 [()=>'按 '+KN(0,7)+' 重腳打中木樁',()=>TUT.hits.includes('hk')],
 [()=>'按 '+KN(0,8)+' 放必殺技（需要 50 氣）',()=>p1.atk&&SPI[p1.atk.key]!==undefined&&p1.atk.key!=='ex'],
 [()=>'連段：'+KN(0,4)+' 輕拳打中後，馬上按 '+KN(0,5)+' 重拳',()=>{const h=TUT.hits;return p2.combo>=2&&h.lastIndexOf('hp')>0&&h[h.lastIndexOf('hp')-1]==='lp'}],
 [()=>'木樁會出拳：按住 '+KN(0,3)+' 蹲下防禦，擋下 3 次（'+TUT.blk+'／3）',()=>TUT.blk>=3],
 [()=>'超必殺：按住 '+KN(0,3)+' 再按 '+KN(0,8)+'（需要 100 氣）',()=>p1.atk&&p1.atk.key==='ex']]};
 startGame(3);G.vs=0;tbar()}
function tutTick(){const s=TUT.L[TUT.i];if(s&&s[1]()){TUT.i++;TUT.c=0;TUT.hits=[];sfx('round');if(TUT.i>=TUT.L.length){try{localStorage.setItem('fd_tut','1')}catch(e){}TUT.done=180}}}
function tutHud(){ctx.save();ctx.textAlign='center';ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(W/2-330,92,660,64);
 if(TUT.i>=TUT.L.length){ctx.font='900 26px '+FONT;ctx.fillStyle='#3ddc6a';ctx.fillText('教學完成！去跟電腦打一場吧',W/2,132);if(--TUT.done<=0){TUT=null;toMenu()}}
 else{ctx.font='bold 14px '+FONT;ctx.fillStyle='#ffe14d';ctx.fillText('新手教學 '+(TUT.i+1)+'／'+TUT.L.length+'（Esc 暫停，Q 離開）',W/2,112);ctx.font='bold 22px '+FONT;ctx.fillStyle='#fff';ctx.fillText(TUT.L[TUT.i][0](),W/2,142)}
 ctx.restore()}
// ===== 手機：虛擬搖桿 + 按鈕大小 =====
(function(){const st=$('stick'),kn=$('knob');let id=null;const set=(k,v)=>{if(v&&!keys[k])pend[k]=1;keys[k]=v?1:0};
 const mv=e=>{const r=st.getBoundingClientRect(),R=r.width/2;let dx=e.clientX-r.left-R,dy=e.clientY-r.top-R;const d=Math.hypot(dx,dy),m=R*.6;if(d>m){dx*=m/d;dy*=m/d}
  kn.style.transform='translate('+dx+'px,'+dy+'px)';const t=R*.28;set('T0l',dx<-t);set('T0r',dx>t);set('T0u',dy<-t*1.3);set('T0d',dy>t*1.3)};
 const up=()=>{id=null;kn.style.transform='';['T0l','T0r','T0u','T0d'].forEach(k=>set(k,0))};
 st.addEventListener('pointerdown',e=>{e.preventDefault();id=e.pointerId;try{st.setPointerCapture(id)}catch(x){}mv(e)});
 st.addEventListener('pointermove',e=>{if(e.pointerId===id)mv(e)});
 ['pointerup','pointercancel'].forEach(n=>st.addEventListener(n,e=>{if(e.pointerId===id)up()}));
 const PS=[['小',44],['中',52],['大',62]];let ps=1;try{ps=+(localStorage.getItem('fd_pad')||1)}catch(e){}
 const ap=()=>{document.documentElement.style.setProperty('--pb',PS[ps][1]+'px');$('psz').textContent='觸控按鈕：'+PS[ps][0]};
 $('psz').onclick=()=>{ps=(ps+1)%3;try{localStorage.setItem('fd_pad',ps)}catch(e){}ap()};ap()})();
// ===== 綁定 =====
$('b5').onclick=()=>{snd(500,.1);tutStart()};
try{if(!localStorage.getItem('fd_tut'))$('b5').classList.add('hot')}catch(e){}
const tbClick=(id,f)=>{const b=$(id);b.addEventListener('mousedown',e=>e.preventDefault());b.onclick=()=>{f();tbar()}};
tbClick('tb-hb',()=>{G.hb=!G.hb});tbClick('tb-dm',()=>{if(TR.rec)return;TR.dm=(TR.dm+1)%(TR.buf.length?6:5);TR.pi=0});tbClick('tb-rec',trRec);tbClick('tb-tr',trialNext);tbClick('tb-rs',trReset);
// ===== 設定：改鍵、音量、說明分頁、判定框 =====
const ACT=['左','右','跳','蹲／防','輕拳','重拳','輕腳','重腳','必殺','投技'];
const isV=c=>/^[PT]\d[a-z]$/.test(c);
const KDEF=[K1.map(a=>a.filter(c=>!isV(c))),K2.map(a=>a.filter(c=>!isV(c)))];
const KV=[K1.map(a=>a.filter(isV)),K2.map(a=>a.filter(isV))];
function setKeys(kb){[K1,K2].forEach((K,p)=>K.forEach((a,j)=>{a.length=0;a.push(...kb[p][j],...KV[p][j])}))}
const curKeys=()=>[K1,K2].map(K=>K.map(a=>a.filter(c=>!isV(c))));
try{const o=JSON.parse(localStorage.getItem('fd_keys')||'null');if(Array.isArray(o)&&o.length===2&&o.every(x=>Array.isArray(x)&&x.length===10&&x.every(Array.isArray)))setKeys(o.map(x=>x.map(a=>a.filter(c=>typeof c==='string'&&!isV(c)).slice(0,3))))}catch(e){}
function saveKeys(){try{localStorage.setItem('fd_keys',JSON.stringify(curKeys()))}catch(e){}}
const bound=c=>K1.some(a=>a.includes(c))||K2.some(a=>a.includes(c));
const KNM={ArrowLeft:'←',ArrowRight:'→',ArrowUp:'↑',ArrowDown:'↓',Space:'空白',ShiftLeft:'左Shift',ShiftRight:'右Shift',ControlLeft:'左Ctrl',ControlRight:'右Ctrl',AltLeft:'左Alt',AltRight:'右Alt',Comma:',',Period:'.',Slash:'/',Semicolon:';',Quote:"'",BracketLeft:'[',BracketRight:']',Backslash:'\\',Minus:'-',Equal:'=',Backquote:'`',Backspace:'退格'};
function keyName(c){if(!c)return'—';if(KNM[c])return KNM[c];let m=c.match(/^Key([A-Z])$/);if(m)return m[1];m=c.match(/^Digit(\d)$/);if(m)return m[1];m=c.match(/^Numpad(.+)$/);if(m)return'數'+m[1];return c}
const KN=(p,j)=>{const a=(p?K2:K1)[j].filter(c=>!isV(c));return a.length?a.map(keyName).join('／'):'—'};
let KCAP=null;
function kcapDone(code){const c=KCAP;KCAP=null;if(!c)return;
 if(code!=='Escape'&&code!=='Enter'&&!/^F\d+$/.test(code)){
  [K1,K2].forEach(K=>K.forEach(a=>{const i=a.indexOf(code);if(i>=0)a.splice(i,1)}));
  const a=(c.p?K2:K1)[c.j];a.length=0;a.push(code,...KV[c.p][c.j]);saveKeys();
 }
 keyTable();helpRender()}
function keyTable(){
 let h='<table><tr><td></td><td>P1</td><td>P2</td></tr>';
 ACT.forEach((n,j)=>{h+='<tr><td>'+n+'</td>'+[0,1].map(p=>'<td><button data-p="'+p+'" data-j="'+j+'"'+(KCAP&&KCAP.p===p&&KCAP.j===j?' class="wait">按下按鍵…':'>'+KN(p,j))+'</button></td>').join('')+'</tr>'});
 $('keytab').innerHTML=h+'</table>';
 $('keytab').querySelectorAll('button').forEach(b=>b.onclick=()=>{KCAP={p:+b.dataset.p,j:+b.dataset.j};keyTable()});
}
document.querySelectorAll('#set input[type=range]').forEach(r=>{r.value=VOL[r.dataset.v];
 r.oninput=()=>{VOL[r.dataset.v]=+r.value;setVol();try{localStorage.setItem('fd_vol',JSON.stringify(VOL))}catch(e){}};
 r.onchange=()=>{MUS=r.dataset.v==='mus'?1:0;try{snd(440,.12,'triangle',.08)}finally{MUS=0}}});
$('bset').onclick=()=>{const v=$('set').style.display==='none';$('set').style.display=v?'block':'none';if(v){keyTable();$('set').scrollIntoView&&$('set').scrollIntoView({block:'nearest'})}};
$('sclose').onclick=()=>{KCAP=null;$('set').style.display='none'};
$('kdef').onclick=()=>{KCAP=null;setKeys(KDEF);saveKeys();keyTable();helpRender()};
// 角色專屬招式（↓ 蹲、→ 朝向對手、← 背向對手）
const CHM=[
 {p:'腳技起手更快',m:[['必殺','波動彈'],['→+必殺','雙連波'],['←+必殺','烈焰升龍（無敵反擊）'],['空中 必殺','俯射火球'],['↓+必殺','炎龍波']]},
 {p:'重攻擊起手有霸體',m:[['必殺','衝擊拳'],['→+必殺','震地波（下段）'],['←+必殺','爆裂摔（指令投）'],['空中 必殺','墜地重砸'],['↓+必殺','崩山拳']]},
 {p:'二段跳、輕攻擊起手更快',m:[['必殺','疾風斬'],['→+必殺','瞬移斬'],['←+必殺','影遁手裏劍（退後無敵）'],['空中 必殺','雙苦無'],['↓+必殺','影分身斬']]},
 {p:'集氣更快、重攻擊較長',m:[['必殺','雷球'],['→+必殺','落雷（定點對空）'],['←+必殺','電磁場（無敵）'],['空中 必殺','雷矢'],['↓+必殺','天雷陣']]},
 {p:'投技範圍與傷害提升、不易被擊退',m:[['必殺','突進抓（指令投）'],['→+必殺','岩石投擲'],['←+必殺','岩壁反擊（擋下攻擊後自動反擊）'],['空中 必殺','隕石墜（落地震波）'],['↓+必殺','大地崩壞']]},
 {p:'腿技範圍較長',m:[['必殺','冰錐（慢速）'],['→+必殺','冰牆（擋下飛行道具）'],['←+必殺','冰滑步（下段擊倒）'],['空中 必殺','冰霰（兩發）'],['↓+必殺','絕對零度（穿透四次）']]},
 {p:'普通技起手更快',m:[['必殺','旋風腳（突進）'],['→+必殺','風刃（高速）'],['←+必殺','吸風（拉近、兩段）'],['空中 必殺','空中旋風（三段）'],['↓+必殺','天嵐旋（無敵、五段）']]},
 {p:'長棍：攻擊距離長，但起手較慢',m:[['必殺','棍突（遠距）'],['→+必殺','掃棍（下段擊倒）'],['←+必殺','撐竿飛擊（跳起攻擊）'],['空中 必殺','迴旋棍（兩段）'],['↓+必殺','千峰棍']]},
 {p:'拳頭普通技起手更快',m:[['必殺','連打拳（五段）'],['→+必殺','爆裂直拳（霸體）'],['←+必殺','燃魂（6 秒內傷害 +25%）'],['空中 必殺','空中連拳（三段）'],['↓+必殺','燃魂千拳（八段）']]},
 {p:'重拳、重腳命中會讓對手中毒',m:[['必殺','鎖鏈鉤（遠距拉近）'],['→+必殺','毒雷（地上陷阱、下段）'],['←+必殺','毒霧（三段、中毒）'],['空中 必殺','空中鉤鎖（拉近）'],['↓+必殺','千毒葬（指令投、劇毒）']]},
 {p:'空中移動更靈活',m:[['必殺','迴旋扇（會飛回來）'],['→+必殺','蝶舞（三段突進）'],['←+必殺','翩躚（無敵後跳）'],['空中 必殺','天羽（滯空兩段）'],['↓+必殺','百花繚亂']]},
 {p:'機甲：飛行道具傷害減半',m:[['必殺','火箭拳（擊倒）'],['→+必殺','飛彈雨（往前三發）'],['←+必殺','噴射衝撞（霸體）'],['空中 必殺','推進墜擊（霸體）'],['↓+必殺','破壞光束（全畫面六段）']]},
 {p:'劍技：重拳、重腳距離較長',m:[['必殺','居合斬（穿到對手背後）'],['→+必殺','飛燕斬（快速劍氣）'],['←+必殺','破甲斬（被擋也會破防）'],['空中 必殺','十字斬（兩段）'],['↓+必殺','一閃']]},
 {p:'吸魂：每次命中回復少量體力',m:[['必殺','魂球（追蹤）'],['→+必殺','詛咒陣（對手傷害 -25%）'],['←+必殺','吸魂掌（大量回復）'],['空中 必殺','墜魂（追蹤）'],['↓+必殺','黃泉之門（五段、吸血、詛咒）']]},
 {p:'狂暴：體力低於 35% 時傷害 +30%',m:[['必殺','飛撲（跳起指令投）'],['→+必殺','撕咬（四段）'],['←+必殺','咆哮（震開對手、吸走 30 氣）'],['空中 必殺','重壓'],['↓+必殺','狂獸亂舞（七段、霸體）']]},
 {p:'鷹眼：箭速極快',m:[['必殺','速射（中箭後移動變慢）'],['→+必殺','拋射（拋物線、擊倒）'],['←+必殺','後躍射（邊跳開邊射）'],['空中 必殺','箭雨（兩發）'],['↓+必殺','天羽箭雨（五發）']]}];
// 指令技清單（每個角色不同）
const CMDK=[['jab','→+輕拳'],['lunge','→+重拳'],['push','→+輕腳'],['spin','→+重腳'],['flip','←+重腳'],['upper','↓+輕拳'],['dhp','↓+重拳'],['dlk','↓+輕腳'],['blp','←+輕拳'],['bhp','←+重拳'],['ahp','空中 重拳']];
const cmdTag=a=>a.ovh?'（中段）':a.low?'（下段）':a.hits?'（'+a.hits+'段）':a.arm?'（霸體）':a.nohit?'（閃避）':a.kb<0?'（拉近）':a.rev?'（打到身後）':a.psn?'（中毒）':a.wk?'（詛咒）':a.ls?'（吸血）':a.sl?'（緩速）':a.type==='proj'?'（射擊）':a.hop?'（跳起）':'';
const cmdList=ch=>CMDK.map(([k,l])=>[l,ch.nm[k]+cmdTag(ch.mv[k])]);
const spList=i=>CHM[i].m.concat(CH[i].sp4n?[['↓+投技',CH[i].sp4n]]:[]);
let HTAB='基本';
function helpRender(){
 const k=j=>'<b>'+KN(0,j)+'</b>',q=j=>'<b>'+KN(1,j)+'</b>';
 const T={
  '基本':`<b>三戰兩勝</b>，每回合 60 秒。攻擊、受擊都會累積氣槽：50 氣放<b>必殺</b>，100 氣放<b>超必殺</b>。<br>
<b>P1 移動：</b>${k(0)}／${k(1)} 走，${k(2)} 跳（輕點是小跳），${k(3)} 蹲下防禦；連按兩下方向衝刺（後撤有無敵）。背對對手按住也會自動防禦。<br>
<b>P1 出招：</b>${k(4)} 輕拳　${k(5)} 重拳　${k(6)} 輕腳　${k(7)} 重腳　${k(8)} 必殺　${k(9)} 投技<br>
<b>P2：</b>${q(0)} ${q(1)} ${q(2)} ${q(3)} 移動；${q(4)} 輕拳　${q(5)} 重拳　${q(6)} 輕腳　${q(7)} 重腳　${q(8)} 必殺　${q(9)} 投技<br>
按鍵可在上方「設定」更改。第一次玩建議先到「訓練模式」熟悉操作。`,
  '組合招':`方向以角色為準：<b>↓</b>＝蹲（${k(3)}），<b>→</b>＝朝向對手，<b>←</b>＝背向對手。<br>
<b>共通：</b>↓+重腳 掃堂腿（下段擊倒）　←+投技 背摔　↓+必殺 超必殺（100 氣）　↓+投技 第六個必殺技（50 氣）<br>
<b>每個角色專屬：</b>→+輕拳、→+重拳、→+輕腳、→+重腳、←+輕拳、←+重拳、←+重腳、↓+輕拳、↓+重拳、↓+輕腳、空中重拳 這 11 個指令技每人都不同，名稱與特性見「角色」分頁或暫停畫面。<br>
<b>上下段：</b>標示<b>中段</b>的招式和所有跳躍攻擊要<b>站著擋</b>（按住後方），<b>下段</b>要<b>蹲著擋</b>，擋錯會被打中。<br>
<b>空中：</b>輕拳／重拳 空拳　輕腳／重腳 飛踢　↓+輕腳／重腳 俯衝踢<br>
<b>連段：</b>輕攻擊命中或被防後可取消成其他招式；重攻擊可取消成必殺／升龍；升龍命中後可接空中拳腳；必殺後可接超必殺。同一連段每招只能用一次。命中後雙擊方向可衝刺取消，重攻擊命中後按跳可跳躍取消。<br>
<b>防守：</b>對手投你時搶先按投技可拆投（指令投無法拆）；對手出招起手時打中他會觸發<b>反擊（傷害 +30%）</b>；倒地時先按招式可起身反擊。`,
  '角色':CH.map((c,i)=>`<b style="color:${c.col}">${c.n}・${c.ds}</b>（體力 ${c.hp}）　被動：${CHM[i].p}<br>　指令技：`+cmdList(c).map(x=>x[0]+' '+x[1]).join('　')+'<br>　必殺技：'+spList(i).map(x=>x[0]+' '+x[1]).join('　')).join('<br>'),
  '系統':`<b>暫停：</b>P 或 Esc（暫停時按 Q 回選單）　<b>靜音：</b>M　<b>判定框：</b>F2（藍＝受擊框、紅＝攻擊判定、紫＝投技、黃＝反擊架勢、白＝無敵）<br>
<b>手把：</b>X 輕拳、Y 重拳、A 輕腳、B 重腳、RB／RT 必殺、LB／LT 投技，方向鍵或左搖桿移動。<br>
<b>手機：</b>螢幕下方有按鈕（操作 P1）。<br>
<b>其他：</b>把對手逼到牆角時，你會被反彈後退。連線對戰使用 P1 按鍵，不能暫停，按 Esc 離開。`};
 $('htabs').innerHTML=Object.keys(T).map(n=>'<button'+(n===HTAB?' class="on"':'')+'>'+n+'</button>').join('');
 $('htabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{HTAB=b.textContent;helpRender()});
 $('hbody').innerHTML=T[HTAB];
}
helpRender();
function pauseScreen(){
 ctx.save();ctx.fillStyle='#000c';ctx.fillRect(0,0,W,H);ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='900 46px '+FONT;ctx.fillText('暫停',W/2,70);
 const k=j=>KN(0,j),L=[
  [k(4)+' 輕拳　'+k(5)+' 重拳　'+k(6)+' 輕腳　'+k(7)+' 重腳　'+k(8)+' 必殺　'+k(9)+' 投技　雙擊方向 衝刺','#fff'],
  ['↓+重腳 掃堂腿（下段）　←+投技 背摔　↓+必殺 超必殺（100 氣）　↓+投技 第六必殺　中段要站著擋、下段要蹲著擋','#fff'],
  ['連段：輕→重→必殺→超必殺；同一連段每招只能用一次；命中後可衝刺或跳躍取消','#cfd2ff'],['','#fff']];
 const who=[p1].concat(G.mode===2&&p2.ch!==p1.ch?[p2]:[]);
 who.forEach(f=>{const i=CH.indexOf(f.ch);const cl=cmdList(f.ch).map(x=>x[0]+' '+x[1].replace(/（.*）/,''));L.push([f.ch.n+'：'+cl.slice(0,6).join('　'),f.ch.col]);L.push([cl.slice(6).join('　'),f.ch.col]);L.push([spList(i).map(x=>x[0]+' '+x[1].replace(/（.*）/,'')).join('　'),f.ch.col]);L.push(['被動：'+CHM[i].p,f.ch.col2])});
 L.push(['','#fff'],['按 P 或 Esc 繼續　按 Q 回到選單　F2 判定框'+(G.hb?'（開）':''),'#ffe14d']);
 ctx.font='15px '+FONT;L.forEach((l,i)=>{ctx.fillStyle=l[1];ctx.fillText(l[0],W/2,120+i*30)});ctx.restore();
}
function drawBoxes(){
 ctx.save();ctx.lineWidth=2;
 const box=(b,f,s)=>{ctx.fillStyle=f;ctx.strokeStyle=s;ctx.fillRect(b[0],b[1],b[2]-b[0],b[3]-b[1]);ctx.strokeRect(b[0],b[1],b[2]-b[0],b[3]-b[1])};
 for(const f of[p1,p2]){
  const a=f.atk,inv=f.st==='down'||f.st==='ko'||(f.st==='dash'&&f.inv>0)||(a&&a.inv&&f.t<=a.su+3),ctr=f.st==='atk'&&a&&a.counter&&f.t>a.su&&f.t<=a.su+a.ac;
  if(inv)ctx.setLineDash([5,4]);
  box(hurt(f),inv?'rgba(255,255,255,.12)':ctr?'rgba(255,225,77,.25)':'rgba(77,210,255,.15)',inv?'#fff':ctr?'#ffe14d':'#4dd2ff');ctx.setLineDash([]);
  if(f.st==='atk'&&a&&a.type!=='proj'&&a.type!=='strike'&&!a.counter&&f.t>a.su&&f.t<=a.su+a.ac)box(hbox(f,a),a.throw?'rgba(180,107,255,.35)':'rgba(255,64,64,.35)',a.throw?'#b46bff':'#ff4040');
 }
 for(const p of projs){if(p.wait>0||p.life<=0)continue;const r=p.big?28:14;box(p.strike?[p.x-26,0,p.x+26,GY]:[p.x-r,p.y-r,p.x+r,p.y+r],'rgba(255,64,64,.3)','#ff4040')}
 ctx.restore();
}
// ===== 重播：記錄每一步雙方的輸入（遊戲是確定性的，輸入相同結果就相同），壓縮成連結分享 =====
const encI=i=>i?((i.l?1:0)|(i.r?2:0)|(i.u?4:0)|(i.d?8:0)|(i.lp?16:0)|(i.hp?32:0)|(i.lk?64:0)|(i.hk?128:0)|(i.sp?256:0)|(i.th?512:0)|(i.dash<0?1024:i.dash>0?2048:0)):-1;
const decI=n=>n<0?null:{l:n&1,r:n>>1&1,u:n>>2&1,d:n>>3&1,lp:n>>4&1,hp:n>>5&1,lk:n>>6&1,hk:n>>7&1,sp:n>>8&1,th:n>>9&1,dash:n&1024?-1:n&2048?1:0};
function recPush(a,b){const k=G.si-1;REC.a[k]=encI(a);REC.b[k]=encI(b)}
function rpNext(){const k=G.si-1,a=RP.a[k],b=RP.b[k];return[decI(a===undefined?0:a)||NI,decI(b===undefined?0:b)]}
function rle(arr){const o=[];let v=null,c=0;for(let i=0;i<arr.length;i++){const x=arr[i]===undefined?0:arr[i];if(x===v)c++;else{if(c)o.push(v,c);v=x;c=1}}if(c)o.push(v,c);return o}
function unrle(o){const a=[];for(let i=0;i+1<o.length;i+=2){const v=o[i]|0,c=Math.min(o[i+1]|0,40000);for(let k=0;k<c&&a.length<40000;k++)a.push(v)}return a}
const rpPack=()=>({v:1,m:REC.m,c:REC.c,g:REC.g,h:REC.h||[1,1],ini:REC.ini,s:REC.s,a:rle(REC.a),b:rle(REC.b)});
function rpValid(o){return o&&o.v===1&&[1,2,4].includes(o.m)&&Array.isArray(o.c)&&o.c.length===2&&o.c.every(x=>Number.isInteger(x)&&x>=0&&x<CH.length)&&Number.isInteger(o.g)&&o.g>=0&&o.g<STG.length&&Array.isArray(o.a)&&Array.isArray(o.b)&&o.a.concat(o.b).every(Number.isInteger)&&(o.h===undefined||Array.isArray(o.h)&&o.h.length===2&&o.h.every(x=>typeof x==='number'&&x>=1&&x<=2))}
function rpSaveLast(){if(!REC||RP||G.si<300)return;try{localStorage.setItem('fd_last',JSON.stringify(rpPack()))}catch(e){}}
function startReplay(o){
 if(!rpValid(o))return false;
 const sv=[sel[0],sel[1],G.stage];REC=null;
 RP={a:unrle(o.a),b:unrle(o.b),end:0,m:o.m};RP.n=Math.max(RP.a.length,RP.b.length);
 sel[0]=o.c[0];sel[1]=o.c[1];G.stage=o.g;G.smo=Array.isArray(o.s)?o.s:[0,0];startGame(o.m===4?2:o.m);if(o.h)[p1,p2].forEach((f,k)=>{if(o.h[k]!==1){f.hm=o.h[k];f.reset()}});if(o.ini&&typeof o.ini.ft==='number'&&Array.isArray(o.ini.hp)){G.ft=o.ini.ft;p1.hp=p1.lag=+o.ini.hp[0]||p1.hp;p2.hp=p2.lag=+o.ini.hp[1]||p2.hp}sel[0]=sv[0];sel[1]=sv[1];G.stage=sv[2];
 return true;
}
const pageURL=()=>location.href.split('#')[0];
let TOAST=null;
const toast=t=>{TOAST={t,until:performance.now()+2500}};
async function rpCopy(){
 if(!REC)return;const link=pageURL()+'#rp='+await codeEnc(rpPack());rpSaveLast();
 try{await navigator.clipboard.writeText(link);toast('已複製重播連結（'+link.length+' 字），貼給朋友就能觀看')}catch(e){window.prompt('複製這個重播連結：',link)}
}
function rpHash(){const m=location.hash.match(/^#rp=([A-Za-z0-9_\-]+)$/);if(!m)return;history.replaceState(null,'',pageURL());if(G.mode===4&&NET.on)return;
 codeDec(m[1]).then(o=>{if(!startReplay(o))alert('重播連結格式不正確。')}).catch(()=>alert('重播連結格式不正確，請確認完整複製。'))}
function rpLastBtn(){let has=false;try{has=!!localStorage.getItem('fd_last')}catch(e){}$('b6').style.display=has?'':'none'}
$('b6').onclick=()=>{try{const o=JSON.parse(localStorage.getItem('fd_last'));if(!startReplay(o))toast('重播資料損毀')}catch(e){}};
$('ob-rp').onclick=rpCopy;$('ob-mn').onclick=()=>toMenu();
let OBAR=false;
function uiTick(){
 if(RP&&!RP.end&&G.si>RP.n+2&&G.phase!=='over')RP.end=1;
 const on=G.phase==='over'&&!!REC&&!(G.mode===4&&NET.on);if(on!==OBAR){OBAR=on;$('obar').style.display=on?'flex':'none'}
}
function overlayDraw(){
 arcHud();chainHud();if(RP&&G.phase!=='menu'){inDraw(0,12);inDraw(1,W-12)}const now=performance.now();ctx.save();ctx.textAlign='center';
 if(RP&&G.phase!=='menu'){ctx.font='bold 16px '+FONT;ctx.fillStyle='#ff6b6b';ctx.fillText(RP.end?'■ 重播結束　按 Enter 回選單':'▶ 重播中　P 暫停　暫停時 Q 離開',W/2,H-14)}
 else if(G.phase==='over'&&REC){ctx.font='bold 15px '+FONT;ctx.fillStyle='#ffe14d';ctx.fillText('R：複製這場的重播連結',W/2,H-66)}
 if(TOAST&&now<TOAST.until){ctx.font='bold 18px '+FONT;const w=ctx.measureText(TOAST.t).width+30;ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(W/2-w/2,H/2+60,w,36);ctx.fillStyle='#3ddc6a';ctx.fillText(TOAST.t,W/2,H/2+84)}
 ctx.restore();
}
addEventListener('hashchange',rpHash);
// ===== 街機模式：隨機 4 位對手（後半難度提高），最後挑戰強化版的自己 =====
let ARC=null;
function arcStart(){let L=CH.map((_,i)=>i).filter(i=>i!==sel[0]);for(let i=L.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[L[i],L[j]]=[L[j],L[i]]}L=L.slice(0,4);L.push(sel[0]);
 ARC={L,i:0,me:sel[0],cont:0,d0:G.diff,g0:G.stage,s1:sel[1],res:null,done:0};arcFight()}
function arcFight(){const boss=ARC.i===ARC.L.length-1;sel[0]=ARC.me;sel[1]=ARC.L[ARC.i];G.diff=boss?2:Math.min(2,ARC.d0+(ARC.i>=2?1:0));G.stage=ARC.i%STG.length;
 startGame(1);sel[1]=ARC.s1;G.stage=ARC.g0;if(boss){p2.hm=1.3;p2.reset();if(REC)REC.h=[1,1.3]}ARC.res=null}
function arcNext(){if(!ARC||!ARC.res)return;if(ARC.done){toMenu();return}
 if(ARC.res==='win'){ARC.i++;if(ARC.i>=ARC.L.length){ARC.done=1;G.msg='街機模式 通關！';G.mt=G.mm=1e9;sfx('round');
  try{const r=JSON.parse(localStorage.getItem('fd_arc')||'{}');r[ARC.me]=Math.min(r[ARC.me]===undefined?99:r[ARC.me],ARC.cont);localStorage.setItem('fd_arc',JSON.stringify(r))}catch(e){}return}}
 else ARC.cont++;rpSaveLast();arcFight()}
function arcEnd(){if(!ARC)return;G.diff=ARC.d0;G.stage=ARC.g0;ARC=null}
function arcTip(){const n=ARC.L.length;return ARC.done?'恭喜通關（接關 '+ARC.cont+' 次）！按 Enter 回選單':ARC.res==='win'?(ARC.i+1>=n?'打倒魔王！按 Enter 繼續':'第 '+(ARC.i+1)+'／'+n+' 戰勝利！按 Enter 進入下一戰'):'輸了…按 Enter 接關再戰　Esc 回選單'}
function arcInfo(){try{const r=JSON.parse(localStorage.getItem('fd_arc')||'{}'),k=Object.keys(r);return k.length?'　街機通關：'+k.map(i=>(CH[i]||CH[0]).n+(r[i]?'（接關 '+r[i]+'）':'（無接關）')).join('、'):''}catch(e){return''}}
function arcHud(){if(!ARC||G.phase==='menu')return;const n=ARC.L.length,boss=ARC.i===n-1;ctx.save();ctx.textAlign='center';ctx.font='bold 14px '+FONT;ctx.fillStyle=boss?'#ff6b6b':'#ffe14d';ctx.fillText('街機 第 '+(ARC.i+1)+'／'+n+' 戰'+(boss?'　魔王：強化版'+CH[ARC.L[ARC.i]].n+'（體力 ×1.3）':''),W/2,90);ctx.restore()}
$('b7').onclick=()=>{snd(500,.1);arcStart()};
// ===== 初始化 =====
makeThumbs();makeHeads();makeStageThumbs();lab();rpLastBtn();rpHash();fitCanvas();qLabel();
$('qbtn').onclick=()=>{QM=(QM+1)%QN.length;QA=0;try{localStorage.setItem('fd_q',QM)}catch(e){}fitCanvas();bg=makeBg(STG[G.stage]);qLabel()};
