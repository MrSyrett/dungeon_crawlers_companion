import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GM_TOOL = "gm-screen";
const NONE = "__none__"; // ?campaignId= sentinel for the personal (unlinked) board

// Resolve ?campaignId= into a where-filter value:
//   param absent      → undefined  (caller: use the last-used board)
//   "__none__" or ""  → null       (the personal / unlinked board)
//   a real id         → that id
function parseCampaignId(req: NextRequest): string | null | undefined {
  if (!req.nextUrl.searchParams.has("campaignId")) return undefined;
  const raw = (req.nextUrl.searchParams.get("campaignId") || "").trim();
  return raw && raw !== NONE ? raw : null;
}

// A board blob is self-describing: which campaign it belongs to is read from the
// campaign link the GM screen already serializes into it.
function campaignIdOf(body: unknown): string | null {
  // The GM screen serializes its link as { campaign: {id,...}, hideRolls }, so in
  // a full board the id sits at body.campaign.campaign.id. Accept that nested
  // shape first, then fall back to a bare { id } for safety.
  const camp = (body as { campaign?: { id?: unknown; campaign?: { id?: unknown } } } | null)?.campaign;
  const id = camp?.campaign?.id ?? camp?.id;
  return typeof id === "string" && id ? id : null;
}

// Server-side safety net: never let an oversized file blob reach the DB. Small
// files (maps, images, short PDFs) pass through; large ones become a placeholder
// the sheet shows as "reload manually".
const MAX_FILE_LEN = 5 * 1024 * 1024;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stripBigFiles(body: any): any {
  if (body?.tools) {
    for (const key of Object.keys(body.tools)) {
      const fd = body.tools[key]?.fileData;
      if (fd && typeof fd === "string" && fd.length > MAX_FILE_LEN) {
        body.tools[key] = { ...body.tools[key], fileData: null, fileTooLarge: body.tools[key].fileName };
      }
    }
  }
  return body;
}

// GET                      → the last-used board (most recently updated). Used on open.
// GET ?campaignId=<cuid>   → that campaign's board.
// GET ?campaignId=__none__ → the personal (unlinked) board.
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const campaignId = parseCampaignId(req);

  const doc =
    campaignId === undefined
      ? await prisma.document.findFirst({
          where: { userId: user.id, tool: GM_TOOL },
          orderBy: { updatedAt: "desc" },
          select: { data: true },
        })
      : await prisma.document.findFirst({
          where: { userId: user.id, tool: GM_TOOL, campaignId },
          select: { data: true },
        });

  return Response.json(doc?.data ?? {});
}

// PATCH — save the board. The (userId, campaignId) key comes from the blob's own
// campaign link, so an autosave while linked to campaign A writes A's row, and
// the pre-switch save (fired while still on A) also lands on A — not the new one.
export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = stripBigFiles(await req.json());
  const campaignId = campaignIdOf(body);

  const existing = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL, campaignId },
    select: { id: true },
  });

  if (existing) {
    await prisma.document.update({ where: { id: existing.id }, data: { data: body } });
  } else {
    await prisma.document.create({
      data: { userId: user.id, tool: GM_TOOL, campaignId, title: "GM Screen", data: body },
    });
  }

  return Response.json({ ok: true });
}

// POST — mark a campaign as the one to open next (used right before a
// switch-and-reload). Bumps that campaign's board to most-recently-used WITHOUT
// clobbering it; if none exists yet, creates an empty board carrying just the
// link, so the reload opens connected to it rather than blank/unlinked.
// Body: { campaign: { id, code, name } | null }.
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = (await req.json().catch(() => null)) as { campaign?: { id?: unknown } } | null;
  const campaign = body?.campaign && body.campaign.id ? body.campaign : null;
  const campaignId: string | null = campaign ? String(campaign.id) : null;

  const existing = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL, campaignId },
    select: { id: true, data: true },
  });

  if (existing) {
    // Re-write the same data so @updatedAt bumps — this becomes the last-used board.
    await prisma.document.update({
      where: { id: existing.id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { data: (existing.data ?? {}) as any },
    });
  } else {
    await prisma.document.create({
      data: {
        userId: user.id,
        tool: GM_TOOL,
        campaignId,
        title: "GM Screen",
        // Match the GM screen's serialize shape ({ campaign: {...}, hideRolls })
        // so restore() picks up the link and activates the campaign on reload.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: (campaign ? { version: 1, campaign: { campaign } } : { version: 1 }) as any,
      },
    });
  }

  return Response.json({ ok: true });
}

// DELETE — clear ALL saved GM Screen boards for this user (emergency reset).
export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  await prisma.document.deleteMany({ where: { userId: user.id, tool: GM_TOOL } });
  return Response.json({ ok: true });
}
