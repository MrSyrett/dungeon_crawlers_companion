import { MYZ_ROT, MYZ_DEVELOPMENT } from "@/lib/data/myz-data";
import { MyzHeader, cardCls, nameCls } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

export default function MyzZonePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="The Zone" subtitle="Mutant: Year Zero · the Rot, the Ark, and what lurks out there" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">The Rot</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          The Zone is poisoned. Every sector has a Rot Level; the higher it is, the faster you collect
          <b className="text-[var(--sys-link)]"> Rot Points</b>. Each time you take one, roll Base Dice
          equal to your total Rot Points — every 6 is a point of Damage. Decontaminate a point per day
          in a clean place; but roll a 1 as a point leaves and it becomes <b>permanent</b>.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] sm:max-w-2xl">
          <table className="w-full border-collapse text-[13px]">
            <thead><tr className="bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]"><th className="p-2">Level</th><th className="p-2">Name</th><th className="p-2">Effect</th></tr></thead>
            <tbody>
              {MYZ_ROT.map((r) => (
                <tr key={r.level} className="border-t border-[var(--border)]">
                  <td className="p-2 font-mono text-[15px] font-bold text-[var(--sys-link)]">{r.level}</td>
                  <td className="p-2 font-semibold">{r.name}</td>
                  <td className="p-2 text-[var(--text)]">{r.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">The Ark — Development Levels</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
          Your home is a dying settlement that advances along four Development Levels. At creation the
          group distributes <b className="text-[var(--sys-link)]">12 points</b> across them; they rise
          through Projects worked each session and artifacts turned in to the Dawn Vault.
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {MYZ_DEVELOPMENT.map((d) => (
            <div key={d.name} className={cardCls}>
              <h3 className={nameCls}>{d.name}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Threats in the Zone</h2>
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          The Zone teems with monsters, humanoid factions and phenomena. See the{" "}
          <a href="/myz/bestiary" className="text-[var(--sys-link)] underline">Bestiary</a> for full stat blocks.
        </p>
      </section>
    </div>
  );
}
