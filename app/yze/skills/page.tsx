import { YZE_ATTRIBUTES, YZE_SKILLS } from "@/lib/data/yze-data";
import { YzeHeader, cardCls, nameCls, badge } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeSkillsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Skills" subtitle="Year Zero Engine · SRD v1.0 · the twelve core skills" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Each skill is tied to one of the four attributes. To act, roll a pool of D6 equal to the
        attribute score plus the skill level (plus any gear dice) — every 6 is a success. With no
        skill, you roll the attribute alone.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {YZE_ATTRIBUTES.map((a) => (
          <section key={a.key}>
            <h2 className="mb-2 flex items-baseline justify-between border-b border-[var(--border)] pb-1 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">
              <span>{a.name}</span>
              <span className="text-[11px] font-semibold text-[var(--muted)]">{a.key}</span>
            </h2>
            <p className="mb-3 text-[12px] italic leading-relaxed text-[var(--muted)]">{a.desc}</p>
            <ul className="flex flex-col gap-2">
              {YZE_SKILLS.filter((s) => s.attr === a.key).map((s) => (
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
