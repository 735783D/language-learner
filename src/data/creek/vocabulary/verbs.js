// Mvskoke Verbs - Everyday vocabulary
// Based on Creek Nation language resources

// Everyday Verbs - Common actions
export const everydayVerbs = [
  // Basic actions
  {
    infinitive: "ocetv",
    translation: "to have",
    category: "basic"
  },
  {
    infinitive: "mecetv",
    translation: "to do",
    category: "basic"
  },
  {
    infinitive: "maketv",
    translation: "to say",
    category: "basic"
  },
  {
    infinitive: "opunvyetv",
    translation: "to talk, speak",
    category: "basic"
  },
  {
    infinitive: "kerretv",
    translation: "to learn, to know",
    category: "basic"
  },
  {
    infinitive: "hecetv",
    translation: "to see",
    category: "basic"
  },
  {
    infinitive: "hopoyetv",
    translation: "to look for, search for",
    category: "basic"
  },
  {
    infinitive: "emetv",
    translation: "to give (something to someone)",
    category: "basic"
  },
  {
    infinitive: "hayetv",
    translation: "to make",
    category: "basic"
  },

  // Work and action verbs
  {
    infinitive: "vtotketv",
    translation: "to work",
    category: "work"
  },
  {
    infinitive: "huehketv",
    translation: "to call",
    category: "work"
  },
  {
    infinitive: "vpohetv",
    translation: "to ask",
    category: "work"
  },
  {
    infinitive: "mapohicetv",
    translation: "to listen",
    category: "work"
  },
  {
    infinitive: "licetv",
    translation: "to put, set down (of 1)",
    category: "work"
  },
  {
    infinitive: "kayetv",
    translation: "to put, set down (of 2)",
    category: "work"
  },
  {
    infinitive: "vpoyetv",
    translation: "to put, set down (of 3+)",
    category: "work"
  },
  {
    infinitive: "vlicecetv",
    translation: "to begin, start",
    category: "work"
  },
  {
    infinitive: "vnicetv",
    translation: "to help",
    category: "work"
  },

  // Learning and communication
  {
    infinitive: "hecicetv",
    translation: "to show",
    category: "learning"
  },
  {
    infinitive: "ahkopvnetv",
    translation: "to play",
    category: "learning"
  },
  {
    infinitive: "hoccicetv",
    translation: "to write",
    category: "learning"
  },
  {
    infinitive: "ohhonayetv",
    translation: "to read",
    category: "learning"
  },

  // Daily activities
  {
    infinitive: "nesetv",
    translation: "to buy",
    category: "daily"
  },
  {
    infinitive: "wiketv",
    translation: "to stop doing something, quit",
    category: "daily"
  },
  {
    infinitive: "emehaketv",
    translation: "to wait",
    category: "daily"
  },
  {
    infinitive: "okkosetv",
    translation: "to wash",
    category: "daily"
  }
];

// Additional common verbs from "Changing Verbs" document
export const commonVerbs = [
  {
    infinitive: "wiketv",
    translation: "to stop",
    command: "wikvs",
    present: "wikis",
    category: "motion"
  },
  {
    infinitive: "nucetv",
    translation: "to sleep",
    command: "nucvs",
    present: "nucis",
    category: "daily"
  },
  {
    infinitive: "aklopetv",
    translation: "to run",
    command: "aklopvs",
    present: "aklopis",
    category: "motion"
  },
  {
    infinitive: "hompetv",
    translation: "to eat",
    command: "hompvs",
    present: "hompis",
    category: "daily"
  },
  {
    infinitive: "aliketv",
    translation: "to sit up",
    command: "alikvs",
    present: "alikis",
    category: "motion"
  },
  {
    infinitive: "pasetv",
    translation: "to sweep",
    command: "pasvs",
    present: "pasis",
    category: "daily"
  },
  {
    infinitive: "hayetv",
    translation: "to make",
    command: "hayvs",
    present: "hayis",
    category: "basic"
  },
  {
    infinitive: "hopoyetv",
    translation: "to look for",
    command: "hopoyvs",
    present: "hopoyis",
    category: "basic"
  },
  {
    infinitive: "hecetv",
    translation: "to see",
    command: "hecvs",
    present: "hecis",
    category: "basic"
  },
  {
    infinitive: "liketv",
    translation: "to sit",
    command: "likvs",
    present: "likis",
    category: "motion"
  },
  {
    infinitive: "esketv",
    translation: "to drink",
    command: "eskvs",
    present: "eskis",
    category: "daily"
  },
  {
    infinitive: "vtetv",
    translation: "to go",
    command: "vtes / vtvs",
    present: "atis",
    category: "motion"
  },
  {
    infinitive: "vyetv",
    translation: "to go",
    command: "vyvs",
    present: "ayis",
    category: "motion"
  },
  {
    infinitive: "onayetv",
    translation: "to tell",
    command: "onayvs",
    present: "ohnayis",
    category: "basic"
  },
  {
    infinitive: "vkhottetv",
    translation: "to want",
    command: "vkhottvs",
    present: "vkhottis",
    category: "basic"
  },
  {
    infinitive: "vccetv",
    translation: "to come",
    command: "vccvs",
    present: "vccis",
    category: "motion"
  },
  {
    infinitive: "laksetv",
    translation: "to kick",
    command: "laksvs",
    present: "laksis",
    category: "motion"
  }
];

// Combined list of all infinitive verbs (just the infinitive forms for introduction)
export const infinitives = [
  ...everydayVerbs.map(v => ({ infinitive: v.infinitive, translation: v.translation, category: v.category })),
  ...commonVerbs.filter(v => !everydayVerbs.find(ev => ev.infinitive === v.infinitive))
    .map(v => ({ infinitive: v.infinitive, translation: v.translation, category: v.category }))
];

// All verbs with full conjugation data where available
export const allVerbs = [...everydayVerbs, ...commonVerbs];

// Verbs grouped by category
export const verbsByCategory = {
  basic: allVerbs.filter(v => v.category === 'basic'),
  daily: allVerbs.filter(v => v.category === 'daily'),
  motion: allVerbs.filter(v => v.category === 'motion'),
  work: allVerbs.filter(v => v.category === 'work'),
  learning: allVerbs.filter(v => v.category === 'learning')
};

// Present tense forms (I am doing...)
export const presentTense = commonVerbs
  .filter(v => v.present)
  .map(v => ({
    root: v.infinitive.replace('etv', ''),
    infinitive: v.infinitive,
    present: v.present,
    translation: v.translation
  }));

// Command forms
export const commands = commonVerbs
  .filter(v => v.command)
  .map(v => ({
    infinitive: v.infinitive,
    command: v.command,
    translation: v.translation
  }));

// Future tense construction pattern (vhan)
// Based on "vhan Sentencing.pdf"
export const futurePattern = {
  description: "To form future tense (going to...), drop 'etv' and add 'vhanis' for 'I am going to...' or 'vhanetces' for 'You are going to...'",
  examples: [
    {
      infinitive: "nucetv",
      root: "nuc",
      firstPerson: "nucvhanis",
      secondPerson: "nucvhanetces",
      question: "nucvhanetcv?",
      translation: "to sleep"
    },
    {
      infinitive: "hompetv",
      root: "homp",
      firstPerson: "hompvhanis",
      secondPerson: "hompvhanetces",
      question: "hompvhanetcv?",
      translation: "to eat"
    },
    {
      infinitive: "vtotketv",
      root: "vtotk",
      firstPerson: "vtotkvhanis",
      secondPerson: "vtotkvhanetces",
      question: "vtotkvhanetcv?",
      translation: "to work"
    },
    {
      infinitive: "kerretv",
      root: "kerr",
      firstPerson: "kerrvhanis",
      secondPerson: "kerrvhanetces",
      question: "kerrvhanetcv?",
      translation: "to learn/know"
    },
    {
      infinitive: "maketv",
      root: "mak",
      firstPerson: "makvhanis",
      secondPerson: "makvhanetces",
      question: "makvhanetcv?",
      translation: "to say"
    },
    {
      infinitive: "pasetv",
      root: "pas",
      firstPerson: "pasvhanis",
      secondPerson: "pasvhanetces",
      question: "pasvhanetcv?",
      translation: "to sweep"
    }
  ]
};