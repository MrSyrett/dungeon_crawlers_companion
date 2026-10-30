"use client";
// ── D6 System 2e homebrew perk / flaw / talent / asset / trouble + limitation ─
// Storage = the book shapes in lib/data/d62e-types.ts (D62ePerk, D62eLimitation)
// read by /d62e/traits, the sheet's trait / limitation pickers (d62e-homebrew.js
// → D62E_HB_TRAITS / D62E_HB_LIMITS) and the creation wizard
// (d62e-sheet-builder.js parses `cost` for the rank stepper and skill-dice math).
//   trait.cost composed from `build` (rules.ts composeTraitCost) in the book's
//     own wording, so the wizard's parser reads it: perks "-1D to -3D (R1-R3)",
//     flaws "+2D (R2)", open-ended "-1D per rank (R1 or more)", talents "2" /
//     "3 per rank", assets "+3D or +1 Hero Point", troubles "+1 Hero Point".
//   limitation.value = rank 1's cut; `rankValues` (new) holds every rank, and
//     the description gains the book's lead-in ("Cost 3 for one rank, 4 for two.").
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  ASSET_COST, D62E_GENRE_OPTS, TROUBLE_COST, blankTraitBuild, composeLimitDesc, composeTraitCost, limitBuildFrom, traitBuildFrom, traitDiceAt, traitRanks,
  type D62eLimitBuild, type D62eTraitBuild,
} from "./rules";
import { AsWritten, Cell, Select, Toggle, fieldCls, hint, miniLbl } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const genreOf = (d: Data, dflt = "core") => (["core", "fantasy", "scifi", "superhero"].includes(sv(d, "genre")) ? sv(d, "genre") : dflt);
const KINDS: [string, string][] = [["perk", "Perk"], ["flaw", "Flaw"], ["talent", "Talent"], ["asset", "Asset"], ["trouble", "Trouble"]];
const KIND_HELP: Record<string, string> = {
  perk: "Perks cost 1 skill die per rank at creation (pg 102).",
  flaw: "Flaws give 1 skill die back per rank at creation.",
  talent: "Talents cost a fixed number of skill dice, or a number per rank.",
  asset: "Assets are invoked twice per session for +3D or a Hero Point (no creation cost).",
  trouble: "Troubles can be triggered for a Hero Point while the GM springs a complication (no creation cost).",
};
const dice = (n: number) => (n ? `${n > 0 ? "+" : "−"}${Math.abs(n)}D skill dice` : "no skill dice");

// ═══ TRAITS ══════════════════════════════════════════════════════════════════
export type TraitDraft = { kind: string; genre: string; b: D62eTraitBuild; description: string };
export const blankTrait = (): TraitDraft => ({ kind: "perk", genre: "core", b: blankTraitBuild(), description: "" });
export const traitFromData = (d: Data): TraitDraft => ({ kind: KINDS.some(([k]) => k === sv(d, "kind")) ? sv(d, "kind") : "perk", genre: genreOf(d), b: traitBuildFrom(d), description: sv(d, "description") });
export function traitPayload(name: string, t: TraitDraft): Data {
  const cost = composeTraitCost(t.kind, t.b);
  return { name, kind: t.kind, genre: t.genre, description: t.description, ...(cost ? { cost } : {}), build: t.b };
}

function RankMath({ kind, b }: { kind: string; b: D62eTraitBuild }) {
  const [lo, hi] = traitRanks(kind, b);
  if (kind === "asset" || kind === "trouble" || b.text) return null;
  const ranks = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  return (
    <table className="mt-1 text-[12px]"><tbody>
      {ranks.map((r) => (
        <tr key={r}><td className="pr-3 font-semibold">{kind === "talent" ? (b.perRank ? `×${r}` : "Cost") : `R${r}`}{kind !== "talent" && b.open && r === hi ? "+" : ""}</td><td className="text-[var(--muted)]">{dice(traitDiceAt(kind, b, r))}</td></tr>
      ))}
    </tbody></table>
  );
}

export function TraitBuilder({ value: t, onChange }: { value: TraitDraft; onChange: (v: TraitDraft) => void }) {
  const b = t.b;
  const set = (p: Partial<TraitDraft>) => onChange({ ...t, ...p });
  const setB = (p: Partial<D62eTraitBuild>) => onChange({ ...t, b: { ...b, ...p } });
  const setKind = (k: string) => set({ kind: k, b: { ...b, text: "", n: k === "talent" && !b.n ? 2 : b.n } });
  return (
    <>
      <Cell label="Kind" className="sm:col-span-2" help={KIND_HELP[t.kind]}>
        <ChipPicker single options={KINDS} value={[t.kind]} onChange={(v) => v[0] && setKind(v[0])} />
      </Cell>
      <Cell label="Genre"><Select value={t.genre} options={D62E_GENRE_OPTS} ariaLabel="genre" onChange={(v) => set({ genre: v })} /></Cell>
      <Cell label="Cost" className="sm:col-span-2" help={b.text ? "Kept as written — the creation wizard reads rank ranges like (R1-R3) and talent costs like “3 per rank”." : undefined}>
        {b.text ? (
          <AsWritten value={b.text} max={60} onChange={(x) => setB({ text: x })} onPickers={() => setB({ ...blankTraitBuild(), text: "" })} />
        ) : t.kind === "perk" || t.kind === "flaw" ? (
          <span className="flex flex-wrap items-end gap-4">
            <label className={miniLbl}>{b.open ? "From rank" : "Lowest rank"}
              <Stepper value={b.rmin} min={1} max={10} width="2.2em" ariaLabel="lowest rank" onChange={(n) => setB({ rmin: n ?? 1, rmax: Math.max(b.rmax, n ?? 1) })} />
            </label>
            {!b.open ? (
              <label className={miniLbl}>Highest rank
                <Stepper value={b.rmax} min={b.rmin} max={10} width="2.2em" ariaLabel="highest rank" onChange={(n) => setB({ rmax: n ?? b.rmin })} />
              </label>
            ) : null}
            <Toggle checked={b.open} onChange={(v) => setB({ open: v })}>Open-ended (1D per rank, “R{b.rmin} or more”)</Toggle>
          </span>
        ) : t.kind === "talent" ? (
          <span className="flex flex-wrap items-end gap-4">
            <label className={miniLbl}>Skill dice<Stepper value={b.n} min={0} max={20} width="2.2em" ariaLabel="talent cost" onChange={(n) => setB({ n: n ?? 0 })} /></label>
            <Toggle checked={b.perRank} onChange={(v) => setB({ perRank: v })}>per rank</Toggle>
          </span>
        ) : (
          <span className="font-mono text-[13px] text-[var(--hb-accent)]">{t.kind === "asset" ? ASSET_COST : TROUBLE_COST}</span>
        )}
        {!b.text && (t.kind === "perk" || t.kind === "flaw" || t.kind === "talent") ? <p className={hint}>Printed cost: <b className="font-mono">{composeTraitCost(t.kind, b) || "—"}</b></p> : null}
      </Cell>
      <Cell label="Description" className="sm:col-span-2" help="What the trait does at each rank.">
        <textarea className={`${fieldCls} min-h-[90px]`} value={t.description} maxLength={3000} onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}
export function TraitPreview({ name, t }: { name: string; t: TraitDraft }) {
  const cost = composeTraitCost(t.kind, t.b);
  return (
    <Preview title={name || "Unnamed trait"} subtitle={[KINDS.find(([k]) => k === t.kind)?.[1], t.genre !== "core" ? D62E_GENRE_OPTS.find(([v]) => v === t.genre)?.[1] : ""].filter(Boolean).join(" · ")}>
      <div className="flex flex-col gap-1 text-[12px]">
        {cost ? <div><b>Cost</b> <span className="font-mono">{cost}</span></div> : null}
        <RankMath kind={t.kind} b={t.b} />
        {t.description ? <p className="mt-1 text-[var(--muted)]">{t.description}</p> : null}
      </div>
    </Preview>
  );
}

// ═══ LIMITATIONS ═════════════════════════════════════════════════════════════
export type LimitDraft = { genre: string; b: D62eLimitBuild };
export const blankLimit = (): LimitDraft => ({ genre: "superhero", b: { values: [1], text: "" } });
export const limitFromData = (d: Data): LimitDraft => ({ genre: genreOf(d, "superhero"), b: limitBuildFrom(d) });
export function limitPayload(name: string, l: LimitDraft): Data {
  const v = l.b.values;
  return { name, genre: l.genre, value: v[0] ?? 1, ...(v.length > 1 ? { rankValues: v } : {}), description: composeLimitDesc(l.b), build: l.b };
}
export function LimitBuilder({ value: l, onChange }: { value: LimitDraft; onChange: (v: LimitDraft) => void }) {
  const b = l.b;
  const setB = (p: Partial<D62eLimitBuild>) => onChange({ ...l, b: { ...b, ...p } });
  const setRanks = (n: number) => {
    const v = b.values.slice(0, n);
    while (v.length < n) v.push((v[v.length - 1] ?? 0) + 1);
    setB({ values: v });
  };
  return (
    <>
      <Cell label="Genre"><Select value={l.genre} options={D62E_GENRE_OPTS} ariaLabel="genre" onChange={(v) => onChange({ ...l, genre: v })} /></Cell>
      <Cell label="Ranks" help="How many ranks the limitation can be taken at.">
        <Stepper value={b.values.length} min={1} max={5} width="2.2em" ariaLabel="ranks" onChange={(n) => setRanks(n ?? 1)} />
      </Cell>
      <Cell label="Superpower Dice cut" className="sm:col-span-2" help="Attached to a superpower, it lowers that power's total cost by this much (never below 1).">
        <span className="flex flex-wrap items-end gap-4">
          {b.values.map((v, i) => (
            <label key={i} className={miniLbl}>{b.values.length > 1 ? `Rank ${i + 1}` : "Cut"}
              <Stepper value={v} min={0} max={9} width="2.2em" ariaLabel={`rank ${i + 1} cut`} onChange={(n) => setB({ values: b.values.map((x, j) => (j === i ? n ?? 0 : x)) })} />
            </label>
          ))}
        </span>
      </Cell>
      <Cell label="Description" className="sm:col-span-2" help={b.values.length > 1 ? "The cost line for each rank is added in front automatically." : undefined}>
        <textarea className={`${fieldCls} min-h-[90px]`} value={b.text} maxLength={2900} onChange={(e) => setB({ text: e.target.value })} />
      </Cell>
    </>
  );
}
export function LimitPreview({ name, l }: { name: string; l: LimitDraft }) {
  const v = l.b.values;
  return (
    <Preview title={name || "Unnamed limitation"} subtitle="Superpower Limitation">
      <div className="flex flex-col gap-1 text-[12px]">
        <div><b>Cost</b> {v.map((x, i) => `−${x}${v.length > 1 ? ` (R${i + 1})` : ""}`).join(" · ")}</div>
        <p className="mt-1 text-[var(--muted)]">{composeLimitDesc(l.b) || "—"}</p>
      </div>
    </Preview>
  );
}
