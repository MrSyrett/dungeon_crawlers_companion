"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { safeNext } from "@/lib/safe-next";
import {
  actionIp, blocked, strike, take,
  LOGIN_PER_IP, LOGIN_PER_EMAIL, SIGNUP_PER_IP, TOO_MANY,
} from "@/lib/rate-limit";

export type AuthState = { error?: string; notice?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  // A handful of new accounts an hour per address is plenty for a family
  // signing up at the table; a script making hundreds is not welcome.
  if (!take(`signup:ip:${await actionIp()}`, SIGNUP_PER_IP)) return { error: TOO_MANY };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with that email already exists." };

  // Admins are approved automatically; everyone else waits for an admin to let
  // them in. Unapproved accounts get no session — they can't reach the app until
  // approved — so we show a notice instead of dropping them on the dashboard.
  const autoApprove = isAdminEmail(email);
  const user = await prisma.user.create({
    data: { email, passwordHash: await hashPassword(password), approved: autoApprove },
  });

  if (!autoApprove) {
    return {
      notice:
        "Account created. An admin needs to approve your access before you can sign in — you'll be able to log in once they do.",
    };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  // Only WRONG guesses count (lib/rate-limit.ts), keyed by both the address
  // and the account: a script hammering one account from many addresses hits
  // the per-email budget, one address trying many accounts hits the per-IP one,
  // and a household that all sign in correctly never notices either.
  const ipKey = `login:ip:${await actionIp()}`;
  const emailKey = `login:email:${email}`;
  if (blocked(ipKey, LOGIN_PER_IP) || blocked(emailKey, LOGIN_PER_EMAIL)) {
    return { error: TOO_MANY };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    strike(ipKey);
    strike(emailKey);
    return { error: "Invalid email or password." };
  }
  // Gate access on approval (admins are always allowed, even if a stale row
  // somehow has approved=false). No session is created for pending accounts.
  if (!user.approved && !isAdminEmail(user.email)) {
    return { error: "Your account is awaiting admin approval. You'll be able to sign in once it's approved." };
  }
  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
