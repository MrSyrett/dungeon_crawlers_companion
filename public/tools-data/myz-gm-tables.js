// Mutant: Year Zero GM generator tables (core rulebook: Zone sector Ch.11, NPC
// generator & events Ch.9, Scrap D666 appendix). Rows are { roll, result }.
const MYZ_GM_TABLES = {
 "sectorEnvironment": [
  {
   "roll": "11-12",
   "result": "Thick Woods"
  },
  {
   "roll": "13-15",
   "result": "Scrublands"
  },
  {
   "roll": "16-21",
   "result": "Marshlands"
  },
  {
   "roll": "22-24",
   "result": "Dead Woods"
  },
  {
   "roll": "25-26",
   "result": "Ash Desert"
  },
  {
   "roll": "31",
   "result": "Huge Crater"
  },
  {
   "roll": "32",
   "result": "Glasified Field"
  },
  {
   "roll": "33-35",
   "result": "Overgrown Ruins"
  },
  {
   "roll": "36-42",
   "result": "Crumbling Ruins"
  },
  {
   "roll": "43-51",
   "result": "Decayed Ruins"
  },
  {
   "roll": "52-56",
   "result": "Unscathed Ruins"
  },
  {
   "roll": "61-64",
   "result": "Derelict Industries"
  },
  {
   "roll": "65-66",
   "result": "Settlement"
  }
 ],
 "ruinsNormal": [
  {
   "roll": "11",
   "result": "Airplane Wreck"
  },
  {
   "roll": "12",
   "result": "Amusement Park"
  },
  {
   "roll": "13",
   "result": "Battlefield"
  },
  {
   "roll": "14",
   "result": "Bus Station"
  },
  {
   "roll": "15",
   "result": "Car Park"
  },
  {
   "roll": "16",
   "result": "Church"
  },
  {
   "roll": "21",
   "result": "Cinema"
  },
  {
   "roll": "22",
   "result": "Crater"
  },
  {
   "roll": "23",
   "result": "Dilapidated Mansion"
  },
  {
   "roll": "24",
   "result": "Fast Food Joint"
  },
  {
   "roll": "25",
   "result": "Gas Station"
  },
  {
   "roll": "26",
   "result": "Highway"
  },
  {
   "roll": "31",
   "result": "Hospital"
  },
  {
   "roll": "32",
   "result": "Hunting Store"
  },
  {
   "roll": "33",
   "result": "Mall"
  },
  {
   "roll": "34",
   "result": "Marina"
  },
  {
   "roll": "35",
   "result": "Museum"
  },
  {
   "roll": "36",
   "result": "Office Building"
  },
  {
   "roll": "41",
   "result": "Overgrown Park"
  },
  {
   "roll": "42",
   "result": "Playground"
  },
  {
   "roll": "43",
   "result": "Police Station"
  },
  {
   "roll": "44",
   "result": "Radio Station"
  },
  {
   "roll": "45",
   "result": "Residential Blocks"
  },
  {
   "roll": "46",
   "result": "Road Tunnel"
  },
  {
   "roll": "51",
   "result": "Ruined Bridge"
  },
  {
   "roll": "52",
   "result": "School"
  },
  {
   "roll": "53",
   "result": "Shelter"
  },
  {
   "roll": "54",
   "result": "Skyscraper"
  },
  {
   "roll": "55",
   "result": "Sports Center"
  },
  {
   "roll": "56",
   "result": "Suburbia"
  },
  {
   "roll": "61",
   "result": "Subway Station"
  },
  {
   "roll": "62",
   "result": "Supermarket"
  },
  {
   "roll": "63",
   "result": "Swimming Hall"
  },
  {
   "roll": "64",
   "result": "Tank"
  },
  {
   "roll": "65",
   "result": "Theater"
  },
  {
   "roll": "66",
   "result": "Train Station"
  }
 ],
 "ruinsIndustry": [
  {
   "roll": "11-13",
   "result": "Factory"
  },
  {
   "roll": "14-16",
   "result": "Military Base"
  },
  {
   "roll": "21-23",
   "result": "Oil Cistern"
  },
  {
   "roll": "24-26",
   "result": "Pipeline"
  },
  {
   "roll": "31-33",
   "result": "Purification Plant"
  },
  {
   "roll": "34-36",
   "result": "Power Line"
  },
  {
   "roll": "41-43",
   "result": "Radio Mast"
  },
  {
   "roll": "44-46",
   "result": "Refinery"
  },
  {
   "roll": "51-53",
   "result": "Rubbish Dump"
  },
  {
   "roll": "54-56",
   "result": "Shipwreck"
  },
  {
   "roll": "61-63",
   "result": "Shooting Range"
  },
  {
   "roll": "64-66",
   "result": "Windmill"
  }
 ],
 "rotLevel": [
  {
   "roll": "11-12",
   "result": "Rot Oasis (0) — safe from the Rot here."
  },
  {
   "roll": "13-55",
   "result": "Weak Rot (1) — one Rot Point per day."
  },
  {
   "roll": "56-66",
   "result": "Rot-Heavy (2) — one Rot Point per hour."
  }
 ],
 "threatType": [
  {
   "roll": "1-2",
   "result": "Humanoid"
  },
  {
   "roll": "3-5",
   "result": "Monster"
  },
  {
   "roll": "6",
   "result": "Phenomenon"
  }
 ],
 "humanoidThreat": [
  {
   "roll": "11",
   "result": "Amnesiac"
  },
  {
   "roll": "12-13",
   "result": "Beast Mutants"
  },
  {
   "roll": "14-16",
   "result": "Cannibals"
  },
  {
   "roll": "21-22",
   "result": "Doom Cultists"
  },
  {
   "roll": "23-25",
   "result": "Exiled Mutants"
  },
  {
   "roll": "26-32",
   "result": "Expedition from Another Ark"
  },
  {
   "roll": "33-35",
   "result": "Helldrivers"
  },
  {
   "roll": "36-42",
   "result": "Morlocks"
  },
  {
   "roll": "43-44",
   "result": "Nova Cultists"
  },
  {
   "roll": "45-46",
   "result": "Patrol from the Ark"
  },
  {
   "roll": "51-52",
   "result": "Scrap Oracle"
  },
  {
   "roll": "53-54",
   "result": "Wanderers"
  },
  {
   "roll": "55-56",
   "result": "Water Trader"
  },
  {
   "roll": "61-62",
   "result": "Wreckers"
  },
  {
   "roll": "63-66",
   "result": "Zone-Ghouls"
  }
 ],
 "monsterThreat": [
  {
   "roll": "11-12",
   "result": "Acid Grass"
  },
  {
   "roll": "13",
   "result": "Air Jellies"
  },
  {
   "roll": "14",
   "result": "Automaton"
  },
  {
   "roll": "15-16",
   "result": "Bitterbeast"
  },
  {
   "roll": "21-22",
   "result": "Deathworm"
  },
  {
   "roll": "23-24",
   "result": "Devourer"
  },
  {
   "roll": "25-26",
   "result": "Grazers"
  },
  {
   "roll": "31",
   "result": "Gutfish (infected water)"
  },
  {
   "roll": "32",
   "result": "Killer Tree"
  },
  {
   "roll": "33",
   "result": "Mind Mosquitoes"
  },
  {
   "roll": "34",
   "result": "Nightmare Flowers"
  },
  {
   "roll": "35",
   "result": "Parasite Fungus"
  },
  {
   "roll": "36",
   "result": "Razorback"
  },
  {
   "roll": "41-42",
   "result": "Rot Ants"
  },
  {
   "roll": "43",
   "result": "Rotfish"
  },
  {
   "roll": "44-45",
   "result": "Scrap Crows"
  },
  {
   "roll": "46",
   "result": "Trash Hawk"
  },
  {
   "roll": "51",
   "result": "Worm Swarm"
  },
  {
   "roll": "52-54",
   "result": "Zone Dogs"
  },
  {
   "roll": "55-56",
   "result": "Zone Leeches"
  },
  {
   "roll": "61-63",
   "result": "Zone Rats"
  },
  {
   "roll": "64-65",
   "result": "Zone Spider"
  },
  {
   "roll": "66",
   "result": "Zone Wasps"
  }
 ],
 "phenomenonThreat": [
  {
   "roll": "11-13",
   "result": "Acid Rain"
  },
  {
   "roll": "14-15",
   "result": "Ash Storm"
  },
  {
   "roll": "16-21",
   "result": "Dust Tornado"
  },
  {
   "roll": "22-23",
   "result": "Electric Storm"
  },
  {
   "roll": "24",
   "result": "Ghost Lights"
  },
  {
   "roll": "25",
   "result": "Inertia Field"
  },
  {
   "roll": "26-31",
   "result": "Magnetic Field"
  },
  {
   "roll": "32",
   "result": "Mirage"
  },
  {
   "roll": "33-34",
   "result": "Mud Puddles"
  },
  {
   "roll": "35-36",
   "result": "Night Lights"
  },
  {
   "roll": "41",
   "result": "Obelisk"
  },
  {
   "roll": "42-43",
   "result": "Pillars of Light"
  },
  {
   "roll": "44-46",
   "result": "Rot Hotspot"
  },
  {
   "roll": "51-52",
   "result": "Rot Wind"
  },
  {
   "roll": "53-54",
   "result": "Sinkhole"
  },
  {
   "roll": "55-56",
   "result": "Temperature Drop / Heat Wave"
  },
  {
   "roll": "61-62",
   "result": "Unexploded Ordnance"
  },
  {
   "roll": "63",
   "result": "Vacuum"
  },
  {
   "roll": "64-66",
   "result": "Zone Smog"
  }
 ],
 "moodPeople": [
  {
   "roll": "11",
   "result": "Wanderers — silhouettes in the distance. Who walks the Zone?"
  },
  {
   "roll": "12",
   "result": "Camp — remains of a campsite, maybe embers still smoldering."
  },
  {
   "roll": "13",
   "result": "Final Rest — D6 shallow graves marked with scrap. Who is buried here?"
  },
  {
   "roll": "14",
   "result": "Victim — a corpse hanged or bound to a pole. Who did this?"
  },
  {
   "roll": "15",
   "result": "Message — something written on a wall. What does it say?"
  },
  {
   "roll": "16",
   "result": "Tracks — leading deeper into the Zone. Who walked here?"
  }
 ],
 "moodNature": [
  {
   "roll": "21",
   "result": "Boulder — a huge rock. Shelter from the winds, or a lookout?"
  },
  {
   "roll": "22",
   "result": "Tree — a lonely tree still grows. Does it hide a secret?"
  },
  {
   "roll": "23",
   "result": "Creek — a narrow stream. Source of life, or death by Rot?"
  },
  {
   "roll": "24",
   "result": "Zone Flowers — a field of strange, striking-colored flowers."
  },
  {
   "roll": "25",
   "result": "Thistles — thick undergrowth; gear snags. A hidden secret?"
  },
  {
   "roll": "26",
   "result": "Vines — thick vines cover the ruins. Dead, or still alive?"
  }
 ],
 "moodWeather": [
  {
   "roll": "31",
   "result": "Torrential Rain — a sudden downpour or snowfall; seek cover."
  },
  {
   "roll": "32",
   "result": "Fog — visibility a few yards, sound muffled. What lurks in it?"
  },
  {
   "roll": "33",
   "result": "Blazing Sun — scorching light; skin burns, clothes soak with sweat."
  },
  {
   "roll": "34",
   "result": "Blue Sky — the Zone haze evaporates to stark blue. Beautiful and frightening."
  },
  {
   "roll": "35",
   "result": "Dark Clouds — the sky darkens, wind rises, dust whirls. A storm brews."
  },
  {
   "roll": "36",
   "result": "Thunder — distant thunder rolls; lightning flashes across the ruins."
  }
 ],
 "moodRemains": [
  {
   "roll": "41",
   "result": "Road Sign — a lone metal sign from the Old Age. The way, or a warning?"
  },
  {
   "roll": "42",
   "result": "Wreck — an old vehicle rusted beyond repair. Has someone sheltered there?"
  },
  {
   "roll": "43",
   "result": "Movie Poster — a torn poster shows a strange scene. What do they make of it?"
  },
  {
   "roll": "44",
   "result": "The Dead — D6 withering skeletons. What story do these bones tell?"
  },
  {
   "roll": "45",
   "result": "Checkpoint — a roadblock from the dying days. Useful scrap here?"
  },
  {
   "roll": "46",
   "result": "Railroad Track — rusty, overgrown tracks. Where does it lead?"
  }
 ],
 "moodEvents": [
  {
   "roll": "51",
   "result": "Hole — a deep dark hole. An old well, or a path into tunnels below?"
  },
  {
   "roll": "52",
   "result": "Howling — a long inhuman howl echoes. Someone in need — or a monster near?"
  },
  {
   "roll": "53",
   "result": "Collapse — a ruin collapses in a roar. Is something revealed?"
  },
  {
   "roll": "54",
   "result": "Birds — a flock of Zone birds takes to the air. What startled them?"
  },
  {
   "roll": "55",
   "result": "Noise — a deep bellow echoes a few times, then silence."
  },
  {
   "roll": "56",
   "result": "Hut — a nest or hut of scrap. Is someone home?"
  }
 ],
 "moodTerrain": [
  {
   "roll": "61",
   "result": "Lake — a small black lake in the haze. What's under the surface?"
  },
  {
   "roll": "62",
   "result": "Escarpment — a steep slope. How do they get down, and what awaits?"
  },
  {
   "roll": "63",
   "result": "Crevice — a deep fissure cuts across. How do they cross?"
  },
  {
   "roll": "64",
   "result": "Swamp — foul Zone-water drowns the old streets. Cold water leaks into their shoes."
  },
  {
   "roll": "65",
   "result": "Copse — dark, dead trees cast shadows. What hides among them?"
  },
  {
   "roll": "66",
   "result": "Hill — a steep mound in the middle of the Zone. What's on top?"
  }
 ],
 "scrap": [
  {
   "roll": "111",
   "result": "Action figure (He-Man)"
  },
  {
   "roll": "112",
   "result": "Alarm clock, mechanical"
  },
  {
   "roll": "113",
   "result": "Aquarium, no fish"
  },
  {
   "roll": "114",
   "result": "Barbie doll"
  },
  {
   "roll": "115",
   "result": "Baseball bat"
  },
  {
   "roll": "116",
   "result": "Basket ball, flat"
  },
  {
   "roll": "121",
   "result": "Beard trimmer"
  },
  {
   "roll": "122",
   "result": "Beret, red"
  },
  {
   "roll": "123",
   "result": "Bible"
  },
  {
   "roll": "124",
   "result": "Bicycle chain"
  },
  {
   "roll": "125",
   "result": "Bicycle frame, no wheels"
  },
  {
   "roll": "126",
   "result": "Bicycle pump"
  },
  {
   "roll": "131",
   "result": "Binder, full of financial records"
  },
  {
   "roll": "132",
   "result": "Boots (Gear Bonus +1 when hiking)"
  },
  {
   "roll": "133",
   "result": "Bouncing ball"
  },
  {
   "roll": "134",
   "result": "Box of cereal, unopened"
  },
  {
   "roll": "135",
   "result": "Box of chocolates (edible, D6 rations of grub)"
  },
  {
   "roll": "136",
   "result": "Boxing glove"
  },
  {
   "roll": "141",
   "result": "Briefcase"
  },
  {
   "roll": "142",
   "result": "Bullhorn (broken)"
  },
  {
   "roll": "143",
   "result": "Can opener"
  },
  {
   "roll": "144",
   "result": "Candelabra"
  },
  {
   "roll": "145",
   "result": "Car tire"
  },
  {
   "roll": "146",
   "result": "Carving knife"
  },
  {
   "roll": "151",
   "result": "Cash register"
  },
  {
   "roll": "152",
   "result": "Cat 5 cable, 2D6 feet long"
  },
  {
   "roll": "153",
   "result": "Ceiling fan"
  },
  {
   "roll": "154",
   "result": "Champagne glasses, D6"
  },
  {
   "roll": "155",
   "result": "Chandelier"
  },
  {
   "roll": "156",
   "result": "Charcoal grill"
  },
  {
   "roll": "161",
   "result": "Children's drawing"
  },
  {
   "roll": "162",
   "result": "Cigarettes, half-empty pack"
  },
  {
   "roll": "163",
   "result": "Clothes hanger"
  },
  {
   "roll": "164",
   "result": "Coffee cup with print"
  },
  {
   "roll": "165",
   "result": "Coffee table"
  },
  {
   "roll": "166",
   "result": "Coloring book for kids (half done)"
  },
  {
   "roll": "211",
   "result": "Comb"
  },
  {
   "roll": "212",
   "result": "Comic book, very violent"
  },
  {
   "roll": "213",
   "result": "Concrete mixer, rusty"
  },
  {
   "roll": "214",
   "result": "Cooking pot"
  },
  {
   "roll": "215",
   "result": "Credit card"
  },
  {
   "roll": "216",
   "result": "Crime novel"
  },
  {
   "roll": "221",
   "result": "Cutlery, D6 pieces"
  },
  {
   "roll": "222",
   "result": "Cylinder hat"
  },
  {
   "roll": "223",
   "result": "Dala horse"
  },
  {
   "roll": "224",
   "result": "Deodorant bottle"
  },
  {
   "roll": "225",
   "result": "Desk lamp"
  },
  {
   "roll": "226",
   "result": "Detergent, bottle"
  },
  {
   "roll": "231",
   "result": "Dice, D6"
  },
  {
   "roll": "232",
   "result": "Diving snorkel"
  },
  {
   "roll": "233",
   "result": "Doll"
  },
  {
   "roll": "234",
   "result": "Downhill ski (only one)"
  },
  {
   "roll": "235",
   "result": "Dress shoes, worn down"
  },
  {
   "roll": "236",
   "result": "Dumbbell, 10 lb"
  },
  {
   "roll": "241",
   "result": "Easel, for painting"
  },
  {
   "roll": "242",
   "result": "Eating knife (scrap knife)"
  },
  {
   "roll": "243",
   "result": "Electric guitar, broken"
  },
  {
   "roll": "244",
   "result": "Electric mixer"
  },
  {
   "roll": "245",
   "result": "Electric shaver"
  },
  {
   "roll": "246",
   "result": "Electric toothbrush"
  },
  {
   "roll": "251",
   "result": "Empty frame"
  },
  {
   "roll": "252",
   "result": "Extension cord"
  },
  {
   "roll": "253",
   "result": "Face mask, Donald Duck"
  },
  {
   "roll": "254",
   "result": "Face mask, skeleton"
  },
  {
   "roll": "255",
   "result": "Facemask, Santa Claus"
  },
  {
   "roll": "256",
   "result": "Fake fangs"
  },
  {
   "roll": "261",
   "result": "False teeth"
  },
  {
   "roll": "262",
   "result": "Fantasy novel, very thick"
  },
  {
   "roll": "263",
   "result": "Fire extinguisher"
  },
  {
   "roll": "264",
   "result": "Fireworks, D6, still functional"
  },
  {
   "roll": "265",
   "result": "Flashlight, broken"
  },
  {
   "roll": "266",
   "result": "Floor lamp"
  },
  {
   "roll": "311",
   "result": "Flute, plastic"
  },
  {
   "roll": "312",
   "result": "Folding chair"
  },
  {
   "roll": "313",
   "result": "Football"
  },
  {
   "roll": "314",
   "result": "Fork"
  },
  {
   "roll": "315",
   "result": "Frying pan (blunt instrument)"
  },
  {
   "roll": "316",
   "result": "Gaffer tape"
  },
  {
   "roll": "321",
   "result": "Glass pearls"
  },
  {
   "roll": "322",
   "result": "Golf club (blunt instrument)"
  },
  {
   "roll": "323",
   "result": "Grass seeds in small bag"
  },
  {
   "roll": "324",
   "result": "Hair dryer"
  },
  {
   "roll": "325",
   "result": "Hair gel"
  },
  {
   "roll": "326",
   "result": "Headphones, with microphone"
  },
  {
   "roll": "331",
   "result": "Hedge trimmer (scrap knife)"
  },
  {
   "roll": "332",
   "result": "Herbal salt"
  },
  {
   "roll": "333",
   "result": "Hockey club (blunt instrument)"
  },
  {
   "roll": "334",
   "result": "Hot dog cart"
  },
  {
   "roll": "335",
   "result": "Hubcap, Volvo"
  },
  {
   "roll": "336",
   "result": "IKEA chair"
  },
  {
   "roll": "341",
   "result": "Infant formula (D6 rations of grub)"
  },
  {
   "roll": "342",
   "result": "Instant coffee"
  },
  {
   "roll": "343",
   "result": "Instant noodles (D6 rations of grub)"
  },
  {
   "roll": "344",
   "result": "Iron pipe (blunt instrument)"
  },
  {
   "roll": "345",
   "result": "Jack"
  },
  {
   "roll": "346",
   "result": "Jeans, stonewashed"
  },
  {
   "roll": "351",
   "result": "Jigsaw puzzle"
  },
  {
   "roll": "352",
   "result": "Jumpsuit, cloth"
  },
  {
   "roll": "353",
   "result": "Key ring, 2D6 keys"
  },
  {
   "roll": "354",
   "result": "Keyboard, missing a few keys"
  },
  {
   "roll": "355",
   "result": "Ladder, rusty (Gear Bonus +1 when climbing)"
  },
  {
   "roll": "356",
   "result": "Ladies boots"
  },
  {
   "roll": "361",
   "result": "Ladies hat"
  },
  {
   "roll": "362",
   "result": "Laptop computer, broken"
  },
  {
   "roll": "363",
   "result": "Lawn mower"
  },
  {
   "roll": "364",
   "result": "Light bulbs, D6"
  },
  {
   "roll": "365",
   "result": "Lipstick"
  },
  {
   "roll": "366",
   "result": "Liquid soap"
  },
  {
   "roll": "411",
   "result": "Loudspeaker (broken)"
  },
  {
   "roll": "412",
   "result": "Love letter, yellowed"
  },
  {
   "roll": "413",
   "result": "Magnifying glass"
  },
  {
   "roll": "414",
   "result": "Mascara"
  },
  {
   "roll": "415",
   "result": "Mathematics book"
  },
  {
   "roll": "416",
   "result": "Microwave oven (broken)"
  },
  {
   "roll": "421",
   "result": "Mirror"
  },
  {
   "roll": "422",
   "result": "Movie DVDs, D6"
  },
  {
   "roll": "423",
   "result": "Movie poster"
  },
  {
   "roll": "424",
   "result": "Music CDs, D6"
  },
  {
   "roll": "425",
   "result": "National flag, torn"
  },
  {
   "roll": "426",
   "result": "Necktie"
  },
  {
   "roll": "431",
   "result": "Nicotine chewing gum"
  },
  {
   "roll": "432",
   "result": "Oriental carpet"
  },
  {
   "roll": "433",
   "result": "Pacifier"
  },
  {
   "roll": "434",
   "result": "Pack of tube socks"
  },
  {
   "roll": "435",
   "result": "Paper handkerchiefs, D666"
  },
  {
   "roll": "436",
   "result": "Pepper mill"
  },
  {
   "roll": "441",
   "result": "Photo album"
  },
  {
   "roll": "442",
   "result": "Photo of happy family"
  },
  {
   "roll": "443",
   "result": "Picture of a cat"
  },
  {
   "roll": "444",
   "result": "Piggy bank (empty)"
  },
  {
   "roll": "445",
   "result": "Plastic bags, D66"
  },
  {
   "roll": "446",
   "result": "Plastic bottle, empty"
  },
  {
   "roll": "451",
   "result": "Plastic dinosaur"
  },
  {
   "roll": "452",
   "result": "Plastic flowers, D6"
  },
  {
   "roll": "453",
   "result": "Plastic skeleton model"
  },
  {
   "roll": "454",
   "result": "Plastic straws, pack of 100"
  },
  {
   "roll": "455",
   "result": "Playing cards"
  },
  {
   "roll": "456",
   "result": "Popcorn, unopened bag"
  },
  {
   "roll": "461",
   "result": "Princess dress, for kids"
  },
  {
   "roll": "462",
   "result": "Prize medal"
  },
  {
   "roll": "463",
   "result": "Quilted jacket (Gear Bonus +1 against cold)"
  },
  {
   "roll": "464",
   "result": "Rabbit suit, adult size"
  },
  {
   "roll": "465",
   "result": "Recliner"
  },
  {
   "roll": "466",
   "result": "Remote control"
  },
  {
   "roll": "511",
   "result": "Roller skates"
  },
  {
   "roll": "512",
   "result": "Rubber boot"
  },
  {
   "roll": "513",
   "result": "Rubber duck"
  },
  {
   "roll": "514",
   "result": "Saxophone"
  },
  {
   "roll": "515",
   "result": "Scarf, colorful (Gear Bonus +1 against cold)"
  },
  {
   "roll": "516",
   "result": "Scientific dissertation"
  },
  {
   "roll": "521",
   "result": "Scuba mask"
  },
  {
   "roll": "522",
   "result": "Scuba suit, worn out"
  },
  {
   "roll": "523",
   "result": "Sex toy"
  },
  {
   "roll": "524",
   "result": "Shopping cart"
  },
  {
   "roll": "525",
   "result": "Skateboard"
  },
  {
   "roll": "526",
   "result": "Sketch book, full of sketches"
  },
  {
   "roll": "531",
   "result": "Ski boot"
  },
  {
   "roll": "532",
   "result": "Ski hat (Gear Bonus +1 against cold)"
  },
  {
   "roll": "533",
   "result": "Skin lotion, bottle"
  },
  {
   "roll": "534",
   "result": "Sleeping pad"
  },
  {
   "roll": "535",
   "result": "Snowglobe"
  },
  {
   "roll": "536",
   "result": "Sofa, broken"
  },
  {
   "roll": "541",
   "result": "Spider-Man suit for kids"
  },
  {
   "roll": "542",
   "result": "Sports bottle"
  },
  {
   "roll": "543",
   "result": "Sports jersey"
  },
  {
   "roll": "544",
   "result": "Sports prize cup"
  },
  {
   "roll": "545",
   "result": "Stapler"
  },
  {
   "roll": "546",
   "result": "Starburst candy (one ration of grub)"
  },
  {
   "roll": "551",
   "result": "Stroller"
  },
  {
   "roll": "552",
   "result": "Surf board"
  },
  {
   "roll": "553",
   "result": "Suspenders"
  },
  {
   "roll": "554",
   "result": "Swimming goggles"
  },
  {
   "roll": "555",
   "result": "Synthesizer"
  },
  {
   "roll": "556",
   "result": "T-shirt with text 'Heisenberg'"
  },
  {
   "roll": "561",
   "result": "Tabletop globe"
  },
  {
   "roll": "562",
   "result": "Teddy bear"
  },
  {
   "roll": "563",
   "result": "Telephone"
  },
  {
   "roll": "564",
   "result": "Tennis ball"
  },
  {
   "roll": "565",
   "result": "Thermometer, broken"
  },
  {
   "roll": "566",
   "result": "Tire iron"
  },
  {
   "roll": "611",
   "result": "Toilet brush"
  },
  {
   "roll": "612",
   "result": "Toothbrush"
  },
  {
   "roll": "613",
   "result": "Towel marked 'Sheraton'"
  },
  {
   "roll": "614",
   "result": "Toy car"
  },
  {
   "roll": "615",
   "result": "Toy pirates"
  },
  {
   "roll": "616",
   "result": "Toy sword"
  },
  {
   "roll": "621",
   "result": "Toy tractor"
  },
  {
   "roll": "622",
   "result": "Toy train set"
  },
  {
   "roll": "623",
   "result": "Traffic cones, D6"
  },
  {
   "roll": "624",
   "result": "Trombone"
  },
  {
   "roll": "625",
   "result": "TV set, broken"
  },
  {
   "roll": "626",
   "result": "Twinkies, D6 (edible, each a ration of grub)"
  },
  {
   "roll": "631",
   "result": "Typewriter"
  },
  {
   "roll": "632",
   "result": "Umbrella, broken"
  },
  {
   "roll": "633",
   "result": "Underwear"
  },
  {
   "roll": "634",
   "result": "Vacuum cleaner"
  },
  {
   "roll": "635",
   "result": "Vacuum flask"
  },
  {
   "roll": "636",
   "result": "Vase"
  },
  {
   "roll": "641",
   "result": "VHS cassette"
  },
  {
   "roll": "642",
   "result": "Video game console"
  },
  {
   "roll": "643",
   "result": "Vinyl record, well played"
  },
  {
   "roll": "644",
   "result": "Walking frame"
  },
  {
   "roll": "645",
   "result": "Walkman with headphones and cassette"
  },
  {
   "roll": "646",
   "result": "Wall clock"
  },
  {
   "roll": "651",
   "result": "Wallet full of moldy cash"
  },
  {
   "roll": "652",
   "result": "Water pistol"
  },
  {
   "roll": "653",
   "result": "Welding mask"
  },
  {
   "roll": "654",
   "result": "Whiskey bottle (empty)"
  },
  {
   "roll": "655",
   "result": "Whiteboard marker"
  },
  {
   "roll": "656",
   "result": "Wig, blonde"
  },
  {
   "roll": "661",
   "result": "Wine bottle, undrinkable (1 Rot Point)"
  },
  {
   "roll": "662",
   "result": "Wok"
  },
  {
   "roll": "663",
   "result": "Wrecking bar"
  },
  {
   "roll": "664",
   "result": "Wristwatch, broken"
  },
  {
   "roll": "665",
   "result": "Yellowed copy of the Mutant Chronicles RPG"
  },
  {
   "roll": "666",
   "result": "Yo-yo (blunt instrument)"
  }
 ],
 "npcGen": {
  "Enforcer": [
   {
    "roll": "1",
    "name": "Hugust",
    "appearance": "Hulking posture, ape-like arms, grunts",
    "goal": "Stop fighting and build something instead",
    "weapon": "Brass knuckles"
   },
   {
    "roll": "2",
    "name": "Ingrit",
    "appearance": "Short and stocky, hoarse voice",
    "goal": "Beat up anyone in her way",
    "weapon": "Bicycle chain"
   },
   {
    "roll": "3",
    "name": "Lenny",
    "appearance": "Wiry, skinny and muscular",
    "goal": "Live another day, there is nothing else",
    "weapon": "Spiked bat"
   },
   {
    "roll": "4",
    "name": "Marl",
    "appearance": "Fat and with a wheezing voice",
    "goal": "Torment others and hear them scream",
    "weapon": "Scrap knife"
   },
   {
    "roll": "5",
    "name": "Nelma",
    "appearance": "Grotesquely tall, abnormal face",
    "goal": "Please the Boss",
    "weapon": "Scrap axe"
   },
   {
    "roll": "6",
    "name": "Rebeth",
    "appearance": "Weathered and scarred, hissing voice",
    "goal": "Show who's strongest",
    "weapon": "Scrap pistol"
   }
  ],
  "Gearhead": [
   {
    "roll": "1",
    "name": "Quark",
    "appearance": "Skinny, spiked hair, always smiling",
    "goal": "Find Eden and the truth about the People",
    "weapon": "Scrap pistol, Gear Bonus +2"
   },
   {
    "roll": "2",
    "name": "Lambda",
    "appearance": "Old blue coveralls, tools in every pocket",
    "goal": "Recreate the technical marvels of the Old Age",
    "weapon": "Scrap pistol with three barrels"
   },
   {
    "roll": "3",
    "name": "Loranga",
    "appearance": "Bald, extremely dirty, kind",
    "goal": "Build things to help others",
    "weapon": "None"
   },
   {
    "roll": "4",
    "name": "Naphta",
    "appearance": "Burn-scarred skin, goggles, smells of smoke",
    "goal": "Blow stuff up",
    "weapon": "Flamethrower"
   },
   {
    "roll": "5",
    "name": "Tetris",
    "appearance": "Wears a headpiece made of scrap, mumbles",
    "goal": "Create a device that controls others' minds",
    "weapon": "—"
   },
   {
    "roll": "6",
    "name": "Zippo",
    "appearance": "Wears a coat adorned with scrap",
    "goal": "Build a huge scrap sculpture in the Ark",
    "weapon": "Bicycle chain"
   }
  ],
  "Stalker": [
   {
    "roll": "1",
    "name": "Danko",
    "appearance": "Always wears a gasmask, never speaks",
    "goal": "Go farther into the Zone than anyone else",
    "weapon": "Scrap rifle, Gear Bonus +2"
   },
   {
    "roll": "2",
    "name": "Franton",
    "appearance": "Scarred face, brags a lot",
    "goal": "Be revered as a hero by the People",
    "weapon": "Scrap pistol with two barrels"
   },
   {
    "roll": "3",
    "name": "Hammed",
    "appearance": "Dead eyes, coughs from Rot, smells of booze",
    "goal": "Walk into the Zone and let the Rot take him",
    "weapon": "Scrap spear"
   },
   {
    "roll": "4",
    "name": "Jena",
    "appearance": "Camouflage gear, fiddles with her gun",
    "goal": "Stalk a victim for days and then kill it",
    "weapon": "Scrap rifle, weapon damage 3"
   },
   {
    "roll": "5",
    "name": "Krin",
    "appearance": "Skinny and wiry, always on guard",
    "goal": "Keep out of trouble, avoid others",
    "weapon": "Bow, Gear Bonus +2"
   },
   {
    "roll": "6",
    "name": "Tula",
    "appearance": "Torn raincoat, pulls an old shopping cart",
    "goal": "Find something worth fighting for",
    "weapon": "Slingshot"
   }
  ],
  "Fixer": [
   {
    "roll": "1",
    "name": "Abed",
    "appearance": "Bald and pudgy, constantly smiling",
    "goal": "Make the deal of a lifetime",
    "weapon": "Scrap knife"
   },
   {
    "roll": "2",
    "name": "Denrik",
    "appearance": "Unnaturally handsome, shiny hair",
    "goal": "Make others feel good and exploit it",
    "weapon": "—"
   },
   {
    "roll": "3",
    "name": "Fillix",
    "appearance": "Stares at others' gear, kleptomaniac",
    "goal": "Collect a large stockpile of grub and gear",
    "weapon": "Scrap pistol, Gear Bonus +2"
   },
   {
    "roll": "4",
    "name": "Jolisa",
    "appearance": "Skinny, large staring eyes",
    "goal": "Abnormally interested in artifacts and scrap",
    "weapon": "Bicycle chain"
   },
   {
    "roll": "5",
    "name": "Lula",
    "appearance": "Abnormally short, talks constantly",
    "goal": "Swindle the last bullet from everyone else",
    "weapon": "Scrap pistol"
   },
   {
    "roll": "6",
    "name": "Monja",
    "appearance": "Wheezing voice, always wants to trade",
    "goal": "Become a Boss one day",
    "weapon": "Scrap knife"
   }
  ],
  "Dog Handler": [
   {
    "roll": "1",
    "name": "Anny",
    "appearance": "Chews a root, spits constantly",
    "goal": "Find someone besides her dog to care for",
    "weapon": "Slingshot"
   },
   {
    "roll": "2",
    "name": "Brie",
    "appearance": "Black bangs cover a deformed eye",
    "goal": "Kill anyone who comments on her appearance",
    "weapon": "Scrap knife"
   },
   {
    "roll": "3",
    "name": "Finn",
    "appearance": "Greenish rough skin, mostly drunk",
    "goal": "Forget his sorrows",
    "weapon": "Baseball bat"
   },
   {
    "roll": "4",
    "name": "Jony",
    "appearance": "Face shaded by hood, silent and aggressive",
    "goal": "Leave the Ark and find a better life",
    "weapon": "Scrap axe"
   },
   {
    "roll": "5",
    "name": "Krinnel",
    "appearance": "Only talks to her dog",
    "goal": "Give her dog something good to eat",
    "weapon": "Bow"
   },
   {
    "roll": "6",
    "name": "Montiac",
    "appearance": "Crew cut, irritable and violent",
    "goal": "Beat up anyone who speaks ill of his dog",
    "weapon": "Brass knuckles"
   }
  ],
  "Chronicler": [
   {
    "roll": "1",
    "name": "Astrina",
    "appearance": "Red mohawk, sees good in everyone",
    "goal": "Find a hero who can save the People",
    "weapon": "Scrap knife"
   },
   {
    "roll": "2",
    "name": "Danova",
    "appearance": "Wears a dress from the Old Age",
    "goal": "Understand what the Elder needs, and do it",
    "weapon": "—"
   },
   {
    "roll": "3",
    "name": "Hanneth",
    "appearance": "Black bangs, silent, takes notes",
    "goal": "Rise from misery and dedicate her life to study",
    "weapon": "—"
   },
   {
    "roll": "4",
    "name": "Maxim",
    "appearance": "Skinny and weak, aged beyond his years",
    "goal": "Write how the People find Eden",
    "weapon": "—"
   },
   {
    "roll": "5",
    "name": "Silas",
    "appearance": "Pale, translucent skin, sad",
    "goal": "Make the Ark an advanced society",
    "weapon": "—"
   },
   {
    "roll": "6",
    "name": "Victon",
    "appearance": "Boyish, reddish, always happy",
    "goal": "Become the hero in the People's story",
    "weapon": "Scrap knife"
   }
  ],
  "Boss": [
   {
    "roll": "1",
    "name": "Brictoria",
    "appearance": "Cold eyes, scarred face, crew cut",
    "goal": "Turn the People into an army and conquer the Zone",
    "weapon": "Scrap rifle, Gear Bonus +2"
   },
   {
    "roll": "2",
    "name": "Gunitt",
    "appearance": "Short, skinny, wears a top hat",
    "goal": "Collect large amounts of artifacts",
    "weapon": "Scrap pistol with three barrels"
   },
   {
    "roll": "3",
    "name": "Cristor",
    "appearance": "Tall and skinny, fiery eyes",
    "goal": "Topple the Elder and establish equality",
    "weapon": "Spiked bat"
   },
   {
    "roll": "4",
    "name": "Marlotte",
    "appearance": "Cool and detached",
    "goal": "Develop the Ark and lead the People to a better life",
    "weapon": "—"
   },
   {
    "roll": "5",
    "name": "Mohamin",
    "appearance": "Legless, carried by Grunts",
    "goal": "Rally followers and leave the Ark with his cult",
    "weapon": "Scrap knife"
   },
   {
    "roll": "6",
    "name": "Oscartian",
    "appearance": "Extremely fat, can hardly move",
    "goal": "Get rid of all rivals and take sole power",
    "weapon": "Scrap pistol, weapon damage 3"
   }
  ],
  "Grunt": [
   {
    "roll": "1",
    "name": "Dink",
    "appearance": "Silent and observant, bitter, treacherous",
    "goal": "Find someone to use to get free",
    "weapon": "—"
   },
   {
    "roll": "2",
    "name": "Eria",
    "appearance": "Arms and legs like logs, grim",
    "goal": "Toil away without complaining",
    "weapon": "—"
   },
   {
    "roll": "3",
    "name": "Henny",
    "appearance": "Dirty, always humming",
    "goal": "See the bright side of things",
    "weapon": "—"
   },
   {
    "roll": "4",
    "name": "Hent",
    "appearance": "Massive knobby-skinned body, hunchback",
    "goal": "Work and suffer until death frees him",
    "weapon": "—"
   },
   {
    "roll": "5",
    "name": "Lin",
    "appearance": "Wiry and grumpy, fights a lot",
    "goal": "Take her aggressions out on anyone",
    "weapon": "—"
   },
   {
    "roll": "6",
    "name": "Wilo",
    "appearance": "Skinny and weak, a dreamer",
    "goal": "Escape the Ark and never come back",
    "weapon": "—"
   }
  ]
 },
 "commonNames": [
  "Abar",
  "Alia",
  "Alix",
  "Almenkir",
  "Amala",
  "Augustian",
  "Bark",
  "Benso",
  "Delta",
  "Doda",
  "Dunk",
  "Edin",
  "Elona",
  "Emalina",
  "Emdor",
  "Endel",
  "Ergom",
  "Erian",
  "Erister",
  "Felin",
  "Fils",
  "Gerber",
  "Grits",
  "Gros",
  "Hild",
  "Ibit",
  "Iridia",
  "Johalin",
  "Jol",
  "Jonar",
  "Juna",
  "Juperia",
  "Kalgu",
  "Kaska",
  "Katin",
  "Kim",
  "Koli",
  "Leodor",
  "Landon",
  "Lard",
  "Linna",
  "Margot",
  "Marlian",
  "Makron",
  "Markot",
  "Mart",
  "Max",
  "Mintel",
  "Miri",
  "Mohan",
  "Molger",
  "Morris",
  "Mubba",
  "Natara",
  "Nelma",
  "Nely",
  "Novia",
  "Octane",
  "Olias",
  "Olli",
  "Oslo",
  "Otiak",
  "Plonk",
  "Piro",
  "Pontis",
  "Rasper",
  "Regis",
  "Rog",
  "Rutger",
  "Sagabet",
  "Sari",
  "Savik",
  "Silia",
  "Siniss",
  "Slabados",
  "Sofin",
  "Styx",
  "Tegra",
  "Torry",
  "Vabb",
  "Vang",
  "Vilip",
  "Visek",
  "Vorhan",
  "Zanova",
  "Zeb",
  "Zeke",
  "Zingo"
 ],
 "arkEvents": [
  {
   "roll": "11-14",
   "result": "Danger Ahead"
  },
  {
   "roll": "15-22",
   "result": "Fight over a Project"
  },
  {
   "roll": "23-26",
   "result": "A Threat Escalates"
  },
  {
   "roll": "31-33",
   "result": "Fight over Gear"
  },
  {
   "roll": "34-41",
   "result": "An Appealing Offer"
  },
  {
   "roll": "42-45",
   "result": "A PC Gets into Trouble"
  },
  {
   "roll": "46-53",
   "result": "An NPC Gets into Trouble"
  },
  {
   "roll": "54-56",
   "result": "PC vs PC"
  },
  {
   "roll": "61-63",
   "result": "Unwanted Consequences"
  },
  {
   "roll": "64-66",
   "result": "A Glimpse of the Dream"
  }
 ],
 "zoneEvents": [
  {
   "roll": "11-14",
   "result": "A Beacon in the Distance"
  },
  {
   "roll": "15-22",
   "result": "Danger Ahead"
  },
  {
   "roll": "23-25",
   "result": "A Hard Choice"
  },
  {
   "roll": "26-33",
   "result": "Gear is Lost"
  },
  {
   "roll": "34-36",
   "result": "Sleepless Night"
  },
  {
   "roll": "41-44",
   "result": "A PC Gets into Trouble"
  },
  {
   "roll": "45-52",
   "result": "An NPC Gets into Trouble"
  },
  {
   "roll": "53-55",
   "result": "PC vs PC"
  },
  {
   "roll": "56-62",
   "result": "The Zone vs Everyone"
  },
  {
   "roll": "63-66",
   "result": "An Unexpected Encounter"
  }
 ]
};
if (typeof window !== "undefined") window.MYZ_GM_TABLES = MYZ_GM_TABLES;
if (typeof module !== "undefined") module.exports = { MYZ_GM_TABLES };
