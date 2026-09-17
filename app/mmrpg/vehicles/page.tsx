import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_VEHICLES } from "@/lib/data/mmrpg-vehicles";
import type { MmrpgVehicle } from "@/lib/data/mmrpg-types";
import { MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, one, type Query, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/vehicles";
const TIERS = ["Named", "Basic"];
const tierOf = (v: MmrpgVehicle) => v.tier || "Named";

export default async function MmrpgVehiclesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const ALL = MMRPG_VEHICLES as MmrpgVehicle[];
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const tier = TIERS.includes(one(raw.tier)) ? one(raw.tier) : "";
  const current: Query = { q, tier };

  const results = ALL.filter((v) =>
    (!tier || tierOf(v) === tier) &&
    (!needle || [v.name, v.size ?? "", v.speed ?? "", v.powers ?? "", v.weapons ?? "", v.notes ?? "", v.description ?? "", v.source ?? ""].join(" ").toLowerCase().includes(needle)),
  );
  const groups = TIERS.filter((t) => results.some((v) => tierOf(v) === t));
  const stat = (label: string, val?: string) =>
    val ? <span><span className="font-semibold text-[var(--text)]">{label}:</span> {val}</span> : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Vehicles" subtitle={`${ALL.length} vehicles`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Vehicles carry characters into (and out of) the action. <b>Named</b> vehicles are specific rides — the Blackbird, the Quinjet, the Helicarrier — with their own Health, Damage Reduction, speed, size, passenger capacity, onboard powers and weapons. <b>Basic</b> vehicles are the generic stat lines (car, plane, boat&hellip;) you can drop in anywhere. A vehicle&rsquo;s speed uses its listed movement mode; when it takes enough damage it&rsquo;s destroyed and any occupants are subject to the crash rules.</p>
      <SearchForm base={BASE} q={q} placeholder="Search vehicles…" hidden={{ tier }} />
      <ChipRow label="Type" base={BASE} current={current} param="tier" options={TIERS.map((t) => ({ key: t, label: t }))} active={tier} />
      <CountLine count={results.length} noun="vehicle" base={BASE} filtered={Boolean(needle || tier)} />
      {results.length === 0 ? <EmptyState noun="vehicle" base={BASE} /> : null}

      {groups.map((t) => (
        <section key={t} className={`${cardCls} mb-4`}>
          <SectionH>{t === "Named" ? "Named Vehicles" : "Basic Vehicles"}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((v) => tierOf(v) === t).map((v) => (
              <article key={`${v.source}-${v.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{v.name}</h3>
                  <span className="flex items-center gap-1.5">
                    {v.health ? <span className={badge}>HP {v.health}</span> : null}
                    {v.damageReduction && v.damageReduction !== "—" ? <span className={badge}>DR {v.damageReduction}</span> : null}
                  </span>
                </div>
                <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                  {stat("Speed", v.speed)}
                  {stat("Size", v.size)}
                  {stat("Passengers", v.passengers)}
                </p>
                {v.description ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{v.description}</p> : null}
                {v.powers ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Powers:</span> {v.powers}</p> : null}
                {v.weapons ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Weapons:</span> {v.weapons}</p> : null}
                {v.notes ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Notes:</span> {v.notes}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
