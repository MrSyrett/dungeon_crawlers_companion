import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { loadToolTemplate } from "@/lib/tools";
import { miniBar, miniBarHead } from "@/lib/minibar";

// Standalone Dungeon Map Maker, reached from the dashboard nav ("Map Maker").
// Unlike the character/session tools it is NOT a saved document: the editor keeps
// work in the browser (localStorage) and the user persists or shares a map with
// the tool's own Export / Import (.json) and PNG buttons. So there is no doc id,
// no state injection and no save shim — just the standalone template plus the
// shared mini-bar (site navigation) at the top.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const template = await loadToolTemplate("dungeon_map_maker.html");

  const favicon = `<link rel="icon" type="image/png" href="/icon-64.png">`;
  // The editor's shell is a 100vh row-flex .app; take the bar's height off it so
  // the page doesn't gain a 36px scroll. The bar reads the site-wide system
  // (dcw_system) itself, since a map isn't tied to one.
  const fit = `<style>.app{height:calc(100vh - 36px)!important}</style>`;
  const bar = miniBar({ system: null, crumb: "Map Maker", status: false });

  const html = template
    .replace(/<head[^>]*>/i, (m) => `${m}\n${favicon}\n${miniBarHead(null)}\n${fit}`)
    .replace(/<body[^>]*>/i, (m) => `${m}\n${bar}`);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
