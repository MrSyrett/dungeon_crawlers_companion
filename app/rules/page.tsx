import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { visibleRulebookFiles, prettyName } from "@/lib/rulebooks";

export const dynamic = "force-dynamic";

export default async function RulesPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const isAdmin = isAdminEmail(user.email);
  // Only the books this user is allowed to see.
  const books = await visibleRulebookFiles({ id: user.id, email: user.email });
  const { book } = await searchParams;

  // Only ever serve a file we actually listed — never trust the query string
  const selected = book && books.includes(book) ? book : null;

  if (selected) {
    const src = `/api/rulebooks/${encodeURIComponent(selected)}`;
    return (
      <div className="flex h-screen flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--panel)] px-4 py-2">
          <Link
            href="/rules"
            className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]"
          >
            ← Rulebooks
          </Link>
          <span className="truncate text-sm font-bold uppercase tracking-[0.1em]">
            {prettyName(selected)}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]"
            >
              New tab
            </a>
            <a
              href={src}
              download
              className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]"
            >
              Download
            </a>
          </div>
        </header>

        {/* Browsers with a built-in PDF viewer render this inline; the rest get
            the fallback link below it. */}
        <object data={src} type="application/pdf" className="min-h-0 flex-1">
          <iframe src={src} title={prettyName(selected)} className="h-full w-full border-0" />
          <p className="p-8 text-sm text-[var(--muted)]">
            Your browser can&apos;t display PDFs inline.{" "}
            <a href={src} className="text-[var(--gold)] underline">
              Open {prettyName(selected)}
            </a>
            .
          </p>
        </object>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-10 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Rulebooks</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Reference at the table
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Link
              href="/admin/rulebooks"
              className="rounded border border-[var(--gold)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:px-3 sm:py-1.5 sm:text-[11px]"
            >
              Manage access
            </Link>
          ) : null}
          <Link
            href="/dashboard"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            ← Home
          </Link>
        </div>
      </header>

      {books.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">No rulebooks yet</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Drop a PDF into{" "}
            <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
              protected/rulebooks/
            </code>{" "}
            and it will show up here automatically. The filename becomes the title, so{" "}
            <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
              shadowdark-core-rules.pdf
            </code>{" "}
            appears as &ldquo;Shadowdark Core Rules&rdquo;.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Use your own purchased copy — the rulebooks aren&apos;t bundled with the app.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {books.map((file) => (
            <li key={file}>
              <Link
                href={`/rules?book=${encodeURIComponent(file)}`}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--panel)] px-5 py-5 transition-colors hover:border-[var(--gold)] hover:bg-[var(--panel-2)]"
              >
                <div className="min-w-0">
                  <div className="truncate text-base font-bold uppercase tracking-[0.12em]">
                    {prettyName(file)}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--muted)]">PDF</div>
                </div>
                <span className="ml-6 shrink-0 text-xl text-[var(--muted)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
