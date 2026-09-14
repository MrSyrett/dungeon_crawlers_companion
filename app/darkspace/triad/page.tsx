import { redirect } from "next/navigation";

// The Triad no longer has its own reference page or homebrew type. This stub
// keeps the old /darkspace/triad route from 404-ing (and unblocks the build if
// the folder wasn't deleted) by sending visitors to the DarkSpace dashboard.
// Safe to delete this whole folder if you'd rather the route just 404.
export const dynamic = "force-dynamic";

export default function DarkSpaceTriadRedirect() {
  redirect("/dashboard");
}
