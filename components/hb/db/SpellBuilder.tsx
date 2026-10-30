"use client";
// ── Dragonbane spell / magic trick builder ───────────────────────────────────
// Storage = DbSpell / DbMagicTrick (lib/data/db-types) via normalizeDbSpell:
//   school, trick (→ a 1 WP magic trick: school + text only), rank 1–5,
//   prerequisite, requirements (word / gesture / focus / ingredient / melody /
//   symbol / tools) + requirementDetail, castingTime, range ("10 meters",
//   "4 meters (sphere)", "Touch"…), duration, powerLevels, dodge, parry,
//   damage {base, perLevel} / healing {base, perLevel} (posted as damageBase /
//   damagePerLevel …), and the book flags damageType, ignoresArmor, target,
//   enchantment + castOn (Enchanting spells bound to an item — they then show
//   up in the "Enchantment" bonus badge list on items).
// Range, duration and dice are picked; text that doesn't parse stays as text.
import { Fragment } from "react";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  DB_CASTING, DB_CAST_ON, DB_DMG_TYPES, DB_DURATIONS, DB_RANGE_KINDS, DB_SCHOOLS, DB_SPELL_REQS, fmtDb, fmtRange, noDmg, parseDb, parseRange, perLevel,
  type DbDmg, type DbRange,
} from "./rules";
import { Cell, DmgInput, Select, Toggle, fieldCls, smallBtn, useDbData } from "./ui";

type Data = Record<string, unknown>;
export type SpellDraft = {
  school: string; trick: boolean; rank: number; prereq: string; reqs: string[]; reqDetail: string; casting: string;
  range: DbRange; duration: string; powerLevels: boolean; dodge: boolean; parry: boolean;
  dmg: DbDmg; dmgPer: DbDmg; dmgText: string; dmgType: string; heal: DbDmg; healPer: DbDmg; healText: string;
  ignoresArmor: boolean; enchantment: boolean; castOn: string[]; target: string; text: string;
};
export const blankSpell = (): SpellDraft => ({
  school: "Elementalism", trick: false, rank: 1, prereq: "", reqs: ["word", "gesture"], reqDetail: "", casting: "action",
  range: { kind: "m", m: 10, text: "" }, duration: "Instant", powerLevels: true, dodge: false, parry: false,
  dmg: noDmg(), dmgPer: noDmg(), dmgText: "", dmgType: "", heal: noDmg(), healPer: noDmg(), healText: "",
  ignoresArmor: false, enchantment: false, castOn: [], target: "", text: "",
});
const dice = (v: unknown) => { const p = parseDb(v); return p ?? noDmg(); };
export function spellFromData(d: Data): SpellDraft {
  const b = blankSpell();
  const dm = (d.damage ?? {}) as Data, hl = (d.healing ?? {}) as Data;
  const db = String(dm.base ?? d.damageBase ?? ""), hb = String(hl.base ?? d.healingBase ?? "");
  return {
    ...b, school: String(d.school ?? "General"), trick: !!d.trick, rank: Number(d.rank) || 1,
    prereq: String(d.prerequisite ?? ""), reqs: Array.isArray(d.requirements) ? (d.requirements as string[]) : [], reqDetail: String(d.requirementDetail ?? ""),
    casting: String(d.castingTime ?? "action"), range: d.range == null ? b.range : parseRange(d.range), duration: String(d.duration ?? "Instant"),
    powerLevels: d.powerLevels == null ? true : !!d.powerLevels, dodge: !!d.dodge, parry: !!d.parry,
    dmg: dice(db), dmgPer: dice(dm.perLevel ?? d.damagePerLevel), dmgText: db && !parseDb(db) ? db : "", dmgType: String(d.damageType ?? dm.type ?? ""),
    heal: dice(hb), healPer: dice(hl.perLevel ?? d.healingPerLevel), healText: hb && !parseDb(hb) ? hb : "",
    ignoresArmor: !!d.ignoresArmor, enchantment: !!d.enchantment, castOn: Array.isArray(d.castOn) ? (d.castOn as string[]) : [],
    target: String(d.target ?? ""), text: String(d.text ?? ""),
  };
}
export function spellPayload(name: string, s: SpellDraft): Data {
  if (s.trick) return { name, school: s.school, trick: true, text: s.text };
  const ench = s.school === "Enchanting" && s.enchantment;
  return {
    name, school: s.school, rank: s.rank, prerequisite: s.prereq.trim(), requirements: s.reqs, requirementDetail: s.reqDetail.trim(),
    castingTime: s.casting, range: ench ? "Item" : fmtRange(s.range), duration: s.duration, powerLevels: s.powerLevels, dodge: s.dodge, parry: s.parry,
    damageBase: s.dmgText.trim() || fmtDb(s.dmg), damagePerLevel: s.powerLevels ? fmtDb(s.dmgPer) : "", damageType: s.dmgType,
    healingBase: s.healText.trim() || fmtDb(s.heal), healingPerLevel: s.powerLevels ? fmtDb(s.healPer) : "",
    ignoresArmor: s.ignoresArmor, enchantment: ench, castOn: ench ? s.castOn : [], target: s.target.trim(), text: s.text,
  };
}

function DiceRow({ label, base, per, text, power, onChange }: { label: string; base: DbDmg; per: DbDmg; text: string; power: boolean; onChange: (p: { base?: DbDmg; per?: DbDmg; text?: string }) => void }) {
  if (text) return (
    <span className="flex flex-wrap items-center gap-2">
      <input className={`${fieldCls} max-w-[220px]`} value={text} maxLength={60} aria-label={label} onChange={(e) => onChange({ text: e.target.value })} />
      <button type="button" className={smallBtn} onClick={() => onChange({ text: "" })}>Use dice picker</button>
    </span>
  );
  return (
    <span className="flex flex-wrap items-center gap-2">
      <DmgInput value={base} allowNone extra={false} ariaLabel={label} onChange={(v) => onChange({ base: v })} />
      {power && base.n > 0 ? <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">+ per extra power level <DmgInput value={per} allowNone extra={false} ariaLabel={`${label} per level`} onChange={(v) => onChange({ per: v })} /></span> : null}
    </span>
  );
}

export default function SpellBuilder({ value: s, onChange }: { value: SpellDraft; onChange: (v: SpellDraft) => void }) {
  const set = (p: Partial<SpellDraft>) => onChange({ ...s, ...p });
  const D = useDbData();
  const prereqOpts = ["Any school of magic", s.school === "General" ? "" : s.school, ...(D?.spells ?? []).filter((x) => x.school === s.school && Number(x.rank) < s.rank).map((x) => x.name)].filter(Boolean);
  const needsM = DB_RANGE_KINDS.find(([k]) => k === s.range.kind)?.[2];
  const ench = s.school === "Enchanting";
  return (
    <>
      <Cell label="School">
        <Select value={s.school} options={DB_SCHOOLS.map((x) => [x, x === "General" ? "General magic" : x] as [string, string])} ariaLabel="school" onChange={(v) => set({ school: v })} />
      </Cell>
      <Cell label="Kind">
        <ChipPicker single options={[["spell", "Spell"], ["trick", "Magic trick (1 WP, always works)"]]} value={[s.trick ? "trick" : "spell"]} onChange={(v) => v[0] && set({ trick: v[0] === "trick" })} />
      </Cell>
      {s.trick ? null : (
        <>
          <Cell label="Rank">
            <Stepper value={s.rank} min={1} max={5} width="2em" ariaLabel="rank" onChange={(v) => set({ rank: v ?? 1 })} />
          </Cell>
          <Cell label="Prerequisite" help="The school, or an earlier spell of it.">
            <input className={fieldCls} list="db-prereq" value={s.prereq} maxLength={120} placeholder={s.school === "General" ? "Any school of magic" : s.school} onChange={(e) => set({ prereq: e.target.value })} />
            <datalist id="db-prereq">{prereqOpts.map((x) => <option key={x} value={x} />)}</datalist>
          </Cell>
          <Cell label="Requirements" className="sm:col-span-2">
            <ChipPicker options={DB_SPELL_REQS} value={s.reqs} onChange={(v) => set({ reqs: v })} />
            {s.reqs.some((x) => x === "focus" || x === "ingredient" || x === "tools") ? (
              <input className={`${fieldCls} mt-2`} value={s.reqDetail} maxLength={120} placeholder="Focus / ingredient / tools: holy symbol, pebbles…" onChange={(e) => set({ reqDetail: e.target.value })} />
            ) : null}
          </Cell>
          <Cell label="Casting time" className="sm:col-span-2">
            <ChipPicker single options={DB_CASTING} value={[s.casting]} onChange={(v) => v[0] && set({ casting: v[0] })} />
          </Cell>
          {ench ? (
            <Cell label="Enchantment" className="sm:col-span-2" help="Bound to an item (range Item). Enchanting spells appear in the Enchantment badge on weapons, armor and gear.">
              <Toggle checked={s.enchantment} onChange={(v) => set({ enchantment: v })}>Bound to an item</Toggle>
              {s.enchantment ? <div className="mt-2"><ChipPicker options={DB_CAST_ON} value={s.castOn} custom onChange={(v) => set({ castOn: v })} /></div> : null}
            </Cell>
          ) : null}
          {ench && s.enchantment ? null : (
            <Cell label="Range">
              <span className="flex flex-wrap items-center gap-2">
                {needsM ? <Stepper value={s.range.m} min={1} max={1000} width="3.2em" ariaLabel="range meters" onChange={(v) => set({ range: { ...s.range, m: v ?? 10 } })} /> : null}
                <Select value={s.range.kind} options={[...DB_RANGE_KINDS.map(([k, l]) => [k, l] as [string, string]), ["text", "custom…"]]} ariaLabel="range kind" onChange={(v) => set({ range: { ...s.range, kind: v } })} />
                {s.range.kind === "text" ? <input className={`${fieldCls} max-w-[200px]`} value={s.range.text} maxLength={60} onChange={(e) => set({ range: { ...s.range, text: e.target.value } })} /> : null}
              </span>
            </Cell>
          )}
          <Cell label="Duration">
            <Select value={s.duration} options={DB_DURATIONS} ariaLabel="duration" onChange={(v) => set({ duration: v })} />
          </Cell>
          <Cell label="Power levels" className="sm:col-span-2" help="With power levels the caster spends 2 WP per level (1–3).">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Toggle checked={s.powerLevels} onChange={(v) => set({ powerLevels: v })}>Uses power levels</Toggle>
              <Toggle checked={s.dodge} onChange={(v) => set({ dodge: v })}>Can be dodged</Toggle>
              <Toggle checked={s.parry} onChange={(v) => set({ parry: v })}>Can be parried</Toggle>
              <Toggle checked={s.ignoresArmor} onChange={(v) => set({ ignoresArmor: v })}>Armor doesn&apos;t help</Toggle>
            </div>
          </Cell>
          <Cell label="Damage" className="sm:col-span-2">
            <span className="flex flex-wrap items-center gap-2">
              <DiceRow label="damage" base={s.dmg} per={s.dmgPer} text={s.dmgText} power={s.powerLevels} onChange={(p) => set({ dmg: p.base ?? s.dmg, dmgPer: p.per ?? s.dmgPer, dmgText: p.text ?? s.dmgText })} />
              {s.dmg.n > 0 || s.dmgText ? <Select value={s.dmgType} options={[["", "— type"], ...DB_DMG_TYPES.map((x) => [x, x] as [string, string])]} ariaLabel="damage type" onChange={(v) => set({ dmgType: v })} /> : null}
            </span>
          </Cell>
          <Cell label="Healing" className="sm:col-span-2">
            <DiceRow label="healing" base={s.heal} per={s.healPer} text={s.healText} power={s.powerLevels} onChange={(p) => set({ heal: p.base ?? s.heal, healPer: p.per ?? s.healPer, healText: p.text ?? s.healText })} />
          </Cell>
          <Cell label="Target restriction" className="sm:col-span-2">
            <input className={fieldCls} value={s.target} maxLength={120} placeholder="e.g. Demons and undead only (optional)" onChange={(e) => set({ target: e.target.value })} />
          </Cell>
        </>
      )}
      <Cell label="Effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[90px]`} maxLength={3000} value={s.text} placeholder="What the spell does…" onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function SpellPreview({ name, s }: { name: string; s: SpellDraft }) {
  if (s.trick) return (
    <Preview title={name || "Unnamed trick"} subtitle={`${s.school === "General" ? "General" : s.school} magic trick · 1 WP`}>
      <p className="whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{s.text || "—"}</p>
    </Preview>
  );
  const ench = s.school === "Enchanting" && s.enchantment;
  const dmg = s.dmgText || (s.powerLevels ? perLevel(fmtDb(s.dmg), fmtDb(s.dmgPer)).join(" / ") : fmtDb(s.dmg));
  const heal = s.healText || (s.powerLevels ? perLevel(fmtDb(s.heal), fmtDb(s.healPer)).join(" / ") : fmtDb(s.heal));
  const rows: [string, string][] = [
    ["Rank", String(s.rank)], ["Prerequisite", s.prereq || (s.school === "General" ? "Any school of magic" : s.school)],
    ["Requirement", [s.reqs.join(", "), s.reqDetail ? `(${s.reqDetail})` : ""].filter(Boolean).join(" ") || "—"],
    ["Casting time", DB_CASTING.find(([k]) => k === s.casting)?.[1] ?? s.casting], ["Range", ench ? "Item" : fmtRange(s.range)], ["Duration", s.duration],
    ["WP", s.powerLevels ? "2 / 4 / 6 (power level 1–3)" : "2"],
  ];
  if (dmg) rows.push(["Damage", `${dmg}${s.dmgType ? ` ${s.dmgType}` : ""}${s.powerLevels && !s.dmgText ? " (by power level)" : ""}`]);
  if (heal) rows.push(["Healing", heal]);
  if (ench) rows.push(["Cast on", s.castOn.join(", ") || "—"]);
  const flags = [s.dodge ? "can be dodged" : "", s.parry ? "can be parried" : "", s.ignoresArmor ? "armor doesn't help" : "", s.target].filter(Boolean);
  return (
    <Preview title={name || "Unnamed spell"} subtitle={`${s.school === "General" ? "General magic" : s.school}${ench ? " · enchantment" : ""}`}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[12.5px]">
        {rows.map(([k, v]) => <Fragment key={k}><dt className="font-semibold">{k}</dt><dd>{v}</dd></Fragment>)}
      </dl>
      {flags.length ? <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">{flags.join(" · ")}</p> : null}
      <p className="mt-2 whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{s.text || "—"}</p>
    </Preview>
  );
}
