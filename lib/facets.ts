// Client-side filtering for the compendium pages (see components/InstantFilter).
//
// A page renders EVERY entry and gives each one a small "facets" object — the
// values its filter chips test against — serialised into a `data-f` attribute.
// Both the server (for the initial `hidden` state of each entry, so a deep link
// paints correctly with no flash) and the client (on every chip click, with no
// round-trip) decide an entry's visibility with the same function, so they can
// never disagree.
//
//   facets:  { group: "Beasts", cr: "1/4", src: "book", cls: ["Bard","Wizard"] }
//   state:   { group: "Beasts", cls: "Bard" }       (URL params, "" = not set)
//
// A facet matches when it equals the param's value; an ARRAY facet matches when
// it contains the value (a spell castable by several classes). The free-text
// search (`q`) is not a facet — the client searches the entry's text; the page
// applies its own `q` predicate for the initial render.
export type Facets = Record<string, string | number | boolean | null | undefined | (string | number)[]>;
export type FilterState = Record<string, string | undefined>;

export function facetMatch(f: Facets, state: FilterState): boolean {
  for (const k in state) {
    const v = state[k];
    if (!v || k === "q" || k === "m") continue;
    const fv = f[k];
    if (Array.isArray(fv)) { if (!fv.some((x) => String(x) === v)) return false; }
    else if (String(fv ?? "") !== v) return false;
  }
  return true;
}

// The `data-f` attribute value for an entry: only the facets a chip can test,
// kept short (these ride along on every entry of the page).
export function facetAttr(f: Facets): string {
  const out: Facets = {};
  for (const k in f) { const v = f[k]; if (v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && !v.length)) out[k] = v; }
  return JSON.stringify(out);
}
