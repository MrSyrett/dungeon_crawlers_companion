import { scrypt as _scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const scrypt = promisify(_scrypt);

const COOKIE_NAME = "dd_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
// A session lasts 30 days from the LAST visit, not the first: once a week of
// it has been used up, the next request pushes the DB row out to a fresh 30
// days. Someone who plays every week never hits "Signed out — changes not
// saved" mid-session; someone who stops coming is signed out a month after
// their last visit, as before. Renewing only past a week keeps it to one extra
// write a week per person. The DB row is the only expiry that matters: the
// cookie itself is set long (below) because a page render cannot rewrite it,
// and a cookie that outlives its row is simply ignored.
const SESSION_RENEW_AFTER_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const COOKIE_LIFETIME_MS = 1000 * 60 * 60 * 24 * 400; // the browsers' cap

// ── Password hashing (scrypt, no native deps) ──

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, "hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return keyBuffer.length === derived.length && timingSafeEqual(keyBuffer, derived);
}

// ── Sessions (DB-backed, id stored in an httpOnly cookie) ──

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await prisma.session.create({ data: { userId, expiresAt } });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, session.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + COOKIE_LIFETIME_MS),
  });
}

// Deduplicated per request with React's cache(): the layout AND every page call
// this on each navigation, and Prisma does NOT dedupe on its own — without this
// wrapper each navigation paid for the session lookup twice.
export const getCurrentUser = cache(async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  // Approval is checked on every request, not only at login: an admin who
  // revokes someone on /admin/users expects them gone, and until this check
  // existed a revoked account kept its session for up to 30 days. Admins are
  // governed by ADMIN_EMAILS, exactly as at login.
  if (!session.user.approved && !isAdminEmail(session.user.email)) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  // Sliding expiry (see SESSION_RENEW_AFTER_MS).
  if (session.expiresAt.getTime() - Date.now() < SESSION_DURATION_MS - SESSION_RENEW_AFTER_MS) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await prisma.session.update({ where: { id: session.id }, data: { expiresAt } }).catch(() => {});
  }
  return session.user;
});

// The id of the caller's current session, if any. Lets a password change keep
// *this* session alive while signing out every other one.
export async function getCurrentSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
    cookieStore.delete(COOKIE_NAME);
  }
}
