import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DccOptions from "@/components/DccOptions";
import { DCC_SKILLS } from "@/lib/data/dcc-skills";
import { DCC_SPELLS } from "@/lib/data/dcc-spells";

// Just the names, for DccOptions' skill/spell cross-links — the full entries
// stay on the server.
const REF_NAMES = { spells: DCC_SPELLS.map((s) => s.name), skills: DCC_SKILLS.map((s) => s.name) };

export const dynamic = "force-dynamic";

export default async function DccOptionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Options" subtitle={<>Deities · Debuffs · Buffs · Experiences · Backgrounds</>} />

      <DccOptions refNames={REF_NAMES} />
    </div>
  );
}
