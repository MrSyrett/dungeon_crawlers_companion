import Link from "next/link";

// Shared shell for the Justice League Unlimited reference pages (app/jlu/*) —
// same pieces as YzeRef / IcrpgRef in the JLU heroic blue. (Homebrew hub is a
// later increment, so the header carries only the Home link for now.)
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#5b8dfb]";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const catBadge = "rounded border border-[var(--jlu)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#5b8dfb]";

export function JluHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div>
        <h1 className="font-display text-3xl font-black tracking-wide">{title}</h1>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--jlu)] sm:text-[11px] sm:tracking-[0.35em]">{subtitle}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">← Home</Link>
      </div>
    </header>
  );
}

export function TabRow({ active }: { active: string }) {
  const tabs = [
    { href: "/jlu/powers", label: "Powers" },
    { href: "/jlu/origins", label: "Origins & Archetypes" },
    { href: "/jlu/gear", label: "Gear & Traits" },
    { href: "/jlu/bestiary", label: "Bestiary" },
    { href: "/jlu/rules", label: "Rules" },
  ];
  return (
    <div className="mb-6 flex flex-wrap gap-1.5">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href}
          className={`rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            active === t.href
              ? "border-[var(--jlu)] bg-[var(--panel-2)] text-[#5b8dfb]"
              : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--jlu)] hover:text-[var(--text)]"
          }`}>{t.label}</Link>
      ))}
    </div>
  );
}

export function SectionH({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-6 text-base font-bold uppercase tracking-[0.12em] text-[#5b8dfb]">{children}</h2>;
}
