import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getHiddenSystemKeys } from "@/lib/systems";
import { type SystemKey } from "@/components/systemStore";
import { readSystemCookie } from "@/lib/system-cookie";
import { loadCampaignCards } from "@/lib/rosters";
import CampaignsList, { type CampaignsBySystem } from "@/components/CampaignsList";

export const dynamic = "force-dynamic";

// Campaigns, one system at a time.
//
// The server reads EVERY system's campaigns once — the ones you run and the ones
// you play in — through the same loader My Campaigns uses (lib/rosters.ts), groups
// them by system, and hands them to a client component that renders the one
// system the shared store is on. Switching system is instant and re-queries
// nothing, and the page wears that system's theme because /campaigns is not in
// SiteNav's CHROME_PREFIXES.
//
// A campaign's system is chosen once, at creation, from whichever system you are
// in (see createCampaign in @/app/actions/campaigns) and cannot be changed after.
export default async function CampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [cards, hiddenSystems, initialSystem] = await Promise.all([
    loadCampaignCards(user.id),
    getHiddenSystemKeys(),
    readSystemCookie(),
  ]);

  const bySystem: CampaignsBySystem = {};
  for (const c of cards) {
    const g = (bySystem[c.system] ??= { owned: [], joined: [] });
    (c.role === "gm" ? g.owned : g.joined).push(c);
  }

  return <CampaignsList bySystem={bySystem} hiddenKeys={hiddenSystems as SystemKey[]} initialSystem={initialSystem} />;
}
