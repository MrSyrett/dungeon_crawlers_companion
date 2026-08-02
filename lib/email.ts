// lib/email.ts
//
// The app's one and only outbound-email path. Backed by Resend's REST API via a
// plain `fetch` (no SDK, no new runtime deps). Every caller goes through
// `sendEmail`, so switching providers later means editing only this file.
//
// Required environment variables (set these on Railway):
//   RESEND_API_KEY   your Resend API key (starts with "re_")
//   EMAIL_FROM       the From address, e.g. "Dungeon Crawler's Companion <noreply@yourdomain.com>"
//                    (must be a verified Resend sender/domain; for a quick test
//                    you can use "onboarding@resend.dev" to send to your own inbox)

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    // Configuration error — surfaced in server logs. Callers translate this into
    // a friendly message for the user rather than leaking provider details.
    throw new Error(
      "Email is not configured: set RESEND_API_KEY and EMAIL_FROM environment variables.",
    );
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, ...(text ? { text } : {}) }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend send failed (${res.status}): ${detail}`);
  }
}
