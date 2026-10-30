"use client";
// ── Dragonbane homebrew weapon / armor & helmet / gear builders ──────────────
// Storage = the book shapes in lib/data/db-types.ts (DbWeapon, DbArmor, DbGear)
// that the /dragonbane/gear page, the DB sheet's shop (public/tools-data/
// db-homebrew.js → DB_WEAPONS / DB_ARMOR / DB_HELMETS / DB_GEAR) and the GM
// Screen read, composed by normalizeDb* from what these builders post:
//   weapon: kind (melee / ranged), skill (or shield → any STR melee skill),
//     grip, str, range (2 / 4 / "STR" / "STR×2" / meters), damage ("2D6"),
//     durability, cost {amount, unit}, supply, features, metal, shield, notes
//   armor: slot (armor / helmet), rating, banes (skills + "Ranged attacks"),
//     bonusVs {bludgeoning|slashing|piercing: +N}, metal, cost, supply, notes
//   gear: category, cost, supply, weight (0 tiny, 0.25, 1–4, null), doses,
//     focus, light {radius, die}, effect
// All three carry `benefits` — LootBonus "db" badges (Enchantment = an
// Enchanting spell + power level, Armor, Damage, Boon, Resist, Movement, WP, HP,
// Note), the GM Screen loot builder's kinds. The sheet copies them onto the
// inventory row (bv:2) when the item is bought / added, so equipping applies
// them and unequipping reverses them.
import ChipPicker from "../ChipPicker";
import LootBonusBadges, { useLootBonus } from "../LootBonusBadges";
import { BadgeStrip, type Badge } from "../BonusBadges";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  DB_ARMOR_BANES, DB_DMG_KINDS, DB_FEATURES, DB_GEAR_CATS, DB_SKILLS, DB_SUPPLIES, DB_WEAPON_SKILLS, DB_WEIGHTS, costFromData, fmtCost, fmtDb, parseDb,
  type DbCostDraft, type DbDmg,
} from "./rules";
import { Cell, CostInput, DB_JS, DmgInput, Select, Toggle, fieldCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
const benefitsOf = (d: Data): Badge[] => (Array.isArray(d.benefits) ? (d.benefits as Badge[]) : []);
const numOrNull = (v: unknown) => (v == null || v === "" ? null : Number.isFinite(Number(v)) ? Number(v) : null);

function Bonuses({ value, onChange }: { value: Badge[]; onChange: (v: Badge[]) => void }) {
  return (
    <Cell label="Bonuses & enchantments" className="sm:col-span-2" help="Applied on the character sheet while it's in hand or worn; unequipping or deleting it takes them off again. Same badges as the GM Screen loot builder — an Enchantment is an Enchanting spell bound to the item, with its power level.">
      <LootBonusBadges sys="db" scripts={DB_JS} value={value} empty="No bonuses yet" onChange={onChange} />
    </Cell>
  );
}
function PreviewBadges({ value }: { value: Badge[] }) {
  const L = useLootBonus("db", DB_JS);
  return <div className="my-2"><BadgeStrip value={value} kinds={L.kinds} stats={L.stats} empty="No automated bonuses" /></div>;
}
function Supply({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <Cell label="Supply"><ChipPicker single options={DB_SUPPLIES} value={[value]} onChange={(v) => v[0] && onChange(v[0])} /></Cell>;
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between gap-3 border-b border-[var(--border)] py-0.5 text-[12.5px] last:border-0"><span className="font-semibold">{k}</span><span className="text-right">{v}</span></div>;
}

// ═══ WEAPONS ═════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  kind: "melee" | "ranged"; shield: boolean; skill: string; grip: "1H" | "2H"; str: number | null; range: string; rangeM: number;
  dmg: DbDmg; dmgText: string; durability: number | null; cost: DbCostDraft; supply: string; metal: boolean; features: string[]; notes: string; benefits: Badge[];
};
export const blankWeapon = (): WeaponDraft => ({
  kind: "melee", shield: false, skill: "Swords", grip: "1H", str: 10, range: "2", rangeM: 20, dmg: { n: 2, d: 6, xn: 0, xd: 6 }, dmgText: "",
  durability: 12, cost: { amount: 10, unit: "gold" }, supply: "Common", metal: true, features: ["Slashing"], notes: "", benefits: [],
});
export function weaponFromData(d: Data): WeaponDraft {
  const b = blankWeapon();
  const ranged = d.ranged === true || d.kind === "ranged";
  const r = String(d.range ?? (ranged ? 20 : 2));
  const p = parseDb(d.damage);
  return {
    ...b, kind: ranged ? "ranged" : "melee", shield: !!d.shield, skill: String(d.skill ?? (ranged ? "Bows" : "Swords")),
    grip: d.grip === "2H" ? "2H" : "1H", str: numOrNull(d.str),
    range: ranged ? (/^\d+$/.test(r) ? "m" : r) : r, rangeM: /^\d+$/.test(r) ? Number(r) : 20,
    dmg: p ?? b.dmg, dmgText: p || !d.damage ? "" : String(d.damage), durability: numOrNull(d.durability),
    cost: costFromData(d, "gold"), supply: String(d.supply ?? "Common"), metal: !!d.metal,
    features: Array.isArray(d.features) ? (d.features as string[]) : [], notes: String(d.notes ?? ""), benefits: benefitsOf(d),
  };
}
const wRange = (w: WeaponDraft) => (w.kind === "ranged" && w.range === "m" ? String(w.rangeM) : w.range);
export function weaponPayload(name: string, w: WeaponDraft): Data {
  return {
    name, kind: w.kind, shield: w.kind === "melee" && w.shield, skill: w.shield ? "" : w.skill, grip: w.grip, str: w.str,
    range: wRange(w), damage: w.dmgText.trim() || fmtDb(w.dmg), durability: w.durability,
    costAmount: w.cost.amount, costUnit: w.cost.unit, supply: w.supply, metal: w.metal, features: w.features, notes: w.notes, benefits: w.benefits,
  };
}
export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  const ranged = w.kind === "ranged";
  const meleeSkills = DB_WEAPON_SKILLS.filter((x) => !["Bows", "Crossbows", "Slings"].includes(x));
  return (
    <>
      <Cell label="Kind">
        <ChipPicker single options={[["melee", "Melee"], ["ranged", "Ranged"]]} value={[w.kind]}
          onChange={(v) => v[0] && set(v[0] === "ranged" ? { kind: "ranged", shield: false, skill: "Bows", range: "m", rangeM: 30 } : { kind: "melee", skill: "Swords", range: "2" })} />
        {!ranged ? <div className="mt-2"><Toggle checked={w.shield} onChange={(v) => set({ shield: v })} title="Parries ranged attacks; no shield skill — uses any STR-based melee skill">Shield</Toggle></div> : null}
      </Cell>
      <Cell label="Skill" help={w.shield ? "Shields use the wielder's best STR-based melee skill." : undefined}>
        {w.shield ? <span className="text-[13px] text-[var(--muted)]">Any STR melee skill</span> : (
          <Select value={w.skill} options={ranged ? ["Bows", "Crossbows", "Slings", "Knives", "Spears", "Axes"] : meleeSkills} ariaLabel="skill" onChange={(v) => set({ skill: v })} />
        )}
      </Cell>
      <Cell label="Grip"><ChipPicker single options={[["1H", "One-handed"], ["2H", "Two-handed"]]} value={[w.grip]} onChange={(v) => v[0] && set({ grip: v[0] as WeaponDraft["grip"] })} /></Cell>
      <Cell label="STR requirement" help="Below it: a bane on attacks. Blank = none.">
        <Stepper value={w.str} min={3} max={18} nullable width="2.4em" ariaLabel="STR requirement" onChange={(v) => set({ str: v })} />
      </Cell>
      <Cell label="Damage">
        {w.dmgText ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[180px]`} value={w.dmgText} maxLength={40} onChange={(e) => set({ dmgText: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => set({ dmgText: "" })}>Use dice picker</button>
          </span>
        ) : <DmgInput value={w.dmg} extra={false} onChange={(v) => set({ dmg: v })} />}
      </Cell>
      <Cell label="Range">
        {ranged ? (
          <span className="flex items-center gap-2">
            <Select value={w.range} options={[["m", "meters"], ["STR", "STR (thrown)"], ["STR×2", "STR×2"]]} ariaLabel="range kind" onChange={(v) => set({ range: v })} />
            {w.range === "m" ? <Stepper value={w.rangeM} min={2} max={200} width="3em" ariaLabel="range" onChange={(v) => set({ rangeM: v ?? 20 })} /> : null}
          </span>
        ) : (
          <Select value={w.range} options={[["2", "2 m (melee)"], ["4", "4 m (Long)"], ["STR", "STR (thrown)"], ["STR×2", "STR×2 (thrown)"]]} ariaLabel="range" onChange={(v) => set({ range: v })} />
        )}
      </Cell>
      <Cell label="Durability" help="Parrying damage above it breaks the weapon. Blank = —.">
        <Stepper value={w.durability} min={1} max={40} nullable width="2.4em" ariaLabel="durability" onChange={(v) => set({ durability: v })} />
      </Cell>
      <Cell label="Features" className="sm:col-span-2">
        <ChipPicker options={DB_FEATURES} value={w.features}
          onChange={(v) => set({ features: v, ...(!ranged && v.includes("Long") && !w.features.includes("Long") && w.range === "2" ? { range: "4" } : {}), ...(!ranged && !v.includes("Long") && w.range === "4" ? { range: "2" } : {}) })} />
        <div className="mt-2"><Toggle checked={w.metal} onChange={(v) => set({ metal: v })} title="Metal weapons and armor hinder spellcasting">Metal</Toggle></div>
      </Cell>
      <Cell label="Cost"><CostInput value={w.cost} onChange={(c) => set({ cost: c })} /></Cell>
      <Supply value={w.supply} onChange={(v) => set({ supply: v })} />
      <Bonuses value={w.benefits} onChange={(b) => set({ benefits: b })} />
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} maxLength={1000} value={w.notes} onChange={(e) => set({ notes: e.target.value })} />
      </Cell>
    </>
  );
}
export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const r = wRange(w);
  return (
    <Preview title={name || "Unnamed weapon"} subtitle={`${w.shield ? "Shield" : w.kind === "ranged" ? "Ranged weapon" : "Melee weapon"} · ${w.shield ? "any STR melee skill" : w.skill}`}>
      <Row k="Grip" v={w.grip} /><Row k="STR" v={w.str == null ? "—" : String(w.str)} /><Row k="Range" v={/^\d+$/.test(r) ? `${r} m` : r} />
      <Row k="Damage" v={w.dmgText || fmtDb(w.dmg)} /><Row k="Durability" v={w.durability == null ? "—" : String(w.durability)} />
      <Row k="Cost" v={fmtCost(w.cost)} /><Row k="Supply" v={w.supply} />
      <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">{[...w.features, w.metal ? "metal" : ""].filter(Boolean).join(" · ") || "no features"}</p>
      <PreviewBadges value={w.benefits} />
      {w.notes ? <p className="whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{w.notes}</p> : null}
    </Preview>
  );
}

// ═══ ARMOR & HELMETS ═════════════════════════════════════════════════════════
export type ArmorDraft = {
  slot: "armor" | "helmet"; rating: number; banes: string[]; bonusVs: Record<string, number>; metal: boolean;
  cost: DbCostDraft; supply: string; notes: string; benefits: Badge[];
};
export const blankArmor = (): ArmorDraft => ({ slot: "armor", rating: 2, banes: [], bonusVs: {}, metal: false, cost: { amount: 10, unit: "gold" }, supply: "Common", notes: "", benefits: [] });
export function armorFromData(d: Data): ArmorDraft {
  const bv = (d.bonusVs ?? {}) as Record<string, unknown>;
  return {
    slot: d.slot === "helmet" ? "helmet" : "armor", rating: Number(d.rating) || 0, banes: Array.isArray(d.banes) ? (d.banes as string[]) : [],
    bonusVs: Object.fromEntries(DB_DMG_KINDS.map((k) => [k, Number(bv[k]) || 0]).filter(([, n]) => n)), metal: !!d.metal,
    cost: costFromData(d, "gold"), supply: String(d.supply ?? "Common"), notes: String(d.notes ?? ""), benefits: benefitsOf(d),
  };
}
export function armorPayload(name: string, a: ArmorDraft): Data {
  return { name, slot: a.slot, rating: a.rating, banes: a.banes, bonusVs: a.bonusVs, metal: a.metal, costAmount: a.cost.amount, costUnit: a.cost.unit, supply: a.supply, notes: a.notes, benefits: a.benefits };
}
export function ArmorBuilder({ value: a, onChange }: { value: ArmorDraft; onChange: (v: ArmorDraft) => void }) {
  const set = (p: Partial<ArmorDraft>) => onChange({ ...a, ...p });
  return (
    <>
      <Cell label="Slot"><ChipPicker single options={[["armor", "Body armor"], ["helmet", "Helmet"]]} value={[a.slot]} onChange={(v) => v[0] && set({ slot: v[0] as ArmorDraft["slot"] })} /></Cell>
      <Cell label="Armor rating" help={a.slot === "helmet" ? "Added to the body armor's rating." : "Book: leather 1, studded 2, chainmail 4, plate 6."}>
        <Stepper value={a.rating} min={0} max={12} width="2.2em" ariaLabel="armor rating" onChange={(v) => set({ rating: v ?? 0 })} />
      </Cell>
      <Cell label="Bane on" className="sm:col-span-2">
        <ChipPicker options={DB_ARMOR_BANES} value={a.banes} onChange={(v) => set({ banes: v.filter((x) => (DB_SKILLS as readonly string[]).includes(x) || x === "Ranged attacks") })} />
      </Cell>
      <Cell label="Extra armor vs damage type" className="sm:col-span-2" help="Optional damage-type rule: e.g. leather +2 vs bludgeoning, chainmail +2 vs slashing.">
        <span className="flex flex-wrap gap-4">
          {DB_DMG_KINDS.map((k) => (
            <span key={k} className="flex items-center gap-1 text-[12px] text-[var(--muted)]">{k}
              <Stepper value={a.bonusVs[k] ?? 0} min={0} max={6} signed width="2em" ariaLabel={`armor vs ${k}`} onChange={(n) => { const bv = { ...a.bonusVs }; if (n) bv[k] = n; else delete bv[k]; set({ bonusVs: bv }); }} />
            </span>
          ))}
        </span>
        <div className="mt-2"><Toggle checked={a.metal} onChange={(v) => set({ metal: v })} title="Metal armor hinders spellcasting">Metal</Toggle></div>
      </Cell>
      <Cell label="Cost"><CostInput value={a.cost} onChange={(c) => set({ cost: c })} /></Cell>
      <Supply value={a.supply} onChange={(v) => set({ supply: v })} />
      <Bonuses value={a.benefits} onChange={(b) => set({ benefits: b })} />
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} maxLength={1000} value={a.notes} onChange={(e) => set({ notes: e.target.value })} />
      </Cell>
    </>
  );
}
export function ArmorPreview({ name, a }: { name: string; a: ArmorDraft }) {
  const bv = Object.entries(a.bonusVs).map(([k, n]) => `+${n} vs ${k}`).join(", ");
  return (
    <Preview title={name || "Unnamed armor"} subtitle={a.slot === "helmet" ? "Helmet" : "Armor"}>
      <Row k="Armor rating" v={String(a.rating)} /><Row k="Bane on" v={a.banes.join(", ") || "—"} />
      {bv ? <Row k="Damage types" v={bv} /> : null}
      <Row k="Cost" v={fmtCost(a.cost)} /><Row k="Supply" v={a.supply} />{a.metal ? <Row k="Metal" v="yes" /> : null}
      <PreviewBadges value={a.benefits} />
      {a.notes ? <p className="whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{a.notes}</p> : null}
    </Preview>
  );
}

// ═══ GEAR ════════════════════════════════════════════════════════════════════
export type GearDraft = {
  category: string; cost: DbCostDraft; supply: string; weight: string; doses: number | null; focus: boolean;
  light: { radius: number; die: number } | null; effect: string; benefits: Badge[];
};
export const blankGear = (): GearDraft => ({ category: "Trade Goods", cost: { amount: 5, unit: "silver" }, supply: "Common", weight: "1", doses: null, focus: false, light: null, effect: "", benefits: [] });
export function gearFromData(d: Data): GearDraft {
  const w = d.weight === null ? "none" : d.weight === "tiny" || d.weight === 0 || d.weight === "0" ? "0" : String(d.weight ?? "1");
  const l = (d.light ?? null) as Data | null;
  return {
    category: String(d.category ?? "Trade Goods"), cost: costFromData(d, "silver"), supply: String(d.supply ?? "Common"), weight: w,
    doses: numOrNull(d.doses), focus: !!d.focus, light: l ? { radius: Number(l.radius) || 10, die: parseInt(String(l.die ?? "6").replace(/\D/g, ""), 10) || 6 } : null,
    effect: String(d.effect ?? ""), benefits: benefitsOf(d),
  };
}
export function gearPayload(name: string, g: GearDraft): Data {
  return {
    name, category: g.category, costAmount: g.cost.amount, costUnit: g.cost.unit, supply: g.supply, weight: g.weight,
    doses: g.doses, focus: g.focus, light: g.light ? { radius: g.light.radius, die: `D${g.light.die}` } : null, effect: g.effect, benefits: g.benefits,
  };
}
export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  return (
    <>
      <Cell label="Category"><Select value={g.category} options={DB_GEAR_CATS} ariaLabel="category" onChange={(v) => set({ category: v })} /></Cell>
      <Cell label="Weight" help="Items you carry count against STR/2 (rounded up). Tiny items don't count.">
        <Select value={g.weight} options={DB_WEIGHTS} ariaLabel="weight" onChange={(v) => set({ weight: v })} />
      </Cell>
      <Cell label="Cost"><CostInput value={g.cost} onChange={(c) => set({ cost: c })} /></Cell>
      <Supply value={g.supply} onChange={(v) => set({ supply: v })} />
      <Cell label="Uses" help="Doses: the sheet tracks them on the row.">
        <span className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">Doses <Stepper value={g.doses} min={1} max={50} nullable width="2.2em" ariaLabel="doses" onChange={(v) => set({ doses: v })} /></span>
          <Toggle checked={g.focus} onChange={(v) => set({ focus: v })} title="Held in hand as a spellcasting focus">Spell focus</Toggle>
        </span>
      </Cell>
      <Cell label="Light source" help="Roll the die after each stretch — on a 1 it goes out.">
        <span className="flex flex-wrap items-center gap-2">
          <Toggle checked={!!g.light} onChange={(v) => set({ light: v ? { radius: 10, die: 6 } : null })}>Gives light</Toggle>
          {g.light ? (
            <>
              <Stepper value={g.light.radius} min={1} max={50} width="2.2em" ariaLabel="light radius" onChange={(v) => set({ light: { ...g.light!, radius: v ?? 10 } })} />
              <span className="text-[12px] text-[var(--muted)]">m · D</span>
              <Select value={String(g.light.die)} options={["4", "6", "8", "10", "12"]} ariaLabel="light die" onChange={(v) => set({ light: { ...g.light!, die: Number(v) } })} />
            </>
          ) : null}
        </span>
      </Cell>
      <Bonuses value={g.benefits} onChange={(b) => set({ benefits: b })} />
      <Cell label="Effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} maxLength={2000} value={g.effect} placeholder="What it does…" onChange={(e) => set({ effect: e.target.value })} />
      </Cell>
    </>
  );
}
export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  return (
    <Preview title={name || "Unnamed gear"} subtitle={g.category}>
      <Row k="Cost" v={fmtCost(g.cost)} /><Row k="Supply" v={g.supply} /><Row k="Weight" v={DB_WEIGHTS.find(([k]) => k === g.weight)?.[1] ?? g.weight} />
      {g.doses ? <Row k="Doses" v={String(g.doses)} /> : null}
      {g.light ? <Row k="Light" v={`${g.light.radius} m · D${g.light.die}`} /> : null}
      {g.focus ? <Row k="Focus" v="yes" /> : null}
      <PreviewBadges value={g.benefits} />
      <p className="whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{g.effect || "—"}</p>
    </Preview>
  );
}
