import { redirect } from "next/navigation";

// Weapons are now part of the unified Gear page (General / Weapons / Armor).
export const dynamic = "force-dynamic";

export default function Page() {
  redirect("/yze/gear");
}
