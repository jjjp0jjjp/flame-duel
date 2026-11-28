$('nh').onclick=()=>netJoin(true);$('nj').onclick=()=>netJoin(false);
$('nx').onclick=()=>{netLeave(1);$('net').style.display='none';setNs('房主按「建立房間」，把代碼告訴對手；對手輸入代碼後按「加入房間」。')};
