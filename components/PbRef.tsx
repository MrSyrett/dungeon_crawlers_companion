import Link from "next/link";
import PageHeader from "./PageHeader";
import type { PbRoll, PbRollEntry, PbFeature, PbClassTable, PbWeapon, PbClothing, PbHat, PbMonster, PbShip, PbAbilityMods, PbRank } from "@/lib/data/pb-types";

// Shared shell + renderers for the Pirate Borg reference pages (app/pirate-borg/*).
// Same pieces as DbRef/LotrRef (header, chips, search, count line, empty state,
// cards, d-tables) in blood red on black. Borders and hovers take the brand blood
// var(--pb); text accents take var(--sys-link) (the lifted --pb-ink, readable on
// the near-black panels). Blackletter titles and section heads are WHITE
// (--sys-head). Eyebrow labels use 1651 Alchemy (--sys-label) in bone.
//
// Numerals: 1651 Alchemy has old-style figures (and no < > ^ ~ { } \ glyphs), so
// every roll, die, DR and stat value is set in EB Garamond with lining figures via
// `num`. Keep digits out of Alchemy-lettered text (h3, eyebrows) where possible.
export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));
export const num = "[font-family:var(--font-garamond),Georgia,serif] lining-nums tabular-nums";
export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--pb)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--pb)] bg-[var(--panel-2)] text-[var(--sys-link)]";
// Card / entry names: h3 → 1651 Alchemy via the PB theme rule.
export const nameCls = "text-[19px] leading-tight text-[var(--sys-link)]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = `rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] ${num}`;
// Same chip without the uppercase transform, for dice / durations / pages ("d6 2", "d4 rounds").
export const dBadge = `rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px] font-semibold tracking-[0.04em] text-[var(--muted)] ${num}`;
export const hbBadge = "rounded border border-[var(--pb)] px-1.5 py-0.5 align-middle font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]";
export const eyebrow = "font-label text-[14px] tracking-[0.04em] text-[var(--sys-sub)]";
// Section heading inside a page (JSL Blackletter via the h2 theme rule), in white.
export const sectionH = "mb-3 text-2xl text-[var(--sys-head)]";
export const accent = "var(--sys-link)";
export const rollCls = `${num} w-12 shrink-0 text-[13px] font-semibold text-[var(--pb-ink)]`;
// An inline roll / numeral in front of an entry name.
export const rollTag = `${num} mr-1.5 text-[16px] font-semibold text-[var(--pb-ink)]`;
// Tables
export const th = "border-b border-[var(--border)] px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]";
export const td = "border-b border-[var(--border)] px-2 py-1.5 align-top text-[13px] text-[var(--muted)]";
export const tdNum = `${td} ${num} text-[var(--text)]`;
export const tableWrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
export const isHb = (x: object): boolean => (x as { source?: unknown }).source === "Homebrew";
export function HbBadge({ x }: { x: object }) {
  return isHb(x) ? <span className={hbBadge}>Homebrew</span> : null;
}

// ── Source filter ──────────────────────────────────────────────────────────
// Pirate Borg content comes from the Player's Guidebook, the Core Rules (with its
// module The Curse of Skeleton Point), the Trapped in the Tropics adventure and
// the user's Homebrew. A record printed in several books lists them all in
// `sources`; the Source chips match ANY of them (an array facet), so a zombie in
// both the Core Rules and Trapped in the Tropics shows under either. The Source
// row only appears when more than one source is present.
const SRC_ORDER = ["core", "pg", "sp", "tt", "hb"];
const SRC_LABEL: Record<string, string> = { core: "Core Rules", pg: "Player's Guidebook", sp: "Skeleton Point", tt: "Trapped in the Tropics", hb: "Homebrew" };
export const srcKey = (source?: string): string =>
  source === "Homebrew" ? "hb" : source === "Trapped in the Tropics" ? "tt" : source === "Core Rules" ? "core" : source === "The Curse of Skeleton Point" ? "sp" : "pg";
type Sourced = { source?: string; page?: number; sources?: unknown };
/** Every book a record appears in (primary first). */
export function sourceRefs(x: Sourced): { source: string; page: number; note?: string }[] {
  const list = Array.isArray(x.sources) ? (x.sources as { source: string; page: number; note?: string }[]) : [];
  return list.length ? list : [{ source: x.source ?? "", page: x.page ?? 0 }];
}
/** Source keys for an array facet. */
export const srcKeys = (x: Sourced): string[] => [...new Set(sourceRefs(x).map((r) => srcKey(r.source)))];
export function srcChips(sources: (string | undefined)[]): { key: string; label: string }[] {
  const present = new Set(sources.map(srcKey));
  if (present.size < 2) return [];
  return SRC_ORDER.filter((k) => present.has(k)).map((k) => ({ key: k, label: SRC_LABEL[k] }));
}
/** "Core Rules pg. 94 · Trapped in the Tropics TitT 27" for a detail view. */
export function sourcesLine(x: Sourced): string {
  if (x.source === "Homebrew") return "Homebrew";
  return sourceRefs(x).map((r) => `${r.source}${r.page ? `, ${r.source === "Trapped in the Tropics" ? "p." : "pg."} ${r.page}` : ""}${r.note ? ` (${r.note})` : ""}`).join(" · ");
}

/** "Name." — but "Down to the Locker!" keeps its own punctuation. */
export const dot = (name: string): string => (/[.!?]$/.test(name) ? name : `${name}.`);
export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch }; const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString(); return s ? `${base}?${s}` : base;
}
export function PbHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}
// A ModeRow switches between differently-shaped VIEWS (gear: weapons tables vs
// the price list), so it stays a real navigation. Its first option is the default.
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
      <input type="search" name="q" defaultValue={q} placeholder={placeholder} className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--pb)]" />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--pb)] hover:text-[var(--text)]">Search</button>
    </form>
  );
}
// Chips are plain <a>s with data-chip attributes: inside an <InstantFilter> a
// click filters in place; the href is the no-JS / new-tab fallback.
export function ChipRow({ label, base, current, param, options, active }: { label: string; base: string; current: Query; param: string; options: { key: string; label: string }[]; active: string }) {
  if (!options.length) return null;
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
      <span className="font-label mr-1 text-[13px] tracking-[0.04em] text-[var(--sys-sub)]">{label}</span>
      <a href={withParams(base, current, { [param]: "" })} data-chip={`${param}:`} aria-pressed={!active} className={`${chipBase} ${active ? chipOff : chipOn}`}>All</a>
      {options.map((o) => <a key={o.key} href={withParams(base, current, { [param]: o.key })} data-chip={`${param}:${o.key}`} aria-pressed={active === o.key} className={`${chipBase} ${active === o.key ? chipOn : chipOff}`}>{o.label}</a>)}
    </div>
  );
}
export function CountLine({ count, noun, base, filtered, plural }: { count: number; noun: string; base: string; filtered: boolean; plural?: string }) {
  return (
    <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      <span data-count data-noun={noun} data-plural={plural} aria-live="polite" className={num}>{count} {count === 1 ? noun : plural ?? noun + "s"}</span>
      <Link href={base} data-clear hidden={!filtered} className="text-[var(--sys-link)] hover:underline">Clear filters</Link>
    </div>
  );
}
export function EmptyState({ noun, base, hidden }: { noun: string; base: string; hidden?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={hidden}><h2 className="text-2xl">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No {noun} matches those filters. Try a broader search or <Link href={base} data-clear className="text-[var(--sys-link)] underline">clear them</Link>.</p></div>
  );
}
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
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><dt className="inline font-semibold text-[var(--text)]">{label}:</dt> <dd className="inline">{children}</dd></div>;
}
export function Bullets({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  const list = items.filter((x) => x != null && x !== "");
  if (!list.length) return null;
  return (
    <ul className={`flex list-disc flex-col gap-1 pl-4 text-[13px] leading-relaxed text-[var(--muted)] marker:text-[var(--pb)] ${className}`}>
      {list.map((x, i) => <li key={i}>{x}</li>)}
    </ul>
  );
}
export function RuleNote({ title, children, className = "mb-6" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`${cardCls} ${className}`}>
      <p className={eyebrow}>{title}</p>
      <div className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{children}</div>
    </section>
  );
}
// A numeral or die value inline in running text / labels.
export function N({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`${num} ${className}`}>{children}</span>;
}

// ── formatting ─────────────────────────────────────────────────────────────
export function rollText(r?: PbRoll | null): string {
  if (r == null) return "";
  return Array.isArray(r) ? (r[0] === r[1] ? `${r[0]}` : `${r[0]}–${r[1]}`) : `${r}`;
}
/** Ability modifier with a real minus: +2, −1, ±0. */
export function signed(n: number | null | undefined): string {
  if (n == null) return "—";
  return n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "±0";
}
/** Silver price: 25 → "25s"; null → "—". */
export const silver = (c: number | null | undefined): string => (c == null ? "—" : `${c}s`);
/** "-d2" style armor die: "d4" → "−d4". */
export const armorDie = (d?: string | null): string => (d ? `−${d.replace(/^[-−]/, "")}` : "—");
/** Book pages: printed page numbers (the Guidebook's PDF page + 20). */
export const pageText = (x: { page?: number; source?: string }): string => (x.source === "Homebrew" || !x.page ? "" : `${x.source === "Trapped in the Tropics" ? "TitT" : "pg."} ${x.page}`);
export const ABIL_ORDER = ["STRENGTH", "AGILITY", "PRESENCE", "TOUGHNESS", "SPIRIT"] as const;
export const ABIL_SHORT: Record<string, string> = { STRENGTH: "STR", AGILITY: "AGI", PRESENCE: "PRE", TOUGHNESS: "TOU", SPIRIT: "SPI" };
export function abilityLine(a: PbAbilityMods | null | undefined): string {
  if (!a) return "—";
  const parts = ABIL_ORDER.filter((k) => a[k]).map((k) => `${k} ${signed(a[k])}`);
  return parts.length ? parts.join(", ") : "no modifiers";
}

// ── d-tables ───────────────────────────────────────────────────────────────
type Row = { roll?: PbRoll; name?: string; text?: string; hidden?: string; answer?: unknown; orLess?: unknown; orMore?: unknown; sub?: { die: string; rows: PbRollEntry[] } };
/** A row's roll label: "≤4" / "11+" for open-ended rows (2d6 + SPIRIT). */
export function rowRoll(r: Row): string {
  if (r.roll == null) return "";
  const lo = Array.isArray(r.roll) ? r.roll[0] : r.roll, hi = Array.isArray(r.roll) ? r.roll[1] : r.roll;
  if (r.orLess) return `≤${hi}`;
  if (r.orMore) return `${lo}+`;
  return rollText(r.roll);
}
/** Drop a row name the text already starts with ("Flooded" + "Flooded: half the rate."). */
const rowName = (r: Row): string => (r.name && !(r.text ?? "").toLowerCase().startsWith(r.name.toLowerCase()) ? r.name : "");
export function DieTable({ title, die, rows, note, id, cols }: { title?: string; die?: string | null; rows: Row[]; note?: string; id?: string; cols?: 1 | 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : cols === 2 ? "md:grid-cols-2" : "";
  return (
    <div className="min-w-0" id={id}>
      {title ? <p className={eyebrow}>{title}{die ? <span className={`${num} ml-2 text-[14px] font-semibold text-[var(--pb-ink)]`}>{die}</span> : null}</p> : null}
      {note ? <p className="mt-0.5 text-[12.5px] italic leading-relaxed text-[var(--muted)]">{note}</p> : null}
      <ol className={`mt-1.5 grid gap-x-6 gap-y-1 text-[13px] leading-relaxed text-[var(--muted)] ${grid}`}>
        {rows.map((r, i) => (
          <li key={i} className="flex gap-2 break-inside-avoid">
            {r.roll != null ? <span className={`${rollCls} leading-[1.45rem]`}>{rowRoll(r)}</span> : null}
            <span className="min-w-0">
              {rowName(r) ? <span className="font-semibold text-[var(--text)]">{rowName(r)}{r.text ? ". " : ""}</span> : null}{r.text}
              {r.hidden ? <> <em className="text-[var(--text)] opacity-80">{r.hidden}</em></> : null}
              {typeof r.answer === "string" ? <span className="mt-0.5 block text-[12px] italic"><span className="font-semibold not-italic text-[var(--sys-link)]">Answer:</span> {r.answer}</span> : null}
              {r.sub ? (
                <span className="mt-0.5 block text-[12.5px]"><N className="text-[var(--pb-ink)]">{r.sub.die}</N>: {r.sub.rows.map((s, j) => <span key={j}>{j ? " · " : ""}<N className="text-[var(--text)]">{rollText(s.roll)}</N> {s.text}</span>)}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
// ── generic PbTable (GM tables, generators) ────────────────────────────────
type AnyTable = { id?: string; name: string; die: string; dice?: unknown; page?: number; source?: string; note?: string; rows?: PbRollEntry[]; columns?: { die: string; name: string; values: string[] }[] };
/** Data notes speak of fields ("the `hidden` part"); say it the way the page shows it. */
export const cleanNote = (n?: string): string | undefined =>
  n?.replace(/\s*Converting from another system[^.]*\.?(\s*[^.]*Hit Dice\.)?/, "").replace(/[Tt]ext in the `hidden` (part|field)/g, "Text in italics").replace(/The `answer` is the GM's explanation\./, "The answer under each riddle is for the GM.").replace(/`([^`]+)`/g, "$1");
/** The dice to roll for a table: "4d20" for carousing, else its die. */
export const tableDice = (t: AnyTable): string => (typeof t.dice === "string" && t.dice ? t.dice : t.die);
/** A PbTable as a d-list, or — when it has several columns — as a real grid
 *  (carousing, names, alchemy, history d66: first die = column, second = row). */
export function GenTable({ t, cols, bare }: { t: AnyTable; cols?: 1 | 2 | 3; bare?: boolean }) {
  const columns = t.columns ?? [];
  const rows = t.rows ?? [];
  if (columns.length > 1) {
    const n = Math.max(...columns.map((c) => c.values.length));
    const grid66 = t.die === "d66" && columns.length === 6 && n === 6;
    const labels = Array.from({ length: n }, (_, i) => (!grid66 && rows.length === n ? rowRoll(rows[i]) : `${i + 1}`));
    return (
      <div className={bare ? "" : "mt-1.5"}>
        {t.note ? <p className="mb-1.5 text-[12.5px] italic leading-relaxed text-[var(--muted)]">{cleanNote(t.note)}</p> : null}
        <div className="overflow-x-auto rounded border border-[var(--border)]">
          <table className={`w-full border-collapse ${columns.length > 3 ? "min-w-[720px]" : "min-w-[480px]"}`}>
            <thead><tr>
              <th className={`${th} w-12`}>{grid66 ? <N>d6</N> : <N>{t.die === "d66" ? "d66" : columns[0].die}</N>}</th>
              {columns.map((c, i) => <th key={i} className={th}>{grid66 ? <><N className="mr-1 text-[var(--pb-ink)]">{i + 1}</N></> : null}{c.name}</th>)}
            </tr></thead>
            <tbody>{labels.map((l, i) => (
              <tr key={i}>
                <td className={`${tdNum} font-semibold text-[var(--pb-ink)]`}>{l}</td>
                {columns.map((c, j) => <td key={j} className={td}>{c.values[i] ?? ""}</td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    );
  }
  const list: Row[] = rows.length ? rows : (columns[0]?.values ?? []).map((v, i) => ({ roll: i + 1, text: v }));
  const c = cols ?? (list.length > 24 ? 3 : list.length > 10 ? 2 : 1);
  return <div className={bare ? "" : "mt-0.5"}><DieTable rows={list} note={cleanNote(t.note)} cols={c} /></div>;
}
/** Digits inside Alchemy-lettered text set in EB Garamond ("Broken (0 HP)"). */
export function Numerals({ text }: { text: string }) {
  return <>{text.split(/(\d+)/).map((p, i) => (i % 2 ? <N key={i}>{p}</N> : p))}</>;
}
/** A titled card around GenTable (name, dice, page). */
export function TableCard({ t, id, cols, className = "", children }: { t: AnyTable; id?: string; cols?: 1 | 2 | 3; className?: string; children?: React.ReactNode }) {
  return (
    <section id={id} className={`${cardCls} min-w-0 scroll-mt-20 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[19px] leading-tight text-[var(--text)]"><Numerals text={t.name} /> <N className="ml-1 text-[15px] font-semibold text-[var(--pb-ink)]">{tableDice(t)}</N></h3>
        {t.page ? <span className={dBadge}>{pageText({ page: t.page, source: t.source })}</span> : null}
      </div>
      <GenTable t={t} cols={cols} />
      {children}
    </section>
  );
}

/** A simple { roll, name } list (pets, instruments) rendered compactly. */
export function MiniTable({ title, die, rows }: { title: string; die: string; rows: { roll: PbRoll; name?: string; text?: string }[] }) {
  return (
    <div className="mt-2 rounded border border-[var(--border)] bg-[var(--panel-2)] p-2.5">
      <p className="text-[12px] font-semibold text-[var(--text)]">{title} <N className="text-[var(--pb-ink)]">{die}</N></p>
      <p className="mt-0.5 text-[12.5px] leading-relaxed text-[var(--muted)]">{rows.map((r, i) => <span key={i}>{i ? " · " : ""}<N className="text-[var(--pb-ink)]">{rollText(r.roll)}</N> {r.name ?? r.text}</span>)}</p>
    </div>
  );
}

// ── class features ─────────────────────────────────────────────────────────
const WHEN_LABEL: Record<string, string> = { start: "When you begin", experience: "Each time you gain experience", both: "When you begin & each experience" };
export function rankLine(ranks?: Record<PbRank, Record<string, unknown>>): string {
  if (!ranks) return "";
  const fmt = (k: string, v: unknown): string => k === "damage" ? `${v} damage` : k === "dr" ? `DR${v}` : k === "targets" ? `${v} ${v === 1 ? "soul" : "souls"}` : k === "count" ? `${v} ${v === "1" ? "thrall" : "thralls"}` : String(v);
  return (["I", "II", "III"] as const).map((r) => `${r}: ${Object.entries(ranks[r] ?? {}).map(([k, v]) => fmt(k, v)).join(", ")}`).join(" · ");
}
export function FeatureRow({ f }: { f: PbFeature & { numeral?: string; ranks?: Record<PbRank, Record<string, unknown>> } }) {
  return (
    <li className="flex gap-2">
      <span className={`${rollCls} leading-[1.5rem]`}>{f.numeral ?? rollText(f.roll)}</span>
      <div className="min-w-0 text-[13px] leading-relaxed text-[var(--muted)]">
        <span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.text}
        {f.ranks ? <span className="mt-0.5 block text-[12.5px]"><span className="font-semibold text-[var(--text)]">By rank — </span><N>{rankLine(f.ranks)}</N></span> : null}
        {f.again ? <span className="mt-0.5 block text-[12.5px]"><span className="font-semibold text-[var(--sys-link)]">If taken again:</span> {f.again.text}</span> : null}
      </div>
    </li>
  );
}
export function FeatureTable({ t }: { t: PbClassTable }) {
  const extra: string[] = [];
  if (t.rerollRepeats) extra.push("Reroll repeats.");
  if (t.repeatUpgrades) extra.push("A repeat roll upgrades the feature.");
  if (t.maxPicksEach && t.maxPicksEach > 1) extra.push(`Each can be taken up to ${t.maxPicksEach} times.`);
  return (
    <section className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3" id={`t-${t.id}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[19px] text-[var(--text)]">{t.name} <N className="ml-1 text-[15px] font-semibold text-[var(--pb-ink)]">{t.die}</N></h3>
        <span className={badge}>{WHEN_LABEL[t.when] ?? t.when}</span>
      </div>
      {t.note || extra.length ? <p className="mt-1 text-[12.5px] italic leading-relaxed text-[var(--muted)]">{t.note ?? extra.join(" ")}</p> : null}
      <ol className="mt-2 flex flex-col gap-1.5">{t.rows.map((f) => <FeatureRow key={f.id} f={f} />)}</ol>
    </section>
  );
}
/** Five-ability modifier grid (STR AGI PRE TOU SPI). */
export function AbilityGrid({ a }: { a: PbAbilityMods }) {
  return (
    <div className="grid grid-cols-5 gap-1 text-center">
      {ABIL_ORDER.map((k) => (
        <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel)] px-0.5 py-1">
          <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{ABIL_SHORT[k]}</div>
          <div className={`${num} text-[15px] font-semibold ${a[k] ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>{signed(a[k])}</div>
        </div>
      ))}
    </div>
  );
}

// ── weapons & armor ────────────────────────────────────────────────────────
type RowAttrs = (i: number) => { hidden?: boolean; "data-f"?: string };
export function weaponNotes(w: PbWeapon): string {
  const n: string[] = [];
  if (w.hands === 2) n.push("two-handed");
  if (w.reach) n.push(`${w.reach}' reach`);
  if (w.range) n.push(`range ${w.range}'`);
  if (w.reload) n.push(`Reload ${w.reload}`);
  if (w.blackPowder) n.push("black powder (ignores armor)");
  if (w.thrown) n.push("thrown");
  if (w.special) n.push(w.special);
  return n.join(" · ");
}
export function WeaponTable({ rows, attrs }: { rows: PbWeapon[]; attrs?: RowAttrs }) {
  return (
    <div className={tableWrap}>
      <table className="w-full min-w-[560px] border-collapse">
        <thead><tr>{["Weapon", "Damage", "Cost", "Notes"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((w, i) => (
            <tr key={`${w.id}-${i}`} {...(attrs ? attrs(i) : {})}>
              <td className={`${td} font-semibold text-[var(--text)]`}>{w.name} <HbBadge x={w} /></td>
              <td className={`${tdNum} whitespace-nowrap`}>{w.damage ?? "—"}</td>
              <td className={`${tdNum} whitespace-nowrap`}>{silver(w.cost)}</td>
              <td className={td}>{weaponNotes(w) || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function ClothingTable({ rows }: { rows: PbClothing[] }) {
  return (
    <div className={tableWrap}>
      <table className="w-full min-w-[560px] border-collapse">
        <thead><tr>{["d10", "Clothing / armor", "Tier", "Armor", "Cost", "Effect"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((c, i) => (
            <tr key={`${c.id}-${i}`}>
              <td className={`${tdNum} text-[var(--pb-ink)]`}>{isHb(c) ? "—" : rollText(c.roll)}</td>
              <td className={`${td} font-semibold text-[var(--text)]`}>{c.name} <HbBadge x={c} /></td>
              <td className={tdNum}>{c.tier}</td>
              <td className={tdNum}>{armorDie(c.armorDie)}</td>
              <td className={tdNum}>{silver(c.cost)}</td>
              <td className={td}>{c.special ?? (c.tier === 0 ? "No protection" : "—")}{c.metal ? <span className="block text-[11.5px] italic">Metal — blocks most relics &amp; rituals</span> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function HatTable({ rows }: { rows: PbHat[] }) {
  return (
    <div className={tableWrap}>
      <table className="w-full min-w-[480px] border-collapse">
        <thead><tr>{["d12", "Hat", "Cost", "Effect"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((h, i) => (
            <tr key={`${h.id}-${i}`}>
              <td className={`${tdNum} text-[var(--pb-ink)]`}>{isHb(h) ? "—" : rollText(h.roll)}</td>
              <td className={`${td} font-semibold text-[var(--text)]`}>{h.name} <HbBadge x={h} /></td>
              <td className={tdNum}>{silver(h.cost)}</td>
              <td className={td}>{h.special ?? (h.none ? "No hat" : "—")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── monster stat block (MÖRK BORG style) ───────────────────────────────────
export const BESTIARY = "/pirate-borg/bestiary";
const CAT_LABEL: Record<string, string> = { npc: "NPC", undead: "Undead", beast: "Beast", spirit: "Spirit", monster: "Monster", flora: "Flora", construct: "Construct" };
export const catLabel = (c: string): string => CAT_LABEL[c] ?? (c ? c.charAt(0).toUpperCase() + c.slice(1) : "Other");
export const moraleText = (m: number | null | undefined): string => (m == null ? "–" : `${m}`);
/** HP as printed: rolled ("2d8"), shared ("4 each") or "N/A" when the block says so. */
export const hpLabel = (m: PbMonster): string => (typeof m.hpText === "string" && m.hpText ? m.hpText : `${m.hp}`);
export const moraleLabel = (m: PbMonster): string => (typeof m.moraleText === "string" && m.moraleText ? m.moraleText : moraleText(m.morale));
export function monsterArmor(m: PbMonster): string {
  return m.armor ? `${m.armor.name} ${armorDie(m.armor.die)}` : "No armor";
}
const CHOICE_LABEL: Record<string, string> = { "one of": "one of", "pick 1-2": "choose 1 or 2" };
export const choiceLabel = (m: PbMonster): string => (typeof m.attackChoice === "string" ? CHOICE_LABEL[m.attackChoice] ?? m.attackChoice : m.attackChoice ? "one of" : "");
export function attackLine(m: PbMonster): string {
  return m.attacks.map((a) => `${a.name}${a.damage ? ` ${a.damage}` : ""}`).join(m.attackChoice ? " / " : ", ");
}
type InTable = { die: string; name: string; note?: string; rows: PbRollEntry[] };
/** The in-block roll tables (belly of a seagull, albatross omen, despair…) — never attacks. */
export function blockTables(m: PbMonster): { key: string; t: InTable }[] {
  return (["lootTable", "omenTable", "effectTable"] as const).flatMap((k) => (m[k] && typeof m[k] === "object" ? [{ key: k, t: m[k] as InTable }] : []));
}
const lc = (x: string) => x.toLowerCase().replace(/[.\s]+$/, "");
/** Which special prints a table inline ("roll d6: 1 …; 2 …"): its enumeration is
 *  replaced by the table, keeping the sentences that are not part of it. */
function specialOwner(m: PbMonster, t: InTable): number {
  const first = lc(t.rows[0]?.text ?? "").slice(0, 14);
  return first ? m.specials.findIndex((s) => s.text.toLowerCase().includes(first)) : -1;
}
function specialLead(text: string, t: InTable): string {
  const first = lc(t.rows[0]?.text ?? "").slice(0, 14);
  return text.split(/(?<=[.!?])\s+(?=[A-Z])/).filter((x) => !x.toLowerCase().includes(first)).join(" ");
}
function Stat({ k, v, wide }: { k: string; v: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded border border-[var(--border)] bg-[var(--panel-2)] px-1.5 py-1.5 text-center ${wide ? "col-span-2" : ""}`}>
      <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k}</div>
      <div className={`${num} text-[15px] font-semibold leading-tight text-[var(--text)]`}>{v}</div>
    </div>
  );
}
function AttackList({ attacks }: { attacks: { name: string; damage: string | null; notes?: string }[] }) {
  return (
    <ul className="mt-1 flex flex-col gap-1">
      {attacks.map((a, i) => (
        <li key={i} className="text-[13.5px] leading-relaxed text-[var(--muted)]">
          <span className="font-semibold text-[var(--text)]">{a.name}</span>{a.damage ? <> <N className="font-semibold text-[var(--pb-ink)]">{a.damage}</N></> : null}{a.notes ? <span> — {a.notes}</span> : null}
        </li>
      ))}
    </ul>
  );
}
function InBlockTable({ t }: { t: InTable }) {
  return (
    <div className="mt-1.5 rounded border border-[var(--border)] bg-[var(--panel-2)] p-2.5">
      <p className="text-[12.5px] font-semibold text-[var(--text)]">{t.name} <N className="ml-1 text-[var(--pb-ink)]">{t.die}</N></p>
      <DieTable rows={t.rows} note={t.note} />
    </div>
  );
}
export function MonsterBlock({ m, captainName }: { m: PbMonster; captainName?: string }) {
  const atk = m.dr?.attack ?? 12, def = m.dr?.defend ?? 12;
  const defendWith = typeof m.defendWith === "string" ? m.defendWith : "AGILITY";
  const group = typeof m.group === "string" ? m.group : "";
  const tags = [catLabel(m.category), m.boss ? "Boss" : "", m.named ? "Named" : "", m.summoned ? "Summoned" : "", m.hazard ? "Hazard" : ""].filter(Boolean);
  const loot = Array.isArray(m.loot) ? (m.loot as { name: string; value: string; note?: string }[]) : [];
  const per = m.attacksPerRound != null ? String(m.attacksPerRound) : "";
  const choice = choiceLabel(m);
  const tables = blockTables(m);
  const owners = new Map<number, InTable>();
  const loose: InTable[] = [];
  for (const { t } of tables) { const i = specialOwner(m, t); if (i >= 0 && !owners.has(i)) owners.set(i, t); else loose.push(t); }
  const naval = m.naval && typeof m.naval === "object" ? (m.naval as { hp: number; morale: number | null; armor: { name: string; die: string } | null; speed: number; agility: number; attacks: { name: string; damage: string | null; notes?: string }[] }) : null;
  const notes = [typeof m.drNote === "string" ? m.drNote : "", typeof m.armorNote === "string" ? m.armorNote : ""].filter(Boolean);
  return (
    <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--pb)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-4xl text-[var(--sys-head)]">{m.name} <HbBadge x={m} /></h2>
        <span className="flex flex-wrap gap-1.5">{tags.map((t) => <span key={t} className={badge}>{t}</span>)}{pageText(m) ? <span className={dBadge}>{pageText(m)}</span> : null}</span>
      </div>
      {group ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{group}{typeof m.roll === "number" ? <> · roll <N className="text-[var(--pb-ink)]">{m.roll}</N></> : null}{typeof m.captain === "string" && captainName ? <> · <a href={`${BESTIARY}#captain-${m.captain}`} className="text-[var(--sys-link)] hover:underline">{captainName}</a></> : null}</p> : null}
      {m.text ? <p className="mt-2 text-[14px] italic leading-relaxed text-[var(--muted)]">{m.text}</p> : null}
      <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-5">
        <Stat k="HP" v={`${hpLabel(m)}${m.count ? ` (×${String(m.count)})` : ""}`} />
        <Stat k="Morale" v={moraleLabel(m)} />
        <Stat k="Armor" v={m.armor ? armorDie(m.armor.die) : "none"} />
        <Stat k="DR to hit" v={`DR${atk}`} />
        <Stat k="DR to defend" v={`DR${def}`} />
      </div>
      {typeof m.hpText === "string" && /d/.test(m.hpText) ? <p className="mt-1.5 text-[12px] text-[var(--muted)]">Roll HP <N className="text-[var(--text)]">{m.hpText}</N> (about <N>{m.hp}</N>){typeof m.moraleText === "string" && /d/.test(m.moraleText) ? <> and Morale <N className="text-[var(--text)]">{m.moraleText}</N> (about <N>{moraleText(m.morale)}</N>)</> : null} for each one.</p> : null}
      {m.count ? <p className="mt-1 text-[12px] text-[var(--muted)]">Encountered <N className="text-[var(--text)]">{/^\d+$/.test(String(m.count)) ? `×${String(m.count)}` : String(m.count)}</N> at a time.</p> : null}
      <p className="mt-2 text-[12.5px] text-[var(--muted)]">
        <span className="font-semibold text-[var(--text)]">Armor:</span> {monsterArmor(m)}{m.armor?.tier ? <> (tier <N>{m.armor.tier}</N>)</> : null}
        {defendWith !== "AGILITY" ? <> · <span className="font-semibold text-[var(--text)]">Defend with</span> {defendWith} instead of AGILITY</> : null}
        {m.ignoresArmor ? <> · its attacks ignore armor</> : null}
        {m.blackPowder ? <> · its black powder weapons ignore armor</> : null}
      </p>
      {notes.map((n, i) => <p key={i} className="mt-1 text-[12px] italic text-[var(--muted)]">{n}</p>)}
      {m.attacks.length ? (
        <>
          <p className={`${eyebrow} mt-4`}>Attacks{per ? <span className="ml-2 font-sans text-[12px] text-[var(--muted)]">({/^\d+$/.test(per) ? <><N>{per}</N> per round</> : per})</span> : choice ? <span className="ml-2 font-sans text-[12px] text-[var(--muted)]">({choice})</span> : null}</p>
          {choice === "choose 1 or 2" ? <p className="text-[12px] italic text-[var(--muted)]">Arm each one with one or two of these.</p> : null}
          <AttackList attacks={m.attacks} />
        </>
      ) : null}
      {m.attackTable ? (
        <div className="mt-4"><DieTable title="Attack table" die={m.attackTable.die} note={m.attackTable.note} rows={m.attackTable.rows} /></div>
      ) : null}
      {m.specials.length ? (
        <>
          <p className={`${eyebrow} mt-4`}>Special</p>
          <dl className="mt-1 flex flex-col gap-1 text-[13.5px] leading-relaxed text-[var(--muted)]">
            {m.specials.map((s, i) => {
              const t = owners.get(i);
              return <div key={i}><dt className="inline font-semibold italic text-[var(--text)]">{dot(s.name)}</dt> <dd className="inline">{t ? specialLead(s.text, t) : s.text}</dd>{t ? <InBlockTable t={t} /> : null}</div>;
            })}
          </dl>
        </>
      ) : null}
      {loose.map((t, i) => <div key={i} className="mt-3"><InBlockTable t={t} /></div>)}
      {naval ? (
        <div className="mt-4 rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
          <p className={eyebrow}>Naval combat</p>
          <div className="mt-1.5 grid grid-cols-5 gap-1">
            {[["HP", `${naval.hp}`], ["Morale", moraleText(naval.morale)], ["Armor", naval.armor ? armorDie(naval.armor.die) : "none"], ["Speed", `${naval.speed}`], ["Agility", signed(naval.agility)]].map(([k, v]) => (
              <div key={k} className="rounded border border-[var(--border)] bg-[var(--panel)] px-0.5 py-1 text-center">
                <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{k}</div>
                <div className={`${num} text-[14px] font-semibold text-[var(--text)]`}>{v}</div>
              </div>
            ))}
          </div>
          {naval.armor ? <p className="mt-1.5 text-[12px] text-[var(--muted)]">{naval.armor.name} {armorDie(naval.armor.die)}</p> : null}
          <AttackList attacks={naval.attacks} />
          <p className="mt-1.5 text-[11.5px] italic text-[var(--muted)]">Fights as a ship in naval combat: it ignores the wind and moves up to its speed in any direction.</p>
        </div>
      ) : null}
      {loot.length ? (
        <p className="mt-3 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Loot:</span> {loot.map((l, i) => <span key={i}>{i ? " · " : ""}{l.name} <N className="text-[var(--text)]">{l.value}</N>{l.note ? ` (${l.note})` : ""}</span>)}</p>
      ) : null}
      {!isHb(m) ? <p className="mt-2 text-[11.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Source:</span> {sourcesLine(m)}</p> : null}
      <p className="mt-3 text-[11.5px] italic text-[var(--muted)]">Enemies never roll in combat: PCs attack at DR{atk} and defend at DR{def}{defendWith !== "AGILITY" ? ` (${defendWith})` : ""}. Morale {moraleLabel(m)}: roll 2d6 when a trigger happens — higher than Morale and it flees or surrenders{m.morale == null ? " (– never breaks)" : ""}.</p>
    </div>
  );
}
/** Compact list card for the bestiary grid. */
export function MonsterCard({ m, href }: { m: PbMonster; href: string }) {
  const atk = m.dr?.attack, def = m.dr?.defend;
  const group = typeof m.group === "string" ? m.group : "";
  const extras = [blockTables(m).length ? "roll table" : "", m.naval ? "naval block" : "", Array.isArray(m.loot) && m.loot.length ? "loot" : ""].filter(Boolean);
  return (
    <a href={href} className="group block">
      <div className="flex items-start justify-between gap-2">
        <h3 className={`${nameCls} group-hover:underline`}>{m.name} <HbBadge x={m} /></h3>
        <span className={badge}>{catLabel(m.category)}</span>
      </div>
      {group ? <p className="mt-0.5 text-[11.5px] text-[var(--muted)]">{group}{typeof m.roll === "number" ? <> · <N className="text-[var(--pb-ink)]">{m.roll}</N></> : null}</p> : null}
      <p className={`mt-1 text-[13px] text-[var(--text)] ${num}`}>HP {hpLabel(m)}{m.count ? ` (×${String(m.count)})` : ""} · Morale {moraleLabel(m)} · {m.armor ? `${m.armor.name} ${armorDie(m.armor.die)}` : "no armor"}</p>
      {m.attacks.length ? <p className="mt-0.5 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Attacks{choiceLabel(m) === "choose 1 or 2" ? " (choose 1 or 2)" : ""}:</span> <N>{attackLine(m)}</N></p> : m.attackTable ? <p className="mt-0.5 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Attacks:</span> <N>{m.attackTable.die}</N> attack table</p> : null}
      {atk || def ? <p className="mt-0.5 text-[12px] text-[var(--sys-link)]"><N>{[atk ? `DR${atk} to hit` : "", def ? `DR${def} to defend` : ""].filter(Boolean).join(" · ")}</N></p> : null}
      {m.text ? <p className="mt-1 line-clamp-2 text-[12.5px] italic leading-relaxed text-[var(--muted)]">{m.text}</p> : null}
      {m.specials.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Special:</span> {m.specials.map((s) => s.name).join(" · ")}</p> : null}
      {extras.length ? <p className="mt-1 flex flex-wrap gap-1">{extras.map((e) => <span key={e} className={badge}>{e}</span>)}</p> : null}
    </a>
  );
}

// ── ship block ─────────────────────────────────────────────────────────────
const SHIP_TYPE_LABEL: Record<string, string> = { boat: "Boat", ship: "Ship", fortification: "Fortification" };
export const shipTypeLabel = (t: string): string => SHIP_TYPE_LABEL[t] ?? (t ? t.charAt(0).toUpperCase() + t.slice(1) : "Vessel");
function shipWeapon(dmg: string | null, attacks: unknown, override: unknown): string {
  if (typeof override === "string" && override) return override;
  if (!dmg) return "—";
  const n = typeof attacks === "number" && attacks > 1 ? attacks : 0;
  return n ? `${n} @ ${dmg}` : dmg;
}
export function shipStats(s: PbShip): { key: string; label: string; value: string }[] {
  const L = (s.statLabels ?? {}) as Record<string, string>, T = (s.statText ?? {}) as Record<string, string>;
  return [
    { key: "hp", label: "HP", value: `${s.hp}` },
    { key: "hull", label: L.hull ?? "Hull", value: T.hull ?? (s.hull ? `${armorDie(s.hull.die)}` : "—") },
    { key: "agility", label: "Agility", value: s.agility == null ? "—" : signed(s.agility) },
    { key: "speed", label: "Speed", value: `${s.speed}` },
    { key: "skill", label: "Skill", value: s.skill == null ? "—" : signed(s.skill) },
    { key: "broadsides", label: L.broadsides ?? "Broad\u00adsides", value: shipWeapon(s.broadsides, s.broadsidesAttacks, T.broadsides) },
    { key: "smallArms", label: L.smallArms ?? "Small Arms", value: shipWeapon(s.smallArms, s.smallArmsAttacks, T.smallArms) },
    { key: "ram", label: "Ram", value: s.ram ?? "—" },
    { key: "crew", label: "Crew", value: s.crew ? `${s.crew.min}–${s.crew.max}` : "—" },
    { key: "cargo", label: "Cargo", value: s.cargo == null ? "—" : `${s.cargo}` },
  ];
}
const frac = (x: number): string => (Math.abs(x - 2 / 3) < 0.01 ? "2/3" : Math.abs(x - 1 / 3) < 0.01 ? "1/3" : Math.abs(x - 0.5) < 0.01 ? "1/2" : `${Math.round(x * 100)}%`);
const WEAPON_LABEL: Record<string, string> = { broadsides: "Broadsides", smallArms: "Small arms" };
/** Machine-readable ship hints as short lines: attacks that scale with HP, wind. */
export function shipHints(s: PbShip): string[] {
  const out: string[] = [];
  const sp = (s.special ?? "").toLowerCase();
  const sc = (s.attackScaling ?? null) as Record<string, { above: number; attacks: number }[]> | null;
  if (sc) for (const [k, steps] of Object.entries(sc)) out.push(`${WEAPON_LABEL[k] ?? k}: ${steps.map((st) => st.above > 0 ? `${st.attacks} attacks above ${frac(st.above)} HP` : `${st.attacks} below`).join(", ")}`);
  else if (s.multiAttackAboveHalfHp) out.push(`Broadsides: ${String(s.broadsidesAttacks ?? 2)} attacks above 1/2 HP, 1 below`);
  if (typeof s.attackPerHp === "number") out.push(`1 attack per ${s.attackPerHp} HP remaining (${Math.floor(s.hp / s.attackPerHp)} at full HP)`);
  // Wind and stationary flags only when the Special line doesn't already say so.
  if (s.stationary && !sp.includes("stationary")) out.push("Stationary");
  if (s.windImmune && !sp.includes("not affected by wind")) out.push("Not affected by wind");
  if (typeof s.windMinMove === "number" && !sp.includes("regardless of wind")) out.push(`Always moves ${s.windMinMove}″ regardless of wind`);
  if (s.closeToWindFullSpeed && !sp.includes("close to the wind")) out.push("Full speed close to the wind");
  return out;
}
export function ShipBlock({ s, compact, href }: { s: PbShip; compact?: boolean; href?: string }) {
  const stats = shipStats(s);
  const hints = shipHints(s);
  const head = compact
    ? <h3 className={`${nameCls} ${href ? "group-hover:underline" : ""}`}>{s.name} <HbBadge x={s} /></h3>
    : <h2 className="text-4xl text-[var(--sys-head)]">{s.name} <HbBadge x={s} /></h2>;
  const cost = typeof s.cost === "number" ? s.cost : null;
  const body = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-2">
        {head}
        <span className="flex flex-wrap gap-1.5"><span className={badge}>{shipTypeLabel(s.type)}</span>{!compact && pageText(s) ? <span className={dBadge}>{pageText(s)}</span> : null}</span>
      </div>
      {s.text ? <p className={`mt-1.5 italic leading-relaxed text-[var(--muted)] ${compact ? "line-clamp-2 text-[12.5px]" : "text-[14px]"}`}>{s.text}</p> : null}
      <div className="mt-3 grid grid-cols-5 gap-1">
        {stats.map((x) => (
          <div key={x.key} className="min-w-0 rounded border border-[var(--border)] bg-[var(--panel-2)] px-0.5 py-1.5 text-center">
            <div className="flex min-h-[19px] items-center justify-center text-[8.5px] font-bold uppercase leading-[1.1] tracking-[0.04em] text-[var(--muted)] [overflow-wrap:anywhere]">{x.label}</div>
            <div className={`${num} truncate text-[14px] font-semibold leading-tight text-[var(--text)]`}>{x.value}</div>
          </div>
        ))}
      </div>
      {s.special ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold italic text-[var(--text)]">Special.</span> {s.special}</p> : null}
      {s.skill == null && typeof s.skillNote === "string" && !(s.special ?? "").includes(s.skillNote) ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{s.skillNote}</p> : null}
      {hints.length ? <p className="mt-1.5 flex flex-wrap gap-1">{hints.map((h) => <span key={h} className={dBadge}>{h}</span>)}</p> : null}
      {cost != null || s.dr ? <p className="mt-1 text-[12.5px] text-[var(--muted)]">{cost != null ? <>Cost <N className="text-[var(--text)]">{silver(cost)}</N></> : null}{cost != null && s.dr ? " · " : ""}{(s.dr as { attack?: number } | undefined)?.attack ? <>DR<N>{(s.dr as { attack: number }).attack}</N> to hit</> : null}</p> : null}
    </>
  );
  if (compact) return <div className={cardCls}>{href ? <a href={href} className="group block">{body}</a> : body}</div>;
  return <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--pb)" }}>{body}{!isHb(s) ? <p className="mt-2 text-[11.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Source:</span> {sourcesLine(s)}</p> : null}</div>;
}
