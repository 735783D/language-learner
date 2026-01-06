// Creek/Mvskoke Stages - Main curriculum structure
import { singleLetterExercises } from './alphabet/singleLetters';
import { twoLetterSounds } from './alphabet/twoLetters';
import { threeLetterSounds } from './alphabet/threeLetters';
import { 
  infinitives, 
  everydayVerbs, 
  presentTense, 
  futurePattern,
  commands 
} from './vocabulary/verbs';
// import { nounsByCategory } from './vocabulary/nouns';
import { vocabularyByCategory } from './vocabulary';

// import { allNouns } from './vocabulary/nouns';

// Helper function to create match exercises from vocabulary data
const createMatchExercises = (vocabArray, numWrongAnswers = 3) => {
  return vocabArray.map(item => {
    // Get random wrong answers from other items in the array
    const otherItems = vocabArray.filter(v => v.mvskoke !== item.mvskoke);
    const wrongAnswers = otherItems
      .sort(() => Math.random() - 0.5)
      .slice(0, numWrongAnswers)
      .map(v => v.english);
    
    // Combine correct answer with wrong answers and shuffle
    const options = [item.english, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    return {
      word: item.mvskoke,
      translation: item.english,
      options: options,
      category: item.category || 'vocabulary',
      sound_file: item.sound_file || null
    };
  });
};

export const creekStages = {
  1: {
    name: "Single Letters",
    description: "Learn the Mvskoke alphabet A-Y",
    requiredScore: 15,
    type: "sequential",
    subLessons: {
      full: {
        name: "Full Alphabet",
        description: "All letters A-Y",
        exercises: singleLetterExercises
      },
      firstHalf: {
        name: "A through M",
        description: "First half",
        exercises: singleLetterExercises.slice(0, 10)
      },
      secondHalf: {
        name: "N through Y",
        description: "Second half",
        exercises: singleLetterExercises.slice(10, 20)
      }
    }
  },
  
  "1b": {
    name: "Two-Letter Sounds",
    description: "Consonant-vowel combinations",
    requiredScore: 100,
    type: "sequential",
    subLessons: {
      full: {
        name: "Full Set",
        description: "All two-letter sounds",
        exercises: twoLetterSounds
      },
      cfh: {
        name: "C, F, H + Vowels",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(0, 18)
      },
      klm: {
        name: "K, L, M + Vowels",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(18, 36)
      },
      npr: {
        name: "N, P, R + Vowels",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(36, 54)
      },
      stw: {
        name: "S, T, W + Vowels",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(54, 72)
      },
      yae: {
        name: "Y + Vowels, A + Consonants",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(72, 90)
      },
      eio1: {
        name: "E, I + Consonants (Part 1)",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(90, 108)
      },
      eio2: {
        name: "O, U + Consonants",
        description: "18 sounds",
        exercises: twoLetterSounds.slice(108, 132)
      },
      v: {
        name: "V + Consonants",
        description: "8 sounds",
        exercises: twoLetterSounds.slice(132, 156)
      }
    }
  },
  
  "1c": {
    name: "Three-Letter Sounds",
    description: "Complex sound patterns",
    requiredScore: 80,
    type: "sequential",
    subLessons: {
      full: {
        name: "Full Set",
        description: "All three-letter sounds",
        exercises: threeLetterSounds
      },
      group1: {
        name: "SAK, LAK, MAS Sets",
        description: "18 sounds",
        exercises: threeLetterSounds.slice(0, 18)
      },
      group2: {
        name: "MAT, HAK, HAS Sets",
        description: "18 sounds",
        exercises: threeLetterSounds.slice(18, 36)
      },
      group3: {
        name: "MAK, MAN, HAL Sets",
        description: "18 sounds",
        exercises: threeLetterSounds.slice(36, 54)
      },
      group4: {
        name: "NAK, FAS, CAS Sets",
        description: "18 sounds",
        exercises: threeLetterSounds.slice(54, 72)
      },
      group5: {
        name: "Mixed Patterns 1",
        description: "18 sounds",
        exercises: threeLetterSounds.slice(72, 90)
      },
      group6: {
        name: "Mixed Patterns 2",
        description: "Remaining sounds",
        exercises: threeLetterSounds.slice(90)
      }
    }
  },

  // Stage 2 - Words/Vocabulary
  2: {
    name: "Words",
    description: "Learn essential Mvskoke vocabulary",
    requiredScore: 7,
    type: "vocabulary",
    subLessons: {
      // Animals now routes to AnimalsHub with subcategories
      animals: {
        name: "Animals",
        description: "Learn animal names",
        subCategories: {
          farm: {
            name: "Farm Animals",
            exercises: vocabularyByCategory.animals.farm
          },
          wild: {
            name: "Wild Animals",
            exercises: vocabularyByCategory.animals.wild
          },
          birds: {
            name: "Birds",
            exercises: vocabularyByCategory.animals.birds
          },
          insects: {
            name: "Insects",
            exercises: vocabularyByCategory.animals.insects
          },
          aquatic: {
            name: "Aquatic Animals",
            exercises: vocabularyByCategory.animals.aquatic
          },
          reptiles: {
            name: "Reptiles & Amphibians",
            exercises: vocabularyByCategory.animals.reptiles
          }
        }
      },
      colors: {
        name: "Colors",
        description: "Learn colors and descriptions",
        exercises: vocabularyByCategory.colors
      },
      family: {
        name: "Family",
        description: "Family members and relationships",
        exercises: vocabularyByCategory.family
      },
      food: {
        name: "Food",
        description: "Foods and drinks",
        exercises: vocabularyByCategory.food
      },
      body: {
        name: "Body Parts",
        description: "Parts of the body",
        exercises: vocabularyByCategory.body
      },
      nature: {
        name: "Nature",
        description: "Plants, weather, and natural world",
        exercises: vocabularyByCategory.nature
      },
      home: {
        name: "Home & Objects",
        description: "Household items and objects",
        exercises: vocabularyByCategory.home
      },
      people: {
        name: "People",
        description: "Words for people and descriptions",
        exercises: vocabularyByCategory.people
      }
    }
  },
  
  3: {
    name: "Simple Phrases",
    description: "Practice basic Mvskoke sentences",
    requiredScore: 5,
    type: "build",
    exercises: [
      {
        type: "build",
        english: "Hello",
        words: ["Hensci", "Hęrro", "Hi", "Hey"],
        correct: ["Hensci"]
      },
      {
        type: "build",
        english: "Thank you",
        words: ["Mvto", "Thanks", "Gracias", "Merci"],
        correct: ["Mvto"]
      },
      {
        type: "build",
        english: "Goodbye",
        words: ["Unliketv", "Bye", "Adios", "Ciao"],
        correct: ["Unliketv"]
      },
      {
        type: "build",
        english: "Good morning",
        words: ["Hiyomat", "hesse", "Morning", "Night"],
        correct: ["Hiyomat", "hesse"]
      }
    ]
  },

  4: {
    name: "Verbs",
    description: "Learn action words and conjugation",
    requiredScore: 20,
    type: "verbs",
    subLessons: {
      infinitives: {
        name: "Infinitives",
        description: "Learn basic verb forms (to eat, to sleep, etc.)",
        exercises: infinitives.map(verb => ({
          infinitive: verb.infinitive,
          translation: verb.translation,
          category: verb.category,
          sound: verb.sound,
          e_sound: verb.e_sound,
          example: verb.example,
          exampleTranslation: verb.exampleTranslation,
          sound_file: verb.sound_file,
          type: "infinitive"
        }))
      },
      present: {
        name: "Present Tense",
        description: "I am eating, you are sleeping",
        exercises: presentTense.map(verb => ({
          infinitive: verb.infinitive,
          present: verb.present,
          translation: verb.translation,
          type: "present"
        }))
      },
      past: {
        name: "Past Tense",
        description: "Actions that already happened",
        exercises: [] // To be added when past tense data is available
      },
      future: {
        name: "Future Tense",
        description: "I am going to..., You are going to...",
        exercises: futurePattern.examples.map(verb => ({
          infinitive: verb.infinitive,
          root: verb.root,
          firstPerson: verb.firstPerson,
          secondPerson: verb.secondPerson,
          question: verb.question,
          translation: verb.translation,
          type: "future"
        }))
      }
    }
  }
};