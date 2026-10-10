import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getPlayUser } from "@/lib/vtt";
import { blocked, strike, CODE_MISSES_PER_USER, TOO_MANY } from "@/lib/rate-limit";
import { makeCode } from "@/lib/campaign-code";
import { participatesInCampaign } from "@/lib/homebrew";
import { isSystemKey } from "@/components/systemStore";

// POST — create a campaign. Body: { name, system? }. Returns { id, name, code }.
//
// `system` is optional here and required on the Campaigns page, which is the only
// place that actually creates one today (nothing in the app calls this endpoint).
// Pass it anyway if you ever do: the Campaigns page shows exactly one system at a
// time, so a campaign saved without one is created and then invisible there. It
// still works everywhere that addresses a campaign by id or join code.
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as { name?: unknown; system?: unknown } | null;
  const name =
    typeof body?.name === "string" && body.name.trim()
      ? body.name.trim().slice(0, 60)
      : "New Campaign";
  const system = isSystemKey(body?.system) ? body.system : null;

  // Retry on the (unlikely) code collision
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const campaign = await prisma.campaign.create({
        data: { name, code: makeCode(), ownerId: user.id, system },
        select: { id: true, name: true, code: true },
      });
      return Response.json(campaign);
    } catch {
      // code collision — retry
    }
  }
  return new Response("Could not create campaign", { status: 500 });
}

// GET               — the current user's campaigns (for the GM-screen picker).
// GET ?code=XXXXXX   — look up a campaign to join. Returns { id, name, code }.
export async function GET(req: NextRequest) {
  const code = (req.nextUrl.searchParams.get("code") || "").trim().toUpperCase();

  // No code → list the campaigns this account owns (newest first). This is the
  // same query the /campaigns page runs, in the shape the picker expects.
  // Cookie normally; a VTT token when the GM Screen's campaign picker runs framed
  // in the Owlbear popover (read-only list of the token owner's own campaigns).
  if (!code) {
    const user = await getPlayUser(req);
    if (!user) return new Response("Unauthorized", { status: 401 });

    const campaigns = await prisma.campaign.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, code: true, vttUrl: true, system: true },
    });
    return Response.json(campaigns);
  }

  // With a code → join-by-code lookup.
  // Cookie normally; a VTT token when framed by a tabletop.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  // Join codes are short enough to be guessable with patience, so an account
  // that keeps asking for codes that don't exist is cut off for a while. Only
  // MISSES count: a sheet re-reads its own (real) code on every open, and that
  // must never be what trips this.
  const missKey = `code:user:${user.id}`;
  if (blocked(missKey, CODE_MISSES_PER_USER)) {
    return new Response(TOO_MANY, { status: 429, headers: { "retry-after": "600" } });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { code },
    select: { id: true, name: true, code: true, vttUrl: true },
  });
  if (!campaign) {
    strike(missKey);
    return new Response("Not found", { status: 404 });
  }

  // `vttUrl` goes out only to someone already IN the campaign — the GM who owns
  // it, or a player with a sheet linked to it (participatesInCampaign is the
  // same predicate the roster and shared homebrew use, so membership has one
  // definition). This endpoint doubles as the join-by-code lookup, which any
  // signed-in account can call with a code it was handed, and an Owlbear room
  // link is a capability: holding it is enough to walk into the room. So it is
  // not part of what knowing a code buys you before you join.
  //
  // A joined character sheet re-reads this to decide where its roll-log VTT
  // button points. Read live rather than saved into the sheet, so a GM who adds
  // or clears the room afterwards takes effect without anyone re-joining.
  const { vttUrl, ...publicFields } = campaign;
  const inside = await participatesInCampaign(user.id, campaign.id);
  return Response.json(inside ? { ...publicFields, vttUrl: vttUrl ?? null } : publicFields);
}
