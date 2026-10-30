"use client";
// ── Shadowdark homebrew monster builder ──────────────────────────────────────
// Stat block built from steppers / selects / attack rows; live preview in the
// book's one-paragraph format. Storage (type "monster", SD_MONSTERS shape):
//   legacy, still composed for every consumer: ac, hp, atk, mv, lv, al,
//     s d c i w ch ("+2"), notes, ctype
//   builder data: attackRows (AttackRow[]), traitRows ({name,text}[]), hpAuto,
//     acNote
// The server (lib/homebrew.ts normalizeMonster) re-composes atk / notes from
// the rows with the same functions (./rules), so preview == stored text.
import AttackRows, { newAttackRow, type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  SD_ALIGNMENTS, SD_ATTACK_RANGES, SD_DICE, SD_MOD_MAX, SD_MOD_MIN, SD_MOVE_DISTS, SD_MOVE_MODES, SD_MOVE_MULTS, SD_STATS,
  composeSdAttacks, composeSdMove, composeSdTraits, parseSdAttacks, parseSdMove, parseSdTraits, sdMonsterHp,
  type SdMove, type SdTrait,
} from "./rules";

type ModKey = "s" | "d" | "c" | "i" | "w" | "ch";
export type MonsterDraft = {
  ctype: string;
  lv: number;
  ac: number;
  acNote: string;
  hp: number;
  hpAuto: boolean;
  al: string;
  move: SdMove;
  mods: Record<ModKey, number>;
  attacks: AttackRow[];
  traits: SdTrait[];
};

const int = (v: unknown, d: number) => {
  const n = parseInt(String(v ?? "").replace(/^\+/, ""), 10);
  return Number.isFinite(n) ? n : d;
};
const signed = (n: number) => (n >= 0 ? "+" : "") + n;

export function blankMonster(): MonsterDraft {
  return {
    ctype: "Monster", lv: 1, ac: 11, acNote: "", hp: 4, hpAuto: true, al: "N",
    move: { mult: "", dist: "near", modes: [] },
    mods: { s: 0, d: 0, c: 0, i: 0, w: 0, ch: 0 },
    attacks: [newAttackRow({ name: "claw", hit: 1, dice: { n: 1, d: 6, m: 0 }, range: "Close" })],
    traits: [],
  };
}

/** Open a stored record (new or legacy shape) in the builder. */
export function monsterFromData(d: Record<string, unknown>): MonsterDraft {
  const acStr = String(d.ac ?? "").trim();
  const acM = acStr.match(/^(\d+)\s*(?:\((.*)\))?\s*(.*)$/);
  const mods = { s: 0, d: 0, c: 0, i: 0, w: 0, ch: 0 } as Record<ModKey, number>;
  (Object.keys(mods) as ModKey[]).forEach((k) => (mods[k] = int(d[k], 0)));
  const rows = Array.isArray(d.attackRows) && d.attackRows.length ? (d.attackRows as AttackRow[]) : parseSdAttacks(String(d.atk ?? ""));
  const traits = Array.isArray(d.traitRows) ? (d.traitRows as SdTrait[]) : parseSdTraits(String(d.notes ?? ""));
  const lv = int(d.lv, 1);
  const hp = int(d.hp, 1);
  return {
    ctype: String(d.ctype || "Monster"),
    lv,
    ac: acM ? int(acM[1], 10) : 10,
    acNote: String(d.acNote ?? (acM ? [acM[2], acM[3]].filter(Boolean).join(" ") : acStr)).trim(),
    hp,
    // Legacy rows have no flag: treat as auto only when the HP already matches the book rule.
    hpAuto: d.hpAuto != null ? !!d.hpAuto : hp === sdMonsterHp(lv, mods.c),
    al: ["L", "N", "C"].includes(String(d.al)) ? String(d.al) : "N",
    move: parseSdMove(String(d.mv ?? "")) ?? { mult: "", dist: "near", modes: [] },
    mods,
    attacks: rows.map((r) => ({ ...newAttackRow(), ...r, dice: { ...{ n: 0, d: 6, m: 0 }, ...(r.dice ?? {}) } })),
    traits: traits.map((t) => ({ name: String(t.name ?? ""), text: String(t.text ?? "") })),
  };
}

const effectiveHp = (m: MonsterDraft) => (m.hpAuto ? sdMonsterHp(m.lv, m.mods.c) : m.hp);
const acText = (m: MonsterDraft) => (m.acNote.trim() ? `${m.ac} (${m.acNote.trim().replace(/[()]/g, "")})` : String(m.ac));

/** Payload for /api/homebrew — builder data plus the composed legacy fields. */
export function monsterPayload(name: string, m: MonsterDraft): Record<string, unknown> {
  return {
    name,
    ctype: m.ctype,
    lv: String(m.lv),
    ac: acText(m),
    acNote: m.acNote.trim(),
    hp: String(effectiveHp(m)),
    hpAuto: m.hpAuto,
    al: m.al,
    mv: composeSdMove(m.move),
    s: signed(m.mods.s), d: signed(m.mods.d), c: signed(m.mods.c),
    i: signed(m.mods.i), w: signed(m.mods.w), ch: signed(m.mods.ch),
    attackRows: m.attacks,
    atk: composeSdAttacks(m.attacks),
    traitRows: m.traits,
    notes: composeSdTraits(m.traits),
  };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls =
  "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const smallBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

export default function MonsterBuilder({
  value: m,
  onChange,
  monsterTypes,
}: {
  value: MonsterDraft;
  onChange: (m: MonsterDraft) => void;
  monsterTypes: string[];
}) {
  const set = <K extends keyof MonsterDraft>(k: K, v: MonsterDraft[K]) => onChange({ ...m, [k]: v });
  const types = monsterTypes.length ? monsterTypes : ["Monster"];
  const autoHp = sdMonsterHp(m.lv, m.mods.c);
  const setTrait = (i: number, p: Partial<SdTrait>) => set("traits", m.traits.map((t, j) => (j === i ? { ...t, ...p } : t)));
  const moveTrait = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= m.traits.length) return;
    const next = m.traits.slice();
    [next[i], next[j]] = [next[j], next[i]];
    set("traits", next);
  };

  return (
    <>
      <div>
        <label className={lbl}>Creature type</label>
        <select className={`${selCls} w-full`} value={m.ctype} onChange={(e) => set("ctype", e.target.value)}>
          {(types.includes(m.ctype) ? types : [...types, m.ctype]).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={lbl}>Alignment</label>
        <ChipPicker single options={SD_ALIGNMENTS} value={[m.al]} onChange={(v) => set("al", v[0] ?? "N")} />
      </div>

      <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-3">
        <div>
          <label className={lbl}>Level</label>
          <Stepper value={m.lv} min={0} max={30} ariaLabel="level" onChange={(v) => set("lv", v ?? 1)} />
        </div>
        <div>
          <label className={lbl}>AC</label>
          <Stepper value={m.ac} min={1} max={25} ariaLabel="armor class" onChange={(v) => set("ac", v ?? 10)} />
        </div>
        <div className="min-w-[140px] flex-1">
          <label className={lbl}>Armor (optional)</label>
          <input className={fieldCls} value={m.acNote} maxLength={40} placeholder="chainmail + shield" onChange={(e) => set("acNote", e.target.value)} />
        </div>
        <div>
          <label className={lbl}>HP</label>
          <div className="flex items-center gap-2">
            <Stepper
              value={m.hpAuto ? autoHp : m.hp}
              min={1}
              max={999}
              width="3.4em"
              ariaLabel="hit points"
              onChange={(v) => onChange({ ...m, hp: v ?? 1, hpAuto: false })}
            />
            <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]" title="The book's rule: LV d8 averaged (×4.5, round down) + CON">
              <input type="checkbox" checked={m.hpAuto} onChange={(e) => onChange({ ...m, hpAuto: e.target.checked, hp: autoHp })} />
              Auto
            </label>
          </div>
          <p className="mt-1 text-[10px] text-[var(--muted)]">LV {m.lv} × 4.5 {m.mods.c ? `${m.mods.c > 0 ? "+" : "−"} ${Math.abs(m.mods.c)} CON` : ""} = {autoHp}</p>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Movement</label>
        <div className="flex flex-wrap items-center gap-2">
          <select className={selCls} aria-label="movement multiplier" value={m.move.mult} disabled={m.move.dist === "none"} onChange={(e) => set("move", { ...m.move, mult: e.target.value })}>
            {SD_MOVE_MULTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select className={selCls} aria-label="movement distance" value={m.move.dist} onChange={(e) => set("move", { ...m.move, dist: e.target.value })}>
            {SD_MOVE_DISTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          {m.move.dist !== "none" ? (
            <ChipPicker options={SD_MOVE_MODES.map((x) => [x, x[0].toUpperCase() + x.slice(1)] as [string, string])} value={m.move.modes} onChange={(v) => set("move", { ...m.move, modes: SD_MOVE_MODES.filter((x) => v.includes(x)) })} />
          ) : null}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Ability modifiers</label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SD_STATS.map(([k, l]) => (
            <div key={k} className="flex flex-col items-center">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{l}</div>
              <Stepper value={m.mods[k as ModKey]} min={SD_MOD_MIN} max={SD_MOD_MAX} signed width="2.4em" ariaLabel={l} onChange={(v) => set("mods", { ...m.mods, [k]: v ?? 0 })} />
            </div>
          ))}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Attacks</label>
        <AttackRows
          rows={m.attacks}
          onChange={(v) => set("attacks", v)}
          count={{ min: 1, max: 10, label: "×" }}
          hit={{ label: "To hit", min: -5, max: 20, optional: true }}
          dice={SD_DICE}
          ranges={SD_ATTACK_RANGES}
          extras={[{ key: "join", label: "Then", between: true, options: [["or", "— or —"], ["and", "— and —"]] }]}
          namePh="claw, longsword, spell…"
          specialPh="Special rider: grab, poison, swallow…"
          blank={() => newAttackRow({ range: "Close", extra: { join: "or" } })}
        />
        <p className="mt-1 text-[11px] text-[var(--muted)]">
          Clear the to-hit for attacks with no roll (a breath weapon, a spell); leave the dice at 0 for no damage.
        </p>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Traits</label>
        <div className="flex flex-col gap-2">
          {m.traits.map((t, i) => (
            <div key={i} className="flex flex-col gap-2 rounded border border-[var(--border)] p-2 sm:flex-row">
              <input className={`${fieldCls} sm:w-44 sm:self-start`} value={t.name} maxLength={40} placeholder="Trait name" onChange={(e) => setTrait(i, { name: e.target.value })} />
              <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={t.text} maxLength={800} placeholder="What it does. Dice like 2d6 become roll buttons on the GM Screen." onChange={(e) => setTrait(i, { text: e.target.value })} />
              <div className="flex gap-1 sm:flex-col">
                <button type="button" className={smallBtn} title="Move up" onClick={() => moveTrait(i, -1)}>↑</button>
                <button type="button" className={smallBtn} title="Move down" onClick={() => moveTrait(i, 1)}>↓</button>
                <button type="button" className={smallBtn} title="Remove" onClick={() => set("traits", m.traits.filter((_, j) => j !== i))}>✕</button>
              </div>
            </div>
          ))}
        </div>
        {m.traits.length < 20 ? (
          <button type="button" className="mt-2 rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]" onClick={() => set("traits", [...m.traits, { name: "", text: "" }])}>
            + Add trait
          </button>
        ) : null}
      </div>
    </>
  );
}

const B = ({ children }: { children: string }) => <b className="text-[var(--hb-accent)]">{children}</b>;

/** The book's stat-block paragraph, built live. */
export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const atk = composeSdAttacks(m.attacks);
  const mod = (k: ModKey) => signed(m.mods[k]);
  return (
    <Preview title={name || "Unnamed monster"} subtitle={`${m.ctype} · Level ${m.lv}`}>
      <p className="text-[13px] leading-relaxed">
        <B>AC</B> {acText(m)}, <B>HP</B> {effectiveHp(m)}, <B>ATK</B> {atk || "—"}, <B>MV</B> {composeSdMove(m.move)},{" "}
        <B>S</B> {mod("s")}, <B>D</B> {mod("d")}, <B>C</B> {mod("c")}, <B>I</B> {mod("i")}, <B>W</B> {mod("w")}, <B>Ch</B> {mod("ch")},{" "}
        <B>AL</B> {m.al}, <B>LV</B> {String(m.lv)}
      </p>
      {m.traits.filter((t) => t.name || t.text).map((t, i) => (
        <p key={i} className="mt-1.5 text-[13px] leading-relaxed">
          {t.name ? <b>{t.name.replace(/:/g, "")}. </b> : null}
          {t.text}
        </p>
      ))}
    </Preview>
  );
}
