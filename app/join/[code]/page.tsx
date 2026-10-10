import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TOOLS, CHARACTER_TOOL_IDS, type ToolId } from "@/lib/tools";
import { isSystemKey, systemName } from "@/components/systemStore";
import { createDocument } from "@/app/actions/documents";
import PageHeader from "@/components/PageHeader";
import { blocked, strike, CODE_MISSES_PER_USER } from "@/lib/rate-limit";

// THE INVITE LINK. A GM copies /join/<code> from the campaign row and sends it
// to a player; this page is where the player lands. Until it existed the only
// way into a campaign was to open a sheet, find Link, and type the six
// letters in — which a new player had no way of knowing (the Campaigns page's
// empty state only spoke to GMs). Signed out, they go through login and come
// straight back here (?next=).
//
// The page does not link anything itself. It hands the player to a sheet with
// ?join=<code> on the URL, and the sheet's own Link flow does the joining
// (lib/inject.ts auto-fills and submits it), so the link is recorded exactly
// the way a typed code records it: inside the sheet, mirrored to
// Document.linkedCampaignId by the save route. One join path, not two.
export const dynamic = "force-dynamic";

const ACTION =
  "inline-flex min-h-11 items-center justify-center rounded border px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]";

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const raw = (await params).code;
  const code = String(raw ?? "").trim().toUpperCase().slice(0, 12);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/join/${code}`)}`);

  // Same miss budget as the sheets' code lookup (/api/campaigns?code=), and
  // the same key, so guessing through this page and through that endpoint
  // draw on one allowance.
  const missKey = `code:user:${user.id}`;
  const campaign =
    code && !blocked(missKey, CODE_MISSES_PER_USER)
      ? await prisma.campaign.findUnique({
          where: { code },
          select: { id: true, name: true, code: true, system: true, ownerId: true },
        })
      : null;
  if (code && !campaign) strike(missKey);

  if (!campaign) {
    return (
      <div className="mx-auto w-full max-w-xl px-5 py-10">
        <PageHeader title="Join a campaign" subtitle="That invite didn't match a campaign" />
        <p className="text-[14px] text-[var(--muted)]">
          Check the link with your GM — codes are six letters, and a deleted campaign's link stops working.
        </p>
      </div>
    );
  }

  const system = isSystemKey(campaign.system) ? campaign.system : null;
  const sysLabel = system ? systemName(system) : "any system";

  if (campaign.ownerId === user.id) {
    return (
      <div className="mx-auto w-full max-w-xl px-5 py-10">
        <PageHeader title={campaign.name} subtitle="This is your own campaign" />
        <p className="mb-5 text-[14px] text-[var(--muted)]">
          Send this link to your players; they'll pick or create a {sysLabel} character and it links to {campaign.name} on its own.
        </p>
        <Link href="/campaigns" className={`${ACTION} border-[var(--gold)] bg-[var(--gold)] text-[var(--on-accent)] hover:opacity-90`}>
          Back to campaigns
        </Link>
      </div>
    );
  }

  // The player's own character sheets for this campaign's system (every
  // system's, if the campaign predates systems). Already-linked sheets are
  // shown too — re-linking is harmless and the sheet says so.
  const toolIds = CHARACTER_TOOL_IDS.filter((id) => !system || TOOLS[id].system === system);
  const sheets = await prisma.document.findMany({
    where: { userId: user.id, tool: { in: toolIds } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, tool: true, linkedCampaignId: true },
  });
  const sheetHref = (tool: string, id: string) => `/tools/${tool}/${id}?join=${encodeURIComponent(campaign.code)}`;

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-10">
      <PageHeader title={`Join ${campaign.name}`} subtitle={system ? `a ${sysLabel} campaign` : "a campaign"} />
      <p className="mb-6 max-w-[62ch] text-[14px] leading-relaxed text-[var(--muted)]">
        Pick the character you're playing, or make a new one. Once it's linked, your rolls show up in everyone's roll log and the GM can send you loot.
      </p>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)]">
        <div className="border-b border-[var(--border)] px-4 py-3">
          <h3 data-dash-head className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">Your characters</h3>
        </div>
        {sheets.length === 0 ? (
          <p className="px-4 py-5 text-[14px] text-[var(--muted)]">No {sysLabel} characters yet — make one below and it'll join as it opens.</p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {sheets.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold">{s.title}</div>
                  <div className="text-[12px] text-[var(--muted)]">
                    {TOOLS[s.tool as ToolId]?.systemName ?? s.tool}
                    {s.linkedCampaignId === campaign.id ? " · already in this campaign" : s.linkedCampaignId ? " · linked to another campaign" : ""}
                  </div>
                </div>
                <a href={sheetHref(s.tool, s.id)} className={`${ACTION} shrink-0 border-[var(--sys-action)] text-[var(--sys-action)] hover:bg-[var(--panel-2)]`}>
                  {s.linkedCampaignId === campaign.id ? "Open" : "Use this one"}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {toolIds.map((tool) => (
          <form key={tool} action={createDocument}>
            <input type="hidden" name="tool" value={tool} />
            <input type="hidden" name="join" value={campaign.code} />
            <button className={`${ACTION} border-[var(--gold)] bg-[var(--gold)] text-[var(--on-accent)] hover:opacity-90`}>
              + New {TOOLS[tool].systemName} character
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
