import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /gm-screen/clear — wipes saved GM Screen state and redirects back.
// Use this if the GM Screen page fails to load after a bad save.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  await prisma.document.deleteMany({
    where: { userId: user.id, tool: "gm-screen" },
  });

  redirect("/gm-screen");
}
