"use client";
// ── Pirate Borg homebrew weapon / armor & hat / gear builders ────────────────
// Storage = the book shapes in lib/data/pb-types.ts (PbWeapon, PbClothing /
// PbHat, PbGear) that the /pirate-borg/gear page, the PB sheet's shop / picker
// (public/tools-data/pb-homebrew.js → PB_WEAPONS / PB_CLOTHING / PB_HATS /
// PB_GEAR) and the GM Screen read, all composed here from pickers:
//   weapon: type, damage ("d6" / "2d4", from dice), hands, reach / range (feet),
//     blackPowder + reload (actions) + ammo, thrown, sword, pistol,
//     damageFromAmmo, closeDamage + closeRange (blunderbuss-style), targetTest
//     {ability, dr}, cost (silver), special
//   armor: slot clothing → tier (armorDie derived), agilityDR / defenseDR
//     (auto from the tier: tier 2 +2/+2, tier 3 +4/+2), metal; slot hat →
//     damageReduction, sacrifice, metal; cost, special
//   gear: category, cost / costText, capacity, uses ("d6" | "PRESENCE + 4"),
//     consumable, heal, duration, light, effect
// All three carry `benefits` (LootBonus "pb" badges: ability, attack, damage,
// defense, armor tier, HP, relic, ritual, note — the GM Screen loot builder's
// kinds). The sheet copies them onto the inventory row (bv:2) when the item is
// bought / added, so equipping applies them and unequipping reverses them.
// Legacy records open as-is (a damage string that isn't one roll stays text).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import LootBonusBadges, { useLootBonus } from "../LootBonusBadges";
import { BadgeStrip, type Badge } from "../BonusBadges";
import Preview from "../Preview";
import Stepper from "../Stepper";
import type { Dice } from "../dice";
import {
  PB_ARMOR_TIERS, PB_DAMAGE_HINTS, PB_DICE, blankDuration, blankUses, fmtDuration, fmtPb, fmtS, fmtTest, fmtUses, noSDice, parseDuration, parsePb,
  parseS, parseUses, cleanTest, type PbDuration, type PbTest, type PbUses, type SDice,
} from "./rules";
import { Cell, DurationInput, SDiceInput, Select, TestInput, Toggle, fieldCls, hint, smallBtn } from "./ui";

type Data = Record<string, unknown>;
export const PB_JS = ["/tools-data/pb-data.js"]; // relic / ritual names for the badge pickers
const num = (v: unknown, d: number) => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : d; };
const benefitsOf = (d: Data): Badge[] => (Array.isArray(d.benefits) ? (d.benefits as Badge[]) : []);

function Bonuses({ value, onChange }: { value: Badge[]; onChange: (v: Badge[]) => void }) {
  return (
    <Cell label="Bonuses" className="sm:col-span-2" help="Applied on the character sheet while it's equipped or worn; unequipping or deleting it takes them off again. Same badges as the GM Screen loot builder.">
      <LootBonusBadges sys="pb" scripts={PB_JS} value={value} empty="No bonuses yet" onChange={onChange} />
    </Cell>
  );
}
function PreviewBadges({ value }: { value: Badge[] }) {
  const L = useLootBonus("pb", PB_JS);
  return <div className="my-2"><BadgeStrip value={value} kinds={L.kinds} stats={L.stats} empty="No automated bonuses" /></div>;
}
function Cost({ value, onChange, help }: { value: number; onChange: (v: number) => void; help?: string }) {
  return (
    <Cell label="Cost (silver)" help={help ?? "0 = not for sale (can't be bought in the shop)."}>
      <span className="flex items-center gap-1"><Stepper value={value} min={0} max={1_000_000} width="4.5em" ariaLabel="cost" onChange={(v) => onChange(v ?? 0)} /><span className="text-[12px] text-[var(--muted)]">s</span></span>
    </Cell>
  );
}

// ═══ WEAPONS ═════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  type: "melee" | "ranged"; dice: Dice; dmgText: string; hands: 1 | 2; reach: number; range: number;
  blackPowder: boolean; reload: number; ammo: string; pistol: boolean; damageFromAmmo: boolean;
  thrown: boolean; sword: boolean; closeOn: boolean; closeDice: Dice; closeRange: number;
  test: PbTest; cost: number; special: string; benefits: Badge[];
};
export function blankWeapon(): WeaponDraft {
  return { type: "melee", dice: { n: 1, d: 6, m: 0 }, dmgText: "", hands: 1, reach: 0, range: 0, blackPowder: false, reload: 2, ammo: "", pistol: false, damageFromAmmo: false,
    thrown: false, sword: false, closeOn: false, closeDice: { n: 1, d: 10, m: 0 }, closeRange: 10, test: null, cost: 20, special: "", benefits: [] };
}
export function weaponFromData(d: Data): WeaponDraft {
  const b = blankWeapon();
  const dice = parsePb(d.damage ?? "");
  const close = d.closeDamage ? parsePb(d.closeDamage) : null;
  return {
    ...b, type: d.type === "ranged" ? "ranged" : "melee",
    dice: dice ?? b.dice, dmgText: dice ? "" : String(d.damage ?? ""),
    hands: num(d.hands, 1) === 2 ? 2 : 1, reach: num(d.reach, 0), range: num(d.range, 0),
    blackPowder: !!d.blackPowder, reload: num(d.reload, 2) || 2, ammo: String(d.ammo ?? ""), pistol: !!d.pistol, damageFromAmmo: !!d.damageFromAmmo,
    thrown: !!d.thrown, sword: !!d.sword, closeOn: !!close, closeDice: close ?? b.closeDice, closeRange: num(d.closeRange, 10),
    test: cleanTest(d.targetTest), cost: num(d.cost, 0), special: String(d.special ?? ""), benefits: benefitsOf(d),
  };
}
const wDamage = (w: WeaponDraft) => (w.damageFromAmmo ? "" : w.dmgText.trim() || fmtPb(w.dice));
export function weaponPayload(name: string, w: WeaponDraft): Data {
  const ranged = w.type === "ranged";
  return {
    name, type: w.type, damage: wDamage(w) || null, cost: w.cost || null, hands: w.hands,
    reach: !ranged && w.reach ? w.reach : null, range: ranged && w.range ? w.range : null,
    blackPowder: w.blackPowder, reload: w.blackPowder ? w.reload : null, ammo: !ranged ? null : w.ammo || (w.blackPowder ? "shot" : null),
    pistol: w.blackPowder && ranged && w.pistol, damageFromAmmo: ranged && w.damageFromAmmo,
    thrown: !ranged && w.thrown, sword: !ranged && w.sword,
    closeDamage: ranged && w.closeOn ? fmtPb(w.closeDice) : "", closeRange: w.closeRange,
    targetTest: w.test, special: w.special, benefits: w.benefits,
  };
}
export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  const ranged = w.type === "ranged";
  const dmgKey = fmtPb(w.dice);
  return (
    <>
      <Cell label="Type">
        <ChipPicker single options={[["melee", "Melee (STRENGTH DR12)"], ["ranged", "Ranged (PRESENCE DR12)"]]} value={[w.type]} onChange={(v) => v[0] && set({ type: v[0] as WeaponDraft["type"] })} />
      </Cell>
      <Cell label="Hands">
        <ChipPicker single options={[["1", "One-handed"], ["2", "Two-handed"]]} value={[String(w.hands)]} onChange={(v) => v[0] && set({ hands: v[0] === "2" ? 2 : 1 })} />
      </Cell>
      <Cell label="Damage" className="sm:col-span-2" help={w.damageFromAmmo ? "Damage comes from the darts / ammo loaded." : PB_DAMAGE_HINTS[dmgKey] ? `Book scale: ${dmgKey} = ${PB_DAMAGE_HINTS[dmgKey]}.` : undefined}>
        {w.damageFromAmmo ? null : w.dmgText ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[220px]`} value={w.dmgText} maxLength={40} onChange={(e) => set({ dmgText: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => set({ dmgText: "" })}>Use dice picker</button>
          </span>
        ) : (
          <DiceInput value={w.dice} dice={PB_DICE} minCount={1} maxCount={6} modMin={-3} modMax={10} ariaLabel="damage" onChange={(v) => set({ dice: v })} />
        )}
        {ranged ? <div className="mt-2"><Toggle checked={w.damageFromAmmo} onChange={(v) => set({ damageFromAmmo: v })}>Damage from its ammo (blowpipe darts)</Toggle></div> : null}
      </Cell>
      {ranged ? (
        <Cell label="Range (feet)" help="0 = not stated.">
          <Stepper value={w.range} min={0} max={1000} step={5} width="3.4em" ariaLabel="range" onChange={(v) => set({ range: v ?? 0 })} />
        </Cell>
      ) : (
        <Cell label="Reach (feet)" help="0 = normal reach. Pikes and whips have 10'.">
          <Stepper value={w.reach} min={0} max={30} step={5} width="2.6em" ariaLabel="reach" onChange={(v) => set({ reach: v ?? 0 })} />
        </Cell>
      )}
      <Cell label="Properties">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Toggle checked={w.blackPowder} onChange={(v) => set({ blackPowder: v })} title="Ignores armor; a fumble misfires">Black powder</Toggle>
          {!ranged ? <Toggle checked={w.thrown} onChange={(v) => set({ thrown: v })} title="Can be thrown: AGILITY DR12">Can be thrown</Toggle> : null}
          {!ranged ? <Toggle checked={w.sword} onChange={(v) => set({ sword: v })} title="Counts as a sword for class features">Counts as a sword</Toggle> : null}
          {ranged && w.blackPowder ? <Toggle checked={w.pistol} onChange={(v) => set({ pistol: v })}>Pistol</Toggle> : null}
        </div>
      </Cell>
      {w.blackPowder ? (
        <Cell label="Reload (actions)" help="The book's black powder weapons take 2 actions.">
          <Stepper value={w.reload} min={1} max={6} width="2.2em" ariaLabel="reload" onChange={(v) => set({ reload: v ?? 2 })} />
        </Cell>
      ) : null}
      {ranged ? (
        <Cell label="Ammo" help={w.blackPowder ? "Black powder weapons use shot unless you pick otherwise." : undefined}>
          <Select value={w.ammo || (w.blackPowder ? "shot" : "")} options={[["", "—"], ["shot", "Shot"], ["darts", "Darts"]]} ariaLabel="ammo" onChange={(v) => set({ ammo: v })} />
        </Cell>
      ) : null}
      {ranged ? (
        <Cell label="Close-range damage" className="sm:col-span-2" help="Like the blunderbuss: a bigger die within a few feet.">
          <span className="flex flex-wrap items-center gap-2">
            <Toggle checked={w.closeOn} onChange={(v) => set({ closeOn: v })}>Deals</Toggle>
            {w.closeOn ? (
              <>
                <DiceInput value={w.closeDice} dice={PB_DICE} minCount={1} maxCount={6} mod={false} ariaLabel="close damage" onChange={(v) => set({ closeDice: v })} />
                <span className="text-[12px] text-[var(--muted)]">within</span>
                <Stepper value={w.closeRange} min={5} max={100} step={5} width="2.6em" ariaLabel="close range" onChange={(v) => set({ closeRange: v ?? 10 })} />
                <span className="text-[12px] text-[var(--muted)]">feet</span>
              </>
            ) : null}
          </span>
        </Cell>
      ) : null}
      <Cell label="Target tests" className="sm:col-span-2" help="On a hit the target tests this (the Harpoon Gun: STRENGTH DR12 or is pulled to you). Say what failing does under Special.">
        <TestInput value={w.test} onChange={(v) => set({ test: v })} noneLabel="No test" />
      </Cell>
      <Cost value={w.cost} onChange={(v) => set({ cost: v })} />
      <Bonuses value={w.benefits} onChange={(v) => set({ benefits: v })} />
      <Cell label="Special" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={w.special} maxLength={1000} placeholder="Anything the pickers don't cover…" onChange={(e) => set({ special: e.target.value })} />
      </Cell>
    </>
  );
}
export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const p = weaponPayload(name, w);
  const bits = [
    p.damage ? String(p.damage) : w.damageFromAmmo ? "ammo damage" : "—",
    w.hands === 2 ? "two-handed" : "", p.reach ? `${p.reach}' reach` : "", p.range ? `${p.range}'` : "",
    w.blackPowder ? `black powder · reload ${w.reload}` : "", p.closeDamage ? `${p.closeDamage} within ${w.closeRange}'` : "",
    w.thrown ? "throwable" : "", w.sword ? "sword" : "", w.pistol ? "pistol" : "",
  ].filter(Boolean);
  return (
    <Preview title={name || "Unnamed weapon"} subtitle={`${w.type === "ranged" ? "Ranged · PRESENCE DR12" : "Melee · STRENGTH DR12"}${w.cost ? ` · ${w.cost}s` : ""}`}>
      <p className="font-mono text-[13px]">{bits.join(" · ")}</p>
      {w.blackPowder ? <p className="text-[12px] text-[var(--muted)]">Ignores armor. A fumble misfires.</p> : null}
      {w.test ? <p className="text-[12px]">Target tests {fmtTest(w.test)}.</p> : null}
      <PreviewBadges value={w.benefits} />
      {w.special ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{w.special}</p> : null}
    </Preview>
  );
}

// ═══ CLOTHING, ARMOR & HATS ══════════════════════════════════════════════════
export type ArmorDraft = {
  slot: "clothing" | "hat"; tier: number; drAuto: boolean; agilityDR: number; defenseDR: number;
  damageReduction: number; sacrifice: boolean; metal: boolean; cost: number; special: string; benefits: Badge[];
};
export function blankArmor(): ArmorDraft {
  return { slot: "clothing", tier: 1, drAuto: true, agilityDR: 0, defenseDR: 0, damageReduction: 0, sacrifice: false, metal: false, cost: 20, special: "", benefits: [] };
}
export function armorFromData(d: Data): ArmorDraft {
  const tier = Math.max(0, Math.min(3, num(d.tier, 0)));
  const t = PB_ARMOR_TIERS[tier];
  const a = num(d.agilityDR, t.agilityDR), df = num(d.defenseDR, t.defenseDR);
  return {
    slot: d.slot === "hat" ? "hat" : "clothing", tier, drAuto: a === t.agilityDR && df === t.defenseDR, agilityDR: a, defenseDR: df,
    damageReduction: num(d.damageReduction, 0), sacrifice: !!d.sacrifice, metal: !!d.metal, cost: num(d.cost, 0), special: String(d.special ?? ""), benefits: benefitsOf(d),
  };
}
const armorDRs = (a: ArmorDraft) => (a.drAuto ? { agilityDR: PB_ARMOR_TIERS[a.tier].agilityDR, defenseDR: PB_ARMOR_TIERS[a.tier].defenseDR } : { agilityDR: a.agilityDR, defenseDR: a.defenseDR });
export function armorPayload(name: string, a: ArmorDraft): Data {
  const base = { name, slot: a.slot, cost: a.cost || null, metal: a.metal, special: a.special, benefits: a.benefits };
  return a.slot === "hat" ? { ...base, damageReduction: a.damageReduction, sacrifice: a.sacrifice } : { ...base, tier: a.tier, ...armorDRs(a) };
}
export function ArmorBuilder({ value: a, onChange }: { value: ArmorDraft; onChange: (v: ArmorDraft) => void }) {
  const set = (p: Partial<ArmorDraft>) => onChange({ ...a, ...p });
  const dr = armorDRs(a);
  return (
    <>
      <Cell label="Slot" className="sm:col-span-2">
        <ChipPicker single options={[["clothing", "Clothing / armor"], ["hat", "Hat"]]} value={[a.slot]} onChange={(v) => v[0] && set({ slot: v[0] as ArmorDraft["slot"] })} />
      </Cell>
      {a.slot === "clothing" ? (
        <>
          <Cell label="Armor tier" className="sm:col-span-2" help="The die is subtracted from damage you take. Black powder ignores armor.">
            <ChipPicker single options={PB_ARMOR_TIERS.map((t) => [String(t.tier), `Tier ${t.tier} · ${t.name}${t.die ? ` −${t.die}` : ""}`] as [string, string])} value={[String(a.tier)]} onChange={(v) => v[0] && set({ tier: parseInt(v[0], 10) })} />
          </Cell>
          <Cell label="DR penalties" className="sm:col-span-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Toggle checked={a.drAuto} onChange={(v) => set({ drAuto: v, ...(v ? {} : dr) })}>Auto from tier</Toggle>
              <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">AGILITY tests DR +
                <Stepper value={dr.agilityDR} min={0} max={10} width="2em" ariaLabel="agility DR" onChange={(v) => set({ drAuto: false, ...dr, agilityDR: v ?? 0 })} /></span>
              <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">Defense DR +
                <Stepper value={dr.defenseDR} min={0} max={10} width="2em" ariaLabel="defense DR" onChange={(v) => set({ drAuto: false, ...dr, defenseDR: v ?? 0 })} /></span>
            </div>
            <p className={hint}>Book: tier 2 is +2 / +2, tier 3 is +4 / +2.</p>
          </Cell>
        </>
      ) : (
        <>
          <Cell label="Damage reduction" help="−N from each hit while worn (0 = none).">
            <Stepper value={a.damageReduction} min={0} max={6} width="2em" ariaLabel="damage reduction" onChange={(v) => set({ damageReduction: v ?? 0 })} />
          </Cell>
          <Cell label="Sacrifice">
            <Toggle checked={a.sacrifice} onChange={(v) => set({ sacrifice: v })}>Can break to ignore all damage from one attack</Toggle>
          </Cell>
        </>
      )}
      <Cell label="Material">
        <Toggle checked={a.metal} onChange={(v) => set({ metal: v })} title="Relics and rituals almost never work for its wearer">Metal</Toggle>
      </Cell>
      <Cost value={a.cost} onChange={(v) => set({ cost: v })} />
      <Bonuses value={a.benefits} onChange={(v) => set({ benefits: v })} />
      <Cell label="Special" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={a.special} maxLength={1000} placeholder="You look amazing." onChange={(e) => set({ special: e.target.value })} />
      </Cell>
    </>
  );
}
export function ArmorPreview({ name, a }: { name: string; a: ArmorDraft }) {
  const t = PB_ARMOR_TIERS[a.tier], dr = armorDRs(a);
  const line = a.slot === "hat"
    ? [a.damageReduction ? `−${a.damageReduction} damage` : "no protection", a.sacrifice ? "can break to ignore one attack" : ""]
    : [`Tier ${a.tier}${t.die ? ` · −${t.die}` : " · no protection"}`, dr.agilityDR ? `AGILITY DR +${dr.agilityDR}` : "", dr.defenseDR ? `defense DR +${dr.defenseDR}` : ""];
  return (
    <Preview title={name || (a.slot === "hat" ? "Unnamed hat" : "Unnamed armor")} subtitle={`${a.slot === "hat" ? "Hat" : t.name + " armor"}${a.metal ? " · metal" : ""}${a.cost ? ` · ${a.cost}s` : ""}`}>
      <p className="font-mono text-[13px]">{line.filter(Boolean).join(" · ")}</p>
      {a.metal ? <p className="text-[12px] text-[var(--muted)]">Relics and rituals almost never work while worn.</p> : null}
      <PreviewBadges value={a.benefits} />
      {a.special ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{a.special}</p> : null}
    </Preview>
  );
}

// ═══ GEAR ════════════════════════════════════════════════════════════════════
export type GearDraft = {
  category: string; cost: number; costText: string; capacity: number; uses: PbUses; consumable: boolean;
  heal: SDice; duration: PbDuration; light: boolean; effect: string; benefits: Badge[];
};
export function blankGear(): GearDraft {
  return { category: "gear", cost: 5, costText: "", capacity: 0, uses: blankUses(), consumable: false, heal: noSDice(), duration: blankDuration(), light: false, effect: "", benefits: [] };
}
export function gearFromData(d: Data): GearDraft {
  const cost = num(d.cost, 0);
  const ct = String(d.costText ?? "");
  return {
    category: ["gear", "container", "vessel"].includes(String(d.category)) ? String(d.category) : "gear",
    cost, costText: ct && ct !== `${cost}s` && ct !== "—" ? ct : "", capacity: num(d.capacity, 0),
    uses: parseUses(d.uses), consumable: !!d.consumable, heal: parseS(d.heal) ?? noSDice(), duration: parseDuration(d.duration),
    light: !!d.light, effect: String(d.effect ?? ""), benefits: benefitsOf(d),
  };
}
export function gearPayload(name: string, g: GearDraft): Data {
  return {
    name, category: g.category, cost: g.cost || null, costText: g.costText.trim(), capacity: g.category === "container" ? g.capacity || null : null,
    uses: fmtUses(g.uses), consumable: g.consumable, heal: fmtS({ ...g.heal, spirit: false }), duration: fmtDuration(g.duration),
    light: g.light, effect: g.effect, benefits: g.benefits,
  };
}
export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const u = g.uses;
  const setU = (p: Partial<PbUses>) => set({ uses: { ...u, ...p } });
  return (
    <>
      <Cell label="Category" className="sm:col-span-2">
        <ChipPicker single options={[["gear", "Gear"], ["container", "Container"], ["vessel", "Vessel (not carried)"]]} value={[g.category]} onChange={(v) => v[0] && set({ category: v[0] })} />
      </Cell>
      {g.category === "container" ? (
        <Cell label="Holds (items)" help="Carrying slots inside it (a backpack holds 10).">
          <Stepper value={g.capacity} min={0} max={500} width="3em" ariaLabel="capacity" onChange={(v) => set({ capacity: v ?? 0 })} />
        </Cell>
      ) : null}
      <Cost value={g.cost} onChange={(v) => set({ cost: v })} />
      <Cell label="Price text" help="Only for a price range (“20-200s”); otherwise the cost is shown.">
        <input className={fieldCls} value={g.costText} maxLength={30} placeholder={g.cost ? `${g.cost}s` : "—"} onChange={(e) => set({ costText: e.target.value })} />
      </Cell>
      <Cell label="Uses" className="sm:col-span-2">
        {u.text ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[200px]`} value={u.text} maxLength={40} onChange={(e) => setU({ text: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => setU({ text: "" })}>Use picker</button>
          </span>
        ) : (
          <span className="flex flex-wrap items-center gap-2">
            <Select value={u.mode} options={[["", "Unlimited / not counted"], ["dice", "Rolled (dice)"], ["ability", "Ability + N"]]} ariaLabel="uses" onChange={(v) => setU({ mode: v as PbUses["mode"] })} />
            {u.mode === "dice" ? <DiceInput value={u.dice} dice={PB_DICE} minCount={0} maxCount={10} modMin={0} modMax={20} ariaLabel="uses" onChange={(v) => setU({ dice: v })} /> : null}
            {u.mode === "ability" ? (
              <>
                <Select value={u.ability} options={["STRENGTH", "AGILITY", "PRESENCE", "TOUGHNESS", "SPIRIT"]} ariaLabel="uses ability" onChange={(v) => setU({ ability: v })} />
                <Stepper value={u.plus} min={-10} max={20} signed width="2.4em" ariaLabel="uses plus" onChange={(v) => setU({ plus: v ?? 0 })} />
              </>
            ) : null}
          </span>
        )}
      </Cell>
      <Cell label="Heals" help="0 dice = doesn't heal.">
        <SDiceInput value={g.heal} spirit={false} ariaLabel="heal" onChange={(v) => set({ heal: v })} />
      </Cell>
      <Cell label="Lasts" help="0 dice = not timed (a torch burns 1 hour).">
        <DurationInput value={g.duration} onChange={(v) => set({ duration: v })} />
      </Cell>
      <Cell label="Properties" className="sm:col-span-2">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Toggle checked={g.consumable} onChange={(v) => set({ consumable: v })}>Consumable</Toggle>
          <Toggle checked={g.light} onChange={(v) => set({ light: v })}>Light source</Toggle>
        </div>
      </Cell>
      <Bonuses value={g.benefits} onChange={(v) => set({ benefits: v })} />
      <Cell label="Effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={g.effect} maxLength={2000} placeholder="What it does…" onChange={(e) => set({ effect: e.target.value })} />
      </Cell>
    </>
  );
}
export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const p = gearPayload(name, g);
  const bits = [g.category === "gear" ? "" : g.category, p.capacity ? `holds ${p.capacity}` : "", p.uses ? `${p.uses} uses` : "", p.heal ? `heals ${p.heal}` : "", p.duration ? String(p.duration) : "", g.consumable ? "consumable" : "", g.light ? "light" : ""].filter(Boolean);
  return (
    <Preview title={name || "Unnamed gear"} subtitle={g.costText || (g.cost ? `${g.cost}s` : "not for sale")}>
      {bits.length ? <p className="font-mono text-[13px]">{bits.join(" · ")}</p> : null}
      <PreviewBadges value={g.benefits} />
      {g.effect ? <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">{g.effect}</p> : null}
    </Preview>
  );
}
