"use client";
// ── Homebrew builder kit · Stepper ───────────────────────────────────────────
// A bounded whole-number input: [−] value [+]. Typing is allowed; the value is
// clamped to [min, max] on every change, so a builder never holds an
// out-of-rules number.
//
//   <Stepper value={ac} onChange={setAc} min={1} max={25} />
//   <Stepper value={mod} onChange={setMod} min={-4} max={4} signed />      → "+2"
//   <Stepper value={hit} onChange={setHit} min={-5} max={20} signed nullable />
//        nullable: value may be null, shown as "—"; × clears it; ± starts at 0.
//
// Props: value, onChange(n|null), min, max, step (1), signed (show "+"),
// nullable, ariaLabel, width (CSS width of the number box, default 3.2em),
// title. Themed by --hb-accent (focus ring).
import styles from "./hb.module.css";

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
  const show = v == null ? "" : signed && v >= 0 ? `+${v}` : String(v);
  const bump = (d: number) => onChange(clamp((v ?? (d > 0 ? Math.max(min, 0) - step : Math.min(max, 0) + step)) + d));
  return (
    <span className={styles.stepper} title={title}>
      <span
        role="button"
        tabIndex={-1}
        className={styles.stepBtn}
        aria-label={`Decrease ${ariaLabel ?? ""}`.trim()}
        aria-disabled={v != null && v <= min}
        onClick={() => bump(-step)}
      >
        −
      </span>
      <input
        className={styles.stepVal}
        style={width ? { width } : undefined}
        inputMode="numeric"
        aria-label={ariaLabel}
        value={show}
        placeholder={nullable ? "—" : ""}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9-]/g, "");
          if (raw === "" || raw === "-") {
            if (nullable) onChange(null);
            else if (raw === "") onChange(clamp(0));
            return;
          }
          const n = parseInt(raw, 10);
          if (Number.isFinite(n)) onChange(clamp(n));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") { e.preventDefault(); bump(step); }
          if (e.key === "ArrowDown") { e.preventDefault(); bump(-step); }
        }}
      />
      <span
        role="button"
        tabIndex={-1}
        className={styles.stepBtn}
        aria-label={`Increase ${ariaLabel ?? ""}`.trim()}
        aria-disabled={v != null && v >= max}
        onClick={() => bump(step)}
      >
        +
      </span>
      {nullable && v != null ? (
        <span role="button" tabIndex={-1} className={styles.stepClear} title="Clear" onClick={() => onChange(null)}>
          ×
        </span>
      ) : null}
    </span>
  );
}
