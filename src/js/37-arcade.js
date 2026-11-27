// ===== 原創街機格鬥畫風：斜切血條、底部分段氣槽、回合字樣、衝擊星芒、人群與視差背景 =====
const para=(x0,x1,y,h,s)=>{ctx.beginPath();ctx.moveTo(x0+s,y);ctx.lineTo(x1+s,y);ctx.lineTo(x1,y+h);ctx.lineTo(x0,y+h);ctx.closePath()};
const vgrad=(y,h,cs)=>{const g=ctx.createLinearGradient(0,y,0,y+h);cs.forEach((c,i)=>g.addColorStop(i/(cs.length-1),c));return g};
const GOLD='#d9a640';
// 手機橫放時按鈕疊在畫面下方，超必殺槽改放到血條下面
const PADQ=window.matchMedia?matchMedia('(pointer:coarse) and (orientation:landscape)'):{matches:false};
function artHud(){
 const BW=336,BH=22,Y=30,S=12,XR=W/2-54,XL=XR-BW,fl=!CALM&&G.frame%16<8;
 [p1,p2].forEach((f,k)=>{
  const mh=f.ch.hp*(f.hm||1),r=Math.max(0,f.hp/mh),lr=Math.max(0,f.lag/mh),li=Math.max(0,CH.indexOf(f.ch));
  ctx.save();if(k){ctx.translate(W,0);ctx.scale(-1,1)}
  // 血條外框
  para(XL-4,XR+4,Y-4,BH+8,S);ctx.fillStyle='#07070f';ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.stroke();
  para(XL,XR,Y,BH,S);ctx.fillStyle='#2a0a10';ctx.fill();ctx.save();ctx.clip();
  ctx.fillStyle='#e02a2a';ctx.fillRect(XR-BW*lr,Y,BW*lr+S,BH);
  const low=r<.3;ctx.fillStyle=vgrad(Y,BH,low?(fl?['#ffd0b0','#ff5a3a','#b01a10']:['#ffb090','#e8402a','#901008']):['#fff6a8','#ffd21a','#e08a00']);ctx.fillRect(XR-BW*r,Y,BW*r+S,BH);
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(XL,Y+2,BW+S,3);ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(XL,Y+BH-5,BW+S,5);
  ctx.restore();
  // 防禦耐久
  {const gw=BW*.5,gr=Math.max(0,f.gd??100)/100;para(XR-gw,XR,Y+BH+6,6,-4);ctx.fillStyle='#000a';ctx.fill();para(XR-gw*gr,XR,Y+BH+6,6,-4);ctx.fillStyle=gr<.35?(fl?'#ff6b6b':'#ff9f9f'):'#7ec8ff';ctx.fill()}
  // 頭像
  {const bx=XL-76,by=Y-14,bw=66,bh=56;para(bx,bx+bw,by,bh,8);ctx.fillStyle=vgrad(by,bh,[f.ch.col+'cc','#0b0b1e']);ctx.fill();ctx.save();ctx.clip();if(HEAD[li])ctx.drawImage(HEAD[li],bx-10,by-8,bw+24,bw+24);ctx.restore();para(bx,bx+bw,by,bh,8);ctx.strokeStyle=GOLD;ctx.lineWidth=2.5;ctx.stroke()}
  // 勝場徽章
  for(let j=0;j<(G.ft||2);j++){const cx=XR-12-j*22,cy=Y+BH+24;ctx.beginPath();ctx.moveTo(cx,cy-8);ctx.lineTo(cx+8,cy);ctx.lineTo(cx,cy+8);ctx.lineTo(cx-8,cy);ctx.closePath();ctx.fillStyle=j<f.wins?'#ffe14d':'#1a1a2a';ctx.fill();ctx.strokeStyle=j<f.wins?'#fff':'#555';ctx.lineWidth=1.5;ctx.stroke()}
  // 底部超必殺槽（每 50 一格）
  {const lv=Math.floor(f.mt/50),top=PADQ.matches,bx=top?XL-62:26,by=top?Y+BH+42:H-34,sw=top?92:112;
   ctx.font='italic 900 26px '+FONT;ctx.textAlign='center';ctx.save();if(k){ctx.translate(bx+22,0);ctx.scale(-1,1);ctx.translate(-bx-22,0)}ctx.lineWidth=5;ctx.strokeStyle='#000';ctx.strokeText(lv,bx+22,by+20);ctx.fillStyle=vgrad(by,22,lv?['#fff6a8','#ff9d2e']:['#cfe6ff','#4d7bff']);ctx.fillText(lv,bx+22,by+20);ctx.font='bold 9px '+FONT;ctx.fillStyle='#fff';ctx.fillText('LV',bx+22,by-2);ctx.restore();
   for(let j=0;j<2;j++){const x0=bx+46+j*(sw+8),v=Math.max(0,Math.min(1,(f.mt-50*j)/50));para(x0-3,x0+sw+3,by-3,20,6);ctx.fillStyle='#07070f';ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.stroke();
    para(x0,x0+sw*v,by,14,5);ctx.fillStyle=v>=1?vgrad(by,14,fl?['#ffffff','#ffe14d','#ff8a2e']:['#fff6a8','#ffb020','#e06a10']):vgrad(by,14,['#bff6ff','#3fb0ff','#1f50c0']);ctx.fill()}}
  ctx.restore();
  // 文字（不鏡像）
  const tx=k?W-(XL+14):XL+14;ctx.save();ctx.textAlign=k?'right':'left';ctx.font='italic 900 19px '+FONT;ctx.lineWidth=5;ctx.strokeStyle='#000';ctx.lineJoin='round';
  const nm=(k?(G.mode===1?'CPU ':G.mode===3?'木樁 ':'P2 '):'P1 ')+f.ch.n+(f.sty?'・'+STY[CH.indexOf(f.ch)].n:'')+(G.mode===4&&k===NET.slot?'（你）':'')+(f.sm?'　簡易':'')+(k&&G.mode===1&&!RP&&f.ai.pt?'　'+PTN[f.ai.pt]:'');ctx.strokeText(nm,tx,Y+BH+26);ctx.fillStyle='#fff';ctx.fillText(nm,tx,Y+BH+26);
  {const bx2=k?W-(XR-BW*.5-18):XR-BW*.5-18,by2=Y+BH+9;ctx.beginPath();ctx.arc(bx2,by2,8,0,6.3);ctx.fillStyle=f.bu?'#ff4d6d':'#333a';ctx.fill();ctx.strokeStyle=f.bu?'#ffe14d':'#555';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=f.bu?'#fff':'#777';ctx.font='bold 10px '+FONT;ctx.textAlign='center';ctx.fillText('爆',bx2,by2+4);dashIcon(k?bx2+22:bx2-22,by2,f)}
  // 連段數
  const o=k?p1:p2;if(o.combo>=2){const cx=k?W-40:40,el=Math.min(1,(G.frame%1000)),sz=46;ctx.save();ctx.translate(cx,180);ctx.transform(1,0,-.2,1,0,0);ctx.textAlign=k?'right':'left';ctx.font='italic 900 '+sz+'px '+FONT;ctx.lineWidth=8;ctx.strokeStyle='#000';ctx.strokeText(o.combo,0,0);ctx.fillStyle=vgrad(-sz,sz,['#fff6a8','#ffb020','#e04010']);ctx.fillText(o.combo,0,0);
   const w0=ctx.measureText(String(o.combo)).width;ctx.font='italic 900 22px '+FONT;const hx=k?-w0-6:w0+6;ctx.strokeStyle='#000';ctx.lineWidth=5;ctx.strokeText('HITS',hx,0);ctx.fillStyle='#fff';ctx.fillText('HITS',hx,0);ctx.font='bold 14px '+FONT;ctx.strokeText(Math.round(o.cd)+' DMG',0,22);ctx.fillStyle='#ffd27a';ctx.fillText(Math.round(o.cd)+' DMG',0,22);ctx.restore()}
  ctx.restore();
 });
 // 計時器
 {const x0=W/2-44,x1=W/2+44,y0=16,y1=74;ctx.beginPath();ctx.moveTo(x0-6,y0);ctx.lineTo(x1+6,y0);ctx.lineTo(x1-4,y1);ctx.lineTo(x0+4,y1);ctx.closePath();ctx.fillStyle=vgrad(y0,y1-y0,['#1a1a30','#07070f']);ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=2.5;ctx.stroke();
  const t=G.mode===3?'∞':String(Math.max(0,G.time));ctx.textAlign='center';ctx.font='900 46px '+FONT;ctx.lineWidth=6;ctx.strokeStyle='#000';ctx.strokeText(t,W/2,64);ctx.fillStyle=vgrad(26,40,G.time<=10&&G.mode!==3&&(CALM||G.frame%20<10)?['#ffd0d0','#ff4040']:['#ffffff','#ffd27a']);ctx.fillText(t,W/2,64)}
}
// 衝刺冷卻圖示：冷卻中顯示剩餘時間的圓環
function dashIcon(x,y,f){const c=f.dcd>0,r=c?f.dcd/(f.dcm||1):0;ctx.save();ctx.beginPath();ctx.arc(x,y,8,0,6.3);ctx.fillStyle=c?'#333a':'#2a7fffcc';ctx.fill();if(c){ctx.beginPath();ctx.moveTo(x,y);ctx.arc(x,y,8,-Math.PI/2,-Math.PI/2+6.283*r);ctx.closePath();ctx.fillStyle='#0009';ctx.fill()}ctx.strokeStyle=c?'#555':'#7fe3ff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,8,0,6.3);ctx.stroke();ctx.fillStyle=c?'#888':'#fff';ctx.font='bold 10px '+FONT;ctx.textAlign='center';ctx.fillText('衝',x,y+4);ctx.restore()}
// 回合字樣：斜體、漸層、粗黑邊，從側邊滑入並帶一條橫幅
function arcMsg(el,al){
 const ov=G.phase==='over',sc=ov?.62:1,slide=Math.max(0,8-el)/8,msg=G.msg;
 ctx.save();ctx.globalAlpha=al;ctx.translate(W/2-slide*W*.6,ov?168:H/2-20);ctx.scale(sc,sc);
 ctx.fillStyle='rgba(0,0,0,.55)';ctx.beginPath();ctx.moveTo(-W,-62);ctx.lineTo(W,-62);ctx.lineTo(W,26);ctx.lineTo(-W,26);ctx.fill();ctx.fillStyle=GOLD;ctx.fillRect(-W,-62,W*2,3);ctx.fillRect(-W,23,W*2,3);
 ctx.transform(1,0,-.22,1,0,0);const big=msg.length<=8,sz=big?92:64;ctx.font='italic 900 '+sz+'px '+FONT;ctx.textAlign='center';ctx.lineJoin='round';
 ctx.lineWidth=16;ctx.strokeStyle='#120400';ctx.strokeText(msg,0,0);ctx.lineWidth=7;ctx.strokeStyle='#fff3d0';ctx.strokeText(msg,0,0);
 ctx.fillStyle=vgrad(-sz*.8,sz*.85,['#fffbe0','#ffd21a','#ff8a1a','#c0200a']);ctx.fillText(msg,0,0);
 if(el<10){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=al*(1-el/10);ctx.fillStyle='#fff';ctx.fillText(msg,0,0)}
 ctx.restore()}
// 衝擊星芒：尖銳多角星＋白色核心＋速度線
function impact(x,y,c,big,dir){if(NOFX)return;const n=big?12:9,k=[];for(let i=0;i<n;i++)k.push(.55+Math.random()*.45);P({t:'sb',x:x+dir*6,y,c,l:big?9:7,s:big?74:46,rot:Math.random()*6.28,k,g:0,dr:1});
 for(let i=0;i<(big?4:2);i++)slh(x+dir*rr_(0,20),y+rr_(-14,14),(dir>0?0:Math.PI)+rr_(-.35,.35),rr_(60,110),'#ffffff',7)}
function drawStar(p,al){const pr=1-al,R=p.s*(.5+.6*Math.min(1,pr*2.2))*(CALM?.6:1),n=p.k.length;if(CALM)al*=.5;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalCompositeOperation='lighter';
 const star=(rs,ri)=>{ctx.beginPath();for(let i=0;i<n*2;i++){const a=i/(n*2)*6.283,r=i%2?ri:rs*p.k[i>>1];i?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath()};
 ctx.globalAlpha=al;star(R,R*.3);ctx.fillStyle=p.c;ctx.fill();ctx.globalAlpha=Math.min(1,al*1.4);star(R*.62,R*.2);ctx.fillStyle='#ffffff';ctx.fill();ctx.restore()}
// 視差背景：天空與遠景比地面移動得慢
function bgDraw(l){
 if(!ART||!l){ctx.drawImage(bg,0,0,W,H);return}
 const rs=bg.width/W,gy=GY-4;ctx.drawImage(bg,0,0,bg.width,gy*rs,l*.35,0,W,gy);ctx.drawImage(bg,0,gy*rs,bg.width,bg.height-gy*rs,0,gy,W,H-gy)}
// 觀眾：剪影＋舞台色邊光，連段或重擊時歡呼
let CROWD=null;
function crowdDraw(l){
 if(!ART||!p1||G.stage===3||QM===3)return;
 if(!CROWD){CROWD=[];for(let i=0;i<44;i++)CROWD.push({x:-40+i*24+Math.random()*12,h:34+Math.random()*18,w:.85+Math.random()*.35,ph:Math.random()*6.3,c:Math.random()})}
 const S=STG[G.stage],hype=Math.min(1,G.shake/8+(Math.max(p1.combo,p2.combo)>=3?.6:0)+(G.phase==='ko'||G.phase==='over'?.8:0)),t=G.frame*.2,base=GY-1;
 ctx.save();ctx.translate(l*.12,0);
 ctx.fillStyle=S.b[1];ctx.globalAlpha=.9;
 for(const m of CROWD){const b=Math.abs(Math.sin(t*(1+hype)+m.ph))*(1.5+hype*7),x=m.x,y=base-m.h-b,s=m.w;
  ctx.beginPath();ctx.ellipse(x,y+m.h*.55,13*s,m.h*.5,0,Math.PI,0);ctx.rect(x-13*s,y+m.h*.55,26*s,m.h*.45+b);ctx.moveTo(x+7*s,y);ctx.arc(x,y,7*s,0,6.3);
  if(hype>.3&&m.c<.6){const up=Math.sin(t*2+m.ph)*3;ctx.rect(x-12*s,y-12+up,3.5,18);ctx.rect(x+9*s,y-14-up,3.5,18)}ctx.fill()}
 ctx.globalAlpha=.55;ctx.strokeStyle=S.l;ctx.lineWidth=1.5;ctx.beginPath();for(const m of CROWD){const b=Math.abs(Math.sin(t*(1+hype)+m.ph))*(1.5+hype*7),y=base-m.h-b;ctx.moveTo(m.x-6*m.w,y-3);ctx.arc(m.x,y,7*m.w,Math.PI*1.15,Math.PI*1.85)}ctx.stroke();
 if(hype>.4&&!NOFX){ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){if(Math.random()<.5){const m=CROWD[Math.random()*CROWD.length|0];ctx.globalAlpha=.8;ctx.drawImage(glowSpr('#ffffff'),m.x-10,base-m.h-30,20,20)}}}
 ctx.restore()}
function calmLabel(){$('calmbtn').textContent='閃光：'+(CALM?'減少':'正常')}
$('calmbtn').onclick=()=>{CALM=CALM?0:1;try{localStorage.setItem('fd_calm',CALM)}catch(e){}calmLabel();snd(600,.06)};calmLabel();
function artLabel(){$('artbtn').textContent='畫風：'+(ART?'街機':'經典');document.body.classList.toggle('art',!!ART)}
$('artbtn').onclick=()=>{ART=ART?0:1;OLW=ART?1.6:1;OUTX=ART?2.4:0;try{localStorage.setItem('fd_art',ART)}catch(e){}artLabel();if(typeof makeHeads==='function'&&G.phase==='menu'){makeHeads();if(typeof selUI==='function')selUI()}snd(600,.06)};artLabel();
// ---- 動作手感（只影響畫面）：預備動作、揮擊弧光、受擊擠壓、落地壓縮、鏡頭推近
// 起手前段先往後收、再甩出去；p＝起手進度 0～1，回傳伸展量（負數＝往後收）
const antic=p=>p<.4?-.22*Math.sin(p/.4*Math.PI/2):-.22+.92*Math.pow((p-.4)/.6,1.4);
// 動畫暫存放在 WeakMap，不掛在角色身上：快照會複製角色的所有欄位，掛上去會讓連線雙方的雜湊不同
const VIS=new WeakMap();
function squash(f){
 if(f.tint)return null;let v=VIS.get(f);if(!v){v={air:false,land:0,fr:-1};VIS.set(f,v)}
 if(v.fr!==G.frame){v.fr=G.frame;const air=f.y<GY-2;if(v.air&&!air)v.land=6;else if(v.land>0)v.land--;v.air=air}
 if(f.st==='hit'&&G.hitstop>0)return[1.08,.93];
 if(f.st==='atk'&&f.hit&&G.hitstop>0)return[1.04,.97];
 if(v.land>0){const k=v.land/6;return[1+.1*k,1-.12*k]}
 if(f.y<GY-2&&f.vy<-4)return[.95,1.06];
 return null}
// 揮擊弧光：從肩（或腰）到拳腳尖端的一道實心月牙
function smear(f,P,py,c){
 const sx=f.x,sy=f.y+py,dx=P[0]-sx,dy=P[1]-sy,r=Math.hypot(dx,dy);if(!(r>=30)||!isFinite(sx+sy+r))return;
 const a1=Math.atan2(dy,dx),sw=.9*(f.dir>0?-1:1),a0=a1+sw*(dy<0?-1:1);
 ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=CALM?.25:.5;
 const g=ctx.createRadialGradient(sx,sy,r*.55,sx,sy,r*1.05);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.7,c);g.addColorStop(1,'#ffffff');ctx.fillStyle=g;
 ctx.beginPath();ctx.arc(sx,sy,r*1.04,Math.min(a0,a1),Math.max(a0,a1));ctx.arc(sx,sy,r*.62,Math.max(a0,a1),Math.min(a0,a1),true);ctx.closePath();ctx.fill();ctx.restore()}
function camFocus(){
 const now=performance.now();
 if(now<G.supEnd&&G.supSide!==undefined){const f=G.supSide?p2:p1;return{z:1.38,x:f.x}}
 if(G.phase==='ko'&&G.pt>60){const l=p1.st==='ko'?p1:p2.st==='ko'?p2:null;if(l)return{z:1.3,x:l.x}}
 return null}
// 前景：畫面最下方兩側的剪影，移動得比地面快，增加景深（螢幕座標）
function fgDraw(){
 if(!ART||!p1||QM===3)return;const S=STG[G.stage],o=-(G.cam.cx-W/2)*.35,dk='#05040a';ctx.save();ctx.fillStyle=dk;ctx.strokeStyle=S.l;ctx.globalAlpha=.95;
 const st=G.stage;
 for(const k of[0,1]){const sx=(k?W-1:1),s=k?-1:1;ctx.save();ctx.translate(sx+o,H);ctx.scale(s,1);ctx.beginPath();
  if(st===0){ctx.rect(0,-46,150,46);ctx.rect(20,-70,10,24);ctx.rect(120,-70,10,24);ctx.rect(14,-74,122,6)}
  else if(st===1){ctx.rect(0,-34,170,34);ctx.moveTo(40,-34);ctx.arc(40,-46,14,Math.PI,0);ctx.rect(26,-46,28,12);ctx.moveTo(120,-34);ctx.arc(120,-44,11,Math.PI,0);ctx.rect(109,-44,22,10)}
  else if(st===2){ctx.moveTo(0,0);ctx.lineTo(0,-40);ctx.quadraticCurveTo(40,-62,80,-38);ctx.quadraticCurveTo(120,-50,160,-20);ctx.lineTo(170,0);ctx.closePath()}
  else if(st===3){ctx.moveTo(0,0);ctx.lineTo(0,-54);ctx.lineTo(36,-70);ctx.lineTo(70,-40);ctx.lineTo(110,-48);ctx.lineTo(150,-16);ctx.lineTo(160,0);ctx.closePath()}
  else{for(let i=0;i<9;i++){const x=i*18,h=30+((i*37)%28);ctx.moveTo(x,0);ctx.quadraticCurveTo(x+4,-h*.6,x+10+(i%2?6:-6),-h);ctx.quadraticCurveTo(x+8,-h*.5,x+14,0)}}
  ctx.fill();ctx.globalAlpha=.5;ctx.lineWidth=2;ctx.stroke();
  if(st===3){ctx.globalAlpha=.6+.3*Math.sin(G.frame*.1);ctx.strokeStyle='#ff6a2a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(20,-40);ctx.lineTo(44,-30);ctx.lineTo(60,-36);ctx.stroke()}
  ctx.restore()}
 ctx.restore()}
