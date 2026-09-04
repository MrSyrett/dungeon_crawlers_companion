import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_ITEMS } from "@/lib/data/dcc-items";
import type { DccItem } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrew from "@/components/DccHomebrew";

export const dynamic = "force-dynamic";

type Query = { q?: string; cat?: string; tier?: string; src?: string; sort?: string };
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

const SORTS: { key: string; label: string; cmp: (a: Row, b: Row) => number }[] = [
  { key: "", label: "Name", cmp: (a, b) => a.name.localeCompare(b.name, "en") },
  { key: "tier", label: "Tier", cmp: (a, b) =>
      (TIER_ORDER.indexOf(a.tier ?? "") + 1 || 99) - (TIER_ORDER.indexOf(b.tier ?? "") + 1 || 99) || a.name.localeCompare(b.name, "en") },
  { key: "price", label: "Price", cmp: (a, b) =>
      (b.price ?? -1) - (a.price ?? -1) || a.name.localeCompare(b.name, "en") },
];

const TIER_COLOR: Record<string, string> = {
  Bronze: "#c88a5a", Silver: "#c7ccd1", Gold: "#e6c15a", Platinum: "#9fd6e6",
  Legendary: "#d08be6", Celestial: "#f0a8a3",
};

// A homebrew record's data blob → a DccItem-shaped display row.
function hbToRow(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const catRaw = s("category");
  const category = (CAT_KEYS.includes(catRaw) ? catRaw : "mundane") as DccItem["category"];
  const tier = s("tier");
  const price = typeof data.price === "number" ? data.price : undefined;
  return {
    name,
    category,
    effect: s("effect"),
    slot: s("slot") || undefined,
    tier: (tier || undefined) as DccItem["tier"],
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
  const s = sp.toString();
  return s ? `/dcc/loot?${s}` : "/dcc/loot";
}

function matches(it: Row, q: string, cat: string, tier: string, src: string): boolean {
  if (cat && it.category !== cat) return false;
  if (tier && it.tier !== tier) return false;
  if (src === "hb" && !it.homebrew) return false;
  if (src === "book" && it.homebrew) return false;
  if (!q) return true;
  return it.name.toLowerCase().includes(q) || it.effect.toLowerCase().includes(q) || (it.slot ?? "").toLowerCase().includes(q);
}

const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const badge = "rounded border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]";
const hbBadge = "rounded border border-[var(--red)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#f0a8a3]";

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

  const results = ALL_ROWS.filter((it) => matches(it, needle, activeCat, activeTier, activeSrc)).sort(cmp);
  const filtered = Boolean(needle || activeCat || activeTier || activeSrc);
  const current: Query = { q: q.trim(), cat: activeCat, tier: activeTier, src: activeSrc, sort: activeSort };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Loot &amp; Gear</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_ITEMS.length} items{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link href="/dcc/homebrew" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">My Homebrew</Link>
          <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">
          ← Home
        </Link>
        </div>
      </header>

      <DccHomebrew campaigns={campaigns} initial={hbOwn} />

      <form method="get" action="/dcc/loot" className="mb-4 flex gap-2">
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
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Category</span>
        <Link href={withParams(current, { cat: "" })} className={`${chipBase} ${activeCat ? chipOff : chipOn}`}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.key} href={withParams(current, { cat: c.key })} className={`${chipBase} ${activeCat === c.key ? chipOn : chipOff}`}>
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Tier</span>
        <Link href={withParams(current, { tier: "" })} className={`${chipBase} ${activeTier ? chipOff : chipOn}`}>Any</Link>
        {TIERS.map((t) => (
          <Link key={t} href={withParams(current, { tier: t })} className={`${chipBase} ${activeTier === t ? chipOn : chipOff}`}>
            {t}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <Link href={withParams(current, { src: "" })} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</Link>
        <Link href={withParams(current, { src: "book" })} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</Link>
        <Link href={withParams(current, { src: "hb" })} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</Link>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sort</span>
        {SORTS.map((s) => (
          <Link key={s.key || "name"} href={withParams(current, { sort: s.key })} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>{results.length} {results.length === 1 ? "item" : "items"}</span>
        {filtered ? <Link href="/dcc/loot" className="text-[var(--red)] hover:underline">Clear filters</Link> : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No item matches those filters. Try a broader search or{" "}
            <Link href="/dcc/loot" className="text-[var(--red)] underline">clear them</Link>.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((it, i) => {
            const catLabel = CATEGORIES.find((c) => c.key === it.category)?.label ?? it.category;
            return (
              <li key={`${it.homebrew ? "hb" : "bk"}-${it.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{it.name}</h2>
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
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{it.effect}</p>
              </li>
            );
          })}
        </ul>
      )}

    </div>
  );
}
