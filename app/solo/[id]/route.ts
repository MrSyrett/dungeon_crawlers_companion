// SOLO PLAY — serves a saved solo campaign (Document tool "db-solo") as a
// standalone page, the same way /tools/[tool]/[id] serves a sheet: the saved
// state, autosave shim, navbar and Dragonbane skin come from renderToolPage.
// Owner only, and only while solo play is switched on (lib/solo.ts).
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { loadToolTemplate } from "@/lib/tools";
import { renderToolPage } from "@/lib/inject";
import { getHiddenSystemKeys } from "@/lib/systems";
import { SOLO_DEF, SOLO_TOOL, soloEnabledFor } from "@/lib/solo";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!soloEnabledFor(user.email)) return new Response("Not found", { status: 404 });

  const { id } = await ctx.params;
  const doc = await prisma.document.findFirst({ where: { id, userId: user.id, tool: SOLO_TOOL } });
  if (!doc) return new Response("Solo campaign not found", { status: 404 });

  const template = await loadToolTemplate(SOLO_DEF.file);
  const html = renderToolPage(template, {
    docId: doc.id,
    def: SOLO_DEF,
    data: doc.data,
    title: doc.title,
    rev: doc.updatedAt.getTime(),
    email: user.email,
    isAdmin: isAdminEmail(user.email),
    hiddenKeys: await getHiddenSystemKeys(),
  });
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      pragma: "no-cache",
      expires: "0",
    },
  });
}
