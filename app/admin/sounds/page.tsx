import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/AdminNav";
import { SoundLibraryList } from "@/components/SoundLibraryList";
import {
  SOUND_CATEGORIES,
  SUBCATEGORY_GROUPS,
  SUBCATEGORY_ORDER,
  DEFAULT_CATEGORY,
} from "@/lib/sounds";
import { createSound, bulkImportSounds } from "@/app/actions/sounds";

export const dynamic = "force-dynamic";

type SoundRow = {
  id: string;
  label: string;
  url: string;
  category: string;
  subcategory: string;
};

const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none";

// ── Reusable taxonomy selects (server-rendered, native form controls) ─────────
function CategorySelect({ name = "category", value }: { name?: string; value?: string }) {
  return (
    <select name={name} defaultValue={value ?? DEFAULT_CATEGORY} className={fieldCls}>
      {SOUND_CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

function SubcategorySelect({ name = "subcategory", value }: { name?: string; value?: string }) {
  const isCustom = !!value && !SUBCATEGORY_ORDER.includes(value);
  return (
    <select name={name} defaultValue={value ?? ""} className={fieldCls}>
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

export default async function AdminSoundsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard"); // not an admin — nothing to see

  const sounds: SoundRow[] = await prisma.sound.findMany({
    orderBy: [{ category: "asc" }, { subcategory: "asc" }, { label: "asc" }],
    select: { id: true, label: true, url: true, category: true, subcategory: true },
  });

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
        <span className="text-[var(--text)]">📚</span> on Music, Soundboard, or a Scene to drop it in.
        Dropbox share links are automatically rewritten to a directly-playable form on save.
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
            <p className="mb-3 text-[12px] leading-relaxed text-[var(--muted)]">
              Pick one <span className="text-[var(--text)]">Category</span> and{" "}
              <span className="text-[var(--text)]">Subcategory</span> below — they apply to every line
              — then paste one track per line as <code className="text-[var(--text)]">Name | URL</code>{" "}
              (or just the <code className="text-[var(--text)]">URL</code> to name it from the file).
              Duplicates and non-audio URLs are skipped.
            </p>
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Category (applies to all)
                </span>
                <CategorySelect name="bulkCategory" />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Subcategory (applies to all)
                </span>
                <SubcategorySelect name="bulkSubcategory" />
              </label>
            </div>
            <textarea
              name="bulk"
              rows={7}
              placeholder={"Rainy Tavern | https://www.dropbox.com/scl/fi/…/rain.mp3?rlkey=…\nCrackling Fire | https://www.dropbox.com/scl/fi/…/fire.mp3?rlkey=…\nhttps://www.dropbox.com/scl/fi/…/wind.mp3?rlkey=…"}
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

      {/* ── The library (filterable, inline edit) ───────────────────────────── */}
      {total === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--border)] px-4 py-8 text-center text-[14px] text-[var(--muted)]">
          No tracks yet. Add one above, or bulk-import a list.
        </p>
      ) : (
        <SoundLibraryList sounds={sounds} />
      )}
    </div>
  );
}
