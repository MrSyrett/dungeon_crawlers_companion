"use client";
// ── D&D 2024 homebrew species builder ────────────────────────────────────────
// Size(s), Speed, Darkvision and creature type chosen (the sheet's creation
// wizard reads them for size, walking speed and senses); traits and lineages as
// name + text rows (lineages each carry their own trait rows).
// Storage (type "dnd-species", DndSpecies): size (one size, or an array when
// the player may choose — like the book's Human), speed, darkvision,
// creatureType, traits[], lineages[{name, traits[]}], flavor. The server still
// accepts the old "Name — description" lineage text lines.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { CREATURE_TYPES, SIZES } from "./rules";
import { Cell, NameRows, Select, addBtn, fieldCls, smallBtn, type Row } from "./ui";

type Data = Record<string, unknown>;
type Lineage = { name: string; traits: Row[] };
export type SpeciesDraft = { sizes: string[]; speed: number; darkvision: number; creatureType: string; flavor: string; traits: Row[]; lineages: Lineage[] };

const rowsOf = (v: unknown): Row[] => {
  if (Array.isArray(v)) return (v as Data[]).map((t) => ({ name: String(t?.name ?? ""), text: String(t?.description ?? "") }));
  // legacy editor form: "Name — description" per line
  return String(v ?? "").split("\n").map((l) => { const m = l.match(/^\s*(.+?)\s*(?:[—:–-]\s*|\s{2,})(.+)$/); return m ? { name: m[1], text: m[2] } : { name: l.trim(), text: "" }; }).filter((t) => t.name);
};
const out = (r: Row[]) => r.filter((t) => t.name.trim()).map((t) => ({ name: t.name.trim(), description: t.text.trim() }));

export const blankSpecies = (): SpeciesDraft => ({ sizes: ["Medium"], speed: 30, darkvision: 0, creatureType: "Humanoid", flavor: "", traits: [{ name: "", text: "" }], lineages: [] });
export function speciesFromData(d: Data): SpeciesDraft {
  const sz = ([] as unknown[]).concat(d.size ?? "Medium").map(String).filter((x) => (SIZES as readonly string[]).includes(x));
  return {
    sizes: sz.length ? sz : ["Medium"], speed: Number(d.speed) || 30, darkvision: Number(d.darkvision) || 0,
    creatureType: String(d.creatureType || "Humanoid"), flavor: String(d.flavor ?? ""),
    traits: rowsOf(d.traits),
    lineages: Array.isArray(d.lineages) ? (d.lineages as Data[]).map((l) => ({ name: String(l?.name ?? ""), traits: rowsOf(l?.traits) })) : [],
  };
}
export function speciesPayload(name: string, s: SpeciesDraft): Data {
  const sizes = SIZES.filter((x) => s.sizes.includes(x));
  return {
    name, size: sizes.length > 1 ? sizes : sizes[0] ?? "Medium", speed: s.speed, darkvision: s.darkvision, creatureType: s.creatureType, flavor: s.flavor,
    traits: out(s.traits), lineages: s.lineages.filter((l) => l.name.trim()).map((l) => ({ name: l.name.trim(), traits: out(l.traits) })),
  };
}

export default function SpeciesBuilder({ value: s, onChange }: { value: SpeciesDraft; onChange: (s: SpeciesDraft) => void }) {
  const set = (p: Partial<SpeciesDraft>) => onChange({ ...s, ...p });
  const setL = (i: number, p: Partial<Lineage>) => set({ lineages: s.lineages.map((l, j) => (j === i ? { ...l, ...p } : l)) });
  return (
    <>
      <Cell label="Size" className="sm:col-span-2" help="Pick two (e.g. Medium + Small) to let the player choose.">
        <ChipPicker options={SIZES} value={s.sizes} onChange={(v) => v.length && set({ sizes: v.slice(-2) })} />
      </Cell>
      <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-3">
        <Cell label="Speed (ft.)"><Stepper value={s.speed} min={0} max={120} step={5} ariaLabel="speed" onChange={(v) => set({ speed: v ?? 30 })} /></Cell>
        <Cell label="Darkvision"><Select value={String(s.darkvision)} options={[["0", "None"], ["60", "60 ft."], ["120", "120 ft."]]} onChange={(v) => set({ darkvision: parseInt(v, 10) || 0 })} /></Cell>
        <Cell label="Creature type"><Select value={s.creatureType} options={CREATURE_TYPES} onChange={(v) => set({ creatureType: v })} /></Cell>
      </div>
      <Cell label="Flavor" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={s.flavor} maxLength={2000} placeholder="A sentence or two of description…" onChange={(e) => set({ flavor: e.target.value })} />
      </Cell>
      <Cell label="Traits" className="sm:col-span-2"><NameRows rows={s.traits} onChange={(v) => set({ traits: v })} namePh="Cinder Step" addLabel="+ Add trait" max={24} /></Cell>
      <Cell label="Lineages (optional)" className="sm:col-span-2" help="Sub-options like High Elf / Wood Elf; the player picks one on the sheet.">
        <div className="flex flex-col gap-3">
          {s.lineages.map((l, i) => (
            <div key={i} className="rounded border border-[var(--border)] p-2">
              <div className="mb-2 flex gap-2">
                <input className={`${fieldCls} min-w-0 flex-1`} value={l.name} maxLength={120} placeholder="Lineage name (Emberborn)" onChange={(e) => setL(i, { name: e.target.value })} />
                <button type="button" className={smallBtn} title="Remove lineage" onClick={() => set({ lineages: s.lineages.filter((_, j) => j !== i) })}>✕</button>
              </div>
              <NameRows rows={l.traits} onChange={(v) => setL(i, { traits: v })} addLabel="+ Add lineage trait" max={12} />
            </div>
          ))}
        </div>
        {s.lineages.length < 8 ? <button type="button" className={addBtn} onClick={() => set({ lineages: [...s.lineages, { name: "", traits: [{ name: "", text: "" }] }] })}>+ Add lineage</button> : null}
      </Cell>
    </>
  );
}

export function SpeciesPreview({ name, s }: { name: string; s: SpeciesDraft }) {
  const trait = (t: Row, i: number) => <p key={i} className="mt-1 text-[13px] leading-relaxed"><b><i>{t.name}.</i></b> {t.text}</p>;
  return (
    <Preview title={name || "Unnamed species"} subtitle={s.flavor ? s.flavor.slice(0, 140) : "Species"}>
      <p className="text-[13px]"><b>Creature Type:</b> {s.creatureType}</p>
      <p className="text-[13px]"><b>Size:</b> {SIZES.filter((x) => s.sizes.includes(x)).join(" or ")}</p>
      <p className="text-[13px]"><b>Speed:</b> {s.speed} feet{s.darkvision ? ` · Darkvision ${s.darkvision} ft.` : ""}</p>
      {s.traits.filter((t) => t.name).map(trait)}
      {s.lineages.filter((l) => l.name).map((l, i) => (
        <div key={i} className="mt-2"><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--hb-accent)]">{l.name}</div>{l.traits.filter((t) => t.name).map(trait)}</div>
      ))}
    </Preview>
  );
}
