import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DccOptions from "@/components/DccOptions";

export const dynamic = "force-dynamic";

export default async function DccOptionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Options" subtitle={<>Deities · Debuffs · Buffs · Experiences · Backgrounds</>} />

      <DccOptions />
    </div>
  );
}
