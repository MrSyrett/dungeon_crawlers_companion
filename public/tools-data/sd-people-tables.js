// Shadowdark core-rulebook PEOPLE generators — NPCs (pp. 124–125), NPC names
// (pp. 128–129), rival crawlers (pp. 126–127), taverns (pp. 136–137) and shops
// (pp. 138–139). Every table is the book's, die and results exact. Shared by the
// GM Screen (genNPC / genRivalCrawler / genShop when the system is Shadowdark)
// and the session-prep builder (randNPC). The "sd-" prefix means the GM Screen
// only serves this file to Shadowdark campaigns, so every reader guards on
// `window.SD_PEOPLE`.
//
// Weighted rows are [weight, result]: weight = how many faces of the die give
// that result (e.g. "1-4" on a d12 = 4). roll() expands and picks uniformly,
// which reproduces the book's odds exactly. 2d6 tables use roll2d6().
(function () {
  var d = function (n) { return Math.floor(Math.random() * n) + 1; };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var roll = function (rows) {
    var total = 0, i; for (i = 0; i < rows.length; i++) total += rows[i][0];
    var r = d(total);
    for (i = 0; i < rows.length; i++) { r -= rows[i][0]; if (r <= 0) return rows[i][1]; }
    return rows[rows.length - 1][1];
  };
  // 2d6 table keyed by the low end of each band: [[2,x],[3,y],[5,z]…] → value for the total.
  var roll2d6 = function (bands) {
    var t = d(6) + d(6), out = bands[0][1];
    for (var i = 0; i < bands.length; i++) if (t >= bands[i][0]) out = bands[i][1];
    return out;
  };
  // d4,d4 grid (row die, column die): grid[row][col].
  var grid = function (g) { return g[d(4) - 1][d(4) - 1]; };

  var P = {};

  // ── NPCs (p.124) ────────────────────────────────────────────────────────
  P.ancestry = [[4, 'Human'], [2, 'Elf'], [2, 'Dwarf'], [2, 'Halfling'], [1, 'Half-Orc'], [1, 'Goblin']];   // d12
  P.age = [[1, 'Child'], [1, 'Adolescent'], [2, 'Adult'], [2, 'Middle-Aged'], [1, 'Elderly'], [1, 'Ancient']]; // d8
  P.alignment = [[3, 'Lawful'], [1, 'Neutral'], [2, 'Chaotic']];                                           // d6
  P.wealth = [[1, 'Poor'], [2, 'Standard'], [2, 'Wealthy'], [1, 'Extravagant']];                          // d6

  // NPC Qualities (p.125) — d20, one roll per column.
  P.appearance = ['Balding', 'Stocky build', 'Very tall', 'Beauty mark', 'One eye', 'Braided hair', 'Muscular', 'White hair', 'Scar on face', 'Willowy build',
    'Sweaty', 'Cleft chin', 'Frail', 'Big eyebrows', 'Tattooed', 'Floppy hat', 'Gold tooth', 'Six fingers', 'Very short', 'Large nose'];
  P.does = ['Spits', 'Always eating', 'Moves quickly', 'Card tricks', 'Prays aloud', 'Writes in diary', 'Apologetic', 'Slaps backs', 'Drops things', 'Swears oaths',
    'Makes puns', 'Rare accent', 'Easily spooked', 'Forgetful', 'Speaks quietly', 'Twitches', 'Moves slowly', 'Speaks loudly', 'Swaggers', 'Smokes pipe'];
  P.secret = ['Hiding a fugitive', 'Adores baby animals', 'Obsessed with fire', 'In a religious cult', 'Is a half-demon', "Was a wizard's apprentice", 'Needlessly picks pockets',
    'Has a false identity', 'Afraid of storms', 'Has functional gills', 'In deep gambling debt', 'Works as a smuggler', 'Is a werewolf', 'Can actually smell lies',
    'Cast out of wealthy family', 'In love with a bartender', "Left the Thieves' Guild", 'Best friends with a prince', 'Retired crawler', 'Has a pet basilisk'];

  // Occupation (p.125) — d4 row, d4 column.
  P.occupation = [
    ['Gravedigger', 'Carpenter', 'Scholar', 'Blacksmith'],
    ['Tax collector', 'Farmer', 'Bartender', 'Beggar'],
    ['Baker', 'Cook', 'Sailor', 'Butcher'],
    ['Locksmith', 'Cobbler', 'Friar/nun', 'Merchant']
  ];

  // NPC Names by Ancestry (p.128) — d20.
  P.names = {
    Dwarf:      ['Hera', 'Torin', 'Ginny', 'Gant', 'Olga', 'Dendor', 'Ygrid', 'Pike', 'Sarda', 'Brigg', 'Zorli', 'Yorin', 'Jorgena', 'Trogin', 'Riga', 'Barton', 'Katrina', 'Egrim', 'Elsa', 'Orgo'],
    Elf:        ['Sarenia', 'Ravos', 'Imeria', 'Farond', 'Isolden', 'Kieren', 'Mirenel', 'Riarden', 'Allindra', 'Arlomas', 'Sylara', 'Tyr', 'Rinariel', 'Saramir', 'Vedana', 'Elindos', 'Ophelia', 'Cydaros', 'Tiramel', 'Varond'],
    Goblin:     ['Kog', 'Dibbs', 'Fronk', 'Irv', 'Squag', 'Mort', 'Vig', 'Sticks', 'Gorb', 'Yogg', 'Plok', 'Zrak', 'Dent', 'Krik', 'Mizzo', 'Bort', 'Nabo', 'Hink', 'Bree', 'Kreeb'],
    Halfling:   ['Myrtle', 'Robby', 'Nora', 'Percy', 'Daisy', 'Jolly', 'Evelyn', 'Horace', 'Willie', 'Gertie', 'Peri', 'Carlsby', 'Nyx', 'Kellan', 'Fern', 'Harlow', 'Moira', 'Sage', 'Reenie', 'Wendry'],
    'Half-Orc': ['Troga', 'Boraal', 'Urgana', 'Zoraal', 'Scalga', 'Krell', 'Voraga', 'Morak', 'Draga', 'Sorak', 'Varga', 'Ulgar', 'Jala', 'Kresh', 'Zana', 'Torvash', 'Rokara', 'Gartak', 'Iskana', 'Ziraak'],
    Human:      ['Hesta', 'Matteo', 'Rosalin', 'Endric', 'Kiara', 'Yao', 'Corina', 'Rowan', 'Hariko', 'Ikam', 'Mariel', 'Jin', 'Hana', 'Lios', 'Indra', 'Remy', 'Nura', 'Vakesh', 'Una', 'Nabilo']
  };

  // NPC Names by Syllable (p.129) — d20 per column; "use some or all of the generated syllables".
  P.syllables = {
    prefix: ['Ir', 'Van', 'Cyr', 'Den', 'Cor', 'Hil', 'Sal', 'Bri', 'Mar', 'Gar', 'Tin', 'Vor', 'Nel', 'Ri', 'Quor', 'Bal', 'Mur', 'Par', 'Tor', 'Lem'],
    s2:     ['an', 'ish', 'tos', 'zar', 'ven', 'sen', 'win', 'on', 'en', 'lin', 'sor', 'oc', 'vyn', 'al', 'osh', 'er', 'in', 'el', 'un', 'nar'],
    s3:     ['l', 'n', 'pil', 'g', 'z', 'bor', 't', 'c', 'ar', 'q', 'v', 'iv', 'ov', 'b', 'den', 'k', 's', 'r', 'jen', 'w'],
    suffix: ['int', 'us', 'ios', 'el', 'inne', 'os', 'ian', 'ius', 'iol', 'an', 'isk', 'erg', 'ent', 'ial', 'ant', 'iel', 'onne', 'org', 'enne', 'ynne']
  };

  // Identifier (p.129) — d4 row, d4 column.
  P.identifier = [
    ['The Gray', 'One-Eye', 'The Lesser', 'The Cunning'],
    ['Silvertongue', 'The Outcast', 'Fasthands', 'The Bold'],
    ['The Elder', 'The Charmer', 'The Exiled', 'The Wise'],
    ['Tree-Speaker', 'The Craven', 'The Red', 'Six-Finger']
  ];

  // ── Rival Crawlers (pp. 126–127) ────────────────────────────────────────
  // 1d4 + 1 members, all of one alignment; each rolls 1d6 for starting level.
  P.rivalAncestry = P.ancestry;                                                       // d12
  P.rivalClass = ['Fighter', 'Priest', 'Thief', 'Wizard'];                            // d4
  P.rivalAlignment = [[2, 'Lawful'], [2, 'Neutral'], [2, 'Chaotic']];                  // d6
  P.renown = [[1, 'Unknown'], [2, 'Locally known'], [2, 'Widely recognized'], [1, 'Extremely famous']]; // d6
  P.partySecret = [[2, 'Betrayed an oath'], [3, 'False/stolen identities'], [5, "In debt to Thieves' Guild"],
    [7, 'Map to major treasure'], [9, 'Suffering a curse'], [12, 'Has a powerful patron']];           // 2d6 bands (low end)
  P.partyWealth = [[1, 'Poor'], [3, 'Standard'], [1, 'Wealthy'], [1, 'Extravagant']];   // d6
  P.partyName1 = ['The Savage', 'The Steel', 'The Icy', "Hell's", 'The Dread', 'The Marvelous', 'The Flaming', 'The Lone', 'The Noble', 'The Mighty',
    'The Iron', "The Devil's", 'The Emerald', 'The Vigilant', 'The Lightless', 'The Forest', "Death's", 'The Dark', 'The Thundering', 'The Divine'];
  P.partyName2 = ['Wardens', 'Skulls', 'Guardians', 'Hammers', 'Rangers', 'Explorers', 'Moon', 'Wolves', 'Delvers', 'Dawn',
    'Drakes', 'Miscreants', 'Scimitars', 'Storm', 'Trackers', 'Oath', 'Sentinels', 'Lions', 'Knights', 'Hunters'];
  P.partyKnownFor = ['Defeating a dragon', 'Specializing in undead', 'Zealous worship of a god', 'Slaying a two-headed ogre', 'Going missing for a year',
    'Taking monster trophies', 'Setting taverns on fire', 'Their signature clothing', 'Brashness and arrogance', 'A disastrous expedition',
    'Dabbling in evil magic', 'Their frenzied admirers', 'Serving in a brutal war', 'Large gambling debts', 'Their pet lion',
    'Surviving the fall of Korint', 'Finding a legendary sword', 'Spying on other crawlers', 'Defeating a necromancer', 'Poaching treasure finds'];
  P.tactics = {                                                                       // d4 by party alignment
    Lawful:  ['Always negotiate', 'Fight honorably', 'Never use stealth', 'Loyal followers'],
    Neutral: ['Scout and sneak', 'Follow rivals', 'Cache resources', 'Buy information'],
    Chaotic: ['Ambush rivals', 'Sacrifice NPCs', 'Kill everything', 'Target the helpless']
  };

  // ── Taverns (pp. 136–137) ───────────────────────────────────────────────
  // Poor: 2 drinks (d6 each), 3 Poor food. Standard: 3 drinks (2d6 each), 1 Poor + 2 Standard.
  // Wealthy: 4 drinks (d12 each), 2 Standard + 2 Wealthy.
  P.tavernMenu = {
    Poor:     { drinks: 2, drinkDie: 'd6',  food: { Poor: 3 } },
    Standard: { drinks: 3, drinkDie: '2d6', food: { Poor: 1, Standard: 2 } },
    Wealthy:  { drinks: 4, drinkDie: 'd12', food: { Standard: 2, Wealthy: 2 } }
  };
  P.tavernName1 = ['The Crimson', 'The Dancing', 'The Dog &', 'The Rusty', "The Demon's", 'The Singing', 'The Boar &', 'The Silver', 'The Filthy', "The Captain's",
    'The Jolly', 'The Wise', 'Cloak &', 'The Royal', 'The Gilded', 'The Blade &', 'The Drunken', 'Cup &', 'The Jeweled', 'The Frog &'];
  P.tavernName2 = ['Rat', 'Wench', 'Lantern', 'Eel', 'Goblet', 'Trident', 'Candle', 'Dagger', 'Wheel', 'Pig',
    'Snake', 'Camel', 'Dragon', 'Axe', 'Bell', 'Tankard', 'Shield', 'Blade', 'Anvil', 'Bard'];
  P.tavernKnownFor = ['High-stakes gambling', 'Illicit poison sales', 'Wizard patrons', 'Cult rituals in the basement', 'Rare food and drinks',
    'Dancing contests', 'Violent brawls', 'Ancient tunnels in the cellar', 'Thugs for hire', "Thieves' Guild spies",
    'Hostility toward spellcasters', 'City Watch patrons', 'Underground pit fighting', 'Famous bard performances', 'Treasonous meetings',
    'Ban on all weapons', 'Hostility toward non-regulars', 'Exotic taxidermy collection', 'Pirate and smuggler patrons', 'Drinking contests'];
  P.food = {                                                                          // d12 per column
    Poor:     { price: '1d4 cp', items: ['Boiled cabbage', 'Dates and olives', 'Goat stew', 'Pickled eggs', 'Cheese and bread', 'Hearty broth', 'Meat pastry', 'Mushroom kebab', 'Roasted pigeon', 'Garlic flatbread', 'Turkey leg', 'Rat-on-a-stick'] },
    Standard: { price: '1d6 sp', items: ['Alligator steak', 'Rosemary ham', 'Raw flailfish', 'Seared venison', 'Buttered ostrich', 'Spicy veal curry', 'Salted frog legs', 'Herbed snails', 'Grilled tiger eel', 'Spit-roasted boar', 'Saffron duck neck', 'Crimson pudding'] },
    Wealthy:  { price: '1d8 gp', items: ['Fried basilisk eyes', 'Giant snake filet', 'Griffon eggs', 'Candied scarabs', 'Baked troll bones', 'Cockatrice wings', 'Crispy silkworms', 'Roasted stingbat', 'Dire lobster tail', 'Wyvern tongue', 'Shrieking seaweed', 'Dragon shanks'] }
  };
  P.drinks = [                                                                        // indexed 1–12 by the drink die
    'Barnacle grog. 1 cp, DC 9 Constitution check or blind 1 hour',
    'Watered-down swill. 3 cp, toxic, -1 Constitution 1 hour',
    'Vinegary wine. 5 cp, stains teeth purple, -1 Charisma 1 hour',
    'Stale ale. 5 cp, dulls the senses, -1 Wisdom 1 hour',
    'Clear spirits. 1 sp, burns, ends 1 bad effect of another drink',
    'House ale. 2 sp, crisp and clean, first mug is free',
    'Autumn mead. 3 sp, floral, doubles effect of next drink',
    'Halfling summer wine. 5 sp, sparkling, +1 Charisma 1 hour',
    'Elvish brandy. 5 sp, spiced, +1 Intelligence 1 hour',
    'Dwarvish gold ale. 5 sp, icy cold, regain 1d4 HP per mug',
    'Aged royal wine. 2 gp, smooth and rich, +1 Wisdom 1 hour',
    'Van Dinkle whiskey. 20 gp a sip, only 5 bottles made, +1 XP'
  ];

  // ── Shops (pp. 138–139) ─────────────────────────────────────────────────
  P.shopType = {
    Poor:     ['Filthy bakery', 'Used adventuring gear', 'Dead body collector', 'Pawn shop/fence', 'Moneylender', 'Manure collector', 'Tannery',
               'Back-alley chirurgeon', 'Ratcatcher', 'Fishmonger', 'Gambling house', 'Drug den'],                                   // d12
    Standard: ['Brewer', 'Butcher', 'Tailor', 'Common blacksmith', 'Adventuring gear', 'Leatherworker', 'Shipwright/carpenter', 'Stonemason',
               'Herald/town crier', 'Livestock'],                                                                                   // d10
    Wealthy:  ['Fine tailor', 'Glassblower', 'Jeweler', 'Apothecary', 'Artist', 'Scribe', 'Guildhall', 'Goldsmith', 'Master blacksmith',
               'Antiques and curios']                                                                                                // d10
  };
  P.shopName1 = ['Fink &', 'Imperial', 'The Stout', "Rose's", "The King's", 'Fox &', 'Noble', "Sylvia's", 'Sunrise', 'The Corner',
    "Grigor's", 'Royal', 'Crown &', "Ralina's", 'The Village', 'Golden', 'Boot &', "Marvolo's", 'The Merry', 'The Jade'];
  P.shopName2 = ['Sons', 'Toad', 'Hammer', 'Commodities', 'Daughters', 'Sundries', 'Castle', 'Finery', 'Oddments', 'Beetle',
    'Storehouse', 'Keep', 'Coins', 'Hearth', 'Wheel', 'Wares', 'Market', 'Lantern', 'Vendibles', 'Stocks'];
  P.shopKnownFor = ['Ancient, beloved owner', 'Buying anything of value', 'Charging non-regulars extra', "Being a Thieves' Guild front",
    'Resident cat, Crumpet', 'Password required to enter', 'Free ale with a purchase', 'Heavily armed bodyguards', 'Paying top coin for curios',
    'Secret room behind shelf', 'Fencing illicit goods', 'Ringing a gong at every sale', 'Goods from distant lands', 'Shoddy and cheap items',
    'Accusing customers of theft', 'All goods are dyed blue', "Owner's talking parrot", 'Famous bronze imp statue', 'Being haunted',
    'Aggressive rodent problem'];
  P.customer = [                                                                      // d4 row, d4 column
    ['Odd wizard', '1d10 children', 'Cackling crone', 'Loud dwarf'],
    ['Nervous elf', 'Shifty thug', 'Town guard', '1d4 priests'],
    ['Goblin pirate', 'Cowled mage', 'Half-orc knight', 'Drunk man'],
    ['Staring child', 'Rival crawlers', 'Glum halfling', 'Pickpocket']
  ];

  // ── Rollers ─────────────────────────────────────────────────────────────
  P.roll = roll; P.roll2d6 = roll2d6; P.grid = grid; P.d = d; P.pick = pick;

  P.syllableName = function () {
    var S = P.syllables, n = pick(S.prefix), k = d(3);              // use some or all of the syllables
    if (k >= 2) n += pick(S.s2);
    if (k >= 3) n += pick(S.s3);
    return n + pick(S.suffix);
  };
  P.npcName = function (anc) { return pick(P.names[anc] || P.names.Human); };

  // One NPC, every field from the book. `anc` / `wealth` may be given (else rolled).
  P.npc = function (anc, wealth) {
    var a = (anc && P.names[anc]) ? anc : roll(P.ancestry);
    return {
      ancestry: a,
      name: P.npcName(a),
      altName: P.syllableName(),
      identifier: grid(P.identifier),
      age: roll(P.age),
      alignment: roll(P.alignment),
      wealth: wealth || roll(P.wealth),
      appearance: pick(P.appearance),
      does: pick(P.does),
      secret: pick(P.secret),
      occupation: grid(P.occupation)
    };
  };

  // A rival crawler party (1d4 + 1 members unless `size` given).
  P.rivals = function (size) {
    var n = size || (d(4) + 1), al = roll(P.rivalAlignment), members = [];
    for (var i = 0; i < n; i++) {
      var a = roll(P.rivalAncestry);
      members.push({ name: P.npcName(a), ancestry: a, cls: pick(P.rivalClass), level: d(6) });
    }
    return {
      count: n, alignment: al, members: members,
      name: pick(P.partyName1) + ' ' + pick(P.partyName2),
      knownFor: pick(P.partyKnownFor),
      renown: roll(P.renown),
      secret: roll2d6(P.partySecret),
      wealth: roll(P.partyWealth),
      tactics: pick(P.tactics[al])
    };
  };

  // A tavern of the given quality: name, known for, and its menu by the book's counts.
  P.tavern = function (tier) {
    var M = P.tavernMenu[tier] || P.tavernMenu.Standard, food = [], drinks = [], k, j;
    // A menu lists each dish/drink once: reroll repeats (capped so a tiny table can't loop).
    for (k in M.food) for (j = 0; j < M.food[k]; j++) {
      var f, t = 0;
      do { f = pick(P.food[k].items) + ' (' + P.food[k].price + ')'; } while (food.indexOf(f) >= 0 && ++t < 20);
      food.push(f);
    }
    for (j = 0; j < M.drinks; j++) {
      var dr, n = 0;
      do { var r = M.drinkDie === '2d6' ? d(6) + d(6) : M.drinkDie === 'd12' ? d(12) : d(6); dr = P.drinks[r - 1]; } while (drinks.indexOf(dr) >= 0 && ++n < 20);
      drinks.push(dr);
    }
    return { name: pick(P.tavernName1) + ' ' + pick(P.tavernName2), knownFor: pick(P.tavernKnownFor), food: food, drinks: drinks };
  };

  // A shop of the given quality: name, known for, shop type, interesting customer.
  P.shop = function (tier) {
    return {
      name: pick(P.shopName1) + ' ' + pick(P.shopName2), knownFor: pick(P.shopKnownFor),
      type: pick(P.shopType[tier] || P.shopType.Standard), customer: grid(P.customer)
    };
  };

  window.SD_PEOPLE = P;
})();
