import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

// Autosave from the injected tool shim, plus title edits.
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as
    | { data?: unknown; title?: unknown }
    | null;
  if (!body || typeof body !== "object") {
    return new Response("Bad request", { status: 400 });
  }

  // Select only what the checks below read — without the select this pulled the
  // document's entire `data` blob (potentially MBs) out of the DB on every
  // autosave just to verify ownership.
  const existing = await prisma.document.findFirst({
    where: { id, userId: user.id },
    select: { id: true, tool: true, title: true },
  });
  if (!existing) return new Response("Not found", { status: 404 });

  const update: { data?: object; title?: string; linkedCampaignId?: string | null } = {};
  if (body.data !== undefined) update.data = body.data as object;
  if (typeof body.title === "string") update.title = body.title.slice(0, 120);

  // Auto-title documents from their contents (character name / adventure title)
  // so the dashboard stays in sync without manual renames.
  if (update.data && update.title === undefined) {
    const name = extractDocTitle(existing.tool, update.data);
    if (name && name !== existing.title) update.title = name.slice(0, 120);
  }

  // Keep the indexed campaign link in sync with the sheet's own record of it
  // (SD: data.sd_sheet → _sheet.campaign.id; DCC: data.dcc_sheet → campaign.id).
  // Both character systems carry this; for anything else it stays null. Writing
  // it here means the column tracks every save without the client shim needing to
  // know about it. We only store an id that still points at a live campaign — a
  // sheet can hold a stale link in its JSON (e.g. the campaign was since deleted),
  // and writing that would trip the foreign key, so an orphaned reference is null.
  if (update.data && (existing.tool === "sd-character" || existing.tool === "dcc-character")) {
    update.linkedCampaignId = await liveCampaignId(extractLinkedCampaignId(update.data));
  }

  await prisma.document.update({ where: { id }, data: update });
  return Response.json({ ok: true });
}

// Narrows an extracted campaign id to one that still exists, so we never try to
// write a foreign key pointing at a deleted campaign. Returns null otherwise.
async function liveCampaignId(id: string | null): Promise<string | null> {
  if (!id) return null;
  const exists = await prisma.campaign.count({ where: { id } });
  return exists > 0 ? id : null;
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  await prisma.document.deleteMany({ where: { id, userId: user.id } });
  return Response.json({ ok: true });
}

// Pulls a display title out of a saved payload.
//   SD sheets    { sd_sheet:  "<json>" } → top-level `name`
//   DCC sheets   { dcc_sheet: "<json>" } → `header['f-name']`
//   Prep builders{ sd_session | dcc_session: "<json>" } → top-level `title`
function extractDocTitle(tool: string, data: object): string | null {
  try {
    const blob = data as Record<string, unknown>;

    if (tool === "sd-character" && typeof blob.sd_sheet === "string") {
      const sheet = JSON.parse(blob.sd_sheet) as { name?: unknown };
      if (typeof sheet.name === "string" && sheet.name.trim()) return sheet.name.trim();
    }
    if (tool === "dcc-character" && typeof blob.dcc_sheet === "string") {
      const sheet = JSON.parse(blob.dcc_sheet) as { header?: Record<string, unknown> };
      const name = sheet.header?.["f-name"];
      if (typeof name === "string" && name.trim()) return name.trim();
    }

    const sessionKey = tool === "sd-session" ? "sd_session" : tool === "dcc-session" ? "dcc_session" : null;
    if (sessionKey && typeof blob[sessionKey] === "string") {
      const prep = JSON.parse(blob[sessionKey] as string) as { title?: unknown };
      if (typeof prep.title === "string" && prep.title.trim()) return prep.title.trim();
    }
  } catch {
    // Malformed payloads simply keep the existing title
  }
  return null;
}

// Pulls the linked campaign id out of a saved SD character payload:
//   { sd_sheet: "<json>" } → _sheet.campaign.id
// Returns null when there's no valid link, which also clears the column if a
// player disconnects their sheet from a campaign.
function extractLinkedCampaignId(data: object): string | null {
  try {
    const blob = data as Record<string, unknown>;
    // SD sheet: campaign lives under _sheet.campaign.id
    if (typeof blob.sd_sheet === "string") {
      const sheet = JSON.parse(blob.sd_sheet) as {
        _sheet?: { campaign?: { id?: unknown } | null } | null;
      };
      const id = sheet?._sheet?.campaign?.id;
      return typeof id === "string" && id ? id : null;
    }
    // DCC sheet: campaign lives at the top level (campaign.id)
    if (typeof blob.dcc_sheet === "string") {
      const sheet = JSON.parse(blob.dcc_sheet) as {
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
