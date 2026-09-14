import Link from "next/link";

// Shared shell for the DarkSpace reference pages (app/darkspace/*). Mirrors the
// other systems' reference shells (IcrpgRef / D62eRef) in the DarkSpace cyan
// accent: a header with "My Homebrew" + "← Home" links, plus card/badge classes.

const ACCENT = "#24c3d6";

export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#24c3d6]";
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const accentBadge = "rounded border border-[var(--darkspace)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#24c3d6]";

export function DarkSpaceHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div>
        <h1 className="font-display text-3xl font-black tracking-wide">{title}</h1>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--darkspace)] sm:text-[11px] sm:tracking-[0.35em]">{subtitle}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link href="/dashboard" className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]">← Home</Link>
      </div>
    </header>
  );
}

// Sub-navigation across the DarkSpace reference pages.
const REF_TABS: { href: string; label: string }[] = [
  { href: "/darkspace/archetypes", label: "Archetypes" },
  { href: "/darkspace/traits", label: "Traits" },
  { href: "/darkspace/backgrounds", label: "Backgrounds" },
  { href: "/darkspace/powers", label: "Powers" },
  { href: "/darkspace/gear", label: "Gear" },
  { href: "/darkspace/bestiary", label: "Bestiary" },
];

export function DarkSpaceTabs({ active }: { active: string }) {
  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {REF_TABS.map((t) => {
        const on = t.href === active;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={
              "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors " +
              (on
                ? "border-[var(--darkspace)] bg-[var(--panel-2)] text-[#24c3d6]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--darkspace)] hover:text-[var(--text)]")
            }
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function RefShell({
  title, subtitle, active, count, children,
}: {
  title: string; subtitle: string; active: string; count?: string; children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6" style={{ ["--accent" as string]: ACCENT }}>
      <DarkSpaceHeader title={title} subtitle={subtitle} />
      <DarkSpaceTabs active={active} />
      {count ? <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{count}</p> : null}
      {children}
    </main>
  );
}
