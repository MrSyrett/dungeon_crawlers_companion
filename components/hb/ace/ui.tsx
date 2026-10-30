"use client";
// ── ACE! builder bits shared by the components/hb/ace/* builders ────────────
// Class strings matching the other systems' builders, a labelled Cell, Toggle,
// a Select that keeps an unknown (legacy) value, PickList (pick from a list
// into removable chips, custom allowed), RowCtl (↑ ↓ ✕) and useAceData() — the
// book focuses and gear, loaded once at runtime from public/tools-data/ace-*.js
// (plus the user's own homebrew via ace-homebrew.js) so the client bundle
// doesn't import lib/data/ace-*.ts. Those files declare bare `const ACE_*`
// globals (not on window), so they're read through a global-scope Function.
import { useEffect, useState, type ReactNode } from "react";
import styles from "../hb.module.css";

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

/** A select over a list plus "Other…" for a custom value (category, type). */
export function OpenSelect({ value, options, onChange, ariaLabel, placeholder }: { value: string; options: string[]; onChange: (v: string) => void; ariaLabel?: string; placeholder?: string }) {
  const known = options.includes(value);
  const [other, setOther] = useState(!known && !!value);
  return (
    <span className="flex flex-wrap items-center gap-2">
      <select className={selCls} aria-label={ariaLabel} value={other ? "__other" : value} onChange={(e) => { if (e.target.value === "__other") { setOther(true); onChange(""); } else { setOther(false); onChange(e.target.value); } }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
        <option value="__other">Other…</option>
      </select>
      {other ? <input className={`${fieldCls} max-w-[200px]`} value={value} maxLength={40} placeholder={placeholder ?? "Custom"} aria-label={`${ariaLabel ?? ""} custom`} onChange={(e) => onChange(e.target.value)} /> : null}
    </span>
  );
}

/** Pick values from a list (or type a custom one) into removable chips. */
export function PickList({ value, onChange, options, placeholder = "+ Add…", custom = true, max = 20 }: {
  value: string[]; onChange: (v: string[]) => void; options: string[]; placeholder?: string; custom?: boolean; max?: number;
}) {
  const [draft, setDraft] = useState("");
  const has = (v: string) => value.some((x) => x.toLowerCase() === v.toLowerCase());
  const add = (v: string) => { const t = v.trim(); if (t && !has(t) && value.length < max) onChange([...value, t]); setDraft(""); };
  const left = options.filter((o) => !has(o));
  return (
    <div className="flex flex-col gap-2">
      <div className={styles.chips}>
        {value.length ? value.map((v) => (
          <span key={v} className={`${styles.chip} ${styles.on}`}>{v} <span role="button" tabIndex={0} title="Remove" className="ml-1 opacity-70 hover:opacity-100" onClick={() => onChange(value.filter((x) => x !== v))}>×</span></span>
        )) : <span className={styles.badgeEmpty}>None</span>}
      </div>
      <span className="flex flex-wrap items-center gap-2">
        <select className={selCls} value="" aria-label={placeholder} onChange={(e) => add(e.target.value)}>
          <option value="">{placeholder}</option>
          {left.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {custom ? (
          <>
            <input className={`${fieldCls} max-w-[200px]`} value={draft} maxLength={80} placeholder="or type a custom one" onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(draft); } }} />
            <button type="button" className={smallBtn} onClick={() => add(draft)}>Add</button>
          </>
        ) : null}
      </span>
    </div>
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

// ── Book data (runtime) ──────────────────────────────────────────────────────
export type AceFocusRec = { name: string; stat: string; setting?: string; note?: string; source?: string };
export type AceGearRec = { name: string; category?: string; damage?: number | null; tier?: string; source?: string };
export type AceData = { focuses: AceFocusRec[]; gear: AceGearRec[] };
const ACE_JS = ["/tools-data/ace-focuses.js", "/tools-data/ace-gear.js", "/tools-data/ace-homebrew.js"];
let aceLoad: Promise<void> | null = null;
function loadAce(): Promise<void> {
  if (!aceLoad) {
    aceLoad = Promise.all(ACE_JS.map((src) => new Promise<void>((resolve) => {
      if (document.querySelector(`script[data-hb-src="${src}"]`)) return resolve();
      const el = document.createElement("script");
      el.src = src; el.async = false; el.dataset.hbSrc = src;
      el.onload = () => resolve(); el.onerror = () => resolve();
      document.head.appendChild(el);
    })))
      // ace-homebrew.js mutates the pools in place with the user's own homebrew.
      .then(() => new Promise<void>((resolve) => {
        const hb = (window as unknown as { ACEHB?: { load: (cb: () => void) => void } }).ACEHB;
        if (!hb) return resolve();
        const t = setTimeout(resolve, 4000);
        hb.load(() => { clearTimeout(t); resolve(); });
      }));
  }
  return aceLoad;
}
const globalList = <T,>(k: string): T[] => {
  try {
    const v = new Function(`return typeof ${k} !== "undefined" ? ${k} : null`)() as unknown;
    return Array.isArray(v) ? (v as T[]).filter((x) => x && (x as { name?: string }).name) : [];
  } catch { return []; }
};
/** The book (+ own homebrew) focuses and gear, or null until loaded. */
export function useAceData(): AceData | null {
  const [data, setData] = useState<AceData | null>(null);
  useEffect(() => {
    let live = true;
    loadAce().then(() => { if (live) setData({ focuses: globalList<AceFocusRec>("ACE_FOCUSES"), gear: globalList<AceGearRec>("ACE_GEAR") }); });
    return () => { live = false; };
  }, []);
  return data;
}
export const focusNamesFor = (d: AceData | null, stat?: string) =>
  d ? [...new Set(d.focuses.filter((f) => !stat || f.stat === stat).map((f) => f.name))].sort((a, b) => a.localeCompare(b)) : [];
