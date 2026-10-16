import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import { getPlayUser } from "@/lib/vtt";
import { canAccessRulebook, rulebookCoverPath, COVER_TYPES } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ file: string }> };

// GET — a Library book's cover image (see rulebookCoverPath in lib/rulebooks.ts).
// Same access rules as the PDF itself; 404 when the user can't read the book or
// it has no cover image, in which case the shelf draws page 1 in the browser.
export async function GET(req: NextRequest, ctx: Ctx) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { file: rawParam } = await ctx.params;
  const file = path.basename(decodeURIComponent(rawParam));
  if (!file.toLowerCase().endsWith(".pdf") || file.startsWith(".")) {
    return new Response("Not found", { status: 404 });
  }
  if (!(await canAccessRulebook({ id: user.id, email: user.email }, file))) {
    return new Response("Not found", { status: 404 });
  }

  const full = await rulebookCoverPath(file);
  if (!full) return new Response("Not found", { status: 404 });
  const info = await stat(full).catch(() => null);
  if (!info) return new Response("Not found", { status: 404 });

  const etag = `W/"c${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;
  const headers = {
    "content-type": COVER_TYPES[path.extname(full).toLowerCase()] ?? "application/octet-stream",
    etag,
    // Private (the books are), but let the viewer's browser keep it a day.
    "cache-control": "private, max-age=86400, must-revalidate",
  };
  if (req.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers });
  return new Response(new Uint8Array(await readFile(full)), {
    headers: { ...headers, "content-length": String(info.size) },
  });
}
