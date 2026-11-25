// ===== 原創街機格鬥畫風：斜切血條、底部分段氣槽、回合字樣、衝擊星芒、人群與視差背景 =====
const para=(x0,x1,y,h,s)=>{ctx.beginPath();ctx.moveTo(x0+s,y);ctx.lineTo(x1+s,y);ctx.lineTo(x1,y+h);ctx.lineTo(x0,y+h);ctx.closePath()};
const vgrad=(y,h,cs)=>{const g=ctx.createLinearGradient(0,y,0,y+h);cs.forEach((c,i)=>g.addColorStop(i/(cs.length-1),c));return g};
const GOLD='#d9a640';
function artHud(){
 const BW=336,BH=22,Y=30,S=12,XR=W/2-54,XL=XR-BW,fl=G.frame%16<8;
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
  {const lv=Math.floor(f.mt/50),bx=26,by=H-34,sw=112;
   ctx.font='italic 900 26px '+FONT;ctx.textAlign='center';ctx.save();if(k){ctx.translate(bx+22,0);ctx.scale(-1,1);ctx.translate(-bx-22,0)}ctx.lineWidth=5;ctx.strokeStyle='#000';ctx.strokeText(lv,bx+22,by+20);ctx.fillStyle=vgrad(by,22,lv?['#fff6a8','#ff9d2e']:['#cfe6ff','#4d7bff']);ctx.fillText(lv,bx+22,by+20);ctx.font='bold 9px '+FONT;ctx.fillStyle='#fff';ctx.fillText('LV',bx+22,by-2);ctx.restore();
   for(let j=0;j<2;j++){const x0=bx+46+j*(sw+8),v=Math.max(0,Math.min(1,(f.mt-50*j)/50));para(x0-3,x0+sw+3,by-3,20,6);ctx.fillStyle='#07070f';ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.stroke();
    para(x0,x0+sw*v,by,14,5);ctx.fillStyle=v>=1?vgrad(by,14,fl?['#ffffff','#ffe14d','#ff8a2e']:['#fff6a8','#ffb020','#e06a10']):vgrad(by,14,['#bff6ff','#3fb0ff','#1f50c0']);ctx.fill()}}
  ctx.restore();
  // 文字（不鏡像）
  const tx=k?W-(XL+14):XL+14;ctx.save();ctx.textAlign=k?'right':'left';ctx.font='italic 900 19px '+FONT;ctx.lineWidth=5;ctx.strokeStyle='#000';ctx.lineJoin='round';
  const nm=(k?(G.mode===1?'CPU ':G.mode===3?'木樁 ':'P2 '):'P1 ')+f.ch.n+(G.mode===4&&k===NET.slot?'（你）':'')+(f.sm?'　簡易':'');ctx.strokeText(nm,tx,Y+BH+26);ctx.fillStyle='#fff';ctx.fillText(nm,tx,Y+BH+26);
  {const bx2=k?W-(XR-BW*.5-18):XR-BW*.5-18,by2=Y+BH+9;ctx.beginPath();ctx.arc(bx2,by2,8,0,6.3);ctx.fillStyle=f.bu?'#ff4d6d':'#333a';ctx.fill();ctx.strokeStyle=f.bu?'#ffe14d':'#555';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=f.bu?'#fff':'#777';ctx.font='bold 10px '+FONT;ctx.textAlign='center';ctx.fillText('爆',bx2,by2+4)}
  // 連段數
  const o=k?p1:p2;if(o.combo>=2){const cx=k?W-40:40,el=Math.min(1,(G.frame%1000)),sz=46;ctx.save();ctx.translate(cx,180);ctx.transform(1,0,-.2,1,0,0);ctx.textAlign=k?'right':'left';ctx.font='italic 900 '+sz+'px '+FONT;ctx.lineWidth=8;ctx.strokeStyle='#000';ctx.strokeText(o.combo,0,0);ctx.fillStyle=vgrad(-sz,sz,['#fff6a8','#ffb020','#e04010']);ctx.fillText(o.combo,0,0);
   const w0=ctx.measureText(String(o.combo)).width;ctx.font='italic 900 22px '+FONT;const hx=k?-w0-6:w0+6;ctx.strokeStyle='#000';ctx.lineWidth=5;ctx.strokeText('HITS',hx,0);ctx.fillStyle='#fff';ctx.fillText('HITS',hx,0);ctx.font='bold 14px '+FONT;ctx.strokeText(Math.round(o.cd)+' DMG',0,22);ctx.fillStyle='#ffd27a';ctx.fillText(Math.round(o.cd)+' DMG',0,22);ctx.restore()}
  ctx.restore();
 });
 // 計時器
 {const x0=W/2-44,x1=W/2+44,y0=16,y1=74;ctx.beginPath();ctx.moveTo(x0-6,y0);ctx.lineTo(x1+6,y0);ctx.lineTo(x1-4,y1);ctx.lineTo(x0+4,y1);ctx.closePath();ctx.fillStyle=vgrad(y0,y1-y0,['#1a1a30','#07070f']);ctx.fill();ctx.strokeStyle=GOLD;ctx.lineWidth=2.5;ctx.stroke();
  const t=G.mode===3?'∞':String(Math.max(0,G.time));ctx.textAlign='center';ctx.font='900 46px '+FONT;ctx.lineWidth=6;ctx.strokeStyle='#000';ctx.strokeText(t,W/2,64);ctx.fillStyle=vgrad(26,40,G.time<=10&&G.mode!==3&&G.frame%20<10?['#ffd0d0','#ff4040']:['#ffffff','#ffd27a']);ctx.fillText(t,W/2,64)}
}
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
function drawStar(p,al){const pr=1-al,R=p.s*(.5+.6*Math.min(1,pr*2.2)),n=p.k.length;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalCompositeOperation='lighter';
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
function artLabel(){$('artbtn').textContent='畫風：'+(ART?'街機':'經典')}
$('artbtn').onclick=()=>{ART=ART?0:1;OLW=ART?1.6:1;OUTX=ART?2.4:0;try{localStorage.setItem('fd_art',ART)}catch(e){}artLabel();if(typeof makeHeads==='function'&&G.phase==='menu'){makeHeads();if(typeof selUI==='function')selUI()}snd(600,.06)};artLabel();
