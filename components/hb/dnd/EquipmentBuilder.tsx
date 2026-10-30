"use client";
// ── D&D 2024 homebrew equipment builder (weapon | armor | gear | magic item) ──
// Storage (type "dnd-equipment"; `hbKind` routes it to DND_WEAPONS / DND_ARMOR /
// DND_GEAR / DND_MAGIC_ITEMS — the shapes the sheet's shop, equip logic and the
// equipment page read):
//   weapon: category kind cost damage damageType weight properties[] mastery
//   armor:  category baseAC strength stealthDisadvantage cost weight
//   gear:   category cost weight description
//   magic:  type ("Weapon (Longsword)" / "Armor (Plate)" / "Shield" / "Ring"…)
//           rarity attunement attunementNote description, baseWeapon, plus
//           benefits  — LootBonus badges (sys "dnd": the GM Screen loot kinds);
//                       the sheet copies them onto the inventory row (bv:2) so
//                       equip applies them, unequip reverses.
//           bonuses   — legacy {target, amount}: HP max / Initiative / Spell
//                       attack / Spell DC (no LootBonus kind) + a mirror of the
//                       benefits for inventory rows saved before benefits existed
//                       (the server composes the mirror).
//           builder data: itemType, baseArmor
// Legacy magic items (bonuses only) open with their bonuses converted to badges.
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { useLootBonus } from "../LootBonusBadges";
import { formatDice, parseDice, type Dice } from "../dice";
import {
  COIN_UNITS, DAMAGE_TYPES, EXTRA_BONUS_TARGETS, GEAR_CATEGORIES, MAGIC_TYPES, MASTERIES, RARITIES, WEAPON_PROPS,
  bonusesToBenefits, composeArmorAC, composeCost, composeMagicType, composeWeaponProps, composeWeight, defaultArmorDex,
  parseArmorAC, parseCost, parseMagicType, parseWeaponProps, parseWeight, type ArmorAC, type Cost, type WeaponProps,
} from "./rules";
import { Cell, Select, Toggle, fieldCls, hint } from "./ui";
import type { DndNames } from "./data";

type Data = Record<string, unknown>;
export type EquipDraft = {
  hbKind: string;
  cost: Cost; weight: number; description: string;
  wCategory: string; wKind: string; dmg: Dice; dtype: string; wp: WeaponProps; mastery: string;
  aCategory: string; aac: ArmorAC; str: number; stealth: boolean;
  gCategory: string;
  itemType: string; base: string; custom: string; rarity: string; attunement: boolean; attunementNote: string;
  benefits: Badge[]; extras: Badge[];
};

export const EXTRA_KINDS: BadgeKind[] = [
  { k: "hp", label: "HP Max", color: "green", amount: true, fmt: "{n} HP max", tip: "+N to hit point maximum while equipped" },
  { k: "init", label: "Initiative", color: "gold", amount: true, fmt: "{n} Initiative", tip: "+N to Initiative" },
  { k: "spellAtk", label: "Spell Attack", color: "purple", amount: true, fmt: "{n} Spell Attack", tip: "+N to spell attack rolls" },
  { k: "spellDC", label: "Spell DC", color: "purple", amount: true, fmt: "{n} Spell DC", tip: "+N to spell save DC" },
];
const isExtra = (k: string) => (EXTRA_BONUS_TARGETS as readonly string[]).includes(k);
const s = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

export function blankEquip(): EquipDraft {
  return {
    hbKind: "weapon", cost: { n: 10, unit: "GP" }, weight: 2, description: "",
    wCategory: "Simple", wKind: "Melee", dmg: { n: 1, d: 6, m: 0 }, dtype: "slashing", wp: parseWeaponProps([]), mastery: "",
    aCategory: "Light", aac: { ac: 11, dex: "full" }, str: 0, stealth: false,
    gCategory: "Adventuring Gear",
    itemType: "Wondrous Item", base: "", custom: "", rarity: "Uncommon", attunement: false, attunementNote: "",
    benefits: [], extras: [],
  };
}

export function equipFromData(d: Data): EquipDraft {
  const b = blankEquip();
  const kind = ["weapon", "armor", "gear", "magic"].includes(s(d, "hbKind")) ? s(d, "hbKind") : "gear";
  const out: EquipDraft = { ...b, hbKind: kind, cost: parseCost(s(d, "cost")), weight: parseWeight(s(d, "weight")), description: s(d, "description") };
  if (kind === "weapon") {
    out.wCategory = s(d, "category") || "Simple"; out.wKind = s(d, "kind") || "Melee";
    out.dmg = parseDice(s(d, "damage")) ?? { n: 1, d: 4, m: 0 };
    out.dtype = s(d, "damageType") || "bludgeoning";
    out.wp = parseWeaponProps(Array.isArray(d.properties) ? (d.properties as string[]) : []);
    out.mastery = s(d, "mastery");
  } else if (kind === "armor") {
    out.aCategory = s(d, "category") || "Light";
    out.aac = parseArmorAC(s(d, "baseAC"), out.aCategory);
    out.str = parseInt(s(d, "strength").match(/\d+/)?.[0] ?? "0", 10) || 0;
    out.stealth = !!d.stealthDisadvantage;
  } else if (kind === "gear") {
    out.gCategory = s(d, "category") || "Adventuring Gear";
  } else {
    const t = parseMagicType(s(d, "type"));
    out.itemType = s(d, "itemType") || t.itemType;
    out.base = s(d, "baseWeapon") || s(d, "baseArmor") || t.base;
    out.custom = t.custom;
    out.rarity = s(d, "rarity") || "Uncommon";
    out.attunement = !!d.attunement; out.attunementNote = s(d, "attunementNote");
    const bonuses = Array.isArray(d.bonuses) ? (d.bonuses as { target: string; amount: number }[]) : [];
    out.extras = bonuses.filter((x) => isExtra(x.target) && Number(x.amount)).map((x) => ({ kind: x.target, amount: Number(x.amount) }));
    out.benefits = Array.isArray(d.benefits)
      ? (d.benefits as Badge[])
      : bonusesToBenefits(bonuses.filter((x) => !isExtra(x.target)), out.itemType === "Weapon");
  }
  return out;
}

export function equipPayload(name: string, e: EquipDraft): Data {
  const base = { name, hbKind: e.hbKind, cost: composeCost(e.cost), weight: composeWeight(e.weight) };
  if (e.hbKind === "weapon") return { ...base, category: e.wCategory, kind: e.wKind, damage: formatDice({ ...e.dmg, m: 0 }) || "1", damageType: e.dtype, properties: composeWeaponProps(e.wp), mastery: e.mastery };
  if (e.hbKind === "armor") return { ...base, category: e.aCategory, baseAC: composeArmorAC(e.aCategory, e.aac), strength: e.str ? `Str ${e.str}` : "—", stealthDisadvantage: e.stealth };
  if (e.hbKind === "gear") return { ...base, category: e.gCategory, description: e.description };
  return {
    name, hbKind: "magic", itemType: e.itemType,
    type: composeMagicType(e.itemType, e.base, e.custom),
    baseWeapon: e.itemType === "Weapon" ? e.base : "", baseArmor: e.itemType === "Armor" ? e.base : "",
    rarity: e.rarity, attunement: e.attunement, attunementNote: e.attunement ? e.attunementNote : "", description: e.description,
    benefits: e.benefits, bonuses: e.extras.map((x) => ({ target: x.kind, amount: x.amount ?? 0 })),
  };
}

/** Loot-builder badges + the four sheet-only kinds in one "+ Bonus" menu. */
function ItemBonuses({ e, set }: { e: EquipDraft; set: (p: Partial<EquipDraft>) => void }) {
  const L = useLootBonus("dnd", ["/tools-data/dnd-spells.js"]);
  const kinds = [...L.kinds, ...EXTRA_KINDS];
  const value = [...e.benefits, ...e.extras];
  if (!L.ready) return <BadgeStrip value={value} kinds={[...value.map((b) => ({ k: b.kind, label: b.kind, format: L.label })), ...EXTRA_KINDS]} empty="Loading bonuses…" />;
  return (
    <BonusBadges
      value={value}
      kinds={kinds}
      stats={L.stats}
      empty="No bonuses yet"
      onChange={(v) => set({ benefits: L.normalize(v.filter((b) => !isExtra(b.kind))), extras: v.filter((b) => isExtra(b.kind)) })}
    />
  );
}

const KINDS: [string, string][] = [["weapon", "Weapon"], ["armor", "Armor / Shield"], ["gear", "Adventuring Gear"], ["magic", "Magic Item"]];

export default function EquipmentBuilder({ value: e, onChange, names }: { value: EquipDraft; onChange: (e: EquipDraft) => void; names: DndNames }) {
  const set = (p: Partial<EquipDraft>) => onChange({ ...e, ...p });
  const costCell = (
    <Cell label="Cost">
      <span className="flex items-center gap-2">
        <Stepper value={e.cost.n} min={0} max={1000000} width="4em" ariaLabel="cost" onChange={(v) => set({ cost: { ...e.cost, n: v ?? 0 } })} />
        <Select value={e.cost.unit} options={COIN_UNITS} ariaLabel="coin" onChange={(v) => set({ cost: { ...e.cost, unit: v } })} />
      </span>
    </Cell>
  );
  const weightCell = (
    <Cell label="Weight (lb)">
      <input className={`${fieldCls} w-28`} type="number" min={0} max={2000} step={0.25} value={e.weight} onChange={(ev) => set({ weight: Math.max(0, Math.min(2000, parseFloat(ev.target.value) || 0)) })} />
    </Cell>
  );
  const desc = (ph: string) => (
    <Cell label="Description" className="sm:col-span-2">
      <textarea className={`${fieldCls} min-h-[80px]`} value={e.description} maxLength={6000} placeholder={ph} onChange={(ev) => set({ description: ev.target.value })} />
    </Cell>
  );

  return (
    <>
      <Cell label="Kind" className="sm:col-span-2">
        <ChipPicker single options={KINDS} value={[e.hbKind]} onChange={(v) => v[0] && set({ hbKind: v[0] })} />
      </Cell>

      {e.hbKind === "weapon" ? (
        <>
          <Cell label="Category"><ChipPicker single options={["Simple", "Martial"]} value={[e.wCategory]} onChange={(v) => v[0] && set({ wCategory: v[0] })} /></Cell>
          <Cell label="Melee / Ranged"><ChipPicker single options={["Melee", "Ranged"]} value={[e.wKind]} onChange={(v) => v[0] && set({ wKind: v[0] })} /></Cell>
          <Cell label="Damage">
            <span className="flex flex-wrap items-center gap-2">
              <DiceInput value={e.dmg} mod={false} minCount={1} maxCount={4} dice={[4, 6, 8, 10, 12]} ariaLabel="damage" onChange={(v) => set({ dmg: v })} />
              <Select value={e.dtype} options={DAMAGE_TYPES} ariaLabel="damage type" onChange={(v) => set({ dtype: v })} />
            </span>
          </Cell>
          <Cell label="Weapon Mastery"><Select className="w-full" value={e.mastery} options={[["", "— none —"], ...MASTERIES.map((x) => [x, x] as [string, string])]} onChange={(v) => set({ mastery: v })} /></Cell>
          <Cell label="Properties" className="sm:col-span-2">
            <ChipPicker options={WEAPON_PROPS} value={[...e.wp.props, ...e.wp.extra]} custom customPh="Other property…"
              onChange={(v) => set({ wp: { ...e.wp, props: WEAPON_PROPS.filter((p) => v.includes(p)), extra: v.filter((x) => !WEAPON_PROPS.includes(x)) } })} />
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {e.wp.props.includes("Thrown") ? <RangePair label="Thrown range" value={e.wp.thrown} onChange={(v) => set({ wp: { ...e.wp, thrown: v } })} /> : null}
              {e.wp.props.includes("Ammunition") ? <RangePair label="Ammunition range" value={e.wp.ammo} onChange={(v) => set({ wp: { ...e.wp, ammo: v } })} /> : null}
              {e.wp.props.includes("Versatile") ? (
                <Cell label="Versatile (two hands)"><Select value={String(e.wp.versatile)} options={[4, 6, 8, 10, 12].map((d) => [String(d), `1d${d}`] as [string, string])} onChange={(v) => set({ wp: { ...e.wp, versatile: parseInt(v, 10) } })} /></Cell>
              ) : null}
            </div>
          </Cell>
          {costCell}{weightCell}
        </>
      ) : null}

      {e.hbKind === "armor" ? (
        <>
          <Cell label="Category" className="sm:col-span-2">
            <ChipPicker single options={["Light", "Medium", "Heavy", "Shield"]} value={[e.aCategory]}
              onChange={(v) => v[0] && set({ aCategory: v[0], aac: { ac: v[0] === "Shield" ? 2 : e.aCategory === "Shield" ? 11 : e.aac.ac, dex: defaultArmorDex(v[0]) } })} />
          </Cell>
          <Cell label={e.aCategory === "Shield" ? "AC bonus" : "Base AC"}>
            <span className="flex items-center gap-2">
              <Stepper value={e.aac.ac} min={e.aCategory === "Shield" ? 1 : 10} max={e.aCategory === "Shield" ? 5 : 22} ariaLabel="armor class" onChange={(v) => set({ aac: { ...e.aac, ac: v ?? 11 } })} />
              {e.aCategory !== "Shield" ? (
                <Select value={e.aac.dex} options={[["full", "+ Dex modifier"], ["max2", "+ Dex (max 2)"], ["none", "no Dex"]]} ariaLabel="dex" onChange={(v) => set({ aac: { ...e.aac, dex: v as ArmorAC["dex"] } })} />
              ) : null}
            </span>
          </Cell>
          {e.aCategory !== "Shield" ? (
            <Cell label="Strength requirement" help="0 = none. Below it, Speed drops by 10 ft.">
              <Stepper value={e.str} min={0} max={20} ariaLabel="strength requirement" onChange={(v) => set({ str: v ?? 0 })} />
            </Cell>
          ) : null}
          {e.aCategory !== "Shield" ? <Cell label="Stealth"><Toggle checked={e.stealth} onChange={(v) => set({ stealth: v })}>Disadvantage on Stealth</Toggle></Cell> : null}
          {costCell}{weightCell}
        </>
      ) : null}

      {e.hbKind === "gear" ? (
        <>
          <Cell label="Category" className="sm:col-span-2"><ChipPicker single options={GEAR_CATEGORIES} value={[e.gCategory]} onChange={(v) => v[0] && set({ gCategory: v[0] })} /></Cell>
          {costCell}{weightCell}
          {desc("What it is / does…")}
        </>
      ) : null}

      {e.hbKind === "magic" ? (
        <>
          <Cell label="Item type" className="sm:col-span-2">
            <ChipPicker single options={[...MAGIC_TYPES, "Custom"]} value={[e.itemType]} onChange={(v) => v[0] && set({ itemType: v[0], base: "" })} />
          </Cell>
          {e.itemType === "Weapon" ? (
            <Cell label="Base weapon" help="Equips as an attack on the sheet; “any” lets the player pick the weapon when equipping.">
              <Select className="w-full" value={e.base} options={[["", "any (player picks)"], ...names.weapons.map((w) => [w.name, w.name] as [string, string])]} onChange={(v) => set({ base: v })} />
            </Cell>
          ) : null}
          {e.itemType === "Armor" ? (
            <Cell label="Base armor" help="Worn as that armor on the sheet (its AC + the item's +N Magic).">
              <Select className="w-full" value={e.base} options={[["", "— choose —"], ...names.armor.map((w) => [w.name, w.name] as [string, string])]} onChange={(v) => set({ base: v })} />
            </Cell>
          ) : null}
          {e.itemType === "Custom" ? (
            <Cell label="Type"><input className={fieldCls} value={e.custom} maxLength={80} placeholder="Wondrous Item (tattoo)" onChange={(ev) => set({ custom: ev.target.value })} /></Cell>
          ) : null}
          <Cell label="Rarity" className="sm:col-span-2"><ChipPicker single options={RARITIES} value={[e.rarity]} onChange={(v) => v[0] && set({ rarity: v[0] })} /></Cell>
          <Cell label="Attunement">
            <div className="flex flex-col gap-2">
              <Toggle checked={e.attunement} onChange={(v) => set({ attunement: v })}>Requires attunement</Toggle>
              {e.attunement ? <input className={fieldCls} value={e.attunementNote} maxLength={200} placeholder="by a Wizard (optional)" onChange={(ev) => set({ attunementNote: ev.target.value })} /> : null}
            </div>
          </Cell>
          <Cell label="Bonuses" className="sm:col-span-2" help={`Applied on the character sheet while equipped${e.attunement ? " and attuned" : ""}; unequipping removes them. Same badges as the GM Screen loot builder.`}>
            <ItemBonuses e={e} set={set} />
          </Cell>
          {desc("What the item does…")}
        </>
      ) : null}
    </>
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

export function EquipPreview({ name, e }: { name: string; e: EquipDraft }) {
  const L = useLootBonus("dnd");
  const p = equipPayload(name, e);
  const kinds = [...L.kinds, ...EXTRA_KINDS];
  let sub = "", lines: string[] = [];
  if (e.hbKind === "weapon") {
    sub = `${e.wCategory} ${e.wKind} Weapon`;
    lines = [`${p.damage} ${e.dtype}`, (p.properties as string[]).join(", "), e.mastery ? `Mastery: ${e.mastery}` : "", `${p.cost} · ${p.weight}`];
  } else if (e.hbKind === "armor") {
    sub = e.aCategory === "Shield" ? "Shield" : `${e.aCategory} Armor`;
    lines = [`AC ${p.baseAC}`, e.str ? `Strength ${e.str}` : "", e.stealth ? "Stealth Disadvantage" : "", `${p.cost} · ${p.weight}`];
  } else if (e.hbKind === "gear") {
    sub = e.gCategory; lines = [`${p.cost} · ${p.weight}`];
  } else {
    sub = `${p.type}, ${e.rarity.toLowerCase()}${e.attunement ? ` (requires attunement${e.attunementNote.trim() ? " " + e.attunementNote.trim() : ""})` : ""}`;
  }
  return (
    <Preview title={name || "Unnamed item"} subtitle={sub}>
      {lines.filter(Boolean).map((l, i) => <p key={i} className="text-[13px]">{l}</p>)}
      {e.hbKind === "magic" ? <div className="my-2"><BadgeStrip value={[...e.benefits, ...e.extras]} kinds={kinds} stats={L.stats} empty="No automated bonuses" /></div> : null}
      {e.description && e.hbKind !== "weapon" && e.hbKind !== "armor" ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{e.description}</p> : null}
      {e.hbKind === "magic" && e.itemType === "Weapon" ? <p className={hint}>Equips as {e.base || "a weapon of the player's choice"}{e.benefits.some((b) => b.kind === "plus") ? " with its +N Magic on attack and damage" : ""}.</p> : null}
    </Preview>
  );
}
