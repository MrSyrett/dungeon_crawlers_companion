"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { SYSTEMS, isSystemKey } from "@/components/systemStore";

// Toggling a system's visibility changes what every user sees on the homepage,
// so the action re-checks admin itself — the admin-only page is not enough.
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

// Show or hide one system on the homepage switcher, site-wide. A hidden system
// gets a SystemSetting row with hidden=true; showing it again clears the row so
// the table only ever holds the hidden set.
export async function setSystemHidden(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) return;

  const key = String(formData.get("key") ?? "");
  if (!isSystemKey(key)) return;
  // The checkbox is "Visible": present (="on") means visible, absent means hidden.
  const hidden = String(formData.get("visible") ?? "") !== "on";

  if (hidden) {
    // Never hide the last visible system — that would leave the homepage with an
    // empty switcher. If this key would be the last one hidden, do nothing.
    const alreadyHidden = new Set(
      (await prisma.systemSetting.findMany({ where: { hidden: true }, select: { key: true } })).map(
        (r: { key: string }) => r.key,
      ),
    );
    const visibleAfter = SYSTEMS.filter((s) => s.key !== key && !alreadyHidden.has(s.key)).length;
    if (visibleAfter < 1) {
      revalidatePath("/admin/systems");
      return;
    }
    await prisma.systemSetting.upsert({
      where: { key },
      update: { hidden: true },
      create: { key, hidden: true },
    });
  } else {
    // Visible again — drop the row so absence encodes the default.
    await prisma.systemSetting.deleteMany({ where: { key } });
  }

  revalidatePath("/admin/systems");
  revalidatePath("/dashboard");
}
