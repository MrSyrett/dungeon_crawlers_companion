import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { ConfirmButton } from "@/components/ConfirmButton";
import { deleteUser } from "@/app/actions/admin-users";

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d);
}

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard"); // not an admin — nothing to see

  // Character sheets are documents whose tool is one of the character tools;
  // count those separately from boards so the roster shows real activity.
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      createdAt: true,
      _count: {
        select: { campaigns: true, documents: true, homebrew: true },
      },
    },
  });

  const total = users.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Members</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Admin · {total} registered {total === 1 ? "account" : "accounts"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/rulebooks"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            Rulebooks
          </Link>
          <Link
            href="/dashboard"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      {total === 0 ? (
        <p className="text-[14px] text-[var(--muted)]">No accounts have registered yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--panel)] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                <th className="px-4 py-3">Email</th>
                <th className="hidden px-4 py-3 sm:table-cell">Joined</th>
                <th className="hidden px-3 py-3 text-center md:table-cell" title="Campaigns owned">
                  Camps
                </th>
                <th className="hidden px-3 py-3 text-center md:table-cell" title="Character sheets and boards">
                  Docs
                </th>
                <th className="hidden px-3 py-3 text-center md:table-cell" title="Homebrew entries">
                  HB
                </th>
                <th className="px-4 py-3 text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === user.id;
                const isAdmin = isAdminEmail(u.email);
                return (
                  <tr
                    key={u.id}
                    className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--panel)]"
                  >
                    <td className="px-4 py-3">
                      <span className="break-all font-medium text-[var(--text)]">{u.email}</span>
                      {isAdmin ? (
                        <span className="ml-2 rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                          Admin
                        </span>
                      ) : null}
                      {isSelf ? (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                          · you
                        </span>
                      ) : null}
                      <span className="mt-0.5 block text-[11px] text-[var(--muted)] sm:hidden">
                        Joined {formatDate(u.createdAt)}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-[var(--muted)] sm:table-cell">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="hidden px-3 py-3 text-center text-[var(--muted)] md:table-cell">
                      {u._count.campaigns}
                    </td>
                    <td className="hidden px-3 py-3 text-center text-[var(--muted)] md:table-cell">
                      {u._count.documents}
                    </td>
                    <td className="hidden px-3 py-3 text-center text-[var(--muted)] md:table-cell">
                      {u._count.homebrew}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isSelf ? (
                        <span className="text-[11px] text-[var(--muted)]">—</span>
                      ) : (
                        <form action={deleteUser} className="inline">
                          <input type="hidden" name="id" value={u.id} />
                          <ConfirmButton
                            className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                            message={`Permanently delete ${u.email}?\n\nThis removes their account and everything they own — character sheets, campaigns, boards, and homebrew. This cannot be undone.`}
                          >
                            Delete
                          </ConfirmButton>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
        Deleting an account is permanent and cascades to everything the member owns. Admins are
        set through the <code className="text-[var(--text)]">ADMIN_EMAILS</code> environment
        variable and can&rsquo;t be removed here.
      </p>
    </div>
  );
}
