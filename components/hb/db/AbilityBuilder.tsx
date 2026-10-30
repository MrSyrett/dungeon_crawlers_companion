"use client";
// ── Dragonbane heroic ability builder ────────────────────────────────────────
// Storage = DbHeroicAbility (lib/data/db-types) via normalizeDbAbility:
//   wp (number | "varies" | null), timing, requirement {skills, level} |
//   {any, level} | null (posted as reqSkills / reqAny / reqLevel), repeatable,
//   damage ("D8" extra damage), hpMax / wpMax (+N per copy — the sheet adds
//   them to max HP / WP, as Robust and Focused do), tags, text.
// The mechanical effects are badges (extra damage die, max HP, max WP).
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { DB_ABILITY_TAGS, DB_GENERAL_SKILLS, DB_MAGIC_SKILLS, DB_REQ_ANY, DB_TIMINGS, DB_WEAPON_SKILLS } from "./rules";
import { Cell, Toggle, fieldCls } from "./ui";

type Data = Record<string, unknown>;
const EFFECT_KINDS: BadgeKind[] = [
  { k: "damage", label: "Extra damage", color: "red", target: "choice", choices: ["D4", "D6", "D8", "D10", "D12"], fmt: "+{t} damage", tip: "Extra damage die when the ability is used" },
  { k: "hpMax", label: "Max HP", color: "green", amount: true, fmt: "{n} max HP", tip: "Added to max HP for each copy (like Robust)" },
  { k: "wpMax", label: "Max WP", color: "purple", amount: true, fmt: "{n} max WP", tip: "Added to max WP for each copy (like Focused)" },
];

export type AbilityDraft = {
  wpMode: "none" | "fixed" | "varies"; wp: number; timing: string;
  reqMode: "none" | "skills" | "any"; reqSkills: string[]; reqAny: string; reqLevel: number;
  repeatable: boolean; effects: Badge[]; tags: string[]; text: string;
};
export const blankAbility = (): AbilityDraft => ({ wpMode: "fixed", wp: 3, timing: "action", reqMode: "skills", reqSkills: [], reqAny: "melee", reqLevel: 12, repeatable: false, effects: [], tags: [], text: "" });
export function abilityFromData(d: Data): AbilityDraft {
  const r = (d.requirement ?? null) as Data | null;
  const skills = Array.isArray(r?.skills) ? (r!.skills as string[]) : Array.isArray(d.reqSkills) ? (d.reqSkills as string[]) : [];
  const any = String(r?.any ?? d.reqAny ?? "");
  const wp = d.wp;
  const effects: Badge[] = [];
  if (d.damage) effects.push({ kind: "damage", target: String(d.damage).toUpperCase() });
  if (Number(d.hpMax)) effects.push({ kind: "hpMax", amount: Number(d.hpMax) });
  if (Number(d.wpMax)) effects.push({ kind: "wpMax", amount: Number(d.wpMax) });
  return {
    wpMode: wp == null || wp === "" ? "none" : wp === "varies" ? "varies" : "fixed", wp: Number(wp) || 3,
    timing: String(d.timing ?? "action"),
    reqMode: skills.length ? "skills" : any ? "any" : "none", reqSkills: skills, reqAny: any || "melee",
    reqLevel: Number(r?.level ?? d.reqLevel) || 12, repeatable: !!d.repeatable, effects,
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [], text: String(d.text ?? ""),
  };
}
export function abilityPayload(name: string, a: AbilityDraft): Data {
  const eff = (k: string) => a.effects.find((b) => b.kind === k);
  return {
    name, wp: a.wpMode === "none" ? "" : a.wpMode === "varies" ? "varies" : a.wp, timing: a.timing,
    reqSkills: a.reqMode === "skills" ? a.reqSkills : [], reqAny: a.reqMode === "any" ? a.reqAny : "", reqLevel: a.reqLevel,
    repeatable: a.repeatable, damage: eff("damage")?.target ?? "", hpMax: eff("hpMax")?.amount ?? null, wpMax: eff("wpMax")?.amount ?? null,
    tags: a.tags, text: a.text,
  };
}
export const reqText = (a: AbilityDraft) =>
  a.reqMode === "skills" && a.reqSkills.length ? `${a.reqSkills.join(" or ")} ${a.reqLevel}` : a.reqMode === "any" ? `${DB_REQ_ANY.find(([k]) => k === a.reqAny)?.[1] ?? a.reqAny} at ${a.reqLevel}` : "None";
const wpText = (a: AbilityDraft) => (a.wpMode === "none" ? "—" : a.wpMode === "varies" ? "Varies" : String(a.wp));

export default function AbilityBuilder({ value: a, onChange }: { value: AbilityDraft; onChange: (v: AbilityDraft) => void }) {
  const set = (p: Partial<AbilityDraft>) => onChange({ ...a, ...p });
  return (
    <>
      <Cell label="Willpower Points">
        <span className="flex flex-wrap items-center gap-2">
          <ChipPicker single options={[["none", "None (passive)"], ["fixed", "Fixed"], ["varies", "Varies"]]} value={[a.wpMode]} onChange={(v) => v[0] && set({ wpMode: v[0] as AbilityDraft["wpMode"] })} />
          {a.wpMode === "fixed" ? <Stepper value={a.wp} min={1} max={10} width="2.2em" ariaLabel="WP" onChange={(v) => set({ wp: v ?? 1 })} /> : null}
        </span>
      </Cell>
      <Cell label="Timing">
        <ChipPicker single options={DB_TIMINGS} value={[a.timing]} onChange={(v) => v[0] && set({ timing: v[0] })} />
      </Cell>
      <Cell label="Requirement" className="sm:col-span-2" help="Heroic abilities usually need a skill at level 12. Any one of the picked skills qualifies.">
        <div className="flex flex-col gap-2">
          <span className="flex flex-wrap items-center gap-3">
            <ChipPicker single options={[["none", "None"], ["skills", "Specific skill(s)"], ["any", "Any skill of a group"]]} value={[a.reqMode]} onChange={(v) => v[0] && set({ reqMode: v[0] as AbilityDraft["reqMode"] })} />
            {a.reqMode !== "none" ? (
              <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">at level <Stepper value={a.reqLevel} min={1} max={18} width="2.2em" ariaLabel="required level" onChange={(v) => set({ reqLevel: v ?? 12 })} /></span>
            ) : null}
          </span>
          {a.reqMode === "skills" ? (
            <div className="flex flex-col gap-1">
              {[["Weapon skills", DB_WEAPON_SKILLS], ["General skills", DB_GENERAL_SKILLS], ["Schools of magic", DB_MAGIC_SKILLS]].map(([t, list]) => (
                <div key={t as string}><div className="mb-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{t as string}</div>
                  <ChipPicker options={list as readonly string[]} value={a.reqSkills.filter((x) => (list as readonly string[]).includes(x))}
                    onChange={(v) => set({ reqSkills: [...a.reqSkills.filter((x) => !(list as readonly string[]).includes(x)), ...v] })} /></div>
              ))}
            </div>
          ) : a.reqMode === "any" ? (
            <ChipPicker single options={DB_REQ_ANY} value={[a.reqAny]} onChange={(v) => v[0] && set({ reqAny: v[0] })} />
          ) : null}
        </div>
      </Cell>
      <Cell label="Effects" className="sm:col-span-2" help="Max HP / WP bonuses are added on the character sheet for each copy of the ability.">
        <BonusBadges value={a.effects} kinds={EFFECT_KINDS} empty="No automated effect" onChange={(v) => set({ effects: v })} />
        <div className="mt-2"><Toggle checked={a.repeatable} onChange={(v) => set({ repeatable: v })}>Can be taken more than once</Toggle></div>
      </Cell>
      <Cell label="Tags" className="sm:col-span-2">
        <ChipPicker options={DB_ABILITY_TAGS} value={a.tags} onChange={(v) => set({ tags: v })} />
      </Cell>
      <Cell label="Effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[90px]`} maxLength={3000} value={a.text} placeholder="What the ability does, when to activate it…" onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function AbilityPreview({ name, a }: { name: string; a: AbilityDraft }) {
  return (
    <Preview title={name || "Unnamed ability"} subtitle={`Heroic ability${a.repeatable ? " · repeatable" : ""}`}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[12.5px]">
        <dt className="font-semibold">Requirement</dt><dd>{reqText(a)}</dd>
        <dt className="font-semibold">WP</dt><dd>{wpText(a)}</dd>
        <dt className="font-semibold">Timing</dt><dd>{DB_TIMINGS.find(([k]) => k === a.timing)?.[1] ?? a.timing}</dd>
      </dl>
      <div className="my-2"><BadgeStrip value={a.effects} kinds={EFFECT_KINDS} empty="No automated effect" /></div>
      <p className="whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{a.text || "—"}</p>
    </Preview>
  );
}
