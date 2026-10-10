"use client";

import { useState } from "react";

/**
 * "Invite": copies this campaign's invite link (/join/<code>) to the clipboard
 * and, on phones that have it, offers the share sheet instead so the GM can
 * send it straight to the group chat. Sits beside the join code's own copy
 * button; the code is still there for anyone who'd rather read it out.
 */
export default function InviteLinkButton({ code }: { code: string }) {
  const [done, setDone] = useState<null | "copied" | "shared">(null);

  async function invite() {
    const url = `${window.location.origin}/join/${encodeURIComponent(code)}`;
    const nav = navigator as Navigator & { share?: (d: { url: string; title?: string; text?: string }) => Promise<void> };
    // The share sheet is the better fit on a phone, but it throws if the user
    // cancels — that's not an error, just no share, so fall through quietly.
    if (typeof nav.share === "function" && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await nav.share({ url, title: "Join my campaign", text: `Join my campaign on Dungeon Crawler's Companion: ${url}` });
        setDone("shared");
        setTimeout(() => setDone(null), 1600);
        return;
      } catch {
        /* cancelled or unsupported — copy instead */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this invite link", url);
    }
    setDone("copied");
    setTimeout(() => setDone(null), 1600);
  }

  return (
    <button
      type="button"
      onClick={invite}
      title={done === "copied" ? "Invite link copied" : done === "shared" ? "Shared" : "Copy an invite link for your players"}
      className="inline-flex shrink-0 items-center gap-1 rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12 19" />
      </svg>
      {done === "copied" ? "Copied" : done === "shared" ? "Sent" : "Invite"}
    </button>
  );
}
