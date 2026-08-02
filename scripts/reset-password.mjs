// reset-password.mjs
// Reset a Dungeon Crawler's Companion user's password directly in the DB.
// Matches the scrypt hashing scheme in lib/auth.ts exactly.
//
// Usage (run from the repo root, with DATABASE_URL set to the PROD database):
//   node reset-password.mjs someone@example.com "TheirNewPassword123"
//
// Then hand the dev that email + new password. He logs in at /login and is back in.

import { scrypt as _scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import { PrismaClient } from "@prisma/client";

const scrypt = promisify(_scrypt);
const prisma = new PrismaClient();

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

async function main() {
  const [emailArg, password] = process.argv.slice(2);
  const email = (emailArg ?? "").trim().toLowerCase();

  if (!email || !password) {
    console.error('Usage: node reset-password.mjs <email> "<new password>"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters (matches the signup rule).");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user found with email: ${email}`);
    process.exit(1);
  }

  await prisma.user.update({
    where: { email },
    data: { passwordHash: await hashPassword(password) },
  });

  // Optional but recommended: clear any stale sessions for this user so only
  // the new login is valid. Comment out if you'd rather leave sessions alone.
  await prisma.session.deleteMany({ where: { userId: user.id } });

  console.log(`✅ Password reset for ${email}. They can now sign in at /login with the new password.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
