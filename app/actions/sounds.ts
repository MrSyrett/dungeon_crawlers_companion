"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { normalizeAudioUrl, labelFromUrl, cleanCategory } from "@/lib/sounds";

// The library feeds a tool the whole table can open, so every mutation here
// independently confirms the caller is an admin — the page being admin-only is
// not enough on its own.
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

// Add one track. A blank label is derived from the URL's filename; the URL is
// normalized (Dropbox → raw=1) and rejected if it isn't http(s).
export async function createSound(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const url = normalizeAudioUrl(String(formData.get("url") ?? ""));
  if (!url) return; // not a usable audio URL — ignore rather than 500

  const rawLabel = String(formData.get("label") ?? "").trim();
  const label = rawLabel || labelFromUrl(url);
  const category = cleanCategory(String(formData.get("category") ?? ""));

  await prisma.sound.create({ data: { label, url, category } });
  revalidatePath("/admin/sounds");
}

// Edit an existing track's label / URL / category in place.
export async function updateSound(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const url = normalizeAudioUrl(String(formData.get("url") ?? ""));
  if (!url) return;

  const rawLabel = String(formData.get("label") ?? "").trim();
  const label = rawLabel || labelFromUrl(url);
  const category = cleanCategory(String(formData.get("category") ?? ""));

  await prisma.sound
    .update({ where: { id }, data: { label, url, category } })
    .catch(() => {}); // row gone (stale form) — nothing to do
  revalidatePath("/admin/sounds");
}

// Remove one track.
export async function deleteSound(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.sound.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/sounds");
}

// Bulk add. Each non-empty line is one track, fields separated by "|":
//   Category | Label | URL      (3 fields)
//   Label | URL                 (2 fields)
//   URL                         (1 field — label derived, Uncategorized)
// This is the ingestion path for a harvested list (e.g. Dropbox links) — paste
// the block once and it creates every valid row, skipping bad/duplicate URLs.
export async function bulkImportSounds(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const text = String(formData.get("bulk") ?? "");
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // De-dupe within the paste and against what's already stored, so re-running an
  // import doesn't pile up copies.
  const existing = new Set(
    (await prisma.sound.findMany({ select: { url: true } })).map((s) => s.url),
  );

  const rows: { label: string; url: string; category: string }[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    const parts = line.split("|").map((p) => p.trim());
    let category = "";
    let label = "";
    let rawUrl = "";

    if (parts.length >= 3) {
      [category, label, rawUrl] = [parts[0], parts[1], parts.slice(2).join("|")];
    } else if (parts.length === 2) {
      [label, rawUrl] = parts;
    } else {
      rawUrl = parts[0];
    }

    const url = normalizeAudioUrl(rawUrl);
    if (!url || existing.has(url) || seen.has(url)) continue;
    seen.add(url);

    rows.push({
      label: label || labelFromUrl(url),
      url,
      category: cleanCategory(category),
    });
  }

  if (rows.length) {
    await prisma.sound.createMany({ data: rows });
    revalidatePath("/admin/sounds");
  }
}
