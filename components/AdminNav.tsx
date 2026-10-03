import Link from "next/link";

// Shared top nav for the admin pages. Renders the admin sections as toggle
// buttons (the current one highlighted), so you can move between
// Members / Campaigns / Sounds / Rulebooks / Systems from any admin page.
const SECTIONS = [
  { key: "users", href: "/admin/users", label: "Members" },
  { key: "campaigns", href: "/admin/campaigns", label: "Campaigns" },
  { key: "sounds", href: "/admin/sounds", label: "Sounds" },
  { key: "rulebooks", href: "/admin/rulebooks", label: "Rulebooks" },
  { key: "systems", href: "/admin/systems", label: "Systems" },
] as const;

const base =
  "rounded border px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] sm:px-3 sm:py-1.5 sm:text-[11px]";
const inactive =
  `${base} border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]`;
const activeCls = `${base} border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]`;

export function AdminNav({
  active,
}: {
  active: "users" | "campaigns" | "sounds" | "rulebooks" | "systems";
}) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {SECTIONS.map((s) => (
        <Link
          key={s.key}
          href={s.href}
          aria-current={s.key === active ? "page" : undefined}
          className={s.key === active ? activeCls : inactive}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
