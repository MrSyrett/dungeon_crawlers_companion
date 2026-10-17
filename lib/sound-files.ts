import { createHmac, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { bucketConfig, type BucketConfig } from "@/lib/s3";
import { SOUND_CATEGORIES, canonicalSubcategory } from "@/lib/sounds";

// ─────────────────────────────────────────────────────────────────────────────
// Sound Library tracks stored in the Railway Storage Bucket.
//
// Objects live under sounds/<Category>/<Subcategory>/<file> — the same layout as
// the Audio folder on the PC, so the library's taxonomy comes from the folders.
//
// A bucket track's library URL is a path on this site:
//     /api/sounds/file/<Category>/<Subcategory>/<file>
// stored as-is (no host, so it survives a domain change). Handed to the GM
// Screen / VTT it carries a signature (?s=…), which makes it a link only the
// app could have produced: the route checks it and redirects to a short-lived
// presigned bucket URL, so the browser streams the file straight from the bucket
// (free bucket egress) and no permanent public link to the audio exists. The
// signature, not a session, is the access check, so it works for players on the
// VTT and inside the Owlbear frame (no cookie) alike.
// ─────────────────────────────────────────────────────────────────────────────

export const SOUND_PREFIX = "sounds/";
export const FILE_ROUTE = "/api/sounds/file/";
export const MAX_SOUND_BYTES = 200 * 1024 * 1024;
export const AUDIO_EXT = /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)$/i;

const MIME: Record<string, string> = {
  ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".aac": "audio/aac", ".ogg": "audio/ogg", ".oga": "audio/ogg",
  ".opus": "audio/ogg", ".wav": "audio/wav", ".flac": "audio/flac", ".webm": "audio/webm",
};
export const audioMime = (name: string) => MIME[path.extname(name).toLowerCase()] || "application/octet-stream";

export function soundBucket(): BucketConfig | null {
  return bucketConfig();
}

function linkSecret(): string {
  return process.env.SOUNDS_LINK_SECRET?.trim() || bucketConfig()?.secretAccessKey || "";
}

/** The ?s= signature for a library-relative key ("Ambiance/Lairs/x.mp3"). */
export function signKey(rel: string): string {
  const secret = linkSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update("sound:" + rel).digest("base64url").slice(0, 22);
}

export function verifyKey(rel: string, sig: string): boolean {
  const want = signKey(rel);
  if (!want || !sig || sig.length !== want.length) return false;
  try { return timingSafeEqual(Buffer.from(sig), Buffer.from(want)); } catch { return false; }
}

const encPath = (rel: string) => rel.split("/").map(encodeURIComponent).join("/");

/** The stored library URL for a bucket track (no host, no signature). */
export const storedUrlFor = (rel: string) => FILE_ROUTE + encPath(rel);

/** Is this stored/library URL a bucket track? Returns its relative key. */
export function bucketRelFromUrl(url: string): string | null {
  if (typeof url !== "string") return null;
  let p = url;
  try { if (/^https?:\/\//i.test(url)) p = new URL(url).pathname; } catch { return null; }
  p = p.split("?")[0];
  if (!p.startsWith(FILE_ROUTE)) return null;
  try {
    const rel = p.slice(FILE_ROUTE.length).split("/").map(decodeURIComponent).join("/");
    return safeRel(rel);
  } catch { return null; }
}

/** The URL handed to players: the stored path plus its signature. Non-bucket
 *  URLs (Dropbox and friends) pass through untouched. */
export function publicSoundUrl(url: string): string {
  const rel = bucketRelFromUrl(url);
  if (!rel) return url;
  const s = signKey(rel);
  return storedUrlFor(rel) + (s ? "?s=" + s : "");
}

/** A clean relative key, or null: no "..", no empty or dot segments, audio only. */
export function safeRel(rel: string): string | null {
  const parts = String(rel).replace(/\\/g, "/").split("/").map((p) => p.replace(/[\u0000-\u001f<>:"|?*]/g, "").trim());
  if (!parts.length || parts.some((p) => !p || p === "." || p === ".." || p.startsWith("."))) return null;
  const out = parts.join("/");
  if (!AUDIO_EXT.test(out) || out.length > 400) return null;
  return out;
}

// Folder names on the PC → the library's taxonomy. Case-insensitive; anything
// not listed is kept as typed (canonicalSubcategory).
const SUB_ALIASES: Record<string, string> = {
  peacful: "Peaceful",
  "action or combat": "Action/Combat",
  "action and combat": "Action/Combat",
  combat: "Action/Combat",
  "sci fi": "Sci-fi",
  scifi: "Sci-fi",
};

/** Where a file belongs, from its path inside the uploaded folder: the first
 *  segment naming a Category (Ambiance | Music | Scenes) and the one after it as
 *  the Subcategory. Returns the bucket-relative key it should be stored under. */
export function placeFile(relPath: string): { rel: string; category: string; subcategory: string } | null {
  const parts = String(relPath).replace(/\\/g, "/").split("/").filter(Boolean);
  const file = parts.pop();
  if (!file || !AUDIO_EXT.test(file)) return null;
  const ci = parts.findIndex((p) => SOUND_CATEGORIES.some((c) => c.toLowerCase() === p.toLowerCase()));
  const category = ci >= 0 ? SOUND_CATEGORIES.find((c) => c.toLowerCase() === parts[ci].toLowerCase())! : "Music";
  const rawSub = ci >= 0 ? parts[ci + 1] ?? "" : parts[parts.length - 1] ?? "";
  const subcategory = canonicalSubcategory(SUB_ALIASES[rawSub.toLowerCase().replace(/[-_]+/g, " ").trim()] ?? rawSub);
  const subFolder = subcategory.replace(/\//g, " & ");
  const rel = safeRel([category, subFolder, file].filter(Boolean).join("/"));
  return rel ? { rel, category, subcategory } : null;
}

/** Category + subcategory back from a stored key (the inverse of placeFile). */
export function taxonomyOf(rel: string): { category: string; subcategory: string } {
  const parts = rel.split("/");
  const category = SOUND_CATEGORIES.find((c) => c.toLowerCase() === (parts[0] || "").toLowerCase()) ?? "Music";
  const sub = parts.length > 2 ? parts[1].replace(/ & /g, "/") : "";
  return { category, subcategory: canonicalSubcategory(SUB_ALIASES[sub.toLowerCase()] ?? sub) };
}

/** A display name from the file name: underscores to spaces, the "AMB Only" /
 *  "MUS Only" mix tags dropped (the Category already says which it is). */
export function labelFromFile(file: string): string {
  let s = path.basename(file).replace(/\.[a-z0-9]+$/i, "");
  s = s.replace(/[_+]+/g, " ").replace(/\s+-\s*/g, " - ").replace(/\s+/g, " ").trim();
  s = s.replace(/\s*-?\s*\b(amb(ience|iance)?|mus(ic)?)\s+only\b/gi, "").replace(/\s+/g, " ").trim();
  s = s.replace(/\s*-\s*$/, "").trim();
  return (s || "Track").replace(/(^|\s)([a-z])/g, (_, sp, c) => sp + c.toUpperCase());
}

/** The comparable stem of a URL's or path's file name — how an old Dropbox
 *  entry is matched to the same file in the bucket. */
export function fileStem(urlOrPath: string): string {
  let p = String(urlOrPath).split("?")[0];
  try { if (/^https?:\/\//i.test(p)) p = new URL(p).pathname; } catch { /* keep */ }
  let base = p.split("/").pop() || "";
  try { base = decodeURIComponent(base); } catch { /* keep */ }
  return base.replace(/\.[a-z0-9]+$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}
