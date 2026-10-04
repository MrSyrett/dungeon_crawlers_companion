"use client";
import { useEffect, useRef } from "react";
import { facetMatch, type Facets, type FilterState } from "@/lib/facets";

// Instant filtering for the compendium pages.
//
// The page (a server component) renders EVERY entry once, with the filters in
// the URL already applied as `hidden`, and wraps the chips + search + count +
// list in this. From then on a chip click or a keystroke in the search box is
// handled here: entries are shown/hidden in place, the count and chip states
// update, and the URL is rewritten with replaceState — no server round-trip,
// no re-render, no spinner. The chips keep real hrefs, so a middle-click, a
// copied link or a no-JS visit still works through the server.
//
// Everything is wired by data attributes (see each system's *Ref.tsx):
//   [data-chip="param:value"]       a chip (value "" = All / default)
//   [data-chiprow] data-base/-on/-off  the chip row, with its class lists
//   form[data-search] input[name=q] the search box
//   [data-count] data-noun=".."     "N nouns" line (data-plural overrides noun+"s")
//   [data-clear]                    "Clear filters" links
//   [data-empty]                    the empty state
//   [data-section]                  a group of entries with its own heading (hidden when all its entries are)
//   [data-when="param:value"]       a panel shown only while that param has that
//                                   value (the page must also render its own
//                                   initial `hidden`, as it does for entries —
//                                   nothing is applied until the first click)
//   [data-f='{...}'] data-s=".."    an entry: its facets (lib/facets) and extra search text
export default function InstantFilter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // `state`: the params the chips and search box control (from the URL);
    // `extra`: any other URL param (a view mode, say) — carried through
    // untouched in every href this writes, never tested against the entries.
    // Every param a chip controls, and the values its chips actually offer. The
    // pages validate their params against the same option lists before
    // filtering, so a hand-typed `?cr=bogus` is ignored server-side; honouring
    // it here would hide every entry the moment this hydrated. Unknown values
    // are therefore dropped, not carried.
    const params = new Set<string>(["q"]);
    const known: Record<string, Set<string>> = {};
    root.querySelectorAll<HTMLElement>("[data-chip]").forEach((c) => {
      const spec = c.dataset.chip || "", i = spec.indexOf(":");
      const p = spec.slice(0, i);
      params.add(p);
      (known[p] || (known[p] = new Set<string>())).add(spec.slice(i + 1));
    });
    const state: FilterState = {}, extra: FilterState = {};
    try {
      new URL(location.href).searchParams.forEach((v, k) => {
        if (!v || k === "m") return;
        if (!params.has(k)) { extra[k] = v; return; }
        if (k === "q" || (known[k] && known[k].has(v))) state[k] = v;
      });
    } catch { /* ignore */ }
    const facets = new WeakMap<HTMLElement, Facets>();
    const texts = new WeakMap<HTMLElement, string>();
    let timer: ReturnType<typeof setTimeout> | null = null;

    function hrefFor(patch: FilterState): string {
      const sp = new URLSearchParams();
      const next = { ...extra, ...state, ...patch };
      for (const k in next) if (next[k]) sp.set(k, next[k] as string);
      const s = sp.toString();
      return s ? `${location.pathname}?${s}` : location.pathname;
    }

    function apply() {
      const q = (state.q || "").trim().toLowerCase();
      let shown = 0;
      root!.querySelectorAll<HTMLElement>("[data-f]").forEach((el) => {
        let f = facets.get(el);
        if (!f) { try { f = JSON.parse(el.dataset.f || "{}") as Facets; } catch { f = {}; } facets.set(el, f); }
        let ok = facetMatch(f, state);
        if (ok && q) {
          let s = texts.get(el);
          if (s == null) { s = ((el.dataset.s || "") + " " + (el.textContent || "")).toLowerCase(); texts.set(el, s); }
          ok = s.includes(q);
        }
        el.hidden = !ok;
        if (ok) shown++;
      });
      root!.querySelectorAll<HTMLElement>("[data-section]").forEach((sec) => {
        sec.hidden = !Array.prototype.some.call(sec.querySelectorAll<HTMLElement>("[data-f]"), (el: HTMLElement) => !el.hidden);
      });
      let any = !!q; // is any chip- or search-controlled filter set? (a view-mode param doesn't count)
      root!.querySelectorAll<HTMLElement>("[data-chip]").forEach((el) => {
        const spec = el.dataset.chip || "", i = spec.indexOf(":");
        const p = spec.slice(0, i), v = spec.slice(i + 1);
        const row = el.closest<HTMLElement>("[data-chiprow]");
        if (state[p]) any = true;
        const on = (state[p] || "") === v;
        if (row) el.className = `${row.dataset.base || ""} ${on ? row.dataset.on || "" : row.dataset.off || ""}`;
        el.setAttribute("aria-pressed", on ? "true" : "false");
        el.setAttribute("href", hrefFor({ [p]: v }));
      });
      // Panels tied to one chip value (a family blurb, a per-book note): shown
      // only while that param holds that value, so they can't go stale behind a
      // chip click the way a server-rendered one would.
      root!.querySelectorAll<HTMLElement>("[data-when]").forEach((el) => {
        const spec = el.dataset.when || "", i = spec.indexOf(":");
        el.hidden = (state[spec.slice(0, i)] || "") !== spec.slice(i + 1);
      });
      root!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const noun = el.dataset.noun || "entry";
        el.textContent = `${shown} ${shown === 1 ? noun : el.dataset.plural || noun + "s"}`;
      });
      root!.querySelectorAll<HTMLElement>("[data-clear]").forEach((el) => { el.hidden = !any; });
      root!.querySelectorAll<HTMLElement>("[data-empty]").forEach((el) => { el.hidden = shown > 0; });
      try { history.replaceState(history.state, "", hrefFor({})); } catch { /* ignore */ }
    }

    function set(p: string, v: string) { if (v) state[p] = v; else delete state[p]; apply(); }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const t = e.target as Element | null;
      const chip = t && t.closest<HTMLElement>("[data-chip]");
      if (chip && root!.contains(chip)) {
        e.preventDefault();
        const spec = chip.dataset.chip || "", i = spec.indexOf(":");
        set(spec.slice(0, i), spec.slice(i + 1));
        return;
      }
      const clear = t && t.closest<HTMLElement>("[data-clear]");
      if (clear && root!.contains(clear)) {
        e.preventDefault();
        for (const k in state) delete state[k]; // only chip/search params live here; `extra` (a view mode) stays
        root!.querySelectorAll<HTMLInputElement>("form[data-search] input[name=q]").forEach((inp) => { inp.value = ""; });
        apply();
      }
    }
    function onSubmit(e: Event) {
      const form = e.target as HTMLFormElement | null;
      if (!form || !form.matches("form[data-search]")) return;
      e.preventDefault();
      if (timer) { clearTimeout(timer); timer = null; }
      const inp = form.querySelector<HTMLInputElement>("input[name=q]");
      set("q", inp ? inp.value.trim() : "");
    }
    function onInput(e: Event) {
      const inp = e.target as HTMLInputElement | null;
      if (!inp || !inp.matches("form[data-search] input[name=q]")) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => { timer = null; set("q", inp.value.trim()); }, 120);
    }

    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("input", onInput);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("submit", onSubmit);
      root.removeEventListener("input", onInput);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
