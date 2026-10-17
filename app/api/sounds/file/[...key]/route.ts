import type { NextRequest } from "next/server";
import { presign } from "@/lib/s3";
import { FILE_ROUTE, SOUND_PREFIX, audioMime, safeRel, soundBucket, verifyKey } from "@/lib/sound-files";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET /api/sounds/file/<Category>/<Subcategory>/<file>?s=<sig>[&stream=1]
//
// A Sound Library track stored in the bucket (see lib/sound-files.ts). The
// signature is the access check: only /api/sounds (signed-in users) hands these
// links out.
//
//  - Normally: a redirect to a presigned bucket URL (valid 24 h), so the audio
//    streams straight from the bucket — free bucket egress, range requests and
//    seeking handled by the bucket.
//  - ?stream=1: the bytes through this origin instead (Range forwarded). iOS needs
//    this when the bucket sends no CORS headers: there the GM Screen and VTT route
//    audio through Web Audio for volume control, which can only read same-origin
//    or CORS-clean media. That path costs service egress, so it's the fallback.

const LINK_TTL = 24 * 60 * 60;

function relFrom(req: NextRequest): string | null {
  const p = req.nextUrl.pathname;
  if (!p.startsWith(FILE_ROUTE)) return null;
  try {
    return safeRel(p.slice(FILE_ROUTE.length).split("/").map(decodeURIComponent).join("/"));
  } catch {
    return null;
  }
}

async function handle(req: NextRequest, head: boolean) {
  const rel = relFrom(req);
  if (!rel || !verifyKey(rel, req.nextUrl.searchParams.get("s") || "")) {
    return new Response("Not found", { status: 404 });
  }
  const cfg = soundBucket();
  if (!cfg) return new Response("Sound storage is not configured", { status: 503 });
  const key = SOUND_PREFIX + rel;
  const type = audioMime(rel);

  if (req.nextUrl.searchParams.get("stream") !== "1") {
    const url = presign(cfg, "GET", key, LINK_TTL, { "response-content-type": type });
    return new Response(null, {
      status: 302,
      headers: { location: url, "cache-control": "private, max-age=3600" },
    });
  }

  // Same-origin stream (iOS fallback).
  const upstream = await fetch(presign(cfg, head ? "HEAD" : "GET", key, 300), {
    method: head ? "HEAD" : "GET",
    headers: req.headers.get("range") ? { range: req.headers.get("range")! } : {},
  }).catch(() => null);
  if (!upstream || (!upstream.ok && upstream.status !== 206)) {
    return new Response("Not found", { status: upstream?.status === 416 ? 416 : 404 });
  }
  const headers = new Headers({ "content-type": type, "accept-ranges": "bytes", "cache-control": "private, max-age=3600" });
  for (const h of ["content-length", "content-range", "etag", "last-modified"]) {
    const v = upstream.headers.get(h);
    if (v) headers.set(h, v);
  }
  return new Response(head ? null : upstream.body, { status: upstream.status, headers });
}

export async function GET(req: NextRequest) {
  return handle(req, false);
}

export async function HEAD(req: NextRequest) {
  return handle(req, true);
}
