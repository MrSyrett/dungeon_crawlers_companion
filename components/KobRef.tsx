import Link from "next/link";
import PageHeader from "./PageHeader";
import { KOB_BOOKS } from "@/lib/data/kob-books";
import type { KobBook } from "@/lib/data/kob-types";

// Shared bits for the Kids on Bikes reference pages (app/kob/*): the same
// shell as the ACE pages (components/AceRef.tsx) in the KoB purple, plus a
// "Book" chip row for Bikes / Brooms / Capes.

export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--kob)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--kob)] bg-[var(--panel-2)] text-[#d9c2ff]";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#d9c2ff]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const bookBadge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const hbBadge = "rounded border border-[var(--kob)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#d9c2ff]";

const BOOK_NAME: Record<string, string> = Object.fromEntries(KOB_BOOKS.map((b) => [b.key, b.name]));
export function bookName(key: KobBook | string): string {
  return BOOK_NAME[key] ?? key;
}
export const BOOKS: { key: KobBook; label: string }[] = KOB_BOOKS.map((b) => ({ key: b.key, label: b.name }));
export function isBook(v: string): v is KobBook {
  return KOB_BOOKS.some((b) => b.key === v);
}

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `${base}?${s}` : base;
}

export function KobHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}

export function SearchForm({ base, q, placeholder, hidden }: { base: string; q: string; placeholder: string; hidden: Query }) {
  return (
    <form method="get" action={base} className="mb-4 flex gap-2" data-search>
      <input
        type="search"
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--kob)]"
      />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--kob)] hover:text-[var(--text)]">
        Search
      </button>
    </form>
  );
}

export function ChipRow({ label, base, current, param, options, active }: { label: string; base: string; current: Query; param: string; options: { key: string; label: string }[]; active: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
      <a href={withParams(base, current, { [param]: "" })} data-chip={`${param}:`} aria-pressed={!active} className={`${chipBase} ${active ? chipOff : chipOn}`}>All</a>
      {options.map((o) => (
        <a key={o.key} href={withParams(base, current, { [param]: o.key })} data-chip={`${param}:${o.key}`} aria-pressed={active === o.key} className={`${chipBase} ${active === o.key ? chipOn : chipOff}`}>{o.label}</a>
      ))}
    </div>
  );
}

export function CountLine({ count, noun, base, filtered }: { count: number; noun: string; base: string; filtered: boolean }) {
  return (
    <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      <span data-count data-noun={noun} aria-live="polite">{count} {count === 1 ? noun : noun + "s"}</span>
      <Link href={base} data-clear hidden={!filtered} className="text-[var(--kob)] hover:underline">Clear filters</Link>
    </div>
  );
}

export function EmptyState({ noun, base, hidden }: { noun: string; base: string; hidden?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={hidden}>
      <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        No {noun} matches those filters. Try a broader search or <Link href={base} data-clear className="text-[var(--kob)] underline">clear them</Link>.
      </p>
    </div>
  );
}
