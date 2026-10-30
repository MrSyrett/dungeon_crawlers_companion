"use client";
// ── Dragonbane NPC builder ───────────────────────────────────────────────────
// Storage = DbNpc (lib/data/db-types) — what the bestiary's NPC tab, the GM
// Screen (skills roll D20 ≤ level, weapons roll skill then damage + the damage
// bonus) and the session-prep builder read: kind, boss, movement, damageBonus
// {STR?, AGL?} (posted as strBonus / aglBonus), hp, wp, armor {name, rating},
// skills {name: level}, weapons [{name, skill, damage, qty?}], abilities
// ("Robust ×4"), spells, gear, traits.
// New, optional: attributes {STR…CHA} and auto {hp, wp, dmg}. With Auto on, the
// damage bonus comes from STR / AGL (13–16 +D4, 17+ +D6), HP = CON + 2 per
// Robust and WP = WIL + 2 per Focused — the core rules' NPC conversions, run
// forwards. Old records get attributes derived the book's way (DB_NPC_ATTRIBUTES).
// Weapons are AttackRows (Qty, skill level, damage dice, a note kept in
// parentheses after the name).
import AttackRows, { newAttackRow, type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  DB_ATTRS, DB_DICE, DB_NPC_KINDS, DB_SKILLS, attrFromBonus, dmgBonusOf, fmtDb, npcHp, npcWp, parseDb, abilityCount, type DbAttr,
} from "./rules";
import { Cell, NamePicker, RowCtl, Select, Toggle, addBtn, fieldCls, useDbData } from "./ui";

type Data = Record<string, unknown>;
type SkillRow = { name: string; level: number };
export type NpcDraft = {
  kind: string; boss: boolean; movement: number; attrs: Record<DbAttr, number>;
  autoDmg: boolean; strBonus: string; aglBonus: string; autoHp: boolean; hp: number; usesWp: boolean; autoWp: boolean; wp: number;
  armorName: string; armorRating: number; skills: SkillRow[]; weapons: AttackRow[];
  abilities: string[]; spells: string[]; gear: string[]; traits: string[];
};
const baseAttrs = (): Record<DbAttr, number> => ({ STR: 10, CON: 10, AGL: 10, INT: 10, WIL: 10, CHA: 10 });
export const blankNpc = (): NpcDraft => ({
  kind: "Human", boss: false, movement: 10, attrs: baseAttrs(), autoDmg: true, strBonus: "", aglBonus: "", autoHp: true, hp: 10, usesWp: false, autoWp: true, wp: 10,
  armorName: "", armorRating: 0, skills: [{ name: "Awareness", level: 10 }, { name: "Evade", level: 10 }], weapons: [], abilities: [], spells: [], gear: [], traits: [],
});
const strs = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map(String).filter(Boolean) : []);
const toRow = (w: Data): AttackRow => {
  const m = String(w.name ?? "").match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  const p = parseDb(w.damage);
  return {
    ...newAttackRow(), name: m ? m[1] : String(w.name ?? ""), special: m ? m[2] : "", count: Number(w.qty) || 1,
    hit: Number.isFinite(Number(w.skill)) ? Number(w.skill) : 10, dice: p ? { n: p.n, d: p.d, m: 0 } : { n: 1, d: 6, m: 0 },
    extra: p && !p.xn ? undefined : w.damage ? { dmgText: String(w.damage) } : undefined,
  };
};
export function npcFromData(d: Data): NpcDraft {
  const b = blankNpc();
  const db = (d.damageBonus ?? {}) as Data, ar = (d.armor ?? null) as Data | null;
  const abilities = strs(d.abilities);
  const at = (d.attributes ?? null) as Data | null;
  const hp = Number(d.hp) || 10, wp = d.wp == null || d.wp === "" ? null : Number(d.wp);
  const attrs = baseAttrs();
  if (at) DB_ATTRS.forEach((k) => { if (Number(at[k])) attrs[k] = Number(at[k]); });
  else {
    attrs.STR = attrFromBonus(db.STR ?? d.strBonus); attrs.AGL = attrFromBonus(db.AGL ?? d.aglBonus);
    attrs.CON = Math.max(1, hp - 2 * abilityCount(abilities, "Robust"));
    attrs.WIL = wp == null ? 10 : Math.max(1, wp - 2 * abilityCount(abilities, "Focused"));
  }
  const auto = (d.auto ?? null) as Data | null;
  const inRange = (n: number) => n >= 1 && n <= 30;
  const skIn = Array.isArray(d.skills) ? (d.skills as Data[]).map((x) => [x.name, x.level]) : Object.entries((d.skills ?? {}) as Data);
  return {
    ...b, kind: String(d.kind ?? "Human"), boss: !!d.boss, movement: Number(d.movement) || 10, attrs,
    autoDmg: auto ? !!auto.dmg : true, strBonus: String(db.STR ?? ""), aglBonus: String(db.AGL ?? ""),
    autoHp: auto ? !!auto.hp : inRange(attrs.CON), hp, usesWp: wp != null, autoWp: auto ? !!auto.wp : inRange(attrs.WIL), wp: wp ?? 10,
    armorName: String(ar?.name ?? ""), armorRating: Number(ar?.rating) || 0,
    skills: skIn.map(([n, l]) => ({ name: String(n), level: Number(l) || 10 })), weapons: (Array.isArray(d.weapons) ? (d.weapons as Data[]) : []).map(toRow),
    abilities, spells: strs(d.spells), gear: strs(d.gear), traits: strs(d.traits),
  };
}
const derived = (n: NpcDraft) => ({
  strBonus: n.autoDmg ? dmgBonusOf(n.attrs.STR) : n.strBonus, aglBonus: n.autoDmg ? dmgBonusOf(n.attrs.AGL) : n.aglBonus,
  hp: n.autoHp ? npcHp(n.attrs.CON, n.abilities) : n.hp, wp: !n.usesWp ? null : n.autoWp ? npcWp(n.attrs.WIL, n.abilities) : n.wp,
});
const wDamage = (r: AttackRow) => r.extra?.dmgText?.trim() || fmtDb({ n: Math.max(1, r.dice.n), d: r.dice.d, xn: 0, xd: 6 });
const wName = (r: AttackRow) => `${r.name.trim() || "Weapon"}${r.special.trim() ? ` (${r.special.trim()})` : ""}`;
export function npcPayload(name: string, n: NpcDraft): Data {
  const x = derived(n);
  return {
    name, kind: n.kind, boss: n.boss, movement: n.movement, attributes: n.attrs, auto: { hp: n.autoHp, wp: n.autoWp, dmg: n.autoDmg },
    strBonus: x.strBonus, aglBonus: x.aglBonus, hp: x.hp, wp: x.wp, armorName: n.armorName, armorRating: n.armorRating,
    skills: n.skills.filter((s) => s.name), weapons: n.weapons.map((r) => ({ name: wName(r), skill: r.hit ?? 10, damage: wDamage(r), qty: r.count > 1 ? r.count : undefined })),
    abilities: n.abilities, spells: n.spells, gear: n.gear, traits: n.traits,
  };
}
const baseChance = (v: number) => (v <= 5 ? 3 : v <= 8 ? 4 : v <= 12 ? 5 : v <= 15 ? 6 : 7);
const bonusTxt = (s: string, a: string) => [s ? `STR +${s}` : "", a ? `AGL +${a}` : ""].filter(Boolean).join(", ") || "—";

export default function NpcBuilder({ value: n, onChange }: { value: NpcDraft; onChange: (v: NpcDraft) => void }) {
  const set = (p: Partial<NpcDraft>) => onChange({ ...n, ...p });
  const D = useDbData();
  const x = derived(n);
  const attrOf = (sk: string) => String(D?.skills.find((s) => s.name === sk)?.attribute ?? "") as DbAttr | "";
  const repeatable = (nm: string) => !!D?.abilities.find((a) => a.name === nm)?.repeatable || /^(Robust|Focused)$/i.test(nm);
  const addBook = (nm: string) => {
    const w = D?.weapons.find((y) => y.name === nm); if (!w) return;
    const p = parseDb(w.damage);
    const lvl = n.skills.find((s) => s.name === w.skill)?.level ?? 10;
    set({ weapons: [...n.weapons, { ...newAttackRow(), name: w.name, hit: lvl, dice: p ? { n: p.n, d: p.d, m: 0 } : { n: 1, d: 6, m: 0 } }] });
  };
  return (
    <>
      <Cell label="Group">
        <input className={fieldCls} list="db-npc-kinds" value={n.kind} maxLength={40} onChange={(e) => set({ kind: e.target.value })} />
        <datalist id="db-npc-kinds">{DB_NPC_KINDS.map((k) => <option key={k} value={k} />)}</datalist>
      </Cell>
      <Cell label="Role" help="Bosses draw their own initiative card and use WP and heroic abilities.">
        <span className="flex flex-wrap items-center gap-3">
          <Toggle checked={n.boss} onChange={(v) => set({ boss: v, usesWp: v || n.usesWp })}>Boss</Toggle>
          <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">Movement <Stepper value={n.movement} min={0} max={40} step={2} width="2.2em" ariaLabel="movement" onChange={(v) => set({ movement: v ?? 10 })} /></span>
        </span>
      </Cell>
      <Cell label="Attributes" className="sm:col-span-2" help="NPC stat blocks don't print attributes; they set the derived values below when Auto is on.">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {DB_ATTRS.map((k) => (
            <label key={k} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-bold tracking-[0.12em] text-[var(--muted)]">{k}</span>
              <Stepper value={n.attrs[k]} min={1} max={30} width="2.2em" ariaLabel={k} onChange={(v) => set({ attrs: { ...n.attrs, [k]: v ?? 10 } })} />
            </label>
          ))}
        </div>
      </Cell>
      <Cell label="Damage bonus" help={n.autoDmg ? "From STR / AGL: 13–16 +D4, 17+ +D6." : undefined}>
        <span className="flex flex-wrap items-center gap-2">
          <Toggle checked={n.autoDmg} onChange={(v) => set({ autoDmg: v, strBonus: x.strBonus, aglBonus: x.aglBonus })}>Auto</Toggle>
          {n.autoDmg ? <span className="text-[13px]">{bonusTxt(x.strBonus, x.aglBonus)}</span> : (
            <>
              <span className="text-[12px] text-[var(--muted)]">STR</span><Select value={n.strBonus} options={[["", "—"], ["D4", "+D4"], ["D6", "+D6"]]} ariaLabel="STR bonus" onChange={(v) => set({ strBonus: v })} />
              <span className="text-[12px] text-[var(--muted)]">AGL</span><Select value={n.aglBonus} options={[["", "—"], ["D4", "+D4"], ["D6", "+D6"]]} ariaLabel="AGL bonus" onChange={(v) => set({ aglBonus: v })} />
            </>
          )}
        </span>
      </Cell>
      <Cell label="Hit points" help={n.autoHp ? "CON + 2 per Robust." : undefined}>
        <span className="flex items-center gap-2">
          <Toggle checked={n.autoHp} onChange={(v) => set({ autoHp: v, hp: x.hp })}>Auto</Toggle>
          {n.autoHp ? <b className="font-mono">{x.hp}</b> : <Stepper value={n.hp} min={1} max={999} width="2.8em" ariaLabel="HP" onChange={(v) => set({ hp: v ?? 1 })} />}
        </span>
      </Cell>
      <Cell label="Willpower points" help={n.usesWp && n.autoWp ? "WIL + 2 per Focused." : "Minions rarely use WP."}>
        <span className="flex flex-wrap items-center gap-2">
          <Toggle checked={n.usesWp} onChange={(v) => set({ usesWp: v })}>Has WP</Toggle>
          {n.usesWp ? (<>
            <Toggle checked={n.autoWp} onChange={(v) => set({ autoWp: v, wp: x.wp ?? n.wp })}>Auto</Toggle>
            {n.autoWp ? <b className="font-mono">{x.wp}</b> : <Stepper value={n.wp} min={0} max={99} width="2.4em" ariaLabel="WP" onChange={(v) => set({ wp: v ?? 0 })} />}
          </>) : null}
        </span>
      </Cell>
      <Cell label="Armor">
        <span className="flex flex-wrap items-center gap-2">
          <input className={`${fieldCls} max-w-[170px]`} list="db-npc-armor" value={n.armorName} maxLength={60} placeholder="Leather"
            onChange={(e) => { const a = [...(D?.armor ?? []), ...(D?.helmets ?? [])].find((y) => y.name === e.target.value); set({ armorName: e.target.value, ...(a ? { armorRating: Number(a.rating) || 0 } : {}) }); }} />
          <datalist id="db-npc-armor">{(D?.armor ?? []).map((a) => <option key={a.name} value={a.name} />)}</datalist>
          <Stepper value={n.armorRating} min={0} max={12} width="2em" ariaLabel="armor rating" onChange={(v) => set({ armorRating: v ?? 0 })} />
        </span>
      </Cell>
      <Cell label="Skills" className="sm:col-span-2" help="Unlisted skills are 5. The hint is the base chance from the attribute.">
        <div className="flex flex-col gap-1.5">
          {n.skills.map((s, i) => {
            const at = attrOf(s.name);
            return (
              <div key={i} className={styles.atkLine}>
                <Select value={s.name} options={[...DB_SKILLS, "Magic School"]} ariaLabel="skill" onChange={(v) => set({ skills: n.skills.map((y, j) => (j === i ? { ...y, name: v } : y)) })} />
                <Stepper value={s.level} min={1} max={18} width="2.2em" ariaLabel={`${s.name} level`} onChange={(v) => set({ skills: n.skills.map((y, j) => (j === i ? { ...y, level: v ?? 10 } : y)) })} />
                {at ? <span className="self-center text-[11px] text-[var(--muted)]">{at} {n.attrs[at]} · base {baseChance(n.attrs[at])}</span> : null}
                <RowCtl rows={n.skills} i={i} onChange={(r) => set({ skills: r })} />
              </div>
            );
          })}
          {n.skills.length < 20 ? <button type="button" className={`${addBtn} self-start`} onClick={() => set({ skills: [...n.skills, { name: DB_SKILLS.find((k) => !n.skills.some((s) => s.name === k)) ?? "Awareness", level: 10 }] })}>+ Skill</button> : null}
        </div>
      </Cell>
      <Cell label="Weapons" className="sm:col-span-2" help={`Rolled as D20 ≤ skill, then damage${x.strBonus || x.aglBonus ? ` + the damage bonus (${bonusTxt(x.strBonus, x.aglBonus)})` : ""}.`}>
        <AttackRows rows={n.weapons} onChange={(r) => set({ weapons: r })} count={{ min: 1, max: 4, label: "Qty" }} hit={{ label: "Skill", min: 1, max: 18 }}
          dice={DB_DICE} mod={false} hitSigned={false} diePrefix="D" namePh="Broadsword" specialPh="Note shown after the name (e.g. ignores armor)" max={6} addLabel="+ Weapon"
          blank={() => newAttackRow({ hit: 10, dice: { n: 1, d: 8, m: 0 } })}
          slot={(r, patch) => r.extra?.dmgText ? (
            <span className="flex items-center gap-1 self-center text-[11px] text-[var(--muted)]">kept damage “{r.extra.dmgText}”
              <span role="button" tabIndex={0} className={styles.iconBtn} style={{ width: "auto", padding: "0 6px" }} onClick={() => patch({ extra: { ...r.extra, dmgText: "" } })}>use dice</span></span>
          ) : null} />
        {D ? (
          <div className="mt-2"><Select value="" options={[["", "+ Book weapon…"], ...D.weapons.filter((w) => !w.natural).map((w) => [w.name, `${w.name} (${String(w.damage)})`] as [string, string])]} ariaLabel="book weapon" onChange={addBook} /></div>
        ) : null}
      </Cell>
      <Cell label="Heroic abilities" className="sm:col-span-2" help="Robust adds 2 HP and Focused 2 WP per copy (used by Auto).">
        <NamePicker value={n.abilities} onChange={(v) => set({ abilities: v })} options={(D?.abilities ?? []).map((a) => ({ name: a.name, meta: a.wp == null ? "passive" : `${String(a.wp)} WP` }))} count={repeatable} placeholder="Search heroic abilities…" />
      </Cell>
      <Cell label="Spells" className="sm:col-span-2">
        <NamePicker value={n.spells} onChange={(v) => set({ spells: v })} options={[...(D?.spells ?? []), ...(D?.tricks ?? [])].map((s) => ({ name: s.name, meta: `${String(s.school)}${s.rank ? ` ${String(s.rank)}` : " trick"}` }))} placeholder="Search spells & tricks…" />
      </Cell>
      <Cell label="Gear" className="sm:col-span-2">
        <NamePicker value={n.gear} onChange={(v) => set({ gear: v })} options={[...(D?.gear ?? []), ...(D?.weapons ?? []), ...(D?.armor ?? [])].map((g) => ({ name: g.name }))} placeholder="Search gear…" />
      </Cell>
      <Cell label="Traits" className="sm:col-span-2">
        <ChipPicker options={Object.keys(D?.npcTraits ?? { Nocturnal: "", Skeleton: "", "Non-Monster": "", Large: "" })} value={n.traits} custom onChange={(v) => set({ traits: v })} />
      </Cell>
    </>
  );
}

export function NpcPreview({ name, n }: { name: string; n: NpcDraft }) {
  const x = derived(n);
  const sk = n.skills.filter((s) => s.name).map((s) => `${s.name} ${s.level}`).join(", ");
  return (
    <Preview title={name || "Unnamed NPC"} subtitle={`${n.kind || "NPC"}${n.boss ? " · boss" : ""}`}>
      <div className="mb-2 grid grid-cols-4 gap-1 text-center">
        {[["Mov", n.movement], ["Dmg bonus", bonusTxt(x.strBonus, x.aglBonus)], ["HP", x.hp], ["WP", x.wp ?? "—"]].map(([k, v]) => (
          <div key={String(k)} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-0.5 py-1">
            <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{k}</div>
            <div className="font-mono text-[11.5px] font-bold">{v}</div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-[var(--muted)]">{DB_ATTRS.map((k) => `${k} ${n.attrs[k]}`).join(" · ")}</p>
      <dl className="mt-1 flex flex-col gap-0.5 text-[12px]">
        {n.armorName || n.armorRating ? <div><b>Armor:</b> {n.armorName || "Armor"} ({n.armorRating})</div> : null}
        {sk ? <div><b>Skills:</b> {sk}</div> : null}
        {n.abilities.length ? <div><b>Heroic abilities:</b> {n.abilities.join(", ")}</div> : null}
        {n.spells.length ? <div><b>Spells:</b> {n.spells.join(", ")}</div> : null}
        {n.weapons.length ? <div><b>Weapons:</b> {n.weapons.map((r) => `${r.count > 1 ? `${r.count}× ` : ""}${wName(r)} (skill ${r.hit ?? 10}, ${wDamage(r)})`).join("; ")}</div> : null}
        {n.gear.length ? <div><b>Gear:</b> {n.gear.join(", ")}</div> : null}
        {n.traits.length ? <div><b>Traits:</b> {n.traits.join(", ")}</div> : null}
      </dl>
    </Preview>
  );
}
