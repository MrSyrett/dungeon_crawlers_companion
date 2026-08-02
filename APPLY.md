# Forgot-password feature — how to apply

This bundle mirrors your repo layout. Copy the files into the matching paths in
`dungeon_crawlers_companion`, make the two small edits below, run the migration,
and set two env vars. Nothing here changes existing behavior — it only adds a
`/forgot-password` and `/reset-password` flow plus a "Forgot password?" link on
the sign-in form.

## Files in this bundle

New files (drop straight in):

- `lib/email.ts` — outbound email via Resend (fetch-based, no SDK).
- `lib/password-reset.ts` — create/verify/consume hashed reset tokens.
- `app/actions/password-reset.ts` — the two server actions.
- `app/forgot-password/page.tsx` — request-a-link page.
- `app/reset-password/page.tsx` — set-a-new-password page.
- `components/ForgotPasswordForm.tsx`, `components/ResetPasswordForm.tsx` — the client forms.
- `prisma/migrations/20260802000000_add_password_reset_token/migration.sql` — the DB migration.
- `scripts/reset-password.mjs` — corrected admin CLI reset (replaces the earlier one; see note at bottom).

Replaces one existing file (only change: adds the "Forgot password?" link):

- `components/AuthForm.tsx`

Reference only (do not copy as-is):

- `prisma/schema-additions.prisma` — shows the two schema edits for step 1.

## Step 1 — edit `prisma/schema.prisma`

Add one relation line inside the existing `model User { … }`, next to
`sessions`, `documents`, etc.:

```prisma
  passwordResetTokens PasswordResetToken[]
```

Then add the new model (e.g. right after `model Session`):

```prisma
model PasswordResetToken {
  id        String    @id @default(cuid())
  userId    String
  tokenHash String    @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

## Step 2 — the migration

**Preferred (regenerates the migration cleanly against your dev DB):**

```bash
npm run db:migrate -- --name add_password_reset_token
```

That writes its own migration folder under `prisma/migrations/` — if you use it,
delete the `20260802000000_add_password_reset_token/` folder from this bundle so
you don't commit two migrations for the same change.

**Fallback (no local Postgres handy):** keep the bundled migration folder. It
matches the schema above and will be applied by `prisma migrate deploy` on the
next Railway deploy (your `scripts/start.sh` already runs that).

## Step 3 — environment variables (Railway → Variables)

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxx          # from resend.com
EMAIL_FROM     = Dungeon Crawler's Companion <noreply@yourdomain.com>
```

- `EMAIL_FROM` must be on a domain you've verified in Resend. To test before
  domain setup, Resend lets you send from `onboarding@resend.dev` **to the email
  on your own Resend account**.
- Optional: `APP_URL = https://your-app-domain` to hard-set the link origin. If
  you skip it, the origin is derived from the request headers (works on Railway
  out of the box).

Set the same vars in your local `.env` if you want to test the flow in `dev`.

## Step 4 — deploy & smoke-test

1. `/login` now shows a "Forgot password?" link.
2. Enter your email → you should get the reset email (check spam).
3. The link opens `/reset-password?token=…`; set a new password.
4. You're signed out everywhere and can sign in with the new password.
5. Click the same link again → it should now say "Link expired" (single use).

## Security notes (why it's built this way)

- **No account enumeration:** the request form always says "if an account
  exists…", so it can't be used to probe which emails are registered.
- **Tokens are hashed at rest** (SHA-256), same posture as your `VttToken`. The
  raw token only ever exists in the emailed link.
- **One hour, one use:** tokens expire and are marked used after a reset;
  requesting a new link invalidates the previous one.
- **Sessions cleared on reset**, so a stolen/old session can't outlive it.

## Note on the earlier `reset-password.mjs`

The first version I sent imported `@prisma/client` and constructed it with no
adapter. That won't run in this repo: the Prisma client here is generated to
`generated/prisma` and must be built with the pg driver adapter. The version in
this bundle uses `pg` directly, so it needs only `DATABASE_URL`. Replace the old
file with this one. (If `pg` isn't hoisted to top-level `node_modules` on your
machine, run `npm i pg` — it's already in your tree via `@prisma/adapter-pg`.)
