import Link from "next/link";
import PageHeader from "./PageHeader";

// Shared shell for the Marvel Multiverse RPG (MMRPG, d616) reference pages
// (app/mmrpg/*). Mirrors D62eRef but single-genre (core) and Marvel red.

export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// The blue. --sys-link is Marvel's link/token colour; entry NAMES and section
// heads take --mmrpg-ink instead (see nameCls), so this is only for things that
// read as links. Exported but currently unconsumed.
const ACCENT = "var(--sys-link)";

export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--mmrpg)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--mmrpg)] bg-[var(--panel-2)] text-[var(--sys-link)]";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[var(--mmrpg-ink)]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const hbBadge = "rounded border border-[var(--mmrpg)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--sys-link)]";

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `${base}?${s}` : base;
}

// Standard collapsible "Details" disclosure for reference cards — starts collapsed
// so long descriptions don't dominate the page. Pure HTML <details>, no client JS.
export function RefDetails({ label = "Details", openLabel = "Hide details", children }: { label?: string; openLabel?: string; children: React.ReactNode }) {
  return (
    <details className="group mt-2">
      <summary className="flex cursor-pointer list-none items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--mmrpg)] hover:text-[var(--sys-link)] [&::-webkit-details-marker]:hidden">
        <span className="inline-block transition-transform group-open:rotate-90">▸</span>
        <span className="group-open:hidden">{label}</span>
        <span className="hidden group-open:inline">{openLabel}</span>
      </summary>
      <div className="mt-1.5">{children}</div>
    </details>
  );
}

export function MmrpgHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}

export function SearchForm({ base, q, placeholder, hidden }: { base: string; q: string; placeholder: string; hidden: Query }) {
  return (
    <form method="get" action={base} className="mb-4 flex gap-2" data-search>
      <input type="search" name="q" defaultValue={q} placeholder={placeholder} className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--mmrpg)]" />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--mmrpg)] hover:text-[var(--text)]">Search</button>
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
      {/* A real link, so it takes the link colour. On the brand red it measured
          3.2:1 at 11px — the worst contrast on the page as well as more red. */}
      <Link href={base} data-clear hidden={!filtered} className="text-[var(--sys-link)] hover:underline">Clear filters</Link>
    </div>
  );
}

export function EmptyState({ noun, base, hidden }: { noun: string; base: string; hidden?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={hidden}>
      <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No {noun} matches those filters. Try a broader search or <Link href={base} data-clear className="text-[var(--mmrpg)] underline">clear them</Link>.</p>
    </div>
  );
}

export function SectionH({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold uppercase tracking-[0.12em]">{children}</h2>;
}

export { ACCENT };
