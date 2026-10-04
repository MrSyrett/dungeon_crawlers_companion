// The ONE page header used by every compendium / reference / tool page.
//
// Before this, 31 pages each drew their own header — some with a "← Home"
// button and a "My Homebrew" button (both now redundant under the site-wide
// navbar), some with none at all (D&D, Marvel, Ghostbusters pages had no title),
// at three different widths. This standardizes the title block and drops the
// duplicate navigation; the navbar owns Home, Compendium and Homebrew.
//
// The subtitle (the system's eyebrow line) takes the selected system's accent
// via --sys, so a Star Wars page is lettered in Star Wars yellow and a Marvel
// page in Marvel red, following the switch live.
export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  /** Usually a count line ("12 Shadowdark classes + 2 homebrew"); JSX allowed. */
  subtitle?: React.ReactNode;
  /** Optional right-aligned actions that genuinely belong to THIS page. */
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div className="min-w-0">
        <h1 className="font-display text-3xl font-black tracking-wide">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--sys,var(--gold))] sm:text-[11px] sm:tracking-[0.35em]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children ? <div className="flex shrink-0 gap-2">{children}</div> : null}
    </header>
  );
}
