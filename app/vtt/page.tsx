import { redirect } from "next/navigation";

// The Owlbear setup page used to live here. Its contents moved to the Owlbear
// Rodeo section of /account and the "Open VTT" buttons live on the campaign
// rows, but this page was left behind with the old instructions (one code per
// device, a separate map importer) and the old button name, so anyone who
// found it was told how a version of the site that no longer exists worked.
// Kept as a redirect so old links and bookmarks still land somewhere true;
// the /vtt/* route handlers and static assets the extension uses are not
// pages and are unaffected.
export const dynamic = "force-dynamic";

export default function VttRedirect() {
  redirect("/campaigns");
}
