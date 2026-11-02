"use server";

// SOLO PLAY — create and delete solo campaigns (Document tool "db-solo").
// Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { SOLO_KEY, SOLO_TOOL, soloEnabledFor } from "@/lib/solo";
import { SOLO_CHAR_TOOL, SOLO_MODULES } from "@/lib/solo-modules";

const MODULES: Record<string, string> = Object.fromEntries(SOLO_MODULES.map((m) => [m.id, m.title]));

export async function createSoloCampaign(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!soloEnabledFor(user.email)) return;

  const moduleId = String(formData.get("module") ?? "db-deepfall");
  if (!MODULES[moduleId]) return;
  const system = SOLO_MODULES.find((m) => m.id === moduleId)?.system ?? "DB";
  const name = String(formData.get("name") ?? "").trim().slice(0, 80) || MODULES[moduleId];

  // The party, chosen here once for the whole campaign: 1–4 of the user's own
  // sheets of the adventure's system, in the order they were ticked.
  const ids = [...new Set(formData.getAll("character").map((v) => String(v)).filter(Boolean))].slice(0, 4);
  const found = ids.length
    ? await prisma.document.findMany({ where: { id: { in: ids }, userId: user.id, tool: SOLO_CHAR_TOOL[system] }, select: { id: true, title: true } })
    : [];
  const party = ids.map((id) => found.find((d) => d.id === id)).filter((d): d is { id: string; title: string } => !!d).map((d) => ({ id: d.id, name: d.title }));
  if (!party.length) return;

  const state = {
    v: 1,
    system,
    name,
    moduleId,
    character: party[0],
    party,
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
