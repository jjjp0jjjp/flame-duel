// ===== 街機劇情：開打前的對話、通關後的角色結局（原創內容） =====
// 開場白：依角色順序（烈 鋼 影 雷 岩 霜 嵐 月 拳 蠍 蝶 機 刃 巫 獸 羽）
const INTRO=['我的火焰還在燒，你準備好了嗎？','站穩了，這一拳不會留情。','你看得見我，就算你贏。','感覺到空氣裡的電了嗎？','來吧，被我抓住就結束了。','冷靜一點，你會輸得比較好看。','跟得上我的腳步，再來說話。','棍長三尺，你進不來的。','鈴聲響了，第一回合！','別緊張，毒只會讓你慢慢想通。','這支舞，你只能看，不能碰。','系統啟動。目標：鎖定。','拔刀之前，勝負已分。','你的魂魄……很亮呢。','吼——！別想跑！','這一箭，已經瞄準你的破綻了。'];
const BOSSL=['那是……另一個我？','想變強，就先超越你自己。'];
const ENDING=[
 '打倒了另一個自己，烈明白真正的對手一直是心中的懈怠。他把頭帶綁得更緊，朝下一座城市出發——火焰，永不熄滅。',
 '鋼的拳套在最後一戰後裂了一道縫。他笑著說：「鋼會生鏽，意志不會。」隔天，港口多了一間沒有招牌的拳館。',
 '影在月光下消失，只留下一枚手裏劍釘在擂台中央。傳聞從那天起，夜城的每個屋頂都多了一道守望的影子。',
 '雷把最後一道閃電送回雲端。暴風雨停了，他第一次聽見城市安靜的聲音——那比雷鳴更讓他著迷。',
 '岩扛著冠軍腰帶回到山村，把它掛在師父的墓前。「師父，這次我沒有讓步。」山風輕輕回應了他。',
 '霜讓擂台結了一整夜的冰，好記住勝利的溫度。天亮時冰化了，她也啟程前往更北的雪原。',
 '嵐在竹林裡練了一整個月的腳技，直到落葉在半空就被踢成兩半。「還不夠快。」他說完，轉身迎向下一陣風。',
 '月把長棍插在火山口邊，望著滿月升起。「勝負如潮汐，有漲有退。」她把這一戰刻在棍上，成為第一道刻痕。',
 '拳拿下了街頭最強的稱號，卻推掉所有職業邀約。「我要的不是腰帶，是下一個讓我心跳加速的對手。」',
 '蠍把解藥配方匿名寄給了城裡的醫院。沒人知道是誰寄的，只在信封上看到一隻小小的蠍子印記。',
 '蝶在空無一人的舞台上跳了最後一支舞，扇子劃過的地方飄起花瓣。她把扇子收進木匣，等待下一個舞台。',
 '機的核心記錄下所有戰鬥資料，接著做出一個從未被設定過的決定：關閉武器系統，去看一次真正的日出。',
 '刃把刀收回鞘中，再也沒有拔出。「最強的一刀，是不用出的那一刀。」他在竹林道場開始教孩子們寫字。',
 '巫收集了所有對手的魂光，最後卻把它們全部放回天空。那一夜，城市上空出現了從未見過的極光。',
 '獸贏了，卻發現自己最想要的只是一碗熱騰騰的麵。從此，港口的麵攤多了一位會幫忙搬貨的大個子常客。',
 '羽射出最後一箭，箭尾綁著一封信，飛過整座城市，落在故鄉的門口。信上只寫著：「我很好，我贏了。」'];
// 中文斷行：依寬度一個字一個字排
// 標點不放行首（。，」等跟著前一行）
function wrapText(t,w){const L=[];let s='';for(const ch of t){if(ctx.measureText(s+ch).width>w&&s&&!'。，、」』！？；：）…'.includes(ch)){L.push(s);s=''}s+=ch}if(s)L.push(s);return L}
// 開打前（VS 畫面）的對話
function vsDialog(){
 if(!ARC||!ARC.dlg||G.phase==='menu')return;const t=(G.vm||110)-G.vs;ctx.save();
 ARC.dlg.forEach((ln,k)=>{const a=Math.max(0,Math.min(1,(t-20-k*45)/10));if(!a)return;ctx.globalAlpha=a;const f=k?p2:p1,y=H-132+k*50,x=k?W-40:40;
  ctx.font='bold 19px '+FONT;const w=Math.min(W*.6,ctx.measureText(ln).width+40);ctx.fillStyle='rgba(0,0,0,.72)';ctx.beginPath();ctx.moveTo(k?x-w:x,y-26);ctx.lineTo(k?x:x+w,y-26);ctx.lineTo(k?x-8:x+w-8,y+12);ctx.lineTo(k?x-w-8:x+8,y+12);ctx.fill();
  ctx.fillStyle=f.ch.col;ctx.fillRect(k?x-4:x,y-26,4,38);ctx.fillStyle='#fff';ctx.textAlign=k?'right':'left';ctx.fillText('「'+ln+'」',k?x-20:x+20,y)});
 ctx.restore()}
// 通關結局
function arcStory(){
 if(!ARC||!ARC.done||G.phase==='menu')return;const now=performance.now();if(!ARC.endT)ARC.endT=now;const a=Math.min(1,(now-ARC.endT)/600),c=ARC.me,ch=CH[c];
 ctx.save();ctx.globalAlpha=a;ctx.fillStyle='#05040c';ctx.fillRect(0,0,W,H);
 const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,ch.col+'55');g.addColorStop(.5,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 if(HEAD[c])ctx.drawImage(HEAD[c],60,120,260,260);ctx.strokeStyle='#d9a640';ctx.lineWidth=3;ctx.strokeRect(60,120,260,260);
 ctx.textAlign='left';ctx.font='italic 900 40px '+FONT;ctx.lineWidth=7;ctx.strokeStyle='#000';ctx.lineJoin='round';const tt=ch.n+' 的結局';ctx.strokeText(tt,360,150);ctx.fillStyle='#ffd21a';ctx.fillText(tt,360,150);
 ctx.font='19px '+FONT;ctx.fillStyle='#f2f2f7';const L=wrapText(ENDING[c]||'',540),shown=Math.floor((now-ARC.endT-400)/45);let n=0;
 L.forEach((ln,i)=>{const k=Math.max(0,Math.min(ln.length,shown-n));n+=ln.length;ctx.fillText(ln.slice(0,k),360,200+i*34)});
 ctx.restore()}
