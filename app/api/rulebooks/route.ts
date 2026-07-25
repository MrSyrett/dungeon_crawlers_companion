import { readdir } from "node:fs/promises";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const RULEBOOK_DIR = path.join(process.cwd(), "public", "rulebooks");

// "shadowdark-core-rules.pdf" -> "Shadowdark Core Rules" (same rule as /rules)
function prettyName(file: string): string {
  return file
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// GET — the rulebook PDFs sitting in public/rulebooks.
// Returns { books: [{ file, title, url }] }, used by the GM Screen's Rulebooks tool.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  let files: string[] = [];
  try {
    files = (await readdir(RULEBOOK_DIR))
      .filter((f) => f.toLowerCase().endsWith(".pdf"))
      .sort();
  } catch {
    files = []; // directory missing — same as empty
  }

  const books = files.map((file) => ({
    file,
    title: prettyName(file),
    url: `/rulebooks/${encodeURIComponent(file)}`,
  }));

  return Response.json({ books });
}
