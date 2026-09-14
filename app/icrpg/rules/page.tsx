import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_RULES } from "@/lib/data/icrpg-rules";
import { ICRPG_STATS } from "@/lib/data/icrpg-stats";
import { ICRPG_EFFORT } from "@/lib/data/icrpg-effort";
import {
  IcrpgHeader, SearchForm, CountLine, EmptyState, SectionH, cardCls, nameCls, badge,
  one, type Query, type RawQuery,
} from "@/components/IcrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/rules";

export default async function IcrpgRulesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const current: Query = { q };

  const rules = ICRPG_RULES.filter((r) => !needle || [r.title, r.text].join(" ").toLowerCase().includes(needle));
  const stats = ICRPG_STATS.filter((s) => !needle || [s.name, s.abbr, s.desc].join(" ").toLowerCase().includes(needle));
  const effort = ICRPG_EFFORT.filter((e) => !needle || [e.name, e.die, e.desc].join(" ").toLowerCase().includes(needle));
  const total = rules.length + stats.length + effort.length;
  const filtered = Boolean(needle);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Rules" subtitle={`${ICRPG_RULES.length} rules · ${ICRPG_STATS.length} stats · ${ICRPG_EFFORT.length} effort dice`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Roll d20 + STAT vs one TARGET the GM sets for the whole room (usually 10–18); beat it and you succeed. Hard tasks are +3 TARGET, easy ones −3. When success needs measuring, roll EFFORT.</p>

      <SearchForm base={BASE} q={q} placeholder="Search rules…" hidden={{}} />
      <CountLine count={total} noun="entry" base={BASE} filtered={filtered} />

      {total === 0 ? (
        <EmptyState noun="rule" base={BASE} />
      ) : (
        <>
          {stats.length ? (
            <section className="mb-8">
              <SectionH>Core Stats</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {stats.map((s) => (
                  <li key={s.abbr} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{s.name}</h3>
                      <span className="font-mono text-[11px] text-[#e8823c]">{s.abbr}</span>
                    </div>
                    {s.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{s.desc}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {effort.length ? (
            <section className="mb-8">
              <SectionH>Effort Dice</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {effort.map((e) => (
                  <li key={e.name} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{e.name}</h3>
                      <span className={badge}>{e.die}</span>
                    </div>
                    {e.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{e.desc}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {rules.length ? (
            <section>
              <SectionH>Quick Rules</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {rules.map((r) => (
                  <li key={r.title} className={cardCls}>
                    <h3 className={nameCls}>{r.title}</h3>
                    {r.text ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
