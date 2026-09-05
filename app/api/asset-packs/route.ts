import { getPlayUser } from "@/lib/vtt";
import { canAccessAssetPacks, readAssetManifest } from "@/lib/asset-packs";

export const dynamic = "force-dynamic";

// GET — the refined Forgotten Adventures manifest (fa-bundle.json), for admins only.
// Same shape as /packs/bundled/bundled.json: { version, packs:[{id,name,textures:[…]}] }.
// The Map Maker prefixes each texture's atlas/thumb sheet with /api/asset-packs/<sheet>
// (the streaming route below), so the sheet names in the manifest stay bare.
// A non-admin (or logged-out) caller gets 401 and the tool falls back to hand imports.
export async function GET(req: Request) {
  const user = await getPlayUser(req);
  if (!canAccessAssetPacks(user)) return new Response("Unauthorized", { status: 401 });

  const manifest = await readAssetManifest();
  if (!manifest) return new Response("Not found", { status: 404 });

  return new Response(JSON.stringify(manifest), {
    headers: {
      "content-type": "application/json",
      // Auth-gated, copyrighted: keep it out of shared/CDN caches.
      "cache-control": "private, no-store",
    },
  });
}
