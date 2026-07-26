import { prisma } from "@/lib/prisma";
import { MONSTER_TYPES } from "@/lib/data/monster-types";

// Homebrew is stored in the exact object shapes the character sheet already
// consumes, so a sheet can merge it straight into its `_homebrewSpells` /
// `_homebrewItems` arrays with no translation:
//   • a spell entry is an SD_SPELLS-shaped object (caster forced to "Homebrew")
//   • a gear entry is a sheet `_homebrewItems`-shaped object (its own `kind`)
//   • a monster entry is an SD_MONSTERS-shaped stat block (plus `ctype`), so the
//     GM screen can drop it straight into the bestiary pool
export type HbType = "spell" | "gear" | "monster" | "class" | "ancestry" | "background";

const HB_TYPES = ["spell", "gear", "monster", "class", "ancestry", "background"] as const;
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
function usesPerDay(v: unknown): number {
  const n = num(v);
  if (n == null || n < 0) return 0;
  return Math.min(n, 20);
}

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
export async function userCampaigns(userId: string): Promise<CampaignRef[]> {
  const owned = await prisma.campaign.findMany({
    where: { ownerId: userId },
    select: { id: true, name: true, code: true },
  });

  const docs = await prisma.document.findMany({
    where: { userId, tool: "sd-character" },
    select: { data: true },
  });

  const linkedIds = new Set<string>();
  for (const d of docs) {
    const raw = (d.data as Record<string, unknown> | null)?.sd_sheet;
    if (typeof raw !== "string") continue;
    try {
      const sheet = JSON.parse(raw) as { _sheet?: { campaign?: { id?: unknown } | null } | null };
      const cid = sheet?._sheet?.campaign?.id;
      if (typeof cid === "string" && cid) linkedIds.add(cid);
    } catch {
      /* malformed sheet — ignore */
    }
  }

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
}

export async function participatesInCampaign(userId: string, campaignId: string): Promise<boolean> {
  if (!campaignId) return false;
  const owned = await prisma.campaign.count({ where: { id: campaignId, ownerId: userId } });
  if (owned > 0) return true;

  const docs = await prisma.document.findMany({
    where: {
      userId,
      tool: "sd-character",
      data: { path: ["sd_sheet"], string_contains: campaignId },
    },
    select: { data: true },
  });
  for (const d of docs) {
    const raw = (d.data as Record<string, unknown> | null)?.sd_sheet;
    if (typeof raw !== "string") continue;
    try {
      const sheet = JSON.parse(raw) as { _sheet?: { campaign?: { id?: unknown } | null } | null };
      if (sheet?._sheet?.campaign?.id === campaignId) return true;
    } catch {
      /* ignore */
    }
  }
  return false;
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
export function normalizeSpell(input: unknown): { name: string; data: Record<string, unknown> } {
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

export function normalizeGear(input: unknown): { name: string; data: Record<string, unknown> } {
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
export function normalizeMonster(input: unknown): { name: string; data: Record<string, unknown> } {
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
export function normalizeBackground(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew background needs a name.");
  return { name, data: { name, desc: str(o.desc).slice(0, 2000) } };
}

// ── Ancestries ───────────────────────────────────────────────────────────────
// A name, a trait blurb, optional languages, and optional flat bonuses the
// wizard applies the same way it applies item/talent bonuses (e.g. Half-Orc's
// Mighty = +1 melee attack & damage).
export function normalizeAncestry(input: unknown): { name: string; data: Record<string, unknown> } {
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

  // Traits: [{text, uses}] for a plain trait, or [{text, options:[{label,
  // amount, target}]}] for a "choose one" trait (Elf Farsight / Beastfolk style)
  // so limited-use abilities render tick boxes and choices become a wizard pick.
  // Accept a legacy single `trait` string from earlier saves.
  type AncTrait =
    | { text: string; uses: number }
    | { text: string; options: { label: string; amount: number; target: string }[] };
  let traits: AncTrait[] = [];
  if (Array.isArray(o.traits)) {
    traits = (o.traits as unknown[])
      .map((t): AncTrait => {
        const to = (t ?? {}) as Record<string, unknown>;
        const text = str(to.text).slice(0, 500);
        if (Array.isArray(to.options) && to.options.length) {
          const options = (to.options as unknown[])
            .map((op) => {
              const oo = (op ?? {}) as Record<string, unknown>;
              const target = str(oo.target);
              return {
                label: str(oo.label).slice(0, 120),
                amount: num(oo.amount) ?? 0,
                target: TALENT_TARGET_KEYS.includes(target) ? target : "",
              };
            })
            .filter((op) => op.label || op.target)
            .slice(0, 6);
          if (options.length) return { text, options };
        }
        return { text, uses: usesPerDay(to.uses) };
      })
      .filter((t) => t.text)
      .slice(0, 20);
  } else if (str(o.trait)) {
    traits = [{ text: str(o.trait).slice(0, 500), uses: 0 }];
  }

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

// Talent effect targets — the "thing being bonused". In the editor the amount
// comes first, then this dropdown. Mirrored in HomebrewManager. Each talent row
// (5 rows total) can carry up to two of these.
export const TALENT_TARGETS: [string, string][] = [
  ["meleeAtk", "Melee Attacks"],
  ["meleeDmg", "Melee Damage"],
  ["rangedAtk", "Ranged Attacks"],
  ["rangedDmg", "Ranged Damage"],
  ["meleeAtkDmg", "Melee Attack & Damage"],
  ["rangedAtkDmg", "Ranged Attacks and Damage"],
  ["ac", "AC"],
  ["hp", "HP"],
  ["str", "Strength"],
  ["dex", "Dexterity"],
  ["con", "Constitution"],
  ["int", "Intelligence"],
  ["wis", "Wisdom"],
  ["cha", "Charisma"],
  ["spellKnown", "Learned Spell"],
  ["spellCheck", "Spellcasting Checks"],
  ["weaponDie", "Weapon Damage Die"],
];
const TALENT_TARGET_KEYS = TALENT_TARGETS.map(([k]) => k);

export function normalizeClass(input: unknown): { name: string; data: Record<string, unknown> } {
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

  const cleanEffect = (raw: unknown): { amount: number; target: string } | null => {
    const e = (raw ?? {}) as Record<string, unknown>;
    const target = str(e.target);
    if (!TALENT_TARGET_KEYS.includes(target)) return null;
    return { amount: num(e.amount) ?? 0, target };
  };
  // Always exactly 5 rows; each carries up to 2 effects.
  const talentIn = Array.isArray(o.talent) ? (o.talent as unknown[]) : [];
  const talent = Array.from({ length: 5 }, (_, i) => {
    const row = (talentIn[i] ?? {}) as Record<string, unknown>;
    const effects = Array.isArray(row.effects)
      ? (row.effects as unknown[])
          .map(cleanEffect)
          .filter((e): e is { amount: number; target: string } => e != null)
          .slice(0, 4)
      : [];
    return { text: str(row.text).slice(0, 300), effects };
  });

  // Features: [{text, uses}] so limited-use features (Barbarian Rage) get tick boxes.
  const features = Array.isArray(o.features)
    ? (o.features as unknown[])
        .map((f) => {
          if (typeof f === "string") return { text: str(f).slice(0, 500), uses: 0 };
          const fo = (f ?? {}) as Record<string, unknown>;
          return { text: str(fo.text).slice(0, 500), uses: usesPerDay(fo.uses) };
        })
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

export function normalize(type: HbType, data: unknown): { name: string; data: Record<string, unknown> } {
  switch (type) {
    case "spell": return normalizeSpell(data);
    case "monster": return normalizeMonster(data);
    case "gear": return normalizeGear(data);
    case "class": return normalizeClass(data);
    case "ancestry": return normalizeAncestry(data);
    case "background": return normalizeBackground(data);
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
