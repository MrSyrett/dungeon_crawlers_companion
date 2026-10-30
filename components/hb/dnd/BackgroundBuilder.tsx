"use client";
// ── D&D 2024 homebrew background builder ─────────────────────────────────────
// The three ability scores it can raise, its Origin feat (picked from the feat
// list, homebrew included), skill and tool proficiencies (picked — the sheet's
// creation wizard grants them and turns "Choose one kind of…" tools into a
// pick), and the two starting-equipment options (A: items + gold, B: gold).
// Storage (type "dnd-background", DndBackground): abilityScores feat
// skillProficiencies toolProficiencies equipment[] description — unchanged.
// Equipment that isn't in the "A / or N GP" shape opens as plain option rows.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { ABILS, ABIL_NAME, ARTISAN_TOOLS, OTHER_TOOLS, SKILLS } from "./rules";
import { Cell, NamePicker, Select, addBtn, fieldCls, smallBtn } from "./ui";
import type { DndNames } from "./data";

type Data = Record<string, unknown>;
export type BackgroundDraft = {
  abils: string[]; feat: string; skills: string[]; tools: string[];
  items: string[]; gold: number; goldB: number; raw: string[] | null; description: string;
};

// "Book (prayers), Parchment (10 sheets), 8 GP" → items + gold (commas inside () kept).
function splitItems(s: string): { items: string[]; gold: number } {
  const parts: string[] = []; let depth = 0, cur = "";
  for (const ch of s) { if (ch === "(") depth++; if (ch === ")") depth--; if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; } else cur += ch; }
  if (cur.trim()) parts.push(cur.trim());
  let gold = 0;
  if (parts.length && /^\d+ GP$/.test(parts[parts.length - 1])) gold = parseInt(parts.pop()!, 10);
  return { items: parts, gold };
}
const MAGIC_INITIATE = ["Magic Initiate (Cleric)", "Magic Initiate (Druid)", "Magic Initiate (Wizard)"];

export const blankBackground = (): BackgroundDraft => ({ abils: [], feat: "", skills: [], tools: [], items: [], gold: 0, goldB: 50, raw: null, description: "" });
export function backgroundFromData(d: Data): BackgroundDraft {
  const eq = Array.isArray(d.equipment) ? (d.equipment as string[]).filter(Boolean) : [];
  const b: BackgroundDraft = {
    ...blankBackground(),
    abils: Array.isArray(d.abilityScores) ? (d.abilityScores as string[]) : [],
    feat: String(d.feat ?? ""), description: String(d.description ?? ""),
    skills: Array.isArray(d.skillProficiencies) ? (d.skillProficiencies as string[]).filter(Boolean) : [],
    tools: Array.isArray(d.toolProficiencies) ? (d.toolProficiencies as string[]).filter(Boolean) : [],
  };
  const orB = eq[1]?.match(/^or (\d+) GP$/);
  if (eq.length === 0) return b;
  if (eq.length <= 2 && (eq.length === 1 || orB)) { const a = splitItems(eq[0]); return { ...b, items: a.items, gold: a.gold, goldB: orB ? parseInt(orB[1], 10) : 0 }; }
  return { ...b, raw: eq };
}
export function backgroundPayload(name: string, b: BackgroundDraft): Data {
  const a = [...b.items, b.gold ? `${b.gold} GP` : ""].filter(Boolean).join(", ");
  const equipment = b.raw ? b.raw.filter((x) => x.trim()) : [a, a && b.goldB ? `or ${b.goldB} GP` : ""].filter(Boolean);
  return { name, abilityScores: ABILS.filter((x) => b.abils.includes(x)), feat: b.feat, skillProficiencies: b.skills, toolProficiencies: b.tools, equipment, description: b.description };
}

export default function BackgroundBuilder({ value: b, onChange, names }: { value: BackgroundDraft; onChange: (b: BackgroundDraft) => void; names: DndNames }) {
  const set = (p: Partial<BackgroundDraft>) => onChange({ ...b, ...p });
  const feats = Array.from(new Set([...names.originFeats.filter((f) => !/^Magic Initiate$/i.test(f)), ...MAGIC_INITIATE])).sort();
  return (
    <>
      <Cell label={`Ability scores (choose 3 · ${b.abils.length}/3)`} className="sm:col-span-2" help="The player puts +2/+1 or +1/+1/+1 among these on the sheet.">
        <ChipPicker options={ABILS.map((a) => [a, ABIL_NAME[a]] as [string, string])} value={b.abils} onChange={(v) => set({ abils: v.slice(0, 3) })} />
      </Cell>
      <Cell label="Origin feat">
        <Select className="w-full" value={b.feat} options={[["", "— choose —"], ...feats.map((f) => [f, f] as [string, string])]} onChange={(v) => set({ feat: v })} />
      </Cell>
      <Cell label={`Skill proficiencies (${b.skills.length}/2)`} className="sm:col-span-2">
        <ChipPicker options={SKILLS.map(([s]) => s)} value={b.skills} onChange={(v) => set({ skills: v })} />
      </Cell>
      <Cell label="Tool proficiency" className="sm:col-span-2" help="A “Choose one kind of…” entry lets the player pick on the sheet.">
        <ChipPicker options={[...OTHER_TOOLS, ...ARTISAN_TOOLS]} value={b.tools} onChange={(v) => set({ tools: v })} custom customPh="Other tool…" />
      </Cell>
      <Cell label="Starting equipment" className="sm:col-span-2">
        {b.raw ? (
          <div className="flex flex-col gap-1.5">
            {b.raw.map((row, i) => (
              <div key={i} className="flex gap-1.5">
                <input className={`${fieldCls} min-w-0 flex-1`} value={row} maxLength={300} onChange={(e) => set({ raw: b.raw!.map((x, j) => (j === i ? e.target.value : x)) })} />
                <button type="button" className={smallBtn} onClick={() => set({ raw: b.raw!.filter((_, j) => j !== i) })}>✕</button>
              </div>
            ))}
            <span className="flex gap-2">
              <button type="button" className={addBtn} onClick={() => set({ raw: [...b.raw!, ""] })}>+ Add option</button>
              <button type="button" className={addBtn} onClick={() => set({ raw: null })}>Use the A / B builder</button>
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-[var(--muted)]">
              <b className="text-[var(--text)]">A</b>
              <NamePicker value={b.items} onChange={(v) => set({ items: v })} options={names.gear} placeholder="Add an item… (Rope, Book (prayers))" />
              <span className="flex items-center gap-1">+ <Stepper value={b.gold} min={0} max={500} ariaLabel="option A gold" onChange={(v) => set({ gold: v ?? 0 })} /> GP</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-[var(--muted)]">
              <b className="text-[var(--text)]">B</b> or <Stepper value={b.goldB} min={0} max={500} ariaLabel="option B gold" onChange={(v) => set({ goldB: v ?? 0 })} /> GP <span>(0 = no option B)</span>
            </div>
          </div>
        )}
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={b.description} maxLength={4000} placeholder="What this background represents…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function BackgroundPreview({ name, b }: { name: string; b: BackgroundDraft }) {
  const p = backgroundPayload(name, b);
  const row = (k: string, v: string) => (v ? <p className="text-[13px]"><b>{k}:</b> {v}</p> : null);
  return (
    <Preview title={name || "Unnamed background"} subtitle="Background">
      {row("Ability Scores", ABILS.filter((a) => b.abils.includes(a)).map((a) => ABIL_NAME[a]).join(", "))}
      {row("Feat", b.feat)}
      {row("Skill Proficiencies", b.skills.join(" and "))}
      {row("Tool Proficiency", b.tools.join(", "))}
      {row("Equipment", (p.equipment as string[]).map((x, i) => (b.raw ? x : i === 0 ? `Choose A or B: (A) ${x}` : `(B) ${x.replace(/^or /, "")}`)).join("; "))}
      {b.description ? <p className="mt-2 text-[13px] leading-relaxed">{b.description}</p> : null}
    </Preview>
  );
}
