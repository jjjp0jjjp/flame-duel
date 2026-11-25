// ===== 新角色（刃、巫、獸、羽）的招式特效、飛行道具與超必殺背景（純視覺，不影響判定）=====
// 由 19-roster3.js 的 fxMove3／hitFx3／projFx3／projEnd3／drawProj3／supPattern3 在 li>=12 時呼叫
function fxMove4(f,a,g,li,k,t,d,x,y,act,ex,ey){
 if(li===12){ // 刃：刀光、居合殘影
  if(a.thru&&act){gho(f,'#ffffff');if(t%2===0)slh(x-d*30,y-78,0,rr_(60,110),'#ffffff',8)}
  if(a.gb&&t===a.su+1)P({t:'ar',x:x+d*40,y:y-70,dir:d,c:'#ffffff',l:14,g:0,dr:1});
  if(act&&!a.thru&&t===a.su+1)slh(ex,ey,rr_(-.5,.5),rr_(40,60),'#e9ecef',8);
  if(k==='ex'&&t===a.su){flash('#ffffff',.25,160);for(let i=0;i<6;i++)slh(x+d*rr_(60,300),y-rr_(60,100),0,rr_(80,160),'#ffffff',10)}
 }else if(li===13){ // 巫：魂火聚集、黃泉漩渦
  if((a.type==='proj'||a.type==='strike')&&t<=a.su&&t%2===0){const tx=x+d*30,ty=y-80,px=tx+rr_(-40,40),py=ty+rr_(-40,40);P({t:'e',x:px,y:py,vx:(tx-px)*.13,vy:(ty-py)*.13,l:8,s:rr_(3,5),c:Math.random()<.5?'#2a9d8f':'#b7f0e8',g:0,dr:1})}
  if(a.around&&act&&t%3===0){P({ring:1,x,y:y-70,c:'#2a9d8f',l:12,rs:-4,lw:4,r0:110});emb(x+rr_(-80,80),y-rr_(10,120),'#b7f0e8',2,1,20,4,1)}
  if(a.ls&&act&&t%2===0)emb(ex,ey,'#2a9d8f',2,1.5,14,3,0);
 }else if(li===14){ // 獸：咆哮、撕咬
  if(a.drain&&t===a.su){P({ring:1,x,y:y-70,c:'#c1121f',l:18,rs:10,lw:8});P({ring:1,x,y:y-70,c:'#ffb3b3',l:14,rs:7,lw:4});pp({x,y:y-150,vx:0,vy:-.8,l:45,m:45,txt:'吼！',c:'#ff6b6b',text:1,big:1});G.shake=Math.max(G.shake,8);noise(.5,.2,600,'lowpass',80)}
  if(a.hits&&act&&t%3===0)slh(ex,ey+rr_(-10,10),.7*d,rr_(24,36),'#ff6b6b',6);
  if(a.hop&&!g&&t%2===0)smk(x,y-40,10,'#8a6a4a',16);
 }else{ // 羽：拉弓光點
  if(a.type==='proj'&&t<=a.su&&t%2===0)P({t:'e',x:x+d*rr_(20,40),y:y-rr_(70,90),vx:0,vy:0,l:6,s:rr_(2,3),c:'#c7d2fe',g:0,dr:1});
  if(a.type==='proj'&&t===a.su)slh(x+d*40,y-84,0,30,'#c7d2fe',6);
  if(a.type==='strike'&&t<=a.su&&t%3===0)slh(x+d*10,y-120,-1.4*d,40,'#c7d2fe',8);
 }
}
function hitFx4(src,a,v,li,x,y,big){
 if(li===12){slh(x,y,.7,rr_(70,100),'#ffffff',10);slh(x,y,-.7,rr_(70,100),'#e9ecef',10);spark(x,y,'#ffffff',big?8:4);if(a.ex)flare(x,y,'#ffffff',90,10)}
 else if(li===13){emb(x,y,'#2a9d8f',big?10:5,4,20,4,.5);if(a.ls||src.ch.ls)for(let i=0;i<(big?6:3);i++)P({t:'e',x:x+rr_(-10,10),y:y+rr_(-10,10),vx:(src.x-x)*.04,vy:(src.y-70-y)*.04,l:26,s:rr_(3,5),c:'#b7f0e8',g:0,dr:1})}
 else if(li===14){for(let i=-1;i<=1;i++)slh(x+i*8,y+i*4,.9,rr_(40,60),'#ff6b6b',10);emb(x,y,'#c1121f',big?10:5,4,18,4,.5);if(big)P({ring:1,x,y,c:'#c1121f',l:14,rs:6,lw:5})}
 else{spark(x,y,'#c7d2fe',big?8:4);P({t:'e',x,y,vx:rr_(-1,1),vy:-rr_(.5,2),l:30,s:4,c:'#4361ee',g:.05,dr:.97})}
}
function projFx4(p,li,sg){
 if(li===12){if(G.frame%2===0)slh(p.x-sg*20,p.y+rr_(-6,6),0,rr_(20,40),'#e9ecef',6)}
 else if(li===13){if(p.strike){if(p.wait>0&&p.wait%3===0)P({t:'e',x:p.x+rr_(-24,24),y:GY-6,vx:0,vy:-rr_(.5,1.5),l:16,s:rr_(2,3.5),c:'#c77dff',g:0,dr:1})}else P({t:'e',x:p.x-sg*rr_(0,8),y:p.y+rr_(-5,5),vx:-p.vx*.1,vy:rr_(-.5,.5),l:16,s:rr_(2,4),c:Math.random()<.5?'#2a9d8f':'#b7f0e8',g:-.02,dr:.96})}
 else if(li===15){if(!p.strike&&G.frame%2===0)slh(p.x-sg*18,p.y,Math.atan2(p.vy||0,p.vx),20,'#c7d2fe',5)}
}
function projEnd4(p,li,x,y){
 if(li===12){for(let i=0;i<5;i++)slh(x,y,i*1.25,rr_(20,36),'#ffffff',8)}
 else if(li===13){emb(x,y,'#2a9d8f',12,4,20,4,0);P({ring:1,x,y,c:'#b7f0e8',l:14,rs:5,lw:4})}
 else if(li===15){spark(x,Math.min(y,GY-10),'#c7d2fe',5);smk(x,Math.min(y,GY-10),10,'#9aa0b8',18)}
}
// 刃的劍氣、巫的魂球、羽的箭
function slashWave(p){const d=p.vx>=0?1:-1;ctx.save();ctx.translate(p.x,p.y);ctx.scale(d,1);ctx.globalCompositeOperation='lighter';
 ctx.beginPath();ctx.moveTo(-6,-30);ctx.quadraticCurveTo(20,0,-6,30);ctx.quadraticCurveTo(6,0,-6,-30);ctx.fillStyle='rgba(233,236,239,.85)';ctx.fill();
 ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-4,-28);ctx.quadraticCurveTo(16,0,-4,28);ctx.stroke();ctx.restore()}
function soulOrb(p){const t=G.frame,r=p.big?26:12;glow(p.x,p.y,r*2.6,'#2a9d8f',.9);ctx.save();ctx.fillStyle='rgba(183,240,232,.9)';ctx.beginPath();ctx.arc(p.x,p.y,r*.7,0,6.3);ctx.fill();
 ctx.fillStyle='#12232a';const d=p.vx>=0?1:-1;ctx.beginPath();ctx.arc(p.x+d*2-3,p.y-1,1.8,0,6.3);ctx.arc(p.x+d*2+3,p.y-1,1.8,0,6.3);ctx.fill();
 ctx.strokeStyle='rgba(183,240,232,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(p.x-d*r*.6,p.y);ctx.quadraticCurveTo(p.x-d*r*1.6,p.y+Math.sin(t*.4)*6,p.x-d*r*2.4,p.y+Math.sin(t*.4+1)*8);ctx.stroke();ctx.restore()}
function arrow(x,y,ang,s){ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(s,s);ctx.strokeStyle='#3a2412';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(16,0);ctx.stroke();ctx.strokeStyle='#c7a27a';ctx.lineWidth=1.2;ctx.stroke();
 ctx.fillStyle='#dfe4ee';ctx.strokeStyle='#14161c';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(24,0);ctx.lineTo(14,-5);ctx.lineTo(14,5);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#4361ee';ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(-28,-6);ctx.lineTo(-16,0);ctx.lineTo(-28,6);ctx.closePath();ctx.fill();ctx.restore()}
function curseMark(p){const t=G.frame,pr=1-Math.max(0,p.wait)/12;ctx.save();ctx.strokeStyle='rgba(199,125,255,'+(.4+.4*pr)+')';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,GY-3,32*pr+8,8*pr+2,0,0,6.3);ctx.stroke();
 ctx.beginPath();for(let i=0;i<5;i++){const a=t*.05+i*1.2566,b=a+2.513;ctx.moveTo(p.x+Math.cos(a)*30*pr,GY-3+Math.sin(a)*7*pr);ctx.lineTo(p.x+Math.cos(b)*30*pr,GY-3+Math.sin(b)*7*pr)}ctx.stroke();ctx.restore()}
function drawProj4(p,li,k,t){
 if(li===12)slashWave(p);
 else if(li===13){if(p.strike)curseMark(p);else soulOrb(p)}
 else if(li===15){if(p.strike){if(p.wait>0){const yy=GY-Math.max(0,p.wait)*30;ctx.save();ctx.strokeStyle='rgba(67,97,238,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x-14,GY-3);ctx.lineTo(p.x+14,GY-3);ctx.stroke();ctx.restore();if(yy>-30)arrow(p.x,yy,Math.PI/2,1.2)}}else arrow(p.x,p.y,Math.atan2(p.vy||0,p.vx),1)}
 else fireball(p,12);
}
// 定點攻擊落下的特效
function curseFx(p){for(let i=0;i<10;i++)P({t:'e',x:p.x+rr_(-24,24),y:GY-rr_(0,20),vx:rr_(-.5,.5),vy:-rr_(2,5),l:26,s:rr_(3,6),c:Math.random()<.5?'#c77dff':'#5a189a',g:-.02,dr:.97});P({ring:1,flat:1,x:p.x,y:GY-2,c:'#c77dff',l:18,rs:6,lw:5});glow(p.x,GY-60,60,'#c77dff',.4);snd(140,.4,'sawtooth',.06,60)}
function arrowRainFx(p){spark(p.x,GY-8,'#c7d2fe',6);smk(p.x,GY-10,12,'#9aa0b8',22);P({t:'fn',x:p.x,y:GY,l:30,g:0,dr:1,draw:(q,al)=>{ctx.save();ctx.globalAlpha=al;arrow(q.x,GY-14,Math.PI/2-.2,1.1);ctx.restore()}});snd(900,.06,'square',.03,300)}
// 超必殺特寫背景
function supPattern4(ci,t,e){
 if(ci===12){ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=4;const x=-W/2+((t*1600)%(W*1.4));ctx.beginPath();ctx.moveTo(x-300,-20);ctx.lineTo(x,10);ctx.stroke();ctx.fillStyle='rgba(255,183,197,.8)';for(let i=0;i<16;i++){const px=-W/2+((i*131+t*60)%W),py=-80+((i*53+t*50)%160);ctx.beginPath();ctx.ellipse(px,py,4,2.5,i,0,6.3);ctx.fill()}}
 else if(ci===13){ctx.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const x=-W/2+((i*113)%W)+Math.sin(t*2+i)*20,y=80-((t*50+i*37)%170);ctx.drawImage(glowSpr('#2a9d8f'),x-18,y-18,36,36)}}
 else if(ci===14){ctx.strokeStyle='rgba(193,18,31,.55)';ctx.lineWidth=14;ctx.lineCap='round';for(let i=0;i<3;i++){const x=-80+i*60+Math.sin(t*3)*4;ctx.beginPath();ctx.moveTo(x-60,-70);ctx.lineTo(x+60,70);ctx.stroke()}}
 else{ctx.strokeStyle='rgba(199,210,254,.55)';ctx.lineWidth=2;for(let i=0;i<20;i++){const x=-W/2+((i*97+t*300)%W),y=-80+((i*61+t*300)%160);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-24,y-24);ctx.stroke()}}
}
