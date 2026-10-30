// ─────────────────────────────────────────────────────────────────────────────
// CompendiumHomebrew — the one place a compendium (reference) page puts its
// homebrew. Placement contract, the same on every system's pages:
//
//   page header → [view tabs: ModeRow / TabBar / Tabs] → [section nav]
//     → <CompendiumHomebrew> (editor(s) for the ACTIVE view's kind(s))
//     → intro / rules text, search + filters, the reference list.
//
// It renders nothing of its own beyond the slot: consistent bottom spacing,
// stacked editors with a uniform gap, and the shells' own outer margins
// neutralised (`*:mb-0`) so every page lines up the same. Each child is a
// system's collapsible homebrew editor (accordion closed by default).
// Server-safe (no hooks), so server pages render it directly.
// ─────────────────────────────────────────────────────────────────────────────
import type { ReactNode } from "react";

export default function CompendiumHomebrew({ children }: { children: ReactNode }) {
  return (
    <section aria-label="Homebrew" data-compendium-homebrew className="mb-6 flex flex-col gap-3 *:mb-0">
      {children}
    </section>
  );
}
