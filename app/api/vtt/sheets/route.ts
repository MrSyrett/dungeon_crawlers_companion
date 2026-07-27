import { prisma } from "@/lib/prisma";
import { TOOLS } from "@/lib/tools";
import { CHARACTER_TOOLS, ownerForToken, tokenFromRequest } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /api/vtt/sheets — the token owner's character sheets, newest first.
// Session prep, campaigns and homebrew are deliberately not reachable here.
export async function GET(req: Request) {
  const owner = await ownerForToken(tokenFromRequest(req));
  if (!owner) return new Response("Invalid or revoked token", { status: 401 });

  const docs = await prisma.document.findMany({
    where: { userId: owner.id, tool: { in: CHARACTER_TOOLS } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, tool: true, updatedAt: true },
  });

  return Response.json(
    {
      account: owner.email,
      sheets: docs.map((d: { id: string; title: string; tool: string; updatedAt: Date }) => ({
        id: d.id,
        title: d.title,
        tool: d.tool,
        system: TOOLS[d.tool as keyof typeof TOOLS]?.system ?? "",
        updatedAt: d.updatedAt.toISOString(),
      })),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
