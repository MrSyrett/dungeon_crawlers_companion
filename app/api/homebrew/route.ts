import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getPlayUser } from "@/lib/vtt";
import {
  visibleHomebrew,
  normalize,
  resolveShareTargets,
  setShares,
  isHbType,
  type HbType,
} from "@/lib/homebrew";

function asType(v: string | null): HbType | undefined {
  return isHbType(v) ? v : undefined;
}

// GET /api/homebrew?type=spell|gear&campaign=<id>
// Everything the current user may USE. `campaign` narrows the shared scope to a
// single campaign (what a connected sheet asks for); omit it on the pages to get
// every campaign the user is part of.
export async function GET(req: NextRequest) {
  // Cookie normally; a VTT token when framed by a tabletop.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const type = asType(req.nextUrl.searchParams.get("type"));
  const campaign = req.nextUrl.searchParams.get("campaign")?.trim() || undefined;

  const items = await visibleHomebrew(user.id, { type, campaignId: campaign });
  return Response.json({ items });
}

// POST /api/homebrew  { type, data, campaignIds?: string[] }
// Create a homebrew entry owned by the current user, optionally shared with any
// number of campaigns they're part of.
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as
    | { type?: unknown; data?: unknown; campaignIds?: unknown }
    | null;
  const type = asType(typeof body?.type === "string" ? body.type : null);
  if (!type) return new Response("Unknown homebrew type", { status: 400 });

  let normalized: { name: string; data: Record<string, unknown> };
  let campaignIds: string[];
  try {
    normalized = normalize(type, body?.data);
    campaignIds = await resolveShareTargets(user.id, body?.campaignIds);
  } catch (err) {
    return new Response(err instanceof Error ? err.message : "Bad request", { status: 400 });
  }

  // Same typing note as the PATCH route: `data` must be `object` to satisfy
  // Prisma's JSON input, and the scalar `ownerId` selects the unchecked create
  // input. Shares are written separately to keep this call trivially typed.
  const create: { ownerId: string; type: string; name: string; data: object } = {
    ownerId: user.id,
    type,
    name: normalized.name,
    data: normalized.data,
  };

  const row = await prisma.homebrew.create({ data: create });
  if (campaignIds.length) await setShares(row.id, campaignIds);

  return Response.json({
    item: {
      id: row.id,
      type,
      name: row.name,
      campaignIds,
      data: normalized.data,
      updatedAt: row.updatedAt.toISOString(),
      owner: true,
    },
  });
}
