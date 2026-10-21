import { preload } from "react-dom";
import { redirect } from "next/navigation";
import HomeSystems from "@/components/HomeSystems";
import { getCurrentUser } from "@/lib/auth";
import { getHiddenSystemKeys } from "@/lib/systems";

// THE HOME PAGE — where the navbar logo and the game title go.
//
// A launchpad: "Choose a Game" (the tiles — also the system switcher on a phone,
// where the navbar's Games menu lives in the ☰ panel as a link to #home-systems),
// then the two system-agnostic tools. Your characters and campaigns have their
// own pages now — My Characters and My Campaigns, in the navbar's account menu.
//
// Signed out still goes to /login — this is a page for people who are already in.
//
// It wears NO single system's skin: "/" is matched by isChromePath in
// components/SiteNav.tsx. Each game tile is styled by its own data-sys, so every
// system sits on one neutral page at once.

export const dynamic = "force-dynamic";

// ONLY the tools that need no system choice (the GM Screen, Rulebooks and
// Campaigns are per-system in practice and live in the navbar, where a system is
// always in scope).
const TOOLS_NAV: { href: string; label: string; tool: "map" | "token" }[] = [
  { href: "/dungeon-map", label: "Map Maker", tool: "map" },
  { href: "/token-maker", label: "Token Maker", tool: "token" },
];

// What the game tiles need before they look finished: the brand faces the
// wordmarks are set in (self-hosted @font-face in app/globals.css — the
// next/font faces are already preloaded by the layout) and each tile's cover
// texture (the [data-sys] map's --tile-tex). Both are otherwise discovered only
// once the stylesheet has been applied and the tiles laid out, so they arrived
// late and the tiles visibly "caught up". Preloading starts all of them with the
// HTML itself, in parallel.
const TILE_FONTS = [
  "/fonts/jsl-blackletter.woff2",
  "/fonts/dndc.woff2",
  "/fonts/ringbearer.woff2",
  "/fonts/hideout.woff2",
  "/fonts/dreadful.woff2",
  "/fonts/marvel.woff2",
  "/fonts/ghostbusters.woff2",
  "/fonts/star-jedi-logo.woff2",
  "/fonts/dead-kansas.woff2",
];
const TILE_ART = [
  "icrpg-grain", "dnd-cover", "lotr-mist", "db-parchment", "pb-splatter", "dcc-splatter", "kob-halftone", "co-grunge",
  "mmrpg-burst", "jlu-skyline", "gb-ectoplasm", "sw-starfield", "ace-speedlines",
  "d62e-blueprint", "yze-raster", "twd-grunge", "myz-metal", "vae-paper", "tool-map", "tool-token",
];

export default async function Home() {
  for (const href of TILE_FONTS) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  for (const name of TILE_ART) preload(`/themes/${name}.webp`, { as: "image", type: "image/webp" });

  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenKeys = await getHiddenSystemKeys();

  return (
    // NO PAGE HEADER, and this is the only page without one. The section labels
    // carry all the structure this page needs.
    <div className="home-roster mx-auto w-full max-w-5xl px-5 py-8">
      <section aria-labelledby="home-systems">
        <h2 id="home-systems" className="scroll-mt-20 font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
          Choose a Game
        </h2>
        <HomeSystems hiddenKeys={hiddenKeys} />
      </section>

      <section aria-labelledby="home-tools" className="mt-10">
        <h2 id="home-tools" className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
          Tools
        </h2>
        {/* .home-tools: the same flex wrap as the games, but two across at every
            width so a pair of tools fills its row. Both classes are in globals.css. */}
        <ul className="home-grid home-tools" data-fitted="">
          {TOOLS_NAV.map((t) => (
            <li key={t.href}>
              {/* The Map Maker is a route handler serving its own HTML document,
                  not a Next page, so these are plain <a>. */}
              <a href={t.href} data-tool={t.tool} className="home-tile w-full">
                <span className="home-tile-name">{t.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
