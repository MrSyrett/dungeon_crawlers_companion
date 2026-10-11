import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHiddenSystemKeys } from "@/lib/systems";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";
import { isSystemKey, type SystemKey } from "@/components/systemStore";
import { readSystemCookie } from "@/lib/system-cookie";
import { readCharMeta } from "@/lib/char-meta";
import CampaignsList, {
  type CampaignRow,
  type CampaignsBySystem,
  type JoinedRow,
} from "@/components/CampaignsList";

export const dynamic = "force-dynamic";

// Campaigns, one system at a time.
//
// This page used to render every campaign itself, with a per-campaign system
// dropdown. It now does what the dashboard and the Rulebooks shelf already do:
// the server reads EVERY system's campaigns once, shapes them into compact plain
// rows grouped by system, and hands them to a client component that renders the
// one system the shared store is on. Switching system is instant and re-queries
// nothing, and the page wears that system's theme because /campaigns is no longer
// in SiteNav's CHROME_PREFIXES.
//
// A campaign's system is chosen once, at creation, from whichever system you are
// in (see createCampaign in @/app/actions/campaigns) and cannot be changed after.

// {id, name, class, level} for one linked character sheet (readCharMeta lives in
// lib/char-meta.ts — shared with the home-screen roster).
type PartyMember = { id: string; name: string; cls: string; level: number | null };

export default async function CampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [campaigns, hiddenSystems] = await Promise.all([
    prisma.campaign.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, code: true, createdAt: true, vttUrl: true, system: true },
    }),
    getHiddenSystemKeys(),
  ]);

  const ids = campaigns.map((c) => c.id);

  // These three reads don't depend on one another — run them concurrently so the
  // page waits for one round-trip, not three in series:
  //  • rollStats  — roll activity per campaign (one grouped query; the log is
  //    pruned to ~500 rolls each, so it's "rolls still on record", not lifetime).
  //  • partyDocs  — every character sheet linked to one of these campaigns, in a
  //    SINGLE query (was an N+1: one findMany per campaign). linkedCampaignId is
  //    indexed, so this is an index scan; we group the rows in JS below.
  //  • myDocs     — the user's own linked sheets, for the "joined" section.
  // An empty `in: []` simply matches nothing, so these are safe to run even when
  // the user owns no campaigns — no need to branch on ids.length.
  const [rollStats, partyDocs, myDocs] = await Promise.all([
    prisma.campaignRoll.groupBy({
      by: ["campaignId"],
      where: { campaignId: { in: ids } },
      _count: { _all: true },
      _max: { createdAt: true },
    }),
    prisma.document.findMany({
      where: { tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { in: ids } },
      select: { id: true, title: true, data: true, linkedCampaignId: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.document.findMany({
      where: {
        userId: user.id,
        tool: { in: CHARACTER_TOOL_IDS },
        linkedCampaignId: { not: null },
      },
      select: { id: true, title: true, data: true, linkedCampaignId: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const statFor = new Map(
    rollStats.map((r) => [r.campaignId, { rolls: r._count._all, last: r._max.createdAt }]),
  );

  // Group the linked sheets into each campaign's party (preserving updatedAt-desc
  // order from the query). We still parse the sheet JSON for name / class / level.
  const partyFor = new Map<string, PartyMember[]>();
  for (const id of ids) partyFor.set(id, []);
  for (const doc of partyDocs) {
    const cid = doc.linkedCampaignId;
    if (typeof cid !== "string" || !partyFor.has(cid)) continue;
    const meta = readCharMeta(doc.data, doc.title || "");
    if (!meta) continue; // no readable character sheet — skip
    partyFor.get(cid)!.push({ id: doc.id, name: meta.name, cls: meta.cls, level: meta.level });
  }

  // ── Campaigns the player has JOINED (a character is linked) but does not own ──
  // Membership is recorded inside each of the user's own sheets as
  // _sheet.campaign.id — now mirrored to the indexed linkedCampaignId column.
  // We gather those ids from the column, drop any this user owns, and show the
  // rest read-only. The sheet JSON is still parsed for the character name.
  const ownedIds = new Set(campaigns.map((c) => c.id));

  const joinedChars = new Map<string, string[]>(); // campaignId -> character names
  for (const doc of myDocs) {
    const cid = doc.linkedCampaignId;
    if (typeof cid !== "string" || !cid || ownedIds.has(cid)) continue;
    const meta = readCharMeta(doc.data, doc.title || "");
    const name = meta ? meta.name : doc.title || "Unnamed";
    const list = joinedChars.get(cid) ?? [];
    list.push(name);
    joinedChars.set(cid, list);
  }

  const joinedIds = [...joinedChars.keys()];
  const joinedCampaigns = joinedIds.length
    ? await prisma.campaign.findMany({
        where: { id: { in: joinedIds } },
        orderBy: { name: "asc" },
        // `system` is selected now: a joined campaign has to land in its own
        // system's group, the same as one you own.
        select: { id: true, name: true, code: true, system: true },
      })
    : [];

  // ── Group both lists by system ─────────────────────────────────────────────
  // Each system's bucket is created on demand, so a system with no campaigns is
  // simply absent and the client renders its empty state. A campaign whose system
  // is not a SystemKey (null, or a key retired since it was saved) has no bucket
  // to go in and is skipped — createCampaign refuses to make one, so this only
  // ever applies to rows that predate it.
  const bySystem: CampaignsBySystem = {};
  const bucket = (key: SystemKey) => {
    const existing = bySystem[key];
    if (existing) return existing;
    const fresh = { owned: [] as CampaignRow[], joined: [] as JoinedRow[] };
    bySystem[key] = fresh;
    return fresh;
  };

  for (const c of campaigns) {
    if (!isSystemKey(c.system)) continue;
    const stat = statFor.get(c.id);
    bucket(c.system).owned.push({
      id: c.id,
      name: c.name,
      code: c.code,
      createdAt: c.createdAt.getTime(),
      vttUrl: c.vttUrl,
      system: c.system,
      rolls: stat?.rolls ?? 0,
      lastRoll: stat?.last ? stat.last.getTime() : null,
      party: partyFor.get(c.id) ?? [],
    });
  }

  for (const c of joinedCampaigns) {
    if (!isSystemKey(c.system)) continue;
    bucket(c.system).joined.push({
      id: c.id,
      name: c.name,
      code: c.code,
      chars: joinedChars.get(c.id) ?? [],
    });
  }

  return <CampaignsList bySystem={bySystem} hiddenKeys={hiddenSystems as SystemKey[]} initialSystem={await readSystemCookie()} />;
}
