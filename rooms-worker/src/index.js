import { DurableObject } from "cloudflare:workers";
import { gateHit } from "./gate.js";

// 烈焰對決：房間配對（Durable Object）
// 每個 4 位數代碼對應一個 Room。房主與房客各一條 WebSocket，
// 伺服器只負責轉送 WebRTC 握手訊息；連上後雙方直連，WebSocket 就關閉。
// 房主若開放觀戰（送 open），對戰中會保留自己的 WebSocket，讓觀戰者（role=spec）透過它和房主握手；
// 觀戰畫面的資料由房主直接用 WebRTC 傳給觀戰者，伺服器一樣只轉送握手。
const SPEC_MAX = 8;
const STUN = [{ urls: ["stun:stun.cloudflare.com:3478", "stun:stun.l.google.com:19302"] }];
const J = (o) => JSON.stringify(o);
const RELAY = new Set(["offer", "answer", "ice", "bye"]);

// 配對成功時才產生 TURN 短期憑證（2 小時），失敗就只給 STUN。
async function iceServers(env) {
  try {
    if (!env.TURN_KEY_ID || !env.TURN_KEY_TOKEN) return STUN;
    const r = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${env.TURN_KEY_TOKEN}`, "Content-Type": "application/json" },
        body: J({ ttl: 7200 }),
      },
    );
    if (!r.ok) return STUN;
    const j = await r.json();
    const list = (j.iceServers || [])
      .map((s) => ({ ...s, urls: [].concat(s.urls).filter((u) => !/:53(\?|$)/.test(u)) }))
      .filter((s) => s.urls.length);
    return list.length ? list : STUN;
  } catch (e) {
    return STUN;
  }
}

export class Room extends DurableObject {
  open(tag) {
    return this.ctx.getWebSockets(tag).find((w) => w.readyState === 1);
  }

  async fetch(req) {
    // 限流計數器：以 "gate:<ip>" 命名的 Room 實例只負責計數，不開房間
    if (new URL(req.url).pathname === "/__gate") {
      this.hits = this.hits || [];
      return new Response(null, { status: gateHit(this.hits, Date.now()) ? 204 : 429 });
    }
    if (req.headers.get("Upgrade") !== "websocket") return new Response("expected websocket", { status: 426 });
    const role = new URL(req.url).searchParams.get("role");
    const [client, server] = Object.values(new WebSocketPair());
    const reject = (t) => {
      server.accept();
      server.send(J({ t }));
      server.close(4000, t);
      return new Response(null, { status: 101, webSocket: client });
    };
    const host = this.open("host");
    const guest = this.open("guest");
    const hostA = host ? host.deserializeAttachment() || {} : {};
    if (role === "spec") {
      if (!host) return reject("noroom");
      if (!hostA.watch) return reject("nowatch");
      if (this.ctx.getWebSockets("spec").filter((w) => w.readyState === 1).length >= SPEC_MAX) return reject("specfull");
      const id = Math.random().toString(36).slice(2, 8);
      this.ctx.acceptWebSocket(server, ["spec"]);
      server.serializeAttachment({ role: "spec", id, n: 0 });
      const ice = await iceServers(this.env);
      host.send(J({ t: "spec", id, ice }));
      server.send(J({ t: "watching", ice }));
      return new Response(null, { status: 101, webSocket: client });
    }
    if (role === "host") {
      if (host) return reject("taken");
      this.ctx.acceptWebSocket(server, ["host"]);
      server.serializeAttachment({ role: "host", n: 0 });
      server.send(J({ t: "hosted" }));
    } else if (role === "guest") {
      if (!host) return reject("noroom");
      if (guest || hostA.playing) return reject("full");
      this.ctx.acceptWebSocket(server, ["guest"]);
      server.serializeAttachment({ role: "guest", n: 0 });
      const ice = await iceServers(this.env);
      host.send(J({ t: "peer", ice }));
      server.send(J({ t: "joined", ice }));
    } else {
      return new Response("bad role", { status: 400 });
    }
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, msg) {
    const a = ws.deserializeAttachment() || {};
    a.n = (a.n || 0) + 1;
    ws.serializeAttachment(a);
    // 握手只需要幾則訊息；超量或過大就斷線，避免被拿來當免費轉送管道（開放觀戰的房主要幫每位觀戰者握手，上限放寬）。
    if (a.n > (a.role === "host" && a.watch ? 400 : 40) || typeof msg !== "string" || msg.length > 20000) {
      ws.close(4002, "limit");
      return;
    }
    let o;
    try {
      o = JSON.parse(msg);
    } catch (e) {
      return;
    }
    if (!o) return;
    // 房主的控制訊息：open＝開放觀戰、playing／idle＝對戰中（擋掉新對手）／空閒
    if (a.role === "host" && (o.t === "open" || o.t === "playing" || o.t === "idle")) {
      if (o.t === "open") a.watch = 1; else a.playing = o.t === "playing" ? 1 : 0;
      ws.serializeAttachment(a);
      return;
    }
    if (!RELAY.has(o.t)) return;
    if (a.role === "spec") {
      const h = this.open("host");
      if (h) h.send(J({ t: o.t, s: o.s, from: a.id }));
      return;
    }
    if (a.role === "host" && typeof o.to === "string") {
      const sp = this.ctx.getWebSockets("spec").find((w) => w.readyState === 1 && (w.deserializeAttachment() || {}).id === o.to);
      if (sp) sp.send(J({ t: o.t, s: o.s }));
      return;
    }
    const other = this.open(a.role === "host" ? "guest" : "host");
    if (other) other.send(J(o));
  }

  async webSocketClose(ws) {
    const a = ws.deserializeAttachment() || {};
    if (a.role === "spec") {
      const h = this.open("host");
      if (h) {
        try {
          h.send(J({ t: "specleft", id: a.id }));
        } catch (e) {}
      }
      try {
        ws.close(1000, "bye");
      } catch (e) {}
      return;
    }
    if (a.role === "host")
      for (const sp of this.ctx.getWebSockets("spec"))
        try {
          sp.send(J({ t: "left" }));
        } catch (e) {}
    const other = this.open(a.role === "host" ? "guest" : "host");
    if (other) {
      try {
        other.send(J({ t: "left" }));
      } catch (e) {}
    }
    try {
      ws.close(1000, "bye");
    } catch (e) {}
  }

  async webSocketError(ws) {
    return this.webSocketClose(ws);
  }
}

export default {
  async fetch() {
    return new Response("not found", { status: 404 });
  },
};
