import { prisma } from "@/lib/prisma";
import { CHARACTER_TOOLS, ownerForToken, tokenFromRequest } from "@/lib/vtt";
import { CHARACTER_TOOL_IDS, isToolId } from "@/lib/tools";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/vtt/documents/:id — the save path used by a sheet framed in a VTT.
// Mirrors /api/documents/:id but authenticates with a token instead of the
// session cookie, and will only ever write to a character sheet.
export async function PATCH(req: Request, ctx: Ctx) {
  const owner = await ownerForToken(tokenFromRequest(req));
  if (!owner) return new Response("Invalid or revoked token", { status: 401 });

  const { id } = await ctx.params;
  const doc = await prisma.document.findFirst({
    where: { id, userId: owner.id, tool: { in: CHARACTER_TOOLS } },
    select: { id: true, tool: true },
  });
  if (!doc) return new Response("Not found", { status: 404 });

  const body = (await req.json().catch(() => null)) as
    | { data?: unknown; title?: unknown }
    | null;
  if (!body || typeof body !== "object") return new Response("Bad request", { status: 400 });

  // `data` is typed as `object` to satisfy Prisma's JSON input.
  const update: { data?: object; title?: string; linkedCampaignId?: string | null } = {};
  if (body.data !== undefined) update.data = body.data as object;
  if (typeof body.title === "string" && body.title.trim()) {
    update.title = body.title.trim().slice(0, 120);
  }
  // Keep the indexed campaign link in sync on the VTT save path too (every
  // character sheet tool carries one; see /api/documents/[id]).
  // Only a still-live campaign id is stored, so a stale link left in the sheet
  // JSON (its campaign was deleted) can't trip the foreign key — it becomes null.
  if (update.data && isToolId(doc.tool) && CHARACTER_TOOL_IDS.includes(doc.tool)) {
    update.linkedCampaignId = await liveCampaignId(extractLinkedCampaignId(update.data));
  }
  if (!Object.keys(update).length) return Response.json({ ok: true });

  await prisma.document.update({ where: { id }, data: update });
  return Response.json({ ok: true });
}

// Narrows an extracted campaign id to one that still exists, so we never write a
// foreign key pointing at a deleted campaign. Returns null otherwise.
async function liveCampaignId(id: string | null): Promise<string | null> {
  if (!id) return null;
  const exists = await prisma.campaign.count({ where: { id } });
  return exists > 0 ? id : null;
}

// Pulls the linked campaign id out of a saved SD character payload:
//   { sd_sheet: "<json>" } → _sheet.campaign.id
// Returns null when there's no valid link (also clears the column on unlink).
function extractLinkedCampaignId(data: object): string | null {
  try {
    const blob = data as Record<string, unknown>;
    if (typeof blob.sd_sheet === "string") {
      const sheet = JSON.parse(blob.sd_sheet) as {
        _sheet?: { campaign?: { id?: unknown } | null } | null;
      };
      const id = sheet?._sheet?.campaign?.id;
      return typeof id === "string" && id ? id : null;
    }
    // DCC, ACE, KoB, Nimble, SW and D&D sheets: campaign lives at the top level (campaign.id)
    for (const key of ["dcc_sheet", "ace_sheet", "kob_sheet", "nimble_sheet", "sw_sheet", "dnd_sheet"]) {
      if (typeof blob[key] !== "string") continue;
      const sheet = JSON.parse(blob[key] as string) as {
        campaign?: { id?: unknown } | null;
      };
      const id = sheet?.campaign?.id;
      return typeof id === "string" && id ? id : null;
    }
    return null;
  } catch {
    return null;
  }
}
