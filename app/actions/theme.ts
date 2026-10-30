"use server";

import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Saves the light / dark choice to the signed-in account, and to a cookie so
// the root layout can render <html data-mode> before first paint even on a
// page that never looks the user up. The browser copy (localStorage dd_theme
// + each sheet's <prefix>_dark) is written client-side by ThemePreference.
export async function setTheme(theme: string): Promise<{ ok: boolean }> {
  const t = theme === "light" ? "light" : "dark";
  const cookieStore = await cookies();
  cookieStore.set("dd_theme", t, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 400 });
  const user = await getCurrentUser();
  if (!user) return { ok: false };
  await prisma.user.update({ where: { id: user.id }, data: { theme: t } });
  return { ok: true };
}
