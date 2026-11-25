const pend={};
const BT=['lp','hp','lk','hk','sp','th'];
function cap(k){const g=c=>[].concat(c).some(x=>{const v=keys[x]||pend[x];pend[x]=0;return v})?1:0;let b=0;for(let j=0;j<10;j++)b|=g(k[j])<<j;return b}
function dec(b,pv){
 const i={l:b&1,r:b>>1&1,u:b>>2&1,d:b>>3&1,dash:0};
 BT.forEach((n,j)=>{const v=b>>(4+j)&1;i[n]=v&&!pv[n]?1:0;pv[n]=v});
 ['l','r'].forEach((n,j)=>{const v=i[n];if(v&&!pv[n+'x']){const s=j?1:-1;if(G.frame-(pv.tt||-99)<14&&pv.ts===s)i.dash=s;pv.tt=G.frame;pv.ts=s}pv[n+'x']=v});
 return i;
}
function human(k,pv){return dec(cap(k),pv)}
let d1=NI,d2=NI;
const K1=[['KeyA','P0l','T0l'],['KeyD','P0r','T0r'],['KeyW','P0u','T0u'],['KeyS','P0d','T0d','T0e'],['KeyU','P0a','T0a'],['KeyI','P0b','T0b'],['KeyJ','P0x','T0x'],['KeyK','P0y','T0y'],['KeyO','P0s','T0s'],['KeyL','P0t','T0t']];
const K2=[['ArrowLeft','P1l'],['ArrowRight','P1r'],['ArrowUp','P1u'],['ArrowDown','P1d'],['Numpad4','KeyZ','P1a'],['Numpad5','KeyX','P1b'],['Numpad1','KeyV','P1x'],['Numpad2','KeyB','P1y'],['Numpad6','KeyC','P1s'],['Numpad3','KeyN','P1t']];
const pv1={},pv2={};
function aiInput(me,op){
 const a=me.ai,lv=G.diff,i=Object.assign({},NI),dx=op.x-me.x,ad=Math.abs(dx),to=dx>0?'r':'l',aw=dx>0?'l':'r',sg=dx>0?1:-1;
 if(me.kd&&me.y<GY){if(!a.tk){a.tk=1;if(Math.random()<[.1,.4,.7][lv]){i.lp=1;return i}}}else a.tk=0;
 // 學習對手習慣（會慢慢遺忘）：常跳、常投、常放飛行道具、常防禦
 const h=a.h||(a.h={jmp:0,thr:0,prj:0,blk:0});
 if(G.frame%10===0)for(const k in h)h[k]*=.985;
 const oair=op.y<GY-2;if(oair&&!a.oa){h.jmp++;a.jc=(a.jc|0)+1}a.oa=oair;
 if(op.atk&&op.atk!==a.ok){a.ok=op.atk;a.done=0;if(op.atk.throw)h.thr++;if(op.atk.type==='proj')h.prj++}
 if(op.st==='block'&&me.st==='atk'&&me.hit&&me.t===me.atk.su+1)h.blk++;
 // 即時反應（普通以上）：拆投、確反揮空、對空
 const free=me.y>=GY&&(me.st==='idle'||me.st==='walk'||me.st==='block');
 if(lv&&free&&op.atk&&!a.done){const oa=op.atk,R=Math.random();
  if(oa.throw&&(oa.key==='th'||oa.key==='th2')&&op.t<=oa.su&&ad<100){a.done=1;if(R<[0,.35,.7][lv]){i.th=1;return i}}
  else if(op.st==='atk'&&!op.hit&&!oa.air&&op.t>oa.su+oa.ac&&oa.su+oa.ac+oa.rc-op.t>=10&&ad<115){a.done=1;if(R<[0,.4,.75][lv]){Object.assign(i,lv>1&&me.mt>=100?{d:1,sp:1}:{hp:1});return i}}
 }
 if(lv&&free&&oair&&op.vy>-4&&op.y<GY-40&&ad<130&&a.aj!==a.jc){a.aj=a.jc;if(Math.random()<[0,.45,.75][lv]+Math.min(.2,h.jmp*.02)){i.d=1;i.lp=1;return i}}
 if(a.t--<=0){
  a.t=[24,14,7][lv]+rnd(0,10);a.mv=0;a.blk=0;a.act=null;
  const r=Math.random(),pj=me.ch.sp.type==='proj';
  if(op.st==='atk'&&ad<150&&r<[.25,.5,.78][lv]){a.blk=16;a.bw=Math.random()<[.35,.12,0][lv]}
  else if(me.ch.sp2.type==='strike'&&me.mt>=50&&ad>170&&ad<300&&(op.y<GY-30||r<.12))a.act={[to]:1,sp:1};
  else if(me.ch.ex.throw&&me.mt>=100&&ad<110&&r<.35)a.act={d:1,sp:1};
  else if(op.y<GY-40&&ad<125&&lv&&r<.6)a.act={d:1,lp:1};
  else if(lv&&h.blk>2&&ad<90&&r<.3)a.act={th:1};
  else if(lv>1&&h.thr>2&&ad<90&&r<.25)a.act={dash:-sg};
  else if(ad>220&&lv&&h.prj>2&&r<.35){a.mv=1;a.act={u:1,[to]:1}}
  else if(ad>220){a.mv=1;if(me.mt>=100&&pj&&r<.3)a.act={d:1,sp:1};else if(me.mt>=50&&pj&&r<.4)a.act={sp:1};else if(r<.12)a.act={dash:sg};else if(r<.18)a.act={u:1}}
  else if(ad>115){a.mv=1;if(r<.14)a.act={dash:sg};else if(r<.22)a.act={u:1}}
  else if(r<.5+.1*lv){const L=op.st==='block'?[{th:1},{th:1},{d:1,hk:1}]:[{lp:1},{lk:1},{hp:1},{hk:1},{d:1,hk:1},{[to]:1,hp:1},{[to]:1,hk:1},{[to]:1,lp:1},{[aw]:1,hk:1}].concat(me.mt>=50?[{[to]:1,sp:1},{[aw]:1,sp:1}]:[]).concat(me.ch.mv&&me.ch.mv.th?[{th:1},{th:1},{sp:1}]:[]);a.act=L[rnd(0,L.length)]}
  else if(r<.6)a.mv=-1;
  else if(r<.75&&me.mt>=50)a.act={sp:1};
 }
 if(a.blk>0){a.blk--;const oa=op.atk,hi=op.y<GY-2||!!(oa&&oa.ovh);if(hi!==!!a.bw)i[aw]=1;else i.d=1}else{if(a.mv>0)i[to]=1;if(a.mv<0)i[aw]=1}
 if(a.act){Object.assign(i,a.act);a.act=null}
 if(i.u)a.uh=12;else if(a.uh>0){a.uh--;i.u=1}
 if(me.st==='atk'&&me.hit&&me.atk.cn&&Math.random()<[0,.1,.25][lv]){if(me.atk.cn===4){if(me.mt>=100){i.d=1;i.sp=1}}else if(me.atk.cn===1)i.hk=1;else if(me.mt>=50)i.sp=1}
 return i;
}

