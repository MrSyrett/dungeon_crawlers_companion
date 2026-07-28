import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";
import { LIVE_WINDOW_MS } from "@/lib/webrtc";

// GET /api/vtt/audio — discovery for a player's extension: which campaigns is
// this player part of, and is any of them broadcasting audio right now?
//
// "Part of" means either they own the campaign (they're the GM) or they have a
// character sheet linked to it. The extension polls this so a live broadcast
// surfaces on its own as a "Join audio" prompt — no code to type, matching the
// campaign-auto pairing the feature was scoped around.
//
// Cookie or VTT token, same as the sheets endpoint.
export async function GET(req: NextRequest) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const [owned, linked] = await Promise.all([
    prisma.campaign.findMany({
      where: { ownerId: user.id },
      select: { id: true, name: true, audioBroadcastAt: true },
    }),
    prisma.document.findMany({
      where: { userId: user.id, linkedCampaignId: { not: null } },
      select: {
        linkedCampaign: { select: { id: true, name: true, audioBroadcastAt: true } },
      },
    }),
  ]);

  // Merge unique by campaign id (a GM who also has a linked sheet shouldn't see
  // the campaign twice).
  const byId = new Map<string, { id: string; name: string; audioBroadcastAt: Date | null }>();
  for (const c of owned) byId.set(c.id, c);
  for (const d of linked) {
    const c = d.linkedCampaign;
    if (c && !byId.has(c.id)) byId.set(c.id, c);
  }

  const now = Date.now();
  const campaigns = Array.from(byId.values()).map((c) => ({
    id: c.id,
    name: c.name,
    live: !!c.audioBroadcastAt && now - c.audioBroadcastAt.getTime() < LIVE_WINDOW_MS,
  }));

  // Live first, then by name, so the thing a player can act on sits at the top.
  campaigns.sort((a, b) => Number(b.live) - Number(a.live) || a.name.localeCompare(b.name));

  return Response.json({ campaigns });
}
