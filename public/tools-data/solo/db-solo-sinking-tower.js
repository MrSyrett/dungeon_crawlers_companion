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
    note: "Hard, old ship's wood. It shrinks from the daylight at the window.",
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
    note: "He wants his eye. He'll spare whoever hands it over.",
    attacks: [
      { roll: 1, name: "Hissing Roar", damage: null, fear: true, dodge: false, text: "Everyone within 10 m suffers a fear attack." },
      { roll: 2, name: "Claw Attack", damage: "2D8", type: "slashing", dodge: true, text: "Talons rake you: 2D8 slashing." },
      { roll: 3, name: "Dorsal Spikes", damage: "2D4", type: "slashing", dodge: true, text: "He rolls over everything within 6 m: 2D4 slashing and you're knocked down." },
      { roll: 4, name: "Deadly Embrace", damage: "2D8", type: "bludgeoning", dodge: true, text: "His coils close: 2D8 bludgeoning now and again on each of your turns. No moving or acting except to break free (STR with a bane)." },
      { roll: 5, name: "Ravenous Bite", damage: "3D8", type: "slashing", dodge: true, parry: true, text: "Jaws wide as a door: 3D8 slashing. Can be parried." },
      { roll: 6, name: "Devouring Attack", damage: "2D6", type: "bludgeoning", dodge: true, text: "He swallows you whole: 2D6 bludgeoning. Inside you can attack him at armor 0 but take D6 (armor doesn't help) each turn; you're freed when he dies." }
    ]
  };
  var SKELETON = { name: "Skeleton Guard", hp: 8, armor: 6, fearless: true, weapons: [{ name: "Trident", skill: 12, damage: "D10" }], skills: { Awareness: 8, Evade: 6 } };

  // The book draws treasure cards; this is our own sea-wreck table, drawn without repeats.
  var TREASURES = [
    { name: "Purse of tarnished silver", coins: "3D10 silver" },
    { name: "Drowned sailor's purse", coins: "2D6 gold" },
    { name: "Fistful of foreign coins", coins: "4D6 silver", note: "From a dozen kingdoms, green with sea-rot" },
    { name: "Pearl necklace", value: "8 gold" },
    { name: "Black pearl", value: "12 gold" },
    { name: "Coral-and-silver brooch", value: "3 gold" },
    { name: "Sapphire", value: "20 gold" },
    { name: "Gold signet ring", value: "6 gold", note: "A pirate captain's crest" },
    { name: "Silver goblet", value: "4 gold" },
    { name: "Jade sea-serpent figurine", value: "10 gold" },
    { name: "Ivory scrimshaw tusk", value: "4 gold", note: "Carved with a ship going down" },
    { name: "Captain's spyglass", value: "5 gold", note: "Brass, still sound" },
    { name: "Silver compass", value: "4 gold" },
    { name: "Amber pendant", value: "3 gold", note: "A tiny fish trapped inside" },
    { name: "Gilded holy symbol", value: "6 gold" },
    { name: "Jewelled dagger", value: "15 gold", note: "A real dagger under the gems" },
    { name: "Rolled sea chart in an oilskin", value: "3 gold", note: "The old coast, before the tower" },
    { name: "Etched silver ring", value: "15 gold", note: "Faint runes of wind and water" },
    { name: "Embroidered silk sash", value: "2 gold" },
    { name: "Crown of beaten gold", value: "40 gold", note: "Bent, but gold all the same" }
  ];

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
    treasures: TREASURES,
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
        companions: {
          alberic: { name: "Alberic Gleamheart", hp: 14, armor: 0, weapon: { name: "Dagger", skill: 12, damage: "D8" }, helps: ["Awareness", "Spot Hidden", "Sneaking", "Persuasion", "Bluffing"], note: "A dwarf treasure hunter. Dagger 12 (D8). Helps with Awareness, Spot Hidden, Sneaking and talking." },
          betrix: { name: "Betrix Farsail", hp: 12, armor: 0, weapon: { name: "Scimitar", skill: 12, damage: "2D6" }, helps: ["Acrobatics", "Swimming", "Sleight of Hand", "Spot Hidden", "Crafting"], note: "A sea captain. Scimitar 12 (2D6). Helps with Acrobatics, Swimming, Sleight of Hand and Spot Hidden." }
        },
        // Hints only point back at what you've already learned (clues are flags "clue:<id>").
        hints: [
          { at: "statue-gallery", unless: ["seen-sw", "seen-se", "seen-plates"], text: "You haven't looked closely at anything yet. Statues, a mural, something under the water — start with what you can see." },
          { at: "statue-gallery", requires: ["seen-plates"], unless: ["stair-3"], text: "Six plates and a sorcerer who did everything for two people. What would two people press?" },
          { at: "statue-gallery", requires: ["clue:two", "seen-plates"], unless: ["stair-3"], text: "Pairs. Everything in this tower comes in pairs." },
          { at: "cellar", unless: ["cellar-known"], text: "You can't see a thing down here. Feel your way around before anything else." },
          { at: "library", unless: ["seen-pedestals", "door-e"], text: "Something in here hates noise. The pedestals and the doors are deeper in the maze — and every move is a risk." },
          { at: "library", requires: ["seen-pedestals", "clue:eye"], unless: ["door-e"], text: "You saw an eye carved below the hand in the cellar. One of these books has an eye on it." },
          { at: "library", requires: ["seen-pedestals"], unless: ["door-e", "clue:eye"], text: "Three books, three symbols. Was anything like them carved somewhere below?" },
          { at: "treasure", unless: ["seen-chests", "stair-5"], text: "Before you touch anything, look at how the chests are laid out." },
          { at: "treasure", requires: ["clue:chests", "clue:statue-w", "clue:statue-e"], unless: ["stair-5"], text: "Two hands of chests, west and east. Two statues downstairs — the man on the west, the woman on the east — each holding up certain fingers. Count from the thumbs." },
          { at: "treasure", requires: ["clue:chests"], unless: ["stair-5", "clue:statue-w"], text: "Two hands of five. Did anyone in this tower hold their fingers in a particular way?" },
          { at: "laboratory", unless: ["seen-shelves"], text: "So much broken glass — but not all of it is broken. Look along the shelves." },
          { at: "laboratory", requires: ["seen-shelves"], unless: ["ship"], text: "The library floor had a ship carved into it, two floors below this one." },
          { at: "sorcerer", unless: ["stair-7"], text: "The room is smothered in darkness. What would happen if you let the daylight in?" },
          { at: "observatory", requires: ["clue:lindworm"], unless: ["emerald", "demon-stone"], text: "A lindworm was carved into the floor two storeys down. Which stone would that point to?" },
          { at: "observatory", unless: ["emerald", "demon-stone", "clue:lindworm"], text: "Two identical stones. Something two floors down would tell them apart — or you could risk a peek." },
          { at: "observatory", requires: ["emerald", "!promised", "!krakul-done"], text: "He wants his eye. He'll spare whoever gives it back — or something you carry might keep him busy." }
        ],
        epilogue: [
          { requires: "krakul-done", unless: "won:krakul", text: "Far out in the bay, something vast rolls in the swell — and for the first time in years, it looks back at the shore with two eyes." },
          { requires: "won:krakul", text: "Krakul's body sinks with the tower. The fishers will sing about whoever slew the lindworm of the bay for a long time." },
          { requires: ["emerald", "!krakul-done"], text: "The emerald glows in your pack all the way home. Some nights you'd swear you hear hissing out on the water." },
          { requires: "orvild-done", text: "On calm nights, the fishers say, you can see a small figure on the deck of a wreck beneath the waves, smiling." },
          { requires: "alberic-saved", text: "Alberic Gleamheart tells the story of his rescue in every tavern on the coast, and it grows a little each time." },
          { requires: "betrix", text: "Captain Betrix Farsail owes you a favour. She is not the kind to forget it — for better or worse." },
          { requires: "ghost-pass", text: "Somewhere under the sea, a ghostly scribe writes on, never knowing you passed by." }
        ],
        discoveries: [
          { flag: "stair-3", label: "The copper plates opened the stair" },
          { flag: "wreck", label: "Found the wreck of the Blue Medusa" },
          { flag: "clue:serpent", label: "Saw through the one-eyed man" },
          { flag: "door-e", label: "The eye book opened the way up" },
          { flag: "looted-n", label: "Searched the library's north alcove" },
          { flag: "looted-s", label: "Searched the library's south alcove" },
          { flag: "stair-5", label: "Solved the chests" },
          { flag: "alberic-saved", label: "Rescued Alberic Gleamheart" },
          { flag: "betrix", label: "Freed Betrix Farsail" },
          { flag: "knows-water", label: "Learned how the shrinking breaks" },
          { flag: "looted-k", label: "Found what Kamandur took to his grave" },
          { flag: "orvild-done", label: "Brought Orvild home" },
          { flag: "emerald", label: "Claimed the lindworm's eye" },
          { flag: "lid", label: "Opened Magdala's sarcophagus" }
        ],
        achievements: [
          { id: "st-silent", label: "Not a Sound", desc: "Got past the librarian's ghost without a fight.", requires: "ghost-pass" },
          { id: "st-firsttry", label: "Kamandur's Equal", desc: "Solved the plates, books and chests on the first try.", requires: ["stair-3", "door-e", "stair-5", "!plates-wrong", "!books-wrong", "!chest-wrong"] },
          { id: "st-promise", label: "A Promise Kept", desc: "Gave Krakul back his eye, as promised.", requires: ["promised", "krakul-done", "!won:krakul"] },
          { id: "st-slayer", label: "Lindworm Slayer", desc: "Defeated Krakul.", requires: "won:krakul" },
          { id: "st-orvild", label: "Homeward Bound", desc: "Brought Orvild home to the Blue Medusa.", requires: "orvild-done" },
          { id: "st-rescuer", label: "No One Left Behind", desc: "Rescued both Alberic and Betrix.", requires: ["alberic-saved", "betrix"] },
          { id: "st-sail", label: "Sailing Home", desc: "Escaped on the ship from the bottle.", requires: "sailed" },
          { id: "st-tiny", label: "Small Problems", desc: "Shrank Krakul down to size.", requires: ["krakul-done", "clue:potion", "!won:krakul", "!promised"] }
        ],
        reward: { text: "You bob in the cold swell, clutching what you carried out. Behind you the green light flickers, and the drowned tower settles back into the sea for another twenty years." },
        waypoints: [
          // ─────────────────────────────────────────── THE ROWBOAT
          {
            id: "rowboat", name: "The Rowboat Landing", short: "Rowboat",
            text: "Salt wind and the reek of kelp. At the tower's foot a second boat rocks on the swell. In it sits an old man in a brown robe, a black patch over one eye, holding up a little bottle of green liquid. He wants, he says, only one thing from the tower: the green emerald at its top, stolen from him long ago. Bring it to him and he'll give you this — an elixir of life. Everything else you find is yours.",
            challenges: [
              { id: "legend", label: "Recall what the fishers say about the tower", skill: "Myths & Legends",
                success: "A brother and sister, Kamandur and Magdala, inseparable since childhood. Pirates burned their cottage and killed her; he built this tower for her and lured ships to their deaths with its green light. They say he built everything in it in pairs — two of everything, for the two of them.",
                onSuccess: { clue: { id: "two", text: "The legend: Kamandur built the tower in pairs — two of everything, for himself and his sister Magdala." } },
                failure: "Tavern stories blur together: a mad mage, a dead sister, a light that drowns ships." },
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
            talk: [{ id: "oldman", name: "The one-eyed man", label: "Speak with the one-eyed man", hideIf: ["promised", "refused"],
              nodes: {
                start: { text: "\"You are not the first to come for what isn't yours,\" the old man rasps, \"but I hope you'll be the last. Up there is a green emerald that was stolen from me long ago. Bring it to me — keep whatever else you find — and this is yours.\" He holds up a bottle of green liquid. \"An elixir of life. It brings the drinker back from the threshold of death.\"",
                  options: [
                    { id: "who", label: "\"Who are you?\"", once: true, to: "who" },
                    { id: "why", label: "\"Why don't you fetch it yourself?\"", once: true, to: "why" },
                    { id: "study", label: "Watch him closely as he speaks", once: true, skill: "Awareness", success: "seen", failure: "unseen" },
                    { id: "yes", label: "\"Deal. The emerald is yours.\" (take the elixir)", to: "deal" },
                    { id: "no", label: "\"Find someone else.\"", to: "refuse" }
                  ] },
                who: { text: "\"Who I am does not matter.\" His single eye doesn't leave the green light at the top of the tower.", options: [{ label: "Back to his offer", to: "start" }] },
                why: { text: "\"The tower will not have me.\" He says it flatly, as if it were the simplest thing in the world.", options: [{ label: "Back to his offer", to: "start" }] },
                seen: { text: "When he turns his head, his one eye catches the light — and the pupil is a slit, like a snake's. The boat rides low in the water, far too low for one old man.", fx: { reveal: ["serpent"], clue: { id: "serpent", text: "The one-eyed man has a snake's slit pupil, and his boat rides far too low. He isn't what he seems." } }, options: [{ label: "Back to his offer", to: "start" }] },
                unseen: { text: "Just a weathered old man in a brown robe, staring at the tower.", options: [{ label: "Back to his offer", to: "start" }] },
                deal: { text: "He presses the cold bottle into your hand. \"The green stone. Only that.\" Then he says nothing more.", end: true,
                  fx: { flag: "promised", item: { name: "Elixir of Life", note: "One dose. At 0 HP you recover by yourself and stop making death rolls (no help against instantly fatal wounds)." } } },
                refuse: { text: "He lowers the bottle and goes back to staring at the tower, silent.", end: true, fx: { flag: "refused" } }
              } }],
            exits: [{ to: "statue-gallery", label: "Through the front door", main: true, swim: true }],
            escapes: [{ label: "Row back to shore", button: "Row away", done: "You rowed away from the tower", note: "Ends the adventure and tallies your score." }]
          },
          // ─────────────────────────────────────────── 1. STATUE GALLERY
          {
            onEnter: { unflag: "shrunk" },
            id: "statue-gallery", map: "/tools-data/solo/maps/sinking-tower/statue-gallery.jpg", name: "1. Statue Gallery", short: "Gallery", floor: true,
            text: "The heavy door groans inward and the stench of seaweed rolls out. Beyond lies a great stone hall, grand once, now a sad ruin: the floor sits a handspan under seawater, and a mural on the north wall is smothered in rotting weed. Two tall stone statues face you from the middle of the room, and between them something glints under the water. At the far end, a stair goes down into black water.",
            flagNotes: { "sunk:statue-gallery": "The tower has settled: this hall is under water now. You can still swim through it, holding your breath." },
            challenges: [
              { id: "mural", label: "Pull the weed from the mural", choice: true, button: "Look", hideIf: "seen-mural1",
                success: "Under the slime, faded paint: a cottage by the sea, two children playing on the shore, birds gliding over the water.",
                onSuccess: { flag: "seen-mural1", clue: { id: "mural1", text: "Gallery mural: two children playing by a cottage on the shore." } } },
              { id: "statue-w", label: "Examine the western statue", choice: true, button: "Look", hideIf: "seen-sw",
                success: "A cloaked man with a long beard, staring straight ahead. His right arm is raised, the index finger pointing up.",
                onSuccess: { flag: "seen-sw", clue: { id: "statue-w", text: "West statue, a bearded man: right hand raised, one finger — the index — pointing up." } } },
              { id: "statue-e", label: "Examine the eastern statue", choice: true, button: "Look", hideIf: "seen-se",
                success: "A young woman in a robe, her face tilted to the floor. Her left hand rests on her chest with the middle and ring fingers stretched out.",
                onSuccess: { flag: "seen-se", clue: { id: "statue-e", text: "East statue, a young woman: left hand on her chest, the middle and ring fingers stretched out." } } },
              { id: "wade", label: "Wade out to what glints between the statues", choice: true, button: "Wade out", hideIf: "seen-plates",
                success: "Six round plates of green copper, each a metre across, are set into the floor. In the very centre of the hall a giant hand is carved into the stone.",
                onSuccess: { flag: "seen-plates", clue: { id: "hand", text: "A giant hand is carved into the middle of the gallery floor." } } },
              { id: "look", label: "Look closer at the copper plates", skill: "Spot Hidden", requires: "seen-plates", hideIf: "stair-3",
                success: "They give a little underfoot — pressure plates. Something above is waiting for them to be pressed.", onSuccess: { reveal: ["plates"] },
                failure: "Copper, green with age. That's all you can tell." },
              { id: "plates", label: "Press the copper plates", requires: "seen-plates", hideIf: "stair-3", note: "How many do you press at once?",
                options: [
                  { id: "one", label: "Press one plate", repeat: true, fx: { damage: "D6", all: true, ignoreArmor: true, flag: "plates-wrong", say: "A loud click — and lightning cracks down from the ceiling into the water. Everyone standing in it takes D6, armor doesn't help." } },
                  { id: "two", label: "Press two at the same moment", firstTry: { n: 1, label: "Copper plates solved on the first attempt" }, fx: { flag: "stair-3", say: "A loud click, then a low rumble overhead. In the south-west corner, stone steps fold out of the wall and climb toward the floor above." } },
                  { id: "many", label: "Press three or more", repeat: true, fx: { damage: "D6", all: true, ignoreArmor: true, flag: "plates-wrong", say: "A loud click — and lightning cracks down from the ceiling into the water. Everyone standing in it takes D6, armor doesn't help." } }
                ] }
            ],
            secrets: [{ id: "plates", text: "The copper plates are pressure plates." }],
            exits: [
              { to: "cellar", label: "Dive down the stair into the black water", swim: true },
              { to: "library", label: "Climb the stair in the south-west corner", requires: "stair-3", locked: "No way up yet", main: true },
              { to: "rowboat", label: "Back out to the rowboat", hideIf: "sunk:statue-gallery" }
            ],
            escapes: [{ label: "Swim out through the front door", skill: "Swimming", requires: "sunk:statue-gallery", failDamage: "D6", damageType: "drowning", done: "Swam out of the flooded gallery to the rowboat", note: "The hall is under water. Fail and you swallow the sea (D6) — but you reach the boat." }]
          },
          // ─────────────────────────────────────────── 2. CELLAR
          {
            id: "cellar", map: "/tools-data/solo/maps/sinking-tower/cellar.jpg", name: "2. Cellar", short: "Cellar", floor: true,
            text: "Cold, dark, murky water. In the gloom you can just make out the walls of what was once a cellar — and carved into the stone floor below you, a great eye staring back up.",
            everyRoll: { attr: "CON", label: "Hold your breath", note: "Under water: roll CON before every action here (it isn't an action). Failure: D6 drowning damage, armor doesn't help.", onFail: { damage: "D6", ignoreArmor: true } },
            onEnter: { unflag: "shrunk", encounter: "eel", clue: { id: "eye", text: "An eye is carved into the cellar floor — right below where the hand is carved in the gallery." }, say: "Something longer than a rowboat uncoils from the far corner and comes at you, jaws wide." },
            challenges: [
              { id: "explore", label: "Feel your way around the flooded cellar", skill: "Swimming", repeat: true, hideIf: "cellar-known",
                success: "Corner by corner: a dozen rotten figureheads leaning in the north-west, a stack of twenty broken barrels in the south-east, and in the south-west a gap in the wall opening on the sea — with the dark ribs of a shipwreck just beyond.",
                onSuccess: { flag: "cellar-known" }, failure: "You lose your bearings in the black water and drift back to the stair." },
              { id: "faces", label: "Swim close to the grinning figureheads", attr: "WIL", requires: "cellar-known", hideIf: "faces-done",
                success: "Rotten wood and painted grins. You hold your nerve; there's nothing else there.", onSuccess: { flag: "faces-done" },
                failure: "The faces seem to leer and lunge at you through the murk. Panic grips you: you are Scared.", onFail: { flag: "faces-done", cond: "Scared" } },
              { id: "barrels", label: "Search the broken barrels", skill: "Spot Hidden", requires: "cellar-known", hideIf: "barrels-done",
                success: "Wedged between two staves: something worth keeping.", onSuccess: { flag: "barrels-done", treasure: 1 },
                failure: "Rot and silt. The clock doesn't wait.", onFail: { threat: 1 } },
              { id: "gap", label: "Swim through the gap toward the wreck", skill: "Swimming", repeat: true, requires: "cellar-known", hideIf: "wreck-near",
                success: "You kick out through the gap. The wreck of a two-masted ship lies on a rock just beyond, a great hole in its side.", onSuccess: { flag: "wreck-near" },
                failure: "The current shoves you back against the wall.", onFail: { threat: 1 } },
              { id: "wreck", label: "Get inside the wreck", skill: "Swimming", repeat: true, requires: "wreck-near", hideIf: "wreck",
                success: "You squeeze through the hole in the hull. Along her side, in flaking letters: the Blue Medusa. Her hold still holds a few things.", onSuccess: { flag: "wreck", score: { n: 1, label: "Found the wreck" }, treasure: 2, clue: { id: "medusa", text: "The wreck beyond the cellar is the Blue Medusa." } },
                failure: "Splintered planks block the way; you'll have to try again.", onFail: { threat: 1 } },
              { id: "orvild", label: "Lead Orvild to the Blue Medusa", choice: true, button: "Show him", requires: ["orvild-follows", "wreck"], hideIf: "orvild-done",
                success: "The ghost boy drifts past you to the wreck and lays a hand on her rail. He turns, beaming, and thanks you for bringing him home — then fades away for good.", onSuccess: { flag: "orvild-done", score: { n: 2, label: "Helped Orvild to the wreck" } } }
            ],
            encounters: [
              { id: "eel", noSneak: true, label: "Monster eel", hidden: true, underwater: true, time: 1, note: "Under water: hold your breath each round, melee at a bane.", onWin: { score: { n: 1, label: "Defeated the monster eel" } },
                foes: [{ monster: EEL, count: 1, solo: 1 }] }
            ],
            exits: [{ to: "statue-gallery", label: "Swim back up to the gallery", main: true, swim: true }]
          },
          // ─────────────────────────────────────────── 3. LIBRARY
          {
            id: "library", map: "/tools-data/solo/maps/sinking-tower/library.jpg", name: "3. Library", short: "Library", floor: true,
            text: "Bookcases stretch floor to ceiling, packed into a cramped little maze. The shelves sag under swollen leather volumes and the air smells of paper and mould. From somewhere in the middle comes a faint, steady scratching.",
            everyRoll: { skill: "Sneaking", label: "Keep quiet", note: "Something in here hushes every sound. Roll SNEAKING before each action: the first failure brings a fear attack, the second brings it down on you.",
              unless: ["won:ghost", "ghost-gone"], boonIf: "shrunk", boonWhy: "Tiny (the red potion)",
              onFail: { ifFlag: "shushed", then: { encounter: "ghost", say: "\"SILENCE!\" The scratching stops. All around you, books lift from the shelves." },
                else: { flag: "shushed", fear: true, say: "A furious, echoing SHHHH! fills the maze and a cold dread grips you. (Make the fear roll on your sheet.)" } } },
            challenges: [
              { id: "scratch", label: "Creep toward the scratching", choice: true, button: "Creep closer", hideIf: "seen-ghost",
                success: "At a desk in the heart of the maze sits a robed, see-through figure bent over a parchment, his quill scratching endlessly: a ghost, still at his work. At your faintest sound his head snaps round with a sharp hush.",
                onSuccess: { flag: "seen-ghost", clue: { id: "ghost", text: "A librarian's ghost writes in the library. He can't bear a sound — standing silent and still calms him." } } },
              { id: "maze", label: "Explore the maze of shelves", choice: true, button: "Explore", hideIf: "seen-pedestals",
                success: "In front of one bookcase stand three wooden pedestals, each with a single book: a sword on the left cover, a cross in the middle, an eye on the right. In the centre of the room a ship is carved into the floor.",
                onSuccess: { flag: "seen-pedestals", clue: { id: "ship", text: "A ship is carved into the library floor." } } },
              { id: "read", label: "Leaf through one of the books", skill: "Languages",
                success: "The Life and Untimely Death of Magdala, written by Kamandur with the scribe Arlidus: tributes to his sister and curses on the pirates who killed her. Every book on every shelf is the same.",
                failure: "The swollen pages won't give up their words." },
              { id: "books", label: "Open a book on the pedestals", requires: "seen-pedestals", hideIf: "door-e",
                options: [
                  { id: "sword", label: "The sword book", fx: { flag: ["door-n", "books-wrong"], say: "A loud click — and from the north wall, the creak of a door swinging open." } },
                  { id: "cross", label: "The cross book", fx: { flag: ["door-s", "books-wrong"], encounter: "ghost", say: "A loud click and a creak from the south wall — and the scratching of the quill stops dead." } },
                  { id: "eye", label: "The eye book", firstTry: { n: 1, label: "Book puzzle solved on the first attempt" }, fx: { flag: "door-e", say: "A loud click and a creak from the east wall: a hidden door opens on a narrow stair going up. The scratching goes on, undisturbed." } }
                ] },
              { id: "walls", label: "Search the walls for hidden doors", skill: "Spot Hidden", hideIf: "doors-found",
                success: "Three seams in the panelling: hidden doors to the north, south and east.", onSuccess: { reveal: ["doors"], flag: "doors-found" },
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
            secrets: [{ id: "doors", text: "Hidden doors to the north, south and east. They could be pried open (SLEIGHT OF HAND, with a bane) — or something here opens them." }],
            encounters: [
              { id: "ghost", label: "The librarian's ghost", hidden: true, time: 1,
                note: "Arlidus the scribe. Only magic and fire can hurt him.",
                onStart: { flag: ["ghost-fought", "seen-ghost"] }, onEvade: { unflag: "shushed" }, onWin: { score: { n: 1, label: "Defeated the librarian's ghost" }, flag: "ghost-gone" },
                endable: { label: "Stand silent and still", note: "Everyone stays motionless and quiet for a turn.", fx: { unflag: "shushed", say: "You freeze. After a long, cold moment the ghost drifts back to his desk, and the quill begins to scratch again." } },
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
            id: "treasure", map: "/tools-data/solo/maps/sinking-tower/treasure.jpg", name: "4. Treasure Chamber", short: "Treasure", floor: true,
            text: "Ten wooden chests fan out across the hall, five on each side. Along the walls stand five suits of plate armour holding tridents — and through the gaps in the plates, grinning skeletons look out. A worn mural covers the north wall.",
            blockIf: "in-sea", blockNote: "You're in the sea below the tower.",
            challenges: [
              { id: "arrange", label: "Study how the chests are laid out", choice: true, button: "Study", hideIf: ["seen-chests", "in-sea"],
                success: "They're all different lengths. Squint and they look like two great hands laid on the floor, five chests to a hand, the 'thumbs' the two chests nearest the north wall.",
                onSuccess: { flag: "seen-chests", clue: { id: "chests", text: "Treasure chamber: the chests form two hands of five — west and east — with the thumbs nearest the north wall." } } },
              { id: "room", label: "Look over the mural and the floor", choice: true, button: "Look", hideIf: ["seen-room4", "in-sea"],
                success: "The mural shows two young people holding hands on a beach, floating a little above the sand in a shimmer of magic. They look happy. In the middle of the floor a sun is carved into the stone.",
                onSuccess: { flag: "seen-room4", clue: { id: "sun", text: "A sun is carved into the treasure chamber floor; its mural shows the pair grown up, happy, floating on a beach." } } },
              { id: "chests", label: "Open a chest", hideIf: "in-sea", note: "Counted from the north wall.",
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
              { id: "voice", label: "Follow the muffled sound under one of the untouched chests", choice: true, button: "Investigate", requires: "won:skeletons", hideIf: "alberic-found", noCheck: true, note: "Something long would let you open it from a safe distance.",
                success: "You lift the lid with a trident from arm's length. The floor beside it drops away — and a deep voice booms up the shaft: \"Hello there! I could use some help down here!\" A dwarf clings to the wall below: Alberic Gleamheart.",
                onSuccess: { flag: "alberic-found" } },
              { id: "pull", label: "Climb down and help Alberic up", skill: "Acrobatics", requires: "alberic-found", hideIf: "alberic-saved", repeat: true, note: "Or find something in your pack to lower to him.",
                success: "You brace yourself in the shaft and haul him over the lip. Grateful, he presses a trinket into your hand.",
                onSuccess: { flag: "alberic-saved", score: { n: 1, label: "Saved Alberic Gleamheart" }, treasure: 1 },
                failure: "He slips back down. Try again." },
            ],
            uses: [
              { item: ["rope", "grappling"], label: "Lower it to Alberic", requires: "alberic-found", hideIf: "alberic-saved",
                success: "He climbs up hand over hand, beard first, and presses a trinket into your hand in thanks.",
                fx: { flag: "alberic-saved", score: { n: 1, label: "Saved Alberic Gleamheart" }, treasure: 1 } },
              { item: ["spear", "staff", "trident", "pole", "rope"], label: "Prod the untouched chests from a distance", requires: "won:skeletons", hideIf: ["alberic-found"], free: true,
                success: "From arm's length you lift a lid — the floor beside it drops away, and a deep voice booms up the shaft: \"Hello there! I could use some help down here!\"", fx: { flag: "alberic-found" } }
            ],
            talk: [{ id: "alberic", name: "Alberic Gleamheart", label: "Talk to Alberic", requires: "alberic-saved", hideIf: ["ally:alberic", "alberic-gone"],
              nodes: {
                start: { text: "The dwarf wrings out his beard. \"Alberic Gleamheart, treasure hunter — and very nearly a skeleton. I've had about enough of this tower. I'll wait in your boat, if it's all the same.\"",
                  options: [
                    { id: "betrix", label: "\"Did you come here alone?\"", once: true, to: "betrix" },
                    { id: "join", label: "\"Come with us. We could use you.\"", skill: "Persuasion", success: "joins", failure: "declines" },
                    { id: "bye", label: "\"Go on, then. Mind the stairs.\"", to: "leaves" }
                  ] },
                betrix: { text: "\"Captain Betrix Farsail came in with me. We split up two floors back — she went on up. If you see her, tell her I'm in the boat.\"", fx: { clue: { id: "betrix", text: "Alberic came with Captain Betrix Farsail; she went on up ahead of him." } }, options: [{ label: "Something else", to: "start" }] },
                joins: { text: "He hefts his dagger and grins through the beard. \"Ach. Someone has to keep you alive. Lead on.\"", end: true, fx: { flag: "ally:alberic", join: "alberic" } },
                declines: { text: "\"No. No, no. I've seen what's in this place.\" He's already heading for the stairs.", end: true, fx: { flag: "alberic-gone" } },
                leaves: { text: "\"Good luck to you.\" He clatters off down the stairs.", end: true, fx: { flag: "alberic-gone" } }
              } }],
            encounters: [
              { id: "skeletons", noSneak: true, label: "Skeleton guards", hidden: true, time: 1, note: "Plate armour (6), tridents.", onWin: { score: { n: 1, label: "Defeated the skeleton guards" } },
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
            id: "laboratory", map: "/tools-data/solo/maps/sinking-tower/laboratory.jpg", name: "5. Laboratory", short: "Laboratory", floor: true,
            text: "Wooden shelves and workbenches run all around the room, littered with broken glass and the remains of old experiments. In the middle stands a two-metre arched iron cage — and from the darkness inside it, a figure watches you.",
            challenges: [
              { id: "cage", label: "Lift the iron cage", attr: "STR", bane: true, repeat: true, hideIf: "betrix", note: "Others can help.",
                success: "With a groan of iron the cage comes up and the prisoner rolls free. Where the cage stood, a lindworm is carved into the floor.",
                onSuccess: { flag: ["betrix", "seen-lindworm"], score: { n: 1, label: "Saved Betrix Farsail" }, clue: { id: "lindworm", text: "A lindworm is carved into the laboratory floor, under the cage." } },
                failure: "It doesn't budge." },
              { id: "shelves", label: "Look along the shelves", choice: true, button: "Look", hideIf: "seen-shelves",
                success: "West wall: broken jars of something long rotted — but the northernmost jar is whole, and a black, hairy spider sits inside it, alive. East wall: smashed bottles and the wrecks of little model ships, and in the middle of the shelf one perfect ship in a bottle.",
                onSuccess: { flag: "seen-shelves" } },
              { id: "benches", label: "Examine the workbenches", choice: true, button: "Examine", hideIf: "seen-bench",
                success: "Among the broken glass, one bottle is whole: a clear red liquid. Under a cracked mortar lies a stained parchment covered in an old, cramped hand — part of a magical formula.",
                onSuccess: { flag: "seen-bench", reveal: ["recipe"] } },
              { id: "recipe", label: "Read the parchment", skill: "Languages", requires: "recipe", hideIf: "recipe-read",
                success: "A recipe for shrinking things — objects, and living creatures.", onSuccess: { flag: "recipe-read", clue: { id: "recipe", text: "Kamandur's recipe: a formula for shrinking objects and living creatures." } },
                failure: "The cramped hand is too faded to follow." },
              { id: "magic", label: "Work out how the shrinking can be broken", best: ["Myths & Legends", "Elementalism"], requires: "recipe-read", hideIf: "knows-water",
                success: "Water. Anything shrunk this way grows back to its true size the moment it touches water.", onSuccess: { flag: "knows-water", clue: { id: "water", text: "The shrinking breaks when the shrunken thing touches water." } },
                failure: "The theory escapes you." },
              { id: "jar", label: "Take the jar with the spider", choice: true, button: "Take it", requires: "seen-shelves", hideIf: "spider",
                success: "The spider, no bigger than your thumb, watches you with too many eyes as you tuck the jar away.",
                onSuccess: { flag: "spider", item: { name: "Spider in a jar", note: "A black, hairy spider the size of your thumb, alive in a sealed jar from Kamandur's laboratory." } } },
              { id: "bottle", label: "Take the ship in a bottle from its shelf", choice: true, button: "Take it", requires: "seen-shelves", hideIf: "ship",
                success: "It's astonishingly detailed — every rope and plank — as if built by a master. As it leaves the shelf, a rumble: a stair unfolds from the ceiling.",
                onSuccess: { flag: ["ship", "stair-6"], item: { name: "Ship in a bottle", note: "An astonishingly detailed little ship in a bottle, from Kamandur's laboratory." } } },
              { id: "potion", label: "Take the bottle of red liquid", choice: true, button: "Take it", requires: "seen-bench", hideIf: "elixir",
                success: "It's cold in your hand. Whatever it is, it was made with care.",
                onSuccess: { flag: "elixir", item: { name: "Bottle of red liquid", note: "Clear and red, from Kamandur's workbench. A mage can feel magic in it." } } }
            ],
            secrets: [
              { id: "recipe", text: "A stained parchment from the workbench: part of a magical formula in an old, cramped hand." }
            ],
            talk: [
              { id: "caged", name: "The prisoner", label: "Talk to the prisoner in the cage", hideIf: "betrix",
                nodes: {
                  start: { text: "\"About time somebody came up those stairs. Captain Betrix Farsail — and you are going to get me out of here.\" The cage came down on her from the ceiling; she rattles the bars to show you.",
                    options: [
                      { id: "what", label: "\"What happened to you?\"", once: true, to: "what" },
                      { id: "floor", label: "\"What's that under your feet?\"", once: true, to: "floor" },
                      { id: "know", label: "\"What do you know about this tower?\"", once: true, skill: "Persuasion", success: "knows", failure: "sulks" },
                      { id: "threat", label: "\"Why should I help you?\"", once: true, to: "threat" }
                    ] },
                  what: { text: "\"Touched the wrong bench. Down it came. My partner fell through a trapdoor on the floor below before that — chests, skeletons, the lot. Some treasure hunters we are.\"", fx: { clue: { id: "trapdoor", text: "Betrix: her partner fell through a trapdoor by the chests on the floor below." } }, options: [{ label: "Something else", to: "start" }] },
                  floor: { text: "She glances down. \"A lizard. A big one — a lindworm, carved right into the stone. Now LIFT THIS CAGE.\"", fx: { flag: "seen-lindworm", clue: { id: "lindworm", text: "A lindworm is carved into the laboratory floor, under the cage." } }, options: [{ label: "Something else", to: "start" }] },
                  knows: { text: "She drops the bluster for a moment. \"Every floor's a puzzle, and the old mage never did anything once. Two statues, two hands... whatever he built, he built in pairs. Lift the cage and I'll tell you the rest over a drink.\"", fx: { clue: { id: "two", text: "Betrix: the old mage built everything in pairs." } }, options: [{ label: "Something else", to: "start" }] },
                  sulks: { text: "\"I know I'm in a cage, and you're not lifting it.\" She folds her arms.", options: [{ label: "Something else", to: "start" }] },
                  threat: { text: "First threats, then flattery, then promises of treasure she plainly doesn't have. It's quite a performance.", options: [{ label: "Something else", to: "start" }] }
                } },
              { id: "betrix", name: "Captain Betrix Farsail", label: "Talk to Betrix", requires: "betrix", hideIf: ["ally:betrix", "betrix-gone"],
                nodes: {
                  start: { text: "Betrix stretches until her back cracks. \"I owe you one. Now — I'm going to have a good look around before this pile of stones goes under.\"",
                    options: [
                      { id: "join", label: "\"Look around with us instead.\"", skill: "Persuasion", success: "joins", failure: "declines" },
                      { id: "bye", label: "\"Good luck, Captain.\"", to: "leaves" }
                    ] },
                  joins: { text: "\"With you? Fine — but I get first pick of anything shiny.\" She draws her scimitar.", end: true, fx: { flag: "ally:betrix", join: "betrix" } },
                  declines: { text: "\"I work alone. Mostly.\" She's gone up the stairs before you can argue.", end: true, fx: { flag: "betrix-gone" } },
                  leaves: { text: "She gives you a two-fingered salute and slips away.", end: true, fx: { flag: "betrix-gone" } }
                } }
            ],
            uses: [
              { item: ["red liquid", "red potion"], label: "Drink it", hideIf: "shrunk", consume: true,
                success: "It tastes of iron and sea salt. The room swells around you — no, you shrink, down to the height of a hand. Water would undo it.",
                fx: { flag: ["shrunk", "elixir-known"], unflag: "elixir", clue: { id: "potion", text: "The red potion shrinks whoever drinks it to a hand's height, until they touch water. (Tiny: a boon to SNEAKING; at most 1 damage per attack.)" } } }
            ],
            exits: [
              { to: "treasure", label: "Down to the Treasure Chamber" },
              { to: "sorcerer", label: "Up the stair from the ceiling", requires: "stair-6", locked: "No way up yet", main: true }
            ],
            escapes: [WINDOW]
          },
          // ─────────────────────────────────────────── 6. SORCERER'S CHAMBER
          {
            id: "sorcerer", map: "/tools-data/solo/maps/sinking-tower/sorcerer.jpg", name: "6. Sorcerer's Chamber", short: "Sorcerer", floor: true,
            text: "Heavy, dark drapes cover the windows and the whole floor sits in shadow. Against the north wall stands a grand four-poster bed, its curtains closed. In the four corners loom the shapes of huge carved figureheads — beasts with grinning jaws.",
            challenges: [
              { id: "drapes", label: "Pull aside a drape", hideIf: "stair-7", note: "Heavy work: a rope in each corner, one drape per action.",
                options: ["North", "East", "South", "West"].map(function (side, i) {
                  return { id: side.toLowerCase(), label: side + " drape", text: ["Grey daylight streams in through a tall window.", "Grey daylight streams in through a tall window.", "Behind it, a mural: under dark clouds a young man kneels by the body of a young woman. The cottage burns, and a ship sails away from the shore.", "Grey daylight streams in through a tall window."][i],
                    fx: { count: { key: "drapes", at: 4, fx: { flag: "stair-7", say: "With the last drape down, grey daylight floods the room — and a stair lowers from the ceiling." } }, ifFlag: ["!won:figureheads", "!fh-awake"], then: { flag: "fh-awake", encounter: "figureheads", say: "Daylight falls on the nearest figurehead and it stiffens, lifeless wood. The other three creak, turn their heads — and roar." } } };
                }) },
              { id: "bed", label: "Draw back the bed curtains", choice: true, button: "Look", hideIf: "corpse",
                success: "On the bed lies the waxy corpse of a bearded old man, hands folded on his chest — the face of the western statue downstairs. Kamandur himself.",
                onSuccess: { reveal: ["corpse"], flag: "corpse", ifFlag: ["!won:figureheads", "!fh-awake"], then: { flag: "fh-awake", encounter: "figureheads" } } },
              { id: "search", label: "Search the body", choice: true, button: "Search", requires: "corpse", hideIf: "looted-k",
                success: "Something glints between his folded hands.", onSuccess: { flag: "looted-k", treasure: 1 } }
            ],
            secrets: [{ id: "corpse", text: "Kamandur's body lies on the bed, preserved like wax." }],
            encounters: [
              { id: "figureheads", noSneak: true, label: "Enchanted figureheads", hidden: true, time: 1, reduceBy: "drapes",
                note: "Daylight seems to still them.",
                combatActions: [
                  { id: "drape", label: "Pull aside a drape (your action)", max: 4, hideIf: "stair-7", freezeFoe: true, freezeWord: "freezes in the daylight",
                    fx: { count: { key: "drapes", at: 4, fx: { flag: "stair-7", say: "With the last drape down, grey daylight floods the room — and a stair lowers from the ceiling." } } } },
                  { id: "spider", label: "Smash the spider jar on a figurehead", requires: "spider", max: 1, freezeFoe: true, scoreFoe: true, freezeWord: "is torn apart by a giant spider — and the spider with it",
                    note: "Uses your action.", fx: { unflag: "spider", say: "The jar shatters against a figurehead streaming with seawater. The spider swells to the size of a horse and the two monsters tear each other apart." } }
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
            id: "observatory", map: "/tools-data/solo/maps/sinking-tower/observatory.jpg", name: "7. Observatory", short: "Observatory", floor: true,
            text: "A vast glass dome crowns the tower, drenched in green light, with grey sea on every side beyond a railed balcony. On a stone podium rest two identical, blazing emeralds. A black stone sarcophagus lies at the north end. And somewhere, a boy is crying.",
            challenges: [
              { id: "peek-w", label: "Tilt the west stone to peek underneath", skill: "Sleight of Hand", requires: "!emerald", hideIf: ["peeked-w", "demon-stone"],
                success: "A carving under it: a demon.", onSuccess: { flag: "peeked-w", clue: { id: "stone-w", text: "Under the west emerald: a carved demon." } },
                failure: "It slips from your fingers — you're holding it.", onFail: { flag: "demon-stone", sink: true, say: "Under it, a demon is carved into the podium. Click. Far below something gives, and the whole tower lurches and begins to slide into the sea." } },
              { id: "peek-e", label: "Tilt the east stone to peek underneath", skill: "Sleight of Hand", requires: "!emerald", hideIf: "peeked-e",
                success: "A carving under it: a lindworm.", onSuccess: { flag: "peeked-e", clue: { id: "stone-e", text: "Under the east emerald: a carved lindworm." } },
                failure: "It slips from your fingers — you're holding it.", onFail: { flag: "emerald", item: { name: "Krakul's emerald", note: "A blazing green stone, the size of a fist." }, ifFlag: "!promised", then: { encounter: "krakul" }, say: "Under it, a lindworm is carved into the podium. The tower shudders. Beyond the glass a vast shadow rises from the sea: a lindworm with one empty eye socket — and the old man's voice, hissing in your head." } },
              { id: "stones", label: "Lift a stone from the podium", hideIf: "emerald",
                options: [
                  { id: "west", label: "The west stone", hideIf: "demon-stone", fx: { flag: "demon-stone", sink: true, say: "Under it, a demon is carved into the podium. Click. Far below, something gives — and the whole tower lurches and begins to slide into the sea." } },
                  { id: "east", label: "The east stone", firstTry: { n: 1, label: "Twin stones solved on the first attempt" },
                    fx: { flag: "emerald", item: { name: "Krakul's emerald", note: "A blazing green stone, the size of a fist." }, ifFlag: "!promised", then: { encounter: "krakul" },
                      say: "Under it, a lindworm is carved into the podium. The tower shudders. Beyond the glass a vast shadow rises from the sea: a lindworm with one empty eye socket — and the old man's voice, hissing in your head." } }
                ] },
              { id: "give", label: "Hand Krakul his eye, as promised", choice: true, button: "Give it", requires: ["emerald", "promised"], hideIf: "krakul-done", noCheck: true,
                success: "He takes the emerald gently in his jaws. \"As promised.\" He dips his great head to you — and dives beneath the waves.",
                onSuccess: { flag: "krakul-done", take: "Krakul's emerald", score: { n: 3, label: "Gave the emerald to Krakul" } } },
              { id: "throw", danger: "krakul", label: "Throw Krakul the emerald to save your skin", choice: true, button: "Give it up", requires: ["emerald", "!promised"], hideIf: "krakul-done", noCheck: true,
                success: "He snatches it from the air, considers you with his one good eye, and lets you live.",
                onSuccess: { flag: "krakul-done", take: "Krakul's emerald", score: { n: 3, label: "Gave the emerald to Krakul" } } },
              { id: "lid", label: "Lift the sarcophagus lid", attr: "STR", bane: true, repeat: true, hideIf: "lid",
                success: "A young woman in an ankle-length tunic is carved on the lid — the girl from the murals, grown. As it grinds aside, a skeletal hand drops to the floor, as if it had been caught between lid and coffin. Inside lie her bones, the skull turned on its side, jaw open.", onSuccess: { flag: "lid" },
                failure: "It's far too heavy." },
              { id: "bones", label: "Reach in among her bones", choice: true, button: "Reach in", requires: "lid", hideIf: "manacled-once",
                success: "Your fingers close on something — and a heavy iron manacle snaps shut around your wrist, chained to the coffin. Far below, the tower lurches. Now you know whose hand that was.",
                onSuccess: { flag: ["manacled", "manacled-once"], treasure: 1, sink: true } },
              { id: "manacle", label: "Break the manacle", choice: true, button: "It's broken", requires: "manacled", noCheck: true,
                note: "Iron, armor 10: it breaks after 20 slashing or bludgeoning damage gets through. Roll your weapon damage on the sheet until it does.",
                success: "The iron cracks and falls away.", onSuccess: { unflag: "manacled" } }
            ],
            talk: [{ id: "orvild", name: "The crying boy", label: "Speak gently to the crying boy", hideIf: "orvild-follows",
              nodes: {
                start: { text: "Behind the podium a boy sits with his head in his hands, sobbing. He's grey and a little transparent, like breath on a cold window.",
                  options: [
                    { id: "kind", label: "Kneel beside him and speak kindly", to: "talks" },
                    { id: "press", label: "\"Who are you? What happened here?\"", skill: "Persuasion", success: "talks", failure: "hides" }
                  ] },
                talks: { text: "\"Orvild,\" he sniffs. \"Cabin boy on the Blue Medusa. I don't know where I am, or how I got here, or where my ship's gone. They all left me.\"", fx: { flag: "orvild", clue: { id: "orvild", text: "Orvild, a ghost cabin boy of the Blue Medusa, is lost and looking for his ship." } },
                  options: [
                    { id: "lead", label: "\"I know where the Blue Medusa lies. Follow me.\"", requires: "wreck", to: "follows" },
                    { id: "find", label: "\"I'll look for her.\"", hideIf: "wreck", to: "hope" }
                  ] },
                hides: { text: "He shrinks away from you and buries his face again. Perhaps a gentler word.", options: [{ label: "Try again, gently", to: "talks" }] },
                follows: { text: "His face lights up. \"You'll show me? I don't know the way...\" He drifts close behind you. (Swim down to the cellar and through to the wreck.)", end: true, fx: { flag: "orvild-follows" } },
                hope: { text: "\"You will? Really?\" He wipes his eyes and almost smiles.", end: true }
              } }],
            uses: [
              { item: "spider", danger: "krakul", label: "Smash the jar against Krakul's wet scales", hideIf: ["krakul-done", "krakul-busy"], consume: true,
                success: "The jar shatters on his streaming scales — and the little spider swells to the size of a horse and leaps on him. They thrash across the dome; that will keep him busy for a while.",
                fx: { flag: "krakul-busy", unflag: "spider", clue: { id: "water", text: "The shrinking breaks when the shrunken thing touches water." } } },
              { item: ["red liquid", "red potion"], danger: "krakul", label: "Hurl it into his gaping mouth", best: ["Knives", "Slings", "Bows", "Crossbows", "Spears", "Staves"], bane: true, hideIf: "krakul-done", consume: true, consumeOnFail: true,
                success: "It goes straight down his throat. With a squeak he dwindles into a harmless little snake — though one touch of water would undo it.",
                failure: "It shatters against his scales.",
                onSuccess: { flag: "krakul-done", unflag: "elixir", clue: { id: "potion", text: "The red potion shrinks whoever swallows it." } }, onFail: { unflag: "elixir" } }
            ],
            encounters: [
              { id: "krakul", label: "Krakul the lindworm", hidden: true, noSneak: true, requires: ["emerald", "!promised"], unless: ["krakul-done", "krakul-busy"], time: 1,
                note: "He goes for whoever carries the emerald, but spares anyone who hands it over.",
                onWin: { flag: "krakul-done", score: { n: 4, label: "Defeated Krakul" } },
                foes: [{ monster: KRAKUL, count: 1, solo: 1 }] }
            ],
            exits: [{ to: "sorcerer", label: "Down to the sorcerer's chamber" }],
            escapes: [
              { label: "Jump from the balcony into the sea", skill: "Swimming", failDamage: "D6", damageType: "bludgeoning", hideIf: "manacled", done: "Jumped from the observatory balcony", note: "Fail the SWIMMING roll and the fall deals D6 bludgeoning — but you're out." },
              { label: "Throw the ship in a bottle into the sea and climb aboard", requires: ["ship", "knows-water"], hideIf: "manacled", button: "Set sail", fx: { flag: "sailed" }, done: "Sailed away on Kamandur's shrunken ship, restored by the sea", note: "The water will break the shrinking. Jump down to her." },
              { label: "Smash the bottle and drop the little ship into the sea", requires: "ship", hideIf: ["manacled", "knows-water"], button: "Drop it", fx: { flag: "sailed" }, done: "The little ship hit the waves and grew into a real one — you jumped aboard and sailed away", note: "A wild idea. What's the worst that could happen?" }
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
