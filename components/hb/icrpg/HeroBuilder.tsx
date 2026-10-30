"use client";
// ── ICRPG homebrew HERO TYPE and ABILITY builders ────────────────────────────
// Hero type = book IcrpgType {name, world, desc, statFocus?, startingLoot?,
// abilities?} (read by /icrpg/heroes and — via icrpg-homebrew.js — the sheet's
// Type select and its Create wizard), plus:
//   focus             string[] of STATS (composes statFocus "STR, DEX")
//   startingLootRows  [{name, desc, benefits}] → startingLoot "Name: desc";
//                     the wizard gives the picked ones to the hero as LOOT rows
//                     carrying bv:2 + benefits (applied when EQUIPPED)
//   abilities         names picked from the world's ABILITIES (custom allowed)
// Ability = book IcrpgAbility {name, kind, world, desc} plus `benefits`
// (LootBonus "icrpg" stat / all STATS / DEFENSE / EFFORT / note badges) which
// the sheet applies for as long as the ability is on the hero (ABILITIES are
// never lost — no equip toggle).
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import type { Badge } from "../BonusBadges";
import LootBonusBadges from "../LootBonusBadges";
import { ICRPG_ABILITIES } from "@/lib/data/icrpg-abilities";
import { ABILITY_KINDS, ICRPG_STATS, ICRPG_WORLDS, cleanIcrpgBenefits, composeStartLoot, parseStartLoot, type StartLoot } from "./rules";
import { Bonuses, Cell, IC_JS, PreviewBadges, RowCtl, Select, addBtn, fieldCls } from "./ui";

type Data = Record<string, unknown>;
const strs = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x ?? "").trim()).filter(Boolean) : []);
const worldName = (k: string) => ICRPG_WORLDS.find(([w]) => w === k)?.[1] ?? k;
const GENERIC = new Set(["Abilities", "Powers", "Augments"]);

// ═══ HERO TYPE ═══════════════════════════════════════════════════════════════
export type TypeDraft = { world: string; focus: string[]; desc: string; loot: StartLoot[]; abilities: string[] };
export const blankType = (): TypeDraft => ({ world: "core", focus: [], desc: "", loot: [], abilities: [] });
export function typeFromData(d: Data): TypeDraft {
  const rows = Array.isArray(d.startingLootRows)
    ? (d.startingLootRows as Data[]).map((r) => ({ name: String(r?.name ?? ""), desc: String(r?.desc ?? ""), benefits: cleanIcrpgBenefits(r?.benefits) }))
    : strs(d.startingLoot).map(parseStartLoot);
  const focus = Array.isArray(d.focus) ? strs(d.focus) : String(d.statFocus ?? "").split(/\s*,\s*/).filter(Boolean);
  return { world: String(d.world ?? "core"), focus, desc: String(d.desc ?? ""), loot: rows, abilities: strs(d.abilities) };
}
export const typePayload = (name: string, t: TypeDraft): Data => ({
  name, world: t.world, desc: t.desc, focus: t.focus, statFocus: t.focus.join(", "),
  startingLootRows: t.loot.filter((r) => r.name.trim()), abilities: t.abilities,
});

export function TypeBuilder({ value: t, onChange }: { value: TypeDraft; onChange: (v: TypeDraft) => void }) {
  const set = (p: Partial<TypeDraft>) => onChange({ ...t, ...p });
  const setLoot = (i: number, p: Partial<StartLoot>) => set({ loot: t.loot.map((r, j) => (j === i ? { ...r, ...p } : r)) });
  const abilityOpts = [...new Set(ICRPG_ABILITIES.filter((a) => !GENERIC.has(a.name) && (t.world === "core" || a.world === t.world || a.world === "core")).map((a) => a.name))];
  return (
    <>
      <Cell label="World">
        <Select value={t.world} options={ICRPG_WORLDS} ariaLabel="world" onChange={(v) => set({ world: v })} />
      </Cell>
      <Cell label="STAT focus" help="The STATS this Type leans on (shown in the sheet's Create wizard).">
        <ChipPicker options={ICRPG_STATS} value={t.focus} custom customPh="e.g. MAGIC EFFORT" onChange={(v) => set({ focus: v })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={t.desc} maxLength={3000} placeholder="A master of steel who can take a beating." onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
      <Cell label="Starting LOOT" className="sm:col-span-2" help="The kit a new hero picks from in the sheet's Create wizard. Bonuses ride onto the hero's LOOT row and apply when it's EQUIPPED.">
        <div className="flex flex-col gap-2">
          {t.loot.map((r, i) => (
            <div key={i} className="rounded border border-[var(--border)] border-l-[3px] border-l-[var(--hb-accent)] p-2">
              <div className="flex flex-wrap items-center gap-2">
                <input className={`${fieldCls} max-w-[220px]`} value={r.name} maxLength={60} placeholder="Weapon Gem" onChange={(e) => setLoot(i, { name: e.target.value })} />
                <input className={`${fieldCls} min-w-[200px] flex-1`} value={r.desc} maxLength={240} placeholder="What it does…" onChange={(e) => setLoot(i, { desc: e.target.value })} />
                <RowCtl rows={t.loot} i={i} onChange={(rows) => set({ loot: rows })} />
              </div>
              <div className="mt-2"><LootBonusBadges sys="icrpg" scripts={IC_JS} value={r.benefits} empty="No bonuses" onChange={(v) => setLoot(i, { benefits: v })} /></div>
            </div>
          ))}
          {t.loot.length < 12 ? <button type="button" className={`${addBtn} self-start`} onClick={() => set({ loot: [...t.loot, { name: "", desc: "", benefits: [] }] })}>+ Starting loot</button> : null}
        </div>
      </Cell>
      <Cell label="Abilities" className="sm:col-span-2" help={`Pick from ${t.world === "core" ? "every world's" : `${worldName(t.world)}'s`} ABILITIES, or add your own (make it under Homebrew Abilities to give it effects).`}>
        <ChipPicker options={abilityOpts} value={t.abilities} custom customPh="Custom ability…" onChange={(v) => set({ abilities: v })} />
      </Cell>
    </>
  );
}
export function TypePreview({ name, t }: { name: string; t: TypeDraft }) {
  return (
    <Preview title={name || "Unnamed type"} subtitle={`${worldName(t.world)} hero type${t.focus.length ? ` · focus ${t.focus.join(", ")}` : ""}`}>
      {t.desc ? <p className="text-[13px] leading-relaxed">{t.desc}</p> : null}
      {t.loot.length ? (
        <>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Starting loot</p>
          <ul className="flex flex-col gap-1 text-[13px]">{t.loot.filter((r) => r.name).map((r, i) => <li key={i}>{composeStartLoot(r)}{r.benefits.length ? <PreviewBadges value={r.benefits} /> : null}</li>)}</ul>
        </>
      ) : null}
      {t.abilities.length ? <p className="mt-2 text-[13px]"><b>Abilities:</b> {t.abilities.join(", ")}</p> : null}
    </Preview>
  );
}

// ═══ ABILITY ═════════════════════════════════════════════════════════════════
export type AbilityDraft = { kind: string; world: string; desc: string; benefits: Badge[] };
export const blankAbility = (): AbilityDraft => ({ kind: "Ability", world: "core", desc: "", benefits: [] });
export const abilityFromData = (d: Data): AbilityDraft => ({
  kind: String(d.kind ?? "") || "Ability", world: String(d.world ?? "core"), desc: String(d.desc ?? ""), benefits: cleanIcrpgBenefits(d.benefits, ABILITY_KINDS),
});
export const abilityPayload = (name: string, a: AbilityDraft): Data => ({ name, kind: a.kind, world: a.world, desc: a.desc, benefits: a.benefits });

export function AbilityBuilder({ value: a, onChange }: { value: AbilityDraft; onChange: (v: AbilityDraft) => void }) {
  const set = (p: Partial<AbilityDraft>) => onChange({ ...a, ...p });
  return (
    <>
      <Cell label="Kind" help="ABILITIES come from your Type; POWERS are superhuman; AUGMENTS are implants.">
        <ChipPicker single custom customPh="Other…" options={["Ability", "Power", "Augment", "Mastery"]} value={[a.kind]} onChange={(v) => v[0] && set({ kind: v[0] })} />
      </Cell>
      <Cell label="World">
        <Select value={a.world} options={ICRPG_WORLDS} ariaLabel="world" onChange={(v) => set({ world: v })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2" help="Uses the sheet's Action tab when it mentions a roll, TURN, use or cast.">
        <textarea className={`${fieldCls} min-h-[80px]`} value={a.desc} maxLength={3000} placeholder="If attacking an enemy you have already harmed, do ULTIMATE damage." onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
      <Bonuses value={a.benefits} only={ABILITY_KINDS} onChange={(v) => set({ benefits: v })} help="Always on: the ICRPG sheet adds these to the hero's STATS / DEFENSE / EFFORT while the ability is on the sheet." />
    </>
  );
}
export function AbilityPreview({ name, a }: { name: string; a: AbilityDraft }) {
  return (
    <Preview title={name || "Unnamed ability"} subtitle={`${a.kind} · ${worldName(a.world)}`}>
      {a.desc ? <p className="text-[13px] leading-relaxed">{a.desc}</p> : null}
      <PreviewBadges value={a.benefits} />
    </Preview>
  );
}
