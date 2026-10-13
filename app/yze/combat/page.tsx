import { YZE_CRITS_PHYSICAL, YZE_CRITS_MENTAL, YZE_PANIC, YZE_STRESS_RESPONSE } from "@/lib/data/yze-data";
import { YzeHeader } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeCombatPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Combat & Trauma" subtitle="ALIEN RPG · Stress, Panic & critical injuries" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Stress, Resolve &amp; Panic</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          In ALIEN there are no condition tracks — fear is measured by your <b className="text-[var(--sys-link)]">Stress Level</b>,
          which counts up from 0. You add a number of <b className="text-[var(--sys-link)]">Stress Dice</b> equal
          to your Stress Level to every skill roll, so stress makes you more likely to succeed — and
          more likely to crack. Stress rises by one each time you push a roll, fire full-auto, or face
          something horrifying; resting in a safe place lowers it. Your <b className="text-[var(--sys-link)]">Resolve</b> rating
          — ⌈(Wits + Empathy) ÷ 2⌉ — is your buffer: it is subtracted on both of the rolls below.
        </p>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          If one or more Stress Dice show a <b>1</b>, you can&rsquo;t push the roll and you make a
          <b className="text-[var(--sys-link)]"> Stress Response</b> roll: <b>D6 + Stress Level − Resolve</b>, read on
          the first table. A stress response lingers until you relieve stress; roll one you already have and you gain +1 stress instead.
        </p>
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          A <b className="text-[var(--sys-link)]">Panic Roll</b> is separate — you make one when you witness something
          horrifying (a crewmate broken, a Xenomorph, a friend panicking): <b>D6 + Stress Level − Resolve</b>, read on
          the second table. Everyone who witnesses a panicking crewmate may have to roll too.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Stress response table</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Triggered by a <b>1</b> on a Stress Die. Roll D6 + Stress Level − Resolve.</p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Result</th><th className="p-2">Response</th><th className="p-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {YZE_STRESS_RESPONSE.map((p) => (
                <tr key={p.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{p.roll}</td>
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{p.effect}</td>
                  <td className="p-2 text-[var(--text)]">{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Panic table</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Made when you face fear. Roll D6 + Stress Level − Resolve.</p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Result</th><th className="p-2">Effect</th><th className="p-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {YZE_PANIC.map((p) => (
                <tr key={p.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{p.roll}</td>
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{p.effect}</td>
                  <td className="p-2 text-[var(--text)]">{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Critical injuries — physical (D66)</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">Roll when you&rsquo;re Broken by damage. A lethal crit forces a Stamina death save each time its time limit passes.</p>
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
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{c.injury}</td>
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

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Mental trauma (D66)</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">If you rolled 9 or higher on a panic roll during the session, make an Empathy roll (attribute only, can&rsquo;t be pushed) afterward; on a failure, roll D66 here. Healed only during shore leave.</p>
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
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{c.trauma}</td>
                  <td className="p-2 text-[var(--text)]">{c.effect}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{c.healing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
