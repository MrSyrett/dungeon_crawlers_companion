import { cookies } from "next/headers";
import { isSystemKey, SYSTEM_COOKIE, VIEW_COOKIE, type DashView, type SystemKey } from "@/components/systemStore";

// Server-side read of the system / dashboard-view choice the client store
// mirrors into cookies (see systemStore.ts). Returns undefined when the
// browser hasn't sent one yet (first visit, cookies cleared), and the caller
// falls back to Shadowdark exactly as before — the point is that a returning
// player's hard load renders their own system straight away instead of
// flashing Shadowdark first.
export async function readSystemCookie(): Promise<SystemKey | undefined> {
  try {
    const v = (await cookies()).get(SYSTEM_COOKIE)?.value;
    return isSystemKey(v) ? v : undefined;
  } catch {
    return undefined;
  }
}

export async function readViewCookie(): Promise<DashView | undefined> {
  try {
    const v = (await cookies()).get(VIEW_COOKIE)?.value;
    return v === "adventures" || v === "characters" ? v : undefined;
  } catch {
    return undefined;
  }
}
