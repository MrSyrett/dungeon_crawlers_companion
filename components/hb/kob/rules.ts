// ── Kids on Bikes (+ Kids on Brooms / Kids in Capes) homebrew rules — pure ────
// Shared by the components/hb/kob/* builders AND lib/homebrew.ts (the server
// normalisers), so the preview and the stored data always agree.
//
// KOB vocabulary (2e core + the two variants, one engine): six Stats — Brains,
// Brawn, Fight, Flight, Charm, Grit — each rated with ONE die, and a Trope (or
// a from-scratch build) uses d4, d6, d8, d10, d12 and d20 exactly once each.
// Age groups (Child/Teen/Adult; Brooms: Underclass/Upperclass/Faculty) give +1
// to two Stats and a free Strength. Strengths are "Always active" or cost
// Adversity Tokens (AT) to use; you earn 1 AT whenever you fail a check.
//
// Storage stays in the book shapes (lib/data/kob-types.ts):
//   trope    · dice {Stat: die} (a full d4–d20 set), ages, suggestedStrengths,
//              suggestedFlaws, questions, suggestedRide (Bikes: composed from
//              ride rows "Child: Orange, First-Aid Kit · Teen: Rusty, Basket").
//   strength · cost ("Always active" / "N AT") + description, both COMPOSED by
//              the server from the new optional fields: costAT, limit,
//              freeFor / onlyFor (age groups), effects (badges, below) and
//              `text` (the free rules / flavour text). A legacy record has no
//              `text`: its description becomes the text, so it re-composes
//              byte-identical.
//   flaw     · book + description (flaws are pure roleplay hooks).
// The character sheet reads strength `effects`: "stat" (+N to a Stat's checks,
// unconditional) is added to that Stat's bonus, and "atFail" sets how many AT
// a failed check earns. Every other effect is composed into the description.

export const KOB_BOOKS = ["bikes", "brooms", "capes"] as const;
export type KobBookKey = (typeof KOB_BOOKS)[number];
export const BOOK_LABEL: Record<KobBookKey, string> = { bikes: "Kids on Bikes", brooms: "Kids on Brooms", capes: "Kids in Capes" };
export const BOOK_OPTS: [string, string][] = KOB_BOOKS.map((b) => [b, BOOK_LABEL[b]]);
export const isBookKey = (v: unknown): v is KobBookKey => (KOB_BOOKS as readonly unknown[]).includes(v);

export const KOB_STATS = ["Brains", "Brawn", "Fight", "Flight", "Charm", "Grit"] as const;
export type KobStatKey = (typeof KOB_STATS)[number];
export const KOB_DICE = [4, 6, 8, 10, 12, 20] as const;
export type KobDieN = (typeof KOB_DICE)[number];

/** Each Stat's verbs (KOB_TABLES.statDescriptions). */
export const STAT_HELP: Record<KobStatKey, string> = {
  Brains: "calculate, decode, learn, remember, solve",
  Brawn: "bend, climb, carry, lift, swim, throw",
  Fight: "intimidate, parry, punch, shoot, wrestle",
  Flight: "avoid, dodge, drive, escape, outrun",
  Charm: "convince, flatter, lie, persuade, trick",
  Grit: "brace, endure, resist, withstand",
};
/** What each die says about a Stat (KOB_TABLES.dice). */
export const DIE_LABEL: Record<KobDieN, string> = { 20: "Superb", 12: "Impressive", 10: "Above Average", 8: "Below Average", 6: "Bad", 4: "Terrible" };

/** Age / grade groups per book (KOB_BOOKS[].ageGroups), plus the stat bonus and free Strength. */
export const AGE_GROUPS: Record<KobBookKey, { name: string; stats: KobStatKey[]; free: string }[]> = {
  bikes: [{ name: "Child", stats: ["Flight", "Charm"], free: "Quick Healing" }, { name: "Teen", stats: ["Fight", "Brawn"], free: "Rebellious" }, { name: "Adult", stats: ["Brains", "Grit"], free: "Skilled at…" }],
  brooms: [{ name: "Underclass", stats: ["Flight", "Charm"], free: "Innocence" }, { name: "Upperclass", stats: ["Fight", "Brawn"], free: "Trained in…" }, { name: "Faculty", stats: ["Brains", "Grit"], free: "Studied in…" }],
  capes: [{ name: "Child", stats: ["Charm", "Flight"], free: "Just Having Fun" }, { name: "Teen", stats: ["Brawn", "Fight"], free: "Rebellious" }, { name: "Adult", stats: ["Brains", "Grit"], free: "Skilled at…" }],
};
export const ageNames = (b: KobBookKey) => AGE_GROUPS[b].map((a) => a.name);

const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v)).trim();
const int = (v: unknown): number | null => { const n = parseInt(String(v ?? "").trim(), 10); return Number.isFinite(n) ? n : null; };
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// ── Trope dice ───────────────────────────────────────────────────────────────
export type DiceMap = Partial<Record<KobStatKey, KobDieN>>;
/** Read dice from a `dice` object or the legacy form's dice<Stat> fields. */
export function readDice(o: Record<string, unknown>): DiceMap {
  const src = o.dice && typeof o.dice === "object" ? (o.dice as Record<string, unknown>) : {};
  const out: DiceMap = {};
  for (const st of KOB_STATS) {
    const n = int(src[st] ?? o["dice" + st]);
    if (n != null && (KOB_DICE as readonly number[]).includes(n)) out[st] = n as KobDieN;
  }
  return out;
}
/** Problems with a dice assignment ([] = one of each die, every Stat rated). */
export function diceProblems(d: DiceMap): string[] {
  const out: string[] = [];
  const missing = KOB_STATS.filter((st) => d[st] == null);
  if (missing.length) out.push(`Give ${missing.join(", ")} a die.`);
  for (const die of KOB_DICE) {
    const who = KOB_STATS.filter((st) => d[st] === die);
    if (who.length > 1) out.push(`d${die} is used ${who.length} times (${who.join(", ")}) — each die once.`);
  }
  return out;
}

// ── Suggested ride (Bikes) ───────────────────────────────────────────────────
export type RideRow = { ages: string[]; color: string; accessory: string };
export const composeRide = (rows: RideRow[]) =>
  rows.filter((r) => r.ages.length && (r.color || r.accessory)).map((r) => `${r.ages.join("/")}: ${[r.color, r.accessory].filter(Boolean).join(", ")}`).join(" · ");
/** "Child: Orange, First-Aid Kit · Teen: Rusty, Basket" → rows, or null if it wouldn't re-compose exactly. */
export function parseRide(text: string): RideRow[] | null {
  if (!text.trim()) return [];
  const rows: RideRow[] = [];
  for (const seg of text.split(" · ")) {
    const m = /^([^:,]+): ([^,]+), ([^,]+)$/.exec(seg);
    if (!m) return null;
    rows.push({ ages: m[1].split("/"), color: m[2], accessory: m[3] });
  }
  return composeRide(rows) === text ? rows : null;
}

// ── Strengths ────────────────────────────────────────────────────────────────
export const LIMITS = ["Once per session", "Once per fight", "Once per scene"] as const;
export const REROLL_TARGETS = ["a stat check", "a failed check", "the Magic Die", "the Power Die"] as const;
export const FIND_TARGETS = ["find a useful item in your surroundings", "just happen to have one commonplace item with you (GM's discretion)"] as const;
export const BOOST_TARGETS = ["your roll", "a friend's roll"] as const;
export const SOFTEN_TARGETS = ["lose a combat roll", "lose a roll when defending in combat", "fail a spell check"] as const;
export const SPELL_TARGETS = ["one type of magic of your choice", ...KOB_STATS] as const;

export type KobEffect = { kind: string; target?: string; amount?: number };
/** Effect kinds. `act` ones are things you DO (they follow "spend N AT to …"
 *  when the Strength costs AT); the rest are always-on statements. */
export const EFFECT_KINDS: Record<string, { act: boolean; amount?: [number, number]; target?: "text" | "stat" | readonly string[]; optTarget?: boolean }> = {
  reroll: { act: true, target: REROLL_TARGETS },
  half: { act: true },
  ask: { act: true },
  find: { act: true, target: FIND_TARGETS },
  hide: { act: true },
  noRoll: { act: true, target: "text" },
  boost: { act: true, amount: [1, 10], target: BOOST_TARGETS },
  act: { act: true, target: "text" },
  stat: { act: false, amount: [-3, 5], target: "stat" },
  when: { act: false, amount: [1, 10], target: "text" },
  spell: { act: false, amount: [1, 10], target: SPELL_TARGETS },
  atFail: { act: false, amount: [2, 5] },
  atWorth: { act: false, amount: [2, 5], target: "text", optTarget: true },
  soften: { act: false, amount: [1, 10], target: SOFTEN_TARGETS },
};

const sgn = (n: number) => (n >= 0 ? "+" : "") + n;
/** The verb phrase of an `act` effect ("reroll a stat check"). */
export function effectAct(e: KobEffect): string {
  const t = e.target ?? "", n = e.amount ?? 0;
  switch (e.kind) {
    case "reroll": return `reroll ${t || "a stat check"}`;
    case "half": return "take half of your die's value instead of rolling on a Snap Decision";
    case "ask": return "ask the GM about your surroundings, an NPC, or the like. The GM must answer honestly";
    case "find": return t || FIND_TARGETS[0];
    case "hide": return "not be seen, within reason (GM's discretion)";
    case "noRoll": return `succeed without a roll when ${t}`;
    case "boost": return t === "a friend's roll" ? `give a friend ${sgn(n)} to a roll` : `add ${sgn(n)} to your roll`;
    case "act": return t;
    default: return "";
  }
}
/** The sentence of an always-on effect. */
export function effectSentence(e: KobEffect): string {
  const t = e.target ?? "", n = e.amount ?? 0;
  switch (e.kind) {
    case "stat": return `${sgn(n)} to ${t} checks.`;
    case "when": return `Add ${sgn(n)} to rolls when ${t}.`;
    case "spell": return t === SPELL_TARGETS[0] ? `Choose one type of magic. Gain ${sgn(n)} to all spells of that type.` : `Gain ${sgn(n)} to all ${t} spells.`;
    case "atFail": return `Gain ${n} Adversity Tokens when you fail, instead of 1.`;
    case "atWorth": return `Each Adversity Token you spend${t ? " " + t : ""} gives ${sgn(n)} instead of +1.`;
    case "soften": return `If you ${t}, add ${sgn(n)} to the negative number. You still lose, but could reduce your loss to -1.`;
    default: return "";
  }
}

export function cleanEffects(v: unknown): KobEffect[] {
  if (!Array.isArray(v)) return [];
  const out: KobEffect[] = [];
  for (const raw of v.slice(0, 12)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const K = EFFECT_KINDS[s(o.kind)];
    if (!K) continue;
    const e: KobEffect = { kind: s(o.kind) };
    if (K.amount) { const n = int(o.amount); if (n == null || n === 0) continue; e.amount = clamp(n, K.amount[0], K.amount[1]); }
    if (K.target) {
      let t = s(o.target).slice(0, 160);
      if (K.target === "stat") t = (KOB_STATS as readonly string[]).includes(t) ? t : "";
      else if (K.target !== "text") t = K.target.includes(t) ? t : "";
      if (t) e.target = t;
      else if (!K.optTarget) continue;
    }
    out.push(e);
  }
  return out;
}

export const costLabel = (at: number | null) => (at ? `${at} AT` : "Always active");
/** "1 AT" → 1, "Always active" → 0, anything else → null (kept as text). */
export function parseCost(cost: string): number | null {
  if (cost === "Always active") return 0;
  const m = /^([1-5]) AT$/.exec(cost);
  return m ? +m[1] : null;
}
const joinAnd = (xs: string[]) => (xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]);
export function agePrefix(free: string[], only: string[]): string {
  if (!free.length && !only.length) return "";
  if (free.length && only.length && free.join() === only.join()) return `(Free for and available only to ${joinAnd(free)})`;
  const parts = [free.length ? `Free for ${joinAnd(free)}` : "", only.length ? `${free.length ? "available" : "Available"} only to ${joinAnd(only)}` : ""].filter(Boolean);
  return `(${parts.join("; ")})`;
}
export type StrengthParts = { costAT: number | null; limit: string; freeFor: string[]; onlyFor: string[]; effects: KobEffect[]; text: string };
/** The printed description: age note, "spend N AT to …", always-on effects, then the free text. */
export function composeStrength(p: StrengthParts): string {
  const acts = p.effects.filter((e) => EFFECT_KINDS[e.kind]?.act).map(effectAct).filter(Boolean);
  const states = p.effects.filter((e) => EFFECT_KINDS[e.kind] && !EFFECT_KINDS[e.kind].act).map(effectSentence).filter(Boolean);
  let actLine = "";
  if (acts.length) {
    const lead = p.limit ? `${p.limit}, you` : "You";
    actLine = p.costAT
      ? `${lead} may spend ${p.costAT} Adversity Token${p.costAT > 1 ? "s" : ""} to ${joinAnd(acts)}.`
      : `${lead} may ${joinAnd(acts)}.`;
  }
  return [agePrefix(p.freeFor, p.onlyFor), actLine, ...states, p.text].filter(Boolean).join(" ");
}
