import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { loadToolTemplate } from "@/lib/tools";
import { miniBarHead } from "@/lib/minibar";
import { siteNav } from "@/lib/sitenav";
import { getHiddenSystemKeys } from "@/lib/systems";

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
  // The editor's shell is a 100vh row-flex .app; take the bar's height off it
  // so the page doesn't gain a scrollbar. --dd-bar-h is published by whichever
  // bar is on the page, so this stays right if the bar ever changes height.
  // The bar reads the site-wide system (dcw_system) itself, since a map isn't
  // tied to one.
  const fit = `<style>.app{height:calc(100vh - var(--dd-bar-h))!important}</style>`;
  const bar = siteNav({ system: null, email: user.email, isAdmin: isAdminEmail(user.email), hiddenKeys: await getHiddenSystemKeys() });

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
