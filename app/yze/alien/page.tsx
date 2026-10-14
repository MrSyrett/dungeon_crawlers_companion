import { ALIEN_BESTIARY } from "@/lib/data/yze-alien-data";
import { YzeHeader, SectionH, cardCls, nameCls, badge } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

const GROUPS = ["Xenomorph XX121", "Neomorph", "Other Species"] as const;

export default function YzeBestiaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Bestiary" subtitle="ALIEN RPG · Xenomorphs & other threats" />

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Xenomorph combat rules</h2>
        <p className="mb-3 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
          Every Xenomorph XX121 shares these traits. <b className="text-[var(--sys-link)]">Natural armor</b> —
          the rating below is its armor level. <b className="text-[var(--sys-link)]">Stun immunity</b> — immune
          to stun damage (if ever not, it rolls Mobility to resist, not Stamina).
          <b className="text-[var(--sys-link)]"> Health</b> — when reduced to 0 Health a Xeno isn&rsquo;t broken;
          roll a D6 on the book&rsquo;s table instead (in &ldquo;Aliens mode&rdquo; it simply dies). Facehuggers
          and Chestbursters are destroyed at 0 Health. <b className="text-[var(--sys-link)]">Recovery</b> — one
          stretch immobile restores all lost Health.
        </p>
        <p className="mb-3 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
          <b className="text-[var(--sys-link)]">Acid Splash</b> — when a Xeno takes non-fire damage, its blood
          splashes everyone at Adjacent range (and the floor). Roll base dice equal to its Acid Splash rating
          plus the damage dealt (base damage 1); each point of damage also eats one point off any armor hit.
          It repeats at the start of each round, halving the dice, until it fails to do damage.
          <b className="text-[var(--sys-link)]"> Cold &amp; vacuum</b> — total immunity.
          <b className="text-[var(--sys-link)]"> Radiation</b> — counts two levels lower (extreme → weak; weak
          and strong → none). <b className="text-[var(--sys-link)]">Darkness</b> — unaffected in stealth mode.
        </p>
      </section>

      {GROUPS.map((g) => (
        <section key={g} className="mb-8">
          <SectionH>{g}</SectionH>
          <ul className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {ALIEN_BESTIARY.filter((c) => c.group === g).map((c) => (
              <li key={c.name} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{c.name}</h3>
                  {c.stage ? <span className={badge}>{c.stage}</span> : null}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)]">
                  <span><b className="text-[var(--text)]">Speed</b> {c.speed}</span>
                  <span><b className="text-[var(--text)]">Health</b> {c.health}</span>
                  {c.skills !== "—" ? <span><b className="text-[var(--text)]">Skills</b> {c.skills}</span> : null}
                  <span><b className="text-[var(--text)]">Armor</b> {c.armor}</span>
                  {c.acid !== "—" ? <span><b className="text-[var(--text)]">Acid Splash</b> {c.acid}</span> : null}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{c.notes}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
