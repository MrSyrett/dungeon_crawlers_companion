import { OBR_FRAME_ANCESTORS } from "@/lib/vtt";

export const dynamic = "force-dynamic";

/**
 * GET /obr/vtt-import/manifest.json — install URL for the Universal VTT
 * Importer, a second, separate Owlbear Rodeo extension hosted alongside the
 * Companion (see ../../manifest.json/route.ts).
 *
 * Same rule as the Companion manifest: load-bearing paths are root-relative so
 * Owlbear Rodeo resolves them against whatever origin the user pasted, which is
 * the only host guaranteed to be correct behind a TLS-terminating proxy.
 */
export async function GET(req: Request) {
  const manifest: Record<string, unknown> = {
    name: "Universal VTT Importer",
    version: "1.0.0",
    manifest_version: 1,
    // Owlbear Rodeo rejects manifests whose description is >= 128 chars.
    description:
      "Import Universal VTT maps (.dd2vtt/.uvtt/.df2vtt) as a scene with walls, doors and lights for Dynamic Fog.",
    author: "Dungeon Crawler's Companion",
    icon: "/obr/vtt-import/icon.svg",
    action: {
      title: "VTT Import",
      icon: "/obr/vtt-import/icon.svg",
      popover: "/obr/vtt-import/popover",
      // Maximums as far as Owlbear Rodeo is concerned; a compact import panel.
      width: 420,
      height: 560,
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
