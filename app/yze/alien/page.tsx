import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// The ALIEN RPG content used to live behind a separate "Alien" tab while the
// system was generic Year Zero Engine. ALIEN is now the system itself, so its
// content is folded into the main compendium (Skills, Careers, Talents, Weapons,
// Gear, Combat). This route is kept only so old links don't 404.
export default function YzeAlienPage() {
  redirect("/yze/skills");
}
