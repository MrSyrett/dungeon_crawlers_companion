"use client";
// ── ICRPG homebrew LOOT and GEAR builders ────────────────────────────────────
// Storage = the book IcrpgLoot / IcrpgGear shapes (lib/data/icrpg-types) that
// /icrpg/loot, the ICRPG sheet's Loot & Gear picker + Action tab and the GM
// tools read — `desc` and `effects` are COMPOSED by lib/homebrew.ts from:
//   build    { kind (desc lead: "Food", "INT Spell"…), stat, text, heal, uses, extras }
//   benefits LootBonus "icrpg" badges (stat / all STATS / DEFENSE / EFFORT /
//            HEARTS / spell / note) — the sheet applies them while EQUIPPED, and
//            they are written into `effects` in the book's wording ("+1 DEF")
//   effort   "d4"…"d12" for a weapon (the sheet's attack rolls that EFFORT)
//   ranged   true → the sheet rolls DEX to hit
// Old records (desc/effects only) open by parsing: bonus effects become badges,
// "Heal 2D6 HP" the heal picker, the desc lead the Type chips; the rest stays
// verbatim (desc text / other effects), so nothing is lost.
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import type { Badge } from "../BonusBadges";
import {
  CAST_STATS, EFFORTS, GEAR_CATS, ICRPG_WORLDS, LOOT_KINDS, LOOT_TABLES, blankBuild, composeItemDesc, composeItemEffects, effortOfCode, itemFromData, type ItemBuild,
} from "./rules";
import { Bonuses, Cell, PreviewBadges, Select, TextRows, fieldCls } from "./ui";

type Data = Record<string, unknown>;
const HELP = "Applied on the ICRPG sheet while the item is EQUIPPED (CARRIED items give nothing); unequipping or deleting it takes them off again. Same badges as the GM Screen loot builder.";
const effortOpts: [string, string][] = [["0", "—"], ...EFFORTS.map((e) => [String(e.die), `d${e.die} ${e.label}`] as [string, string])];

export type LootDraft = { table: string; roll: number | null; rollText: string; effort: number; ranged: boolean; build: ItemBuild; benefits: Badge[] };
export type GearDraft = { world: string; category: string; effort: number; ranged: boolean; build: ItemBuild; benefits: Badge[] };

const weaponOf = (d: Data) => ({ effort: effortOfCode(d.effort)?.die ?? 0, ranged: !!d.ranged });
export const blankLoot = (): LootDraft => ({ table: "Homebrew", roll: null, rollText: "", effort: 0, ranged: false, build: { ...blankBuild(), kind: "Item" }, benefits: [] });
export function lootFromData(d: Data): LootDraft {
  const { build, benefits } = itemFromData(d, true);
  const roll = String(d.roll ?? "").trim();
  return { table: String(d.table ?? "") || "Homebrew", roll: /^\d+$/.test(roll) ? parseInt(roll, 10) : null, rollText: roll && !/^\d+$/.test(roll) ? roll : "", ...weaponOf(d), build, benefits };
}
export const lootPayload = (name: string, l: LootDraft): Data => ({
  name, table: l.table, roll: l.rollText.trim() || (l.roll == null ? "" : String(l.roll)), build: l.build, benefits: l.benefits,
  ...(l.build.kind === "Weapon" && l.effort ? { effort: `d${l.effort}`, ranged: l.ranged } : {}),
});
export const blankGear = (): GearDraft => ({ world: "core", category: "gear", effort: 0, ranged: false, build: blankBuild(), benefits: [] });
export function gearFromData(d: Data): GearDraft {
  const { build, benefits } = itemFromData(d, false);
  return { world: String(d.world ?? "core"), category: String(d.category ?? "") || "gear", ...weaponOf(d), build, benefits };
}
const isWeaponCat = (c: string) => /^(weapon|firearm)$/i.test(c);
export const gearPayload = (name: string, g: GearDraft): Data => ({
  name, world: g.world, category: g.category, build: g.build, benefits: g.benefits,
  ...(isWeaponCat(g.category) && g.effort ? { effort: `d${g.effort}`, ranged: g.ranged } : {}),
});

// ── shared pieces ──
function WeaponCells({ effort, ranged, onChange }: { effort: number; ranged: boolean; onChange: (p: { effort?: number; ranged?: boolean }) => void }) {
  return (
    <Cell label="Weapon EFFORT" help="The EFFORT die the sheet rolls on a hit (blank = guessed from the name).">
      <span className="flex flex-wrap items-center gap-2">
        <Select value={String(effort)} options={effortOpts} ariaLabel="effort" onChange={(v) => onChange({ effort: parseInt(v, 10) || 0, ...(v === "8" ? { ranged: true } : {}) })} />
        <Select value={ranged ? "1" : ""} options={[["", "Melee (STR)"], ["1", "Ranged (DEX)"]]} ariaLabel="attack stat" onChange={(v) => onChange({ ranged: v === "1" })} />
      </span>
    </Cell>
  );
}
function ItemCommon({ b, set, loot }: { b: ItemBuild; set: (p: Partial<ItemBuild>) => void; loot: boolean }) {
  return (
    <>
      <Cell label="Description" className="sm:col-span-2" help={loot && b.kind ? `Stored as “${b.kind === "Spell" ? `${b.stat} Spell` : b.kind}, …” — the lead the sheet reads.` : undefined}>
        <textarea className={`${fieldCls} min-h-[70px]`} value={b.text} maxLength={2800} placeholder="What it does, in plain words…" onChange={(e) => set({ text: e.target.value })} />
      </Cell>
      <Cell label="Heal" help="Rolled by the sheet's Use button (0 = none; — die = a flat number).">
        <DiceInput value={b.heal} dice={[4, 6, 8, 10, 12, 20]} flat mod={false} maxCount={10} ariaLabel="heal" onChange={(v) => set({ heal: v })} />
      </Cell>
      <Cell label="Uses" help="0 = not counted. Counted items are used up on the sheet.">
        <Stepper value={b.uses} min={0} max={99} width="2.6em" ariaLabel="uses" onChange={(v) => set({ uses: v ?? 0 })} />
      </Cell>
      <Cell label="Other effects" className="sm:col-span-2" help="Anything else printed on the card (“ULTIMATE damage”, “Immune to fire”).">
        <TextRows rows={b.extras} onChange={(r) => set({ extras: r })} placeholder="ULTIMATE damage vs undead" addLabel="+ Effect" max={12} />
      </Cell>
    </>
  );
}
function ItemCard({ desc, effects, benefits, meta }: { desc: string; effects: string[]; benefits: Badge[]; meta?: string }) {
  return (
    <>
      {meta ? <p className="text-[12px] text-[var(--muted)]">{meta}</p> : null}
      {desc ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{desc}</p> : null}
      <PreviewBadges value={benefits} />
      {effects.length ? <p className="text-[12px] text-[var(--muted)]"><b className="text-[var(--text)]">Effects:</b> {effects.join(" · ")}</p> : null}
    </>
  );
}

// ═══ LOOT ════════════════════════════════════════════════════════════════════
export function LootBuilder({ value: l, onChange }: { value: LootDraft; onChange: (v: LootDraft) => void }) {
  const set = (p: Partial<LootDraft>) => onChange({ ...l, ...p });
  const setB = (p: Partial<ItemBuild>) => set({ build: { ...l.build, ...p } });
  return (
    <>
      <Cell label="Type" className="sm:col-span-2" help="How the card starts (“Food, …”, “INT Spell, …”): Food / Potion / Scroll / Explosive and counted uses are Action-tab consumables; Spell is a castable scroll.">
        <ChipPicker single options={LOOT_KINDS} value={l.build.kind ? [l.build.kind] : []} onChange={(v) => setB({ kind: v[0] ?? "" })} />
      </Cell>
      {l.build.kind === "Spell" ? (
        <Cell label="Cast with"><Select value={l.build.stat} options={CAST_STATS} ariaLabel="cast stat" onChange={(v) => setB({ stat: v })} /></Cell>
      ) : null}
      {l.build.kind === "Weapon" ? <WeaponCells effort={l.effort} ranged={l.ranged} onChange={(p) => set(p)} /> : null}
      <Cell label="Loot table">
        <Select value={l.table} options={LOOT_TABLES} ariaLabel="loot table" onChange={(v) => set({ table: v })} />
      </Cell>
      <Cell label="Roll" help={l.rollText ? undefined : "Its number on the d100 table (blank = none)."}>
        {l.rollText ? (
          <span className="flex items-center gap-2">
            <input className={`${fieldCls} max-w-[120px]`} value={l.rollText} maxLength={20} onChange={(e) => set({ rollText: e.target.value })} />
            <button type="button" className="text-[11px] text-[var(--muted)] underline" onClick={() => set({ rollText: "" })}>use number</button>
          </span>
        ) : <Stepper value={l.roll} min={1} max={100} nullable width="2.8em" ariaLabel="roll" onChange={(v) => set({ roll: v })} />}
      </Cell>
      <Bonuses value={l.benefits} onChange={(v) => set({ benefits: v })} help={HELP} />
      <ItemCommon b={l.build} set={setB} loot />
    </>
  );
}
export function LootPreview({ name, l }: { name: string; l: LootDraft }) {
  const eff = effortOfCode(`d${l.effort}`);
  const roll = l.rollText || (l.roll == null ? "" : `#${l.roll}`);
  return (
    <Preview title={name || "Unnamed loot"} subtitle={[`${l.table} loot`, roll].filter(Boolean).join(" · ")}>
      <ItemCard desc={composeItemDesc(l.build, true)} effects={composeItemEffects(l.benefits, l.build)} benefits={l.benefits}
        meta={l.build.kind === "Weapon" && eff ? `${eff.label} EFFORT (d${eff.die}) · ${l.ranged ? "DEX" : "STR"} to hit` : undefined} />
    </Preview>
  );
}

// ═══ GEAR ════════════════════════════════════════════════════════════════════
export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const setB = (p: Partial<ItemBuild>) => set({ build: { ...g.build, ...p } });
  return (
    <>
      <Cell label="Category" className="sm:col-span-2" help="Weapon / Firearm show on the sheet's Action tab as attacks; Armor isn't a usable item.">
        <ChipPicker single options={GEAR_CATS} value={[g.category]} onChange={(v) => v[0] && set({ category: v[0], ...(v[0] === "firearm" && !g.effort ? { effort: 8, ranged: true } : {}) })} />
      </Cell>
      <Cell label="World">
        <Select value={g.world} options={ICRPG_WORLDS} ariaLabel="world" onChange={(v) => set({ world: v })} />
      </Cell>
      {isWeaponCat(g.category) ? <WeaponCells effort={g.effort} ranged={g.ranged} onChange={(p) => set(p)} /> : <div />}
      <Bonuses value={g.benefits} onChange={(v) => set({ benefits: v })} help={HELP} />
      <ItemCommon b={g.build} set={setB} loot={false} />
    </>
  );
}
export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const eff = effortOfCode(`d${g.effort}`);
  const cat = GEAR_CATS.find(([k]) => k === g.category)?.[1] ?? g.category;
  const world = ICRPG_WORLDS.find(([k]) => k === g.world)?.[1] ?? g.world;
  return (
    <Preview title={name || "Unnamed gear"} subtitle={`${cat} · ${world}`}>
      <ItemCard desc={composeItemDesc(g.build, false)} effects={composeItemEffects(g.benefits, g.build)} benefits={g.benefits}
        meta={isWeaponCat(g.category) && eff ? `${eff.label} EFFORT (d${eff.die}) · ${g.ranged ? "DEX" : "STR"} to hit` : undefined} />
    </Preview>
  );
}
