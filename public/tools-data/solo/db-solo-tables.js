/* SOLO PLAY — Dragonbane solo rules tables (window.DB_SOLO_TABLES).
 *
 * Source: "Alone in Deepfall Breach" (Free League, Dragonbane solo adventure
 * v1.2; solo rules by Shawn Tomkin & Matt Click). Every table below was checked
 * row by row against the PDF on 2026-11-01. Table entries are the book's own
 * short prompts; the longer rule notes are paraphrased.
 *
 * Part of the removable Solo Play feature — see SOLO-REMOVAL.md. Nothing outside
 * the solo page reads this file.
 */
(function () {
  "use strict";
  var W = window;

  // FORTUNE CHART — one D6, read from the column that fits the question.
  // Likely no / low: 2D6 keep lowest. Likely yes / high: 2D6 keep highest.
  var FORTUNE = {
    columns: [
      { id: "yesno", label: "Yes / No", example: "Is the passage guarded?" },
      { id: "number", label: "Number", example: "How large is the band of orcs?" },
      { id: "scale", label: "Scale", example: "How wide is the pit?" },
      { id: "power", label: "Power", example: "How potent is the spell?" },
      { id: "quality", label: "Quality", example: "What is the value of the gem?" },
      { id: "reaction", label: "Reaction", example: "What is the goblin's demeanor?" }
    ],
    // index 0 = roll 1, 1 = 2–3, 2 = 4–5, 3 = 6
    rows: {
      yesno: ["Extreme no", "No", "Yes", "Extreme yes"],
      number: ["None / one", "Few", "Several", "Numerous"],
      scale: ["Small", "Moderate", "Large", "Immense"],
      power: ["Weak", "Minor", "Formidable", "Incredible"],
      quality: ["Flawed", "Mundane", "Fine", "Precious"],
      reaction: ["Hostile", "Wary", "Open", "Friendly"]
    },
    band: function (n) { return n <= 1 ? 0 : n <= 3 ? 1 : n <= 5 ? 2 : 3; }
  };

  // INSPIRATION TABLE — D20 per column; roll one column or several to build a phrase.
  var INSPIRATION = {
    action: ["Avenge", "Control", "Craft", "Deliver", "Destroy", "Escape", "Find", "Guard", "Hunt", "Infiltrate",
      "Protect", "Rescue", "Restore", "Scavenge", "Search", "Seize", "Stop", "Strengthen", "Summon", "Weaken"],
    attribute: ["Ancient", "Arcane", "Blocked", "Corrupted", "Cursed", "Damaged", "Dangerous", "Decaying", "Destroyed", "Flooded",
      "Forgotten", "Secret", "Lost", "Mighty", "Moving", "Peaceful", "Protected", "Sacred", "Transformed", "Violent"],
    thing: ["Barrier", "Captivity", "Conflict", "Creature", "Death", "Defense", "Device", "Group", "History", "Knowledge",
      "Leader", "Message", "Path", "Person", "Power", "Refuge", "Resource", "Trap", "Treasure", "Weapon"]
  };

  // DRAGON AND DEMON EFFECTS (outside combat) — D6. In combat, use the Rulebook's effects.
  var DRAGON_DEMON = [
    ["You uncover a helpful item or resource", "An important item is lost or broken"],
    ["The action is performed faster than usual", "You suffer a dangerous delay"],
    ["You impress others or create a distraction", "You draw unwanted attention"],
    ["You reveal a new opportunity or clue", "You stumble into a new danger"],
    ["You trigger an unexpected beneficial effect", "You trigger an unexpected reaction or trap"],
    ["The action yields greater results than usual", "You cause collateral damage or injure yourself"]
  ];

  // SIMPLE NPC TEMPLATES — no heroic abilities or WP.
  var TEMPLATES = {
    minion: { name: "Minion", attributes: 10, movement: 10, hp: 12, armor: 0, damage: "2D6", relevant: 12, other: 6 },
    boss: { name: "Boss", attributes: 14, movement: 12, hp: 20, armor: 4, damage: "2D8", relevant: 15, other: 8 }
  };

  // NPC ATTACK TABLE — D6 by role. Unlike monster attacks these do NOT hit
  // automatically unless the entry says so: roll the NPC's skill.
  // fx: machine-readable hints for the solo combat engine.
  var NPC_ATTACKS = {
    melee: [
      { range: [1, 3], name: "Deal a Blow!", text: "The NPC makes a melee attack.", fx: { attack: "melee" } },
      { range: [4, 4], name: "Defensive Stance!", text: "If you have not acted this round, the NPC swaps initiative cards with you, and parries or dodges with a boon. If you do not attack, or have already attacked, they use their action to attack with a bane.", fx: { defensive: true } },
      { range: [5, 5], name: "Wild Attack!", text: "The NPC attacks with a boon. A successful attack inflicts an extra D6 damage and you are knocked down. If you attack them before their next turn, you also attack with a boon.", fx: { attack: "melee", boon: true, extra: "D6", prone: true, exposed: true } },
      { range: [6, 6], name: "Intimidating Rage!", text: "The NPC roars or rampages. Roll against WIL to resist fear.", fx: { fear: true } }
    ],
    ranged: [
      { range: [1, 3], name: "Take a Shot!", text: "The NPC makes a ranged attack.", fx: { attack: "ranged" } },
      { range: [4, 4], name: "Hold!", text: "The NPC uses their action to move to a better position or ready a shot. They attack on their next turn with an automatic hit (unless you successfully dodge or parry).", fx: { setup: "autohit" } },
      { range: [5, 5], name: "Volley!", text: "The NPC attacks twice this turn. Both attacks are with a bane.", fx: { attack: "ranged", bane: true, times: 2 } },
      { range: [6, 6], name: "Deadly Shot!", text: "The NPC attacks with a bane, inflicting an extra 2D6 damage on a hit.", fx: { attack: "ranged", bane: true, extra: "2D6" } }
    ],
    sneaky: [
      { range: [1, 3], name: "Cunning Strike!", text: "The NPC attacks with their current weapon.", fx: { attack: "any" } },
      { range: [4, 4], name: "On the Move!", text: "The NPC uses their action to change their approach or weapon, from melee to ranged or vice-versa. They attack on their next turn with a boon.", fx: { setup: "boon" } },
      { range: [5, 5], name: "Devious Feint!", text: "The NPC sets up their attack with a misdirection. You must make an INT roll as a free action. If successful, you may dodge or parry the attack with a boon. If the INT roll is unsuccessful, the NPC automatically hits (cannot be dodged or parried) with an extra D6 damage.", fx: { feint: "INT", extra: "D6" } },
      { range: [6, 6], name: "Sneak Attack!", text: "The NPC uses their action to hide. You may make an AWARENESS roll as a free action. If unsuccessful, the NPC automatically hits on their next turn (cannot be dodged or parried) with an extra 2D6 damage.", fx: { hide: "Awareness", extra: "2D6" } }
    ],
    magic: [
      { range: [1, 3], name: "Magic Bolt!", text: "The NPC casts an attack spell which inflicts 2D6 damage against a single target.", fx: { spell: "2D6" } },
      { range: [4, 4], name: "Magic Blast!", text: "The NPC casts an attack spell which inflicts 3D6 damage against any targets within 10 meters.", fx: { spell: "3D6", area: true } },
      { range: [5, 5], name: "Arcane Shield!", text: "The NPC automatically summons a shield which decreases incoming damage by 2D6. To maintain the shield, they make a skill roll as a free action every subsequent round. Further uses of this action add D6 to the protection of an existing shield.", fx: { shield: "2D6", more: "D6" } },
      { range: [6, 6], name: "Mystic Mysteries!", text: "The NPC casts a spell of unknowable origin. Roll for Action and Thing on the inspiration table, and interpret the spell's effect.", fx: { mystery: true } }
    ]
  };

  // SUFFERING DAMAGE — when harm of unknown size befalls you.
  var SUFFERING = [
    { range: [1, 2], name: "Slight", dice: "D6" },
    { range: [3, 5], name: "Moderate", dice: "2D6" },
    { range: [6, 6], name: "Severe", dice: "2D10" }
  ];

  // THREAT TABLE — D6, for a random active threat.
  var THREATS = [
    { text: "A dreadful creature has your scent.", trigger: "It attacks!" },
    { text: "This region is prone to tremors and cave-ins.", trigger: "You face a catastrophic quake!" },
    { text: "A known enemy seeks you out.", trigger: "They catch up to you!" },
    { text: "A vile corruption pervades this place.", trigger: "You are exposed!" },
    { text: "Traps riddle your path.", trigger: "A trap is sprung!" },
    { text: "Ghostly whispers haunt your steps.", trigger: "You face a harrowing manifestation!" }
  ];

  // EXPLORATION — Area (D20) → D4 count of D4 Location Details → D20 subtables.
  var AREAS = ["Abandoned outpost", "Ancient tomb", "Burrowed tunnel", "Claustrophobic crawlspace", "Confounding maze",
    "Cramped chamber", "Excavated mine", "Expansive hall", "Forgotten library", "Idle workshop",
    "Inhabited outpost", "Lofty bridge", "Narrow staircase", "Natural cave", "Plunging shaft",
    "Precarious ladderway", "Subterranean river", "Twisting passage", "Vile temple", "Yawning chasm"];
  var DETAILS = ["contents", "environment", "oddity", "danger"]; // D4
  var SUBTABLES = {
    contents: ["Abandoned supplies", "Bloody trail", "Breached doorway", "Cracked terrain", "Decrepit shrine", "Deep well", "Dusty tomes",
      "Flaming braziers", "Foul nest", "Fresh corpses", "Makeshift barricade", "Moldering tapestries", "Mummified corpses", "Ornate sarcophagi",
      "Remote encampment", "Scattered bones", "Sealed antechamber", "Toppled pillars", "Towering statues", "Wandering adventurer"],
    environment: ["Bubbling pool", "Chilling cold", "Clinging webs", "Concealing mist", "Corroded surfaces", "Creeping vines", "Dripping water",
      "Dusty air", "Flourishing fungus", "Glassy surfaces", "Glowing crystals", "Luminescent spores", "Mechanical whirring", "Oppressive heat",
      "Ragged scratches", "Rotting stench", "Skittering sounds", "Slimy surfaces", "Smoke-filled air", "Stagnant pool"],
    oddity: ["Arcane symbols", "Confounding puzzle", "Enigmatic mechanisms", "Esoteric architecture", "Fleshy terrain", "Flourishing tree",
      "Ghostly apparition", "Gigantic corpse", "Hovering sphere", "Humming obelisk", "Magic mirror", "Mystical light", "Reversed gravity",
      "Sentient door", "Shifting architecture", "Singing skulls", "Swirling portal", "Talking statue", "Unnatural darkness", "Unsettling laughter"],
    danger: ["Acid pools", "Ambushing foe", "Approaching foe", "Arcane trickery", "Broken path", "Crumbling terrain", "Dreadful altar",
      "Fiery surroundings", "Flooded space", "Flowing magma", "Hidden trap", "Icy surfaces", "Imminent collapse", "Imperiled adventurer",
      "Inhabited lair", "Ominous wardrums", "Scalding steam", "Scrawled warning", "Sealed doorway", "Toxic fumes"]
  };
  // INHABITANTS — D20. `foes` are suggested bestiary ids for a quick fight (our choice, not the book's).
  var INHABITANTS = [
    { range: [1, 1], name: "Dragons", foes: [] },
    { range: [2, 6], name: "Orcs", foes: ["npc:orc-warrior"] },
    { range: [7, 7], name: "Adventurers", foes: [] },
    { range: [8, 8], name: "Ghosts", foes: ["monster:ghost"] },
    { range: [9, 9], name: "Giant spiders", foes: ["monster:giant-spider"] },
    { range: [10, 10], name: "Goblins", foes: ["npc:goblin-warrior"] },
    { range: [11, 11], name: "Harpies", foes: ["monster:harpy"] },
    { range: [12, 12], name: "Skeletons", foes: ["npc:skeleton-warrior"] },
    { range: [13, 13], name: "Trolls", foes: ["monster:troll"] },
    { range: [14, 14], name: "Vampiric bats", foes: ["monster:vampiric-bats"] },
    { range: [15, 19], name: "Cultists", foes: ["npc:cultist"] },
    { range: [20, 20], name: "Demons", foes: ["monster:demon"] }
  ];

  // SCAVENGE — D10. Quick; a long or repeated scavenge takes a stretch and advances threats.
  var SCAVENGE = [
    { range: [1, 1], text: "Unexpected danger.", sub: { die: 4, rows: ["Creature", "Cursed item", "Noxious spores", "Trap"] } },
    { range: [2, 4], text: "Nothing of note." },
    { range: [5, 5], text: "Supplies.", sub: { die: 6, rows: ["Bandages", "Field ration", "Fine clothes", "Lockpicks", "Quiver of arrows", "Torch"] } },
    { range: [6, 6], text: "Interesting item.", sub: { die: 4, rows: ["Key", "Map", "Strange device", "Written message"] } },
    { range: [7, 9], text: "One treasure card.", treasure: 1 },
    { range: [10, 10], text: "One treasure card, and roll again.", treasure: 1, again: true }
  ];

  // SEARCH — D10, only after a successful SPOT HIDDEN (searching takes a stretch;
  // threats advance). Dragon: roll twice, choose. Demon: nothing, and a new danger.
  var SEARCH = [
    { range: [1, 1], text: "Concealed foe – you are forewarned and have a boon on your first action against it." },
    { range: [2, 2], text: "Trap – to disarm, roll SLEIGHT OF HAND with a boon, then roll on this table again, ignoring this result.", trap: true, again: true },
    { range: [3, 3], text: "Secret path – diverts to D4 new waypoints.", path: "D4" },
    { range: [4, 5], text: "Hidden antechamber – roll for location details.", details: true },
    { range: [6, 8], text: "Hidden treasure – one treasure card.", treasure: 1 },
    { range: [9, 10], text: "Hidden vault – two treasure cards, and roll again.", treasure: 2, again: true }
  ];

  // TRAPS — D20. 18+ = roll twice, ignoring this result. Harm: Suffering Damage, or moderate 2D6.
  var TRAPS = ["Acid spray", "Arcane blast", "Collapsing trapdoor (new waypoint)", "Collapsing trapdoor (pit)", "Crushing walls",
    "Entangling snare", "Flaming spout", "Flooding chamber", "Piercing spikes", "Poison dart", "Poisonous gas", "Ringing alarm",
    "Rolling boulder", "Shooting arrow", "Spinning blades", "Teleporting sigil (new waypoint)", "Unleashed foe"];

  // Rule notes shown in the solo page's Rules drawer (paraphrased from the booklet).
  var RULES = [
    ["Questions", "Ask the Fortune Chart when you would ask a GM. Roll only when you want fate to decide; if an answer is obvious or more interesting, just decide."],
    ["Failure", "You decide the consequence: something that makes things harder but does not block the way forward. Unsure? Think of two outcomes and roll D6 (1–3 first, 4–6 second). In combat a miss is just a miss."],
    ["Dragons & Demons", "Outside combat, use the Dragon and Demon Effects table, or give a boon or bane to a related follow-up action. In combat, use the Rulebook's effects."],
    ["NPCs", "Roll for NPCs only when it affects you directly. Use the Fortune Chart to decide if they dodge or parry, flee or surrender."],
    ["Threat clock", "A D6 counter from 1. Advance it by 1 for a significant delay, an opening created by inaction or failure, searching, resting a stretch or more, or scavenging again; by 2 in dire cases. At 6 it happens: face it, then reset to 1 if it belongs to the mission or region, otherwise remove it. Always keep one threat active."],
    ["Waypoints", "Play them in order; an unknown one is revealed with the exploration tables. Fleeing a fight or being forced onto a new path adds an extra waypoint. The last waypoint holds the objective."],
    ["Combat", "Avoid fights where you can. Tactics or terrain that give you the upper hand earn a boon. If a fight turns against you, flee."],
    ["Healing", "Solo, you may roll HEALING to tend your own wounds in a stretch rest (2D6 HP on a success), rally yourself at 0 HP with PERSUASION and no bane, and roll HEALING to save your own life at 0 HP."],
    ["Leaving", "A clear way back is free. A dangerous way: roll AWARENESS or SNEAKING; on a failure, first overcome a danger at an earlier waypoint. No direct route: D4+2 new waypoints to the surface."],
    ["Experience", "Tick a skill on a Dragon or Demon as normal. After a successful mission take five advancement marks of your choice, then roll D20 for each between missions (beat the skill level: +1, max 18). Up to twice in the campaign, award a bonus heroic ability for a valiant sacrifice or astounding success."],
    ["Treasure", "When told to draw a treasure card, or whenever you'd reasonably gain something of value, draw from the treasure deck (the site's treasure picker stands in for the boxed set's cards)."]
  ];

  function pickRange(rows, n) {
    for (var i = 0; i < rows.length; i++) { var r = rows[i].range; if (n >= r[0] && n <= r[1]) return rows[i]; }
    return null;
  }

  W.DB_SOLO_TABLES = {
    fortune: FORTUNE, inspiration: INSPIRATION, dragonDemon: DRAGON_DEMON, templates: TEMPLATES,
    npcAttacks: NPC_ATTACKS, suffering: SUFFERING, threats: THREATS, areas: AREAS, details: DETAILS,
    subtables: SUBTABLES, inhabitants: INHABITANTS, scavenge: SCAVENGE, search: SEARCH, traps: TRAPS,
    rules: RULES, pickRange: pickRange
  };
})();
