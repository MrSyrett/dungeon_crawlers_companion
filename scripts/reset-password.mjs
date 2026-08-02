// scripts/reset-password.mjs
//
// Admin-only: reset a user's password directly in the database, hashing it the
// same way lib/auth.ts does (scrypt, salt:key format).
//
// This talks to Postgres via `pg` directly (already present through
// @prisma/adapter-pg) rather than the generated Prisma client — the client in
// this project is emitted to generated/prisma and constructed with a driver
// adapter, so it isn't importable from a plain Node script. Raw pg avoids all
// of that and needs nothing but DATABASE_URL.
//
// Usage (run from the repo root, DATABASE_URL pointed at the TARGET database):
//   node scripts/reset-password.mjs someone@example.com "TheirNewPassword123"

import { scrypt as _scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import pg from "pg";

const scrypt = promisify(_scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

async function main() {
  const [emailArg, password] = process.argv.slice(2);
  const email = (emailArg ?? "").trim().toLowerCase();

  if (!email || !password) {
    console.error('Usage: node scripts/reset-password.mjs <email> "<new password>"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters (matches the signup rule).");
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Point it at the target database first.");
    process.exit(1);
  }

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    const { rows } = await client.query(
      'UPDATE "User" SET "passwordHash" = $1 WHERE email = $2 RETURNING id',
      [await hashPassword(password), email],
    );
    if (rows.length === 0) {
      console.error(`No user found with email: ${email}`);
      process.exitCode = 1;
      return;
    }
    // Invalidate existing sessions so only the new password grants access.
    await client.query('DELETE FROM "Session" WHERE "userId" = $1', [rows[0].id]);
    console.log(`✅ Password reset for ${email}. Existing sessions cleared.`);
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
