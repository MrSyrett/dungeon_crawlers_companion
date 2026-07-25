"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// Delete a campaign you own.
//
// Ownership is part of the where clause rather than a separate lookup, so a
// campaign belonging to someone else is a silent no-op instead of an error
// that would confirm the id exists — the same shape as deleteDocument.
//
// CampaignRoll has onDelete: Cascade, so the roll log goes with it. Character
// sheets are NOT touched: they record their link inside their own JSON
// (_sheet.campaign) and belong to the players, not to the campaign owner.
export async function deleteCampaign(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.campaign.deleteMany({ where: { id, ownerId: user.id } });
  revalidatePath("/campaigns");
}

/**
 * Only ever store an http(s) URL. A stored `javascript:` or `data:` URL would
 * become a script that runs when a player clicks Launch, so anything else is
 * rejected outright rather than sanitised on the way out.
 */
function safeVttUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  return parsed.toString().slice(0, 500);
}

export async function setCampaignVttUrl(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const raw = String(formData.get("vttUrl") ?? "");
  // Clearing the field removes the link; anything unparseable is treated the
  // same way rather than silently keeping the old value.
  const vttUrl = raw.trim() ? safeVttUrl(raw) : null;

  await prisma.campaign.updateMany({ where: { id, ownerId: user.id }, data: { vttUrl } });
  revalidatePath("/campaigns");
  revalidatePath("/dashboard");
}

export async function renameCampaign(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim().slice(0, 60) || "New Campaign";
  if (!id) return;

  await prisma.campaign.updateMany({ where: { id, ownerId: user.id }, data: { name } });
  revalidatePath("/campaigns");
}
