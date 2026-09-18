// GENERATED FILE - do not edit by hand.
// Source: data/jlu/parts/*.json - regenerate with: node scripts/build-jlu-data.mjs

import type { JluRule } from "./jlu-types";

export const JLU_RULES = [
  {
    "key": "test",
    "title": "The Test",
    "order": 1,
    "body": "The core mechanic is a d20 roll: Test Result = 1d20 + relevant Attribute + other bonuses (powers, abilities, equipment). Compare it to a target number the Editor sets, called Tension. Players never ask for Tests — they propose an action and the Editor decides the Test and Attribute. Advantage: roll two dice, keep the better (extra Advantages give +2 each instead of more dice). Disadvantage: roll two, keep the worse. Advantage and Disadvantage cancel. Sometimes a 1d3 is used (a halved d6)."
  },
  {
    "key": "tiers",
    "title": "Tiers",
    "order": 2,
    "body": "Every hero, villain and danger has a Tier from E to S (value 0 to 5). Tier sets your baseline Attributes, PAX, Resolve, Defense, Attack Bonus, Damage Die, and the caps on Attributes and Power Grades. Some abilities give a bonus 'equal to your Tier.' The Quickstart covers Tiers D (Year One) and C (Local Hero)."
  },
  {
    "key": "pax",
    "title": "PAX & Advancement",
    "order": 3,
    "body": "PAX is the currency used to build and improve a Hero. Attribute Increase: 5 PAX per +3 (Attributes rise in multiples of 3). Power Purchase: variable (each power lists a PAX-per-Grade cost; buying Grade 2 costs twice that). Traits: 4 to 12 PAX. Knowledge: 4 PAX. Increase Resolve: 2 PAX per 1 point. Buying powers outside your Origin's Power Kit costs double PAX per Grade (Humans cannot buy outside their kit at all). You earn more PAX (Ascension Points) as the campaign progresses."
  },
  {
    "key": "resolve",
    "title": "Resolve & Conditions",
    "order": 4,
    "body": "Resolve is both your stamina/health and the energy that fuels your powers — it equals your Tier base value plus your Spirit. Taking hits drains it; activating powers spends it (minimum 1 Resolve per activation). Each Hero has 5 Condition boxes: when Resolve runs out — or when a single hit deals 10+ damage (your choice) — you mark a Condition. The track is Tired → Scratched (-2 to d20) → Injured (-4) → Wounded (Disadvantage) → Defeated (out of action). Villains have 7 Condition boxes; Tier C threats have 4; a Minion falls to any damage."
  },
  {
    "key": "combat",
    "title": "Combat Values",
    "order": 5,
    "body": "Attackers roll against your Defense (a Tier base + modifiers). Defensive reactions: Block = base + Resistance (+ mods), Dodge = base + Agility (+ mods). Attack Bonus = base + Accuracy (+ mods). Damage = your Damage Die (d6 → d8 → d12, stepping up via effects) + Potency or Spirit, reduced by the target's Damage Reduction (DR). Ranges are relative: Adjacent, Close, Near, Far, Distant. On a big success (a 'Splash Page') many powers add a status effect."
  },
  {
    "key": "plot-points",
    "title": "Plot Points",
    "order": 6,
    "body": "Plot Points let players bend fate. Everyone starts with 0 and earns them for outrageous comic-book stunts (Editor's discretion). Spend one to: Guarantee Success (turn a failure into a spectacular success, or +5 before rolling); Plot Armor (completely negate an attack or effect targeting you); Rewrite the Script/Retcon ('I prepared for this', 'Luckily, I know someone', or 'Wait, I know their weakness!'); Power Increase (spend 1–3 to treat that many Powers as one Grade higher for the scene, then mark that many Conditions); or Introduce a Fact."
  },
  {
    "key": "editorial-points",
    "title": "Editorial Points",
    "order": 7,
    "body": "Whenever a player spends a Plot Point, the Editor banks an Editorial Point (max = number of players; one spend per Scene). Spending one introduces a complication: Editor's Note (an immediate twist); 'This is my True Form!' (the villain's real, stronger form); 'He has a new trick!' (an unrevealed power or gear); Villainous Monologue (the villain speechifies — Heroes are paralyzed and the villain recovers all Resolve); or Introduce a Surprise Element (a mysterious third party)."
  },
  {
    "key": "crisis-die",
    "title": "The Crisis Die",
    "order": 8,
    "body": "Over-using narrative power stresses reality. Each time a player spends a Plot Point, they roll a d6; if the result is ≤ the number of Plot Points used this Issue, the Crisis Die is triggered: the Editor rolls a d20 on the Crisis table and applies a catastrophic twist, after which Plot Points cannot be used again for the rest of that Issue."
  },
  {
    "key": "creation",
    "title": "Character Creation — the Seven Steps",
    "order": 9,
    "body": "1) Define the Tier (D or C in the Quickstart). 2) Choose an Origin (Human, Kryptonian, Amazon, or Meta-Human). 3) Choose an Archetype (Champion of Tomorrow, Dark Knight, Genius, or Enraged) — take 2 of its abilities at Tier D. 4) Distribute Attributes with PAX (multiples of 3). 5) Choose Powers. 6) Determine Knowledge and Traits (and a Limitation). 7) Final details — name, weakness, and soul."
  }
] as unknown as JluRule[];
