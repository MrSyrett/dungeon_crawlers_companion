"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  SYSTEMS,
  setSystem,
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
  type SystemKey,
} from "./systemStore";

// The game-system switch (one tab per visible entry in SYSTEMS). Sits centred on
// its own row under the dashboard header and shares state with SystemTabs, which
// renders the matching panels below. `hiddenKeys` (set by the admin Systems page)
// removes systems from the switcher for everyone; if the saved selection is one
// of them, we fall back to the first visible system.
export default function SystemToggle({ hiddenKeys = [] }: { hiddenKeys?: SystemKey[] }) {
  const active = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);

  const hidden = new Set(hiddenKeys);
  const visible = SYSTEMS.filter((s) => !hidden.has(s.key));
  const list = visible.length ? visible : SYSTEMS; // never render an empty switcher
  const activeVisible = list.some((s) => s.key === active);
  const effective = activeVisible ? active : list[0].key;

  // If the saved system was hidden, persist the fallback so every reader agrees.
  useEffect(() => {
    if (!activeVisible) setSystem(effective);
  }, [activeVisible, effective]);

  return (
    <div
      role="tablist"
      aria-label="Game system"
      className="flex w-full flex-nowrap justify-center gap-0.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1 sm:w-auto sm:flex-wrap sm:gap-2 sm:p-1.5"
    >
      {list.map((s) => {
        const on = effective === s.key;
        return (
          <button
            key={s.key}
            role="tab"
            aria-selected={on}
            onClick={() => setSystem(s.key)}
            className={`flex-1 rounded px-0.5 py-2 text-[11px] tracking-[0.03em] sm:flex-initial sm:px-4 sm:text-[11px] sm:tracking-[0.15em] font-bold uppercase transition-colors ${
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
  );
}
