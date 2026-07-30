import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, isToolId, type ToolKind } from "@/lib/tools";

// GET /api/documents               — all of the current user's documents
// GET /api/documents?kind=session  — only session-prep documents
// GET /api/documents?tool=sd-session — only that tool's documents
//
// Returns a lightweight list ({ id, title, tool, system, systemName, updatedAt })
// used by pickers like the GM Screen's "Load Session Prep" control. Payload
// bodies (`data`) are intentionally omitted — the picker only needs to know
// what exists; the content loads via the tool route when one is chosen.
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const kind = searchParams.get("kind") as ToolKind | null;
  const tool = searchParams.get("tool");

  // Resolve the set of tool ids to include.
  let tools: string[] | undefined;
  if (tool && isToolId(tool)) {
    tools = [tool];
  } else if (kind === "session" || kind === "character" || kind === "map") {
    tools = Object.values(TOOLS)
      .filter((t) => t.kind === kind)
      .map((t) => t.id);
  }

  const docs = await prisma.document.findMany({
    where: { userId: user.id, ...(tools ? { tool: { in: tools } } : {}) },
    select: { id: true, title: true, tool: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const items = docs.map((d) => {
    const def = isToolId(d.tool) ? TOOLS[d.tool] : null;
    return {
      id: d.id,
      title: d.title,
      tool: d.tool,
      system: def?.system ?? null,
      systemName: def?.systemName ?? null,
      updatedAt: d.updatedAt,
    };
  });

  return Response.json(items);
}
