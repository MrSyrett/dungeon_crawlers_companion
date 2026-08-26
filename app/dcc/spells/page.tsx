import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_SPELLS } from "@/lib/data/dcc-spells";
import type { DccSpell } from "@/lib/data/dcc-types";

export const dynamic = "force-dynamic";

// Homebrew is not wired for DCC yet (roadmap Phase 6). When it is, merge visible
// homebrew spells into ALL_ROWS here the way /spells (Shadowdark) does and add a
// "Homebrew" chip to the Type filter — the card already has a badge slot for it.

type Query = { q?: string; type?: string; stat?: string };
// A repeated key (?q=a&q=b) arrives as an array; collapse so a hand-built URL can't crash us.
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const SPELLS_AZ = [...DCC_SPELLS].sort((a, b) => a.name.localeCompare(b.name, "en"));

// The three spell types, in display order, with their singular/plural nouns.
const TYPES: { key: DccSpell["type"]; label: string; noun: string; plural: string }[] = [
  { key: "attack", label: "Attack", noun: "attack spell", plural: "attack spells" },
  { key: "heal", label: "Healing", noun: "healing spell", plural: "healing spells" },
  { key: "utility", label: "Utility", noun: "utility spell", plural: "utility spells" },
];

// Stats that actually appear as a spell's casting stat (most are INT; a few CHA/CON).
const STATS = [...new Set(DCC_SPELLS.map((s) => s.stat))].sort();

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.type) sp.set("type", next.type);
  if (next.stat) sp.set("stat", next.stat);
  const s = sp.toString();
  return s ? `/dcc/spells?${s}` : "/dcc/spells";
}

function matches(s: DccSpell, q: string, type: string, stat: string): boolean {
  if (type && s.type !== type) return false;
  if (stat && s.stat !== stat) return false;
  if (!q) return true;
  return s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const badge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]";

export default async function DccSpellsPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q);
  const type = one(raw.type);
  const stat = one(raw.stat);
  const needle = q.trim().toLowerCase();
  const activeType = TYPES.some((t) => t.key === type) ? type : "";
  const activeStat = STATS.includes(stat as DccSpell["stat"]) ? stat : "";

  const results = SPELLS_AZ.filter((s) => matches(s, needle, activeType, activeStat));
  const filtered = Boolean(needle || activeType || activeStat);
  const current: Query = { q: q.trim(), type: activeType, stat: activeStat };
  const activeMeta = TYPES.find((t) => t.key === activeType);
  const noun = activeMeta?.noun ?? "spell";
  const plural = activeMeta?.plural ?? "spells";

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Spells</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_SPELLS.length} Dungeon Crawler Carl spells
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <form method="get" action="/dcc/spells" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or effect…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeType ? <input type="hidden" name="type" value={activeType} /> : null}
        {activeStat ? <input type="hidden" name="stat" value={activeStat} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <Link href={withParams(current, { type: "" })} className={`${chipBase} ${activeType ? chipOff : chipOn}`}>
          All
        </Link>
        {TYPES.map((t) => (
          <Link
            key={t.key}
            href={withParams(current, { type: t.key })}
            className={`${chipBase} ${activeType === t.key ? chipOn : chipOff}`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Stat
        </span>
        <Link href={withParams(current, { stat: "" })} className={`${chipBase} ${activeStat ? chipOff : chipOn}`}>
          Any
        </Link>
        {STATS.map((st) => (
          <Link
            key={st}
            href={withParams(current, { stat: st })}
            className={`${chipBase} ${activeStat === st ? chipOn : chipOff}`}
          >
            {st}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? noun : plural}
        </span>
        {filtered ? (
          <Link href="/dcc/spells" className="text-[var(--red)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No spell matches those filters. Try a broader search or{" "}
            <Link href="/dcc/spells" className="text-[var(--red)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((s, i) => {
            const typeLabel = TYPES.find((t) => t.key === s.type)?.label ?? s.type;
            return (
              <li
                key={`${s.name}-${i}`}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{s.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {typeLabel} · {s.mana} Mana · {s.stat}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.passive ? (
                    <span className={badge}>
                      <span className="text-[var(--text)]">Passive</span>
                    </span>
                  ) : null}
                  {typeof s.aiFavor === "number" ? (
                    <span className={badge}>
                      AI Favor <span className="text-[var(--text)]">{s.aiFavor}</span>
                    </span>
                  ) : null}
                </div>

                {s.desc ? (
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
                ) : null}

                {s.upgrades.length ? (
                  <dl className="mt-3 flex flex-col gap-1.5 border-t border-[var(--border)] pt-3">
                    {s.upgrades.map((u) => (
                      <div key={u.rank} className="flex gap-2 text-[12px] leading-relaxed">
                        <dt className="shrink-0 font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                          Rank {u.rank}
                        </dt>
                        <dd className="text-[var(--muted)]">{u.text}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
