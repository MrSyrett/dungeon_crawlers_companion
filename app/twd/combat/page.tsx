import { TWD_HEALTH_STATES, TWD_CRITS } from "@/lib/data/twd-data";
import { TwdHeader } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

export default function TwdCombatPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="Combat & Trauma" subtitle="The Walking Dead · Health, Stress & critical injuries" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Health</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          Every living person has <b className="text-[var(--sys-link)]">three Health Points</b>. Each
          point of damage drops you one step; at 0 you are <b className="text-[var(--sys-link)]">Broken</b>
          — down, all skill rolls fail automatically, and you take one stress and a critical injury.
          Injured again while Broken, you die. You heal one Health per day if you eat.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TWD_HEALTH_STATES.map((h) => (
            <div key={h.value} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[15px] font-bold text-[var(--sys-link)]">{h.value}</span>
                <span className="text-[14px] font-bold">{h.name}</span>
              </div>
              <p className="mt-0.5 text-[12px] text-[var(--muted)]">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Stress &amp; messing up</h2>
        <p className="mb-2 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          When you fail a roll you may <b className="text-[var(--sys-link)]">push</b> it and roll again —
          but you take one point of <b className="text-[var(--sys-link)]">stress</b>. For each point of
          stress you add one stress die to every roll, so stress makes you sharper and more dangerous.
        </p>
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          If any stress die comes up a <b>1</b> (a walker on the custom dice), you&rsquo;ve
          <b className="text-[var(--sys-link)]"> messed up</b>: usually the Threat Level rises a step —
          you made noise, missed a lurking walker, or drew the dead to you. See <b>The Dead</b> for the
          Threat Level ladder.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Critical injuries (D66)</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">
          Rolled when you&rsquo;re Broken. Lethal injuries kill you after the time limit unless you&rsquo;re
          stabilized with a Medicine roll and basic (B) or advanced (A) medical gear.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">D66</th><th className="p-2">Injury</th><th className="p-2">Lethal</th><th className="p-2">Time limit</th><th className="p-2">Penalty</th><th className="p-2">Recovery</th>
              </tr>
            </thead>
            <tbody>
              {TWD_CRITS.map((c) => (
                <tr key={c.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{c.roll}</td>
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{c.injury}</td>
                  <td className={`p-2 ${c.lethal !== "No" ? "font-semibold text-[var(--twd)]" : "text-[var(--muted)]"}`}>{c.lethal}</td>
                  <td className="p-2 text-[var(--muted)]">{c.timeLimit}</td>
                  <td className="p-2">{c.penalty}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{c.recovery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
