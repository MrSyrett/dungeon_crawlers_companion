import type { MetadataRoute } from "next";
import { APP_BG } from "@/lib/chrome";

// The web app manifest, served at /manifest.webmanifest by Next's file convention
// (app/manifest.ts). Together with `appleWebApp.capable` in app/layout.tsx this is
// what makes the site open from a Home Screen icon as a STANDALONE app — its own
// window, no address bar, no browser toolbar — instead of a Safari tab wearing an
// icon.
//
// Two things worth knowing before touching this:
//
// 1. `display: "standalone"` is read ONLY when the icon is added. An icon already
//    on the Home Screen keeps whatever mode it was created with, so testing this
//    means removing the old icon and re-adding it from Safari's Share sheet.
//
// 2. Standalone has NO BROWSER BACK BUTTON. Every route has to be reachable and
//    escapable through the site's own chrome. SiteNav is on every page and the
//    standalone surfaces carry the mini-bar, so that holds today — but a new page
//    without either would be a dead end, and there is no Back to bail out with.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dungeon Crawler's Companion",
    // The label under the icon. iOS prefers `appleWebApp.title` (set in
    // app/layout.tsx); this is the same string so the two can't drift.
    short_name: "DCCompanion",
    description:
      "TTRPG digital toolkit — character sheets and session prep, saved to your account.",
    // Launch straight into the desk rather than the marketing root; signed-out
    // visitors get redirected to /login from here anyway.
    start_url: "/dashboard",
    // Everything under / is in-app. A link outside the scope opens in Safari,
    // which is the behaviour wanted for an external rulebook or an OBR room.
    scope: "/",
    display: "standalone",
    // The splash/letterbox colour while the app boots, so the launch does not
    // flash white before the first paint. A manifest is JSON served to the OS —
    // no CSS, no custom properties — so this cannot be a token; lib/chrome.ts is
    // where the one literal lives.
    background_color: APP_BG,
    theme_color: APP_BG,
    orientation: "any",
    categories: ["games", "utilities", "productivity"],
    // The two real PNGs in public/. iOS uses the 180 (apple-touch-icon) and
    // ignores this list; Android reads it. A 512x512 would let Android offer a
    // richer install prompt and a maskable icon — worth adding if the source art
    // is ever exported at that size, but nothing here is broken without it.
    icons: [
      { src: "/icon-64.png", sizes: "64x64", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
