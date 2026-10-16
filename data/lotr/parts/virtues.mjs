// Virtues (common + cultural) and Rewards (war-gear upgrades). Original paraphrase.
// asi: { choose: [abilities], amount } — the +1 (or +2) that comes with the virtue.

const v = (name, category, asiChoose, benefits, extra) => ({ name, category, asi: asiChoose ? { choose: asiChoose, amount: 1 } : null, benefits, source: "core", ...(extra || {}) });
const ALL = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const LOTR_VIRTUES = [
  // ── Common ──
  v("Confidence", "Common", ["INT", "WIS", "CHA"], ["Gain proficiency in Intelligence, Wisdom or Charisma saving throws (your choice)."], { flavor: "Hardship overcome has renewed your faith in a brighter future.", grants: { saveChoice: ["INT", "WIS", "CHA"] } }),
  v("Dour-Handed", "Common", ["STR"], ["+1 to weapon damage rolls that use Strength."], { flavor: "Your blows land harder and your aim is steadier.", mods: { strDamage: 1 } }),
  v("Hardiness", "Common", ["CON"], ["Your hit point maximum rises by your current level, and by 1 more each time you gain a level."], { flavor: "Toil and hardship have toughened you.", mods: { hpPerLevel: 1 } }),
  v("Mastery", "Common", ALL, ["Gain one skill, tool or weapon proficiency.", "Choose a skill or tool you're proficient in: gain Expertise (double proficiency) with it."], { flavor: "Practice has made some skills second nature.", grants: { profChoice: 1, expertiseChoice: 1 } }),
  v("Nimbleness", "Common", ["DEX"], ["+1 AC — lost while incapacitated or wielding a shield."], { flavor: "Skill — or luck — keeps you out of harm's way.", mods: { acNoShield: 1 } }),
  v("Prowess", "Common", null, ["Increase one ability score by 2, or two ability scores by 1 (maximum 20)."], { flavor: "Adventuring has honed your inborn talents.", asi: { prowess: true } }),

  // ── Bardings ──
  v("Dragon-Slayer", "Bardings", ["STR", "DEX"], ["Advantage on attack rolls against Large or larger creatures."], { flavor: "Inspired by Bard, you have long studied how to bring down great monsters." }),
  v("Dwarf-Friend", "Bardings", ["CHA"], ["Double proficiency on Charisma (Persuasion) checks, with advantage when dealing with Dwarves.", "The Company's Fellowship rating +1.", "Within 5 ft. of a friendly Dwarf (one of you not incapacitated): spend 1 Fellowship point to impose disadvantage on an attack against either of you."], { flavor: "The days of the Dragon forged a lasting friendship between Dale and Erebor.", mods: { fellowship: 1 } }),
  v("Fierce Shot", "Bardings", ["STR", "DEX"], ["Use Strength or Dexterity for ranged weapon attack and damage rolls (same for both).", "If you moved no more than half your speed and hit with a ranged weapon, a bonus action adds 1d4 damage of the weapon's type."], { flavor: "Your grip is steady and your aim true." }),
  v("High Destiny", "Bardings", ["CON"], ["Advantage on death saving throws.", "Whenever you become stable you also regain 1 hit point."], { flavor: "Those of Girion's line are said to be destined for greatness." }),
  v("Stout-Hearted", "Bardings", ["WIS", "CHA"], ["Advantage on Charisma saving throws.", "You can't be frightened by creatures that aren't Undead."], { flavor: "Living in the shadow of Smaug made your folk brave." }),
  v("The Language of Birds", "Bardings", ["INT", "WIS"], ["Speak with birds; magical success on bird-related Nature and Animal Handling checks.", "Outdoors, gain advantage on an ability check, attack or save — uses = proficiency bonus per long rest."], { flavor: "The wise of Dale can understand the speech of birds.", uses: "PB/long" }),

  // ── Dwarves ──
  v("Baruk Khazâd!", "Dwarves of Durin's Folk", ["STR", "CHA"], ["Bonus action: each hostile creature within 30 ft. that can see and hear you makes a Charisma (Intimidation) check vs DC 8 + proficiency bonus + STR or CHA modifier, or is frightened until the end of your next turn; attacks against creatures frightened this way have advantage. Once per short or long rest."], { flavor: "The Dwarves' battle-cry is known and feared by their foes.", uses: "1/short" }),
  v("Broken Spells", "Dwarves of Durin's Folk", ALL, ["Choose three skills or tools you're proficient with: you can obtain a magical success on checks with them. Uses = proficiency bonus per long rest."], { flavor: "You know fragments of the mighty spells of old.", uses: "PB/long" }),
  v("Dark for Dark Business", "Dwarves of Durin's Folk", ["WIS"], ["Dim light doesn't impose disadvantage on your sight-based Perception.", "In dim light, darkness or underground, gain advantage on a check, attack or save — uses = proficiency bonus per long rest."], { flavor: "You are at ease in the cold embrace of the dark.", uses: "PB/long" }),
  v("Durin's Way", "Dwarves of Durin's Folk", ["DEX"], ["With half or three-quarters cover, an extra +1 to AC and Dexterity saves.", "Creatures don't gain advantage on attacks against you for being unseen by you."], { flavor: "You were taught to fight among corners, dark and stone." }),
  v("Stone-Hard", "Dwarves of Durin's Folk", ["CON"], ["When reduced to 0 HP but not killed outright, drop to 1 HP instead. Once per short or long rest."], { flavor: "Made to endure in an evil age.", uses: "1/short" }),
  v("Untameable Spirit", "Dwarves of Durin's Folk", ["INT", "WIS"], ["Immune to being charmed.", "Advantage on Intelligence saving throws."], { flavor: "Dwarves were made to resist domination." }),

  // ── Elves ──
  v("Against the Unseen", "Elves of Lindon", ["WIS", "CHA"], ["Advantage on Charisma saving throws.", "You can't be frightened by Undead."], { flavor: "You perceive the wraith-world and steel your heart against it." }),
  v("Deadly Archery", "Elves of Lindon", ["DEX"], ["Bonus action, if you haven't moved this turn: advantage on your next ranged weapon attack this turn; your speed becomes 0 until the end of the turn."], { flavor: "Your arrows find their mark with uncanny precision." }),
  v("Elbereth Gilthoniel!", "Elves of Lindon", ["INT", "WIS", "CHA"], ["When not miserable, gain advantage on an ability check, attack or save — uses = proficiency bonus per long rest."], { flavor: "In great need you call upon the Queen of the Stars.", uses: "PB/long" }),
  v("Elvish Spirit", "Elves of Lindon", ["CON"], ["After meditating at least 4 hours: reduce exhaustion by 1 and regain all lost HP. Not if you had a long rest in the last 24 hours or are at 0 HP. Once per long rest."], { flavor: "Your body recovers swiftly in the secret repose of your folk.", uses: "1/long" }),
  v("Gleam of Wrath", "Elves of Lindon", ["STR", "DEX"], ["Bonus action: a melee weapon you wield sheds dim sunlight (radius = its reach) until your next turn and deals radiant damage.", "On a critical hit with a weapon attack, roll one weapon damage die again as extra radiant damage."], { flavor: "Your kindred's wrath gleams on your blade like chill flame." }),
  v("Memory of Ancient Days", "Elves of Lindon", ["INT", "WIS"], ["Add your Intelligence modifier (min +1) to pathfinding checks.", "When you're the target of a journey event, roll on the table as if a Wild Land were a Border Land, and a Dark Land a Wild Land."], { flavor: "You remember Eriador before it fell desolate." }),

  // ── Hobbits ──
  v("Art of Disappearing", "Hobbits of the Shire", ["DEX"], ["Double proficiency on Dexterity (Stealth) checks.", "You can try to hide while only lightly obscured."], { flavor: "Hobbits vanish quickly and quietly when big folk blunder by." }),
  v("Brave at a Pinch", "Hobbits of the Shire", ALL, ["Gain inspiration whenever a hostile creature or harmful effect imposes a condition on you, you gain a level of exhaustion, or you drop to half your HP maximum or less."], { flavor: "Put a Hobbit in a tight place and see what is in them." }),
  v("Small Folk", "Hobbits of the Shire", ["DEX"], ["Medium or larger creatures can't gain advantage on attacks against you while you aren't incapacitated.", "You don't provoke opportunity attacks from Medium or larger creatures."], { flavor: "You have learned to use your size to advantage." }),
  v("Sure at the Mark", "Hobbits of the Shire", ["DEX"], ["Proficient with improvised weapons; use STR or DEX for improvised ranged attacks.", "Bonus action, if you've taken no reactions this turn: advantage on your next ranged attack this turn; you can't take reactions until your next turn."], { flavor: "Stoop for a stone and you are armed." }),
  v("Three is Company", "Hobbits of the Shire", ["CHA"], ["The Company's Fellowship rating +1.", "Whenever you or a companion you can see spends a Fellowship point, up to your proficiency bonus companions (you included) who can see or hear you gain inspiration."], { flavor: "You trust your friends more than great wisdom.", mods: { fellowship: 1 } }),
  v("Tough as Old Tree-Roots", "Hobbits of the Shire", ["CON"], ["When you roll Hit Dice to regain HP, use the maximum on each die instead."], { flavor: "Hobbits recover wonderfully — if painfully — from falls and bruises.", mods: { maxHitDice: true } }),

  // ── Men of Bree ──
  v("Bree-Pony", "Men of Bree", ["WIS"], ["Your brave, clever pony uses your proficiency bonus and adds it to its ability scores, AC, checks and saves; it has Hit Dice equal to your level (min 2).", "It obeys you and acts on your initiative (Dash, Disengage or Dodge unless you spend an action to command otherwise). If it dies, find a new one at the next Yule."], { flavor: "Like their owners, Bree-ponies are more than they seem.", companion: "Pony" }),
  v("Defiance", "Men of Bree", ["CON"], ["Bonus action: spend one Hit Die to heal yourself."], { flavor: "The Bree-folk have outlasted many realms." }),
  v("Desperate Courage", "Men of Bree", ALL, ["Whenever you gain Shadow points, you also gain inspiration."], { flavor: "You will stand against the Shadow, whatever it costs." }),
  v("Friendly and Familiar", "Men of Bree", ["CHA"], ["The Company's Fellowship rating +1.", "Double proficiency on Wisdom (Insight) checks; advantage on your first Persuasion check with Dwarves, Elves, Hobbits and Men (not Dúnedain)."], { flavor: "Your easy manners win friends among strangers.", mods: { fellowship: 1 } }),
  v("Strange as News from Bree", "Men of Bree", ["INT", "WIS"], ["Proficiency in Investigation (double if already proficient).", "Receive a rumour from the Loremaster during each Fellowship Phase."], { flavor: "You know that travellers' tales can be precious." }),
  v("The Art of Smoking", "Men of Bree", ["INT", "WIS", "CHA"], ["Double proficiency on checks with pipes.", "Use your pipe to gain inspiration a number of times equal to your proficiency bonus per long rest (instead of once)."], { flavor: "Your pipe brings patience and clarity.", uses: "PB/long" }),

  // ── Rangers ──
  v("Endurance of the Ranger", "Rangers of the North", ["CON"], ["Advantage on Constitution saving throws."], { flavor: "A Ranger on a clear trail never wearies." }),
  v("Foresight of their Kindred", "Rangers of the North", ["WIS"], ["Foresight points = Wisdom modifier (min 1), regained on a long rest. When you or a creature you can see makes a check, attack or save, spend one to reroll the d20 (must use the new roll). Or spend one after a Journey Events roll: roll a d20 and choose which result the Loremaster uses."], { flavor: "A measure of the Númenórean foresight still warns you of danger to come.", uses: "WIS/long" }),
  v("Heir of Arnor", "Rangers of the North", ALL, ["With the Loremaster, create a Wondrous Item or a Famous Weapon with one enchanted reward (it may take up to two ordinary rewards as normal), usually of Númenórean make."], { flavor: "An heirloom of Lost Arnor has passed into your keeping." }),
  v("Royalty Revealed", "Rangers of the North", ["STR", "CHA"], ["Bonus action: reveal your lineage. Up to twice your proficiency bonus friendly creatures (you included) within 30 ft. gain advantage on attacks and Intimidation checks and immunity to fear until the end of your next turn, plus temporary HP equal to your STR or CHA modifier (min 1). Once per short or long rest."], { flavor: "Shout an ancestral cry or draw a blade of high lineage, and your allies' doubts fall away.", uses: "1/short" }),
  v("Strength of Will", "Rangers of the North", ["WIS", "CHA"], ["Advantage on Charisma saving throws, and add your Wisdom modifier (min +1) to them."], { flavor: "You have heard the dead whisper from lonely barrows and are not dismayed." }),
  v("Ways of the Wild", "Rangers of the North", ["WIS"], ["Take on several journey roles without penalty.", "Proficiency in Explore, Hunting or Travel (or Expertise in one if you have all three).", "On a Wisdom check with a proficient skill you can obtain a magical success — uses = proficiency bonus per long rest."], { flavor: "The Wild is as familiar to you as the road home is to a Hobbit.", uses: "PB/long" }),
];

export const LOTR_REWARDS = [
  { name: "Close-fitting", item: "Armour", description: "Any critical hit against you becomes a normal hit while you wear it." },
  { name: "Cunning-make", item: "Armour", description: "Half weight. If it imposed disadvantage on fatigue saves it no longer does; otherwise its maximum Dexterity bonus to AC rises by 1." },
  { name: "Fell", item: "Weapon", description: "On a critical hit, roll two extra weapon damage dice. For ammunition-weapons, apply it to one piece of ammunition instead (choose to use it after rolling the attack, before the result; always recovered after the fight)." },
  { name: "Grievous", item: "Weapon", description: "+1 to damage rolls with this weapon." },
  { name: "Keen", item: "Weapon", description: "Scores a critical hit on a roll of 19–20." },
  { name: "Reinforced", item: "Shield", description: "+1 AC on top of the shield's normal bonus." },
];
export const LOTR_REWARD_LEVELS = [3, 5, 7, 9];
export const LOTR_REWARD_NOTES = [
  "Rewards are fine war gear awarded for deeds — they cannot be bought. Choose one at 3rd, 5th, 7th and 9th level.",
  "Each reward applies only once per item, and never to a Famous Weapon or Armour.",
  "Rewarded items have 'plot immunity': never lost, broken or sold. With the Company's agreement, spend 1 Fellowship point to borrow a companion's rewarded or magical item until the end of the Adventuring Phase.",
];

export const LOTR_ENCHANTED_REWARDS = [
  { name: "Ancient Close Fitting", craftsmanship: ["Elven", "Dwarven"], item: "Armour", bane: false, description: "+1 AC; critical hits against you become normal hits." },
  { name: "Ancient Cunning Make", craftsmanship: ["Elven", "Dwarven"], item: "Armour", bane: false, description: "+1 AC; half weight; no fatigue disadvantage (or +1 maximum Dexterity bonus)." },
  { name: "Superior Fell", craftsmanship: ["Elven", "Númenórean"], item: "Any weapon", bane: "if Númenórean", description: "+1 attack and damage; two extra damage dice on a critical (three if Elven, four against bane creatures if Númenórean)." },
  { name: "Superior Grievous", craftsmanship: ["Dwarven", "Númenórean"], item: "Any weapon", bane: "if Númenórean", description: "+1 attack and damage (+2 damage if Dwarven, +3 against bane creatures if Númenórean)." },
  { name: "Superior Keen", craftsmanship: ["Dwarven", "Elven"], item: "Any weapon", bane: "if Elven", description: "+1 attack and damage; critical on 19–20 (18–20 against bane creatures if Elven)." },
  { name: "Superior Reinforced", craftsmanship: ["Any"], item: "Shield", bane: "if Númenórean", description: "+1 AC on top of the shield (+2 if Dwarven or Elven, +3 against bane creatures if Númenórean)." },
  { name: "Biting Dart", craftsmanship: ["Elven"], item: "Ranged weapon", bane: true, description: "+1 attack and damage; a bane creature you hit has disadvantage on attacks until the end of your next turn." },
  { name: "Cleaving", craftsmanship: ["Any"], item: "Melee weapon", bane: false, description: "Make one melee attack with it as a bonus action each turn." },
  { name: "Flame of Hope", craftsmanship: ["Dwarven"], item: "Melee weapon", bane: false, description: "While drawn, you and friends within 10 ft. add your Charisma modifier (min +1) to saving throws in combat." },
  { name: "Foe-Slaying", craftsmanship: ["Elven", "Númenórean"], item: "Any weapon", bane: true, description: "Hitting a bane creature adds one extra weapon damage die (two if Elven)." },
  { name: "Gleam of Terror", craftsmanship: ["Dwarven"], item: "Melee weapon", bane: false, description: "+1 attack and damage; bonus action to shed dim sunlight and deal radiant damage until your next turn." },
  { name: "Hammering", craftsmanship: ["Any"], item: "Melee weapon", bane: false, description: "+1 attack and damage; a creature you hit must make a Strength save (DC 8 + PB + STR) or fall prone." },
  { name: "Hollow Steel", craftsmanship: ["Númenórean"], item: "Ranged weapon", bane: false, description: "Make one ranged attack with it as a bonus action each turn." },
  { name: "Luminescence", craftsmanship: ["Elven"], item: "Melee weapon", bane: true, description: "+1 attack and damage; glows when bane creatures are within 500 ft. — while it glows, you and allies within 30 ft. who can see you can't be surprised by them and have advantage on initiative." },
  { name: "Mithril Armour", craftsmanship: ["Dwarven"], item: "Mail-shirt", bane: false, description: "Half weight, wearable under clothes; base AC 14 + Dex (max 4) and counts as light armour for proficiency." },
  { name: "Rune-Scored Armour", craftsmanship: ["Dwarven"], item: "Armour", bane: false, description: "+1 AC and +1 to saving throws." },
  { name: "Rune-Scored Shield", craftsmanship: ["Dwarven"], item: "Shield", bane: false, description: "+1 AC (on top of the shield) and +1 to saving throws." },
  { name: "Rune-Scored Weapon", craftsmanship: ["Dwarven"], item: "Melee weapon", bane: false, description: "+1 attack and damage; +1 to saving throws while carried." },
  { name: "Straight Flight", craftsmanship: ["Any"], item: "Ranged weapon", bane: false, description: "+1 attack and damage; ignore all but total cover and no disadvantage at long range." },
];
