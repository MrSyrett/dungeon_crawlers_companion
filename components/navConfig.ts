// Shared, client-safe navigation config for the site-wide top navbar (SiteNav).
//
// Kept free of any server-only imports (no node:fs, no prisma) so it can be
// pulled into client components. The per-system Compendium links are the old
// per-system reference pages, with each system's standalone "Rules" page
// removed (2026-10 homepage cleanup). "Rulebooks" (the PDF shelf at /rules) is
// appended for every system that has one — all of them except D&D, which ships
// no rulebook PDFs.

import type { SystemKey } from "./systemStore";

export type NavLink = { href: string; label: string };

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
    { href: "/dnd/bestiary", label: "Bestiary" },
    { href: "/dnd/classes", label: "Classes" },
    { href: "/dnd/species", label: "Species" },
    { href: "/dnd/backgrounds", label: "Backgrounds & Feats" },
    { href: "/dnd/spells", label: "Spells" },
    { href: "/dnd/equipment", label: "Equipment" },
  ],
  DCC: [
    { href: "/dcc/classes", label: "Classes" },
    { href: "/dcc/races", label: "Races" },
    { href: "/dcc/skills-and-spells", label: "Skills & Spells" },
    { href: "/dcc/loot", label: "Loot" },
    { href: "/dcc/bestiary", label: "Bestiary" },
    { href: "/dcc/options", label: "Options" },
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
    { href: "/d62e/skills", label: "Skills" },
    { href: "/d62e/templates", label: "Templates" },
    { href: "/d62e/equipment", label: "Equipment" },
    { href: "/d62e/traits", label: "Traits" },
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
    { href: "/mmrpg/origins", label: "Origins & Occupations" },
    { href: "/mmrpg/traits", label: "Traits & Tags" },
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

// Right-aligned Tools group. Order as requested: OBR (the Owlbear Rodeo setup,
// still served at /vtt), Token Maker, Map Maker, Campaigns, GM Screen.
export const TOOLS_NAV: NavLink[] = [
  { href: "/vtt", label: "OBR" },
  { href: "/token-maker", label: "Token Maker" },
  { href: "/dungeon-map", label: "Map Maker" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/gm-screen", label: "GM Screen" },
];

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
