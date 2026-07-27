import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { GEAR, type GearItem } from "@/lib/data/gear";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";

export const dynamic = "force-dynamic";

type Query = { q?: string; cat?: string };

// What the URL can actually hand us — a repeated key (?q=a&q=b) arrives as an array.
type RawQuery = { [K in keyof Query]?: string | string[] };

// A displayed row is a book item or a homebrew item; the flag drives the badge.
type Row = GearItem & { homebrew: boolean };

// Collapse to a single value so a hand-crafted URL can't crash the page.
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

// The four filters, in the order they're shown. `key` matches GearItem.category.
const CATEGORIES: {
  key: GearItem["category"];
  label: string;
  noun: string;
  plural: string;
}[] = [
  { key: "basic", label: "Basic Gear", noun: "piece of basic gear", plural: "pieces of basic gear" },
  { key: "weapon", label: "Weapons", noun: "weapon", plural: "weapons" },
  { key: "ammo", label: "Ammo", noun: "ammo entry", plural: "ammo entries" },
  { key: "armor", label: "Armor", noun: "piece of armor", plural: "pieces of armor" },
  { key: "magic", label: "Magic Items", noun: "magic item", plural: "magic items" },
];

const CAT_RANK: Record<GearItem["category"], number> = {
  basic: 0,
  weapon: 1,
  ammo: 2,
  armor: 3,
  magic: 4,
};

const BOOK_SORTED: GearItem[] = [...GEAR].sort(
  (a, b) => CAT_RANK[a.category] - CAT_RANK[b.category] || a.name.localeCompare(b.name, "en"),
);

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.cat) sp.set("cat", next.cat);
  const s = sp.toString();
  return s ? `/gear?${s}` : "/gear";
}

// Turn the terse weapon type code into words.
function weaponKind(t: string | undefined): string {
  if (t === "M") return "Melee";
  if (t === "R") return "Ranged";
  if (t === "M/R") return "Melee / Ranged";
  return t ?? "";
}

function matches(g: Row, q: string, cat: string): boolean {
  if (cat && g.category !== cat) return false;
  if (!q) return true;
  return (
    g.name.toLowerCase().includes(q) ||
    g.desc.toLowerCase().includes(q) ||
    (g.props ?? "").toLowerCase().includes(q) ||
    (g.magicType ?? "").toLowerCase().includes(q) ||
    (g.damage ?? "").toLowerCase().includes(q)
  );
}

// ── Homebrew item shape → GearItem shape ─────────────────────────────────────
const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

function hbCost(d: Record<string, unknown>): string {
  if (d.gp != null) return `${s(d.gp)} gp`;
  if (d.sp != null) return `${s(d.sp)} sp`;
  if (d.cp != null) return `${s(d.cp)} cp`;
  return "";
}

function hbCategory(kind: string): GearItem["category"] {
  if (kind === "weapon") return "weapon";
  if (kind === "ammo") return "ammo";
  if (kind === "armor" || kind === "shield") return "armor";
  if (kind === "magic") return "magic";
  return "basic";
}

const BONUS_LABEL: Record<string, string> = {
  ac: "AC", hp: "HP", meleeAtk: "melee attack", meleeDmg: "melee damage",
  rangedAtk: "ranged attack", rangedDmg: "ranged damage", slots: "gear slots",
  str: "STR", dex: "DEX", con: "CON", int: "INT", wis: "WIS", cha: "CHA",
};

function bonusText(d: Record<string, unknown>): string {
  if (!Array.isArray(d.bonuses) || d.bonuses.length === 0) return "";
  const parts = (d.bonuses as Record<string, unknown>[])
    .map((b) => {
      const amt = parseInt(s(b.amount), 10);
      if (!Number.isFinite(amt) || amt === 0) return "";
      const lbl = BONUS_LABEL[s(b.target)] ?? s(b.target);
      return `${amt > 0 ? "+" : ""}${amt} ${lbl}`;
    })
    .filter(Boolean);
  return parts.length ? `Bonuses: ${parts.join(", ")}.` : "";
}

function hbToRow(data: Record<string, unknown>, fallbackName: string): Row {
  const kind = s(data.kind) || "gear";
  const category = hbCategory(kind);
  const note = s(data.note);
  const bonuses = bonusText(data);
  const ammoReq = kind === "weapon" && s(data.ammo) ? `Requires ${s(data.ammo)}.` : "";
  const desc = [note, bonuses, ammoReq].filter(Boolean).join(" ");
  const row: Row = {
    name: s(data.name) || fallbackName,
    category,
    cost: hbCost(data),
    desc,
    homebrew: true,
  };
  if (s(data.qty)) row.qty = s(data.qty);
  if (category === "weapon") {
    row.weaponType = s(data.wtype) || "M";
    row.range = s(data.range);
    row.damage = s(data.damage);
    row.props = s(data.props);
  }
  return row;
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";
const chipOn = "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]";

const badge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]";

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className={badge}>
      {label} <span className="text-[var(--text)]">{value}</span>
    </span>
  );
}

export default async function GearPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "gear" }),
    ownHomebrew(user.id, "gear"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => hbToRow(h.data as Record<string, unknown>, h.name));

  // What a homebrew weapon may require: the book's ammo plus any homebrew ammo
  // the user can see. Mirrors the sheet's allAmmo().
  const ammoOptions = [
    ...GEAR.filter((g) => g.category === "ammo").map((g) => g.name),
    ...hbVisible
      .map((h) => h.data as Record<string, unknown>)
      .filter((d) => s(d.kind) === "ammo")
      .map((d) => s(d.name)),
  ].filter((n, i, arr) => n && arr.indexOf(n) === i);
  const bookRows: Row[] = BOOK_SORTED.map((g) => ({ ...g, homebrew: false }));
  const ALL_ROWS: Row[] = [...hbRows, ...bookRows].sort(
    (a, b) => CAT_RANK[a.category] - CAT_RANK[b.category] || a.name.localeCompare(b.name, "en"),
  );

  const raw = await searchParams;
  const q = one(raw.q);
  const cat = one(raw.cat);
  const needle = q.trim().toLowerCase();
  const activeCat = CATEGORIES.some((c) => c.key === cat) ? cat : "";

  const results = ALL_ROWS.filter((g) => matches(g, needle, activeCat));
  const filtered = Boolean(needle || activeCat);
  const current: Query = { q: q.trim(), cat: activeCat };
  const activeMeta = CATEGORIES.find((c) => c.key === activeCat);
  const noun = activeMeta?.noun ?? "item";
  const plural = activeMeta?.plural ?? "items";

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Gear</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {GEAR.length} Shadowdark items{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <HomebrewManager type="gear" campaigns={campaigns} initial={hbOwn} ammoOptions={ammoOptions} />

      <form method="get" action="/gear" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, effect, or property…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        {activeCat ? <input type="hidden" name="cat" value={activeCat} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <Link
          href={withParams(current, { cat: "" })}
          className={`${chipBase} ${activeCat ? chipOff : chipOn}`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            href={withParams(current, { cat: c.key })}
            className={`${chipBase} ${activeCat === c.key ? chipOn : chipOff}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? noun : plural}
        </span>
        {filtered ? (
          <Link href="/gear" className="text-[var(--gold)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No gear matches those filters. Try a broader search or{" "}
            <Link href="/gear" className="text-[var(--gold)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((g, i) => {
            const catLabel = CATEGORIES.find((c) => c.key === g.category)?.label ?? "";
            return (
              <li
                key={`${g.homebrew ? "hb" : "bk"}-${g.category}-${g.name}-${i}`}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    {g.name}
                  </h2>
                  {g.homebrew ? (
                    <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                      Homebrew
                    </span>
                  ) : null}
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {g.category === "magic" && g.magicType ? g.magicType : catLabel}
                    {g.cost ? ` · ${g.cost}` : ""}
                  </span>
                </div>

                {g.category === "weapon" ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {g.damage ? <Badge label="Damage" value={g.damage} /> : null}
                    {g.range ? <Badge label="Range" value={g.range} /> : null}
                    {g.weaponType ? <Badge label="Type" value={weaponKind(g.weaponType)} /> : null}
                    {g.cost ? <Badge label="Cost" value={g.cost} /> : null}
                  </div>
                ) : null}

                {g.category === "basic" || g.category === "armor" || g.category === "ammo" ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {g.qty ? <Badge label="Qty" value={g.qty} /> : null}
                    {g.cost ? <Badge label="Cost" value={g.cost} /> : null}
                  </div>
                ) : null}

                {g.category === "weapon" && g.props ? (
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{g.props}</p>
                ) : null}

                {g.desc ? (
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{g.desc}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
