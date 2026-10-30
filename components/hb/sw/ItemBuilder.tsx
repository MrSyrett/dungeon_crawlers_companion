"use client";
// ── Star Wars homebrew weapon / gear (armor) builders ─────────────────────────
// Storage = the book shapes in lib/data/sw-types.ts (SwWeapon, SwGear) that the
// /sw/equipment page, the SW sheet's shop / browse lists (public/tools-data/
// sw-homebrew.js → SW_WEAPONS / SW_GEAR) and the GM Screen loot list read, all
// composed from `build` (components/hb/sw/rules.ts):
//   weapon: kind, damage (pips) + damageText ("4D", "STR+1D", "3D (stun damage
//     only)"), range ("3-10/11-30/31-120" from the four band edges, meters),
//     skill (the book's lowercase skill name), ammo (shots; new), cost
//     (credits / "Not for sale (—)"), availability ("2, R — note")
//   gear: category, cost, stats — for Armor "Armor code 1D (3 pips); -1D
//     Dexterity" (the sheet reads the first code as the worn armor's pips) plus
//     any other stats text.
// Legacy text that doesn't re-compose exactly stays as editable text.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  SW_BOOK_OPTS, SW_GEAR_CATEGORIES, SW_LEGAL, SW_RANGE_DIFF, SW_RARITY, SW_WEAPON_KINDS, blankGearBuild, blankWeaponBuild, composeAvail, composeCost,
  composeDamage, composeGearStats, composeRange, composeWeapon, fmtNum, gearBuildFrom, swCode, weaponBuildFrom,
  type SwAvail, type SwCost, type SwGearBuild, type SwRange, type SwWeaponBuild,
} from "./rules";
import { Cell, CodeInput, Select, Toggle, fieldCls, skillNames, smallBtn, useSwData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const book = (d: Data) => (["core", "sourcebook", "companion"].includes(sv(d, "book")) ? sv(d, "book") : "companion");

function CostInput({ value: c, onChange }: { value: SwCost; onChange: (v: SwCost) => void }) {
  return (
    <span className="flex flex-col gap-2">
      <ChipPicker single options={[["cr", "Credits"], ["nfs", "Not for sale"], ["none", "Not listed"], ...(c.mode === "text" ? [["text", "As written"] as [string, string]] : [])]} value={[c.mode]} onChange={(v) => v[0] && onChange({ ...c, mode: v[0] as SwCost["mode"] })} />
      {c.mode === "cr" ? <span className="flex items-center gap-1"><Stepper value={c.n} min={0} max={100_000_000} step={25} width="5em" ariaLabel="cost" onChange={(n) => onChange({ ...c, n: n ?? 0 })} /><span className="text-[12px] text-[var(--muted)]">credits</span></span> : null}
      {c.mode === "text" ? <input className={`${fieldCls} max-w-[320px]`} value={c.text} maxLength={80} onChange={(e) => onChange({ ...c, text: e.target.value })} /> : null}
    </span>
  );
}

function AvailInput({ value: a, onChange }: { value: SwAvail; onChange: (v: SwAvail) => void }) {
  if (a.text) {
    return (
      <span className="flex flex-wrap items-center gap-2">
        <input className={`${fieldCls} max-w-[320px]`} value={a.text} maxLength={80} onChange={(e) => onChange({ ...a, text: e.target.value })} />
        <button type="button" className={smallBtn} onClick={() => onChange({ ...a, text: "", r: a.r || 1 })}>Use pickers</button>
      </span>
    );
  }
  return (
    <span className="flex flex-wrap items-center gap-2">
      <Select value={String(a.r)} options={[["0", "— not listed"], ...SW_RARITY.map(([n, l]) => [String(n), l] as [string, string])]} ariaLabel="rarity" onChange={(v) => onChange({ ...a, r: parseInt(v, 10) || 0 })} />
      {a.r ? <Select value={a.code} options={SW_LEGAL} ariaLabel="legality" onChange={(v) => onChange({ ...a, code: v as SwAvail["code"] })} /> : null}
      {a.r ? <input className={`${fieldCls} max-w-[220px]`} value={a.note} maxLength={80} placeholder="note (optional)" onChange={(e) => onChange({ ...a, note: e.target.value })} /> : null}
    </span>
  );
}

function RangeInput({ value: r, onChange }: { value: SwRange; onChange: (v: SwRange) => void }) {
  const set = (p: Partial<SwRange>) => {
    const n = { ...r, ...p };
    n.s = Math.max(n.s, n.pb + 1); n.m = Math.max(n.m, n.s + 1); n.l = Math.max(n.l, n.m + 1);
    onChange(n);
  };
  const step = r.l > 5000 ? 1000 : r.l > 500 ? 50 : 1;
  return (
    <span className="flex flex-col gap-2">
      <ChipPicker single options={[["bands", "Range bands"], ["none", "Melee / none"], ["text", "As written"]]} value={[r.mode]} onChange={(v) => v[0] && set({ mode: v[0] as SwRange["mode"], text: v[0] === "text" ? r.text || composeRange({ ...r, mode: "bands" }) : r.text })} />
      {r.mode === "bands" ? (
        <span className="flex flex-wrap items-end gap-3">
          {([["pb", "Short from"], ["s", "Short to"], ["m", "Medium to"], ["l", "Long to"]] as const).map(([k, l]) => (
            <label key={k} className="flex flex-col gap-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{l}
              <Stepper value={r[k]} min={k === "pb" ? 0 : 1} max={5_000_000} step={k === "pb" ? 1 : step} width="4.2em" ariaLabel={l} onChange={(n) => set({ [k]: n ?? 0 } as Partial<SwRange>)} />
            </label>
          ))}
          <span className="pb-2 text-[12px] text-[var(--muted)]">meters</span>
        </span>
      ) : null}
      {r.mode === "text" ? <input className={`${fieldCls} max-w-[420px]`} value={r.text} maxLength={80} onChange={(e) => set({ text: e.target.value })} /> : null}
    </span>
  );
}

// ═══ WEAPONS ═════════════════════════════════════════════════════════════════
export type WeaponDraft = { b: SwWeaponBuild; notes: string; book: string };
export const blankWeapon = (): WeaponDraft => ({ b: blankWeaponBuild(), notes: "", book: "companion" });
export const weaponFromData = (d: Data): WeaponDraft => ({ b: weaponBuildFrom(d), notes: sv(d, "notes"), book: book(d) });
export function weaponPayload(name: string, w: WeaponDraft): Data {
  return { name, ...composeWeapon(w.b), build: w.b, notes: w.notes, book: w.book };
}
const KIND_SKILL: Record<string, string> = { Blaster: "blaster", Slugthrower: "blaster", Melee: "melee weapons", Thrown: "grenade", Grenade: "grenade", Explosive: "demolition", Heavy: "heavy weapons", Vehicle: "vehicle blasters", Starship: "starship gunnery", Capital: "starship gunnery", Artillery: "heavy weapons" };

export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const data = useSwData();
  const b = w.b;
  const set = (p: Partial<SwWeaponBuild>) => onChange({ ...w, b: { ...b, ...p } });
  const setKind = (kind: string) => {
    const melee = kind === "Melee";
    const p: Partial<SwWeaponBuild> = { kind };
    if (!b.skill || b.skill === KIND_SKILL[b.kind]) p.skill = KIND_SKILL[kind] ?? b.skill;
    if (melee && b.kind !== "Melee") { p.range = { ...b.range, mode: "none" }; if (!b.dmg.text) p.dmg = { ...b.dmg, str: true, pips: 3 }; }
    set(p);
  };
  const skills = [...new Set([...skillNames(data), "melee weapons", "vehicle blasters", ...(b.skill ? [b.skill] : [])])].sort();
  return (
    <>
      <Cell label="Kind"><Select value={b.kind} options={SW_WEAPON_KINDS} ariaLabel="kind" onChange={setKind} /></Cell>
      <Cell label="Skill" help="The skill rolled to hit (book style, lowercase).">
        <Select value={b.skill} options={[["", "—"], ...skills.map((x) => [x, x] as [string, string])]} ariaLabel="skill" onChange={(v) => set({ skill: v })} />
      </Cell>
      <Cell label="Damage" className="sm:col-span-2" help={b.dmg.str ? "Melee: the wielder's Strength code plus this (STR+1D)." : "The damage roll against the target's Strength."}>
        {b.dmg.text ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[420px]`} value={b.dmg.text} maxLength={400} onChange={(e) => set({ dmg: { ...b.dmg, text: e.target.value } })} />
            <button type="button" className={smallBtn} onClick={() => set({ dmg: { ...b.dmg, text: "", pips: b.dmg.pips || 12 } })}>Use code picker</button>
          </span>
        ) : (
          <span className="flex flex-wrap items-center gap-3">
            <Toggle checked={b.dmg.str} onChange={(v) => set({ dmg: { ...b.dmg, str: v } })}>STR +</Toggle>
            <CodeInput value={b.dmg.pips} min={0} max={120} ariaLabel="damage" onChange={(n) => set({ dmg: { ...b.dmg, pips: n ?? 0 } })} />
            <input className={`${fieldCls} max-w-[220px]`} value={b.dmg.note} maxLength={80} placeholder="note (stun damage only…)" onChange={(e) => set({ dmg: { ...b.dmg, note: e.target.value } })} />
          </span>
        )}
      </Cell>
      <Cell label="Range" className="sm:col-span-2" help="Point-blank is anything closer than the short band. Difficulties: Very Easy / Easy / Moderate / Difficult.">
        <RangeInput value={b.range} onChange={(r) => set({ range: r })} />
      </Cell>
      <Cell label="Ammo" help="Shots per power pack or clip. 0 = not tracked.">
        <Stepper value={b.ammo} min={0} max={1000} width="3.4em" ariaLabel="ammo" onChange={(n) => set({ ammo: n ?? 0 })} />
      </Cell>
      <Cell label="Book"><Select value={w.book} options={SW_BOOK_OPTS} ariaLabel="book" onChange={(v) => onChange({ ...w, book: v })} /></Cell>
      <Cell label="Cost"><CostInput value={b.cost} onChange={(c) => set({ cost: c })} /></Cell>
      <Cell label="Availability" help="Rarity 1–4; F = fee/permit, R = restricted, X = illegal."><AvailInput value={b.avail} onChange={(a) => set({ avail: a })} /></Cell>
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={w.notes} maxLength={400} onChange={(e) => onChange({ ...w, notes: e.target.value })} />
      </Cell>
    </>
  );
}

const Line = ({ k, v }: { k: string; v: string }) => (v ? <div><b>{k}</b> {v}</div> : null);
export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const b = w.b, r = b.range;
  return (
    <Preview title={name || "Unnamed weapon"} subtitle={`${b.kind}${b.skill ? ` · ${b.skill}` : ""}`}>
      <div className="flex flex-col gap-1">
        <Line k="Damage" v={composeDamage(b.dmg) || "—"} />
        {r.mode === "bands" ? (
          <table className="my-1 w-full text-[12px]"><tbody>
            {[[`< ${fmtNum(r.pb)}`], [`${fmtNum(r.pb)}–${fmtNum(r.s)}`], [`${fmtNum(r.s + 1)}–${fmtNum(r.m)}`], [`${fmtNum(r.m + 1)}–${fmtNum(r.l)}`]].map(([m], i) => (
              <tr key={i}><td className="pr-2 font-semibold">{SW_RANGE_DIFF[i][0]}</td><td className="pr-2 font-mono">{m} m</td><td className="text-[var(--muted)]">{SW_RANGE_DIFF[i][1]}</td></tr>
            ))}
          </tbody></table>
        ) : <Line k="Range" v={composeRange(r) || (b.kind === "Melee" ? "melee" : "—")} />}
        <Line k="Ammo" v={b.ammo ? `${b.ammo} shots` : ""} />
        <Line k="Cost" v={composeCost(b.cost) ? (b.cost.mode === "cr" ? `${fmtNum(b.cost.n)} credits` : composeCost(b.cost)) : ""} />
        <Line k="Availability" v={composeAvail(b.avail)} />
        {w.notes ? <p className="mt-1 text-[12px] text-[var(--muted)]">{w.notes}</p> : null}
      </div>
    </Preview>
  );
}

// ═══ GEAR / ARMOR ════════════════════════════════════════════════════════════
export type GearDraft = { category: string; b: SwGearBuild; description: string; book: string };
export const blankGear = (): GearDraft => ({ category: "Misc", b: { ...blankGearBuild(), armor: 0 }, description: "", book: "companion" });
export const gearFromData = (d: Data): GearDraft => ({ category: sv(d, "category") || "Misc", b: gearBuildFrom(d), description: sv(d, "description"), book: book(d) });
export function gearPayload(name: string, g: GearDraft): Data {
  const stats = composeGearStats(g.b, g.category), cost = composeCost(g.b.cost);
  return { name, category: g.category, ...(stats ? { stats } : {}), ...(cost ? { cost } : {}), build: g.b, description: g.description, book: g.book };
}
export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const b = g.b;
  const set = (p: Partial<SwGearBuild>) => onChange({ ...g, b: { ...b, ...p } });
  const armor = g.category === "Armor";
  return (
    <>
      <Cell label="Category">
        <Select value={g.category} options={SW_GEAR_CATEGORIES} ariaLabel="category" onChange={(v) => onChange({ ...g, category: v, b: v === "Armor" && !b.armor ? { ...b, armor: 3 } : b })} />
      </Cell>
      <Cell label="Book"><Select value={g.book} options={SW_BOOK_OPTS} ariaLabel="book" onChange={(v) => onChange({ ...g, book: v })} /></Cell>
      {armor ? (
        <>
          <Cell label="Armor code" help="Added to Strength when resisting damage. The sheet reads it when the armor is worn.">
            <CodeInput value={b.armor} min={0} max={30} ariaLabel="armor code" onChange={(n) => set({ armor: n ?? 0 })} />
          </Cell>
          <Cell label="Dexterity penalty" help="Reduces Dexterity and Dexterity skills while worn (0 = none).">
            <CodeInput value={b.dex} min={0} max={30} ariaLabel="dexterity penalty" onChange={(n) => set({ dex: n ?? 0 })} />
          </Cell>
        </>
      ) : null}
      <Cell label={armor ? "Other stats" : "Stats"} className="sm:col-span-2" help="Open-ended: shield rating, duration, coil length…">
        <input className={fieldCls} value={b.stats} maxLength={200} placeholder={armor ? "covers torso only" : "Shield rating 1D"} onChange={(e) => set({ stats: e.target.value })} />
      </Cell>
      <Cell label="Cost" className="sm:col-span-2"><CostInput value={b.cost} onChange={(c) => set({ cost: c })} /></Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={g.description} maxLength={2000} onChange={(e) => onChange({ ...g, description: e.target.value })} />
      </Cell>
    </>
  );
}
export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const b = g.b, cost = composeCost(b.cost);
  return (
    <Preview title={name || "Unnamed gear"} subtitle={g.category}>
      <div className="flex flex-col gap-1">
        {g.category === "Armor" && b.armor ? <Line k="Armor" v={`+${swCode(b.armor).replace(/^\+/, "")} to Strength vs damage${b.dex ? ` · −${swCode(b.dex).replace(/^\+/, "")} Dexterity` : ""}`} /> : null}
        <Line k="Stats" v={composeGearStats(b, g.category)} />
        <Line k="Cost" v={cost ? (b.cost.mode === "cr" ? `${fmtNum(b.cost.n)} credits` : cost) : ""} />
        {g.description ? <p className="mt-1 text-[12px] text-[var(--muted)]">{g.description}</p> : null}
      </div>
    </Preview>
  );
}
