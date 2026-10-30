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

// ═══ KIN & PROFESSIONS (server sanitisers, shared with the builders) ═══════════
// Both store the book shapes (lib/data/db-types DbKin / DbProfession) so the
// creation wizard (db-sheet-builder.js), the sheet and the reference pages treat
// homebrew exactly like book entries once db-homebrew.js injects it into
// window.DB_KIN / DB_PROFESSIONS.
//   kin:        movement, text, abilities [{id, name, wp, wpNote?, timing, text}] (1–3),
//               names (≤6, the D6 name table), traits (book kin traits + custom),
//               size "Large" (from the Large trait), flying "wp", category, pcNotes
//   profession: keyAttribute, text, skills (exactly 8), heroicAbilities (≤3) +
//               heroicChoice, kits (1–3: items [{name, qty?, note?} | {choice}],
//               food + silver dice), nicknames (≤6). A caster profession is
//               mage: true with ONE school: schoolSkills {school: 8 skills incl.
//               the school}, skills [], no heroic ability, the book's magic block.
export const DB_KIN_TIMINGS: [string, string][] = [["action", "Action"], ["free", "Free (no action)"], ["reaction", "Reaction"], ["passive", "Passive (always on)"], ["rest", "During rest"]];
export const DB_KIN_TRAITS = ["Nocturnal", "Nocturnal (foliage)", "Large", "Melancholy"] as const;
export const DB_KIN_CATEGORIES = ["Rare Kin", "Nightkin"] as const;
export const DB_KIT_DICE = ["D4", "D6", "D8", "D10", "D12", "D20"] as const;
export const DB_PROF_SKILLS = 8;
export const DB_MAGE_SCHOOLS = ["Animism", "Demonology", "Elementalism", "Illusionism", "Mentalism", "Necromancy", "Symbolism", "Witchcraft", "Alchemy", "Enchanting"] as const;
export const DB_MAGE_MAGIC = { startingSpells: 3, startingRank: 1, startingTricks: 3, from: "your school or General Magic", grimoire: true };

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const list = (v: unknown, n: number, len: number): string[] => {
  const out: string[] = [];
  for (const x of Array.isArray(v) ? v : []) { const t = s(x).slice(0, len); if (t && !out.includes(t)) out.push(t); if (out.length >= n) break; }
  return out;
};
const among = <T extends string>(v: unknown, opts: readonly T[], d: T): T => (opts as readonly string[]).includes(s(v)) ? (s(v) as T) : d;
const SKILL_SET = DB_SKILLS as readonly string[];

/** Kin ability row → {id, name, wp, wpNote?, timing, text} (wp: number | "varies" | null). */
export function cleanKinAbility(raw: unknown): Record<string, unknown> | null {
  const o = (raw ?? {}) as Record<string, unknown>;
  const name = s(o.name).slice(0, 80);
  if (!name) return null;
  const w = s(o.wp);
  const wp = w === "" || w === "—" || w === "null" ? null : /^vari/i.test(w) ? "varies" : clamp(int(w, 1), 0, 10);
  const out: Record<string, unknown> = { id: slug(name) || "ability", name, wp, timing: among(o.timing, DB_KIN_TIMINGS.map(([k]) => k), "free"), text: s(o.text).slice(0, 2000) };
  if (wp === "varies" && s(o.wpNote)) out.wpNote = s(o.wpNote).slice(0, 120);
  return out;
}

export function cleanDbKin(o: Record<string, unknown>, name: string): Record<string, unknown> {
  const abilities = (Array.isArray(o.abilities) ? o.abilities : []).slice(0, 3).map(cleanKinAbility).filter(Boolean) as Record<string, unknown>[];
  if (!abilities.length) throw new Error("A homebrew kin needs an innate ability.");
  const traits = list(o.traits, 6, 60);
  const data: Record<string, unknown> = {
    id: `hb-${slug(name)}`, name, page: 0, movement: clamp(int(o.movement, 10), 2, 20), text: s(o.text).slice(0, 3000),
    abilities, names: list(o.names, 6, 40), source: "Homebrew",
  };
  if (traits.length) data.traits = traits;
  if (traits.includes("Large")) data.size = "Large";
  if (o.flying === "wp" || o.flying === true) data.flying = "wp";
  const cat = s(o.category);
  if (cat) data.category = among(cat, DB_KIN_CATEGORIES, "Rare Kin");
  if (s(o.pcNotes)) data.pcNotes = s(o.pcNotes).slice(0, 2000);
  return data;
}

const DIE_SET = DB_KIT_DICE as readonly string[];
const kitDie = (v: unknown, d: string) => { const t = s(v).toUpperCase().replace(/^1D/, "D"); return DIE_SET.includes(t) ? t : d; };
export function cleanKitItem(raw: unknown): Record<string, unknown> | null {
  const o = (raw ?? {}) as Record<string, unknown>;
  const choice = list(o.choice, 4, 60);
  if (choice.length >= 2) return { choice };
  const name = s(o.name).slice(0, 60) || choice[0] || "";
  if (!name) return null;
  const out: Record<string, unknown> = { name };
  const q = clamp(int(o.qty, 1), 1, 20);
  if (q > 1) out.qty = q;
  if (s(o.note)) out.note = s(o.note).slice(0, 60);
  return out;
}

export function cleanDbProfession(o: Record<string, unknown>, name: string): Record<string, unknown> {
  const mage = o.mage === true || s(o.mage) === "true";
  const school = mage ? among(o.school ?? Object.keys((o.schoolSkills ?? {}) as object)[0], DB_MAGE_SCHOOLS, "Elementalism") : "";
  const rawSkills = Array.isArray(o.skills) && (o.skills as unknown[]).length ? o.skills : ((o.schoolSkills ?? {}) as Record<string, unknown>)[school];
  let skills = list(rawSkills, 12, 40).filter((x) => SKILL_SET.includes(x));
  if (mage) skills = [school, ...skills.filter((x) => x !== school)];
  skills = skills.slice(0, DB_PROF_SKILLS);
  if (skills.length !== DB_PROF_SKILLS) throw new Error(`A profession needs exactly ${DB_PROF_SKILLS} profession skills (it has ${skills.length}).`);
  const kits = (Array.isArray(o.kits) ? o.kits : []).slice(0, 3).map((k) => {
    const x = (k ?? {}) as Record<string, unknown>;
    return { items: (Array.isArray(x.items) ? x.items : []).slice(0, 10).map(cleanKitItem).filter(Boolean), food: kitDie(x.food, "D6"), silver: kitDie(x.silver, "D8") };
  }).filter((k) => k.items.length);
  if (!kits.length) throw new Error("A profession needs at least one starting gear kit.");
  const data: Record<string, unknown> = {
    id: `hb-${slug(name)}`, name, page: 0, keyAttribute: among(o.keyAttribute, DB_ATTRS, "STR"), text: s(o.text).slice(0, 3000),
    skills: mage ? [] : skills, heroicAbilities: mage ? [] : list(o.heroicAbilities, 3, 80), kits, nicknames: list(o.nicknames, 6, 40), source: "Homebrew",
  };
  if (!mage && (data.heroicAbilities as string[]).length > 1 && (o.heroicChoice === true || s(o.heroicChoice) === "true")) data.heroicChoice = true;
  if (mage) { data.mage = true; data.schoolSkills = { [school]: skills }; data.magic = { ...DB_MAGE_MAGIC }; }
  return data;
}
