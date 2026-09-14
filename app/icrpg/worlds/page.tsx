import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_WORLDS } from "@/lib/data/icrpg-worlds";
import { ICRPG_LIFEFORMS } from "@/lib/data/icrpg-lifeforms";
import {
  IcrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge,
  WORLDS, worldName, one, type Query, type RawQuery,
} from "@/components/IcrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/worlds";

export default async function IcrpgWorldsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const world = WORLDS.some((w) => w.key === one(raw.world)) ? one(raw.world) : "";
  const current: Query = { q, world };

  const worlds = ICRPG_WORLDS.filter((w) =>
    (!world || w.key === world) &&
    (!needle || [w.name, w.blurb, w.era].join(" ").toLowerCase().includes(needle)),
  );
  const lifeforms = ICRPG_LIFEFORMS.filter((lf) =>
    (!world || (lf.world || "core") === world) &&
    (!needle || [lf.name, lf.desc, lf.statBonus ?? ""].join(" ").toLowerCase().includes(needle)),
  ).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const total = worlds.length + lifeforms.length;
  const filtered = Boolean(needle || world);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Worlds" subtitle={`${ICRPG_WORLDS.length} settings · ${ICRPG_LIFEFORMS.length} life forms`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">ICRPG ships five ready worlds, each with its own life forms and tone. Pick one — or reskin the mechanics into your own. Filter by World to see what fits a setting.</p>

      <SearchForm base={BASE} q={q} placeholder="Search worlds &amp; life forms…" hidden={{ world }} />
      <ChipRow label="World" base={BASE} current={current} param="world" options={WORLDS} active={world} />
      <CountLine count={total} noun="entry" base={BASE} filtered={filtered} />

      {total === 0 ? (
        <EmptyState noun="entry" base={BASE} />
      ) : (
        <>
          {worlds.length ? (
            <section className="mb-8">
              <SectionH>Settings</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {worlds.map((w) => (
                  <li key={w.key} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{w.name}</h3>
                      {w.era ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{w.era}</span> : null}
                    </div>
                    {w.blurb ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{w.blurb}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {lifeforms.length ? (
            <section>
              <SectionH>Life Forms</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {lifeforms.map((lf) => (
                  <li key={`${lf.world}-${lf.name}`} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{lf.name}</h3>
                      {(lf.world && lf.world !== "core") ? <span className={badge}>{worldName(lf.world)}</span> : null}
                      {lf.statBonus ? <span className="font-mono text-[11px] text-[#e8823c]">{lf.statBonus}</span> : null}
                    </div>
                    {lf.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{lf.desc}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
