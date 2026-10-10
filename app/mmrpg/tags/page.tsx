import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_TAGS } from "@/lib/data/mmrpg-tags";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import {
  MmrpgHeader, SearchForm, CountLine, EmptyState, RefDetails, cardCls, nameCls, hbBadge,
  one, type RawQuery,
} from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/tags";
const sd = (o: Record<string, unknown>, k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
type Row = { name: string; description: string; homebrew?: boolean };

export default async function MmrpgTagsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbTag, hbTagOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "mmrpg-tag" }),
    ownHomebrew(user.id, "mmrpg-tag"),
    userCampaigns(user.id),
  ]);
  const ALL: Row[] = [
    ...hbTag.map((h) => ({ name: h.name, description: sd(h.data as Record<string, unknown>, "description"), homebrew: true })),
    ...MMRPG_TAGS.map((t) => ({ name: t.name, description: t.description })),
  ];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  // Every tag is rendered; the search filters on the client (InstantFilter).
  const show = (t: Row) => !needle || [t.name, t.description].join(" ").toLowerCase().includes(needle);
  const shown = ALL.filter(show).length;
  const hbCount = ALL.filter((t) => t.homebrew).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Tags" subtitle={`${MMRPG_TAGS.length} tags${hbCount ? ` + ${hbCount} homebrew` : ""}`} />

      <div className="mb-6 flex flex-col gap-4">
        <HomebrewEditor kind="mmrpg-tag" campaigns={campaigns} initial={hbTagOwn} />
      </div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search tags…" hidden={{}} />
      <CountLine count={shown} noun="tag" base={BASE} filtered={Boolean(needle)} />
      <EmptyState noun="tag" base={BASE} hidden={shown > 0} />

      <div className="grid gap-3 md:grid-cols-2">
          {ALL.map((t) => (
            <article key={`${t.homebrew ? "hb" : "bk"}-${t.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3" hidden={!show(t)} data-f="{}">
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
