"use client";
// ── Kids on Bikes homebrew Strength + Flaw builders ──────────────────────────
// Strength storage = KobStrength (book, cost, description) — both COMPOSED by
// the server (rules.ts composeStrength) from the new optional fields:
//   costAT (0 = "Always active", 1–5 = "N AT"), limit ("Once per session"…),
//   freeFor / onlyFor (age groups), effects (badges) and text (free rules text).
// A legacy record (no `text`) opens with its description as the text and an
// unrecognised cost kept as typed, so it re-saves unchanged. Read by
// /kob/strengths, the sheet's Strength rows + picker (cost, description, and
// the "stat" / "atFail" effects) and the creation wizard (cost tag, text).
// Flaw storage = KobFlaw (book, description) — Flaws are roleplay hooks.
import BonusBadges, { BadgeStrip, type Badge, type BadgeKind } from "../BonusBadges";
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import Stepper from "../Stepper";
import {
  BOOK_LABEL, BOOK_OPTS, BOOST_TARGETS, FIND_TARGETS, KOB_STATS, LIMITS, REROLL_TARGETS, SOFTEN_TARGETS, SPELL_TARGETS,
  ageNames, cleanEffects, composeStrength, costLabel, isBookKey, parseCost, type KobBookKey, type StrengthParts,
} from "./rules";
import { Cell, fieldCls, hint, selCls, useKobData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && !!x.trim()) : []);
const sgn = (n?: number) => ((n ?? 0) >= 0 ? "+" : "") + (n ?? 0);

const STAT_OPTS: [string, string][] = KOB_STATS.map((s) => [s, s]);
/** Effect badges. "Does" ones follow "spend N AT to …" when the Strength costs AT. */
const EFFECTS: BadgeKind[] = [
  { k: "stat", label: "+ Stat checks", color: "green", amount: true, target: "stat", amountPh: "+1", fmt: "{n} {t} checks", tip: "Always on: added to that Stat's bonus on the character sheet." },
  { k: "when", label: "+ Rolls when…", color: "teal", amount: true, target: "text", targetPh: "defending one of your friends", format: (b) => `${sgn(b.amount)} when ${b.target}`, tip: "Always on, situational: “Add +3 to rolls when …”." },
  { k: "atFail", label: "AT on a fail", color: "gold", amount: true, amountPh: "2", format: (b) => `${b.amount ?? 2} AT on a fail`, tip: "Gain this many Adversity Tokens when you fail, instead of 1 (Easygoing: 2). The sheet uses it." },
  { k: "atWorth", label: "AT worth more", color: "blue", amount: true, target: "text", optTarget: true, amountPh: "+2", targetPh: "to help your friends (optional)", format: (b) => `AT = ${sgn(b.amount)}${b.target ? " " + b.target : ""}`, tip: "Each AT spent gives +N instead of +1 (Loyal, Resilient)." },
  { k: "soften", label: "Soften a loss", color: "blue", amount: true, target: "choice", choices: SOFTEN_TARGETS, amountPh: "+3", format: (b) => `${sgn(b.amount)} if you ${b.target}`, tip: "Add +N to the negative number; you still lose, but could reduce the loss to -1 (Tough, Spell Slinger)." },
  { k: "spell", label: "+ Spells", color: "purple", amount: true, target: "choice", choices: SPELL_TARGETS, amountPh: "+1", format: (b) => `${sgn(b.amount)} ${b.target === SPELL_TARGETS[0] ? "chosen magic" : b.target + " spells"}`, tip: "Kids on Brooms: a bonus to spells of one type of magic (Trained / Studied / Master of…)." },
  { k: "reroll", label: "Does: reroll", color: "red", target: "choice", choices: REROLL_TARGETS, fmt: "Reroll {t}", tip: "An action: reroll (Lucky, Gifted)." },
  { k: "half", label: "Does: take half", color: "red", format: () => "Half die on a Snap Decision", tip: "Take half of your die's value instead of rolling on a Snap Decision (Cool Under Pressure)." },
  { k: "boost", label: "Does: +N to a roll", color: "red", amount: true, target: "choice", choices: BOOST_TARGETS, amountPh: "+3", format: (b) => `${sgn(b.amount)} to ${b.target}`, tip: "An action: add to your roll, or give a friend a bonus (Team Player)." },
  { k: "ask", label: "Does: ask the GM", color: "red", format: () => "Ask the GM", tip: "Ask the GM about your surroundings or an NPC; they must answer honestly (Intuitive)." },
  { k: "find", label: "Does: find an item", color: "red", target: "choice", choices: FIND_TARGETS.map((f, i) => [f, i ? "Have a commonplace item" : "Find a useful item"] as [string, string]), tip: "Treasure Hunter / Prepared." },
  { k: "hide", label: "Does: go unseen", color: "red", format: () => "Not be seen", tip: "Not be seen, within reason (Unassuming)." },
  { k: "noRoll", label: "Does: auto-succeed", color: "red", target: "text", targetPh: "fixing basic machines", format: (b) => `No roll: ${b.target}`, tip: "Succeed without a roll (Mechanic, Technocrat)." },
  { k: "act", label: "Does: other", color: "grey", target: "text", targetPh: "convince an adult not to get you in trouble", format: (b) => `Does: ${b.target}`, tip: "Any other action, written as “… to <this>”." },
];

// ═══ STRENGTH ════════════════════════════════════════════════════════════════
export type StrengthDraft = { book: KobBookKey; costAT: number | null; costText: string; limit: string; freeFor: string[]; onlyFor: string[]; effects: Badge[]; text: string };
export const blankStrength = (): StrengthDraft => ({ book: "bikes", costAT: 0, costText: "", limit: "", freeFor: [], onlyFor: [], effects: [], text: "" });
export function strengthFromData(d: Data): StrengthDraft {
  const cost = sv(d, "cost");
  const at = d.costAT != null ? Math.max(0, Math.min(5, parseInt(sv(d, "costAT"), 10) || 0)) : parseCost(cost);
  const legacy = d.text == null; // pre-builder record: description is the text
  return {
    book: isBookKey(d.book) ? d.book : "bikes", costAT: at, costText: at == null ? cost : "",
    limit: sv(d, "limit"), freeFor: strs(d.freeFor), onlyFor: strs(d.onlyFor),
    effects: cleanEffects(d.effects), text: legacy ? sv(d, "description") : sv(d, "text"),
  };
}
const parts = (x: StrengthDraft): StrengthParts => ({ costAT: x.costAT, limit: x.costAT ? x.limit : "", freeFor: x.freeFor, onlyFor: x.onlyFor, effects: cleanEffects(x.effects), text: x.text.trim() });
export function strengthPayload(name: string, x: StrengthDraft): Data {
  const p = parts(x);
  const out: Data = { name, book: x.book, text: p.text, effects: p.effects, freeFor: p.freeFor, onlyFor: p.onlyFor };
  if (x.costAT == null) out.cost = x.costText; else out.costAT = x.costAT;
  if (p.limit) out.limit = p.limit;
  return out;
}

export function StrengthBuilder({ value: x, onChange }: { value: StrengthDraft; onChange: (v: StrengthDraft) => void }) {
  const set = (p: Partial<StrengthDraft>) => onChange({ ...x, ...p });
  const ages = ageNames(x.book);
  const kind = x.costAT == null ? "text" : x.costAT ? "at" : "always";
  const only = x.book === "brooms" ? undefined : EFFECTS.map((e) => e.k).filter((k) => k !== "spell");
  return (
    <>
      <Cell label="Book" className="sm:col-span-2">
        <ChipPicker single options={BOOK_OPTS} value={[x.book]} onChange={(v) => set({ book: isBookKey(v[0]) ? v[0] : x.book })} />
      </Cell>
      <Cell label="Cost" className="sm:col-span-2" help="Always-active Strengths just work; the rest cost Adversity Tokens each time they're used.">
        <div className="flex flex-wrap items-center gap-3">
          <ChipPicker single options={[["always", "Always active"], ["at", "Spend AT"]]} value={kind === "text" ? [] : [kind]} onChange={(v) => set({ costAT: v[0] === "at" ? x.costAT || 1 : 0, costText: "" })} />
          {kind === "at" ? <><Stepper value={x.costAT} min={1} max={5} ariaLabel="AT cost" onChange={(n) => set({ costAT: n ?? 1 })} /><span className="text-[12px] text-[var(--muted)]">AT</span></> : null}
          {kind === "at" ? (
            <select className={selCls} value={x.limit} aria-label="limit" onChange={(e) => set({ limit: e.target.value })}>
              <option value="">No limit</option>
              {LIMITS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          ) : null}
          {kind === "text" ? <input className={`${fieldCls} max-w-[220px]`} value={x.costText} maxLength={60} aria-label="cost as written" onChange={(e) => set({ costText: e.target.value })} /> : null}
        </div>
        {kind === "text" ? <p className={hint}>{x.costText ? <>Kept as written (“{x.costText}”). Pick a cost above to structure it.</> : "No cost set — pick one above."}</p> : null}
      </Cell>
      <Cell label="Free for" help="Age groups that get it free at creation.">
        <ChipPicker options={ages} value={x.freeFor} onChange={(v) => set({ freeFor: v })} />
      </Cell>
      <Cell label="Available only to" help="Leave blank if any age can take it.">
        <ChipPicker options={ages} value={x.onlyFor} onChange={(v) => set({ onlyFor: v })} />
      </Cell>
      <Cell label="Effects" className="sm:col-span-2" help={<>Green and gold badges apply on the character sheet; the rest are written into the rules text.{kind === "at" ? " “Does:” badges are what the AT buys." : ""}</>}>
        <BonusBadges value={x.effects} onChange={(b) => set({ effects: b })} kinds={EFFECTS} stats={STAT_OPTS} only={only} addLabel="+ Effect" empty="No effects" max={8} />
      </Cell>
      <Cell label="Rules text" className="sm:col-span-2" help="Anything the effects don't cover — conditions, flavour, GM's discretion. Added after the composed text.">
        <textarea className={`${fieldCls} min-h-[70px]`} value={x.text} maxLength={1000} placeholder="You have some kind of gross bodily trick you can do on command." onChange={(e) => set({ text: e.target.value })} />
      </Cell>
    </>
  );
}

export function StrengthPreview({ name, x }: { name: string; x: StrengthDraft }) {
  const desc = composeStrength(parts(x));
  return (
    <Preview title={name || "Unnamed Strength"} subtitle={`${BOOK_LABEL[x.book]} Strength · ${x.costAT == null ? x.costText || "—" : costLabel(x.costAT)}`}>
      <p className="text-[13px]">{desc || <span className="text-[var(--muted)]">Add effects or rules text.</span>}</p>
      {x.effects.length ? <div className="mt-2"><BadgeStrip value={x.effects} kinds={EFFECTS} stats={STAT_OPTS} /></div> : null}
    </Preview>
  );
}

// ═══ FLAW ════════════════════════════════════════════════════════════════════
export type FlawDraft = { book: KobBookKey; description: string };
export const blankFlaw = (): FlawDraft => ({ book: "bikes", description: "" });
export const flawFromData = (d: Data): FlawDraft => ({ book: isBookKey(d.book) ? d.book : "bikes", description: sv(d, "description") });
export const flawPayload = (name: string, f: FlawDraft): Data => ({ name, book: f.book, description: f.description.trim() });

export function FlawBuilder({ value: f, onChange }: { value: FlawDraft; onChange: (v: FlawDraft) => void }) {
  return (
    <>
      <Cell label="Book" className="sm:col-span-2">
        <ChipPicker single options={BOOK_OPTS} value={[f.book]} onChange={(v) => onChange({ ...f, book: isBookKey(v[0]) ? v[0] : f.book })} />
      </Cell>
      <Cell label="Description" className="sm:col-span-2" help="Optional. A Flaw is a roleplay hook — it shouldn't spoil anyone else's fun.">
        <textarea className={`${fieldCls} min-h-[70px]`} value={f.description} maxLength={500} placeholder="Can't walk past a mystery without poking it." onChange={(e) => onChange({ ...f, description: e.target.value })} />
      </Cell>
    </>
  );
}

export function FlawPreview({ name, f }: { name: string; f: FlawDraft }) {
  const data = useKobData();
  const n = name.trim().toLowerCase();
  const twin = n && data ? data.flaws.find((x) => x.book === f.book && x.source !== "Homebrew" && x.name.toLowerCase() === n) : null;
  const tropes = n && data ? data.tropes.filter((t) => t.book === f.book && (t.suggestedFlaws ?? []).some((x) => x.toLowerCase() === n)).map((t) => t.name) : [];
  return (
    <Preview title={name || "Unnamed Flaw"} subtitle={`${BOOK_LABEL[f.book]} Flaw`}>
      <p className="text-[13px]">{f.description || <span className="text-[var(--muted)]">No description.</span>}</p>
      {twin ? <p className={hint}>The book already has a Flaw called {twin.name}.</p> : null}
      {tropes.length ? <p className={hint}>Suggested by: {tropes.join(", ")}</p> : null}
    </Preview>
  );
}
