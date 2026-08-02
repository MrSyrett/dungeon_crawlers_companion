import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { requestPasswordReset } from "@/app/actions/password-reset";

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm action={requestPasswordReset} />;
}
