import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
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
