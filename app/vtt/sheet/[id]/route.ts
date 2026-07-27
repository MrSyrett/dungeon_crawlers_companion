import { prisma } from "@/lib/prisma";
import { TOOLS, loadToolTemplate, type ToolId } from "@/lib/tools";
import { renderToolPage } from "@/lib/inject";
import { CHARACTER_TOOLS, embedHeaders, ownerForToken, tokenFromRequest } from "@/lib/vtt";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// GET /vtt/sheet/:id?t=TOKEN
// The same character sheet the app serves at /tools/:tool/:id, but authenticated
// by token so it works inside a VTT iframe where our cookie isn't sent. The
// injected shim is told about the token so autosaves keep working.
export async function GET(req: Request, ctx: Ctx) {
  const token = tokenFromRequest(req);
  const owner = await ownerForToken(token);
  if (!owner || !token) {
    return new Response("Invalid or revoked token", { status: 401, headers: embedHeaders() });
  }

  const { id } = await ctx.params;
  const doc = await prisma.document.findFirst({
    where: { id, userId: owner.id, tool: { in: CHARACTER_TOOLS } },
  });
  if (!doc) return new Response("Sheet not found", { status: 404, headers: embedHeaders() });

  const def = TOOLS[doc.tool as ToolId];
  if (!def) return new Response("Unknown tool", { status: 404, headers: embedHeaders() });

  const template = await loadToolTemplate(def.file);
  const html = renderToolPage(template, {
    docId: doc.id,
    def,
    data: doc.data,
    title: doc.title,
    vttToken: token,
  });

  return new Response(html, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
