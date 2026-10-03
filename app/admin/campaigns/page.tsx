import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { ConfirmButton } from "@/components/ConfirmButton";
import { AdminNav } from "@/components/AdminNav";
import { SYSTEMS } from "@/components/systemStore";
import { adminDeleteCampaign } from "@/app/actions/admin-campaigns";

export const dynamic = "force-dynamic";

const SYSTEM_NAME = new Map(SYSTEMS.map((s) => [s.key, s.name]));

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d);
}

export default async function AdminCampaignsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard"); // not an admin — nothing to see

  // Every campaign on the site, newest first. `linkedDocuments` are the player
  // character sheets tied to the campaign (players); `documents` are the per-user
  // GM-screen boards; `rolls` is the shared roll-log length.
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      code: true,
      system: true,
      createdAt: true,
      owner: { select: { email: true } },
      _count: { select: { linkedDocuments: true, documents: true, rolls: true } },
    },
  });

  const total = campaigns.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <AdminNav active="campaigns" />
        <div className="mt-5">
          <h1 className="font-display text-3xl font-black tracking-wide">Campaigns</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Admin · {total} {total === 1 ? "campaign" : "campaigns"} across all accounts
          </p>
        </div>
      </header>

      {total === 0 ? (
        <p className="text-[14px] text-[var(--muted)]">No campaigns exist yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--panel)] text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                <th className="px-4 py-3">Campaign</th>
                <th className="hidden px-4 py-3 sm:table-cell">Owner</th>
                <th className="hidden px-3 py-3 md:table-cell">System</th>
                <th className="hidden px-3 py-3 text-center md:table-cell" title="Player character sheets linked">
                  Players
                </th>
                <th className="hidden whitespace-nowrap px-4 py-3 lg:table-cell">Created</th>
                <th className="px-4 py-3 text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const systemLabel = c.system ? SYSTEM_NAME.get(c.system) ?? c.system : "—";
                return (
                  <tr
                    key={c.id}
                    className="border-b border-[var(--border)] last:border-b-0 align-top hover:bg-[var(--panel)]"
                  >
                    <td className="px-4 py-3">
                      <span className="break-words font-medium text-[var(--text)]">{c.name}</span>
                      <span className="ml-2 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-[var(--muted)]">
                        {c.code}
                      </span>
                      {/* Owner / system / date collapse into the first cell on small screens. */}
                      <span className="mt-1 block break-all text-[11px] text-[var(--muted)] sm:hidden">
                        {c.owner.email}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[var(--muted)] md:hidden">
                        {systemLabel === "—" ? "No system" : systemLabel} ·{" "}
                        {c._count.linkedDocuments}{" "}
                        {c._count.linkedDocuments === 1 ? "player" : "players"} · created{" "}
                        {formatDate(c.createdAt)}
                      </span>
                    </td>
                    <td className="hidden break-all px-4 py-3 text-[var(--muted)] sm:table-cell">
                      {c.owner.email}
                    </td>
                    <td className="hidden px-3 py-3 text-[var(--muted)] md:table-cell">
                      {systemLabel}
                    </td>
                    <td className="hidden px-3 py-3 text-center text-[var(--muted)] md:table-cell">
                      {c._count.linkedDocuments}
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-[var(--muted)] lg:table-cell">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form action={adminDeleteCampaign} className="inline">
                        <input type="hidden" name="id" value={c.id} />
                        <ConfirmButton
                          className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                          message={`Permanently delete the campaign "${c.name}" (${c.code})?\n\nThis removes its roll log and every GM-screen board saved for it. Players' character sheets are kept but will unlink from this campaign. This cannot be undone.`}
                        >
                          Delete
                        </ConfirmButton>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-[12px] leading-relaxed text-[var(--muted)]">
        Every campaign on the site is listed here regardless of who owns it. Deleting one removes its
        shared roll log and the per-player GM-screen boards saved under it; players&rsquo; character
        sheets are kept and simply unlink. This is permanent and cannot be undone.
      </p>
    </div>
  );
}
