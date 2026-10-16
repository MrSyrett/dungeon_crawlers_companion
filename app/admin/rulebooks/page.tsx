import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { scanLibrary, prettyName, normalizeSystem, LIBRARY_CATEGORIES } from "@/lib/rulebooks";
import type { RulebookSystem, RulebookCategory } from "@/lib/rulebooks";
import { ConfirmButton } from "@/components/ConfirmButton";
import { AdminNav } from "@/components/AdminNav";
import { SYSTEMS } from "@/components/systemStore";
import { RulebookSettingsForm } from "@/components/RulebookSettingsForm";
import {
  saveRulebookSettings,
  grantRulebookAccess,
  revokeRulebookAccess,
} from "@/app/actions/rulebooks";

export const dynamic = "force-dynamic";

// Matches the dashboard's system toggle (components/systemStore.ts).
const SYSTEM_LABEL: Record<RulebookSystem, string> = {
  ...(Object.fromEntries(SYSTEMS.map((s) => [s.key, s.name])) as Record<RulebookSystem, string>),
  BOTH: "All systems",
};

// Filter-chip order: the dashboard's system order, then shared ("All systems") books.
const SYSTEM_ORDER: RulebookSystem[] = [...SYSTEMS.map((s) => s.key as RulebookSystem), "BOTH"];

// Builds a filter link, keeping the other filter as-is (null = drop that param).
function filterHref(system: string | null, type: string | null): string {
  const sp = new URLSearchParams();
  if (system) sp.set("system", system);
  if (type) sp.set("type", type);
  const q = sp.toString();
  return q ? `/admin/rulebooks?${q}` : "/admin/rulebooks";
}

function Chip({ href, on, label, count }: { href: string; on: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={on ? "true" : undefined}
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors " +
        (on
          ? "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]"
          : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]")
      }
    >
      {label}
      <span className={on ? "text-[var(--gold)]" : "text-[var(--muted)] opacity-70"}>{count}</span>
    </Link>
  );
}

export default async function AdminRulebooksPage({
  searchParams,
}: {
  searchParams: Promise<{ nouser?: string; system?: string; type?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/library"); // not an admin — nothing to see

  const { nouser, system: systemParam, type: typeParam } = await searchParams;

  const { entries, duplicates } = await scanLibrary();
  const entryFor = new Map(entries.map((e) => [e.file, e]));
  const unsorted = entries.filter((e) => !e.folderSystem || !e.folderCategory);
  const [rulebooks, grants] = await Promise.all([
    prisma.rulebook.findMany({ select: { file: true, everyone: true, system: true } }),
    prisma.rulebookAccess.findMany({
      select: { file: true, userId: true, user: { select: { email: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const everyoneFor = new Map(rulebooks.map((r) => [r.file, r.everyone]));
  const systemFor = new Map<string, RulebookSystem>(rulebooks.map((r) => [r.file, normalizeSystem(r.system)]));
  const grantsFor = new Map<string, { userId: string; email: string }[]>();
  for (const g of grants) {
    const list = grantsFor.get(g.file) ?? [];
    list.push({ userId: g.userId, email: g.user.email });
    grantsFor.set(g.file, list);
  }

  // ── Filters (?system=SD&type=Expansions) ─────────────────────────────────
  // The shelf a book is on: its folder's system, else its stored tag, else all.
  const shelfOf = (file: string): RulebookSystem =>
    entryFor.get(file)?.folderSystem ?? systemFor.get(file) ?? "BOTH";
  const systemsPresent = SYSTEM_ORDER.filter((k) => entries.some((e) => shelfOf(e.file) === k));
  // Unknown or stale values (a system with no books, a typo) are ignored.
  const sysFilter = systemsPresent.find((k) => k === systemParam) ?? null;
  const typeFilter = (LIBRARY_CATEGORIES as string[]).includes(typeParam ?? "")
    ? (typeParam as RulebookCategory)
    : null;
  // Counts on each chip respect the OTHER filter, so they say what you'd get.
  const bySys = sysFilter ? entries.filter((e) => shelfOf(e.file) === sysFilter) : entries;
  const byType = typeFilter ? entries.filter((e) => e.category === typeFilter) : entries;
  // Shown list: grouped by system (dashboard order), then the library order.
  const files = entries
    .filter((e) => (!sysFilter || shelfOf(e.file) === sysFilter) && (!typeFilter || e.category === typeFilter))
    .map((e, i) => ({ e, i }))
    .sort((a, b) => SYSTEM_ORDER.indexOf(shelfOf(a.e.file)) - SYSTEM_ORDER.indexOf(shelfOf(b.e.file)) || a.i - b.i)
    .map(({ e }) => e.file);
  const filtering = Boolean(sysFilter || typeFilter);

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <AdminNav active="rulebooks" />
        <div className="mt-5">
          <h1 className="font-display text-3xl font-black tracking-wide">Library access</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Admin · who can read each PDF
          </p>
        </div>
      </header>

      <p className="mb-6 text-[13px] leading-relaxed text-[var(--muted)]">
        Each PDF is <span className="text-[var(--text)]">private by default</span> — only admins can
        read it until you either open it to everyone or grant specific accounts below. Grant by the
        email someone signed up with; they must have an account first. Admins are set via the{" "}
        <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
          ADMIN_EMAILS
        </code>{" "}
        environment variable.
      </p>
      <p className="mb-6 text-[13px] leading-relaxed text-[var(--muted)]">
        <span className="text-[var(--text)]">Shelving is automatic.</span> A PDF&apos;s folder decides
        where it appears:{" "}
        <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
          protected/rulebooks/&lt;System&gt;/&lt;Core Rules | Expansions | Adventures&gt;/Book.pdf
        </code>
        . The system folder can be the system&apos;s name or short label (&ldquo;Shadowdark&rdquo;,
        &ldquo;SD&rdquo;, &ldquo;The Lord of the Rings&rdquo;, &ldquo;LotR&rdquo;…), or &ldquo;All
        Systems&rdquo; for every shelf. Only a PDF left loose in{" "}
        <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">protected/rulebooks/</code>{" "}
        uses the &ldquo;Shown on&rdquo; picker below. Filenames must be unique across the library —
        they are each book&apos;s ID, so moving a file keeps its access settings.
      </p>

      {duplicates.length ? (
        <div className="mb-6 rounded-lg border border-[var(--red)] bg-[var(--panel)] p-4 text-[13px] text-[var(--text)]">
          <div className="font-semibold">Duplicate filenames — only the first copy is used:</div>
          <ul className="mt-1 list-disc pl-5 text-[var(--muted)]">
            {duplicates.map((d) => <li key={d} className="break-all">{d}</li>)}
          </ul>
        </div>
      ) : null}
      {unsorted.length ? (
        <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4 text-[13px] text-[var(--muted)]">
          <span className="font-semibold text-[var(--text)]">{unsorted.length} not fully sorted</span>{" "}
          (missing a system or category folder, so their shelf/section is guessed):{" "}
          {unsorted.map((e) => e.rel).join(" · ")}. Run{" "}
          <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">npm run library:organize</code>{" "}
          to file the known books, or move them by hand.
        </div>
      ) : null}

      {nouser ? (
        <div className="mb-6 rounded-lg border border-[var(--red)] bg-[var(--panel)] p-4 text-[13px] text-[var(--bad)]">
          No account found for <span className="font-semibold">{nouser}</span>. Ask them to sign up
          first, then grant access.
        </div>
      ) : null}

      {entries.length ? (
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-full text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)] sm:w-20">System</span>
            <Chip href={filterHref(null, typeFilter)} on={!sysFilter} label="All" count={byType.length} />
            {systemsPresent.map((k) => (
              <Chip
                key={k}
                href={filterHref(k, typeFilter)}
                on={sysFilter === k}
                label={SYSTEM_LABEL[k]}
                count={byType.filter((e) => shelfOf(e.file) === k).length}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-full text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)] sm:w-20">Book type</span>
            <Chip href={filterHref(sysFilter, null)} on={!typeFilter} label="All" count={bySys.length} />
            {LIBRARY_CATEGORIES.map((c) => (
              <Chip
                key={c}
                href={filterHref(sysFilter, c)}
                on={typeFilter === c}
                label={c}
                count={bySys.filter((e) => e.category === c).length}
              />
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[var(--border)] pt-2 text-[11px] text-[var(--muted)]">
            <span>
              Showing {files.length} of {entries.length} {entries.length === 1 ? "book" : "books"}
            </span>
            {filtering ? (
              <Link href="/admin/rulebooks" scroll={false} className="uppercase tracking-[0.12em] hover:text-[var(--gold)]">
                Clear filters
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      {entries.length > 0 && files.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          No {typeFilter ? typeFilter.toLowerCase() : "books"} on the{" "}
          {sysFilter ? SYSTEM_LABEL[sysFilter] : "selected"} shelf.{" "}
          <Link href="/admin/rulebooks" className="text-[var(--gold)] hover:underline">Clear filters</Link>
        </div>
      ) : files.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          The Library is empty. Drop PDFs into{" "}
          <code className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[var(--text)]">
            protected/rulebooks/&lt;System&gt;/&lt;Core Rules | Expansions | Adventures&gt;/
          </code>{" "}
          and they will appear here.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {files.map((file) => {
            const everyone = everyoneFor.get(file) ?? false;
            const entry = entryFor.get(file);
            const folderSystem = entry?.folderSystem ?? null;
            const system = shelfOf(file);
            const fileGrants = grantsFor.get(file) ?? [];
            return (
              <li
                key={file}
                className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="min-w-0 break-words text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                    {prettyName(file)}
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                    <span className={everyone ? "text-[var(--good)]" : undefined}>
                      {everyone ? "· everyone signed in" : "· private"}
                    </span>{" "}
                    · {SYSTEM_LABEL[system]} · {entry?.category ?? "—"}
                  </span>
                </div>
                <div className="mt-0.5 break-all text-[11px] text-[var(--muted)]">protected/rulebooks/{entry?.rel ?? file}</div>

                <RulebookSettingsForm
                  file={file}
                  everyone={everyone}
                  system={system}
                  folderSystemLabel={folderSystem ? SYSTEM_LABEL[folderSystem] : null}
                  action={saveRulebookSettings}
                />

                <div className="mt-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Allowed accounts
                  </div>
                  {fileGrants.length === 0 ? (
                    <p className="mt-1 text-[12px] text-[var(--muted)]">
                      {everyone
                        ? "Open to everyone — individual grants aren't needed."
                        : "No accounts granted yet."}
                    </p>
                  ) : (
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {fileGrants.map((g) => (
                        <li
                          key={g.userId}
                          className="flex items-center justify-between gap-2 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5"
                        >
                          <span className="truncate text-[13px] text-[var(--text)]">{g.email}</span>
                          <form action={revokeRulebookAccess} className="shrink-0">
                            <input type="hidden" name="file" value={file} />
                            <input type="hidden" name="userId" value={g.userId} />
                            <ConfirmButton
                              message={`Remove ${g.email}'s access to "${prettyName(file)}"?`}
                              className="rounded border border-[var(--border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                            >
                              Remove
                            </ConfirmButton>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}

                  <form action={grantRulebookAccess} className="mt-2 flex gap-2">
                    <input type="hidden" name="file" value={file} />
                    <input type="hidden" name="f_system" value={sysFilter ?? ""} />
                    <input type="hidden" name="f_type" value={typeFilter ?? ""} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="friend@example.com"
                      aria-label={`Grant access to ${prettyName(file)} by email`}
                      className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
                    />
                    <button className="shrink-0 rounded border border-[var(--gold)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--panel-2)]">
                      Grant
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
