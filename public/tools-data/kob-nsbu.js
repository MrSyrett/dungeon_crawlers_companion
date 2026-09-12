/* Never Stop Blowing Up — a Dropout / Dimension 20 variant of Kids on Bikes.
   Data for the KoB sheet's NSBU mode: the 9 fixed skills, the buyable individual
   Abilities, the Group Suites, and rules text for the reference panel.
   Transcribed from the official one-page hack. */
window.KOB_NSBU = {
  // The nine key skills — every skill starts at d4 and BLOWS UP as it maxes out.
  skills: [
    { id:'Stunts',  hint:'daring feats · jump, climb, parkour' },
    { id:'Brawl',   hint:'hand-to-hand · punch, grapple, subdue' },
    { id:'Tough',   hint:'endure · resist damage, shrug it off' },
    { id:'Tech',    hint:'gadgets · hack, wire, explosives' },
    { id:'Weapons', hint:'armed combat · guns & melee' },
    { id:'Drive',   hint:'vehicles · chase, evade, stunts' },
    { id:'Sneak',   hint:'stealth · hide, slip locks, infiltrate' },
    { id:'Wits',    hint:'perception · read people, spot lies' },
    { id:'Hot',     hint:'charm · impress, flirt, persuade' },
  ],
  // Individual abilities — bought at the end of a session for 2 Turbo Tokens each.
  abilities: [
    { name:'Smokin\'',       text:'Lower the DC of a Hot Check by 3 when making a first impression.' },
    { name:'Burglar',        text:'Lower the DC of a Sneak Check by 3 when entering a protected location.' },
    { name:'Connected',      text:'Lower the DC of a Hot Check by 3 when searching for a helpful ally.' },
    { name:'Relentless',     text:'Gain 2 Turbo Tokens when you fail a check.' },
    { name:'Escape Artist',  text:'Lower the DC of a Sneak Check by 3 when escaping restraints or imprisonment.' },
    { name:'Flashy',         text:'Lower the DC of a Hot Check by 5 if it\'s the first roll after you\'ve BLOWN UP.' },
    { name:'Transporter',    text:'Lower the DC of a Drive Check by 3 to avoid pursuers.' },
    { name:'Inspiring',      text:'Each time you succeed at a check, an ally of your choice receives 1 Turbo Token.' },
    { name:'Loyal',          text:'Your Turbo Tokens give friends +1 at a one-to-one rate.' },
    { name:'Lucky',          note:'Once Per Episode', text:'Spend 2 Turbo Tokens to reroll any check.' },
    { name:'Trained',        text:'−1 to DCs for a Stat of your choice.' },
    { name:'Studied',        note:'Replaces Trained', text:'−3 to DCs for a Stat of your choice.' },
    { name:'Mastery',        note:'Replaces Studied', text:'−5 to DCs for a Stat of your choice.' },
    { name:'Menacing',       text:'Use Brawl instead of Hot when intimidating an NPC.' },
    { name:'Nerves of Steel',text:'Spend a Turbo Token to treat a snap decision as a Prepared Action.' },
    { name:'By the Book',    text:'Lower the DC of a Check by 3 when interacting with authority figures.' },
    { name:'Poker Face',     text:'When attempting to conceal the truth, use Tough instead of Hot.' },
    { name:'Prepared',       note:'GM\'s Discretion', text:'Spend 2 Turbo Tokens to just happen to have one commonplace item with you.' },
    { name:'Protector',      text:'Lower the DC of a check by 3 when defending your friends.' },
    { name:'Quick Healing',  text:'Recover one injury level at the end of an encounter.' },
    { name:'Resilient',      text:'Turbo Tokens are worth double when used to boost against an attack that targets you.' },
    { name:'Skilled',        text:'Increase your die type for one skill by 1 for the purposes of halving.' },
    { name:'Trainer',        text:'Describe a pep talk you gave earlier to spend Turbo Tokens for a friend, even when you are not present.' },
    { name:'Stealthy',       text:'Lower the DC of a Sneak Check by 3 when trying to avoid being seen.' },
    { name:'Suspicious',     text:'Lower the DC of a Wits Check by 3 when trying to determine if someone is lying to you.' },
    { name:'Grit',           text:'Lower the DC of a Brawl Check by 3 when resisting a Brawl Check.' },
    { name:'Martial Artist', text:'Spend a Turbo Token to force an enemy to resist your Brawl with Wits instead of Tough.' },
    { name:'Leap of Faith',  text:'Lower the DC of a Stunts Check by 3 when making a jump that could injure you.' },
    { name:'Neck Snapper',   text:'Roll a Brawl Check to harmlessly incapacitate any opponent.' },
    { name:'Hacker',         text:'Lower the DC of a Tech Check by 3 when breaking into a computer database.' },
    { name:'Duelist',        text:'Lower the DC of a Weapons Check by 3 against someone wielding the same weapon.' },
    { name:'Interrogator',   text:'Lower the DC of a Wits Check by 3 to draw information out of an opponent.' },
    { name:'Demolitions',    text:'Lower the DC of a Tech Check by 3 when explosives are involved.' },
    { name:'Hotwire',        text:'When interacting with vehicles, use Drive instead of Tech.' },
    { name:'Wild Card',      text:'You are a Wild Card.' },
    { name:'Trouble Maker',  note:'GM\'s Discretion', text:'Spend a Turbo Token to locate and receive help from a criminal network.' },
    { name:'Wealthy',        text:'Spend a Turbo Token to ease a bad situation with cash.' },
  ],
  // Group suites — unlocked once every player reaches a die type. 10 Turbo Tokens
  // for one member, 18 for the whole group.
  suites: [
    { name:'La Familia', unlock:'d6', items:[
      { name:'Tough', note:'Once Per Episode', text:'Roll Tough on someone else\'s behalf.' },
      { name:'Tokens', text:'Spend tokens for other people at a 1:1 exchange rate.' },
      { name:'Skill Die', note:'Once Per Episode', text:'Lend a teammate a skill die.' },
    ]},
    { name:'Criminal Conspiracy', unlock:'d6', items:[
      { name:'Item', text:'When in a new location, produce a single useful item.' },
      { name:'Tech', note:'Once Per Episode', text:'Add your Tech Die to a Sneak Die.' },
      { name:'Hot', text:'Roll Hot in response to the first attack of an encounter to dissuade an opponent.' },
    ]},
    { name:'Diesel Circus', unlock:'d8', items:[
      { name:'Injury Advantage', text:'Roll twice on the first roll after an injury.' },
      { name:'Double Explosion', text:'Doubles your amount of tokens.' },
      { name:'Drive Check', text:'On a successful Drive Check, make another skill check.' },
    ]},
    { name:'The Continentals', unlock:'d8', items:[
      { name:'Wits', text:'Turbo Tokens for Wits help increase the die type.' },
      { name:'Hot Checks', text:'Two successful Hot Checks auto-succeeds on stealing from an opponent.' },
      { name:'Melee', text:'Lower the DC of a Weapons Check using melee weapons.' },
    ]},
    { name:'Alpha Squad', unlock:'d10', items:[
      { name:'Group Explosion', note:'Minimum 3 People', text:'In a scene where everyone uses a different skill, reduce the range to BLOW UP by 1.' },
      { name:'Skill Add', note:'Once Per Episode', text:'Two people roll the same skill and add the totals together.' },
      { name:'Suit Up', note:'Once Per Episode', text:'The group may "suit up" and each take 2 Turbo Tokens.' },
    ]},
    { name:'Marauders', unlock:'d10', items:[
      { name:'+10', text:'Beating an opponent by more than 10 means you defeat an additional opponent.' },
      { name:'Destroyer', text:'Gain a Turbo Token on any turn where you destroy an object.' },
      { name:'Firestarter', text:'Start a fire, short circuit electronics, or dissolve a structure as part of any action.' },
    ]},
    { name:'The Ones', unlock:'d12', items:[
      { name:'Max Roll', note:'Once Per Episode', text:'Treat a Nat 1 as a max die roll.' },
      { name:'Reroll', note:'Once Per Episode', text:'Reroll a failure with a different skill.' },
      { name:'Turbo Tokens', note:'Once Per Episode', text:'Accept a Nat 1 to gain half the Turbo Tokens of the die value.' },
    ]},
    { name:'Tactical Command', unlock:'d12', items:[
      { name:'Shared Tokens', note:'Once Per Episode', text:'Spend Turbo Tokens across scenes.' },
      { name:'Reroll', note:'Once Per Episode', text:'Reroll on a failure.' },
      { name:'Token Gain', text:'Characters gain a Turbo Token at the end of a scene where they have zero.' },
    ]},
    { name:'Bustin\' Makes Me Feel Good', unlock:'d20', items:[
      { name:'Track Restart', note:'On a Nat 20', text:'Restart that skill track, now rolling a second die and taking the better result.' },
      { name:'Group Explosion', note:'On a Nat 20', text:'Everybody else at the table graduates all of their lowest die type up by one.' },
      { name:'GM', note:'On a Nat 20', text:'Become the GM for 60 seconds.' },
    ]},
  ],
  // Reference-panel rules.
  rules: [
    { title:'Starting the game', text:'Build your Action Hero with a name, a catchphrase, and 3 abilities. You have 9 key skills — Stunts, Brawl, Tough, Tech, Weapons, Drive, Sneak, Wits, Hot — each starting at d4. When you try something totally sick, the GM names which skill to roll.' },
    { title:'Blowing Up', text:'Every time you roll the highest value on a skill die it BLOWS UP: that skill permanently moves up to the next die type (d4→d6→d8→d10→d12→d20), and you roll the new die and add it to the check. If that new roll is also the highest value, it keeps blowing up — until you reach d20. The sheet bumps the skill die for you.' },
    { title:'Prepared Actions', text:'When you have time to prepare and are not under stress, take HALF the die value for that skill instead of rolling (use the ½ button on a skill).' },
    { title:'Turbo Tokens', text:'Fail a check and you gain a Turbo Token. Spend them one-to-one to increase a die roll\'s value; if you raise a die to its highest value it triggers a BLOW UP as if you\'d rolled the max. In the same scene you can spend tokens for a friend at 2× cost.' },
    { title:'Injury', text:'Fail a Tough Check by 5 or more and you take an Injury Level: Superficial → Severe → Adrenalized. At Severe you must spend DOUBLE Turbo Tokens to Blow Up. At Adrenalized you receive 10 Turbo Tokens — and failing a Tough Check then leaves you Incapacitated or Dead.' },
    { title:'Abilities & Group Suites', text:'At the end of a session, spend leftover Turbo Tokens: individual abilities cost 2 each; Group Suites (unlocked once every player reaches the listed die type) cost 10 for one member or 18 for the whole group. Track the ones you own in the Abilities tab.' },
  ],
};
