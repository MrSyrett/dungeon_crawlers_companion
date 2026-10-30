"use client";
// ── Homebrew builder kit · BonusBadges ───────────────────────────────────────
// A strip of coloured bonus badges (each with ×) plus a "+ Bonus" popover menu,
// the same look and flow as the GM Screen loot builder (public/tools-data/
// loot-bonus.js `.lbn-*`). Generic: the caller supplies the kinds.
//
//   <BonusBadges value={badges} onChange={setBadges} kinds={KINDS} stats={STATS} />
//
// A badge is { kind, target?, amount? }. A kind declares what it needs:
//   { k: "ac", label: "AC", color: "blue", amount: true, fmt: "{n} AC", tip }
//   amount: true          → signed whole number (+N); optAmount: true → may be 0/blank
//   target: "stat"        → one of props.stats ([id, label][])
//   target: "choice"      → one of kind.choices (string[] or [value, label][])
//   target: "list"        → a name from kind.list ({name, meta?}[]), free text allowed
//   target: "text"        → free text (notes)
//   optTarget: true       → target may be left blank
//   fmt                   → label template: {n} amount, {t} target label, {label} kind label
//   format(b)             → full custom label (wins over fmt)
// Other props: readOnly, empty (placeholder text when none), addLabel ("+ Bonus"),
// max (24), only (restrict the menu to these kind keys).
// Systems with their own storage map to/from badges at the boundary (see
// components/hb/sd/effects.ts); LootBonus systems use ./LootBonusBadges.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./hb.module.css";

export type Badge = { kind: string; target?: string; amount?: number };
export type BadgeColor = "blue" | "green" | "purple" | "teal" | "gold" | "red" | "grey";
export type BadgeKind = {
  k: string;
  label: string;
  color?: BadgeColor;
  amount?: boolean;
  optAmount?: boolean;
  amountPh?: string;
  target?: "stat" | "choice" | "list" | "text";
  optTarget?: boolean;
  choices?: readonly (string | readonly [string, string])[];
  list?: readonly { name: string; meta?: string }[];
  targetPh?: string;
  tip?: string;
  fmt?: string;
  format?: (b: Badge) => string;
};

const signed = (n: number) => (n >= 0 ? "+" : "") + n;
const pairs = (c: BadgeKind["choices"]): [string, string][] =>
  (c ?? []).map((x) => (typeof x === "string" ? [x, x] : [x[0], x[1]]));

/** Human label for one badge under a kinds config (exported for previews). */
export function badgeLabel(b: Badge, kinds: readonly BadgeKind[], stats: readonly (readonly [string, string])[] = []): string {
  const K = kinds.find((x) => x.k === b.kind);
  if (!K) return b.target || b.kind;
  if (K.format) return K.format(b);
  let t = b.target ?? "";
  if (K.target === "stat") t = stats.find((s) => s[0] === t)?.[1] ?? t.toUpperCase();
  if (K.target === "choice") t = pairs(K.choices).find(([v]) => v === t)?.[1] ?? t;
  if (K.target === "text") return t;
  const n = b.amount != null ? signed(b.amount) : "";
  return (K.fmt || (K.target ? "{n} {t}" : "{n} {label}"))
    .replace("{n}", n)
    .replace("{t}", t)
    .replace("{label}", K.label)
    .replace(/\s+/g, " ")
    .trim();
}

/** Read-only strip for previews. */
export function BadgeStrip({ value, kinds, stats, empty }: { value: Badge[]; kinds: readonly BadgeKind[]; stats?: readonly (readonly [string, string])[]; empty?: string }) {
  return (
    <div className={styles.badges}>
      {value.map((b, i) => {
        const K = kinds.find((x) => x.k === b.kind);
        return (
          <span key={i} className={`${styles.badge} ${styles.ro} ${styles[`c-${K?.color ?? "grey"}`]}`} title={K?.tip}>
            <span>{badgeLabel(b, kinds, stats)}</span>
          </span>
        );
      })}
      {!value.length && empty ? <span className={styles.badgeEmpty}>{empty}</span> : null}
    </div>
  );
}

export default function BonusBadges({
  value,
  onChange,
  kinds,
  stats = [],
  readOnly = false,
  empty,
  addLabel = "+ Bonus",
  max = 24,
  only,
}: {
  value: Badge[];
  onChange: (v: Badge[]) => void;
  kinds: readonly BadgeKind[];
  stats?: readonly (readonly [string, string])[];
  readOnly?: boolean;
  empty?: string;
  addLabel?: string;
  max?: number;
  only?: string[];
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  if (readOnly) return <BadgeStrip value={value} kinds={kinds} stats={stats} empty={empty} />;
  const menuKinds = only?.length ? kinds.filter((k) => only.includes(k.k)) : kinds;
  return (
    <div className={styles.badges}>
      {value.map((b, i) => {
        const K = kinds.find((x) => x.k === b.kind);
        return (
          <span key={i} className={`${styles.badge} ${styles[`c-${K?.color ?? "grey"}`]}`} title={K?.tip}>
            <span>{badgeLabel(b, kinds, stats)}</span>
            <button type="button" className={styles.badgeX} aria-label="Remove" title="Remove this bonus" onClick={() => onChange(value.filter((_, j) => j !== i))}>
              ×
            </button>
          </span>
        );
      })}
      {!value.length && empty ? <span className={styles.badgeEmpty}>{empty}</span> : null}
      {value.length < max ? (
        <button type="button" className={styles.badgeAdd} onClick={(e) => setAnchor(anchor ? null : e.currentTarget)}>
          {addLabel}
        </button>
      ) : null}
      {anchor ? (
        <BonusPopover
          anchor={anchor}
          kinds={menuKinds}
          stats={stats}
          onClose={() => setAnchor(null)}
          onAdd={(b) => { onChange([...value, b]); setAnchor(null); }}
        />
      ) : null}
    </div>
  );
}

function BonusPopover({
  anchor,
  kinds,
  stats,
  onAdd,
  onClose,
}: {
  anchor: HTMLElement;
  kinds: readonly BadgeKind[];
  stats: readonly (readonly [string, string])[];
  onAdd: (b: Badge) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const defTarget = (NK?: BadgeKind) =>
    NK?.target === "stat" ? (stats[0]?.[0] ?? "") : NK?.target === "choice" ? (pairs(NK.choices)[0]?.[0] ?? "") : "";
  const [kind, setKind] = useState(kinds[0]?.k ?? "");
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState(() => defTarget(kinds[0]));
  const [err, setErr] = useState("");
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: -9999, top: -9999 });
  const K = kinds.find((x) => x.k === kind);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = anchor.getBoundingClientRect();
    const w = el.offsetWidth, h = el.offsetHeight;
    let y = r.bottom + 6;
    if (y + h > window.innerHeight - 8) y = Math.max(8, r.top - h - 6);
    setPos({ left: Math.min(Math.max(8, r.left), window.innerWidth - w - 8), top: y });
  }, [anchor, kind]);

  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && !anchor.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", down, true);
    document.addEventListener("keydown", key, true);
    return () => { document.removeEventListener("mousedown", down, true); document.removeEventListener("keydown", key, true); };
  }, [anchor, onClose]);

  const pick = (k: string) => {
    setKind(k); setErr(""); setAmount("");
    setTarget(defTarget(kinds.find((x) => x.k === k)));
  };

  const submit = () => {
    if (!K) return;
    const b: Badge = { kind: K.k };
    if (K.amount) {
      const n = parseInt(amount, 10);
      if (!Number.isFinite(n) || n === 0) {
        if (!K.optAmount) { setErr("Enter an amount."); return; }
      } else b.amount = n;
    }
    if (K.target) {
      const t = target.trim();
      if (!t && !K.optTarget) { setErr("Fill it in first."); return; }
      if (t) b.target = t.slice(0, K.target === "text" ? 160 : 60);
    }
    onAdd(b);
  };

  const sugg = K?.target === "list"
    ? (K.list ?? []).filter((x) => !target || x.name.toLowerCase().includes(target.toLowerCase())).slice(0, 40)
    : [];

  return (
    <div
      ref={ref}
      className={styles.pop}
      style={{ left: pos.left, top: pos.top }}
      role="dialog"
      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
    >
      <div className={styles.kinds} style={kinds.length < 2 ? { display: "none" } : undefined}>
        {kinds.map((x) => (
          <button key={x.k} type="button" className={`${styles.kind} ${x.k === kind ? styles.on : ""}`} title={x.tip} onClick={() => pick(x.k)}>
            {x.label}
          </button>
        ))}
      </div>
      {K?.tip ? <div className={styles.tip}>{K.tip}</div> : null}
      <div className={styles.popRow}>
        {K?.amount ? (
          <input autoFocus type="number" step={1} className={styles.amt} placeholder={K.amountPh || "+N"} value={amount} onChange={(e) => setAmount(e.target.value)} />
        ) : null}
        {K?.target === "stat" ? (
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            {stats.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ) : K?.target === "choice" ? (
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            {pairs(K.choices).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ) : K?.target ? (
          <input
            autoFocus={!K.amount}
            type="text"
            autoComplete="off"
            maxLength={K.target === "text" ? 160 : 60}
            placeholder={K.targetPh || (K.target === "text" ? "Text" : "Search or type a name…")}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        ) : null}
      </div>
      {sugg.length ? (
        <div className={styles.sug}>
          {sugg.map((x) => (
            <button key={x.name} type="button" onMouseDown={(e) => { e.preventDefault(); setTarget(x.name); }}>
              <span>{x.name}</span>
              <small>{x.meta ?? ""}</small>
            </button>
          ))}
        </div>
      ) : null}
      <div className={styles.err}>{err}</div>
      <div className={styles.acts}>
        <button type="button" className={styles.popBtn} onClick={onClose}>Cancel</button>
        <button type="button" className={`${styles.popBtn} ${styles.go}`} onClick={submit}>Add</button>
      </div>
    </div>
  );
}
