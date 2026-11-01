"use server";

// SOLO PLAY — create and delete solo campaigns (Document tool "db-solo").
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { SOLO_KEY, SOLO_TOOL, soloEnabledFor } from "@/lib/solo";
import { SOLO_MODULES } from "@/lib/solo-modules";

const MODULES: Record<string, string> = Object.fromEntries(SOLO_MODULES.map((m) => [m.id, m.title]));

export async function createSoloCampaign(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!soloEnabledFor(user.email)) return;

  const moduleId = String(formData.get("module") ?? "db-deepfall");
  if (!MODULES[moduleId]) return;
  const name = String(formData.get("name") ?? "").trim().slice(0, 80) || MODULES[moduleId];

  // An optional character to link from the start — only one of the user's own
  // Dragonbane sheets.
  const charId = String(formData.get("character") ?? "");
  const ch = charId
    ? await prisma.document.findFirst({ where: { id: charId, userId: user.id, tool: "db-character" }, select: { id: true, title: true } })
    : null;

  const state = {
    v: 1,
    name,
    moduleId,
    character: ch ? { id: ch.id, name: ch.title } : null,
    summary: { module: MODULES[moduleId], mission: "", progress: "Not started" },
  };
  const doc = await prisma.document.create({
    data: { userId: user.id, tool: SOLO_TOOL, title: name, data: { [SOLO_KEY]: JSON.stringify(state) } },
  });
  revalidatePath("/campaigns");
  revalidatePath("/my-campaigns");
  redirect(`/solo/${doc.id}`);
}

export async function deleteSoloCampaign(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const id = String(formData.get("id") ?? "");
  // Only ever a solo document the user owns — the linked character is untouched.
  await prisma.document.deleteMany({ where: { id, userId: user.id, tool: SOLO_TOOL } });
  revalidatePath("/campaigns");
  revalidatePath("/my-campaigns");
  revalidatePath("/my-characters");
}
