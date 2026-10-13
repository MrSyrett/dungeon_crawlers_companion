import { VAE_TALENTS, VAE_ARCHETYPES } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

export default function VaesenTalentsPage() {
  const groups = [...VAE_ARCHETYPES.map((a) => a.name), "General"];
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Talents" subtitle="Vaesen · archetype talents and general talents" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        You start with one talent from your archetype&rsquo;s three. Each Advance (5 XP) buys another — any
        talent, including a general one or another archetype&rsquo;s. Many grant +2 dice to a skill or Fear
        test, or let you ignore Condition penalties for a particular skill.
      </p>
      <div className="flex flex-col gap-7">
        {groups.map((g) => {
          const list = VAE_TALENTS.filter((t) => t.archetype === g);
          if (!list.length) return null;
          return (
            <section key={g}>
              <h2 className="mb-3 border-b border-[var(--border)] pb-1 text-base font-bold uppercase tracking-[0.12em]">{g}</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {list.map((t) => (
                  <div key={t.name} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{t.name}</h3>
                      <span className={badge}>{t.archetype}</span>
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
