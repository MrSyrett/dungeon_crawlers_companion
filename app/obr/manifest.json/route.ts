import { OBR_FRAME_ANCESTORS } from "@/lib/vtt";

export const dynamic = "force-dynamic";

/**
 * GET /obr/manifest.json — the install URL a player pastes into Owlbear Rodeo.
 *
 * Load-bearing paths are RELATIVE, exactly as the official example does
 * (`"popover": "/"`). Owlbear Rodeo resolves them against the manifest URL the
 * user actually pasted, which is the only origin guaranteed to be correct.
 * Deriving absolute URLs from `req.url` looks tidier but breaks behind a
 * TLS-terminating proxy, where the request can arrive as the internal host and
 * the manifest would advertise something like http://localhost:3000/obr/popover.
 */
export async function GET(req: Request) {
  const manifest: Record<string, unknown> = {
    name: "Dungeon Crawler's Companion",
    version: "1.1.0",
    manifest_version: 1,
    description: "Open your character sheets and tune in to your GM's shared audio, right at the table.",
    author: "Dungeon Crawler's Companion",
    icon: "/obr/icon.png",
    action: {
      title: "Character Sheet",
      icon: "/obr/icon.png",
      popover: "/obr/popover",
      // Treated as maximums by Owlbear Rodeo; roughly a phone-sized panel,
      // which is the layout the sheets already handle well.
      width: 460,
      height: 700,
    },
  };

  // Only the (optional, non load-bearing) homepage link needs an absolute URL.
  // Prefer what the proxy says the public host is; skip it if we can't tell
  // rather than advertise an internal address.
  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host && !/^localhost|^127\.|^\[?::1\]?/.test(host)) {
    manifest.homepage_url = `${proto || "https"}://${host}`;
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Owlbear Rodeo's fetch is a "safe" request so this usually isn't needed,
      // but the hosting guide notes CORS errors are possible — harmless to set.
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      "content-security-policy": `frame-ancestors ${OBR_FRAME_ANCESTORS}`,
    },
  });
}
