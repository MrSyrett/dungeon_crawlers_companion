import { CO_DRIVES, CO_ACTIONS } from "@/lib/data/candela-data";
import { CandelaHeader, cardCls, nameCls, badge } from "@/components/CandelaRef";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <CandelaHeader title="Drives & Actions" subtitle="Candela Obscura · The Dice Pool" />
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
    </div>
  );
}
