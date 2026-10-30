"use client";
// ── DCC rank upgrades builder (skills & spells: Rank 5 / 10 / 15) ────────────
// Each row: rank chips, "+N base damage dice" (locked to the base die — the
// sheet only sums dice of the base's size), an "add 1 Rank damage die" toggle
// and the rest as text. Rows compose to the stored {rank, text} with
// ./rules composeDccUpgrade — the clauses the DCC sheet parses to scale damage
// by Rank (dccDiceAtRank / dccRankDiceFor).
import ChipPicker from "../ChipPicker";
import Stepper from "../Stepper";
import { DCC_UPGRADE_RANKS, composeDccUpgrade, type DccUpgradeRow } from "./rules";

const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const smallBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

export default function UpgradeRows({
  rows, onChange, baseDie, damage,
}: {
  rows: DccUpgradeRow[];
  onChange: (rows: DccUpgradeRow[]) => void;
  /** The base damage die size, or 0 when the entry deals no damage. */
  baseDie: number;
  /** Show the damage controls (attack skills / attack spells). */
  damage: boolean;
}) {
  const patch = (i: number, p: Partial<DccUpgradeRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const used = rows.map((r) => r.rank);
  const nextRank = DCC_UPGRADE_RANKS.find((r) => !used.includes(r));
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r, i) => (
        <div key={i} className="rounded border border-[var(--border)] border-l-[3px] border-l-[var(--hb-accent)] p-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <ChipPicker single options={DCC_UPGRADE_RANKS.map((n) => [String(n), `Rank ${n}`] as [string, string])} value={[String(r.rank)]} onChange={(v) => patch(i, { rank: parseInt(v[0] ?? "5", 10) || 5 })} />
            {damage && baseDie ? (
              <span className="flex items-center gap-1.5 text-[12px] text-[var(--text)]">
                <Stepper value={r.add.n} min={0} max={10} width="2em" ariaLabel="extra base damage dice" onChange={(v) => patch(i, { add: { n: v ?? 0, d: baseDie, m: 0 } })} />
                d{baseDie} base damage
              </span>
            ) : null}
            {damage ? (
              <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]" title="Core p.176: a Rank damage die (Table 37) added on a hit; never doubled on a Critical">
                <input type="checkbox" checked={r.rankDie} onChange={(e) => patch(i, { rankDie: e.target.checked })} />
                + 1 Rank damage die
              </label>
            ) : null}
            <button type="button" className={`${smallBtn} ml-auto`} title="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>✕</button>
          </div>
          <textarea className={`${fieldCls} mt-2`} rows={2} maxLength={560} value={r.text} placeholder="Anything else this Rank unlocks (a debuff, a rider, more targets…)" onChange={(e) => patch(i, { text: e.target.value })} />
          <p className="mt-1 text-[10px] text-[var(--muted)]">Stored as: {composeDccUpgrade(r) || "—"}</p>
        </div>
      ))}
      {nextRank ? (
        <button
          type="button"
          className="self-start rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]"
          onClick={() => onChange([...rows, { rank: nextRank, add: { n: 0, d: baseDie || 6, m: 0 }, rankDie: false, text: "" }].sort((a, b) => a.rank - b.rank))}
        >
          + Rank {nextRank} upgrade
        </button>
      ) : null}
    </div>
  );
}

export function UpgradeList({ rows }: { rows: DccUpgradeRow[] }) {
  const list = rows.map((r) => ({ rank: r.rank, text: composeDccUpgrade(r) })).filter((r) => r.text).sort((a, b) => a.rank - b.rank);
  if (!list.length) return null;
  return (
    <dl className="mt-2 flex flex-col gap-1 border-t border-[var(--border)] pt-2">
      {list.map((u, i) => (
        <div key={i} className="flex gap-2 text-[12px] leading-snug">
          <dt className="shrink-0 font-bold uppercase tracking-[0.08em] text-[var(--hb-accent)]">R{u.rank}</dt>
          <dd>{u.text}</dd>
        </div>
      ))}
    </dl>
  );
}
