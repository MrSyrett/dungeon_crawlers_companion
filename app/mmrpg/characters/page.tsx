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
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Ready-to-play stat blocks from the core rulebook and its supplements. Each lists the six <b>MARVEL</b> abilities (Melee, Agility, Resilience, Vigilance, Ego, Logic) plus Health, Focus, Karma and rank. Click a character for their full profile — defenses, speed, powers, traits and tags. Drop them straight into a scene as allies or opposition.</p>
      <MmrpgCharacterBrowser />
    </div>
  );
}
