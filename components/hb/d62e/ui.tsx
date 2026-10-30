"use client";
// ── D6 System 2e builder bits shared by the components/hb/d62e/* builders ─────
// Class strings matching the other systems' builders, a labelled Cell, Toggle,
// a Select that keeps an unknown (legacy) value, CodeInput (a die-code picker:
// dice + pips steppers where 3 pips roll over into 1D and −1 pip borrows a die),
// AsWritten (a legacy text value with a "Use pickers" escape), RowCtl, and
// useD62eData() — the book lists (skills, perks, powers, limitations) loaded once
// at runtime from public/tools-data/d62e-*.js so the client bundle doesn't
// import the lib/data/d62e-*.ts tables. Those files declare bare `const D62E_*`
// globals (not on window), so they're read through a global-scope Function.
import { useEffect, useState, type ReactNode } from "react";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { d6Code } from "./rules";

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const smallBtn = "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const addBtn = "mt-2 rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
export const hint = "mt-1 text-[11px] text-[var(--muted)]";
export const miniLbl = "flex flex-col gap-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";

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

/** Die code: [dice] D + [pips]. Pips step −1…+3 and carry, so the value is always n·3+p with p 0–2.
 *  nullable: "—" (no code; e.g. a creature without an optional attribute) with × to clear and "Set" to start. */
export function CodeInput({ value, onChange, min = 0, max = 90, nullable = false, ariaLabel = "code", dflt = 6, plus = false }: {
  value: number | null; onChange: (v: number | null) => void; min?: number; max?: number; nullable?: boolean; ariaLabel?: string; dflt?: number; plus?: boolean;
}) {
  if (value == null) {
    return (
      <span className="inline-flex h-[34px] items-center gap-2">
        <span className="font-mono text-sm text-[var(--muted)]">—</span>
        <button type="button" className={smallBtn} onClick={() => onChange(dflt)}>Set</button>
      </span>
    );
  }
  const d = Math.floor(value / 3), p = value % 3;
  const set = (n: number) => onChange(Math.min(max, Math.max(min, n)));
  return (
    <span className={styles.dice} title={d6Code(value)}>
      {plus ? <span className={styles.diceSep}>+</span> : null}
      <Stepper value={d} min={Math.floor(min / 3)} max={Math.floor(max / 3)} width="2.2em" ariaLabel={`${ariaLabel} dice`} onChange={(n) => set((n ?? 0) * 3 + p)} />
      <span className={`${styles.diceSep} whitespace-nowrap`}>D +</span>
      <Stepper value={p} min={d > 0 ? -1 : 0} max={3} width="1.6em" ariaLabel={`${ariaLabel} pips`} title="Pips: 3 pips = 1D" onChange={(n) => set(d * 3 + (n ?? 0))} />
      {nullable ? <button type="button" className={smallBtn} title="No code" onClick={() => onChange(null)}>×</button> : null}
    </span>
  );
}

/** A legacy value the pickers can't reproduce exactly — edited as written until "Use pickers". */
export function AsWritten({ value, onChange, onPickers, max = 120, wide = false }: { value: string; onChange: (v: string) => void; onPickers: () => void; max?: number; wide?: boolean }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      <input className={`${fieldCls} ${wide ? "max-w-[520px]" : "max-w-[320px]"}`} value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} />
      <button type="button" className={smallBtn} onClick={onPickers}>Use pickers</button>
    </span>
  );
}

/** ↑ ↓ ✕ for row i of a list. */
export function RowCtl<T>({ rows, i, onChange }: { rows: T[]; i: number; onChange: (r: T[]) => void }) {
  const move = (d: number) => {
    const j = i + d; if (j < 0 || j >= rows.length) return;
    const next = rows.slice(); [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  return (
    <span className="flex gap-1">
      <span role="button" tabIndex={0} className={styles.iconBtn} title="Move up" aria-disabled={i === 0} onClick={() => move(-1)}>↑</span>
      <span role="button" tabIndex={0} className={styles.iconBtn} title="Move down" aria-disabled={i === rows.length - 1} onClick={() => move(1)}>↓</span>
      <span role="button" tabIndex={0} className={styles.iconBtn} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</span>
    </span>
  );
}

/** Editable list of free-text lines (special abilities, extra option lines). */
export function LineRows({ rows, onChange, placeholder, addLabel = "+ Line", max = 400 }: { rows: string[]; onChange: (r: string[]) => void; placeholder?: string; addLabel?: string; max?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((g, i) => (
        <span key={i} className="flex items-center gap-2">
          <input className={fieldCls} value={g} maxLength={max} placeholder={placeholder} onChange={(e) => onChange(rows.map((x, j) => (j === i ? e.target.value : x)))} />
          <RowCtl rows={rows} i={i} onChange={onChange} />
        </span>
      ))}
      <button type="button" className={`${addBtn} self-start`} onClick={() => onChange([...rows, ""])}>{addLabel}</button>
    </div>
  );
}

// ── Book data (runtime) ──────────────────────────────────────────────────────
type Named = { name: string; [k: string]: unknown };
export type D62eData = {
  skills: { name: string; attribute: string; genre?: string }[];
  perks: Named[]; powers: Named[]; limitations: { name: string; value: number; description?: string }[];
};
const D62E_JS: string[] = ["/tools-data/d62e-skills.js", "/tools-data/d62e-perks.js", "/tools-data/d62e-powers.js", "/tools-data/d62e-limitations.js"];
let load: Promise<void> | null = null;
function loadD62e(): Promise<void> {
  if (!load) {
    load = Promise.all(D62E_JS.map((src) => new Promise<void>((resolve) => {
      if (document.querySelector(`script[data-hb-src="${src}"]`)) return resolve();
      const el = document.createElement("script");
      el.src = src; el.async = false; el.dataset.hbSrc = src;
      el.onload = () => resolve(); el.onerror = () => resolve();
      document.head.appendChild(el);
    }))).then(() => undefined);
  }
  return load;
}
// The tools-data files use top-level `const`, which lives in the global lexical scope (not on window).
const globalList = (k: string): Named[] => {
  try {
    const v = new Function(`return typeof ${k} !== "undefined" ? ${k} : null`)() as unknown;
    return Array.isArray(v) ? (v as Named[]).filter((x) => x && x.name) : [];
  } catch { return []; }
};
const read = (): D62eData => ({
  skills: globalList("D62E_SKILLS") as unknown as D62eData["skills"],
  perks: globalList("D62E_PERKS"), powers: globalList("D62E_POWERS"),
  limitations: globalList("D62E_LIMITATIONS") as unknown as D62eData["limitations"],
});
/** The book lists, or null until the scripts have loaded. */
export function useD62eData(): D62eData | null {
  const [data, setData] = useState<D62eData | null>(null);
  useEffect(() => {
    let live = true;
    loadD62e().then(() => { if (live) setData(read()); });
    return () => { live = false; };
  }, []);
  return data;
}
/** Governing attribute of a skill name (case-insensitive, ignoring a "(or …)" note), or null. */
export const skillAttrOf = (d: D62eData | null, name: string): string | null => {
  const n = name.replace(/\(.*?\)/g, "").trim().toLowerCase();
  return d?.skills.find((x) => x.name.toLowerCase() === n)?.attribute ?? null;
};
export const skillNames = (d: D62eData | null) => (d ? [...new Set(d.skills.map((x) => x.name))].sort() : []);
