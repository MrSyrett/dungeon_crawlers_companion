import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHiddenSystemKeys } from "@/lib/systems";
import { CHARACTER_TOOL_IDS } from "@/lib/tools";
import { isSystemKey, type SystemKey } from "@/components/systemStore";
import CampaignsList, {
  type CampaignRow,
  type CampaignsBySystem,
  type JoinedRow,
} from "@/components/CampaignsList";

export const dynamic = "force-dynamic";

// Campaigns, one system at a time.
//
// This page used to render every campaign itself, with a per-campaign system
// dropdown. It now does what the dashboard and the Rulebooks shelf already do:
// the server reads EVERY system's campaigns once, shapes them into compact plain
// rows grouped by system, and hands them to a client component that renders the
// one system the shared store is on. Switching system is instant and re-queries
// nothing, and the page wears that system's theme because /campaigns is no longer
// in SiteNav's CHROME_PREFIXES.
//
// A campaign's system is chosen once, at creation, from whichever system you are
// in (see createCampaign in @/app/actions/campaigns) and cannot be changed after.

// Only the handful of fields we read out of a saved character sheet.
type SheetBlob = {
  name?: unknown;
  class?: unknown;
  level?: unknown;
};

type PartyMember = { id: string; name: string; cls: string; level: number | null };

// Pull {name, cls, level} out of a saved character document — Shadowdark
// (sd_sheet: top-level name/class/level) or Dungeon Crawler Carl (dcc_sheet:
// header['f-name'/'f-class'/'f-level']). Returns null for anything unreadable.
function readCharMeta(
  data: unknown,
  fallbackTitle: string,
): { name: string; cls: string; level: number | null } | null {
  const blob = (data ?? null) as Record<string, unknown> | null;
  try {
    const sd = blob?.sd_sheet;
    if (typeof sd === "string") {
      const s = JSON.parse(sd) as SheetBlob;
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: typeof s.class === "string" ? s.class : "",
        level: typeof s.level === "number" ? s.level : null,
      };
    }
    // Candela Obscura: no levels — the roster shows role · specialty as the class.
    const co = blob?.co_sheet;
    if (typeof co === "string") {
      const s = JSON.parse(co) as { name?: unknown; role?: unknown; specialty?: unknown };
      const cls = [s.role, s.specialty].filter((v) => typeof v === "string" && v.trim()).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // Year Zero Engine: no levels — the roster shows the archetype as the class.
    const yze = blob?.yze_sheet;
    if (typeof yze === "string") {
      const s = JSON.parse(yze) as { name?: unknown; archetype?: unknown; class?: unknown };
      const cls = (typeof s.archetype === "string" && s.archetype.trim()) ? s.archetype : (typeof s.class === "string" ? s.class : "");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // Marvel Multiverse RPG: "level" is Rank; the class column shows the origin.
    const mmrpg = blob?.mmrpg_sheet;
    if (typeof mmrpg === "string") {
      const s = JSON.parse(mmrpg) as { name?: unknown; origin?: unknown; occupation?: unknown; rank?: unknown };
      const cls = (typeof s.origin === "string" && s.origin.trim()) ? s.origin : (typeof s.occupation === "string" ? s.occupation : "");
      const rank = Number(s.rank);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: Number.isFinite(rank) && rank > 0 ? rank : null,
      };
    }
    const jlu = blob?.jlu_sheet;
    if (typeof jlu === "string") {
      const s = JSON.parse(jlu) as { name?: unknown; origin?: unknown; arch?: unknown; tier?: unknown };
      const bits = [
        typeof s.tier === "string" && s.tier ? `Tier ${s.tier}` : "",
        typeof s.origin === "string" ? s.origin : "",
        typeof s.arch === "string" ? s.arch : "",
      ].filter(Boolean);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: bits.join(" · "),
        level: null,
      };
    }
    const gb = blob?.gb_sheet;
    if (typeof gb === "string") {
      const s = JSON.parse(gb) as { name?: unknown; goal?: unknown };
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: typeof s.goal === "string" ? s.goal : "Ghostbuster",
        level: null,
      };
    }
    const dcc = blob?.dcc_sheet;
    if (typeof dcc === "string") {
      const s = JSON.parse(dcc) as { header?: Record<string, unknown> };
      const h = s.header || {};
      const nm = h["f-name"], cl = h["f-class"];
      const lv = parseInt(String(h["f-level"] ?? ""), 10);
      return {
        name: (typeof nm === "string" && nm.trim()) || fallbackTitle || "Unnamed",
        cls: typeof cl === "string" ? cl : "",
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Nimble: class + level like Shadowdark.
    const nim = blob?.nimble_sheet;
    if (typeof nim === "string") {
      const s = JSON.parse(nim) as { name?: unknown; cls?: unknown; level?: unknown; ancestry?: unknown };
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls: [s.ancestry, s.cls].filter((v) => typeof v === "string" && v.trim()).join(" "),
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Star Wars: no levels — the roster shows the template as the class.
    const sw = blob?.sw_sheet;
    if (typeof sw === "string") {
      const s = JSON.parse(sw) as { name?: unknown; template?: unknown; species?: unknown };
      const cls = [s.species, s.template].filter((v) => typeof v === "string" && v.trim()).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // D62e: no levels — the roster shows the template (and genre) as the class.
    const d62e = blob?.d62e_sheet;
    if (typeof d62e === "string") {
      const s = JSON.parse(d62e) as { name?: unknown; template?: unknown; genre?: unknown };
      const cls = [s.template, s.genre].filter((v) => typeof v === "string" && v.trim()).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // ICRPG: the roster shows the hero Type (and World) as the class; Milestones
    // are tracked on the sheet's level field.
    const icrpg = blob?.icrpg_sheet;
    if (typeof icrpg === "string") {
      const s = JSON.parse(icrpg) as { name?: unknown; type?: unknown; world?: unknown; level?: unknown };
      const world = { alfheim: "Alfheim", warpshell: "Warp Shell", ghostmountain: "Ghost Mountain", vigilantecity: "Vigilante City", bloodandsnow: "Blood & Snow" }[String(s.world ?? "")] ?? "";
      const cls = [typeof s.type === "string" ? s.type : "", world].filter((v) => v && String(v).trim()).join(" · ");
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: Number.isNaN(lv) ? null : lv,
      };
    }
    // Kids on Bikes: no levels — the roster shows the Trope (and book) as the class.
    const kob = blob?.kob_sheet;
    if (typeof kob === "string") {
      const s = JSON.parse(kob) as { name?: unknown; trope?: unknown; book?: unknown };
      const bookName = { bikes: "Bikes", brooms: "Brooms", capes: "Capes" }[String(s.book ?? "")] ?? "";
      const cls = [typeof s.trope === "string" ? s.trope : "", bookName].filter(Boolean).join(" · ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // ACE! Hero ID Card: no levels — the roster shows "Trait Role" as the class.
    const ace = blob?.ace_sheet;
    if (typeof ace === "string") {
      const s = JSON.parse(ace) as { name?: unknown; trait?: unknown; role?: unknown };
      const cls = [s.trait, s.role].filter((v) => typeof v === "string" && v.trim()).join(" ");
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: null,
      };
    }
    // D&D (2024): class (+ subclass) as the class, character level as the level.
    const dnd = blob?.dnd_sheet;
    if (typeof dnd === "string") {
      const s = JSON.parse(dnd) as { name?: unknown; cls?: unknown; subclass?: unknown; level?: unknown };
      const sub = typeof s.subclass === "string" && s.subclass.trim() ? `(${s.subclass.trim()})` : "";
      const cls = [typeof s.cls === "string" ? s.cls : "", sub].filter(Boolean).join(" ");
      const lv = parseInt(String(s.level ?? ""), 10);
      return {
        name: (typeof s.name === "string" && s.name.trim()) || fallbackTitle || "Unnamed",
        cls,
        level: Number.isNaN(lv) ? null : lv,
      };
    }
  } catch {
    return null;
  }
  return null;
}

export default async function CampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [campaigns, hiddenSystems] = await Promise.all([
    prisma.campaign.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, code: true, createdAt: true, vttUrl: true, system: true },
    }),
    getHiddenSystemKeys(),
  ]);

  const ids = campaigns.map((c) => c.id);

  // These three reads don't depend on one another — run them concurrently so the
  // page waits for one round-trip, not three in series:
  //  • rollStats  — roll activity per campaign (one grouped query; the log is
  //    pruned to ~500 rolls each, so it's "rolls still on record", not lifetime).
  //  • partyDocs  — every character sheet linked to one of these campaigns, in a
  //    SINGLE query (was an N+1: one findMany per campaign). linkedCampaignId is
  //    indexed, so this is an index scan; we group the rows in JS below.
  //  • myDocs     — the user's own linked sheets, for the "joined" section.
  // An empty `in: []` simply matches nothing, so these are safe to run even when
  // the user owns no campaigns — no need to branch on ids.length.
  const [rollStats, partyDocs, myDocs] = await Promise.all([
    prisma.campaignRoll.groupBy({
      by: ["campaignId"],
      where: { campaignId: { in: ids } },
      _count: { _all: true },
      _max: { createdAt: true },
    }),
    prisma.document.findMany({
      where: { tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: { in: ids } },
      select: { id: true, title: true, data: true, linkedCampaignId: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.document.findMany({
      where: {
        userId: user.id,
        tool: { in: CHARACTER_TOOL_IDS },
        linkedCampaignId: { not: null },
      },
      select: { id: true, title: true, data: true, linkedCampaignId: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const statFor = new Map(
    rollStats.map((r) => [r.campaignId, { rolls: r._count._all, last: r._max.createdAt }]),
  );

  // Group the linked sheets into each campaign's party (preserving updatedAt-desc
  // order from the query). We still parse the sheet JSON for name / class / level.
  const partyFor = new Map<string, PartyMember[]>();
  for (const id of ids) partyFor.set(id, []);
  for (const doc of partyDocs) {
    const cid = doc.linkedCampaignId;
    if (typeof cid !== "string" || !partyFor.has(cid)) continue;
    const meta = readCharMeta(doc.data, doc.title || "");
    if (!meta) continue; // no readable character sheet — skip
    partyFor.get(cid)!.push({ id: doc.id, name: meta.name, cls: meta.cls, level: meta.level });
  }

  // ── Campaigns the player has JOINED (a character is linked) but does not own ──
  // Membership is recorded inside each of the user's own sheets as
  // _sheet.campaign.id — now mirrored to the indexed linkedCampaignId column.
  // We gather those ids from the column, drop any this user owns, and show the
  // rest read-only. The sheet JSON is still parsed for the character name.
  const ownedIds = new Set(campaigns.map((c) => c.id));

  const joinedChars = new Map<string, string[]>(); // campaignId -> character names
  for (const doc of myDocs) {
    const cid = doc.linkedCampaignId;
    if (typeof cid !== "string" || !cid || ownedIds.has(cid)) continue;
    const meta = readCharMeta(doc.data, doc.title || "");
    const name = meta ? meta.name : doc.title || "Unnamed";
    const list = joinedChars.get(cid) ?? [];
    list.push(name);
    joinedChars.set(cid, list);
  }

  const joinedIds = [...joinedChars.keys()];
  const joinedCampaigns = joinedIds.length
    ? await prisma.campaign.findMany({
        where: { id: { in: joinedIds } },
        orderBy: { name: "asc" },
        // `system` is selected now: a joined campaign has to land in its own
        // system's group, the same as one you own.
        select: { id: true, name: true, code: true, system: true },
      })
    : [];

  // ── Group both lists by system ─────────────────────────────────────────────
  // Each system's bucket is created on demand, so a system with no campaigns is
  // simply absent and the client renders its empty state. A campaign whose system
  // is not a SystemKey (null, or a key retired since it was saved) has no bucket
  // to go in and is skipped — createCampaign refuses to make one, so this only
  // ever applies to rows that predate it.
  const bySystem: CampaignsBySystem = {};
  const bucket = (key: SystemKey) => {
    const existing = bySystem[key];
    if (existing) return existing;
    const fresh = { owned: [] as CampaignRow[], joined: [] as JoinedRow[] };
    bySystem[key] = fresh;
    return fresh;
  };

  for (const c of campaigns) {
    if (!isSystemKey(c.system)) continue;
    const stat = statFor.get(c.id);
    bucket(c.system).owned.push({
      id: c.id,
      name: c.name,
      code: c.code,
      createdAt: c.createdAt.getTime(),
      vttUrl: c.vttUrl,
      system: c.system,
      rolls: stat?.rolls ?? 0,
      lastRoll: stat?.last ? stat.last.getTime() : null,
      party: partyFor.get(c.id) ?? [],
    });
  }

  for (const c of joinedCampaigns) {
    if (!isSystemKey(c.system)) continue;
    bucket(c.system).joined.push({
      id: c.id,
      name: c.name,
      code: c.code,
      chars: joinedChars.get(c.id) ?? [],
    });
  }

  return <CampaignsList bySystem={bySystem} hiddenKeys={hiddenSystems as SystemKey[]} />;
}
