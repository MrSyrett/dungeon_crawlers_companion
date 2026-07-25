import { readdir } from "node:fs/promises";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Rulebooks live outside public/ and are streamed through /api/rulebooks/<file>,
// which requires a signed-in user — so copyrighted PDFs are never public.
const RULEBOOK_DIR = path.join(process.cwd(), "protected", "rulebooks");

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
    url: `/api/rulebooks/${encodeURIComponent(file)}`,
  }));

  return Response.json({ books });
}
