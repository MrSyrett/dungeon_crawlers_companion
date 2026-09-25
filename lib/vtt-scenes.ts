// VTT scene helpers — persistence + access control for the first-party board.
//
// A "scene" is stored as a Document with tool = "vtt-scene", scoped to a
// campaign and owned by the GM (the campaign owner). No schema change: Document.tool
// is a free string and campaignId already exists. Players never read scenes from the
// DB — they receive scene state live from the GM over the peer connection.
import { prisma } from "@/lib/prisma";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";

export const VTT_SCENE_TOOL = "vtt-scene";

// Keep server-stored scenes small. Map images that are LINKS cost nothing; an
// EMBEDDED image (a local file / UVTT with the picture baked in) can be several
// MB. Mirror the app's existing "don't bloat the DB" posture (see gm-screen
// stripBigFiles): keep an embedded image only under this cap, else drop it and
// mark the map so the GM re-loads it locally next session. Walls/doors/tokens
// (the small, valuable part) are always kept.
const EMBEDDED_MAP_CAP = 3_500_000; // ~3.5 MB of data-url string

type SceneMap = { srcType?: string; src?: string | null; [k: string]: unknown };
type SceneData = { map?: SceneMap; [k: string]: unknown };

/** Returns the scene with an oversized embedded map image stripped (link maps untouched). */
export function stripSceneForStore(data: unknown): { data: SceneData; stripped: boolean } {
  const scene = (data && typeof data === "object" ? { ...(data as SceneData) } : {}) as SceneData;
  const map = scene.map;
  if (
    map && map.srcType === "embedded" && typeof map.src === "string" &&
    map.src.length > EMBEDDED_MAP_CAP
  ) {
    scene.map = { ...map, src: null, srcType: "embedded-stripped" };
    return { data: scene, stripped: true };
  }
  return { data: scene, stripped: false };
}

/** The GM (campaign owner) is the only one who manages scenes. */
export async function ownsCampaign(userId: string, campaignId: string): Promise<boolean> {
  const c = await prisma.campaign.count({ where: { id: campaignId, ownerId: userId } });
  return c > 0;
}

/**
 * Can this user open the campaign's board at all?
 * - The GM owns it.
 * - A player belongs if they own a character sheet linked to the campaign
 *   (Document.linkedCampaignId), the same rule the campaign roster already uses.
 * Returns "gm" | "player" | null.
 */
export async function boardRole(userId: string, campaignId: string): Promise<"gm" | "player" | null> {
  if (await ownsCampaign(userId, campaignId)) return "gm";
  const member = await prisma.document.count({
    where: { userId, linkedCampaignId: campaignId, tool: { in: CHARACTER_TOOL_IDS } },
  });
  return member > 0 ? "player" : null;
}
