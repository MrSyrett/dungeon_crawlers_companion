import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlayUser } from "@/lib/vtt";

type Ctx = { params: Promise<{ id: string }> };

// A saved SD character sheet is stored as { sd_sheet: "<json string>" }. The
// sheet records the campaign it is linked to at _sheet.campaign.{id,code,name},
// which is how we find the party for a campaign.
type SheetBlob = {
  name?: unknown;
  _sheet?: { campaign?: { id?: unknown } | null } | null;
};

// GET — every character sheet linked to this campaign.
// Returns { characters: [{ docId, title, updatedAt, sheet }] }.
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

  // Cheap DB-side prefilter: the campaign id appears verbatim in the stored
  // sheet JSON. The parse below is what actually decides membership.
  const docs = await prisma.document.findMany({
    where: {
      tool: "sd-character",
      data: { path: ["sd_sheet"], string_contains: id },
    },
    select: { id: true, title: true, updatedAt: true, data: true },
    orderBy: { updatedAt: "desc" },
  });

  const characters = [];
  for (const doc of docs) {
    const blob = doc.data as Record<string, unknown> | null;
    const raw = blob?.sd_sheet;
    if (typeof raw !== "string") continue;

    let sheet: SheetBlob;
    try {
      sheet = JSON.parse(raw) as SheetBlob;
    } catch {
      continue; // malformed payload — skip rather than fail the whole request
    }

    if (sheet?._sheet?.campaign?.id !== id) continue;

    characters.push({
      docId: doc.id,
      title: doc.title,
      updatedAt: doc.updatedAt,
      sheet,
    });
  }

  return Response.json({ characters });
}
