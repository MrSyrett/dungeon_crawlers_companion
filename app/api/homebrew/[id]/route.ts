import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { normalize, resolveShareTargets, setShares, isHbType, type HbType } from "@/lib/homebrew";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/homebrew/:id  { data?, campaignIds? }
// Owner-only. Edits the entry's contents and/or the set of campaigns it's
// shared with.
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const existing = await prisma.homebrew.findFirst({
    where: { id, ownerId: user.id },
    include: { shares: { select: { campaignId: true } } },
  });
  if (!existing) return new Response("Not found", { status: 404 });

  const body = (await req.json().catch(() => null)) as
    | { data?: unknown; campaignIds?: unknown }
    | null;
  if (!body || typeof body !== "object") return new Response("Bad request", { status: 400 });

  // `data` is typed as `object` (not Record<string, unknown>) so it satisfies
  // Prisma's JSON input type — the same pattern the documents route uses.
  const update: { name?: string; data?: object } = {};
  let campaignIds: string[] | null = null;
  try {
    if (body.data !== undefined) {
      const normalized = normalize(existing.type as HbType, body.data);
      update.name = normalized.name;
      update.data = normalized.data;
    }
    if (body.campaignIds !== undefined) {
      campaignIds = await resolveShareTargets(user.id, body.campaignIds);
    }
  } catch (err) {
    return new Response(err instanceof Error ? err.message : "Bad request", { status: 400 });
  }

  const row = await prisma.homebrew.update({ where: { id }, data: update });
  if (campaignIds !== null) await setShares(id, campaignIds);

  return Response.json({
    item: {
      id: row.id,
      type: isHbType(row.type) ? row.type : "spell",
      name: row.name,
      campaignIds: campaignIds ?? existing.shares.map((s: { campaignId: string }) => s.campaignId),
      data:
        row.data && typeof row.data === "object" && !Array.isArray(row.data)
          ? (row.data as Record<string, unknown>)
          : {},
      updatedAt: row.updatedAt.toISOString(),
      owner: true,
    },
  });
}

// DELETE /api/homebrew/:id — owner-only. Shares cascade with the row.
export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  await prisma.homebrew.deleteMany({ where: { id, ownerId: user.id } });
  return Response.json({ ok: true });
}
