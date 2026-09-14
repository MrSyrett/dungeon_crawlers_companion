import { DS_ARCHETYPES } from "@/lib/data/darkspace-rules-data";
import { RefShell, cardCls, nameCls, badge, accentBadge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <RefShell title="Archetypes" subtitle="DarkSpace · Character Roles" active="/darkspace/archetypes" count={`${DS_ARCHETYPES.length} archetypes`}>
      <div className="space-y-4">
        {DS_ARCHETYPES.map((a) => (
          <div key={a.name} className={cardCls}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={nameCls}>{a.name}</span>
              <span className={badge}>HD {a.hd}</span>
              {a.caster ? <span className={accentBadge}>Caster · {a.caster}</span> : null}
            </div>
            <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Weapons:</span> {a.weapons}</p>
            <p className="text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Armor:</span> {a.armor}</p>
            <ul className="mt-2 space-y-1">
              {a.features.map((f, i) => (
                <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]">{f}</li>
              ))}
            </ul>
            {a.ranks ? (
              <div className="mt-3 space-y-1 border-t border-[var(--border)] pt-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Ranks</p>
                {Object.entries(a.ranks).map(([align, tiers]) => (
                  <p key={align} className="text-[12px] text-[var(--muted)]">
                    <span className="font-semibold text-[#24c3d6]">{align}:</span> {tiers.join(" · ")}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </RefShell>
  );
}
