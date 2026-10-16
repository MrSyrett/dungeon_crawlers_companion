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

// Save a file's settings: open to all signed-in users (or private again), and —
// for a PDF that isn't in a system folder — which system's Library shelf shows
// it. A book filed under protected/rulebooks/<System>/ gets its system from the
// folder, so its form sends no "system" field and the stored tag is left as is.
// The system tag only hides the book behind the system toggle — it never grants
// access.
export async function saveRulebookSettings(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const file = String(formData.get("file") ?? "");
  const everyone = String(formData.get("everyone") ?? "") === "on";
  // No "system" field = the folder decides it; keep whatever is stored. Anything
  // unexpected becomes BOTH — the never-hide default.
  const rawSystem = formData.get("system");
  const system = rawSystem == null ? null : normalizeSystem(String(rawSystem));
  if (!file || !(await isRealFile(file))) return;

  await prisma.rulebook.upsert({
    where: { file },
    update: system ? { everyone, system } : { everyone },
    create: { file, everyone, system: system ?? "BOTH" },
  });

  revalidatePath("/admin/rulebooks");
  revalidatePath("/library");
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
    // No account with that email — bounce back with a flag the page can show,
    // keeping whatever system / book-type filters the admin had applied.
    const back = new URLSearchParams({ nouser: email });
    const fSystem = String(formData.get("f_system") ?? "");
    const fType = String(formData.get("f_type") ?? "");
    if (fSystem) back.set("system", fSystem);
    if (fType) back.set("type", fType);
    redirect(`/admin/rulebooks?${back.toString()}`);
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
