const LOOK=[
 {skin:'#f0c09a',top:'#e8473b',dk:'#9c2219',top2:'#ffffff',ua:'#f0c09a',fa:'#b02a22',hand:'#b02a22',th:'#2b2d42',sn:'#2b2d42',shoe:'#f4f4f4',belt:'#ffd23d',hair:'#ff6a3d',hb:'#ffffff'},
 {skin:'#d9a37a',top:'#3c6fd1',dk:'#223f80',top2:'#9db8e8',ua:'#9db8e8',fa:'#7e8aa3',hand:'#7e8aa3',th:'#1d2a44',sn:'#2a3350',shoe:'#2a3350',belt:'#8892a6',hair:'#2b2b35',hb:'#8892a6'},
 {skin:'#e8c9a8',top:'#5a3aa8',dk:'#341f6b',top2:'#b46bff',ua:'#5a3aa8',fa:'#2b1b4f',hand:'#2b1b4f',th:'#5a3aa8',sn:'#2b1b4f',shoe:'#1b1233',belt:'#b46bff',hair:'#1b1233',hb:'#b46bff'},
 {skin:'#f2c79e',top:'#2a2f4a',dk:'#151829',top2:'#ffd23d',ua:'#2a2f4a',fa:'#ffd23d',hand:'#ffe680',th:'#1c2033',sn:'#1c2033',shoe:'#ffd23d',belt:'#ffd23d',hair:'#f4f6ff',hb:'#8fe8ff'},
 {skin:'#b97a52',top:'#7a4f2a',dk:'#4a2e16',top2:'#e0b070',ua:'#b97a52',fa:'#b97a52',hand:'#efdcb8',th:'#5a4632',sn:'#5a4632',shoe:'#2a1e14',belt:'#e0b070',hair:'#1e1a16',hb:'#c0392b'}
];
const IK=(A,B,l1,l2,s)=>{const dx=B[0]-A[0],dy=B[1]-A[1],dd=Math.hypot(dx,dy)||1;if(dd>=l1+l2-.5)return[A[0]+dx*l1/(l1+l2),A[1]+dy*l1/(l1+l2)];const a=(l1*l1-l2*l2+dd*dd)/(2*dd),h=Math.sqrt(Math.max(0,l1*l1-a*a));return[A[0]+dx*a/dd-dy/dd*h*s,A[1]+dy*a/dd+dx/dd*h*s]};
function drawF(f){
 const d=f.dir,ch=f.ch,w=ch.w,li=Math.max(0,CH.indexOf(ch)),L=LOOK[li],GA=ctx.globalAlpha,fl=f.flash>0||!!f.tint,C=c=>f.tint||(fl?'#fff':c),OUT='#0c0c1c';
 if(!f.ns){ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(f.x,GY+3,Math.max(10,30-(GY-f.y)*.08),7,0,0,6.3);ctx.fill()}
 ctx.save();ctx.translate(f.x+(f.st==='hit'&&G.hitstop>0?(Math.random()-.5)*6:0),f.y);
 if(f.st==='ko')ctx.rotate(-d*Math.min(1.5,f.kt*.1));
 if(f.st==='down')ctx.rotate(-d*1.5*Math.min(1,f.dt/16));
 ctx.lineCap='round';ctx.lineJoin='round';
 let hip=-52,sh=-98+Math.sin(G.frame*.12)*1.5,ln=0,ff=[16,0],bf=[-16,0],fh=[34,-84],bh=[22,-72],kl=0,trk=null;
 const a=f.atk;
 if(f.st==='walk'){const s=Math.sin(f.walk)*16,c=Math.cos(f.walk);ff=[14+s,-Math.max(0,c)*8];bf=[-14-s,-Math.max(0,-c)*8];sh+=Math.abs(Math.sin(f.walk))*-1.5}
 if(f.y<GY-2){ff=[24,-28];bf=[-4,-14]}
 if(f.st==='block'){hip=-42;sh=-84;ff=[26,0];bf=[-22,0];fh=[24,-104];bh=[14,-92]}
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
 {const pz=f.pose||(f.st==='win'?'win':(G.phase==='intro'&&f.st==='idle'&&G.pt>20?'intro':null));if(pz){const q=POSE(li,pz,f);hip=q[0];sh=q[1];ff=q[2];bf=q[3];fh=q[4];bh=q[5];ln=q[6]}}
 if(f.st==='atk'&&f.hit&&a&&a.cn&&f.t>a.su){ctx.save();ctx.strokeStyle='#7fe3ff';ctx.globalAlpha=.35+.3*Math.sin(G.frame*.9);ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-58,40,76,0,0,6.3);ctx.stroke();ctx.restore()}
 // 氣槽光環
 if(f.mt>=50&&f.st!=='ko'){const hi=f.mt>=100,pu=.7+.3*Math.sin(G.frame*.25);ctx.globalAlpha=(hi?.28:.13)*pu;ctx.fillStyle=ch.col;ctx.beginPath();ctx.ellipse(0,-58,hi?44:37,hi?84:76,0,0,6.3);ctx.fill();ctx.globalAlpha=1}
 const R=p=>[p[0]*d,p[1]];
 const seg=(p,q,wd,c)=>{ctx.strokeStyle=OUT;ctx.lineWidth=wd*w+3;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();ctx.strokeStyle=C(c);ctx.lineWidth=wd*w;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()};
 const arm=(sx,hnd)=>{const A=[ln+sx,sh+3],E=IK(A,hnd,24,24,1),Sl=R(A),El=R(E),H=R(hnd);seg(Sl,El,9,L.ua);seg(El,H,8,L.fa);ctx.fillStyle=C(L.hand);ctx.strokeStyle=OUT;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(H[0],H[1],5.5*w,0,6.3);ctx.fill();ctx.stroke()};
 const leg=(foot,back)=>{const Hh=[back?-3:3,hip],K=IK(Hh,foot,28,28,-1),Hl=R(Hh),Kl=R(K),F=R(foot);seg(Hl,Kl,12,L.th);seg(Kl,F,10,L.sn);seg(F,[F[0]+d*11,F[1]-2],7,L.shoe)};
 const HPl=[0,hip],SHl=[ln*d,sh];let vx=SHl[0]-HPl[0],vy=SHl[1]-HPl[1];const tl=Math.hypot(vx,vy)||1;vx/=tl;vy/=tl;
 const nx=-vy,ny=vx,hw=10*w,sw=13.5*w;
 const hx=ln*d*1.2,hy=sh-17,hr=li===1?15:li===2?13:li===4?16:14;
 const poly=(pts,fill,ox,oy)=>{ctx.beginPath();pts.forEach((p,i)=>{const X=ox+p[0]*d,Y=oy+p[1];i?ctx.lineTo(X,Y):ctx.moveTo(X,Y)});ctx.closePath();ctx.fillStyle=C(fill);ctx.fill();ctx.strokeStyle=OUT;ctx.lineWidth=1.8;ctx.stroke()};
 // 影的圍巾(在身後)
 if(li===2){const sx0=SHl[0],sy0=sh+2,wv=G.frame*.25-(f.vx||0)*.1;ctx.strokeStyle=OUT;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(sx0,sy0);ctx.quadraticCurveTo(sx0-d*22,sy0+8+Math.sin(wv)*4,sx0-d*44,sy0+2+Math.sin(wv+1)*7);ctx.stroke();ctx.strokeStyle=C(L.belt);ctx.lineWidth=6;ctx.stroke()}
 // 後側手腳
 ctx.globalAlpha=GA*.8;arm(-3,bh);leg(bf,1);ctx.globalAlpha=GA;
 // 軀幹
 const tp=[[HPl[0]+nx*hw,HPl[1]+ny*hw],[SHl[0]+nx*sw,SHl[1]+ny*sw],[SHl[0]-nx*sw,SHl[1]-ny*sw],[HPl[0]-nx*hw,HPl[1]-ny*hw]];
 const gr=ctx.createLinearGradient(SHl[0]+d*sw,sh,SHl[0]-d*sw,sh);gr.addColorStop(0,C(L.top));gr.addColorStop(1,C(L.dk));
 ctx.beginPath();tp.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=gr;ctx.fill();ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.stroke();
 const fi=d*nx>=0?[1,0]:[2,3],cx=(HPl[0]+SHl[0])/2,cy=(hip+sh)/2;
 if(!fl){
  if(li===0){ctx.strokeStyle=L.top2;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(tp[fi[0]][0],tp[fi[0]][1]);ctx.lineTo(tp[fi[1]][0],tp[fi[1]][1]);ctx.stroke();ctx.fillStyle='#ffd23d';ctx.beginPath();ctx.moveTo(cx+d*2,cy-8);ctx.lineTo(cx+d*8,cy+4);ctx.lineTo(cx-d*4,cy+4);ctx.closePath();ctx.fill()}
  else if(li===1){ctx.strokeStyle=L.top2;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]+8);ctx.lineTo(tp[2][0],tp[2][1]+8);ctx.moveTo(tp[0][0],tp[0][1]-8);ctx.lineTo(tp[3][0],tp[3][1]-8);ctx.stroke();ctx.save();ctx.shadowColor='#7fd6ff';ctx.shadowBlur=8;ctx.fillStyle='#bff0ff';ctx.beginPath();ctx.arc(cx+d*2,cy-2,4.5,0,6.3);ctx.fill();ctx.restore()}
  else if(li===2){ctx.strokeStyle=L.top2;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]+4);ctx.lineTo(tp[3][0],tp[3][1]-6);ctx.moveTo(tp[2][0],tp[2][1]+4);ctx.lineTo(tp[0][0],tp[0][1]-6);ctx.stroke()}
  else if(li===3){ctx.strokeStyle=L.top2;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(tp[1][0],tp[1][1]);ctx.lineTo(tp[2][0],tp[2][1]);ctx.stroke();ctx.save();ctx.shadowColor='#ffd23d';ctx.shadowBlur=8;ctx.strokeStyle='#ffd23d';ctx.lineWidth=3;ctx.lineJoin='miter';ctx.beginPath();ctx.moveTo(cx+d*4,cy-13);ctx.lineTo(cx-d*3,cy-1);ctx.lineTo(cx+d*3,cy-1);ctx.lineTo(cx-d*4,cy+12);ctx.stroke();ctx.restore()}
  else{seg([SHl[0],sh+4],[HPl[0],hip-4],7,L.skin);ctx.strokeStyle='rgba(60,30,10,.5)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(cx-d*2,cy-8);ctx.lineTo(cx+d*3,cy-4);ctx.stroke()}
 }
 // 腰帶
 seg(tp[0],tp[3],5,L.belt);if(li===4&&!fl){seg(tp[0],tp[3],9,L.belt);ctx.strokeStyle='rgba(90,60,20,.7)';ctx.lineWidth=1.5;for(let q=.15;q<1;q+=.2){const bx=tp[0][0]+(tp[3][0]-tp[0][0])*q,by=tp[0][1]+(tp[3][1]-tp[0][1])*q;ctx.beginPath();ctx.moveTo(bx-3,by-4);ctx.lineTo(bx+3,by+4);ctx.stroke()}}
 if(li!==1){const bw=Math.sin(G.frame*.3)*3;seg([HPl[0]-d*6,hip+1],[HPl[0]-d*(14+bw),hip+10+bw],3.5,L.belt);seg([HPl[0]-d*6,hip+1],[HPl[0]-d*(8+bw),hip+13],3.5,L.belt)}
 // 前側腿
 leg(ff,0);
 // 脖子與頭
 seg(SHl,[hx,hy+8],6,L.skin);
 ctx.fillStyle=C(li===2?L.hair:L.skin);ctx.strokeStyle=li===2?'#7b57d6':OUT;ctx.lineWidth=2;ctx.beginPath();ctx.arc(hx,hy,hr,0,6.3);ctx.fill();ctx.stroke();
 const ko=f.st==='ko'||f.st==='down',hit=f.st==='hit';
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
 }else{
  const wv=Math.sin(G.frame*.25);seg([hx-d*11,hy-7],[hx-d*(24+wv*3),hy-4+wv*3],5,L.hair);seg([hx-d*(24+wv*3),hy-4+wv*3],[hx-d*(32+wv*4),hy+5+wv*4],4,L.hair);
  seg([hx-d*13,hy-6],[hx+d*13,hy-6],4,L.hb);
  ctx.strokeStyle=C(L.skin);ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(hx+d*2,hy-1);ctx.lineTo(hx+d*12,hy-1);ctx.stroke()
 }
 if(!fl){
  const ex=hx+d*(li===2?9:7),ey=hy-1;
  if(ko){ctx.strokeStyle='#111';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(ex-3,ey-3);ctx.lineTo(ex+3,ey+3);ctx.moveTo(ex+3,ey-3);ctx.lineTo(ex-3,ey+3);ctx.stroke()}
  else if(hit){ctx.strokeStyle='#111';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ex-d*3,ey-3);ctx.lineTo(ex+d*2,ey);ctx.lineTo(ex-d*3,ey+3);ctx.stroke()}
  else if(li===2){ctx.save();ctx.shadowColor='#e3ccff';ctx.shadowBlur=8;ctx.fillStyle='#f3e8ff';ctx.beginPath();ctx.ellipse(ex,ey,3.6,2.1,0,0,6.3);ctx.fill();ctx.restore()}
  else{ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(ex,ey,3.6,4.2,0,0,6.3);ctx.fill();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(ex+d*1.4,ey,1.9,0,6.3);ctx.fill();ctx.strokeStyle='#111';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ex-d*4,ey-6-(f.st==='atk'?1:0));ctx.lineTo(ex+d*5,ey-4-(f.st==='atk'?3:0));ctx.stroke()}
  if(li!==2&&!ko){const mx=hx+d*8,my=hy+7;ctx.fillStyle='#7a1f1f';ctx.strokeStyle='#111';ctx.lineWidth=1.5;if(hit||f.st==='atk'){ctx.beginPath();ctx.ellipse(mx,my,3,hit?3.2:2.4,0,0,6.3);ctx.fill();ctx.stroke()}else{ctx.beginPath();ctx.moveTo(mx-3,my);ctx.lineTo(mx+3,my);ctx.stroke()}}
 }
 if(li===4&&!fl&&!(f.st==='ko'||f.st==='down'))poly([[-8,3],[-2,13],[8,16],[15,10],[16,3],[11,8],[4,9],[-2,7]],'#2a2018',hx,hy);
 // 肩甲(鋼)
 if(li===1){ctx.fillStyle=C(L.top2);ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.beginPath();ctx.arc(SHl[0],sh+3,10.5,0,6.3);ctx.fill();ctx.stroke()}
 // 前側手
 arm(3,fh);
 ctx.restore();
 // 攻擊揮動軌跡
 const T=f.tr||(f.tr=[]);
 if(G.phase==='intro')T.length=0;
 if(f.lt!==G.frame){f.lt=G.frame;if(trk)T.push(trk);else if(T.length)T.shift();if(T.length>7)T.shift()}
 if(T.length>1){ctx.save();ctx.lineCap='round';ctx.shadowColor=ch.col;ctx.shadowBlur=14;for(let i=1;i<T.length;i++){ctx.globalAlpha=i/T.length*.75;ctx.strokeStyle=ch.col2;ctx.lineWidth=2+i*1.6;ctx.beginPath();ctx.moveTo(T[i-1][0],T[i-1][1]);ctx.lineTo(T[i][0],T[i][1]);ctx.stroke()}ctx.restore()}
 if(f.st==='dash'&&!f.tint){ctx.save();ctx.fillStyle=ch.col2;for(let i=0;i<4;i++){ctx.globalAlpha=.32-i*.07;ctx.fillRect(f.x-f.dd*(22+i*16)-(f.dd>0?36:0),f.y-100+i*24,36,3)}ctx.restore()}
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
 ctx.save();
 if(G.shake>.5)ctx.translate((Math.random()-.5)*G.shake,(Math.random()-.5)*G.shake);
 const z=G.cam.z,l=Math.max(0,Math.min(W-W/z,G.cam.cx-W/(2*z)));
 ctx.scale(z,z);ctx.translate(-l,-(H-H/z));
 ctx.drawImage(bg,0,0);amb();
 if(p1){
  [p1,p2].sort((a,b)=>(b.st==='ko'||b.st==='down')-(a.st==='ko'||a.st==='down')).forEach(drawF);
  for(const p of projs)drawProj(p);
  for(const p of parts)drawParticle(p);
  ctx.globalAlpha=1;
  if(G.hb)drawBoxes();
  if(G.win>=0&&(G.phase==='over'||(G.phase==='ko'&&G.pt<100))){const wf=G.win?p2:p1;if(wf.st==='win')quote(wf)}
 }
 ctx.restore();
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

