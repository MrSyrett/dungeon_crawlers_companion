import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_CLASSES } from "@/lib/data/dcc-classes";
import type { DccClass } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";

export const dynamic = "force-dynamic";

type Query = { q?: string; cat?: string; src?: string };
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
  const s = sp.toString();
  return s ? `/dcc/classes?${s}` : "/dcc/classes";
}

function matches(c: DccClass, q: string, cat: string, src: string): boolean {
  if (cat && !c.categories.includes(cat)) return false;
  if (src === "hb" && c.source !== "Homebrew") return false;
  if (src === "book" && c.source === "Homebrew") return false;
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
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const hbBadge =
  "rounded border border-[var(--red)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#f0a8a3]";

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
  const hbRows = hbVisible.map((h) => h.data as unknown as DccClass);
  const ALL_CLASSES = [...hbRows, ...DCC_CLASSES].sort((a, b) => a.name.localeCompare(b.name, "en"));
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

  const results = ALL_CLASSES.filter((c) => matches(c, needle, activeCat, activeSrc));
  const filtered = Boolean(needle || activeCat || activeSrc);
  const current: Query = { q: q.trim(), cat: activeCat, src: activeSrc };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Classes</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_CLASSES.length} classes{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <DccHomebrewEditor kind="dcc-class" campaigns={campaigns} initial={hbOwn} />

      <form method="get" action="/dcc/classes" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, type, or benefit…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <Link href={withParams(current, { cat: "" })} className={`${chipBase} ${activeCat ? chipOff : chipOn}`}>
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={withParams(current, { cat: c })}
            className={`${chipBase} ${activeCat === c ? chipOn : chipOff}`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <Link href={withParams(current, { src: "" })} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</Link>
        <Link href={withParams(current, { src: "book" })} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</Link>
        <Link href={withParams(current, { src: "hb" })} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</Link>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "class" : "classes"}
        </span>
        {filtered ? (
          <Link href="/dcc/classes" className="text-[var(--red)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No class matches those filters. Try a broader search or{" "}
            <Link href="/dcc/classes" className="text-[var(--red)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((c, i) => {
            const hb = c.source === "Homebrew";
            return (
              <li key={`${hb ? "hb" : "bk"}-${c.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{c.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {c.categories.join(" / ")}
                  </span>
                  {hb ? <span className={hbBadge}>Homebrew</span> : null}
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
      )}
    </div>
  );
}
