import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { changePassword } from "@/app/actions/change-password";
import { logout } from "@/app/actions/auth";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import ThemePreference from "@/components/ThemePreference";

// The one place for everything that is about YOU rather than about a game: who
// you're signed in as, the light/dark preference that drives every sheet, your
// password, and the way out.
//
// It exists so those stop being scattered — sign-out lived in the navbar, the
// theme switch lived inside each character sheet's own menu (a global setting
// hidden in a per-document menu, repeated fourteen times), and this page used
// to be nothing but the password form. The navbar and the mini-bar both point
// here now.
export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const admin = isAdminEmail(user.email);

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-5 py-10 sm:py-14">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Signed in as
        </p>
        <h1 className="font-display mt-1.5 break-words text-3xl font-bold tracking-tight">{user.email}</h1>
        {admin ? (
          <Link
            href="/admin/users"
            className="mt-3 inline-block rounded border border-[var(--accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] hover:bg-[var(--panel-2)]"
          >
            Admin
          </Link>
        ) : null}
      </header>

      <div className="flex flex-col gap-5">
        <section className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Appearance</h2>
          <ThemePreference />
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Password</h2>
          <ChangePasswordForm email={user.email} action={changePassword} />
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Session</h2>
          <p className="mb-4 text-[12px] leading-relaxed text-[var(--muted)]">
            Signs you out on this device only. Changing your password above signs out every other
            device.
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="rounded border border-[var(--border)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:border-[var(--red)] hover:text-[var(--text)]"
            >
              Sign out
            </button>
          </form>
        </section>
      </div>

      <p className="mt-7 text-center text-sm text-[var(--muted)]">
        <Link href="/dashboard" className="text-[var(--accent)] hover:underline">
          Back to dashboard
        </Link>
      </p>
    </main>
  );
}
