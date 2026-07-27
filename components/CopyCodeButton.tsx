"use client";

import { useState } from "react";

/**
 * A compact copy-to-clipboard icon button that sits next to the campaign join
 * code. Swaps to a check mark for a beat after copying, and falls back to a
 * plain success flash if the clipboard API is blocked (insecure context or a
 * denied permission) so it still gives feedback rather than silently failing.
 */
export default function CopyCodeButton({ value, label = "code" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard unavailable — nothing more we can do here, but still flash
      // so the click registers; the code is visible right beside the button.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? "Copied!" : `Copy ${label}`}
      aria-label={copied ? "Copied" : `Copy ${label}`}
      className="inline-flex shrink-0 items-center justify-center rounded border border-[var(--border)] p-1 text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      {copied ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}
