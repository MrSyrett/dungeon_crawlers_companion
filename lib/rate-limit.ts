import { headers } from "next/headers";

// A small in-memory sliding-window rate limiter for the handful of endpoints
// that take a guess: signing in, signing up, asking for a password reset and
// looking up a campaign by its join code. Nothing else needs one.
//
// In memory on purpose. The site runs as a single instance, so one process
// sees every request and this is the whole truth; a restart forgets the
// counters, which only ever errs on the side of letting someone through. If
// the site ever runs on several instances this should move to the database
// or a shared store — until then, a dependency and a table would be more
// machinery than the problem deserves.
//
// Two ways to count, because the two kinds of endpoint differ:
//
//   strike(key) / blocked(key, …)  — count FAILURES only. A sign-in that
//     succeeds costs nothing, so a household behind one IP can all log in
//     at once; only wrong passwords (or wrong codes) accumulate.
//   take(key, …)                   — count every call. For things that do
//     work on every request, like sending a reset email.
//
// Keys are plain strings: "login:ip:1.2.3.4", "reset:email:x@y". Entries
// expire out of the map as they are touched, and the map is swept whenever
// it grows large, so a scan of many keys cannot fill memory.

type Window = { limit: number; windowMs: number };

const hits = new Map<string, number[]>();
const SWEEP_AT = 10_000;

function prune(key: string, now: number, windowMs: number): number[] {
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length) hits.set(key, arr);
  else hits.delete(key);
  return arr;
}

function sweep(now: number) {
  if (hits.size < SWEEP_AT) return;
  for (const [k, arr] of hits) {
    // Anything older than an hour is outside every window used here.
    if (!arr.some((t) => now - t < 60 * 60 * 1000)) hits.delete(k);
  }
}

/** Is this key over its failure budget? Does not record anything. */
export function blocked(key: string, { limit, windowMs }: Window): boolean {
  return prune(key, Date.now(), windowMs).length >= limit;
}

/** Record one failure against the key. */
export function strike(key: string): void {
  const now = Date.now();
  const arr = hits.get(key) ?? [];
  arr.push(now);
  hits.set(key, arr);
  sweep(now);
}

/** Record one call and say whether it was within budget. */
export function take(key: string, { limit, windowMs }: Window): boolean {
  const now = Date.now();
  const arr = prune(key, now, windowMs);
  if (arr.length >= limit) return false;
  arr.push(now);
  hits.set(key, arr);
  sweep(now);
  return true;
}

/**
 * The caller's address, for keying. Railway (and any proxy) sets
 * x-forwarded-for with the client first; the direct connection is not
 * visible to a Server Action, so that header is the best there is. When
 * nothing identifies the caller the key is "unknown" and everyone behind it
 * shares one budget — a worse experience than a wrong answer, so the limits
 * here are set with that in mind.
 */
export function clientIp(h: Headers): string {
  const fwd = h.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

/** Same, from inside a Server Action. */
export async function actionIp(): Promise<string> {
  return clientIp(await headers());
}

// The budgets. Generous for people, hopeless for a script.
export const LOGIN_PER_IP: Window = { limit: 20, windowMs: 15 * 60 * 1000 };
export const LOGIN_PER_EMAIL: Window = { limit: 10, windowMs: 15 * 60 * 1000 };
export const SIGNUP_PER_IP: Window = { limit: 5, windowMs: 60 * 60 * 1000 };
export const RESET_PER_IP: Window = { limit: 5, windowMs: 15 * 60 * 1000 };
export const RESET_PER_EMAIL: Window = { limit: 3, windowMs: 60 * 60 * 1000 };
export const CODE_MISSES_PER_USER: Window = { limit: 20, windowMs: 10 * 60 * 1000 };

export const TOO_MANY = "Too many attempts. Wait a few minutes and try again.";
