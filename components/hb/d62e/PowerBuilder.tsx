"use client";
// ── D6 System 2e homebrew power builder (magic spells, psionics, superpowers) ─
// Storage = D62ePower (lib/data/d62e-types.ts), read by /d62e/traits (Options),
// the sheet's power picker (d62e-homebrew.js → D62E_HB_POWERS; Roll uses
// `skill`) and the creation wizard's Superpowers step (parses `cost`). Composed
// from `build` (rules.ts composePower):
//   magic: skill "Spell School: …", difficulty (5 Very Easy … 40 Mythical), and
//     options "Casting Time: …", "Power: N", "Resist: Yes (Complete
//     Nullification, Willpower)" / "No", "Duration: …", "Range: …", "Target: …"
//   psionic: skill "Kinesis + Reform" (from the three psionic skills),
//     difficulty "15" or "5 (+5 per use in the last 24 hours)"
//   superpower: cost "3 per rank" / "4" = base + enhancements (paid at each
//     rank); option lines "Enhancement: Extended Range (+1 per rank)" and
//     "Limitation: Burnout (−1)"; built-in limitations also go to the new
//     `limitations` [{name, value}], which the wizard subtracts (min 1).
// Unstructured option lines stay as extra lines after the composed ones.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  D62E_DIFFICULTIES, D62E_ENHANCEMENTS, D62E_GENRE_OPTS, D62E_POWER_LEVELS, D62E_PSI_SKILLS, MAGIC_CAST_TIMES, MAGIC_DURATIONS, MAGIC_RANGES, MAGIC_RESIST_KINDS, MAGIC_TARGETS,
  blankPowerBuild, composePower, composePowerDiff, limitValuesFrom, powerBuildFrom, powerCostAt, powerLimitCut, powerUnitCost,
  type D62ePowerBuild, type D62ePsiSkill,
} from "./rules";
import { AsWritten, Cell, LineRows, RowCtl, Select, Toggle, fieldCls, miniLbl, selCls, skillNames, useD62eData, type D62eData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const KINDS: [string, string][] = [["magic", "Magic"], ["psionic", "Psionic"], ["superpower", "Superpower"]];
const DEFAULT_GENRE: Record<string, string> = { magic: "fantasy", psionic: "scifi", superpower: "superhero" };
const SCHOOLS = ["Spell School: Change (Alteration)", "Spell School: Creation (Conjuration)", "Spell School: Knowledge (Divination)", "Spell School: Movement (Apportation)"];
const diffLabel = (n: number | null) => (n == null ? "" : D62E_DIFFICULTIES.find(([v]) => v === n)?.[1] ?? "");

export type PowerDraft = { kind: string; genre: string; b: D62ePowerBuild; description: string };
export const blankPower = (): PowerDraft => ({ kind: "magic", genre: "fantasy", b: blankPowerBuild(), description: "" });
export function powerFromData(d: Data): PowerDraft {
  const kind = KINDS.some(([k]) => k === sv(d, "kind")) ? sv(d, "kind") : "magic";
  return { kind, genre: ["core", "fantasy", "scifi", "superhero"].includes(sv(d, "genre")) ? sv(d, "genre") : DEFAULT_GENRE[kind], b: powerBuildFrom(d), description: sv(d, "description") };
}
export function powerPayload(name: string, p: PowerDraft): Data {
  return { name, kind: p.kind, genre: p.genre, description: p.description, ...composePower(p.kind, p.b), build: p.b };
}

function DifficultyInput({ b, set, note }: { b: D62ePowerBuild; set: (p: Partial<D62ePowerBuild>) => void; note?: boolean }) {
  if (b.diffText) return <AsWritten wide value={b.diffText} max={300} onChange={(t) => set({ diffText: t })} onPickers={() => set({ diffText: "", diff: 10 })} />;
  return (
    <span className="flex flex-wrap items-center gap-2">
      <Select value={b.diff == null ? "" : String(b.diff)} options={[["", "—"], ...D62E_DIFFICULTIES.map(([n, l]) => [String(n), `${n} · ${l}`] as [string, string])]} ariaLabel="difficulty" onChange={(v) => set({ diff: v === "" ? null : parseInt(v, 10) })} />
      {note && b.diff != null ? <input className={`${fieldCls} max-w-[320px]`} value={b.diffNote} maxLength={200} placeholder="modifier (+5 per use in the last 24 hours)" onChange={(e) => set({ diffNote: e.target.value })} /> : null}
    </span>
  );
}

function Opt({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return (
    <Cell label={label} className="sm:col-span-2">
      <ChipPicker single custom customPh="as written…" options={[...options]} value={value ? [value] : []} onChange={(v) => onChange(v[0] ?? "")} />
    </Cell>
  );
}

function MagicFields({ b, set, data }: { b: D62ePowerBuild; set: (p: Partial<D62ePowerBuild>) => void; data: D62eData | null }) {
  const skills = skillNames(data);
  return (
    <>
      <Cell label="Spell school" help="The Magic skill rolled to cast.">
        <Select value={b.school} options={[["", "—"], ...SCHOOLS.map((x) => [x, x] as [string, string])]} ariaLabel="spell school" onChange={(v) => set({ school: v })} />
      </Cell>
      <Cell label="Difficulty"><DifficultyInput b={b} set={set} /></Cell>
      {b.magicOpts ? (
        <>
          <Opt label="Casting time" value={b.cast} options={MAGIC_CAST_TIMES} onChange={(v) => set({ cast: v })} />
          <Cell label="Power" help="Magic points spent to cast it (Magic Points Casting module).">
            <Stepper value={b.power} min={0} max={30} width="2.4em" ariaLabel="power" onChange={(n) => set({ power: n ?? 0 })} />
          </Cell>
          <Cell label="Resist" help="Whether the target may roll to resist, and with what.">
            <span className="flex flex-wrap items-center gap-2">
              <Toggle checked={b.resist} onChange={(v) => set({ resist: v, resistKind: b.resistKind || MAGIC_RESIST_KINDS[0] })}>Can be resisted</Toggle>
              {b.resist ? (
                <>
                  <Select value={b.resistKind} options={MAGIC_RESIST_KINDS} ariaLabel="resist kind" onChange={(v) => set({ resistKind: v })} />
                  <Select value={b.resistSkill} options={[["", "—"], ...(skills.length ? skills : ["Willpower", "Acrobatics"]).map((x) => [x, x] as [string, string])]} ariaLabel="resist skill" onChange={(v) => set({ resistSkill: v })} />
                </>
              ) : null}
            </span>
          </Cell>
          <Opt label="Duration" value={b.duration} options={MAGIC_DURATIONS} onChange={(v) => set({ duration: v })} />
          <Opt label="Range" value={b.range} options={MAGIC_RANGES} onChange={(v) => set({ range: v })} />
          <Opt label="Target" value={b.target} options={MAGIC_TARGETS} onChange={(v) => set({ target: v })} />
        </>
      ) : (
        <Cell label="Spell options" className="sm:col-span-2" help="These lines were kept as written.">
          <button type="button" className={`${selCls} text-[12px]`} onClick={() => set({ ...blankPowerBuild(), school: b.school, diff: b.diff, diffText: b.diffText, extra: [] })}>Use pickers (replaces these lines)</button>
        </Cell>
      )}
    </>
  );
}

function PsiFields({ b, set }: { b: D62ePowerBuild; set: (p: Partial<D62ePowerBuild>) => void }) {
  return (
    <>
      <Cell label="Psionic skills" className="sm:col-span-2" help="Roll the combined die code of every skill picked (Psionics module).">
        {b.school ? (
          <AsWritten value={b.school} onChange={(t) => set({ school: t })} onPickers={() => set({ school: "", psi: ["Kinesis"] })} />
        ) : (
          <ChipPicker options={[...D62E_PSI_SKILLS]} value={b.psi} onChange={(v) => set({ psi: D62E_PSI_SKILLS.filter((k) => v.includes(k)) as D62ePsiSkill[] })} />
        )}
      </Cell>
      <Cell label="Difficulty" className="sm:col-span-2"><DifficultyInput b={b} set={set} note /></Cell>
    </>
  );
}

function SuperFields({ b, set, data }: { b: D62ePowerBuild; set: (p: Partial<D62ePowerBuild>) => void; data: D62eData | null }) {
  const lims = data?.limitations ?? [];
  const limRanks = (name: string) => { const l = lims.find((x) => x.name === name); return l ? limitValuesFrom(l.value, l.description ?? "").values : [1]; };
  const addLimit = (name: string) => { if (!name) return; const v = limRanks(name); set({ limits: [...b.limits, { name, rank: 1, value: v[0] ?? 1 }] }); };
  const skills = skillNames(data);
  return (
    <>
      <Cell label="Cost" className="sm:col-span-2" help="Superpower Dice from the Power Level pool. Ranks multiply a per-rank cost.">
        {b.costText ? (
          <AsWritten value={b.costText} max={60} onChange={(t) => set({ costText: t })} onPickers={() => set({ costText: "", base: 3, perRank: true })} />
        ) : (
          <span className="flex flex-wrap items-end gap-4">
            <label className={miniLbl}>Base<Stepper value={b.base} min={0} max={30} width="2.2em" ariaLabel="base cost" onChange={(n) => set({ base: n ?? 0 })} /></label>
            <Toggle checked={b.perRank} onChange={(v) => set({ perRank: v })}>per rank</Toggle>
          </span>
        )}
      </Cell>
      <Cell label="Enhancements" className="sm:col-span-2" help="Each enhancement's cost is paid at each rank.">
        <div className="flex flex-col gap-2">
          {b.enh.map((e, i) => (
            <span key={i} className="flex flex-wrap items-center gap-2">
              <input className={`${fieldCls} max-w-[260px]`} list="d62e-hb-enh" value={e.name} maxLength={60} onChange={(x) => set({ enh: b.enh.map((y, j) => (j === i ? { ...y, name: x.target.value } : y)) })} />
              <span className="text-[12px] text-[var(--muted)]">+</span>
              <Stepper value={e.cost} min={0} max={10} width="2em" ariaLabel="enhancement cost" onChange={(n) => set({ enh: b.enh.map((y, j) => (j === i ? { ...y, cost: n ?? 0 } : y)) })} />
              <span className="text-[12px] text-[var(--muted)]">{b.perRank ? "per rank" : ""}</span>
              <RowCtl rows={b.enh} i={i} onChange={(enh) => set({ enh })} />
            </span>
          ))}
          <datalist id="d62e-hb-enh">{D62E_ENHANCEMENTS.map(([n]) => <option key={n} value={n} />)}</datalist>
          <select className={`${selCls} self-start`} value="" aria-label="Add an enhancement" onChange={(e) => { const x = D62E_ENHANCEMENTS.find(([n]) => n === e.target.value); if (x) set({ enh: [...b.enh, { name: x[0], cost: x[1] }] }); else if (e.target.value === "*") set({ enh: [...b.enh, { name: "", cost: 1 }] }); }}>
            <option value="">+ Enhancement…</option>
            {D62E_ENHANCEMENTS.map(([n, c]) => <option key={n} value={n}>{n} (+{c})</option>)}
            <option value="*">Custom…</option>
          </select>
        </div>
      </Cell>
      <Cell label="Built-in limitations" className="sm:col-span-2" help="Each lowers the power's total cost (never below 1). The creation wizard subtracts these automatically.">
        <div className="flex flex-col gap-2">
          {b.limits.map((l, i) => {
            const ranks = limRanks(l.name);
            return (
              <span key={i} className="flex flex-wrap items-center gap-2">
                <span className="min-w-[120px] text-[13px] font-semibold text-[var(--text)]">{l.name}</span>
                {ranks.length > 1 ? (
                  <Select value={String(l.rank)} options={ranks.map((v, j) => [String(j + 1), `R${j + 1} (−${v})`] as [string, string])} ariaLabel="limitation rank" onChange={(v) => { const r = parseInt(v, 10) || 1; set({ limits: b.limits.map((y, j) => (j === i ? { ...y, rank: r, value: ranks[r - 1] ?? y.value } : y)) }); }} />
                ) : null}
                <span className="text-[12px] text-[var(--muted)]">−</span>
                <Stepper value={l.value} min={0} max={9} width="2em" ariaLabel="limitation cut" onChange={(n) => set({ limits: b.limits.map((y, j) => (j === i ? { ...y, value: n ?? 0 } : y)) })} />
                <RowCtl rows={b.limits} i={i} onChange={(limits) => set({ limits })} />
              </span>
            );
          })}
          <select className={`${selCls} self-start`} value="" aria-label="Add a limitation" onChange={(e) => addLimit(e.target.value)}>
            <option value="">+ Limitation…</option>
            {lims.filter((l) => !b.limits.some((x) => x.name === l.name)).map((l) => <option key={l.name} value={l.name}>{l.name} (−{l.value})</option>)}
          </select>
        </div>
      </Cell>
      <Cell label="Rolled with" help="Optional — a skill the power is rolled with (the sheet's Roll button uses it).">
        <Select value={b.school} options={[["", "—"], ...skills.map((x) => [x, x] as [string, string])]} ariaLabel="skill" onChange={(v) => set({ school: v })} />
      </Cell>
      <Cell label="Difficulty"><DifficultyInput b={b} set={set} /></Cell>
    </>
  );
}

export default function PowerBuilder({ value: p, onChange }: { value: PowerDraft; onChange: (v: PowerDraft) => void }) {
  const data = useD62eData();
  const b = p.b;
  const set = (x: Partial<D62ePowerBuild>) => onChange({ ...p, b: { ...b, ...x } });
  const setKind = (k: string) => {
    const nb: D62ePowerBuild = { ...b };
    if (k === "magic" && !SCHOOLS.includes(b.school)) nb.school = b.school && p.kind === "magic" ? b.school : SCHOOLS[0];
    if (k !== "magic" && SCHOOLS.includes(b.school)) nb.school = "";
    if (k === "psionic" && !b.psi.length) nb.psi = ["Kinesis"];
    if (k === "superpower" && p.kind !== "superpower") { nb.diff = null; nb.diffText = ""; }
    onChange({ ...p, kind: k, genre: p.genre === DEFAULT_GENRE[p.kind] ? DEFAULT_GENRE[k] : p.genre, b: nb });
  };
  return (
    <>
      <Cell label="Kind" className="sm:col-span-2">
        <ChipPicker single options={KINDS} value={[p.kind]} onChange={(v) => v[0] && setKind(v[0])} />
      </Cell>
      <Cell label="Genre"><Select value={p.genre} options={D62E_GENRE_OPTS} ariaLabel="genre" onChange={(v) => onChange({ ...p, genre: v })} /></Cell>
      <span className="hidden sm:block" />
      {p.kind === "magic" ? <MagicFields b={b} set={set} data={data} /> : p.kind === "psionic" ? <PsiFields b={b} set={set} /> : <SuperFields b={b} set={set} data={data} />}
      <Cell label="Other option lines" className="sm:col-span-2" help="Anything else the power lists (“Range: sight or voice”, a choice of variants…).">
        <LineRows rows={b.extra} max={120} addLabel="+ Option line" placeholder="Range: sight or voice" onChange={(extra) => set({ extra })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[90px]`} value={p.description} maxLength={3000} onChange={(e) => onChange({ ...p, description: e.target.value })} />
      </Cell>
    </>
  );
}

export function PowerPreview({ name, p }: { name: string; p: PowerDraft }) {
  const b = p.b, c = composePower(p.kind, b);
  const ranks = p.kind === "superpower" && !b.costText ? (b.perRank ? [1, 2, 3, 4, 5] : [1]) : [];
  const cut = powerLimitCut(b);
  return (
    <Preview title={name || "Unnamed power"} subtitle={[KINDS.find(([k]) => k === p.kind)?.[1], D62E_GENRE_OPTS.find(([v]) => v === p.genre)?.[1]].filter(Boolean).join(" · ")}>
      <div className="flex flex-col gap-1 text-[12px]">
        {c.skill ? <div><b>Skill</b> {c.skill}</div> : null}
        {c.difficulty ? <div><b>Difficulty</b> {composePowerDiff(b)}{diffLabel(b.diff) && !b.diffText ? <span className="text-[var(--muted)]"> ({diffLabel(b.diff)})</span> : null}</div> : null}
        {c.cost ? <div><b>Cost</b> <span className="font-mono">{c.cost}</span></div> : null}
        {ranks.length ? (
          <table className="my-1 text-[12px]"><tbody>
            {ranks.map((r) => (
              <tr key={r}><td className="pr-3 font-semibold">{b.perRank ? `Rank ${r}` : "Total"}</td>
                <td className="font-mono">{powerCostAt(b, r)}D</td>
                <td className="pl-2 text-[var(--muted)]">{cut ? `${b.perRank ? powerUnitCost(b) * r : powerUnitCost(b)} − ${cut}` : ""}</td></tr>
            ))}
          </tbody></table>
        ) : null}
        {ranks.length ? <p className="text-[11px] text-[var(--muted)]">Pools: {D62E_POWER_LEVELS.map(([l, n]) => `${l} ${n}D`).join(" · ")}</p> : null}
        {c.options.length ? <ul className="mt-1 list-disc pl-4 text-[var(--muted)]">{c.options.map((o, i) => <li key={i}>{o}</li>)}</ul> : null}
        {p.description ? <p className="mt-1 text-[var(--muted)]">{p.description}</p> : null}
      </div>
    </Preview>
  );
}
