"use client";
// ── Star Wars homebrew character / NPC / creature builder ─────────────────────
// Storage = SwCharacter (lib/data/sw-types.ts), read by /sw/characters, the GM
// Screen bestiary (xsBestiary('sw') → SW_CHARACTERS via sw-homebrew.js; it rolls
// each attribute, each "skill 4D" line and each "(damage 5D)" equipment line)
// and the sheet's Species list (group Alien / Droid). Composed from `build`
// (components/hb/sw/rules.ts):
//   attributes ← six nullable die-code pickers (pips)
//   skills     ← rows of skill (book list or custom) + code + note
//                ("blaster 4D (reduced to 3D)"), then "Force skills: Control
//                3D, Sense 2D" from the three Force-skill codes
//   equipment  ← weapon AttackRows ("Blaster pistol (damage 4D)"; skill picked
//                from the character's own skills, its code shown live) then
//                plain gear lines
//   move       ← "Speed Code 2D" (creatures) or text
//   forcePoints / darkSidePoints (new; shown by the GM Screen and /sw/characters)
import AttackRows, { type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  SW_ATTRS, SW_ATTR_ABBR, SW_BOOK_OPTS, SW_CHAR_GROUPS, SW_FORCE_KEYS, blankCharBuild, charBuildFrom, charTotals, composeChar, composeMove, composeSkill,
  parseDamage, swCode, weaponRowDamage, type SwAttr, type SwCharBuild, type SwSkillRow, type SwWeaponRow,
} from "./rules";
import { Cell, CodeInput, RowCtl, Select, Toggle, addBtn, fieldCls, hint, selCls, skillAttrOf, skillNames, useSwData, type SwData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));

// The builder edits weapon rows as AttackRows (damage pips = dice.n·3 + dice.m).
const toAtk = (w: SwWeaponRow): AttackRow => ({ name: w.name, count: 1, hit: null, dice: { n: Math.floor(w.pips / 3), d: 6, m: w.pips % 3 }, special: w.special, extra: { skill: w.skill, str: w.str ? "1" : "" } });
const fromAtk = (r: AttackRow): SwWeaponRow => ({ name: r.name.trim(), str: r.extra?.str === "1", pips: r.dice.n * 3 + r.dice.m, skill: r.extra?.skill ?? "", special: r.special.trim() });

export type CharDraft = { group: string; b: Omit<SwCharBuild, "weapons">; rows: AttackRow[]; description: string; notes: string; book: string };
const split = (b: SwCharBuild) => { const { weapons, ...rest } = b; return { b: rest, rows: weapons.map(toAtk) }; };
export const blankCharacter = (): CharDraft => ({ group: "Alien", ...split(blankCharBuild()), description: "", notes: "", book: "companion" });
export const characterFromData = (d: Data): CharDraft => ({
  group: sv(d, "group") || "Alien", ...split(charBuildFrom(d)), description: sv(d, "description"), notes: sv(d, "notes"),
  book: ["core", "sourcebook", "companion"].includes(sv(d, "book")) ? sv(d, "book") : "companion",
});
const fullBuild = (c: CharDraft): SwCharBuild => ({ ...c.b, weapons: c.rows.map(fromAtk).filter((w) => w.name) });
export function characterPayload(name: string, c: CharDraft): Data {
  const b = fullBuild(c);
  return { name, group: c.group, ...composeChar(b), build: b, description: c.description, notes: c.notes, book: c.book };
}

/** The code a character rolls for a skill: its skill row, else the governing attribute (untrained). */
function skillCode(b: CharDraft["b"], data: SwData | null, name: string): string {
  const n = name.trim().toLowerCase();
  if (!n) return "";
  const row = b.skills.find((r) => r.name.trim().toLowerCase() === n && r.pips != null);
  if (row) return swCode(row.pips);
  const a = skillAttrOf(data, n);
  return a && b.attrs[a] != null ? `${swCode(b.attrs[a] as number)} untrained` : "";
}

function SkillRows({ b, data, onChange }: { b: CharDraft["b"]; data: SwData | null; onChange: (rows: SwSkillRow[]) => void }) {
  const rows = b.skills;
  const patch = (i: number, p: Partial<SwSkillRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  return (
    <div className="flex flex-col gap-2">
      <datalist id="sw-hb-skills">{skillNames(data).map((n) => <option key={n} value={n} />)}</datalist>
      {rows.map((r, i) => {
        const a = skillAttrOf(data, r.name), base = a ? b.attrs[a] : null;
        const over = r.pips != null && base != null ? r.pips - base : null;
        return (
          <div key={i} className={styles.atkRow}>
            <div className={styles.atkLine}>
              <label className={`${styles.atkCell} ${styles.atkGrow}`}><span className={styles.atkLbl}>Skill</span>
                <input className={selCls} list="sw-hb-skills" value={r.name} maxLength={120} placeholder="blaster" onChange={(e) => patch(i, { name: e.target.value })} />
              </label>
              <label className={styles.atkCell}><span className={styles.atkLbl}>Code</span>
                <CodeInput value={r.pips} nullable dflt={base != null ? base + 3 : 12} ariaLabel="skill code" onChange={(n) => patch(i, { pips: n })} />
              </label>
              <label className={`${styles.atkCell} min-w-[140px]`}><span className={styles.atkLbl}>Note</span>
                <input className={selCls} value={r.note} maxLength={80} placeholder="reduced to 3D" disabled={r.pips == null} onChange={(e) => patch(i, { note: e.target.value })} />
              </label>
              <span className="self-center"><RowCtl rows={rows} i={i} onChange={onChange} /></span>
            </div>
            <p className={hint}>{a ? `${a}${base != null ? ` ${swCode(base)}` : ""}${over != null ? ` · ${over >= 0 ? "+" : "−"}${swCode(Math.abs(over)).replace(/^\+/, "")} over the attribute` : ""}` : r.pips == null ? "A line as written (no code)." : "Custom skill."}</p>
          </div>
        );
      })}
      <button type="button" className={`${addBtn} self-start`} onClick={() => onChange([...rows, { name: "", pips: 12, note: "" }])}>+ Skill</button>
    </div>
  );
}

export default function CharacterBuilder({ value: c, onChange }: { value: CharDraft; onChange: (v: CharDraft) => void }) {
  const data = useSwData();
  const b = c.b;
  const set = (p: Partial<CharDraft["b"]>) => onChange({ ...c, b: { ...b, ...p } });
  const totals = charTotals({ ...b, weapons: [] }, (n) => skillAttrOf(data, n));
  const ownSkills = b.skills.filter((r) => r.name && r.pips != null).map((r) => r.name);
  const skillOpts = [...new Set([...ownSkills, ...skillNames(data)])];
  const bookWeapons = (data?.weapons ?? []).filter((w) => !/^(Starship|Capital|Vehicle|Artillery)$/.test(String(w.kind)));
  const addBookWeapon = (n: string) => {
    const w = bookWeapons.find((x) => x.name === n); if (!w) return;
    const dm = parseDamage(w.damageText || (typeof w.damage === "number" ? swCode(w.damage) : ""));
    const row: SwWeaponRow = { name: w.name, str: dm.str, pips: dm.text ? (typeof w.damage === "number" ? w.damage : 0) : dm.pips, skill: String(w.skill ?? ""), special: dm.note };
    onChange({ ...c, rows: [...c.rows, toAtk(row)] });
  };
  return (
    <>
      <Cell label="Group"><Select value={c.group} options={SW_CHAR_GROUPS} ariaLabel="group" onChange={(v) => onChange({ ...c, group: v })} /></Cell>
      <Cell label="Book"><Select value={c.book} options={SW_BOOK_OPTS} ariaLabel="book" onChange={(v) => onChange({ ...c, book: v })} /></Cell>
      <Cell label="Attributes" className="sm:col-span-2" help={`Total ${swCode(totals.attrPips) || "0D"} (a starting hero has 18D). Clear an attribute a creature doesn't have.`}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SW_ATTRS.map((a) => (
            <label key={a} className="flex items-center justify-between gap-2 rounded border border-[var(--border)] px-2 py-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]" title={a}>{SW_ATTR_ABBR[a]}</span>
              <CodeInput value={b.attrs[a] ?? null} nullable ariaLabel={a} onChange={(n) => set({ attrs: { ...b.attrs, [a]: n } })} />
            </label>
          ))}
        </div>
      </Cell>
      <Cell label="Skills" className="sm:col-span-2" help={`Skill dice above attributes: ${swCode(totals.skillPips) || "0D"} (a starting hero spends 7D). A code-less line ("all other skills 2D" style) is kept as written.`}>
        <SkillRows b={b} data={data} onChange={(rows) => set({ skills: rows })} />
      </Cell>
      <Cell label="Force" className="sm:col-span-2" help="Force skills are rolled for powers. On gaining a Dark Side Point the GM rolls 1D: equal to or under the total, the character is consumed by the dark side.">
        <div className="flex flex-wrap items-end gap-4">
          {SW_FORCE_KEYS.map((k) => (
            <label key={k} className="flex flex-col gap-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{k}
              <CodeInput value={b.force[k] ?? null} nullable dflt={3} ariaLabel={k} onChange={(n) => set({ force: { ...b.force, [k]: n } })} />
            </label>
          ))}
          <label className="flex flex-col gap-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Force Points
            <Stepper value={b.fp} min={0} max={99} width="2.4em" ariaLabel="Force Points" onChange={(n) => set({ fp: n ?? 0 })} />
          </label>
          <label className="flex flex-col gap-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Dark Side Points
            <Stepper value={b.dsp} min={0} max={99} width="2.4em" ariaLabel="Dark Side Points" onChange={(n) => set({ dsp: n ?? 0 })} />
          </label>
        </div>
      </Cell>
      <Cell label="Weapons" className="sm:col-span-2" help="The GM Screen rolls each weapon's damage.">
        <AttackRows
          rows={c.rows}
          onChange={(rows) => onChange({ ...c, rows })}
          count={false}
          hit={false}
          namePh="Blaster pistol"
          specialPh="note (stun setting, fire-linked…)"
          addLabel="+ Weapon"
          blank={() => toAtk({ name: "", str: false, pips: 12, skill: "blaster", special: "" })}
          damageCell={(r, patch) => (
            <span className="flex items-center gap-2">
              <Toggle checked={r.extra?.str === "1"} onChange={(v) => patch({ extra: { ...(r.extra ?? {}), str: v ? "1" : "" } })}>STR +</Toggle>
              <CodeInput value={r.dice.n * 3 + r.dice.m} min={0} max={120} ariaLabel="damage" onChange={(n) => patch({ dice: { n: Math.floor((n ?? 0) / 3), d: 6, m: (n ?? 0) % 3 } })} />
            </span>
          )}
          slot={(r, patch) => (
            <label className={styles.atkCell}><span className={styles.atkLbl}>Skill · code</span>
              <span className="flex items-center gap-2">
                <Select value={r.extra?.skill ?? ""} options={[["", "—"], ...skillOpts.map((x) => [x, x] as [string, string])]} ariaLabel="weapon skill" onChange={(v) => patch({ extra: { ...(r.extra ?? {}), skill: v } })} />
                <span className="font-mono text-[12px] text-[var(--hb-accent)]">{skillCode(b, data, r.extra?.skill ?? "")}</span>
              </span>
            </label>
          )}
        />
        {bookWeapons.length ? (
          <select className={`${selCls} mt-2`} value="" aria-label="Add a book weapon" onChange={(e) => addBookWeapon(e.target.value)}>
            <option value="">+ Book weapon…</option>
            {bookWeapons.map((w) => <option key={w.name} value={w.name}>{w.name} ({String(w.damageText ?? swCode(w.damage as number))})</option>)}
          </select>
        ) : null}
      </Cell>
      <Cell label="Other equipment" className="sm:col-span-2">
        <datalist id="sw-hb-gear">{(data?.gear ?? []).map((g) => <option key={g.name} value={g.name} />)}</datalist>
        <div className="flex flex-col gap-2">
          {b.gear.map((g, i) => (
            <span key={i} className="flex items-center gap-2">
              <input className={fieldCls} list="sw-hb-gear" value={g} maxLength={200} onChange={(e) => set({ gear: b.gear.map((x, j) => (j === i ? e.target.value : x)) })} />
              <RowCtl rows={b.gear} i={i} onChange={(gear) => set({ gear })} />
            </span>
          ))}
          <button type="button" className={`${addBtn} self-start`} onClick={() => set({ gear: [...b.gear, ""] })}>+ Item</button>
        </div>
      </Cell>
      <Cell label="Move" className="sm:col-span-2" help="Creatures print a Speed Code; characters move normally.">
        <span className="flex flex-wrap items-center gap-3">
          <ChipPicker single options={[["none", "Normal"], ["code", "Speed Code"], ["text", "As written"]]} value={[b.move.mode]} onChange={(v) => v[0] && set({ move: { ...b.move, mode: v[0] as "none" | "code" | "text" } })} />
          {b.move.mode === "code" ? <CodeInput value={b.move.pips} min={0} max={60} ariaLabel="speed code" onChange={(n) => set({ move: { ...b.move, pips: n ?? 0 } })} /> : null}
          {b.move.mode === "text" ? <input className={`${fieldCls} max-w-[320px]`} value={b.move.text} maxLength={80} onChange={(e) => set({ move: { ...b.move, text: e.target.value } })} /> : null}
        </span>
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[70px]`} value={c.description} maxLength={2000} onChange={(e) => onChange({ ...c, description: e.target.value })} />
      </Cell>
      <Cell label="Notes" className="sm:col-span-2" help="Tactics, objectives, special abilities.">
        <textarea className={`${fieldCls} min-h-[60px]`} value={c.notes} maxLength={400} onChange={(e) => onChange({ ...c, notes: e.target.value })} />
      </Cell>
    </>
  );
}

export function CharacterPreview({ name, c }: { name: string; c: CharDraft }) {
  const data = useSwData();
  const b = c.b;
  const byAttr = (a: SwAttr) => b.skills.filter((r) => r.pips != null && skillAttrOf(data, r.name) === a);
  const other = b.skills.filter((r) => r.pips == null || !skillAttrOf(data, r.name));
  const force = SW_FORCE_KEYS.filter((k) => b.force[k] != null);
  const mv = composeMove(b.move);
  return (
    <Preview title={name || "Unnamed character"} subtitle={c.group}>
      <div className="flex flex-col gap-1 text-[12px]">
        {SW_ATTRS.filter((a) => b.attrs[a] != null).map((a) => (
          <div key={a}><b className="uppercase">{a} {swCode(b.attrs[a] as number)}</b>{byAttr(a).length ? <span className="text-[var(--muted)]"> — {byAttr(a).map(composeSkill).join(", ")}</span> : null}</div>
        ))}
        {other.length ? <div className="text-[var(--muted)]">{other.map(composeSkill).join(", ")}</div> : null}
        {force.length ? <div><b>Force</b> {force.map((k) => `${k} ${swCode(b.force[k] as number)}`).join(", ")}</div> : null}
        {b.fp || b.dsp ? <div><b>Force Points</b> {b.fp}{b.dsp ? <> · <b>Dark Side Points</b> {b.dsp}</> : null}</div> : null}
        {c.rows.filter((r) => r.name).map((r, i) => { const w = fromAtk(r); const sk = skillCode(b, data, w.skill); return (
          <div key={i}><b>{w.name}</b> {w.skill ? `${w.skill} ${sk}` : ""} · damage {weaponRowDamage(w)}{w.special ? ` · ${w.special}` : ""}</div>
        ); })}
        {b.gear.filter(Boolean).length ? <div><b>Equipment</b> {b.gear.filter(Boolean).join(", ")}</div> : null}
        {mv ? <div><b>Move</b> {mv}</div> : null}
        {c.description ? <p className="mt-1 text-[var(--muted)]">{c.description}</p> : null}
        {c.notes ? <p className="text-[var(--muted)]">{c.notes}</p> : null}
      </div>
    </Preview>
  );
}
