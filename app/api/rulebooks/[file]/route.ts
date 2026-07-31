import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { Readable } from "node:stream";
import path from "node:path";
import type { NextRequest } from "next/server";
import { getPlayUser } from "@/lib/vtt";
import { canAccessRulebook, RULEBOOK_DIR } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ file: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  // Cookie session, or the VTT token (?t= in the <object>/<iframe> src) when the
  // PDF loads framed inside the Owlbear popover. Per-file access is still gated
  // below by canAccessRulebook.
  const user = await getPlayUser(req);
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

  // Access control: admins see everything; everyone else needs the file opened
  // to all or granted to their account. A denied file 404s (not 403) so the URL
  // doesn't confirm which private books exist.
  const allowed = await canAccessRulebook({ id: user.id, email: user.email }, file);
  if (!allowed) return new Response("Not found", { status: 404 });

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
