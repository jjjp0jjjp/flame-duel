// ===== 基本技的專屬動作與揮擊特效 =====
// ANIM[名稱](a, e, p, f, hip, sh) → 這一幀的姿勢（座標以角色腳底為原點，x 朝前、y 朝上為負）
//   e：伸展量（起手前段為負＝往後收，命中瞬間 1 左右，收招時遞減）；p：攻擊判定期間的進度 0～1
const DEG=Math.PI/180;
const at=(cx,cy,R,deg)=>[cx+R*Math.cos(deg*DEG),cy+R*Math.sin(deg*DEG)];
const lerpN=(a,b,t)=>a+(b-a)*t;
// 沿弧線揮動：起手時停在 from（收在身邊），判定期間從 from 掃到 to，收招時沿 to 方向縮回
function sweep(a,e,p,from,to,k,base){const ang=p>0?lerpN(from,to,p):from,R=a.r*k*(p>0?Math.max(.4,Math.min(1,e)):.45+.15*Math.max(0,e));return at(base[0],base[1],R,ang)}
const ANIM={
 // ---- 拳類
 jab:(a,e)=>({fh:[30+(a.r-30)*e,-86],bh:[16,-80],ln:6*e}),
 straight:(a,e)=>({fh:[30+(a.r-30)*e,-88],bh:[-4,-82],ln:14*e,ff:[22+8*e,0]}),
 elbow:(a,e)=>({fh:[20+(a.r-40)*Math.max(0,e),-92],bh:[8,-76],ln:18*e,ff:[24+10*e,0]}),
 palm:(a,e)=>({fh:[28+(a.r-28)*e,-86],bh:[22+(a.r-40)*e,-70],ln:12*e,hip:-50,ff:[24,0],bf:[-20,0]}),
 double:(a,e,p,f)=>{const n=Math.floor(Math.max(0,f.t-a.su-1)/(a.gap||4))%2,x=30+(a.r-30)*e,y=-84;return n?{fh:[18,-80],bh:[x,y+4],ln:10*e}:{fh:[x,y],bh:[16,-78],ln:10*e}},
 hook:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-130,-5,.9,[0,sh+4]),bh:[10,-80],ln:10*e}),
 hammer:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-115,40,.95,[4,sh]),bh:sweep(a,e,p,-120,35,.85,[0,sh]),ln:16*e,hip:-48+(p>0?4*p:0)}),
 upper:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,55,-80,.95,[6,sh+10]),bh:[12,-78],ln:6*e,hip:-46-6*p,sh:sh-6*p}),
 claw:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-75,45,.95,[2,sh]),bh:sweep(a,e,Math.max(0,p-.25),-80,40,.8,[0,sh]),ln:16*e}),
 bite:(a,e)=>({fh:[24+(a.r-24)*e,-74],bh:[16+(a.r-34)*e,-62],ln:26*e,hip:-44,sh:-86,ff:[28,0],bf:[-24,0]}),
 slash:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-110,35,.85,[0,sh]),bh:sweep(a,e,p,-112,32,.7,[0,sh]),ln:14*e}),
 rslash:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,45,-75,.9,[0,sh+6]),bh:sweep(a,e,p,40,-80,.75,[0,sh+6]),ln:8*e,hip:-46,sh:sh-4}),
 thrust:(a,e)=>({fh:[30+(a.r-60)*e,-80],bh:[6+(a.r-80)*e,-78],ln:22*e,ff:[26+14*e,0],bf:[-22,0]}),
 swing:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-100,20,.75,[0,sh]),bh:sweep(a,e,p,-105,18,.6,[0,sh]),ln:12*e}),
 staffsweep:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-10,60,.8,[0,-70]),bh:sweep(a,e,p,-5,55,.62,[0,-70]),hip:-34,sh:-74,ln:14*e,ff:[26,0],bf:[-26,0]}),
 fan:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-60,20,.9,[0,sh]),bh:sweep(a,e,p,40,-30,.7,[0,sh]),ln:8*e}),
 bowswing:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,50,-60,.85,[0,sh]),bh:[14,-82],ln:10*e}),
 // ---- 腳類（kl:1 表示用腳）
 front:(a,e)=>({kl:1,ff:[18+(a.r-18)*e,Math.min(-24,(a.h||-50)*e)],ln:-4*e}),
 round:(a,e,p,f,hip)=>({kl:1,ff:sweep(a,e,p,70,(a.h||-60)<-60?-35:-15,.95,[0,hip]),ln:-14*e,fh:[16,-96],bh:[-10,-86]}),
 knee:(a,e)=>({kl:1,ff:[20+(a.r-30)*Math.max(0,e),-56-12*Math.max(0,e)],ln:10*e,fh:[24,-96],bh:[18,-90]}),
 stomp:(a,e,p)=>({kl:1,ff:p>0?[lerpN(26,a.r*.7,p),lerpN(-70,0,p)]:[22,-30-40*Math.max(0,e)],ln:6*e,fh:[20,-100],bh:[-8,-96]}),
 lowkick:(a,e)=>({kl:1,ff:[16+(a.r-16)*e,-12],hip:-40,sh:-84,ln:-6*e,bf:[-20,0]}),
 axe:(a,e,p)=>({kl:1,ff:p>0?[lerpN(24,a.r*.85,p),lerpN(-130,-34,p)]:[12+10*Math.max(0,e),-60-70*Math.max(0,e)],ln:-10*e,fh:[18,-92],bh:[-14,-90]}),
 spin:(a,e,p,f)=>{const n=Math.floor(Math.max(0,f.t-a.su-1)/(a.gap||4))%2,x=16+(a.r-16)*Math.max(.3,e),y=-48+(n?-16:4);return n?{kl:1,ff:[-8,0],bf:[x,y],ln:Math.sin(f.t*.8)*10}:{kl:1,ff:[x,y],ln:Math.sin(f.t*.8)*10}},
 tailkick:(a,e,p,f,hip)=>({kl:1,ff:sweep(a,e,p,-60,10,1,[0,hip-10]),ln:18*e,fh:[30,-60],bh:[16,-50],hip:-44}),
 // ---- 空中
 adive:(a,e)=>({kl:1,ff:[18+(a.r-18)*e,6*e],bf:[-4,-20],ln:6*e}),
 aknee:(a,e)=>({kl:1,ff:[26+(a.r-40)*Math.max(0,e),-48],bf:[-6,-12],ln:12*e}),
 apalm:(a,e)=>({fh:[24+(a.r-24)*e,-70],bh:[18+(a.r-36)*e,-62],ln:10*e,ff:[18,-26],bf:[-6,-12]}),
 aelbow:(a,e)=>({fh:[22+(a.r-40)*Math.max(0,e),-64],bh:[8,-80],ln:16*e,ff:[20,-28]}),
 aslash:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-90,50,.9,[0,sh]),bh:sweep(a,e,p,-92,46,.75,[0,sh]),ln:10*e,ff:[20,-28]}),
 aclaw:(a,e,p,f,hip,sh)=>({fh:sweep(a,e,p,-70,60,.9,[0,sh]),bh:[14,-70],ln:12*e,ff:[22,-24]}),
 aspin:(a,e,p,f)=>{const n=Math.floor(Math.max(0,f.t-a.su-1)/(a.gap||5))%2;return{kl:1,ff:n?[-10,-20]:[16+(a.r-16)*Math.max(.3,e),-34],bf:n?[16+(a.r-16)*Math.max(.3,e),-30]:[-8,-16],ln:Math.sin(f.t*.9)*12}}};
// 揮擊特效：判定出現的那一幀（多段攻擊每一段）在拳腳尖端產生屬性特效
function basicFx(f,a,x,y){if(NOFX)return;const d=f.dir,ang=d>0?0:Math.PI;
 switch(a.fx){
  case'fire':emb(x,y,'#ff8a3a',8,4,16,4,1);emb(x,y,'#ffe080',4,2,12,3,0);break;
  case'ice':spark(x,y,'#bff6ff',8);emb(x,y,'#e8f6ff',5,3,14,3,0);break;
  case'elec':for(let i=0;i<4;i++)P({t:'zz',x,y,ang:rr_(0,6.28),len:rr_(16,34),c:i%2?'#ffe680':'#8fe8ff',l:8,g:0,dr:1});break;
  case'poison':smk(x,y,12,'#7bd34a',22);emb(x,y,'#a3e635',4,2,16,3,0);break;
  case'wind':for(let i=0;i<2;i++)slh(x-d*rr_(0,20),y+rr_(-12,12),ang+rr_(-.4,.4),rr_(50,80),'#d6ffe9',10);break;
  case'dark':slh(x,y,ang+rr_(-.5,.5),70,'#b46bff',10);smk(x,y,10,'#4a3a80',18);break;
  case'metal':spark(x,y,'#ffd23d',6);P({ring:1,x,y,c:'#cfd3e6',l:8,rs:4,lw:3});break;
  case'rock':for(let i=0;i<3;i++)rok(x,y,rr_(-2,2),-rr_(2,4),'#8a6a4a');smk(x,GY-6,14,'#b9967a',20);break;
  case'staff':slh(x,y,ang+rr_(-.6,.6),90,'#f4e3c0',10);break;
  case'blade':slh(x,y,ang+rr_(-.7,.7),110,'#ffffff',9);slh(x,y,ang+rr_(-.7,.7),80,'#9fd6ff',9);break;
  case'soul':emb(x,y,'#b46bff',6,3,18,4,1);break;
  case'claw':for(let i=-1;i<=1;i++)slh(x+i*6,y+i*10,ang+(d>0?.7:-.7),60,'#ff6b6b',9);break;
  case'petal':emb(x,y,'#ff9ed8',6,3,20,3,0);break;
  case'jet':smk(f.x-d*22,f.y-60,12,'#9aa0b8',16);emb(f.x-d*22,f.y-60,'#7fe3ff',5,3,12,3,0);break;
  case'impact':P({ring:1,x,y,c:'#ffffff',l:10,rs:5,lw:3});spark(x,y,'#fff2c0',5);break;
  case'feather':emb(x,y,'#e8f6d0',5,2,20,3,0);slh(x,y,ang,60,'#c8f0a0',9);break}}
