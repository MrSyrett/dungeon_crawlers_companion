// ── Dragonbane homebrew rules (pure — no React, no db-data import) ──────────
// Shared by the components/hb/db/* builders (client) and lib/homebrew.ts
// normalizeDb* (server), so the live preview and the stored book shape agree.
// Vocabulary is Dragonbane's own: STR/CON/AGL/INT/WIL/CHA, skill levels 1–18,
// dice written "D8" / "2D6" (capital D), Ferocity, D6 monster-attack tables,
// armor rating + banes, power levels (2 WP each), Enchanting spells.

export const DB_ATTRS = ["STR", "CON", "AGL", "INT", "WIL", "CHA"] as const;
export type DbAttr = (typeof DB_ATTRS)[number];

export const DB_GENERAL_SKILLS = [
  "Acrobatics", "Awareness", "Bartering", "Beast Lore", "Bluffing", "Bushcraft", "Crafting", "Evade", "Healing",
  "Hunting & Fishing", "Languages", "Myths & Legends", "Performance", "Persuasion", "Riding", "Seamanship",
  "Sleight of Hand", "Sneaking", "Spot Hidden", "Swimming",
] as const;
export const DB_WEAPON_SKILLS = ["Axes", "Bows", "Brawling", "Crossbows", "Hammers", "Knives", "Slings", "Spears", "Staves", "Swords"] as const;
export const DB_MAGIC_SKILLS = ["Animism", "Elementalism", "Mentalism", "Demonology", "Harmonism", "Illusionism", "Necromancy", "Symbolism", "Witchcraft", "Alchemy", "Enchanting", "Dracomancy"] as const;
export const DB_SKILLS = [...DB_GENERAL_SKILLS, ...DB_WEAPON_SKILLS, ...DB_MAGIC_SKILLS] as const;
export const DB_SCHOOLS = ["General", ...DB_MAGIC_SKILLS] as const;

export const DB_TIMINGS: [string, string][] = [["action", "Action"], ["free", "Free (no action)"], ["reaction", "Reaction"], ["passive", "Passive"], ["downtime", "Downtime (stretch / shift)"], ["roundStart", "Start of round"]];
export const DB_REQ_ANY: [string, string][] = [["melee", "any melee weapon skill"], ["strMelee", "any STR-based melee skill"], ["weapon", "any weapon skill"], ["magic", "any school of magic"]];
export const DB_ABILITY_TAGS = ["attack", "damage", "defense", "support", "utility", "social", "healing", "initiative", "travel", "magic", "crafting", "passive"] as const;

export const DB_CASTING: [string, string][] = [["action", "Action"], ["reaction", "Reaction"], ["round", "Round"], ["stretch", "Stretch"], ["shift", "Shift"], ["stretch/shift", "Stretch or shift"], ["action/stretch/shift", "Action, stretch or shift"]];
export const DB_SPELL_REQS: [string, string][] = [["word", "Word"], ["gesture", "Gesture"], ["focus", "Focus"], ["ingredient", "Ingredient"], ["melody", "Melody"], ["symbol", "Symbol"], ["tools", "Tools"]];
export const DB_DURATIONS = ["Instant", "Round", "Stretch", "Shift", "Concentration", "Permanent", "Until used", "Round/stretch/shift", "Stretch/shift", "Day"] as const;
// Range kinds: [key, label, needs meters?]
export const DB_RANGE_KINDS = [["m", "meters", true], ["sphere", "meters (sphere)", true], ["cone", "meters (cone)", true], ["Touch", "Touch", false], ["Personal", "Personal", false], ["Personal/touch", "Personal / touch", false], ["Item", "Item (enchantment)", false], ["Unlimited", "Unlimited", false], ["—", "—", false]] as const;
export const DB_CAST_ON = ["any item", "weapon", "melee weapon", "slashing weapon", "piercing weapon", "bludgeoning weapon", "shield", "quiver", "bow", "crossbow", "sling", "staff", "wand", "armor", "leather armor", "metal armor", "plate armor", "helmet", "clothing", "worn item"] as const;

export const DB_SUPPLIES = ["Common", "Uncommon", "Rare", "Unique"] as const;
export const DB_UNITS = ["gold", "silver", "copper"] as const;
export const DB_FEATURES = ["Subtle", "Long", "Toppling", "Piercing", "Slashing", "Bludgeoning", "Can be thrown", "Requires quiver", "No damage bonus", "Cannot be used for parrying", "Tiny item", "Requires combat trained mount"] as const;
export const DB_DMG_KINDS = ["slashing", "piercing", "bludgeoning"] as const;
export const DB_ARMOR_BANES = ["Acrobatics", "Awareness", "Evade", "Sneaking", "Swimming", "Ranged attacks"] as const;
export const DB_GEAR_CATS = ["Clothes", "Musical Instruments", "Trade Goods", "Studies & Magic", "Light Sources", "Tools", "Containers", "Medicine", "Services", "Hunting & Fishing", "Means of Travel", "Animals", "Alchemy Ingredients", "Alchemical Substances", "Magic Items"] as const;
export const DB_WEIGHTS: [string, string][] = [["0", "Tiny (0)"], ["0.25", "¼ item"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["none", "— (not carried)"]];

export const DB_SIZES = ["Small", "Normal", "Large", "Huge", "Swarm"] as const;
export const DB_MON_CATEGORIES = ["Monsters", "Rare Kin", "Insectoids", "Trolls", "Giants", "Beasts", "Undead", "Dragons", "Demons"] as const;
export const DB_DMG_TYPES = ["slashing", "piercing", "bludgeoning", "fire", "cold", "lightning", "magic", "other"] as const;
export const DB_CONDITIONS = ["Exhausted", "Sickly", "Dazed", "Angry", "Scared", "Disheartened"] as const;
export const DB_POISONS = ["lethal", "paralyzing", "sleeping"] as const;
export const DB_MON_RESIST = ["Slashing", "Piercing", "Bludgeoning", "Fire", "Cold", "Non-magical weapons", "Non-magical weapons (fire excepted)", "Non-magical attacks"] as const;
export const DB_MON_IMMUNE = ["Fire", "Cold", "Poison", "Disease", "Fear", "Persuasion", "Piercing", "Non-magical damage", "All damage except magic and fire"] as const;
export const DB_MON_TRAITS = ["Wings", "Aquatic", "Climber", "Digger", "Regeneration", "Invisibility", "Shapeshifter", "Swarm", "Weak Spot", "Sensitive to Sunlight", "Vulnerable to Fire", "Persuadable", "Typical Gear", "Coordinated"] as const;
export const DB_NPC_KINDS = ["Typical", "Human", "Elf", "Dwarf", "Halfling", "Wolfkin", "Mallard", "Goblin", "Hobgoblin", "Orc", "Ogre", "Skeleton", "Cat People", "Frog People", "Karkion", "Lizard People", "Satyr", "Elemental"] as const;

export const DB_DICE = [4, 6, 8, 10, 12, 20];

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const int = (v: unknown, d = 0): number => { const n = parseInt(s(v), 10); return Number.isFinite(n) ? n : d; };
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// ═══ DICE ════════════════════════════════════════════════════════════════════
// Dragonbane damage: one die term, optionally plus a second ("2D8+D6").
// n = 0 → no damage. Written with a capital D and no "1" ("D8", "2D6").
export type DbDmg = { n: number; d: number; xn: number; xd: number };
export const noDmg = (): DbDmg => ({ n: 0, d: 6, xn: 0, xd: 6 });
const term = (n: number, d: number) => (n > 0 ? `${n > 1 ? n : ""}D${d}` : "");
export function fmtDb(x: DbDmg | null | undefined): string {
  if (!x || x.n <= 0) return "";
  return term(x.n, x.d) + (x.xn > 0 ? `+${term(x.xn, x.xd)}` : "");
}
/** "2D8+D6" / "d10" / "D8" → DbDmg; anything else → null. */
export function parseDb(raw: unknown): DbDmg | null {
  const m = s(raw).replace(/\s+/g, "").match(/^(\d*)d(\d+)(?:\+(\d*)d(\d+))?$/i);
  if (!m) return null;
  const n = m[1] ? int(m[1]) : 1, d = int(m[2]);
  if (n < 1 || n > 10 || d < 2 || d > 100) return null;
  return { n, d, xn: m[3] !== undefined ? (m[3] ? int(m[3]) : 1) : 0, xd: m[4] ? int(m[4]) : 6 };
}
/** "2D6" with one more die per power level: [2D6, 3D6, 4D6]. */
export function perLevel(base: string, per: string, levels = 3): string[] {
  const b = parseDb(base), p = parseDb(per);
  if (!b) return [];
  const out = [fmtDb(b)];
  for (let i = 1; i < levels; i++) {
    if (p && p.d === b.d && !b.xn) out.push(fmtDb({ ...b, n: b.n + i * p.n }));
    else if (p) out.push(`${fmtDb(b)}+${i > 1 ? `${i}×` : ""}${fmtDb(p)}`);
  }
  return out;
}
/** Server-side: keep a damage string only if it's Dragonbane dice. */
export function cleanDbDice(v: unknown): string {
  const p = parseDb(v);
  return p ? fmtDb(p) : "";
}

// ═══ COST ════════════════════════════════════════════════════════════════════
export type DbCostDraft = { amount: number | null; unit: (typeof DB_UNITS)[number] };
export function costFromData(d: Record<string, unknown>, dfltUnit: DbCostDraft["unit"] = "silver"): DbCostDraft {
  const c = (d.cost ?? null) as Record<string, unknown> | null;
  const a = c && c.amount != null && c.amount !== "" ? Number(c.amount) : d.costAmount != null && d.costAmount !== "" ? Number(d.costAmount) : null;
  const u = s(c?.unit ?? d.costUnit);
  return { amount: a != null && Number.isFinite(a) ? a : null, unit: (DB_UNITS as readonly string[]).includes(u) ? (u as DbCostDraft["unit"]) : dfltUnit };
}
export const fmtCost = (c: DbCostDraft) => (c.amount == null ? "—" : `${c.amount} ${c.unit}`);

// ═══ SPELL RANGE ═════════════════════════════════════════════════════════════
export type DbRange = { kind: string; m: number; text: string };
export function parseRange(raw: unknown): DbRange {
  const t = s(raw);
  let m = t.match(/^(\d+)\s*meters?(?:\s*\((sphere|cone)\))?$/i);
  if (m) return { kind: m[2] ? m[2].toLowerCase() : "m", m: int(m[1]), text: "" };
  if ((m = t.match(/^1\s*kilometer$/i))) return { kind: "m", m: 1000, text: "" };
  const k = DB_RANGE_KINDS.find(([key, , needs]) => !needs && key.toLowerCase() === t.toLowerCase());
  if (k) return { kind: k[0], m: 10, text: "" };
  return t ? { kind: "text", m: 10, text: t } : { kind: "m", m: 10, text: "" };
}
export function fmtRange(r: DbRange): string {
  if (r.kind === "text") return r.text.trim() || "—";
  if (r.kind === "m") return r.m >= 1000 && r.m % 1000 === 0 ? `${r.m / 1000} kilometer${r.m > 1000 ? "s" : ""}` : `${r.m} meters`;
  if (r.kind === "sphere" || r.kind === "cone") return `${r.m} meters (${r.kind})`;
  return r.kind;
}

// ═══ MONSTER ATTACK TARGETS ══════════════════════════════════════════════════
// [key, label, needs N m?, format(n)] — the book's own phrasings; anything else is custom text.
export const DB_TARGETS: readonly (readonly [string, string, boolean, (n: number) => string])[] = [
  ["one", "one", false, () => "one"],
  ["two", "two", false, () => "two"],
  ["twoNear", "two within N m of each other", true, (n) => `two within ${n} m of each other`],
  ["upToTwo", "up to two within N m of each other", true, (n) => `up to two within ${n} m of each other`],
  ["allWithin", "all within N m", true, (n) => `all within ${n} m`],
  ["oppWithin", "all opponents within N m", true, (n) => `all opponents within ${n} m`],
  ["pcs", "all player characters", false, () => "all player characters"],
  ["pcsWithin", "all player characters within N m", true, (n) => `all player characters within ${n} m`],
  ["cone", "cone", false, () => "cone"],
  ["self", "self", false, () => "self"],
  ["text", "custom…", false, () => ""],
];
export type DbTarget = { kind: string; n: number; text: string };
export function parseTarget(raw: unknown): DbTarget {
  const t = s(raw) || "one";
  for (const [k, , needs, f] of DB_TARGETS) {
    if (k === "text") continue;
    if (!needs) { if (f(0) === t) return { kind: k, n: 10, text: "" }; continue; }
    const m = t.match(/(\d+) m/);
    if (m && f(int(m[1])) === t) return { kind: k, n: int(m[1]), text: "" };
  }
  return { kind: "text", n: 10, text: t };
}
export function fmtTarget(x: DbTarget): string {
  if (x.kind === "text") return x.text.trim().slice(0, 60) || "one";
  const k = DB_TARGETS.find(([key]) => key === x.kind);
  return k ? k[3](x.n) : "one";
}

// ═══ MONSTER ATTACKS (the D6 table) ══════════════════════════════════════════
// The builder edits the book shape (DbMonsterAttack in lib/data/db-types) through
// this draft; composeAttack() turns it back. Legacy/book attacks load losslessly:
// a damage string that isn't plain dice is kept in dmgText.
export type MonAttackDraft = {
  name: string; dmg: DbDmg; dmgText: string; type: string; target: DbTarget; range: number;
  fear: "" | "yes" | "bane"; conditions: string[]; prone: boolean; parry: boolean; dodge: "yes" | "no" | "bane";
  ignoresArmor: boolean; poison: { type: string; potency: number } | null; text: string;
};
export const blankAttack = (i = 0): MonAttackDraft => ({
  name: "", dmg: i === 0 ? { n: 2, d: 6, xn: 0, xd: 6 } : noDmg(), dmgText: "", type: "", target: { kind: "one", n: 10, text: "" }, range: 2,
  fear: "", conditions: [], prone: false, parry: i === 0, dodge: "yes", ignoresArmor: false, poison: null, text: "",
});
export function attackFromData(a: Record<string, unknown>): MonAttackDraft {
  const b = blankAttack(1);
  const dmgRaw = s(a.damage), p = parseDb(dmgRaw);
  const fear = a.fear === "bane" ? "bane" : a.fear === true || a.fear === "true" ? "yes" : "";
  const dodge = a.dodge === "bane" ? "bane" : a.dodge === false || a.dodge === "false" ? "no" : "yes";
  const po = (a.poison ?? null) as Record<string, unknown> | null;
  return {
    ...b, name: s(a.name), dmg: p ?? noDmg(), dmgText: p || !dmgRaw ? "" : dmgRaw,
    type: s(a.type), target: parseTarget(a.targets), range: clamp(int(a.range, 2), 0, 200),
    fear, conditions: Array.isArray(a.conditions) ? (a.conditions as unknown[]).map(s).filter(Boolean) : [],
    prone: !!a.prone, parry: !!a.parry, dodge, ignoresArmor: !!a.ignoresArmor,
    poison: po && s(po.type) ? { type: s(po.type), potency: clamp(int(po.potency, 12), 1, 30) } : null,
    text: s(a.text),
  };
}
export const atkDamage = (a: MonAttackDraft) => (a.dmgText.trim() || fmtDb(a.dmg));
/** Short tag list in the bestiary's wording (preview + summary). */
export function attackTags(a: MonAttackDraft): string[] {
  const t: string[] = [];
  const dmg = atkDamage(a);
  if (dmg) t.push(`${dmg}${a.type ? ` ${a.type}` : ""}`);
  if (a.fear) t.push(a.fear === "bane" ? "fear (bane)" : "fear");
  if (a.prone) t.push("knocks down");
  if (a.conditions.length) t.push(a.conditions.join(", "));
  if (a.poison) t.push(`${a.poison.type} poison ${a.poison.potency}`);
  if (a.ignoresArmor) t.push("armor no effect");
  t.push(a.parry ? "can be parried" : "no parry");
  if (a.dodge === "no") t.push("can't be dodged"); else if (a.dodge === "bane") t.push("dodge with a bane");
  return t;
}
/** Effect sentence used when the GM leaves the text blank. */
export function composeAttackText(a: MonAttackDraft): string {
  const tg = fmtTarget(a.target), dmg = atkDamage(a);
  const who = tg === "one" ? `One target within ${a.range} m` : tg === "two" ? `Two targets within ${a.range} m` : tg === "self" ? "The monster" : tg.charAt(0).toUpperCase() + tg.slice(1);
  const out: string[] = [];
  if (dmg) out.push(`${who} ${/^(one|two|the)/i.test(who) ? "takes" : "take"} ${dmg}${a.type ? ` ${a.type}` : ""} damage${a.ignoresArmor ? " (armor doesn't help)" : ""}.`);
  if (a.fear) out.push(`${dmg ? "Also a" : `${who}: a`} fear attack${a.fear === "bane" ? " with a bane on the WIL roll" : ""}.`);
  if (a.prone) out.push("Victims are knocked prone.");
  if (a.conditions.length) out.push(`Victims suffer ${a.conditions.join(" and ")}.`);
  if (a.poison) out.push(`Anyone taking damage is exposed to ${a.poison.type} poison (potency ${a.poison.potency}).`);
  if (a.parry) out.push("Can be parried.");
  if (a.dodge === "no") out.push("Can't be dodged."); else if (a.dodge === "bane") out.push("Dodging it gets a bane.");
  return out.join(" ") || "—";
}
export function composeAttack(a: MonAttackDraft, i: number, rolls?: [number, number]): Record<string, unknown> {
  const o: Record<string, unknown> = {
    roll: rolls ? rolls[0] : i + 1, name: a.name.trim().slice(0, 80) || `Attack ${i + 1}`,
    damage: atkDamage(a) || null, type: a.type || null, targets: fmtTarget(a.target), range: clamp(a.range, 0, 200),
    fear: a.fear === "bane" ? "bane" : a.fear === "yes", conditions: a.conditions.slice(0, 6), prone: a.prone, parry: a.parry,
    dodge: a.dodge === "bane" ? "bane" : a.dodge === "yes", text: a.text.trim() || composeAttackText(a),
  };
  if (a.ignoresArmor) o.ignoresArmor = true;
  if (a.poison) o.poison = { ...a.poison };
  if (rolls) o.rolls = rolls;
  return o;
}
export const THREE_ROLLS: [number, number][] = [[1, 2], [3, 4], [5, 6]];

// ═══ NPCs ════════════════════════════════════════════════════════════════════
// Book NPCs list no attributes; the core rules derive them (DB_NPC_ATTRIBUTES):
// STR / AGL from the damage bonus (+D6 → 17, +D4 → 14, none → 10), CON = max HP
// − 2 per Robust, WIL = max WP − 2 per Focused. The builder goes the other way
// with Auto toggles: damage bonus from STR/AGL (13–16 +D4, 17+ +D6, as for PCs),
// HP = CON + 2 × Robust, WP = WIL + 2 × Focused.
export const dmgBonusOf = (v: number) => (v >= 17 ? "D6" : v >= 13 ? "D4" : "");
export const attrFromBonus = (b: unknown) => (s(b).toUpperCase() === "D6" ? 17 : s(b).toUpperCase() === "D4" ? 14 : 10);
/** "Robust ×4" → 4, "Robust" → 1, otherwise 0. */
export function abilityCount(list: readonly string[], name: string): number {
  let n = 0;
  for (const a of list) { const m = s(a).match(/^(.+?)(?:\s*[×x]\s*(\d+))?$/); if (m && m[1].trim().toLowerCase() === name.toLowerCase()) n += m[2] ? int(m[2]) : 1; }
  return n;
}
export const npcHp = (con: number, abilities: readonly string[]) => con + 2 * abilityCount(abilities, "Robust");
export const npcWp = (wil: number, abilities: readonly string[]) => wil + 2 * abilityCount(abilities, "Focused");

// ═══ LOOT BONUS "db" (server sanitiser) ══════════════════════════════════════
// Mirrors public/tools-data/db-loot-bonus.js kinds: enchant (an Enchanting spell
// + power level), armor, damage, boon (skill), resist (Cold / Fire + N), move,
// wp, hp, note.
export type DbBenefit = { kind: string; target?: string; amount?: number };
const DB_LB_AMOUNT: Record<string, [number, number]> = { armor: [-6, 12], damage: [-10, 20], move: [-20, 20], wp: [-20, 20], hp: [-20, 30] };
export function cleanDbBenefits(v: unknown): DbBenefit[] {
  if (!Array.isArray(v)) return [];
  const out: DbBenefit[] = [];
  for (const raw of v.slice(0, 24)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = s(o.kind).toLowerCase(), t = s(o.target), n = Math.trunc(Number(o.amount) || 0);
    if (kind === "enchant") { if (t) out.push(n > 0 ? { kind, target: t.slice(0, 60), amount: clamp(n, 1, 10) } : { kind, target: t.slice(0, 60) }); }
    else if (kind in DB_LB_AMOUNT) { if (n) out.push({ kind, amount: clamp(n, ...DB_LB_AMOUNT[kind]) }); }
    else if (kind === "boon") { if (t) out.push({ kind, target: t.slice(0, 60) }); }
    else if (kind === "resist") { const c = /^cold$/i.test(t) ? "Cold" : /^fire$/i.test(t) ? "Fire" : ""; if (c && n) out.push({ kind, target: c, amount: clamp(n, 1, 30) }); }
    else if (kind === "note") { if (t) out.push({ kind, target: t.slice(0, 160) }); }
  }
  return out;
}
