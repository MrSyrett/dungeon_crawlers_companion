import Link from "next/link";

// Shared shell for the Star Wars reference pages (app/sw/*) — same pieces as
// AceRef / KobRef / NimbleRef in the WEG cover yellow. `code()` renders pips as a die code.
export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));
export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--sw)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--sw)] bg-[var(--panel-2)] text-[#f0c020]";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const hbBadge = "rounded border border-[var(--sw)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#f0c020]";

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch }; const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString(); return s ? `${base}?${s}` : base;
}
export function SwHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div><h1 className="font-display text-3xl font-black tracking-wide">{title}</h1><p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--sw)] sm:text-[11px] sm:tracking-[0.35em]">{subtitle}</p></div>
      <div className="flex shrink-0 gap-2">
        <Link href="/sw/homebrew" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--sw)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">My Homebrew</Link>
        <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">← Home</Link>
      </div>
    </header>
  );
}
export function SearchForm({ base, q, placeholder, hidden }: { base: string; q: string; placeholder: string; hidden: Query }) {
  return (
    <form method="get" action={base} className="mb-4 flex gap-2">
      <input type="search" name="q" defaultValue={q} placeholder={placeholder} className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--sw)]" />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--sw)] hover:text-[var(--text)]">Search</button>
    </form>
  );
}
export function ChipRow({ label, base, current, param, options, active }: { label: string; base: string; current: Query; param: string; options: { key: string; label: string }[]; active: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
      <Link href={withParams(base, current, { [param]: "" })} className={`${chipBase} ${active ? chipOff : chipOn}`}>All</Link>
      {options.map((o) => <Link key={o.key} href={withParams(base, current, { [param]: o.key })} className={`${chipBase} ${active === o.key ? chipOn : chipOff}`}>{o.label}</Link>)}
    </div>
  );
}
export function CountLine({ count, noun, base, filtered }: { count: number; noun: string; base: string; filtered: boolean }) {
  return (
    <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      <span>{count} {count === 1 ? noun : noun + "s"}</span>
      {filtered ? <Link href={base} className="text-[var(--sw)] hover:underline">Clear filters</Link> : null}
    </div>
  );
}
export function EmptyState({ noun, base }: { noun: string; base: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6"><h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No {noun} matches those filters. Try a broader search or <Link href={base} className="text-[var(--sw)] underline">clear them</Link>.</p></div>
  );
}
/** Pips → die code: 11 → "3D+2". */
export function code(pips: number | null | undefined): string {
  if (pips == null) return "—";
  const d = Math.floor(pips / 3), p = pips % 3;
  return d ? `${d}D${p ? "+" + p : ""}` : p ? `+${p}` : "0D";
}
/** Small book tag: RC for Rules Companion entries, SB for Sourcebook ones. */
export function BookTag({ book }: { book: "core" | "sourcebook" | "companion" }) {
  if (book === "companion") return <span className={`${badge} ml-2 border-[var(--sw)] text-[var(--sw)]`} title="Rules Companion (1989)">RC</span>;
  if (book === "sourcebook") return <span className={`${badge} ml-2`} title="The Star Wars Sourcebook (1987)">SB</span>;
  return null;
}
export const BOOK_NAME = { core: "Core rulebook", sourcebook: "Sourcebook", companion: "Rules Companion" } as const;
