"use client";
// ── Shadowdark homebrew gear builder ─────────────────────────────────────────
// Items are built from kind chips, steppers, a weapon dice builder, property
// chips and bonus badges. Storage (type "gear") is unchanged — exactly what the
// SD sheet's shop / equip code already reads:
//   name, kind, gp|sp|cp, slots, qty, note, equippable,
//   weapon: wtype, range, damage ("1d8" / versatile "1d8/1d10"), props
//     ("Finesse, Thrown"), ammo;  armor: acBase, acDex;  shield: acBonus;
//   bonuses: [{amount, target}] — shown as badges (./effects gearBonusKinds),
//     applied by the sheet while the item is equipped.
import BonusBadges, { BadgeStrip, type Badge } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { type Dice } from "../dice";
import { badgesToGearBonuses, gearBonusesToBadges, gearBonusKinds, gearBonusStats, type GearBonus } from "./effects";
import { composeSdWeaponDamage, parseSdWeaponDamage } from "./rules";

export const SD_GEAR_KINDS: [string, string][] = [
  ["gear", "Gear"], ["weapon", "Weapon"], ["armor", "Armor"], ["shield", "Shield"], ["magic", "Magic Item"], ["ammo", "Ammo"],
];
// Mirrors WEAPON_RANGES in lib/homebrew.ts.
const WEAPON_RANGES = ["Close", "Near", "Far", "Close/Near", "Close/Far"];
const WEAPON_PROPS = ["Finesse", "Loading", "Thrown", "Two-handed", "Versatile", "Reach"];
const WTYPES: [string, string][] = [["M", "Melee"], ["R", "Ranged"], ["M/R", "Melee / Ranged"]];

export type GearDraft = {
  kind: string;
  cost: number | null;
  costUnit: string;
  slots: string; // kept as text so an odd legacy value survives until edited
  qty: string;
  note: string;
  wtype: string;
  range: string;
  dmg: Dice;
  versatile: Dice | null;
  props: string[];
  ammo: string;
  acBase: number;
  acDex: boolean;
  acBonus: number;
  bonuses: Badge[];
  equippable: boolean;
};

const int = (v: unknown, d: number | null) => {
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : d;
};

export function blankGear(): GearDraft {
  return {
    kind: "gear", cost: null, costUnit: "gp", slots: "1", qty: "", note: "",
    wtype: "M", range: "Close", dmg: { n: 1, d: 6, m: 0 }, versatile: null, props: [], ammo: "",
    acBase: 11, acDex: true, acBonus: 2, bonuses: [], equippable: false,
  };
}

export function gearFromData(d: Record<string, unknown>): GearDraft {
  const unit = ["gp", "sp", "cp"].find((u) => d[u] != null) || "gp";
  const dmg = parseSdWeaponDamage(String(d.damage ?? "1d4"));
  return {
    kind: String(d.kind || "gear"),
    cost: int(d[unit], null),
    costUnit: unit,
    slots: String(d.slots ?? ""),
    qty: String(d.qty ?? ""),
    note: String(d.note ?? ""),
    wtype: String(d.wtype || "M"),
    range: String(d.range || "Close"),
    dmg: dmg.main,
    versatile: dmg.versatile,
    props: String(d.props ?? "").split(",").map((x) => x.trim()).filter(Boolean),
    ammo: String(d.ammo ?? ""),
    acBase: int(d.acBase, 11) ?? 11,
    acDex: !!d.acDex,
    acBonus: int(d.acBonus, 2) ?? 2,
    bonuses: gearBonusesToBadges(Array.isArray(d.bonuses) ? (d.bonuses as GearBonus[]) : []),
    equippable: !!d.equippable,
  };
}

const damageText = (g: GearDraft) => composeSdWeaponDamage(g.dmg, g.props.includes("Versatile") || g.versatile ? g.versatile ?? g.dmg : null);

export function gearPayload(name: string, g: GearDraft): Record<string, unknown> {
  return {
    name,
    kind: g.kind,
    cost: g.cost ?? "",
    costUnit: g.costUnit,
    slots: g.slots,
    qty: g.qty,
    note: g.note,
    wtype: g.wtype,
    ammo: g.ammo,
    range: g.range,
    damage: damageText(g),
    props: g.props.join(", "),
    acBase: g.acBase,
    acDex: g.acDex,
    acBonus: g.acBonus,
    bonuses: badgesToGearBonuses(g.bonuses),
    equippable: g.equippable,
  };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls =
  "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";

export default function GearBuilder({
  value: g,
  onChange,
  ammoOptions,
}: {
  value: GearDraft;
  onChange: (g: GearDraft) => void;
  ammoOptions: string[];
}) {
  const set = <K extends keyof GearDraft>(k: K, v: GearDraft[K]) => onChange({ ...g, [k]: v });
  const vers = g.props.includes("Versatile") || !!g.versatile;
  return (
    <>
      <div className="sm:col-span-2">
        <label className={lbl}>Kind</label>
        <ChipPicker single options={SD_GEAR_KINDS} value={[g.kind]} onChange={(v) => set("kind", v[0] ?? "gear")} />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-3">
        <div>
          <label className={lbl}>Cost</label>
          <div className="flex items-center gap-2">
            <Stepper value={g.cost} min={0} max={100000} nullable width="4em" ariaLabel="cost" onChange={(v) => set("cost", v)} />
            <select className={selCls} aria-label="coin" value={g.costUnit} onChange={(e) => set("costUnit", e.target.value)}>
              <option value="gp">gp</option>
              <option value="sp">sp</option>
              <option value="cp">cp</option>
            </select>
          </div>
        </div>
        <div>
          <label className={lbl}>Gear slots</label>
          <Stepper value={int(g.slots, null)} min={0} max={20} nullable ariaLabel="gear slots" onChange={(v) => set("slots", v == null ? "" : String(v))} />
        </div>
        <div>
          <label className={lbl}>Per slot (optional)</label>
          <Stepper value={int(g.qty, null)} min={1} max={999} nullable ariaLabel="quantity per slot" onChange={(v) => set("qty", v == null ? "" : String(v))} />
        </div>
      </div>

      {g.kind === "weapon" ? (
        <>
          <div>
            <label className={lbl}>Weapon type</label>
            <ChipPicker single options={WTYPES} value={[g.wtype]} onChange={(v) => set("wtype", v[0] ?? "M")} />
          </div>
          <div>
            <label className={lbl}>Range</label>
            <select className={`${selCls} w-full`} value={g.range} onChange={(e) => set("range", e.target.value)}>
              {WEAPON_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-3">
            <div>
              <label className={lbl}>{vers ? "Damage (one-handed)" : "Damage"}</label>
              <DiceInput value={g.dmg} dice={[4, 6, 8, 10, 12]} minCount={0} maxCount={6} modMin={-5} modMax={5} onChange={(v) => set("dmg", v)} />
            </div>
            {vers ? (
              <div>
                <label className={lbl}>Two-handed</label>
                <DiceInput value={g.versatile ?? g.dmg} dice={[4, 6, 8, 10, 12]} minCount={0} maxCount={6} modMin={-5} modMax={5} onChange={(v) => set("versatile", v)} />
              </div>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <label className={lbl}>Properties</label>
            <ChipPicker
              options={WEAPON_PROPS}
              value={g.props}
              custom
              customPh="Other property…"
              onChange={(v) => onChange({ ...g, props: v, versatile: v.includes("Versatile") ? g.versatile ?? { ...g.dmg, d: Math.min(12, g.dmg.d + 2) } : null })}
            />
          </div>
          <div>
            <label className={lbl}>Requires ammo</label>
            <select className={`${selCls} w-full`} value={g.ammo} onChange={(e) => set("ammo", e.target.value)}>
              <option value="">— None —</option>
              {ammoOptions.map((a) => <option key={a} value={a}>{a}</option>)}
              {g.ammo && !ammoOptions.includes(g.ammo) ? <option value={g.ammo}>{g.ammo} (missing)</option> : null}
            </select>
          </div>
        </>
      ) : null}

      {g.kind === "armor" ? (
        <div className="sm:col-span-2 flex flex-wrap items-end gap-x-5 gap-y-3">
          <div>
            <label className={lbl}>Base AC</label>
            <Stepper value={g.acBase} min={8} max={20} ariaLabel="base AC" onChange={(v) => set("acBase", v ?? 11)} />
          </div>
          <label className="flex items-center gap-2 pb-2 text-sm text-[var(--text)]">
            <input type="checkbox" checked={g.acDex} onChange={(e) => set("acDex", e.target.checked)} />
            Adds DEX modifier
          </label>
        </div>
      ) : null}

      {g.kind === "shield" ? (
        <div>
          <label className={lbl}>AC bonus</label>
          <Stepper value={g.acBonus} min={0} max={5} signed ariaLabel="shield AC bonus" onChange={(v) => set("acBonus", v ?? 2)} />
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <label className={lbl}>Description</label>
        <textarea className={fieldCls} rows={2} value={g.note} maxLength={4000} onChange={(e) => set("note", e.target.value)} />
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Bonuses (applied while equipped)</label>
        <BonusBadges
          value={g.bonuses}
          kinds={gearBonusKinds}
          stats={gearBonusStats}
          max={12}
          empty="No bonuses"
          onChange={(v) => onChange({ ...g, bonuses: v, equippable: g.equippable || (v.length > g.bonuses.length) })}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-center gap-2 text-sm text-[var(--text)]">
          <input type="checkbox" checked={g.equippable} onChange={(e) => set("equippable", e.target.checked)} />
          Equippable (shows an equip checkbox in the gear list)
        </label>
      </div>
    </>
  );
}

const KIND_LABEL: Record<string, string> = Object.fromEntries(SD_GEAR_KINDS);

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const facts: [string, string][] = [];
  if (g.cost != null && g.cost > 0) facts.push(["Cost", `${g.cost} ${g.costUnit}`]);
  if (g.slots) facts.push(["Slots", g.qty ? `${g.slots} (${g.qty} per slot)` : g.slots]);
  if (g.kind === "weapon") {
    facts.push(["Type", WTYPES.find(([k]) => k === g.wtype)?.[1] ?? g.wtype]);
    facts.push(["Range", g.range]);
    facts.push(["Damage", damageText(g)]);
    if (g.ammo) facts.push(["Ammo", g.ammo]);
  }
  if (g.kind === "armor") facts.push(["AC", `${g.acBase}${g.acDex ? " + DEX mod" : ""}`]);
  if (g.kind === "shield") facts.push(["AC", `+${g.acBonus}`]);
  return (
    <Preview title={name || "Unnamed item"} subtitle={`${KIND_LABEL[g.kind] ?? g.kind}${g.equippable ? " · equippable" : ""}`}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[13px]">
        {facts.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-bold text-[var(--hb-accent)]">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {g.kind === "weapon" && g.props.length ? <p className="mt-1.5 text-[12px] italic text-[var(--muted)]">{g.props.join(", ")}</p> : null}
      {g.bonuses.length ? (
        <div className="mt-2">
          <BadgeStrip value={g.bonuses} kinds={gearBonusKinds} stats={gearBonusStats} />
        </div>
      ) : null}
      {g.note ? <p className="mt-2 text-[13px] leading-relaxed">{g.note}</p> : null}
    </Preview>
  );
}
