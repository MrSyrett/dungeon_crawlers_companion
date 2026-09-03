import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import DndHomebrewEditor from "@/components/DndHomebrewEditor";
import { DndHeader } from "@/components/DndRef";

export const dynamic = "force-dynamic";

// Every D&D homebrew type, in the order they appear on the reference pages.
const KINDS: { kind: HbType; label: string }[] = [
  { kind: "dnd-equipment", label: "Equipment" },
  { kind: "dnd-feat", label: "Feats" },
  { kind: "dnd-background", label: "Backgrounds" },
  { kind: "dnd-spell", label: "Spells" },
  { kind: "dnd-species", label: "Species" },
  { kind: "dnd-monster", label: "Creatures" },
  { kind: "dnd-subclass", label: "Subclasses" },
];

export default async function DndHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title="My Homebrew" subtitle={total ? `${total} creation${total === 1 ? "" : "s"} across ${KINDS.length} types` : "create and manage all your homebrew"} />
      <p className="mb-6 max-w-[62ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Everything you make here also appears on its reference page and flows into the character sheet and GM screen —
        item shop, spellbook, pickers, and bestiary. Share a creation to a campaign to let your table use it too.
      </p>
      {KINDS.map((k, i) => (
        <DndHomebrewEditor key={k.kind} kind={k.kind} campaigns={campaigns} initial={owned[i]} />
      ))}
    </div>
  );
}
