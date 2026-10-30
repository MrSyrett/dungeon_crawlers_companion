// ── Pirate Borg homebrew rules (pure, no React) ──────────────────────────────
// Shared by the components/hb/pb/* builders AND lib/homebrew.ts (the server
// normalisers), so the client preview and the stored record agree.
//
// Pirate Borg vocabulary only: abilities STRENGTH/AGILITY/PRESENCE/TOUGHNESS/
// SPIRIT, Tests (d20 + ability vs DR, default 12), armor tiers 0–3 (−d2/−d4/−d6),
// Morale (2d6 above it breaks; "–" never breaks), black powder (Reload in
// actions, ignores armor), relics (SPIRIT DR12 after use), rituals (SPIRIT DR12
// to cast), ships (HP, hull tier, AGILITY, speed in hexes, crew SKILL,
// broadsides / small arms / ram dice, crew min–max, cargo slots).
// Dice are written the book's way: lowercase, a single die without its "1"
// ("d6", "2d4", "d4+1", "d6+SPIRIT").
import type { AttackRow } from "../AttackRows";
import type { Dice } from "../dice";

const s = (v: unknown) => (v == null ? "" : String(v));
const int = (v: unknown, d = 0) => { const n = parseInt(s(v).replace(/^[−–]/, "-").replace(/^\+/, ""), 10); return Number.isFinite(n) ? n : d; };
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export const PB_DICE = [2, 4, 6, 8, 10, 12, 20];
export const PB_ABILITIES = ["STRENGTH", "AGILITY", "PRESENCE", "TOUGHNESS", "SPIRIT"] as const;
export const PB_AB_SHORT: Record<string, string> = { STRENGTH: "STR", AGILITY: "AGI", PRESENCE: "PRE", TOUGHNESS: "TGH", SPIRIT: "SPI" };
export const PB_ARMOR_TIERS = [
  { tier: 0, die: "", name: "None", agilityDR: 0, defenseDR: 0 },
  { tier: 1, die: "d2", name: "Light", agilityDR: 0, defenseDR: 0 },
  { tier: 2, die: "d4", name: "Medium", agilityDR: 2, defenseDR: 2 },
  { tier: 3, die: "d6", name: "Heavy", agilityDR: 4, defenseDR: 2 },
] as const;
export const PB_MON_ARMOR_DICE = ["d2", "d4", "d6", "d8", "d10", "d12"] as const;
export const PB_MON_CATS: [string, string][] = [["npc", "NPC"], ["undead", "Undead"], ["beast", "Beast"], ["spirit", "Spirit"], ["monster", "Monster"], ["flora", "Flora"], ["construct", "Construct"]];
export const PB_UNITS = ["rounds", "turns", "minutes", "hours", "days"] as const;
export const PB_EXTRA_ARMOR = ["d2", "d4", "d6"] as const;

// Core Rules Enemy Builder (pg. 98): what a number means, shown live.
export const PB_HP_BANDS: [number, string][] = [[1, "Barely worth fighting"], [4, "A weak human"], [7, "An average human"], [10, "A tough human or animal"], [13, "A challenge to new PCs"], [16, "A serious threat to new PCs"], [20, "A low level boss"], [25, "A regional boss"], [30, "Huge or legendary"], [40, "Naval threat, TPK zone"]];
export const PB_MORALE_LABELS: Record<number, string> = { 2: "Easily scared, likely to flee", 3: "Bottom of the food chain", 4: "Runs when danger is sensed", 5: "Fearful, but willing to fight", 6: "Untrained, average human", 7: "Combat experience", 8: "Military training", 9: "A brave leader", 10: "Unwise in their courage", 11: "Insane, heroic, or both", 12: "Rarely breaks" };
export const PB_DAMAGE_HINTS: Record<string, string> = { d2: "bottle, fist, weak claw, harsh language", d4: "knife, hook, claw, club", d6: "cutlass, axe, animal bite", d8: "fine rapier, big sword, large claw", d10: "two-handed weapon, monster bite, anchor", d12: "executioner's axe, kraken's maw", "2d4": "flintlock pistol", "2d6": "black powder musket", "2d8": "buccaneer musket", "2d10": "mounted swivel gun", "2d12": "cannon shot in melee", "3d6": "some form of arcana" };
export const PB_ENEMY_SPECIALS: { name: string; text: string; dr?: number }[] = [
  { name: "Quick", text: "DR14 to attack and defend against.", dr: 14 },
  { name: "Slow", text: "DR10 to attack and defend against.", dr: 10 },
  { name: "Poisonous", text: "Test TOUGHNESS DR12 or become infected." },
  { name: "Combatant", text: "Takes 2 attacks each round." },
  { name: "Arcane", text: "Test SPIRIT DR12 or STRENGTH/AGILITY are −2 for the combat." },
  { name: "Outsmart", text: "Test PRESENCE DR12 or skip the next d2 turns." },
  { name: "Terrifying", text: "Test SPIRIT DR12 or run away for d2 rounds." },
  { name: "Leadership", text: "Nearby allies are +2 DR to attack and defend against." },
];
export const hpBand = (hp: number) => { let l = ""; for (const [lo, t] of PB_HP_BANDS) if (hp >= lo) l = t; return l; };
export const armorTierOf = (die: string) => Math.max(0, ["", "d2", "d4", "d6"].indexOf(die));

// ═══ DICE ════════════════════════════════════════════════════════════════════
/** {n,d,m} → "d6" / "2d4" / "d4+1" / "1" (flat) / "" (none). */
export function fmtPb(x: Dice | null | undefined): string {
  if (!x) return "";
  const base = x.n > 0 ? `${x.n === 1 ? "" : x.n}d${x.d}` : "";
  if (!x.m) return base;
  if (!base) return String(x.m);
  return `${base}${x.m > 0 ? "+" : "-"}${Math.abs(x.m)}`;
}
/** "d6", "2d4", "d4+1", "1" → Dice; null for anything else ("d10 & d6"). */
export function parsePb(raw: unknown): Dice | null {
  const t = s(raw).trim().replace(/\s+/g, "");
  if (!t) return { n: 0, d: 6, m: 0 };
  let m = t.match(/^(\d*)d(\d+)(?:([+-])(\d+))?$/i);
  if (m) {
    if (m[1] === "1") return null; // "1d6" isn't book style — keep the text
    return { n: m[1] ? int(m[1]) : 1, d: int(m[2]), m: m[3] ? (m[3] === "-" ? -1 : 1) * int(m[4]) : 0 };
  }
  m = t.match(/^(\d+)$/);
  return m ? { n: 0, d: 6, m: int(m[1]) } : null;
}
export function cleanPbDice(raw: unknown, maxN = 20): Dice {
  const o = (raw ?? {}) as Record<string, unknown>;
  const d = int(o.d, 6);
  return { n: clamp(int(o.n), 0, maxN), d: PB_DICE.includes(d) ? d : clamp(d, 2, 100), m: clamp(int(o.m), -20, 99) };
}

/** Dice that may add SPIRIT ("d4+SPIRIT", "1+SPIRIT", "2d10+SPIRIT"). */
export type SDice = Dice & { spirit: boolean };
export const noSDice = (): SDice => ({ n: 0, d: 6, m: 0, spirit: false });
export function fmtS(x: SDice | null | undefined): string {
  if (!x) return "";
  const b = fmtPb(x);
  return x.spirit ? (b ? `${b}+SPIRIT` : "SPIRIT") : b;
}
export function parseS(raw: unknown): SDice | null {
  const t = s(raw).trim().replace(/\s+/g, "");
  if (/^SPIRIT$/i.test(t)) return { ...noSDice(), spirit: true };
  const sp = /\+SPIRIT$/i.test(t);
  const rest = sp ? t.replace(/\+SPIRIT$/i, "") : t;
  const d = sp && !rest ? null : parsePb(rest);
  return d ? { ...d, spirit: sp } : null;
}
export function cleanSDice(raw: unknown): SDice {
  return { ...cleanPbDice(raw), spirit: !!(raw && (raw as Record<string, unknown>).spirit) };
}
const sEmpty = (x: SDice | null | undefined) => !x || (x.n <= 0 && !x.m && !x.spirit);

/** A duration: dice (+SPIRIT) + unit ("d6+SPIRIT rounds"), or kept text. */
export type PbDuration = { dice: SDice; unit: string; text: string };
export const blankDuration = (): PbDuration => ({ dice: noSDice(), unit: "rounds", text: "" });
export function fmtDuration(x: PbDuration | null | undefined): string {
  if (!x) return "";
  if (x.text.trim()) return x.text.trim().slice(0, 60);
  if (sEmpty(x.dice)) return "";
  const n = fmtS(x.dice);
  const one = x.dice.n === 0 && x.dice.m === 1 && !x.dice.spirit;
  return `${n} ${one ? x.unit.replace(/s$/, "") : x.unit}`;
}
export function parseDuration(raw: unknown): PbDuration {
  const t = s(raw).trim();
  if (!t) return blankDuration();
  const m = t.match(/^(\S+)\s+(round|turn|minute|hour|day)s?$/i);
  const dice = m ? parseS(m[1]) : null;
  if (m && dice) {
    const out = { dice, unit: m[2].toLowerCase() + "s", text: "" };
    if (fmtDuration(out) === t) return out;
  }
  return { ...blankDuration(), text: t };
}
export function cleanDuration(raw: unknown): PbDuration {
  const o = (raw ?? {}) as Record<string, unknown>;
  return { dice: cleanSDice(o.dice), unit: (PB_UNITS as readonly string[]).includes(s(o.unit)) ? s(o.unit) : "rounds", text: s(o.text).trim().slice(0, 60) };
}

export type PbTest = { ability: string; dr: number } | null;
export function cleanTest(raw: unknown): PbTest {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const ab = (PB_ABILITIES as readonly string[]).includes(s(o.ability)) ? s(o.ability) : "";
  return { ability: ab, dr: clamp(int(o.dr, 12), 2, 20) };
}
export const fmtTest = (t: PbTest) => (t ? `${t.ability ? t.ability + " " : ""}DR${t.dr}` : "");
const testOut = (t: PbTest) => (t ? (t.ability ? { ability: t.ability, dr: t.dr } : { dr: t.dr }) : null);

// ═══ ITEM BONUSES (LootBonus "pb") ═══════════════════════════════════════════
// Server-side mirror of public/tools-data/pb-loot-bonus.js: kinds whitelist,
// clamped amounts, trimmed targets. Stored as `benefits`; the PB sheet copies
// them onto the inventory row (bv:2) so syncItemBonuses applies them on equip.
export type PbBenefit = { kind: string; target?: string; amount?: number };
const LB_AMOUNT: Record<string, [number, number]> = { stat: [-3, 3], attack: [-6, 6], damage: [-6, 6], defense: [-6, 6], armor: [-3, 3], hp: [-30, 30] };
const LB_STATS: Record<string, string> = { str: "str", strength: "str", agi: "agi", agility: "agi", pre: "pre", presence: "pre", tou: "tou", tgh: "tou", toughness: "tou", spi: "spi", spirit: "spi" };
export function cleanPbBenefits(v: unknown): PbBenefit[] {
  if (!Array.isArray(v)) return [];
  const out: PbBenefit[] = [];
  for (const raw of v.slice(0, 24)) {
    const o = (raw ?? {}) as Record<string, unknown>;
    const kind = s(o.kind).trim().toLowerCase(), t = s(o.target).trim(), n = Math.trunc(Number(o.amount) || 0);
    if (kind === "stat") { const st = LB_STATS[t.toLowerCase()]; if (st && n) out.push({ kind, target: st, amount: clamp(n, ...LB_AMOUNT.stat) }); }
    else if (kind in LB_AMOUNT) { if (n) out.push({ kind, amount: clamp(n, ...LB_AMOUNT[kind]) }); }
    else if (kind === "relic" || kind === "ritual") { if (t) out.push({ kind, target: t.slice(0, 60) }); }
    else if (kind === "note") { if (t) out.push({ kind, target: t.slice(0, 160) }); }
  }
  return out;
}

// ═══ MONSTER ATTACKS ═════════════════════════════════════════════════════════
// AttackRow (../AttackRows) with PB extras:
//   dice      the damage the PC takes when its defense fails (n = 0, m = 0 → none)
//   extra.dmgText  damage that isn't one roll ("d10 & d6") — wins over dice
//   extra.range    feet ("10" → "10' range"), "" = melee
//   extra.reload   black powder reload in actions ("2" → "Reload: 2 actions")
//   extra.ia       "1" → "ignores armor"
//   extra.tAb / extra.tDr  rider test ("+ TOUGHNESS DR12 …", the special follows)
//   special        free text rider, last
// composed into the book's {name, damage, notes} the GM Screen rolls.
// Legacy {name, damage, notes} parse back into rows; anything that wouldn't
// re-compose byte-exact stays in `special` (and `dmgText`) so nothing is lost.
export type PbAttack = { name: string; damage: string | null; notes?: string };
export const newPbAttack = (p: Partial<AttackRow> = {}): AttackRow => ({
  name: "", count: 1, hit: null, dice: { n: 1, d: 6, m: 0 }, special: "",
  extra: { dmgText: "", range: "", reload: "", ia: "", tAb: "", tDr: "12" }, ...p,
});
export function rowDamage(r: AttackRow): string | null {
  const t = s(r.extra?.dmgText).trim();
  return (t || fmtPb(r.dice)) || null;
}
export function rowNotes(r: AttackRow): string {
  const x = r.extra ?? {};
  const parts: string[] = [];
  const ft = int(x.range);
  if (ft > 0) parts.push(`${ft}' range`);
  const rl = int(x.reload);
  if (rl > 0) parts.push(`Reload: ${rl} action${rl === 1 ? "" : "s"}`);
  if (x.ia === "1") parts.push("ignores armor");
  const sp = s(r.special).trim();
  if (x.tAb) parts.push(`+ ${x.tAb} DR${clamp(int(x.tDr, 12), 2, 20)}${sp ? " " + sp : ""}`);
  else if (sp) parts.push(sp);
  return parts.join("; ");
}
export function composePbAttacks(rows: AttackRow[]): PbAttack[] {
  return rows.map((r, i) => {
    const out: PbAttack = { name: s(r.name).trim() || `Attack ${i + 1}`, damage: rowDamage(r) };
    const n = rowNotes(r);
    if (n) out.notes = n;
    return out;
  }).filter((a) => a.name || a.damage);
}
export function parsePbAttack(a: PbAttack): AttackRow {
  const dmg = parsePb(a.damage ?? "");
  const notes = s(a.notes).trim();
  const row = newPbAttack({ name: s(a.name), dice: dmg ?? { n: 0, d: 6, m: 0 } });
  row.extra = { ...row.extra!, dmgText: dmg ? "" : s(a.damage) };
  const toks = notes ? notes.split("; ") : [];
  const ex = { ...row.extra! };
  let special = "";
  toks.forEach((t, i) => {
    let m: RegExpMatchArray | null;
    if ((m = t.match(/^(\d+)' range$/)) && !ex.range) ex.range = m[1];
    else if ((m = t.match(/^Reload: (\d+) actions?$/)) && !ex.reload) ex.reload = m[1];
    else if (t === "ignores armor" && !ex.ia) ex.ia = "1";
    else if (i === toks.length - 1 && (m = t.match(/^\+ (STRENGTH|AGILITY|PRESENCE|TOUGHNESS|SPIRIT) DR(\d+)(?: ([\s\S]+))?$/))) { ex.tAb = m[1]; ex.tDr = m[2]; special = m[3] ?? ""; }
    else if (i === toks.length - 1) special = t;
    else special = "\u0000"; // unknown token mid-list → fall back below
  });
  const tryRow = { ...row, extra: ex, special };
  if (!special.includes("\u0000") && rowNotes(tryRow) === notes) return tryRow;
  return { ...row, special: notes };
}
export function cleanPbAttackRows(v: unknown, max = 8): AttackRow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, max).map((raw) => {
    const o = (raw ?? {}) as Record<string, unknown>;
    const ex = (o.extra ?? {}) as Record<string, unknown>;
    const tAb = (PB_ABILITIES as readonly string[]).includes(s(ex.tAb)) ? s(ex.tAb) : "";
    return {
      name: s(o.name).trim().slice(0, 80), count: 1, hit: null, dice: cleanPbDice(o.dice, 10),
      special: s(o.special).trim().slice(0, 400),
      extra: {
        dmgText: s(ex.dmgText).trim().slice(0, 40),
        range: int(ex.range) > 0 ? String(clamp(int(ex.range), 5, 1000)) : "",
        reload: int(ex.reload) > 0 ? String(clamp(int(ex.reload), 1, 6)) : "",
        ia: ex.ia === "1" || ex.ia === true ? "1" : "",
        tAb, tDr: String(clamp(int(ex.tDr, 12), 2, 20)),
      },
    };
  });
}

// ═══ RELICS & RITUALS ════════════════════════════════════════════════════════
// The book fields ARE the structure (PB_RELICS / PB_RITUALS — what the sheet's
// useRelic / castRitual automate): duration, targets | target | area,
// targetTest {ability?, dr}, damage, ignoresArmor, heal, extraArmor, tempHp
// (relic), singleUse / consumable (relic). The builder edits them as dice /
// selects; strings are composed here and parsed back when a record opens.
export type PbMagicBuild = {
  duration: PbDuration;
  tgtMode: "" | "self" | "ally" | "creature" | "dice" | "area";
  tgtDice: SDice; area: string;
  test: PbTest;
  damage: SDice; dmgText: string; ignoresArmor: boolean;
  heal: SDice; extraArmor: string; tempHp: SDice;
  singleUse: boolean; consumable: boolean;
};
export function blankMagic(): PbMagicBuild {
  return { duration: blankDuration(), tgtMode: "", tgtDice: { ...noSDice(), n: 1, d: 4 }, area: "", test: null, damage: noSDice(), dmgText: "", ignoresArmor: false, heal: noSDice(), extraArmor: "", tempHp: noSDice(), singleUse: false, consumable: false };
}
export function magicFromData(d: Record<string, unknown>): PbMagicBuild {
  const b = blankMagic();
  b.duration = parseDuration(d.duration);
  const tg = s(d.targets).trim(), t1 = s(d.target).trim().toLowerCase(), area = s(d.area).trim();
  const td = tg ? parseS(tg) : null;
  if (td && !sEmpty(td)) { b.tgtMode = "dice"; b.tgtDice = td; }
  else if (tg) { b.tgtMode = "area"; b.area = tg; }
  else if (t1 === "self" || t1 === "ally" || t1 === "creature") b.tgtMode = t1;
  else if (area) { b.tgtMode = "area"; b.area = area; }
  b.test = cleanTest(d.targetTest);
  const dm = parseS(d.damage);
  if (dm) b.damage = dm; else b.dmgText = s(d.damage).trim();
  b.ignoresArmor = !!d.ignoresArmor;
  b.heal = parseS(d.heal) ?? noSDice();
  b.extraArmor = (PB_EXTRA_ARMOR as readonly string[]).includes(s(d.extraArmor)) ? s(d.extraArmor) : "";
  b.tempHp = parseS(d.tempHp) ?? noSDice();
  b.singleUse = !!d.singleUse; b.consumable = !!d.consumable;
  return b;
}
export function cleanMagic(raw: unknown): PbMagicBuild {
  const o = (raw ?? {}) as Record<string, unknown>;
  const modes = ["", "self", "ally", "creature", "dice", "area"];
  return {
    duration: cleanDuration(o.duration),
    tgtMode: (modes.includes(s(o.tgtMode)) ? s(o.tgtMode) : "") as PbMagicBuild["tgtMode"],
    tgtDice: cleanSDice(o.tgtDice), area: s(o.area).trim().slice(0, 80),
    test: cleanTest(o.test),
    damage: cleanSDice(o.damage), dmgText: s(o.dmgText).trim().slice(0, 60), ignoresArmor: !!o.ignoresArmor,
    heal: cleanSDice(o.heal), extraArmor: (PB_EXTRA_ARMOR as readonly string[]).includes(s(o.extraArmor)) ? s(o.extraArmor) : "",
    tempHp: cleanSDice(o.tempHp), singleUse: !!o.singleUse, consumable: !!o.consumable,
  };
}
/** Book fields from the build (null/false entries are dropped by the caller). */
export function composeMagic(b: PbMagicBuild, kind: "relic" | "ritual"): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const dur = fmtDuration(b.duration); if (dur) out.duration = dur;
  if (b.tgtMode === "dice" && !sEmpty(b.tgtDice)) out.targets = fmtS(b.tgtDice);
  else if (b.tgtMode === "self" || b.tgtMode === "ally" || b.tgtMode === "creature") out.target = b.tgtMode;
  else if (b.tgtMode === "area" && b.area.trim()) out[kind === "ritual" ? "targets" : "area"] = b.area.trim();
  const tt = testOut(b.test); if (tt) out.targetTest = tt;
  const dmg = b.dmgText.trim() || fmtS(b.damage); if (dmg) out.damage = dmg;
  if (dmg && b.ignoresArmor) out.ignoresArmor = true;
  const heal = fmtS(b.heal); if (heal) out.heal = heal;
  if (b.extraArmor) out.extraArmor = b.extraArmor;
  if (kind === "relic") {
    const th = fmtS(b.tempHp); if (th) out.tempHp = th;
    if (b.singleUse) out.singleUse = true;
    else if (b.consumable) out.consumable = true;
  }
  return out;
}
/** One-line mechanics summary for previews / list rows. */
export function magicLine(f: Record<string, unknown>): string {
  const tgt = f.targets ? `${f.targets} target${/^1$/.test(s(f.targets)) ? "" : "s"}` : f.target ? `one ${f.target}` : f.area ? s(f.area) : "";
  const tt = f.targetTest as { ability?: string; dr: number } | undefined;
  return [
    s(f.duration), tgt,
    tt ? `target tests ${tt.ability ? tt.ability + " " : ""}DR${tt.dr}` : "",
    f.damage ? `${f.damage} damage${f.ignoresArmor ? " (ignores armor)" : ""}` : "",
    f.heal ? `heals ${f.heal}` : "", f.extraArmor ? `extra armor −${f.extraArmor}` : "",
    f.tempHp ? `${f.tempHp} temp HP` : "", f.singleUse ? "single use" : f.consumable ? "consumed" : "",
  ].filter(Boolean).join(" · ");
}

// ═══ GEAR "uses" ═════════════════════════════════════════════════════════════
// "d6" (rolled), "5" (fixed), "PRESENCE + 4" (ability + N), "" (unlimited).
export type PbUses = { mode: "" | "dice" | "ability"; dice: Dice; ability: string; plus: number; text: string };
export const blankUses = (): PbUses => ({ mode: "", dice: { n: 1, d: 6, m: 0 }, ability: "PRESENCE", plus: 4, text: "" });
export function fmtUses(u: PbUses): string {
  if (u.text.trim()) return u.text.trim().slice(0, 40);
  if (u.mode === "dice") return fmtPb(u.dice);
  if (u.mode === "ability") return `${u.ability}${u.plus ? ` ${u.plus > 0 ? "+" : "−"} ${Math.abs(u.plus)}` : ""}`;
  return "";
}
export function parseUses(raw: unknown): PbUses {
  const t = s(raw).trim(), b = blankUses();
  if (!t) return b;
  const m = t.match(/^(STRENGTH|AGILITY|PRESENCE|TOUGHNESS|SPIRIT)(?: ([+−-]) (\d+))?$/);
  if (m) return { ...b, mode: "ability", ability: m[1], plus: m[2] ? (m[2] === "+" ? 1 : -1) * int(m[3]) : 0 };
  const d = parsePb(t);
  if (d && fmtPb(d) === t) return { ...b, mode: "dice", dice: d };
  return { ...b, text: t };
}
export function cleanUses(raw: unknown): PbUses {
  const o = (raw ?? {}) as Record<string, unknown>;
  return {
    mode: (["", "dice", "ability"].includes(s(o.mode)) ? s(o.mode) : "") as PbUses["mode"],
    dice: cleanPbDice(o.dice), ability: (PB_ABILITIES as readonly string[]).includes(s(o.ability)) ? s(o.ability) : "PRESENCE",
    plus: clamp(int(o.plus), -10, 20), text: s(o.text).trim().slice(0, 40),
  };
}
