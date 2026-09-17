import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_ORIGINS } from "@/lib/data/mmrpg-origins";
import { MMRPG_OCCUPATIONS } from "@/lib/data/mmrpg-occupations";
import { MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, one, type Query, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/origins";

type Row = { name: string; description: string; tags?: string; traits?: string; powers?: string; occupation?: string; limitation?: string; examples?: string };

function Card({ o, kind }: { o: Row; kind: "origin" | "occupation" }) {
  return (
    <article className={cardCls}>
      <h3 className={nameCls}>{o.name}</h3>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{o.description}</p>
      <dl className="mt-2 space-y-0.5 text-[11px] text-[var(--muted)]">
        {o.tags ? <div><span className="font-semibold text-[var(--text)]">Tags:</span> {o.tags}</div> : null}
        {o.traits ? <div><span className="font-semibold text-[var(--text)]">Traits:</span> {o.traits}</div> : null}
        {kind === "origin" && o.powers ? <div><span className="font-semibold text-[var(--text)]">Powers:</span> {o.powers}</div> : null}
        {kind === "origin" && o.occupation ? <div><span className="font-semibold text-[var(--text)]">Suggested occupation:</span> {o.occupation}</div> : null}
        {kind === "origin" && o.limitation ? <div><span className="font-semibold text-[var(--text)]">Limitation:</span> {o.limitation}</div> : null}
        {o.examples ? <div className="italic">e.g. {o.examples}</div> : null}
      </dl>
    </article>
  );
}

export default async function MmrpgBackgroundsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const show = ["origins", "occupations"].includes(one(raw.show)) ? one(raw.show) : "";
  const current: Query = { q, show };

  const origins = (MMRPG_ORIGINS as Row[]).filter((o) => !needle || [o.name, o.description, o.tags ?? "", o.traits ?? "", o.powers ?? ""].join(" ").toLowerCase().includes(needle));
  const occupations = (MMRPG_OCCUPATIONS as Row[]).filter((o) => !needle || [o.name, o.description, o.tags ?? "", o.traits ?? ""].join(" ").toLowerCase().includes(needle));
  const total = (show !== "occupations" ? origins.length : 0) + (show !== "origins" ? occupations.length : 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Origins & Occupations" subtitle={`${MMRPG_ORIGINS.length} origins · ${MMRPG_OCCUPATIONS.length} occupations`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Your <b>origin</b> explains where your powers come from; your <b>occupation</b> is what you do with your time. Each grants a free package of tags and traits (origins can also grant powers, which must be picked first).</p>
      <SearchForm base={BASE} q={q} placeholder="Search origins & occupations…" hidden={{ show }} />
      <ChipRow label="Show" base={BASE} current={current} param="show" options={[{ key: "origins", label: "Origins" }, { key: "occupations", label: "Occupations" }]} active={show} />
      <CountLine count={total} noun="entry" base={BASE} filtered={Boolean(needle || show)} />
      {total === 0 ? <EmptyState noun="entry" base={BASE} /> : null}

      {show !== "occupations" && origins.length ? (
        <section className={`${cardCls} mb-4`}>
          <SectionH>Origins</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {origins.map((o) => <Card key={o.name} o={o} kind="origin" />)}
          </div>
        </section>
      ) : null}

      {show !== "origins" && occupations.length ? (
        <section className={`${cardCls} mb-4`}>
          <SectionH>Occupations</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {occupations.map((o) => <Card key={o.name} o={o} kind="occupation" />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
