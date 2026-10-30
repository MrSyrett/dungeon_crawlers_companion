"use client";
// ── VAESEN homebrew Weapon + Gear builders ───────────────────────────────────
// Storage shapes are documented in ./rules.ts. Weapon: skill chips (Close
// Combat / Ranged Combat / Force / either), bonus and damage steppers, a range
// in zones (from–to), feature chips and a cost. Gear: Gear, Armor, Item of
// Power or Magic Item. Gear takes skill-bonus badges the sheet applies while the
// item is in use; armor has Protection + an Agility penalty; Items of Power and
// magic items carry an effect, resistance badges and (magic) a risk.
import type { ReactNode } from "react";
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  FEATURES, MAX_ZONE, RESIST_AGAINST, SKILL_ATTR, VAE_SKILLS, WEAPON_SKILLS,
  bonusNum, cleanResist, cleanSkillBonus, costNum, fmtBonus, fmtRange, fmtResist, fmtSkillBonus, isRanged,
  parseLegacyBonus, parseRange, rangeWords,
  type GearKind, type Resist, type SkillBonus,
} from "./rules";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const numOr = (v: unknown, dflt: number) => { const n = Number(v); return Number.isFinite(n) ? Math.round(n) : dflt; };

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const hint = "mt-1 text-[11px] text-[var(--muted)]";
const statRow = "flex flex-wrap gap-x-4 gap-y-1 text-[12px]";
const statK = "text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]";
const smallBtn = "rounded border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

function Cell({ label, children, className = "", help }: { label: ReactNode; children: ReactNode; className?: string; help?: ReactNode }) {
  return (
    <div className={className}>
      <label className={lbl}>{label}</label>
      {children}
      {help ? <p className={hint}>{help}</p> : null}
    </div>
  );
}
function Stat({ k, v }: { k: string; v: ReactNode }) {
  return <span><span className={statK}>{k}</span> <span className="font-semibold">{v}</span></span>;
}

// ── Cost (shared): a number 1–8 or "not for sale"; odd legacy text kept ──────
type Cost = { n: number | null; raw: string };
const costFrom = (d: Data): Cost => ({ n: costNum(d.cost), raw: sv(d, "cost") });
const costOut = (c: Cost) => (c.n != null ? String(c.n) : c.raw && costNum(c.raw) == null && c.raw !== "" ? c.raw : "");
function CostField({ c, set }: { c: Cost; set: (c: Cost) => void }) {
  const odd = c.n == null && c.raw.trim() !== "" && c.raw.trim() !== "—";
  return (
    <Cell label="Cost" help={<>Paid with Resources successes and/or Capital (cost 3 = three successes). Blank = not for sale — found or granted.{odd ? <> Was written as &ldquo;{c.raw}&rdquo; — <button type="button" className={smallBtn} onClick={() => set({ n: null, raw: "" })}>clear</button></> : null}</>}>
      <Stepper value={c.n} nullable min={1} max={8} ariaLabel="cost" onChange={(n) => set({ n, raw: n == null ? (odd ? c.raw : "") : String(n) })} />
    </Cell>
  );
}

// ═══ WEAPON ══════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  skill: string; bonus: number; bonusRaw: string; damage: number;
  range: string; features: string[]; cost: Cost; desc: string;
};
export const blankWeapon = (): WeaponDraft => ({ skill: "Close Combat", bonus: 1, bonusRaw: "", damage: 1, range: "0", features: [], cost: { n: 2, raw: "2" }, desc: "" });
export function weaponFromData(d: Data): WeaponDraft {
  const raw = sv(d, "bonus");
  return {
    skill: sv(d, "skill") || "Close Combat", bonus: bonusNum(raw), bonusRaw: raw, damage: Math.max(1, numOr(d.damage, 1)),
    range: sv(d, "range") || "0", features: Array.isArray(d.features) ? d.features.map(String).filter(Boolean) : [],
    cost: costFrom(d), desc: sv(d, "desc"),
  };
}
export function weaponPayload(name: string, w: WeaponDraft): Data {
  // Keep the bonus text exactly as stored while its number is unchanged ("—", "1").
  const bonus = w.bonusRaw && bonusNum(w.bonusRaw) === w.bonus ? w.bonusRaw : fmtBonus(w.bonus);
  const out: Data = { name, skill: w.skill, bonus, damage: w.damage, range: w.range, cost: costOut(w.cost), desc: w.desc.trim() };
  if (w.features.length) out.features = w.features;
  return out;
}
const SKILL_CHIPS: [string, string][] = WEAPON_SKILLS.map((s) => [s, s === "Close Combat / Ranged Combat" ? "Either (thrown)" : s]);

export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  const r = parseRange(w.range);
  const zones = Array.from({ length: MAX_ZONE + 1 }, (_, i) => i);
  const setRange = (from: number, to: number) => set({ range: fmtRange({ from, to: Math.max(from, to) }) });
  const first = w.skill.split("/")[0].trim();
  return (
    <>
      <Cell label="Skill" className="sm:col-span-2" help={`Attack: ${SKILL_ATTR[first] ?? "PHY"} + ${first}${w.bonus > 0 ? ` + ${w.bonus} gear dice` : ""}. ${w.skill === "Force" ? "Unarmed and brawling attacks use Force." : isRanged(w.skill) && w.skill !== "Ranged Combat" ? "Thrown or stabbed: roll either combat skill (the sheet uses Close Combat)." : ""}`}>
        <ChipPicker single options={SKILL_CHIPS} value={[w.skill]}
          onChange={(v) => { if (!v[0]) return; const skill = v[0]; set({ skill, range: !isRanged(skill) && r && r.from > 0 ? "0" : isRanged(skill) && w.range === "0" && skill === "Ranged Combat" ? "0-2" : w.range }); }} />
      </Cell>
      <Cell label="Bonus" help="Gear dice added to the attack (book: −1 sledgehammer to +2 sword, rifle, pistol).">
        <Stepper value={w.bonus} signed min={-2} max={4} ariaLabel="weapon bonus" onChange={(n) => set({ bonus: n ?? 0 })} />
      </Cell>
      <Cell label="Damage" help="Conditions dealt on a hit; each extra success adds +1 (book: 1 fist to 5 cannon).">
        <Stepper value={w.damage} min={1} max={10} ariaLabel="damage" onChange={(n) => set({ damage: n ?? 1 })} />
      </Cell>
      <Cell label="Range (zones)" help={r ? `Reaches ${rangeWords(r)}.` : <>Written as &ldquo;{w.range}&rdquo; — pick zones to replace it.</>}>
        <div className="flex flex-wrap items-center gap-2">
          <select className={selCls} aria-label="range from" value={r ? r.from : ""} onChange={(e) => setRange(Number(e.target.value), r ? r.to : Number(e.target.value))}>
            {!r ? <option value="">{w.range} (as written)</option> : null}
            {zones.map((z) => <option key={z} value={z}>{z === 0 ? "0 · engaged / same zone" : `${z}`}</option>)}
          </select>
          <span className="text-[12px] text-[var(--muted)]">to</span>
          <select className={selCls} aria-label="range to" value={r ? r.to : ""} onChange={(e) => setRange(r ? Math.min(r.from, Number(e.target.value)) : Number(e.target.value), Number(e.target.value))}>
            {!r ? <option value="">—</option> : null}
            {zones.map((z) => <option key={z} value={z}>{z === 0 ? "0 · engaged / same zone" : `${z} zone${z === 1 ? "" : "s"}`}</option>)}
          </select>
        </div>
      </Cell>
      <CostField c={w.cost} set={(cost) => set({ cost })} />
      <Cell label="Features" className="sm:col-span-2" help="Silver and iron matter against some vaesen — the GM says which.">
        <ChipPicker custom customPh="Other feature…" options={[...FEATURES]} value={w.features} onChange={(features) => set({ features })} />
      </Cell>
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={w.desc} maxLength={1000} placeholder="Where it came from, how it looks, any rule the pickers don't cover." onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const r = parseRange(w.range);
  const first = w.skill.split("/")[0].trim();
  return (
    <Preview title={name || "Unnamed Weapon"} subtitle={`${isRanged(w.skill) ? "Ranged" : "Close combat"} weapon · ${w.skill}`}>
      <div className={statRow}>
        <Stat k="Damage" v={w.damage} />
        <Stat k="Range" v={w.range || "0"} />
        <Stat k="Bonus" v={w.bonus === 0 ? "—" : fmtBonus(w.bonus)} />
        <Stat k="Cost" v={costOut(w.cost) || "—"} />
      </div>
      {w.features.length ? <p className="mt-2 text-[13px]"><span className={statK}>Features</span> {w.features.join(", ")}</p> : null}
      {w.desc.trim() ? <p className="mt-2 text-[13px] text-[var(--muted)]">{w.desc.trim()}</p> : null}
      <p className={hint}>
        Attack: {SKILL_ATTR[first] ?? "PHY"} + {first}{w.bonus > 0 ? ` + ${w.bonus} gear` : ""} dice{r ? `, at ${rangeWords(r)}` : ""} · a hit deals {w.damage} Condition{w.damage === 1 ? "" : "s"}, +1 per extra success.
      </p>
    </Preview>
  );
}

// ═══ GEAR / ARMOR / ITEM OF POWER / MAGIC ITEM ═══════════════════════════════
const SKILL_OPTS: [string, string][] = VAE_SKILLS.map((s) => [s, `${s} (${SKILL_ATTR[s]})`]);
const BONUS_KINDS: BadgeKind[] = [
  { k: "skill", label: "Skill bonus", color: "green", amount: true, amountPh: "+1", target: "choice", choices: SKILL_OPTS,
    format: (b) => `${b.target ?? "?"} +${Math.abs(b.amount ?? 0)}`,
    tip: "Extra dice on that skill when the item helps (Binoculars: Vigilance +2). On the sheet, tick the item as in use; only one item's bonus counts on a roll." },
];
const RESIST_KINDS: BadgeKind[] = [
  { k: "resist", label: "Resist", color: "purple", amount: true, amountPh: "+2", target: "choice", choices: [...RESIST_AGAINST],
    format: (b) => (b.target === "Fear" ? `+${Math.abs(b.amount ?? 0)} Fear tests` : `+${Math.abs(b.amount ?? 0)} vs ${b.target ?? "?"}`),
    tip: "Extra dice when resisting that kind of magic (Troll cross: +2 vs Curses)." },
];
const toBadges = (b: SkillBonus[]): Badge[] => b.map((x) => ({ kind: "skill", target: x.skill, amount: x.amount }));
const fromBadges = (b: Badge[]): SkillBonus[] => cleanSkillBonus(b.map((x) => ({ skill: x.target, amount: Math.abs(x.amount ?? 0) })));
const resToBadges = (r: Resist[]): Badge[] => r.map((x) => ({ kind: "resist", target: x.against, amount: x.amount }));
const resFromBadges = (b: Badge[]): Resist[] => cleanResist(b.map((x) => ({ against: x.target, amount: Math.abs(x.amount ?? 0) })));

export type GearDraft = {
  kind: GearKind; bonuses: SkillBonus[]; legacyBonus: string; cost: Cost; desc: string;
  rating: number; penalty: number;
  effect: string; resist: Resist[]; resistFrom: string; risk: string; consumable: boolean;
};
export const blankGear = (): GearDraft => ({
  kind: "gear", bonuses: [], legacyBonus: "", cost: { n: 1, raw: "1" }, desc: "",
  rating: 2, penalty: 1, effect: "", resist: [], resistFrom: "", risk: "", consumable: false,
});
export function gearFromData(d: Data): GearDraft {
  const kind: GearKind = d.kind === "armor" || d.kind === "power" || d.kind === "magic" ? d.kind : d.kind == null && d.rating != null ? "armor" : "gear";
  const stored = cleanSkillBonus(d.skillBonus);
  const parsed = stored.length || d.kind != null ? stored : parseLegacyBonus(sv(d, "bonus"), sv(d, "desc"));
  return {
    kind, bonuses: parsed, legacyBonus: parsed.length ? "" : sv(d, "bonus"), cost: costFrom(d), desc: sv(d, "desc"),
    rating: Math.max(1, Math.min(10, numOr(d.rating, 2))), penalty: Math.max(0, Math.min(3, numOr(d.penalty, 0))),
    effect: sv(d, "effect"), resist: cleanResist(d.resist), resistFrom: sv(d, "resistFrom"), risk: sv(d, "risk"), consumable: d.consumable === true,
  };
}
export function gearPayload(name: string, g: GearDraft): Data {
  const bonuses = cleanSkillBonus(g.bonuses);
  const out: Data = { name, kind: g.kind, bonus: bonuses.length ? fmtSkillBonus(bonuses) : g.legacyBonus, cost: g.kind === "power" || g.kind === "magic" ? "" : costOut(g.cost), desc: g.desc.trim(), skillBonus: bonuses };
  if (g.kind === "armor") { out.rating = g.rating; out.penalty = g.penalty; }
  if (g.kind === "power" || g.kind === "magic") {
    out.effect = g.effect.trim();
    const res = cleanResist(g.resist);
    if (res.length) { out.resist = res; if (g.resistFrom.trim()) out.resistFrom = g.resistFrom.trim(); }
  }
  if (g.kind === "magic") { out.risk = g.risk.trim(); if (g.consumable) out.consumable = true; }
  return out;
}

const KIND_OPTS: [GearKind, string][] = [["gear", "Gear"], ["armor", "Armor"], ["power", "Item of Power"], ["magic", "Magic Item"]];
const KIND_HELP: Record<GearKind, string> = {
  gear: "Tools, books, animals and kit — most gear adds dice to one or two skills when it helps.",
  armor: "Listed in the sheet's Item Shop under Armor; equip it and its Protection dice are rolled when you're hit.",
  power: "A charm or holy thing that wards off vaesen magic. Found, not bought.",
  magic: "A vaesen-made thing with real power — and a risk each time it's used. Found, not bought.",
};

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const mystic = g.kind === "power" || g.kind === "magic";
  return (
    <>
      <Cell label="Kind" className="sm:col-span-2" help={KIND_HELP[g.kind]}>
        <ChipPicker single options={KIND_OPTS} value={[g.kind]} onChange={(v) => v[0] && set({ kind: v[0] as GearKind })} />
      </Cell>
      {g.kind === "armor" ? (
        <>
          <Cell label="Protection" help="Dice rolled when you're hit; each 6 removes one point of damage (book: light 2, medium 4, heavy 6).">
            <Stepper value={g.rating} min={1} max={10} ariaLabel="protection" onChange={(n) => set({ rating: n ?? 1 })} />
          </Cell>
          <Cell label="Agility penalty" help="Armor makes you clumsy: light −1, medium −2, heavy −3. The sheet takes it off Agility while worn.">
            <Stepper value={g.penalty} min={0} max={3} ariaLabel="agility penalty" onChange={(n) => set({ penalty: n ?? 0 })} />
          </Cell>
        </>
      ) : null}
      {mystic ? (
        <Cell label="Effect" className="sm:col-span-2">
          <input className={fieldCls} value={g.effect} maxLength={300} placeholder={g.kind === "power" ? "Can kill certain vaesen." : "Breathe underwater."} onChange={(e) => set({ effect: e.target.value })} />
        </Cell>
      ) : null}
      {g.kind !== "armor" ? (
        <Cell label="Skill bonus" className="sm:col-span-2" help={<>On the sheet, tick the item as in use and its dice join that skill&rsquo;s rolls (only one item&rsquo;s bonus counts per roll).{g.legacyBonus ? <> Old text &ldquo;{g.legacyBonus}&rdquo; is kept until you add a bonus — <button type="button" className={smallBtn} onClick={() => set({ legacyBonus: "" })}>clear</button></> : null}</>}>
          <BonusBadges value={toBadges(g.bonuses)} onChange={(b) => set({ bonuses: fromBadges(b) })} kinds={BONUS_KINDS} addLabel="+ Skill bonus" empty="No skill bonus" max={4} />
        </Cell>
      ) : null}
      {mystic ? (
        <>
          <Cell label="Resist magic" className="sm:col-span-2">
            <BonusBadges value={resToBadges(g.resist)} onChange={(b) => set({ resist: resFromBadges(b) })} kinds={RESIST_KINDS} addLabel="+ Resistance" empty="No resistance" max={4} />
          </Cell>
          {g.resist.length ? (
            <Cell label="Only against" help="Leave blank if it works on every vaesen.">
              <input className={fieldCls} value={g.resistFrom} maxLength={40} placeholder="trolls, mares, fairies…" onChange={(e) => set({ resistFrom: e.target.value })} />
            </Cell>
          ) : null}
        </>
      ) : null}
      {g.kind === "magic" ? (
        <>
          <Cell label="Risk" className="sm:col-span-2" help="What can go wrong each time it's used (book: a Condition per hour, a vaesen takes notice…).">
            <input className={fieldCls} value={g.risk} maxLength={300} placeholder="A vaesen visits the PC's dreams." onChange={(e) => set({ risk: e.target.value })} />
          </Cell>
          <Cell label="Use" help={g.consumable ? "Used up: the sheet's Action tab offers it once, rolls its bonus and logs the risk." : "Lasts: use it again and again."}>
            <ChipPicker single options={[["keep", "Lasting"], ["once", "Used up (eaten, drunk, burnt)"]]} value={[g.consumable ? "once" : "keep"]} onChange={(v) => v[0] && set({ consumable: v[0] === "once" })} />
          </Cell>
        </>
      ) : null}
      {!mystic ? <CostField c={g.cost} set={(cost) => set({ cost })} /> : null}
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={g.desc} maxLength={2000}
          placeholder={g.kind === "armor" ? "A boiled-leather cuirass, scarred by a troll's claws." : mystic ? "Where it came from and what it looks like." : "What it is and when it helps."}
          onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const kindLabel = KIND_OPTS.find(([k]) => k === g.kind)?.[1] ?? "Gear";
  const mystic = g.kind === "power" || g.kind === "magic";
  const res = fmtResist(g.resist, g.resistFrom);
  return (
    <Preview title={name || `Unnamed ${kindLabel}`} subtitle={kindLabel + (g.kind === "magic" && g.consumable ? " · used up" : "")}>
      <div className={statRow}>
        {g.kind === "armor" ? <><Stat k="Protection" v={g.rating} /><Stat k="Agility" v={g.penalty ? `−${g.penalty}` : "—"} /></> : null}
        {!mystic ? <Stat k="Cost" v={costOut(g.cost) || "—"} /> : null}
      </div>
      {g.effect.trim() && mystic ? <p className="mt-2 text-[13px]"><span className={statK}>Effect</span> {g.effect.trim()}</p> : null}
      {g.kind !== "armor" && g.bonuses.length ? <div className="mt-2"><BadgeStrip value={toBadges(g.bonuses)} kinds={BONUS_KINDS} /></div> : null}
      {g.kind !== "armor" && !g.bonuses.length && g.legacyBonus ? <p className="mt-2 text-[12px]"><span className={statK}>Bonus</span> {g.legacyBonus}</p> : null}
      {mystic && res ? <p className="mt-2 text-[13px]"><span className={statK}>Wards</span> {res}</p> : null}
      {g.kind === "magic" && g.risk.trim() ? <p className="mt-2 text-[13px]"><span className={statK}>Risk</span> {g.risk.trim()}</p> : null}
      {g.desc.trim() ? <p className="mt-2 text-[13px] text-[var(--muted)]">{g.desc.trim()}</p> : null}
      {g.kind === "armor" ? <p className={hint}>When hit: roll {g.rating} dice, each 6 removes one point of damage. Agility rolls get −{g.penalty} while it&rsquo;s worn.</p> : null}
      {g.kind !== "armor" && g.bonuses.length ? <p className={hint}>In use: +{Math.max(...g.bonuses.map((b) => b.amount))} dice on {g.bonuses.map((b) => b.skill).join(" or ")} rolls.</p> : null}
    </Preview>
  );
}
