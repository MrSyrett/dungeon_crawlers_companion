"use client";
// ── Homebrew builder kit · DiceInput ─────────────────────────────────────────
// Count + die + flat modifier, all chosen (never typed as "2d6+1" text).
//
//   <DiceInput value={dmg} onChange={setDmg} />                    → [2] d[6] + [1]
//   <DiceInput value={dur} onChange={setDur} flat mod={false} />   die list gains "—"
//        (d = 0 → n is a plain number, e.g. "5" rounds vs "1d8" days)
//
// Props: value: Dice ({n,d,m} — see ./dice.ts), onChange, dice (die sizes,
// default STANDARD_DICE = d4…d20), minCount (0 → "no dice", the mod becomes a
// flat value), maxCount (20), mod (show the +M stepper, default true),
// modMin/modMax (−20…+20), flat (offer the "—" die), ariaLabel, diePrefix ("d";
// Dragonbane passes "D" for its book style "2D6").
// A die size not in `dice` (e.g. an old "1d3") is kept and shown, never lost.
// Format/parse with formatDice / parseDice from ./dice.
import Stepper from "./Stepper";
import styles from "./hb.module.css";
import { STANDARD_DICE, type Dice } from "./dice";

export default function DiceInput({
  value,
  onChange,
  dice = STANDARD_DICE,
  minCount = 0,
  maxCount = 20,
  mod = true,
  modMin = -20,
  modMax = 20,
  flat = false,
  ariaLabel = "dice",
  diePrefix = "d",
}: {
  value: Dice;
  onChange: (v: Dice) => void;
  dice?: number[];
  minCount?: number;
  maxCount?: number;
  mod?: boolean;
  modMin?: number;
  modMax?: number;
  flat?: boolean;
  ariaLabel?: string;
  diePrefix?: string;
}) {
  const sizes = dice.includes(value.d) || (flat && value.d === 0) ? dice : [...dice, value.d].sort((a, b) => a - b);
  return (
    <span className={styles.dice}>
      <Stepper
        value={value.n}
        min={minCount}
        max={maxCount}
        ariaLabel={`${ariaLabel} count`}
        width="2.2em"
        onChange={(n) => onChange({ ...value, n: n ?? minCount })}
      />
      <select
        className={styles.diceSel}
        aria-label={`${ariaLabel} die`}
        value={value.d}
        onChange={(e) => onChange({ ...value, d: parseInt(e.target.value, 10) || 0 })}
      >
        {flat ? <option value={0}>—</option> : null}
        {sizes.map((d) => (
          <option key={d} value={d}>{diePrefix}{d}</option>
        ))}
      </select>
      {mod ? (
        <>
          <span className={styles.diceSep}>+</span>
          <Stepper
            value={value.m}
            min={modMin}
            max={modMax}
            signed
            width="2.4em"
            ariaLabel={`${ariaLabel} modifier`}
            onChange={(m) => onChange({ ...value, m: m ?? 0 })}
          />
        </>
      ) : null}
    </span>
  );
}
