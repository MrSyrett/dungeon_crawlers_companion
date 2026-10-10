"use client";

import Link from "next/link";
import { useEffect } from "react";

// Route-level error boundary. Before this, a render/load error inside the app
// dropped you on Next's bare default screen — alarming, and with no way back.
// This keeps it in-world and, more importantly, reassuring: a sheet's working
// copy lives in the browser (it is restored on the next load), so an error here
// hasn't lost your character. `reset()` re-renders the segment without a full
// navigation; Reload is the heavier hammer for when that isn't enough.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the console for anyone debugging; the digest ties it to the
    // server log for an error thrown during a server render.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-20 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
        The dice betray you
      </p>
      <h1 className="font-display mt-3 text-3xl font-black tracking-wide text-[var(--sys,var(--gold))]">
        Something went sideways.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">
        This page hit a snag. Any sheet you were editing is kept in your browser, so your work is
        safe — try again, or head back and come at it fresh.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded border border-[var(--sys,var(--gold))] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--sys,var(--gold))] transition-colors hover:bg-[var(--panel-2)]"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded border border-[var(--border)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--muted)] hover:text-[var(--text)]"
        >
          Reload
        </button>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--muted)] hover:text-[var(--text)]"
        >
          Back to your party
        </Link>
      </div>
    </main>
  );
}
