"use client";

// ─────────────────────────────────────────────────────────────────────────────
// TemplatePicker — the "Template" button every homebrew builder shows beside
// "+ Add homebrew …" (and inside an open builder for a NEW entry). It opens a
// modal listing every entry of that compendium (search + group filter + a short
// meta line); choosing one hands the entry back to the editor, which turns its
// `data` into a fresh draft through the SAME legacy→draft path it uses to open
// stored records (e.g. `monsterFromData(opt.data)`), names it
// `templateCopyName(opt.name)` and leaves it unsaved (id = null).
//
// `source` is either the list itself (a page passing data it already has) or a
// loader called on first open (preferred for big books: a dynamic `import()`
// keeps the data out of the page payload until someone asks for it). The list
// is cached for the component's lifetime.
//
// The modal is portalled to <body> (PullToRefresh transforms the page wrapper,
// which would trap a `position: fixed` child), so it copies the trigger's
// resolved `--hb-accent` onto itself to keep the system's accent.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

export type TemplateOption = {
  /** Unique within the list (book entries can share a name, e.g. a spell on two class lists). */
  key: string;
  name: string;
  /** Category the modal groups and filters by (the page's own categories). */
  group?: string;
  /** One short line shown under the name (level / cost / tier …). */
  meta?: string;
  /** The entry in the shape the editor's legacy→draft converter reads. */
  data: Record<string, unknown>;
};
export type TemplateSource = TemplateOption[] | (() => Promise<TemplateOption[]>);

/** Default name for a draft started from a template (keeps it from clashing with the original). */
export const templateCopyName = (name: string): string => (name.trim() ? `${name.trim()} (copy)` : "");

const MAX_SHOWN = 3000; // effectively "show everything" — the biggest compendium (D&D spells + equipment) is well under this

const btnDefault =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)] disabled:opacity-50";
const chip = (on: boolean) =>
  `rounded border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
    on
      ? "border-[var(--hb-accent)] bg-[var(--panel-2)] text-[var(--hb-accent)]"
      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--hb-accent)] hover:text-[var(--text)]"
  }`;

export default function TemplatePicker({
  source,
  onPick,
  noun = "entry",
  label = "Template",
  groupLabel = "Category",
  disabled,
  className,
}: {
  source: TemplateSource;
  onPick: (opt: TemplateOption) => void;
  /** Singular noun for the copy ("monster", "spell" …). */
  noun?: string;
  label?: string;
  /** What the groups are ("Type", "Tier", "Category" …) — used for the filter's aria label. */
  groupLabel?: string;
  disabled?: boolean;
  /** Classes for the trigger button, so it matches the host shell's buttons. */
  className?: string;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  // Loaded lists are kept per source, so a new loader (e.g. the editor's own
  // items changed after a save) loads afresh on the next open. Keep a loader's
  // identity stable (useMemo/useCallback) so the cache survives re-renders.
  const [loaded, setLoaded] = useState<{ src: TemplateSource; list: TemplateOption[] } | null>(null);
  const opts = Array.isArray(source) ? source : loaded?.src === source ? loaded.list : null;
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");
  const [accent, setAccent] = useState("");

  async function show() {
    if (trigger.current) setAccent(getComputedStyle(trigger.current).getPropertyValue("--hb-accent").trim());
    setQ("");
    setGroup("");
    setErr("");
    setOpen(true);
    if (!opts && typeof source === "function") {
      try {
        const list = await source();
        setLoaded({ src: source, list });
      } catch {
        setErr("Couldn't load the list — try again.");
      }
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => search.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const groups = useMemo(() => {
    const seen: string[] = [];
    for (const o of opts ?? []) if (o.group && !seen.includes(o.group)) seen.push(o.group);
    return seen;
  }, [opts]);

  const filtered = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return (opts ?? []).filter((o) => {
      if (group && o.group !== group) return false;
      if (!words.length) return true;
      const hay = `${o.name} ${o.meta ?? ""} ${o.group ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [opts, q, group]);

  // Grouped in the list's own group order (the source decides the order).
  const sections = useMemo(() => {
    const shown = filtered.slice(0, MAX_SHOWN);
    const out: { group: string; items: TemplateOption[] }[] = [];
    for (const o of shown) {
      const g = o.group ?? "";
      let sec = out.find((x) => x.group === g);
      if (!sec) out.push((sec = { group: g, items: [] }));
      sec.items.push(o);
    }
    return out;
  }, [filtered]);

  function pick(o: TemplateOption) {
    setOpen(false);
    onPick(o);
  }

  const an = /^[aeiou]/i.test(noun) ? "an" : "a";
  const style = accent ? ({ "--hb-accent": accent } as CSSProperties) : undefined;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={className ?? btnDefault}
        disabled={disabled}
        onClick={show}
        title={`Start a new homebrew ${noun} from an existing one`}
      >
        {label}
      </button>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 py-6 sm:py-12"
              style={style}
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setOpen(false);
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Choose ${an} ${noun} template`}
                className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] shadow-2xl"
              >
                <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
                  <div className="min-w-0">
                    <div className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--hb-accent)]">Start from a template</div>
                    <p className="mt-0.5 text-[12px] text-[var(--muted)]">
                      Pick {an} {noun} — its details fill a new homebrew {noun} you can edit before saving.
                    </p>
                  </div>
                  <button type="button" className={btnDefault} onClick={() => setOpen(false)} aria-label="Close">
                    ✕
                  </button>
                </div>
                <div className="flex flex-col gap-2 border-b border-[var(--border)] px-4 py-3">
                  <input
                    ref={search}
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={`Search ${noun} templates…`}
                    className="w-full rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--hb-accent)]"
                  />
                  {groups.length > 1 ? (
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label={groupLabel}>
                      <button type="button" className={chip(group === "")} onClick={() => setGroup("")}>
                        All
                      </button>
                      {groups.map((g) => (
                        <button key={g} type="button" className={chip(group === g)} onClick={() => setGroup(group === g ? "" : g)}>
                          {g}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  <div className="text-[11px] text-[var(--muted)]">
                    {opts === null && !err
                      ? "Loading…"
                      : `${filtered.length} ${filtered.length === 1 ? noun : "matches"}${filtered.length > MAX_SHOWN ? ` — showing the first ${MAX_SHOWN}, refine the search` : ""}`}
                  </div>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
                  {err ? <p className="px-2 py-3 text-[13px] text-[var(--red)]">{err}</p> : null}
                  {opts !== null && !filtered.length ? (
                    <p className="px-2 py-3 text-[13px] text-[var(--muted)]">Nothing matches.</p>
                  ) : null}
                  {sections.map((sec) => (
                    <div key={sec.group || "_"} className="mb-2">
                      {sec.group && groups.length > 1 && !group ? (
                        <div className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{sec.group}</div>
                      ) : null}
                      <ul>
                        {sec.items.map((o) => (
                          <li key={o.key}>
                            <button
                              type="button"
                              onClick={() => pick(o)}
                              className="flex w-full flex-col rounded px-2 py-1.5 text-left hover:bg-[var(--panel-2)] focus:bg-[var(--panel-2)] focus:outline-none"
                            >
                              <span className="text-sm font-semibold text-[var(--text)]">{o.name}</span>
                              {o.meta ? <span className="line-clamp-1 text-[11px] text-[var(--muted)]">{o.meta}</span> : null}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
