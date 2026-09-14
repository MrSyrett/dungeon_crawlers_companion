import { DS_POWERS } from "@/lib/data/darkspace-rules-data";
import { RefShell, cardCls, nameCls, badge, accentBadge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

const casterLabel = (c: string) => (c === "Both" ? "Engineer / Mystic" : c);

export default function Page() {
  const byTier: Record<string, typeof DS_POWERS> = {};
  for (const p of DS_POWERS) (byTier[p.tier] ||= []).push(p);
  const tiers = Object.keys(byTier).sort();
  return (
    <RefShell title="Powers" subtitle="DarkSpace · Tech &amp; Psychic" active="/darkspace/powers" count={`${DS_POWERS.length} powers`}>
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
        Powers work exactly like Shadowdark spells, relabeled: Engineers channel <span className="text-[var(--text)]">tech &amp; gadgets</span>, Mystics channel <span className="text-[var(--text)]">psychic will</span>.
      </p>
      {tiers.map((tier) => (
        <section key={tier} className="mb-6">
          <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#24c3d6]">Tier {tier}</h2>
          <div className="space-y-3">
            {byTier[tier].sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
              <div key={p.name + p.tier} className={cardCls}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={nameCls}>{p.name}</span>
                  <span className={accentBadge}>{casterLabel(p.caster)}</span>
                  {p.range ? <span className={badge}>{p.range}</span> : null}
                  {p.duration ? <span className={badge}>{p.duration}</span> : null}
                  {p.damage ? <span className={badge}>{p.damage}</span> : null}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </RefShell>
  );
}
