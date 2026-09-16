"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { TALENT_TARGETS } from "@/lib/effects";

// ─────────────────────────────────────────────────────────────────────────────
// A generic, schema-driven homebrew editor shared by the lighter game systems
// (ace, kob, nimble, sw). It mirrors DccHomebrewEditor's look and flow but
// carries no system-specific coupling: the caller passes a `schema` describing
// the form and a `kind` (the HbType). Whatever the form POSTs is handed straight
// to the matching lib/homebrew normaliser, which is the real validator.
//
// Accent colour is themed per system via the `accent` prop (a CSS var name like
// "--nimble"); it's exposed as `--hb-accent` on the container so the static
// Tailwind arbitrary-value classes below pick it up at runtime.
// ─────────────────────────────────────────────────────────────────────────────

export type CampaignRef = { id: string; name: string; code: string };
export type HomebrewRecord = {
  id: string;
  type: string;
  name: string;
  campaignIds: string[];
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean;
};

type Data = Record<string, unknown>;
type Opt = readonly [string, string];
type BaseField = { key: string; label: string; full?: boolean; help?: string };
export type ScalarField =
  | (BaseField & { type: "text"; placeholder?: string; maxLength?: number; datalist?: readonly string[] })
  | (BaseField & { type: "textarea"; placeholder?: string; maxLength?: number })
  | (BaseField & { type: "number"; placeholder?: string })
  | (BaseField & { type: "select"; options: readonly Opt[]; empty?: string })
  | (BaseField & { type: "checkbox" });
export type Field =
  | ScalarField
  | (BaseField & { type: "stringList"; placeholder?: string; addLabel?: string })
  | (BaseField & { type: "objectList"; addLabel?: string; fields: readonly ScalarField[] })
  // ── Mechanical-effect fields (reusable: bonuses / effect-rows / triad / titles) ──
  // Flat bonuses: rows of { amount, target } from BONUS_TARGET_OPTS.
  | (BaseField & { type: "bonuses"; addLabel?: string })
  // Rows of { <rowKey>, text, choose?, effects[] } — a trait/feature/talent that
  // carries mechanical effects (and optionally a "choose one" flag).
  | (BaseField & {
      type: "effectRows";
      rowKey: string; rowKeyLabel: string; rowKeyPlaceholder?: string;
      textLabel?: string; withChoose?: boolean; addLabel?: string;
    })
  // Triad access this archetype grants (Body / Mind / Soul checkboxes).
  | (BaseField & { type: "triad" })
  // Titles by Motivation, 5 tiers each. Stored on Lawful/Neutral/Chaotic keys.
  | (BaseField & { type: "titles" });
export type Schema = {
  title: string; // accordion header ("My Homebrew Weapons")
  noun: string; // singular ("Weapon")
  fields: readonly Field[];
  blank: () => Data;
  toForm: (data: Data) => Data;
  summary: (data: Data) => string; // right-hand meta on the list row
};

const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const btnAccent =
  "rounded border border-[var(--hb-accent)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--hb-accent)] hover:bg-[var(--hb-accent)] hover:text-white disabled:opacity-50";
const miniBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

// ── shared option lists ──────────────────────────────────────────────────────
const SETTING_OPTS: readonly Opt[] = [["core", "Core"], ["spirits", "Spirits"], ["montana", "Montana"], ["strange", "Strange"], ["beam", "Beam"], ["orcs", "Orcs"], ["domes", "Domes"], ["bite", "Bite"], ["aaah", "Aaah!"]];
const SW_BOOK_OPTS: readonly Opt[] = [["core", "Core"], ["sourcebook", "Sourcebook"], ["companion", "Companion"]];
const KOB_BOOK_OPTS: readonly Opt[] = [["bikes", "Kids on Bikes"], ["brooms", "Kids on Brooms"], ["capes", "Kids in Capes"]];
const KOB_DIE_OPTS: readonly Opt[] = [["", "—"], ["4", "d4"], ["6", "d6"], ["8", "d8"], ["10", "d10"], ["12", "d12"], ["20", "d20"]];
const ACE_STAT_OPTS: readonly Opt[] = [["Smarts", "Smarts"], ["Moves", "Moves"], ["Style", "Style"], ["Brawn", "Brawn"], ["Power", "Power"]];
const NIM_SCHOOL_OPTS: readonly Opt[] = [["Fire", "Fire"], ["Ice", "Ice"], ["Lightning", "Lightning"], ["Wind", "Wind"], ["Radiant", "Radiant"], ["Necrotic", "Necrotic"], ["Utility", "Utility"]];
const SW_ATTRS = ["Dexterity", "Knowledge", "Mechanical", "Perception", "Strength", "Technical"] as const;
const KOB_STAT_KEYS = ["Brains", "Brawn", "Fight", "Flight", "Charm", "Grit"] as const;
const D62E_GENRE_OPTS: readonly Opt[] = [["core", "Core"], ["fantasy", "Fantasy"], ["scifi", "Sci-Fi"], ["superhero", "Superhero"]];
const D62E_ATTRS = ["Agility", "Brawn", "Knowledge", "Perception"] as const;
const ICRPG_WORLD_OPTS: readonly Opt[] = [["core", "Core"], ["alfheim", "Alfheim"], ["warpshell", "Warp Shell"], ["ghostmountain", "Ghost Mountain"], ["vigilantecity", "Vigilante City"], ["bloodandsnow", "Blood & Snow"]];
const ICRPG_STAT_KEYS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;

// ── Mechanical-effect vocabularies (shared with lib/homebrew normalisers) ────
// Flat bonus targets — mirror BONUS_TARGETS in lib/homebrew.ts (kept local so
// this client component never imports the prisma-bound lib/homebrew module).
const BONUS_TARGET_OPTS: readonly Opt[] = [
  ["ac", "AC"], ["hp", "HP"],
  ["meleeAtk", "Melee Attacks"], ["meleeDmg", "Melee Damage"],
  ["rangedAtk", "Ranged Attacks"], ["rangedDmg", "Ranged Damage"],
  ["slots", "Gear Slots"],
  ["str", "Strength"], ["dex", "Dexterity"], ["con", "Constitution"],
  ["int", "Intelligence"], ["wis", "Wisdom"], ["cha", "Charisma"],
];
// Effect targets for the effect builder — the full talent vocabulary minus the
// Shadowdark-spell-only targets (for effect rows that don't use spell lists).
const DS_EFFECT_OPTS: readonly Opt[] = TALENT_TARGETS.filter(
  ([k]) => !["spellKnown", "spellCheck", "advSpell"].includes(k),
) as readonly Opt[];
// Title columns — five-tier titles mapped onto the sheet's alignment keys.
const TITLE_COLS: readonly [string, string][] = [
  ["Lawful", "Virtuous"], ["Neutral", "Survivor"], ["Chaotic", "Vile"],
];

type EffectRow = { amount?: string; target?: string; weapon?: string; feature?: string };
type Bonus = { amount?: string; target?: string };

const sv = (d: Data, k: string): string => { const v = d[k]; return typeof v === "string" ? v : v == null ? "" : String(v); };
// pips → die code: 10 → "3D+1", 12 → "4D", 0/blank → "".
function codeFromPips(p: unknown): string {
  const n = typeof p === "number" ? p : parseInt(String(p), 10);
  if (!Number.isFinite(n) || n <= 0) return "";
  const d = Math.floor(n / 3), r = n % 3;
  return d + "D" + (r ? "+" + r : "");
}

// ── the 16 schemas (kind → form). Keys match the lib/homebrew normalisers. ────
const SCHEMAS: Record<string, Schema> = {
  "nimble-item": {
    title: "My Homebrew Items", noun: "Item",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "category", label: "Category", type: "select", options: [["Adventuring Gear", "Adventuring Gear"], ["Cloth", "Cloth armor"], ["Leather", "Leather armor"], ["Mail", "Mail armor"], ["Plate", "Plate armor"], ["Shield", "Shield"], ["Melee Weapon", "Melee Weapon"], ["Ranged Weapon", "Ranged Weapon"], ["Key Equipment", "Key Equipment"], ["Magic Item", "Magic Item"], ["Spell Scroll", "Spell Scroll"], ["Wand", "Wand"]] },
      { key: "damage", label: "Damage (weapons)", type: "text", placeholder: "1d8+STR Slashing" },
      { key: "armor", label: "Armor (armor/shields)", type: "text", placeholder: "2+DEX" },
      { key: "properties", label: "Properties", type: "text", placeholder: "2-handed, Reach 2" },
      { key: "cost", label: "Cost", type: "text", placeholder: "10 gp" },
      { key: "rarity", label: "Rarity (magic item)", type: "text", placeholder: "Combat Item" },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ category: "Adventuring Gear" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "category"),
  },
  "nimble-spell": {
    title: "My Homebrew Spells", noun: "Spell",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "school", label: "School", type: "select", options: NIM_SCHOOL_OPTS },
      { key: "tier", label: "Tier (0 = cantrip)", type: "number", placeholder: "0" },
      { key: "actions", label: "Actions", type: "text", placeholder: "1 Action" },
      { key: "targeting", label: "Targeting", type: "select", empty: "—", options: [["Single Target", "Single Target"], ["AoE", "AoE"], ["Self", "Self"], ["Utility", "Utility"]] },
      { key: "utility", label: "Utility spell", type: "checkbox" },
      { key: "text", label: "Rules text", type: "textarea", full: true, placeholder: "Range: 8. Damage: 1d10. On crit: …" },
    ],
    blank: () => ({ school: "Utility", tier: "0", actions: "1 Action" }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "school")} · Tier ${sv(d, "tier") || "0"}`,
  },
  "nimble-monster": {
    title: "My Homebrew Monsters", noun: "Monster",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "family", label: "Family / group", type: "text", placeholder: "Kobolds" },
      { key: "level", label: "Level", type: "text", placeholder: "1/4, 3, Solo 5" },
      { key: "hp", label: "HP", type: "number", placeholder: "(blank for minions)" },
      { key: "armor", label: "Armor", type: "select", empty: "None", options: [["M", "Medium"], ["H", "Heavy"]] },
      { key: "size", label: "Size", type: "text", placeholder: "small" },
      { key: "saves", label: "Saves", type: "text", placeholder: "STR+++, DEX–" },
      { key: "legendary", label: "Legendary", type: "checkbox" },
      { key: "minion", label: "Minion", type: "checkbox" },
      { key: "abilities", label: "Abilities", type: "objectList", addLabel: "+ Ability", fields: [{ key: "name", label: "Name", type: "text" }, { key: "text", label: "Text", type: "textarea" }] },
      { key: "familyTrait", label: "Family trait", type: "textarea", full: true },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ family: "", level: "1", abilities: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "family") || "—"} · Lvl ${sv(d, "level") || "?"}`,
  },
  "nimble-ancestry": {
    title: "My Homebrew Ancestries", noun: "Ancestry",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "group", label: "Group", type: "select", options: [["Common", "Common"], ["Exotic", "Exotic"]] },
      { key: "size", label: "Size", type: "text", placeholder: "Medium" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "traits", label: "Traits", type: "objectList", full: true, addLabel: "+ Trait", fields: [{ key: "name", label: "Name", type: "text" }, { key: "text", label: "Text", type: "textarea" }] },
    ],
    blank: () => ({ group: "Common", size: "Medium", traits: [] }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "group"),
  },
  "sw-weapon": {
    title: "My Homebrew Weapons", noun: "Weapon",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "kind", label: "Kind", type: "select", options: [["Blaster", "Blaster"], ["Melee", "Melee"], ["Grenade", "Grenade"], ["Heavy", "Heavy"], ["Vehicle", "Vehicle"], ["Starship", "Starship"], ["Capital", "Capital"], ["Artillery", "Artillery"], ["Droid", "Droid"]] },
      { key: "damageText", label: "Damage (die code)", type: "text", placeholder: "3D+1" },
      { key: "range", label: "Range", type: "text", placeholder: "3-4/5-8/9-12" },
      { key: "skill", label: "Skill", type: "text", placeholder: "blaster" },
      { key: "cost", label: "Cost", type: "text", placeholder: "300" },
      { key: "availability", label: "Availability", type: "text", placeholder: "2, R" },
      { key: "book", label: "Book", type: "select", options: SW_BOOK_OPTS },
      { key: "notes", label: "Notes", type: "textarea", full: true },
    ],
    blank: () => ({ kind: "Blaster", book: "companion" }),
    toForm: (d) => ({ ...d, damageText: sv(d, "damageText") || codeFromPips(d.damage) }),
    summary: (d) => `${sv(d, "kind")}${sv(d, "damageText") ? " · " + sv(d, "damageText") : ""}`,
  },
  "sw-gear": {
    title: "My Homebrew Gear", noun: "Gear",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "category", label: "Category", type: "select", options: [["Armor", "Armor"], ["Medical", "Medical"], ["Tool", "Tool"], ["Communication", "Communication"], ["Survival", "Survival"], ["Droid", "Droid"], ["Misc", "Misc"]] },
      { key: "cost", label: "Cost", type: "text", placeholder: "2500" },
      { key: "stats", label: "Stats", type: "text", placeholder: "Armor code 1D (3 pips)" },
      { key: "book", label: "Book", type: "select", options: SW_BOOK_OPTS },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ category: "Misc", book: "companion" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "category"),
  },
  "sw-force": {
    title: "My Homebrew Force Powers", noun: "Force Power",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "attribute", label: "Attribute", type: "text", placeholder: "Control, Sense, Alter, Control & Sense…" },
      { key: "difficulty", label: "Difficulty", type: "textarea", full: true, placeholder: "Easy; Moderate vs a defending target…" },
      { key: "time", label: "Time to use", type: "text", placeholder: "one round" },
      { key: "requires", label: "Requires (powers)", type: "stringList", addLabel: "+ Prerequisite" },
      { key: "book", label: "Book", type: "select", options: SW_BOOK_OPTS },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ attribute: "Control", book: "companion" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "attribute"),
  },
  "sw-character": {
    title: "My Homebrew Characters", noun: "Character",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "group", label: "Group", type: "select", options: [["Imperial", "Imperial"], ["Rebel", "Rebel"], ["Civilian", "Civilian"], ["Alien", "Alien"], ["Droid", "Droid"], ["Creature", "Creature"]] },
      ...SW_ATTRS.map((a) => ({ key: a, label: a, type: "text" as const, placeholder: "2D" })),
      { key: "move", label: "Move", type: "text", placeholder: "10" },
      { key: "book", label: "Book", type: "select", options: SW_BOOK_OPTS },
      { key: "skills", label: "Skills", type: "stringList", full: true, addLabel: "+ Skill", placeholder: "blaster 4D" },
      { key: "equipment", label: "Equipment", type: "stringList", full: true, addLabel: "+ Item", placeholder: "Blaster pistol (4D)" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "notes", label: "Notes", type: "textarea", full: true },
    ],
    blank: () => ({ group: "Alien", book: "companion", skills: [], equipment: [] }),
    toForm: (d) => { const a = (d.attributes ?? {}) as Record<string, unknown>; const out: Data = { ...d }; for (const k of SW_ATTRS) out[k] = codeFromPips(a[k]); return out; },
    summary: (d) => sv(d, "group"),
  },
  "ace-role": {
    title: "My Homebrew Roles", noun: "Role",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "category", label: "Category", type: "text", placeholder: "Species, Occupation…" },
      { key: "setting", label: "Setting", type: "select", options: SETTING_OPTS },
      { key: "ability", label: "Ability", type: "textarea", full: true, placeholder: "What this role can do…" },
      { key: "power", label: "Grants the Power stat", type: "checkbox" },
      { key: "healthBonus", label: "Health bonus", type: "number", placeholder: "0" },
      { key: "modSmarts", label: "Smarts mod", type: "number", placeholder: "0" },
      { key: "modMoves", label: "Moves mod", type: "number", placeholder: "0" },
      { key: "modStyle", label: "Style mod", type: "number", placeholder: "0" },
      { key: "modBrawn", label: "Brawn mod", type: "number", placeholder: "0" },
      { key: "modPower", label: "Power mod", type: "number", placeholder: "0" },
      { key: "grantsFocus", label: "Grants focuses", type: "stringList", full: true, addLabel: "+ Focus" },
    ],
    blank: () => ({ category: "Species", setting: "core", grantsFocus: [] }),
    toForm: (d) => { const m = (d.statMods ?? {}) as Record<string, unknown>; const out: Data = { ...d }; for (const st of ["Smarts", "Moves", "Style", "Brawn", "Power"]) out["mod" + st] = m[st] != null ? String(m[st]) : ""; return out; },
    summary: (d) => sv(d, "category"),
  },
  "ace-gear": {
    title: "My Homebrew Gear", noun: "Gear",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "setting", label: "Setting", type: "select", options: SETTING_OPTS },
      { key: "category", label: "Category", type: "text", placeholder: "Weapon, Armor, Gadget…" },
      { key: "tier", label: "Tier", type: "select", options: [["Free", "Free"], ["Normal", "Normal"], ["Hard", "Hard"], ["Herculean", "Herculean"], ["Impossible", "Impossible"]] },
      { key: "tn", label: "Target number", type: "number", placeholder: "20" },
      { key: "damage", label: "Damage (weapons)", type: "number", placeholder: "4" },
      { key: "defence", label: "Defence (armor)", type: "number", placeholder: "2" },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ setting: "core", tier: "Normal", category: "Gadget" }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "category")} · ${sv(d, "tier")}`,
  },
  "ace-extra": {
    title: "My Homebrew Extras", noun: "Extra",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "setting", label: "Setting", type: "select", options: SETTING_OPTS },
      { key: "type", label: "Type", type: "text", placeholder: "Mook, Monster, Villain…" },
      { key: "smarts", label: "Smarts", type: "number" }, { key: "moves", label: "Moves", type: "number" },
      { key: "style", label: "Style", type: "number" }, { key: "brawn", label: "Brawn", type: "number" },
      { key: "power", label: "Power", type: "number" }, { key: "health", label: "Health", type: "number" },
      { key: "defence", label: "Defence", type: "number" },
      { key: "focuses", label: "Focuses", type: "objectList", full: true, addLabel: "+ Focus", fields: [{ key: "stat", label: "Stat", type: "select", options: ACE_STAT_OPTS }, { key: "name", label: "Name", type: "text" }, { key: "dice", label: "Dice", type: "number" }] },
      { key: "attacks", label: "Attacks", type: "objectList", full: true, addLabel: "+ Attack", fields: [{ key: "name", label: "Name", type: "text" }, { key: "dice", label: "Dice", type: "number" }, { key: "damage", label: "Damage", type: "number" }, { key: "note", label: "Note", type: "text" }] },
      { key: "notes", label: "Notes", type: "stringList", full: true, addLabel: "+ Note" },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ setting: "core", type: "Monster", focuses: [], attacks: [], notes: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => sv(d, "type"),
  },
  "ace-focus": {
    title: "My Homebrew Focuses", noun: "Focus",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "stat", label: "Stat", type: "select", options: ACE_STAT_OPTS },
      { key: "setting", label: "Setting", type: "select", options: SETTING_OPTS },
      { key: "note", label: "Note", type: "text", full: true, placeholder: "+2 Health." },
    ],
    blank: () => ({ stat: "Smarts", setting: "core" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "stat"),
  },
  "ace-trait": {
    title: "My Homebrew Traits", noun: "Trait",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "setting", label: "Setting", type: "select", options: SETTING_OPTS },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ setting: "core" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "setting"),
  },
  "kob-trope": {
    title: "My Homebrew Tropes", noun: "Trope",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "book", label: "Book", type: "select", options: KOB_BOOK_OPTS },
      ...KOB_STAT_KEYS.map((st) => ({ key: "dice" + st, label: st, type: "select" as const, options: KOB_DIE_OPTS })),
      { key: "ages", label: "Ages", type: "stringList", addLabel: "+ Age", placeholder: "Child / Teen" },
      { key: "suggestedRide", label: "Suggested ride", type: "text", full: true },
      { key: "suggestedStrengths", label: "Suggested strengths", type: "stringList", full: true, addLabel: "+ Strength" },
      { key: "suggestedFlaws", label: "Suggested flaws", type: "stringList", full: true, addLabel: "+ Flaw" },
      { key: "questions", label: "Character questions", type: "stringList", full: true, addLabel: "+ Question" },
    ],
    blank: () => ({ book: "bikes", ages: [], suggestedStrengths: [], suggestedFlaws: [], questions: [] }),
    toForm: (d) => { const dc = (d.dice ?? {}) as Record<string, unknown>; const out: Data = { ...d }; for (const st of KOB_STAT_KEYS) out["dice" + st] = dc[st] != null ? String(dc[st]) : ""; return out; },
    summary: (d) => sv(d, "book"),
  },
  "kob-strength": {
    title: "My Homebrew Strengths", noun: "Strength",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "book", label: "Book", type: "select", options: KOB_BOOK_OPTS },
      { key: "cost", label: "Cost", type: "text", placeholder: "1 AT" },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ book: "bikes" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "cost"),
  },
  "kob-flaw": {
    title: "My Homebrew Flaws", noun: "Flaw",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "book", label: "Book", type: "select", options: KOB_BOOK_OPTS },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ book: "bikes" }), toForm: (d) => ({ ...d }), summary: (d) => sv(d, "book"),
  },
  "d62e-skill": {
    title: "My Homebrew Skills", noun: "Skill",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "attribute", label: "Attribute", type: "text", placeholder: "Agility, Brawn, Knowledge, Perception, Charm…" },
      { key: "genre", label: "Genre", type: "select", options: D62E_GENRE_OPTS },
      { key: "time", label: "Time to use", type: "text", placeholder: "an action, one round…" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "specializations", label: "Sample specializations", type: "stringList", full: true, addLabel: "+ Specialization" },
    ],
    blank: () => ({ attribute: "Agility", genre: "core", specializations: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "attribute")}${sv(d, "genre") ? " · " + sv(d, "genre") : ""}`,
  },
  "d62e-gear": {
    title: "My Homebrew Gear", noun: "Gear",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "category", label: "Category", type: "select", options: [["weapon", "Weapon"], ["armor", "Armor"], ["gear", "Gear"]] },
      { key: "genre", label: "Genre", type: "select", options: D62E_GENRE_OPTS },
      { key: "era", label: "Era", type: "text", placeholder: "Medieval, Modern, Futuristic…" },
      { key: "damage", label: "Damage (weapons)", type: "text", placeholder: "Brawn+2D, 5D" },
      { key: "protection", label: "Protection (armor)", type: "text", placeholder: "+2D physical / +1D energy" },
      { key: "range", label: "Range", type: "text", placeholder: "melee (reach 1), 3-10/30/120" },
      { key: "skill", label: "Skill", type: "text", placeholder: "Melee, Shooting…" },
      { key: "cost", label: "Cost", type: "text" },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ category: "gear", genre: "core" }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "category")} · ${sv(d, "genre")}`,
  },
  "d62e-power": {
    title: "My Homebrew Powers", noun: "Power",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "kind", label: "Kind", type: "select", options: [["magic", "Magic"], ["psionic", "Psionic"], ["superpower", "Superpower"]] },
      { key: "genre", label: "Genre", type: "select", options: D62E_GENRE_OPTS },
      { key: "skill", label: "Skill", type: "text", placeholder: "Spell School: Creation, Telepathy…" },
      { key: "difficulty", label: "Difficulty", type: "text", placeholder: "5, 10, Opposed…" },
      { key: "cost", label: "Cost / Power", type: "text", placeholder: "Power 2" },
      { key: "description", label: "Description", type: "textarea", full: true },
      { key: "options", label: "Options / parameters", type: "stringList", full: true, addLabel: "+ Option", placeholder: "Duration: Ten minutes" },
    ],
    blank: () => ({ kind: "magic", genre: "fantasy", options: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "kind")} · ${sv(d, "genre")}`,
  },
  "d62e-creature": {
    title: "My Homebrew Creatures", noun: "Creature",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "genre", label: "Genre", type: "select", options: D62E_GENRE_OPTS },
      { key: "kind", label: "Kind", type: "text", placeholder: "Animal, NPC, Monster…" },
      ...D62E_ATTRS.map((a) => ({ key: a, label: a, type: "text" as const, placeholder: "3D+2" })),
      { key: "move", label: "Move", type: "text", placeholder: "10, Flight…" },
      { key: "skills", label: "Skills", type: "stringList", full: true, addLabel: "+ Skill", placeholder: "Brawling 4D" },
      { key: "special", label: "Special", type: "stringList", full: true, addLabel: "+ Special", placeholder: "Dodge 15, Parry 20" },
      { key: "talents", label: "Talents", type: "stringList", full: true, addLabel: "+ Talent" },
      { key: "powers", label: "Powers", type: "stringList", full: true, addLabel: "+ Power" },
      { key: "description", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ genre: "core", kind: "Monster", skills: [], special: [], talents: [], powers: [] }),
    toForm: (d) => { const a = (d.attributes ?? {}) as Record<string, unknown>; const out: Data = { ...d }; for (const k of D62E_ATTRS) out[k] = codeFromPips(a[k]); return out; },
    summary: (d) => `${sv(d, "kind") || "Creature"} · ${sv(d, "genre")}`,
  },


  // ── ICRPG (Index Card RPG) ──
  "icrpg-type": {
    title: "My Homebrew Hero Types", noun: "Hero Type",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "world", label: "World", type: "select", options: ICRPG_WORLD_OPTS },
      { key: "statFocus", label: "Stat focus", type: "text", placeholder: "STR, DEX, magic EFFORT…" },
      { key: "desc", label: "Description", type: "textarea", full: true },
      { key: "startingLoot", label: "Starting loot", type: "stringList", full: true, addLabel: "+ Loot" },
      { key: "abilities", label: "Signature abilities", type: "stringList", full: true, addLabel: "+ Ability" },
    ],
    blank: () => ({ world: "core", startingLoot: [], abilities: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => sv(d, "world") || "core",
  },
  "icrpg-ability": {
    title: "My Homebrew Abilities", noun: "Ability",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "kind", label: "Kind", type: "text", placeholder: "Ability, Power, Augment, Mastery…" },
      { key: "world", label: "World", type: "select", options: ICRPG_WORLD_OPTS },
      { key: "desc", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ kind: "Ability", world: "core" }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "kind") || "Ability"} · ${sv(d, "world") || "core"}`,
  },
  "icrpg-loot": {
    title: "My Homebrew Loot", noun: "Loot",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "table", label: "Table", type: "text", placeholder: "Weapons, Wonders, Curses…" },
      { key: "roll", label: "Roll", type: "text", placeholder: "1-100 or a d-code" },
      { key: "desc", label: "Description", type: "textarea", full: true },
      { key: "effects", label: "Effects", type: "stringList", full: true, addLabel: "+ Effect" },
    ],
    blank: () => ({ table: "Homebrew", effects: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => sv(d, "table") || "Loot",
  },
  "icrpg-gear": {
    title: "My Homebrew Gear", noun: "Gear",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "world", label: "World", type: "select", options: ICRPG_WORLD_OPTS },
      { key: "category", label: "Category", type: "text", placeholder: "Weapon, Armor, Tool, Gun…" },
      { key: "desc", label: "Description", type: "textarea", full: true },
      { key: "effects", label: "Effects", type: "stringList", full: true, addLabel: "+ Effect" },
    ],
    blank: () => ({ world: "core", category: "Gear", effects: [] }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "category") || "Gear"} · ${sv(d, "world") || "core"}`,
  },
  "icrpg-spell": {
    title: "My Homebrew Spells", noun: "Spell",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "school", label: "School", type: "text", placeholder: "Magic, Energy, Blood, Tech…" },
      { key: "target", label: "Target / DIFFICULTY", type: "text", placeholder: "TARGET 12, WIS…" },
      { key: "effort", label: "Effort", type: "text", placeholder: "Magic EFFORT (d10)" },
      { key: "desc", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ school: "Magic" }), toForm: (d) => ({ ...d }),
    summary: (d) => sv(d, "school") || "Magic",
  },
  "icrpg-monster": {
    title: "My Homebrew Monsters", noun: "Monster",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "world", label: "World", type: "select", options: ICRPG_WORLD_OPTS },
      { key: "tier", label: "Tier", type: "text", placeholder: "Grunt, Boss…" },
      { key: "hearts", label: "Hearts", type: "number", placeholder: "1" },
      { key: "hp", label: "HP", type: "number", placeholder: "10" },
      { key: "defense", label: "Defense", type: "number", placeholder: "0" },
      ...ICRPG_STAT_KEYS.map((s) => ({ key: s, label: s, type: "number" as const, placeholder: "0" })),
      { key: "attacks", label: "Attacks", type: "stringList", full: true, addLabel: "+ Attack", placeholder: "Claw, d6 EFFORT" },
      { key: "abilities", label: "Abilities", type: "stringList", full: true, addLabel: "+ Ability" },
      { key: "desc", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ world: "core", tier: "Grunt", attacks: [], abilities: [] }), toForm: (d) => {
      const st = (d.stats ?? {}) as Record<string, unknown>; const out: Data = { ...d };
      for (const k of ICRPG_STAT_KEYS) out[k] = typeof st[k] === "number" ? String(st[k]) : "";
      return out;
    },
    summary: (d) => `${sv(d, "tier") || "Monster"} · ${sv(d, "world") || "core"}`,
  },

  // ── Candela Obscura (Illuminated Worlds) ──
  "co-ability": {
    title: "My Homebrew Abilities", noun: "Ability",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "source", label: "Source", type: "select", options: [["Role", "Role"], ["Specialty", "Specialty"]] },
      { key: "owner", label: "Role / Specialty", type: "text", placeholder: "Weird, Occultist…" },
      { key: "desc", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ source: "Role" }), toForm: (d) => ({ ...d }),
    summary: (d) => `${sv(d, "source") || "Role"}${sv(d, "owner") ? ` · ${sv(d, "owner")}` : ""}`,
  },
  "co-gear": {
    title: "My Homebrew Gear", noun: "Gear",
    fields: [
      { key: "name", label: "Name", type: "text", full: true, maxLength: 80 },
      { key: "type", label: "Type", type: "text", placeholder: "Standard, Specialty, Circle…" },
      { key: "desc", label: "Description", type: "textarea", full: true },
    ],
    blank: () => ({ type: "Specialty" }), toForm: (d) => ({ ...d }),
    summary: (d) => sv(d, "type") || "Gear",
  },
};

// Accent CSS var by system prefix (globals.css: --nimble/--sw/--ace/--kob).
function accentFor(kind: string): string {
  if (kind.startsWith("nimble-")) return "--nimble";
  if (kind.startsWith("sw-")) return "--sw";
  if (kind.startsWith("ace-")) return "--ace";
  if (kind.startsWith("kob-")) return "--kob";
  if (kind.startsWith("d62e-")) return "--d62e";
  if (kind.startsWith("icrpg-")) return "--icrpg";
  if (kind.startsWith("co-")) return "--candela";
  return "--dnd";
}

export default function HomebrewEditor({
  kind,
  campaigns,
  initial,
}: {
  kind: string;
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
}) {
  const router = useRouter();
  const schema = SCHEMAS[kind];
  const accent = accentFor(kind);
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // null = closed, "" = new
  const [form, setForm] = useState<Data>({});
  const [campaignIds, setCampaignIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!schema) return null;

  const active = editId !== null;
  const setField = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const openNew = () => { setForm(schema.blank()); setCampaignIds([]); setEditId(""); setError(""); };
  const openEdit = (rec: HomebrewRecord) => {
    setForm(schema.toForm(rec.data || {}));
    setCampaignIds(rec.campaignIds ?? []);
    setEditId(rec.id);
    setError("");
  };
  const close = () => { setEditId(null); setError(""); };
  const toggleCampaign = (id: string) =>
    setCampaignIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  async function submit() {
    const name = String(form.name ?? "").trim();
    if (!name) { setError(`Give the ${schema.noun.toLowerCase()} a name.`); return; }
    setBusy(true);
    setError("");
    try {
      const isNew = editId === "";
      const body = isNew ? { type: kind, data: form, campaignIds } : { data: form, campaignIds };
      const res = await fetch(isNew ? "/api/homebrew" : `/api/homebrew/${editId}`, {
        method: isNew ? "POST" : "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) { setError((await res.text()) || "Could not save."); return; }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => {
        const without = prev.filter((p) => p.id !== item.id);
        return [item, ...without].sort((a, b) => a.name.localeCompare(b.name, "en"));
      });
      close();
      router.refresh();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(rec: HomebrewRecord) {
    if (!confirm(`Delete "${rec.name}"? This can't be undone.`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/homebrew/${rec.id}`, { method: "DELETE", credentials: "same-origin" });
      if (!res.ok) { setError("Could not delete."); return; }
      setItems((prev) => prev.filter((p) => p.id !== rec.id));
      if (editId === rec.id) close();
      router.refresh();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  const campaignName = (id: string) => campaigns.find((c) => c.id === id)?.name ?? "a campaign";
  const accentStyle = { "--hb-accent": `var(${accent})` } as CSSProperties;

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]" style={accentStyle}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          {schema.title} {items.length ? <span className="text-[var(--muted)]">({items.length})</span> : null}
        </span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          {items.length ? (
            <ul className="mb-4 flex flex-col gap-2">
              {items.map((rec) => (
                <li key={rec.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2">
                  <span className="font-bold text-[var(--hb-accent)]">{rec.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{schema.summary(rec.data || {})}</span>
                  {rec.campaignIds.length ? (
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">shared: {rec.campaignIds.map(campaignName).join(", ")}</span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">personal</span>
                  )}
                  <span className="ml-auto flex gap-2">
                    <button className={btn} disabled={busy} onClick={() => openEdit(rec)}>Edit</button>
                    <button className={btn} disabled={busy} onClick={() => remove(rec)}>Delete</button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-sm text-[var(--muted)]">
              No homebrew {schema.noun.toLowerCase()}s yet. Create one below — it shows up in this list, and (once shared) for your campaign.
            </p>
          )}

          {active ? (
            <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {schema.fields.map((f) => (
                  <FieldView key={f.key} field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                ))}
              </div>

              {campaigns.length ? (
                <div className="mt-3">
                  <label className={labelCls}>Share with campaigns</label>
                  <div className="flex flex-wrap gap-3">
                    {campaigns.map((c) => (
                      <label key={c.id} className="flex items-center gap-2 text-[13px] text-[var(--text)]">
                        <input type="checkbox" checked={campaignIds.includes(c.id)} onChange={() => toggleCampaign(c.id)} />
                        {c.name}
                      </label>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">Unchecked = personal (only you see it).</p>
                </div>
              ) : null}

              {error ? <p className="mt-3 text-[13px] text-[var(--hb-accent)]">{error}</p> : null}

              <div className="mt-4 flex gap-2">
                <button className={btnAccent} disabled={busy} onClick={submit}>
                  {busy ? "Saving…" : editId === "" ? `Create ${schema.noun}` : "Save Changes"}
                </button>
                <button className={btn} disabled={busy} onClick={close}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className={btnAccent} onClick={openNew}>+ New Homebrew {schema.noun}</button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function FieldView({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const cls = field.full ? "sm:col-span-2" : "";

  if (field.type === "stringList") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
        <div className="flex flex-col gap-1.5">
          {list.map((row, i) => (
            <div key={i} className="flex gap-1.5">
              <input className={`${fieldBase} min-w-0 flex-1`} value={row} placeholder={field.placeholder}
                onChange={(e) => { const n = [...list]; n[i] = e.target.value; onChange(n); }} />
              <button type="button" className={miniBtn} onClick={() => onChange(list.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
        </div>
        <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => onChange([...list, ""])}>{field.addLabel ?? "+ Add"}</button>
      </div>
    );
  }

  if (field.type === "objectList") {
    const list = Array.isArray(value) ? (value as Data[]) : [];
    const update = (i: number, k: string, v: unknown) => onChange(list.map((row, j) => (j === i ? { ...row, [k]: v } : row)));
    return (
      <div className={cls}>
        <label className={labelCls}>{field.label}</label>
        {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
        <div className="flex flex-col gap-2">
          {list.map((row, i) => (
            <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel)] p-2.5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {field.fields.map((sf) => (
                  <ScalarView key={sf.key} field={sf} value={row[sf.key]} onChange={(v) => update(i, sf.key, v)} />
                ))}
              </div>
              <button type="button" className={`${miniBtn} mt-2`} onClick={() => onChange(list.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
        </div>
        <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => onChange([...list, {}])}>{field.addLabel ?? "+ Add"}</button>
      </div>
    );
  }

  if (field.type === "bonuses") return <BonusesView field={field} value={value} onChange={onChange} wrapClass={cls} />;
  if (field.type === "effectRows") return <EffectRowsView field={field} value={value} onChange={onChange} wrapClass={cls} />;
  if (field.type === "triad") return <TriadView field={field} value={value} onChange={onChange} wrapClass={cls} />;
  if (field.type === "titles") return <TitlesView field={field} value={value} onChange={onChange} wrapClass={cls} />;

  return <ScalarView field={field} value={value} onChange={onChange} wrapClass={cls} />;
}

// ── Flat bonuses: rows of { amount, target } ─────────────────────────────────
function BonusesView({ field, value, onChange, wrapClass }: { field: Extract<Field, { type: "bonuses" }>; value: unknown; onChange: (v: unknown) => void; wrapClass?: string }) {
  const list: Bonus[] = Array.isArray(value) ? (value as Bonus[]) : [];
  const update = (i: number, patch: Partial<Bonus>) => onChange(list.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  return (
    <div className={wrapClass}>
      <label className={labelCls}>{field.label}</label>
      {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
      <div className="flex flex-col gap-1.5">
        {list.map((row, i) => (
          <div key={i} className="flex gap-1.5">
            <input className={`${fieldBase} w-16`} inputMode="numeric" value={row.amount == null ? "" : String(row.amount)} placeholder="+1"
              onChange={(e) => update(i, { amount: e.target.value.replace(/[^\d+\-]/g, "") })} />
            <select className={`${fieldBase} min-w-0 flex-1`} value={row.target ?? ""} onChange={(e) => update(i, { target: e.target.value })}>
              <option value="">— target —</option>
              {BONUS_TARGET_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <button type="button" className={miniBtn} onClick={() => onChange(list.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
      </div>
      <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => onChange([...list, { amount: "1", target: "" }])}>{field.addLabel ?? "+ Bonus"}</button>
    </div>
  );
}

// ── One effect (amount + target + conditional weapon/feature) ────────────────
function EffectView({ eff, onChange, onRemove }: { eff: EffectRow; onChange: (patch: Partial<EffectRow>) => void; onRemove: () => void }) {
  const target = eff.target ?? "";
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <input className={`${fieldBase} w-16`} inputMode="numeric" value={eff.amount == null ? "" : String(eff.amount)} placeholder="+1"
        onChange={(e) => onChange({ amount: e.target.value.replace(/[^\d+\-]/g, "") })} />
      <select className={`${fieldBase} min-w-0 flex-1`} value={target} onChange={(e) => onChange({ target: e.target.value })}>
        <option value="">— effect —</option>
        {DS_EFFECT_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      {target === "weaponDie" ? (
        <input className={`${fieldBase} w-28`} value={eff.weapon ?? ""} placeholder="weapon" onChange={(e) => onChange({ weapon: e.target.value })} />
      ) : null}
      {target === "featureCharges" ? (
        <input className={`${fieldBase} w-28`} value={eff.feature ?? ""} placeholder="feature" onChange={(e) => onChange({ feature: e.target.value })} />
      ) : null}
      <button type="button" className={miniBtn} onClick={onRemove}>✕</button>
    </div>
  );
}

// ── Rows of { <rowKey>, text, choose?, effects[] } ───────────────────────────
function EffectRowsView({ field, value, onChange, wrapClass }: { field: Extract<Field, { type: "effectRows" }>; value: unknown; onChange: (v: unknown) => void; wrapClass?: string }) {
  const list: Data[] = Array.isArray(value) ? (value as Data[]) : [];
  const update = (i: number, patch: Data) => onChange(list.map((row, j) => (j === i ? { ...row, ...patch } : row)));
  const effs = (row: Data): EffectRow[] => (Array.isArray(row.effects) ? (row.effects as EffectRow[]) : []);
  return (
    <div className={wrapClass}>
      <label className={labelCls}>{field.label}</label>
      {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
      <div className="flex flex-col gap-2">
        {list.map((row, i) => {
          const rowEffs = effs(row);
          return (
            <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel)] p-2.5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>{field.rowKeyLabel}</label>
                  <input className={`${fieldBase} w-full`} value={sv(row, field.rowKey)} placeholder={field.rowKeyPlaceholder}
                    onChange={(e) => update(i, { [field.rowKey]: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>{field.textLabel ?? "Text"}</label>
                  <textarea className={`${fieldBase} min-h-[44px] w-full`} value={sv(row, "text")}
                    onChange={(e) => update(i, { text: e.target.value })} />
                </div>
              </div>
              <div className="mt-2">
                <label className={labelCls}>Effects</label>
                <div className="flex flex-col gap-1.5">
                  {rowEffs.map((eff, ei) => (
                    <EffectView key={ei} eff={eff}
                      onChange={(patch) => update(i, { effects: rowEffs.map((x, j) => (j === ei ? { ...x, ...patch } : x)) })}
                      onRemove={() => update(i, { effects: rowEffs.filter((_, j) => j !== ei) })} />
                  ))}
                </div>
                <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => update(i, { effects: [...rowEffs, { amount: "1", target: "" }] })}>+ Effect</button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                {field.withChoose ? (
                  <label className="flex items-center gap-2 text-[12px] text-[var(--text)]">
                    <input type="checkbox" checked={!!row.choose} onChange={(e) => update(i, { choose: e.target.checked })} />
                    Choose one (player picks a single effect)
                  </label>
                ) : <span />}
                <button type="button" className={miniBtn} onClick={() => onChange(list.filter((_, j) => j !== i))}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => onChange([...list, { [field.rowKey]: "", text: "", effects: [] }])}>{field.addLabel ?? "+ Add"}</button>
    </div>
  );
}

// ── Triad grant (Body / Mind / Soul) ────────────────────────────────────────
function TriadView({ field, value, onChange, wrapClass }: { field: Extract<Field, { type: "triad" }>; value: unknown; onChange: (v: unknown) => void; wrapClass?: string }) {
  const obj = (value && typeof value === "object" ? value : {}) as Record<string, boolean>;
  const toggle = (k: string) => onChange({ ...obj, [k]: !obj[k] });
  return (
    <div className={wrapClass}>
      <label className={labelCls}>{field.label}</label>
      <div className="flex flex-wrap gap-4">
        {["Body", "Mind", "Soul"].map((k) => (
          <label key={k} className="flex items-center gap-2 text-[13px] text-[var(--text)]">
            <input type="checkbox" checked={!!obj[k]} onChange={() => toggle(k)} />
            {k}
          </label>
        ))}
      </div>
    </div>
  );
}

// ── Titles by Motivation (mapped to Lawful/Neutral/Chaotic keys) ─────────────
function TitlesView({ field, value, onChange, wrapClass }: { field: Extract<Field, { type: "titles" }>; value: unknown; onChange: (v: unknown) => void; wrapClass?: string }) {
  const obj = (value && typeof value === "object" ? value : {}) as Record<string, string[]>;
  const col = (k: string): string[] => (Array.isArray(obj[k]) ? obj[k] : ["", "", "", "", ""]).slice(0, 5).concat(["", "", "", "", ""]).slice(0, 5);
  const setTier = (k: string, tier: number, v: string) => {
    const arr = col(k).slice(); arr[tier] = v;
    onChange({ ...obj, [k]: arr });
  };
  return (
    <div className={wrapClass}>
      <label className={labelCls}>{field.label}</label>
      <p className="mb-1 text-[11px] text-[var(--muted)]">Five tiers (levels 1–2, 3–4, 5–6, 7–8, 9–10). Leave blank to skip.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TITLE_COLS.map(([key, motiv]) => (
          <div key={key}>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--hb-accent)]">{motiv}</div>
            <div className="flex flex-col gap-1">
              {[0, 1, 2, 3, 4].map((t) => (
                <input key={t} className={`${fieldBase} w-full`} value={col(key)[t] ?? ""} placeholder={`Tier ${t + 1}`}
                  onChange={(e) => setTier(key, t, e.target.value)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScalarView({ field, value, onChange, wrapClass }: { field: ScalarField; value: unknown; onChange: (v: unknown) => void; wrapClass?: string }) {
  const cls = wrapClass ?? (field.full ? "sm:col-span-2" : "");
  const strVal = value == null ? "" : String(value);
  return (
    <div className={cls}>
      {field.type === "checkbox" ? (
        <label className="mt-5 flex items-center gap-2 text-[13px] text-[var(--text)]">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      ) : (
        <>
          <label className={labelCls}>{field.label}</label>
          {field.help ? <p className="mb-1 text-[11px] text-[var(--muted)]">{field.help}</p> : null}
          {field.type === "textarea" ? (
            <textarea className={`${fieldBase} min-h-[70px] w-full`} value={strVal} maxLength={field.maxLength}
              placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
          ) : field.type === "select" ? (
            <select className={`${fieldBase} w-full`} value={strVal} onChange={(e) => onChange(e.target.value)}>
              {field.empty ? <option value="">{field.empty}</option> : null}
              {field.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          ) : field.type === "number" ? (
            <input className={`${fieldBase} w-full`} inputMode="numeric" value={strVal} placeholder={field.placeholder}
              onChange={(e) => onChange(e.target.value.replace(/[^\d+\-.]/g, ""))} />
          ) : (
            <>
              <input className={`${fieldBase} w-full`} value={strVal} maxLength={field.maxLength} placeholder={field.placeholder}
                list={field.datalist ? `dl-hb-${field.key}` : undefined} onChange={(e) => onChange(e.target.value)} />
              {field.datalist ? <datalist id={`dl-hb-${field.key}`}>{field.datalist.map((o) => <option key={o} value={o} />)}</datalist> : null}
            </>
          )}
        </>
      )}
    </div>
  );
}
