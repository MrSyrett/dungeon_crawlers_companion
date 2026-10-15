import { VAE_ARCHETYPES } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

export default function VaesenArchetypesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Archetypes" subtitle="Vaesen · the ten walks of life that gained the Sight" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {VAE_ARCHETYPES.map((a) => (
          <div key={a.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{a.name}</h3>
              <span className={badge}>Key {a.key}</span>
              <span className={badge}>{a.keySkill}</span>
              <span className={badge}>Resources {a.resources}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]">
              <b className="text-[var(--muted)]">Talents:</b> {a.talents.join(", ")}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">
              <b className="text-[var(--muted)]">Equipment:</b> {a.equipment}
            </p>
            <details className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
              <summary className="cursor-pointer text-[var(--sys-link)]">Trauma &amp; dark secrets</summary>
              <p className="mt-1"><b>Trauma:</b> {a.trauma.join(" · ")}</p>
              <p className="mt-1"><b>Dark secret:</b> {a.darkSecret.join(" · ")}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
