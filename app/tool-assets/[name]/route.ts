import { getToolAsset } from "@/lib/tools";

// Serves the static code lifted out of the tool templates by lib/tools.ts
// (splitTemplate): `/tool-assets/<sha1>.js|css`. The name IS the content hash,
// so the response can be cached forever — a changed template produces a new
// name, and the (no-store) page that references it always carries the current
// one. Served from the in-process asset store, which is populated whenever a
// template is loaded (the page HTML is only ever sent after that), so a 404
// here means a stale URL from a previous build — the page itself reloads fresh.
//
// No auth: these are the tools' own static JS/CSS (the same bytes any signed-in
// user's page would carry), never user data.
export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!/^[a-f0-9]{20}\.(js|css)$/.test(name)) return new Response("Not found", { status: 404 });
  const asset = getToolAsset(name);
  if (!asset) return new Response("Not found", { status: 404 });
  return new Response(asset.body, {
    headers: {
      "content-type": asset.type,
      "cache-control": "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    },
  });
}
