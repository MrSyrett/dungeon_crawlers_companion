"use client";
// ── ICRPG homebrew MONSTER builder ───────────────────────────────────────────
// Storage = the book IcrpgMonster shape (lib/data/icrpg-types) read by
// /icrpg/bestiary, the GM Screen (xsMonSummary 'icrpg': stat buttons, attack
// buttons rolling d20 + STAT and the EFFORT), and the ICRPG session prep
// builder's bestiary picker:
//   world, tier, hearts, hp (only when not HEARTS × 10), defense,
//   stats {STR…CHA}, attacks string[], abilities string[], desc
// New builder data (lib/homebrew.ts composes the legacy strings from them):
//   attackRows    AttackRow[] (see rules: EFFORT die/count/+M, range/area, stat)
//                 → attacks ("Claw, WEAPON Effort, NEAR range, …")
//   effortBonus   {all|basic|weapon|gun|magic|ultimate: N} + actionsPerTurn
//                 → the first abilities line ("+4 WEAPON EFFORT, 2 actions per turn")
//   abilityRows   string[] → the rest of `abilities`
// Old records open through parseIcrpgAttack / parseMonsterLine; text that
// wouldn't re-compose exactly stays as printed, so nothing is lost.
import AttackRows, { type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  AREAS, EFFORT_BONUS_KEYS, EFFORT_DICE, ICRPG_STATS, ICRPG_WORLDS, MONSTER_TIERS, RANGES, cleanEffortBonus, composeIcrpgAttack, composeMonsterLine,
  effortOfDie, newIcrpgAttack, parseIcrpgAttack, parseMonsterLine, type EffortBonus,
} from "./rules";
import { Cell, Select, TextRows, Toggle, fieldCls, selCls } from "./ui";

type Data = Record<string, unknown>;
type Stat = (typeof ICRPG_STATS)[number];
export type MonsterDraft = {
  world: string; tier: string; hearts: number | null; hpAuto: boolean; hp: number; defense: number | null;
  stats: Record<Stat, number | null>; eb: EffortBonus; actions: number; attacks: AttackRow[]; abilities: string[]; desc: string;
};
const numOrNull = (v: unknown) => { const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : null; };
const strs = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x ?? "")).filter(Boolean) : []);

export const blankMonster = (): MonsterDraft => ({
  world: "core", tier: "Tier I", hearts: 1, hpAuto: true, hp: 10, defense: null,
  stats: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 }, eb: {}, actions: 1,
  attacks: [newIcrpgAttack({ name: "Claw" })], abilities: [], desc: "",
});
export function monsterFromData(d: Data): MonsterDraft {
  const st = (d.stats ?? {}) as Record<string, unknown>;
  const stats = Object.fromEntries(ICRPG_STATS.map((k) => [k, numOrNull(st[k])])) as Record<Stat, number | null>;
  const hearts = numOrNull(d.hearts), hp = numOrNull(d.hp);
  let abilities = strs(d.abilities), eb: EffortBonus = {}, actions = 1;
  if (Array.isArray(d.abilityRows)) { abilities = strs(d.abilityRows); eb = cleanEffortBonus(d.effortBonus); actions = Math.max(1, numOrNull(d.actionsPerTurn) ?? 1); }
  else if (abilities.length) { const p = parseMonsterLine(abilities[0]); if (p) { eb = p.eb; actions = p.actions; abilities = abilities.slice(1); } }
  return {
    world: String(d.world ?? "core"), tier: String(d.tier ?? ""), hearts,
    hpAuto: hp == null || (hearts != null && hp === hearts * 10), hp: hp ?? (hearts ?? 1) * 10, defense: numOrNull(d.defense),
    stats, eb, actions,
    attacks: Array.isArray(d.attackRows) ? (d.attackRows as AttackRow[]).map((r) => ({ ...newIcrpgAttack(), ...r, extra: { ...newIcrpgAttack().extra, ...(r.extra ?? {}) } })) : strs(d.attacks).map(parseIcrpgAttack),
    abilities, desc: String(d.desc ?? ""),
  };
}
const hpOf = (m: MonsterDraft) => (m.hpAuto ? (m.hearts ?? 1) * 10 : m.hp);
export function monsterPayload(name: string, m: MonsterDraft): Data {
  const out: Data = {
    name, world: m.world, tier: m.tier.trim(), hearts: m.hearts ?? "", hp: m.hpAuto ? "" : m.hp, defense: m.defense ?? "",
    attackRows: m.attacks, effortBonus: m.eb, actionsPerTurn: m.actions, abilityRows: m.abilities.map((x) => x.trim()).filter(Boolean), desc: m.desc,
  };
  for (const k of ICRPG_STATS) out[k] = m.stats[k] ?? "";
  return out;
}

// What the GM Screen rolls for a row: to hit d20 + STAT, EFFORT nDx + m + bonus.
function rollOf(m: MonsterDraft, r: AttackRow): { stat: string; hit: number; dmg: string } | null {
  if (r.extra?.txt || r.dice.n <= 0) return null;
  const e = effortOfDie(r.dice.d);
  const sv = (k: Stat) => m.stats[k] ?? 0;
  const stat = (r.extra?.stat as Stat) || (e?.key === "magic" ? (sv("INT") >= sv("WIS") ? "INT" : "WIS") : e?.key === "gun" || (r.range && r.range !== "CLOSE") ? "DEX" : "STR");
  const bon = r.dice.m + (m.eb[e?.key ?? ""] ?? 0) + (m.eb.all ?? 0);
  return { stat, hit: sv(stat), dmg: `${r.dice.n}d${r.dice.d}${bon ? (bon > 0 ? "+" : "") + bon : ""}` };
}
const sg = (n: number) => (n >= 0 ? `+${n}` : `−${-n}`);

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (v: MonsterDraft) => void }) {
  const set = (p: Partial<MonsterDraft>) => onChange({ ...m, ...p });
  const setStat = (k: Stat, v: number | null) => set({ stats: { ...m.stats, [k]: v } });
  return (
    <>
      <Cell label="Tier" className="sm:col-span-2">
        <ChipPicker single custom customPh="Other tier…" options={MONSTER_TIERS} value={m.tier ? [m.tier] : []} onChange={(v) => set({ tier: v[0] ?? "" })} />
      </Cell>
      <Cell label="World">
        <Select value={m.world} options={ICRPG_WORLDS} ariaLabel="world" onChange={(v) => set({ world: v })} />
      </Cell>
      <Cell label="HEARTS" help={m.hpAuto ? `${hpOf(m)} HP (10 per HEART).` : "HP set by hand."}>
        <span className="flex flex-wrap items-center gap-2">
          <Stepper value={m.hearts} min={1} max={30} nullable width="2.4em" ariaLabel="hearts" onChange={(v) => set({ hearts: v })} />
          <Toggle checked={m.hpAuto} onChange={(v) => set({ hpAuto: v, hp: hpOf(m) })}>HP auto</Toggle>
          {!m.hpAuto ? <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">HP<Stepper value={m.hp} min={1} max={999} width="3em" ariaLabel="hp" onChange={(v) => set({ hp: v ?? 1 })} /></span> : null}
        </span>
      </Cell>
      <Cell label="STATS" className="sm:col-span-2" help="Flat bonuses on its d20 rolls (blank = not listed). Max +10.">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {ICRPG_STATS.map((k) => (
            <span key={k} className="flex items-center gap-1 text-[12px] font-semibold text-[var(--muted)]">{k}
              <Stepper value={m.stats[k]} min={-5} max={10} signed nullable width="2.2em" ariaLabel={k} onChange={(v) => setStat(k, v)} />
            </span>
          ))}
          <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">set all
            <select className={selCls} aria-label="set all stats" value="" onChange={(e) => { const n = parseInt(e.target.value, 10); if (Number.isFinite(n)) set({ stats: Object.fromEntries(ICRPG_STATS.map((k) => [k, n])) as Record<Stat, number> }); }}>
              <option value="">—</option>{[0, 1, 2, 3, 4, 5, 6, 8, 10].map((n) => <option key={n} value={n}>+{n}</option>)}
            </select>
          </span>
        </div>
      </Cell>
      <Cell label="DEFENSE" help="Blank = not listed.">
        <Stepper value={m.defense} min={-5} max={20} signed nullable width="2.4em" ariaLabel="defense" onChange={(v) => set({ defense: v })} />
      </Cell>
      <Cell label="Actions per turn">
        <Stepper value={m.actions} min={1} max={6} width="2em" ariaLabel="actions per turn" onChange={(v) => set({ actions: v ?? 1 })} />
      </Cell>
      <Cell label="EFFORT bonus" className="sm:col-span-2" help="Added to its EFFORT rolls (written in the book's wording, e.g. “+4 WEAPON EFFORT”).">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {EFFORT_BONUS_KEYS.map(([k, l]) => (
            <span key={k} className="flex items-center gap-1 text-[12px] font-semibold text-[var(--muted)]">{l}
              <Stepper value={m.eb[k] ?? 0} min={-10} max={20} signed width="2.2em" ariaLabel={`${l} effort bonus`} onChange={(v) => set({ eb: { ...m.eb, [k]: v ?? 0 } })} />
            </span>
          ))}
        </div>
      </Cell>
      <Cell label="Attacks" className="sm:col-span-2" help="Damage = EFFORT: d4 Basic · d6 Weapon · d8 Guns · d10 Magic · d12 Ultimate (dice count for “4D12”, 0 = no damage). The GM Screen rolls d20 + the stat to hit and the EFFORT.">
        <AttackRows
          rows={m.attacks} onChange={(r) => set({ attacks: r })} count={false} hit={false} dice={EFFORT_DICE} modRange={[-10, 30]} ranges={[...RANGES]}
          extras={[{ key: "area", label: "Targets", options: AREAS }, { key: "stat", label: "Roll", options: [["", "auto"], ...ICRPG_STATS.map((s) => [s, s] as [string, string])] }]}
          namePh="Claw, Spit acid…" specialPh="Rider: DEX halves, grabs on a 6…" blank={() => newIcrpgAttack()} max={10}
          slot={(r, patch) => {
            const e = effortOfDie(r.dice.d), x = r.extra ?? {};
            return (
              <>
                <span className={styles.atkCell}><span className={styles.atkLbl}>EFFORT</span><span className="text-[12px] font-bold leading-[34px]">{r.dice.n > 0 ? e?.word ?? "—" : "none"}</span></span>
                {x.txt ? (
                  <label className={`${styles.atkCell} ${styles.atkGrow}`}>
                    <span className={styles.atkLbl}>As printed (kept)</span>
                    <span className="flex items-center gap-1">
                      <input className={`${selCls} min-w-0 flex-1`} value={x.txt} maxLength={240} onChange={(ev) => patch({ extra: { ...x, txt: ev.target.value } })} />
                      <span role="button" tabIndex={0} className={styles.iconBtn} title="Build it from the pickers instead" onClick={() => patch({ extra: { ...x, txt: "" } })}>×</span>
                    </span>
                  </label>
                ) : null}
              </>
            );
          }}
        />
      </Cell>
      <Cell label="Abilities" className="sm:col-span-2">
        <TextRows rows={m.abilities} onChange={(r) => set({ abilities: r })} placeholder="Lie in Wait: free surprise attack on CLOSE passers-by" addLabel="+ Ability" />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={m.desc} maxLength={3000} placeholder="What it is, where it lairs, how it fights…" onChange={(e) => set({ desc: e.target.value })} />
      </Cell>
    </>
  );
}

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const world = ICRPG_WORLDS.find(([k]) => k === m.world)?.[1] ?? m.world;
  const line = composeMonsterLine(m.eb, m.actions);
  const stats = ICRPG_STATS.filter((k) => m.stats[k] != null);
  return (
    <Preview title={name || "Unnamed monster"} subtitle={[m.tier, m.world !== "core" ? world : ""].filter(Boolean).join(" · ")}>
      <p className="font-mono text-[13px]">
        {m.hearts != null ? `${"♥".repeat(Math.min(m.hearts, 12))} ${m.hearts} HEART${m.hearts === 1 ? "" : "S"} · ` : ""}{hpOf(m)} HP{m.defense != null ? ` · DEFENSE ${sg(m.defense)}` : ""}
      </p>
      {stats.length ? <p className="font-mono text-[12px] text-[var(--muted)]">{stats.map((k) => `${k} ${sg(m.stats[k] ?? 0)}`).join("  ")}</p> : null}
      <ul className="mt-2 flex flex-col gap-1 text-[13px]">
        {m.attacks.map((r, i) => {
          const t = composeIcrpgAttack(r), roll = rollOf(m, r), at = t.indexOf(", ");
          return (
            <li key={i}>
              <b>{at > 0 && r.name ? t.slice(0, at) : t}</b>{at > 0 && r.name ? <span>{t.slice(at)}</span> : null}
              {roll ? <span className="ml-1 font-mono text-[11px] text-[var(--muted)]">[d20{sg(roll.hit)} {roll.stat} · {roll.dmg}]</span> : null}
            </li>
          );
        })}
      </ul>
      {[line, ...m.abilities].filter((x) => x.trim()).map((a, i) => <p key={i} className="mt-1 text-[13px]">• {a}</p>)}
      {m.desc ? <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-[var(--muted)]">{m.desc}</p> : null}
    </Preview>
  );
}
