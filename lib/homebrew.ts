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

  const data: Record<string, unknown> = {
    name,
    trait: str(o.trait).slice(0, 2000),
    languages: str(o.languages).slice(0, 300),
  };
  if (bonuses.length) data.bonuses = bonuses;
  return { name, data };
}

// ── Classes ──────────────────────────────────────────────────────────────────
// Hit die options and the casting stats / spell lists a homebrew caster can use.
export const HD_DICE = ["1d4", "1d6", "1d8", "1d10", "1d12"] as const;
export const CAST_STATS = ["INT", "WIS", "CHA"] as const;
// Where a homebrew caster draws spells: a book list, or "Homebrew" (spells the
// author tagged for the class).
export const SPELL_LISTS = ["Wizard", "Priest", "Witch", "Homebrew"] as const;
const CLASS_STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;

// A talent-table entry: `text` always displays; `effect`, when present, is what
// the creation/level-up wizard auto-applies. Kinds map onto bonuses the sheet
// already knows how to apply, so the generic applier (built in the wizard layer)
// stays small. Free-text-only talents (kind "none") display but don't auto-apply.
export type TalentEffect =
  | { kind: "atk"; amount: number } // +N to melee AND ranged attacks
  | { kind: "dmg"; amount: number } // +N to melee AND ranged damage
  | { kind: "ac"; amount: number }
  | { kind: "hp"; amount: number }
  | { kind: "stat"; stat: string; amount: number } // +N to a fixed stat
  | { kind: "statChoice"; amount: number } // +N the player assigns
  | { kind: "spellKnown"; amount: number } // learn N extra spells
  | { kind: "none" };

function normalizeTalentEffect(raw: unknown): TalentEffect {
  const e = (raw ?? {}) as Record<string, unknown>;
  const kind = str(e.kind);
  const amount = num(e.amount) ?? 0;
  switch (kind) {
    case "atk": return { kind: "atk", amount };
    case "dmg": return { kind: "dmg", amount };
    case "ac": return { kind: "ac", amount };
    case "hp": return { kind: "hp", amount };
    case "stat": {
      const s = str(e.stat).toUpperCase();
      return { kind: "stat", stat: (CLASS_STATS as readonly string[]).includes(s) ? s : "STR", amount };
    }
    case "statChoice": return { kind: "statChoice", amount };
    case "spellKnown": return { kind: "spellKnown", amount };
    default: return { kind: "none" };
  }
}

export function normalizeClass(input: unknown): { name: string; data: Record<string, unknown> } {
  const o = (input ?? {}) as Record<string, unknown>;
  const name = str(o.name).slice(0, 80);
  if (!name) throw new Error("A homebrew class needs a name.");

  const hd = (HD_DICE as readonly string[]).includes(str(o.hd)) ? str(o.hd) : "1d6";

  // Up to 12 talent slots (the book's tables are 12), each { text, effect }.
  const talent = Array.isArray(o.talent)
    ? (o.talent as unknown[])
        .slice(0, 12)
        .map((t) => {
          if (typeof t === "string") {
            return { text: str(t).slice(0, 300), effect: { kind: "none" } as TalentEffect };
          }
          const to = (t ?? {}) as Record<string, unknown>;
          return { text: str(to.text).slice(0, 300), effect: normalizeTalentEffect(to.effect) };
        })
        .filter((t) => t.text)
    : [];

  const features = Array.isArray(o.features)
    ? (o.features as unknown[]).map((f) => str(f).slice(0, 500)).filter(Boolean).slice(0, 20)
    : [];

  const data: Record<string, unknown> = {
    name,
    hd,
    weapons: str(o.weapons).slice(0, 400),
    armor: str(o.armor).slice(0, 400),
    talent,
    features,
  };

  // Optional spellcasting config — present only for caster classes.
  const caster = (o.caster ?? null) as Record<string, unknown> | null;
  if (caster && (str(caster.stat) || str(caster.list))) {
    const stat = str(caster.stat).toUpperCase();
    const list = str(caster.list);
    data.caster = {
      stat: (CAST_STATS as readonly string[]).includes(stat) ? stat : "INT",
      list: (SPELL_LISTS as readonly string[]).includes(list) ? list : "Homebrew",
      knownTier1: num(caster.knownTier1) ?? 2,
      dc: str(caster.dc).slice(0, 120),
    };
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
