"use client";
// ── ALIEN RPG homebrew Weapon + Gear/Armor builders ──────────────────────────
// Storage shapes are documented in ./rules.ts. Weapon: every book field is
// picked (class chips → skill, gear-bonus / damage steppers, a range span,
// ammo / power supply, feature chips, $ cost, weight) and composed into the
// strings the sheet and /yze/gear read. Gear: Gear or Armor; armor adds an
// Armor Rating and Air Supply; both take skill-bonus badges (skill + amount)
// that the sheet applies while the item is in use.
import type { ReactNode } from "react";
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  ALIEN_SKILLS, FEATURES, GEAR_CATEGORIES, LEGACY_SKILL, RANGE_BANDS, SKILL_ATTR, WEAPON_CLASSES, WEAPON_SKILLS, WEIGHTS,
  bandName, cleanSkillBonus, composeAmmo, composeGearDesc, composeRange, composeSpecial, fmtAir, fmtBonus, fmtCost, fmtSupply,
  parseAir, parseAmmo, parseBonus, parseCost, parseGearDesc, parseRange, parseSpecial, parseSupply, skillForClass,
  type Ammo, type AmmoKind, type CloseWord, type SkillBonus,
} from "./rules";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const hint = "mt-1 text-[11px] text-[var(--muted)]";
const statRow = "flex flex-wrap gap-x-4 gap-y-1 text-[12px]";
const statK = "text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]";

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

function WeightSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts: string[] = [...WEIGHTS];
  if (value && !opts.includes(value)) opts.push(value);
  return (
    <select className={selCls} aria-label="weight" value={value} onChange={(e) => onChange(e.target.value)}>
      {opts.map((w) => <option key={w} value={w}>{w === "—" ? "— (no weight)" : w}</option>)}
    </select>
  );
}

function CostCell({ value, raw, onChange, help }: { value: number | null; raw: string; onChange: (n: number | null) => void; help: string }) {
  return (
    <Cell label="Cost ($)" help={raw && value == null ? `Was “${raw}” — kept until you set a price.` : help}>
      <Stepper value={value} nullable min={0} max={99999999} step={10} width="6.5em" ariaLabel="cost" onChange={onChange} />
    </Cell>
  );
}

// ── Skill-bonus badges ───────────────────────────────────────────────────────
const SKILL_OPTS: [string, string][] = ALIEN_SKILLS.map((s) => [s, `${s} (${SKILL_ATTR[s]})`]);
const BONUS_KINDS: BadgeKind[] = [
  { k: "skill", label: "Skill bonus", color: "green", amount: true, amountPh: "+1", target: "choice", choices: SKILL_OPTS,
    format: (b) => `${b.target ?? "?"} ${(b.amount ?? 0) >= 0 ? "+" : "−"}${Math.abs(b.amount ?? 0)}`,
    tip: "Extra base dice on that skill (Comtech +2), or a penalty (Mobility −1). The sheet adds them while the item is in use." },
];
const toBadges = (b: SkillBonus[]): Badge[] => b.map((x) => ({ kind: "skill", target: x.skill, amount: x.amount }));
const fromBadges = (b: Badge[]): SkillBonus[] => cleanSkillBonus(b.map((x) => ({ skill: x.target, amount: x.amount })));

// ═══ WEAPON ══════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  cls: string; skill: string; bonus: number; bonusRaw: string | null; damage: number;
  rMin: number; rMax: number; word: CloseWord; rangeRaw: string | null;
  ammo: Ammo; ammoRaw: string | null;
  features: string[]; note: string; specialRaw: string | null;
  cost: number | null; costRaw: string; weight: string; grip: string; desc: string;
};
export const blankWeapon = (): WeaponDraft => ({
  cls: "Pistol", skill: "Ranged Combat", bonus: 1, bonusRaw: null, damage: 2, rMin: 1, rMax: 2, word: "Engaged", rangeRaw: null,
  ammo: { kind: "ammo", n: 2 }, ammoRaw: null, features: [], note: "", specialRaw: null, cost: null, costRaw: "", weight: "1", grip: "", desc: "",
});
export function weaponFromData(d: Data): WeaponDraft {
  const cls = sv(d, "class");
  const rawSkill = sv(d, "skill");
  const skill = (WEAPON_SKILLS as readonly string[]).includes(rawSkill) ? rawSkill : LEGACY_SKILL[rawSkill] ?? (cls ? skillForClass(cls) : "Close Combat");
  const b = parseBonus(sv(d, "bonus"));
  const r = parseRange(sv(d, "range") || "Engaged");
  const a = parseAmmo(sv(d, "ammo"));
  const sp = parseSpecial(sv(d, "special"));
  const cost = parseCost(sv(d, "cost"));
  const dmg = Number(d.damage);
  return {
    cls, skill, bonus: b ?? 0, bonusRaw: b == null ? sv(d, "bonus") : null,
    damage: Number.isFinite(dmg) ? Math.max(0, Math.min(10, Math.round(dmg))) : 1,
    rMin: r?.min ?? 0, rMax: r?.max ?? 0, word: r?.word ?? "Engaged", rangeRaw: r ? null : sv(d, "range"),
    ammo: a ?? { kind: "none", n: 1 }, ammoRaw: a ? null : sv(d, "ammo"),
    features: sp?.features ?? [], note: sp?.note ?? "", specialRaw: sp ? null : sv(d, "special"),
    cost, costRaw: cost == null ? sv(d, "cost") : "", weight: sv(d, "weight") || "1", grip: sv(d, "grip"), desc: sv(d, "desc"),
  };
}
export const weaponFields = (w: WeaponDraft) => ({
  bonus: w.bonusRaw ?? fmtBonus(w.bonus),
  range: w.rangeRaw ?? composeRange({ min: w.rMin, max: w.rMax, word: w.word }),
  ammo: w.ammoRaw ?? composeAmmo(w.ammo),
  special: w.specialRaw ?? composeSpecial(w.features, w.note),
  cost: w.cost != null ? fmtCost(w.cost) : w.costRaw,
});
export function weaponPayload(name: string, w: WeaponDraft): Data {
  const f = weaponFields(w);
  const out: Data = { name, class: w.cls.trim(), skill: w.skill, damage: w.damage, weight: w.weight, desc: w.desc.trim(), ...f };
  if (w.grip) out.grip = w.grip; // legacy field — not an Alien rule, carried unchanged
  return out;
}

const AMMO_OPTS: [AmmoKind, string][] = [["none", "None (—)"], ["ammo", "Ammo rating"], ["power", "Power supply"], ["single-shot", "Single-shot"], ["single-use", "Single use"]];

export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  const band = (i: number) => bandName(i, w.word);
  return (
    <>
      <Cell label="Weapon class" help="Close Combat weapons roll Close Combat; pistols, rifles and heavy weapons roll Ranged Combat.">
        <ChipPicker single custom customPh="Other class…" options={[...WEAPON_CLASSES]} value={w.cls ? [w.cls] : []}
          onChange={(v) => { const cls = v[0] ?? ""; set({ cls, skill: cls ? skillForClass(cls) : w.skill, ...(cls === "Close Combat" ? { rMin: 0, rMax: 0 } : {}) }); }} />
      </Cell>
      <Cell label="Skill" help="The skill the attack rolls (attribute + skill + gear bonus).">
        <ChipPicker single options={[...WEAPON_SKILLS]} value={[w.skill]} onChange={(v) => v[0] && set({ skill: v[0] })} />
      </Cell>
      <Cell label="Gear bonus" help={w.bonusRaw ? `Was “${w.bonusRaw}” — kept until you change it.` : "Extra base dice when you attack with it (book: −1 to +3)."}>
        <Stepper value={w.bonus} signed min={-3} max={5} ariaLabel="gear bonus" onChange={(n) => set({ bonus: n ?? 0, bonusRaw: null })} />
      </Cell>
      <Cell label="Damage" help="Base damage; each extra success adds +1.">
        <Stepper value={w.damage} min={0} max={10} ariaLabel="damage" onChange={(n) => set({ damage: n ?? 0 })} />
      </Cell>
      <Cell label="Range" className="sm:col-span-2" help={w.rangeRaw ? `Was “${w.rangeRaw}” — pick bands to replace it.` : "From the closest band it can attack at to the farthest."}>
        <div className="flex flex-wrap items-center gap-2">
          <select className={selCls} aria-label="range from" value={w.rMin} onChange={(e) => { const n = Number(e.target.value); set({ rMin: n, rMax: Math.max(n, w.rMax), rangeRaw: null }); }}>
            {RANGE_BANDS.map((_, i) => <option key={i} value={i}>{band(i)}</option>)}
          </select>
          <span className="text-[12px] text-[var(--muted)]">to</span>
          <select className={selCls} aria-label="range to" value={w.rMax} onChange={(e) => { const n = Number(e.target.value); set({ rMax: n, rMin: Math.min(n, w.rMin), rangeRaw: null }); }}>
            {RANGE_BANDS.map((_, i) => <option key={i} value={i} disabled={i < w.rMin}>{band(i)}</option>)}
          </select>
          <label className="flex items-center gap-1.5 text-[12px] text-[var(--muted)]">
            <input type="checkbox" checked={w.word === "Adjacent"} onChange={(e) => set({ word: e.target.checked ? "Adjacent" : "Engaged", rangeRaw: null })} />
            Evolved Edition wording (“Adjacent”)
          </label>
        </div>
      </Cell>
      <Cell label="Ammo / supply" help={w.ammoRaw ? `Was “${w.ammoRaw}” — kept until you change it.` : "The supply rating the sheet rolls after each ranged attack (each 1 lowers it)."}>
        <div className="flex flex-wrap items-center gap-2">
          <select className={selCls} aria-label="ammo kind" value={w.ammoRaw ? "" : w.ammo.kind} onChange={(e) => set({ ammo: { kind: e.target.value as AmmoKind, n: w.ammo.n || 2 }, ammoRaw: null })}>
            {w.ammoRaw ? <option value="">As written</option> : null}
            {AMMO_OPTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          {!w.ammoRaw && (w.ammo.kind === "ammo" || w.ammo.kind === "power") ? (
            <Stepper value={w.ammo.n} min={1} max={10} ariaLabel="supply rating" onChange={(n) => set({ ammo: { ...w.ammo, n: n ?? 1 } })} />
          ) : null}
        </div>
      </Cell>
      <Cell label="Weight">
        <WeightSelect value={w.weight} onChange={(weight) => set({ weight })} />
      </Cell>
      <Cell label="Special features" className="sm:col-span-2" help={w.specialRaw ? `Was “${w.specialRaw}” — kept until you pick features.` : "Armor piercing counts the target's Armor Rating one step lower."}>
        <ChipPicker custom customPh="Other feature…" options={[...FEATURES]} value={w.features} onChange={(features) => set({ features, specialRaw: null })} />
        <input className={`${fieldCls} mt-2`} value={w.note} maxLength={160} placeholder="Feature note (after a semicolon): can fire smoke grenades" onChange={(e) => set({ note: e.target.value, specialRaw: null })} />
      </Cell>
      <CostCell value={w.cost} raw={w.costRaw} help="The sheet's Item Store sells it for this. Blank = not for sale." onChange={(cost) => set({ cost })} />
      <span className="hidden sm:block" />
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={w.desc} maxLength={1000} placeholder="Where it comes from, how it looks, any rule the pickers don't cover." onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const f = weaponFields(w);
  return (
    <Preview title={name || "Unnamed Weapon"} subtitle={`${w.cls || "Weapon"} · ${w.skill}`}>
      <div className={statRow}>
        <Stat k="Bonus" v={f.bonus || "—"} />
        <Stat k="Damage" v={w.damage} />
        <Stat k="Range" v={f.range} />
        <Stat k="Ammo" v={f.ammo} />
        <Stat k="Wt" v={w.weight} />
        <Stat k="Cost" v={f.cost || "—"} />
      </div>
      {f.special ? <p className="mt-2 text-[13px]"><span className={statK}>Special</span> {f.special}</p> : null}
      {w.desc.trim() ? <p className="mt-2 text-[13px] text-[var(--muted)]">{w.desc.trim()}</p> : null}
      <p className={hint}>Attack: attribute + {w.skill}{w.bonus ? ` ${fmtBonus(w.bonus)}` : ""} dice · a hit deals {w.damage} +1 per extra success.</p>
    </Preview>
  );
}

// ═══ GEAR / ARMOR ════════════════════════════════════════════════════════════
export type GearDraft = {
  kind: "gear" | "armor"; category: string; weight: string; cost: number | null; costRaw: string;
  supply: number | null; bonuses: SkillBonus[]; text: string; rating: number; air: number | null;
};
export const blankGear = (): GearDraft => ({ kind: "gear", category: "", weight: "½", cost: null, costRaw: "", supply: null, bonuses: [], text: "", rating: 1, air: null });
export function gearFromData(d: Data): GearDraft {
  const parsed = d.text == null ? parseGearDesc(sv(d, "desc")) : { text: sv(d, "text"), bonuses: cleanSkillBonus(d.skillBonus) };
  const cost = parseCost(sv(d, "cost"));
  const rating = Number(d.rating);
  return {
    kind: d.kind === "armor" ? "armor" : "gear", category: sv(d, "category"), weight: sv(d, "weight") || "1",
    cost, costRaw: cost == null ? sv(d, "cost") : "", supply: parseSupply(d.supply), bonuses: parsed.bonuses, text: parsed.text,
    rating: Number.isFinite(rating) ? Math.max(0, Math.min(10, Math.round(rating))) : 1, air: parseAir(d.air),
  };
}
export function gearPayload(name: string, g: GearDraft): Data {
  const out: Data = {
    name, kind: g.kind, weight: g.weight, category: g.kind === "gear" ? g.category.trim() : "",
    cost: g.cost != null ? fmtCost(g.cost) : g.costRaw, supply: fmtSupply(g.supply), skillBonus: cleanSkillBonus(g.bonuses), text: g.text.trim(),
  };
  if (g.kind === "armor") { out.rating = g.rating; out.air = fmtAir(g.air); }
  return out;
}

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const armor = g.kind === "armor";
  return (
    <>
      <Cell label="Kind" help={armor ? "Armor goes in the sheet's Armor store and soaks damage while equipped." : "General gear: tools, devices, medical supplies, pharmaceuticals…"}>
        <ChipPicker single options={[["gear", "Gear"], ["armor", "Armor / suit"]]} value={[g.kind]} onChange={(v) => v[0] && set({ kind: v[0] === "armor" ? "armor" : "gear" })} />
      </Cell>
      {armor ? <span className="hidden sm:block" /> : (
        <Cell label="Category">
          <select className={selCls} aria-label="category" value={g.category} onChange={(e) => set({ category: e.target.value })}>
            <option value="">— None —</option>
            {GEAR_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            {g.category && !(GEAR_CATEGORIES as readonly string[]).includes(g.category) ? <option value={g.category}>{g.category}</option> : null}
          </select>
        </Cell>
      )}
      {armor ? (
        <>
          <Cell label="Armor Rating" help="Subtracted from each hit's damage (armor piercing counts it one step lower).">
            <Stepper value={g.rating} min={0} max={10} ariaLabel="armor rating" onChange={(n) => set({ rating: n ?? 0 })} />
          </Cell>
          <Cell label="Air Supply" help="Vacuum-rated suits only; rolled like any supply. Blank = —.">
            <Stepper value={g.air} nullable min={1} max={10} ariaLabel="air supply" onChange={(air) => set({ air })} />
          </Cell>
        </>
      ) : (
        <>
          <Cell label="Power supply" help="Battery-powered items (motion trackers, torches). Blank = none.">
            <Stepper value={g.supply} nullable min={1} max={10} ariaLabel="power supply" onChange={(supply) => set({ supply })} />
          </Cell>
          <span className="hidden sm:block" />
        </>
      )}
      <Cell label="Weight">
        <WeightSelect value={g.weight} onChange={(weight) => set({ weight })} />
      </Cell>
      <CostCell value={g.cost} raw={g.costRaw} help="Item Store price. Blank = not for sale." onChange={(cost) => set({ cost })} />
      <Cell label="Skill bonuses" className="sm:col-span-2" help="Written into the description as “(Comtech +2)”. On the sheet, tick the item as in use and the dice join that skill's rolls.">
        <BonusBadges value={toBadges(g.bonuses)} onChange={(b) => set({ bonuses: fromBadges(b) })} kinds={BONUS_KINDS} addLabel="+ Skill bonus" empty="No skill bonus" max={6} />
      </Cell>
      <Cell label={armor ? "Features" : "Effect"} className="sm:col-span-2" help="What it does, in a sentence — conditions, single use, range. The bonuses are added after it.">
        <textarea className={`${fieldCls} min-h-[60px]`} value={g.text} maxLength={1500}
          placeholder={armor ? "Vacuum protection, comm unit, head light." : "Troubleshoot computer systems."} onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const armor = g.kind === "armor";
  const desc = composeGearDesc(g.text, g.bonuses);
  const cost = g.cost != null ? fmtCost(g.cost) : g.costRaw;
  return (
    <Preview title={name || (armor ? "Unnamed Suit" : "Unnamed Gear")} subtitle={armor ? "Armor" : g.category || "Gear"}>
      <div className={statRow}>
        {armor ? <><Stat k="Armor" v={g.rating} /><Stat k="Air" v={fmtAir(g.air)} /></> : g.supply ? <Stat k="Supply" v={fmtSupply(g.supply)} /> : null}
        <Stat k="Wt" v={g.weight} />
        <Stat k="Cost" v={cost || "—"} />
      </div>
      {g.bonuses.length ? <div className="mt-2"><BadgeStrip value={toBadges(g.bonuses)} kinds={BONUS_KINDS} /></div> : null}
      <p className="mt-2 text-[13px]">{desc || <span className="text-[var(--muted)]">Add an effect or a skill bonus.</span>}</p>
    </Preview>
  );
}
