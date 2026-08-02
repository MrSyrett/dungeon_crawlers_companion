"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import type { ResetState } from "@/app/actions/password-reset";

type Props = {
  token: string;
  valid: boolean;
  action: (state: ResetState, formData: FormData) => Promise<ResetState>;
};

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Image
            src="/logo-white.png"
            alt=""
            width={128}
            height={128}
            priority
            className="mx-auto mb-5 h-28 w-28"
          />
          <h1 className="font-display text-4xl font-black tracking-wide">Dungeon Crawler&rsquo;s Companion</h1>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">
            TTRPG Digital Toolkit
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}

export function ResetPasswordForm({ token, valid, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  // Invalid or expired link — don't even show the form.
  if (!valid) {
    return (
      <Shell>
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7">
          <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Link expired</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            This reset link is invalid or has already been used. Reset links are good for one hour —
            request a fresh one to continue.
          </p>
          <Link
            href="/forgot-password"
            className="mt-1 rounded bg-[var(--gold)] px-4 py-2.5 text-center text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110"
          >
            Request a new link
          </Link>
        </div>
      </Shell>
    );
  }

  // Success — password changed.
  if (state.done) {
    return (
      <Shell>
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7">
          <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Password updated</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Your password has been changed and you&rsquo;ve been signed out everywhere. Sign in with your
            new password to continue.
          </p>
          <Link
            href="/login"
            className="mt-1 rounded bg-[var(--gold)] px-4 py-2.5 text-center text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110"
          >
            Sign in
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <form
        action={formAction}
        className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7"
      >
        <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Choose a new password</h2>

        {/* The token rides along so the server action can authorize the change. */}
        <input type="hidden" name="token" value={token} />

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
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Confirm password</span>
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
    </Shell>
  );
}
