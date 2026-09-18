import Link from "next/link";

// Shared shell for the Ghostbusters reference pages (app/gb/*) — same pieces as
// JluRef / YzeRef in ecto slime green. (No homebrew hub yet, so the header
// carries only the Home link.)
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#8fce3f]";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const catBadge = "rounded border border-[var(--gb)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8fce3f]";

export function GbHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div>
        <h1 className="font-display text-3xl font-black tracking-wide">{title}</h1>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gb)] sm:text-[11px] sm:tracking-[0.35em]">{subtitle}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">← Home</Link>
      </div>
    </header>
  );
}

export function TabRow({ active }: { active: string }) {
  const tabs = [
    { href: "/gb/rules", label: "Rules" },
    { href: "/gb/talents", label: "Traits & Talents" },
    { href: "/gb/gear", label: "Gear & Goals" },
    { href: "/gb/bestiary", label: "Ghosts & Extras" },
  ];
  return (
    <div className="mb-6 flex flex-wrap gap-1.5">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href}
          className={`rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            active === t.href
              ? "border-[var(--gb)] bg-[var(--panel-2)] text-[#8fce3f]"
              : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gb)] hover:text-[var(--text)]"
          }`}>{t.label}</Link>
      ))}
    </div>
  );
}

export function SectionH({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-6 text-base font-bold uppercase tracking-[0.12em] text-[#8fce3f]">{children}</h2>;
}
