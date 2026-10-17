import { mkdir, rename, rm, stat, statfs, copyFile, readdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { SYSTEMS, isSystemKey } from "@/components/systemStore";
import {
  LIBRARY_CATEGORIES,
  RULEBOOK_DIR,
  VOLUME_DIR,
  WRITE_ROOT,
  coverDirFor,
  invalidateLibraryCache,
  scanLibrary,
  type LibraryEntry,
  type RulebookCategory,
  type RulebookSystem,
} from "@/lib/rulebooks";

// ─────────────────────────────────────────────────────────────────────────────
// Managing the Library's files from the admin page: upload, cover, move,
// delete, and the one-time copy of the repo's bundled books onto the volume.
// Everything WRITES to WRITE_ROOT (the Railway volume when LIBRARY_DIR is set)
// using the same <System>/<Section>/<Book>.pdf layout the scan reads, so a book
// managed here behaves exactly like one dropped into a folder by hand.
//
// Paths are never taken from the request as-is: the system folder is one of the
// known systems' names, the section one of the three categories, and the file
// name is reduced to a bare, sanitised "*.pdf".
// ─────────────────────────────────────────────────────────────────────────────

export const MAX_PDF_BYTES = 500 * 1024 * 1024; // 500 MB — the largest book today is 58 MB
export const MAX_COVER_BYTES = 4 * 1024 * 1024;

export async function requireAdmin() {
  const user = await getCurrentUser();
  return user && isAdminEmail(user.email) ? user : null;
}

/** The folder a system's books go in: its display name, minus characters
 *  Windows forbids ("Mutant: Year Zero" → "Mutant Year Zero"). systemFromFolder
 *  reads every one of these back to the same key. "BOTH" → "All Systems". */
export function folderNameFor(system: RulebookSystem): string {
  if (system === "BOTH") return "All Systems";
  const s = SYSTEMS.find((x) => x.key === system);
  return (s?.name ?? system).replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, " ").replace(/[. ]+$/, "").trim();
}

export function parseSystem(v: unknown): RulebookSystem | null {
  const s = String(v ?? "");
  if (s === "BOTH") return "BOTH";
  return isSystemKey(s) ? s : null;
}

export function parseCategory(v: unknown): RulebookCategory | null {
  const s = String(v ?? "");
  return (LIBRARY_CATEGORIES as string[]).includes(s) ? (s as RulebookCategory) : null;
}

/** A safe bare PDF file name, or null. Book IDs are file names, so this is
 *  also what the reader, access rows and page memory key on. */
export function safePdfName(raw: unknown): string | null {
  let name = path.basename(String(raw ?? "").replace(/\\/g, "/"));
  name = name.replace(/[\u0000-\u001f<>:"/\\|?*]/g, "").replace(/\s+/g, " ").trim();
  if (!name || name.startsWith(".") || !/\.pdf$/i.test(name) || name.length > 180) return null;
  return name.replace(/\.pdf$/i, ".pdf");
}

export function destDir(system: RulebookSystem, category: RulebookCategory): string {
  return path.join(/*turbopackIgnore: true*/ WRITE_ROOT, folderNameFor(system), category);
}

/** True when this entry's file lives where the admin page may change it. */
export function isWritable(e: LibraryEntry): boolean {
  return e.root === WRITE_ROOT;
}

export async function findEntry(file: string): Promise<LibraryEntry | null> {
  return (await scanLibrary()).entries.find((e) => e.file === file) ?? null;
}

export const entryPath = (e: LibraryEntry) => path.join(/*turbopackIgnore: true*/ e.root, ...e.rel.split("/"));

/** Stream a request body to `dest` (via a temp file in the same folder, renamed
 *  into place only when complete), refusing anything over `max` bytes. Returns
 *  the byte count. The temp file is removed on any failure. */
export async function streamToFile(body: ReadableStream<Uint8Array>, dest: string, max: number, check?: (head: Buffer) => boolean): Promise<number> {
  await mkdir(path.dirname(dest), { recursive: true });
  const tmp = `${dest}.uploading-${process.pid}-${Date.now()}`;
  let bytes = 0;
  let head = Buffer.alloc(0);
  const meter = new Transform({
    transform(chunk: Buffer, _enc, cb) {
      bytes += chunk.length;
      if (bytes > max) return cb(new Error(`File is larger than ${Math.round(max / 1048576)} MB.`));
      if (head.length < 8) head = Buffer.concat([head, chunk]).subarray(0, 8);
      cb(null, chunk);
    },
  });
  try {
    await pipeline(Readable.fromWeb(body as import("node:stream/web").ReadableStream), meter, createWriteStream(tmp));
    if (bytes === 0) throw new Error("The upload was empty.");
    if (check && !check(head)) throw new Error("That doesn't look like a PDF.");
    await rename(tmp, dest);
    return bytes;
  } catch (e) {
    await rm(tmp, { force: true }).catch(() => {});
    throw e;
  }
}

/** Every cover image that belongs to a book, in one root (beside the PDF and in
 *  the root's .covers folder). */
export async function coverFilesFor(e: LibraryEntry): Promise<string[]> {
  const base = e.file.replace(/\.pdf$/i, "");
  const dirs = [path.dirname(entryPath(e)), coverDirFor(e.root)];
  const out: string[] = [];
  for (const d of dirs) {
    for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
      const p = path.join(d, base + ext);
      try { if ((await stat(p)).isFile()) out.push(p); } catch { /* none */ }
    }
  }
  return out;
}

export function changed(): void {
  invalidateLibraryCache();
}

// ── Storage summary (admin page) ────────────────────────────────────────────
export type LibraryStorage = {
  volume: string | null;      // LIBRARY_DIR, when set
  writeRoot: string;          // where uploads go
  bundledDir: string;
  onVolume: number;           // books served from the volume
  bundled: number;            // books served from the repo folder
  bundledOnlyBytes: number;   // size of the repo books the volume doesn't hold yet
  volumeFree: number | null;  // bytes free on the volume's disk
  volumeTotal: number | null;
  production: boolean;
};

export async function libraryStorage(): Promise<LibraryStorage> {
  const { entries } = await scanLibrary();
  let bundledOnlyBytes = 0;
  for (const e of entries) {
    if (e.stored === "bundled" && VOLUME_DIR) {
      try { bundledOnlyBytes += (await stat(entryPath(e))).size; } catch { /* gone */ }
    }
  }
  let volumeFree: number | null = null, volumeTotal: number | null = null;
  if (VOLUME_DIR) {
    try {
      await mkdir(VOLUME_DIR, { recursive: true });
      const fs = await statfs(VOLUME_DIR);
      volumeFree = Number(fs.bavail) * Number(fs.bsize);
      volumeTotal = Number(fs.blocks) * Number(fs.bsize);
    } catch { /* unknown */ }
  }
  return {
    volume: VOLUME_DIR,
    writeRoot: WRITE_ROOT,
    bundledDir: RULEBOOK_DIR,
    onVolume: entries.filter((e) => e.stored === "volume").length,
    bundled: entries.filter((e) => e.stored === "bundled").length,
    bundledOnlyBytes,
    volumeFree,
    volumeTotal,
    production: process.env.NODE_ENV === "production",
  };
}

// ── Copy the repo's bundled books onto the volume (one time) ────────────────
// Runs in the background on the server — a server-to-server copy of ~1 GB is
// seconds, and nothing has to be uploaded from a home connection. The admin
// page polls seedStatus(). Skips any book the volume already has; copies each
// book's cover too. Never deletes anything.
export type SeedStatus = { running: boolean; total: number; done: number; copiedBytes: number; current: string; error: string; finishedAt: number | null };
const seed: SeedStatus = { running: false, total: 0, done: 0, copiedBytes: 0, current: "", error: "", finishedAt: null };

export function seedStatus(): SeedStatus {
  return { ...seed };
}

async function walkPdfs(root: string, rel: string[] = [], out: string[][] = []): Promise<string[][]> {
  let list: import("node:fs").Dirent[];
  try { list = await readdir(path.join(/*turbopackIgnore: true*/ root, ...rel), { withFileTypes: true }); } catch { return out; }
  for (const d of list) {
    if (d.name.startsWith(".")) continue;
    if (d.isDirectory() && rel.length < 3) await walkPdfs(root, [...rel, d.name], out);
    else if (d.isFile() && d.name.toLowerCase().endsWith(".pdf")) out.push([...rel, d.name]);
  }
  return out;
}

export function startSeed(): SeedStatus {
  if (!VOLUME_DIR) throw new Error("No volume is configured (LIBRARY_DIR is not set).");
  if (seed.running) return seedStatus();
  const volume = VOLUME_DIR;
  Object.assign(seed, { running: true, total: 0, done: 0, copiedBytes: 0, current: "", error: "", finishedAt: null });
  (async () => {
    try {
      const books = await walkPdfs(RULEBOOK_DIR);
      seed.total = books.length;
      const onVolume = new Set((await walkPdfs(volume)).map((p) => p[p.length - 1]));
      for (const parts of books) {
        const file = parts[parts.length - 1];
        seed.current = parts.join("/");
        if (!onVolume.has(file)) {
          const src = path.join(/*turbopackIgnore: true*/ RULEBOOK_DIR, ...parts);
          const dst = path.join(/*turbopackIgnore: true*/ volume, ...parts);
          await mkdir(path.dirname(dst), { recursive: true });
          const tmp = `${dst}.copying`;
          await copyFile(src, tmp);
          await rename(tmp, dst);
          seed.copiedBytes += (await stat(dst)).size;
          // Its cover(s): beside the PDF, and in the repo's .covers folder.
          const base = file.replace(/\.pdf$/i, "");
          for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
            const beside = path.join(path.dirname(src), base + ext);
            const shelf = path.join(/*turbopackIgnore: true*/ RULEBOOK_DIR, ".covers", base + ext);
            for (const [from, to] of [[beside, path.join(path.dirname(dst), base + ext)], [shelf, path.join(volume, ".covers", base + ext)]] as const) {
              try {
                if ((await stat(from)).isFile()) { await mkdir(path.dirname(to), { recursive: true }); await copyFile(from, to); }
              } catch { /* no such cover */ }
            }
          }
        }
        seed.done++;
      }
    } catch (e) {
      seed.error = e instanceof Error ? e.message : String(e);
    } finally {
      seed.running = false;
      seed.current = "";
      seed.finishedAt = Date.now();
      changed();
    }
  })();
  return seedStatus();
}

