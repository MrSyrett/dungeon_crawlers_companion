import Link from "next/link";

// Shared top nav for the admin pages. Renders the three admin sections as
// toggle buttons (the current one highlighted) plus a back link to the
// dashboard, so you can move between Members / Sounds / Rulebooks or head home
// from any admin page.
const SECTIONS = [
  { key: "users", href: "/admin/users", label: "Members" },
  { key: "sounds", href: "/admin/sounds", label: "Sounds" },
  { key: "rulebooks", href: "/admin/rulebooks", label: "Rulebooks" },
] as const;

const base =
  "rounded border px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] sm:px-3 sm:py-1.5 sm:text-[11px]";
const inactive =
  `${base} border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]`;
const activeCls = `${base} border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]`;

export function AdminNav({ active }: { active: "users" | "sounds" | "rulebooks" }) {
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
      <span className="mx-1 hidden h-5 w-px bg-[var(--border)] sm:inline-block" />
      <Link href="/dashboard" className={inactive}>
        ← Dashboard
      </Link>
    </nav>
  );
}
