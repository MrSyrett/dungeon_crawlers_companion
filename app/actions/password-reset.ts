"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import {
  createResetToken,
  userIdForResetToken,
  consumeResetToken,
} from "@/lib/password-reset";

export type ForgotState = { error?: string; sent?: boolean };
export type ResetState = { error?: string; done?: boolean };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Build the site's origin for the reset link. Prefer an explicit APP_URL if set;
// otherwise derive it from the (proxy-provided) request headers. Railway sits
// behind a proxy that sets x-forwarded-*.
async function appOrigin(): Promise<string> {
  const explicit = process.env.APP_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");
  return `${proto}://${host}`;
}

// Step 1 — the /forgot-password form posts here.
export async function requestPasswordReset(
  _prev: ForgotState,
  formData: FormData,
): Promise<ForgotState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };

  const user = await prisma.user.findUnique({ where: { email } });

  // Only actually send when the account exists — but ALWAYS report the same
  // "if an account exists…" success. Otherwise this form leaks which emails are
  // registered (account enumeration).
  if (user) {
    try {
      const token = await createResetToken(user.id);
      const link = `${await appOrigin()}/reset-password?token=${token}`;
      await sendEmail({
        to: email,
        subject: "Reset your Dungeon Crawler's Companion password",
        text:
          `Someone asked to reset the password for this account.\n\n` +
          `Open this link to choose a new password (valid for 1 hour):\n${link}\n\n` +
          `If this wasn't you, you can ignore this email — nothing has changed.`,
        html: resetEmailHtml(link),
      });
    } catch (err) {
      // A real send failure (bad API key, provider down) is worth telling the
      // user about, so they don't sit waiting for an email that will never come.
      console.error("[password-reset] send failed:", err);
      return { error: "Could not send the reset email right now. Please try again shortly." };
    }
  }

  return { sent: true };
}

// Step 2 — the /reset-password form posts here with the token + new password.
export async function resetPassword(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords do not match." };

  const userId = await userIdForResetToken(token);
  if (!userId) {
    return { error: "This reset link is invalid or has expired. Request a new one." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await hashPassword(password) },
  });
  await consumeResetToken(token);

  // Sign out every existing session for this user, so an old/stolen session
  // can't outlive the reset.
  await prisma.session.deleteMany({ where: { userId } });

  return { done: true };
}

function resetEmailHtml(link: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#12100e;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="440" cellpadding="0" cellspacing="0"
                 style="background:#1b1815;border:1px solid #322c25;border-radius:10px;padding:32px;">
            <tr>
              <td style="color:#e9e2d4;">
                <h1 style="margin:0 0 6px;font-size:20px;color:#e9e2d4;">Reset your password</h1>
                <p style="margin:0 0 20px;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#c9a34a;">
                  Dungeon Crawler&rsquo;s Companion
                </p>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.5;color:#c8c0b2;">
                  Someone asked to reset the password for this account. Click below to choose a new
                  one. This link is good for one hour.
                </p>
                <p style="margin:0 0 24px;">
                  <a href="${link}"
                     style="display:inline-block;background:#c9a34a;color:#000;text-decoration:none;
                            font-weight:bold;font-size:14px;letter-spacing:.12em;text-transform:uppercase;
                            padding:12px 22px;border-radius:6px;">Choose a new password</a>
                </p>
                <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#8a8274;">
                  If the button doesn&rsquo;t work, paste this link into your browser:
                </p>
                <p style="margin:0 0 24px;font-size:12px;word-break:break-all;color:#8a8274;">${link}</p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#8a8274;">
                  If this wasn&rsquo;t you, you can safely ignore this email &mdash; nothing has changed.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
