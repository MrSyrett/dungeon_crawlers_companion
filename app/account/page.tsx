import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { changePassword } from "@/app/actions/change-password";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <ChangePasswordForm email={user.email} action={changePassword} />;
}
