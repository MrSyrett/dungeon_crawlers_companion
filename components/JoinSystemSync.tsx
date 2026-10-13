"use client";

import { useEffect } from "react";
import { isSystemKey, setSystem, type SystemKey } from "@/components/systemStore";

// THE INVITE LINK SWITCHES SYSTEMS. A GM's /join/<code> link lands a player on
// the join page, which — like every app surface — is dressed in the player's
// *stored* system (SiteNav publishes data-system on <html> from the store). So a
// Shadowdark player opening a Star Wars campaign's link saw a Shadowdark-themed
// join page and a "no Shadowdark characters" feel, even though the list itself
// was already filtered to the campaign's system.
//
// The join page can't know the campaign's system from its URL (the path carries
// a code, not a system), so the path→system table in navConfig can't cover it.
// Instead the server page hands us the campaign's system and we make the switch
// the same way the header toggle does: setSystem() writes localStorage + the
// cookie and notifies the store, so SiteNav re-themes <html> live and the choice
// sticks after the player joins. A pre-paint inline script on the page itself
// (see app/join/[code]/page.tsx) sets data-system before first paint so there's
// no flash of the old theme; this effect is what persists the choice and covers
// client-side navigation to the page, where that inline script does not re-run.
export default function JoinSystemSync({ system }: { system: SystemKey }) {
  useEffect(() => {
    if (isSystemKey(system)) setSystem(system);
  }, [system]);
  return null;
}
