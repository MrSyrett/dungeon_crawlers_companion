"use client";
// ── MUTANT: YEAR ZERO homebrew Weapon + Gear/Armor builders ──────────────────
// Storage shapes are documented in ./rules.ts. Weapon: Melee/Ranged chips (→
// Fight or Shoot), gear-bonus and damage steppers, optional Blast Power, a
// range band, item weight, ammo and feature chips. Gear: Gear or Armor; armor
// has an Armor Rating, gear takes skill-bonus badges the sheet applies while
// the item is in use. Both can be Old Age artifacts (DEV requirement + DEV
// bonus for the Ark) and carry a value in Bullets for the sheet's Item Shop.
import type { ReactNode } from "react";
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  ALL_SKILLS, AMMO, AMMO_HELP, DEV_AMOUNTS, DEV_AREAS, FEATURES, MELEE_RANGES, RANGES, SKILL_ATTR, WEIGHTS,
  cleanDevBonus, cleanDevReq, cleanSkillBonus, fmtDev, suggestValue,
  type DevBonus, type DevReq, type SkillBonus,
} from "./rules";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const numOr = (v: unknown, dflt: number) => { const n = Number(v); return Number.isFinite(n) ? Math.round(n) : dflt; };

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls = "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls = "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const hint = "mt-1 text-[11px] text-[var(--muted)]";
const statRow = "flex flex-wrap gap-x-4 gap-y-1 text-[12px]";
const statK = "text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]";
const smallBtn = "rounded border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

function Cell({ label, children, className = "", help }: { label: ReactNode; children: ReactNode; className?: string; help?: ReactNode }) {
  return (
    <div className={className}>
      <label className={lbl}>{label}</label>
      {children}
      {help ? <p className={hint}>{help}</p> : null}
    </div>
  );
}
function Stat({ k, v }: { k: string; v: ReactNode }) {
  return <span><span className={statK}>{k}</span> <span className="font-semibold">{v}</span></span>;
}
function Select({ value, options, onChange, aria }: { value: string; options: [string, string][]; onChange: (v: string) => void; aria: string }) {
  const opts = options.some(([v]) => v === value) || !value ? options : [...options, [value, `${value} (as written)`] as [string, string]];
  return (
    <select className={selCls} aria-label={aria} value={value} onChange={(e) => onChange(e.target.value)}>
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}
const weightLabel = (w: string) => WEIGHTS.find(([v]) => v === w)?.[1] ?? w;

// ── Artifact + value (shared by both kinds) ─────────────────────────────────
export type Relic = { artifact: boolean; devReq: DevReq | null; devBonus: DevBonus[]; value: number | null };
const relicFrom = (d: Data): Relic => ({
  artifact: d.artifact === true, devReq: cleanDevReq(d.devReq), devBonus: cleanDevBonus(d.devBonus),
  value: Number(d.value) > 0 ? Math.round(Number(d.value)) : null,
});
const relicPayload = (r: Relic, out: Data) => {
  if (r.value) out.value = r.value;
  if (r.artifact) {
    out.artifact = true;
    if (r.devReq) out.devReq = r.devReq;
    if (r.devBonus.length) out.devBonus = cleanDevBonus(r.devBonus);
  }
  return out;
};
// One choice per area × amount ("Technology +D6"), stored as {area, amount}.
const DEV_CHOICES: [string, string][] = DEV_AREAS.flatMap((ar) => DEV_AMOUNTS.map((am) => [`${ar}|${am}`, `${ar} ${am}`] as [string, string]));
const DEV_KINDS: BadgeKind[] = [
  { k: "dev", label: "DEV bonus", color: "gold", target: "choice", choices: DEV_CHOICES,
    format: (b) => String(b.target ?? "?").replace("|", " "),
    tip: "What the Ark gains when the artifact is turned in to the Dawn Vault." },
];
const devToBadges = (b: DevBonus[]): Badge[] => b.map((x) => ({ kind: "dev", target: `${x.area}|${x.amount}` }));
const devFromBadges = (b: Badge[]): DevBonus[] => cleanDevBonus(b.map((x) => { const [area, amount] = String(x.target ?? "").split("|"); return { area, amount }; }));

function RelicFields({ r, set, suggested }: { r: Relic; set: (r: Relic) => void; suggested: number }) {
  return (
    <>
      <Cell label="Value (Bullets)" help={<>Price in the sheet&rsquo;s Item Shop. Blank = suggested {suggested} ⦾ (base {r.artifact ? 15 : 2}, +2 per bonus / damage / armor).{" "}
        {r.value !== suggested ? <button type="button" className={smallBtn} onClick={() => set({ ...r, value: suggested })}>Use {suggested}</button> : null}</>}>
        <Stepper value={r.value} nullable min={1} max={999} ariaLabel="value in bullets" onChange={(value) => set({ ...r, value })} />
      </Cell>
      <Cell label="Origin" help={r.artifact ? "A relic of the Old Age: find it in the Zone, or turn it in to the Dawn Vault to raise the Ark's Development Levels." : "Scrap and junk the Ark can make or trade for."}>
        <ChipPicker single options={[["scrap", "Scrap / Ark-made"], ["artifact", "Artifact"]]} value={[r.artifact ? "artifact" : "scrap"]}
          onChange={(v) => v[0] && set({ ...r, artifact: v[0] === "artifact" })} />
      </Cell>
      {r.artifact ? (
        <>
          <Cell label="DEV requirement" help="The Development Level the Ark needs before anyone can make sense of it (book: 5, 10, 20, 30).">
            <div className="flex flex-wrap items-center gap-2">
              <select className={selCls} aria-label="dev requirement area" value={r.devReq?.area ?? ""}
                onChange={(e) => set({ ...r, devReq: e.target.value ? { area: e.target.value, level: r.devReq?.level ?? 10 } : null })}>
                <option value="">None</option>
                {DEV_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              {r.devReq ? <Stepper value={r.devReq.level} min={1} max={60} ariaLabel="dev requirement level" onChange={(n) => set({ ...r, devReq: { area: r.devReq!.area, level: n ?? 1 } })} /> : null}
            </div>
          </Cell>
          <Cell label="DEV bonus">
            <BonusBadges value={devToBadges(r.devBonus)} onChange={(b) => set({ ...r, devBonus: devFromBadges(b) })} kinds={DEV_KINDS} addLabel="+ DEV bonus" empty="No DEV bonus" max={4} />
          </Cell>
        </>
      ) : null}
    </>
  );
}
function RelicPreview({ r, suggested }: { r: Relic; suggested: number }) {
  const dev = r.artifact ? fmtDev(r.devReq, r.devBonus) : "";
  return (
    <>
      {dev ? <p className="mt-2 text-[12px]"><span className={statK}>Dawn Vault</span> {dev}</p> : null}
      <p className={hint}>Value: {r.value ?? suggested} ⦾ Bullets{r.value ? "" : " (suggested)"}</p>
    </>
  );
}

// ═══ WEAPON ══════════════════════════════════════════════════════════════════
export type WeaponDraft = {
  skill: "Fight" | "Shoot"; bonus: number; damage: number; blast: number | null;
  range: string; weight: string; ammo: string; features: string[]; desc: string; relic: Relic;
};
export const blankWeapon = (): WeaponDraft => ({
  skill: "Fight", bonus: 1, damage: 1, blast: null, range: "Arm's Length", weight: "1", ammo: "", features: [], desc: "",
  relic: { artifact: false, devReq: null, devBonus: [], value: null },
});
export function weaponFromData(d: Data): WeaponDraft {
  const ammo = AMMO.find((a) => a.toLowerCase() === sv(d, "ammo").toLowerCase()) ?? "";
  return {
    skill: d.skill === "Shoot" ? "Shoot" : "Fight", bonus: numOr(d.bonus, 0), damage: numOr(d.damage, 1),
    blast: Number(d.blast) > 0 ? Math.round(Number(d.blast)) : null,
    range: sv(d, "range") || "Arm's Length", weight: sv(d, "weight") || "1", ammo,
    features: Array.isArray(d.features) ? d.features.map(String).filter(Boolean) : [], desc: sv(d, "desc"), relic: relicFrom(d),
  };
}
const weaponSuggest = (w: WeaponDraft) => suggestValue({ artifact: w.relic.artifact, bonus: w.bonus, damage: w.damage });
export function weaponPayload(name: string, w: WeaponDraft): Data {
  const out: Data = { name, skill: w.skill, bonus: w.bonus, damage: w.damage, range: w.range, weight: w.weight, desc: w.desc.trim() };
  if (w.blast) out.blast = w.blast;
  if (w.ammo) out.ammo = w.ammo;
  if (w.features.length) out.features = w.features;
  return relicPayload(w.relic, out);
}

export function WeaponBuilder({ value: w, onChange }: { value: WeaponDraft; onChange: (v: WeaponDraft) => void }) {
  const set = (p: Partial<WeaponDraft>) => onChange({ ...w, ...p });
  const ranges: readonly string[] = w.skill === "Fight" ? MELEE_RANGES : RANGES;
  return (
    <>
      <Cell label="Type" help={`Rolls ${w.skill} — ${w.skill === "Fight" ? "Strength" : "Agility"} + ${w.skill} + gear bonus dice.`}>
        <ChipPicker single options={[["Fight", "Melee (Fight)"], ["Shoot", "Ranged (Shoot)"]]} value={[w.skill]}
          onChange={(v) => { if (!v[0]) return; const skill = v[0] === "Shoot" ? "Shoot" : "Fight"; set({ skill, range: skill === "Fight" && !(MELEE_RANGES as readonly string[]).includes(w.range) ? "Arm's Length" : skill === "Shoot" && w.range === "Arm's Length" ? "Short" : w.range }); }} />
      </Cell>
      <Cell label="Gear bonus" help="Black gear dice added to the attack (book: +1 scrap to +3 artifact). Pushing can break it down.">
        <Stepper value={w.bonus} signed min={0} max={5} ariaLabel="gear bonus" onChange={(n) => set({ bonus: n ?? 0 })} />
      </Cell>
      <Cell label="Damage" help="Damage on a hit; each extra success adds +1.">
        <Stepper value={w.damage} min={0} max={10} ariaLabel="damage" onChange={(n) => set({ damage: n ?? 0 })} />
      </Cell>
      <Cell label="Blast Power" help="Explosives only: everyone within Near of the blast is hit by this many dice (book: 6–9).">
        <Stepper value={w.blast} nullable min={1} max={20} ariaLabel="blast power" onChange={(blast) => set({ blast })} />
      </Cell>
      <Cell label="Range" help={w.skill === "Fight" ? "Melee reaches Arm's Length (or Near for chains and spears)." : "Near ≈ a few metres · Short ≈ 25 m · Long ≈ 100 m · Distant ≈ further."}>
        <Select aria="range" value={w.range} options={ranges.map((r) => [r, r])} onChange={(range) => set({ range })} />
      </Cell>
      <Cell label="Weight" help="Carry Strength × 2 items; light = ½, heavy = 2.">
        <Select aria="weight" value={w.weight} options={WEIGHTS} onChange={(weight) => set({ weight })} />
      </Cell>
      <Cell label="Ammo" className="sm:col-span-2" help={w.ammo ? AMMO_HELP[w.ammo] : "Nothing to spend — melee, slingshot stones, thrown rocks."}>
        <ChipPicker single options={[...AMMO]} value={w.ammo ? [w.ammo] : []} onChange={(v) => set({ ammo: v[0] ?? "" })} />
      </Cell>
      <Cell label="Features" className="sm:col-span-2">
        <ChipPicker custom customPh="Other feature…" options={[...FEATURES]} value={w.features} onChange={(features) => set({ features })} />
      </Cell>
      <RelicFields r={w.relic} set={(relic) => set({ relic })} suggested={weaponSuggest(w)} />
      <Cell label="Notes" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={w.desc} maxLength={1000} placeholder="Where it was scavenged, how it looks, any rule the pickers don't cover." onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function WeaponPreview({ name, w }: { name: string; w: WeaponDraft }) {
  const tags = [w.relic.artifact ? "Artifact" : "", ...w.features].filter(Boolean).join(", ");
  return (
    <Preview title={name || "Unnamed Weapon"} subtitle={`${w.skill === "Shoot" ? "Ranged weapon · Shoot" : "Melee weapon · Fight"}${w.relic.artifact ? " · Artifact" : ""}`}>
      <div className={statRow}>
        <Stat k="Bonus" v={`+${w.bonus}`} />
        <Stat k="Damage" v={w.damage} />
        {w.blast ? <Stat k="Blast" v={w.blast} /> : null}
        <Stat k="Range" v={w.range} />
        <Stat k="Weight" v={weightLabel(w.weight)} />
        {w.ammo ? <Stat k="Ammo" v={w.ammo} /> : null}
      </div>
      {tags ? <p className="mt-2 text-[13px]"><span className={statK}>Features</span> {tags}</p> : null}
      {w.desc.trim() ? <p className="mt-2 text-[13px] text-[var(--muted)]">{w.desc.trim()}</p> : null}
      <p className={hint}>
        Attack: {w.skill === "Fight" ? "STR" : "AGI"} + {w.skill}{w.bonus ? ` + ${w.bonus} gear` : ""} dice · a hit deals {w.damage} +1 per extra success.
        {w.blast ? ` Blast Power ${w.blast}: roll ${w.blast} dice against everyone within Near.` : ""}
        {w.ammo === "Bullets" ? " Spends 1 Bullet per shot." : ""}
      </p>
      <RelicPreview r={w.relic} suggested={weaponSuggest(w)} />
    </Preview>
  );
}

// ═══ GEAR / ARMOR ════════════════════════════════════════════════════════════
const SKILL_OPTS: [string, string][] = ALL_SKILLS.map((s) => [s, `${s} (${SKILL_ATTR[s]})`]);
const BONUS_KINDS: BadgeKind[] = [
  { k: "skill", label: "Gear bonus", color: "green", amount: true, amountPh: "+2", target: "choice", choices: SKILL_OPTS,
    format: (b) => `${b.target ?? "?"} ${(b.amount ?? 0) >= 0 ? "+" : "−"}${Math.abs(b.amount ?? 0)}`,
    tip: "Gear dice on that skill (Binoculars: Scout +3). On the sheet, tick the item as in use; only one item's bonus counts on a roll." },
];
const toBadges = (b: SkillBonus[]): Badge[] => b.map((x) => ({ kind: "skill", target: x.skill, amount: x.amount }));
const fromBadges = (b: Badge[]): SkillBonus[] => cleanSkillBonus(b.map((x) => ({ skill: x.target, amount: x.amount })));

export type GearDraft = { kind: "gear" | "armor"; weight: string; bonuses: SkillBonus[]; rating: number; desc: string; relic: Relic };
export const blankGear = (): GearDraft => ({ kind: "gear", weight: "1", bonuses: [], rating: 3, desc: "", relic: { artifact: false, devReq: null, devBonus: [], value: null } });
export function gearFromData(d: Data): GearDraft {
  const armor = d.kind === "armor" || (d.kind == null && d.rating != null);
  return {
    kind: armor ? "armor" : "gear", weight: sv(d, "weight") || "1", bonuses: cleanSkillBonus(d.skillBonus),
    rating: Math.max(1, Math.min(12, numOr(d.rating, 3))), desc: sv(d, "desc"), relic: relicFrom(d),
  };
}
const gearSuggest = (g: GearDraft) => suggestValue({ artifact: g.relic.artifact, rating: g.kind === "armor" ? g.rating : 0, skillBonus: g.kind === "gear" ? Math.max(0, ...g.bonuses.map((b) => b.amount)) : 0 });
export function gearPayload(name: string, g: GearDraft): Data {
  const out: Data = { name, kind: g.kind, weight: g.weight, desc: g.desc.trim() };
  if (g.kind === "armor") out.rating = g.rating; else out.skillBonus = cleanSkillBonus(g.bonuses);
  return relicPayload(g.relic, out);
}

export function GearBuilder({ value: g, onChange }: { value: GearDraft; onChange: (v: GearDraft) => void }) {
  const set = (p: Partial<GearDraft>) => onChange({ ...g, ...p });
  const armor = g.kind === "armor";
  return (
    <>
      <Cell label="Kind" help={armor ? "Listed in the sheet's Item Shop under Armor; equip it and its Armor Rating dice are rolled when you take damage." : "Tools, meds, junk and Old Age trinkets — most gear helps one skill."}>
        <ChipPicker single options={[["gear", "Gear"], ["armor", "Armor"]]} value={[g.kind]} onChange={(v) => v[0] && set({ kind: v[0] === "armor" ? "armor" : "gear" })} />
      </Cell>
      <Cell label="Weight" help="Carry Strength × 2 items; tiny items don't count.">
        <Select aria="weight" value={g.weight} options={WEIGHTS} onChange={(weight) => set({ weight })} />
      </Cell>
      {armor ? (
        <Cell label="Armor Rating" help="Dice rolled when you take damage; each 6 stops one point (scrap armor 3, Kevlar vest 6).">
          <Stepper value={g.rating} min={1} max={12} ariaLabel="armor rating" onChange={(n) => set({ rating: n ?? 1 })} />
        </Cell>
      ) : (
        <Cell label="Gear bonus" className="sm:col-span-2" help="On the sheet, tick the item as in use and its gear dice join that skill's rolls (only one item's bonus counts per roll).">
          <BonusBadges value={toBadges(g.bonuses)} onChange={(b) => set({ bonuses: fromBadges(b) })} kinds={BONUS_KINDS} addLabel="+ Gear bonus" empty="No gear bonus" max={4} />
        </Cell>
      )}
      <RelicFields r={g.relic} set={(relic) => set({ relic })} suggested={gearSuggest(g)} />
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={g.desc} maxLength={2000}
          placeholder={armor ? "Road signs and tyre rubber riveted together." : "What it is and when it helps."} onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function GearPreview({ name, g }: { name: string; g: GearDraft }) {
  const armor = g.kind === "armor";
  return (
    <Preview title={name || (armor ? "Unnamed Armor" : "Unnamed Gear")} subtitle={`${armor ? "Armor" : "Gear"}${g.relic.artifact ? " · Artifact" : ""}`}>
      <div className={statRow}>
        {armor ? <Stat k="Armor Rating" v={g.rating} /> : null}
        <Stat k="Weight" v={weightLabel(g.weight)} />
      </div>
      {!armor && g.bonuses.length ? <div className="mt-2"><BadgeStrip value={toBadges(g.bonuses)} kinds={BONUS_KINDS} /></div> : null}
      {g.desc.trim() ? <p className="mt-2 text-[13px]">{g.desc.trim()}</p> : null}
      {armor ? <p className={hint}>When you take damage: roll {g.rating} dice, each 6 stops one point. Every 1 rolled lowers the rating by one unless all damage was stopped.</p> : null}
      <RelicPreview r={g.relic} suggested={gearSuggest(g)} />
    </Preview>
  );
}
