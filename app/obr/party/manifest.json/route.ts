import { OBR_FRAME_ANCESTORS } from "@/lib/vtt";

export const dynamic = "force-dynamic";

/**
 * GET /obr/party/manifest.json — install URL for Table Tools, a third,
 * separate Owlbear Rodeo extension hosted alongside the Companion
 * (../../manifest.json) and the VTT Importer (../../vtt-import/manifest.json).
 *
 *   Party   — remember each player's token (room metadata, so it survives scene
 *             changes) and drop the party into any scene already owned by them.
 *   Vision  — GM-only preview of what one token, or the whole party, can see
 *             under Dynamic Fog.
 *   Stage   — hide a scene behind a curtain while the GM sets it up, then
 *             make it live.
 *   Import  — Universal VTT (.dd2vtt/.uvtt/.df2vtt) to a new scene with
 *             Dynamic Fog walls, doors and lights. Replaces the standalone
 *             VTT Importer extension (/obr/vtt-import), which still works.
 *
 * The background page runs in every client (GM and players); it is what draws
 * the vision preview and the players' curtain.
 *
 * Same rule as the other manifests: load-bearing paths are root-relative so
 * Owlbear Rodeo resolves them against whatever origin the user pasted.
 */
export async function GET(req: Request) {
  const manifest: Record<string, unknown> = {
    name: "Table Tools",
    version: "1.1.0",
    manifest_version: 1,
    // Owlbear Rodeo rejects manifests whose description is >= 128 chars.
    description:
      "Party tokens that follow players between scenes, per-token vision preview, a prep curtain, and Universal VTT map import.",
    author: "Dungeon Crawler's Companion",
    icon: "/obr/party/icon.svg",
    background_url: "/obr/party/background",
    action: {
      title: "Table Tools",
      icon: "/obr/party/icon.svg",
      popover: "/obr/party/popover",
      width: 400,
      height: 640,
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
