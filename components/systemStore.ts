// Shared client-side store for the selected game system (Shadowdark / DCC).
// Kept in localStorage and surfaced via useSyncExternalStore so the header
// toggle and the dashboard tab panels stay in step — including across browser
// tabs via the storage event. Both SystemToggle and SystemTabs read this one
// store, so the toggle can live in the header while the panels live below.

export type SystemKey = "SD" | "DCC";

export const SYSTEMS: { key: SystemKey; name: string; short: string; accent: string }[] = [
  { key: "SD", name: "Shadowdark", short: "Shadowdark", accent: "var(--gold)" },
  { key: "DCC", name: "Dungeon Crawler Carl", short: "Crawler Carl", accent: "var(--red)" },
];

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
    return window.localStorage.getItem(STORAGE_KEY) === "DCC" ? "DCC" : "SD";
  } catch {
    return "SD"; // private mode / storage disabled
  }
}

// The server always renders Shadowdark; the client swaps to the saved choice
// after hydration.
export function getSystemServerSnapshot(): SystemKey {
  return "SD";
}

export function setSystem(key: SystemKey): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* ignore — the toggle still works for this page view */
  }
  listeners.forEach((l) => l());
}
