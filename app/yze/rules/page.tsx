import { YZE_ATTRIBUTES, YZE_RULES, YZE_RANGES, YZE_DIFFICULTY, YZE_TRAITS } from "@/lib/data/yze-data";
import { YzeHeader, cardCls, nameCls } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeRulesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Core Rules" subtitle="Year Zero Engine · SRD v1.0 · the dice-pool engine" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Attributes</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {YZE_ATTRIBUTES.map((a) => (
            <div key={a.key} className={cardCls}>
              <div className="flex items-baseline gap-2">
                <h3 className={nameCls}>{a.name}</h3>
                <span className="text-[11px] font-semibold text-[var(--muted)]">{a.key}</span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{a.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] italic leading-relaxed text-[var(--muted)]">
          Human scores range 1–5 (2 Below Average · 3 Average · 4 Capable · 5 Extraordinary). At
          creation, distribute 14 points; your key attribute may reach 5, the others cap at 4.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">How it works</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {YZE_RULES.map((r) => (
            <div key={r.title} className={cardCls}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#3fd0e6]">{r.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section>
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Range categories</h2>
          <table className="w-full border-collapse text-[13px]">
            <tbody>
              {YZE_RANGES.map((r) => (
                <tr key={r.range} className="border-b border-[var(--border)]">
                  <td className="py-2 pr-3 font-semibold text-[#3fd0e6]">{r.range}</td>
                  <td className="py-2 text-[var(--muted)]">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Difficulty modifiers</h2>
          <table className="w-full border-collapse text-[13px]">
            <tbody>
              {YZE_DIFFICULTY.map((d) => (
                <tr key={d.factor} className="border-b border-[var(--border)]">
                  <td className="py-2 pr-3 font-semibold">{d.factor}</td>
                  <td className="py-2 text-right font-mono text-[var(--muted)]">{d.mod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#3fd0e6]">Personality traits</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {YZE_TRAITS.map((t) => (
            <div key={t.key} className={cardCls}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#3fd0e6]">{t.label}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{t.prompt}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
