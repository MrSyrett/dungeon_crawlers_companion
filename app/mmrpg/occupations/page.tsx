import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Occupations were merged into the Origins & Occupations page.
export default async function MmrpgOccupationsRedirect() {
  redirect("/mmrpg/origins?show=occupations");
}
