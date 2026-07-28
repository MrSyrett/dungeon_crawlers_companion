import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";
import { LIVE_WINDOW_MS } from "@/lib/webrtc";

type Ctx = { params: Promise<{ id: string }> };

// GET — is this campaign currently broadcasting audio? Any authenticated caller
// (cookie or VTT token) may ask; the answer is just a boolean + timestamp.
export async function GET(req: NextRequest, ctx: Ctx) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    select: { audioBroadcastAt: true },
  });
  if (!campaign) return new Response("Not found", { status: 404 });

  const at = campaign.audioBroadcastAt;
  const live = !!at && Date.now() - at.getTime() < LIVE_WINDOW_MS;
  return Response.json({ live, at: at ? at.toISOString() : null });
}

// POST — the GM's liveness heartbeat. Body: { live: boolean }.
// Owner-only: only the campaign's GM sets whether it's broadcasting. `live:true`
// stamps "now" (call it on a timer while streaming); `live:false` clears it
// (call it on stop) so players see the broadcast end immediately rather than
// waiting out the window.
export async function POST(req: NextRequest, ctx: Ctx) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    select: { ownerId: true },
  });
  if (!campaign) return new Response("Not found", { status: 404 });
  if (campaign.ownerId !== user.id) return new Response("Forbidden", { status: 403 });

  const body = (await req.json().catch(() => null)) as { live?: unknown } | null;
  const live = !!body?.live;

  await prisma.campaign.update({
    where: { id },
    data: { audioBroadcastAt: live ? new Date() : null },
  });

  return Response.json({ ok: true, live });
}
