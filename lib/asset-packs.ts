import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { isAdminEmail } from "@/lib/admin";

// Refined Forgotten Adventures atlases live OUTSIDE public/ so Next never serves
// them statically — FA art is licensed for personal use, not redistribution, so
// it's gated exactly like the rulebook PDFs (protected/rulebooks). The Map Maker
// fetches the manifest with the session cookie; only an admin gets it, everyone
// else silently falls back to importing packs by hand.
export const ASSET_PACK_DIR = path.join(process.cwd(), "protected", "asset-packs", "fa");
export const ASSET_MANIFEST = "fa-bundle.json";

export type ApUser = { id: string; email: string } | null;

// Only these extensions are ever streamed from the private directory.
const ALLOWED = /\.(webp|json)$/i;

// Who may load the gated FA bundle. Admin-only for now (private instance); if you
// later want players to see FA art in the Map Maker, widen this the way
// canAccessRulebook does (an "everyone" flag / per-user grants).
export function canAccessAssetPacks(user: ApUser): boolean {
  return !!user && isAdminEmail(user.email);
}

// A file is servable only if it actually sits in the private directory and has an
// allowed extension. Returns the safe basename or null.
export async function resolveAssetFile(raw: string): Promise<string | null> {
  const file = path.basename(decodeURIComponent(raw));
  if (!ALLOWED.test(file) || file.includes("/") || file.includes("\\") || file.startsWith(".")) {
    return null;
  }
  try {
    const listed = await readdir(ASSET_PACK_DIR);
    return listed.includes(file) ? file : null;
  } catch {
    return null; // directory missing — treated as empty
  }
}

// The parsed manifest, or null if the bundle hasn't been deployed yet.
export async function readAssetManifest(): Promise<unknown | null> {
  try {
    const raw = await readFile(path.join(ASSET_PACK_DIR, ASSET_MANIFEST), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
