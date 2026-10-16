import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { LotrHeader } from "@/components/LotrRef";

export const dynamic = "force-dynamic";

// Every LotR homebrew type, in the order they appear on the reference pages.
const KINDS: { kind: HbType; label: string }[] = [
  { kind: "lotr-virtue", label: "Virtues" },
  { kind: "lotr-background", label: "Backgrounds" },
  { kind: "lotr-weapon", label: "Weapons" },
  { kind: "lotr-gear", label: "Gear" },
  { kind: "lotr-monster", label: "Adversaries" },
];

export default async function LotrHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title="Homebrew" subtitle={total ? `${total} creation${total === 1 ? "" : "s"} across ${KINDS.length} types` : "create and manage all your homebrew"} />
      <p className="mb-6 max-w-[62ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Everything you make here flows into the Lord of the Rings reference pages — virtues, backgrounds,
        equipment and the bestiary. Share a creation to a campaign to let your Company use it too.
      </p>
      {KINDS.map((k, i) => (
        <HomebrewEditor key={k.kind} kind={k.kind} campaigns={campaigns} initial={owned[i]} />
      ))}
    </div>
  );
}
