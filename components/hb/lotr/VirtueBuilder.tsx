"use client";
// ── The Lord of the Rings 5E homebrew virtue builder ────────────────────────
// Common or Cultural virtue; the "+1 to one of" ability chips every virtue
// carries (the creation / level-up wizards offer them); a per-rest usage the
// sheet tracks as pips ("PB/long", "1/short", "WIS/long"); effect badges for
// what the LotR sheet automates; flavour and benefit paragraphs.
// Storage (type "lotr-virtue", the LotrVirtue shape LOTR_VIRTUES uses):
//   name category asi {choose, amount:1} uses benefits[] flavor source
//   + mods {fellowship, acNoShield, strDamage, hpPerLevel, maxHitDice}
//   + grants {skills[], expertise[], saves[]} + companion ("Pony")
// The sheet reads mods.fellowship (Fellowship rating), acNoShield (AC while no
// shield), strDamage (STR weapon damage), maxHitDice (short-rest Hit Dice at
// maximum); the wizards read hpPerLevel and grants.* when the virtue is taken,
// and companion "Pony" adds the Bree-pony companion. The form sends `effects`
// (the badges); lib/homebrew.ts turns them into mods / grants / companion.
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import {
  ABILS, CULTURES, SKILL_NAMES, USE_COUNTS, composeUses, effectsToFields, fieldsToEffects, parseUses, type VirtueUses,
} from "./rules";
import { Cell, Select, addBtn, fieldCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
export type VirtueDraft = { category: string; abilities: string[]; uses: VirtueUses; effects: Badge[]; benefits: string[]; flavor: string };

export const VIRTUE_KINDS: BadgeKind[] = [
  { k: "fellowship", label: "Fellowship", color: "gold", amount: true, fmt: "{n} Fellowship rating", tip: "Adds to the company's Fellowship rating (Fellowship tab)" },
  { k: "acNoShield", label: "AC (no shield)", color: "blue", amount: true, fmt: "{n} AC without a shield", tip: "+N AC while not using a shield (like Nimbleness)" },
  { k: "strDamage", label: "STR damage", color: "red", amount: true, fmt: "{n} STR weapon damage", tip: "+N damage on Strength-based weapon attacks (like Dour-Handed)" },
  { k: "hpPerLevel", label: "HP per level", color: "green", amount: true, fmt: "{n} HP per level", tip: "+N hit point maximum per level, now and on every level-up (like Hardiness)" },
  { k: "maxHitDice", label: "Max Hit Dice", color: "green", fmt: "Hit Dice heal at maximum", tip: "Short-rest Hit Dice count as their maximum (like Tough as Old Tree-Roots)" },
  { k: "skill", label: "Skill", color: "purple", target: "choice", choices: SKILL_NAMES, fmt: "Skill: {t}", tip: "Proficiency in a skill, applied when the virtue is taken in the wizard" },
  { k: "expertise", label: "Expertise", color: "purple", target: "choice", choices: SKILL_NAMES, fmt: "Expertise: {t}", tip: "Expertise (double proficiency) in a skill, applied when taken" },
  { k: "save", label: "Save", color: "teal", target: "choice", choices: [...ABILS], fmt: "{t} save proficiency", tip: "Saving throw proficiency, applied when taken" },
  { k: "pony", label: "Pony companion", color: "grey", fmt: "Pony companion", tip: "Adds the Bree-pony to the Companions tab" },
];

export const blankVirtue = (): VirtueDraft => ({ category: "Common", abilities: [], uses: { count: "", rest: "long" }, effects: [], benefits: [""], flavor: "" });
export function virtueFromData(d: Data): VirtueDraft {
  const asi = (d.asi ?? {}) as Data;
  const abilities = Array.isArray(d.abilities) ? d.abilities.map(String) : Array.isArray(asi.choose) ? asi.choose.map(String) : [];
  const benefits = Array.isArray(d.benefits) ? d.benefits.map(String) : [];
  return {
    category: String(d.category ?? "Common"), abilities: ABILS.filter((a) => abilities.includes(a)),
    uses: parseUses(String(d.uses ?? "")), effects: Array.isArray(d.effects) ? (d.effects as Badge[]) : fieldsToEffects(d),
    benefits: benefits.length ? benefits : [""], flavor: String(d.flavor ?? ""),
  };
}
export function virtuePayload(name: string, v: VirtueDraft): Data {
  const { mods, grants, companion } = effectsToFields(v.effects);
  return {
    name, category: v.category, abilities: v.abilities, uses: composeUses(v.uses),
    benefits: v.benefits.map((b) => b.trim()).filter(Boolean), flavor: v.flavor.trim(),
    effects: v.effects, mods, grants, companion,
  };
}

export default function VirtueBuilder({ value: v, onChange }: { value: VirtueDraft; onChange: (v: VirtueDraft) => void }) {
  const set = (p: Partial<VirtueDraft>) => onChange({ ...v, ...p });
  const setB = (i: number, t: string) => set({ benefits: v.benefits.map((b, j) => (j === i ? t : b)) });
  return (
    <>
      <Cell label="Category"><Select className="w-full" value={v.category} options={[["Common", "Common virtue"], ...CULTURES.map((c) => [c, `Cultural — ${c}`] as [string, string])]} onChange={(c) => set({ category: c })} /></Cell>
      <Cell label="Uses" help="Tracked as pips on the sheet; blank = always on.">
        <span className="flex flex-wrap items-center gap-2">
          <Select value={v.uses.count} ariaLabel="uses" options={[["", "— always —"], ...USE_COUNTS.map((c) => [c, c === "PB" ? "Proficiency Bonus" : /^\d$/.test(c) ? `${c}×` : `${c} modifier`] as [string, string])]} onChange={(c) => set({ uses: { ...v.uses, count: c } })} />
          {v.uses.count ? (
            <>
              <span className="text-[12px] text-[var(--muted)]">per</span>
              <Select value={v.uses.rest} ariaLabel="rest" options={[["short", "short rest"], ["long", "long rest"]]} onChange={(r) => set({ uses: { ...v.uses, rest: r as VirtueUses["rest"] } })} />
            </>
          ) : null}
        </span>
      </Cell>
      <Cell label="+1 to one of" className="sm:col-span-2" help="Every virtue raises one listed ability score by 1 (the hero picks when taking it).">
        <ChipPicker options={[...ABILS]} value={v.abilities} onChange={(a) => set({ abilities: ABILS.filter((x) => a.includes(x)) })} />
      </Cell>
      <Cell label="Automated effects" className="sm:col-span-2" help="What the LotR sheet and its creation / level-up wizards apply for this virtue. Anything else goes in the benefits text.">
        <BonusBadges value={v.effects} kinds={VIRTUE_KINDS} onChange={(e) => set({ effects: e })} empty="No automated effects" />
      </Cell>
      <Cell label="Flavour" className="sm:col-span-2">
        <textarea className={fieldCls} rows={2} value={v.flavor} maxLength={1000} placeholder="Hardship overcome has renewed your faith…" onChange={(e) => set({ flavor: e.target.value })} />
      </Cell>
      <Cell label="Benefits" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          {v.benefits.map((b, i) => (
            <div key={i} className="flex gap-2">
              <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={b} maxLength={2000} placeholder="What the virtue lets the hero do…" onChange={(e) => setB(i, e.target.value)} />
              <button type="button" className={`${smallBtn} self-start`} title="Remove" onClick={() => set({ benefits: v.benefits.filter((_, j) => j !== i) })}>✕</button>
            </div>
          ))}
        </div>
        {v.benefits.length < 12 ? <button type="button" className={addBtn} onClick={() => set({ benefits: [...v.benefits, ""] })}>+ Benefit</button> : null}
      </Cell>
    </>
  );
}

export function VirtuePreview({ name, v }: { name: string; v: VirtueDraft }) {
  const uses = composeUses(v.uses);
  return (
    <Preview title={name || "Unnamed virtue"} subtitle={`${v.category === "Common" ? "Common virtue" : `${v.category} cultural virtue`}${uses ? ` · ${uses}` : ""}`}>
      {v.flavor.trim() ? <p className="mb-1 text-[12px] italic text-[var(--muted)]">{v.flavor.trim()}</p> : null}
      {v.abilities.length ? <p className="text-[13px]"><b>Ability increase:</b> +1 {v.abilities.join(", ")}</p> : null}
      {v.benefits.filter((b) => b.trim()).map((b, i) => <p key={i} className="mt-1 text-[13px] leading-relaxed">{b.trim()}</p>)}
      {v.effects.length ? <div className="mt-2"><BadgeStrip value={v.effects} kinds={VIRTUE_KINDS} /></div> : null}
    </Preview>
  );
}
