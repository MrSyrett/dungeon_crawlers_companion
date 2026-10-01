import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Display fonts extracted from the tool templates (see /fonts/ in
        // public/). They effectively never change — if one ever does, give the
        // file a new name. Long-lived immutable cache so returning visitors
        // never re-download them. (The /tools-data/ scripts intentionally get
        // no rule: the default ETag revalidation means edits to the bestiary
        // or generator tables show up on the next load as a cheap 304 check.)
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // VTT art that never changes in place (map textures, stock-token art and
        // condition rings are redrawn under a NEW name, never edited behind the
        // same URL). Long-lived immutable cache so a table that opens the tabletop
        // or map maker repeatedly doesn't re-revalidate every tile each time —
        // these are the heaviest static assets after the gated PDFs.
        source: "/packs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/vtt/stock-tokens/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/vtt/condition-rings/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Owlbear Rodeo loads the extension icon from its own origin. Static
        // files under public/ don't get the CORS header the manifest route
        // sets for itself, and the hosting guide warns cross-origin headers
        // are sometimes needed — without it the action button renders empty.
        source: "/obr/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
