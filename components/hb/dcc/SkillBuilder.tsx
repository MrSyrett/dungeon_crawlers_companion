"use client";
// ── Dungeon Crawler Carl homebrew skill builder ──────────────────────────────
// Category / stat / group chips, a base-damage dice builder, damage stat and
// type, a range builder, cooldown and limitation pickers and rank-upgrade rows,
// with a live skill card. Storage (type "dcc-skill", DccSkill shape the
// skills page and the DCC sheet's skill picker read):
//   name, category, stat (DccStat | null), passive, interrupt, group?,
//   damage "1d6", damageType, range "Melee" | "60 ft" | "Reach (10 ft)",
//   cooldown, limitations, desc, upgrades [{rank, text}], page
//   new: damageStat ("STR"… | "none") — the Stat Mod added to damage (the
//   sheet otherwise reads it from the book's "Base Damage: 1d4 + STR" line).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { formatDice, parseDice, type Dice } from "../dice";
import UpgradeRows, { UpgradeList } from "./UpgradeRows";
import {
  DCC_DAMAGE_TYPES, DCC_DICE, DCC_STAT_KEYS, composeDccSkillRange, composeDccUpgrade, dccBaseDamageLine, parseDccSkillRange, parseDccUpgrade,
  type DccSkillRange, type DccUpgradeRow,
} from "./rules";

export const DCC_SKILL_GROUPS = ["Edged", "Bashing", "Ranged", "Reach", "Hand-to-Hand", "Damage Effect", "Animal/Pet Strike"];
const COOLDOWNS = ["Once per round", "Once per combat", "Once per scene", "Once per day"];
export const DCC_LIMITATIONS = [
  "Requires two hands to wield.",
  "Each Attack requires proper ammunition.",
  "Spend one Action to reload after a Major Fail or worse.",
  "Cannot choose a Damage Effect.",
  "Ranks in this Skill only increase by magical means.",
  "Class-only.",
];

/** Known limitation sentences out of a stored text; whatever's left stays as one custom chip. */
export function parseLimitations(s: string): string[] {
  let rest = String(s ?? "");
  const hit = DCC_LIMITATIONS.filter((l) => rest.includes(l));
  hit.forEach((l) => (rest = rest.replace(l, " ")));
  rest = rest.replace(/\s+/g, " ").trim();
  return rest ? [...hit, rest] : hit;
}
export const composeLimitations = (v: string[]) => v.map((x) => x.trim()).filter(Boolean).join(" ").slice(0, 200);

export type SkillDraft = {
  category: "attack" | "utility";
  stat: string; // "" = none
  passive: boolean;
  interrupt: boolean;
  group: string;
  dice: Dice;
  rawDamage: string; // a legacy damage text that isn't plain dice, kept verbatim
  damageStat: string; // "" = none
  damageType: string;
  range: DccSkillRange;
  cooldown: string;
  limitations: string[];
  desc: string;
  upgrades: DccUpgradeRow[];
  page: number | null;
};

export function blankSkill(): SkillDraft {
  return {
    category: "utility", stat: "DEX", passive: false, interrupt: false, group: "",
    dice: { n: 1, d: 6, m: 0 }, rawDamage: "", damageStat: "STR", damageType: "", range: { kind: "melee", ft: 5, text: "" },
    cooldown: "", limitations: [], desc: "", upgrades: [], page: null,
  };
}

export function skillFromData(d: Record<string, unknown>): SkillDraft {
  const dmg = String(d.damage ?? "").trim();
  const dd = dmg ? parseDice(dmg) : null;
  const dice = dd && dd.n > 0 ? { ...dd, m: 0 } : { n: 1, d: 6, m: 0 };
  const stat = (DCC_STAT_KEYS as readonly string[]).includes(String(d.stat ?? "").toUpperCase()) ? String(d.stat).toUpperCase() : "";
  const ds = String(d.damageStat ?? "");
  const page = parseInt(String(d.page ?? ""), 10);
  return {
    category: d.category === "attack" ? "attack" : "utility",
    stat,
    passive: !!d.passive,
    interrupt: !!d.interrupt,
    group: String(d.group ?? ""),
    dice,
    rawDamage: dmg && !(dd && dd.n > 0 && !dd.m) ? dmg : "",
    damageStat: ds === "none" ? "" : (DCC_STAT_KEYS as readonly string[]).includes(ds) ? ds : stat,
    damageType: String(d.damageType ?? ""),
    range: parseDccSkillRange(String(d.range ?? "")),
    cooldown: String(d.cooldown ?? ""),
    limitations: parseLimitations(String(d.limitations ?? "")),
    desc: String(d.desc ?? ""),
    upgrades: Array.isArray(d.upgrades) ? (d.upgrades as Record<string, unknown>[]).map((u) => parseDccUpgrade(u, dice.d)) : [],
    page: Number.isFinite(page) && page > 0 ? page : null,
  };
}

const damageText = (s: SkillDraft) => s.rawDamage || formatDice(s.dice);

export function skillPayload(name: string, s: SkillDraft): Record<string, unknown> {
  const atk = s.category === "attack";
  return {
    name: name.trim(),
    category: s.category,
    stat: s.stat,
    passive: s.passive,
    interrupt: s.interrupt,
    group: s.group,
    damage: atk ? damageText(s) : "",
    damageStat: atk ? s.damageStat || "none" : "",
    damageType: atk ? s.damageType : "",
    range: atk ? composeDccSkillRange(s.range) : "",
    cooldown: atk ? s.cooldown : "",
    limitations: composeLimitations(s.limitations),
    desc: s.desc,
    upgrades: s.upgrades.map((u) => ({ rank: u.rank, text: composeDccUpgrade(u) })),
    page: s.page ?? "",
  };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls =
  "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const STAT_CHIPS: [string, string][] = DCC_STAT_KEYS.map((k) => [k, k]);

export default function SkillBuilder({ value: s, onChange }: { value: SkillDraft; onChange: (s: SkillDraft) => void }) {
  const set = <K extends keyof SkillDraft>(k: K, v: SkillDraft[K]) => onChange({ ...s, [k]: v });
  const atk = s.category === "attack";
  const r = s.range;
  const cds = s.cooldown && !COOLDOWNS.includes(s.cooldown) ? [...COOLDOWNS, s.cooldown] : COOLDOWNS;
  return (
    <>
      <div>
        <label className={lbl}>Category</label>
        <ChipPicker single options={[["utility", "Utility"], ["attack", "Attack"]]} value={[s.category]} onChange={(v) => set("category", v[0] === "attack" ? "attack" : "utility")} />
      </div>
      <div>
        <label className={lbl}>Check stat</label>
        <ChipPicker single options={STAT_CHIPS} value={s.stat ? [s.stat] : []} onChange={(v) => set("stat", v[0] ?? "")} />
        <p className="mt-1 text-[10px] text-[var(--muted)]">{s.stat ? `Rolls d20 + Rank + ${s.stat} Mod` : "None — a pure passive that never rolls"}</p>
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-x-5 gap-y-2">
        <label className="flex items-center gap-2 text-[13px] text-[var(--text)]"><input type="checkbox" checked={s.passive} onChange={(e) => set("passive", e.target.checked)} />Passive (never rolls)</label>
        <label className="flex items-center gap-2 text-[13px] text-[var(--text)]"><input type="checkbox" checked={s.interrupt} onChange={(e) => set("interrupt", e.target.checked)} />Interrupt</label>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Group (optional)</label>
        <ChipPicker single custom customPh="Other group…" options={s.group && !DCC_SKILL_GROUPS.includes(s.group) ? [...DCC_SKILL_GROUPS, s.group] : DCC_SKILL_GROUPS} value={s.group ? [s.group] : []} onChange={(v) => set("group", v[0] ?? "")} />
      </div>

      {atk ? (
        <>
          <div className="sm:col-span-2 flex flex-wrap items-end gap-x-6 gap-y-3">
            <div>
              <label className={lbl}>Base damage</label>
              {s.rawDamage ? (
                <span className="text-[12px] text-[var(--text)]">
                  Kept as written: <b>{s.rawDamage}</b>{" "}
                  <button type="button" className="underline text-[var(--muted)] hover:text-[var(--text)]" onClick={() => set("rawDamage", "")}>rebuild</button>
                </span>
              ) : (
                <DiceInput value={s.dice} dice={DCC_DICE} minCount={1} maxCount={10} mod={false} ariaLabel="base damage"
                  onChange={(v) => onChange({ ...s, dice: v, upgrades: s.upgrades.map((u) => ({ ...u, add: { ...u.add, d: v.d } })) })} />
              )}
            </div>
            <div>
              <label className={lbl}>+ Stat Mod to damage</label>
              <ChipPicker single options={STAT_CHIPS} value={s.damageStat ? [s.damageStat] : []} onChange={(v) => set("damageStat", v[0] ?? "")} />
            </div>
            <div>
              <label className={lbl}>Damage type</label>
              <select className={selCls} value={s.damageType} onChange={(e) => set("damageType", e.target.value)}>
                <option value="">—</option>
                {(s.damageType && !DCC_DAMAGE_TYPES.includes(s.damageType) ? [...DCC_DAMAGE_TYPES, s.damageType] : DCC_DAMAGE_TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-end gap-x-6 gap-y-3">
            <div>
              <label className={lbl}>Range</label>
              <div className="flex flex-wrap items-center gap-2">
                <select className={selCls} aria-label="range kind" value={r.kind} onChange={(e) => set("range", { ...r, kind: e.target.value as DccSkillRange["kind"], ft: e.target.value === "reach" ? Math.max(10, r.ft) : r.ft })}>
                  <option value="">—</option>
                  <option value="melee">Melee</option>
                  <option value="reach">Reach</option>
                  <option value="ft">Ranged (ft)</option>
                  <option value="custom">Other…</option>
                </select>
                {r.kind === "ft" || r.kind === "reach" ? (
                  <span className="flex items-center gap-1 text-[12px] text-[var(--muted)]">
                    <Stepper value={r.ft} min={5} max={2000} step={5} width="3.4em" ariaLabel="range in feet" onChange={(v) => set("range", { ...r, ft: v ?? 30 })} /> ft
                  </span>
                ) : null}
                {r.kind === "custom" ? <input className={`${fieldCls} w-48`} value={r.text} maxLength={60} placeholder="e.g. Line of sight" onChange={(e) => set("range", { ...r, text: e.target.value })} /> : null}
              </div>
            </div>
            <div>
              <label className={lbl}>Cooldown</label>
              <select className={selCls} value={s.cooldown} onChange={(e) => set("cooldown", e.target.value)}>
                <option value="">None</option>
                {cds.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </>
      ) : null}

      <div className="sm:col-span-2">
        <label className={lbl}>Limitations (optional)</label>
        <ChipPicker options={DCC_LIMITATIONS} value={s.limitations} custom customPh="Other limitation…" onChange={(v) => set("limitations", v)} />
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Description</label>
        <textarea className={`${fieldCls} min-h-[70px]`} value={s.desc} maxLength={4000} placeholder="What the skill does…" onChange={(e) => set("desc", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Rank upgrades</label>
        <UpgradeRows rows={s.upgrades} onChange={(v) => set("upgrades", v)} baseDie={atk && !s.rawDamage ? s.dice.d : 0} damage={atk} />
      </div>
      <div>
        <label className={lbl}>Page (optional)</label>
        <Stepper value={s.page} min={1} max={2000} nullable width="3.6em" ariaLabel="page" onChange={(v) => set("page", v)} />
      </div>
    </>
  );
}

export function SkillPreview({ name, s }: { name: string; s: SkillDraft }) {
  const atk = s.category === "attack";
  const facts: [string, string][] = [];
  if (atk) {
    const line = dccBaseDamageLine(damageText(s), s.damageStat, s.damageType);
    if (line) facts.push(["Base Damage", line]);
    const range = composeDccSkillRange(s.range);
    if (range) facts.push(["Range", range]);
    if (s.cooldown) facts.push(["Cooldown", s.cooldown]);
  }
  const sub = [atk ? "Attack" : "Utility", s.group, s.stat || "No stat", s.passive ? "Passive" : "", s.interrupt ? "Interrupt" : ""].filter(Boolean).join(" · ");
  return (
    <Preview title={name || "Unnamed skill"} subtitle={sub}>
      {facts.length ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[13px]">
          {facts.map(([k, v]) => (
            <div key={k} className="contents"><dt className="font-bold text-[var(--hb-accent)]">{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      ) : null}
      {s.limitations.length ? <p className="mt-1.5 text-[12px] italic text-[var(--muted)]">{composeLimitations(s.limitations)}</p> : null}
      {s.desc ? <p className="mt-2 text-[13px] leading-relaxed">{s.desc}</p> : null}
      <UpgradeList rows={s.upgrades} />
    </Preview>
  );
}
