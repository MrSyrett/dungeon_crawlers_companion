import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { loadCharacterCards, type CharCardData } from "@/lib/rosters";
import PageHeader from "@/components/PageHeader";
import RosterSysName from "@/components/RosterSysName";
import CharacterCard from "@/components/CharacterCard";

// MY CHARACTERS — every sheet you've made, across every game, GROUPED BY SYSTEM
// and wearing that system's identity (its accent, display face and cover
// texture — the same tokens the home page's game tiles use). Reached from the
// account menu in the navbar.
//
// The cards are the SAME component a system's Characters page shows
// (components/CharacterCard.tsx, data from lib/rosters.ts): name, details,
// campaign, and Sheet / VTT / Campaign (or Link) / Delete. This page only
// decides the grouping.
//
// Like the home page it wears NO single system's skin: it is in CHROME_PREFIXES
// (components/navConfig.ts), and each group is styled by its own data-sys, so
// many systems sit on one neutral page.

export const dynamic = "force-dynamic";

export default async function MyCharactersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const cards = await loadCharacterCards(user.id);
  const bySystem = new Map<SystemKey, CharCardData[]>();
  for (const c of cards) {
    const list = bySystem.get(c.system);
    if (list) list.push(c);
    else bySystem.set(c.system, [c]);
  }
  // SYSTEMS is the deliberate order; keep only the systems that have characters.
  const systems = SYSTEMS.filter((s) => bySystem.has(s.key));

  return (
    <div className="home-roster mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader
        title="My Characters"
        subtitle={
          cards.length
            ? `${cards.length} ${cards.length === 1 ? "character" : "characters"} across ${systems.length} ${systems.length === 1 ? "game" : "games"}`
            : "Every character you make, in every game"
        }
      />
      {systems.length === 0 ? (
        <p className="roster-empty">
          No characters yet — <Link href="/#home-systems" className="underline underline-offset-2">pick a game</Link> and roll one up.
        </p>
      ) : (
        systems.map((s) => (
          <section key={s.key} className="roster-sys" data-sys={s.key}>
            <RosterSysName system={s.key} name={s.name} />
            <ul className="roster-cards">
              {bySystem.get(s.key)!.map((c) => (
                <li key={c.id} className="min-w-0">
                  <CharacterCard c={c} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
