// 依 IP 限制建立／加入房間的次數，避免有人逐一猜 4 位數代碼。
// list：這個 IP 最近的嘗試時間（毫秒，遞增）；回傳 true 表示允許並記錄這次。
export const GATE_LIMIT = 40; // 每 10 分鐘最多 40 次（正常玩家遠用不到）
export const GATE_WINDOW = 10 * 60 * 1000;
export function gateHit(list, now, limit = GATE_LIMIT, win = GATE_WINDOW) {
  while (list.length && list[0] <= now - win) list.shift();
  if (list.length >= limit) return false;
  list.push(now);
  return true;
}
// IPv6 以 /64 為單位計算（同一個用戶通常拿到整個 /64）
export function gateKey(ip) {
  if (!ip) return '';
  return ip.includes(':') ? ip.split(':').slice(0, 4).join(':') : ip;
}
