import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_STRENGTHS } from "@/lib/data/kob-strengths";
import { KOB_FLAWS } from "@/lib/data/kob-flaws";
import { KOB_BOOKS } from "@/lib/data/kob-books";
import { KobHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, isBook, bookName, one, nameCls, cardCls, bookBadge, type Query, type RawQuery } from "@/components/KobRef";

export const dynamic = "force-dynamic";
const BASE = "/kob/strengths";
const KINDS = [{ key: "strength", label: "Strengths" }, { key: "flaw", label: "Flaws" }];

export default async function KobStrengthsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = isBook(one(raw.book)) ? one(raw.book) : "";
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, kind };
  const strengths = kind === "flaw" ? [] : KOB_STRENGTHS.filter((s) => (!book || s.book === book) && (!needle || (s.name + " " + s.description).toLowerCase().includes(needle)));
  const flaws = kind === "strength" ? [] : KOB_FLAWS.filter((f) => (!book || f.book === book) && (!needle || (f.name + " " + (f.description ?? "")).toLowerCase().includes(needle)));
  const filtered = Boolean(needle || book || kind);
  const flawNames = [...new Set(flaws.map((f) => f.name))].sort();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <KobHeader title="Strengths & Flaws" subtitle={`${KOB_STRENGTHS.length} strengths · ${KOB_FLAWS.length} flaws`} />
      <p className="mb-3 text-sm leading-relaxed text-[var(--muted)]">
        Pick two Strengths (plus the one your age or grade gives you for free) and one Flaw. Strengths with an AT cost
        need Adversity Tokens to activate; failing a check because you acted on your Flaw earns an extra token.
      </p>
      <div className="mb-5 grid gap-2 md:grid-cols-3">
        {KOB_BOOKS.map((b) => (
          <div key={b.key} className={cardCls}>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{b.name}</div>
            <ul className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
              {b.ageGroups.map((a) => <li key={a.name}><span className="font-semibold text-[var(--text)]">{a.name}:</span> +1 {a.statBonus.join(" & ")} · {a.freeStrength}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <SearchForm base={BASE} q={q} placeholder="Search strengths and flaws…" hidden={{ book, kind }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Show" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={strengths.length + flaws.length} noun="entry" base={BASE} filtered={filtered} />
      {strengths.length + flaws.length === 0 ? <EmptyState noun="entry" base={BASE} /> : null}
      {strengths.length ? (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {strengths.map((s) => (
            <li key={`${s.book}-${s.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{s.name}</h2>
                <span className="font-mono text-[11px] text-[var(--muted)]">{s.cost}</span>
                <span className={bookBadge}>{bookName(s.book)} · p.{s.page}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.description}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {flaws.length ? (
        <section className={`${cardCls} mt-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">Flaws{book ? ` · ${bookName(book)}` : ""}</h2>
          <p className="mt-1 text-[12px] text-[var(--muted)]">Any Flaw is fair game as long as it won&rsquo;t spoil anyone else&rsquo;s fun; talk to the GM to invent your own.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {flawNames.map((n) => {
              const rows = flaws.filter((f) => f.name === n);
              const desc = rows.find((f) => f.description)?.description;
              return (
                <li key={n} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5 text-[13px] text-[var(--text)]" title={desc ?? ""}>
                  {n}{!book ? <span className="ml-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{rows.map((r) => bookName(r.book).replace("Kids ", "").replace("on ", "").replace("in ", "")).join(" · ")}</span> : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
