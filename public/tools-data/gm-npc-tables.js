// ── GM Screen NPC Generator tables ─────────────────────────────────────────
// Per-system data consumed by genNPC() in gm_screen.html. Each system entry is
// genre-appropriate; genNPC switches on window.GM_SYSTEM (falls back to SD).
//
// Contract per system:
//   kindLabel : label for the ancestry/species picker (Ancestry / Species / …)
//   kinds     : array of species/heritage to roll+display, or null for a
//               setting with no species axis (modern-human) — the picker hides.
//   names     : { <Kind>: [..first names..], _: [..fallback / used when kinds null..] }
//   builds/hair/eyes : appearance phrase pools (hair/eyes optional per system)
//   features  : distinguishing-feature phrases
//   dress     : { Poor:[..], Standard:[..], Wealthy:[..] } keyed by wealth
//   demeanor/quirks/wants/secrets/occupations : flat phrase pools
//   coin      : { Poor:fn, Standard:fn, Wealthy:fn } → currency string
//   age       : function(kind) → age string
//
// Self-contained RNG (this file loads before the main GM-screen script scope):
(function () {
  var _d = function (n) { return Math.floor(Math.random() * n) + 1; };      // 1..n
  var _pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

  // ── Shared low-signal appearance pools (reused across human settings) ──────
  var BUILD_STD = ['stocky', 'lean', 'wiry', 'heavyset', 'lanky', 'muscular', 'slender', 'broad-shouldered', 'average', 'rangy', 'compact', 'willowy', 'barrel-chested', 'gaunt'];
  var HAIR_STD  = ['black', 'dark brown', 'chestnut', 'auburn', 'red', 'ash blonde', 'sandy', 'silver', 'grey', 'white', 'bald', 'close-cropped', 'salt-and-pepper'];
  var EYES_STD  = ['brown', 'hazel', 'grey', 'green', 'blue', 'amber', 'dark', 'pale blue', 'steel-grey', 'deep brown'];
  var FEAT_STD  = ['a scar across the cheek', 'a crooked nose', 'calloused hands', 'a missing finger', 'bright, alert eyes', 'a guarded expression', 'an easy smile', 'deep-set eyes', 'prominent eyebrows', 'laugh lines', 'a weathered face', 'a nervous tic', 'a booming voice', 'a limp', 'ink-stained fingers', 'a gold tooth'];
  var DEMEANOR_STD = ['gruff', 'cheerful', 'nervous', 'suspicious', 'friendly', 'melancholy', 'boisterous', 'quiet', 'arrogant', 'humble', 'distracted', 'eager', 'wary', 'jovial', 'weary', 'sharp-tongued', 'earnest', 'aloof'];
  var QUIRK_STD = ['drums fingers when thinking', 'never makes eye contact', 'talks too loudly', 'laughs at the wrong moments', 'quotes old proverbs constantly', 'hums under their breath', 'picks at fingernails', 'checks behind them frequently', 'always chewing something', 'repeats your last few words', 'collects small trinkets', 'refuses to sit with their back to a door', 'speaks in the third person', 'counts things obsessively', 'never gives a straight answer'];

  window.GM_NPC_TABLES = {

    // ── SHADOWDARK (fantasy — the original set) ────────────────────────────
    SD: {
      kindLabel: 'Ancestry',
      kinds: ['Human', 'Human', 'Human', 'Dwarf', 'Elf', 'Halfling', 'Half-Orc', 'Goblin'],
      names: {
        Dwarf:    ['Hera', 'Torin', 'Ginny', 'Gant', 'Olga', 'Dendor', 'Ygrid', 'Pike', 'Sarda', 'Brigg', 'Zorlin', 'Yorin', 'Jorgen', 'Trogin', 'Riga', 'Barton', 'Katrina', 'Egrim', 'Elsa', 'Orgo'],
        Elf:      ['Sarenia', 'Ravos', 'Imeria', 'Farond', 'Isolden', 'Kieren', 'Mirenel', 'Riarden', 'Allindra', 'Arlomas', 'Sylara', 'Tyr', 'Rinariel', 'Saramir', 'Vedana', 'Elindos', 'Ophelia', 'Cydaros', 'Tiramel', 'Varond'],
        Goblin:   ['Kog', 'Dibbs', 'Fronk', 'Irv', 'Squag', 'Mort', 'Vig', 'Sticks', 'Gorb', 'Yogg', 'Plok', 'Zrak', 'Dent', 'Krik', 'Bort', 'Mizzo', 'Nabo', 'Hink', 'Kreeb', 'Bree'],
        Halfling: ['Myrtle', 'Robby', 'Nora', 'Percy', 'Daisy', 'Jolly', 'Evelyn', 'Horace', 'Willie', 'Gertie', 'Peri', 'Carlsby', 'Nyx', 'Kellan', 'Fern', 'Harlow', 'Moira', 'Sage', 'Reenie', 'Wendry'],
        'Half-Orc': ['Boraal', 'Troga', 'Zoraal', 'Urgan', 'Krell', 'Scalgin', 'Voraga', 'Morak', 'Draga', 'Sorak', 'Ulgar', 'Varga', 'Kresh', 'Jala', 'Torvash', 'Zana', 'Gartak', 'Rokara', 'Ziraak', 'Iskana'],
        Human:    ['Hesta', 'Matteo', 'Rosalin', 'Endric', 'Kiara', 'Yao', 'Corina', 'Rowan', 'Hariko', 'Ikam', 'Mariel', 'Jin', 'Hana', 'Lios', 'Indra', 'Remy', 'Nura', 'Vakesh', 'Una', 'Nabilo']
      },
      builds: BUILD_STD, hair: HAIR_STD, eyes: EYES_STD, features: FEAT_STD, demeanor: DEMEANOR_STD, quirks: QUIRK_STD,
      dress: {
        Poor: ['tattered rags', 'patched wool', 'worn leather', 'dirty linen', 'frayed homespun'],
        Standard: ['sturdy wool', 'clean linen', 'simple leather', 'serviceable clothes', 'travelling gear'],
        Wealthy: ['fine silk', 'embroidered cloth', 'well-tailored wool', 'polished leather', 'rich velvet']
      },
      wants: ['coin', 'information', 'protection', 'revenge', 'passage somewhere', 'a specific item', 'to be left alone', 'to impress someone', 'honest work', 'a hot meal', 'a missing person found', 'a debt forgiven'],
      secrets: ['owes a dangerous debt', "witnessed something they shouldn't have", 'is wanted elsewhere', 'is not who they claim to be', 'hides a useful skill', 'carries something valuable', 'is being followed', 'has a score to settle', 'serves a hidden master', 'is cursed'],
      occupations: ['farmer', 'blacksmith', 'merchant', 'innkeeper', 'guard', 'beggar', 'priest', 'healer', 'scholar', 'scribe', 'hunter', 'herbalist', 'sailor', 'soldier', 'thief', 'miner', 'carpenter', 'baker', 'shepherd', 'fisherman'],
      coin: { Poor: function () { return _d(6) + ' cp'; }, Standard: function () { return _d(6) + ' sp, ' + _d(6) + ' cp'; }, Wealthy: function () { return (_d(6) * 5) + ' gp, ' + _d(6) + ' sp'; } },
      age: function (k) { return k === 'Goblin' ? String(_d(20) + 5) : k === 'Elf' ? String(_d(400) + 50) : k === 'Dwarf' ? String(_d(200) + 30) : String(_d(40) + 15); }
    },

    // ── DUNGEONS & DRAGONS (classic-fantasy, its own set) ──────────────────
    DND: {
      kindLabel: 'Race',
      kinds: ['Human', 'Human', 'Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Tiefling', 'Dragonborn'],
      names: {
        Human:      ['Aldric', 'Seraphina', 'Barrett', 'Lira', 'Cassius', 'Mira', 'Dorn', 'Selene', 'Garrick', 'Ophelia', 'Tomas', 'Belen', 'Rhea', 'Quillon', 'Isolde', 'Marek', 'Yara', 'Falken', 'Nadia', 'Corwin'],
        Elf:        ['Aramil', 'Silaqui', 'Thamior', 'Naivara', 'Erevan', 'Shava', 'Aelar', 'Birel', 'Enna', 'Galinndan', 'Mindartis', 'Quelenna', 'Soveliss', 'Thia', 'Varis', 'Lia', 'Hadarai', 'Meriele', 'Peren', 'Ielenia'],
        Dwarf:      ['Adrik', 'Kathra', 'Baern', 'Gunnloda', 'Dain', 'Vistra', 'Thoradin', 'Hlin', 'Eberk', 'Sannl', 'Rurik', 'Amber', 'Brottor', 'Diesa', 'Harbek', 'Gurdis', 'Morgran', 'Torbera', 'Ulfgar', 'Bardryn'],
        Halfling:   ['Alton', 'Cora', 'Milo', 'Portia', 'Lyle', 'Verna', 'Osborn', 'Seraphina', 'Roscoe', 'Amaryllis', 'Eldon', 'Jillian', 'Finnan', 'Nedda', 'Lidda', 'Merla', 'Garret', 'Andry', 'Wellby', 'Callie'],
        Gnome:      ['Alston', 'Bimpnottin', 'Dimble', 'Ella', 'Fonkin', 'Loopmottin', 'Namfoodle', 'Roywyn', 'Seebo', 'Nissa', 'Warryn', 'Zanna', 'Boddynock', 'Duvamil', 'Gerbo', 'Mardnab', 'Orryn', 'Tana', 'Zook', 'Lorilla'],
        'Half-Orc': ['Grennik', 'Ownka', 'Dench', 'Baggi', 'Feng', 'Emen', 'Holg', 'Kansif', 'Mhurren', 'Neega', 'Ront', 'Ovak', 'Shump', 'Sutha', 'Thokk', 'Vola', 'Krusk', 'Engong', 'Myev', 'Gell'],
        Tiefling:   ['Akmenos', 'Damaia', 'Barakas', 'Kallista', 'Leucis', 'Nemeia', 'Mordai', 'Orianna', 'Skamos', 'Phelaia', 'Therai', 'Rieta', 'Iados', 'Ea', 'Hope', 'Torment', 'Creed', 'Sorrow', 'Ambition', 'Mayhem'],
        Dragonborn: ['Arjhan', 'Akra', 'Balasar', 'Biri', 'Donaar', 'Farideh', 'Ghesh', 'Harann', 'Kriv', 'Kava', 'Medrash', 'Nala', 'Pandjed', 'Perra', 'Rhogar', 'Surina', 'Torinn', 'Thava', 'Kerkan', 'Uadjit']
      },
      builds: BUILD_STD, hair: HAIR_STD, eyes: EYES_STD, features: FEAT_STD, demeanor: DEMEANOR_STD, quirks: QUIRK_STD,
      dress: {
        Poor: ['threadbare tunic', 'patched cloak', 'worn traveling clothes', 'stained apron', 'faded homespun'],
        Standard: ['practical leathers', 'clean woolens', 'a serviceable cloak', 'guild-marked garb', 'sturdy road clothes'],
        Wealthy: ['fine brocade', 'a fur-trimmed cloak', 'tailored velvet', 'jeweled trappings', 'polished half-plate']
      },
      wants: ['gold', 'a patron', 'a lost heirloom recovered', 'safe passage', 'revenge on a rival', 'a monster dealt with', 'admittance to a guild', 'a rumor confirmed', 'an escort', 'a cure for an ailment', 'to clear their name'],
      secrets: ['is secretly a cultist', 'owes a devil a favor', 'is the heir to a fallen house', 'smuggles contraband', 'knows where a relic is hidden', 'is a wanted fugitive', 'is possessed by something', 'spies for a distant power', 'faked their own death', 'made a pact for their gift'],
      occupations: ['tavern keeper', 'blacksmith', 'town guard', 'temple acolyte', 'court wizard', 'merchant', 'sellsword', 'scholar', 'herbalist', 'noble', 'hedge mage', 'stablehand', 'fence', 'bard', 'caravan master', 'ratcatcher', 'alchemist', 'gravedigger', 'tax collector', 'squire'],
      coin: { Poor: function () { return _d(10) + ' sp'; }, Standard: function () { return _d(8) + ' gp'; }, Wealthy: function () { return (_d(6) * 10 + 20) + ' gp, a gem worth ' + (_d(4) * 25) + ' gp'; } },
      age: function (k) { return k === 'Elf' ? String(_d(500) + 40) : k === 'Dwarf' ? String(_d(250) + 40) : k === 'Gnome' ? String(_d(300) + 40) : k === 'Halfling' ? String(_d(60) + 20) : k === 'Dragonborn' ? String(_d(60) + 15) : k === 'Tiefling' ? String(_d(70) + 16) : String(_d(50) + 16); }
    },

    // ── INDEX CARD RPG (gritty sword-and-sorcery, weird edge) ──────────────
    ICRPG: {
      kindLabel: 'Type',
      kinds: ['Human', 'Human', 'Elf', 'Dwarf', 'Half-Orc', 'Gnome', 'Ghost', 'Golem'],
      names: {
        Human:  ['Kel', 'Bram', 'Sena', 'Dax', 'Rook', 'Vesh', 'Tamsin', 'Corl', 'Ivo', 'Petra', 'Hask', 'Nell', 'Drov', 'Mara', 'Ansel', 'Bex', 'Corvin', 'Suri', 'Halden', 'Rue'],
        Elf:    ['Syl', 'Aeliss', 'Ferox', 'Nimriel', 'Thal', 'Ovar', 'Lisha', 'Kaelen', 'Wren', 'Solren', 'Ysolt', 'Mirel', 'Tavariel', 'Ellum', 'Vashti', 'Orin', 'Lorel', 'Cyril', 'Anwe', 'Faelar'],
        Dwarf:  ['Borin', 'Hilda', 'Grund', 'Vesna', 'Dolgan', 'Runa', 'Karr', 'Brenna', 'Torvic', 'Agda', 'Molgor', 'Yara', 'Ferd', 'Kolba', 'Snorri', 'Brunn', 'Hettie', 'Vgot', 'Durn', 'Osla'],
        'Half-Orc': ['Grash', 'Oda', 'Murg', 'Vek', 'Sarn', 'Toza', 'Ruk', 'Brakka', 'Hurn', 'Zeda', 'Gorlin', 'Uska', 'Drav', 'Nokka', 'Skoll', 'Yarg', 'Wenna', 'Brog', 'Tesk', 'Oma'],
        Gnome:  ['Fizzle', 'Wob', 'Nix', 'Tink', 'Bramble', 'Cog', 'Sprocket', 'Dweeble', 'Pip', 'Gizmo', 'Quill', 'Fenn', 'Bodge', 'Wrenk', 'Stub', 'Plink', 'Doss', 'Mim', 'Grib', 'Tocket'],
        Ghost:  ['the Grey Woman', 'Old Pell', 'the Weeping Boy', 'Lady Ash', 'the Hollow Monk', 'Silent Job', 'the Pale Rider', 'Mother Bones', 'the Drowned Man', 'Whistler', 'the Faceless Clerk', 'Gallows Kate'],
        Golem:  ['Unit-9', 'Clatter', 'the Warden', 'Ironjaw', 'Cinder', 'Millstone', 'the Sentinel', 'Rustpile', 'Ballast', 'the Faithful', 'Anvil', 'Grinder']
      },
      builds: BUILD_STD, hair: HAIR_STD, eyes: EYES_STD,
      features: ['a rune branded on the neck', 'one milky eye', 'a jaw wired shut', 'iron teeth', 'a hand of scar tissue', 'a shaved, tattooed scalp', 'a cracked leather patch', 'chains at the wrist', 'soot-stained skin', 'a mouth of broken teeth', 'a livid burn', 'twitching, restless hands'],
      demeanor: DEMEANOR_STD, quirks: QUIRK_STD,
      dress: {
        Poor: ['blood-crusted rags', 'a moth-eaten cloak', 'mismatched scavenged armor', 'sackcloth', 'a filthy bedroll worn as a shawl'],
        Standard: ['boiled leather', 'a road-stained cloak', 'dented mail', 'a heavy work coat', 'furs and buckles'],
        Wealthy: ['blackened plate', 'a crimson-lined cloak', 'looted finery', 'a warlord\'s trophies', 'gilt-edged leather']
      },
      wants: ['loot', 'a way out of the dark', 'to kill a specific thing', 'a relic recovered', 'the timer stopped', 'someone dragged back alive', 'a debt of blood paid', 'the door opened', 'a curse lifted', 'to not be next'],
      secrets: ['already made a deal with the enemy', 'is dying and hiding it', 'led the last party to their deaths', 'carries the thing everyone is hunting', 'is not really alive', 'set the trap ahead', 'knows the safe path and won\'t say', 'is counting down to a betrayal'],
      occupations: ['mercenary', 'tomb-robber', 'torchbearer', 'cultist', 'blacksmith', 'flesh-trader', 'gate warden', 'scrap-scavenger', 'rune-carver', 'plague doctor', 'gravekeeper', 'slaver', 'bounty hunter', 'wandering priest', 'beast-tamer', 'executioner'],
      coin: { Poor: function () { return _d(6) + ' coin'; }, Standard: function () { return (_d(6) + _d(6)) + ' coin'; }, Wealthy: function () { return (_d(6) * 10) + ' coin + a relic shard'; } },
      age: function (k) { return k === 'Ghost' || k === 'Golem' ? '—' : k === 'Elf' ? String(_d(300) + 40) : k === 'Dwarf' ? String(_d(200) + 30) : String(_d(50) + 15); }
    },

    // ── NIMBLE (heroic high fantasy) ───────────────────────────────────────
    NIM: {
      kindLabel: 'Ancestry',
      kinds: ['Human', 'Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc', 'Dragonborn'],
      names: {
        Human:      ['Edren', 'Sable', 'Callum', 'Wyn', 'Thorne', 'Elise', 'Garrow', 'Neva', 'Roan', 'Brisa', 'Kade', 'Marlo', 'Tamsyn', 'Dessa', 'Oren', 'Pia', 'Hale', 'Vira', 'Cort', 'Lena'],
        Elf:        ['Aelin', 'Faevyn', 'Lorien', 'Sylwen', 'Caeli', 'Theren', 'Ivarion', 'Naeris', 'Oleander', 'Yllian', 'Miravel', 'Solenne', 'Aerith', 'Vaelor', 'Illian', 'Neriah', 'Thessaly', 'Gwyneth', 'Rael', 'Elowen'],
        Dwarf:      ['Durgan', 'Brynn', 'Hoskar', 'Verra', 'Balin', 'Onna', 'Grimm', 'Karda', 'Dolf', 'Thessa', 'Rurgan', 'Yorda', 'Brannor', 'Sigrun', 'Kholdan', 'Mabsa', 'Torgan', 'Wenna', 'Gundren', 'Halda'],
        Halfling:   ['Pippa', 'Finnick', 'Rosie', 'Bandon', 'Merry', 'Tilda', 'Odo', 'Clover', 'Bram', 'Poppy', 'Sam', 'Hazel', 'Dob', 'Prim', 'Milo', 'Marigold', 'Ned', 'Bonnie', 'Colby', 'Wren'],
        Gnome:      ['Tibbin', 'Wren', 'Fizwick', 'Nella', 'Bobkin', 'Zephyr', 'Dabble', 'Minx', 'Cogsley', 'Trixie', 'Fendrel', 'Gimble', 'Sprig', 'Wobbet', 'Quibble', 'Tansy', 'Doddle', 'Perrin', 'Snick', 'Bimble'],
        'Half-Orc': ['Ragga', 'Thokk', 'Muraga', 'Vorn', 'Sharda', 'Grulk', 'Enna', 'Karrok', 'Uzza', 'Drenn', 'Golra', 'Skarn', 'Yeva', 'Brokka', 'Torg', 'Naza', 'Hurgan', 'Ossa', 'Vrag', 'Mella'],
        Dragonborn: ['Sartha', 'Vharos', 'Kyra', 'Baldric', 'Ossira', 'Rhal', 'Tessari', 'Vok', 'Nadira', 'Draka', 'Solmar', 'Ashka', 'Verrik', 'Myrha', 'Torvax', 'Sinza', 'Hadros', 'Elka', 'Pyria', 'Grithax']
      },
      builds: BUILD_STD, hair: HAIR_STD, eyes: EYES_STD, features: FEAT_STD, demeanor: DEMEANOR_STD, quirks: QUIRK_STD,
      dress: {
        Poor: ['patched adventuring castoffs', 'a faded traveler\'s cloak', 'worn boots and a thin coat', 'homespun and twine', 'a threadbare tabard'],
        Standard: ['well-kept leathers', 'a bright wool cloak', 'a guild sash', 'sturdy boots and a good coat', 'practical layered garb'],
        Wealthy: ['enchanted-looking finery', 'a jewel-clasped cloak', 'tailored heroes\' garb', 'gleaming trophy armor', 'silk and filigree']
      },
      wants: ['adventure', 'glory', 'a quest reward', 'a companion avenged', 'a fabled treasure', 'a village saved', 'a name made', 'a map completed', 'a rival bested', 'a debt to fate settled'],
      secrets: ['is destined for something they dread', 'carries a cursed reward', 'abandoned a party once', 'is hunted by an old enemy', 'made a promise they can\'t keep', 'hides a magical gift', 'is looking for someone thought dead', 'took credit for another\'s deed'],
      occupations: ['guild adventurer', 'tavern hero', 'town guard', 'temple healer', 'court mage', 'trader', 'bounty hunter', 'ranger', 'bard', 'blacksmith', 'cartographer', 'stablemaster', 'apothecary', 'sellsword', 'scout', 'squire', 'wandering monk', 'beast handler'],
      coin: { Poor: function () { return _d(10) + ' silver'; }, Standard: function () { return _d(8) + ' gold'; }, Wealthy: function () { return (_d(6) * 12 + 20) + ' gold'; } },
      age: function (k) { return k === 'Elf' ? String(_d(400) + 40) : k === 'Dwarf' ? String(_d(220) + 35) : k === 'Gnome' ? String(_d(250) + 40) : k === 'Halfling' ? String(_d(60) + 20) : k === 'Dragonborn' ? String(_d(60) + 15) : String(_d(50) + 16); }
    },

    // ── KIDS ON BIKES (1980s-90s small-town Americana) ─────────────────────
    KOB: {
      kindLabel: null, kinds: null,
      names: {
        _: ['Danny', 'Becca', 'Marcus', 'Stacy', 'Tyler', 'Jodie', 'Kevin', 'Lauren', 'Petey', 'Dana', 'Chris', 'Wendy', 'Officer Ruiz', 'Coach Barnes', 'Mr. Halloran', 'Mrs. Petrakis', 'Doc Feeney', 'Earl', 'Maggie', 'Sheriff Dell', 'Randy', 'Trish', 'Vincent', 'Deb', 'Old Man Crandall', 'Miss Yates']
      },
      builds: ['scrawny', 'chubby', 'gangly', 'short', 'athletic', 'average', 'tall for their age', 'stocky', 'lanky', 'round-shouldered'],
      hair: ['feathered blonde', 'mullet', 'permed brown', 'buzzcut', 'red and freckled', 'greasy black', 'ponytail', 'thinning grey', 'big and hairsprayed', 'shaggy'],
      eyes: EYES_STD,
      features: ['braces', 'a bike-crash scar on the knee', 'a bandaid on the nose', 'thick glasses', 'a Members Only jacket', 'a fanny pack', 'a whistle around the neck', 'a name tag', 'a toothpick in the corner of the mouth', 'a trucker cap', 'a lazy eye', 'a cast covered in signatures'],
      demeanor: ['friendly', 'nosy', 'grumpy', 'exhausted', 'suspicious', 'chatty', 'protective', 'burned-out', 'cheerful', 'jittery', 'no-nonsense', 'gossipy'],
      quirks: ['always eating a snack', 'calls everyone "champ"', 'won\'t stop talking about the game', 'listens to a police scanner', 'CB radio slang', 'hums TV theme songs', 'chews a pen cap', 'name-drops the mayor', 'complains about "kids these days"', 'quotes their favorite movie'],
      dress: {
        Poor: ['hand-me-downs a size too big', 'a stained work uniform', 'a threadbare band tee', 'a coat held together with duct tape', 'gas-station coveralls'],
        Standard: ['jeans and a windbreaker', 'a diner uniform', 'a letterman jacket', 'a flannel and cap', 'a polo with a name tag'],
        Wealthy: ['a pressed suit', 'designer acid-wash', 'a country-club sweater', 'a fur-collared coat', 'brand-new sneakers and a gold chain']
      },
      wants: ['to be left alone', 'the kids off their lawn', 'a mystery solved', 'someone to cover a shift', 'the town to stay quiet', 'a secret kept', 'their kid to shape up', 'the diner to stay open', 'a favor returned', 'a ride to the next town'],
      secrets: ['saw something out by the quarry', 'is covering for the sheriff', 'knows what happened in \'79', 'is skimming from the register', 'has been getting strange phone calls', 'is not from around here', 'lost someone and never reported it', 'buried something in the backyard'],
      occupations: ['student', 'diner waitress', 'gas-station attendant', 'sheriff\'s deputy', 'high-school coach', 'mail carrier', 'video-store clerk', 'librarian', 'church deacon', 'trailer-park manager', 'radio DJ', 'auto mechanic', 'crossing guard', 'newspaper editor', 'bait-shop owner', 'substitute teacher', 'lifeguard', 'night watchman'],
      coin: { Poor: function () { return '$' + _d(6) + ' and some gum'; }, Standard: function () { return '$' + (_d(6) + _d(6)) + ' in a wallet'; }, Wealthy: function () { return '$' + (_d(6) * 20 + 40) + ' and a gold card'; } },
      age: function () { var r = _d(10); return r <= 3 ? String(_d(6) + 11) : String(_d(45) + 20); }
    },

    // ── CANDELA OBSCURA (gaslamp occult horror, ~1900 Newfaire) ────────────
    CO: {
      kindLabel: null, kinds: null,
      names: {
        _: ['Cordelia', 'Ambrose', 'Wilhelmina', 'Edmund', 'Josephine', 'Thaddeus', 'Beatrix', 'Silas', 'Prudence', 'Bartholomew', 'Lucretia', 'Ignatius', 'Millicent', 'Percival', 'Ottoline', 'Cornelius', 'Genevieve', 'Horatio', 'Adelaide', 'Mordecai', 'Constance', 'Dr. Vane', 'Sister Agnes', 'Inspector Blythe']
      },
      builds: ['slight', 'stooped', 'severe', 'portly', 'cadaverous', 'upright', 'frail', 'imposing', 'hollow-cheeked', 'stout'],
      hair: ['iron-grey and pinned up', 'oiled black', 'powdered white', 'auburn under a bonnet', 'wispy and receding', 'a great mutton-chop beard', 'silver at the temples', 'hidden beneath a veil', 'a neat widow\'s peak', 'unkempt and greasy'],
      eyes: ['pale and watery', 'coal-dark', 'grey as the harbor', 'feverishly bright', 'sunken', 'one clouded', 'sharp and pale', 'red-rimmed', 'deep-set', 'unsettlingly steady'],
      features: ['a mourning brooch', 'ink-stained cuffs', 'a persistent cough', 'a livid burn scar hidden by gloves', 'a pince-nez on a chain', 'trembling hands', 'a gold pocket-watch', 'a clerical collar', 'a faint smell of laudanum', 'a jagged surgical scar', 'a wax-sealed letter in the breast pocket', 'soot ground into the knuckles'],
      demeanor: ['grave', 'unctuous', 'haunted', 'imperious', 'nervous', 'coldly polite', 'grief-stricken', 'secretive', 'weary', 'zealous', 'condescending', 'brittle'],
      quirks: ['speaks only in a whisper', 'crosses themselves at every mention of the dead', 'keeps checking a locked case', 'refers to the deceased as if present', 'winds their watch compulsively', 'quotes scripture darkly', 'flinches at the church bells', 'never removes their gloves'],
      dress: {
        Poor: ['a soot-stained work smock', 'a moth-eaten mourning dress', 'a dockworker\'s oilskin', 'darned and patched wool', 'a threadbare frock coat'],
        Standard: ['a sober black frock coat', 'a high-collared day dress', 'a clerk\'s waistcoat and sleeve garters', 'a nurse\'s starched apron', 'a constable\'s greatcoat'],
        Wealthy: ['a fur-trimmed opera cloak', 'a silk mourning gown with jet beads', 'a tailored morning suit and top hat', 'a brocade waistcoat and gold chain', 'kid gloves and a diamond stickpin']
      },
      wants: ['a loved one\'s death explained', 'a debt to the Circle repaid', 'a haunting ended', 'a scandal buried', 'access to the archives', 'a relic recovered', 'protection from something unseen', 'a séance arranged', 'a name cleared', 'the lights kept burning'],
      secrets: ['has glimpsed the Flare', 'made a bargain with something beyond', 'is a member of a rival lodge', 'covered up a death', 'is slowly being consumed by their gift', 'traffics in forbidden relics', 'is not who the parish records say', 'reports to the magistrate in secret'],
      occupations: ['lamplighter', 'undertaker', 'spirit medium', 'university professor', 'police constable', 'dock foreman', 'newspaper reporter', 'asylum nurse', 'antiquarian', 'clergyman', 'apothecary', 'gravedigger', 'seamstress', 'factory owner', 'rag-and-bone man', 'coroner', 'governess', 'occult bookseller'],
      coin: { Poor: function () { return _d(12) + ' pence'; }, Standard: function () { return _d(6) + ' shillings'; }, Wealthy: function () { return (_d(6) + 2) + ' sovereigns'; } },
      age: function () { return String(_d(45) + 20); }
    },

    // ── ACE! (cinematic modern action / spy / heist) ───────────────────────
    ACE: {
      kindLabel: null, kinds: null,
      names: {
        _: ['Cole', 'Nadia', 'Rico', 'Simone', 'Dex', 'Priya', 'Marco', 'Zara', 'Vince', 'Lena', 'Kwan', 'Bianca', 'Omar', 'Frankie', 'Yuki', 'Dmitri', 'Selena', 'Cutter', 'Renata', 'Jax', 'Camille', 'Boone', 'Ingrid', 'Sol', 'Tariq', 'Devlin']
      },
      builds: ['ripped', 'lean', 'built like a linebacker', 'wiry', 'athletic', 'stocky', 'rangy', 'compact and quick', 'broad', 'runner\'s build'],
      hair: HAIR_STD, eyes: EYES_STD,
      features: ['a jagged knife scar', 'a shoulder holster', 'mirrored shades', 'a bullet-graze on the jaw', 'a prosthetic hand', 'a neck tattoo', 'a gold tooth', 'a burner phone always in hand', 'an earpiece', 'a broken-and-reset nose', 'brass knuckles in a pocket', 'a fresh bandage taped over one eye'],
      demeanor: ['cocky', 'ice-cold', 'wired', 'charming', 'paranoid', 'deadpan', 'hot-headed', 'unflappable', 'jittery', 'smug', 'all business', 'flirtatious'],
      quirks: ['never sits facing away from the exit', 'flips a coin/lighter constantly', 'talks in code names', 'always negotiating a cut', 'cleans a weapon while talking', 'name-drops jobs they\'ve pulled', 'chews gum aggressively', 'checks their six every few seconds'],
      dress: {
        Poor: ['a beat-up leather jacket', 'a stained mechanic\'s jumpsuit', 'a hoodie and cargo pants', 'a threadbare army-surplus coat', 'a faded band tee and jeans'],
        Standard: ['a tactical jacket', 'a sharp but practical suit', 'all-black ops gear', 'a bomber and boots', 'a pressed shirt with the sleeves rolled'],
        Wealthy: ['a tailored Italian suit', 'a designer trench', 'a tux under a duster', 'a silk shirt and a Rolex', 'a bespoke jacket hiding body armor']
      },
      wants: ['a big score', 'to settle a score', 'a name cleared', 'intel on a target', 'a way out of the life', 'a debt paid off', 'protection for someone', 'to finish the job', 'a rat exposed', 'the money moved quietly'],
      secrets: ['is a double agent', 'skimmed off the last job', 'is being blackmailed', 'works for the people you\'re fighting', 'left a partner to die', 'has a family no one knows about', 'is wearing a wire', 'already sold you out'],
      occupations: ['mercenary', 'hacker', 'fixer', 'getaway driver', 'arms dealer', 'informant', 'bodyguard', 'con artist', 'bush pilot', 'freelance spy', 'nightclub owner', 'demolitions expert', 'private investigator', 'cat burglar', 'bagman', 'ex-cop', 'smuggler', 'forger'],
      coin: { Poor: function () { return '$' + (_d(6) * 10) + ' cash'; }, Standard: function () { return '$' + (_d(6) * 100) + ' in a money clip'; }, Wealthy: function () { return '$' + (_d(6) * 1000) + ' and a numbered account'; } },
      age: function () { return String(_d(40) + 22); }
    },

    // ── STAR WARS (WEG d6 — a galaxy far, far away) ─────────────────────────
    SW: {
      kindLabel: 'Species',
      kinds: ['Human', 'Human', 'Twi\'lek', 'Rodian', 'Wookiee', 'Bothan', 'Zabrak', 'Duros', 'Sullustan', 'Trandoshan', 'Mon Calamari', 'Ithorian'],
      names: {
        Human:      ['Kael', 'Dara', 'Renn', 'Mira', 'Jax', 'Sabé', 'Tavik', 'Nyla', 'Corwin', 'Elara', 'Dain', 'Vesa', 'Rook', 'Talia', 'Garr', 'Nima', 'Bren', 'Saya', 'Holt', 'Cass'],
        'Twi\'lek': ['Ryloth', 'Aayla', 'Firka', 'Nawara', 'Oola', 'Sennja', 'Vel', 'Numa', 'Deessa', 'Tabbra', 'Sooma', 'Xalek', 'Lyn', 'Reeza', 'Koto', 'Ann', 'Bela', 'Cham', 'Drina', 'Vess'],
        Rodian:    ['Greedo', 'Neela', 'Doda', 'Wald', 'Rekba', 'Chekka', 'Navik', 'Teeku', 'Blenn', 'Oorm', 'Saku', 'Reeb', 'Gonto', 'Weeza', 'Pruna', 'Makk', 'Hido', 'Neema', 'Corb', 'Tsil'],
        Wookiee:   ['Chewbacca', 'Tarfful', 'Lumpawaroo', 'Attichitcuk', 'Grakchawwaa', 'Merumeru', 'Snoova', 'Kirrggh', 'Rawrrk', 'Wullffwarro', 'Zaalbar', 'Chalmun', 'Rrowvren', 'Waroorm', 'Klaatch', 'Rowan', 'Grrrhff', 'Karrga', 'Wolba', 'Chieff'],
        Bothan:    ['Koth', 'Borsk', 'Peldar', 'Traest', 'Girov', 'Asyr', 'Nurb', 'Yaru', 'Reshmi', 'Torbin', 'Jib', 'Malla', 'Drenn', 'Ossla', 'Krev', 'Tavo', 'Senn', 'Ryloh', 'Poul', 'Vess'],
        Zabrak:    ['Maul', 'Eeth', 'Sugi', 'Bao', 'Kerra', 'Vorn', 'Sena', 'Jax', 'Nira', 'Torva', 'Dassk', 'Ohla', 'Rennik', 'Thal', 'Maruk', 'Zev', 'Isha', 'Corvo', 'Nell', 'Drav'],
        Duros:     ['Cad', 'Jib', 'Bane', 'Roon', 'Neelo', 'Vurk', 'Dallo', 'Tenn', 'Bez', 'Groon', 'Sella', 'Nabb', 'Corr', 'Yull', 'Dann', 'Reeko', 'Voss', 'Jodo', 'Aleen', 'Ruus'],
        Sullustan: ['Nien', 'Dllr', 'Sian', 'Aril', 'Bela', 'Cobb', 'Portho', 'Nunb', 'Sull', 'Reeno', 'Vass', 'Dabb', 'Loro', 'Tass', 'Griv', 'Nella', 'Sabo', 'Hurr', 'Illo', 'Renk'],
        Trandoshan:['Bossk', 'Cradossk', 'Sokk', 'Trask', 'Grakk', 'Ssaria', 'Dossk', 'Vorska', 'Hurl', 'Sazen', 'Krossk', 'Yssk', 'Torka', 'Grennt', 'Raskk', 'Slith', 'Dask', 'Wossk', 'Zrenn', 'Gorssk'],
        'Mon Calamari': ['Ackbar', 'Aftab', 'Meena', 'Cilghal', 'Bant', 'Orrimaarko', 'Ibtisam', 'Pilo', 'Quarsh', 'Nossor', 'Raddus', 'Tolby', 'Merai', 'Salla', 'Verro', 'Jesmin', 'Oro', 'Wam', 'Kelko', 'Dresi'],
        Ithorian:  ['Momaw', 'Roron', 'Taboo', 'Umwak', 'Hammo', 'Loruth', 'Fandar', 'Grondo', 'Ilooh', 'Sabo', 'Toruth', 'Vennt', 'Ohla', 'Palo', 'Rhoom', 'Sett', 'Ubb', 'Waan', 'Yoruth', 'Zell']
      },
      builds: ['lean', 'burly', 'wiry', 'tall and thin', 'compact', 'broad', 'hunched', 'towering', 'rangy', 'average'],
      hair: ['none (headtails)', 'greasy black', 'cropped grey', 'a topknot', 'shaved', 'sandy and unkempt', 'silver', 'braided', 'none (scaled)', 'wild and dark'],
      eyes: ['black', 'red', 'large and dark', 'yellow', 'pale', 'sunken', 'reptilian slit', 'wide-set', 'grey', 'gleaming'],
      features: ['a blaster scar', 'a cybernetic arm', 'a bandolier of power packs', 'a comlink clipped to the ear', 'a scorched flight jacket', 'a missing eye under a patch', 'a protocol droid in tow', 'grease-blackened hands', 'a bounty puck on the belt', 'sabacc chips in a pocket', 'a translator collar', 'a Guild tattoo'],
      demeanor: ['gruff', 'shifty', 'jovial', 'cold', 'twitchy', 'arrogant', 'weary', 'greedy', 'loyal', 'boastful', 'cautious', 'menacing'],
      quirks: ['distrusts droids', 'always haggling in credits', 'quotes smuggler\'s codes', 'checks the cantina exits', 'brags about the Kessel Run', 'won\'t fly without a good-luck charm', 'talks to their ship', 'flinches at Imperial uniforms'],
      dress: {
        Poor: ['a patched flight suit', 'moisture-farmer\'s robes', 'a scavenger\'s wraps', 'a stained work tunic', 'a threadbare poncho'],
        Standard: ['a spacer\'s vest and holster', 'a merc\'s armored jacket', 'a pilot\'s jumpsuit', 'a hooded traveler\'s cloak', 'utility coveralls and a tool belt'],
        Wealthy: ['a Hutt-cartel silk robe', 'polished Mandalorian-style armor', 'a senator\'s fine tunic', 'a crime-boss\'s jeweled coat', 'a tailored officer\'s uniform']
      },
      wants: ['credits', 'a ship\'s debt cleared', 'safe passage past the blockade', 'a bounty collected', 'a shipment moved', 'Imperial attention avoided', 'a slave freed', 'parts for the hyperdrive', 'a rival gang dealt with', 'passage off-world'],
      secrets: ['is an Imperial informant', 'owes Jabba a fortune', 'is smuggling for the Rebellion', 'carries stolen datatapes', 'is a wanted deserter', 'knows the location of a hidden base', 'is Force-sensitive and hiding it', 'sold out their last crew'],
      occupations: ['smuggler', 'moisture farmer', 'bounty hunter', 'cantina owner', 'spice dealer', 'starship mechanic', 'freighter pilot', 'Imperial clerk', 'information broker', 'protocol droid', 'gunrunner', 'podracer', 'street tough', 'Hutt enforcer', 'Rebel courier', 'junk dealer', 'medic', 'dockmaster'],
      coin: { Poor: function () { return (_d(6) * 5) + ' credits'; }, Standard: function () { return (_d(6) * 50) + ' credits'; }, Wealthy: function () { return (_d(6) * 500 + 500) + ' credits'; } },
      age: function (k) { return k === 'Wookiee' ? String(_d(400) + 20) : String(_d(45) + 18); }
    },

    // ── D6 SYSTEM 2e (genre-agnostic pulp / adventure) ─────────────────────
    D62E: {
      kindLabel: null, kinds: null,
      names: {
        _: ['Jack', 'Evelyn', 'Rex', 'Adaline', 'Duke', 'Simone', 'Cliff', 'Rosalind', 'Marlowe', 'Vivian', 'Sax', 'Delphine', 'Bram', 'Nadia', 'Colt', 'Josephine', 'Reyes', 'Greta', 'Sterling', 'Ida', 'Ford', 'Pearl', 'Angelo', 'Ruth', 'Salvatore', 'Cleo']
      },
      builds: BUILD_STD, hair: HAIR_STD, eyes: EYES_STD,
      features: ['a rakish scar', 'a battered fedora', 'a pipe clenched in the teeth', 'a bandaged hand', 'a monocle', 'a leather flight jacket', 'a shoulder holster', 'a lucky coin on a chain', 'a well-worn map case', 'a jaunty mustache', 'a bullwhip on the belt', 'a cigarette that never quite goes out'],
      demeanor: ['dashing', 'gruff', 'sardonic', 'earnest', 'blustering', 'cool-headed', 'greedy', 'noble', 'jaded', 'reckless', 'charming', 'cagey'],
      quirks: QUIRK_STD,
      dress: {
        Poor: ['a threadbare explorer\'s kit', 'a stained dockhand\'s shirt', 'a patched trench coat', 'grease-stained coveralls', 'a faded uniform stripped of insignia'],
        Standard: ['a khaki adventuring outfit', 'a pressed but practical suit', 'a pilot\'s leather and scarf', 'a reporter\'s rumpled jacket', 'a bush-ranger\'s gear'],
        Wealthy: ['a tailored white dinner jacket', 'a fur-collared traveling coat', 'a bespoke three-piece suit', 'safari finery and a pith helmet', 'an heiress\'s traveling gown']
      },
      wants: ['fortune', 'a lost artifact', 'a rival beaten to the prize', 'a name in the history books', 'a debt collected', 'a daring rescue pulled off', 'passage to a far port', 'a secret uncovered', 'a wrong avenged', 'the deal of a lifetime'],
      secrets: ['is working for the other side', 'stole the map they\'re using', 'left a partner behind once', 'is chasing a personal vendetta', 'carries a forged identity', 'knows the treasure is cursed', 'is being tailed', 'already double-crossed the client'],
      occupations: ['treasure hunter', 'ace pilot', 'foreign correspondent', 'university professor', 'soldier of fortune', 'nightclub singer', 'private eye', 'antiquities dealer', 'ship\'s captain', 'radio operator', 'con artist', 'big-game guide', 'diplomat', 'saboteur', 'archaeologist', 'stunt flyer', 'bootlegger', 'cat burglar'],
      coin: { Poor: function () { return '$' + _d(20) + ' and pocket lint'; }, Standard: function () { return '$' + (_d(6) * 15) + ' in a billfold'; }, Wealthy: function () { return '$' + (_d(6) * 200 + 100) + ' and a letter of credit'; } },
      age: function () { return String(_d(42) + 22); }
    },

    // ── YEAR ZERO ENGINE (gritty survival / post-collapse) ─────────────────
    YZE: {
      kindLabel: 'Kind',
      kinds: ['Human', 'Human', 'Human', 'Mutant'],
      names: {
        Human:  ['Ash', 'Bo', 'Corey', 'Dune', 'Esca', 'Fitch', 'Gray', 'Hollis', 'Juno', 'Krieg', 'Lark', 'Mox', 'Nils', 'Oksana', 'Pallas', 'Quill', 'Reef', 'Silas', 'Tove', 'Wren'],
        Mutant: ['Dux', 'Scab', 'Cinder', 'Grit', 'Hakan', 'Nadja', 'Boss', 'Chassis', 'Double-Bird', 'Gladhand', 'Ratspoke', 'Decay', 'Loud', 'Iron-Cyst', 'Patchwork', 'Two-Heads', 'Slick', 'Marrow', 'Husk', 'Vex']
      },
      builds: ['emaciated', 'wiry', 'hard-muscled', 'stooped', 'scrawny', 'broad and scarred', 'rangy', 'hunched', 'bloated', 'lean'],
      hair: ['shaved and scarred', 'matted', 'greasy and tied back', 'burned away on one side', 'thin and patchy', 'wild', 'bleached by the sun', 'none', 'braided with wire', 'ash-grey'],
      eyes: ['bloodshot', 'one filmed white', 'jaundiced', 'flat and grey', 'feverish', 'mismatched', 'sunken', 'hard', 'twitchy', 'yellowed'],
      features: ['a jury-rigged prosthetic', 'radiation burns', 'a gas-mask slung at the neck', 'a barcode tattoo', 'filed teeth', 'a festering wound they ignore', 'scavenged goggles', 'a rebreather', 'tally-mark scars on the arm', 'a third thumb', 'sores that won\'t heal', 'a rebuilt jaw'],
      demeanor: ['guarded', 'feral', 'exhausted', 'calculating', 'twitchy', 'hollow', 'aggressive', 'desperate', 'fatalistic', 'watchful', 'starving', 'coldly practical'],
      quirks: ['hoards bottle caps', 'talks to a dead radio', 'never sleeps in the open', 'counts their bullets aloud', 'flinches at open sky', 'licks their lips constantly', 'trusts no one who looks healthy', 'chews stimm-root'],
      dress: {
        Poor: ['rags lashed with wire', 'a moldering hazmat suit', 'stitched-together hides', 'a plastic tarp poncho', 'sun-bleached prison scrubs'],
        Standard: ['patched fatigues and boots', 'scavenged riot gear', 'layered scrap armor', 'a road-worn duster', 'a mechanic\'s coveralls and mask'],
        Wealthy: ['intact pre-collapse tactical gear', 'a warlord\'s trophy coat', 'clean sealed hazmat gear', 'reinforced leathers with real plating', 'a bunker-dweller\'s pristine jumpsuit']
      },
      wants: ['clean water', 'ammunition', 'a safe place to sleep', 'medicine', 'a working vehicle', 'someone found in the ruins', 'protection from a gang', 'a debt in bullets paid', 'the Zone\'s secret', 'just to see tomorrow'],
      secrets: ['is infected and hiding it', 'sold their last group to raiders', 'knows where a cache is buried', 'works for the settlement they\'re fleeing', 'is a mutant passing as human', 'led the enemy right to you', 'has been rationing your supplies to themselves', 'made a deal with the things in the dark'],
      occupations: ['scavenger', 'wasteland medic', 'gun-runner', 'settlement guard', 'water trader', 'mechanic', 'zone guide', 'cult preacher', 'raider', 'hunter', 'radio operator', 'bone-picker', 'still-brewer', 'toll-keeper', 'stalker', 'flesh-trader', 'grave-robber', 'chem-cook'],
      coin: { Poor: function () { return _d(6) + ' rounds of ammo'; }, Standard: function () { return (_d(6) + _d(6)) + ' caps, a can of food'; }, Wealthy: function () { return (_d(6) * 5) + ' caps + clean water + meds'; } },
      age: function (k) { return k === 'Mutant' ? String(_d(30) + 14) : String(_d(40) + 14); }
    },

    // ── MARVEL MULTIVERSE (heroes, civilians, and everyone between) ────────
    MMRPG: {
      kindLabel: 'Origin',
      kinds: ['Human', 'Human', 'Human', 'Mutant', 'Enhanced', 'Inhuman', 'Alien', 'Android'],
      names: {
        Human:    ['Frank', 'Gloria', 'Hector', 'Aisha', 'Tony', 'Maria', 'Ben', 'Luz', 'Danny', 'Jen', 'Sam', 'Rita', 'Phil', 'Dinah', 'Raj', 'Nora', 'Wade', 'Kim', 'Marcus', 'Sofia'],
        Mutant:   ['Kai', 'Lorna', 'Doug', 'Neena', 'Jubi', 'Marrow', 'Chris', 'Tabitha', 'Roberto', 'Sooraya', 'Julian', 'Cessily', 'Santo', 'Laura', 'Gabby', 'Everett', 'Paige', 'Jonothon', 'Monet', 'David'],
        Enhanced: ['Rick', 'Carol', 'Simon', 'Jessica', 'Luke', 'Danielle', 'Eric', 'Melissa', 'Isaiah', 'Ava', 'Robbie', 'Kamala', 'Miles', 'Cindy', 'Cole', 'Gwen', 'Victor', 'Dana', 'Hobie', 'Yelena'],
        Inhuman:  ['Karnak', 'Crystal', 'Triton', 'Auran', 'Reader', 'Iso', 'Flint', 'Naja', 'Gorgon', 'Frank', 'Inferno', 'Panacea', 'Swain', 'Grid', 'Treon', 'Lash', 'Nur', 'Xian', 'Bram', 'Devos'],
        Alien:    ['Zev', 'Ka-tel', 'Norrin', 'Hela', 'Glenn', 'Yondu', 'Kraa', 'Sera', 'Vint', 'Ronan', 'Mantis', 'Gro-tak', 'Chka', 'Xandra', 'Ovak', 'Skrell', 'Lila', 'Torg', 'N\'dega', 'Pyx'],
        Android:  ['Vision', 'Jocasta', 'Aaron', 'Machine-Man', 'Delphi', 'Victor', 'Ultron-Prime', 'Alkhema', 'Mainframe', 'Awesome Android', 'ISAAC', 'H.E.R.B.I.E.', 'Dragon Man', 'Nimrod', 'Warlock', 'Cerebro', 'Danger', 'Bastion', 'Quasimodo', 'Sentry-7']
      },
      builds: ['average', 'athletic', 'towering', 'petite', 'hulking', 'lean', 'stocky', 'lithe', 'broad', 'unremarkable'],
      hair: HAIR_STD, eyes: EYES_STD,
      features: ['a press badge', 'a lab coat with too many pens', 'a S.H.I.E.L.D. lanyard', 'a Daily Bugle press pass', 'burn scars from "an accident"', 'a hoodie hiding their face', 'a NYPD detective\'s shield', 'a food-cart apron', 'a StarkTech phone', 'faint energy-glow under the skin', 'a bandaged forearm', 'a nervous glance at the sky'],
      demeanor: ['harried', 'brash', 'idealistic', 'cynical', 'star-struck', 'no-nonsense', 'anxious', 'wisecracking', 'guarded', 'exhausted', 'defiant', 'calculating'],
      quirks: ['live-tweets everything', 'always name-drops the Avengers', 'ducks at loud noises since the Incident', 'keeps a "hero sighting" scrapbook', 'distrusts anyone in a mask', 'quotes J. Jonah Jameson', 'carries an umbrella for "sky stuff"', 'talks a mile a minute'],
      dress: {
        Poor: ['a worn hoodie and sneakers', 'a stained diner uniform', 'a threadbare winter coat', 'hand-me-down streetwear', 'a bodega apron'],
        Standard: ['business casual', 'a delivery uniform', 'a rumpled reporter\'s blazer', 'scrubs', 'a beat cop\'s blues'],
        Wealthy: ['a StarkTech-logo power suit', 'a designer trench', 'an Oscorp exec\'s tailored suit', 'a gala gown', 'a Hammer Industries polo and slacks']
      },
      wants: ['the story of the century', 'their neighborhood kept safe', 'a hero\'s autograph', 'to expose a cover-up', 'their powers gone', 'their powers understood', 'a missing person found', 'the rent made', 'revenge on the people who did this', 'to be believed'],
      secrets: ['knows a hero\'s secret identity', 'is on Kingpin\'s payroll', 'is a Skrull', 'has undocumented powers', 'witnessed a super-crime', 'works for A.I.M.', 'is a S.H.I.E.L.D. plant', 'is quietly dying from an exposure'],
      occupations: ['reporter', 'NYPD detective', 'lab technician', 'street vendor', 'S.H.I.E.L.D. agent', 'ER nurse', 'dockworker', 'bodega owner', 'corporate exec', 'subway operator', 'private eye', 'science teacher', 'firefighter', 'bartender', 'social worker', 'cab driver', 'security guard', 'costumed vigilante'],
      coin: { Poor: function () { return '$' + _d(20) + ' and a MetroCard'; }, Standard: function () { return '$' + (_d(6) * 30) + ' and a phone'; }, Wealthy: function () { return '$' + (_d(6) * 500 + 200) + ' and a black card'; } },
      age: function (k) { return k === 'Android' || k === 'Alien' ? '—' : String(_d(45) + 18); }
    },

    // ── JUSTICE LEAGUE UNLIMITED (DC-animated metropolis) ──────────────────
    JLU: {
      kindLabel: 'Origin',
      kinds: ['Human', 'Human', 'Human', 'Metahuman', 'Atlantean', 'Thanagarian', 'Kryptonian', 'Amazon', 'Alien'],
      names: {
        Human:      ['Clark', 'Lois', 'Bruce', 'Barbara', 'Oliver', 'Dinah', 'Ted', 'Renee', 'Jim', 'Vicki', 'Harvey', 'Iris', 'Ron', 'Cat', 'Perry', 'Angela', 'Snapper', 'Mercy', 'Rupert', 'Summer'],
        Metahuman:  ['Wally', 'Jaime', 'Rex', 'Zatanna', 'Vixen', 'Mari', 'Static', 'Rocket', 'Gear', 'Jefferson', 'Anissa', 'Jenny', 'Cisco', 'Nate', 'Sarah', 'Michael', 'Roy', 'Helena', 'Kendra', 'Ralph'],
        Atlantean:  ['Orin', 'Mera', 'Garth', 'Tula', 'Kaldur', 'Vulko', 'Koryak', 'Dolphin', 'Lorena', 'Nuidis', 'Cerdian', 'Debbie', 'Slizzath', 'Coral', 'Kordax', 'Tempest', 'Marina', 'Selia', 'Thal', 'Nereus'],
        Thanagarian:['Katar', 'Shayera', 'Paran', 'Hro', 'Kragger', 'Tanya', 'Byth', 'Fel', 'Re750', 'Sethlan', 'Onn', 'Mavis', 'Corsar', 'Illora', 'Danel', 'Vashkka', 'Thangar', 'Rekk', 'Nadia', 'Voss'],
        Kryptonian: ['Kara', 'Kal', 'Jor', 'Lara', 'Zor', 'Dru-Zod', 'Faora', 'Non', 'Val', 'Thara', 'Lyla', 'Cir', 'Nam', 'Seg', 'Kem', 'Ursa', 'Gor', 'Lena', 'Van', 'Alura'],
        Amazon:     ['Diana', 'Hippolyta', 'Artemis', 'Philippus', 'Nubia', 'Antiope', 'Io', 'Menalippe', 'Euboea', 'Penelope', 'Aleka', 'Mala', 'Phthia', 'Timandra', 'Orana', 'Egeria', 'Kalliste', 'Venelia', 'Dessa', 'Thalestris'],
        Alien:      ['J\'onn', 'Kilowog', 'Tomar', 'Katma', 'Despero', 'Sinestro', 'M\'gann', 'Abin', 'Ch\'p', 'Arisia', 'Salaak', 'Galius', 'Larfleeze', 'Brainiac', 'Mongul', 'Vril', 'Xa', 'Tanor', 'Zell', 'Ohm']
      },
      builds: ['average', 'athletic', 'imposing', 'slim', 'powerfully built', 'lean', 'stocky', 'statuesque', 'wiry', 'unassuming'],
      hair: HAIR_STD, eyes: EYES_STD,
      features: ['a Daily Planet press badge', 'a GCPD detective\'s shield', 'a lab coat', 'a Wayne Enterprises lanyard', 'a Metropolis PD uniform', 'a hidden comm earpiece', 'a scar from "the invasion"', 'a briefcase chained to the wrist', 'a nervous glance toward the sky', 'a LexCorp ID card', 'a mayor\'s-office pin', 'a faint glow behind the eyes'],
      demeanor: ['heroic', 'skeptical', 'idealistic', 'grim', 'wisecracking', 'by-the-book', 'anxious', 'commanding', 'cynical', 'earnest', 'guarded', 'brash'],
      quirks: ['always has a police scanner going', 'name-drops the League', 'refuses to run from a fight', 'keeps looking up for flying rescues', 'distrusts anyone from LexCorp', 'quotes the Guardian oath', 'never breaks a promise', 'carries a Kryptonite-detector "just in case"'],
      dress: {
        Poor: ['a worn work jacket', 'a diner uniform', 'a patched winter coat', 'thrift-store layers', 'a maintenance jumpsuit'],
        Standard: ['a reporter\'s blazer', 'a police uniform', 'business casual', 'lab scrubs', 'a transit worker\'s vest'],
        Wealthy: ['a Wayne-gala tuxedo', 'a LexCorp power suit', 'a senator\'s tailored suit', 'a designer evening gown', 'a corporate trench and gold watch']
      },
      wants: ['the truth reported', 'the city protected', 'the League\'s help', 'a corrupt official exposed', 'a loved one rescued', 'a villain stopped', 'their powers controlled', 'a second chance', 'justice for the wronged', 'to matter in a world of gods'],
      secrets: ['knows a hero\'s civilian identity', 'is on Luthor\'s payroll', 'is a Cadmus operative', 'is secretly a metahuman', 'witnessed a League cover-up', 'is being mind-controlled', 'works for an alien power', 'faked their own death'],
      occupations: ['reporter', 'GCPD detective', 'STAR Labs scientist', 'cab driver', 'senator', 'ER nurse', 'security guard', 'mob enforcer', 'city engineer', 'museum curator', 'defense attorney', 'firefighter', 'Cadmus agent', 'talk-radio host', 'dockworker', 'schoolteacher', 'corporate exec', 'street vigilante'],
      coin: { Poor: function () { return '$' + _d(20) + ' and bus fare'; }, Standard: function () { return '$' + (_d(6) * 40) + ' and a phone'; }, Wealthy: function () { return '$' + (_d(6) * 800 + 200) + ' and stock options'; } },
      age: function (k) { return k === 'Kryptonian' || k === 'Amazon' || k === 'Alien' || k === 'Atlantean' ? '—' : String(_d(45) + 18); }
    },

    // ── GHOSTBUSTERS (1980s New York, comedic supernatural) ────────────────
    GB: {
      kindLabel: null, kinds: null,
      names: {
        _: ['Louis', 'Dana', 'Walter', 'Janine', 'Egon', 'Sal', 'Frankie', 'Roz', 'Vinnie', 'Loretta', 'Marty', 'Gina', 'Artie', 'Debbie', 'Hank', 'Carol', 'Lenny', 'Pam', 'Angelo', 'Cheryl', 'Mr. Tully', 'Mrs. Kowalski', 'Father Dunne', 'Doorman Otis']
      },
      builds: ['schlubby', 'wiry', 'heavyset', 'lanky', 'average', 'short and round', 'tall and stooped', 'pear-shaped', 'stocky', 'string-bean thin'],
      hair: ['big permed', 'balding comb-over', 'greasy pompadour', 'frizzy and hairsprayed', 'thinning', 'a bad toupee', 'feathered', 'mullet', 'a tight bun', 'unwashed'],
      eyes: EYES_STD,
      features: ['coke-bottle glasses', 'a nervous sweat', 'a Yankees cap', 'a lit cigarette', 'a gold chain and open collar', 'a clipboard and a scowl', 'a name-tag from a job they hate', 'a NY accent you can cut with a knife', 'nicotine-stained fingers', 'a rent-controlled desperation', 'a rabbit\'s-foot keychain', 'a pocket protector'],
      demeanor: ['neurotic', 'skeptical', 'exasperated', 'fast-talking', 'terrified', 'greedy', 'jaded', 'over-caffeinated', 'lovestruck', 'blustering', 'deadpan', 'hysterical'],
      quirks: ['blames everything on the co-op board', 'won\'t stop talking about their taxes', 'quotes bad late-night TV ads', 'is convinced it\'s "just the pipes"', 'name-drops their cousin at City Hall', 'keeps a lucky pastrami sandwich', 'argues about the parking', 'refuses to believe in ghosts (while running from one)'],
      dress: {
        Poor: ['a stained undershirt and slippers', 'a threadbare doorman\'s coat', 'a food-service uniform', 'a rumpled trench over pajamas', 'a bowling-league shirt'],
        Standard: ['a corduroy blazer with elbow patches', 'a MTA uniform', 'a polyester leisure suit', 'a waitress dress and apron', 'a cardigan and slacks'],
        Wealthy: ['a power suit with shoulder pads', 'a fur coat and too much jewelry', 'a Wall Street pinstripe', 'a gaudy gold-buttoned blazer', 'a designer gown and a little dog']
      },
      wants: ['the ghost gone by morning', 'their deposit back', 'the noise to stop', 'a permit signed (or ignored)', 'someone else to handle it', 'the story kept out of the papers', 'their apartment un-haunted', 'a date with the neighbor', 'the EPA off their back', 'to not get fired over this'],
      secrets: ['summoned it by accident', 'has been feeding the thing in the basement', 'sold the building knowing it was cursed', 'is the Keymaster (and doesn\'t know it)', 'saw the last super vanish', 'is skimming the tenants\' association fund', 'made a deal to save the restaurant', 'has been possessed since Tuesday'],
      occupations: ['building super', 'cab driver', 'hot-dog vendor', 'EPA inspector', 'hotel manager', 'librarian', 'radio DJ', 'doorman', 'museum curator', 'mayor\'s aide', 'tabloid reporter', 'accountant', 'deli owner', 'subway clerk', 'exterminator', 'psychic hotline operator', 'wedding photographer', 'night-shift security'],
      coin: { Poor: function () { return '$' + _d(10) + ' and a subway token'; }, Standard: function () { return '$' + (_d(6) * 15) + ' and a checkbook'; }, Wealthy: function () { return '$' + (_d(6) * 300 + 100) + ' and a co-op deed'; } },
      age: function () { return String(_d(45) + 22); }
    }

  };
})();
