import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SPELLS, type Spell } from "@/lib/data/spells";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type Query = { q?: string; tier?: string; caster?: string };

// What the URL can actually hand us — a repeated key (?q=a&q=b) arrives as an array.
type RawQuery = { [K in keyof Query]?: string | string[] };

// A displayed row is a book spell or a homebrew spell; the flag drives the badge
// and the "Homebrew" caster filter.
type Row = Spell & { homebrew: boolean };

// Collapse to a single value so a hand-crafted URL can't crash the page.
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// Listed A-Z. A dozen spells appear on more than one class list (Charm Person
// is both Wizard and Witch, for instance), so caster and tier break the tie —
// without that, same-named entries could swap places between renders.
const SPELLS_AZ = [...SPELLS].sort(
  (a, b) =>
    a.name.localeCompare(b.name, "en") ||
    a.caster.localeCompare(b.caster, "en") ||
    a.tier.localeCompare(b.tier, "en"),
);

const TIERS = [...new Set(SPELLS.map((s) => s.tier))].sort(
  (a, b) => (parseInt(a) || 0) - (parseInt(b) || 0),
);

// "Both" isn't a class — it's the wizard/priest shared list, so it's folded into
// each of those rather than offered as its own filter.
const CASTERS = [...new Set(SPELLS.map((s) => s.caster))].filter((c) => c !== "Both").sort();

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.tier) sp.set("tier", next.tier);
  if (next.caster) sp.set("caster", next.caster);
  const s = sp.toString();
  return s ? `/spells?${s}` : "/spells";
}

// The values the chips test, per row (lib/facets); the search is separate.
// Wizard and Priest both learn from the shared "Both" list, so a "Both" spell
// is on each of those lists; a homebrew spell is only on the "Homebrew" list.
const facets = (r: Row) => ({
  tier: r.tier,
  caster: r.homebrew ? "Homebrew" : r.caster === "Both" ? ["Wizard", "Priest"] : r.caster,
});

function rowMatches(r: Row, q: string): boolean {
  if (!q) return true;
  return r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";
const chipOn = "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]";

export default async function SpellsPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "spell" }),
    ownHomebrew(user.id, "spell"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return {
      name: String(d.name ?? h.name),
      tier: String(d.tier ?? "1"),
      caster: "Homebrew",
      range: String(d.range ?? ""),
      duration: String(d.duration ?? ""),
      damage: String(d.damage ?? ""),
      desc: String(d.desc ?? ""),
      homebrew: true,
    };
  });
  const bookRows: Row[] = SPELLS_AZ.map((sp) => ({ ...sp, homebrew: false }));
  const ALL_ROWS: Row[] = [...hbRows, ...bookRows].sort(
    (a, b) =>
      a.name.localeCompare(b.name, "en") ||
      a.caster.localeCompare(b.caster, "en") ||
      a.tier.localeCompare(b.tier, "en"),
  );

  const raw = await searchParams;
  const q = one(raw.q);
  const tier = one(raw.tier);
  const caster = one(raw.caster);
  const needle = q.trim().toLowerCase();
  const activeTier = TIERS.includes(tier) ? tier : "";
  const casterOptions = hbRows.length ? [...CASTERS, "Homebrew"] : CASTERS;
  const activeCaster = casterOptions.includes(caster) ? caster : "";

  const filtered = Boolean(needle || activeTier || activeCaster);
  const current: Query = { q: q.trim(), tier: activeTier, caster: activeCaster };
  // Every spell is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint,
  // through the same facet match the client uses.
  const show = (s: Row) => facetMatch(facets(s), current) && rowMatches(s, needle);
  const shown = ALL_ROWS.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Spells" subtitle={<>{SPELLS.length} Shadowdark spells{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}</>} />

      <HomebrewManager type="spell" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/spells" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or description…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        {activeTier ? <input type="hidden" name="tier" value={activeTier} /> : null}
        {activeCaster ? <input type="hidden" name="caster" value={activeCaster} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Tier
        </span>
        <a
          href={withParams(current, { tier: "" })}
          data-chip="tier:"
          aria-pressed={!activeTier}
          className={`${chipBase} ${activeTier ? chipOff : chipOn}`}
        >
          Any
        </a>
        {TIERS.map((t) => (
          <a
            key={t}
            href={withParams(current, { tier: t })}
            data-chip={`tier:${t}`}
            aria-pressed={activeTier === t}
            className={`${chipBase} ${activeTier === t ? chipOn : chipOff}`}
          >
            {t}
          </a>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          List
        </span>
        <a
          href={withParams(current, { caster: "" })}
          data-chip="caster:"
          aria-pressed={!activeCaster}
          className={`${chipBase} ${activeCaster ? chipOff : chipOn}`}
        >
          All
        </a>
        {casterOptions.map((c) => (
          <a
            key={c}
            href={withParams(current, { caster: c })}
            data-chip={`caster:${c}`}
            aria-pressed={activeCaster === c}
            className={`${chipBase} ${activeCaster === c ? chipOn : chipOff}`}
          >
            {c}
          </a>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="spell" aria-live="polite">
          {shown} {shown === 1 ? "spell" : "spells"}
        </span>
        <Link href="/spells" data-clear hidden={!filtered} className="text-[var(--gold)] hover:underline">
          Clear filters
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No spell matches those filters. Try a broader search or{" "}
          <Link href="/spells" data-clear className="text-[var(--gold)] underline">
            clear them
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {ALL_ROWS.map((s, i) => (
          <li
            key={`${s.homebrew ? "hb" : "bk"}-${s.caster}-${s.name}-${i}`}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            hidden={!show(s)}
            data-f={facetAttr(facets(s))}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                {s.name}
              </h2>
              {s.homebrew ? (
                <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                  Homebrew
                </span>
              ) : null}
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                Tier {s.tier} · {s.caster} · DC {10 + (parseInt(s.tier) || 1)}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                ["Range", s.range],
                ["Duration", s.duration],
                ...(s.damage ? ([["Damage", s.damage]] as [string, string][]) : []),
                ...(s.heal ? ([["Healing", s.heal]] as [string, string][]) : []),
              ].map(([labelText, value]) => (
                <span
                  key={labelText}
                  className="rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]"
                >
                  {labelText} <span className="text-[var(--text)]">{value}</span>
                </span>
              ))}
            </div>

            {s.desc ? (
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
            ) : null}
          </li>
        ))}
      </ul>
      </InstantFilter>
    </div>
  );
}
