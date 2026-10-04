"use client";

import { useEffect, useState } from "react";

// The ONE light/dark control for the whole app.
//
// Before this, the only way to change it was a "Theme: Dark — switch" line in
// the mini-bar menu of whichever character sheet you happened to have open —
// a global preference hidden inside a per-document menu, and repeated on all
// fourteen sheets. It lives here now, and the mini-bar links to this page
// instead of carrying its own toggle.
//
// What it writes: `dd_theme`, which every standalone sheet reads at load
// (lib/minibar.ts seeds the sheet's own `<prefix>_dark` key from it before the
// sheet's script runs, so a sheet opens in the right mode with no flash). The
// Next pages are dark-only today, so this preference is about the sheets and
// the prep builders — said plainly below rather than implied.

type Theme = "dark" | "light";

const KEY = "dd_theme";

function read(): Theme {
  try {
    return localStorage.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark"; // private mode / storage blocked
  }
}

export default function ThemePreference() {
  // Start on the default and correct after mount: localStorage isn't readable
  // while rendering on the server, and guessing would flash the wrong state.
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(read());
    setReady(true);
  }, []);

  function choose(next: Theme) {
    setTheme(next);
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
        Applies to character sheets and adventure preps. The rest of the site is dark only.
      </p>
    </div>
  );
}

// Every sheet follows the same convention — "sd_character_sheet.html" keeps its
// dark flag in "sd_dark" — which is what lets one preference drive all of them.
// Kept in step with the tool list in lib/tools.ts.
const SHEET_PREFIXES = [
  "sd", "dcc", "dnd", "ace", "kob", "nimble", "sw", "d62e",
  "icrpg", "co", "yze", "mmrpg", "jlu", "gb",
];
