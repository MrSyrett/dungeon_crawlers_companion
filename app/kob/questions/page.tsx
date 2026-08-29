import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_QUESTIONS } from "@/lib/data/kob-questions";
import { KobHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, isBook, bookName, one, cardCls, type Query, type RawQuery } from "@/components/KobRef";

export const dynamic = "force-dynamic";
const BASE = "/kob/questions";
const KINDS = [
  { key: "positive", label: "Someone you know · positive" },
  { key: "negative", label: "Someone you know · negative" },
  { key: "unknown", label: "Someone you don't know" },
];

export default async function KobQuestionsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = isBook(one(raw.book)) ? one(raw.book) : "bikes";
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, kind };
  const results = KOB_QUESTIONS.filter((x) => x.book === book && (!kind || x.kind === kind) && (!needle || x.text.toLowerCase().includes(needle)));
  const groups = KINDS.filter((k) => results.some((x) => x.kind === k.key));

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <KobHeader title="Relationship Questions" subtitle={`${bookName(book)} · 60 questions`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        After introductions, pass the questions around the table. Quick start: one question about one character.
        One-sided: one question about each character. Complete: a positive and a negative about everyone you know,
        and one &ldquo;don&rsquo;t know&rdquo; question about everyone else. The sheet&rsquo;s Relationships block draws these at random.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search questions…" hidden={{ book, kind }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={results.length} noun="question" base={BASE} filtered={Boolean(needle || kind)} />
      {results.length === 0 ? <EmptyState noun="question" base={BASE} /> : (
        <div className="flex flex-col gap-4">
          {groups.map((g) => (
            <section key={g.key} className={cardCls}>
              <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{g.label}</h2>
              <ol className="mt-2 grid gap-x-6 gap-y-1 text-[13px] leading-relaxed text-[var(--text)] md:grid-cols-2">
                {results.filter((x) => x.kind === g.key).map((x) => <li key={x.n} className="flex gap-2"><span className="w-6 shrink-0 font-mono text-[var(--muted)]">{x.n}.</span><span>{x.text}</span></li>)}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
