import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";
import { SYSTEMS, isSystemKey, type SystemKey } from "@/components/systemStore";
import { readCharMeta } from "@/lib/char-meta";
import PageHeader from "@/components/PageHeader";
import RosterSysName from "@/components/RosterSysName";
import CampaignCardActions from "@/components/CampaignCardActions";

// MY CAMPAIGNS — the campaign counterpart of My Characters: every campaign you
// run (Game Master) or play in (one of your sheets is linked to it), across
// every game, grouped by system in that system's identity. Reached from the
// account menu in the navbar.
//
// Each card names your role and the party, with the buttons you'd reach for:
// the GM Screen, the VTT and Manage (the per-system Campaigns page) for a game
// you run; your sheet and the VTT for one you play in. Wears no single system's
// skin (CHROME_PREFIXES), like My Characters and the home page.

export const dynamic = "force-dynamic";

type CampRow = { id: string; name: string; code: string; system: string | null; vttUrl: string | null; createdAt: Date };
type DocRow = { id: string; title: string; tool: string; data: unknown; linkedCampaignId: string | null };

type Card = {
  id: string;
  name: string;
  code: string;
  system: SystemKey;
  vttUrl: string | null;
  role: "gm" | "player";
  party: string[];
  /** Player cards: your own character(s) in it, and the sheet the button opens. */
  mine: string[];
  sheet: { tool: string; id: string } | null;
  createdAt: number;
};

export default async function MyCampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Campaigns you run, and your own sheets that are linked to a campaign.
  const [ownedRows, myDocRows] = await Promise.all([
    prisma.campaign.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, code: true, system: true, vttUrl: true, createdAt: true },
    }),
    prisma.document.findMany({
      where: { userId: user.id, tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { not: null } },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, tool: true, data: true, linkedCampaignId: true },
    }),
  ]);

  const owned = ownedRows as CampRow[];
  const myDocs = myDocRows as DocRow[];
  const ownedIds = new Set(owned.map((c) => c.id));

  // Campaigns you play in but don't run: from your linked sheets.
  const mineIn = new Map<string, { names: string[]; sheet: { tool: string; id: string } }>();
  for (const d of myDocs) {
    const cid = d.linkedCampaignId;
    if (!cid || ownedIds.has(cid)) continue;
    const meta = readCharMeta(d.data, d.title || "");
    const name = meta?.name || d.title || "Unnamed";
    const hit = mineIn.get(cid);
    if (hit) hit.names.push(name);
    else mineIn.set(cid, { names: [name], sheet: { tool: d.tool, id: d.id } }); // newest sheet opens
  }
  const joinedIds = [...mineIn.keys()];
  const joined: CampRow[] = joinedIds.length
    ? await prisma.campaign.findMany({
        where: { id: { in: joinedIds } },
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, code: true, system: true, vttUrl: true, createdAt: true },
      })
    : [];

  // Every party, in one query over all the campaigns on the page.
  const allIds = [...ownedIds, ...joined.map((c) => c.id)];
  const partyDocs: Omit<DocRow, "tool">[] = allIds.length
    ? await prisma.document.findMany({
        where: { tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { in: allIds } },
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, data: true, linkedCampaignId: true },
      })
    : [];
  const partyFor = new Map<string, string[]>();
  for (const d of partyDocs) {
    if (!d.linkedCampaignId) continue;
    const meta = readCharMeta(d.data, d.title || "");
    if (!meta) continue;
    const list = partyFor.get(d.linkedCampaignId) ?? [];
    list.push(meta.name);
    partyFor.set(d.linkedCampaignId, list);
  }

  // Group by system: the campaigns you run first, then the ones you play in.
  const bySystem = new Map<SystemKey, Card[]>();
  const add = (c: Card) => {
    const list = bySystem.get(c.system);
    if (list) list.push(c);
    else bySystem.set(c.system, [c]);
  };
  for (const c of owned) {
    if (!isSystemKey(c.system)) continue; // pre-system rows have nowhere to go
    add({ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl, role: "gm", party: partyFor.get(c.id) ?? [], mine: [], sheet: null, createdAt: c.createdAt.getTime() });
  }
  for (const c of joined) {
    if (!isSystemKey(c.system)) continue;
    const m = mineIn.get(c.id)!;
    add({ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl, role: "player", party: partyFor.get(c.id) ?? [], mine: m.names, sheet: m.sheet, createdAt: c.createdAt.getTime() });
  }

  const systems = SYSTEMS.filter((s) => bySystem.has(s.key));
  const total = [...bySystem.values()].reduce((n, l) => n + l.length, 0);

  return (
    <div className="home-roster mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader
        title="My Campaigns"
        subtitle={total ? `${total} ${total === 1 ? "campaign" : "campaigns"} across ${systems.length} ${systems.length === 1 ? "game" : "games"}` : "The games you run and the games you play in"}
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
              {bySystem.get(s.key)!.map((c) => {
                const others = c.role === "player" ? c.party.filter((n) => !c.mine.includes(n)) : c.party;
                const role =
                  c.role === "gm"
                    ? `Game Master · ${c.party.length} ${c.party.length === 1 ? "character" : "characters"}`
                    : `Playing ${c.mine.join(", ")}`;
                return (
                  <li key={c.id} className="min-w-0">
                    <div className="roster-card">
                      <span className="roster-card-name">{c.name}</span>
                      <span className="roster-card-meta">{role}</span>
                      <span className="roster-card-camp">
                        {others.length
                          ? `${c.role === "gm" ? "Party" : "With"}: ${others.join(", ")}`
                          : c.role === "gm"
                            ? "No characters linked yet"
                            : "No one else has joined yet"}
                      </span>
                      <CampaignCardActions
                        role={c.role}
                        campaign={{ id: c.id, name: c.name, code: c.code, system: c.system, vttUrl: c.vttUrl }}
                        sheet={c.sheet}
                      />
                    </div>
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
