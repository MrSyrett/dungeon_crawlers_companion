import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { Readable } from "node:stream";
import path from "node:path";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Rulebooks live OUTSIDE public/ so Next never serves them statically. They are
// streamed only to signed-in users through this route, which keeps copyrighted
// material off the open web while still letting your group read it in-app.
const RULEBOOK_DIR = path.join(process.cwd(), "protected", "rulebooks");

type Ctx = { params: Promise<{ file: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { file: rawParam } = await ctx.params;

  // Never trust the path segment: reduce to a bare filename, require .pdf, and
  // reject anything with separators so "../" can't escape the directory.
  const file = path.basename(decodeURIComponent(rawParam));
  if (
    !file.toLowerCase().endsWith(".pdf") ||
    file.includes("/") ||
    file.includes("\\") ||
    file.startsWith(".")
  ) {
    return new Response("Not found", { status: 404 });
  }

  // Only serve a file that actually sits in the private directory.
  let listed = false;
  try {
    listed = (await readdir(RULEBOOK_DIR)).includes(file);
  } catch {
    listed = false;
  }
  if (!listed) return new Response("Not found", { status: 404 });

  const full = path.join(RULEBOOK_DIR, file);
  const info = await stat(full).catch(() => null);
  if (!info || !info.isFile()) return new Response("Not found", { status: 404 });

  const body = Readable.toWeb(createReadStream(full)) as unknown as ReadableStream;
  return new Response(body, {
    headers: {
      "content-type": "application/pdf",
      "content-length": String(info.size),
      "content-disposition": `inline; filename="${file.replace(/["\\]/g, "")}"`,
      // Auth-gated, copyrighted: keep it out of shared/CDN caches.
      "cache-control": "private, no-store",
    },
  });
}
