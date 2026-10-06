// Colours that leave CSS and are handed to the BROWSER or the OS, where a
// var(--token) would resolve to nothing: the iOS status bar tint, the PWA splash
// background, the Android theme colour. Next serialises these into a
// <meta name="theme-color"> tag and into /manifest.webmanifest (JSON), and
// neither understands custom properties.
//
// So they have to be literals — but they only have to be literals ONCE. Keeping
// them here rather than inline in app/ does two things: it gives the value a
// single home the way every colour in this codebase is supposed to have, and it
// keeps scripts/check-theme-tokens.mjs honest. That check scans app/ and
// components/ and fails the build on a hex literal; it caught these three the
// first time they were written inline, which is exactly its job. Silencing it
// with a `theme-literal-ok:` marker would have worked and would have been worse —
// three copies of one colour, free to drift.
//
// KEEP IN STEP WITH `--bg` in app/globals.css (line ~105). There is no way to
// read a CSS custom property at build time, so this is a hand-sync — the same
// deal public/tokens.css has with app/globals.css, and the same discipline:
// change one, change the other.

/** The app's ground. Mirrors `--bg` in app/globals.css. */
export const APP_BG = "#0b0c0e";
