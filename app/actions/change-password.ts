"use server";

import { prisma } from "@/lib/prisma";
import {
  getCurrentUser,
  getCurrentSessionId,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";

export type ChangePasswordState = { error?: string; done?: boolean };

// Change the signed-in user's password. Requires the current password, so a
// walk-up at an unlocked screen can't silently take over the account.
export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const user = await getCurrentUser();
  if (!user) return { error: "You need to be signed in to change your password." };

  const current = String(formData.get("current") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!(await verifyPassword(current, user.passwordHash))) {
    return { error: "Your current password is incorrect." };
  }
  if (password.length < 8) return { error: "New password must be at least 8 characters." };
  if (password === current) {
    return { error: "New password must be different from your current one." };
  }
  if (password !== confirm) return { error: "New passwords do not match." };

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(password) },
  });

  // Keep the session they're changing it from; sign out every other session so
  // a device that had a stolen/old login is booted.
  const sessionId = await getCurrentSessionId();
  await prisma.session.deleteMany({
    where: { userId: user.id, ...(sessionId ? { id: { not: sessionId } } : {}) },
  });

  return { done: true };
}
