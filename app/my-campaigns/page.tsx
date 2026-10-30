import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { loadCampaignCards, type CampCardData } from "@/lib/rosters";
import PageHeader from "@/components/PageHeader";
import RosterSysName from "@/components/RosterSysName";
import CampaignCard from "@/components/CampaignCard";

// MY CAMPAIGNS — the campaign counterpart of My Characters: every campaign you
// run (Game Master) or play in (one of your sheets is linked to it), across
// every game, grouped by system in that system's identity. Reached from the
// account menu in the navbar.
//
// The cards are the SAME component a system's Campaigns page shows
// (components/CampaignCard.tsx, data from lib/rosters.ts): the party with each
// character's details, VTT and your Sheet for everyone; the join code, Invite,
// links to the players' sheets, GM Screen and Edit for the GM. This page only
// decides the grouping. Wears no single system's skin (CHROME_PREFIXES).

export const dynamic = "force-dynamic";

export default async function MyCampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Campaigns you run come first (the loader orders them so), then the ones you play in.
  const cards = await loadCampaignCards(user.id);
  const bySystem = new Map<SystemKey, CampCardData[]>();
  for (const c of cards) {
    const list = bySystem.get(c.system);
    if (list) list.push(c);
    else bySystem.set(c.system, [c]);
  }
  const systems = SYSTEMS.filter((s) => bySystem.has(s.key));

  return (
    <div className="home-roster mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader
        title="My Campaigns"
        subtitle={
          cards.length
            ? `${cards.length} ${cards.length === 1 ? "campaign" : "campaigns"} across ${systems.length} ${systems.length === 1 ? "game" : "games"}`
            : "The games you run and the games you play in"
        }
      />
      {systems.length === 0 ? (
        <p className="roster-empty">
          No campaigns yet — start one from a game&apos;s <b>Campaigns</b> page, or join one with an invite link from your GM.
        </p>
      ) : (
        systems.map((s) => (
          <section key={s.key} className="roster-sys" data-sys={s.key}>
            <RosterSysName system={s.key} name={s.name} />
            <ul className="roster-cards">
              {bySystem.get(s.key)!.map((c) => (
                <li key={c.id} className="min-w-0">
                  <CampaignCard c={c} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
