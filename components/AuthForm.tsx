"use client";

import Image from "next/image";
import { useActionState } from "react";
import Link from "next/link";
import type { AuthState } from "@/app/actions/auth";

type Props = {
  mode: "login" | "signup";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
};

export function AuthForm({ mode, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const isSignup = mode === "signup";

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

        <form action={formAction} className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-7">
          <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            {isSignup ? "Create account" : "Sign in"}
          </h2>

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

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Password</span>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-[15px] outline-none focus:border-[var(--gold)]"
            />
            {isSignup && (
              <span className="text-[11px] text-[var(--muted)]">At least 8 characters.</span>
            )}
          </label>

          {/* Forgot-password link — only on the sign-in form. */}
          {!isSignup && (
            <Link
              href="/forgot-password"
              className="-mt-1 self-end text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] transition hover:text-[var(--gold)] hover:underline"
            >
              Forgot password?
            </Link>
          )}

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
            {pending ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--gold)] hover:underline">Sign in</Link>
            </>
          ) : (
            <>
              No account yet?{" "}
              <Link href="/signup" className="text-[var(--gold)] hover:underline">Create one</Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
