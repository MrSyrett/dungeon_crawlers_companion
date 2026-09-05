import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_PERKS } from "@/lib/data/d62e-perks";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge,
  genreBadge, genreName, one, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/perks";

const KINDS = [
  { key: "perk", label: "Perks" },
  { key: "flaw", label: "Flaws" },
  { key: "talent", label: "Talents" },
  { key: "trouble", label: "Troubles" },
  { key: "asset", label: "Assets" },
];
const KIND_HEADING: Record<string, string> = { perk: "Perks", flaw: "Flaws", talent: "Talents", trouble: "Troubles", asset: "Assets" };
const KIND_INTRO: Record<string, string> = {
  perk: "Advantages bought with character points (or die-code reductions), representing edges, connections, and boons.",
  flaw: "Drawbacks taken for extra dice or points; the more disruptive the flaw, the greater the return.",
  talent: "Special knacks and trained abilities a character can learn, each with a point cost.",
  trouble: "Complications and recurring difficulties that shape a character’s story.",
  asset: "Resources, gear, and holdings a character owns or can call upon.",
};

export default async function D62ePerksPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const results = D62E_PERKS.filter((p) =>
    (!kind || p.kind === kind) &&
    (!needle || [p.name, p.kind, p.description, p.cost ?? ""].join(" ").toLowerCase().includes(needle)),
  );
  const groups = KINDS.map((k) => k.key).filter((k) => results.some((p) => p.kind === k));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Perks, Flaws & Talents" subtitle={`${D62E_PERKS.length} perks, flaws, talents & more`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Perks and talents are bought with points or die-code reductions; flaws and troubles give points (or dice) back in exchange for taking on a drawback. Each entry lists its cost — a positive value spends, a &ldquo;+&rdquo; value returns.</p>

      <SearchForm base={BASE} q={q} placeholder="Search perks, flaws & talents…" hidden={{ kind }} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={results.length} noun="entry" base={BASE} filtered={Boolean(needle || kind)} />

      {results.length === 0 ? <EmptyState noun="entry" base={BASE} /> : null}
      {groups.map((k) => (
        <section key={k} className={`${cardCls} mb-4`}>
          <SectionH>{KIND_HEADING[k]}</SectionH>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{KIND_INTRO[k]}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((p) => p.kind === k).map((p) => (
              <article key={p.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{p.name}</h3>
                  {p.cost ? <span className={badge}>{p.cost}</span> : null}
                  {p.genre !== "core" ? <span className={genreBadge}>{genreName(p.genre)}</span> : null}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{p.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
