// Dragonbane — bestiary (Core Rules ch.7, p.83–99) and typical NPCs (p.105).
// Monster attacks hit automatically; dodgeable but not parryable unless noted.
// attack fields: roll, name, damage (dice or null), type, targets, range (m), fear, conditions[],
//   prone, parry, dodge, text (paraphrased).

const A = (roll, name, o) => ({ roll, name, damage: null, type: null, targets: "one", range: 2, fear: false, conditions: [], prone: false, parry: false, dodge: true, ...o });

export const DB_MONSTER_RULES = {
  ferocity: "Draw one initiative card per point of Ferocity each round; one turn (movement + action) per card.",
  attacks: "A monster attacks only with its monster attacks: roll or pick on its D6 table. They hit automatically. Never the same attack twice in a row — a repeat becomes the next entry (6 becomes 1).",
  defense: "Monsters can dodge, and armed monsters can parry, rolling against 15; each dodge or parry uses one of its turns (flip a card).",
  topple: "Topple vs EVADE 15 (bane against four or more legs). Monsters can't be disarmed, grappled or shoved.",
  resistance: "Resistant: that damage is halved after armor (rounded up).",
  other: "Monsters see in the dark, are immune to fear and Persuasion unless stated, and poison doesn't affect them.",
  sizes: {
    Small: "Under a metre tall; blocks no area; slips through tiny gaps.",
    Normal: "About human size; blocks 2×2 m; passes a 0.5 m gap.",
    Large: "Blocks 4×4 m; passes a 1 m gap.",
    Huge: "Blocks 8×8 m; passes a 2 m gap.",
    Swarm: "Normal to Huge; never blocks its area; passes tiny gaps.",
  },
};

export const DB_MONSTERS = [
  {
    name: "Demon", page: 85, ferocity: 2, size: "Large", movement: 16, armor: 4, hp: 64,
    text: "A terrifying being from the grim world beyond, born of the same ancient magic as dragons and their mortal enemy. Demons crave power and seek to break everything fixed — friendships, treaties, nations, even the laws of the cosmos. Their shapes vary; this is one example.",
    traits: [],
    attacks: [
      A(1, "Demonic Dread", { targets: "all player characters", range: 10, fear: true, text: "Hisses threats in an ancient tongue: every player character within 10 m suffers a fear attack." }),
      A(2, "Claw Attack", { damage: "2D10", type: "slashing", parry: true, text: "Slashes one character for 2D10 slashing damage. Can be parried." }),
      A(3, "Curse", { range: 10, dodge: false, curse: true, text: "Points at a character within 10 m and chants a curse (can't be dodged); roll D6 on the curse list. All but #6 can be lifted with Dispel (power level 1).",
        curses: [
          "Vomits a frog whenever they lie; roll D4 each morning, 1 ends it.",
          "Gold or silver they touch crumbles to dust; roll D4 each morning, 1 ends it.",
          "Blinded, as in total darkness; roll D4 each shift, 1 ends it.",
          "Forgets their own name and their companions (roleplay it); roll D4 each morning, 1 ends it.",
          "Turned into an animal (D6: cat, fox, goat, wolf, deer, bear) and can't speak; roll D4 each shift, 1 ends it.",
          "Ages one category (young→adult→old) with the attribute changes; permanent. The already old become frail: −2 STR and CON.",
        ] }),
      A(4, "Unseen Ferocity", { damage: "2D8", type: "bludgeoning", range: 10, prone: true, text: "Hurls a victim within 10 m 2D8 m backwards for the same in bludgeoning damage; they land prone." }),
      A(5, "Scorpion Sting", { damage: "D12", type: "piercing", parry: true, poison: { type: "paralyzing", potency: 16 }, text: "Stings for D12 piercing; anyone taking damage is injected with paralyzing poison (potency 16). Can be parried." }),
      A(6, "Possessed", { range: 10, dodge: false, text: "Seizes a character within 10 m: they roll WIL with a bane (not an action); on a failure they must move and act as the demon wishes (nothing costing WP) and lose their next turn." }),
    ],
  },
  {
    name: "Dragon", page: 86, ferocity: 3, size: "Huge", movement: 24, flying: true, armor: 6, hp: 84,
    text: "Cunning, vain reptilian masters of the mountains who lair in deep caves and old dwarven mines. Silver-tongued deceivers who are themselves weak to flattery — and to gold.",
    traits: [{ name: "Wings", text: "Flies freely through the air." }],
    attacks: [
      A(1, "Dragon Roar", { targets: "all player characters", range: 20, fear: "bane", text: "A chilling roar: every player character within 20 m suffers a fear attack with a bane on the WIL roll." }),
      A(2, "Claw Attack", { damage: "2D10", type: "slashing", targets: "two", text: "Sweeps its claws at two characters for 2D10 slashing each." }),
      A(3, "Dragon Wind", { damage: "2D6", type: "bludgeoning", targets: "all within 10 m", range: 10, prone: true, text: "A gale from its wings hurls everyone up to human size within 10 m 2D6 m, for the same bludgeoning damage; they land prone." }),
      A(4, "Tail Strike", { damage: "2D8", type: "bludgeoning", targets: "all within 6 m", range: 6, prone: true, text: "Its spiked tail hits every player character within 6 m for 2D8 bludgeoning and knocks them down." }),
      A(5, "Dragon Bite", { damage: "4D10", type: "slashing", text: "Snaps up one victim for 4D10 slashing." }),
      A(6, "Fire Breath", { damage: "3D10", type: "fire", targets: "cone", range: 10, ignoresArmor: true, text: "A 10 m cone of fire (as wide as it is far from the mouth): everyone caught takes 3D10, armor doesn't help." }),
    ],
  },
  {
    name: "Ghost", page: 87, ferocity: 2, size: "Normal", movement: 12, armor: null, hp: 27, persuadable: "bane",
    text: "Restless dead bound to a place — usually their remains or the scene of their death — and to some unfinished business: revenge, a debt, a proper burial.",
    traits: [
      { name: "Immunity", text: "Immaterial: immune to everything except magic and fire. Defeated, it returns after a shift unless Purged or its unfinished business is settled." },
      { name: "Persuadable", text: "Unlike most monsters it can be persuaded, with a bane." },
    ],
    immunities: ["All damage except magic and fire"],
    attacks: [
      A(1, "Ghost Strike", { damage: "2D6", type: "bludgeoning", range: 10, prone: true, text: "Lunges at a character within 10 m, knocking them back 2D6 m for the same bludgeoning damage; they land prone." }),
      A(2, "Touch of Death", { damage: "2D10", ignoresArmor: true, conditions: ["Scared"], text: "Grips the victim's heart: 2D10 damage, armor doesn't help, and they become Scared." }),
      A(3, "Ghost Scream", { targets: "all within 10 m", range: 10, fear: true, text: "A soul-chilling scream: everyone within 10 m suffers a fear attack." }),
      A(4, "Death Stare", { fear: "bane", conditions: ["Scared"], text: "Stares into a character's soul: they become Scared and suffer a fear attack with a bane on the WIL roll." }),
      A(5, "Ghostly Embrace", { damage: "3D6", type: "bludgeoning", range: 10, conditions: ["Dazed"], text: "Appears in front of someone within 10 m and smothers them: 3D6 bludgeoning and Dazed." }),
      A(6, "Cold Strike", { damage: "2D8", ignoresArmor: true, text: "The chill of death: 2D8 damage, armor doesn't help, and no HP or WP healing until they spend a shift somewhere warm." }),
    ],
  },
  {
    name: "Giant", page: 88, ferocity: 1, size: "Huge", movement: 18, armor: null, hp: 74,
    text: "Colossal, mostly shy humanoids of the mountains with a deep bond to the bedrock. Some are fiercely territorial.",
    traits: [
      { name: "Weapon", text: "Usually carries a huge weapon; without it, attacks #1 and #4 are re-rolled." },
      { name: "Weak Spot", text: "Hits on the top of its head deal double damage — a ranged attack with a bane from above, or climb up first (Acrobatics with a bane, then Acrobatics each turn, not an action, or fall for 2D6)." },
    ],
    attacks: [
      A(1, "Crushing Blow", { damage: "4D10", type: "bludgeoning", prone: true, weapon: true, text: "Brings its weapon down on one character: 4D10 bludgeoning and knocked down." }),
      A(2, "Roar", { targets: "all within 10 m", range: 10, fear: true, text: "A bellow that makes every player character within 10 m suffer a fear attack." }),
      A(3, "Stomp Attack", { damage: "4D6", type: "bludgeoning", targets: "two within 4 m of each other", prone: true, text: "Stomps at two characters within 4 m of each other: 4D6 bludgeoning each, knocked down." }),
      A(4, "Sweeping Blow", { damage: "2D10", type: "bludgeoning", targets: "all within 10 m", range: 10, prone: true, weapon: true, text: "Sweeps its weapon at everyone within 10 m: 2D10 bludgeoning, knocked down." }),
      A(5, "Forceful Throw", { damage: "4D8", type: "bludgeoning", prone: true, text: "Grabs and throws someone: 4D8 bludgeoning and they fly that many metres in a random direction, landing prone." }),
      A(6, "Smash Attack", { damage: "3D6", type: "bludgeoning", targets: "all within 2 m", prone: true, text: "A frenzy of kicks, fists and weapon: everyone within 2 m takes 3D6 bludgeoning and is knocked down." }),
    ],
  },
  {
    name: "Giant Spider", page: 89, ferocity: 2, size: "Normal", movement: 24, armor: null, hp: 36,
    text: "Cunning predators of dark, damp places — forests, caves, ruins, even the cellars beneath inns. Most are cow-sized; ancient females grow as large as a house and may be worshipped as oracles.",
    traits: [],
    attacks: [
      A(1, "Mandibles", { damage: "2D8", type: "slashing", text: "Serrated mandibles slice for 2D8 slashing." }),
      A(2, "Tearing Attack", { damage: "D8", type: "piercing", targets: "all within 2 m", text: "Thrashing barbed legs hit every player character within 2 m for D8 piercing." }),
      A(3, "Mesmerizing Eyes", { targets: "all within 10 m", range: 10, fear: true, text: "Its many eyes force everyone within 10 m to roll WIL against fear." }),
      A(4, "Poison Sting", { damage: "D10", type: "piercing", parry: true, poison: { type: "paralyzing", potency: 16 }, text: "A stinger for D10 piercing; anyone damaged gets paralyzing poison (potency 16). Can be parried." }),
      A(5, "Web Attack", { dodge: false, text: "Spits web at the character with the highest STR: they roll Evade (not an action) or are stuck fast; breaking free takes a STR roll with a bane (an action), and others may help." }),
      A(6, "Ramming Attack", { damage: "2D6", type: "bludgeoning", prone: true, text: "Leaps onto a character for 2D6 bludgeoning, knocking them down." }),
    ],
  },
  {
    name: "Griffon", page: 91, ferocity: 2, size: "Large", movement: 30, flying: true, armor: null, hp: 38,
    text: "Aggressive forest hunters that nest in tall trees or cliffs among the junk and treasure of past victims. Some knights tame them as mounts; griffons in turn love to eat horses.",
    traits: [{ name: "Wings", text: "Flies freely through the air." }],
    attacks: [
      A(1, "Snapping Beak", { damage: "2D8", type: "piercing", text: "Tears at a character with its beak for 2D8 piercing." }),
      A(2, "Rearing Strike", { damage: "D8", type: "slashing", multi: "D6", parry: true, text: "Rears up and strikes D6 times, each for D8 slashing; each strike can be dodged or parried separately." }),
      A(3, "Sweeping Claws", { damage: "D8", type: "slashing", targets: "all within 2 m", prone: true, text: "Sweeps its claws: everyone within 2 m takes D8 slashing and is knocked down." }),
      A(4, "Griffon Throw", { damage: "2D6", type: "piercing", prone: true, text: "Grabs a character in its beak and flings them: 2D6 piercing, thrown that many metres, landing prone." }),
      A(5, "Whirlwind", { damage: "D6", type: "bludgeoning", targets: "all within 10 m", range: 10, text: "Its wings blow every player character within 10 m D6 m away for the same bludgeoning damage." }),
      A(6, "High Drop", { text: "Unless dodged, seizes a character and flies 2D6+6 m up, dropping them on its next turn (instead of attacking) for falling damage." }),
    ],
  },
  {
    name: "Harpy", page: 92, ferocity: 1, ferocityPer: "harpy", size: "Normal", movement: 24, flying: true, armor: null, hp: 12, hpPer: "harpy", flock: true,
    text: "Raven-like birds of prey with human faces and fanged mouths, nesting in ruins in flocks. Cowardly but calculating, they circle with insults and cackles before diving in — and always outnumber their prey.",
    traits: [
      { name: "Flock", text: "Harpies fight as a group: one monster attack is made by several of them but uses only one harpy's turn. When half the flock is dead, the rest flee, returning when the moment suits them." },
      { name: "Wings", text: "Attack from the air; can only be reached with ranged weapons or long melee weapons." },
    ],
    attacks: [
      A(1, "Threatening Cackle", { targets: "all within 10 m", range: 10, fear: true, text: "Gruesome promises: everyone within 10 m rolls WIL against fear." }),
      A(2, "Coordinated Attack", { damage: "2D6", type: "slashing", text: "The flock dives on whoever wears the most metal: 2D6 slashing, and if hit they are lifted and dropped from D3+3 m." }),
      A(3, "Death From Above", { damage: "D6", type: "bludgeoning", targets: "all within 10 m", range: 10, text: "A rain of rocks and junk: everyone within 10 m takes D6 bludgeoning." }),
      A(4, "Eye Gouge", { damage: "2D6", type: "piercing", text: "Claws at a character's eyes: 2D6 piercing and blinded (as in total darkness) for a stretch." }),
      A(5, "Mass Attack", { damage: "D8", type: "slashing", targets: "one per harpy", range: 10, text: "The flock splits up and attacks as many characters within 10 m as there are harpies, D8 slashing each." }),
      A(6, "Excrement Attack", { targets: "all within 10 m", range: 10, parry: true, parryNote: "with a shield", text: "A shower of vomit and filth: everyone within 10 m must choose a condition. A shield can parry it." }),
    ],
  },
  {
    name: "Manticore", page: 93, ferocity: 2, size: "Large", movement: 16, armor: null, hp: 44,
    text: "A lion-bodied, human-faced horror with a maw of fangs and a spiked, swollen tail — some say a magical creation run wild, others a hunger-beast from the dawn of time.",
    traits: [],
    attacks: [
      A(1, "Tail Strike", { damage: "D12", type: "piercing", range: 20, ranged: true, parry: true, parryNote: "with a shield", poison: { type: "paralyzing", potency: 12 }, text: "Fires tail spikes at a character within 20 m: D12 piercing plus paralyzing poison (potency 12). A shield can parry it." }),
      A(2, "Razor Sharp Bite", { damage: "3D8", type: "slashing", text: "Bites one character with its many fangs for 3D8 slashing." }),
      A(3, "Claw Attack", { damage: "2D8+D6", type: "slashing", prone: true, text: "Runs down a character, knocks them over and tears at them: 2D8 slashing plus D6 for being prone." }),
      A(4, "Sweeping Attack", { damage: "2D6", type: "slashing", targets: "two", prone: true, text: "Lashes its tail at two characters: 2D6 slashing each and knocked down." }),
      A(5, "Crushing Charge", { damage: "3D6", type: "bludgeoning", range: 10, prone: true, text: "Charges the character with the highest STR within 10 m: 3D6 bludgeoning and knocked down." }),
      A(6, "Spike Rain", { damage: "D10", type: "piercing", targets: "all within 10 m", range: 10, poison: { type: "paralyzing", potency: 12 }, text: "A volley of spikes: everyone within 10 m takes D10 piercing and paralyzing poison (potency 12)." }),
    ],
  },
  {
    name: "Minotaur", page: 94, ferocity: 2, size: "Large", movement: 16, armor: null, hp: 32, gear: ["Two-Handed Axe"],
    text: "Bull-headed, semi-intelligent warriors of tremendous strength, ruled by a barely-contained rage. They roam alone or hold chokepoints like passes and fords, demanding tolls and duels.",
    traits: [{ name: "Typical Gear", text: "Two-handed axe (2D10)." }],
    attacks: [
      A(1, "Bull Fist", { damage: "2D6", type: "bludgeoning", conditions: ["Dazed"], text: "A furred fist for 2D6 bludgeoning; the victim is Dazed even if armor stops the damage." }),
      A(2, "Hoof Kick", { damage: "2D6", type: "bludgeoning", prone: true, text: "Kicks a victim 2D6 m away for the same bludgeoning damage; they land prone." }),
      A(3, "Horn Rush", { damage: "2D8", type: "piercing", targets: "two within 2 m of each other", prone: true, text: "Charges two characters within 2 m of each other: 2D8 piercing each, knocked down." }),
      A(4, "Cleaving Chop", { damage: "weapon+D10", parry: true, weapon: true, text: "A full overhead chop: weapon damage plus D10. Can be parried." }),
      A(5, "Sweeping Attack", { damage: "weapon", targets: "all within 2 m", weapon: true, text: "Sweeps its weapon around, hitting everyone within 2 m for weapon damage." }),
      A(6, "Stomping Attack", { damage: "2D10", type: "bludgeoning", prone: true, text: "Leaps and crashes down on one adventurer: 2D10 bludgeoning, knocked down." }),
    ],
  },
  {
    name: "Troll", page: 97, ferocity: 2, size: "Large", movement: 10, armor: null, hp: 38, persuadable: "bane",
    text: "Huge, tusked, yellow-eyed brutes of children's tales. Usually hungry and short-tempered rather than truly wicked — drawn steel enrages them, but food and kindness can win them over.",
    traits: [
      { name: "Regeneration", text: "Heals D6 HP on each of its turns in combat." },
      { name: "Sensitive to Sunlight", text: "Takes D6 damage per round in direct sunlight and can't regenerate; a troll brought to zero HP this way turns to stone. Thick cloud or full-cover clothing protects it." },
      { name: "Persuadable", text: "Can usually be persuaded, with a bane." },
    ],
    regeneration: "D6",
    attacks: [
      A(1, "Troll Vomit", { targets: "all within 6 m", range: 6, text: "Spews bile and swamp water: every adventurer within 6 m suffers a condition of their choice." }),
      A(2, "Rending Attack", { damage: "D10", type: "slashing", parry: true, disease: 10, text: "Filthy claws for D10 slashing; anyone damaged contracts a disease (virulence 10). Can be parried." }),
      A(3, "Repulsive Bite", { damage: "2D8", type: "piercing", text: "Bites for 2D8 piercing and holds on: the victim must make a STR roll (an action) each round to break free or take another 2D8." }),
      A(4, "Troll Throw", { damage: "2D6", type: "bludgeoning", prone: true, text: "Hurls a character 2D6 m in a random direction for the same bludgeoning damage; they land prone." }),
      A(5, "Sweeping Blow", { damage: "2D6", type: "bludgeoning", targets: "all within 2 m", text: "Long arms sweep everyone within 2 m for 2D6 bludgeoning." }),
      A(6, "Mangling Smash", { damage: "2D8", type: "bludgeoning", targets: "two", prone: true, text: "Grabs the nearest character and smashes them into another: both take 2D8 bludgeoning and are knocked down." }),
    ],
  },
  {
    name: "Wight", page: 98, ferocity: 2, size: "Normal", movement: 10, armor: "as worn", armorValue: 4, hp: 38, gear: ["Morningstar", "Chainmail"],
    text: "The undead spirits of princes and great warriors — corporeal, wilful and full of hatred for the living, still armed with the arms and relics of their graves and usually bound to their burial mounds.",
    traits: [
      { name: "Resistance", text: "Half damage from non-magical weapons; fire deals normal damage." },
      { name: "Typical Gear", text: "Morningstar (2D8), chainmail (armor 4)." },
    ],
    resistances: ["Non-magical weapons (fire excepted)"],
    attacks: [
      A(1, "Unholy Roar", { targets: "all within 10 m", range: 10, fear: true, text: "A ghastly scream: everyone within 10 m suffers a fear attack." }),
      A(2, "Dreadful Gaze", { fear: "bane", conditions: ["Scared"], text: "One character meets its eyes: they become Scared and suffer a fear attack with a bane on the WIL roll." }),
      A(3, "Hand of the Dead", { damage: "2D4", range: 10, dodge: false, prone: true, text: "A gesture flings a character within 10 m 2D4 m away for the same damage; they land prone. Can't be dodged." }),
      A(4, "Sweeping Attack", { damage: "weapon", targets: "all within 2 m", parry: true, weapon: true, text: "A sudden sweep of its weapon hits every player character within 2 m for weapon damage. Can be parried." }),
      A(5, "Crippling Cold", { damage: "D6", ignoresArmor: true, text: "Grabs a character: D6 damage ignoring armor; on their next turn they must pass Evade (not an action) to act at all, retrying each turn. They are also cold and can't heal HP or WP until warm." }),
      A(6, "Power Attack", { damage: "weapon×2", prone: true, parry: true, weapon: true, text: "A mighty swing with double the weapon's damage dice that knocks the victim down. Can be parried." }),
    ],
  },
  {
    name: "Vampiric Bats", page: 99, ferocity: 2, size: "Swarm", movement: 24, flying: true, armor: null, hp: 18,
    text: "Metre-wide bats with a taste for human blood that hunt in flocks through burial chambers, feeding on grave robbers.",
    traits: [{ name: "Resistance", text: "A swarm counts as one creature; all physical weapon damage, even magical, is halved (rounded up). Fire works normally." }],
    resistances: ["All physical weapons (fire excepted)"],
    attackDie: "D6", attackRolls: [[1, 2], [3, 4], [5, 6]],
    attacks: [
      A(1, "Swirling Horror", { rolls: [1, 2], targets: "all within 10 m", range: 10, fear: true, text: "A frantic swirl: everyone within 10 m suffers a fear attack." }),
      A(3, "Collective Attack", { rolls: [3, 4], damage: "2D6", type: "slashing", fear: true, drain: true, text: "The swarm mobs the character with the highest CON: 2D6 slashing, a fear attack, and the swarm heals as much HP as it dealt." }),
      A(5, "Mass Attack", { rolls: [5, 6], damage: "D8", type: "slashing", targets: "all within 10 m", range: 10, drain: true, text: "The bats split up and bite everyone within 10 m for D8 slashing each, healing as much as they deal." }),
    ],
  },
];

// Humanoid NPCs from the bestiary (not monsters in combat).
// weapons: { name, skill, damage }; skills: { Skill: level }.
export const DB_NPCS = [
  { name: "Goblin Scout", kind: "Goblin", page: 90, movement: 10, damageBonus: null, hp: 9, wp: null, armor: { name: "Leather", rating: 1 }, skills: { Awareness: 10, Evade: 10, Sneaking: 12 }, abilities: [], weapons: [{ name: "Short Bow", skill: 12, damage: "D10" }, { name: "Short Sword", skill: 10, damage: "D10" }], traits: ["Nocturnal"] },
  { name: "Goblin Warrior", kind: "Goblin", page: 90, movement: 10, damageBonus: null, hp: 10, wp: null, armor: { name: "Studded Leather", rating: 2 }, skills: { Awareness: 10, Evade: 10, Sneaking: 12 }, abilities: [], weapons: [{ name: "Long Spear", skill: 12, damage: "2D8" }], traits: ["Nocturnal"] },
  { name: "Orc Warrior", kind: "Orc", page: 95, movement: 10, damageBonus: { STR: "D4" }, hp: 12, wp: null, armor: { name: "Studded Leather", rating: 2 }, skills: { Awareness: 10, Evade: 8 }, abilities: [], weapons: [{ name: "Scimitar", skill: 12, damage: "2D6" }], traits: ["Nocturnal"] },
  { name: "Orc Shaman", kind: "Orc", page: 95, movement: 10, damageBonus: null, hp: 10, wp: 16, armor: null, skills: { Animism: 14, Awareness: 12, Evade: 8 }, spells: ["Ensnaring Roots", "Lightning Flash", "Treat Wound"], abilities: [], weapons: [{ name: "Staff", skill: 10, damage: "D8" }], traits: ["Nocturnal"] },
  { name: "Orc Chieftain", kind: "Orc", page: 95, boss: true, movement: 10, damageBonus: { STR: "D6" }, hp: 24, wp: 15, armor: { name: "Chainmail", rating: 4 }, skills: { Awareness: 14, Evade: 12 }, abilities: ["Veteran", "Defensive", "Dual Wield", "Robust ×4"], weapons: [{ name: "Scimitar", qty: 2, skill: 16, damage: "2D6" }], traits: ["Nocturnal"] },
  { name: "Skeleton Warrior", kind: "Skeleton", page: 96, movement: 8, damageBonus: null, hp: 8, wp: null, armor: { name: "Studded Leather", rating: 2 }, skills: { Awareness: 8, Evade: 6 }, abilities: [], weapons: [{ name: "Short Sword", skill: 12, damage: "D10" }], traits: ["Skeleton"] },
  { name: "Skeleton Archer", kind: "Skeleton", page: 96, movement: 8, damageBonus: null, hp: 8, wp: null, armor: { name: "Leather", rating: 1 }, skills: { Awareness: 8, Evade: 6 }, abilities: [], weapons: [{ name: "Dagger", skill: 10, damage: "D8" }, { name: "Crossbow, Light", skill: 12, damage: "2D6" }], traits: ["Skeleton"] },
  { name: "Skeleton Champion", kind: "Skeleton", page: 96, boss: true, movement: 10, damageBonus: { STR: "D6" }, hp: 24, wp: 15, armor: { name: "Chainmail", rating: 4 }, skills: { Awareness: 12, Evade: 8 }, abilities: ["Veteran", "Defensive", "Double Slash", "Robust ×4"], weapons: [{ name: "Longsword", skill: 16, damage: "2D8" }, { name: "Shield, Large", skill: 16, damage: "D8" }], traits: ["Skeleton"] },
  // Typical NPCs (p.105)
  { name: "Guard", kind: "Typical", page: 105, damageBonus: { STR: "D4" }, hp: 12, wp: null, skills: { Awareness: 10, Swords: 12 }, abilities: [], gear: ["Broadsword", "Studded Leather"] },
  { name: "Cultist", kind: "Typical", page: 105, damageBonus: { AGL: "D4" }, hp: 12, wp: null, skills: { Evade: 14, Knives: 14 }, abilities: [], gear: ["Dagger"] },
  { name: "Thief", kind: "Typical", page: 105, damageBonus: { AGL: "D4" }, hp: 10, wp: null, skills: { Evade: 12, Knives: 12 }, abilities: [], gear: ["Knife"] },
  { name: "Villager", kind: "Typical", page: 105, damageBonus: null, hp: 8, wp: null, skills: { Brawling: 8 }, abilities: [], gear: ["Wooden Club, Small"] },
  { name: "Hunter", kind: "Typical", page: 105, damageBonus: { AGL: "D4" }, hp: 13, wp: null, skills: { Awareness: 12, Bows: 13 }, abilities: [], gear: ["Longbow", "Leather"] },
  { name: "Bandit", kind: "Typical", page: 105, damageBonus: null, hp: 12, wp: null, skills: { Bows: 12, Evade: 10, Swords: 12 }, abilities: [], gear: ["Short Sword", "Short Bow"] },
  { name: "Adventurer", kind: "Typical", page: 105, damageBonus: { STR: "D4" }, hp: 13, wp: null, skills: { Awareness: 10, Swords: 12 }, abilities: [], gear: ["Broadsword", "Studded Leather"] },
  { name: "Scholar", kind: "Typical", page: 105, damageBonus: null, hp: 7, wp: null, skills: { Languages: 13, "Myths & Legends": 13, Staves: 8 }, abilities: [], gear: ["Book"] },
  { name: "Bandit Chief", kind: "Typical", page: 105, boss: true, damageBonus: { STR: "D6" }, hp: 30, wp: 16, skills: { Awareness: 12, Brawling: 15, Hammers: 15 }, abilities: ["Berserker", "Robust ×6", "Veteran"], gear: ["Warhammer, Heavy", "Chainmail", "Open Helmet"] },
  { name: "Knight Champion", kind: "Typical", page: 105, boss: true, damageBonus: { STR: "D6" }, hp: 28, wp: 26, skills: { Brawling: 14, Swords: 16 }, abilities: ["Defensive", "Double Slash", "Focused ×6", "Robust ×6"], gear: ["Longsword", "Shield, Large", "Plate Armor", "Great Helm", "Combat Trained Horse"] },
  { name: "Archmage", kind: "Typical", page: 105, boss: true, damageBonus: null, hp: 22, wp: 30, skills: { "Magic School": 15, Staves: 13 }, abilities: ["Focused ×6", "Master Spellcaster", "Robust ×4"], gear: ["Staff", "Grimoire"] },
];

export const DB_NPC_TRAITS = {
  Nocturnal: "In direct sunlight they get a bane on all rolls and take D6 damage per stretch; thick cloud or full-cover clothing prevents it.",
  Skeleton: "Piercing damage is halved (rounded up). Immune to fear and Persuasion.",
};

// Common animals (p.99).
export const DB_ANIMALS = [
  { name: "Cat", movement: 12, hp: 4, attack: { name: "Bite", skill: 8, damage: "D3" }, skills: { Awareness: 12, Evade: 14, Sneaking: 16 } },
  { name: "Dog", movement: 14, hp: 8, attack: { name: "Bite", skill: 12, damage: "D8" }, skills: { Awareness: 14, Evade: 10, Sneaking: 12 } },
  { name: "Goat", movement: 10, hp: 6, attack: { name: "Horns", skill: 10, damage: "D6" }, skills: { Awareness: 10, Evade: 12 } },
  { name: "Donkey", movement: 14, hp: 12, attack: { name: "Kick", skill: 10, damage: "D10" }, skills: { Awareness: 10, Evade: 6 } },
  { name: "Horse", movement: 20, hp: 16, attack: { name: "Kick", skill: 10, damage: "2D4" }, skills: { Awareness: 12, Evade: 8 } },
  { name: "Wild Boar", movement: 12, hp: 14, attack: { name: "Tusks", skill: 12, damage: "2D6" }, skills: { Awareness: 10, Evade: 8 } },
  { name: "Deer", movement: 18, hp: 12, attack: { name: "Horns", skill: 10, damage: "D8" }, skills: { Awareness: 12, Evade: 12 } },
  { name: "Moose", movement: 16, hp: 18, attack: { name: "Horns", skill: 10, damage: "2D6" }, skills: { Awareness: 10, Evade: 8 } },
  { name: "Fox", movement: 10, hp: 6, attack: { name: "Bite", skill: 12, damage: "D6" }, skills: { Awareness: 12, Evade: 10, Sneaking: 14 } },
  { name: "Wolf", movement: 16, hp: 10, attack: { name: "Bite", skill: 14, damage: "2D6" }, skills: { Awareness: 14, Evade: 12, Sneaking: 14 } },
  { name: "Bear", movement: 12, hp: 20, attack: { name: "Bite", skill: 12, damage: "2D8" }, skills: { Awareness: 10, Evade: 8 } },
].map((a) => ({ ...a, page: 99 }));

// Rolling attributes for NPCs (p.106).
export const DB_NPC_ATTRIBUTES = {
  STR: "From the damage bonus: +D6 → 17, +D4 → 14, none → 10.", AGL: "From the damage bonus: +D6 → 17, +D4 → 14, none → 10.",
  CON: "Max HP, −2 per Robust.", WIL: "Max WP (−2 per Focused) if listed, otherwise 10.", INT: "10", CHA: "10",
  minions: "Minions share stats, die at zero HP (unless the GM wants a last word), rarely use WP and often share an initiative card.",
  bosses: "Bosses draw their own initiative card and use WP and heroic abilities like player characters.",
};
