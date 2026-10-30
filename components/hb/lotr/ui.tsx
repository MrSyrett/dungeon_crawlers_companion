"use client";
// ── LotR builder bits shared by the components/hb/lotr/* builders ────────────
// Class strings matching the other systems' builders, a labelled Cell, a
// Toggle, a Select that keeps an unknown (legacy) value, and UseRows: the
// repeatable name + usage + text rows (traits, actions, reactions) whose usage
// is written after the name the way the book does ("Yell of Triumph
// (Recharges after a Short or Long Rest)").
import type { ReactNode } from "react";
import styles from "../hb.module.css";
import { USES, type UseRow } from "./rules";

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

/** Repeatable name + usage + text rows, with optional one-click book templates. */
export function UseRows({
  rows, onChange, namePh = "Name", textPh = "What it does…", addLabel = "+ Add", max = 20, templates,
}: {
  rows: UseRow[];
  onChange: (r: UseRow[]) => void;
  namePh?: string;
  textPh?: string;
  addLabel?: string;
  max?: number;
  templates?: UseRow[];
}) {
  const set = (i: number, p: Partial<UseRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const move = (i: number, d: number) => {
    const j = i + d; if (j < 0 || j >= rows.length) return;
    const next = rows.slice(); [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  const has = (n: string) => rows.some((r) => r.name.toLowerCase() === n.toLowerCase());
  return (
    <div>
      <div className="flex flex-col gap-2">
        {rows.map((t, i) => (
          <div key={i} className={styles.atkRow}>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-col gap-1 sm:w-64 sm:self-start">
                <input className={fieldCls} value={t.name} maxLength={120} placeholder={namePh} aria-label="name" onChange={(e) => set(i, { name: e.target.value })} />
                <Select className="w-full text-[12px]" value={t.use} ariaLabel="usage" options={[["", "— at will —"], ...USES.map((u) => [u, u] as [string, string])]} onChange={(v) => set(i, { use: v })} />
              </div>
              <textarea className={`${fieldCls} min-w-0 flex-1`} rows={3} value={t.description} maxLength={4000} placeholder={textPh} aria-label="description" onChange={(e) => set(i, { description: e.target.value })} />
              <div className="flex gap-1 sm:flex-col">
                <button type="button" className={smallBtn} title="Move up" onClick={() => move(i, -1)}>↑</button>
                <button type="button" className={smallBtn} title="Move down" onClick={() => move(i, 1)}>↓</button>
                <button type="button" className={smallBtn} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {rows.length < max ? (
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={addBtn} onClick={() => onChange([...rows, { name: "", use: "", description: "" }])}>{addLabel}</button>
          {templates?.length ? (
            <select
              className={`${selCls} mt-2 text-[12px]`}
              aria-label="add a book trait"
              value=""
              onChange={(e) => { const t = templates.find((x) => x.name === e.target.value); if (t) onChange([...rows, { ...t }]); }}
            >
              <option value="">+ Book trait…</option>
              {templates.map((t) => <option key={t.name} value={t.name} disabled={has(t.name)}>{t.name}</option>)}
            </select>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
