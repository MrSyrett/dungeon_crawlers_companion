import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { VTT_SCENE_TOOL, stripSceneForStore } from "@/lib/vtt-scenes";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/vtt/scenes/:id — one scene WITH its data blob. GM (owner) only.
export async function GET(_req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const doc = await prisma.document.findFirst({
    where: { id, userId: user.id, tool: VTT_SCENE_TOOL },
    select: { id: true, title: true, updatedAt: true, data: true, campaignId: true },
  });
  if (!doc) return new Response("Not found", { status: 404 });
  return Response.json(doc);
}

// PATCH /api/vtt/scenes/:id { title?, data? } — save a scene. GM (owner) only.
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  const existing = await prisma.document.findFirst({
    where: { id, userId: user.id, tool: VTT_SCENE_TOOL },
    select: { id: true },
  });
  if (!existing) return new Response("Not found", { status: 404 });

  const body = (await req.json().catch(() => null)) as { title?: unknown; data?: unknown } | null;
  if (!body || typeof body !== "object") return new Response("Bad request", { status: 400 });

  const update: { title?: string; data?: object } = {};
  if (typeof body.title === "string" && body.title.trim()) update.title = body.title.trim().slice(0, 120);
  if (body.data !== undefined) update.data = stripSceneForStore(body.data).data;
  if (!Object.keys(update).length) return Response.json({ ok: true });

  await prisma.document.update({ where: { id }, data: update });
  return Response.json({ ok: true });
}

// DELETE /api/vtt/scenes/:id — GM (owner) only.
export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await ctx.params;
  await prisma.document.deleteMany({ where: { id, userId: user.id, tool: VTT_SCENE_TOOL } });
  return Response.json({ ok: true });
}
