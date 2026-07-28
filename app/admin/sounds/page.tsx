import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { ConfirmButton } from "@/components/ConfirmButton";
import { AdminNav } from "@/components/AdminNav";
import {
  SOUND_CATEGORIES,
  SUBCATEGORY_GROUPS,
  SUBCATEGORY_ORDER,
  DEFAULT_CATEGORY,
} from "@/lib/sounds";
import { createSound, updateSound, deleteSound, bulkImportSounds } from "@/app/actions/sounds";

export const dynamic = "force-dynamic";

type SoundRow = {
  id: string;
  label: string;
  url: string;
  category: string;
  subcategory: string;
};

// Shared field styling (matches the dark form fields used elsewhere in admin).
const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none";

// ── Reusable taxonomy selects (server-rendered, native form controls) ─────────
function CategorySelect({ value }: { value?: string }) {
  return (
    <select name="category" defaultValue={value ?? DEFAULT_CATEGORY} className={fieldCls}>
      {SOUND_CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

function SubcategorySelect({ value }: { value?: string }) {
  const isCustom = !!value && !SUBCATEGORY_ORDER.includes(value);
  return (
    <select name="subcategory" defaultValue={value ?? ""} className={fieldCls}>
      <option value="">— none —</option>
      {Object.entries(SUBCATEGORY_GROUPS).map(([group, subs]) => (
        <optgroup key={group} label={group}>
          {subs.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </optgroup>
      ))}
      {isCustom ? <option value={value}>{value} (custom)</option> : null}
    </select>
  );
}

// Order helpers: canonical order first, custom values after, "Unsorted" last.
function orderCategories(cats: string[]): string[] {
  const known = SOUND_CATEGORIES.filter((c) => cats.includes(c));
  const extra = cats
    .filter((c) => !SOUND_CATEGORIES.includes(c as (typeof SOUND_CATEGORIES)[number]))
    .sort();
  return [...known, ...extra];
}
function orderSubcategories(subs: string[]): string[] {
  const known = SUBCATEGORY_ORDER.filter((s) => subs.includes(s));
  const custom = subs.filter((s) => s && !SUBCATEGORY_ORDER.includes(s)).sort();
  const unsorted = subs.includes("") ? [""] : [];
  return [...known, ...custom, ...unsorted];
}

export default async function AdminSoundsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard"); // not an admin — nothing to see

  const sounds: SoundRow[] = await prisma.sound.findMany({
    orderBy: [{ category: "asc" }, { subcategory: "asc" }, { label: "asc" }],
    select: { id: true, label: true, url: true, category: true, subcategory: true },
  });

  // Group by category → subcategory for display.
  const tree = new Map<string, Map<string, SoundRow[]>>();
  for (const s of sounds) {
    const subMap = tree.get(s.category) ?? new Map<string, SoundRow[]>();
    const arr = subMap.get(s.subcategory) ?? [];
    arr.push(s);
    subMap.set(s.subcategory, arr);
    tree.set(s.category, subMap);
  }
  const categories = orderCategories([...tree.keys()]);

  const total = sounds.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <AdminNav active="sounds" />
        <h1 className="mt-5 font-display text-3xl font-black tracking-wide">Sound Library</h1>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
          Admin · {total} {total === 1 ? "track" : "tracks"}
        </p>
      </header>

      <p className="mb-6 text-[13px] leading-relaxed text-[var(--muted)]">
        Labeled audio links the GM Screen Music tool can pull from, so you don&rsquo;t re-paste the
        same URLs each session. Each track has a <span className="text-[var(--text)]">Category</span>{" "}
        (Ambiance · Music · Scenes), a <span className="text-[var(--text)]">Subcategory</span>{" "}
        (Location or Mood), and a <span className="text-[var(--text)]">Name</span>. Add a track, then
        open the Music tool in the GM Screen and click{" "}
        <span className="text-[var(--text)]">📚 Library</span> on Music, Soundboard, or a Scene to
        drop it in. Dropbox share links are automatically rewritten to a directly-playable form on
        save.
      </p>

      {/* ── Add a track ─────────────────────────────────────────────────────── */}
      <section className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]/40 p-5">
        <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
          Add a track
        </h2>
        <form action={createSound} className="grid gap-3 sm:grid-cols-2 sm:items-end">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Category
            </span>
            <CategorySelect />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Subcategory
            </span>
            <SubcategorySelect />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Name
            </span>
            <input
              name="label"
              type="text"
              placeholder="Rainy Tavern (optional — filled from the URL if left blank)"
              className={fieldCls}
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
              className={fieldCls}
            />
          </label>
          <div className="sm:col-span-2">
            <button className="rounded border border-[var(--gold)] bg-[var(--gold)]/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)]/20">
              Add to library
            </button>
          </div>
        </form>

        {/* ── Bulk import (collapsed) ──────────────────────────────────────── */}
        <details className="mt-4 border-t border-[var(--border)] pt-4">
          <summary className="cursor-pointer text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]">
            Bulk import — paste many at once
          </summary>
          <form action={bulkImportSounds} className="mt-3">
            <p className="mb-2 text-[12px] leading-relaxed text-[var(--muted)]">
              One track per line, fields separated by <code className="text-[var(--text)]">|</code>:
              <br />
              <code className="text-[var(--text)]">Category | Subcategory | Name | URL</code> — or
              drop fields from the left (
              <code className="text-[var(--text)]">Category | Name | URL</code>,{" "}
              <code className="text-[var(--text)]">Name | URL</code>, or just{" "}
              <code className="text-[var(--text)]">URL</code>). Duplicates and non-audio URLs are
              skipped.
            </p>
            <textarea
              name="bulk"
              rows={6}
              placeholder={"Ambiance | Tavern | Rainy Tavern | https://www.dropbox.com/scl/fi/…/rain.mp3?rlkey=…\nMusic | Action/Combat | Boss Fight | https://www.dropbox.com/scl/fi/…/boss.mp3?rlkey=…"}
              className={`${fieldCls} font-mono text-[12px]`}
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
        <div className="space-y-10">
          {categories.map((cat) => {
            const subMap = tree.get(cat)!;
            const subs = orderSubcategories([...subMap.keys()]);
            const catCount = [...subMap.values()].reduce((n, a) => n + a.length, 0);
            return (
              <section key={cat}>
                <h2 className="mb-4 flex items-center gap-2 border-b border-[var(--border)] pb-2 font-display text-xl font-black tracking-wide text-[var(--text)]">
                  {cat}
                  <span className="rounded-full border border-[var(--gold)]/50 px-2 py-0.5 text-[10px] font-black text-[var(--gold)]">
                    {catCount}
                  </span>
                </h2>

                <div className="space-y-5">
                  {subs.map((sub) => (
                    <div key={sub || "__unsorted__"}>
                      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                        {sub || "Unsorted"}
                      </h3>
                      <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                        <table className="w-full border-collapse text-left text-[13px]">
                          <tbody>
                            {subMap.get(sub)!.map((s) => (
                              <tr
                                key={s.id}
                                className="border-b border-[var(--border)] align-top last:border-b-0 hover:bg-[var(--panel)]"
                              >
                                <td className="px-4 py-3">
                                  <span className="block font-medium text-[var(--text)]">
                                    {s.label}
                                  </span>
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
                                      className="mt-2 grid gap-2 sm:grid-cols-2"
                                    >
                                      <input type="hidden" name="id" value={s.id} />
                                      <CategorySelect value={s.category} />
                                      <SubcategorySelect value={s.subcategory} />
                                      <input
                                        name="label"
                                        type="text"
                                        defaultValue={s.label}
                                        placeholder="Name"
                                        className={`${fieldCls} sm:col-span-2`}
                                      />
                                      <input
                                        name="url"
                                        type="url"
                                        required
                                        defaultValue={s.url}
                                        placeholder="Direct audio URL"
                                        className={`${fieldCls} sm:col-span-2`}
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
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
