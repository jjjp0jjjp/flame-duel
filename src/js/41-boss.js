// ===== 頭目戰：原創頭目「焰帝」=====
// 不放進角色清單（選角、街機抽籤、平衡模擬都不會出現），用專屬編號 li=16 取外觀與特效。
// 體型 1.5 倍、重攻擊霸體、幾乎不會被擊退；體力剩一半進入第二階段：更快、更痛、會放焰雨。
const BOSS={n:'焰帝',ds:'頭目・烈焰之主',li:16,boss:1,col:'#ff3b1a',col2:'#ffd27a',spd:3,jmp:11,hp:320,w:1.35,armor:1,ar:.35,kbr:.25,
 sp:{type:'strike',tgt:1,d:13,su:24,ac:1,rc:22,launch:1},                        // 焰柱：追著玩家落下
 sp2:{type:'proj',d:12,su:16,ac:1,rc:22,spd:7,low:1,knock:1},                    // 炎浪：貼地前進（下段）
 sp3:{d:18,su:14,ac:14,rc:26,vx:11,r:120,h:-80,st:26,kb:14,knock:1,arm:1},      // 衝撞：霸體
 ex:{type:'strike',multi:1,d:12,su:30,ac:1,rc:28,ex:1,name:'焰雨・天墜'},          // 第二階段：三道焰雨
 mv:{lp:{rep:1,d:9,su:5,ac:4,rc:10,r:120,h:-95,st:18,kb:6,cn:1,anim:'straight',fx:'fire'},
     hp:{rep:1,d:17,su:10,ac:5,rc:18,r:140,h:-75,st:24,kb:10,arm:1,cn:2,anim:'hammer',fx:'fire'},
     lk:{rep:1,d:9,su:8,ac:4,rc:14,r:140,h:-20,st:18,kb:6,low:1,cn:1,anim:'stomp',fx:'rock'},
     hk:{rep:1,d:17,su:11,ac:6,rc:20,r:170,h:-70,st:24,kb:12,knock:1,cn:2,anim:'round',fx:'fire'}},nm:{}};
LOOK.push({skin:'#7a4030',top:'#2a0a0a',dk:'#120404',top2:'#ff7a2a',ua:'#3a1a14',fa:'#2a0a0a',hand:'#ffb020',th:'#1a0606',sn:'#2a0a0a',shoe:'#ffb020',belt:'#ffd23d',hair:'#ff3b1a',hb:'#ffd23d',acc:'#ffd23d',glow:'#ff5a1a'});
LOOKA.push(Object.assign({},LOOK[16],{col:BOSS.col,col2:BOSS.col2}));LOOK2.push({bag:1.3,wrap:'#ffb020',sole:'#2a0a0a'});
PGL.push('#ff5a1a');QUO.push('此焰，永不熄滅。');
let BOSSF=null;
function bossBest(){try{return+(localStorage.getItem('fd_boss')||0)}catch(e){return 0}}
function bossStart(){bossHead();BOSSF={me:sel[0],res:null,d0:G.diff,g0:G.stage,ph:1};G.diff=2;G.stage=3;
 startGame(1);REC=null; // 頭目不在角色清單裡，這場不做重播
 p2=new F(BOSS,1);p2.sc=1.5;p2.boss=1;p2.ai.pt='boss';G.ft=1;startRound();G.time=99;G.msg='焰帝 降臨';G.mt=G.mm=100;G.vs=110;G.vm=110}
// 頭目的出招：依距離與冷卻挑招，第二階段冷卻更短並會放焰雨
function bossInput(me,op){
 const a=me.ai,i=Object.assign({},NI),dx=op.x-me.x,ad=Math.abs(dx),to=dx>0?'r':'l',aw=dx>0?'l':'r',ph2=me.hp<me.ch.hp*(me.hm||1)*.5;
 if(ph2&&BOSSF&&BOSSF.ph===1){BOSSF.ph=2;me.pw=1e9;me.sspd=1.25;me.parm=1;if(!NOFX){pp({x:me.x,y:me.y-230,vx:0,vy:-.5,l:80,m:80,txt:'焰帝 覺醒！',c:'#ff6b3a',text:1,big:1});P({ring:1,x:me.x,y:me.y-100,c:'#ff5a1a',l:30,rs:12,lw:8});flash('#ff5a1a',.3,300)}G.shake=Math.max(G.shake,14);sfx('ko')}
 // 防禦：對手出招時決定一次要不要擋（第二階段更常擋），擋的期間持續按後
 const oa=op.atk;if(op.st==='atk'&&oa&&oa!==a.ba){a.ba=oa;a.bk=Math.random()<(ph2?.6:.45)&&ad<(oa.r||80)+120?(oa.su+oa.ac+4):0;a.blo=!!oa.low}
 if(a.bk>0&&(me.st==='idle'||me.st==='walk'||me.st==='block')){a.bk--;i[aw]=1;if(a.blo)i.d=1;return i}
 if(me.st!=='idle'&&me.st!=='walk')return i;
 if(a.cd>0){a.cd--;if(ad>150)i[to]=1;else if(ad<90)i[aw]=1;return i}
 const R=Math.random(),cdb=ph2?[16,30]:[26,46];a.cd=cdb[0]+Math.floor(Math.random()*(cdb[1]-cdb[0]));
 if(ph2&&R<.16){me.mt=100;i.d=1;i.sp=1;return i}                  // 焰雨
 if(op.y<GY-40&&ad<180){i.hp=1;return i}                         // 對空劈砸
 if(ad<170){const L=[{lp:1},{hp:1},{lk:1},{hk:1},{th:1}];Object.assign(i,L[Math.floor(R*L.length)]);return i}
 if(ad<420){if(R<.35){i[aw]=1;i.sp=1}else if(R<.7){i[to]=1;i.sp=1}else{i.sp=1}return i}  // 衝撞／炎浪／焰柱
 if(R<.6){i.sp=1;return i}i[to]=1;a.cd=8;return i}
function bossTip(){const B=BOSSF;if(B.res==='a'){const t=99-G.time;if(!B.saved){B.saved=1;try{const b=bossBest();if(!b||t<b)localStorage.setItem('fd_boss',t)}catch(e){}achGet('boss')}return'討伐焰帝！用時 '+t+' 秒（最佳 '+bossBest()+' 秒）　按 Enter 回選單'}return'被焰帝擊敗了…按 Enter 回選單'}
function bossEnd(){if(BOSSF){G.diff=BOSSF.d0;G.stage=BOSSF.g0;BOSSF=null}}
function bossCard(){const b=$('b12');if(!b)return;const t=bossBest();b.querySelector('small').textContent='挑戰巨大的焰帝，體力剩一半會覺醒'+(t?'　最佳 '+t+' 秒':'')}
$('b12').onclick=()=>{snd(500,.1);bossStart()};bossCard();
ACH.push(['boss','焰帝討伐','打倒頭目焰帝']);achLabel();
// 焰帝的金冠與頭上的火焰（畫在角色座標系裡，跟著體型一起放大）
function bossDeco(hx,hy,d){ctx.save();const t=G.frame*.25;
 ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=hx+(i-2)*6*d,h=18+Math.sin(t+i*1.7)*6;ctx.fillStyle=i%2?'rgba(255,120,30,.75)':'rgba(255,210,80,.8)';ctx.beginPath();ctx.moveTo(x-5,hy-14);ctx.quadraticCurveTo(x-2,hy-14-h*.6,x,hy-14-h);ctx.quadraticCurveTo(x+2,hy-14-h*.6,x+5,hy-14);ctx.closePath();ctx.fill()}
 ctx.globalCompositeOperation='source-over';ctx.fillStyle='#ffd23d';ctx.strokeStyle='#3a1a06';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(hx-14,hy-10);for(let i=0;i<=4;i++){const x=hx-14+i*7;ctx.lineTo(x,hy-(i%2?18:24));ctx.lineTo(x+3.5,hy-12)}ctx.lineTo(hx+14,hy-10);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#ff3b1a';ctx.beginPath();ctx.arc(hx,hy-15,2.5,0,6.3);ctx.fill();ctx.restore()}
// 頭像（第一次進頭目戰時產生）
function bossHead(){if(HEAD[16])return;const c=document.createElement('canvas');c.width=c.height=200;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,240,460);portrait(BOSS,'',92,356,2.3,1);ctx.restore();c.getContext('2d').drawImage(cv,0,0,200,200,0,0,200,200);HEAD[16]=c;ctx.clearRect(0,0,W,H)}
