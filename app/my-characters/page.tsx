import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, CHARACTER_TOOL_IDS, isToolId } from "@/lib/tools";
import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { readCharMeta } from "@/lib/char-meta";
import PageHeader from "@/components/PageHeader";
import RosterSysName from "@/components/RosterSysName";

// MY CHARACTERS — every sheet you've made, across every game, GROUPED BY SYSTEM
// and wearing that system's identity (its accent, display face and cover
// texture — the same tokens the home page's game tiles use). Reached from the
// account menu in the navbar. It used to be the top of the home page.
//
// The per-system dashboards still own the full per-system lists (with Launch VTT
// and delete); this is the cross-system quick-access those one-system pages
// can't be.
//
// Like the home page it wears NO single system's skin: it is in CHROME_PREFIXES
// (components/navConfig.ts), and each group is styled by its own data-sys, so
// many systems sit on one neutral page.

export const dynamic = "force-dynamic";

type CharCard = { id: string; tool: string; name: string; cls: string; level: number | null; campaign: string | null };

// "LV 3 · Fighter", "Smuggler", "Tier 2 · Meta-Human" — level (when the system
// has one) then the class / equivalent.
function metaLine(level: number | null, cls: string): string {
  return [level !== null ? `LV ${level}` : "", cls].filter(Boolean).join(" · ");
}

export default async function MyCharactersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Every character sheet this user has made, newest first.
  const charDocs = await prisma.document.findMany({
    where: { userId: user.id, tool: { in: CHARACTER_TOOL_IDS } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, tool: true, data: true, linkedCampaignId: true },
  });
  type CharDoc = { id: string; title: string; tool: string; data: unknown; linkedCampaignId: string | null };
  const chars = charDocs as CharDoc[];

  // Name the campaign each linked sheet belongs to — one query over just the ids
  // the sheets reference. Whether you own or merely play in it, the sheet
  // carries the link; we only need the name.
  const campaignIds = [...new Set(chars.map((d) => d.linkedCampaignId).filter((v): v is string => !!v))];
  const campName = new Map<string, string>();
  if (campaignIds.length) {
    const camps = (await prisma.campaign.findMany({
      where: { id: { in: campaignIds } },
      select: { id: true, name: true },
    })) as { id: string; name: string }[];
    for (const c of camps) campName.set(c.id, c.name);
  }

  // Group by system (newest-first order preserved).
  const bySystem = new Map<SystemKey, CharCard[]>();
  for (const d of chars) {
    if (!isToolId(d.tool)) continue;
    const key = TOOLS[d.tool].system;
    const meta = readCharMeta(d.data, d.title || "");
    const card: CharCard = {
      id: d.id,
      tool: d.tool,
      name: meta?.name || (d.title && d.title.trim() ? d.title : "Untitled character"),
      cls: meta?.cls || "",
      level: meta?.level ?? null,
      campaign: d.linkedCampaignId ? campName.get(d.linkedCampaignId) ?? null : null,
    };
    const bucket = bySystem.get(key);
    if (bucket) bucket.push(card);
    else bySystem.set(key, [card]);
  }

  // SYSTEMS is the deliberate order; keep only the systems that have characters.
  const systems = SYSTEMS.filter((s) => bySystem.has(s.key));
  const total = chars.length;

  return (
    <div className="home-roster mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader
        title="My Characters"
        subtitle={total ? `${total} ${total === 1 ? "character" : "characters"} across ${systems.length} ${systems.length === 1 ? "game" : "games"}` : "Every character you make, in every game"}
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
              {bySystem.get(s.key)!.map((c) => {
                const ml = metaLine(c.level, c.cls);
                return (
                  <li key={c.id} className="min-w-0">
                    {/* Plain <a>, NOT next/link: /tools/… is a route handler that
                        builds a full standalone sheet; Link would prefetch it. */}
                    <a href={`/tools/${c.tool}/${c.id}`} className="roster-card">
                      <span className="roster-card-name">{c.name}</span>
                      {ml ? <span className="roster-card-meta">{ml}</span> : null}
                      <span className="roster-card-camp">{c.campaign ?? "No campaign"}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
