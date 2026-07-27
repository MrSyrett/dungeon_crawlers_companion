import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { listRulebookFiles, prettyName } from "@/lib/rulebooks";
import { ConfirmButton } from "@/components/ConfirmButton";
import {
  setRulebookEveryone,
  grantRulebookAccess,
  revokeRulebookAccess,
} from "@/app/actions/rulebooks";

export const dynamic = "force-dynamic";

export default async function AdminRulebooksPage({
  searchParams,
}: {
  searchParams: Promise<{ nouser?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/rules"); // not an admin — nothing to see

  const { nouser } = await searchParams;

  const files = await listRulebookFiles();
  const [rulebooks, grants] = await Promise.all([
    prisma.rulebook.findMany({ select: { file: true, everyone: true } }),
    prisma.rulebookAccess.findMany({
      select: { file: true, userId: true, user: { select: { email: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const everyoneFor = new Map(rulebooks.map((r) => [r.file, r.everyone]));
  const grantsFor = new Map<string, { userId: string; email: string }[]>();
  for (const g of grants) {
    const list = grantsFor.get(g.file) ?? [];
    list.push({ userId: g.userId, email: g.user.email });
    grantsFor.set(g.file, list);
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Rulebook access</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Admin · who can read each PDF
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/users"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            Members
          </Link>
          <Link
            href="/rules"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            ← Rulebooks
          </Link>
        </div>
      </header>

      <p className="mb-6 text-[13px] leading-relaxed text-[var(--muted)]">
        Each PDF is <span className="text-[var(--text)]">private by default</span> — only admins can
        read it until you either open it to everyone or grant specific accounts below. Grant by the
        email someone signed up with; they must have an account first. Admins are set via the{" "}
        <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
          ADMIN_EMAILS
        </code>{" "}
        environment variable.
      </p>

      {nouser ? (
        <div className="mb-6 rounded-lg border border-[var(--red)] bg-[var(--panel)] p-4 text-[13px] text-[#f0a8a3]">
          No account found for <span className="font-semibold">{nouser}</span>. Ask them to sign up
          first, then grant access.
        </div>
      ) : null}

      {files.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          No rulebooks found. Drop PDFs into{" "}
          <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
            protected/rulebooks/
          </code>{" "}
          and they will appear here.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {files.map((file) => {
            const everyone = everyoneFor.get(file) ?? false;
            const fileGrants = grantsFor.get(file) ?? [];
            return (
              <li
                key={file}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    {prettyName(file)}
                  </h2>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                      everyone ? "text-[#8fd19e]" : "text-[var(--muted)]"
                    }`}
                  >
                    {everyone ? "· everyone signed in" : "· private"}
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--muted)]">{file}</div>

                <form
                  action={setRulebookEveryone}
                  className="mt-3 flex items-center gap-2 border-t border-[var(--border)] pt-3"
                >
                  <input type="hidden" name="file" value={file} />
                  <label className="flex items-center gap-2 text-[13px] text-[var(--text)]">
                    <input type="checkbox" name="everyone" defaultChecked={everyone} className="h-4 w-4" />
                    Visible to everyone signed in
                  </label>
                  <button className="ml-auto shrink-0 rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
                    Save
                  </button>
                </form>

                <div className="mt-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Allowed accounts
                  </div>
                  {fileGrants.length === 0 ? (
                    <p className="mt-1 text-[12px] text-[var(--muted)]">
                      {everyone
                        ? "Open to everyone — individual grants aren't needed."
                        : "No accounts granted yet."}
                    </p>
                  ) : (
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {fileGrants.map((g) => (
                        <li
                          key={g.userId}
                          className="flex items-center justify-between gap-2 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5"
                        >
                          <span className="truncate text-[13px] text-[var(--text)]">{g.email}</span>
                          <form action={revokeRulebookAccess} className="shrink-0">
                            <input type="hidden" name="file" value={file} />
                            <input type="hidden" name="userId" value={g.userId} />
                            <ConfirmButton
                              message={`Remove ${g.email}'s access to "${prettyName(file)}"?`}
                              className="rounded border border-[var(--border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                            >
                              Remove
                            </ConfirmButton>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}

                  <form action={grantRulebookAccess} className="mt-2 flex gap-2">
                    <input type="hidden" name="file" value={file} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="friend@example.com"
                      aria-label={`Grant access to ${prettyName(file)} by email`}
                      className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
                    />
                    <button className="shrink-0 rounded border border-[var(--gold)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--panel-2)]">
                      Grant
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
