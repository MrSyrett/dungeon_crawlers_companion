import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_OCCUPATIONS } from "@/lib/data/mmrpg-occupations";
import { MmrpgHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, one, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/occupations";

export default async function MmrpgOccupationsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = MMRPG_OCCUPATIONS.filter((o) => !needle || [o.name, o.description, o.tags ?? "", o.traits ?? ""].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Occupations" subtitle={`${MMRPG_OCCUPATIONS.length} occupations`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Your occupation is what you do with your time. Each grants a free package of traits and tags. You start with one occupation and can pick up more in play.</p>
      <SearchForm base={BASE} q={q} placeholder="Search occupations…" hidden={{}} />
      <CountLine count={results.length} noun="occupation" base={BASE} filtered={Boolean(needle)} />
      {results.length === 0 ? <EmptyState noun="occupation" base={BASE} /> : null}
      <div className="grid gap-3 md:grid-cols-2">
        {results.map((o) => (
          <article key={o.name} className={cardCls}>
            <h3 className={nameCls}>{o.name}</h3>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{o.description}</p>
            <dl className="mt-2 space-y-0.5 text-[11px] text-[var(--muted)]">
              {o.tags ? <div><span className="font-semibold text-[var(--text)]">Tags:</span> {o.tags}</div> : null}
              {o.traits ? <div><span className="font-semibold text-[var(--text)]">Traits:</span> {o.traits}</div> : null}
              {o.examples ? <div className="italic">e.g. {o.examples}</div> : null}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
