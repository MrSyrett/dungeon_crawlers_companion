import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_CLASSES } from "@/lib/data/dcc-classes";
import type { DccClass } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type Query = { q?: string; cat?: string; src?: string; sort?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// The 10 base categories, in book order. Only those actually present become chips.
const CATEGORY_ORDER = [
  "Arcanist", "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Mage", "Monk", "Paladin", "Rogue",
];

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.cat) sp.set("cat", next.cat);
  if (next.src) sp.set("src", next.src);
  if (next.sort) sp.set("sort", next.sort);
  const s = sp.toString();
  return s ? `/dcc/classes?${s}` : "/dcc/classes";
}

const SORTS: { key: string; label: string; cmp: (a: DccClass, b: DccClass) => number }[] = [
  { key: "", label: "Name", cmp: (a, b) => a.name.localeCompare(b.name, "en") },
  { key: "type", label: "Type", cmp: (a, b) => (a.categories[0] ?? "").localeCompare(b.categories[0] ?? "", "en") || a.name.localeCompare(b.name, "en") },
];

// The facets the chips test, per class — the same object the client reads back
// from `data-f` (lib/facets), so server and client always agree. A hybrid
// class lists several categories, so `cat` is an array (matches any of them).
const facets = (c: DccClass) => ({ cat: c.categories, src: c.source === "Homebrew" ? "hb" : "book" });

function matches(c: DccClass, q: string, cat: string, src: string): boolean {
  if (!facetMatch(facets(c), { cat, src })) return false;
  if (!q) return true;
  return (
    c.name.toLowerCase().includes(q) ||
    c.categories.some((x) => x.toLowerCase().includes(q)) ||
    c.grants.some((g) => g.toLowerCase().includes(q))
  );
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[var(--gold)]";
const hbBadge =
  "rounded border border-[var(--red)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]";
const srcBadge =
  "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";

// Homebrew is unvalidated JSON — keep only records with the shape the card reads.
function validClass(c: unknown): c is DccClass {
  const x = c as Record<string, unknown>;
  return !!x && typeof x.name === "string" && Array.isArray(x.categories) && Array.isArray(x.grants);
}

export default async function DccClassesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dcc-class" }),
    ownHomebrew(user.id, "dcc-class"),
    userCampaigns(user.id),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccClass).filter(validClass);
  const ALL_CLASSES = [...hbRows, ...DCC_CLASSES];
  const homebrewCount = hbRows.length;

  const CATEGORIES = [...new Set(ALL_CLASSES.flatMap((c) => c.categories))].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b, "en");
  });

  const raw = await searchParams;
  const q = one(raw.q);
  const cat = one(raw.cat);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeCat = CATEGORIES.includes(cat) ? cat : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";
  const sort = one(raw.sort);
  const activeSort = SORTS.some((s) => s.key === sort && s.key) ? sort : "";
  const cmp = (SORTS.find((s) => s.key === activeSort) ?? SORTS[0]).cmp;

  // Every class is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint.
  const list = ALL_CLASSES.slice().sort(cmp);
  const show = (c: DccClass) => matches(c, needle, activeCat, activeSrc);
  const shown = list.filter(show).length;
  const filtered = Boolean(needle || activeCat || activeSrc);
  const current: Query = { q: q.trim(), cat: activeCat, src: activeSrc, sort: activeSort };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      {/* This page was the one DCC compendium page with no title at all — every
          sibling (Races, Loot, Options, Bestiary, Skills & Spells) has carried
          one. Same count-line shape as those, so the set reads as a set. */}
      <PageHeader
        title="Classes"
        subtitle={<>{DCC_CLASSES.length} classes{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}</>}
      />

      <DccHomebrewEditor kind="dcc-class" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/dcc/classes" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          aria-label="Search classes"
          placeholder="Search name, type, or benefit…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        {activeSort ? <input type="hidden" name="sort" value={activeSort} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <a href={withParams(current, { cat: "" })} data-chip="cat:" aria-pressed={!activeCat} className={`${chipBase} ${activeCat ? chipOff : chipOn}`}>
          All
        </a>
        {CATEGORIES.map((c) => (
          <a
            key={c}
            href={withParams(current, { cat: c })}
            data-chip={`cat:${c}`}
            aria-pressed={activeCat === c}
            className={`${chipBase} ${activeCat === c ? chipOn : chipOff}`}
          >
            {c}
          </a>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <a href={withParams(current, { src: "" })} data-chip="src:" aria-pressed={!activeSrc} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</a>
        <a href={withParams(current, { src: "book" })} data-chip="src:book" aria-pressed={activeSrc === "book"} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</a>
        <a href={withParams(current, { src: "hb" })} data-chip="src:hb" aria-pressed={activeSrc === "hb"} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</a>
      </div>

      {/* Sorting re-orders on the server, so these stay real navigations;
          data-nav keeps their hrefs in step with the live filters. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sort</span>
        {SORTS.map((s) => (
          <Link key={s.key || "name"} href={withParams(current, { sort: s.key })} data-nav={`sort:${s.key}`} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="class" data-plural="classes" aria-live="polite">
          {shown} {shown === 1 ? "class" : "classes"}
        </span>
        <Link href="/dcc/classes" data-clear hidden={!filtered} className="text-[var(--red)] hover:underline">
          Clear filters
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No class matches those filters. Try a broader search or{" "}
          <Link href="/dcc/classes" data-clear className="text-[var(--red)] underline">
            clear them
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {list.map((c, i) => {
          const hb = c.source === "Homebrew";
          return (
            <li key={`${hb ? "hb" : "bk"}-${c.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4" hidden={!show(c)} data-f={facetAttr(facets(c))}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">{c.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {c.categories.join(" / ")}
                </span>
                {hb ? <span className={hbBadge}>Homebrew</span> : <span className={srcBadge}>{c.source}{c.page ? ` · p.${c.page}` : ""}</span>}
                {c.earthClass ? (
                  <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Earth Class
                  </span>
                ) : null}
              </div>

              {c.prerequisites ? (
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Prerequisite:</span>{" "}
                  {c.prerequisites}
                </p>
              ) : null}

              <ul className="mt-2 flex flex-col gap-1">
                {c.grants.map((g, gi) => (
                  <li key={gi} className="flex gap-2 text-[13px] leading-relaxed text-[var(--muted)]">
                    <span className="mt-[2px] shrink-0 text-[var(--red)]">▸</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      </InstantFilter>
    </div>
  );
}
