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
//   new: effect — a DAMAGE EFFECT (group "Damage Effect", e.g. a homebrew
//   "Backstab"): { attacks: [skill names], groups: [skill groups], condition,
//   tiers: [{ rank, dice, rankDice, mult, multOf, stat, debuffs, note }] }. The
//   sheet (public/tools-data/dcc-damage-effects.js) gives every attack it works
//   with an extra roll option. Its rank upgrades are written from the tiers.
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { formatDice, parseDice, type Dice } from "../dice";
import UpgradeRows, { UpgradeList } from "./UpgradeRows";
import type { DccNames } from "./data";
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

/** One Rank tier of a Damage Effect — the whole effect from that Rank up. */
export type FxTier = { rank: number; dice: Dice; rankDice: number; mult: string; multOf: "base" | "total"; stat: string; debuffs: string[]; note: string };
export type FxDraft = { attacks: string[]; groups: string[]; condition: string; tiers: FxTier[] };
export const ATTACK_GROUPS = ["Edged", "Bashing", "Ranged", "Reach", "Hand-to-Hand", "Animal/Pet Strike"];
export const DCC_DEBUFF_NAMES = ["Blinded", "Blood Trail", "Burned", "Drowning", "Dying", "Enraged", "Fatigued", "Held", "Long-Term Major Injury",
  "Long-Term Minor Injury", "Major Injury", "Minor Injury", "Muted", "Poisoned", "Potion Sickness", "Paralyzed", "Queasy", "Sepsis", "Shit-Faced",
  "Shocked", "Sore as Shit", "Staggered", "Stiff Legs", "Stunned", "Take Down", "Terrified", "The Taint", "Woozy"];
const FX_DICE = [2, ...DCC_DICE];
const FX_RANKS = [1, 5, 10, 15];
const noDice = (): Dice => ({ n: 0, d: 4, m: 0 });
export const blankTier = (rank = 1): FxTier => ({ rank, dice: { n: 1, d: 4, m: 0 }, rankDice: 0, mult: "", multOf: "base", stat: "", debuffs: [], note: "" });
export const blankFx = (): FxDraft => ({ attacks: [], groups: [], condition: "", tiers: [blankTier(1)] });
export const isFx = (s: { group: string }) => s.group === "Damage Effect";

/** "+1d4 base damage · +1 Rank die · target gains Stunned (note)" for one tier. */
export function fxTierText(t: FxTier): string {
  const bits: string[] = [];
  if (t.dice.n > 0) bits.push(`+${formatDice({ ...t.dice, m: 0 })} base damage`);
  if (t.rankDice) bits.push(t.rankDice > 1 ? `add ${t.rankDice} Rank damage dice` : "add 1 Rank damage die");
  if (t.stat) bits.push(`+ ${t.stat}`);
  if (t.mult === "rank") bits.push("multiply your base damage dice result by your Rank in this Skill");
  else if (t.mult) bits.push(t.multOf === "total" ? `deal x${t.mult} the total damage` : `multiply your base damage dice result by ${t.mult}`);
  if (t.debuffs.length) bits.push(`the target gains the ${t.debuffs.join(" and ")} Debuff${t.debuffs.length > 1 ? "s" : ""}`);
  if (t.note.trim()) bits.push(t.note.trim());
  const txt = bits.join(", ");
  return txt ? txt.charAt(0).toUpperCase() + txt.slice(1) + "." : "";
}
/** "A Noggin Nocker or Edged Damage Effect (Passive)." */
export function fxLead(fx: FxDraft): string {
  const w = [...fx.attacks, ...fx.groups];
  const list = w.length > 1 ? w.slice(0, -1).join(", ") + " or " + w[w.length - 1] : w[0] ?? "";
  return `A${list && /^[AEIOU]/i.test(list) ? "n" : ""} ${list ? list + " " : ""}Damage Effect (Passive).`;
}

export type SkillDraft = {
  fx: FxDraft;
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
    fx: blankFx(),
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
  const e = (d.effect && typeof d.effect === "object" ? d.effect : null) as Record<string, unknown> | null;
  const fx: FxDraft = e ? {
    attacks: Array.isArray(e.attacks) ? (e.attacks as unknown[]).map(String) : [],
    groups: Array.isArray(e.groups) ? (e.groups as unknown[]).map(String) : [],
    condition: String(e.condition ?? ""),
    tiers: (Array.isArray(e.tiers) ? (e.tiers as Record<string, unknown>[]) : []).map((t) => {
      const dd2 = parseDice(String(t.dice ?? ""));
      return {
        rank: Number(t.rank) > 0 ? Number(t.rank) : 1,
        dice: dd2 && dd2.n > 0 ? { ...dd2, m: 0 } : noDice(),
        rankDice: Math.max(0, Math.min(3, Number(t.rankDice) || 0)),
        mult: t.mult === "rank" ? "rank" : Number(t.mult) > 1 ? String(Number(t.mult)) : "",
        multOf: t.multOf === "total" ? "total" : "base",
        stat: String(t.stat ?? "").toUpperCase(),
        debuffs: Array.isArray(t.debuffs) ? (t.debuffs as unknown[]).map(String) : [],
        note: String(t.note ?? ""),
      } as FxTier;
    }),
  } : blankFx();
  if (!fx.tiers.length) fx.tiers = [blankTier(1)];
  return {
    fx,
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
    // A Damage Effect's stored desc is written from its settings; only the player's
    // own extra text (effect.extra) is theirs to edit.
    desc: e ? String(e.extra ?? "") : String(d.desc ?? ""),
    upgrades: Array.isArray(d.upgrades) ? (d.upgrades as Record<string, unknown>[]).map((u) => parseDccUpgrade(u, dice.d)) : [],
    page: Number.isFinite(page) && page > 0 ? page : null,
  };
}

const damageText = (s: SkillDraft) => s.rawDamage || formatDice(s.dice);

export function skillPayload(name: string, s: SkillDraft): Record<string, unknown> {
  // A Damage Effect is a passive attack skill (book shape) whose mechanics live in
  // `effect`; its Rank upgrades are written from the tiers so the info popup and
  // the skills page read like a book entry.
  if (isFx(s)) {
    const tiers = [...s.fx.tiers].sort((a, b) => a.rank - b.rank);
    return {
      name: name.trim(), category: "attack", stat: "", passive: true, interrupt: false, group: "Damage Effect",
      damage: "", damageStat: "", damageType: "", range: "", cooldown: s.cooldown,
      limitations: composeLimitations(s.limitations),
      desc: [fxLead(s.fx), s.fx.condition.trim() ? `Only if: ${s.fx.condition.trim()}.` : "", tiers[0] ? fxTierText(tiers[0]) : "", s.desc.trim()].filter(Boolean).join(" "),
      upgrades: tiers.slice(1).filter((t) => t.rank > 1).map((t) => ({ rank: t.rank, text: fxTierText(t) })),
      page: s.page ?? "",
      effect: {
        attacks: s.fx.attacks, groups: s.fx.groups, condition: s.fx.condition.trim(), extra: s.desc.trim(),
        tiers: tiers.map((t) => ({
          rank: t.rank <= 1 ? 0 : t.rank, dice: t.dice.n > 0 ? formatDice({ ...t.dice, m: 0 }) : "", rankDice: t.rankDice,
          mult: t.mult === "rank" ? "rank" : Number(t.mult) || 0, multOf: t.multOf, stat: t.stat, debuffs: t.debuffs, note: t.note.trim(),
        })),
      },
    };
  }
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

export default function SkillBuilder({ value: s, onChange, names }: { value: SkillDraft; onChange: (s: SkillDraft) => void; names?: DccNames }) {
  const set = <K extends keyof SkillDraft>(k: K, v: SkillDraft[K]) => onChange({ ...s, [k]: v });
  const fxOn = isFx(s);
  const atk = s.category === "attack" && !fxOn;
  const r = s.range;
  const cds = s.cooldown && !COOLDOWNS.includes(s.cooldown) ? [...COOLDOWNS, s.cooldown] : COOLDOWNS;
  return (
    <>
      {fxOn ? (
        <p className="sm:col-span-2 text-[12px] text-[var(--muted)]">A <b className="text-[var(--text)]">Damage Effect</b> is a passive skill: it never rolls on its own. Every attack it works with gains a roll option that applies it — at this skill&apos;s own Rank.</p>
      ) : null}
      <div className={fxOn ? "hidden" : ""}>
        <label className={lbl}>Category</label>
        <ChipPicker single options={[["utility", "Utility"], ["attack", "Attack"]]} value={[s.category]} onChange={(v) => set("category", v[0] === "attack" ? "attack" : "utility")} />
      </div>
      <div className={fxOn ? "hidden" : ""}>
        <label className={lbl}>Check stat</label>
        <ChipPicker single options={STAT_CHIPS} value={s.stat ? [s.stat] : []} onChange={(v) => set("stat", v[0] ?? "")} />
        <p className="mt-1 text-[10px] text-[var(--muted)]">{s.stat ? `Rolls d20 + Rank + ${s.stat} Mod` : "None — a pure passive that never rolls"}</p>
      </div>
      <div className={`sm:col-span-2 flex flex-wrap gap-x-5 gap-y-2 ${fxOn ? "hidden" : ""}`}>
        <label className="flex items-center gap-2 text-[13px] text-[var(--text)]"><input type="checkbox" checked={s.passive} onChange={(e) => set("passive", e.target.checked)} />Passive (never rolls)</label>
        <label className="flex items-center gap-2 text-[13px] text-[var(--text)]"><input type="checkbox" checked={s.interrupt} onChange={(e) => set("interrupt", e.target.checked)} />Interrupt</label>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Group (optional)</label>
        <ChipPicker single custom customPh="Other group…" options={s.group && !DCC_SKILL_GROUPS.includes(s.group) ? [...DCC_SKILL_GROUPS, s.group] : DCC_SKILL_GROUPS} value={s.group ? [s.group] : []} onChange={(v) => set("group", v[0] ?? "")} />
      </div>

      {fxOn ? <FxPanel fx={s.fx} attacks={names?.attacks ?? []} onChange={(v) => set("fx", v)} /> : null}

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
        <label className={lbl}>{fxOn ? "Extra description (optional)" : "Description"}</label>
        <textarea className={`${fieldCls} min-h-[70px]`} value={s.desc} maxLength={4000} placeholder={fxOn ? "Flavour — the effect itself is written from the settings above" : "What the skill does…"} onChange={(e) => set("desc", e.target.value)} />
      </div>
      {fxOn ? null : (
        <div className="sm:col-span-2">
          <label className={lbl}>Rank upgrades</label>
          <UpgradeRows rows={s.upgrades} onChange={(v) => set("upgrades", v)} baseDie={atk && !s.rawDamage ? s.dice.d : 0} damage={atk} />
        </div>
      )}
      <div>
        <label className={lbl}>Page (optional)</label>
        <Stepper value={s.page} min={1} max={2000} nullable width="3.6em" ariaLabel="page" onChange={(v) => set("page", v)} />
      </div>
    </>
  );
}

function FxPanel({ fx, attacks, onChange }: { fx: FxDraft; attacks: { name: string; meta?: string }[]; onChange: (v: FxDraft) => void }) {
  const set = <K extends keyof FxDraft>(k: K, v: FxDraft[K]) => onChange({ ...fx, [k]: v });
  const setTier = (i: number, t: Partial<FxTier>) => set("tiers", fx.tiers.map((x, j) => (j === i ? { ...x, ...t } : x)));
  const used = new Set(fx.tiers.map((t) => t.rank));
  const nextRank = FX_RANKS.find((r) => !used.has(r));
  const avail = attacks.filter((a) => !fx.attacks.includes(a.name));
  return (
    <>
      <div className="sm:col-span-2">
        <label className={lbl}>Works with — weapon groups</label>
        <ChipPicker options={ATTACK_GROUPS} value={fx.groups} onChange={(v) => set("groups", v)} />
        <p className="mt-1 text-[10px] text-[var(--muted)]">Every attack skill in these groups gets this option (e.g. a Backstab for all Edged weapons).</p>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>…and/or specific attacks</label>
        <div className="flex flex-wrap items-center gap-1.5">
          {fx.attacks.map((a) => (
            <span key={a} className="inline-flex items-center gap-1 rounded-full border border-[var(--hb-accent)] px-2 py-0.5 text-[12px] text-[var(--text)]">
              {a}
              <button type="button" aria-label={`Remove ${a}`} className="text-[var(--muted)] hover:text-[var(--text)]" onClick={() => set("attacks", fx.attacks.filter((x) => x !== a))}>×</button>
            </span>
          ))}
          <select className={selCls} value="" aria-label="add an attack" onChange={(e) => e.target.value && set("attacks", [...fx.attacks, e.target.value])}>
            <option value="">Add an attack…</option>
            {avail.map((a) => <option key={a.name} value={a.name}>{a.name}{a.meta ? ` — ${a.meta}` : ""}</option>)}
          </select>
        </div>
        {!fx.groups.length && !fx.attacks.length ? <p className="mt-1 text-[11px] text-[var(--bad)]">Pick at least one group or attack, or no attack will offer it.</p> : null}
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Only if (optional)</label>
        <input className={fieldCls} value={fx.condition} maxLength={160} placeholder="e.g. The target is unaware of you" onChange={(e) => set("condition", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Effect by Rank</label>
        <p className="mb-2 text-[10px] text-[var(--muted)]">Each row is the whole effect from that Rank up (not an addition to the row before).</p>
        <div className="flex flex-col gap-2">
          {fx.tiers.map((t, i) => (
            <div key={i} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-2">
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <div>
                  <label className={lbl}>From Rank</label>
                  <select className={selCls} value={t.rank} aria-label="from rank" onChange={(e) => setTier(i, { rank: Number(e.target.value) })}>
                    {FX_RANKS.filter((r) => r === t.rank || !used.has(r)).map((r) => <option key={r} value={r}>{r === 1 ? "Learned" : `Rank ${r}`}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>+ Base damage</label>
                  <DiceInput value={t.dice} dice={FX_DICE} minCount={0} maxCount={6} mod={false} ariaLabel="extra base damage" onChange={(v) => setTier(i, { dice: v })} />
                </div>
                <div>
                  <label className={lbl}>+ Rank dice</label>
                  <select className={selCls} value={t.rankDice} aria-label="rank damage dice" onChange={(e) => setTier(i, { rankDice: Number(e.target.value) })}>
                    {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n === 0 ? "—" : `+${n}`}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>+ Stat to damage</label>
                  <select className={selCls} value={t.stat} aria-label="stat to damage" onChange={(e) => setTier(i, { stat: e.target.value })}>
                    <option value="">—</option>
                    {DCC_STAT_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Multiply</label>
                  <div className="flex gap-1">
                    <select className={selCls} value={t.mult} aria-label="multiplier" onChange={(e) => setTier(i, { mult: e.target.value })}>
                      <option value="">—</option>
                      {["2", "3", "4", "5", "8"].map((m) => <option key={m} value={m}>×{m}</option>)}
                      <option value="rank">× Rank</option>
                    </select>
                    {t.mult ? (
                      <select className={selCls} value={t.multOf} aria-label="multiply what" onChange={(e) => setTier(i, { multOf: e.target.value === "total" ? "total" : "base" })}>
                        <option value="base">base dice</option>
                        <option value="total">total damage</option>
                      </select>
                    ) : null}
                  </div>
                </div>
                {fx.tiers.length > 1 ? (
                  <button type="button" className="ml-auto text-[12px] text-[var(--muted)] underline hover:text-[var(--text)]" onClick={() => set("tiers", fx.tiers.filter((_, j) => j !== i))}>Remove</button>
                ) : null}
              </div>
              <div className="mt-2">
                <label className={lbl}>Target gains</label>
                <ChipPicker options={DCC_DEBUFF_NAMES} value={t.debuffs} onChange={(v) => setTier(i, { debuffs: v.slice(0, 6) })} />
              </div>
              <div className="mt-2">
                <input className={fieldCls} value={t.note} maxLength={160} placeholder="Anything else (shown in the roll log), e.g. You can't be seen until your next turn" onChange={(e) => setTier(i, { note: e.target.value })} />
              </div>
              <p className="mt-1 text-[11px] text-[var(--muted)]">{fxTierText(t) || "No effect yet — add damage, a multiplier or a Debuff."}</p>
            </div>
          ))}
        </div>
        {nextRank ? (
          <button type="button" className="mt-2 rounded border border-[var(--border)] px-3 py-1 text-[12px] text-[var(--text)] hover:border-[var(--hb-accent)]"
            onClick={() => { const last = fx.tiers[fx.tiers.length - 1]; set("tiers", [...fx.tiers, { ...(last ?? blankTier()), rank: nextRank, debuffs: [...(last?.debuffs ?? [])] }]); }}>
            + Rank {nextRank} upgrade
          </button>
        ) : null}
      </div>
    </>
  );
}

export function SkillPreview({ name, s }: { name: string; s: SkillDraft }) {
  if (isFx(s)) {
    const tiers = [...s.fx.tiers].sort((a, b) => a.rank - b.rank);
    return (
      <Preview title={name || "Unnamed skill"} subtitle="Attack · Damage Effect · Passive">
        <p className="text-[13px] leading-relaxed">{fxLead(s.fx)}{s.fx.condition.trim() ? ` Only if: ${s.fx.condition.trim()}.` : ""} {tiers[0] ? fxTierText(tiers[0]) : ""}</p>
        {s.desc ? <p className="mt-2 text-[13px] leading-relaxed">{s.desc}</p> : null}
        <UpgradeList rows={tiers.slice(1).map((t) => ({ rank: t.rank, add: { n: 0, d: 4, m: 0 }, rankDie: false, text: fxTierText(t) }))} />
      </Preview>
    );
  }
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
