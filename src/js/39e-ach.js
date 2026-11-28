// ===== 成就（只存在本機，不影響對戰）=====
// 只計算「自己」：單人與雙人是 P1、連線是自己的位置；重播、觀戰、訓練不算
const ACH=[
 ['win','初次勝利','贏下一場對戰'],
 ['perfect','完美勝利','一滴血都沒掉就拿下一回合'],
 ['combo10','十連擊','打出 10 段以上的連段'],
 ['exko','華麗收尾','用超必殺技 KO 對手'],
 ['parry10','招架大師','累計精準招架 10 次'],
 ['rc20','迅移自如','累計迅移取消 20 次'],
 ['arc','街機通關','打通街機模式'],
 ['arc0','一命通關','不接關打通街機模式'],
 ['surv10','生存專家','生存模式連勝 10 場'],
 ['tower10','登高','爬塔突破第 10 層'],
 ['daily','每日一戰','完成一次每日挑戰'],
 ['online','連線勝利','在連線對戰中獲勝'],
 ['allchar','全角色制霸','用全部 16 位角色各贏過一場'],
 ['style','流派使用者','用流派贏下一場對戰'],
 ['mut','逆境求生','在突變規則下獲勝']];
let ACS={};try{ACS=JSON.parse(localStorage.getItem('fd_ach')||'{}')||{}}catch(e){ACS={}}
ACS.u=ACS.u||{};ACS.n=ACS.n||{};ACS.w=ACS.w||[];
const achSave=()=>{try{localStorage.setItem('fd_ach',JSON.stringify(ACS))}catch(e){}};
function achGet(id){if(ACS.u[id])return;ACS.u[id]=Date.now();achSave();const a=ACH.find(x=>x[0]===id);if(a&&typeof toast==='function')toast('🏆 成就解鎖：'+a[1]+'　'+a[2]);snd(880,.15,'triangle',.06,1320);achLabel()}
const achMe=f=>!RP&&!NET.watch&&G.mode!==3&&!TUT&&(G.mode===4?f===(NET.slot?p2:p1):f===p1);
// 事件：match（整場結束）、round（回合結束）、combo、parry、rc、arc、surv、tower、daily
function achEv(t,x){
 if(t==='parry'||t==='rc'){if(!achMe(x))return;ACS.n[t]=(ACS.n[t]||0)+1;achSave();if(t==='parry'&&ACS.n.parry>=10)achGet('parry10');if(t==='rc'&&ACS.n.rc>=20)achGet('rc20');return}
 if(t==='combo'){if(achMe(x.src)&&x.n>=10)achGet('combo10');return}
 if(t==='round'){const w=x;if(!w||!achMe(w))return;if(w.hp>=w.ch.hp*(w.hm||1))achGet('perfect');if(w.atk&&w.atk.ex&&(p1.st==='ko'||p2.st==='ko'))achGet('exko');return}
 if(t==='match'){const w=x;if(!w||!achMe(w))return;achGet('win');if(G.mode===4)achGet('online');if(w.sty)achGet('style');if(G.mu)achGet('mut');
  const c=CH.indexOf(w.ch);if(!ACS.w.includes(c)){ACS.w.push(c);achSave()}if(ACS.w.length>=CH.length)achGet('allchar');return}
 if(t==='arc'){achGet('arc');if(x===0)achGet('arc0');return}
 if(t==='surv'&&x>=10)achGet('surv10');
 if(t==='tower'&&x>=10)achGet('tower10');
 if(t==='daily')achGet('daily');
}
function achLabel(){const b=$('bach');if(b)b.textContent='🏆 成就 '+ACH.filter(a=>ACS.u[a[0]]).length+'／'+ACH.length}
function achPanel(){const d=document.createElement('div');d.id='tpick';
 d.innerHTML='<div class="tp" style="width:min(620px,94vw);max-width:none"><b>成就（'+ACH.filter(a=>ACS.u[a[0]]).length+'／'+ACH.length+'）</b><div class="achl">'+ACH.map(([id,n,ds])=>{const u=ACS.u[id],p=id==='parry10'?' （'+Math.min(10,ACS.n.parry||0)+'／10）':id==='rc20'?' （'+Math.min(20,ACS.n.rc||0)+'／20）':id==='allchar'?' （'+ACS.w.length+'／'+CH.length+'）':'';return'<div class="'+(u?'on':'')+'"><b>'+(u?'🏆':'🔒')+' '+n+'</b><small>'+ds+p+'</small></div>'}).join('')+'</div><div class="row"><button id="achx">關閉</button></div></div>';
 document.body.appendChild(d);$('achx').onclick=()=>d.remove();d.onclick=e=>{if(e.target===d)d.remove()}}
$('bach').onclick=()=>{snd(500,.08);achPanel()};achLabel();
