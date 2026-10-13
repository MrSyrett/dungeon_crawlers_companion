import { VAE_MELEE_WEAPONS, VAE_RANGED_WEAPONS, VAE_ARMOR, VAE_GEAR } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

const th = "p-2 text-left text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]";
const td = "p-2 text-[13px] text-[var(--text)]";

function Table({ head, children }: { head: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="bg-[var(--panel-2)]">{head}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default function VaesenGearPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Weapons & Gear" subtitle="Vaesen · arms, armor and tools of the 1800s" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Weapon Damage is the number of physical Conditions a hit inflicts; Bonus adds dice to the attack.
        Gear adds bonus dice to the matching skill test. Cost is the number of successes (or Capital) needed
        to procure the item through Resources — temporary gear is lost at the end of a mystery.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Melee Weapons</h2>
        <Table head={<><th className={th}>Weapon</th><th className={th}>Dmg</th><th className={th}>Bonus</th><th className={th}>Cost</th><th className={th}>Skill</th></>}>
          {VAE_MELEE_WEAPONS.map((w) => (
            <tr key={w.name} className="border-t border-[var(--border)]">
              <td className={td + " font-semibold"}>{w.name}</td><td className={td}>{w.damage}</td><td className={td}>{w.bonus}</td><td className={td}>{w.cost}</td><td className={td + " text-[var(--muted)]"}>{w.skill}</td>
            </tr>
          ))}
        </Table>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Ranged Weapons</h2>
        <Table head={<><th className={th}>Weapon</th><th className={th}>Dmg</th><th className={th}>Range</th><th className={th}>Bonus</th><th className={th}>Cost</th></>}>
          {VAE_RANGED_WEAPONS.map((w) => (
            <tr key={w.name} className="border-t border-[var(--border)]">
              <td className={td + " font-semibold"}>{w.name}</td><td className={td}>{w.damage}</td><td className={td}>{w.range}</td><td className={td}>{w.bonus}</td><td className={td}>{w.cost}</td>
            </tr>
          ))}
        </Table>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Armor</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {VAE_ARMOR.map((a) => (
            <div key={a.name} className={cardCls}>
              <div className="flex items-baseline justify-between"><h3 className={nameCls}>{a.name}</h3><span className="font-mono text-[15px] text-[var(--sys-link)]">{a.protection}</span></div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{a.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Gear & Tools</h2>
        <Table head={<><th className={th}>Item</th><th className={th}>Bonus</th><th className={th}>Cost</th><th className={th}>Use</th></>}>
          {VAE_GEAR.map((g) => (
            <tr key={g.name} className="border-t border-[var(--border)]">
              <td className={td + " font-semibold"}>{g.name}</td><td className={td}>{g.bonus}</td><td className={td}>{g.cost}</td><td className={td + " text-[var(--muted)]"}>{g.comment}</td>
            </tr>
          ))}
        </Table>
      </section>
    </div>
  );
}
