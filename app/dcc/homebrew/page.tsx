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
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">My Homebrew</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--red)] sm:text-[11px] sm:tracking-[0.35em]">
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
