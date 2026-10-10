import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, TOOL_ORDER, CHARACTER_TOOL_IDS, type ToolId } from "@/lib/tools";
import { SYSTEMS, isSystemKey, type SystemKey } from "@/components/systemStore";
import { getHiddenSystemKeys } from "@/lib/systems";
import DashboardDocs, { type SystemPanels, type DocRow } from "@/components/DashboardDocs";
import { type PlayerCampaign } from "@/components/MyCampaigns";
import { readSystemCookie, readViewCookie } from "@/lib/system-cookie";

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

  const docs = await prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true, tool: true, linkedCampaignId: true },
  });

  // Map each campaign-linked sheet to its campaign's Owlbear room (if any) so it
  // can offer Launch VTT; sheets with a campaign but no room fall back to our
  // first-party tabletop at /play/<campaignId>. One batched query, no N+1.
  const campaignIds: string[] = [
    ...new Set(
      (docs as { linkedCampaignId: string | null }[])
        .map((d) => d.linkedCampaignId)
        .filter((v): v is string => !!v),
    ),
  ];
  const vttByCampaign = new Map<string, string>();
  // Name + system too now, for the "My campaigns" card (not just the room URL).
  const campInfo = new Map<string, { name: string; system: string; vttUrl: string | null }>();
  if (campaignIds.length) {
    const linked = await prisma.campaign.findMany({
      where: { id: { in: campaignIds } },
      select: { id: true, name: true, system: true, vttUrl: true },
    });
    for (const c of linked as { id: string; name: string; system: string | null; vttUrl: string | null }[]) {
      campInfo.set(c.id, { name: c.name, system: c.system ?? "", vttUrl: c.vttUrl });
      if (c.vttUrl) vttByCampaign.set(c.id, c.vttUrl);
    }
  }

  // The "My campaigns" card: the games the viewer plays in (campaignIds are the
  // campaigns their own sheets link to). Party names come from the linked sheets'
  // titles — the save route keeps each sheet's title in step with its character
  // name — so we never parse another player's sheet body here, only read titles.
  const partyByCampaign = new Map<string, string[]>();
  if (campaignIds.length) {
    const linkedSheets = await prisma.document.findMany({
      where: { linkedCampaignId: { in: campaignIds }, tool: { in: CHARACTER_TOOL_IDS } },
      select: { linkedCampaignId: true, title: true },
      orderBy: { updatedAt: "desc" },
    });
    for (const s of linkedSheets as { linkedCampaignId: string | null; title: string }[]) {
      const cid = s.linkedCampaignId;
      if (!cid) continue;
      const list = partyByCampaign.get(cid) ?? [];
      list.push(s.title && s.title.trim() ? s.title : "Unnamed");
      partyByCampaign.set(cid, list);
    }
  }

  // The viewer's own sheet in each campaign, for the "Open sheet" button — the
  // most recently updated character sheet linked to it (docs is updatedAt-desc).
  const charTools = new Set<string>(CHARACTER_TOOL_IDS);
  const mySheetByCampaign = new Map<string, { tool: string; id: string }>();
  for (const d of docs) {
    const cid = d.linkedCampaignId;
    if (!cid || !charTools.has(d.tool)) continue;
    if (!mySheetByCampaign.has(cid)) mySheetByCampaign.set(cid, { tool: d.tool, id: d.id });
  }

  const myCampaigns: PlayerCampaign[] = [];
  for (const cid of campaignIds) {
    const info = campInfo.get(cid);
    if (!info || !isSystemKey(info.system)) continue; // a null/hidden-system campaign has no dashboard home
    const owlbear = vttByCampaign.get(cid);
    myCampaigns.push({
      id: cid,
      name: info.name,
      system: info.system,
      party: partyByCampaign.get(cid) ?? [],
      sheet: mySheetByCampaign.get(cid) ?? null,
      vttHref: owlbear ?? `/play/${cid}`,
      vttKind: owlbear ? "owlbear" : "tabletop",
    });
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
    });
  }

  // Group into per-system { character, session } panels for the client.
  const panels: SystemPanels = {};
  for (const s of SYSTEMS) {
    const charId = TOOL_ORDER.find((id) => TOOLS[id].system === s.key && TOOLS[id].kind === "character");
    const sessId = TOOL_ORDER.find((id) => TOOLS[id].system === s.key && TOOLS[id].kind === "session");
    const entry: { character?: { toolId: string; docs: DocRow[] }; session?: { toolId: string; docs: DocRow[] } } = {};
    if (charId) entry.character = { toolId: charId, docs: byTool.get(charId) ?? [] };
    if (sessId) entry.session = { toolId: sessId, docs: byTool.get(sessId) ?? [] };
    panels[s.key] = entry;
  }

  return <DashboardDocs panels={panels} myCampaigns={myCampaigns} hiddenKeys={hiddenSystems as SystemKey[]} initialSystem={initialSystem} initialView={initialView} />;
}
