// ===== 角色流派 =====
// 每位角色有「標準」和一種原創流派。流派可以：覆寫部分招式數值（mv）、改體力（hp，併進體力倍率）、
// 移動速度（spd）、造成傷害（dm）、集氣速度（mg）。開局時決定，寫進連線開局訊息與重播。
const STY=[
 {n:'烈拳',d:'火球更快但較弱，移動與攻擊更積極',spd:1.08,dm:1.04,hp:.97,mv:{sp:{spd:13,d:12}}},
 {n:'鐵壁',d:'體力更多、重腳也有霸體，移動較慢',hp:1.06,spd:.9,dm:.96,mv:{hk:{arm:1}}},
 {n:'暗殺',d:'體力較少但傷害更高，前手刺拳更快',hp:.9,dm:1.13,mv:{jab:{su:4}}},
 {n:'蓄雷',d:'集氣快 40%',mg:1.4},
 {n:'重岩',d:'指令投更痛，移動較慢',spd:.9,dm:.96,mv:{sp:{d:22}}},
 {n:'寒冰',d:'輕腳、重腳命中會讓對手緩速',mv:{lk:{sl:40},hk:{sl:60}}},
 {n:'疾風',d:'移動更快、連環腳多一段，體力較少',spd:1.12,hp:.98,mv:{push:{hits:4,d:3}}},
 {n:'迅棍',d:'輕拳、重拳出招更快，傷害略低',dm:.96,mv:{lp:{su:3},hp:{su:7}}},
 {n:'重拳',d:'重拳更痛但更慢，整體傷害較高',dm:1.01,spd:.96,mv:{hp:{d:13,su:8}}},
 {n:'劇毒',d:'輕拳、輕腳命中也會中毒',dm:.98,mv:{lp:{psn:40},lk:{psn:50}}},
 {n:'舞風',d:'移動更快、集氣更快，體力略少',spd:1.1,mg:1.2,hp:.98},
 {n:'火力',d:'傷害更高，移動較慢',dm:1.03,spd:.88},
 {n:'拔刀',d:'傷害大幅提高，但體力較少',dm:1.1,hp:.9},
 {n:'咒縛',d:'重拳命中會弱化對手（傷害 -25%），自己傷害略低',dm:.95,mv:{hp:{wk:120}}},
 {n:'狂獸',d:'傷害更高，但集氣較慢',dm:1.03,mg:.8},
 {n:'遊擊',d:'移動更快、傷害略高，體力略少',spd:1.12,hp:.98,dm:1.02}];
let SST=[0,0];try{const o=JSON.parse(localStorage.getItem('fd_sty')||'null');if(Array.isArray(o))SST=[o[0]?1:0,o[1]?1:0]}catch(e){}
function styOf(f){return f.sty?STY[CH.indexOf(f.ch)]:null}
function stySet(f,s){const st=s?STY[CH.indexOf(f.ch)]:null;f.sty=st?1:0;f.sdm=st&&st.dm||1;f.smg=st&&st.mg||1;f.sspd=st&&st.spd||1;f.hm=(f.hm||1)*(st&&st.hp||1);if(f.hm===1)delete f.hm;f.reset()}
// 電腦（單人、街機、生存、隊伍戰）用 P2 分頁選的流派；街機與生存的對手隨機
function arcSty(){const A=ARC;A.st=A.st||[];if(A.st[A.i]==null)A.st[A.i]=A.i===A.L.length-1?0:Math.random()<.5?1:0;return A.st[A.i]}
function styApply(m){const s=G.sto||[SST[0],m===1&&ARC?arcSty():m===1&&SURV?(Math.random()<.5?1:0):SST[1]];G.sto=null;stySet(p1,s[0]);stySet(p2,s[1]);if(REC&&(p1.sty||p2.sty))REC.st=[p1.sty,p2.sty]}
function styUI(){const el=$('pvinfo');if(!el)return;const i=selUI.hv>=0?selUI.hv:sel[PT],st=STY[i],cur=SST[PT];
 el.insertAdjacentHTML('beforeend','<div class="sty"><span>'+(PT?'P2':'P1')+' 流派</span><button data-s="0" class="'+(cur?'':'on')+'">標準</button><button data-s="1" class="'+(cur?'on':'')+'">'+st.n+'</button><small>'+(cur?st.d:'原本的招式與能力')+'</small></div>')}
$('pvinfo').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;SST[PT]=+b.dataset.s;try{localStorage.setItem('fd_sty',JSON.stringify(SST))}catch(x){}snd(600,.05);selUI()});
