"use client";
// ── MMRPG homebrew Power builder ────────────────────────────────────────────
// Power set chips, prerequisites (required powers — all of / any one of —,
// ability minimums, other text, minimum rank), action / trigger / duration /
// range / Focus cost pickers in book wording, the effect prose plus effect
// badges the character sheet automates, and a Fantastic result. Storage: the
// book strings (see ./rules.ts); legacy text that doesn't re-compose is kept
// "as written" until the user switches to the pickers.
import BonusBadges, { BadgeStrip, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { MMRPG_POWER_NAMES } from "@/lib/data/mmrpg-power-names";
import {
  ABILITIES, ACTIONS, DMG_ABILITIES, DURATIONS, MOVE_MODES, POWER_SETS, RANGE_KINDS,
  blankCost, blankPrereq, cleanPowerFx, composeCost, composeEffect, composePrereq, composeRange, isReaction, parseCost, parsePrereq, parseRange,
  type Cost, type Fx, type Prereq, type Range, type RangeKind,
} from "./rules";
import { AsWritten, Cell, PickerField, Stat, fieldCls, hint, miniBtn, selCls, statK } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

export type PowerDraft = {
  sets: string[];
  pre: Prereq; preRaw: string | null;
  action: string; trigger: string; duration: string;
  range: Range; rangeRaw: string | null;
  cost: Cost; costRaw: string | null;
  text: string; fx: Fx[]; fantastic: string;
};
export const blankPower = (): PowerDraft => ({
  sets: [], pre: blankPrereq(), preRaw: null, action: "Standard", trigger: "", duration: "Instant",
  range: { kind: "", n: 10 }, rangeRaw: null, cost: blankCost(), costRaw: null, text: "", fx: [], fantastic: "",
});
export function powerFromData(d: Data): PowerDraft {
  const set = sv(d, "powerSet");
  const preS = sv(d, "prerequisites"), rS = sv(d, "range"), cS = sv(d, "cost");
  const pre = parsePrereq(preS), range = parseRange(rS), cost = parseCost(cS);
  const fx = cleanPowerFx(d.effects);
  return {
    sets: !set || set === "None" ? [] : set.split(",").map((s) => s.trim()).filter(Boolean),
    pre: pre ?? blankPrereq(), preRaw: pre ? (preS === "None" ? "None" : null) : preS,
    action: sv(d, "action"), trigger: sv(d, "trigger"), duration: sv(d, "duration"),
    range: range ?? { kind: "", n: 10 }, rangeRaw: range ? null : rS,
    cost: cost ?? blankCost(), costRaw: cost ? null : cS,
    // Records saved with badges keep the prose apart; older ones are all prose.
    text: typeof d.text === "string" && fx.length ? d.text : sv(d, "effect"), fx, fantastic: sv(d, "fantastic"),
  };
}
const prereqOut = (p: PowerDraft) => {
  if (p.preRaw !== null && p.preRaw !== "None") return p.preRaw.trim();
  return composePrereq(p.pre) || (p.preRaw === "None" ? "None" : "");
};
export function powerPayload(name: string, p: PowerDraft): Data {
  const fx = cleanPowerFx(p.fx);
  const out: Data = {
    name, powerSet: p.sets.join(", ") || "None", prerequisites: prereqOut(p),
    action: p.action, trigger: p.trigger.trim(), duration: p.duration.trim(),
    range: p.rangeRaw !== null ? p.rangeRaw.trim() : composeRange(p.range),
    cost: p.costRaw !== null ? p.costRaw.trim() : composeCost(p.cost),
    effect: composeEffect(p.text, fx), fantastic: p.fantastic.trim(),
  };
  if (fx.length) { out.effects = fx; out.text = p.text.trim(); }
  return out;
}

const MULT_TXT = (n: number) => (n === 1 ? "= Run" : `×${n} Run`);
export const POWER_FX: readonly BadgeKind[] = [
  { k: "dmgMult", label: "Damage mult.", color: "red", amount: true, amountPh: "+1", target: "choice", choices: DMG_ABILITIES, tip: "+N to an ability's damage multiplier (Mighty, Accuracy…). The sheet adds it to that attack's multiplier.", format: (b) => `+${b.amount ?? 1} ${DMG_ABILITIES.find(([k]) => k === b.target)?.[1] ?? ""} dmg mult.` },
  { k: "noncombat", label: "Non-combat", color: "blue", amount: true, amountPh: "+1", target: "choice", choices: ABILITIES, tip: "+N to the ability's checks other than attacks. The sheet adds it to the non-combat roll.", format: (b) => `+${b.amount ?? 1} ${ABILITIES.find(([k]) => k === b.target)?.[1] ?? ""} non-combat` },
  { k: "defense", label: "Defense", color: "green", amount: true, amountPh: "+1", target: "choice", choices: ABILITIES, tip: "+N to the ability's defense. The sheet adds it to that defense.", format: (b) => `+${b.amount ?? 1} ${ABILITIES.find(([k]) => k === b.target)?.[1] ?? ""} defense` },
  { k: "attack", label: "Attack", color: "purple", target: "choice", choices: DMG_ABILITIES, tip: "The power is an attack with this ability — the sheet's Use button rolls its damage.", format: (b) => `${DMG_ABILITIES.find(([k]) => k === b.target)?.[1] ?? ""} attack` },
  { k: "move", label: "Movement", color: "teal", amount: true, optAmount: true, amountPh: "×1–4", target: "choice", choices: MOVE_MODES, tip: "Grants a movement mode at a multiple of Run Speed (blank or 1 = equal, 2 = double, 3 = triple). Shown in the sheet's Speed box.", format: (b) => `${b.target} ${MULT_TXT(b.amount ?? 1)}` },
];

function PrereqEditor({ p, set }: { p: PowerDraft; set: (x: Partial<PowerDraft>) => void }) {
  if (p.preRaw !== null && p.preRaw !== "None") {
    return <AsWritten value={p.preRaw} onChange={(v) => set({ preRaw: v })} onPickers={() => set({ preRaw: null, pre: parsePrereq(p.preRaw ?? "") ?? blankPrereq() })} />;
  }
  const pre = p.pre;
  const setPre = (x: Partial<Prereq>) => set({ pre: { ...pre, ...x } });
  return (
    <div className="flex flex-col gap-2">
      <PickerField label="Required powers" dlId="dl-mmrpg-prereq" value={pre.powers} onChange={(powers) => setPre({ powers })}
        options={MMRPG_POWER_NAMES} lazyDetails="mmrpg-powers" allowCustom addLabel="+ Power" browseLabel="Browse powers…" modalTitle="Required powers" placeholder="Type to search powers…" />
      {pre.powers.length > 1 ? (
        <label className="flex items-center gap-2 text-[12px] text-[var(--text)]">
          <input type="checkbox" checked={pre.anyOf} onChange={(e) => setPre({ anyOf: e.target.checked })} />
          Any one of these (&ldquo;{pre.powers.slice(0, 2).join(" or ")}&rdquo;) instead of all of them
        </label>
      ) : null}
      <div className="flex flex-wrap items-end gap-3">
        <Cell label="Minimum rank">
          <Stepper value={pre.rank} nullable min={1} max={6} ariaLabel="minimum rank" onChange={(rank) => setPre({ rank })} />
        </Cell>
        {pre.abilities.map((a, i) => (
          <Cell key={i} label="Ability minimum">
            <div className="flex items-center gap-1">
              <select className={selCls} aria-label="ability" value={a.ability} onChange={(e) => setPre({ abilities: pre.abilities.map((x, j) => (j === i ? { ...x, ability: e.target.value } : x)) })}>
                {ABILITIES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
              <Stepper value={a.min} min={1} max={9} ariaLabel="minimum score" onChange={(n) => setPre({ abilities: pre.abilities.map((x, j) => (j === i ? { ...x, min: n ?? 1 } : x)) })} />
              <button type="button" className={miniBtn} aria-label="Remove ability minimum" onClick={() => setPre({ abilities: pre.abilities.filter((_, j) => j !== i) })}>✕</button>
            </div>
          </Cell>
        ))}
        {pre.abilities.length < 3 ? <button type="button" className={`${miniBtn} mb-1`} onClick={() => setPre({ abilities: [...pre.abilities, { ability: "melee", min: 3 }] })}>+ Ability minimum</button> : null}
      </div>
      <Cell label="Other requirement" help="E.g. an origin: “Weird Science: Power Cosmic origin”.">
        <input className={fieldCls} value={pre.other} maxLength={120} placeholder="optional" onChange={(e) => setPre({ other: e.target.value })} />
      </Cell>
    </div>
  );
}

export function PowerBuilder({ value: p, onChange }: { value: PowerDraft; onChange: (v: PowerDraft) => void }) {
  const set = (x: Partial<PowerDraft>) => onChange({ ...p, ...x });
  const actionKnown = ACTIONS.some(([v]) => v === p.action);
  const durKnown = !p.duration || DURATIONS.includes(p.duration);
  const preview = prereqOut(p);
  return (
    <>
      <Cell label="Power set" className="sm:col-span-2" help={p.sets.length ? "Powers in a set count toward thematic picks; most set powers need an earlier power of the set." : "None = a basic power anyone can take."}>
        <ChipPicker custom customPh="Other set…" options={POWER_SETS} value={p.sets} onChange={(sets) => set({ sets })} />
      </Cell>
      <Cell label="Prerequisites" className="sm:col-span-2" help={<>Reads as: <b>{preview || "None"}</b>. The hero wizard and level-up only offer the power once these are met.</>}>
        <PrereqEditor p={p} set={set} />
      </Cell>
      <Cell label="Action">
        <select className={`${selCls} w-full`} value={p.action} onChange={(e) => set({ action: e.target.value })}>
          {!actionKnown ? <option value={p.action}>{p.action} (as written)</option> : null}
          {ACTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </Cell>
      <Cell label="Duration">
        <div className="flex gap-1.5">
          <select className={`${selCls} min-w-0 flex-1`} value={durKnown ? p.duration : "__other"} onChange={(e) => set({ duration: e.target.value === "__other" ? (durKnown ? "" : p.duration) || "The character’s rank times 15 minutes" : e.target.value })}>
            <option value="">—</option>
            {DURATIONS.map((v) => <option key={v} value={v}>{v}</option>)}
            <option value="__other">Other…</option>
          </select>
          {!durKnown ? <input className={`${fieldCls} min-w-0 flex-1`} value={p.duration} maxLength={60} onChange={(e) => set({ duration: e.target.value })} /> : null}
        </div>
      </Cell>
      {isReaction(p.action) || p.trigger ? (
        <Cell label="Trigger" className="sm:col-span-2" help="What sets the reaction off.">
          <input className={fieldCls} value={p.trigger} maxLength={200} placeholder="The character is attacked by an enemy they can see." onChange={(e) => set({ trigger: e.target.value })} />
        </Cell>
      ) : null}
      <Cell label="Range" help={p.rangeRaw === null && p.range.kind ? composeRange(p.range) : undefined}>
        {p.rangeRaw !== null ? (
          <AsWritten value={p.rangeRaw} onChange={(v) => set({ rangeRaw: v })} onPickers={() => set({ rangeRaw: null })} />
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            <select className={selCls} aria-label="range kind" value={p.range.kind} onChange={(e) => set({ range: { ...p.range, kind: e.target.value as RangeKind } })}>
              {RANGE_KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            {p.range.kind === "spaces" || p.range.kind === "perRank" || p.range.kind === "timesRank" ? (
              <Stepper value={p.range.n} min={1} max={60} ariaLabel="spaces" onChange={(n) => set({ range: { ...p.range, n: n ?? 1 } })} />
            ) : null}
          </div>
        )}
      </Cell>
      <Cell label="Cost" help={p.costRaw === null && p.cost.kind === "focus" ? `${composeCost(p.cost)} — the sheet's Use button spends it.` : undefined}>
        {p.costRaw !== null ? (
          <AsWritten value={p.costRaw} onChange={(v) => set({ costRaw: v })} onPickers={() => set({ costRaw: null })} />
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            <select className={selCls} aria-label="cost kind" value={p.cost.kind} onChange={(e) => set({ cost: { ...p.cost, kind: e.target.value as Cost["kind"] } })}>
              <option value="none">— (free)</option>
              <option value="focus">Focus</option>
              <option value="varies">Varies</option>
            </select>
            {p.cost.kind === "focus" ? (
              <>
                <Stepper value={p.cost.n} min={5} max={30} step={5} ariaLabel="Focus" onChange={(n) => set({ cost: { ...p.cost, n: n ?? 5 } })} />
                <label className="flex items-center gap-1 text-[12px]"><input type="checkbox" checked={p.cost.more} onChange={(e) => set({ cost: { ...p.cost, more: e.target.checked } })} />or more</label>
                <select className={selCls} aria-label="per" value={p.cost.per} onChange={(e) => set({ cost: { ...p.cost, per: e.target.value as Cost["per"] } })}>
                  <option value="">once</option><option value="turn">per turn</option><option value="round">per round</option>
                </select>
              </>
            ) : null}
          </div>
        )}
      </Cell>
      <Cell label="Effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[90px]`} value={p.text} maxLength={2400} placeholder="What the power does, in the book's voice." onChange={(e) => set({ text: e.target.value })} />
      </Cell>
      <Cell label="Automated effects" className="sm:col-span-2" help="Each badge adds a book-worded sentence to the effect that the character sheet reads and applies.">
        <BonusBadges value={p.fx} onChange={(fx) => set({ fx: cleanPowerFx(fx) })} kinds={POWER_FX} empty="None — purely narrative" addLabel="+ Effect" max={8} />
      </Cell>
      <Cell label="Fantastic result" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[50px]`} value={p.fantastic} maxLength={400} placeholder="optional — what happens on a Fantastic success" onChange={(e) => set({ fantastic: e.target.value })} />
      </Cell>
    </>
  );
}

export function PowerPreview({ name, p }: { name: string; p: PowerDraft }) {
  const d = powerPayload(name, p);
  const line = (k: string, v: unknown) => (v ? <p className="text-[12px]"><span className={statK}>{k}</span> {String(v)}</p> : null);
  return (
    <Preview title={name || "Unnamed Power"} subtitle={`Power set: ${String(d.powerSet) === "None" ? "None (basic)" : String(d.powerSet)}`}>
      <div className="flex flex-col gap-0.5">
        {line("Prerequisites", d.prerequisites || "None")}
        {line("Action", d.action)}
        {line("Trigger", d.trigger)}
        {line("Duration", d.duration)}
        {line("Range", d.range)}
        {line("Cost", d.cost)}
      </div>
      {d.effect ? <p className="mt-2 text-[13px] leading-relaxed">{String(d.effect)}</p> : <p className={hint}>No effect text yet.</p>}
      {d.fantastic ? <p className="mt-2 text-[12px]"><span className={statK}>Fantastic</span> {String(d.fantastic)}</p> : null}
      {p.fx.length ? (
        <div className="mt-2"><span className={statK}>Sheet automates</span><BadgeStrip value={p.fx} kinds={POWER_FX} /></div>
      ) : null}
      {p.cost.kind === "focus" && p.costRaw === null ? <p className={hint}><Stat k="Use" v={`spends ${p.cost.n}${p.cost.more ? "+" : ""} Focus${p.cost.per ? ` per ${p.cost.per}` : ""}`} /></p> : null}
    </Preview>
  );
}
