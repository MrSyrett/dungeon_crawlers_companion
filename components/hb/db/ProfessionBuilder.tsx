"use client";
// ── Dragonbane profession builder ────────────────────────────────────────────
// Storage = DbProfession (lib/data/db-types) via normalizeDbProfession →
// cleanDbProfession (rules.ts): keyAttribute, text, skills (exactly 8 — the
// book's profession skill list, six of which a new character trains),
// heroicAbilities (≤3, book + your homebrew; heroicChoice = pick one, like the
// Artisan), kits (1–3 starting gear sets, rolled on a D6: items {name, qty?,
// note?} or {choice: [a, b…]}, food + silver dice), nicknames (D6, ≤6).
// A caster ("Mage") profession is mage: true with one school of magic:
// schoolSkills {school: its 8 skills, the school first}, no heroic ability, and
// the book's magic block (three rank 1 spells + three tricks, a grimoire) — the
// creation wizard then runs its Magic step for that school.
// db-homebrew.js pushes these into window.DB_PROFESSIONS, so the wizard and the
// sheet treat them like book professions.
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import styles from "../hb.module.css";
import { DB_ATTRS, DB_GENERAL_SKILLS, DB_KIT_DICE, DB_MAGE_SCHOOLS, DB_PROF_SKILLS, DB_WEAPON_SKILLS } from "./rules";
import { Cell, NamePicker, RowCtl, Select, Toggle, addBtn, fieldCls, selCls, smallBtn, useDbData, useDbHomebrew } from "./ui";

type Data = Record<string, unknown>;
export type KitItemDraft = { mode: "item" | "choice"; name: string; qty: number; note: string; choice: string[] };
export type KitDraft = { items: KitItemDraft[]; food: string; silver: string };
export type ProfessionDraft = {
  keyAttribute: string; text: string; mage: boolean; school: string; skills: string[];
  heroic: string[]; heroicChoice: boolean; kits: KitDraft[]; nicknames: string[];
};
const blankItem = (): KitItemDraft => ({ mode: "item", name: "", qty: 1, note: "", choice: [] });
const blankKit = (): KitDraft => ({ items: [blankItem()], food: "D6", silver: "D8" });
export const blankProfession = (): ProfessionDraft => ({ keyAttribute: "STR", text: "", mage: false, school: "Elementalism", skills: [], heroic: [], heroicChoice: true, kits: [blankKit()], nicknames: [] });
const strs = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map(String).filter(Boolean) : []);

export function professionFromData(d: Data): ProfessionDraft {
  const b = blankProfession();
  const mage = !!d.mage;
  const ss = (d.schoolSkills ?? {}) as Record<string, unknown>;
  const school = mage ? (Object.keys(ss).find((k) => (DB_MAGE_SCHOOLS as readonly string[]).includes(k)) ?? b.school) : b.school;
  const skills = mage && !strs(d.skills).length ? strs(ss[school]) : strs(d.skills);
  const kits = (Array.isArray(d.kits) ? (d.kits as Data[]) : []).slice(0, 3).map((k): KitDraft => ({
    items: (Array.isArray(k.items) ? (k.items as Data[]) : []).map((it): KitItemDraft => Array.isArray(it.choice)
      ? { ...blankItem(), mode: "choice", choice: strs(it.choice) }
      : { ...blankItem(), name: String(it.name ?? ""), qty: Number(it.qty) || 1, note: String(it.note ?? "") }),
    food: String(k.food ?? "D6"), silver: String(k.silver ?? "D8"),
  }));
  return {
    keyAttribute: String(d.keyAttribute ?? "STR"), text: String(d.text ?? ""), mage, school,
    skills: mage ? [school, ...skills.filter((x) => x !== school)].slice(0, DB_PROF_SKILLS) : skills.slice(0, DB_PROF_SKILLS),
    heroic: strs(d.heroicAbilities).slice(0, 3), heroicChoice: d.heroicChoice == null ? true : !!d.heroicChoice,
    kits: kits.length ? kits : [blankKit()], nicknames: strs(d.nicknames).slice(0, 6),
  };
}
const itemOut = (it: KitItemDraft) => (it.mode === "choice" ? { choice: it.choice } : { name: it.name.trim(), qty: it.qty, note: it.note.trim() });
export function professionPayload(name: string, p: ProfessionDraft): Data {
  return {
    name, keyAttribute: p.keyAttribute, text: p.text, mage: p.mage, school: p.mage ? p.school : "",
    skills: p.skills, heroicAbilities: p.mage ? [] : p.heroic, heroicChoice: p.heroicChoice,
    kits: p.kits.map((k) => ({ items: k.items.filter((it) => (it.mode === "choice" ? it.choice.length : it.name.trim())).map(itemOut), food: k.food, silver: k.silver })),
    nicknames: p.nicknames,
  };
}
export function professionProblems(p: ProfessionDraft): string[] {
  const out: string[] = [];
  if (p.skills.length !== DB_PROF_SKILLS) out.push(`Pick exactly ${DB_PROF_SKILLS} profession skills (${p.skills.length} chosen).`);
  p.kits.forEach((k, i) => {
    if (!k.items.some((it) => (it.mode === "choice" ? it.choice.length : it.name.trim()))) out.push(`Kit ${i + 1} has no items.`);
    if (k.items.some((it) => it.mode === "choice" && it.choice.length === 1)) out.push(`Kit ${i + 1}: a choice needs at least two options.`);
  });
  return out;
}
/** D6 ranges for 1–3 kits (the book always has three: 1–2, 3–4, 5–6). */
export const kitRolls = (n: number) => (n >= 3 ? ["1–2", "3–4", "5–6"] : n === 2 ? ["1–3", "4–6"] : ["1–6"]);
const KIT_NUM = ["I", "II", "III"];
const itemText = (it: KitItemDraft) => (it.mode === "choice" ? it.choice.join(" or ") : `${it.qty > 1 ? `${it.qty}× ` : ""}${it.name}${it.note ? ` (${it.note})` : ""}`);

function SkillGroup({ title, list, p, set, locked }: { title: string; list: readonly string[]; p: ProfessionDraft; set: (x: Partial<ProfessionDraft>) => void; locked?: string }) {
  const mine = p.skills.filter((x) => list.includes(x) && x !== locked);
  return (
    <div>
      <div className="mb-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{title}</div>
      <ChipPicker options={list.filter((x) => x !== locked)} value={mine} onChange={(v) => {
        const next = [...p.skills.filter((x) => !list.includes(x) || x === locked), ...v];
        if (next.length <= DB_PROF_SKILLS) set({ skills: next });
      }} />
    </div>
  );
}

export default function ProfessionBuilder({ value: p, onChange }: { value: ProfessionDraft; onChange: (v: ProfessionDraft) => void }) {
  const set = (x: Partial<ProfessionDraft>) => onChange({ ...p, ...x });
  const D = useDbData();
  const hbAbilities = useDbHomebrew("db-ability");
  const hbGear = [...useDbHomebrew("db-gear"), ...useDbHomebrew("db-weapon"), ...useDbHomebrew("db-armor")];
  const abilityOpts = [...hbAbilities.map((a) => ({ name: a.name, meta: "homebrew" })), ...(D?.abilities ?? []).map((a) => ({ name: a.name, meta: a.wp == null ? "passive" : `${String(a.wp)} WP` }))];
  const gearNames = [...new Set([...(D?.weapons ?? []), ...(D?.armor ?? []), ...(D?.helmets ?? []), ...(D?.gear ?? []), ...hbGear].map((g) => g.name))];
  const known = (n: string) => !n.trim() || !D || gearNames.includes(n.trim());
  const setKit = (i: number, k: KitDraft) => set({ kits: p.kits.map((y, j) => (j === i ? k : y)) });
  const rolls = kitRolls(p.kits.length);
  const changeSchool = (s: string) => set({ school: s, skills: [s, ...p.skills.filter((x) => x !== p.school && x !== s)].slice(0, DB_PROF_SKILLS) });
  return (
    <>
      <Cell label="Key attribute" help="The attribute the profession leans on (shown on the sheet).">
        <ChipPicker single options={DB_ATTRS} value={[p.keyAttribute]} onChange={(v) => v[0] && set({ keyAttribute: v[0] })} />
      </Cell>
      <Cell label="Starts with" help={p.mage ? "Mages get no heroic ability: three rank 1 spells and three tricks of their school or general magic, and a grimoire." : "Everyone but mages starts with a heroic ability, ignoring its requirement."}>
        <ChipPicker single options={[["hero", "Heroic ability"], ["mage", "Magic (a mage)"]]} value={[p.mage ? "mage" : "hero"]}
          onChange={(v) => { if (!v[0]) return; const m = v[0] === "mage"; if (m === p.mage) return; set({ mage: m, skills: m ? [p.school, ...p.skills.filter((x) => x !== p.school)].slice(0, DB_PROF_SKILLS) : p.skills.filter((x) => x !== p.school) }); }} />
      </Cell>
      {p.mage ? (
        <Cell label="School of magic" className="sm:col-span-2" help="The school is always one of the eight profession skills (based on INT).">
          <Select value={p.school} options={DB_MAGE_SCHOOLS} ariaLabel="school" onChange={changeSchool} />
        </Cell>
      ) : (
        <Cell label="Heroic ability" className="sm:col-span-2" help="Pick from the book and your homebrew heroic abilities (up to three).">
          <NamePicker value={p.heroic} onChange={(v) => set({ heroic: v })} options={abilityOpts} custom={false} max={3} placeholder="Search heroic abilities…" />
          {p.heroic.length > 1 ? <div className="mt-2"><Toggle checked={p.heroicChoice} onChange={(v) => set({ heroicChoice: v })}>The player chooses one of these (like the Artisan) — off: they get all of them</Toggle></div> : null}
        </Cell>
      )}
      <Cell label={<>Profession skills <span className={p.skills.length === DB_PROF_SKILLS ? "text-[var(--good)]" : "text-[var(--bad)]"}>{p.skills.length}/{DB_PROF_SKILLS}</span></>} className="sm:col-span-2"
        help={`Exactly ${DB_PROF_SKILLS}. A new character trains six of them (plus free choices by age).`}>
        <div className="flex flex-col gap-1">
          {p.mage ? <div className="text-[12px]"><span className={`${styles.chip} ${styles.on}`}>{p.school} ✓</span> <span className="text-[11px] text-[var(--muted)]">always trained</span></div> : null}
          <SkillGroup title="General skills" list={DB_GENERAL_SKILLS} p={p} set={set} locked={p.mage ? p.school : undefined} />
          <SkillGroup title="Weapon skills" list={DB_WEAPON_SKILLS} p={p} set={set} />
        </div>
      </Cell>
      <Cell label="Starting gear (D6)" className="sm:col-span-2" help="One to three kits; the wizard rolls a D6 or the player picks. Items come from the book's gear, weapons and armor (and your homebrew), so the sheet adds them with their stats.">
        <div className={styles.atkList}>
          {p.kits.map((k, i) => (
            <div key={i} className={styles.atkRow}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <b className="text-[13px]">Kit {KIT_NUM[i]}</b><span className="font-mono text-[11px] text-[var(--muted)]">D6 {rolls[i]}</span>
                <span className="ml-auto flex items-center gap-2 text-[11px] text-[var(--muted)]">
                  Food <Select value={k.food} options={DB_KIT_DICE} ariaLabel="food rations die" onChange={(v) => setKit(i, { ...k, food: v })} />
                  Silver <Select value={k.silver} options={DB_KIT_DICE} ariaLabel="silver die" onChange={(v) => setKit(i, { ...k, silver: v })} />
                  {p.kits.length > 1 ? <button type="button" className={smallBtn} onClick={() => set({ kits: p.kits.filter((_, j) => j !== i) })}>Remove kit</button> : null}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {k.items.map((it, j) => {
                  const setIt = (x: Partial<KitItemDraft>) => setKit(i, { ...k, items: k.items.map((y, m) => (m === j ? { ...y, ...x } : y)) });
                  return (
                    <div key={j} className={styles.atkLine}>
                      <select className={selCls} aria-label="item kind" value={it.mode} onChange={(e) => setIt({ mode: e.target.value as KitItemDraft["mode"], choice: e.target.value === "choice" && !it.choice.length && it.name ? [it.name] : it.choice })}>
                        <option value="item">Item</option><option value="choice">Choice of</option>
                      </select>
                      {it.mode === "item" ? (
                        <>
                          <span className="flex min-w-[130px] flex-1 flex-col">
                            <input className={fieldCls} list="db-prof-gear" value={it.name} maxLength={60} placeholder="Torch" aria-label="item" onChange={(e) => setIt({ name: e.target.value })} />
                            {!known(it.name) ? <span className="text-[10.5px] text-[var(--muted)]">not in the gear lists — added as a plain item</span> : null}
                          </span>
                          <Stepper value={it.qty} min={1} max={10} width="2em" ariaLabel="quantity" onChange={(v) => setIt({ qty: v ?? 1 })} />
                          <input className={`${fieldCls} max-w-[110px]`} value={it.note} maxLength={60} placeholder="note" aria-label="note" onChange={(e) => setIt({ note: e.target.value })} />
                        </>
                      ) : (
                        <span className="min-w-[200px] flex-1"><NamePicker value={it.choice} onChange={(v) => setIt({ choice: v })} options={gearNames.map((n) => ({ name: n }))} max={4} placeholder="Add an option…" /></span>
                      )}
                      <RowCtl rows={k.items} i={j} onChange={(r) => setKit(i, { ...k, items: r })} />
                    </div>
                  );
                })}
              </div>
              {k.items.length < 10 ? <button type="button" className={addBtn} onClick={() => setKit(i, { ...k, items: [...k.items, blankItem()] })}>+ Item</button> : null}
            </div>
          ))}
        </div>
        {p.kits.length < 3 ? <button type="button" className={addBtn} onClick={() => set({ kits: [...p.kits, blankKit()] })}>+ Kit</button> : null}
        <datalist id="db-prof-gear">{gearNames.map((n) => <option key={n} value={n} />)}</datalist>
      </Cell>
      <Cell label="Nicknames (D6)" className="sm:col-span-2" help="Up to six — the wizard rolls a D6 on this list.">
        <NamePicker value={p.nicknames} onChange={(v) => set({ nicknames: v })} options={[]} placeholder="Add a nickname…" max={6} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2">
        <textarea className={`${fieldCls} min-h-[80px]`} maxLength={3000} value={p.text} placeholder="What they do, where they're found…" onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function ProfessionPreview({ name, p }: { name: string; p: ProfessionDraft }) {
  const D = useDbData();
  const hbAbilities = useDbHomebrew("db-ability");
  const attrOf = (sk: string) => String(D?.skills.find((x) => x.name === sk)?.attribute ?? (p.mage && sk === p.school ? "INT" : ""));
  const abil = (n: string) => [...hbAbilities, ...(D?.abilities ?? [])].find((a) => a.name === n);
  const rolls = kitRolls(p.kits.length);
  return (
    <Preview title={name || "Unnamed profession"} subtitle={`Profession · key attribute ${p.keyAttribute}${p.mage ? ` · ${p.school}` : ""}`}>
      {p.text ? <p className="mb-2 whitespace-pre-wrap text-[12.5px] text-[var(--muted)]">{p.text}</p> : null}
      <p className="text-[12px]"><b>Skills:</b> {p.skills.length ? p.skills.map((s) => `${s}${attrOf(s) ? ` (${attrOf(s)})` : ""}`).join(", ") : "—"}</p>
      {p.mage ? (
        <p className="mt-1 text-[12px]"><b>Magic:</b> {p.school} — three rank 1 spells and three tricks of {p.school} or general magic, and a grimoire. No heroic ability.</p>
      ) : (
        <div className="mt-1 text-[12px]"><b>Heroic ability{p.heroic.length > 1 ? (p.heroicChoice ? " (choose one)" : "ies") : ""}:</b> {p.heroic.length ? null : "—"}
          {p.heroic.map((n) => { const a = abil(n); return <div key={n} className="mt-0.5 text-[11.5px] text-[var(--muted)]"><b className="text-[var(--text)]">{n}</b>{a ? ` · ${a.wp == null ? "passive" : `${String(a.wp)} WP`} — ${String(a.text ?? "").slice(0, 140)}` : ""}</div>; })}
        </div>
      )}
      <div className="mt-2 grid gap-1.5">
        {p.kits.map((k, i) => (
          <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-1.5 text-[11.5px]">
            <span className="font-mono text-[10.5px] text-[var(--hb-accent)]">{rolls[i]}</span>{" "}
            {k.items.filter((it) => (it.mode === "choice" ? it.choice.length : it.name.trim())).map(itemText).join(", ") || "—"} · {k.food} food · {k.silver} silver
          </div>
        ))}
      </div>
      {p.nicknames.length ? <p className="mt-2 text-[11.5px] text-[var(--muted)]"><b className="text-[var(--text)]">Nicknames:</b> {p.nicknames.map((n, i) => `${i + 1}. ${n}`).join(" · ")}</p> : null}
    </Preview>
  );
}
