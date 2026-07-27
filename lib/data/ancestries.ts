// GENERATED FILE — do not edit by hand.
// Source: tools/templates/sd_character_sheet.html (RC_ANCESTRY)
// Regenerate with: node scripts/extract-game-data.mjs

export type SdAncestry = { name: string; trait: string; languages: string; optional: boolean };

export const SD_ANCESTRIES: SdAncestry[] = [
  {
    "name": "Human",
    "trait": "Ambitious: +1 bonus talent roll at 1st level.",
    "languages": "Common + 1 additional common language",
    "optional": false
  },
  {
    "name": "Elf",
    "trait": "Farsight: +1 to ranged attack rolls OR +1 to spellcasting checks.",
    "languages": "Common, Elvish, Sylvan",
    "optional": false
  },
  {
    "name": "Dwarf",
    "trait": "Stout: Start with +2 HP. Roll hit points with advantage.",
    "languages": "Common, Dwarvish",
    "optional": false
  },
  {
    "name": "Halfling",
    "trait": "Stealthy: Once per day, become invisible for 3 rounds.",
    "languages": "Common",
    "optional": false
  },
  {
    "name": "Half-Orc",
    "trait": "Mighty: +1 to attack and damage with melee weapons.",
    "languages": "Common, Orcish",
    "optional": false
  },
  {
    "name": "Goblin",
    "trait": "Keen Senses: You cannot be surprised.",
    "languages": "Common, Goblin",
    "optional": false
  },
  {
    "name": "Kobold",
    "trait": "Knack: +1 to spellcasting checks OR begin each session with a luck token.",
    "languages": "Common, Draconic",
    "optional": true
  }
];
