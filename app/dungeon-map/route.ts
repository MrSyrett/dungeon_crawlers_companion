import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { loadToolTemplate } from "@/lib/tools";

// Standalone Dungeon Map Maker, reached from the dashboard nav ("Map Maker").
// Unlike the character/session tools it is NOT a saved document: the editor keeps
// work in the browser (localStorage) and the user persists or shares a map with
// the tool's own Export / Import (.json) and PNG buttons. So there is no doc id,
// no state injection and no save shim — just the standalone template plus a small
// Home link back to the dashboard.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const template = await loadToolTemplate("dungeon_map_maker.html");

  const favicon = `<link rel="icon" type="image/png" href="/icon-64.png">`;
  // Top-right so it clears the tool's own top-left sidebar heading.
  const home = `<div style="position:fixed;top:8px;right:10px;z-index:2147483647;font:600 11px/1 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase">
<a href="/dashboard" style="color:#cfcabd;background:rgba(8,8,9,.7);border:1px solid #3a3a40;border-radius:5px;padding:6px 10px;text-decoration:none">&larr; Home</a>
</div>`;

  const html = template
    .replace(/<head[^>]*>/i, (m) => `${m}\n${favicon}`)
    .replace(/<body[^>]*>/i, (m) => `${m}\n${home}`);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
