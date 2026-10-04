import type { Metadata } from "next";
import {
  Chivo,
  Chivo_Mono,
  Cinzel,
  Barlow_Condensed,
  Montserrat,
  EB_Garamond,
  Anton,
  Share_Tech_Mono,
} from "next/font/google";
import "./globals.css";
import PullToRefresh from "@/components/PullToRefresh";
import SiteNav from "@/components/SiteNav";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getHiddenSystemKeys } from "@/lib/systems";
import type { SystemKey } from "@/components/systemStore";

// ---------------------------------------------------------------------------
// The site's own pair. Chivo and Chivo Mono carry every surface that is about
// the app rather than about one game — the navbar, the campaign list, OBR, the
// Token Maker, admin, and any system that has no skin yet. They are here rather
// than among the theme faces below because they are the default, not a skin.
// ---------------------------------------------------------------------------
const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
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

export const metadata: Metadata = {
  title: "Dungeon Crawler's Companion",
  description: "TTRPG digital toolkit — character sheets and session prep, saved to your account.",
  // The label under the home-screen icon. Without this iOS uses `title`, which
  // truncates to something like "Dungeon Crawler'…". Nothing else about the
  // icon needs code — `app/apple-icon.png` is a Next file convention and the
  // <link rel="apple-touch-icon"> tag is emitted automatically.
  appleWebApp: {
    title: "DCCompanion",
  },
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

  return (
    <html
      lang="en"
      className={`${chivo.variable} ${chivoMono.variable} ${cinzel.variable} ${barlow.variable} ${montserrat.variable} ${ebGaramond.variable} ${anton.variable} ${shareTech.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PullToRefresh />
        {email ? (
          <SiteNav email={email} isAdmin={isAdmin} hiddenKeys={hiddenKeys} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
