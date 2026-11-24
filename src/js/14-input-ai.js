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
 if(a.t--<=0){
  a.t=[24,14,7][lv]+rnd(0,10);a.mv=0;a.blk=0;a.act=null;
  const r=Math.random(),pj=me.ch.sp.type==='proj';
  if(op.st==='atk'&&ad<150&&r<[.25,.5,.78][lv])a.blk=16;
  else if(me.ch.sp2.type==='strike'&&me.mt>=50&&ad>170&&ad<300&&(op.y<GY-30||r<.12))a.act={[to]:1,sp:1};
  else if(me.ch.ex.throw&&me.mt>=100&&ad<110&&r<.35)a.act={d:1,sp:1};
  else if(op.y<GY-40&&ad<125&&lv&&r<.6)a.act={d:1,lp:1};
  else if(ad>220){a.mv=1;if(me.mt>=100&&pj&&r<.3)a.act={d:1,sp:1};else if(me.mt>=50&&pj&&r<.4)a.act={sp:1};else if(r<.12)a.act={dash:sg};else if(r<.18)a.act={u:1}}
  else if(ad>115){a.mv=1;if(r<.14)a.act={dash:sg};else if(r<.22)a.act={u:1}}
  else if(r<.5+.1*lv){const L=op.st==='block'?[{th:1},{th:1},{d:1,lk:1}]:[{lp:1},{lk:1},{hp:1},{hk:1},{d:1,lk:1},{[to]:1,hp:1},{[to]:1,hk:1},{[to]:1,lp:1},{[aw]:1,hk:1}].concat(me.mt>=50?[{[to]:1,sp:1},{[aw]:1,sp:1}]:[]).concat(me.ch.mv&&me.ch.mv.th?[{th:1},{th:1},{sp:1}]:[]);a.act=L[rnd(0,L.length)]}
  else if(r<.6)a.mv=-1;
  else if(r<.75&&me.mt>=50)a.act={sp:1};
 }
 if(a.blk>0){a.blk--;i.d=1}else{if(a.mv>0)i[to]=1;if(a.mv<0)i[aw]=1}
 if(a.act){Object.assign(i,a.act);a.act=null}
 if(i.u)a.uh=12;else if(a.uh>0){a.uh--;i.u=1}
 if(me.st==='atk'&&me.hit&&me.atk.cn&&Math.random()<[0,.1,.25][lv]){if(me.atk.cn===4){if(me.mt>=100){i.d=1;i.sp=1}}else if(me.atk.cn===1)i.hk=1;else if(me.mt>=50)i.sp=1}
 return i;
}

