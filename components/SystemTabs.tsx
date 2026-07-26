"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { subscribeSystem, getSystemSnapshot, getSystemServerSnapshot } from "./systemStore";

/**
 * Renders one game system's dashboard at a time. The Shadowdark / DCC switch
 * itself lives in the header (SystemToggle); this component reads the same
 * shared store to pick which nav links and which panel to show.
 *
 * The inactive system is unmounted rather than hidden with CSS, so its forms
 * can't be submitted from an invisible panel. Both systems' content is rendered
 * on the server and passed in, keeping Prisma queries and server actions server-side.
 */
export default function SystemTabs({
  shadowdark,
  dcc,
  nav,
  sdNav,
}: {
  shadowdark: ReactNode;
  dcc: ReactNode;
  /** Links shown on both tabs. */
  nav?: ReactNode;
  /** Shadowdark-only links, shown ahead of `nav` on that tab. */
  sdNav?: ReactNode;
}) {
  const active = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);

  return (
    <>
      {/* The toolbar now owns the full width (the toggle moved to the header),
          so the reference links wrap freely instead of running off the edge. */}
      {nav || sdNav ? (
        <nav className="mb-8 flex flex-wrap justify-end gap-2 border-b border-[var(--border)] pb-6">
          {active === "SD" ? sdNav : null}
          {nav}
        </nav>
      ) : null}

      <div role="tabpanel">{active === "SD" ? shadowdark : dcc}</div>
    </>
  );
}
