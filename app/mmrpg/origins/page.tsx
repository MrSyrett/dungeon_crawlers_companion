import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_ORIGINS } from "@/lib/data/mmrpg-origins";
import { MmrpgHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, one, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/origins";

export default async function MmrpgOriginsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = MMRPG_ORIGINS.filter((o) => !needle || [o.name, o.description, o.tags ?? "", o.traits ?? "", o.powers ?? ""].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Origins" subtitle={`${MMRPG_ORIGINS.length} origins`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Your origin explains where your powers come from. Each comes with a package of tags and traits (and sometimes powers, which must be picked first) plus a suggested occupation.</p>
      <SearchForm base={BASE} q={q} placeholder="Search origins…" hidden={{}} />
      <CountLine count={results.length} noun="origin" base={BASE} filtered={Boolean(needle)} />
      {results.length === 0 ? <EmptyState noun="origin" base={BASE} /> : null}
      <div className="grid gap-3 md:grid-cols-2">
        {results.map((o) => (
          <article key={o.name} className={cardCls}>
            <h3 className={nameCls}>{o.name}</h3>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{o.description}</p>
            <dl className="mt-2 space-y-0.5 text-[11px] text-[var(--muted)]">
              {o.tags ? <div><span className="font-semibold text-[var(--text)]">Tags:</span> {o.tags}</div> : null}
              {o.traits ? <div><span className="font-semibold text-[var(--text)]">Traits:</span> {o.traits}</div> : null}
              {o.powers ? <div><span className="font-semibold text-[var(--text)]">Powers:</span> {o.powers}</div> : null}
              {o.occupation ? <div><span className="font-semibold text-[var(--text)]">Suggested occupation:</span> {o.occupation}</div> : null}
              {o.limitation ? <div><span className="font-semibold text-[var(--text)]">Limitation:</span> {o.limitation}</div> : null}
              {o.examples ? <div className="italic">e.g. {o.examples}</div> : null}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
