import { redirect } from "next/navigation";

// Deities now live as one section of the combined Options reference page.
// Kept as a redirect so old links/bookmarks to /dcc/deities still resolve.
export const dynamic = "force-dynamic";

export default function DccDeitiesRedirect() {
  redirect("/dcc/options");
}
