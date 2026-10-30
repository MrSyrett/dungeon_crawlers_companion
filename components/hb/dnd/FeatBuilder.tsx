"use client";
// ── D&D 2024 homebrew feat builder ───────────────────────────────────────────
// Category, a structured prerequisite (level, ability minimum, armor/weapon
// proficiency, spellcasting, another feat — composed into the exact wording the
// sheet's featEligibility() parses so it greys the feat out when unmet), the
// ability scores its +1 may raise (the sheet asks the player to pick one), and
// benefit rows ("Name: text" — how the sheet's feat detail splits them).
// Storage (type "dnd-feat", DndFeat): category prerequisite abilityScores
// benefits[] repeatable — unchanged; old records parse back (a prerequisite the
// parser can't rebuild word-for-word opens in the "Other" text, unchanged).
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { ABILS, ABIL_NAME, FEAT_CATEGORIES, PREREQ_PROFS, composeBenefit, composePrereq, parseBenefit, parsePrereq, type Prereq } from "./rules";
import { Cell, NameRows, Select, Toggle, fieldCls, type Row } from "./ui";
import type { DndNames } from "./data";

type Data = Record<string, unknown>;
export type FeatDraft = { category: string; prereq: Prereq; abils: string[]; benefits: Row[]; repeatable: boolean };

export const blankFeat = (): FeatDraft => ({ category: "General", prereq: { ...parsePrereq(""), level: 4 }, abils: [], benefits: [{ name: "", text: "" }], repeatable: false });
export function featFromData(d: Data): FeatDraft {
  return {
    category: String(d.category ?? "General"),
    prereq: parsePrereq(String(d.prerequisite ?? "")),
    abils: Array.isArray(d.abilityScores) ? (d.abilityScores as string[]) : [],
    benefits: (Array.isArray(d.benefits) ? (d.benefits as string[]) : []).map((b) => { const x = parseBenefit(b); return { name: x.name, text: x.text }; }),
    repeatable: !!d.repeatable,
  };
}
export const featPayload = (name: string, f: FeatDraft): Data => ({
  name, category: f.category, prerequisite: composePrereq(f.prereq), abilityScores: ABILS.filter((a) => f.abils.includes(a)),
  benefits: f.benefits.map((b) => composeBenefit(b)).filter(Boolean), repeatable: f.repeatable,
});

export default function FeatBuilder({ value: f, onChange, names }: { value: FeatDraft; onChange: (f: FeatDraft) => void; names: DndNames }) {
  const set = (p: Partial<FeatDraft>) => onChange({ ...f, ...p });
  const pr = f.prereq;
  const setP = (p: Partial<Prereq>) => set({ prereq: { ...pr, ...p } });
  return (
    <>
      <Cell label="Category" className="sm:col-span-2">
        <ChipPicker single options={FEAT_CATEGORIES} value={[f.category]} onChange={(v) => v[0] && set({ category: v[0], prereq: { ...pr, level: v[0] === "Epic Boon" ? 19 : v[0] === "General" ? Math.max(pr.level, 4) : v[0] === "Origin" ? 0 : pr.level } })} />
      </Cell>
      <div className="sm:col-span-2">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
          <Cell label="Min. level" help="0 = none"><Stepper value={pr.level} min={0} max={20} ariaLabel="minimum level" onChange={(v) => setP({ level: v ?? 0 })} /></Cell>
          <Cell label="Ability minimum (any of)">
            <div className="flex flex-wrap items-center gap-2">
              <ChipPicker options={ABILS.map((a) => [a, a] as [string, string])} value={pr.abils} onChange={(v) => setP({ abils: v })} />
              {pr.abils.length ? <Stepper value={pr.abilMin} min={1} max={30} ariaLabel="ability minimum" onChange={(v) => setP({ abilMin: v ?? 13 })} /> : null}
            </div>
          </Cell>
          <Cell label="Proficiency"><Select value={pr.prof} options={[["", "— none —"], ...PREREQ_PROFS.map((p) => [p, p] as [string, string])]} onChange={(v) => setP({ prof: v })} /></Cell>
          <Cell label="Spellcasting">
            <Select value={pr.caster} options={[["", "— none —"], ["spellcasting", "Spellcasting feature"], ["spellOrPact", "Spellcasting or Pact Magic"]]} onChange={(v) => setP({ caster: v as Prereq["caster"] })} />
          </Cell>
          <Cell label="Requires feat">
            <input className={`${fieldCls} w-44`} list="dnd-hb-feats" value={pr.feat} maxLength={80} placeholder="Magic Initiate" onChange={(e) => setP({ feat: e.target.value })} />
            <datalist id="dnd-hb-feats">{names.feats.map((x) => <option key={x.name} value={x.name}>{x.meta}</option>)}</datalist>
          </Cell>
          <Cell label="Other (text)" className="min-w-[180px] flex-1"><input className={fieldCls} value={pr.other} maxLength={200} placeholder="Eberron campaign" onChange={(e) => setP({ other: e.target.value })} /></Cell>
        </div>
        <p className="mt-1 text-[11px] text-[var(--muted)]">Prerequisite: <b className="text-[var(--text)]">{composePrereq(pr) || "none"}</b> — the sheet greys the feat out until it’s met.</p>
      </div>
      <Cell label="Ability Score Increase (+1 to one of)" className="sm:col-span-2" help="Leave empty for no increase. With two or more, the player picks one on the sheet.">
        <ChipPicker options={ABILS.map((a) => [a, ABIL_NAME[a]] as [string, string])} value={f.abils} onChange={(v) => set({ abils: v })} />
      </Cell>
      <Cell label="Benefits" className="sm:col-span-2">
        <NameRows rows={f.benefits} onChange={(v) => set({ benefits: v })} namePh="Benefit name (optional)" textPh="What the benefit does…" addLabel="+ Add benefit" />
      </Cell>
      <Cell label="Repeatable"><Toggle checked={f.repeatable} onChange={(v) => set({ repeatable: v })}>Can be taken more than once</Toggle></Cell>
    </>
  );
}

export function FeatPreview({ name, f }: { name: string; f: FeatDraft }) {
  const pre = composePrereq(f.prereq);
  return (
    <Preview title={name || "Unnamed feat"} subtitle={`${f.category} Feat${pre ? ` (Prerequisite: ${pre})` : ""}`}>
      {f.abils.length ? <p className="text-[13px]"><b><i>Ability Score Increase.</i></b> Increase your {ABILS.filter((a) => f.abils.includes(a)).map((a) => ABIL_NAME[a]).join(f.abils.length > 2 ? ", " : " or ")} score by 1, to a maximum of 20.</p> : null}
      {f.benefits.filter((b) => b.name || b.text).map((b, i) => <p key={i} className="mt-1 text-[13px] leading-relaxed">{b.name ? <b><i>{b.name}. </i></b> : null}{b.text}</p>)}
      {f.repeatable ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">Repeatable.</p> : null}
    </Preview>
  );
}
