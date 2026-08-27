// ─────────────────────────────────────────────────────────────────────────────
// Dungeon Crawler Carl — Race/Class point-build menu + Mob/Boss derivation tables.
//
// The book's custom-Race/Class system (Core Rulebook pp. 158–162) is a point buy:
// 25 Race Build Points / 30 Class Build Points spent on a menu of benefits priced
// by tier, with optional detriments that refund points (max 5 per pool). The
// Mob/Boss builder (pp. 270–273) is a guided calculator: Level + role drive the
// Health-Bar slots (Table 50) and damage dice (Table 51); stats are point-bought
// (Mob 3/Level, Boss stats-per-Level × Level over a base); defences derive from
// stats and the floor.
//
// This module is dependency-free so BOTH the client builder UI (DccHomebrewEditor)
// and the server normaliser (lib/homebrew) can import it — one source of truth for
// costs and for turning a build into the book-shaped grant bullets everything
// downstream already understands.
// ─────────────────────────────────────────────────────────────────────────────

export const RACE_POINTS = 25;
export const CLASS_POINTS = 30;
export const DETRIMENT_CAP = 5; // max points a pool can refund via detriments

export const STAT_IDS = ["str", "int", "con", "dex", "cha"] as const;
export type StatId = (typeof STAT_IDS)[number];
export const STAT_FULL: Record<string, string> = {
  str: "Strength", int: "Intelligence", con: "Constitution", dex: "Dexterity", cha: "Charisma",
};
export const STAT_ABBR: Record<string, string> = {
  str: "STR", int: "INT", con: "CON", dex: "DEX", cha: "CHA",
};

// ── the benefit / detriment menu ─────────────────────────────────────────────
export type MenuKind = "benefit" | "detriment";
export type MenuParam = "stat" | "skill" | "damageType" | "text";
export interface MenuEntry {
  id: string;
  label: string;      // basis of the grant bullet
  help?: string;      // book examples / rules
  param?: MenuParam;  // extra input this entry needs
  repeatable?: boolean; // may be bought as a quantity (stat/skill/DR/move…)
}
export interface MenuTier {
  tier: string;
  cost: number; // build points per unit
  kind: MenuKind;
  entries: MenuEntry[];
}

export const BENEFIT_TIERS: MenuTier[] = [
  {
    tier: "Minor", cost: 1, kind: "benefit", entries: [
      { id: "stat", label: "+1 to a Stat", param: "stat", repeatable: true },
      { id: "club", label: "Membership in Club Desperado or Club Vanquisher", param: "text", help: "name which club" },
      { id: "adv-skill-floor", label: "End of each floor: +1 Advancement Check for a Skill", param: "skill" },
      { id: "rank20-skill", label: "A specific Skill can be raised to Rank 20", param: "skill" },
      { id: "statmod2-noncombat", label: "Add your Stat Mod a 2nd time on a non-combat Skill", param: "skill", help: "in a common circumstance" },
      { id: "conditional", label: "A conditional benefit", param: "text", help: "e.g. Advantage attacking stone creatures" },
      { id: "darkvision", label: "See in total darkness / produce light" },
      { id: "mana-regen-env", label: "Double Mana regen (mending/resting) in a specific environment", param: "text" },
      { id: "see-far", label: "See twice as far as most creatures" },
      { id: "crafting-t1", label: "A tier-1 crafting table" },
      { id: "saferoom-room", label: "A free room in saferooms" },
      { id: "store-discount", label: "Store discount / sales bonus / interest (+1 per category)", param: "text" },
      { id: "session-benefit", label: "A non-combat benefit once per session under specific conditions", param: "text" },
    ],
  },
  {
    tier: "Moderate", cost: 2, kind: "benefit", entries: [
      { id: "skill", label: "+1 in a Skill or Spell", param: "skill", repeatable: true, help: "incl. Passives — max 5 pts of Passive Skills per Class build" },
      { id: "heal-on-kill", label: "Heal 1 HB slot on damage/kill with a specific Skill/Spell (≤5 HB/combat)", param: "text" },
      { id: "statmod2-attack", label: "Add your Stat Mod a 2nd time when attacking in a common circumstance", param: "text" },
      { id: "adv-advancement", label: "Advantage on Advancement Checks for a particular Skill", param: "skill" },
      { id: "adv-floor-group", label: "End of each floor: +1 Advancement for a linked Skill group", param: "text" },
      { id: "swap-damage-type", label: "At start of combat, change your damage to a different type" },
      { id: "dr-buff", label: "+1 DR Buff (limit +3)", repeatable: true },
      { id: "guild-access", label: "Access any guild of a particular type", param: "text" },
      { id: "mana-regen-unlimited", label: "Double Mana regen (mending/resting) without a limit" },
      { id: "all-clubs", label: "Membership in all professional and social clubs" },
      { id: "floor-book-club", label: "Membership in the Dungeon Book of the Floor Club" },
      { id: "rank20-group", label: "A linked group of Skills can be raised to Rank 20", param: "text" },
      { id: "gold-on-kill", label: "Mobs drop 1 × Floor Number gold when killed with a specific attack", param: "text" },
      { id: "popularity-actions", label: "Gain Popularity with specific actions and attacks", param: "text" },
      { id: "patron", label: "Patron Benefit" },
      { id: "resist-uncommon", label: "Resistance to an uncommon damage type", param: "damageType", help: "Force, Psychic, Necrotic…" },
      { id: "resist-environment", label: "Resistance to environmental damage", param: "text", help: "Falling, Drowning, traps…" },
      { id: "swap-stat-ability", label: "Replace the Stat used in an ability with another Stat", param: "text" },
      { id: "extra-statmod-skills", label: "A Stat Mod from another ability added to specific Skills", param: "text" },
      { id: "cross-weapon-skills", label: "Use skills for one weapon type on another weapon type", param: "text" },
      { id: "heal-spell-plus", label: "Healing Spells heal 1 additional Health Bar" },
      { id: "traverse-terrain", label: "Traverse certain terrain types without Skill Checks", param: "text" },
      { id: "burrow", label: "The ability to burrow" },
      { id: "waterbreathe", label: "The ability to breathe underwater" },
      { id: "temp-all-skills", label: "+1 to all Skills for a temporary duration (≤1 hour)" },
      { id: "natural-attack-d6", label: "Natural attack [Rank = Floor] 1d6 + Stat Mod (+1d6 at Rank 5/10/15)", param: "text", help: "choose stat to hit/damage & damage type" },
      { id: "reassign-stats", label: "Reassign your Race/Class Stat points once per floor (Long Rest)" },
    ],
  },
  {
    tier: "Major", cost: 3, kind: "benefit", entries: [
      { id: "manager", label: "Access to significant assistance (Manager benefit)" },
      { id: "pet-mount", label: "Gain a friendly Pet or a Mount", param: "text" },
      { id: "buff-pets", label: "Buff (up to 4 pts) all of your Pets or Mounts", param: "text" },
      { id: "alter-encounter", label: "Once/day: dramatically alter an encounter", param: "text", help: "e.g. make enemies attack each other" },
      { id: "defensive-negate", label: "Once/day defensive ability", param: "text", help: "e.g. negate all damage from one attack" },
      { id: "party-buff", label: "Once/day: Buff the whole party (regeneration or extra DR)", param: "text" },
      { id: "fly-limited", label: "The ability to fly, with some limitations" },
      { id: "no-breathe", label: "Survive without breathing (+ Immunity to inhaled toxins)" },
      { id: "rage", label: "Rage: melee attacks deal +1 damage per Health Bar slot lost" },
      { id: "size-small", label: "Size 2 (Small) or less" },
      { id: "move-plus5", label: "+5 ft Move", repeatable: true },
      { id: "step-plus5", label: "+5 Step", repeatable: true },
      { id: "evade-d4", label: "Add 1d4 to Evade or Stat Checks for a specific Stat", param: "stat" },
      { id: "natural-attack-d8", label: "Natural attack [Rank = Floor] 1d8 + Stat Mod (+1d8 at Rank 5/10/15)", param: "text" },
      { id: "adv-noncombat", label: "Advantage using a specific non-combat Skill or Spell", param: "text" },
      { id: "situational-x2", label: "Situational bonus of up to ×2 damage for one round", param: "text" },
      { id: "swap-con-hb", label: "Swap CON for another Stat when determining Health Bar values", param: "stat" },
      { id: "climb", label: "A Climb Movement (climb most surfaces, even ceilings)" },
    ],
  },
  {
    tier: "Extreme", cost: 4, kind: "benefit", entries: [
      { id: "skill-unlearnable", label: "+1 in a Skill you couldn't normally learn", param: "skill", help: "Cockroach, Light on Your Feet…" },
      { id: "all-skills-group-3-5", label: "+1 to all Skills in a linked group of 3–5 Skills", param: "text" },
      { id: "adv-stat-checks", label: "Advantage on all Stat Checks for a specific Stat", param: "stat" },
      { id: "rank20-group-6", label: "A linked group of up to 6 Skills can be raised to Rank 20", param: "text" },
      { id: "immunity-poison", label: "Immunity to Poison" },
      { id: "resist-common", label: "Resistance to a common damage type", param: "damageType", help: "Bludgeoning, Fire…" },
      { id: "double-spell-duration", label: "Double the duration of your Rank 5 and lower Spells" },
      { id: "adv-skills-limited", label: "Advantage on all Skills in a limited non-combat situation", param: "text" },
      { id: "extra-arm", label: "An additional functional arm" },
      { id: "doppelganger", label: "Doppelgänger shape-changing" },
    ],
  },
  {
    tier: "Epic", cost: 6, kind: "benefit", entries: [
      { id: "all-skills-group", label: "+1 to all Skills in a linked group", param: "text", help: "Ranged Weapons, INT-based, etc." },
      { id: "all-rank20", label: "All Skills can be raised to Rank 20" },
      { id: "def-immunity-common", label: "Significant defence: Immunity to a common damage type / halve first 9 attacks/day", param: "text" },
      { id: "limb-regen", label: "The Limb Regeneration Benefit" },
      { id: "adv-wide", label: "Advantage on all Skills in a wide-ranging set of circumstances", param: "text" },
      { id: "immunity-poison-disease", label: "Immunity to Poison and all diseases" },
      { id: "all-skills-group-6plus", label: "+1 to all Skills in a linked group of 6+ Skills", param: "text" },
      { id: "def-evade-immunity", label: "Significant defence: Advantage on Evade / Immunity to a common damage type", param: "text" },
      { id: "changeling-stats", label: "Assume another Race's Stat or Skill bonuses (Changeling)", param: "text" },
      { id: "changeling-shape", label: "Changeling shapeshifting" },
      { id: "adv-stat-all", label: "Advantage on all Skill Checks for a specific Stat", param: "stat" },
      { id: "fly-unlimited", label: "The ability to fly with no limitations" },
    ],
  },
];

export const DETRIMENT_TIERS: MenuTier[] = [
  {
    tier: "Minor", cost: 1, kind: "detriment", entries: [
      { id: "stat-penalty", label: "−2 to a Stat", param: "stat", repeatable: true, help: "1 pt per −2 (take ×2 for −4, etc.)" },
      { id: "club-exclusion", label: "Cannot choose a Class due to membership in a specific club", param: "text" },
      { id: "mana-nonfavored", label: "+1 Mana to cast spells not favored by your Class" },
      { id: "disadv-group-conditional", label: "Disadvantage with a linked Skill group under a condition", param: "text", help: "e.g. all social Skills vs a creature category" },
      { id: "must-worship", label: "Must worship a deity" },
      { id: "cannot-worship", label: "Cannot worship a deity" },
      { id: "advancement-penalty", label: "−1 Advancement Checks for a granted Skill at Rank 5+", param: "skill" },
    ],
  },
  {
    tier: "Moderate", cost: 2, kind: "detriment", entries: [
      { id: "broad-condition-weakness", label: "A weakness with a single broad condition", param: "text", help: "e.g. Disadvantage in all social situations" },
      { id: "skill-ranks-on-descent", label: "A Skill only increases in Rank upon descent to the next floor", param: "skill" },
      { id: "limited-weapons", label: "Limited choice of weapons available", param: "text" },
      { id: "no-statmod-weapon", label: "No Stat Mod added to a granted Weapon Skill", param: "text" },
      { id: "mana-plus3-class", label: "+3 Mana to a class of spells granted by your Race/Class", param: "text" },
      { id: "disadv-linked-group", label: "Disadvantage with a linked Skill group", param: "text", help: "e.g. all movement-related Skills" },
      { id: "prohibited-items", label: "Prohibited from a wide category of useful items", param: "text" },
      { id: "vuln-uncommon", label: "Vulnerability to an uncommon damage type (double damage)", param: "damageType" },
      { id: "halve-off-focus", label: "You halve a broad off-focus damage category you deal", param: "text" },
      { id: "two-condition-weakness", label: "A weakness with two conditions", param: "text" },
      { id: "delayed-bonus", label: "A bonus is delayed to Level 50+ / activates on the 6th Floor", param: "text" },
    ],
  },
  {
    tier: "Major", cost: 3, kind: "detriment", entries: [
      { id: "stat-cap-10", label: "A specific Stat is capped at 10 (even magic can't exceed)", param: "stat" },
      { id: "vuln-common", label: "Vulnerability to a common damage type (double damage)", param: "damageType" },
    ],
  },
];

const ENTRY_BY_ID: Record<string, MenuEntry & { cost: number; kind: MenuKind; tier: string }> = {};
for (const t of [...BENEFIT_TIERS, ...DETRIMENT_TIERS]) {
  for (const e of t.entries) ENTRY_BY_ID[e.id] = { ...e, cost: t.cost, kind: t.kind, tier: t.tier };
}
export function menuEntry(id: string) { return ENTRY_BY_ID[id]; }

// ── a build = an ordered list of selections ──────────────────────────────────
export interface Selection {
  id: string;             // menu entry id, or "custom"
  kind: MenuKind;
  tier: string;           // tier name (needed for "custom" whose cost isn't in the table)
  cost: number;           // points per unit (positive; detriments refund)
  amount?: number;        // repeatable quantity (default 1)
  stat?: string;          // for param "stat"
  skill?: string;         // for param "skill" (a skill/spell name)
  damageType?: string;    // for param "damageType"
  text?: string;          // for param "text" / custom description
}

const intOr = (v: unknown, d: number): number => {
  const n = parseInt(String(v ?? "").trim(), 10);
  return Number.isFinite(n) ? n : d;
};
const clean = (s: unknown): string => String(s == null ? "" : s).trim();

export function selectionUnits(sel: Selection): number {
  return Math.max(1, intOr(sel.amount, 1));
}
export function selectionCost(sel: Selection): number {
  return sel.cost * selectionUnits(sel);
}

// One selection → its book-style grant bullet. Stat bonuses/penalties come out as
// "+N Strength" / "-N Strength" (ASCII sign) so the creation wizard's raceStatMods
// parses and applies them exactly like a book entry.
export function selectionGrant(sel: Selection): string {
  const A = selectionUnits(sel);
  const sign = sel.kind === "detriment" ? "-" : "+";
  const stat = STAT_FULL[clean(sel.stat).toLowerCase()] || "";
  const dmg = clean(sel.damageType);
  const skill = clean(sel.skill);
  const text = clean(sel.text);
  switch (sel.id) {
    case "stat": return `${sign}${A} ${stat || "a Stat"}`;
    case "stat-penalty": return `-${2 * A} ${stat || "a Stat"}`;
    case "skill":
    case "skill-unlearnable": return `+${A} ${skill || "a Skill"}`;
    case "adv-skill-floor": return `End of floor: +1 Advancement Check for ${skill || "a Skill"}`;
    case "rank20-skill": return `${skill || "a Skill"} can be raised to Rank 20`;
    case "statmod2-noncombat": return `Add Stat Mod a 2nd time on ${skill || "a non-combat Skill"}`;
    case "adv-advancement": return `Advantage on Advancement Checks for ${skill || "a Skill"}`;
    case "advancement-penalty": return `-1 Advancement Checks for ${skill || "a granted Skill"} at Rank 5+`;
    case "skill-ranks-on-descent": return `${skill || "a Skill"} only ranks up on descent`;
    case "dr-buff": return `+${A} DR Buff`;
    case "move-plus5": return `+${5 * A} ft Move`;
    case "step-plus5": return `+${5 * A} Step`;
    case "resist-uncommon":
    case "resist-common": return `Resistance to ${dmg || "a damage type"}`;
    case "vuln-uncommon":
    case "vuln-common": return `Vulnerability: ${dmg || "a damage type"} deals double damage`;
    case "stat-cap-10": return `${stat || "a Stat"} capped at 10`;
    case "evade-d4": return `Add 1d4 to Evade or ${STAT_ABBR[clean(sel.stat).toLowerCase()] || "a Stat"} Checks`;
    case "adv-stat-checks":
    case "adv-stat-all": return `Advantage on ${STAT_ABBR[clean(sel.stat).toLowerCase()] || "a Stat"} Checks`;
    case "swap-con-hb": return `Swap CON for ${STAT_ABBR[clean(sel.stat).toLowerCase()] || "a Stat"} for Health Bar values`;
    case "custom": return text || "Custom benefit";
    default: {
      const entry = ENTRY_BY_ID[sel.id];
      const base = entry ? entry.label : (text || "Benefit");
      return text ? `${base} (${text})` : base;
    }
  }
}

// Sanitise a raw selection list from the client into trusted Selections: costs
// are re-derived from the menu (never trusted from the client) for known entries;
// "custom" keeps its client tier/cost (a GM-priced benefit). Unknown ids drop.
export function sanitizeSelections(raw: unknown): Selection[] {
  if (!Array.isArray(raw)) return [];
  const out: Selection[] = [];
  for (const r of raw.slice(0, 100)) {
    const o = (r ?? {}) as Record<string, unknown>;
    const id = clean(o.id);
    if (!id) continue;
    if (id === "custom") {
      const kind: MenuKind = o.kind === "detriment" ? "detriment" : "benefit";
      const cost = Math.max(0, Math.min(20, intOr(o.cost, 0)));
      out.push({ id, kind, tier: clean(o.tier).slice(0, 20) || "Minor", cost, text: clean(o.text).slice(0, 400) });
      continue;
    }
    const entry = ENTRY_BY_ID[id];
    if (!entry) continue;
    const sel: Selection = { id, kind: entry.kind, tier: entry.tier, cost: entry.cost };
    if (entry.repeatable) sel.amount = Math.max(1, Math.min(50, intOr(o.amount, 1)));
    if (entry.param === "stat") { const st = clean(o.stat).toLowerCase(); if ((STAT_IDS as readonly string[]).includes(st)) sel.stat = st; }
    if (entry.param === "skill") sel.skill = clean(o.skill).slice(0, 80);
    if (entry.param === "damageType") sel.damageType = clean(o.damageType).slice(0, 40);
    if (entry.param === "text") sel.text = clean(o.text).slice(0, 400);
    out.push(sel);
  }
  return out;
}

export interface BuildResult {
  benefitPoints: number;
  detrimentPoints: number; // points refunded (capped)
  spent: number;           // benefitPoints
  net: number;             // benefitPoints - detrimentPoints
  grants: string[];
}

// Turn a validated list of selections into spend totals + book-shaped grants. The
// detriment refund is capped at DETRIMENT_CAP; over-cap detriments still appear as
// grants but grant no extra points (matches "max 5 per pool").
export function summarizeBuild(selections: Selection[]): BuildResult {
  let benefit = 0;
  let detriment = 0;
  const grants: string[] = [];
  for (const sel of selections) {
    const c = selectionCost(sel);
    if (sel.kind === "detriment") detriment += c;
    else benefit += c;
    const g = selectionGrant(sel);
    if (g) grants.push(g);
  }
  const detrimentCapped = Math.min(detriment, DETRIMENT_CAP);
  return { benefitPoints: benefit, detrimentPoints: detrimentCapped, spent: benefit, net: benefit - detrimentCapped, grants };
}

export function budgetFor(kind: "dcc-race" | "dcc-class"): number {
  return kind === "dcc-race" ? RACE_POINTS : CLASS_POINTS;
}

// ── Mob / Boss builder tables (Core Rulebook pp. 270–273) ────────────────────
// Table 50: Boss Severity — stats-per-Level and Health-Bar slot base by tier.
export const BOSS_SEVERITY: { role: string; statsPerLevel: number; hbBase: number }[] = [
  { role: "Neighborhood Boss", statsPerLevel: 3, hbBase: 10 },
  { role: "Borough Boss", statsPerLevel: 4, hbBase: 15 },
  { role: "City Boss", statsPerLevel: 5, hbBase: 20 },
  { role: "Province Boss", statsPerLevel: 6, hbBase: 25 },
  { role: "Country Boss", statsPerLevel: 8, hbBase: 30 },
  { role: "Floor Boss", statsPerLevel: 10, hbBase: 40 },
];
export function bossSeverity(role: string) { return BOSS_SEVERITY.find((b) => b.role === role); }

// Table 51: Mob Level → dice of damage (the main attack's dice count).
export const MOB_DAMAGE_DICE: { min: number; max: number; dice: number; floors: string }[] = [
  { min: 1, max: 4, dice: 1, floors: "1" },
  { min: 5, max: 9, dice: 2, floors: "2" },
  { min: 10, max: 29, dice: 3, floors: "3–4" },
  { min: 30, max: 59, dice: 5, floors: "5–7" },
  { min: 60, max: 99, dice: 7, floors: "8–10" },
  { min: 100, max: 159, dice: 9, floors: "11–13" },
  { min: 160, max: 249, dice: 12, floors: "14–16" },
  { min: 250, max: Infinity, dice: 15, floors: "17–18" },
];
export function damageDiceForLevel(level: number): number {
  const row = MOB_DAMAGE_DICE.find((r) => level >= r.min && level <= r.max);
  return row ? row.dice : 1;
}

// The stat-score → modifier ladder the sheet and stat blocks use.
export function dccStatMod(score: number): number {
  const v = intOr(score, 0);
  if (v <= 0) return 0;
  if (v <= 2) return 1;
  if (v <= 5) return 2;
  if (v <= 9) return 3;
  if (v <= 19) return 4;
  if (v <= 49) return 5;
  if (v <= 99) return 6;
  if (v <= 149) return 7;
  if (v <= 199) return 8;
  if (v <= 299) return 9;
  return 10;
}

// Mob: base 1 in each stat + 3 stat points per Level to distribute.
// Boss: base 5 in each stat + (stats-per-Level from Table 50) × Level.
export function statBase(role: string): number { return bossSeverity(role) ? 5 : 1; }
export function statBudget(role: string, level: number): number {
  const lv = Math.max(1, intOr(level, 1));
  const boss = bossSeverity(role);
  return boss ? boss.statsPerLevel * lv : 3 * lv;
}
// Health-Bar slot count: Mob = Level (max 10); Boss = tier base + Floor number.
export function hbSlotCount(role: string, level: number, floor: number): number {
  const boss = bossSeverity(role);
  if (boss) return boss.hbBase + Math.max(0, intOr(floor, 0));
  return Math.min(Math.max(1, intOr(level, 1)), 10);
}
