import { MYZ_TALENTS, MYZ_ROLES } from "@/lib/data/myz-data";
import { MyzHeader, cardCls, nameCls, badge } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

export default function MyzTalentsPage() {
  const groups = [...MYZ_ROLES.map((r) => r.name), "General"];
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Talents" subtitle="Mutant: Year Zero · role talents and general talents" />
      <div className="flex flex-col gap-7">
        {groups.map((g) => {
          const list = MYZ_TALENTS.filter((t) => t.role === g);
          if (!list.length) return null;
          return (
            <section key={g}>
              <h2 className="mb-3 border-b border-[var(--border)] pb-1 text-base font-bold uppercase tracking-[0.12em]">{g}</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {list.map((t) => (
                  <div key={t.name} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{t.name}</h3>
                      <span className={badge}>{t.role}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{t.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
