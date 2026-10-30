"use client";
// ── ICRPG builder bits shared by the components/hb/icrpg/* builders ──────────
// Class strings matching the other systems' builders, a labelled Cell, a
// Toggle, a Select that keeps an unknown (legacy) value, row chrome (↑ ↓ ✕),
// the LootBonus "icrpg" badge cell + preview strip, and a "kept as text" input.
import type { ReactNode } from "react";
import LootBonusBadges, { useLootBonus } from "../LootBonusBadges";
import { BadgeStrip, type Badge } from "../BonusBadges";

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const smallBtn = "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const addBtn = "mt-2 rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const hint = "mt-1 text-[11px] text-[var(--muted)]";

/** The spell list the "Spell" badge picks from (window.ICRPG_SPELLS). */
export const IC_JS = ["/tools-data/icrpg-spells.js"];

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
export function RowCtl<T>({ rows, i, onChange }: { rows: T[]; i: number; onChange: (r: T[]) => void }) {
  const move = (d: number) => {
    const j = i + d; if (j < 0 || j >= rows.length) return;
    const next = rows.slice(); [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  return (
    <div className="flex shrink-0 gap-1">
      <button type="button" className={smallBtn} title="Move up" onClick={() => move(-1)}>↑</button>
      <button type="button" className={smallBtn} title="Move down" onClick={() => move(1)}>↓</button>
      <button type="button" className={smallBtn} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</button>
    </div>
  );
}

/** A list of short free-text lines (ability text, extra effects) with add / reorder / remove. */
export function TextRows({ rows, onChange, placeholder, addLabel, max = 20, maxLength = 200 }: { rows: string[]; onChange: (r: string[]) => void; placeholder?: string; addLabel: string; max?: number; maxLength?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className={fieldCls} value={r} maxLength={maxLength} placeholder={placeholder} onChange={(e) => onChange(rows.map((x, j) => (j === i ? e.target.value : x)))} />
          <RowCtl rows={rows} i={i} onChange={onChange} />
        </div>
      ))}
      {rows.length < max ? <button type="button" className={`${addBtn} self-start`} onClick={() => onChange([...rows, ""])}>{addLabel}</button> : null}
    </div>
  );
}

export function Bonuses({ value, onChange, only, help }: { value: Badge[]; onChange: (v: Badge[]) => void; only?: string[]; help?: ReactNode }) {
  return (
    <Cell label="Bonuses" className="sm:col-span-2" help={help}>
      <LootBonusBadges sys="icrpg" scripts={IC_JS} value={value} only={only} empty="No bonuses yet" onChange={onChange} />
    </Cell>
  );
}
export function PreviewBadges({ value }: { value: Badge[] }) {
  const L = useLootBonus("icrpg", IC_JS);
  return <div className="my-2"><BadgeStrip value={value} kinds={L.kinds} stats={L.stats} empty="No automated bonuses" /></div>;
}
