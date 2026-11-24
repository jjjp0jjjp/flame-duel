const B64=__B64__;
let H=null;
async function page(){if(H)return H;const bin=Uint8Array.from(atob(B64),c=>c.charCodeAt(0));H=await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();return H}
const txt=(s,status)=>new Response(s,{status,headers:{'content-type':'text/plain; charset=utf-8'}});
export default{async fetch(req,env){const u=new URL(req.url);
 if(u.pathname==='/api/ws'){
  if(req.headers.get('Upgrade')!=='websocket')return txt('expected websocket',426);
  const code=u.searchParams.get('code')||'';
  if(!/^\d{4}$/.test(code))return txt('bad code',400);
  const o=req.headers.get('Origin');
  if(o){let h='';try{h=new URL(o).host}catch(e){}if(h!==u.host)return txt('forbidden',403)}
  if(!env.ROOMS)return txt('rooms unavailable',503);
  return env.ROOMS.get(env.ROOMS.idFromName('r'+code)).fetch(req);
 }
 if(u.pathname==='/'||u.pathname==='/index.html')return new Response(await page(),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=300','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'}});
 return txt('Not found',404)}};
