// ===== 新角色（霜、嵐、月）的招式特效、飛行道具與超必殺背景（純視覺，不影響判定）=====
// 由 11-skill-fx.js 的 fxMove／hitFx／projFx／projEnd／drawProj 在 li>=5 時呼叫
const ICE=['#bff4ff','#ffffff','#9fe8ff'],WIND=['#5ee0a0','#d6ffe9','#9effc8'],MOON=['#f0c674','#fff4d6'];
const pick=a=>a[Math.random()*a.length|0];
function fxMove2(f,a,g,li,k,t,d,x,y,act,ex,ey){
 if(li===5){ // 霜：冰晶往手上聚集、滑步留下霜痕
  if((a.type==='proj'||a.type==='strike')&&t<=a.su&&t%2===0){const tx=x+d*40,ty=y-(a.type==='strike'?40:78),px=tx+rr_(-40,40),py=ty+rr_(-36,36);P({t:'e',x:px,y:py,vx:(tx-px)*.14,vy:(ty-py)*.14,l:7,s:rr_(2.5,4),c:pick(ICE),g:0,dr:1})}
  if(a.vx&&act&&g&&t%2===0){P({ring:1,flat:1,x:x-d*10,y:GY-2,c:'#bff4ff',l:14,rs:2,lw:3,r0:14});emb(x-d*16,GY-8,'#e0fbff',2,1.5,18,3,.5)}
  else if(act&&t%2===0&&!a.air)emb(ex,ey,pick(ICE),2,1.2,16,3,.2);
 }else if(li===6){ // 嵐：風切線、上升葉片、旋風
  if(a.vx&&act&&t%2===0)slh(x-d*20,y-rr_(40,90),0,rr_(40,70),'#9effc8',10);
  if(a.lift&&t>=a.su&&t<=a.su+a.ac+6)for(let i=0;i<2;i++)P({t:'e',x:x+rr_(-24,24),y:y-rr_(10,120),vx:rr_(-1.5,1.5),vy:-rr_(1,3),l:20,s:rr_(3,5),c:pick(WIND),g:-.02,dr:.96});
  if(a.around&&t>=a.su&&t<=a.su+a.ac&&t%3===0){P({ring:1,x,y:y-70,c:'#9effc8',l:12,rs:8,lw:5,r0:30});for(let i=0;i<3;i++)slh(x+rr_(-60,60),y-rr_(30,110),rr_(-.3,.3),rr_(50,90),'#d6ffe9',10)}
  if(a.type==='proj'&&t<=a.su&&t%2===0)slh(x+d*rr_(10,40),y-rr_(60,95),rr_(-.4,.4),rr_(20,36),'#9effc8',8);
  if(act&&t%2===0&&!a.air&&!a.vx&&!a.around)slh(ex,ey,rr_(-.6,.6),rr_(24,40),'#d6ffe9',8);
 }else if(li===7){ // 月：揮棍時的金色月牙、撥擋光圈
  if(a.counter&&t>a.su&&t<=a.su+a.ac&&t%3===0)P({ring:1,x:x+d*20,y:y-70,c:'#f0c674',l:10,rs:2,lw:3,r0:40});
  if(act&&!a.air&&t===a.su+1&&!a.counter)P({t:'ar',x:x+d*Math.min(a.r*.6,90),y:y+(a.h||-70)+10,dir:d,c:'#f0c674',l:12,g:0,dr:1});
  if(a.vx&&act&&t%2===0)emb(x+d*a.r*.8,y+(a.h||-70),'#fff4d6',2,1.5,14,3,0);
  if(a.dive&&!g&&t>=a.su&&t%2===0)emb(x,y-60,'#f0c674',1,1,12,4,0);
 }else fxMove3(f,a,g,li,k,t,d,x,y,act,ex,ey);
}
function hitFx2(src,a,v,li,x,y,big){
 if(li===5){for(let i=0;i<(big?10:5);i++)rok(x+rr_(-10,10),y+rr_(-10,10),rr_(-4,4),-2-Math.random()*4,i%2?'#bff4ff':'#e8fbff');emb(x,y,'#e0fbff',big?14:6,5,18,3,0);if(big)P({ring:1,x,y,c:'#9fe8ff',l:16,rs:6,lw:5});
  if(a.ex){for(let i=0;i<10;i++)P({t:'e',x:v.x+rr_(-20,20),y:v.y-rr_(0,140),vx:0,vy:-rr_(.2,1),l:40,s:rr_(4,7),c:'#bff4ff',g:-.01,dr:.98});P({ring:1,flat:1,x:v.x,y:GY-2,c:'#bff4ff',l:24,rs:9,lw:6})}}
 else if(li===6){const n=a.ex?8:big?4:2;for(let i=0;i<n;i++)slh(x+rr_(-14,14),y+rr_(-18,18),rr_(-.5,.5)+(i%2?.4:-.4),rr_(60,100),i%2?'#d6ffe9':'#5ee0a0',11);emb(x,y,'#9effc8',big?10:4,4,18,3,.5)}
 else if(li===7){emb(x,y,'#f0c674',big?16:7,big?6:4,22,4,.5);P({t:'ar',x,y,dir:src.dir,c:'#fff4d6',l:10,g:0,dr:1});if(big)P({ring:1,x,y,c:'#f0c674',l:16,rs:6,lw:5});
  if(a.ex){P({ring:1,x,y,c:'#fff4d6',l:22,rs:9,lw:7});for(let i=0;i<6;i++)emb(x+rr_(-30,30),y+rr_(-30,30),'#f0c674',3,3,24,4,0)}}
 else hitFx3(src,a,v,li,x,y,big);
}
function projFx2(p,li,sg){
 if(li===5){if(p.strike){if(p.wait>0&&p.wait%2===0)P({t:'e',x:p.x+rr_(-22,22),y:GY-rr_(2,10),vx:0,vy:-rr_(.5,1.5),l:12,s:rr_(2,3.5),c:'#bff4ff',g:0,dr:1})}
  else P({t:'e',x:p.x-sg*rr_(0,10),y:p.y+rr_(-6,6)*(p.big?3:1),vx:-p.vx*.1,vy:rr_(-.4,.4),l:16,s:rr_(2,4)*(p.big?1.6:1),c:pick(ICE),g:.02,dr:.95})}
 else if(li===6){if(G.frame%2===0)slh(p.x-sg*30,p.y+rr_(-10,10),0,rr_(30,60),'#9effc8',7)}
 else projFx3(p,li,sg);
}
function projEnd2(p,li,x,y){
 if(li===5){for(let i=0;i<(p.big?14:7);i++)rok(x,y,rr_(-4,4),-2-Math.random()*4,i%2?'#bff4ff':'#ffffff');emb(x,y,'#e0fbff',p.big?20:8,5,20,4,0);P({ring:1,x,y,c:'#9fe8ff',l:16,rs:p.big?7:4,lw:4})}
 else if(li===6){for(let i=0;i<6;i++)slh(x,y,i*1.05,rr_(20,36),'#d6ffe9',8);emb(x,y,'#9effc8',6,4,14,3,0)}
 else projEnd3(p,li,x,y);
}
// 霜的冰柱：預警的霜圈結束時從地面冒出
function iceBurst(p){
 for(let i=0;i<8;i++)rok(p.x+rr_(-14,14),GY-10,rr_(-3,3),-rr_(4,9),i%2?'#bff4ff':'#ffffff');
 emb(p.x,GY-40,'#e0fbff',10,5,18,3,1);P({ring:1,flat:1,x:p.x,y:GY-2,c:'#9fe8ff',l:16,rs:6,lw:4});P({t:'icep',x:p.x,y:GY,l:18,g:0,dr:1,w:p.a.ex?1.5:1});
 snd(1500,.18,'triangle',.05,600);noise(.2,.08,5000,'highpass');G.shake=Math.max(G.shake,4);
}
function icePillar(p,al){
 const gr=Math.min(1,(p.m-p.l)/3),h=130*(p.w||1)*gr;ctx.save();ctx.globalAlpha=Math.min(1,al*1.6);ctx.lineJoin='round';
 for(const[o,k,wd]of[[-20,.55,10],[18,.5,10],[-7,.9,13],[7,1,14]]){const x=p.x+o,top=GY-h*k,g=ctx.createLinearGradient(0,top,0,GY);g.addColorStop(0,'#ffffff');g.addColorStop(.4,'#bff4ff');g.addColorStop(1,'rgba(127,200,240,.55)');
  ctx.beginPath();ctx.moveTo(x-wd,GY);ctx.lineTo(x-wd*.55,top+12);ctx.lineTo(x,top);ctx.lineTo(x+wd*.55,top+12);ctx.lineTo(x+wd,GY);ctx.closePath();ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#1d3a5a';ctx.lineWidth=1.8;ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x-wd*.2,GY-4);ctx.lineTo(x,top+6);ctx.stroke()}
 glow(p.x,GY-10,50,'#9fe8ff',.6*al);ctx.restore();
}
// 冰錐（小）／雪晶（超必殺）
function iceShard(p){
 ctx.save();ctx.translate(p.x,p.y);
 if(p.big){ctx.rotate(G.frame*.06);glow(0,0,70,'#9fe8ff',.8);ctx.strokeStyle='#e8fbff';ctx.lineCap='round';
  for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*Math.PI/3);ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(34,0);ctx.moveTo(18,0);ctx.lineTo(26,-9);ctx.moveTo(18,0);ctx.lineTo(26,9);ctx.stroke();ctx.strokeStyle='#7fd0f0';ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle='#e8fbff';ctx.restore()}
  ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(0,0,7,0,6.3);ctx.fill()}
 else{ctx.rotate(Math.atan2(p.vy||0,p.vx));const g=ctx.createLinearGradient(-14,0,20,0);g.addColorStop(0,'#7fd0f0');g.addColorStop(1,'#ffffff');
  ctx.beginPath();ctx.moveTo(20,0);ctx.lineTo(4,-7);ctx.lineTo(-14,-4);ctx.lineTo(-10,0);ctx.lineTo(-14,4);ctx.lineTo(4,7);ctx.closePath();ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#1d3a5a';ctx.lineWidth=1.6;ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(16,0);ctx.lineTo(-8,0);ctx.stroke()}
 ctx.restore();
}
// 嵐的風刃：朝前進方向的月牙形
function windBlade(p){
 const d=p.vx>=0?1:-1;ctx.save();ctx.translate(p.x,p.y);ctx.scale(d,1);ctx.globalCompositeOperation='lighter';
 for(let i=2;i>=0;i--){ctx.globalAlpha=i?.25/i:1;ctx.beginPath();ctx.moveTo(-i*14,-26);ctx.quadraticCurveTo(22-i*14,0,-i*14,26);ctx.quadraticCurveTo(8-i*14,0,-i*14,-26);ctx.fillStyle=i?'#5ee0a0':'#d6ffe9';ctx.fill()}
 ctx.globalAlpha=1;ctx.strokeStyle='#ffffff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,-24);ctx.quadraticCurveTo(18,0,0,24);ctx.stroke();ctx.restore();
}
function drawProj2(p,li,k,t){
 if(li===5){if(p.wl){iceWall(p);return}if(p.strike){if(p.wait>0){ctx.save();ctx.globalAlpha=.4+.3*Math.sin(t*.8);ctx.strokeStyle='#bff4ff';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,GY-2,26,6,0,0,6.3);ctx.stroke();ctx.restore()}return}iceShard(p)}
 else if(li===6)windBlade(p);
 else if(li===7)fireball(p,12);
 else drawProj3(p,li,k,t);
}
// 超必殺特寫背景
function supPattern2(ci,t,e){
 if(ci===5){ctx.strokeStyle='rgba(235,250,255,.75)';ctx.lineWidth=2;ctx.lineCap='round';for(let i=0;i<24;i++){const x=-W/2+((i*97+t*70)%W),y=-80+((i*53+t*45)%160),r=4+i%4*2;ctx.save();ctx.translate(x,y);ctx.rotate(t+i);ctx.beginPath();for(let k=0;k<3;k++){ctx.rotate(Math.PI/3);ctx.moveTo(-r,0);ctx.lineTo(r,0)}ctx.stroke();ctx.restore()}}
 else if(ci===6){ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=0;i<22;i++){const y=-78+((i*37)%156),x=((i*131+t*900)%(W*1.5))-W*.75,l=60+(i*29)%120;ctx.strokeStyle=i%3?'rgba(158,255,200,.35)':'rgba(255,255,255,.5)';ctx.lineWidth=1+i%3;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+l,y);ctx.stroke()}}
 else if(ci===7){ctx.fillStyle='rgba(255,244,214,.85)';ctx.beginPath();ctx.arc(-170,-10,110,0,6.3);ctx.fill();ctx.fillStyle='rgba(20,14,30,1)';ctx.beginPath();ctx.arc(-130,-30,104,0,6.3);ctx.fill();
  ctx.strokeStyle='rgba(240,198,116,.35)';ctx.lineWidth=2;for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(-170,-10,130+i*28+((t*40)%28),0,6.3);ctx.stroke()}}
 else supPattern3(ci,t,e);
}
// ===== 新機制的共用特效 =====
// 定點攻擊落下時的特效：機的飛彈爆炸，其他（雷）是落雷
function strikeFx(p){const li=li_(p.own);if(li===11)missileFx(p);else if(li===13)curseFx(p);else if(li===15)arrowRainFx(p);else boltFx(p)}
function missileFx(p){emb(p.x,GY-20,'#ffb347',16,6,24,5,1);for(let i=0;i<6;i++)smk(p.x+rr_(-20,20),GY-14,16,'#6a6a7a',30);for(let i=0;i<6;i++)rok(p.x,GY-10,rr_(-4,4),-rr_(3,8),'#4a4a5a');
 P({ring:1,flat:1,x:p.x,y:GY-2,c:'#ffb347',l:16,rs:7,lw:5});flare(p.x,GY-30,'#ff9f1c',60,8);noise(.3,.14,1200,'lowpass',120);snd(80,.25,'sawtooth',.08,40);G.shake=Math.max(G.shake,5)}
// 蓄力強化：發動時的光圈
function buffFx(f){const c=colOf(f);P({ring:1,x:f.x,y:f.y-60,c,l:20,rs:8,lw:6});emb(f.x,f.y-60,c,20,5,26,5,1.5);flare(f.x,f.y-80,c,70,10);snd(200,.4,'sawtooth',.08,600)}
function iceWall(p){const al=Math.min(1,p.life/20);ctx.save();ctx.globalAlpha=al;const x=p.x,h=104,g=ctx.createLinearGradient(0,GY-h,0,GY);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#bff4ff');g.addColorStop(1,'rgba(127,200,240,.7)');
 ctx.beginPath();ctx.moveTo(x-16,GY);ctx.lineTo(x-14,GY-h*.7);ctx.lineTo(x-6,GY-h);ctx.lineTo(x+4,GY-h*.85);ctx.lineTo(x+14,GY-h*.95);ctx.lineTo(x+16,GY);ctx.closePath();ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#1d3a5a';ctx.lineWidth=2;ctx.stroke();
 ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x-8,GY-10);ctx.lineTo(x-3,GY-h*.8);ctx.moveTo(x+6,GY-20);ctx.lineTo(x+9,GY-h*.7);ctx.stroke();glow(x,GY-50,46,'#9fe8ff',.35);ctx.restore()}
