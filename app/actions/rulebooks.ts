"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { listRulebookFiles, normalizeSystem } from "@/lib/rulebooks";

// Every action here mutates who can reach copyrighted PDFs, so each independently
// confirms the caller is an admin — the UI being admin-only is not enough.
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

async function isRealFile(file: string): Promise<boolean> {
  return (await listRulebookFiles()).includes(file);
}

// Save a file's settings: open to all signed-in users (or private again), and
// which system's Rulebooks list shows it (Shadowdark / DCC / both). The system
// tag only hides the book behind the dashboard toggle — it never grants access.
export async function saveRulebookSettings(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const file = String(formData.get("file") ?? "");
  const everyone = String(formData.get("everyone") ?? "") === "on";
  // Anything unexpected (or missing) becomes BOTH — the never-hide default.
  const system = normalizeSystem(String(formData.get("system") ?? ""));
  if (!file || !(await isRealFile(file))) return;

  await prisma.rulebook.upsert({
    where: { file },
    update: { everyone, system },
    create: { file, everyone, system },
  });

  revalidatePath("/admin/rulebooks");
  revalidatePath("/rules");
}

// Grant a specific account access to a file, looked up by email.
export async function grantRulebookAccess(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const file = String(formData.get("file") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!file || !email || !(await isRealFile(file))) return;

  const target = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!target) {
    // No account with that email — bounce back with a flag the page can show.
    redirect(`/admin/rulebooks?nouser=${encodeURIComponent(email)}`);
  }

  await prisma.rulebookAccess.upsert({
    where: { file_userId: { file, userId: target.id } },
    update: {},
    create: { file, userId: target.id },
  });

  revalidatePath("/admin/rulebooks");
}

// Remove a specific account's access to a file.
export async function revokeRulebookAccess(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const file = String(formData.get("file") ?? "");
  const userId = String(formData.get("userId") ?? "");
  if (!file || !userId) return;

  await prisma.rulebookAccess
    .delete({ where: { file_userId: { file, userId } } })
    .catch(() => {}); // already gone — fine

  revalidatePath("/admin/rulebooks");
}
