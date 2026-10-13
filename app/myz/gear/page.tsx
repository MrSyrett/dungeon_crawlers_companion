import { MYZ_MELEE_WEAPONS, MYZ_RANGED_WEAPONS, MYZ_ARMOR, MYZ_GEAR, MYZ_ARTIFACTS } from "@/lib/data/myz-data";
import { MyzHeader } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

const th = "bg-[var(--panel-2)] text-left uppercase tracking-[0.1em] text-[var(--muted)]";
const slot = (n: number) => (n === 0 ? "—" : n === 0.5 ? "½" : n >= 99 ? "fixed" : String(n));

export default function MyzGearPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Gear" subtitle="Mutant: Year Zero · scrap weapons, armor, supplies & artifacts" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        There is no money in the Ark — trade is barter and <b>bullets</b> are the de-facto currency.
        A weapon&rsquo;s <b>Gear Bonus</b> is how many black Gear Dice it adds; its <b>Damage</b> is the
        points dealt on a hit. You carry regular items up to twice your Strength (a Heavy item takes two
        slots, a Light item half a slot, a Tiny item none).
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Close-combat weapons</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead><tr className={th}><th className="p-2">Weapon</th><th className="p-2">Bonus</th><th className="p-2">Damage</th><th className="p-2">Range</th><th className="p-2">Slots</th><th className="p-2">Notes</th></tr></thead>
            <tbody>
              {MYZ_MELEE_WEAPONS.map((w) => (
                <tr key={w.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                  <td className="p-2 font-mono">{w.bonus >= 0 ? `+${w.bonus}` : w.bonus}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2 text-[var(--muted)]">{w.range}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{slot(w.slots)}</td>
                  <td className="p-2 text-[var(--muted)]">{w.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Ranged weapons</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-[12px]">
            <thead><tr className={th}><th className="p-2">Weapon</th><th className="p-2">Bonus</th><th className="p-2">Damage</th><th className="p-2">Range</th><th className="p-2">Slots</th><th className="p-2">Notes</th></tr></thead>
            <tbody>
              {MYZ_RANGED_WEAPONS.map((w) => (
                <tr key={w.name} className="border-t border-[var(--border)]">
                  <td className="p-2 font-semibold text-[var(--sys-link)]">{w.name}</td>
                  <td className="p-2 font-mono">{w.bonus >= 0 ? `+${w.bonus}` : w.bonus}</td>
                  <td className="p-2 font-mono">{w.damage}</td>
                  <td className="p-2 text-[var(--muted)]">{w.range}</td>
                  <td className="p-2 font-mono text-[var(--muted)]">{slot(w.slots)}</td>
                  <td className="p-2 text-[var(--muted)]">{w.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section>
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Armor &amp; cover</h2>
          <div className="flex flex-col gap-2">
            {MYZ_ARMOR.map((a) => (
              <div key={a.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                <div className="flex items-baseline gap-2"><span className="font-mono text-[15px] font-bold text-[var(--sys-link)]">{a.rating}</span><span className="text-[14px] font-bold">{a.name}</span></div>
                <p className="mt-0.5 text-[12px] text-[var(--muted)]">{a.comment}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Supplies</h2>
          <div className="flex flex-col gap-2">
            {MYZ_GEAR.map((g) => (
              <div key={g.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                <div className="flex flex-wrap items-baseline gap-2"><span className="text-[14px] font-bold text-[var(--sys-link)]">{g.name}</span><span className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{g.slots}</span></div>
                <p className="mt-0.5 text-[12px] text-[var(--muted)]">{g.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Artifacts of the Old Age</h2>
        <p className="mb-3 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Relics of the world before. Find them in the Zone, or turn one in to the <b>Dawn Vault</b> to
          raise one of the Ark&rsquo;s Development Levels.
        </p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {MYZ_ARTIFACTS.map((a) => (
            <div key={a.name} className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="flex flex-wrap items-baseline gap-2"><span className="text-[13px] font-bold text-[var(--sys-link)]">{a.name}</span><span className="font-mono text-[10px] text-[var(--muted)]">D666 {a.roll}</span></div>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
