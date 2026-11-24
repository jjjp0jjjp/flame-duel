class F{
constructor(ch,side){this.ch=ch;this.side=side;this.wins=0;this.ai={t:0,mv:0,blk:0,act:null};this.reset()}
reset(){this.x=this.side?W/2+170:W/2-170;this.y=GY;this.vx=0;this.vy=0;this.dir=this.side?-1:1;this.hp=this.ch.hp*(this.hm||1);this.lag=this.hp;this.mt=0;this.st='idle';this.t=0;this.atk=null;this.hit=false;this.stun=0;this.combo=0;this.cd=0;this.walk=0;this.flash=0;this.kt=0;this.kd=0;this.dt=0;this.dd=0;this.inv=0;this.buf=null;this.cl=[];this.db=null;this.jb=0;this.jh=0;this.ph=null}
pick(i,g){
 const fw=this.dir>0?i.r:i.l,bk=this.dir>0?i.l:i.r,dn=i.d;
 if(i.sp)return dn?'ex':(!g&&this.ch.asp)?'asp':fw?'sp2':bk?'sp3':'sp';
 if(i.th&&g)return bk?'th2':'th';
 const h=g?{lp:dn?'upper':fw?'jab':'lp',hp:dn?'upper':fw?'lunge':'hp',lk:dn?'sweep':fw?'push':'lk',hk:dn?'sweep':fw?'spin':bk?'flip':'hk'}:{lp:'ap',hp:'ap',lk:dn?'dive':'ak',hk:dn?'dive':'ak'};
 for(const b of['hk','hp','lk','lp'])if(i[b])return h[b];
 return null;
}
cc(a,m){if(this.cl.includes(m))return false;if(a.cn===4)return m==='ex';if(a.cn===3)return m==='ap'||m==='ak'||m==='ex'||m==='asp';return a.cn&&m!==a.key&&m!=='th'&&m!=='th2'&&m!=='ap'&&m!=='ak'&&m!=='dive'&&(m==='sp'||m==='sp2'||m==='sp3'||m==='ex'||m==='upper'||a.cn===1)}
 setBuf(m){const sp=x=>x==='sp'||x==='sp2'||x==='sp3'||x==='ex'||x==='asp'||x==='upper';if(this.buf&&sp(this.buf.m)&&!sp(m)&&this.buf.t>=7)return;this.buf={m,t:10}}
 dashGo(s){gho(this,colOf(this));this.st='dash';this.dt=13;this.dd=s;this.inv=s!==this.dir?7:0;this.vx=s*8.5;spark(this.x,GY-4,'#b9a8d8',6,1);snd(180,.1,'sine',.04,500)}
start(m,nf){
 if(!nf&&m==='ex'&&this.mt<100&&this.mt>=50)m='sp';
 const a=Object.assign({key:m},MV[m]||this.ch[m],this.ch.mv&&this.ch.mv[m]),air=this.y<GY-2;
 if(a.cn===undefined&&(m==='sp'||m==='sp2'||m==='sp3'||m==='asp'))a.cn=4;
 if(MV[m]&&!!MV[m].air!==air){this.buf=null;return false}
 if(a.cost){if(this.mt<a.cost){this.buf=null;return false}this.mt-=a.cost}
 this.st='atk';this.atk=a;this.t=0;this.hit=false;this.buf=null;if(nf)this.cl.push(m);else this.cl=[m];if(!air)this.vx=0;
 if(a.ex){G.hitstop=24;G.supEnd=performance.now()+850;G.supName=a.name;G.supCol=this.ch.col;G.supCh=CH.indexOf(this.ch);G.supSide=this===p1?0:1;G.shake=10;snd(100,.5,'sawtooth',.1,800)}
 else sfx(/hp|hk|lunge|spin|upper|sweep|th/.test(m)?'heavy':'swoosh');
 return true;
}
update(i,o){
 const ch=this.ch,g=this.y>=GY,wasAir=!g;
 if(this.flash>0)this.flash--;const upE=i.u&&!this.pu;this.pu=i.u;if(this.jb>0)this.jb--;if(upE)this.jb=8;if(i.dash)this.db={d:i.dash,t:8};else if(this.db&&--this.db.t<=0)this.db=null;
 if(this.lag>this.hp)this.lag=Math.max(this.hp,this.lag-.35);
 if(this.st!=='ko'){const m=this.pick(i,g);if(m)this.setBuf(m);else if(this.buf&&!(this.st==='down'&&this.dt<=14)&&--this.buf.t<=0)this.buf=null}
 if(this.jh){if(g&&this.vy>=0)this.jh=0;else if(!i.u&&this.vy<-6){this.vy*=.6;this.jh=0}}
 if(this.st==='ko')this.kt++;
 else if(this.st==='win'){this.vx*=.8;this.kt++}
 else if(this.st==='down'){this.dt--;this.vx*=.85;if(this.dt<=0){this.st='idle';if(this.buf&&this.buf.m!=='ap'&&this.buf.m!=='ak'&&this.buf.m!=='dive'&&this.buf.m!=='asp'){this.dir=o.x>=this.x?1:-1;this.start(this.buf.m)}}}
 else if(this.stun>0){this.stun--;if(this.stun===0){if(this.st==='hit')this.st='idle';this.combo=0;this.cd=0}this.vx*=.88}
 else if(this.st==='atk'){
  const a=this.atk;this.t++;
  if(this.hit&&this.buf&&this.t>a.su&&this.cc(a,this.buf.m)&&this.start(this.buf.m,1)){ring(this.x+this.dir*30,this.y-70,'#fff');sfx('cancel')}
  else if(this.hit&&this.db&&a.cn>=1&&a.cn<=3&&this.t>a.su&&g){const dd=this.db.d;this.db=null;this.atk=null;this.cl=[];this.dashGo(dd);ring(this.x,this.y-60,'#7fe3ff');sfx('cancel')}
  else if(this.hit&&a.cn===2&&this.t>a.su&&g&&this.jb>0){this.jb=0;this.atk=null;this.st='idle';this.cl=[];this.vy=-ch.jmp;this.jh=1;this.dj=0;ring(this.x,this.y-20,'#7fe3ff');snd(300,.12,'sine',.04,600)}
  else{
   fxMove(this,a,g);
   if(a.vx&&this.t>a.su&&this.t<=a.su+a.ac&&!this.hit)this.vx=this.dir*a.vx;else if(g)this.vx*=.8;
   if(a.back&&this.t===1){const aw=o.x>=this.x?-1:1;spark(this.x,this.y-60,'#e3ccff',12);ring(this.x,this.y-60,'#b46bff');this.x=Math.max(50,Math.min(W-50,this.x+aw*200));spark(this.x,this.y-60,'#e3ccff',12);snd(600,.15,'sine',.06,200)}
   if(a.tele&&this.t===a.su){spark(this.x,this.y-60,'#e3ccff',14);ring(this.x,this.y-60,'#b46bff');this.x=Math.max(50,Math.min(W-50,o.x+this.dir*50));this.dir=-this.dir;spark(this.x,this.y-60,'#e3ccff',14);ring(this.x,this.y-60,'#b46bff');snd(700,.15,'sine',.06,200)}
   if(a.dive&&this.t>=a.su&&!g){this.vy=Math.max(this.vy,12);this.vx=this.dir*5}
   if(a.lift&&this.t===a.su+1&&g){this.vy=a.lift;this.vx=this.dir*2.5;snd(250,.2,'sine',.05,700)}
   if(a.type==='proj'&&(this.t===a.su||(a.n2&&this.t===a.su+9))){projs.push({k:a.key,low:a.low,gr:a.gr,x:this.x+this.dir*50,y:this.y-(a.low?18:a.vy?60:this.t>a.su?96:72),vx:this.dir*a.spd,vy:a.vy||0,own:this,big:a.big,a:{d:a.d,kb:7,st:22,key:'sp',mk:a.key,launch:a.launch,knock:a.knock,ex:a.ex},life:a.low?80:140});sfx('proj')}
   if(a.type==='strike'&&this.t===a.su){const xs=a.multi?[o.x,o.x-110,o.x+110]:[this.x+this.dir*a.dist],ws=a.multi?[10,18,26]:[12];xs.forEach((tx,j)=>projs.push({k:a.key,strike:1,x:Math.max(30,Math.min(W-30,tx)),y:GY-60,vx:0,vy:0,own:this,wait:ws[j],life:ws[j]+6,a:{d:a.d,kb:6,st:26,key:'sp',mk:a.key,launch:a.launch,ex:a.ex}}));sfx('charge')}
   if(a.type!=='proj'&&a.type!=='strike'&&!a.counter&&this.t>a.su&&this.t<=a.su+a.ac&&!this.hit&&!this.ph)this.tryHit(o);
   if((a.air&&g&&this.t>a.su+1)||this.t>=a.su+a.ac+a.rc){this.st='idle';this.atk=null}
  }
 }
 else if(this.st==='dash'){
  this.dt--;if(this.inv>0)this.inv--;if(this.dt%3===0)spark(this.x,GY-4,'#b9a8d8',2,1);if(this.dt%3===1)gho(this,colOf(this));
  if(this.dt<=9&&this.buf&&this.start(this.buf.m)){}
  else if(this.dt<=0){this.st='idle';this.vx*=.3}
 }
 else{
  if(g)this.dir=o.x>=this.x?1:-1;
  if(this.buf&&this.start(this.buf.m)){}
  else if((i.dash||this.db)&&g){const dd=i.dash||this.db.d;this.db=null;this.dashGo(dd)}
  else{
   this.st='idle';
   const mv=i.r-i.l,back=this.dir>0?i.l:i.r;
   if(g&&(i.d||(back&&((o.st==='atk'&&Math.abs(o.x-this.x)<190)||projs.some(p=>p.own!==this&&Math.abs(p.x-this.x)<150))))){this.st='block';this.vx*=.6}
   else{this.vx=mv*ch.spd*(g?(mv&&(mv>0)!==(this.dir>0)?.85:1):.9);if(mv&&g){this.st='walk';this.walk+=.25}if((i.u||this.jb>0)&&g){this.jb=0;this.vy=-ch.jmp;this.dj=0;this.jh=1;snd(300,.12,'sine',.04,600)}else if(upE&&ch.dj&&!this.dj&&!g){this.vy=-ch.jmp*.85;this.dj=1;spark(this.x,this.y,'#e3ccff',8,1);ring(this.x,this.y,'#e3ccff');snd(500,.1,'sine',.04,900)}}
  }
 }
 this.x+=this.vx;this.y+=this.vy;
 if(this.y<GY||this.vy<0)this.vy+=.8;
 if(this.y>=GY){this.y=GY;if(this.vy>0)this.vy=0}
 if(wasAir&&this.y>=GY){this.dj=0;sfx('land');landFx(this);
  if(this.st==='atk'&&this.atk&&this.atk.quake){[-1,1].forEach(s=>projs.push({k:'qk',low:1,x:this.x+s*40,y:GY-18,vx:s*7,vy:0,own:this,life:30,a:{d:8,kb:5,st:18,key:'sp',knock:1}}));G.shake=Math.max(G.shake,8)}
  spark(this.x,GY,'#b9a8d8',6,1);
  if(this.kd&&this.st!=='ko'){this.st='down';this.dt=40;this.kd=0;this.stun=0;this.atk=null;G.shake=Math.max(G.shake,6);ring(this.x,GY-4,'#b9a8d8');snd(80,.15,'sawtooth',.08,40)}
 }
 if(this.st==='ko'&&this.y>=GY)this.vx*=.9;
 this.x=Math.max(40,Math.min(W-40,this.x));
}
tryHit(o){
 if(o.st==='ko')return;
 if(ov(hbox(this,this.atk),hurt(o)))this.ph={a:this.atk,x:this.x};
}
getHit(src,a,px){
 if(this.st==='down'||this.st==='ko'||(this.st==='dash'&&this.inv>0)||(this.atk&&this.atk.inv&&this.t<=this.atk.su+3))return false;
 if(a.throw&&(this.y<GY||this.st==='hit'))return false;
 if(this.st==='atk'&&this.atk&&this.atk.counter&&this.t>this.atk.su&&this.t<=this.atk.su+this.atk.ac&&!a.throw){
  ctrFx(this);this.atk=Object.assign({key:'ctr'},CTR);this.t=CTR.su;this.hit=false;this.cl.push('ctr');this.dir=px>=this.x?1:-1;
  if(Math.abs(src.x-this.x)<140&&src.st!=='ko'&&src.st!=='down'&&src.getHit(this,this.atk,this.x))this.hit=true;
  G.hitstop=Math.max(G.hitstop,10);return true}
 if(a.throw&&(a.key==='th'||a.key==='th2')&&((this.st==='atk'&&this.atk&&(this.atk.key==='th'||this.atk.key==='th2'))||(this.buf&&(this.buf.m==='th'||this.buf.m==='th2')&&this.buf.t>=5))){
  const sg=this.x>=px?1:-1;this.vx=sg*7;src.vx=-sg*7;this.stun=14;src.stun=14;this.st='hit';src.st='hit';this.atk=null;src.atk=null;this.buf=null;src.buf=null;
  ring(this.x,this.y-70,'#fff');ring(this.x,this.y-70,'#7ec8ff');pp({x:this.x,y:this.y-130,vx:0,vy:-.6,l:50,m:50,txt:'TECH!',c:'#7ec8ff',text:1,big:1});sfx('block');G.hitstop=Math.max(G.hitstop,6);return true}
 if(this.ch.armor&&this.st==='atk'&&(this.atk.key==='hp'||this.atk.key==='hk')&&this.t<=this.atk.su&&!a.throw){this.hp=Math.max(1,this.hp-a.d*(this.ch.ar||.5));spark(this.x,this.y-80,'#ffd23d',8);ring(this.x,this.y-80,'#ffd23d');sfx('block');G.hitstop=Math.max(G.hitstop,4);return true}
 const sgn=this.x>=px?1:-1;
 if(!a.throw&&this.st==='block'&&this.y>=GY&&this.dir*(px-this.x)>0){
  if(TUT&&this===p1)TUT.blk++;this.hp=Math.max(1,this.hp-a.d*(a.ex?.2:.1));this.stun=9;this.vx=sgn*a.kb*.9*(this.ch.kbr||1);this.mt=Math.min(100,this.mt+3);
  spark(this.x+this.dir*24,this.y-85,'#7ec8ff',8);if(!NOFX)P({t:'sh',x:this.x+this.dir*26,y:this.y-70,dir:this.dir,c:'#7ec8ff',l:12,g:0,dr:1});sfx('block');G.hitstop=Math.max(G.hitstop,3);return true}
 const ct=this.st==='atk'&&this.atk&&this.t<=this.atk.su&&!a.throw,dm=a.d*Math.max(.4,1-.12*this.combo)*(ct?1.3:1);if(ct){pp({x:this.x,y:this.y-150,vx:0,vy:-.6,l:55,m:55,txt:'COUNTER!',c:'#ff7a3d',text:1,big:1});sfx('cancel')}
 this.jh=0;this.hp-=dm;this.cd+=dm;this.combo++;if(G.mode===3&&this===p2&&src===p1)trHit(a,this.combo);this.stun=Math.max(10,a.st-Math.min(8,Math.max(0,this.combo-4)*2));this.st='hit';this.atk=null;this.flash=5;if(a.rev)this.x=Math.max(50,Math.min(W-50,2*px-this.x));this.vx=(this.x>=px?1:-1)*a.kb*(this.ch.kbr||1);if(a.su&&(this.x<=42||this.x>=W-42))src.vx=-sgn*Math.min(7,a.kb*.7);
 if(a.launch||a.knock||a.throw){this.vy=a.throw?-8:a.knock?-6:-10;this.kd=1}
 else if(this.y<GY){this.vy=Math.min(this.vy,-3);this.kd=1}
 src.mt=Math.min(100,src.mt+dm*1.3*(src.ch.mg||1));this.mt=Math.min(100,this.mt+dm*.7);
 const big=a.d>12;
 spark(this.x,this.y-75,big?'#ffe14d':'#ffffff',big?18:11);hitFx(src,a,this);pp({x:this.x+rnd(-20,20),y:this.y-120,vx:0,vy:-1.1,l:38,m:38,txt:String(Math.round(dm)),c:big?'#ffe14d':'#fff',text:1});if(big||a.ex)ring(this.x,this.y-75,big?'#ffe14d':'#fff');
 G.hitstop=Math.max(G.hitstop,a.ex?12:big?8:5);G.pz=Math.max(G.pz||0,a.ex?.07:big?.045:.02);G.shake=Math.max(G.shake,a.d*.8);
 sfx(a.throw?'throw':big?'hitbig':'hit',this.combo);
 if(this.hp<=0&&G.mode===3&&this===p2){this.hp=this.ch.hp}else if(this.hp<=0){this.hp=0;this.st='ko';this.kt=0;this.vy=-9;this.vx=sgn*6;this.stun=0;this.atk=null;this.kd=0}
 return true;
}}

