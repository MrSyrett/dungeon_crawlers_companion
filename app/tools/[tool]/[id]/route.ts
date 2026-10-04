import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isToolId, TOOLS, loadToolTemplate } from "@/lib/tools";
import { renderToolPage } from "@/lib/inject";

type Ctx = { params: Promise<{ tool: string; id: string }> };

export async function GET(req: Request, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { tool, id } = await ctx.params;
  if (!isToolId(tool)) return new Response("Unknown tool", { status: 404 });
  const def = TOOLS[tool];

  const doc = await prisma.document.findFirst({ where: { id, userId: user.id, tool } });
  if (!doc) return new Response("Document not found", { status: 404 });

  // ?view=preview serves a read-only, preview-only rendering: the editing
  // sidebar and floating chrome are hidden, leaving just the rendered pages.
  // Used when another surface (e.g. the GM Screen's Adventure pane) embeds a
  // saved session-prep document in an iframe.
  const previewOnly = new URL(req.url).searchParams.get("view") === "preview";
  // ?embed=1 — framed by our first-party VTT sheet popup: keep the sheet fully
  // editable but hide the floating Home chrome (the popup provides its own).
  const embed = new URL(req.url).searchParams.get("embed") === "1";

  // Context links for the mini-bar menu: where this document's campaign plays.
  // A sheet used to be a dead end (its only exit was Home); now its campaign,
  // the Tabletop and any Owlbear room are one tap away.
  const context: { label: string; href: string; external?: boolean }[] = [];
  if (doc.linkedCampaignId && !previewOnly && !embed) {
    const camp = await prisma.campaign
      .findUnique({ where: { id: doc.linkedCampaignId }, select: { id: true, name: true, vttUrl: true } })
      .catch(() => null);
    if (camp) {
      context.push({ label: `Campaign: ${camp.name}`, href: "/campaigns" });
      context.push({ label: "Open Tabletop", href: `/play/${camp.id}` });
      if (camp.vttUrl) context.push({ label: "Open in Owlbear", href: camp.vttUrl, external: true });
    }
  }

  const template = await loadToolTemplate(def.file);
  const html = renderToolPage(template, {
    docId: doc.id,
    def,
    data: doc.data,
    title: doc.title,
    // Optimistic-concurrency stamp: the sheet's updatedAt at load time. The save
    // shim sends it back, and the server refuses a write whose base is stale —
    // so a second (older) tab closing can't overwrite newer progress.
    rev: doc.updatedAt.getTime(),
    previewOnly,
    embed,
    context,
  });

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache",
      "expires": "0",
    },
  });
}
