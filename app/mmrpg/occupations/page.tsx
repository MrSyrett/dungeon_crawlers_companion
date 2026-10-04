import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_OCCUPATIONS } from "@/lib/data/mmrpg-occupations";
import { MmrpgHeader, SearchForm, CountLine, EmptyState, RefDetails, cardCls, nameCls, one, type RawQuery } from "@/components/MmrpgRef";
import MmrpgRefTokens from "@/components/MmrpgRefTokens";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/occupations";

type Row = { name: string; description: string; tags?: string; traits?: string; examples?: string };

function Card({ o, hidden, dataF }: { o: Row; hidden?: boolean; dataF?: string }) {
  return (
    <article className={cardCls} hidden={hidden} data-f={dataF}>
      <h3 className={nameCls}>{o.name}</h3>
      <dl className="mt-2 space-y-0.5 text-[11px] text-[var(--muted)]">
        {o.tags ? <div><span className="font-semibold text-[var(--text)]">Tags:</span> <MmrpgRefTokens text={o.tags} kind="tag" /></div> : null}
        {o.traits ? <div><span className="font-semibold text-[var(--text)]">Traits:</span> <MmrpgRefTokens text={o.traits} kind="trait" /></div> : null}
        {o.examples ? <div className="italic">e.g. {o.examples}</div> : null}
      </dl>
      {o.description ? <RefDetails><p className="text-[12px] leading-relaxed text-[var(--muted)]">{o.description}</p></RefDetails> : null}
    </article>
  );
}

export default async function MmrpgOccupationsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();

  // Every occupation is rendered; the search box filters on the client (InstantFilter).
  // `show` applies the URL's `q` for the initial paint, through the same predicate.
  const occupations = MMRPG_OCCUPATIONS as Row[];
  const current = { q };
  const facets = () => ({});
  const show = (o: Row) => facetMatch(facets(), current) && (!needle || [o.name, o.description, o.tags ?? "", o.traits ?? ""].join(" ").toLowerCase().includes(needle));
  const shown = occupations.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Occupations" subtitle={`${MMRPG_OCCUPATIONS.length} occupations`} />
      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search occupations…" hidden={{}} />
      <CountLine count={shown} noun="occupation" base={BASE} filtered={Boolean(needle)} />
      <EmptyState noun="occupation" base={BASE} hidden={shown > 0} />
      <div className="grid gap-3 md:grid-cols-2">
        {occupations.map((o) => <Card key={o.name} o={o} hidden={!show(o)} dataF={facetAttr(facets())} />)}
      </div>
      </InstantFilter>
    </div>
  );
}
