import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";
import { isCampaignMember } from "@/lib/campaign-member";

type Ctx = { params: Promise<{ id: string }> };

const clip = (v: unknown, max: number, fallback = ""): string =>
  typeof v === "string" ? v.slice(0, max) : fallback;

const notInCampaign = () =>
  Response.json({ error: "not-in-campaign", message: "You are not in this campaign." }, { status: 403 });

// Roll types the log understands. Beyond dice results (crit/fumble/normal),
// the GM screen broadcasts achievements, free-form system messages, sealed
// loot boxes and claimable found-loot drops (Treasure / Gear Drop builders);
// a player's sheet broadcasts a claim back.
const ROLL_TYPES = ["crit", "fumble", "normal", "achievement", "system", "lootbox", "foundloot", "lootclaim"];

// POST — broadcast a roll to the campaign.
// Body: { clientKey, source, label, result, detail, type }
// `detail` carries a small JSON payload for loot boxes/claims, so it's roomier.
export async function POST(req: NextRequest, ctx: Ctx) {
  // Cookie normally; a VTT token when framed by a tabletop.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return new Response("Bad request", { status: 400 });

  const campaign = await prisma.campaign.findUnique({ where: { id }, select: { id: true } });
  if (!campaign) return new Response("Not found", { status: 404 });

  // Only the table may post to the table (see lib/campaign-member.ts).
  if (!(await isCampaignMember(user.id, id))) return notInCampaign();

  const roll = await prisma.campaignRoll.create({
    data: {
      campaignId: id,
      clientKey: clip(body.clientKey, 40),
      source: clip(body.source, 60, "Player") || "Player",
      label: clip(body.label, 200, "Roll") || "Roll",
      result: clip(body.result, 40),
      detail: clip(body.detail, 2000),
      type: ROLL_TYPES.includes(body.type as string) ? (body.type as string) : "normal",
    },
    select: { id: true },
  });

  // Keep the log bounded to ~500 rolls, but don't pay for a delete on every
  // single roll — pruning roughly one write in twenty keeps it within a small
  // margin of the cap while cutting the delete traffic by ~95%.
  if (Math.random() < 0.05) {
    await prisma.campaignRoll.deleteMany({
      where: { campaignId: id, id: { lt: roll.id - 500 } },
    });
  }

  return Response.json({ ok: true, id: roll.id });
}

// GET ?since=<id> — poll rolls after a given id (ascending, max 100).
// Without ?since, returns the latest 20 (ascending) so joiners see recent history.
export async function GET(req: NextRequest, ctx: Ctx) {
  // Cookie normally; a VTT token when framed by a tabletop.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  // Only the table may read the table's log (see lib/campaign-member.ts). A
  // sheet that gets this simply tries again next poll, so a player who has
  // just linked is reading within one tick of their first save landing.
  if (!(await isCampaignMember(user.id, id))) return notInCampaign();

  const sinceRaw = req.nextUrl.searchParams.get("since");
  const since = sinceRaw !== null ? parseInt(sinceRaw, 10) : null;

  const select = {
    id: true, clientKey: true, source: true, label: true,
    result: true, detail: true, type: true,
  };

  let rolls;
  if (since !== null && !isNaN(since)) {
    rolls = await prisma.campaignRoll.findMany({
      where: { campaignId: id, id: { gt: since } },
      orderBy: { id: "asc" },
      take: 100,
      select,
    });
  } else {
    const latest = await prisma.campaignRoll.findMany({
      where: { campaignId: id },
      orderBy: { id: "desc" },
      take: 20,
      select,
    });
    rolls = latest.reverse();
  }

  const last = rolls.length ? rolls[rolls.length - 1].id : (since ?? 0);
  return Response.json({ rolls, last });
}
