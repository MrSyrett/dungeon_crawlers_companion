// ── Marvel Multiverse RPG (key "mmrpg") homebrew rules — pure, shared ───────
// Used by the client builders (components/hb/mmrpg/*) AND the server normalisers
// (lib/homebrew.ts normalizeMmrpg*), so it imports no data modules and no React.
//
// Storage stays in the book shapes every consumer already reads (the character
// sheet + wizard merge homebrew into MMRPG_POWERS / TRAITS / TAGS / EQUIPMENT;
// the reference pages read the same fields):
//  • mmrpg-power: powerSet, prerequisites, action, trigger, duration, range,
//    cost, effect, fantastic — all strings in book wording. The builder parses
//    those strings back into pickers (only when re-composing reproduces them
//    exactly; otherwise the text is kept "as written"). New optional fields:
//    `effects` (badges the sheet automates: damage multiplier / non-combat /
//    defense bonuses, the attack ability, movement modes) and `text` (the prose
//    part); `effect` = text + one book-worded sentence per badge, phrased exactly
//    the way the sheet's powerBonuses / powerAttackKey / grantedMovement read it.
//  • mmrpg-trait / mmrpg-tag: `description` composed from `text` + situational
//    rows (edge / trouble …) + flat effect badges (Health, Focus, defense, Run
//    Speed — the sheet applies these) + a "can be taken more than once" flag.
//    Plain records keep only `description` (byte-identical to before).
//  • mmrpg-iconic: equipment-shaped (tier Iconic). Power Value is derived:
//    granted powers + their prerequisite powers (each counts) + 1 for a weapon −
//    1 per restriction, minimum 1; `pvAuto:false` keeps a typed override.
//  • mmrpg-hq / mmrpg-starship: {teamRank, traits[{name,n}], tags[{name,note}]}
//    plus derived budget/size/Health/passengers/flight speed (see baseStats).

export const ABILITIES: readonly (readonly [string, string])[] = [
  ["melee", "Melee"], ["agility", "Agility"], ["resilience", "Resilience"],
  ["vigilance", "Vigilance"], ["ego", "Ego"], ["logic", "Logic"],
];
export const DMG_ABILITIES: readonly (readonly [string, string])[] = [["melee", "Melee"], ["agility", "Agility"], ["ego", "Ego"], ["logic", "Logic"]];
export const abName = (k: string) => ABILITIES.find(([v]) => v === k)?.[1] ?? "";
const abKey = (name: string) => ABILITIES.find(([, l]) => l.toLowerCase() === name.toLowerCase())?.[0] ?? "";

// Book power sets (Core + expansions). "None" = a basic power.
export const POWER_SETS: readonly string[] = [
  "Elemental Control", "Healing", "Iconic Item", "Illusion", "Luck", "Magic", "Martial Arts",
  "Melee Weapons", "Narrative Limitation", "Narrative Power", "Omniversal Travel", "Phasing",
  "Plasticity", "Power Control", "Ranged Weapons", "Resize", "Shield Bearer", "Sixth Sense",
  "Spider-Powers", "Super-Speed", "Super-Strength", "Tactics", "Telekinesis", "Telepathy",
  "Teleportation", "Translation", "Weather Control",
];
export const ACTIONS: readonly (readonly [string, string])[] = [
  ["", "— (no action / always on)"],
  ["Standard", "Standard"], ["Movement", "Movement"], ["Reaction", "Reaction"],
  ["Standard or reaction", "Standard or reaction"], ["Standard or movement", "Standard or movement"],
  ["Standard, movement or reaction", "Standard, movement or reaction"],
  ["Both standard and movement (character cannot move this turn)", "Both standard and movement"],
];
export const DURATIONS: readonly string[] = ["Instant", "Concentration", "Permanent", "1 round", "Instant + 1 round", "1 round per rank.", "Varies"];
export const isReaction = (action: string) => /reaction/i.test(action);

// ── Prerequisites: "Accuracy 1, Rank 2" / "Grow 2 or Shrink 2, Rank 3" ──────
export type Prereq = { powers: string[]; anyOf: boolean; abilities: { ability: string; min: number }[]; other: string; rank: number | null };
export const blankPrereq = (): Prereq => ({ powers: [], anyOf: false, abilities: [], other: "", rank: null });
export function composePrereq(p: Prereq): string {
  const parts: string[] = [];
  const pw = p.powers.map((s) => s.trim()).filter(Boolean);
  if (pw.length) parts.push(p.anyOf && pw.length > 1 ? pw.join(" or ") : pw.join(", "));
  for (const a of p.abilities) if (abName(a.ability)) parts.push(`${abName(a.ability)} ${Math.max(1, Math.min(9, Math.round(a.min) || 1))}`);
  if (p.other.trim()) parts.push(p.other.trim());
  if (p.rank) parts.push(`Rank ${p.rank}`);
  return parts.join(", ");
}
const ABIL_TOKEN = /^(Melee|Agility|Resilience|Vigilance|Ego|Logic)\s+(\d)$/i;
/** Parse book prerequisite text; null when re-composing would not reproduce it. */
export function parsePrereq(raw: string): Prereq | null {
  const s = raw.trim();
  const out = blankPrereq();
  if (!s || /^none$/i.test(s)) return out;
  const other: string[] = [];
  for (const tok of s.split(",").map((t) => t.trim()).filter(Boolean)) {
    const r = /^Rank\s+(\d)$/i.exec(tok);
    const a = ABIL_TOKEN.exec(tok);
    if (r) out.rank = Number(r[1]);
    else if (a) out.abilities.push({ ability: abKey(a[1]), min: Number(a[2]) });
    else if (/:|\borigin\b/i.test(tok) || tok.length > 40) other.push(tok);
    else if (/\s+or\s+/.test(tok) && !out.powers.length) { out.powers = tok.split(/\s+or\s+/).map((x) => x.trim()); out.anyOf = true; }
    else if (out.anyOf) return null;
    else out.powers.push(tok);
  }
  out.other = other.join(", ");
  return composePrereq(out) === s ? out : null;
}

// ── Cost: "10 Focus" / "5 or more Focus" / "5 Focus per turn" / "Varies" ────
export type Cost = { kind: "none" | "focus" | "varies"; n: number; more: boolean; per: "" | "turn" | "round" };
export const blankCost = (): Cost => ({ kind: "none", n: 5, more: false, per: "" });
export function composeCost(c: Cost): string {
  if (c.kind === "varies") return "Varies";
  if (c.kind !== "focus") return "";
  return `${c.n}${c.more ? " or more" : ""} Focus${c.per ? ` per ${c.per}` : ""}`;
}
export function parseCost(raw: string): Cost | null {
  const s = raw.trim();
  if (!s) return blankCost();
  if (s === "Varies") return { ...blankCost(), kind: "varies" };
  const m = /^(\d+)( or more)? Focus(?: per (turn|round))?$/.exec(s);
  if (!m) return null;
  return { kind: "focus", n: Number(m[1]), more: !!m[2], per: (m[3] as Cost["per"]) || "" };
}

// ── Range: "Reach" / "10 spaces" / "5 spaces per rank" / "10 spaces times the
// character’s rank" / "Unlimited" / "Varies" ─────────────────────────────────
export type RangeKind = "" | "reach" | "spaces" | "perRank" | "timesRank" | "unlimited" | "varies";
export type Range = { kind: RangeKind; n: number };
export const RANGE_KINDS: readonly (readonly [RangeKind, string])[] = [
  ["", "— (self / none)"], ["reach", "Reach"], ["spaces", "N spaces"], ["perRank", "N spaces per rank"],
  ["timesRank", "N spaces × rank"], ["unlimited", "Unlimited"], ["varies", "Varies"],
];
const sp = (n: number) => `${n} space${n === 1 ? "" : "s"}`;
export function composeRange(r: Range): string {
  switch (r.kind) {
    case "reach": return "Reach";
    case "spaces": return sp(r.n);
    case "perRank": return `${sp(r.n)} per rank`;
    case "timesRank": return `${sp(r.n)} times the character’s rank`;
    case "unlimited": return "Unlimited";
    case "varies": return "Varies";
    default: return "";
  }
}
export function parseRange(raw: string): Range | null {
  const s = raw.trim();
  if (!s) return { kind: "", n: 10 };
  if (s === "Reach") return { kind: "reach", n: 10 };
  if (s === "Unlimited") return { kind: "unlimited", n: 10 };
  if (s === "Varies") return { kind: "varies", n: 10 };
  const m = /^(\d+) spaces?( per rank| times the character’s rank)?$/.exec(s);
  if (!m) return null;
  const r: Range = { kind: !m[2] ? "spaces" : m[2] === " per rank" ? "perRank" : "timesRank", n: Number(m[1]) };
  return composeRange(r) === s ? r : null;
}

// ── Power effect badges (the sheet automates these) ─────────────────────────
export type Fx = { kind: string; target?: string; amount?: number };
export const MOVE_MODES: readonly string[] = ["Flight", "Glide", "Swim", "Climb", "Jump", "Swingline", "Burrow"];
export const MOVE_MULT: readonly (readonly [number, string])[] = [[1, ""], [2, "double"], [3, "triple"], [4, "quadruple"]];
export const POWER_FX_KINDS = ["dmgMult", "noncombat", "defense", "attack", "move"] as const;
const clampN = (v: unknown, lo: number, hi: number, d: number) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : d; };
const plain = (v: unknown, max: number) => (typeof v === "string" ? v : "").replace(/\s+/g, " ").trim().slice(0, max);

export function cleanPowerFx(v: unknown): Fx[] {
  if (!Array.isArray(v)) return [];
  const out: Fx[] = [];
  for (const raw of v.slice(0, 16)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = String(o.kind ?? "");
    const t = String(o.target ?? "");
    if (kind === "dmgMult" || kind === "noncombat" || kind === "defense") {
      const pool = kind === "noncombat" || kind === "defense" ? ABILITIES : DMG_ABILITIES;
      if (pool.some(([k]) => k === t)) out.push({ kind, target: t, amount: clampN(o.amount, 1, 6, 1) });
    } else if (kind === "attack") {
      if (DMG_ABILITIES.some(([k]) => k === t)) out.push({ kind, target: t });
    } else if (kind === "move") {
      if (MOVE_MODES.includes(t)) out.push({ kind, target: t, amount: clampN(o.amount, 1, 4, 1) });
    }
  }
  return out;
}
export function powerFxSentence(f: Fx): string {
  const A = abName(f.target ?? "");
  const n = f.amount ?? 1;
  switch (f.kind) {
    case "dmgMult": return `The character adds +${n} to their ${A} damage multiplier.`;
    case "noncombat": return `They gain a +${n} bonus to ${A} checks other than attacks.`;
    case "defense": return `The character adds +${n} to their ${A} defense.`;
    case "attack": return `This power makes ${/^[AEIOU]/.test(A) ? "an" : "a"} ${A} attack.`;
    case "move": {
      const w = MOVE_MULT.find(([m]) => m === n)?.[1] ?? "";
      return `The character gains the ${f.target} movement mode, with a speed equal to ${w ? w + " " : ""}their Run Speed.`;
    }
    default: return "";
  }
}
export const composeEffect = (text: string, fx: Fx[]) => [text.trim(), ...fx.map(powerFxSentence)].filter(Boolean).join(" ");

// ── Trait / tag effects ─────────────────────────────────────────────────────
// Situational rows: edge / trouble on a kind of check, optionally "when …".
export type Situ = { kind: "edge" | "trouble" | "enemyEdge" | "enemyTrouble"; check: string; when: string };
export const SITU_KINDS: readonly (readonly [Situ["kind"], string])[] = [
  ["edge", "Edge on"], ["trouble", "Trouble on"], ["enemyEdge", "Enemies get an edge on"], ["enemyTrouble", "Enemies have trouble on"],
];
export const CHECKS: readonly (readonly [string, string])[] = [
  ...ABILITIES.map(([k, l]) => [k, `${l} checks`] as const),
  ...DMG_ABILITIES.map(([k, l]) => [`${k}-atk`, `${l} attacks`] as const),
  ["attack", "attacks"], ["action", "action checks"], ["initiative", "initiative checks"], ["any", "all checks"],
];
const checkWords = (c: string) => CHECKS.find(([k]) => k === c)?.[1] ?? "action checks";
export function situSentence(s: Situ): string {
  const when = s.when.trim().replace(/[.\s]+$/, "");
  const tail = when ? ` ${when}` : "";
  const what = checkWords(s.check);
  switch (s.kind) {
    case "edge": return `The character has an edge on ${what}${tail}.`;
    case "trouble": return `The character has trouble on ${what}${tail}.`;
    case "enemyEdge": return `Enemies have an edge on ${what} against the character${tail}.`;
    default: return `Enemies have trouble on ${what} against the character${tail}.`;
  }
}
export function cleanSitu(v: unknown): Situ[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 12).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = SITU_KINDS.some(([k]) => k === o.kind) ? (o.kind as Situ["kind"]) : "edge";
    const check = CHECKS.some(([k]) => k === o.check) ? String(o.check) : "action";
    return { kind, check, when: plain(o.when, 160) };
  });
}
// Flat effect badges: health / focus / defense / speed are applied by the sheet.
export const LABEL_FX_KINDS = ["health", "focus", "defense", "speed", "reaction", "immunity", "restriction"] as const;
export function cleanLabelFx(v: unknown): Fx[] {
  if (!Array.isArray(v)) return [];
  const out: Fx[] = [];
  for (const raw of v.slice(0, 16)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = String(o.kind ?? "");
    if (kind === "health" || kind === "focus") { const n = clampN(o.amount, -90, 90, 0); if (n) out.push({ kind, amount: n }); }
    else if (kind === "defense") { const n = clampN(o.amount, -3, 3, 0); const t = String(o.target ?? ""); if (n && ABILITIES.some(([k]) => k === t)) out.push({ kind, target: t, amount: n }); }
    else if (kind === "speed") { const n = clampN(o.amount, -5, 5, 0); if (n) out.push({ kind, amount: n }); }
    else if (kind === "reaction") out.push({ kind, amount: clampN(o.amount, 1, 3, 1) });
    else if (kind === "immunity" || kind === "restriction") { const t = plain(o.target, 160); if (t) out.push({ kind, target: t }); }
  }
  return out;
}
const sgn = (n: number) => (n > 0 ? `+${n}` : `–${Math.abs(n)}`);
export function labelFxSentence(f: Fx): string {
  const n = f.amount ?? 0;
  switch (f.kind) {
    case "health": return `Add ${sgn(n)} Health.`;
    case "focus": return `Add ${sgn(n)} Focus.`;
    case "defense": return `This applies ${sgn(n)} to their ${abName(f.target ?? "")} defense.`;
    case "speed": return n > 0 ? `This adds ${sgn(n)} to their Run Speed.` : `This takes ${sgn(n)} from their Run Speed.`;
    case "reaction": return `This grants them ${n === 1 ? "one additional reaction" : `${n} additional reactions`} each round.`;
    case "immunity": return `The character is immune to ${String(f.target).replace(/[.\s]+$/, "")}.`;
    case "restriction": return `Restriction: ${String(f.target).replace(/[.\s]+$/, "")}.`;
    default: return "";
  }
}
export function composeLabel(noun: "trait" | "tag", text: string, situ: Situ[], fx: Fx[], repeatable: boolean): string {
  return [
    text.trim(), ...situ.map(situSentence), ...fx.map(labelFxSentence),
    repeatable ? (noun === "trait" ? "This trait can be taken more than once." : "This tag can be selected multiple times.") : "",
  ].filter(Boolean).join(" ");
}

// ── Iconic items ────────────────────────────────────────────────────────────
// Power Value (Avengers Expansion): each granted power counts, and so does each
// prerequisite power it needs (Mighty 3 brings Mighty 1 and 2); +1 if it's a
// weapon; −1 per restriction; minimum 1. `prereqOf(name)` returns a power's
// prerequisite text ("" when unknown). Names ending "(Energy)" etc. are looked
// up without the element.
export function powerClosure(powers: string[], prereqOf: (name: string) => string | undefined): string[] {
  const known = (n: string) => {
    if (prereqOf(n) !== undefined) return n;
    const bare = n.replace(/\s*\([^)]*\)\s*$/, "");
    return prereqOf(bare) !== undefined ? bare : n;
  };
  const seen = new Map<string, string>();
  const visit = (name: string, depth: number) => {
    const k = known(name.trim());
    if (!k || seen.has(k.toLowerCase()) || depth > 12) return;
    seen.set(k.toLowerCase(), name.trim());
    const pre = prereqOf(k);
    if (!pre || /^none$/i.test(pre)) return;
    for (const tok of pre.split(",").map((t) => t.trim())) {
      if (!tok || /^Rank\s/i.test(tok) || /\sor\s/.test(tok) || ABIL_TOKEN.test(tok)) continue;
      if (prereqOf(known(tok)) !== undefined) visit(tok, depth + 1);
    }
  };
  powers.forEach((p) => visit(p, 0));
  return [...seen.values()];
}
export function iconicPv(type: string, powers: string[], restrictions: number, prereqOf: (name: string) => string | undefined) {
  const all = powerClosure(powers, prereqOf);
  const weapon = type === "Weapon" ? 1 : 0;
  return { granted: powers.length, implied: Math.max(0, all.length - powers.length), weapon, restrictions, pv: Math.max(1, all.length + weapon - restrictions) };
}
// Weapon range: melee reach (+0…+2) and/or a ranged distance (spaces / Unlimited).
export type IconRange = { melee: boolean; reachPlus: number; ranged: boolean; dist: number | "Unlimited" };
export function composeIconRange(r: IconRange): string {
  const m = r.melee ? `Reach${r.reachPlus ? ` +${r.reachPlus}` : ""}` : "";
  const d = r.ranged ? (r.dist === "Unlimited" ? "Unlimited" : r.melee ? String(r.dist) : sp(r.dist)) : "";
  return [m, d].filter(Boolean).join("/") || "Reach";
}
export function parseIconRange(raw: string): IconRange | null {
  const s = raw.trim().replace(/^Reach\+/, "Reach +");
  const m = /^(?:(Reach)(?: \+(\d))?)?(?:\/?(?:(\d+)(?: spaces?)?|(Unlimited)))?$/.exec(s);
  if (!s || !m || (!m[1] && !m[3] && !m[4])) return null;
  return { melee: !!m[1], reachPlus: m[2] ? Number(m[2]) : 0, ranged: !!(m[3] || m[4]), dist: m[4] ? "Unlimited" : m[3] ? Number(m[3]) : 10 };
}

// ── Headquarters / starships ───────────────────────────────────────────────
export const SHIP_SIZES = ["Average", "Big", "Huge", "Gigantic", "Titanic", "Gargantuan"] as const;
// Starship Size table (Secret Wars p183): team rank → size; Health and
// passengers follow the ship's final size (Cozy −1 size, Roomy +1 size).
export const SIZE_STATS: Record<string, { passengers: number; health: number }> = {
  Average: { passengers: 1, health: 100 }, Big: { passengers: 2, health: 200 }, Huge: { passengers: 5, health: 300 },
  Gigantic: { passengers: 20, health: 400 }, Titanic: { passengers: 80, health: 600 }, Gargantuan: { passengers: 320, health: 1000 },
};
export type BaseTrait = { name: string; n: number };
export type BaseTag = { name: string; note?: string };
export function shipStats(rank: number, traits: BaseTrait[], tags: BaseTag[]) {
  const has = (n: string) => traits.some((t) => t.name === n) || tags.some((t) => t.name === n);
  const cnt = (n: string) => traits.find((t) => t.name === n)?.n ?? 0;
  const idx = Math.max(0, Math.min(5, rank - 1 + (has("Roomy") ? 1 : 0) - (has("Cozy") ? 1 : 0)));
  const size = SHIP_SIZES[idx];
  return {
    size, ...SIZE_STATS[size], flightSpeed: has("Star Drive") ? 36 : 24,
    shields: cnt("Shields"), cannons: cnt("Plasma Cannons"), mines: cnt("Mines") * 4,
  };
}
