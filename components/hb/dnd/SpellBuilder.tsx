"use client";
// ── D&D 2024 homebrew spell builder ──────────────────────────────────────────
// Level / school / casting time / range / components / duration / class lists
// chosen, never typed; how it resolves on the sheet (attack roll or save + the
// save ability), damage dice + type, healing dice and the per-slot upcast dice.
// Storage (type "dnd-spell", DndSpell shape — the sheet's spellbook, the GM
// Screen and the spells page read it): the legacy strings castingTime / range /
// components / duration (composed here), level school concentration ritual
// classes description higherLevels roll saveAbility damage damageType heal
// upcast. No new stored fields: every structured choice composes back into
// those strings, and old records parse back into the builder (anything the
// parser doesn't recognise opens as "Custom" text, unchanged).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { formatDice, noDice, parseDice, type Dice } from "../dice";
import {
  ABILS, ABIL_NAME, AREA_SHAPES, CAST_TIMES, DAMAGE_TYPES, DUR_KINDS, RANGE_KINDS, SCHOOLS, SPELL_CLASSES,
  composeCastTime, composeComponents, composeDuration, composeRange, parseCastTime, parseComponents, parseDuration, parseRange,
  type CastTime, type Components, type SpellDuration, type SpellRange,
} from "./rules";
import { Cell, Select, Toggle, fieldCls, hint } from "./ui";

type Data = Record<string, unknown>;
export type SpellDraft = {
  level: number; school: string; cast: CastTime; range: SpellRange; comp: Components; dur: SpellDuration; conc: boolean; ritual: boolean;
  classes: string[]; description: string; higherLevels: string;
  roll: string; saveAbility: string; damage: Dice; damageType: string; heal: Dice; upcast: Dice;
};
const s = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const dice = (v: string) => { const x = parseDice(v); return x && x.n > 0 ? x : noDice(); };

export function blankSpell(): SpellDraft {
  return {
    level: 1, school: "Evocation", cast: parseCastTime("Action"), range: parseRange("60 feet"), comp: { v: true, s: true, m: false, mat: "" },
    dur: parseDuration("Instantaneous").d, conc: false, ritual: false, classes: [], description: "", higherLevels: "",
    roll: "save", saveAbility: "DEX", damage: { n: 3, d: 6, m: 0 }, damageType: "fire", heal: noDice(), upcast: { n: 1, d: 6, m: 0 },
  };
}
export function spellFromData(d: Data): SpellDraft {
  const pd = parseDuration(s(d, "duration"));
  return {
    level: Math.min(9, Math.max(0, parseInt(s(d, "level"), 10) || 0)),
    school: s(d, "school") || "Evocation",
    cast: parseCastTime(s(d, "castingTime")), range: parseRange(s(d, "range")), comp: parseComponents(s(d, "components")),
    dur: pd.d, conc: !!d.concentration || pd.conc, ritual: !!d.ritual,
    classes: Array.isArray(d.classes) ? (d.classes as string[]) : [],
    description: s(d, "description"), higherLevels: s(d, "higherLevels"),
    roll: s(d, "roll"), saveAbility: s(d, "saveAbility") || "DEX",
    damage: dice(s(d, "damage")), damageType: s(d, "damageType"), heal: dice(s(d, "heal")), upcast: dice(s(d, "upcast")),
  };
}
export function spellPayload(name: string, x: SpellDraft): Data {
  const hasDmg = x.damage.n > 0;
  return {
    name, level: x.level, school: x.school,
    castingTime: composeCastTime(x.cast), range: composeRange(x.range), components: composeComponents(x.comp),
    duration: composeDuration(x.dur, x.conc), concentration: x.conc, ritual: x.ritual,
    classes: x.classes, description: x.description, higherLevels: x.higherLevels,
    roll: x.roll, saveAbility: x.roll === "save" ? x.saveAbility : "",
    damage: hasDmg ? formatDice(x.damage) : "", damageType: hasDmg ? x.damageType : "",
    heal: x.heal.n > 0 ? formatDice(x.heal) : "", upcast: x.upcast.n > 0 ? formatDice({ ...x.upcast, m: 0 }) : "",
  };
}

const LEVELS: [string, string][] = Array.from({ length: 10 }, (_, i) => [String(i), i ? String(i) : "Cantrip"]);

export default function SpellBuilder({ value: x, onChange }: { value: SpellDraft; onChange: (x: SpellDraft) => void }) {
  const set = (p: Partial<SpellDraft>) => onChange({ ...x, ...p });
  const timed = !["inst", "dispelled", "triggered", "special", "custom"].includes(x.dur.kind);
  return (
    <>
      <Cell label="Level" className="sm:col-span-2"><ChipPicker single options={LEVELS} value={[String(x.level)]} onChange={(v) => v[0] && set({ level: parseInt(v[0], 10) })} /></Cell>
      <Cell label="School" className="sm:col-span-2"><ChipPicker single options={SCHOOLS} value={[x.school]} onChange={(v) => v[0] && set({ school: v[0] })} /></Cell>

      <Cell label="Casting time">
        <div className="flex flex-col gap-2">
          <Select className="w-full" value={x.cast.base} options={[...CAST_TIMES, ["custom", "Custom…"] as const]} onChange={(v) => set({ cast: { ...x.cast, base: v } })} />
          {x.cast.base === "custom" ? <input className={fieldCls} value={x.cast.custom} maxLength={80} placeholder="Action or 8 Hours" onChange={(e) => set({ cast: { ...x.cast, custom: e.target.value } })} />
            : x.cast.base === "Reaction" || x.cast.base === "Bonus Action" ? <input className={fieldCls} value={x.cast.trigger} maxLength={160} placeholder="Trigger (optional): taken when you take damage" onChange={(e) => set({ cast: { ...x.cast, trigger: e.target.value } })} /> : null}
        </div>
      </Cell>
      <Cell label="Range">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={x.range.kind} options={[...RANGE_KINDS, ...(x.range.kind === "custom" ? [["custom", "Custom…"] as [string, string]] : [])]} ariaLabel="range" onChange={(v) => set({ range: { ...x.range, kind: v, n: v === "miles" ? 1 : v === "area" ? 15 : x.range.n || 60 } })} />
          {x.range.kind === "feet" || x.range.kind === "miles" || x.range.kind === "area" ? (
            <Stepper value={x.range.n} min={x.range.kind === "miles" ? 1 : 5} max={x.range.kind === "miles" ? 500 : 5280} step={x.range.kind === "miles" ? 1 : 5} width="3.2em" ariaLabel="distance" onChange={(v) => set({ range: { ...x.range, n: v ?? 5 } })} />
          ) : null}
          {x.range.kind === "area" ? <Select value={x.range.shape} options={AREA_SHAPES} ariaLabel="area shape" onChange={(v) => set({ range: { ...x.range, shape: v } })} /> : null}
          {x.range.kind === "custom" ? <input className={fieldCls} value={x.range.custom} maxLength={80} onChange={(e) => set({ range: { ...x.range, custom: e.target.value } })} /> : null}
        </div>
      </Cell>
      <Cell label="Components" className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <Toggle checked={x.comp.v} onChange={(v) => set({ comp: { ...x.comp, v } })}>Verbal</Toggle>
          <Toggle checked={x.comp.s} onChange={(v) => set({ comp: { ...x.comp, s: v } })}>Somatic</Toggle>
          <Toggle checked={x.comp.m} onChange={(v) => set({ comp: { ...x.comp, m: v } })}>Material</Toggle>
          {x.comp.m ? <input className={`${fieldCls} min-w-[200px] flex-1`} value={x.comp.mat} maxLength={180} placeholder="a pinch of ash" onChange={(e) => set({ comp: { ...x.comp, mat: e.target.value } })} /> : null}
        </div>
      </Cell>
      <Cell label="Duration" className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={x.dur.kind} options={[...DUR_KINDS, ...(x.dur.kind === "custom" ? [["custom", "Custom…"] as [string, string]] : [])]} ariaLabel="duration" onChange={(v) => set({ dur: { ...x.dur, kind: v } })} />
          {timed ? <Stepper value={x.dur.n} min={1} max={365} ariaLabel="duration amount" onChange={(v) => set({ dur: { ...x.dur, n: v ?? 1 } })} /> : null}
          {x.dur.kind === "custom" ? <input className={`${fieldCls} min-w-[200px] flex-1`} value={x.dur.custom} maxLength={80} onChange={(e) => set({ dur: { ...x.dur, custom: e.target.value } })} /> : null}
          {timed ? <Toggle checked={x.conc} onChange={(v) => set({ conc: v })}>Concentration</Toggle> : null}
          {timed && !x.conc ? <Toggle checked={x.dur.upTo} onChange={(v) => set({ dur: { ...x.dur, upTo: v } })}>“Up to”</Toggle> : null}
          <Toggle checked={x.ritual} onChange={(v) => set({ ritual: v })}>Ritual</Toggle>
        </div>
      </Cell>
      <Cell label="Class spell lists" className="sm:col-span-2" help="The sheet's spellbook offers it to these classes.">
        <ChipPicker options={SPELL_CLASSES} value={x.classes} onChange={(v) => set({ classes: SPELL_CLASSES.filter((c) => v.includes(c)) })} />
      </Cell>

      <Cell label="Resolves with (on the sheet)">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={x.roll} options={[["", "— nothing to roll —"], ["attack", "Spell attack roll"], ["save", "Saving throw"]]} onChange={(v) => set({ roll: v })} />
          {x.roll === "save" ? <Select value={x.saveAbility} options={ABILS.map((a) => [a, ABIL_NAME[a]] as [string, string])} ariaLabel="save ability" onChange={(v) => set({ saveAbility: v })} /> : null}
        </div>
      </Cell>
      <Cell label="Damage">
        <span className="flex flex-wrap items-center gap-2">
          <DiceInput value={x.damage} minCount={0} maxCount={40} ariaLabel="damage" onChange={(v) => set({ damage: v })} />
          {x.damage.n > 0 ? <Select value={x.damageType} options={[["", "— type —"], ...DAMAGE_TYPES.map((t) => [t, t] as [string, string])]} ariaLabel="damage type" onChange={(v) => set({ damageType: v })} /> : null}
        </span>
      </Cell>
      <Cell label="Healing" help="Your spellcasting modifier is added when cast.">
        <DiceInput value={x.heal} minCount={0} maxCount={40} ariaLabel="healing" onChange={(v) => set({ heal: v })} />
      </Cell>
      <Cell label={x.level === 0 ? "Cantrip scaling (per tier)" : "Upcast (per slot level above)"} help={x.level === 0 ? "Added at levels 5, 11 and 17." : `Added for each slot level above ${x.level}.`}>
        <DiceInput value={x.upcast} minCount={0} maxCount={10} mod={false} ariaLabel="upcast" onChange={(v) => set({ upcast: v })} />
      </Cell>

      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[90px]`} value={x.description} maxLength={6000} placeholder="What the spell does…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
      <Cell label="Using a higher-level spell slot (optional text)" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[50px]`} value={x.higherLevels} maxLength={2000} placeholder="Shown on the spell card; the dice above are what the sheet rolls." onChange={(e) => set({ higherLevels: e.target.value })} />
      </Cell>
    </>
  );
}

export function SpellPreview({ name, x }: { name: string; x: SpellDraft }) {
  const p = spellPayload(name, x);
  const lvl = x.level ? `Level ${x.level} ${x.school}` : `${x.school} Cantrip`;
  const roll = x.roll === "attack" ? "Spell attack" : x.roll === "save" ? `${ABIL_NAME[x.saveAbility as keyof typeof ABIL_NAME] ?? x.saveAbility} save` : "";
  const fx = [roll, p.damage ? `${p.damage} ${p.damageType}`.trim() : "", p.heal ? `heals ${p.heal} + mod` : "", p.upcast ? `+${p.upcast} ${x.level ? "per slot level" : "per tier"}` : ""].filter(Boolean).join(" · ");
  return (
    <Preview title={name || "Unnamed spell"} subtitle={`${lvl}${x.classes.length ? ` (${x.classes.join(", ")})` : ""}`}>
      <p className="text-[13px]"><b>Casting Time:</b> {String(p.castingTime)}{x.ritual ? " or Ritual" : ""}</p>
      <p className="text-[13px]"><b>Range:</b> {String(p.range)}</p>
      <p className="text-[13px]"><b>Components:</b> {String(p.components)}</p>
      <p className="text-[13px]"><b>Duration:</b> {String(p.duration)}</p>
      {fx ? <p className="mt-1 text-[12px] font-semibold text-[var(--hb-accent)]">{fx}</p> : null}
      {x.description ? <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed">{x.description}</p> : null}
      {x.higherLevels ? <p className="mt-1 text-[13px] leading-relaxed"><b><i>Using a Higher-Level Spell Slot.</i></b> {x.higherLevels}</p> : null}
      {!x.description ? <p className={hint}>Add a description so players know what it does.</p> : null}
    </Preview>
  );
}
