import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_ANCESTRIES } from "@/lib/data/ancestries";

export const dynamic = "force-dynamic";

type RawQuery = { q?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// Split "Farsight: +1 to ranged…" into the trait name and its effect.
function splitTrait(trait: string): { title: string; body: string } {
  const i = trait.indexOf(":");
  if (i === -1) return { title: "", body: trait };
  return { title: trait.slice(0, i).trim(), body: trait.slice(i + 1).trim() };
}

export default async function AncestriesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const results = needle
    ? SD_ANCESTRIES.filter(
        (a) =>
          a.name.toLowerCase().includes(needle) || a.trait.toLowerCase().includes(needle),
      )
    : SD_ANCESTRIES;
  const filtered = Boolean(needle);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Ancestries</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {SD_ANCESTRIES.length} Shadowdark ancestries
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <form method="get" action="/ancestries" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or trait…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "ancestry" : "ancestries"}
        </span>
        {filtered ? (
          <Link href="/ancestries" className="text-[var(--gold)] hover:underline">
            Clear
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No ancestry matches that search.{" "}
            <Link href="/ancestries" className="text-[var(--gold)] underline">
              Clear it
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {results.map((a) => {
            const { title, body } = splitTrait(a.trait);
            return (
              <li
                key={a.name}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    {a.name}
                  </h2>
                  {title ? (
                    <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold tracking-[0.1em] text-[var(--text)]">
                      {title}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{body}</p>
                {a.languages ? (
                  <p className="mt-2 text-[12px] text-[var(--muted)]">
                    <span className="font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
                      Languages:
                    </span>{" "}
                    {a.languages}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
