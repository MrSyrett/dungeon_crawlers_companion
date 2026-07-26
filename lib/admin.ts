// Admins are identified by email through the ADMIN_EMAILS env var — a
// comma-separated list, case-insensitive. This avoids a schema/role change and
// the "who's the first admin" bootstrap problem: set it in the deploy env.
//
// Example:  ADMIN_EMAILS="me@example.com, cogm@example.com"
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.trim().toLowerCase());
}
