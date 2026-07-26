import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_BACKGROUNDS } from "@/lib/data/backgrounds";

export const dynamic = "force-dynamic";

type RawQuery = { q?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const BACKGROUNDS_AZ = [...SD_BACKGROUNDS].sort((a, b) => a.name.localeCompare(b.name, "en"));

export default async function BackgroundsPage({
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
    ? BACKGROUNDS_AZ.filter((b) => b.name.toLowerCase().includes(needle))
    : BACKGROUNDS_AZ;
  const filtered = Boolean(needle);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Backgrounds</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {SD_BACKGROUNDS.length} Shadowdark backgrounds
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <form method="get" action="/backgrounds" className="mb-4 flex gap-2">
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

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "background" : "backgrounds"}
        </span>
        {filtered ? (
          <Link href="/backgrounds" className="text-[var(--gold)] hover:underline">
            Clear
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No background matches that search.{" "}
            <Link href="/backgrounds" className="text-[var(--gold)] underline">
              Clear it
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {results.map((b) => (
            <li
              key={b.name}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-[var(--gold)]"
            >
              {b.name}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
        In Shadowdark, your background is a roll on a d20 table that suggests where your character
        came from. It&apos;s flavor — pick one that fits your character or roll for a surprise.
      </p>
    </div>
  );
}
