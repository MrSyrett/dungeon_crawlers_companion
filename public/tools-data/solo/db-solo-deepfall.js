/* SOLO PLAY — module: Alone in Deepfall Breach (window.DB_SOLO_MODULES).
 *
 * The booklet gives each mission a briefing, an objective, a threat and a list of
 * waypoints (some "Unknown"). Briefings and waypoint text here are PARAPHRASED.
 * Everything under `challenges`, `secrets` and `encounters` is OUR addition (the
 * book leaves those to the player) — flagged in the UI as "suggested".
 *
 * Foe references: "monster:<id>" → DB_MONSTERS, "npc:<id>" → DB_NPCS,
 * {template:"minion"|"boss"} → the booklet's Simple NPC templates.
 * `count` is the fight as written; `solo` is a lighter version for one hero.
 *
 * Module format (v1) — also the target for "convert to solo" later:
 *   module  { id, system, title, blurb, intro{title,text}, hub{name,text}, allies[], missions[] }
 *   mission { id, title, briefing, objective, threat{text,trigger,inherent,encounter?}, reward?, waypoints[] }
 *   waypoint{ id, name, unknown?, text, challenges[], secrets[], encounters[], exits?[] }
 *   challenge { id, label, skill|attr, boon?, bane?, note, success, failure,
 *               onSuccess{reveal[],objective,treasure,threat}, onFail{threat,encounter,damage,trap,reveal[]} }
 *   secret  { id, text, boonFor? }               (shown once a challenge reveals it; boonFor = a challenge id it gives a boon to)
 *   encounter { id, label, note, foes[{ref|template,name,count,solo,role,weapon,skills}] }
 *
 * Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
 */
(function () {
  "use strict";
  var W = window;
  var M = {
    id: "db-deepfall",
    system: "DB",
    title: "Alone in Deepfall Breach",
    blurb: "Five linked missions into the wound Sathmog's spear tore in the Misty Vale. The book's solo campaign.",
    source: "Alone in Deepfall Breach (Free League)",
    intro: {
      title: "The Chapel and the Wolf",
      text: "Torrential rain drives you into a nameless chapel on the lip of the Breach, its windows shattered, its doors hanging loose. Candles flicker over rotting pews and a desk buried in maze-like maps. A scarred old wolfkin in ragged robes rises from the shadows, leaning on a two-handed mace capped with a steel fist; a sphere of stone sits where his left eye should be. He names himself Stone-Gaze — and then Ingolfr, the demon hunter of legend. \"Have ye come to delve the Breach? There's good to be done, justice to be dealt and riches to be found — if ye've the mettle.\""
    },
    hub: {
      name: "The Vault of Many Paths",
      text: "A crumbling stair winds down the chasm wall to a twisting corridor and, beyond it, a vast spherical chamber carved with dragons and demons locked in endless battle. Countless tunnels run from it like veins. Every mission starts here, with Ingolfr's notes in hand."
    },
    allies: [
      {
        id: "ingolfr", name: "Ingolfr Stone-Gaze", note: "Book stats. A hermit priest now; supplies every mission's waypoints with his enchanted eye.",
        stats: "Movement 12 · Damage bonus STR +D4 · Armor — · HP 16 · WP 14 · Skills: Awareness 14, Healing 10, Myths & Legends 14 · Abilities: Eagle Eye, Veteran · Fiendbreaker (skill 16, 2D8, +D6 vs demons)"
      },
      { id: "outskirt", name: "Outskirt", note: "A village a short trip from the chapel — resupply, upgrade gear, or talk to someone other than Ingolfr between missions." }
    ],
    missions: [
      // ─────────────────────────────────────────────── MISSION 1
      {
        id: "m1", title: "The Captive Orc",
        briefing: "\"A sect of demon cultists holds the Worldbreaker Shard — the tip of the spear that split this land. Their outpost is hidden from my sight. But below, a band of them is moving a prisoner: an orc named Gorum. He knows where their outpost lies, and he may prove a worthy ally.\"",
        objective: "Free Gorum from the cultists.",
        threat: {
          text: "A trio of goblin scouts plunders the Breach, looting old crypts and robbing anyone who crosses their path.",
          trigger: "They spring an ambush!", inherent: false, encounter: "goblin-ambush"
        },
        encountersShared: [
          { id: "goblin-ambush", label: "Goblin ambush", note: "The threat comes due. Goblins favour bows from cover, then close with short swords. Ask Fortune whether they flee once one falls.", foes: [{ ref: "npc:goblin-scout", count: 3, solo: 3, role: "ranged" }] }
        ],
        waypoints: [
          {
            id: "plunging-path", name: "Plunging Path",
            text: "A sloping corridor drops into the oppressive dark. The walls are split with cracks and hollows, and from somewhere above comes the papery rustle of folded wings. Ingolfr's warning echoes: tread softly.",
            challenges: [
              { id: "tread", label: "Tread softly past the nests", skill: "Sneaking", note: "Keep your footfalls quiet and your light low.",
                success: "You slip past the nesting creatures without stirring a wing.",
                failure: "A loose stone clatters away into the dark. Leathery wings erupt from the cracks.", onFail: { encounter: "bats" } },
              { id: "spot-nests", label: "Study the cracks before you go", skill: "Spot Hidden", note: "Optional. Spotting the nests first makes sneaking easier.",
                success: "You pick out the roosts — and a dry ledge that skirts most of them.", onSuccess: { reveal: ["ledge"] },
                failure: "Every shadow looks like a nest." }
            ],
            secrets: [{ id: "ledge", text: "A dry ledge skirts most of the roosts: take a boon on the Sneaking roll.", boonFor: "tread" }],
            encounters: [
              { id: "bats", label: "Vampiric bats", note: "Fang and wing. They want blood, not a fight to the death — ask Fortune if they scatter when hurt.", foes: [{ ref: "monster:vampiric-bats", count: 1, solo: 1 }] }
            ]
          },
          {
            id: "charred-tomb", name: "Charred Tomb",
            text: "Fire gutted this mausoleum long ago. Five sarcophagi stand amid drifts of grey ash, their carvings blackened. Ingolfr spoke of a hidden door inside one of the coffins — and of a trap, and of the scorched dead who should not be disturbed.",
            challenges: [
              { id: "find-door", label: "Find the coffin with the hidden door", skill: "Spot Hidden", note: "Searching takes a stretch — the threat advances.",
                success: "Scuff marks in the ash lead to the fourth sarcophagus. Its base is a stone door — and a taut wire runs under the lid.", onSuccess: { reveal: ["door", "wire"], threat: 1 },
                failure: "You find the door only by heaving at the lids one by one…", onFail: { threat: 1, trap: true, reveal: ["door"] } },
              { id: "disarm", label: "Disarm the trap", skill: "Sleight of Hand", boon: true, requires: "wire", note: "Boon: you know exactly where the wire is.",
                success: "You pin the wire and slip the catch. The door is safe.",
                failure: "The wire snaps.", onFail: { trap: true } },
              { id: "respect", label: "Leave the dead undisturbed", skill: "Myths & Legends", note: "Recall the rites that keep the dead at rest.",
                success: "You murmur the old words and touch nothing but the door. The ash stays still.",
                failure: "Something shifts in the ash of the other coffins.", onFail: { encounter: "scorched-dead" } }
            ],
            secrets: [
              { id: "door", text: "The fourth sarcophagus hides a stone door leading deeper into the Breach." },
              { id: "wire", text: "A trip-wire under the lid triggers the trap: disarm it with a boon on SLEIGHT OF HAND." }
            ],
            encounters: [
              { id: "scorched-dead", label: "The scorched dead", note: "Charred skeletons claw their way out of the ash.", foes: [{ ref: "npc:skeleton-warrior", count: 3, solo: 2, name: "Scorched Dead", role: "melee" }] }
            ]
          },
          { id: "m1-u1", name: "Unknown", unknown: true },
          { id: "m1-u2", name: "Unknown", unknown: true },
          {
            id: "fiendish-altar", name: "Fiendish Altar",
            text: "A bloodstained altar dominates the chamber, scored with symbols meant for parley with things beyond the world. The cultists huddle here with their prisoner — a broad-shouldered orc in chains. They are jumpy, whispering, glancing at the shadows. These are not fanatics ready to die.",
            objective: true,
            challenges: [
              { id: "count", label: "How many cultists?", fortune: "number", note: "Ask the Fortune Chart (Number). Unlikely to be many." },
              { id: "parley", label: "Talk them into giving up Gorum", skill: "Persuasion", note: "They're afraid. Threats, bribes or a way out may work.",
                success: "Their nerve breaks. They leave Gorum's key on the altar and flee into the dark.", onSuccess: { objective: true },
                failure: "Their leader steadies them: they will hand Gorum over only if you prove you can't be beaten. Draw steel or find another way.", onFail: { encounter: "cultists" } },
              { id: "free-sneak", label: "Free Gorum while they bicker", skill: "Sneaking", note: "Creep round the altar and work his chains.",
                success: "You slip the chains. Gorum rises silently beside you.", onSuccess: { objective: true },
                failure: "A cultist turns — and screams.", onFail: { encounter: "cultists" } },
              { id: "bluff", label: "Convince them a demon is coming", skill: "Bluffing", note: "Play on their fear of what they summon.",
                success: "They scatter, leaving the orc behind.", onSuccess: { objective: true },
                failure: "Half of them run — the rest draw knives.", onFail: { encounter: "cultists-few" } }
            ],
            encounters: [
              { id: "cultists", label: "Demon cultists", note: "Fearful and hesitant: ask Fortune whether they flee or surrender once one falls. Defeat or rout them, then free Gorum.", foes: [{ ref: "npc:cultist", count: 4, solo: 3, role: "melee" }], objective: true },
              { id: "cultists-few", label: "The cultists who stayed", note: "The braver half. Ask Fortune whether the rest come back.", foes: [{ ref: "npc:cultist", count: 2, solo: 2, role: "melee" }], objective: true }
            ]
          }
        ],
        reward: { text: "Gorum, freed, tells you where the cult's warren lies. He returns to the orcs of Maladûk — a friend in the depths." }
      },
      // ─────────────────────────────────────────────── MISSION 2
      {
        id: "m2", title: "The Cultist's Warren",
        briefing: "\"My eye is fixed on the cult's outpost beneath the stone. There ye'll find Arioch, devotee of demons, wearing the Worldbreaker Shard as a medallion. Take it from them, so we may remake its power for good.\"",
        objective: "Seize the Worldbreaker Shard from Arioch.",
        threat: { text: "The chasm is restless; magma churns below.", trigger: "Flowing magma bursts into the scene, causing chaos!", inherent: true },
        waypoints: [
          { id: "stone-maw", name: "Stone Maw",
            text: "A colossal face has been carved — or warped — into the rock, a fanged monstrosity whose gaping mouth is the way in. Something dark drips from its fangs. Ingolfr could not say whether the blood was real or a vision of what is to come.",
            challenges: [
              { id: "blood", label: "Is the blood real?", skill: "Spot Hidden", note: "Look closer before stepping into the maw.",
                success: "Fresh blood, and boot prints: sentries passed here moments ago, heading inward.", onSuccess: { reveal: ["sentries"] },
                failure: "You can't tell — and the sense of being watched won't leave you." }
            ],
            secrets: [{ id: "sentries", text: "Cult sentries patrol just inside. You can avoid them or ambush them (boon on your first attack)." }],
            encounters: [{ id: "sentries", label: "Cult sentries", foes: [{ ref: "npc:cultist", count: 2, solo: 2, role: "melee" }] }] },
          { id: "m2-u1", name: "Unknown", unknown: true },
          { id: "m2-u2", name: "Unknown", unknown: true },
          { id: "fools-crossing", name: "Fool's Crossing",
            text: "A crumbling bridge spans the rift over a river of belching magma. Orcs camp at the near end, laying siege to a cultist barricade on the far side — and getting nowhere. Some magic turns their charges aside.",
            challenges: [
              { id: "orcs", label: "Parley with the orcs", skill: "Persuasion", note: "If Gorum is your friend, take a boon.", success: "The orcs will keep the cultists busy while you cross.", failure: "The orcs want nothing to do with you — this time.", onSuccess: { reveal: ["distraction"] } },
              { id: "ward", label: "Understand the warding magic", skill: "Myths & Legends", note: "What repels the orcs?", success: "A ward-stone sits on the barricade. Smash it and the magic fails.", onSuccess: { reveal: ["ward"] }, failure: "The magic is unfamiliar." },
              { id: "cross", label: "Cross the crumbling bridge", skill: "Acrobatics", note: "Bane if you're carrying heavy gear.", success: "You dance across the failing stones.", failure: "A section collapses — you claw your way up, scorched.", onFail: { damage: "2D6", threat: 1 } }
            ],
            secrets: [{ id: "distraction", text: "The orcs storm the barricade on your signal: the cultists there are too busy to notice you." }, { id: "ward", text: "A ward-stone on the barricade powers the magic. Destroy it (any solid hit) to drop the ward." }],
            encounters: [{ id: "barricade", label: "Barricade guards", foes: [{ ref: "npc:cultist", count: 3, solo: 2, role: "melee" }] }] },
          { id: "shadowed-courtyard", name: "Shadowed Courtyard",
            text: "Past a ruined gate lies a courtyard before an ancient stronghold teeming with cultists. Ingolfr was clear: don't go through the front. An old well in the corner drops into the tunnels below.",
            challenges: [
              { id: "sneak-court", label: "Reach the well unseen", skill: "Sneaking", success: "You drop into the well without a sound.", failure: "A sentry calls out — you dive into the well with pursuit behind you.", onFail: { threat: 1, encounter: "courtyard-guard" } }
            ],
            encounters: [{ id: "courtyard-guard", label: "Pursuing guard", foes: [{ ref: "npc:cultist", count: 1, solo: 1, role: "melee" }] }] },
          { id: "ratways", name: "Ratways",
            text: "Stifling, low tunnels with no room for mistakes. Somewhere ahead a soft voice calls, offering rest and safety. Ingolfr warned: the voice lies. Follow the silent darkness instead.",
            challenges: [
              { id: "voice", label: "Resist the lying voice", attr: "WIL", note: "An attribute roll against WIL.", success: "You shut the voice out and press on into the silence.", failure: "You follow the voice before you catch yourself — it leads into danger.", onFail: { threat: 1, trap: true } },
              { id: "silence", label: "Follow the silent darkness", skill: "Awareness", success: "The quiet path leads straight to the cult's heart.", failure: "You lose the way and must double back.", onFail: { threat: 1 } }
            ] },
          { id: "ritual-chamber", name: "Ritual Chamber", objective: true,
            text: "Sulphurous steam rises from a wide pit at the chamber's heart, ringed with fiendish symbols. Arioch stands at its edge between two cultist priests, chanting, the Worldbreaker Shard glowing on a chain at their throat.",
            challenges: [
              { id: "snatch", label: "Snatch the shard mid-ritual", skill: "Sleight of Hand", bane: true, note: "Bane: they're facing the pit, but it's still a medallion round a neck.", success: "The chain parts — the shard is yours. Run!", onSuccess: { objective: true, threat: 2 }, failure: "Arioch whirls on you.", onFail: { encounter: "arioch" } }
            ],
            encounters: [{ id: "arioch", label: "Arioch and the priests", objective: true, note: "Arioch is a Boss (magic and melee attacker); the priests are Minions using the magic role. Take the shard and get out.",
              foes: [
                { template: "boss", name: "Arioch", count: 1, solo: 1, role: "magic", role2: "melee", weapon: { name: "Sacrificial Dagger", skill: 15, damage: "2D8" } },
                { template: "minion", name: "Cultist Priest", count: 2, solo: 1, role: "magic" }
              ] }] }
        ],
        reward: { text: "The Worldbreaker Shard is yours. Ingolfr will know what must be done with it." }
      },
      // ─────────────────────────────────────────────── MISSION 3
      {
        id: "m3", title: "The Mage's Refuge",
        briefing: "\"A wizard of repute once lived in the Breach, studying its fiendish birth. Decades dead now, their tower abandoned. Bring back what ye'll need: a pair of calling stones, to bind yer soul to the surface should you need a way out.\"",
        objective: "Retrieve the calling stones from the Mage's Study.",
        threat: { text: "A troll who called the mage friend has guarded the tower for centuries, and now hunts anyone who seeks its dead friend's wealth and wisdom.", trigger: "A lumbering troll finds you!", inherent: false, encounter: "troll" },
        encountersShared: [{ id: "troll", label: "The troll guardian", note: "Trolls can usually be persuaded (with a bane) — mention the mage. Food and kindness work better than steel.", foes: [{ ref: "monster:troll", count: 1, solo: 1 }] }],
        waypoints: [
          { id: "moon-door", name: "Moon Door",
            text: "Ingolfr's notes say: don't take a passage. Somewhere on the vault wall is an illusory surface marked with a crescent moon. Step through it.",
            challenges: [{ id: "moon", label: "Find the crescent moon", skill: "Spot Hidden", note: "Or Myths & Legends to know where such doors are hidden.", success: "Your hand passes through the stone.", failure: "You search for a long time before you find it.", onFail: { threat: 1 } }] },
          { id: "petrified-arboretum", name: "Petrified Arboretum",
            text: "Trees of brittle stone stand in maddening rows under the tower. Whispers drift between them — the dryads who once lived here, now become something else.",
            challenges: [
              { id: "whispers", label: "Ignore the whispers", attr: "WIL", success: "You walk on, deaf to their promises.", failure: "The whispers draw you in among the trees.", onFail: { encounter: "dryads" } },
              { id: "path", label: "Find the way through", skill: "Bushcraft", success: "You read the pattern of the trees and pass through.", failure: "You wander lost among the stone trunks.", onFail: { threat: 1 } }
            ],
            encounters: [{ id: "dryads", label: "Corrupted dryads", note: "No bestiary entry — Minions using the sneaky role.", foes: [{ template: "minion", name: "Corrupted Dryad", count: 2, solo: 1, role: "sneaky" }] }] },
          { id: "m3-u1", name: "Unknown", unknown: true },
          { id: "peering-walls", name: "Peering Walls",
            text: "Eyes beyond counting open in the stone flesh of the walls, all of them turning to follow you. Ingolfr warned: do not meet their glare.",
            challenges: [{ id: "glare", label: "Keep your eyes down", attr: "WIL", note: "Failure: roll on the fear table (the sheet's Fear button).", success: "You pass with your gaze on your feet.", failure: "You meet a fiendish eye — terror grips you. Make a fear roll on your sheet." }] },
          { id: "m3-u2", name: "Unknown", unknown: true },
          { id: "maddening-orrery", name: "Maddening Orrery",
            text: "The mage's great orrery still whirs and grinds, brass rings sweeping through the chamber where once it charted the heavens. You must get across — or stop it.",
            challenges: [
              { id: "traverse", label: "Leap through the machinery", skill: "Acrobatics", success: "You time the rings and roll through.", failure: "A ring clips you.", onFail: { damage: "2D6" } },
              { id: "disable", label: "Jam the gears", skill: "Crafting", success: "The orrery grinds to a halt.", failure: "Sparks fly and the machine speeds up.", onFail: { threat: 1 } }
            ] },
          { id: "endless-stair", name: "Endless Stair",
            text: "A spiral stair climbs toward the tower's top — and keeps climbing. Arcane trickery traps the unwary in an infinite ascent, and the shambling remains of less fortunate climbers still trudge upward.",
            challenges: [{ id: "break", label: "See through the illusion", skill: "Spot Hidden", note: "Or roll INT.", success: "You find the step that repeats and break the loop.", failure: "You climb for an age before the loop releases you.", onFail: { threat: 1, encounter: "remains" } }],
            encounters: [{ id: "remains", label: "Shambling remains", foes: [{ ref: "npc:skeleton-warrior", count: 2, solo: 2, name: "Shambling Remains", role: "melee" }] }] },
          { id: "mages-study", name: "Mage's Study", objective: true,
            text: "The laboratory and library lie in darkness. The mage's corpse sits slumped at the desk, and the last of their magic still hums in the air, warding against thieves. Take only what you came for.",
            challenges: [
              { id: "wards", label: "Spot the wards", skill: "Spot Hidden", success: "Glyphs on the shelves — touch nothing else.", onSuccess: { reveal: ["glyphs"] }, failure: "The air prickles, but you see nothing." },
              { id: "take", label: "Take the calling stones", skill: "Sleight of Hand", note: "Boon if you spotted the wards.", success: "The stones are yours, and the wards stay quiet.", onSuccess: { objective: true }, failure: "A ward flares as you take them.", onFail: { damage: "2D6", objective: true } }
            ],
            secrets: [{ id: "glyphs", text: "Warding glyphs cover the shelves. Take only the calling stones (boon on the roll).", boonFor: "take" }] }
        ],
        reward: { text: "The Calling Stones: one stays at the chapel, one with you. Speak the word and you return to the chapel instantly. After each use roll D6 — on a 1 the stone cracks and will work only once more.", item: "Calling Stones" }
      },
      // ─────────────────────────────────────────────── MISSION 4
      {
        id: "m4", title: "The Soul Tree",
        briefing: "\"The rains won't stop and the Breach is flooding. Follow the water down — to the very edge of life and death. There grows the Soul Tree. We need its enchanted sap.\"",
        objective: "Gather blood-red sap from the Soul Tree, then return by calling stone.",
        threat: { text: "Tortured spirits follow the same path to the underworld, and one of them knows you. Absolution or revenge?", trigger: "A ghostly menace appears!", inherent: false, encounter: "spirit" },
        encountersShared: [{ id: "spirit", label: "The familiar spirit", note: "Someone from your past. A Persuasion roll might grant it peace instead of a fight.", foes: [{ ref: "monster:ghost", count: 1, solo: 1, name: "Tortured Spirit" }] }],
        waypoints: [
          { id: "streaming-stairs", name: "Streaming Stairs", text: "A spiral stair, its steps slick with muddy runoff pouring down in a torrent.",
            challenges: [{ id: "descend", label: "Keep your footing", skill: "Acrobatics", success: "You descend sure-footed.", failure: "You slide and tumble down the steps.", onFail: { damage: "D6" } }] },
          { id: "flooding-chamber", name: "Flooding Chamber", text: "Water pours into this chamber faster than it can drain. The only way out is a trapdoor worked by hidden mechanisms. Beware what lies beneath it.",
            challenges: [
              { id: "mech", label: "Find the mechanism", skill: "Spot Hidden", success: "A lever behind a loose stone.", failure: "The water rises as you search.", onFail: { threat: 1 } },
              { id: "swim", label: "Swim down to the trapdoor", skill: "Swimming", success: "You reach the hatch and haul it open.", failure: "You come up choking.", onFail: { damage: "D6" } }
            ] },
          { id: "m4-u1", name: "Unknown", unknown: true },
          { id: "m4-u2", name: "Unknown", unknown: true },
          { id: "maze", name: "Maze of Lost Souls", text: "Floodwater runs through a labyrinth. A minotaur of great strength and pride stalks its passages, lost and enraged, searching for something. Skeletons wander too — souls the ferryman would not take.",
            challenges: [
              { id: "navigate", label: "Find the way through", skill: "Bushcraft", success: "You follow the current to the far side.", failure: "You turn a corner into the minotaur's path.", onFail: { encounter: "minotaur" } },
              { id: "help", label: "Help the minotaur find what it lost", skill: "Persuasion", note: "Ask Fortune (Inspiration) what it seeks.", success: "It lets you pass — perhaps even guides you.", failure: "It bellows and charges.", onFail: { encounter: "minotaur" } }
            ],
            encounters: [
              { id: "minotaur", label: "Lost minotaur", foes: [{ ref: "monster:minotaur", count: 1, solo: 1 }] },
              { id: "wanderers", label: "Wandering skeletons", foes: [{ ref: "npc:skeleton-warrior", count: 2, solo: 2, role: "melee" }] }
            ] },
          { id: "wailing-shore", name: "Wailing Shore", text: "The floodwater becomes a river, emptying into a mist-shrouded lake in a cavern without end. A ferryman of many names waits by his boat. He will take you across — for a price.",
            challenges: [{ id: "price", label: "Bargain with the Ferryman", skill: "Bartering", note: "Ask Fortune (Quality) what he wants.", success: "He accepts a fair price.", failure: "His price is steep — something you'd rather keep." }] },
          { id: "acheron-isle", name: "Acheron Isle", objective: true, text: "Mounds of bone rise around a lone, luminous tree. Two undead harpies with rotting wings — the Raven Sisters — circle above. They abide no living trespasser.",
            challenges: [
              { id: "sap", label: "Gather the sap from the tree's heart", skill: "Sleight of Hand", success: "Blood-red sap fills your flask.", onSuccess: { objective: true }, failure: "The Raven Sisters see you.", onFail: { encounter: "sisters" } },
              { id: "sneak-isle", label: "Approach unseen", skill: "Sneaking", success: "The sisters never see you coming.", failure: "Shrieks split the mist.", onFail: { encounter: "sisters" } }
            ],
            encounters: [{ id: "sisters", label: "The Raven Sisters", note: "Two undead harpies. Use the calling stone to escape once you have the sap.", objective: true, foes: [{ ref: "monster:harpy", count: 2, solo: 2, name: "Raven Sister" }] }] }
        ],
        reward: { text: "A flask of the Soul Tree's blood-red sap. The calling stone brings you home." }
      },
      // ─────────────────────────────────────────────── MISSION 5
      {
        id: "m5", title: "The Orc's Forge",
        briefing: "\"We must forge the Worldbreaker anew, as a weapon of light — cast in the fires of the Breach and quenched in the blood of the Soul Tree. The orcs of Maladûk keep an outpost in the molten wastes, and there lives Gorum, a weaponsmith of rare skill. Seek his aid.\"",
        objective: "Have Gorum reforge the Worldbreaker.",
        threat: { text: "Demon cultists want the shard back and hunt you with magic and cunning.", trigger: "Cultists attack!", inherent: false, encounter: "hunters" },
        encountersShared: [{ id: "hunters", label: "Cult hunters", foes: [{ ref: "npc:cultist", count: 3, solo: 2, role: "sneaky" }, { template: "minion", name: "Cult Adept", count: 1, solo: 1, role: "magic" }] }],
        waypoints: [
          { id: "iron-ladders", name: "Iron Ladders", text: "Great iron rungs hammered into the rock lead down into the depths. Something with many legs and many eyes shadows the climbers. Climb fast.",
            challenges: [{ id: "climb", label: "Climb quickly", skill: "Acrobatics", success: "You reach the bottom before the spider closes in.", failure: "The spider drops onto the ladder above you.", onFail: { encounter: "spider" } }],
            encounters: [{ id: "spider", label: "Giant spider", foes: [{ ref: "monster:giant-spider", count: 1, solo: 1 }] }] },
          { id: "m5-u1", name: "Unknown", unknown: true },
          { id: "sulfurous-tunnels", name: "Sulfurous Tunnels", text: "Blasts of superheated steam roar up from molten pits. Something dwells in the scalding fog — you won't be alone.",
            challenges: [{ id: "steam", label: "Time your passage between the blasts", skill: "Awareness", success: "You slip through between bursts.", failure: "Steam catches you.", onFail: { damage: "2D6" } }],
            encounters: [{ id: "fog-dweller", label: "Something in the fog", note: "Roll Inhabitants, or choose.", foes: [{ template: "minion", name: "Fog Dweller", count: 1, solo: 1, role: "sneaky" }] }] },
          { id: "goblin-pit", name: "Goblin in the Pit", text: "A bloody skirmish between orcs and cultists left one survivor: a goblin, hurt, at the bottom of a deep pit. Find them and earn their trust — they know of treasure ahead.",
            challenges: [
              { id: "heal-goblin", label: "Tend the goblin's wounds", skill: "Healing", success: "Grateful, the goblin tells you where the skirmish loot was hidden.", onSuccess: { reveal: ["loot"], treasure: 1 }, failure: "The goblin is too scared to talk." },
              { id: "talk-goblin", label: "Win the goblin's trust", skill: "Persuasion", success: "They whisper where the treasure lies.", onSuccess: { reveal: ["loot"] }, failure: "They bite you and scurry off." }
            ],
            secrets: [{ id: "loot", text: "Treasure is cached ahead — draw a treasure card when you reach the next waypoint." }] },
          { id: "m5-u2", name: "Unknown", unknown: true },
          { id: "m5-u3", name: "Unknown", unknown: true },
          { id: "molten-wastes", name: "Molten Wastes", objective: true, text: "Veins of magma pool in pits that undermine the path. Orcs and goblins guard the Maladûk outpost and range out hunting some artifact for their clan. Gorum works the forge within — and he won't work for free.",
            challenges: [
              { id: "enter", label: "Get past the outpost guards", skill: "Persuasion", note: "Boon if you freed Gorum in Mission 1.", success: "They take you to Gorum.", failure: "The guards want proof you're no cultist.", onFail: { encounter: "guards" } },
              { id: "deal", label: "Strike a deal with Gorum", skill: "Bartering", note: "He wants something — ask Fortune or Inspiration what.", success: "Gorum fires the forge. The Worldbreaker is reborn.", onSuccess: { objective: true }, failure: "He'll do it — after you do him a favour (a new waypoint)." }
            ],
            encounters: [{ id: "guards", label: "Outpost guards", foes: [{ ref: "npc:orc-warrior", count: 2, solo: 1, role: "melee" }] }] }
        ],
        reward: { text: "Worldbreaker Reforged: a weapon of your choice dealing 2D8 damage (3D10 against demons). As a free reaction, the bearer may roll WIL to nullify any demon attack against them.", item: "Worldbreaker" }
      }
    ]
  };
  (W.DB_SOLO_MODULES = W.DB_SOLO_MODULES || []).push(M);
})();
