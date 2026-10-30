// Site-wide light / dark mode. The account (User.theme) is the source of truth;
// the `dd_theme` cookie lets signed-out pages and the first paint agree with it.

export type Mode = "dark" | "light";

export function normMode(v: unknown): Mode {
  return v === "light" ? "light" : "dark";
}

// Every sheet follows the same convention — "sd_character_sheet.html" keeps its
// dark flag in "sd_dark" — which is what lets one preference drive all of them.
// Kept in step with the tool list in lib/tools.ts.
export const SHEET_PREFIXES = [
  "sd", "dcc", "dnd", "ace", "kob", "nimble", "sw", "d62e",
  "icrpg", "co", "yze", "mmrpg", "jlu", "gb", "twd", "myz", "vae", "lotr", "db", "pb",
];

// Inline <head>/<body> script: copies the server's mode into localStorage so the
// static tools (sheets, preps, GM Screen, Map Maker, Tabletop) open in it, then
// sets <html data-mode>. Runs before first paint.
export function modeSyncScript(mode: Mode): string {
  return `(function(){try{var m=${JSON.stringify(mode)};document.documentElement.dataset.mode=m;if(localStorage.getItem("dd_theme")!==m){localStorage.setItem("dd_theme",m);${JSON.stringify(SHEET_PREFIXES)}.forEach(function(p){localStorage.setItem(p+"_dark",m==="dark"?"1":"0")})}}catch(e){}})();`;
}
