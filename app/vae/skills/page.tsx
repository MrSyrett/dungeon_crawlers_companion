import { VAE_ATTRIBUTES, VAE_SKILLS } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

export default function VaesenSkillsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Attributes & Skills" subtitle="Vaesen · the four attributes and their twelve skills" />
      <div className="flex flex-col gap-7">
        {VAE_ATTRIBUTES.map((a) => (
          <section key={a.key}>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 border-b border-[var(--border)] pb-1">
              <h2 className="text-base font-bold uppercase tracking-[0.12em]">{a.name}</h2>
              <span className={badge}>{a.key}</span>
              <span className="text-[12px] text-[var(--muted)]">{a.desc}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {VAE_SKILLS.filter((s) => s.attr === a.key).map((s) => (
                <div key={s.name} className={cardCls}>
                  <h3 className={nameCls}>{s.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
