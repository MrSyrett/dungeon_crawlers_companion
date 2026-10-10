import type { Metadata, Viewport } from "next";
import { APP_BG } from "@/lib/chrome";
import {
  Geist,
  Geist_Mono,
  Cinzel,
  Barlow_Condensed,
  Montserrat,
  EB_Garamond,
  Anton,
  Share_Tech_Mono,
  Archivo_Black,
  Libre_Franklin,
  Oswald,
  Source_Sans_3,
  Lilita_One,
  Nunito,
  Mulish,
  Saira_Condensed,
  Saira,
  Asap,
  Cormorant_Garamond,
  Lora,
  Fraunces,
  Figtree,
  Permanent_Marker,
  Archivo,
  Archivo_Narrow,
  IBM_Plex_Sans,
  Russo_One,
  Rubik,
} from "next/font/google";
import "./globals.css";
import PullToRefresh from "@/components/PullToRefresh";
import SiteNav from "@/components/SiteNav";
import { SYSTEMS, DEFAULT_SYSTEM } from "@/components/systemStore";
import { pathSystemTable, CHROME_PREFIXES } from "@/components/navConfig";
import { readSystemCookie, readViewCookie } from "@/lib/system-cookie";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getHiddenSystemKeys } from "@/lib/systems";
import type { SystemKey } from "@/components/systemStore";

// ---------------------------------------------------------------------------
// The site's own pair. Geist and Geist Mono carry every surface that is about
// the app rather than about one game — the navbar, the campaign list, OBR, the
// Token Maker, admin, and any system that has no skin yet. They are here rather
// than among the theme faces below because they are the default, not a skin.
// ---------------------------------------------------------------------------
const geist = Geist({
  variable: "--font-chrome",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-chrome-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// ---------------------------------------------------------------------------
// Per-system theme faces (app/globals.css picks one pair per data-system).
// next/font self-hosts and subsets these at build time, so there is no runtime
// request to Google and no render-blocking stylesheet. A browser only fetches
// a face when something on screen actually uses it, so a reader on a
// Shadowdark page never downloads the Marvel or D&D faces.
//
// Shadowdark's two display faces aren't here: they are JSL Blackletter and the
// old newspaper type, which aren't on Google at all. They're served from
// /fonts and declared with @font-face at the top of app/globals.css.
// ---------------------------------------------------------------------------
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// The label face: DCC's stat keys and eyebrow lines are set in it on the
// covers and in the sheets, which already load it.
const shareTech = Share_Tech_Mono({
  variable: "--font-sharetech",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Star Wars. The 1977 logo was drawn from Helvetica Black and the opening
// crawl is a Franklin/News Gothic grotesque; these are the open-licence
// equivalents of both. Archivo Black ships at one weight only.
//
// --font-archivo-BLACK, not --font-archivo. It carried the plain name until
// 2026-10-07, and so did the `Archivo` call further down this file — two
// different faces writing one custom property, both classes on the same <html>
// element (see the className below). Same specificity, same element, so whichever
// rule Next emitted later simply won, and Archivo is declared second: Star Wars'
// headings were rendering in regular Archivo at 400 and its whole display
// identity — the thing this comment describes — was not happening. The
// `"Archivo Black"` fallback in the globals.css stack never rescued it either,
// because a fallback is only reached when the var resolves to nothing, and this
// one resolved to a real family.
//
// The two cannot share a token: ICRPG spends the regular on --sys-text and
// --sys-label, i.e. body copy, which needs the 600/700 and the italics that
// Archivo Black does not have. --font-archivo-narrow (Year Zero, below) was
// already separate; this is the one that was missed.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Marvel. A condensed gothic for headings, the way a comic caption box is
// lettered, with a plain workhorse underneath for rules text. Oswald has no
// italic on Google, which is why the italics below belong to Source Sans.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sourcesans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ACE!. The Awfully Cheerful Engine is an action-COMEDY game — its publisher
// calls it a love letter to West End Games' Ghostbusters, Dangermouse and
// TMNT — so this pair is chunky and round, a Saturday-morning cartoon rather
// than a comic. Lilita One ships at one weight only.
const lilitaOne = Lilita_One({
  variable: "--font-lilita",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Kids on Bikes. The display face is Dreadful, served from /fonts rather than
// here — see the @font-face at the top of globals.css. Mulish is the body:
// round and warm, a kid's paperback rather than a manual.
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// D6 System 2e. One superfamily at two widths, because a genre-agnostic
// system shouldn't borrow a genre's typeface. Saira Condensed has no italic,
// which is why the italics come from Saira.
const sairaCond = Saira_Condensed({
  variable: "--font-saira-cond",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Ghostbusters. The logo face is served from /fonts and used on h1 only; Anton
// (already loaded above for Dungeon Crawler Carl) carries h2 and h3, and Asap
// is the body — a slightly rounded grotesque: official, but not solemn.
const asap = Asap({
  variable: "--font-asap",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Candela Obscura. Gaslamp horror is set in the type of an 1890s calling card:
// a high-contrast Garamond revival with hairline serifs, over a warm book
// serif that still holds at body size, which Cormorant does not.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Nimble. Modern heroic fantasy that is briskly designed rather than antiqued:
// a contemporary variable serif with some swagger over a clean geometric.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Index Card RPG. Permanent Marker is not a stylistic flourish — Hankerin
// Ferinale draws the whole book in marker on 3x5 cards. Archivo underneath
// keeps the marker a voice rather than the page.
const permanentMarker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Year Zero Engine. Free League's house look is condensed caps over a neutral
// sans; Plex carries the technical edge the cyan already implies without
// tipping into a novelty terminal face.
const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Justice League Unlimited. Bruce Timm's design language is flat, geometric
// and squared off — heavy confident shapes, no texture, no gradient.
const russoOne = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dungeon Crawler's Companion",
  description: "TTRPG digital toolkit — character sheets and adventure prep, saved to your account.",
  // app/manifest.ts generates this; the link tag is what lets Android offer to
  // install, and it carries display:standalone for browsers that read it.
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    // The label under the home-screen icon. Without this iOS uses `title`, which
    // truncates to something like "Dungeon Crawler'…". Nothing else about the
    // icon needs code — `app/apple-icon.png` is a Next file convention and the
    // <link rel="apple-touch-icon"> tag is emitted automatically.
    title: "DCCompanion",
    // THIS is the switch. It emits <meta name="apple-mobile-web-app-capable">,
    // and on iOS that is what makes a Home Screen launch open in its own window
    // with no address bar and no bottom toolbar — a real app shell rather than a
    // Safari tab wearing an icon. It changes nothing for ordinary browsing.
    //
    // Two consequences to keep in mind:
    //   - No browser Back button. Every route must be escapable through the
    //     site's own chrome (SiteNav / the mini-bar), which is the case today.
    //   - An icon already on the Home Screen keeps the mode it was added with,
    //     so this only shows up after removing and re-adding it.
    capable: true,
    // Opaque black, NOT "black-translucent". Translucent would run the page up
    // under the clock and battery, and the navbar is position:fixed at top:0 —
    // it would slide underneath unless everything gained a safe-area inset.
    // Opaque keeps the content starting below the status bar, so no layout
    // anywhere has to change.
    statusBarStyle: "black",
  },
};

// Separate from `metadata` because Next 13.4+ wants it that way. themeColor is
// the app's ground, so the status bar agrees with the page instead of flashing
// white on launch. It comes from lib/chrome.ts rather than being written inline:
// this value is handed to the browser, not to CSS, so it cannot be a token — but
// it can at least have one home. (scripts/check-theme-tokens.mjs fails the build
// on a hex literal under app/, and it was right to.)
//
// viewportFit is deliberately left at its default. Setting "cover" would extend
// the page into the home-indicator area and make env(safe-area-inset-bottom)
// non-zero, which every bottom-docked thing — the prep builders' grab bar above
// all — would then have to account for. Letting iOS inset the viewport itself
// costs a few px at the bottom and keeps all of that unnecessary.
//
// FIXED SIZE ON MOBILE. The site should behave like an app, not a zoomable
// document: no pinch, no double-tap magnify, no half-scrolled-sideways page after
// a stray gesture. Two things are needed and only one of them is here.
//
//   * Double-tap zoom is killed in CSS, by `touch-action: manipulation` on <html>
//     in app/globals.css (and public/tokens.css for the standalone surfaces).
//     That half works in every browser, in a tab or on the Home Screen.
//   * Pinch zoom is killed by maximumScale/userScalable below — but iOS Safari
//     IGNORES both in a normal browser tab. Apple removed the override in iOS 10
//     on accessibility grounds and has not brought it back. They ARE honoured in
//     standalone (Home Screen) mode, which app/manifest.ts now asks for, and
//     Android Chrome honours them everywhere.
//
// So: in Safari, the lock takes effect on the Home Screen icon and not in a tab.
// That is the platform's decision, not a bug here, and it is the reason the CSS
// half is worth having on its own.
//
// Next merges `viewport` from the root down, so a route that genuinely needs
// zoom — Token Maker, the VTT, Map Maker — exports its own with userScalable
// back on. Those exports set the fields EXPLICITLY rather than omitting them,
// because an omitted field inherits.
export const viewport: Viewport = {
  themeColor: APP_BG,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Signed-in state drives the site-wide navbar. Fail open: if auth or the
  // settings read ever throws, render the page without a nav rather than 500
  // every route.
  let email: string | null = null;
  let isAdmin = false;
  let hiddenKeys: SystemKey[] = [];
  try {
    const user = await getCurrentUser();
    if (user) {
      email = user.email;
      isAdmin = isAdminEmail(user.email);
      hiddenKeys = await getHiddenSystemKeys();
    }
  } catch {
    email = null;
  }
  const [initialSystem, initialView] = await Promise.all([readSystemCookie(), readViewCookie()]);

  // THEME BEFORE FIRST PAINT. SiteNav sets data-system / --sys / data-chrome on
  // <html> from an effect, i.e. after hydration, so every hard load painted the
  // default look and then re-painted in the user's system — the "Shadowdark
  // flash" from the 2026-10-10 audit. This inline script runs as the body
  // starts parsing, before anything is painted, and sets the same three things
  // from the same inputs (stored system, hidden systems, the path→system
  // table, the chrome prefixes). SiteNav's effect then finds them already set.
  const visibleSystems = SYSTEMS.filter((s) => !hiddenKeys.includes(s.key));
  const themeBoot = {
    accents: Object.fromEntries(SYSTEMS.map((s) => [s.key, s.accent])),
    hidden: hiddenKeys,
    first: (visibleSystems[0] ?? SYSTEMS[0]).key,
    fallback: initialSystem ?? DEFAULT_SYSTEM,
    paths: pathSystemTable(),
    chrome: CHROME_PREFIXES,
  };
  const themeScript = `(function(){try{var B=${JSON.stringify(themeBoot)};var k=null;try{k=localStorage.getItem("dcw_system")}catch(e){}if(!k||!B.accents[k])k=B.fallback;if(B.hidden.indexOf(k)>=0)k=B.first;var p=location.pathname,ps=B.paths.exact[p]||null;if(!ps){for(var i=0;i<B.paths.prefixes.length;i++){if(p.indexOf(B.paths.prefixes[i].prefix)===0){ps=B.paths.prefixes[i].key;break}}}if(ps&&B.hidden.indexOf(ps)<0)k=ps;var chrome=p==="/"||B.chrome.some(function(c){return p===c||p.indexOf(c+"/")===0});var r=document.documentElement;r.dataset.system=k;r.style.setProperty("--sys",B.accents[k]);if(chrome)r.dataset.chrome="1"}catch(e){}})();`;

  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${cinzel.variable} ${barlow.variable} ${montserrat.variable} ${ebGaramond.variable} ${anton.variable} ${shareTech.variable} ${archivoBlack.variable} ${libreFranklin.variable} ${oswald.variable} ${sourceSans.variable} ${lilitaOne.variable} ${nunito.variable} ${mulish.variable} ${sairaCond.variable} ${saira.variable} ${asap.variable} ${cormorant.variable} ${lora.variable} ${fraunces.variable} ${figtree.variable} ${permanentMarker.variable} ${archivo.variable} ${archivoNarrow.variable} ${plexSans.variable} ${russoOne.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PullToRefresh />
        {email ? (
          <SiteNav email={email} isAdmin={isAdmin} hiddenKeys={hiddenKeys} initialSystem={initialSystem} initialView={initialView} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
