"use client";
// ── Kids on Bikes homebrew Trope builder ─────────────────────────────────────
// Storage = KobTrope (lib/data/kob-types): dice {Stat: die} — the six Stats get
// d4, d6, d8, d10, d12 and d20 exactly once each (the server rejects anything
// else, because the sheet's creation wizard copies the set straight onto the
// character) — plus ages, suggestedStrengths, suggestedFlaws, questions and,
// for Kids on Bikes, suggestedRide composed from ride rows (age · colour ·
// accessory), parsed back when it re-composes exactly (else kept as text).
// Read by /kob/tropes, the sheet's trope datalist / question hint and the
// creation wizard (kob-sheet-builder.js: dice, ages, suggestions, questions).
import ChipPicker from "../ChipPicker";
import Preview from "../Preview";
import styles from "../hb.module.css";
import {
  AGE_GROUPS, BOOK_LABEL, BOOK_OPTS, DIE_LABEL, KOB_DICE, KOB_STATS, STAT_HELP, ageNames, composeRide, diceProblems, isBookKey, parseRide, readDice,
  type DiceMap, type KobBookKey, type KobDieN, type KobStatKey, type RideRow,
} from "./rules";
import { Cell, OpenSelect, RowCtl, addBtn, fieldCls, hint, selCls, uniqNames, useKobData } from "./ui";

type Data = Record<string, unknown>;
const sv = (d: Data, k: string) => (d[k] == null ? "" : String(d[k]));
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && !!x.trim()) : []);

export type TropeDraft = {
  book: KobBookKey; dice: DiceMap; ages: string[];
  strengths: string[]; flaws: string[]; questions: string[];
  ride: RideRow[] | null; rideText: string;
};
export const blankTrope = (): TropeDraft => ({ book: "bikes", dice: {}, ages: [], strengths: [], flaws: [], questions: ["", ""], ride: [], rideText: "" });
export function tropeFromData(d: Data): TropeDraft {
  const rideText = sv(d, "suggestedRide");
  const qs = strs(d.questions);
  return {
    book: isBookKey(d.book) ? d.book : "bikes", dice: readDice(d), ages: strs(d.ages),
    strengths: strs(d.suggestedStrengths), flaws: strs(d.suggestedFlaws),
    questions: qs.length ? qs : ["", ""],
    ride: parseRide(rideText), rideText,
  };
}
const rideOf = (t: TropeDraft) => (t.ride ? composeRide(t.ride) : t.rideText.trim());
export function tropePayload(name: string, t: TropeDraft): Data {
  const out: Data = {
    name, book: t.book, dice: { ...t.dice }, ages: t.ages,
    suggestedStrengths: t.strengths, suggestedFlaws: t.flaws,
    questions: t.questions.map((q) => q.trim()).filter(Boolean),
  };
  const ride = rideOf(t);
  if (ride) out.suggestedRide = ride;
  return out;
}
export const tropeProblems = (t: TropeDraft) => diceProblems(t.dice);

// ── Stat-die assignment ──────────────────────────────────────────────────────
function DiceGrid({ dice, onChange }: { dice: DiceMap; onChange: (d: DiceMap) => void }) {
  const assign = (st: KobStatKey, die: KobDieN) => {
    const next = { ...dice };
    if (next[st] === die) { delete next[st]; onChange(next); return; }
    const other = KOB_STATS.find((o) => o !== st && next[o] === die);
    if (other) { if (next[st] != null) next[other] = next[st]; else delete next[other]; } // swap
    next[st] = die;
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-1.5">
      {KOB_STATS.map((st) => {
        const dup = dice[st] != null && KOB_STATS.some((o) => o !== st && dice[o] === dice[st]);
        return (
          <div key={st} className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="w-[64px] text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--text)]" title={STAT_HELP[st]}>{st}</span>
            <span className={styles.chips} role="radiogroup" aria-label={`${st} die`}>
              {[...KOB_DICE].reverse().map((d) => {
                const takenBy = KOB_STATS.find((o) => o !== st && dice[o] === d);
                return (
                  <button key={d} type="button" role="radio" aria-checked={dice[st] === d}
                    className={`${styles.chip} ${dice[st] === d ? styles.on : ""}`}
                    style={takenBy && dice[st] !== d ? { opacity: 0.45, borderStyle: "dashed" } : undefined}
                    title={takenBy ? `d${d} is ${takenBy}'s — click to swap` : DIE_LABEL[d]}
                    onClick={() => assign(st, d)}>d{d}</button>
                );
              })}
            </span>
            <span className={`text-[11px] ${dup ? "text-[var(--bad)]" : "text-[var(--muted)]"}`}>{dice[st] ? DIE_LABEL[dice[st]!] : "—"}{dup ? " · duplicate" : ""}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function TropeBuilder({ value: t, onChange }: { value: TropeDraft; onChange: (v: TropeDraft) => void }) {
  const set = (p: Partial<TropeDraft>) => onChange({ ...t, ...p });
  const data = useKobData();
  const problems = diceProblems(t.dice);
  const strengthOpts = data ? uniqNames(data.strengths.filter((s) => s.book === t.book)) : [];
  const flawOpts = data ? uniqNames(data.flaws.filter((f) => f.book === t.book)) : [];
  const bookTropes = data ? data.tropes.filter((x) => x.book === t.book && x.source !== "Homebrew") : [];
  const colors = data ? uniqNames(data.items.filter((i) => i.book === "bikes" && i.kind === "bike-color")) : [];
  const accs = data ? uniqNames(data.items.filter((i) => i.book === "bikes" && i.kind === "bike-accessory")) : [];
  const ages = [...ageNames(t.book), "Any"];
  const setAges = (v: string[]) => set({ ages: v.includes("Any") && !t.ages.includes("Any") ? ["Any"] : v.filter((a) => a !== "Any" || v.length === 1) });
  const rides = t.ride ?? [];
  const setRide = (r: RideRow[]) => set({ ride: r });

  return (
    <>
      <Cell label="Book" className="sm:col-span-2">
        <ChipPicker single options={BOOK_OPTS} value={[t.book]} onChange={(v) => set({ book: isBookKey(v[0]) ? v[0] : t.book })} />
      </Cell>
      <Cell label="Stat dice" className="sm:col-span-2"
        help={problems.length ? <span className="text-[var(--bad)]">{problems.join(" ")}</span> : "One of each die ✓ — the d20 is what they're remarkably good at, the d4 their weakness."}>
        <DiceGrid dice={t.dice} onChange={(d) => set({ dice: d })} />
        {bookTropes.length ? (
          <select className={`${selCls} mt-2`} value="" aria-label="Copy dice from a book trope" onChange={(e) => { const bt = (data?.tropes ?? []).find((x) => x.book === t.book && x.name === e.target.value) as unknown as Data | undefined; if (bt) set({ dice: readDice(bt) }); }}>
            <option value="">Copy dice from a book trope…</option>
            {bookTropes.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
          </select>
        ) : null}
      </Cell>
      <Cell label={t.book === "brooms" ? "Grades" : "Ages"} className="sm:col-span-2" help="Which age groups the Trope suits. The group gives +1 to two Stats and a free Strength.">
        <ChipPicker options={ages} value={t.ages} onChange={setAges} />
      </Cell>
      <Cell label={`Suggested strengths (${t.strengths.length})`} className="sm:col-span-2" help={`${BOOK_LABEL[t.book]} Strengths, including your homebrew. Book Tropes suggest about six; the wizard lists these first.`}>
        {data ? <ChipPicker options={strengthOpts} value={t.strengths} onChange={(v) => set({ strengths: v.slice(0, 20) })} /> : <p className={hint}>Loading strengths…</p>}
      </Cell>
      <Cell label={`Suggested flaws (${t.flaws.length})`} className="sm:col-span-2" help="Book Tropes suggest about seven. Any Flaw is fair game, so custom ones are allowed.">
        {data ? <ChipPicker options={flawOpts} value={t.flaws} onChange={(v) => set({ flaws: v.slice(0, 20) })} custom customPh="+ custom flaw" /> : <p className={hint}>Loading flaws…</p>}
      </Cell>
      {t.book === "bikes" || rideOf(t) ? (
        <Cell label="Suggested bike" className="sm:col-span-2" help={t.ride ? "One row per age group: the bike's colour and accessory (from the book's bike tables)." : "This text doesn't follow the book's “Age: Colour, Accessory” pattern, so it's kept as written."}>
          {t.ride ? (
            <div className="flex flex-col gap-2">
              {rides.map((r, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2 rounded border border-[var(--border)] px-2 py-1.5">
                  <ChipPicker options={ages} value={r.ages} onChange={(v) => setRide(rides.map((x, j) => (j === i ? { ...x, ages: v } : x)))} />
                  <OpenSelect value={r.color} options={colors} blank="Colour" ariaLabel="bike colour" onChange={(v) => setRide(rides.map((x, j) => (j === i ? { ...x, color: v } : x)))} />
                  <OpenSelect value={r.accessory} options={accs} blank="Accessory" ariaLabel="bike accessory" onChange={(v) => setRide(rides.map((x, j) => (j === i ? { ...x, accessory: v } : x)))} />
                  <span className="ml-auto"><RowCtl rows={rides} i={i} onChange={setRide} /></span>
                </div>
              ))}
              {rides.length < 4 ? <button type="button" className={addBtn} onClick={() => setRide([...rides, { ages: [], color: "", accessory: "" }])}>+ Bike</button> : null}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <input className={fieldCls} value={t.rideText} maxLength={200} aria-label="suggested ride" onChange={(e) => set({ rideText: e.target.value })} />
              <button type="button" className={addBtn} onClick={() => set({ ride: parseRide(t.rideText) ?? [], rideText: "" })}>Use bike rows instead</button>
            </div>
          )}
        </Cell>
      ) : null}
      <Cell label="Trope questions" className="sm:col-span-2" help="Book Tropes ask two questions the player answers about their character.">
        <div className="flex flex-col gap-2">
          {t.questions.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-4 text-[12px] text-[var(--muted)]">{i + 1}.</span>
              <input className={fieldCls} value={q} maxLength={300} aria-label={`question ${i + 1}`} placeholder={i === 0 ? "Why do you…?" : "What have you given up to…?"} onChange={(e) => set({ questions: t.questions.map((x, j) => (j === i ? e.target.value : x)) })} />
              <RowCtl rows={t.questions} i={i} onChange={(r) => set({ questions: r })} />
            </div>
          ))}
          {t.questions.length < 6 ? <button type="button" className={addBtn} onClick={() => set({ questions: [...t.questions, ""] })}>+ Question</button> : null}
        </div>
      </Cell>
    </>
  );
}

export function TropePreview({ name, t }: { name: string; t: TropeDraft }) {
  const groups = AGE_GROUPS[t.book].filter((a) => t.ages.includes(a.name) || t.ages.includes("Any"));
  const ride = rideOf(t);
  const qs = t.questions.map((q) => q.trim()).filter(Boolean);
  return (
    <Preview title={name || "Unnamed Trope"} subtitle={`${BOOK_LABEL[t.book]} Trope${t.ages.length ? " · " + t.ages.join(" / ") : ""}`}>
      <div className="mt-1 grid grid-cols-6 gap-1">
        {KOB_STATS.map((st) => (
          <div key={st} className={`rounded border px-0.5 py-1 text-center ${t.dice[st] === 20 ? "border-[var(--hb-accent)]" : t.dice[st] === 4 ? "border-[var(--bad)]" : "border-[var(--border)]"}`}>
            <div className="text-[8px] font-bold uppercase tracking-[0.06em] text-[var(--muted)]">{st}</div>
            <div className="font-mono text-[13px] font-bold">{t.dice[st] ? `d${t.dice[st]}` : "—"}</div>
          </div>
        ))}
      </div>
      {groups.length ? <p className="mt-2 text-[12px] text-[var(--muted)]">{groups.map((g) => `${g.name}: +1 ${g.stats.join(" & ")}, free ${g.free}`).join(" · ")}</p> : null}
      <p className="mt-2 text-[12px]"><b>Strengths:</b> {t.strengths.join(", ") || "—"}</p>
      <p className="mt-1 text-[12px]"><b className="text-[var(--bad)]">Flaws:</b> {t.flaws.join(", ") || "—"}</p>
      {ride ? <p className="mt-1 text-[12px]"><b>Bike:</b> {ride}</p> : null}
      {qs.length ? <ol className="mt-2 list-decimal pl-5 text-[12px]">{qs.map((q, i) => <li key={i}>{q}</li>)}</ol> : null}
    </Preview>
  );
}
