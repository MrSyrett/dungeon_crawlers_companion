import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_VEHICLES } from "@/lib/data/sw-vehicles";
import { SW_TABLES } from "@/lib/data/sw-tables";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, one, BookTag, BOOK_NAME, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/starships";
const KINDS = [...new Set(SW_VEHICLES.map((v) => v.kind))].map((k) => ({ key: k, label: k }));

function Stat({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{label}</div><div className="font-mono text-[12px] text-[#f0c020]">{value}</div></div>;
}

export default async function SwStarshipsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const results = SW_VEHICLES.filter((v) => (!kind || v.kind === kind) && (!needle || [v.name, v.kind, v.craft ?? "", v.description ?? "", v.weapons.map((w) => w.name).join(" ")].join(" ").toLowerCase().includes(needle)));
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <SwHeader title="Starships & Vehicles" subtitle={`${SW_VEHICLES.length} stat blocks · starfighters, transports, capital ships, speeders, walkers`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Space speed and maneuverability are die codes; hull is rolled against damage like a character&rsquo;s Strength. Capital-scale weapons add dice against starfighters — see the scale rules under Rules.</p>
      <details className="mb-5 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#f0c020]">Starship combat reference ({SW_TABLES.starship.length})</summary><dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">{SW_TABLES.starship.map((r) => <div key={r.name}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}</dl></details>
      <SearchForm base={BASE} q={q} placeholder="Search ships…" hidden={{ kind }} />
      <ChipRow label="Type" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={results.length} noun="ship" base={BASE} filtered={Boolean(needle || kind)} />
      {results.length === 0 ? <EmptyState noun="ship" base={BASE} /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((v) => (
            <article key={v.name + v.book} className={cardCls}>
              <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className={nameCls}>{v.name}<BookTag book={v.book} /></h2><span className={badge}>{v.kind} · p.{v.page}</span></div>
              {v.craft ? <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{v.craft}{v.scale ? ` · ${v.scale} scale` : ""}</p> : null}
              <div className="mt-3 flex flex-wrap gap-1.5"><Stat label="Speed" value={v.speed} /><Stat label="Maneuver" value={v.maneuverability} /><Stat label="Hull" value={v.hull} /><Stat label="Shields" value={v.shields} /><Stat label="Hyperdrive" value={v.hyperdrive} /><Stat label="Atmosphere" value={v.atmosphere} /><Stat label="Sensors" value={v.sensors} /></div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{[v.crew && `Crew ${v.crew}`, v.passengers && `passengers ${v.passengers}`, v.cargo && `cargo ${v.cargo}`, v.consumables && `consumables ${v.consumables}`, v.nav && `nav ${v.nav}`, v.cost && `cost ${v.cost}`].filter(Boolean).join(" · ")}</p>
              {v.weapons.length ? <table className="mt-2 w-full text-[12px]"><thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-2">Weapon</th><th className="py-1 pr-2">Fire control</th><th className="py-1 pr-2">Damage</th><th className="py-1">Notes</th></tr></thead><tbody>{v.weapons.map((w, i) => <tr key={i} className="border-t border-[var(--border)] align-top"><td className="py-1 pr-2 text-[var(--text)]">{[w.count, w.name].filter(Boolean).join(" ")}</td><td className="py-1 pr-2 font-mono text-[#f0c020]">{w.fireControl ?? ""}</td><td className="py-1 pr-2 font-mono text-[#f0c020]">{w.damage ?? ""}</td><td className="py-1 text-[var(--muted)]">{[w.range, w.notes].filter(Boolean).join(" · ")}</td></tr>)}</tbody></table> : null}
              {v.description ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{v.description}</p> : null}
              {v.superseded ? <details className="mt-2"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">{BOOK_NAME[v.superseded.book]} version (p.{v.superseded.page})</summary><p className="mt-1 font-mono text-[11px] text-[var(--muted)]">{[v.superseded.speed && `speed ${v.superseded.speed}`, v.superseded.maneuverability && `maneuver ${v.superseded.maneuverability}`, v.superseded.hull && `hull ${v.superseded.hull}`, v.superseded.shields && `shields ${v.superseded.shields}`, v.superseded.hyperdrive && `hyperdrive ${v.superseded.hyperdrive}`].filter(Boolean).join(" · ")}</p>{v.superseded.weapons.length ? <p className="mt-1 text-[11px] text-[var(--muted)]">{v.superseded.weapons.map((w) => [w.count, w.name, w.fireControl && `FC ${w.fireControl}`, w.damage && `dmg ${w.damage}`].filter(Boolean).join(" ")).join("; ")}</p> : null}</details> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
