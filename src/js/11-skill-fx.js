// ================= 技能特效(純視覺,不影響遊戲判定) =================
let NOFX=0;
const P=o=>{if(NOFX)return o;const p=Object.assign({vx:0,vy:0,l:20},o);p.m=p.l;if(parts.length>700)parts.shift();parts.push(p);return p};
const rr_=(a,b)=>a+Math.random()*(b-a);
function emb(x,y,c,n,sp,l,sz,up){if(fxLo())n=Math.ceil(n/2);for(let i=0;i<n;i++){const a=Math.random()*6.28,s=Math.random()*sp;P({t:'e',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(up||0),l:l+rnd(0,8),s:sz*(.6+Math.random()*.8),c,g:-.05,dr:.95})}}
const smk=(x,y,sz,c,l)=>P({t:'sm',x,y,vx:(Math.random()-.5)*1.4,vy:-Math.random()*1.2,l:l||26,s:sz,c:c||'#8a8fa8',g:-.02,dr:.95,grow:.8});
const rok=(x,y,vx,vy,c)=>P({t:'rk',x,y,vx,vy,l:34+rnd(0,16),s:4+Math.random()*5,c:c||'#7d879c',g:.35,dr:.99,rot:Math.random()*6,vr:(Math.random()-.5)*.5});
const slh=(x,y,ang,len,c,l)=>P({t:'sl',x,y,ang,len,l:l||12,c,g:0,dr:1});
const gho=(f,tint)=>{const c=Object.assign({},f);c.tr=[];c.lt=-9;c.mt=0;c.hit=false;c.flash=0;c.tint=tint;P({t:'gh',f:c,l:14,g:0,dr:1})};
function crk(x){const pts=[];let cx=-70;while(cx<70){pts.push([cx,(Math.random()-.5)*9]);cx+=9+Math.random()*10}P({t:'ck',x,y:GY+1,pts,l:55,g:0,dr:1})}
const li_=f=>Math.max(0,CH.indexOf(f.ch));
// ---- 發光貼圖（依顏色快取）：取代 shadowBlur 與逐顆畫圓，光暈更柔、成本更低
const hex6=c=>c.length===4?'#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c.slice(0,7),GLW=new Map();
function glowSpr(c){c=hex6(c);let s=GLW.get(c);if(s)return s;s=document.createElement('canvas');s.width=s.height=64;const g=s.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);
 r.addColorStop(0,'#ffffff');r.addColorStop(.16,c);r.addColorStop(.42,c+'55');r.addColorStop(1,c+'00');g.fillStyle=r;g.fillRect(0,0,64,64);GLW.set(c,s);return s}
// 細長光芒貼圖（星芒只畫兩條光芒＋中心光暈，比整張方形貼圖少填很多像素）
function raySpr(c){c=hex6(c);const k='r'+c;let s=GLW.get(k);if(s)return s;s=document.createElement('canvas');s.width=128;s.height=12;const g=s.getContext('2d'),r=g.createLinearGradient(0,0,128,0);r.addColorStop(0,c+'00');r.addColorStop(.42,c);r.addColorStop(.5,'#ffffff');r.addColorStop(.58,c);r.addColorStop(1,c+'00');g.fillStyle=r;g.beginPath();g.ellipse(64,6,64,5,0,0,6.3);g.fill();GLW.set(k,s);return s}
const glow=(x,y,r,c,a)=>{const o=ctx.globalCompositeOperation,ga=ctx.globalAlpha;ctx.globalCompositeOperation='lighter';if(a!==undefined)ctx.globalAlpha=ga*a;ctx.drawImage(glowSpr(c),x-r,y-r,r*2,r*2);ctx.globalCompositeOperation=o;ctx.globalAlpha=ga};
const flare=(x,y,c,s,l)=>P({t:'fl',x,y,c,s,l:l||8,g:0,dr:1,rot:Math.random()*.6-.3});
const fxLo=()=>QM===3||(QM===0&&QA>=2);
const PGL=['#ff8a2a','#7fd6ff','#b46bff','#ffe680',null,'#9fe8ff','#7fffc0',null,null,'#a3e635','#ff9ff3','#ff9f1c']; // 各角色飛行道具的光色（岩是石頭，不發光）
// ---- 招式動作特效(每幀,攻擊進行中)
function fxMove(f,a,g){
 const li=li_(f),k=a.key,t=f.t,d=f.dir,x=f.x,y=f.y,act=t>a.su&&t<=a.su+a.ac,ex=x+d*a.r*.9,ey=y+(a.h||-70);
 if(t===1&&(a.ovh||a.low)&&!a.air){const c=a.ovh?'#ffd23d':'#7ec8ff',sg=a.ovh?1:-1,yy=a.ovh?y-150:GY-8;P({t:'fn',x,y:yy,l:16,g:0,dr:1,draw:(p,al)=>{ctx.save();ctx.globalAlpha=al;ctx.fillStyle=c;ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x-10,p.y-7*sg);ctx.lineTo(p.x+10,p.y-7*sg);ctx.lineTo(p.x,p.y+7*sg);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}})}
 if(t===1&&(k==='sp'||k==='sp2'||k==='sp3'||k==='asp'||k==='ex')){const c=colOf(f);flare(x+d*26,y-82,c,k==='ex'?72:40,k==='ex'?10:6);if(k==='ex'){P({ring:1,x,y:y-60,c,l:18,rs:9,lw:6});emb(x,y-60,c,18,6,24,5,1);spark(x,y-60,c,14)}}
 if(a.vx&&act){if(t%2===0)gho(f,colOf(f));if(g)smk(x-d*16,GY-8,10,'#9aa0b8',20)}
 if(li===0){
  if(k==='sp3'&&t>=a.su&&t<=a.su+a.ac+6){for(let i=0;i<6;i++)emb(x+d*rr_(12,32),y-rr_(25,135),Math.random()<.5?'#ffcf4a':'#ff6a1a',1,1.4,20,rr_(6,12),1.8);if(t===a.su)P({ring:1,flat:1,x,y:GY-2,c:'#ff7a2a',l:16,rs:6,lw:5})}
  else if(a.type==='proj'||k==='ex'){if(t<=a.su){const tx=x+d*45,ty=y-72,px=tx+rr_(-60,60),py=ty+rr_(-50,50);P({t:'e',x:px,y:py,vx:(tx-px)*.13,vy:(ty-py)*.13,l:8,s:rr_(3,5),c:k==='ex'?'#ffe060':'#ff8a2a',g:0,dr:1})}if(t===a.su)emb(x+d*45,y-72,'#ffd24a',10,4,18,5,0)}
  else if(act&&t%2===0&&!a.air)emb(ex,ey,Math.random()<.5?'#ff9a3a':'#ffd24a',2,1.4,16,4,.6);
 }else if(li===1){
  if(k==='ex'||k==='sp'){if(t<=a.su){const px=x+rr_(-34,34),py=y-rr_(40,100);P({t:'e',x:px,y:py,vx:(x+d*40-px)*.1,vy:(y-85-py)*.1,l:9,s:rr_(3,5),c:'#9fd6ff',g:0,dr:1})}if(t===a.su){for(let i=0;i<8;i++)smk(x+rr_(-20,20),GY-6,13,'#9aa0b8');P({ring:1,flat:1,x,y:GY-2,c:'#cfe6ff',l:16,rs:7,lw:5})}}
  else if(a.dive&&!g&&t>=a.su){emb(x,y-60,'#cfe6ff',1,1,12,4,0);if(t%3===0)smk(x,y-90,9,'#8a8fa8',14)}
  else if(act&&t%2===0&&!a.air)P({t:'sm',x:ex,y:ey,vx:0,vy:-.2,l:12,s:7,c:'#cfe6ff',g:0,dr:1,grow:.6});
 }else if(li===2){
  if(a.back&&t===1){smk(x,y-60,22,'#3a2a6a',24);gho(f,'#b46bff');emb(x,y-60,'#e3ccff',14,5,18,3,0)}
  if(a.back&&t===2||a.tele&&t===a.su+1){smk(x,y-60,22,'#3a2a6a',24);emb(x,y-60,'#e3ccff',14,5,18,3,0);P({ring:1,x,y:y-60,c:'#b46bff',l:14,rs:5,lw:4})}
  if(a.tele&&t===a.su){smk(x,y-60,22,'#3a2a6a',24);gho(f,'#b46bff')}
  if(a.tele&&t===a.su+1)P({t:'ar',x:x+d*30,y:y-70,dir:d,c:'#e3ccff',l:14,g:0,dr:1});
  if(k==='ex'&&t===a.su)smk(x,y-60,26,'#3a2a6a',28);
  if(act&&t%2===0&&!a.air&&!a.vx&&!a.tele)emb(ex,ey,Math.random()<.5?'#b46bff':'#e3ccff',2,1.4,12,3,0);
 }else if(li===3){
  if((a.type==='proj'||a.type==='strike')&&t<=a.su&&t%2===0){const tx=x+d*40,ty=y-(a.type==='strike'?120:76);P({t:'zz',x:tx+rr_(-30,30),y:ty+rr_(-30,30),ang:rr_(0,6.28),len:rr_(14,26),c:Math.random()<.5?'#ffe680':'#8fe8ff',l:5,g:0,dr:1})}
  if(a.around&&t===a.su+1){P({ring:1,x,y:y-70,c:'#ffe680',l:14,rs:7,lw:5});for(let i=0;i<10;i++)P({t:'zz',x,y:y-70,ang:i*.628,len:rr_(40,70),c:i%2?'#ffe680':'#8fe8ff',l:8,g:0,dr:1})}
  if(act&&t%2===0&&!a.air&&!a.around&&a.type!=='strike')P({t:'zz',x:ex,y:ey,ang:rr_(0,6.28),len:rr_(10,20),c:'#ffe680',l:5,g:0,dr:1});
 }else if(li===4){
  if(a.counter&&t>a.su&&t<=a.su+a.ac&&t%3===0){P({ring:1,x:x+d*20,y:y-70,c:'#ffe0b8',l:10,rs:2,lw:3,r0:34});rok(x+d*rr_(20,40),y-rr_(40,110),rr_(-1,1),-rr_(0,1),'#a8784a')}
  if(a.vx&&act&&g&&t%2===0)smk(x-d*20,GY-8,12,'#b9967a',22);
  if(a.type==='proj'&&t===a.su-2)for(let i=0;i<5;i++)rok(x+d*20,y-90,rr_(-2,2),-rr_(1,3),'#8a6a4a');
  if(a.dive&&!g&&t>=a.su&&t%2===0)smk(x,y-80,10,'#b9967a',14);
  if(act&&t%3===0&&!a.air&&!a.vx&&a.type!=='proj')smk(ex,ey,8,'#c9a67a',12);
 }else fxMove2(f,a,g,li,k,t,d,x,y,act,ex,ey);
}
// ---- 命中特效
function hitFx(src,a,v){
 const li=li_(src),x=v.x,y=v.y-75,big=a.d>12||a.ex;
 if(a.ex)flash(colOf(src),.35,220);else if(big)flash('#ffffff',.12,90);
 flare(x,y,colOf(src),a.ex?84:big?50:30,a.ex?10:big?7:5);if(a.ex)flare(x,y,'#ffffff',50,8);
 if(li===4&&a.ex){for(let i=0;i<14;i++)rok(v.x+rr_(-40,40),GY-6,rr_(-5,5),-rr_(5,11),i%2?'#a8784a':'#6a4a2a');for(let i=0;i<8;i++)smk(v.x+rr_(-50,50),GY-10,20,'#b9967a',40);P({ring:1,flat:1,x:v.x,y:GY-2,c:'#ffb070',l:26,rs:12,lw:8});flare(v.x,GY-30,'#ffb070',96,11);G.shake=Math.max(G.shake,14)}
 if(li===0){emb(x,y,'#ffb347',big?22:10,big?7:4,26,5,1);emb(x,y,'#fff2b0',big?8:4,3,16,3,0);if(big)P({ring:1,x,y,c:'#ff7a2a',l:18,rs:5,lw:5});if(a.ex||a.launch)for(let i=0;i<10;i++)emb(x+rr_(-15,15),y+rr_(10,60),'#ff5a1a',1,2,30,rr_(4,8),3)}
 else if(li===1){const n=big?9:4;for(let i=0;i<n;i++)rok(x+rr_(-10,10),y,rr_(-3.5,3.5),-2-Math.random()*5);for(let i=0;i<(big?5:2);i++)smk(x+rr_(-15,15),v.y-20,14,'#9aa0b8');if(big)P({ring:1,x,y,c:'#cfe6ff',l:16,rs:6,lw:6});if(a.ex||a.throw)crk(v.x)}
 else if(li===2){const n=a.ex?7:big?4:2;for(let i=0;i<n;i++)slh(x+rr_(-12,12),y+rr_(-17,17),rr_(-1.1,.8)+(i%2?1.6:0),rr_(70,110),i%2?'#e3ccff':'#b46bff',12);smk(x,y+20,12,'#4a3a80',20)}
 else if(li===3){for(let i=0;i<(big?9:5);i++)P({t:'zz',x,y,ang:rr_(0,6.28),len:rr_(20,big?60:38),c:i%2?'#ffe680':'#8fe8ff',l:9,g:0,dr:1});emb(x,y,'#fff3b0',big?14:7,5,14,3,0);if(big)P({ring:1,x,y,c:'#ffe680',l:14,rs:6,lw:4})}
 else if(li===4){const n=big?10:5;for(let i=0;i<n;i++)rok(x+rr_(-10,10),y+rr_(-10,20),rr_(-4,4),-2-Math.random()*5,i%2?'#a8784a':'#7a5a3a');for(let i=0;i<(big?6:3);i++)smk(x+rr_(-18,18),v.y-15,15,'#b9967a');if(a.throw||a.ex){crk(v.x);P({ring:1,flat:1,x:v.x,y:GY-2,c:'#ffe0b8',l:20,rs:8,lw:6})}}
 else hitFx2(src,a,v,li,x,y,big);
}
function landFx(f){
 const a=f.atk;
 if(f.st==='atk'&&a&&a.dive){const big=f.ch.w>1.2&&a.key==='asp';P({ring:1,flat:1,x:f.x,y:GY-2,c:'#cfe6ff',l:big?20:14,rs:big?8:5,lw:big?6:4});for(let i=0;i<(big?8:4);i++){smk(f.x+rr_(-20,20),GY-6,12,'#9aa0b8');}for(let i=0;i<(big?9:3);i++)rok(f.x+rr_(-14,14),GY-8,rr_(-4,4),-2-Math.random()*5);if(big){crk(f.x);G.shake=Math.max(G.shake,6)}}
 else for(let i=0;i<2;i++)smk(f.x+rr_(-10,10),GY-6,8,'#9aa0b8',16);
}
function projFx(p){
 const li=li_(p.own),sg=p.vx>=0?1:-1;
 if(li===2){P({t:'e',x:p.x,y:p.y+rr_(-4,4),vx:-p.vx*.1+rr_(-.5,.5),vy:rr_(-.6,.6),l:14,s:rr_(2.5,4.5),c:Math.random()<.5?'#b46bff':'#e3ccff',g:0,dr:.9});if(G.frame%4===0)slh(p.x-p.vx*1.5,p.y,Math.atan2(p.vy||0,p.vx),26,'#e3ccff',8)}
 else if(li===0){const n=p.big?4:2;for(let i=0;i<n;i++)P({t:'e',x:p.x-sg*rr_(0,14),y:p.y+rr_(-1,1)*(p.big?22:8),vx:-p.vx*.15,vy:-rr_(.3,1.8),l:rnd(14,26),s:(p.big?rr_(3.5,6.5):rr_(3,6)),c:['#ffd24a','#ff7a2a','#ff4a1a'][rnd(0,3)],g:-.06,dr:.96})}
 else if(li===1){if(G.frame%2===0)smk(p.x-sg*6,GY-6,9,'#9aa0b8',22);if(G.frame%3===0)rok(p.x,GY-14,rr_(-1,1),-2-Math.random()*3)}
 else if(li===3){if(p.wait>0){if(p.wait%3===0)P({t:'zz',x:p.x+rr_(-20,20),y:GY-rr_(4,20),ang:-1.57+rr_(-.6,.6),len:rr_(10,24),c:'#ffe680',l:5,g:0,dr:1})}else if(!p.strike){P({t:'e',x:p.x-sg*rr_(0,10),y:p.y+rr_(-6,6),vx:-p.vx*.1,vy:rr_(-.5,.5),l:10,s:rr_(2,4),c:Math.random()<.5?'#ffe680':'#8fe8ff',g:0,dr:.9});if(G.frame%2===0)P({t:'zz',x:p.x,y:p.y,ang:rr_(0,6.28),len:rr_(12,22),c:'#fff3b0',l:4,g:0,dr:1})}}
 else if(li===4){if(p.k==='qk'){if(G.frame%2===0)rok(p.x,GY-10,rr_(-1,1),-2-Math.random()*3,'#8a6a4a')}else if(G.frame%3===0)smk(p.x-sg*8,p.y,8,'#b9967a',16)}
 else projFx2(p,li,sg);
}
function projEnd(p){
 const li=li_(p.own),x=p.x,y=p.y;
 if(li===2){for(let i=0;i<8;i++)slh(x,y,Math.random()*6.28,rr_(22,42),i%2?'#e3ccff':'#b46bff',10);emb(x,y,'#e3ccff',8,4,16,3,0)}
 else if(li===0){emb(x,y,'#ffb347',p.big?30:14,p.big?8:5,28,p.big?7:5,1);P({ring:1,x,y,c:'#ff7a2a',l:16,rs:p.big?6:4,lw:5})}
 else if(li===1){for(let i=0;i<8;i++)rok(x,GY-12,rr_(-3,3),-2-Math.random()*5);for(let i=0;i<4;i++)smk(x,GY-10,14,'#9aa0b8');P({ring:1,flat:1,x,y:GY-4,c:'#cfe6ff',l:16,rs:6,lw:4})}
 else if(li===3){emb(x,y,'#ffe680',12,5,16,3,0);for(let i=0;i<6;i++)P({t:'zz',x,y,ang:i*1.05,len:rr_(18,34),c:'#8fe8ff',l:7,g:0,dr:1})}
 else if(li===4){for(let i=0;i<(p.k==='qk'?4:12);i++)rok(x,Math.min(y,GY-12),rr_(-4,4),-2-Math.random()*6,i%2?'#a8784a':'#6a4a2a');smk(x,GY-12,16,'#b9967a');if(p.k!=='qk')P({ring:1,flat:1,x,y:GY-4,c:'#ffe0b8',l:16,rs:6,lw:4})}
 else projEnd2(p,li,x,y);
}
// ---- 投射物外觀
function shuriken(x,y,r,rot,al){
 ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha*=al;
 ctx.beginPath();for(let i=0;i<4;i++){const a=i*1.5708;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.lineTo(Math.cos(a+.7854)*r*.3,Math.sin(a+.7854)*r*.3)}ctx.closePath();
 const g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#f4f4ff');g.addColorStop(.5,'#9a9ab8');g.addColorStop(1,'#4a4a68');
 ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#161228';ctx.lineWidth=2;ctx.lineJoin='round';ctx.stroke();
 ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=1.2;ctx.beginPath();for(let i=0;i<4;i++){const a=i*1.5708;ctx.moveTo(Math.cos(a+.7854)*r*.3,Math.sin(a+.7854)*r*.3);ctx.lineTo(Math.cos(a)*r*.94,Math.sin(a)*r*.94)}ctx.stroke();
 ctx.fillStyle='#161228';ctx.beginPath();ctx.arc(0,0,r*.2,0,6.3);ctx.fill();ctx.strokeStyle='#d8d8ee';ctx.lineWidth=1.2;ctx.stroke();
 ctx.restore();
}
function kunai(x,y,ang){
 ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.lineJoin='round';
 ctx.beginPath();ctx.moveTo(24,0);ctx.lineTo(6,-6.5);ctx.lineTo(-8,-3);ctx.lineTo(-8,3);ctx.lineTo(6,6.5);ctx.closePath();
 const g=ctx.createLinearGradient(0,-7,0,7);g.addColorStop(0,'#f2f2ff');g.addColorStop(.5,'#a8a8c4');g.addColorStop(1,'#5a5a78');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#161228';ctx.lineWidth=1.8;ctx.stroke();
 ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(-6,0);ctx.stroke();
 ctx.fillStyle='#3a2a6a';ctx.strokeStyle='#161228';ctx.lineWidth=1.5;ctx.fillRect(-20,-2.6,12,5.2);ctx.strokeRect(-20,-2.6,12,5.2);
 ctx.strokeStyle='#b46bff';ctx.lineWidth=1;for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(-18+i*3,-2.6);ctx.lineTo(-16+i*3,2.6);ctx.stroke()}
 ctx.strokeStyle='#161228';ctx.lineWidth=4;ctx.beginPath();ctx.arc(-25,0,5,0,6.3);ctx.stroke();ctx.strokeStyle='#cfcfe6';ctx.lineWidth=2;ctx.stroke();
 ctx.restore();
}
function fireball(p,r){
 const ang=Math.atan2(p.vy||0,p.vx),t=G.frame+(p.x|0);
 ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ang);ctx.globalCompositeOperation='lighter';
 for(let i=0;i<3;i++){const L=r*(3.2-i*.7)*(1+.18*Math.sin(t*.7+i*2)),w=r*(1.05-i*.25),wob=Math.sin(t*.5+i)*r*.25;
  const g=ctx.createLinearGradient(0,0,-L,0);g.addColorStop(0,'rgba(255,235,140,.95)');g.addColorStop(.5,'rgba(255,110,30,.6)');g.addColorStop(1,'rgba(200,30,10,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,-w);ctx.quadraticCurveTo(-L*.5,-w*.9+wob,-L,wob*.6);ctx.quadraticCurveTo(-L*.5,w*.9+wob,0,w);ctx.closePath();ctx.fill()}
 const g=ctx.createRadialGradient(0,0,0,0,0,r*1.5);g.addColorStop(0,'#fffbe6');g.addColorStop(.3,'#ffe060');g.addColorStop(.65,'#ff7a1c');g.addColorStop(1,'rgba(255,60,10,0)');
 ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r*1.5,0,6.3);ctx.fill();ctx.restore();
}
function dragon(p){
 const d=p.vx>=0?1:-1,t=G.frame;ctx.save();ctx.globalCompositeOperation='lighter';
 for(let k=15;k>=0;k--){const bx=p.x-d*k*15,by=p.y+Math.sin(t*.35-k*.55)*(6+k*.9)*Math.min(1,k/2),r=(28-k*1.4)*(k===0?1.15:1),a=1-k/18;
  const g=ctx.createRadialGradient(bx,by,0,bx,by,r);g.addColorStop(0,`rgba(255,${240-k*8},${170-k*9},${a})`);g.addColorStop(.5,`rgba(255,${120-k*4},30,${a*.7})`);g.addColorStop(1,'rgba(200,30,10,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(bx,by,r,0,6.3);ctx.fill()}
 ctx.globalCompositeOperation='source-over';const hx=p.x,hy=p.y;
 ctx.fillStyle='#ffe9a8';ctx.strokeStyle='#8a2410';ctx.lineWidth=2;
 for(const o of[0,9]){ctx.beginPath();ctx.moveTo(hx-d*(2+o),hy-16);ctx.quadraticCurveTo(hx-d*(24+o),hy-36,hx-d*(42+o),hy-30);ctx.quadraticCurveTo(hx-d*(24+o),hy-24,hx-d*(8+o),hy-12);ctx.closePath();ctx.fill();ctx.stroke()}
 ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(hx+d*8,hy-8,5,3.2,d*.3,0,6.3);ctx.fill();ctx.fillStyle='#c01010';ctx.beginPath();ctx.arc(hx+d*10,hy-8,1.8,0,6.3);ctx.fill();
 ctx.fillStyle='#fff7d6';ctx.beginPath();ctx.moveTo(hx+d*22,hy+4);ctx.lineTo(hx+d*31,hy+11);ctx.lineTo(hx+d*17,hy+9);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.restore();
}
function quake(p,sc){
 const d=p.vx>=0?1:-1,t=G.frame,hs=[14,36,56,36,16];ctx.save();ctx.translate(p.x,GY);if(sc)ctx.scale(sc,sc);
 for(let i=0;i<5;i++){const bx=(i-2)*15*d,h=hs[i]*(.85+.15*Math.sin(t*.6+i)),w=11;ctx.beginPath();ctx.moveTo(bx-w,0);ctx.lineTo(bx-1,-h);ctx.lineTo(bx+w,0);ctx.closePath();
  const g=ctx.createLinearGradient(bx,-h,bx,0);g.addColorStop(0,'#cfe0ff');g.addColorStop(.4,'#7f8cab');g.addColorStop(1,'#3a4260');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#10162a';ctx.lineWidth=2;ctx.stroke()}
 ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(120,200,255,.35)';ctx.beginPath();ctx.ellipse(0,-2,40,8,0,0,6.3);ctx.fill();ctx.restore();
}
function drawProj(p){
 const li=li_(p.own),k=p.k,t=G.frame,gc=p.strike?null:PGL[li];
 if(gc&&!fxLo()&&!(p.wait>0)){const al=Math.max(0,1-(GY-p.y)/220);if(al>0){const o=ctx.globalCompositeOperation;ctx.globalCompositeOperation='lighter';ctx.globalAlpha=al*.55;ctx.drawImage(glowSpr(gc),p.x-100,GY-16,200,32);ctx.globalAlpha=1;ctx.globalCompositeOperation=o}if(li!==2)glow(p.x,p.y,p.big?78:40,gc,.75)}
 if(li===2){
  if(k==='asp')kunai(p.x,p.y,Math.atan2(p.vy||0,p.vx));
  else{const rot=t*.55+p.x*.02;for(let i=3;i>=1;i--)shuriken(p.x-p.vx*i*1.4,p.y,22,rot-i*.5,.14*(4-i));glow(p.x,p.y,44,'#b46bff',.9);shuriken(p.x,p.y,25,rot,1)}
 }else if(li===0){if(p.big)dragon(p);else fireball(p,k==='sp2'?10:13)}
 else if(li===1)quake(p);
 else if(li===3)drawRai(p);
 else if(li===4)drawIwa(p);
 else drawProj2(p,li,k,t);
}
// 批次繪製：火星（e）與光痕（sk）都是加亮混合，結果與順序無關，
// 所以同色、同透明度（分 4 級）的合併成一條路徑一次畫完，其他粒子照舊逐顆畫
function drawParts(L){
 const B=new Map();
 for(const p of L){if(p.t==='e'||p.t==='sk'){const q=Math.min(3,p.l/p.m*4|0),k=p.t+p.c+q;let b=B.get(k);if(!b){b={t:p.t,c:p.c,a:(q+.5)/4,ps:[]};B.set(k,b)}b.ps.push(p)}else drawParticle(p)}
 ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
 for(const b of B.values()){
  if(b.t==='e'){const k=.4+.6*b.a;ctx.fillStyle=b.c;
   ctx.globalAlpha=b.a*.28;ctx.beginPath();for(const p of b.ps){const r=p.s*k*1.9;ctx.moveTo(p.x+r,p.y);ctx.arc(p.x,p.y,r,0,6.3)}ctx.fill();
   ctx.globalAlpha=b.a;ctx.beginPath();for(const p of b.ps){const r=p.s*k;ctx.moveTo(p.x+r,p.y);ctx.arc(p.x,p.y,r,0,6.3)}ctx.fill()}
  else{ctx.globalAlpha=b.a;ctx.strokeStyle=b.c;ctx.lineWidth=2.2;ctx.beginPath();for(const p of b.ps){ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*3,p.y-p.vy*3)}ctx.stroke()}}
 ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
}
function drawParticle(p){
 const al=p.l/p.m;ctx.globalAlpha=al;
 if(p.ring){ctx.strokeStyle=p.c;ctx.lineWidth=p.lw||4;ctx.beginPath();const rr=(p.r0||10)+(p.m-p.l)*(p.rs||4);if(p.flat)ctx.ellipse(p.x,p.y,rr,rr*.22,0,0,6.3);else ctx.arc(p.x,p.y,rr,0,6.3);ctx.stroke()}
 else if(p.text){ctx.font='900 '+(p.big?30:22)+'px '+FONT;ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#000';ctx.strokeText(p.txt,p.x,p.y);ctx.fillStyle=p.c;ctx.fillText(p.txt,p.x,p.y)}
 else if(p.t==='e'){ctx.globalCompositeOperation='lighter';const r=p.s*(.4+.6*al)*1.4;ctx.drawImage(glowSpr(p.c),p.x-r,p.y-r,r*2,r*2);ctx.globalCompositeOperation='source-over'}
 else if(p.t==='sm'){ctx.globalAlpha=al*.45;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,6.3);ctx.fill()}
 else if(p.t==='rk'){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.strokeStyle='#10162a';ctx.lineWidth=1.5;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);ctx.strokeRect(-p.s/2,-p.s/2,p.s,p.s);ctx.restore()}
 else if(p.t==='sl'){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.ang);const L=p.len*(1-al*.3),lw=3*al+1;ctx.lineCap='round';ctx.globalCompositeOperation='lighter';ctx.strokeStyle=p.c;ctx.globalAlpha=al*.35;ctx.lineWidth=lw*4;ctx.beginPath();ctx.moveTo(-L/2,0);ctx.lineTo(L/2,0);ctx.stroke();ctx.globalAlpha=al;ctx.lineWidth=lw;ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();ctx.restore()}
 else if(p.t==='ar'){const pr=1-al,sw=1.9*Math.min(1,pr*3+.3);ctx.save();ctx.translate(p.x-p.dir*34,p.y);ctx.scale(p.dir,1);ctx.lineCap='round';ctx.beginPath();ctx.arc(0,0,62,-1.0,-1.0+sw);ctx.strokeStyle=p.c;ctx.globalAlpha=al*.3;ctx.lineWidth=(9*al+2)*2.4;ctx.stroke();ctx.globalAlpha=al;ctx.lineWidth=9*al+2;ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.restore()}
 else if(p.t==='ck'){ctx.save();ctx.translate(p.x,p.y);ctx.lineJoin='round';ctx.beginPath();p.pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.strokeStyle='#070a14';ctx.lineWidth=5;ctx.stroke();ctx.strokeStyle='rgba(159,214,255,.9)';ctx.lineWidth=1.6;ctx.stroke();ctx.restore()}
 else if(p.t==='gh'){ctx.globalAlpha=al*.45;drawF(p.f)}
 else if(p.t==='zz'){ctx.save();ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(p.x,p.y);for(let i=1;i<=5;i++)ctx.lineTo(p.x+Math.cos(p.ang)*p.len*i/5+(Math.random()-.5)*10,p.y+Math.sin(p.ang)*p.len*i/5+(Math.random()-.5)*10);ctx.globalCompositeOperation='lighter';ctx.strokeStyle=p.c;ctx.globalAlpha=al*.3;ctx.lineWidth=(2*al+.6)*4;ctx.stroke();ctx.globalAlpha=al;ctx.lineWidth=2*al+.6;ctx.stroke();ctx.restore()}
 else if(p.t==='bolt'){bolt(p.x,0,GY,al,p.w||1)}
 else if(p.t==='fl'){const s2=p.s*(.45+.55*al),w2=Math.max(3,s2*.1),r=s2*.42,rs=raySpr(p.c);ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(p.x,p.y);ctx.drawImage(glowSpr(p.c),-r,-r,r*2,r*2);ctx.rotate(p.rot);ctx.drawImage(rs,-s2,-w2/2,s2*2,w2);ctx.rotate(Math.PI/2);ctx.drawImage(rs,-s2,-w2/2,s2*2,w2);ctx.restore()}
 else if(p.t==='sk'){ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*3,p.y-p.vy*3);ctx.strokeStyle=p.c;ctx.lineWidth=2.2;ctx.stroke();ctx.globalCompositeOperation='source-over'}
 else if(p.t==='sh'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(p.x,p.y);ctx.scale(p.dir,1);const r=30+(1-al)*10;ctx.beginPath();ctx.arc(-14,0,r,-1.05,1.05);ctx.strokeStyle=p.c;ctx.globalAlpha=al*.3;ctx.lineWidth=12;ctx.stroke();ctx.globalAlpha=al;ctx.lineWidth=3;ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.stroke();ctx.lineWidth=1;ctx.globalAlpha=al*.6;ctx.strokeStyle=p.c;for(let i=-2;i<=2;i++){const a=i*.42;ctx.beginPath();ctx.moveTo(-14+Math.cos(a)*(r-9),Math.sin(a)*(r-9));ctx.lineTo(-14+Math.cos(a)*r,Math.sin(a)*r);ctx.stroke()}ctx.restore()}
 else if(p.t==='icep')icePillar(p,al);
 else if(p.t==='fn')p.draw(p,al);
 else{ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,p.s,p.s)}
}

