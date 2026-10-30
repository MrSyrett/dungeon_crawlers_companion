// Which game system a homebrew type belongs to, and the campaigns it may be
// shared with. Client-safe (no prisma) so the editors can filter their share
// lists with the same rule the API enforces: a homebrew entry can only be shared
// with campaigns that run its system — nothing else could use it.
const PREFIX_SYSTEM: Record<string, string> = {
  dcc: "DCC", dnd: "DND", nimble: "NIM", sw: "SW", ace: "ACE", kob: "KOB", d62e: "D62E",
  icrpg: "ICRPG", co: "CO", yze: "YZE", twd: "TWD", myz: "MYZ", vae: "VAE", lotr: "LOTR",
  db: "DB", pb: "PB", mmrpg: "MMRPG",
};

/** The SystemKey a homebrew type belongs to. Bare types (spell, gear, monster…) are Shadowdark's. */
export function hbSystem(type: string): string {
  const t = String(type || "");
  const i = t.indexOf("-");
  if (i < 0) return "SD";
  return PREFIX_SYSTEM[t.slice(0, i)] || "SD";
}

type WithSystem = { id: string; system?: string | null };
/** Only the campaigns running this homebrew type's system. */
export function campaignsFor<T extends WithSystem>(type: string, campaigns: readonly T[]): T[] {
  const sys = hbSystem(type);
  return campaigns.filter((c) => c.system === sys);
}
