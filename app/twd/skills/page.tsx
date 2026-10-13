import { TWD_ATTRIBUTES, TWD_SKILLS } from "@/lib/data/twd-data";
import { TwdHeader, cardCls, nameCls, badge } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

export default function TwdSkillsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="Skills" subtitle="The Walking Dead · the twelve core skills" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Each skill is tied to one of the four attributes. To act, roll a pool of D6 equal to the
        attribute plus the skill level (plus any gear bonus) — every 6 is a success. For each point
        of stress you carry, add one stress die; roll a <b>1</b> on a stress die and you&rsquo;ve
        messed up, usually raising the Threat Level.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TWD_ATTRIBUTES.map((a) => (
          <section key={a.key}>
            <h2 className="mb-2 flex items-baseline justify-between border-b border-[var(--border)] pb-1 text-base font-bold uppercase tracking-[0.12em]">
              <span>{a.name}</span>
              <span className="text-[11px] font-semibold text-[var(--muted)]">{a.key}</span>
            </h2>
            <p className="mb-3 text-[12px] italic leading-relaxed text-[var(--muted)]">{a.desc}</p>
            <ul className="flex flex-col gap-2">
              {TWD_SKILLS.filter((s) => s.attr === a.key).map((s) => (
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
