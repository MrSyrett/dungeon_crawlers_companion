import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { ConfirmButton } from "@/components/ConfirmButton";
import { SOUND_CATEGORIES } from "@/lib/sounds";
import { createSound, updateSound, deleteSound, bulkImportSounds } from "@/app/actions/sounds";

export const dynamic = "force-dynamic";

// Shared field styling (matches the dark form fields used elsewhere in admin).
const inputCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none";
const navLinkCls =
  "rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]";

export default async function AdminSoundsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard"); // not an admin — nothing to see

  const sounds = await prisma.sound.findMany({
    orderBy: [{ category: "asc" }, { label: "asc" }],
  });

  // Group by category for display; categories in alpha order, Uncategorized last.
  const byCategory = new Map<string, typeof sounds>();
  for (const s of sounds) {
    const arr = byCategory.get(s.category) ?? [];
    arr.push(s);
    byCategory.set(s.category, arr);
  }
  const categories = [...byCategory.keys()].sort((a, b) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  const total = sounds.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Sound Library</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            Admin · {total} {total === 1 ? "track" : "tracks"}
            {categories.length ? ` · ${categories.length} ${categories.length === 1 ? "category" : "categories"}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/users" className={navLinkCls}>
            Members
          </Link>
          <Link href="/admin/rulebooks" className={navLinkCls}>
            Rulebooks
          </Link>
          <Link href="/dashboard" className={navLinkCls}>
            ← Dashboard
          </Link>
        </div>
      </header>

      <p className="mb-6 text-[13px] leading-relaxed text-[var(--muted)]">
        Labeled audio links the GM Screen Music tool can pull from, so you don&rsquo;t re-paste the
        same URLs each session. Add a track here, then open the Music tool in the GM Screen and click{" "}
        <span className="text-[var(--text)]">📚 Library</span> to drop any of these straight into your
        playlist. Dropbox share links are automatically rewritten to a directly-playable form.
      </p>

      {/* ── Add a track ─────────────────────────────────────────────────────── */}
      <section className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]/40 p-5">
        <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
          Add a track
        </h2>
        <form action={createSound} className="grid gap-3 sm:grid-cols-[1fr_1fr] sm:items-end">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Label
            </span>
            <input
              name="label"
              type="text"
              placeholder="Tavern Ambience (optional — filled from URL)"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Category
            </span>
            <input
              name="category"
              type="text"
              list="sound-categories"
              defaultValue="Uncategorized"
              placeholder="Ambience"
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Direct audio URL
            </span>
            <input
              name="url"
              type="url"
              required
              placeholder="https://www.dropbox.com/scl/fi/…/track.mp3?rlkey=…"
              className={inputCls}
            />
          </label>
          <div className="sm:col-span-2">
            <button className="rounded border border-[var(--gold)] bg-[var(--gold)]/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)]/20">
              Add to library
            </button>
          </div>
        </form>

        {/* Category autocomplete suggestions (free text still allowed). */}
        <datalist id="sound-categories">
          {SOUND_CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {/* ── Bulk import (collapsed) ──────────────────────────────────────── */}
        <details className="mt-4 border-t border-[var(--border)] pt-4">
          <summary className="cursor-pointer text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]">
            Bulk import — paste many at once
          </summary>
          <form action={bulkImportSounds} className="mt-3">
            <p className="mb-2 text-[12px] leading-relaxed text-[var(--muted)]">
              One track per line. Fields separated by <code className="text-[var(--text)]">|</code>:
              <br />
              <code className="text-[var(--text)]">Category | Label | URL</code> — or{" "}
              <code className="text-[var(--text)]">Label | URL</code> — or just the{" "}
              <code className="text-[var(--text)]">URL</code>. Duplicates and non-audio URLs are
              skipped.
            </p>
            <textarea
              name="bulk"
              rows={6}
              placeholder={"Ambience | Rainy Tavern | https://www.dropbox.com/scl/fi/…/rain.mp3?rlkey=…\nCombat | Boss Fight | https://www.dropbox.com/scl/fi/…/boss.mp3?rlkey=…"}
              className={`${inputCls} font-mono text-[12px]`}
            />
            <div className="mt-2">
              <button className="rounded border border-[var(--border)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]">
                Import all
              </button>
            </div>
          </form>
        </details>
      </section>

      {/* ── The library ─────────────────────────────────────────────────────── */}
      {total === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--border)] px-4 py-8 text-center text-[14px] text-[var(--muted)]">
          No tracks yet. Add one above, or bulk-import a list.
        </p>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                {cat}
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] font-black text-[var(--muted)]">
                  {byCategory.get(cat)!.length}
                </span>
              </h2>
              <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                <table className="w-full border-collapse text-left text-[13px]">
                  <tbody>
                    {byCategory.get(cat)!.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-[var(--border)] align-top last:border-b-0 hover:bg-[var(--panel)]"
                      >
                        <td className="px-4 py-3">
                          <span className="block font-medium text-[var(--text)]">{s.label}</span>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-0.5 block break-all text-[11px] text-[var(--muted)] hover:text-[var(--gold)]"
                            title="Open the audio URL in a new tab"
                          >
                            {s.url}
                          </a>

                          {/* Inline edit — native <details>, no client JS needed. */}
                          <details className="mt-2">
                            <summary className="inline-block cursor-pointer text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]">
                              Edit
                            </summary>
                            <form
                              action={updateSound}
                              className="mt-2 grid gap-2 sm:grid-cols-[1fr_1fr]"
                            >
                              <input type="hidden" name="id" value={s.id} />
                              <input
                                name="label"
                                type="text"
                                defaultValue={s.label}
                                placeholder="Label"
                                className={inputCls}
                              />
                              <input
                                name="category"
                                type="text"
                                list="sound-categories"
                                defaultValue={s.category}
                                placeholder="Category"
                                className={inputCls}
                              />
                              <input
                                name="url"
                                type="url"
                                required
                                defaultValue={s.url}
                                placeholder="Direct audio URL"
                                className={`${inputCls} sm:col-span-2`}
                              />
                              <div className="sm:col-span-2">
                                <button className="rounded border border-[var(--gold)] bg-[var(--gold)]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)]/20">
                                  Save changes
                                </button>
                              </div>
                            </form>
                          </details>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <form action={deleteSound} className="inline">
                            <input type="hidden" name="id" value={s.id} />
                            <ConfirmButton
                              className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                              message={`Remove "${s.label}" from the library?`}
                            >
                              Delete
                            </ConfirmButton>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
