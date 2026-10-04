import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_SPELLS } from "@/lib/data/nimble-spells";
import type { NimbleSpell } from "@/lib/data/nimble-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { NimbleHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, one, type Query, type RawQuery } from "@/components/NimbleRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/nimble/spells";
const TIERS = [{ key: "0", label: "Cantrips" }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => ({ key: String(t), label: `Tier ${t}` })), { key: "u", label: "Utility" }];

type SpellRow = NimbleSpell & { homebrew?: boolean };

// A homebrew record's data blob → a NimbleSpell-shaped display row.
function hbToSpell(data: Record<string, unknown>, name: string): SpellRow {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return {
    name,
    school: s("school") || "Utility",
    tier: typeof data.tier === "number" ? data.tier : 0,
    actions: s("actions") || "1 Action",
    targeting: s("targeting") || undefined,
    text: s("text"),
    utility: data.utility === true,
    page: 0,
    homebrew: true,
  };
}

export default async function NimbleSpellsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "nimble-spell" }),
    ownHomebrew(user.id, "nimble-spell"),
    userCampaigns(user.id),
  ]);
  const hbRows: SpellRow[] = hbVisible.map((h) => hbToSpell(h.data as Record<string, unknown>, h.name));
  const ALL: SpellRow[] = [...hbRows, ...NIMBLE_SPELLS.map((s) => ({ ...s }))];
  const SCHOOLS = [...new Set(ALL.map((s) => s.school))].map((s) => ({ key: s, label: s }));

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const school = SCHOOLS.some((s) => s.key === one(raw.school)) ? one(raw.school) : "";
  const tier = TIERS.some((t) => t.key === one(raw.tier)) ? one(raw.tier) : "";
  const current: Query = { q, school, tier };
  // Every spell is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses. A utility spell answers to the "Utility" tier
  // chip only, a normal one only to its own tier — hence the array facet.
  const results = ALL.slice().sort((a, b) => a.school.localeCompare(b.school) || Number(a.utility) - Number(b.utility) || a.tier - b.tier);
  const facets = (s: SpellRow) => ({ school: s.school, tier: s.utility ? ["u"] : [String(s.tier)] });
  const show = (s: SpellRow) => facetMatch(facets(s), current) && (!needle || (s.name + " " + s.text).toLowerCase().includes(needle));
  const shown = results.filter(show).length;
  // Every school still gets a section (it groups the spells); `data-section`
  // hides the heading when all of its spells are filtered out.
  const groups = SCHOOLS;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <NimbleHeader title="Spells" subtitle={`${NIMBLE_SPELLS.length} spells${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · six schools + utility`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">A spell&rsquo;s mana cost equals its tier; cantrips are free. Casting needs a free hand (or focus) and the ability to speak. Upcast only up to the tier you&rsquo;ve unlocked. Attack spells miss on a 1 and crit on the primary die&rsquo;s max, like weapons.</p>
      <div className="mb-6"><HomebrewEditor kind="nimble-spell" campaigns={campaigns} initial={hbOwn} /></div>
      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search spells…" hidden={{ school, tier }} />
      <ChipRow label="School" base={BASE} current={current} param="school" options={SCHOOLS} active={school} />
      <ChipRow label="Tier" base={BASE} current={current} param="tier" options={TIERS} active={tier} />
      <CountLine count={shown} noun="spell" base={BASE} filtered={Boolean(needle || school || tier)} />
      <EmptyState noun="spell" base={BASE} hidden={shown > 0} />
      {groups.map((g) => (
        <section key={g.key} className="mb-6" data-section hidden={!results.some((s) => s.school === g.key && show(s))}>
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">{g.label}</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{results.filter((s) => s.school === g.key).map((s) => (
            <li key={`${s.homebrew ? "hb" : "bk"}-${s.name}`} className={cardCls} hidden={!show(s)} data-f={facetAttr(facets(s))}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h3 className={nameCls}>{s.name}</h3><span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{s.utility ? "Utility" : s.tier ? `Tier ${s.tier}` : "Cantrip"} · {s.actions}{s.targeting ? ` · ${s.targeting}` : ""}</span>{s.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={badge}>p.{s.page}</span>}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.text}</p>
            </li>))}</ul>
        </section>
      ))}
      </InstantFilter>
    </div>
  );
}
