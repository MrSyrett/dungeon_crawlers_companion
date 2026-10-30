"use client";
// ── Homebrew builder kit · ChipPicker ────────────────────────────────────────
// "Lists over text": a multi-pick of the system's own vocabulary (properties,
// languages, movement modes, spell lists…) shown as toggle chips.
//
//   <ChipPicker options={["Finesse", "Thrown"]} value={props} onChange={setProps} />
//   <ChipPicker options={LANGS} value={langs} onChange={setLangs} custom />
//        custom: adds a small "+ custom" input for open-ended lists; values not
//        in `options` (custom or legacy) still render as "on" chips so nothing
//        an old record carried is ever hidden or lost.
//
// Props: options (string[] or [value, label][]), value (string[]), onChange,
// custom (bool), customPh, single (radio behaviour: picking one clears others).
import { useState } from "react";
import styles from "./hb.module.css";

type Opt = string | [string, string];

export default function ChipPicker({
  options,
  value,
  onChange,
  custom = false,
  customPh = "Add custom…",
  single = false,
}: {
  options: readonly Opt[];
  value: string[];
  onChange: (v: string[]) => void;
  custom?: boolean;
  customPh?: string;
  single?: boolean;
}) {
  const [draft, setDraft] = useState("");
  const opts: [string, string][] = options.map((o) => (Array.isArray(o) ? o : [o, o]) as [string, string]);
  const known = new Set(opts.map(([v]) => v.toLowerCase()));
  const extras = value.filter((v) => !known.has(v.toLowerCase()));
  const has = (v: string) => value.some((x) => x.toLowerCase() === v.toLowerCase());
  const toggle = (v: string) => {
    if (has(v)) onChange(value.filter((x) => x.toLowerCase() !== v.toLowerCase()));
    else onChange(single ? [v] : [...value, v]);
  };
  const add = () => {
    const t = draft.trim();
    if (t && !has(t)) onChange(single ? [t] : [...value, t]);
    setDraft("");
  };
  return (
    <div className={styles.chips}>
      {opts.map(([v, l]) => (
        <button key={v} type="button" className={`${styles.chip} ${has(v) ? styles.on : ""}`} aria-pressed={has(v)} onClick={() => toggle(v)}>
          {l}
        </button>
      ))}
      {extras.map((v) => (
        <button key={`x-${v}`} type="button" className={`${styles.chip} ${styles.on}`} title="Remove" onClick={() => toggle(v)}>
          {v} ×
        </button>
      ))}
      {custom ? (
        <input
          className={styles.chip}
          style={{ cursor: "text", minWidth: 110 }}
          value={draft}
          placeholder={customPh}
          maxLength={60}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={add}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
          }}
        />
      ) : null}
    </div>
  );
}
