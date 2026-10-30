"use client";
// ── The Lord of the Rings 5E homebrew weapon + gear builders ────────────────
// Weapon: Simple/Martial × Melee/Ranged, damage dice + type, property chips
// (Thrown / Ammunition ranges, Versatile die), the Rewards the LotR sheet
// automates on the row (Keen / Fell / Grievous), LotR coinage (GP / SP / CP),
// weight in pounds (½ allowed) and LootBonus "lotr" badges (+N Magic, AC,
// attack, damage, saves, stats, resistances, speed, notes) — the same badges the
// GM Screen loot builder uses, so equipping it on the sheet applies them.
// Gear: category, cost, weight, description and the same bonus badges.
// Storage (types "lotr-weapon" / "lotr-gear", the LotrWeapon / LotrGear shapes
// /lotr/equipment, the LotR sheet's shop and the GM Screen read):
//   weapon: category kind damage damageType cost weight properties description
//           + rewards (string[]) + benefits (LootBonus "lotr")
//   gear:   category cost weight description + benefits
// Structured values are composed into the legacy strings ("1d8", "15 SP",
// "3 lb", "Versatile (1d10)") and parsed back on open; normalizeLotrWeapon /
// normalizeLotrGear sanitise benefits with cleanLotrBenefits.
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import LootBonusBadges, { useLootBonus } from "../LootBonusBadges";
import { BadgeStrip, type Badge } from "../BonusBadges";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { formatDice, parseDice, type Dice } from "../dice";
import {
  COIN_UNITS, GEAR_CATEGORIES, WEAPON_DAMAGE, WEAPON_PROPS, WEAPON_REWARDS,
  composeCost, composeWeaponProps, composeWeight, parseCost, parseWeaponProps, parseWeight, type Cost, type Weight, type WeaponProps,
} from "./rules";
import { Cell, Select, Toggle, fieldCls, hint } from "./ui";

type Data = Record<string, unknown>;
export const LB_SRC = "/tools-data/dnd-loot-bonus.js"; // registers "lotr" beside "dnd"
const benefitsOf = (d: Data): Badge[] => (Array.isArray(d.benefits) ? (d.benefits as Badge[]).filter((b) => b && typeof b.kind === "string") : []);
const strs = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);

function CostCell({ value, onChange }: { value: Cost; onChange: (c: Cost) => void }) {
  return (
    <Cell label="Cost" help="0 = no price (“—”).">
      <span className="flex items-center gap-2">
        <Stepper value={value.n} min={0} max={100000} width="3.6em" ariaLabel="cost" onChange={(v) => onChange({ ...value, n: v ?? 0 })} />
        <Select value={value.unit} options={COIN_UNITS.map((u) => [u, u === "GP" ? "GP (gold)" : u === "SP" ? "SP (silver pennies)" : "CP (copper)"] as [string, string])} ariaLabel="coin" onChange={(u) => onChange({ ...value, unit: u })} />
      </span>
    </Cell>
  );
}
function WeightCell({ value, onChange }: { value: Weight; onChange: (w: Weight) => void }) {
  return (
    <Cell label="Weight (lb)" help={value.note ? `Kept: “${value.note}”` : undefined}>
      <span className="flex items-center gap-3">
        <Stepper value={value.lb} min={0} max={500} width="3em" ariaLabel="weight" onChange={(v) => onChange({ ...value, lb: v ?? 0 })} />
        <Toggle checked={value.half} onChange={(v) => onChange({ ...value, half: v })}>+ ½</Toggle>
        <span className="text-[12px] text-[var(--muted)]">{composeWeight(value)}</span>
      </span>
    </Cell>
  );
}
function RangePair({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [n, l] = value.split("/").map((x) => parseInt(x, 10) || 0);
  return (
    <Cell label={`${label} (ft.)`}>
      <span className="flex items-center gap-1">
        <Stepper value={n} min={5} max={600} step={5} width="2.6em" ariaLabel="normal range" onChange={(v) => onChange(`${v ?? 20}/${l}`)} />
        <span className="text-[var(--muted)]">/</span>
        <Stepper value={l} min={5} max={2400} step={5} width="2.8em" ariaLabel="long range" onChange={(v) => onChange(`${n}/${v ?? 60}`)} />
      </span>
    </Cell>
  );
}

// ═══ Weapon ══════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  category: string; kind: string; dmg: Dice; dtype: string; wp: WeaponProps;
  cost: Cost; weight: Weight; rewards: string[]; benefits: Badge[]; description: string;
};
export const blankWeapon = (): WeaponDraft => ({
  category: "Martial", kind: "Melee", dmg: { n: 1, d: 8, m: 0 }, dtype: "slashing", wp: parseWeaponProps([]),
  cost: { n: 15, unit: "SP" }, weight: { lb: 3, half: false, note: "" }, rewards: [], benefits: [], description: "",
});
export function weaponFromData(d: Data): WeaponDraft {
  const dmg = parseDice(String(d.damage ?? "")) ?? { n: 1, d: 4, m: 0 };
  return {
    category: d.category === "Simple" ? "Simple" : "Martial", kind: d.kind === "Ranged" ? "Ranged" : "Melee",
    dmg, dtype: String(d.damageType ?? "slashing"), wp: parseWeaponProps(strs(d.properties)),
    cost: parseCost(String(d.cost ?? "")), weight: parseWeight(String(d.weight ?? "")),
    rewards: strs(d.rewards).filter((r) => WEAPON_REWARDS.some(([k]) => k === r)), benefits: benefitsOf(d), description: String(d.description ?? ""),
  };
}
export const weaponPayload = (name: string, w: WeaponDraft): Data => ({
  name, category: w.category, kind: w.kind, damage: formatDice(w.dmg) || "1d4", damageType: w.dtype,
  cost: composeCost(w.cost), weight: composeWeight(w.weight), properties: composeWeaponProps(w.wp),
  description: w.description.trim(), rewards: w.rewards, benefits: w.benefits,
});

export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (w: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  return (
    <>
      <Cell label="Category"><ChipPicker single options={["Simple", "Martial"]} value={[w.category]} onChange={(v) => v[0] && set({ category: v[0] })} /></Cell>
      <Cell label="Melee / Ranged"><ChipPicker single options={["Melee", "Ranged"]} value={[w.kind]} onChange={(v) => v[0] && set({ kind: v[0] })} /></Cell>
      <Cell label="Damage">
        <span className="flex flex-wrap items-center gap-2">
          <DiceInput value={w.dmg} mod={false} minCount={1} maxCount={4} dice={[4, 6, 8, 10, 12]} ariaLabel="damage" onChange={(v) => set({ dmg: v })} />
          <Select value={w.dtype} options={WEAPON_DAMAGE} ariaLabel="damage type" onChange={(v) => set({ dtype: v })} />
        </span>
      </Cell>
      <CostCell value={w.cost} onChange={(cost) => set({ cost })} />
      <Cell label="Properties" className="sm:col-span-2">
        <ChipPicker options={WEAPON_PROPS} value={[...w.wp.props, ...w.wp.extra]} custom customPh="Other property…"
          onChange={(v) => set({ wp: { ...w.wp, props: WEAPON_PROPS.filter((p) => v.includes(p)), extra: v.filter((x) => !WEAPON_PROPS.includes(x)) } })} />
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {w.wp.props.includes("Thrown") ? <RangePair label="Thrown range" value={w.wp.thrown} onChange={(v) => set({ wp: { ...w.wp, thrown: v } })} /> : null}
          {w.wp.props.includes("Ammunition") ? <RangePair label="Ammunition range" value={w.wp.ammo} onChange={(v) => set({ wp: { ...w.wp, ammo: v } })} /> : null}
          {w.wp.props.includes("Versatile") ? (
            <Cell label="Versatile (two hands)"><Select value={String(w.wp.versatile)} options={[6, 8, 10, 12].map((d) => [String(d), `1d${d}`] as [string, string])} onChange={(v) => set({ wp: { ...w.wp, versatile: parseInt(v, 10) } })} /></Cell>
          ) : null}
        </div>
      </Cell>
      <WeightCell value={w.weight} onChange={(weight) => set({ weight })} />
      <Cell label="Rewards (qualities)" help="Applied on the sheet's attack row when the weapon is added to an inventory.">
        <ChipPicker options={WEAPON_REWARDS} value={w.rewards} onChange={(v) => set({ rewards: WEAPON_REWARDS.map(([k]) => k).filter((k) => v.includes(k)) })} />
      </Cell>
      <Cell label="Enchanted bonuses" className="sm:col-span-2" help="A famous weapon's +N Magic (attack and damage), resistances, stat boosts… Applied on the LotR sheet while equipped; unequipping removes them. Same badges as the GM Screen loot builder.">
        <LootBonusBadges sys="lotr" cfgSrc={LB_SRC} value={w.benefits} onChange={(b) => set({ benefits: b })} empty="No bonuses — an ordinary weapon" />
      </Cell>
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={fieldCls} rows={3} value={w.description} maxLength={2000} placeholder="Its history, who forged it, its bane…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const L = useLootBonus("lotr", [], LB_SRC);
  const p = weaponPayload(name, w);
  return (
    <Preview title={name || "Unnamed weapon"} subtitle={`${w.category} ${w.kind} Weapon`}>
      <p className="text-[13px]"><b>{String(p.damage)}</b> {w.dtype}</p>
      {(p.properties as string[]).length ? <p className="text-[13px]">{(p.properties as string[]).join(", ")}</p> : null}
      <p className="text-[13px] text-[var(--muted)]">{String(p.cost)} · {String(p.weight)}</p>
      {w.rewards.length ? <p className="text-[13px]">Rewards: <b>{w.rewards.join(", ")}</b></p> : null}
      <div className="my-2"><BadgeStrip value={w.benefits} kinds={L.kinds} stats={L.stats} empty="No automated bonuses" /></div>
      {w.description.trim() ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{w.description.trim()}</p> : null}
    </Preview>
  );
}

// ═══ Gear ════════════════════════════════════════════════════════════════════
export type GearDraft = { category: string; cost: Cost; weight: Weight; benefits: Badge[]; description: string };
export const blankGear = (): GearDraft => ({ category: "Adventuring Gear", cost: { n: 1, unit: "SP" }, weight: { lb: 1, half: false, note: "" }, benefits: [], description: "" });
export const gearFromData = (d: Data): GearDraft => ({
  category: GEAR_CATEGORIES.includes(String(d.category)) ? String(d.category) : "Adventuring Gear",
  cost: parseCost(String(d.cost ?? "")), weight: parseWeight(String(d.weight ?? "")), benefits: benefitsOf(d), description: String(d.description ?? ""),
});
export const gearPayload = (name: string, g: GearDraft): Data => ({
  name, category: g.category, cost: composeCost(g.cost), weight: composeWeight(g.weight), description: g.description.trim(), benefits: g.benefits,
});

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (g: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  return (
    <>
      <Cell label="Category" className="sm:col-span-2"><ChipPicker single options={GEAR_CATEGORIES} value={[g.category]} onChange={(v) => v[0] && set({ category: v[0] })} /></Cell>
      <CostCell value={g.cost} onChange={(cost) => set({ cost })} />
      <WeightCell value={g.weight} onChange={(weight) => set({ weight })} />
      <Cell label="Bonuses (optional)" className="sm:col-span-2" help="An Elven cloak's +1 AC, a heirloom's +1 saves… The sheet lets a bonus item be equipped and applies these while it is.">
        <LootBonusBadges sys="lotr" cfgSrc={LB_SRC} value={g.benefits} onChange={(b) => set({ benefits: b })} empty="No bonuses — ordinary gear" />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={fieldCls} rows={3} value={g.description} maxLength={3000} placeholder="What it is and what it's for…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
      <p className={`${hint} sm:col-span-2`}>Shows in the LotR sheet’s shop under Gear, priced in LotR coin.</p>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const L = useLootBonus("lotr", [], LB_SRC);
  const p = gearPayload(name, g);
  return (
    <Preview title={name || "Unnamed gear"} subtitle={g.category}>
      <p className="text-[13px] text-[var(--muted)]">{String(p.cost)} · {String(p.weight)}</p>
      {g.benefits.length ? <div className="my-2"><BadgeStrip value={g.benefits} kinds={L.kinds} stats={L.stats} /></div> : null}
      {g.description.trim() ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{g.description.trim()}</p> : null}
    </Preview>
  );
}
