import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_OCCUPATIONS } from "@/lib/data/mmrpg-occupations";
import { MmrpgHeader, SearchForm, CountLine, EmptyState, RefDetails, cardCls, nameCls, one, type RawQuery } from "@/components/MmrpgRef";
import MmrpgRefTokens from "@/components/MmrpgRefTokens";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/occupations";

type Row = { name: string; description: string; tags?: string; traits?: string; examples?: string };

function Card({ o }: { o: Row }) {
  return (
    <article className={cardCls}>
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

  const occupations = (MMRPG_OCCUPATIONS as Row[]).filter((o) => !needle || [o.name, o.description, o.tags ?? "", o.traits ?? ""].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Occupations" subtitle={`${MMRPG_OCCUPATIONS.length} occupations`} />
      <SearchForm base={BASE} q={q} placeholder="Search occupations…" hidden={{}} />
      <CountLine count={occupations.length} noun="occupation" base={BASE} filtered={Boolean(needle)} />
      {occupations.length === 0 ? <EmptyState noun="occupation" base={BASE} /> : (
        <div className="grid gap-3 md:grid-cols-2">
          {occupations.map((o) => <Card key={o.name} o={o} />)}
        </div>
      )}
    </div>
  );
}
