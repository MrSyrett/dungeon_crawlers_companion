import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { boardRole } from "@/lib/vtt-scenes";

export const dynamic = "force-dynamic";

// ── WebRTC signaling relay (in-memory, ephemeral) ────────────────────────────
// The board is peer-to-peer: this endpoint only carries the tiny handshake
// (offer / answer / ICE candidates) that lets two browsers open a direct
// connection. After that, all real traffic (map, tokens, fog) goes browser-to-
// browser and never touches the server.
//
// Deliberately in-memory: signaling messages live seconds and are worthless
// after the peer connection is up, so there's no reason to add a DB table (and
// a migration) for them. This assumes the app runs as a single long-lived
// process (it does on Railway `next start`); if it's ever scaled to multiple
// instances, this becomes a small Redis/Postgres queue with the same contract.
//
// Contract:
//   POST /api/vtt/signal/:campaignId   body { from, to, kind, payload }
//   GET  /api/vtt/signal/:campaignId?me=<peerId>&since=<seq>
//        -> { messages: [{ seq, from, to, kind, payload }], last }
// `to === "*"` broadcasts to everyone but the sender.

type SignalMsg = { seq: number; from: string; to: string; kind: string; payload: unknown; ts: number };
type Room = { seq: number; msgs: SignalMsg[] };

// Survives across requests within one server process (module scope).
const g = globalThis as unknown as { __vttSignal?: Map<string, Room> };
const rooms: Map<string, Room> = g.__vttSignal ?? (g.__vttSignal = new Map());

const TTL_MS = 60_000;
const MAX_PER_ROOM = 500;

function room(id: string): Room {
  let r = rooms.get(id);
  if (!r) { r = { seq: 0, msgs: [] }; rooms.set(id, r); }
  return r;
}
function prune(r: Room) {
  const cutoff = Date.now() - TTL_MS;
  if (r.msgs.length > MAX_PER_ROOM || (r.msgs[0] && r.msgs[0].ts < cutoff)) {
    r.msgs = r.msgs.filter((m) => m.ts >= cutoff).slice(-MAX_PER_ROOM);
  }
}

async function allowed(campaignId: string) {
  const user = await getCurrentUser();
  if (!user) return null;
  const role = await boardRole(user.id, campaignId);
  return role ? { user, role } : null;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await ctx.params;
  if (!(await allowed(campaignId))) return new Response("Forbidden", { status: 403 });

  const body = (await req.json().catch(() => null)) as
    | { from?: unknown; to?: unknown; kind?: unknown; payload?: unknown }
    | null;
  if (!body || typeof body.from !== "string" || typeof body.to !== "string" || typeof body.kind !== "string") {
    return new Response("Bad request", { status: 400 });
  }
  const r = room(campaignId);
  r.seq += 1;
  r.msgs.push({ seq: r.seq, from: body.from, to: body.to, kind: body.kind, payload: body.payload ?? null, ts: Date.now() });
  prune(r);
  return Response.json({ ok: true, seq: r.seq });
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await ctx.params;
  if (!(await allowed(campaignId))) return new Response("Forbidden", { status: 403 });

  const me = req.nextUrl.searchParams.get("me") || "";
  const since = parseInt(req.nextUrl.searchParams.get("since") || "0", 10) || 0;
  const r = room(campaignId);
  prune(r);
  const messages = r.msgs.filter(
    (m) => m.seq > since && m.from !== me && (m.to === me || m.to === "*"),
  );
  return Response.json({ messages, last: r.seq });
}
