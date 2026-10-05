import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { changePassword } from "@/app/actions/change-password";
import { logout } from "@/app/actions/auth";
import { createVttToken, revokeVttToken } from "@/app/actions/vtt";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { ConfirmButton } from "@/components/ConfirmButton";
import CopyField from "@/components/CopyField";
import ThemePreference from "@/components/ThemePreference";

// The one place for everything that is about YOU rather than about a game: who
// you're signed in as, the light/dark preference that drives every sheet, your
// Owlbear Rodeo setup, your password, and the way out.
//
// It exists so those stop being scattered — sign-out lived in the navbar, the
// theme switch lived inside each character sheet's own menu (a global setting
// hidden in a per-document menu, repeated fourteen times), and this page used
// to be nothing but the password form. The navbar and the mini-bar both point
// here now.
//
// Owlbear used to have a page of its own at /vtt, with install instructions and
// a list of per-device access codes. It is the backup tabletop rather than the
// daily one, so it is three rows here instead: the two install links and one
// access code. That page is gone; its route handlers (/vtt/gm-screen and
// /vtt/sheet/[id], which the extension itself calls) are not.

// This page renders an access code, so it must never be cached or prerendered.
// getCurrentUser() reads cookies and would force that anyway; it is spelled out
// because the reason here is the secret, not the session.
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const admin = isAdminEmail(user.email);

  // One code at a time. Older accounts may hold several (codes were per-device
  // before), so this takes the newest and Revoke clears all of them — see
  // revokeVttToken.
  const code = await prisma.vttToken.findFirst({
    where: { userId: user.id, revokedAt: null },
    orderBy: { createdAt: "desc" },
    select: { token: true, prefix: true },
  });

  const subhead = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text)]";
  const accentBtn =
    "rounded border border-[var(--accent)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] hover:bg-[var(--panel-2)]";
  const quietBtn =
    "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:border-[var(--red)] hover:text-[var(--red)]";
  const revokeMsg = "Revoke this access code? Any tabletop using it will stop working.";

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
          <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            Owlbear Rodeo
          </h2>

          <div className="flex flex-col gap-6">
            {/* Install links. CopyField with `absolute` prefixes the current
                origin on the client, because the app runs on more than one
                (localhost, previews, production) and a hardcoded origin would
                hand out an install link pointing at the wrong place. */}
            <div>
              <h3 className={subhead}>Character Sheets</h3>
              <CopyField value="/obr/manifest.json" absolute />
            </div>

            <div>
              {/* The Universal VTT map importer was folded into this extension,
                  so there is no separate Map Importer link any more. */}
              <h3 className={subhead}>Table Tools</h3>
              <CopyField value="/obr/party/manifest.json" absolute />
            </div>

            <div>
              <h3 className={subhead}>Access Code</h3>
              {!code ? (
                <form action={createVttToken} className="mt-2">
                  <button className={accentBtn}>Generate code</button>
                </form>
              ) : code.token ? (
                <>
                  <CopyField value={code.token} />
                  <form action={revokeVttToken} className="mt-3">
                    <ConfirmButton message={revokeMsg} className={quietBtn}>
                      Revoke
                    </ConfirmButton>
                  </form>
                </>
              ) : (
                <>
                  {/* A code from before the plain value was stored. Only its hash
                      exists, so it can never be shown again — revoking is the
                      only way back to a copyable one. */}
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
                    {code.prefix}… — made before codes were stored, so it can&rsquo;t be shown.
                    Revoke it to generate a new one.
                  </p>
                  <form action={revokeVttToken} className="mt-3">
                    <ConfirmButton message={revokeMsg} className={quietBtn}>
                      Revoke
                    </ConfirmButton>
                  </form>
                </>
              )}
            </div>
          </div>
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
