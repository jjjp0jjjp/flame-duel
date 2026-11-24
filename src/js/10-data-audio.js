window.addEventListener('error',e=>{try{let d=document.getElementById('errbox');if(!d){d=document.createElement('div');d.id='errbox';d.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99;background:#7a1020;color:#fff;font:12px/1.5 monospace;padding:8px 12px;white-space:pre-wrap;max-height:40vh;overflow:auto';document.body.appendChild(d)}d.textContent='⚠ 遊戲發生錯誤（請把這段文字回報）：\n'+(e.message||'')+'\n'+String(e.filename||'').split('/').pop()+':'+(e.lineno||'')+':'+(e.colno||'')}catch(x){}});
const cv=document.getElementById('c'),ctx=cv.getContext('2d'),W=960,H=540,GY=450;
const FONT="'Noto Sans TC','Microsoft JhengHei',sans-serif";
const MV={
 lp:{d:6,su:3,ac:3,rc:7,r:70,h:-82,st:16,kb:3,cn:1},
 hp:{d:11,su:7,ac:3,rc:13,r:80,h:-82,st:18,kb:6,cn:2},
 lk:{d:7,su:5,ac:3,rc:9,r:86,h:-40,st:17,kb:4,cn:1},
 hk:{d:13,su:9,ac:4,rc:17,r:108,h:-55,st:20,kb:8,cn:2},
 lunge:{d:10,su:8,ac:6,rc:14,r:92,h:-86,st:20,kb:8,vx:6,cn:2},
 spin:{d:14,su:10,ac:6,rc:18,r:102,h:-62,st:22,kb:9,vx:5,cn:2},
 upper:{d:13,su:4,ac:7,rc:22,r:60,h:-112,st:30,kb:3,launch:1,inv:1,lift:-12,cn:3},
 sweep:{d:9,su:8,ac:4,rc:20,r:104,h:-12,st:26,kb:5,knock:1,cn:2},
 th:{d:16,su:5,ac:2,rc:22,r:56,h:-70,st:34,kb:8,throw:1,cn:0},
 ap:{d:7,su:3,ac:9,rc:3,r:62,h:-62,st:14,kb:3,air:1,cn:0},
 jab:{d:7,su:5,ac:3,rc:10,r:104,h:-84,st:16,kb:4,cn:1},
 push:{d:8,su:7,ac:3,rc:13,r:106,h:-50,st:17,kb:12,cn:1},
 flip:{d:12,su:8,ac:5,rc:16,r:98,h:-72,st:22,kb:8,vx:-4,cn:2},
 th2:{d:15,su:5,ac:2,rc:22,r:56,h:-70,st:34,kb:8,throw:1,rev:1,cn:0},
 dive:{d:12,su:4,ac:30,rc:3,r:62,h:-26,st:22,kb:6,knock:1,air:1,dive:1,cn:0},
 ak:{d:10,su:5,ac:10,rc:3,r:78,h:-30,st:18,kb:5,air:1,cn:0}
};
const CH=[
{n:'烈',ds:'迅捷・波動彈',col:'#ff5a4d',col2:'#ffc4b3',spd:4.4,jmp:15,hp:100,w:1,
 sp:{type:'proj',d:15,su:11,ac:1,rc:19,spd:9,cost:50},
 ex:{type:'proj',d:30,su:14,ac:1,rc:26,spd:12,big:1,launch:1,ex:1,cost:100,name:'炎龍波'},
 sp2:{type:'proj',d:9,su:10,ac:1,rc:20,spd:7,n2:1,cost:50},
 mv:{lk:{su:4},hk:{su:8,d:14}},
 sp3:{d:18,su:5,ac:8,rc:26,r:70,h:-112,st:32,kb:3,launch:1,inv:1,lift:-14,cost:50},
 asp:{type:'proj',d:12,su:6,ac:1,rc:14,spd:8,vy:5,cost:50}},
{n:'鋼',ds:'剛猛・衝擊拳',col:'#4d9bff',col2:'#c4dcff',spd:3.5,jmp:14,hp:108,w:1.25,
 sp:{d:16,su:9,ac:8,rc:22,vx:7,r:84,h:-72,st:26,kb:13,launch:1,cost:50},
 ex:{d:36,su:14,ac:20,rc:30,vx:13,r:98,h:-72,st:32,kb:16,launch:1,ex:1,cost:100,name:'崩山拳'},
 sp2:{type:'proj',d:14,su:14,ac:1,rc:24,spd:6,low:1,knock:1,cost:50},
 armor:1,ar:.8,mv:{hp:{d:12},hk:{d:14}},
 sp3:{d:26,su:8,ac:2,rc:30,r:64,h:-70,st:40,kb:10,throw:1,cost:50},
 asp:{d:20,su:6,ac:40,rc:6,r:70,h:-24,st:30,kb:8,knock:1,air:1,dive:1,cost:50}},
{n:'影',ds:'疾風・二段跳',col:'#b46bff',col2:'#e3ccff',spd:5,jmp:16,hp:96,w:.95,dj:1,
 sp:{d:12,su:6,ac:10,rc:18,vx:16,r:76,h:-76,st:20,kb:7,cost:50},
 ex:{d:32,su:10,ac:18,rc:26,vx:18,r:100,h:-76,st:30,kb:15,launch:1,ex:1,cost:100,name:'影分身斬'},
 sp2:{d:14,su:10,ac:4,rc:18,r:80,h:-76,st:20,kb:6,tele:1,cost:50},
 mv:{lp:{su:2,rc:5},lk:{su:4,rc:7},jab:{su:4}},
 sp3:{type:'proj',d:10,su:9,ac:1,rc:16,spd:11,back:1,inv:1,cost:50},
 asp:{type:'proj',d:7,su:4,ac:1,rc:10,spd:10,vy:4,n2:1,cost:50}}
];
const STG=[
 {n:'夜城',s:['#0b0b24','#3a1850','#d9507a'],b:['#2a1647','#1a1033'],w:'#ffd86b',g:['#2b2140','#0d0a18'],l:'#ff7aa8',m:'#ffe9b0'},
 {n:'黃昏港',s:['#1b1034','#7b2d5f','#ff9a5a'],b:['#3a1f4a','#24123a'],w:'#ffe6a0',g:['#3a2540','#120a1c'],l:'#ffb36b',m:'#fff1b8'},
 {n:'極光雪原',s:['#04122b','#0b3b5e','#3fa7a0'],b:['#12344f','#0a2036'],w:'#bff6ff',g:['#25405c','#0a1624'],l:'#7fe3ff',m:'#e8f6ff'},
 {n:'火山口',k:'volcano',s:['#14040a','#4a1010','#ff5a1a'],b:['#2a0c0c','#160606'],w:'#ff8a3a',g:['#3a1410','#120404'],l:'#ff6a2a',m:'#ffb070'},
 {n:'竹林道場',k:'bamboo',s:['#0c1a14','#1f4a32','#a8d48a'],b:['#1d4a2a','#123020'],w:'#e8ffb0',g:['#5a4028','#2a1c10'],l:'#c9a36b',m:'#f4ffd8'}
];
function makeBg(S){
 const c=document.createElement('canvas'),rs=RS||1;c.width=Math.round(W*rs);c.height=Math.round(H*rs);const b=c.getContext('2d');b.scale(rs,rs);
 let g=b.createLinearGradient(0,0,0,GY);g.addColorStop(0,S.s[0]);g.addColorStop(.6,S.s[1]);g.addColorStop(1,S.s[2]);b.fillStyle=g;b.fillRect(0,0,W,H);
 let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
 for(let i=0;i<70;i++){b.fillStyle=`rgba(255,255,255,${r()*.7})`;b.fillRect(r()*W,r()*220,2,2)}
 b.fillStyle=S.m;b.beginPath();b.arc(740,125,48,0,6.3);b.fill();
 if(S.k)bgKind(b,S,r);else for(let L=0;L<2;L++){let x=0;while(x<W){const w=50+r()*70,h=80+r()*(L?160:110);b.fillStyle=S.b[L];b.fillRect(x,GY-h-(L?0:30),w,h+40);
  if(L){b.fillStyle=S.w;for(let wy=GY-h+10;wy<GY-10;wy+=22)for(let wx=x+8;wx<x+w-10;wx+=18)if(r()<.35)b.fillRect(wx,wy,6,9)}x+=w+r()*10}}
 g=b.createLinearGradient(0,GY,0,H);g.addColorStop(0,S.g[0]);g.addColorStop(1,S.g[1]);b.fillStyle=g;b.fillRect(0,GY,W,H-GY);
 b.strokeStyle=S.l;b.lineWidth=3;b.beginPath();b.moveTo(0,GY);b.lineTo(W,GY);b.stroke();
 b.globalAlpha=.15;b.lineWidth=1;for(let i=-10;i<=20;i++){b.beginPath();b.moveTo(W/2+(i-5)*20,GY);b.lineTo(W/2+(i-5)*140,H);b.stroke()}
 if(RS&&qHigh())bgLight(b,S);
 return c;
}
const keys={};let mute=false,AC;
const VOL={all:.8,mus:.7,sfx:.9};try{Object.assign(VOL,JSON.parse(localStorage.getItem('fd_vol')||'{}'))}catch(e){}
let BUS=null,NB=null,MUS=0;
function ac(){AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();if(!BUS){const mk=()=>AC.createGain();BUS={all:mk(),mus:mk(),sfx:mk()};BUS.mus.connect(BUS.all);BUS.sfx.connect(BUS.all);BUS.all.connect(AC.destination);setVol()}return AC}
function setVol(){if(BUS){BUS.all.gain.value=VOL.all;BUS.mus.gain.value=VOL.mus;BUS.sfx.gain.value=VOL.sfx}}
const outBus=()=>MUS?BUS.mus:BUS.sfx;
// 白噪音只產生一次（2 秒），每次從隨機位置截一段播放，避免連段時大量配置記憶體
function noise(d,v=.06,fc=2000,ty='lowpass',sl){if(mute||NOFX)return;try{ac();const n=AC.currentTime;if(!NB){NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;f.type=ty;f.frequency.setValueAtTime(fc,n);if(sl)f.frequency.exponentialRampToValueAtTime(sl,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);s.connect(f);f.connect(g);g.connect(outBus());s.start(n,Math.random()*Math.max(0,2-d),d)}catch(e){}}
function sfx(n,c=0){
 if(n==='thunder'){noise(.5,.22,4000,'highpass',300);snd(60,.6,'sawtooth',.12,30);return}if(n==='charge'){snd(300,.25,'sine',.04,1200);return}if(n==='vs'){snd(110,.5,'sawtooth',.1,55);noise(.4,.12,800,'bandpass',3000);return}if(n==='counter'){snd(900,.12,'square',.06,300);noise(.2,.15,1500,'lowpass',200);return}
 if(n==='hit'){noise(.12,.12,1800,'lowpass',300);snd(150+Math.min(c,8)*25,.1,'square',.07,60)}
 else if(n==='hitbig'){noise(.25,.2,3000,'lowpass',200);snd(90,.25,'sawtooth',.12,35);snd(180+Math.min(c,8)*20,.08,'square',.06,80)}
 else if(n==='block'){noise(.06,.1,3500,'highpass');snd(420,.07,'square',.04,300)}
 else if(n==='swoosh'){noise(.14,.07,500,'bandpass',3000)}
 else if(n==='heavy'){noise(.22,.09,300,'bandpass',2200)}
 else if(n==='cancel'){snd(880,.08,'triangle',.05,1500)}
 else if(n==='throw'){noise(.15,.12,1200,'lowpass',200);snd(110,.3,'sawtooth',.1,40)}
 else if(n==='land'){noise(.06,.05,400,'lowpass')}
 else if(n==='ko'){snd(300,.8,'sawtooth',.12,40);noise(.6,.2,2500,'lowpass',100)}
 else if(n==='round'){[330,392].forEach((f,i)=>setTimeout(()=>snd(f,.15,'triangle',.07),i*140))}
 else if(n==='fight'){snd(220,.35,'sawtooth',.1,440);noise(.3,.1,1500,'bandpass',4000)}
 else if(n==='tick'){snd(880,.05,'square',.04)}
 else if(n==='proj'){snd(500,.25,'sawtooth',.05,150);noise(.25,.05,3000,'bandpass',600)}
}
const BASS=[55,55,82,55,65,65,98,65],ARP=[330,392,494,392];let mstep=0;
function music(){
 if(mute||G.pause||!(G.phase==='intro'||G.phase==='fight'))return;
 MUS=1;try{musStep()}finally{MUS=0}
}
function musStep(){
 const s=mstep++%8,fast=G.phase==='fight'&&G.time<=10;
 snd(BASS[s],.2,'triangle',.05);
 if(s%4===0)snd(120,.12,'sine',.08,40);
 if(s%2===1)snd(ARP[(s>>1)%4]*(fast?2:1),.1,'square',.012);
 noise(.04,.02,6000,'highpass');
}
setInterval(music,200);
function snd(f,d,t='square',v=.05,sl){if(mute||NOFX)return;try{ac();const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(sl)o.frequency.exponentialRampToValueAtTime(sl,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(outBus());o.start();o.stop(n+d)}catch(e){}}
const G={phase:'menu',mode:1,diff:1,stage:0,frame:0,hitstop:0,shake:0,pause:false,round:1,time:60,tf:0,pt:0,msg:'',mt:0,mm:1,cam:{z:1,cx:W/2},supEnd:0,supName:'',supCol:'#fff'};
let p1,p2,projs=[],parts=[],sel=[0,1],bg=makeBg(STG[0]);
const NI={l:0,r:0,u:0,d:0,dash:0,lp:0,hp:0,lk:0,hk:0,sp:0,th:0},rnd=(a,b)=>a+Math.random()*(b-a)|0;
// 火花：一般命中是會拉出光痕的火星（sk），落地／衝刺的塵土仍是小方塊
function spark(x,y,c,n,g){if(NOFX)return;for(let i=0;i<n;i++){const a=Math.random()*6.28,s=2+Math.random()*(g?3:7),o={x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(g?1:2),l:rnd(14,30),m:30,c,s:g?4:3};if(!g){o.t='sk';o.vx*=1.5;o.vy*=1.5;o.l=o.m=rnd(10,20);o.dr=.88}if(parts.length>700)parts.shift();parts.push(o)}}
const ring=(x,y,c)=>NOFX||parts.push({x,y,ring:1,l:16,m:16,c});
const hurt=f=>[f.x-24,f.y-(f.st==='block'||(f.atk&&f.atk.key==='sweep')?85:115),f.x+24,f.y];
const hbox=(f,a)=>{if(a.around)return[f.x-a.r,f.y+a.h-50,f.x+a.r,f.y+a.h+50];const x1=f.x+f.dir*18,x2=f.x+f.dir*a.r;return[Math.min(x1,x2),f.y+a.h-24,Math.max(x1,x2),f.y+a.h+24]};
const ov=(a,b)=>a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1];

