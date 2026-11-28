$('nh').onclick=hostCreate;$('nj').onclick=guestJoin;$('nc').onclick=hostConnect;
$('ncp').onclick=async()=>{const t=$('mine').value;if(!t)return;try{await navigator.clipboard.writeText(t)}catch(e){$('mine').select();try{document.execCommand('copy')}catch(x){}}setNs('已複製代碼，傳給對手吧。')};
$('nx').onclick=()=>{sigStop();netReset();$('net').style.display='none';setNs('房主按「建立房間」，把 4 位數代碼告訴對手；對手輸入代碼按「加入」。')};
// ===== 連線改善:邀請連結 + 貼上即連 =====
const baseURL=()=>location.href.split('#')[0];
$('ncl').onclick=async()=>{
 const code=$('mine').value.trim();
 if(!code||NET.role!==0){setNs('請先按「① 建立房間」，產生邀請連結。');return}
 const link=baseURL()+'#o='+code;
 try{await navigator.clipboard.writeText(link);setNs('已複製邀請連結，傳給房客即可；房客打開後會自動產生回覆。')}
 catch(e){setNs('瀏覽器不允許自動複製，請把下方代碼前面加上「'+baseURL()+'#o=」傳給房客。')}
};
$('ncp').onclick=async()=>{const t=$('mine').value;if(!t)return;try{await navigator.clipboard.writeText(t)}catch(e){$('mine').select();try{document.execCommand('copy')}catch(x){}}setNs('已複製代碼，傳給對手吧。')};
// 貼上即連:房主貼上回覆 → 自動連線;房客貼上房主代碼 → 自動產生回覆
$('theirs').addEventListener('input',async()=>{
 const t=$('theirs').value.trim();if(t.length<100)return;
 let o=null;try{o=await codeDec(t)}catch(e){return}
 if(!o)return;
 if(o.k==='a'&&NET.role===0&&PC&&PC.signalingState==='have-local-offer'){hostConnect()}
 else if(o.k==='o'&&!(NET.role===0&&PC&&PC.localDescription)){guestJoin()}
});
// 開啟邀請連結 → 自動進入房客流程


// ===== 中繼伺服器設定 =====
(function(){const t=turnCfg();if(t){$('tu').value=t.u||'';$('tn').value=t.n||''}})();
$('ts').onclick=()=>{const u=$('tu').value.trim();
 if(!u){try{localStorage.removeItem('fd_turn')}catch(e){}setNs('已移除中繼伺服器設定。');return}
 if(!/^turns?:[^\s]+$/.test(u)){setNs('網址格式不對，應該像 turn:example.com:3478 或 turns:example.com:5349');return}
 try{localStorage.setItem('fd_turn',JSON.stringify({u,n:$('tn').value.trim(),p:$('tp').value}));setNs('已儲存中繼伺服器設定，下次建立或加入房間時生效。')}catch(e){setNs('這個瀏覽器不允許儲存設定。')}};

// ===== 房間代碼配對（Cloudflare 配對服務 + TURN 中繼）=====
var SIG=location.protocol==='https:'||location.protocol==='http:';
var WS=null;
function wsClose(){const w=WS;WS=null;try{w&&w.close()}catch(e){}}
function sigStop(){NET.rid=(NET.rid||0)+1;wsClose();NET.code='';NET.rcode='';NET.wopen=0;specClear();$('rcode').textContent='';$('rcode').style.display='none';$('rl').style.display='none';$('rwl').style.display='none'}
function wsOpen(code,role){return new Promise((res,rej)=>{
 let w;try{w=new WebSocket((location.protocol==='https:'?'wss://':'ws://')+location.host+'/api/ws?code='+code+'&role='+role)}catch(e){rej(e);return}
 w._q=[];w._r=null;let ok=false;
 const push=m=>{if(w._r){const r=w._r;w._r=null;r(m)}else w._q.push(m)};
 w.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(x){return}if(m&&typeof m.t==='string')push(m)};
 w.onclose=()=>{push({t:'closed'});if(!ok)rej(new Error('closed'))};
 w.onerror=()=>{if(!ok)rej(new Error('ws'))};
 w.onopen=()=>{ok=true;res(w)};
 setTimeout(()=>{if(!ok){try{w.close()}catch(e){}rej(new Error('timeout'))}},8000)})}
function wsNext(w,ms){return new Promise(res=>{if(w._q.length)return res(w._q.shift());const t=ms?setTimeout(()=>{w._r=null;res({t:'timeout'})},ms):0;w._r=m=>{clearTimeout(t);res(m)}})}
const sigSend=(w,o)=>{try{w.send(JSON.stringify(o))}catch(e){}};
function cleanIce(ice){return Array.isArray(ice)?ice.filter(s=>s&&s.urls).slice(0,6):null}
function connWatch(rid){setTimeout(()=>{if(rid===NET.rid&&!NET.room){setNs('連線逾時：雙方網路無法建立連線。請按「取消」後重新建立房間再試一次。');wsClose()}},25000)}
function showCode(code){$('rcode').textContent=code;$('rcode').style.display='block';$('rl').style.display='inline-block';$('rwl').style.display=NET.wopen?'inline-block':'none';NET.code=code;NET.rcode=code}
const SLOW='嘗試建立或加入房間的次數太多，請等幾分鐘再試。';
async function roomHost(){
 if(!SIG){setNs('從檔案直接開啟時沒有配對伺服器，請改用下方「手動交換代碼」。');return}
 if(!window.RTCPeerConnection){setNs('這個瀏覽器不支援 WebRTC，無法連線對戰。');return}
 netReset();sigStop();NET.role=0;const rid=NET.rid;
 setNs('建立房間中…');
 for(let k=0;k<6;k++){
  const code=String(1000+Math.floor(Math.random()*9000));
  let w;try{w=await wsOpen(code,'host')}catch(e){if(rid===NET.rid)setNs('連不到配對伺服器，請稍後再試，或改用下方「手動交換代碼」。');return}
  const m=await wsNext(w,8000);
  if(rid!==NET.rid){try{w.close()}catch(e){}return}
  if(m.t==='hosted'){WS=w;if($('wopen').checked){NET.wopen=1;sigSend(w,{t:'open'})}showCode(code);return hostLoop(w,code,rid)}
  if(m.t==='slow'){try{w.close()}catch(e){}setNs(SLOW);return}
  try{w.close()}catch(e){}
 }
 setNs('目前建立房間的人太多，請稍後再試。');
}
async function hostLoop(w,code,rid){
 setNs('房間已建立！把代碼 '+code+' 告訴對手，或按「複製邀請連結」傳給他。等待對手加入…');
 for(;;){
  const m=await wsNext(w);
  // 開放觀戰時，對戰中也繼續處理觀戰者的握手
  if(m.t==='spec'){specAdd(w,m);continue}
  if(m.t==='answer'&&m.from){specAnswer(m);continue}
  if(m.t==='specleft'){const sp=(NET.specs||[]).find(x=>x.id===m.id);if(sp&&!sp.ok)specDrop(m.id);continue} // 已連上的觀戰者關掉配對連線是正常的
  if(rid!==NET.rid||(NET.room&&!NET.wopen)||(m.t==='closed'&&NET.room))return;
  if(NET.room&&m.t!=='left')continue;
  if(m.t==='peer'){
   mkPC(cleanIce(m.ice));NET.role=0;const pc=PC;
   wrapChannel(PC.createDataChannel('fd',{ordered:false,maxRetransmits:0}));
   setNs('對手已加入，建立連線中…');
   try{await PC.setLocalDescription(await PC.createOffer());await gather()}catch(e){setNs('建立連線失敗：'+(e&&e.message||e));return}
   if(rid!==NET.rid||PC!==pc)return;
   sigSend(w,{t:'offer',s:PC.localDescription.sdp});
  }else if(m.t==='answer'&&PC&&PC.signalingState==='have-local-offer'){
   try{await PC.setRemoteDescription({type:'answer',sdp:String(m.s)})}catch(e){setNs('連線失敗：'+(e&&e.message||e));return}
   connWatch(rid);
  }else if(m.t==='left'){
   if(PC&&PC.connectionState==='connected')continue; // 房客接上後才關掉配對連線，不是真的離開
   try{PC&&PC.close()}catch(e){}PC=null;
   setNs('對手離開了。房間 '+code+' 仍然開著，等待新的對手加入…');
  }else if(m.t==='closed'){
   if(rid===NET.rid&&!NET.room)setNs('與配對伺服器的連線中斷，請重新建立房間。');return;
  }
 }
}
async function roomJoin(code){
 code=String(code||'').replace(/\D/g,'');
 if(code.length!==4){setNs('請輸入 4 位數的房間代碼。');return}
 if(!SIG){setNs('從檔案直接開啟時沒有配對伺服器，請改用下方「手動交換代碼」。');return}
 if(!window.RTCPeerConnection){setNs('這個瀏覽器不支援 WebRTC，無法連線對戰。');return}
 netReset();sigStop();NET.role=1;NET.rcode=code;const rid=NET.rid;
 setNs('加入房間 '+code+' 中…');
 let w;try{w=await wsOpen(code,'guest')}catch(e){if(rid===NET.rid)setNs('連不到配對伺服器，請稍後再試，或改用下方「手動交換代碼」。');return}
 if(rid!==NET.rid){try{w.close()}catch(e){}return}
 WS=w;
 for(;;){
  const m=await wsNext(w,PC?0:15000);
  if(rid!==NET.rid||NET.room)return;
  if(m.t==='slow'){setNs(SLOW);wsClose();return}
  if(m.t==='noroom'){setNs('找不到房間 '+code+'。請確認代碼，或請房主重新建立房間。');wsClose();return}
  if(m.t==='full'){setNs('房間 '+code+' 已經有對手了。');wsClose();return}
  if(m.t==='joined'){mkPC(cleanIce(m.ice));NET.role=1;PC.ondatachannel=e=>wrapChannel(e.channel);setNs('已加入房間 '+code+'，建立連線中…')}
  else if(m.t==='offer'&&PC&&PC.signalingState==='stable'){
   const pc=PC;
   try{await PC.setRemoteDescription({type:'offer',sdp:String(m.s)});await PC.setLocalDescription(await PC.createAnswer());await gather()}catch(e){setNs('連線失敗：'+(e&&e.message||e));return}
   if(rid!==NET.rid||PC!==pc)return;
   sigSend(w,{t:'answer',s:PC.localDescription.sdp});connWatch(rid);
  }else if(m.t==='left'){setNs('房主已離開房間。');wsClose();return}
  else if(m.t==='closed'||m.t==='timeout'){if(rid===NET.rid&&!NET.room)setNs('與配對伺服器的連線中斷，請再試一次。');wsClose();return}
 }
}
async function viaInfo(){try{const st=await PC.getStats();let pair=null;st.forEach(r=>{if(r.type==='transport'&&r.selectedCandidatePairId)pair=st.get(r.selectedCandidatePairId)});if(!pair)st.forEach(r=>{if(r.type==='candidate-pair'&&r.nominated&&r.state==='succeeded')pair=r});if(!pair)return;const lc=st.get(pair.localCandidateId),rc=st.get(pair.remoteCandidateId);NET.via=(lc&&lc.candidateType==='relay')||(rc&&rc.candidateType==='relay')?'relay':'direct'}catch(e){}}
$('rh').onclick=roomHost;
$('rj').onclick=()=>roomJoin($('rc2').value);
$('rc2').addEventListener('keydown',e=>{if(e.key==='Enter')roomJoin($('rc2').value)});
$('rc2').addEventListener('input',()=>{$('rc2').value=$('rc2').value.replace(/\D/g,'').slice(0,4)});
$('rl').onclick=async()=>{if(!NET.code)return;const link=baseURL()+'#r='+NET.code;try{await navigator.clipboard.writeText(link);setNs('已複製邀請連結，傳給對手；對手打開就會自動加入房間 '+NET.code+'。')}catch(e){setNs('瀏覽器不允許自動複製，請直接把代碼 '+NET.code+' 告訴對手。')}};
if(!SIG){$('rm').style.display='none';$('manual').open=true}
function inviteHash(){
 let m=location.hash.match(/^#r=(\d{4})$/);
 if(m){history.replaceState(null,'',baseURL());if(G.mode===4&&NET.on)return;$('menu').style.display='flex';$('net').style.display='block';$('rc2').value=m[1];roomJoin(m[1]);return}
 m=location.hash.match(/^#o=([A-Za-z0-9_\-]+)$/);
 if(m){history.replaceState(null,'',baseURL());if(G.mode===4&&NET.on)return;$('menu').style.display='flex';$('net').style.display='block';$('manual').open=true;$('theirs').value=m[1];setNs('收到邀請，正在產生回覆代碼…');guestJoin()}
}
addEventListener('hashchange',inviteHash);
inviteHash();

// ===== 觀戰 =====
// 房主（開放觀戰時）：每位觀戰者一條 WebRTC 資料通道。先送「雙方輸入都已確認」那一幀的完整快照，
// 之後持續送已確認的雙方輸入；觀戰者用同一套模擬照著算，畫面就和雙方一致。
NET.specs=NET.specs||[];
function specClear(){for(const sp of NET.specs||[]){try{sp.pc.close()}catch(e){}}NET.specs=[]}
function specDrop(id){NET.specs=(NET.specs||[]).filter(sp=>{if(sp.id!==id)return true;try{sp.pc.close()}catch(e){}return false})}
async function specAdd(w,m){
 if(!NET.wopen||typeof m.id!=='string')return;specDrop(m.id);
 const pc=new RTCPeerConnection(rtcCfg(cleanIce(m.ice))),ch=pc.createDataChannel('fdw'),sp={id:m.id,pc,ch,m:-1,sent:0,ok:0};
 ch.onopen=()=>{sp.ok=1};ch.onclose=()=>specDrop(sp.id);NET.specs.push(sp);
 try{await pc.setLocalDescription(await pc.createOffer());await new Promise(res=>{if(pc.iceGatheringState==='complete')return res();const t=setTimeout(res,3000);pc.onicegatheringstatechange=()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);res()}}});sigSend(w,{t:'offer',to:m.id,s:pc.localDescription.sdp})}catch(e){specDrop(m.id)}
}
async function specAnswer(m){const sp=(NET.specs||[]).find(x=>x.id===m.from);if(!sp||sp.pc.signalingState!=='have-local-offer')return;try{await sp.pc.setRemoteDescription({type:'answer',sdp:String(m.s)})}catch(e){specDrop(sp.id)}}
function specPump(){
 if(NET.slot!==0||!NET.on||!NET.specs||!NET.specs.length)return;
 const C=Math.min(NET.remHigh,NET.tick-1);
 for(const sp of NET.specs){if(!sp.ok||sp.ch.readyState!=='open')continue;
  try{
   if(sp.m!==NET.m){if(C>=0&&NET.snaps[C]){sp.ch.send(JSON.stringify({t:'wst',m:NET.m,c:NET.c,g:NET.g,s:NET.sm,hz:NET.hz,f:C,snap:NET.snaps[C]}));sp.m=NET.m;sp.sent=C-1}continue}
   if(C>sp.sent){const a=[],b=[];for(let k=sp.sent+1;k<=C;k++){a.push(NET.loc[k]|0);b.push(NET.rem[k]|0)}sp.ch.send(JSON.stringify({t:'win',m:NET.m,f:sp.sent+1,a,b}));sp.sent=C}
  }catch(e){}}
}
// 觀戰者
let WPC=null;
function watchStop(say){NET.watch=null;try{WPC&&WPC.close()}catch(e){}WPC=null;wsClose();if(say)setNs(say)}
function watchQuit(){watchStop();toMenu()}
async function watchJoin(code){
 code=String(code||'').replace(/\D/g,'');
 if(code.length!==4){setNs('請輸入 4 位數的房間代碼。');return}
 if(!SIG){setNs('從檔案直接開啟時沒有配對伺服器，無法觀戰。');return}
 if(!window.RTCPeerConnection){setNs('這個瀏覽器不支援 WebRTC，無法觀戰。');return}
 netReset();sigStop();watchStop();const rid=NET.rid;setNs('連到房間 '+code+' 觀戰中…');
 let w;try{w=await wsOpen(code,'spec')}catch(e){if(rid===NET.rid)setNs('連不到配對伺服器，請稍後再試。');return}
 if(rid!==NET.rid){try{w.close()}catch(e){}return}
 WS=w;
 for(;;){
  const m=await wsNext(w,WPC?0:15000);
  if(rid!==NET.rid)return;
  if(m.t==='slow'){setNs(SLOW);wsClose();return}
  if(m.t==='noroom'){setNs('找不到房間 '+code+'。');wsClose();return}
  if(m.t==='nowatch'){setNs('房間 '+code+' 沒有開放觀戰。');wsClose();return}
  if(m.t==='specfull'){setNs('房間 '+code+' 的觀戰人數已滿。');wsClose();return}
  if(m.t==='watching'){WPC=new RTCPeerConnection(rtcCfg(cleanIce(m.ice)));WPC.ondatachannel=e=>watchChannel(e.channel);setNs('已連到房間 '+code+'，等待房主回應…')}
  else if(m.t==='offer'&&WPC&&WPC.signalingState==='stable'){const pc=WPC;
   try{await pc.setRemoteDescription({type:'offer',sdp:String(m.s)});await pc.setLocalDescription(await pc.createAnswer());await new Promise(res=>{if(pc.iceGatheringState==='complete')return res();const t=setTimeout(res,3000);pc.onicegatheringstatechange=()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);res()}}})}catch(e){setNs('觀戰連線失敗：'+(e&&e.message||e));return}
   if(rid!==NET.rid||WPC!==pc)return;sigSend(w,{t:'answer',s:pc.localDescription.sdp})}
  else if(m.t==='left'){if(NET.watch){watchStop();toMenu();setNs('房主已離開，觀戰結束。')}else{setNs('房主已離開房間。');wsClose()}return}
  else if(m.t==='closed'||m.t==='timeout'){if(rid===NET.rid&&!NET.watch&&!(WPC&&WPC.connectionState==='connected'))setNs('與配對伺服器的連線中斷，請再試一次。');return}
 }
}
function watchChannel(ch){
 ch.onopen=()=>{wsClose();setNs('觀戰連線已建立，等待對戰畫面…')};
 ch.onclose=()=>{if(NET.watch||WPC){const was=!!NET.watch;watchStop();if(was){toMenu();setNs('觀戰連線中斷。')}}};
 ch.onmessage=e=>{let d;try{d=JSON.parse(e.data)}catch(x){return}if(!d)return;
  if(d.t==='wst'&&typeof d.snap==='string'&&Array.isArray(d.c))watchStart(d);
  else if(d.t==='win'&&NET.watch&&d.m===NET.watch.m&&Array.isArray(d.a)&&Array.isArray(d.b)){const W2=NET.watch;for(let k=0;k<d.a.length;k++){W2.a[d.f+k]=d.a[k]&1023;W2.b[d.f+k]=d.b[k]&1023}}};
}
function watchStart(d){
 let snap;try{snap=JSON.parse(d.snap);if(!snap||!Array.isArray(snap.g))return}catch(e){return}
 const cl=v=>Math.max(0,Math.min(CH.length-1,v|0)),sv=[sel[0],sel[1],G.stage];
 sel[0]=cl(d.c[0]);sel[1]=cl(d.c[1]);G.stage=Math.max(0,Math.min(STG.length-1,d.g|0));G.smo=Array.isArray(d.s)?d.s:[0,0];G.hzo=d.hz?1:0;
 $('net').style.display='none';startGame(4);REC=null;sel[0]=sv[0];sel[1]=sv[1];G.stage=sv[2];
 loadAll(d.snap);NET.slot=-1;NET.watch={m:d.m,next:d.f,a:{},b:{},h:{}};
}
// 觀戰者的主迴圈：有輸入就照著算；落後太多就一次多算幾幀追上
function watchTick(acc){
 const W2=NET.watch;if(!W2)return 0;let n=0;
 const ahead=()=>{let k=W2.next;while(W2.a[k]!==undefined)k++;return k-W2.next};
 const run=()=>{const k=W2.next;if(W2.a[k]===undefined)return false;NET.inp=[W2.a[k],W2.b[k]];step();delete W2.a[k];delete W2.b[k];W2.next++;if(k%30===29)W2.h[k]=rbFnv(canon(JSON.parse(snapAll())));return true};
 while(acc>=16.667){if(!run())return Math.min(acc,33);acc-=16.667;n++}
 if(ahead()>20)for(let i=0;i<4&&run();i++);
 return acc;
}
$('rw').onclick=()=>watchJoin($('rc2').value);
$('rwl').onclick=async()=>{if(!NET.code)return;const link=baseURL()+'#w='+NET.code;try{await navigator.clipboard.writeText(link);setNs('已複製觀戰連結，打開的人可以觀看這個房間的對戰。')}catch(e){setNs('瀏覽器不允許自動複製，請把代碼 '+NET.code+' 告訴觀眾，讓他們按「觀戰」。')}};
function watchHash(){const m=location.hash.match(/^#w=(\d{4})$/);if(!m)return;history.replaceState(null,'',baseURL());if(G.mode===4&&(NET.on||NET.watch))return;$('menu').style.display='flex';$('net').style.display='block';$('rc2').value=m[1];watchJoin(m[1])}
addEventListener('hashchange',watchHash);watchHash();
