async function getRoom(){try{if(!window.claude||!claude.use)return null;return await claude.use('room')}catch(e){return null}}
function emitErr(e){if(e&&e.code==='not_permitted')setNs('你沒有傳送權限：頁面擁有者需把你設為 Contributor（貢獻者）以上，才能連線對戰。')}
async function netJoin(host){
 if(NET.room)netLeave();
 setNs('連線中…');
 const lob=await getRoom();
 if(!lob){setNs('此環境無法連線：請在 claude.ai 登入並開啟此頁（公開連結或下載的檔案不支援）。');return}
 const code=host?Math.random().toString(36).slice(2,6):$('rc').value.trim().toLowerCase().replace(/[^a-z0-9]/g,'');
 if(code.length<3){setNs('請先輸入房間代碼');return}
 let R;try{R=await lob.join('fd-'+code)}catch(e){setNs('無法加入房間（'+(e&&e.code||'error')+'）');return}
 NET.lobby=lob;NET.room=R;NET.slot=host?0:1;NET.code=code;NET.started=false;NET.gone=false;NET.remote=null;NET.sid='';NET.pings=[];
 NET.unsub=[R.on('hello',m=>{if(!m.isMe)onHello(m.data)}),R.on('start',m=>{if(!m.isMe)onStart(m.data)}),R.on('ready',m=>{if(!m.isMe)onReady(m.data)}),R.on('inp',m=>{if(!m.isMe)onInp(m.data)}),R.on('bye',m=>{if(!m.isMe)onBye()}),R.on('png',m=>{if(!m.isMe&&NET.slot===1&&NET.room)NET.room.emit('pog',{t:m.data&&m.data.t}).catch(()=>{})}),R.on('pog',m=>{if(!m.isMe)onPog(m.data)}),R.on('rem',m=>{if(!m.isMe)onRem(m.data)}),R.on('rst',m=>{if(!m.isMe)onRst(m.data)})];
 setNs(host?'房間代碼：'+code.toUpperCase()+'　等待對手加入…':'已加入房間 '+code.toUpperCase()+'　等待房主開始…');
 if(host)$('rc').value=code.toUpperCase();
 NET.pings=[];clearInterval(NET.hb);NET.hb=setInterval(netHello,300);netHello();
}
