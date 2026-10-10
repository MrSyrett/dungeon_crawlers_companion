"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isSystemKey } from "@/components/systemStore";
import { makeCode } from "@/lib/campaign-code";
import { CHARACTER_TOOL_IDS, sheetKeyFor } from "@/lib/tools";

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
  // A campaign drives Launch VTT on the dashboard too, so refresh both lists.
  revalidatePath("/campaigns");
  revalidatePath("/dashboard");
}

// Empty a campaign's roll log without touching the campaign.
//
// Ownership is checked through the relation in the where clause, so clearing
// someone else's log is a silent no-op, same as deleteCampaign. Rolls are
// autoincrement ids and every open sheet / GM Screen polls with ?since=<last
// id>, so the live feeds simply see nothing new; only a reload shows the log
// empty. Nothing else refers to rolls, so there is nothing to cascade.
export async function clearCampaignRolls(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.campaignRoll.deleteMany({ where: { campaignId: id, campaign: { ownerId: user.id } } });
  // The row's "N rolls" line reads from the count.
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

// Create a campaign owned by the current user, in ONE system.
//
// The system arrives as a hidden field carrying whichever system the Campaigns
// page was showing — the same shape as the dashboard's "+ New", which carries its
// panel's tool id. It is set once here and never editable afterwards: the
// per-campaign system dropdown (and setCampaignSystem, which saved it) are gone.
// The GM Screen reads this when the board is linked and switches system to match.
//
// A system that isn't a SystemKey is refused rather than silently stored as null,
// because a null-system campaign would not appear on a page that shows exactly
// one system — it would be created and then be invisible.
export async function createCampaign(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const rawSystem = String(formData.get("system") ?? "").trim();
  if (!isSystemKey(rawSystem)) return;

  const rawName = formData.get("name");
  const name =
    typeof rawName === "string" && rawName.trim() ? rawName.trim().slice(0, 60) : "New Campaign";

  // The Owlbear room can be set AT CREATION now, not only afterwards — the "+ New"
  // dialog asks for it, because a GM who already has a room is otherwise made to
  // create the campaign, find it in the list and edit it. Optional: an empty or
  // unparseable value stores null, exactly as clearing the field later does.
  //
  // safeVttUrl, not a trim: a stored `javascript:` URL becomes a script that runs
  // when a player clicks Open VTT. This is the one path into that column that did
  // not exist before, so it goes through the same gate as the other one.
  const vttUrl = safeVttUrl(String(formData.get("vttUrl") ?? ""));

  // Mirror the /api/campaigns POST: retry on the (unlikely) join-code collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await prisma.campaign.create({
        data: { name, code: makeCode(), ownerId: user.id, system: rawSystem, vttUrl },
      });
      break;
    } catch {
      if (attempt === 4) throw new Error("Could not create campaign");
    }
  }

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

// Mint a fresh join code for a campaign you own.
//
// The point is to kill invite links that leaked or went stale: a new code breaks
// every /join/<old code> link and anyone still holding the old one. Players who
// have ALREADY joined are unaffected — the link between a sheet and a campaign is
// stored by campaign id, not by code, so regenerating the code never kicks the
// party, it only stops new joins on the old code.
//
// update() in a retry loop rather than updateMany(): the code column is unique,
// so a (vanishingly unlikely) collision throws, and we try again — the same
// shape createCampaign uses. Ownership is confirmed first so a non-owner is a
// silent no-op, like the other actions here.
export async function regenerateCampaignCode(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const owned = await prisma.campaign.count({ where: { id, ownerId: user.id } });
  if (!owned) return;

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await prisma.campaign.update({ where: { id }, data: { code: makeCode() } });
      break;
    } catch {
      if (attempt === 4) return;
    }
  }
  revalidatePath("/campaigns");
  revalidatePath("/dashboard");
}

// Remove `campaign` from a character sheet's own JSON body, whatever system it
// is, so the save route (which re-derives the link from the body on every save)
// can't quietly re-link the player after we clear the indexed column. Only the
// campaign-link fields are touched — the character itself is left exactly as it
// was. Returns the data object to write back, or null if there was nothing to
// change (so the caller can skip the write).
function stripSheetCampaign(tool: string, data: unknown): object | null {
  const key = sheetKeyFor(tool);
  if (!key) return null;
  const blob = (data ?? {}) as Record<string, unknown>;
  const raw = blob[key];
  if (typeof raw !== "string") return null;
  let sheet: Record<string, unknown>;
  try {
    sheet = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
  let changed = false;
  if ("campaign" in sheet) {
    delete sheet.campaign;
    changed = true;
  }
  const inner = sheet._sheet as Record<string, unknown> | undefined;
  if (inner && typeof inner === "object" && "campaign" in inner) {
    delete inner.campaign;
    changed = true;
  }
  if (!changed) return null;
  return { ...blob, [key]: JSON.stringify(sheet) };
}

// Remove one player's character from a campaign you own ("remove a player").
//
// A player is "in" a campaign because their character sheet is linked to it
// (Document.linkedCampaignId, mirrored from the sheet's own JSON). Removing them
// severs that link: we clear the JSON record (stripSheetCampaign) AND the indexed
// column, so the sheet stops appearing in the party and stops exchanging rolls.
//
// Two deliberate limits. First, we only ever touch the campaign-link fields of a
// sheet that is actually linked to THIS campaign, and only the owner of the
// campaign can do it — the GM can't reach into arbitrary documents. Second, a
// player who has that sheet OPEN at the moment can re-link by saving (their live
// page still holds the connection in memory); this is a between-sessions tidy-up,
// not a hard ban. A true block-list would be a schema change; this isn't that.
export async function removeCampaignMember(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaignId = String(formData.get("campaignId") ?? "");
  const docId = String(formData.get("docId") ?? "");
  if (!campaignId || !docId) return;

  const owns = await prisma.campaign.count({ where: { id: campaignId, ownerId: user.id } });
  if (!owns) return;

  const doc = await prisma.document.findFirst({
    where: { id: docId, linkedCampaignId: campaignId, tool: { in: CHARACTER_TOOL_IDS } },
    select: { id: true, tool: true, data: true },
  });
  if (!doc) return;

  const stripped = stripSheetCampaign(doc.tool, doc.data);
  await prisma.document.update({
    where: { id: doc.id },
    data: { linkedCampaignId: null, ...(stripped ? { data: stripped } : {}) },
  });

  revalidatePath("/campaigns");
  revalidatePath("/dashboard");
}
