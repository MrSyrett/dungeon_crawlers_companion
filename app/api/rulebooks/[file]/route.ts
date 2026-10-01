import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { Readable } from "node:stream";
import path from "node:path";
import type { NextRequest } from "next/server";
import { getPlayUser } from "@/lib/vtt";
import { canAccessRulebook, RULEBOOK_DIR } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ file: string }> };

// Resolve + authorize a rulebook request down to a real file on disk. Returns the
// absolute path and its stat, or a Response to send back (404/401). Shared by GET
// and HEAD so both enforce the same access rules.
async function resolveFile(
  req: NextRequest,
  ctx: Ctx,
): Promise<{ full: string; size: number; mtimeMs: number; file: string } | Response> {
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

  let listed = false;
  try {
    listed = (await readdir(RULEBOOK_DIR)).includes(file);
  } catch {
    listed = false;
  }
  if (!listed) return new Response("Not found", { status: 404 });

  // Access control: admins see everything; everyone else needs the file opened to
  // all or granted to their account. A denied file 404s so the URL doesn't confirm
  // which private books exist.
  const allowed = await canAccessRulebook({ id: user.id, email: user.email }, file);
  if (!allowed) return new Response("Not found", { status: 404 });

  const full = path.join(RULEBOOK_DIR, file);
  const info = await stat(full).catch(() => null);
  if (!info || !info.isFile()) return new Response("Not found", { status: 404 });

  return { full, size: info.size, mtimeMs: info.mtimeMs, file };
}

// A weak validator from size + mtime, so a re-open revalidates with a cheap 304
// instead of re-downloading the whole book.
function etagFor(size: number, mtimeMs: number): string {
  return `W/"${size.toString(16)}-${Math.floor(mtimeMs).toString(16)}"`;
}

function baseHeaders(file: string, etag: string): Record<string, string> {
  return {
    "content-type": "application/pdf",
    "content-disposition": `inline; filename="${file.replace(/["\\]/g, "")}"`,
    // Advertise byte-range support so pdf.js fetches only the pages being viewed
    // instead of pulling the entire multi-megabyte book on every open.
    "accept-ranges": "bytes",
    etag,
    // Auth-gated, copyrighted: PRIVATE only (never a shared/CDN cache), but let the
    // authorized viewer's own browser keep and revalidate it — so the whole book no
    // longer re-downloads from the server every single open.
    "cache-control": "private, max-age=3600, must-revalidate",
  };
}

// Parse a single "bytes=start-end" range against a known size. Returns the
// inclusive {start,end}, "unsatisfiable", or null (no / unparseable range → full).
function parseRange(
  header: string | null,
  size: number,
): { start: number; end: number } | "unsatisfiable" | null {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m) return null; // multi-range or junk: just serve the whole file
  let start: number, end: number;
  if (m[1] === "") {
    const suffix = parseInt(m[2], 10); // last N bytes
    if (!Number.isFinite(suffix) || suffix <= 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = parseInt(m[1], 10);
    end = m[2] === "" ? size - 1 : parseInt(m[2], 10);
  }
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  if (start > end || start < 0) return "unsatisfiable";
  if (start > size - 1) return "unsatisfiable";
  if (end > size - 1) end = size - 1;
  return { start, end };
}

export async function HEAD(req: NextRequest, ctx: Ctx) {
  const r = await resolveFile(req, ctx);
  if (r instanceof Response) return r;
  const etag = etagFor(r.size, r.mtimeMs);
  return new Response(null, {
    headers: { ...baseHeaders(r.file, etag), "content-length": String(r.size) },
  });
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const r = await resolveFile(req, ctx);
  if (r instanceof Response) return r;
  const { full, size, mtimeMs, file } = r;
  const etag = etagFor(size, mtimeMs);
  const headers = baseHeaders(file, etag);

  // Already have this exact file cached? Cheap 304, no body.
  if (req.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers });
  }

  const range = parseRange(req.headers.get("range"), size);
  if (range === "unsatisfiable") {
    return new Response("Range Not Satisfiable", {
      status: 416,
      headers: { ...headers, "content-range": `bytes */${size}` },
    });
  }
  if (range) {
    const { start, end } = range;
    const body = Readable.toWeb(createReadStream(full, { start, end })) as unknown as ReadableStream;
    return new Response(body, {
      status: 206,
      headers: { ...headers, "content-range": `bytes ${start}-${end}/${size}`, "content-length": String(end - start + 1) },
    });
  }

  // Full file (still advertises accept-ranges so pdf.js switches to ranged fetches).
  const body = Readable.toWeb(createReadStream(full)) as unknown as ReadableStream;
  return new Response(body, { headers: { ...headers, "content-length": String(size) } });
}
