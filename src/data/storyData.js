// Story Mode Data - Stage 6
// Each story mixes different exercise types in a narrative flow

export const mvskokeStories = [
  {
    id: 'greetings',
    name: "Meeting an Elder",
    description: "Learn traditional greetings",
    culturalNote: "In Mvskoke culture, greeting elders with respect is essential",
    exercises: [
      // Start with character introduction
      {
        type: 'character',
        data: {
          char: 'H',
          sound: 'he',
          e_sound: 'hay',
          example: 'hensci',
          translation: 'as in hensci (hello)',
          sound_file: '/language-learner/sounds/creek/H-he.mp3'
        }
      },
      
      // Practice the sound
      {
        type: 'character',
        data: {
          char: 'E',
          sound: 'eeh',
          e_sound: 'lay',
          example: 'hensci',
          translation: 'as in hensci (hello)',
          sound_file: '/language-learner/sounds/creek/E-eeh.mp3'
        }
      },
      
      // Learn the word
      {
        type: 'match',
        data: {
          word: 'hensci',
          translation: 'hello',
          options: ['hello', 'goodbye', 'thank you', 'please']
        }
      },
      
      // Learn another character
      {
        type: 'character',
        data: {
          char: 'M',
          sound: 'me',
          e_sound: 'meh',
          example: 'mvto',
          translation: 'as in mvto (thank you)',
          sound_file: '/language-learner/sounds/creek/M-me.mp3'
        }
      },
      
      // Learn second word
      {
        type: 'match',
        data: {
          word: 'mvto',
          translation: 'thank you',
          options: ['thank you', 'hello', 'yes', 'no']
        }
      },
      
      // Build simple greeting
      {
        type: 'build',
        data: {
          english: 'Hello',
          words: ['Hensci', 'Mvto', 'Hiye', 'Likē'],
          correct: ['Hensci']
        }
      },
      
      // Build thank you
      {
        type: 'build',
        data: {
          english: 'Thank you',
          words: ['Hensci', 'Mvto', 'Estimvt', 'Hēres'],
          correct: ['Mvto']
        }
      }
    ]
  },
  
  {
    id: 'family',
    name: "Talking About Family",
    description: "Learn family member words",
    culturalNote: "Family relationships are central to Mvskoke identity",
    exercises: [
      {
        type: 'character',
        data: {
          char: 'P',
          sound: 'pe',
          e_sound: 'pay/bay',
          example: 'poke',
          translation: 'as in poke (grandmother)',
          sound_file: '/language-learner/sounds/creek/P-pe.mp3'
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'poke',
          translation: 'grandmother',
          options: ['grandmother', 'grandfather', 'mother', 'father']
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'pocvse',
          translation: 'grandfather',
          options: ['grandfather', 'grandmother', 'uncle', 'aunt']
        }
      },
      
      {
        type: 'build',
        data: {
          english: 'my grandmother',
          words: ['vm', 'poke', 'pocvse', 'cē'],
          correct: ['vm', 'poke']
        }
      },
      
      {
        type: 'build',
        data: {
          english: 'my grandfather',
          words: ['vm', 'poke', 'pocvse', 'cē'],
          correct: ['vm', 'pocvse']
        }
      }
    ]
  },
  
  {
    id: 'numbers',
    name: "Counting in Mvskoke",
    description: "Learn numbers 1-5",
    culturalNote: "Traditional counting was used for ceremonies and trade",
    exercises: [
      {
        type: 'match',
        data: {
          word: 'hvmken',
          translation: 'one',
          options: ['one', 'two', 'three', 'four']
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'hokkolen',
          translation: 'two',
          options: ['one', 'two', 'three', 'four']
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'tutcenen',
          translation: 'three',
          options: ['two', 'three', 'four', 'five']
        }
      },
      
      {
        type: 'build',
        data: {
          english: 'I have two',
          words: ['hokkolen', 'hvmken', 'ocis', 'tutcenen'],
          correct: ['hokkolen', 'ocis']
        }
      }
    ]
  },
  
  {
    id: 'stomp-dance',
    name: "At the Stomp Dance",
    description: "Learn ceremonial vocabulary",
    culturalNote: "The Stomp Dance is a sacred social gathering",
    exercises: [
      {
        type: 'match',
        data: {
          word: 'opvnkv',
          translation: 'dance',
          options: ['dance', 'sing', 'walk', 'run']
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'yvhiketv',
          translation: 'singing',
          options: ['dancing', 'singing', 'eating', 'sleeping']
        }
      },
      
      {
        type: 'build',
        data: {
          english: 'Let us dance',
          words: ['pom', 'opvnkēs', 'yvhikēs', 'pvfeknēs'],
          correct: ['pom', 'opvnkēs']
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'tvlofv',
          translation: 'ceremonial ground',
          options: ['ceremonial ground', 'river', 'house', 'tree']
        }
      }
    ]
  },
  
  {
    id: 'daily-life',
    name: "Daily Activities",
    description: "Common phrases for everyday life",
    culturalNote: "Learning practical phrases helps preserve language use",
    exercises: [
      {
        type: 'match',
        data: {
          word: 'hompetvs',
          translation: 'eating',
          options: ['eating', 'drinking', 'sleeping', 'walking']
        }
      },
      
      {
        type: 'match',
        data: {
          word: 'esketv',
          translation: 'drinking',
          options: ['eating', 'drinking', 'cooking', 'cleaning']
        }
      },
      
      {
        type: 'build',
        data: {
          english: 'I am eating',
          words: ['hompis', 'eskis', 'nocis', 'welaketv'],
          correct: ['hompis']
        }
      },
      
      {
        type: 'build',
        data: {
          english: 'Are you well?',
          words: ['cvhecēn', 'mahtvmēn', 'estemerkv', 'hiyē'],
          correct: ['cvhecēn']
        }
      }
    ]
  }
];

// Export for use in app
export const getStoryById = (id) => {
  return mvskokeStories.find(story => story.id === id);
};

export const getAllStories = () => {
  return mvskokeStories;
};