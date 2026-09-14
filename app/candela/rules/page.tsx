import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { CO_RULES, CO_DRIVES, CO_ACTIONS } from "@/lib/data/candela-data";
import {
  CandelaHeader, SearchForm, CountLine, EmptyState, SectionH, cardCls, nameCls, badge,
  one, type Query, type RawQuery,
} from "@/components/CandelaRef";

export const dynamic = "force-dynamic";
const BASE = "/candela/rules";

export default async function CandelaRulesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const current: Query = { q };

  const rules = CO_RULES.filter((r) => !needle || [r.title, r.text].join(" ").toLowerCase().includes(needle));
  const drives = CO_DRIVES.filter((d) => !needle || [d.name, d.blurb, d.actions.join(" ")].join(" ").toLowerCase().includes(needle));
  const actions = CO_ACTIONS.filter((a) => !needle || [a.name, a.drive, a.sub, a.desc].join(" ").toLowerCase().includes(needle));
  const total = rules.length + drives.length + actions.length;
  const filtered = Boolean(needle);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <CandelaHeader title="Rules" subtitle={`${CO_RULES.length} rules · 3 drives · ${CO_ACTIONS.length} actions`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        Candela Obscura runs on the Illuminated Worlds engine. Take d6 equal to your action rating (0&ndash;3),
        spend a drive point or accept help for +1d (max six dice), and read the highest die: 6 succeeds,
        4&ndash;5 is a mixed success, 1&ndash;3 misses. Gilded dice refresh drive.
      </p>

      <SearchForm base={BASE} q={q} placeholder="Search rules…" hidden={{}} />
      <CountLine count={total} noun="entry" base={BASE} filtered={filtered} />

      {total === 0 ? (
        <EmptyState noun="rule" base={BASE} />
      ) : (
        <>
          {rules.length ? (
            <section className="mb-8">
              <SectionH>Core Rules</SectionH>
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
          {drives.length ? (
            <section className="mb-8">
              <SectionH>Drives</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {drives.map((d) => (
                  <li key={d.name} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{d.name}</h3>
                      <span className={badge}>{d.actions.join(" · ")}</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{d.blurb}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {actions.length ? (
            <section>
              <SectionH>Actions</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {actions.map((a) => (
                  <li key={a.name} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{a.name}</h3>
                      <span className={badge}>{a.drive}</span>
                      <span className="text-[11px] uppercase tracking-[0.08em] text-[#3fc2b0]">{a.sub}</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{a.desc}</p>
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
