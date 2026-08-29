import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_SKILLS } from "@/lib/data/sw-skills";
import { SW_TABLES } from "@/lib/data/sw-tables";
import { SW_ATTRIBUTES } from "@/lib/data/sw-types";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, badge, one, BookTag, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/skills";
const ATTRS = SW_ATTRIBUTES.map((a) => ({ key: a, label: a }));

export default async function SwSkillsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const attr = ATTRS.some((a) => a.key === one(raw.attr)) ? one(raw.attr) : "";
  const current: Query = { q, attr };
  const results = SW_SKILLS.filter((s) => (!attr || s.attribute === attr) && (!needle || [s.name, s.description, s.time ?? ""].join(" ").toLowerCase().includes(needle)));
  const groups = SW_ATTRIBUTES.filter((a) => results.some((s) => s.attribute === a));
  const info = (a: string) => SW_TABLES.attributes.find((x) => x.name === a)?.description ?? "";
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <SwHeader title="Attributes & Skills" subtitle={`${SW_SKILLS.length} skills under six attributes`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Every skill starts at the code of the attribute it sits under; the dice you add go on top. Roll the skill against a difficulty number — or the attribute itself when no skill applies. Reaction skills (dodge, the parries, evasion, shields) can be used out of turn against an attack. Force skills — Control, Sense and Alter — belong to no attribute; see The Force.</p>
      <SearchForm base={BASE} q={q} placeholder="Search skills…" hidden={{ attr }} />
      <ChipRow label="Attribute" base={BASE} current={current} param="attr" options={ATTRS} active={attr} />
      <CountLine count={results.length} noun="skill" base={BASE} filtered={Boolean(needle || attr)} />
      {results.length === 0 ? <EmptyState noun="skill" base={BASE} /> : groups.map((a) => (
        <section key={a} className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]">{a}</h2>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{info(a)}</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((s) => s.attribute === a).map((s) => (
              <li key={s.name} className="text-[12px] leading-relaxed text-[var(--muted)]">
                <div className="flex flex-wrap items-baseline gap-2"><span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{s.name}</span>{s.reaction ? <span className={badge}>reaction</span> : null}<BookTag book={s.book} />{s.time ? <span className="text-[10px] uppercase tracking-[0.1em]">{s.time}</span> : null}<span className="text-[10px]">p.{s.page}</span></div>
                {s.description}
                {s.superseded ? <details className="mt-1"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">Core rulebook version</summary><p className="mt-1">{s.superseded.description}</p></details> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
