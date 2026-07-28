"use client";

import { useMemo, useState } from "react";
import {
  SOUND_CATEGORIES,
  SUBCATEGORY_GROUPS,
  SUBCATEGORY_ORDER,
  DEFAULT_CATEGORY,
} from "@/lib/sounds";
import { updateSound, deleteSound } from "@/app/actions/sounds";

type SoundRow = {
  id: string;
  label: string;
  url: string;
  category: string;
  subcategory: string;
};

const fieldCls =
  "w-full rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none";
const chipBase =
  "rounded-full border px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] cursor-pointer";
const chipOn = `${chipBase} border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]`;
const chipOff = `${chipBase} border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]`;

// canonical order first, custom values (alpha) next, blank bucket last.
function orderBy(order: string[], arr: string[]): string[] {
  const known = order.filter((x) => arr.includes(x));
  const extra = arr.filter((x) => x && !order.includes(x)).sort();
  const blank = arr.includes("") ? [""] : [];
  return [...known, ...extra, ...blank];
}

function CategorySelect({ value }: { value: string }) {
  return (
    <select name="category" defaultValue={value} className={fieldCls}>
      {SOUND_CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

function SubcategorySelect({ value }: { value: string }) {
  const isCustom = !!value && !SUBCATEGORY_ORDER.includes(value);
  return (
    <select name="subcategory" defaultValue={value} className={fieldCls}>
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

export function SoundLibraryList({ sounds }: { sounds: SoundRow[] }) {
  const [cat, setCat] = useState<string>("__all__");
  const [sub, setSub] = useState<string>("__all__");
  const [openId, setOpenId] = useState<string | null>(null);

  const cats = useMemo(
    () => orderBy([...SOUND_CATEGORIES], [...new Set(sounds.map((s) => s.category || DEFAULT_CATEGORY))]),
    [sounds],
  );

  const subs = useMemo(() => {
    const inCat = sounds.filter((s) => cat === "__all__" || (s.category || DEFAULT_CATEGORY) === cat);
    return orderBy(SUBCATEGORY_ORDER, [...new Set(inCat.map((s) => s.subcategory || ""))]);
  }, [sounds, cat]);

  const filtered = useMemo(
    () =>
      sounds.filter((s) => {
        if (cat !== "__all__" && (s.category || DEFAULT_CATEGORY) !== cat) return false;
        if (sub !== "__all__" && (s.subcategory || "") !== (sub === "__none__" ? "" : sub)) return false;
        return true;
      }),
    [sounds, cat, sub],
  );

  // Group filtered rows by category → subcategory for display.
  const groups = useMemo(() => {
    const tree = new Map<string, Map<string, SoundRow[]>>();
    for (const s of filtered) {
      const c = s.category || DEFAULT_CATEGORY;
      const sc = s.subcategory || "";
      const subMap = tree.get(c) ?? new Map<string, SoundRow[]>();
      const arr = subMap.get(sc) ?? [];
      arr.push(s);
      subMap.set(sc, arr);
      tree.set(c, subMap);
    }
    return tree;
  }, [filtered]);

  const groupCats = orderBy([...SOUND_CATEGORIES], [...groups.keys()]);

  function pickCat(c: string) {
    setCat(c);
    setSub("__all__"); // subcategory options depend on the category
  }

  return (
    <div>
      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="mb-6 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
            Category
          </span>
          <button type="button" onClick={() => pickCat("__all__")} className={cat === "__all__" ? chipOn : chipOff}>
            All
          </button>
          {cats.map((c) => (
            <button key={c} type="button" onClick={() => pickCat(c)} className={cat === c ? chipOn : chipOff}>
              {c}
            </button>
          ))}
        </div>

        {subs.length > 1 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
              Subcategory
            </span>
            <button type="button" onClick={() => setSub("__all__")} className={sub === "__all__" ? chipOn : chipOff}>
              All
            </button>
            {subs.map((s) => (
              <button
                key={s || "__none__"}
                type="button"
                onClick={() => setSub(s || "__none__")}
                className={sub === (s || "__none__") ? chipOn : chipOff}
              >
                {s || "Unsorted"}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--border)] px-4 py-8 text-center text-[14px] text-[var(--muted)]">
          No tracks match this filter.
        </p>
      ) : (
        <div className="space-y-10">
          {groupCats.map((c) => {
            const subMap = groups.get(c)!;
            const subOrder = orderBy(SUBCATEGORY_ORDER, [...subMap.keys()]);
            const catCount = [...subMap.values()].reduce((n, a) => n + a.length, 0);
            return (
              <section key={c}>
                <h2 className="mb-4 flex items-center gap-2 border-b border-[var(--border)] pb-2 font-display text-xl font-black tracking-wide text-[var(--text)]">
                  {c}
                  <span className="rounded-full border border-[var(--gold)]/50 px-2 py-0.5 text-[10px] font-black text-[var(--gold)]">
                    {catCount}
                  </span>
                </h2>
                <div className="space-y-5">
                  {subOrder.map((sc) => (
                    <div key={sc || "__unsorted__"}>
                      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                        {sc || "Unsorted"}
                      </h3>
                      <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                        <table className="w-full border-collapse text-left text-[13px]">
                          <tbody>
                            {subMap.get(sc)!.map((s) => (
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

                                  <button
                                    type="button"
                                    onClick={() => setOpenId(openId === s.id ? null : s.id)}
                                    className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]"
                                  >
                                    {openId === s.id ? "Close" : "Edit"}
                                  </button>

                                  {openId === s.id ? (
                                    <form
                                      // Client action: run the server update, then
                                      // close the editor. Fixes the sticky window —
                                      // the panel reliably collapses on Save.
                                      action={async (fd) => {
                                        await updateSound(fd);
                                        setOpenId(null);
                                      }}
                                      className="mt-2 grid gap-2 sm:grid-cols-2"
                                    >
                                      <input type="hidden" name="id" value={s.id} />
                                      <CategorySelect value={s.category || DEFAULT_CATEGORY} />
                                      <SubcategorySelect value={s.subcategory || ""} />
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
                                      <div className="flex items-center gap-2 sm:col-span-2">
                                        <button className="rounded border border-[var(--gold)] bg-[var(--gold)]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)]/20">
                                          Save changes
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setOpenId(null)}
                                          className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </form>
                                  ) : null}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right">
                                  <form
                                    action={async (fd) => {
                                      if (!window.confirm(`Remove "${s.label}" from the library?`)) return;
                                      await deleteSound(fd);
                                    }}
                                    className="inline"
                                  >
                                    <input type="hidden" name="id" value={s.id} />
                                    <button className="rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]">
                                      Delete
                                    </button>
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
