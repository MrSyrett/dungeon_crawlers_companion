import Link from "next/link";
import PageHeader from "./PageHeader";

// Shared shell for The Lord of the Rings Roleplaying reference pages (app/lotr/*)
// — the same pieces as DndRef (header, chips, search, count line, empty state,
// cards) in the Elven gold on forest green. Borders and hovers take the brand gold
// var(--lotr); text accents take var(--sys-link), which the LOTR page theme maps
// to the lifted gold (--lotr-ink) so it stays legible on the green panels.
//
// Typography: headings (h1–h3) pick up Ringbearer from the theme, and that face
// reads best in mixed case, so card names here are NOT uppercased (unlike D&D).
// Small eyebrow labels use the Aniron accent face via .font-label (--sys-label).
export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));
export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--lotr)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--lotr)] bg-[var(--panel-2)] text-[var(--sys-link)]";
// Card / entry names: Ringbearer (display face), mixed case.
export const nameCls = "font-display text-lg leading-tight text-[var(--sys-link)]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]";
export const hbBadge = "rounded border border-[var(--lotr)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]";
// Eyebrow label (Aniron accent face) — used where D&D uses a tracked uppercase label.
export const eyebrow = "font-label text-[12px] tracking-[0.08em] text-[var(--sys-sub)]";
// Section heading inside a page (Ringbearer via the h2/h3 theme rule).
export const sectionH = "mb-2 text-xl text-[var(--sys-link)]";
export const accent = "var(--sys-link)";
// Tables
export const th = "border-b border-[var(--border)] px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]";
export const td = "border-b border-[var(--border)] px-2 py-1.5 align-top text-[12.5px] text-[var(--muted)]";
export const isHb = (x: { source?: string }) => x.source === "Homebrew";

// ── Source filter ──────────────────────────────────────────────────────────
// LotR has one book ("core") plus the user's Homebrew. `srcChips` builds the
// Source row only when homebrew is actually present (so no chip filters to nothing).
export const srcKey = (source?: string): string => (source === "Homebrew" ? "hb" : "core");
export function srcChips(sources: (string | undefined)[]): { key: string; label: string }[] {
  const present = new Set(sources.map(srcKey));
  return present.has("hb") ? [{ key: "core", label: "Core" }, { key: "hb", label: "Homebrew" }] : [];
}

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch }; const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString(); return s ? `${base}?${s}` : base;
}
export function LotrHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}
// A ModeRow switches between differently-shaped VIEWS (equipment: weapons table
// vs gear cards), so it stays a real navigation. Its first option is the default.
export function ModeRow({ base, current, param, options, active }: { base: string; current: Query; param: string; options: { key: string; label: string }[]; active: string }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {options.map((o) => <Link key={o.key} href={withParams(base, { ...current, [param]: o.key === options[0].key ? "" : o.key }, {})} aria-pressed={(active || options[0].key) === o.key} className={`${chipBase} ${(active || options[0].key) === o.key ? chipOn : chipOff}`}>{o.label}</Link>)}
    </div>
  );
}
export function SearchForm({ base, q, placeholder, hidden }: { base: string; q: string; placeholder: string; hidden: Query }) {
  return (
    <form method="get" action={base} className="mb-4 flex gap-2" data-search>
      <input type="search" name="q" defaultValue={q} placeholder={placeholder} className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--lotr)]" />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--lotr)] hover:text-[var(--text)]">Search</button>
    </form>
  );
}
// Chips are plain <a>s with data-chip attributes: inside an <InstantFilter> a
// click filters in place; the href is the no-JS / new-tab fallback.
export function ChipRow({ label, base, current, param, options, active }: { label: string; base: string; current: Query; param: string; options: { key: string; label: string }[]; active: string }) {
  if (!options.length) return null;
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
      <span className="font-label mr-1 text-[12px] tracking-[0.06em] text-[var(--sys-sub)]">{label}</span>
      <a href={withParams(base, current, { [param]: "" })} data-chip={`${param}:`} aria-pressed={!active} className={`${chipBase} ${active ? chipOff : chipOn}`}>All</a>
      {options.map((o) => <a key={o.key} href={withParams(base, current, { [param]: o.key })} data-chip={`${param}:${o.key}`} aria-pressed={active === o.key} className={`${chipBase} ${active === o.key ? chipOn : chipOff}`}>{o.label}</a>)}
    </div>
  );
}
export function CountLine({ count, noun, base, filtered, plural }: { count: number; noun: string; base: string; filtered: boolean; plural?: string }) {
  return (
    <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      <span data-count data-noun={noun} data-plural={plural} aria-live="polite">{count} {count === 1 ? noun : plural ?? noun + "s"}</span>
      <Link href={base} data-clear hidden={!filtered} className="text-[var(--sys-link)] hover:underline">Clear filters</Link>
    </div>
  );
}
export function EmptyState({ noun, base, hidden }: { noun: string; base: string; hidden?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={hidden}><h2 className="text-xl">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No {noun} matches those filters. Try a broader search or <Link href={base} data-clear className="text-[var(--sys-link)] underline">clear them</Link>.</p></div>
  );
}
// Back link for ?param detail views.
export function BackLink({ href, label }: { href: string; label: string }) {
  return <a href={href} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← {label}</a>;
}
// In-page section nav (anchor chips) for long reference pages.
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Sections" className="mb-6 flex flex-wrap gap-1.5">
      {items.map((i) => <a key={i.id} href={`#${i.id}`} className={`${chipBase} ${chipOff}`}>{i.label}</a>)}
    </nav>
  );
}
// Label: value line (dt/dd), used in cards.
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><dt className="inline font-semibold text-[var(--text)]">{label}:</dt> <dd className="inline">{children}</dd></div>;
}
// Short bullet list (benefits, rules notes).
export function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  if (!items.length) return null;
  return (
    <ul className={`flex list-disc flex-col gap-1 pl-4 text-[12.5px] leading-relaxed text-[var(--muted)] marker:text-[var(--lotr)] ${className}`}>
      {items.map((x, i) => <li key={i}>{x}</li>)}
    </ul>
  );
}
// "+1 STR, +1 CHA" from an ability map.
export function asiText(asi: Partial<Record<string, number>> | undefined): string {
  if (!asi) return "—";
  const parts = Object.entries(asi).filter(([, v]) => v).map(([k, v]) => `${k} +${v}`);
  return parts.length ? parts.join(", ") : "—";
}
