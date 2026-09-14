// DarkSpace gear — sci-fi reskin of the Shadowdark core gear (costs/slots
// unchanged). Browser global for the HTML tools (GM Screen treasure generator,
// session-prep builder). One united gear list.
const DS_GEAR = [
  // Weapons (M = melee, R = ranged)
  { name:'Power Sword',       category:'weapon', cost:'1000 cr', desc:'M · Close · 1d8/1d10 · Versatile, 2 slots' },
  { name:'Stun Baton',        category:'weapon', cost:'5 cr',  desc:'M · Close · 1d4' },
  { name:'Slug Rifle',        category:'weapon', cost:'800 cr',  desc:'R · Far · 1d6 · Two-handed, Loading' },
  { name:'Combat Knife',      category:'weapon', cost:'100 cr',  desc:'M/R · Close/Near · 1d4 · Finesse, Thrown' },
  { name:'Power Axe',         category:'weapon', cost:'1000 cr', desc:'M · Close · 1d8/1d10 · Versatile, 2 slots' },
  { name:'Heavy Vibroblade',  category:'weapon', cost:'1200 cr', desc:'M · Close · 1d12 · Two-handed, 2 slots' },
  { name:'Shock Javelin',     category:'weapon', cost:'50 cr',  desc:'M/R · Close/Far · 1d4 · Thrown' },
  { name:'Blaster Rifle',     category:'weapon', cost:'800 cr',  desc:'R · Far · 1d8 · Two-handed' },
  { name:'Vibroblade',        category:'weapon', cost:'900 cr',  desc:'M · Close · 1d8' },
  { name:'Shock Maul',        category:'weapon', cost:'500 cr',  desc:'M · Close · 1d6' },
  { name:'Blaster Pistol',    category:'weapon', cost:'600 cr',  desc:'R · Far · 1d4 · Two-handed' },
  { name:'Vibro-shortblade',  category:'weapon', cost:'700 cr',  desc:'M · Close · 1d6' },
  { name:'Shock Lance',       category:'weapon', cost:'50 cr',  desc:'M/R · Close/Near · 1d6 · Thrown' },
  { name:'Power Staff',       category:'weapon', cost:'50 cr',  desc:'M · Close · 1d4 · Two-handed' },
  { name:'Breaching Hammer',  category:'weapon', cost:'1000 cr', desc:'M · Close · 1d10 · Two-handed' },
  // Armor & deflectors
  { name:'Flak Weave',        category:'armor',  cost:'1000 cr',  desc:'AC 11 + DEX' },
  { name:'Combat Weave',      category:'armor',  cost:'6000 cr',  desc:'AC 13 + DEX · disadv. stealth/swim · 2 slots' },
  { name:'Powered Armor',     category:'armor',  cost:'13000 cr', desc:'AC 15 · no swim · disadv. stealth · 3 slots' },
  { name:'Deflector',         category:'armor',  cost:'1000 cr',  desc:'+2 AC · occupies one hand' },
  // Ammo
  { name:'Power Cells',       category:'ammo',   cost:'100 cr', desc:'Ammo for blasters', qty:'20' },
  { name:'Slug Mags',         category:'ammo',   cost:'100 cr', desc:'Ammo for slug rifles', qty:'20' },
  // Adventuring gear
  { name:'Backpack',          category:'basic', cost:'200 cr', desc:'First one free to carry' },
  { name:'Igniter',           category:'basic', cost:'50 cr', desc:'Routine fire-lighting succeeds' },
  { name:'Glowrod',           category:'basic', cost:'50 cr', desc:'Near light, 1 hour' },
  { name:'Ration Packs',      category:'basic', cost:'50 cr', desc:'Food + water, one day each', qty:'3' },
  { name:'Mag Spikes',        category:'basic', cost:'100 cr', desc:'Iron spikes for anchoring and jamming', qty:'10' },
  { name:'Grapple Line',      category:'basic', cost:'100 cr', desc:'Launcher hook with line' },
  { name:'Tether (60 ft)',    category:'basic', cost:'100 cr', desc:'Synthweave line' },
  { name:'Fuel Cell',         category:'basic', cost:'50 cr', desc:'Fuel or thrown incendiary, 1d4/round' },
  { name:'Glowlamp',          category:'basic', cost:'500 cr', desc:'Casts light like a glowrod, shutter, 1 hr/cell' },
  { name:'Medkit',            category:'basic', cost:'200 cr', desc:'Field medical supplies' },
  { name:'Crowbar',           category:'basic', cost:'50 cr', desc:'Leverage for prying and forcing' },
  { name:'Datapad',           category:'basic', cost:'200 cr', desc:'Stores an Engineer\'s known powers' },
  { name:'Allegiance Sigil',  category:'basic', cost:'500 cr', desc:'A Mystic\'s emblem of their order' },
  { name:'Credits (100)',     category:'basic', cost:'—',    desc:'A stick of 100 credits' },
];
