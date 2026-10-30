"use client";
// ── MMRPG homebrew Iconic Item builder (Avengers Expansion) ────────────────
// Type (Weapon / Item / Battle Suit), signature owner, the origin it grants,
// granted powers and restrictions (the rich "Browse & pick" pickers, plus a
// composer for "use" restrictions: Requires <Ability> N or more / Requires
// <power> / Only usable by … / worthy), a live Power Value with its breakdown
// (granted powers + the prerequisite powers they bring + 1 for a weapon − 1 per
// restriction, min 1; overridable), and for weapons: melee reach and/or a
// ranged distance, the attack abilities, the damage-multiplier bonus and "does
// no damage". Equipment-shaped storage, so the sheet's picker / wizard / level
// up own it, grant its powers and apply its bonus exactly like a book item.
import { useEffect, useState } from "react";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { MMRPG_POWER_NAMES } from "@/lib/data/mmrpg-power-names";
import { MMRPG_ORIGINS } from "@/lib/data/mmrpg-origins";
import { ABILITIES, DMG_ABILITIES, abName, composeIconRange, iconicPv, parseIconRange, powerClosure, type IconRange } from "./rules";
import { AsWritten, Cell, PickerField, Stat, fieldCls, hint, miniBtn, selCls, statK, type RichOpt } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

// Standard iconic-item restrictions (Avengers Expansion). Each lowers the Power
// Value by 1; Access/Use restrictions are open-ended, so custom text is allowed.
const RESTRICTION_OPTS: readonly string[] = [
  "Worn", "Carried", "Driven", "Paired Item",
  "Awkward", "Flashy", "Large", "Loud", "Menacing",
  "Anathema", "Berserker", "Bloodthirsty", "Breathe Different", "Weakness",
];
const RESTRICTION_RICH: readonly RichOpt[] = [
  { value: "Worn", group: "Attachment", detail: "How the item attaches — it's worn on the body. An attachment restriction means the item can be removed or taken; whoever grabs it can use it." },
  { value: "Carried", group: "Attachment", detail: "How the item attaches — it's carried or held in hand, so it can be dropped or taken away." },
  { value: "Driven", group: "Attachment", detail: "How the item attaches — it's driven or piloted, like a vehicle; leaving it behind gives it up." },
  { value: "Paired Item", group: "Attachment", detail: "The item is a pair. Wearing only one half gives trouble on its permanent powers (Ego check with trouble each use, or the power stops for 1 round). A Warp Portal works instantly when the pair is worn together. (Secret Wars)" },
  { value: "Awkward", group: "Obvious", detail: "The item is unwieldy and gives its user trouble on some checks while it's in use." },
  { value: "Flashy", group: "Obvious", detail: "Using the item is showy and draws attention — hard to stay subtle." },
  { value: "Large", group: "Obvious", detail: "The item is big and hard to conceal, store or carry discreetly." },
  { value: "Loud", group: "Obvious", detail: "The item is noisy in use, making stealth and surprise difficult." },
  { value: "Menacing", group: "Obvious", detail: "The item looks threatening, complicating social situations and first impressions." },
  { value: "Anathema", group: "Challenging (trait)", detail: "The item is bound to a vulnerability — a specific thing the wielder is especially at risk from." },
  { value: "Berserker", group: "Challenging (trait)", detail: "The wielder can lose control and attack indiscriminately once the fighting starts." },
  { value: "Bloodthirsty", group: "Challenging (trait)", detail: "The item pushes its wielder toward violence, making restraint difficult." },
  { value: "Breathe Different", group: "Challenging (trait)", detail: "The wielder needs a special atmosphere to breathe or operate normally." },
  { value: "Weakness", group: "Challenging (trait)", detail: "A specific substance or circumstance saps the wielder's power or health." },
];
const ORIGIN_NAMES: readonly string[] = MMRPG_ORIGINS.map((o) => o.name);
const TYPES: [string, string][] = [["Weapon", "Weapon"], ["Item", "Item"], ["Armor", "Battle Suit / Armor"]];

export type IconicDraft = {
  type: string; owner: string; origin: string; powers: string[]; restrictions: string[];
  pvAuto: boolean; pvOverride: number;
  range: IconRange; rangeOrig: string; rangeTxt: string | null;
  abilities: string[]; bonus: number; bonusRaw: string; noDamage: boolean; special: string;
};
const defRange = (): IconRange => ({ melee: true, reachPlus: 0, ranged: false, dist: 10 });
export const blankIconic = (): IconicDraft => ({
  type: "Item", owner: "", origin: "", powers: [], restrictions: [], pvAuto: true, pvOverride: 1,
  range: defRange(), rangeOrig: "", rangeTxt: null, abilities: ["melee"], bonus: 1, bonusRaw: "", noDamage: false, special: "",
});
const bonusNum = (s: string) => { const m = /(\d+)/.exec(s); return m ? Math.min(6, Number(m[1])) : 0; };
export function iconicFromData(d: Data): IconicDraft {
  // Older free-text records (grantsPowers string / attachment + restrictions text) become picker arrays.
  const split = (v: unknown) => (typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
  let powers = Array.isArray(d.powers) ? d.powers.map(String) : [];
  if (!powers.length) powers = split(d.grantsPowers);
  let restrictions = Array.isArray(d.restrictions) ? d.restrictions.map(String) : [];
  if (!restrictions.length) { const a = sv(d, "attachment"); restrictions = [...(a && a !== "—" ? [a] : []), ...split(d.restrictions)]; }
  const rS = sv(d, "range"), r = parseIconRange(rS);
  const multi = Array.isArray(d.multAbilities) ? d.multAbilities.map(String).filter((k) => DMG_ABILITIES.some(([v]) => v === k)) : [];
  const ab = sv(d, "ability").toLowerCase();
  const bRaw = sv(d, "damageBonus");
  return {
    type: ["Weapon", "Item", "Armor"].includes(sv(d, "type")) ? sv(d, "type") : "Item",
    owner: sv(d, "owner"), origin: sv(d, "origin") || sv(d, "grantsOrigin"), powers, restrictions,
    pvAuto: d.pvAuto !== false, pvOverride: Math.max(1, Number(d.powerValue) || 1),
    range: r ?? defRange(), rangeOrig: r ? rS : "", rangeTxt: !r && rS ? rS : null,
    abilities: multi.length ? multi : [DMG_ABILITIES.some(([v]) => v === ab) ? ab : "melee"],
    bonus: bRaw ? bonusNum(bRaw) : Number(d.multBonus) || 0, bonusRaw: bRaw, noDamage: d.noDamage === true, special: sv(d, "special"),
  };
}
export function iconicPayload(name: string, it: IconicDraft): Data {
  const out: Data = { name, type: it.type, owner: it.owner.trim(), origin: it.origin.trim(), powers: it.powers, restrictions: it.restrictions, special: it.special.trim() };
  if (!it.pvAuto) { out.pvAuto = false; out.powerValue = it.pvOverride; }
  if (it.type === "Weapon") {
    const same = it.rangeOrig && JSON.stringify(parseIconRange(it.rangeOrig)) === JSON.stringify(it.range);
    out.range = it.rangeTxt !== null ? it.rangeTxt.trim() : same ? it.rangeOrig : composeIconRange(it.range);
    out.ability = it.abilities[0] || "melee";
    if (it.abilities.length > 1) out.multAbilities = it.abilities;
    out.damageBonus = it.noDamage || !it.bonus ? "" : it.bonusRaw && bonusNum(it.bonusRaw) === it.bonus ? it.bonusRaw : `+${it.bonus}`;
    if (it.noDamage) out.noDamage = true;
  }
  return out;
}

// Prerequisites of every book power, loaded on demand (231 kB) for the PV math.
let prereqCache: Map<string, string> | null = null;
function usePrereqs(): ((n: string) => string | undefined) | null {
  const [map, setMap] = useState<Map<string, string> | null>(prereqCache);
  useEffect(() => {
    if (map) return;
    let live = true;
    import("@/lib/data/mmrpg-power-details").then((m) => {
      prereqCache = new Map(m.MMRPG_POWER_DETAILS.map((p) => [p.name.toLowerCase(), p.prereq || ""]));
      if (live) setMap(prereqCache);
    });
    return () => { live = false; };
  }, [map]);
  return map ? (n: string) => map.get(n.toLowerCase()) : null;
}
export function useIconicPv(it: IconicDraft) {
  const pre = usePrereqs();
  const calc = iconicPv(it.type, it.powers, it.restrictions.length, pre ?? (() => undefined));
  const implied = pre ? powerClosure(it.powers, pre).filter((p) => !it.powers.some((x) => x.toLowerCase() === p.toLowerCase())) : [];
  return { ...calc, impliedNames: implied, loading: !pre, pv: it.pvAuto ? calc.pv : it.pvOverride };
}

function UseRestriction({ onAdd }: { onAdd: (s: string) => void }) {
  const [kind, setKind] = useState("ability");
  const [ab, setAb] = useState("logic");
  const [n, setN] = useState<number>(2);
  const [t, setT] = useState("");
  const text = kind === "ability" ? `Requires: ${abName(ab)} ${n} or more` : kind === "power" ? (t.trim() ? `Requires: ${t.trim()} power` : "") : kind === "only" ? (t.trim() ? `Only usable by ${t.trim()}` : "") : "Can only be used by the worthy";
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
      <select className={selCls} aria-label="use restriction" value={kind} onChange={(e) => setKind(e.target.value)}>
        <option value="ability">Requires ability…</option><option value="power">Requires power…</option>
        <option value="only">Only usable by…</option><option value="worthy">Only the worthy</option>
      </select>
      {kind === "ability" ? (
        <>
          <select className={selCls} aria-label="ability" value={ab} onChange={(e) => setAb(e.target.value)}>{ABILITIES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <Stepper value={n} min={1} max={9} ariaLabel="minimum" onChange={(v) => setN(v ?? 1)} />
          <span className="text-[12px] text-[var(--muted)]">or more</span>
        </>
      ) : kind === "power" ? (
        <><input list="dl-mmrpg-upow" className={`${fieldCls} w-48`} value={t} placeholder="Shield 1" onChange={(e) => setT(e.target.value)} /><datalist id="dl-mmrpg-upow">{MMRPG_POWER_NAMES.map((o) => <option key={o} value={o} />)}</datalist></>
      ) : kind === "only" ? (
        <input className={`${fieldCls} w-48`} value={t} maxLength={60} placeholder="Paladin / mutants" onChange={(e) => setT(e.target.value)} />
      ) : null}
      <button type="button" className={miniBtn} disabled={!text} onClick={() => { if (text) { onAdd(text); setT(""); } }}>+ Add use restriction</button>
    </div>
  );
}

export function IconicBuilder({ value: it, onChange }: { value: IconicDraft; onChange: (v: IconicDraft) => void }) {
  const set = (x: Partial<IconicDraft>) => onChange({ ...it, ...x });
  const pv = useIconicPv(it);
  const setRange = (x: Partial<IconRange>) => set({ range: { ...it.range, ...x } });
  return (
    <>
      <Cell label="Type" help={it.type === "Armor" ? "A battle suit's first power pick is free (High-Tech: Battle Suit origin)." : undefined}>
        <ChipPicker single options={TYPES} value={[it.type]} onChange={(v) => v[0] && set({ type: v[0] })} />
      </Cell>
      <Cell label="Signature owner" help="optional">
        <input className={fieldCls} value={it.owner} maxLength={80} placeholder="e.g. Iron Man" onChange={(e) => set({ owner: e.target.value })} />
      </Cell>
      <Cell label="Origin granted" className="sm:col-span-2" help="The owner gains Extraordinary Origin if it differs from theirs, plus Tech or Magic Item Reliance for a tech or magic origin.">
        <input list="dl-mmrpg-origin" className={fieldCls} value={it.origin} maxLength={80} placeholder="High-Tech: Battle Suit, Magic: Sorcery…" onChange={(e) => set({ origin: e.target.value })} />
        <datalist id="dl-mmrpg-origin">{ORIGIN_NAMES.map((o) => <option key={o} value={o} />)}</datalist>
      </Cell>
      <PickerField className="sm:col-span-2" label="Powers granted" dlId="dl-mmrpg-ipow" value={it.powers} onChange={(powers) => set({ powers })}
        options={MMRPG_POWER_NAMES} lazyDetails="mmrpg-powers" allowCustom addLabel="+ Power" browseLabel="Browse powers…" modalTitle="Pick powers" placeholder="Type to search powers…"
        help="Pick real powers so the item automates when a hero owns it. Browse to read what each one does." />
      <PickerField className="sm:col-span-2" label="Restrictions" dlId="dl-mmrpg-irest" value={it.restrictions} onChange={(restrictions) => set({ restrictions })}
        options={RESTRICTION_OPTS} richOptions={RESTRICTION_RICH} allowCustom addLabel="+ Restriction" browseLabel="Browse restrictions…" modalTitle="Pick restrictions" placeholder="Worn, Flashy… or type a custom one"
        help="Each restriction lowers the item's Power Value by 1." />
      <div className="-mt-2 sm:col-span-2"><UseRestriction onAdd={(s) => !it.restrictions.includes(s) && set({ restrictions: [...it.restrictions, s] })} /></div>
      <Cell label="Power Value" className="sm:col-span-2" help={<>A hero owning it spends this many power picks, minus each granted power they already have (min 1).{pv.loading ? " Loading power prerequisites…" : ""}</>}>
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <label className="flex items-center gap-1.5"><input type="radio" checked={it.pvAuto} onChange={() => set({ pvAuto: true })} /> Auto: <b className="text-[var(--hb-accent)]">PV {pv.pv}</b></label>
          <span className="text-[11px] text-[var(--muted)]">= {pv.granted} power{pv.granted === 1 ? "" : "s"}{pv.implied ? ` + ${pv.implied} prerequisite${pv.implied === 1 ? "" : "s"}` : ""}{pv.weapon ? " + 1 weapon" : ""}{pv.restrictions ? ` − ${pv.restrictions} restriction${pv.restrictions === 1 ? "" : "s"}` : ""}</span>
          <label className="ml-2 flex items-center gap-1.5"><input type="radio" checked={!it.pvAuto} onChange={() => set({ pvAuto: false, pvOverride: it.pvAuto ? pv.pv : it.pvOverride })} /> Set:</label>
          <Stepper value={it.pvAuto ? pv.pv : it.pvOverride} min={1} max={40} ariaLabel="Power Value override" onChange={(n) => set({ pvAuto: false, pvOverride: n ?? 1 })} />
        </div>
        {pv.impliedNames.length ? <p className={hint}>Prerequisites counted: {pv.impliedNames.join(", ")}.</p> : null}
      </Cell>
      {it.type === "Weapon" ? (
        <>
          <Cell label="Range" className="sm:col-span-2" help={it.rangeTxt === null ? `Reads as: ${composeIconRange(it.range)}. A ranged distance makes it a ranged weapon.` : undefined}>
            {it.rangeTxt !== null ? (
              <AsWritten value={it.rangeTxt} onChange={(v) => set({ rangeTxt: v })} onPickers={() => set({ rangeTxt: null })} />
            ) : (
              <div className="flex flex-wrap items-center gap-2 text-[13px]">
                <label className="flex items-center gap-1"><input type="checkbox" checked={it.range.melee} onChange={(e) => setRange({ melee: e.target.checked, ranged: e.target.checked ? it.range.ranged : true })} /> Melee, reach</label>
                {it.range.melee ? <select className={selCls} aria-label="reach" value={it.range.reachPlus} onChange={(e) => setRange({ reachPlus: Number(e.target.value) })}><option value={0}>Reach</option><option value={1}>Reach +1</option><option value={2}>Reach +2</option></select> : null}
                <label className="ml-2 flex items-center gap-1"><input type="checkbox" checked={it.range.ranged} onChange={(e) => { const on = e.target.checked; set({ range: { ...it.range, ranged: on, melee: on ? it.range.melee : true }, abilities: on && !it.abilities.includes("agility") ? [...it.abilities, "agility"] : it.abilities }); }} /> Thrown / ranged</label>
                {it.range.ranged ? (
                  <>
                    <select className={selCls} aria-label="distance kind" value={it.range.dist === "Unlimited" ? "u" : "n"} onChange={(e) => setRange({ dist: e.target.value === "u" ? "Unlimited" : 10 })}><option value="n">spaces</option><option value="u">Unlimited</option></select>
                    {it.range.dist !== "Unlimited" ? <Stepper value={it.range.dist} min={1} max={60} ariaLabel="spaces" onChange={(n) => setRange({ dist: n ?? 10 })} /> : null}
                  </>
                ) : null}
              </div>
            )}
          </Cell>
          <Cell label="Attacks with" help="The first is its main ability; book thrown weapons use Melee and Agility.">
            <ChipPicker options={DMG_ABILITIES.map(([k, l]) => [k, l] as [string, string])} value={it.abilities} onChange={(v) => set({ abilities: v.length ? v : ["melee"] })} />
          </Cell>
          <Cell label="Damage multiplier bonus" help={it.noDamage ? "Does no actual damage." : "Added to the damage multiplier of those abilities while equipped (the higher of weapon and power bonuses applies)."}>
            <div className="flex flex-wrap items-center gap-2">
              {!it.noDamage ? <Stepper value={it.bonus} min={0} max={6} signed ariaLabel="damage multiplier bonus" onChange={(n) => set({ bonus: n ?? 0 })} /> : null}
              <label className="flex items-center gap-1 text-[12px]"><input type="checkbox" checked={it.noDamage} onChange={(e) => set({ noDamage: e.target.checked })} /> No damage</label>
            </div>
          </Cell>
        </>
      ) : null}
      <Cell label="Special / effect" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[60px]`} value={it.special} maxLength={1500} placeholder="Anything the pickers don't cover." onChange={(e) => set({ special: e.target.value })} />
      </Cell>
    </>
  );
}

export function IconicPreview({ name, it }: { name: string; it: IconicDraft }) {
  const pv = useIconicPv(it);
  const d = iconicPayload(name, it);
  const reliance = /High.?Tech|Battle Suit|Cybernetics/i.test(it.origin) ? "Tech Reliance" : /Magic|Mythic|Asgardian|Sorcery/i.test(it.origin) ? "Magic Item Reliance" : "";
  return (
    <Preview title={name || "Unnamed Iconic Item"} subtitle={`Iconic ${TYPES.find(([v]) => v === it.type)?.[1] ?? it.type}${it.owner ? ` · ${it.owner}` : ""}`}>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
        <Stat k="Power Value" v={pv.pv} />
        {it.type === "Weapon" ? <Stat k="Range" v={String(d.range)} /> : null}
        {it.type === "Weapon" ? <Stat k="Attacks with" v={it.abilities.map(abName).join(" / ")} /> : null}
        {it.type === "Weapon" ? <Stat k="Damage" v={it.noDamage ? "none" : d.damageBonus ? `${d.damageBonus} multiplier` : "—"} /> : null}
      </div>
      {it.origin ? <p className="mt-1.5 text-[12px]"><span className={statK}>Grants origin</span> {it.origin}</p> : null}
      {it.powers.length ? <p className="mt-1.5 text-[12px]"><span className={statK}>Grants</span> {it.powers.join(", ")}</p> : null}
      {it.restrictions.length ? <p className="mt-1.5 text-[12px] text-[var(--muted)]"><span className={statK}>Restrictions</span> {it.restrictions.join(", ")}</p> : null}
      {it.special.trim() ? <p className="mt-1.5 text-[12px]">{it.special.trim()}</p> : null}
      <p className={hint}>
        Owning it costs {pv.pv} power pick{pv.pv === 1 ? "" : "s"}{it.type === "Armor" && /Battle Suit/i.test(it.origin) ? " (first one free for a battle suit)" : ""}, less any granted power the hero already has.
        {reliance ? ` Brings ${reliance}.` : ""}
      </p>
    </Preview>
  );
}
