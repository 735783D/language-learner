// src/data/index.js
// Main export file for all language data
// Multi-language support structure

// Creek/Mvskoke Language
import { creekStages } from './creek/stages';
import { singleLetterExercises as creekSingleLetters } from './creek/alphabet/singleLetters';
import { twoLetterSounds as creekTwoLetters } from './creek/alphabet/twoLetters';
import { threeLetterSounds as creekThreeLetters } from './creek/alphabet/threeLetters';

// Import vocabulary
import { 
  infinitives, 
  allVerbs, 
  everydayVerbs,
  commonVerbs,
  verbsByCategory,
  presentTense,
  commands,
  futurePattern
} from './creek/vocabulary/verbs';

// Add other Creek exports when ready:
// import { pronouns } from './creek/grammar/pronouns';
// import { allNouns } from './creek/vocabulary/nouns';
// import { adjectives } from './creek/vocabulary/adjectives';

// Future languages can be added here:
// import { choctawStages } from './choctaw/stages';
// import { cherokeeStages } from './cherokee/stages';

// Language registry - add new languages here
export const availableLanguages = {
  creek: {
    name: 'Mvskoke (Creek)',
    nativeName: 'Mvskoke',
    code: 'mus',
    stages: creekStages,
    alphabet: {
      single: creekSingleLetters,
      twoLetter: creekTwoLetters,
      threeLetter: creekThreeLetters
    },
    verbs: {
      infinitives,
      everyday: everydayVerbs,
      common: commonVerbs,
      byCategory: verbsByCategory,
      presentTense,
      commands,
      futurePattern
    }
  }
  // Future languages:
  // choctaw: {
  //   name: 'Choctaw',
  //   nativeName: 'Chahta',
  //   code: 'cho',
  //   stages: choctawStages
  // }
};

// Helper function to get language data
export const getLanguageData = (languageCode) => {
  return availableLanguages[languageCode] || null;
};

// Export individual language data for backward compatibility
export { creekStages };
export { 
  creekSingleLetters as singleLetterExercises,
  creekTwoLetters as twoLetterSounds,
  creekThreeLetters as threeLetterSounds
};

// Export Creek verbs
export {
  infinitives,
  allVerbs,
  everydayVerbs,
  commonVerbs,
  verbsByCategory,
  presentTense,
  commands,
  futurePattern
};

// Default export
export default availableLanguages;