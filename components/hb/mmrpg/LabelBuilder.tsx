"use client";
// ── MMRPG homebrew Trait / Tag builder ──────────────────────────────────────
// Rules prose, situational rows ("edge on Ego checks when persuading…",
// "enemies have trouble on …"), flat effect badges (Health, Focus, defense and
// Run Speed — the character sheet applies these while the trait/tag is on the
// sheet — plus extra reactions, immunities and restrictions), and a "can be
// taken more than once" toggle. The server composes `description` in book
// wording; a record with nothing structured stores only its description.
import BonusBadges, { BadgeStrip, type BadgeKind } from "../BonusBadges";
import Preview from "../Preview";
import { ABILITIES, CHECKS, SITU_KINDS, cleanLabelFx, cleanSitu, composeLabel, situSentence, type Fx, type Situ } from "./rules";
import { Cell, fieldCls, hint, miniBtn, rowBox, selCls, statK } from "./ui";

type Data = Record<string, unknown>;
export type Noun = "trait" | "tag";
export type LabelDraft = { text: string; situ: Situ[]; fx: Fx[]; repeatable: boolean };
export const blankLabel = (): LabelDraft => ({ text: "", situ: [], fx: [], repeatable: false });
export function labelFromData(d: Data): LabelDraft {
  const situ = cleanSitu(d.situational), fx = cleanLabelFx(d.effects), repeatable = d.repeatable === true;
  const structured = situ.length || fx.length || repeatable;
  return { text: structured && typeof d.text === "string" ? d.text : String(d.description ?? ""), situ, fx, repeatable };
}
export function labelPayload(noun: Noun, name: string, l: LabelDraft): Data {
  const situ = cleanSitu(l.situ), fx = cleanLabelFx(l.fx);
  const out: Data = { name, description: composeLabel(noun, l.text, situ, fx, l.repeatable) };
  if (situ.length || fx.length || l.repeatable) Object.assign(out, { text: l.text.trim(), situational: situ, effects: fx, repeatable: l.repeatable });
  return out;
}

const sgn = (n?: number) => ((n ?? 0) > 0 ? `+${n}` : `−${Math.abs(n ?? 0)}`);
export const LABEL_FX: readonly BadgeKind[] = [
  { k: "health", label: "Health", color: "red", amount: true, amountPh: "+30", tip: "Adds to maximum Health (Resilience × 30). The sheet applies it.", format: (b) => `${sgn(b.amount)} Health` },
  { k: "focus", label: "Focus", color: "blue", amount: true, amountPh: "+30", tip: "Adds to maximum Focus (Vigilance × 30) — e.g. Battle Ready, +30. The sheet applies it.", format: (b) => `${sgn(b.amount)} Focus` },
  { k: "defense", label: "Defense", color: "green", amount: true, amountPh: "±1", target: "choice", choices: ABILITIES, tip: "± to one ability's defense (Big: −1 Melee and −1 Agility; Small: +1). The sheet applies it.", format: (b) => `${sgn(b.amount)} ${ABILITIES.find(([k]) => k === b.target)?.[1] ?? ""} def.` },
  { k: "speed", label: "Run Speed", color: "teal", amount: true, amountPh: "±1", tip: "± to Run Speed. The sheet applies it.", format: (b) => `${sgn(b.amount)} Run Speed` },
  { k: "reaction", label: "Reactions", color: "purple", amount: true, optAmount: true, amountPh: "1", tip: "Extra reactions each round (Combat Reflexes).", format: (b) => `+${b.amount ?? 1} reaction${(b.amount ?? 1) === 1 ? "" : "s"}` },
  { k: "immunity", label: "Immunity", color: "gold", target: "text", targetPh: "e.g. aging, disease", tip: "Something the character is immune to.", format: (b) => `Immune: ${b.target}` },
  { k: "restriction", label: "Restriction", color: "grey", target: "text", targetPh: "e.g. For mutants only", tip: "Who may take it, or what it rules out.", format: (b) => `Restriction: ${b.target}` },
];

export function LabelBuilder({ noun, value: l, onChange }: { noun: Noun; value: LabelDraft; onChange: (v: LabelDraft) => void }) {
  const set = (x: Partial<LabelDraft>) => onChange({ ...l, ...x });
  const setRow = (i: number, x: Partial<Situ>) => set({ situ: l.situ.map((r, j) => (j === i ? { ...r, ...x } : r)) });
  return (
    <>
      <Cell label="Rules text" className="sm:col-span-2" help="What it means at the table. The rows and badges below add their own sentences.">
        <textarea className={`${fieldCls} min-h-[80px]`} value={l.text} maxLength={2400} placeholder={noun === "trait" ? "The character knows their way around machines." : "The character has a base, cave or lair they can use…"} onChange={(e) => set({ text: e.target.value })} />
      </Cell>
      <Cell label="Edges & troubles" className="sm:col-span-2" help="Edge = reroll one die and keep the better result; trouble = reroll one and keep the worse. Situational, so the player applies them from the dice tray.">
        <div className="flex flex-col gap-1.5">
          {l.situ.map((r, i) => (
            <div key={i} className={`${rowBox} flex flex-wrap items-center gap-1.5`}>
              <select className={selCls} aria-label="edge or trouble" value={r.kind} onChange={(e) => setRow(i, { kind: e.target.value as Situ["kind"] })}>
                {SITU_KINDS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
              <select className={selCls} aria-label="check" value={r.check} onChange={(e) => setRow(i, { check: e.target.value })}>
                {CHECKS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
              <input className={`${fieldCls} min-w-[160px] flex-1`} value={r.when} maxLength={160} placeholder="when… (e.g. to persuade someone)" onChange={(e) => setRow(i, { when: e.target.value })} />
              <button type="button" className={miniBtn} aria-label="Remove row" onClick={() => set({ situ: l.situ.filter((_, j) => j !== i) })}>✕</button>
              <p className="basis-full text-[11px] italic text-[var(--muted)]">{situSentence(r)}</p>
            </div>
          ))}
        </div>
        {l.situ.length < 8 ? <button type="button" className={`${miniBtn} mt-1.5`} onClick={() => set({ situ: [...l.situ, { kind: "edge", check: noun === "trait" ? "logic" : "ego", when: "" }] })}>+ Edge / trouble</button> : null}
      </Cell>
      <Cell label="Effects" className="sm:col-span-2">
        <BonusBadges value={l.fx} onChange={(fx) => set({ fx: cleanLabelFx(fx) })} kinds={LABEL_FX} empty="None" addLabel="+ Effect" max={10} />
      </Cell>
      <label className="flex items-center gap-2 text-[13px] text-[var(--text)] sm:col-span-2">
        <input type="checkbox" checked={l.repeatable} onChange={(e) => set({ repeatable: e.target.checked })} />
        Can be taken more than once
      </label>
    </>
  );
}

export function LabelPreview({ noun, name, l }: { noun: Noun; name: string; l: LabelDraft }) {
  const d = labelPayload(noun, name, l);
  return (
    <Preview title={name || `Unnamed ${noun === "trait" ? "Trait" : "Tag"}`} subtitle={noun === "trait" ? "Trait" : "Tag"}>
      {d.description ? <p className="text-[13px] leading-relaxed">{String(d.description)}</p> : <p className={hint}>No text yet.</p>}
      {l.fx.some((f) => ["health", "focus", "defense", "speed"].includes(f.kind)) ? (
        <div className="mt-2"><span className={statK}>Sheet applies</span><BadgeStrip value={l.fx.filter((f) => ["health", "focus", "defense", "speed"].includes(f.kind))} kinds={LABEL_FX} /></div>
      ) : null}
    </Preview>
  );
}
