import type { Metadata } from "next";
import { Cinzel, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import PullToRefresh from "@/components/PullToRefresh";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PullToRefresh />
        {children}
      </body>
    </html>
  );
}
