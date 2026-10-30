"use client";
// ── Pirate Borg builder bits shared by the components/hb/pb/* builders ───────
// Class strings matching the other systems' builders, a labelled Cell, a
// Toggle, a Select that keeps an unknown (legacy) value, row chrome
// (↑ ↓ ✕), and the PB pickers: SDiceInput (dice + "+SPIRIT"), DurationInput
// (dice + unit, or kept text), TestInput (ability + DR) and ArmorDieSelect.
import type { ReactNode } from "react";
import DiceInput from "../DiceInput";
import Stepper from "../Stepper";
import { PB_ABILITIES, PB_DICE, PB_UNITS, type PbDuration, type PbTest, type SDice } from "./rules";

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

/** ↑ ↓ ✕ for row i of a list. */
export function RowCtl<T>({ rows, i, onChange }: { rows: T[]; i: number; onChange: (r: T[]) => void }) {
  const move = (d: number) => {
    const j = i + d; if (j < 0 || j >= rows.length) return;
    const next = rows.slice(); [next[i], next[j]] = [next[j], next[i]]; onChange(next);
  };
  return (
    <div className="flex gap-1">
      <button type="button" className={smallBtn} title="Move up" onClick={() => move(-1)}>↑</button>
      <button type="button" className={smallBtn} title="Move down" onClick={() => move(1)}>↓</button>
      <button type="button" className={smallBtn} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</button>
    </div>
  );
}

/** Dice with an optional "+ SPIRIT" (rolled by the sheet with the caster's SPIRIT). 0 dice = none. */
export function SDiceInput({ value, onChange, spirit = true, ariaLabel, maxCount = 10 }: { value: SDice; onChange: (v: SDice) => void; spirit?: boolean; ariaLabel: string; maxCount?: number }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      <DiceInput value={value} dice={PB_DICE} maxCount={maxCount} modMin={0} modMax={20} ariaLabel={ariaLabel} onChange={(d) => onChange({ ...value, ...d })} />
      {spirit ? <Toggle checked={value.spirit} onChange={(v) => onChange({ ...value, spirit: v })}>+ SPIRIT</Toggle> : null}
    </span>
  );
}

/** Duration: dice (+SPIRIT) + unit. A legacy text duration that didn't parse is kept and shown as text. */
export function DurationInput({ value, onChange }: { value: PbDuration; onChange: (v: PbDuration) => void }) {
  if (value.text) {
    return (
      <span className="flex flex-wrap items-center gap-2">
        <input className={`${fieldCls} max-w-[240px]`} value={value.text} maxLength={60} onChange={(e) => onChange({ ...value, text: e.target.value })} />
        <button type="button" className={smallBtn} onClick={() => onChange({ ...value, text: "" })}>Use dice picker</button>
      </span>
    );
  }
  return (
    <span className="flex flex-wrap items-center gap-2">
      <SDiceInput value={value.dice} ariaLabel="duration" onChange={(d) => onChange({ ...value, dice: d })} />
      <Select value={value.unit} options={PB_UNITS} ariaLabel="duration unit" onChange={(u) => onChange({ ...value, unit: u })} />
      <button type="button" className={smallBtn} title="Write it out instead (“until dawn”)" onClick={() => onChange({ ...value, text: "until dawn" })}>Text</button>
    </span>
  );
}

/** A Test: ability (or "—", the GM picks) + DR; null = no test. */
export function TestInput({ value, onChange, noneLabel = "No test", anyLabel = "any ability" }: { value: PbTest; onChange: (v: PbTest) => void; noneLabel?: string; anyLabel?: string }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      <Select
        value={value ? value.ability || "*" : ""}
        options={[["", noneLabel], ["*", anyLabel], ...PB_ABILITIES.map((a) => [a, a] as [string, string])]}
        ariaLabel="test ability"
        onChange={(v) => onChange(v === "" ? null : { ability: v === "*" ? "" : v, dr: value?.dr ?? 12 })}
      />
      {value ? (
        <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">DR
          <Stepper value={value.dr} min={2} max={20} width="2.4em" ariaLabel="DR" onChange={(n) => onChange({ ...value, dr: n ?? 12 })} />
        </span>
      ) : null}
    </span>
  );
}
