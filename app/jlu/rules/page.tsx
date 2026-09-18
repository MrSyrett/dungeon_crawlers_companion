import { JLU_TIERS } from "@/lib/data/jlu-tiers";
import { JLU_RULES } from "@/lib/data/jlu-rules";
import { JLU_CONDITIONS } from "@/lib/data/jlu-conditions";
import { JLU_STATUSES } from "@/lib/data/jlu-statuses";
import { JLU_CRISIS } from "@/lib/data/jlu-crisis";
import { JluHeader, TabRow, cardCls, nameCls, SectionH } from "@/components/JluRef";

export const dynamic = "force-dynamic";

export default function JluRulesPage() {
  const playable = JLU_TIERS.filter((t) => t.playable);
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <JluHeader title="Rules" subtitle="Justice League Unlimited · the d20 core & the comic-book engine" />
      <TabRow active="/jlu/rules" />

      <SectionH>How the game works</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {JLU_RULES.map((r) => (
          <div key={r.key} className={cardCls}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#5b8dfb]">{r.title}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{r.body}</p>
          </div>
        ))}
      </div>

      <SectionH>Tiers</SectionH>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              <th className="py-1.5 pr-3">Tier</th><th className="py-1.5 pr-3">PAX</th><th className="py-1.5 pr-3">Resolve</th><th className="py-1.5 pr-3">Defense</th><th className="py-1.5 pr-3">Attack</th><th className="py-1.5 pr-3">Damage</th><th className="py-1.5 pr-3">Attr Limit</th><th className="py-1.5">Power Limit</th>
            </tr>
          </thead>
          <tbody>
            {playable.map((t) => (
              <tr key={t.key} className="border-b border-[var(--border)]/50">
                <td className="py-1.5 pr-3 font-semibold text-[#5b8dfb]">{t.key} — {t.name}</td>
                <td className="py-1.5 pr-3">{t.pax}</td><td className="py-1.5 pr-3">{t.resolve}</td><td className="py-1.5 pr-3">{t.defense}</td><td className="py-1.5 pr-3">+{t.attackBonus}</td><td className="py-1.5 pr-3">{t.damageDie}</td><td className="py-1.5 pr-3">+{t.attrLimit}</td><td className="py-1.5">Grade {t.powerLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] italic text-[var(--muted)]">
        Full ladder: {JLU_TIERS.map((t) => `${t.key} (${t.value})`).join(" · ")}. The Quickstart details Tiers D and C.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <SectionH>Condition Track</SectionH>
          <div className="space-y-1.5">
            {JLU_CONDITIONS.map((c) => (
              <div key={c.name} className={cardCls}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#5b8dfb]">{c.name}</h3>
                <p className="mt-0.5 text-[12px] leading-relaxed text-[var(--text)]">{c.effect}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionH>Statuses</SectionH>
          <div className="space-y-1.5">
            {JLU_STATUSES.map((s) => (
              <div key={s.name} className="rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2">
                <span className="text-[12.5px] font-semibold text-[#5b8dfb]">{s.name}:</span> <span className="text-[12px] text-[var(--muted)]">{s.effect}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionH>The Crisis Die <span className="text-[11px] font-normal text-[var(--muted)]">— roll d20 when Plot Points strain reality</span></SectionH>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-[12.5px]">
          <tbody>
            {JLU_CRISIS.map((c) => (
              <tr key={c.roll} className="border-b border-[var(--border)]/50">
                <td className="py-1.5 pr-3 text-center font-semibold text-[var(--jlu)]">{c.roll}</td>
                <td className="py-1.5 pr-3 font-semibold text-[#5b8dfb]">{c.name}</td>
                <td className="py-1.5 text-[var(--muted)]">{c.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
