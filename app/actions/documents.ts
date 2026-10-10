"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isToolId, TOOLS } from "@/lib/tools";

export async function createDocument(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const tool = String(formData.get("tool") ?? "");
  if (!isToolId(tool)) throw new Error("Unknown tool");

  const def = TOOLS[tool];
  const doc = await prisma.document.create({
    data: { userId: user.id, tool, title: `New ${def.systemName} ${def.label}` },
  });
  // From an invite page (/join/<code>): the new sheet opens with the code on
  // its URL and joins the campaign itself (see lib/inject.ts).
  const join = String(formData.get("join") ?? "").trim().toUpperCase();
  redirect(/^[A-Z0-9]{4,12}$/.test(join) ? `/tools/${tool}/${doc.id}?join=${join}` : `/tools/${tool}/${doc.id}`);
}

// Titles now sync automatically from inside each tool (character name /
// adventure title), so the dashboard no longer exposes a rename field. Kept
// available for programmatic renames.
export async function renameDocument(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim().slice(0, 120) || "Untitled";
  await prisma.document.updateMany({ where: { id, userId: user.id }, data: { title } });
  revalidatePath("/dashboard");
}

export async function deleteDocument(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") ?? "");
  await prisma.document.deleteMany({ where: { id, userId: user.id } });
  // A sheet shows on the dashboard AND in a campaign's party roster, so refresh
  // both — otherwise the deleted character lingers on /campaigns until a reload.
  revalidatePath("/dashboard");
  revalidatePath("/campaigns");
}
