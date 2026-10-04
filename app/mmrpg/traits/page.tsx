import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_TRAITS } from "@/lib/data/mmrpg-traits";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  MmrpgHeader, SearchForm, CountLine, EmptyState, RefDetails, cardCls, nameCls, hbBadge,
  one, type RawQuery,
} from "@/components/MmrpgRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/traits";
const sd = (o: Record<string, unknown>, k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
type Row = { name: string; description: string; homebrew?: boolean };

export default async function MmrpgTraitsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbTrait, hbTraitOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "mmrpg-trait" }),
    ownHomebrew(user.id, "mmrpg-trait"),
    userCampaigns(user.id),
  ]);
  const ALL: Row[] = [
    ...hbTrait.map((h) => ({ name: h.name, description: sd(h.data as Record<string, unknown>, "description"), homebrew: true })),
    ...MMRPG_TRAITS.map((t) => ({ name: t.name, description: t.description })),
  ];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  // Every trait is rendered; the search box filters on the client (InstantFilter).
  // `show` applies the URL's `q` for the initial paint, through the same predicate.
  const current = { q };
  const facets = () => ({});
  const show = (t: Row) => facetMatch(facets(), current) && (!needle || [t.name, t.description].join(" ").toLowerCase().includes(needle));
  const shown = ALL.filter(show).length;
  const hbCount = ALL.filter((t) => t.homebrew).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Traits" subtitle={`${MMRPG_TRAITS.length} traits${hbCount ? ` + ${hbCount} homebrew` : ""}`} />

      <div className="mb-6 flex flex-col gap-4">
        <HomebrewEditor kind="mmrpg-trait" campaigns={campaigns} initial={hbTraitOwn} />
      </div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search traits…" hidden={{}} />
      <CountLine count={shown} noun="trait" base={BASE} filtered={Boolean(needle)} />

      <EmptyState noun="trait" base={BASE} hidden={shown > 0} />
      <div className="grid gap-3 md:grid-cols-2">
        {ALL.map((t) => (
          <article key={`${t.homebrew ? "hb" : "bk"}-${t.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3" hidden={!show(t)} data-f={facetAttr(facets())}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={nameCls}>{t.name}</h3>
              {t.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
            </div>
            {t.description ? <RefDetails><p className="text-[12px] leading-relaxed text-[var(--muted)]">{t.description}</p></RefDetails> : null}
          </article>
        ))}
      </div>
      </InstantFilter>
    </div>
  );
}
