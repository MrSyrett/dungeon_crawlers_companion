import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, TOOL_ORDER, type ToolId } from "@/lib/tools";
import { SYSTEMS, type SystemKey } from "@/components/systemStore";
import { getHiddenSystemKeys } from "@/lib/systems";
import DashboardDocs, { type SystemPanels, type DocRow } from "@/components/DashboardDocs";
import { readSystemCookie, readViewCookie } from "@/lib/system-cookie";
import { loadCharacterCards, loadChapterCounts, type CharCardData } from "@/lib/rosters";

// The homepage. The top navbar (SiteNav, in the root layout) owns system
// selection, the Characters/Adventures tabs, Compendium and Tools; this page
// only renders the active system's active list.
//
// Perf: we query the user's documents once, then hand the client compact row
// data grouped by system + tool — NOT fourteen fully-rendered panels. Only the
// active slice is ever in the DOM, so a GM with dozens of adventures no longer
// pays to render (and ship) every other system's lists on each load.
export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const hiddenSystems = await getHiddenSystemKeys();
  // The system/view the browser last chose, so the first paint is already theirs.
  const [initialSystem, initialView] = await Promise.all([readSystemCookie(), readViewCookie()]);

  // Characters are the same cards My Characters shows (lib/rosters.ts); the
  // adventure list below still comes from the plain document rows.
  const [docs, charCards] = await Promise.all([prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true, tool: true, linkedCampaignId: true },
  }), loadCharacterCards(user.id)]);
  const chapters = await loadChapterCounts(user.id);
  const cardsBySystem = new Map<SystemKey, CharCardData[]>();
  for (const c of charCards) {
    const l = cardsBySystem.get(c.system);
    if (l) l.push(c);
    else cardsBySystem.set(c.system, [c]);
  }

  // Map each campaign-linked sheet to its campaign's Owlbear room (if any) so it
  // can offer Launch VTT; sheets with a campaign but no room fall back to our
  // first-party tabletop at /play/<campaignId>. One batched query, no N+1.
  const campaignIds = [
    ...new Set(
      (docs as { linkedCampaignId: string | null }[])
        .map((d) => d.linkedCampaignId)
        .filter((v): v is string => !!v),
    ),
  ];
  const vttByCampaign = new Map<string, string>();
  if (campaignIds.length) {
    const linked = await prisma.campaign.findMany({
      where: { id: { in: campaignIds }, NOT: { vttUrl: null } },
      select: { id: true, vttUrl: true },
    });
    for (const c of linked as { id: string; vttUrl: string | null }[]) {
      if (c.vttUrl) vttByCampaign.set(c.id, c.vttUrl);
    }
  }

  const byTool = new Map<ToolId, DocRow[]>();
  for (const id of TOOL_ORDER) byTool.set(id, []);
  for (const doc of docs) {
    const tool = doc.tool as ToolId;
    if (!byTool.has(tool)) continue;
    const cid = doc.linkedCampaignId;
    const owlbear = cid ? vttByCampaign.get(cid) : undefined;
    const vttHref = cid ? owlbear ?? `/play/${cid}` : null;
    byTool.get(tool)!.push({
      id: doc.id,
      title: doc.title,
      updatedAt: doc.updatedAt.getTime(),
      vttHref,
      vttKind: !cid ? null : owlbear ? "owlbear" : "tabletop",
      chapters: chapters.get(doc.id) ?? null,
    });
  }

  // Group into per-system { character, session } panels for the client.
  const panels: SystemPanels = {};
  for (const s of SYSTEMS) {
    const charId = TOOL_ORDER.find((id) => TOOLS[id].system === s.key && TOOLS[id].kind === "character");
    const sessId = TOOL_ORDER.find((id) => TOOLS[id].system === s.key && TOOLS[id].kind === "session");
    const entry: SystemPanels[SystemKey] = {};
    if (charId) entry.character = { toolId: charId, docs: byTool.get(charId) ?? [], cards: cardsBySystem.get(s.key) ?? [] };
    if (sessId) entry.session = { toolId: sessId, docs: byTool.get(sessId) ?? [] };
    panels[s.key] = entry;
  }

  return <DashboardDocs panels={panels} hiddenKeys={hiddenSystems as SystemKey[]} initialSystem={initialSystem} initialView={initialView} />;
}
