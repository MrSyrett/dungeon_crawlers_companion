/* SOLO PLAY — module: The Sinking Tower (window.DB_SOLO_MODULES).
 *
 * The Dragonbane quickstart one-shot, converted to solo play: a group tournament
 * adventure (five heroes, a two-hour clock, points) played by one hero with the
 * solo engine. All text is PARAPHRASED; the mechanics (the plate, book, chest,
 * drape and stone puzzles, the stat blocks, the scoring) follow the book.
 *
 * Solo conversion choices (ours, flagged in the UI where it matters):
 *   - The real-time two-hour clock becomes the threat clock: each 6 is one hour.
 *     It moves when you first reach a floor, rest, finish a fight, or a failure
 *     costs time. Hour one floods the Statue Gallery; hour two sinks the tower.
 *   - Fights offer a lighter version for one hero (2 skeletons of 5, 2
 *     figureheads of 4). Krakul is as written: bargain, trick or run.
 *   - Climbing the outside: one ACROBATICS roll with a bane stands in for the
 *     book's roll per floor.
 *   - Alberic and Betrix (the book's replacement heroes) are rescues that score
 *     points; their sheets are in the Adventure Prep if your hero falls.
 *   - A floor that sinks under you allows one SWIMMING roll with a bane (mercy).
 *
 * Uses the engine's module format v2 additions: labels, flags/requires, exits,
 * options, everyRoll, threat stages, sink, escapes, scoring, inline monsters.
 * Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
 */
(function () {
  "use strict";
  var W = window;

  // ── the tower's own creatures (book stat blocks) ─────────────────────────
  var EEL = {
    name: "Monster Eel", hp: 28, armor: 3, ferocity: 2,
    attacks: [
      { roll: 1, name: "Threatening Lunge", damage: null, fear: true, dodge: false, text: "It circles you and lunges at your face: a fear attack (WIL)." },
      { roll: 2, name: "Ramming", damage: "D10", type: "bludgeoning", dodge: true, text: "It rams you for D10 bludgeoning; if you take damage you are also Dazed." },
      { roll: 3, name: "Tail Swipe", damage: "2D6", type: "bludgeoning", dodge: true, text: "Its tail lashes you within 4 m: 2D6 bludgeoning, and you are Dazed." },
      { roll: 4, name: "Furious Bite", damage: "2D8", type: "slashing", dodge: true, text: "Its fangs sink in for 2D8 slashing." },
      { roll: 5, name: "Sweeping Attack", damage: "D8", type: "bludgeoning", dodge: true, text: "It thrashes through the water: everyone within 6 m takes D8 bludgeoning." },
      { roll: 6, name: "Lethal Embrace", damage: "2D4", type: "bludgeoning", dodge: true, text: "It coils around you: 2D4 bludgeoning now and 2D4 more on each of your turns. You can't move or act except to break free (STR roll)." }
    ]
  };
  var GHOST = {
    name: "Arlidus, the Librarian's Ghost", hp: 30, armor: 0, ferocity: 2,
    immune: { hurtBy: "magic or fire", text: "Immune to all damage except magic and fire." },
    attacks: [
      { roll: 1, name: "Toppling Bookcase", damage: "2D8", type: "bludgeoning", dodge: true, text: "A bookcase crashes down: 2D8 bludgeoning and you're pinned — no moving or acting until you break free (STR roll)." },
      { roll: 2, name: "Hand of the Dead", damage: "2D10", ignoreArmor: true, dodge: true, text: "An icy hand squeezes your heart: 2D10 damage, armor doesn't help, and you become Scared." },
      { roll: 3, name: "Tome Whack", damage: "2D6", type: "bludgeoning", ignoreArmor: true, dodge: true, text: "A flying book hits the loudest intruder: 2D6 bludgeoning (only a helmet helps) and you become Angry." },
      { roll: 4, name: "Gaze of the Dead", damage: null, fear: true, dodge: false, text: "Its dead stare: you become Scared and suffer a fear attack, rolling WIL with a bane." },
      { roll: 5, name: "Crushing Throw", damage: "2D10+D8", type: "bludgeoning", dodge: true, text: "You're flung into the ceiling (2D10) and fall prone (D8 more), all bludgeoning." },
      { roll: 6, name: "Book Storm", damage: "2D6", type: "bludgeoning", dodge: true, text: "Every book in the room takes flight: 2D6 bludgeoning." }
    ]
  };
  var FIGUREHEAD = {
    name: "Enchanted Figurehead", hp: 24, armor: 3, ferocity: 1,
    vuln: { type: "fire", mult: 2 },
    note: "Each drape pulled aside freezes one figurehead. Fire deals double damage.",
    attacks: [
      { roll: 1, name: "Dreadful Roar", damage: null, fear: true, dodge: false, text: "A roar of splintering wood: a fear attack." },
      { roll: 2, name: "Creaking Bite", damage: "2D8", type: "slashing", dodge: true, text: "Hardwood jaws snap shut: 2D8 slashing." },
      { roll: 3, name: "Hardwood Headbutt", damage: "2D6", type: "bludgeoning", ignoreArmor: true, dodge: true, text: "2D6 bludgeoning — only a helmet helps — and you're knocked down if hurt." },
      { roll: 4, name: "Seawater Cascade", damage: "D8", type: "bludgeoning", dodge: true, text: "Seawater gushes from its mouth in a 10 m cone: you're thrown D8 metres, take that much bludgeoning damage and land prone." },
      { roll: 5, name: "Icy Wind", damage: null, dodge: false, text: "A freezing wind fills the room: roll BUSHCRAFT on your sheet or suffer from the cold." },
      { roll: 6, name: "Toppling Throw", damage: "2D6", type: "bludgeoning", dodge: true, text: "It hurls you across the room: 2D6 bludgeoning and you're knocked down." }
    ]
  };
  var KRAKUL = {
    name: "Krakul the Lindworm", hp: 64, armor: 6, ferocity: 2,
    note: "He wants his eye. Hand it over and he spares you; the shrinking elixir or the spider can stop him too.",
    attacks: [
      { roll: 1, name: "Hissing Roar", damage: null, fear: true, dodge: false, text: "Everyone within 10 m suffers a fear attack." },
      { roll: 2, name: "Claw Attack", damage: "2D8", type: "slashing", dodge: true, text: "Talons rake you: 2D8 slashing." },
      { roll: 3, name: "Dorsal Spikes", damage: "2D4", type: "slashing", dodge: true, text: "He rolls over everything within 6 m: 2D4 slashing and you're knocked down." },
      { roll: 4, name: "Deadly Embrace", damage: "2D8", type: "bludgeoning", dodge: true, text: "His coils close: 2D8 bludgeoning now and again on each of your turns. No moving or acting except to break free (STR with a bane)." },
      { roll: 5, name: "Ravenous Bite", damage: "3D8", type: "slashing", dodge: true, parry: true, text: "Jaws wide as a door: 3D8 slashing. Can be parried." },
      { roll: 6, name: "Devouring Attack", damage: "2D6", type: "bludgeoning", dodge: true, text: "He swallows you whole: 2D6 bludgeoning. Inside you can attack him at armor 0 but take D6 (armor doesn't help) each turn; you're freed when he dies." }
    ]
  };
  var SKELETON = { name: "Skeleton Guard", hp: 8, armor: 6, weapons: [{ name: "Trident", skill: 12, damage: "D10" }], skills: { Awareness: 8, Evade: 6 } };

  var WINDOW = { label: "Jump from a window into the sea", skill: "Swimming", failDamage: "D6", damageType: "bludgeoning", done: "Leapt from a window into the sea", note: "A long drop to the waves. Fail the SWIMMING roll and you take D6 bludgeoning — but you're out." };

  var M = {
    id: "db-sinking-tower",
    system: "DB",
    title: "The Sinking Tower",
    blurb: "The quickstart one-shot, for one hero: seven floors of puzzles in a drowned tower that rises for two hours.",
    source: "The Sinking Tower — Dragonbane quickstart (Free League)",
    labels: { missions: "The adventure", route: "Floors", enter: "Row to the tower", place: "floor", threat: "Sinking clock", back: "Back to the start", escapes: "Get out" },
    intro: {
      title: "The Drowned Tower",
      text: "Once every twenty years, on the night Magdala died, the tower her grieving brother Kamandur raised for her breaks the surface of the sea. For two hours its green light burns again, the same light that once drew ships onto the rocks — and then the waves take it back. Treasure hunters row out on that night. Few come back with more than wet boots."
    },
    hub: {
      name: "How this plays solo",
      text: "A tournament one-shot for five, here for one hero. Talk, trick and puzzle your way past what you can: fights offer a lighter version for one, but the tower's master is no easier. Points come from treasure, floors found and each floor's challenge — see the Score card as you play. The two-hour clock is the Sinking clock: two full turns of it and the tower goes down."
    },
    allies: [],
    missions: [
      {
        id: "tower", title: "The Sinking Tower",
        briefing: "The fishers of the bay swear it happens tonight. You row out through the fog until the drowned tower looms from the swell, its crown burning a sickly green. Somewhere at the top, they say, an emerald the size of a fist is waiting — and the sea gives you two hours to reach it.",
        objective: "Claim what you can from the tower, deal with its secrets, and get out before it sinks.",
        startLog: "The rowboat bumps against the tower's foot.",
        hideRoute: true,
        routeNote: "Seven floors, from a drowned cellar to a glass observatory at the top.",
        challengeLabel: "What you can do",
        leave: false,
        actions: ["rest"],
        marks: 0,
        scoring: true,
        scoringNote: "Book scoring: 1 per treasure and per floor found, plus each floor's bonus; −1 if your hero dies.",
        tiebreak: "Tiebreak in the book: the most hit points left.",
        debrief: "End of the session: answer the advancement questions on your sheet as usual. Play it again to chase a higher score.",
        lostTitle: "Taken by the sea",
        lostText: "The water closes over the last window. The green light gutters out, and the tower slides back into the deep for another twenty years — with you inside it.",
        notes: [
          ["Scoring", "Points for every treasure and every floor found, plus bonuses for each floor's challenge. The Score card keeps count."],
          ["Solo", "Built for five heroes. Fights offer a lighter version for one hero; the clever way past is usually better."]
        ],
        threat: {
          text: "The tower stays above the waves for two hours — then it goes back under.",
          trigger: "The tower sinks.",
          inherent: true,
          onEnter: 1,
          howTo: "Each full clock is one hour. It moves when you first reach a floor, rest, finish a fight, or lose time to a failure.",
          stages: [
            { title: "The clock is ticking", text: "An hour gone. The tower lurches and settles a few metres deeper: the Statue Gallery is under water now.", button: "The gallery floods", fx: { flag: "sunk:statue-gallery" } },
            { title: "The tower sinks!", text: "Two hours. Stone grinds far below and the sea roars up the stairwell.", button: "Run!", reset: false, fx: { sink: true } }
          ]
        },
        sink: {
          title: "The tower sinks!",
          text: "One floor goes under now, then one more at the start of every round, from the bottom up. Get out: a window (Treasure Chamber or Laboratory), the observatory balcony, or a ship in a bottle.",
          order: ["statue-gallery", "library", "treasure", "laboratory", "sorcerer", "observatory"],
          drown: "Water fills the floor you're standing on. Anyone still inside drowns unless they get out."
        },
        reward: { text: "You bob in the cold swell, clutching what you carried out. Behind you the green light flickers, and the drowned tower settles back into the sea for another twenty years." },
        waypoints: [
          // ─────────────────────────────────────────── THE ROWBOAT
          {
            id: "rowboat", name: "The Rowboat Landing", short: "Rowboat",
            text: "Salt wind and the reek of kelp. At the tower's foot a second boat rocks on the swell. In it sits an old man in a brown robe, a black patch over one eye, holding up a little bottle of green liquid. He wants, he says, only one thing from the tower: the green emerald at its top, stolen from him long ago. Bring it to him and he'll give you this — an elixir of life. Everything else you find is yours.",
            challenges: [
              { id: "study", label: "Study the old man", skill: "Awareness", note: "Suggested: is he what he seems?",
                success: "His one eye has a slit pupil, like a snake's, and the boat rides oddly low for one old man. He is not what he seems.", onSuccess: { reveal: ["serpent"] },
                failure: "Just a strange old man in a boat." },
              { id: "accept", label: "Accept the elixir — promise him the emerald", choice: true, button: "Accept", noCheck: true, hideIf: ["promised", "refused"],
                success: "He presses the bottle into your hand. \"The green stone. Only that.\" Then he says nothing more.",
                onSuccess: { flag: "promised", item: { name: "Elixir of Life", note: "One dose. At 0 HP you recover automatically and stop making death rolls (no help against instantly fatal wounds)." } } },
              { id: "refuse", label: "Refuse the bargain", choice: true, button: "Refuse", noCheck: true, hideIf: ["promised", "refused"],
                success: "He lowers the bottle and stares at the tower, silent.", onSuccess: { flag: "refused" } },
              { id: "climb4", label: "Climb the outside to a window on the fourth floor", skill: "Acrobatics", bane: true, repeat: true,
                note: "Solo shortcut: one roll with a bane stands in for the book's roll per floor. A fall drops you in the sea — no damage, but mark a condition.",
                success: "Hand over hand up the weed-slick stones, and in through a window.", onSuccess: { goto: "treasure" },
                failure: "Your grip goes and you plunge into the sea. Mark a condition of your choice on your sheet.", onFail: { threat: 1 } },
              { id: "climb5", label: "Climb the outside to a window on the fifth floor", skill: "Acrobatics", bane: true, repeat: true,
                note: "As above, but higher.",
                success: "A long, cold climb — and in through a cracked window.", onSuccess: { goto: "laboratory" },
                failure: "Your grip goes and you plunge into the sea. Mark a condition of your choice on your sheet.", onFail: { threat: 1 } }
            ],
            secrets: [{ id: "serpent", text: "Whatever the old man is, he isn't human. Bargains with such things tend to matter later." }],
            exits: [{ to: "statue-gallery", label: "Through the front door", main: true, swim: true }],
            escapes: [{ label: "Row back to shore", button: "Row away", done: "You rowed away from the tower", note: "Ends the adventure and tallies your score." }]
          },
          // ─────────────────────────────────────────── 1. STATUE GALLERY
          {
            id: "statue-gallery", name: "1. Statue Gallery", short: "Gallery", floor: true,
            text: "The door groans open on a once-grand hall, ankle-deep in seawater. Rotting weed hangs over a mural of a cottage by the sea and two children at play. Two tall statues stand in the middle: to the west a man with his right index finger raised; to the east a woman, her left hand on her chest, the middle and ring fingers stretched out. A great hand is carved into the floor between them, and six copper plates, each a metre across, glint under the water. At the far end, steps lead down into black water.",
            flagNotes: { "sunk:statue-gallery": "The tower has settled: this hall is under water now. You can still swim through it, holding your breath." },
            challenges: [
              { id: "look", label: "Look closer at the copper plates", skill: "Spot Hidden",
                success: "They give a little underfoot — pressure plates, wired to something in the ceiling.", onSuccess: { reveal: ["plates"] },
                failure: "Copper, green with age. That's all you can tell." },
              { id: "plates", label: "Press the copper plates", hideIf: "stair-3", note: "Choose how many plates you press at once.",
                options: [
                  { id: "one", label: "Press one plate", repeat: true, fx: { damage: "D6", ignoreArmor: true, flag: "plates-wrong", say: "Lightning cracks from the ceiling and arcs through the water. D6 damage — armor doesn't help." } },
                  { id: "two", label: "Press two at the same moment", firstTry: { n: 1, label: "Copper plates solved on the first attempt" }, fx: { flag: "stair-3", say: "A low rumble. In the south-west corner, stone steps fold out of the wall and climb toward the floor above." } },
                  { id: "many", label: "Press three or more", repeat: true, fx: { damage: "D6", ignoreArmor: true, flag: "plates-wrong", say: "Lightning cracks from the ceiling and arcs through the water. D6 damage — armor doesn't help." } }
                ] }
            ],
            secrets: [{ id: "plates", text: "The six plates are pressure plates wired to the ceiling. Something happens when they're pressed." }],
            exits: [
              { to: "cellar", label: "Dive down the steps into the drowned cellar", swim: true },
              { to: "library", label: "Climb the stair in the south-west corner", requires: "stair-3", locked: "No way up yet", main: true },
              { to: "rowboat", label: "Back out to the rowboat", hideIf: "sunk:statue-gallery" }
            ],
            escapes: [{ label: "Swim out through the front door", skill: "Swimming", requires: "sunk:statue-gallery", failDamage: "D6", damageType: "drowning", done: "Swam out of the flooded gallery to the rowboat", note: "The hall is under water. Fail and you swallow the sea (D6) — but you reach the boat." }]
          },
          // ─────────────────────────────────────────── 2. CELLAR
          {
            id: "cellar", name: "2. Cellar", short: "Cellar", floor: true,
            text: "Cold, murky water swallows you. Through the gloom you make out an old storeroom: a dozen rotten figureheads leering in the north-west corner (swim close and you roll WIL or become Scared), twenty broken barrels in the south-east, and on the floor a great carved eye staring up at you. In the south-west wall a gap opens on darkness — and the ribs of a wrecked ship.",
            everyRoll: { attr: "CON", label: "Hold your breath", note: "Under water: roll CON before every action here (it isn't an action). Failure: D6 drowning damage, armor doesn't help.", onFail: { damage: "D6", ignoreArmor: true } },
            onEnter: { encounter: "eel", say: "Something longer than a rowboat uncoils from the south-west corner and comes at you, jaws wide." },
            challenges: [
              { id: "barrels", label: "Search the broken barrels", skill: "Spot Hidden",
                success: "Wedged between two staves: something worth keeping.", onSuccess: { treasure: 1 },
                failure: "Rot and silt.", onFail: { threat: 1 } },
              { id: "gap", label: "Swim through the gap toward the wreck", skill: "Swimming", repeat: true, hideIf: "wreck-near",
                success: "You kick through the gap. The wreck lies just beyond.", onSuccess: { flag: "wreck-near" },
                failure: "The current shoves you back against the wall.", onFail: { threat: 1 } },
              { id: "wreck", label: "Get inside the wreck", skill: "Swimming", repeat: true, requires: "wreck-near", hideIf: "wreck",
                success: "You squeeze through a split in the hull. On the stern, in flaking paint: the Blue Medusa. Its hold still holds a few things.", onSuccess: { flag: "wreck", score: { n: 1, label: "Found the wreck" }, treasure: 2 },
                failure: "Splintered planks block the way; you'll have to try again.", onFail: { threat: 1 } },
              { id: "orvild", label: "Bring Orvild home to the Blue Medusa", choice: true, button: "Show him", requires: ["orvild", "wreck"], hideIf: "orvild-done", noCheck: true,
                success: "The ghost boy drifts to the wreck and lays a hand on her rail. He smiles at you — and fades, for good.", onSuccess: { flag: "orvild-done", score: { n: 2, label: "Helped Orvild to the wreck" } } }
            ],
            encounters: [
              { id: "eel", label: "Monster eel", hidden: true, underwater: true, time: 1, note: "Under water: hold your breath each round, melee at a bane.", onWin: { score: { n: 1, label: "Defeated the monster eel" } },
                foes: [{ monster: EEL, count: 1, solo: 1 }] }
            ],
            exits: [{ to: "statue-gallery", label: "Swim back up to the gallery", main: true, swim: true }]
          },
          // ─────────────────────────────────────────── 3. LIBRARY
          {
            id: "library", name: "3. Library", short: "Library", floor: true,
            text: "Shelves of swollen leather books rise to the ceiling, packed so close they make a cramped little maze that smells of mould. From somewhere in the middle comes the scratch of a quill: a ghostly old man hunched over a desk, writing. Three stone pedestals each hold a single book — one marked with a sword, one with a cross, one with an eye. A ship is carved into the floor at the centre of the room.",
            everyRoll: { skill: "Sneaking", label: "Keep quiet", note: "The librarian's ghost hushes every sound. Roll SNEAKING before each action here: the first failure brings a fear attack, the second makes him attack.",
              unless: ["won:ghost", "ghost-gone"],
              onFail: { ifFlag: "shushed", then: { encounter: "ghost", say: "\"SILENCE!\" The quill stops. All around you, books lift from the shelves." },
                else: { flag: "shushed", fear: true, say: "A furious, echoing SHHHH! fills the maze. (Make the fear roll on your sheet.)" } } },
            challenges: [
              { id: "read", label: "Leaf through one of the books", skill: "Languages",
                success: "Every volume is the same book: The Life and Untimely Death of Magdala, by Kamandur, with the help of one Arlidus. Page after page of grief for his sister, and curses on the pirates who caused her death.",
                failure: "The faded script swims before your eyes." },
              { id: "books", label: "Take a book from a pedestal", hideIf: "door-e",
                options: [
                  { id: "sword", label: "The sword book", fx: { flag: ["door-n", "books-wrong"], say: "A click from the north wall: a hidden door swings ajar." } },
                  { id: "cross", label: "The cross book", fx: { flag: ["door-s", "books-wrong"], encounter: "ghost", say: "A click from the south wall — and the scratching of the quill stops dead." } },
                  { id: "eye", label: "The eye book", firstTry: { n: 1, label: "Book puzzle solved on the first attempt" }, fx: { flag: "door-e", say: "A click from the east wall: a hidden door opens on a narrow stair. The ghost writes on, undisturbed." } }
                ] },
              { id: "walls", label: "Search the walls for hidden doors", skill: "Spot Hidden",
                success: "Three seams in the panelling: hidden doors to the north, south and east.", onSuccess: { reveal: ["doors"] },
                failure: "Just shelves and more shelves." },
              { id: "pry-n", label: "Pry open the north door", skill: "Sleight of Hand", bane: true, requires: "doors", hideIf: "door-n", repeat: true,
                success: "It creaks open on a little alcove.", onSuccess: { flag: "door-n" }, failure: "It won't give." },
              { id: "pry-s", label: "Pry open the south door", skill: "Sleight of Hand", bane: true, requires: "doors", hideIf: "door-s", repeat: true,
                success: "It creaks open on a little alcove.", onSuccess: { flag: "door-s" }, failure: "It won't give." },
              { id: "pry-e", label: "Pry open the east door", skill: "Sleight of Hand", bane: true, requires: "doors", hideIf: "door-e", repeat: true,
                success: "It opens on a narrow stair leading up.", onSuccess: { flag: "door-e" }, failure: "It won't give." },
              { id: "room-n", label: "Search the north alcove", choice: true, button: "Search", requires: "door-n", hideIf: "looted-n",
                success: "Behind a stack of mouldering ledgers…", onSuccess: { flag: "looted-n", treasure: 1 } },
              { id: "room-s", label: "Search the south alcove", choice: true, button: "Search", requires: "door-s", hideIf: "looted-s",
                success: "Under a fallen shelf…", onSuccess: { flag: "looted-s", treasure: 1 } }
            ],
            secrets: [{ id: "doors", text: "Hidden doors to the north, south and east. Pry them open (SLEIGHT OF HAND with a bane) — or find what opens them." }],
            encounters: [
              { id: "ghost", label: "The librarian's ghost", hidden: true, time: 1,
                note: "Only magic and fire hurt him. Spend a turn silent and still and he goes back to his writing.",
                onStart: { flag: "ghost-fought" }, onWin: { score: { n: 1, label: "Defeated the librarian's ghost" }, flag: "ghost-gone" },
                endable: { label: "Stand silent and still", note: "Spend your turn motionless and quiet: he returns to his desk (no points).", fx: { unflag: "shushed", say: "You freeze. After a long moment the ghost drifts back to his desk, and the quill begins to scratch again." } },
                foes: [{ monster: GHOST, count: 1, solo: 1 }] }
            ],
            exits: [
              { to: "statue-gallery", label: "Down the stair to the gallery", swim: true },
              { to: "treasure", label: "Through the east door and up", requires: "door-e", locked: "Find the way on", main: true,
                fx: { ifFlag: ["!ghost-fought", "!ghost-pass"], then: { flag: "ghost-pass", score: { n: 2, label: "Got past the ghost without a fight" } } } }
            ]
          },
          // ─────────────────────────────────────────── 4. TREASURE CHAMBER
          {
            id: "treasure", name: "4. Treasure Chamber", short: "Treasure", floor: true,
            text: "Ten wooden chests fan out across the hall, five down each side, the nearest pair close to the north wall. Five suits of sea-green plate armour stand along the walls with tridents in their fists, yellowed skulls grinning through the visors. A faded mural on the north wall shows two figures floating hand in hand off a beach. A sun is carved into the floor.",
            blockIf: "in-sea", blockNote: "You're in the sea below the tower.",
            challenges: [
              { id: "chests", label: "Open a chest", hideIf: "in-sea", note: "Counted from the north wall. Touching any chest may wake the guards.",
                options: [
                  { id: "w1", label: "West 1", fx: wrongChest() }, { id: "w2", label: "West 2", fx: rightChest() },
                  { id: "w3", label: "West 3", fx: wrongChest() }, { id: "w4", label: "West 4", fx: wrongChest() }, { id: "w5", label: "West 5", fx: wrongChest() },
                  { id: "e1", label: "East 1", fx: wrongChest() }, { id: "e2", label: "East 2", fx: wrongChest() },
                  { id: "e3", label: "East 3", fx: rightChest() }, { id: "e4", label: "East 4", fx: rightChest() }, { id: "e5", label: "East 5", fx: wrongChest() }
                ] },
              { id: "swim-back", label: "Swim back and climb up to the Treasure Chamber", skill: "Swimming", repeat: true, unblock: true, requires: "in-sea",
                note: "SWIMMING to reach the tower, then a dash up each floor. The clock moves.",
                success: "You haul yourself out onto the rocks and run back up the stairs.",
                onSuccess: { unflag: "in-sea", threat: 1, ifFlag: ["skel-awake", "!won:skeletons"], then: { encounter: "skeletons", say: "The skeleton guards are waiting for you, tridents levelled." } },
                failure: "The swell drags you away from the rocks." },
              { id: "voice", label: "Follow the muffled voice under one of the chests", choice: true, button: "Investigate", requires: "won:skeletons", hideIf: "alberic-found", noCheck: true,
                success: "Someone is shouting from beneath an unopened chest. You spring its trapdoor from a safe distance: hanging in the shaft below, clinging to the wall, is a battered adventurer — Alberic Gleamheart.",
                onSuccess: { flag: "alberic-found" } },
              { id: "pull", label: "Pull Alberic up", skill: "Acrobatics", requires: "alberic-found", hideIf: "alberic-saved", repeat: true, note: "Have a rope? Use it instead — no roll.",
                success: "You drag him over the lip. Grateful, he presses a trinket on you and climbs down to wait in the rowboat.",
                onSuccess: { flag: "alberic-saved", score: { n: 1, label: "Saved Alberic Gleamheart" }, treasure: 1 },
                failure: "He slips back down. Try again." },
              { id: "rope", label: "Lower a rope to Alberic", choice: true, button: "Use a rope", requires: "alberic-found", hideIf: "alberic-saved", noCheck: true,
                success: "He climbs up hand over hand, presses a trinket on you in thanks, and heads down to the rowboat.",
                onSuccess: { flag: "alberic-saved", score: { n: 1, label: "Saved Alberic Gleamheart" }, treasure: 1 } }
            ],
            encounters: [
              { id: "skeletons", label: "Skeleton guards", hidden: true, time: 1, note: "Plate armour (6), tridents.", onWin: { score: { n: 1, label: "Defeated the skeleton guards" } },
                foes: [{ npc: SKELETON, name: "Skeleton Guard", count: 5, solo: 2, role: "melee" }] }
            ],
            exits: [
              { to: "library", label: "Down to the library", hideIf: "in-sea" },
              { to: "laboratory", label: "Up the stair in the south wall", requires: "stair-5", locked: "No way up yet", main: true, hideIf: "in-sea" }
            ],
            escapes: [Object.assign({ hideIf: "in-sea" }, WINDOW)]
          },
          // ─────────────────────────────────────────── 5. LABORATORY
          {
            id: "laboratory", name: "5. Laboratory", short: "Laboratory", floor: true,
            text: "Broken glass crunches underfoot between workbenches heaped with the leftovers of old experiments: jars, bottles, a ship in a bottle on a shelf, a clear red potion. In the middle stands a tall arched iron cage — and from the dark inside it, someone is watching you.",
            challenges: [
              { id: "talk", label: "Talk to the prisoner", choice: true, button: "Talk", hideIf: "met-betrix",
                success: "\"Captain Betrix Farsail, at your service — if you'd only lift this cage.\" She threatens, then flatters, then offers a share of treasure she plainly doesn't have.",
                onSuccess: { flag: "met-betrix" } },
              { id: "cage", label: "Lift the iron cage", attr: "STR", bane: true, repeat: true, hideIf: "betrix",
                success: "With a groan of iron the cage comes up. Betrix rolls free, thanks you, and makes for the rowboat. Where the cage stood, a lindworm is carved into the floor.",
                onSuccess: { flag: "betrix", reveal: ["lindworm"], score: { n: 1, label: "Saved Betrix Farsail" } },
                failure: "It doesn't budge." },
              { id: "benches", label: "Search the workbenches", skill: "Spot Hidden",
                success: "Under a cracked mortar: a stained parchment covered in an old, cramped hand.", onSuccess: { reveal: ["recipe"] },
                failure: "Glass, dust and things best left alone." },
              { id: "recipe", label: "Read the parchment", skill: "Languages", requires: "recipe",
                success: "A recipe — for shrinking things. Living things.", failure: "The writing is too faded to follow." },
              { id: "magic", label: "Work out how the shrinking breaks", best: ["Myths & Legends", "Elementalism"], requires: "recipe",
                success: "Water. A shrunken thing touched by water grows back to its true size.", onSuccess: { flag: "knows-water" },
                failure: "The theory escapes you." },
              { id: "jar", label: "Take the jar with the black, hairy spider", choice: true, button: "Take it", hideIf: "spider", noCheck: true,
                success: "Inside, a spider the size of your thumb watches you with too many eyes.",
                onSuccess: { flag: "spider", item: { name: "Jar with a shrunken spider", note: "A giant spider, shrunk. Smash the jar and splash it with water: it grows and attacks the nearest threat." } } },
              { id: "bottle", label: "Take the ship in a bottle from its shelf", choice: true, button: "Take it", hideIf: "ship", noCheck: true,
                success: "As it leaves the shelf, a stair folds down from the ceiling.",
                onSuccess: { flag: ["ship", "stair-6"], item: { name: "Ship in a bottle", note: "A real ship, shrunk. Water restores it to full size." } } },
              { id: "potion", label: "Take the clear red potion", choice: true, button: "Take it", hideIf: "elixir", noCheck: true,
                success: "A mage would feel the magic humming in it.",
                onSuccess: { flag: "elixir", item: { name: "Shrinking elixir", note: "The drinker shrinks to 10 cm (boon on SNEAKING, at most 1 damage per attack) until touched by water or DISPEL. Thrown into a mouth, it works on the swallower." } } }
            ],
            secrets: [
              { id: "lindworm", text: "A lindworm is carved into the floor where the cage stood." },
              { id: "recipe", text: "A stained parchment from the workbench: an old hand, a strange formula." }
            ],
            exits: [
              { to: "treasure", label: "Down to the Treasure Chamber" },
              { to: "sorcerer", label: "Up the stair from the ceiling", requires: "stair-6", locked: "No way up yet", main: true }
            ],
            escapes: [WINDOW]
          },
          // ─────────────────────────────────────────── 6. SORCERER'S CHAMBER
          {
            id: "sorcerer", name: "6. Sorcerer's Chamber", short: "Sorcerer", floor: true,
            text: "Heavy drapes smother every window and the room sits in gloom. A great four-poster bed, curtains drawn, stands against the north wall. In each corner squats a huge carved figurehead — a beast with grinning jaws.",
            challenges: [
              { id: "drapes", label: "Pull aside a drape", hideIf: "stair-7", note: "Each takes an action. Touching a drape, the bed or a figurehead may wake them.",
                options: ["North", "East", "South", "West"].map(function (side, i) {
                  return { id: side.toLowerCase(), label: side + " drape", text: ["Behind it, a mural: a young man kneeling by a young woman's body.", "Behind it, a mural: a cottage by the sea, burning.", "Behind it, a mural: a ship sailing away over the horizon.", "Behind it, a mural: a tower rising from the waves."][i],
                    fx: { count: { key: "drapes", at: 4, fx: { flag: "stair-7", say: "With the last drape down, grey daylight floods the room — and a stair lowers from the ceiling." } }, ifFlag: ["!won:figureheads", "!fh-awake"], then: { flag: "fh-awake", encounter: "figureheads", say: "Daylight falls on the nearest figurehead and it stiffens, lifeless wood. The other three creak, turn their heads — and roar." } } };
                }) },
              { id: "bed", label: "Draw back the bed curtains", choice: true, button: "Look", hideIf: "corpse",
                success: "On the bed lies a waxy corpse with folded hands: Kamandur himself.",
                onSuccess: { reveal: ["corpse"], flag: "corpse", ifFlag: ["!won:figureheads", "!fh-awake"], then: { flag: "fh-awake", encounter: "figureheads" } } },
              { id: "search", label: "Search Kamandur's body", choice: true, button: "Search", requires: "corpse", hideIf: "looted-k",
                success: "Something glints between his folded hands.", onSuccess: { flag: "looted-k", treasure: 1 } }
            ],
            secrets: [{ id: "corpse", text: "Kamandur's body lies on the bed, preserved like wax." }],
            encounters: [
              { id: "figureheads", label: "Enchanted figureheads", hidden: true, time: 1, reduceBy: "drapes",
                note: "Each drape pulled freezes one. Fire deals double damage.",
                combatActions: [
                  { id: "drape", label: "Pull aside a drape (your action)", max: 4, hideIf: "stair-7", freezeFoe: true, freezeWord: "freezes in the daylight",
                    fx: { count: { key: "drapes", at: 4, fx: { flag: "stair-7", say: "With the last drape down, grey daylight floods the room — and a stair lowers from the ceiling." } } } },
                  { id: "spider", label: "Smash the spider jar on a figurehead", requires: "spider", max: 1, freezeFoe: true, scoreFoe: true, freezeWord: "is torn apart by the giant spider — and the spider with it",
                    note: "The book: the spider and one figurehead destroy each other, no rolls.", fx: { unflag: "spider" } }
                ],
                foes: [{ monster: FIGUREHEAD, count: 4, solo: 2, scoreEach: { n: 1, label: "Figurehead defeated" } }] }
            ],
            exits: [
              { to: "laboratory", label: "Down to the laboratory" },
              { to: "observatory", label: "Up the stair to the top", requires: "stair-7", locked: "No way up yet", main: true }
            ]
          },
          // ─────────────────────────────────────────── 7. OBSERVATORY
          {
            id: "observatory", name: "7. Observatory", short: "Observatory", floor: true,
            text: "A vast glass dome crowns the tower, drenched in green light, with grey sea on every side beyond a railed balcony. On a stone podium rest two identical, blazing emeralds. A black stone sarcophagus lies at the north end. And somewhere, a boy is crying.",
            challenges: [
              { id: "boy", label: "Kneel and speak gently to the crying boy", choice: true, button: "Speak to him", hideIf: "orvild", noCheck: true,
                success: "He is a ghost — Orvild, cabin boy of the Blue Medusa. He drowned when she struck the rocks, and he has never found his way back to her.",
                onSuccess: { flag: "orvild" } },
              { id: "stones", label: "Lift a stone from the podium", hideIf: "emerald",
                options: [
                  { id: "west", label: "The west stone", hideIf: "demon-stone", fx: { flag: "demon-stone", sink: true, say: "Under it, a demon is carved into the podium. Click. Far below, something gives — and the whole tower lurches and begins to slide into the sea." } },
                  { id: "east", label: "The east stone", firstTry: { n: 1, label: "Twin stones solved on the first attempt" },
                    fx: { flag: "emerald", item: { name: "Krakul's emerald", note: "The lindworm's stolen eye." },
                      say: "Under it, a lindworm is carved into the podium. The tower shudders. Beyond the glass a vast shadow rises from the sea: a lindworm, one eye socket empty — and the old man's voice in your head." } }
                ] },
              { id: "give", label: "Hand Krakul his eye, as promised", choice: true, button: "Give it", requires: ["emerald", "promised"], hideIf: "krakul-done", noCheck: true,
                success: "He takes the emerald gently in his jaws. \"As promised.\" He dips his great head to you — and dives beneath the waves.",
                onSuccess: { flag: "krakul-done", score: { n: 3, label: "Gave the emerald to Krakul" } } },
              { id: "throw", label: "Throw Krakul the emerald to save your skin", choice: true, button: "Give it up", requires: ["emerald", "!promised"], hideIf: "krakul-done", noCheck: true,
                success: "He snatches it from the air, considers you with his one good eye, and lets you live.",
                onSuccess: { flag: "krakul-done", score: { n: 3, label: "Gave the emerald to Krakul" } } },
              { id: "shrink", label: "Hurl the shrinking elixir into his mouth", best: ["Knives", "Slings", "Bows", "Crossbows", "Spears", "Staves"], bane: true, requires: ["elixir", "emerald"], hideIf: "krakul-done",
                note: "The book: an AGL weapon skill, with a bane.",
                success: "It goes straight down his throat. With a squeal he dwindles to a little snake — until he next touches water.", onSuccess: { flag: "krakul-done", unflag: "elixir" },
                failure: "It shatters on his scales.", onFail: { unflag: "elixir" } },
              { id: "spider", label: "Smash the spider jar at Krakul", choice: true, button: "Smash it", requires: ["spider", "emerald"], hideIf: ["krakul-done", "krakul-busy"],
                success: "The giant spider swells to full size and leaps on the lindworm. They thrash across the dome — that will keep him busy for a while.",
                onSuccess: { flag: "krakul-busy", unflag: "spider" } },
              { id: "lid", label: "Lift the sarcophagus lid", attr: "STR", bane: true, repeat: true, hideIf: "lid",
                success: "Magdala's likeness is carved on the lid. As it grinds aside, a severed skeletal hand flops out onto the floor.", onSuccess: { flag: "lid" },
                failure: "It's far too heavy." },
              { id: "bones", label: "Reach in among her bones", choice: true, button: "Reach in", requires: "lid", hideIf: "manacled-once",
                success: "Your fingers close on something — and iron snaps shut around your wrist. Far below, the tower lurches.",
                onSuccess: { flag: ["manacled", "manacled-once"], treasure: 1, sink: true } },
              { id: "manacle", label: "Break the manacle", choice: true, button: "It's broken", requires: "manacled", noCheck: true,
                note: "Armor 10; it breaks after 20 slashing or bludgeoning damage. Roll your weapon damage on the sheet until you've done it.",
                success: "The iron cracks and falls away.", onSuccess: { unflag: "manacled" } }
            ],
            encounters: [
              { id: "krakul", label: "Krakul the lindworm", requires: ["emerald", "!promised"], unless: ["krakul-done", "krakul-busy"], time: 1,
                note: "He goes for whoever carries the emerald, but spares anyone who hands it over.",
                onWin: { flag: "krakul-done", score: { n: 4, label: "Defeated Krakul" } },
                foes: [{ monster: KRAKUL, count: 1, solo: 1 }] }
            ],
            exits: [{ to: "sorcerer", label: "Down to the sorcerer's chamber" }],
            escapes: [
              { label: "Jump from the balcony into the sea", skill: "Swimming", failDamage: "D6", damageType: "bludgeoning", hideIf: "manacled", done: "Jumped from the observatory balcony", note: "Fail the SWIMMING roll and the fall deals D6 bludgeoning — but you're out." },
              { label: "Throw the ship in a bottle into the sea and climb aboard", requires: "ship", hideIf: "manacled", button: "Set sail", done: "Sailed away on Kamandur's shrunken ship, restored by the sea", note: "Water restores it to full size. Jump down to it." }
            ]
          }
        ]
      }
    ]
  };

  function rightChest() {
    return { treasure: 1, count: [{ key: "chests", at: 2, fx: { flag: "stair-5", say: "Somewhere in the south wall, stone grinds on stone: a stair unfolds toward the floor above." } },
      { key: "chests", at: 3, fx: { ifFlag: "!chest-wrong", then: { score: { n: 1, label: "Chest puzzle solved on the first attempt" } } } }],
      ifFlag: ["!won:skeletons", "!skel-awake"], then: { flag: "skel-awake", encounter: "skeletons", say: "Armour grinds. The five guards turn their skulls toward you and raise their tridents." } };
  }
  function wrongChest() {
    return { flag: ["chest-wrong", "in-sea"], say: "The floor beside the chest drops away. You slide down a slick chute and plunge into the cold sea below the tower. Mark a condition of your choice on your sheet.",
      ifFlag: ["!won:skeletons", "!skel-awake"], then: { flag: "skel-awake", show: "skeletons" } };
  }

  (W.DB_SOLO_MODULES = W.DB_SOLO_MODULES || []).push(M);
})();
