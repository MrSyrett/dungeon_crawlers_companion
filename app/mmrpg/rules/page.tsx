import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MmrpgHeader, cardCls, SectionH } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";

export default async function MmrpgRulesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <MmrpgHeader title="Rules — d616" subtitle="Core mechanics of the Marvel Multiverse RPG" />
      <div className={`${cardCls} mb-4`}>
        <SectionH>The Action Check</SectionH>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Roll three six-sided dice — the middle one is the <b>Marvel die</b> — and add them (that&rsquo;s <b>d616</b>). Add the relevant ability score, then compare to the Target Number (TN). Meet or beat it and you succeed. A natural <b>1 on the Marvel die is a Fantastic result</b>: count it as 6 and something extra-special happens (&ldquo;Yes, and…&rdquo;) — the default on an attack is double damage.</p>
      </div>
      <div className={`${cardCls} mb-4`}>
        <SectionH>Abilities (MARVEL)</SectionH>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]"><b>M</b>elee, <b>A</b>gility, <b>R</b>esilience, <b>V</b>igilance, <b>E</b>go and <b>L</b>ogic. Scores usually run −3 to +9 (+3 is the human cap). Each ability&rsquo;s <b>defense = 10 + the score</b> — that&rsquo;s the TN an attacker must beat.</p>
      </div>
      <div className={`${cardCls} mb-4`}>
        <SectionH>Derived Numbers</SectionH>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--muted)]">
          <li><b>Health</b> = Resilience × 30 (minimum 10).</li>
          <li><b>Focus</b> = Vigilance × 30 (minimum 10).</li>
          <li><b>Karma</b> = Rank (you need the Heroic tag to start with it).</li>
          <li><b>Initiative Modifier</b> = Vigilance.</li>
          <li><b>Run Speed</b> = 5 + (Agility ÷ 5). Climb / Jump / Swim = half of that.</li>
          <li><b>Damage multiplier</b> = Rank. An attack deals (Marvel die × multiplier) + ability score; a Fantastic result doubles it.</li>
        </ul>
      </div>
      <div className={`${cardCls} mb-4`}>
        <SectionH>Karma, Edges & Troubles</SectionH>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Spend 1 Karma after a roll for an <b>edge</b>: reroll one die and keep the better result. When you&rsquo;re attacked you can spend 1 Karma to give the attacker <b>trouble</b>: they reroll their best die and keep the worse. You can spend at most 1 Karma per check; it resets after a good night&rsquo;s sleep. To recover, spend Karma and make a Resilience check (Health) or Vigilance check (Focus) vs TN 10 — on a success regain Marvel die × rank.</p>
      </div>
      <div className={`${cardCls} mb-4`}>
        <SectionH>Target Numbers by Rank</SectionH>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">A Challenging task&rsquo;s TN by rank: R1 = 11, R2 = 12, R3 = 13, R4 = 14, R5 = 15, R6 = 16. Shift it by the difficulty adjective: Trivial −6, Easy −4, Routine −2, Challenging 0, Difficult +2, Ridiculous +4, Absurd +6. The lowest standard TN is 10.</p>
      </div>
    </div>
  );
}
