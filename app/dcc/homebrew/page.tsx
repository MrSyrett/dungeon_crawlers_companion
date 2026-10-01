import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import DccHomebrew from "@/components/DccHomebrew";
import DccHomebrewEditor from "@/components/DccHomebrewEditor";

export const dynamic = "force-dynamic";

// Every DCC homebrew type, in the order they appear on the reference pages.
// dcc-item has its own bespoke creator (DccHomebrew); the rest are schema-driven.
const KINDS: { kind: HbType; label: string }[] = [
  { kind: "dcc-item", label: "Items" },
  { kind: "dcc-skill", label: "Skills" },
  { kind: "dcc-spell", label: "Spells" },
  { kind: "dcc-monster", label: "Creatures" },
  { kind: "dcc-race", label: "Races" },
  { kind: "dcc-class", label: "Classes" },
];

export default async function DccHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <p className="mb-6 max-w-[62ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Everything you make here also appears on its reference page and flows into the character sheet and GM screen —
        inventory, spellbook, skill picker, and bestiary. Share a creation to a campaign to let your table use it too.
      </p>

      <div className="flex flex-col gap-10">
        {KINDS.map((k, i) =>
          k.kind === "dcc-item" ? (
            <DccHomebrew key={k.kind} campaigns={campaigns} initial={owned[i]} />
          ) : (
            <DccHomebrewEditor key={k.kind} kind={k.kind} campaigns={campaigns} initial={owned[i]} />
          ),
        )}
      </div>
    </div>
  );
}
