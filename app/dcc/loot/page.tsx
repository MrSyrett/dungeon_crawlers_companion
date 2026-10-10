import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_ITEMS } from "@/lib/data/dcc-items";
import type { DccItem } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrew from "@/components/DccHomebrew";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type Query = { q?: string; cat?: string; tier?: string; src?: string; sort?: string; theme?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// A displayed row is a book item or a homebrew item; the flag drives the badge.
type Row = DccItem & { homebrew: boolean };

const CATEGORIES: { key: DccItem["category"]; label: string }[] = [
  { key: "consumable", label: "Consumables" },
  { key: "weapon", label: "Weapons" },
  { key: "armor", label: "Armor" },
  { key: "accessory", label: "Accessories" },
  { key: "scroll", label: "Scrolls" },
  { key: "tome", label: "Tomes" },
  { key: "mundane", label: "Mundane" },
  { key: "tool", label: "Tools" },
  { key: "material", label: "Materials" },
];
const CAT_KEYS = CATEGORIES.map((c) => c.key) as string[];
// Tier order, rarest last; only those that appear on items are shown as chips.
const TIER_ORDER = ["Mundane", "Bronze", "Silver", "Gold", "Platinum", "Legendary", "Celestial"];
// Flavor themes (Core gear library); only those present on items appear as chips.
const THEME_ORDER = ["Fantasy", "Modern", "Pop Culture"];

const SORTS: { key: string; label: string; cmp: (a: Row, b: Row) => number }[] = [
  { key: "", label: "Name", cmp: (a, b) => a.name.localeCompare(b.name, "en") },
  { key: "tier", label: "Tier", cmp: (a, b) =>
      (TIER_ORDER.indexOf(a.tier ?? "") + 1 || 99) - (TIER_ORDER.indexOf(b.tier ?? "") + 1 || 99) || a.name.localeCompare(b.name, "en") },
  { key: "price", label: "Price", cmp: (a, b) =>
      (b.price ?? -1) - (a.price ?? -1) || a.name.localeCompare(b.name, "en") },
];

const TIER_COLOR: Record<string, string> = {
  Bronze: "var(--bronze)", Silver: "var(--silver)", Gold: "var(--grade-5)", Platinum: "var(--grade-3)",
  Legendary: "var(--grade-4)", Celestial: "var(--grade-6)",
};

// A homebrew record's data blob → a DccItem-shaped display row.
function hbToRow(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const catRaw = s("category");
  const category = (CAT_KEYS.includes(catRaw) ? catRaw : "mundane") as DccItem["category"];
  const tier = s("tier");
  const price = typeof data.price === "number" ? data.price : undefined;
  const benefits = Array.isArray(data.benefits) ? (data.benefits as DccItem["benefits"]) : undefined;
  return {
    name,
    category,
    effect: s("effect"),
    slot: s("slot") || undefined,
    tier: (tier || undefined) as DccItem["tier"],
    benefits,
    price,
    source: "Homebrew",
    homebrew: true,
  };
}

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.cat) sp.set("cat", next.cat);
  if (next.tier) sp.set("tier", next.tier);
  if (next.src) sp.set("src", next.src);
  if (next.sort) sp.set("sort", next.sort);
  if (next.theme) sp.set("theme", next.theme);
  const s = sp.toString();
  return s ? `/dcc/loot?${s}` : "/dcc/loot";
}

// The facets the chips test, per row — the same object the client reads back
// from `data-f` (lib/facets), so server and client always agree.
const facets = (it: Row) => ({ cat: it.category, tier: it.tier, theme: it.theme, src: it.homebrew ? "hb" : "book" });

function matches(it: Row, q: string, cat: string, tier: string, src: string, theme: string): boolean {
  if (!facetMatch(facets(it), { cat, tier, theme, src })) return false;
  if (!q) return true;
  return it.name.toLowerCase().includes(q) || it.effect.toLowerCase().includes(q) || (it.slot ?? "").toLowerCase().includes(q);
}

const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[var(--gold)]";
const badge = "rounded border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]";
const hbBadge = "rounded border border-[var(--red)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gold)]";

export default async function DccLootPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dcc-item" }),
    ownHomebrew(user.id, "dcc-item"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => hbToRow(h.data as Record<string, unknown>, h.name));
  const bookRows: Row[] = DCC_ITEMS.map((it) => ({ ...it, homebrew: false }));
  const ALL_ROWS: Row[] = [...hbRows, ...bookRows].sort((a, b) => a.name.localeCompare(b.name, "en"));
  const homebrewCount = hbRows.length;
  const TIERS = TIER_ORDER.filter((t) => ALL_ROWS.some((i) => i.tier === t));
  const THEMES = THEME_ORDER.filter((t) => ALL_ROWS.some((i) => i.theme === t));

  const raw = await searchParams;
  const q = one(raw.q);
  const cat = one(raw.cat);
  const tier = one(raw.tier);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeCat = CATEGORIES.some((c) => c.key === cat) ? cat : "";
  const activeTier = TIERS.includes(tier) ? tier : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";
  const sort = one(raw.sort);
  const activeSort = SORTS.some((s) => s.key === sort && s.key) ? sort : "";
  const cmp = (SORTS.find((s) => s.key === activeSort) ?? SORTS[0]).cmp;
  const theme = one(raw.theme);
  const activeTheme = THEMES.includes(theme) ? theme : "";

  // Every row is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint.
  const list = ALL_ROWS.slice().sort(cmp);
  const show = (it: Row) => matches(it, needle, activeCat, activeTier, activeSrc, activeTheme);
  const shown = list.filter(show).length;
  const filtered = Boolean(needle || activeCat || activeTier || activeSrc || activeTheme);
  const current: Query = { q: q.trim(), cat: activeCat, tier: activeTier, src: activeSrc, sort: activeSort, theme: activeTheme };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Loot" subtitle={<>{DCC_ITEMS.length} items{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}</>} />

      <DccHomebrew campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/dcc/loot" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          aria-label="Search items"
          placeholder="Search name, effect, or slot…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        {activeTier ? <input type="hidden" name="tier" value={activeTier} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        {activeSort ? <input type="hidden" name="sort" value={activeSort} /> : null}
        {activeTheme ? <input type="hidden" name="theme" value={activeTheme} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Category</span>
        <a href={withParams(current, { cat: "" })} data-chip="cat:" aria-pressed={!activeCat} className={`${chipBase} ${activeCat ? chipOff : chipOn}`}>All</a>
        {CATEGORIES.map((c) => (
          <a key={c.key} href={withParams(current, { cat: c.key })} data-chip={`cat:${c.key}`} aria-pressed={activeCat === c.key} className={`${chipBase} ${activeCat === c.key ? chipOn : chipOff}`}>
            {c.label}
          </a>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Tier</span>
        <a href={withParams(current, { tier: "" })} data-chip="tier:" aria-pressed={!activeTier} className={`${chipBase} ${activeTier ? chipOff : chipOn}`}>Any</a>
        {TIERS.map((t) => (
          <a key={t} href={withParams(current, { tier: t })} data-chip={`tier:${t}`} aria-pressed={activeTier === t} className={`${chipBase} ${activeTier === t ? chipOn : chipOff}`}>
            {t}
          </a>
        ))}
      </div>

      {THEMES.length ? (
        <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
          <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Theme</span>
          <a href={withParams(current, { theme: "" })} data-chip="theme:" aria-pressed={!activeTheme} className={`${chipBase} ${activeTheme ? chipOff : chipOn}`}>All</a>
          {THEMES.map((t) => (
            <a key={t} href={withParams(current, { theme: t })} data-chip={`theme:${t}`} aria-pressed={activeTheme === t} className={`${chipBase} ${activeTheme === t ? chipOn : chipOff}`}>{t}</a>
          ))}
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <a href={withParams(current, { src: "" })} data-chip="src:" aria-pressed={!activeSrc} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</a>
        <a href={withParams(current, { src: "book" })} data-chip="src:book" aria-pressed={activeSrc === "book"} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</a>
        <a href={withParams(current, { src: "hb" })} data-chip="src:hb" aria-pressed={activeSrc === "hb"} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</a>
      </div>

      {/* Sorting re-orders on the server, so these stay real navigations;
          data-nav keeps their hrefs in step with the live filters. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sort</span>
        {SORTS.map((s) => (
          <Link key={s.key || "name"} href={withParams(current, { sort: s.key })} data-nav={`sort:${s.key}`} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="item" aria-live="polite">{shown} {shown === 1 ? "item" : "items"}</span>
        <Link href="/dcc/loot" data-clear hidden={!filtered} className="text-[var(--red)] hover:underline">Clear filters</Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No item matches those filters. Try a broader search or{" "}
          <Link href="/dcc/loot" data-clear className="text-[var(--red)] underline">clear them</Link>.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {list.map((it, i) => {
          const catLabel = CATEGORIES.find((c) => c.key === it.category)?.label ?? it.category;
          return (
            <li key={`${it.homebrew ? "hb" : "bk"}-${it.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4" hidden={!show(it)} data-f={facetAttr(facets(it))}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">{it.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {catLabel}
                  {it.slot ? ` · ${it.slot}` : ""}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {it.homebrew ? <span className={hbBadge}>Homebrew</span> : (it.source ? <span className={badge}>{it.source}{it.page ? ` · p.${it.page}` : ""}</span> : null)}
                {it.tier ? (
                  <span className="rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: TIER_COLOR[it.tier] ?? "var(--border)", color: TIER_COLOR[it.tier] ?? "var(--muted)" }}>
                    {it.tier}
                  </span>
                ) : null}
                {typeof it.price === "number" ? <span className={badge}>{it.price.toLocaleString("en")} g</span> : null}
                {it.theme ? <span className={badge}>{it.theme}</span> : null}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{it.effect}</p>
            </li>
          );
        })}
      </ul>
      </InstantFilter>
    </div>
  );
}
