import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import path from "node:path";
import type { NextRequest } from "next/server";
import { getPlayUser } from "@/lib/vtt";
import { ASSET_PACK_DIR, canAccessAssetPacks, resolveAssetFile } from "@/lib/asset-packs";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ file: string }> };

// Streams one refined FA atlas sheet (.webp) or the manifest (.json) from the
// private directory, admin-gated. A denied/absent file 404s so the URL never
// confirms what exists. Mirrors app/api/rulebooks/[file]/route.ts.
export async function GET(req: NextRequest, ctx: Ctx) {
  const user = await getPlayUser(req);
  if (!canAccessAssetPacks(user)) return new Response("Unauthorized", { status: 401 });

  const { file: rawParam } = await ctx.params;
  const file = await resolveAssetFile(rawParam);
  if (!file) return new Response("Not found", { status: 404 });

  const full = path.join(ASSET_PACK_DIR, file);
  const info = await stat(full).catch(() => null);
  if (!info || !info.isFile()) return new Response("Not found", { status: 404 });

  const type = file.toLowerCase().endsWith(".json") ? "application/json" : "image/webp";
  const body = Readable.toWeb(createReadStream(full)) as unknown as ReadableStream;
  return new Response(body, {
    headers: {
      "content-type": type,
      "content-length": String(info.size),
      // Auth-gated art: private cache only (the ?v=<hash> handles revalidation).
      "cache-control": "private, max-age=3600",
    },
  });
}
