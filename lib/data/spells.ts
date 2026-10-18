// GENERATED FILE — do not edit by hand.
// Source: tools/templates/sd_character_sheet.html (SD_SPELLS)
// Regenerate with: node scripts/extract-game-data.mjs

export type Spell = {
  name: string;
  tier: string;
  caster: string;
  range: string;
  duration: string;
  damage: string;
  heal?: string;
  desc: string;
};

export const SPELLS: Spell[] = [
  {
    "name": "Cure Wounds",
    "tier": "1",
    "caster": "Priest",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Touch: the target regains (1 + half your level, rounded down) d6 hit points.",
    "heal": "scaling"
  },
  {
    "name": "Holy Weapon",
    "tier": "1",
    "caster": "Priest",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A touched weapon becomes magical with +1 to attack and damage rolls for the duration."
  },
  {
    "name": "Shield of Faith",
    "tier": "1",
    "caster": "Priest",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "You gain a +2 bonus to AC for the duration."
  },
  {
    "name": "Turn Undead",
    "tier": "1",
    "caster": "Priest",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Present your holy symbol: undead within near make a CHA check vs. your spellcasting check — fail by 10+ (and LV ≤ yours) is destroyed, else they flee for 5 rounds."
  },
  {
    "name": "Light",
    "tier": "1",
    "caster": "Both",
    "range": "Close",
    "duration": "1 hour",
    "damage": "",
    "desc": "A touched object sheds bright, heatless light out to near for 1 hour of real time."
  },
  {
    "name": "Protection From Evil",
    "tier": "1",
    "caster": "Both",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "Chaotic beings have disadvantage on attacks and hostile spellcasting against the target and can't possess, compel or beguile it."
  },
  {
    "name": "Alarm",
    "tier": "1",
    "caster": "Wizard",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Ward one touched object (e.g. a threshold). A mental bell rings if an undesignated creature touches or passes it."
  },
  {
    "name": "Burning Hands",
    "tier": "1",
    "caster": "Wizard",
    "range": "Close",
    "duration": "Instant",
    "damage": "1d6",
    "desc": "A circle of flame roars out to close range around you: 1d6 damage to creatures there, flammables catch fire."
  },
  {
    "name": "Charm Person",
    "tier": "1",
    "caster": "Wizard",
    "range": "Near",
    "duration": "1d8 days",
    "damage": "",
    "desc": "One humanoid of LV 2 or less in near regards you as a friend. Ends if you or allies hurt it; it knows afterwards."
  },
  {
    "name": "Detect Magic",
    "tier": "1",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Sense magic within near range. Focus for two rounds to learn its general properties. Full barriers block it."
  },
  {
    "name": "Feather Fall",
    "tier": "1",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Cast as you fall: your descent slows and you land safely on your feet."
  },
  {
    "name": "Floating Disk",
    "tier": "1",
    "caster": "Wizard",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "A floating disk of force carries up to 20 gear slots, hovering at waist height and staying within near of you."
  },
  {
    "name": "Hold Portal",
    "tier": "1",
    "caster": "Wizard",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Hold a portal shut. Opening it takes a STR check vs. your spellcasting check; knock ends the spell."
  },
  {
    "name": "Mage Armor",
    "tier": "1",
    "caster": "Wizard",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Your AC becomes 14 (18 on a critical spellcasting check) for the duration."
  },
  {
    "name": "Magic Missile",
    "tier": "1",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Instant",
    "damage": "1d4",
    "desc": "You have advantage to cast it. A bolt of force deals 1d4 damage to one target."
  },
  {
    "name": "Sleep",
    "tier": "1",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Creatures of LV 2 or less in a near-sized cube from you fall into a deep sleep. Shaking or injury wakes them."
  },
  {
    "name": "Augury",
    "tier": "2",
    "caster": "Priest",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask the GM one question about a course of action; you learn whether it leads to weal or woe."
  },
  {
    "name": "Bless",
    "tier": "2",
    "caster": "Priest",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One creature you touch gains a luck token."
  },
  {
    "name": "Blind/Deafen",
    "tier": "2",
    "caster": "Priest",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Blind or deafen one creature you can see. It has disadvantage on tasks that need the lost sense."
  },
  {
    "name": "Cleansing Weapon",
    "tier": "2",
    "caster": "Priest",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "1d4",
    "desc": "A touched weapon is wreathed in purifying flame: +1d4 damage (1d6 vs. undead) for the duration."
  },
  {
    "name": "Smite",
    "tier": "2",
    "caster": "Priest",
    "range": "Near",
    "duration": "Instant",
    "damage": "1d6",
    "desc": "Punishing flames strike a creature you can see in range for 1d6 damage."
  },
  {
    "name": "Zone of Truth",
    "tier": "2",
    "caster": "Priest",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature you can see can't tell a deliberate lie while it stays in range."
  },
  {
    "name": "Acid Arrow",
    "tier": "2",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Focus",
    "damage": "1d6",
    "desc": "A corrosive bolt hits one foe for 1d6 damage each round you keep focus."
  },
  {
    "name": "Alter Self",
    "tier": "2",
    "caster": "Wizard",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Gain one anatomical feature (gills, claws…). Can't grow wings or limbs."
  },
  {
    "name": "Detect Thoughts",
    "tier": "2",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Read one visible creature's immediate thoughts each round. It may notice (WIS vs. your last check), ending the spell."
  },
  {
    "name": "Fixed Object",
    "tier": "2",
    "caster": "Wizard",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A touched object of 5 lb or less is fixed in place and can hold up to 5,000 lb for the duration."
  },
  {
    "name": "Hold Person",
    "tier": "2",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Paralyze one humanoid of LV 4 or less you can see in range."
  },
  {
    "name": "Invisibility",
    "tier": "2",
    "caster": "Wizard",
    "range": "Close",
    "duration": "10 rounds",
    "damage": "",
    "desc": "A touched creature turns invisible; the spell ends if it attacks or casts a spell."
  },
  {
    "name": "Knock",
    "tier": "2",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "A door, window, gate, chest or portal you can see bursts open, defeating mundane locks — with a loud knock."
  },
  {
    "name": "Levitate",
    "tier": "2",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Float a near distance vertically per round; push off solid objects to move sideways."
  },
  {
    "name": "Mirror Image",
    "tier": "2",
    "caster": "Wizard",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Create illusory duplicates equal to half your level (min. 1). Each attack against you misses and pops one; the spell ends when all are gone."
  },
  {
    "name": "Misty Step",
    "tier": "2",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Teleport a near distance to a spot you can see."
  },
  {
    "name": "Silence",
    "tier": "2",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Mute all sound in a near cube within range. Creatures inside are deafened and make no sound."
  },
  {
    "name": "Web",
    "tier": "2",
    "caster": "Wizard",
    "range": "Far",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A near-sized cube of sticky web in range. A stuck creature can't move and must win a STR check vs. your spellcasting check to break free."
  },
  {
    "name": "Command",
    "tier": "3",
    "caster": "Priest",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Issue a one-word command to one creature in range who understands you; it obeys while you focus. A directly harmful command allows a CHA check vs. your last spellcasting check to end it."
  },
  {
    "name": "Lay To Rest",
    "tier": "3",
    "caster": "Priest",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Instantly destroy one undead creature of LV 9 or less that you touch."
  },
  {
    "name": "Mass Cure",
    "tier": "3",
    "caster": "Priest",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "All allies within near of you regain 2d6 hit points.",
    "heal": "2d6"
  },
  {
    "name": "Rebuke Unholy",
    "tier": "3",
    "caster": "Priest",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Present your holy symbol: opposed outsiders within near make a CHA check vs. your spellcasting check — fail by 10+ (and LV ≤ yours) is destroyed, else they flee for 5 rounds."
  },
  {
    "name": "Restoration",
    "tier": "3",
    "caster": "Priest",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Your touch removes one curse, illness or affliction of your choice."
  },
  {
    "name": "Speak With Dead",
    "tier": "3",
    "caster": "Both",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "A dead body you touch answers up to three yes-or-no questions, truthfully. Cast it again within 24 hours and a failed check counts as a critical failure."
  },
  {
    "name": "Animate Dead",
    "tier": "3",
    "caster": "Wizard",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Touched humanoid remains rise as a zombie or skeleton under your control, acting on your turn. Crumbles after 1 day."
  },
  {
    "name": "Dispel Magic",
    "tier": "3",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "End one spell affecting one target you can see in range."
  },
  {
    "name": "Fabricate",
    "tier": "3",
    "caster": "Wizard",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Turn a tree-sized pile of raw materials into a finished work (e.g. rocks into a bridge). It reverts when the spell ends. Can't target creatures."
  },
  {
    "name": "Fireball",
    "tier": "3",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Instant",
    "damage": "4d6",
    "desc": "A flame bursts into a near-sized cube where it lands: 4d6 damage to every creature inside."
  },
  {
    "name": "Fly",
    "tier": "3",
    "caster": "Wizard",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "You can fly a near distance and hover in place for the duration."
  },
  {
    "name": "Gaseous Form",
    "tier": "3",
    "caster": "Wizard",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "You and your gear become a smoke cloud: you can fly, pass through any gap smoke could, and sense movement out to near. You can't cast spells in this form."
  },
  {
    "name": "Illusion",
    "tier": "3",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "A visible, audible illusion fills up to a near-sized cube in range. It can't harm. Inspecting it takes a WIS check vs. your last spellcasting check to see through; touching it reveals it."
  },
  {
    "name": "Lightning Bolt",
    "tier": "3",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Instant",
    "damage": "3d6",
    "desc": "A bolt of lightning hits every creature in a straight line out to far: 3d6 damage."
  },
  {
    "name": "Magic Circle",
    "tier": "3",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "A near-sized circle of runes around you: creatures of a named type can't attack, harm-cast at, possess or beguile anyone inside."
  },
  {
    "name": "Protection From Energy",
    "tier": "3",
    "caster": "Wizard",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "One touched creature becomes impervious to fire, cold or electricity (choose one) while you focus."
  },
  {
    "name": "Sending",
    "tier": "3",
    "caster": "Wizard",
    "range": "Unlimited",
    "duration": "Instant",
    "damage": "",
    "desc": "Send a brief mental message to a familiar creature anywhere on the same plane."
  },
  {
    "name": "Commune",
    "tier": "4",
    "caster": "Priest",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask the GM up to three yes-or-no questions, answered truthfully."
  },
  {
    "name": "Flame Strike",
    "tier": "4",
    "caster": "Priest",
    "range": "Far",
    "duration": "Instant",
    "damage": "2d6",
    "desc": "A holy pillar of fire strikes one creature you can see in range for 2d6 damage."
  },
  {
    "name": "Pillar of Salt",
    "tier": "4",
    "caster": "Priest",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Turn a creature you can see of LV 5 or less into a salt statue. Keep focus 3 rounds in a row and it becomes permanent."
  },
  {
    "name": "Regenerate",
    "tier": "4",
    "caster": "Priest",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "A touched creature regains 1d4 HP on your turn while you focus, and regrows lost body parts.",
    "heal": "1d4"
  },
  {
    "name": "Wrath",
    "tier": "4",
    "caster": "Priest",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "1d8",
    "desc": "Your weapons become magical +2 and deal an extra 1d8 damage for the duration."
  },
  {
    "name": "Control Water",
    "tier": "4",
    "caster": "Both",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Move and shape water: a section up to 100 feet wide and deep changes shape, defies gravity or changes flow."
  },
  {
    "name": "Arcane Eye",
    "tier": "4",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Conjure an invisible, grape-sized eye in range that you see through (it sees in the dark) and can move each round."
  },
  {
    "name": "Cloudkill",
    "tier": "4",
    "caster": "Wizard",
    "range": "Far",
    "duration": "5 rounds",
    "damage": "2d6",
    "desc": "A spreading near-sized cloud of poison: creatures inside are blinded and take 2d6 damage at the start of their turns; LV 9 or less ending a turn fully inside dies."
  },
  {
    "name": "Confusion",
    "tier": "4",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Mesmerize one creature you can see: it can't take actions and moves randomly. If LV 9+, it may make a WIS check vs. your last spellcasting check each turn to end it."
  },
  {
    "name": "Dimension Door",
    "tier": "4",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Teleport yourself and up to one other willing creature to any point you can see."
  },
  {
    "name": "Divination",
    "tier": "4",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask the GM one yes-or-no question, answered truthfully. Cast it again within 24 hours and a failed check counts as a critical failure."
  },
  {
    "name": "Passwall",
    "tier": "4",
    "caster": "Wizard",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Open a tunnel of your height, up to near deep, through a barrier you touch for the duration."
  },
  {
    "name": "Polymorph",
    "tier": "4",
    "caster": "Wizard",
    "range": "Close",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Turn a touched creature into another natural creature of equal or smaller size (unwilling: LV up to half yours). Reverts at 0 HP."
  },
  {
    "name": "Resilient Sphere",
    "tier": "4",
    "caster": "Wizard",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A weightless glassy sphere surrounds you out to close range; nothing can pass through or crush it. You can roll it a near distance on your turn."
  },
  {
    "name": "Stoneskin",
    "tier": "4",
    "caster": "Wizard",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Your AC becomes 17 (20 on a critical spellcasting check) for the duration."
  },
  {
    "name": "Telekinesis",
    "tier": "4",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Lift a creature or object of 1,000 lb or less with your mind; move it a near distance and hold it in place."
  },
  {
    "name": "Wall of Force",
    "tier": "4",
    "caster": "Wizard",
    "range": "Near",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Conjure a thin, transparent wall of force covering a near-sized area in a shape you choose. Nothing on this plane can physically pass through it."
  },
  {
    "name": "Divine Vengeance",
    "tier": "5",
    "caster": "Priest",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Become your god's avatar: fly near, your weapons are magical, and you gain +4 to weapon attacks and damage."
  },
  {
    "name": "Dominion",
    "tier": "5",
    "caster": "Priest",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Summon mighty beings (16 combined levels or less) that aid you of their own will for 10 rounds. Can't recast until you do penance."
  },
  {
    "name": "Heal",
    "tier": "5",
    "caster": "Priest",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One touched creature is healed to full hit points. You can't cast this again until you rest."
  },
  {
    "name": "Judgment",
    "tier": "5",
    "caster": "Priest",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Banish a touched intelligent creature of LV 10 or less to face your god. It returns in 5 rounds at full HP or 1 HP, as its deeds merit."
  },
  {
    "name": "Prophecy",
    "tier": "5",
    "caster": "Priest",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask the GM one question; it is answered truthfully with your god's knowledge. Can't recast until you complete penance."
  },
  {
    "name": "Plane Shift",
    "tier": "5",
    "caster": "Both",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Transport yourself and willing creatures within close range to another plane of your choice — a random spot there unless you've been to the place before."
  },
  {
    "name": "Antimagic Shell",
    "tier": "5",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "A near-sized cube of null-magic moves with you: no spells can be cast in it, magic items and spells have no effect there, and no magic can enter."
  },
  {
    "name": "Create Undead",
    "tier": "5",
    "caster": "Wizard",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Summon a wight or wraith under your control that acts on your turn. It melts away after 1 day."
  },
  {
    "name": "Disintegrate",
    "tier": "5",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Instant",
    "damage": "3d8",
    "desc": "A green ray turns a creature or object to ash: LV 5 or less dies outright, LV 6+ takes 3d8 damage. Destroys a non-magical object up to tree-sized."
  },
  {
    "name": "Hold Monster",
    "tier": "5",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Paralyze one creature you can see. If it is LV 9+, it can make a STR check vs. your last spellcasting check each turn to end it."
  },
  {
    "name": "Power Word Kill",
    "tier": "5",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "One creature of LV 9 or less that hears your Word of Doom dies."
  },
  {
    "name": "Prismatic Orb",
    "tier": "5",
    "caster": "Wizard",
    "range": "Far",
    "duration": "Instant",
    "damage": "3d8",
    "desc": "An orb of fire, cold or electricity (your choice) deals 3d8 damage to a target in range — double if the energy is anathema to it."
  },
  {
    "name": "Scrying",
    "tier": "5",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "See and hear a chosen creature or location on the same plane while you focus (DC 18 to cast if unfamiliar). Watched creatures may notice with a WIS check each round."
  },
  {
    "name": "Shapechange",
    "tier": "5",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Become a natural creature you've seen of LV 10 or less (gear included), keeping your INT, WIS and CHA. At 0 HP you revert at 1 HP."
  },
  {
    "name": "Summon Extraplanar",
    "tier": "5",
    "caster": "Wizard",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Summon an elemental or outsider of LV 7 or less, under your control and acting on your turn. Lose focus and it turns hostile."
  },
  {
    "name": "Teleport",
    "tier": "5",
    "caster": "Wizard",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "You and willing creatures within close range teleport to a known sigil or a place you've been on this plane; elsewhere, a 50% chance of arriving off-target."
  },
  {
    "name": "Wish",
    "tier": "5",
    "caster": "Wizard",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Alter reality: state one wish as exactly as you can and the GM interprets it. A failed check is a critical failure, with the mishap rolled at disadvantage."
  },
  {
    "name": "Cauldron",
    "tier": "1",
    "caster": "Witch",
    "range": "Close",
    "duration": "1 round",
    "damage": "",
    "desc": "Conjure a bubbling cauldron. One effect: repair a broken mundane item; produce an obedient toad for 3 rounds; or store/expel up to 3 item slots of gear."
  },
  {
    "name": "Charm Person",
    "tier": "1",
    "caster": "Witch",
    "range": "Near",
    "duration": "1d8 days",
    "damage": "",
    "desc": "One humanoid LV 2 or less treats you as a friend. Ends if you or your allies harm it. The target knows it was enchanted afterward."
  },
  {
    "name": "Eyebite",
    "tier": "1",
    "caster": "Witch",
    "range": "Near",
    "duration": "Instant",
    "damage": "1d4",
    "desc": "Target takes 1d4 damage and can't see you until the end of its next turn."
  },
  {
    "name": "Fog",
    "tier": "1",
    "caster": "Witch",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "A fog cloud blooms around you and moves with you. Attacks against creatures inside have disadvantage."
  },
  {
    "name": "Hypnotize",
    "tier": "1",
    "caster": "Witch",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature LV 3 or less that can see you is stupefied. Breaking line of sight lets it try a DC 15 CHA check to end the spell."
  },
  {
    "name": "Oak, Ash, Thorn",
    "tier": "1",
    "caster": "Witch",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Faeries, demons, and devils can't attack, possess, compel, or beguile you."
  },
  {
    "name": "Puppet",
    "tier": "1",
    "caster": "Witch",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "One humanoid LV 2 or less you touch mimics your movements on your turn. DC 15 CHA to resist if mimicking would harm itself or an ally."
  },
  {
    "name": "Shadowdance",
    "tier": "1",
    "caster": "Witch",
    "range": "Near",
    "duration": "3 rounds",
    "damage": "",
    "desc": "Spin a person-sized audiovisual illusion that can move within near of where it appeared. It can't affect physical objects; touching it reveals it."
  },
  {
    "name": "Willowman",
    "tier": "1",
    "caster": "Witch",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "One creature LV 2 or less must immediately make a morale check — even creatures normally immune to them, such as undead."
  },
  {
    "name": "Witchlight",
    "tier": "1",
    "caster": "Witch",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Summon a floating marsh light casting light to close radius. It changes color, takes vague shapes, and can float a near distance on your turn."
  },
  {
    "name": "Alter Self",
    "tier": "2",
    "caster": "Witch",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Gain one feature modifying your existing anatomy (gills, claws, etc). Can't grow wings or new limbs."
  },
  {
    "name": "Augury",
    "tier": "2",
    "caster": "Witch",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask the GM one question about a specific course of action. The GM says whether it leads to weal or woe."
  },
  {
    "name": "Bogboil",
    "tier": "2",
    "caster": "Witch",
    "range": "Far",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Turn a near-sized cube of ground into boiling quicksand. Stuck creatures can't move; DEX check vs. your spellcasting check to escape."
  },
  {
    "name": "Cacklerot",
    "tier": "2",
    "caster": "Witch",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "One target LV 4 or less you touch collapses helplessly with pained laughter."
  },
  {
    "name": "Cat's Eye",
    "tier": "2",
    "caster": "Witch",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Your eyes become slitted. You can see invisible creatures and secret doors."
  },
  {
    "name": "Frog Rain",
    "tier": "2",
    "caster": "Witch",
    "range": "Far",
    "duration": "Instant",
    "damage": "1d6",
    "desc": "Indignant frogs pelt a near-sized cube around a point you can see. All creatures inside take 1d6 damage."
  },
  {
    "name": "Invisibility",
    "tier": "2",
    "caster": "Witch",
    "range": "Close",
    "duration": "10 rounds",
    "damage": "",
    "desc": "A creature you touch turns invisible. Ends if the target attacks or casts a spell."
  },
  {
    "name": "Poison",
    "tier": "2",
    "caster": "Witch",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "1d6",
    "desc": "One worn or carried object becomes toxic. Any creature touching it at the start of its turn takes 1d6 damage."
  },
  {
    "name": "Spidersilk",
    "tier": "2",
    "caster": "Witch",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Sticky silk covers your hands and feet. You can walk on vertical surfaces as easily as flat ground."
  },
  {
    "name": "Toadstool",
    "tier": "2",
    "caster": "Witch",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Conjure a toadstool that vanishes at the end of your next turn. A creature that eats it regains 1d6 HP.",
    "heal": "1d6"
  },
  {
    "name": "Broomstick",
    "tier": "3",
    "caster": "Witch",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Conjure a flying broomstick. Its rider can fly a near distance each round and hover in place."
  },
  {
    "name": "Coven",
    "tier": "3",
    "caster": "Witch",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Regain the use of one tier 3 or lower spell you can no longer cast today. Can't cast again until you rest."
  },
  {
    "name": "Divination",
    "tier": "3",
    "caster": "Witch",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask the GM one yes/no question; the GM answers truthfully. Cast twice in 24 hours and a failed check becomes a critical failure."
  },
  {
    "name": "Howl",
    "tier": "3",
    "caster": "Witch",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "All enemies within near must immediately make a morale check. No effect on creatures immune to morale checks."
  },
  {
    "name": "Mistletoe",
    "tier": "3",
    "caster": "Witch",
    "range": "Near",
    "duration": "1d8 days",
    "damage": "",
    "desc": "Two creatures you can see become enchanted with each other. Each time one takes damage it may make a DC 15 CHA check to end the spell."
  },
  {
    "name": "Pin Doll",
    "tier": "3",
    "caster": "Witch",
    "range": "Same plane",
    "duration": "Focus",
    "damage": "2d6",
    "desc": "Pin hair or flesh from a creature to a conjured doll. While focusing, push in a pin on your turn to deal 2d6 damage to that creature."
  },
  {
    "name": "Speak With Dead",
    "tier": "3",
    "caster": "Witch",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Ask a corpse up to three yes/no questions; the GM answers truthfully. Cast twice in 24 hours and a failed check becomes a critical failure."
  },
  {
    "name": "Swarm",
    "tier": "3",
    "caster": "Witch",
    "range": "Far",
    "duration": "Focus",
    "damage": "2d6",
    "desc": "A swarm of bats, rats, or locusts fills a near-sized cube. Creatures starting their turn inside take 2d6 damage and are blinded."
  },
  {
    "name": "Void Stare",
    "tier": "3",
    "caster": "Witch",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature LV 6 or less you can see falls under your control. You decide its actions on its turn."
  },
  {
    "name": "Whisper",
    "tier": "3",
    "caster": "Witch",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Plant a brief false memory the target believes. On a failed check the GM plants a false memory in YOUR mind instead."
  },
  {
    "name": "Beguile",
    "tier": "4",
    "caster": "Witch",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Conjure a convincing audiovisual illusion. Touching it reveals it. You may force an interacting creature to make a DC 15 WIS check or become enchanted and protect it."
  },
  {
    "name": "Cloak of Night",
    "tier": "4",
    "caster": "Witch",
    "range": "Self",
    "duration": "8 rounds",
    "damage": "",
    "desc": "Your AC becomes 17 (20 on a critical spellcasting check). Advantage on DEX checks to sneak and hide."
  },
  {
    "name": "Curse",
    "tier": "4",
    "caster": "Witch",
    "range": "Close",
    "duration": "Permanent",
    "damage": "",
    "desc": "Afflict a creature you touch with one curse: boils and warts, food tastes of ash, shrill voice, nightmares, always lose at gambling, an ally turns enemy, or fear of something ordinary."
  },
  {
    "name": "Dimension Door",
    "tier": "4",
    "caster": "Witch",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Teleport yourself and up to one other willing creature within close to any point you can see."
  },
  {
    "name": "Glassbones",
    "tier": "4",
    "caster": "Witch",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "A creature you touch becomes fragile and takes double damage for the duration."
  },
  {
    "name": "Moonbeam",
    "tier": "4",
    "caster": "Witch",
    "range": "Far",
    "duration": "Instant",
    "damage": "3d6",
    "desc": "A silvery ray of moonlight strikes one creature within far for 3d6 damage."
  },
  {
    "name": "Nightmare",
    "tier": "4",
    "caster": "Witch",
    "range": "Same plane",
    "duration": "Focus",
    "damage": "",
    "desc": "Send nightmares to a sleeping creature of level <= half yours that you've seen in person. Focus 3 rounds in a row and it dies of fright."
  },
  {
    "name": "Polymorph",
    "tier": "4",
    "caster": "Witch",
    "range": "Close",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Transform a creature you touch into a natural creature of equal or smaller size. It gains physical stats/features, keeps mental ones. Willing target, or unwilling of level <= half yours."
  },
  {
    "name": "Anathema",
    "tier": "5",
    "caster": "Witch",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "All allies revile and abandon the creature you touch for 1 day. Each time you or your allies harm it, its former allies may pass a DC 15 WIS check to end the spell."
  },
  {
    "name": "Dreamwalk",
    "tier": "5",
    "caster": "Witch",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "You and willing creatures within close step into the dream of a named sleeping creature on your plane, then step out beside it as if teleported."
  },
  {
    "name": "Enfeeble",
    "tier": "5",
    "caster": "Witch",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "A creature you touch has a random stat (d6) reduced to 3 for one week. On a failed check this happens to YOU instead."
  },
  {
    "name": "Finger of Death",
    "tier": "5",
    "caster": "Witch",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One creature you touch of LV 9 or less dies. A failed check is a critical failure; roll the mishap with disadvantage."
  },
  {
    "name": "Mother of Night",
    "tier": "5",
    "caster": "Witch",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Make a single wish, stated as exactly as possible; it occurs as the GM interprets it. On a failed check she pulls you into The Nightfall for judgment."
  },
  {
    "name": "Scrying",
    "tier": "5",
    "caster": "Witch",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "See and hear a creature or location on your plane. DC 18 if unfamiliar. Each round the target may make a WIS check vs. your last spellcasting check to notice you."
  },
  {
    "name": "Shapechange",
    "tier": "5",
    "caster": "Witch",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "Transform into a natural creature of LV 10 or less you've seen. Gain its physical stats/features; keep INT, WIS, CHA. At 0 HP you revert at 1 HP."
  },
  {
    "name": "Soul Jar",
    "tier": "5",
    "caster": "Witch",
    "range": "Close",
    "duration": "Permanent",
    "damage": "",
    "desc": "Transfer the soul of a creature LV 9 or less into a vessel; its body goes comatose. You may possess the empty body. If the vessel opens or breaks, the soul returns."
  },
  {
    "name": "Breath",
    "tier": "1",
    "caster": "Druid",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "You can hold your breath for the spell's duration."
  },
  {
    "name": "Instill",
    "tier": "1",
    "caster": "Druid",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "One weapon you wield is imbued with life force and becomes a +1 weapon. A staff deals d6 damage instead of d4."
  },
  {
    "name": "Oxidize",
    "tier": "1",
    "caster": "Druid",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One inanimate object you touch, the size of a door or less, ages d100 years."
  },
  {
    "name": "Whisperwind",
    "tier": "1",
    "caster": "Druid",
    "range": "Far",
    "duration": "Instant",
    "damage": "",
    "desc": "Send a brief, whispered message that reaches any creature in range."
  },
  {
    "name": "Barkskin",
    "tier": "2",
    "caster": "Druid",
    "range": "Self",
    "duration": "1 day",
    "damage": "",
    "desc": "Your skin hardens to bark. Your AC becomes 15 (18 on a critical spellcasting check). You take double damage from fire while it lasts."
  },
  {
    "name": "Befriend",
    "tier": "2",
    "caster": "Druid",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A tiny natural creature you touch (mouse, moth) regards you as a friend. You may give it one command, which it attempts even after the spell ends — unless the command would directly harm it."
  },
  {
    "name": "Magnetize",
    "tier": "2",
    "caster": "Druid",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "One object you touch up to horse-size becomes powerfully magnetized, attracting smaller magnetic objects within near and being pulled toward larger ones. A metal creature resists with a STR check vs. your spellcasting check."
  },
  {
    "name": "Truespeech",
    "tier": "2",
    "caster": "Druid",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "A natural creature you touch can communicate with you. Ask it one yes/no question; the GM answers truthfully. Cast twice on the same creature in 24 hours and a failed check becomes a critical failure."
  },
  {
    "name": "Alchemy",
    "tier": "3",
    "caster": "Druid",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One inanimate object of human size or less you touch turns into another material of equal or lesser value."
  },
  {
    "name": "Anima",
    "tier": "3",
    "caster": "Druid",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "Animate one natural object you touch (horse-sized or less) as a loyal creature of your level. It acts on your turn only when you use your action to command it. AC 10+LV, HP 4.5xLV, ATK 2 bash +7 (1d12), MV near."
  },
  {
    "name": "Locusts",
    "tier": "3",
    "caster": "Druid",
    "range": "Near",
    "duration": "Focus",
    "damage": "1d10",
    "desc": "A cloud of biting locusts fills an area out to near and moves with you; you are unaffected. Creatures inside take 1d10 damage at the start of their turn and must pass a CON check vs. your last spellcasting check or be unable to move."
  },
  {
    "name": "Treeshape",
    "tier": "3",
    "caster": "Druid",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "You and your gear become a treant (AC 14, HP 38, 2 slam +8 1d12 or rock (far) +8 2d6). You keep INT/WIS/CHA, lack Animate Tree, and cannot cast spells while transformed."
  },
  {
    "name": "Mycelium",
    "tier": "4",
    "caster": "Druid",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Connect your mind to the earth's fungi network. Ask the GM one question of up to 15 words; the GM answers truthfully in up to 15 words. Cast twice in 24 hours and a failed check becomes a critical failure."
  },
  {
    "name": "Summon Storm",
    "tier": "4",
    "caster": "Druid",
    "range": "1 mile",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Summon a violent storm out to one mile — darkened skies, severe wind, driving rain. For the duration you can cast control water and lightning bolt even if you don't know them."
  },
  {
    "name": "Earthquake",
    "tier": "5",
    "caster": "Druid",
    "range": "Double near",
    "duration": "Instant",
    "damage": "4d6",
    "desc": "The earth splits open. All creatures on the ground within double near take 4d6 damage. Each affected creature of LV 9 or less must pass a DEX check equal to the damage taken or be swallowed by the earth forever."
  },
  {
    "name": "Naming",
    "tier": "5",
    "caster": "Druid",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Learn the True Name of one creature you touch. If willing, you may give it a new True Name (once in its lifetime) — doing so changes its alignment to match yours."
  },
  {
    "name": "Cleanse",
    "tier": "1",
    "caster": "Mage",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "You expunge natural toxins from one creature you touch, ending the effects of one poison currently affecting the target."
  },
  {
    "name": "Flare",
    "tier": "1",
    "caster": "Mage",
    "range": "Near",
    "duration": "1 round",
    "damage": "",
    "desc": "A flash of blinding, white light bursts from you. All enemies in range who see it are blinded for the spell's duration."
  },
  {
    "name": "Reveal",
    "tier": "1",
    "caster": "Mage",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "End all invisibility effects out to a near distance from you. You also become aware of the location of any hiding creatures within range."
  },
  {
    "name": "Ward",
    "tier": "1",
    "caster": "Mage",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "You ward yourself with a magical charm against ambush. You can't be surprised (you roll initiative during surprise rounds and are treated as aware of all enemies)."
  },
  {
    "name": "Absorb",
    "tier": "2",
    "caster": "Mage",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "You create an absorptive barrier of force around you. Halve all damage you take for the spell's duration (round down)."
  },
  {
    "name": "Meld",
    "tier": "2",
    "caster": "Mage",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "You merge slightly with the ethereal plane, freeing yourself from physical hindrances. You may ignore any effect that would impact your movement for the duration."
  },
  {
    "name": "Pacify",
    "tier": "2",
    "caster": "Mage",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Choose one creature within range of LV 3 or less. It must make a morale check (creatures immune to morale checks are not affected)."
  },
  {
    "name": "Push/Pull",
    "tier": "2",
    "caster": "Mage",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "You move one human-sized object or a creature of LV 4 or less a near distance. If the target is anchored in a way that prevents free movement, the DC to cast is 18."
  },
  {
    "name": "Banish",
    "tier": "3",
    "caster": "Mage",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "With a word of power, you send one extraplanar creature of LV 6 or less who hears you back to its dimension of origin."
  },
  {
    "name": "Forbid",
    "tier": "3",
    "caster": "Mage",
    "range": "Self",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Creatures cannot teleport into, out of, or within an area of effect extending out to double near from you. The area moves with you."
  },
  {
    "name": "Identify",
    "tier": "3",
    "caster": "Mage",
    "range": "Touch",
    "duration": "Instant",
    "damage": "",
    "desc": "You learn all the magical properties of one item you touch. You cannot cast this spell again until you complete a rest."
  },
  {
    "name": "Speak With Object",
    "tier": "3",
    "caster": "Mage",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "An object you touch mentally answers up to three yes/no questions (one at a time); the GM answers truthfully. Its wit matches the rarity of its materials. Cast twice in 24 hours and a failed check becomes a critical failure."
  },
  {
    "name": "Glyph",
    "tier": "4",
    "caster": "Mage",
    "range": "Close",
    "duration": "1 week",
    "damage": "3d6",
    "desc": "Draw an arcane symbol on an object with one effect: Bind (reader of LV 6 or less is paralyzed 1 hour); Harm (reader takes 3d6 damage); Message (reader hears a brief mental message); or Teleportation Sigil (treat as a sigil per teleport). The glyph disappears once activated."
  },
  {
    "name": "Stasis",
    "tier": "4",
    "caster": "Mage",
    "range": "Close",
    "duration": "Indefinite",
    "damage": "",
    "desc": "A willing creature you touch is suspended in time (unwilling targets must be LV 5 or less). It becomes unconscious, does not age, and its bodily functions cease, though it remains alive. End the spell at will or on a condition you set while casting."
  },
  {
    "name": "Abjure",
    "tier": "5",
    "caster": "Mage",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "You and one creature you touch both die."
  },
  {
    "name": "Permanence",
    "tier": "5",
    "caster": "Mage",
    "range": "Close",
    "duration": "1 year",
    "damage": "",
    "desc": "Sprinkle a powdered diamond on one object in range that is under the effects of a spell you cast; that spell's duration becomes 1 year. You cannot alter the original spell's effects afterward."
  },
  {
    "name": "Blight",
    "tier": "1",
    "caster": "Sorcerer",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A close-sized patch of earth around you crumbles into lifeless ash. You gain +1 to your spellcasting checks for the spell's duration."
  },
  {
    "name": "Eyebite",
    "tier": "1",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "Instant",
    "damage": "1d4",
    "desc": "One creature you target takes 1d4 damage, and it can't see you until the end of its next turn."
  },
  {
    "name": "Mischief",
    "tier": "1",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Beguile one humanoid of LV 2 or less. Each round it tries to commit a sneaky, cruel act that hinders or inconveniences its nearest ally. The spell ends if you or your allies do anything to hurt the target that it notices."
  },
  {
    "name": "Protection From Good",
    "tier": "1",
    "caster": "Sorcerer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "Lawful beings have disadvantage on attack rolls and hostile spellcasting checks against the target, and can't possess, compel, or beguile it. Cast on an already-possessed target, the possessing entity makes a CHA check vs. your last spellcasting check or is expelled."
  },
  {
    "name": "Envenom",
    "tier": "2",
    "caster": "Sorcerer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Turn one cup or vial of potable liquid into a toxic poison that still appears to be the original liquid. A living creature of LV 10 or less who drinks it must pass a DC 15 CON check or go to 0 HP."
  },
  {
    "name": "Phantoms",
    "tier": "2",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "A terrifying illusion appears in the mind of one target of LV 3 or less in range. The target must immediately make a morale check."
  },
  {
    "name": "Wither",
    "tier": "2",
    "caster": "Sorcerer",
    "range": "Close",
    "duration": "Instant",
    "damage": "1d6",
    "desc": "Your touch drains the life-energy of one target in range, dealing 1d6 damage. The target takes double damage from the next attack or damage-dealing spell that strikes it."
  },
  {
    "name": "Wrack",
    "tier": "2",
    "caster": "Sorcerer",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature you can see of LV 5 or less is overcome by agonizing pain. It must pass a CON check on its turn equal to your last spellcasting check or it cannot move or act."
  },
  {
    "name": "Betrayal",
    "tier": "3",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature of LV 7 or less you can see turns on its allies, regarding them as hostile enemies for the spell's duration."
  },
  {
    "name": "Defile",
    "tier": "3",
    "caster": "Sorcerer",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "A near-sized circle of earth around you disintegrates into infertile ash. For the duration, treat all tier 1-3 spells you successfully cast as critical successes. You cannot cast this spell while under its effects."
  },
  {
    "name": "Mazzim's Mesmerism",
    "tier": "3",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "At the start of their turn, all humanoid creatures of LV 5 or less in range must pass a CHA check vs. your last spellcasting check. Creatures who fail stand motionless and agape, staring at unseen images."
  },
  {
    "name": "Unlife",
    "tier": "3",
    "caster": "Sorcerer",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "A humanoid skull you touch animates with red witchlight in its eyes and can converse in Common. It retains its personality and memories, though recall can be spotty. When the spell ends, the skull crumbles into grave dust."
  },
  {
    "name": "Dismember",
    "tier": "4",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "Focus",
    "damage": "1d8",
    "desc": "One creature of LV 9 or less loses an arm or leg (roll randomly), taking 1d8 damage each time. It loses a new limb each round of the duration; with no limbs left, it is beheaded and dies."
  },
  {
    "name": "Dominate",
    "tier": "4",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "You subjugate the will of one creature of LV 9 or less you can see. It cannot act except to follow your commands. On your turn you command it to take actions and move; it acts on its own turn following your instructions."
  },
  {
    "name": "Feeblemind",
    "tier": "5",
    "caster": "Sorcerer",
    "range": "Near",
    "duration": "1d8 days",
    "damage": "",
    "desc": "One creature of LV 10 or less has its INT and CHA reduced to 1 for the duration. It can't cast spells."
  },
  {
    "name": "Subjugate",
    "tier": "5",
    "caster": "Sorcerer",
    "range": "Close",
    "duration": "1 year",
    "damage": "",
    "desc": "Sprinkle a powdered diamond on one creature in range currently under the effects of a dominate, feeblemind, or polymorph spell you cast. That spell's duration becomes 1 year."
  },
  {
    "name": "First Gate",
    "tier": "1",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Target a living creature of LV 2 or less, or an undead creature of LV 4 or less. It falls into a deep sleep. Being injured wakes it."
  },
  {
    "name": "Protection From Evil",
    "tier": "1",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "Chaotic beings have DISADV on attacks and hostile spellcasting checks vs. the target, and can't possess, compel, or beguile it. Cast on a possessed target, the entity makes a CHA check vs. your last spellcasting check or is expelled."
  },
  {
    "name": "Seal Soul",
    "tier": "1",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Permanent",
    "damage": "",
    "desc": "One dead body you touch is sealed against necromantic energy. It cannot be made into undead or possessed by a dead spirit."
  },
  {
    "name": "Turn Undead",
    "tier": "1",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Undead in near make a CHA check vs. your spellcasting check. Fail by 10+ and ≤ your level = destroyed. Otherwise they flee from you for 5 rounds."
  },
  {
    "name": "Undeath",
    "tier": "1",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Touch a humanoid's remains (3+ limbs and head intact); it rises as a zombie or skeleton under your control and acts on your turn. Only one at a time. When the spell ends, the corpse collapses into grave dust."
  },
  {
    "name": "Withermark",
    "tier": "1",
    "caster": "Necromancer",
    "range": "Far",
    "duration": "Instant",
    "damage": "1d4",
    "desc": "Fling a dark rune of necrotic energy at a target: 1d4 damage (2d4 at 5th level). Undead are unharmed by this spell."
  },
  {
    "name": "Bane",
    "tier": "2",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "5 rounds",
    "damage": "1d6",
    "desc": "One weapon you touch is empowered with necrotic energy, dealing +1d6 damage against living creatures for the duration."
  },
  {
    "name": "Command Undead",
    "tier": "2",
    "caster": "Necromancer",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Issue a one-word verbal command to one undead creature of LV 5 or less in range. It obeys for as long as you focus."
  },
  {
    "name": "Final Toll",
    "tier": "2",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One undead you touch of LV 2 or less instantly crumbles to dust."
  },
  {
    "name": "Ghoul Touch",
    "tier": "2",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "1d6",
    "desc": "Strike at a living creature's life force for 1d6 damage. If the target is LV 4 or less, it is paralyzed for 1d4 rounds."
  },
  {
    "name": "Lamentation",
    "tier": "2",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Sing a death dirge about one creature of level ≤ your own. It cannot act on its turn unless it passes a CHA check equal to your last spellcasting check."
  },
  {
    "name": "Second Gate",
    "tier": "2",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Render one creature in range mute: it cannot speak and has DISADV on spellcasting checks. Instead, you may restore lost speech and/or thought to one creature in range."
  },
  {
    "name": "Animate Dead",
    "tier": "3",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Touch a humanoid's remains (3+ limbs and head intact); it rises as a zombie or skeleton under your control and acts on your turn. After 1 day, it collapses into grave dust."
  },
  {
    "name": "Drain Life",
    "tier": "3",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "2d6",
    "desc": "One living creature you touch takes 2d6 damage; you regain HP equal to half the damage dealt (round down). Against undead, you take the damage and it regains HP instead."
  },
  {
    "name": "Lay To Rest",
    "tier": "3",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Instantly destroy one undead creature you touch of LV 9 or less, sending it to its final afterlife."
  },
  {
    "name": "Reap The Soul",
    "tier": "3",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Draw life force from one creature in range killed within the last round. Gain HP and a bonus to your next attack roll or spellcasting check equal to the target's level."
  },
  {
    "name": "Speak With Dead",
    "tier": "3",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "A dead body you touch answers up to three yes/no questions (one at a time), truthfully. Cast more than once in 24 hours: a failed check is a critical failure instead."
  },
  {
    "name": "Third Gate",
    "tier": "3",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Read the mind of a creature in range, learning one memory of your choosing. Instead, you may permanently erase one of its memories."
  },
  {
    "name": "Ashes To Ashes",
    "tier": "4",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "Target a living creature you can see of LV 5 or less. If you focus successfully for 3 rounds in a row, it dies and crumbles into a pile of ash."
  },
  {
    "name": "Excoriate",
    "tier": "4",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Focus",
    "damage": "1d10",
    "desc": "Burn the life force from one living creature in range, dealing 1d10 damage per round. Undead are healed by this spell instead."
  },
  {
    "name": "Fourth Gate",
    "tier": "4",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Transform a willing creature you touch of LV 10 or less into an undead creature of equal or lesser level; its gear melds into the new form. Instead, you may restore a shape-changed creature to its original form."
  },
  {
    "name": "Necronomicon",
    "tier": "4",
    "caster": "Necromancer",
    "range": "Self",
    "duration": "3 rounds",
    "damage": "",
    "desc": "Ask the GM up to three yes or no questions (one each round); the GM answers truthfully. Cast more than once a week: a failed check is a critical failure instead."
  },
  {
    "name": "Revenant",
    "tier": "4",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Transform an undead creature you touch into another undead creature up to three levels higher. You can't bring an undead creature above 10th level with this spell."
  },
  {
    "name": "Vision",
    "tier": "4",
    "caster": "Necromancer",
    "range": "Self",
    "duration": "5 rounds",
    "damage": "",
    "desc": "Cast only while standing in a river. For the duration you can see and hear one creature or location you choose. A failed spellcasting check for this spell is a critical failure."
  },
  {
    "name": "Anchor In Death",
    "tier": "5",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "Permanent",
    "damage": "",
    "desc": "One creature you touch of LV 10 or less is fixed in place by a black thread (cut only by a silver or magic blade, ending the spell). It becomes comatose and immune to all harm."
  },
  {
    "name": "Create Undead",
    "tier": "5",
    "caster": "Necromancer",
    "range": "Close",
    "duration": "1 day",
    "damage": "",
    "desc": "Summon a wight or wraith (your choice) next to you, under your control. It acts on your turn. After 1 day, it melts away into smoke."
  },
  {
    "name": "Dust To Dust",
    "tier": "5",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Present your holy symbol. All undead of LV 10 or less in range make a DC 15 CHA check. On a failure, they are destroyed."
  },
  {
    "name": "Fifth Gate",
    "tier": "5",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "One dying creature in range gains 5 rounds on its death timer and may act normally while dying. Damage taken instead costs it a round on the timer. If it dies, DC 18 CON to return to life at 1 HP."
  },
  {
    "name": "Riverwalk",
    "tier": "5",
    "caster": "Necromancer",
    "range": "Far",
    "duration": "Instant",
    "damage": "",
    "desc": "Cast only while standing in a river. You and any willing creatures within close range teleport to another river you've stood in on your same plane."
  },
  {
    "name": "Summon Soul",
    "tier": "5",
    "caster": "Necromancer",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "An undead being whose name you know appears within near and aids you of its own free will, acting on your turn. Harming it ends the spell. You can't summon the same being again for a year."
  },
  {
    "name": "Chant",
    "tier": "1",
    "caster": "Seer",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "You see all invisible and hidden things as though plainly visible. This does not let you see in ways you normally could not (in darkness, through walls)."
  },
  {
    "name": "Evoke Rage",
    "tier": "1",
    "caster": "Seer",
    "range": "Close",
    "duration": "1d4 rounds",
    "damage": "1d4",
    "desc": "One willing humanoid you touch goes berserk: immune to morale checks, ADV on STR checks and melee attacks, +1d4 damage. Ends if the target does not attack a creature on its turn."
  },
  {
    "name": "Potion",
    "tier": "1",
    "caster": "Seer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Bless a single drink of any liquid; for 1 day it gains healing properties. A creature who imbibes it may end one poison or immediately stop dying (remaining at 0 HP)."
  },
  {
    "name": "Trance",
    "tier": "1",
    "caster": "Seer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "One humanoid you touch (not yourself) gains a luck token. It can't have more than one luck token at once."
  },
  {
    "name": "Fate",
    "tier": "2",
    "caster": "Seer",
    "range": "Near",
    "duration": "Instant",
    "damage": "1d10",
    "desc": "Twist the golden threads of one creature's fate: it takes 1d10 damage and loses any luck tokens it has."
  },
  {
    "name": "Read The Runes",
    "tier": "2",
    "caster": "Seer",
    "range": "Self",
    "duration": "Instant",
    "damage": "",
    "desc": "Cast the runestones and ask the GM one yes or no question. The GM answers truthfully, \"yes\" or \"no.\""
  },
  {
    "name": "Sacrifice",
    "tier": "2",
    "caster": "Seer",
    "range": "Close",
    "duration": "Instant",
    "damage": "",
    "desc": "Ritually sacrifice a living creature of LV 2 or higher. The target you touch gains a bonus to their next check or attack roll equal to the sacrificed creature's level."
  },
  {
    "name": "Soulbind",
    "tier": "2",
    "caster": "Seer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature you touch becomes nearly impervious to magic: all other spells targeting it (harmful or helpful) are DC 18 to cast. Ends as soon as the target is affected by another spell."
  },
  {
    "name": "Cast Out",
    "tier": "3",
    "caster": "Seer",
    "range": "Far",
    "duration": "Focus",
    "damage": "",
    "desc": "Choose a creature you can see. For the duration it can't come within near range of you, though it can still attack you from outside near range."
  },
  {
    "name": "Hallucinate",
    "tier": "3",
    "caster": "Seer",
    "range": "Near",
    "duration": "Focus",
    "damage": "",
    "desc": "One creature in near whose level is ≤ your own is overcome by visions. It cannot act on its turn unless it passes a Wisdom check equal to your last spellcasting check."
  },
  {
    "name": "Raven",
    "tier": "3",
    "caster": "Seer",
    "range": "Unlimited",
    "duration": "Instant",
    "damage": "",
    "desc": "Speak a short sentence and the name of its recipient, dead or alive. Odin's ravens carry it across all worlds — that creature hears it whispered in its mind."
  },
  {
    "name": "Wolfshape",
    "tier": "3",
    "caster": "Seer",
    "range": "Self",
    "duration": "Focus",
    "damage": "",
    "desc": "You and your gear become a wolf: assume its STR, DEX, CON, HP, AC, speed, attacks and physical traits, but keep INT, WIS, CHA. You can still cast spells. At 0 HP you revert at 0 HP. At level 5+, you may become a dire wolf or winter wolf."
  },
  {
    "name": "Freya's Omen",
    "tier": "4",
    "caster": "Seer",
    "range": "Self",
    "duration": "1d6 rounds",
    "damage": "",
    "desc": "For the duration you do not lose the ability to cast a spell if you fail its spellcasting check. On a critical failure you may reroll the check once and must use the new result."
  },
  {
    "name": "Loki's Trickery",
    "tier": "4",
    "caster": "Seer",
    "range": "Near",
    "duration": "Instant",
    "damage": "",
    "desc": "Target one creature that can hear and understand you. Make one plausible statement, true or not. It makes a Wisdom check vs. your spellcasting check; on a failure it believes the statement as fact."
  },
  {
    "name": "Odin's Wisdom",
    "tier": "4",
    "caster": "Seer",
    "range": "Self",
    "duration": "1d6 rounds",
    "damage": "",
    "desc": "For the duration, add your level as an additional bonus to your Wisdom checks and spellcasting checks."
  },
  {
    "name": "Thor's Thunder",
    "tier": "4",
    "caster": "Seer",
    "range": "Far",
    "duration": "Instant",
    "damage": "3d6",
    "desc": "Thor casts down a bolt of lightning to strike one target for 3d6 damage."
  },
  {
    "name": "Ragnarok",
    "tier": "5",
    "caster": "Seer",
    "range": "Far",
    "duration": "Instant",
    "damage": "",
    "desc": "Choose one creature in range (only once ever per creature). It must pass a CON check equal to your spellcasting check or die instantly."
  },
  {
    "name": "Valkyrie",
    "tier": "5",
    "caster": "Seer",
    "range": "Near",
    "duration": "10 rounds",
    "damage": "",
    "desc": "Summon a valkyrie within near. She acts of her own free will to help you and returns to Valhalla when the spell ends. You can't cast this again until you complete penance."
  },
  {
    "name": "World Serpent",
    "tier": "5",
    "caster": "Seer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "The venom of the World Serpent drips from the weapons of a creature you touch: it deals x2 damage with each attack (x4 on a critical hit) for the duration."
  },
  {
    "name": "World Tree",
    "tier": "5",
    "caster": "Seer",
    "range": "Close",
    "duration": "Focus",
    "damage": "",
    "desc": "The roots of the World Tree wrap around the soul of a creature you touch: for the duration, it can't be brought below 1 HP."
  }
];
