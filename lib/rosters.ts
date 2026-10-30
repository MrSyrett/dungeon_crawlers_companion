// THE CHARACTER AND CAMPAIGN CARDS' DATA — one loader for each, shared by the
// four pages that list them:
//
//   My Characters (/my-characters, every system)  ┐ CharacterCard
//   Characters    (/dashboard, one system)        ┘
//   My Campaigns  (/my-campaigns, every system)   ┐ CampaignCard
//   Campaigns     (/campaigns, one system)        ┘
//
// The pages used to query and shape these four ways, so the same character read
// "LV 3 · Fighter" on one page and only its title on another, and a player saw
// the rest of the party on one campaign page and not on the other. Now the pages
// only choose how to GROUP the cards (by system, or one system's slice); what a
// card says and which buttons it has is decided here and in the two components.
//
// Everything returned is plain data (epoch ms, no Prisma objects), so it crosses
// the server → client boundary intact.
import { prisma } from "@/lib/prisma";
import { TOOLS, CHARACTER_TOOL_IDS, isToolId } from "@/lib/tools";
import { isSystemKey, type SystemKey } from "@/components/systemStore";
import { readCharMeta, charMetaLine } from "@/lib/char-meta";

/** Where a campaign plays: its Owlbear room when it has one (external, new
 *  tab), else our own tabletop at /play/<id>. */
export type VttLink = { href: string; external: boolean };
function vttFor(id: string, vttUrl: string | null): VttLink {
  return vttUrl ? { href: vttUrl, external: true } : { href: `/play/${id}`, external: false };
}

export type CharCardData = {
  id: string;
  tool: string;
  system: SystemKey;
  name: string;
  /** "LV 3 · Fighter · Dwarf" — whatever the system identifies a character by. */
  meta: string;
  updatedAt: number;
  campaign: { id: string; name: string; system: SystemKey } | null;
  vtt: VttLink | null;
};

/** Every character sheet the user owns, newest first, across every system. */
export async function loadCharacterCards(userId: string): Promise<CharCardData[]> {
  const docs = (await prisma.document.findMany({
    where: { userId, tool: { in: CHARACTER_TOOL_IDS } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, tool: true, data: true, updatedAt: true, linkedCampaignId: true },
  })) as { id: string; title: string; tool: string; data: unknown; updatedAt: Date; linkedCampaignId: string | null }[];

  const ids = [...new Set(docs.map((d) => d.linkedCampaignId).filter((v): v is string => !!v))];
  const camps = ids.length
    ? ((await prisma.campaign.findMany({
        where: { id: { in: ids } },
        select: { id: true, name: true, system: true, vttUrl: true },
      })) as { id: string; name: string; system: string | null; vttUrl: string | null }[])
    : [];
  const campById = new Map(camps.map((c) => [c.id, c]));

  const out: CharCardData[] = [];
  for (const d of docs) {
    if (!isToolId(d.tool)) continue;
    const system = TOOLS[d.tool].system as SystemKey;
    const meta = readCharMeta(d.data, d.title || "");
    const camp = d.linkedCampaignId ? campById.get(d.linkedCampaignId) : undefined;
    out.push({
      id: d.id,
      tool: d.tool,
      system,
      name: meta?.name || (d.title && d.title.trim() ? d.title : "Untitled character"),
      meta: charMetaLine(meta),
      updatedAt: d.updatedAt.getTime(),
      campaign: camp ? { id: camp.id, name: camp.name, system: isSystemKey(camp.system) ? camp.system : system } : null,
      vtt: camp ? vttFor(camp.id, camp.vttUrl) : null,
    });
  }
  return out;
}

export type PartyEntry = {
  /** The sheet's document id + tool — enough to open it. Only the GM is ever
   *  shown a link (docAccess lets the campaign owner open linked sheets). */
  id: string;
  tool: string;
  name: string;
  meta: string;
  /** This is one of the viewer's own characters. */
  mine: boolean;
};

export type CampCardData = {
  id: string;
  name: string;
  system: SystemKey;
  role: "gm" | "player";
  /** The join code — GM only. A player's card carries "" (they don't share it). */
  code: string;
  vttUrl: string | null;
  vtt: VttLink;
  party: PartyEntry[];
  /** The viewer's own sheet in this campaign (newest, if several), for "Sheet". */
  mySheet: { tool: string; id: string } | null;
  /** GM only: rolls still on record, for Edit's delete warning. */
  rolls: number;
  createdAt: number;
};

/** Every campaign the user runs (GM) or plays in (one of their sheets is linked
 *  to it) — the ones they run first, newest first within each. */
export async function loadCampaignCards(userId: string): Promise<CampCardData[]> {
  const [owned, myLinked] = (await Promise.all([
    prisma.campaign.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, code: true, system: true, vttUrl: true, createdAt: true },
    }),
    prisma.document.findMany({
      where: { userId, tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { not: null } },
      select: { linkedCampaignId: true },
    }),
  ])) as [
    { id: string; name: string; code: string; system: string | null; vttUrl: string | null; createdAt: Date }[],
    { linkedCampaignId: string | null }[],
  ];

  const ownedIds = new Set(owned.map((c) => c.id));
  const joinedIds = [...new Set(myLinked.map((d) => d.linkedCampaignId!).filter((id) => id && !ownedIds.has(id)))];
  const joined = joinedIds.length
    ? ((await prisma.campaign.findMany({
        where: { id: { in: joinedIds } },
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, code: true, system: true, vttUrl: true, createdAt: true },
      })) as typeof owned)
    : [];

  const allIds = [...ownedIds, ...joinedIds];
  const [partyDocs, rollStats] = await Promise.all([
    allIds.length
      ? (prisma.document.findMany({
          where: { tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { in: allIds } },
          orderBy: { updatedAt: "desc" },
          select: { id: true, title: true, tool: true, data: true, userId: true, linkedCampaignId: true },
        }) as Promise<{ id: string; title: string; tool: string; data: unknown; userId: string; linkedCampaignId: string | null }[]>)
      : Promise.resolve([]),
    ownedIds.size
      ? prisma.campaignRoll.groupBy({ by: ["campaignId"], where: { campaignId: { in: [...ownedIds] } }, _count: { _all: true } })
      : Promise.resolve([] as { campaignId: string; _count: { _all: number } }[]),
  ]);

  const partyFor = new Map<string, PartyEntry[]>();
  const mySheetFor = new Map<string, { tool: string; id: string }>();
  for (const d of partyDocs) {
    const cid = d.linkedCampaignId;
    if (!cid) continue;
    const meta = readCharMeta(d.data, d.title || "");
    const mine = d.userId === userId;
    const list = partyFor.get(cid) ?? [];
    list.push({ id: d.id, tool: d.tool, name: meta?.name || d.title || "Unnamed", meta: charMetaLine(meta), mine });
    partyFor.set(cid, list);
    if (mine && !mySheetFor.has(cid)) mySheetFor.set(cid, { tool: d.tool, id: d.id }); // newest first
  }
  // Party in a stable order — by name — so the list doesn't reshuffle every time
  // someone saves their sheet.
  for (const list of partyFor.values()) list.sort((a, b) => a.name.localeCompare(b.name));
  const rollsFor = new Map((rollStats as { campaignId: string; _count: { _all: number } }[]).map((r) => [r.campaignId, r._count._all]));

  const card = (c: (typeof owned)[number], role: "gm" | "player"): CampCardData | null => {
    // A campaign from before systems existed has nowhere to be grouped.
    if (!isSystemKey(c.system)) return null;
    return {
      id: c.id,
      name: c.name,
      system: c.system,
      role,
      code: role === "gm" ? c.code : "",
      vttUrl: c.vttUrl,
      vtt: vttFor(c.id, c.vttUrl),
      party: partyFor.get(c.id) ?? [],
      mySheet: mySheetFor.get(c.id) ?? null,
      rolls: role === "gm" ? rollsFor.get(c.id) ?? 0 : 0,
      createdAt: c.createdAt.getTime(),
    };
  };
  return [...owned.map((c) => card(c, "gm")), ...joined.map((c) => card(c, "player"))].filter(
    (c): c is CampCardData => c !== null,
  );
}

// How many chapters each of the user's adventure preps has, by document id —
// for the Adventure cards' "Chapters: N".
//
// Counted IN THE DATABASE. A prep's blob is a JSON string under its tool's key
// (data.dcc_session = "{…}") and can be megabytes of embedded maps, so pulling
// every prep's data into Node just to count an array would ship all of that on
// every dashboard load. Postgres parses the string and returns one integer.
//
// A multi-chapter prep is { chapters: [...] }; anything else — an older
// single-chapter prep, or a brand-new one with nothing saved yet — is 1.
// A blob that isn't valid JSON is skipped (pg_input_is_valid, Postgres 16+),
// and if the whole query fails for any reason the cards simply show no count.
export async function loadChapterCounts(userId: string): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  const sessionTools = (Object.keys(TOOLS) as (keyof typeof TOOLS)[]).filter((t) => TOOLS[t].kind === "session");
  for (const tool of sessionTools) {
    const key = TOOLS[tool].keys[0];
    if (!key) continue;
    try {
      const rows = await prisma.$queryRaw<{ id: string; n: number }[]>`
        SELECT id,
          CASE
            WHEN data ? ${key} AND pg_input_is_valid(data->>${key}, 'json')
             AND json_typeof((data->>${key})::json->'chapters') = 'array'
            THEN GREATEST(json_array_length((data->>${key})::json->'chapters'), 1)
            ELSE 1
          END::int AS n
        FROM "Document"
        WHERE "userId" = ${userId} AND tool = ${tool}`;
      for (const r of rows) out.set(r.id, Number(r.n) || 1);
    } catch {
      /* no counts for this tool — the card just leaves the line out */
    }
  }
  return out;
}
