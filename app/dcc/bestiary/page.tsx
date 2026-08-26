import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_MONSTERS } from "@/lib/data/dcc-monsters";
import type { DccMonster, DccStat } from "@/lib/data/dcc-types";

export const dynamic = "force-dynamic";

// Homebrew is not wired for DCC yet (roadmap Phase 6). This page is also a SEED
// bestiary (~18 blocks); the full ~90-creature GM Toolkit set gets extracted
// later and dropped straight into data/dcc/monsters.json.

type Query = { q?: string; role?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const STAT_ORDER: DccStat[] = ["STR", "INT", "CON", "DEX", "CHA"];
const SIZE_NAMES: Record<number, string> = {
  1: "Tiny", 2: "Small", 3: "Petite", 4: "Medium", 5: "Large", 6: "Huge", 7: "Colossal", 8: "Gargantuan",
};

// Bosses first (they anchor an encounter), then mobs; by level within a role.
const ROLE_RANK: Record<string, number> = {
  "Floor Boss": 0, "Country Boss": 1, "Province Boss": 2, "City Boss": 3,
  "Borough Boss": 4, "Neighborhood Boss": 5, "Rival Crawler": 6, "Mob": 7, "NPC": 8,
};
const MONSTERS_SORTED = [...DCC_MONSTERS].sort(
  (a, b) => (ROLE_RANK[a.role] ?? 9) - (ROLE_RANK[b.role] ?? 9) || a.level - b.level || a.name.localeCompare(b.name, "en"),
);

// Group the many boss tiers into one "Boss" filter plus Mob / Rival Crawler.
const ROLE_FILTERS: { key: string; label: string; test: (r: DccMonster["role"]) => boolean }[] = [
  { key: "mob", label: "Mobs", test: (r) => r === "Mob" },
  { key: "boss", label: "Bosses", test: (r) => r.endsWith("Boss") },
  { key: "rival", label: "Rival Crawlers", test: (r) => r === "Rival Crawler" },
];

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.role) sp.set("role", next.role);
  const s = sp.toString();
  return s ? `/dcc/bestiary?${s}` : "/dcc/bestiary";
}

function matches(m: DccMonster, q: string, roleKey: string): boolean {
  if (roleKey) {
    const f = ROLE_FILTERS.find((r) => r.key === roleKey);
    if (f && !f.test(m.role)) return false;
  }
  if (!q) return true;
  return (
    m.name.toLowerCase().includes(q) ||
    m.role.toLowerCase().includes(q) ||
    m.tags.some((t) => t.toLowerCase().includes(q)) ||
    m.notes.some((n) => n.toLowerCase().includes(q)) ||
    m.attacks.some((a) => a.name.toLowerCase().includes(q))
  );
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";

export default async function DccBestiaryPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q);
  const role = one(raw.role);
  const needle = q.trim().toLowerCase();
  const activeRole = ROLE_FILTERS.some((r) => r.key === role) ? role : "";

  const results = MONSTERS_SORTED.filter((m) => matches(m, needle, activeRole));
  const filtered = Boolean(needle || activeRole);
  const current: Query = { q: q.trim(), role: activeRole };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Bestiary</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_MONSTERS.length} mobs &amp; bosses · starter set
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <form method="get" action="/dcc/bestiary" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, tag, attack, or ability…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeRole ? <input type="hidden" name="role" value={activeRole} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Role
        </span>
        <Link href={withParams(current, { role: "" })} className={`${chipBase} ${activeRole ? chipOff : chipOn}`}>
          All
        </Link>
        {ROLE_FILTERS.map((r) => (
          <Link
            key={r.key}
            href={withParams(current, { role: r.key })}
            className={`${chipBase} ${activeRole === r.key ? chipOn : chipOff}`}
          >
            {r.label}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "creature" : "creatures"}
        </span>
        {filtered ? (
          <Link href="/dcc/bestiary" className="text-[var(--red)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No creature matches those filters. Try a broader search or{" "}
            <Link href="/dcc/bestiary" className="text-[var(--red)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((m, i) => {
            const isBoss = m.role.endsWith("Boss");
            return (
              <li key={`${m.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{m.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {m.role} · {SIZE_NAMES[m.size] ?? `Size ${m.size}`} · Level {m.level}
                  </span>
                </div>

                {m.tags.length ? (
                  <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{m.tags.join(" · ")}</div>
                ) : null}

                {/* Derived line: Surprise / Evade / Move / DR / HB slots */}
                <div className="mt-2 grid grid-cols-5 gap-1.5 text-center">
                  {[
                    ["Surprise", m.surprise],
                    ["Evade", m.evade],
                    ["Move", m.move],
                    ["DR", String(m.dr)],
                    ["HB", `${m.hbSlots.length}`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded border border-[var(--border)] px-1 py-1.5">
                      <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{label}</div>
                      <div className="text-[13px] font-semibold tabular-nums text-[var(--text)]">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Stat block */}
                <div className="mt-2 grid grid-cols-5 gap-1.5 text-center">
                  {STAT_ORDER.map((st) => (
                    <div key={st} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5">
                      <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{st}</div>
                      <div className="text-[13px] font-semibold tabular-nums text-[var(--text)]">
                        {m.stats[st].score}
                        <span className="ml-0.5 text-[10px] text-[var(--muted)]">
                          ({m.stats[st].mod >= 0 ? "+" : ""}
                          {m.stats[st].mod})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {m.attacks.length ? (
                  <div className="mt-3 flex flex-col gap-1 border-t border-[var(--border)] pt-3">
                    {m.attacks.map((a, ai) => (
                      <p key={ai} className="text-[13px] leading-relaxed text-[var(--muted)]">
                        <span className="font-semibold text-[var(--text)]">{a.name}:</span> {a.toHit} to hit, {a.damage}
                        {a.damageType ? ` ${a.damageType}` : ""}
                        {a.range ? `, ${a.range}` : ""}
                        {a.rider ? <span className="italic"> — {a.rider}</span> : null}
                      </p>
                    ))}
                  </div>
                ) : null}

                {m.notes.length ? (
                  <ul className={`mt-2 flex flex-col gap-0.5 ${m.attacks.length ? "" : "border-t border-[var(--border)] pt-3"}`}>
                    {m.notes.map((n, ni) => (
                      <li key={ni} className="text-[12px] leading-relaxed text-[var(--muted)]">
                        <span className="text-[var(--text)]">Note:</span> {n}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {isBoss ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Boss · {m.hbSlots.length} Health Bar slots
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
