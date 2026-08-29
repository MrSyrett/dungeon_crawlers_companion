import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_SKILLS } from "@/lib/data/sw-skills";
import { SW_TABLES } from "@/lib/data/sw-tables";
import { SW_FORCE } from "@/lib/data/sw-force";
import { SW_ATTRIBUTES } from "@/lib/data/sw-types";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, one, BookTag, BOOK_NAME, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/skills";
const ATTRS = [...SW_ATTRIBUTES.map((a) => ({ key: a, label: a })), { key: "Force", label: "The Force" }];
const FORCE_ORDER = ["Control", "Sense", "Alter", "Control & Sense", "Control & Alter", "Sense & Alter", "Control, Sense & Alter"];

export default async function SwSkillsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const attr = ATTRS.some((a) => a.key === one(raw.attr)) ? one(raw.attr) : "";
  const current: Query = { q, attr };
  const results = SW_SKILLS.filter((s) => attr !== "Force" && (!attr || s.attribute === attr) && (!needle || [s.name, s.description, s.time ?? ""].join(" ").toLowerCase().includes(needle)));
  const powers = SW_FORCE.filter((p) => (!attr || attr === "Force") && (!needle || [p.name, p.attribute, p.difficulty, p.description].join(" ").toLowerCase().includes(needle)));
  const powerGroups = [...new Set(powers.map((p) => p.attribute))].sort((a, b) => FORCE_ORDER.indexOf(a) - FORCE_ORDER.indexOf(b));
  const groups = SW_ATTRIBUTES.filter((a) => results.some((s) => s.attribute === a));
  const count = results.length + powers.length;
  const info = (a: string) => SW_TABLES.attributes.find((x) => x.name === a)?.description ?? "";
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <SwHeader title="Skills & The Force" subtitle={`${SW_SKILLS.length} skills under six attributes · ${SW_FORCE.length} Force powers`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Every skill starts at the code of the attribute it sits under; the dice you add go on top. Roll the skill against a difficulty number — or the attribute itself when no skill applies. Reaction skills (dodge, the parries, evasion, shields) can be used out of turn against an attack. Force skills — Control, Sense and Alter — belong to no attribute; the powers they unlock are listed at the bottom. <span className="text-[var(--sw)]">RC</span> marks Rules Companion revisions, with the core version folded underneath.</p>
      <SearchForm base={BASE} q={q} placeholder="Search skills…" hidden={{ attr }} />
      <ChipRow label="Attribute" base={BASE} current={current} param="attr" options={ATTRS} active={attr} />
      <CountLine count={count} noun="entry" base={BASE} filtered={Boolean(needle || attr)} />
      {count === 0 ? <EmptyState noun="skill or power" base={BASE} /> : null}
      {groups.map((a) => (
        <section key={a} className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]">{a}</h2>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{info(a)}</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((s) => s.attribute === a).map((s) => (
              <li key={s.name} className="text-[12px] leading-relaxed text-[var(--muted)]">
                <div className="flex flex-wrap items-baseline gap-2"><span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{s.name}</span>{s.reaction ? <span className={badge}>reaction</span> : null}<BookTag book={s.book} />{s.time ? <span className="text-[10px] uppercase tracking-[0.1em]">{s.time}</span> : null}<span className="text-[10px]">p.{s.page}</span></div>
                {s.description}
                {s.superseded ? <details className="mt-1"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">{BOOK_NAME[s.superseded.book]} version</summary><p className="mt-1">{s.superseded.description}</p></details> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
      {powers.length ? (
        <section className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]">The Force</h2>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">Force powers are rolled with Control, Sense and Alter (a power that uses two or three needs a roll on each). Using a power is an action; Force Points double every die for a round; calling on the dark side is always easier, and always costs.</p>
          <details className="mt-3"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#f0c020]">Force rules ({SW_TABLES.force.length})</summary><dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">{SW_TABLES.force.map((r) => <div key={r.name}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}</dl>
            {SW_TABLES.superseded.force ? <details className="mt-3"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">Core rulebook Force rules ({SW_TABLES.superseded.force.length})</summary><dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">{SW_TABLES.superseded.force.map((r, i) => <div key={i}><dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name}</dt><dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd></div>)}</dl></details> : null}
          </details>
          {powerGroups.map((g) => (
            <div key={g} className="mt-4">
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]">{g}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {powers.filter((p) => p.attribute === g).map((p) => (
                  <article key={p.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2"><h4 className={nameCls}>{p.name}<BookTag book={p.book} /></h4><span className={badge}>{p.time ?? ""}{p.time ? " · " : ""}p.{p.page}</span></div>
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Difficulty.</span> {p.difficulty}</p>
                    {p.requires?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Requires.</span> {p.requires.join(", ")}</p> : null}
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{p.description}</p>
                    {p.superseded ? <details className="mt-2"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">{BOOK_NAME[p.superseded.book]} version (p.{p.superseded.page})</summary><p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Difficulty.</span> {p.superseded.difficulty}</p><p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{p.superseded.description}</p></details> : null}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
