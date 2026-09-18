// Shared client-side store for the selected game system (Shadowdark / Dungeon
// Crawler Carl / ACE!). Kept in localStorage and surfaced via
// useSyncExternalStore so the header toggle and the dashboard tab panels stay
// in step — including across browser tabs via the storage event. SystemToggle,
// SystemTabs and RulebookGrid all read this one store.
//
// Adding a system: add its key to SystemKey and a row to SYSTEMS, register its
// tools in lib/tools.ts, give the dashboard a panel for it, and extend the
// admin rulebook "Shown on" select (lib/rulebooks.ts accepts any SystemKey).

export type SystemKey = "SD" | "DCC" | "ACE" | "KOB" | "NIM" | "SW" | "DND" | "D62E" | "ICRPG" | "CO" | "YZE" | "MMRPG" | "JLU";

// Homepage/toggle display order (the tab order the user sees).
export const SYSTEMS: { key: SystemKey; name: string; short: string; accent: string }[] = [
  { key: "SD", name: "Shadowdark", short: "SD", accent: "var(--gold)" },
  // Index Card RPG (Runehammer, Master Edition) — a rules-light unified d20
  // system: one TARGET, roll for EFFORT, five worlds.
  { key: "ICRPG", name: "Index Card RPG", short: "ICRPG", accent: "var(--icrpg)" },
  { key: "NIM", name: "Nimble", short: "NIM", accent: "var(--nimble)" },
  // Dungeons & Dragons (2024 rules): mechanics adapted from the SRD 5.2 (CC-BY)
  // plus original concise descriptions for non-SRD options.
  { key: "DND", name: "Dungeons & Dragons", short: "D&D", accent: "var(--dnd)" },
  { key: "DCC", name: "Dungeon Crawler Carl", short: "DCC", accent: "var(--red)" },
  // Kids on Bikes, with Kids on Brooms and Kids in Capes as flavors of the
  // same system (one sheet, one shelf, one tab).
  { key: "KOB", name: "Kids on Bikes", short: "KoB", accent: "var(--kob)" },
  // Candela Obscura (Darrington Press) — gaslamp horror on the Illuminated
  // Worlds engine: d6 dice pools, roles & specialties, drives & actions.
  { key: "CO", name: "Candela Obscura", short: "CO", accent: "var(--candela)" },
  { key: "ACE", name: "ACE!", short: "ACE", accent: "var(--ace)" },
  // Star Wars: The Roleplaying Game (WEG 1e, 1987) with the Rules Companion.
  { key: "SW", name: "Star Wars", short: "SW", accent: "var(--sw)" },
  // D6 System: Second Edition (Gallant Knight Games, 2024) — a genre-agnostic
  // evolution of the West End Games D6 System.
  { key: "D62E", name: "D6 System 2e", short: "D62e", accent: "var(--d62e)" },
  // Year Zero Engine (Fria Ligan) — SRD v1.0 dice-pool core: four attributes,
  // twelve skills, roll D6 pools where each 6 is a success, push at a cost.
  { key: "YZE", name: "Year Zero Engine", short: "YZE", accent: "var(--yze)" },
  { key: "MMRPG", name: "Marvel Multiverse RPG", short: "Marvel", accent: "var(--mmrpg)" },
  // Justice League Unlimited RPG (Quickstart) — DC's d20 super-hero system:
  // six attributes, a single Resolve pool, Tiers E–S, and a comic-book
  // narrative layer (Plot Points / Editorial Points / the Crisis Die).
  { key: "JLU", name: "Justice League Unlimited", short: "JLU", accent: "var(--jlu)" },
];

export const DEFAULT_SYSTEM: SystemKey = "SD";

export function isSystemKey(value: unknown): value is SystemKey {
  return SYSTEMS.some((s) => s.key === value);
}

export function systemName(key: SystemKey): string {
  return SYSTEMS.find((s) => s.key === key)?.name ?? key;
}

const STORAGE_KEY = "dcw_system";
const listeners = new Set<() => void>();

export function subscribeSystem(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function getSystemSnapshot(): SystemKey {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isSystemKey(v) ? v : DEFAULT_SYSTEM;
  } catch {
    return DEFAULT_SYSTEM; // private mode / storage disabled
  }
}

// The server always renders Shadowdark; the client swaps to the saved choice
// after hydration.
export function getSystemServerSnapshot(): SystemKey {
  return DEFAULT_SYSTEM;
}

export function setSystem(key: SystemKey): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* ignore — the toggle still works for this page view */
  }
  listeners.forEach((l) => l());
}
