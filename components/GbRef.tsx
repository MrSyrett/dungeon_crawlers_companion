import PageHeader from "./PageHeader";

// Shared shell for the Ghostbusters reference pages (app/gb/*) — same pieces as
// JluRef / YzeRef in ecto slime green. (No homebrew hub yet, so the header
// carries only the Home link.)
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[#8fce3f]";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const catBadge = "rounded border border-[var(--gb)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8fce3f]";

export function GbHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return <PageHeader title={title} subtitle={subtitle} />;
}

export function TabRow({ active: _active }: { active: string }) {
  // The site navbar's Compendium menu already lists these pages (and the old
  // "Rules" tab here pointed at a route that doesn't exist → 404). Render nothing;
  // kept exported so the pages that call it keep compiling.
  return null;
}

export function SectionH({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-6 text-base font-bold uppercase tracking-[0.12em] text-[#8fce3f]">{children}</h2>;
}
