import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { AdminNav } from "@/components/AdminNav";
import { SYSTEMS } from "@/components/systemStore";
import { getHiddenSystemKeys } from "@/lib/systems";
import { setSystemHidden } from "@/app/actions/systems";
import { SystemVisibilityToggle } from "@/components/SystemVisibilityToggle";

export const dynamic = "force-dynamic";

export default async function AdminSystemsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard"); // not an admin — nothing to see

  const hidden = new Set(await getHiddenSystemKeys());
  const visibleCount = SYSTEMS.length - hidden.size;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <AdminNav active="systems" />
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-black tracking-wide">Systems</h1>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
              Admin · show or hide game systems
            </p>
          </div>
          <Link
            href="/dashboard"
            className="whitespace-nowrap rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            Open dashboard ↗
          </Link>
        </div>
      </header>

      <p className="mb-6 text-[13px] leading-relaxed text-[var(--muted)]">
        Hidden systems disappear from the homepage system switcher for{" "}
        <span className="text-[var(--text)]">everyone</span> (you included). Their pages still load
        if someone has a direct link — this only controls what shows on the dashboard. You can show a
        system again at any time. At least one system always stays visible.
      </p>

      <ul className="flex flex-col gap-3">
        {SYSTEMS.map((s) => {
          const isHidden = hidden.has(s.key);
          const lastVisible = !isHidden && visibleCount <= 1; // don't let the only one be hidden
          return (
            <li
              key={s.key}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: s.accent }}
                />
                <div>
                  <div className="text-base font-bold uppercase tracking-[0.12em] text-[var(--text)]">
                    {s.name}
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                    {s.short} ·{" "}
                    <span className={isHidden ? "text-[var(--muted)]" : "text-[#8fd19e]"}>
                      {isHidden ? "Hidden" : "Visible"}
                    </span>
                  </div>
                </div>
              </div>

              <SystemVisibilityToggle
                systemKey={s.key}
                visible={!isHidden}
                disabled={lastVisible}
                action={setSystemHidden}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
