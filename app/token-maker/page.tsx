import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import TokenMaker from "@/components/TokenMaker";

export const metadata = {
  title: "Token Maker — Dungeon Crawler's Companion",
};

export default async function TokenMakerPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <TokenMaker />
    </div>
  );
}
