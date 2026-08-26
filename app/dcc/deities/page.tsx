import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_DEITIES } from "@/lib/data/dcc-deities";
import type { DccDeity } from "@/lib/data/dcc-types";

export const dynamic = "force-dynamic";

type Query = { q?: string; stat?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

const DEITIES_AZ = [...DCC_DEITIES].sort((a, b) => a.name.localeCompare(b.name, "en"));
const STATS = [...new Set(DCC_DEITIES.map((d) => d.signatureStat).filter((s): s is NonNullable<DccDeity["signatureStat"]> => !!s))].sort();

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.stat) sp.set("stat", next.stat);
  const s = sp.toString();
  return s ? `/dcc/deities?${s}` : "/dcc/deities";
}

function haystack(d: DccDeity): string {
  return [
    d.name,
    d.temple,
    d.offering,
    d.rival,
    d.sponsor,
    d.symbol,
    ...d.signatureSkills,
    ...d.tiers.flatMap((t) => t.benefits),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matches(d: DccDeity, q: string, stat: string): boolean {
  if (stat && d.signatureStat !== stat) return false;
  if (!q) return true;
  return haystack(d).includes(q);
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const badge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]";

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className={badge}>
      {label} <span className="text-[var(--text)]">{value}</span>
    </span>
  );
}

// "Ogun, God of Blacksmithery and Armor" → name + epithet, so the card can lead
// with the god's name and set the title in muted type.
function splitName(full: string): { name: string; epithet: string } {
  const i = full.indexOf(",");
  return i === -1 ? { name: full, epithet: "" } : { name: full.slice(0, i), epithet: full.slice(i + 1).trim() };
}

export default async function DccDeitiesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q);
  const stat = one(raw.stat);
  const needle = q.trim().toLowerCase();
  const activeStat = STATS.includes(stat as NonNullable<DccDeity["signatureStat"]>) ? stat : "";

  const results = DEITIES_AZ.filter((d) => matches(d, needle, activeStat));
  const filtered = Boolean(needle || activeStat);
  const current: Query = { q: q.trim(), stat: activeStat };

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Deities</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            {DCC_DEITIES.length} gods of the Dungeon
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <form method="get" action="/dcc/deities" className="mb-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, skill, or boon…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {activeStat ? <input type="hidden" name="stat" value={activeStat} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      {STATS.length ? (
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
            Signature stat
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
      ) : null}

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "deity" : "deities"}
        </span>
        {filtered ? (
          <Link href="/dcc/deities" className="text-[var(--red)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No deity matches those filters. Try a broader search or{" "}
            <Link href="/dcc/deities" className="text-[var(--red)] underline">
              clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          {results.map((d, i) => {
            const { name, epithet } = splitName(d.name);
            return (
              <li key={`${d.name}-${i}`} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{name}</h2>
                  {d.signatureStat ? (
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      Signature {d.signatureStat}
                    </span>
                  ) : null}
                </div>
                {epithet ? <p className="mt-0.5 text-[13px] italic text-[var(--muted)]">{epithet}</p> : null}

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {d.temple ? <Badge label="Temple" value={d.temple} /> : null}
                  {d.offering ? <Badge label="Offering" value={d.offering} /> : null}
                  {d.rival ? <Badge label="Rival" value={d.rival} /> : null}
                  {d.sponsor ? <Badge label="Sponsor" value={d.sponsor} /> : null}
                </div>

                {d.signatureSkills.length ? (
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Signature skills:</span>{" "}
                    {d.signatureSkills.join(", ")}
                  </p>
                ) : null}
                {d.symbol ? (
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Symbol:</span> {d.symbol}
                  </p>
                ) : null}

                {d.tiers.length ? (
                  <div className="mt-3 flex flex-col gap-2 border-t border-[var(--border)] pt-3">
                    {d.tiers.map((t) => (
                      <div key={t.tier}>
                        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0a8a3]">{t.tier}</div>
                        <ul className="mt-1 flex flex-col gap-0.5">
                          {t.benefits.map((b, bi) => (
                            <li key={bi} className="text-[13px] leading-relaxed text-[var(--muted)]">
                              • {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
