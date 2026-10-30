"use client";
// ── Dungeon Crawler Carl homebrew Mob / Boss builder (Core pp. 270–273) ──────
// Role / size / level / floor steppers, a stat point-buy, derived Health Bar
// and defences (each with an Auto toggle), attack rows and named-ability rows,
// with a live stat block. Storage (type "dcc-monster", DccMonster shape — what
// the bestiary, GM Screen tracker and session-prep builder read):
//   legacy, still composed: role, size, tags, level, hbSlots, surprise "N+F",
//     evade "N+F", move "N+S", dr (number | "F"), stats {STR:{score,mod}…},
//     attacks [{name, toHit "N+F", damage, damageType, range, rider}],
//     notes ["Name—text"], flavor
//   builder data: attackRows (AttackRow[]), floor, auto {slots,hp,surprise,evade,dr}
//   sent for the server to derive with: scores {str…}, slotCount, hpPerSlot
// lib/homebrew.ts normalizeDccMonster re-composes `attacks` from attackRows
// with ./rules, so preview == stored.
import AttackRows, { newAttackRow, type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  BOSS_SEVERITY, bossSeverity, damageDiceForLevel, dccStatMod, hbSlotCount, statBase, statBudget, STAT_IDS, STAT_ABBR,
} from "@/lib/dcc-build-menu";
import {
  DCC_AREAS, DCC_AREA_SIZES, DCC_ATTACK_RANGES, DCC_DAMAGE_TYPES, DCC_DICE, DCC_HIT_SFX, DCC_HIT_WORDS, DCC_MONSTER_TAGS,
  composeDccAttacks, composeDccNote, parseDccAttack, parseDccNote, sizeName, type DccNote,
} from "./rules";

const ROLES = ["Mob", ...BOSS_SEVERITY.map((b) => b.role), "Quest Boss", "Elite", "Crawler", "NPC"];
type Auto = { slots: boolean; hp: boolean; surprise: boolean; evade: boolean; dr: boolean };

export type MonsterDraft = {
  role: string;
  size: number;
  level: number;
  floor: number;
  tags: string[];
  scores: Record<string, number>;
  auto: Auto;
  slotCount: number;
  hpPerSlot: number;
  surprise: number;
  evade: number;
  move: number;
  moveS: boolean;
  drF: boolean;
  dr: number;
  attacks: AttackRow[];
  notes: DccNote[];
  flavor: string;
};

const int = (v: unknown, d: number) => {
  const n = parseInt(String(v ?? "").replace(/^\+/, ""), 10);
  return Number.isFinite(n) ? n : d;
};

function derived(m: Pick<MonsterDraft, "role" | "level" | "floor" | "scores">) {
  const mod = (k: string) => dccStatMod(m.scores[k] ?? statBase(m.role));
  return {
    slots: hbSlotCount(m.role, m.level, m.floor),
    hp: Math.max(1, mod("con")),
    surprise: 10 + mod("int"),
    evade: 10 + mod("dex"),
    dr: Math.max(1, m.floor),
  };
}

const atkRow = (level: number, d: Partial<AttackRow> = {}) =>
  newAttackRow({ name: "", hit: 10, dice: { n: damageDiceForLevel(level), d: 6, m: 0 }, range: "5ft range", dtype: "", extra: { area: "", size: "10", ap: "", dmgF: "" }, ...d });

export function blankMonster(): MonsterDraft {
  return {
    role: "Mob", size: 4, level: 1, floor: 1, tags: [],
    scores: Object.fromEntries(STAT_IDS.map((k) => [k, 1])),
    auto: { slots: true, hp: true, surprise: true, evade: true, dr: true },
    slotCount: 1, hpPerSlot: 1, surprise: 11, evade: 11, move: 20, moveS: true, drF: false, dr: 1,
    attacks: [atkRow(1, { name: "Claw", dtype: "Slashing" })],
    notes: [],
    flavor: "",
  };
}

/** Open a stored record (builder or legacy shape) in the builder. */
export function monsterFromData(d: Record<string, unknown>): MonsterDraft {
  const rawRole = String(d.role ?? "") === "Rival Crawler" ? "Crawler" : String(d.role ?? "");
  const role = ROLES.includes(rawRole) ? rawRole : "Mob";
  const stats = (d.stats ?? {}) as Record<string, { score?: unknown }>;
  const scores = Object.fromEntries(STAT_IDS.map((k) => [k, Math.max(statBase(role), int(stats[k.toUpperCase()]?.score, statBase(role)))]));
  const drStr = String(d.dr ?? "").trim();
  const level = Math.max(1, int(d.level, 1));
  const floor = Math.max(0, int(d.floor, /^\d+$/.test(drStr) ? int(drStr, 1) : 1));
  const hb = Array.isArray(d.hbSlots) ? (d.hbSlots as unknown[]).map((n) => int(n, 0)) : [];
  const nf = (s: unknown, dflt: number) => int(String(s ?? "").match(/^(-?\d+)/)?.[1], dflt);
  const mv = String(d.move ?? "20+S").trim();
  const base = { role, level, floor, scores };
  const der = derived(base);
  const slotCount = hb.length || der.slots;
  const hpPerSlot = hb[0] ?? der.hp;
  const surprise = nf(d.surprise, der.surprise);
  const evade = nf(d.evade, der.evade);
  const drF = drStr.toUpperCase() === "F";
  const dr = drF ? der.dr : int(drStr, der.dr);
  const a = (d.auto ?? null) as Partial<Auto> | null;
  const rows = Array.isArray(d.attackRows) && d.attackRows.length
    ? (d.attackRows as AttackRow[])
    : Array.isArray(d.attacks) ? (d.attacks as Record<string, unknown>[]).map(parseDccAttack) : [];
  return {
    ...base,
    size: Math.min(8, Math.max(1, int(d.size, 4))),
    tags: Array.isArray(d.tags) ? (d.tags as unknown[]).map(String) : [],
    // Legacy rows have no flags: a value is "auto" when it already matches the rule.
    auto: {
      slots: a?.slots ?? slotCount === der.slots,
      hp: a?.hp ?? (hpPerSlot === der.hp && hb.every((x) => x === hb[0])),
      surprise: a?.surprise ?? surprise === der.surprise,
      evade: a?.evade ?? evade === der.evade,
      dr: a?.dr ?? (!drF && dr === der.dr),
    },
    slotCount, hpPerSlot, surprise, evade,
    move: int(mv.match(/^(\d+)/)?.[1], 20),
    moveS: /\+\s*S$/i.test(mv) || !/^\d+$/.test(mv),
    drF, dr,
    attacks: rows.map((r) => ({ ...atkRow(level), ...r, extra: { area: "", size: "10", ap: "", dmgF: "", ...(r.extra ?? {}) } })),
    notes: Array.isArray(d.notes) ? (d.notes as unknown[]).map((n) => parseDccNote(String(n))) : [],
    flavor: String(d.flavor ?? ""),
  };
}

/** The values the stat block shows (auto ones from the rules). */
export function effective(m: MonsterDraft) {
  const der = derived(m);
  return {
    slots: m.auto.slots ? der.slots : m.slotCount,
    hp: m.auto.hp ? der.hp : m.hpPerSlot,
    surprise: `${m.auto.surprise ? der.surprise : m.surprise}+F`,
    evade: `${m.auto.evade ? der.evade : m.evade}+F`,
    move: m.moveS ? `${m.move}+S` : String(m.move),
    dr: m.drF ? "F" : String(m.auto.dr ? der.dr : m.dr),
  };
}

export function monsterPayload(name: string, m: MonsterDraft): Record<string, unknown> {
  const e = effective(m);
  return {
    name: name.trim(),
    role: m.role,
    size: m.size,
    level: m.level,
    floor: m.floor,
    tags: m.tags,
    scores: m.scores,
    slotCount: e.slots,
    hpPerSlot: e.hp,
    surprise: e.surprise,
    evade: e.evade,
    move: e.move,
    dr: e.dr,
    auto: m.auto,
    attackRows: m.attacks,
    attacks: composeDccAttacks(m.attacks),
    notes: m.notes.map(composeDccNote).filter(Boolean),
    flavor: m.flavor.trim(),
  };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls =
  "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const smallBtn =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";
const addBtn =
  "mt-2 rounded border border-dashed border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]";

function AutoStepper({
  label, value, auto, derivedValue, onValue, onAuto, min, max, suffix, help,
}: {
  label: string; value: number; auto: boolean; derivedValue: number; onValue: (v: number) => void; onAuto: (a: boolean) => void;
  min: number; max: number; suffix?: string; help: string;
}) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="flex items-center gap-2">
        <Stepper value={auto ? derivedValue : value} min={min} max={max} ariaLabel={label} onChange={(v) => { onValue(v ?? min); onAuto(false); }} />
        {suffix ? <span className="text-[12px] font-semibold text-[var(--muted)]">{suffix}</span> : null}
        <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]" title={help}>
          <input type="checkbox" checked={auto} onChange={(e) => { onAuto(e.target.checked); if (e.target.checked) onValue(derivedValue); }} />
          Auto
        </label>
      </div>
      <p className="mt-1 text-[10px] text-[var(--muted)]">{help}</p>
    </div>
  );
}

export default function MonsterBuilder({ value: m, onChange }: { value: MonsterDraft; onChange: (m: MonsterDraft) => void }) {
  const set = <K extends keyof MonsterDraft>(k: K, v: MonsterDraft[K]) => onChange({ ...m, [k]: v });
  const setAuto = (k: keyof Auto, v: boolean) => onChange({ ...m, auto: { ...m.auto, [k]: v } });
  const boss = bossSeverity(m.role);
  const base = statBase(m.role);
  const budget = statBudget(m.role, m.level);
  const spent = STAT_IDS.reduce((n, k) => n + ((m.scores[k] ?? base) - base), 0);
  const left = budget - spent;
  const der = derived(m);
  const dice = damageDiceForLevel(m.level);
  const setRole = (role: string) => {
    const b = statBase(role);
    onChange({ ...m, role, scores: Object.fromEntries(STAT_IDS.map((k) => [k, Math.max(b, m.scores[k] ?? b)])) });
  };
  const setNote = (i: number, p: Partial<DccNote>) => set("notes", m.notes.map((n, j) => (j === i ? { ...n, ...p } : n)));
  const moveNote = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= m.notes.length) return;
    const next = m.notes.slice();
    [next[i], next[j]] = [next[j], next[i]];
    set("notes", next);
  };

  return (
    <>
      <div>
        <label className={lbl}>Role</label>
        <select className={`${selCls} w-full`} value={m.role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className={lbl}>Size</label>
        <div className="flex items-center gap-2">
          <Stepper value={m.size} min={1} max={8} width="2.4em" ariaLabel="size" onChange={(v) => set("size", v ?? 4)} />
          <span className="text-[13px] text-[var(--text)]">{sizeName(m.size)}</span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Type tags</label>
        <ChipPicker options={DCC_MONSTER_TAGS} value={m.tags} custom customPh="Other tag…" onChange={(v) => set("tags", v.slice(0, 12))} />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
        <div>
          <label className={lbl}>Level</label>
          <Stepper value={m.level} min={1} max={500} width="3.4em" ariaLabel="level" onChange={(v) => set("level", v ?? 1)} />
          <p className="mt-1 text-[10px] text-[var(--muted)]">Main attack {dice}d (Table 51)</p>
        </div>
        <div>
          <label className={lbl}>Floor (F)</label>
          <Stepper value={m.floor} min={0} max={18} ariaLabel="floor" onChange={(v) => set("floor", v ?? 1)} />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Stats (point-buy)</label>
        <p className="mb-1.5 text-[11px] text-[var(--muted)]">
          Base {base} each · {budget} points ({boss ? `${boss.statsPerLevel}/Level, Table 50` : "3/Level, Mob"}) ·{" "}
          <b className={left < 0 ? "text-[var(--bad)]" : "text-[var(--text)]"}>{left} left</b>
          {left < 0 ? " — over budget" : ""}
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {STAT_IDS.map((k) => (
            <div key={k} className="flex flex-col items-center">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{STAT_ABBR[k]}</div>
              <Stepper value={m.scores[k] ?? base} min={base} max={999} width="2.8em" ariaLabel={STAT_ABBR[k]} onChange={(v) => set("scores", { ...m.scores, [k]: v ?? base })} />
              <div className="mt-0.5 text-[10px] text-[var(--muted)]">mod {dccStatMod(m.scores[k] ?? base) >= 0 ? "+" : ""}{dccStatMod(m.scores[k] ?? base)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
        <AutoStepper label="Health-Bar slots" value={m.slotCount} auto={m.auto.slots} derivedValue={der.slots} min={1} max={60}
          onValue={(v) => set("slotCount", v)} onAuto={(a) => setAuto("slots", a)} help={boss ? `Table 50: ${boss.hbBase} + F` : "Mob: Level, max 10"} />
        <AutoStepper label="HP per slot" value={m.hpPerSlot} auto={m.auto.hp} derivedValue={der.hp} min={1} max={99}
          onValue={(v) => set("hpPerSlot", v)} onAuto={(a) => setAuto("hp", a)} help="CON Mod" />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
        <AutoStepper label="Surprise" value={m.surprise} auto={m.auto.surprise} derivedValue={der.surprise} min={0} max={60} suffix="+F"
          onValue={(v) => set("surprise", v)} onAuto={(a) => setAuto("surprise", a)} help="10 + INT Mod" />
        <AutoStepper label="Evade" value={m.evade} auto={m.auto.evade} derivedValue={der.evade} min={0} max={60} suffix="+F"
          onValue={(v) => set("evade", v)} onAuto={(a) => setAuto("evade", a)} help="10 + DEX Mod" />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
        <div>
          <label className={lbl}>Move</label>
          <div className="flex items-center gap-2">
            <Stepper value={m.move} min={0} max={200} step={5} ariaLabel="move" onChange={(v) => set("move", v ?? 20)} />
            <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]" title="Adds the creature's Size">
              <input type="checkbox" checked={m.moveS} onChange={(e) => set("moveS", e.target.checked)} />+S
            </label>
          </div>
        </div>
        {m.drF ? (
          <div>
            <label className={lbl}>DR</label>
            <div className="flex h-[34px] items-center gap-2 text-[13px] text-[var(--text)]">
              F (= Floor)
              <label className="flex items-center gap-1.5 text-[12px]"><input type="checkbox" checked onChange={() => set("drF", false)} />DR = F</label>
            </div>
          </div>
        ) : (
          <div>
            <AutoStepper label="DR" value={m.dr} auto={m.auto.dr} derivedValue={der.dr} min={0} max={99}
              onValue={(v) => set("dr", v)} onAuto={(a) => setAuto("dr", a)} help="Default: the Floor Number" />
            <label className="mt-1 flex items-center gap-1.5 text-[12px] text-[var(--text)]"><input type="checkbox" checked={false} onChange={() => set("drF", true)} />Print as “F”</label>
          </div>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Attacks</label>
        <AttackRows
          rows={m.attacks}
          onChange={(v) => set("attacks", v)}
          count={false}
          hit={{ label: "To hit (+F)", min: 0, max: 60, optional: true }}
          dice={DCC_DICE}
          ranges={DCC_ATTACK_RANGES}
          damageTypes={DCC_DAMAGE_TYPES}
          extras={[
            { key: "area", label: "Area", options: DCC_AREAS },
            { key: "size", label: "Area ft", options: DCC_AREA_SIZES.map((s) => [s, `${s} ft`] as [string, string]) },
            { key: "dmgF", label: "Dmg +F", options: [["", "—"], ["F", "+F"]] },
            { key: "ap", label: "Armor-Piercing", options: [["", "No"], ["ap", "Yes"]] },
          ]}
          slot={(r, patch) => <HitForm r={r} patch={patch} />}
          namePh="Claw, Grappling Gun, Boil the Air…"
          specialPh="Rider / on-hit effect: Any hit crawler gains the Held Debuff…"
          blank={() => atkRow(m.level)}
        />
        <p className="mt-1 text-[11px] text-[var(--muted)]">
          Main attack {dice}d at Level {m.level}; area or rider attacks one die fewer{boss ? "; Bosses build a row down" : ""}. Cone, Burst and Line start at the attacker; a Blast lands at the range. Clear to-hit for an attack with no roll.
        </p>
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Named abilities</label>
        <div className="flex flex-col gap-2">
          {m.notes.map((n, i) => (
            <div key={i} className="flex flex-col gap-2 rounded border border-[var(--border)] p-2 sm:flex-row">
              <input className={`${fieldCls} sm:w-44 sm:self-start`} value={n.name} maxLength={60} placeholder="Ability name" onChange={(e) => setNote(i, { name: e.target.value })} />
              <textarea className={`${fieldCls} min-w-0 flex-1`} rows={2} value={n.text} maxLength={740} placeholder="Rules text…" onChange={(e) => setNote(i, { text: e.target.value })} />
              <div className="flex gap-1 sm:flex-col">
                <button type="button" className={smallBtn} title="Move up" onClick={() => moveNote(i, -1)}>↑</button>
                <button type="button" className={smallBtn} title="Move down" onClick={() => moveNote(i, 1)}>↓</button>
                <button type="button" className={smallBtn} title="Remove" onClick={() => set("notes", m.notes.filter((_, j) => j !== i))}>✕</button>
              </div>
            </div>
          ))}
        </div>
        {m.notes.length < 20 ? <button type="button" className={addBtn} onClick={() => set("notes", [...m.notes, { name: "", text: "" }])}>+ Add ability</button> : null}
      </div>

      <div className="sm:col-span-2">
        <label className={lbl}>Flavor (optional)</label>
        <textarea className={fieldCls} rows={2} maxLength={2000} value={m.flavor} placeholder="What the crawlers see…" onChange={(e) => set("flavor", e.target.value)} />
      </div>
    </>
  );
}

export function MonsterPreview({ name, m }: { name: string; m: MonsterDraft }) {
  const e = effective(m);
  const atks = composeDccAttacks(m.attacks);
  const notes = m.notes.filter((n) => n.name || n.text);
  const cell = "rounded border border-[var(--border)] px-1 py-1";
  return (
    <Preview title={name || "Unnamed creature"} subtitle={`${m.role} · ${sizeName(m.size) || `Size ${m.size}`} (${m.size}) · Level ${m.level}`}>
      {m.tags.length ? <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{m.tags.join(" · ")}</div> : null}
      <div className="mt-2 grid grid-cols-4 gap-1 text-center">
        {[["Surprise", e.surprise], ["Evade", e.evade], ["Move", e.move], ["DR", e.dr]].map(([l, v]) => (
          <div key={l} className={cell}>
            <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{l}</div>
            <div className="text-[12px] font-semibold tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Health Bar · {e.slots} × {e.hp} HP</div>
      <div className="mt-0.5 flex flex-wrap gap-0.5">
        {Array.from({ length: Math.min(e.slots, 60) }, (_, i) => (
          <span key={i} className="h-2.5 min-w-[8px] flex-1 rounded-sm" style={{ background: "var(--hb-accent)", opacity: 0.35 + (0.65 * (i + 1)) / e.slots }} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1 text-center">
        {STAT_IDS.map((k) => {
          const sc = m.scores[k] ?? statBase(m.role);
          const md = dccStatMod(sc);
          return (
            <div key={k} className={cell}>
              <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{STAT_ABBR[k]}</div>
              <div className="text-[12px] font-semibold tabular-nums">{sc}<span className="text-[9px] text-[var(--muted)]"> ({md >= 0 ? "+" : ""}{md})</span></div>
            </div>
          );
        })}
      </div>
      {atks.length ? (
        <div className="mt-2 flex flex-col gap-1 border-t border-[var(--border)] pt-2">
          {atks.map((a, i) => (
            <p key={i} className="text-[12px] leading-snug">
              <b className="text-[var(--hb-accent)]">{a.name}:</b> {a.toHit ? `${a.toHit} to hit, ` : ""}{a.damage}{a.damageType ? ` ${a.damageType}` : ""}{a.range ? `, ${a.range}` : ""}
              {a.rider ? <span className="italic text-[var(--muted)]"> — {a.rider}</span> : null}
            </p>
          ))}
        </div>
      ) : null}
      {notes.length ? (
        <ul className="mt-1.5 flex flex-col gap-0.5">
          {notes.map((n, i) => (
            <li key={i} className="text-[12px] leading-snug">{n.name ? <b>{n.name}— </b> : null}{n.text}</li>
          ))}
        </ul>
      ) : null}
      {m.flavor ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{m.flavor}</p> : null}
    </Preview>
  );
}

// To-hit form (a "+F" suffix variant, or a word when the to-hit is cleared) and
// the damage footnote marker. Book values outside the lists (e.g. "+5") stay selectable.
function HitForm({ r, patch }: { r: AttackRow; patch: (p: Partial<AttackRow>) => void }) {
  const e = r.extra ?? {};
  const setE = (p: Record<string, string>) => patch({ extra: { ...e, ...p } });
  const sfx = e.hitSfx ?? "";
  const sfxOpts = DCC_HIT_SFX.some(([k]) => k === sfx) ? DCC_HIT_SFX : [...DCC_HIT_SFX, [sfx, sfx] as [string, string]];
  return (
    <>
      <label className={styles.atkCell}>
        <span className={styles.atkLbl}>{r.hit == null ? "No roll" : "Roll"}</span>
        {r.hit == null ? (
          <select className={styles.diceSel} value={e.hitWord ?? ""} onChange={(ev) => setE({ hitWord: ev.target.value })}>
            {DCC_HIT_WORDS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        ) : (
          <select className={styles.diceSel} value={sfx} onChange={(ev) => setE({ hitSfx: ev.target.value })}>
            {sfxOpts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        )}
      </label>
      <label className={styles.atkCell}>
        <span className={styles.atkLbl}>Dmg mark</span>
        <select className={styles.diceSel} value={e.dmgMark ?? ""} onChange={(ev) => setE({ dmgMark: ev.target.value })}>
          <option value="">—</option>
          <option value="*">*</option>
        </select>
      </label>
    </>
  );
}
