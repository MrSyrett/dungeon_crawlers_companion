import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_CHARACTERS } from "@/lib/data/mmrpg-characters";
import { MmrpgHeader } from "@/components/MmrpgRef";
import MmrpgCharacterBrowser from "@/components/MmrpgCharacterBrowser";

export default async function MmrpgCharactersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Characters" subtitle={`${MMRPG_CHARACTERS.length} pre-generated heroes & villains`} />
      <MmrpgCharacterBrowser />
    </div>
  );
}
