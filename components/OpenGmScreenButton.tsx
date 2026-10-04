"use client";

import { useState } from "react";

// "Open GM Screen" for a campaign card: lands the GM on the GM Screen with THIS
// campaign already linked. Reuses the GM Screen's own switching contract —
// POST /api/gm-screen marks the campaign's board last-used (creating an empty
// linked board if none exists), and the `dd-activate-campaign` sessionStorage
// stash makes the loaded page apply the link on boot (lib/gm-screen.ts
// activatePending). /gm-screen is a route handler (standalone HTML), so this is
// a full navigation, never a <Link>.
export default function OpenGmScreenButton({
  campaign,
  className,
}: {
  campaign: { id: string; name: string; code?: string | null; system?: string | null; vttUrl?: string | null };
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  async function go() {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/gm-screen", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ campaign }),
      }).catch(() => {});
      try { sessionStorage.setItem("dd-activate-campaign", JSON.stringify(campaign)); } catch { /* ignore */ }
    } finally {
      window.location.href = "/gm-screen";
    }
  }
  return (
    <button type="button" onClick={go} disabled={busy} className={className} title="Open the GM Screen linked to this campaign">
      {busy ? "Opening…" : "Open GM Screen"}
    </button>
  );
}
