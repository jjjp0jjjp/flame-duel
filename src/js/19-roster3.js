// ===== 新角色（拳、蠍、蝶、機）的招式特效、飛行道具與超必殺背景（純視覺，不影響判定）=====
// 由 18-roster2.js 的 fxMove2／hitFx2／projFx2／projEnd2／drawProj2／supPattern2 在 li>=8 時呼叫
// 自訂繪圖粒子：每幀重畫一次的形狀（鎖鏈、光束）
const fnp=(o,draw)=>P(Object.assign({t:'fn',l:2,g:0,dr:1,draw},o));
function chain(x0,y0,x1,y1,al){
 ctx.save();ctx.globalAlpha=al;ctx.lineCap='round';ctx.strokeStyle='#1c2412';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();ctx.strokeStyle='#c8d0b0';ctx.lineWidth=2.4;ctx.setLineDash([5,4]);ctx.stroke();ctx.setLineDash([]);
 const a=Math.atan2(y1-y0,x1-x0);ctx.translate(x1,y1);ctx.rotate(a);ctx.fillStyle='#d8e0c0';ctx.strokeStyle='#1c2412';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-4,-7);ctx.lineTo(0,0);ctx.lineTo(-4,7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
}
function beam(x,y,d,al,w){
 const x1=d>0?W+60:-60,g=ctx.createLinearGradient(0,y-24*w,0,y+24*w);g.addColorStop(0,'rgba(255,159,28,0)');g.addColorStop(.35,'rgba(255,190,90,.8)');g.addColorStop(.5,'#ffffff');g.addColorStop(.65,'rgba(255,190,90,.8)');g.addColorStop(1,'rgba(255,159,28,0)');
 ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=al;ctx.fillStyle=g;ctx.fillRect(Math.min(x,x1),y-24*w,Math.abs(x1-x),48*w);
 ctx.strokeStyle='#ffffff';ctx.lineWidth=3;for(let i=0;i<3;i++){const yy=y+(Math.random()-.5)*30*w;ctx.globalAlpha=al*.5;ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x1,yy+(Math.random()-.5)*8);ctx.stroke()}
 ctx.globalAlpha=al;ctx.drawImage(glowSpr('#ff9f1c'),x-50,y-50,100,100);ctx.restore();
}
function fxMove3(f,a,g,li,k,t,d,x,y,act,ex,ey){
 if(li===8){ // 拳：出拳速度線、強化時的火焰
  if(act&&!a.air&&a.hits&&t%2===0)for(let i=0;i<2;i++)slh(x+d*rr_(40,a.r),y-rr_(70,95),0,rr_(20,40),i?'#ffc2e0':'#f72585',6);
  if(a.vx&&act&&t%2===0){gho(f,colOf(f));emb(x-d*10,y-70,'#ff4d6d',2,1.5,14,4,.5)}
  if(act&&t===a.su+1&&!a.hits)emb(ex,ey,'#ffc2e0',3,2,12,3,0);
 }else if(li===9){ // 蠍：鎖鏈、毒
  if(a.kb<0&&act){const e2=Math.min(1,(t-a.su)/Math.max(2,a.ac*.5)),tx=x+d*a.r*e2,ty=y+(a.h||-80);fnp({x,y},(p,al)=>chain(x+d*28,y-84,tx,ty,1))}
  if(a.psn&&act&&t%3===0)P({t:'e',x:ex,y:ey,vx:rr_(-.5,.5),vy:-rr_(.5,1.5),l:16,s:rr_(2.5,4),c:'#a3e635',g:-.02,dr:.97});
  if(a.around&&act&&t%3===0){for(let i=0;i<3;i++)smk(x+rr_(-60,60),y-rr_(20,110),16,'#6a8a2a',26)}
 }else if(li===10){ // 蝶：花瓣、舞扇
  if(act&&t%2===0)P({t:'e',x:x+rr_(-30,30)+d*20,y:y-rr_(40,110),vx:rr_(-1,1),vy:rr_(-.5,1),l:24,s:rr_(2.5,4),c:Math.random()<.5?'#ff9ff3':'#ffd166',g:.03,dr:.97});
  if(a.hits&&act&&t%3===0)slh(x+d*rr_(20,60),y-rr_(50,95),rr_(-.8,.8),rr_(30,50),'#ff9ff3',9);
  if(a.float&&act&&t%3===0)emb(x,y-50,'#ffe3fb',2,2,18,3,0);
 }else if(li===11){ // 機：噴射火焰、光束
  if(a.vx&&act){emb(x-d*30,y-60,Math.random()<.5?'#ff9f1c':'#ffd166',2,2,10,4,0);if(t%2===0)smk(x-d*40,y-60,10,'#6a6a7a',16)}
  if(a.dive&&!g&&t>=a.su){emb(x,y-100,'#ff9f1c',2,2,10,4,-1.5)}
  if(k==='ex'){if(t<=a.su&&t%2===0){const tx=x+d*40,ty=y-86,px=tx+rr_(-50,50),py=ty+rr_(-40,40);P({t:'e',x:px,y:py,vx:(tx-px)*.15,vy:(ty-py)*.15,l:7,s:rr_(3,5),c:'#ffd166',g:0,dr:1})}
   if(act)fnp({x,y},(p,al)=>beam(x+d*40,y-86,d,1,1));if(act&&t%4===0)G.shake=Math.max(G.shake,4)}
  if(a.type==='proj'&&t===a.su){smk(x+d*50,y-80,14,'#8a8fa8',20);emb(x+d*40,y-80,'#ff9f1c',8,4,14,4,0)}
 }else fxMove4(f,a,g,li,k,t,d,x,y,act,ex,ey);
}
function hitFx3(src,a,v,li,x,y,big){
 if(li===8){P({ring:1,x,y,c:'#f72585',l:12,rs:big?7:4,lw:big?6:4});spark(x,y,'#ffc2e0',big?10:5);if(a.ex)for(let i=0;i<4;i++)slh(x,y,i*.8,rr_(60,90),'#ffffff',10)}
 else if(li===9){emb(x,y,'#a3e635',big?12:6,4,22,4,.5);for(let i=0;i<(big?5:2);i++)smk(x+rr_(-15,15),y+rr_(-10,10),12,'#6a8a2a',26);if(a.ex)for(let i=0;i<8;i++)P({t:'e',x:v.x+rr_(-20,20),y:v.y-rr_(0,120),vx:0,vy:-rr_(.3,1.2),l:40,s:rr_(4,7),c:'#a3e635',g:-.01,dr:.98})}
 else if(li===10){for(let i=0;i<(big?10:5);i++)P({t:'e',x,y,vx:rr_(-4,4),vy:rr_(-4,2),l:26,s:rr_(3,5),c:i%2?'#ff9ff3':'#ffd166',g:.06,dr:.96});slh(x,y,rr_(-.5,.5),rr_(50,80),'#ffe3fb',10)}
 else if(li===11){spark(x,y,'#ffb347',big?10:6);for(let i=0;i<(big?4:2);i++)smk(x+rr_(-10,10),y,12,'#6a6a7a',24);if(big)P({ring:1,x,y,c:'#ff9f1c',l:14,rs:6,lw:5})}
 else hitFx4(src,a,v,li,x,y,big);
}
function projFx3(p,li,sg){
 if(li===9){if(G.frame%8===0)P({t:'e',x:p.x+rr_(-8,8),y:p.y-6,vx:0,vy:-rr_(.3,1),l:20,s:rr_(2,3.5),c:'#a3e635',g:-.01,dr:.97})}
 else if(li===10){if(G.frame%2===0)P({t:'e',x:p.x,y:p.y,vx:-p.vx*.1+rr_(-.5,.5),vy:rr_(-.5,.5),l:16,s:rr_(2,3.5),c:Math.random()<.5?'#ff9ff3':'#ffd166',g:.02,dr:.95})}
 else if(li===11){if(p.strike)return;if(G.frame%2===0)smk(p.x-sg*20,p.y,8,'#8a8fa8',18);emb(p.x-sg*16,p.y,'#ff9f1c',1,1,8,3,0)}
 else projFx4(p,li,sg);
}
function projEnd3(p,li,x,y){
 if(li===9){for(let i=0;i<6;i++)smk(x+rr_(-20,20),GY-14,16,'#6a8a2a',32);emb(x,GY-14,'#a3e635',10,4,20,4,1)}
 else if(li===10){for(let i=0;i<10;i++)P({t:'e',x,y,vx:rr_(-3,3),vy:rr_(-3,1),l:24,s:rr_(3,5),c:i%2?'#ff9ff3':'#ffd166',g:.05,dr:.96})}
 else if(li===11){emb(x,y,'#ffb347',12,5,18,4,0);for(let i=0;i<4;i++)smk(x,y,12,'#6a6a7a',24);P({ring:1,x,y,c:'#ff9f1c',l:14,rs:5,lw:4})}
 else projEnd4(p,li,x,y);
}
// 蠍的毒雷、蝶的迴旋扇、機的火箭拳與飛彈
function mine(p){const t=G.frame,pu=.5+.5*Math.sin(t*.25);ctx.save();ctx.translate(p.x,GY-6);
 ctx.fillStyle='#1c2412';ctx.strokeStyle='#0a0e06';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,16,6,0,0,6.3);ctx.fill();ctx.stroke();
 ctx.fillStyle='#a3e635';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*6-2,-3);ctx.lineTo(i*6,-9-(i%2?2:0));ctx.lineTo(i*6+2,-3);ctx.fill()}
 ctx.globalAlpha=.4+.5*pu;glow(0,-4,14+pu*6,'#a3e635',.8);ctx.restore()}
function fan(x,y,r,rot,c1,c2){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r,-2.6,-.55);ctx.closePath();
 const g=ctx.createRadialGradient(0,0,2,0,0,r);g.addColorStop(0,c2);g.addColorStop(1,c1);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#3a1a3a';ctx.lineWidth=1.6;ctx.stroke();
 ctx.strokeStyle='rgba(90,30,90,.6)';ctx.lineWidth=1;ctx.beginPath();for(let a=-2.5;a<=-.6;a+=.38){ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.stroke();ctx.restore()}
function mechMine(p){const pu=.5+.5*Math.sin(G.frame*.3);ctx.save();ctx.translate(p.x,GY-6);ctx.fillStyle='#3a404c';ctx.strokeStyle='#14161c';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,15,6,0,0,6.3);ctx.fill();ctx.stroke();ctx.fillStyle='#5a6270';ctx.fillRect(-6,-9,12,5);ctx.strokeRect(-6,-9,12,5);ctx.fillStyle=pu>.5?'#ff3b3b':'#7a1010';ctx.beginPath();ctx.arc(0,-10,2.6,0,6.3);ctx.fill();if(pu>.5)glow(0,-10,10,'#ff3b3b',.8);ctx.restore()}
function rocketFist(p){const d=p.vx>=0?1:-1;ctx.save();ctx.translate(p.x,p.y);ctx.scale(d,1);
 const fl=ctx.createLinearGradient(-40,0,-10,0);fl.addColorStop(0,'rgba(255,159,28,0)');fl.addColorStop(1,'#ffd166');ctx.fillStyle=fl;ctx.beginPath();ctx.moveTo(-10,-6);ctx.lineTo(-38-Math.random()*8,0);ctx.lineTo(-10,6);ctx.closePath();ctx.fill();
 ctx.fillStyle='#5a6270';ctx.strokeStyle='#14161c';ctx.lineWidth=1.8;ctx.fillRect(-14,-7,12,14);ctx.strokeRect(-14,-7,12,14);
 ctx.fillStyle='#3a404c';ctx.beginPath();ctx.moveTo(-2,-9);ctx.lineTo(10,-9);ctx.quadraticCurveTo(16,-9,16,-3);ctx.lineTo(16,4);ctx.quadraticCurveTo(16,9,10,9);ctx.lineTo(-2,9);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.strokeStyle='#8a92a6';ctx.lineWidth=1;ctx.beginPath();for(const yy of[-4,0,4]){ctx.moveTo(10,yy);ctx.lineTo(15,yy)}ctx.stroke();ctx.restore()}
function missile(p){const al=Math.min(1,1-p.wait/30+.3),yy=GY-Math.max(0,p.wait)*26;ctx.save();
 ctx.strokeStyle='rgba(255,60,60,'+(.5+.4*Math.sin(G.frame*.8))+')';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,GY-3,22,6,0,0,6.3);ctx.moveTo(p.x-28,GY-3);ctx.lineTo(p.x+28,GY-3);ctx.stroke();
 if(p.wait>0&&yy>-20){ctx.translate(p.x,yy);ctx.globalAlpha=al;ctx.fillStyle='#dfe4ee';ctx.strokeStyle='#14161c';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,14);ctx.lineTo(-5,4);ctx.lineTo(-5,-14);ctx.lineTo(5,-14);ctx.lineTo(5,4);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#d62828';ctx.fillRect(-5,-14,10,5);glow(0,-22,12,'#ff9f1c',.9)}
 ctx.restore()}
function drawProj3(p,li,k,t){
 if(li===9)mine(p);
 else if(li===10){const r=p.big?30:17,rot=t*.5*(p.vx>=0?1:-1);for(let i=2;i>=1;i--){ctx.save();ctx.globalAlpha=.25/i;fan(p.x-p.vx*i*1.5,p.y,r,rot-i*.5,'#ff9ff3','#ffe3fb');ctx.restore()}fan(p.x,p.y,r,rot,'#ff9ff3','#ffe3fb');if(p.big)fan(p.x,p.y,r,rot+Math.PI,'#ffd166','#fff3c0')}
 else if(li===11){if(p.strike)missile(p);else if(!p.vx)mechMine(p);else rocketFist(p)}
 else drawProj4(p,li,k,t);
}
// 超必殺特寫背景
function supPattern3(ci,t,e){
 if(ci===8){ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(247,37,133,.4)';ctx.lineWidth=3;for(let i=0;i<24;i++){const a=i*.262+t*.5,r0=40+((t*400+i*37)%200);ctx.beginPath();ctx.moveTo(Math.cos(a)*r0,Math.sin(a)*r0*.4);ctx.lineTo(Math.cos(a)*(r0+60),Math.sin(a)*(r0+60)*.4);ctx.stroke()}}
 else if(ci===9){for(let i=0;i<18;i++){const x=-W/2+((i*97)%W),y=80-((t*60+i*41)%170),r=4+i%4*3;ctx.fillStyle='rgba(163,230,53,'+(.25+i%3*.12)+')';ctx.beginPath();ctx.arc(x,y,r,0,6.3);ctx.fill()}}
 else if(ci===10){for(let i=0;i<26;i++){const x=-W/2+((i*113+t*50)%W),y=-80+((i*53+t*70)%160);ctx.save();ctx.translate(x,y);ctx.rotate(t*2+i);ctx.fillStyle=i%2?'rgba(255,159,243,.8)':'rgba(255,209,102,.8)';ctx.beginPath();ctx.ellipse(0,0,6,3,0,0,6.3);ctx.fill();ctx.restore()}}
 else if(ci===11){ctx.strokeStyle='rgba(255,159,28,.25)';ctx.lineWidth=1;for(let x=-W;x<W;x+=24){ctx.beginPath();ctx.moveTo(x+((t*80)%24),-82);ctx.lineTo(x+((t*80)%24),82);ctx.stroke()}ctx.fillStyle='rgba(255,159,28,.12)';ctx.fillRect(-W,((t*160)%164)-82,W*2,6)}
 else supPattern4(ci,t,e);
}
