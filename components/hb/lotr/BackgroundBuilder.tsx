"use client";
// ── The Lord of the Rings 5E homebrew background builder ────────────────────
// A culture (or any), two fixed skill proficiencies OR "choose N from" a list,
// one tool proficiency composed in the wording the creation wizard parses
// (a fixed tool, "X or Y", an instrument / gaming set of choice, any tool),
// the two Distinctive Features and a description.
// Storage (type "lotr-background", the LotrBackground shape LOTR_BACKGROUNDS
// uses): culture name skillProficiencies[] skillChoice? {count, from[]}
// toolProficiencies[] distinctiveFeatures[] description source. The LotR
// creation wizard grants the skills / tool / features when it is chosen.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { CULTURES, DISTINCTIVE_FEATURES, SKILL_NAMES, TOOLS, TOOL_KINDS, composeTool, parseTool, type ToolSpec } from "./rules";
import { Cell, Select, fieldCls } from "./ui";

type Data = Record<string, unknown>;
export type BackgroundDraft = {
  culture: string; skillMode: "fixed" | "choose"; skills: string[]; chooseCount: number; chooseFrom: string[];
  tool: ToolSpec; features: string[]; description: string;
};
const strs = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);

export const blankBackground = (): BackgroundDraft => ({
  culture: "Any", skillMode: "fixed", skills: [], chooseCount: 2, chooseFrom: [], tool: { kind: "list", tools: [], custom: "" }, features: [], description: "",
});
export function backgroundFromData(d: Data): BackgroundDraft {
  const sc = (d.skillChoice ?? null) as Data | null;
  const choose = !!sc && Array.isArray(sc.from) && sc.from.length > 0;
  return {
    culture: String(d.culture ?? "Any"), skillMode: choose ? "choose" : "fixed", skills: strs(d.skillProficiencies),
    chooseCount: choose ? Math.max(1, Math.min(4, Number(sc!.count) || 2)) : 2, chooseFrom: choose ? strs(sc!.from) : [],
    tool: parseTool(strs(d.toolProficiencies)[0] ?? ""), features: strs(d.distinctiveFeatures), description: String(d.description ?? ""),
  };
}
export function backgroundPayload(name: string, b: BackgroundDraft): Data {
  const tool = composeTool(b.tool);
  return {
    name, culture: b.culture,
    skillProficiencies: b.skillMode === "fixed" ? b.skills : [],
    skillChoice: b.skillMode === "choose" && b.chooseFrom.length ? { count: Math.min(b.chooseCount, b.chooseFrom.length), from: b.chooseFrom } : null,
    toolProficiencies: tool ? [tool] : [], distinctiveFeatures: b.features, description: b.description.trim(),
  };
}

export default function BackgroundBuilder({ value: b, onChange }: { value: BackgroundDraft; onChange: (b: BackgroundDraft) => void }) {
  const set = (p: Partial<BackgroundDraft>) => onChange({ ...b, ...p });
  const tool = composeTool(b.tool);
  return (
    <>
      <Cell label="Culture" help="Which culture's heroes see it in the creation wizard.">
        <Select className="w-full" value={b.culture} options={[["Any", "Any culture"], ...CULTURES.map((c) => [c, c] as [string, string])]} onChange={(c) => set({ culture: c })} />
      </Cell>
      <Cell label="Skill proficiencies">
        <ChipPicker single options={[["fixed", "Two fixed skills"], ["choose", "Choose from a list"]]} value={[b.skillMode]} onChange={(v) => v[0] && set({ skillMode: v[0] as BackgroundDraft["skillMode"] })} />
      </Cell>
      {b.skillMode === "fixed" ? (
        <Cell label={`Skills (${b.skills.length}/2)`} className="sm:col-span-2">
          <ChipPicker options={SKILL_NAMES} value={b.skills} onChange={(v) => set({ skills: v.slice(-2) })} />
        </Cell>
      ) : (
        <Cell label="The hero chooses" className="sm:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-[12px] text-[var(--muted)]">
            <Stepper value={b.chooseCount} min={1} max={4} width="2em" ariaLabel="skills to choose" onChange={(v) => set({ chooseCount: v ?? 2 })} /> of:
          </div>
          <ChipPicker options={SKILL_NAMES} value={b.chooseFrom} onChange={(v) => set({ chooseFrom: v })} />
        </Cell>
      )}
      <Cell label="Tool proficiency" className="sm:col-span-2" help={tool ? <>Reads: “{tool}”</> : "No tool proficiency."}>
        <div className="flex flex-col gap-2">
          <Select className="self-start" value={b.tool.kind} options={TOOL_KINDS} ariaLabel="tool kind" onChange={(k) => set({ tool: { ...b.tool, kind: k } })} />
          {b.tool.kind === "list" ? <ChipPicker options={TOOLS} value={b.tool.tools} onChange={(v) => set({ tool: { ...b.tool, tools: v.slice(0, 4) } })} /> : null}
          {b.tool.kind === "custom" ? <input className={fieldCls} value={b.tool.custom} maxLength={80} placeholder="Herbalism kit or water vehicles" onChange={(e) => set({ tool: { ...b.tool, custom: e.target.value } })} /> : null}
        </div>
      </Cell>
      <Cell label={`Distinctive features (${b.features.length}/2)`} className="sm:col-span-2">
        <ChipPicker options={DISTINCTIVE_FEATURES} value={b.features} onChange={(v) => set({ features: v.slice(-2) })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={fieldCls} rows={3} value={b.description} maxLength={3000} placeholder="What the hero did before the Company…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function BackgroundPreview({ name, b }: { name: string; b: BackgroundDraft }) {
  const p = backgroundPayload(name, b);
  const sc = p.skillChoice as { count: number; from: string[] } | null;
  return (
    <Preview title={name || "Unnamed background"} subtitle={b.culture === "Any" ? "Any culture" : b.culture}>
      {b.description.trim() ? <p className="mb-1 whitespace-pre-line text-[13px] leading-relaxed">{b.description.trim()}</p> : null}
      <p className="text-[13px]"><b>Skills:</b> {sc ? `choose ${sc.count} of ${sc.from.join(", ")}` : (p.skillProficiencies as string[]).join(", ") || "—"}</p>
      <p className="text-[13px]"><b>Tool:</b> {(p.toolProficiencies as string[])[0] || "—"}</p>
      <p className="text-[13px]"><b>Distinctive features:</b> {b.features.join(", ") || "—"}</p>
    </Preview>
  );
}
