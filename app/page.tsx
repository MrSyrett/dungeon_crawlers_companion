import { redirect } from "next/navigation";
import HomeSystems from "@/components/HomeSystems";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, CHARACTER_TOOL_IDS, isToolId } from "@/lib/tools";
import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { getHiddenSystemKeys } from "@/lib/systems";
import { readCharMeta } from "@/lib/char-meta";

// THE HOME PAGE — where the navbar logo goes.
//
// A launchpad that leads with YOUR stuff: "My Characters" — every sheet you've
// made, GROUPED BY SYSTEM and wearing that system's identity (its accent, display
// face and cover texture, the same tokens the game tiles use) — then "Choose a
// Game" to start something new, then the two system-agnostic tools. The
// per-system dashboards still own the full per-system lists (characters AND
// adventures, with Launch VTT and delete); this is the cross-system quick-access
// those per-system, one-at-a-time pages could never be.
//
// Signed out still goes to /login — this is a page for people who are already in.
//
// It wears NO single system's skin: "/" is matched by isChromePath in
// components/SiteNav.tsx, so a system's ground/faces stay off the page as a whole.
// The per-system styling here is scoped to each group via its own data-sys, so
// fourteen systems can sit on one neutral page at once — the game tiles already do
// exactly this.

export const dynamic = "force-dynamic";

// ONLY the tools that need no system choice (the GM Screen, Rulebooks and
// Campaigns are per-system in practice and live in the navbar, where a system is
// always in scope).
const TOOLS_NAV: { href: string; label: string; tool: "map" | "token" }[] = [
  { href: "/dungeon-map", label: "Map Maker", tool: "map" },
  { href: "/token-maker", label: "Token Maker", tool: "token" },
];

type CharCard = { id: string; tool: string; name: string; cls: string; level: number | null; campaign: string | null };

// "LV 3 · Fighter", "Smuggler", "Tier 2 · Meta-Human" — level (when the system
// has one) then the class / equivalent, matching the campaigns roster's chips.
function metaLine(level: number | null, cls: string): string {
  return [level !== null ? `LV ${level}` : "", cls].filter(Boolean).join(" · ");
}

// Wordmarks that are more than one colour, split into the pieces the stylesheet
// colours (.tn-1 / .tn-2 under .roster-sys[data-sys="…"] in app/globals.css) —
// the same hook the game tiles use (NAME_PARTS in components/HomeSystems.tsx).
// Dungeon Crawler Carl is the only one today: gold "Dungeon", magenta "Crawler
// Carl". The parts must spell the system's own name exactly.
const NAME_PARTS: Partial<Record<SystemKey, [string, string]>> = {
  DCC: ["Dungeon", "Crawler Carl"],
};

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenKeys = await getHiddenSystemKeys();

  // Every character sheet this user has made, newest first.
  const charDocs = await prisma.document.findMany({
    where: { userId: user.id, tool: { in: CHARACTER_TOOL_IDS } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, tool: true, data: true, linkedCampaignId: true },
  });
  type CharDoc = { id: string; title: string; tool: string; data: unknown; linkedCampaignId: string | null };
  const chars = charDocs as CharDoc[];

  // Name the campaign each linked sheet belongs to — one query over just the ids
  // the sheets reference (the campaign line on a character card). Whether you own
  // or merely play in it, the sheet carries the link; we only need the name.
  const campaignIds = [...new Set(chars.map((d) => d.linkedCampaignId).filter((v): v is string => !!v))];
  const campName = new Map<string, string>();
  if (campaignIds.length) {
    const camps = (await prisma.campaign.findMany({
      where: { id: { in: campaignIds } },
      select: { id: true, name: true },
    })) as { id: string; name: string }[];
    for (const c of camps) campName.set(c.id, c.name);
  }

  // ── Group My Characters by system (newest-first order preserved) ──
  const charsBySystem = new Map<SystemKey, CharCard[]>();
  for (const d of chars) {
    if (!isToolId(d.tool)) continue;
    const key = TOOLS[d.tool].system;
    const meta = readCharMeta(d.data, d.title || "");
    const card: CharCard = {
      id: d.id,
      tool: d.tool,
      name: meta?.name || (d.title && d.title.trim() ? d.title : "Untitled character"),
      cls: meta?.cls || "",
      level: meta?.level ?? null,
      campaign: d.linkedCampaignId ? campName.get(d.linkedCampaignId) ?? null : null,
    };
    const bucket = charsBySystem.get(key);
    if (bucket) bucket.push(card);
    else charsBySystem.set(key, [card]);
  }

  // SYSTEMS is the deliberate home order; keep only the systems that have content.
  const charSystems = SYSTEMS.filter((s) => charsBySystem.has(s.key));

  return (
    // NO PAGE HEADER, and this is the only page without one. The section labels
    // carry all the structure this page needs.
    <div className="home-roster mx-auto w-full max-w-5xl px-5 py-8">
      <section aria-labelledby="home-characters">
        <h2 id="home-characters" className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
          My Characters
        </h2>
        {charSystems.length === 0 ? (
          <p className="roster-empty">No characters yet — pick a game below and roll one up.</p>
        ) : (
          charSystems.map((s) => (
            <section key={s.key} className="roster-sys" data-sys={s.key}>
              {/* The label is wrapped so the flex divider line (::after) doesn't
                  gap-space the two-colour DCC wordmark's halves apart. */}
              <h3 className="roster-sys-name">
                <span className="roster-sys-label">
                  {NAME_PARTS[s.key] ? (
                    <>
                      <span className="tn-1">{NAME_PARTS[s.key]![0]}</span>{" "}
                      <span className="tn-2">{NAME_PARTS[s.key]![1]}</span>
                    </>
                  ) : (
                    s.name
                  )}
                </span>
              </h3>
              <ul className="roster-cards">
                {charsBySystem.get(s.key)!.map((c) => {
                  const ml = metaLine(c.level, c.cls);
                  return (
                    <li key={c.id} className="min-w-0">
                      {/* Plain <a>, NOT next/link: /tools/… is a route handler that
                          builds a full standalone sheet; Link would prefetch it. */}
                      <a href={`/tools/${c.tool}/${c.id}`} className="roster-card">
                        <span className="roster-card-name">{c.name}</span>
                        {ml ? <span className="roster-card-meta">{ml}</span> : null}
                        <span className="roster-card-camp">{c.campaign ?? "No campaign"}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </section>

      <section aria-labelledby="home-systems" className="mt-10">
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
        <ul className="home-grid home-tools">
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
