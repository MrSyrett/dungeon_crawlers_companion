"use client";

import { useActionState } from "react";
import type { ChangePasswordState } from "@/app/actions/change-password";

type Props = {
  email: string;
  action: (state: ChangePasswordState, formData: FormData) => Promise<ChangePasswordState>;
};

const FIELD =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-[15px] outline-none focus:border-[var(--accent)]";
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]";

// The password section of /account. It used to BE the account page — its own
// <main>, its own title, its own back-link — so all of that moved up to the
// page and this is one section of it now.
export function ChangePasswordForm({ email, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  if (state.done) {
    return (
      <div className="flex flex-col gap-2">
        <p className="font-label text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--signal)]">
          Password changed
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Any other devices that were signed in have been signed out. You&rsquo;re still signed in
          here.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Username hint helps password managers associate the change. */}
      <input type="hidden" name="username" autoComplete="username" value={email} readOnly />

      <label className="flex flex-col gap-1.5">
        <span className={LABEL}>Current password</span>
        <input type="password" name="current" required autoComplete="current-password" className={FIELD} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={LABEL}>New password</span>
        <input type="password" name="password" required minLength={8} autoComplete="new-password" className={FIELD} />
        <span className="text-[11px] text-[var(--muted)]">At least 8 characters.</span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={LABEL}>Confirm new password</span>
        <input type="password" name="confirm" required minLength={8} autoComplete="new-password" className={FIELD} />
      </label>

      {state.error ? (
        <p
          role="alert"
          className="rounded border border-[var(--red)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)]"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded bg-[var(--accent)] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-[var(--bg)] transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update password"}
      </button>
    </form>
  );
}
