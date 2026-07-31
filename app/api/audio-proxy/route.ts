import { NextRequest } from "next/server";
import { lookup } from "node:dns/promises";
import net from "node:net";
import { getPlayUser } from "@/lib/vtt";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET /api/audio-proxy?u=<encoded upstream url>&t=<vtt token?>
//
// Streams a cross-origin audio file back through our own origin so the GM Screen
// music/scenes tools can route it through Web Audio and control its volume on
// iOS (where the OS ignores HTMLAudioElement.volume, and most track hosts —
// Dropbox and friends — send no CORS headers, so the audio can't be read
// directly). Same-origin here means no CORS is needed.
//
// Guards, because this fetches a URL on the caller's behalf:
//  - Auth: cookie session OR a valid VTT token (?t=). Never an open proxy.
//  - SSRF: the target host must resolve only to public IPs; re-checked on every
//    redirect hop. Blocks loopback/private/link-local/cloud-metadata addresses.
//  - Content: an HTML response is refused, so this can't be used to fetch web
//    pages through the app.
//  - Range requests are forwarded so seeking/scrubbing keeps working.

const MAX_REDIRECTS = 4;
const FETCH_TIMEOUT_MS = 15000;

// Reserved / private / non-routable ranges we must never fetch server-side.
function isBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split(".").map((n) => parseInt(n, 10));
    if (p[0] === 0) return true; // "this" network
    if (p[0] === 10) return true; // private
    if (p[0] === 127) return true; // loopback
    if (p[0] === 169 && p[1] === 254) return true; // link-local (incl. cloud metadata)
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true; // private
    if (p[0] === 192 && p[1] === 168) return true; // private
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] >= 224) return true; // multicast / reserved
    return false;
  }
  if (net.isIPv6(ip)) {
    const s = ip.toLowerCase().replace(/^\[|\]$/g, "");
    if (s === "::1" || s === "::") return true; // loopback / unspecified
    if (s.startsWith("fe80")) return true; // link-local
    if (s.startsWith("fc") || s.startsWith("fd")) return true; // unique-local
    const mapped = s.match(/(?:^|:)ffff:(\d+\.\d+\.\d+\.\d+)$/); // IPv4-mapped ::ffff:a.b.c.d
    if (mapped) return isBlockedIp(mapped[1]);
    return false;
  }
  return true; // unparseable → treat as unsafe
}

// Resolve the host and reject if any address is non-public. (This closes direct
// IP literals and DNS names; a determined DNS-rebinding attacker has a small
// window between this lookup and fetch — acceptable for an auth-gated hobby
// proxy, and noted here so it isn't mistaken for full protection.)
async function assertPublicHost(hostname: string): Promise<void> {
  const host = hostname.replace(/^\[|\]$/g, "");
  let addresses: string[];
  if (net.isIP(host)) {
    addresses = [host];
  } else {
    const res = await lookup(host, { all: true });
    addresses = res.map((r) => r.address);
  }
  if (!addresses.length) throw new Error("no address");
  for (const a of addresses) if (isBlockedIp(a)) throw new Error("blocked address");
}

export async function GET(req: NextRequest) {
  const user = await getPlayUser(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const raw = req.nextUrl.searchParams.get("u");
  if (!raw) return new Response("Missing url", { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response("Bad url", { status: 400 });
  }
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return new Response("Unsupported scheme", { status: 400 });
  }

  const range = req.headers.get("range") || undefined;

  // Follow redirects by hand so each hop is SSRF-checked (a permissive host can
  // 30x to an internal address otherwise).
  let current = target;
  let upstream: Response | null = null;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    try {
      await assertPublicHost(current.hostname);
    } catch {
      return new Response("Blocked address", { status: 403 });
    }

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(current.toString(), {
        method: "GET",
        headers: {
          ...(range ? { range } : {}),
          // Some hosts serve a preview page or 403 to a header-less client.
          "user-agent": "Mozilla/5.0 (compatible; DCC-audio-proxy)",
          accept: "audio/*,application/octet-stream;q=0.9,*/*;q=0.5",
        },
        redirect: "manual",
        signal: ac.signal,
      });
    } catch {
      clearTimeout(timer);
      return new Response("Upstream fetch failed", { status: 502 });
    }
    clearTimeout(timer);

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      let next: URL;
      try {
        next = new URL(res.headers.get("location")!, current);
      } catch {
        return new Response("Bad redirect", { status: 502 });
      }
      if (next.protocol !== "http:" && next.protocol !== "https:") {
        return new Response("Bad redirect scheme", { status: 502 });
      }
      current = next;
      // Drain the redirect body so the socket can be reused.
      try {
        await res.arrayBuffer();
      } catch {
        /* ignore */
      }
      continue;
    }

    upstream = res;
    break;
  }
  if (!upstream) return new Response("Too many redirects", { status: 502 });

  const contentType = (upstream.headers.get("content-type") || "").toLowerCase();
  // Refuse an HTML page so this can't be turned into a general web proxy.
  if (contentType.startsWith("text/html")) {
    return new Response("Not an audio file", { status: 415 });
  }

  const headers = new Headers();
  for (const h of [
    "content-type",
    "content-length",
    "content-range",
    "accept-ranges",
    "last-modified",
    "etag",
  ]) {
    const v = upstream.headers.get(h);
    if (v) headers.set(h, v);
  }
  if (!headers.has("content-type")) headers.set("content-type", "application/octet-stream");
  if (!headers.has("accept-ranges")) headers.set("accept-ranges", "bytes");
  // Auth-gated content: keep it out of shared/CDN caches; the browser may still
  // reuse it within the session.
  headers.set("cache-control", "private, max-age=3600");
  headers.set("referrer-policy", "no-referrer");

  return new Response(upstream.body, { status: upstream.status, headers });
}
