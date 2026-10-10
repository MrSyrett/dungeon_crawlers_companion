// Where to go after signing in. Only a path on this site is honoured (an
// invite link is /join/<code>); anything else — an absolute URL, a
// protocol-relative one, a backslash trick — falls back to the dashboard, so
// the login form can never be used to bounce someone to another site.
// (Lives here rather than in the "use server" actions file, whose every export
// must be a server action.)
export function safeNext(raw: unknown): string {
  const v = typeof raw === "string" ? raw.trim() : "";
  return v.startsWith("/") && !v.startsWith("//") && !v.includes("\\") ? v : "/dashboard";
}
