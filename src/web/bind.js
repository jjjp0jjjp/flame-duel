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
function sigStop(){NET.rid=(NET.rid||0)+1;wsClose();NET.code='';$('rcode').textContent='';$('rcode').style.display='none';$('rl').style.display='none'}
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
function showCode(code){$('rcode').textContent=code;$('rcode').style.display='block';$('rl').style.display='inline-block';NET.code=code}
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
  if(m.t==='hosted'){WS=w;showCode(code);return hostLoop(w,code,rid)}
  if(m.t==='slow'){try{w.close()}catch(e){}setNs(SLOW);return}
  try{w.close()}catch(e){}
 }
 setNs('目前建立房間的人太多，請稍後再試。');
}
async function hostLoop(w,code,rid){
 setNs('房間已建立！把代碼 '+code+' 告訴對手，或按「複製邀請連結」傳給他。等待對手加入…');
 for(;;){
  const m=await wsNext(w);
  if(rid!==NET.rid||NET.room)return;
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
 netReset();sigStop();NET.role=1;const rid=NET.rid;
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
