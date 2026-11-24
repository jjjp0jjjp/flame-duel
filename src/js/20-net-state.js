// ================= 連線對戰(鎖步同步) =================
const NET={on:false,room:null,lobby:null,slot:0,D:6,tick:0,cap:0,loc:{},rem:{},remHigh:-1,remAck:-1,sendT:{},lastSend:0,stallT:0,rtt:0,hash:{},rh:{},hl:null,desync:false,inp:[0,0],sid:'',started:false,gone:false,remote:null,hb:0,unsub:[],code:'',pings:[],Dsel:6,lastIn:null};
const setNs=t=>{$('ns').textContent=t};
