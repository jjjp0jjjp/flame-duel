// ================= 新角色：雷、岩 =================
const CTR={d:20,su:2,ac:3,rc:18,r:84,h:-70,st:32,kb:14,launch:1,cn:4};
CH.push(
{n:'雷',ds:'遠攻・天雷',col:'#ffd23d',col2:'#fff3b0',spd:3.9,jmp:14.5,hp:117,w:1,mg:1.25,
 sp:{type:'proj',d:12,su:12,ac:1,rc:18,spd:13,cost:50},
 ex:{type:'strike',d:14,su:12,ac:1,rc:34,launch:1,ex:1,cost:100,name:'天雷陣',multi:1},
 sp2:{type:'strike',d:14,su:10,ac:1,rc:22,dist:230,launch:1,cost:50},
 mv:{hp:{r:88},hk:{r:116}},
 sp3:{d:13,su:5,ac:8,rc:22,r:72,h:-70,st:22,kb:11,around:1,inv:1,cost:50},
 asp:{type:'proj',d:11,su:5,ac:1,rc:14,spd:11,vy:7,cost:50}},
{n:'岩',ds:'投技・岩石',col:'#d08a48',col2:'#ffe0b8',spd:3.1,jmp:13,hp:111,w:1.3,kbr:.7,
 mv:{th:{r:78,d:21},th2:{r:78,d:20}},
 sp:{d:20,su:7,ac:9,rc:24,vx:8,r:64,h:-70,st:40,kb:9,throw:1,cost:50},
 ex:{d:40,su:5,ac:3,rc:32,r:84,h:-70,st:46,kb:12,throw:1,ex:1,cost:100,name:'大地崩壞'},
 sp2:{type:'proj',d:16,su:12,ac:1,rc:22,spd:7,vy:-9,gr:.42,knock:1,cost:50},
 sp3:{d:0,su:3,ac:22,rc:16,r:60,h:-70,st:0,kb:0,counter:1,cost:50},
 asp:{d:16,su:6,ac:40,rc:8,r:66,h:-24,st:26,kb:7,knock:1,air:1,dive:1,quake:1,cost:50}});
CH.push(
{n:'霜',ds:'冰結・遠攻',col:'#7fe3ff',col2:'#e0fbff',spd:3.8,jmp:14.5,hp:101,w:.98,
 mv:{lk:{r:96},hk:{r:116}},
 sp:{type:'proj',d:14,su:12,ac:1,rc:20,spd:7.5,cost:50},
 ex:{type:'proj',d:12,su:14,ac:1,rc:28,spd:4.5,big:1,ph:4,launch:1,ex:1,cost:100,name:'絕對零度'},
 sp2:{type:'proj',d:10,su:12,ac:1,rc:22,spd:0,wl:1,life:150,dist:70,cost:50},
 sp3:{d:13,su:6,ac:10,rc:20,vx:9,r:80,h:-14,st:26,kb:6,knock:1,low:1,cost:50},
 asp:{type:'proj',d:9,su:6,ac:1,rc:14,spd:7,vy:6,n2:1,cost:50}},
{n:'嵐',ds:'疾風・連腳',col:'#5ee0a0',col2:'#d6ffe9',spd:4.8,jmp:15.5,hp:104,w:.95,
 mv:{hk:{su:7},spin:{d:15,su:8}},
 sp:{d:14,su:7,ac:12,rc:18,vx:9,r:96,h:-62,st:22,kb:8,cost:50},
 ex:{d:8,su:10,ac:18,rc:28,r:110,h:-70,st:20,kb:3,around:1,hits:5,gap:3,launch:1,inv:1,ex:1,cost:100,name:'天嵐旋'},
 sp2:{type:'proj',d:10,su:8,ac:1,rc:16,spd:14,cost:50},
 sp3:{d:6,su:8,ac:14,rc:22,r:116,h:-70,st:20,kb:-8,around:1,hits:2,gap:7,cost:50},
 asp:{d:6,su:4,ac:14,rc:6,r:70,h:-50,st:16,kb:4,air:1,around:1,hits:3,gap:4,cost:50}},
{n:'月',ds:'長棍・間合',col:'#f0c674',col2:'#fff4d6',spd:3.7,jmp:14,hp:92,w:1.05,staff:1,
 mv:{lp:{r:92,su:4},hp:{r:116,su:9,d:12},lk:{r:90},hk:{r:108,su:10},jab:{r:124,su:6},lunge:{r:120}},
 sp:{d:14,su:10,ac:6,rc:22,r:150,h:-78,st:22,kb:10,cost:50},
 ex:{d:30,su:10,ac:16,rc:30,vx:6,r:150,h:-72,st:30,kb:16,launch:1,ex:1,cost:100,name:'千峰棍'},
 sp2:{d:14,su:10,ac:6,rc:24,r:148,h:-14,st:26,kb:6,knock:1,low:1,cost:50},
 sp3:{d:17,su:8,ac:14,rc:20,r:100,h:-40,st:26,kb:8,hop:-12,vx:6,knock:1,cost:50},
 asp:{d:8,su:4,ac:12,rc:6,r:90,h:-50,st:18,kb:5,air:1,around:1,hits:2,gap:6,cost:50}},
{n:'拳',ds:'拳擊・連打',col:'#f72585',col2:'#ffc2e0',spd:4.2,jmp:13.5,hp:111,w:1.08,
 mv:{lp:{su:2},hp:{su:6}},
 sp:{d:4,su:6,ac:20,rc:16,r:92,h:-84,st:14,kb:2,hits:5,gap:4,cost:50},
 ex:{d:6,su:10,ac:30,rc:28,vx:3,r:100,h:-84,st:30,kb:3,hits:8,gap:3,launch:1,ex:1,cost:100,name:'燃魂千拳'},
 sp2:{d:16,su:12,ac:6,rc:20,vx:10,r:96,h:-84,st:24,kb:14,arm:1,knock:1,cost:50},
 sp3:{d:0,su:10,ac:1,rc:12,r:0,nohit:1,buff:360,cost:50},
 asp:{d:5,su:4,ac:12,rc:6,r:72,h:-50,st:16,kb:3,air:1,hits:3,gap:4,cost:50}},
{n:'蠍',ds:'鎖鏈・毒',col:'#a3e635',col2:'#ecfccb',spd:4.1,jmp:15,hp:96,w:.98,
 mv:{hp:{psn:60},hk:{psn:60}},
 sp:{d:10,su:11,ac:5,rc:22,r:190,h:-80,st:26,kb:-9,cost:50},
 ex:{d:24,su:4,ac:3,rc:30,r:96,h:-70,st:40,kb:8,throw:1,psn:420,ex:1,cost:100,name:'千毒葬'},
 sp2:{type:'proj',d:8,su:10,ac:1,rc:18,spd:0,low:1,life:240,psn:180,cost:50},
 sp3:{d:4,su:8,ac:18,rc:20,r:90,h:-70,st:12,kb:1,around:1,hits:3,gap:6,psn:200,cost:50},
 asp:{d:9,su:6,ac:6,rc:10,r:150,h:-20,st:22,kb:-8,air:1,cost:50}},
{n:'蝶',ds:'舞扇・迴旋',col:'#ff9ff3',col2:'#ffe3fb',spd:4.4,jmp:16,hp:110,w:.92,am:1.35,
 sp:{type:'proj',d:11,su:10,ac:1,rc:22,spd:9,ret:28,life:70,cost:50},
 ex:{type:'proj',d:26,su:12,ac:1,rc:26,spd:10,ret:30,life:80,big:1,launch:1,ex:1,cost:100,name:'百花繚亂'},
 sp2:{d:5,su:6,ac:18,rc:18,vx:5,r:84,h:-76,st:16,kb:3,hits:3,gap:6,cost:50},
 sp3:{d:0,su:2,ac:8,rc:4,r:0,nohit:1,hop:-16,vx:-5,inv:1,iv:14,cost:50},
 asp:{d:8,su:4,ac:20,rc:6,r:76,h:-50,st:18,kb:4,air:1,hits:2,gap:8,float:1,cost:50}},
{n:'機',ds:'機甲・砲擊',col:'#ff9f1c',col2:'#ffe0b0',spd:3.2,jmp:12.5,hp:108,w:1.2,pr:.5,
 sp:{type:'proj',d:14,su:14,ac:1,rc:24,spd:11,knock:1,cost:50},
 ex:{d:6,su:16,ac:26,rc:30,r:640,h:-86,st:24,kb:4,hits:6,gap:4,launch:1,ex:1,cost:100,name:'破壞光束'},
 sp2:{type:'strike',d:10,su:12,ac:1,rc:28,line:[110,190,270],launch:1,cost:50},
 sp3:{d:15,su:10,ac:12,rc:22,vx:11,r:80,h:-70,st:24,kb:12,arm:1,cost:50},
 asp:{d:18,su:8,ac:40,rc:10,r:70,h:-24,st:28,kb:8,knock:1,air:1,dive:1,arm:1,cost:50}});
CH.push(
{n:'刃',ds:'居合・一閃',col:'#e9ecef',col2:'#ffffff',spd:4.3,jmp:14.5,hp:92,w:1,blade:1,
 mv:{hp:{r:100},hk:{r:112}},
 sp:{d:15,su:12,ac:6,rc:22,vx:16,r:80,h:-78,st:24,kb:6,thru:1,cost:50},
 ex:{d:40,su:16,ac:6,rc:30,vx:20,r:90,h:-78,st:34,kb:10,thru:1,launch:1,ex:1,cost:100,name:'一閃'},
 sp2:{type:'proj',d:11,su:9,ac:1,rc:18,spd:12,cost:50},
 sp3:{d:14,su:14,ac:5,rc:22,r:100,h:-76,st:24,kb:8,gb:1,cost:50},
 asp:{d:7,su:4,ac:10,rc:6,r:80,h:-50,st:18,kb:4,air:1,hits:2,gap:5,cost:50}},
{n:'巫',ds:'咒術・吸魂',col:'#2a9d8f',col2:'#b7f0e8',spd:3.6,jmp:14,hp:105,w:.95,ls:.12,
 sp:{type:'proj',d:12,su:12,ac:1,rc:22,spd:5,hm:1,life:160,cost:50},
 ex:{d:7,su:12,ac:24,rc:28,r:120,h:-70,st:24,kb:2,around:1,hits:5,gap:4,ls:.6,wk:360,launch:1,ex:1,cost:100,name:'黃泉之門'},
 sp2:{type:'strike',d:6,su:12,ac:1,rc:24,tgt:1,wk:300,cost:50},
 sp3:{d:12,su:8,ac:5,rc:20,r:80,h:-80,st:24,kb:4,ls:.8,cost:50},
 asp:{type:'proj',d:10,su:6,ac:1,rc:14,spd:6,vy:6,hm:1,cost:50}},
{n:'獸',ds:'狂暴・撲擊',col:'#c1121f',col2:'#ffb3b3',spd:4,jmp:15,hp:94,w:1.2,rg:1,
 sp:{d:16,su:6,ac:16,rc:22,hop:-10,vx:9,r:70,h:-60,st:36,kb:8,throw:1,cost:50},
 ex:{d:6,su:8,ac:30,rc:30,vx:6,r:96,h:-70,st:30,kb:3,hits:7,gap:4,launch:1,arm:1,ex:1,cost:100,name:'狂獸亂舞'},
 sp2:{d:5,su:6,ac:14,rc:18,r:76,h:-80,st:16,kb:2,hits:4,gap:3,cost:50},
 sp3:{d:0,su:10,ac:8,rc:20,r:140,h:-70,st:20,kb:16,around:1,drain:30,cost:50},
 asp:{d:18,su:6,ac:40,rc:8,r:76,h:-24,st:28,kb:8,knock:1,air:1,dive:1,cost:50}},
{n:'羽',ds:'弓術・遠射',col:'#4361ee',col2:'#c7d2fe',spd:4,jmp:15,hp:117,w:.95,
 sp:{type:'proj',d:11,su:8,ac:1,rc:16,spd:15,sl:120,cost:50},
 ex:{type:'strike',d:9,su:14,ac:1,rc:30,line:[90,150,210,270,330],launch:1,ex:1,cost:100,name:'天羽箭雨'},
 sp2:{type:'proj',d:14,su:12,ac:1,rc:20,spd:7,vy:-10,gr:.45,knock:1,cost:50},
 sp3:{type:'proj',d:11,su:8,ac:1,rc:18,spd:13,hop:-11,hvx:-6,cost:50},
 asp:{type:'proj',d:8,su:6,ac:1,rc:14,spd:9,vy:7,n2:1,cost:50}});
// ===== 每個角色專屬的指令技：→+輕拳 jab、→+重拳 lunge、→+輕腳 push、→+重腳 spin、←+重腳 flip、↓+拳 upper =====
// 特性：ovh 中段（要站著擋）、low 下段（要蹲著擋）、hits 多段、arm 起手霸體、hop 跳起攻擊、kb<0 拉近、psn 中毒、rev 打到身後、nohit 純移動
const CMD=[
 {jab:['火花刺拳',{d:7,su:4,ac:3,rc:9,r:104,h:-84,st:16,kb:4,cn:1}],lunge:['灼肘',{d:11,su:8,ac:6,rc:14,r:92,h:-86,st:20,kb:8,vx:7,cn:2}],push:['雙炎踢',{d:5,su:6,ac:10,rc:13,r:100,h:-56,st:16,kb:3,hits:2,gap:5,cn:1}],spin:['踵落',{d:13,su:14,ac:4,rc:18,r:92,h:-70,st:22,kb:6,ovh:1,cn:2}],flip:['旋風後踢',{d:12,su:8,ac:5,rc:16,r:98,h:-72,st:22,kb:12,vx:-4,cn:2}],upper:['昇炎拳',{d:13,su:4,ac:7,rc:22,r:60,h:-112,st:30,kb:3,launch:1,inv:1,lift:-12,cn:3}]},
 {jab:['鐵拳',{d:8,su:6,ac:3,rc:11,r:96,h:-84,st:17,kb:6,cn:1}],lunge:['鐵山靠',{d:13,su:11,ac:5,rc:18,r:80,h:-80,st:22,kb:15,vx:7,arm:1,cn:2}],push:['踏地',{d:8,su:8,ac:3,rc:15,r:88,h:-10,st:20,kb:4,low:1,cn:1}],spin:['錘擊',{d:16,su:16,ac:4,rc:20,r:90,h:-70,st:24,kb:8,ovh:1,arm:1,cn:2}],flip:['迴身肘',{d:12,su:9,ac:5,rc:16,r:84,h:-84,st:22,kb:10,cn:2}],upper:['頂心肘',{d:14,su:6,ac:6,rc:22,r:64,h:-108,st:30,kb:3,launch:1,arm:1,lift:-10,cn:3}]},
 {jab:['苦無刺',{d:6,su:3,ac:3,rc:8,r:112,h:-84,st:15,kb:3,cn:1}],lunge:['影步斬',{d:10,su:6,ac:8,rc:14,r:90,h:-80,st:20,kb:6,vx:11,cn:2}],push:['掃影腳',{d:7,su:5,ac:4,rc:12,r:100,h:-12,st:17,kb:5,low:1,cn:1}],spin:['飛燕',{d:12,su:9,ac:10,rc:14,r:84,h:-60,st:22,kb:7,hop:-9,vx:5,cn:2}],flip:['背刺',{d:11,su:8,ac:5,rc:16,r:96,h:-80,st:22,kb:6,rev:1,cn:2}],upper:['月影',{d:12,su:4,ac:7,rc:20,r:62,h:-112,st:28,kb:3,launch:1,inv:1,lift:-13,cn:3}]},
 {jab:['電掌',{d:3,su:5,ac:12,rc:12,r:90,h:-80,st:14,kb:2,hits:3,gap:4,cn:1}],lunge:['雷肘',{d:11,su:9,ac:5,rc:16,r:94,h:-86,st:21,kb:9,vx:6,cn:2}],push:['放電腳',{d:8,su:7,ac:4,rc:14,r:106,h:-14,st:18,kb:5,low:1,cn:1}],spin:['雷踵',{d:13,su:13,ac:5,rc:18,r:96,h:-70,st:22,kb:6,ovh:1,cn:2}],flip:['電磁跳',{d:0,su:2,ac:10,rc:6,r:0,vx:-6,hop:-10,nohit:1,inv:1,iv:8,cn:0}],upper:['天雷掌',{d:13,su:5,ac:8,rc:22,r:56,h:-124,st:30,kb:3,launch:1,inv:1,lift:-12,cn:3}]},
 {jab:['岩掌',{d:8,su:6,ac:4,rc:12,r:96,h:-80,st:17,kb:12,cn:1}],lunge:['山崩',{d:15,su:14,ac:5,rc:20,r:90,h:-80,st:24,kb:13,arm:1,vx:4,cn:2}],push:['地踏',{d:9,su:8,ac:3,rc:16,r:80,h:-8,st:22,kb:4,low:1,knock:1,cn:1}],spin:['岩落',{d:16,su:15,ac:4,rc:20,r:88,h:-70,st:24,kb:8,ovh:1,cn:2}],flip:['迴身掌',{d:12,su:9,ac:5,rc:16,r:92,h:-76,st:22,kb:14,cn:2}],upper:['頂岩',{d:14,su:6,ac:6,rc:24,r:64,h:-108,st:30,kb:3,launch:1,arm:1,lift:-9,cn:3}]},
 {jab:['冰指',{d:7,su:5,ac:3,rc:10,r:114,h:-84,st:16,kb:4,cn:1}],lunge:['冰刃',{d:11,su:8,ac:6,rc:14,r:96,h:-80,st:20,kb:7,vx:6,cn:2}],push:['霜滑',{d:8,su:6,ac:6,rc:14,r:96,h:-12,st:18,kb:4,vx:7,low:1,cn:1}],spin:['冰踵',{d:13,su:13,ac:5,rc:18,r:110,h:-70,st:22,kb:6,ovh:1,cn:2}],flip:['寒流',{d:9,su:8,ac:6,rc:16,r:120,h:-70,st:20,kb:-7,cn:2}],upper:['冰柱拳',{d:13,su:5,ac:7,rc:22,r:60,h:-114,st:30,kb:3,launch:1,inv:1,lift:-12,cn:3}]},
 {jab:['疾刺',{d:6,su:3,ac:3,rc:9,r:104,h:-84,st:15,kb:3,cn:1}],lunge:['旋風肘',{d:6,su:7,ac:10,rc:14,r:90,h:-84,st:18,kb:4,vx:5,hits:2,gap:5,cn:2}],push:['連環腳',{d:4,su:5,ac:14,rc:12,r:100,h:-56,st:15,kb:2,hits:3,gap:4,cn:1}],spin:['飛燕踢',{d:13,su:9,ac:10,rc:14,r:90,h:-60,st:22,kb:8,hop:-9,vx:6,cn:2}],flip:['後旋風',{d:7,su:7,ac:8,rc:16,r:96,h:-72,st:20,kb:6,vx:-5,hits:2,gap:5,cn:2}],upper:['昇龍腳',{d:13,su:4,ac:8,rc:22,r:62,h:-116,st:30,kb:3,launch:1,inv:1,lift:-14,cn:3}]},
 {jab:['點棍',{d:7,su:6,ac:3,rc:11,r:128,h:-80,st:16,kb:5,cn:1}],lunge:['撐棍踢',{d:11,su:9,ac:6,rc:16,r:110,h:-70,st:21,kb:10,vx:8,cn:2}],push:['掃棍',{d:8,su:8,ac:4,rc:15,r:130,h:-12,st:18,kb:5,low:1,cn:1}],spin:['劈棍',{d:14,su:14,ac:4,rc:20,r:128,h:-60,st:23,kb:6,ovh:1,cn:2}],flip:['回棍',{d:12,su:10,ac:6,rc:18,r:120,h:-76,st:22,kb:11,vx:-3,cn:2}],upper:['挑棍',{d:12,su:6,ac:6,rc:24,r:100,h:-110,st:28,kb:3,launch:1,lift:-8,cn:3}]},
 {jab:['刺拳',{d:5,su:3,ac:3,rc:7,r:100,h:-86,st:14,kb:3,cn:1}],lunge:['肝臟拳',{d:12,su:8,ac:4,rc:14,r:86,h:-64,st:24,kb:6,arm:1,cn:2}],push:['左右連拳',{d:4,su:4,ac:10,rc:10,r:96,h:-84,st:14,kb:2,hits:2,gap:5,cn:1}],spin:['重擊鉤拳',{d:14,su:12,ac:4,rc:18,r:90,h:-84,st:22,kb:13,cn:2}],flip:['下砸拳',{d:13,su:13,ac:4,rc:18,r:86,h:-70,st:22,kb:6,ovh:1,cn:2}],upper:['上鉤拳',{d:14,su:4,ac:6,rc:22,r:60,h:-108,st:30,kb:3,launch:1,inv:1,lift:-11,cn:3}]},
 {jab:['毒爪',{d:6,su:4,ac:3,rc:10,r:100,h:-84,st:15,kb:3,psn:90,cn:1}],lunge:['鎖鐮',{d:10,su:10,ac:5,rc:18,r:150,h:-80,st:20,kb:-6,cn:2}],push:['毒蛇腳',{d:7,su:6,ac:4,rc:13,r:104,h:-12,st:17,kb:5,low:1,psn:90,cn:1}],spin:['蠍尾踢',{d:13,su:12,ac:6,rc:18,r:96,h:-70,st:22,kb:6,ovh:1,psn:120,cn:2}],flip:['煙步',{d:0,su:1,ac:14,rc:6,r:0,vx:-9,inv:1,iv:12,nohit:1,cn:0}],upper:['毒針',{d:12,su:5,ac:7,rc:22,r:62,h:-112,st:28,kb:3,launch:1,inv:1,lift:-11,psn:90,cn:3}]},
 {jab:['扇擊',{d:6,su:4,ac:4,rc:9,r:108,h:-84,st:15,kb:4,cn:1}],lunge:['舞扇',{d:5,su:7,ac:10,rc:14,r:96,h:-80,st:17,kb:3,vx:5,hits:2,gap:6,cn:2}],push:['蝶腳',{d:7,su:5,ac:4,rc:12,r:100,h:-14,st:17,kb:5,low:1,cn:1}],spin:['飛燕翻',{d:12,su:9,ac:12,rc:14,r:84,h:-56,st:22,kb:7,hop:-11,vx:4,cn:2}],flip:['翩然退',{d:0,su:2,ac:12,rc:6,r:0,vx:-7,hop:-9,nohit:1,inv:1,iv:10,cn:0}],upper:['扇月',{d:11,su:4,ac:8,rc:20,r:70,h:-110,st:26,kb:3,launch:1,inv:1,lift:-14,cn:3}]},
 {jab:['機械拳',{d:8,su:6,ac:3,rc:12,r:100,h:-84,st:17,kb:6,cn:1}],lunge:['液壓衝拳',{d:14,su:12,ac:5,rc:18,r:96,h:-84,st:23,kb:14,arm:1,vx:5,cn:2}],push:['履帶踢',{d:8,su:8,ac:5,rc:15,r:100,h:-12,st:18,kb:5,low:1,cn:1}],spin:['重錘',{d:15,su:15,ac:4,rc:20,r:96,h:-70,st:24,kb:8,ovh:1,cn:2}],flip:['噴射後退',{d:0,su:2,ac:10,rc:6,r:0,vx:-10,nohit:1,cn:0}],upper:['對空砲',{d:12,su:7,ac:6,rc:24,r:70,h:-130,st:28,kb:3,launch:1,arm:1,cn:3}]},
 {jab:['柄擊',{d:7,su:5,ac:3,rc:10,r:96,h:-84,st:16,kb:5,cn:1}],lunge:['踏込斬',{d:12,su:9,ac:5,rc:16,r:108,h:-80,st:21,kb:8,vx:7,cn:2}],push:['下段斬',{d:8,su:7,ac:4,rc:14,r:108,h:-12,st:18,kb:5,low:1,cn:1}],spin:['唐竹割',{d:15,su:15,ac:4,rc:20,r:104,h:-70,st:23,kb:6,ovh:1,cn:2}],flip:['燕返',{d:6,su:7,ac:10,rc:16,r:100,h:-76,st:19,kb:5,hits:2,gap:5,cn:2}],upper:['逆袈裟',{d:13,su:5,ac:7,rc:22,r:80,h:-110,st:28,kb:3,launch:1,lift:-10,cn:3}]},
 {jab:['咒指',{d:6,su:5,ac:3,rc:10,r:100,h:-84,st:15,kb:3,wk:120,cn:1}],lunge:['魂肘',{d:10,su:8,ac:5,rc:15,r:90,h:-84,st:20,kb:7,vx:5,ls:.3,cn:2}],push:['鬼腳',{d:7,su:6,ac:4,rc:13,r:100,h:-12,st:17,kb:5,low:1,cn:1}],spin:['降咒',{d:12,su:13,ac:5,rc:18,r:96,h:-70,st:22,kb:6,ovh:1,wk:180,cn:2}],flip:['幽步',{d:0,su:1,ac:14,rc:6,r:0,vx:-8,inv:1,iv:12,nohit:1,cn:0}],upper:['昇魂',{d:12,su:5,ac:7,rc:22,r:62,h:-112,st:28,kb:3,launch:1,inv:1,lift:-11,cn:3}]},
 {jab:['爪擊',{d:8,su:5,ac:3,rc:10,r:96,h:-84,st:16,kb:4,cn:1}],lunge:['頭鎚',{d:14,su:11,ac:5,rc:18,r:84,h:-90,st:23,kb:12,arm:1,vx:6,cn:2}],push:['低掃爪',{d:8,su:7,ac:4,rc:14,r:100,h:-14,st:18,kb:5,low:1,cn:1}],spin:['熊掌落',{d:16,su:15,ac:4,rc:20,r:92,h:-70,st:24,kb:8,ovh:1,cn:2}],flip:['迴身尾擊',{d:12,su:9,ac:5,rc:16,r:100,h:-60,st:22,kb:15,cn:2}],upper:['撈爪',{d:14,su:6,ac:7,rc:22,r:70,h:-108,st:30,kb:3,launch:1,lift:-10,cn:3}]},
 {jab:['弓尾擊',{d:6,su:4,ac:3,rc:9,r:110,h:-84,st:15,kb:4,cn:1}],lunge:['肘打',{d:10,su:8,ac:5,rc:14,r:88,h:-84,st:20,kb:8,vx:6,cn:2}],push:['掃腿',{d:7,su:6,ac:4,rc:13,r:104,h:-12,st:17,kb:5,low:1,cn:1}],spin:['鷹落踢',{d:12,su:9,ac:10,rc:14,r:86,h:-58,st:22,kb:7,hop:-10,vx:5,cn:2}],flip:['後躍',{d:0,su:2,ac:10,rc:6,r:0,vx:-7,hop:-10,nohit:1,cn:0}],upper:['弓挑',{d:12,su:5,ac:7,rc:22,r:70,h:-110,st:28,kb:3,launch:1,inv:1,lift:-12,cn:3}]}];
CMD.forEach((c,i)=>{const ch=CH[i];ch.mv=ch.mv||{};ch.nm={};for(const k in c){ch.nm[k]=c[k][0];ch.mv[k]=Object.assign({rep:1},c[k][1])}});
// ===== 第二批專屬招式：↓+重拳 dhp、↓+輕腳 dlk、←+輕拳 blp、←+重拳 bhp、空中重拳 ahp，以及 ↓+投技 的第六個必殺技 sp4 =====
const A1={air:1,cn:0};
const CMD2=[
 {dhp:['蹲炎拳',{d:11,su:6,ac:4,rc:16,r:72,h:-100,st:20,kb:4,cn:2}],dlk:['火蛇腳',{d:5,su:4,ac:3,rc:9,r:100,h:-14,st:14,kb:3,low:1,cn:1}],blp:['護身掌',{d:6,su:3,ac:3,rc:8,r:70,h:-86,st:14,kb:5,cn:1}],bhp:['回燄拳',{d:12,su:9,ac:5,rc:16,r:90,h:-80,st:21,kb:10,vx:-3,cn:2}],ahp:['空炎拳',{d:10,su:4,ac:8,rc:3,r:74,h:-56,st:18,kb:5,...A1}],
  sp4:['爆炎掌（近身爆炸）',{d:16,su:12,ac:6,rc:24,r:90,h:-70,st:26,kb:12,around:1,knock:1,cost:50}]},
 {dhp:['鋼樁拳',{d:12,su:8,ac:4,rc:18,r:70,h:-96,st:21,kb:5,arm:1,cn:2}],dlk:['鋼脛',{d:6,su:5,ac:3,rc:11,r:90,h:-14,st:15,kb:4,low:1,cn:1}],blp:['盾肘',{d:7,su:4,ac:3,rc:9,r:66,h:-86,st:15,kb:6,cn:1}],bhp:['迴旋鐵拳',{d:14,su:12,ac:5,rc:18,r:88,h:-80,st:23,kb:13,cn:2}],ahp:['空中鐵肘',{d:12,su:5,ac:8,rc:4,r:70,h:-56,st:20,kb:7,arm:1,...A1}],
  sp4:['崩拳（破防、霸體）',{d:16,su:14,ac:5,rc:22,r:90,h:-80,st:24,kb:12,gb:1,arm:1,cost:50}]},
 {dhp:['昇苦無',{d:10,su:5,ac:4,rc:14,r:74,h:-104,st:19,kb:4,cn:2}],dlk:['足払',{d:5,su:3,ac:3,rc:8,r:100,h:-12,st:13,kb:3,low:1,cn:1}],blp:['影手',{d:5,su:3,ac:3,rc:7,r:70,h:-86,st:13,kb:3,cn:1}],bhp:['鎖喉',{d:11,su:8,ac:5,rc:15,r:96,h:-84,st:20,kb:-5,cn:2}],ahp:['空蟬',{d:9,su:3,ac:8,rc:3,r:76,h:-56,st:17,kb:5,...A1}],
  sp4:['影縫（緩速陷阱）',{type:'proj',d:6,su:8,ac:1,rc:16,spd:0,low:1,life:180,sl:150,cost:50}]},
 {dhp:['雷光衝',{d:11,su:6,ac:5,rc:16,r:72,h:-104,st:20,kb:4,cn:2}],dlk:['電流腳',{d:5,su:4,ac:3,rc:9,r:100,h:-14,st:14,kb:3,low:1,cn:1}],blp:['靜電掌',{d:4,su:4,ac:8,rc:9,r:66,h:-84,st:13,kb:2,hits:2,gap:4,cn:1}],bhp:['雷擊掌',{d:12,su:9,ac:5,rc:16,r:92,h:-80,st:21,kb:9,cn:2}],ahp:['雷翼',{d:9,su:4,ac:8,rc:3,r:80,h:-60,st:18,kb:5,...A1}],
  sp4:['球雷（慢速穿透三次）',{type:'proj',d:7,su:12,ac:1,rc:22,spd:3,ph:3,life:200,cost:50}]},
 {dhp:['岩頂',{d:13,su:8,ac:4,rc:18,r:70,h:-96,st:21,kb:5,arm:1,cn:2}],dlk:['碎石腳',{d:6,su:5,ac:3,rc:10,r:88,h:-12,st:15,kb:4,low:1,cn:1}],blp:['岩肘',{d:7,su:5,ac:3,rc:9,r:64,h:-86,st:15,kb:7,cn:1}],bhp:['巨岩掌',{d:15,su:13,ac:5,rc:20,r:90,h:-80,st:24,kb:15,cn:2}],ahp:['落石肘',{d:12,su:5,ac:8,rc:4,r:70,h:-50,st:20,kb:7,...A1}],
  sp4:['岩崩（下段、震倒）',{d:12,su:12,ac:5,rc:24,r:110,h:-10,st:24,kb:6,around:1,low:1,knock:1,cost:50}]},
 {dhp:['冰錐拳',{d:11,su:6,ac:4,rc:16,r:72,h:-104,st:20,kb:4,cn:2}],dlk:['霜腳',{d:5,su:4,ac:3,rc:9,r:104,h:-14,st:14,kb:3,low:1,sl:60,cn:1}],blp:['寒掌',{d:6,su:4,ac:3,rc:8,r:70,h:-84,st:14,kb:4,sl:60,cn:1}],bhp:['冰晶掌',{d:12,su:9,ac:5,rc:16,r:96,h:-80,st:21,kb:8,cn:2}],ahp:['冰翼',{d:9,su:4,ac:8,rc:3,r:80,h:-56,st:18,kb:5,...A1}],
  sp4:['霜降（周圍緩速）',{d:6,su:10,ac:10,rc:22,r:120,h:-60,st:18,kb:4,around:1,sl:240,cost:50}]},
 {dhp:['旋昇掌',{d:6,su:5,ac:10,rc:16,r:72,h:-100,st:18,kb:3,hits:2,gap:5,cn:2}],dlk:['疾掃',{d:5,su:3,ac:3,rc:8,r:100,h:-14,st:13,kb:3,low:1,cn:1}],blp:['風掌',{d:6,su:3,ac:3,rc:8,r:70,h:-84,st:14,kb:6,cn:1}],bhp:['迴旋肘',{d:6,su:7,ac:10,rc:15,r:88,h:-80,st:18,kb:4,hits:2,gap:5,vx:-3,cn:2}],ahp:['鷹爪',{d:9,su:3,ac:8,rc:3,r:76,h:-56,st:17,kb:5,...A1}],
  sp4:['龍捲（慢速穿透三次）',{type:'proj',d:6,su:10,ac:1,rc:20,spd:4,ph:3,life:120,cost:50}]},
 {dhp:['撐棍',{d:12,su:8,ac:5,rc:18,r:100,h:-104,st:21,kb:4,cn:2}],dlk:['點足',{d:5,su:5,ac:3,rc:10,r:120,h:-14,st:14,kb:3,low:1,cn:1}],blp:['棍柄',{d:6,su:4,ac:3,rc:8,r:80,h:-84,st:14,kb:5,cn:1}],bhp:['橫掃棍',{d:13,su:11,ac:6,rc:18,r:130,h:-76,st:22,kb:10,cn:2}],ahp:['空中劈',{d:11,su:5,ac:8,rc:4,r:96,h:-50,st:19,kb:6,...A1}],
  sp4:['棍陣（周圍三段）',{d:6,su:10,ac:16,rc:22,r:130,h:-70,st:18,kb:4,around:1,hits:3,gap:5,cost:50}]},
 {dhp:['蹲身上勾',{d:12,su:5,ac:4,rc:16,r:66,h:-104,st:22,kb:4,cn:2}],dlk:['低踢',{d:5,su:4,ac:3,rc:9,r:90,h:-14,st:14,kb:3,low:1,cn:1}],blp:['防守刺拳',{d:5,su:2,ac:3,rc:7,r:80,h:-86,st:13,kb:4,cn:1}],bhp:['交叉反擊',{d:14,su:10,ac:4,rc:16,r:92,h:-84,st:23,kb:11,cn:2}],ahp:['空中重拳',{d:11,su:4,ac:7,rc:3,r:74,h:-56,st:19,kb:6,...A1}],
  sp4:['搖閃突擊（起手無敵）',{d:14,su:10,ac:6,rc:18,vx:9,r:84,h:-84,st:22,kb:10,inv:1,iv:10,cost:50}]},
 {dhp:['毒勾',{d:10,su:6,ac:4,rc:16,r:72,h:-100,st:20,kb:4,psn:60,cn:2}],dlk:['蛇牙',{d:5,su:4,ac:3,rc:9,r:100,h:-14,st:14,kb:3,low:1,psn:60,cn:1}],blp:['毒刺',{d:5,su:3,ac:3,rc:8,r:72,h:-84,st:13,kb:3,psn:60,cn:1}],bhp:['鎖鏈橫掃',{d:11,su:10,ac:6,rc:18,r:140,h:-76,st:20,kb:-4,cn:2}],ahp:['空中毒爪',{d:9,su:4,ac:8,rc:3,r:74,h:-56,st:17,kb:5,psn:60,...A1}],
  sp4:['劇毒爆（周圍劇毒）',{d:10,su:12,ac:6,rc:24,r:100,h:-70,st:22,kb:10,around:1,psn:300,cost:50}]},
 {dhp:['扇昇',{d:10,su:5,ac:5,rc:15,r:76,h:-104,st:19,kb:4,cn:2}],dlk:['蝶尾',{d:5,su:3,ac:3,rc:8,r:100,h:-14,st:13,kb:3,low:1,cn:1}],blp:['扇遮',{d:5,su:3,ac:3,rc:8,r:72,h:-86,st:13,kb:4,cn:1}],bhp:['迴扇',{d:5,su:7,ac:10,rc:15,r:96,h:-80,st:17,kb:3,hits:2,gap:6,cn:2}],ahp:['空扇',{d:9,su:3,ac:10,rc:3,r:80,h:-56,st:17,kb:5,float:1,...A1}],
  sp4:['雙蝶（兩把迴旋扇）',{type:'proj',d:7,su:10,ac:1,rc:24,spd:8,ret:26,life:60,n2:1,cost:50}]},
 {dhp:['對空鑽',{d:5,su:7,ac:12,rc:18,r:70,h:-110,st:18,kb:2,hits:3,gap:4,cn:2}],dlk:['履帶掃',{d:6,su:5,ac:3,rc:11,r:96,h:-14,st:15,kb:4,low:1,cn:1}],blp:['裝甲拳',{d:7,su:5,ac:3,rc:10,r:70,h:-86,st:15,kb:6,arm:1,cn:1}],bhp:['迴轉臂',{d:6,su:10,ac:12,rc:18,r:96,h:-80,st:18,kb:4,hits:3,gap:4,cn:2}],ahp:['空中推進拳',{d:11,su:5,ac:8,rc:4,r:76,h:-56,st:19,kb:7,vx:4,...A1}],
  sp4:['地雷（踩到會爆炸）',{type:'proj',d:14,su:10,ac:1,rc:18,spd:0,low:1,life:240,knock:1,cost:50}]},
 {dhp:['斬上',{d:12,su:6,ac:4,rc:16,r:84,h:-104,st:20,kb:4,cn:2}],dlk:['足斬',{d:6,su:4,ac:3,rc:9,r:108,h:-14,st:14,kb:3,low:1,cn:1}],blp:['鍔迫',{d:6,su:4,ac:3,rc:8,r:74,h:-84,st:14,kb:6,cn:1}],bhp:['袈裟斬',{d:13,su:10,ac:5,rc:17,r:104,h:-76,st:22,kb:9,cn:2}],ahp:['空斬',{d:11,su:4,ac:7,rc:3,r:84,h:-52,st:19,kb:6,...A1}],
  sp4:['見切（擋下攻擊後反擊）',{d:0,su:2,ac:18,rc:16,r:60,h:-70,st:0,kb:0,counter:1,cost:50}]},
 {dhp:['魂昇',{d:10,su:6,ac:5,rc:16,r:74,h:-104,st:19,kb:4,ls:.3,cn:2}],dlk:['冥足',{d:5,su:4,ac:3,rc:9,r:100,h:-14,st:14,kb:3,low:1,cn:1}],blp:['咒印',{d:5,su:4,ac:3,rc:8,r:70,h:-84,st:13,kb:3,wk:90,cn:1}],bhp:['鬼手',{d:11,su:10,ac:6,rc:18,r:120,h:-80,st:20,kb:-5,cn:2}],ahp:['魂爪',{d:9,su:4,ac:8,rc:3,r:76,h:-56,st:17,kb:5,ls:.3,...A1}],
  sp4:['魂分（兩發追蹤）',{type:'proj',d:8,su:12,ac:1,rc:22,spd:4,hm:1,n2:1,life:160,cost:50}]},
 {dhp:['撕裂爪',{d:6,su:6,ac:10,rc:16,r:74,h:-100,st:18,kb:3,hits:2,gap:5,cn:2}],dlk:['低咬',{d:6,su:4,ac:3,rc:9,r:92,h:-14,st:14,kb:3,low:1,cn:1}],blp:['獸掌',{d:7,su:4,ac:3,rc:9,r:72,h:-84,st:15,kb:6,cn:1}],bhp:['狂爪',{d:6,su:8,ac:12,rc:16,r:92,h:-80,st:18,kb:4,hits:3,gap:4,cn:2}],ahp:['空中撲擊',{d:12,su:4,ac:8,rc:4,r:76,h:-50,st:20,kb:7,...A1}],
  sp4:['舔傷（回復 15 體力）',{d:0,su:20,ac:1,rc:16,r:0,nohit:1,heal:15,cost:50}]},
 {dhp:['對空射',{type:'proj',d:9,su:7,ac:1,rc:16,spd:9,vy:-7,cn:2}],dlk:['低掃',{d:5,su:4,ac:3,rc:9,r:100,h:-14,st:14,kb:3,low:1,cn:1}],blp:['弓擋',{d:5,su:3,ac:3,rc:8,r:76,h:-84,st:13,kb:5,cn:1}],bhp:['近射',{type:'proj',d:10,su:9,ac:1,rc:18,spd:16,pkb:12,life:30,cn:2}],ahp:['空射',{type:'proj',d:8,su:4,ac:1,rc:6,spd:13,...A1}],
  sp4:['束縛箭（長時間緩速）',{type:'proj',d:8,su:10,ac:1,rc:18,spd:12,sl:300,knock:1,cost:50}]}];
CMD2.forEach((c,i)=>{const ch=CH[i];for(const k in c){if(k==='sp4'){ch.sp4=c[k][1];ch.sp4n=c[k][0];continue}ch.nm[k]=c[k][0];ch.mv[k]=Object.assign({rep:1},c[k][1])}});
const QUO=['還不夠熱！','堅不可摧。','……影已逝。','雷光，一閃！','大地，不會動搖。','凍結吧。','跟得上我的風嗎？','月有圓缺，勝負亦然。','再來一回合！','毒，已經滲透了。','一舞，終幕。','目標，清除完畢。','刀已入鞘。','你的魂，我收下了。','吼——！','一箭，就夠了。'];
const pp=o=>NOFX||parts.push(o);
// ---- 同時命中：兩邊都打到就互相命中（不再由 P1 優先）
function resolveHits(){
 const h1=p1.ph,h2=p2.ph;p1.ph=null;p2.ph=null;
 const r1=h1&&p2.st!=='ko'?p2.getHit(p1,h1.a,h1.x):false;
 const r2=h2&&p1.st!=='ko'?p1.getHit(p2,h2.a,h2.x):false;
 if(r1==='p'&&p1.atk===h1.a)p1.pd=1;if(r2==='p'&&p2.atk===h2.a)p2.pd=1;
 if(r1===true&&p1.atk===h1.a){p1.hit=true;p1.hc=(p1.hc||0)+1;p1.hlt=p1.t}
 if(r2===true&&p2.atk===h2.a){p2.hit=true;p2.hc=(p2.hc||0)+1;p2.hlt=p2.t}
}
// ---- 場景
function bgKind(b,S,r){
 if(S.k==='volcano'){
  let g=b.createRadialGradient(640,GY,10,640,GY,420);g.addColorStop(0,'rgba(255,120,40,.55)');g.addColorStop(1,'rgba(255,60,20,0)');b.fillStyle=g;b.fillRect(0,0,W,GY);
  b.fillStyle=S.b[0];b.beginPath();b.moveTo(0,GY);for(let x=0;x<=W;x+=60)b.lineTo(x,GY-120-r()*120);b.lineTo(W,GY);b.closePath();b.fill();
  b.fillStyle=S.b[1];b.beginPath();b.moveTo(380,GY);b.lineTo(590,170);b.lineTo(690,170);b.lineTo(900,GY);b.closePath();b.fill();
  g=b.createRadialGradient(640,170,4,640,170,90);g.addColorStop(0,'rgba(255,220,120,.95)');g.addColorStop(.4,'rgba(255,110,30,.6)');g.addColorStop(1,'rgba(255,60,10,0)');b.fillStyle=g;b.fillRect(520,60,240,200);
  b.lineCap='round';b.lineJoin='round';for(let i=0;i<3;i++){const x0=612+i*28,s=(i-1)*.9;b.beginPath();b.moveTo(x0,174);b.bezierCurveTo(x0+s*40,250,x0+s*90+(r()-.5)*30,330,x0+s*150,GY-4);b.strokeStyle='rgba(255,90,20,.35)';b.lineWidth=16;b.stroke();b.strokeStyle='#e8501a';b.lineWidth=7;b.stroke();b.strokeStyle='#ffb347';b.lineWidth=2.5;b.stroke()}
  b.fillStyle=S.b[1];for(let i=0;i<9;i++){const x=r()*W,w=40+r()*80,h=20+r()*50;b.beginPath();b.moveTo(x,GY);b.lineTo(x+w*.3,GY-h);b.lineTo(x+w*.7,GY-h*.7);b.lineTo(x+w,GY);b.closePath();b.fill()}
 }else{
  let g=b.createLinearGradient(0,GY-220,0,GY);g.addColorStop(0,'rgba(220,255,200,0)');g.addColorStop(1,'rgba(220,255,200,.18)');b.fillStyle=g;b.fillRect(0,GY-220,W,220);
  for(let L=0;L<2;L++)for(let i=0;i<(L?16:24);i++){const x=r()*W,w=(L?14:8)+r()*(L?8:5);b.fillStyle=S.b[L];b.fillRect(x,0,w,GY);b.fillStyle='rgba(0,0,0,.25)';for(let y=30+r()*40;y<GY;y+=44+r()*20)b.fillRect(x-1,y,w+2,3);
   b.fillStyle=L?'#2f6b3a':'#24502c';for(let k=0;k<4;k++){const ly=40+r()*(GY-120),lx=x+w/2,s=r()<.5?-1:1;b.beginPath();b.ellipse(lx+s*14,ly,16,4,s*.5,0,6.3);b.fill()}}
  b.fillStyle='#4a321e';b.fillRect(0,GY-46,W,8);for(let x=10;x<W;x+=60){b.fillRect(x,GY-46,8,46)}b.fillStyle='#6a4a2c';b.fillRect(0,GY-46,W,3);
 }
}
// ---- 姿勢（出場、勝利、超必殺肖像）
function POSE(li,pz,f){const s=Math.sin(G.frame*.15);
 if(pz==='sup')return[-50,-100,[30,0],[-30,0],[74,-96],[-18,-84],16];
 if(pz==='win')switch(li){
  case 0:return[-52,-98,[18,0],[-18,0],[18,-150+s*5],[26,-74],2];
  case 1:return[-52,-99+s,[22,0],[-22,0],[14,-92],[16,-88],0];
  case 2:return[-50,-97,[16,0],[-16,0],[12,-98],[14,-94],-4];
  case 3:return[-52,-99,[18,0],[-18,0],[24,-152+s*4],[-16,-150-s*4],0];
  case 5:return[-52,-98,[16,0],[-16,0],[30,-128+s*3],[-10,-120],-2];
  case 6:return[-50,-97,[24,0],[-20,0],[20,-150+s*5],[-26,-96],6];
  case 7:return[-52,-99,[20,0],[-20,0],[22,-120],[4,-112],0];
  default:return[-44,-92+s*2,[30,0],[-30,0],[34,-114],[-24,-114],0]}
 switch(li){
  case 0:return[-50,-96,[22,0],[-20,0],[22,-146],[26,-76],4];
  case 1:return[-50,-97,[24,0],[-24,0],[12,-92],[16,-88],0];
  case 2:return[-42,-86,[26,0],[-26,0],[14,-112],[18,-106],6];
  case 3:return[-52,-98,[18,0],[-18,0],[8,-150],[30,-80],0];
  case 5:return[-50,-96,[20,0],[-22,0],[36,-96],[22,-84],2];
  case 6:return[-44,-88,[30,0],[-28,0],[30,-104],[20,-86],8];
  case 7:return[-46,-92,[30,0],[-30,0],[40,-92],[16,-84],6];
  default:return[-38,-84,[34,0],[-34,0],[40,-66],[30,-58],4]}}
// ---- 新特效
function boltFx(p){P({t:'bolt',x:p.x,l:12,w:p.a.ex?1.6:1});emb(p.x,GY-10,'#fff3b0',10,6,16,4,1);P({ring:1,flat:1,x:p.x,y:GY-2,c:'#ffe680',l:14,rs:6,lw:4});sfx('thunder');G.shake=Math.max(G.shake,p.a.ex?7:4)}
function ctrFx(f){pp({x:f.x,y:f.y-145,vx:0,vy:-.6,l:55,m:55,txt:'反擊！',c:'#ffe0b8',text:1,big:1});P({ring:1,x:f.x+f.dir*24,y:f.y-70,c:'#ffe0b8',l:16,rs:6,lw:6});for(let i=0;i<8;i++)rok(f.x+f.dir*24,f.y-70,rr_(-4,4),-rr_(1,5),'#a8784a');sfx('counter')}
function bolt(x,y0,y1,al,w){const pts=[[x,y0]];let cx=x;for(let y=y0+30;y<y1;y+=30){cx=x+(Math.random()-.5)*36*w;pts.push([cx,y])}pts.push([x,y1]);
 ctx.save();ctx.globalAlpha=al;ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';ctx.lineCap='round';
 const path=()=>{ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]))};
 ctx.strokeStyle='rgba(255,220,80,.35)';ctx.lineWidth=26*w;path();ctx.stroke();
 ctx.strokeStyle='#ffe680';ctx.lineWidth=8*w;path();ctx.stroke();
 ctx.strokeStyle='#ffffff';ctx.lineWidth=3*w;path();ctx.stroke();
 ctx.strokeStyle='#8fe8ff';ctx.lineWidth=2;for(let i=2;i<pts.length-1;i+=3){const q=pts[i],s=Math.random()<.5?-1:1;ctx.beginPath();ctx.moveTo(q[0],q[1]);ctx.lineTo(q[0]+s*30,q[1]+22);ctx.lineTo(q[0]+s*44,q[1]+50);ctx.stroke()}
 ctx.restore()}
function drawRai(p){
 if(p.strike){
  if(p.wait>0){const k=(G.frame%8)<4,a=.35+.4*(1-p.wait/30);ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=k?'#ffe680':'#8fe8ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(p.x,GY-2,30,7,0,0,6.3);ctx.stroke();
   const g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'rgba(255,230,120,.25)');g.addColorStop(1,'rgba(255,230,120,0)');ctx.fillStyle=g;ctx.fillRect(p.x-18,0,36,GY);ctx.restore()}
  else{ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,230,120,.35)';ctx.beginPath();ctx.ellipse(p.x,GY-2,44,10,0,0,6.3);ctx.fill();ctx.restore()}
  return}
 const ang=Math.atan2(p.vy||0,p.vx);
 if(p.k==='asp'){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ang);ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#ffe680';ctx.lineWidth=5;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(-34,0);for(let i=1;i<=5;i++)ctx.lineTo(-34+i*8,(i%2?-6:6));ctx.lineTo(14,0);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(8,-7);ctx.lineTo(8,7);ctx.closePath();ctx.fill();ctx.restore();return}
 ctx.save();ctx.globalCompositeOperation='lighter';const r=13;
 const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*2.2);g.addColorStop(0,'#ffffff');g.addColorStop(.3,'#fff3b0');g.addColorStop(.6,'rgba(255,210,61,.6)');g.addColorStop(1,'rgba(143,232,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,r*2.2,0,6.3);ctx.fill();
 ctx.strokeStyle='#8fe8ff';ctx.lineWidth=1.6;for(let i=0;i<4;i++){const a=Math.random()*6.28;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+Math.cos(a)*r*1.2+(Math.random()-.5)*8,p.y+Math.sin(a)*r*1.2+(Math.random()-.5)*8);ctx.lineTo(p.x+Math.cos(a)*r*2.3,p.y+Math.sin(a)*r*2.3);ctx.stroke()}
 ctx.strokeStyle='rgba(255,230,120,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*3,p.y+(Math.random()-.5)*8);ctx.lineTo(p.x-p.vx*5,p.y);ctx.stroke();ctx.restore()}
function drawIwa(p){
 if(p.k==='qk'){quake(p,.55);return}
 const rot=p.x*.05,r=17;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(rot);ctx.beginPath();
 const pts=[[1,0],[.7,.72],[-.1,1],[-.78,.6],[-1,-.1],[-.55,-.85],[.3,-.95],[.85,-.5]];pts.forEach((q,i)=>i?ctx.lineTo(q[0]*r,q[1]*r):ctx.moveTo(q[0]*r,q[1]*r));ctx.closePath();
 const g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#c9a07a');g.addColorStop(1,'#5a3e26');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#1e140c';ctx.lineWidth=2.4;ctx.stroke();
 ctx.strokeStyle='rgba(30,20,12,.7)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(-6,-8);ctx.lineTo(2,0);ctx.lineTo(-2,8);ctx.moveTo(2,0);ctx.lineTo(10,-2);ctx.stroke();
 ctx.fillStyle='rgba(255,240,210,.35)';ctx.beginPath();ctx.ellipse(-5,-7,5,3,-.6,0,6.3);ctx.fill();ctx.restore()}
// ---- 超必殺專屬演出
function supPattern(ci,t,e){
 ctx.save();
 if(ci===0){ctx.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const x=-W/2-80+i*70+((t*260)%70),h=60+((i*37)%50)+Math.sin(t*12+i)*18;const g=ctx.createLinearGradient(0,82,0,82-h-60);g.addColorStop(0,'rgba(255,90,20,.9)');g.addColorStop(.6,'rgba(255,200,60,.5)');g.addColorStop(1,'rgba(255,240,160,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-26,82);ctx.quadraticCurveTo(x-10,82-h,x+Math.sin(t*9+i)*8,82-h-60);ctx.quadraticCurveTo(x+12,82-h,x+26,82);ctx.closePath();ctx.fill()}}
 else if(ci===1){ctx.strokeStyle='rgba(220,235,255,.18)';ctx.lineWidth=1;for(let y=-80;y<82;y+=6){ctx.beginPath();ctx.moveTo(-W,y);ctx.lineTo(W,y);ctx.stroke()}ctx.fillStyle='rgba(20,30,50,.55)';for(let x=-W/2;x<W/2;x+=160){ctx.fillRect(x,-82,4,164)}ctx.fillStyle='#cfe0ff';for(let x=-W/2+20;x<W/2;x+=80){ctx.beginPath();ctx.arc(x,-68,3,0,6.3);ctx.arc(x,68,3,0,6.3);ctx.fill()}ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(127,214,255,.6)';ctx.lineWidth=3;for(let i=0;i<6;i++){const y=-60+i*24,x=((t*900+i*190)%(W+400))-W/2-200;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+180,y-14);ctx.stroke()}}
 else if(ci===2){ctx.fillStyle='rgba(243,232,255,.9)';ctx.beginPath();ctx.arc(120,-10,120,0,6.3);ctx.fill();ctx.fillStyle='rgba(20,10,40,1)';ctx.beginPath();ctx.arc(160,-30,112,0,6.3);ctx.fill();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=0;i<7;i++){const p=((t*1.6+i*.21)%1),x=-W/2+p*(W+200)-100;ctx.strokeStyle=i%2?'#e3ccff':'#b46bff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,-70+i*20);ctx.lineTo(x+150,-90+i*20);ctx.stroke()}}
 else if(ci===3){ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){if(((t*14+i*3)|0)%3===0)continue;const x0=-W/2+60+i*190+(Math.random()-.5)*30;ctx.strokeStyle='#ffe680';ctx.lineWidth=4;ctx.beginPath();let x=x0;ctx.moveTo(x,-82);for(let y=-60;y<=82;y+=20){x=x0+(Math.random()-.5)*40;ctx.lineTo(x,y)}ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke()}}
 else if(ci===4){for(let i=0;i<16;i++){const p=((t*.9+i*.13)%1),a=i*2.4,x=Math.cos(a)*p*W*.6,y=Math.sin(a)*p*120,s=8+((i*7)%14);ctx.save();ctx.translate(x,y);ctx.rotate(t*3+i);ctx.fillStyle=i%2?'#a8784a':'#6a4a2a';ctx.strokeStyle='#1e140c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-s,0);ctx.lineTo(-s*.3,-s);ctx.lineTo(s,-s*.4);ctx.lineTo(s*.6,s*.8);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}ctx.strokeStyle='rgba(30,20,12,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-W/2,40);for(let x=-W/2;x<W/2;x+=40)ctx.lineTo(x,40+(((x*13)|0)%17)-8);ctx.stroke()}
 else supPattern2(ci,t,e);
 ctx.restore()}
function portrait(ch,pose,x,y,sc,dir,side){ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);ctx.translate(0,-GY);drawF({x:0,y:GY,dir,ch,side,st:'idle',pose,mt:0,flash:0,tr:[],ns:1,kt:0,atk:null,t:0,lt:G.frame});ctx.restore()}
function supCine(k){
 const ci=G.supCh|0,ch=CH[ci],e=1-k,al=Math.min(1,k*4),sd=G.supSide?-1:1,t=performance.now()/1000;
 ctx.save();ctx.fillStyle=`rgba(0,0,0,${.62*Math.min(1,k*3)})`;ctx.fillRect(0,0,W,H);
 ctx.globalAlpha=al;ctx.translate(W/2,H/2-30);ctx.rotate(-.08*sd);
 ctx.save();ctx.beginPath();ctx.rect(-W,-82,W*2,164);ctx.clip();
 const g=ctx.createLinearGradient(-W/2,0,W/2,0);g.addColorStop(0,'#05050c');g.addColorStop(.5,G.supSide===1&&p1&&p2&&p1.ch===p2.ch?LOOKA[ci].col:ch.col);g.addColorStop(1,'#05050c');ctx.fillStyle=g;ctx.fillRect(-W,-82,W*2,164);
 supPattern(ci,t,e);
 portrait(ch,'sup',-sd*(250-e*50),225,2.1,sd,G.supSide);
 ctx.restore();
 ctx.fillStyle='#fff';ctx.fillRect(-W,-84,W*2,3);ctx.fillRect(-W,81,W*2,3);
 ctx.textAlign='center';ctx.font='900 70px '+FONT;ctx.lineWidth=9;ctx.strokeStyle='#000';ctx.lineJoin='round';const tx=sd*(130-e*30);ctx.strokeText(G.supName,tx,26);ctx.fillStyle='#fff';ctx.fillText(G.supName,tx,26);
 ctx.font='bold 18px '+FONT;ctx.fillStyle=ch.col2;ctx.fillText(ch.n+'・超必殺',tx,58);
 ctx.restore()}
// ---- 出場（VS）畫面
function vsScreen(){
 const t=110-G.vs,e=Math.min(1,t/16),o=Math.min(1,G.vs/12);
 ctx.save();ctx.globalAlpha=o;ctx.fillStyle='#07070f';ctx.fillRect(0,0,W,H);
 [[p1,1,0],[p2,-1,1]].forEach(([f,sd,i])=>{
  ctx.save();ctx.beginPath();if(!i){ctx.moveTo(0,0);ctx.lineTo(W/2+56,0);ctx.lineTo(W/2-64,H);ctx.lineTo(0,H)}else{ctx.moveTo(W,0);ctx.lineTo(W/2+64,0);ctx.lineTo(W/2-56,H);ctx.lineTo(W,H)}ctx.closePath();ctx.clip();
  const g=ctx.createLinearGradient(i?W:0,0,W/2,0);g.addColorStop(0,colOf(f));g.addColorStop(1,'#07070f');ctx.globalAlpha=o*.8;ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=o;
  ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=2;for(let k=0;k<14;k++){const y=(k*41+t*(i?-9:9))%H;ctx.beginPath();ctx.moveTo(0,(y+H)%H);ctx.lineTo(W,(y+H)%H);ctx.stroke()}
  portrait(f.ch,'intro',(i?W*.75:W*.25)+(1-e)*(i?300:-300),H+70,2.8,sd,i);
  ctx.restore();
  ctx.textAlign=i?'right':'left';const nx=i?W-40:40;
  ctx.font='900 72px '+FONT;ctx.lineWidth=8;ctx.strokeStyle='#000';ctx.lineJoin='round';ctx.strokeText(f.ch.n,nx,116);ctx.fillStyle='#fff';ctx.fillText(f.ch.n,nx,116);
  ctx.font='bold 20px '+FONT;ctx.fillStyle=f.ch.col2;ctx.fillText(f.ch.ds,nx,148);
  ctx.font='bold 16px '+FONT;ctx.fillStyle='#ffffffaa';ctx.fillText(i?(G.mode===1?'電腦':G.mode===4?'對手':'P2'):'P1',nx,56);
 });
 const pop=1+Math.max(0,1-t/10)*1.4;ctx.save();ctx.translate(W/2,H/2);ctx.scale(pop,pop);ctx.rotate(-.12);ctx.font='italic 900 120px '+FONT;ctx.textAlign='center';ctx.lineWidth=14;ctx.strokeStyle='#000';ctx.strokeText('VS',0,40);const vg=ctx.createLinearGradient(0,-50,0,40);vg.addColorStop(0,'#fff27a');vg.addColorStop(1,'#ff4d4d');ctx.fillStyle=vg;ctx.fillText('VS',0,40);ctx.restore();
 ctx.textAlign='center';ctx.font='bold 18px '+FONT;ctx.fillStyle='#fff';ctx.fillText('場景：'+STG[G.stage].n+(G.mode!==4?'　　Enter 跳過':''),W/2,H-24);
 ctx.restore()}
function quote(f){
 const li=Math.max(0,CH.indexOf(f.ch)),s=QUO[li],x=f.x,y=f.y-178;
 ctx.save();ctx.font='bold 18px '+FONT;const w=ctx.measureText(s).width+28,h=36,l=x-w/2;
 ctx.fillStyle='#fff';ctx.strokeStyle='#0c0c1c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(l+12,y);ctx.lineTo(l+w-12,y);ctx.arcTo(l+w,y,l+w,y+12,12);ctx.lineTo(l+w,y+h-12);ctx.arcTo(l+w,y+h,l+w-12,y+h,12);ctx.lineTo(x+8,y+h);ctx.lineTo(x,y+h+10);ctx.lineTo(x-6,y+h);ctx.lineTo(l+12,y+h);ctx.arcTo(l,y+h,l,y+h-12,12);ctx.lineTo(l,y+12);ctx.arcTo(l,y,l+12,y,12);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#111';ctx.textAlign='center';ctx.fillText(s,x,y+24);ctx.restore()}

