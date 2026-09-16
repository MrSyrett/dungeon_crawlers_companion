// GENERATED FILE - do not edit by hand.
// Source: data/mmrpg/parts/*.json - regenerate with: node scripts/build-mmrpg-data.mjs

import type { MmrpgOccupation } from "./mmrpg-types";

export const MMRPG_OCCUPATIONS = [
  {
    "name": "Adventurer",
    "genre": "core",
    "description": "The character focuses on having adventures. Perhaps they’re independently wealthy and don’t need another occupation, or maybe they hire out their services.",
    "examples": "Iron Fist (Danny Rand), Luke Cage, Hawkeye (Kate Bishop).",
    "tags": "Black Market Access.",
    "traits": "Connections: Super Heroes or Villains, Fearless."
  },
  {
    "name": "Assassin",
    "genre": "core",
    "description": "The character is a hired killer. They might tell themselves that this is for the greater good. They might be picky about who they take on as clients or targets, but the core of their occupation is ending lives.",
    "examples": "Arcade, Bullseye, Elektra, the Punisher.",
    "tags": "Streetwise, Villainous (common).",
    "traits": "Connections: Criminal, Signature Attack."
  },
  {
    "name": "Criminal",
    "genre": "core",
    "description": "The character did something that put them on the wrong side of the law. They might have spent time in jail for their crimes, or they might have gotten away with them scot-free. The fact that they break the law doesn’t necessarily make them a bad person, but law enforcers usually don’t care about such distinctions. If they are currently wanted by the law for their crimes, they should also take the Hunted tag. If they have served time, they should take the Convict tag too.",
    "examples": "Ant-Man (Scott Lang), Black Cat, Gambit.",
    "tags": "Black Market Access, Streetwise.",
    "traits": "Connections: Criminal."
  },
  {
    "name": "Educator",
    "genre": "core",
    "description": "The character educates others. They might be a grade- school teacher, a college professor or some other kind of instructor. They do their best to bring the knowledge they have to other people.",
    "examples": "Agatha Harkness, Blue Marvel, Professor X.",
    "tags": "",
    "traits": "Connections: Community, Font of Information, Presence."
  },
  {
    "name": "Engineer",
    "genre": "core",
    "description": "The character designs and builds things to solve problems. They sometimes invent brand-new things, but mostly they take scientific research and apply it to real-world problems.",
    "examples": "Ghost Rider (Robbie Reyes), Iron Man (Tony Stark), Whiplash.",
    "tags": "Lab Access.",
    "traits": "Gearhead, Inventor."
  },
  {
    "name": "Entertainer",
    "genre": "core",
    "description": "The character entertains others for a living. They could be a singer, a dancer, an actor, a musician, a writer, a filmmaker, speaker or something similar. They aren’t shy—at least when on the job—and they work hard to both gain an audience and keep them engaged.",
    "examples": "Dazzler, Echo, Mysterio, Wonder Man.",
    "tags": "",
    "traits": "Famous, Presence, Public Speaking."
  },
  {
    "name": "Health Care Worker",
    "genre": "core",
    "description": "The character is a doctor, nurse, therapist or other person dedicated to helping heal others. They likely have access to an office where they practice their craft.",
    "examples": "Doc Samson, Doctor Strange, the Night Nurse (Linda Carter), Thor (Jane Foster).",
    "tags": "",
    "traits": "Clinician, First Aid."
  },
  {
    "name": "Investigator",
    "genre": "core",
    "description": "The character is trained to solve mysteries. This can be as a private detective or as part of an official law enforcement organization, ranging from the New York Police Department to the Federal Bureau of Investigation, S.H.I.E.L.D. or even the Nova Corps.",
    "examples": "Jessica Jones, Misty Knight.",
    "tags": "",
    "traits": "Connections: Police, Interrogation, Investigation."
  },
  {
    "name": "Journalist",
    "genre": "core",
    "description": "The character works as a reporter or editor for a news organization. This can range anywhere from the Daily Bugle to TNM (Threats and Menaces). It can also include any sort of reporting, whether TV, radio, newspaper or online.",
    "examples": "Silk, Spider-Man (Peter Parker), Venom (Eddie Brock).",
    "tags": "",
    "traits": "Audience, Connections: Sources, Pundit."
  },
  {
    "name": "Law Enforcer",
    "genre": "core",
    "description": "The character works as a law enforcement officer. They could a be anything from a town cop to an agent of S.H.I.E.L.D. They have a great deal of authority inside their jurisdiction and oen command respect outside of it as well.",
    "examples": "Nick Fury Jr., Human Torch (Jim Hammond), Maria Hill, Photon (Monica Rambeau).",
    "tags": "Authority, Backup.",
    "traits": "Interrogation, Investigation."
  },
  {
    "name": "Lawyer",
    "genre": "core",
    "description": "The character has a law degree and knows how to use it. They might work for a gigantic and powerful law firm, or they might have set up their own practice.",
    "examples": "Daredevil (Matt Murdock), Foggy Nelson, She-Hulk.",
    "tags": "",
    "traits": "Dealmaker, Legal Eagle, Public Speaking."
  },
  {
    "name": "Leader",
    "genre": "core",
    "description": "The character is the leader of a city, region, state or nation. This includes things like being the elected mayor of New York City or the hereditary king of a country.",
    "examples": "Black Bolt, Black Panther (T’Challa), Doctor Doom, Sub-Mariner (Namor), Thor (Odinson).",
    "tags": "Authority, Powerful.",
    "traits": "Presence."
  },
  {
    "name": "Military",
    "genre": "core",
    "description": "The character serves (or at least once served) in a military organization and relies on that training. They can sometimes call on their fellow soldiers for help. They may have worked for a nation or possibly as part of a mercenary outfit. If they are on active duty, their time is oen not their own, and they should take the tag Obligation: Duty.",
    "examples": "Captain America (Steve Rogers), Captain Marvel (Carol Danvers), War Machine, Wolverine (Logan).",
    "tags": "",
    "traits": "Battle Ready, Connections: Military, Situational Awareness."
  },
  {
    "name": "Outsider",
    "genre": "core",
    "description": "The character comes from another planet, dimension or time and is not familiar with how things work on this Earth. They may have had another occupation back where they came from, but it’s not generally applicable here.",
    "examples": "Groot, Rocket Raccoon, Thor (Odinson).",
    "tags": "",
    "traits": "Connections: Outsiders, Fresh Eyes, Stranger."
  },
  {
    "name": "Scientist",
    "genre": "core",
    "description": "The character solves problems by means of scientific research. They are oen among the smartest people in the world, and other heroes turn to them for their expertise.",
    "examples": "Doctor Octopus (Otto Octavius), Hulk (Bruce Banner), Mister Fantastic, Moon Girl.",
    "tags": "Lab Access.",
    "traits": "Inventor, Scientific Expertise."
  },
  {
    "name": "Spy",
    "genre": "core",
    "description": "The character is an expert in espionage. They served as a spy for a nation or corporation and know how to find things out about people and organizations.",
    "examples": "Black Widow (Natasha Romanoff ), Peggy Carter, Winter Soldier.",
    "tags": "Black Market Access.",
    "traits": "Connections: Espionage, Leverage."
  },
  {
    "name": "Student",
    "genre": "core",
    "description": "The character attends school or college on a full-time basis. What they study or focus on is up to them and their school. Most people start out with this occupation, but once they graduate, they move on to something new. If that happens with your character, you can then select a new occupation to replace this one.",
    "examples": "Moon Girl, Ms. Marvel (Kamala Khan), Spider- Man (Miles Morales).",
    "tags": "Mentor, Obligation: School.",
    "traits": "Quick Learner."
  },
  {
    "name": "Tycoon",
    "genre": "core",
    "description": "The character is wildly wealthy and well-known. They want for nothing, and they make a splash wherever they go. They get invited to the best parties and let into all the VIP sections.",
    "examples": "Iron Man (Tony Stark), Iron Monger (Obadiah Stane), Mandarin, Sunspot, Wasp (Janet Van Dyne).",
    "tags": "Rich.",
    "traits": "Connections: Celebrities, Famous."
  }
] as unknown as MmrpgOccupation[];
