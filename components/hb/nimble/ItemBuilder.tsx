"use client";
// ── Nimble homebrew item builder ─────────────────────────────────────────────
// Storage (type "nimble-item", the NIMBLE_ITEMS book shape the sheet's store /
// equip / attack roller and the equipment page read):
//   composed for every consumer: category, damage ("1d8+STR Slashing"),
//     armor ("6+DEX (max 2)" / shield "4"), properties ("2-handed, Reach 2" —
//     or the wand's "Tier 2 (3 charges)", or a gear item's effect line), cost
//     ("60 gp"; a priceless item lists its rarity, as the book does), rarity,
//     description
//   builder data: build (./rules NimItemBuild — dice, stat, damage types,
//     property toggles/steppers, armor base + DEX mode, price, tier, charges)
//   benefits: LootBonus "nim" badges (Armor, Damage, Extra die, Stat, Saves,
//     HP, Speed, Spell, Note). The sheet copies them onto the inventory row
//     (bv:2) when the item is added, so equip applies them, unequip reverses.
// Legacy text-only items open through parseItemBuild (anything that doesn't
// parse is kept verbatim: custom damage / cost text, extra property chips).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import LootBonusBadges, { useLootBonus } from "../LootBonusBadges";
import { BadgeStrip, type Badge } from "../BonusBadges";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  NIM_DICE, NIM_ITEM_CATEGORIES, NIM_PHYS_TYPES, NIM_RARITIES, blankItemBuild, cleanItemBuild, composeItemFields,
  isArmorCat, isSpellItemCat, isWeaponCat, parseItemBuild, type NimItemBuild, type NimProps,
} from "./rules";
import { Cell, Select, fieldCls, hint, smallBtn } from "./ui";

type Data = Record<string, unknown>;
export type ItemDraft = { category: string; rarity: string; description: string; build: NimItemBuild; benefits: Badge[] };
const SPELLS_JS = ["/tools-data/nimble-spells.js"];

export function blankItem(): ItemDraft {
  return { category: "Melee Weapon", rarity: "", description: "", build: blankItemBuild(), benefits: [] };
}
export function itemFromData(d: Data): ItemDraft {
  const category = (NIM_ITEM_CATEGORIES as readonly string[]).includes(String(d.category)) ? String(d.category) : "Adventuring Gear";
  return {
    category,
    rarity: String(d.rarity ?? ""),
    description: String(d.description ?? ""),
    build: d.build && typeof d.build === "object" ? cleanItemBuild(d.build) : parseItemBuild(d),
    benefits: Array.isArray(d.benefits) ? (d.benefits as Badge[]) : [],
  };
}
export function itemPayload(name: string, x: ItemDraft): Data {
  return {
    name, category: x.category, rarity: x.rarity, description: x.description, build: x.build, benefits: x.benefits,
    ...composeItemFields(x.category, x.build, x.rarity),
  };
}

const PROP_FLAGS: [keyof NimProps, string][] = [["twoHanded", "2-handed"], ["light", "Light"], ["vicious", "Vicious"]];
const PROP_NUMS: [keyof NimProps, string, number][] = [["range", "Range", 60], ["reach", "Reach", 10], ["thrown", "Thrown", 30], ["load", "Load (actions)", 5], ["stack", "Stack of", 20]];

export default function ItemBuilder({ value: x, onChange }: { value: ItemDraft; onChange: (v: ItemDraft) => void }) {
  const set = (p: Partial<ItemDraft>) => onChange({ ...x, ...p });
  const b = x.build;
  const setB = (p: Partial<NimItemBuild>) => set({ build: { ...b, ...p } });
  const setP = (p: Partial<NimProps>) => setB({ props: { ...b.props, ...p } });
  const cat = x.category;
  const weapon = isWeaponCat(cat), armor = isArmorCat(cat), shield = cat === "Shield", spellItem = isSpellItemCat(cat);

  const reqCell = (
    <Cell label="Req. STR" help="0 = none. Without it: no crits (weapons) / Defend costs +1 action (armor).">
      <Stepper value={b.props.req} min={0} max={10} ariaLabel="required strength" onChange={(v) => setP({ req: v ?? 0 })} />
    </Cell>
  );
  const extraChips = (
    <Cell label="Other properties" className="sm:col-span-2">
      <ChipPicker options={[]} value={b.props.extra} custom customPh="+ custom property" onChange={(v) => setP({ extra: v })} />
    </Cell>
  );

  return (
    <>
      <Cell label="Category" className="sm:col-span-2">
        <ChipPicker single options={NIM_ITEM_CATEGORIES} value={[cat]} onChange={(v) => v[0] && set({ category: v[0] })} />
      </Cell>

      {weapon ? (
        <>
          <Cell label="Damage" className="sm:col-span-2" help="The Primary Die (leftmost) decides hit / miss / crit; STR or DEX is added on a hit.">
            {b.dmgText ? (
              <span className="flex flex-wrap items-center gap-2">
                <input className={`${fieldCls} max-w-[260px]`} value={b.dmgText} maxLength={60} onChange={(e) => setB({ dmgText: e.target.value })} />
                <button type="button" className={smallBtn} onClick={() => setB({ dmgText: "" })}>Use dice picker</button>
              </span>
            ) : (
              <span className="flex flex-wrap items-center gap-2">
                <DiceInput value={b.dmg} dice={NIM_DICE} minCount={1} maxCount={10} modMin={-5} modMax={20} ariaLabel="damage" onChange={(v) => setB({ dmg: v })} />
                <Select value={b.dmgStat} options={[["", "no stat"], ["STR", "+ STR"], ["DEX", "+ DEX"], ["KEY", "+ KEY"]]} ariaLabel="damage stat" onChange={(v) => setB({ dmgStat: v })} />
                <ChipPicker options={NIM_PHYS_TYPES} value={b.dmgTypes} onChange={(v) => setB({ dmgTypes: NIM_PHYS_TYPES.filter((t) => v.includes(t)) })} />
              </span>
            )}
          </Cell>
          <Cell label="Properties" className="sm:col-span-2">
            <ChipPicker options={PROP_FLAGS.map(([, l]) => l)} value={PROP_FLAGS.filter(([k]) => b.props[k]).map(([, l]) => l)}
              onChange={(v) => setP(Object.fromEntries(PROP_FLAGS.map(([k, l]) => [k, v.includes(l)])) as Partial<NimProps>)} />
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {PROP_NUMS.map(([k, l, max]) => (
                <Cell key={k} label={l}>
                  <Stepper value={b.props[k] as number} min={0} max={max} width="2.4em" ariaLabel={l} onChange={(v) => setP({ [k]: v ?? 0 } as Partial<NimProps>)} />
                </Cell>
              ))}
              {reqCell}
            </div>
            <p className={hint}>0 = not on the weapon. Range: ranged attacks with an adjacent enemy have disadvantage. Thrown: a melee weapon you can throw.</p>
          </Cell>
          {extraChips}
        </>
      ) : null}

      {armor || shield ? (
        <>
          <Cell label={shield ? "Armor (added)" : "Armor"}>
            <span className="flex items-center gap-2">
              <Stepper value={b.armor} min={0} max={30} ariaLabel="armor" onChange={(v) => setB({ armor: v ?? 0 })} />
              {armor ? <Select value={b.armorDex} options={[["full", "+ DEX"], ["max2", "+ DEX (max 2)"], ["none", "no DEX"]]} ariaLabel="dex" onChange={(v) => setB({ armorDex: v as NimItemBuild["armorDex"] })} /> : null}
            </span>
          </Cell>
          {reqCell}
          {extraChips}
        </>
      ) : null}

      {spellItem ? (
        <>
          <Cell label="Spell tier">
            <Select value={String(b.tier)} options={[["-1", "— not stated —"], ["0", "Cantrip"], ...Array.from({ length: 9 }, (_, i) => [String(i + 1), `Tier ${i + 1}`] as [string, string])]} onChange={(v) => setB({ tier: parseInt(v, 10) })} />
          </Cell>
          {cat === "Wand" ? (
            <Cell label="Charges" help="Recharged by the wand's own ritual (put it in the description).">
              <Stepper value={b.charges} min={0} max={20} ariaLabel="charges" onChange={(v) => setB({ charges: v ?? 0 })} />
            </Cell>
          ) : null}
        </>
      ) : null}

      {!weapon && !armor && !shield && !(spellItem && b.tier >= 0) ? (
        <Cell label="Effect line" className="sm:col-span-2" help="The short line under the name in the store (“(action) Heal 2d4+4 HP.”).">
          <input className={fieldCls} value={b.effect} maxLength={200} placeholder="Like rope, but stronger (and heavy)." onChange={(e) => setB({ effect: e.target.value })} />
        </Cell>
      ) : null}

      <Cell label="Price">
        {b.costText ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[160px]`} value={b.costText} maxLength={40} onChange={(e) => setB({ costText: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => setB({ costText: "" })}>Use picker</button>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Stepper value={b.cost} min={0} max={10_000_000} width="4.5em" ariaLabel="price" onChange={(v) => setB({ cost: v ?? 0 })} />
            <Select value={b.costUnit} options={[["gp", "gp"], ["sp", "sp"]]} ariaLabel="coin" onChange={(v) => setB({ costUnit: v as "gp" | "sp" })} />
          </span>
        )}
        <p className={hint}>0 = not for sale{x.rarity ? ` (lists as “${x.rarity}”)` : ""}.</p>
      </Cell>
      <Cell label="Rarity">
        <Select className="w-full" value={x.rarity} options={[["", "— none —"], ...NIM_RARITIES.map((r) => [r, r] as [string, string])]} onChange={(v) => set({ rarity: v })} />
      </Cell>

      <Cell label="Bonuses" className="sm:col-span-2" help="Applied on the character sheet while equipped; unequipping or deleting the item removes them. Same badges as the GM Screen loot builder.">
        <LootBonusBadges sys="nim" scripts={SPELLS_JS} value={x.benefits} empty="No bonuses yet" onChange={(v) => set({ benefits: v })} />
      </Cell>

      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={x.description} maxLength={2000} placeholder="What it looks like, what it does that the badges don't…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function ItemPreview({ name, x }: { name: string; x: ItemDraft }) {
  const L = useLootBonus("nim", SPELLS_JS);
  const f = composeItemFields(x.category, x.build, x.rarity);
  const line = [f.armor && `Armor ${f.armor}`, f.damage, f.properties].filter(Boolean).join(" · ");
  return (
    <Preview title={name || "Unnamed item"} subtitle={[x.category, x.rarity].filter(Boolean).join(" · ")}>
      {line ? <p className="font-mono text-[13px]">{line}</p> : null}
      {f.cost ? <p className="text-[12px] text-[var(--muted)]">{f.cost}</p> : null}
      <div className="my-2"><BadgeStrip value={x.benefits} kinds={L.kinds} stats={L.stats} empty="No automated bonuses" /></div>
      {x.description ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{x.description}</p> : null}
    </Preview>
  );
}
