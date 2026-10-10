import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_RACES } from "@/lib/data/dcc-races";
import type { DccRace } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type Query = { q?: string; group?: string; src?: string; sort?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const SIZE_NAMES: Record<number, string> = {
  1: "Tiny", 2: "Small", 3: "Petite", 4: "Medium", 5: "Large", 6: "Huge", 7: "Colossal", 8: "Gargantuan",
};

// Earth races first (the broadest Class access), then Alien; A–Z within each.
const GROUP_RANK: Record<DccRace["group"], number> = { Earth: 0, Alien: 1 };
const byRace = (a: DccRace, b: DccRace) =>
  GROUP_RANK[a.group] - GROUP_RANK[b.group] || a.name.localeCompare(b.name, "en");
const SORTS: { key: string; label: string; cmp: (a: DccRace, b: DccRace) => number }[] = [
  { key: "", label: "Origin", cmp: byRace },
  { key: "name", label: "Name", cmp: (a, b) => a.name.localeCompare(b.name, "en") },
  { key: "size", label: "Size", cmp: (a, b) => a.size - b.size || a.name.localeCompare(b.name, "en") },
];

const GROUPS: { key: DccRace["group"]; label: string }[] = [
  { key: "Earth", label: "Earth" },
  { key: "Alien", label: "Alien" },
];

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.group) sp.set("group", next.group);
  if (next.src) sp.set("src", next.src);
  if (next.sort) sp.set("sort", next.sort);
  const s = sp.toString();
  return s ? `/dcc/races?${s}` : "/dcc/races";
}

// The facets the chips test, per race — the same object the client reads back
// from `data-f` (lib/facets), so server and client always agree.
const facets = (r: DccRace) => ({ group: r.group, src: r.source === "Homebrew" ? "hb" : "book" });

function matches(r: DccRace, q: string, group: string, src: string): boolean {
  if (!facetMatch(facets(r), { group, src })) return false;
  if (!q) return true;
  return r.name.toLowerCase().includes(q) || r.grants.some((g) => g.toLowerCase().includes(q));
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
function validRace(r: unknown): r is DccRace {
  const x = r as Record<string, unknown>;
  return !!x && typeof x.name === "string" && Array.isArray(x.grants);
}

export default async function DccRacesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dcc-race" }),
    ownHomebrew(user.id, "dcc-race"),
    userCampaigns(user.id),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccRace).filter(validRace);
  const ALL_RACES = [...hbRows, ...DCC_RACES];
  const homebrewCount = hbRows.length;

  const raw = await searchParams;
  const q = one(raw.q);
  const group = one(raw.group);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeGroup = GROUPS.some((g) => g.key === group) ? group : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";
  const sort = one(raw.sort);
  const activeSort = SORTS.some((s) => s.key === sort && s.key) ? sort : "";
  const cmp = (SORTS.find((s) => s.key === activeSort) ?? SORTS[0]).cmp;

  // Every race is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint.
  const list = ALL_RACES.slice().sort(cmp);
  const show = (r: DccRace) => matches(r, needle, activeGroup, activeSrc);
  const shown = list.filter(show).length;
  const filtered = Boolean(needle || activeGroup || activeSrc);
  const current: Query = { q: q.trim(), group: activeGroup, src: activeSrc, sort: activeSort };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Races" subtitle={<>{DCC_RACES.length} races{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}</>} />

      <DccHomebrewEditor kind="dcc-race" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/dcc/races" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          aria-label="Search races"
          placeholder="Search name or trait…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeGroup ? <input type="hidden" name="group" value={activeGroup} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        {activeSort ? <input type="hidden" name="sort" value={activeSort} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Origin
        </span>
        <a href={withParams(current, { group: "" })} data-chip="group:" aria-pressed={!activeGroup} className={`${chipBase} ${activeGroup ? chipOff : chipOn}`}>
          All
        </a>
        {GROUPS.map((g) => (
          <a
            key={g.key}
            href={withParams(current, { group: g.key })}
            data-chip={`group:${g.key}`}
            aria-pressed={activeGroup === g.key}
            className={`${chipBase} ${activeGroup === g.key ? chipOn : chipOff}`}
          >
            {g.label}
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
          <Link key={s.key || "origin"} href={withParams(current, { sort: s.key })} data-nav={`sort:${s.key}`} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="race" aria-live="polite">
          {shown} {shown === 1 ? "race" : "races"}
        </span>
        <Link href="/dcc/races" data-clear hidden={!filtered} className="text-[var(--red)] hover:underline">
          Clear filters
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No race matches those filters. Try a broader search or{" "}
          <Link href="/dcc/races" data-clear className="text-[var(--red)] underline">
            clear them
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {list.map((r, i) => {
          const hb = r.source === "Homebrew";
          return (
            <li key={`${hb ? "hb" : "bk"}-${r.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4" hidden={!show(r)} data-f={facetAttr(facets(r))}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">{r.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {r.group} · {SIZE_NAMES[r.size] ?? `Size ${r.size}`}
                </span>
                {hb ? <span className={hbBadge}>Homebrew</span> : <span className={srcBadge}>{r.source}{r.page ? ` · p.${r.page}` : ""}</span>}
              </div>

              {r.prerequisites ? (
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Prerequisite:</span>{" "}
                  {r.prerequisites}
                </p>
              ) : null}

              <ul className="mt-2 flex flex-col gap-1">
                {r.grants.map((g, gi) => (
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
