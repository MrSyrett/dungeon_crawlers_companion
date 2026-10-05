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
// Map Maker and GM Screen are route handlers (standalone HTML), hence `hard`.
// Order: Campaigns first (where a table starts), the makers in the middle, GM
// Screen last so it sits at the right-hand end of the bar.
export const TOOLS_NAV: NavLink[] = [
  { href: "/campaigns", label: "Campaigns" },
  { href: "/dungeon-map", label: "Map Maker", hard: true },
  { href: "/token-maker", label: "Token Maker" },
  { href: "/gm-screen", label: "GM Screen", hard: true },
];

// When the user switches system while on a compendium page, keep them in the
// compendium: the new system's page with the same label (Classes → Classes,
// Bestiary → Bestiary) when it has one, else its first reference page. Returns
// null when the current path isn't a compendium page (caller decides).
export function compendiumCounterpart(pathname: string, to: SystemKey): string | null {
  const from = systemForPath(pathname);
  if (!from) return null;
  const current = (COMPENDIUM[from] ?? []).find((l) => l.href === pathname);
  const target = COMPENDIUM[to] ?? [];
  if (!target.length) return null;
  if (current) {
    const same = target.find((l) => l.label === current.label);
    if (same) return same.href;
  }
  return target[0].href;
}

// Paths that filter themselves by the selected system: switching system there
// should NOT bounce the user to the dashboard (the Rulebooks shelf even says
// "switch systems above" and then filters itself; Campaigns shows that system's
// campaigns and would be a strange place to be thrown out of).
export const STAY_ON_SWITCH = new Set<string>(["/rules", "/campaigns"]);

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
