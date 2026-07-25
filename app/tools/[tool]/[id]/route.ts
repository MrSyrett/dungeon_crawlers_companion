import { readFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isToolId, TOOLS } from "@/lib/tools";
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

  const filePath = path.join(process.cwd(), "tools", "templates", def.file);
  const template = await readFile(filePath, "utf8");
  const html = renderToolPage(template, {
    docId: doc.id,
    def,
    data: doc.data,
    title: doc.title,
    previewOnly,
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
