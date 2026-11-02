// SOLO PLAY — Shadowdark solo tables (SoloDark, The Arcane Library): the Oracle and the
// Prompts table (d100 verb + noun; index 0 = 01 … index 99 = 00). Read by
// tools/templates/sd_solo.html. Part of the removable Solo Play feature — see SOLO-REMOVAL.md.
window.SD_SOLO_TABLES = {
  // Oracle check: d20 (advantage if likely, disadvantage if unlikely).
  // 1–9 No · 10 Twist (roll a prompt) · 11–20 Yes. An odd roll (not 1) adds a "but".
  // A natural 1 or 20 is the most extreme version possible.
  oracle: function(n){
    var res = n <= 9 ? 'No' : n === 10 ? 'Twist' : 'Yes';
    return { n: n, result: res, but: n % 2 === 1 && n !== 1 && res !== 'Twist', extreme: n === 1 || n === 20 };
  },
  promptVerbs: ["Stop", "Tell", "Trust", "Prevent", "Deliver", "Dismantle", "Create", "Resist", "Imbue", "Befriend", "Sneak", "Disagree", "Illuminate", "Assemble", "Free", "Combine", "Disrupt", "Demand", "Obstruct", "Push", "Arrive", "Slow", "Overcome", "Block", "Consume", "Pursue", "Reward", "Expand", "Waste", "Capture", "Weaken", "Reveal", "Investigate", "Forbid", "Start", "Surprise", "Endure", "Pull", "Unleash", "Avoid", "Advance", "Agree", "Deliver", "Link", "Hinder", "Withhold", "Lose", "Evolve", "Fortify", "Punish", "Ignite", "Awaken", "Defy", "Conceal", "Invite", "Break", "Allow", "Open", "Repel", "Activate", "Gather", "Give", "Reverse", "Warn", "Confront", "Betray", "Secure", "Darken", "Flee", "Win", "Scatter", "Contain", "Assist", "Take", "Question", "Drop", "Accept", "Sacrifice", "Drain", "Hint", "Fumble", "Fall", "Ascend", "Protect", "Escape", "Defeat", "Mend", "Acquire", "Guide", "Mislead", "Banish", "Uphold", "Build", "Change", "Revoke", "Seek", "Destroy", "Uncover", "Rest", "Release"],
  promptNouns: ["Fault", "Life", "Battle", "Lie", "Vice", "Memory", "Burden", "Treachery", "Trial", "Risk", "Prosperity", "Time", "Conflict", "Light", "Unnatural", "Information", "Hope", "Journey", "Mundane", "Hazard", "Family", "Obstacle", "Doubt", "Freedom", "Weakness", "Unknown", "Glory", "Friend", "Discovery", "Lead", "Storm", "Enemy", "Integrity", "Science", "Asset", "Crime", "Wisdom", "Justice", "Strife", "Disgust", "Danger", "Balance", "Nature", "Chaos", "Ambush", "Wealth", "Thought", "Dark", "Connection", "Door", "Fear", "Sorcery", "Honor", "Spirit", "Trust", "Loss", "Failure", "Peril", "Plan", "Trick", "Mind", "Pain", "Victory", "Death", "Control", "Knowledge", "Secret", "Kindness", "Exploration", "Surprise", "Magic", "Animal", "Way", "Essence", "Dream", "Anger", "Vision", "Safety", "Result", "Place", "Path", "Nourishment", "Theft", "Decay", "Truth", "People", "Help", "Gear", "Idea", "Order", "Success", "Barrier", "Goal", "Luck", "Identity", "Harm", "Wilderness", "Motive", "Shelter", "Power"]
};
