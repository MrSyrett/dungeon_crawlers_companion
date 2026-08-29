import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { TOOLS, TOOL_ORDER, type ToolId } from "@/lib/tools";
import { logout } from "@/app/actions/auth";
import { createDocument, deleteDocument } from "@/app/actions/documents";
import { ConfirmButton } from "@/components/ConfirmButton";
import SystemTabs from "@/components/SystemTabs";
import SystemToggle from "@/components/SystemToggle";
import { SYSTEMS, type SystemKey } from "@/components/systemStore";

// Toolbar links, in the order they appear beside the system toggle.
// These work for either ruleset, so they show on both tabs. On the Shadowdark
// tab they sit after the Shadowdark reference pages (see SD_REFERENCE); on the
// DCC tab they're the only toolbar links.
const SHARED_NAV: { href: string; label: string }[] = [
  // Leads the shared links so the Shadowdark tab keeps its old order (reference
  // pages, then Rulebooks) and the DCC tab starts with it.
  { href: "/rules", label: "Rulebooks" },
  { href: "/vtt", label: "VTT" },
  { href: "/token-maker", label: "Tokens" },
  { href: "/dungeon-map", label: "Maps" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/gm-screen", label: "GM Screen" },
];

// Shadowdark reference pages — they read Shadowdark data, so they lead the
// toolbar on that tab only, ahead of the shared links.
const SD_REFERENCE: { href: string; label: string }[] = [
  { href: "/classes", label: "Classes" },
  { href: "/ancestries", label: "Ancestries" },
  { href: "/backgrounds", label: "Backgrounds" },
  { href: "/spells", label: "Spells" },
  { href: "/gear", label: "Gear" },
  { href: "/bestiary", label: "Bestiary" },
];

// DCC reference pages — they read Dungeon Crawler Carl data and lead the toolbar
// on the DCC tab only. Grows as each reference page ships (roadmap Phase 1);
// links are added here only once their route exists so nothing points at a 404.
const DCC_REFERENCE: { href: string; label: string }[] = [
  { href: "/dcc/classes", label: "Classes" },
  { href: "/dcc/races", label: "Races" },
  { href: "/dcc/skills", label: "Skills" },
  { href: "/dcc/spells", label: "Spells" },
  { href: "/dcc/loot", label: "Loot & Gear" },
  { href: "/dcc/bestiary", label: "Bestiary" },
  { href: "/dcc/options", label: "Options" },
];

// ACE! reference pages — they read Awfully Cheerful Engine! data and lead the
// toolbar on the ACE tab only.
const ACE_REFERENCE: { href: string; label: string }[] = [
  { href: "/ace/roles", label: "Roles" },
  { href: "/ace/focuses", label: "Focuses" },
  { href: "/ace/traits", label: "Traits" },
  { href: "/ace/gear", label: "Gear" },
  { href: "/ace/extras", label: "Extras" },
  { href: "/ace/settings", label: "Settings" },
];

// Kids on Bikes / Brooms / Capes reference pages — one tab, three books.
const KOB_REFERENCE: { href: string; label: string }[] = [
  { href: "/kob/tropes", label: "Tropes" },
  { href: "/kob/strengths", label: "Strengths & Flaws" },
  { href: "/kob/questions", label: "Questions" },
  { href: "/kob/magic", label: "Magic" },
  { href: "/kob/capes", label: "Capes & Powers" },
  { href: "/kob/rules", label: "Rules" },
];

// Nimble reference pages.
const NIM_REFERENCE: { href: string; label: string }[] = [
  { href: "/nimble/classes", label: "Classes" },
  { href: "/nimble/ancestries", label: "Ancestries" },
  { href: "/nimble/equipment", label: "Equipment" },
  { href: "/nimble/spells", label: "Spells" },
  { href: "/nimble/bestiary", label: "Bestiary" },
  { href: "/nimble/rules", label: "Rules" },
];

// Per-system reference links, keyed the same way the toggle is.
const SYSTEM_REFERENCE: Record<SystemKey, { href: string; label: string }[]> = {
  SD: SD_REFERENCE,
  DCC: DCC_REFERENCE,
  ACE: ACE_REFERENCE,
  KOB: KOB_REFERENCE,
  NIM: NIM_REFERENCE,
};

function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <>
      {links.map((r) => (
        <Link
          key={r.href}
          href={r.href}
          className="flex-1 whitespace-nowrap rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-3 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--text)] sm:py-2.5 sm:text-[11px] md:flex-none"
        >
          {r.label}
        </Link>
      ))}
    </>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.3em] text-[var(--muted)] sm:text-[11px] sm:tracking-[0.4em]">
      {children}
    </h2>
  );
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

function DocList({
  id,
  docs,
}: {
  id: ToolId;
  /** `vttUrl` is set when this sheet is linked to a campaign that has a room. */
  docs: { id: string; title: string; updatedAt: Date; vttUrl?: string | null }[];
}) {
  const def = TOOLS[id];
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <h3 className="text-base font-bold uppercase tracking-[0.15em] sm:text-sm">{def.label}</h3>
        <form action={createDocument}>
          <input type="hidden" name="tool" value={id} />
          <button className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-[11px]">
            + New
          </button>
        </form>
      </div>

      {docs.length === 0 ? (
        <p className="px-4 py-5 text-base text-[var(--muted)] sm:text-sm">No saved {def.label.toLowerCase()}s yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {docs.map((doc) => (
            <li key={doc.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link
                  href={`/tools/${id}/${doc.id}`}
                  className="block truncate py-1 text-lg font-semibold hover:text-[var(--gold)] sm:py-0 sm:text-base"
                >
                  {doc.title}
                </Link>
                <span className="text-[13px] text-[var(--muted)] sm:text-[11px]">
                  Updated {formatDate(doc.updatedAt)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {doc.vttUrl ? (
                  <a
                    href={doc.vttUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open this campaign's virtual tabletop in a new tab"
                    className="min-h-11 shrink-0 rounded border border-[var(--gold)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:min-h-0 sm:px-2 sm:py-1 sm:text-[11px]"
                  >
                    Launch VTT
                  </a>
                ) : null}
                <form action={deleteDocument}>
                  <input type="hidden" name="id" value={doc.id} />
                  <ConfirmButton
                    message={`Delete "${doc.title}"? This cannot be undone.`}
                    className="min-h-11 shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[#f0a8a3] sm:min-h-0 sm:px-2 sm:py-1 sm:text-[11px]"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const isAdmin = isAdminEmail(user.email);

  const docs = await prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  // A sheet's campaign link now lives in the indexed linkedCampaignId column
  // (populated on save for both sd-character and dcc-character docs). We map each
  // linked sheet to its campaign's tabletop link so it can offer Launch VTT.
  // `docs` already holds every scalar column, so this is a field read — no extra
  // query, no JSON parse.
  const campaignIds = [
    ...new Set(
      docs
        .map((d) => d.linkedCampaignId)
        .filter((v: string | null): v is string => !!v),
    ),
  ];
  const vttByCampaign = new Map<string, string>();
  if (campaignIds.length) {
    const linked = await prisma.campaign.findMany({
      where: { id: { in: campaignIds }, NOT: { vttUrl: null } },
      select: { id: true, vttUrl: true },
    });
    for (const c of linked as { id: string; vttUrl: string | null }[]) {
      if (c.vttUrl) vttByCampaign.set(c.id, c.vttUrl);
    }
  }

  type DocRow = (typeof docs)[number] & { vttUrl?: string | null };
  const byTool = new Map<ToolId, DocRow[]>();
  for (const id of TOOL_ORDER) byTool.set(id, []);
  for (const doc of docs) {
    const tool = doc.tool as ToolId;
    if (!byTool.has(tool)) continue;
    const cid = doc.linkedCampaignId;
    byTool.get(tool)!.push({ ...doc, vttUrl: cid ? vttByCampaign.get(cid) ?? null : null });
  }

  // Split tools by kind
  const charSheetIds = TOOL_ORDER.filter((id) => TOOLS[id].kind === "character");
  const sessionPrepIds = TOOL_ORDER.filter((id) => TOOLS[id].kind === "session");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-5 flex items-start justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-3">
          <Image src="/logo-white.png" alt="" width={72} height={72} priority className="h-10 w-10 shrink-0 sm:h-14 sm:w-14" />
          <div>
          <h1 className="font-display text-xl font-black tracking-wide sm:text-3xl">Dungeon Crawler&rsquo;s Companion</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            TTRPG Digital Toolkit
          </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
            <span className="hidden sm:inline">{user.email}</span>
            {isAdmin ? (
              <Link
                href="/admin/users"
                className="min-h-11 rounded border border-[var(--gold)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--gold)] hover:bg-[var(--panel-2)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]"
              >
                Admin
              </Link>
            ) : null}
            <form action={logout}>
              <button className="min-h-11 rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] hover:border-[var(--muted)] hover:text-[var(--text)] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[11px]">
                Sign out
              </button>
            </form>
          </div>
          <SystemToggle />
        </div>
      </header>

      {/* One system at a time; Shadowdark by default. Each system gets the
          same two columns (its character sheets and its session-prep docs),
          filtered by the tool registry's system tag, plus its own reference
          links ahead of the shared toolbar links. */}
      <SystemTabs
        nav={<NavLinks links={SHARED_NAV} />}
        systemNav={Object.fromEntries(
          SYSTEMS.map((s) => [s.key, <NavLinks key={s.key} links={SYSTEM_REFERENCE[s.key]} />]),
        )}
        panels={Object.fromEntries(
          SYSTEMS.map((s) => [
            s.key,
            <div key={s.key} className="grid gap-10 md:grid-cols-2">
              <section>
                <ColumnHeading>Character Sheets</ColumnHeading>
                <div className="flex flex-col gap-6">
                  {charSheetIds
                    .filter((id) => TOOLS[id].system === s.key)
                    .map((id) => (
                      <DocList key={id} id={id} docs={byTool.get(id) ?? []} />
                    ))}
                </div>
              </section>

              <section>
                <ColumnHeading>Session Prep</ColumnHeading>
                <div className="flex flex-col gap-6">
                  {sessionPrepIds
                    .filter((id) => TOOLS[id].system === s.key)
                    .map((id) => (
                      <DocList key={id} id={id} docs={byTool.get(id) ?? []} />
                    ))}
                  {sessionPrepIds.every((id) => TOOLS[id].system !== s.key) ? (
                    <p className="text-sm text-[var(--muted)]">
                      No session-prep tool for {s.name} yet.
                    </p>
                  ) : null}
                </div>
              </section>
            </div>,
          ]),
        )}
      />
    </div>
  );
}
