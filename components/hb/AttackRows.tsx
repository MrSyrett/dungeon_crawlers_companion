"use client";
// ── Homebrew builder kit · AttackRows ────────────────────────────────────────
// Repeatable attack rows for monsters / NPCs / natural weapons: name, ×count,
// to-hit, damage dice (count + die + flat mod), optional damage type / range /
// any extra selects, and a short "special" rider. Add / remove / reorder.
// System-agnostic: each system turns the rows into its own stat-block string.
//
//   <AttackRows rows={rows} onChange={setRows}
//     count={{ max: 6 }}                       // false hides ×N
//     hit={{ label: "To hit", min: -5, max: 20, optional: true }}   // false hides
//     dice={[4, 6, 8, 10, 12]}                // die sizes; mod={false} hides +M
//     modRange={[-5, 50]}                      // optional: +M bounds (default ±20)
//     ranges={["Close", "Near", "Far"]}       // omit → no range select
//     damageTypes={["fire", "cold"]}          // omit → no damage-type select
//     extras={[{ key: "join", label: "Then", options: [["or","or"],["and","and"]],
//                between: true }]}             // between: drawn between rows
//     specialPh="grab, poison…" namePh="claw" />
//     slot={(row, patch) => <MyCells …/>}     // optional: system-specific cells
//                                              drawn after the inline extras
//     hitSigned={false} diePrefix="D"         // optional: unsigned to-hit (a skill
//                                              level) and the die label style
//     damageCell={(row, patch) => <MyCode …/>} // optional: replaces the Damage
//                                              DiceInput (e.g. a WEG die code)
//
// Row shape (store it as-is, e.g. data.attackRows):
//   { name, count, hit: number|null, dice: {n,d,m}, range?, dtype?, special,
//     extra?: { [key]: string } }
// newAttackRow(defaults) builds a blank row. Themed by --hb-accent.
import type { ReactNode } from "react";
import Stepper from "./Stepper";
import DiceInput from "./DiceInput";
import styles from "./hb.module.css";
import { STANDARD_DICE, type Dice } from "./dice";

export type AttackRow = {
  name: string;
  count: number;
  hit: number | null;
  dice: Dice;
  range?: string;
  dtype?: string;
  special: string;
  extra?: Record<string, string>;
};

export type AttackExtra = {
  key: string;
  label: string;
  options: [string, string][];
  /** Render as a connector between this row and the previous one (skipped on row 0). */
  between?: boolean;
};

export const newAttackRow = (d: Partial<AttackRow> = {}): AttackRow => ({
  name: "",
  count: 1,
  hit: 0,
  dice: { n: 1, d: 6, m: 0 },
  special: "",
  ...d,
});

const inputCls =
  "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";

export default function AttackRows({
  rows,
  onChange,
  count = { min: 1, max: 10 },
  hit = { label: "To hit", min: -10, max: 30, optional: false },
  dice = STANDARD_DICE,
  mod = true,
  modRange,
  ranges,
  damageTypes,
  extras = [],
  namePh = "Attack name",
  specialPh = "Special (optional)",
  max = 12,
  addLabel = "+ Add attack",
  blank,
  slot,
  hitSigned = true,
  diePrefix,
  damageCell,
}: {
  rows: AttackRow[];
  onChange: (rows: AttackRow[]) => void;
  count?: { min?: number; max?: number; label?: string } | false;
  hit?: { min?: number; max?: number; label?: string; optional?: boolean } | false;
  dice?: number[];
  mod?: boolean;
  /** [min, max] for the flat +M (default DiceInput's −20…+20). */
  modRange?: [number, number];
  ranges?: string[];
  damageTypes?: string[];
  extras?: AttackExtra[];
  namePh?: string;
  specialPh?: string;
  max?: number;
  addLabel?: string;
  /** Factory for a new row (defaults to newAttackRow()). */
  blank?: () => AttackRow;
  /** Extra system-specific cells for a row (rendered after the inline extras). */
  slot?: (row: AttackRow, patch: (p: Partial<AttackRow>) => void) => ReactNode;
  /** Show the to-hit with a sign (default) — false for a skill level. */
  hitSigned?: boolean;
  /** Die label prefix passed to DiceInput (default "d"). */
  diePrefix?: string;
  /** Optional replacement for the Damage cell's DiceInput (the row's own damage picker). */
  damageCell?: (row: AttackRow, patch: (p: Partial<AttackRow>) => void) => ReactNode;
}) {
  const patch = (i: number, p: Partial<AttackRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const setExtra = (i: number, k: string, v: string) => patch(i, { extra: { ...(rows[i].extra ?? {}), [k]: v } });
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= rows.length) return;
    const next = rows.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const inline = extras.filter((x) => !x.between);
  const between = extras.filter((x) => x.between);

  return (
    <div className={styles.atkList}>
      {rows.map((r, i) => (
        <div key={i} className="flex flex-col gap-2">
          {i > 0 && between.length ? (
            <div className={styles.atkJoin}>
              {between.map((x) => (
                <select
                  key={x.key}
                  aria-label={x.label}
                  className={styles.diceSel}
                  style={{ height: 26, fontSize: 12 }}
                  value={r.extra?.[x.key] ?? x.options[0][0]}
                  onChange={(e) => setExtra(i, x.key, e.target.value)}
                >
                  {x.options.map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              ))}
            </div>
          ) : null}
          <div className={styles.atkRow}>
            <div className={styles.atkLine}>
              {count ? (
                <label className={styles.atkCell}>
                  <span className={styles.atkLbl}>{count.label ?? "×"}</span>
                  <Stepper value={r.count} min={count.min ?? 1} max={count.max ?? 10} width="2em" ariaLabel="attack count" onChange={(v) => patch(i, { count: v ?? 1 })} />
                </label>
              ) : null}
              <label className={`${styles.atkCell} ${styles.atkGrow}`}>
                <span className={styles.atkLbl}>Name</span>
                <input className={inputCls} value={r.name} maxLength={60} placeholder={namePh} onChange={(e) => patch(i, { name: e.target.value })} />
              </label>
              {ranges ? (
                <label className={styles.atkCell}>
                  <span className={styles.atkLbl}>Range</span>
                  <select className={styles.diceSel} value={r.range ?? ranges[0]} onChange={(e) => patch(i, { range: e.target.value })}>
                    {(r.range && !ranges.includes(r.range) ? [...ranges, r.range] : ranges).map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </label>
              ) : null}
              {hit ? (
                <label className={styles.atkCell}>
                  <span className={styles.atkLbl}>{hit.label ?? "To hit"}</span>
                  <Stepper value={r.hit} min={hit.min ?? -10} max={hit.max ?? 30} signed={hitSigned} nullable={!!hit.optional} width="2.6em" ariaLabel="to hit" onChange={(v) => patch(i, { hit: v })} />
                </label>
              ) : null}
              <label className={styles.atkCell}>
                <span className={styles.atkLbl}>Damage</span>
                {damageCell ? damageCell(r, (p) => patch(i, p)) : <DiceInput value={r.dice} dice={dice} mod={mod} modMin={modRange?.[0]} modMax={modRange?.[1]} diePrefix={diePrefix} ariaLabel="damage" onChange={(v) => patch(i, { dice: v })} />}
              </label>
              {damageTypes ? (
                <label className={styles.atkCell}>
                  <span className={styles.atkLbl}>Type</span>
                  <select className={styles.diceSel} value={r.dtype ?? ""} onChange={(e) => patch(i, { dtype: e.target.value })}>
                    <option value="">—</option>
                    {(r.dtype && !damageTypes.includes(r.dtype) ? [...damageTypes, r.dtype] : damageTypes).map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </label>
              ) : null}
              {inline.map((x) => (
                <label key={x.key} className={styles.atkCell}>
                  <span className={styles.atkLbl}>{x.label}</span>
                  <select className={styles.diceSel} value={r.extra?.[x.key] ?? x.options[0][0]} onChange={(e) => setExtra(i, x.key, e.target.value)}>
                    {x.options.map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </label>
              ))}
              {slot ? slot(r, (p) => patch(i, p)) : null}
            </div>
            <div className={`${styles.atkLine} mt-2`}>
              <input
                className={`${inputCls} min-w-0 flex-1`}
                value={r.special}
                maxLength={120}
                placeholder={specialPh}
                aria-label="special"
                onChange={(e) => patch(i, { special: e.target.value })}
              />
              <span className={styles.atkCtl}>
                <span role="button" tabIndex={0} className={styles.iconBtn} title="Move up" aria-disabled={i === 0} onClick={() => move(i, -1)}>↑</span>
                <span role="button" tabIndex={0} className={styles.iconBtn} title="Move down" aria-disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</span>
                <span role="button" tabIndex={0} className={styles.iconBtn} title="Remove attack" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</span>
              </span>
            </div>
          </div>
        </div>
      ))}
      {rows.length < max ? (
        <button
          type="button"
          className="self-start rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]"
          onClick={() => onChange([...rows, blank ? blank() : newAttackRow({ range: ranges?.[0] })])}
        >
          {addLabel}
        </button>
      ) : null}
    </div>
  );
}
