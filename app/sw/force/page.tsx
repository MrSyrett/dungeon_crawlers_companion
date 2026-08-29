import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_FORCE } from "@/lib/data/sw-force";
import { SW_TABLES } from "@/lib/data/sw-tables";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, one, BookTag, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/force";
const SKILLS = [{ key: "Control", label: "Control" }, { key: "Sense", label: "Sense" }, { key: "Alter", label: "Alter" }];
const uses = (p: (typeof SW_FORCE)[number], s: string) => p.attribute.includes(s);

export default async function SwForcePage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const skill = SKILLS.some((s) => s.key === one(raw.skill)) ? one(raw.skill) : "";
  const current: Query = { q, skill };
  const results = SW_FORCE.filter((p) => (!skill || uses(p, skill)) && (!needle || [p.name, p.attribute, p.difficulty, p.description].join(" ").toLowerCase().includes(needle)));
  const order = ["Control", "Sense", "Alter", "Control & Sense", "Control & Alter", "Sense & Alter", "Control, Sense & Alter"];
  const groups = [...new Set(results.map((p) => p.attribute))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const forceRules = SW_TABLES.force;
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <SwHeader title="The Force" subtitle={`${SW_FORCE.length} powers · Control, Sense & Alter`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Force powers are rolled with the Force skills Control, Sense and Alter (a power that uses two or three needs a roll on each). Using a power is an action; Force Points double every die for a round; calling on the dark side is always easier, and always costs. <span className="text-[var(--sw)]">RC</span> entries are the Rules Companion&rsquo;s revised difficulties; the core version sits underneath where it changed.</p>
      <details className="mb-5 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#f0c020]">Force rules ({forceRules.length})</summary><dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">{forceRules.map((r) => <div key={r.name}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}</dl>
        {SW_TABLES.superseded.force ? <details className="mt-3"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">Core rulebook Force rules ({SW_TABLES.superseded.force.length})</summary><dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">{SW_TABLES.superseded.force.map((r, i) => <div key={i}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}</dl></details> : null}
      </details>
      <SearchForm base={BASE} q={q} placeholder="Search powers…" hidden={{ skill }} />
      <ChipRow label="Uses" base={BASE} current={current} param="skill" options={SKILLS} active={skill} />
      <CountLine count={results.length} noun="power" base={BASE} filtered={Boolean(needle || skill)} />
      {results.length === 0 ? <EmptyState noun="power" base={BASE} /> : groups.map((g) => (
        <section key={g} className="mb-6">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]">{g}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {results.filter((p) => p.attribute === g).map((p) => (
              <article key={p.name} className={cardCls}>
                <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className={nameCls}>{p.name}<BookTag book={p.book} /></h3><span className={badge}>{p.time ?? ""}{p.time ? " · " : ""}p.{p.page}</span></div>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Difficulty.</span> {p.difficulty}</p>
                {p.requires?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Requires.</span> {p.requires.join(", ")}</p> : null}
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{p.description}</p>
                {p.superseded ? <details className="mt-2"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">Core rulebook version (p.{p.superseded.page})</summary><p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Difficulty.</span> {p.superseded.difficulty}</p><p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{p.superseded.description}</p></details> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
