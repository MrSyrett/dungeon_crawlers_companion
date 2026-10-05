// Every Google-hosted face the site uses. The single source of truth for
// scripts/fetch-fonts.mjs, which downloads them into public/fonts/google/ and
// writes the @font-face block in public/tokens.css.
//
// WHY SELF-HOST
// Standalone tool pages (character sheets, prep builders, the GM Screen, the Map
// Maker) can't use next/font, so until now each one fetched its type from Google
// at runtime: three separate render-blocking stylesheets to fonts.googleapis.com
// (the template's own faces, the injected navbar's Geist, and the system skin's
// faces), then a second origin handshake to fonts.gstatic.com for the woff2 files
// themselves. With font-display:swap the page painted in a fallback and visibly
// re-typeset about a second later. Serving these ourselves collapses all of that:
// the @font-face rules ride along in tokens.css, which every tool page already
// loads, and the files come from our own origin with a year-long immutable cache
// (next.config.ts already does that for /fonts/:path*).
//
// It also ends the build failures. app/layout.tsx asked next/font/google for 111
// faces, and next/font fetches each family's CSS from Google AT BUILD TIME;
// roughly one build in a handful got back a URL shape Turbopack can't parse and
// died (vercel/next.js#99114 — it took out two deploys in a day, first on IBM Plex
// Sans, then on Mulish, which is why scripts/build-with-retry.mjs exists). Once
// layout.tsx reads these files from disk with next/font/local, the build stops
// talking to Google at all and that whole class of failure goes away.
//
// HOW THIS LIST WAS BUILT
// The union of the three places that asked Google for type:
//   1. app/layout.tsx          — the next/font/google calls
//   2. lib/minibar.ts          — THEME_FONTS plus the base Geist pair
//   3. tools/templates/*.html  — each template's own <link> in <head>
// The weights are a union, so a few families carry more than any one source asked
// for: the templates wanted Barlow Condensed 800/900 and Cinzel 600/800 that
// layout.tsx didn't, and Barlow (not Barlow Condensed) was only ever in the
// templates. Latin only, matching the subsets:["latin"] layout.tsx already used.
//
// NOT IN HERE: the faces that aren't on Google and were already self-hosted —
// JSL Blackletter, the old newspaper type, Dreadful, Ghostbusters, Marvel, DnDC.
// They keep their own @font-face in public/tokens.css and app/globals.css.
//
// The ONE deliberate exception to self-hosting: the standalone HTML each prep
// builder exports keeps its Google <link>. That file is saved and opened outside
// the app — often from the filesystem — where a /fonts/... path cannot resolve.
//
// ADDING A FACE: add it here, run `npm run fonts:fetch`, commit what lands in
// public/fonts/google/ along with the regenerated block in public/tokens.css.
// `node scripts/check-fonts.mjs` fails if anything references a family with no
// declared face, or if a tool page still points at fonts.googleapis.com.

/** family -> { normal: [weights], italic: [weights] } */
export const FAMILIES = {
  "Anton": { normal: [400] },
  "Archivo": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Archivo Black": { normal: [400] },
  "Archivo Narrow": { normal: [500, 600, 700], italic: [400, 500, 600, 700] },
  "Asap": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Barlow": { normal: [400, 500, 600, 700], italic: [400] },
  "Barlow Condensed": { normal: [400, 600, 700, 800, 900] },
  "Cinzel": { normal: [600, 700, 800, 900] },
  "Cormorant Garamond": { normal: [500, 600, 700], italic: [400, 500, 600, 700] },
  "EB Garamond": { normal: [400, 600], italic: [400, 600] },
  "Figtree": { normal: [400, 600, 700], italic: [400, 600, 700] },
  // Fraunces carries an optical-size axis as well as weight, and the css2 API
  // wants every axis it is asked about listed alphabetically. `axis` is used
  // verbatim when present — this is the same shape next/font was requesting.
  "Fraunces": {
    normal: [500, 700], italic: [400, 500, 700],
    axis: "ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,700",
  },
  "Geist": { normal: [400, 500, 700, 900] },
  "Geist Mono": { normal: [400, 500] },
  "IBM Plex Sans": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Libre Franklin": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Lilita One": { normal: [400] },
  "Lora": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "MedievalSharp": { normal: [400] },
  "Montserrat": { normal: [400, 500, 600, 700, 800, 900], italic: [400] },
  "Mulish": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Nunito": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Oswald": { normal: [500, 600, 700] },
  "Permanent Marker": { normal: [400] },
  "Rubik": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Russo One": { normal: [400] },
  "Saira": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "Saira Condensed": { normal: [500, 600, 700] },
  "Share Tech Mono": { normal: [400] },
  "Source Sans 3": { normal: [400, 600, 700], italic: [400, 600, 700] },
  "UnifrakturMaguntia": { normal: [400] },
};

// Only the Latin block of each css2 response is kept — same coverage as the
// subsets:["latin"] that layout.tsx already asked for.
export const SUBSET = "latin";

// Where the files land, and the URL prefix they are served from. next.config.ts
// already caches /fonts/:path* for a year as immutable, so this gets that for free.
export const OUT_DIR = "public/fonts/google";
export const URL_PREFIX = "/fonts/google";

// The generated @font-face rules are written into public/tokens.css between these
// two markers, because every standalone tool page already loads that file — so the
// declarations cost no extra request at all. Nothing outside the markers is touched.
export const CSS_FILE = "public/tokens.css";
export const BEGIN_MARK = "/* ===== BEGIN GENERATED GOOGLE FACES — npm run fonts:fetch ===== */";
export const END_MARK = "/* ===== END GENERATED GOOGLE FACES ===== */";

/** "Share Tech Mono" -> "share-tech-mono" */
export function slug(family) {
  return family.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** The filename for one face. A variable file covering a weight range is "-var". */
export function faceFile(family, weight, italic) {
  const w = typeof weight === "string" && weight.includes(" ") ? "var" : String(weight);
  return `${slug(family)}-${w}${italic ? "-italic" : ""}.woff2`;
}

/** Every (family, style, weight) the manifest asks for, flattened. */
export function allFaces() {
  const out = [];
  for (const [family, spec] of Object.entries(FAMILIES)) {
    for (const weight of spec.normal ?? []) out.push({ family, weight, italic: false });
    for (const weight of spec.italic ?? []) out.push({ family, weight, italic: true });
  }
  return out;
}

/** The css2 URL for one family, in the shape the Google API expects. */
export function css2Url(family, spec) {
  const name = family.replace(/ /g, "+");
  if (spec.axis) return `https://fonts.googleapis.com/css2?family=${name}:${spec.axis}&display=swap`;
  const normal = (spec.normal ?? []).slice().sort((a, b) => a - b);
  const italic = (spec.italic ?? []).slice().sort((a, b) => a - b);
  let axis;
  if (italic.length) {
    const tuples = [
      ...normal.map((w) => `0,${w}`),
      ...italic.map((w) => `1,${w}`),
    ];
    axis = `ital,wght@${tuples.join(";")}`;
  } else {
    axis = `wght@${normal.join(";")}`;
  }
  return `https://fonts.googleapis.com/css2?family=${name}:${axis}&display=swap`;
}
