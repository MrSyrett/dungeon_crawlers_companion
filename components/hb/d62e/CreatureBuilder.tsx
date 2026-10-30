"use client";
// ── D6 System 2e homebrew creature / NPC builder ──────────────────────────────
// Storage = D62eCreature (lib/data/d62e-types.ts), read by /d62e/bestiary, the
// session prep builder's bestiary picker and the GM Screen bestiary
// (xsMonSummary 'd62e' rolls each attribute, each skill as attribute + added
// dice, and each "Damage: Name (Brawn+2D)" line). Composed from `build`
// (rules.ts composeCreature):
//   attributes ← the four core + any optional attribute, as die codes (pips)
//   skills     ← rows: a skill + the dice ADDED to its attribute ("Shooting 2D"),
//                an attribute group ("Agility Skills 4D"), or a line as written
//   special    ← "Dodge 15" / "Parry 20" (Auto = 5 × Perception / Agility dice),
//                then natural attacks "Damage: Bite (Brawn+1D), rolled with
//                Melee. <rider>", then special-ability lines
//   move       ← "10, Flight" (meters + movement modes) or as written
//   talents / powers ← picked from the book's talents / powers (custom allowed)
import AttackRows, { type AttackRow } from "../AttackRows";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import {
  D62E_ALL_ATTRS, D62E_CORE_ATTRS, D62E_CREATURE_KINDS, D62E_GENRE_OPTS, D62E_MOVE_MODES, atkDamage, autoDodge, autoParry, blankCreatureBuild, composeCreature, composeMove,
  composeSkillRow, creatureBuildFrom, d6Code, skillTotal, type D62eCreatureBuild, type D62eNatAtk, type D62eSkillRow,
} from "./rules";
import { AsWritten, Cell, CodeInput, LineRows, RowCtl, Select, Toggle, addBtn, fieldCls, hint, miniLbl, selCls, skillAttrOf, skillNames, useD62eData, type D62eData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const strList = (d: Data, k: string) => (Array.isArray(d[k]) ? (d[k] as unknown[]).map(String).filter(Boolean) : []);
const ATTR_ABBR = (a: string) => a.slice(0, 3).toUpperCase();

// Natural attacks are edited as AttackRows (damage pips = dice.n·3 + dice.m).
const toAtk = (a: D62eNatAtk): AttackRow => ({ name: a.name, count: 1, hit: null, dice: { n: Math.floor(a.pips / 3), d: 6, m: a.pips % 3 }, special: a.special, extra: { attr: a.attr, skill: a.skill } });
const fromAtk = (r: AttackRow): D62eNatAtk => ({ name: r.name.trim(), attr: r.extra?.attr ?? "", pips: r.dice.n * 3 + r.dice.m, skill: r.extra?.skill ?? "", special: r.special.trim() });

export type CreatureDraft = { genre: string; kind: string; b: Omit<D62eCreatureBuild, "attacks">; rows: AttackRow[]; talents: string[]; powers: string[]; description: string };
const split = (b: D62eCreatureBuild) => { const { attacks, ...rest } = b; return { b: rest, rows: attacks.map(toAtk) }; };
export const blankCreature = (): CreatureDraft => ({ genre: "core", kind: "Animal", ...split(blankCreatureBuild()), talents: [], powers: [], description: "" });
export const creatureFromData = (d: Data): CreatureDraft => ({
  genre: ["core", "fantasy", "scifi", "superhero"].includes(sv(d, "genre")) ? sv(d, "genre") : "core", kind: sv(d, "kind"),
  ...split(creatureBuildFrom(d)), talents: strList(d, "talents"), powers: strList(d, "powers"), description: sv(d, "description"),
});
const fullBuild = (c: CreatureDraft): D62eCreatureBuild => ({ ...c.b, attacks: c.rows.map(fromAtk).filter((a) => a.name) });
export function creaturePayload(name: string, c: CreatureDraft): Data {
  const b = fullBuild(c);
  const out: Data = { name, genre: c.genre, ...composeCreature(b), build: b };
  if (c.kind) out.kind = c.kind;
  if (c.talents.length) out.talents = c.talents;
  if (c.powers.length) out.powers = c.powers;
  if (c.description) out.description = c.description;
  return out;
}

/** The code a creature rolls with a skill: its own skill row (attribute + adds), else the governing attribute. */
function skillCode(b: CreatureDraft["b"], data: D62eData | null, name: string): string {
  const n = name.trim().toLowerCase();
  if (!n) return "";
  const full = { ...b, attacks: [] };
  const row = b.skills.find((r) => r.mode === "skill" && r.name.trim().toLowerCase() === n);
  const attrOf = (x: string) => skillAttrOf(data, x);
  if (row) { const t = skillTotal(full, row, attrOf); return t != null ? d6Code(t) : ""; }
  const a = attrOf(n);
  if (!a) return "";
  const grp = b.skills.find((r) => r.mode === "group" && r.name === a);
  if (grp) return d6Code(grp.pips);
  return b.attrs[a] != null ? `${d6Code(b.attrs[a] as number)} (${a})` : "";
}

function PickList({ value, onChange, options, placeholder }: { value: string[]; onChange: (v: string[]) => void; options: string[]; placeholder: string }) {
  const has = (v: string) => value.some((x) => x.toLowerCase() === v.toLowerCase());
  const add = (v: string) => { const t = v.trim(); if (t && !has(t) && value.length < 40) onChange([...value, t]); };
  return (
    <div className="flex flex-col gap-2">
      {value.length ? <ChipPicker options={[]} value={value} onChange={onChange} /> : <span className={styles.badgeEmpty}>None</span>}
      <span className="flex flex-wrap items-center gap-2">
        <select className={selCls} value="" aria-label={placeholder} onChange={(e) => add(e.target.value)}>
          <option value="">{placeholder}</option>
          {options.filter((o) => !has(o)).map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <input className={`${fieldCls} max-w-[220px]`} maxLength={120} placeholder="or type one + Enter" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(e.currentTarget.value); e.currentTarget.value = ""; } }} />
      </span>
    </div>
  );
}

function SkillRows({ b, data, onChange }: { b: CreatureDraft["b"]; data: D62eData | null; onChange: (rows: D62eSkillRow[]) => void }) {
  const rows = b.skills;
  const patch = (i: number, p: Partial<D62eSkillRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...p } : r)));
  const attrOf = (x: string) => skillAttrOf(data, x);
  return (
    <div className="flex flex-col gap-2">
      <datalist id="d62e-hb-skills">{skillNames(data).map((n) => <option key={n} value={n} />)}</datalist>
      {rows.map((r, i) => {
        const a = r.mode === "skill" ? attrOf(r.name) : null;
        const total = skillTotal({ ...b, attacks: [] }, r, attrOf);
        return (
          <div key={i} className={styles.atkRow}>
            <div className={styles.atkLine}>
              <label className={styles.atkCell}><span className={styles.atkLbl}>Row</span>
                <Select value={r.mode} options={[["skill", "Skill"], ["group", "Attribute group"], ["text", "As written"]]} ariaLabel="row kind" onChange={(v) => patch(i, { mode: v as D62eSkillRow["mode"], name: v === "group" ? "Agility" : v === "text" ? composeSkillRow(r) : r.mode === "group" ? "" : r.name })} />
              </label>
              {r.mode === "group" ? (
                <label className={styles.atkCell}><span className={styles.atkLbl}>Attribute</span>
                  <Select value={r.name} options={D62E_ALL_ATTRS} ariaLabel="attribute group" onChange={(v) => patch(i, { name: v })} />
                </label>
              ) : (
                <label className={`${styles.atkCell} ${styles.atkGrow}`}><span className={styles.atkLbl}>{r.mode === "text" ? "Line" : "Skill"}</span>
                  <input className={selCls} list={r.mode === "skill" ? "d62e-hb-skills" : undefined} value={r.name} maxLength={120} placeholder={r.mode === "skill" ? "Shooting" : "Athletics: +1D"} onChange={(e) => patch(i, { name: e.target.value })} />
                </label>
              )}
              {r.mode !== "text" ? (
                <label className={styles.atkCell}><span className={styles.atkLbl}>{r.mode === "skill" ? "Added dice" : "Code"}</span>
                  <CodeInput value={r.pips} min={0} max={60} ariaLabel="skill dice" onChange={(n) => patch(i, { pips: n ?? 0 })} />
                </label>
              ) : null}
              <span className="self-center"><RowCtl rows={rows} i={i} onChange={onChange} /></span>
            </div>
            <p className={hint}>
              {r.mode === "skill" ? (a ? `${a} ${d6Code(b.attrs[a] ?? 0)} + ${d6Code(r.pips)} = rolls ${d6Code(total ?? 0)}` : r.name ? "Custom skill — rolls just its dice unless the GM names an attribute." : "") : r.mode === "group" ? `Every ${r.name} skill rolls ${d6Code(r.pips)}.` : "Kept exactly as written."}
            </p>
          </div>
        );
      })}
      <button type="button" className={`${addBtn} self-start`} onClick={() => onChange([...rows, { mode: "skill", name: "", pips: 3 }])}>+ Skill</button>
    </div>
  );
}

function Defense({ label, value, auto, onChange, help }: { label: string; value: { auto: boolean; n: number | null }; auto: number; onChange: (v: { auto: boolean; n: number | null }) => void; help: string }) {
  return (
    <Cell label={label} help={help}>
      <span className="flex flex-wrap items-center gap-3">
        <Toggle checked={value.auto} onChange={(v) => onChange({ auto: v, n: v ? null : value.n ?? auto })}>Auto</Toggle>
        {value.auto ? <span className="font-mono text-[14px] text-[var(--hb-accent)]">{auto}</span> : <Stepper value={value.n} min={0} max={99} nullable width="2.6em" ariaLabel={label} onChange={(n) => onChange({ auto: false, n })} />}
      </span>
    </Cell>
  );
}

const DMG_ATTRS: [string, string][] = [["", "— (flat)"], ...D62E_ALL_ATTRS.map((a) => [a, a] as [string, string])];

export default function CreatureBuilder({ value: c, onChange }: { value: CreatureDraft; onChange: (v: CreatureDraft) => void }) {
  const data = useD62eData();
  const b = c.b;
  const set = (p: Partial<CreatureDraft["b"]>) => onChange({ ...c, b: { ...b, ...p } });
  const totalPips = Object.values(b.attrs).reduce<number>((n, p) => n + (p ?? 0), 0);
  const ownSkills = b.skills.filter((r) => r.mode === "skill" && r.name).map((r) => r.name);
  const skillOpts = [...new Set([...ownSkills, ...skillNames(data)])];
  const talents = (data?.perks ?? []).filter((p) => p.kind === "talent").map((p) => p.name);
  const powers = (data?.powers ?? []).map((p) => p.name);
  const extraAttrs = Object.keys(b.attrs).filter((k) => !(D62E_ALL_ATTRS as readonly string[]).includes(k));
  return (
    <>
      <Cell label="Kind">
        <Select value={c.kind} options={[["", "—"], ...D62E_CREATURE_KINDS.map((k) => [k, k] as [string, string])]} ariaLabel="kind" onChange={(v) => onChange({ ...c, kind: v })} />
      </Cell>
      <Cell label="Genre"><Select value={c.genre} options={D62E_GENRE_OPTS} ariaLabel="genre" onChange={(v) => onChange({ ...c, genre: v })} /></Cell>
      <Cell label="Attributes" className="sm:col-span-2" help={`Total ${d6Code(totalPips) || "0D"} (a starting hero has 12D over the four core attributes). Set an optional attribute only if the creature uses it.`}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[...D62E_ALL_ATTRS, ...extraAttrs].map((a) => (
            <label key={a} className="flex items-center justify-between gap-2 rounded border border-[var(--border)] px-2 py-1">
              <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${(D62E_CORE_ATTRS as readonly string[]).includes(a) ? "text-[var(--text)]" : "text-[var(--muted)]"}`} title={a}>{a}</span>
              <CodeInput value={b.attrs[a] ?? null} nullable ariaLabel={a} onChange={(n) => set({ attrs: { ...b.attrs, [a]: n } })} />
            </label>
          ))}
        </div>
      </Cell>
      <Defense label="Dodge" value={b.dodge} auto={autoDodge(b.attrs)} onChange={(v) => set({ dodge: v })} help="Auto: 5 × Perception dice. Animals often differ — switch Auto off." />
      <Defense label="Parry" value={b.parry} auto={autoParry(b.attrs)} onChange={(v) => set({ parry: v })} help="Auto: 5 × Agility dice." />
      <Cell label="Skills" className="sm:col-span-2" help="Book stat blocks list the dice a skill ADDS to its attribute; the total is shown under each row.">
        <SkillRows b={b} data={data} onChange={(rows) => set({ skills: rows })} />
      </Cell>
      <Cell label="Natural attacks" className="sm:col-span-2" help="Claws, bites, breath. Most add dice to Brawn; the GM Screen rolls the damage.">
        <AttackRows
          rows={c.rows}
          onChange={(rows) => onChange({ ...c, rows })}
          count={false}
          hit={false}
          namePh="Talons"
          specialPh="rider (poison: 6D at the start of its next round…)"
          addLabel="+ Natural attack"
          blank={() => toAtk({ name: "", attr: "Brawn", pips: 3, skill: "", special: "" })}
          damageCell={(r, patch) => (
            <span className="flex items-center gap-2">
              <Select value={r.extra?.attr ?? ""} options={DMG_ATTRS} ariaLabel="damage attribute" onChange={(v) => patch({ extra: { ...(r.extra ?? {}), attr: v } })} />
              <CodeInput value={r.dice.n * 3 + r.dice.m} plus={!!r.extra?.attr} min={0} max={90} ariaLabel="damage" onChange={(n) => patch({ dice: { n: Math.floor((n ?? 0) / 3), d: 6, m: (n ?? 0) % 3 } })} />
            </span>
          )}
          slot={(r, patch) => (
            <label className={styles.atkCell}><span className={styles.atkLbl}>Attack skill · code</span>
              <span className="flex items-center gap-2">
                <Select value={r.extra?.skill ?? ""} options={[["", "—"], ...skillOpts.map((x) => [x, x] as [string, string])]} ariaLabel="attack skill" onChange={(v) => patch({ extra: { ...(r.extra ?? {}), skill: v } })} />
                <span className="font-mono text-[12px] text-[var(--hb-accent)]">{skillCode(b, data, r.extra?.skill ?? "")}</span>
              </span>
            </label>
          )}
        />
      </Cell>
      <Cell label="Special abilities" className="sm:col-span-2" help="One per line — “Armored Scales: +3D to resist damage…”.">
        <LineRows rows={b.special} addLabel="+ Special ability" placeholder="Flight: wings allow flight…" onChange={(special) => set({ special })} />
      </Cell>
      <Cell label="Talents" className="sm:col-span-2"><PickList value={c.talents} onChange={(v) => onChange({ ...c, talents: v })} options={talents} placeholder="+ Book talent…" /></Cell>
      <Cell label="Powers" className="sm:col-span-2"><PickList value={c.powers} onChange={(v) => onChange({ ...c, powers: v })} options={powers} placeholder="+ Book power…" /></Cell>
      <Cell label="Move" className="sm:col-span-2" help="Meters per round, plus any special movement.">
        {b.move.text ? (
          <AsWritten value={b.move.text} max={60} onChange={(t) => set({ move: { ...b.move, text: t } })} onPickers={() => set({ move: { n: 10, modes: [], text: "" } })} />
        ) : (
          <span className="flex flex-wrap items-center gap-3">
            <label className={miniLbl}>Meters<Stepper value={b.move.n} min={0} max={999} nullable width="3em" ariaLabel="move" onChange={(n) => set({ move: { ...b.move, n } })} /></label>
            <ChipPicker options={[...D62E_MOVE_MODES]} value={b.move.modes} onChange={(v) => set({ move: { ...b.move, modes: D62E_MOVE_MODES.filter((m) => v.includes(m)) } })} />
          </span>
        )}
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} value={c.description} maxLength={3000} onChange={(e) => onChange({ ...c, description: e.target.value })} />
      </Cell>
    </>
  );
}

export function CreaturePreview({ name, c }: { name: string; c: CreatureDraft }) {
  const data = useD62eData();
  const b = fullBuild(c);
  const out = composeCreature(b) as { special?: string[]; move?: string };
  const attrOf = (x: string) => skillAttrOf(data, x);
  const attrs = Object.entries(b.attrs).filter(([, p]) => p != null);
  return (
    <Preview title={name || "Unnamed creature"} subtitle={[c.kind, c.genre !== "core" ? D62E_GENRE_OPTS.find(([v]) => v === c.genre)?.[1] : ""].filter(Boolean).join(" · ")}>
      <div className="flex flex-col gap-1 text-[12px]">
        {attrs.length ? (
          <div className="grid grid-cols-4 gap-1 text-center">
            {attrs.map(([a, p]) => <div key={a}><div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{ATTR_ABBR(a)}</div><div className="font-mono">{d6Code(p as number)}</div></div>)}
          </div>
        ) : null}
        {b.skills.length ? <div><b>Skills</b> {b.skills.map((r) => { const t = r.mode === "skill" ? skillTotal(b, r, attrOf) : null; return composeSkillRow(r) + (t != null && attrOf(r.name) ? ` [${d6Code(t)}]` : ""); }).join(", ")}</div> : null}
        {(out.special ?? []).filter((x) => /^(Dodge|Parry) /.test(x)).length ? <div><b>Defenses</b> {(out.special ?? []).filter((x) => /^(Dodge|Parry) /.test(x)).join(" · ")}</div> : null}
        {b.attacks.map((a, i) => (
          <div key={i}><b>{a.name}</b> damage {atkDamage(a)}{a.attr && b.attrs[a.attr] != null ? <span className="text-[var(--muted)]"> [{d6Code((b.attrs[a.attr] as number) + a.pips)}]</span> : null}{a.skill ? ` · ${a.skill} ${skillCode(c.b, data, a.skill)}` : ""}{a.special ? ` · ${a.special}` : ""}</div>
        ))}
        {b.special.filter(Boolean).map((x, i) => <div key={i} className="text-[var(--muted)]">{x}</div>)}
        {c.talents.length ? <div><b>Talents</b> {c.talents.join(", ")}</div> : null}
        {c.powers.length ? <div><b>Powers</b> {c.powers.join(", ")}</div> : null}
        {composeMove(b.move) ? <div><b>Move</b> {composeMove(b.move)}</div> : null}
        {c.description ? <p className="mt-1 text-[var(--muted)]">{c.description}</p> : null}
      </div>
    </Preview>
  );
}
