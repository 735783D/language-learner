// Main export file for all Creek/Mvskoke language data
// Import this in components: import { creekStages } from './data/creek';

export { creekStages } from './stages';

// Export alphabet data
export { singleLetterExercises } from './alphabet/singleLetters';
export { twoLetterSounds } from './alphabet/twoLetters';
export { threeLetterSounds } from './alphabet/threeLetters';

// Export vocabulary
export { 
  animals,
  people,
  things,
  allNouns,
  nounsByCategory 
} from './vocabulary/nouns';

export {
  infinitives,
  allVerbs,
  presentTense,
  pastTense,
  futureTense
} from './vocabulary/verbs';

export {
  adjectives,
  allAdjectives,
  adjectivesByCategory
} from './vocabulary/adjectives';

// Export grammar
export {
  pronouns,
  pronounSimple
} from './grammar/pronouns';

// Export stories
export { mvskokeStories } from './stories/culturalStories';