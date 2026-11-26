function startRound(){G.win=-1;G.wbk=0;p1.reset();p2.reset();projs=[];parts=[];G.cam={z:1,cx:W/2};G.phase='intro';G.pt=100;G.time=60;G.tf=0;G.msg='ROUND '+G.round;G.mt=G.mm=100;sfx('round')}
function startGame(m){rpSaveLast();REC=(m===1||m===2||m===4)&&!RP?{m,c:[sel[0],sel[1]],g:G.stage,a:[],b:[]}:null;G.mode=m;G.frame=0;G.hitstop=0;G.shake=0;for(const o of[pv1,pv2])for(const k in o)delete o[k];bg=makeBg(STG[G.stage]);p1=new F(CH[sel[0]],0);p2=new F(CH[sel[1]],1);smApply(m);hzApply();G.round=1;G.si=0;G.pause=false;document.getElementById('menu').style.display='none';startRound();G.vs=m===3?0:110;if(G.vs)sfx('vs');if(m!==3)TUT=null;TR.rec=0;TR.tr=-1;TR.ok=0;FD=null;tbar()}
function toMenu(){if(NET.room){netQuit(1);return}rpSaveLast();RP=null;REC=null;arcEnd();chainEnd();G.phase='menu';G.mt=0;TUT=null;lab();tbar();rpLastBtn();document.getElementById('menu').style.display='flex'}
function endRound(why){
 const ko1=p1.st==='ko',ko2=p2.st==='ko';let w=null;
 if(why==='ko'){if(ko1&&!ko2)w=p2;else if(ko2&&!ko1)w=p1}else w=p1.hp>p2.hp?p1:p2.hp>p1.hp?p2:null;
 G.win=w?(w===p1?0:1):-1;if(w)w.wins++;else{p1.wins++;p2.wins++}
 G.phase='ko';G.pt=140;G.msg=why==='ko'?(w&&w.hp>=w.ch.hp*(w.hm||1)?'PERFECT!':'K.O.!'):'TIME UP';G.mt=G.mm=140;
 if(why==='ko'){G.hitstop=14;G.shake=16;sfx('ko')}
}
function step(){
 if(G.phase==='menu'||G.pause||(RP&&RP.end))return;
 if(G.mode===4){d1=dec(NET.inp[0],pv1);d2=dec(NET.inp[1],pv2)}
 if(G.vs>0){G.vs--;if(G.vs===0)sfx('round');return}
 G.si=(G.si|0)+1;
 if(G.hitstop>0){G.hitstop--;if(G.phase==='fight'){const bf=(p,i)=>{if(p.rcIn(i))p.rcq=1;const m=p.pick(i,p.y>=GY);if(m)p.setBuf(m);if(i.u&&!p.pu)p.jb=8;p.pu=i.u;if(i.dash)p.db={d:i.dash,t:8}};const ab=inputs(1);bf(p1,ab[0]);if(ab[1])bf(p2,ab[1])}return}
 G.frame++;G.shake*=.88;if(G.mt>0)G.mt--;
 if(G.phase==='ko'&&G.frame%2)return;
 let i1=NI,i2=NI;
 if(G.phase==='fight'){const ab=inputs(0);i1=ab[0];i2=ab[1]||NI;p1.mt=Math.min(100,p1.mt+.03);p2.mt=Math.min(100,p2.mt+.03);if(G.mode===3){p1.mt=100;if(p2.combo===0&&p2.st==='idle'){p2.hp=p2.ch.hp;p2.lag=p2.hp}}}
 p1.update(i1,p2);p2.update(i2,p1);resolveHits();hzStep();if(G.mode===3)trainTick();
 const dx=p2.x-p1.x;
 if(Math.abs(dx)<44&&Math.abs(p1.y-p2.y)<60&&p1.st!=='ko'&&p2.st!=='ko'&&p1.st!=='down'&&p2.st!=='down'){const pu=(44-Math.abs(dx))/2,s=dx>=0?1:-1;p1.x-=s*pu;p2.x+=s*pu;p1.x=Math.max(40,Math.min(W-40,p1.x));p2.x=Math.max(40,Math.min(W-40,p2.x))}
 for(const p of projs){
  if(p.wait>0){p.wait--;p.life--;projFx(p);if(p.wait===0)strikeFx(p);continue}
  if(p.life<=0)continue;
  p.x+=p.vx;p.y+=p.vy||0;if(p.gr)p.vy+=p.gr;p.life--;projFx(p);if(p.vy&&p.y>=GY-14){p.life=0;projEnd(p);spark(p.x,GY-6,p.own.ch.col,8,1)}
  if(p.ret&&p.life===p.ret){p.vx=-p.vx;p.rb=1}if(p.rb&&Math.abs(p.x-p.own.x)<28)p.life=0;if(p.cool>0)p.cool--;if(p.hm){const tg=p.own===p1?p2:p1,dy=(tg.y-70)-p.y;p.vy=Math.max(-2.5,Math.min(2.5,(p.vy||0)+(dy>0?.12:-.12)))}
  const t=p.own===p1?p2:p1,r=p.big?28:14,bx=p.strike?[p.x-26,0,p.x+26,GY]:p.wl?[p.x-16,GY-110,p.x+16,GY]:[p.x-r,p.y-r,p.x+r,p.y+r];
  if(p.life>0&&!(p.cool>0)&&t.st!=='ko'&&ov(bx,hurt(t))&&t.getHit(p.own,p.a,p.strike?p.own.x:p.x)){if(p.ph>1){p.ph--;p.cool=8}else{p.life=0;projEnd(p);if(p.big)ring(p.x,p.y,'#ffe14d')}}
  for(const q of projs)if(q!==p&&q.own!==p.own&&!p.strike&&!q.strike&&Math.abs(q.x-p.x)<24&&Math.abs(q.y-p.y)<40&&p.life>0&&q.life>0){if(!p.big&&!p.wl)p.life=0;if(!q.big&&!q.wl)q.life=0;spark(p.x,p.y,'#fff',16);ring(p.x,p.y,'#fff');snd(200,.15,'sawtooth',.05,60)}
  if(p.x<-40||p.x>W+40)p.life=0;
 }
 projs=projs.filter(p=>p.life>0);
 if((G.phase==='ko'||G.phase==='over')&&G.win>=0){const w=G.win?p2:p1;if(w.y>=GY&&(w.st==='idle'||w.st==='walk'||w.st==='block')){w.st='win';w.kt=0;w.vx=0}}
 if(!NOFX){for(const p of parts){if(!p.ring){p.x+=p.vx;p.y+=p.vy;p.vy+=p.text?0:(p.g===undefined?.25:p.g);p.vx*=(p.dr||.97);if(p.grow)p.s+=p.grow;if(p.vr)p.rot+=p.vr}p.l--}
 parts=parts.filter(p=>p.l>0);
 const dd=Math.abs(p1.x-p2.x);let tz=Math.min(1.3,Math.max(1,640/(dd+260))),tcx=(p1.x+p2.x)/2;
 // 街機畫風：超必殺發動時推近到發動者、KO 時推近到倒下的一方（只影響畫面）
 if(ART&&!NOFX){const fc=camFocus();if(fc){tz=Math.max(tz,fc.z);tcx=fc.x}}
 G.cam.z+=(tz+(G.pz||0)-G.cam.z)*.15;G.pz=(G.pz||0)*.85;G.cam.cx+=(tcx-G.cam.cx)*.12}
 if(G.phase==='intro'){if(--G.pt<=0){G.phase='fight';G.msg='FIGHT!';G.mt=G.mm=50;sfx('fight')}}
 else if(G.phase==='fight'){
  if(++G.tf>=60){G.tf=0;if(G.mode!==3){G.time--;if(G.time<=10&&G.time>0)sfx('tick')}}
  if(p1.st==='ko'||p2.st==='ko')endRound('ko');else if(G.time<=0)endRound('time');
 }else if(G.phase==='ko'){
  if(--G.pt<=0){
   if(p1.wins>=(G.ft||2)||p2.wins>=(G.ft||2)){
    G.phase='over';const w=p1.wins>p2.wins?p1:p2.wins>p1.wins?p2:null;if(G.mode===1&&w&&!RP&&!TEAM&&!SURV)rec(w===p1);if(ARC&&!RP)ARC.res=w===p1?'win':'lose';chainResult(w);
    G.msg=w?(w===p1?'P1 ':G.mode===1?'電腦 ':'P2 ')+w.ch.n+' 獲勝!':'平手';G.mt=G.mm=1e9;snd(660,.4,'triangle',.07,990)
   }else{G.round++;startRound()}
  }
 }
}

