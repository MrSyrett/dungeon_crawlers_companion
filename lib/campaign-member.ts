import { prisma } from "@/lib/prisma";
import { participatesInCampaign } from "@/lib/homebrew";
import { CHARACTER_TOOL_IDS, campaignIdInSheet } from "@/lib/tools";

// "May this user read and post this campaign's roll log?"
//
// The roll routes used to answer for ANY campaign id to anyone signed in —
// the id is a cuid, which is hard to guess but not a secret (it sits in every
// sheet's saved JSON and in the GM Screen's URL), so a stranger with one could
// read a table's rolls and post into its log. Membership is the same predicate
// the party roster and shared homebrew use (participatesInCampaign): the GM
// who owns it, or a player with a character sheet linked to it.
//
// Two things make this safe to call on every 4-second poll:
//
// 1. A positive answer is remembered for a minute per (user, campaign), so a
//    table of six sheets costs twelve count queries a minute rather than
//    twelve every four seconds. Only YES is cached: a player who has just
//    joined must not sit behind a stale NO until it expires. Leaving a
//    campaign is not a security event, so a minute of after-glow is fine.
//    The cache is per server process; with one instance that is the whole
//    truth, with several each warms itself.
//
// 2. Before saying no, it looks for the campaign in the caller's OWN unlinked
//    sheets' JSON and repairs the index column — the same self-heal the party
//    roster's Sync button does — because a sheet saved before the column
//    existed, or restored from a backup, names the campaign in its body while
//    the column still says null. Without that, this gate would have silently
//    cut those players off from a log they had been reading for months.
const TTL_MS = 60 * 1000;
const okUntil = new Map<string, number>();

export async function isCampaignMember(userId: string, campaignId: string): Promise<boolean> {
  if (!userId || !campaignId) return false;
  const key = `${userId}:${campaignId}`;
  const until = okUntil.get(key);
  const now = Date.now();
  if (until && until > now) return true;
  if (until) okUntil.delete(key);

  let ok = await participatesInCampaign(userId, campaignId);

  if (!ok) {
    const orphans = await prisma.document.findMany({
      where: { userId, tool: { in: CHARACTER_TOOL_IDS }, linkedCampaignId: null },
      select: { id: true, data: true, tool: true },
      orderBy: { updatedAt: "desc" },
      take: 300,
    });
    const mine = orphans.filter((d) => campaignIdInSheet(d.tool, d.data) === campaignId);
    if (mine.length) {
      await prisma.document
        .updateMany({
          where: { userId, id: { in: mine.map((d) => d.id) } },
          data: { linkedCampaignId: campaignId },
        })
        .catch(() => {});
      ok = true;
    }
  }

  if (ok) {
    okUntil.set(key, now + TTL_MS);
    // Keep the map from growing without bound on a long-lived process.
    if (okUntil.size > 5000) {
      for (const [k, t] of okUntil) if (t <= now) okUntil.delete(k);
    }
  }
  return ok;
}
