import { redirect } from "next/navigation";

// Superseded by /d62e/traits ("Options"), which renders the same D62E_PERKS data
// plus superpowers, limitations, magic and psionics, and merges homebrew.
//
// This page was never listed in components/navConfig.ts, and its KIND_INTRO copy
// had drifted out of step with the live page — stating that perks are bought with
// "character points" where Options says "skill dice", and describing assets and
// troubles differently. Anyone who reached it directly got stale rules, which is
// why it is a redirect rather than a second copy kept around.
export default function D62ePerksRedirect() {
  redirect("/d62e/traits");
}
