import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";
import { MONSTER_TYPES } from "@/lib/data/monster-types";
import { TALENT_TARGET_KEYS } from "@/lib/effects";
import {
  sanitizeSelections, summarizeBuild, dccStatMod, statBase, hbSlotCount,
} from "@/lib/dcc-build-menu";

// Homebrew is stored in the exact object shapes the character sheet already
// consumes, so a sheet can merge it straight into its `_homebrewSpells` /
// `_homebrewItems` arrays with no translation:
//   • a spell entry is an SD_SPELLS-shaped object (caster forced to "Homebrew")
//   • a gear entry is a sheet `_homebrewItems`-shaped object (its own `kind`)
//   • a monster entry is an SD_MONSTERS-shaped stat block (plus `ctype`), so the
//     GM screen can drop it straight into the bestiary pool
export type HbType =
  | "spell" | "gear" | "monster" | "class" | "ancestry" | "background"
  | "dcc-item" | "dcc-monster" | "dcc-skill" | "dcc-spell" | "dcc-class" | "dcc-race"
  | "dnd-equipment" | "dnd-feat" | "dnd-background" | "dnd-spell" | "dnd-species" | "dnd-monster" | "dnd-subclass"
  | "nimble-item" | "nimble-spell" | "nimble-monster" | "nimble-ancestry"
  | "sw-weapon" | "sw-gear" | "sw-force" | "sw-character"
  | "ace-role" | "ace-gear" | "ace-extra" | "ace-focus" | "ace-trait"
  | "kob-trope" | "kob-strength" | "kob-flaw";

const HB_TYPES = [
  "spell", "gear", "monster", "class", "ancestry", "background",
  "dcc-item", "dcc-monster", "dcc-skill", "dcc-spell", "dcc-class", "dcc-race",
  "dnd-equipment", "dnd-feat", "dnd-background", "dnd-spell", "dnd-species", "dnd-monster", "dnd-subclass",
  "nimble-item", "nimble-spell", "nimble-monster", "nimble-ancestry",
  "sw-weapon", "sw-gear", "sw-force", "sw-character",
  "ace-role", "ace-gear", "ace-extra", "ace-focus", "ace-trait",
  "kob-trope", "kob-strength", "kob-flaw",
] as const;
export function isHbType(v: unknown): v is HbType {
  return typeof v === "string" && (HB_TYPES as readonly string[]).includes(v);
}

export type CampaignRef = { id: string; name: string; code: string };

// What the pages, the manager UI and the sheet all receive over the wire.
export type HomebrewRecord = {
  id: string;
  type: HbType;
  name: string;
  campaignIds: string[]; // every campaign this entry is shared with ([] = personal)
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean; // true when the current viewer owns it (may edit/delete)
};

// The subset of a homebrew row this module reads. Prisma's inferred result is
// structurally assignable to it, so nothing here casts a query result — a cast
// can drift from what the client actually returns (e.g. a missing `include`),
// while inference cannot.
type HomebrewRow = {
  id: string;
  ownerId: string;
  type: string;
  name: string;
  data: unknown;
  updatedAt: Date;
  shares: { campaignId: string }[];
};

const GEAR_KINDS = ["gear", "weapon", "armor", "shield", "magic", "ammo"] as const;

// ── Dungeon Crawler Carl items ───────────────────────────────────────────────
// A homebrew item stored in DccItem shape (lib/data/dcc-types.ts) so the Loot &
// Gear page and the DCC tools can consume it exactly like a book item.
export const DCC_ITEM_CATEGORIES = [
  "consumable", "weapon", "armor", "accessory", "scroll", "tome", "mundane", "tool", "material",
] as const;
export const DCC_ITEM_TIERS = [
  "Mundane", "Bronze", "Silver", "Gold", "Platinum", "Legendary", "Celestial",
] as const;
// The book's equip-slot vocabulary (offered as suggestions; slot stays free text).
export const DCC_ITEM_SLOTS = [
  "Head", "Torso", "Arms", "Legs", "Feet", "Hands/Holding", "Accessory",
] as const;

// ── Dungeon Crawler Carl vocabularies (shared with the homebrew editors) ─────
export const DCC_STATS = ["STR", "INT", "CON", "DEX", "CHA"] as const;
export const DCC_MONSTER_ROLES = [
  "Mob", "Neighborhood Boss", "Borough Boss", "City Boss", "Province Boss",
  "Country Boss", "Floor Boss", "Quest Boss", "Elite", "Rival Crawler", "NPC",
] as const;
export const DCC_SKILL_CATEGORIES = ["attack", "utility"] as const;
export const DCC_SPELL_TYPES = ["attack", "utility", "heal"] as const;
export const DCC_RACE_GROUPS = ["Earth", "Alien"] as const;
// Upgrade ranks a skill/spell can pick up (Rank 5 / 10 / 15).
export const DCC_UPGRADE_RANKS = [5, 10, 15] as const;
// Health-Bar slot counts bosses get by tier (Table 50, before the +F floor
// bonus). Mobs instead get one slot per Level, capped at 10 (p. 270).
export const DCC_BOSS_HB_BASE: Record<string, number> = {
  "Neighborhood Boss": 10, "Borough Boss": 15, "City Boss": 20,
  "Province Boss": 25, "Country Boss": 30, "Floor Boss": 40,
};

// Mirrors the range picker in the sheet's own homebrew weapon editor.
export const WEAPON_RANGES = ["Close", "Near", "Far", "Close/Near", "Close/Far"] as const;

// Ranges used by the book's spells, offered as the homebrew spell picker.
export const SPELL_RANGES = [
  "Self", "Touch", "Close", "Near", "Far", "Double near", "1 mile", "Same plane", "Unlimited",
] as const;
export const BONUS_TARGETS = [
  "ac", "hp", "meleeAtk", "meleeDmg", "rangedAtk", "rangedDmg",
  "slots", "str", "dex", "con", "int", "wis", "cha",
] as const;

const str = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const num = (v: unknown): number | null => {
  const n = parseInt(String(v ?? "").trim(), 10);
  return Number.isFinite(n) ? n : null;
};

// Uses/day for a limited-use trait or feature. 0 = passive (no tick boxes).
function toRecord(r: HomebrewRow, viewerId: string): HomebrewRecord {
  return {
    id: r.id,
    type: isHbType(r.type) ? r.type : "spell",
    name: r.name,
    campaignIds: (r.shares ?? []).map((sh) => sh.campaignId),
    data: (r.data && typeof r.data === "object" ? (r.data as Record<string, unknown>) : {}),
    updatedAt: r.updatedAt.toISOString(),
    owner: r.ownerId === viewerId,
  };
}

// ── Campaign participation ───────────────────────────────────────────────────
// A user "participates" in a campaign if they own it OR one of their SD sheets
// is linked to it (the sheet records `_sheet.campaign.id`, mirroring how the
// campaign→characters route derives its party).
export const userCampaigns = cache(async function userCampaigns(
  userId: string,
): Promise<CampaignRef[]> {
  const owned = await prisma.campaign.findMany({
    where: { ownerId: userId },
    select: { id: true, name: true, code: true },
  });

  // A character sheet's campaign link now lives in the indexed linkedCampaignId
  // column (kept in sync on every save), so the linked campaign ids are a plain
  // index scan — no full-table JSON scan, no per-sheet parse.
  const linkedRows = await prisma.document.findMany({
    where: { userId, tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { not: null } },
    select: { linkedCampaignId: true },
    distinct: ["linkedCampaignId"],
  });
  const linkedIds = new Set<string>();
  for (const r of linkedRows) if (r.linkedCampaignId) linkedIds.add(r.linkedCampaignId);

  const byId = new Map<string, CampaignRef>();
  for (const c of owned) byId.set(c.id, c);

  const missing = [...linkedIds].filter((id) => !byId.has(id));
  if (missing.length) {
    const linked = await prisma.campaign.findMany({
      where: { id: { in: missing } },
      select: { id: true, name: true, code: true },
    });
    for (const c of linked) byId.set(c.id, c);
  }

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, "en"));
});

async function participatesInCampaign(userId: string, campaignId: string): Promise<boolean> {
  if (!campaignId) return false;
  const owned = await prisma.campaign.count({ where: { id: campaignId, ownerId: userId } });
  if (owned > 0) return true;

  // Indexed membership check: does this user have a character sheet linked to the
  // campaign? The link is its own column now, so this is a counted index scan.
  const linked = await prisma.document.count({
    where: { userId, tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: campaignId },
  });
  return linked > 0;
}

// ── Reads ────────────────────────────────────────────────────────────────────
// Everything the viewer may USE: their own entries plus anything shared to a
// campaign they participate in. With `campaignId` set (a sheet asking about the
// campaign it's connected to) the campaign scope is limited to just that one.
export async function visibleHomebrew(
  userId: string,
  opts: { type?: HbType; campaignId?: string } = {},
): Promise<HomebrewRecord[]> {
  let campaignIds: string[];
  if (opts.campaignId) {
    campaignIds = (await participatesInCampaign(userId, opts.campaignId)) ? [opts.campaignId] : [];
  } else {
    campaignIds = (await userCampaigns(userId)).map((c) => c.id);
  }

  const or: Array<{ ownerId: string } | { shares: { some: { campaignId: { in: string[] } } } }> = [
    { ownerId: userId },
  ];
  if (campaignIds.length) or.push({ shares: { some: { campaignId: { in: campaignIds } } } });

  const rows = await prisma.homebrew.findMany({
    where: { ...(opts.type ? { type: opts.type } : {}), OR: or },
    include: { shares: { select: { campaignId: true } } },
    orderBy: { name: "asc" },
  });

  // A user could both own an entry and see it via a campaign; findMany with OR
  // already returns each row once, so no dedupe is needed.
  return rows.map((r: HomebrewRow) => toRecord(r, userId));
}

// Just the viewer's own entries — what the management UI lists.
export async function ownHomebrew(userId: string, type?: HbType): Promise<HomebrewRecord[]> {
  const rows = await prisma.homebrew.findMany({
    where: { ownerId: userId, ...(type ? { type } : {}) },
    include: { shares: { select: { campaignId: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map((r: HomebrewRow) => toRecord(r, userId));
}

// ── Normalisers ──────────────────────────────────────────────────────────────
// Sanitise client input into the sheet-native shape before it's stored.
function normalizeSpell(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew spell needs a name.");
  const tierNum = num(o.tier);
  const data: Record<string, unknown> = {
    name,
    tier: String(tierNum && tierNum >= 1 && tierNum <= 5 ? tierNum : 1),
    caster: "Homebrew",
    range: (SPELL_RANGES as readonly string[]).includes(str(o.range)) ? str(o.range) : "Close",
    duration: str(o.duration),
    damage: str(o.damage),
    desc: str(o.desc).slice(0, 4000),
  };
  return { name, data };
}

function normalizeGear(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew item needs a name.");

  const kind = (GEAR_KINDS as readonly string[]).includes(str(o.kind)) ? str(o.kind) : "gear";
  const data: Record<string, unknown> = { name, kind, note: str(o.note).slice(0, 4000) };

  const cost = num(o.cost);
  const unit = ["gp", "sp", "cp"].includes(str(o.costUnit)) ? str(o.costUnit) : "gp";
  if (cost != null && cost > 0) data[unit] = cost;
  if (str(o.slots)) data.slots = str(o.slots);
  if (str(o.qty)) data.qty = str(o.qty);

  if (kind === "weapon") {
    data.wtype = ["M", "R", "M/R"].includes(str(o.wtype)) ? str(o.wtype) : "M";
    data.range = (WEAPON_RANGES as readonly string[]).includes(str(o.range)) ? str(o.range) : "Close";
    data.damage = str(o.damage) || "1d4";
    data.props = str(o.props);
    // Always written, even when empty. The sheet treats a present `ammo` as
    // authoritative, so "" is an explicit "needs no ammo" that outranks its
    // name-based guess (a custom "Star Bow" then won't demand arrows).
    data.ammo = str(o.ammo);
  }
  if (kind === "armor") {
    data.acBase = num(o.acBase) ?? 11;
    data.acDex = !!o.acDex;
  }
  if (kind === "shield") {
    data.acBonus = num(o.acBonus) ?? 2;
  }

  const targets = BONUS_TARGETS as readonly string[];
  const bonuses = Array.isArray(o.bonuses)
    ? (o.bonuses as unknown[])
        .map((b) => {
          const bo = (b ?? {}) as Record<string, unknown>;
          return { amount: num(bo.amount), target: str(bo.target) };
        })
        .filter((b): b is { amount: number; target: string } =>
          b.amount != null && b.amount !== 0 && targets.includes(b.target),
        )
    : [];
  if (bonuses.length) data.bonuses = bonuses;
  if (o.equippable) data.equippable = true;

  return { name, data };
}

// A stat block in SD_MONSTERS shape. Ability scores are stored as written
// modifiers ("+2"), matching the book's tables and what the GM screen renders.
function normalizeMonster(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew monster needs a name.");

  // "+2" / "2" / "-1" → "+2" / "-1"; anything unreadable becomes "+0".
  const mod = (v: unknown): string => {
    const n = parseInt(String(v ?? "").trim().replace(/^\+/, ""), 10);
    const val = Number.isFinite(n) ? n : 0;
    return (val >= 0 ? "+" : "") + val;
  };

  const types = MONSTER_TYPES as readonly string[];
  // Movement is one of the book's three distances, stored lowercase as the
  // stat blocks write it.
  const MOVES = ["near", "close", "far"];
  const mv = MOVES.includes(str(o.mv).toLowerCase()) ? str(o.mv).toLowerCase() : "near";
  return {
    name,
    data: {
      name,
      ac: str(o.ac) || "10",
      hp: str(o.hp) || "1",
      atk: str(o.atk).slice(0, 500),
      mv,
      lv: str(o.lv) || "1",
      al: ["L", "N", "C"].includes(str(o.al).toUpperCase()) ? str(o.al).toUpperCase() : "N",
      s: mod(o.s), d: mod(o.d), c: mod(o.c), i: mod(o.i), w: mod(o.w), ch: mod(o.ch),
      notes: str(o.notes).slice(0, 4000),
      ctype: types.includes(str(o.ctype)) ? str(o.ctype) : "Monster",
    },
  };
}

// ── Backgrounds ──────────────────────────────────────────────────────────────
// A background is a name + descriptive blurb (the book's are a d20 table). The
// wizard just offers it and writes the name/blurb onto the sheet.
function normalizeBackground(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew background needs a name.");
  return { name, data: { name, desc: str(o.desc).slice(0, 2000) } };
}

// ── Ancestries ───────────────────────────────────────────────────────────────
// A name, a trait blurb, optional languages, and optional flat bonuses the
// wizard applies the same way it applies item/talent bonuses (e.g. Half-Orc's
// Mighty = +1 melee attack & damage).
function normalizeAncestry(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew ancestry needs a name.");

  const targets = BONUS_TARGETS as readonly string[];
  const bonuses = Array.isArray(o.bonuses)
    ? (o.bonuses as unknown[])
        .map((b) => {
          const bo = (b ?? {}) as Record<string, unknown>;
          return { amount: num(bo.amount), target: str(bo.target) };
        })
        .filter((b): b is { amount: number; target: string } =>
          b.amount != null && b.amount !== 0 && targets.includes(b.target),
        )
    : [];

  // Traits: [{text, effects}] using the shared Effect Builder.
  const traits: { text: string; effects: HbEffect[] }[] = Array.isArray(o.traits)
    ? (o.traits as unknown[])
        .map(cleanEffectRow)
        .filter((t) => t.text)
        .slice(0, 20)
    : [];

  const data: Record<string, unknown> = {
    name,
    traits,
    languages: str(o.languages).slice(0, 300),
  };
  if (bonuses.length) data.bonuses = bonuses;
  return { name, data };
}

// ── Classes ──────────────────────────────────────────────────────────────────
export const HD_DICE = ["1d4", "1d6", "1d8", "1d10", "1d12"] as const;
export const CAST_STATS = ["INT", "WIS", "CHA"] as const;

// The talent effect vocabulary lives in lib/effects.ts (the single source of
// truth shared with the reference pages and the Effect Builder). Imported at the
// top of this file for internal use by cleanEffect below.

// One mechanical effect shared by class talents, class features, and ancestry
// traits. `weapon` is kept only for weaponDie; `spell` for the spell targets
// (Learn Spell / Advantage: Cast Spell). perDay carries a uses/day count.
export type HbEffect = { amount: number; target: string; weapon?: string; spell?: string; feature?: string };
function cleanEffect(raw: unknown): HbEffect | null {
  const e = (raw ?? {}) as Record<string, unknown>;
  const target = str(e.target);
  if (!TALENT_TARGET_KEYS.includes(target)) return null;
  const amount = num(e.amount) ?? 0;
  if (target === "weaponDie") return { amount, target, weapon: str(e.weapon).slice(0, 60) };
  if (target === "spellKnown" || target === "advSpell") return { amount, target, spell: str(e.spell).slice(0, 80) };
  if (target === "featureCharges") return { amount, target, feature: str(e.feature).slice(0, 80) };
  return { amount, target };
}
// A row of descriptive text plus a list of effects (features, traits).
function cleanEffectRow(raw: unknown): { text: string; effects: HbEffect[] } {
  const o = (raw ?? {}) as Record<string, unknown>;
  const effects = Array.isArray(o.effects)
    ? (o.effects as unknown[]).map(cleanEffect).filter((e): e is HbEffect => e != null).slice(0, 6)
    : [];
  const row: { text: string; effects: HbEffect[]; choose?: boolean } = { text: str(o.text).slice(0, 500), effects };
  // A "choose one" trait: player picks a single effect at creation.
  if (o.choose === true) row.choose = true;
  return row;
}

function normalizeClass(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew class needs a name.");

  const hd = (HD_DICE as readonly string[]).includes(str(o.hd)) ? str(o.hd) : "1d6";

  const cleanNames = (arr: unknown): string[] =>
    Array.isArray(arr) ? (arr as unknown[]).map((x) => str(x)).filter(Boolean).slice(0, 60) : [];
  const weaponsAll = !!o.weaponsAll;
  const armorAll = !!o.armorAll;

  // Rows 2 & 3 split either 3-6/7-9 ("lo") or 3-7/8-9 ("hi"). Rows 1/4/5 fixed.
  const talentSplit = str(o.talentSplit) === "hi" ? "hi" : "lo";

  const cleanEffectLocal = cleanEffect;
  // Always exactly 5 rows; each carries up to 4 effects.
  const talentIn = Array.isArray(o.talent) ? (o.talent as unknown[]) : [];
  const talent = Array.from({ length: 5 }, (_, i) => {
    const row = (talentIn[i] ?? {}) as Record<string, unknown>;
    const effects = Array.isArray(row.effects)
      ? (row.effects as unknown[])
          .map(cleanEffectLocal)
          .filter((e): e is HbEffect => e != null)
          .slice(0, 4)
      : [];
    const out: { text: string; effects: HbEffect[]; choose?: boolean } = { text: str(row.text).slice(0, 300), effects };
    if (row.choose === true) out.choose = true;
    return out;
  });

  // Features: descriptive text + effects (Per Day drives tick boxes).
  const features = Array.isArray(o.features)
    ? (o.features as unknown[])
        .map(cleanEffectRow)
        .filter((f) => f.text)
        .slice(0, 20)
    : [];

  const data: Record<string, unknown> = {
    name,
    hd,
    weaponsAll,
    weapons: weaponsAll ? [] : cleanNames(o.weapons),
    armorAll,
    armor: armorAll ? [] : cleanNames(o.armor),
    talentSplit,
    talent,
    features,
  };

  // Optional spellcasting — DC is always 10 + tier, so it isn't stored.
  const caster = (o.caster ?? null) as Record<string, unknown> | null;
  if (caster && (str(caster.stat) || str(caster.list))) {
    const stat = str(caster.stat).toUpperCase();
    data.caster = {
      stat: (CAST_STATS as readonly string[]).includes(stat) ? stat : "INT",
      list: str(caster.list).slice(0, 40) || "Wizard",
      knownTier1: num(caster.knownTier1) ?? 2,
    };
  }

  // Optional titles by alignment — up to 5 tiers each (kept positional so a
  // blank tier stays a gap). Stored only when at least one title is filled in.
  const titlesIn = (o.titles ?? null) as Record<string, unknown> | null;
  if (titlesIn) {
    const tierList = (v: unknown): string[] =>
      Array.isArray(v) ? (v as unknown[]).map((x) => str(x).slice(0, 60)).slice(0, 5) : [];
    const L = tierList(titlesIn.Lawful);
    const N = tierList(titlesIn.Neutral);
    const C = tierList(titlesIn.Chaotic);
    if ([...L, ...N, ...C].some((x) => x)) {
      data.titles = { Lawful: L, Neutral: N, Chaotic: C };
    }
  }

  return { name, data };
}

// A Dungeon Crawler Carl item: name, category, optional tier/slot/price, effect.
// Stored in DccItem shape with source "Homebrew" so the loot page and tools can
// merge it straight into their catalog.
function normalizeDccItem(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew item needs a name.");
  const category = (DCC_ITEM_CATEGORIES as readonly string[]).includes(str(o.category))
    ? str(o.category) : "mundane";
  const data: Record<string, unknown> = {
    name,
    category,
    effect: str(o.effect).slice(0, 4000),
    source: "Homebrew",
  };
  const tier = str(o.tier);
  if ((DCC_ITEM_TIERS as readonly string[]).includes(tier)) data.tier = tier;
  if (str(o.slot)) data.slot = str(o.slot).slice(0, 60);
  const price = num(o.price);
  if (price != null && price > 0) data.price = price;
  return { name, data };
}

// ── Dungeon Crawler Carl homebrew (bestiary / skills / spells / classes / races) ──
// Each normaliser produces the exact lib/data/dcc-types shape its book dataset
// uses (source forced to "Homebrew"), so the reference pages and the HTML tools
// merge homebrew straight into their DCC_* pools with no translation.

// A trimmed, capped list of non-empty strings (grants, tags, notes…).
function strList(v: unknown, maxItems: number, maxLen: number): string[] {
  return Array.isArray(v)
    ? (v as unknown[]).map((x) => str(x).slice(0, maxLen)).filter(Boolean).slice(0, maxItems)
    : [];
}

// Rank-gated upgrades: [{rank: 5|10|15, text}] kept in ascending rank order.
function upgradesFrom(v: unknown): { rank: number; text: string }[] {
  if (!Array.isArray(v)) return [];
  const ranks = DCC_UPGRADE_RANKS as readonly number[];
  return (v as unknown[])
    .map((u) => {
      const o = (u ?? {}) as Record<string, unknown>;
      const rank = num(o.rank);
      return { rank: rank != null && ranks.includes(rank) ? rank : 5, text: str(o.text).slice(0, 600) };
    })
    .filter((u) => u.text)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);
}

// One DccStat "score → mod" cell. Score defaults to 1, mod to 0.
function statCell(v: unknown): { score: number; mod: number } {
  const o = (v ?? {}) as Record<string, unknown>;
  const score = num(o.score);
  const mod = num(o.mod);
  return { score: score != null && score > 0 ? score : 1, mod: mod ?? 0 };
}

// A homebrew Mob / Boss stat block (DccMonster shape). The guided builder sends
// per-stat SCORES (point-bought: Mob base 1 + 3/Level; Boss base 5 + Table-50/Level)
// and a Floor; stat mods, Health-Bar slots (Mob = Level max 10 / Boss = Table 50 +
// F, each slot = CON Mod) and defences derive from the rulebook here so a saved
// build is correct even if the GM never clicks "Apply". An explicit stats/hbSlots
// block (hand-edited) still wins.
function normalizeDccMonster(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew monster needs a name.");

  const roles = DCC_MONSTER_ROLES as readonly string[];
  const role = roles.includes(str(o.role)) ? str(o.role) : "Mob";
  const size = Math.min(8, Math.max(1, num(o.size) ?? 4));
  const level = Math.max(1, num(o.level) ?? 1);
  const floor = Math.max(0, num(o.floor) ?? 0);

  // Stats: derive score→mod from the builder's `scores`; fall back to an explicit
  // {score,mod} block from a hand-edited/legacy entry.
  const stats: Record<string, { score: number; mod: number }> = {};
  const scoresIn = (o.scores ?? null) as Record<string, unknown> | null;
  const statsIn = (o.stats ?? {}) as Record<string, unknown>;
  for (const k of DCC_STATS) {
    if (scoresIn && scoresIn[k.toLowerCase()] != null) {
      const sc = Math.max(statBase(role), num(scoresIn[k.toLowerCase()]) ?? statBase(role));
      stats[k] = { score: sc, mod: dccStatMod(sc) };
    } else {
      stats[k] = statCell(statsIn[k]);
    }
  }

  // Health-Bar slots: explicit array wins; else slotCount × hpPerSlot; else the
  // rulebook count for this role/level/floor, each slot = CON Mod.
  let hbSlots: number[];
  if (Array.isArray(o.hbSlots) && o.hbSlots.length) {
    hbSlots = (o.hbSlots as unknown[]).map((n) => Math.max(0, num(n) ?? 0)).slice(0, 60);
  } else {
    const count = Math.min(60, Math.max(1, num(o.slotCount) ?? hbSlotCount(role, level, floor)));
    const hp = Math.max(1, num(o.hpPerSlot) ?? (stats.CON.mod || 1));
    hbSlots = Array.from({ length: count }, () => hp);
  }

  const attacks = Array.isArray(o.attacks)
    ? (o.attacks as unknown[])
        .map((a) => {
          const ao = (a ?? {}) as Record<string, unknown>;
          const an = str(ao.name).slice(0, 120);
          const out: Record<string, unknown> = {
            name: an,
            toHit: str(ao.toHit).slice(0, 40),
            damage: str(ao.damage).slice(0, 60),
          };
          if (str(ao.damageType)) out.damageType = str(ao.damageType).slice(0, 40);
          if (str(ao.range)) out.range = str(ao.range).slice(0, 80);
          if (str(ao.rider)) out.rider = str(ao.rider).slice(0, 600);
          return out;
        })
        .filter((a) => a.name)
        .slice(0, 12)
    : [];

  // DR is usually a number but a few blocks print "F" (DR = Floor Number).
  // Default DR = the Floor Number (p. 272).
  const drRaw = str(o.dr);
  const drNum = num(o.dr);
  const dr: number | string = drRaw.toUpperCase() === "F" ? "F" : drNum != null ? drNum : Math.max(1, floor);

  return {
    name,
    data: {
      name,
      role,
      size,
      tags: strList(o.tags, 12, 40),
      level,
      hbSlots,
      surprise: str(o.surprise).slice(0, 20) || `${10 + stats.INT.mod}+F`,
      evade: str(o.evade).slice(0, 20) || `${10 + stats.DEX.mod}+F`,
      move: str(o.move).slice(0, 20) || "20+S",
      dr,
      stats,
      attacks,
      notes: strList(o.notes, 20, 800),
      page: num(o.page) ?? 0,
      source: "Homebrew",
    },
  };
}

// A homebrew Skill (DccSkill shape). Attack skills carry damage/range fields;
// utility skills leave them blank. `stat` is a DccStat or null (pure passive).
function normalizeDccSkill(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew skill needs a name.");

  const category = (DCC_SKILL_CATEGORIES as readonly string[]).includes(str(o.category))
    ? str(o.category) : "utility";
  const statRaw = str(o.stat).toUpperCase();
  const stat = (DCC_STATS as readonly string[]).includes(statRaw) ? statRaw : null;

  const data: Record<string, unknown> = {
    name,
    category,
    stat,
    passive: !!o.passive,
    interrupt: !!o.interrupt,
    desc: str(o.desc).slice(0, 4000),
    upgrades: upgradesFrom(o.upgrades),
    page: num(o.page) ?? 0,
    source: "Homebrew",
  };
  if (str(o.group)) data.group = str(o.group).slice(0, 60);
  if (category === "attack") {
    if (str(o.damage)) data.damage = str(o.damage).slice(0, 60);
    if (str(o.damageType)) data.damageType = str(o.damageType).slice(0, 40);
    if (str(o.range)) data.range = str(o.range).slice(0, 60);
    if (str(o.cooldown)) data.cooldown = str(o.cooldown).slice(0, 60);
  }
  if (str(o.limitations)) data.limitations = str(o.limitations).slice(0, 200);
  return { name, data };
}

// A homebrew Spell (DccSpell shape). Mana cost + governing stat + rank upgrades.
function normalizeDccSpell(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew spell needs a name.");

  const type = (DCC_SPELL_TYPES as readonly string[]).includes(str(o.type)) ? str(o.type) : "utility";
  const statRaw = str(o.stat).toUpperCase();
  const stat = (DCC_STATS as readonly string[]).includes(statRaw) ? statRaw : "INT";

  const data: Record<string, unknown> = {
    name,
    mana: Math.max(0, num(o.mana) ?? 1),
    type,
    stat,
    passive: !!o.passive,
    desc: str(o.desc).slice(0, 4000),
    upgrades: upgradesFrom(o.upgrades),
    page: num(o.page) ?? 0,
    source: "Homebrew",
  };
  const aiFavor = num(o.aiFavor);
  if (aiFavor != null) data.aiFavor = aiFavor;
  return { name, data };
}

// Races & classes carry their stat bonuses the way the book does: as grant
// bullets like "+2 Strength" that the creation wizard parses into stat mods
// (raceStatMods). This folds the editor's structured `statBonuses` control AND
// any single-stat bonus a user typed by hand into one canonical, de-duplicated
// set of "+N <FullStat>" bullets (book style, so the wizard applies them), then
// appends the remaining free-text grants (compound bonuses like "+1 Strength and
// Dexterity" are left as-is — the wizard already understands those).
const DCC_STAT_FULL: Record<string, string> = {
  str: "Strength", int: "Intelligence", con: "Constitution", dex: "Dexterity", cha: "Charisma",
};
const DCC_STAT_TOKEN: Record<string, string> = {
  str: "str", strength: "str", int: "int", intelligence: "int", con: "con", constitution: "con",
  dex: "dex", dexterity: "dex", cha: "cha", charisma: "cha",
};
function dccStatGrants(o: Record<string, unknown>): string[] {
  const order = ["str", "int", "con", "dex", "cha"];
  const mods: Record<string, number> = { str: 0, int: 0, con: 0, dex: 0, cha: 0 };

  const sb = (o.statBonuses ?? {}) as Record<string, unknown>;
  for (const k of order) { const n = num(sb[k]); if (n) mods[k] += n; }

  // Pull single-stat bonus bullets out of the free-text grants and merge them.
  const free: string[] = [];
  const rows = Array.isArray(o.grants) ? (o.grants as unknown[]) : [];
  for (const g of rows) {
    const s = str(g).slice(0, 400);
    const m = s.match(/^\s*([+-]\d+)\s+([A-Za-z]+)\s*$/);
    const id = m ? DCC_STAT_TOKEN[m[2].toLowerCase()] : undefined;
    if (m && id) mods[id] += parseInt(m[1], 10);
    else if (s) free.push(s);
  }

  const bullets = order
    .filter((k) => mods[k])
    .map((k) => `${mods[k] > 0 ? "+" : ""}${mods[k]} ${DCC_STAT_FULL[k]}`);
  return [...bullets, ...free].slice(0, 24);
}

// Race/Class point-buy → the stored `grants` (book-shaped bullets, incl. "+N Stat"
// the wizard applies) plus the structured `build` (validated selections + spend
// totals) the editor reloads. Falls back to the legacy grant/statBonuses path when
// an entry has no point-buy build (a free-form entry from the earlier editor).
function dccBuild(o: Record<string, unknown>): { grants: string[]; build?: Record<string, unknown> } {
  const raw = (o.build as { selections?: unknown } | undefined)?.selections;
  if (Array.isArray(raw)) {
    const selections = sanitizeSelections(raw);
    const res = summarizeBuild(selections);
    return {
      grants: res.grants,
      build: { selections, spent: res.spent, detriments: res.detrimentPoints, net: res.net },
    };
  }
  return { grants: dccStatGrants(o) };
}

// A homebrew Race (DccRace shape): a size, a group (Earth/Alien), and the
// bullet list of mechanical grants the reference page and wizard show.
function normalizeDccRace(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew race needs a name.");

  const group = (DCC_RACE_GROUPS as readonly string[]).includes(str(o.group)) ? str(o.group) : "Earth";
  const b = dccBuild(o);
  const data: Record<string, unknown> = {
    name,
    group,
    size: Math.min(8, Math.max(1, num(o.size) ?? 4)),
    grants: b.grants,
    page: num(o.page) ?? 0,
    source: "Homebrew",
  };
  if (b.build) data.build = b.build;
  if (str(o.prerequisites)) data.prerequisites = str(o.prerequisites).slice(0, 300);
  return { name, data };
}

// A homebrew Class (DccClass shape): base category tags, the grants list, and
// whether picking it hands out a Silver Earth Box (Earth Class).
function normalizeDccClass(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew class needs a name.");

  const categories = strList(o.categories, 6, 60);
  const b = dccBuild(o);
  const data: Record<string, unknown> = {
    name,
    categories: categories.length ? categories : [name],
    grants: b.grants,
    earthClass: !!o.earthClass,
    page: num(o.page) ?? 0,
    source: "Homebrew",
  };
  if (b.build) data.build = b.build;
  if (str(o.prerequisites)) data.prerequisites = str(o.prerequisites).slice(0, 300);
  return { name, data };
}

// ─────────────────────────────────────────────────────────────────────────────
// D&D 2024 homebrew — each normaliser produces the exact lib/data/dnd-types
// shape its reference page + tools consume, with `source: "Homebrew"` forced so
// pages/tools merge it straight into their DND_* pools with no translation.
// ─────────────────────────────────────────────────────────────────────────────
export const DND_ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;
export const DND_DAMAGE_TYPES = [
  "acid", "bludgeoning", "cold", "fire", "force", "lightning",
  "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder",
] as const;
export const DND_WEAPON_CATEGORIES = ["Simple", "Martial"] as const;
export const DND_WEAPON_KINDS = ["Melee", "Ranged"] as const;
export const DND_MASTERIES = ["Cleave", "Graze", "Nick", "Push", "Sap", "Slow", "Topple", "Vex"] as const;
export const DND_ARMOR_CATEGORIES = ["Light", "Medium", "Heavy", "Shield"] as const;
export const DND_RARITIES = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Artifact", "Varies"] as const;
export const DND_SCHOOLS = [
  "Abjuration", "Conjuration", "Divination", "Enchantment",
  "Evocation", "Illusion", "Necromancy", "Transmutation",
] as const;
export const DND_SPELL_CLASSES = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"] as const;
export const DND_SIZES = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as const;
export const DND_FEAT_CATEGORIES = ["Origin", "General", "Fighting Style", "Epic Boon"] as const;
export const DND_MONSTER_GROUPS = [
  "Humanoids", "Beasts", "Monstrosities", "Undead", "Fiends", "Celestials", "Fey",
  "Dragons", "Giants", "Elementals", "Constructs", "Aberrations", "Oozes", "Plants",
] as const;
// Mechanical bonuses a homebrew magic item can grant, each mapped to a real
// character-sheet effect (see magicBonuses/magicSum in dnd_character_sheet.html).
export const DND_ITEM_BONUS_TARGETS = [
  "ac", "save", "hp", "speed", "init", "spellAtk", "spellDC", "atk",
  "str", "dex", "con", "int", "wis", "cha",
] as const;

// A validated list of {target, amount} bonus rows for a homebrew magic item.
function dndBonusList(v: unknown): { target: string; amount: number }[] {
  const targets = DND_ITEM_BONUS_TARGETS as readonly string[];
  return Array.isArray(v)
    ? (v as unknown[])
        .map((b) => { const o = (b ?? {}) as Record<string, unknown>; return { target: str(o.target), amount: num(o.amount) }; })
        .filter((b): b is { target: string; amount: number } => b.amount != null && b.amount !== 0 && targets.includes(b.target))
        .slice(0, 14)
    : [];
}

// Challenge Rating → XP and Proficiency Bonus (2024 tables), for auto-deriving a
// homebrew creature's XP/PB from its CR when they're left blank.
const CR_XP: Record<string, number> = {
  "0": 10, "1/8": 25, "1/4": 50, "1/2": 100, "1": 200, "2": 450, "3": 700, "4": 1100,
  "5": 1800, "6": 2300, "7": 2900, "8": 3900, "9": 5000, "10": 5900, "11": 7200, "12": 8400,
  "13": 10000, "14": 11500, "15": 13000, "16": 15000, "17": 18000, "18": 20000, "19": 22000,
  "20": 25000, "21": 33000, "22": 41000, "23": 50000, "24": 62000, "25": 75000, "26": 90000,
  "27": 105000, "28": 120000, "29": 135000, "30": 155000,
};
function crToNum(cr: string): number {
  const s = str(cr);
  if (s.includes("/")) { const [a, b] = s.split("/").map(Number); return b ? a / b : 0; }
  return parseFloat(s) || 0;
}
function crToPB(cr: string): number {
  const n = crToNum(cr);
  return n >= 29 ? 9 : n >= 25 ? 8 : n >= 21 ? 7 : n >= 17 ? 6 : n >= 13 ? 5 : n >= 9 ? 4 : n >= 5 ? 3 : 2;
}

// The leading dice expression ("3d6", "2d8+1") from an input, ignoring any
// trailing text ("2d8 + your mod", "1d6 per level" → "2d8", "1d6"), else "".
function cleanDice(v: unknown): string {
  const m = str(v).replace(/\s+/g, "").match(/^\d{1,3}d\d{1,3}([+-]\d{1,3})?/i);
  return m ? m[0] : "";
}
// One in a fixed vocabulary, else the given default.
function oneOf<T extends string>(v: unknown, list: readonly T[], dflt: T): T {
  const s = str(v);
  return (list as readonly string[]).includes(s) ? (s as T) : dflt;
}
// Free list of names validated against a vocabulary (drops anything unknown).
function pickList<T extends string>(v: unknown, list: readonly T[]): T[] {
  const arr = Array.isArray(v) ? (v as unknown[]).map(str) : [];
  return arr.filter((x): x is T => (list as readonly string[]).includes(x));
}
// {name, description} rows for traits / monster actions.
function nameDescList(v: unknown, maxItems: number): { name: string; description: string }[] {
  return Array.isArray(v)
    ? (v as unknown[])
        .map((o) => {
          const r = (o ?? {}) as Record<string, unknown>;
          return { name: str(r.name).slice(0, 120), description: str(r.description).slice(0, 4000) };
        })
        .filter((r) => r.name || r.description)
        .slice(0, maxItems)
    : [];
}

// ── Equipment (weapon | armor | gear | magic item) ───────────────────────────
// One editor, four target shapes. `hbKind` tells the reference page which
// Equipment mode to slot the entry into.
function normalizeDndEquipment(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew equipment entry needs a name.");
  const hbKind = oneOf(o.hbKind, ["weapon", "armor", "gear", "magic"] as const, "gear");
  const base: Record<string, unknown> = { name, hbKind, source: "Homebrew" };

  if (hbKind === "weapon") {
    return { name, data: {
      ...base,
      category: oneOf(o.category, DND_WEAPON_CATEGORIES, "Simple"),
      kind: oneOf(o.kind, DND_WEAPON_KINDS, "Melee"),
      cost: str(o.cost).slice(0, 40) || "—",
      damage: str(o.damage).slice(0, 40) || "1d4",
      damageType: oneOf(o.damageType, DND_DAMAGE_TYPES, "bludgeoning"),
      weight: str(o.weight).slice(0, 40) || "—",
      properties: strList(o.properties, 12, 60),
      mastery: oneOf(o.mastery, ["", ...DND_MASTERIES] as const, ""),
    } };
  }
  if (hbKind === "armor") {
    return { name, data: {
      ...base,
      category: oneOf(o.category, DND_ARMOR_CATEGORIES, "Light"),
      cost: str(o.cost).slice(0, 40) || "—",
      baseAC: str(o.baseAC).slice(0, 60) || "11 + Dex modifier",
      strength: str(o.strength).slice(0, 40),
      stealthDisadvantage: !!o.stealthDisadvantage,
      weight: str(o.weight).slice(0, 40) || "—",
    } };
  }
  if (hbKind === "magic") {
    // A base weapon makes this a magic weapon: the type becomes "Weapon (base)",
    // which the sheet reads to build the attack row and fold in the atk bonus.
    const baseWeapon = str(o.baseWeapon).slice(0, 60);
    const magic: Record<string, unknown> = {
      ...base,
      type: baseWeapon ? `Weapon (${baseWeapon})` : (str(o.type).slice(0, 80) || "Wondrous Item"),
      rarity: oneOf(o.rarity, DND_RARITIES, "Uncommon"),
      attunement: !!o.attunement,
      attunementNote: str(o.attunementNote).slice(0, 200),
      description: str(o.description).slice(0, 6000),
    };
    if (baseWeapon) magic.baseWeapon = baseWeapon;   // remembered so the editor can re-populate it
    const bonuses = dndBonusList(o.bonuses);
    if (bonuses.length) magic.bonuses = bonuses;     // mechanical effects the sheet applies while equipped
    return { name, data: magic };
  }
  return { name, data: {
    ...base,
    category: str(o.category).slice(0, 60) || "Adventuring Gear",
    cost: str(o.cost).slice(0, 40) || "—",
    weight: str(o.weight).slice(0, 40) || "—",
    description: str(o.description).slice(0, 4000),
  } };
}

// ── Feat (DndFeat) ───────────────────────────────────────────────────────────
function normalizeDndFeat(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew feat needs a name.");
  return { name, data: {
    name,
    category: oneOf(o.category, DND_FEAT_CATEGORIES, "General"),
    prerequisite: str(o.prerequisite).slice(0, 200),
    abilityScores: pickList(o.abilityScores, DND_ABILITIES),
    benefits: strList(o.benefits, 20, 2000),
    repeatable: !!o.repeatable,
    source: "Homebrew",
  } };
}

// ── Background (DndBackground) ───────────────────────────────────────────────
function normalizeDndBackground(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew background needs a name.");
  return { name, data: {
    name,
    abilityScores: pickList(o.abilityScores, DND_ABILITIES).slice(0, 3),
    feat: str(o.feat).slice(0, 120),
    skillProficiencies: strList(o.skillProficiencies, 8, 60),
    toolProficiencies: strList(o.toolProficiencies, 8, 60),
    equipment: strList(o.equipment, 8, 300),
    description: str(o.description).slice(0, 4000),
    source: "Homebrew",
  } };
}

// ── Spell (DndSpell) ─────────────────────────────────────────────────────────
function normalizeDndSpell(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew spell needs a name.");
  const level = num(o.level);
  const data: Record<string, unknown> = {
    name,
    level: level != null && level >= 0 && level <= 9 ? level : 0,
    school: oneOf(o.school, DND_SCHOOLS, "Evocation"),
    castingTime: str(o.castingTime).slice(0, 80) || "Action",
    range: str(o.range).slice(0, 80) || "Self",
    components: str(o.components).slice(0, 200) || "V, S",
    duration: str(o.duration).slice(0, 80) || "Instantaneous",
    concentration: !!o.concentration,
    ritual: !!o.ritual,
    classes: pickList(o.classes, DND_SPELL_CLASSES),
    description: str(o.description).slice(0, 6000),
    source: "Homebrew",
  };
  if (str(o.higherLevels)) data.higherLevels = str(o.higherLevels).slice(0, 2000);
  // Structured combat fields so the sheet can roll the spell when cast. Stored
  // only when present, so a book-shaped spell (damage in its text) is unchanged.
  const roll = oneOf(o.roll, ["attack", "save"] as const, "" as "attack" | "save" | "");
  if (roll) data.roll = roll;
  if (roll === "save") data.saveAbility = oneOf(o.saveAbility, DND_ABILITIES, "DEX");
  const dmg = cleanDice(o.damage);
  if (dmg) { data.damage = dmg; const dt = oneOf(o.damageType, ["", ...DND_DAMAGE_TYPES] as const, ""); if (dt) data.damageType = dt; }
  const heal = cleanDice(o.heal); if (heal) data.heal = heal;
  const up = cleanDice(o.upcast); if (up) data.upcast = up;
  return { name, data };
}

// ── Species (DndSpecies) ─────────────────────────────────────────────────────
// One "Trait Name — description" (or "Name: description") per line → {name, description}.
function parseTraitLines(v: unknown, maxItems: number): { name: string; description: string }[] {
  return str(v).split("\n").map((line) => {
    const m = line.match(/^\s*(.+?)\s*(?:[—:–-]\s*|\s{2,})(.+)$/);
    if (m) return { name: m[1].slice(0, 120), description: m[2].slice(0, 2000) };
    const t = line.trim();
    return t ? { name: t.slice(0, 120), description: "" } : { name: "", description: "" };
  }).filter((t) => t.name).slice(0, maxItems);
}
function normalizeDndSpecies(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew species needs a name.");
  const speed = num(o.speed);
  const dv = num(o.darkvision);
  const data: Record<string, unknown> = {
    name,
    size: oneOf(o.size, DND_SIZES, "Medium"),
    speed: speed != null && speed >= 0 ? speed : 30,
    darkvision: dv != null && dv >= 0 ? dv : 0,
    creatureType: str(o.creatureType).slice(0, 60) || "Humanoid",
    traits: nameDescList(o.traits, 24),
    flavor: str(o.flavor).slice(0, 2000),
    source: "Homebrew",
  };
  // Optional lineages (High-Elf / Wood-Elf style sub-options): each has a name and
  // its own traits, entered one "Name — description" per line.
  const lineages = (Array.isArray(o.lineages) ? (o.lineages as unknown[]) : [])
    .map((l) => { const r = (l ?? {}) as Record<string, unknown>; return { name: str(r.name).slice(0, 120), traits: parseTraitLines(r.traits, 12) }; })
    .filter((l) => l.name)
    .slice(0, 8);
  if (lineages.length) data.lineages = lineages;
  return { name, data };
}

// ── Monster / creature (DndMonster) ──────────────────────────────────────────
function normalizeDndMonster(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew creature needs a name.");
  const ab = (o.abilities ?? {}) as Record<string, unknown>;
  const abilities: Record<string, number> = {};
  for (const k of DND_ABILITIES) { const n = num(ab[k]); abilities[k] = n != null && n >= 1 ? n : 10; }
  const hp = num(o.hp);
  const ac = num(o.ac);
  const xp = num(o.xp);
  const pb = num(o.proficiencyBonus);
  const cr = str(o.cr).slice(0, 12) || "0";
  const data: Record<string, unknown> = {
    name,
    size: oneOf(o.size, DND_SIZES, "Medium"),
    type: str(o.type).slice(0, 80) || "Humanoid",
    alignment: str(o.alignment).slice(0, 60) || "Unaligned",
    ac: ac != null && ac >= 0 ? ac : 10,
    hp: hp != null && hp >= 1 ? hp : 1,
    hpFormula: str(o.hpFormula).slice(0, 60) || String(hp != null && hp >= 1 ? hp : 1),
    speed: str(o.speed).slice(0, 120) || "30 ft.",
    abilities,
    senses: str(o.senses).slice(0, 200) || "Passive Perception 10",
    languages: str(o.languages).slice(0, 200),
    cr,
    // XP and Proficiency Bonus default from the CR table (2024) when left blank.
    xp: xp != null && xp > 0 ? xp : (CR_XP[cr] ?? 0),
    proficiencyBonus: pb != null && pb >= 2 ? pb : crToPB(cr),
    traits: nameDescList(o.traits, 20),
    actions: nameDescList(o.actions, 20),
    group: oneOf(o.group, DND_MONSTER_GROUPS, "Humanoids"),
    source: "Homebrew",
  };
  if (str(o.acNote)) data.acNote = str(o.acNote).slice(0, 80);
  if (str(o.savingThrows)) data.savingThrows = str(o.savingThrows).slice(0, 200);
  if (str(o.skills)) data.skills = str(o.skills).slice(0, 200);
  if (str(o.damageResistances)) data.damageResistances = str(o.damageResistances).slice(0, 200);
  if (str(o.damageImmunities)) data.damageImmunities = str(o.damageImmunities).slice(0, 200);
  if (str(o.damageVulnerabilities)) data.damageVulnerabilities = str(o.damageVulnerabilities).slice(0, 200);
  if (str(o.conditionImmunities)) data.conditionImmunities = str(o.conditionImmunities).slice(0, 200);
  const bonus = nameDescList(o.bonusActions, 20); if (bonus.length) data.bonusActions = bonus;
  const reac = nameDescList(o.reactions, 20); if (reac.length) data.reactions = reac;
  const leg = nameDescList(o.legendaryActions, 20); if (leg.length) data.legendaryActions = leg;
  return { name, data };
}

// ── Subclass (DndSubclass) ───────────────────────────────────────────────────
// A homebrew subclass attaches to an official base class and carries its perks
// as per-level features. On the sheet these merge into the base class's
// subclasses[] and auto-apply at their level like any book subclass feature
// (feature list, per-rest trackers, granted spells). The `subclass` field on
// each feature marks it as a subclass feature (base features use !subclass).
function normalizeDndSubclass(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 120);
  if (!name) throw new Error("A homebrew subclass needs a name.");
  const className = str(o.className).slice(0, 120);
  if (!className) throw new Error("Choose the base class this subclass belongs to.");

  const features = (Array.isArray(o.features) ? (o.features as unknown[]) : [])
    .map((f) => {
      const r = (f ?? {}) as Record<string, unknown>;
      const lvl = num(r.level);
      const feat: Record<string, unknown> = {
        name: str(r.name).slice(0, 120),
        level: lvl != null && lvl >= 1 && lvl <= 20 ? lvl : 3,
        subclass: name,
        description: str(r.description).slice(0, 4000),
        source: "Homebrew" as const,
      };
      // Optional rollable effect — the sheet shows a Roll button inline with it.
      const dmg = cleanDice(r.damage);
      if (dmg) { feat.damage = dmg; const dt = oneOf(r.damageType, ["", ...DND_DAMAGE_TYPES] as const, ""); if (dt) feat.damageType = dt; }
      const heal = cleanDice(r.heal); if (heal) feat.heal = heal;
      return feat;
    })
    .filter((f) => f.name)
    .sort((a, b) => (a.level as number) - (b.level as number))
    .slice(0, 40);

  return { name, data: {
    name,
    className,
    flavor: str(o.flavor).slice(0, 2000),
    features,
    source: "Homebrew",
  } };
}

// ═══════════════════════════════════════════════════════════════════════════
// Nimble / SW / ACE / KOB homebrew — each normaliser emits the exact
// public/tools-data/{sys}-*.js book shape (see lib/data/{sys}-types.ts), forces
// source:"Homebrew" so the runtime loaders can strip/re-inject idempotently, and
// clamps every field. page is 0 (consumers guard `page ? …`). components/
// HomebrewEditor is the UI; these functions are the validators.
// ═══════════════════════════════════════════════════════════════════════════

// An array of small string-keyed objects (abilities, traits, notes-with-fields).
function objList(v: unknown, fields: readonly string[], maxItems: number, maxLen: number): Record<string, string>[] {
  if (!Array.isArray(v)) return [];
  const out: Record<string, string>[] = [];
  for (const raw of v) {
    if (!raw || typeof raw !== "object") continue;
    const o = raw as Record<string, unknown>;
    const row: Record<string, string> = {}; let any = false;
    for (const f of fields) { const s = str(o[f]).slice(0, maxLen); if (s) any = true; row[f] = s; }
    if (any) { out.push(row); if (out.length >= maxItems) break; }
  }
  return out;
}
const truthy = (v: unknown): boolean => v === true || str(v) === "true";

// ── Nimble ──────────────────────────────────────────────────────────────────
const NIMBLE_ITEM_CATEGORIES = ["Cloth", "Leather", "Mail", "Plate", "Shield", "Melee Weapon", "Ranged Weapon", "Key Equipment", "Adventuring Gear", "Magic Item", "Spell Scroll", "Wand"] as const;
const NIMBLE_SCHOOLS = ["Fire", "Ice", "Lightning", "Wind", "Radiant", "Necrotic", "Utility"] as const;
const NIMBLE_TARGETING = ["Single Target", "AoE", "Self", "Utility"] as const;
const NIMBLE_ANCESTRY_GROUPS = ["Common", "Exotic"] as const;
const NIMBLE_ARMOR = ["M", "H"] as const;

function normalizeNimbleItem(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew item needs a name.");
  const data: Record<string, unknown> = { name, category: oneOf(o.category, NIMBLE_ITEM_CATEGORIES, "Adventuring Gear"), page: 0, source: "Homebrew" };
  if (str(o.armor)) data.armor = str(o.armor).slice(0, 40);
  if (str(o.damage)) data.damage = str(o.damage).slice(0, 60);
  if (str(o.properties)) data.properties = str(o.properties).slice(0, 200);
  if (str(o.cost)) data.cost = str(o.cost).slice(0, 40);
  if (str(o.rarity)) data.rarity = str(o.rarity).slice(0, 60);
  if (str(o.description)) data.description = str(o.description).slice(0, 2000);
  return { name, data };
}
function normalizeNimbleSpell(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew spell needs a name.");
  const tier = num(o.tier);
  const data: Record<string, unknown> = {
    name, school: oneOf(o.school, NIMBLE_SCHOOLS, "Utility"),
    tier: tier != null && tier >= 0 ? Math.min(9, Math.floor(tier)) : 0,
    actions: str(o.actions).slice(0, 40) || "1 Action",
    text: str(o.text).slice(0, 3000), page: 0, source: "Homebrew",
  };
  if (str(o.targeting)) data.targeting = oneOf(o.targeting, NIMBLE_TARGETING, "Single Target");
  if (truthy(o.utility)) data.utility = true;
  return { name, data };
}
function normalizeNimbleMonster(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew monster needs a name.");
  const data: Record<string, unknown> = {
    name, family: str(o.family).slice(0, 60) || "Homebrew",
    level: str(o.level).slice(0, 20) || "1", hp: num(o.hp),
    armor: (NIMBLE_ARMOR as readonly string[]).includes(str(o.armor)) ? str(o.armor) : null,
    legendary: truthy(o.legendary), minion: truthy(o.minion),
    abilities: objList(o.abilities, ["name", "text"], 30, 1000),
    page: 0, source: "Homebrew",
  };
  if (str(o.size)) data.size = str(o.size).slice(0, 20);
  if (str(o.saves)) data.saves = str(o.saves).slice(0, 80);
  if (str(o.familyTrait)) data.familyTrait = str(o.familyTrait).slice(0, 1000);
  if (str(o.description)) data.description = str(o.description).slice(0, 2000);
  return { name, data };
}
function normalizeNimbleAncestry(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew ancestry needs a name.");
  const data: Record<string, unknown> = {
    name, group: oneOf(o.group, NIMBLE_ANCESTRY_GROUPS, "Common"),
    size: str(o.size).slice(0, 40) || "Medium",
    description: str(o.description).slice(0, 2000),
    traits: objList(o.traits, ["name", "text"], 20, 1000),
    page: 0, source: "Homebrew",
  };
  return { name, data };
}

// ── SW ────────────────────────────────────────────────────────────────────
const SW_WEAPON_KINDS = ["Blaster", "Melee", "Grenade", "Heavy", "Vehicle", "Starship", "Capital", "Artillery", "Droid"] as const;
const SW_GEAR_CATEGORIES = ["Armor", "Medical", "Tool", "Communication", "Survival", "Droid", "Misc"] as const;
const SW_BOOKS = ["core", "sourcebook", "companion"] as const;
const SW_ATTRIBUTES = ["Dexterity", "Knowledge", "Mechanical", "Perception", "Strength", "Technical"] as const;
const SW_CHAR_GROUPS = ["Imperial", "Rebel", "Civilian", "Alien", "Droid", "Creature"] as const;

// A die code "3D+2" / "4D" / "5D-1" → pips (1D = 3). null if blank/unparseable.
function swPips(v: unknown): number | null {
  const m = /^\s*(\d+)\s*D\s*([+-]\s*\d+)?\s*$/i.exec(str(v));
  if (!m) return null;
  return parseInt(m[1], 10) * 3 + (m[2] ? parseInt(m[2].replace(/\s+/g, ""), 10) : 0);
}
function normalizeSwWeapon(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew weapon needs a name.");
  const damageText = str(o.damageText || o.damage).slice(0, 20);
  const data: Record<string, unknown> = {
    name, kind: oneOf(o.kind, SW_WEAPON_KINDS, "Blaster"),
    damage: swPips(damageText), book: oneOf(o.book, SW_BOOKS, "companion"),
    page: 0, source: "Homebrew",
  };
  if (damageText) data.damageText = damageText;
  if (str(o.range)) data.range = str(o.range).slice(0, 60);
  if (str(o.skill)) data.skill = str(o.skill).slice(0, 40);
  if (str(o.notes)) data.notes = str(o.notes).slice(0, 400);
  if (str(o.cost)) data.cost = str(o.cost).slice(0, 40);
  if (str(o.availability)) data.availability = str(o.availability).slice(0, 40);
  return { name, data };
}
function normalizeSwGear(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew gear entry needs a name.");
  const data: Record<string, unknown> = {
    name, category: oneOf(o.category, SW_GEAR_CATEGORIES, "Misc"),
    description: str(o.description).slice(0, 2000), book: oneOf(o.book, SW_BOOKS, "companion"),
    page: 0, source: "Homebrew",
  };
  if (str(o.cost)) data.cost = str(o.cost).slice(0, 40);
  if (str(o.stats)) data.stats = str(o.stats).slice(0, 200);
  return { name, data };
}
function normalizeSwForce(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew Force power needs a name.");
  const data: Record<string, unknown> = {
    name, attribute: str(o.attribute).slice(0, 60) || "Control",
    difficulty: str(o.difficulty).slice(0, 200), description: str(o.description).slice(0, 3000),
    book: oneOf(o.book, SW_BOOKS, "companion"), page: 0, source: "Homebrew",
  };
  if (str(o.time)) data.time = str(o.time).slice(0, 120);
  const req = strList(o.requires, 20, 80); if (req.length) data.requires = req;
  return { name, data };
}
function normalizeSwCharacter(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew character needs a name.");
  const attributes: Record<string, number> = {};
  for (const a of SW_ATTRIBUTES) { const p = swPips(o[a]); if (p != null) attributes[a] = p; }
  const data: Record<string, unknown> = {
    name, group: oneOf(o.group, SW_CHAR_GROUPS, "Alien"), attributes,
    skills: strList(o.skills, 40, 200), equipment: strList(o.equipment, 40, 200),
    book: oneOf(o.book, SW_BOOKS, "companion"), page: 0, source: "Homebrew",
  };
  if (str(o.description)) data.description = str(o.description).slice(0, 2000);
  if (str(o.move)) data.move = str(o.move).slice(0, 40);
  if (str(o.notes)) data.notes = str(o.notes).slice(0, 400);
  return { name, data };
}

// ── ACE ─────────────────────────────────────────────────────────────────────
const ACE_STATS = ["Smarts", "Moves", "Style", "Brawn", "Power"] as const;
const ACE_GEAR_TIERS = ["Free", "Normal", "Hard", "Herculean", "Impossible"] as const;

function normalizeAceRole(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew role needs a name.");
  const statMods: Record<string, number> = {};
  for (const st of ACE_STATS) { const n = num(o["mod" + st]); if (n != null && n !== 0) statMods[st] = n; }
  const data: Record<string, unknown> = {
    name, category: str(o.category).slice(0, 60) || "Species",
    setting: str(o.setting).slice(0, 40) || "core",
    ability: str(o.ability).slice(0, 4000), page: 0, source: "Homebrew",
  };
  if (truthy(o.power)) data.power = true;
  const gf = strList(o.grantsFocus, 20, 60); if (gf.length) data.grantsFocus = gf;
  if (Object.keys(statMods).length) data.statMods = statMods;
  const hb = num(o.healthBonus); if (hb != null && hb !== 0) data.healthBonus = hb;
  return { name, data };
}
function normalizeAceGear(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew gear entry needs a name.");
  const data: Record<string, unknown> = {
    name, setting: str(o.setting).slice(0, 40) || "core",
    tier: oneOf(o.tier, ACE_GEAR_TIERS, "Normal"), tn: num(o.tn),
    category: str(o.category).slice(0, 40) || "Gadget",
    description: str(o.description).slice(0, 2000), page: 0, source: "Homebrew",
  };
  const dmg = num(o.damage); if (dmg != null) data.damage = dmg;
  const def = num(o.defence); if (def != null) data.defence = def;
  return { name, data };
}
function normalizeAceExtra(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew extra needs a name.");
  const focuses = (Array.isArray(o.focuses) ? o.focuses : []).map((r) => {
    const f = (r ?? {}) as Record<string, unknown>;
    const row: Record<string, unknown> = { stat: oneOf(f.stat, ACE_STATS, "Brawn"), name: str(f.name).slice(0, 60) };
    const d = num(f.dice); if (d != null) row.dice = d;
    return row;
  }).filter((r) => r.name).slice(0, 20);
  const attacks = (Array.isArray(o.attacks) ? o.attacks : []).map((r) => {
    const a = (r ?? {}) as Record<string, unknown>;
    const row: Record<string, unknown> = { name: str(a.name).slice(0, 60), dice: num(a.dice), damage: num(a.damage) };
    if (str(a.note)) row.note = str(a.note).slice(0, 200);
    return row;
  }).filter((r) => r.name).slice(0, 20);
  const data: Record<string, unknown> = {
    name, setting: str(o.setting).slice(0, 40) || "core", type: str(o.type).slice(0, 40) || "Monster",
    smarts: num(o.smarts), moves: num(o.moves), style: num(o.style), brawn: num(o.brawn),
    health: num(o.health), defence: num(o.defence), focuses, attacks,
    notes: strList(o.notes, 20, 200), page: 0, source: "Homebrew",
  };
  const p = num(o.power); if (p != null) data.power = p;
  if (str(o.description)) data.description = str(o.description).slice(0, 2000);
  return { name, data };
}
function normalizeAceFocus(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew focus needs a name.");
  const data: Record<string, unknown> = { name, stat: oneOf(o.stat, ACE_STATS, "Smarts"), setting: str(o.setting).slice(0, 40) || "core", source: "Homebrew" };
  if (str(o.note)) data.note = str(o.note).slice(0, 200);
  return { name, data };
}
function normalizeAceTrait(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew trait needs a name.");
  const data: Record<string, unknown> = { name, setting: str(o.setting).slice(0, 40) || "core", source: "Homebrew" };
  if (str(o.description)) data.description = str(o.description).slice(0, 500);
  return { name, data };
}

// ── KOB ─────────────────────────────────────────────────────────────────────
const KOB_BOOKS = ["bikes", "brooms", "capes"] as const;
const KOB_STATS = ["Brains", "Brawn", "Fight", "Flight", "Charm", "Grit"] as const;
const KOB_DICE = ["4", "6", "8", "10", "12", "20"] as const;

function normalizeKobTrope(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew trope needs a name.");
  const dice: Record<string, number> = {};
  for (const st of KOB_STATS) { const d = str(o["dice" + st]); if ((KOB_DICE as readonly string[]).includes(d)) dice[st] = parseInt(d, 10); }
  const data: Record<string, unknown> = {
    name, book: oneOf(o.book, KOB_BOOKS, "bikes"), dice,
    ages: strList(o.ages, 6, 20),
    suggestedStrengths: strList(o.suggestedStrengths, 20, 60),
    suggestedFlaws: strList(o.suggestedFlaws, 20, 60),
    questions: strList(o.questions, 6, 300), page: 0, source: "Homebrew",
  };
  if (str(o.suggestedRide)) data.suggestedRide = str(o.suggestedRide).slice(0, 200);
  return { name, data };
}
function normalizeKobStrength(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew strength needs a name.");
  const data: Record<string, unknown> = {
    name, book: oneOf(o.book, KOB_BOOKS, "bikes"),
    cost: str(o.cost).slice(0, 60), description: str(o.description).slice(0, 1000),
    page: 0, source: "Homebrew",
  };
  return { name, data };
}
function normalizeKobFlaw(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew flaw needs a name.");
  const data: Record<string, unknown> = { name, book: oneOf(o.book, KOB_BOOKS, "bikes"), page: 0, source: "Homebrew" };
  if (str(o.description)) data.description = str(o.description).slice(0, 500);
  return { name, data };
}

export function normalize(type: HbType, data: unknown): { name: string; data: Record<string, unknown> } {
  switch (type) {
    case "spell": return normalizeSpell(data);
    case "monster": return normalizeMonster(data);
    case "gear": return normalizeGear(data);
    case "class": return normalizeClass(data);
    case "ancestry": return normalizeAncestry(data);
    case "background": return normalizeBackground(data);
    case "dcc-item": return normalizeDccItem(data);
    case "dcc-monster": return normalizeDccMonster(data);
    case "dcc-skill": return normalizeDccSkill(data);
    case "dcc-spell": return normalizeDccSpell(data);
    case "dcc-class": return normalizeDccClass(data);
    case "dcc-race": return normalizeDccRace(data);
    case "dnd-equipment": return normalizeDndEquipment(data);
    case "dnd-feat": return normalizeDndFeat(data);
    case "dnd-background": return normalizeDndBackground(data);
    case "dnd-spell": return normalizeDndSpell(data);
    case "dnd-species": return normalizeDndSpecies(data);
    case "dnd-monster": return normalizeDndMonster(data);
    case "dnd-subclass": return normalizeDndSubclass(data);
    case "nimble-item": return normalizeNimbleItem(data);
    case "nimble-spell": return normalizeNimbleSpell(data);
    case "nimble-monster": return normalizeNimbleMonster(data);
    case "nimble-ancestry": return normalizeNimbleAncestry(data);
    case "sw-weapon": return normalizeSwWeapon(data);
    case "sw-gear": return normalizeSwGear(data);
    case "sw-force": return normalizeSwForce(data);
    case "sw-character": return normalizeSwCharacter(data);
    case "ace-role": return normalizeAceRole(data);
    case "ace-gear": return normalizeAceGear(data);
    case "ace-extra": return normalizeAceExtra(data);
    case "ace-focus": return normalizeAceFocus(data);
    case "ace-trait": return normalizeAceTrait(data);
    case "kob-trope": return normalizeKobTrope(data);
    case "kob-strength": return normalizeKobStrength(data);
    case "kob-flaw": return normalizeKobFlaw(data);
  }
}

// Resolve/validate the requested share targets. An empty list means personal.
// Campaigns the user doesn't participate in are rejected so nothing can be
// shared sideways into someone else's party.
export async function resolveShareTargets(userId: string, campaignIds: unknown): Promise<string[]> {
  const raw = Array.isArray(campaignIds) ? campaignIds : campaignIds == null ? [] : [campaignIds];
  const ids = [...new Set(raw.map((v) => str(v)).filter(Boolean))];
  if (!ids.length) return [];

  const mine = new Set((await userCampaigns(userId)).map((c) => c.id));
  const bad = ids.filter((id) => !mine.has(id));
  if (bad.length) throw new Error("You can only share homebrew with campaigns you're part of.");
  return ids;
}

// Replace an entry's share list. Runs as one transaction so a failure can't
// leave the entry shared with a half-updated set of campaigns.
export async function setShares(homebrewId: string, campaignIds: string[]): Promise<void> {
  await prisma.$transaction([
    prisma.homebrewShare.deleteMany({ where: { homebrewId } }),
    prisma.homebrewShare.createMany({
      data: campaignIds.map((campaignId) => ({ homebrewId, campaignId })),
      skipDuplicates: true,
    }),
  ]);
}
