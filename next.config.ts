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
