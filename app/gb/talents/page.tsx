import { GB_TRAITS } from "@/lib/data/gb-traits";
import { GB_TALENTS } from "@/lib/data/gb-talents";
import { GbHeader, TabRow, cardCls, nameCls, SectionH } from "@/components/GbRef";

export const dynamic = "force-dynamic";

const ORDER = ["Brains", "Muscles", "Moves", "Cool"];

export default function GbTalentsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <GbHeader title="Traits & Talents" subtitle="Ghostbusters International · four Traits, one Talent each (+3 dice)" />
      <TabRow active="/gb/talents" />
      <p className="mb-2 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Assign 12 points across the four Traits (1–5 each). Your Trait number is how many d6 you roll.
        Pick one Talent per Trait; when a task falls under it you roll 3 extra dice. The lists below are
        starting points — with the Ghostmaster&rsquo;s OK you can invent your own (viral oncology, anyone?).
      </p>

      {ORDER.map((tk) => {
        const t = GB_TRAITS.find((x) => x.name === tk);
        const list = GB_TALENTS.filter((x) => x.trait === tk);
        if (!t) return null;
        return (
          <section key={tk}>
            <SectionH>{tk}</SectionH>
            <div className={cardCls}>
              <p className="text-[13px] leading-relaxed text-[var(--text)]">{t.summary}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{t.covers}</p>
              <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--muted)]"><span className="text-[#8fce3f]">High:</span> {t.high} <span className="text-[#8fce3f]">Low:</span> {t.low}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {list.map((tl) => (
                  <span key={tl.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-0.5 text-[12px] text-[var(--text)]">{tl.name}</span>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
