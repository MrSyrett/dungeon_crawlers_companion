import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_ITEMS } from "@/lib/data/dcc-items";
import { DCC_LOOT } from "@/lib/data/dcc-loot";
import type { DccItem } from "@/lib/data/dcc-types";

export const dynamic = "force-dynamic";

// Homebrew is not wired for DCC yet (roadmap Phase 6). When it is, merge visible
// homebrew items into ITEMS_AZ here and add a "Homebrew" chip to the Category filter.

type Query = { q?: string; cat?: string; tier?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const ITEMS_AZ = [...DCC_ITEMS].sort((a, b) => a.name.localeCompare(b.name, "en"));

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
// Tier order, rarest last; only those that appear on items are shown as chips.
const TIER_ORDER = ["Bronze", "Silver", "Gold", "Platinum", "Legendary", "Celestial"];
const TIERS = TIER_ORDER.filter((t) => DCC_ITEMS.some((i) => i.tier === t));

const TIER_COLOR: Record<string, string> = {
  Bronze: "#c88a5a", Silver: "#c7ccd1", Gold: "#e6c15a", Platinum: "#9fd6e6",
  Legendary: "#d08be6", Celestial: "#f0a8a3",
};

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.cat) sp.set("cat", next.cat);
  if (next.tier) sp.set("tier", next.tier);
  const s = sp.toString();
  return s ? `/dcc/loot?${s}` : "/dcc/loot";
}

function matches(it: DccItem, q: string, cat: string, tier: string): boolean {
  if (cat && it.category !== cat) return false;
  if (tier && it.tier !== tier) return false;
  if (!q) return true;
  return it.name.toLowerCase().includes(q) || it.effect.toLowerCase().includes(q) || (it.slot ?? "").toLowerCase().includes(q);
}

const chipBase = "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff = "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const badge = "rounded border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]";

export default async function DccLootPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q);
  const cat = one(raw.cat);
  const tier = one(raw.tier);
  const needle = q.trim().toLowerCase();
  const activeCat = CATEGORIES.some((c) => c.key === cat) ? cat : "";
  const activeTier = TIERS.includes(tier) ? tier : "";

  const results = ITEMS_AZ.filter((it) => matches(it, needle, activeCat, activeTier));
  const filtered = Boolean(needle || activeCat || activeTier);
  const current: Query = { q: q.trim(), cat: activeCat, tier: activeTier };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Loot &amp; Gear</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_ITEMS.length} items, potions &amp; magic gear
          </p>
        </div>
        <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">
          ← Home
        </Link>
      </header>

      <form method="get" action="/dcc/loot" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, effect, or slot…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        {activeTier ? <input type="hidden" name="tier" value={activeTier} /> : null}
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

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Tier</span>
        <Link href={withParams(current, { tier: "" })} className={`${chipBase} ${activeTier ? chipOff : chipOn}`}>Any</Link>
        {TIERS.map((t) => (
          <Link key={t} href={withParams(current, { tier: t })} className={`${chipBase} ${activeTier === t ? chipOn : chipOff}`}>
            {t}
          </Link>
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
              <li key={`${it.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{it.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {catLabel}
                    {it.slot ? ` · ${it.slot}` : ""}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
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

      {/* ── Loot boxes reference ─────────────────────────────────────────── */}
      <section className="mt-12 border-t border-[var(--border)] pt-8">
        <h2 className="font-display text-2xl font-black tracking-wide">Loot Boxes</h2>
        <p className="mt-1 mb-5 text-[12px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Contents scale by tier — gold, gear enchant rolls, and consumables
        </p>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {DCC_LOOT.tiers.map((t) => (
            <li key={t.tier} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-base font-bold uppercase tracking-[0.12em]" style={{ color: TIER_COLOR[t.tier] ?? "#f0a8a3" }}>{t.tier}</h3>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {t.gearRolls} gear roll{t.gearRolls === 1 ? "" : "s"} · Gold {t.gold}
                </span>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Enchant X: {t.xValue}</p>
              <ul className="mt-2 flex flex-col gap-0.5">
                {t.contents.map((c, ci) => (
                  <li key={ci} className="text-[12px] leading-relaxed text-[var(--muted)]">· {c}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 mb-3 text-base font-bold uppercase tracking-[0.15em]">Magic-item generator</h3>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {DCC_LOOT.tables.map((tbl) => (
            <li key={tbl.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#f0a8a3]">{tbl.name}</h4>
                <span className={badge}>{tbl.die}</span>
              </div>
              <table className="mt-2 w-full text-[12px]">
                <tbody>
                  {tbl.rows.map((r, ri) => (
                    <tr key={ri} className="border-t border-[var(--border)]">
                      <td className="py-1 pr-3 align-top font-semibold tabular-nums text-[var(--text)] whitespace-nowrap">{r.roll}</td>
                      <td className="py-1 text-[var(--muted)]">{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Mob gold by floor</h4>
              <ul className="mt-2 flex flex-col gap-0.5">
                {DCC_LOOT.goldByFloor.map((g) => (
                  <li key={g.floor} className="text-[12px] text-[var(--muted)]">
                    <span className="text-[var(--text)]">{g.floor} Floor:</span> {g.gold}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Notes</h4>
              <ul className="mt-2 flex flex-col gap-1">
                {DCC_LOOT.notes.map((n, ni) => (
                  <li key={ni} className="text-[12px] leading-relaxed text-[var(--muted)]">· {n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
