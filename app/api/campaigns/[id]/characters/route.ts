import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";

type Ctx = { params: Promise<{ id: string }> };

// A saved SD character sheet is stored as { sd_sheet: "<json string>" }. The
// campaign it's linked to lives in the indexed Document.linkedCampaignId column
// (kept in sync on save); we look sheets up by that column, then hand back the
// parsed sheet body to the caller.
type SheetBlob = {
  name?: unknown;
};

// GET — every character sheet linked to this campaign.
// Returns { characters: [{ docId, title, updatedAt, system, sheet }] } for both
// Shadowdark ("sd-character" → sd_sheet) and Dungeon Crawler Carl
// ("dcc-character" → dcc_sheet) sheets, so the GM Screen Party tool shows both.
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
    tool: { in: ["sd-character", "dcc-character"] },
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
  const docs = await prisma.document.findMany({
    where: memberWhere,
    select: { id: true, title: true, updatedAt: true, data: true, tool: true },
    orderBy: { updatedAt: "desc" },
  });

  const characters = [];
  for (const doc of docs) {
    const blob = doc.data as Record<string, unknown> | null;
    const isDcc = doc.tool === "dcc-character";
    const raw = isDcc ? blob?.dcc_sheet : blob?.sd_sheet;
    if (typeof raw !== "string") continue;

    let sheet: SheetBlob;
    try {
      sheet = JSON.parse(raw) as SheetBlob;
    } catch {
      continue; // malformed payload — skip rather than fail the whole request
    }

    characters.push({
      docId: doc.id,
      title: doc.title,
      updatedAt: doc.updatedAt,
      system: isDcc ? "DCC" : "SD",
      sheet,
    });
  }

  return Response.json({ characters, syncToken });
}
