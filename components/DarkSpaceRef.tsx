import Link from "next/link";

// Shared shell for the DarkSpace reference pages (app/darkspace/*) — same pieces
// as IcrpgRef / NimbleRef (header with "My Homebrew" + "← Home", search form,
// filter chips, count line, empty state, cards) in the DarkSpace cyan.
export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

export const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
export const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--darkspace)] hover:text-[var(--text)]";
export const chipOn = "border-[var(--darkspace)] bg-[var(--panel-2)] text-[#24c3d6]";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#24c3d6]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const hbBadge = "rounded border border-[var(--darkspace)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#24c3d6]";
export const accentBadge = hbBadge;

// ── Mechanical effect labels (mirror the sheet's homebrew engine) ────────────
// Flat item/stat bonus targets (BONUS_TARGETS in lib/homebrew.ts).
const BONUS_LABEL: Record<string, string> = {
  ac: "AC", hp: "HP", meleeAtk: "Melee Attacks", meleeDmg: "Melee Damage",
  rangedAtk: "Ranged Attacks", rangedDmg: "Ranged Damage", slots: "Gear Slots",
  str: "STR", dex: "DEX", con: "CON", int: "INT", wis: "WIS", cha: "CHA",
};
// Full effect vocabulary for archetype features/talents (TALENT_TARGETS).
const EFFECT_LABEL: Record<string, string> = {
  ...BONUS_LABEL, gearSlots: "Gear Slots",
  meleeAtkDmg: "Melee Attack & Damage", rangedAtkDmg: "Ranged Attack & Damage",
  mrAtk: "Melee & Ranged Attacks", mrDmg: "Melee & Ranged Damage",
  mrAtkDmg: "Melee & Ranged Attack & Damage", statChoice: "Stat (choice)",
  spellKnown: "Learn Spell", spellCheck: "Spell Checks", weaponDie: "Weapon Damage Die",
  advSpell: "Advantage: Spell", featureCharges: "Charges", playerTalent: "Player Choice",
  perDay: "Per Day",
};
export type Effectish = { amount?: number | string; target?: string };
export function bonusLabel(b: Effectish): string {
  const amt = Number(b?.amount) || 0;
  const label = BONUS_LABEL[String(b?.target ?? "")] ?? String(b?.target ?? "");
  return `${amt >= 0 ? "+" : ""}${amt} ${label}`;
}
export function effectLabel(e: Effectish): string {
  const t = String(e?.target ?? "");
  const amt = Number(e?.amount) || 0;
  const label = EFFECT_LABEL[t] ?? t;
  if (t === "perDay") return `${amt}/day`;
  if (t === "playerTalent") return "Player Choice";
  if (t === "statChoice") return `+${amt} Stat (choice)`;
  return `${amt >= 0 ? "+" : ""}${amt} ${label}`;
}
export function EffectChips({ items, kind }: { items: Effectish[]; kind?: "bonus" | "effect" }) {
  const list = (items ?? []).filter((e) => e && e.target);
  if (!list.length) return null;
  const fmt = kind === "effect" ? effectLabel : bonusLabel;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {list.map((e, i) => (
        <span key={i} className="rounded border border-[var(--darkspace)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#24c3d6]">{fmt(e)}</span>
      ))}
    </div>
  );
}

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `${base}?${s}` : base;
}

export function DarkSpaceHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div>
        <h1 className="font-display text-3xl font-black tracking-wide">{title}</h1>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--darkspace)] sm:text-[11px] sm:tracking-[0.35em]">{subtitle}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link href="/darkspace/homebrew" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--darkspace)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">My Homebrew</Link>
        <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">← Home</Link>
      </div>
    </header>
  );
}

export function SearchForm({ base, q, placeholder, hidden }: { base: string; q: string; placeholder: string; hidden: Query }) {
  return (
    <form method="get" action={base} className="mb-4 flex gap-2">
      <input type="search" name="q" defaultValue={q} placeholder={placeholder} className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--darkspace)]" />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--darkspace)] hover:text-[var(--text)]">Search</button>
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

export function plural(noun: string): string {
  if (/[^aeiou]y$/.test(noun)) return noun.slice(0, -1) + "ies";   // ancestry → ancestries
  if (/(s|x|z|ch|sh)$/.test(noun)) return noun + "es";              // class → classes
  return noun + "s";
}
export function CountLine({ count, noun, base, filtered }: { count: number; noun: string; base: string; filtered: boolean }) {
  return (
    <div className="mb-4 mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      <span>{count} {count === 1 ? noun : plural(noun)}</span>
      {filtered ? <Link href={base} className="text-[var(--darkspace)] hover:underline">Clear filters</Link> : null}
    </div>
  );
}

export function EmptyState({ noun, base }: { noun: string; base: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
      <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">No {noun} matches those filters. Try a broader search or <Link href={base} className="text-[var(--darkspace)] underline">clear them</Link>.</p>
    </div>
  );
}
