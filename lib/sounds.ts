// Helpers for the admin Sound Library (see the `Sound` model). The Music tool in
// the GM Screen already knows how to play any http(s) audio URL and rewrites
// Dropbox share links to a raw, directly-playable form; we normalize the same
// way at write time so what the library stores is exactly what <audio> needs —
// no per-play fix-up, and the stored value is inspectable/portable.

// ── Taxonomy ─────────────────────────────────────────────────────────────────
// Two levels. Top-level Category describes the *kind* of audio; Subcategory
// describes the Location it depicts or the Mood it evokes. Both are stored as
// plain strings so custom values still work, but the UI offers these as the
// canonical set to keep the shelf tidy.
//
//   Ambiance — sound, no music
//   Music    — music, no sound
//   Scenes   — a mix of ambiance + music
export const SOUND_CATEGORIES = ["Ambiance", "Music", "Scenes"] as const;
export const DEFAULT_CATEGORY = "Music";

// Subcategories, grouped for the picker/edit dropdowns. Location = where it's
// set; Mood = how it feels. A track has one subcategory (or none).
export const SUBCATEGORY_GROUPS: Record<string, string[]> = {
  Location: ["Cities", "Lairs", "Modern", "Sci-fi", "Ruins", "Underground", "Wilderness"],
  Mood: ["Epic", "Lighthearted", "Mysterious", "Peaceful", "Somber", "Tension", "Action/Combat"],
};

// Flat, display-ordered list of every canonical subcategory (Location then Mood).
// Used for sort order and case-insensitive matching.
export const SUBCATEGORY_ORDER: string[] = [
  ...SUBCATEGORY_GROUPS.Location,
  ...SUBCATEGORY_GROUPS.Mood,
];

// Snap a free-typed category to the canonical set (case-insensitive); anything
// unrecognized falls back to the default so Category stays one of the three.
export function canonicalCategory(raw: string): string {
  const c = (raw || "").trim();
  const hit = SOUND_CATEGORIES.find((x) => x.toLowerCase() === c.toLowerCase());
  return hit || DEFAULT_CATEGORY;
}

// Snap a free-typed subcategory to the canonical set (case-insensitive). Empty
// is allowed (an unsorted track); a non-empty custom value is kept as typed so
// you aren't boxed in if you add a new one.
export function canonicalSubcategory(raw: string): string {
  const s = (raw || "").replace(/\s+/g, " ").trim();
  if (!s) return "";
  const hit = SUBCATEGORY_ORDER.find((x) => x.toLowerCase() === s.toLowerCase());
  return hit || s;
}

// ── Audio URL normalization ──────────────────────────────────────────────────
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
