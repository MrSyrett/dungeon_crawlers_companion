"use client";
// ── Pirate Borg homebrew creature / NPC builder ──────────────────────────────
// Storage = the PB_MONSTERS book shape (lib/data/pb-types PbMonster) that the
// /pirate-borg/bestiary page, the GM Screen (xsMonSummary 'pb': attack buttons
// roll the damage the PC takes when their defense fails; Morale 2d6 button;
// hpDice / moraleDice rolled when it joins the tracker), pb-gm-tables.js and
// the PB session prep builder read:
//   category, group, hp, hpText / hpDice, morale (null = "–" never breaks),
//   moraleText / moraleDice, count, armor {name, die, tier}, dr {attack,
//   defend} (only when not 12), defendWith, attacksPerRound, attackChoice,
//   attacks [{name, damage, notes}], specials [{name, text}], loot, naval
//   {hp, morale, armor, speed, agility, attacks}, blackPowder, ignoresArmor,
//   boss, text
// New builder data: attackRows / navalAttackRows (AttackRow[], see rules) —
// lib/homebrew.ts composes `attacks` / `naval.attacks` from them. Old records
// open through parsePbAttack (anything that wouldn't re-compose exactly stays
// in the row's rider text, so nothing is lost; all 236 book attacks round-trip).
import AttackRows, { type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import type { Dice } from "../dice";
import {
  PB_ABILITIES, PB_AB_SHORT, PB_DICE, PB_ENEMY_SPECIALS, PB_MON_ARMOR_DICE, PB_MON_CATS, PB_MORALE_LABELS, armorTierOf, composePbAttacks, fmtPb,
  hpBand, newPbAttack, parsePb, parsePbAttack, type PbAttack,
} from "./rules";
import { Cell, RowCtl, Select, Toggle, addBtn, fieldCls, hint, selCls, smallBtn } from "./ui";

type Data = Record<string, unknown>;
type Named = { name: string; text: string };
type Loot = { name: string; value: string; note?: string };
export type NavalDraft = { hp: number; morale: string; armorName: string; armorDie: string; speed: number; agility: number; attacks: AttackRow[] };
export type MonsterDraft = {
  category: string; group: string;
  hp: number; hpRolled: boolean; hpDice: Dice; hpNote: string;
  morale: number | null; moraleRolled: boolean; moraleDice: Dice; moraleNote: string;
  count: Dice; countText: string;
  armorName: string; armorDie: string; drAttack: number; drDefend: number; defendWith: string;
  apr: string; attackChoice: string; blackPowder: boolean; ignoresArmor: boolean; boss: boolean;
  attacks: AttackRow[]; specials: Named[]; loot: Loot[]; naval: NavalDraft | null; text: string;
};

const int = (v: unknown, d: number) => { const n = parseInt(String(v ?? "").replace(/^[−–]/, "-"), 10); return Number.isFinite(n) ? n : d; };
const avg = (x: Dice) => Math.max(1, Math.floor((x.n * (x.d + 1)) / 2 + x.m));
const rowsOf = (rows: unknown, legacy: unknown): AttackRow[] =>
  Array.isArray(rows) ? (rows as AttackRow[]).map((r) => ({ ...newPbAttack(), ...r, extra: { ...newPbAttack().extra, ...(r.extra ?? {}) } }))
    : (Array.isArray(legacy) ? (legacy as PbAttack[]) : []).map(parsePbAttack);
const diceStr = (v: unknown) => { const d = parsePb(v); return d && (d.n > 0) ? d : null; };

export function blankMonster(): MonsterDraft {
  return {
    category: "monster", group: "", hp: 8, hpRolled: false, hpDice: { n: 2, d: 6, m: 0 }, hpNote: "",
    morale: 7, moraleRolled: false, moraleDice: { n: 1, d: 6, m: 6 }, moraleNote: "", count: { n: 0, d: 6, m: 0 }, countText: "",
    armorName: "", armorDie: "", drAttack: 12, drDefend: 12, defendWith: "AGILITY", apr: "1", attackChoice: "",
    blackPowder: false, ignoresArmor: false, boss: false,
    attacks: [newPbAttack({ name: "Cutlass", dice: { n: 1, d: 6, m: 0 } })], specials: [], loot: [], naval: null, text: "",
  };
}
export function monsterFromData(d: Data): MonsterDraft {
  const b = blankMonster();
  const ar = (d.armor ?? null) as { name?: string; die?: string } | null;
  const dr = (d.dr ?? {}) as { attack?: number; defend?: number };
  const hpD = diceStr(d.hpDice), moD = diceStr(d.moraleDice);
  const hpText = String(d.hpText ?? ""), moText = String(d.moraleText ?? "");
  const cnt = d.count == null ? null : parsePb(String(d.count));
  const nv = (d.naval ?? null) as Data | null;
  const nar = (nv?.armor ?? null) as { name?: string; die?: string } | null;
  return {
    category: String(d.category ?? "monster"), group: String(d.group ?? ""),
    hp: int(d.hp, 5), hpRolled: !!hpD, hpDice: hpD ?? b.hpDice, hpNote: hpText && hpText !== String(d.hpDice ?? "") ? hpText : "",
    morale: d.morale == null || d.morale === "" ? null : int(d.morale, 7), moraleRolled: !!moD, moraleDice: moD ?? b.moraleDice,
    moraleNote: moText && moText !== String(d.moraleDice ?? "") ? moText : "",
    count: cnt ?? b.count, countText: d.count != null && !cnt ? String(d.count) : "",
    armorName: ar?.name ?? "", armorDie: String(ar?.die ?? "").replace(/^[-−]/, ""),
    drAttack: int(dr.attack, 12), drDefend: int(dr.defend, 12), defendWith: String(d.defendWith ?? "AGILITY"),
    apr: d.attacksPerRound == null ? "1" : String(d.attacksPerRound), attackChoice: d.attackChoice === "pick 1-2" ? "pick 1-2" : d.attackChoice ? "one of" : "",
    blackPowder: !!d.blackPowder, ignoresArmor: !!d.ignoresArmor, boss: !!d.boss,
    attacks: rowsOf(d.attackRows, d.attacks),
    specials: (Array.isArray(d.specials) ? (d.specials as Named[]) : []).map((x) => ({ name: String(x?.name ?? ""), text: String(x?.text ?? "") })),
    loot: (Array.isArray(d.loot) ? (d.loot as Loot[]) : []).map((x) => ({ name: String(x?.name ?? ""), value: String(x?.value ?? ""), ...(x?.note ? { note: String(x.note) } : {}) })),
    naval: nv ? {
      hp: int(nv.hp, 10), morale: nv.morale === undefined ? "" : nv.morale == null ? "–" : String(nv.morale),
      armorName: nar?.name ?? "", armorDie: String(nar?.die ?? ""), speed: int(nv.speed, 3), agility: int(nv.agility, 0),
      attacks: rowsOf(d.navalAttackRows, nv.attacks),
    } : null,
    text: String(d.text ?? ""),
  };
}
const hpOf = (m: MonsterDraft) => (m.hpRolled ? avg(m.hpDice) : m.hp);
const moraleOf = (m: MonsterDraft) => (m.morale == null ? null : m.moraleRolled ? Math.min(12, avg(m.moraleDice)) : m.morale);
const countOf = (m: MonsterDraft) => m.countText.trim() || fmtPb(m.count);

export function monsterPayload(name: string, m: MonsterDraft): Data {
  const mor = moraleOf(m);
  const out: Data = {
    name, category: m.category, group: m.group.trim(),
    hp: hpOf(m), hpText: m.hpNote.trim() || (m.hpRolled ? fmtPb(m.hpDice) : ""), hpDice: m.hpRolled ? fmtPb(m.hpDice) : "",
    morale: mor == null ? "–" : String(mor), moraleText: m.moraleNote.trim() || (m.moraleRolled && mor != null ? fmtPb(m.moraleDice) : ""),
    moraleDice: m.moraleRolled && mor != null ? fmtPb(m.moraleDice) : "",
    count: countOf(m), armorName: m.armorDie ? m.armorName.trim() : "", armorDie: m.armorDie,
    drAttack: m.drAttack, drDefend: m.drDefend, defendWith: m.defendWith, attacksPerRound: m.apr.trim() || "1", attackChoice: m.attackChoice,
    blackPowder: m.blackPowder, ignoresArmor: m.ignoresArmor, boss: m.boss,
    attackRows: m.attacks, specials: m.specials, loot: m.loot, text: m.text,
  };
  if (m.naval) {
    const n = m.naval;
    Object.assign(out, { navalHp: n.hp, navalMorale: n.morale, navalArmorName: n.armorDie ? n.armorName : "", navalArmorDie: n.armorDie, navalSpeed: n.speed, navalAgility: n.agility, navalAttackRows: n.attacks });
  }
  return out;
}

// ── attack rows (shared by the creature and its naval block) ──
function PbAttackRows({ rows, onChange, naval = false }: { rows: AttackRow[]; onChange: (r: AttackRow[]) => void; naval?: boolean }) {
  return (
    <AttackRows
      rows={rows} onChange={onChange} count={false} hit={false} dice={PB_DICE} modRange={[-3, 20]}
      namePh={naval ? "Ram, Tentacle slam…" : "Cutlass, Bite…"} specialPh={naval ? "Rider (the ship can't move…)" : "Rider: or become poisoned / + Zombie Infection…"}
      blank={() => newPbAttack({ name: "", dice: { n: 1, d: naval ? 8 : 6, m: 0 } })} addLabel={naval ? "+ Naval attack" : "+ Add attack"} max={8}
      slot={(r, patch) => {
        const x = r.extra ?? {};
        const setX = (p: Record<string, string>) => patch({ extra: { ...x, ...p } });
        return (
          <>
            {x.dmgText ? (
              <label className={styles.atkCell}>
                <span className={styles.atkLbl}>Damage as printed</span>
                <span className="flex items-center gap-1">
                  <input className={`${selCls} w-[110px]`} value={x.dmgText} maxLength={40} onChange={(e) => setX({ dmgText: e.target.value })} />
                  <span role="button" tabIndex={0} className={styles.iconBtn} title="Use the dice picker" onClick={() => setX({ dmgText: "" })}>×</span>
                </span>
              </label>
            ) : null}
            <label className={styles.atkCell}>
              <span className={styles.atkLbl}>Range ft</span>
              <Stepper value={int(x.range, 0)} min={0} max={1000} step={5} width="2.6em" ariaLabel="range feet" onChange={(v) => setX({ range: v ? String(v) : "" })} />
            </label>
            {!naval ? (
              <label className={styles.atkCell}>
                <span className={styles.atkLbl}>Reload</span>
                <Stepper value={int(x.reload, 0)} min={0} max={6} width="1.6em" ariaLabel="reload actions" onChange={(v) => setX({ reload: v ? String(v) : "" })} />
              </label>
            ) : null}
            <label className={styles.atkCell}>
              <span className={styles.atkLbl}>Armor</span>
              <select className={styles.diceSel} value={x.ia === "1" ? "1" : ""} onChange={(e) => setX({ ia: e.target.value })}>
                <option value="">applies</option><option value="1">ignored</option>
              </select>
            </label>
            {!naval ? (
              <label className={styles.atkCell}>
                <span className={styles.atkLbl}>+ Test</span>
                <span className="flex items-center gap-1">
                  <select className={styles.diceSel} value={x.tAb ?? ""} onChange={(e) => setX({ tAb: e.target.value })}>
                    <option value="">—</option>
                    {PB_ABILITIES.map((a) => <option key={a} value={a}>{PB_AB_SHORT[a]}</option>)}
                  </select>
                  {x.tAb ? <Stepper value={int(x.tDr, 12)} min={2} max={20} width="1.8em" ariaLabel="test DR" onChange={(v) => setX({ tDr: String(v ?? 12) })} /> : null}
                </span>
              </label>
            ) : null}
          </>
        );
      }}
    />
  );
}

const armorOpts: [string, string][] = [["", "No armor"], ...PB_MON_ARMOR_DICE.map((d) => [d, `−${d}${armorTierOf(d) ? ` (tier ${armorTierOf(d)})` : ""}`] as [string, string])];

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (v: MonsterDraft) => void }) {
  const set = (p: Partial<MonsterDraft>) => onChange({ ...m, ...p });
  const hp = hpOf(m), mor = moraleOf(m);
  const setNaval = (p: Partial<NavalDraft>) => m.naval && set({ naval: { ...m.naval, ...p } });
  const special = (i: number, p: Partial<Named>) => set({ specials: m.specials.map((x, j) => (j === i ? { ...x, ...p } : x)) });
  const lootSet = (i: number, p: Partial<Loot>) => set({ loot: m.loot.map((x, j) => (j === i ? { ...x, ...p } : x)) });
  const addTemplate = (name: string) => {
    const t = PB_ENEMY_SPECIALS.find((x) => x.name === name);
    if (!t) return;
    set({ specials: [...m.specials, { name: t.name, text: t.text }], ...(t.dr ? { drAttack: t.dr, drDefend: t.dr } : {}), ...(t.name === "Combatant" ? { apr: "2" } : {}) });
  };
  return (
    <>
      <Cell label="Category" className="sm:col-span-2">
        <ChipPicker single options={PB_MON_CATS} value={[m.category]} onChange={(v) => v[0] && set({ category: v[0] })} />
      </Cell>
      <Cell label="Group" help="Gallery or crew it belongs to (Redcoats, Zombies…).">
        <input className={fieldCls} value={m.group} maxLength={60} placeholder="optional" onChange={(e) => set({ group: e.target.value })} />
      </Cell>
      <Cell label="Appears in groups of" help="0 dice = a single creature.">
        {m.countText ? (
          <span className="flex items-center gap-2"><input className={`${fieldCls} max-w-[140px]`} value={m.countText} maxLength={20} onChange={(e) => set({ countText: e.target.value })} /><button type="button" className={smallBtn} onClick={() => set({ countText: "" })}>Dice</button></span>
        ) : <DiceInput value={m.count} dice={PB_DICE} maxCount={10} modMin={0} modMax={20} ariaLabel="group size" onChange={(v) => set({ count: v })} />}
      </Cell>

      <Cell label="HP" help={hpBand(hp) ? `Enemy Builder: ${hpBand(hp)}.` : undefined}>
        <span className="flex flex-wrap items-center gap-2">
          <Select value={m.hpRolled ? "roll" : "fixed"} options={[["fixed", "Fixed"], ["roll", "Rolled"]]} ariaLabel="hp mode" onChange={(v) => set({ hpRolled: v === "roll" })} />
          {m.hpRolled ? <><DiceInput value={m.hpDice} dice={PB_DICE} minCount={1} maxCount={20} modMin={0} modMax={50} ariaLabel="hp dice" onChange={(v) => set({ hpDice: v })} /><span className="text-[12px] text-[var(--muted)]">≈ {hp}</span></>
            : <Stepper value={m.hp} min={1} max={999} width="3em" ariaLabel="hp" onChange={(v) => set({ hp: v ?? 1 })} />}
        </span>
        {m.hpNote ? <p className={hint}>As printed: <input className={`${selCls} h-[26px] w-[110px]`} value={m.hpNote} maxLength={20} onChange={(e) => set({ hpNote: e.target.value })} /></p> : null}
      </Cell>
      <Cell label="Morale" help={mor == null ? "Never breaks: unintelligent, fights to the death or compelled." : `2d6 above ${mor} breaks it (d6: 1-3 flees, 4-6 surrenders). ${PB_MORALE_LABELS[mor] ?? ""}`}>
        <span className="flex flex-wrap items-center gap-2">
          <Select value={m.morale == null ? "never" : m.moraleRolled ? "roll" : "fixed"} options={[["fixed", "Fixed"], ["roll", "Rolled"], ["never", "– (never breaks)"]]} ariaLabel="morale mode"
            onChange={(v) => set(v === "never" ? { morale: null, moraleRolled: false } : { morale: m.morale ?? 7, moraleRolled: v === "roll" })} />
          {m.morale != null && !m.moraleRolled ? <Stepper value={m.morale} min={2} max={12} width="2em" ariaLabel="morale" onChange={(v) => set({ morale: v ?? 7 })} /> : null}
          {m.morale != null && m.moraleRolled ? <><DiceInput value={m.moraleDice} dice={PB_DICE} minCount={1} maxCount={2} modMin={0} modMax={10} ariaLabel="morale dice" onChange={(v) => set({ moraleDice: v })} /><span className="text-[12px] text-[var(--muted)]">≈ {mor}</span></> : null}
        </span>
        {m.moraleNote ? <p className={hint}>As printed: <input className={`${selCls} h-[26px] w-[90px]`} value={m.moraleNote} maxLength={20} onChange={(e) => set({ moraleNote: e.target.value })} /></p> : null}
      </Cell>

      <Cell label="Armor">
        <span className="flex flex-wrap items-center gap-2">
          <Select value={m.armorDie} options={armorOpts} ariaLabel="armor die" onChange={(v) => set({ armorDie: v })} />
          {m.armorDie ? <input className={`${fieldCls} max-w-[180px]`} value={m.armorName} maxLength={60} placeholder="Leather vest, thick shell…" onChange={(e) => set({ armorName: e.target.value })} /> : null}
        </span>
      </Cell>
      <Cell label="DRs" help="Standard is 12. Quick / small: 14. Slow / big: 10.">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[var(--muted)]">
          <span className="flex items-center gap-1">To hit it DR<Stepper value={m.drAttack} min={2} max={20} width="2em" ariaLabel="DR to hit" onChange={(v) => set({ drAttack: v ?? 12 })} /></span>
          <span className="flex items-center gap-1">Defend with
            <Select value={m.defendWith} options={PB_ABILITIES} ariaLabel="defend with" onChange={(v) => set({ defendWith: v })} />
            DR<Stepper value={m.drDefend} min={2} max={20} width="2em" ariaLabel="DR to defend" onChange={(v) => set({ drDefend: v ?? 12 })} /></span>
        </div>
      </Cell>

      <Cell label="Attacks" className="sm:col-span-2" help="Enemies never roll to hit: the PC tests defense, and on a failure takes this damage (minus their armor). 0 dice = no damage. Range 0 = melee.">
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[var(--muted)]">
          <span className="flex items-center gap-1">Per round
            <Select value={m.apr} options={["1", "2", "3", "4", "5", "1 per 2 PCs"]} ariaLabel="attacks per round" onChange={(v) => set({ apr: v })} /></span>
          <Select value={m.attackChoice} options={[["", "Uses all its attacks"], ["one of", "Uses ONE of them each round"], ["pick 1-2", "Armed with 1 or 2 of these (minions)"]]} ariaLabel="attack choice" onChange={(v) => set({ attackChoice: v })} />
          <Toggle checked={m.blackPowder} onChange={(v) => set({ blackPowder: v })} title="Its black powder weapons ignore armor">Black powder</Toggle>
          <Toggle checked={m.ignoresArmor} onChange={(v) => set({ ignoresArmor: v })}>All its attacks ignore armor</Toggle>
        </div>
        <PbAttackRows rows={m.attacks} onChange={(r) => set({ attacks: r })} />
      </Cell>

      <Cell label="Specials" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          {m.specials.map((x, i) => (
            <div key={i} className="flex flex-wrap items-start gap-2 rounded border border-[var(--border)] p-2">
              <input className={`${fieldCls} max-w-[180px]`} value={x.name} maxLength={80} placeholder="Quick" aria-label="special name" onChange={(e) => special(i, { name: e.target.value })} />
              <textarea className={`${fieldCls} min-h-[38px] flex-1`} value={x.text} maxLength={1500} placeholder="DR14 to attack and defend against." aria-label="special text" onChange={(e) => special(i, { text: e.target.value })} />
              <RowCtl rows={m.specials} i={i} onChange={(r) => set({ specials: r })} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={addBtn} onClick={() => set({ specials: [...m.specials, { name: "", text: "" }] })}>+ Special</button>
          <select className={`${selCls} mt-2`} value="" aria-label="Enemy Builder special" onChange={(e) => addTemplate(e.target.value)}>
            <option value="">+ From the Enemy Builder…</option>
            {PB_ENEMY_SPECIALS.map((t) => <option key={t.name} value={t.name}>{t.name} — {t.text}</option>)}
          </select>
        </div>
      </Cell>

      <Cell label="Loot (sellable parts)" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          {m.loot.map((x, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <input className={`${fieldCls} max-w-[200px]`} value={x.name} maxLength={80} placeholder="Snake skin" aria-label="loot item" onChange={(e) => lootSet(i, { name: e.target.value })} />
              <input className={`${fieldCls} max-w-[140px]`} value={x.value} maxLength={60} placeholder="5s, 75s/dose" aria-label="loot value" onChange={(e) => lootSet(i, { value: e.target.value })} />
              <RowCtl rows={m.loot} i={i} onChange={(r) => set({ loot: r })} />
            </div>
          ))}
        </div>
        <button type="button" className={addBtn} onClick={() => set({ loot: [...m.loot, { name: "", value: "" }] })}>+ Loot</button>
      </Cell>

      <Cell label="Naval block" className="sm:col-span-2" help="A big sea creature fights ships with a second block: HP vs ship damage, speed in hexes, AGILITY, attacks that subtract the hull die.">
        <Toggle checked={!!m.naval} onChange={(v) => set({ naval: v ? { hp: Math.max(1, Math.round(hp / 5)), morale: "", armorName: "", armorDie: "", speed: 4, agility: 0, attacks: [newPbAttack({ name: "Ram", dice: { n: 2, d: 8, m: 0 } })] } : null })}>Has a Naval Combat block</Toggle>
        {m.naval ? (
          <div className="mt-2 flex flex-col gap-3 rounded border border-[var(--border)] p-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[var(--muted)]">
              <span className="flex items-center gap-1">HP<Stepper value={m.naval.hp} min={1} max={999} width="2.6em" ariaLabel="naval hp" onChange={(v) => setNaval({ hp: v ?? 1 })} /></span>
              <span className="flex items-center gap-1">Morale<Select value={m.naval.morale} options={[["", "same"], ["–", "– never"], ...Array.from({ length: 11 }, (_, i) => String(i + 2))]} ariaLabel="naval morale" onChange={(v) => setNaval({ morale: v })} /></span>
              <span className="flex items-center gap-1">Speed<Stepper value={m.naval.speed} min={0} max={20} width="2em" ariaLabel="naval speed" onChange={(v) => setNaval({ speed: v ?? 0 })} /></span>
              <span className="flex items-center gap-1">AGILITY<Stepper value={m.naval.agility} min={-5} max={6} signed width="2em" ariaLabel="naval agility" onChange={(v) => setNaval({ agility: v ?? 0 })} /></span>
              <span className="flex items-center gap-1">Armor<Select value={m.naval.armorDie} options={armorOpts} ariaLabel="naval armor" onChange={(v) => setNaval({ armorDie: v })} /></span>
              {m.naval.armorDie ? <input className={`${selCls} w-[150px]`} value={m.naval.armorName} maxLength={60} placeholder="Barnacled hide" onChange={(e) => setNaval({ armorName: e.target.value })} /> : null}
            </div>
            <PbAttackRows naval rows={m.naval.attacks} onChange={(r) => setNaval({ attacks: r })} />
          </div>
        ) : null}
      </Cell>

      <Cell label="Boss">
        <Toggle checked={m.boss} onChange={(v) => set({ boss: v })}>Boss</Toggle>
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={m.text} maxLength={3000} placeholder="What it looks like, how it fights…" onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const hp = hpOf(m), mor = moraleOf(m);
  const atks = composePbAttacks(m.attacks);
  const def = `${m.defendWith} DR${m.drDefend}`;
  const cat = PB_MON_CATS.find(([k]) => k === m.category)?.[1] ?? m.category;
  return (
    <Preview title={name || "Unnamed creature"} subtitle={[cat, m.group, countOf(m) ? `groups of ${countOf(m)}` : "", m.boss ? "boss" : ""].filter(Boolean).join(" · ")}>
      <p className="font-mono text-[13px]">
        HP {m.hpNote || (m.hpRolled ? `${fmtPb(m.hpDice)} (~${hp})` : hp)} · Morale {mor == null ? "–" : m.moraleNote || (m.moraleRolled ? fmtPb(m.moraleDice) : mor)} · {m.armorDie ? `${m.armorName || "Armor"} −${m.armorDie}` : "no armor"}
      </p>
      <p className="text-[12px] text-[var(--muted)]">DR{m.drAttack} to hit · PCs defend {def}{m.apr !== "1" ? ` · ${m.apr} attacks a round` : ""}{m.attackChoice ? ` · ${m.attackChoice === "pick 1-2" ? "armed with 1 or 2" : "one of these"}` : ""}</p>
      <ul className="mt-2 flex flex-col gap-0.5 text-[13px]">
        {atks.map((a, i) => <li key={i}><b>{a.name}</b> {a.damage ?? "—"}{a.notes ? <span className="text-[var(--muted)]"> ({a.notes})</span> : null}</li>)}
      </ul>
      {m.blackPowder || m.ignoresArmor ? <p className="text-[12px] text-[var(--muted)]">{m.ignoresArmor ? "Its attacks ignore armor." : "Black powder ignores armor."}</p> : null}
      {m.specials.filter((x) => x.name || x.text).map((x, i) => <p key={i} className="mt-1 text-[13px]"><b>{x.name}:</b> {x.text}</p>)}
      {m.naval ? <p className="mt-2 text-[12px]"><b>Naval:</b> HP {m.naval.hp} · Speed {m.naval.speed} · AGL {m.naval.agility >= 0 ? "+" : "−"}{Math.abs(m.naval.agility)} · {composePbAttacks(m.naval.attacks).map((a) => `${a.name} ${a.damage ?? ""}`.trim()).join(", ")}</p> : null}
      {m.loot.length ? <p className="mt-1 text-[12px] text-[var(--muted)]">Loot: {m.loot.filter((l) => l.name).map((l) => `${l.name} ${l.value}`.trim()).join(", ")}</p> : null}
      {m.text ? <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed">{m.text}</p> : null}
    </Preview>
  );
}
