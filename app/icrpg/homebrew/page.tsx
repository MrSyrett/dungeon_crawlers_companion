import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";

export const dynamic = "force-dynamic";

const KINDS: { kind: HbType; label: string }[] = [
  { kind: "icrpg-type", label: "Hero Types" },
  { kind: "icrpg-ability", label: "Abilities" },
  { kind: "icrpg-loot", label: "Loot" },
  { kind: "icrpg-gear", label: "Gear" },
  { kind: "icrpg-spell", label: "Spells" },
  { kind: "icrpg-monster", label: "Monsters" },
];

export default async function IcrpgHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <p className="mb-6 max-w-[62ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Everything you make here flows into the ICRPG reference pages and the GM tools. Share a
        creation to a campaign to let your table use it too.
      </p>

      <div className="flex flex-col gap-10">
        {KINDS.map((k, i) => (
          <HomebrewEditor key={k.kind} kind={k.kind} campaigns={campaigns} initial={owned[i]} />
        ))}
      </div>
    </div>
  );
}
