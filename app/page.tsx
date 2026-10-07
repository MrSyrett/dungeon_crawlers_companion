import Link from "next/link";
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
// It is deliberately a LAUNCHPAD, not a feed. Two blocks and nothing else:
//
//   • the systems, so picking one is a click rather than finding a dropdown;
//   • the four tools that belong to no system.
//
// No "recent documents" list and no campaign list, by choice. The dashboard
// already fetches every document you own and shows the active system's; the
// per-system lists are where that content lives, and duplicating it here would
// mean two places to keep in step for no new capability.
//
// Signed out still goes to /login — this is a page for people who are already in,
// not a public landing page.
//
// It wears NO system's skin: "/" is in CHROME_PREFIXES in components/SiteNav.tsx,
// which sets data-chrome on <html> so a system's ground and faces stay off while
// its accent is still published for the chips. The system tiles each wear their own
// colour, which is the point of them.

export const dynamic = "force-dynamic";

// The system-agnostic surfaces. Rulebooks is here rather than in the Compendium
// dropdown's sense of it: the shelf filters itself by the selected system but is
// reachable and useful whatever that is, which is also why it is in
// STAY_ON_SWITCH. Campaigns is NOT here — it is per-system (it shows one system's
// campaigns and creates in that system), so it belongs to a system's dashboard,
// not to this page.
const TOOLS: { href: string; label: string; blurb: string }[] = [
  { href: "/gm-screen", label: "GM Screen", blurb: "Run the table — rolls, tracker, maps, notes" },
  { href: "/dungeon-map", label: "Map Maker", blurb: "Draw a battle map and export it" },
  { href: "/token-maker", label: "Token Maker", blurb: "Round VTT tokens from any image" },
  { href: "/rules", label: "Rulebooks", blurb: "The PDF shelf, read in the browser" },
];

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenKeys = await getHiddenSystemKeys();

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader title="Dungeon Crawler's Companion" subtitle={<>Everything for the table, online and in person</>} />

      <section aria-labelledby="home-systems">
        <h2
          id="home-systems"
          className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]"
        >
          Systems
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
              {/* The GM Screen and Map Maker are route handlers serving their own
                  HTML documents, not Next pages, so these are plain <a> — a
                  next/link client navigation to them would be wrong. */}
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

      <p className="mt-10 border-t border-[var(--border)] pt-6 text-[13px] text-[var(--muted)]">
        Characters and adventures live under each system —{" "}
        <Link href="/dashboard" className="font-semibold text-[var(--gold)] hover:underline">
          go to your dashboard
        </Link>
        .
      </p>
    </div>
  );
}
