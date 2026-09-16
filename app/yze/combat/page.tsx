import { YZE_CONDITIONS, YZE_CRITS_PHYSICAL, YZE_CRITS_MENTAL, YZE_PANIC } from "@/lib/data/yze-data";
import { YzeHeader } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeCombatPage() {
  const phys = YZE_CONDITIONS.filter((c) => c.type === "Physical");
  const ment = YZE_CONDITIONS.filter((c) => c.type === "Mental");
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Combat & Trauma" subtitle="Year Zero Engine · SRD v1.0 · conditions, crits & panic" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Conditions</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Gained by pushing a roll or from attacks and stress. Each physical condition is −1 to
          Strength/Agility rolls; each mental one is −1 to Wits/Empathy. A fourth condition of a type
          breaks you and inflicts a critical injury.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Physical</h3>
            <ul className="flex flex-col gap-2">
              {phys.map((c) => (
                <li key={c.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                  <span className="text-[14px] font-bold text-[#e6a04a]">{c.name}</span>
                  <p className="mt-0.5 text-[12px] text-[var(--muted)]">{c.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Mental</h3>
            <ul className="flex flex-col gap-2">
              {ment.map((c) => (
                <li key={c.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                  <span className="text-[14px] font-bold text-[#e6a04a]">{c.name}</span>
                  <p className="mt-0.5 text-[12px] text-[var(--muted)]">{c.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Critical injuries — physical (D66)</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Roll when broken by damage. A lethal crit forces a Stamina death save each time its time limit passes.</p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">D66</th><th className="p-2">Injury</th><th className="p-2">Lethal</th><th className="p-2">Limit</th><th className="p-2">Effect</th><th className="p-2">Heal</th>
              </tr>
            </thead>
            <tbody>
              {YZE_CRITS_PHYSICAL.map((c) => (
                <tr key={c.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{c.roll}</td>
                  <td className="p-2 font-semibold text-[#e6a04a]">{c.injury}</td>
                  <td className={`p-2 ${c.lethal !== "No" ? "font-semibold text-[var(--red)]" : "text-[var(--muted)]"}`}>{c.lethal}</td>
                  <td className="p-2 text-[var(--muted)]">{c.timeLimit}</td>
                  <td className="p-2 text-[var(--text)]">{c.effect}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{c.healing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Critical injuries — mental (D66)</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">D66</th><th className="p-2">Trauma</th><th className="p-2">Effect</th><th className="p-2">Heal</th>
              </tr>
            </thead>
            <tbody>
              {YZE_CRITS_MENTAL.map((c) => (
                <tr key={c.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{c.roll}</td>
                  <td className="p-2 font-semibold text-[#e6a04a]">{c.trauma}</td>
                  <td className="p-2 text-[var(--text)]">{c.effect}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{c.healing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#e6a04a]">Panic table</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Used by YZE games that track Stress instead of Resolve. Roll a D6 and add your current stress points.</p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Roll</th><th className="p-2">Effect</th><th className="p-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {YZE_PANIC.map((p) => (
                <tr key={p.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{p.roll}</td>
                  <td className="p-2 font-semibold text-[#e6a04a]">{p.effect}</td>
                  <td className="p-2 text-[var(--text)]">{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
