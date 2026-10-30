"use client";
// ── Dragonbane monster builder ───────────────────────────────────────────────
// Storage = DbMonster (lib/data/db-types) — the shape the /dragonbane/bestiary
// page, the GM Screen (dbBestiary → combat tracker: Ferocity cards, a 1d6
// monster-attack button over the table) and the session-prep builder read:
//   ferocity 1–6, size, movement, flying, swimming, armor (number | null),
//   hp, category, persuadable, resistances / immunities / weaknesses, traits
//   [{name, text}], text, and attacks — the D6 monster-attack table, each
//   {roll, name, damage ("2D8+D6" | null), type, targets, range, fear
//   (bool | "bane"), conditions, prone, parry, dodge (bool | "bane"),
//   ignoresArmor?, poison? {type, potency}, text, rolls? [lo, hi]}.
// The table is always six rows (or three, each covering two faces —
// attackRolls). Damage, type, targets, range and riders are picked; a blank
// effect text is composed from them so the GM Screen always has a line.
import { Fragment, type ReactNode } from "react";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  DB_CONDITIONS, DB_DMG_TYPES, DB_MON_CATEGORIES, DB_MON_IMMUNE, DB_MON_RESIST, DB_MON_TRAITS, DB_POISONS, DB_SIZES, DB_TARGETS, THREE_ROLLS,
  attackFromData, attackTags, blankAttack, composeAttack, composeAttackText, type MonAttackDraft,
} from "./rules";
import { Cell, DmgInput, RowCtl, Select, Toggle, addBtn, fieldCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
type Trait = { name: string; text: string };
export type MonsterDraft = {
  ferocity: number; size: string; movement: number; flying: boolean; swimming: boolean; armor: number | null; armorText: string; hp: number;
  category: string; persuadable: boolean; resistances: string[]; immunities: string[]; weaknesses: string[];
  three: boolean; attacks: MonAttackDraft[]; traits: Trait[]; text: string;
};
const six = () => Array.from({ length: 6 }, (_, i) => blankAttack(i));
export const blankMonster = (): MonsterDraft => ({
  ferocity: 1, size: "Normal", movement: 10, flying: false, swimming: false, armor: null, armorText: "", hp: 20, category: "Monsters",
  persuadable: false, resistances: [], immunities: [], weaknesses: [], three: false, attacks: six(), traits: [], text: "",
});
const list = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map(String).filter(Boolean) : []);
export function monsterFromData(d: Data): MonsterDraft {
  const b = blankMonster();
  const atk = (Array.isArray(d.attacks) ? (d.attacks as Data[]) : []).map(attackFromData);
  const three = Array.isArray(d.attackRolls) || (atk.length === 3 && (d.attacks as Data[]).some((a) => Array.isArray(a.rolls)));
  const n = three ? 3 : 6;
  while (atk.length < n) atk.push(blankAttack(1));
  const ar = d.armor;
  return {
    ...b, ferocity: Number(d.ferocity) || 1, size: String(d.size ?? "Normal"), movement: Number(d.movement) || 0, flying: !!d.flying, swimming: !!d.swimming,
    armor: typeof ar === "number" ? ar : /^\d+$/.test(String(ar ?? "")) ? Number(ar) : null, armorText: ar != null && typeof ar !== "number" && !/^\d+$/.test(String(ar)) ? String(ar) : "",
    hp: Number(d.hp) || 1, category: String(d.category ?? "Monsters"), persuadable: !!d.persuadable,
    resistances: list(d.resistances), immunities: list(d.immunities), weaknesses: list(d.weaknesses),
    three, attacks: atk.slice(0, Math.max(n, atk.length)), traits: (Array.isArray(d.traits) ? (d.traits as Data[]) : []).map((t) => ({ name: String(t.name ?? ""), text: String(t.text ?? "") })),
    text: String(d.text ?? ""),
  };
}
export function monsterPayload(name: string, m: MonsterDraft): Data {
  // Untouched rows (no name, damage or text) are left out, so an old 2-attack record stays 2 attacks.
  const rows = m.attacks.slice(0, m.three ? 3 : 6).filter((a) => a.name.trim() || a.text.trim() || a.dmg.n > 0 || a.dmgText.trim());
  const attacks = rows.map((a, i) => composeAttack(a, i, m.three ? THREE_ROLLS[i] : undefined));
  return {
    name, ferocity: m.ferocity, size: m.size, movement: m.movement, flying: m.flying, swimming: m.swimming,
    armor: m.armorText.trim() || (m.armor == null ? "" : String(m.armor)), hp: m.hp, category: m.category, persuadable: m.persuadable,
    resistances: m.resistances, immunities: m.immunities, weaknesses: m.weaknesses, attackRolls: m.three ? THREE_ROLLS : null,
    traits: m.traits.filter((t) => t.name.trim() || t.text.trim()), text: m.text, attacks,
  };
}
const rollLabel = (m: MonsterDraft, i: number) => (m.three ? `${THREE_ROLLS[i][0]}–${THREE_ROLLS[i][1]}` : String(i + 1));

function AttackRow({ a, onChange, label }: { a: MonAttackDraft; onChange: (a: MonAttackDraft) => void; label: string }) {
  const set = (p: Partial<MonAttackDraft>) => onChange({ ...a, ...p });
  const needsN = DB_TARGETS.find(([k]) => k === a.target.kind)?.[2];
  const cell = (l: string, c: ReactNode, grow = false) => <label className={`${styles.atkCell} ${grow ? styles.atkGrow : ""}`}><span className={styles.atkLbl}>{l}</span>{c}</label>;
  return (
    <div className={styles.atkRow}>
      <div className={styles.atkLine}>
        <span className="self-center font-mono text-[15px] font-bold text-[var(--hb-accent)]" style={{ minWidth: "2.2em" }}>{label}</span>
        {cell("Name", <input className={`${fieldCls} h-[34px] py-0`} value={a.name} maxLength={80} placeholder="Claw Attack" onChange={(e) => set({ name: e.target.value })} />, true)}
        {cell("Damage", a.dmgText ? (
          <span className="flex items-center gap-1"><input className={`${fieldCls} h-[34px] w-[110px] py-0`} value={a.dmgText} maxLength={40} onChange={(e) => set({ dmgText: e.target.value })} /><button type="button" className={smallBtn} onClick={() => set({ dmgText: "" })}>dice</button></span>
        ) : <DmgInput value={a.dmg} allowNone onChange={(v) => set({ dmg: v })} />)}
        {a.dmg.n > 0 || a.dmgText ? cell("Type", <Select value={a.type} options={[["", "—"], ...DB_DMG_TYPES.map((x) => [x, x] as [string, string])]} ariaLabel="damage type" onChange={(v) => set({ type: v })} />) : null}
      </div>
      <div className={`${styles.atkLine} mt-2`}>
        {cell("Targets", (
          <span className="flex items-center gap-1">
            <Select value={a.target.kind} options={DB_TARGETS.map(([k, l]) => [k, l] as [string, string])} ariaLabel="targets" onChange={(v) => set({ target: { ...a.target, kind: v }, ...(DB_TARGETS.find(([k]) => k === v)?.[2] ? { range: Math.max(a.range, a.target.n) } : {}) })} />
            {needsN ? <Stepper value={a.target.n} min={1} max={100} width="2.2em" ariaLabel="target meters" onChange={(v) => set({ target: { ...a.target, n: v ?? 10 }, range: Math.max(a.range === a.target.n ? 0 : a.range, v ?? 10) })} /> : null}
            {a.target.kind === "text" ? <input className={`${fieldCls} h-[34px] w-[200px] py-0`} value={a.target.text} maxLength={60} placeholder="opponent with the highest STR" onChange={(e) => set({ target: { ...a.target, text: e.target.value } })} /> : null}
          </span>
        ))}
        {cell("Range (m)", <Stepper value={a.range} min={0} max={200} width="2.4em" ariaLabel="range" onChange={(v) => set({ range: v ?? 2 })} />)}
        {cell("Fear", <Select value={a.fear} options={[["", "No"], ["yes", "Fear attack"], ["bane", "Fear (bane)"]]} ariaLabel="fear" onChange={(v) => set({ fear: v as MonAttackDraft["fear"] })} />)}
        {cell("Dodge", <Select value={a.dodge} options={[["yes", "Can dodge"], ["bane", "Dodge w/ bane"], ["no", "Can't dodge"]]} ariaLabel="dodge" onChange={(v) => set({ dodge: v as MonAttackDraft["dodge"] })} />)}
      </div>
      <div className={`${styles.atkLine} mt-2`}>
        <Toggle checked={a.parry} onChange={(v) => set({ parry: v })}>Can be parried</Toggle>
        <Toggle checked={a.prone} onChange={(v) => set({ prone: v })}>Knocks down</Toggle>
        <Toggle checked={a.ignoresArmor} onChange={(v) => set({ ignoresArmor: v })}>Armor no effect</Toggle>
        <Toggle checked={!!a.poison} onChange={(v) => set({ poison: v ? { type: "lethal", potency: 12 } : null })}>Poison</Toggle>
        {a.poison ? (
          <span className="flex items-center gap-1">
            <Select value={a.poison.type} options={DB_POISONS} ariaLabel="poison type" onChange={(v) => set({ poison: { ...a.poison!, type: v } })} />
            <span className="text-[11px] text-[var(--muted)]">potency</span>
            <Stepper value={a.poison.potency} min={1} max={30} width="2.2em" ariaLabel="potency" onChange={(v) => set({ poison: { ...a.poison!, potency: v ?? 12 } })} />
          </span>
        ) : null}
      </div>
      <div className="mt-2"><span className={styles.atkLbl}>Conditions</span><ChipPicker options={DB_CONDITIONS} value={a.conditions} onChange={(v) => set({ conditions: v })} /></div>
      <textarea className={`${fieldCls} mt-2 min-h-[54px]`} maxLength={2000} value={a.text} placeholder={composeAttackText(a)} aria-label="effect" onChange={(e) => set({ text: e.target.value })} />
    </div>
  );
}

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (v: MonsterDraft) => void }) {
  const set = (p: Partial<MonsterDraft>) => onChange({ ...m, ...p });
  const n = m.three ? 3 : 6;
  const setThree = (three: boolean) => {
    const atk = m.attacks.slice(); while (atk.length < (three ? 3 : 6)) atk.push(blankAttack(1));
    set({ three, attacks: atk });
  };
  return (
    <>
      <Cell label="Ferocity" help="Initiative cards it draws (and actions) each round.">
        <Stepper value={m.ferocity} min={1} max={6} width="2em" ariaLabel="ferocity" onChange={(v) => set({ ferocity: v ?? 1 })} />
      </Cell>
      <Cell label="Size"><ChipPicker single options={DB_SIZES} value={[m.size]} onChange={(v) => v[0] && set({ size: v[0] })} /></Cell>
      <Cell label="Hit points"><Stepper value={m.hp} min={1} max={999} width="3em" ariaLabel="HP" onChange={(v) => set({ hp: v ?? 1 })} /></Cell>
      <Cell label="Armor" help="Natural armor rating. Blank = none.">
        {m.armorText ? (
          <span className="flex items-center gap-2"><input className={`${fieldCls} max-w-[140px]`} value={m.armorText} maxLength={40} onChange={(e) => set({ armorText: e.target.value })} /><button type="button" className={smallBtn} onClick={() => set({ armorText: "" })}>Number</button></span>
        ) : <Stepper value={m.armor} min={0} max={20} nullable width="2.2em" ariaLabel="armor" onChange={(v) => set({ armor: v })} />}
      </Cell>
      <Cell label="Movement">
        <span className="flex flex-wrap items-center gap-3">
          <Stepper value={m.movement} min={0} max={100} step={2} width="2.4em" ariaLabel="movement" onChange={(v) => set({ movement: v ?? 0 })} />
          <Toggle checked={m.flying} onChange={(v) => set({ flying: v })}>Flies</Toggle>
          <Toggle checked={m.swimming} onChange={(v) => set({ swimming: v })}>Swims</Toggle>
        </span>
      </Cell>
      <Cell label="Category" help="Which Bestiary family it is filed under.">
        <Select value={m.category} options={DB_MON_CATEGORIES} ariaLabel="category" onChange={(v) => set({ category: v })} />
        <div className="mt-2"><Toggle checked={m.persuadable} onChange={(v) => set({ persuadable: v })}>Can be persuaded (with a bane)</Toggle></div>
      </Cell>
      <Cell label="Resistances (damage halved)" className="sm:col-span-2"><ChipPicker options={DB_MON_RESIST} value={m.resistances} custom onChange={(v) => set({ resistances: v })} /></Cell>
      <Cell label="Immunities" className="sm:col-span-2"><ChipPicker options={DB_MON_IMMUNE} value={m.immunities} custom onChange={(v) => set({ immunities: v })} /></Cell>
      <Cell label="Weaknesses" className="sm:col-span-2"><ChipPicker options={["fire (double damage)", "silver", "Light as bright as direct sunlight"]} value={m.weaknesses} custom onChange={(v) => set({ weaknesses: v })} /></Cell>
      <Cell label="Monster attacks (D6 table)" className="sm:col-span-2" help="Monster attacks hit automatically. Roll or choose each turn — never the same attack twice in a row (a repeat becomes the next entry). Leave an effect blank and it's written for you from the pickers.">
        <div className="mb-2"><ChipPicker single options={[["6", "Six attacks (1–6)"], ["3", "Three attacks (1–2 · 3–4 · 5–6)"]]} value={[m.three ? "3" : "6"]} onChange={(v) => v[0] && setThree(v[0] === "3")} /></div>
        <div className={styles.atkList}>
          {m.attacks.slice(0, n).map((a, i) => (
            <div key={i} className="flex flex-col gap-1">
              <AttackRow a={a} label={rollLabel(m, i)} onChange={(x) => set({ attacks: m.attacks.map((y, j) => (j === i ? x : y)) })} />
              <div className="flex justify-end"><RowCtl rows={m.attacks.slice(0, n)} i={i} remove={false} onChange={(r) => set({ attacks: [...r, ...m.attacks.slice(n)] })} /></div>
            </div>
          ))}
        </div>
      </Cell>
      <Cell label="Traits" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          {m.traits.map((t, i) => (
            <div key={i} className={styles.atkRow}>
              <div className={styles.atkLine}>
                <input className={`${fieldCls} h-[34px] max-w-[240px] py-0`} list="db-mon-traits" value={t.name} maxLength={80} placeholder="Trait name" onChange={(e) => set({ traits: m.traits.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} />
                <RowCtl rows={m.traits} i={i} onChange={(r) => set({ traits: r })} />
              </div>
              <textarea className={`${fieldCls} mt-2 min-h-[50px]`} maxLength={2000} value={t.text} placeholder="What it does" onChange={(e) => set({ traits: m.traits.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })} />
            </div>
          ))}
          <datalist id="db-mon-traits">{DB_MON_TRAITS.map((x) => <option key={x} value={x} />)}</datalist>
          {m.traits.length < 12 ? <button type="button" className={`${addBtn} self-start`} onClick={() => set({ traits: [...m.traits, { name: "", text: "" }] })}>+ Trait</button> : null}
        </div>
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} maxLength={3000} value={m.text} onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const n = m.three ? 3 : 6;
  const extra = [...m.resistances.map((r) => `Resistance: ${r}`), ...m.immunities.map((r) => `Immunity: ${r}`), ...m.weaknesses.map((r) => `Weakness: ${r}`)];
  return (
    <Preview title={name || "Unnamed monster"} subtitle={`${m.category} · ${m.size}${m.persuadable ? " · persuadable" : ""}`}>
      <div className="mb-2 grid grid-cols-5 gap-1 text-center">
        {[["Ferocity", m.ferocity], ["Size", m.size], ["Move", `${m.movement}${m.flying ? " fly" : ""}${m.swimming ? " swim" : ""}`], ["Armor", m.armorText || (m.armor ?? "—")], ["HP", m.hp]].map(([k, v]) => (
          <div key={String(k)} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-0.5 py-1">
            <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{k}</div>
            <div className="font-mono text-[12px] font-bold">{v}</div>
          </div>
        ))}
      </div>
      {m.traits.filter((t) => t.name).map((t, i) => <p key={i} className="text-[12px]"><b><i>{t.name}.</i></b> <span className="text-[var(--muted)]">{t.text}</span></p>)}
      {extra.length ? <p className="text-[11.5px] text-[var(--muted)]">{extra.join(" · ")}</p> : null}
      <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Monster attacks (D6)</div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[12px]">
        {m.attacks.slice(0, n).map((a, i) => (
          <Fragment key={i}>
            <dt className="font-mono font-bold text-[var(--hb-accent)]">{rollLabel(m, i)}</dt>
            <dd><b>{a.name || `Attack ${i + 1}`}!</b> <span className="text-[10.5px] uppercase tracking-[0.06em] text-[var(--muted)]">{attackTags(a).join(" · ")}</span>
              <div className="text-[11.5px] text-[var(--muted)]">{a.text || composeAttackText(a)}</div></dd>
          </Fragment>
        ))}
      </dl>
      {m.attacks.slice(0, n).some((a) => !a.name.trim()) ? <p className="mt-1 text-[11px] italic text-[var(--muted)]">Name every row — the table needs {n} attacks.</p> : null}
    </Preview>
  );
}
