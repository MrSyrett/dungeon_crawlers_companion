// Labels + colours for an item's bonuses (the badges), shared by the Homebrew
// item builder and the Loot reference page. The same model as the GM Screen loot
// box and the character sheet: public/tools-data/dcc-bonus.js.

export type DccBonus = { kind: string; target?: string; amount?: number; floor?: boolean };

export function benefitLabel(b: DccBonus): string {
  const n = (v?: number) => ((v ?? 0) >= 0 ? "+" : "") + (v ?? 0);
  switch (b.kind) {
    case "stat": return `${n(b.amount)} ${String(b.target || "").toUpperCase()}`;
    case "allstats": return `${n(b.amount)} All Stats`;
    case "skill": return b.floor ? `${b.target} (Rank = Floor)` : `${n(b.amount)} ${b.target}`;
    case "spell": return `Spell: ${b.target}${b.amount ? ` (Rank ${b.amount})` : ""}`;
    case "buff": return `Buff: ${b.target}`;
    case "dr": return `${n(b.amount)} DR`;
    case "evade": return `${n(b.amount)} Evade`;
    case "move": return `${n(b.amount)} Move`;
    case "step": return `${n(b.amount)} Step`;
    default: return String(b.target || "");
  }
}

export const BADGE_TONE: Record<string, string> = {
  stat: "#4a8fd8", allstats: "#4a8fd8", skill: "#3aa86b", spell: "#9a62d8", buff: "#22a6a6",
  dr: "#c08a2a", evade: "#c08a2a", move: "#c08a2a", step: "#c08a2a", note: "#8a8f98",
};
