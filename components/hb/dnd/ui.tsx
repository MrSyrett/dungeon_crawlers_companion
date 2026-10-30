"use client";
// ── D&D builder bits shared by the components/hb/dnd/* builders ──────────────
// Class strings matching the SD/DCC builders, a labelled cell, a check toggle,
// NameRows (repeatable name + text rows with reorder — traits, actions,
// features…) and NamePicker (chips picked from a long list via a searchable
// input — spells, feats).
import { useId, useState, type ReactNode } from "react";
import styles from "../hb.module.css";
import type { NameMeta } from "./data";

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const smallBtn = "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const addBtn = "mt-2 rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const hint = "mt-1 text-[11px] text-[var(--muted)]";

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

export type Row = { name: string; text: string };
/** Repeatable name + text rows (book "Name. Text." entries). */
export function NameRows({
  rows, onChange, namePh = "Name", textPh = "What it does…", addLabel = "+ Add", max = 20, extra,
}: {
  rows: Row[];
  onChange: (r: Row[]) => void;
  namePh?: string;
  textPh?: string;
  addLabel?: string;
  max?: number;
  /** Extra controls for row i (e.g. a level stepper / dice). */
  extra?: (i: number) => ReactNode;
}) {
  const set = (i: number, p: Partial<Row>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const move = (i: number, d: number) => {
    const j = i + d; if (j < 0 || j >= rows.length) return;
    const next = rows.slice(); [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        {rows.map((t, i) => (
          <div key={i} className={styles.atkRow}>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input className={`${fieldCls} sm:w-48 sm:self-start`} value={t.name} maxLength={120} placeholder={namePh} onChange={(e) => set(i, { name: e.target.value })} />
              <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={t.text} maxLength={4000} placeholder={textPh} onChange={(e) => set(i, { text: e.target.value })} />
              <div className="flex gap-1 sm:flex-col">
                <button type="button" className={smallBtn} title="Move up" onClick={() => move(i, -1)}>↑</button>
                <button type="button" className={smallBtn} title="Move down" onClick={() => move(i, 1)}>↓</button>
                <button type="button" className={smallBtn} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</button>
              </div>
            </div>
            {extra ? <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">{extra(i)}</div> : null}
          </div>
        ))}
      </div>
      {rows.length < max ? <button type="button" className={addBtn} onClick={() => onChange([...rows, { name: "", text: "" }])}>{addLabel}</button> : null}
    </div>
  );
}

/** Chips chosen from a long list via a searchable input (free text allowed when `custom`). */
export function NamePicker({ value, onChange, options, placeholder = "Search…", custom = true, max = 30 }: {
  value: string[]; onChange: (v: string[]) => void; options: NameMeta[]; placeholder?: string; custom?: boolean; max?: number;
}) {
  const id = useId();
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const t = raw.trim(); if (!t) return;
    const hit = options.find((o) => o.name.toLowerCase() === t.toLowerCase());
    if (!hit && !custom) return;
    const name = hit ? hit.name : t;
    if (!value.some((v) => v.toLowerCase() === name.toLowerCase()) && value.length < max) onChange([...value, name]);
    setDraft("");
  };
  return (
    <div className={styles.chips}>
      {value.map((v) => (
        <button key={v} type="button" className={`${styles.chip} ${styles.on}`} title="Remove" onClick={() => onChange(value.filter((x) => x !== v))}>{v} ×</button>
      ))}
      <input
        className={styles.chip}
        style={{ cursor: "text", minWidth: 160 }}
        list={id}
        value={draft}
        placeholder={placeholder}
        maxLength={80}
        onChange={(e) => { const v = e.target.value; setDraft(v); if (options.some((o) => o.name === v)) add(v); }}
        onBlur={() => add(draft)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(draft); } }}
      />
      <datalist id={id}>{options.slice(0, 800).map((o) => <option key={o.name} value={o.name}>{o.meta}</option>)}</datalist>
    </div>
  );
}
