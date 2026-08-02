import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { resetPassword } from "@/app/actions/password-reset";
import { userIdForResetToken } from "@/lib/password-reset";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  // Check validity up front so an expired/garbage link shows a clear message
  // instead of a form that will only fail on submit. (This does not consume it.)
  const valid = token ? (await userIdForResetToken(token)) !== null : false;

  return <ResetPasswordForm token={token ?? ""} valid={valid} action={resetPassword} />;
}
