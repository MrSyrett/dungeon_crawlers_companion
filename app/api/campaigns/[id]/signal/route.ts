import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";

type Ctx = { params: Promise<{ id: string }> };

// WebRTC signaling for the GM-screen → players audio broadcast. This is the
// twin of the rolls endpoint: campaign-scoped, POST to publish, GET ?since= to
// poll ascending by id. The messages here are ephemeral SDP/ICE plumbing — a
// peer connection needs a handful and then never reads them again.
//
// Auth mirrors rolls: the session cookie for the GM, a VTT token for a player
// framed by a tabletop. Membership isn't separately enforced (a campaign id is
// an unguessable cuid, same posture as CampaignRoll); the payloads are useless
// without a live peer on the other end.

const KINDS = new Set(["hello", "offer", "answer", "ice", "bye"]);
const MAX_PAYLOAD = 24 * 1024; // an offer SDP is a few KB; give ICE bundles room

const clipKey = (v: unknown): string =>
  typeof v === "string" ? v.slice(0, 80) : "";

// POST — publish one signaling message.
// Body: { fromKey, toKey?, kind, payload? }
export async function POST(req: NextRequest, ctx: Ctx) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return new Response("Bad request", { status: 400 });

  const fromKey = clipKey(body.fromKey);
  const kind = typeof body.kind === "string" ? body.kind : "";
  if (!fromKey || !KINDS.has(kind)) return new Response("Bad request", { status: 400 });

  const toKey = body.toKey == null ? null : clipKey(body.toKey);
  const payload =
    typeof body.payload === "string" ? body.payload.slice(0, MAX_PAYLOAD) : "";

  const campaign = await prisma.campaign.findUnique({ where: { id }, select: { id: true } });
  if (!campaign) return new Response("Not found", { status: 404 });

  const msg = await prisma.signalMessage.create({
    data: { campaignId: id, fromKey, toKey, kind, payload },
    select: { id: true },
  });

  // Signaling rows die young — a connection is negotiated in seconds. Prune
  // anything older than two minutes on roughly one post in ten: enough to keep
  // the table tiny without paying for a delete on every candidate.
  if (Math.random() < 0.1) {
    await prisma.signalMessage
      .deleteMany({ where: { campaignId: id, createdAt: { lt: new Date(Date.now() - 120_000) } } })
      .catch(() => {});
  }

  return Response.json({ ok: true, id: msg.id });
}

// GET ?since=<id>&key=<myKey> — poll messages after <id> that are addressed to
// me (toKey = my key) or to everyone (toKey null), never my own. Ascending, max
// 100. `last` lets the caller advance its cursor even when nothing matched.
export async function GET(req: NextRequest, ctx: Ctx) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const sinceRaw = req.nextUrl.searchParams.get("since");
  const since = sinceRaw !== null ? parseInt(sinceRaw, 10) : 0;
  const myKey = clipKey(req.nextUrl.searchParams.get("key"));
  if (!myKey) return new Response("Bad request", { status: 400 });

  const messages = await prisma.signalMessage.findMany({
    where: {
      campaignId: id,
      id: { gt: isNaN(since) ? 0 : since },
      fromKey: { not: myKey },
      OR: [{ toKey: myKey }, { toKey: null }],
    },
    orderBy: { id: "asc" },
    take: 100,
    select: { id: true, fromKey: true, toKey: true, kind: true, payload: true },
  });

  // Advance the cursor past everything we scanned, not just what matched — the
  // max-id in the campaign — so we don't re-scan the same non-matching rows.
  let last = messages.length ? messages[messages.length - 1].id : since;
  if (!messages.length) {
    const top = await prisma.signalMessage.findFirst({
      where: { campaignId: id },
      orderBy: { id: "desc" },
      select: { id: true },
    });
    if (top && top.id > last) last = top.id;
  }

  return Response.json({ messages, last });
}
