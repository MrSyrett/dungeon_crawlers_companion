import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MONSTERS, type Monster } from "@/lib/data/monsters";
import { MONSTER_TYPES, typeOf } from "@/lib/data/monster-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";

export const dynamic = "force-dynamic";

type Query = { q?: string; lv?: string; al?: string; type?: string };

// What the URL can actually hand us — a repeated key (?q=a&q=b) arrives as an array.
type RawQuery = { [K in keyof Query]?: string | string[] };

// Collapse to a single value so a hand-crafted URL can't crash the page.
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const ALIGNMENTS: { key: string; label: string }[] = [
  { key: "L", label: "Lawful" },
  { key: "N", label: "Neutral" },
  { key: "C", label: "Chaotic" },
];

// Levels and creature types are computed per request now, since homebrew can
// introduce values the book doesn't have (see allLevels / allTypes below).

const STAT_KEYS = ["s", "d", "c", "i", "w", "ch"] as const;
const STAT_LABELS: Record<(typeof STAT_KEYS)[number], string> = {
  s: "STR",
  d: "DEX",
  c: "CON",
  i: "INT",
  w: "WIS",
  ch: "CHA",
};

// Build a href that keeps the other filters intact and drops empty ones.
function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.lv) sp.set("lv", next.lv);
  if (next.al) sp.set("al", next.al);
  if (next.type) sp.set("type", next.type);
  const s = sp.toString();
  return s ? `/bestiary?${s}` : "/bestiary";
}

type Row = Monster & { homebrew: boolean; ctype: string };

function matches(m: Row, q: string, lv: string, al: string, type: string): boolean {
  if (lv && m.lv !== lv) return false;
  if (al && m.al !== al) return false;
  if (type && m.ctype !== type) return false;
  if (!q) return true;
  // Search the text a GM actually scans for: name, what it does, and its notes.
  return (
    m.name.toLowerCase().includes(q) ||
    m.atk.toLowerCase().includes(q) ||
    m.notes.toLowerCase().includes(q)
  );
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";
const chipOn = "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]";

export default async function BestiaryPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "monster" }),
    ownHomebrew(user.id, "monster"),
    userCampaigns(user.id),
  ]);

  const str = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return {
      name: str(d.name) || h.name,
      ac: str(d.ac), hp: str(d.hp), atk: str(d.atk), mv: str(d.mv),
      lv: str(d.lv), al: str(d.al),
      s: str(d.s), d: str(d.d), c: str(d.c), i: str(d.i), w: str(d.w), ch: str(d.ch),
      notes: str(d.notes),
      homebrew: true,
      ctype: str(d.ctype) || "Monster",
    };
  });
  const bookRows: Row[] = MONSTERS.map((m) => ({ ...m, homebrew: false, ctype: typeOf(m.name) }));
  const ALL_ROWS: Row[] = [...hbRows, ...bookRows].sort((a, b) => a.name.localeCompare(b.name, "en"));

  // Levels and types offered include anything homebrew brings in, so a filter
  // can't hide a monster the user just made.
  const allLevels = [...new Set(ALL_ROWS.map((m) => m.lv))].sort((a, b) => {
    const na = parseInt(a), nb = parseInt(b);
    if (Number.isNaN(na) && Number.isNaN(nb)) return a.localeCompare(b);
    if (Number.isNaN(na)) return 1;
    if (Number.isNaN(nb)) return -1;
    return na - nb;
  });
  const allTypes = MONSTER_TYPES.filter((t) => ALL_ROWS.some((m) => m.ctype === t));

  const raw = await searchParams;
  const q = one(raw.q);
  const lv = one(raw.lv);
  const al = one(raw.al);
  const type = one(raw.type);
  const needle = q.trim().toLowerCase();
  const activeLv = allLevels.includes(lv) ? lv : "";
  const activeAl = ALIGNMENTS.some((a) => a.key === al) ? al : "";
  const activeType = (allTypes as readonly string[]).includes(type) ? type : "";

  const results = ALL_ROWS.filter((m) => matches(m, needle, activeLv, activeAl, activeType));
  const filtered = Boolean(needle || activeLv || activeAl || activeType);
  const current: Query = { q: q.trim(), lv: activeLv, al: activeAl, type: activeType };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Bestiary</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {MONSTERS.length} Shadowdark monsters{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <HomebrewManager
        type="monster"
        campaigns={campaigns}
        initial={hbOwn}
        monsterTypes={[...MONSTER_TYPES]}
      />

      {/* A plain GET form, so search works with JavaScript disabled. */}
      <form method="get" action="/bestiary" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, attacks, or abilities…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        {activeLv ? <input type="hidden" name="lv" value={activeLv} /> : null}
        {activeAl ? <input type="hidden" name="al" value={activeAl} /> : null}
        {activeType ? <input type="hidden" name="type" value={activeType} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <Link
          href={withParams(current, { type: "" })}
          className={`${chipBase} ${activeType ? chipOff : chipOn}`}
        >
          Any
        </Link>
        {allTypes.map((t) => (
          <Link
            key={t}
            href={withParams(current, { type: t })}
            className={`${chipBase} ${activeType === t ? chipOn : chipOff}`}
          >
            {t}
          </Link>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Level
        </span>
        <Link href={withParams(current, { lv: "" })} className={`${chipBase} ${activeLv ? chipOff : chipOn}`}>
          Any
        </Link>
        {allLevels.map((l) => (
          <Link
            key={l}
            href={withParams(current, { lv: l })}
            className={`${chipBase} ${activeLv === l ? chipOn : chipOff}`}
          >
            {l}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Align
        </span>
        <Link href={withParams(current, { al: "" })} className={`${chipBase} ${activeAl ? chipOff : chipOn}`}>
          Any
        </Link>
        {ALIGNMENTS.map((a) => (
          <Link
            key={a.key}
            href={withParams(current, { al: a.key })}
            className={`${chipBase} ${activeAl === a.key ? chipOn : chipOff}`}
          >
            {a.label}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "monster" : "monsters"}
        </span>
        {filtered ? (
          <Link href="/bestiary" className="text-[var(--gold)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No monster matches those filters. Try a broader search or{" "}
            <Link href="/bestiary" className="text-[var(--gold)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {results.map((m) => (
            <li
              key={`${m.homebrew ? "hb" : "bk"}-${m.name}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                  {m.name}
                </h2>
                {m.homebrew ? (
                  <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    Homebrew
                  </span>
                ) : null}
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {m.ctype} · LV {m.lv} · AC {m.ac} · HP {m.hp} · {m.al}
                </span>
              </div>

              <p className="mt-2 text-sm leading-relaxed">{m.atk}</p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">Move: {m.mv}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {STAT_KEYS.map((k) => (
                  <span
                    key={k}
                    className="rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]"
                  >
                    {STAT_LABELS[k]} <span className="text-[var(--text)]">{m[k]}</span>
                  </span>
                ))}
              </div>

              {m.notes ? (
                <p className="mt-3 border-t border-[var(--border)] pt-3 text-[13px] leading-relaxed text-[var(--muted)]">
                  {m.notes}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
