// ================= 新角色：雷、岩 =================
const CTR={d:20,su:2,ac:3,rc:18,r:84,h:-70,st:32,kb:14,launch:1,cn:4};
CH.push(
{n:'雷',ds:'遠攻・天雷',col:'#ffd23d',col2:'#fff3b0',spd:3.9,jmp:14.5,hp:102,w:1,mg:1.25,
 sp:{type:'proj',d:12,su:12,ac:1,rc:18,spd:13,cost:50},
 ex:{type:'strike',d:14,su:12,ac:1,rc:34,launch:1,ex:1,cost:100,name:'天雷陣',multi:1},
 sp2:{type:'strike',d:14,su:10,ac:1,rc:22,dist:230,launch:1,cost:50},
 mv:{hp:{r:88},hk:{r:116}},
 sp3:{d:13,su:5,ac:8,rc:22,r:72,h:-70,st:22,kb:11,around:1,inv:1,cost:50},
 asp:{type:'proj',d:11,su:5,ac:1,rc:14,spd:11,vy:7,cost:50}},
{n:'岩',ds:'投技・岩石',col:'#d08a48',col2:'#ffe0b8',spd:3.1,jmp:13,hp:118,w:1.3,kbr:.7,
 mv:{th:{r:78,d:21},th2:{r:78,d:20}},
 sp:{d:20,su:7,ac:9,rc:24,vx:8,r:64,h:-70,st:40,kb:9,throw:1,cost:50},
 ex:{d:40,su:5,ac:3,rc:32,r:84,h:-70,st:46,kb:12,throw:1,ex:1,cost:100,name:'大地崩壞'},
 sp2:{type:'proj',d:16,su:12,ac:1,rc:22,spd:7,vy:-9,gr:.42,knock:1,cost:50},
 sp3:{d:0,su:3,ac:22,rc:16,r:60,h:-70,st:0,kb:0,counter:1,cost:50},
 asp:{d:16,su:6,ac:40,rc:8,r:66,h:-24,st:26,kb:7,knock:1,air:1,dive:1,quake:1,cost:50}});
const QUO=['還不夠熱！','堅不可摧。','……影已逝。','雷光，一閃！','大地，不會動搖。'];
const pp=o=>NOFX||parts.push(o);
// ---- 同時命中：兩邊都打到就互相命中（不再由 P1 優先）
function resolveHits(){
 const h1=p1.ph,h2=p2.ph;p1.ph=null;p2.ph=null;
 const r1=h1&&p2.st!=='ko'?p2.getHit(p1,h1.a,h1.x):false;
 const r2=h2&&p1.st!=='ko'?p1.getHit(p2,h2.a,h2.x):false;
 if(r1&&p1.atk===h1.a)p1.hit=true;
 if(r2&&p2.atk===h2.a)p2.hit=true;
}
// ---- 場景
function bgKind(b,S,r){
 if(S.k==='volcano'){
  let g=b.createRadialGradient(640,GY,10,640,GY,420);g.addColorStop(0,'rgba(255,120,40,.55)');g.addColorStop(1,'rgba(255,60,20,0)');b.fillStyle=g;b.fillRect(0,0,W,GY);
  b.fillStyle=S.b[0];b.beginPath();b.moveTo(0,GY);for(let x=0;x<=W;x+=60)b.lineTo(x,GY-120-r()*120);b.lineTo(W,GY);b.closePath();b.fill();
  b.fillStyle=S.b[1];b.beginPath();b.moveTo(380,GY);b.lineTo(590,170);b.lineTo(690,170);b.lineTo(900,GY);b.closePath();b.fill();
  g=b.createRadialGradient(640,170,4,640,170,90);g.addColorStop(0,'rgba(255,220,120,.95)');g.addColorStop(.4,'rgba(255,110,30,.6)');g.addColorStop(1,'rgba(255,60,10,0)');b.fillStyle=g;b.fillRect(520,60,240,200);
  b.lineCap='round';b.lineJoin='round';for(let i=0;i<3;i++){const x0=612+i*28,s=(i-1)*.9;b.beginPath();b.moveTo(x0,174);b.bezierCurveTo(x0+s*40,250,x0+s*90+(r()-.5)*30,330,x0+s*150,GY-4);b.strokeStyle='rgba(255,90,20,.35)';b.lineWidth=16;b.stroke();b.strokeStyle='#e8501a';b.lineWidth=7;b.stroke();b.strokeStyle='#ffb347';b.lineWidth=2.5;b.stroke()}
  b.fillStyle=S.b[1];for(let i=0;i<9;i++){const x=r()*W,w=40+r()*80,h=20+r()*50;b.beginPath();b.moveTo(x,GY);b.lineTo(x+w*.3,GY-h);b.lineTo(x+w*.7,GY-h*.7);b.lineTo(x+w,GY);b.closePath();b.fill()}
 }else{
  let g=b.createLinearGradient(0,GY-220,0,GY);g.addColorStop(0,'rgba(220,255,200,0)');g.addColorStop(1,'rgba(220,255,200,.18)');b.fillStyle=g;b.fillRect(0,GY-220,W,220);
  for(let L=0;L<2;L++)for(let i=0;i<(L?16:24);i++){const x=r()*W,w=(L?14:8)+r()*(L?8:5);b.fillStyle=S.b[L];b.fillRect(x,0,w,GY);b.fillStyle='rgba(0,0,0,.25)';for(let y=30+r()*40;y<GY;y+=44+r()*20)b.fillRect(x-1,y,w+2,3);
   b.fillStyle=L?'#2f6b3a':'#24502c';for(let k=0;k<4;k++){const ly=40+r()*(GY-120),lx=x+w/2,s=r()<.5?-1:1;b.beginPath();b.ellipse(lx+s*14,ly,16,4,s*.5,0,6.3);b.fill()}}
  b.fillStyle='#4a321e';b.fillRect(0,GY-46,W,8);for(let x=10;x<W;x+=60){b.fillRect(x,GY-46,8,46)}b.fillStyle='#6a4a2c';b.fillRect(0,GY-46,W,3);
 }
}
// ---- 姿勢（出場、勝利、超必殺肖像）
function POSE(li,pz,f){const s=Math.sin(G.frame*.15);
 if(pz==='sup')return[-50,-100,[30,0],[-30,0],[74,-96],[-18,-84],16];
 if(pz==='win')switch(li){
  case 0:return[-52,-98,[18,0],[-18,0],[18,-150+s*5],[26,-74],2];
  case 1:return[-52,-99+s,[22,0],[-22,0],[14,-92],[16,-88],0];
  case 2:return[-50,-97,[16,0],[-16,0],[12,-98],[14,-94],-4];
  case 3:return[-52,-99,[18,0],[-18,0],[24,-152+s*4],[-16,-150-s*4],0];
  default:return[-44,-92+s*2,[30,0],[-30,0],[34,-114],[-24,-114],0]}
 switch(li){
  case 0:return[-50,-96,[22,0],[-20,0],[22,-146],[26,-76],4];
  case 1:return[-50,-97,[24,0],[-24,0],[12,-92],[16,-88],0];
  case 2:return[-42,-86,[26,0],[-26,0],[14,-112],[18,-106],6];
  case 3:return[-52,-98,[18,0],[-18,0],[8,-150],[30,-80],0];
  default:return[-38,-84,[34,0],[-34,0],[40,-66],[30,-58],4]}}
// ---- 新特效
function boltFx(p){P({t:'bolt',x:p.x,l:12,w:p.a.ex?1.6:1});emb(p.x,GY-10,'#fff3b0',10,6,16,4,1);P({ring:1,flat:1,x:p.x,y:GY-2,c:'#ffe680',l:14,rs:6,lw:4});sfx('thunder');G.shake=Math.max(G.shake,p.a.ex?7:4)}
function ctrFx(f){pp({x:f.x,y:f.y-145,vx:0,vy:-.6,l:55,m:55,txt:'反擊！',c:'#ffe0b8',text:1,big:1});P({ring:1,x:f.x+f.dir*24,y:f.y-70,c:'#ffe0b8',l:16,rs:6,lw:6});for(let i=0;i<8;i++)rok(f.x+f.dir*24,f.y-70,rr_(-4,4),-rr_(1,5),'#a8784a');sfx('counter')}
function bolt(x,y0,y1,al,w){const pts=[[x,y0]];let cx=x;for(let y=y0+30;y<y1;y+=30){cx=x+(Math.random()-.5)*36*w;pts.push([cx,y])}pts.push([x,y1]);
 ctx.save();ctx.globalAlpha=al;ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';ctx.lineCap='round';
 const path=()=>{ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]))};
 ctx.strokeStyle='rgba(255,220,80,.35)';ctx.lineWidth=26*w;path();ctx.stroke();
 ctx.strokeStyle='#ffe680';ctx.lineWidth=8*w;path();ctx.stroke();
 ctx.strokeStyle='#ffffff';ctx.lineWidth=3*w;path();ctx.stroke();
 ctx.strokeStyle='#8fe8ff';ctx.lineWidth=2;for(let i=2;i<pts.length-1;i+=3){const q=pts[i],s=Math.random()<.5?-1:1;ctx.beginPath();ctx.moveTo(q[0],q[1]);ctx.lineTo(q[0]+s*30,q[1]+22);ctx.lineTo(q[0]+s*44,q[1]+50);ctx.stroke()}
 ctx.restore()}
function drawRai(p){
 if(p.strike){
  if(p.wait>0){const k=(G.frame%8)<4,a=.35+.4*(1-p.wait/30);ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=k?'#ffe680':'#8fe8ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(p.x,GY-2,30,7,0,0,6.3);ctx.stroke();
   const g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'rgba(255,230,120,.25)');g.addColorStop(1,'rgba(255,230,120,0)');ctx.fillStyle=g;ctx.fillRect(p.x-18,0,36,GY);ctx.restore()}
  else{ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,230,120,.35)';ctx.beginPath();ctx.ellipse(p.x,GY-2,44,10,0,0,6.3);ctx.fill();ctx.restore()}
  return}
 const ang=Math.atan2(p.vy||0,p.vx);
 if(p.k==='asp'){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ang);ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#ffe680';ctx.lineWidth=5;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(-34,0);for(let i=1;i<=5;i++)ctx.lineTo(-34+i*8,(i%2?-6:6));ctx.lineTo(14,0);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(8,-7);ctx.lineTo(8,7);ctx.closePath();ctx.fill();ctx.restore();return}
 ctx.save();ctx.globalCompositeOperation='lighter';const r=13;
 const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*2.2);g.addColorStop(0,'#ffffff');g.addColorStop(.3,'#fff3b0');g.addColorStop(.6,'rgba(255,210,61,.6)');g.addColorStop(1,'rgba(143,232,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,r*2.2,0,6.3);ctx.fill();
 ctx.strokeStyle='#8fe8ff';ctx.lineWidth=1.6;for(let i=0;i<4;i++){const a=Math.random()*6.28;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+Math.cos(a)*r*1.2+(Math.random()-.5)*8,p.y+Math.sin(a)*r*1.2+(Math.random()-.5)*8);ctx.lineTo(p.x+Math.cos(a)*r*2.3,p.y+Math.sin(a)*r*2.3);ctx.stroke()}
 ctx.strokeStyle='rgba(255,230,120,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*3,p.y+(Math.random()-.5)*8);ctx.lineTo(p.x-p.vx*5,p.y);ctx.stroke();ctx.restore()}
function drawIwa(p){
 if(p.k==='qk'){quake(p,.55);return}
 const rot=p.x*.05,r=17;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(rot);ctx.beginPath();
 const pts=[[1,0],[.7,.72],[-.1,1],[-.78,.6],[-1,-.1],[-.55,-.85],[.3,-.95],[.85,-.5]];pts.forEach((q,i)=>i?ctx.lineTo(q[0]*r,q[1]*r):ctx.moveTo(q[0]*r,q[1]*r));ctx.closePath();
 const g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#c9a07a');g.addColorStop(1,'#5a3e26');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#1e140c';ctx.lineWidth=2.4;ctx.stroke();
 ctx.strokeStyle='rgba(30,20,12,.7)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-6,-8);ctx.lineTo(2,0);ctx.lineTo(-2,8);ctx.moveTo(2,0);ctx.lineTo(10,-2);ctx.stroke();
 ctx.fillStyle='rgba(255,240,210,.35)';ctx.beginPath();ctx.ellipse(-5,-7,5,3,-.6,0,6.3);ctx.fill();ctx.restore()}
// ---- 超必殺專屬演出
function supPattern(ci,t,e){
 ctx.save();
 if(ci===0){ctx.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const x=-W/2-80+i*70+((t*260)%70),h=60+((i*37)%50)+Math.sin(t*12+i)*18;const g=ctx.createLinearGradient(0,82,0,82-h-60);g.addColorStop(0,'rgba(255,90,20,.9)');g.addColorStop(.6,'rgba(255,200,60,.5)');g.addColorStop(1,'rgba(255,240,160,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-26,82);ctx.quadraticCurveTo(x-10,82-h,x+Math.sin(t*9+i)*8,82-h-60);ctx.quadraticCurveTo(x+12,82-h,x+26,82);ctx.closePath();ctx.fill()}}
 else if(ci===1){ctx.strokeStyle='rgba(220,235,255,.18)';ctx.lineWidth=1;for(let y=-80;y<82;y+=6){ctx.beginPath();ctx.moveTo(-W,y);ctx.lineTo(W,y);ctx.stroke()}ctx.fillStyle='rgba(20,30,50,.55)';for(let x=-W/2;x<W/2;x+=160){ctx.fillRect(x,-82,4,164)}ctx.fillStyle='#cfe0ff';for(let x=-W/2+20;x<W/2;x+=80){ctx.beginPath();ctx.arc(x,-68,3,0,6.3);ctx.arc(x,68,3,0,6.3);ctx.fill()}ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(127,214,255,.6)';ctx.lineWidth=3;for(let i=0;i<6;i++){const y=-60+i*24,x=((t*900+i*190)%(W+400))-W/2-200;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+180,y-14);ctx.stroke()}}
 else if(ci===2){ctx.fillStyle='rgba(243,232,255,.9)';ctx.beginPath();ctx.arc(120,-10,120,0,6.3);ctx.fill();ctx.fillStyle='rgba(20,10,40,1)';ctx.beginPath();ctx.arc(160,-30,112,0,6.3);ctx.fill();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=0;i<7;i++){const p=((t*1.6+i*.21)%1),x=-W/2+p*(W+200)-100;ctx.strokeStyle=i%2?'#e3ccff':'#b46bff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,-70+i*20);ctx.lineTo(x+150,-90+i*20);ctx.stroke()}}
 else if(ci===3){ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){if(((t*14+i*3)|0)%3===0)continue;const x0=-W/2+60+i*190+(Math.random()-.5)*30;ctx.strokeStyle='#ffe680';ctx.lineWidth=4;ctx.beginPath();let x=x0;ctx.moveTo(x,-82);for(let y=-60;y<=82;y+=20){x=x0+(Math.random()-.5)*40;ctx.lineTo(x,y)}ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke()}}
 else{for(let i=0;i<16;i++){const p=((t*.9+i*.13)%1),a=i*2.4,x=Math.cos(a)*p*W*.6,y=Math.sin(a)*p*120,s=8+((i*7)%14);ctx.save();ctx.translate(x,y);ctx.rotate(t*3+i);ctx.fillStyle=i%2?'#a8784a':'#6a4a2a';ctx.strokeStyle='#1e140c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-s,0);ctx.lineTo(-s*.3,-s);ctx.lineTo(s,-s*.4);ctx.lineTo(s*.6,s*.8);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}ctx.strokeStyle='rgba(30,20,12,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-W/2,40);for(let x=-W/2;x<W/2;x+=40)ctx.lineTo(x,40+(((x*13)|0)%17)-8);ctx.stroke()}
 ctx.restore()}
function portrait(ch,pose,x,y,sc,dir){ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);ctx.translate(0,-GY);drawF({x:0,y:GY,dir,ch,st:'idle',pose,mt:0,flash:0,tr:[],ns:1,kt:0,atk:null,t:0,lt:G.frame});ctx.restore()}
function supCine(k){
 const ci=G.supCh|0,ch=CH[ci],e=1-k,al=Math.min(1,k*4),sd=G.supSide?-1:1,t=performance.now()/1000;
 ctx.save();ctx.fillStyle=`rgba(0,0,0,${.62*Math.min(1,k*3)})`;ctx.fillRect(0,0,W,H);
 ctx.globalAlpha=al;ctx.translate(W/2,H/2-30);ctx.rotate(-.08*sd);
 ctx.save();ctx.beginPath();ctx.rect(-W,-82,W*2,164);ctx.clip();
 const g=ctx.createLinearGradient(-W/2,0,W/2,0);g.addColorStop(0,'#05050c');g.addColorStop(.5,ch.col);g.addColorStop(1,'#05050c');ctx.fillStyle=g;ctx.fillRect(-W,-82,W*2,164);
 supPattern(ci,t,e);
 portrait(ch,'sup',-sd*(250-e*50),225,2.1,sd);
 ctx.restore();
 ctx.fillStyle='#fff';ctx.fillRect(-W,-84,W*2,3);ctx.fillRect(-W,81,W*2,3);
 ctx.textAlign='center';ctx.font='900 70px '+FONT;ctx.lineWidth=9;ctx.strokeStyle='#000';ctx.lineJoin='round';const tx=sd*(130-e*30);ctx.strokeText(G.supName,tx,26);ctx.fillStyle='#fff';ctx.fillText(G.supName,tx,26);
 ctx.font='bold 18px '+FONT;ctx.fillStyle=ch.col2;ctx.fillText(ch.n+'・超必殺',tx,58);
 ctx.restore()}
// ---- 出場（VS）畫面
function vsScreen(){
 const t=110-G.vs,e=Math.min(1,t/16),o=Math.min(1,G.vs/12);
 ctx.save();ctx.globalAlpha=o;ctx.fillStyle='#07070f';ctx.fillRect(0,0,W,H);
 [[p1,1,0],[p2,-1,1]].forEach(([f,sd,i])=>{
  ctx.save();ctx.beginPath();if(!i){ctx.moveTo(0,0);ctx.lineTo(W/2+56,0);ctx.lineTo(W/2-64,H);ctx.lineTo(0,H)}else{ctx.moveTo(W,0);ctx.lineTo(W/2+64,0);ctx.lineTo(W/2-56,H);ctx.lineTo(W,H)}ctx.closePath();ctx.clip();
  const g=ctx.createLinearGradient(i?W:0,0,W/2,0);g.addColorStop(0,f.ch.col);g.addColorStop(1,'#07070f');ctx.globalAlpha=o*.8;ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=o;
  ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=2;for(let k=0;k<14;k++){const y=(k*41+t*(i?-9:9))%H;ctx.beginPath();ctx.moveTo(0,(y+H)%H);ctx.lineTo(W,(y+H)%H);ctx.stroke()}
  portrait(f.ch,'intro',(i?W*.75:W*.25)+(1-e)*(i?300:-300),H+70,2.8,sd);
  ctx.restore();
  ctx.textAlign=i?'right':'left';const nx=i?W-40:40;
  ctx.font='900 72px '+FONT;ctx.lineWidth=8;ctx.strokeStyle='#000';ctx.lineJoin='round';ctx.strokeText(f.ch.n,nx,116);ctx.fillStyle='#fff';ctx.fillText(f.ch.n,nx,116);
  ctx.font='bold 20px '+FONT;ctx.fillStyle=f.ch.col2;ctx.fillText(f.ch.ds,nx,148);
  ctx.font='bold 16px '+FONT;ctx.fillStyle='#ffffffaa';ctx.fillText(i?(G.mode===1?'電腦':G.mode===4?'對手':'P2'):'P1',nx,56);
 });
 const pop=1+Math.max(0,1-t/10)*1.4;ctx.save();ctx.translate(W/2,H/2);ctx.scale(pop,pop);ctx.rotate(-.12);ctx.font='italic 900 120px '+FONT;ctx.textAlign='center';ctx.lineWidth=14;ctx.strokeStyle='#000';ctx.strokeText('VS',0,40);const vg=ctx.createLinearGradient(0,-50,0,40);vg.addColorStop(0,'#fff27a');vg.addColorStop(1,'#ff4d4d');ctx.fillStyle=vg;ctx.fillText('VS',0,40);ctx.restore();
 ctx.textAlign='center';ctx.font='bold 18px '+FONT;ctx.fillStyle='#fff';ctx.fillText('場景：'+STG[G.stage].n+(G.mode!==4?'　　Enter 跳過':''),W/2,H-24);
 ctx.restore()}
function quote(f){
 const li=Math.max(0,CH.indexOf(f.ch)),s=QUO[li],x=f.x,y=f.y-178;
 ctx.save();ctx.font='bold 18px '+FONT;const w=ctx.measureText(s).width+28,h=36,l=x-w/2;
 ctx.fillStyle='#fff';ctx.strokeStyle='#0c0c1c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(l+12,y);ctx.lineTo(l+w-12,y);ctx.arcTo(l+w,y,l+w,y+12,12);ctx.lineTo(l+w,y+h-12);ctx.arcTo(l+w,y+h,l+w-12,y+h,12);ctx.lineTo(x+8,y+h);ctx.lineTo(x,y+h+10);ctx.lineTo(x-6,y+h);ctx.lineTo(l+12,y+h);ctx.arcTo(l,y+h,l,y+h-12,12);ctx.lineTo(l,y+12);ctx.arcTo(l,y,l+12,y,12);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#111';ctx.textAlign='center';ctx.fillText(s,x,y+24);ctx.restore()}

