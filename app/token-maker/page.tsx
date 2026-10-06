import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import TokenMaker from "@/components/TokenMaker";

export const metadata = {
  title: "Token Maker — Dungeon Crawler's Companion",
};

// NO viewport export here on purpose. This page inherits the root layout's mobile
// zoom lock like every other route (see app/layout.tsx): the PAGE is a fixed-size
// app surface. Magnifying the crop is the token CANVAS's job, handled inside
// components/TokenMaker.tsx by its own zoom control — not by letting the browser
// scale the whole document, which would move the controls off-screen along with
// the image.
//
// An earlier pass did exempt this route. It was the wrong shape: page zoom and
// canvas zoom look the same for a moment and then diverge, because page zoom
// takes the UI with it.

export default async function TokenMakerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <PageHeader title="Token Maker" subtitle={<>Round VTT Tokens</>} />

      <TokenMaker />
    </div>
  );
}
