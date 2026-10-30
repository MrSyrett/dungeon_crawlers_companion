"use client";
// ── ACE! homebrew Focus + Trait builders ─────────────────────────────────────
// Focus storage = AceFocus (stat, setting, note) plus the new optional flat
// bonuses `health` / `defence` (like the book's Tough "+2 Health." and Dodging
// "+6 Defence."). The server composes `note` from them when it's left blank;
// the character sheet adds them to Health / Defence while the Focus is on the
// sheet. Read by /ace/focuses, the sheet's Focus picker and the creation wizard.
// Trait storage = AceTrait (setting, description) — pure roleplay hooks (play
// your Trait, earn Karma), so there's nothing mechanical to structure.
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import { ACE_SETTINGS, ACE_STATS, focusNote, parseFocusNote, settingLabel, type AceStat } from "./rules";
import { Cell, Select, fieldCls } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const nn = (v: unknown): number | null => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) && n ? n : null; };

const STAT_HELP: Record<AceStat, string> = {
  Smarts: "clever, perceptive, knowledgeable", Moves: "quick, accurate, agile", Style: "cool, stylish, charismatic",
  Brawn: "strong, tough", Power: "magic, psionics — 1 Karma per use",
};
const FOCUS_KINDS: BadgeKind[] = [
  { k: "health", label: "Health", color: "green", amount: true, fmt: "{n} Health", tip: "Flat Health while the Hero has this Focus (Tough: +2)." },
  { k: "defence", label: "Defence", color: "blue", amount: true, fmt: "{n} Defence", tip: "Flat Defence while the Hero has this Focus (Dodging: +6)." },
];

// ═══ FOCUS ═══════════════════════════════════════════════════════════════════
export type FocusDraft = { stat: AceStat; setting: string; note: string; badges: Badge[] };
export const blankFocus = (): FocusDraft => ({ stat: "Smarts", setting: "core", note: "", badges: [] });
export function focusFromData(d: Data): FocusDraft {
  const stat = ((ACE_STATS as readonly string[]).includes(sv(d, "stat")) ? sv(d, "stat") : "Smarts") as AceStat;
  let health = nn(d.health), defence = nn(d.defence), note = sv(d, "note");
  // A legacy note that is exactly the bonus phrase becomes badges (the server re-composes it).
  if (health == null && defence == null) { const p = parseFocusNote(note); if (p) { ({ health, defence } = p); note = ""; } }
  else if (note === focusNote(health, defence)) note = "";
  const badges: Badge[] = [];
  if (health) badges.push({ kind: "health", amount: health });
  if (defence) badges.push({ kind: "defence", amount: defence });
  return { stat, setting: sv(d, "setting") || "core", note, badges };
}
const sum = (b: Badge[], k: string) => b.filter((x) => x.kind === k).reduce((n, x) => n + (x.amount ?? 0), 0) || null;
export function focusPayload(name: string, f: FocusDraft): Data {
  const out: Data = { name, stat: f.stat, setting: f.setting, note: f.note };
  const h = sum(f.badges, "health"), d = sum(f.badges, "defence");
  if (h) out.health = h;
  if (d) out.defence = d;
  return out;
}

export function FocusBuilder({ value: f, onChange }: { value: FocusDraft; onChange: (v: FocusDraft) => void }) {
  const set = (p: Partial<FocusDraft>) => onChange({ ...f, ...p });
  return (
    <>
      <Cell label="Stat" className="sm:col-span-2" help={`${f.stat}: ${STAT_HELP[f.stat]}. A Focus adds two dice when it applies.`}>
        <ChipPicker single options={[...ACE_STATS]} value={[f.stat]} onChange={(v) => set({ stat: (v[0] as AceStat) ?? f.stat })} />
      </Cell>
      <Cell label="Setting"><Select value={f.setting} options={ACE_SETTINGS} ariaLabel="setting" onChange={(v) => set({ setting: v })} /></Cell>
      <Cell label="Bonuses" help="Applied on the character sheet while the Focus is taken.">
        <BonusBadges value={f.badges} onChange={(b) => set({ badges: b })} kinds={FOCUS_KINDS} empty="None" max={2} />
      </Cell>
      <Cell label="Rules note" className="sm:col-span-2" help="Optional. Left blank, the bonuses are written as the note.">
        <input className={fieldCls} value={f.note} maxLength={200} placeholder="Shooting covers any ranged combat, even throwing items." onChange={(e) => set({ note: e.target.value })} />
      </Cell>
    </>
  );
}

export function FocusPreview({ name, f }: { name: string; f: FocusDraft }) {
  const note = f.note.trim() || focusNote(sum(f.badges, "health"), sum(f.badges, "defence"));
  return (
    <Preview title={name || "Unnamed Focus"} subtitle={`${f.stat} Focus · ${settingLabel(f.setting)}`}>
      <p className="text-[13px]">Roll {f.stat} <b>+2 dice</b> when {name || "it"} applies.</p>
      {note ? <p className="mt-1 text-[13px]">{note}</p> : null}
      <div className="mt-2"><BadgeStrip value={f.badges} kinds={FOCUS_KINDS} /></div>
    </Preview>
  );
}

// ═══ TRAIT ═══════════════════════════════════════════════════════════════════
export type TraitDraft = { setting: string; description: string };
export const blankTrait = (): TraitDraft => ({ setting: "core", description: "" });
export const traitFromData = (d: Data): TraitDraft => ({ setting: sv(d, "setting") || "core", description: sv(d, "description") });
export const traitPayload = (name: string, t: TraitDraft): Data => ({ name, setting: t.setting, description: t.description });

export function TraitBuilder({ value: t, onChange }: { value: TraitDraft; onChange: (v: TraitDraft) => void }) {
  return (
    <>
      <Cell label="Setting"><Select value={t.setting} options={ACE_SETTINGS} ariaLabel="setting" onChange={(v) => onChange({ ...t, setting: v })} /></Cell>
      <div />
      <Cell label="Description" className="sm:col-span-2" help="Optional. No two Heroes in a group share a Trait; playing it up earns Karma.">
        <textarea className={`${fieldCls} min-h-[70px]`} value={t.description} maxLength={500} placeholder="Always looking for the angle…" onChange={(e) => onChange({ ...t, description: e.target.value })} />
      </Cell>
    </>
  );
}

export function TraitPreview({ name, t }: { name: string; t: TraitDraft }) {
  return (
    <Preview title={name || "Unnamed Trait"} subtitle={`Trait · ${settingLabel(t.setting)}`}>
      <p className="text-[13px]">{t.description || `Play up being ${name || "…"} and the Director may award Karma.`}</p>
    </Preview>
  );
}
