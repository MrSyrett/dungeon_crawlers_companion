import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_RACES } from "@/lib/data/dcc-races";
import type { DccRace } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";

export const dynamic = "force-dynamic";

type Query = { q?: string; group?: string; src?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const SIZE_NAMES: Record<number, string> = {
  1: "Tiny", 2: "Small", 3: "Petite", 4: "Medium", 5: "Large", 6: "Huge", 7: "Colossal", 8: "Gargantuan",
};

// Earth races first (the broadest Class access), then Alien; A–Z within each.
const GROUP_RANK: Record<DccRace["group"], number> = { Earth: 0, Alien: 1 };
const byRace = (a: DccRace, b: DccRace) =>
  GROUP_RANK[a.group] - GROUP_RANK[b.group] || a.name.localeCompare(b.name, "en");

const GROUPS: { key: DccRace["group"]; label: string }[] = [
  { key: "Earth", label: "Earth" },
  { key: "Alien", label: "Alien" },
];

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.group) sp.set("group", next.group);
  if (next.src) sp.set("src", next.src);
  const s = sp.toString();
  return s ? `/dcc/races?${s}` : "/dcc/races";
}

function matches(r: DccRace, q: string, group: string, src: string): boolean {
  if (group && r.group !== group) return false;
  if (src === "hb" && r.source !== "Homebrew") return false;
  if (src === "book" && r.source === "Homebrew") return false;
  if (!q) return true;
  return r.name.toLowerCase().includes(q) || r.grants.some((g) => g.toLowerCase().includes(q));
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const hbBadge =
  "rounded border border-[var(--red)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#f0a8a3]";

export default async function DccRacesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dcc-race" }),
    ownHomebrew(user.id, "dcc-race"),
    userCampaigns(user.id),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccRace);
  const ALL_RACES = [...hbRows, ...DCC_RACES].sort(byRace);
  const homebrewCount = hbRows.length;

  const raw = await searchParams;
  const q = one(raw.q);
  const group = one(raw.group);
  const src = one(raw.src);
  const needle = q.trim().toLowerCase();
  const activeGroup = GROUPS.some((g) => g.key === group) ? group : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";

  const results = ALL_RACES.filter((r) => matches(r, needle, activeGroup, activeSrc));
  const filtered = Boolean(needle || activeGroup || activeSrc);
  const current: Query = { q: q.trim(), group: activeGroup, src: activeSrc };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Races</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_RACES.length} races{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link href="/dcc/homebrew" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">My Homebrew</Link>
          <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
        </div>
      </header>

      <DccHomebrewEditor kind="dcc-race" campaigns={campaigns} initial={hbOwn} />

      <form method="get" action="/dcc/races" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or trait…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeGroup ? <input type="hidden" name="group" value={activeGroup} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Origin
        </span>
        <Link href={withParams(current, { group: "" })} className={`${chipBase} ${activeGroup ? chipOff : chipOn}`}>
          All
        </Link>
        {GROUPS.map((g) => (
          <Link
            key={g.key}
            href={withParams(current, { group: g.key })}
            className={`${chipBase} ${activeGroup === g.key ? chipOn : chipOff}`}
          >
            {g.label}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <Link href={withParams(current, { src: "" })} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</Link>
        <Link href={withParams(current, { src: "book" })} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</Link>
        <Link href={withParams(current, { src: "hb" })} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</Link>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "race" : "races"}
        </span>
        {filtered ? (
          <Link href="/dcc/races" className="text-[var(--red)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No race matches those filters. Try a broader search or{" "}
            <Link href="/dcc/races" className="text-[var(--red)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((r, i) => {
            const hb = r.source === "Homebrew";
            return (
              <li key={`${hb ? "hb" : "bk"}-${r.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{r.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {r.group} · {SIZE_NAMES[r.size] ?? `Size ${r.size}`}
                  </span>
                  {hb ? <span className={hbBadge}>Homebrew</span> : null}
                </div>

                {r.prerequisites ? (
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Prerequisite:</span>{" "}
                    {r.prerequisites}
                  </p>
                ) : null}

                <ul className="mt-2 flex flex-col gap-1">
                  {r.grants.map((g, gi) => (
                    <li key={gi} className="flex gap-2 text-[13px] leading-relaxed text-[var(--muted)]">
                      <span className="mt-[2px] shrink-0 text-[var(--red)]">▸</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
