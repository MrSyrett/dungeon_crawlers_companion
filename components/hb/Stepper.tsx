"use client";
// ── Homebrew builder kit · Stepper (bounded number picker) ──────────────────
// A bounded whole-number control. When the rules give a sensible range (both
// `min` and `max` set and at most MAX_OPTIONS values), it's a dropdown of every
// legal value — creature size, dice count, damage bonus, stat mods… — so the
// user picks rather than types. With no reasonable range (open-ended or very
// wide, e.g. cost or HP), it's a plain number field, clamped to [min, max].
//
//   <Stepper value={ac} onChange={setAc} min={1} max={25} />            → dropdown 1…25
//   <Stepper value={mod} onChange={setMod} min={-4} max={4} signed />    → dropdown −4…+4 ("+2")
//   <Stepper value={hit} onChange={setHit} min={-5} max={20} signed nullable />
//        nullable: adds a "—" (none) option / allows an empty field.
//   <Stepper value={cost} onChange={setCost} min={0} max={99999} />      → number field
//
// Props: value, onChange(n|null), min, max, step (1), signed (show "+"),
// nullable, ariaLabel, width (min width of the control), title.
// Themed by --hb-accent (focus ring). The name stays "Stepper" so every builder
// that already uses it picks up the dropdown behaviour.
import styles from "./hb.module.css";

const MAX_OPTIONS = 61;

export default function Stepper({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  signed = false,
  nullable = false,
  ariaLabel,
  width,
  title,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  signed?: boolean;
  nullable?: boolean;
  ariaLabel?: string;
  width?: string;
  title?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const v = value == null ? null : clamp(value);
  const fmt = (n: number) => (signed && n > 0 ? `+${n}` : signed && n < 0 ? `−${Math.abs(n)}` : String(n));
  const bounded = Number.isFinite(min) && Number.isFinite(max) && step > 0 && (max - min) / step + 1 <= MAX_OPTIONS;

  if (bounded) {
    const opts: number[] = [];
    for (let n = min; n <= max; n += step) opts.push(n);
    if (v != null && !opts.includes(v)) { opts.push(v); opts.sort((a, b) => a - b); }
    return (
      <select
        className={styles.numSelect}
        style={width ? { minWidth: width } : undefined}
        aria-label={ariaLabel}
        title={title}
        value={v == null ? "" : String(v)}
        onChange={(e) => onChange(e.target.value === "" ? null : clamp(parseInt(e.target.value, 10)))}
      >
        {nullable || v == null ? <option value="">—</option> : null}
        {opts.map((n) => (
          <option key={n} value={String(n)}>{fmt(n)}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      className={styles.numField}
      style={width ? { width: `calc(${width} + 2em)` } : undefined}
      type="number"
      inputMode="numeric"
      aria-label={ariaLabel}
      title={title}
      min={Number.isFinite(min) ? min : undefined}
      max={Number.isFinite(max) ? max : undefined}
      step={step}
      value={v == null ? "" : String(v)}
      placeholder={nullable ? "—" : ""}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === "" || raw === "-") { onChange(nullable ? null : clamp(0)); return; }
        const n = parseInt(raw, 10);
        if (Number.isFinite(n)) onChange(clamp(n));
      }}
    />
  );
}
