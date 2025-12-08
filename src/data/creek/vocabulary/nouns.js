// Mvskoke Nouns organized by category

export const animals = [
  { mvskoke: "efv", english: "dog" },
  { mvskoke: "pose", english: "cat" },
  { mvskoke: "cufe", english: "rabbit" },
  { mvskoke: "nokuse", english: "bear" },
  { mvskoke: "sukhv", english: "pig" },
  { mvskoke: "hvnvnrv cukwuce", english: "hummingbird" },
  { mvskoke: "kaccv", english: "tiger" },
  { mvskoke: "locv", english: "turtle" }
];

export const people = [
  { mvskoke: "hunvnwv", english: "man" },
  { mvskoke: "hokte", english: "woman" },
  { mvskoke: "cepane", english: "boy" },
  { mvskoke: "hoktuce", english: "girl" },
  { mvskoke: "este", english: "person" },
  { mvskoke: "mvskoke opunayv", english: "Mvskoke speaker" }
];

export const things = [
  { mvskoke: "pokko rakko", english: "basketball" },
  { mvskoke: "pokkecv", english: "player" },
  { mvskoke: "perro tvmkv", english: "airplane" },
  { mvskoke: "eto", english: "tree/limb" },
  { mvskoke: "cvto", english: "rock" },
  { mvskoke: "mvskoke opvnkv", english: "Mvskoke language" }
];

// Combined export for easy access
export const allNouns = [
  ...animals,
  ...people,
  ...things
];

// Export by category for themed lessons
export const nounsByCategory = {
  animals,
  people,
  things
};