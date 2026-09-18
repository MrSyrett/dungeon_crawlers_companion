import { GB_RULES } from "@/lib/data/gb-rules";
import { GB_DIFFICULTIES } from "@/lib/data/gb-difficulties";
import { GbHeader, TabRow, cardCls, SectionH } from "@/components/GbRef";

export const dynamic = "force-dynamic";

export default function GbRulesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <GbHeader title="Rules" subtitle="Classic 1986 rules · roll d6 equal to your Trait vs a Difficulty · one die is the Ghost Die" />
      <TabRow active="/gb/rules" />

      <SectionH>How the game works</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_RULES.map((r) => (
          <div key={r.key} className={cardCls}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#8fce3f]">{r.title}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text)]">{r.body}</p>
          </div>
        ))}
      </div>

      <SectionH>The Difficulty Ladder</SectionH>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              <th className="py-1.5 pr-3">Difficulty</th><th className="py-1.5 pr-3">Roll</th><th className="py-1.5">Examples</th>
            </tr>
          </thead>
          <tbody>
            {GB_DIFFICULTIES.map((d) => (
              <tr key={d.name} className="border-b border-[var(--border)]/50 align-top">
                <td className="py-1.5 pr-3 font-semibold text-[#8fce3f]">{d.name}</td>
                <td className="py-1.5 pr-3 whitespace-nowrap font-[var(--font-mono)]">{d.range}</td>
                <td className="py-1.5 text-[var(--muted)]">{d.examples.join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
