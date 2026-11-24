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
 return[a,b];
}
// ===== 選角卡片 =====
const STAT=[['體力','hp',90,128],['速度','spd',3,5.1],['跳躍','jmp',12.5,16.2]];
const THUMB=[];
function makeThumbs(){CH.forEach((ch,i)=>{const c=document.createElement('canvas');c.width=120;c.height=144;
 ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,240,288);portrait(ch,'idle',120,272,1.25,1);ctx.restore();
 c.getContext('2d').drawImage(cv,0,0,240,288,0,0,120,144);THUMB[i]=c});ctx.clearRect(0,0,W,H)}
function selUI(){
 [0,1].forEach(p=>{const g=$('g'+(p+1));if(!g.children.length)CH.forEach((ch,i)=>{const b=document.createElement('button');b.className='card';const c=document.createElement('canvas');c.width=120;c.height=144;c.getContext('2d').drawImage(THUMB[i],0,0);b.appendChild(c);b.appendChild(document.createTextNode(ch.n));b.onclick=()=>{sel[p]=i;snd(600+i*60,.06,'triangle',.05);lab()};g.appendChild(b)});
  [...g.children].forEach((b,i)=>{const on=sel[p]===i;b.classList.toggle('on',on);b.style.borderColor=on?CH[i].col:'';b.style.background=on?CH[i].col+'33':''})});
 $('sinfo').innerHTML=[0,1].map(p=>{const ch=CH[sel[p]],i=sel[p];return'<div><b style="color:'+ch.col+'">'+(p?'P2／電腦':'P1')+'：'+ch.n+'・'+ch.ds+'</b>'+STAT.map(s=>'<div class="st"><span>'+s[0]+'</span><i><u style="width:'+Math.round(100*(ch[s[1]]-s[2])/(s[3]-s[2]))+'%;background:'+ch.col+'"></u></i><span>'+ch[s[1]]+'</span></div>').join('')+'<div class="ps">被動：'+CHM[i].p+'</div></div>'}).join('');
}
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
const SPI={sp:0,sp2:1,sp3:2,asp:3,ex:4};
const mvName=(f,k)=>MVN[k]||(SPI[k]!==undefined?CHM[CH.indexOf(f.ch)].m[SPI[k]][1].replace(/（.*）/,''):k);
const actable=f=>f.y>=GY&&(f.st==='idle'||f.st==='walk'||(f.st==='block'&&f.stun===0));
function trainTick(){
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
 [['lp','hp'],['lk','hk','sp'],['lp','lk','spin'],['lk','hp','sp','ex']],
 [['lp','hp'],['lp','lk','hk','sp'],['jab','spin','sp'],['lp','hp','sp','ex']],
 [['lp','hp'],['lk','hk','sp'],['jab','lunge','sp'],['lp','upper','ak']],
 [['lp','hp'],['lp','lk','hk'],['lk','push'],['lp','hk','sp2']]];
const trialList=()=>TRIALS[CH.indexOf(p1.ch)]||TRIALS[0];
function trHit(a,combo){
 const k=a.mk||a.key;
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
 if(L.length){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(12,H-18-L.length*22,620,L.length*22+8);L.forEach((l,i)=>{ctx.fillStyle=l[1];ctx.fillText(l[0],22,H-L.length*22+i*22)})}
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
try{if(!localStorage.getItem('fd_tut'))$('b5').textContent='新手教學（推薦先玩）'}catch(e){}
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
 {p:'投技範圍與傷害提升、不易被擊退',m:[['必殺','突進抓（指令投）'],['→+必殺','岩石投擲'],['←+必殺','岩壁反擊（擋下攻擊後自動反擊）'],['空中 必殺','隕石墜（落地震波）'],['↓+必殺','大地崩壞']]}];
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
<b>地面：</b>↓+輕拳 升龍拳（對空無敵）　↓+輕腳／重腳 掃堂腿（下段擊倒）　→+輕拳 前手刺拳　→+重拳 突進肘擊　→+輕腳 推踢（大擊退）　→+重腳 迴旋踢　←+重腳 後空翻踢　←+投技 背摔　↓+必殺 超必殺（100 氣）<br>
<b>空中：</b>輕拳／重拳 空拳　輕腳／重腳 飛踢　↓+輕腳／重腳 俯衝踢<br>
<b>連段：</b>輕攻擊命中或被防後可取消成其他招式；重攻擊可取消成必殺／升龍；升龍命中後可接空中拳腳；必殺後可接超必殺。同一連段每招只能用一次。命中後雙擊方向可衝刺取消，重攻擊命中後按跳可跳躍取消。<br>
<b>防守：</b>對手投你時搶先按投技可拆投（指令投無法拆）；對手出招起手時打中他會觸發<b>反擊（傷害 +30%）</b>；倒地時先按招式可起身反擊。`,
  '角色':CH.map((c,i)=>`<b style="color:${c.col}">${c.n}・${c.ds}</b>（體力 ${c.hp}）：`+CHM[i].m.map(x=>x[0]+' '+x[1]).join('　')+`<br>　被動：${CHM[i].p}`).join('<br>'),
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
  ['↓+輕拳 升龍　↓+腳 掃堂　→+輕拳 刺拳　→+重拳 肘擊　→+輕腳 推踢　→+重腳 迴旋踢','#fff'],
  ['←+重腳 後空翻踢　←+投技 背摔　空中 ↓+腳 俯衝踢　↓+必殺 超必殺（100 氣）','#fff'],
  ['連段：輕→重→必殺→超必殺；同一連段每招只能用一次；命中後可衝刺或跳躍取消','#cfd2ff'],['','#fff']];
 const who=[p1].concat(G.mode===2&&p2.ch!==p1.ch?[p2]:[]);
 who.forEach(f=>{const i=CH.indexOf(f.ch);L.push([f.ch.n+'：'+CHM[i].m.map(x=>x[0]+' '+x[1]).join('　'),f.ch.col]);L.push(['被動：'+CHM[i].p,f.ch.col2])});
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
makeThumbs();lab();
