import { prisma } from "@/lib/prisma";
import { CHARACTER_TOOLS, ownerForToken, tokenFromRequest } from "@/lib/vtt";

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
    select: { id: true },
  });
  if (!doc) return new Response("Not found", { status: 404 });

  const body = (await req.json().catch(() => null)) as
    | { data?: unknown; title?: unknown }
    | null;
  if (!body || typeof body !== "object") return new Response("Bad request", { status: 400 });

  // `data` is typed as `object` to satisfy Prisma's JSON input.
  const update: { data?: object; title?: string } = {};
  if (body.data !== undefined) update.data = body.data as object;
  if (typeof body.title === "string" && body.title.trim()) {
    update.title = body.title.trim().slice(0, 120);
  }
  if (!Object.keys(update).length) return Response.json({ ok: true });

  await prisma.document.update({ where: { id }, data: update });
  return Response.json({ ok: true });
}
