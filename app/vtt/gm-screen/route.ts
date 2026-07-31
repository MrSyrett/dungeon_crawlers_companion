import { prisma } from "@/lib/prisma";
import { buildGmScreenHtml } from "@/lib/gm-screen";
import { embedHeaders, ownerForToken, tokenFromRequest } from "@/lib/vtt";

export const dynamic = "force-dynamic";

const GM_TOOL = "gm-screen";

// GET /vtt/gm-screen?t=TOKEN
// The same GM Screen the app serves at /gm-screen, but authenticated by a VTT
// token so it works framed inside the Owlbear popover, where our session cookie
// isn't sent. The injected fetch-patch attaches the token to every /api/ call
// the screen makes, so board saves, campaign rolls, sounds and rulebooks all
// keep working. embedHeaders lets the popover (same origin, 'self') frame it.
export async function GET(req: Request) {
  const token = tokenFromRequest(req);
  const owner = await ownerForToken(token);
  if (!owner || !token) {
    return new Response("Invalid or revoked token", { status: 401, headers: embedHeaders() });
  }

  // Last-used board for this token's owner — reopens the campaign they were in.
  const doc = await prisma.document.findFirst({
    where: { userId: owner.id, tool: GM_TOOL },
    orderBy: { updatedAt: "desc" },
    select: { data: true },
  });

  const html = await buildGmScreenHtml({ savedState: doc?.data ?? null, vttToken: token });

  return new Response(html, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
