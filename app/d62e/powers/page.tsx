import { redirect } from "next/navigation";

// Magic, Psionics and Superpowers now live on /d62e/traits, titled "Options".
//
// This page was never listed in components/navConfig.ts, so it was unreachable
// through the UI — and it was the only page carrying the `magic` and `psionic`
// kinds, which made that content invisible rather than merely duplicated. Kept as
// a redirect rather than deleted so any bookmark or pasted link still lands on
// the content it was pointing at.
export default function D62ePowersRedirect() {
  redirect("/d62e/traits");
}
