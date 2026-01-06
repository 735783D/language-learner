// src/data/creek/vocabulary/index.js

// IMPORT first
import { allNouns, people, things, nounsByCategory } from './nouns';
import { colors } from './colors';
import { family } from './family';
import { food } from './food';
import { body } from './body';
import { nature } from './nature';
import { home } from './home';
import { animalsByCategory, allAnimals } from './animals';
import { 
  infinitives, 
  everydayVerbs, 
  presentTense, 
  futurePattern,
  commands 
} from './verbs';
import { adjectives } from './adjectives';

// THEN re-export them
export { 
  allNouns,  
  people, 
  things, 
  nounsByCategory,
  colors,
  family,
  food,
  body,
  nature,
  home,
  infinitives,
  everydayVerbs,
  presentTense,
  futurePattern,
  commands,
  adjectives
};

export { animalsByCategory, allAnimals };

// Combined object - NOW all variables are defined
export const vocabularyByCategory = {
  animals: animalsByCategory,
  people,
  things,
  colors,
  family,
  food,
  body,
  nature,
  home
};