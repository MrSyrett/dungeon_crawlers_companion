import { redirect } from "next/navigation";

// The Rulebooks shelf is now the Library (/library). Old links and bookmarks —
// including /rules?book=<file> deep links into the reader — land on the same
// place there.
export default async function RulesRedirect({ searchParams }: { searchParams: Promise<{ book?: string }> }) {
  const { book } = await searchParams;
  redirect(book ? `/library?book=${encodeURIComponent(book)}` : "/library");
}
