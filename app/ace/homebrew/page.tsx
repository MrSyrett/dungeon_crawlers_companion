import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";

export const dynamic = "force-dynamic";

const KINDS: { kind: HbType; label: string }[] = [
  { kind: "ace-role", label: "Roles" },
  { kind: "ace-gear", label: "Gear" },
  { kind: "ace-extra", label: "Extras" },
  { kind: "ace-focus", label: "Focuses" },
  { kind: "ace-trait", label: "Traits" },
];

export default async function AceHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">

      <div className="flex flex-col gap-10">
        {KINDS.map((k, i) => (
          <HomebrewEditor key={k.kind} kind={k.kind} campaigns={campaigns} initial={owned[i]} />
        ))}
      </div>
    </div>
  );
}
