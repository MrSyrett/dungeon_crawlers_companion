"use client";
// ── Pirate Borg homebrew ship builder ────────────────────────────────────────
// Storage = the PB_SHIPS book shape (lib/data/pb-types PbShip) the /pirate-borg/
// naval page, the GM Screen (xsMonSummary 'pb' ship cards: hull die, ship
// initiative d6 + AGILITY, crew-action d20 + SKILL vs DR12, broadsides / small
// arms / ram damage buttons, crew morale 2d6 + skill) and pb-gm-tables.js
// (templates, wind / point-of-sail speed) read:
//   type, hp, hull {tier, die} (tier 1–3 → −d2/−d4/−d6), agility, speed
//   (hexes), skill (null = "use passengers' stats" + skillNote), broadsides /
//   smallArms / ram (dice), broadsidesAttacks / smallArmsAttacks (>1), crew
//   {min, max}, cargo (slots), cost, special, text; plus windImmune /
//   closeToWindFullSpeed and dr {attack} (only when not 12).
// Every number is a stepper / select; damage dice come from DiceInput (a book
// value that isn't one roll is kept as text).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import type { Dice } from "../dice";
import { PB_ARMOR_TIERS, PB_DICE, fmtPb, parsePb } from "./rules";
import { Cell, Select, fieldCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
type Gun = { dice: Dice; text: string };
export type ShipDraft = {
  type: string; hp: number; hullTier: number; agility: number | null; speed: number; skill: number | null; skillNote: string;
  broadsides: Gun; broadsidesAttacks: number; smallArms: Gun; smallArmsAttacks: number; ram: Gun;
  crewMin: number; crewMax: number; cargo: number; cost: number; drAttack: number; wind: "" | "immune" | "close";
  special: string; text: string;
};
const int = (v: unknown, d: number) => { const n = parseInt(String(v ?? "").replace(/^[−–]/, "-"), 10); return Number.isFinite(n) ? n : d; };
const none = (): Gun => ({ dice: { n: 0, d: 6, m: 0 }, text: "" });
const gunOf = (v: unknown): Gun => { if (v == null || v === "") return none(); const d = parsePb(v); return d ? { dice: d, text: "" } : { ...none(), text: String(v) }; };
const gunStr = (g: Gun) => g.text.trim() || fmtPb(g.dice);
const sg = (n: number) => (n >= 0 ? "+" : "−") + Math.abs(n);

export function blankShip(): ShipDraft {
  return {
    type: "ship", hp: 30, hullTier: 1, agility: 1, speed: 4, skill: 0, skillNote: "",
    broadsides: { dice: { n: 1, d: 6, m: 0 }, text: "" }, broadsidesAttacks: 1, smallArms: { dice: { n: 1, d: 4, m: 0 }, text: "" }, smallArmsAttacks: 1, ram: { dice: { n: 1, d: 4, m: 0 }, text: "" },
    crewMin: 3, crewMax: 10, cargo: 2, cost: 0, drAttack: 12, wind: "", special: "", text: "",
  };
}
export function shipFromData(d: Data): ShipDraft {
  const h = (d.hull ?? null) as { tier?: number; die?: string } | null;
  const c = (d.crew ?? null) as { min?: number; max?: number } | null;
  const dr = (d.dr ?? {}) as { attack?: number };
  return {
    type: String(d.type ?? "ship"), hp: int(d.hp, 20), hullTier: h ? Math.max(0, ["", "d2", "d4", "d6"].indexOf(String(h.die ?? ""))) || int(h.tier, 0) : 0,
    agility: d.agility == null || d.agility === "" ? null : int(d.agility, 0), speed: int(d.speed, 0),
    skill: d.skill == null || d.skill === "" ? null : int(d.skill, 0), skillNote: String(d.skillNote ?? ""),
    broadsides: gunOf(d.broadsides), broadsidesAttacks: int(d.broadsidesAttacks, 1), smallArms: gunOf(d.smallArms), smallArmsAttacks: int(d.smallArmsAttacks, 1), ram: gunOf(d.ram),
    crewMin: int(c?.min, 0), crewMax: int(c?.max, 0), cargo: int(d.cargo, 0), cost: int(d.cost, 0), drAttack: int(dr.attack, 12),
    wind: d.windImmune ? "immune" : d.closeToWindFullSpeed ? "close" : "", special: String(d.special ?? ""), text: String(d.text ?? ""),
  };
}
export function shipPayload(name: string, s: ShipDraft): Data {
  return {
    name, type: s.type, hp: s.hp, hullDie: PB_ARMOR_TIERS[s.hullTier]?.die ?? "", agility: s.agility ?? "", speed: s.speed,
    skill: s.skill ?? "", skillNote: s.skill == null ? s.skillNote.trim() || "Use passengers' stats." : "",
    broadsides: gunStr(s.broadsides), broadsidesAttacks: s.broadsidesAttacks, smallArms: gunStr(s.smallArms), smallArmsAttacks: s.smallArmsAttacks, ram: gunStr(s.ram),
    crewMin: s.crewMin, crewMax: Math.max(s.crewMin, s.crewMax), cargo: s.cargo, cost: s.cost, drAttack: s.drAttack,
    windImmune: s.wind === "immune", closeToWindFullSpeed: s.wind === "close", special: s.special, text: s.text,
  };
}

function GunInput({ label, value, onChange, attacks, onAttacks, help }: { label: string; value: Gun; onChange: (g: Gun) => void; attacks?: number; onAttacks?: (n: number) => void; help?: string }) {
  return (
    <Cell label={label} help={help}>
      <span className="flex flex-wrap items-center gap-2">
        {value.text ? (
          <>
            <input className={`${fieldCls} max-w-[140px]`} value={value.text} maxLength={40} onChange={(e) => onChange({ ...value, text: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => onChange({ ...value, text: "" })}>Dice</button>
          </>
        ) : <DiceInput value={value.dice} dice={PB_DICE} maxCount={6} mod={false} ariaLabel={label} onChange={(d) => onChange({ ...value, dice: d })} />}
        {onAttacks && gunStr(value) ? (
          <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">×<Stepper value={attacks ?? 1} min={1} max={20} width="1.8em" ariaLabel={`${label} attacks`} onChange={(n) => onAttacks(n ?? 1)} /></span>
        ) : null}
      </span>
    </Cell>
  );
}

export default function ShipBuilder({ value: s, onChange }: { value: ShipDraft; onChange: (v: ShipDraft) => void }) {
  const set = (p: Partial<ShipDraft>) => onChange({ ...s, ...p });
  return (
    <>
      <Cell label="Type" className="sm:col-span-2">
        <ChipPicker single options={[["boat", "Boat"], ["ship", "Ship"], ["fortification", "Fortification"]]} value={[s.type]} onChange={(v) => v[0] && set({ type: v[0] })} />
      </Cell>
      <Cell label="HP" help="The vessel's condition plus crew health and morale. Ship damage is ×5 against people.">
        <Stepper value={s.hp} min={1} max={9999} width="3.4em" ariaLabel="hp" onChange={(v) => set({ hp: v ?? 1 })} />
      </Cell>
      <Cell label="Hull" help="Armor for vessels: the die is subtracted from each hit; a critical drops it a tier.">
        <Select value={String(s.hullTier)} options={PB_ARMOR_TIERS.map((t) => [String(t.tier), t.tier ? `Tier ${t.tier} −${t.die}` : "None"] as [string, string])} ariaLabel="hull" onChange={(v) => set({ hullTier: parseInt(v, 10) })} />
      </Cell>
      <Cell label="Agility" help="Ship initiative d6 + AGILITY; Full Sail / Come About tests. Empty = use passengers'.">
        <Stepper value={s.agility} min={-6} max={6} signed nullable width="2.2em" ariaLabel="agility" onChange={(v) => set({ agility: v })} />
      </Cell>
      <Cell label="Speed (hexes)" help="Hexes a move (1 hex ≈ 50'). Ships must move at least 1.">
        <Stepper value={s.speed} min={0} max={20} width="2.2em" ariaLabel="speed" onChange={(v) => set({ speed: v ?? 0 })} />
      </Cell>
      <Cell label="Crew skill" help="Added to crew-action tests (d20 + SKILL + a PC's ability vs DR12) and crew morale. Empty = no crew of its own.">
        <span className="flex flex-wrap items-center gap-2">
          <Stepper value={s.skill} min={-6} max={6} signed nullable width="2.2em" ariaLabel="skill" onChange={(v) => set({ skill: v })} />
          {s.skill == null ? <input className={`${fieldCls} max-w-[220px]`} value={s.skillNote} maxLength={200} placeholder="Use passengers' stats." onChange={(e) => set({ skillNote: e.target.value })} /> : null}
        </span>
      </Cell>
      <Cell label="DR to hit it" help="12 unless it's unusually small or nimble.">
        <Stepper value={s.drAttack} min={2} max={20} width="2em" ariaLabel="DR to hit" onChange={(v) => set({ drAttack: v ?? 12 })} />
      </Cell>
      <GunInput label="Broadsides" value={s.broadsides} onChange={(g) => set({ broadsides: g })} attacks={s.broadsidesAttacks} onAttacks={(n) => set({ broadsidesAttacks: n })} help="Main cannons; fire only 45° off the side, range 12 hexes. 0 dice = none." />
      <GunInput label="Small arms" value={s.smallArms} onChange={(g) => set({ smallArms: g })} attacks={s.smallArmsAttacks} onAttacks={(n) => set({ smallArmsAttacks: n })} help="Swivel guns and muskets; can always fire." />
      <GunInput label="Ram" value={s.ram} onChange={(g) => set({ ram: g })} help="+1 per hex moved; every ship in the ram rolls it." />
      <Cell label="Crew (min – max)" help="Below the minimum: one crew action a round. Can carry double the max for short trips.">
        <span className="flex items-center gap-2">
          <Stepper value={s.crewMin} min={0} max={9999} width="2.8em" ariaLabel="crew min" onChange={(v) => set({ crewMin: v ?? 0 })} />
          <span className="text-[var(--muted)]">–</span>
          <Stepper value={Math.max(s.crewMin, s.crewMax)} min={s.crewMin} max={9999} width="2.8em" ariaLabel="crew max" onChange={(v) => set({ crewMax: v ?? s.crewMin })} />
        </span>
      </Cell>
      <Cell label="Cargo (slots)">
        <Stepper value={s.cargo} min={0} max={999} width="2.4em" ariaLabel="cargo" onChange={(v) => set({ cargo: v ?? 0 })} />
      </Cell>
      <Cell label="Cost (silver)" help="0 = not for sale.">
        <Stepper value={s.cost} min={0} max={10_000_000} width="5em" ariaLabel="cost" onChange={(v) => set({ cost: v ?? 0 })} />
      </Cell>
      <Cell label="Wind" className="sm:col-span-2" help="Used by the GM Screen's point-of-sail speed helper.">
        <ChipPicker single options={[["", "Normal (½ speed close to the wind, 0 in irons)"], ["close", "Full speed close to the wind"], ["immune", "Not affected by wind (oars)"]]} value={[s.wind]} onChange={(v) => set({ wind: (v[0] ?? "") as ShipDraft["wind"] })} />
      </Cell>
      <Cell label="Special" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={s.special} maxLength={1500} placeholder="Can travel at full speed when Close to the Wind." onChange={(e) => set({ special: e.target.value })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={s.text} maxLength={3000} onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function ShipPreview({ name, s }: { name: string; s: ShipDraft }) {
  const t = PB_ARMOR_TIERS[s.hullTier];
  const cells: [string, string][] = [
    ["HP", String(s.hp)], ["Hull", t.die ? `−${t.die}` : "—"], ["AGL", s.agility == null ? "—" : sg(s.agility)], ["Speed", String(s.speed)], ["Skill", s.skill == null ? "—" : sg(s.skill)],
  ];
  const guns: [string, string][] = [
    ["Broadsides", gunStr(s.broadsides) + (gunStr(s.broadsides) && s.broadsidesAttacks > 1 ? ` ×${s.broadsidesAttacks}` : "")],
    ["Small arms", gunStr(s.smallArms) + (gunStr(s.smallArms) && s.smallArmsAttacks > 1 ? ` ×${s.smallArmsAttacks}` : "")],
    ["Ram", gunStr(s.ram)],
  ];
  return (
    <Preview title={name || "Unnamed ship"} subtitle={`${s.type.charAt(0).toUpperCase() + s.type.slice(1)}${s.cost ? ` · ${s.cost.toLocaleString("en")}s` : ""}`}>
      <table className="my-1 w-full border-collapse text-center text-[12px]">
        <thead><tr>{cells.map(([k]) => <th key={k} className="border border-[var(--border)] px-1 font-semibold text-[var(--muted)]">{k}</th>)}</tr></thead>
        <tbody><tr>{cells.map(([k, v]) => <td key={k} className="border border-[var(--border)] px-1 font-mono">{v}</td>)}</tr></tbody>
      </table>
      <p className="font-mono text-[12.5px]">{guns.map(([k, v]) => `${k} ${v || "—"}`).join(" · ")}</p>
      <p className="text-[12px] text-[var(--muted)]">Crew {s.crewMin}–{Math.max(s.crewMin, s.crewMax)} · Cargo {s.cargo}{s.drAttack !== 12 ? ` · DR${s.drAttack} to hit` : ""}</p>
      <p className="mt-1 text-[11.5px] text-[var(--muted)]">Initiative d6{s.agility ? sg(s.agility) : ""} · crew actions d20{s.skill ? sg(s.skill) : ""} vs DR12{s.skill == null ? ` (${s.skillNote || "use passengers' stats"})` : ""} · damage ×5 vs people</p>
      {s.special ? <p className="mt-1 text-[13px]">{s.special}</p> : null}
      {s.text ? <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed">{s.text}</p> : null}
    </Preview>
  );
}
