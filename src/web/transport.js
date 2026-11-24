NET.sendIv=16; // WebRTC DataChannel 可以送得比較密
const RTC_CFG={iceServers:[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']},{urls:'stun:global.stun.twilio.com:3478'}]};
let PC=null;
function turnCfg(){try{return JSON.parse(localStorage.getItem('fd_turn')||'null')}catch(e){return null}}
function rtcCfg(ice){const c={iceServers:(ice&&ice.length?ice:RTC_CFG.iceServers).slice()},t=turnCfg();if(t&&t.u)c.iceServers.push({urls:t.u,username:t.n||'',credential:t.p||''});return c}
function mkPC(ice){
 try{if(PC)PC.close()}catch(e){}
 PC=new RTCPeerConnection(rtcCfg(ice));
 const me=PC;
 PC.onconnectionstatechange=()=>{if(PC!==me)return;if(me.connectionState==='failed'){if(NET.on){NET.gone=true;setTimeout(()=>{if(NET.gone&&NET.room)netQuit(0)},2500)}else setNs('連線失敗：雙方網路無法建立連線。請按「取消」後重新建立房間再試一次。')}};
 return PC;
}
function gather(){return new Promise(res=>{if(PC.iceGatheringState==='complete')return res();const t=setTimeout(res,3000);PC.onicegatheringstatechange=()=>{if(PC.iceGatheringState==='complete'){clearTimeout(t);res()}}})}
function wrapChannel(ch){
 const hs={};
 ch.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(x){return}if(!m||typeof m.t!=='string')return;(hs[m.t]||[]).slice().forEach(h=>h({data:m.d,isMe:false}))};
 const R={
  emit:(t,d)=>{try{if(ch.readyState==='open')ch.send(JSON.stringify({t,d}))}catch(e){}return Promise.resolve()},
  on:(t,h)=>{(hs[t]=hs[t]||[]).push(h);return()=>{hs[t]=(hs[t]||[]).filter(x=>x!==h)}},
  leave:async()=>{try{ch.close()}catch(e){}if(NET.room===null){try{PC&&PC.close()}catch(e){}PC=null}}
 };
 const opened=()=>{if(NET.room!==R&&!NET.room)attach(R,NET.role)};
 ch.onopen=opened;
 ch.onclose=()=>{if(NET.room===R){if(NET.on)onBye();else{setNs('連線已中斷，請重新建立房間。');netLeave(0)}}};
 if(ch.readyState==='open')opened();
 return R;
}
function attach(R,slot){
 NET.room=R;NET.slot=slot;NET.started=false;NET.gone=false;NET.remote=null;NET.sid='';NET.pings=[];
 NET.unsub=[R.on('hello',m=>onHello(m.data)),R.on('start',m=>onStart(m.data)),R.on('ready',m=>onReady(m.data)),R.on('inp',m=>onInp(m.data)),R.on('bye',()=>onBye()),R.on('png',m=>{if(NET.slot===1&&NET.room)NET.room.emit('pog',{t:m.data&&m.data.t})}),R.on('pog',m=>onPog(m.data)),R.on('rem',m=>onRem(m.data)),R.on('rst',m=>onRst(m.data)),R.on('srq',m=>onSrq(m.data)),R.on('snp',m=>onSnp(m.data))];
 wsClose();NET.via='';viaInfo();
 setNs(slot?'已連線！等待房主開始…':'已連線！測量連線品質中…');
 clearInterval(NET.hb);NET.hb=setInterval(netHello,300);netHello();
}
const emitErr=()=>{};
async function hostCreate(){
 sigStop();netLeave(0);mkPC();NET.role=0;$('mine').value='';
 if(!window.RTCPeerConnection){setNs('這個瀏覽器不支援 WebRTC，無法連線對戰。');return}
 setNs('產生連線代碼中…');
 try{
  wrapChannel(PC.createDataChannel('fd',{ordered:false,maxRetransmits:0}));
  await PC.setLocalDescription(await PC.createOffer());await gather();
  $('mine').value=await codeEnc({k:'o',s:PC.localDescription.sdp});
  setNs('① 按「複製」把「我的代碼」傳給對手　② 等對手傳回代碼，貼到「對方的代碼」，按「③ 連線」');
 }catch(e){setNs('建立房間失敗：'+(e&&e.message||e))}
}
async function guestJoin(){
 if(!window.RTCPeerConnection){setNs('這個瀏覽器不支援 WebRTC，無法連線對戰。');return}
 const txt=$('theirs').value.trim();if(!txt){setNs('請先把房主傳來的代碼貼到「對方的代碼」');return}
 if(txt===NET.lastIn)return;NET.lastIn=txt;
 let o;try{o=await codeDec(txt)}catch(e){setNs('代碼格式不正確，請確認完整複製。');return}
 if(!o||o.k!=='o'||typeof o.s!=='string'){setNs('這不是房主的代碼（應由房主按「① 建立房間」產生）。');return}
 sigStop();netLeave(0);mkPC();NET.role=1;$('mine').value='';
 setNs('產生回覆代碼中…');
 try{
  PC.ondatachannel=e=>wrapChannel(e.channel);
  await PC.setRemoteDescription({type:'offer',sdp:o.s});await PC.setLocalDescription(await PC.createAnswer());await gather();
  $('mine').value=await codeEnc({k:'a',s:PC.localDescription.sdp});
  setNs('回覆已產生！按「複製代碼」傳回給房主，房主貼上後會自動連線。');
 }catch(e){setNs('加入失敗：'+(e&&e.message||e))}
}
async function hostConnect(){
 if(NET.role===0&&PC&&PC.signalingState==='stable')return;
 if(!PC||NET.role!==0||!PC.localDescription){setNs('請先按「① 建立房間」');return}
 const txt=$('theirs').value.trim();if(!txt){setNs('請把房客傳回的代碼貼到「對方的代碼」');return}
 let o;try{o=await codeDec(txt)}catch(e){setNs('代碼格式不正確，請確認完整複製。');return}
 if(!o||o.k!=='a'||typeof o.s!=='string'){setNs('這不是房客的回覆代碼。');return}
 try{await PC.setRemoteDescription({type:'answer',sdp:o.s});setNs('連線中…')}catch(e){setNs('連線失敗：'+(e&&e.message||e))}
}
function netReset(){netLeave(1);try{PC&&PC.close()}catch(e){}PC=null;$('mine').value='';$('theirs').value=''}
