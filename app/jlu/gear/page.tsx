import { JLU_EQUIPMENT } from "@/lib/data/jlu-equipment";
import { JLU_KNOWLEDGE } from "@/lib/data/jlu-knowledge";
import { JLU_TRAITS } from "@/lib/data/jlu-traits";
import { JLU_LIMITATIONS } from "@/lib/data/jlu-limitations";
import { JluHeader, TabRow, cardCls, nameCls, catBadge, SectionH } from "@/components/JluRef";

export const dynamic = "force-dynamic";

const EQ_CATS = ["Weapon", "Material", "Gear"] as const;

export default function JluGearPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <JluHeader title="Gear & Traits" subtitle="Justice League Unlimited · equipment, knowledge, traits & limitations" />
      <TabRow active="/jlu/gear" />

      <SectionH>Knowledge <span className="text-[11px] font-normal text-[var(--muted)]">— 4 PAX each</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {JLU_KNOWLEDGE.map((k) => (
          <div key={k.name} className={cardCls}>
            <h3 className={nameCls}>{k.name}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{k.summary}</p>
            <ul className="mt-2 space-y-1">
              {k.abilities.map((a) => (
                <li key={a.name} className="text-[12px] leading-relaxed"><span className="font-semibold text-[#5b8dfb]">{a.name}:</span> <span className="text-[var(--muted)]">{a.text}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionH>Traits <span className="text-[11px] font-normal text-[var(--muted)]">— Simple, 4 PAX each</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {JLU_TRAITS.map((t) => (
          <div key={t.name} className={cardCls}>
            <h3 className={nameCls}>{t.name}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{t.text}</p>
          </div>
        ))}
      </div>

      <SectionH>Limitations</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {JLU_LIMITATIONS.map((l) => (
          <div key={l.name} className={cardCls}>
            <h3 className={nameCls}>{l.name}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{l.text}</p>
            <p className="mt-1 text-[11px] italic text-[var(--muted)]">e.g. {l.example}</p>
          </div>
        ))}
      </div>

      <SectionH>Equipment</SectionH>
      {EQ_CATS.map((cat) => {
        const list = JLU_EQUIPMENT.filter((e) => e.category === cat);
        if (!list.length) return null;
        return (
          <div key={cat} className="mb-4">
            <h3 className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--jlu)]">{cat === "Material" ? "Special Materials" : cat === "Gear" ? "Gear (3 uses / Issue)" : "Weapons"}</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {list.map((e) => (
                <div key={e.name} className={cardCls}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#5b8dfb]">{e.name}</h4>
                    <span className={catBadge}>{e.cost}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
