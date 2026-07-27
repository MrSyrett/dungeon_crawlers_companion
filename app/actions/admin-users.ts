"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";

// Deleting an account is destructive, so this independently confirms the caller
// is an admin — the page being admin-only is not enough on its own.
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

/**
 * Approve or revoke a member's access. Approving lets a pending signup sign in;
 * revoking bars them and (via getCurrentUser's approval check) drops any active
 * session on their next request. Admins can't be de-approved through here — the
 * env var is the source of truth for them.
 */
export async function setUserApproved(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const approved = String(formData.get("approved") ?? "") === "true";
  if (!id) return;

  const target = await prisma.user.findUnique({ where: { id }, select: { email: true } });
  if (!target) return;
  if (isAdminEmail(target.email)) return; // admins are governed by ADMIN_EMAILS

  await prisma.user.update({ where: { id }, data: { approved } });
  revalidatePath("/admin/users");
}

/**
 * Permanently delete a user account and everything that cascades from it
 * (their sessions, character sheets and boards, campaigns they own, homebrew,
 * VTT tokens, and rulebook grants). Every User relation is onDelete: Cascade,
 * so a single delete cleans the account up completely.
 *
 * Guardrails: an admin can't delete their own account here (avoids locking
 * yourself out mid-session), and the id must resolve to a real user.
 */
export async function deleteUser(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id || id === admin.id) return;

  // count() rather than assuming — a stale button shouldn't 500 on a missing row.
  const exists = await prisma.user.count({ where: { id } });
  if (exists === 0) return;

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
