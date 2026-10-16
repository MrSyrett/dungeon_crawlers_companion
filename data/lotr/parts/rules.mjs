// Setting rules: Shadow, journeys, councils, Fellowship Phase, patrons, treasure,
// the Eye of Mordor, and the Nameless Thing tables. Mechanics are restated in
// original wording; tables are game facts.

// ── Fellowship & Patrons ────────────────────────────────────────────────────
export const LOTR_FELLOWSHIP = [
  "Fellowship is a pool shared by the whole Company. Its starting rating equals the number of Player-heroes, plus the patron's bonus and any virtues (Dwarf-Friend, Three is Company, Friendly and Familiar).",
  "Each miserable hero lowers the rating by 1.",
  "Spend 1 point (with the Company's agreement) for advantage on an ability check, attack roll or saving throw — or to trigger the patron's special advantage, or to borrow a companion's rewarded/magical item.",
  "Every hero tracks the current pool on their sheet. Points refresh fully at the end of each Fellowship Phase.",
];

export const LOTR_PATRONS = [
  { name: "Balin, son of Fundin", race: "Dwarf", callings: ["Captain", "Champion"], fellowship: 1, advantage: "Balin's Counsel", advantageText: "Spend 1 Fellowship point to roll an extra d20 after an attack roll (before the outcome is known) and use either die.", agenda: "Reclaim lost strongholds, eliminate enemy leaders.", where: "On the road between Erebor and the Blue Mountains, at wayside inns, or visiting Bilbo in the Shire.", description: "Eldest son of Fundin and Thorin's old counsellor, now an envoy of King Dáin. Humble, kindly, woodcrafty for a Dwarf — and quietly obsessed with Moria." },
  { name: "Bilbo Baggins", race: "Hobbit", callings: ["Scholar", "Treasure Hunter"], fellowship: 2, advantage: "Bilbo's Hospitality", advantageText: "Choosing Meet Patron to visit Bilbo also raises the Fellowship rating by +1 until the next Fellowship Phase.", agenda: "Recover lost lore and lost things.", where: "Bag End, Hobbiton — usually at tea or smoking on the step.", description: "A wealthy, eccentric Hobbit who gathers rumours, maps and lore for his book, and gladly finances anyone brave enough to go and have adventures." },
  { name: "Círdan the Shipwright", race: "Elf", callings: ["Messenger", "Scholar"], fellowship: 1, advantage: "The Shipwright's Foresight", advantageText: "Spend 1 Fellowship point to roll an extra d20 after an ability check and use either die. Meeting him also yields a rumour from the Loremaster.", agenda: "Rekindle hope, preserve the lore of the Ages.", where: "The Grey Havens in Lindon.", description: "The ancient lord of the Havens, keeper of the grey ships, patient and far-seeing." },
  { name: "Gandalf the Grey", race: "Wizard", callings: ["Captain", "Messenger"], fellowship: 2, advantage: "Wisdom of the Grey Pilgrim", advantageText: "Spend 1 Fellowship point to roll an extra d20 after a saving throw and use either die.", agenda: "Warn the Free Peoples, inspire them to action.", where: "Anywhere and nowhere — Bree, the Shire, Rivendell, on the road.", description: "The Grey Pilgrim, ever wandering, who kindles the hearts of the Free Peoples against the Shadow." },
  { name: "Gilraen the Fair", race: "Dúnadan", callings: ["Champion", "Warden"], fellowship: 0, advantage: "Gilraen's Folk", advantageText: "At the start of a journey, spend 1 Fellowship point: while within the bounds of old Arnor, after each Journey Events roll you may roll a d20 and choose which result is used. Meeting her also yields a rumour.", agenda: "Fight the Enemy, defend the weak.", where: "Among the hidden homes of the Dúnedain of the North.", description: "Mother of Aragorn, widow of Arathorn: grim, wary, with a measure of foresight." },
  { name: "Tom Bombadil and Lady Goldberry", race: "—", callings: ["Treasure Hunter", "Warden"], fellowship: 2, advantage: "Master of Wood, Water and Hill", advantageText: "Spend all remaining Fellowship to call on Tom's or Goldberry's aid anywhere within Tom's country.", agenda: "Protect the land, find and preserve what was buried.", where: "Their house at the edge of the Old Forest.", description: "The eldest Master, merry and unfathomable, and the River-daughter his lady." },
];

export const LOTR_SAFE_HAVENS = ["Bree (The Prancing Pony)", "Rivendell", "Tharbad", "The Grey Havens", "Bag End / the Shire", "Thorin's Halls (Blue Mountains)"];

// ── The Shadow ──────────────────────────────────────────────────────────────
export const LOTR_SHADOW = {
  rules: [
    "Shadow points are tracked on the sheet; you can't have more than your Wisdom score.",
    "Dread, Greed and Sorcery may be resisted with a saving throw: success reduces the gain by 1; success by 5 or more reduces it by 2.",
    "Misdeeds can never be resisted.",
    "Miserable when Shadow ≥ half your Wisdom (rounded up); Anguished when Shadow ≥ your Wisdom.",
    "Harden Will: while Shadow is still below your Wisdom, you may clear all your Shadow and take a single Shadow Scar instead. Scars count as Shadow points but only Heal Scars (Yule) removes them.",
    "Spiritual Recovery at each Fellowship Phase removes 1–3 Shadow, depending on how badly the Company hurt the Enemy.",
  ],
  sources: [
    { name: "Dread", save: "CHA", description: "Witnessing horror, terrible foes, cursed places, the power of the Enemy." },
    { name: "Greed", save: "WIS", description: "Laying hands on tainted hoards and precious things long held in the dark." },
    { name: "Misdeeds", save: "—", description: "Doing (or attempting) something wrong — automatic Shadow, no save. The Loremaster should warn first." },
    { name: "Sorcery", save: "INT", description: "Falling victim to the dark spells of the Enemy and his servants." },
  ],
  dread: [
    { points: 1, source: "Unexpected tragedy or grievous occurrence", example: "A serious accident, a death in the family, a natural disaster" },
    { points: 2, source: "Gruesome killing, dreadful experience, Orc-work", example: "Finding villagers savagely mutilated; experiencing slavery" },
    { points: 3, source: "Harrowing ordeal, physical and spiritual torment", example: "Torture; being haunted by a Wight" },
    { points: 4, source: "Directly experiencing the power of the Enemy", example: "Seeing a Shadow army muster; the Eye in a Palantír" },
  ],
  misdeeds: [
    { points: "1", action: "Violent threats and malicious lies; heedless cruelty" },
    { points: "2", action: "Manipulating others; abusing authority; deliberate cruelty" },
    { points: "3", action: "Theft or plunder; oathbreaking or cowardice; treachery" },
    { points: "4", action: "Torment or torture; killing or crippling a surrendered foe or harmless folk" },
    { points: "4 + 1 Scar", action: "Murder; willingly serving the Enemy" },
  ],
  misdeedIntention: "Attempting a misdeed counts even if it fails. An unknowing misdeed (later shown to be wrong) only costs Shadow if the hero makes no amends; earnest contrition allows a DC 15 Wisdom save to resist.",
  madness: [
    "An anguished hero must play out a bout of madness in the current Adventuring Phase — losing control and doing something they'll regret, shaped by the last Shadow source, their Shadow Path, or a flaw.",
    "Typical bouts: Betrayal (fail a duty), Fear (flee all danger), Lust (seize what isn't yours), Rage (lash out at a perceived wrong).",
    "Afterwards: no longer anguished, all current Shadow cleared, and advance one step along your Shadow Path (gain its next flaw).",
    "Ending an Adventuring Phase still anguished means the hero leaves the Company and retires.",
    "With all four flaws, the next time Shadow reaches Wisdom the hero is lost — to madness (Men, Hobbits, Dwarves) or sails West (Elves).",
    "Flaws: when one plausibly hampers an ability check, that check has disadvantage.",
  ],
  paths: [
    { name: "Curse of Vengeance", calling: "Champion", flaws: ["Spiteful", "Brutal", "Cruel", "Murderous"], description: "Those who live by the sword are ever tempted to draw it when thwarted or insulted." },
    { name: "Dragon-Sickness", calling: "Treasure Hunter", flaws: ["Grasping", "Mistrustful", "Deceitful", "Thieving"], description: "The age-old disease that turns enchanted gold to bitter ashes and shrinks the world to a guarded hoard." },
    { name: "Lure of Power", calling: "Captain", flaws: ["Resentful", "Arrogant", "Overconfident", "Tyrannical"], description: "Authority tempts its holder to mistake their own aggrandisement for the good of those they lead." },
    { name: "Lure of Secrets", calling: "Scholar", flaws: ["Haughty", "Scornful", "Scheming", "Traitorous"], description: "The hunger for hidden knowledge breeds contempt for the 'ignorant'." },
    { name: "Path of Despair", calling: "Warden", flaws: ["Troubled", "Wavering", "Guilt-ridden", "Fearful"], description: "Self-doubt: is my strength enough, or will I drag the innocent down with me?" },
    { name: "Wandering-Madness", calling: "Messenger", flaws: ["Idle", "Forgetful", "Uncaring", "Cowardly"], description: "The Road goes ever on — but a messenger with nothing to fight for may wander forever." },
  ],
  flawText: {
    Spiteful: "Repays slights with vicious rudeness.", Brutal: "Reacts violently, with little restraint.", Cruel: "Indifferent to the suffering caused; savage to foes.", Murderous: "Sees killing as a natural way to get what you want.",
    Grasping: "Hoards gold and precious things for their own sake.", Mistrustful: "Suspects even friends' advice of hidden motives.", Deceitful: "Lies and schemes without shame.", Thieving: "Simply takes whatever you desire.",
    Resentful: "Bitter at those who won't heed your wisdom.", Arrogant: "Belittles companions to stress your own importance.", Overconfident: "Blind to your limits and to the cost to others.", Tyrannical: "Any dissent is betrayal; any means justify your cause.",
    Haughty: "Brushes aside others' wisdom and offers of help.", Scornful: "Mocks others' ideas as inadequate.", Scheming: "Keeps your own counsel, agrees only to go your own way.", Traitorous: "Will betray friends when it pays.",
    Troubled: "Disquiet clouds your judgement and counsel.", Wavering: "Vacillates, unable to choose quickly.", "Guilt-ridden": "Remorse makes you refuse any daring course.", Fearful: "So beset by worry you won't risk anything.",
    Idle: "Easily distracted; must be cajoled into action.", Forgetful: "Absent-minded, forgets even important things.", Uncaring: "Loses compassion and interest in others' troubles.", Cowardly: "Saves yourself above all else.",
  },
};

// ── Journeys ────────────────────────────────────────────────────────────────
export const LOTR_JOURNEY = {
  roles: [
    { name: "Guide", task: "Route, rests and supplies. Makes the pathfinding checks. Only one Guide.", skill: "Travel" },
    { name: "Hunter", task: "Finding food in the wild.", skill: "Hunting" },
    { name: "Look-out", task: "Keeping watch.", skill: "Perception" },
    { name: "Scout", task: "Making camp and opening new trails.", skill: "Explore" },
  ],
  sequence: [
    "1. Set the journey path — trace the route on the map; the Loremaster counts the hexes (split journeys over 20 hexes into legs).",
    "2. Pathfinding: the Guide makes a DC 15 Wisdom (Travel) check (or cartographer's tools with a map; navigator's tools at sea; −5 if the Guide covers other roles). Fail by 5+: event 1 hex away · fail: 2 hexes · success: 3 hexes · succeed by 5+: 4 hexes. After each event, check again.",
    "3. Ending: when a pathfinding count reaches the destination the journey ends. Each hero makes a fatigue saving throw: DC 10 Constitution + the event modifiers. Fail: 1 level of exhaustion · fail by 5+: 2 · fail by 10+: 3. A mount ridden for half the journey adds its CON modifier.",
  ],
  pace: [
    "Each hex takes 1 day (2 days at speed 15 ft. or less). Speed 50+ ft.: 2 hexes a day; 80+ ft.: 3 hexes a day.",
    "Hard-terrain hexes (hills, marsh, woods) can't be ridden and are crossed at half speed.",
    "Forced march: double speed for pace, but a DC 15 fatigue save at the end of each day.",
    "Passive Perception notices threats; heroes doubling roles or force-marching take −5 to it.",
    "Moving at no more than half speed lets the Company travel stealthily when not in the open.",
    "Perilous Areas: entering one stops the Company until it has faced as many events as the area's Peril rating.",
  ],
  eventTarget: [
    { roll: 1, role: "Scouts", check: "Wisdom (Explore)" },
    { roll: 2, role: "Look-outs", check: "Wisdom (Perception)" },
    { roll: 3, role: "Hunters", check: "Wisdom (Hunting)" },
  ],
  regionMod: "Border Land: roll d20 with advantage · Wild Land: normal · Dark Land: with disadvantage.",
  terrainDC: [ { terrain: "Road", dc: 10 }, { terrain: "Open terrain", dc: 15 }, { terrain: "Hard terrain", dc: 20 } ],
  seasonNote: "Event checks — and the saves they call for — have disadvantage in autumn and winter. One companion in the same role (not covering other roles) may help for advantage.",
  events: [
    { min: 1, max: 2, name: "Terrible Misfortune", fatigue: 3, effect: "Fatigue DC +3. If the check fails, the target makes a Dexterity save (same DC): fail and they drop to 0 HP; succeed and they lose half their maximum HP." },
    { min: 3, max: 4, name: "Despair", fatigue: 2, effect: "Fatigue DC +2. If the check fails, everyone in the Company gains 2 (1d3) Shadow points (Charisma save to resist)." },
    { min: 5, max: 6, name: "Ill Choices", fatigue: 2, effect: "Fatigue DC +2. If the check fails, the target gains 1 Shadow point (Wisdom save to resist)." },
    { min: 7, max: 14, name: "Mishap", fatigue: 1, effect: "Fatigue DC +1. If the check fails, +2 instead and the journey takes 1 day longer." },
    { min: 15, max: 17, name: "Short Cut", fatigue: 1, effect: "Fatigue DC +1. If the check succeeds, the journey is 1 day shorter (minimum 1)." },
    { min: 18, max: 19, name: "Chance-meeting", fatigue: 1, effect: "Fatigue DC +1 — unless the check succeeds, in which case no increase and the Loremaster improvises a helpful encounter." },
    { min: 20, max: 20, name: "Joyful Sight", fatigue: 0, effect: "If the check succeeds, everyone in the Company gains inspiration." },
  ],
  eventIdeas: {
    "Terrible Misfortune": ["A prey turns on the Hunters and gores one badly", "A Scout is caught by a killing cold on an exposed ridge", "The Look-out falls from a tree in the dark", "A river crossing goes wrong and the current takes someone"],
    "Despair": ["Stumbling into a blighted, poisoned dell", "The grisly remains of travellers slain by Orcs", "The chill presence of an evil spirit by night", "Something huge and terrible passes in the dark"],
    "Ill Choices": ["The Scout agonises over the way and loses a night's sleep", "The Hunter frets over dwindling food", "The Look-out jumps at every sound and wakes the camp"],
    "Mishap": ["Wrong gear, not enough food — a day lost to fishing and foraging", "A flooded ford forces a long detour", "A lamed pony slows everyone down", "Fog — the Company walks in a circle"],
    "Short Cut": ["The Look-out spots a hidden path", "The Scout opens a clean trail through brush", "A bountiful hunt means no stop to forage"],
    "Chance-meeting": ["Friendly travellers share food and news", "Local folk give accurate directions", "A familiar face — perhaps a patron — on the road"],
    "Joyful Sight": ["A company of wandering Elves passing under the stars", "Great Eagles wheeling high above", "A benevolent presence in a glade or waterfall", "A glimpse of one of the Wise"],
  },
  xp: [
    { hex: "Along a road", border: 0, wild: 10, dark: 25 },
    { hex: "In open terrain", border: 10, wild: 25, dark: 50 },
    { hex: "In hard terrain", border: 25, wild: 50, dark: 100 },
  ],
  xpNote: "Award journey XP only for real risk, a deadline, or poor conditions. Sum each hex's value (a Perilous Area counts as many hexes as its Peril rating) and divide among the heroes.",
};

// ── Councils ────────────────────────────────────────────────────────────────
export const LOTR_COUNCIL = {
  sequence: [
    "1. Introduction — the spokesperson makes a DC 15 Charisma check. Success: one failed Interaction check may be rerolled (two if by 5+). Failure by 5+: disadvantage on all Interaction checks.",
    "2. Set required successes — Reasonable request 1, Bold 2, Outrageous 3.",
    "3. Interaction — checks against the audience's DC: Friendly 10, Open 15, Reluctant 20. Speeches that touch what matters to the audience gain advantage.",
  ],
  intro: [
    { skill: "Intimidation", use: "Impress quickly or set the terms — but reveal much about the Company." },
    { skill: "Persuasion", use: "Smooth the way before asking for help; best with friends, may sound false to the unfriendly." },
    { skill: "Deception", use: "Learn much while revealing little — a poor showing breeds mistrust." },
  ],
  interaction: [
    { skill: "Deception", counts: true, note: "Favours or information by half-truths. May be a Misdeed; any failure is a Disaster." },
    { skill: "Intimidation", counts: true, note: "Rouse a crowd or a downcast leader — the aim must be obvious or it doesn't count." },
    { skill: "Persuasion", counts: true, note: "Win minds — can be used discreetly in any interaction." },
    { skill: "Performance", counts: false, note: "Doesn't count as a success, but gives +5 (+10 on a magical success) to the Company's next check." },
    { skill: "Riddle", counts: false, note: "Play the riddle-game (counts) or glean tidbits (+5 / +10 to the next check)." },
    { skill: "Insight", counts: false, note: "Read the audience: +5 (+10 on a magical success) to the next check." },
  ],
  outcomes: [
    { name: "Success", text: "Reach the required successes — the Company gets what it asked for." },
    { name: "Failure, or Success with Woe", text: "A failed check (after rerolls): accept refusal, or with the Loremaster's approval succeed at a steeper price — less than hoped, or new enemies." },
    { name: "Disaster", text: "A check fails by 10+ (or by 5+ on an outrageous request): the Company is seen as a threat — imprisonment or attack may follow." },
  ],
  attitudes: [ { name: "Friendly", dc: 10 }, { name: "Open", dc: 15 }, { name: "Reluctant", dc: 20 } ],
  requests: [ { name: "Reasonable", successes: 1 }, { name: "Bold", successes: 2 }, { name: "Outrageous", successes: 3 } ],
  xp: [
    { audience: "Friendly", reasonable: "25 (0)", bold: "50 (0)", outrageous: "100 (25)" },
    { audience: "Open", reasonable: "100 (10)", bold: "200 (25)", outrageous: "450 (100)" },
    { audience: "Reluctant", reasonable: "200 (50)", bold: "700 (100)", outrageous: "1,800 (450)" },
  ],
  xpNote: "Split among all heroes present; only when the council carried real risk. Bracketed values are for a success with woe.",
};

// ── Fellowship Phase ────────────────────────────────────────────────────────
export const LOTR_FELLOWSHIP_PHASE = {
  structure: [
    "1. Set duration — at least a week, up to a season (Yule takes the whole winter).",
    "2. Choose destination — a safe haven or any place already visited, within reasonable reach.",
    "3. Spiritual recovery — remove Shadow: 1 if the Company at least hindered the Shadow, up to 2 if they actively damaged the Enemy, up to 3 for deeds that drew the Dark Lord's (or a great servant's) eye.",
    "4. Choose undertakings — ordinary phase: one for the Company plus one free; Yule: one per hero plus one free.",
  ],
  yule: [
    "Roughly every third Fellowship Phase is Yule; the Company often disbands so heroes can go home.",
    "Every hero ages a year. Heroes who don't take Heal Scars gain bonus XP = 10 × Intelligence score × current level.",
    "The Loremaster shares the year's news from the wider world.",
  ],
  undertakings: [
    { name: "Gather Rumours", yule: false, free: "A Warden in a warded land, or someone proficient in Investigation", effect: "Receive a rumour; advantage on Intelligence checks about it until the next Fellowship Phase." },
    { name: "Heal Scars", yule: true, free: "", effect: "Remove 1 Shadow Scar — but earn no Yule bonus XP this year." },
    { name: "Meet Patron", yule: false, free: "A Messenger, or someone proficient with calligrapher's supplies", effect: "Meet a patron present at this location; heroes of the patron's favoured callings start the next Adventuring Phase with inspiration. Also how a main patron is chosen." },
    { name: "Ponder Storied and Figured Maps", yule: false, free: "A Scholar, or someone proficient with cartographer's tools", effect: "Advantage on pathfinding checks until the next Fellowship Phase." },
    { name: "Raise an Heir", yule: true, free: "", effect: "Spend 50 s on your heir's training (record the running total and name the heir). On death or retirement the heir gets XP = total × level (max half yours, rounded up) and up to three magic items as heirlooms." },
    { name: "Recount a Story", yule: true, free: "", effect: "Replace a distinctive feature with one you showed in the tale, or swap a tool proficiency, an Expertise choice, or a Fighting Style." },
    { name: "Strengthen Fellowship", yule: false, free: "A Captain, or someone proficient with brewer's supplies or a gaming set", effect: "+1 Fellowship rating until the next Fellowship Phase." },
    { name: "Study Magical Items", yule: false, free: "A Treasure Hunter, or someone proficient in Old Lore", effect: "Learn all qualities of every magical item the Company holds." },
    { name: "Write a Song", yule: false, free: "Someone proficient in Performance or a musical instrument", effect: "Add a Lay, Song of Victory or Walking-Song to the Company's song list." },
  ],
  songs: [
    { name: "Lay", effect: "During a council: all who hear gain advantage on their first ability check before the council ends." },
    { name: "Song of Victory", effect: "In combat: all who hear gain advantage on their first attack roll before the end of their next turn." },
    { name: "Walking-Song", effect: "On a journey: all who hear gain advantage on their next fatigue saving throw." },
  ],
  songNote: "Bonus action: DC 15 Charisma (Performance). Each song can be used once per Adventuring Phase — it's spent whether the check succeeds or not.",
  gearNote: "During any Fellowship Phase heroes may freely buy and sell gear available at their destination.",
};

// ── Treasure ────────────────────────────────────────────────────────────────
export const LOTR_TREASURE = {
  hoards: [
    { rating: "Lesser", examples: "A solitary Troll's loot, Goblin plunder, a bandits' hoard", value: "2d8", avg: 9, magicRolls: 1, greedDC: 10 },
    { rating: "Greater", examples: "An old hoard, a Dwarf-hoard", value: "3d10", avg: 16, magicRolls: 2, greedDC: 15 },
    { rating: "Marvellous", examples: "An ancient hoard, a Dwarf-city's treasury, a Dragon-hoard", value: "4d12", avg: 26, magicRolls: 3, greedDC: 20 },
  ],
  hoardNote: "At most two hoards per Adventuring Phase — a lesser and a greater, or one marvellous. Value is in gold pieces; split among the Company. Roll the magic d20s: each 15+ is a piece of magical treasure. Greed: the hoard's Shadow is resisted with a Wisdom save at the hoard's DC.",
  magical: [
    { min: 1, max: 14, result: "No magical treasure", shadow: "1d4−2 (min 0)" },
    { min: 15, max: 17, result: "Marvellous Artefact (one blessing)", shadow: "1d6−3 (min 0)" },
    { min: 18, max: 19, result: "Wondrous Item (two blessings)", shadow: "1d8−4 (min 0)" },
    { min: 20, max: 20, result: "Famous Weapon or Armour", shadow: "1d8−4 (min 0)" },
  ],
  blessings: [
    { roll: 1, skill: "Acrobatics", objects: "boots, cloak, ring" }, { roll: 2, skill: "Animal Handling", objects: "circlet, ring, staff" },
    { roll: 3, skill: "Athletics", objects: "belt, boots, ring" }, { roll: 4, skill: "Deception", objects: "amulet, circlet, ring" },
    { roll: 5, skill: "Explore", objects: "boots, ring, staff" }, { roll: 6, skill: "Hunting", objects: "boots, cloak, ring" },
    { roll: 7, skill: "Insight", objects: "circlet, pipe, ring" }, { roll: 8, skill: "Intimidation", objects: "cloak, horn, ring" },
    { roll: 9, skill: "Investigation", objects: "amulet, circlet, ring" }, { roll: 10, skill: "Medicine", objects: "healer's kit, herbalism kit, ring" },
    { roll: 11, skill: "Nature", objects: "book, circlet, ring" }, { roll: 12, skill: "Old Lore", objects: "book, circlet, ring" },
    { roll: 13, skill: "Perception", objects: "amulet, circlet, ring" }, { roll: 14, skill: "Performance", objects: "musical instrument, pipe, ring" },
    { roll: 15, skill: "Persuasion", objects: "amulet, circlet, ring" }, { roll: 16, skill: "Riddle", objects: "circlet, pipe, ring" },
    { roll: 17, skill: "Sleight of Hand", objects: "cloak, gloves, ring" }, { roll: 18, skill: "Stealth", objects: "boots, cloak, ring" },
    { roll: 19, skill: "Travel", objects: "boots, ring, staff" }, { roll: 20, skill: "Roll twice and choose", objects: "" },
  ],
  blessingDie: [ { pb: 2, die: "1d4" }, { pb: 3, die: "1d6" }, { pb: 4, die: "1d8" } ],
  blessingRules: [
    "A Marvellous Artefact carries one blessing; a Wondrous Item two. Each blessing names a skill.",
    "The bearer adds a Blessing die (1d4 at PB +2, 1d6 at +3, 1d8 at +4) to checks with a blessed skill — only one Blessing die per check.",
    "The bearer can also obtain a magical success with a blessed skill: half proficiency bonus times per long rest (Artefact) or proficiency bonus times (Wondrous Item).",
  ],
  famousRules: [
    "Design: choose item type → craftsmanship (Elven, Dwarven, Númenórean) → banes (Elven: one of Orcs, Wolves, Spiders; Númenórean: two of Orcs, Trolls, Wolves, Evil Men, Undead) → up to 3 qualities, at least one enchanted reward → name it.",
    "Qualities wake with the bearer: one at levels 1–4, two at 5–8, three at 9+ (in Treasure Index order unless studied).",
    "Magical treasure is personal — it is meant for its finder and shouldn't be passed around.",
  ],
  precious: {
    form: ["Jewel (single gem)", "Brooch", "Necklace", "Circlet or crown", "Belt, chain, or armband", "Ring"],
    material: ["Pearl", "Sapphire", "Ruby", "Amethyst", "Adamant / white gem / clear crystal", "Emerald / green gem / green crystal"],
    craft: ["Mannish, Westernesse", "Elven, Eregion", "Dwarven, Khazad-dûm", "Dwarven, Erebor", "Dwarven, Beleriand (Nogrod or Belegost)", "Elven, Beleriand"],
  },
  curses: [
    { name: "Curse of Weakness", text: "The bearer shows the worst flaw of their own Shadow Path (temporary; doesn't count toward succumbing)." },
    { name: "Darken", text: "When revealed, light dims within 30 ft. — bright becomes dim, dim becomes dark." },
    { name: "Hunted", text: "One kind of enemy senses the item nearby; journey events may revolve around the hunt." },
    { name: "Ill-Luck", text: "Whenever the bearer rolls a natural 20, they must reroll and keep the new roll." },
    { name: "Ill-Omen", text: "+5 to the DC of all the bearer's checks during councils." },
    { name: "Malice", text: "The bearer takes −2 on saving throws." },
    { name: "Owned", text: "In its true owner's presence the item's powers fail entirely." },
    { name: "Shadow Taint", text: "While carried, the bearer's Shadow is raised (1 per blessing, or 1 + enchanted rewards for war gear) — unhealable until lifted." },
    { name: "Weakening", text: "Disadvantage on all checks and saves with one chosen ability." },
  ],
  curseNote: "A curse may lie dormant until triggered (leaving the place it was found, moonlight, first blood, a certain foe, entering a Dark Land). Lifting it should be an adventure in itself.",
};

// ── The Eye of Mordor (optional) ────────────────────────────────────────────
export const LOTR_EYE = {
  starting: [
    { company: "Only Hobbits or Men", score: 0 },
    { company: "One or more Dwarves", score: 1 },
    { company: "One or more Dúnedain or Elves", score: 2 },
    { company: "One or more High Elves", score: 3 },
  ],
  startingNote: "Use the highest applicable row, +1 per hero with proficiency bonus +4 or more, +1 per Famous Weapon or Armour carried. Recalculate at the start of each Adventuring Phase.",
  increases: [
    "+1 whenever an ability check's d20 shows a 1 (more in grave moments; none in truly safe places).",
    "+X whenever a hero gains X Shadow points.",
    "Blatant magic by a Wizard or similar: +1 lesser effect, +2 major spell, +3 powerful spell.",
  ],
  thresholds: [ { region: "Border Land", hunt: 18 }, { region: "Wild Land", hunt: 16 }, { region: "Dark Land", hunt: 14 } ],
  modifiers: [
    { mod: "+4", text: "Protected by the blessing of a Wizard or other great power" },
    { mod: "+2", text: "False names, little-used paths, or other care to stay unobtrusive" },
    { mod: "−2", text: "Great renown in the area from an exceptional deed" },
    { mod: "−4", text: "The Enemy is actively hunting them, or knows their mission" },
  ],
  revelationNote: "When Eye Awareness reaches the Hunt threshold the Company is revealed: run a Revelation episode that grows naturally out of play and smells of dark forces, then reset Awareness to its starting value.",
  revelations: [
    { name: "Out of the Frying Pan…", text: "Every check to resolve the current situation has disadvantage — a journey leg, or the next encounter." },
    { name: "Láthspell", text: "Their arrival is taken as ill news: a council's request is one step harder (reasonable → bold → outrageous)." },
    { name: "Do Not Tempt Me!", text: "A hero gains 3 Shadow from Greed, shaped by their Shadow Path." },
    { name: "Lies and Threats", text: "An ally turns enemy — by coercion, betrayal or sorcery." },
    { name: "A Weariness of the Heart", text: "Every hero gains a level of exhaustion until the Loremaster lifts it." },
    { name: "A Will That Lends Speed", text: "A prisoner or quarry escapes as if aided, or pursuers suddenly catch up." },
    { name: "Guided by Sinister Purpose", text: "A threat they could have avoided now waits for them, wide awake." },
    { name: "Reckless Hate", text: "The next enemy type they fight gains the Reckless Hate trait." },
    { name: "Deadly Strife", text: "The next enemy type they fight gains the Aggressive trait." },
    { name: "We Come to Kill", text: "The next enemy type they fight gains Horrible Strength." },
  ],
};

// ── Nameless Things (build-your-own horror) ─────────────────────────────────
export const LOTR_NAMELESS = {
  title1: ["The Bane", "The Scourge", "The Horror", "The Terror", "The Defiler", "The Devourer", "The Stalker", "The Hunter", "The Watcher", "The Crawler", "The Lurker", "The Creeper"],
  title2: ["in the Dark", "in the Dark", "of the Abyss", "of the Abyss", "in the Shadows", "in the Shadows", "of the Pit", "of the Pit", "in the Water", "in the Water", "of the Deep", "of the Deep"],
  title3: ["by Men", "by Men", "by Elves", "by Elves", "by Dwarves", "by Dwarves", "by Orcs", "by Orcs", "by the Wise", "by the Wise", "in ancient lore", "in ancient lore"],
  form: ["Bat-like", "Spider-like", "Fish-like", "Slug-like", "Worm-like", "Centipede-like", "Insect-like", "Crustacean-like", "Octopus-like", "Mole-like", "Toad-like", "Troll-like"],
  aspect: ["with remorseless eyes", "with remorseless eyes", "with great horns", "with great horns", "with luminous skin", "with luminous skin", "with a huge head", "with a huge head", "with a swollen body", "with a swollen body", "yet greater", "yet greater"],
  before: ["a deadly silence", "a sinister hissing", "a low growl", "the bones of its victims", "your skin crawling", "a deafening roar", "its tracks", "a terrifying scream", "a hideous stench", "a violent gust of air", "a piping sound", "a terrible cold"],
  first: ["a great shadow with a dark form at its heart", "its great claws", "its eyes glowing in the dark", "a flaccid, translucent, jelly-like body", "a gaping mouth gasping open and shut", "a huge maw of eerily human teeth", "swarms of vermin crawling before it", "a long, sinuous tentacle slithering near", "fangs too long to let its mouth close", "wide, blind eyes", "twisted horns of stained ivory", "a beautiful phantom — a vision of the mind"],
  stats: [
    { d20: "15–20", size: "Huge", ac: 13, hp: "105 (10d12 + 40)", abilities: "STR 19, DEX 12, CON 18", cr: "4 (+2)" },
    { d20: "10–14", size: "Huge", ac: 14, hp: "138 (12d12 + 60)", abilities: "STR 21, DEX 10, CON 20", cr: "5 (+3)" },
    { d20: "6–9", size: "Huge", ac: 15, hp: "175 (14d12 + 84)", abilities: "STR 23, DEX 8, CON 22", cr: "7 (+3)" },
    { d20: "4–5", size: "Huge", ac: 16, hp: "216 (16d12 + 112)", abilities: "STR 25, DEX 6, CON 24", cr: "9 (+4)" },
    { d20: "3", size: "Gargantuan", ac: 17, hp: "296 (16d20 + 128)", abilities: "STR 27, DEX 4, CON 26", cr: "13 (+5)" },
    { d20: "2", size: "Gargantuan", ac: 18, hp: "351 (18d20 + 162)", abilities: "STR 29, DEX 2, CON 28", cr: "15 (+5)" },
    { d20: "1", size: "Gargantuan", ac: 19, hp: "410 (20d20 + 200)", abilities: "STR 30, DEX 1, CON 30", cr: "17 (+6)" },
  ],
  base: "INT 1, WIS 7, CHA 3. Speed 20 ft., burrow 10 ft., climb 20 ft., swim 20 ft. Immune to charmed, exhaustion, frightened, paralyzed, petrified, poisoned. Blindsight 120 ft., passive Perception 8. Amphibious; Sunlight Sensitivity. Multiattack: one primary and one secondary natural weapon.",
  attacks: [
    { name: "Slam, tail, or tentacle", text: "Reach 15 ft. (Huge) / 20 ft. (Gargantuan); 3d4 / 4d4 + STR bludgeoning; a Large or smaller target is grappled and restrained." },
    { name: "Beak, bite, or horns", text: "Reach 5 ft. / 10 ft.; 3d8 / 4d8 + STR piercing; a Large or smaller target makes a Strength save or is knocked prone." },
    { name: "Claws, talons, or tusks", text: "Reach 10 ft. / 15 ft.; 3d6 / 4d6 + STR slashing; a Large or smaller target is grappled." },
  ],
  traits: [
    { min: 1, max: 2, name: "Hideous Toughness", text: "Damage of 14 or less (21 at CR 11–16, 28 at CR 17+) that would drop it to 0 leaves it at 1 HP instead." },
    { min: 3, max: 4, name: "Foul Reek", text: "Creatures starting a turn within 5 ft. make a CON save or are poisoned until their next turn (immune for an hour on a success)." },
    { min: 5, max: 6, name: "Horrible Strength", text: "Its attacks deal one extra damage die." },
    { min: 7, max: 8, name: "Poison", text: "Primary attack adds 3d4 (4d4) poison and a CON save or poisoned for an hour (fail by 5+: can't regain HP, disadvantage on death saves)." },
    { min: 9, max: 10, name: "Multiattack", text: "One additional attack with its primary or secondary weapon." },
    { min: 11, max: 12, name: "Snake-like Speed", text: "Dash or Disengage as a bonus action." },
    { min: 13, max: 14, name: "Strike Fear", text: "Creatures within 120 ft. gain half its proficiency bonus in Shadow (Dread), resisted by a Charisma save; failures are frightened (stunned too on a fail by 5+)." },
    { min: 15, max: 16, name: "Denizen of the Dark", text: "In dim light or darkness: advantage on Stealth and Hide as a bonus action." },
    { min: 17, max: 18, name: "Thick Hide", text: "Resistance to non-magical bludgeoning, piercing and slashing." },
    { min: 19, max: 20, name: "Regeneration", text: "Regains 10 HP at the start of each turn while above 0." },
  ],
  traitNote: "Each extra special trait raises the Thing's challenge rating by 1.",
};

// Standard monster traits the Loremaster can bolt on (Hatred, Revelation traits).
export const LOTR_ADVERSARY_TRAITS = [
  { name: "Hatred (subject)", text: "Recharges after a short or long rest. Bonus action: advantage on attacks against the hated folk until the start of its next turn." },
  { name: "Reckless Hate", text: "At the start of its turn it may gain advantage on melee attacks that turn; attacks against it have advantage until its next turn." },
  { name: "Aggressive", text: "Bonus action: move up to its speed toward a hostile creature it can see." },
  { name: "Horrible Strength", text: "Its melee weapons deal one extra die of damage." },
  { name: "Hideous Toughness", text: "Once per short or long rest, damage of 7 or less (14 for greater beasts) that would drop it to 0 leaves it at 1 HP." },
  { name: "Strike Fear", text: "Non-undead creatures within 60 ft. that are aware of it gain Shadow from Dread (Charisma save); failures are frightened for 1 minute (stunned too if failing by 5+), saving each turn; successes are immune for 24 hours." },
  { name: "Deathless", text: "When reduced to 0 HP it makes a CON save (DC 5 + damage taken) to drop to 1 HP instead — unless the damage was radiant, a critical hit, or from a weapon bearing the Bane of the Undead." },
  { name: "Sunlight Sensitivity", text: "In sunlight: disadvantage on attack rolls and sight-based Perception." },
  { name: "Yell of Triumph", text: "Recharges after a short or long rest. Allies within 30 ft. who hear it gain advantage on attacks and Intimidation until its next turn; it then makes one attack as a bonus action." },
];
