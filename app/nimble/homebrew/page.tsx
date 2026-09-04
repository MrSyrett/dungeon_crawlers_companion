import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ownHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";

export const dynamic = "force-dynamic";

const KINDS: { kind: HbType; label: string }[] = [
  { kind: "nimble-item", label: "Items" },
  { kind: "nimble-spell", label: "Spells" },
  { kind: "nimble-monster", label: "Monsters" },
  { kind: "nimble-ancestry", label: "Ancestries" },
];

export default async function NimbleHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const owned = await Promise.all(KINDS.map((k) => ownHomebrew(user.id, k.kind)));
  const total = owned.reduce((n, list) => n + list.length, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">My Homebrew</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--nimble)] sm:text-[11px] sm:tracking-[0.35em]">
            {total ? `${total} creation${total === 1 ? "" : "s"} across ${KINDS.length} types` : "create and manage all your homebrew"}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <p className="mb-6 max-w-[62ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Everything you make here flows into the character sheet and the GM screen. Share a
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
