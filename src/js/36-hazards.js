// ===== 迅移取消、場景機關 =====
// ---- 迅移取消：輕拳＋重拳＋輕腳（4 幀內）耗 50 氣，取消任何招式的收招；命中中使用會讓對手多硬直
function rcFx(f){if(NOFX)return;const c=colOf(f);gho(f,c);ring(f.x,f.y-70,'#fff');ring(f.x,f.y-70,c);emb(f.x,f.y-70,c,18,6,16,4,1);pp({x:f.x,y:f.y-160,vx:0,vy:-.6,l:45,m:45,txt:'迅移！',c:'#7fe3ff',text:1,big:1});G.rcF=performance.now()+180;snd(1200,.12,'sine',.06,300);sfx('cancel')}
// ---- 場景機關（選單可開關；開關值會跟著連線開局訊息與重播一起保存）
let HZ=0;try{HZ=+(localStorage.getItem('fd_hz')||0)?1:0}catch(e){}
const HZN=['夜城：屋頂定時颳強風','黃昏港：木箱牆可撞破','極光雪原：地面濕滑','火山口：定時噴發','竹林道場：定時鐘響，雙方加氣'];
function hzApply(){G.hz=G.hzo!=null?(G.hzo?1:0):HZ;G.hzo=null;if(REC&&G.hz)REC.hz=1}
function hzLabel(){const b=$('hzbtn');if(b){b.textContent='場景機關：'+(HZ?'開':'關');b.classList.toggle('on',!!HZ);b.title=HZN.join('\n')}}
// 火山：每 480 幀一次，前 60 幀地面發光預告，接著 30 幀岩漿柱；位置只由幀數決定（確定性）
const VC=480,vcX=n=>120+((n*7919+G.round*131)%720);
// 夜城強風：每 540 幀颳一次，前 60 幀預告，接著 90 幀把地面上的人往同一邊推；方向只由幀數決定
const WC=540,wdDir=n=>(n*5+G.round)%2?1:-1;
// 竹林道場鐘聲：每 720 幀響一次，雙方各加 15 氣
const BC=720;
function hzStep(){
 if(!G.hz||G.phase!=='fight')return;
 if(G.stage===3){const n=Math.floor(G.frame/VC),c=G.frame%VC,x=vcX(n);
  if(c===420){G.shake=Math.max(G.shake,10);noise(.5,.2,900,'lowpass',80)}
  if(c>=420&&c<450)for(const f of[p1,p2]){if(f.hzh===n||f.st==='ko'||f.st==='down'||(f.st==='dash'&&f.inv>0)||Math.abs(f.x-x)>48||f.y<GY-230)continue;
   f.hzh=n;f.hp=Math.max(1,f.hp-7);f.st='hit';f.atk=null;f.buf=null;f.stun=22;f.kd=1;f.vy=-12;f.vx=(f.x<x?-1:1)*2.5;f.flash=6;G.hitstop=Math.max(G.hitstop,5);if(!NOFX){emb(f.x,f.y-40,'#ff8a3a',16,6,18,4,2);spark(f.x,f.y-50,'#ffd27a',10)}sfx('hitbig')}}
 if(G.stage===0){const n=Math.floor(G.frame/WC),c=G.frame%WC;if(c>=420&&c<510){const dr=wdDir(n);for(const f of[p1,p2])if(f.y>=GY&&f.st!=='down'&&f.st!=='ko')f.x=Math.max(40,Math.min(W-40,f.x+dr*1.1))}if(c===420)noise(.9,.08,700,'bandpass',300)}
 if(G.stage===4&&G.frame%BC===BC-20){for(const f of[p1,p2])if(f.st!=='ko')f.mt=Math.min(100,f.mt+15);if(!NOFX){P({ring:1,x:W/2,y:96,c:'#ffe14d',l:30,rs:9,lw:5});pp({x:W/2,y:140,vx:0,vy:-.4,l:60,m:60,txt:'鐘聲：雙方氣 +15',c:'#ffe14d',text:1})}snd(196,1.4,'sine',.12,190);snd(392,1,'sine',.05,380)}
 if(G.stage===2)for(const f of[p1,p2])if(f.y>=GY&&(f.st==='hit'||f.st==='block'||f.st==='down'||f.st==='dash'||f.st==='atk')&&Math.abs(f.vx)>.3){f.x=Math.max(40,Math.min(W-40,f.x+f.vx*.45));if(!NOFX&&G.frame%4===0)P({t:'e',x:f.x,y:GY-2,vx:-f.vx*.3,vy:-.5,l:14,s:2.5,c:'#e8f6ff',g:.05,dr:.9})}
}
// 黃昏港：第一次在血量 60% 以下被撞牆，木箱牆碎裂，額外傷害並彈得更遠
function hzWall(f){if(!G.hz||G.stage!==1||G.wbk||f.hp>=f.ch.hp*(f.hm||1)*.6)return;G.wbk=f.x<W/2?1:2;f.hp=Math.max(1,f.hp-8);f.vx*=2.2;f.vy=-9;G.shake=Math.max(G.shake,16);G.hitstop=Math.max(G.hitstop,8);
 if(!NOFX){const wx=f.x<W/2?20:W-20;for(let i=0;i<14;i++)rok(wx,GY-30-Math.random()*90,(f.x<W/2?1:-1)*(2+Math.random()*5),-3-Math.random()*6,i%2?'#8a5a32':'#c08a4e');smk(wx,GY-40,30,'#a08060',30);pp({x:f.x,y:f.y-160,vx:0,vy:-.6,l:55,m:55,txt:'破牆！',c:'#ffb36b',text:1,big:1})}sfx('hitbig')}
function crate(x,y,s){ctx.fillStyle='#8a5a32';ctx.fillRect(x,y,s,s);ctx.strokeStyle='#2a1608';ctx.lineWidth=3;ctx.strokeRect(x+1.5,y+1.5,s-3,s-3);ctx.beginPath();ctx.moveTo(x+4,y+4);ctx.lineTo(x+s-4,y+s-4);ctx.moveTo(x+s-4,y+4);ctx.lineTo(x+4,y+s-4);ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#c08a4e55';ctx.fillRect(x+3,y+3,s-6,5)}
function hzDraw(){
 if(!G.hz||!p1)return;ctx.save();
 if(G.stage===1)[0,1].forEach(k=>{if(G.wbk===k+1)return;const x=k?W-44:0;crate(x,GY-44,44);crate(x,GY-88,44);crate(k?x+8:x-8,GY-124,36)});
 if(G.stage===0&&G.phase==='fight'){const n=Math.floor(G.frame/WC),c=G.frame%WC,dr=wdDir(n);if(c>=360&&c<510){const str=c<420?(c-360)/60*.35:1;ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(200,220,255,'+(.25*str)+')';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<18;i++){const y=140+((i*53)%300),x=((i*97+G.frame*(10+i%4*3)*dr)%(W+200)+W+200)%(W+200)-100;ctx.moveTo(x,y);ctx.lineTo(x-dr*(40+i%3*30)*str,y)}ctx.stroke();if(c<420){ctx.globalCompositeOperation='source-over';ctx.font='bold 18px '+FONT;ctx.textAlign='center';ctx.fillStyle='rgba(200,220,255,.8)';ctx.fillText(dr>0?'強風 ≫≫≫':'≪≪≪ 強風',W/2,170)}}}
 if(G.stage===4&&G.phase==='fight'){const c=G.frame%BC;if(c>=BC-80&&c<BC-20){const sw=Math.sin(c*.5)*.4*(c-(BC-80))/60;ctx.save();ctx.translate(W/2,104);ctx.rotate(sw);ctx.fillStyle='#c9a36b';ctx.strokeStyle='#2a1c10';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-12,0);ctx.quadraticCurveTo(-12,-18,0,-20);ctx.quadraticCurveTo(12,-18,12,0);ctx.lineTo(15,6);ctx.lineTo(-15,6);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}}
 if(G.stage===3&&G.phase==='fight'){const n=Math.floor(G.frame/VC),c=G.frame%VC,x=vcX(n);
  if(c>=360&&c<420){const a=(c-360)/60,fl=G.frame%8<4;ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,GY,2,x,GY,60);g.addColorStop(0,'rgba(255,170,60,'+(.35+a*.5)*(fl?1:.7)+')');g.addColorStop(1,'rgba(255,60,0,0)');ctx.fillStyle=g;ctx.fillRect(x-60,GY-30,120,40);if(!NOFX&&Math.random()<.4)emb(x+(Math.random()-.5)*60,GY-4,'#ff8a3a',1,2,14,3,2)}
  if(c>=420&&c<450){const e=c-420,h=Math.min(1,e/5)*(1-Math.max(0,e-22)/8)*260;ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(0,GY-h,0,GY);g.addColorStop(0,'rgba(255,220,120,0)');g.addColorStop(.3,'rgba(255,140,40,.85)');g.addColorStop(1,'rgba(255,240,180,.95)');ctx.fillStyle=g;const w=40+Math.sin(e*.9)*6;ctx.beginPath();ctx.moveTo(x-w,GY);ctx.quadraticCurveTo(x-w*.5,GY-h*.6,x-w*.25,GY-h);ctx.lineTo(x+w*.25,GY-h);ctx.quadraticCurveTo(x+w*.5,GY-h*.6,x+w,GY);ctx.fill();if(!NOFX&&e%2===0)emb(x,GY-h*.8,'#ffb050',3,5,22,4,3)}}
 ctx.restore()}
const now0=()=>performance.now();
$('hzbtn').onclick=()=>{HZ=HZ?0:1;try{localStorage.setItem('fd_hz',HZ)}catch(e){}hzLabel();snd(600,.06)};hzLabel();
