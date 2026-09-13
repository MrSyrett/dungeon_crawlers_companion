import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_ARCHETYPES } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DarkSpaceNav, SearchForm, CountLine, EmptyState, cardCls, nameCls, badge, DataTable, one, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/archetypes";

export default async function DarkSpaceArchetypesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const rows = DS_ARCHETYPES.filter((a) => !needle ||
    [a.name, a.blurb, a.weapons, a.armor, ...a.features.map((f) => f.name + " " + f.text), ...a.talents.map((t) => t.text)].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Archetypes" subtitle={`${DS_ARCHETYPES.length} archetypes`} />
      <DarkSpaceNav active="Archetypes" />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        Archetypes replace classes. Each sets your prime stat, hit die, and weapon/armor training, grants features, and has its own 2d6 talent table (rolled at 1st level and every odd level).
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search archetypes…" />
      <CountLine count={rows.length} noun="archetype" base={BASE} filtered={Boolean(needle)} />
      {rows.length === 0 ? <EmptyState noun="archetype" base={BASE} /> : null}

      <div className="flex flex-col gap-4">
        {rows.map((a) => (
          <section key={a.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className={nameCls}>{a.name}</h2>
              <span className={badge}>{a.stat} · d{a.hitDie}</span>
            </div>
            <p className="mt-2 text-[13px] italic leading-relaxed text-[var(--muted)]">{a.blurb}</p>
            <p className="mt-2 text-[12px] text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Weapons:</span> {a.weapons} &nbsp;·&nbsp; <span className="font-semibold text-[#8fd6ea]">Armor:</span> {a.armor}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {a.features.map((f) => (
                <p key={f.name} className="text-[13px] leading-relaxed text-[var(--text)]"><span className="font-semibold">{f.name}.</span> {f.text}</p>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">{a.name} Talents (2d6)</h3>
              <DataTable head={["2d6", "Talent"]} rows={a.talents.map((t) => [t.r, t.text])} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
