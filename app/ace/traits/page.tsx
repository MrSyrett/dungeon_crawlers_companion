import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_TRAITS } from "@/lib/data/ace-traits";
import type { AceTrait, AceSettingKey } from "@/lib/data/ace-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  cardCls, bookBadge, hbBadge, type Query, type RawQuery,
} from "@/components/AceRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/ace/traits";

type Row = AceTrait & { homebrew?: boolean };

function hbToTrait(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return { name, setting: (s("setting") || "core") as AceSettingKey, description: s("description") || undefined, homebrew: true };
}

export default async function AceTraitsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ace-trait" }),
    ownHomebrew(user.id, "ace-trait"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToTrait(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...ACE_TRAITS.map((t) => ({ ...t }))];

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book };
  const filtered = Boolean(needle || book);

  // Every trait is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses.
  const list = ALL.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
  const facets = (t: Row) => ({ book: t.setting });
  const show = (t: Row) => facetMatch(facets(t), current) && (!needle || t.name.toLowerCase().includes(needle) || (t.description ?? "").toLowerCase().includes(needle));
  const shown = list.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Traits" subtitle={`${ACE_TRAITS.length} traits${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · one complication each`} />

      <div className="mb-6">
        <HomebrewEditor kind="ace-trait" campaigns={campaigns} initial={hbOwn} />
      </div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search traits…" hidden={{ book }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS.filter((b) => ALL.some((t) => t.setting === b.key))} active={book} />
      <CountLine count={shown} noun="trait" base={BASE} filtered={filtered} />
      <EmptyState noun="trait" base={BASE} hidden={shown > 0} />
        <ul className="grid grid-cols-2 items-start gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((t) => (
            <li key={`${t.homebrew ? "hb" : "bk"}-${t.setting}-${t.name}`} className={cardCls} hidden={!show(t)} data-f={facetAttr(facets(t))}>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h2 className="text-[15px] font-bold uppercase tracking-[0.1em] text-[#8ad4ff]">{t.name}</h2>
                {t.homebrew ? <span className={hbBadge}>HB</span> : t.setting !== "core" ? <span className={bookBadge}>{settingName(t.setting)}</span> : null}
              </div>
              {t.description ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{t.description}</p> : null}
            </li>
          ))}
        </ul>
      </InstantFilter>
    </div>
  );
}
