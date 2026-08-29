import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";

type Ctx = { params: Promise<{ id: string }> };

const clip = (v: unknown, max: number, fallback = ""): string =>
  typeof v === "string" ? v.slice(0, max) : fallback;

// Roll types the log understands. Beyond dice results (crit/fumble/normal),
// the GM's "Message" console broadcasts achievements, free-form system messages,
// DCC loot boxes, and Shadowdark "found loot" drops; a player's sheet broadcasts
// a claim back (a whole DCC box, or a single item from a found-loot drop).
const ROLL_TYPES = ["crit", "fumble", "normal", "achievement", "system", "lootbox", "lootclaim", "foundloot"];

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
