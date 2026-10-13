import { ALIEN_TALENTS } from "@/lib/data/yze-alien-data";
import { YzeHeader, badge } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeTalentsPage() {
  const careerTalents = ALIEN_TALENTS.filter((t) => t.career !== "General");
  const generalTalents = ALIEN_TALENTS.filter((t) => t.career === "General");
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Talents" subtitle="ALIEN RPG · career & general talents" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        You start with one talent from your career and can earn more with experience. Career talents
        belong to a specific career; general talents are open to anyone.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Career talents</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {careerTalents.map((t) => (
            <div key={t.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[13px] font-bold text-[var(--sys-link)]">{t.name}</span>
                <span className={badge}>{t.career}</span>
              </div>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text)]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">General talents</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {generalTalents.map((t) => (
            <div key={t.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <span className="text-[13px] font-bold text-[var(--sys-link)]">{t.name}</span>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text)]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
