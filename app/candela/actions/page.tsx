import { CO_DRIVES, CO_ACTIONS } from "@/lib/data/candela-data";
import { RefShell, cardCls, nameCls, badge } from "@/components/CandelaRef";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <RefShell title="Drives & Actions" subtitle="Candela Obscura · The Dice Pool" active="/candela/actions" count={`3 drives · ${CO_ACTIONS.length} actions`}>
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
        Each action is rated 0&ndash;3 — the number of d6 in your pool. Spend a point from its drive
        (0&ndash;9) to add +1d. Roll: a 6 is a full success, 4&ndash;5 a mixed success, 1&ndash;3 a miss;
        two 6s crit. A gilded action lets you take the gilded die&rsquo;s result to refresh a drive point.
        For every 3 maximum drive points you gain 1 resistance to burn for a reroll.
      </p>
      <div className="space-y-5">
        {CO_DRIVES.map((d) => (
          <div key={d.name} className={cardCls}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={nameCls}>{d.name}</span>
              <span className={badge}>Drive · 0–9</span>
            </div>
            <p className="mt-1 text-[12px] text-[var(--muted)]">{d.blurb}</p>
            <div className="mt-3 space-y-2">
              {CO_ACTIONS.filter((a) => a.drive === d.name).map((a) => (
                <div key={a.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--text)]">{a.name}</span>
                    <span className="text-[11px] uppercase tracking-[0.08em] text-[#3fc2b0]">{a.sub}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RefShell>
  );
}
