import PageHeader from "./PageHeader";

// Shared shell for the Ghostbusters reference pages (app/gb/*) — same pieces as
// JluRef / YzeRef in ecto slime green. (No homebrew hub yet, so the header
// carries only the Home link.)
export const cardCls = "rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4";
export const nameCls = "text-base font-bold uppercase tracking-[0.12em] text-[var(--sys-link)]";
export const badge = "rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]";
export const catBadge = "rounded border border-[var(--gb)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--sys-link)]";

export type Query = Record<string, string | undefined>;
export type RawQuery = Record<string, string | string[] | undefined>;
export const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

export function withParams(base: string, current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `${base}?${s}` : base;
}

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
  return <h2 className="mb-3 mt-6 text-base font-bold uppercase tracking-[0.12em]">{children}</h2>;
}
