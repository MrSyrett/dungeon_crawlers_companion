"use client";
// ── MMRPG homebrew Headquarters + Starship builder ─────────────────────────
// Team rank (1–6), trait chips (3 per team rank; stackable ones such as
// Security Measures, Shields or Plasma Cannons get a ×N count up to their cap)
// with a "Browse with details" modal showing each trait's downtime activity,
// tag chips (incompatible pairs flagged) each with an optional note, and notes.
// The derived panel shows the trait budget, what the HQ grants its members
// (Laboratory → Lab Access, Medical Bay → First Aid) and, for starships, Size /
// Health / passengers (Cozy −1 size, Roomy +1), Flight Speed (36 with a Star
// Drive) and its ship systems. lib/homebrew.ts normalizeMmrpgHq/Starship is the
// validator and stores the same derived numbers.
import { useState } from "react";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { MMRPG_HQ_TRAITS } from "@/lib/data/mmrpg-hq-traits";
import { MMRPG_HQ_TAGS } from "@/lib/data/mmrpg-hq-tags";
import { MMRPG_STARSHIP_TRAITS } from "@/lib/data/mmrpg-starship-traits";
import { MMRPG_STARSHIP_TAGS } from "@/lib/data/mmrpg-starship-tags";
import { shipStats, type BaseTag, type BaseTrait } from "./rules";
import { Cell, PickerModal, Stat, fieldCls, hint, miniBtn, rowBox, statK } from "./ui";

type Data = Record<string, unknown>;
export type BaseKind = "hq" | "ship";
type TraitDef = { name: string; description: string; downtime: string; grants?: string; stackable?: boolean; maxStack?: number };
type TagDef = { name: string; description: string; incompatibleWith?: string[] };
const traitDefs = (k: BaseKind): TraitDef[] => (k === "ship" ? [...MMRPG_STARSHIP_TRAITS, ...MMRPG_HQ_TRAITS] : [...MMRPG_HQ_TRAITS]) as TraitDef[];
const tagDefs = (k: BaseKind): TagDef[] => (k === "ship" ? [...MMRPG_STARSHIP_TAGS, ...MMRPG_HQ_TAGS] : [...MMRPG_HQ_TAGS]) as TagDef[];
// Caps match the server (HQ stackables default 3, ship stackables 4).
const capOf = (k: BaseKind, d?: TraitDef) => (d?.stackable ? d.maxStack || (k === "ship" ? 4 : 3) : 1);

export type BaseDraft = { rank: number; traits: BaseTrait[]; tags: BaseTag[]; notes: string };
export const blankBase = (): BaseDraft => ({ rank: 3, traits: [], tags: [], notes: "" });
export function baseFromData(d: Data): BaseDraft {
  const rows = (v: unknown) => (Array.isArray(v) ? (v as Data[]) : []);
  return {
    rank: Math.max(1, Math.min(6, Number(d.teamRank) || 3)),
    traits: rows(d.traits).map((t) => ({ name: String(t.name ?? ""), n: Math.max(1, Number(t.n) || 1) })).filter((t) => t.name),
    tags: rows(d.tags).map((t) => ({ name: String(t.name ?? ""), ...(t.note ? { note: String(t.note) } : {}) })).filter((t) => t.name),
    // Starships store their notes as `blurb` (the card's italic line).
    notes: typeof d.notes === "string" ? d.notes : typeof d.blurb === "string" ? d.blurb : "",
  };
}
export const basePayload = (name: string, b: BaseDraft): Data => ({ name, teamRank: b.rank, traits: b.traits, tags: b.tags.map((t) => (t.note?.trim() ? { name: t.name, note: t.note.trim() } : { name: t.name })), notes: b.notes.trim() });

export function baseDerived(kind: BaseKind, b: BaseDraft) {
  const tDefs = traitDefs(kind), gDefs = tagDefs(kind);
  const budget = b.rank * 3, used = b.traits.reduce((s, t) => s + t.n, 0);
  const chosen = new Set(b.tags.map((t) => t.name));
  const warnings: string[] = [];
  for (const t of b.tags) for (const inc of gDefs.find((g) => g.name === t.name)?.incompatibleWith ?? []) if (chosen.has(inc) && t.name < inc) warnings.push(`Incompatible tags: ${t.name} + ${inc}`);
  const has = (n: string) => b.traits.some((t) => t.name === n) || chosen.has(n);
  if (kind === "ship") {
    if (has("FTL Drive") && !has("Star Drive")) warnings.push("FTL Drive needs the Star Drive trait.");
    if (has("Star Drive") && !chosen.has("Mobile")) warnings.push("Star Drive needs the Mobile tag.");
  }
  if (used > budget) warnings.push(`Over trait budget — ${used} of ${budget} (Rank ${b.rank} × 3).`);
  const grants = b.traits.map((t) => tDefs.find((d) => d.name === t.name)?.grants).filter(Boolean) as string[];
  return { budget, used, warnings, grants, ship: kind === "ship" ? shipStats(b.rank, b.traits, b.tags) : null };
}

export function BaseBuilder({ kind, value: b, onChange }: { kind: BaseKind; value: BaseDraft; onChange: (v: BaseDraft) => void }) {
  const set = (x: Partial<BaseDraft>) => onChange({ ...b, ...x });
  const [browse, setBrowse] = useState<"" | "traits" | "tags">("");
  const tDefs = traitDefs(kind), gDefs = tagDefs(kind);
  const der = baseDerived(kind, b);
  const shipNames = new Set<string>(MMRPG_STARSHIP_TRAITS.map((t) => t.name));
  const toggleTraits = (names: string[]) => set({ traits: names.map((n) => b.traits.find((t) => t.name === n) ?? { name: n, n: 1 }) });
  const toggleTags = (names: string[]) => set({ tags: names.map((n) => b.tags.find((t) => t.name === n) ?? { name: n }) });
  const conflicts = new Set<string>();
  for (const t of b.tags) for (const inc of gDefs.find((g) => g.name === t.name)?.incompatibleWith ?? []) conflicts.add(inc);
  const traitRich = tDefs.map((d) => ({ value: d.name, group: kind === "ship" && shipNames.has(d.name) ? "Ship systems" : "Headquarters traits", detail: `${d.description} Downtime: ${d.downtime}${d.stackable ? ` (stacks ×${capOf(kind, d)})` : ""}` }));
  const tagRich = gDefs.map((d) => ({ value: d.name, group: kind === "ship" && MMRPG_STARSHIP_TAGS.some((s) => s.name === d.name) ? "Ship tags" : "Headquarters tags", detail: `${d.description}${d.incompatibleWith?.length ? ` Not with: ${d.incompatibleWith.join(", ")}.` : ""}` }));
  return (
    <>
      <Cell label="Team rank" help={kind === "ship" ? "The average of the crew's ranks (top six), rounded up. Sets the ship's Size, Health and passengers." : "The average of the members' ranks (top six), rounded up."}>
        <Stepper value={b.rank} min={1} max={6} ariaLabel="team rank" onChange={(n) => set({ rank: n ?? 1 })} />
      </Cell>
      <Cell label="Trait budget" help="3 traits per team rank; each copy of a stackable trait counts.">
        <span className={`text-[15px] font-bold ${der.used > der.budget ? "text-[var(--bad)]" : "text-[var(--hb-accent)]"}`}>{der.used} / {der.budget}</span>
      </Cell>
      <Cell label={kind === "ship" ? "Traits (ship systems + HQ traits)" : "Traits"} className="sm:col-span-2">
        <ChipPicker options={tDefs.map((d) => d.name)} value={b.traits.map((t) => t.name)} onChange={toggleTraits} />
        <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => setBrowse("traits")}>Browse with details…</button>
        {b.traits.length ? (
          <div className="mt-2 flex flex-col gap-1.5">
            {b.traits.map((t, i) => {
              const d = tDefs.find((x) => x.name === t.name), cap = capOf(kind, d);
              return (
                <div key={t.name} className={`${rowBox} flex flex-wrap items-center gap-2`}>
                  <b className="text-[13px]">{t.name}</b>
                  {cap > 1 ? <Stepper value={t.n} min={1} max={cap} ariaLabel={`${t.name} count`} onChange={(n) => set({ traits: b.traits.map((x, j) => (j === i ? { ...x, n: n ?? 1 } : x)) })} /> : null}
                  {d?.grants ? <span className="text-[11px] text-[var(--muted)]">grants {d.grants}</span> : null}
                  <span className="basis-full text-[11px] text-[var(--muted)]">{d ? `Downtime: ${d.downtime}` : "Not a known trait — the server drops it."}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </Cell>
      <Cell label={kind === "ship" ? "Tags (FTL Drive / Spaceworthy + HQ tags)" : "Tags (as many as you like)"} className="sm:col-span-2" help={conflicts.size ? `Can't combine with your picks: ${[...conflicts].join(", ")}.` : undefined}>
        <ChipPicker options={gDefs.map((d) => [d.name, conflicts.has(d.name) ? `${d.name} ⚠` : d.name] as [string, string])} value={b.tags.map((t) => t.name)} onChange={toggleTags} />
        <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => setBrowse("tags")}>Browse with details…</button>
        {b.tags.length ? (
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {b.tags.map((t, i) => (
              <label key={t.name} className="flex items-center gap-2 text-[12px]">
                <span className="min-w-[90px] font-semibold">{t.name}</span>
                <input className={`${fieldCls} py-1`} value={t.note ?? ""} maxLength={80} placeholder="note (optional)" onChange={(e) => set({ tags: b.tags.map((x, j) => (j === i ? { ...x, note: e.target.value } : x)) })} />
              </label>
            ))}
          </div>
        ) : null}
      </Cell>
      <Cell label={kind === "ship" ? "Description" : "Notes"} className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={b.notes} maxLength={800} placeholder={kind === "ship" ? "The ship's look and story — shown under its name." : "Where it is, who runs it…"} onChange={(e) => set({ notes: e.target.value })} />
      </Cell>
      {browse === "traits" ? <PickerModal title="Pick traits" options={traitRich} loading={false} selected={b.traits.map((t) => t.name)} onToggle={(v) => toggleTraits(b.traits.some((t) => t.name === v) ? b.traits.filter((t) => t.name !== v).map((t) => t.name) : [...b.traits.map((t) => t.name), v])} onAddCustom={() => {}} onClose={() => setBrowse("")} /> : null}
      {browse === "tags" ? <PickerModal title="Pick tags" options={tagRich} loading={false} selected={b.tags.map((t) => t.name)} onToggle={(v) => toggleTags(b.tags.some((t) => t.name === v) ? b.tags.filter((t) => t.name !== v).map((t) => t.name) : [...b.tags.map((t) => t.name), v])} onAddCustom={() => {}} onClose={() => setBrowse("")} /> : null}
    </>
  );
}

export function BasePreview({ kind, name, b }: { kind: BaseKind; name: string; b: BaseDraft }) {
  const der = baseDerived(kind, b), s = der.ship;
  const label = (t: BaseTrait) => (t.n > 1 ? `${t.name} ×${t.n}` : t.name);
  return (
    <Preview title={name || (kind === "ship" ? "Unnamed Starship" : "Unnamed Headquarters")} subtitle={`${kind === "ship" ? "Starship" : "Headquarters"} · Team rank ${b.rank}`}>
      {kind === "ship" && b.notes.trim() ? <p className="mb-1.5 text-[12px] italic text-[var(--muted)]">{b.notes.trim()}</p> : null}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
        <Stat k="Traits" v={`${der.used}/${der.budget}`} />
        {s ? <><Stat k="Size" v={s.size} /><Stat k="Health" v={s.health} /><Stat k="Passengers" v={s.passengers} /><Stat k="Flight" v={s.flightSpeed} /></> : null}
      </div>
      {s && (s.shields || s.cannons || s.mines) ? (
        <p className="mt-1.5 text-[12px]"><span className={statK}>Systems</span>{" "}
          {[s.shields ? `Shields: Elemental Protection (Force) ${s.shields}` : "", s.cannons ? `${s.cannons} plasma cannon batter${s.cannons === 1 ? "y" : "ies"} (Range 40, ×3)` : "", s.mines ? `${s.mines} mines (dMarvel ×4)` : ""].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      {b.traits.length ? <p className="mt-1.5 text-[12px]"><span className={statK}>Traits</span> {b.traits.map(label).join(", ")}</p> : null}
      {b.tags.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className={statK}>Tags</span> {b.tags.map((t) => (t.note?.trim() ? `${t.name} (${t.note.trim()})` : t.name)).join(", ")}</p> : null}
      {der.grants.length ? <p className="mt-1 text-[12px]"><span className={statK}>Members gain</span> {der.grants.join(", ")}</p> : null}
      {kind === "hq" && b.notes.trim() ? <p className="mt-1.5 text-[12px] text-[var(--muted)]">{b.notes.trim()}</p> : null}
      {der.warnings.length ? <p className="mt-1.5 text-[11px] text-[var(--bad)]">⚠ {der.warnings.join(" · ")}</p> : <p className={hint}>Each trait gives the team a downtime activity.</p>}
    </Preview>
  );
}
