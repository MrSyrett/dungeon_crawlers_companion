import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import TokenMaker from "@/components/TokenMaker";

export const metadata = {
  title: "Token Maker — Dungeon Crawler's Companion",
};

export default async function TokenMakerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Token Maker</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Round VTT Tokens
          </p>
        </div>
        <Link
          href="/dashboard"
          className="min-h-11 shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          Dashboard
        </Link>
      </header>

      <TokenMaker />
    </div>
  );
}
