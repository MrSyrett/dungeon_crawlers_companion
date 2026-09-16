import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_TRAITS } from "@/lib/data/mmrpg-traits";
import { MMRPG_TAGS } from "@/lib/data/mmrpg-tags";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/traits";
const sd = (o: Record<string, unknown>, k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
type Row = { name: string; description: string; kind: "trait" | "tag"; homebrew?: boolean };

export default async function MmrpgTraitsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbTrait, hbTraitOwn, hbTag, hbTagOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "mmrpg-trait" }),
    ownHomebrew(user.id, "mmrpg-trait"),
    visibleHomebrew(user.id, { type: "mmrpg-tag" }),
    ownHomebrew(user.id, "mmrpg-tag"),
    userCampaigns(user.id),
  ]);
  const ALL: Row[] = [
    ...hbTrait.map((h) => ({ name: h.name, description: sd(h.data as Record<string, unknown>, "description"), kind: "trait" as const, homebrew: true })),
    ...hbTag.map((h) => ({ name: h.name, description: sd(h.data as Record<string, unknown>, "description"), kind: "tag" as const, homebrew: true })),
    ...MMRPG_TRAITS.map((t) => ({ name: t.name, description: t.description, kind: "trait" as const })),
    ...MMRPG_TAGS.map((t) => ({ name: t.name, description: t.description, kind: "tag" as const })),
  ];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const KINDS = [{ key: "trait", label: "Traits" }, { key: "tag", label: "Tags" }];
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const results = ALL.filter((t) => (!kind || t.kind === kind) && (!needle || [t.name, t.description].join(" ").toLowerCase().includes(needle)));
  const hbCount = ALL.filter((t) => t.homebrew).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Traits & Tags" subtitle={`${MMRPG_TRAITS.length} traits · ${MMRPG_TAGS.length} tags${hbCount ? ` + ${hbCount} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">A <b>trait</b> is a label with a game-mechanical effect (you get one extra trait per rank, plus your origin and occupation traits). A <b>tag</b> mostly has a narrative effect — it describes who you are (the Heroic tag gives you Karma equal to your rank).</p>

      <div className="mb-6 flex flex-col gap-4">
        <HomebrewEditor kind="mmrpg-trait" campaigns={campaigns} initial={hbTraitOwn} />
        <HomebrewEditor kind="mmrpg-tag" campaigns={campaigns} initial={hbTagOwn} />
      </div>

      <SearchForm base={BASE} q={q} placeholder="Search traits & tags…" hidden={{ kind }} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={results.length} noun="entry" base={BASE} filtered={Boolean(needle || kind)} />

      {results.length === 0 ? <EmptyState noun="entry" base={BASE} /> : null}
      {["trait", "tag"].filter((k) => results.some((t) => t.kind === k)).map((k) => (
        <section key={k} className={`${cardCls} mb-4`}>
          <SectionH>{k === "trait" ? "Traits" : "Tags"}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((t) => t.kind === k).map((t) => (
              <article key={`${t.homebrew ? "hb" : "bk"}-${t.kind}-${t.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{t.name}</h3>
                  {t.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{t.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
