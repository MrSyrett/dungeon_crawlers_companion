"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type SystemKey = "SD" | "DCC";

const SYSTEMS: { key: SystemKey; name: string; short: string; accent: string }[] = [
  { key: "SD", name: "Shadowdark", short: "Shadowdark", accent: "var(--gold)" },
  { key: "DCC", name: "Dungeon Crawler Carl", short: "Crawler Carl", accent: "var(--red)" },
];

const STORAGE_KEY = "dcw_system";

// The chosen system is kept in localStorage and read through
// useSyncExternalStore: the server always renders Shadowdark, the client swaps
// to the saved choice after hydration, and other tabs stay in step via the
// storage event. (A useEffect + setState would do the same but trips
// react-hooks/set-state-in-effect.)
const listeners = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): SystemKey {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "DCC" ? "DCC" : "SD";
  } catch {
    return "SD"; // private mode / storage disabled
  }
}

function getServerSnapshot(): SystemKey {
  return "SD"; // Shadowdark is the default
}

function setSystem(key: SystemKey): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* ignore — the toggle still works for this page view */
  }
  listeners.forEach((l) => l());
}

/**
 * Switches the dashboard between the two game systems. Only the toggle lives on
 * the client — both systems' content is rendered on the server and passed in,
 * so the Prisma queries and server-action forms inside stay server-side.
 *
 * The inactive system is unmounted rather than hidden with CSS, so its forms
 * can't be submitted from an invisible panel.
 */
export default function SystemTabs({
  shadowdark,
  dcc,
  nav,
  sdNav,
}: {
  shadowdark: ReactNode;
  dcc: ReactNode;
  /** Links shown beside the toggle on both tabs. */
  nav?: ReactNode;
  /** Shadowdark-only links, shown ahead of `nav` on that tab. */
  sdNav?: ReactNode;
}) {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <>
      {/* Stacked on mobile, a single toolbar row from md up so the toggle and
          the reference links don't each take a full-width band. */}
      <div className="mb-8 flex flex-col gap-3 border-b border-[var(--border)] pb-6 md:flex-row md:items-center md:justify-between md:gap-4">
        <div
          role="tablist"
          aria-label="Game system"
          className="flex gap-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1.5 md:shrink-0"
        >
          {SYSTEMS.map((s) => {
            const on = active === s.key;
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={on}
                onClick={() => setSystem(s.key)}
                className={`flex-1 rounded px-4 py-3 text-[13px] font-bold uppercase tracking-[0.15em] transition-colors sm:py-2.5 sm:text-[11px] md:flex-none ${
                  on ? "bg-[var(--panel-2)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
                style={on ? { color: s.accent, boxShadow: `inset 0 0 0 1px ${s.accent}` } : undefined}
              >
                <span className="hidden sm:inline">{s.name}</span>
                <span className="sm:hidden">{s.short}</span>
              </button>
            );
          })}
        </div>

        {/* One wrapping row: the Shadowdark-only links lead, then the shared ones. */}
        {nav || sdNav ? (
          <nav className="flex flex-wrap gap-2 md:justify-end lg:flex-nowrap">
            {active === "SD" ? sdNav : null}
            {nav}
          </nav>
        ) : null}
      </div>

      <div role="tabpanel">{active === "SD" ? shadowdark : dcc}</div>
    </>
  );
}
