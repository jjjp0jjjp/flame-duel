// ================= 連線對戰(鎖步同步) =================
const NET={on:false,room:null,lobby:null,slot:0,D:6,tick:0,cap:0,loc:{},rem:{},remHigh:-1,remAck:-1,sendT:{},lastSend:0,stallT:0,rtt:0,hash:{},rh:{},hl:null,desync:false,inp:[0,0],sid:'',started:false,gone:false,remote:null,hb:0,unsub:[],code:'',pings:[],Dsel:6,lastIn:null};
const setNs=t=>{$('ns').textContent=t};
// 壓縮＋base64url 編碼（手動代碼、重播連結共用）
const b64=u=>{let t='';for(let i=0;i<u.length;i+=8192)t+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(t).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const unb64=t=>{t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';const r=atob(t),u=new Uint8Array(r.length);for(let i=0;i<r.length;i++)u[i]=r.charCodeAt(i);return u};
async function codeEnc(o){
 const raw=new TextEncoder().encode(JSON.stringify(o));
 try{if(window.CompressionStream){const cs=new CompressionStream('deflate-raw'),w=cs.writable.getWriter();w.write(raw).catch(()=>{});w.close().catch(()=>{});return 'z'+b64(new Uint8Array(await new Response(cs.readable).arrayBuffer()))}}catch(e){}
 return 'x'+b64(raw);
}
async function codeDec(t){
 t=t.replace(/\s+/g,'');const k=t[0],u=unb64(t.slice(1));
 if(k==='x')return JSON.parse(new TextDecoder().decode(u));
 if(k==='z'){const ds=new DecompressionStream('deflate-raw'),w=ds.writable.getWriter();w.write(u).catch(()=>{});w.close().catch(()=>{});return JSON.parse(new TextDecoder().decode(await new Response(ds.readable).arrayBuffer()))}
 throw new Error('bad');
}
