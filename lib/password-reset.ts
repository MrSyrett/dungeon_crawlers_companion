// lib/password-reset.ts
//
// Helpers for the forgotten-password flow. Mirrors the VttToken posture: the
// database only ever holds a SHA-256 hash of the token; the raw token lives
// solely in the emailed link.

import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

// One hour: long enough to walk over from the email, short enough that a leaked
// link goes stale fast.
const TOKEN_TTL_MS = 1000 * 60 * 60;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// Create a fresh reset token for a user and return the RAW token (to be emailed).
// Any earlier unused tokens for the same user are dropped, so only the newest
// link works — clicking "forgot password" twice invalidates the first email.
export async function createResetToken(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.deleteMany({ where: { userId, usedAt: null } });
  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });
  return token;
}

// Resolve a raw token to its userId, but only if it is still valid: it exists,
// has not been used, and has not expired. Returns null otherwise.
export async function userIdForResetToken(token: string): Promise<string | null> {
  if (!token) return null;
  const row = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!row || row.usedAt || row.expiresAt.getTime() < Date.now()) return null;
  return row.userId;
}

// Mark a token consumed once the password has actually been changed, so the
// same link can never be replayed.
export async function consumeResetToken(token: string): Promise<void> {
  await prisma.passwordResetToken
    .update({ where: { tokenHash: hashToken(token) }, data: { usedAt: new Date() } })
    .catch(() => {});
}
