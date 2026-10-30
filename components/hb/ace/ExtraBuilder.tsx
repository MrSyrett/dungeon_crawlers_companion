"use client";
// ── ACE! homebrew Extra builder (mooks, monsters, villains, robots…) ────────
// Storage = AceExtra (lib/data/ace-types.ts): type, setting, the Stats
// (nullable; Power only when it has one), focuses [{stat, name, dice?}],
// health, defence, attacks [{name, dice, damage, note?}], notes, description.
// New optional fields: attackRows (the structured rows below) and
// auto {health, defence}; lib/homebrew.ts normalizeAceExtra composes `attacks`
// (and auto Health / Defence) from them with ./rules, so every consumer — the
// /ace/extras bestiary, the GM Screen (xsBestiary('ace') rolls each attack's
// dice pool vs Defence and shows the flat damage), the session prep builder —
// reads the same book shape. Old records parse their attacks into rows
// ("30' range, …" splits into range + rider; anything else stays the rider).
import AttackRows, { type AttackRow } from "../AttackRows";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  ACE_SETTINGS, ACE_STATS, BOOK_WEAPONS, EXTRA_TYPES, STAT_KEY, attackToRow, cleanAtkRows, composeAttack, deriveDefence, deriveHealth,
  focusDice, rowDice, settingLabel, unarmedDamage, type AceAtkRow, type AceStat, type ExFocus, type ExStats,
} from "./rules";
import { Cell, OpenSelect, RowCtl, Select, Toggle, addBtn, fieldCls, focusNamesFor, hint, selCls, useAceData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const nn = (v: unknown): number | null => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? n : null; };

export type ExtraDraft = {
  setting: string; type: string; stats: ExStats; focuses: ExFocus[];
  health: number | null; defence: number | null; auto: { health: boolean; defence: boolean };
  rows: AttackRow[]; notes: string[]; description: string;
};

// AttackRows ↔ AceAtkRow: the dice pool rides in `hit`, everything else in `extra`.
const toAtk = (r: AceAtkRow): AttackRow => ({
  name: r.name, count: 1, hit: r.dice, dice: { n: 0, d: 6, m: 0 }, special: r.special,
  extra: { stat: r.stat, focus: r.focus, auto: r.auto ? "1" : "", dmg: r.damage == null ? "" : String(r.damage), range: r.range ? String(r.range) : "" },
});
const fromAtk = (a: AttackRow): AceAtkRow => ({
  name: a.name, stat: ((ACE_STATS as readonly string[]).includes(a.extra?.stat ?? "") ? a.extra?.stat : "") as AceStat | "",
  focus: a.extra?.focus ?? "", auto: a.extra?.auto === "1" && !!a.extra?.stat, dice: a.hit, damage: nn(a.extra?.dmg),
  range: nn(a.extra?.range) || null, special: a.special,
});
const rowsOf = (x: ExtraDraft) => x.rows.map(fromAtk);
/** Keep auto rows' dice in step with the Stats / Focuses. */
const sync = (x: ExtraDraft): ExtraDraft => ({
  ...x,
  rows: x.rows.map((a) => { const r = fromAtk(a); return r.auto ? { ...a, hit: rowDice(r, x.stats, x.focuses) } : a; }),
  health: x.auto.health ? deriveHealth(x.type, x.stats, x.focuses) : x.health,
  defence: x.auto.defence ? deriveDefence(x.stats, x.focuses) : x.defence,
});

export const blankExtra = (): ExtraDraft => sync({
  setting: "core", type: "Monster", stats: { smarts: 2, moves: 2, style: 2, brawn: 3, power: null }, focuses: [],
  health: null, defence: null, auto: { health: true, defence: true },
  rows: [toAtk({ name: "Brawling", stat: "Brawn", focus: "", auto: true, dice: 3, damage: 1, range: null, special: "" })], notes: [], description: "",
});
export function extraFromData(d: Data): ExtraDraft {
  const stats: ExStats = { smarts: nn(d.smarts), moves: nn(d.moves), style: nn(d.style), brawn: nn(d.brawn), power: nn(d.power) };
  const focuses: ExFocus[] = (Array.isArray(d.focuses) ? d.focuses : []).map((r) => {
    const f = (r ?? {}) as Data;
    return { stat: ((ACE_STATS as readonly string[]).includes(sv(f, "stat")) ? sv(f, "stat") : "Brawn") as AceStat, name: sv(f, "name"), dice: nn(f.dice) };
  }).filter((f) => f.name);
  const type = sv(d, "type") || "Monster";
  const health = nn(d.health), defence = nn(d.defence);
  const au = (d.auto ?? null) as Data | null;
  const auto = au && typeof au === "object"
    ? { health: au.health === true, defence: au.defence === true }
    : { health: health != null && health === deriveHealth(type, stats, focuses), defence: defence != null && defence === deriveDefence(stats, focuses) };
  const rows = Array.isArray(d.attackRows)
    ? cleanAtkRows(d.attackRows)
    : (Array.isArray(d.attacks) ? d.attacks : []).map((a) => attackToRow((a ?? {}) as Data, stats, focuses)).filter((r) => r.name);
  return sync({
    setting: sv(d, "setting") || "core", type, stats, focuses, health, defence, auto, rows: rows.map(toAtk),
    notes: (Array.isArray(d.notes) ? d.notes : []).map((x) => String(x ?? "")).filter((x) => x.trim()), description: sv(d, "description"),
  });
}
export function extraPayload(name: string, x0: ExtraDraft): Data {
  const x = sync(x0);
  const rows = rowsOf(x).filter((r) => r.name.trim());
  const out: Data = {
    name, setting: x.setting, type: x.type, smarts: x.stats.smarts, moves: x.stats.moves, style: x.stats.style, brawn: x.stats.brawn,
    focuses: x.focuses.filter((f) => f.name.trim()).map((f) => (f.dice != null ? f : { stat: f.stat, name: f.name })),
    health: x.health, defence: x.defence, auto: x.auto,
    attackRows: rows, attacks: rows.map((r) => composeAttack(r, x.stats, x.focuses)),
    notes: x.notes.map((n) => n.trim()).filter(Boolean), description: x.description,
  };
  if (x.stats.power != null) out.power = x.stats.power;
  return out;
}

function FocusRows({ x, onChange, names }: { x: ExtraDraft; onChange: (f: ExFocus[]) => void; names: (stat: string) => string[] }) {
  const rows = x.focuses;
  const patch = (i: number, p: Partial<ExFocus>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const stats = ACE_STATS.filter((s) => s !== "Power" || x.stats.power != null);
  return (
    <div className="flex flex-col gap-2">
      {ACE_STATS.map((s) => <datalist key={s} id={`ace-hb-focus-${s}`}>{names(s).map((n) => <option key={n} value={n} />)}</datalist>)}
      {rows.map((f, i) => {
        const base = (x.stats[STAT_KEY[f.stat]] ?? 0) + 2;
        return (
          <div key={i} className={styles.atkLine}>
            <label className={styles.atkCell}><span className={styles.atkLbl}>Stat</span>
              <Select value={f.stat} options={stats} ariaLabel="focus stat" onChange={(v) => patch(i, { stat: v as AceStat })} />
            </label>
            <label className={`${styles.atkCell} ${styles.atkGrow}`}><span className={styles.atkLbl}>Focus</span>
              <input className={selCls} list={`ace-hb-focus-${f.stat}`} value={f.name} maxLength={60} placeholder="Brawling" onChange={(e) => patch(i, { name: e.target.value })} />
            </label>
            <label className={styles.atkCell} title="Printed dice total, when it isn't Stat + 2"><span className={styles.atkLbl}>Dice {f.dice == null ? `(${base})` : ""}</span>
              <Stepper value={f.dice} min={0} max={30} nullable width="2.4em" ariaLabel="focus dice" onChange={(n) => patch(i, { dice: n })} />
            </label>
            <span className="self-center"><RowCtl rows={rows} i={i} onChange={onChange} /></span>
          </div>
        );
      })}
      <button type="button" className={`${addBtn} self-start`} onClick={() => onChange([...rows, { stat: "Brawn", name: "", dice: null }])}>+ Focus</button>
    </div>
  );
}

export default function ExtraBuilder({ value: x, onChange }: { value: ExtraDraft; onChange: (v: ExtraDraft) => void }) {
  const data = useAceData();
  const set = (p: Partial<ExtraDraft>) => onChange(sync({ ...x, ...p }));
  const setStat = (k: keyof ExStats, n: number | null) => set({ stats: { ...x.stats, [k]: n } });
  const focusOf = (stat: string, re: RegExp) => x.focuses.find((f) => f.stat === stat && re.test(f.name))?.name ?? "";
  const statOpts = ACE_STATS.filter((s) => s !== "Power" || x.stats.power != null);
  // Typing a dice number on an auto row takes it off auto.
  const onRows = (rows: AttackRow[]) => set({
    rows: rows.map((a, i) => {
      const old = x.rows[i];
      if (old && a.extra?.auto === "1" && a.hit !== old.hit && a.extra === old.extra) return { ...a, extra: { ...a.extra, auto: "" } };
      return a;
    }),
  });
  const addPreset = (v: string) => {
    if (!v) return;
    let r: AceAtkRow;
    if (v === "__unarmed") r = { name: "Brawling", stat: "Brawn", focus: focusOf("Brawn", /^brawl/i), auto: true, dice: null, damage: unarmedDamage(x.stats.brawn), range: null, special: "" };
    else if (v === "__power") r = { name: "Power bolt", stat: "Power", focus: x.focuses.find((f) => f.stat === "Power")?.name ?? "", auto: true, dice: null, damage: 1, range: 30, special: "" };
    else {
      const w = BOOK_WEAPONS.find((b) => b.name === v); if (!w) return;
      r = w.ranged
        ? { name: w.name, stat: "Moves", focus: focusOf("Moves", /^shoot/i), auto: true, dice: null, damage: w.damage, range: null, special: "" }
        : { name: w.name, stat: "Brawn", focus: focusOf("Brawn", /^brawl/i), auto: true, dice: null, damage: w.damage, range: null, special: "" };
    }
    set({ rows: [...x.rows, toAtk(r)] });
  };
  const dh = deriveHealth(x.type, x.stats, x.focuses), dd = deriveDefence(x.stats, x.focuses);
  return (
    <>
      <Cell label="Type"><OpenSelect value={x.type} options={EXTRA_TYPES} ariaLabel="type" onChange={(v) => set({ type: v })} /></Cell>
      <Cell label="Setting"><Select value={x.setting} options={ACE_SETTINGS} ariaLabel="setting" onChange={(v) => set({ setting: v })} /></Cell>
      <Cell label="Stats" className="sm:col-span-2" help="Dice rolled for each Stat (a Hero spends 12 points, 2–5 each; Extras can go past that). Clear Power unless it has one.">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {ACE_STATS.map((s) => (
            <label key={s} className="flex flex-col gap-1 rounded border border-[var(--border)] px-2 py-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{s}</span>
              <Stepper value={x.stats[STAT_KEY[s]]} min={0} max={20} nullable width="2.2em" ariaLabel={s} onChange={(n) => setStat(STAT_KEY[s], n)} />
            </label>
          ))}
        </div>
      </Cell>
      <Cell label="Focuses" className="sm:col-span-2" help="A Focus rolls its Stat + 2 dice unless the book prints another total.">
        <FocusRows x={x} names={(s) => focusNamesFor(data, s)} onChange={(f) => set({ focuses: f })} />
      </Cell>
      <Cell label="Health" help={x.type === "Mook" ? "Mooks always have 1 Health." : `Brawn${x.focuses.some((f) => f.stat === "Brawn" && /^tough/i.test(f.name)) ? " + 2 (Tough)" : ""} = ${dh}`}>
        <span className="flex flex-wrap items-center gap-3">
          {x.auto.health ? <span className="font-mono text-sm font-bold">{dh}</span> : <Stepper value={x.health} min={0} max={50} nullable ariaLabel="health" onChange={(n) => set({ health: n })} />}
          <Toggle checked={x.auto.health} onChange={(v) => set({ auto: { ...x.auto, health: v } })}>Auto</Toggle>
        </span>
      </Cell>
      <Cell label="Defence" help={`Moves × 3${x.focuses.some((f) => f.stat === "Moves" && /^dodg/i.test(f.name)) ? " + 6 (Dodging)" : ""}, min 8 = ${dd}`}>
        <span className="flex flex-wrap items-center gap-3">
          {x.auto.defence ? <span className="font-mono text-sm font-bold">{dd}</span> : <Stepper value={x.defence} min={0} max={60} nullable ariaLabel="defence" onChange={(n) => set({ defence: n })} />}
          <Toggle checked={x.auto.defence} onChange={(v) => set({ auto: { ...x.auto, defence: v } })}>Auto</Toggle>
        </span>
      </Cell>
      <Cell label="Attacks" className="sm:col-span-2" help="Roll the dice pool against the target's Defence; a hit deals the flat damage. Auto keeps the dice equal to the Stat (+ Focus).">
        <AttackRows
          rows={x.rows}
          onChange={onRows}
          count={false}
          hit={{ label: "Dice", min: 0, max: 30, optional: true }}
          hitSigned={false}
          namePh="Claws"
          specialPh="Rider: grabs target, needs Brawn 10 check to escape…"
          addLabel="+ Attack"
          blank={() => toAtk({ name: "", stat: "Brawn", focus: focusOf("Brawn", /^brawl/i), auto: true, dice: rowDice({ name: "", stat: "Brawn", focus: focusOf("Brawn", /^brawl/i), auto: true, dice: null, damage: 1, range: null, special: "" }, x.stats, x.focuses), damage: 1, range: null, special: "" })}
          damageCell={(row, patch) => (
            <Stepper value={nn(row.extra?.dmg)} min={0} max={20} nullable width="2.2em" ariaLabel="damage" onChange={(n) => patch({ extra: { ...row.extra, dmg: n == null ? "" : String(n) } })} />
          )}
          slot={(row, patch) => {
            const st = row.extra?.stat ?? "";
            const fos = x.focuses.filter((f) => f.stat === st);
            const ex = (p: Record<string, string>) => {
              const extra = { ...row.extra, ...p };
              const r = fromAtk({ ...row, extra });
              patch({ extra, ...(r.auto ? { hit: rowDice(r, x.stats, x.focuses) } : {}) });
            };
            return (
              <>
                <label className={styles.atkCell}><span className={styles.atkLbl}>Roll</span>
                  <select className={styles.diceSel} value={st} aria-label="roll stat" onChange={(e) => ex({ stat: e.target.value, focus: "", auto: e.target.value ? row.extra?.auto ?? "1" : "" })}>
                    <option value="">—</option>
                    {statOpts.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label className={styles.atkCell}><span className={styles.atkLbl}>+ Focus</span>
                  <select className={styles.diceSel} value={row.extra?.focus ?? ""} disabled={!st} aria-label="roll focus" onChange={(e) => ex({ focus: e.target.value })}>
                    <option value="">none</option>
                    {fos.map((f) => <option key={f.name} value={f.name}>{f.name} ({focusDice(x.stats, f)})</option>)}
                    {row.extra?.focus && !fos.some((f) => f.name === row.extra?.focus) ? <option value={row.extra.focus}>{row.extra.focus}</option> : null}
                  </select>
                </label>
                <label className={`${styles.atkCell} self-end pb-2`}><Toggle checked={row.extra?.auto === "1"} onChange={(v) => ex({ auto: v && st ? "1" : "" })} title="Dice follow the Stat (+ Focus)">Auto</Toggle></label>
                <label className={styles.atkCell}><span className={styles.atkLbl}>Range ft</span>
                  <Stepper value={nn(row.extra?.range) || null} min={5} max={995} step={5} nullable width="2.6em" ariaLabel="range" onChange={(n) => patch({ extra: { ...row.extra, range: n ? String(n) : "" } })} />
                </label>
              </>
            );
          }}
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select className={selCls} value="" aria-label="add a weapon" onChange={(e) => addPreset(e.target.value)}>
            <option value="">+ From the weapon table…</option>
            <option value="__unarmed">Unarmed (Brawn: {unarmedDamage(x.stats.brawn)} dmg)</option>
            {x.stats.power != null ? <option value="__power">Power attack (1 dmg, +1 per extra Karma)</option> : null}
            {BOOK_WEAPONS.map((w) => <option key={w.name} value={w.name}>{w.name} ({w.damage} dmg, {w.ranged ? "Moves" : "Brawn"})</option>)}
          </select>
          <span className={hint}>Melee rolls Brawn (+ Brawling); ranged rolls Moves (+ Shooting). Long range −1 die.</span>
        </div>
      </Cell>
      <Cell label="Special abilities" className="sm:col-span-2">
        <div className="flex flex-col gap-2">
          {x.notes.map((n, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={fieldCls} value={n} maxLength={200} placeholder="Regenerate 1 Health each round." onChange={(e) => set({ notes: x.notes.map((v, j) => (j === i ? e.target.value : v)) })} />
              <RowCtl rows={x.notes} i={i} onChange={(r) => set({ notes: r })} />
            </div>
          ))}
          <button type="button" className={`${addBtn} self-start`} onClick={() => set({ notes: [...x.notes, ""] })}>+ Ability</button>
        </div>
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={x.description} maxLength={2000} placeholder="Who they are, what they want…" onChange={(e) => set({ description: e.target.value })} />
      </Cell>
    </>
  );
}

export function ExtraPreview({ name, x: x0 }: { name: string; x: ExtraDraft }) {
  const x = sync(x0);
  const shown = ACE_STATS.filter((s) => s !== "Power" || x.stats.power != null);
  const attacks = rowsOf(x).filter((r) => r.name.trim()).map((r) => composeAttack(r, x.stats, x.focuses));
  return (
    <Preview title={name || "Unnamed Extra"} subtitle={`${x.type || "Extra"} · ${settingLabel(x.setting)}`}>
      {x.description ? <p className="mb-2 text-[12px] italic text-[var(--muted)]">{x.description}</p> : null}
      <div className={`grid gap-1 ${shown.length === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
        {shown.map((s) => {
          const fo = x.focuses.filter((f) => f.stat === s && f.name);
          return (
            <div key={s} className="rounded border border-[var(--border)] px-1.5 py-1">
              <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{s}</div>
              <div className="font-mono text-base font-bold">{x.stats[STAT_KEY[s]] ?? "—"}</div>
              {fo.length ? <div className="text-[10px] leading-tight text-[var(--hb-accent)]">{fo.map((f) => `${f.name} ${focusDice(x.stats, f)}`).join(", ")}</div> : null}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-4 text-[12px]"><span>Health <b className="font-mono">{x.health ?? "—"}</b></span><span>Defence <b className="font-mono">{x.defence ?? "—"}</b></span></div>
      {attacks.length ? (
        <ul className="mt-2 flex flex-col gap-0.5 text-[13px]">
          {attacks.map((a, i) => (
            <li key={i}><b>{a.name}</b>{a.dice != null ? <span className="font-mono"> {a.dice}</span> : null}
              {a.damage != null ? <span className="text-[var(--muted)]"> ({a.damage} damage{a.note ? `, ${a.note}` : ""})</span> : a.note ? <span className="text-[var(--muted)]"> ({a.note})</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {x.notes.filter((n) => n.trim()).length ? (
        <ul className="mt-2 flex flex-col gap-0.5 text-[12px] text-[var(--muted)]">{x.notes.filter((n) => n.trim()).map((n, i) => <li key={i}>▸ {n}</li>)}</ul>
      ) : null}
    </Preview>
  );
}
