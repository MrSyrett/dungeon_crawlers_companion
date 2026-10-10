import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { login } from "@/app/actions/auth";
import { safeNext } from "@/lib/safe-next";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  // An invite link (/join/<code>) sends a signed-out player here with ?next=
  // so they land back on the invite after signing in, not on the dashboard.
  const next = safeNext((await searchParams).next);
  if (await getCurrentUser()) redirect(next);
  return <AuthForm mode="login" action={login} next={next === "/dashboard" ? undefined : next} />;
}
