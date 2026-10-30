"use client";
// ── ICRPG homebrew SPELL builder ─────────────────────────────────────────────
// Storage = the book IcrpgSpell shape {name, school, desc, target?, effort?}
// read by /icrpg/spells and the ICRPG sheet (Spells tab + Action tab cast), plus:
//   stat         INT / WIS / CHA — the casting roll (the sheet reads it)
//   effortCount  how many EFFORT dice (4 → "4D12"; the sheet rolls that many)
//   noRoll       "No ATTEMPT needed" · hard: cast with a HARD roll
//   build        { who, range } — `target` is composed from them ("One target,
//                NEAR range"); a legacy target that isn't builder-shaped stays text.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { CAST_STATS, EFFORTS, SPELL_RANGES, SPELL_SCHOOLS, SPELL_TARGETS, composeSpellTarget, effortOfCode, parseSpellTarget } from "./rules";
import { Cell, Select, Toggle, fieldCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
export type SpellDraft = {
  school: string; stat: string; who: string; range: string; targetText: string;
  effort: number; effortText: string; count: number; noRoll: boolean; hard: boolean; desc: string;
};
const effortOpts: [string, string][] = [["0", "No EFFORT roll"], ...EFFORTS.map((e) => [String(e.die), `d${e.die} ${e.label}`] as [string, string])];

export const blankSpell = (): SpellDraft => ({ school: "Arcane", stat: "INT", who: "One target", range: "NEAR", targetText: "", effort: 10, effortText: "", count: 1, noRoll: false, hard: false, desc: "" });
export function spellFromData(d: Data): SpellDraft {
  const target = String(d.target ?? "");
  const p = parseSpellTarget(target);
  const st = String(d.stat ?? "").toUpperCase();
  const school = String(d.school ?? "") || "Arcane";
  return {
    school, stat: (CAST_STATS as readonly string[]).includes(st) ? st : /holy/i.test(school) ? "WIS" : "INT",
    who: p?.who ?? "", range: p?.range ?? "", targetText: p ? "" : target,
    // A legacy written-out effort ("Magic EFFORT (d10)") → its die; one with no die stays as text.
    effort: effortOfCode(d.effort)?.die ?? effortOfCode((String(d.effort ?? "").match(/\bd(4|6|8|10|12)\b/i) || [])[0])?.die ?? 0,
    effortText: effortOfCode((String(d.effort ?? "").match(/\bd(4|6|8|10|12)\b/i) || [])[0]) ? "" : String(d.effort ?? "").replace(/^d(4|6|8|10|12)$/i, ""),
    count: Math.max(1, parseInt(String(d.effortCount ?? 1), 10) || 1),
    noRoll: !!d.noRoll, hard: !!d.hard, desc: String(d.desc ?? ""),
  };
}
const targetOf = (s: SpellDraft) => s.targetText.trim() || composeSpellTarget(s.who, s.range);
export const spellPayload = (name: string, s: SpellDraft): Data => ({
  name, school: s.school, stat: s.stat, target: targetOf(s), build: { who: s.who, range: s.range, text: s.targetText.trim() },
  effort: s.effort ? `d${s.effort}` : s.effortText.trim(), effortCount: s.effort && s.count > 1 ? s.count : undefined,
  noRoll: s.noRoll || undefined, hard: s.hard || undefined, desc: s.desc,
});

export default function SpellBuilder({ value: s, onChange }: { value: SpellDraft; onChange: (v: SpellDraft) => void }) {
  const set = (p: Partial<SpellDraft>) => onChange({ ...s, ...p });
  return (
    <>
      <Cell label="School" className="sm:col-span-2">
        <ChipPicker single custom customPh="Other school…" options={SPELL_SCHOOLS} value={[s.school]} onChange={(v) => v[0] && set({ school: v[0], ...(/holy/i.test(v[0]) ? { stat: "WIS" } : {}) })} />
      </Cell>
      <Cell label="Cast with" help="The ATTEMPT: d20 + this STAT vs the TARGET.">
        <span className="flex flex-wrap items-center gap-3">
          <Select value={s.stat} options={CAST_STATS} ariaLabel="cast stat" onChange={(v) => set({ stat: v })} />
          <Toggle checked={s.hard} onChange={(v) => set({ hard: v, ...(v ? { noRoll: false } : {}) })}>HARD roll</Toggle>
          <Toggle checked={s.noRoll} onChange={(v) => set({ noRoll: v, ...(v ? { hard: false } : {}) })}>No ATTEMPT needed</Toggle>
        </span>
      </Cell>
      <Cell label="EFFORT" help="What a successful cast rolls (Magic & Energy d10 for harm; a natural 20 adds ULTIMATE).">
        <span className="flex flex-wrap items-center gap-2">
          {s.effort ? <Stepper value={s.count} min={1} max={10} width="2em" ariaLabel="effort dice" onChange={(v) => set({ count: v ?? 1 })} /> : null}
          <Select value={String(s.effort)} options={effortOpts} ariaLabel="effort" onChange={(v) => set({ effort: parseInt(v, 10) || 0, effortText: "" })} />
          {!s.effort && s.effortText ? <span className="text-[12px] text-[var(--muted)]">as written: “{s.effortText}”</span> : null}
        </span>
      </Cell>
      <Cell label="Target" className="sm:col-span-2">
        {s.targetText ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[280px]`} value={s.targetText} maxLength={60} onChange={(e) => set({ targetText: e.target.value })} />
            <button type="button" className={smallBtn} onClick={() => set({ targetText: "" })}>Use pickers</button>
          </span>
        ) : (
          <span className="flex flex-wrap items-center gap-2">
            <Select value={s.who} options={[["", "—"], ...SPELL_TARGETS.map((x) => [x, x] as [string, string])]} ariaLabel="who" onChange={(v) => set({ who: v })} />
            <Select value={s.range} options={[["", "any range"], ...SPELL_RANGES.map((x) => [x, x] as [string, string])]} ariaLabel="range" onChange={(v) => set({ range: v })} />
            <button type="button" className={smallBtn} title="Write it out instead (“Touched ally”)" onClick={() => set({ targetText: composeSpellTarget(s.who, s.range) || "Touched ally" })}>Text</button>
          </span>
        )}
      </Cell>
      <Cell label="Description" className="sm:col-span-2" help="Durations, saves and riders in the book's words (“for 1D4 ROUNDS”, “DEX halves”).">
        <textarea className={`${fieldCls} min-h-[90px]`} value={s.desc} maxLength={3000} placeholder="What the spell does…" onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function SpellPreview({ name, s }: { name: string; s: SpellDraft }) {
  const e = effortOfCode(`d${s.effort}`);
  return (
    <Preview title={name || "Unnamed spell"} subtitle={`${s.school} · ${s.stat} spell`}>
      <p className="font-mono text-[13px]">
        {s.noRoll ? "No ATTEMPT needed" : `${s.hard ? "HARD " : ""}d20 + ${s.stat} vs TARGET`}
        {e ? ` → ${s.count > 1 ? s.count : ""}D${e.die} ${e.label.toUpperCase()}` : ""}
      </p>
      {targetOf(s) ? <p className="text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]">{targetOf(s)}</p> : null}
      {s.desc ? <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed">{s.desc}</p> : null}
    </Preview>
  );
}
