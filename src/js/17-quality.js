// ===== 畫質：依實際顯示大小與螢幕像素密度渲染；「高」畫質另加地面倒影、場景光線、暗角、重擊閃光 =====
// 只影響繪圖，不影響遊戲判定與連線同步。
// 用 var：makeBg() 在這個檔案載入前就會被呼叫，那時 RS 還是 undefined，makeBg 會當成 1。
var RS=1,FL=null,FX=null;
const QN=['自動','高','標準','省電'],QCAP=[2.5,2.5,1.5,1];
let QM=0,QA=0,QT=0,QN_=0;try{QM=+(localStorage.getItem('fd_q')||0)||0}catch(e){}
const REFL=[.22,.16,.26,.07,.1]; // 各場景地面的反光程度：濕街、港口、冰原、火山岩、木地板
const qHigh=()=>QM===1||(QM===0&&QA===0);
function fitCanvas(){
 const css=cv.getBoundingClientRect().width||W,dpr=window.devicePixelRatio||1;
 const cap=QM===0?[2.5,1.5,1][Math.min(2,QA)]:QCAP[QM];
 const s=Math.max(1,Math.min(cap,Math.round(css*dpr/W*4)/4));
 if(s!==RS){RS=s;cv.width=Math.round(W*s);cv.height=Math.round(H*s);bg=makeBg(STG[G.stage]);FX=null}
}
// 自動畫質：看實際幀間隔（含 GPU 繪製），平均低於約 50fps 就降一級
let QL=0;
function qPerf(){
 const now=performance.now(),dt=now-QL;QL=now;
 if(QM!==0||G.phase==='menu'||G.pause||QA>=2||dt>100)return;
 QT=QT?QT*.95+dt*.05:dt;if(++QN_<180)return;
 if(QT>20){QA++;QN_=0;QT=0;fitCanvas();bg=makeBg(STG[G.stage]);toast('畫面較忙，已自動降低畫質')}
}
// 場景光線直接畫進背景（只在生成背景時算一次，並且會跟著鏡頭移動）
function bgLight(b,S){b.save();b.globalCompositeOperation='lighter';const g=b.createRadialGradient(740,125,10,740,125,620);g.addColorStop(0,rgba(S.m,.16));g.addColorStop(.5,rgba(S.l,.05));g.addColorStop(1,rgba(S.l,0));b.fillStyle=g;b.fillRect(0,0,W,H);b.restore()}
const rgba=(hex,a)=>{const n=parseInt(hex.slice(1),16);return'rgba('+(n>>16)+','+(n>>8&255)+','+(n&255)+','+a+')'};
function reflect(){
 const S=STG[G.stage],a=REFL[G.stage]||.1;
 ctx.save();ctx.beginPath();ctx.rect(-W,GY,W*3,H);ctx.clip();
 ctx.save();ctx.translate(0,2*GY);ctx.scale(1,-1);ctx.globalAlpha=a;
 for(const f of[p1,p2])drawF(Object.assign({},f,{tr:[],lt:-9,mt:0,ns:1}));
 for(const p of projs)if(!p.strike&&p.life>0)drawProj(p);
 ctx.restore();
 // 離腳越遠倒影越淡
 const g=ctx.createLinearGradient(0,GY,0,GY+110);g.addColorStop(0,rgba(S.g[0],0));g.addColorStop(1,rgba(S.g[0],.9));
 ctx.fillStyle=g;ctx.fillRect(-W,GY,W*3,H-GY);ctx.restore();
}
function mkFX(){
 const S=STG[G.stage],mk=()=>{const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const b=c.getContext('2d');b.scale(RS,RS);return[c,b]};
 const[v,vb]=mk(),g=vb.createRadialGradient(W/2,H*.55,H*.35,W/2,H*.55,W*.68);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.38)');vb.fillStyle=g;vb.fillRect(0,0,W,H);
 FX={k:G.stage+'/'+RS,v};
}
function postFx(){
 if(!FX||FX.k!==G.stage+'/'+RS)mkFX();
 ctx.save();ctx.globalCompositeOperation='lighter';
 const now=performance.now();if(FL&&now<FL.t){ctx.globalAlpha=Math.min(1,(FL.t-now)/FL.d)*FL.a;ctx.fillStyle=FL.c;ctx.fillRect(0,0,W,H)}
 ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.drawImage(FX.v,0,0,W,H);ctx.restore();
}
// 減少閃光：關掉全畫面閃色、減弱震動與星芒、HUD 不閃爍。沒設定過時跟隨系統的「減少動態效果」
let CALM=0;try{const v=localStorage.getItem('fd_calm');CALM=v!==null?(+v?1:0):(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches?1:0)}catch(e){}
const flash=(c,a,d)=>{if(!NOFX&&qHigh()&&!CALM)FL={c,a,d,t:performance.now()+d}};
function qLabel(){$('qbtn').textContent='畫質：'+QN[QM]+(QM===0?'（目前'+(QA===0?'高':QA===1?'標準':'省電')+'）':'')}
addEventListener('resize',fitCanvas);
