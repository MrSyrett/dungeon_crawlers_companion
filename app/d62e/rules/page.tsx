import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_MODULES } from "@/lib/data/d62e-modules";
import { D62E_TABLES } from "@/lib/data/d62e-tables";
import { D62eHeader, SectionH, cardCls, genreBadge, genreName } from "@/components/D62eRef";

export const dynamic = "force-dynamic";

function Dl({ rows }: { rows: { name?: string; title?: string; text: string }[] }) {
  return (
    <dl className="mt-2 grid gap-x-6 gap-y-2 md:grid-cols-2">
      {rows.map((r, i) => (
        <div key={(r.name ?? r.title ?? "") + i}>
          <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text)]">{r.name ?? r.title}</dt>
          <dd className="text-[12px] leading-relaxed text-[var(--muted)]">{r.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function D62eRulesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const T = D62E_TABLES;
  // Modules grouped by category, core first.
  const CAT_ORDER = ["Core Module", "Fantasy Module", "Science Fiction Module", "Superhero Module"];
  const cats = [...new Set(D62E_MODULES.map((m) => m.category))].sort((a, b) => {
    const ai = CAT_ORDER.indexOf(a), bi = CAT_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <D62eHeader title="Rules" subtitle="Quick reference, tables & the optional modules" />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Roll a die code (a number of six-sided dice plus a pip bonus, one of them the Wild Die) and beat a Difficulty Number. Below are the reference tables and the optional modules that tune the system for your table and genre.</p>

      <section className={`${cardCls} mb-4`}>
        <SectionH>Creating a character</SectionH>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
          Attribute dice: {T.creation.attributeDice}. Skill dice: {T.creation.skillDice}. Start with {T.creation.heroPoints} Hero Point.
          Dodge = {T.creation.dodge}; Parry = {T.creation.parry}.{T.creation.note ? ` ${T.creation.note}` : ""}
        </p>
      </section>

      <section className={`${cardCls} mb-4`}>
        <SectionH>Difficulty numbers</SectionH>
        <div className="mt-2 overflow-x-auto"><table className="w-full text-[12px]">
          <thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1 pr-3">Difficulty</th><th className="py-1 pr-3">Number</th><th className="py-1">Notes</th></tr></thead>
          <tbody>{T.difficulties.map((d) => <tr key={d.name} className="border-t border-[var(--border)] align-top"><td className="py-1 pr-3 text-[var(--text)]">{d.name}</td><td className="py-1 pr-3 font-mono text-[#ef9455]">{d.range}</td><td className="py-1 text-[var(--muted)]">{d.text}</td></tr>)}</tbody>
        </table></div>
      </section>

      <section className={`${cardCls} mb-4`}>
        <SectionH>Combat modifiers</SectionH>
        <Dl rows={T.combatModifiers} />
      </section>

      <section className={`${cardCls} mb-4`}>
        <SectionH>Damage & wounds</SectionH>
        <div className="mt-2 overflow-x-auto"><table className="w-full text-[12px]">
          <thead><tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]"><th className="py-1 pr-3">Result</th><th className="py-1">Effect</th></tr></thead>
          <tbody>{T.damageResults.map((d) => <tr key={d.range} className="border-t border-[var(--border)] align-top"><td className="py-1 pr-3 text-[var(--text)]">{d.range}</td><td className="py-1 text-[var(--muted)]">{d.text}</td></tr>)}</tbody>
        </table></div>
        <Dl rows={T.woundLevels} />
      </section>

      <section className={`${cardCls} mb-4`}>
        <SectionH>Hero Points</SectionH>
        <Dl rows={T.heroPoints} />
      </section>

      <section className={`${cardCls} mb-4`}>
        <SectionH>Quick rules</SectionH>
        <Dl rows={T.quickRules} />
      </section>

      {cats.map((cat) => (
        <section key={cat} className={`${cardCls} mb-4`}>
          <SectionH>{cat}s</SectionH>
          <ul className="mt-3 flex flex-col gap-3">
            {D62E_MODULES.filter((m) => m.category === cat).map((m) => (
              <li key={m.name} className="text-[12px] leading-relaxed text-[var(--muted)]">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{m.name}</span>
                  {m.genre !== "core" ? <span className={genreBadge}>{genreName(m.genre)}</span> : null}
                </div>
                {m.summary}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
