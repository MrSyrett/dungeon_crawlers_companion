// SOLO PLAY — "Tomb of the Dusk Queen" (Sersa Victory, a Shadowdark RPG third-party
// adventure for 1st-level characters) converted for Shadowdark solo play
// (tools/templates/sd_solo.html). Places, DCs, monsters and treasure follow the
// book; the read-aloud is paraphrased. Where the book leaves a call to the GM it
// is made here and marked "(solo call)": DCs it doesn't print (9 easy, 12 normal,
// 15 hard, 18 extreme), the random utility item on Morwen's corpse, the thief's
// name, the rumors that turn out false (5 and 6), and how a lone hero shifts the
// sarcophagus lid. Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
(function(){
var MAP = '/tools-data/solo/maps/dusk-queen/map.jpg';

// ── monsters, as printed in the book ──
var SKELETON = { name:'War-maiden skeleton', ac:13, hp:11, atk:'1 crescent moon sickle +1 (1d4)', dex:0, wis:0, lv:2, fearless:true,
  notes:'Undead. Immune to morale checks. Pollen: on a 1–2 (d6, once a round for the group) the heroes near the root-flowers make a DC 15 CON check or become susceptible to the fey gaze.' };
var OWLBEAR = { name:'Owlbear zombie', ac:13, hp:25, atk:'2 claw +4 (1d6)', dex:1, wis:1, lv:5, fearless:true, rend:true,
  notes:'Undead. Rend: 1d6 extra damage if both claws hit the same target. Elite (1/day): cancels one harmful effect on it.' };
var CUBE = { name:'Gelatinous cube', ac:11, hp:24, atk:'1 touch +4 (1d6 + toxin)', dex:1, wis:1, lv:5, fearless:true,
  riders:{ toxin:{ name:'Toxin', dc:15, stat:'con', para:'1d4', text:'paralyzed 1d4 rounds' } },
  notes:'Engulf: a paralyzed creature close by is absorbed — the touch hits it automatically. Toxin: DC 15 CON or paralyzed 1d4 rounds.' };
var CREEPER = { name:'Cave creeper', ac:12, hp:18, atk:'1 bite +3 (1d6) and 1 tentacle +3 (toxin)', dex:2, wis:1, lv:4,
  riders:{ toxin:{ name:'Toxin', dc:12, stat:'con', para:'1d4', text:'paralyzed 1d4 rounds' } }, notes:'Toxin: DC 12 CON or paralyzed 1d4 rounds.' };
var BASILISK = { name:'Basilisk', ac:15, hp:28, atk:'1 bite +5 (1d10) and 1 gaze (near)', dex:2, wis:0, lv:6,
  riders:{ gaze:{ name:'Gaze', dc:15, stat:'con', petrify:true, text:'turned to stone' } },
  notes:'Gaze: DC 15 CON or turned to stone. Averting your eyes gives disadvantage on attacks and spells. Elite (1/day): cancels one harmful effect on it.' };
var ARMOR = { name:'Animated mithril armor', ac:15, hp:11, atk:'1 longsword +3 (1d8)', dex:-1, wis:1, lv:2, fearless:true,
  notes:'Polished: 1-in-3 chance a spell cast at it reflects onto a random hero.' };
var THIEF = { name:'Thief', ac:13, hp:13, atk:'1 dagger (close/near) +2 (1d4) or 1 shortsword +0 (1d6)', dex:2, wis:0, cha:1, lv:3 };
var QUEEN = { name:'The Dusk Queen', ac:17, hp:40, dex:0, wis:1, cha:5, lv:7, fearless:true,
  resist:{ half:true, unless:'magic|silver' },
  routines:[
    [ { n:1, name:'slam', bonus:5, dmg:'1d12', riders:[] }, { n:1, name:'curse', auto:true, riders:[ { name:'Life drain', dc:15, stat:'wis', statLoss:{ dice:'1d4', stat:'con' }, text:'1d4 CON damage' } ] } ],
    [ { n:1, name:'slam', bonus:5, dmg:'1d12', riders:[] }, { n:1, name:'Charm', auto:true, spell:true, riders:[] } ],
    [ { n:1, name:'slam', bonus:5, dmg:'1d12', riders:[] }, { n:1, name:'Mirror Image', auto:true, spell:true, riders:[] } ]
  ],
  spells:{ 'charm':{ dc:11, rounds:1, longFlag:'pollen', longRounds:3, say:'“Behold my eternal beauty and fall to your knees!”' },
           'mirror image':{ dc:12, say:'“Abandon your absent gods and your feeble kings, for you are mine now!”' } },
  at:{ hp:20, label:'Sticks to Snakes', say:'“O, Great Tree of Gold! Aid your chosen daughter!” Her staff writhes and splits into a seething mass of snakes.',
       summon:{ name:'Snake swarm', monster:{ name:'Snake swarm', ac:13, hp:14, atk:'2 bite +3 (DC 15 CON or 1d4 STR damage)', dex:1, wis:0, lv:3, fearless:true } } },
  notes:'Greater undead: immune to charm, poison and morale; half damage from anything not magical or silver. Legendary (2/day): cancels a harmful effect or re-rolls a failed spell.' };

window.SD_SOLO_MODULES = window.SD_SOLO_MODULES || [];
window.SD_SOLO_MODULES.push({
  id: 'sd-dusk-queen',
  system: 'SD',
  title: 'Tomb of the Dusk Queen',
  labels: { enter:'Descend into the catacombs', back:'Back to the surface', missions:'The delve' },
  intro: { title:'Tomb of the Dusk Queen', text:'Under a colossal tree of golden leaves, its roots knot through a maze of catacombs. Somewhere below lies the Dusk Queen of legend with her royal treasures — and the deathless guards and old tricks that keep her sleep.' },
  missions: [{
    id: 'dusk-queen',
    title: 'Tomb of the Dusk Queen',
    level: '1st-level characters',
    objective: 'Plunder the Dusk Queen\'s tomb and get out alive.',
    briefing: 'Stone steps lead down between the roots of the golden tree into the dark. The air smells of earth, old flowers and something sweeter underneath. Whatever you carry out of the Dusk Queen\'s tomb is yours — if you carry it out.',
    danger: { label:'Unsafe', every:3 },
    lostTitle: 'Lost beneath the golden tree',
    lostText: 'The roots of the golden tree close over the catacombs again. Somewhere above, its leaves turn in the dusk wind, and below, the Dusk Queen sleeps on with new guests.',
    reward: { text:'You climb back into the daylight under the golden leaves, blinking, battered and richer than you went down.' },
    notes: [ ['Treasure is XP','Every piece you carry out is worth XP to each hero: 1 for ordinary loot, 3 for something fabulous, 10 for a legendary hoard. The scepter and crown together fetch 300 gp.'] ],
    map: { src:MAP, w:875, h:1241, areas:{
      a1:[[335,820,210,285],[385,1100,85,95]], a2:[[228,825,108,158]], a3:[[203,668,115,160]], a4:[[128,498,210,175]], a5:[[48,470,85,230]],
      a6:[[48,738,160,95]], a7:[[308,486,130,240]], a8:[[538,918,105,65],[638,668,85,420],[712,995,65,65]], a9:[[718,636,115,116]],
      a10:[[508,692,140,86]], a11:[[555,600,80,100]], a12:[[552,375,172,235]], a13:[[432,328,115,300]], a14:[[303,98,380,195],[452,278,70,62]] } },
    rumors: [
      { roll:1, text:'A young woman claiming to be the great-granddaughter of the Dusk Queen went missing in the tomb.' },
      { roll:2, text:'A false scepter lures thieves to an agonizing death.' },
      { roll:3, text:'The ghost of an elvish warrior buried in the tomb haunts those who steal her secret door-detecting sword.' },
      { roll:4, text:'Those who harvest the sacred wheat keep a secret.' },
      { roll:5, text:'A scroll of fireball in the tomb is cursed to burn the caster instead of her targets.' },   // false (solo call)
      { roll:6, text:'The gelatinous cube cannot harm anyone carrying the Dusk Queen\'s holy symbol.' }      // false (solo call)
    ],
    randomEncounters: [
      { roll:1, label:'War-maidens rise', text:'Rubble shifts. Bony hands claw out of it — war-maiden skeletons, sickles raised.', enc:'re-skeletons' },
      { roll:2, label:'The elf-ghost', requires:'has:+1 longsword', text:'The air goes cold. A pale elven warrior stands in your path, her hand held out for the sword you took from her grave.', enc:'re-ghost',
        otherwise:{ label:'A cold presence', text:'A breath of cold air brushes past you, searching for something. It doesn\'t find it, and it\'s gone.' } },
      { roll:3, label:'A thief!', text:'Footsteps, a flicker of a shuttered lantern — a woman in dark leathers bolts from a side passage and freezes when she sees you.',
        event:{ title:'A fleeing thief', text:'She\'s human, wiry, a bag of tools at her hip. She hasn\'t decided whether you\'re trouble.',
          options:[ { label:'Call out to her', reaction:true, bands:{
              hostile:{ text:'Her knife comes out. “Mine first,” she hisses.', fx:{ encounter:'re-thief', now:'foes' } },
              suspicious:{ text:'She backs away without a word and is gone into the dark, deeper into the tomb.' },
              neutral:{ text:'She shrugs, says nothing useful, and slips away deeper into the tomb.' },
              curious:{ text:'“The obelisk,” she says, flexing fingers that are all still there. “Don\'t reach in without looking. Blades.” Then she\'s gone.', fx:{ clue:{ id:'thief-blades', text:'A thief warned: don\'t reach into the obelisk without looking first — there are blades.' } } },
              friendly:{ text:'She grins. “Wren. I\'m not the first to try this place — and I\'d rather not be the last out. Mind if I tag along?”', fx:{ clue:{ id:'thief-blades', text:'Wren the thief warned: don\'t reach into the obelisk without looking first — there are blades.' }, event:{ title:'Wren the thief', text:'She waits for your answer, one foot already turned to the dark.', options:[ { label:'Ask her to join you', stat:'cha', dc:12, onSuccess:{ join:'wren' }, success:'“Fair shares,” she says, and falls in beside you.', failure:'She weighs you up and shakes her head. “Maybe on the way out.” She\'s gone.' }, { label:'Let her go', text:'She nods and melts into the dark.' } ] } } } } },
            { label:'Let her run', text:'You let her go. Her footsteps fade deeper into the tomb.' } ] } },
      { roll:4, label:'Cave creeper', text:'Something horse-sized and many-legged pours down from the shadowy ceiling, tentacles first.', enc:'re-creeper' },
      { roll:5, label:'Mithril armor reforms', text:'Scattered plates of mithril scale scrape across the floor, lock together, and rise as an empty knight.', enc:'re-armor' },
      { roll:6, label:'Golden roots', text:'Golden roots snake down from the ceiling and knot across one of the ways out.', fx:{ roots:3 } }
    ],
    encountersShared: [
      { id:'re-skeletons', label:'War-maiden skeletons', foes:[ { monster:SKELETON, count:'1d6', solo:1 } ], noSneak:false },
      { id:'re-ghost', label:'The elf-ghost', foes:[ { ref:'Ghost', name:'Elf-ghost' } ], noSneak:true,
        endable:{ label:'Give back her sword', requires:'has:+1 longsword', note:'Hand the mithril longsword to the ghost', fx:{ take:'+1 longsword', say:'Her fingers close on the hilt, and ghost and sword are gone together. Somewhere far off, a long sigh.', flag:'sword-returned' } } },
      { id:'re-thief', label:'The thief', foes:[ { monster:THIEF } ] },
      { id:'re-creeper', label:'Cave creeper', foes:[ { monster:CREEPER } ] },
      { id:'re-armor', label:'Animated mithril armor', foes:[ { monster:ARMOR } ] }
    ],
    companions: {
      wren: { name:'Wren', hp:13, ac:13, atk:'1 shortsword +2 (1d6)', helps:['dex'], note:'A human thief. Fights at your side; her nimble hands give advantage on DEX checks.' }
    },
    actions: ['search','rest'],
    waypoints: [
      // 1 ─────────────────────────────────────────────────────────
      { id:'a1', name:'1. Burial Mound', short:'Burial Mound', start:true,
        text:'Root-wrapped pillars hold up the ceiling; sickly yellow flowers bloom along the roots. In the middle of the hall a burial mound of earth and stones rises almost to the vaults.',
        challenges:[
          { id:'mound', label:'Dig into the burial mound', choice:true, button:'Dig', hideIf:'mound-dug',
            success:'Your spade bites the earth — and the mound heaves. Six shapes claw out of it: skeletal war-maidens in rusted ring mail, crescent sickles in their fists.',
            onSuccess:{ flag:'mound-dug', encounter:'skeletons', now:'foes' } },
          { id:'coffin', label:'Pull the rotted coffin out of the mound', choice:true, button:'Open it', requires:'won:skeletons', hideIf:'coffin-open',
            success:'The lid falls apart in your hands. Among the mouldering bones: a mithril bracelet, a rune-etched mithril longsword with an amethyst pommel, two scroll cases and a moonstone stylus wrapped in silver ribbon.',
            onSuccess:{ flag:'coffin-open', loot:[
              { name:'Mithril bracelet', note:'Worth 25 gp', xp:1 },
              { name:'+1 Longsword', note:'Enchanted mithril, an amethyst in the pommel. +1 to attack and damage; the amethyst glows when secret doors or hidden crawls are near.', xp:3, flag:'got-sword' },
              { name:'Scroll: Fireball', note:'An infernal vellum scroll in a charred glass tube. DC 13 INT: 3d6 to everything in a near-sized cube.', xp:1 },
              { name:'Scroll: Invisibility', note:'Tree bark inked with runes. DC 12 INT: invisible until a hostile action or a failed check.', xp:1 },
              { name:'Full moon guidance stone', note:'A moonstone stylus. Once, write a two-word message anywhere in the dungeon; it glows for the next group who comes.', xp:1 } ] } }
        ],
        encounters:[ { id:'skeletons', label:'War-maiden skeletons', hidden:true, foes:[ { monster:SKELETON, count:6, solo:2 } ],
          chaos:{ from:1, chance:[2,6], events:[ { text:'Sickly yellow pollen drifts down from the root-flowers.', heroSave:{ stat:'con', dc:15, label:'Pollen (CON)', flagEach:'pollen', failText:'{name} breathes in the pollen and feels strangely drowsy.' } } ] },
          note:'The yellow root-flowers shed pollen while they fight.' } ],
        search:[ { id:'roots', text:'The yellow flowers on the roots give off a cloying pollen. Best not to breathe it too deeply.', fx:{ clue:{ id:'pollen', text:'The yellow root-flowers shed a cloying pollen — best not to breathe it in.' } } } ],
        exits:[ { to:'a2', label:'West into a sagging corridor' }, { to:'a8', label:'East down a long passage' } ],
        escapes:[ { label:'Climb the steps back up into the daylight', button:'Leave the tomb', note:'Ends the delve with whatever you carry.', done:'Out under the golden leaves' } ] },
      // 2 ─────────────────────────────────────────────────────────
      { id:'a2', name:'2. Sealing Corridor', short:'Sealing Corridor',
        text:'The walls sag inward, bound with roots. Halfway along the floor, plain to see, is a pressure plate. A seam in the wall behind you shows where something heavy could slide across.',
        challenges:[
          { id:'plate', label:'Step around the pressure plate', choice:true, button:'Step around', hideIf:['plate-past','dark-trip'], success:'You edge past the plate without touching it.', onSuccess:{ flag:'plate-past' }, requires:'lit' },
          { id:'plate-dark', label:'Feel your way past the pressure plate in the dark', stat:'dex', dc:12, requires:'!lit', hideIf:'plate-past',
            success:'Your foot finds the edge of the plate, and you step wide of it.', failure:'Click. Stone grinds — the wall slides shut behind you, sealing the way back to the burial mound.',
            onSuccess:{ flag:'plate-past' }, onFail:{ flag:['plate-past','sealed'] } },
          { id:'plate-press', label:'Press the plate on purpose', choice:true, button:'Press it', hideIf:'sealed', note:'The wall will slide across behind you.',
            success:'Stone grinds slowly across the corridor behind you. There\'s time to choose a side — you stay. The way back to the mound is sealed.', onSuccess:{ flag:['plate-past','sealed'] } }
        ],
        exits:[ { to:'a1', label:'Back east to the burial mound', requires:'!sealed', locked:'The wall has ground shut' }, { to:'a3', label:'North past the plate', requires:'plate-past', locked:'The pressure plate is in the way' } ] },
      // 3 ─────────────────────────────────────────────────────────
      { id:'a3', name:'3. Ruined Idol', short:'Ruined Idol',
        text:'The toppled remains of a great idol of the Dusk Queen lie in pieces; centipedes pick through the rubble after smaller vermin. A broken-down wall opens north into a cave. To the west, a rusted portcullis furred with yellow mold — through it you can make out a round chamber.',
        challenges:[
          { id:'mold', label:'Force the mold-covered portcullis', choice:true, button:'Force it', hideIf:'portcullis-open', note:'Anyone who disturbs or burns the yellow mold risks it.',
            success:'You heave at the bars. A cloud of yellow spores bursts over you.', onSuccess:{ saveAll:{ stat:'con', dc:21, label:'Yellow mold (CON)', onFail:{ kill:true, say:'{name} chokes on the spores. After a long, terrible minute, they are still.' }, after:{ flag:'portcullis-open', say:'The rusted portcullis grinds up at last.' } } } }
        ],
        search:[ { id:'mold', text:'The yellow mold on the portcullis is the deadly kind — its spores kill. Disturbing it, or burning it, would be a desperate act.', fx:{ clue:{ id:'mold', text:'The yellow mold on the portcullis kills whoever disturbs it (CON DC 21).' } } } ],
        exits:[ { to:'a2', label:'South to the sealing corridor' }, { to:'a4', label:'North through the broken wall' }, { to:'a7', label:'East along a narrow passage' }, { to:'a6', label:'West through the portcullis', requires:'portcullis-open', locked:'Rusted shut under the mold' } ] },
      // 4 ─────────────────────────────────────────────────────────
      { id:'a4', name:'4. Twilight Grotto', short:'Twilight Grotto',
        text:'Dim shafts of twilight fall through cracks in the ceiling onto a floor carpeted with bones and feathers. A silver chest sits in the middle of the grotto. Something big breathes in the shadows.',
        ambush:{ enc:'owlbear', notice:{ stat:'wis', dc:12, label:'Notice the lair', success:'Among the feathers you spot claw marks — and then the hulking, rotten shape in the shadows. It hasn\'t moved yet.', failure:'A dead owlbear lurches out of the shadows, beak gaping.' } },
        encounters:[ { id:'owlbear', label:'Owlbear zombie', hidden:true, foes:[ { monster:OWLBEAR } ], noSneak:true,
          chaos:{ from:2, events:[ { text:'Halfling youths peer down through a crack and pelt you with rocks!', hero:'1', label:'A thrown rock' }, { text:'A rock from the halfling youths above bounces off the owlbear\'s skull.', foe:'1d4', label:'A thrown rock' }, { text:'The halfling youths above hurl rocks at everyone below.', hero:'1', foe:'1d4', label:'A thrown rock' } ] },
          note:'From the second round, halfling youths throw rocks from above — at you, at it, or both.' } ],
        challenges:[
          { id:'chest', label:'Open the silver chest', choice:true, button:'Open', requires:'won:owlbear', hideIf:'chest-open',
            success:'Inside: shiny stones, bird eggs, trinkets — and a mud-caked holy symbol showing a great golden tree.',
            onSuccess:{ flag:'chest-open', loot:[ { name:'Trinkets and shiny stones', note:'Worth 10 gp', xp:1 }, { name:'Holy symbol of the golden tree', note:'Mud-caked; a great golden tree in relief.', xp:1, flag:'got-symbol' } ] } }
        ],
        exits:[ { to:'a3', label:'South to the ruined idol' }, { to:'a5', label:'West through a low crawl' } ] },
      // 5 ─────────────────────────────────────────────────────────
      { id:'a5', name:'5. Heroine\'s Tomb', short:'Heroine\'s Tomb',
        text:'Murals show an elvish warrior-woman in scale armor riding a basilisk into battle. The ceiling disappears into darkness. On a tiered dais stands a polished sarcophagus; mithril arrowheads lie scattered across the floor.',
        search:[ { id:'arrows', stat:'wis', dc:12, text:'The arrowheads all point the same way — they fell from high above. There\'s no trap on the sarcophagus itself… but whatever fired them is up in that dark ceiling.', failure:'Arrowheads, a dusty floor, a sarcophagus with no trap you can see.',
          fx:{ flag:'knows-arrows', clue:{ id:'arrows', text:'In the heroine\'s tomb, arrows fall from the dark ceiling — the sarcophagus is the trigger.' } } } ],
        challenges:[
          { id:'lid', label:'Heave the sarcophagus lid open together', sumStat:{ stat:'STR', need:30 }, button:'Heave', hideIf:'lid-open',
            success:'Stone scrapes on stone and the lid slides aside — and from the dark ceiling high above comes a hiss of magnetic arrows.',
            onSuccess:{ flag:'lid-open', saveAll:{ stat:'dex', dc:15, label:'Magnetic arrows (DEX)', advIf:'knows-arrows', onFail:{ damage:'1d4', flagEach:'arrowheads', say:'Magnetic arrowheads bury themselves in {name}\'s flesh — and stay there.' } } } },
          { id:'lid-alone', label:'Strain at the lid with everything you have', stat:'str', dc:18, hideIf:'lid-open', repeat:true, note:'Too heavy for one — unless you\'re very strong. (Solo call: a crowbar or pole makes it DC 12.)',
            success:'With a groan the lid slides aside — and a hiss of arrows answers from the ceiling.', failure:'The lid doesn\'t budge.',
            onSuccess:{ flag:'lid-open', saveAll:{ stat:'dex', dc:15, label:'Magnetic arrows (DEX)', advIf:'knows-arrows', onFail:{ damage:'1d4', flagEach:'arrowheads', say:'Magnetic arrowheads bury themselves in {name}\'s flesh — and stay there.' } } } },
          { id:'look-in', label:'Look inside the sarcophagus', choice:true, button:'Look', requires:'lid-open', hideIf:'crawl-found',
            success:'Empty — no body, no grave goods. But at the bottom, a hidden crawlway leads down.', onSuccess:{ flag:'crawl-found' } }
        ],
        uses:[ { item:['crowbar','pole','spear','staff'], label:'Lever the sarcophagus lid', stat:'str', dc:12, hideIf:'lid-open',
          success:'Your lever bites under the lid and it grinds aside — and arrows hiss down from the ceiling.', failure:'The lever slips; the lid stays put.',
          onSuccess:{ flag:'lid-open', saveAll:{ stat:'dex', dc:15, label:'Magnetic arrows (DEX)', advIf:'knows-arrows', onFail:{ damage:'1d4', flagEach:'arrowheads', say:'Magnetic arrowheads bury themselves in {name}\'s flesh — and stay there.' } } } } ],
        exits:[ { to:'a4', label:'East back to the grotto' }, { to:'a6', label:'Down the hidden crawl in the sarcophagus', requires:'crawl-found', showIf:'lid-open' } ] },
      // 6 ─────────────────────────────────────────────────────────
      { id:'a6', name:'6. Obelisk and Scepter', short:'Obelisk',
        text:'A round chamber around a hollow obelisk. Inside it, preserved and upright, stands an elvish warrior-woman in scale armor, a scepter in her hands and a jade scarab on her breast. The opening is just wide enough for an arm.',
        search:[ { id:'hands', stat:'wis', dc:12, text:'In the dirt in front of the body: withered, severed hands, grasping still. Look closely and you can see the thin slots around the opening — blades.', failure:'Dirt, dust, the body in the stone. You see nothing else.',
          fx:{ flag:'knows-blades', clue:{ id:'blades', text:'Blades guard the obelisk\'s opening — severed hands lie in the dirt in front of it.' } } } ],
        challenges:[
          { id:'disarm', label:'Disable the blades', stat:'dex', dc:18, requires:'knows-blades', hideIf:['blades-off','obelisk-taken'],
            success:'A wedge of steel in the right slot, a careful twist — something inside clunks and goes still.', failure:'Wrong slot. The blades scythe across the opening!',
            onSuccess:{ flag:'blades-off' }, onFail:{ attack:{ name:'Obelisk blades', bonus:5, dmg:'2d6', hitText:'The blades bite deep.', missText:'You snatch your hand back just in time.' } } },
          { id:'obelisk', label:'Reach into the obelisk', options:[
            { id:'grab', label:'Take the scepter, scarab and ring', hideIf:'obelisk-taken',
              text:'You reach in among the dead woman\'s treasures.',
              fx:{ flag:'obelisk-taken', ifFlag:'blades-off', then:{ say:'Nothing stirs. You draw out the scepter, the scarab and a mithril signet ring.' },
                   'else':{ attack:{ name:'Obelisk blades', bonus:5, dmg:'2d6', hitText:'Blades scythe across the opening and bite your arm — but you come away with the prize.', missText:'Blades scythe across the opening — you jerk free with the prize, untouched.' } },
                   loot:[ { name:'Scepter of the Dusk Queen', note:'Gold and onyx. Its twin is a crown.', xp:3, flag:'got-scepter' }, { name:'Scarab of drain resistance', note:'A polished jade scarab on a brass chain. Absorbs 10 points of life drain, then turns to sand.', xp:3 }, { name:'Mithril signet ring', note:'Worth 50 gp', xp:1 } ] } } ] }
        ],
        exits:[ { to:'a5', label:'Up the crawl into the heroine\'s tomb' }, { to:'a3', label:'East through the portcullis', requires:'portcullis-open', locked:'The portcullis is rusted shut' } ] },
      // 7 ─────────────────────────────────────────────────────────
      { id:'a7', name:'7. Scoured Passageway', short:'Scoured Passage',
        text:'A narrow, damp-walled corridor, strangely clean — not a pebble, not a bone. Halfway down, a human skeleton seems to float in the air.',
        ambush:{ enc:'cube', notice:{ stat:'wis', dc:12, label:'Something\'s wrong here', success:'Floating bones, a floor scoured clean — a gelatinous cube fills the passage, all but invisible. It hasn\'t noticed you yet.', failure:'The air in front of you quivers and folds around you — a gelatinous cube!' } },
        encounters:[ { id:'cube', label:'Gelatinous cube', hidden:true, foes:[ { monster:CUBE } ], noSneak:true, note:'It fills the passage: there\'s no way past it.',
          onWin:{ say:'In the cube\'s dissolving remains, the skeleton slumps to the floor. Around its neck, a locket.', loot:[ { name:'Locket', note:'Painted inside: a young human man and an elvish woman.', xp:1, flag:'got-locket' } ] } } ],
        exits:[ { to:'a3', label:'South-west to the ruined idol' }, { to:'a13', label:'North to a pillared hall', requires:'won:cube', locked:'The cube blocks the passage' } ] },
      // 8 ─────────────────────────────────────────────────────────
      { id:'a8', name:'8. Hall of Plaster', short:'Hall of Plaster',
        text:'A high, vaulted hall. Cast-iron braziers hang from the ceiling like cages. Plaster murals cover the walls: women harvesting wheat by the light of a colossal golden tree. Faintly, from nowhere, women\'s voices sing a harvest hymn. An archway in the south-east wall opens on a collapsed stair, and in the far corner a green mist hangs in the shape of a doorway.',
        challenges:[
          { id:'murals', label:'Study the harvest murals', choice:true, button:'Study', hideIf:'murals-seen',
            success:'The harvesters look up at a crowned figure under the tree — the Dusk Queen herself, painted larger than the rest, her crown picked out in flaking gold.', onSuccess:{ flag:'murals-seen' } },
          { id:'queen-image', label:'Search the painted Dusk Queen closely', choice:true, button:'Search her image', requires:'murals-seen', hideIf:'secret-door',
            success:'One stone in the painted crown is a button. You press it: with a grating sigh a section of mural swings inward — a secret door.', onSuccess:{ flag:'secret-door' } },
          { id:'stairs', label:'Climb down the collapsed stairway', choice:true, button:'Climb down', hideIf:'morwen-seen',
            success:'Thirty feet down, over a fan of broken stone and a half-buried body, hangs the pale ghost of a young elven woman. She is weeping.', onSuccess:{ flag:'morwen-seen' } },
          { id:'corpse', label:'Search Morwen\'s remains', choice:true, button:'Search', requires:'morwen-seen', hideIf:'corpse-searched',
            success:'Under the rubble: a fragile silver spear and a fine grey cloak with an elvish word-lock on its clasp (solo call for the book\'s random utility item).',
            onSuccess:{ flag:'corpse-searched', loot:[ { name:'Silver spear (fragile)', note:'Counts as silver. Breaks after two hits (DC 18 INT to repair once).', xp:1 }, { name:'Morwen\'s grey cloak', note:'Utility magic item. Speak its word and it grants advantage on DEX checks to sneak and hide. Without the word, it\'s just a cloak.', xp:3 } ] } }
        ],
        flagNotes:{ 'has:+1 longsword':'The amethyst in your mithril sword\'s pommel glows faintly here — near the painted queen.' },
        talk:[ { id:'morwen', name:'Morwen, the weeping ghost', label:'Speak to the ghost on the stairs', requires:'morwen-seen', start:'start', nodes:{
          start:{ text:'“I should have died where he could see me,” she whispers. “Not down here, under the stones, alone.”', options:[
            { id:'who', label:'Who are you?', to:'who', once:true },
            { id:'tomb', label:'What do you know of this place?', to:'tomb', once:true },
            { id:'locket', label:'Show her the locket', requires:'has:locket', to:'locket', once:true } ] },
          who:{ text:'“Morwen. The Dusk Queen was my great-great-grandmother. I came to prove the blood true. I opened a door with a scroll, and then the stair fell.”', options:[ { id:'tomb2', label:'A door?', to:'tomb' }, { id:'bye', label:'Leave her to her grief', to:'end' } ] },
          tomb:{ text:'“The green door is mine — a scroll of passage. It leads to the hall of the statues, before the queen\'s own doors. Those doors open only to her holy symbol, raised high — the golden tree. Anyone else is burned for the insult. I had no symbol. I was so close.”',
            fx:{ clue:{ id:'symbol', text:'Morwen: the doors of the royal hall open only to the Dusk Queen\'s holy symbol — the golden tree — raised high. Anyone else is burned.' } }, options:[ { id:'bye2', label:'Thank her', to:'end' } ] },
          locket:{ text:'She reaches for the locket and her fingers pass through it. “He waited for me. He waited.” She smiles for the first time. “Take this, then: the word on my cloak is vála. Say it, and it will serve you.”',
            fx:{ flag:'vala', clue:{ id:'vala', text:'Morwen\'s cloak answers to the elvish word “vála”.' } }, options:[ { id:'bye3', label:'Thank her', to:'end' } ] },
          end:{ text:'She turns back to the stones.', end:true } } } ],
        exits:[ { to:'a1', label:'West to the burial mound' }, { to:'a9', label:'East to a round chamber' }, { to:'a10', label:'Through the secret door in the mural', requires:'secret-door', showIf:'secret-door' },
                { to:'a13', label:'Step through the green misty doorway', note:'Morwen\'s magic door' } ] },
      // 9 ─────────────────────────────────────────────────────────
      { id:'a9', name:'9. False Crown', short:'False Crown',
        text:'A round chamber walled with mithril plates showing the Dusk Queen on her throne. High above, a crescent-shaped opening lets moonlight fall on a crown resting on a pedestal. It smells of spoiled meat.',
        ambush:{ enc:'creepers', notice:{ stat:'wis', dc:15, label:'Look up', success:'Chittering above — two cave creepers clinging to the mithril walls, waiting for you to reach the crown.', failure:'Two horse-sized centipedes drop from the walls!' } },
        encounters:[ { id:'creepers', label:'Cave creepers (a mated pair)', hidden:true, foes:[ { monster:CREEPER, count:2, solo:1 } ] } ],
        challenges:[ { id:'crown', label:'Inspect the crown up close', choice:true, button:'Inspect', hideIf:'false-crown',
          success:'Painted gold over rotted wood. A fake — bait.', onSuccess:{ flag:'false-crown', clue:{ id:'false-crown', text:'The moonlit crown is a fake: rotted wood painted gold.' } } } ],
        exits:[ { to:'a8', label:'West back to the hall of plaster' } ] },
      // 10 ────────────────────────────────────────────────────────
      { id:'a10', name:'10. Enchanted Mosaic', short:'Mosaic',
        text:'A small chamber. On the wall, a mosaic of painted stones: a robed woman faces a range of peaks, arms raised in joy toward an enormous crescent moon.',
        challenges:[ { id:'touch', label:'Touch the mosaic', choice:true, button:'Touch', hideIf:'oracle-woke',
          success:'The stones ripple and rearrange. The robed woman turns and beckons. “I am the Oracle of Dusk. Ask me one thing about this place — yes or no — and I will tell you true.”', onSuccess:{ flag:'oracle-woke' } } ],
        talk:[ { id:'oracle', name:'The Oracle of Dusk', label:'Ask the Oracle of Dusk one question', requires:'oracle-woke', hideIf:'oracle-asked', start:'start', nodes:{
          start:{ text:'“One question. Choose it well.”', noLeave:true, options:[
            { id:'q1', label:'Is the crown in the moonlit chamber the true crown?', to:'no', fx:{ flag:'oracle-asked', clue:{ id:'oq-crown', text:'The Oracle of Dusk: the moonlit crown is NOT the true crown.' } } },
            { id:'q2', label:'Is the true crown where the lizard-stink is?', to:'yes', fx:{ flag:'oracle-asked', clue:{ id:'oq-crown2', text:'The Oracle of Dusk: the true crown lies where the lizard-stink is.' } } },
            { id:'q3', label:'Will the gelatinous cube spare the bearer of the holy symbol?', to:'no', fx:{ flag:'oracle-asked', clue:{ id:'oq-cube', text:'The Oracle of Dusk: the cube does NOT spare the bearer of the holy symbol.' } } },
            { id:'q4', label:'Is the fireball scroll cursed?', to:'no', fx:{ flag:'oracle-asked', clue:{ id:'oq-fire', text:'The Oracle of Dusk: the fireball scroll is NOT cursed.' } } },
            { id:'q5', label:'Is the Dusk Queen truly dead?', to:'no', fx:{ flag:'oracle-asked', clue:{ id:'oq-queen', text:'The Oracle of Dusk: the Dusk Queen is NOT truly dead.' } } } ] },
          yes:{ text:'“Yes.” The stones settle, and she is only a picture again.', end:true },
          no:{ text:'“No.” The stones settle, and she is only a picture again.', end:true } } } ],
        exits:[ { to:'a8', label:'Back through the secret door' }, { to:'a11', label:'North through a narrow crawl' } ] },
      // 11 ────────────────────────────────────────────────────────
      { id:'a11', name:'11. Bonfire', short:'Bonfire',
        text:'A cramped, damp, mossy cave. In the middle, a ring of stones around an old bonfire; some kindling remains.',
        challenges:[ { id:'bonfire', label:'Light the bonfire and rest around it together', choice:true, button:'Light it', requires:'lit', hideIf:'bonfire-lit', note:'Once per delve: it must be lit, and used by everyone together.',
          success:'Warmth spreads through the little cave, far more than so small a fire should give. You sit in silence around the crackling flames. What is each of you thinking about? When you rise, your wounds are closed and your minds clear.',
          onSuccess:{ flag:'bonfire-lit', heal:'full', all:true, restoreSpells:true } } ],
        exits:[ { to:'a10', label:'South to the mosaic' }, { to:'a12', label:'North into a reeking cave' } ] },
      // 12 ────────────────────────────────────────────────────────
      { id:'a12', name:'12. Charnel Basilisk', short:'Charnel Cave',
        text:'Stalactites and stalagmites like the fangs of some great beast. Rainwater runs down the walls into puddles where stone urns lie spilled and eroding. It reeks of lizard and rotten eggs, and something is crunching rock.',
        onEnter:{ encounter:'basilisk' },
        encounters:[ { id:'basilisk', label:'Basilisk', hidden:true, foes:[ { monster:BASILISK } ], noSneak:false, sneakDc:15, note:'It\'s eating the urns — and it defends its nest. Its gaze turns flesh to stone.',
          combatActions:[ { id:'urns', label:'Grab through the urns while it fights', button:'Search (1-in-6)', note:'Takes your action.', chance:[1,6], miss:'Shards and ash — nothing.', fx:{ flag:'crown-found', loot:[ { name:'Crown of the Dusk Queen', note:'Gold leaves on a circlet of onyx. Its twin is the scepter.', xp:3, flag:'got-crown' } ] }, max:6, hideIf:'crown-found' } ] } ],
        challenges:[
          { id:'spilled', label:'Gather what spilled from the urns', choice:true, button:'Gather', requires:'won:basilisk', hideIf:'spilled-taken',
            success:'Wedding bands by the handful — and a matched pair of rings with elvish marriage vows engraved inside.',
            onSuccess:{ flag:'spilled-taken', loot:[ { name:'Wedding bands', note:'Worth 25 gp', xp:1 }, { name:'Ring of protection', note:'Shatter it to cancel one attack against you. Engraved with elvish vows.', xp:3 }, { name:'Ring of protection', note:'The other of the pair.', xp:3, qty:1 } ] } },
          { id:'search-urns', label:'Search the urns', choice:true, button:'Search', requires:'won:basilisk', hideIf:'crown-found',
            success:'Deep in the biggest urn, under the ash: a crown of gold leaves on an onyx circlet.', onSuccess:{ flag:'crown-found', loot:[ { name:'Crown of the Dusk Queen', note:'Gold leaves on a circlet of onyx. Its twin is the scepter.', xp:3, flag:'got-crown' } ] } }
        ],
        exits:[ { to:'a11', label:'South to the bonfire cave' } ] },
      // 13 ────────────────────────────────────────────────────────
      { id:'a13', name:'13. Royal Hall', short:'Royal Hall',
        text:'A long hall lined with statues of armored elvish women, each holding up a holy symbol stamped with a moon and a great tree. At the far end, sealed double doors without handles, carved with the tree and mourning women. It smells, absurdly, of cinnamon baking.',
        challenges:[ { id:'doors', label:'Try to open the sealed doors', choice:true, button:'Push', hideIf:'doors-open', note:'There are no handles.',
          success:'The carved tree on the doors bursts into painted flame. Heat swells through the hall.',
          onSuccess:{ saveAll:{ stat:'con', dc:18, label:'The burning tree (CON)', onFail:{ damage:'1d6', needsLight:true, say:'The heat sears {name} through every flame they carry.' }, after:{ lightOut:true, say:'A foul wind howls through the hall and snuffs every flame. The doors stay shut.' } } } } ],
        uses:[ { item:['holy symbol'], label:'Raise the holy symbol to the doors', hideIf:'doors-open',
          success:'You lift the golden tree high. The statues\' symbols answer with a soft glow, and the great doors swing silently open.', onSuccess:{ flag:'doors-open' } } ],
        exits:[ { to:'a7', label:'South down the scoured passage' }, { to:'a8', label:'Step through the green misty doorway', note:'Back to the hall of plaster' }, { to:'a14', label:'North through the great doors', requires:'doors-open', locked:'Sealed' } ] },
      // 14 ────────────────────────────────────────────────────────
      { id:'a14', name:'14. Grand Tomb of Dusk', short:'Grand Tomb',
        text:'A vast hall. Massive round columns are wrapped in shifting roots as thick as sea serpents, glowing from within with a golden light that pulses like a heartbeat. Motes drift like fireflies. At one end, a throne of coal-black marble holds a ten-foot statue of the Dusk Queen — her crown and scepter missing. At the other end, a well.',
        challenges:[
          { id:'regalia', label:'Return the scepter and crown to the statue', choice:true, button:'Return them', requires:['has:scepter of the dusk','has:crown of the dusk'], hideIf:'throne-open',
            success:'Scepter in her hand, crown on her brow — the throne grinds back to reveal a sarcophagus of onyx glittering like the first stars of twilight.', onSuccess:{ take:['Scepter of the Dusk Queen','Crown of the Dusk Queen'], flag:'throne-open' } },
          { id:'sarc', label:'Open the onyx sarcophagus', choice:true, button:'Open', requires:'throne-open', hideIf:'sarc-open',
            success:'Inside, wrapped in jewelry and grave-cloth, the Dusk Queen opens her eyes. “The hour has come, when the true queen of this land wakes. Your kind shall kneel to me once more!”',
            onSuccess:{ flag:'sarc-open', encounter:'queen', now:'foes' } },
          { id:'hoard', label:'Take what lies in the sarcophagus', choice:true, button:'Take it', requires:'won:queen', hideIf:'hoard-taken',
            success:'Exquisite jewelry, a fizzing potion, a scroll tube that crackles with static — and a heavy iron key.',
            onSuccess:{ flag:'hoard-taken', objective:true, loot:[ { name:'The Dusk Queen\'s jewelry', note:'Worth 600 gp', xp:10 }, { name:'Potion of Extra-Healing', note:'Fizzy, lemon-vanilla. Regain 10 HP.', xp:1 }, { name:'Scroll: Lightning Bolt', note:'Opening the tube gives a static shock. DC 13 INT: 5d6 to one creature within near.', xp:1 }, { name:'Well-gaol key', note:'Heavy iron.', xp:0, flag:'got-key' } ] } },
          { id:'pick-well', label:'Pick the lock of the iron door at the bottom of the well', stat:'dex', dc:24, hideIf:['well-open'], repeat:true, note:'Twenty feet of brackish water, darkness and pressure: nearly impossible.',
            success:'Somehow, blind and breathless, you feel the lock give.', failure:'You come up gasping. The lock hasn\'t moved.', onSuccess:{ flag:'well-open' } }
        ],
        uses:[ { item:['well-gaol key'], label:'Dive down and unlock the iron door in the well', hideIf:'well-open', success:'The key turns. The water roars away down a spiral stair into the deep — the well is dry.', onSuccess:{ flag:'well-open' } } ],
        encounters:[ { id:'queen', label:'The Dusk Queen', hidden:true, foes:[ { monster:QUEEN } ], noSneak:true, noFlee:false, objective:true, note:'She casts charm and mirror image, and drains life with her curse.' } ],
        escapes:[ { label:'Descend the spiral stair below the drained well', requires:'well-open', button:'Go deeper', note:'Into the mysterious underworld beneath the golden tree — the delve ends here.', done:'Down the spiral stair, into the deep', fx:{ flag:'went-deeper' } } ],
        exits:[ { to:'a13', label:'South back to the royal hall' } ] }
    ],
    hints: [
      { at:'a1', requires:'won:skeletons', unless:'coffin-open', text:'The skeletons rose from the mound to guard something. Whatever was buried in it is still there.' },
      { at:'a2', requires:'!sealed', unless:'plate-past', text:'The plate is obvious. Stepping around it is easy — in the light.' },
      { at:'a3', requires:'clue:mold', text:'The mold kills. There is surely another way into that round chamber.' },
      { at:'a5', requires:'lid-open', unless:'crawl-found', text:'Why would a heroine\'s tomb be empty? Look inside.' },
      { at:'a5', unless:['lid-open','knows-arrows'], text:'Those arrowheads came from somewhere. Search the room before you touch the sarcophagus.' },
      { at:'a6', requires:'clue:blades', unless:'blades-off', text:'You know about the blades. A steady hand might stop them — or you could just accept the cut.' },
      { at:'a6', requires:'clue:thief-blades', unless:'knows-blades', text:'Wren warned you about blades. Search before you reach in.' },
      { at:'a8', requires:'rumor:4', unless:'secret-door', text:'“Those who harvest the sacred wheat keep a secret.” The murals here show harvesters.' },
      { at:'a8', requires:'has:+1 longsword', unless:'secret-door', text:'The amethyst in your sword glows here. Something hidden is near — look at the painted queen.' },
      { at:'a8', requires:'morwen-seen', unless:'clue:symbol', text:'The ghost knows this tomb. Ask her about it.' },
      { at:'a8', requires:'has:locket', unless:'vala', text:'The locket\'s portrait: a young man and an elvish woman. Who in this tomb would want it?' },
      { at:'a13', requires:'clue:symbol', unless:'doors-open', text:'Morwen told you how these doors open. Do you carry the golden tree?' },
      { at:'a13', requires:'has:holy symbol', unless:'doors-open', text:'The statues all raise the same symbol you found in the grotto.' },
      { at:'a14', unless:'throne-open', requires:['has:scepter of the dusk','has:crown of the dusk'], text:'The statue is missing two things. You carry both.' },
      { at:'a14', requires:'clue:false-crown', unless:['has:crown of the dusk','throne-open'], text:'The moonlit crown was a fake. A queen\'s crown would be somewhere else — somewhere guarded.' },
      { at:'a14', requires:'got-key', unless:'well-open', text:'A heavy iron key, and a well with an iron door at the bottom.' }
    ],
    epilogue: [
      { requires:'won:queen', text:'Behind you, the Dusk Queen lies still at last among the golden roots — truly dead this time, or so you hope.' },
      { requires:'sarc-open', unless:'won:queen', text:'Behind you, the Dusk Queen has risen. The golden tree has its daughter back.' },
      { requires:'vala', text:'Morwen\'s ghost was gone from the stair when you passed it last, the locket\'s promise kept.' },
      { requires:'sword-returned', text:'Somewhere in the catacombs, an elvish warrior sleeps again with her sword.' },
      { requires:'went-deeper', text:'The spiral stair beneath the well goes down and down, into the mysterious underworld beneath the golden tree. That is another story.' },
      { requires:'!went-deeper', text:'The scepter and crown would fetch 300 gp as a pair — if anyone left them unclaimed.' }
    ],
    discoveries: [
      { flag:'coffin-open', label:'The rotted coffin in the burial mound' },
      { flag:'crawl-found', label:'The hidden crawl in the heroine\'s tomb' },
      { flag:'secret-door', label:'The secret door in the painted queen' },
      { flag:'oracle-asked', label:'The Oracle of Dusk' },
      { flag:'bonfire-lit', label:'The warm bonfire' },
      { flag:'vala', label:'Morwen\'s word' },
      { flag:'crown-found', label:'The true crown' },
      { flag:'throne-open', label:'The onyx sarcophagus' },
      { flag:'well-open', label:'The way beneath the well' }
    ],
    achievements: [
      { id:'dq-queen', label:'Queen-slayer', desc:'Laid the Dusk Queen to rest.', requires:'won:queen' },
      { id:'dq-regalia', label:'Crown and Scepter', desc:'Returned the regalia to the throne.', requires:'throne-open' },
      { id:'dq-unhurt', label:'Steady Hands', desc:'Disabled the obelisk\'s blades.', requires:'blades-off' },
      { id:'dq-lovers', label:'He Waited', desc:'Brought Morwen her locket.', requires:'vala' },
      { id:'dq-deeper', label:'Deeper Still', desc:'Went down the spiral stair beneath the well.', requires:'went-deeper' },
      { id:'dq-honest', label:'Grave Manners', desc:'Gave the elf-ghost back her sword.', requires:'sword-returned' }
    ]
  }]
});
})();
