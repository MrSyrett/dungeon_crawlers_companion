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

  const existing = await prisma.document.findFirst({ where: { id, userId: user.id } });
  if (!existing) return new Response("Not found", { status: 404 });

  const update: { data?: object; title?: string } = {};
  if (body.data !== undefined) update.data = body.data as object;
  if (typeof body.title === "string") update.title = body.title.slice(0, 120);

  // Auto-title documents from their contents (character name / adventure title)
  // so the dashboard stays in sync without manual renames.
  if (update.data && update.title === undefined) {
    const name = extractDocTitle(existing.tool, update.data);
    if (name && name !== existing.title) update.title = name.slice(0, 120);
  }

  await prisma.document.update({ where: { id }, data: update });
  return Response.json({ ok: true });
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
