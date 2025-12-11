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

  2: {
    name: "Basic Words",
    description: "Learn essential Mvskoke vocabulary",
    requiredScore: 5,
    type: "match",
    exercises: [
      {
        word: "efv",
        translation: "dog",
        options: ["cat", "dog", "bird", "fish"]
      },
      {
        word: "eco",
        translation: "deer",
        options: ["deer", "bear", "wolf", "rabbit"]
      },
      {
        word: "uewv",
        translation: "water",
        options: ["water", "fire", "earth", "air"]
      },
      {
        word: "vpe",
        translation: "food",
        options: ["food", "drink", "sleep", "work"]
      }
    ]
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




// // Creek/Mvskoke Stages - Main curriculum structure
// import { singleLetterExercises } from './alphabet/singleLetters';
// import { twoLetterSounds } from './alphabet/twoLetters';
// import { threeLetterSounds } from './alphabet/threeLetters';

// export const creekStages = {
//   1: {
//     name: "Single Letters",
//     description: "Learn the Mvskoke alphabet A-Y",
//     requiredScore: 15,
//     type: "sequential",
//     subLessons: {
//       full: {
//         name: "Full Alphabet",
//         description: "All letters A-Y",
//         exercises: singleLetterExercises
//       },
//       firstHalf: {
//         name: "A through M",
//         description: "First half",
//         exercises: singleLetterExercises.slice(0, 10)
//       },
//       secondHalf: {
//         name: "N through Y",
//         description: "Second half",
//         exercises: singleLetterExercises.slice(10, 20)
//       }
//     }
//   },
  
//   "1b": {
//     name: "Two-Letter Sounds",
//     description: "Consonant-vowel combinations",
//     requiredScore: 100,
//     type: "sequential",
//     subLessons: {
//       full: {
//         name: "Full Set",
//         description: "All two-letter sounds",
//         exercises: twoLetterSounds
//       },
//       cfh: {
//         name: "C, F, H + Vowels",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(0, 18)
//       },
//       klm: {
//         name: "K, L, M + Vowels",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(18, 36)
//       },
//       npr: {
//         name: "N, P, R + Vowels",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(36, 54)
//       },
//       stw: {
//         name: "S, T, W + Vowels",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(54, 72)
//       },
//       yae: {
//         name: "Y + Vowels, A + Consonants",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(72, 90)
//       },
//       eio1: {
//         name: "E, I + Consonants (Part 1)",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(90, 108)
//       },
//       eio2: {
//         name: "O, U + Consonants",
//         description: "18 sounds",
//         exercises: twoLetterSounds.slice(108, 132)
//       },
//       v: {
//         name: "V + Consonants",
//         description: "8 sounds",
//         exercises: twoLetterSounds.slice(132, 156)
//       }
//     }
//   },
  
//   "1c": {
//     name: "Three-Letter Sounds",
//     description: "Complex sound patterns",
//     requiredScore: 80,
//     type: "sequential",
//     subLessons: {
//       full: {
//         name: "Full Set",
//         description: "All three-letter sounds",
//         exercises: threeLetterSounds
//       },
//       group1: {
//         name: "SAK, LAK, MAS Sets",
//         description: "18 sounds",
//         exercises: threeLetterSounds.slice(0, 18)
//       },
//       group2: {
//         name: "MAT, HAK, HAS Sets",
//         description: "18 sounds",
//         exercises: threeLetterSounds.slice(18, 36)
//       },
//       group3: {
//         name: "MAK, MAN, HAL Sets",
//         description: "18 sounds",
//         exercises: threeLetterSounds.slice(36, 54)
//       },
//       group4: {
//         name: "NAK, FAS, CAS Sets",
//         description: "18 sounds",
//         exercises: threeLetterSounds.slice(54, 72)
//       },
//       group5: {
//         name: "Mixed Patterns 1",
//         description: "18 sounds",
//         exercises: threeLetterSounds.slice(72, 90)
//       },
//       group6: {
//         name: "Mixed Patterns 2",
//         description: "Remaining sounds",
//         exercises: threeLetterSounds.slice(90)
//       }
//     }
//   },

//   2: {
//     name: "Basic Words",
//     description: "Learn essential Mvskoke vocabulary",
//     requiredScore: 5,
//     type: "match",
//     exercises: [
//       {
//         word: "efv",
//         translation: "dog",
//         options: ["cat", "dog", "bird", "fish"]
//       },
//       {
//         word: "eco",
//         translation: "deer",
//         options: ["deer", "bear", "wolf", "rabbit"]
//       },
//       {
//         word: "uewv",
//         translation: "water",
//         options: ["water", "fire", "earth", "air"]
//       },
//       {
//         word: "vpe",
//         translation: "food",
//         options: ["food", "drink", "sleep", "work"]
//       }
//     ]
//   },
  
//   3: {
//     name: "Simple Phrases",
//     description: "Practice basic Mvskoke sentences",
//     requiredScore: 5,
//     type: "build",
//     exercises: [
//       {
//         type: "build",
//         english: "Hello",
//         words: ["Hensci", "Hęrro", "Hi", "Hey"],
//         correct: ["Hensci"]
//       },
//       {
//         type: "build",
//         english: "Thank you",
//         words: ["Mvto", "Thanks", "Gracias", "Merci"],
//         correct: ["Mvto"]
//       },
//       {
//         type: "build",
//         english: "Goodbye",
//         words: ["Unliketv", "Bye", "Adios", "Ciao"],
//         correct: ["Unliketv"]
//       },
//       {
//         type: "build",
//         english: "Good morning",
//         words: ["Hiyomat", "hesse", "Morning", "Night"],
//         correct: ["Hiyomat", "hesse"]
//       }
//     ]
//   }
// };