import { redirect } from "next/navigation";
import HomeSystems from "@/components/HomeSystems";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, CHARACTER_TOOL_IDS, isToolId } from "@/lib/tools";
import { SYSTEMS, isSystemKey, type SystemKey } from "@/components/systemStore";
import { getHiddenSystemKeys } from "@/lib/systems";
import { readCharMeta } from "@/lib/char-meta";

// THE HOME PAGE — where the navbar logo goes.
//
// A launchpad that leads with YOUR stuff. Two rosters first — "My Characters"
// and "My Campaigns" — each GROUPED BY SYSTEM and wearing that system's identity
// (its accent, from SYSTEMS[].accent, and its display face, borrowed from the
// game tiles' --tile-face), then "Choose a Game" to start something new, then the
// two system-agnostic tools. The per-system dashboards still own the full
// per-system lists (characters AND adventures, with Launch VTT and delete) and
// the Campaigns page still owns GM management; this is the cross-system
// quick-access those per-system, one-at-a-time pages could never be.
//
// Signed out still goes to /login — this is a page for people who are already in.
//
// It wears NO single system's skin: "/" is matched by isChromePath in
// components/SiteNav.tsx, so a system's ground/faces stay off the page as a whole.
// The per-system styling here is scoped to each group via its own data-sys +
// inline --rsys, so fourteen systems can sit on one neutral page at once — the
// game tiles already do exactly this.

export const dynamic = "force-dynamic";

// ONLY the tools that need no system choice (the GM Screen, Rulebooks and
// Campaigns are per-system in practice and live in the navbar, where a system is
// always in scope).
const TOOLS_NAV: { href: string; label: string; tool: "map" | "token" }[] = [
  { href: "/dungeon-map", label: "Map Maker", tool: "map" },
  { href: "/token-maker", label: "Token Maker", tool: "token" },
];

type PartyMember = { id: string; name: string; cls: string; level: number | null };
type CharCard = { id: string; tool: string; name: string; cls: string; level: number | null; campaign: string | null };
type CampCard = { id: string; name: string; owner: boolean; party: PartyMember[] };

// "LV 3 · Fighter", "Smuggler", "Tier 2 · Meta-Human" — level (when the system
// has one) then the class / equivalent, matching the campaigns roster's chips.
function metaLine(level: number | null, cls: string): string {
  return [level !== null ? `LV ${level}` : "", cls].filter(Boolean).join(" · ");
}

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenKeys = await getHiddenSystemKeys();

  // My stuff, in parallel: every character sheet this user has made, and every
  // campaign they OWN. (Campaigns they've only joined are found from their
  // sheets' links, below.)
  const [charDocs, ownedCampaigns] = await Promise.all([
    prisma.document.findMany({
      where: { userId: user.id, tool: { in: CHARACTER_TOOL_IDS } },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, tool: true, data: true, linkedCampaignId: true },
    }),
    prisma.campaign.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, system: true },
    }),
  ]);

  type CharDoc = { id: string; title: string; tool: string; data: unknown; linkedCampaignId: string | null };
  type CampRow = { id: string; name: string; system: string | null };
  const chars = charDocs as CharDoc[];
  const owned = ownedCampaigns as CampRow[];

  // Campaigns the user has JOINED (a character is linked) but does not own.
  const ownedIds = new Set(owned.map((c) => c.id));
  const linkedIds = new Set<string>();
  for (const d of chars) if (d.linkedCampaignId) linkedIds.add(d.linkedCampaignId);
  const joinedIds = [...linkedIds].filter((id) => !ownedIds.has(id));
  const joined = joinedIds.length
    ? ((await prisma.campaign.findMany({
        where: { id: { in: joinedIds } },
        orderBy: { name: "asc" },
        select: { id: true, name: true, system: true },
      })) as CampRow[])
    : [];

  // Each shown campaign's party = EVERY character sheet linked to it, from any
  // player (one indexed query, grouped in JS). The names/classes/levels come
  // from the sheets' own bodies via the shared reader.
  const allCampaignIds = [...ownedIds, ...joinedIds];
  const partyDocs = allCampaignIds.length
    ? ((await prisma.document.findMany({
        where: { tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { in: allCampaignIds } },
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, data: true, linkedCampaignId: true },
      })) as { id: string; title: string; data: unknown; linkedCampaignId: string | null }[])
    : [];
  const partyFor = new Map<string, PartyMember[]>();
  for (const id of allCampaignIds) partyFor.set(id, []);
  for (const d of partyDocs) {
    const cid = d.linkedCampaignId;
    if (!cid || !partyFor.has(cid)) continue;
    const meta = readCharMeta(d.data, d.title || "");
    if (!meta) continue;
    partyFor.get(cid)!.push({ id: d.id, name: meta.name, cls: meta.cls, level: meta.level });
  }

  // Campaign-name lookup, so a character can name the campaign it's part of.
  const campName = new Map<string, string>();
  for (const c of owned) campName.set(c.id, c.name);
  for (const c of joined) campName.set(c.id, c.name);

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

  // ── Group My Campaigns by system (owned first, then joined) ──
  const campsBySystem = new Map<SystemKey, CampCard[]>();
  const pushCamp = (sys: string | null, card: CampCard) => {
    if (!isSystemKey(sys)) return; // a campaign with no / retired system has no group
    const bucket = campsBySystem.get(sys);
    if (bucket) bucket.push(card);
    else campsBySystem.set(sys, [card]);
  };
  for (const c of owned) pushCamp(c.system, { id: c.id, name: c.name, owner: true, party: partyFor.get(c.id) ?? [] });
  for (const c of joined) pushCamp(c.system, { id: c.id, name: c.name, owner: false, party: partyFor.get(c.id) ?? [] });

  // SYSTEMS is the deliberate home order; keep only the systems that have content.
  const charSystems = SYSTEMS.filter((s) => charsBySystem.has(s.key));
  const campSystems = SYSTEMS.filter((s) => campsBySystem.has(s.key));

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
              <h3 className="roster-sys-name">{s.name}</h3>
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

      <section aria-labelledby="home-campaigns" className="mt-10">
        <h2 id="home-campaigns" className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
          My Campaigns
        </h2>
        {campSystems.length === 0 ? (
          <p className="roster-empty">
            No campaigns yet — create one from a game&rsquo;s Campaigns page, or join a table from your character sheet.
          </p>
        ) : (
          campSystems.map((s) => (
            <section key={s.key} className="roster-sys" data-sys={s.key}>
              <h3 className="roster-sys-name">{s.name}</h3>
              <ul className="roster-cards">
                {campsBySystem.get(s.key)!.map((c) => (
                  <li key={c.id} className="min-w-0">
                    <div className="roster-card roster-card--camp">
                      <span className="roster-card-name">
                        {c.name}
                        {c.owner ? <span className="roster-gm" title="You run this campaign">GM</span> : null}
                      </span>
                      {c.party.length ? (
                        <div className="roster-party">
                          {c.party.map((m) => {
                            const ml = metaLine(m.level, m.cls);
                            return (
                              <span key={m.id} className="roster-chip">
                                {m.name}
                                {ml ? <span className="m"> {ml}</span> : null}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="roster-card-camp">No characters linked yet.</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </section>

      <section aria-labelledby="home-systems" className="mt-10">
        <h2 id="home-systems" className="font-label mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
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
