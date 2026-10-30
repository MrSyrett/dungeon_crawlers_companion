"use client";
// ── Dungeon Crawler Carl homebrew spell builder ──────────────────────────────
// Type / stat chips, mana and AI Favor steppers, base damage (attack) or
// healing (heal) dice with the Stat Mod and damage type, and rank-upgrade rows,
// with a live spell card. Storage (type "dcc-spell", DccSpell shape the
// skills-and-spells page and the DCC sheet read):
//   name, mana, type, stat, passive, aiFavor?, desc, upgrades [{rank, text}], page
//   new (optional): damage "2d6" (attack: base damage / heal: amount healed),
//   damageStat ("INT"… | "none"), damageType — the sheet links an attack
//   spell's damage from `damage` the way book spells use "Base Damage: 2d6".
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import Stepper from "../Stepper";
import { formatDice, parseDice, type Dice } from "../dice";
import UpgradeRows, { UpgradeList } from "./UpgradeRows";
import { DCC_DAMAGE_TYPES, DCC_DICE, DCC_STAT_KEYS, composeDccUpgrade, dccBaseDamageLine, parseDccUpgrade, type DccUpgradeRow } from "./rules";

export type SpellDraft = {
  type: "attack" | "utility" | "heal";
  mana: number;
  stat: string;
  passive: boolean;
  aiFavor: number | null;
  hasDice: boolean;
  dice: Dice;
  damageStat: string; // "" = none
  damageType: string;
  desc: string;
  upgrades: DccUpgradeRow[];
  page: number | null;
};

export function blankSpell(): SpellDraft {
  return {
    type: "utility", mana: 1, stat: "INT", passive: false, aiFavor: null,
    hasDice: false, dice: { n: 1, d: 6, m: 0 }, damageStat: "INT", damageType: "",
    desc: "", upgrades: [], page: null,
  };
}

export function spellFromData(d: Record<string, unknown>): SpellDraft {
  const type = d.type === "attack" || d.type === "heal" ? d.type : "utility";
  const stat = (DCC_STAT_KEYS as readonly string[]).includes(String(d.stat ?? "").toUpperCase()) ? String(d.stat).toUpperCase() : "INT";
  const dd = parseDice(String(d.damage ?? "")) ?? parseDice(String(String(d.desc ?? "").match(/Base Damage:\s*(\d*d\d+)/i)?.[1] ?? ""));
  const dice = dd && dd.n > 0 ? { ...dd, m: 0 } : { n: 1, d: 6, m: 0 };
  const ds = String(d.damageStat ?? "");
  const fav = parseInt(String(d.aiFavor ?? ""), 10);
  const page = parseInt(String(d.page ?? ""), 10);
  return {
    type,
    mana: Math.max(0, parseInt(String(d.mana ?? "1"), 10) || 0),
    stat,
    passive: !!d.passive,
    aiFavor: Number.isFinite(fav) ? fav : null,
    hasDice: !!String(d.damage ?? "").trim(),
    dice,
    damageStat: ds === "none" ? "" : (DCC_STAT_KEYS as readonly string[]).includes(ds) ? ds : stat,
    damageType: String(d.damageType ?? ""),
    desc: String(d.desc ?? ""),
    upgrades: Array.isArray(d.upgrades) ? (d.upgrades as Record<string, unknown>[]).map((u) => parseDccUpgrade(u, dice.d)) : [],
    page: Number.isFinite(page) && page > 0 ? page : null,
  };
}

const rolls = (s: SpellDraft) => s.type !== "utility" && s.hasDice;

export function spellPayload(name: string, s: SpellDraft): Record<string, unknown> {
  return {
    name: name.trim(),
    mana: s.mana,
    type: s.type,
    stat: s.stat,
    passive: s.passive,
    aiFavor: s.aiFavor ?? "",
    damage: rolls(s) ? formatDice(s.dice) : "",
    damageStat: rolls(s) ? s.damageStat || "none" : "",
    damageType: rolls(s) && s.type === "attack" ? s.damageType : "",
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

export default function SpellBuilder({ value: s, onChange }: { value: SpellDraft; onChange: (s: SpellDraft) => void }) {
  const set = <K extends keyof SpellDraft>(k: K, v: SpellDraft[K]) => onChange({ ...s, [k]: v });
  const heal = s.type === "heal";
  return (
    <>
      <div>
        <label className={lbl}>Type</label>
        <ChipPicker single options={[["utility", "Utility"], ["attack", "Attack"], ["heal", "Heal"]]} value={[s.type]}
          onChange={(v) => { const t = (v[0] as SpellDraft["type"]) || "utility"; onChange({ ...s, type: t, hasDice: t !== "utility" && (s.hasDice || s.type === "utility") }); }} />
      </div>
      <div>
        <label className={lbl}>Stat</label>
        <ChipPicker single options={STAT_CHIPS} value={[s.stat]} onChange={(v) => set("stat", v[0] ?? s.stat)} />
      </div>
      <div className="sm:col-span-2 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <label className={lbl}>Mana cost</label>
          <Stepper value={s.mana} min={0} max={999} width="3.4em" ariaLabel="mana cost" onChange={(v) => set("mana", v ?? 0)} />
        </div>
        <div>
          <label className={lbl}>AI Favor (optional)</label>
          <Stepper value={s.aiFavor} min={0} max={10} nullable ariaLabel="AI favor" onChange={(v) => set("aiFavor", v)} />
        </div>
        <label className="flex items-center gap-2 pb-2 text-[13px] text-[var(--text)]"><input type="checkbox" checked={s.passive} onChange={(e) => set("passive", e.target.checked)} />Passive</label>
      </div>

      {s.type !== "utility" ? (
        <div className="sm:col-span-2 flex flex-wrap items-end gap-x-6 gap-y-3">
          <div>
            <label className={lbl}>{heal ? "Heals" : "Base damage"}</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]"><input type="checkbox" checked={s.hasDice} onChange={(e) => set("hasDice", e.target.checked)} />Rolls dice</label>
              {s.hasDice ? (
                <DiceInput value={s.dice} dice={DCC_DICE} minCount={1} maxCount={20} mod={false} ariaLabel={heal ? "healing" : "base damage"}
                  onChange={(v) => onChange({ ...s, dice: v, upgrades: s.upgrades.map((u) => ({ ...u, add: { ...u.add, d: v.d } })) })} />
              ) : null}
            </div>
          </div>
          {s.hasDice ? (
            <div>
              <label className={lbl}>+ Stat Mod</label>
              <ChipPicker single options={STAT_CHIPS} value={s.damageStat ? [s.damageStat] : []} onChange={(v) => set("damageStat", v[0] ?? "")} />
            </div>
          ) : null}
          {s.hasDice && !heal ? (
            <div>
              <label className={lbl}>Damage type</label>
              <select className={selCls} value={s.damageType} onChange={(e) => set("damageType", e.target.value)}>
                <option value="">—</option>
                {(s.damageType && !DCC_DAMAGE_TYPES.includes(s.damageType) ? [...DCC_DAMAGE_TYPES, s.damageType] : DCC_DAMAGE_TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <label className={lbl}>Description</label>
        <textarea className={`${fieldCls} min-h-[70px]`} value={s.desc} maxLength={4000} placeholder="What the spell does…" onChange={(e) => set("desc", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Rank upgrades</label>
        <UpgradeRows rows={s.upgrades} onChange={(v) => set("upgrades", v)} baseDie={rolls(s) ? s.dice.d : 0} damage={s.type === "attack"} />
      </div>
      <div>
        <label className={lbl}>Page (optional)</label>
        <Stepper value={s.page} min={1} max={2000} nullable width="3.6em" ariaLabel="page" onChange={(v) => set("page", v)} />
      </div>
    </>
  );
}

const TYPE: Record<string, string> = { attack: "Attack", utility: "Utility", heal: "Heal" };

export function SpellPreview({ name, s }: { name: string; s: SpellDraft }) {
  const line = rolls(s) ? dccBaseDamageLine(formatDice(s.dice), s.damageStat, s.type === "attack" ? s.damageType : "") : "";
  return (
    <Preview title={name || "Unnamed spell"} subtitle={[TYPE[s.type], `${s.mana} Mana`, s.stat, s.passive ? "Passive" : ""].filter(Boolean).join(" · ")}>
      {line || s.aiFavor != null ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[13px]">
          {line ? <div className="contents"><dt className="font-bold text-[var(--hb-accent)]">{s.type === "heal" ? "Heals" : "Base Damage"}</dt><dd>{line}</dd></div> : null}
          {s.aiFavor != null ? <div className="contents"><dt className="font-bold text-[var(--hb-accent)]">AI Favor</dt><dd>{s.aiFavor}</dd></div> : null}
        </dl>
      ) : null}
      {s.desc ? <p className="mt-2 text-[13px] leading-relaxed">{s.desc}</p> : null}
      <UpgradeList rows={s.upgrades} />
    </Preview>
  );
}
