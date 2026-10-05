import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_WORLDS } from "@/lib/data/icrpg-worlds";
import { ICRPG_LIFEFORMS } from "@/lib/data/icrpg-lifeforms";
import {
  IcrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge,
  WORLDS, worldName, one, type Query, type RawQuery,
} from "@/components/IcrpgRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/worlds";

export default async function IcrpgWorldsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const world = WORLDS.some((w) => w.key === one(raw.world)) ? one(raw.world) : "";
  const current: Query = { q, world };

  // Every setting and life form is rendered; the World chip and the search
  // filter on the client (InstantFilter). `show*` applies the URL's filters for
  // the initial paint, through the same facet match the client uses.
  const worlds = ICRPG_WORLDS;
  const lifeforms = ICRPG_LIFEFORMS.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
  const worldFacets = (w: (typeof ICRPG_WORLDS)[number]) => ({ world: w.key });
  const lifeFacets = (lf: (typeof ICRPG_LIFEFORMS)[number]) => ({ world: lf.world || "core" });
  const showWorld = (w: (typeof ICRPG_WORLDS)[number]) => facetMatch(worldFacets(w), current) && (!needle || [w.name, w.blurb, w.era].join(" ").toLowerCase().includes(needle));
  const showLife = (lf: (typeof ICRPG_LIFEFORMS)[number]) => facetMatch(lifeFacets(lf), current) && (!needle || [lf.name, lf.desc, lf.statBonus ?? ""].join(" ").toLowerCase().includes(needle));
  const shown = worlds.filter(showWorld).length + lifeforms.filter(showLife).length;
  const filtered = Boolean(needle || world);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Worlds" subtitle={`${ICRPG_WORLDS.length} settings · ${ICRPG_LIFEFORMS.length} life forms`} />

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search worlds &amp; life forms…" hidden={{ world }} />
      <ChipRow label="World" base={BASE} current={current} param="world" options={WORLDS} active={world} />
      <CountLine count={shown} noun="entry" base={BASE} filtered={filtered} />

      <EmptyState noun="entry" base={BASE} hidden={shown > 0} />
      <>
        <section className="mb-8" data-section hidden={!worlds.some(showWorld)}>
          <SectionH>Settings</SectionH>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {worlds.map((w) => (
              <li key={w.key} className={cardCls} hidden={!showWorld(w)} data-f={facetAttr(worldFacets(w))}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{w.name}</h3>
                  {w.era ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{w.era}</span> : null}
                </div>
                {w.blurb ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{w.blurb}</p> : null}
              </li>
            ))}
          </ul>
        </section>
        <section data-section hidden={!lifeforms.some(showLife)}>
          <SectionH>Life Forms</SectionH>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {lifeforms.map((lf) => (
              <li key={`${lf.world}-${lf.name}`} className={cardCls} hidden={!showLife(lf)} data-f={facetAttr(lifeFacets(lf))}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{lf.name}</h3>
                  {(lf.world && lf.world !== "core") ? <span className={badge}>{worldName(lf.world)}</span> : null}
                  {lf.statBonus ? <span className="font-mono text-[11px] text-[var(--sys-link)]">{lf.statBonus}</span> : null}
                </div>
                {lf.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{lf.desc}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      </>
      </InstantFilter>
    </div>
  );
}
