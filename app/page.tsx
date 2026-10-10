import { redirect } from "next/navigation";
import HomeSystems from "@/components/HomeSystems";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, CHARACTER_TOOL_IDS, isToolId } from "@/lib/tools";
import { getHiddenSystemKeys } from "@/lib/systems";

// THE HOME PAGE — where the navbar logo goes.
//
// A launchpad that leads with YOUR stuff. "My Characters" first — one tap back
// into any sheet you've made, across every system — then "Choose a Game" to
// start something new, then the two system-agnostic tools. The per-system
// dashboards still own the full per-system lists (characters AND adventures,
// with Launch VTT and delete); this is the cross-system quick-access that the
// dashboards, each locked to one system, could never be.
//
// Signed out still goes to /login — this is a page for people who are already in,
// not a public landing page.
//
// It wears NO system's skin: "/" is matched by isChromePath in
// components/SiteNav.tsx, which sets data-chrome on <html> so a system's ground and
// faces stay off. The game tiles are the deliberate exception and style themselves
// from .home-tile in app/globals.css; the character cards stay chrome-neutral.

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
const TOOLS_NAV: { href: string; label: string; tool: "map" | "token" }[] = [
  { href: "/dungeon-map", label: "Map Maker", tool: "map" },
  { href: "/token-maker", label: "Token Maker", tool: "token" },
];

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenKeys = await getHiddenSystemKeys();

  // Every character sheet this user has made, newest first, across all systems —
  // the home page's reason to lead with "My Characters". Compact select: just
  // what a quick-access card needs. A character tool's system name labels it,
  // since the page itself shows no system.
  const docs = await prisma.document.findMany({
    where: { userId: user.id, tool: { in: CHARACTER_TOOL_IDS } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, tool: true },
  });
  const characters = (docs as { id: string; title: string; tool: string }[]).map((d) => ({
    id: d.id,
    title: d.title && d.title.trim() ? d.title : "Untitled character",
    tool: d.tool,
    systemName: isToolId(d.tool) ? TOOLS[d.tool].systemName : "",
  }));

  return (
    // NO PAGE HEADER, and this is the only page without one. The section labels
    // carry all the structure this page needs.
    <div className="mx-auto w-full max-w-5xl px-5 py-8">
      <section aria-labelledby="home-characters">
        <h2
          id="home-characters"
          className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]"
        >
          My Characters
        </h2>
        {characters.length === 0 ? (
          <p className="rounded-lg border border-[var(--border)] bg-[var(--panel)] px-5 py-4 text-sm text-[var(--muted)]">
            No characters yet — pick a game below and roll one up.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c) => (
              <li key={c.id} className="min-w-0">
                {/* Plain <a>, NOT next/link: /tools/… is a route handler that
                    builds a full standalone sheet document; Link would prefetch
                    it (auth + DB + a 60–520 KB render) for every card. */}
                <a
                  href={`/tools/${c.tool}/${c.id}`}
                  className="flex min-w-0 flex-col rounded-lg border border-[var(--border)] bg-[var(--panel)] px-4 py-3 transition-colors hover:border-[var(--gold)] hover:bg-[var(--panel-2)]"
                >
                  <span className="truncate text-base font-bold uppercase tracking-[0.1em] text-[var(--text)]">
                    {c.title}
                  </span>
                  <span className="mt-0.5 truncate text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {c.systemName}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="home-systems" className="mt-10">
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
        {/* .home-tools rather than .home-grid: the same flex wrap, but two across
            at every width instead of the games' 2/3/4, so a pair of tools fills
            its row rather than sitting as two quarter-width stubs under fourteen
            games. Both classes are in app/globals.css. */}
        <ul className="home-grid home-tools">
          {TOOLS_NAV.map((t) => (
            <li key={t.href}>
              {/* The Map Maker is a route handler serving its own HTML document,
                  not a Next page, so these are plain <a> — a next/link client
                  navigation to it would be wrong. */}
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
