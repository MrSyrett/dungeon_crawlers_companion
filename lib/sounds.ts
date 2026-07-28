// Helpers for the admin Sound Library (see the `Sound` model). The Music tool in
// the GM Screen already knows how to play any http(s) audio URL and rewrites
// Dropbox share links to a raw, directly-playable form; we normalize the same
// way at write time so what the library stores is exactly what <audio> needs —
// no per-play fix-up, and the stored value is inspectable/portable.

// Suggested categories shown as quick-pick chips in the admin UI. Free text is
// still allowed — this is just to keep labels consistent as the shelf grows.
export const SOUND_CATEGORIES = [
  "Ambience",
  "Combat",
  "Tavern",
  "Dungeon",
  "Boss",
  "Town",
  "Travel",
  "Tension",
  "Uncategorized",
] as const;

export const DEFAULT_CATEGORY = "Uncategorized";

// Dropbox share links serve an HTML preview page unless raw=1 is set; they also
// carry a short-lived `st=` token that shouldn't be persisted. Drop st/dl/raw
// and force raw=1 so the stored URL streams the file itself. (Mirrors the GM
// screen's own normUrl so library tracks behave identically to pasted ones.)
export function normalizeAudioUrl(raw: string): string | null {
  const u = (raw || "").trim();
  if (!/^https?:\/\//i.test(u)) return null; // only real, fetchable URLs

  if (!/dropbox\.com/i.test(u)) return u;

  const [base, query = ""] = u.split("?");
  const params = query
    .split("&")
    .filter(Boolean)
    .filter((p) => !/^(st|dl|raw)=/i.test(p));
  params.push("raw=1");
  return base + "?" + params.join("&");
}

// Best-effort label from a URL when the admin doesn't type one — the file's
// basename, de-slugged. "epic_battle_theme.mp3" -> "Epic Battle Theme".
export function labelFromUrl(url: string): string {
  try {
    const path = url.split("?")[0];
    const file = decodeURIComponent(path.split("/").pop() || "");
    const stem = file.replace(/\.[a-z0-9]+$/i, "");
    const pretty = stem
      .replace(/[-_+]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return pretty || "Track";
  } catch {
    return "Track";
  }
}

// Normalize a free-typed category: trim, collapse spaces, fall back to default.
export function cleanCategory(raw: string): string {
  const c = (raw || "").replace(/\s+/g, " ").trim();
  return c || DEFAULT_CATEGORY;
}
