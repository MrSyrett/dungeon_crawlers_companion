import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_MONSTERS } from "@/lib/data/dcc-monsters";
import type { DccMonster, DccStat } from "@/lib/data/dcc-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dcc/bestiary";

type Query = { q?: string; role?: string; src?: string; sort?: string; m?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const STAT_ORDER: DccStat[] = ["STR", "INT", "CON", "DEX", "CHA"];
const SIZE_NAMES: Record<number, string> = {
  1: "Tiny", 2: "Small", 3: "Petite", 4: "Medium", 5: "Large", 6: "Huge", 7: "Colossal", 8: "Gargantuan",
};

// Bosses first (they anchor an encounter), then mobs; by level within a role.
const ROLE_RANK: Record<string, number> = {
  "Floor Boss": 0, "Country Boss": 1, "Province Boss": 2, "City Boss": 3,
  "Borough Boss": 4, "Neighborhood Boss": 5, "Quest Boss": 5.5, "Rival Crawler": 6,
  "Elite": 6.5, "Mob": 7, "NPC": 8,
};
const byRole = (a: DccMonster, b: DccMonster) =>
  (ROLE_RANK[a.role] ?? 9) - (ROLE_RANK[b.role] ?? 9) || a.level - b.level || a.name.localeCompare(b.name, "en");
const byLevel = (a: DccMonster, b: DccMonster) =>
  a.level - b.level || a.name.localeCompare(b.name, "en");
const byName = (a: DccMonster, b: DccMonster) => a.name.localeCompare(b.name, "en");
const SORTS: { key: string; label: string; cmp: (a: DccMonster, b: DccMonster) => number }[] = [
  { key: "", label: "Role", cmp: byRole },
  { key: "level", label: "Level", cmp: byLevel },
  { key: "name", label: "Name", cmp: byName },
];

// Homebrew records are unvalidated JSON; keep only those with the shape the card
// dereferences so one malformed entry can't crash the whole list.
function validMonster(m: unknown): m is DccMonster {
  const x = m as Record<string, unknown>;
  return !!x && typeof x.name === "string" && Array.isArray(x.tags) && Array.isArray(x.attacks)
    && Array.isArray(x.notes) && Array.isArray(x.hbSlots) && !!x.stats
    && STAT_ORDER.every((s) => !!(x.stats as Record<string, { score?: unknown }>)[s]);
}

// Group the many boss tiers into one "Boss" filter plus Mob / Rival Crawler.
const ROLE_FILTERS: { key: string; label: string; test: (r: DccMonster["role"]) => boolean }[] = [
  { key: "mob", label: "Mobs", test: (r) => r === "Mob" },
  { key: "boss", label: "Bosses", test: (r) => r.endsWith("Boss") || r === "Elite" },
  { key: "rival", label: "Rival Crawlers", test: (r) => r === "Rival Crawler" },
  { key: "npc", label: "NPCs", test: (r) => r === "NPC" },
];

function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.role) sp.set("role", next.role);
  if (next.src) sp.set("src", next.src);
  if (next.sort) sp.set("sort", next.sort);
  if (next.m) sp.set("m", next.m);
  const s = sp.toString();
  return s ? `${base}?${s}` : base;
}

// The facets the chips test, per creature — the same object the client reads
// back from `data-f` (lib/facets), so server and client always agree. `role`
// is the filter key its role falls under (several book roles → one chip).
const facets = (m: DccMonster) => ({
  role: ROLE_FILTERS.find((r) => r.test(m.role))?.key,
  src: m.source === "Homebrew" ? "hb" : "book",
});

function matches(m: DccMonster, q: string, roleKey: string, src: string): boolean {
  if (!facetMatch(facets(m), { role: roleKey, src })) return false;
  if (!q) return true;
  return (
    m.name.toLowerCase().includes(q) ||
    m.role.toLowerCase().includes(q) ||
    m.tags.some((t) => t.toLowerCase().includes(q)) ||
    m.notes.some((n) => n.toLowerCase().includes(q)) ||
    m.attacks.some((a) => a.name.toLowerCase().includes(q)) ||
    (m.flavor ? m.flavor.toLowerCase().includes(q) : false)
  );
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[var(--gold)]";
const hbBadge =
  "rounded border border-[var(--red)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gold)]";
const srcBadge =
  "rounded border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]";

// Health-bar segment colour, red→orange→yellow→green across the bar — mirrors the
// GM screen tracker's dccSegColor so a creature reads the same in both places.
// theme-literal-ok: pinned to mirror the GM screen's own dccSegColor copy. The GM
// screen is a route handler serving standalone HTML, so it cannot read these as
// tokens; tokenising only this side would let the two ramps drift apart silently.
const HB_BANDS = ["#b82018", "#c08020", "#c8a020", "#4caf50"];
function segColor(i: number, total: number): string {
  return HB_BANDS[Math.min(3, Math.floor((i * 4) / Math.max(1, total)))];
}

// The full creature record. This is the card's old body, moved here whole: the
// list card now carries a summary and links to `?m=<name>` for the rest.
function StatBlock({ m }: { m: DccMonster }) {
  const hb = m.source === "Homebrew";
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">{m.name}</h2>
        <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
          {m.role} · {SIZE_NAMES[m.size] ?? `Size ${m.size}`} · Level {m.level}
        </span>
        {hb ? <span className={hbBadge}>Homebrew</span> : <span className={srcBadge}>{m.source}{m.page ? ` · p.${m.page}` : ""}</span>}
      </div>

      {m.tags.length ? (
        <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{m.tags.join(" · ")}</div>
      ) : null}

      {m.flavor ? (
        <p className="mt-2 text-[13px] italic leading-relaxed text-[var(--text)]">{m.flavor}</p>
      ) : null}

      {/* Derived line: Surprise / Evade / Move / DR */}
      <div className="mt-2 grid grid-cols-4 gap-1.5 text-center">
        {[
          ["Surprise", m.surprise],
          ["Evade", m.evade],
          ["Move", m.move],
          ["DR", String(m.dr)],
        ].map(([label, value]) => (
          <div key={label} className="rounded border border-[var(--border)] px-1 py-1.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{label}</div>
            <div className="text-[13px] font-semibold tabular-nums text-[var(--text)]">{value}</div>
          </div>
        ))}
      </div>

      {/* Health Bar — read-only segments (each box = one slot's HP), coloured
          like the GM tracker. Not interactive. */}
      {m.hbSlots.length ? (
        <div className="mt-2">
          <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Health Bar · {m.hbSlots.length} {m.hbSlots.length === 1 ? "slot" : "slots"}
          </div>
          <div className="flex flex-wrap gap-1" aria-label={`Health Bar, ${m.hbSlots.length} slots`}>
            {m.hbSlots.map((hp, si) => (
              <div
                key={si}
                className="flex h-6 min-w-[24px] flex-1 items-center justify-center rounded-sm text-[10px] font-bold text-black"
                style={{ backgroundColor: segColor(si, m.hbSlots.length) }}
              >
                {hp}
              </div>
            ))}
          </div>
        </div>
      ) : null}

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
    </div>
  );
}

export default async function DccBestiaryPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dcc-monster" }),
    ownHomebrew(user.id, "dcc-monster"),
    userCampaigns(user.id),
  ]);
  const hbRows = hbVisible.map((h) => h.data as unknown as DccMonster).filter(validMonster);
  const homebrewCount = hbRows.length;

  const raw = await searchParams;
  const q = one(raw.q);
  const role = one(raw.role);
  const src = one(raw.src);
  const sort = one(raw.sort);
  const pick = one(raw.m);
  const needle = q.trim().toLowerCase();
  const activeRole = ROLE_FILTERS.some((r) => r.key === role) ? role : "";
  const activeSrc = src === "hb" || src === "book" ? src : "";
  const activeSort = SORTS.some((s) => s.key === sort && s.key) ? sort : "";
  const cmp = (SORTS.find((s) => s.key === activeSort) ?? SORTS[0]).cmp;

  const ALL_MONSTERS = [...hbRows, ...DCC_MONSTERS].sort(cmp);

  // An unknown ?m= falls through to the list rather than rendering an empty page.
  const selected = pick ? ALL_MONSTERS.find((x) => x.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <PageHeader title="Bestiary" subtitle={<>{DCC_MONSTERS.length} mobs, bosses &amp; NPCs{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}</>} />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← All creatures</a>
        <StatBlock m={selected} />
      </div>
    );
  }

  // Every creature is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint.
  const show = (m: DccMonster) => matches(m, needle, activeRole, activeSrc);
  const shown = ALL_MONSTERS.filter(show).length;
  const filtered = Boolean(needle || activeRole || activeSrc);
  const current: Query = { q: q.trim(), role: activeRole, src: activeSrc, sort: activeSort };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Bestiary" subtitle={<>{DCC_MONSTERS.length} mobs, bosses &amp; NPCs{homebrewCount ? ` + ${homebrewCount} homebrew` : ""}</>} />

      <DccHomebrewEditor kind="dcc-monster" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/dcc/bestiary" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          aria-label="Search creatures"
          placeholder="Search name, tag, attack, or ability…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeRole ? <input type="hidden" name="role" value={activeRole} /> : null}
        {activeSrc ? <input type="hidden" name="src" value={activeSrc} /> : null}
        {activeSort ? <input type="hidden" name="sort" value={activeSort} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Role
        </span>
        <a href={withParams(BASE, current, { role: "" })} data-chip="role:" aria-pressed={!activeRole} className={`${chipBase} ${activeRole ? chipOff : chipOn}`}>
          All
        </a>
        {ROLE_FILTERS.map((r) => (
          <a
            key={r.key}
            href={withParams(BASE, current, { role: r.key })}
            data-chip={`role:${r.key}`}
            aria-pressed={activeRole === r.key}
            className={`${chipBase} ${activeRole === r.key ? chipOn : chipOff}`}
          >
            {r.label}
          </a>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</span>
        <a href={withParams(BASE, current, { src: "" })} data-chip="src:" aria-pressed={!activeSrc} className={`${chipBase} ${activeSrc ? chipOff : chipOn}`}>All</a>
        <a href={withParams(BASE, current, { src: "book" })} data-chip="src:book" aria-pressed={activeSrc === "book"} className={`${chipBase} ${activeSrc === "book" ? chipOn : chipOff}`}>Official</a>
        <a href={withParams(BASE, current, { src: "hb" })} data-chip="src:hb" aria-pressed={activeSrc === "hb"} className={`${chipBase} ${activeSrc === "hb" ? chipOn : chipOff}`}>Homebrew</a>
      </div>

      {/* Sorting re-orders on the server, so these stay real navigations;
          data-nav keeps their hrefs in step with the live filters. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Sort</span>
        {SORTS.map((s) => (
          <Link key={s.key || "role"} href={withParams(BASE, current, { sort: s.key })} data-nav={`sort:${s.key}`} className={`${chipBase} ${activeSort === s.key ? chipOn : chipOff}`}>{s.label}</Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="creature" aria-live="polite">
          {shown} {shown === 1 ? "creature" : "creatures"}
        </span>
        <Link href="/dcc/bestiary" data-clear hidden={!filtered} className="text-[var(--red)] hover:underline">
          Clear filters
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No creature matches those filters. Try a broader search or{" "}
          <Link href="/dcc/bestiary" data-clear className="text-[var(--red)] underline">
            clear them
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {ALL_MONSTERS.map((m, i) => {
          const hb = m.source === "Homebrew";
          // The summary card omits notes, attacks and flavor, which the search
          // reads; data-s lets the client search them too.
          const extra = [...m.notes, ...m.attacks.map((a) => a.name), m.flavor ?? ""].join(" ");
          return (
            <li key={`${hb ? "hb" : "bk"}-${m.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4" hidden={!show(m)} data-f={facetAttr(facets(m))} data-s={extra}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <a href={withParams(BASE, {}, { m: m.name })} className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)] hover:underline">{m.name}</a>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {m.role} · {SIZE_NAMES[m.size] ?? `Size ${m.size}`} · Level {m.level}
                </span>
                {hb ? <span className={hbBadge}>Homebrew</span> : <span className={srcBadge}>{m.source}{m.page ? ` · p.${m.page}` : ""}</span>}
              </div>

              {m.tags.length ? (
                <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{m.tags.join(" · ")}</div>
              ) : null}
            </li>
          );
        })}
      </ul>
      </InstantFilter>
    </div>
  );
}
