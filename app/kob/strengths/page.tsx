import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { KOB_STRENGTHS } from "@/lib/data/kob-strengths";
import { KOB_FLAWS } from "@/lib/data/kob-flaws";
import { KOB_BOOKS } from "@/lib/data/kob-books";
import type { KobStrength, KobFlaw, KobBook } from "@/lib/data/kob-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { KobHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, isBook, bookName, one, nameCls, cardCls, bookBadge, hbBadge, type Query, type RawQuery } from "@/components/KobRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/kob/strengths";
const KINDS = [{ key: "strength", label: "Strengths" }, { key: "flaw", label: "Flaws" }];

type SRow = KobStrength & { homebrew?: boolean };
type FRow = KobFlaw & { homebrew?: boolean };

const hbBook = (data: Record<string, unknown>): KobBook =>
  isBook(typeof data.book === "string" ? data.book : "") ? (data.book as KobBook) : "bikes";

function hbToStrength(data: Record<string, unknown>, name: string): SRow {
  return {
    name,
    book: hbBook(data),
    cost: typeof data.cost === "string" ? data.cost : "",
    description: typeof data.description === "string" ? data.description : "",
    page: 0,
    homebrew: true,
  };
}

function hbToFlaw(data: Record<string, unknown>, name: string): FRow {
  const row: FRow = { name, book: hbBook(data), page: 0, homebrew: true };
  if (typeof data.description === "string") row.description = data.description;
  return row;
}

export default async function KobStrengthsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbStrVisible, hbStrOwn, hbFlawVisible, hbFlawOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "kob-strength" }),
    ownHomebrew(user.id, "kob-strength"),
    visibleHomebrew(user.id, { type: "kob-flaw" }),
    ownHomebrew(user.id, "kob-flaw"),
    userCampaigns(user.id),
  ]);
  const hbStrengths: SRow[] = hbStrVisible.map((h) => hbToStrength(h.data as Record<string, unknown>, h.name));
  const hbFlaws: FRow[] = hbFlawVisible.map((h) => hbToFlaw(h.data as Record<string, unknown>, h.name));
  const ALL_STRENGTHS: SRow[] = [...hbStrengths, ...KOB_STRENGTHS.map((s) => ({ ...s }))];
  const ALL_FLAWS: FRow[] = [...hbFlaws, ...KOB_FLAWS.map((f) => ({ ...f }))];

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = isBook(one(raw.book)) ? one(raw.book) : "";
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, kind };
  // Every strength and flaw is rendered; the chips filter on the client
  // (InstantFilter). `show*` applies the URL's filters for the initial paint,
  // through the same facet match the client uses. The "Show" chip is a facet
  // too: a strength is kind "strength", a flaw kind "flaw".
  const sFacets = (s: SRow) => ({ kind: "strength", book: s.book });
  const showS = (s: SRow) => facetMatch(sFacets(s), current) && (!needle || (s.name + " " + s.description).toLowerCase().includes(needle));

  // One entry per distinct flaw NAME, as before — but built from every flaw now,
  // so a name that appears in several books gets all of them as its book facet.
  const flawNames = [...new Set(ALL_FLAWS.map((f) => f.name))].sort();
  const flawGroups = flawNames.map((n) => {
    const rows = ALL_FLAWS.filter((f) => f.name === n);
    return { name: n, rows, desc: rows.find((f) => f.description)?.description, isHb: rows.some((f) => f.homebrew) };
  });
  type FlawGroup = (typeof flawGroups)[number];
  const fFacets = (g: FlawGroup) => ({ kind: "flaw", book: [...new Set(g.rows.map((r) => r.book))] });
  const showF = (g: FlawGroup) => facetMatch(fFacets(g), current) && (!needle || g.rows.some((f) => (f.name + " " + (f.description ?? "")).toLowerCase().includes(needle)));

  const shown = ALL_STRENGTHS.filter(showS).length + flawGroups.filter(showF).length;
  const filtered = Boolean(needle || book || kind);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <KobHeader title="Strengths & Flaws" subtitle={`${KOB_STRENGTHS.length} strengths · ${KOB_FLAWS.length} flaws${hbStrengths.length + hbFlaws.length ? ` + ${hbStrengths.length + hbFlaws.length} homebrew` : ""}`} />
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <HomebrewEditor kind="kob-strength" campaigns={campaigns} initial={hbStrOwn} />
        <HomebrewEditor kind="kob-flaw" campaigns={campaigns} initial={hbFlawOwn} />
      </div>
      <div className="mb-5 grid gap-2 md:grid-cols-3">
        {KOB_BOOKS.map((b) => (
          <div key={b.key} className={cardCls}>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]">{b.name}</div>
            <ul className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
              {b.ageGroups.map((a) => <li key={a.name}><span className="font-semibold text-[var(--text)]">{a.name}:</span> +1 {a.statBonus.join(" & ")} · {a.freeStrength}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search strengths and flaws…" hidden={{ book, kind }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Show" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={shown} noun="entry" base={BASE} filtered={filtered} />
      <EmptyState noun="entry" base={BASE} hidden={shown > 0} />
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {ALL_STRENGTHS.map((s) => (
          <li key={`${s.homebrew ? "hb" : "bk"}-${s.book}-${s.name}`} className={cardCls} hidden={!showS(s)} data-f={facetAttr(sFacets(s))}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className={nameCls}>{s.name}</h2>
              <span className="font-mono text-[11px] text-[var(--muted)]">{s.cost}</span>
              {s.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={bookBadge}>{bookName(s.book)} · p.{s.page}</span>}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.description}</p>
          </li>
        ))}
      </ul>
      <section className={`${cardCls} mt-4`} data-section hidden={!flawGroups.some(showF)}>
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">Flaws{book ? ` · ${bookName(book)}` : ""}</h2>
        <p className="mt-1 text-[12px] text-[var(--muted)]">Any Flaw is fair game as long as it won&rsquo;t spoil anyone else&rsquo;s fun; talk to the GM to invent your own.</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {flawGroups.map((g) => (
            <li key={g.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5 text-[13px] text-[var(--text)]" title={g.desc ?? ""} hidden={!showF(g)} data-f={facetAttr(fFacets(g))} data-s={g.rows.map((f) => f.description ?? "").join(" ")}>
              {g.name}{g.isHb ? <span className={`ml-2 ${hbBadge}`}>Homebrew</span> : !book ? <span className="ml-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{g.rows.map((r) => bookName(r.book).replace("Kids ", "").replace("on ", "").replace("in ", "")).join(" · ")}</span> : null}
            </li>
          ))}
        </ul>
      </section>
      </InstantFilter>
    </div>
  );
}
