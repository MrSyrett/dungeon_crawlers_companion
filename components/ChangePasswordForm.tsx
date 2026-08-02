"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ChangePasswordState } from "@/app/actions/change-password";

type Props = {
  email: string;
  action: (state: ChangePasswordState, formData: FormData) => Promise<ChangePasswordState>;
};

export function ChangePasswordForm({ email, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-black tracking-wide">Account</h1>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            {email}
          </p>
        </div>

        {state.done ? (
          <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7">
            <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Password changed</h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Your password has been updated. Any other devices that were signed in have been signed
              out; you&rsquo;re still signed in here.
            </p>
            <Link
              href="/dashboard"
              className="mt-1 rounded bg-[var(--gold)] px-4 py-2.5 text-center text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110"
            >
              Back to dashboard
            </Link>
          </div>
        ) : (
          <form
            action={formAction}
            className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7"
          >
            <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Change password</h2>

            {/* Username hint helps password managers associate the change. */}
            <input type="hidden" name="username" autoComplete="username" value={email} readOnly />

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Current password</span>
              <input
                type="password"
                name="current"
                required
                autoComplete="current-password"
                className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-[15px] outline-none focus:border-[var(--gold)]"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">New password</span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-[15px] outline-none focus:border-[var(--gold)]"
              />
              <span className="text-[11px] text-[var(--muted)]">At least 8 characters.</span>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Confirm new password</span>
              <input
                type="password"
                name="confirm"
                required
                minLength={8}
                autoComplete="new-password"
                className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-[15px] outline-none focus:border-[var(--gold)]"
              />
            </label>

            {state.error && (
              <p className="rounded border border-[var(--red)]/50 bg-[var(--red)]/10 px-3 py-2 text-sm text-[#f0a8a3]">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-1 rounded bg-[var(--gold)] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Update password"}
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          <Link href="/dashboard" className="text-[var(--gold)] hover:underline">Back to dashboard</Link>
        </p>
      </div>
    </main>
  );
}
