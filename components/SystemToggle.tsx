"use client";

import { useSyncExternalStore } from "react";
import {
  SYSTEMS,
  setSystem,
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
} from "./systemStore";

// The game-system switch (one tab per entry in SYSTEMS). Sits centred on its
// own row under the dashboard header and shares state with SystemTabs, which
// renders the matching panels below.
export default function SystemToggle() {
  const active = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);

  return (
    <div
      role="tablist"
      aria-label="Game system"
      className="flex flex-nowrap justify-center gap-0.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-1 sm:flex-wrap sm:gap-2 sm:p-1.5"
    >
      {SYSTEMS.map((s) => {
        const on = active === s.key;
        return (
          <button
            key={s.key}
            role="tab"
            aria-selected={on}
            onClick={() => setSystem(s.key)}
            className={`rounded px-1.5 py-2 text-[10px] tracking-[0.04em] sm:px-4 sm:text-[11px] sm:tracking-[0.15em] font-bold uppercase transition-colors ${
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
