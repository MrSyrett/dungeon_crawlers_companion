import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DccOptions from "@/components/DccOptions";

export const dynamic = "force-dynamic";

export default async function DccOptionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Options</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
            Deities · Debuffs · Buffs · Experiences · Backgrounds
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <DccOptions />
    </div>
  );
}
