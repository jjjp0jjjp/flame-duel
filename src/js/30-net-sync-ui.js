function netHello(){
 const R=NET.room;if(!R||NET.started&&NET.slot===1)return;
 R.emit('hello',{s:NET.slot,c:sel[0],g:G.stage}).catch(emitErr);
 if(NET.slot===0&&NET.remote&&!NET.started){
  if(NET.pings.length<5){R.emit('png',{t:performance.now()}).catch(emitErr);return}
  if(!NET.sid){const a=[...NET.pings].sort((x,y)=>x-y),med=a[a.length>>1];NET.Dsel=med<=60?1:med<=120?2:med<=200?3:4;NET.sid=Math.random().toString(36).slice(2,8)}
  R.emit('start',{sid:NET.sid,c0:sel[0],c1:NET.remote.c,g:G.stage,D:NET.Dsel,m:1}).catch(emitErr);
 }
}
function onPog(d){if(NET.slot===0&&!NET.started&&d&&typeof d.t==='number'){const r=performance.now()-d.t;if(r>0&&r<5000&&NET.pings.length<5)NET.pings.push(r)}}
function onHello(d){
 if(!d||typeof d.s!=='number')return;
 if(d.s===NET.slot){setNs('這個房間已經有人佔了同樣的位置，請換一個房間代碼。');return}
 NET.remote={c:Math.max(0,Math.min(CH.length-1,d.c|0))};
 if(NET.slot===0&&!NET.started)setNs('對手已加入，測量連線品質中…');
}
function onStart(d){
 if(NET.slot!==1||!d||typeof d.sid!=='string')return;
 const c0=Math.max(0,Math.min(CH.length-1,d.c0|0)),c1=Math.max(0,Math.min(CH.length-1,d.c1|0)),g=Math.max(0,Math.min(STG.length-1,d.g|0));
 if(!NET.started){NET.sid=d.sid;beginNet(c0,c1,g,d.D,1)}
 if(d.sid===NET.sid&&NET.room)NET.room.emit('ready',{sid:d.sid}).catch(emitErr);
}
function onReady(d){
 if(NET.slot!==0||NET.started||!d||d.sid!==NET.sid||!NET.remote)return;
 beginNet(sel[0],NET.remote.c,G.stage,NET.Dsel,1);
}
// ================= 連線對戰(回滾式同步) =================
const RB_MAX=8;
function rbFnv(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function canon(v){if(Array.isArray(v))return'['+v.map(canon).join(',')+']';if(v&&typeof v==='object')return'{'+Object.keys(v).sort().map(k=>k+':'+canon(v[k])).join(',')+'}';return JSON.stringify(v)}
function snapF(f){const o={};for(const k in f){if(k==='tr'||k==='lt'||k==='ph')continue;o[k]=k==='ch'?CH.indexOf(f[k]):f[k]}return o}
function restF(f,o){const tr=f.tr,lt=f.lt;for(const k of Object.keys(f))delete f[k];Object.assign(f,o);f.ch=CH[o.ch];f.tr=tr||[];f.lt=lt;f.ph=null}
function snapAll(){return JSON.stringify({g:[G.frame,G.hitstop,G.phase,G.round,G.time,G.tf,G.pt,G.msg,G.mt,G.mm,G.vs|0,G.win],a:snapF(p1),b:snapF(p2),pr:projs.map(p=>{const o=Object.assign({},p);o.own=p.own===p1?0:1;return o}),v1:pv1,v2:pv2})}
function loadAll(s){const o=JSON.parse(s),g=o.g;G.frame=g[0];G.hitstop=g[1];G.phase=g[2];G.round=g[3];G.time=g[4];G.tf=g[5];G.pt=g[6];G.msg=g[7];G.mt=g[8];G.mm=g[9];G.vs=g[10];G.win=g[11];
 restF(p1,o.a);restF(p2,o.b);projs=o.pr.map(p=>{p.own=p.own?p2:p1;return p});
 for(const k in pv1)delete pv1[k];Object.assign(pv1,o.v1);for(const k in pv2)delete pv2[k];Object.assign(pv2,o.v2)}
function beginNet(c0,c1,g,D,m){
 clearInterval(NET.hb);
 const sv=[sel[0],sel[1],G.stage];
 NET.DL=Math.max(1,Math.min(4,D|0))||2;NET.m=m||1;NET.c=[c0,c1];NET.g=g;
 NET.started=true;NET.on=true;NET.tick=0;NET.loc={};NET.rem={};NET.used={};NET.snaps={};NET.rbFrom=null;NET.rbCount=0;NET.rbMax=0;
 NET.sendT={};NET.hash={};NET.rh={};NET.hl=null;NET.nextHash=29;NET.desync=false;NET.stallT=0;NET.rtt=NET.rtt||0;NET.gone=false;
 NET.remHigh=NET.DL-1;NET.remAck=NET.DL-1;NET.remAd=0;NET.skip=0;NET.inp=[0,0];NET.reL=0;NET.reR=0;NET.gotM=0;NET.lastRe=0;NET.rst=null;
 for(let i=0;i<NET.DL;i++){NET.loc[i]=0;NET.rem[i]=0}
 sel[0]=c0;sel[1]=c1;G.stage=g;
 $('net').style.display='none';
 startGame(4);
 sel[0]=sv[0];sel[1]=sv[1];
}
function netSend(){
 const now=performance.now();
 if(!NET.on||!NET.room||now-NET.lastSend<(NET.sendIv||30))return;NET.lastSend=now;
 const f=NET.remAck+1,t=Math.min(NET.tick-1+NET.DL,f+59),b=[];
 for(let k=f;k<=t;k++){b.push(NET.loc[k]|0);if(NET.sendT[k]===undefined)NET.sendT[k]=now}
 NET.room.emit('inp',{f,b,a:NET.remHigh,ad:NET.tick-1-NET.remHigh,h:NET.hl,m:NET.m}).catch(()=>{});
 if(G.phase==='over'&&NET.reL&&now-NET.lastRe>400){NET.lastRe=now;NET.room.emit('rem',{m:NET.m}).catch(()=>{})}
 if(NET.slot===0&&NET.rst&&!NET.gotM&&now-NET.lastRe>300){NET.lastRe=now;NET.room.emit('rst',NET.rst).catch(()=>{})}
}
function onInp(d){
 if(!NET.on||!d||!Array.isArray(d.b)||typeof d.f!=='number'||(d.m!==undefined&&d.m!==NET.m))return;
 NET.gotM=1;
 for(let k=0;k<d.b.length&&k<64;k++){const t=d.f+k;if(t>NET.remHigh&&NET.rem[t]===undefined){const v=d.b[k]&1023;NET.rem[t]=v;if(t<NET.tick&&NET.used[t]!==v&&(NET.rbFrom===null||t<NET.rbFrom))NET.rbFrom=t}}
 while(NET.rem[NET.remHigh+1]!==undefined)NET.remHigh++;
 if(typeof d.ad==='number')NET.remAd=d.ad;
 if(typeof d.a==='number'&&d.a>NET.remAck){
  const now=performance.now();
  for(let t=NET.remAck+1;t<=d.a;t++)if(NET.sendT[t]!==undefined){const r=now-NET.sendT[t];NET.rtt=NET.rtt?NET.rtt*.9+r*.1:r;delete NET.sendT[t]}
  NET.remAck=d.a;
 }
 if(Array.isArray(d.h)&&d.h.length===2){NET.rh[d.h[0]]=d.h[1];if(NET.hash[d.h[0]]!==undefined&&NET.hash[d.h[0]]!==d.h[1])NET.desync=true}
}
function simF(n,re){const r=NET.rem[n]!==undefined?NET.rem[n]:(NET.rem[NET.remHigh]|0),l=NET.loc[n]|0;NET.used[n]=r;NET.inp=NET.slot===0?[l,r]:[r,l];if(re)NOFX++;try{step()}finally{if(re)NOFX--}}
function netTick(){
 if(NET.rbFrom!==null&&NET.rbFrom<NET.tick&&NET.snaps[NET.rbFrom]){
  const f=NET.rbFrom;loadAll(NET.snaps[f]);
  for(let k=f;k<NET.tick;k++){if(k>f)NET.snaps[k]=snapAll();simF(k,1)}
  NET.rbCount++;NET.rbMax=Math.max(NET.rbMax,NET.tick-f);
 }
 NET.rbFrom=null;
 const n=NET.tick;
 if(n-NET.remHigh>RB_MAX+NET.DL){if(!NET.stallT)NET.stallT=performance.now();return 0}
 NET.stallT=0;
 if(NET.skip>0){NET.skip--;return 2}
 if(n%20===0){const adv=((n-1-NET.remHigh)-NET.remAd)/2;if(adv>=1)NET.skip=Math.min(3,Math.floor(adv))}
 NET.loc[n+NET.DL]=cap(K1);
 NET.snaps[n]=snapAll();
 simF(n,0);
 NET.tick=n+1;
 const C=Math.min(NET.remHigh,NET.tick-1);
 while(NET.nextHash<=C){const c=NET.nextHash,s=c+1<NET.tick?NET.snaps[c+1]:snapAll();if(s){const hv=rbFnv(canon(JSON.parse(s)));NET.hash[c]=hv;NET.hl=[c,hv];if(NET.rh[c]!==undefined&&NET.rh[c]!==hv)NET.desync=true}NET.nextHash+=30}
 if(n%30===0){const lo=n-60;for(const k in NET.snaps)if(+k<lo)delete NET.snaps[k];for(const k in NET.used)if(+k<lo)delete NET.used[k];
  for(const k in NET.rem)if(+k<Math.min(lo,NET.remHigh-2))delete NET.rem[k];const lo2=Math.min(lo,NET.remAck-2);for(const k in NET.loc)if(+k<lo2)delete NET.loc[k]}
 return 1;
}
function netRematch(){if(!NET.on||G.phase!=='over'||NET.reL)return;NET.reL=1;NET.lastRe=0;netCheckRe()}
function onRem(d){if(!NET.on||!d||d.m!==NET.m||G.phase!=='over')return;NET.reR=1;netCheckRe()}
function netCheckRe(){if(NET.slot!==0||!NET.reL||!NET.reR)return;const m=NET.m+1,msg={m,c0:NET.c[0],c1:NET.c[1],g:NET.g,D:NET.DL};beginNet(msg.c0,msg.c1,msg.g,msg.D,m);NET.rst=msg;NET.gotM=0;NET.lastRe=0}
function onRst(d){if(NET.slot!==1||!d||typeof d.m!=='number'||d.m<=(NET.m||0))return;beginNet(Math.max(0,Math.min(CH.length-1,d.c0|0)),Math.max(0,Math.min(CH.length-1,d.c1|0)),Math.max(0,Math.min(STG.length-1,d.g|0)),d.D,d.m)}
function netLeave(say){
 NET.on=false;clearInterval(NET.hb);
 NET.unsub.forEach(u=>{try{u()}catch(e){}});NET.unsub=[];
 const R=NET.room;NET.room=null;NET.started=false;
 if(R){if(say)R.emit('bye',{}).catch(()=>{});setTimeout(()=>{R.leave().catch(()=>{})},300)}
}
function netQuit(say){netLeave(say);G.pause=false;toMenu()}
function onBye(){
 NET.gone=true;
 if(!NET.on){setNs('對手已離開房間。');return}
 setTimeout(()=>{if(NET.gone&&NET.room)netQuit(0)},2500);
}

let last=performance.now(),acc=0;
let padOK=true;
function pads(){if(!padOK)return;let gp=[];try{gp=navigator.getGamepads?navigator.getGamepads():[]}catch(e){padOK=false;return}let n=0;for(const p of gp){if(!p||n>1)continue;const q='P'+n++,ax=p.axes,b=i=>!!(p.buttons[i]&&p.buttons[i].pressed);keys[q+'l']=ax[0]<-.5||b(14);keys[q+'r']=ax[0]>.5||b(15);keys[q+'u']=ax[1]<-.6||b(12);keys[q+'d']=ax[1]>.6||b(13);keys[q+'a']=b(2);keys[q+'b']=b(3);keys[q+'x']=b(0);keys[q+'y']=b(1);keys[q+'s']=b(5)||b(7);keys[q+'t']=b(4)||b(6)}}
function loop(ts){requestAnimationFrame(loop);pads();acc+=Math.min(100,ts-last);last=ts;
 if(NET.on){while(acc>=16.667){if(!netTick()){acc=Math.min(acc,33);break}acc-=16.667}netSend()}
 else while(acc>=16.667){step();acc-=16.667}
 draw()}
requestAnimationFrame(loop);

addEventListener('keydown',e=>{if(KCAP){e.preventDefault();kcapDone(e.code);return}
 if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'))return;
 if(e.code==='F2'){e.preventDefault();G.hb=!G.hb;tbar();return}
 if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();
 keys[e.code]=1;pend[e.code]=1;
 if(G.mode===4&&NET.on&&e.code==='Escape')netQuit(1);else if(((e.code==='KeyP'&&!bound(e.code))||e.code==='Escape')&&G.mode!==4&&G.phase!=='menu'&&G.phase!=='over')G.pause=!G.pause;
 if(G.vs>0&&G.mode!==4&&(e.code==='Enter'||e.code==='Space'))G.vs=1;
 if(e.code==='Enter'&&G.phase==='over'){if(G.mode===4&&NET.on)netRematch();else toMenu()}
 if(e.code==='KeyQ'&&G.pause&&!bound(e.code)){G.pause=false;toMenu()}
 if(e.code==='KeyM'&&!bound(e.code))mute=!mute;
});
addEventListener('keyup',e=>{keys[e.code]=0});
addEventListener('blur',()=>{for(const k in keys)keys[k]=0;if(G.phase==='fight'&&G.mode!==4)G.pause=true});
cv.addEventListener('pointerdown',()=>{if(G.phase==='over'){if(G.mode===4&&NET.on)netRematch();else toMenu()}});
document.querySelectorAll('#pad button').forEach(b=>{
 const ks=b.dataset.k.split(','),on=e=>{e.preventDefault();ks.forEach(k=>{keys[k]=1;pend[k]=1})},off=()=>{ks.forEach(k=>keys[k]=0)};
 b.addEventListener('pointerdown',on);['pointerup','pointercancel','pointerleave'].forEach(n=>b.addEventListener(n,off));
 b.addEventListener('contextmenu',e=>e.preventDefault());
});
const $=id=>document.getElementById(id),DF=['簡單','普通','困難'];
function rec(win){try{const r=JSON.parse(localStorage.getItem('fd_rec')||'{}');win?r.w=(r.w||0)+1:r.l=(r.l||0)+1;localStorage.setItem('fd_rec',JSON.stringify(r))}catch(e){}}
function lab(){try{const r=JSON.parse(localStorage.getItem('fd_rec')||'{}');$('rec').textContent='單人戰績：'+(r.w||0)+' 勝 '+(r.l||0)+' 敗'}catch(e){}if(THUMB.length)selUI();$('df').textContent=DF[G.diff];$('stg').textContent=STG[G.stage].n}
$('df').onclick=()=>{G.diff=(G.diff+1)%3;lab()};$('stg').onclick=()=>{G.stage=(G.stage+1)%STG.length;lab()};
$('b1').onclick=()=>{snd(500,.1);startGame(1)};$('b2').onclick=()=>{snd(500,.1);startGame(2)};$('b3').onclick=()=>{snd(500,.1);startGame(3)};
$('b4').onclick=()=>{snd(500,.1);$('net').style.display='block';$('net').scrollIntoView&&$('net').scrollIntoView({block:'nearest'})};
