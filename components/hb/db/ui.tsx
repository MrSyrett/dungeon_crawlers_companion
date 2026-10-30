"use client";
// ── Dragonbane builder bits shared by the components/hb/db/* builders ────────
// Class strings matching the other systems' builders, a labelled Cell, Toggle,
// a Select that keeps an unknown (legacy) value, row chrome (↑ ↓ ✕), and the
// Dragonbane pickers: DmgInput (die term + optional second die, "2D8+D6"),
// CostInput (amount + gold/silver/copper), NamePicker (pick names from the
// book's own lists, shown as removable chips) and useDbData() — the window.DB_*
// book data (public/tools-data/db-data.js), loaded once through the LootBonus
// loader so the badge lists and the pickers share one script tag.
import type { ReactNode } from "react";
import { useState } from "react";
import Stepper from "../Stepper";
import { useLootBonus } from "../LootBonusBadges";
import styles from "../hb.module.css";
import { DB_DICE, DB_UNITS, type DbCostDraft, type DbDmg } from "./rules";

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const smallBtn = "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const addBtn = "mt-2 rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const hint = "mt-1 text-[11px] text-[var(--muted)]";

export const DB_JS = ["/tools-data/db-data.js"];

type Named = { name: string; [k: string]: unknown };
export type DbData = {
  skills: Named[]; abilities: Named[]; spells: Named[]; tricks: Named[]; weapons: Named[]; armor: Named[]; helmets: Named[]; gear: Named[];
  npcTraits: Record<string, string>;
};
const g = (k: string): Named[] => { const v = (globalThis as Record<string, unknown>)[k]; return Array.isArray(v) ? (v as Named[]).filter((x) => x && x.name) : []; };
/** The book data, or null until db-data.js has loaded. */
export function useDbData(): DbData | null {
  const L = useLootBonus("db", DB_JS);
  if (!L.ready) return null;
  const t = (globalThis as Record<string, unknown>).DB_NPC_TRAITS;
  return {
    skills: g("DB_SKILLS"), abilities: g("DB_HEROIC_ABILITIES"), spells: g("DB_SPELLS"), tricks: g("DB_MAGIC_TRICKS"),
    weapons: g("DB_WEAPONS"), armor: g("DB_ARMOR"), helmets: g("DB_HELMETS"), gear: g("DB_GEAR"),
    npcTraits: t && typeof t === "object" ? (t as Record<string, string>) : {},
  };
}

export function Cell({ label, children, className = "", help }: { label: ReactNode; children: ReactNode; className?: string; help?: ReactNode }) {
  return (
    <div className={className}>
      <label className={lbl}>{label}</label>
      {children}
      {help ? <p className={hint}>{help}</p> : null}
    </div>
  );
}

export function Toggle({ checked, onChange, children, title }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; title?: string }) {
  return (
    <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]" title={title}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {children}
    </label>
  );
}

export function Select({ value, options, onChange, className = "", ariaLabel }: { value: string; options: readonly (string | readonly [string, string])[]; onChange: (v: string) => void; className?: string; ariaLabel?: string }) {
  const opts = options.map((o) => (typeof o === "string" ? [o, o] : o) as [string, string]);
  const all = value && !opts.some(([v]) => v === value) ? [...opts, [value, value] as [string, string]] : opts;
  return (
    <select className={`${selCls} ${className}`} aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)}>
      {all.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

/** ↑ ↓ ✕ for row i of a list. */
export function RowCtl<T>({ rows, i, onChange, remove = true }: { rows: T[]; i: number; onChange: (r: T[]) => void; remove?: boolean }) {
  const move = (d: number) => {
    const j = i + d; if (j < 0 || j >= rows.length) return;
    const next = rows.slice(); [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  return (
    <span className={styles.atkCtl}>
      <span role="button" tabIndex={0} className={styles.iconBtn} title="Move up" aria-disabled={i === 0} onClick={() => move(-1)}>↑</span>
      <span role="button" tabIndex={0} className={styles.iconBtn} title="Move down" aria-disabled={i === rows.length - 1} onClick={() => move(1)}>↓</span>
      {remove ? <span role="button" tabIndex={0} className={styles.iconBtn} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</span> : null}
    </span>
  );
}

/** Dragonbane damage: [n] D[x] (+ [n] D[y]). none → "0 dice" allowed. */
export function DmgInput({ value, onChange, allowNone = false, ariaLabel = "damage", extra = true }: { value: DbDmg; onChange: (v: DbDmg) => void; allowNone?: boolean; ariaLabel?: string; extra?: boolean }) {
  const die = (d: number, set: (d: number) => void, aria: string) => (
    <select className={styles.diceSel} aria-label={aria} value={d} onChange={(e) => set(parseInt(e.target.value, 10) || 6)}>
      {(DB_DICE.includes(d) ? DB_DICE : [...DB_DICE, d].sort((a, b) => a - b)).map((x) => <option key={x} value={x}>D{x}</option>)}
    </select>
  );
  return (
    <span className={styles.dice}>
      <Stepper value={value.n} min={allowNone ? 0 : 1} max={10} width="2.2em" ariaLabel={`${ariaLabel} dice`} onChange={(n) => onChange({ ...value, n: n ?? 0 })} />
      {die(value.d, (d) => onChange({ ...value, d }), `${ariaLabel} die`)}
      {extra && value.n > 0 ? (
        value.xn > 0 ? (
          <>
            <span className={styles.diceSep}>+</span>
            <Stepper value={value.xn} min={0} max={6} width="2em" ariaLabel={`${ariaLabel} extra dice`} onChange={(n) => onChange({ ...value, xn: n ?? 0 })} />
            {die(value.xd, (xd) => onChange({ ...value, xd }), `${ariaLabel} extra die`)}
          </>
        ) : (
          <button type="button" className={smallBtn} title="Add a second die (2D8+D6)" onClick={() => onChange({ ...value, xn: 1 })}>+ die</button>
        )
      ) : null}
      {allowNone && value.n === 0 ? <span className="text-[11px] text-[var(--muted)]">none</span> : null}
    </span>
  );
}

export function CostInput({ value, onChange }: { value: DbCostDraft; onChange: (v: DbCostDraft) => void }) {
  return (
    <span className="flex items-center gap-2">
      <Stepper value={value.amount} min={0} max={1_000_000} nullable width="4.2em" ariaLabel="cost" onChange={(a) => onChange({ ...value, amount: a })} />
      <Select value={value.unit} options={DB_UNITS} ariaLabel="coin" onChange={(u) => onChange({ ...value, unit: u as DbCostDraft["unit"] })} />
    </span>
  );
}

/** Pick names from a list (datalist search + Add), shown as removable chips. `count` adds a ×N stepper per chip (Robust ×4). */
export function NamePicker({ value, onChange, options, placeholder = "Search…", custom = true, count, max = 16 }: {
  value: string[]; onChange: (v: string[]) => void; options: { name: string; meta?: string }[]; placeholder?: string; custom?: boolean;
  count?: (name: string) => boolean; max?: number;
}) {
  const [draft, setDraft] = useState("");
  const id = `np-${placeholder.replace(/\W+/g, "")}-${options.length}`;
  const split = (v: string) => { const m = v.match(/^(.+?)\s*×\s*(\d+)$/); return m ? [m[1], parseInt(m[2], 10)] as const : [v, 1] as const; };
  const add = () => {
    const t = draft.trim(); setDraft("");
    if (!t || value.length >= max) return;
    const hit = options.find((o) => o.name.toLowerCase() === t.toLowerCase());
    if (!hit && !custom) return;
    const nm = hit ? hit.name : t;
    if (value.some((v) => split(v)[0].toLowerCase() === nm.toLowerCase())) return;
    onChange([...value, nm]);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className={styles.chips}>
        {value.map((v, i) => {
          const [nm, n] = split(v);
          return (
            <span key={v + i} className={`${styles.chip} ${styles.on} inline-flex items-center gap-1`}>
              {nm}
              {count?.(nm) ? (
                <Stepper value={n} min={1} max={20} width="1.8em" ariaLabel={`${nm} count`} onChange={(c) => onChange(value.map((x, j) => (j === i ? ((c ?? 1) > 1 ? `${nm} ×${c}` : nm) : x)))} />
              ) : null}
              <span role="button" tabIndex={0} title="Remove" className="cursor-pointer opacity-70 hover:opacity-100" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</span>
            </span>
          );
        })}
        {!value.length ? <span className={styles.badgeEmpty}>None</span> : null}
      </div>
      <span className="flex gap-2">
        <input className={`${fieldCls} max-w-[280px]`} list={id} value={draft} placeholder={placeholder} maxLength={60}
          onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
        <button type="button" className={smallBtn} onClick={add}>Add</button>
        <datalist id={id}>{options.filter((o, i) => options.findIndex((y) => y.name === o.name) === i).map((o) => <option key={o.name} value={o.name}>{o.meta ?? ""}</option>)}</datalist>
      </span>
    </div>
  );
}
