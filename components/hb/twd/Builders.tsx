"use client";
// ── THE WALKING DEAD homebrew Weapon + Gear/Armor builders ───────────────────
// Storage shapes are documented in ./rules.ts. Weapon: Close/Ranged chips (→
// the skill it rolls), gear-bonus and damage steppers (or Blast Power for
// explosives), a range category, encumbrance slots, ammo, noise and feature
// chips. Gear: Gear or Armor; armor has an Armor Level and a Mobility penalty;
// gear takes skill-bonus badges the sheet applies while the item is in use.
import type { ReactNode } from "react";
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  AMMO_TYPES, FEATURES, NOISES, RANGES, SKILL_ATTR, SLOTS, TWD_SKILLS,
  cleanSkillBonus, composeAmmo, composeDamage, fmtBonus, fmtPenalty, fmtSkillBonus,
  parseAmmo, parseBonus, parseDamage, parsePenalty, parseSkillBonus, skillForKind,
  type Ammo, type SkillBonus, type WeaponKind,
} from "./rules";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

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
function SlotsSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts: string[] = [...SLOTS];
  if (value && !opts.includes(value)) opts.push(value);
  const label = (s: string) => (s === "—" ? "— (tiny, free)" : s === "X" ? "X (can't be carried)" : s === "½" ? "½ (light)" : s);
  return (
    <select className={selCls} aria-label="slots" value={value} onChange={(e) => onChange(e.target.value)}>
      {opts.map((s) => <option key={s} value={s}>{label(s)}</option>)}
    </select>
  );
}

// ── Skill-bonus badges ───────────────────────────────────────────────────────
const SKILL_OPTS: [string, string][] = TWD_SKILLS.map((s) => [s, `${s} (${SKILL_ATTR[s]})`]);
const BONUS_KINDS: BadgeKind[] = [
  { k: "skill", label: "Skill bonus", color: "green", amount: true, amountPh: "+1", target: "choice", choices: SKILL_OPTS,
    format: (b) => `${b.target ?? "?"} ${(b.amount ?? 0) >= 0 ? "+" : "−"}${Math.abs(b.amount ?? 0)}`,
    tip: "Extra base dice on that skill (Scout +2). On the sheet, tick the item as in use; only one item's bonus counts on a roll." },
];
const toBadges = (b: SkillBonus[]): Badge[] => b.map((x) => ({ kind: "skill", target: x.skill, amount: x.amount }));
const fromBadges = (b: Badge[]): SkillBonus[] => cleanSkillBonus(b.map((x) => ({ skill: x.target, amount: x.amount })));

// ═══ WEAPON ══════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  kind: WeaponKind; bonus: number; bonusRaw: string | null;
  blast: boolean; damage: number; damageRaw: string | null;
  range: string; slots: string; ammo: Ammo; ammoRaw: string | null;
  noise: string; features: string[]; desc: string;
};
export const blankWeapon = (): WeaponDraft => ({
  kind: "Close", bonus: 1, bonusRaw: null, blast: false, damage: 1, damageRaw: null, range: "Short", slots: "1",
  ammo: { kind: "none", type: "Bullets", n: null }, ammoRaw: null, noise: "", features: [], desc: "",
});
export function weaponFromData(d: Data): WeaponDraft {
  const b = parseBonus(sv(d, "bonus"));
  const dm = parseDamage(d.damage ?? "1");
  const a = parseAmmo(sv(d, "ammo"));
  return {
    kind: d.kind === "Ranged" ? "Ranged" : "Close", bonus: b ?? 0, bonusRaw: b == null ? sv(d, "bonus") : null,
    blast: dm?.blast ?? false, damage: dm?.n ?? 1, damageRaw: dm ? null : sv(d, "damage"),
    range: sv(d, "range") || "Short", slots: sv(d, "slots") || "1",
    ammo: a ?? { kind: "none", type: "Bullets", n: null }, ammoRaw: a ? null : sv(d, "ammo"),
    noise: (NOISES as readonly string[]).includes(sv(d, "noise")) ? sv(d, "noise") : "",
    features: Array.isArray(d.features) ? d.features.map(String).filter(Boolean) : [], desc: sv(d, "desc"),
  };
}
const weaponDamage = (w: WeaponDraft) => w.damageRaw ?? composeDamage({ blast: w.blast, n: w.damage });
const weaponAmmo = (w: WeaponDraft) => w.ammoRaw ?? composeAmmo(w.ammo);
export function weaponPayload(name: string, w: WeaponDraft): Data {
  const out: Data = { name, kind: w.kind, bonus: w.bonusRaw ?? fmtBonus(w.bonus), damage: weaponDamage(w), range: w.range, slots: w.slots, desc: w.desc.trim() };
  const ammo = weaponAmmo(w);
  if (ammo) out.ammo = ammo;
  if (w.noise) out.noise = w.noise;
  if (w.features.length) out.features = w.features;
  return out;
}

export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  const ranges: string[] = [...RANGES];
  if (w.range && !ranges.includes(w.range)) ranges.push(w.range);
  return (
    <>
      <Cell label="Type" help={`Rolls ${skillForKind(w.kind)} (attribute + skill + bonus).`}>
        <ChipPicker single options={[["Close", "Close combat"], ["Ranged", "Ranged"]]} value={[w.kind]}
          onChange={(v) => { const kind = v[0] === "Ranged" ? "Ranged" : "Close"; set({ kind, ...(kind === "Close" ? { range: w.range === "Long" || w.range === "Extreme" ? "Short" : w.range } : {}) }); }} />
      </Cell>
      <Cell label="Bonus" help={w.bonusRaw ? `Was “${w.bonusRaw}” — kept until you change it.` : "Gear dice added to the attack (book: 0 to +3)."}>
        <Stepper value={w.bonus} signed min={-3} max={5} ariaLabel="bonus" onChange={(n) => set({ bonus: n ?? 0, bonusRaw: null })} />
      </Cell>
      <Cell label="Damage" help={w.damageRaw ? `Was “${w.damageRaw}” — kept until you change it.` : w.blast ? "Explosive: Blast Power dice hit everyone in the area." : "Base damage on a hit; each extra success adds +1."}>
        <div className="flex flex-wrap items-center gap-2">
          <select className={selCls} aria-label="damage kind" value={w.damageRaw != null ? "" : w.blast ? "bp" : "dmg"}
            onChange={(e) => { const blast = e.target.value === "bp"; set({ blast, damage: blast ? Math.max(6, w.damage) : Math.min(3, w.damage) || 1, damageRaw: null }); }}>
            {w.damageRaw != null ? <option value="">As written</option> : null}
            <option value="dmg">Damage</option>
            <option value="bp">Blast Power (explosive)</option>
          </select>
          {w.damageRaw == null ? (
            <Stepper value={w.damage} min={w.blast ? 1 : 0} max={w.blast ? 20 : 10} ariaLabel={w.blast ? "blast power" : "damage"} onChange={(n) => set({ damage: n ?? 0 })} />
          ) : null}
        </div>
      </Cell>
      <Cell label="Range" help="Close = in reach · Short = a few steps · Long = across the street · Extreme = sniper distance.">
        <select className={selCls} aria-label="range" value={w.range} onChange={(e) => set({ range: e.target.value })}>
          {ranges.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Cell>
      <Cell label="Slots" help="Encumbrance: you carry Strength + 2 slots.">
        <SlotsSelect value={w.slots} onChange={(slots) => set({ slots })} />
      </Cell>
      <Cell label="Noise" help="Loud weapons draw walkers — the GM may raise the Threat Level.">
        <ChipPicker single options={[...NOISES]} value={w.noise ? [w.noise] : []} onChange={(v) => set({ noise: v[0] ?? "" })} />
      </Cell>
      <Cell label="Ammo" className="sm:col-span-2" help={w.ammoRaw ? `Was “${w.ammoRaw}” — kept until you change it.` : "What it fires (and how many in a full load, if you track it). Messing up can mean you run dry."}>
        <div className="flex flex-wrap items-center gap-2">
          <select className={selCls} aria-label="ammo kind" value={w.ammoRaw != null ? "" : w.ammo.kind} onChange={(e) => set({ ammo: { ...w.ammo, kind: e.target.value as Ammo["kind"] }, ammoRaw: null })}>
            {w.ammoRaw != null ? <option value="">As written</option> : null}
            <option value="none">None</option>
            <option value="ammo">Uses ammo</option>
            <option value="single">Single use</option>
          </select>
          {w.ammoRaw == null && w.ammo.kind === "ammo" ? (
            <>
              <select className={selCls} aria-label="ammo type" value={w.ammo.type} onChange={(e) => set({ ammo: { ...w.ammo, type: e.target.value } })}>
                {[...AMMO_TYPES, ...((AMMO_TYPES as readonly string[]).includes(w.ammo.type) ? [] : [w.ammo.type])].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="text-[12px] text-[var(--muted)]">load</span>
              <Stepper value={w.ammo.n} nullable min={1} max={99} ariaLabel="load" onChange={(n) => set({ ammo: { ...w.ammo, n } })} />
            </>
          ) : null}
        </div>
      </Cell>
      <Cell label="Features" className="sm:col-span-2">
        <ChipPicker custom customPh="Other feature…" options={[...FEATURES]} value={w.features} onChange={(features) => set({ features })} />
      </Cell>
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={w.desc} maxLength={1000} placeholder="Where it comes from, how it looks, any rule the pickers don't cover." onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const dmg = weaponDamage(w), ammo = weaponAmmo(w), bonus = w.bonusRaw ?? fmtBonus(w.bonus);
  const tags = [w.noise, ...w.features].filter(Boolean).join(", ");
  return (
    <Preview title={name || "Unnamed Weapon"} subtitle={`${w.kind === "Ranged" ? "Ranged weapon" : "Close combat weapon"} · ${skillForKind(w.kind)}`}>
      <div className={statRow}>
        <Stat k="Bonus" v={bonus} />
        <Stat k="Damage" v={dmg} />
        <Stat k="Range" v={w.range} />
        <Stat k="Slots" v={w.slots} />
        {ammo ? <Stat k="Ammo" v={ammo} /> : null}
      </div>
      {tags ? <p className="mt-2 text-[13px]"><span className={statK}>Features</span> {tags}</p> : null}
      {w.desc.trim() ? <p className="mt-2 text-[13px] text-[var(--muted)]">{w.desc.trim()}</p> : null}
      <p className={hint}>
        Attack: attribute + {skillForKind(w.kind)}{w.bonus ? ` ${fmtBonus(w.bonus)}` : ""} dice ·{" "}
        {w.blast && w.damageRaw == null ? `Blast Power ${w.damage}: roll ${w.damage} dice against everyone caught in the blast.` : `a hit deals ${dmg} +1 per extra success.`}
        {w.noise === "Loud" ? " Loud: the Threat Level may rise." : ""}
      </p>
    </Preview>
  );
}

// ═══ GEAR / ARMOR ════════════════════════════════════════════════════════════
export type GearDraft = {
  kind: "gear" | "armor"; slots: string; bonuses: SkillBonus[]; bonusRaw: string | null;
  desc: string; level: number; penalty: number;
};
export const blankGear = (): GearDraft => ({ kind: "gear", slots: "1", bonuses: [], bonusRaw: null, desc: "", level: 4, penalty: 1 });
export function gearFromData(d: Data): GearDraft {
  const structured = Array.isArray(d.skillBonus) ? cleanSkillBonus(d.skillBonus) : null;
  const parsed = structured && structured.length ? structured : parseSkillBonus(sv(d, "bonus"));
  const level = Number(d.level);
  return {
    kind: d.kind === "armor" ? "armor" : "gear", slots: sv(d, "slots") || "1",
    bonuses: parsed ?? [], bonusRaw: parsed ? null : sv(d, "bonus"), desc: sv(d, "desc"),
    level: Number.isFinite(level) && level > 0 ? Math.min(12, Math.round(level)) : 4, penalty: d.kind === "armor" ? parsePenalty(d.penalty) : 1,
  };
}
const gearBonusText = (g: GearDraft) => (g.bonuses.length ? fmtSkillBonus(g.bonuses) : g.bonusRaw ?? "");
export function gearPayload(name: string, g: GearDraft): Data {
  const armor = g.kind === "armor"; // TWD armor grants no skill bonus
  const out: Data = { name, kind: g.kind, slots: g.slots, bonus: armor ? "" : gearBonusText(g), skillBonus: armor ? [] : cleanSkillBonus(g.bonuses), desc: g.desc.trim() };
  if (armor) { out.level = g.level; out.penalty = fmtPenalty(g.penalty); }
  return out;
}

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const armor = g.kind === "armor";
  return (
    <>
      <Cell label="Kind" help={armor ? "Listed on the sheet's Armor tab; equip it and its Armor Level dice are rolled when you're hit." : "Tools, medical gear, animals, comforts… most gear helps one skill."}>
        <ChipPicker single options={[["gear", "Gear"], ["armor", "Armor"]]} value={[g.kind]} onChange={(v) => v[0] && set({ kind: v[0] === "armor" ? "armor" : "gear" })} />
      </Cell>
      <Cell label="Slots" help="Encumbrance: you carry Strength + 2 slots.">
        <SlotsSelect value={g.slots} onChange={(slots) => set({ slots })} />
      </Cell>
      {armor ? (
        <>
          <Cell label="Armor Level" help="Dice rolled when you're hit; each success stops one damage (book: 4, 6, 8).">
            <Stepper value={g.level} min={1} max={12} ariaLabel="armor level" onChange={(n) => set({ level: n ?? 1 })} />
          </Cell>
          <Cell label="Mobility penalty" help="Subtracted from Mobility rolls while worn (book: −1 to −3).">
            <Stepper value={-g.penalty} signed min={-5} max={0} ariaLabel="mobility penalty" onChange={(n) => set({ penalty: Math.abs(n ?? 0) })} />
          </Cell>
        </>
      ) : null}
      {armor ? null : <Cell label="Skill bonus" className="sm:col-span-2"
        help={g.bonusRaw ? <>Was “{g.bonusRaw}” — kept as written until you add a bonus. <button type="button" className={smallBtn} onClick={() => set({ bonusRaw: null })}>Clear</button></> : "On the sheet, tick the item as in use and its dice join that skill's rolls (only one item's bonus counts per roll)."}>
        <BonusBadges value={toBadges(g.bonuses)} onChange={(b) => set({ bonuses: fromBadges(b), bonusRaw: null })} kinds={BONUS_KINDS} addLabel="+ Skill bonus" empty="No skill bonus" max={4} />
      </Cell>}
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={g.desc} maxLength={2000}
          placeholder={armor ? "Riot gear scavenged from a police station." : "What it is and when it helps."} onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const armor = g.kind === "armor";
  const bonus = gearBonusText(g);
  return (
    <Preview title={name || (armor ? "Unnamed Armor" : "Unnamed Gear")} subtitle={armor ? "Armor" : "Gear"}>
      <div className={statRow}>
        {armor ? <><Stat k="Armor Level" v={g.level} /><Stat k="Mobility" v={fmtPenalty(g.penalty)} /></> : null}
        <Stat k="Slots" v={g.slots} />
        {!armor && !g.bonuses.length ? <Stat k="Bonus" v={bonus || "—"} /> : null}
      </div>
      {!armor && g.bonuses.length ? <div className="mt-2"><BadgeStrip value={toBadges(g.bonuses)} kinds={BONUS_KINDS} /></div> : null}
      {g.desc.trim() ? <p className="mt-2 text-[13px]">{g.desc.trim()}</p> : null}
      {armor ? <p className={hint}>When hit: roll {g.level} dice, each success stops one damage.{g.penalty ? ` Mobility rolls ${fmtPenalty(g.penalty)} while worn.` : ""}</p> : null}
    </Preview>
  );
}
