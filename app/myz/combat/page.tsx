import { MYZ_ATTRIBUTES, MYZ_CONDITIONS, MYZ_CRITS } from "@/lib/data/myz-data";
import { MyzHeader } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

export default function MyzCombatPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Trauma & Combat" subtitle="Mutant: Year Zero · your attributes are your health" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Trauma — the four tracks</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          There are no hit points. Your <b className="text-[var(--sys-link)]">four attributes are your
          health</b>: each kind of harm lowers a different attribute, and when any attribute reaches
          <b className="text-[var(--sys-link)]"> 0 you are Broken</b> — helpless until a comrade rolls
          Heal to get you back on your feet with one point. Rest with the matching resource to recover a
          point of trauma.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {MYZ_ATTRIBUTES.map((a) => (
            <div key={a.key} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex items-baseline gap-2"><span className="text-[14px] font-bold text-[var(--sys-link)]">{a.name}</span><span className="text-[11px] font-semibold text-[var(--muted)]">{a.key}</span></div>
              <p className="mt-0.5 text-[12px] text-[var(--muted)]">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Pushing, trauma &amp; Mutation Points</h2>
        <p className="mb-2 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          Fail a roll and you may <b className="text-[var(--sys-link)]">push</b> it — reroll every die
          that isn&rsquo;t a 6. But each <b>1</b> left on a <b>Base Die</b> after the push costs you one
          point of trauma to the attribute you rolled (Damage, Fatigue, Confusion or Doubt), and each
          black Gear Die showing a 1 breaks the gear by one step.
        </p>
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          The upside: for every point of trauma you take this way you gain one <b className="text-[var(--sys-link)]">
          Mutation Point</b> — the fuel for your mutations. Risk and power are the same resource.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Conditions</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">A hungry, thirsty, sleepless or freezing body can&rsquo;t heal and bleeds trauma each day.</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {MYZ_CONDITIONS.map((c) => (
            <div key={c.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="text-[14px] font-bold text-[var(--sys-link)]">{c.name}</div>
              <p className="mt-0.5 text-[12px] text-[var(--muted)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Critical injuries (D66)</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">
          Rolled when you&rsquo;re Broken by Damage (Strength 0). Lethal injuries kill after the time
          limit unless someone rolls Heal in time (a modifier of −1 on the worst).
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">D66</th><th className="p-2">Injury</th><th className="p-2">Lethal</th><th className="p-2">Time limit</th><th className="p-2">Effect</th><th className="p-2">Heal time</th>
              </tr>
            </thead>
            <tbody>
              {MYZ_CRITS.map((c) => (
                <tr key={String(c.roll) + c.injury} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[var(--muted)]">{c.roll}</td>
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{c.injury}</td>
                  <td className={`p-2 ${c.lethal !== "No" ? "font-semibold text-[var(--myz)]" : "text-[var(--muted)]"}`}>{c.lethal}</td>
                  <td className="p-2 text-[var(--muted)]">{c.timeLimit}</td>
                  <td className="p-2">{c.effect}</td>
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
