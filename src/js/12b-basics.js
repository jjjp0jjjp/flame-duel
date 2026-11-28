// ===== 每位角色專屬的基本技：輕拳、重拳、輕腳、重腳、空拳、飛踢 =====
// 依角色順序（烈 鋼 影 雷 岩 霜 嵐 月 拳 蠍 蝶 機 刃 巫 獸 羽）。數值以共通的 MV 為底再覆寫，
// 取消等級維持一致（輕攻擊 cn1、重攻擊 cn2），連段規則不變；掃堂腿與投技是共通系統，不在這裡。
const BASIC=[
 // 烈：火焰。輕快、重拳是近身衝肘、重腳迴旋踢擊倒；命中帶燃燒
 {lp:['火拳',{d:6,su:3,burn:30,anim:'jab',fx:'fire'}],hp:['燃肘',{d:12,su:6,ac:4,rc:12,r:66,vx:4,kb:7,burn:40,anim:'elbow',fx:'fire'}],lk:['疾踢',{d:7,su:4,r:92,anim:'front',fx:'fire'}],hk:['迴旋炎腳',{d:13,su:9,ac:5,rc:17,r:106,h:-72,knock:1,burn:30,anim:'round',fx:'fire'}],ap:['空炎拳',{d:7,su:3,burn:20,anim:'aelbow',fx:'fire'}],ak:['炎落踢',{d:11,su:5,h:-20,burn:30,anim:'adive',fx:'fire'}]},
 // 鋼：鋼鐵。慢但重，重拳是中段劈砸、重腳踏地削防禦
 {lp:['鐵拳',{d:7,su:5,rc:8,kb:6,chip:2,anim:'straight',fx:'metal'}],hp:['鋼錘',{d:13,su:12,ac:4,rc:15,kb:8,r:84,h:-90,ovh:1,anim:'hammer',fx:'metal'}],lk:['低掃腿',{d:7,su:6,h:-12,low:1,r:82,anim:'lowkick',fx:'metal'}],hk:['重踏',{d:15,su:11,rc:19,r:84,kb:12,gb:1,anim:'stomp',fx:'rock'}],ap:['鐵肘',{d:9,su:4,kb:6,anim:'aelbow',fx:'metal'}],ak:['鐵膝',{d:12,su:6,r:62,gb:1,anim:'aknee',fx:'metal'}]},
 // 影：暗影。最快、二連掌，重腳迴影踢會穿到對手身後
 {lp:['暗刺',{d:5,su:2,rc:5,r:76,anim:'jab',fx:'dark'}],hp:['二連掌',{d:6,su:6,ac:8,rc:12,r:78,hits:2,gap:4,anim:'double',fx:'dark'}],lk:['影踢',{d:6,su:3,rc:7,r:86,low:1,h:-16,anim:'lowkick',fx:'dark'}],hk:['迴影踢',{d:11,su:7,rc:14,r:100,thru:1,anim:'round',fx:'dark'}],ap:['空刃',{d:6,su:2,anim:'aslash',fx:'dark'}],ak:['落影',{d:9,su:4,h:-18,anim:'adive',fx:'dark'}]},
 // 雷：雷電。距離長、命中多集氣，電擊會讓命中停頓更久
 {lp:['電指',{d:5,su:4,r:88,mg:1.6,anim:'jab',fx:'elec'}],hp:['電擊掌',{d:6,su:8,ac:8,rc:14,r:90,hits:2,gap:4,hs:8,anim:'palm',fx:'elec'}],lk:['電腿',{d:7,su:5,r:98,mg:1.4,anim:'front',fx:'elec'}],hk:['雷霆踢',{d:13,su:11,rc:18,r:110,ovh:1,hs:10,anim:'axe',fx:'elec'}],ap:['空電',{d:7,su:3,r:74,mg:1.6,anim:'apalm',fx:'elec'}],ak:['雷墜',{d:10,su:5,h:-24,hs:8,anim:'adive',fx:'elec'}]},
 // 岩：岩石。重拳霸體、踏地下段削防、重腳斧踢中段擊倒
 {lp:['岩掌',{d:7,su:5,kb:7,anim:'palm',fx:'rock'}],hp:['山崩拳',{d:13,su:10,rc:15,kb:10,arm:1,anim:'straight',fx:'rock'}],lk:['踏地',{d:8,su:6,low:1,h:-8,r:72,gb:1,anim:'stomp',fx:'rock'}],hk:['岩槌',{d:14,su:13,ac:4,rc:16,r:90,h:-80,ovh:1,knock:1,anim:'axe',fx:'rock'}],ap:['岩肘',{d:9,su:4,anim:'aelbow',fx:'rock'}],ak:['岩膝',{d:12,su:6,r:64,knock:1,anim:'aknee',fx:'rock'}]},
 // 霜：冰。命中緩速，重拳凍結（停頓更久），輕腳滑行下段
 {lp:['冰拳',{d:6,su:3,sl:20,anim:'jab',fx:'ice'}],hp:['冰錐掌',{d:10,su:8,r:92,sl:40,hs:12,anim:'palm',fx:'ice'}],lk:['冰滑踢',{d:7,su:5,r:104,low:1,h:-12,vx:3,anim:'lowkick',fx:'ice'}],hk:['寒月踢',{d:12,su:10,rc:18,r:118,sl:50,anim:'round',fx:'ice'}],ap:['冰晶',{d:7,su:3,r:74,sl:20,anim:'apalm',fx:'ice'}],ak:['冰墜',{d:9,su:5,hs:10,anim:'adive',fx:'ice'}]},
 // 嵐：風。輕拳把人吸近，重拳旋風掌擊飛，腳技多段
 {lp:['風拳',{d:5,su:3,kb:-3,anim:'jab',fx:'wind'}],hp:['旋風掌',{d:11,su:7,r:84,vx:2,launch:1,anim:'upper',fx:'wind'}],lk:['二連踢',{d:4,su:4,ac:8,rc:9,r:88,hits:2,gap:4,anim:'spin',fx:'wind'}],hk:['三連旋踢',{d:5,su:8,ac:12,rc:16,r:104,hits:3,gap:4,anim:'spin',fx:'wind'}],ap:['風刃',{d:7,su:3,kb:-2,anim:'aslash',fx:'wind'}],ak:['旋風飛踢',{d:6,su:4,ac:12,hits:2,gap:5,anim:'aspin',fx:'wind'}]},
 // 月：長棍。距離最長，重拳大掃擊退、輕腳掃下段、重腳撐棍高踢
 {lp:['棍刺',{d:5,su:4,r:100,anim:'thrust',fx:'staff'}],hp:['棍掃',{d:12,su:9,rc:14,r:120,kb:11,anim:'swing',fx:'staff'}],lk:['棍底掃',{d:7,su:6,r:106,low:1,h:-10,anim:'staffsweep',fx:'staff'}],hk:['撐棍踢',{d:13,su:10,r:104,h:-72,kb:12,anim:'front',fx:'staff'}],ap:['空棍',{d:7,su:4,r:98,anim:'aslash',fx:'staff'}],ak:['棍落',{d:10,su:6,r:90,anim:'adive',fx:'staff'}]},
 // 拳：拳擊。刺拳最快、直拳衝刺擊退、膝擊讓對手硬直更久、上勾拳擊飛
 {lp:['刺拳',{d:5,su:2,rc:6,anim:'jab',fx:'impact'}],hp:['直拳',{d:12,su:6,rc:13,r:84,vx:3,kb:9,anim:'straight',fx:'impact'}],lk:['墊步膝',{d:8,su:5,r:62,vx:3,st:22,anim:'knee',fx:'impact'}],hk:['上勾拳',{d:12,su:8,rc:17,r:72,h:-100,launch:1,anim:'upper',fx:'impact'}],ap:['空刺拳',{d:7,su:2,anim:'apalm',fx:'impact'}],ak:['落肘',{d:11,su:5,r:62,h:-40,anim:'aelbow',fx:'impact'}]},
 // 蠍：毒。爪擊、毒手中毒，尾鞭從後方甩過來還會把人拉近
 {lp:['毒爪',{d:5,su:3,r:82,anim:'claw',fx:'poison'}],hp:['毒手',{d:9,su:7,r:88,psn:70,anim:'claw',fx:'poison'}],lk:['尾刺',{d:6,su:5,r:94,low:1,h:-12,psn:30,anim:'lowkick',fx:'poison'}],hk:['蠍尾鞭',{d:11,su:10,rc:18,r:120,psn:60,kb:-4,anim:'tailkick',fx:'poison'}],ap:['空爪',{d:6,su:3,r:72,anim:'aclaw',fx:'poison'}],ak:['毒踢',{d:9,su:5,psn:40,anim:'adive',fx:'poison'}]},
 // 蝶：舞扇。雙扇吸走對手的氣，踢技輕盈
 {lp:['扇擊',{d:5,su:3,r:84,anim:'fan',fx:'petal'}],hp:['雙扇',{d:6,su:7,ac:8,rc:13,r:90,hits:2,gap:4,drain:6,anim:'fan',fx:'petal'}],lk:['蝶步踢',{d:6,su:4,r:92,vx:3,anim:'front',fx:'petal'}],hk:['舞空踢',{d:12,su:9,r:104,h:-78,drain:10,anim:'round',fx:'petal'}],ap:['空舞扇',{d:7,su:3,ac:11,anim:'aslash',fx:'petal'}],ak:['蝶落',{d:9,su:5,ac:12,anim:'aspin',fx:'petal'}]},
 // 機：機甲。被擋也很痛，衝擊拳與推進踢會噴射前進，推進踢有霸體
 {lp:['機拳',{d:7,su:5,r:78,chip:2,anim:'straight',fx:'metal'}],hp:['衝擊拳',{d:13,su:9,rc:15,vx:5,kb:12,anim:'straight',fx:'jet'}],lk:['履帶踢',{d:8,su:6,low:1,h:-12,r:86,anim:'lowkick',fx:'metal'}],hk:['推進踢',{d:14,su:10,rc:18,vx:6,r:104,arm:1,anim:'front',fx:'jet'}],ap:['機肘',{d:8,su:4,anim:'aelbow',fx:'metal'}],ak:['推進膝',{d:11,su:5,vx:5,anim:'aknee',fx:'jet'}]},
 // 刃：刀。斬擊被擋也會削血，柄擊讓對手硬直更久，迴刃斬由下往上擊飛
 {lp:['柄擊',{d:6,su:3,r:66,st:20,anim:'elbow',fx:'impact'}],hp:['袈裟斬',{d:12,su:8,rc:14,r:106,chip:3,anim:'slash',fx:'blade'}],lk:['足刃',{d:7,su:5,r:94,anim:'front',fx:'blade'}],hk:['迴刃斬',{d:13,su:10,rc:18,r:118,chip:3,launch:1,anim:'rslash',fx:'blade'}],ap:['空斬',{d:8,su:3,r:86,chip:2,anim:'aslash',fx:'blade'}],ak:['落刃',{d:10,su:5,r:84,anim:'aslash',fx:'blade'}]},
 // 巫：咒術。吸氣、吸血、重腳詛咒（對手傷害 -25%）
 {lp:['咒指',{d:5,su:4,r:86,drain:4,anim:'jab',fx:'soul'}],hp:['吸魂掌',{d:9,su:8,r:90,ls:.35,anim:'palm',fx:'soul'}],lk:['咒步',{d:6,su:5,r:90,low:1,h:-12,anim:'lowkick',fx:'soul'}],hk:['詛咒踢',{d:11,su:10,rc:18,r:108,wk:120,anim:'round',fx:'soul'}],ap:['魂擊',{d:6,su:3,ls:.3,anim:'apalm',fx:'soul'}],ak:['咒墜',{d:9,su:5,drain:8,anim:'adive',fx:'soul'}]},
 // 獸：野獸。爪擊前撲、撕咬兩段吸血、飛撲爪擊倒
 {lp:['爪擊',{d:6,su:3,vx:3,anim:'claw',fx:'claw'}],hp:['撕咬',{d:6,su:7,ac:8,rc:13,r:76,hits:2,gap:4,ls:.15,anim:'bite',fx:'claw'}],lk:['獸踢',{d:8,su:5,kb:-2,anim:'front',fx:'claw'}],hk:['飛撲爪',{d:13,su:9,rc:18,vx:7,r:96,knock:1,anim:'claw',fx:'claw'}],ap:['空爪',{d:8,su:3,anim:'aclaw',fx:'claw'}],ak:['獸落',{d:12,su:6,knock:1,anim:'adive',fx:'claw'}]},
 // 羽：弓。弓背大幅擊退、鷹踢緩速，輕快牽制
 {lp:['弓柄擊',{d:5,su:3,anim:'jab',fx:'feather'}],hp:['弓背揮',{d:10,su:7,r:98,kb:13,anim:'bowswing',fx:'feather'}],lk:['輕躍踢',{d:6,su:4,r:92,anim:'front',fx:'feather'}],hk:['鷹踢',{d:12,su:8,r:112,h:-72,sl:30,anim:'axe',fx:'feather'}],ap:['空肘',{d:6,su:3,anim:'aelbow',fx:'feather'}],ak:['羽落',{d:9,su:5,h:-22,sl:20,anim:'adive',fx:'feather'}]}];
const BKEYS=['lp','hp','lk','hk','ap','ak'];
BASIC.forEach((c,i)=>{const ch=CH[i];if(!ch)return;ch.mv=ch.mv||{};ch.nm=ch.nm||{};for(const k of BKEYS){if(!c[k])continue;ch.nm[k]=c[k][0];ch.mv[k]=Object.assign({rep:1},MV[k],c[k][1])}});
// ===== 指令技的動作與特效：依招式性質＋角色武器自動挑選（已指定 anim 的不動）=====
const ELEM=['fire','metal','dark','elec','rock','ice','wind','staff','impact','poison','petal','jet','blade','soul','claw','feather'];
// 武器風格：棍（月）、刀（刃）、爪（蠍、獸）、扇（蝶）、弓（羽）、掌（雷、巫）
const WPN={7:'staff',12:'blade',9:'claw',14:'claw',10:'fan',15:'bow',3:'palm',13:'palm'};
const CMDKEYS=['jab','lunge','push','spin','flip','upper','dhp','dlk','blp','bhp','ahp'];
const KICK={push:1,spin:1,flip:1,dlk:1};
// 是不是腳技：看招式名稱（有些角色的腳類按鍵其實是拳技或武器技，例如拳的「左右連拳」）
const isKick=(k,nm)=>/[腳踢膝踵腿]/.test(nm||'')?true:/[拳掌肘爪扇斬刺鞭錘靠手咒射割棍鐮]/.test(nm||'')?false:!!KICK[k];
function pickAnim(k,a,w,nm){
 if(a.nohit||a.counter||a.throw||a.type||!a.r)return null;
 if(k==='ahp')return w==='blade'||w==='staff'||w==='fan'?'aslash':w==='claw'?'aclaw':w==='palm'?'apalm':'aelbow';
 const kick=isKick(k,nm);
 if(a.low)return kick?'lowkick':'staffsweep'; // 下段：腳技低踢；拳技與武器技蹲低橫掃
 if(a.ovh)return kick?'axe':w==='blade'?'slash':w==='staff'?'swing':'hammer';
 if(k==='upper')return w==='blade'||w==='staff'?'rslash':'upper';
 if((a.hits||0)>=2)return kick?'spin':w==='fan'?'fan':w==='palm'?'palm':'double';
 if(kick)return k==='spin'?(w==='claw'?'tailkick':'round'):k==='flip'?'round':'front';
 if(KICK[k])return k==='spin'||k==='flip'?(w==='blade'?'slash':w==='claw'?'claw':'hook'):w==='claw'?'claw':'straight';
 if(k==='dhp')return w==='blade'?'rslash':'upper';
 if(w==='staff')return k==='bhp'?'swing':'thrust';
 if(w==='blade')return k==='jab'?'thrust':'slash';
 if(w==='claw')return k==='lunge'&&a.vx>=6?'bite':'claw';
 if(w==='fan')return 'fan';
 if(w==='bow')return k==='bhp'||k==='lunge'?'bowswing':'jab';
 if(w==='palm')return k==='lunge'?'straight':'palm';
 if(k==='blp')return 'palm';
 if(k==='bhp')return 'hook';
 if(k==='lunge')return a.r<90?'elbow':'straight';
 return 'jab'}
CH.forEach((ch,i)=>{for(const k of CMDKEYS){const m=ch.mv&&ch.mv[k];if(!m||m.anim)continue;const a=Object.assign({},MV[k],m),an=pickAnim(k,a,WPN[i],ch.nm[k]);if(an)m.anim=an;if(an&&!m.fx)m.fx=ELEM[i]}});
