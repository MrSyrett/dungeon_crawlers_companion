"use client";
// ── Dragonbane kin builder ───────────────────────────────────────────────────
// Storage = DbKin (lib/data/db-types) via normalizeDbKin → cleanDbKin (rules.ts):
//   movement (base, before the AGL modifier), text, abilities [{id, name, wp
//   (number | "varies" | null), wpNote?, timing, text}] (1–3; mallards have two),
//   names (the D6 name table, ≤6), traits (book kin traits + custom; "Large"
//   also sets size), flying "wp" (karkion-style flight, 1 WP per round),
//   category (Rare Kin / Nightkin), pcNotes.
// db-homebrew.js pushes these into window.DB_KIN, so the creation wizard offers
// the kin (movement, innate abilities, names) and the sheet finds its abilities
// (abilityDef reads DB_KIN) — WP button, timing tag — exactly like a book kin.
// The WP / timing pickers mirror the heroic-ability builder's.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { DB_KIN_CATEGORIES, DB_KIN_TIMINGS, DB_KIN_TRAITS } from "./rules";
import { Cell, NamePicker, RowCtl, Toggle, addBtn, fieldCls, useDbData } from "./ui";

type Data = Record<string, unknown>;
export type KinAbilityDraft = { name: string; wpMode: "none" | "fixed" | "varies"; wp: number; wpNote: string; timing: string; text: string };
export type KinDraft = {
  movement: number; text: string; abilities: KinAbilityDraft[]; names: string[]; traits: string[];
  flying: boolean; category: string; pcNotes: string;
};
const blankKinAbility = (): KinAbilityDraft => ({ name: "", wpMode: "fixed", wp: 3, wpNote: "", timing: "free", text: "" });
export const blankKin = (): KinDraft => ({ movement: 10, text: "", abilities: [blankKinAbility()], names: [], traits: [], flying: false, category: "", pcNotes: "" });
const strs = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map(String).filter(Boolean) : []);

export function kinFromData(d: Data): KinDraft {
  const ab = (Array.isArray(d.abilities) ? (d.abilities as Data[]) : []).map((a): KinAbilityDraft => {
    const wp = a.wp;
    return {
      name: String(a.name ?? ""), wpMode: wp == null || wp === "" ? "none" : wp === "varies" ? "varies" : "fixed", wp: Number(wp) || 3,
      wpNote: String(a.wpNote ?? ""), timing: String(a.timing ?? "free"), text: String(a.text ?? ""),
    };
  });
  return {
    movement: Number(d.movement) || 10, text: String(d.text ?? ""), abilities: ab.length ? ab : [blankKinAbility()],
    names: strs(d.names).slice(0, 6), traits: strs(d.traits), flying: d.flying === "wp" || d.flying === true,
    category: String(d.category ?? ""), pcNotes: String(d.pcNotes ?? ""),
  };
}
export function kinPayload(name: string, k: KinDraft): Data {
  return {
    name, movement: k.movement, text: k.text,
    abilities: k.abilities.filter((a) => a.name.trim()).map((a) => ({
      name: a.name.trim(), wp: a.wpMode === "none" ? "" : a.wpMode === "varies" ? "varies" : a.wp,
      wpNote: a.wpMode === "varies" ? a.wpNote : "", timing: a.timing, text: a.text,
    })),
    names: k.names, traits: k.traits, flying: k.flying ? "wp" : "", category: k.category, pcNotes: k.pcNotes,
  };
}
export const kinProblems = (k: KinDraft): string[] => (k.abilities.some((a) => a.name.trim()) ? [] : ["Name the kin's innate ability."]);

export const wpLabel = (a: { wpMode: string; wp: number; wpNote?: string }) => (a.wpMode === "none" ? "No WP" : a.wpMode === "varies" ? (a.wpNote?.trim() || "WP varies") : `${a.wp} WP`);
const timingLabel = (t: string) => DB_KIN_TIMINGS.find(([k]) => k === t)?.[1] ?? t;

function KinAbilityRow({ a, onChange }: { a: KinAbilityDraft; onChange: (a: KinAbilityDraft) => void }) {
  const set = (p: Partial<KinAbilityDraft>) => onChange({ ...a, ...p });
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldCls} value={a.name} maxLength={80} placeholder="Ability name (e.g. Hard to Catch)" aria-label="ability name" onChange={(e) => set({ name: e.target.value })} />
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">WP</span>
        <ChipPicker single options={[["none", "None"], ["fixed", "Fixed"], ["varies", "Varies"]]} value={[a.wpMode]} onChange={(v) => v[0] && set({ wpMode: v[0] as KinAbilityDraft["wpMode"] })} />
        {a.wpMode === "fixed" ? <Stepper value={a.wp} min={1} max={10} width="2.2em" ariaLabel="WP cost" onChange={(v) => set({ wp: v ?? 1 })} /> : null}
        {a.wpMode === "varies" ? <input className={`${fieldCls} max-w-[260px]`} value={a.wpNote} maxLength={120} placeholder="e.g. 1–3 WP, chosen when used" aria-label="WP note" onChange={(e) => set({ wpNote: e.target.value })} /> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Timing</span>
        <ChipPicker single options={DB_KIN_TIMINGS} value={[a.timing]} onChange={(v) => v[0] && set({ timing: v[0] })} />
      </div>
      <textarea className={`${fieldCls} min-h-[70px]`} maxLength={2000} value={a.text} placeholder="What the ability does and when it can be activated…" aria-label="ability effect" onChange={(e) => set({ text: e.target.value })} />
    </div>
  );
}

export default function KinBuilder({ value: k, onChange }: { value: KinDraft; onChange: (v: KinDraft) => void }) {
  const set = (p: Partial<KinDraft>) => onChange({ ...k, ...p });
  const D = useDbData();
  const traitOpts = [...new Set([...DB_KIN_TRAITS, ...Object.keys(D?.npcTraits ?? {}).filter((t) => !/^(Skeleton|Non-Monster)$/.test(t))])];
  return (
    <>
      <Cell label="Base movement" help="Metres per round before the AGL modifier. Book kin: 8 (halfling, dwarf, mallard), 10, or 12 (wolfkin).">
        <Stepper value={k.movement} min={4} max={16} width="2.4em" ariaLabel="movement" onChange={(v) => set({ movement: v ?? 10 })} />
      </Cell>
      <Cell label="Group" help="Only affects where the kin is listed.">
        <ChipPicker single options={[["", "Common kin"], ...DB_KIN_CATEGORIES.map((c) => [c, c] as [string, string])]} value={[k.category]} onChange={(v) => set({ category: v[0] ?? "" })} />
      </Cell>
      <Cell label={`Innate abilit${k.abilities.length > 1 ? "ies" : "y"}`} className="sm:col-span-2" help="Every kin has one (mallards have two). It sits in the Abilities box on the sheet with its WP button.">
        <div className={styles.atkList}>
          {k.abilities.map((a, i) => (
            <div key={i} className={styles.atkRow}>
              <div className="mb-1 flex items-center"><span className={styles.atkLbl}>Ability {i + 1}</span><RowCtl rows={k.abilities} i={i} remove={k.abilities.length > 1} onChange={(r) => set({ abilities: r })} /></div>
              <KinAbilityRow a={a} onChange={(x) => set({ abilities: k.abilities.map((y, j) => (j === i ? x : y)) })} />
            </div>
          ))}
        </div>
        {k.abilities.length < 3 ? <button type="button" className={addBtn} onClick={() => set({ abilities: [...k.abilities, blankKinAbility()] })}>+ Innate ability</button> : null}
      </Cell>
      <Cell label="Traits" className="sm:col-span-2" help="Kin traits from the Bestiary (Nocturnal: bane and damage in sunlight; Large: 4×4 m). Custom traits are allowed.">
        <ChipPicker options={traitOpts} value={k.traits} custom customPh="Custom trait…" onChange={(v) => set({ traits: v.slice(0, 6) })} />
        <div className="mt-2"><Toggle checked={k.flying} onChange={(v) => set({ flying: v })}>Can fly (1 WP per round, normal Movement — like karkions)</Toggle></div>
      </Cell>
      <Cell label="Names (D6)" className="sm:col-span-2" help="Up to six typical names — the wizard rolls a D6 on this list.">
        <NamePicker value={k.names} onChange={(v) => set({ names: v })} options={[]} placeholder="Add a name…" max={6} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} maxLength={3000} value={k.text} placeholder="Who they are, where they live, how others see them…" onChange={(e) => set({ text: e.target.value })} />
      </Cell>
      <Cell label="As a player character" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[56px]`} maxLength={2000} value={k.pcNotes} placeholder="Optional notes for players (restrictions, how traits apply)…" onChange={(e) => set({ pcNotes: e.target.value })} />
      </Cell>
    </>
  );
}

export function KinPreview({ name, k }: { name: string; k: KinDraft }) {
  const ab = k.abilities.filter((a) => a.name.trim());
  return (
    <Preview title={name || "Unnamed kin"} subtitle={`${k.category || "Kin"} · Movement ${k.movement}${k.flying ? " · flies" : ""}`}>
      {k.text ? <p className="mb-2 whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{k.text}</p> : null}
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Innate abilit{ab.length > 1 ? "ies" : "y"}</div>
      {ab.length ? ab.map((a, i) => (
        <div key={i} className="mt-1 rounded border border-[var(--border)] bg-[var(--panel-2)] p-2">
          <div className="flex flex-wrap items-baseline justify-between gap-1 text-[12.5px]"><b>{a.name}</b><span className="text-[11px] text-[var(--muted)]">{wpLabel(a)} · {timingLabel(a.timing)}</span></div>
          {a.text ? <p className="mt-0.5 whitespace-pre-wrap text-[12px] text-[var(--muted)]">{a.text}</p> : null}
        </div>
      )) : <p className="text-[12px] italic text-[var(--muted)]">None yet</p>}
      {k.traits.length ? <p className="mt-2 text-[12px]"><b>Traits:</b> {k.traits.join(", ")}</p> : null}
      {k.names.length ? (
        <ol className="mt-2 grid grid-cols-2 gap-x-3 text-[12px] text-[var(--muted)]">
          {k.names.map((n, i) => <li key={n}><span className="mr-1.5 font-mono text-[10.5px] text-[var(--hb-accent)]">{i + 1}</span>{n}</li>)}
        </ol>
      ) : null}
    </Preview>
  );
}
