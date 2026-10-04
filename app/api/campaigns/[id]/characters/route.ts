import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";
import { CHARACTER_TOOL_IDS, TOOLS, sheetKeyFor, campaignIdInSheet } from "@/lib/tools";

type Ctx = { params: Promise<{ id: string }> };

// A saved SD character sheet is stored as { sd_sheet: "<json string>" }. The
// campaign it's linked to lives in the indexed Document.linkedCampaignId column
// (kept in sync on save); we look sheets up by that column, then hand back the
// parsed sheet body to the caller.
type SheetBlob = {
  name?: unknown;
};

// A linked sheet we could not read. These used to be `continue`d over, which is
// how a party of unreadable characters showed up in the GM Screen as "No one has
// linked a character sheet yet" — a data fault reported as an empty room. Naming
// them lets the console say which sheet is broken instead of nothing at all.
type Unreadable = { docId: string; title: string; tool: string; reason: string };

// GET — every character sheet linked to this campaign.
// Returns { characters: [{ docId, title, updatedAt, system, sheet }], unreadable? }
// for every character tool (sd-character → sd_sheet, dcc-character → dcc_sheet,
// ace-character → ace_sheet), so the GM Screen Party tool shows them all.
//
// ?repair=1 additionally re-derives membership from the sheet bodies when the
// indexed column finds nobody (see below). The GM Screen's manual Sync sends it;
// the 30s auto-poll does not.
export async function GET(req: NextRequest, ctx: Ctx) {
  // Cookie normally; a VTT token when framed by a tabletop.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!campaign) return new Response("Not found", { status: 404 });

  const memberWhere = {
    tool: { in: CHARACTER_TOOL_IDS },
    linkedCampaignId: id,
  };

  // Cheap change detection for pollers. The GM Screen's party pane hits this
  // every 30s; when no linked sheet has changed there's no reason to pull and
  // parse every sheet blob just to say so. The token is count + newest
  // updatedAt — an indexed aggregate, no blobs touched. A caller that sends
  // its previous token back via ?ifUnchanged= gets a tiny { unchanged } reply
  // when the roster is identical.
  const agg = await prisma.document.aggregate({
    where: memberWhere,
    _count: { _all: true },
    _max: { updatedAt: true },
  });
  const syncToken = `${agg._count._all}:${agg._max.updatedAt?.getTime() ?? 0}`;
  const ifUnchanged = req.nextUrl.searchParams.get("ifUnchanged");
  if (ifUnchanged && ifUnchanged === syncToken) {
    return Response.json({ unchanged: true, syncToken });
  }

  // Indexed lookup: the campaign link now lives in its own column, kept in sync
  // on every save. We still parse the sheet JSON below for the sheet body the
  // caller wants, but membership is decided by the column, not a full scan.
  let docs = await prisma.document.findMany({
    where: memberWhere,
    select: { id: true, title: true, updatedAt: true, data: true, tool: true },
    orderBy: { updatedAt: "desc" },
  });

  // Self-heal a stale campaign link. linkedCampaignId is only ever written by
  // the save route, so a character whose row changed outside the app — restored
  // from a backup, edited in the DB — can hold the right campaign in its sheet
  // JSON while the column still says null, and then it is invisible to the party
  // even though its data is perfectly good. The same happened to every Candela
  // sheet until lib/tools.ts started reading both campaign shapes. So: read the
  // link out of the sheet bodies, and write the column back, so the character
  // reappears without having to be opened and re-saved by hand.
  //
  // Gated on ?repair=1 (the manual Sync button, never the 30s poll): the fallback
  // has to pull candidate blobs, which is the cost the column exists to avoid. It
  // runs even when the column already found somebody, because the writer bug this
  // repairs was per-system — a campaign could have three linked players and a
  // fourth that never linked at all, which is exactly the case that looks like
  // "some of my party is missing" rather than "my party is empty".
  let repaired = 0;
  if (req.nextUrl.searchParams.get("repair") === "1") {
    const orphans = await prisma.document.findMany({
      where: { tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: null },
      select: { id: true, title: true, updatedAt: true, data: true, tool: true },
      orderBy: { updatedAt: "desc" },
      take: 300,
    });
    const mine = orphans.filter((d) => campaignIdInSheet(d.tool, d.data) === id);
    if (mine.length) {
      await prisma.document.updateMany({
        where: { id: { in: mine.map((d) => d.id) } },
        data: { linkedCampaignId: id },
      });
      repaired = mine.length;
      const already = new Set(docs.map((d) => d.id));
      docs = docs.concat(mine.filter((d) => !already.has(d.id)));
    }
  }

  const characters = [];
  const unreadable: Unreadable[] = [];
  for (const doc of docs) {
    const key = sheetKeyFor(doc.tool);
    const blob = doc.data as Record<string, unknown> | null;
    const raw = key ? blob?.[key] : undefined;

    if (typeof raw !== "string") {
      unreadable.push({
        docId: doc.id,
        title: doc.title,
        tool: doc.tool,
        reason: !key
          ? `"${doc.tool}" is not a character tool`
          : raw === undefined
            ? `saved data holds no "${key}"`
            : `"${key}" is ${raw === null ? "null" : typeof raw}, not a JSON string`,
      });
      continue;
    }

    let sheet: SheetBlob;
    try {
      sheet = JSON.parse(raw) as SheetBlob;
    } catch {
      unreadable.push({
        docId: doc.id,
        title: doc.title,
        tool: doc.tool,
        reason: `"${key}" is not valid JSON (${raw.length} chars)`,
      });
      continue;
    }

    characters.push({
      docId: doc.id,
      title: doc.title,
      updatedAt: doc.updatedAt,
      system: TOOLS[doc.tool as keyof typeof TOOLS]?.system ?? "SD",
      sheet,
    });
  }

  return Response.json({
    characters,
    ...(unreadable.length ? { unreadable } : {}),
    ...(repaired ? { repaired } : {}),
    // A repair changed membership, so the poller's old token must not match.
    syncToken: repaired ? `${docs.length}:${Date.now()}` : syncToken,
  });
}
