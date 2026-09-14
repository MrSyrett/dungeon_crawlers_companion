import { prisma } from "@/lib/prisma";
import { SYSTEMS, isSystemKey, type SystemKey } from "@/components/systemStore";

// Site-wide system visibility. The SystemSetting table only ever holds the
// systems an admin has hidden from the homepage switcher (a row with
// hidden=true). A system with no row is visible — the default. Reads here are
// tiny (at most one row per system) and cached per request by Next.

// The keys of every system currently hidden from the homepage switcher.
export async function getHiddenSystemKeys(): Promise<SystemKey[]> {
  try {
    const rows = await prisma.systemSetting.findMany({
      where: { hidden: true },
      select: { key: true },
    });
    return rows.map((r: { key: string }) => r.key).filter(isSystemKey);
  } catch {
    // If the table isn't migrated yet (or the DB is unreachable), fail open —
    // every system stays visible rather than the dashboard going blank.
    return [];
  }
}

// The keys still visible on the homepage switcher, in SYSTEMS display order.
export async function getVisibleSystemKeys(): Promise<SystemKey[]> {
  const hidden = new Set(await getHiddenSystemKeys());
  const visible = SYSTEMS.map((s) => s.key).filter((k) => !hidden.has(k));
  // Never let the switcher end up empty (e.g. every system hidden) — that would
  // leave users with no dashboard at all. Fall back to all systems visible.
  return visible.length ? visible : SYSTEMS.map((s) => s.key);
}
