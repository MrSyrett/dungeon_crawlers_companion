"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import {
  subscribeSystem,
  getSystemSnapshot,
  getSystemServerSnapshot,
  type SystemKey,
} from "./systemStore";

/**
 * Renders one game system's dashboard at a time. The system switch itself
 * lives in the header (SystemToggle); this component reads the same shared
 * store to pick which nav links and which panel to show.
 *
 * The inactive systems are unmounted rather than hidden with CSS, so their
 * forms can't be submitted from an invisible panel. Every system's content is
 * rendered on the server and passed in, keeping Prisma queries and server
 * actions server-side.
 */
export default function SystemTabs({
  panels,
  systemNav,
  nav,
  navFor,
}: {
  /** One dashboard panel per system key. */
  panels: Partial<Record<SystemKey, ReactNode>>;
  /** Per-system links, shown ahead of `nav` on that system's tab. */
  systemNav?: Partial<Record<SystemKey, ReactNode>>;
  /** Links shown on every tab. */
  nav?: ReactNode;
  /** Per-system override of the shared `nav` (e.g. D&D drops Rulebooks — no PDFs). */
  navFor?: Partial<Record<SystemKey, ReactNode>>;
}) {
  const active = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getSystemServerSnapshot);
  const ownNav = systemNav?.[active];
  const sharedNav = navFor?.[active] ?? nav;

  return (
    <>
      {/* The toolbar owns the full width (the toggle lives in the header), so
          the reference links wrap freely instead of running off the edge. */}
      {sharedNav || ownNav ? (
        <nav className="mb-8 flex flex-wrap justify-center gap-2 border-b border-[var(--border)] pb-5">
          {ownNav}
          {sharedNav}
        </nav>
      ) : null}

      <div role="tabpanel">{panels[active] ?? null}</div>
    </>
  );
}
