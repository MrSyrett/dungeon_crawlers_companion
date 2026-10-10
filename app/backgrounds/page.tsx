import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_BACKGROUNDS } from "@/lib/data/backgrounds";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type RawQuery = { q?: string | string[]; opt?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

type Row = { name: string; desc: string; homebrew: boolean; optional: boolean };
const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";
const chipOn = "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]";
function optHref(q: string, opt: string): string {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (opt) sp.set("opt", opt);
  const s = sp.toString();
  return s ? `/backgrounds?${s}` : "/backgrounds";
}

export default async function BackgroundsPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "background" }),
    ownHomebrew(user.id, "background"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { name: String(d.name ?? h.name), desc: String(d.desc ?? ""), homebrew: true, optional: false };
  });
  const bookRows: Row[] = SD_BACKGROUNDS.map((b) => ({ name: b.name, desc: b.desc, homebrew: false, optional: b.optional }));
  const ALL: Row[] = [...hbRows, ...bookRows].sort((a, b) => a.name.localeCompare(b.name, "en"));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const opt = one(raw.opt) === "0" ? "0" : "";
  const current = { q, opt };
  // Every background is rendered; the Optional toggle and the search filter on
  // the client (InstantFilter). `opt=0` hides the optional ones, so only the
  // non-optional rows carry the facet it tests. `show` applies the URL's
  // filters for the initial paint, through the same facet match the client uses.
  const facets = (b: Row) => ({ opt: b.optional ? undefined : "0" });
  const show = (b: Row) =>
    facetMatch(facets(b), current) &&
    (!needle || b.name.toLowerCase().includes(needle) || b.desc.toLowerCase().includes(needle));
  const shown = ALL.filter(show).length;
  const filtered = Boolean(needle || opt);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Backgrounds" subtitle={<>{SD_BACKGROUNDS.length} Shadowdark backgrounds{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}</>} />

      <HomebrewManager type="background" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/backgrounds" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search backgrounds…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      {/* A switch: lit (pressed) while optional entries are shown, i.e. opt
          unset; clicking it then sets opt=0 (InstantFilter's data-toggle). */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <a href={optHref(q, opt === "0" ? "" : "0")} data-chip="opt:" data-toggle="0" aria-pressed={opt !== "0"} className={`${chipBase} ${opt === "0" ? chipOff : chipOn}`}>
          Optional
        </a>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="background" aria-live="polite">
          {shown} {shown === 1 ? "background" : "backgrounds"}
        </span>
        <Link href="/backgrounds" data-clear hidden={!filtered} className="text-[var(--gold)] hover:underline">
          Clear
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No background matches that search.{" "}
          <Link href="/backgrounds" data-clear className="text-[var(--gold)] underline">
            Clear it
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {ALL.map((b, i) => (
          <li
            key={`${b.homebrew ? "hb" : "bk"}-${b.name}-${i}`}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            hidden={!show(b)}
            data-f={facetAttr(facets(b))}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                {b.name}
              </h2>
              {b.homebrew ? (
                <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                  Homebrew
                </span>
              ) : null}
            </div>
            {b.desc ? (
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{b.desc}</p>
            ) : null}
          </li>
        ))}
      </ul>
      </InstantFilter>

      <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
        In Shadowdark, your background is a roll on a d20 table that suggests where your character
        came from. It&apos;s flavor — pick one that fits your character or roll for a surprise.
      </p>
    </div>
  );
}
