import Link from "next/link";

// The site-wide 404. There was none before, so a dead link dropped users on
// Next's bare default. Kept in-world and short: a failed search roll, and the
// way back. The heading takes the selected system's accent (--sys).
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-20 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Natural 1</p>
      <h1 className="font-display mt-3 text-3xl font-black tracking-wide text-[var(--sys,var(--gold))]">
        You search the room&hellip; nothing.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">
        This page isn&apos;t here. It may have moved, been deleted, or never existed in this universe.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="rounded border border-[var(--sys,var(--gold))] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--sys,var(--gold))] transition-colors hover:bg-[var(--panel-2)]"
        >
          Back to your party
        </Link>
        <Link
          href="/rules"
          className="rounded border border-[var(--border)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--muted)] hover:text-[var(--text)]"
        >
          Rulebooks
        </Link>
      </div>
    </main>
  );
}
