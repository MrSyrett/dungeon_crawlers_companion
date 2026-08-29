import { redirect } from "next/navigation";

// The Force powers now live on the Skills page (folded in to keep the
// dashboard's Star Wars row short). Old links land in the right place.
export default function SwForcePage() {
  redirect("/sw/skills?attr=Force");
}
