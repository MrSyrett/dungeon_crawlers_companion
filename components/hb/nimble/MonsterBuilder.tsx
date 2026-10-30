"use client";
// ── Nimble homebrew monster builder ──────────────────────────────────────────
// Storage (type "nimble-monster", the NIMBLE_MONSTERS book shape the GM Screen,
// the bestiary page and the session prep builder read):
//   composed for every consumer: family, level, hp (null for minions), armor
//     (null | "M" | "H"), size, saves ("STR+, INT–"), legendary, minion,
//     abilities [{name, text}] — attacks as "Stab (2×)" / "(Reach 2) 1d6+15.
//     OR:" so the GM Screen rolls them (Nimble monsters never roll to hit: a 1
//     on the primary die misses, its top face crits), familyTrait, description
//   builder data: attackRows (AttackRow[]: ×count, Melee/Reach/Range + dist,
//     target, dice, damage type, rider, OR/Then join), traitRows ({name, text,
//     at} — `at` = how many attacks come before it), saveMods, hpAuto, speed
// Legacy records open through parseNimAbilities: an ability becomes an attack
// row only when it re-composes byte-exact, otherwise it stays a text row.
import AttackRows, { newAttackRow, type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { NIMBLE_FAMILIES } from "@/lib/data/nimble-families";
import {
  NIM_ATK_RANGES, NIM_DAMAGE_TYPES, NIM_DICE, NIM_FAMILIES, NIM_MON_LEVELS, NIM_MON_TABLE, NIM_SIZES, NIM_STATS,
  blankSaves, cleanSaves, composeNimAbilities, composeNimSaves, nimAvgDpr, nimMonsterHp, parseNimAbilities, parseNimSaves,
  type NimSaves, type NimTrait,
} from "./rules";
import { Cell, RowCtl, Select, Toggle, addBtn, fieldCls, hint, selCls } from "./ui";

type Data = Record<string, unknown>;
export type MonsterDraft = {
  family: string; level: string; size: string; armor: string;
  legendary: boolean; minion: boolean;
  hp: number; hpAuto: boolean; speed: number;
  saves: NimSaves; savesText: string;
  attacks: AttackRow[]; traits: NimTrait[];
  familyTrait: string; description: string;
};

const newAtk = () => newAttackRow({ name: "", hit: null, dice: { n: 1, d: 8, m: 0 }, range: "Melee", extra: { dist: "", target: "", join: "" } });
const int = (v: unknown, d: number) => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : d; };

export function blankMonster(): MonsterDraft {
  return {
    family: "", level: "1", size: "medium", armor: "", legendary: false, minion: false,
    hp: 26, hpAuto: true, speed: 6, saves: blankSaves(), savesText: "",
    attacks: [{ ...newAtk(), name: "Slash", dice: { n: 2, d: 8, m: 2 } }], traits: [], familyTrait: "", description: "",
  };
}
export function monsterFromData(d: Data): MonsterDraft {
  const abilities = Array.isArray(d.abilities) ? (d.abilities as { name: string; text: string }[]).map((a) => ({ name: String(a?.name ?? ""), text: String(a?.text ?? "") })) : [];
  const parsed = Array.isArray(d.attackRows) || Array.isArray(d.traitRows)
    ? { attacks: (Array.isArray(d.attackRows) ? d.attackRows : []) as AttackRow[], traits: (Array.isArray(d.traitRows) ? d.traitRows : []) as NimTrait[] }
    : parseNimAbilities(abilities);
  const level = String(d.level ?? "1") || "1";
  const armor = d.armor === "M" || d.armor === "H" ? String(d.armor) : "";
  const hp = int(d.hp, 0);
  const sv = d.saveMods && typeof d.saveMods === "object" ? cleanSaves(d.saveMods) : parseNimSaves(String(d.saves ?? ""));
  return {
    family: String(d.family ?? ""), level, size: String(d.size ?? "").toLowerCase(), armor,
    legendary: !!d.legendary, minion: !!d.minion,
    hp, hpAuto: d.hpAuto != null ? !!d.hpAuto : !d.legendary && hp === nimMonsterHp(level, armor),
    speed: d.speed != null ? int(d.speed, 6) : 6,
    saves: sv ?? blankSaves(), savesText: sv ? "" : String(d.saves ?? ""),
    attacks: parsed.attacks.map((r) => ({ ...newAtk(), ...r, hit: null, dice: { ...{ n: 1, d: 8, m: 0 }, ...(r.dice ?? {}) }, extra: { dist: "", target: "", join: "", ...(r.extra ?? {}) } })),
    traits: parsed.traits.map((t) => ({ name: String(t.name ?? ""), text: String(t.text ?? ""), at: int(t.at, 0) })),
    familyTrait: String(d.familyTrait ?? ""), description: String(d.description ?? ""),
  };
}
const autoOk = (m: MonsterDraft) => !m.legendary && !m.minion && nimMonsterHp(m.level, m.armor) != null;
const effectiveHp = (m: MonsterDraft): number | null => (m.minion ? null : m.hpAuto && autoOk(m) ? nimMonsterHp(m.level, m.armor) : m.hp);
const savesOf = (m: MonsterDraft) => (m.savesText.trim() ? m.savesText.trim() : composeNimSaves(m.saves));

export function monsterPayload(name: string, m: MonsterDraft): Data {
  return {
    name, family: m.family.trim(), level: m.level, size: m.size, armor: m.armor || null,
    legendary: m.legendary, minion: m.minion,
    hp: effectiveHp(m), hpAuto: m.hpAuto && autoOk(m), speed: m.speed,
    ...(m.savesText.trim() ? { saves: m.savesText.trim() } : { saveMods: m.saves, saves: composeNimSaves(m.saves) }),
    attackRows: m.attacks, traitRows: m.traits, abilities: composeNimAbilities(m.attacks, m.traits),
    familyTrait: m.familyTrait, description: m.description,
  };
}

const SAVE_OPTS: [string, string][] = [["-3", "– – –"], ["-2", "– –"], ["-1", "–"], ["0", "neutral"], ["1", "+"], ["2", "++"], ["3", "+++"]];
const JOIN: [string, string][] = [["", "—"], ["OR", "OR…"], ["Then", "Then…"]];

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (v: MonsterDraft) => void }) {
  const set = (p: Partial<MonsterDraft>) => onChange({ ...m, ...p });
  const row = NIM_MON_TABLE[m.level];
  const auto = nimMonsterHp(m.level, m.armor);
  const fam = NIMBLE_FAMILIES.find((f) => f.name.toLowerCase() === m.family.trim().toLowerCase());
  const dpr = nimAvgDpr(m.attacks);
  const setTrait = (i: number, p: Partial<NimTrait>) => set({ traits: m.traits.map((t, j) => (j === i ? { ...t, ...p } : t)) });
  const posOpts: [string, string][] = [["0", "Before the attacks"], ...m.attacks.map((a, i) => [String(i + 1), `After ${a.name.trim() || `attack ${i + 1}`}`] as [string, string])];

  return (
    <>
      <Cell label="Family / group">
        <input className={fieldCls} list="nim-mon-families" value={m.family} maxLength={60} placeholder="Kobolds, Undead… or your own" onChange={(e) => set({ family: e.target.value })} />
        <datalist id="nim-mon-families">{NIM_FAMILIES.map((f) => <option key={f} value={f} />)}</datalist>
      </Cell>
      <Cell label="Size">
        <ChipPicker single options={NIM_SIZES.map((x) => [x.toLowerCase(), x] as [string, string])} value={m.size ? [m.size] : []} onChange={(v) => set({ size: v[0] ?? "" })} />
      </Cell>

      <div className="sm:col-span-2 flex flex-wrap items-start gap-x-5 gap-y-3">
        <Cell label="Level">
          <Select value={m.level} options={NIM_MON_LEVELS} ariaLabel="level" onChange={(v) => set({ level: v })} />
        </Cell>
        <Cell label="Armor">
          <ChipPicker single options={[["", "None"], ["M", "Medium"], ["H", "Heavy"]]} value={[m.armor]} onChange={(v) => set({ armor: v[0] ?? "" })} />
        </Cell>
        <Cell label="Kind">
          <div className="flex flex-col gap-1 pt-1">
            <Toggle checked={m.minion} onChange={(v) => set({ minion: v, legendary: v ? false : m.legendary })} title="No HP: any damage kills it; its attacks never crit and add no bonus damage">Minion</Toggle>
            <Toggle checked={m.legendary} onChange={(v) => set({ legendary: v, minion: v ? false : m.minion, hpAuto: v ? false : m.hpAuto })} title="Solo boss: Actions, BLOODIED and LAST STAND">Legendary</Toggle>
          </div>
        </Cell>
        {!m.minion ? (
          <Cell label="HP">
            <div className="flex items-center gap-2">
              <Stepper value={m.hpAuto && autoOk(m) ? auto : m.hp} min={1} max={9999} width="3.6em" ariaLabel="hit points" onChange={(v) => set({ hp: v ?? 1, hpAuto: false })} />
              {autoOk(m) ? <Toggle checked={m.hpAuto} onChange={(v) => set({ hpAuto: v, hp: auto ?? m.hp })} title="GM's Guide Monster Builder table, by level and armor">Auto</Toggle> : null}
            </div>
          </Cell>
        ) : null}
        <Cell label="Speed">
          <Stepper value={m.speed} min={0} max={30} ariaLabel="speed" onChange={(v) => set({ speed: v ?? 6 })} />
        </Cell>
      </div>
      <div className="sm:col-span-2 -mt-1 text-[11px] text-[var(--muted)]">
        {m.minion ? "Minions have no HP — any damage kills them; their attacks don't crit or add bonus damage." :
          row && !m.legendary ? <>Monster Builder, level {m.level}: HP {row.hp[0]} / {row.hp[1]} (M) / {row.hp[2]} (H) · damage/round ≈{row.dpr} · save DC {row.dc} · e.g. {row.sample}.</> :
          m.legendary ? "Legendary monsters scale off the party's level (GM's Guide, Legendary Monster Builder)." : null}
      </div>

      <Cell label="Saves" className="sm:col-span-2" help="+ advantaged, – disadvantaged (each extra symbol is another die). ALL overrides the four.">
        {m.savesText ? (
          <span className="flex flex-wrap items-center gap-2">
            <input className={`${fieldCls} max-w-[220px]`} value={m.savesText} maxLength={80} onChange={(e) => set({ savesText: e.target.value })} />
            <button type="button" className="text-[11px] text-[var(--muted)] underline" onClick={() => set({ savesText: "" })}>use pickers</button>
          </span>
        ) : (
          <div className="flex flex-wrap gap-3">
            {(["all", ...NIM_STATS] as (keyof NimSaves)[]).map((k) => (
              <label key={k} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k}</span>
                <select className={selCls} value={String(m.saves[k])} disabled={k !== "all" && !!m.saves.all} onChange={(e) => set({ saves: { ...m.saves, [k]: parseInt(e.target.value, 10) } })}>
                  {SAVE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            ))}
          </div>
        )}
      </Cell>

      <div className="sm:col-span-2">
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Attacks</label>
        <AttackRows
          rows={m.attacks}
          // Switching a row to Reach / Range starts it at the book's usual distance (Reach 2, Range 8).
          onChange={(v) => set({ attacks: v.map((r, i) => (v.length === m.attacks.length && r.name === m.attacks[i].name && r.range !== m.attacks[i].range && r.range !== "Melee"
            ? { ...r, extra: { ...(r.extra ?? {}), dist: r.range === "Range" ? "8" : "2" } } : r)) })}
          count={{ min: 1, max: 10, label: "×" }}
          hit={false}
          dice={NIM_DICE}
          modRange={[-10, 100]}
          ranges={NIM_ATK_RANGES}
          damageTypes={[...NIM_DAMAGE_TYPES]}
          extras={[{ key: "join", label: "Chain", options: JOIN }]}
          namePh="Stab, Bite & Claw…"
          specialPh="Rider: On hit: Grappled (escape DC 12). / (or Sling, Range 8)"
          blank={newAtk}
          slot={(r, patch) => (
            <>
              {r.range !== "Melee" ? (
                <label className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{r.range}</span>
                  <Stepper value={int(r.extra?.dist, 1)} min={1} max={60} width="2.2em" ariaLabel="distance" onChange={(v) => patch({ extra: { ...(r.extra ?? {}), dist: String(v ?? 1) } })} />
                </label>
              ) : null}
              <label className="flex min-w-[120px] flex-1 flex-col gap-0.5">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Target (optional)</span>
                <input className={`${selCls} w-full`} value={r.extra?.target ?? ""} maxLength={60} placeholder="A Grappled creature" onChange={(e) => patch({ extra: { ...(r.extra ?? {}), target: e.target.value } })} />
              </label>
            </>
          )}
        />
        <p className={hint}>
          No to-hit: the GM Screen rolls the damage — a 1 on the primary die misses, its max crits. ×N = attacks per turn; OR / Then chain into the next ability.
          {m.attacks.length ? <> Average damage/round ≈ <b className="text-[var(--text)]">{dpr}</b>{row && !m.legendary ? ` (table: ${row.dpr})` : ""}.</> : null}
        </p>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Abilities &amp; traits</label>
        <div className="flex flex-col gap-2">
          {m.traits.map((t, i) => (
            <div key={i} className="rounded border border-[var(--border)] p-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input className={`${fieldCls} sm:w-44 sm:self-start`} value={t.name} maxLength={120} placeholder="Revenge!, BLOODIED…" onChange={(e) => setTrait(i, { name: e.target.value })} />
                <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={t.text} maxLength={1000} placeholder="What it does. Dice like 2d6 become roll buttons on the GM Screen." onChange={(e) => setTrait(i, { text: e.target.value })} />
                <RowCtl rows={m.traits} i={i} onChange={(r) => set({ traits: r })} />
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--muted)]">
                Listed
                <Select value={String(Math.min(t.at, m.attacks.length))} options={posOpts} ariaLabel="position" onChange={(v) => setTrait(i, { at: parseInt(v, 10) })} />
              </div>
            </div>
          ))}
        </div>
        {m.traits.length < 30 ? <button type="button" className={addBtn} onClick={() => set({ traits: [...m.traits, { name: "", text: "", at: 0 }] })}>+ Add ability</button> : null}
      </div>

      <Cell label="Family trait" className="sm:col-span-2" help={fam?.trait && fam.trait !== m.familyTrait ? (
        <button type="button" className="underline" onClick={() => set({ familyTrait: fam.trait ?? "" })}>Use the {fam.name} trait</button>
      ) : null}>
        <textarea className={`${fieldCls} min-h-[56px]`} value={m.familyTrait} maxLength={1000} placeholder="Shared by the whole family (e.g. Nooooo!)" onChange={(e) => set({ familyTrait: e.target.value })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[64px]`} value={m.description} maxLength={2000} onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const hp = effectiveHp(m);
  const sv = savesOf(m);
  const abil = composeNimAbilities(m.attacks, m.traits);
  const size = m.size ? m.size[0].toUpperCase() + m.size.slice(1) : "";
  return (
    <Preview title={name || "Unnamed monster"} subtitle={[`Level ${m.level}${m.legendary ? " Solo" : ""}`, size, m.family || "Homebrew"].filter(Boolean).join(" · ")}>
      <p className="font-mono text-[12px]">
        {m.minion ? "minion" : `${hp ?? "—"} HP`}{m.armor ? ` · ${m.armor === "H" ? "Heavy" : "Medium"} armor` : ""} · Speed {m.speed}{sv ? ` · Saves ${sv}` : ""}
      </p>
      {m.description ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">{m.description}</p> : null}
      <ul className="mt-2 flex flex-col gap-1">
        {abil.map((a, i) => <li key={i} className="text-[13px] leading-relaxed"><b>{a.name}.</b> <span className="text-[var(--muted)]">{a.text}</span></li>)}
      </ul>
      {m.familyTrait ? <p className="mt-2 text-[12px] text-[var(--muted)]"><b>Family trait:</b> {m.familyTrait}</p> : null}
    </Preview>
  );
}
