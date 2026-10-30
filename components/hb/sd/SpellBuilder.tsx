"use client";
// ── Shadowdark homebrew spell builder ────────────────────────────────────────
// Tier / range / duration / class lists are picked, damage or healing dice are
// built. Storage (type "spell") keeps the SD_SPELLS shape the sheet reads:
//   name, tier ("1"–"5"), caster ("Homebrew" — the sheet's own list), range,
//   duration ("Instant" | "Focus" | "5 rounds" | "1d8 days" …), damage
//   ("2d6"), desc;  new: heal ("1d6" | "scaling" — the sheet already rolls
//   `heal` and labels it Heal), lists (class spell lists that may learn it —
//   the sheet's spell shop shows it under those caster filters too).
import ChipPicker from "../ChipPicker";
import DiceInput from "../DiceInput";
import Preview from "../Preview";
import { formatDice, parseDice, type Dice } from "../dice";
import { SD_DICE, SD_DURATION_KINDS, SD_SPELL_LISTS, composeSdDuration, isTimedDuration, parseSdDuration, type SdDuration } from "./rules";

// Mirrors SPELL_RANGES in lib/homebrew.ts.
const SPELL_RANGES = ["Self", "Touch", "Close", "Near", "Far", "Double near", "1 mile", "Same plane", "Unlimited"];

export type SpellDraft = {
  tier: number;
  range: string;
  duration: SdDuration;
  effect: "none" | "damage" | "heal";
  dice: Dice;
  healScaling: boolean;
  rawDamage: string; // a legacy damage text that isn't plain dice (kept verbatim)
  lists: string[];
  desc: string;
};

export function blankSpell(): SpellDraft {
  return {
    tier: 1, range: "Close", duration: { kind: "Instant", amount: { n: 1, d: 0, m: 0 }, text: "" },
    effect: "none", dice: { n: 1, d: 6, m: 0 }, healScaling: false, rawDamage: "", lists: [], desc: "",
  };
}

export function spellFromData(d: Record<string, unknown>): SpellDraft {
  const dmg = String(d.damage ?? "").trim();
  const heal = String(d.heal ?? "").trim();
  const dd = dmg ? parseDice(dmg) : null;
  const hd = heal && heal !== "scaling" ? parseDice(heal) : null;
  return {
    tier: Math.min(5, Math.max(1, parseInt(String(d.tier), 10) || 1)),
    range: String(d.range || "Close"),
    duration: parseSdDuration(String(d.duration ?? "")),
    effect: heal ? "heal" : dmg ? "damage" : "none",
    dice: (heal ? hd : dd) ?? { n: 1, d: 6, m: 0 },
    healScaling: heal === "scaling",
    rawDamage: dmg && !dd ? dmg : "",
    lists: Array.isArray(d.lists) ? (d.lists as unknown[]).map(String) : [],
    desc: String(d.desc ?? ""),
  };
}

const diceText = (s: SpellDraft) =>
  s.effect === "none" ? "" : s.effect === "heal" && s.healScaling ? "scaling" : s.rawDamage && s.effect === "damage" ? s.rawDamage : formatDice(s.dice);

export function spellPayload(name: string, s: SpellDraft): Record<string, unknown> {
  return {
    name,
    tier: String(s.tier),
    range: s.range,
    duration: composeSdDuration(s.duration),
    damage: s.effect === "damage" ? diceText(s) : "",
    heal: s.effect === "heal" ? diceText(s) : "",
    lists: s.lists,
    desc: s.desc,
  };
}

const lbl = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";
const selCls =
  "h-[34px] rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]";

export default function SpellBuilder({ value: s, onChange }: { value: SpellDraft; onChange: (s: SpellDraft) => void }) {
  const set = <K extends keyof SpellDraft>(k: K, v: SpellDraft[K]) => onChange({ ...s, [k]: v });
  const dur = s.duration;
  return (
    <>
      <div>
        <label className={lbl}>Tier</label>
        <ChipPicker single options={["1", "2", "3", "4", "5"]} value={[String(s.tier)]} onChange={(v) => set("tier", parseInt(v[0] ?? "1", 10) || 1)} />
        <p className="mt-1 text-[10px] text-[var(--muted)]">Spellcasting DC {10 + s.tier}</p>
      </div>
      <div>
        <label className={lbl}>Range</label>
        <select className={`${selCls} w-full`} value={s.range} onChange={(e) => set("range", e.target.value)}>
          {(SPELL_RANGES.includes(s.range) ? SPELL_RANGES : [...SPELL_RANGES, s.range]).map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Duration</label>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className={selCls}
            aria-label="duration"
            value={dur.kind}
            onChange={(e) => set("duration", { ...dur, kind: e.target.value, text: e.target.value === "custom" ? composeSdDuration(dur) : dur.text })}
          >
            {SD_DURATION_KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          {isTimedDuration(dur.kind) ? (
            <DiceInput value={dur.amount} flat mod={false} minCount={1} maxCount={100} dice={[4, 6, 8, 10, 12]} ariaLabel="duration" onChange={(v) => set("duration", { ...dur, amount: v })} />
          ) : null}
          {dur.kind === "custom" ? (
            <input className={`${fieldCls} min-w-0 flex-1`} value={dur.text} maxLength={60} placeholder="Until dispelled…" onChange={(e) => set("duration", { ...dur, text: e.target.value })} />
          ) : null}
          {isTimedDuration(dur.kind) ? <span className="text-[11px] text-[var(--muted)]">Pick “—” for a fixed number, or a die to roll it.</span> : null}
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Damage / healing</label>
        <div className="flex flex-wrap items-center gap-3">
          <ChipPicker single options={[["none", "None"], ["damage", "Damage"], ["heal", "Healing"]]} value={[s.effect]} onChange={(v) => set("effect", (v[0] as SpellDraft["effect"]) || "none")} />
          {s.effect !== "none" && !(s.effect === "heal" && s.healScaling) && !(s.effect === "damage" && s.rawDamage) ? (
            <DiceInput value={s.dice} dice={SD_DICE} minCount={0} maxCount={20} modMin={-10} modMax={20} onChange={(v) => set("dice", v)} />
          ) : null}
          {s.effect === "heal" ? (
            <label className="flex items-center gap-1.5 text-[12px] text-[var(--text)]" title="Cure Wounds style: (1 + half your level) d6">
              <input type="checkbox" checked={s.healScaling} onChange={(e) => set("healScaling", e.target.checked)} />
              Scales with level
            </label>
          ) : null}
          {s.effect === "damage" && s.rawDamage ? (
            <span className="text-[12px] text-[var(--text)]">
              Kept as written: <b>{s.rawDamage}</b>{" "}
              <button type="button" className="underline text-[var(--muted)] hover:text-[var(--text)]" onClick={() => set("rawDamage", "")}>rebuild</button>
            </span>
          ) : null}
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Also on these class lists (optional)</label>
        <ChipPicker options={SD_SPELL_LISTS} value={s.lists} onChange={(v) => set("lists", SD_SPELL_LISTS.filter((x) => v.includes(x)))} />
        <p className="mt-1 text-[11px] text-[var(--muted)]">Always listed under Homebrew; ticked lists also show it in the sheet’s spell shop for those casters.</p>
      </div>
      <div className="sm:col-span-2">
        <label className={lbl}>Description</label>
        <textarea className={fieldCls} rows={3} maxLength={4000} value={s.desc} onChange={(e) => set("desc", e.target.value)} />
      </div>
    </>
  );
}

export function SpellPreview({ name, s }: { name: string; s: SpellDraft }) {
  const dice = diceText(s);
  const shown = dice === "scaling" ? "(1 + ½ level)d6" : dice;
  return (
    <Preview title={name || "Unnamed spell"} subtitle={`Tier ${s.tier}, ${["Homebrew", ...s.lists].join(" / ")}`}>
      <p className="text-[13px]">
        <b className="text-[var(--hb-accent)]">Duration:</b> {composeSdDuration(s.duration) || "—"}
        <br />
        <b className="text-[var(--hb-accent)]">Range:</b> {s.range}
        {shown ? (
          <>
            <br />
            <b className="text-[var(--hb-accent)]">{s.effect === "heal" ? "Heals" : "Damage"}:</b> {shown}
          </>
        ) : null}
      </p>
      {s.desc ? <p className="mt-2 text-[13px] leading-relaxed">{s.desc}</p> : null}
    </Preview>
  );
}
