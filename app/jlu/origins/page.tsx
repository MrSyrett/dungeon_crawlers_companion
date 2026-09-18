import { JLU_ORIGINS } from "@/lib/data/jlu-origins";
import { JLU_ARCHETYPES } from "@/lib/data/jlu-archetypes";
import { JLU_ATTRIBUTES } from "@/lib/data/jlu-attributes";
import { JluHeader, TabRow, cardCls, nameCls, catBadge, SectionH } from "@/components/JluRef";

export const dynamic = "force-dynamic";

export default function JluOriginsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <JluHeader title="Origins & Archetypes" subtitle="Justice League Unlimited · who you are and why you fight" />
      <TabRow active="/jlu/origins" />

      <SectionH>Attributes</SectionH>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {JLU_ATTRIBUTES.map((a) => (
          <div key={a.name} className={cardCls}>
            <h3 className={nameCls}>{a.name}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{a.summary}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] leading-relaxed text-[var(--muted)]">
              {a.uses.map((u, i) => <li key={i}>{u}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <SectionH>Origins</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {JLU_ORIGINS.map((o) => (
          <div key={o.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={nameCls}>{o.name}</h3>
              <span className={catBadge}>{o.canBuyOutsideKit ? "others ×2 PAX" : "kit only"}</span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{o.description}</p>
            <p className="mt-2 text-[12px]"><span className="font-semibold text-[#5b8dfb]">Power Kit:</span> {o.powerKit.join(", ")}</p>
            <p className="mt-1 text-[12px]"><span className="font-semibold text-[#5b8dfb]">Free Power:</span> {o.freePower}</p>
            <ul className="mt-2 space-y-1.5">
              {o.features.map((f) => (
                <li key={f.name} className="text-[12.5px] leading-relaxed">
                  <span className="font-semibold text-[#5b8dfb]">{f.name}.</span> <span className="text-[var(--text)]">{f.text}</span>
                </li>
              ))}
            </ul>
            {o.limitation ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--jlu)]">Limitation:</span> {o.limitation}</p> : null}
          </div>
        ))}
      </div>

      <SectionH>Archetypes</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {JLU_ARCHETYPES.map((a) => (
          <div key={a.name} className={cardCls}>
            <h3 className={nameCls}>{a.name}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{a.summary}</p>
            <p className="mt-1 text-[12px] italic text-[var(--muted)]">e.g. {a.examples}</p>
            <p className="mt-2 text-[12px] leading-relaxed"><span className="font-semibold text-[var(--jlu)]">{a.drawback.name}:</span> {a.drawback.text}</p>
            <ul className="mt-2 space-y-1.5">
              {a.abilities.map((ab) => (
                <li key={ab.name} className="text-[12.5px] leading-relaxed">
                  <span className="font-semibold text-[#5b8dfb]">{ab.name}.</span> <span className="text-[var(--text)]">{ab.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
