import type { Metadata } from "next";
import {
  Cinzel,
  Barlow_Condensed,
  UnifrakturMaguntia,
  IM_Fell_English,
  Montserrat,
  EB_Garamond,
  Anton,
} from "next/font/google";
import "./globals.css";
import PullToRefresh from "@/components/PullToRefresh";
import SiteNav from "@/components/SiteNav";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getHiddenSystemKeys } from "@/lib/systems";
import type { SystemKey } from "@/components/systemStore";

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
// ---------------------------------------------------------------------------
const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const imFell = IM_Fell_English({
  variable: "--font-imfell",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

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
      className={`${cinzel.variable} ${barlow.variable} ${unifraktur.variable} ${imFell.variable} ${montserrat.variable} ${ebGaramond.variable} ${anton.variable} h-full antialiased`}
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
