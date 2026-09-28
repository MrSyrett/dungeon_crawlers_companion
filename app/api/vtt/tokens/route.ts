import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { VTT_TOKENLIB_TOOL, ownsCampaign } from "@/lib/vtt-scenes";

export const dynamic = "force-dynamic";

// The campaign token LIBRARY — one document per campaign, owned by the GM. It is
// the reusable set of tokens shown in the Tokens tab, independent of whatever
// tokens are placed on a given scene. GM (campaign owner) only.
//
//   GET /api/vtt/tokens?campaignId=...            -> { tokens: [...] }
//   PUT /api/vtt/tokens { campaignId, tokens }    -> { ok: true }

type LibToken = { id: string; name?: string; imageUrl?: string | null; w?: number; h?: number };

// Keep the stored library bounded — token art is data-url'd into the doc. This is
// generous (a big set of medium images) but stops one enormous upload bloating it.
const LIB_CAP = 24_000_000; // ~24 MB of JSON

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const campaignId = req.nextUrl.searchParams.get("campaignId");
  if (!campaignId) return new Response("Missing campaignId", { status: 400 });
  if (!(await ownsCampaign(user.id, campaignId))) return new Response("Forbidden", { status: 403 });

  const doc = await prisma.document.findFirst({
    where: { userId: user.id, tool: VTT_TOKENLIB_TOOL, campaignId },
    select: { data: true },
  });
  const data = (doc?.data ?? {}) as { tokens?: LibToken[] };
  return Response.json({ tokens: Array.isArray(data.tokens) ? data.tokens : [] });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as
    | { campaignId?: unknown; tokens?: unknown }
    | null;
  if (!body || typeof body.campaignId !== "string") return new Response("Bad request", { status: 400 });
  if (!(await ownsCampaign(user.id, body.campaignId))) return new Response("Forbidden", { status: 403 });

  const tokens: LibToken[] = Array.isArray(body.tokens)
    ? (body.tokens as LibToken[]).filter((t) => t && typeof t.id === "string").slice(0, 500)
    : [];
  const data = { tokens };
  if (JSON.stringify(data).length > LIB_CAP) {
    return new Response("Token library too large", { status: 413 });
  }

  const existing = await prisma.document.findFirst({
    where: { userId: user.id, tool: VTT_TOKENLIB_TOOL, campaignId: body.campaignId },
    select: { id: true },
  });
  if (existing) {
    await prisma.document.update({ where: { id: existing.id }, data: { data: data as object } });
  } else {
    await prisma.document.create({
      data: { userId: user.id, tool: VTT_TOKENLIB_TOOL, campaignId: body.campaignId, title: "Token library", data: data as object },
    });
  }
  return Response.json({ ok: true });
}
