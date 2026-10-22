import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Retired compendium routes, kept resolving so old links and bookmarks don't
  // 404. Query strings are carried through to the destination.
  async redirects() {
    return [
      // Dragonbane NPCs became a tab of the Bestiary.
      { source: "/dragonbane/npcs", destination: "/dragonbane/bestiary?tab=npcs", permanent: true },
      { source: "/dragonbane/npcs/:path+", destination: "/dragonbane/bestiary?tab=npcs", permanent: true },
      // Dragonbane Skills and Adventuring pages were removed. Skill lists live on
      // each profession; the closest remaining home for the adventuring rules
      // (combat, encounters, generators) is the Bestiary.
      { source: "/dragonbane/skills/:path*", destination: "/dragonbane/professions", permanent: true },
      { source: "/dragonbane/adventuring/:path*", destination: "/dragonbane/bestiary", permanent: true },
      // Pirate Borg Rules, The Dark Caribbean, ASH & Alchemy, Treasure and GM
      // Tables pages were removed. Character rules land on Classes, alchemy and
      // loot on Gear, and the GM roll tables on the Bestiary.
      { source: "/pirate-borg/rules/:path*", destination: "/pirate-borg/classes", permanent: true },
      { source: "/pirate-borg/setting/:path*", destination: "/pirate-borg/classes", permanent: true },
      { source: "/pirate-borg/alchemy/:path*", destination: "/pirate-borg/gear", permanent: true },
      { source: "/pirate-borg/treasure/:path*", destination: "/pirate-borg/gear", permanent: true },
      { source: "/pirate-borg/tables/:path*", destination: "/pirate-borg/bestiary", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Display fonts extracted from the tool templates (see /fonts/ in
        // public/). They effectively never change — if one ever does, give the
        // file a new name. Long-lived immutable cache so returning visitors
        // never re-download them.
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // The tool templates' data scripts (bestiaries, generator tables, …).
        // Safe to cache immutably because lib/tools.ts stamps every reference
        // with `?v=<content hash>` when it loads a template — an edited data file
        // gets a new URL on the next page load, so it still shows up immediately,
        // while unchanged files (the common case: 45 of them on a GM Screen open)
        // stop costing a revalidation round-trip each.
        source: "/tools-data/:path*",
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
        // Theme grounds and the game tiles' cover textures. NOT immutable: a
        // texture is sometimes replaced under the same name (lotr-mist was), so
        // a day's cache, then served from cache while it revalidates in the
        // background for a week — returning visits draw the tiles instantly
        // instead of waiting on a revalidation round-trip per texture.
        source: "/themes/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // The PDF reader (pdf.js + its 1 MB worker, the shared reader, the cover
        // fallback, the chapter outlines). Only revalidated before, so every book
        // opened re-checked ~1.4 MB with the server. A day's cache, then served
        // from cache while revalidating in the background — they change rarely
        // and keep their names, so not immutable.
        source: "/vendor/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
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
