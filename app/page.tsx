import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import HomeSystems from "@/components/HomeSystems";
import { getCurrentUser } from "@/lib/auth";
import { getHiddenSystemKeys } from "@/lib/systems";

// THE HOME PAGE — where the navbar logo goes.
//
// This route used to redirect straight to /dashboard, which meant the site had no
// system-agnostic surface at all: every page is behind "which system am I in?",
// including the dashboard. So there was nowhere to simply start.
//
// It is a LAUNCHPAD, and a short one. Two blocks: pick a game, or open one of the
// two tools that genuinely need no system. No recent-documents list and no campaign
// list by choice — the per-system dashboards are where that content lives, and
// duplicating it here would mean two places to keep in step for no new capability.
//
// Signed out still goes to /login — this is a page for people who are already in,
// not a public landing page.
//
// It wears NO system's skin: "/" is matched by isChromePath in
// components/SiteNav.tsx, which sets data-chrome on <html> so a system's ground and
// faces stay off. The game tiles are the deliberate exception and style themselves
// from .home-tile in app/globals.css.

export const dynamic = "force-dynamic";

// ONLY the tools that need no system choice.
//
// The GM Screen and the Rulebooks shelf were here and were removed: both are
// per-system in practice (the GM Screen serves one campaign's system and prunes
// its data to it; the shelf filters by the selected system), so offering them
// from the one page that has no system selected was offering a dead end. They are
// in the navbar, where a system is always in scope.
//
// Campaigns is absent for the same reason — it shows one system's campaigns and
// creates in that system, which is also why it moved out of TOOLS_NAV.
const TOOLS: { href: string; label: string; blurb: string }[] = [
  { href: "/dungeon-map", label: "Map Maker", blurb: "Draw a battle map and export it" },
  { href: "/token-maker", label: "Token Maker", blurb: "Round VTT tokens from any image" },
];

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenKeys = await getHiddenSystemKeys();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader title="Dungeon Crawler's Companion" />

      <section aria-labelledby="home-systems">
        <h2
          id="home-systems"
          className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]"
        >
          Choose a Game
        </h2>
        <HomeSystems hiddenKeys={hiddenKeys} />
      </section>

      <section aria-labelledby="home-tools" className="mt-10">
        <h2
          id="home-tools"
          className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]"
        >
          Tools
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.href}>
              {/* The Map Maker is a route handler serving its own HTML document,
                  not a Next page, so these are plain <a> — a next/link client
                  navigation to it would be wrong. */}
              <a
                href={t.href}
                className="block rounded-lg border border-[var(--border)] bg-[var(--panel)] px-4 py-4 transition-colors hover:border-[var(--gold)] hover:bg-[var(--panel-2)]"
              >
                <span className="font-display block text-[15px] font-black tracking-wide text-[var(--text)]">
                  {t.label}
                </span>
                <span className="mt-1 block text-[13px] text-[var(--muted)]">{t.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
