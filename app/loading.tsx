// Root navigation fallback. Every page in the app renders dynamically (cookie
// auth + live DB reads), so without a Suspense boundary a <Link> click would sit
// on the previous page, doing nothing visible, until the server finished the
// whole render — which reads as "the site is frozen / nothing happened."
//
// This boundary lets the layout shell paint instantly and shows a light spinner
// while the destination streams in, so navigation always feels responsive. It
// only appears during route transitions that suspend, never on mutations (a
// delete re-renders in place without tripping this). The ring takes the
// selected system's accent (--sys) so even the wait is "in character".
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--sys,var(--gold))]" />
    </div>
  );
}
