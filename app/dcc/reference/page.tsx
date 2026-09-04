import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DCC_TABLES } from "@/lib/data/dcc-tables";
import { DCC_QUICK_RULES } from "@/lib/data/dcc-quick-rules";

export const dynamic = "force-dynamic";

const cellHead =
  "px-2.5 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]";
const cell = "px-2.5 py-1.5 align-top text-[13px] text-[var(--text)]";
const wrap = "overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]";
const h2 = "mb-2 text-base font-bold uppercase tracking-[0.15em] text-[#f0a8a3]";

function statModRange(min: number, max: number | null): string {
  if (max === null) return `${min}+`;
  return min === max ? String(min) : `${min}–${max}`;
}
function rankRange(min: number, max: number): string {
  return min === max ? String(min) : `${min}–${max}`;
}

export default async function DccReferencePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const t = DCC_TABLES;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Rules &amp; Reference</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            Core tables &amp; quick rules
          </p>
        </div>
        <Link
          href="/dashboard"
          className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <div className="flex flex-col gap-10">
        {/* Stat modifiers */}
        <section>
          <h2 className={h2}>Stat Modifier Ladder</h2>
          <p className="mb-2 text-[13px] leading-relaxed text-[var(--muted)]">
            The Stat Mod is what you add to rolls; the full score sets it on this ladder.
          </p>
          <div className={wrap}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cellHead}>Score</th>
                  <th className={cellHead}>Modifier</th>
                </tr>
              </thead>
              <tbody>
                {t.statMods.map((r) => (
                  <tr key={`${r.min}`} className="border-b border-[var(--border)] last:border-0">
                    <td className={`${cell} tabular-nums`}>{statModRange(r.min, r.max)}</td>
                    <td className={`${cell} tabular-nums font-semibold`}>+{r.mod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rank damage */}
        <section>
          <h2 className={h2}>Rank Damage Bonus</h2>
          <p className="mb-2 text-[13px] leading-relaxed text-[var(--muted)]">
            Extra damage dice an attack skill or spell adds as its Rank climbs.
          </p>
          <div className={wrap}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cellHead}>Rank</th>
                  <th className={cellHead}>Bonus Dice</th>
                </tr>
              </thead>
              <tbody>
                {t.rankDamage.map((r) => (
                  <tr key={`${r.minRank}`} className="border-b border-[var(--border)] last:border-0">
                    <td className={`${cell} tabular-nums`}>{rankRange(r.minRank, r.maxRank)}</td>
                    <td className={`${cell} tabular-nums font-semibold`}>{r.dice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Degrees of success */}
        <section>
          <h2 className={h2}>Degrees of Success</h2>
          <div className={wrap}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cellHead}>Result</th>
                  <th className={cellHead}>Margin</th>
                  <th className={cellHead}>Attack</th>
                  <th className={cellHead}>Evade</th>
                  <th className={cellHead}>Non-Combat</th>
                </tr>
              </thead>
              <tbody>
                {t.degrees.map((d) => (
                  <tr key={d.result} className="border-b border-[var(--border)] last:border-0">
                    <td className={`${cell} whitespace-nowrap font-semibold`}>{d.result}</td>
                    <td className={`${cell} whitespace-nowrap text-[var(--muted)]`}>{d.margin}</td>
                    <td className={cell}>{d.attack ?? "—"}</td>
                    <td className={cell}>{d.evade ?? "—"}</td>
                    <td className={cell}>{d.nonCombat ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Core stats */}
        <section>
          <h2 className={h2}>The Five Stats</h2>
          <div className={wrap}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cellHead}>Stat</th>
                  <th className={cellHead}>Name</th>
                  <th className={cellHead}>Role</th>
                </tr>
              </thead>
              <tbody>
                {t.coreStats.map((c) => (
                  <tr key={c.key} className="border-b border-[var(--border)] last:border-0">
                    <td className={`${cell} whitespace-nowrap font-semibold`}>{c.key}</td>
                    <td className={`${cell} whitespace-nowrap`}>{c.name}</td>
                    <td className={`${cell} text-[var(--muted)]`}>{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className={h2}>Size Ladder</h2>
          <div className={wrap}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className={cellHead}>Size</th>
                  <th className={cellHead}>Name</th>
                  <th className={cellHead}>Examples</th>
                </tr>
              </thead>
              <tbody>
                {t.sizes.map((s) => (
                  <tr key={s.size} className="border-b border-[var(--border)] last:border-0">
                    <td className={`${cell} tabular-nums font-semibold`}>{s.size}</td>
                    <td className={`${cell} whitespace-nowrap`}>{s.name}</td>
                    <td className={`${cell} text-[var(--muted)]`}>{s.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Damage types */}
        <section>
          <h2 className={h2}>Damage Types</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Common</div>
              <div className="flex flex-wrap gap-1.5">
                {t.damageTypes.common.map((d) => (
                  <span key={d} className="rounded border border-[var(--border)] px-2 py-0.5 text-[12px] text-[var(--text)]">{d}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Uncommon</div>
              <div className="flex flex-wrap gap-1.5">
                {t.damageTypes.uncommon.map((d) => (
                  <span key={d} className="rounded border border-[var(--border)] px-2 py-0.5 text-[12px] text-[var(--text)]">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick rules digest */}
        <section>
          <h2 className={h2}>Quick Rules</h2>
          <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">
            Hand-curated digest from <span className="text-[var(--text)]">Rules for Survival</span>. Page numbers are the printed page.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
            {DCC_QUICK_RULES.map((r) => (
              <div key={r.title} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.title}</h3>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">p.{r.page}</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
