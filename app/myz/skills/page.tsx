import { MYZ_ATTRIBUTES, MYZ_SKILLS } from "@/lib/data/myz-data";
import { MyzHeader, cardCls, nameCls, badge } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

export default function MyzSkillsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Skills" subtitle="Mutant: Year Zero · the twelve skills (plus each role's specialist skill)" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {MYZ_ATTRIBUTES.map((a) => (
          <section key={a.key}>
            <h2 className="mb-2 flex items-baseline justify-between border-b border-[var(--border)] pb-1 text-base font-bold uppercase tracking-[0.12em]">
              <span>{a.name}</span>
              <span className="text-[11px] font-semibold text-[var(--muted)]">{a.key}</span>
            </h2>
            <p className="mb-3 text-[12px] italic leading-relaxed text-[var(--muted)]">{a.desc}</p>
            <ul className="flex flex-col gap-2">
              {MYZ_SKILLS.filter((s) => s.attr === a.key).map((s) => (
                <li key={s.name} className={cardCls}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className={nameCls}>{s.name}</h3>
                    <span className={badge}>{a.name}</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
