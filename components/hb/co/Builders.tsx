"use client";
// ── Candela Obscura homebrew Ability + Gear builders ─────────────────────────
// Ability storage = { source, owner, desc } (what /candela/abilities, the sheet
// picker and the creation wizard read) + the new optional structured fields
// uses {n, per}, cost (badges), actions, effects (badges) and text; the server
// composes desc from them (rules.ts composeDesc). Gear storage = { type, desc }
// + owner, uses, actions, effects, text, composed the same way. A legacy record
// (no `text`) opens with its desc as the text, so it re-saves unchanged.
import type { ReactNode } from "react";
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  ACTION_DRIVE, CIRCLE_RESOURCES, CO_ACTIONS, CO_DRIVES, CO_MARKS, CO_ROLES, GEAR_TYPES, ROLE_NAMES, SPECIALTY_NAMES,
  cleanActions, cleanCosts, cleanEffects, cleanUses, composeDesc, costLabel, effectLabel, roleOfSpecialty, usesLabel,
  type CoParts, type Uses,
} from "./rules";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const cap = (t: string) => (t ? t[0].toUpperCase() + t.slice(1) : t);

export const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
export const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
export const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const hint = "mt-1 text-[11px] text-[var(--muted)]";

function Cell({ label, children, className = "", help }: { label: ReactNode; children: ReactNode; className?: string; help?: ReactNode }) {
  return (
    <div className={className}>
      <label className={lbl}>{label}</label>
      {children}
      {help ? <p className={hint}>{help}</p> : null}
    </div>
  );
}

// ── Badge menus ──────────────────────────────────────────────────────────────
const anyOpt = (xs: readonly string[], anyLabel: string): [string, string][] => xs.map((x) => [x, x === "any" ? anyLabel : x]);
const DRIVES_ANY = anyOpt([...CO_DRIVES, "any"], "Any drive");
const ACTIONS_ANY = anyOpt([...CO_ACTIONS, "any"], "The roll (any action)");
const MARKS: [string, string][] = CO_MARKS.map((m) => [m, m]);
const fmtCost = (b: Badge) => cap(costLabel(b));
const fmtEff = (b: Badge) => cap(effectLabel(b));
const COSTS: BadgeKind[] = [
  { k: "drive", label: "Spend drive", color: "gold", amount: true, amountPh: "1", target: "choice", choices: DRIVES_ANY, format: fmtCost, tip: "Spend drive points to use it. The sheet's Use button takes them from that drive." },
  { k: "resist", label: "Burn resistance", color: "purple", amount: true, amountPh: "1", target: "choice", choices: DRIVES_ANY, format: fmtCost, tip: "Burn resistance in a drive (In the Trenches, Mind Palace). The sheet burns it." },
  { k: "mark", label: "Take a mark", color: "red", amount: true, amountPh: "1", target: "choice", choices: MARKS, format: fmtCost, tip: "Take Body / Brain / Bleed marks as the price (Ritual, Occult Researcher). The sheet ticks them." },
  { k: "scar", label: "Take a scar", color: "red", target: "choice", choices: anyOpt([...CO_MARKS, "any"], "Any"), format: fmtCost, tip: "Take a scar (Not Again, Forbidden Ritual)." },
  { k: "circle", label: "Circle resource", color: "teal", amount: true, amountPh: "1", target: "choice", choices: CIRCLE_RESOURCES, format: fmtCost, tip: "Spend from the circle's Stitch / Refresh / Train (Lifesaver)." },
];
const EFFECTS: BadgeKind[] = [
  { k: "dice", label: "+d to rolls", color: "green", amount: true, amountPh: "1", target: "choice", choices: ACTIONS_ANY, format: fmtEff, tip: "Add dice to an action's rolls (Narrow Escape: +1d Move)." },
  { k: "gild", label: "Gild a die", color: "gold", target: "choice", choices: ACTIONS_ANY, format: fmtEff, tip: "Gild an extra die (Inspection, Born in the Shadows)." },
  { k: "worth", label: "Drive worth +2d", color: "gold", target: "choice", choices: DRIVES_ANY, format: fmtEff, tip: "The first point of that drive you spend is worth +2d (Misdirection, Lie Detector)." },
  { k: "resDice", label: "+ resistance dice", color: "green", target: "choice", choices: CO_DRIVES.map((d) => [d, d] as [string, string]), format: fmtEff, tip: "Add dice equal to your resistance in a drive (Interrogation, Basic Training)." },
  { k: "swapAct", label: "Use another action", color: "blue", target: "choice", choices: CO_ACTIONS.map((a) => [a, a] as [string, string]), format: fmtEff, tip: "Roll this action instead of the usual one (Anatomical Strike: Focus for Strike)." },
  { k: "swapDrive", label: "Spend another drive", color: "blue", target: "choice", choices: DRIVES_ANY, format: fmtEff, tip: "Spend this drive in place of the action's own (Cool Under Pressure, Street Smarts)." },
  { k: "soak", label: "Soak marks", color: "teal", amount: true, amountPh: "1", target: "choice", choices: MARKS, format: fmtEff, tip: "Soak incoming marks (Circle of Protection, In the Trenches)." },
  { k: "protect", label: "Protects from marks", color: "teal", target: "choice", choices: MARKS, format: fmtEff, tip: "No marks of that kind from it (Bleed Containment Vial, Dissection)." },
  { k: "clear", label: "Clear marks", color: "teal", amount: true, amountPh: "1", target: "choice", choices: MARKS, format: fmtEff, tip: "Heal marks (Patch Up)." },
  { k: "refresh", label: "Refresh drive", color: "green", amount: true, amountPh: "1", target: "choice", choices: DRIVES_ANY, format: fmtEff, tip: "Refresh drive points (Adrenaline Rush, Learn from My Mistakes)." },
  { k: "tier", label: "Up one tier", color: "purple", format: fmtEff, tip: "Push a miss or mixed result up one tier (Flourish)." },
  { k: "ask", label: "Ask the GM", color: "blue", target: "text", optTarget: true, targetPh: "what is out of place? (optional)", format: fmtEff, tip: "Ask the GM a question they answer honestly (Scout, Tactician, Well-Researched)." },
  { k: "auto", label: "Automatically…", color: "purple", target: "text", targetPh: "escape ropes, cuffs or manacles", format: fmtEff, tip: "An automatic success (Escape Artist, Insider Access)." },
  { k: "illum", label: "+ Illumination", color: "gold", amount: true, amountPh: "1", format: fmtEff, tip: "Add points to the circle's Illumination track (Meticulous Notes)." },
  { k: "note", label: "Other", color: "grey", target: "text", targetPh: "they reciprocate", format: fmtEff, tip: "Any other effect, written as a clause." },
];
const GEAR_EFFECTS = ["dice", "gild", "soak", "protect", "clear", "refresh", "ask", "auto", "note"];

// ── Shared structured parts ──────────────────────────────────────────────────
type Parts = { uses: Uses | null; cost: Badge[]; actions: string[]; effects: Badge[]; text: string };
const partsFrom = (d: Data): Parts => ({
  uses: cleanUses(d.uses), cost: cleanCosts(d.cost), actions: cleanActions(d.actions), effects: cleanEffects(d.effects),
  text: d.text == null ? sv(d, "desc") : sv(d, "text"), // legacy: desc is the text
});
const coParts = (p: Parts): CoParts => ({ uses: p.uses, cost: cleanCosts(p.cost), actions: p.actions, effects: cleanEffects(p.effects), text: p.text.trim() });
const partsPayload = (p: Parts, withCost: boolean): Data => {
  const c = coParts(p);
  const out: Data = { actions: c.actions, effects: c.effects, text: c.text };
  if (withCost) out.cost = c.cost;
  if (c.uses) out.uses = c.uses;
  return out;
};

function UsesCell({ value, onChange, help }: { value: Uses | null; onChange: (u: Uses | null) => void; help: string }) {
  const per = value?.per ?? "";
  return (
    <Cell label="Uses" help={help}>
      <div className="flex flex-wrap items-center gap-2">
        <select className={selCls} aria-label="uses per" value={per} onChange={(e) => onChange(e.target.value ? { n: value?.n ?? 1, per: e.target.value as Uses["per"] } : null)}>
          <option value="">No limit</option>
          <option value="assignment">Per assignment</option>
          <option value="session">Per session</option>
          <option value="between">Between assignments</option>
        </select>
        {value && value.per !== "between" ? <><Stepper value={value.n} min={1} max={5} ariaLabel="uses" onChange={(n) => onChange({ ...value, n: n ?? 1 })} /><span className="text-[12px] text-[var(--muted)]">{value.n === 1 ? "use" : "uses"}</span></> : null}
      </div>
    </Cell>
  );
}

function ActionsCell({ value, onChange, help }: { value: string[]; onChange: (v: string[]) => void; help: string }) {
  return (
    <Cell label="Actions" className="sm:col-span-2" help={help}>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {CO_DRIVES.map((d) => (
          <div key={d} className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{d}</span>
            <ChipPicker options={CO_ACTIONS.filter((a) => ACTION_DRIVE[a] === d)} value={value.filter((a) => ACTION_DRIVE[a] === d)}
              onChange={(v) => onChange(cleanActions([...value.filter((a) => ACTION_DRIVE[a] !== d), ...v]))} />
          </div>
        ))}
      </div>
    </Cell>
  );
}

function PartsCells({ p, set, gear }: { p: Parts; set: (x: Partial<Parts>) => void; gear?: boolean }) {
  return (
    <>
      <UsesCell value={p.uses} onChange={(uses) => set({ uses })} help={gear ? "How often it can be used (written into the description)." : "How often it can be used. The sheet tracks the uses on the ability's row."} />
      {gear ? <span className="hidden sm:block" /> : (
        <Cell label="Cost" help="What using it costs. The sheet's Use button pays drive, resistance and marks.">
          <BonusBadges value={p.cost} onChange={(cost) => set({ cost })} kinds={COSTS} addLabel="+ Cost" empty="Free" max={4} />
        </Cell>
      )}
      <ActionsCell value={p.actions} onChange={(actions) => set({ actions })}
        help={gear ? "Actions this gear helps with." : "Actions it rolls or modifies. Each one gets a roll button on the sheet's ability row."} />
      <Cell label="Effects" className="sm:col-span-2" help="Composed into the description in the book's wording.">
        <BonusBadges value={p.effects} onChange={(effects) => set({ effects })} kinds={EFFECTS} only={gear ? GEAR_EFFECTS : undefined} addLabel="+ Effect" empty="No effects" max={8} />
      </Cell>
      <Cell label={gear ? "Description" : "Rules text"} className="sm:col-span-2" help="Anything the pickers don't cover: the trigger, conditions, flavour. Added after the composed part.">
        <textarea className={`${fieldCls} min-h-[70px]`} value={p.text} maxLength={1500}
          placeholder={gear ? "A brass lantern whose flame gutters near the bleed." : "When you distract a target from what is really happening."}
          onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

function PartsPreview({ p, empty, gear }: { p: Parts; empty: string; gear?: boolean }) {
  const c = coParts(p);
  const desc = composeDesc(c, gear);
  return (
    <>
      <p className="text-[13px]">{desc || <span className="text-[var(--muted)]">{empty}</span>}</p>
      {c.cost.length || c.uses ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {c.uses ? <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{usesLabel(c.uses)}</span> : null}
          <BadgeStrip value={c.cost} kinds={COSTS} />
        </div>
      ) : null}
      {c.effects.length ? <div className="mt-1.5"><BadgeStrip value={c.effects} kinds={EFFECTS} /></div> : null}
      {c.actions.length ? (
        <p className={hint}>{gear ? "Helps with" : "Rolls"}: {c.actions.map((a) => `${a} (${ACTION_DRIVE[a]})`).join(", ")}</p>
      ) : null}
    </>
  );
}

/** A select over the roles or specialties, plus "Other…" for a homebrew one. */
function OwnerSelect({ source, value, onChange }: { source: "Role" | "Specialty"; value: string; onChange: (v: string) => void }) {
  const known = source === "Role" ? ROLE_NAMES : SPECIALTY_NAMES;
  const other = !!value && !known.includes(value);
  return (
    <span className="flex flex-wrap items-center gap-2">
      <select className={selCls} aria-label={source} value={other ? "__other" : value} onChange={(e) => onChange(e.target.value === "__other" ? " " : e.target.value)}>
        <option value="">— Any —</option>
        {source === "Role"
          ? ROLE_NAMES.map((r) => <option key={r} value={r}>{r}</option>)
          : CO_ROLES.map((r) => <optgroup key={r.role} label={r.role}>{r.specialties.map((sp) => <option key={sp} value={sp}>{sp}</option>)}</optgroup>)}
        <option value="__other">Other…</option>
      </select>
      {other ? <input className={`${fieldCls} max-w-[180px]`} value={value.trim()} maxLength={60} placeholder={`Homebrew ${source.toLowerCase()}`} aria-label={`${source} custom`} onChange={(e) => onChange(e.target.value || " ")} /> : null}
    </span>
  );
}

// ═══ ABILITY ═════════════════════════════════════════════════════════════════
export type AbilityDraft = Parts & { source: "Role" | "Specialty"; owner: string };
export const blankAbility = (): AbilityDraft => ({ source: "Role", owner: "", uses: null, cost: [], actions: [], effects: [], text: "" });
export const abilityFromData = (d: Data): AbilityDraft => ({ source: sv(d, "source") === "Specialty" ? "Specialty" : "Role", owner: sv(d, "owner"), ...partsFrom(d) });
export const abilityPayload = (name: string, a: AbilityDraft): Data => ({ name, source: a.source, owner: a.owner.trim(), ...partsPayload(a, true) });

export function AbilityBuilder({ value: a, onChange }: { value: AbilityDraft; onChange: (v: AbilityDraft) => void }) {
  const set = (p: Partial<AbilityDraft>) => onChange({ ...a, ...p });
  const role = a.source === "Specialty" ? roleOfSpecialty(a.owner.trim()) : "";
  return (
    <>
      <Cell label="Granted by" help="Role abilities are open to both of the role's specialties.">
        <ChipPicker single options={["Role", "Specialty"]} value={[a.source]} onChange={(v) => set({ source: v[0] === "Specialty" ? "Specialty" : "Role", owner: "" })} />
      </Cell>
      <Cell label={a.source} help={role ? `A ${role} specialty. The creation wizard offers it to ${a.owner.trim()}s.` : a.owner.trim() && a.source === "Role" ? `The creation wizard offers it to every ${a.owner.trim()}.` : "Pick who can take it."}>
        <OwnerSelect source={a.source} value={a.owner} onChange={(owner) => set({ owner })} />
      </Cell>
      <PartsCells p={a} set={set} />
    </>
  );
}

export function AbilityPreview({ name, a }: { name: string; a: AbilityDraft }) {
  const owner = a.owner.trim();
  return (
    <Preview title={name || "Unnamed Ability"} subtitle={`${owner || "Any"} · ${a.source} ability`}>
      <PartsPreview p={a} empty="Add a cost, effects or rules text." />
    </Preview>
  );
}

// ═══ GEAR ════════════════════════════════════════════════════════════════════
export type GearDraft = Parts & { type: string; owner: string };
export const blankGear = (): GearDraft => ({ type: "Specialty", owner: "", uses: null, cost: [], actions: [], effects: [], text: "" });
export const gearFromData = (d: Data): GearDraft => ({ type: sv(d, "type") || "Specialty", owner: sv(d, "owner"), ...partsFrom(d) });
export const gearPayload = (name: string, g: GearDraft): Data => {
  const out: Data = { name, type: g.type.trim() || "Specialty", ...partsPayload(g, false) };
  if (g.type === "Specialty" && g.owner.trim()) out.owner = g.owner.trim();
  return out;
};

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  return (
    <>
      <Cell label="Type" help="Standard gear is open to anyone; Specialty gear belongs to a specialty's kit.">
        <ChipPicker single custom customPh="Other type…" options={[...GEAR_TYPES]} value={g.type ? [g.type] : []} onChange={(v) => set({ type: v[0] ?? "" })} />
      </Cell>
      {g.type === "Specialty" ? (
        <Cell label="Specialty">
          <OwnerSelect source="Specialty" value={g.owner} onChange={(owner) => set({ owner })} />
        </Cell>
      ) : <span className="hidden sm:block" />}
      <PartsCells p={g} set={set} gear />
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const owner = g.type === "Specialty" ? g.owner.trim() : "";
  return (
    <Preview title={name || "Unnamed Gear"} subtitle={`${g.type || "Gear"}${owner ? ` · ${owner}` : ""}`}>
      <PartsPreview p={g} gear empty="Add effects or a description." />
      <p className={hint}>An investigator carries up to three pieces of gear.</p>
    </Preview>
  );
}
