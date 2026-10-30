"use client";
// ── D&D 2024 homebrew creature (stat block) builder ─────────────────────────
// Ability scores 1–30 with live modifiers; HP from hit dice (size die + CON);
// CR → XP / Proficiency Bonus; saves / skills / senses / languages /
// resistance & condition chips; attack rows (to-hit, reach / range, dice + mod,
// damage type, a "plus" damage rider, auto-derived from an ability) and
// name/text rows for traits, other actions, bonus actions, reactions and
// legendary actions. Live preview in stat-block format.
// Storage (type "dnd-monster", DndMonster shape — what the bestiary page, GM
// Screen bestiary / tracker and session-prep builder read):
//   legacy, still composed: size type alignment ac acNote hp hpFormula speed
//     abilities savingThrows skills senses languages cr xp proficiencyBonus
//     damage*/conditionImmunities traits actions bonusActions reactions
//     legendaryActions group
//   builder data: sb (DndBlock, ./rules), attackRows (AttackRow[]), actionRows
//     / bonusRows (the non-attack actions, {name, description})
// lib/homebrew.ts normalizeDndMonster re-composes the legacy strings from the
// builder data with ./rules, so preview == stored.
import AttackRows, { newAttackRow, type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { parseDice, formatDice } from "../dice";
import {
  ABILS, ALIGNMENTS, ATK_KINDS, CONDITIONS, CREATURE_TYPES, CR_LIST, CR_XP, DAMAGE_TYPES, LANGUAGES, SIZES, SIZE_DIE, SKILLS, TYPE_GROUP,
  abilMod, blankBlock, blockHp, composeDndActions, composeDndBlock, crPB, parseDndAttack, parseDndBlock, passivePerception,
  saveValue, signed, skillValue, syncDndAttacks, type DndBlock,
} from "./rules";
import { Cell, NameRows, Select, Toggle, fieldCls, hint, lbl, type Row } from "./ui";

export type MonsterDraft = {
  size: string; ctype: string; tag: string; alignment: string; group: string; groupAuto: boolean;
  ac: number; acNote: string; cr: string;
  abilities: Record<string, number>;
  sb: DndBlock;
  attacks: AttackRow[];
  actions: Row[]; bonus: Row[]; reactions: Row[]; legendary: Row[]; traits: Row[];
};

type Data = Record<string, unknown>;
const int = (v: unknown, d: number) => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : d; };
const toRows = (v: unknown): Row[] => (Array.isArray(v) ? (v as Data[]).map((x) => ({ name: String(x?.name ?? ""), text: String(x?.description ?? "") })) : []);
const fromRows = (r: Row[]) => r.filter((x) => x.name.trim() || x.text.trim()).map((x) => ({ name: x.name.trim(), description: x.text.trim() }));
const groupOf = (t: string) => TYPE_GROUP[t] ?? "Humanoids";
const GROUPS = Array.from(new Set(Object.values(TYPE_GROUP)));

const atk = (p: Partial<AttackRow> = {}, e: Record<string, string> = {}) =>
  newAttackRow({ name: "", hit: 4, dice: { n: 1, d: 6, m: 2 }, dtype: "slashing", special: "", ...p, extra: { kind: "melee", atype: "", reach: "5", rng: "30/120", tgt: "", abil: "STR", d2: "", t2: "", slot: "action", ...e } });

export function blankMonster(): MonsterDraft {
  const abilities = Object.fromEntries(ABILS.map((a) => [a, 10]));
  abilities.STR = 14; abilities.DEX = 12; abilities.CON = 12;
  return {
    size: "Medium", ctype: "Humanoid", tag: "", alignment: "Neutral", group: "Humanoids", groupAuto: true,
    ac: 12, acNote: "", cr: "1", abilities,
    sb: { ...blankBlock(), hd: { n: 4, d: 8, m: 4 } },
    attacks: syncDndAttacks([atk({ name: "Claw" })], 2, abilities),
    actions: [], bonus: [], reactions: [], legendary: [], traits: [],
  };
}

/** Open a stored record (builder or legacy text-only shape). */
export function monsterFromData(d: Data): MonsterDraft {
  const ab = (d.abilities ?? {}) as Data;
  const abilities = Object.fromEntries(ABILS.map((a) => [a, Math.min(30, Math.max(1, int(ab[a], 10)))]));
  const cr = CR_LIST.includes(String(d.cr)) ? String(d.cr) : "1";
  const pb = crPB(cr);
  const tm = String(d.type ?? "Humanoid").match(/^(.+?)(?:\s*\((.+)\))?$/);
  const ctype = CREATURE_TYPES.find((t) => t.toLowerCase() === (tm?.[1] ?? "").toLowerCase()) ?? String(tm?.[1] ?? "Humanoid");
  const sb = d.sb && typeof d.sb === "object" ? ({ ...blankBlock(), ...(d.sb as DndBlock) }) : parseDndBlock(d, abilities);
  let attacks: AttackRow[], actions: Row[], bonus: Row[];
  if (Array.isArray(d.attackRows)) {
    attacks = (d.attackRows as AttackRow[]).map((r) => ({ ...newAttackRow(), ...r, dice: { ...{ n: 0, d: 6, m: 0 }, ...(r.dice ?? {}) }, extra: { ...(r.extra ?? {}) } }));
    actions = toRows(d.actionRows); bonus = toRows(d.bonusRows);
  } else {
    // Legacy: every action that's a recognisable attack becomes a row (only when
    // re-composing it gives back the exact text); the rest stay as text rows.
    attacks = []; actions = []; bonus = [];
    toRows(d.actions).forEach((a) => { const r = parseDndAttack(a.name, a.text, pb, abilities); if (r) attacks.push(r); else actions.push(a); });
    toRows(d.bonusActions).forEach((a) => { const r = parseDndAttack(a.name, a.text, pb, abilities); if (r) attacks.push({ ...r, extra: { ...r.extra, slot: "bonus" } }); else bonus.push(a); });
  }
  const group = String(d.group ?? groupOf(ctype));
  return {
    size: (SIZES as readonly string[]).includes(String(d.size)) ? String(d.size) : "Medium",
    ctype, tag: tm?.[2] ?? "", alignment: String(d.alignment ?? "Unaligned"),
    group, groupAuto: group === groupOf(ctype),
    ac: Math.min(30, Math.max(1, int(d.ac, 10))), acNote: String(d.acNote ?? "").replace(/^\(|\)$/g, ""), cr, abilities, sb,
    attacks, actions, bonus,
    reactions: toRows(d.reactions), legendary: toRows(d.legendaryActions), traits: toRows(d.traits),
  };
}

export function monsterPayload(name: string, m: MonsterDraft): Data {
  const block = composeDndBlock(m.sb, m.abilities, m.cr, m.size);
  const actionRows = fromRows(m.actions), bonusRows = fromRows(m.bonus);
  const { actions, bonusActions } = composeDndActions(m.attacks, actionRows, bonusRows);
  return {
    name, size: m.size, type: m.ctype + (m.tag.trim() ? ` (${m.tag.trim()})` : ""), alignment: m.alignment,
    group: m.groupAuto ? groupOf(m.ctype) : m.group,
    ac: m.ac, acNote: m.acNote.trim() ? `(${m.acNote.trim()})` : "", cr: m.cr, abilities: m.abilities,
    ...block,
    traits: fromRows(m.traits), actions, bonusActions, reactions: fromRows(m.reactions), legendaryActions: fromRows(m.legendary),
    sb: m.sb, attackRows: m.attacks, actionRows, bonusRows,
  };
}

const ARMOR_NOTES = ["natural armor", "leather armor", "studded leather", "hide armor", "chain shirt", "scale mail", "breastplate", "half plate", "chain mail", "splint", "plate armor", "shield"];

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (m: MonsterDraft) => void }) {
  const pb = crPB(m.cr);
  const set = (p: Partial<MonsterDraft>) => {
    const next = { ...m, ...p };
    onChange({ ...next, attacks: syncDndAttacks(next.attacks, crPB(next.cr), next.abilities) });
  };
  const sb = m.sb;
  const setSb = (p: Partial<DndBlock>) => set({ sb: { ...sb, ...p } });
  const hp = blockHp(sb, m.size, m.abilities.CON);
  const die = SIZE_DIE[m.size] ?? 8;

  const onAttacks = (next: AttackRow[]) => {
    onChange({
      ...m,
      attacks: next.map((r, i) => {
        const prev = m.attacks[i];
        // Switching a STR attack to Ranged moves it to DEX (and back for melee).
        if (prev && prev.extra?.kind !== r.extra?.kind && r.extra?.abil) {
          const sw = r.extra.kind === "ranged" && r.extra.abil === "STR" ? "DEX" : r.extra.kind === "melee" && r.extra.abil === "DEX" && prev.extra?.kind === "ranged" ? "STR" : "";
          if (sw) r = { ...r, extra: { ...r.extra, abil: sw } };
        }
        const a = r.extra?.abil; if (!a) return r;
        if (!prev || prev.extra?.abil !== a) return syncDndAttacks([r], pb, m.abilities)[0];
        const mod = abilMod(m.abilities[a] ?? 10);
        if (r.hit !== pb + mod || (r.dice.n > 0 && r.dice.m !== mod)) return { ...r, extra: { ...r.extra, abil: "" } };
        return r;
      }),
    });
  };

  return (
    <>
      <Cell label="Size"><Select className="w-full" value={m.size} options={SIZES} onChange={(v) => set({ size: v })} /></Cell>
      <Cell label="Creature type">
        <div className="flex gap-2">
          <Select className="min-w-[130px] flex-1" value={m.ctype} options={CREATURE_TYPES} onChange={(v) => set({ ctype: v, group: m.groupAuto ? groupOf(v) : m.group })} />
          <input className={`${fieldCls} w-28 min-w-0`} value={m.tag} maxLength={40} placeholder="tag (Wizard)" onChange={(e) => set({ tag: e.target.value })} />
        </div>
      </Cell>
      <Cell label="Alignment"><Select className="w-full" value={m.alignment} options={ALIGNMENTS} onChange={(v) => set({ alignment: v })} /></Cell>
      <Cell label="Bestiary group">
        <div className="flex items-center gap-2">
          <Select className="min-w-0 flex-1" value={m.groupAuto ? groupOf(m.ctype) : m.group} options={GROUPS} onChange={(v) => set({ group: v, groupAuto: false })} />
          <Toggle checked={m.groupAuto} onChange={(v) => set({ groupAuto: v, group: groupOf(m.ctype) })} title="File it under its creature type">Auto</Toggle>
        </div>
      </Cell>

      <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-3">
        <Cell label="Armor Class"><Stepper value={m.ac} min={1} max={30} ariaLabel="armor class" onChange={(v) => set({ ac: v ?? 10 })} /></Cell>
        <Cell label="Armor (optional)" className="min-w-[150px] flex-1">
          <input className={fieldCls} list="dnd-hb-acnotes" value={m.acNote} maxLength={60} placeholder="natural armor" onChange={(e) => set({ acNote: e.target.value })} />
          <datalist id="dnd-hb-acnotes">{ARMOR_NOTES.map((x) => <option key={x} value={x} />)}</datalist>
        </Cell>
        <Cell label="Challenge Rating">
          <div className="flex items-center gap-2">
            <Select value={m.cr} options={CR_LIST} ariaLabel="challenge rating" onChange={(v) => set({ cr: v, sb: { ...sb, xp: sb.xpAuto ? CR_XP[v] ?? 0 : sb.xp } })} />
            <span className="text-[12px] text-[var(--muted)]">PB <b className="text-[var(--text)]">{signed(pb)}</b></span>
          </div>
        </Cell>
        <Cell label="XP">
          <div className="flex items-center gap-2">
            <Stepper value={sb.xpAuto ? CR_XP[m.cr] ?? 0 : sb.xp} min={0} max={1000000} step={sb.xpAuto ? 1 : 50} width="5em" ariaLabel="xp" onChange={(v) => setSb({ xp: v ?? 0, xpAuto: false })} />
            <Toggle checked={sb.xpAuto} onChange={(v) => setSb({ xpAuto: v, xp: CR_XP[m.cr] ?? 0 })} title="XP from the CR table (2024)">Auto</Toggle>
          </div>
        </Cell>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Hit Points</label>
        <div className="flex flex-wrap items-center gap-3">
          {sb.hpAuto ? (
            <>
              <span className="flex items-center gap-1.5 text-[12px] text-[var(--muted)]">Hit dice
                <Stepper value={sb.hd.n} min={1} max={99} ariaLabel="hit dice" onChange={(v) => setSb({ hd: { ...sb.hd, n: v ?? 1 } })} />
                <b className="text-[var(--text)]">d{die}</b>
              </span>
              <span className="text-[13px]">= <b>{hp.formula}</b></span>
            </>
          ) : (
            <>
              <Stepper value={sb.hp} min={1} max={5000} width="3.6em" ariaLabel="hit points" onChange={(v) => setSb({ hp: v ?? 1 })} />
              <DiceInput value={sb.hd} minCount={0} maxCount={99} modMin={-500} modMax={2000} ariaLabel="hit dice" onChange={(v) => setSb({ hd: v })} />
            </>
          )}
          <Toggle checked={sb.hpAuto} title="Average of the hit dice: size die (Tiny d4 … Gargantuan d20) + CON modifier per die"
            onChange={(v) => setSb(v ? { hpAuto: true, hd: { n: Math.max(1, sb.hd.n), d: die, m: 0 } } : { hpAuto: false, hp: hp.hp, hd: { n: Math.max(1, sb.hd.n), d: die, m: Math.max(1, sb.hd.n) * abilMod(m.abilities.CON) } })}>
            Auto from size + CON
          </Toggle>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Speed (ft.)</label>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          {(["walk", "burrow", "climb", "fly", "swim"] as const).map((k) => (
            <span key={k} className="flex flex-col items-center gap-0.5">
              <span className={styles.atkLbl}>{k}</span>
              <Stepper value={sb.speed[k]} min={0} max={300} step={5} width="2.6em" ariaLabel={`${k} speed`} onChange={(v) => setSb({ speed: { ...sb.speed, [k]: v ?? 0 } })} />
            </span>
          ))}
          {sb.speed.fly ? <Toggle checked={sb.speed.hover} onChange={(v) => setSb({ speed: { ...sb.speed, hover: v } })}>Hover</Toggle> : null}
        </div>
        {sb.speed.notes.length ? <div className="mt-2"><ChipPicker options={[]} value={sb.speed.notes} onChange={(v) => setSb({ speed: { ...sb.speed, notes: v } })} /></div> : null}
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Ability scores</label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {ABILS.map((a) => (
            <div key={a} className="flex flex-col items-center">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a}</div>
              <Stepper value={m.abilities[a]} min={1} max={30} width="2.4em" ariaLabel={a} onChange={(v) => set({ abilities: { ...m.abilities, [a]: v ?? 10 } })} />
              <div className="mt-0.5 text-[12px] font-semibold text-[var(--hb-accent)]">{signed(abilMod(m.abilities[a]))}</div>
            </div>
          ))}
        </div>
      </div>

      <Cell label="Saving throw proficiencies" className="sm:col-span-2" help="Each adds the Proficiency Bonus to that ability's modifier.">
        <ChipPicker
          options={ABILS.map((a) => [a, `${a} ${signed(abilMod(m.abilities[a]) + pb)}`] as [string, string])}
          value={sb.saves}
          onChange={(v) => { const saveBonus = { ...sb.saveBonus }; Object.keys(saveBonus).forEach((k) => { if (!v.includes(k)) delete saveBonus[k]; }); setSb({ saves: ABILS.filter((a) => v.includes(a)), saveBonus }); }}
        />
      </Cell>

      <Cell label="Skills" className="sm:col-span-2" help="Click once for proficiency, twice for expertise (double PB), a third time to clear.">
        <div className={styles.chips}>
          {SKILLS.map(([s, ab]) => {
            const lv = sb.skills[s] ?? 0;
            return (
              <button key={s} type="button" className={`${styles.chip} ${lv ? styles.on : ""}`} aria-pressed={!!lv} title={`${s} (${ab})`}
                onClick={() => { const skills = { ...sb.skills }; const skillBonus = { ...sb.skillBonus }; delete skillBonus[s]; const n = (lv + 1) % 3; if (n) skills[s] = n; else delete skills[s]; setSb({ skills, skillBonus }); }}>
                {s}{lv ? ` ${signed(skillValue(sb, s, m.abilities, pb))}` : ""}{lv === 2 ? " ★" : ""}
              </button>
            );
          })}
        </div>
      </Cell>

      <div className="sm:col-span-2">
        <label className={lbl}>Senses (ft.)</label>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          {(["blindsight", "darkvision", "tremorsense", "truesight"] as const).map((k) => (
            <span key={k} className="flex flex-col items-center gap-0.5">
              <span className={styles.atkLbl}>{k}</span>
              <Stepper value={sb.senses[k]} min={0} max={1000} step={10} width="2.8em" ariaLabel={k} onChange={(v) => setSb({ senses: { ...sb.senses, [k]: v ?? 0 } })} />
            </span>
          ))}
          {sb.senses.blindsight ? <Toggle checked={sb.senses.blindBeyond} onChange={(v) => setSb({ senses: { ...sb.senses, blindBeyond: v } })}>Blind beyond</Toggle> : null}
          <span className="text-[12px] text-[var(--muted)]">
            Passive Perception <b className="text-[var(--text)]">{passivePerception(sb, m.abilities, pb)}</b>
            {sb.ppBonus != null ? <button type="button" className="ml-1 underline" title="Use 10 + Perception" onClick={() => setSb({ ppBonus: null })}>(fixed — reset)</button> : null}
          </span>
        </div>
        {sb.senses.notes.length ? <div className="mt-2"><ChipPicker options={[]} value={sb.senses.notes} onChange={(v) => setSb({ senses: { ...sb.senses, notes: v } })} /></div> : null}
      </div>

      <Cell label="Languages" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          <ChipPicker options={LANGUAGES} value={sb.langs} onChange={(v) => setSb({ langs: v })} custom customPh="Other language…" />
          <span className="flex items-center gap-2 text-[12px] text-[var(--muted)]">Telepathy <Stepper value={sb.telepathy} min={0} max={1000} step={10} width="2.8em" ariaLabel="telepathy" onChange={(v) => setSb({ telepathy: v ?? 0 })} /> ft.</span>
        </div>
      </Cell>

      <Cell label="Damage resistances" className="sm:col-span-2"><ChipPicker options={DAMAGE_TYPES} value={sb.dres} onChange={(v) => setSb({ dres: v })} custom customPh="e.g. from nonmagical attacks…" /></Cell>
      <Cell label="Damage immunities" className="sm:col-span-2"><ChipPicker options={DAMAGE_TYPES} value={sb.dimm} onChange={(v) => setSb({ dimm: v })} custom customPh="Other…" /></Cell>
      <Cell label="Damage vulnerabilities" className="sm:col-span-2"><ChipPicker options={DAMAGE_TYPES} value={sb.dvul} onChange={(v) => setSb({ dvul: v })} /></Cell>
      <Cell label="Condition immunities" className="sm:col-span-2"><ChipPicker options={CONDITIONS} value={sb.cimm} onChange={(v) => setSb({ cimm: v })} /></Cell>

      <Cell label="Traits" className="sm:col-span-2">
        <NameRows rows={m.traits} onChange={(v) => set({ traits: v })} namePh="Amphibious" textPh="The creature can breathe air and water." addLabel="+ Add trait" />
      </Cell>

      <div className="sm:col-span-2">
        <label className={lbl}>Attacks</label>
        <AttackRows
          rows={m.attacks}
          onChange={onAttacks}
          count={false}
          hit={{ label: "To hit", min: -5, max: 30 }}
          dice={[4, 6, 8, 10, 12, 20]}
          damageTypes={[...DAMAGE_TYPES]}
          extras={[
            { key: "kind", label: "Attack", options: ATK_KINDS },
            { key: "abil", label: "Auto from", options: [["", "Manual"], ...ABILS.map((a) => [a, a] as [string, string])] },
            { key: "slot", label: "Uses", options: [["action", "Action"], ["bonus", "Bonus Action"]] },
          ]}
          slot={(r, patch) => <AtkCells r={r} patch={patch} />}
          namePh="Bite, Longsword, Arcane Burst…"
          specialPh="After the damage: “If the target is a creature, it has the Grappled condition (escape DC 13).”"
          blank={() => atk({ name: "" })}
          max={16}
        />
        <p className={hint}>
          “Auto from” keeps To hit = PB + the ability’s modifier and adds the modifier to damage; edit either number to go manual.
        </p>
      </div>
      <Cell label="Other actions" className="sm:col-span-2" help="Multiattack, Spellcasting, breath weapons… Multiattack is listed first. Dice like 6d6 become roll buttons on the GM Screen.">
        <NameRows rows={m.actions} onChange={(v) => set({ actions: v })} namePh="Multiattack" textPh="The creature makes two Claw attacks." addLabel="+ Add action" />
      </Cell>
      <Cell label="Bonus actions" className="sm:col-span-2"><NameRows rows={m.bonus} onChange={(v) => set({ bonus: v })} addLabel="+ Add bonus action" /></Cell>
      <Cell label="Reactions" className="sm:col-span-2"><NameRows rows={m.reactions} onChange={(v) => set({ reactions: v })} addLabel="+ Add reaction" /></Cell>
      <Cell label="Legendary actions" className="sm:col-span-2"><NameRows rows={m.legendary} onChange={(v) => set({ legendary: v })} namePh="Tail Attack" addLabel="+ Add legendary action" /></Cell>
    </>
  );
}

// Reach / range / plus-damage / wording cells for one attack row.
function AtkCells({ r, patch }: { r: AttackRow; patch: (p: Partial<AttackRow>) => void }) {
  const e = r.extra ?? {};
  const setE = (p: Record<string, string>) => patch({ extra: { ...e, ...p } });
  const [nr, lr] = String(e.rng || "30/120").split("/").map((x) => parseInt(x, 10) || 0);
  const d2 = parseDice(e.d2 ?? "") ?? { n: 0, d: 6, m: 0 };
  return (
    <>
      {e.kind !== "ranged" ? (
        <label className={styles.atkCell}><span className={styles.atkLbl}>Reach ft.</span>
          <Stepper value={parseInt(e.reach || "5", 10)} min={5} max={120} step={5} width="2.2em" ariaLabel="reach" onChange={(v) => setE({ reach: String(v ?? 5) })} />
        </label>
      ) : null}
      {e.kind !== "melee" ? (
        <label className={styles.atkCell}><span className={styles.atkLbl}>Range ft. (normal / long)</span>
          <span className="flex items-center gap-1">
            <Stepper value={nr} min={5} max={1200} step={5} width="2.6em" ariaLabel="normal range" onChange={(v) => setE({ rng: `${v ?? 30}${lr ? "/" + lr : ""}` })} />
            <Stepper value={lr || null} nullable min={5} max={4800} step={5} width="2.6em" ariaLabel="long range" onChange={(v) => setE({ rng: `${nr}${v ? "/" + v : ""}` })} />
          </span>
        </label>
      ) : null}
      <label className={styles.atkCell}><span className={styles.atkLbl}>Plus damage</span>
        <span className="flex items-center gap-1">
          <DiceInput value={d2} mod={false} ariaLabel="extra damage" onChange={(v) => setE({ d2: v.n > 0 ? formatDice({ ...v, m: 0 }) : "" })} />
          <select className={styles.diceSel} aria-label="extra damage type" value={e.t2 ?? ""} onChange={(ev) => setE({ t2: ev.target.value })}>
            <option value="">—</option>
            {DAMAGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </span>
      </label>
      <label className={styles.atkCell}><span className={styles.atkLbl}>Wording</span>
        <select className={styles.diceSel} value={e.atype ?? ""} onChange={(ev) => setE({ atype: ev.target.value, tgt: ev.target.value && !e.tgt ? "one target" : e.tgt ?? "" })}>
          <option value="">2024 (Attack Roll)</option>
          <option value="Weapon">Weapon Attack (SRD 5.1)</option>
          <option value="Spell">Spell Attack (SRD 5.1)</option>
        </select>
      </label>
    </>
  );
}

const B = ({ children }: { children: string }) => <b className="text-[var(--hb-accent)]">{children}</b>;

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const p = monsterPayload(name, m) as Record<string, unknown> & { actions: { name: string; description: string }[]; bonusActions: { name: string; description: string }[] };
  const pb = crPB(m.cr);
  const line = (k: string, v: unknown) => (v ? <p className="text-[13px]"><B>{k}</B> {String(v)}</p> : null);
  const list = (title: string, rows: { name: string; description: string }[]) =>
    rows.length ? (
      <>
        <div className="mt-2 border-b border-[var(--border)] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--hb-accent)]">{title}</div>
        {rows.map((a, i) => <p key={i} className="mt-1 text-[13px] leading-relaxed"><b><i>{a.name}.</i></b> {a.description}</p>)}
      </>
    ) : null;
  return (
    <Preview title={name || "Unnamed creature"} subtitle={`${m.size} ${String(p.type)}, ${m.alignment}`}>
      {line("AC", `${m.ac}${p.acNote ? " " + p.acNote : ""}`)}
      {line("HP", p.hpFormula)}
      {line("Speed", p.speed)}
      <div className="my-2 grid grid-cols-6 gap-1 text-center text-[11px]">
        {ABILS.map((a) => (
          <div key={a} className="rounded border border-[var(--border)] py-1">
            <div className="font-bold text-[var(--muted)]">{a}</div>
            <div className="font-semibold">{m.abilities[a]} <span className="text-[var(--muted)]">({signed(abilMod(m.abilities[a]))})</span></div>
            {m.sb.saves.includes(a) ? <div className="text-[10px] text-[var(--hb-accent)]">save {signed(saveValue(m.sb, a, m.abilities, pb))}</div> : null}
          </div>
        ))}
      </div>
      {line("Saving Throws", p.savingThrows)}
      {line("Skills", p.skills)}
      {line("Vulnerabilities", p.damageVulnerabilities)}
      {line("Resistances", p.damageResistances)}
      {line("Immunities", [p.damageImmunities, p.conditionImmunities].filter(Boolean).join("; "))}
      {line("Senses", p.senses)}
      {line("Languages", p.languages)}
      {line("CR", `${m.cr} (XP ${Number(p.xp).toLocaleString("en")}; PB ${signed(pb)})`)}
      {list("Traits", p.traits as { name: string; description: string }[])}
      {list("Actions", p.actions)}
      {list("Bonus Actions", p.bonusActions)}
      {list("Reactions", p.reactions as { name: string; description: string }[])}
      {list("Legendary Actions", p.legendaryActions as { name: string; description: string }[])}
    </Preview>
  );
}

