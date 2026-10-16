import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { visibleRulebooks, prettyName } from "@/lib/rulebooks";
import RulebookGrid from "@/components/RulebookGrid";
import RulebookReader from "@/components/RulebookReader";
import { readSystemCookie } from "@/lib/system-cookie";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

// THE LIBRARY — every system's PDFs, shelved by the folder they sit in
// (protected/rulebooks/<System>/<Core Rules|Expansions|Adventures>/), filtered to
// the selected system and grouped into those three sections. Opening a book
// (?book=<file>) hands off to the shared reader. Formerly /rules ("Rulebooks"),
// which now redirects here.
export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Only the books this user is allowed to see (with their system + category —
  // the grid below hides other systems' books behind the system toggle).
  const books = await visibleRulebooks({ id: user.id, email: user.email });
  const { book } = await searchParams;

  // Only ever serve a file we actually listed — never trust the query string.
  // Deliberately checked against ALL visible books, not the system-filtered
  // list: the tag hides cards, it doesn't revoke access to a direct link.
  const selected = book && books.some((b) => b.file === book) ? book : null;

  if (selected) {
    // The shared, site-wide reader (the SAME component the GM Screen uses) —
    // tab bar across all the user's books, chapters panel, snap paging,
    // pinch/ctrl zoom, drag-to-pan, per-book page memory. Hand it the whole
    // accessible book list so the tabs match the GM Screen.
    const list = books.map((b) => ({
      file: b.file,
      title: prettyName(b.file),
      url: `/api/rulebooks/${encodeURIComponent(b.file)}`,
      system: b.system,
    }));
    return <RulebookReader books={list} active={selected} initialSystem={await readSystemCookie()} />;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader title="Library" subtitle="Core rules · Expansions · Adventures" />
      {books.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">The Library is empty</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Drop a PDF into{" "}
            <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
              protected/rulebooks/&lt;System&gt;/&lt;Core Rules | Expansions | Adventures&gt;/
            </code>{" "}
            and it shows up here automatically, on that system&apos;s shelf and in that section. The
            filename becomes the title, so{" "}
            <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
              Shadowdark/Core Rules/shadowdark-core-rules.pdf
            </code>{" "}
            appears as &ldquo;Shadowdark Core Rules&rdquo; under Shadowdark&apos;s Core Rules.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Use your own purchased copies — the books aren&apos;t bundled with the app.
          </p>
        </div>
      ) : (
        <RulebookGrid
          books={books.map((b) => ({ file: b.file, title: prettyName(b.file), system: b.system, category: b.category }))}
          initialSystem={await readSystemCookie()}
        />
      )}
    </div>
  );
}
