import { TWD_THREAT, TWD_SWARM } from "@/lib/data/twd-data";
import { TWD_WALKER_ATTACK } from "@/lib/data/twd-bestiary";
import { TwdHeader } from "@/components/TwdRef";

export const dynamic = "force-dynamic";

export default function TwdDeadPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <TwdHeader title="The Dead" subtitle="The Walking Dead · the walkers, the Threat Level, and swarms" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
        Walkers have no skills, attributes, or Health Points — the GM describes them, gory and once
        human. The danger they pose is abstracted into two measures: the <b className="text-[var(--sys-link)]">Threat
        Level</b> (how active and close the dead are right now) and <b className="text-[var(--sys-link)]">Swarm
        Size</b> (how many are in a group). A group of five or more is a swarm.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Threat Level</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Set per scene by the GM, 0–6. It rises when you mess up a roll, fail to avoid the dead,
          blunder into a placed group, or make noise. At Level 3 the walkers notice you and every PC
          takes a point of stress.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Level</th><th className="p-2">Situation</th>
              </tr>
            </thead>
            <tbody>
              {TWD_THREAT.map((t) => (
                <tr key={t.level} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[15px] font-bold text-[var(--sys-link)]">{t.level}</td>
                  <td className="p-2 text-[var(--text)]">{t.situation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Swarm Size</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)] sm:max-w-sm">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">Swarm Size</th><th className="p-2">Number of walkers</th>
              </tr>
            </thead>
            <tbody>
              {TWD_SWARM.map((s) => (
                <tr key={s.size} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[15px] font-bold text-[var(--sys-link)]">{s.size}</td>
                  <td className="p-2 font-mono">{s.walkers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Walker Attack</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          When the dead reach a survivor — a single attack from a mess-up, or when fighting out of a
          swarm — roll <b className="text-[var(--sys-link)]">D66</b> here for what happens.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]">
                <th className="p-2">D66</th><th className="p-2">Effect</th>
              </tr>
            </thead>
            <tbody>
              {TWD_WALKER_ATTACK.map((a) => (
                <tr key={a.roll} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[15px] font-bold text-[var(--sys-link)]">{a.roll}</td>
                  <td className="p-2 text-[var(--text)]">{a.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
