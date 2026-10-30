"use client";
// ── D&D 2024 homebrew subclass builder ───────────────────────────────────────
// Base class, per-level feature rows (level stepper, text, optional damage
// dice + type and healing dice — the sheet shows a Roll button beside the
// feature) and always-prepared subclass spells by class level (domain / oath /
// patron style lists the sheet adds automatically once the class reaches it).
// Storage (type "dnd-subclass", DndSubclass): className flavor features[{name,
// level, subclass, description, damage?, damageType?, heal?}] — unchanged —
// plus alwaysPrepared {"3": ["Bless", …]} (the same field book subclasses use).
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { formatDice, noDice, parseDice, type Dice } from "../dice";
import { BASE_CLASSES, DAMAGE_TYPES } from "./rules";
import { Cell, NamePicker, Select, addBtn, fieldCls, smallBtn } from "./ui";
import type { DndNames } from "./data";

type Data = Record<string, unknown>;
type Feature = { name: string; level: number; text: string; damage: Dice; dtype: string; heal: Dice };
export type SubclassDraft = { className: string; flavor: string; features: Feature[]; spells: { level: number; names: string[] }[] };

const dice = (v: unknown) => { const x = parseDice(String(v ?? "")); return x && x.n > 0 ? x : noDice(); };
const newFeature = (level = 3): Feature => ({ name: "", level, text: "", damage: noDice(), dtype: "", heal: noDice() });

export const blankSubclass = (): SubclassDraft => ({ className: "", flavor: "", features: [newFeature(3)], spells: [] });
export function subclassFromData(d: Data): SubclassDraft {
  const ap = (d.alwaysPrepared ?? {}) as Record<string, unknown>;
  return {
    className: String(d.className ?? ""), flavor: String(d.flavor ?? ""),
    features: (Array.isArray(d.features) ? (d.features as Data[]) : []).map((f) => ({
      name: String(f.name ?? ""), level: Math.min(20, Math.max(1, parseInt(String(f.level ?? 3), 10) || 3)), text: String(f.description ?? ""),
      damage: dice(f.damage), dtype: String(f.damageType ?? ""), heal: dice(f.heal),
    })),
    spells: Object.keys(ap).map((k) => ({ level: parseInt(k, 10) || 3, names: Array.isArray(ap[k]) ? (ap[k] as string[]) : [] })).sort((a, b) => a.level - b.level),
  };
}
export function subclassPayload(name: string, s: SubclassDraft): Data {
  const alwaysPrepared: Record<string, string[]> = {};
  s.spells.forEach((r) => { if (r.names.length) alwaysPrepared[String(r.level)] = [...(alwaysPrepared[String(r.level)] ?? []), ...r.names]; });
  return {
    name, className: s.className, flavor: s.flavor,
    features: s.features.map((f) => ({
      name: f.name, level: f.level, description: f.text,
      damage: f.damage.n > 0 ? formatDice(f.damage) : "", damageType: f.damage.n > 0 ? f.dtype : "", heal: f.heal.n > 0 ? formatDice(f.heal) : "",
    })),
    alwaysPrepared,
  };
}

export default function SubclassBuilder({ value: s, onChange, names }: { value: SubclassDraft; onChange: (s: SubclassDraft) => void; names: DndNames }) {
  const set = (p: Partial<SubclassDraft>) => onChange({ ...s, ...p });
  const setF = (i: number, p: Partial<Feature>) => set({ features: s.features.map((f, j) => (j === i ? { ...f, ...p } : f)) });
  const setS = (i: number, p: Partial<SubclassDraft["spells"][number]>) => set({ spells: s.spells.map((r, j) => (j === i ? { ...r, ...p } : r)) });
  return (
    <>
      <Cell label="Base class"><Select className="w-full" value={s.className} options={[["", "— choose a class —"], ...BASE_CLASSES.map((c) => [c, c] as [string, string])]} onChange={(v) => set({ className: v })} /></Cell>
      <Cell label="Flavor" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={s.flavor} maxLength={2000} placeholder="A sentence or two on the subclass…" onChange={(e) => set({ flavor: e.target.value })} />
      </Cell>
      <Cell label="Features (by level)" className="sm:col-span-2" help="Each applies automatically at its level on the character sheet, including per-rest trackers and spells the text grants.">
        <div className="flex flex-col gap-2">
          {s.features.map((f, i) => (
            <div key={i} className={styles.atkRow}>
              <div className={styles.atkLine}>
                <label className={styles.atkCell}><span className={styles.atkLbl}>Level</span><Stepper value={f.level} min={1} max={20} width="2.2em" ariaLabel="feature level" onChange={(v) => setF(i, { level: v ?? 3 })} /></label>
                <label className={`${styles.atkCell} ${styles.atkGrow}`}><span className={styles.atkLbl}>Name</span><input className={fieldCls} value={f.name} maxLength={120} placeholder="Cinder Strike" onChange={(e) => setF(i, { name: e.target.value })} /></label>
                <label className={styles.atkCell}><span className={styles.atkLbl}>Damage</span>
                  <span className="flex items-center gap-1">
                    <DiceInput value={f.damage} minCount={0} ariaLabel="damage" onChange={(v) => setF(i, { damage: v })} />
                    {f.damage.n > 0 ? <select className={styles.diceSel} aria-label="damage type" value={f.dtype} onChange={(e) => setF(i, { dtype: e.target.value })}><option value="">—</option>{DAMAGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select> : null}
                  </span>
                </label>
                <label className={styles.atkCell}><span className={styles.atkLbl}>Healing</span><DiceInput value={f.heal} minCount={0} ariaLabel="healing" onChange={(v) => setF(i, { heal: v })} /></label>
              </div>
              <div className={`${styles.atkLine} mt-2`}>
                <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={f.text} maxLength={4000} placeholder="What the feature does…" onChange={(e) => setF(i, { text: e.target.value })} />
                <button type="button" className={smallBtn} title="Remove" onClick={() => set({ features: s.features.filter((_, j) => j !== i) })}>✕</button>
              </div>
            </div>
          ))}
        </div>
        {s.features.length < 40 ? <button type="button" className={addBtn} onClick={() => set({ features: [...s.features, newFeature(s.features.length ? s.features[s.features.length - 1].level : 3)] })}>+ Add feature</button> : null}
      </Cell>
      <Cell label="Subclass spells (always prepared)" className="sm:col-span-2" help="Added to the spellbook automatically once the class level is reached.">
        <div className="flex flex-col gap-2">
          {s.spells.map((r, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] text-[var(--muted)]">Class level</span>
              <Stepper value={r.level} min={1} max={20} width="2.2em" ariaLabel="spell level gate" onChange={(v) => setS(i, { level: v ?? 3 })} />
              <div className="min-w-0 flex-1"><NamePicker value={r.names} onChange={(v) => setS(i, { names: v })} options={names.spells} placeholder="Add a spell…" custom={false} max={6} /></div>
              <button type="button" className={smallBtn} onClick={() => set({ spells: s.spells.filter((_, j) => j !== i) })}>✕</button>
            </div>
          ))}
        </div>
        <button type="button" className={addBtn} onClick={() => set({ spells: [...s.spells, { level: [3, 5, 7, 9, 11][Math.min(4, s.spells.length)], names: [] }] })}>+ Add spell level</button>
      </Cell>
    </>
  );
}

export function SubclassPreview({ name, s }: { name: string; s: SubclassDraft }) {
  const p = subclassPayload(name, s);
  const ap = p.alwaysPrepared as Record<string, string[]>;
  return (
    <Preview title={name || "Unnamed subclass"} subtitle={s.className ? `${s.className} Subclass` : "Choose a base class"}>
      {s.flavor ? <p className="text-[13px] italic">{s.flavor}</p> : null}
      {[...s.features].sort((a, b) => a.level - b.level).filter((f) => f.name).map((f, i) => (
        <p key={i} className="mt-1.5 text-[13px] leading-relaxed">
          <b>Level {f.level}: {f.name}.</b> {f.text}
          {f.damage.n > 0 || f.heal.n > 0 ? <span className="ml-1 text-[12px] font-semibold text-[var(--hb-accent)]">[{[f.damage.n > 0 ? `${formatDice(f.damage)} ${f.dtype}`.trim() : "", f.heal.n > 0 ? `heal ${formatDice(f.heal)}` : ""].filter(Boolean).join(" · ")}]</span> : null}
        </p>
      ))}
      {Object.keys(ap).length ? (
        <div className="mt-2 text-[13px]"><b>Subclass Spells</b>{Object.keys(ap).sort((a, b) => +a - +b).map((k) => <div key={k}>Level {k}: {ap[k].join(", ")}</div>)}</div>
      ) : null}
    </Preview>
  );
}
