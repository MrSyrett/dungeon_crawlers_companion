import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { GEAR } from "@/lib/data/gear";
import { SPELLS } from "@/lib/data/spells";
import { MONSTER_TYPES } from "@/lib/data/monster-types";
import { ownHomebrew, visibleHomebrew, userCampaigns, type HbType } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";

export const dynamic = "force-dynamic";

// Shadowdark's "My Homebrew" hub. Shadowdark is the flagship system, so its
// homebrew types are the bare ones (no system prefix) and its on-page editor is
// HomebrewManager (the same one embedded on /spells, /gear, /bestiary, …). This
// page just gathers every Shadowdark type in one place, mirroring the per-system
// hubs at /ace/homebrew, /kob/homebrew, etc. There's nothing to "sync" — the
// reference pages and this page read and write the one shared Homebrew table.

const KINDS: HbType[] = ["spell", "gear", "monster", "class", "ancestry", "background"];

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

// The class editor offers weapon/armor/spell-list dropdowns (same as /classes).
const WEAPON_OPTIONS = GEAR.filter((g) => g.category === "weapon").map((g) => g.name);
const ARMOR_OPTIONS = GEAR.filter((g) => g.category === "armor").map((g) => g.name);
const SPELL_LIST_OPTIONS = [
  ...[...new Set(SPELLS.map((sp) => sp.caster))].filter((c) => c !== "Both").sort(),
  "Homebrew",
];

export default async function ShadowdarkHomebrewHubPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await userCampaigns(user.id);
  const [owned, gearVisible] = await Promise.all([
    Promise.all(KINDS.map((k) => ownHomebrew(user.id, k))),
    visibleHomebrew(user.id, { type: "gear" }),
  ]);
  const total = owned.reduce((n, list) => n + list.length, 0);

  // The gear manager offers an ammo dropdown built from official ammo plus any
  // homebrew gear whose kind is "ammo" (same derivation as /gear).
  const ammoOptions = [
    ...GEAR.filter((g) => g.category === "ammo").map((g) => g.name),
    ...gearVisible
      .map((h) => h.data as Record<string, unknown>)
      .filter((d) => s(d.kind) === "ammo")
      .map((d) => s(d.name)),
  ].filter((n, i, arr) => n && arr.indexOf(n) === i);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">My Homebrew</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {total ? `${total} creation${total === 1 ? "" : "s"} across ${KINDS.length} types` : "create and manage all your Shadowdark homebrew"}
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
        Everything you make here flows into the character sheet and the GM screen, and shows up
        on its reference page (Spells, Gear, Bestiary, and so on). Share a creation to a campaign
        to let your table use it too.
      </p>

      <div className="flex flex-col gap-10">
        {KINDS.map((k, i) => (
          <HomebrewManager
            key={k}
            type={k}
            campaigns={campaigns}
            initial={owned[i]}
            {...(k === "gear" ? { ammoOptions } : {})}
            {...(k === "monster" ? { monsterTypes: [...MONSTER_TYPES] } : {})}
            {...(k === "class"
              ? { weaponOptions: WEAPON_OPTIONS, armorOptions: ARMOR_OPTIONS, spellListOptions: SPELL_LIST_OPTIONS }
              : {})}
          />
        ))}
      </div>
    </div>
  );
}
