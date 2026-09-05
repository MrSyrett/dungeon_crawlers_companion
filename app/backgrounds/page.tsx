import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_BACKGROUNDS } from "@/lib/data/backgrounds";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";

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
  const results = ALL.filter(
    (b) =>
      (!needle || b.name.toLowerCase().includes(needle) || b.desc.toLowerCase().includes(needle)) &&
      (opt !== "0" || !b.optional),
  );
  const filtered = Boolean(needle || opt);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Backgrounds</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {SD_BACKGROUNDS.length} Shadowdark backgrounds{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/homebrew"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            My Homebrew
          </Link>
          <Link
            href="/dashboard"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            &larr; Home
          </Link>
        </div>
      </header>

      <HomebrewManager type="background" campaigns={campaigns} initial={hbOwn} />

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

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <Link href={optHref(q, opt === "0" ? "" : "0")} className={`${chipBase} ${opt === "0" ? chipOff : chipOn}`}>
          Optional
        </Link>
      </div>

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
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((b, i) => (
            <li
              key={`${b.homebrew ? "hb" : "bk"}-${b.name}-${i}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
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
      )}

      <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
        In Shadowdark, your background is a roll on a d20 table that suggests where your character
        came from. It&apos;s flavor — pick one that fits your character or roll for a surprise.
      </p>
    </div>
  );
}
