import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_SPECIES, DS_TECH_SPECIES, DS_HUMAN_NOTE } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DarkSpaceNav, SearchForm, CountLine, EmptyState, cardCls, nameCls, badge, one, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/species";

export default async function DarkSpaceSpeciesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const species = DS_SPECIES.filter((s) => !needle || (s.name + " " + s.text).toLowerCase().includes(needle));
  const tech = DS_TECH_SPECIES.filter((s) => !needle || (s.name + " " + s.text).toLowerCase().includes(needle));
  const total = species.length + tech.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Species" subtitle={`${DS_SPECIES.length} species traits · ${DS_TECH_SPECIES.length} tech species`} />
      <DarkSpaceNav active="Species" />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        Roll a d20 or choose a Species Trait. Humans (or human analogues) get the <span className="font-semibold text-[var(--text)]">Ambitious</span> trait instead: {DS_HUMAN_NOTE} You can also use any Shadowdark ancestry.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search species…" />
      <CountLine count={total} noun="species" base={BASE} filtered={Boolean(needle)} />
      {total === 0 ? <EmptyState noun="species" base={BASE} /> : null}

      {species.length ? (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {species.map((s) => (
            <li key={s.n} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{s.name}</h2>
                <span className={badge}>d20: {s.n}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.text}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {tech.length ? (
        <section className="mt-6">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Tech Species</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {tech.map((s) => (
              <li key={s.name} className={cardCls}>
                <h3 className={nameCls}>{s.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
