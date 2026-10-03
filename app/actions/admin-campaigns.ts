"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";

// Deleting a campaign is destructive, so this independently confirms the caller
// is an admin — the page being admin-only is not enough on its own.
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

/**
 * Permanently delete ANY campaign (admin tool — unlike the owner-only
 * deleteCampaign in campaigns.ts, this isn't scoped to ownership).
 *
 * What cascades (per schema.prisma): the campaign's roll log (CampaignRoll),
 * its homebrew shares (HomebrewShare — the entries themselves stay, they just
 * become personal again), and every per-user GM-screen board saved for it
 * (Document "DocumentBoardCampaign", onDelete: Cascade). Players' character
 * sheets are NOT deleted — their link column is nulled (DocumentLinkedCampaign,
 * onDelete: SetNull), so the sheets survive and simply unlink.
 */
export async function adminDeleteCampaign(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // count() rather than assuming — a stale button shouldn't 500 on a missing row.
  const exists = await prisma.campaign.count({ where: { id } });
  if (exists === 0) return;

  await prisma.campaign.delete({ where: { id } });
  revalidatePath("/admin/campaigns");
}
