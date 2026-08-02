"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import type { ForgotState } from "@/app/actions/password-reset";

type Props = {
  action: (state: ForgotState, formData: FormData) => Promise<ForgotState>;
};

export function ForgotPasswordForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

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

        {state.sent ? (
          <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7">
            <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Check your email</h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              If an account exists for that email, we&rsquo;ve sent a link to reset your password. It&rsquo;s
              good for one hour. Don&rsquo;t forget to check your spam folder.
            </p>
            <Link
              href="/login"
              className="mt-1 rounded bg-[var(--gold)] px-4 py-2.5 text-center text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form
            action={formAction}
            className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7"
          >
            <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Reset password</h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Enter the email you sign in with and we&rsquo;ll send you a link to choose a new password.
            </p>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Email</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
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
              {pending ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          Remembered it?{" "}
          <Link href="/login" className="text-[var(--gold)] hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
