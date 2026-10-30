"use client";
// ── D6 System 2e homebrew skill + gear (weapon / armor / gear) builders ───────
// Storage = the book shapes in lib/data/d62e-types.ts (D62eSkill, D62eEquipment)
// that /d62e/skills, /d62e/equipment, the sheet's skill list / Equipment store
// (public/tools-data/d62e-homebrew.js → D62E_HB_SKILLS / D62E_HB_GEAR) and the
// creation wizard's gear step read.
//   skill: attribute (core + optional attributes), genre, time (preset or as
//     written), specializations (chips), description.
//   gear: category, genre, era, cost, description, plus — composed from `build`
//     (components/hb/d62e/rules.ts):
//       weapon damage "Brawn+2D" / "5D" (the sheet rolls attribute + code),
//       weapon range "melee (reach 2), two-handed" / "S10/M40/L80 m" /
//       "S Brawn x2 / M Brawn x3 / L Brawn x4" / "thrown", weapon skill;
//       armor protection "+2D" or "+2D physical / +1D energy" (the sheet's armor
//       box). Legacy text that doesn't re-compose stays editable as written.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  D62E_ALL_ATTRS, D62E_ERAS, D62E_GENRE_OPTS, D62E_SKILL_TIMES, blankGearBuild, composeGear, composeProt, gearBuildFrom,
  type D62eBand, type D62eGearBuild, type D62eRange,
} from "./rules";
import { AsWritten, Cell, CodeInput, Select, Toggle, fieldCls, miniLbl, skillNames, useD62eData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const genreOf = (d: Data, dflt = "core") => (["core", "fantasy", "scifi", "superhero"].includes(sv(d, "genre")) ? sv(d, "genre") : dflt);
const Line = ({ k, v }: { k: string; v: string }) => (v ? <div><b>{k}</b> {v}</div> : null);

// ═══ SKILLS ══════════════════════════════════════════════════════════════════
export type SkillDraft = { attribute: string; genre: string; time: string; specializations: string[]; description: string };
export const blankSkill = (): SkillDraft => ({ attribute: "Agility", genre: "core", time: "an action", specializations: [], description: "" });
export const skillFromData = (d: Data): SkillDraft => ({
  attribute: sv(d, "attribute") || "Agility", genre: genreOf(d), time: sv(d, "time"),
  specializations: Array.isArray(d.specializations) ? (d.specializations as unknown[]).map(String).filter(Boolean) : [], description: sv(d, "description"),
});
export const skillPayload = (name: string, k: SkillDraft): Data => ({ name, ...k, specializations: k.specializations.filter(Boolean) });

export function SkillBuilder({ value: k, onChange }: { value: SkillDraft; onChange: (v: SkillDraft) => void }) {
  const set = (p: Partial<SkillDraft>) => onChange({ ...k, ...p });
  return (
    <>
      <Cell label="Attribute" help="The attribute the skill falls under; its dice add to that attribute's code.">
        <Select value={k.attribute} options={D62E_ALL_ATTRS} ariaLabel="attribute" onChange={(v) => set({ attribute: v })} />
      </Cell>
      <Cell label="Genre"><Select value={k.genre} options={D62E_GENRE_OPTS} ariaLabel="genre" onChange={(v) => set({ genre: v })} /></Cell>
      <Cell label="Time to use" className="sm:col-span-2" help="Pick one, or type how long a use takes.">
        <ChipPicker single custom customPh="as written…" options={[...D62E_SKILL_TIMES]} value={k.time ? [k.time] : []} onChange={(v) => set({ time: v[0] ?? "" })} />
      </Cell>
      <Cell label="Sample specializations" className="sm:col-span-2" help="A specialization adds +1D to that narrow use of the skill (Skill Specialization module).">
        <ChipPicker custom customPh="+ specialization" options={[]} value={k.specializations} onChange={(v) => set({ specializations: v.slice(0, 20) })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={k.description} maxLength={3000} onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}
export function SkillPreview({ name, k }: { name: string; k: SkillDraft }) {
  return (
    <Preview title={name || "Unnamed skill"} subtitle={`${k.attribute} skill${k.genre !== "core" ? ` · ${D62E_GENRE_OPTS.find(([v]) => v === k.genre)?.[1]}` : ""}`}>
      <div className="flex flex-col gap-1 text-[12px]">
        <Line k="Time" v={k.time} />
        {k.specializations.length ? <Line k="Specializations" v={k.specializations.join(", ")} /> : null}
        {k.description ? <p className="mt-1 text-[var(--muted)]">{k.description}</p> : null}
        <p className="mt-1 text-[11px] text-[var(--muted)]">Rolled as {k.attribute} + the skill&apos;s added dice; untrained, roll {k.attribute} alone.</p>
      </div>
    </Preview>
  );
}

// ═══ GEAR ════════════════════════════════════════════════════════════════════
export type GearDraft = {
  category: string; genre: string; era: string; skill: string; cost: string; description: string; b: D62eGearBuild;
  /** Legacy mechanics on a category that doesn't use them (kept as written). */
  keep: Record<string, string>;
};
export const blankGear = (): GearDraft => ({ category: "weapon", genre: "core", era: "Medieval", skill: "Melee", cost: "", description: "", b: blankGearBuild(), keep: {} });
export function gearFromData(d: Data): GearDraft {
  const category = ["weapon", "armor", "gear"].includes(sv(d, "category")) ? sv(d, "category") : "gear";
  const keep: Record<string, string> = {};
  for (const k of ["damage", "range", "protection"]) {
    const used = category === "weapon" ? k !== "protection" : category === "armor" ? k === "protection" : false;
    if (!used && sv(d, k)) keep[k] = sv(d, k);
  }
  return { category, genre: genreOf(d), era: sv(d, "era"), skill: sv(d, "skill"), cost: sv(d, "cost"), description: sv(d, "description"), b: gearBuildFrom(d), keep };
}
export function gearPayload(name: string, g: GearDraft): Data {
  const out: Data = { name, category: g.category, genre: g.genre, description: g.description, ...g.keep, ...composeGear(g.category, g.b), build: g.b };
  if (g.era) out.era = g.era;
  if (g.cost) out.cost = g.cost;
  if (g.skill && g.category === "weapon") out.skill = g.skill;
  else if (g.skill && g.keep.damage) out.skill = g.skill;
  return out;
}

const DMG_ATTRS: [string, string][] = [["", "— (flat code)"], ...D62E_ALL_ATTRS.map((a) => [a, a] as [string, string])];

function BandInput({ value: b, onChange, label }: { value: D62eBand; onChange: (v: D62eBand) => void; label: string }) {
  return (
    <label className={miniLbl}>{label}
      <span className="flex items-center gap-1">
        <span className="text-[12px] normal-case tracking-normal text-[var(--text)]">Brawn</span>
        <Select value={b.op} options={[["+", "+"], ["x", "×"]]} ariaLabel={`${label} operator`} onChange={(v) => onChange({ ...b, op: v === "x" ? "x" : "+" })} />
        <Stepper value={b.n} min={b.op === "x" ? 1 : 0} max={50} width="2.2em" ariaLabel={label} onChange={(n) => onChange({ ...b, n: n ?? 0 })} />
      </span>
    </label>
  );
}

function RangeInput({ value: r, onChange }: { value: D62eRange; onChange: (v: D62eRange) => void }) {
  const set = (p: Partial<D62eRange>) => onChange({ ...r, ...p });
  if (r.mode === "text") return <AsWritten value={r.text} onChange={(t) => set({ text: t })} onPickers={() => set({ mode: "melee", text: "" })} />;
  return (
    <span className="flex flex-col gap-2">
      <ChipPicker single options={[["melee", "Melee"], ["bands", "Ranged (meters)"], ["brawn", "Thrown (Brawn)"], ["thrown", "Thrown"], ["stationary", "Stationary"], ["none", "Not listed"]]} value={[r.mode]} onChange={(v) => v[0] && set({ mode: v[0] as D62eRange["mode"] })} />
      {r.mode === "melee" ? (
        <span className="flex flex-wrap items-end gap-4">
          <label className={miniLbl}>Reach<Stepper value={r.reach} min={0} max={10} width="2.2em" ariaLabel="reach" onChange={(n) => set({ reach: n ?? 0 })} /></label>
          <Toggle checked={r.twoHanded} onChange={(v) => set({ twoHanded: v })}>Two-handed</Toggle>
          <Toggle checked={r.canThrow} onChange={(v) => set({ canThrow: v })}>Can be thrown</Toggle>
        </span>
      ) : null}
      {r.mode === "bands" ? (
        <span className="flex flex-wrap items-end gap-3">
          {([["s", "Short"], ["m", "Medium"], ["l", "Long"]] as const).map(([k, l]) => (
            <label key={k} className={miniLbl}>{l}
              <Stepper value={r[k]} min={0} max={500000} step={r.l > 500 ? 10 : 1} width="4em" ariaLabel={l} onChange={(n) => {
                const x = { ...r, [k]: n ?? 0 }; x.m = Math.max(x.m, x.s); x.l = Math.max(x.l, x.m); onChange(x);
              }} />
            </label>
          ))}
          <span className="pb-2 text-[12px] text-[var(--muted)]">meters</span>
        </span>
      ) : null}
      {r.mode === "brawn" ? (
        <span className="flex flex-wrap items-end gap-3">
          <BandInput label="Short" value={r.bs} onChange={(b) => set({ bs: b })} />
          <BandInput label="Medium" value={r.bm} onChange={(b) => set({ bm: b })} />
          <BandInput label="Long" value={r.bl} onChange={(b) => set({ bl: b })} />
        </span>
      ) : null}
    </span>
  );
}

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const data = useD62eData();
  const b = g.b;
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const setB = (p: Partial<D62eGearBuild>) => onChange({ ...g, b: { ...b, ...p } });
  const skills = skillNames(data);
  return (
    <>
      <Cell label="Category" className="sm:col-span-2">
        <ChipPicker single options={[["weapon", "Weapon"], ["armor", "Armor"], ["gear", "Gear"]]} value={[g.category]} onChange={(v) => v[0] && set({ category: v[0], skill: v[0] === "weapon" && !g.skill ? "Melee" : g.skill })} />
      </Cell>
      <Cell label="Genre"><Select value={g.genre} options={D62E_GENRE_OPTS} ariaLabel="genre" onChange={(v) => set({ genre: v })} /></Cell>
      <Cell label="Era" help="Equipment by Genre/Era module.">
        <Select value={g.era} options={[["", "—"], ...D62E_ERAS.map((e) => [e, e] as [string, string])]} ariaLabel="era" onChange={(v) => set({ era: v })} />
      </Cell>
      {g.category === "weapon" ? (
        <>
          <Cell label="Skill" help="The skill rolled to hit.">
            <Select value={g.skill} options={[["", "—"], ...(skills.length ? skills : ["Melee", "Shooting", "Throwing"]).map((x) => [x, x] as [string, string])]} ariaLabel="skill" onChange={(v) => set({ skill: v })} />
          </Cell>
          <Cell label="Damage" help={b.dmg.attr ? `Rolled as the wielder's ${b.dmg.attr} plus this.` : "A fixed damage code."}>
            {b.dmg.text ? (
              <AsWritten value={b.dmg.text} max={60} onChange={(t) => setB({ dmg: { ...b.dmg, text: t } })} onPickers={() => setB({ dmg: { attr: "Brawn", pips: 3, text: "" } })} />
            ) : (
              <span className="flex flex-wrap items-center gap-2">
                <Select value={b.dmg.attr} options={DMG_ATTRS} ariaLabel="damage attribute" onChange={(v) => setB({ dmg: { ...b.dmg, attr: v } })} />
                <CodeInput value={b.dmg.pips} plus={!!b.dmg.attr} min={0} max={90} ariaLabel="damage" onChange={(n) => setB({ dmg: { ...b.dmg, pips: n ?? 0 } })} />
              </span>
            )}
          </Cell>
          <Cell label="Range" className="sm:col-span-2" help="Ranged: Short / Medium / Long band edges in meters (S10/M40/L80 m). Thrown weapons can scale with Brawn.">
            <RangeInput value={b.range} onChange={(r) => setB({ range: r })} />
          </Cell>
        </>
      ) : null}
      {g.category === "armor" ? (
        <Cell label="Protection" className="sm:col-span-2" help="Added to Brawn when resisting damage. Give energy protection only when it differs from physical.">
          {b.prot.text ? (
            <AsWritten value={b.prot.text} onChange={(t) => setB({ prot: { ...b.prot, text: t } })} onPickers={() => setB({ prot: { phys: 6, energy: null, text: "" } })} />
          ) : (
            <span className="flex flex-wrap items-end gap-4">
              <label className={miniLbl}>Physical<CodeInput value={b.prot.phys} plus min={0} max={60} ariaLabel="physical protection" onChange={(n) => setB({ prot: { ...b.prot, phys: n ?? 0 } })} /></label>
              <label className={miniLbl}>Energy<CodeInput value={b.prot.energy} plus nullable dflt={3} min={0} max={60} ariaLabel="energy protection" onChange={(n) => setB({ prot: { ...b.prot, energy: n } })} /></label>
            </span>
          )}
        </Cell>
      ) : null}
      <Cell label="Cost" help="Price as your setting writes it (currency varies by genre).">
        <input className={fieldCls} value={g.cost} maxLength={40} placeholder="25 gp, 300 credits…" onChange={(e) => set({ cost: e.target.value })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={g.description} maxLength={3000} onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const b = g.b, c = composeGear(g.category, b);
  const label = g.category === "weapon" ? "Weapon" : g.category === "armor" ? "Armor" : "Gear";
  return (
    <Preview title={name || `Unnamed ${label.toLowerCase()}`} subtitle={[label, g.era, g.genre !== "core" ? D62E_GENRE_OPTS.find(([v]) => v === g.genre)?.[1] : ""].filter(Boolean).join(" · ")}>
      <div className="flex flex-col gap-1 text-[12px]">
        {g.category === "weapon" ? (
          <>
            <Line k="Skill" v={g.skill} />
            <Line k="Damage" v={c.damage ?? "—"} />
            <Line k="Range" v={c.range ?? ""} />
            {b.range.mode === "bands" ? <p className="text-[11px] text-[var(--muted)]">Short {b.range.s} m · Medium {b.range.m} m · Long {b.range.l} m</p> : null}
          </>
        ) : null}
        {g.category === "armor" ? <Line k="Protection" v={b.prot.text || (b.prot.phys || b.prot.energy != null ? `${composeProt(b.prot)} to Brawn vs damage` : "—")} /> : null}
        <Line k="Cost" v={g.cost} />
        {g.description ? <p className="mt-1 text-[var(--muted)]">{g.description}</p> : null}
      </div>
    </Preview>
  );
}
