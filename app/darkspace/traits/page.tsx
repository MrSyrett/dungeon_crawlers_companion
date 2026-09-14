import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_TRAITS, type DsTrait } from "@/lib/data/darkspace-rules-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, hbBadge,
  one, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/traits";

type Row = DsTrait & { homebrew?: boolean };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-trait" }),
    ownHomebrew(user.id, "ds-trait"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => ({ name: h.name, effect: typeof (h.data as Record<string, unknown>).effect === "string" ? ((h.data as Record<string, unknown>).effect as string) : "", homebrew: true }));
  const ALL: Row[] = [...hbRows, ...DS_TRAITS.map((t) => ({ ...t }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = ALL.filter((t) => !needle || [t.name, t.effect].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Traits" subtitle={`DarkSpace · Decoupled from Species${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
        In DarkSpace your Species is free-text flavor — you write in whatever you like. Your mechanical edge comes from a single Trait you choose separately.
      </p>

      <div className="mb-6"><HomebrewEditor kind="ds-trait" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search traits…" hidden={{}} />
      <CountLine count={results.length} noun="trait" base={BASE} filtered={Boolean(needle)} />

      {results.length === 0 ? (
        <EmptyState noun="trait" base={BASE} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((t) => (
            <div key={(t.homebrew ? "hb-" : "bk-") + t.name} className={cardCls}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={nameCls}>{t.name}</span>
                {t.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{t.effect}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
