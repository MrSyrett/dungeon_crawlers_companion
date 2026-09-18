import { GB_EQUIPMENT } from "@/lib/data/gb-equipment";
import { GB_GOALS } from "@/lib/data/gb-goals";
import { GB_POWERS } from "@/lib/data/gb-powers";
import { GbHeader, TabRow, cardCls, nameCls, catBadge, SectionH } from "@/components/GbRef";

export const dynamic = "force-dynamic";

export default function GbGearPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <GbHeader title="Gear & Goals" subtitle="Ghostbusters International · the Big List, your Goal, and ghost Powers" />
      <TabRow active="/gb/gear" />

      {["Weapon (ranged)", "Weapon (melee)", "Gear"].map((cat) => {
        const items = GB_EQUIPMENT.filter((e) => (e.category || "Gear") === cat);
        if (!items.length) return null;
        return (
          <div key={cat}>
            <SectionH>{cat === "Gear" ? "Gear & Gizmos" : cat}</SectionH>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {items.map((e) => (
                <div key={e.name} className={cardCls}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={nameCls}>{e.name}</h3>
                    <span className="flex items-center gap-1.5">
                      <span className={badgeCls}>{e.hands} hand</span>
                      {e.muscles ? <span className={catBadge}>{e.muscles} Mus</span> : null}
                    </span>
                  </div>
                  {(e.damage || e.toHit || e.rangeMax || e.special) ? (
                    <div className="mt-1 flex flex-wrap gap-2 font-mono text-[11px] text-[var(--muted)]">
                      {e.damage ? <span className="text-[#8fce3f]">dmg {e.damage}</span> : null}
                      {e.toHit ? <span>to-hit {e.toHit}</span> : null}
                      {e.rangeMax ? <span>range {e.rangeMax}/{e.rangeIncrement}</span> : null}
                      {e.special ? <span className="text-[var(--gb)]">{e.special}</span> : null}
                    </div>
                  ) : null}
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <SectionH>Goals <span className="text-[11px] font-normal text-[var(--muted)]">— achieving yours earns Brownie Points</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_GOALS.map((g) => (
          <div key={g.name} className={cardCls}>
            <h3 className={nameCls}>{g.name}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{g.description}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed"><span className="font-semibold text-[#8fce3f]">Earn:</span> <span className="text-[var(--muted)]">{g.award}</span></p>
            <p className="mt-0.5 text-[12px] leading-relaxed"><span className="font-semibold text-[var(--gb)]">Risk:</span> <span className="text-[var(--muted)]">{g.penalty}</span></p>
          </div>
        ))}
      </div>

      <SectionH>Ghost Powers <span className="text-[11px] font-normal text-[var(--muted)]">— what the extras bring</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {GB_POWERS.map((p) => (
          <div key={p.name} className={cardCls}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#8fce3f]">{p.name}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const badgeCls = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
