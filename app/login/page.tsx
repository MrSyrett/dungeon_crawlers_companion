import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { login } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return <AuthForm mode="login" action={login} />;
}
