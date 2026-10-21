import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_RULES, PB_ABILITIES, PB_ABILITY_TABLE, PB_DR, PB_CONTAINERS } from "@/lib/data/pb-data";
import { PbHeader, SectionNav, DieTable, Bullets, RuleNote, N, cardCls, eyebrow, sectionH, th, td, tdNum, tableWrap, signed, rollText, armorDie, type RawQuery } from "@/components/PbRef";

export const dynamic = "force-dynamic";

export default async function PbRulesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await searchParams;
  const R = PB_RULES, V = R.violence;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Rules" subtitle="test against the DR · roll high, die young" />
      <SectionNav items={[
        { id: "abilities", label: "Abilities & Tests" }, { id: "carrying", label: "Breath & Carrying" }, { id: "violence", label: "Violence" },
        { id: "armor", label: "Armor" }, { id: "luck", label: "Devil's Luck" }, { id: "rest", label: "Rest & Grog" },
        { id: "reaction", label: "Reaction & Morale" }, { id: "broken", label: "Broken & Death" }, { id: "experience", label: "Getting Better" },
      ]} />

      <section id="abilities" className="scroll-mt-20">
        <h2 className={sectionH}>Abilities &amp; tests</h2>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className={cardCls}>
            <p className={eyebrow}>The five abilities</p>
            <dl className="mt-1.5 flex flex-col gap-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
              {PB_ABILITIES.map((a) => <div key={a.id}><dt className="inline font-semibold text-[var(--text)]">{a.id}</dt> <dd className="inline">— {a.uses} Tested for {a.tests.join(", ")}.</dd></div>)}
            </dl>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{R.abilities.text}</p>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Ability modifier <N className="ml-1 text-[var(--pb-ink)]">3d6</N></p>
            <table className="mt-1 w-full border-collapse">
              <thead><tr><th className={th}>3d6</th><th className={th}>Modifier</th></tr></thead>
              <tbody>{PB_ABILITY_TABLE.map((r) => <tr key={r.mod}><td className={tdNum}>{rollText(r.roll)}</td><td className={tdNum}>{signed(r.mod)}</td></tr>)}</tbody>
            </table>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">Abilities range <N>−3</N> to <N>+6</N>.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Testing</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]"><N className="text-[var(--text)]">{String(R.tests.formula)}</N> succeeds. {R.tests.text}</p>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Examples:</span> {(R.tests.examples as { text: string; dr: number }[]).map((e, i) => <span key={i}>{i ? " · " : ""}{e.text} <N>DR{e.dr}</N></span>)}</p>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Difficulty ratings</p>
            <table className="mt-1 w-full border-collapse">
              <tbody>{PB_DR.map((d) => <tr key={d.dr}><td className={`${tdNum} w-16 ${d.standard ? "text-[var(--pb-ink)]" : ""}`}>DR{d.dr}</td><td className={td}>{d.text}{d.standard ? " (the default)" : ""}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="carrying" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Holding breath &amp; carrying</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <RuleNote title="Holding your breath" className=""><p>{R.holdingBreath.text}</p></RuleNote>
          <RuleNote title="Carrying capacity" className="">
            <p>{R.carrying.text}</p>
            <p className="mt-1.5">Normal-sized: {(R.carrying.normalSized as string[]).join(", ")}. Not normal-sized: {(R.carrying.notNormalSized as string[]).join(", ")}.</p>
          </RuleNote>
        </div>
        <div className={`${cardCls} mt-4`}>
          <DieTable title="Containers" die="d6" rows={PB_CONTAINERS.map((c) => ({ roll: c.roll, name: c.name, text: c.text }))} cols={2} />
        </div>
      </section>

      <section id="violence" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Violence</h2>
        <p className="mb-3 max-w-[75ch] text-[13.5px] leading-relaxed text-[var(--muted)]">{V.text}</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className={cardCls}>
            <p className={eyebrow}>Attack &amp; defend</p>
            <table className="mt-1 w-full border-collapse">
              <tbody>{V.attacks.map((a) => <tr key={a.id}><td className={`${td} font-semibold text-[var(--text)]`}>{a.name}</td><td className={td}>{a.ability}</td><td className={tdNum}>DR{a.dr}</td></tr>)}</tbody>
            </table>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">{V.attacks.find((a) => a.id === "defense")?.failure}</p>
          </div>
          <div className={cardCls}>
            <DieTable title="Initiative" die={V.initiative.die} rows={V.initiative.rows} note={`Optional individual initiative: ${V.initiative.individual}.`} />
            <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--muted)]">{V.rounds.text} {V.movement.text}</p>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Critical — natural <N>{V.critical.natural}</N></p>
            <Bullets className="mt-1" items={[<><b className="text-[var(--text)]">Attack:</b> {V.critical.attack}</>, <><b className="text-[var(--text)]">Defense:</b> {V.critical.defense}</>]} />
            <p className={`${eyebrow} mt-3`}>Fumble — natural <N>{V.fumble.natural}</N></p>
            <Bullets className="mt-1" items={[<><b className="text-[var(--text)]">Attack:</b> {V.fumble.attack}</>, <><b className="text-[var(--text)]">Defense:</b> {V.fumble.defense}</>, V.fumble.blackPowder]} />
          </div>
          <div className={cardCls}>
            <DieTable title="Misfire" die={V.misfire.die} rows={V.misfire.rows} note="Fumbling an attack with a black powder weapon." />
          </div>
          <RuleNote title="Black powder & reloading" className=""><p>{V.reload.text} Black powder weapons ignore armor entirely.</p></RuleNote>
        </div>
      </section>

      <section id="armor" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Armor</h2>
        <div className="grid gap-4 md:grid-cols-[1fr_1.3fr]">
          <div className={tableWrap}>
            <table className="w-full border-collapse">
              <thead><tr>{["Tier", "Armor", "Damage", "AGILITY tests", "Defense"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>{R.armor.tiers.map((t) => <tr key={t.tier}><td className={tdNum}>{t.tier}</td><td className={td}>{t.name}</td><td className={tdNum}>{armorDie(t.die)}</td><td className={tdNum}>{t.agilityDR ? `DR +${t.agilityDR}` : "—"}</td><td className={tdNum}>{t.defenseDR ? `DR +${t.defenseDR}` : "—"}</td></tr>)}</tbody>
            </table>
          </div>
          <RuleNote title="Wearing armor" className=""><p>{R.armor.text}</p><p className="mt-1.5">{R.armor.magic}</p></RuleNote>
        </div>
      </section>

      <section id="luck" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Devil&apos;s Luck</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Spend one point to…</p>
            <Bullets className="mt-1" items={R.devilsLuck.uses.map((u) => u.text)} />
          </div>
          <RuleNote title="Gaining luck" className="">
            <p>{R.devilsLuck.start} Every class has its own Luck die; landlubbers roll <N>{R.devilsLuck.landlubberDie}</N>.</p>
            <p className="mt-1.5">{R.devilsLuck.recharge}</p>
            <p className="mt-1.5 italic">{R.devilsLuck.variant}</p>
          </RuleNote>
        </div>
      </section>

      <section id="rest" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Rest, healing &amp; grog</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <RuleNote title="Resting" className="">
            <p><b className="text-[var(--text)]">Short rest</b> ({R.rest.short.duration}): recover <N>{R.rest.short.heal}</N> HP.</p>
            <p><b className="text-[var(--text)]">Long rest</b> ({R.rest.long.duration}): recover <N>{R.rest.long.heal}</N> HP.</p>
          </RuleNote>
          <RuleNote title="Starving & sickness" className=""><p>{R.rest.starvation.text}</p><p className="mt-1.5">{R.rest.infection.text}</p></RuleNote>
          <RuleNote title="Grog & rum" className=""><p>{R.grog.text}</p></RuleNote>
        </div>
      </section>

      <section id="reaction" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Reaction &amp; morale</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}><DieTable title="Reaction" die={R.reaction.die} note={R.reaction.text} rows={R.reaction.rows} /></div>
          <div className={cardCls}>
            <p className={eyebrow}>Morale <N className="ml-1 text-[var(--pb-ink)]">{R.morale.die}</N></p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{R.morale.text}</p>
            <Bullets className="mt-1" items={R.morale.triggers} />
            <div className="mt-2"><DieTable title="Demoralized" die={R.morale.result.die} rows={R.morale.result.rows} /></div>
          </div>
        </div>
      </section>

      <section id="broken" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Hit points, Broken &amp; death</h2>
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className={cardCls}><DieTable title="Broken" die={R.broken.die} note={R.broken.text} rows={R.broken.rows} /></div>
          <div className="flex flex-col gap-4">
            <RuleNote title="Hit points" className=""><p>{R.hitPoints.text}</p></RuleNote>
            <RuleNote title="Death" className=""><p>{R.death.text}</p></RuleNote>
          </div>
        </div>
      </section>

      <section id="experience" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Getting better</h2>
        <p className="mb-3 max-w-[75ch] text-[13.5px] leading-relaxed text-[var(--muted)]">{R.experience.when}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-[13px] leading-relaxed text-[var(--muted)] marker:text-[var(--pb-ink)]">
              {R.experience.steps.map((s) => <li key={s.id}><b className="text-[var(--text)]">{s.name}.</b> {s.text}</li>)}
            </ol>
          </div>
          <div className={cardCls}><DieTable title="Among the dead you find" die={R.experience.amongTheDead.die} rows={R.experience.amongTheDead.rows} /></div>
        </div>
        <p className="mt-3 text-[12.5px] text-[var(--muted)]">Class features gained this way are listed on each <a href="/pirate-borg/classes" className="text-[var(--sys-link)] underline">class</a>. Relics, rituals and mishaps: <a href="/pirate-borg/magic" className="text-[var(--sys-link)] underline">Relics &amp; Rituals</a>. Ship combat: <a href="/pirate-borg/naval" className="text-[var(--sys-link)] underline">Naval</a>.</p>
      </section>
    </div>
  );
}
