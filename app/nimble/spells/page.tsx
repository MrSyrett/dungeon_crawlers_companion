import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_SPELLS } from "@/lib/data/nimble-spells";
import { NimbleHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, one, type Query, type RawQuery } from "@/components/NimbleRef";

export const dynamic = "force-dynamic";
const BASE = "/nimble/spells";
const SCHOOLS = [...new Set(NIMBLE_SPELLS.map((s) => s.school))].map((s) => ({ key: s, label: s }));
const TIERS = [{ key: "0", label: "Cantrips" }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => ({ key: String(t), label: `Tier ${t}` })), { key: "u", label: "Utility" }];

export default async function NimbleSpellsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const school = SCHOOLS.some((s) => s.key === one(raw.school)) ? one(raw.school) : "";
  const tier = TIERS.some((t) => t.key === one(raw.tier)) ? one(raw.tier) : "";
  const current: Query = { q, school, tier };
  const results = NIMBLE_SPELLS.filter((s) => (!school || s.school === school) && (!tier || (tier === "u" ? s.utility : !s.utility && String(s.tier) === tier)) && (!needle || (s.name + " " + s.text).toLowerCase().includes(needle))).sort((a, b) => a.school.localeCompare(b.school) || Number(a.utility) - Number(b.utility) || a.tier - b.tier);
  const groups = SCHOOLS.filter((g) => results.some((s) => s.school === g.key));
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <NimbleHeader title="Spells" subtitle={`${NIMBLE_SPELLS.length} spells · six schools + utility`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">A spell&rsquo;s mana cost equals its tier; cantrips are free. Casting needs a free hand (or focus) and the ability to speak. Upcast only up to the tier you&rsquo;ve unlocked. Attack spells miss on a 1 and crit on the primary die&rsquo;s max, like weapons.</p>
      <SearchForm base={BASE} q={q} placeholder="Search spells…" hidden={{ school, tier }} />
      <ChipRow label="School" base={BASE} current={current} param="school" options={SCHOOLS} active={school} />
      <ChipRow label="Tier" base={BASE} current={current} param="tier" options={TIERS} active={tier} />
      <CountLine count={results.length} noun="spell" base={BASE} filtered={Boolean(needle || school || tier)} />
      {results.length === 0 ? <EmptyState noun="spell" base={BASE} /> : groups.map((g) => (
        <section key={g.key} className="mb-6">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">{g.label}</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{results.filter((s) => s.school === g.key).map((s) => (
            <li key={s.name} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h3 className={nameCls}>{s.name}</h3><span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{s.utility ? "Utility" : s.tier ? `Tier ${s.tier}` : "Cantrip"} · {s.actions}{s.targeting ? ` · ${s.targeting}` : ""}</span><span className={badge}>p.{s.page}</span></div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.text}</p>
            </li>))}</ul>
        </section>
      ))}
    </div>
  );
}
