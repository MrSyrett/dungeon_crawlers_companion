import { scrypt as _scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const scrypt = promisify(_scrypt);

const COOKIE_NAME = "dd_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

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
    expires: expiresAt,
  });
}

// Memoized per request (React cache): several server components and helpers ask
// for the current user during one render; only the first call hits the DB.
// Only id + email are ever read off the result, so we select just those (plus
// the approval flag we gate on) rather than hydrating the whole user row
// (passwordHash included) on every request — this runs on the 4-second roll
// poll for every connected tool.
export const getCurrentUser = cache(async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      expiresAt: true,
      user: { select: { id: true, email: true, approved: true } },
    },
  });
  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  // If approval was revoked after they signed in, treat them as logged out so
  // the change takes effect without waiting for the session to expire. Admins
  // are always allowed regardless of the flag.
  if (!session.user.approved && !isAdminEmail(session.user.email)) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  const { id, email } = session.user;
  return { id, email };
});

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
    cookieStore.delete(COOKIE_NAME);
  }
}
