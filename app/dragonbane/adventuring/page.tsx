import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_TABLES, DB_GM_TABLES, DB_JOURNEY } from "@/lib/data/db-data";
import type { DbTable } from "@/lib/data/db-types";
import { DbHeader, SectionNav, DieTable, Bullets, cardCls, eyebrow, sectionH, th, td, type RawQuery } from "@/components/DbRef";

export const dynamic = "force-dynamic";

function Generator({ t }: { t: DbTable }) {
  return (
    <div className={cardCls}>
      <h3 className="text-xl text-[var(--sys-link)]">{t.name}</h3>
      {t.note ? <p className="mt-0.5 text-[12px] italic text-[var(--muted)]">{t.note}</p> : null}
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(t.columns ?? []).map((c) => (
          <div key={c.die} className="min-w-0">
            <p className="font-label text-[13px] tracking-[0.06em] text-[var(--sys-sub)]"><span className="mr-2 font-mono text-[11px] text-[var(--db-ink)]">{c.die}</span>{c.name || "…"}</p>
            <ol className="mt-1 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
              {c.values.map((v, i) => <li key={i}><span className="mr-2 inline-block w-6 font-mono text-[11px] text-[var(--db-ink)]">{i + 1}</span>{v}</li>)}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function DbAdventuringPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await searchParams;
  const T = DB_TABLES, G = DB_GM_TABLES, J = DB_JOURNEY;
  const tbl = (t: DbTable) => <DieTable title={t.name} die={t.die} note={t.note} rows={t.rows ?? []} />;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Adventuring" subtitle="combat, damage, rest, hazards, journeys & the GM's random tables" />
      <SectionNav items={[
        { id: "time", label: "Time" }, { id: "combat", label: "Combat" }, { id: "damage", label: "Damage & Death" },
        { id: "rest", label: "Healing & Rest" }, { id: "hazards", label: "Hazards" }, { id: "journeys", label: "Journeys" },
        { id: "generator", label: "Adventure Generator" }, { id: "sites", label: "Sites & Traps" },
      ]} />

      <section id="time" className="scroll-mt-20">
        <h2 className={sectionH}>Measuring time</h2>
        <table className="w-full max-w-2xl border-collapse">
          <thead><tr><th className={th}>Unit</th><th className={th}>Length</th><th className={th}>Enough time to</th></tr></thead>
          <tbody>{T.time.map((t) => <tr key={t.id}><td className={`${td} text-[var(--text)]`}>{t.name}</td><td className={td}>{t.length}</td><td className={td}>{t.use}</td></tr>)}</tbody>
        </table>
      </section>

      <section id="combat" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Combat</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Rounds, initiative &amp; turns</p>
            <Bullets className="mt-1" items={[
              T.combat.initiative, T.combat.turn,
              "Surprise: the attackers choose any initiative card in the first round. Waiting: swap your card with a later combatant who hasn't acted or waited.",
              "Reactions (parry, dodge) happen on an enemy's turn and use up your own turn for the round; you can't react once you've acted.",
              "Leaving melee range voluntarily needs an Evade roll, or the enemy gets a free attack that can't be dodged or parried.",
            ]} />
            <p className={`${eyebrow} mt-3`}>Free actions (one of each per round, on your turn)</p>
            <Bullets className="mt-1" items={T.combat.freeActions} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Actions</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{T.combat.actions.join(" · ")}</p>
            <p className={`${eyebrow} mt-3`}>Attacks</p>
            <Bullets className="mt-1" items={[
              `Melee reaches ${T.combat.meleeRange} m (${T.combat.longRange} m with long weapons); a map square is ${T.combat.squareSize}×${T.combat.squareSize} m.`,
              `Prone target: ${T.combat.proneTarget}`,
              `Ranged: ${T.combat.rangedTooClose} ${T.combat.longRangeShot}`,
              "Critical hit (Dragon): parrying or dodging needs a Dragon; choose double weapon dice, an extra attack on another enemy (melee), or — for piercing — ignore armor.",
              "Parry with a weapon or shield (ranged only with a shield); a Dragon on a melee parry is an automatic counterattack. Dodge with Evade.",
              "Special attacks: Find Weak Spot, Topple, Disarm, Grapple — declared before rolling.",
              "Sneak attack (not in active combat): Sneaking roll, then a boon to hit, no dodge or parry, and +1 damage die with a subtle weapon.",
            ]} />
          </div>
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">{tbl(G.demonMelee)}{tbl(G.demonRanged)}</div>
      </section>

      <section id="damage" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Damage &amp; death</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>At zero HP</p>
            <Bullets className="mt-1" items={[
              `Each turn roll ${T.death.deathRoll}: ${T.death.successes} successes and you recover ${T.death.recoverHp} HP; ${T.death.failures} failures and you die. A Dragon counts as ${T.death.dragonCounts} successes, a Demon as ${T.death.demonCounts} failures.`,
              `Damage while at zero: ${T.death.damageAtZero}`,
              `Rally: a companion within ${T.death.rallyRange} m can persuade you to keep fighting (an action); rallying yourself is ${T.death.rallySelf}.`,
              T.death.saveLife, T.death.instantDeath, T.death.severeInjury,
            ]} />
          </div>
          {tbl(G.severeInjuries)}
        </div>
      </section>

      <section id="rest" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Healing &amp; rest</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
        <table className="w-full min-w-[640px] border-collapse">
          <thead><tr>{["Rest", "HP", "WP", "Conditions", "Limit", "Notes"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
          <tbody>{T.rests.map((r) => (
            <tr key={r.id}>
              <td className={`${td} text-[var(--text)]`}>{r.name}</td>
              <td className={td}>{r.hp ?? "—"}{"hpTended" in r && r.hpTended ? ` (${String(r.hpTended)} if tended)` : ""}</td>
              <td className={td}>{r.wp}</td>
              <td className={td}>{r.conditions === "all" ? "All" : r.conditions || "—"}</td>
              <td className={td}>{r.perShift ? `${r.perShift} per shift` : "—"}</td>
              <td className={td}>{r.note}</td>
            </tr>
          ))}</tbody>
        </table>
        </div>
      </section>

      <section id="hazards" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Hazards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tbl(G.fear)}
          <div className={cardCls}>
            <p className={eyebrow}>Poison</p>
            <p className="mt-1 text-[12.5px] text-[var(--muted)]">Potency: weak {T.poisons.potency.weak}, moderate {T.poisons.potency.moderate}, strong {T.poisons.potency.strong}+. The GM rolls potency against your CON (open opposed). {T.poisons.monsters}</p>
            <dl className="mt-1 flex flex-col gap-1 text-[12.5px] text-[var(--muted)]">{T.poisons.types.map((p) => <div key={p.id}><dt className="font-semibold text-[var(--text)]">{p.name}</dt><dd>Full: {p.full} Limited: {p.limited}</dd></div>)}</dl>
            <p className={`${eyebrow} mt-3`}>Light</p>
            <table className="mt-1 w-full border-collapse">
              <thead><tr><th className={th}>Source</th><th className={th}>Radius</th><th className={th}>Goes out on 1 of</th></tr></thead>
              <tbody>{T.light.map((l) => <tr key={l.item}><td className={td}>{l.item}</td><td className={td}>{l.radius} m</td><td className={td}>{l.die} each stretch{"note" in l && l.note ? `; ${String(l.note)}` : ""}</td></tr>)}</tbody>
            </table>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Falling, darkness &amp; water</p>
            <Bullets className="mt-1" items={[
              T.falling,
              "Complete darkness: no dashing and no ranged attacks; attacking in melee first needs an Awareness roll.",
              "Water: half movement, no ranged attacks, melee with a bane; a Swimming roll each stretch to stay afloat (each round in chainmail or plate); underwater, a CON roll each round to hold your breath or take D6 damage.",
            ]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Hunger, cold, sleep &amp; disease</p>
            <Bullets className="mt-1" items={[J.hunger, J.cold, J.sleep, "Disease: virulence against CON (open opposed). If it wins you fall ill after a day: Sickly and D6 damage, no healing, and a new roll each day until you win."]} />
          </div>
        </div>
      </section>

      <section id="journeys" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Journeys</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Travel</p>
            <Bullets className="mt-1" items={[
              `About ${J.pace.foot} km per shift on foot or ${J.pace.mounted} mounted, at most ${J.pace.maxShifts} shifts a day.`, J.pace.forcedMarch,
              J.pathfinder, J.randomEncounter, J.camp,
            ]} />
            <p className={`${eyebrow} mt-3`}>Food in the wild</p>
            <Bullets className="mt-1" items={[J.food.hunting, J.food.fishing, J.food.foraging, J.food.cooking]} />
          </div>
          <div className="flex flex-col gap-6">{tbl(G.journeyMishaps)}{tbl(G.hunting)}</div>
        </div>
      </section>

      <section id="generator" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Adventure generator</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Roll one die of each type, three times: once for the quest, once for the journey and once for the adventure site. Treat the results as inspiration.</p>
        <div className="flex flex-col gap-4"><Generator t={G.quest} /><Generator t={G.journey} /><Generator t={G.site} /></div>
      </section>

      <section id="sites" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Adventure sites, traps &amp; treasure</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tbl(G.leavingSite)}
          {tbl(G.traps)}
          <div className={cardCls}>
            <p className={eyebrow}>Treasure</p>
            <Bullets className="mt-1" items={[
              "Monetary treasure — coins or valuables such as jewels — is simply noted as its worth in gold, silver or copper.",
              "Gear has a practical use: a weapon or other item, or a magic item.",
              "A typical short adventure holds three to five treasures. Most adventures end with a boss: note its look, motive and tactics.",
            ]} />
          </div>
        </div>
      </section>
    </div>
  );
}
