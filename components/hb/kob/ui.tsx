"use client";
// ── Kids on Bikes builder bits shared by the components/hb/kob/* builders ────
// Class strings matching the other systems' builders, a labelled Cell, an
// OpenSelect (list + "Other…"), RowCtl (↑ ↓ ✕) and useKobData() — the book
// tropes, strengths, flaws and bike parts, loaded once at runtime from
// public/tools-data/kob-*.js plus the user's own homebrew via kob-homebrew.js
// (KOBHB), so the client bundle doesn't import lib/data/kob-*.ts. Those files
// declare bare `const KOB_*` globals (not on window), so they're read through a
// global-scope Function.
import { useEffect, useState, type ReactNode } from "react";
import styles from "../hb.module.css";

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
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

/** A select over a list plus "Other…" for a custom value (bike colour, accessory). */
export function OpenSelect({ value, options, onChange, ariaLabel, placeholder, blank }: { value: string; options: string[]; onChange: (v: string) => void; ariaLabel?: string; placeholder?: string; blank?: string }) {
  // The book lists load at runtime: until they arrive, show the value as-is.
  const [picked, setOther] = useState(false);
  const loading = !options.length;
  const other = picked || (!loading && !!value && !options.includes(value));
  const opts = loading && value ? [value] : options;
  return (
    <span className="flex flex-wrap items-center gap-2">
      <select className={selCls} aria-label={ariaLabel} value={other ? "__other" : value} onChange={(e) => { if (e.target.value === "__other") { setOther(true); onChange(""); } else { setOther(false); onChange(e.target.value); } }}>
        <option value="">{blank ?? "—"}</option>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        <option value="__other">Other…</option>
      </select>
      {other ? <input className={`${fieldCls} max-w-[160px]`} value={value} maxLength={40} placeholder={placeholder ?? "Custom"} aria-label={`${ariaLabel ?? ""} custom`} onChange={(e) => onChange(e.target.value)} /> : null}
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

// ── Book data (runtime) ──────────────────────────────────────────────────────
export type KobTropeRec = { name: string; book: string; suggestedStrengths?: string[]; suggestedFlaws?: string[]; source?: string };
export type KobStrengthRec = { name: string; book: string; cost?: string; description?: string; source?: string };
export type KobFlawRec = { name: string; book: string; description?: string; source?: string };
export type KobItemRec = { name: string; book: string; kind: string };
export type KobData = { tropes: KobTropeRec[]; strengths: KobStrengthRec[]; flaws: KobFlawRec[]; items: KobItemRec[] };
const KOB_JS = ["/tools-data/kob-tropes.js", "/tools-data/kob-strengths.js", "/tools-data/kob-flaws.js", "/tools-data/kob-items.js", "/tools-data/kob-homebrew.js"];
let kobLoad: Promise<void> | null = null;
function loadKob(): Promise<void> {
  if (!kobLoad) {
    kobLoad = Promise.all(KOB_JS.map((src) => new Promise<void>((resolve) => {
      if (document.querySelector(`script[data-hb-src="${src}"]`)) return resolve();
      const el = document.createElement("script");
      el.src = src; el.async = false; el.dataset.hbSrc = src;
      el.onload = () => resolve(); el.onerror = () => resolve();
      document.head.appendChild(el);
    })))
      // kob-homebrew.js mutates the pools in place with the user's own homebrew.
      .then(() => new Promise<void>((resolve) => {
        const hb = (window as unknown as { KOBHB?: { load: (cb: () => void) => void } }).KOBHB;
        if (!hb) return resolve();
        const t = setTimeout(resolve, 4000);
        hb.load(() => { clearTimeout(t); resolve(); });
      }));
  }
  return kobLoad;
}
const globalList = <T,>(k: string): T[] => {
  try {
    const v = new Function(`return typeof ${k} !== "undefined" ? ${k} : null`)() as unknown;
    return Array.isArray(v) ? (v as T[]).filter((x) => x && (x as { name?: string }).name) : [];
  } catch { return []; }
};
/** The book (+ own homebrew) tropes, strengths, flaws and items, or null until loaded. */
export function useKobData(): KobData | null {
  const [data, setData] = useState<KobData | null>(null);
  useEffect(() => {
    let live = true;
    loadKob().then(() => {
      if (live) setData({ tropes: globalList<KobTropeRec>("KOB_TROPES"), strengths: globalList<KobStrengthRec>("KOB_STRENGTHS"), flaws: globalList<KobFlawRec>("KOB_FLAWS"), items: globalList<KobItemRec>("KOB_ITEMS") });
    });
    return () => { live = false; };
  }, []);
  return data;
}
/** Unique names, in first-seen order. */
export const uniqNames = (xs: { name: string }[]) => [...new Set(xs.map((x) => x.name))];
