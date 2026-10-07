"use client";

// The home page's system grid. A client component for one reason: choosing a
// system is CLIENT state (systemStore -> localStorage), the same store SiteNav's
// dropdown and the dashboard's panels read, so a plain <Link href="/dashboard">
// would land you on whatever system was already stored rather than the one you
// just clicked.
//
// No focus styling: nothing in this codebase defines any (there is not one
// focus-visible rule in app/ or components/, and none in globals.css), and these are
// native <button>s, so the browser's own ring already works. Adding a focus
// treatment to this one page would make it the odd one out; it is worth doing
// site-wide or not at all.
//
// It sets the system exactly the way SiteNav's chooseSystem does — setSystem, then
// navigate — so the two can't drift. The view is deliberately NOT touched: if you
// were last looking at Adventures, picking a system keeps you on Adventures, which
// is the behaviour the dashboard itself was just fixed to have.

import { useRouter } from "next/navigation";
import { SYSTEMS, setSystem, type SystemKey } from "./systemStore";

export default function HomeSystems({ hiddenKeys }: { hiddenKeys: SystemKey[] }) {
  const router = useRouter();
  // Admin-hidden systems are left out, the same filter SiteNav applies to its
  // dropdown. Falling back to the full list when everything is hidden matches
  // SiteNav too — there is always something to pick.
  const offered = SYSTEMS.filter((s) => !hiddenKeys.includes(s.key));
  const list = offered.length ? offered : SYSTEMS;

  function open(key: SystemKey) {
    setSystem(key);
    router.push("/dashboard");
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {list.map((s) => (
        <li key={s.key}>
          {/* Each tile wears its own system's accent — the one place on this page
              where per-system colour belongs, and what makes the grid scannable
              rather than fourteen identical boxes. The accent drives the left rule
              and the hover border; the ground stays the app's own. */}
          <button
            type="button"
            onClick={() => open(s.key)}
            style={{ ["--tile" as string]: s.accent }}
            className="group flex w-full items-center gap-3 rounded-lg border border-[var(--border)] border-l-[3px] border-l-[var(--tile)] bg-[var(--panel)] px-4 py-4 text-left transition-colors hover:border-[var(--tile)] hover:bg-[var(--panel-2)]"
          >
            <span className="min-w-0 flex-1">
              <span className="font-display block truncate text-[15px] font-black tracking-wide text-[var(--text)]">
                {s.name}
              </span>
              <span className="font-label mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors group-hover:text-[var(--tile)]">
                {s.short}
              </span>
            </span>
            <span aria-hidden className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--tile)]">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
