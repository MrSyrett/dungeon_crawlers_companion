// ── Homebrew builder kit · Preview card shell ────────────────────────────────
// The frame every builder's live preview sits in. The builder renders its own
// system-formatted body (stat block / item card / spell card) as children.
//
//   <Preview title={name || "Unnamed"} subtitle="Level 3 Beast">…</Preview>
//
// Props: title, subtitle (italic line under it), label (small caps tag above,
// default "Preview"), children, className (for e.g. `lg:sticky lg:top-4`).
// Themed by --hb-accent (top rule + title). Server- and client-safe.
import type { ReactNode } from "react";
import styles from "./hb.module.css";

export default function Preview({
  title,
  subtitle,
  label = "Preview",
  className = "",
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <aside className={`${styles.preview} ${className}`} aria-label={label}>
      <div className={styles.previewLbl}>{label}</div>
      <div className={styles.previewTitle}>{title}</div>
      {subtitle ? <div className={styles.previewSub}>{subtitle}</div> : null}
      {children}
    </aside>
  );
}
