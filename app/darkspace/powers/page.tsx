import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_POWERS, type DsPower } from "@/lib/data/darkspace-rules-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, accentBadge, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/powers";

type Row = DsPower & { homebrew?: boolean };
// Caster filters come from the data (Wizard, Priest, plus any homebrew-class lists).
const CASTERS = [...new Set(DS_POWERS.map((p) => p.caster))]
  .filter((c) => c && c !== "Both")
  .sort()
  .map((c) => ({ key: c, label: c }));

function hbToPower(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return { name, tier: s("tier") || "1", caster: s("caster") || "Homebrew", range: s("range"), duration: s("duration"), damage: s("damage"), desc: s("desc"), homebrew: true };
}

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-spell" }),
    ownHomebrew(user.id, "ds-spell"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToPower(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...DS_POWERS.map((p) => ({ ...p }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const caster = CASTERS.some((c) => c.key === one(raw.caster)) ? one(raw.caster) : "";
  const current: Query = { q, caster };
  const results = ALL.filter((p) =>
    (!caster || p.caster === caster || p.caster === "Both") &&
    (!needle || [p.name, p.desc, p.range, p.damage].join(" ").toLowerCase().includes(needle)),
  );
  const filtered = Boolean(needle || caster);

  const byTier: Record<string, Row[]> = {};
  for (const p of results) (byTier[p.tier] ||= []).push(p);
  const tiers = Object.keys(byTier).sort();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Spells" subtitle={`HeroDark · Arcane & Divine${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="ds-spell" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search spells…" hidden={{ caster }} />
      <ChipRow label="Caster" base={BASE} current={current} param="caster" options={CASTERS} active={caster} />
      <CountLine count={results.length} noun="spell" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="spell" base={BASE} />
      ) : (
        tiers.map((tier) => (
          <section key={tier} className="mb-6">
            <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#24c3d6]">Tier {tier}</h2>
            <div className="space-y-3">
              {byTier[tier].sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
                <div key={(p.homebrew ? "hb-" : "bk-") + p.name + p.tier} className={cardCls}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={nameCls}>{p.name}</span>
                    <span className={accentBadge}>{p.caster}</span>
                    {p.range ? <span className={badge}>{p.range}</span> : null}
                    {p.duration ? <span className={badge}>{p.duration}</span> : null}
                    {p.damage ? <span className={badge}>{p.damage}</span> : null}
                    {p.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
