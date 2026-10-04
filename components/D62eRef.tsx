import Link from "next/link";
import PageHeader from "./PageHeader";

// Shared shell for the D62e (D6 System: Second Edition) reference pages
// (app/d62e/*). Same pieces as SwRef / AceRef — header with "Homebrew" +
// "← Home" links, search form, filter chips, count line, empty state, cards —
// in the D62e orange accent. Genre-agnostic: every row carries a `genre`
// (core / fantasy / scifi / superhero), filtered via the GENRES chip row.
// code() (pips → die code) is re-exported from lib/d62e-dice.

export { code } from "@/lib/d62e-dice";

export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// The accent used for text on the dark ground (brighter than the --d62e border).
const ACCENT = "#ef9455";

export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--d62e)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--d62e)] bg-[var(--panel-2)] text-[#ef9455]";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#ef9455]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const hbBadge = "rounded border border-[var(--d62e)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#ef9455]";
export const genreBadge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";

// ── Genres ───────────────────────────────────────────────────────────────────
// One book, four genre lenses. "core" applies to every game; the others are the
// genre modules. Used both as the "Genre" chip row and to label rows.
export const GENRES: { key: string; label: string }[] = [
  { key: "core", label: "Core" },
  { key: "fantasy", label: "Fantasy" },
  { key: "scifi", label: "Sci-Fi" },
  { key: "superhero", label: "Superhero" },
];
const GENRE_NAME: Record<string, string> = Object.fromEntries(GENRES.map((g) => [g.key, g.label]));
export function genreName(key: string): string {
  return GENRE_NAME[key] ?? key;
}
/** True when `row` passes the active genre filter (empty filter = everything). */
export function matchesGenre(rowGenre: string, genre: string): boolean {
  return !genre || rowGenre === genre;
}

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `${base}?${s}` : base;
}

export function D62eHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}

export function SearchForm({ base, q, placeholder, hidden }: { base: string; q: string; placeholder: string; hidden: Query }) {
  return (
    <form method="get" action={base} className="mb-4 flex gap-2">
      <input type="search" name="q" defaultValue={q} placeholder={placeholder} className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--d62e)]" />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--d62e)] hover:text-[var(--text)]">Search</button>
    </form>
  );
}

export function ChipRow({ label, base, current, param, options, active }: { label: string; base: string; current: Query; param: string; options: { key: string; label: string }[]; active: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
      <a href={withParams(base, current, { [param]: "" })} data-chip={`${param}:`} aria-pressed={!active} className={`${chipBase} ${active ? chipOff : chipOn}`}>All</a>
      {options.map((o) => <a key={o.key} href={withParams(base, current, { [param]: o.key })} data-chip={`${param}:${o.key}`} aria-pressed={active === o.key} className={`${chipBase} ${active === o.key ? chipOn : chipOff}`}>{o.label}</a>)}
    </div>
  );
}

export function CountLine({ count, noun, base, filtered }: { count: number; noun: string; base: string; filtered: boolean }) {
  return (
    <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      <span data-count data-noun={noun} aria-live="polite">{count} {count === 1 ? noun : noun + "s"}</span>
      <Link href={base} data-clear hidden={!filtered} className="text-[var(--d62e)] hover:underline">Clear filters</Link>
    </div>
  );
}

// `hidden` lets a page render this alongside the full list (InstantFilter
// shows it when nothing matches); without it, it renders as before.
export function EmptyState({ noun, base, hidden }: { noun: string; base: string; hidden?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={hidden}>
      <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No {noun} matches those filters. Try a broader search or <Link href={base} data-clear className="text-[var(--d62e)] underline">clear them</Link>.</p>
    </div>
  );
}

/** Section heading used across the pages. */
export function SectionH({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#ef9455]">{children}</h2>;
}

export { ACCENT };
