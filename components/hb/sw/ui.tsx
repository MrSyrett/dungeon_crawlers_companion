"use client";
// ── Star Wars builder bits shared by the components/hb/sw/* builders ─────────
// Class strings matching the other systems' builders, a labelled Cell, Toggle,
// a Select that keeps an unknown (legacy) value, CodeInput (the WEG die-code
// picker: dice + pips steppers where 3 pips roll over into 1D, and −1 pip
// borrows a die), PickList (pick from a list into removable chips) and
// useSwData() — the book lists (skills, Force powers, weapons, gear) loaded once
// at runtime from public/tools-data/sw-*.js so the client bundle doesn't import
// the lib/data/sw-*.ts tables. Those files declare bare `const SW_*` globals
// (not on window), so they're read through a global-scope Function.
import { useEffect, useState, type ReactNode } from "react";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { swCode, type SwAttr } from "./rules";

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

/** WEG die code: [dice] D + [pips]. Pips step −1…+3 and carry, so the value is always n·3+p with p 0–2.
 *  nullable: "—" (no code; e.g. a creature with no Knowledge) with a × to clear and "Set" to start. */
export function CodeInput({ value, onChange, min = 0, max = 90, nullable = false, ariaLabel = "code", dflt = 6 }: {
  value: number | null; onChange: (v: number | null) => void; min?: number; max?: number; nullable?: boolean; ariaLabel?: string; dflt?: number;
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
    <span className={styles.dice} title={swCode(value)}>
      <Stepper value={d} min={Math.floor(min / 3)} max={Math.floor(max / 3)} width="2.2em" ariaLabel={`${ariaLabel} dice`} onChange={(n) => set((n ?? 0) * 3 + p)} />
      <span className={`${styles.diceSep} whitespace-nowrap`}>D +</span>
      <Stepper value={p} min={d > 0 ? -1 : 0} max={3} width="1.6em" ariaLabel={`${ariaLabel} pips`} title="Pips: 3 pips = 1D" onChange={(n) => set(d * 3 + (n ?? 0))} />
      {nullable ? <button type="button" className={smallBtn} title="No code" onClick={() => onChange(null)}>×</button> : null}
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
type Named = { name: string; [k: string]: unknown };
export type SwData = { skills: { name: string; attribute: SwAttr }[]; force: Named[]; weapons: Named[]; gear: Named[] };
const SW_JS: [string, string][] = [["/tools-data/sw-skills.js", "SW_SKILLS"], ["/tools-data/sw-force.js", "SW_FORCE"], ["/tools-data/sw-weapons.js", "SW_WEAPONS"], ["/tools-data/sw-gear.js", "SW_GEAR"]];
let swLoad: Promise<void> | null = null;
function loadSw(): Promise<void> {
  if (!swLoad) {
    swLoad = Promise.all(SW_JS.map(([src]) => new Promise<void>((resolve) => {
      if (document.querySelector(`script[data-hb-src="${src}"]`)) return resolve();
      const el = document.createElement("script");
      el.src = src; el.async = false; el.dataset.hbSrc = src;
      el.onload = () => resolve(); el.onerror = () => resolve();
      document.head.appendChild(el);
    }))).then(() => undefined);
  }
  return swLoad;
}
// The tools-data files use top-level `const`, which lives in the global lexical scope (not on window).
const globalList = (k: string): Named[] => {
  try {
    const v = new Function(`return typeof ${k} !== "undefined" ? ${k} : null`)() as unknown;
    return Array.isArray(v) ? (v as Named[]).filter((x) => x && x.name) : [];
  } catch { return []; }
};
const readSw = (): SwData => ({
  skills: globalList("SW_SKILLS") as unknown as SwData["skills"], force: globalList("SW_FORCE"), weapons: globalList("SW_WEAPONS"), gear: globalList("SW_GEAR"),
});
/** The book lists, or null until the scripts have loaded. */
export function useSwData(): SwData | null {
  const [data, setData] = useState<SwData | null>(null);
  useEffect(() => {
    let live = true;
    loadSw().then(() => { if (live) setData(readSw()); });
    return () => { live = false; };
  }, []);
  return data;
}
/** Book skill names in the book's lowercase stat-block style ("blaster", "melee weapons"). */
export const skillNames = (d: SwData | null) => (d ? [...new Set(d.skills.map((x) => x.name.toLowerCase()))].sort() : []);
/** Governing attribute of a skill name (case-insensitive), or null. */
export const skillAttrOf = (d: SwData | null, name: string): SwAttr | null => {
  const n = name.trim().toLowerCase();
  return d?.skills.find((x) => x.name.toLowerCase() === n)?.attribute ?? null;
};
