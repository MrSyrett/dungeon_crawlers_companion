// SOLO PLAY — the switch and the shared bits of the removable solo feature.
//
// A solo campaign is NOT a Campaign row. It is its own Document type
// (tool "db-solo", data key "db_solo"), deliberately left OUT of the TOOLS
// registry in lib/tools.ts: the documents API already saves documents whose tool
// isn't registered, the dashboard skips them, and nothing that reads campaigns,
// rolls, invites, the party list, the GM Screen or the VTT ever sees one. So the
// feature can be switched off, or deleted, without touching any of that.
//
// THE SWITCH: solo play is visible to admins only (ADMIN_EMAILS) until
// SOLO_PLAY_PUBLIC=1 is set. To turn it off for everyone, set SOLO_PLAY=off.
// To remove it entirely, follow SOLO-REMOVAL.md at the repo root.
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import type { ToolDef } from "@/lib/tools";

export const SOLO_TOOL = "db-solo";
export const SOLO_KEY = "db_solo";
export const SOLO_SYSTEMS = ["DB"] as const;

export function soloEnabledFor(email: string | null | undefined): boolean {
  if ((process.env.SOLO_PLAY || "").toLowerCase() === "off") return false;
  if (process.env.SOLO_PLAY_PUBLIC === "1") return true;
  return isAdminEmail(email);
}

// What renderToolPage needs to serve the solo page like any other tool page
// (saved-state shim, site navbar, the Dragonbane skin). Cast because ToolId is a
// closed union and this tool is intentionally not in it.
export const SOLO_DEF = {
  id: SOLO_TOOL,
  system: "DB",
  systemName: "Dragonbane",
  kind: "character",
  label: "Solo Campaign",
  file: "db_solo.html",
  keys: [SOLO_KEY],
} as unknown as ToolDef;

// The parts of a saved solo campaign the Campaigns page and the cards show.
export type SoloSummary = {
  id: string;
  name: string;
  module: string;
  mission: string;
  progress: string;
  character: { id: string; name: string } | null;
  updatedAt: number;
};

export function readSoloSummary(doc: { id: string; title: string; data: unknown; updatedAt: Date }): SoloSummary {
  let s: Record<string, unknown> = {};
  try {
    const raw = (doc.data as Record<string, unknown> | null)?.[SOLO_KEY];
    if (typeof raw === "string") s = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    s = {};
  }
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const sum = (s.summary ?? {}) as Record<string, unknown>;
  const ch = (s.character ?? null) as { id?: unknown; name?: unknown } | null;
  return {
    id: doc.id,
    name: str(s.name) || doc.title || "Solo campaign",
    module: str(sum.module),
    mission: str(sum.mission),
    progress: str(sum.progress),
    character: ch && typeof ch.id === "string" ? { id: ch.id, name: str(ch.name) || "Character" } : null,
    updatedAt: doc.updatedAt.getTime(),
  };
}

// ── loaders for the site's list pages (only called when soloEnabledFor) ──────

export async function loadSoloCampaigns(userId: string): Promise<SoloSummary[]> {
  const docs = (await prisma.document.findMany({
    where: { userId, tool: SOLO_TOOL },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, data: true, updatedAt: true },
  })) as { id: string; title: string; data: unknown; updatedAt: Date }[];
  return docs.map(readSoloSummary);
}

export async function loadDbCharacters(userId: string): Promise<{ id: string; name: string; linked: boolean }[]> {
  const docs = (await prisma.document.findMany({
    where: { userId, tool: "db-character" },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, linkedCampaignId: true },
  })) as { id: string; title: string; linkedCampaignId: string | null }[];
  return docs.map((d) => ({ id: d.id, name: d.title || "Unnamed", linked: !!d.linkedCampaignId }));
}
