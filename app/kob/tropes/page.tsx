import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_TROPES } from "@/lib/data/kob-tropes";
import { KOB_STATS, type KobTrope, type KobBook, type KobDie, type KobStat } from "@/lib/data/kob-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { KobHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, isBook, bookName, one, nameCls, cardCls, bookBadge, hbBadge, type Query, type RawQuery } from "@/components/KobRef";

export const dynamic = "force-dynamic";
const BASE = "/kob/tropes";

type Row = KobTrope & { homebrew?: boolean };

const KOB_DIE_VALUES: KobDie[] = [4, 6, 8, 10, 12, 20];

// A homebrew record's data blob → a KobTrope-shaped display row.
function hbToTrope(data: Record<string, unknown>, name: string): Row {
  const strArr = (k: string) => (Array.isArray(data[k]) ? (data[k] as unknown[]).filter((x): x is string => typeof x === "string") : []);
  const rawDice = (data.dice && typeof data.dice === "object" ? data.dice : {}) as Record<string, unknown>;
  const dice = {} as Record<KobStat, KobDie>;
  for (const st of KOB_STATS) {
    const v = rawDice[st];
    dice[st] = typeof v === "number" && (KOB_DIE_VALUES as number[]).includes(v) ? (v as KobDie) : 6;
  }
  const row: Row = {
    name,
    book: (isBook(typeof data.book === "string" ? data.book : "") ? (data.book as KobBook) : "bikes"),
    dice,
    ages: strArr("ages"),
    suggestedStrengths: strArr("suggestedStrengths"),
    suggestedFlaws: strArr("suggestedFlaws"),
    questions: strArr("questions"),
    page: 0,
    homebrew: true,
  };
  if (typeof data.suggestedRide === "string") row.suggestedRide = data.suggestedRide;
  return row;
}

function matches(t: Row, q: string, book: string, age: string): boolean {
  if (book && t.book !== book) return false;
  if (age && !t.ages.includes(age) && !t.ages.includes("Any")) return false;
  if (!q) return true;
  return [t.name, ...t.suggestedStrengths, ...t.suggestedFlaws, ...t.questions].join(" ").toLowerCase().includes(q);
}

export default async function KobTropesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "kob-trope" }),
    ownHomebrew(user.id, "kob-trope"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToTrope(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...KOB_TROPES.map((t) => ({ ...t }))];
  const AGES = [...new Set(ALL.flatMap((t) => t.ages))].map((a) => ({ key: a, label: a }));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = isBook(one(raw.book)) ? one(raw.book) : "";
  const age = AGES.some((a) => a.key === one(raw.age)) ? one(raw.age) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, age };
  const results = ALL.filter((t) => matches(t, needle, book, age));
  const filtered = Boolean(needle || book || age);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <KobHeader title="Tropes" subtitle={`${KOB_TROPES.length} tropes across three books${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        A Trope is a touchstone, not a stereotype: it sets your six stat dice (one each of d20, d12, d10, d8, d6, d4),
        suggests Strengths and Flaws, and asks two questions that flesh out who you are. Don&rsquo;t like any? Build
        from scratch instead.
      </p>
      <div className="mb-6">
        <HomebrewEditor kind="kob-trope" campaigns={campaigns} initial={hbOwn} />
      </div>
      <SearchForm base={BASE} q={q} placeholder="Search tropes, strengths, flaws…" hidden={{ book, age }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Age / grade" base={BASE} current={current} param="age" options={AGES.filter((a) => a.key !== "Any")} active={age} />
      <CountLine count={results.length} noun="trope" base={BASE} filtered={filtered} />
      {results.length === 0 ? (
        <EmptyState noun="trope" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((t) => (
            <li key={`${t.homebrew ? "hb" : "bk"}-${t.book}-${t.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{t.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.ages.join(" / ")}</span>
                {t.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={bookBadge}>{bookName(t.book)} · p.{t.page}</span>}
              </div>
              <div className="mt-2 grid grid-cols-6 gap-1">
                {KOB_STATS.map((s) => (
                  <div key={s} className={`rounded border px-1 py-1 text-center ${t.dice[s] === 20 ? "border-[var(--kob)] bg-[var(--panel-2)]" : t.dice[s] === 4 ? "border-[var(--red)] bg-[var(--panel-2)]" : "border-[var(--border)]"}`}>
                    <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{s}</div>
                    <div className="font-mono text-sm font-bold text-[var(--text)]">d{t.dice[s]}</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Strengths:</span> {t.suggestedStrengths.join(", ")}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[#f0a8a3]">Flaws:</span> {t.suggestedFlaws.join(", ")}</p>
              {t.suggestedRide ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Bike:</span> {t.suggestedRide}</p> : null}
              <ol className="mt-2 list-decimal pl-5 text-[12px] leading-relaxed text-[var(--text)]">
                {t.questions.map((qq, i) => <li key={i}>{qq}</li>)}
              </ol>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
