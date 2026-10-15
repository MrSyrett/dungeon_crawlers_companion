import { VAE_HQ_UPGRADES } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

const TYPES = ["Facility", "Discovered Facility", "Contact", "Personnel"];

export default function VaesenSocietyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="The Society" subtitle="Vaesen · Castle Gyllencreutz and its upgrades" />
      <div className="flex flex-col gap-7">
        {TYPES.map((t) => {
          const list = VAE_HQ_UPGRADES.filter((u) => u.type === t);
          if (!list.length) return null;
          return (
            <section key={t}>
              <h2 className="mb-3 border-b border-[var(--border)] pb-1 text-base font-bold uppercase tracking-[0.12em]">{t === "Discovered Facility" ? "Discovered Facilities" : t + "s"}</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {list.map((u) => (
                  <div key={u.name} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{u.name}</h3>
                      <span className={badge}>{u.dp} DP</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[var(--muted)]"><b>Prerequisite:</b> {u.prereq}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{u.desc}</p>
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
