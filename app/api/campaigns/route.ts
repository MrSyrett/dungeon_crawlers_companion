import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getPlayUser } from "@/lib/vtt";

// Short, unambiguous join code (no 0/O/1/I)
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode(len = 6): string {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return out;
}

// POST — create a campaign. Body: { name }. Returns { id, name, code }.
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as { name?: unknown } | null;
  const name =
    typeof body?.name === "string" && body.name.trim()
      ? body.name.trim().slice(0, 60)
      : "New Campaign";

  // Retry on the (unlikely) code collision
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const campaign = await prisma.campaign.create({
        data: { name, code: makeCode(), ownerId: user.id },
        select: { id: true, name: true, code: true },
      });
      return Response.json(campaign);
    } catch {
      // code collision — retry
    }
  }
  return new Response("Could not create campaign", { status: 500 });
}

// GET               — the current user's campaigns (for the GM-screen picker).
// GET ?code=XXXXXX   — look up a campaign to join. Returns { id, name, code }.
export async function GET(req: NextRequest) {
  const code = (req.nextUrl.searchParams.get("code") || "").trim().toUpperCase();

  // No code → list the campaigns this account owns (newest first). This is the
  // same query the /campaigns page runs, in the shape the picker expects.
  if (!code) {
    const user = await getCurrentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const campaigns = await prisma.campaign.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, code: true },
    });
    return Response.json(campaigns);
  }

  // With a code → join-by-code lookup.
  // Cookie normally; a VTT token when framed by a tabletop.
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const campaign = await prisma.campaign.findUnique({
    where: { code },
    select: { id: true, name: true, code: true },
  });
  if (!campaign) return new Response("Not found", { status: 404 });

  return Response.json(campaign);
}
