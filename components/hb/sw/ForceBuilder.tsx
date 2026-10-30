"use client";
// ── Star Wars homebrew Force power builder ────────────────────────────────────
// Storage = SwForcePower (lib/data/sw-types.ts), read by /sw/skills and the SW
// sheet's Force tab (public/tools-data/sw-homebrew.js → SW_FORCE), composed from
// `build` (components/hb/sw/rules.ts):
//   attribute  ← the Control / Sense / Alter key chips ("Control & Alter"); the
//                sheet makes one roll button per key
//   difficulty ← per key: Companion difficulty level (or "a Perception or
//                Control roll for the target"), "modified by proximity /
//                relationship", and a short note — "Control: Easy, modified by
//                proximity. Alter: Moderate." Prose difficulties from an old
//                record (or typed by hand) stay as text.
//   time       ← preset + "may be kept up" + note ("one round; may be kept up")
//   requires   ← picked from the book's powers (or custom homebrew names)
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import {
  SW_BOOK_OPTS, SW_DIFFICULTIES, SW_FORCE_KEYS, SW_FORCE_MODS, SW_TIMES, blankForceBuild, blankForceDiff, composeForceAttr, composeForceDiff, composeForceTime,
  forceBuildFrom, type SwForceBuild, type SwForceDiff, type SwForceKey,
} from "./rules";
import { Cell, PickList, Select, Toggle, fieldCls, smallBtn, useSwData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

export type ForceDraft = { b: SwForceBuild; requires: string[]; description: string; book: string };
export const blankForce = (): ForceDraft => ({ b: blankForceBuild(), requires: [], description: "", book: "companion" });
export const forceFromData = (d: Data): ForceDraft => ({
  b: forceBuildFrom(d), requires: Array.isArray(d.requires) ? (d.requires as unknown[]).map(String).filter(Boolean) : [],
  description: sv(d, "description"), book: ["core", "sourcebook", "companion"].includes(sv(d, "book")) ? sv(d, "book") : "companion",
});
export function forcePayload(name: string, f: ForceDraft): Data {
  return { name, attribute: composeForceAttr(f.b.keys), difficulty: composeForceDiff(f.b), time: composeForceTime(f.b), requires: f.requires, build: f.b, description: f.description, book: f.book };
}

const LEVELS: [string, string][] = [...SW_DIFFICULTIES.map(([n, r]) => [n, `${n} (${r})`] as [string, string]), ["opposed", "Target's Perception or Control roll"]];

function DiffRow({ k, d, multi, onChange }: { k: SwForceKey; d: SwForceDiff; multi: boolean; onChange: (d: SwForceDiff) => void }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      {multi ? <span className="w-[64px] text-[12px] font-bold text-[var(--hb-accent)]">{k}</span> : null}
      <Select value={d.level} options={LEVELS} ariaLabel={`${k} difficulty`} onChange={(v) => onChange({ ...d, level: v })} />
      <Select value={d.mods} options={SW_FORCE_MODS} ariaLabel={`${k} modifiers`} onChange={(v) => onChange({ ...d, mods: v })} />
      <input className={`${fieldCls} max-w-[260px]`} value={d.note} maxLength={300} placeholder="note (optional)" onChange={(e) => onChange({ ...d, note: e.target.value })} />
    </span>
  );
}

export default function ForceBuilder({ value: f, onChange }: { value: ForceDraft; onChange: (v: ForceDraft) => void }) {
  const data = useSwData();
  const b = f.b;
  const set = (p: Partial<SwForceBuild>) => onChange({ ...f, b: { ...b, ...p } });
  const setKeys = (v: string[]) => {
    const keys = SW_FORCE_KEYS.filter((k) => v.includes(k));
    if (!keys.length) return;
    const diff = { ...b.diff }; for (const k of keys) diff[k] = diff[k] ?? blankForceDiff();
    set({ keys, diff });
  };
  const keys = SW_FORCE_KEYS.filter((k) => b.keys.includes(k));
  const presetTime = (SW_TIMES as readonly string[]).includes(b.time);
  const powers = (data?.force ?? []).map((p) => p.name).sort();
  return (
    <>
      <Cell label="Force skills" className="sm:col-span-2" help="Every skill is rolled at once (−1D per skill beyond the first).">
        <ChipPicker options={[...SW_FORCE_KEYS]} value={b.keys} onChange={setKeys} />
      </Cell>
      <Cell label="Difficulty" className="sm:col-span-2" help={b.diffText ? "Written out (an old or prose difficulty). Switch to the pickers to build it per skill." : "Unmastered powers add +5 to every difficulty."}>
        {b.diffText ? (
          <span className="flex flex-col gap-2">
            <textarea className={`${fieldCls} min-h-[80px]`} value={b.diffText} maxLength={2000} onChange={(e) => set({ diffText: e.target.value })} />
            <button type="button" className={`${smallBtn} self-start`} onClick={() => set({ diffText: "" })}>Use pickers</button>
          </span>
        ) : (
          <span className="flex flex-col gap-2">
            {keys.map((k) => <DiffRow key={k} k={k} multi={keys.length > 1} d={b.diff[k] ?? blankForceDiff()} onChange={(d) => set({ diff: { ...b.diff, [k]: d } })} />)}
            <button type="button" className={`${smallBtn} self-start`} title="Write the difficulty out as prose" onClick={() => set({ diffText: composeForceDiff(b) })}>Write it out</button>
          </span>
        )}
      </Cell>
      <Cell label="Time to use" className="sm:col-span-2">
        <span className="flex flex-wrap items-center gap-2">
          <Select value={presetTime ? b.time : "__custom"} options={[...SW_TIMES, ["__custom", "Other…"]]} ariaLabel="time" onChange={(v) => set({ time: v === "__custom" ? (presetTime ? "" : b.time) || "until the power is dropped" : v })} />
          {!presetTime ? <input className={`${fieldCls} max-w-[260px]`} value={b.time} maxLength={80} onChange={(e) => set({ time: e.target.value })} /> : null}
          <Toggle checked={b.keptUp} onChange={(v) => set({ keptUp: v })} title="Kept-up powers stay active without a new roll each round">May be kept up</Toggle>
          <input className={`${fieldCls} max-w-[260px]`} value={b.timeNote} maxLength={120} placeholder="note (requires touching the target…)" onChange={(e) => set({ timeNote: e.target.value })} />
        </span>
      </Cell>
      <Cell label="Required powers" className="sm:col-span-2" help="Powers the character must know first.">
        <PickList value={f.requires} options={powers} placeholder="+ Required power…" onChange={(v) => onChange({ ...f, requires: v })} />
      </Cell>
      <Cell label="Book"><Select value={f.book} options={SW_BOOK_OPTS} ariaLabel="book" onChange={(v) => onChange({ ...f, book: v })} /></Cell>
      <Cell label="Effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[100px]`} value={f.description} maxLength={3000} onChange={(e) => onChange({ ...f, description: e.target.value })} />
      </Cell>
    </>
  );
}

export function ForcePreview({ name, f }: { name: string; f: ForceDraft }) {
  const b = f.b;
  return (
    <Preview title={name || "Unnamed power"} subtitle={composeForceAttr(b.keys)}>
      <div className="flex flex-col gap-1">
        <div><b>Difficulty</b> {composeForceDiff(b) || "—"}</div>
        {composeForceTime(b) ? <div><b>Time</b> {composeForceTime(b)}</div> : null}
        {f.requires.length ? <div><b>Requires</b> {f.requires.join(", ")}</div> : null}
        {b.keys.length > 1 ? <div className="text-[11px] text-[var(--muted)]">Rolled together: −{b.keys.length - 1}D to each for multiple skill use.</div> : null}
        {f.description ? <p className="mt-1 text-[12px] text-[var(--muted)]">{f.description}</p> : null}
      </div>
    </Preview>
  );
}
