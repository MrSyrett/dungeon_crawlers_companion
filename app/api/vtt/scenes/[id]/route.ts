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

  if (body.data !== undefined) {
    let incoming = body.data;
    // A lightweight autosave (tokens/walls/doors/fog) omits the UNCHANGED embedded
    // map image and sets map.keepSrc, so the GM's tab never re-serializes/uploads
    // the multi-MB picture on every edit. Splice the stored image back in here, or
    // saving just the tokens would blank the map. Reading the blob is now the only
    // place that touches it, and only on these keep-image saves.
    const map =
      incoming && typeof incoming === "object"
        ? (incoming as { map?: { keepSrc?: unknown; src?: unknown; srcType?: unknown } }).map
        : undefined;
    if (map && map.keepSrc) {
      const prev = await prisma.document.findFirst({
        where: { id, userId: user.id, tool: VTT_SCENE_TOOL },
        select: { data: true },
      });
      const prevMap = (prev?.data as { map?: { src?: unknown; srcType?: unknown } } | null)?.map;
      const mergedMap = { ...map } as { keepSrc?: unknown; src?: unknown; srcType?: unknown };
      delete mergedMap.keepSrc;
      mergedMap.src = (prevMap?.src as string | null | undefined) ?? null;
      if (prevMap && prevMap.srcType != null) mergedMap.srcType = prevMap.srcType;
      incoming = { ...(incoming as object), map: mergedMap };
    }
    update.data = stripSceneForStore(incoming).data;
  }

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
