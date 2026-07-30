import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ConfirmButton } from "@/components/ConfirmButton";
import { createVttToken, revokeVttToken } from "@/app/actions/vtt";
import CopyField from "@/components/CopyField";

export const dynamic = "force-dynamic";

type RawQuery = { new?: string | string[] };

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

export default async function VttPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const justCreated = Array.isArray(raw.new) ? raw.new[0] : raw.new;

  const tokens = await prisma.vttToken.findMany({
    where: { userId: user.id, revokedAt: null },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Virtual Tabletop</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Owlbear Rodeo Extension
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="https://www.owlbear.rodeo/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[var(--gold)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            Open Owlbear Rodeo ↗
          </a>
          <Link
            href="/dashboard"
            className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            ← Home
          </Link>
        </div>
      </header>

      {justCreated ? (
        <div className="mb-8 rounded-lg border border-[var(--gold)] bg-[var(--panel)] p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
            Your new access code
          </h2>
          <p className="mt-2 text-[13px] text-[var(--muted)]">
            Here it is — it also stays listed below, so you can copy it again anytime. Revoke it if
            it&rsquo;s ever exposed.
          </p>
          <CopyField value={justCreated} />
        </div>
      ) : null}

      <section className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em]">Set up the extension</h2>
        <ol className="flex flex-col gap-2 text-[13px] leading-relaxed text-[var(--muted)]">
          <li>
            <span className="text-[var(--text)]">1.</span> In Owlbear Rodeo, open your profile and
            choose <span className="text-[var(--text)]">Add Extension</span>.
          </li>
          <li>
            <span className="text-[var(--text)]">2.</span> Paste this install link:
            <CopyField value="/obr/manifest.json" absolute />
          </li>
          <li>
            <span className="text-[var(--text)]">3.</span> Enable the extension when creating or
            editing a room, then click the{" "}
            <span className="text-[var(--text)]">Character Sheet</span> action in the room.
          </li>
          <li>
            <span className="text-[var(--text)]">4.</span> Paste an access code from below. Your
            sheets open right inside the tabletop and save as you play.
          </li>
        </ol>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em]">Access codes</h2>
          <form action={createVttToken} className="flex items-center gap-2">
            <input
              name="label"
              placeholder="Label (e.g. Laptop)"
              className="w-40 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
            />
            <button className="rounded border border-[var(--gold)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--panel-2)]">
              New code
            </button>
          </form>
        </div>

        <p className="mb-4 text-[13px] leading-relaxed text-[var(--muted)]">
          A code only opens your <span className="text-[var(--text)]">character sheets</span> and
          lets them save. It cannot reach campaigns, homebrew, or delete anything. Make one per
          device so you can revoke a single one without disturbing the others.
        </p>

        {tokens.length === 0 ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
            No codes yet. Create one above to connect a tabletop.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {tokens.map((t: {
              id: string; label: string; prefix: string; token: string | null;
              createdAt: Date; lastUsedAt: Date | null;
            }) => (
              <li
                key={t.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] px-4 py-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold">{t.label}</div>
                    <div className="text-[11px] text-[var(--muted)]">
                      created {formatDate(t.createdAt)} ·{" "}
                      {t.lastUsedAt ? `last used ${formatDate(t.lastUsedAt)}` : "never used"}
                    </div>
                  </div>
                  <form action={revokeVttToken} className="shrink-0">
                    <input type="hidden" name="id" value={t.id} />
                    <ConfirmButton
                      message={`Revoke "${t.label}"? Any tabletop using it will stop working.`}
                      className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                    >
                      Revoke
                    </ConfirmButton>
                  </form>
                </div>
                {t.token ? (
                  <CopyField value={t.token} />
                ) : (
                  <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]">
                    {t.prefix}… — this code was created before codes were stored, so it can&apos;t be
                    shown again. Revoke it and make a new one to get a copyable code.
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
