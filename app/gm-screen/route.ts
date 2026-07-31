import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildGmScreenHtml } from "@/lib/gm-screen";

const GM_TOOL = "gm-screen";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Load the last-used board for this user (most recently updated), so opening
  // the GM Screen reopens the campaign you were last working in.
  const doc = await prisma.document.findFirst({
    where: { userId: user.id, tool: GM_TOOL },
    orderBy: { updatedAt: "desc" },
    select: { data: true },
  });

  const html = await buildGmScreenHtml({ savedState: doc?.data ?? null });

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache",
      "expires": "0",
    },
  });
}
