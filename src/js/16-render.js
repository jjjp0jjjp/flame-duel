const LOOK=[
 {skin:'#f0c09a',top:'#e8473b',dk:'#9c2219',top2:'#ffffff',ua:'#f0c09a',fa:'#b02a22',hand:'#b02a22',th:'#2b2d42',sn:'#2b2d42',shoe:'#f4f4f4',belt:'#ffd23d',hair:'#ff6a3d',hb:'#ffffff'},
 {skin:'#d9a37a',top:'#3c6fd1',dk:'#223f80',top2:'#9db8e8',ua:'#9db8e8',fa:'#7e8aa3',hand:'#7e8aa3',th:'#1d2a44',sn:'#2a3350',shoe:'#2a3350',belt:'#8892a6',hair:'#2b2b35',hb:'#8892a6'},
 {skin:'#e8c9a8',top:'#5a3aa8',dk:'#341f6b',top2:'#b46bff',ua:'#5a3aa8',fa:'#2b1b4f',hand:'#2b1b4f',th:'#5a3aa8',sn:'#2b1b4f',shoe:'#1b1233',belt:'#b46bff',hair:'#1b1233',hb:'#b46bff'},
 {skin:'#f2c79e',top:'#2a2f4a',dk:'#151829',top2:'#ffd23d',ua:'#2a2f4a',fa:'#ffd23d',hand:'#ffe680',th:'#1c2033',sn:'#1c2033',shoe:'#ffd23d',belt:'#ffd23d',hair:'#f4f6ff',hb:'#8fe8ff'},
 {skin:'#b97a52',top:'#7a4f2a',dk:'#4a2e16',top2:'#e0b070',ua:'#b97a52',fa:'#b97a52',hand:'#efdcb8',th:'#5a4632',sn:'#5a4632',shoe:'#2a1e14',belt:'#e0b070',hair:'#1e1a16',hb:'#c0392b'},
 {skin:'#f3d6c4',top:'#d6f2ff',dk:'#6fa8cc',top2:'#ffffff',ua:'#d6f2ff',fa:'#9fd8f0',hand:'#e8f8ff',th:'#3a5a7a',sn:'#3a5a7a',shoe:'#e8f8ff',belt:'#7fe3ff',hair:'#eaf6ff',hb:'#7fe3ff'},
 {skin:'#e6b58c',top:'#2d6a4f',dk:'#1b4332',top2:'#95d5b2',ua:'#e6b58c',fa:'#2d6a4f',hand:'#d8f3dc',th:'#1b2a22',sn:'#d8f3dc',shoe:'#3a2a1a',belt:'#95d5b2',hair:'#1b4332',hb:'#52b788'},
 {skin:'#e0b48a',top:'#d98c2b',dk:'#8a4f12',top2:'#f6e0a8',ua:'#d98c2b',fa:'#e0b48a',hand:'#f6e0a8',th:'#5a3a1a',sn:'#f6e0a8',shoe:'#3a2412',belt:'#7a1f1f',hair:'#2a1a10',hb:'#f0c674'},
 {skin:'#c98d64',top:'#2b2d42',dk:'#14151f',top2:'#f72585',ua:'#c98d64',fa:'#c98d64',hand:'#f72585',th:'#f72585',sn:'#c98d64',shoe:'#f4f4f4',belt:'#ffffff',hair:'#1a1210',hb:'#f72585'},
 {skin:'#e8c9a8',top:'#2f3b1f',dk:'#161d0e',top2:'#a3e635',ua:'#2f3b1f',fa:'#1c2412',hand:'#1c2412',th:'#2f3b1f',sn:'#1c2412',shoe:'#0f140a',belt:'#a3e635',hair:'#161d0e',hb:'#a3e635'},
 {skin:'#f6d7c3',top:'#ff9ff3',dk:'#c44da8',top2:'#ffe3fb',ua:'#ff9ff3',fa:'#f6d7c3',hand:'#f6d7c3',th:'#5a2a5a',sn:'#5a2a5a',shoe:'#ff9ff3',belt:'#ffd166',hair:'#2a1630',hb:'#ffd166'},
 {skin:'#b8c0cc',top:'#ff9f1c',dk:'#b85c00',top2:'#2b2f3a',ua:'#5a6270',fa:'#ff9f1c',hand:'#3a404c',th:'#3a404c',sn:'#ff9f1c',shoe:'#2b2f3a',belt:'#2b2f3a',hair:'#2b2f3a',hb:'#7fe3ff'},
 {skin:'#f0c8a8',top:'#e9ecef',dk:'#9aa3b0',top2:'#c1121f',ua:'#e9ecef',fa:'#e9ecef',hand:'#f0c8a8',th:'#2b2d42',sn:'#2b2d42',shoe:'#3a2a1a',belt:'#c1121f',hair:'#14141c',hb:'#c1121f'},
 {skin:'#a87a5a',top:'#264653',dk:'#12232a',top2:'#2a9d8f',ua:'#a87a5a',fa:'#264653',hand:'#a87a5a',th:'#264653',sn:'#12232a',shoe:'#12232a',belt:'#e9c46a',hair:'#e9edc9',hb:'#2a9d8f'},
 {skin:'#c08a60',top:'#5c3a21',dk:'#2e1d10',top2:'#c1121f',ua:'#c08a60',fa:'#c08a60',hand:'#3a2412',th:'#3a2a1a',sn:'#c08a60',shoe:'#2e1d10',belt:'#c1121f',hair:'#5c2a12',hb:'#c1121f'},
 {skin:'#f0caa8',top:'#3a5a40',dk:'#1f3324',top2:'#4361ee',ua:'#3a5a40',fa:'#f0caa8',hand:'#c7a27a',th:'#5a4632',sn:'#5a4632',shoe:'#3a2a1a',belt:'#4361ee',hair:'#6b4226',hb:'#4361ee'}
];
// 同角色對戰時 P2 的第二套配色（只影響繪圖，不存在遊戲狀態裡）
const LOOKA=[
 {skin:'#f0c09a',top:'#3a6fd8',dk:'#1f3f8a',top2:'#ffffff',ua:'#f0c09a',fa:'#1f4fb0',hand:'#1f4fb0',th:'#e9e9f2',sn:'#e9e9f2',shoe:'#2a2d42',belt:'#1b1b24',hair:'#ffd23d',hb:'#ff4d4d',col:'#3a7dff',col2:'#c4dcff'},
 {skin:'#d9a37a',top:'#c0392b',dk:'#7a1f17',top2:'#f0b8a8',ua:'#f0b8a8',fa:'#8a6a5a',hand:'#8a6a5a',th:'#3a1d1d',sn:'#4a2525',shoe:'#4a2525',belt:'#c8a88a',hair:'#e8e8f0',hb:'#c8a88a',col:'#ff6a3a',col2:'#ffd0b8',acc:'#ffb070',glow:'#ff7a3a'},
 {skin:'#e8c9a8',top:'#a83a4a',dk:'#5a1a28',top2:'#ff6b7a',ua:'#a83a4a',fa:'#3a0f18',hand:'#3a0f18',th:'#a83a4a',sn:'#3a0f18',shoe:'#1f0810',belt:'#ff6b7a',hair:'#1f0810',hb:'#ff6b7a',col:'#ff4d6a',col2:'#ffc4cc',ring:'#d0566a'},
 {skin:'#f2c79e',top:'#e8ecf8',dk:'#9aa4c0',top2:'#4dd2ff',ua:'#e8ecf8',fa:'#4dd2ff',hand:'#bff0ff',th:'#c8cfe4',sn:'#c8cfe4',shoe:'#4dd2ff',belt:'#4dd2ff',hair:'#2a2f4a',hb:'#ff5a8a',col:'#4dd2ff',col2:'#d4f6ff',acc:'#ff5a8a'},
 {skin:'#b97a52',top:'#2f3a4a',dk:'#1a2230',top2:'#9ab0c8',ua:'#b97a52',fa:'#b97a52',hand:'#efdcb8',th:'#2a3340',sn:'#2a3340',shoe:'#15181f',belt:'#c8a050',hair:'#d8d8d8',hb:'#3a8a5a',col:'#7f9ab8',col2:'#d8e4f0'},
 {skin:'#f3d6c4',top:'#e6dcff',dk:'#8a74c8',top2:'#ffffff',ua:'#e6dcff',fa:'#b9a6ff',hand:'#f2eeff',th:'#3a2f5a',sn:'#3a2f5a',shoe:'#f2eeff',belt:'#c8b6ff',hair:'#c8b6ff',hb:'#ff9de0',col:'#c8b6ff',col2:'#f2eeff'},
 {skin:'#e6b58c',top:'#9c3b1f',dk:'#5a1f0f',top2:'#f4a261',ua:'#e6b58c',fa:'#9c3b1f',hand:'#ffe0c2',th:'#2a1a12',sn:'#ffe0c2',shoe:'#2a1a12',belt:'#f4a261',hair:'#e76f51',hb:'#f4a261',col:'#f4a261',col2:'#ffe0c2'},
 {skin:'#e0b48a',top:'#2b3a67',dk:'#141c38',top2:'#c8d2f0',ua:'#2b3a67',fa:'#e0b48a',hand:'#c8d2f0',th:'#1a1a2a',sn:'#c8d2f0',shoe:'#1a1a2a',belt:'#c8d2f0',hair:'#1a1a2a',hb:'#c8d2f0',col:'#9fb2ff',col2:'#e6ebff'},
 {skin:'#c98d64',top:'#1d3557',dk:'#0d1b2a',top2:'#ffd60a',ua:'#c98d64',fa:'#c98d64',hand:'#ffd60a',th:'#ffd60a',sn:'#c98d64',shoe:'#f4f4f4',belt:'#ffffff',hair:'#1a1210',hb:'#ffd60a',col:'#ffd60a',col2:'#fff3b0'},
 {skin:'#e8c9a8',top:'#3a1f4a',dk:'#1a0e22',top2:'#e05ad0',ua:'#3a1f4a',fa:'#1a0e22',hand:'#1a0e22',th:'#3a1f4a',sn:'#1a0e22',shoe:'#0f0812',belt:'#e05ad0',hair:'#1a0e22',hb:'#e05ad0',col:'#e05ad0',col2:'#f8d0f2'},
 {skin:'#f6d7c3',top:'#7ad7f0',dk:'#2a7f9e',top2:'#e8fbff',ua:'#7ad7f0',fa:'#f6d7c3',hand:'#f6d7c3',th:'#1d3a5a',sn:'#1d3a5a',shoe:'#7ad7f0',belt:'#ffffff',hair:'#f0e0a0',hb:'#ff9ff3',col:'#7ad7f0',col2:'#e8fbff'},
 {skin:'#b8c0cc',top:'#e8ecf4',dk:'#8a92a6',top2:'#d62828',ua:'#5a6270',fa:'#e8ecf4',hand:'#3a404c',th:'#3a404c',sn:'#e8ecf4',shoe:'#2b2f3a',belt:'#d62828',hair:'#2b2f3a',hb:'#ff4d4d',col:'#e8ecf4',col2:'#ffd0d0'},
 {skin:'#f0c8a8',top:'#1d1d2b',dk:'#0a0a12',top2:'#ffd166',ua:'#1d1d2b',fa:'#1d1d2b',hand:'#f0c8a8',th:'#5a1a2a',sn:'#5a1a2a',shoe:'#1a0e0a',belt:'#ffd166',hair:'#e9ecef',hb:'#ffd166',col:'#ffd166',col2:'#fff3c0'},
 {skin:'#a87a5a',top:'#5a189a',dk:'#240046',top2:'#c77dff',ua:'#a87a5a',fa:'#5a189a',hand:'#a87a5a',th:'#5a189a',sn:'#240046',shoe:'#240046',belt:'#e9c46a',hair:'#e9edc9',hb:'#c77dff',col:'#c77dff',col2:'#ecd8ff'},
 {skin:'#c08a60',top:'#e9ecef',dk:'#9aa3b0',top2:'#1d3557',ua:'#c08a60',fa:'#c08a60',hand:'#3a2412',th:'#1d3557',sn:'#c08a60',shoe:'#1d1d2b',belt:'#1d3557',hair:'#e9ecef',hb:'#1d3557',col:'#9aa3b0',col2:'#e9ecef'},
 {skin:'#f0caa8',top:'#7a3e1d',dk:'#3e1f0e',top2:'#ffb703',ua:'#7a3e1d',fa:'#f0caa8',hand:'#c7a27a',th:'#2b2d42',sn:'#2b2d42',shoe:'#1a120c',belt:'#ffb703',hair:'#f4e3b2',hb:'#ffb703',col:'#ffb703',col2:'#ffe8a8'}];
const altOf=f=>!!f&&f.side===1&&!!p1&&!!p2&&p1.ch===p2.ch;
const colOf=f=>altOf(f)?LOOKA[CH.indexOf(f.ch)].col:f.ch.col;
// 細節配色：褲子寬鬆度、護腕、鞋底、鞋帶／分趾鞋
const LOOK2=[{bag:1.25,wrap:'#f4f4f4',sole:'#b9bccb',lace:1},{bag:1.05,wrap:'#c8d2e6',sole:'#151a2a'},{bag:1,wrap:'#5a3aa8',sole:'#0c0818',tabi:1},{bag:1,wrap:'#2a2f4a',sole:'#11131f'},{bag:1.3,wrap:'#efdcb8',sole:'#1a120c'},{bag:1.15,wrap:'#ffffff',sole:'#9fc8e0'},{bag:1,wrap:'#95d5b2',sole:'#1a120c',tabi:1},{bag:1.3,wrap:'#f6e0a8',sole:'#1a120c'},{bag:1,wrap:'#ffffff',sole:'#d0d0d8',lace:1,gl:1.45},{bag:1,wrap:'#a3e635',sole:'#0a0e06',tabi:1},{bag:1.2,wrap:'#ffd166',sole:'#c44da8'},{bag:1.1,wrap:'#2b2f3a',sole:'#111318',gl:1.2},{bag:1.35,wrap:'#ffffff',sole:'#1a120c',tabi:1},{bag:1.2,wrap:'#e9c46a',sole:'#0a1418'},{bag:1.15,wrap:'#e0d0b0',sole:'#1a120c',gl:1.15},{bag:1.05,wrap:'#c7a27a',sole:'#1a120c'}];
// 顏色變亮（k>0）或變暗（k<0），結果快取
const SHC=new Map();
function shade(c,k){const key=c+k;let v=SHC.get(key);if(v)return v;const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;if(k<0){r*=1+k;g*=1+k;b*=1+k}else{r+=(255-r)*k;g+=(255-g)*k;b+=(255-b)*k}v='rgb('+(r|0)+','+(g|0)+','+(b|0)+')';SHC.set(key,v);return v}
const IK=(A,B,l1,l2,s)=>{const dx=B[0]-A[0],dy=B[1]-A[1],dd=Math.hypot(dx,dy)||1;if(dd>=l1+l2-.5)return[A[0]+dx*l1/(l1+l2),A[1]+dy*l1/(l1+l2)];const a=(l1*l1-l2*l2+dd*dd)/(2*dd),h=Math.sqrt(Math.max(0,l1*l1-a*a));return[A[0]+dx*a/dd-dy/dd*h*s,A[1]+dy*a/dd+dx/dd*h*s]};
function drawF(f){
 const d=f.dir,ch=f.ch,w=ch.w,li=Math.max(0,CH.indexOf(ch)),AL=altOf(f),L=AL?LOOKA[li]:LOOK[li],CC=AL?L.col:ch.col,CC2=AL?L.col2:ch.col2,GA=ctx.globalAlpha,fl=f.flash>0||!!f.tint,C=c=>f.tint||(fl?'#fff':c),OUT='#0c0c1c';
 if(!f.ns){ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(f.x,GY+3,Math.max(10,30-(GY-f.y)*.08),7,0,0,6.3);ctx.fill()}
 ctx.save();ctx.translate(f.x+(f.st==='hit'&&G.hitstop>0?(Math.random()-.5)*6:0),f.y);
 if(f.st==='ko')ctx.rotate(-d*Math.min(1.5,f.kt*.1));
 if(f.st==='down')ctx.rotate(-d*1.5*Math.min(1,f.dt/16));
 ctx.lineCap='round';ctx.lineJoin='round';
 let hip=-52,sh=-98+Math.sin(G.frame*.12)*1.5,ln=0,ff=[16,0],bf=[-16,0],fh=[34,-84],bh=[22,-72],kl=0,trk=null;
 const a=f.atk;
 if(f.st==='walk'){const s=Math.sin(f.walk)*16,c=Math.cos(f.walk);ff=[14+s,-Math.max(0,c)*8];bf=[-14-s,-Math.max(0,-c)*8];sh+=Math.abs(Math.sin(f.walk))*-1.5}
 if(f.y<GY-2){ff=[24,-28];bf=[-4,-14]}
 if(f.st==='block'){if(f.bc){hip=-42;sh=-84;ff=[26,0];bf=[-22,0];fh=[24,-104];bh=[14,-92]}else{ff=[22,0];bf=[-20,0];fh=[20,-110];bh=[12,-98]}}
 if(f.st==='hit'){ln=-14;fh=[-6,-86];bh=[-20,-70];ff=[10,0];bf=[-20,0]}
 if(f.st==='ko'||f.st==='down'){fh=[-10,-60];bh=[-24,-70]}
 if(f.st==='dash'){ln=f.dd===d?10:-10;ff=[26,0];bf=[-26,0]}
 if(f.st==='atk'&&a){
  const tot=a.su+a.ac,e=f.t<=a.su?f.t/a.su*.7:f.t<=tot?1:Math.max(0,1-(f.t-tot)/a.rc),k=a.key;
  if(k==='lp'||k==='hp'||k==='ap'||k==='lunge'||k==='jab'){ln=(k==='hp'?10:k==='lunge'?20:6)*e;fh=[34+(a.r-34)*e,k==='lunge'?-92:-86]}
  else if(k==='lk'||k==='hk'||k==='spin'||k==='push'||k==='flip'){kl=1;ln=-8*e;ff=[16+(a.r-16)*e,(k==='spin'?-70:a.h)*e]}
  else if(k==='ak'||a.dive){kl=1;ln=-6*e;ff=[20+(a.r-20)*e,-28-6*e];bf=[-6,-12]}
  else if(k==='upper'||(k==='sp3'&&a.lift)){ln=8*e;fh=[22+8*e,-98-48*e]}
  else if(k==='sweep'){kl=1;hip=-26;sh=-62;ff=[16+(a.r-16)*e,-4];bf=[-20,0];fh=[26,-58];bh=[10,-48]}
  else if(a.counter){hip=-46;sh=-92;fh=[30,-100];bh=[26,-82];ff=[28,0];bf=[-26,0]}
  else if(a.around){ln=0;fh=[40,-96-10*e];bh=[-34,-96-10*e]}
  else if(a.type==='strike'){ln=-4*e;fh=[8,-104-40*e];bh=[-4,-92-30*e]}
  else if(k==='th'||k==='th2'||(k==='sp3'&&a.throw)||(a.throw&&!a.vx)){ln=12*e;fh=[40+14*e,-90];bh=[34+14*e,-80]}
  else if(a.type==='proj'){ln=10*e;fh=[30+40*e,-80];bh=[24+40*e,-84]}
  else{ln=22*e;hip=-48;fh=[30+(a.r-30)*e,-90];bh=[10,-70];ff=[22,0];bf=[-22,0]}
  if(a.type!=='proj'&&a.type!=='strike'&&!a.counter&&f.t>=a.su-1&&f.t<=tot+3){const E=kl?ff:fh;trk=[f.x+E[0]*d,f.y+E[1]]}
 }
 let stR=0;if(ch.staff&&f.st==='atk'&&a&&!kl&&!a.counter&&!a.throw&&!a.dive&&a.key!=='upper'&&a.key!=='sp3'&&a.type!=='proj'){const tt=a.su+a.ac,e2=f.t<=a.su?f.t/a.su*.7:f.t<=tt?1:Math.max(0,1-(f.t-tt)/a.rc),rch=24+(a.r-24)*e2,yy=Math.max(-104,Math.min(-24,a.h||-80));fh=[Math.min(rch,60),yy];bh=[fh[0]-24,yy+4];stR=Math.max(0,rch-60)}
 {const pz=f.pose||(f.st==='win'?'win':(G.phase==='intro'&&f.st==='idle'&&G.pt>20?'intro':null));if(pz){const q=POSE(li,pz,f);hip=q[0];sh=q[1];ff=q[2];bf=q[3];fh=q[4];bh=q[5];ln=q[6]}}
 if(f.st==='atk'&&f.hit&&a&&a.cn&&f.t>a.su){ctx.save();ctx.strokeStyle='#7fe3ff';ctx.globalAlpha=.35+.3*Math.sin(G.frame*.9);ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-58,40,76,0,0,6.3);ctx.stroke();ctx.restore()}
 // 氣槽光環
 if(f.mt>=50&&f.st!=='ko'){const hi=f.mt>=100,pu=.7+.3*Math.sin(G.frame*.25);ctx.globalAlpha=(hi?.28:.13)*pu;ctx.fillStyle=CC;ctx.beginPath();ctx.ellipse(0,-58,hi?44:37,hi?84:76,0,0,6.3);ctx.fill();ctx.globalAlpha=1}
 const R=p=>[p[0]*d,p[1]];
 const K=LOOK2[li],LX=-.45,LY=-.89, // 光源在左上方
  dt=!fl&&!(QM===3||(QM===0&&QA>=2)); // 省電畫質不畫明暗細節
 const seg=(p,q,wd,c)=>{ctx.strokeStyle=OUT;ctx.lineWidth=wd*w+3;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();ctx.strokeStyle=C(c);ctx.lineWidth=wd*w;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()};
 // 有肌肉弧度的肢段：P→Q，兩端半徑 a、b，中段鼓起 m；依光源畫陰影與高光
 const limb=(P,Q,a,b,m,c)=>{
  const dx=Q[0]-P[0],dy=Q[1]-P[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,mx=(P[0]+Q[0])/2,my=(P[1]+Q[1])/2,mw=(a+b)/2+m,an=Math.atan2(ny,nx),pt=new Path2D();
  pt.moveTo(P[0]+nx*a,P[1]+ny*a);pt.quadraticCurveTo(mx+nx*mw*1.12,my+ny*mw*1.12,Q[0]+nx*b,Q[1]+ny*b);pt.arc(Q[0],Q[1],b,an,an-Math.PI,true);
  pt.quadraticCurveTo(mx-nx*mw*1.12,my-ny*mw*1.12,P[0]-nx*a,P[1]-ny*a);pt.arc(P[0],P[1],a,an+Math.PI,an,true);pt.closePath();
  ctx.fillStyle=C(c);ctx.fill(pt);
  if(dt){const s=nx*LX+ny*LY>0?-1:1,o=(a+b)/2;ctx.save();ctx.clip(pt);ctx.lineCap='round';
   ctx.strokeStyle=shade(c,-.32);ctx.lineWidth=o*1.15;ctx.beginPath();ctx.moveTo(P[0]+nx*s*o,P[1]+ny*s*o);ctx.lineTo(Q[0]+nx*s*o,Q[1]+ny*s*o);ctx.stroke();
   ctx.strokeStyle=shade(c,.3);ctx.lineWidth=Math.max(1.2,o*.3);ctx.beginPath();ctx.moveTo(P[0]-nx*s*o*.5,P[1]-ny*s*o*.5);ctx.lineTo(Q[0]-nx*s*o*.5,Q[1]-ny*s*o*.5);ctx.stroke();ctx.restore()}
  ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.stroke(pt);
 };
 const lerp=(P,Q,t)=>[P[0]+(Q[0]-P[0])*t,P[1]+(Q[1]-P[1])*t];
 // 拳頭：沿前臂方向，有指節、拇指
 const fist=(H,E)=>{const ux=H[0]-E[0],uy=H[1]-E[1];ctx.save();ctx.translate(H[0],H[1]);ctx.rotate(Math.atan2(uy,ux));{const gs=K.gl||1;ctx.scale(w*gs,w*gs*(ux*d>=0?1:-1))}
  const p=new Path2D();p.moveTo(-3,-5.5);p.lineTo(5,-6);p.quadraticCurveTo(10,-6,10,-1);p.lineTo(10,2.5);p.quadraticCurveTo(10,6.5,5,6.5);p.lineTo(-3,6);p.closePath();
  ctx.fillStyle=C(L.hand);ctx.fill(p);
  if(dt){ctx.save();ctx.clip(p);ctx.fillStyle=shade(L.hand,-.3);ctx.fillRect(-4,2.5,16,6);ctx.fillStyle=shade(L.hand,.3);ctx.fillRect(1,-5.5,8,1.8);ctx.restore();
   ctx.strokeStyle=shade(L.hand,-.45);ctx.lineWidth=1;ctx.beginPath();for(const y of[-2.6,.4,3.3]){ctx.moveTo(6.5,y);ctx.lineTo(9.6,y)}ctx.stroke()}
  ctx.strokeStyle=OUT;ctx.lineWidth=1.6;ctx.stroke(p);
  ctx.fillStyle=C(L.hand);ctx.beginPath();ctx.ellipse(2.5,-5.8,3.6,2.2,-.25,0,6.3);ctx.fill();ctx.stroke();
  ctx.restore()};
 // 護腕
 const cuff=(E,H,c)=>{if(!c)return;const A=lerp(E,H,.62),B=lerp(E,H,.9);limb(A,B,4.6*w,4.4*w,.3*w,c);if(!fl){ctx.strokeStyle=shade(c,-.35);ctx.lineWidth=1;const M=lerp(A,B,.5),ux=B[0]-A[0],uy=B[1]-A[1],l=Math.hypot(ux,uy)||1,nx=-uy/l*4*w,ny=ux/l*4*w;ctx.beginPath();ctx.moveTo(M[0]+nx,M[1]+ny);ctx.lineTo(M[0]-nx,M[1]-ny);ctx.stroke()}};
 const arm=(sx,hnd)=>{const A=[ln+sx,sh+3],E=IK(A,hnd,24,24,1),Sl=R(A),El=R(E),H=R(hnd);
  limb(Sl,El,5.8*w,4.6*w,1.4*w,L.ua);limb(El,H,4.8*w,3.7*w,1*w,L.fa);cuff(El,H,K.wrap);fist(H,El)};
 // 鞋子：跟著小腿角度轉，有鞋底
 const shoe=(F,Kn)=>{let sx=F[0]-Kn[0],sy=F[1]-Kn[1];const l=Math.hypot(sx,sy)||1;sx/=l;sy/=l;let fx=(d>0?sy:-sy)*.55+d*.45,fy=(d>0?-sx:sx)*.55;
  ctx.save();ctx.translate(F[0],F[1]);ctx.rotate(Math.atan2(fy,fx));ctx.scale(w,w*d*(fx*d>=0?1:-1));
  const p=new Path2D();p.moveTo(-6,-5);p.quadraticCurveTo(2,-8,7,-5);p.quadraticCurveTo(15,-3,16,1);p.quadraticCurveTo(16,4.5,12,4.5);p.lineTo(-6,4.5);p.quadraticCurveTo(-8,0,-6,-5);p.closePath();
  ctx.fillStyle=C(L.shoe);ctx.fill(p);
  if(!fl){ctx.save();ctx.clip(p);ctx.fillStyle=K.sole;ctx.fillRect(-9,1.6,27,4);ctx.fillStyle=shade(L.shoe,.35);ctx.fillRect(-4,-6,10,1.6);ctx.restore();
   ctx.strokeStyle=shade(L.shoe,-.45);ctx.lineWidth=1;ctx.beginPath();if(K.tabi){ctx.moveTo(11,-2.5);ctx.lineTo(11,3)}else if(K.lace){for(const x of[1,4,7]){ctx.moveTo(x,-5.5);ctx.lineTo(x+2,-3)}}ctx.stroke()}
  ctx.strokeStyle=OUT;ctx.lineWidth=1.7;ctx.stroke(p);ctx.restore()};
 const leg=(foot,back)=>{const Hh=[back?-3:3,hip],Kk=IK(Hh,foot,28,28,-1),Hl=R(Hh),Kl=R(Kk),F=R(foot),bg=K.bag;
  limb(Hl,Kl,7.2*w*bg,5.6*w*Math.min(bg,1.12),1.1*w*bg,L.th);limb(Kl,F,5.7*w*Math.min(bg,1.08),4*w*(bg>1.1?1.2:1),1.3*w,L.sn);
  if(bg>1.1&&!fl){ctx.strokeStyle=shade(L.th,-.4);ctx.lineWidth=1.2;const a=lerp(Hl,Kl,.35),b=lerp(Hl,Kl,.7);ctx.beginPath();ctx.moveTo(a[0]-3*d,a[1]);ctx.quadraticCurveTo(b[0]+2*d,(a[1]+b[1])/2,b[0]-2*d,b[1]);ctx.stroke()}
  shoe(F,Kl)};
 const HPl=[0,hip],SHl=[ln*d,sh];let vx=SHl[0]-HPl[0],vy=SHl[1]-HPl[1];const tl=Math.hypot(vx,vy)||1;vx/=tl;vy/=tl;
 const nx=-vy,ny=vx,hw=10*w,sw=13.5*w;
 const hx=ln*d*1.2,hy=sh-17,hr=li===1?15:li===2?13:li===4?16:14;
 // 頭髮等多邊形：由上往下的漸層（上亮下暗）
 const poly=(pts,fill,ox,oy)=>{ctx.beginPath();let t=1e9,b=-1e9;pts.forEach((p,i)=>{const X=ox+p[0]*d,Y=oy+p[1];t=Math.min(t,Y);b=Math.max(b,Y);i?ctx.lineTo(X,Y):ctx.moveTo(X,Y)});ctx.closePath();
  if(fl)ctx.fillStyle=C(fill);else{const g=ctx.createLinearGradient(0,t,0,b);g.addColorStop(0,shade(fill,.35));g.addColorStop(.55,fill);g.addColorStop(1,shade(fill,-.3));ctx.fillStyle=g}
  ctx.fill();ctx.strokeStyle=OUT;ctx.lineWidth=1.8;ctx.stroke()};
 // 影的圍巾(在身後)
 if(li===2){const sx0=SHl[0],sy0=sh+2,wv=G.frame*.25-(f.vx||0)*.1;ctx.strokeStyle=OUT;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(sx0,sy0);ctx.quadraticCurveTo(sx0-d*22,sy0+8+Math.sin(wv)*4,sx0-d*44,sy0+2+Math.sin(wv+1)*7);ctx.stroke();ctx.strokeStyle=C(L.belt);ctx.lineWidth=6;ctx.stroke();if(!fl){ctx.strokeStyle=shade(L.belt,.35);ctx.lineWidth=1.5;ctx.stroke()}}
 if(li===5){const wv=Math.sin(G.frame*.12)*2;limb([hx-d*hr*.55,hy-2],[hx-d*(hr+3+wv),hy+30],6.5,2.2,1.5,L.hair)} // 霜的長髮（在身後，上粗下細）
 if(li===6){const wv=G.frame*.3-(f.vx||0)*.12;for(const[o,c2]of[[0,OUT],[1,C(L.hb)]]){ctx.strokeStyle=c2;ctx.lineWidth=o?3.5:6;ctx.beginPath();ctx.moveTo(hx-d*12,hy-7);ctx.quadraticCurveTo(hx-d*30,hy-4+Math.sin(wv)*5,hx-d*(52+Math.sin(wv*.7)*4),hy-10+Math.sin(wv+1)*8);ctx.stroke()}}
 if(li===15){const q=[SHl[0]-d*12,sh+4];ctx.save();ctx.translate(q[0],q[1]);ctx.rotate(-.45*d);ctx.fillStyle=C('#6b4226');ctx.strokeStyle=OUT;ctx.lineWidth=1.8;ctx.fillRect(-6,-6,12,40);ctx.strokeRect(-6,-6,12,40);ctx.strokeStyle=C('#e9ecef');ctx.lineWidth=1.5;for(const o of[-3,0,3]){ctx.beginPath();ctx.moveTo(o,-6);ctx.lineTo(o,-16);ctx.stroke()}ctx.fillStyle=C(L.hb);for(const o of[-3,0,3]){ctx.beginPath();ctx.moveTo(o-2,-16);ctx.lineTo(o,-22);ctx.lineTo(o+2,-16);ctx.fill()}ctx.restore()}
 // 後側手腳（稍暗，做出前後層次）
 ctx.globalAlpha=GA*.82;arm(-3,bh);leg(bf,1);ctx.globalAlpha=GA;
 // 骨盆（褲頭），讓兩腿接得自然
 {const pp=new Path2D();pp.ellipse(HPl[0],hip+3,11*w*K.bag,9,Math.atan2(vy,vx)+Math.PI/2,0,6.3);ctx.fillStyle=C(L.th);ctx.fill(pp);ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.stroke(pp)}
 // 軀幹：胸、腰、臀的曲線（沿脊椎座標，fs＝胸口那一側）
 const tp=[[HPl[0]+nx*hw,HPl[1]+ny*hw],[SHl[0]+nx*sw,SHl[1]+ny*sw],[SHl[0]-nx*sw,SHl[1]-ny*sw],[HPl[0]-nx*hw,HPl[1]-ny*hw]];
 const fs=d*nx>=0?1:-1,sp=(t,s)=>[HPl[0]+(SHl[0]-HPl[0])*t+nx*s,HPl[1]+(SHl[1]-HPl[1])*t+ny*s];
 const TP=[sp(0,fs*hw),sp(.38,fs*9.6*w),sp(.74,fs*14.2*w),sp(.96,fs*12.6*w),sp(1.06,fs*5.5*w),sp(1.06,-fs*5.5*w),sp(.96,-fs*12.2*w),sp(.72,-fs*12*w),sp(.4,-fs*8.8*w),sp(0,-fs*hw)];
 const tpath=new Path2D();{const n=TP.length,m=(i)=>{const a=TP[i%n],b=TP[(i+1)%n];return[(a[0]+b[0])/2,(a[1]+b[1])/2]};const s0=m(n-1);tpath.moveTo(s0[0],s0[1]);for(let i=0;i<n;i++){const e=m(i);tpath.quadraticCurveTo(TP[i][0],TP[i][1],e[0],e[1])}tpath.closePath()}
 const gr=ctx.createLinearGradient(SHl[0]+d*sw,sh,SHl[0]-d*sw,sh);gr.addColorStop(0,C(L.top));gr.addColorStop(1,C(L.dk));
 ctx.fillStyle=gr;ctx.fill(tpath);
 const fi=d*nx>=0?[1,0]:[2,3],cx=(HPl[0]+SHl[0])/2,cy=(hip+sh)/2;
 if(!fl){
  ctx.save();ctx.clip(tpath);
  if(dt){ // 背光側陰影、受光側高光
  const s=nx*LX+ny*LY>0?-1:1,A=sp(.05,s*13*w),B=sp(1,s*13*w);ctx.lineCap='round';ctx.strokeStyle='rgba(0,0,0,.28)';ctx.lineWidth=11*w;ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();
  const A2=sp(.15,-s*9*w),B2=sp(.92,-s*10*w);ctx.strokeStyle='rgba(255,255,255,.16)';ctx.lineWidth=3*w;ctx.beginPath();ctx.moveTo(A2[0],A2[1]);ctx.lineTo(B2[0],B2[1]);ctx.stroke()}
  if(li===0){ // 道服交領
   ctx.strokeStyle=L.top2;ctx.lineWidth=3.2;ctx.beginPath();const c1=sp(1,fs*9*w),c2=sp(1,-fs*4*w),v=sp(.42,fs*3*w);ctx.moveTo(c1[0],c1[1]);ctx.lineTo(v[0],v[1]);ctx.moveTo(c2[0],c2[1]);ctx.lineTo(sp(.55,fs*6*w)[0],sp(.55,fs*6*w)[1]);ctx.stroke();
   ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=1.2;ctx.beginPath();for(const t of[.3,.55]){const a=sp(t,-fs*8*w),b=sp(t+.12,-fs*2*w);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1])}ctx.stroke();
   ctx.fillStyle=L.acc||'#ffd23d';ctx.beginPath();ctx.moveTo(cx+d*2,cy-8);ctx.lineTo(cx+d*8,cy+4);ctx.lineTo(cx-d*4,cy+4);ctx.closePath();ctx.fill()}
  else if(li===1){ // 護甲板與鉚釘
   ctx.strokeStyle=L.top2;ctx.lineWidth=2;ctx.beginPath();for(const t of[.32,.62]){const a=sp(t,-16*w),b=sp(t+.04,0),c2=sp(t,16*w);ctx.moveTo(a[0],a[1]);ctx.quadraticCurveTo(b[0],b[1],c2[0],c2[1])}ctx.stroke();
   ctx.fillStyle='#dfe8f8';for(const t of[.32,.62])for(const s2 of[-1,1]){const q=sp(t+.02,s2*9*w);ctx.beginPath();ctx.arc(q[0],q[1],1.4,0,6.3);ctx.fill()}
   glow(cx+d*2,cy-2,15,L.glow||'#7fd6ff',.8);ctx.save();ctx.fillStyle=L.acc||'#bff0ff';ctx.beginPath();ctx.arc(cx+d*2,cy-2,4.5,0,6.3);ctx.fill();ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(cx+d*1,cy-3,1.6,0,6.3);ctx.fill();ctx.restore()}
  else if(li===2){ // 交叉綁帶與纏布
   ctx.strokeStyle=L.top2;ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]+4);ctx.lineTo(tp[3][0],tp[3][1]-6);ctx.moveTo(tp[2][0],tp[2][1]+4);ctx.lineTo(tp[0][0],tp[0][1]-6);ctx.stroke();
   ctx.strokeStyle='rgba(0,0,0,.3)';ctx.lineWidth=1;ctx.beginPath();for(let t=.12;t<.9;t+=.13){const a=sp(t,-14*w),b=sp(t+.05,14*w);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1])}ctx.stroke()}
  else if(li===3){ // 夾克：立領、拉鍊、閃電
   ctx.strokeStyle=L.top2;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]);ctx.lineTo(tp[2][0],tp[2][1]);ctx.stroke();
   ctx.strokeStyle='#cfd3e6';ctx.lineWidth=1.3;ctx.setLineDash([2,2]);ctx.beginPath();const z1=sp(.98,fs*3*w),z2=sp(.05,fs*3*w);ctx.moveTo(z1[0],z1[1]);ctx.lineTo(z2[0],z2[1]);ctx.stroke();ctx.setLineDash([]);
   glow(cx,cy,17,L.acc||'#ffd23d',.55);ctx.save();ctx.strokeStyle=L.acc||'#ffd23d';ctx.lineWidth=3;ctx.lineJoin='miter';ctx.beginPath();ctx.moveTo(cx+d*4,cy-13);ctx.lineTo(cx-d*3,cy-1);ctx.lineTo(cx+d*3,cy-1);ctx.lineTo(cx-d*4,cy+12);ctx.stroke();ctx.restore()}
  else if(li===4){ // 敞開的背心，露出胸肌、腹肌
   const a=sp(1,fs*7*w),b=sp(.02,fs*5*w);ctx.lineCap='round';ctx.strokeStyle=OUT;ctx.lineWidth=17*w;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();ctx.strokeStyle=L.skin;ctx.lineWidth=14*w;ctx.stroke();
   ctx.strokeStyle=shade(L.skin,-.35);ctx.lineWidth=1.4;ctx.beginPath();const p1=sp(.78,fs*1*w),p2=sp(.7,fs*11*w),p3=sp(.62,fs*6*w);ctx.moveTo(p1[0],p1[1]);ctx.quadraticCurveTo(p3[0],p3[1],p2[0],p2[1]);
   for(const t of[.25,.4,.53]){const q1=sp(t,fs*3*w),q2=sp(t,fs*9*w);ctx.moveTo(q1[0],q1[1]);ctx.lineTo(q2[0],q2[1])}const m1=sp(.6,fs*6*w),m2=sp(.15,fs*6*w);ctx.moveTo(m1[0],m1[1]);ctx.lineTo(m2[0],m2[1]);ctx.stroke()}
  else if(li===5){ // 霜：斜披白紗、毛領、雪花紋
   ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=5*w;ctx.beginPath();const s1=sp(1,fs*10*w),s2=sp(.08,-fs*8*w);ctx.moveTo(s1[0],s1[1]);ctx.lineTo(s2[0],s2[1]);ctx.stroke();
   ctx.fillStyle='#ffffff';for(let i=-2;i<=2;i++){const q=sp(1.02,i*5*w);ctx.beginPath();ctx.arc(q[0],q[1],3.4*w,0,6.3);ctx.fill()}
   const c0=sp(.68,fs*4*w);ctx.strokeStyle='#5fb8e0';ctx.lineWidth=1.4;ctx.beginPath();for(let k=0;k<3;k++){const an=k*Math.PI/3;ctx.moveTo(c0[0]-Math.cos(an)*5,c0[1]-Math.sin(an)*5);ctx.lineTo(c0[0]+Math.cos(an)*5,c0[1]+Math.sin(an)*5)}ctx.stroke()}
  else if(li===6){ // 嵐：敞開的短背心、斜綁腰帶
   const a1=sp(1,fs*6*w),b1=sp(.05,fs*4*w);ctx.lineCap='round';ctx.strokeStyle=OUT;ctx.lineWidth=12*w;ctx.beginPath();ctx.moveTo(a1[0],a1[1]);ctx.lineTo(b1[0],b1[1]);ctx.stroke();ctx.strokeStyle=L.skin;ctx.lineWidth=9*w;ctx.stroke();
   ctx.strokeStyle=L.top2;ctx.lineWidth=4*w;ctx.beginPath();const q1=sp(.95,-fs*12*w),q2=sp(.2,fs*10*w);ctx.moveTo(q1[0],q1[1]);ctx.lineTo(q2[0],q2[1]);ctx.stroke()}
  else if(li===8){ // 拳：運動背心、腹肌
   const a1=sp(.98,fs*8*w),b1=sp(.3,fs*7*w);ctx.lineCap='round';ctx.strokeStyle=OUT;ctx.lineWidth=12*w;ctx.beginPath();ctx.moveTo(a1[0],a1[1]);ctx.lineTo(b1[0],b1[1]);ctx.stroke();ctx.strokeStyle=L.skin;ctx.lineWidth=9*w;ctx.stroke();
   ctx.strokeStyle=L.top2;ctx.lineWidth=2.2;ctx.beginPath();const z1=sp(.9,-fs*12*w),z2=sp(.1,-fs*9*w);ctx.moveTo(z1[0],z1[1]);ctx.lineTo(z2[0],z2[1]);ctx.stroke()}
  else if(li===9){ // 蠍：交叉皮帶、蠍子紋
   ctx.strokeStyle='#3a2a10';ctx.lineWidth=3*w;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]+4);ctx.lineTo(tp[3][0],tp[3][1]-6);ctx.stroke();
   const c0=sp(.66,fs*2*w);ctx.strokeStyle=L.top2;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(c0[0]-6,c0[1]+6);ctx.quadraticCurveTo(c0[0],c0[1]-10,c0[0]+7,c0[1]-4);ctx.moveTo(c0[0]-5,c0[1]+2);ctx.lineTo(c0[0]+3,c0[1]+2);ctx.moveTo(c0[0]-5,c0[1]-2);ctx.lineTo(c0[0]+3,c0[1]-2);ctx.stroke()}
  else if(li===10){ // 蝶：交領舞衣、花紋
   ctx.strokeStyle=L.top2;ctx.lineWidth=3;ctx.beginPath();const c1=sp(1,fs*9*w),v=sp(.45,fs*2*w),c2=sp(1,-fs*5*w);ctx.moveTo(c1[0],c1[1]);ctx.lineTo(v[0],v[1]);ctx.moveTo(c2[0],c2[1]);ctx.lineTo(sp(.6,fs*5*w)[0],sp(.6,fs*5*w)[1]);ctx.stroke();
   const f0=sp(.3,-fs*4*w);ctx.fillStyle='#ffd166';for(let k=0;k<5;k++){const an=k*1.257;ctx.beginPath();ctx.arc(f0[0]+Math.cos(an)*3.2,f0[1]+Math.sin(an)*3.2,2,0,6.3);ctx.fill()}}
  else if(li===11){ // 機：胸甲板、能源核心
   ctx.fillStyle=L.top2;ctx.strokeStyle=OUT;ctx.lineWidth=1.5;const q=[sp(.9,-10*w),sp(.9,10*w),sp(.55,8*w),sp(.55,-8*w)];ctx.beginPath();q.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill();ctx.stroke();
   const c0=sp(.72,0);glow(c0[0],c0[1],12,L.hb,.8);ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(c0[0],c0[1],2.6,0,6.3);ctx.fill();
   ctx.fillStyle='#dfe4ee';for(const t of[.3,.15])for(const s2 of[-1,1]){const r0=sp(t,s2*8*w);ctx.beginPath();ctx.arc(r0[0],r0[1],1.3,0,6.3);ctx.fill()}}
  else if(li===12){ // 刃：劍道服交領、紅腰繩
   ctx.strokeStyle=L.dk;ctx.lineWidth=3;ctx.beginPath();const c1=sp(1,fs*9*w),v=sp(.42,fs*2*w),c2=sp(1,-fs*5*w);ctx.moveTo(c1[0],c1[1]);ctx.lineTo(v[0],v[1]);ctx.moveTo(c2[0],c2[1]);ctx.lineTo(sp(.55,fs*6*w)[0],sp(.55,fs*6*w)[1]);ctx.stroke();
   ctx.strokeStyle='rgba(0,0,0,.18)';ctx.lineWidth=1.2;ctx.beginPath();for(const t of[.3,.6]){const a1=sp(t,-fs*9*w),b1=sp(t+.1,-fs*2*w);ctx.moveTo(a1[0],a1[1]);ctx.lineTo(b1[0],b1[1])}ctx.stroke()}
  else if(li===13){ // 巫：骨飾項鍊、咒紋
   ctx.fillStyle='#f4f1de';ctx.strokeStyle=OUT;ctx.lineWidth=1;for(let i=-3;i<=3;i++){const q=sp(.9-Math.abs(i)*.04,i*3.4*w);ctx.beginPath();ctx.ellipse(q[0],q[1]+3,1.8,3.4,0,0,6.3);ctx.fill();ctx.stroke()}
   const c0=sp(.5,fs*2*w);ctx.strokeStyle=L.top2;ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(c0[0],c0[1],5,0,6.3);ctx.moveTo(c0[0],c0[1]-8);ctx.lineTo(c0[0],c0[1]+8);ctx.stroke()}
  else if(li===14){ // 獸：獸皮披肩、爪痕
   const a1=sp(1.02,-fs*14*w),b1=sp(.7,fs*14*w);ctx.lineCap='round';ctx.strokeStyle=OUT;ctx.lineWidth=13*w;ctx.beginPath();ctx.moveTo(a1[0],a1[1]);ctx.lineTo(b1[0],b1[1]);ctx.stroke();ctx.strokeStyle='#7a4a24';ctx.lineWidth=10*w;ctx.stroke();ctx.strokeStyle='#a0673a';ctx.lineWidth=2;ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
   ctx.strokeStyle='rgba(120,20,20,.7)';ctx.lineWidth=1.5;ctx.beginPath();for(let k=0;k<3;k++){const q1=sp(.5-k*.06,fs*(2+k*3)*w),q2=sp(.3-k*.06,fs*(6+k*3)*w);ctx.moveTo(q1[0],q1[1]);ctx.lineTo(q2[0],q2[1])}ctx.stroke()}
  else if(li===15){ // 羽：皮背帶、羽毛徽章
   ctx.strokeStyle='#6b4226';ctx.lineWidth=3*w;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]+4);ctx.lineTo(tp[3][0],tp[3][1]-6);ctx.stroke();
   const c0=sp(.66,fs*4*w);ctx.fillStyle=L.top2;ctx.beginPath();ctx.ellipse(c0[0],c0[1],2.6,7,.5*d,0,6.3);ctx.fill()}
  else if(li===7){ // 月：僧袍交領、佛珠
   ctx.strokeStyle=L.top2;ctx.lineWidth=3.2;ctx.beginPath();const c1=sp(1,fs*9*w),c2=sp(1,-fs*4*w),v=sp(.42,fs*3*w);ctx.moveTo(c1[0],c1[1]);ctx.lineTo(v[0],v[1]);ctx.moveTo(c2[0],c2[1]);ctx.lineTo(sp(.55,fs*6*w)[0],sp(.55,fs*6*w)[1]);ctx.stroke();
   ctx.fillStyle='#5a2a1a';ctx.strokeStyle=OUT;ctx.lineWidth=1;for(let i=0;i<7;i++){const q=sp(.98-i*.1,-fs*(10-i*3.2)*w);ctx.beginPath();ctx.arc(q[0],q[1],2.6,0,6.3);ctx.fill();ctx.stroke()}}
  ctx.restore();
 }
 ctx.strokeStyle=OUT;ctx.lineWidth=2.2;ctx.stroke(tpath);
 // 腰帶
 const b0=sp(.04,hw*1.05),b1=sp(.04,-hw*1.05);seg(b0,b1,li===4?9:5.5,L.belt);
 if(!fl){ctx.strokeStyle=shade(L.belt,.4);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(b0[0],b0[1]-1.5);ctx.lineTo(b1[0],b1[1]-1.5);ctx.stroke()}
 if(li===4&&!fl){ctx.strokeStyle='rgba(90,60,20,.7)';ctx.lineWidth=1.5;for(let q=.15;q<1;q+=.2){const bx=b0[0]+(b1[0]-b0[0])*q,by=b0[1]+(b1[1]-b0[1])*q;ctx.beginPath();ctx.moveTo(bx-3,by-4);ctx.lineTo(bx+3,by+4);ctx.stroke()}}
 if(li!==1){const bw=Math.sin(G.frame*.3)*3,k0=sp(.04,0);ctx.fillStyle=C(L.belt);ctx.strokeStyle=OUT;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(k0[0]+d*2,k0[1],3.6,3,0,0,6.3);ctx.fill();ctx.stroke();seg([k0[0]+d*1,k0[1]+2],[k0[0]-d*(8+bw),k0[1]+12+bw],3.5,L.belt);seg([k0[0]+d*3,k0[1]+2],[k0[0]+d*(1-bw*.5),k0[1]+14],3.5,L.belt)}
 // 前側腿
 leg(ff,0);
 // 脖子
 limb(SHl,[hx,hy+8],5.2*w,4.6*w,.4*w,L.skin);
 // 頭：頭顱＋下巴（先描外框再填色，讓兩塊形狀接成一體）
 const ko=f.st==='ko'||f.st==='down',hit=f.st==='hit',hc=li===2?L.hair:L.skin;
 const hp=new Path2D(),hj=new Path2D();hp.arc(hx-d*1,hy-1,hr,0,6.3);hj.moveTo(hx-d*hr*.55,hy+hr*.5);hj.lineTo(hx+d*hr*.2,hy+hr*1.02);hj.quadraticCurveTo(hx+d*hr*.8,hy+hr*1.0,hx+d*hr*.98,hy+hr*.35);hj.lineTo(hx+d*hr*.9,hy-hr*.2);hj.closePath();hp.addPath(hj);
 ctx.strokeStyle=li===2?(L.ring||'#7b57d6'):OUT;ctx.lineWidth=4;ctx.stroke(hp);ctx.fillStyle=C(hc);ctx.fill(hj);{const hc0=new Path2D();hc0.arc(hx-d*1,hy-1,hr,0,6.3);ctx.fill(hc0)}
 if(!fl){if(dt){ctx.save();ctx.clip(hp);ctx.fillStyle=shade(hc,-.16);ctx.beginPath();ctx.ellipse(hx-d*hr*1.25,hy+hr*.2,hr*.7,hr*1.3,0,0,6.3);ctx.fill();ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.ellipse(hx+d*hr*.25,hy-hr*.55,hr*.45,hr*.28,-.4*d,0,6.3);ctx.fill();ctx.restore()}
  if(li!==2&&li!==11){ // 耳朵、鼻子
   ctx.fillStyle=L.skin;ctx.strokeStyle=OUT;ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(hx-d*hr*.12,hy+hr*.1,3.2,4.4,0,0,6.3);ctx.fill();ctx.stroke();ctx.strokeStyle=shade(L.skin,-.35);ctx.lineWidth=1;ctx.beginPath();ctx.arc(hx-d*hr*.12,hy+hr*.1,1.8,-1.2,1.2);ctx.stroke();
   ctx.fillStyle=L.skin;ctx.strokeStyle=OUT;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(hx+d*hr*.93,hy-hr*.05);ctx.lineTo(hx+d*(hr+2.6),hy+hr*.28);ctx.lineTo(hx+d*hr*.9,hy+hr*.36);ctx.fill();ctx.stroke()}}
 if(li===0){
  poly([[-13,3],[-25,-5],[-15,-8],[-27,-19],[-10,-15],[-14,-30],[0,-19],[6,-31],[10,-15],[20,-19],[15,-6],[14,-8],[8,-12],[-8,-10]],L.hair,hx,hy);
  seg([hx-d*14,hy-6],[hx+d*14,hy-6],4,L.hb);const tw=Math.sin(G.frame*.3)*4;seg([hx-d*14,hy-6],[hx-d*(28+tw),hy-2+tw*.6],3.5,L.hb)
 }else if(li===1){
  poly([[-15,0],[-15,-12],[-8,-19],[9,-19],[15,-11],[15,-3],[10,-8],[-10,-8]],L.hair,hx,hy);
  seg([hx-d*14,hy-6],[hx+d*15,hy-6],4.5,L.hb);
  if(!fl){ctx.strokeStyle='#8a4b3a';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(hx+d*5,hy+1);ctx.lineTo(hx+d*9,hy+9);ctx.stroke()}
 }else if(li===3){
  poly([[-13,2],[-22,-8],[-14,-10],[-24,-24],[-8,-17],[-6,-34],[3,-19],[14,-30],[12,-14],[22,-12],[15,-4],[8,-12],[-8,-10]],L.hair,hx,hy);
  if(!fl){ctx.strokeStyle='#ffd23d';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(hx-d*2,hy-30);ctx.lineTo(hx+d*4,hy-21);ctx.lineTo(hx-d*1,hy-17);ctx.lineTo(hx+d*5,hy-9);ctx.stroke()}
  seg([hx-d*13,hy-9],[hx+d*13,hy-9],4.5,L.hb);ctx.fillStyle=C('#d8fbff');ctx.strokeStyle=OUT;ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(hx+d*7,hy-10,4.2,0,6.3);ctx.fill();ctx.stroke()
 }else if(li===4){
  ctx.fillStyle=C(L.hair);ctx.strokeStyle=OUT;ctx.lineWidth=1.8;ctx.beginPath();ctx.arc(hx-d*4,hy-hr-4,6.5,0,6.3);ctx.fill();ctx.stroke();
  poly([[-16,-2],[-15,-12],[-6,-18],[8,-18],[16,-10],[16,-4],[9,-9],[-9,-9]],L.hair,hx,hy);
  seg([hx-d*15,hy-7],[hx+d*15,hy-7],4,L.hb)
 }else if(li===2){
  const wv=Math.sin(G.frame*.25);seg([hx-d*11,hy-7],[hx-d*(24+wv*3),hy-4+wv*3],5,L.hair);seg([hx-d*(24+wv*3),hy-4+wv*3],[hx-d*(32+wv*4),hy+5+wv*4],4,L.hair);
  seg([hx-d*13,hy-6],[hx+d*13,hy-6],4,L.hb);
  ctx.strokeStyle=C(L.skin);ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(hx+d*2,hy-1);ctx.lineTo(hx+d*12,hy-1);ctx.stroke()
 }else if(li===5){ // 霜：齊瀏海、冰晶頭冠
  poly([[-15,4],[-16,-10],[-8,-18],[6,-19],[15,-11],[14,-3],[7,-9],[0,-8],[-7,-5],[-10,6]],L.hair,hx,hy);
  if(!fl)glow(hx,hy-20,12,'#9fe8ff',.6);
  for(const[o,h]of[[-6,9],[0,13],[6,9]]){ctx.fillStyle=C('#e8fbff');ctx.strokeStyle=OUT;ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(hx+d*(o-3),hy-16);ctx.lineTo(hx+d*o,hy-16-h);ctx.lineTo(hx+d*(o+3),hy-16);ctx.closePath();ctx.fill();ctx.stroke()}
 }else if(li===6){ // 嵐：後梳尖髮、頭帶
  poly([[-14,2],[-30,-6],[-16,-10],[-32,-18],[-12,-17],[-22,-30],[-2,-20],[8,-24],[12,-14],[16,-8],[8,-10],[-8,-8]],L.hair,hx,hy);
  seg([hx-d*14,hy-7],[hx+d*14,hy-7],4,L.hb)
  }else if(li===8){ // 拳：短髮、頭帶
  poly([[-14,-2],[-15,-11],[-6,-17],[8,-17],[15,-9],[14,-4],[7,-10],[-8,-10]],L.hair,hx,hy);
  seg([hx-d*14,hy-6],[hx+d*14,hy-6],4,L.hb);const tw=Math.sin(G.frame*.3)*3;seg([hx-d*14,hy-6],[hx-d*(24+tw),hy-1+tw*.5],3,L.hb)
 }else if(li===9){ // 蠍：頭巾、面罩
  poly([[-15,4],[-16,-10],[-8,-18],[8,-18],[15,-10],[15,-4],[-12,-4]],L.hair,hx,hy);
  ctx.fillStyle=C(L.top);ctx.strokeStyle=OUT;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(hx-d*12,hy+3);ctx.lineTo(hx+d*(hr+1),hy+2);ctx.lineTo(hx+d*hr*.6,hy+hr);ctx.lineTo(hx-d*6,hy+hr*.9);ctx.closePath();ctx.fill();ctx.stroke();
  seg([hx-d*15,hy-6],[hx+d*14,hy-6],3,L.hb)
 }else if(li===10){ // 蝶：髮髻、髮簪
  ctx.fillStyle=C(L.hair);ctx.strokeStyle=OUT;ctx.lineWidth=1.8;ctx.beginPath();ctx.arc(hx-d*6,hy-hr-5,8,0,6.3);ctx.fill();ctx.stroke();
  poly([[-15,6],[-16,-8],[-9,-17],[6,-18],[15,-10],[14,-2],[6,-9],[-4,-9],[-10,-3],[-12,8]],L.hair,hx,hy);
  seg([hx-d*2,hy-hr-10],[hx-d*16,hy-hr+2],2.5,L.hb);ctx.fillStyle=C(L.belt);ctx.beginPath();ctx.arc(hx-d*2,hy-hr-10,3,0,6.3);ctx.fill()
 }else if(li===11){ // 機：頭盔、發光護目鏡、天線
  poly([[-16,6],[-17,-10],[-9,-19],[8,-19],[16,-10],[16,-2],[-14,-2]],L.top,hx,hy);
  ctx.fillStyle=C('#14161c');ctx.strokeStyle=OUT;ctx.lineWidth=1.5;ctx.beginPath();ctx.rect(hx+d*(d>0?-2:-15),hy-7,15,6);ctx.fill();ctx.stroke();
  if(!fl){glow(hx+d*6,hy-4,10,L.hb,.8);ctx.fillStyle=L.hb;ctx.fillRect(hx+d*(d>0?0:-13),hy-6,13,3)}
  seg([hx-d*8,hy-18],[hx-d*12,hy-30],2,L.top2);ctx.fillStyle=C(L.hb);ctx.beginPath();ctx.arc(hx-d*12,hy-31,2.5,0,6.3);ctx.fill()
  }else if(li===12){ // 刃：武士髮髻、紅頭帶
  poly([[-14,2],[-15,-10],[-7,-17],[8,-17],[15,-9],[14,-3],[7,-9],[-8,-9]],L.hair,hx,hy);
  ctx.fillStyle=C(L.hair);ctx.strokeStyle=OUT;ctx.lineWidth=1.6;ctx.beginPath();ctx.ellipse(hx-d*8,hy-hr-2,7,4,-.3*d,0,6.3);ctx.fill();ctx.stroke();
  seg([hx-d*14,hy-6],[hx+d*14,hy-6],3.5,L.hb);const tw=Math.sin(G.frame*.25)*3;seg([hx-d*14,hy-6],[hx-d*(26+tw),hy+2+tw*.5],3,L.hb)
 }else if(li===13){ // 巫：羽毛面具、白髮
  poly([[-15,8],[-17,-6],[-10,-16],[6,-17],[14,-10],[14,-2],[6,-8],[-8,-6],[-12,10]],L.hair,hx,hy);
  for(const[o,h,c]of[[-8,22,'#2a9d8f'],[-2,26,'#e9c46a'],[4,22,'#e76f51']]){ctx.fillStyle=C(c);ctx.strokeStyle=OUT;ctx.lineWidth=1.3;ctx.beginPath();ctx.ellipse(hx+d*o,hy-16-h/2,3,h/2,o*.04*d,0,6.3);ctx.fill();ctx.stroke()}
  ctx.fillStyle=C('#f4f1de');ctx.strokeStyle=OUT;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(hx-d*4,hy-11);ctx.lineTo(hx+d*(hr+2),hy-11);ctx.lineTo(hx+d*(hr-1),hy+1);ctx.lineTo(hx+d*2,hy+2);ctx.closePath();ctx.fill();ctx.stroke()
 }else if(li===14){ // 獸：蓬亂鬃毛
  poly([[-12,10],[-28,4],[-18,-2],[-32,-12],[-14,-12],[-24,-26],[-4,-20],[2,-30],[8,-18],[18,-22],[15,-10],[18,-4],[8,-9],[-8,-8]],L.hair,hx,hy);
  seg([hx-d*14,hy-7],[hx+d*13,hy-7],3,L.hb)
 }else if(li===15){ // 羽：兜帽、羽毛
  poly([[-17,10],[-18,-8],[-10,-19],[6,-20],[16,-11],[16,-1],[9,-8],[-6,-8],[-12,12]],L.top,hx,hy);
  ctx.fillStyle=C(L.hb);ctx.strokeStyle=OUT;ctx.lineWidth=1.3;ctx.beginPath();ctx.ellipse(hx-d*14,hy-20,3,11,-.6*d,0,6.3);ctx.fill();ctx.stroke()
 }else if(li===7){ // 月：短髮、額頭月紋頭帶
  poly([[-14,-2],[-14,-10],[-7,-16],[7,-16],[14,-9],[13,-4],[7,-9],[-8,-9]],L.hair,hx,hy);
  seg([hx-d*14,hy-6],[hx+d*14,hy-6],4,L.hb);
  if(!fl){ctx.strokeStyle='#fff4d6';ctx.lineWidth=2;ctx.beginPath();ctx.arc(hx+d*5,hy-6,3,-1.2*d+(d<0?Math.PI:0),1.2*d+(d<0?Math.PI:0),d<0);ctx.stroke()}
 }
 if(!fl){
  const ex=hx+d*(li===2?9:7),ey=hy-1;
  if(ko){ctx.strokeStyle='#111';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(ex-3,ey-3);ctx.lineTo(ex+3,ey+3);ctx.moveTo(ex+3,ey-3);ctx.lineTo(ex-3,ey+3);ctx.stroke()}
  else if(hit){ctx.strokeStyle='#111';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ex-d*3,ey-3);ctx.lineTo(ex+d*2,ey);ctx.lineTo(ex-d*3,ey+3);ctx.stroke()}
  else if(li===2){glow(ex,ey,9,'#e3ccff',.7);ctx.save();ctx.fillStyle='#f3e8ff';ctx.beginPath();ctx.ellipse(ex,ey,3.6,2.1,0,0,6.3);ctx.fill();ctx.restore()}
  else if(li!==11){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(ex,ey,3.6,4.2,0,0,6.3);ctx.fill();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(ex+d*1.4,ey,1.9,0,6.3);ctx.fill();ctx.strokeStyle='#111';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ex-d*4,ey-6-(f.st==='atk'?1:0));ctx.lineTo(ex+d*5,ey-4-(f.st==='atk'?3:0));ctx.stroke()}
  if(li!==2&&li!==9&&li!==11&&li!==13&&!ko){const mx=hx+d*8,my=hy+7;ctx.fillStyle='#7a1f1f';ctx.strokeStyle='#111';ctx.lineWidth=1.5;if(hit||f.st==='atk'){ctx.beginPath();ctx.ellipse(mx,my,3,hit?3.2:2.4,0,0,6.3);ctx.fill();ctx.stroke()}else{ctx.beginPath();ctx.moveTo(mx-3,my);ctx.lineTo(mx+3,my);ctx.stroke()}}
 }
 if(li===4&&!fl&&!(f.st==='ko'||f.st==='down'))poly([[-8,3],[-2,13],[8,16],[15,10],[16,3],[11,8],[4,9],[-2,7]],'#2a2018',hx,hy);
 // 肩甲(鋼)
 if(li===1){const px=SHl[0],py=sh+3;let fs2=C(L.top2);if(!fl){fs2=ctx.createRadialGradient(px-4,py-5,1,px,py,12);fs2.addColorStop(0,shade(L.top2,.45));fs2.addColorStop(.6,L.top2);fs2.addColorStop(1,shade(L.top2,-.3))}ctx.fillStyle=fs2;ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,11,0,6.3);ctx.fill();ctx.stroke();if(!fl){ctx.strokeStyle=shade(L.top2,-.4);ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(px,py,7.5,Math.PI*.9,Math.PI*2.1);ctx.stroke();ctx.fillStyle='#eef4ff';for(const q of[-1,1]){ctx.beginPath();ctx.arc(px+q*6,py+4,1.3,0,6.3);ctx.fill()}}}
 // 前側手
 if(ch.blade&&!f.tint){const B=R(fh),E0=R([ln+3,sh+3]);let ux=B[0]-E0[0],uy=B[1]-E0[1];const l=Math.hypot(ux,uy)||1;ux/=l;uy/=l;const tip=[B[0]+ux*50+d*4,B[1]+uy*50-22];
  ctx.lineCap='round';ctx.strokeStyle=OUT;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(B[0],B[1]);ctx.lineTo(tip[0],tip[1]);ctx.stroke();ctx.strokeStyle=C('#e8eef8');ctx.lineWidth=2.6;ctx.stroke();if(dt){ctx.strokeStyle='#ffffff';ctx.lineWidth=1;ctx.stroke()}
  ctx.strokeStyle=OUT;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(B[0]-ux*10,B[1]-uy*10);ctx.lineTo(B[0],B[1]);ctx.stroke();ctx.strokeStyle=C('#2b1d14');ctx.lineWidth=3.5;ctx.stroke();ctx.fillStyle=C('#ffd166');ctx.beginPath();ctx.arc(B[0]+ux*2,B[1]+uy*2,3.2,0,6.3);ctx.fill()}
 if(ch.staff){const A=R(bh),B=R(fh);let ux=B[0]-A[0],uy=B[1]-A[1];const l=Math.hypot(ux,uy);if(l<6){ux=d;uy=0}else{ux/=l;uy/=l}
  const tip=[B[0]+ux*(52+stR),B[1]+uy*(52+stR)],but=[A[0]-ux*30,A[1]-uy*30];ctx.lineCap='round';ctx.beginPath();ctx.moveTo(but[0],but[1]);ctx.lineTo(tip[0],tip[1]);
  ctx.strokeStyle=OUT;ctx.lineWidth=7.5;ctx.stroke();ctx.strokeStyle=C('#8a5a2a');ctx.lineWidth=4.5;ctx.stroke();if(dt){ctx.strokeStyle='#c08a4a';ctx.lineWidth=1.4;ctx.stroke()}
  for(const q of[tip,but]){ctx.fillStyle=C(L.hb);ctx.strokeStyle=OUT;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(q[0],q[1],3.8,0,6.3);ctx.fill();ctx.stroke()}}
 arm(3,fh);
 if(li===10&&!f.tint){const H=R(fh);fan(H[0]+d*4,H[1]-4,15,d>0?-.2:Math.PI+.2,C(L.top),C(L.top2))} // 蝶拿著扇子
 ctx.restore();
 // 中毒：冒綠色泡泡；強化：火焰光環
 if(f.pz>0&&!f.tint){ctx.save();for(let k=0;k<3;k++){const yy=f.y-70-((G.frame*1.4+k*24)%70),xx=f.x+Math.sin(G.frame*.1+k*2)*14;ctx.globalAlpha=.75;ctx.fillStyle='#a3e635';ctx.strokeStyle='#2f3b1f';ctx.lineWidth=1;ctx.beginPath();ctx.arc(xx,yy,3+k,0,6.3);ctx.fill();ctx.stroke()}ctx.restore()}
 if(f.wk>0&&!f.tint){ctx.save();ctx.strokeStyle='rgba(199,125,255,.8)';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.lineDashOffset=G.frame;ctx.beginPath();ctx.ellipse(f.x,f.y-2,30,8,0,0,6.3);ctx.stroke();ctx.restore()}
 if(f.sl>0&&!f.tint){ctx.save();ctx.strokeStyle='rgba(67,97,238,.85)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(f.x,f.y-4,24,6,0,0,6.3);ctx.stroke();ctx.restore()}
 if(ch.rg&&f.hp<ch.hp*(f.hm||1)*.35&&f.st!=='ko'&&!f.tint)glow(f.x,f.y-60,74+Math.sin(G.frame*.5)*8,'#c1121f',.35); // 狂暴
 if(f.pw>0&&!f.tint)glow(f.x,f.y-60,80+Math.sin(G.frame*.4)*8,colOf(f),.35);
 // 攻擊揮動軌跡
 const T=f.tr||(f.tr=[]);
 if(G.phase==='intro')T.length=0;
 if(f.lt!==G.frame){f.lt=G.frame;if(trk)T.push(trk);else if(T.length)T.shift();if(T.length>7)T.shift()}
 if(T.length>1){ctx.save();ctx.lineCap='round';for(let i=1;i<T.length;i++){const al=i/T.length;ctx.beginPath();ctx.moveTo(T[i-1][0],T[i-1][1]);ctx.lineTo(T[i][0],T[i][1]);ctx.globalCompositeOperation='lighter';ctx.strokeStyle=CC;ctx.globalAlpha=al*.3;ctx.lineWidth=(2+i*1.6)*2.6;ctx.stroke();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=al*.75;ctx.strokeStyle=CC2;ctx.lineWidth=2+i*1.6;ctx.stroke()}ctx.restore()}
 if(f.st==='dash'&&!f.tint){ctx.save();ctx.fillStyle=CC2;for(let i=0;i<4;i++){ctx.globalAlpha=.32-i*.07;ctx.fillRect(f.x-f.dd*(22+i*16)-(f.dd>0?36:0),f.y-100+i*24,36,3)}ctx.restore()}
}
function hud(){
 [p1,p2].forEach((f,k)=>{
  const w=380,x=k?W-40-w:40,y=34,h=24,mh=f.ch.hp*(f.hm||1),r=f.hp/mh,lr=f.lag/mh;
  const bw=v=>w*Math.max(0,v),bx=v=>k?x+w-bw(v):x;
  ctx.fillStyle='#000a';ctx.fillRect(x-3,y-3,w+6,h+6);
  ctx.fillStyle='#fff';ctx.fillRect(bx(lr),y,bw(lr),h);
  ctx.fillStyle=r>.5?'#3ddc6a':r>.25?'#ffd23d':'#ff4040';ctx.fillRect(bx(r),y,bw(r),h);
  const mw=w*.6,mx=k?x+w-mw:x,my=y+h+10,fl=G.frame%16<8;
  ctx.fillStyle='#000a';ctx.fillRect(mx-2,my-2,mw+4,14);
  ctx.fillStyle=f.mt>=100?(fl?'#fff27a':'#ff9d2e'):f.mt>=50?(fl?'#ffb347':'#ff8a2e'):'#4dd2ff';const mbw=mw*f.mt/100;ctx.fillRect(k?mx+mw-mbw:mx,my,mbw,10);
  ctx.fillStyle='#fff8';ctx.fillRect(mx+mw/2-1,my,2,10);
  ctx.font='bold 18px '+FONT;ctx.textAlign=k?'right':'left';ctx.fillStyle='#fff';
  ctx.fillText((k?(G.mode===1?'電腦 ':G.mode===3?'木樁 ':'P2 '):'P1 ')+f.ch.n+(G.mode===4&&k===NET.slot?'（你）':''),k?x+w:x,24);
  for(let j=0;j<2;j++){ctx.fillStyle=j<f.wins?'#ffe14d':'#fff3';ctx.beginPath();ctx.arc(k?x+w-8-j*20:x+8+j*20,my+30,7,0,6.3);ctx.fill()}
  const o=k?p1:p2;
  if(o.combo>=2){ctx.font='900 34px '+FONT;ctx.fillStyle='#ffe14d';ctx.strokeStyle='#000';ctx.lineWidth=5;const t=o.combo+' HIT! '+Math.round(o.cd);ctx.strokeText(t,k?x+w:x,150);ctx.fillText(t,k?x+w:x,150)}
 });
 ctx.textAlign='center';ctx.font='900 44px '+FONT;ctx.fillStyle='#fff';ctx.strokeStyle='#000';ctx.lineWidth=6;
 const t=G.mode===3?'∞':String(Math.max(0,G.time));ctx.strokeText(t,W/2,64);ctx.fillText(t,W/2,64);
}
function amb(){const t=performance.now(),s=G.stage;ctx.save();for(let i=0;i<46;i++){const k=1+i%3;let x,y;
 if(s===0){x=(i*131+t*.03*k)%W;y=(t*.45*k+i*47)%GY;ctx.fillStyle='rgba(180,200,255,.3)';ctx.fillRect(x,y,1,8+k*4)}
 else if(s===1){x=(i*131+Math.sin(t*.001+i)*30+W)%W;y=GY-((t*.03*k+i*47)%GY);ctx.fillStyle='rgba(255,'+(140+i*2)+',80,.7)';ctx.fillRect(x,y,k,k)}
 else if(s===2){x=(i*131+Math.sin(t*.0012+i)*40+W)%W;y=(t*.04*k+i*47)%GY;ctx.fillStyle='rgba(255,255,255,.75)';ctx.fillRect(x,y,k,k)}
 else if(s===3){x=(i*131+Math.sin(t*.002+i)*24+W)%W;y=GY-((t*.06*k+i*53)%GY);ctx.fillStyle=i%3?'rgba(255,140,40,.8)':'rgba(255,220,120,.9)';ctx.fillRect(x,y,k+.5,k+.5)}
 else{x=(i*131+Math.sin(t*.0015+i)*60+W)%W;y=(t*.035*k+i*47)%GY;ctx.save();ctx.translate(x,y);ctx.rotate(t*.002*k+i);ctx.fillStyle=i%2?'rgba(140,200,110,.75)':'rgba(200,230,140,.7)';ctx.beginPath();ctx.ellipse(0,0,5+k,1.8,0,0,6.3);ctx.fill();ctx.restore()}}ctx.restore()}
function draw(){
 ctx.setTransform(RS,0,0,RS,0,0);ctx.imageSmoothingQuality='high';
 ctx.save();
 if(G.shake>.5)ctx.translate((Math.random()-.5)*G.shake,(Math.random()-.5)*G.shake);
 const z=G.cam.z,l=Math.max(0,Math.min(W-W/z,G.cam.cx-W/(2*z)));
 ctx.scale(z,z);ctx.translate(-l,-(H-H/z));
 ctx.drawImage(bg,0,0,W,H);amb();
 if(p1&&qHigh())reflect();
 if(p1){
  [p1,p2].sort((a,b)=>(b.st==='ko'||b.st==='down')-(a.st==='ko'||a.st==='down')).forEach(drawF);
  for(const p of projs)drawProj(p);
  drawParts(parts);
  ctx.globalAlpha=1;
  if(G.hb)drawBoxes();
  if(G.win>=0&&(G.phase==='over'||(G.phase==='ko'&&G.pt<100))){const wf=G.win?p2:p1;if(wf.st==='win')quote(wf)}
 }
 ctx.restore();
 if(p1&&qHigh())postFx();
 if(p1)hud();
 if(p1&&G.mode===3&&G.phase!=='menu'){if(TUT)tutHud();else trainHud()}
 overlayDraw();
 const now=performance.now();
 if(G.vs>0&&G.phase!=='menu')vsScreen();
 if(G.mt>0&&G.phase!=='menu'&&!(G.vs>0)){
  const el=G.mm-G.mt,pop=1+Math.max(0,12-el)/12*.6,al=Math.min(1,G.mt/12);
  ctx.save();ctx.globalAlpha=al;ctx.translate(W/2,G.phase==='over'?168:H/2-20);ctx.scale(pop*(G.phase==='over'?.6:1),pop*(G.phase==='over'?.6:1));ctx.font='900 76px '+FONT;ctx.textAlign='center';ctx.lineWidth=9;ctx.strokeStyle='#000';ctx.lineJoin='round';ctx.strokeText(G.msg,0,0);ctx.fillStyle='#ffe14d';ctx.fillText(G.msg,0,0);ctx.restore();
 }
 if(now<G.supEnd)supCine((G.supEnd-now)/850);
 if(G.mode===4&&NET.on&&G.phase!=='menu'){
  ctx.save();ctx.textAlign='right';ctx.font='12px '+FONT;ctx.fillStyle=NET.desync?'#ff6b6b':'#ffffffaa';ctx.fillText('延遲 '+Math.round(NET.rtt)+'ms・輸入延遲 '+(NET.DL|0)+' 幀'+(NET.via==='relay'?'・經由中繼':'')+(NET.desync?'　⚠ 狀態不同步，重新同步中…':performance.now()-NET.rsT<2500?'　✔ 已重新同步':''),W-12,H-10);
  ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle='#000';ctx.fillStyle='#fff';ctx.font='bold 28px '+FONT;
  const st=NET.stallT?performance.now()-NET.stallT:0,tx=NET.gone?'對手已離開':st>8000?'連線中斷，按 Esc 離開':st>500?'等待對手…':'';
  if(tx){ctx.strokeText(tx,W/2,H/2+90);ctx.fillText(tx,W/2,H/2+90)}ctx.restore()}
 if(G.phase==='over'){ctx.textAlign='center';ctx.font='bold 24px '+FONT;ctx.fillStyle='#fff';ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(0,H-58,W,40);ctx.fillStyle='#fff';ctx.fillText(G.mode===4?(NET.reL?(NET.reR?'準備開始…':'已送出再戰邀請，等待對手…'):(NET.reR?'對手想再戰一局！按 Enter 接受　Esc 離開':'按 Enter 再戰一局　Esc 離開')):ARC?arcTip():'按 Enter 或點擊畫面回到選單',W/2,H-30)}
 if(G.pause)pauseScreen();
}

