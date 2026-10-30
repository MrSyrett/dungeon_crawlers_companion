"use client";

import { useState } from "react";
import { setTheme as saveTheme } from "@/app/actions/theme";
import { SHEET_PREFIXES } from "@/lib/theme";

// The ONE light/dark control for the whole app.
//
// Before this, the only way to change it was a "Theme: Dark — switch" line in
// the mini-bar menu of whichever character sheet you happened to have open —
// a global preference hidden inside a per-document menu, and repeated on all
// fourteen sheets. It lives here now, and the mini-bar links to this page
// instead of carrying its own toggle.
//
// It is saved to the ACCOUNT (User.theme), so it follows you to every device,
// and mirrored to the browser so nothing has to wait on a fetch to paint:
//   * a `dd_theme` cookie — the root layout reads it (or User.theme) to render
//     <html data-mode> on the server, so Next pages never flash;
//   * localStorage `dd_theme` + each sheet's `<prefix>_dark` — what the static
//     tools (sheets, preps, GM Screen, Map Maker, Tabletop) read at load. The
//     layout's boot script re-syncs these from the account on every page view.

type Theme = "dark" | "light";

const KEY = "dd_theme";

export default function ThemePreference({ initial }: { initial?: string }) {
  // The server passes the account's value, so the right button is lit on first paint.
  const [theme, setTheme] = useState<Theme>(initial === "light" ? "light" : "dark");
  const ready = true;

  function choose(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.mode = next;
    void saveTheme(next).catch(() => {});
    try {
      localStorage.setItem(KEY, next);
      // Mirror into every sheet's own dark-mode key so a sheet already open in
      // another tab picks it up on its next load without needing this page.
      for (const prefix of SHEET_PREFIXES) {
        localStorage.setItem(`${prefix}_dark`, next === "dark" ? "1" : "0");
      }
    } catch {
      /* storage blocked — the choice still applies to this tab */
    }
  }

  const base =
    "flex-1 rounded border px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors";
  const on = "border-[var(--accent)] bg-[var(--panel-2)] text-[var(--accent)]";
  const off = "border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2" role="group" aria-label="Theme">
        <button type="button" onClick={() => choose("dark")} aria-pressed={ready && theme === "dark"} className={`${base} ${ready && theme === "dark" ? on : off}`}>
          Dark
        </button>
        <button type="button" onClick={() => choose("light")} aria-pressed={ready && theme === "light"} className={`${base} ${ready && theme === "light" ? on : off}`}>
          Light
        </button>
      </div>
      <p className="text-[12px] leading-relaxed text-[var(--muted)]">
        Applies everywhere — site pages, character sheets, adventure preps, the GM Screen, Map Maker and Tabletop. Saved to your account.
      </p>
    </div>
  );
}
