import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_BACKGROUNDS } from "@/lib/data/darkspace-rules-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, hbBadge,
  one, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/backgrounds";

type Row = { name: string; desc?: string; homebrew?: boolean };

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-background" }),
    ownHomebrew(user.id, "ds-background"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => ({ name: h.name, desc: typeof (h.data as Record<string, unknown>).desc === "string" ? ((h.data as Record<string, unknown>).desc as string) : "", homebrew: true }));
  const ALL: Row[] = [...hbRows, ...DS_BACKGROUNDS.map((b) => ({ name: b }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const results = ALL.filter((b) => !needle || [b.name, b.desc ?? ""].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Backgrounds" subtitle={`DarkSpace · Where You Came From${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="ds-background" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search backgrounds…" hidden={{}} />
      <CountLine count={results.length} noun="background" base={BASE} filtered={Boolean(needle)} />

      {results.length === 0 ? (
        <EmptyState noun="background" base={BASE} />
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {results.map((b) => (
            <div key={(b.homebrew ? "hb-" : "bk-") + b.name} className={cardCls}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={nameCls}>{b.name}</span>
                {b.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
              </div>
              {b.desc ? <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{b.desc}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
