// src/data/creek/vocabulary/animals/index.js

import { farmAnimals } from './farmAnimals';
import { wildAnimals } from './wildAnimals';
import { birds } from './birds';
import { insects } from './insects';
import { aquatic } from './aquatic';
import { reptiles } from './reptiles';

// Export individual categories
export { farmAnimals, wildAnimals, birds, insects, aquatic, reptiles };

// Combined animals array (if needed for "all animals" lessons)
export const allAnimals = [
  ...farmAnimals,
  ...wildAnimals,
  ...birds,
  ...insects,
  ...aquatic,
  ...reptiles
];

// Export by category for easy access
export const animalsByCategory = {
  farm: farmAnimals,
  wild: wildAnimals,
  birds: birds,
  insects: insects,
  aquatic: aquatic,
  reptiles: reptiles
};

export default animalsByCategory;