import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { PbHeader } from "@/components/PbRef";

export const dynamic = "force-dynamic";

// Every Pirate Borg homebrew type, in the order they appear on the reference pages.
const KINDS: { kind: HbType; label: string; where: string }[] = [
  { kind: "pb-weapon", label: "Weapons", where: "/pirate-borg/gear" },
  { kind: "pb-armor", label: "Clothing, Armor & Hats", where: "/pirate-borg/gear?view=armor" },
  { kind: "pb-gear", label: "Gear", where: "/pirate-borg/gear?view=gear" },
  { kind: "pb-relic", label: "Ancient Relics", where: "/pirate-borg/magic" },
  { kind: "pb-ritual", label: "Arcane Rituals", where: "/pirate-borg/magic?view=rituals" },
  { kind: "pb-monster", label: "Creatures & NPCs", where: "/pirate-borg/bestiary" },
  { kind: "pb-ship", label: "Ships", where: "/pirate-borg/naval" },
];

export default async function PbHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <PbHeader title="Homebrew" subtitle={total ? `${total} creation${total === 1 ? "" : "s"} across ${KINDS.length} types` : "create and manage all your homebrew"} />
      <p className="mb-6 max-w-[62ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Everything you make here flows into the Pirate Borg reference pages — {KINDS.map((k, i) => <span key={k.kind}>{i ? (i === KINDS.length - 1 ? " and " : ", ") : ""}<a href={k.where} className="text-[var(--sys-link)] hover:underline">{k.label.toLowerCase()}</a></span>)} — and into the character sheet and GM Screen. Share a creation to a campaign to let your crew use it too.
      </p>
      {KINDS.map((k, i) => (
        <HomebrewEditor key={k.kind} kind={k.kind} campaigns={campaigns} initial={owned[i]} />
      ))}
    </div>
  );
}
