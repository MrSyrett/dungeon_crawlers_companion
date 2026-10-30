"use client";
// ── The Lord of the Rings 5E homebrew adversary (stat block) builder ─────────
// Ability scores 1–30 with live modifiers; HP from hit dice (size die + CON);
// CR → XP / Proficiency Bonus; saves / Middle-earth skills / senses / languages
// / resistance & condition chips; attack rows in the book's "Weapon Attack"
// wording (to-hit, reach / range, dice + mod, damage type, the two-handed
// versatile line, a "plus" rider, auto-derived from STR / DEX); Strike Fear
// (Shadow points from Dread, DC auto from PB + CHA); name + usage + text rows
// for traits (with the book's signature adversary traits one click away),
// other actions, bonus actions and reactions. No alignment (LotR has none).
// Storage (type "lotr-monster", LotrMonster = DndMonster shape + group +
// description — what /lotr/bestiary, the GM Screen adversary picker and the
// LotR session-prep builder read):
//   legacy, still composed: size type ac acNote hp hpFormula speed abilities
//     savingThrows skills senses languages cr xp proficiencyBonus damage* /
//     conditionImmunities traits actions bonusActions reactions group description
//   builder data: sb (LotrBlock), attackRows (AttackRow[]), fear (Fear),
//     traitRows / actionRows / bonusRows / reactionRows ({name, use, description})
// lib/homebrew.ts normalizeLotrMonster re-composes the legacy strings from the
// builder data with ./rules, so preview == stored.
import AttackRows, { newAttackRow, type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { parseDice, formatDice } from "../dice";
import {
  ABILS, ADVERSARY_TRAITS, ARMOUR_NOTES, ATK_KINDS, CONDITIONS, CREATURE_TYPES, CR_LIST, CR_XP, DAMAGE_TYPES, LANGUAGES, MONSTER_GROUPS,
  RESIST_PHRASES, SIZES, SIZE_DIE, SKILLS, TYPE_TAGS, USES,
  abilMod, blankBlock, blankFear, blockHp, composeLotrActions, composeLotrBlock, crPB, fearDC, parseFear, parseLotrAttack, parseLotrBlock,
  passivePerception, saveValue, signed, skillValue, splitUse, syncLotrAttacks, composeUseRows, type Fear, type LotrBlock, type UseRow,
} from "./rules";
import { Cell, Select, Toggle, UseRows, fieldCls, hint, lbl } from "./ui";

export type MonsterDraft = {
  size: string; ctype: string; tag: string; group: string;
  ac: number; acNote: string; cr: string;
  abilities: Record<string, number>;
  sb: LotrBlock;
  attacks: AttackRow[]; fear: Fear;
  traits: UseRow[]; actions: UseRow[]; bonus: UseRow[]; reactions: UseRow[];
  description: string;
};

type Data = Record<string, unknown>;
type ND = { name: string; description: string };
const int = (v: unknown, d: number) => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : d; };
const toND = (v: unknown): ND[] => (Array.isArray(v) ? (v as Data[]).map((x) => ({ name: String(x?.name ?? ""), description: String(x?.description ?? "") })) : []);
const toUse = (v: unknown): UseRow[] => toND(v).map((x) => splitUse(x.name, x.description));
const storedUse = (v: unknown): UseRow[] => (Array.isArray(v) ? (v as Data[]).map((x) => ({ name: String(x?.name ?? ""), use: USES.includes(String(x?.use)) ? String(x?.use) : "", description: String(x?.description ?? "") })) : []);

const atk = (p: Partial<AttackRow> = {}, e: Record<string, string> = {}) =>
  newAttackRow({ name: "", hit: 4, dice: { n: 1, d: 6, m: 2 }, dtype: "slashing", special: "", ...p, extra: { kind: "melee", reach: "5", rng: "20/60", tgt: "one target", abil: "STR", vers: "", d2: "", t2: "", ...e } });

export function blankMonster(): MonsterDraft {
  const abilities = Object.fromEntries(ABILS.map((a) => [a, 10]));
  abilities.STR = 14; abilities.DEX = 12; abilities.CON = 12; abilities.INT = 9; abilities.CHA = 9;
  return {
    size: "Medium", ctype: "Humanoid", tag: "Orc", group: "Orcs",
    ac: 13, acNote: "orc-leather", cr: "1/4", abilities,
    sb: { ...blankBlock(), hd: { n: 2, d: 8, m: 2 }, senses: { ...blankBlock().senses, darkvision: 120 }, langs: ["Orkish", "Westron"] },
    attacks: syncLotrAttacks([atk({ name: "Scimitar" })], 2, abilities), fear: blankFear(),
    traits: [], actions: [], bonus: [], reactions: [], description: "",
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
  const sb = d.sb && typeof d.sb === "object" ? ({ ...blankBlock(), ...(d.sb as LotrBlock) }) : parseLotrBlock(d, abilities);
  let attacks: AttackRow[] = [], actions: UseRow[] = [], fear = blankFear();
  if (Array.isArray(d.attackRows)) {
    attacks = (d.attackRows as AttackRow[]).map((r) => ({ ...newAttackRow(), ...r, dice: { ...{ n: 0, d: 6, m: 0 }, ...(r.dice ?? {}) }, extra: { ...(r.extra ?? {}) } }));
    actions = storedUse(d.actionRows);
    if (d.fear && typeof d.fear === "object") fear = { ...blankFear(), ...(d.fear as Fear) };
  } else {
    // Legacy: every action that's a recognisable attack (or Strike Fear) becomes
    // structured, only when re-composing gives back the exact text; the rest stay text.
    toND(d.actions).forEach((a) => {
      const r = parseLotrAttack(a.name, a.description, pb, abilities); if (r) { attacks.push(r); return; }
      const f = parseFear(a.name, a.description);
      if (f && !fear.on) { fear = { on: true, points: f.points, dc: f.dc, dcAuto: f.dc === 8 + pb + abilMod(abilities.CHA) }; return; }
      actions.push(splitUse(a.name, a.description));
    });
  }
  const has = (k: string) => Array.isArray(d.attackRows) && Array.isArray(d[k]);
  return {
    size: (SIZES as readonly string[]).includes(String(d.size)) ? String(d.size) : "Medium",
    ctype, tag: tm?.[2] ?? "", group: (MONSTER_GROUPS as readonly string[]).includes(String(d.group)) ? String(d.group) : "Other",
    ac: Math.min(30, Math.max(1, int(d.ac, 10))), acNote: String(d.acNote ?? "").replace(/^\(|\)$/g, ""), cr, abilities, sb,
    attacks, fear, actions,
    traits: has("traitRows") ? storedUse(d.traitRows) : toUse(d.traits),
    bonus: has("bonusRows") ? storedUse(d.bonusRows) : toUse(d.bonusActions),
    reactions: has("reactionRows") ? storedUse(d.reactionRows) : toUse(d.reactions),
    description: String(d.description ?? ""),
  };
}

const clean = (rows: UseRow[]) => rows.filter((r) => r.name.trim() || r.description.trim()).map((r) => ({ name: r.name.trim(), use: r.use, description: r.description.trim() }));

export function monsterPayload(name: string, m: MonsterDraft): Data {
  const pb = crPB(m.cr);
  const block = composeLotrBlock(m.sb, m.abilities, m.cr, m.size);
  const actionRows = clean(m.actions), traitRows = clean(m.traits), bonusRows = clean(m.bonus), reactionRows = clean(m.reactions);
  return {
    name, size: m.size, type: m.ctype + (m.tag.trim() ? ` (${m.tag.trim()})` : ""), alignment: "", group: m.group,
    ac: m.ac, acNote: m.acNote.trim() ? `(${m.acNote.trim()})` : "", cr: m.cr, abilities: m.abilities,
    ...block,
    traits: composeUseRows(traitRows), actions: composeLotrActions(m.attacks, m.fear, actionRows, pb, m.abilities.CHA),
    bonusActions: composeUseRows(bonusRows), reactions: composeUseRows(reactionRows),
    description: m.description.trim(),
    sb: m.sb, attackRows: m.attacks, fear: m.fear, actionRows, traitRows, bonusRows, reactionRows,
  };
}

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (m: MonsterDraft) => void }) {
  const pb = crPB(m.cr);
  const set = (p: Partial<MonsterDraft>) => {
    const next = { ...m, ...p };
    onChange({ ...next, attacks: syncLotrAttacks(next.attacks, crPB(next.cr), next.abilities) });
  };
  const sb = m.sb;
  const setSb = (p: Partial<LotrBlock>) => set({ sb: { ...sb, ...p } });
  const hp = blockHp(sb, m.size, m.abilities.CON);
  const die = SIZE_DIE[m.size] ?? 8;
  const fear = m.fear;
  const setFear = (p: Partial<Fear>) => set({ fear: { ...fear, ...p } });

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
        if (!prev || prev.extra?.abil !== a) return syncLotrAttacks([r], pb, m.abilities)[0];
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
          <Select className="min-w-[120px] flex-1" value={m.ctype} options={CREATURE_TYPES} onChange={(v) => set({ ctype: v })} />
          <input className={`${fieldCls} w-32 min-w-0`} list="lotr-hb-tags" value={m.tag} maxLength={40} placeholder="kind (Orc)" onChange={(e) => set({ tag: e.target.value })} />
          <datalist id="lotr-hb-tags">{TYPE_TAGS.map((x) => <option key={x} value={x} />)}</datalist>
        </div>
      </Cell>
      <Cell label="Adversary group" help="Where the bestiary and the GM Screen adversary picker file it.">
        <Select className="w-full" value={m.group} options={MONSTER_GROUPS} onChange={(v) => set({ group: v })} />
      </Cell>
      <Cell label="Description (optional)">
        <input className={fieldCls} value={m.description} maxLength={3000} placeholder="Who they are, where they lurk…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>

      <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-3">
        <Cell label="Armour Class"><Stepper value={m.ac} min={1} max={30} ariaLabel="armour class" onChange={(v) => set({ ac: v ?? 10 })} /></Cell>
        <Cell label="Armour (optional)" className="min-w-[150px] flex-1">
          <input className={fieldCls} list="lotr-hb-acnotes" value={m.acNote} maxLength={60} placeholder="orc-mail, shield" onChange={(e) => set({ acNote: e.target.value })} />
          <datalist id="lotr-hb-acnotes">{ARMOUR_NOTES.map((x) => <option key={x} value={x} />)}</datalist>
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
            <Toggle checked={sb.xpAuto} onChange={(v) => setSb({ xpAuto: v, xp: CR_XP[m.cr] ?? 0 })} title="XP from the CR table">Auto</Toggle>
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
          <Toggle checked={sb.hpAuto} title="Average of the hit dice: size die (Small d6, Medium d8, Large d10…) + CON modifier per die"
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
          {(["darkvision", "truesight", "blindsight", "tremorsense"] as const).map((k) => (
            <span key={k} className="flex flex-col items-center gap-0.5">
              <span className={styles.atkLbl}>{k}</span>
              <Stepper value={sb.senses[k]} min={0} max={1000} step={10} width="2.8em" ariaLabel={k} onChange={(v) => setSb({ senses: { ...sb.senses, [k]: v ?? 0 } })} />
            </span>
          ))}
          <span className="text-[12px] text-[var(--muted)]">
            Passive Perception <b className="text-[var(--text)]">{passivePerception(sb, m.abilities, pb)}</b>
            {sb.ppBonus != null ? <button type="button" className="ml-1 underline" title="Use 10 + Perception" onClick={() => setSb({ ppBonus: null })}>(fixed — reset)</button> : null}
          </span>
          <Toggle checked={!!sb.ppNote} title="The wolves' “(20 by hearing or smell)”"
            onChange={(v) => setSb({ ppNote: v ? `(${passivePerception(sb, m.abilities, pb) + 5} by hearing or smell)` : "" })}>
            Keen senses (+5 note)
          </Toggle>
        </div>
        {sb.senses.notes.length ? <div className="mt-2"><ChipPicker options={[]} value={sb.senses.notes} onChange={(v) => setSb({ senses: { ...sb.senses, notes: v } })} /></div> : null}
      </div>

      <Cell label="Languages" className="sm:col-span-2" help="None picked shows “—” (beasts, trolls that never speak).">
        <ChipPicker options={LANGUAGES} value={sb.langs} onChange={(v) => setSb({ langs: v })} custom customPh="Other tongue…" />
      </Cell>

      <Cell label="Damage resistances" className="sm:col-span-2"><ChipPicker options={[...DAMAGE_TYPES, ...RESIST_PHRASES.map((p) => [p, p.replace("bludgeoning, piercing, and slashing", "B/P/S")] as [string, string])]} value={sb.dres} onChange={(v) => setSb({ dres: v })} custom customPh="Other…" /></Cell>
      <Cell label="Damage immunities" className="sm:col-span-2"><ChipPicker options={DAMAGE_TYPES} value={sb.dimm} onChange={(v) => setSb({ dimm: v })} custom customPh="Other…" /></Cell>
      <Cell label="Damage vulnerabilities" className="sm:col-span-2"><ChipPicker options={DAMAGE_TYPES} value={sb.dvul} onChange={(v) => setSb({ dvul: v })} /></Cell>
      <Cell label="Condition immunities" className="sm:col-span-2"><ChipPicker options={CONDITIONS} value={sb.cimm} onChange={(v) => setSb({ cimm: v })} /></Cell>

      <Cell label="Traits" className="sm:col-span-2" help="“+ Book trait” adds an adversary trait in the book's wording (edit the numbers to fit).">
        <UseRows rows={m.traits} onChange={(v) => set({ traits: v })} namePh="Hatred (Elves)" textPh="What the trait does…" addLabel="+ Add trait"
          templates={ADVERSARY_TRAITS.map((t) => ({ name: t.name, use: t.use ?? "", description: t.description }))} />
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
            { key: "abil", label: "Auto from", options: [["", "Manual"], ["STR", "STR"], ["DEX", "DEX"]] },
          ]}
          slot={(r, patch) => <AtkCells r={r} patch={patch} />}
          namePh="Scimitar, Bite, Bow of Horn…"
          specialPh="After the damage: “; a Medium or smaller target must succeed on a DC 13 Strength save or be knocked prone”"
          blank={() => atk({ name: "" })}
          max={16}
        />
        <p className={hint}>“Auto from” keeps To hit = PB + the ability’s modifier and adds the modifier to damage; edit either number to go manual.</p>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Strike Fear</label>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Toggle checked={fear.on} onChange={(v) => setFear({ on: v, dcAuto: v ? fear.dcAuto : true })}>Can Strike Fear (Shadow from Dread)</Toggle>
          {fear.on ? (
            <>
              <span className="flex items-center gap-1.5 text-[12px] text-[var(--muted)]">Shadow points
                <Stepper value={fear.points} min={1} max={6} width="2em" ariaLabel="shadow points" onChange={(v) => setFear({ points: v ?? 1 })} />
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-[var(--muted)]">CHA save DC
                <Stepper value={fearDC(fear, pb, m.abilities.CHA)} min={5} max={30} width="2.2em" ariaLabel="strike fear DC" onChange={(v) => setFear({ dc: v ?? 12, dcAuto: false })} />
              </span>
              <Toggle checked={fear.dcAuto} title="8 + Proficiency Bonus + CHA modifier" onChange={(v) => setFear({ dcAuto: v, dc: fearDC({ ...fear, dcAuto: true }, pb, m.abilities.CHA) })}>Auto (8 + PB + CHA)</Toggle>
            </>
          ) : null}
        </div>
        <p className={hint}>Listed after the attacks with the book’s frightened / stunned / 24-hour immunity wording.</p>
      </div>

      <Cell label="Other actions" className="sm:col-span-2" help="Multiattack (listed first), Yell of Triumph, Wight Song… Dice like 1d10 become roll buttons on the GM Screen.">
        <UseRows rows={m.actions} onChange={(v) => set({ actions: v })} namePh="Multiattack" textPh="Two melee attacks, or one melee and one ranged attack." addLabel="+ Add action" />
      </Cell>
      <Cell label="Bonus actions" className="sm:col-span-2"><UseRows rows={m.bonus} onChange={(v) => set({ bonus: v })} addLabel="+ Add bonus action" /></Cell>
      <Cell label="Reactions" className="sm:col-span-2"><UseRows rows={m.reactions} onChange={(v) => set({ reactions: v })} namePh="Parry" textPh="Adds 2 to its AC against one melee attack that would hit it…" addLabel="+ Add reaction" /></Cell>
    </>
  );
}

// Reach / range / two-handed / plus-damage / target cells for one attack row.
function AtkCells({ r, patch }: { r: AttackRow; patch: (p: Partial<AttackRow>) => void }) {
  const e = r.extra ?? {};
  const setE = (p: Record<string, string>) => patch({ extra: { ...e, ...p } });
  const [nr, lr] = String(e.rng || "20/60").split("/").map((x) => parseInt(x, 10) || 0);
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
            <Stepper value={nr} min={5} max={1200} step={5} width="2.6em" ariaLabel="normal range" onChange={(v) => setE({ rng: `${v ?? 20}${lr ? "/" + lr : ""}` })} />
            <Stepper value={lr || null} nullable min={5} max={4800} step={5} width="2.6em" ariaLabel="long range" onChange={(v) => setE({ rng: `${nr}${v ? "/" + v : ""}` })} />
          </span>
        </label>
      ) : null}
      {e.kind !== "ranged" ? (
        <label className={styles.atkCell}><span className={styles.atkLbl}>Two-handed</span>
          <select className={styles.diceSel} aria-label="two-handed die" value={e.vers ?? ""} onChange={(ev) => setE({ vers: ev.target.value })}>
            <option value="">—</option>
            {[6, 8, 10, 12].map((d) => <option key={d} value={String(d)}>{r.dice.n || 1}d{d}</option>)}
          </select>
        </label>
      ) : null}
      <label className={styles.atkCell}><span className={styles.atkLbl}>Target</span>
        <select className={styles.diceSel} value={e.tgt || "one target"} onChange={(ev) => setE({ tgt: ev.target.value })}>
          <option value="one target">one target</option>
          <option value="one creature">one creature</option>
        </select>
      </label>
      <label className={styles.atkCell}><span className={styles.atkLbl}>Plus damage</span>
        <span className="flex items-center gap-1">
          <DiceInput value={d2} mod={false} ariaLabel="extra damage" onChange={(v) => setE({ d2: v.n > 0 ? formatDice({ ...v, m: 0 }) : "" })} />
          <select className={styles.diceSel} aria-label="extra damage type" value={e.t2 ?? ""} onChange={(ev) => setE({ t2: ev.target.value })}>
            <option value="">—</option>
            {DAMAGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </span>
      </label>
    </>
  );
}

const B = ({ children }: { children: string }) => <b className="text-[var(--hb-accent)]">{children}</b>;

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const p = monsterPayload(name, m) as Record<string, unknown> & { actions: ND[]; bonusActions: ND[]; traits: ND[]; reactions: ND[] };
  const pb = crPB(m.cr);
  const line = (k: string, v: unknown) => (v ? <p className="text-[13px]"><B>{k}</B> {String(v)}</p> : null);
  const list = (title: string, rows: ND[]) =>
    rows.length ? (
      <>
        <div className="mt-2 border-b border-[var(--border)] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--hb-accent)]">{title}</div>
        {rows.map((a, i) => <p key={i} className="mt-1 text-[13px] leading-relaxed"><b><i>{a.name}.</i></b> {a.description}</p>)}
      </>
    ) : null;
  return (
    <Preview title={name || "Unnamed adversary"} subtitle={`${m.size} ${String(p.type)} · ${m.group}`}>
      {m.description.trim() ? <p className="mb-1 text-[12px] italic text-[var(--muted)]">{m.description.trim()}</p> : null}
      {line("Armour Class", `${m.ac}${p.acNote ? " " + p.acNote : ""}`)}
      {line("Hit Points", p.hpFormula)}
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
      {line("Challenge", `${m.cr} (${Number(p.xp).toLocaleString("en")} XP; PB ${signed(pb)})`)}
      {list("Traits", p.traits)}
      {list("Actions", p.actions)}
      {list("Bonus Actions", p.bonusActions)}
      {list("Reactions", p.reactions)}
    </Preview>
  );
}
