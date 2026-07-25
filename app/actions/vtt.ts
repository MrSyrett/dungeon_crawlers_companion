"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateToken, hashToken } from "@/lib/vtt";

// The freshly-created code is handed back once, through a cookie-free redirect
// param, because only its hash is stored — there is no way to show it again.
export async function createVttToken(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  const label = String(formData.get("label") ?? "").trim().slice(0, 60) || "Owlbear Rodeo";
  const raw = generateToken();

  await prisma.vttToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(raw),
      prefix: raw.slice(0, 6),
      label,
    },
  });

  revalidatePath("/vtt");
  // The code itself never touches the database in plain form; it round-trips
  // once through the URL so the page can display it.
  const { redirect } = await import("next/navigation");
  redirect(`/vtt?new=${encodeURIComponent(raw)}`);
}

export async function revokeVttToken(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.vttToken.updateMany({
    where: { id, userId: user.id, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  revalidatePath("/vtt");
}
