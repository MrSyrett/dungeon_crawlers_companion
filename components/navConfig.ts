// Shared, client-safe navigation config for the site-wide top navbar (SiteNav).
//
// Kept free of any server-only imports (no node:fs, no prisma) so it can be
// pulled into client components. The per-system Compendium links are the old
// per-system reference pages, with each system's standalone "Rules" page
// removed (2026-10 homepage cleanup). "Rulebooks" (the PDF shelf at /rules) is
// appended for every system that has one — all of them except D&D, which ships
// no rulebook PDFs.

import type { SystemKey } from "./systemStore";

// `hard`: the target is a route handler that returns a full standalone HTML
// document (the GM Screen, the Map Maker), not a Next page — it must be a plain
// <a> (a full load), never a <Link> (whose RSC fetch/prefetch would build the
// whole document for nothing and then fall back to a hard navigation anyway).
export type NavLink = { href: string; label: string; hard?: boolean };

// Per-system Compendium links (Rules pages intentionally omitted).
export const COMPENDIUM: Record<SystemKey, NavLink[]> = {
  SD: [
    { href: "/classes", label: "Classes" },
    { href: "/ancestries", label: "Ancestries" },
    { href: "/backgrounds", label: "Backgrounds" },
    { href: "/spells", label: "Spells" },
    { href: "/gear", label: "Gear" },
    { href: "/bestiary", label: "Bestiary" },
  ],
  ICRPG: [
    { href: "/icrpg/worlds", label: "Worlds" },
    { href: "/icrpg/heroes", label: "Heroes" },
    { href: "/icrpg/loot", label: "Loot" },
    { href: "/icrpg/spells", label: "Spells" },
    { href: "/icrpg/bestiary", label: "Bestiary" },
  ],
  NIM: [
    { href: "/nimble/classes", label: "Classes" },
    { href: "/nimble/ancestries", label: "Ancestries" },
    { href: "/nimble/equipment", label: "Equipment" },
    { href: "/nimble/spells", label: "Spells" },
    { href: "/nimble/bestiary", label: "Bestiary" },
  ],
  DND: [
    { href: "/dnd/classes", label: "Classes" },
    { href: "/dnd/species", label: "Species" },
    { href: "/dnd/backgrounds", label: "Backgrounds" },
    { href: "/dnd/feats", label: "Feats" },
    { href: "/dnd/spells", label: "Spells" },
    { href: "/dnd/equipment", label: "Equipment" },
    { href: "/dnd/bestiary", label: "Bestiary" },
  ],
  DCC: [
    { href: "/dcc/classes", label: "Classes" },
    { href: "/dcc/races", label: "Races" },
    { href: "/dcc/skills-and-spells", label: "Skills & Spells" },
    { href: "/dcc/loot", label: "Loot" },
    { href: "/dcc/options", label: "Options" },
    { href: "/dcc/bestiary", label: "Bestiary" },
  ],
  KOB: [
    { href: "/kob/tropes", label: "Tropes" },
    { href: "/kob/strengths", label: "Strengths & Flaws" },
    { href: "/kob/questions", label: "Questions" },
    { href: "/kob/magic", label: "Magic" },
    { href: "/kob/capes", label: "Capes & Powers" },
  ],
  CO: [
    { href: "/candela/roles", label: "Roles" },
    { href: "/candela/actions", label: "Actions" },
    { href: "/candela/abilities", label: "Abilities" },
    { href: "/candela/gear", label: "Gear" },
  ],
  ACE: [
    { href: "/ace/roles", label: "Roles" },
    { href: "/ace/focuses", label: "Focuses" },
    { href: "/ace/traits", label: "Traits" },
    { href: "/ace/gear", label: "Gear" },
    { href: "/ace/extras", label: "Bestiary" },
  ],
  SW: [
    { href: "/sw/templates", label: "Templates" },
    { href: "/sw/skills", label: "Skills" },
    { href: "/sw/equipment", label: "Equipment" },
    { href: "/sw/starships", label: "Starships" },
    { href: "/sw/characters", label: "Bestiary" },
  ],
  D62E: [
    { href: "/d62e/templates", label: "Templates" },
    { href: "/d62e/skills", label: "Skills" },
    { href: "/d62e/traits", label: "Options" },
    { href: "/d62e/equipment", label: "Equipment" },
    { href: "/d62e/bestiary", label: "Bestiary" },
  ],
  YZE: [
    { href: "/yze/skills", label: "Skills" },
    { href: "/yze/weapons", label: "Weapons" },
    { href: "/yze/gear", label: "Gear" },
    { href: "/yze/combat", label: "Combat" },
    { href: "/yze/alien", label: "Alien" },
  ],
  MMRPG: [
    { href: "/mmrpg/origins", label: "Origins" },
    { href: "/mmrpg/occupations", label: "Occupations" },
    { href: "/mmrpg/traits", label: "Traits" },
    { href: "/mmrpg/tags", label: "Tags" },
    { href: "/mmrpg/powers", label: "Powers" },
    { href: "/mmrpg/equipment", label: "Equipment" },
    { href: "/mmrpg/characters", label: "Characters" },
  ],
  JLU: [
    { href: "/jlu/powers", label: "Powers" },
    { href: "/jlu/origins", label: "Origins & Archetypes" },
    { href: "/jlu/gear", label: "Gear & Traits" },
    { href: "/jlu/bestiary", label: "Bestiary" },
  ],
  GB: [
    { href: "/gb/talents", label: "Traits & Talents" },
    { href: "/gb/gear", label: "Gear & Goals" },
    { href: "/gb/bestiary", label: "Ghosts & Extras" },
  ],
};

export const RULEBOOKS_LINK: NavLink = { href: "/rules", label: "Rulebooks" };

// D&D ships no rulebook PDFs, so it gets no Rulebooks entry.
export const SYSTEMS_WITHOUT_RULEBOOKS: SystemKey[] = ["DND"];

// The Compendium dropdown for a system: its reference pages, plus Rulebooks
// when that system has any.
export function compendiumFor(system: SystemKey): NavLink[] {
  const base = COMPENDIUM[system] ?? [];
  return SYSTEMS_WITHOUT_RULEBOOKS.includes(system) ? base : [...base, RULEBOOKS_LINK];
}

// Per-system Homebrew hub. Shadowdark's lives at the top-level /homebrew;
// the others at /<system>/homebrew. JLU and Ghostbusters have no homebrew hub
// yet, so they get no Homebrew nav link.
export const HOMEBREW: Partial<Record<SystemKey, string>> = {
  SD: "/homebrew",
  DCC: "/dcc/homebrew",
  ACE: "/ace/homebrew",
  KOB: "/kob/homebrew",
  NIM: "/nimble/homebrew",
  SW: "/sw/homebrew",
  DND: "/dnd/homebrew",
  D62E: "/d62e/homebrew",
  ICRPG: "/icrpg/homebrew",
  CO: "/candela/homebrew",
  YZE: "/yze/homebrew",
  MMRPG: "/mmrpg/homebrew",
};

export function homebrewFor(system: SystemKey): string | null {
  return HOMEBREW[system] ?? null;
}

// The Tools group. Shown as individual nav links (not a dropdown), since they
// never change by system. Naming (site-wide): "VTT" is OUR first-party tabletop
// at /play — every button that opens it says "Open VTT", and the page's own
// crumb and tab title say VTT. "OBR" is the external Owlbear Rodeo integration.
//
// There is no OBR link here any more. Owlbear setup was a page at /vtt — a path
// that was never our VTT, which is the crossed wire this comment used to warn
// about — and it is now the Owlbear Rodeo section of /account: two install links
// and one access code. Nothing under /vtt is a page now; what remains there is
// the route handlers the Owlbear extension itself calls (/vtt/gm-screen and
// /vtt/sheet/[id]) plus static assets under public/vtt. Don't add a page there.
//
// Map Maker is a route handler (standalone HTML), hence `hard`.
//
// THE GM SCREEN IS NOT HERE ANY MORE, and that is the whole point of it. A GM
// Screen is only meaningful once it is linked to a campaign: it carries that
// campaign's party, its shared roll log, its board and its system's data. A nav
// link could not supply one, so it opened whichever board happened to be
// last-used — which is how a GM ends up running one table on another table's
// screen. The way in is now the Open GM Screen button on each campaign card
// (components/OpenGmScreenButton.tsx), which names the campaign it will open,
// and the screen is locked to it once there.
//
// CAMPAIGNS IS NOT HERE ANY MORE. It was, back when a campaign belonged to no
// system — which is what this group is for. Campaigns are per-system now (the page
// shows one system's campaigns and creates in that system), so it sits with the
// other per-system destinations instead: Characters, Adventures, CAMPAIGNS,
// Compendium, Homebrew. Grouping it with the Map Maker said it was system-agnostic,
// which stopped being true.
//
// It is also deliberately absent from the home page's tool list (app/page.tsx) for
// the same reason — that page is the system-agnostic surface.
export const TOOLS_NAV: NavLink[] = [
  { href: "/dungeon-map", label: "Map Maker", hard: true },
  { href: "/token-maker", label: "Token Maker" },
];

// The per-system page that is a LINK rather than a dashboard view. Characters and
// Adventures are view toggles on the dashboard; this is a real route, so each bar
// renders it as an anchor beside them.
export const CAMPAIGNS_LINK: NavLink = { href: "/campaigns", label: "Campaigns" };

// WHAT EACH REFERENCE PAGE IS ABOUT, so switching system can find the equivalent
// page even when the two systems call it something different.
//
// Exact label matching alone is not enough: only 150 of the 936 possible
// compendium switches share a label, so 786 of them used to dump you on the new
// system's FIRST page. "Gear & Goals" (Ghostbusters) and "Equipment" (Marvel) are
// the same shelf; nothing in the labels said so.
//
// A label may list more than one concept, in priority order, for pages that
// genuinely cover two things — "Skills & Spells" is DCC's magic page and its skills
// page. Matching tries the current page's concepts in order, so the primary one
// wins when the target system separates them.
//
// KEEP THIS IN STEP WITH COMPENDIUM. A label that is missing here still works — it
// falls back to the first page, which is the old behaviour — but it stops finding
// its equivalent, silently. If you add a system, add its labels.
const CONCEPT: Record<string, string[]> = {
  // creatures and NPC rosters
  Bestiary: ["creatures"],
  "Ghosts & Extras": ["creatures"],
  Alien: ["creatures"],
  Characters: ["creatures"],
  // what you are
  Classes: ["archetype"],
  Roles: ["archetype"],
  Templates: ["archetype"],
  Tropes: ["archetype"],
  Heroes: ["archetype"],
  Origins: ["archetype"],
  "Origins & Archetypes": ["archetype", "ancestry"],
  // where you come from
  Ancestries: ["ancestry"],
  Species: ["ancestry"],
  Races: ["ancestry"],
  Backgrounds: ["background"],
  Questions: ["background"],
  Occupations: ["background", "archetype"],
  // what you carry
  Gear: ["gear"],
  Equipment: ["gear"],
  Loot: ["gear"],
  Weapons: ["gear"],
  "Gear & Goals": ["gear"],
  "Gear & Traits": ["gear", "traits"],
  // what you cast
  Spells: ["magic"],
  Magic: ["magic"],
  Powers: ["magic"],
  "Capes & Powers": ["magic"],
  "Skills & Spells": ["magic", "skills"],
  // what you can do
  Skills: ["skills"],
  Actions: ["skills"],
  Abilities: ["skills", "magic"],
  // how you are distinctive
  Traits: ["traits"],
  Feats: ["traits"],
  Options: ["traits"],
  "Strengths & Flaws": ["traits"],
  Tags: ["traits"],
  "Traits & Talents": ["traits"],
  Focuses: ["traits"],
  // one-offs, which have no equivalent anywhere and fall back by design
  Worlds: ["setting"],
  Starships: ["vehicles"],
  Combat: ["rules"],
};

// When the user switches system while on a compendium page, keep them in the
// compendium. In order: the new system's page with the SAME LABEL (Bestiary →
// Bestiary), then the nearest page by CONCEPT (Gear & Goals → Equipment), then its
// first reference page. Returns null when the current path isn't a compendium page
// (caller decides).
export function compendiumCounterpart(pathname: string, to: SystemKey): string | null {
  const from = systemForPath(pathname);
  if (!from) return null;
  const current = (COMPENDIUM[from] ?? []).find((l) => l.href === pathname);
  const target = COMPENDIUM[to] ?? [];
  if (!target.length) return null;
  if (current) {
    const same = target.find((l) => l.label === current.label);
    if (same) return same.href;
    // Nearest by concept. The current page's concepts are tried in priority order,
    // and within each, a target page whose PRIMARY concept matches beats one that
    // only lists it second — so DCC's "Skills & Spells" prefers a system's Spells
    // page over its Skills page, and reaches Skills when there is no magic page.
    for (const c of CONCEPT[current.label] ?? []) {
      const primary = target.find((l) => (CONCEPT[l.label] ?? [])[0] === c);
      if (primary) return primary.href;
      const secondary = target.find((l) => (CONCEPT[l.label] ?? []).includes(c));
      if (secondary) return secondary.href;
    }
  }
  return target[0].href;
}

// Paths that filter themselves by the selected system: switching system there
// should NOT bounce the user to the dashboard (the Rulebooks shelf even says
// "switch systems above" and then filters itself; Campaigns shows that system's
// campaigns and would be a strange place to be thrown out of).
export const STAY_ON_SWITCH = new Set<string>([
  "/rules",
  "/campaigns",
  // Not tied to a system at all, so switching one should change the label and
  // leave you where you are. These used to fall through to the dashboard, which
  // threw you out of a tool you were in the middle of using.
  "/token-maker",
  "/account",
]);

// Infer the system a compendium route belongs to, so the navbar reflects the
// right system when you land directly on e.g. /dcc/classes. Returns null when a
// path isn't a system compendium page (the navbar then keeps the stored system).
const PREFIX_SYSTEM: { prefix: string; key: SystemKey }[] = [
  { prefix: "/dcc/", key: "DCC" },
  { prefix: "/ace/", key: "ACE" },
  { prefix: "/kob/", key: "KOB" },
  { prefix: "/nimble/", key: "NIM" },
  { prefix: "/sw/", key: "SW" },
  { prefix: "/dnd/", key: "DND" },
  { prefix: "/d62e/", key: "D62E" },
  { prefix: "/icrpg/", key: "ICRPG" },
  { prefix: "/candela/", key: "CO" },
  { prefix: "/yze/", key: "YZE" },
  { prefix: "/mmrpg/", key: "MMRPG" },
  { prefix: "/jlu/", key: "JLU" },
  { prefix: "/gb/", key: "GB" },
];

// Shadowdark's reference pages live at top-level routes (historical), so match
// them exactly rather than by prefix.
const SD_PATHS = new Set(["/classes", "/ancestries", "/backgrounds", "/spells", "/gear", "/bestiary"]);

export function systemForPath(pathname: string): SystemKey | null {
  if (SD_PATHS.has(pathname)) return "SD";
  const hit = PREFIX_SYSTEM.find((p) => pathname.startsWith(p.prefix));
  return hit ? hit.key : null;
}
