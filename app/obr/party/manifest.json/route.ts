import { OBR_FRAME_ANCESTORS } from "@/lib/vtt";

export const dynamic = "force-dynamic";

/**
 * GET /obr/party/manifest.json — install URL for Party Tokens, a third,
 * separate Owlbear Rodeo extension hosted alongside the Companion
 * (../../manifest.json) and the VTT Importer (../../vtt-import/manifest.json).
 *
 * Party Tokens remembers which token belongs to which player (in room
 * metadata, so it survives scene changes) and drops the whole party into a new
 * scene already owned by the right players.
 *
 * Same rule as the other manifests: load-bearing paths are root-relative so
 * Owlbear Rodeo resolves them against whatever origin the user pasted.
 */
export async function GET(req: Request) {
  const manifest: Record<string, unknown> = {
    name: "Party Tokens",
    version: "1.0.0",
    manifest_version: 1,
    // Owlbear Rodeo rejects manifests whose description is >= 128 chars.
    description:
      "Assign a token to each player once, then drop the whole party into any scene already owned by the right players.",
    author: "Dungeon Crawler's Companion",
    icon: "/obr/party/icon.svg",
    action: {
      title: "Party Tokens",
      icon: "/obr/party/icon.svg",
      popover: "/obr/party/popover",
      width: 400,
      height: 600,
    },
  };

  // Optional, non load-bearing homepage link — only advertise a real public host.
  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host && !/^localhost|^127\.|^\[?::1\]?/.test(host)) {
    manifest.homepage_url = `${proto || "https"}://${host}`;
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      "content-security-policy": `frame-ancestors ${OBR_FRAME_ANCESTORS}`,
    },
  });
}
