import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { VTT_SCENE_TOOL, ownsCampaign, stripSceneForStore } from "@/lib/vtt-scenes";

export const dynamic = "force-dynamic";

// GET /api/vtt/scenes?campaignId=... — list the GM's scenes for a campaign
// (metadata only, no blobs). GM (campaign owner) only; scenes are the GM's.
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const campaignId = req.nextUrl.searchParams.get("campaignId");
  if (!campaignId) return new Response("Missing campaignId", { status: 400 });
  if (!(await ownsCampaign(user.id, campaignId))) return new Response("Forbidden", { status: 403 });

  const scenes = await prisma.document.findMany({
    where: { userId: user.id, tool: VTT_SCENE_TOOL, campaignId },
    select: { id: true, title: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  return Response.json({ scenes });
}

// POST /api/vtt/scenes { campaignId, title, data } — create a scene. GM only.
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as
    | { campaignId?: unknown; title?: unknown; data?: unknown }
    | null;
  if (!body || typeof body.campaignId !== "string") return new Response("Bad request", { status: 400 });
  if (!(await ownsCampaign(user.id, body.campaignId))) return new Response("Forbidden", { status: 403 });

  const title = (typeof body.title === "string" ? body.title : "Scene").trim().slice(0, 120) || "Scene";
  const { data } = stripSceneForStore(body.data ?? {});

  const doc = await prisma.document.create({
    data: { userId: user.id, tool: VTT_SCENE_TOOL, campaignId: body.campaignId, title, data: data as object },
    select: { id: true, title: true, updatedAt: true },
  });
  return Response.json({ scene: doc });
}
