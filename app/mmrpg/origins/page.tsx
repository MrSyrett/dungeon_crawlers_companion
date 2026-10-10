import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_ORIGINS } from "@/lib/data/mmrpg-origins";
import { MmrpgHeader, SearchForm, CountLine, EmptyState, RefDetails, cardCls, nameCls, one, type RawQuery } from "@/components/MmrpgRef";
import MmrpgRefTokens from "@/components/MmrpgRefTokens";
import InstantFilter from "@/components/InstantFilter";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/origins";

type Row = { name: string; description: string; tags?: string; traits?: string; powers?: string; occupation?: string; limitation?: string; examples?: string };

function Card({ o, hidden }: { o: Row; hidden: boolean }) {
  return (
    <article className={cardCls} hidden={hidden} data-f="{}" data-s={[o.tags, o.traits, o.powers].filter(Boolean).join(" ")}>
      <h3 className={nameCls}>{o.name}</h3>
      <dl className="mt-2 space-y-0.5 text-[11px] text-[var(--muted)]">
        {o.tags ? <div><span className="font-semibold text-[var(--text)]">Tags:</span> <MmrpgRefTokens text={o.tags} kind="tag" /></div> : null}
        {o.traits ? <div><span className="font-semibold text-[var(--text)]">Traits:</span> <MmrpgRefTokens text={o.traits} kind="trait" /></div> : null}
        {o.powers ? <div><span className="font-semibold text-[var(--text)]">Powers:</span> <MmrpgRefTokens text={o.powers} kind="power" /></div> : null}
        {o.occupation ? <div><span className="font-semibold text-[var(--text)]">Suggested occupation:</span> <MmrpgRefTokens text={o.occupation} kind="occupation" /></div> : null}
        {o.limitation ? <div><span className="font-semibold text-[var(--text)]">Limitation:</span> {o.limitation}</div> : null}
        {o.examples ? <div className="italic">e.g. {o.examples}</div> : null}
      </dl>
      {o.description ? <RefDetails><p className="text-[12px] leading-relaxed text-[var(--muted)]">{o.description}</p></RefDetails> : null}
    </article>
  );
}

export default async function MmrpgOriginsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();

  // Every origin is rendered; the search filters on the client (InstantFilter).
  const show = (o: Row) => !needle || [o.name, o.description, o.tags ?? "", o.traits ?? "", o.powers ?? ""].join(" ").toLowerCase().includes(needle);
  const shown = (MMRPG_ORIGINS as Row[]).filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Origins" subtitle={`${MMRPG_ORIGINS.length} origins`} />
      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search origins…" hidden={{}} />
      <CountLine count={shown} noun="origin" base={BASE} filtered={Boolean(needle)} />
      <EmptyState noun="origin" base={BASE} hidden={shown > 0} />
      <div className="grid gap-3 md:grid-cols-2">
        {(MMRPG_ORIGINS as Row[]).map((o) => <Card key={o.name} o={o} hidden={!show(o)} />)}
      </div>
      </InstantFilter>
    </div>
  );
}
