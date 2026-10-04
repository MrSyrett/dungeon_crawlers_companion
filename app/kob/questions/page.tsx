import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_QUESTIONS } from "@/lib/data/kob-questions";
import { KobHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, isBook, bookName, one, cardCls, chipBase, chipOn, chipOff, withParams, type Query, type RawQuery } from "@/components/KobRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/kob/questions";
const KINDS = [
  { key: "positive", label: "Someone you know · positive" },
  { key: "negative", label: "Someone you know · negative" },
  { key: "unknown", label: "Someone you don't know" },
];

type QRow = (typeof KOB_QUESTIONS)[number];

// The Book row is NOT a filter: a book is its own set of 60 questions (the page
// header names it, and `book` has no "all" state — it defaults to bikes), so it
// stays a real navigation: <Link>s with no data-chip, filtered on the server.
function BookRow({ current, active }: { current: Query; active: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Book</span>
      {BOOKS.map((b) => (
        <Link key={b.key} href={withParams(BASE, current, { book: b.key })} aria-pressed={active === b.key} className={`${chipBase} ${active === b.key ? chipOn : chipOff}`}>{b.label}</Link>
      ))}
    </div>
  );
}

export default async function KobQuestionsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = isBook(one(raw.book)) ? one(raw.book) : "bikes";
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, kind };   // every param — for the server-rendered hrefs
  // Every question of this book is rendered; the Kind chips and the search box
  // filter on the client (InstantFilter). `show` applies the URL's filters for
  // the initial paint, through the same facet match the client uses. `book` is
  // not one of them (see BookRow), so it stays a server-side filter.
  const results = KOB_QUESTIONS.filter((x) => x.book === book);
  const state = { q, kind };
  const facets = (x: QRow) => ({ kind: x.kind });
  const show = (x: QRow) => facetMatch(facets(x), state) && (!needle || x.text.toLowerCase().includes(needle));
  const shown = results.filter(show).length;
  const groups = KINDS.filter((k) => results.some((x) => x.kind === k.key));

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <KobHeader title="Relationship Questions" subtitle={`${bookName(book)} · 60 questions`} />
      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search questions…" hidden={{ book, kind }} />
      <BookRow current={current} active={book} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={shown} noun="question" base={BASE} filtered={Boolean(needle || kind)} />
      <EmptyState noun="question" base={BASE} hidden={shown > 0} />
      <div className="flex flex-col gap-4">
        {groups.map((g) => (
          <section key={g.key} className={cardCls} data-section hidden={!results.some((x) => x.kind === g.key && show(x))}>
            <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{g.label}</h2>
            <ol className="mt-2 grid gap-x-6 gap-y-1 text-[13px] leading-relaxed text-[var(--text)] md:grid-cols-2">
              {/* `[&[hidden]]:hidden` so the `flex` display utility can't out-rank [hidden] */}
              {results.filter((x) => x.kind === g.key).map((x) => <li key={x.n} className="flex gap-2 [&[hidden]]:hidden" hidden={!show(x)} data-f={facetAttr(facets(x))}><span className="w-6 shrink-0 font-mono text-[var(--muted)]">{x.n}.</span><span>{x.text}</span></li>)}
            </ol>
          </section>
        ))}
      </div>
      </InstantFilter>
    </div>
  );
}
