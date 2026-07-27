"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";

export type AuthState = { error?: string; notice?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

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

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }
  // Gate access on approval (admins are always allowed, even if a stale row
  // somehow has approved=false). No session is created for pending accounts.
  if (!user.approved && !isAdminEmail(user.email)) {
    return { error: "Your account is awaiting admin approval. You'll be able to sign in once it's approved." };
  }
  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
