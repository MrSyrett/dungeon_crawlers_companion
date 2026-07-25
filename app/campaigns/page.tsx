import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { makeCode } from "@/lib/campaign-code";
import { ConfirmButton } from "@/components/ConfirmButton";
import { deleteCampaign, renameCampaign, setCampaignVttUrl } from "@/app/actions/campaigns";

export const dynamic = "force-dynamic";

// Create a campaign owned by the current user. Defined inline here (the page
// already talks to prisma directly); move it into @/app/actions/campaigns
// alongside the others if you'd rather keep all mutations in one module.
async function createCampaign(formData: FormData): Promise<void> {
  "use server";
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = formData.get("name");
  const name =
    typeof raw === "string" && raw.trim() ? raw.trim().slice(0, 60) : "New Campaign";

  // Mirror the /api/campaigns POST: retry on the (unlikely) join-code collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await prisma.campaign.create({
        data: { name, code: makeCode(), ownerId: user.id },
      });
      break;
    } catch {
      if (attempt === 4) throw new Error("Could not create campaign");
    }
  }

  revalidatePath("/campaigns");
}

// Only the handful of fields we read out of a saved character sheet.
type SheetBlob = {
  name?: unknown;
  class?: unknown;
  level?: unknown;
  _sheet?: { campaign?: { id?: unknown } | null } | null;
};

type PartyMember = { id: string; name: string; cls: string; level: number | null };

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d);
}

// "3 months ago" reads faster than a date when you're deciding what's dead.
function relative(d: Date | null): string {
  if (!d) return "never";
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default async function CampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const campaigns = await prisma.campaign.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, code: true, createdAt: true, vttUrl: true },
  });

  const ids = campaigns.map((c) => c.id);

  // Roll activity for every campaign in one grouped query.
  // Note the log is pruned to ~500 rolls per campaign, so this is "rolls still
  // on record", not a lifetime total — fine for judging what's gone quiet.
  const rollStats = ids.length
    ? await prisma.campaignRoll.groupBy({
        by: ["campaignId"],
        where: { campaignId: { in: ids } },
        _count: { _all: true },
        _max: { createdAt: true },
      })
    : [];

  const statFor = new Map(
    rollStats.map((r) => [r.campaignId, { rolls: r._count._all, last: r._max.createdAt }]),
  );

  // Who is actually in each party. Sheets record their link inside their own
  // JSON, so string_contains is a DB-side prefilter (the same one the
  // campaigns/[id]/characters API uses) and the parse below is what decides
  // membership — a sheet that merely mentions the id doesn't count.
  const parties = await Promise.all(
    ids.map(async (id) => {
      const docs = await prisma.document.findMany({
        where: { tool: "sd-character", data: { path: ["sd_sheet"], string_contains: id } },
        select: { id: true, title: true, data: true },
        orderBy: { updatedAt: "desc" },
      });

      const members: PartyMember[] = [];
      for (const doc of docs) {
        const raw = (doc.data as Record<string, unknown> | null)?.sd_sheet;
        if (typeof raw !== "string") continue;

        let sheet: SheetBlob;
        try {
          sheet = JSON.parse(raw) as SheetBlob;
        } catch {
          continue; // malformed sheet — skip rather than break the page
        }
        if (sheet?._sheet?.campaign?.id !== id) continue;

        // The tools sync the character name into the document title, but the
        // sheet itself is the more direct source.
        const name =
          (typeof sheet.name === "string" && sheet.name.trim()) || doc.title || "Unnamed";
        const cls = typeof sheet.class === "string" ? sheet.class : "";
        const level = typeof sheet.level === "number" ? sheet.level : null;
        members.push({ id: doc.id, name, cls, level });
      }
      return [id, members] as const;
    }),
  );
  const partyFor = new Map(parties);

  // ── Campaigns the player has JOINED (a character is linked) but does not own ──
  // Membership is recorded inside each of the user's own sheets as
  // _sheet.campaign.id — the same marker the roster reads. We gather those ids,
  // drop any this user owns, and show the rest read-only.
  const ownedIds = new Set(campaigns.map((c) => c.id));
  const myDocs = await prisma.document.findMany({
    where: { userId: user.id, tool: "sd-character" },
    select: { id: true, title: true, data: true },
    orderBy: { updatedAt: "desc" },
  });

  const joinedChars = new Map<string, string[]>(); // campaignId -> character names
  for (const doc of myDocs) {
    const raw = (doc.data as Record<string, unknown> | null)?.sd_sheet;
    if (typeof raw !== "string") continue;
    let sheet: SheetBlob;
    try {
      sheet = JSON.parse(raw) as SheetBlob;
    } catch {
      continue;
    }
    const cid = sheet?._sheet?.campaign?.id;
    if (typeof cid !== "string" || !cid || ownedIds.has(cid)) continue;
    const name = (typeof sheet.name === "string" && sheet.name.trim()) || doc.title || "Unnamed";
    const list = joinedChars.get(cid) ?? [];
    list.push(name);
    joinedChars.set(cid, list);
  }

  const joinedIds = [...joinedChars.keys()];
  const joinedCampaigns = joinedIds.length
    ? await prisma.campaign.findMany({
        where: { id: { in: joinedIds } },
        orderBy: { name: "asc" },
        select: { id: true, name: true, code: true },
      })
    : [];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Campaigns</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {campaigns.length === 0
              ? "None yet"
              : `${campaigns.length} campaign${campaigns.length === 1 ? "" : "s"} you own`}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          ← Home
        </Link>
      </header>

      <section className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
          Create a campaign
        </h2>
        <form action={createCampaign} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            name="name"
            maxLength={60}
            placeholder="Campaign name…"
            aria-label="New campaign name"
            className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
          />
          <button className="shrink-0 rounded border border-[var(--gold)] bg-[var(--gold)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a] hover:opacity-90">
            Create
          </button>
        </form>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
          You&apos;ll be its GM/owner. Share the join code with your players so they can link their
          character sheets. A blank name becomes &ldquo;New Campaign&rdquo; — rename it below.
        </p>
      </section>

      {campaigns.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">No campaigns yet</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Use the <span className="text-[var(--gold)]">Create a campaign</span> box above to
            start one. You&apos;ll be its GM/owner — give the join code to your players and they
            can link their character sheets to it from their own sheet.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Campaigns you joined but don&apos;t own won&apos;t appear here; only their owner can
            edit or delete them.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {campaigns.map((c) => {
            const stat = statFor.get(c.id);
            const rolls = stat?.rolls ?? 0;
            const last = stat?.last ?? null;
            const party = partyFor.get(c.id) ?? [];
            const links = party.length;
            const quiet = rolls === 0 && links === 0;

            return (
              <li
                key={c.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                        {c.name}
                      </h2>
                      <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-bold tracking-[0.15em] text-[var(--text)]">
                        {c.code}
                      </span>
                      {quiet ? (
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                          · unused
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--muted)]">
                      <span>Created {formatDate(c.createdAt)}</span>
                      <span>
                        {links} character sheet{links === 1 ? "" : "s"} linked
                      </span>
                      <span>
                        {rolls} roll{rolls === 1 ? "" : "s"} · last {relative(last)}
                      </span>
                    </div>

                    {party.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {party.map((m) => (
                          <span
                            key={m.id}
                            className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1 text-[11px] text-[var(--text)]"
                          >
                            {m.name}
                            {m.level !== null || m.cls ? (
                              <span className="text-[var(--muted)]">
                                {" "}
                                {[m.level !== null ? `LV ${m.level}` : "", m.cls]
                                  .filter(Boolean)
                                  .join(" ")}
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <form action={deleteCampaign} className="shrink-0">
                    <input type="hidden" name="id" value={c.id} />
                    <ConfirmButton
                      message={
                        `Delete "${c.name}" (${c.code})?\n\n` +
                        `This deletes the campaign and its ${rolls} shared roll${rolls === 1 ? "" : "s"}.\n` +
                        (links > 0
                          ? `${party.map((m) => m.name).join(", ")} will stop sharing rolls and will need to join a new campaign.\n\n`
                          : "\n") +
                        `This cannot be undone.`
                      }
                      className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[#f0a8a3] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
                    >
                      Delete
                    </ConfirmButton>
                  </form>
                </div>

                <form action={renameCampaign} className="mt-3 flex gap-2 border-t border-[var(--border)] pt-3">
                  <input type="hidden" name="id" value={c.id} />
                  <input
                    type="text"
                    name="name"
                    defaultValue={c.name}
                    maxLength={60}
                    aria-label={`Rename ${c.name}`}
                    className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]"
                  />
                  <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
                    Rename
                  </button>
                </form>

                <form action={setCampaignVttUrl} className="mt-2 flex gap-2">
                  <input type="hidden" name="id" value={c.id} />
                  <input
                    type="url"
                    name="vttUrl"
                    defaultValue={c.vttUrl ?? ""}
                    maxLength={500}
                    placeholder="Virtual tabletop room URL (optional)"
                    aria-label={`Virtual tabletop room for ${c.name}`}
                    className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
                  />
                  <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
                    Save
                  </button>
                </form>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--muted)]">
                  {c.vttUrl
                    ? "Characters linked to this campaign show a Launch VTT button on the home page."
                    : "Paste your Owlbear Rodeo room link to add a Launch VTT button to this campaign\u2019s characters."}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {campaigns.length > 0 ? (
        <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
          Deleting a campaign removes its shared roll log. Players&apos; character sheets are left
          untouched — they belong to the players — but any sheet still linked will quietly stop
          sharing rolls, so tell your table before clearing one out.
        </p>
      ) : null}

      {joinedCampaigns.length > 0 ? (
        <section className="mt-12">
          <div className="mb-4 border-b border-[var(--border)] pb-3">
            <h2 className="font-display text-xl font-black tracking-wide">Campaigns you&apos;ve joined</h2>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
              Campaigns one of your characters is linked to. These are view-only — the owner
              manages them.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {joinedCampaigns.map((c) => {
              const chars = joinedChars.get(c.id) ?? [];
              return (
                <li
                  key={c.id}
                  className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                      {c.name}
                    </h3>
                    <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-bold tracking-[0.15em] text-[var(--text)]">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                      · view only
                    </span>
                  </div>
                  {chars.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {chars.map((name, i) => (
                        <span
                          key={`${c.id}-${i}`}
                          className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1 text-[11px] text-[var(--text)]"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
