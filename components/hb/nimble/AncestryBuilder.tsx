"use client";
// ── Nimble homebrew ancestry builder ─────────────────────────────────────────
// Storage (type "nimble-ancestry", the NIMBLE_ANCESTRIES book shape the sheet,
// the hero builder and the ancestries page read):
//   composed: group, size ("Small or Medium"), description, traits [{name, text}]
//     — each trait's grants are written first in the book's phrasing ("+2 max
//     Hit Dice, +1 max Wounds, –1 Speed.") and languages last ("You know Elvish
//     if your INT is not negative.")
//   builder data: traitRows [{name, text, grants}], and `grants` (all rows,
//     flattened) — the sheet applies these directly to skills, Initiative,
//     Armor, Speed, max Wounds and max Hit Dice (instead of reading the text).
// Legacy traits open through parseAncTrait: pure grant sentences become
// badges, the rest stays as text.
import BonusBadges, { BadgeStrip, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import { NIM_LANGUAGES, NIM_SIZES, NIM_SKILLS, cleanGrants, composeAncTraitText, parseAncTrait, type NimAncTrait } from "./rules";
import { Cell, RowCtl, addBtn, fieldCls } from "./ui";

type Data = Record<string, unknown>;
export type AncestryDraft = { group: string; sizes: string[]; description: string; traits: NimAncTrait[] };

export const GRANT_KINDS: BadgeKind[] = [
  { k: "skill", label: "Skill", color: "teal", amount: true, target: "choice", choices: [...NIM_SKILLS], fmt: "{n} {t}", tip: "+N to one skill (skill cap 12)" },
  { k: "allSkills", label: "All skills", color: "teal", amount: true, fmt: "{n} all skills", tip: "+N to every skill" },
  { k: "init", label: "Initiative", color: "gold", amount: true, fmt: "{n} Initiative" },
  { k: "initAdv", label: "Adv. on Initiative", color: "gold", fmt: "Advantage on Initiative", tip: "Roll Initiative with advantage" },
  { k: "armor", label: "Armor", color: "blue", amount: true, fmt: "{n} Armor" },
  { k: "speed", label: "Speed", color: "gold", amount: true, fmt: "{n} Speed", tip: "Spaces (base 6)" },
  { k: "wounds", label: "Max Wounds", color: "red", amount: true, fmt: "{n} max Wounds", tip: "Base 6" },
  { k: "hitDice", label: "Max Hit Dice", color: "green", amount: true, fmt: "{n} max Hit Dice" },
  { k: "language", label: "Language", color: "purple", target: "choice", choices: [...NIM_LANGUAGES], fmt: "Knows {t}", tip: "Known if INT is not negative" },
];

export function blankAncestry(): AncestryDraft {
  return { group: "Exotic", sizes: ["Medium"], description: "", traits: [{ name: "", text: "", grants: [] }] };
}
export function ancestryFromData(d: Data): AncestryDraft {
  const sizes = String(d.size ?? "").split(/\s+or\s+/).map((x) => x.trim()).filter(Boolean);
  const rows = Array.isArray(d.traitRows)
    ? (d.traitRows as Data[]).map((r) => ({ name: String(r.name ?? ""), text: String(r.text ?? ""), grants: cleanGrants(r.grants) }))
    : (Array.isArray(d.traits) ? (d.traits as Data[]) : []).map((t) => parseAncTrait({ name: String(t?.name ?? ""), text: String(t?.text ?? "") }));
  return { group: d.group === "Common" ? "Common" : "Exotic", sizes: sizes.length ? sizes : ["Medium"], description: String(d.description ?? ""), traits: rows };
}
export function ancestryPayload(name: string, a: AncestryDraft): Data {
  const known = a.sizes.every((x) => (NIM_SIZES as readonly string[]).includes(x));
  return {
    name, group: a.group, size: known ? a.sizes : a.sizes.join(" or "), description: a.description,
    traitRows: a.traits, traits: a.traits.map((t) => ({ name: t.name, text: composeAncTraitText(t) })),
  };
}

export default function AncestryBuilder({ value: a, onChange }: { value: AncestryDraft; onChange: (v: AncestryDraft) => void }) {
  const set = (p: Partial<AncestryDraft>) => onChange({ ...a, ...p });
  const setT = (i: number, p: Partial<NimAncTrait>) => set({ traits: a.traits.map((t, j) => (j === i ? { ...t, ...p } : t)) });
  return (
    <>
      <Cell label="Group"><ChipPicker single options={["Common", "Exotic"]} value={[a.group]} onChange={(v) => v[0] && set({ group: v[0] })} /></Cell>
      <Cell label="Size" help="Pick two for “Small or Medium”.">
        <ChipPicker options={NIM_SIZES} value={a.sizes} onChange={(v) => v.length && set({ sizes: [...NIM_SIZES.filter((x) => v.includes(x)), ...v.filter((x) => !(NIM_SIZES as readonly string[]).includes(x))] })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[72px]`} value={a.description} maxLength={2000} placeholder="Who they are, where they're found…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Traits</label>
        <div className="flex flex-col gap-2">
          {a.traits.map((t, i) => (
            <div key={i} className="rounded border border-[var(--border)] p-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input className={`${fieldCls} sm:w-44 sm:self-start`} value={t.name} maxLength={120} placeholder="Trait name" onChange={(e) => setT(i, { name: e.target.value })} />
                <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={t.text} maxLength={1000} placeholder="What it does beyond the badges (1/encounter tricks, rerolls…)" onChange={(e) => setT(i, { text: e.target.value })} />
                <RowCtl rows={a.traits} i={i} onChange={(r) => set({ traits: r })} />
              </div>
              <div className="mt-2">
                <BonusBadges value={t.grants} kinds={GRANT_KINDS} empty="No sheet bonuses" addLabel="+ Grant" onChange={(v) => setT(i, { grants: v })} />
              </div>
            </div>
          ))}
        </div>
        {a.traits.length < 20 ? <button type="button" className={addBtn} onClick={() => set({ traits: [...a.traits, { name: "", text: "", grants: [] }] })}>+ Add trait</button> : null}
        <p className="mt-1 text-[11px] text-[var(--muted)]">Grants apply on the character sheet when a hero picks this ancestry (skills, Initiative, Armor, Speed, max Wounds / Hit Dice).</p>
      </div>
    </>
  );
}

export function AncestryPreview({ name, a }: { name: string; a: AncestryDraft }) {
  return (
    <Preview title={name || "Unnamed ancestry"} subtitle={`${a.group} · ${a.sizes.join(" or ")}`}>
      {a.description ? <p className="text-[12px] italic text-[var(--muted)]">{a.description}</p> : null}
      {a.traits.filter((t) => t.name || t.text || t.grants.length).map((t, i) => (
        <div key={i} className="mt-2">
          <p className="text-[13px] leading-relaxed"><b>{t.name || "Trait"}.</b> {composeAncTraitText(t)}</p>
          {t.grants.length ? <div className="mt-1"><BadgeStrip value={t.grants} kinds={GRANT_KINDS} /></div> : null}
        </div>
      ))}
    </Preview>
  );
}
