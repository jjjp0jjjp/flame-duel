// ===== 幀數條、輸入顯示、3 對 3 隊伍戰、生存模式 =====
// ---- 幀數條（訓練模式）：每幀記錄雙方狀態，畫在畫面底部
const FM={a:[],b:[]},FMN=96;
function fmCode(f){
 if(f.st==='atk'&&f.atk){const a=f.atk;return f.t<=a.su?1:f.t<=a.su+a.ac?2:3}
 if(f.st==='hit'||(f.st==='block'&&f.stun>0))return 4;
 if(f.st==='down')return 5;if(f.st==='dash')return 6;if(f.y<GY-2)return 7;return 0;
}
const FMC=['#2a2f4a','#3ddc6a','#ff4040','#4d7bff','#ffd23d','#8a8fa8','#7fe3ff','#cfd2ff'];
function fmRec(){for(const[f,L]of[[p1,FM.a],[p2,FM.b]]){const inv=f.st==='down'||(f.st==='dash'&&f.inv>0)||(f.atk&&f.atk.inv&&f.t<=(f.atk.iv||f.atk.su+3));L.push(fmCode(f)+(inv?8:0));if(L.length>FMN)L.shift()}}
function fmDraw(){
 const cw=6,x0=W/2-FMN*cw/2;ctx.save();ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(x0-50,H-30,FMN*cw+58,26);ctx.font='10px '+FONT;ctx.fillStyle='#cfd2ff';ctx.textAlign='left';ctx.fillText('P1',x0-44,H-19);ctx.fillText('P2',x0-44,H-8);
 [FM.a,FM.b].forEach((L,r)=>L.forEach((c,i)=>{const y=H-27+r*11;ctx.fillStyle=FMC[c&7];ctx.fillRect(x0+i*cw,y,cw-1,9);if(c&8){ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.strokeRect(x0+i*cw+.5,y+.5,cw-2,8)}}));ctx.restore();
}
// ---- 輸入顯示（訓練、重播）：最近的輸入變化與持續幀數
const INL=[[],[]];
const inStr=i=>{if(!i)return'';const h=(i.r?1:0)-(i.l?1:0),v=(i.d?1:0)-(i.u?1:0),dir=['↖','↑','↗','←','','→','↙','↓','↘'][(v+1)*3+h+1],b=['lp','hp','lk','hk','sp','th'].filter(k=>i[k]).map(k=>({lp:'LP',hp:'HP',lk:'LK',hk:'HK',sp:'SP',th:'TH'})[k]);return(dir+(i.dash?'≫':'')+(b.length?' '+b.join('+'):'')).trim()};
function inRec(a,b){[a,b].forEach((x,k)=>{const L=INL[k],s=inStr(x);if(L.length&&L[L.length-1][0]===s)L[L.length-1][1]++;else{L.push([s,1]);if(L.length>14)L.shift()}})}
function inDraw(k,x){const L=INL[k];ctx.save();ctx.font='bold 12px '+FONT;ctx.textAlign=k?'right':'left';L.slice().reverse().forEach((e,j)=>{if(!e[0])return;const y=128+j*18;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(k?x-96:x,y-12,96,16);ctx.fillStyle='#fff';ctx.fillText(e[0],k?x-32:x+4,y);ctx.fillStyle='#8a8fa8';ctx.fillText(e[1],k?x-4:x+92-ctx.measureText(String(e[1])).width,y)});ctx.restore()}
// ---- 一回合決勝的連戰（隊伍戰、生存）：共用的開打與結算
let TEAM=null,SURV=null;
function chainStart(c0,c1,mode,hp0,hp1){
 sel[0]=c0;sel[1]=c1;startGame(mode);G.ft=1;
 if(hp0!=null){p1.hp=p1.lag=hp0}if(hp1!=null){p2.hp=p2.lag=hp1}
 if(REC)REC.ini={ft:1,hp:[p1.hp,p2.hp]};
}
const regen=(f,r)=>Math.min(f.ch.hp*(f.hm||1),f.hp+f.ch.hp*r);
// 隊伍戰：輸的換下一位，贏的保留體力並回復 20%
function teamFight(){const T=TEAM;chainStart(T.A[T.ia],T.B[T.ib],T.mode,T.ha,T.hb);T.res=null}
function teamNext(){const T=TEAM;if(!T||!T.res)return;if(T.done){toMenu();return}
 if(T.res==='a'){T.ha=regen(p1,.2);T.hb=null;T.ib++}else{T.hb=regen(p2,.2);T.ha=null;T.ia++}
 if(T.ia>=3||T.ib>=3){T.done=1;G.msg=T.ia>=3?(T.mode===1?'電腦隊伍 勝利':'P2 隊伍 勝利'):'P1 隊伍 勝利';G.mt=G.mm=1e9;sfx('round');return}
 teamFight()}
// 生存：無限連戰，勝場回復 25% 體力，每 3 勝難度提高
function survFight(){const S=SURV;let c;do{c=Math.random()*CH.length|0}while(c===S.last&&CH.length>1);S.last=c;G.diff=Math.min(2,S.d0+Math.floor(S.n/3));chainStart(S.me,c,1,S.hp,null);S.res=null}
function survNext(){const S=SURV;if(!S||!S.res)return;if(S.done){toMenu();return}
 if(S.res==='a'){S.n++;achEv('surv',S.n);S.hp=regen(p1,.25);survFight();return}
 S.done=1;try{const r=JSON.parse(localStorage.getItem('fd_surv')||'{}');if((r[S.me]||0)<S.n){r[S.me]=S.n;localStorage.setItem('fd_surv',JSON.stringify(r))}}catch(e){}
 G.msg='生存 '+S.n+' 勝';G.mt=G.mm=1e9}
function chainResult(w){if(RP)return;const r=w===p1?'a':w===p2?'b':'b';if(TEAM)TEAM.res=r;if(SURV)SURV.res=r;if(DAILY)DAILY.res=r;if(TOWER)TOWER.res=r;if(BOSSF)BOSSF.res=r}
function chainNext(){if(ARC)arcNext();else if(TEAM)teamNext();else if(SURV)survNext();else if(TOWER)towerNext();else toMenu()}
function chainTip(){
 if(ARC)return arcTip();
 if(TEAM)return TEAM.done?'按 Enter 回選單':'按 Enter 下一場（剩 P1 '+(3-TEAM.ia-(TEAM.res==='b'?1:0))+' 人、對手 '+(3-TEAM.ib-(TEAM.res==='a'?1:0))+' 人）';
 if(DAILY)return dailyTip();
 if(TOWER)return towerTip();
 if(BOSSF)return bossTip();
 if(SURV)return SURV.done?'最佳紀錄已保存　按 Enter 回選單':'勝利！按 Enter 繼續（回復 25% 體力）';
 return'按 Enter 或點擊畫面回到選單'}
function chainEnd(){if(SURV)G.diff=SURV.d0;TEAM=null;SURV=null;dailyEnd();towerEnd();bossEnd();G.ft=0;dailyCard();towerCard();bossCard()}
function chainHud(){
 if(G.phase==='menu')return;ctx.save();ctx.textAlign='center';ctx.font='bold 14px '+FONT;
 if(TEAM){[[TEAM.A,TEAM.ia,0],[TEAM.B,TEAM.ib,1]].forEach(([L,ix,k])=>L.forEach((c,j)=>{const x=k?W-60-j*30:60+j*30,y=110;ctx.globalAlpha=j<ix?.25:1;ctx.drawImage(HEAD[c],x-13,y-13,26,26);ctx.strokeStyle=j===ix?'#ffe14d':'#555';ctx.lineWidth=2;ctx.strokeRect(x-13,y-13,26,26)}));ctx.globalAlpha=1;ctx.fillStyle='#ffe14d';ctx.fillText('隊伍戰',W/2,90)}
 if(SURV){ctx.fillStyle='#ffe14d';ctx.fillText('生存 第 '+(SURV.n+1)+' 戰　難度 '+DF[G.diff],W/2,90)}
 ctx.restore()}
function survInfo(){try{const r=JSON.parse(localStorage.getItem('fd_surv')||'{}'),b=Math.max(0,...Object.values(r));return b?'　生存最佳：'+b+' 勝':''}catch(e){return''}}
// ---- 隊伍選擇視窗
function teamPicker(){
 const d=document.createElement('div');d.id='tpick';d.innerHTML='<div class="tp"><b>隊伍戰：各選 3 位角色（依序上場）</b><div class="tp-row"><span>P1</span><div id="tpA" class="tp-slots"></div></div><div class="tp-row"><span id="tpBl">電腦</span><div id="tpB" class="tp-slots"></div></div><div id="tpG"></div><div class="row"><button id="tpM">對手：電腦</button><button id="tpR">🎲 隨機補滿</button><button id="tpC">清除</button><button id="tpS" class="main">開始</button><button id="tpX">取消</button></div></div>';
 document.body.appendChild(d);const A=[],B=[];let mode=1;
 const draw=()=>{[[A,'tpA'],[B,'tpB']].forEach(([L,id])=>{$(id).innerHTML=[0,1,2].map(j=>L[j]!=null?'<span style="border-color:'+CH[L[j]].col+'">'+CH[L[j]].n+'</span>':'<span class="em">？</span>').join('')});$('tpM').textContent='對手：'+(mode===1?'電腦':'玩家二');$('tpBl').textContent=mode===1?'電腦':'P2';$('tpS').disabled=!(A.length===3&&B.length===3)};
 CH.forEach((ch,i)=>{const b=document.createElement('button');b.className='cell';b.style.background='radial-gradient(circle at 50% 38%,'+ch.col+'66,#0b0b1e 72%)';const c=document.createElement('canvas');c.width=c.height=200;c.getContext('2d').drawImage(HEAD[i],0,0);b.appendChild(c);b.insertAdjacentHTML('beforeend','<span class="nm">'+ch.n+'</span>');b.onclick=()=>{if(A.length<3)A.push(i);else if(B.length<3)B.push(i);draw()};$('tpG').appendChild(b)});
 $('tpM').onclick=()=>{mode=mode===1?2:1;draw()};$('tpC').onclick=()=>{A.length=0;B.length=0;draw()};
 $('tpR').onclick=()=>{const r=()=>Math.random()*CH.length|0;while(A.length<3)A.push(r());while(B.length<3)B.push(r());draw()};
 $('tpX').onclick=()=>d.remove();$('tpS').onclick=()=>{d.remove();TEAM={A:A.slice(),B:B.slice(),ia:0,ib:0,ha:null,hb:null,mode,res:null};teamFight()};draw();
}
$('b8').onclick=()=>{snd(500,.1);teamPicker()};
$('b9').onclick=()=>{snd(500,.1);SURV={me:sel[0],n:0,hp:null,d0:G.diff,last:-1,res:null};survFight()};
// ---- 簡易操作（輔助連段）：命中後在中立方向連按任一攻擊鍵，自動接 輕→中→重→必殺；傷害 ×0.85
const SMC={lp:'lk',jab:'lk',blp:'lk',lk:'hp',push:'hp',dlk:'hp',hp:'sp',hk:'sp',dhp:'sp',lunge:'sp',bhp:'sp',spin:'sp',flip:'sp',sweep:'sp'};
let SIMPLE=[0,0];try{const o=JSON.parse(localStorage.getItem('fd_sm')||'null');if(Array.isArray(o))SIMPLE=[o[0]?1:0,o[1]?1:0]}catch(e){}
function smApply(m){const s=G.smo||[SIMPLE[0],m===2?SIMPLE[1]:0];G.smo=null;p1.sm=s[0]?1:0;p2.sm=s[1]?1:0;if(REC&&(p1.sm||p2.sm))REC.s=[p1.sm,p2.sm]}
const smName=k=>SIMPLE[k]?'簡易':'傳統';
function smLabel(){$('smbtn').textContent='操作：P1 '+smName(0)+'／P2 '+smName(1)}
$('smbtn').onclick=()=>{const n=((SIMPLE[0]?1:0)+(SIMPLE[1]?2:0)+1)%4;SIMPLE=[n&1,n>>1&1];try{localStorage.setItem('fd_sm',JSON.stringify(SIMPLE))}catch(e){}smLabel();snd(600,.06)};smLabel();
