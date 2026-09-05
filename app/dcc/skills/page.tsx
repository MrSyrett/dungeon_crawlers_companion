import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Skills and Spells were merged into one page (/dcc/skills-and-spells) so the DCC
// toolbar fits on a single row. Keep this route as a redirect for old links.
export default function DccSkillsRedirect() {
  redirect("/dcc/skills-and-spells?tab=skills");
}
