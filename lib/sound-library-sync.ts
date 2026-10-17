import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { listObjects } from "@/lib/s3";
import { SOUND_PREFIX, bucketRelFromUrl, fileStem, labelFromFile, safeRel, soundBucket, storedUrlFor, taxonomyOf } from "@/lib/sound-files";

// ─────────────────────────────────────────────────────────────────────────────
// Keeping the Sound Library (the `Sound` table) in step with the bucket.
//
// A file in the bucket becomes a library entry:
//  - already in the library (same stored URL)        → left alone
//  - an existing entry plays the SAME file from Dropbox (matched by file name)
//                                                    → that entry is switched to the
//    bucket copy, keeping its name and category; its old URL is kept in prevUrl
//    so saved boards and scenes that still hold the Dropbox link keep playing
//  - otherwise                                       → a new entry, named from the
//    file, Category/Subcategory from its folders
// ─────────────────────────────────────────────────────────────────────────────

export async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminEmail(user.email) ? user : null;
}

type Row = { id: string; url: string; category: string };
export type SyncResult = { added: number; swapped: number; existing: number };

export async function syncFiles(rels: string[]): Promise<SyncResult> {
  const result: SyncResult = { added: 0, swapped: 0, existing: 0 };
  const rows: Row[] = await prisma.sound.findMany({ select: { id: true, url: true, category: true } });
  const have = new Set(rows.map((r) => r.url));
  // Dropbox-era rows by file stem, so the bucket copy can take their place.
  const legacy = new Map<string, Row[]>();
  for (const r of rows) {
    if (bucketRelFromUrl(r.url)) continue;
    const k = fileStem(r.url);
    if (!k) continue;
    legacy.set(k, [...(legacy.get(k) ?? []), r]);
  }

  const create: { label: string; url: string; category: string; subcategory: string }[] = [];
  for (const raw of rels) {
    const rel = safeRel(raw);
    if (!rel) continue;
    const url = storedUrlFor(rel);
    if (have.has(url)) { result.existing++; continue; }
    have.add(url);
    const { category, subcategory } = taxonomyOf(rel);
    const cands = legacy.get(fileStem(rel)) ?? [];
    const match = cands.find((r) => r.category === category) ?? cands[0];
    if (match) {
      legacy.set(fileStem(rel), cands.filter((r) => r !== match));
      await prisma.sound.update({ where: { id: match.id }, data: { url, prevUrl: match.url } });
      result.swapped++;
      continue;
    }
    create.push({ label: labelFromFile(rel), url, category, subcategory });
  }
  if (create.length) {
    await prisma.sound.createMany({ data: create });
    result.added = create.length;
  }
  return result;
}

export type BucketStatus = {
  configured: boolean;
  files: number;
  bytes: number;
  rels: Record<string, number>; // stored key → size, so an upload can skip what's there
  error?: string;
};

export async function bucketStatus(): Promise<BucketStatus> {
  const cfg = soundBucket();
  if (!cfg) return { configured: false, files: 0, bytes: 0, rels: {} };
  try {
    const objs = await listObjects(cfg, SOUND_PREFIX);
    const rels: Record<string, number> = {};
    let bytes = 0;
    for (const o of objs) {
      const rel = safeRel(o.key.slice(SOUND_PREFIX.length));
      if (!rel) continue;
      rels[rel] = o.size;
      bytes += o.size;
    }
    return { configured: true, files: Object.keys(rels).length, bytes, rels };
  } catch (e) {
    return { configured: true, files: 0, bytes: 0, rels: {}, error: e instanceof Error ? e.message : String(e) };
  }
}
