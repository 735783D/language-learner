

// Stage 1: Character Set - Sequential learning
export const characterStage = {
  name: "Character Set",
  description: "Learn the Spanish alphabet and special characters",
  requiredScore: 6,
  exercises: [
    { type: "character", char: "á", sound: "ah (stressed)", example: "más", translation: "more" },
    { type: "character", char: "é", sound: "eh (stressed)", example: "café", translation: "coffee" },
    { type: "character", char: "í", sound: "ee (stressed)", example: "sí", translation: "yes" },
    { type: "character", char: "ó", sound: "oh (stressed)", example: "adiós", translation: "goodbye" },
    { type: "character", char: "ú", sound: "oo (stressed)", example: "tú", translation: "you" },
    { type: "character", char: "ñ", sound: "ny (like canyon)", example: "mañana", translation: "tomorrow" },
    { type: "character", char: "ll", sound: "y/j sound", example: "llamar", translation: "to call" },
    { type: "character", char: "rr", sound: "rolled r", example: "perro", translation: "dog" },
    { type: "character", char: "ch", sound: "ch", example: "chocolate", translation: "chocolate" },
  ]
};

// Exercise pools for mixed practice stages
export const tinyWordsPool = [
  { type: "match", word: "el", translation: "the", options: ["the", "a", "and", "or"] },
  { type: "match", word: "la", translation: "the", options: ["the", "a", "she", "he"] },
  { type: "match", word: "un", translation: "a/one", options: ["a", "the", "one", "some"] },
  { type: "match", word: "una", translation: "a/one", options: ["a", "the", "some", "one"] },
  { type: "match", word: "yo", translation: "I", options: ["I", "you", "he", "we"] },
  { type: "match", word: "tú", translation: "you", options: ["you", "I", "he", "they"] },
  { type: "match", word: "sí", translation: "yes", options: ["yes", "no", "maybe", "ok"] },
  { type: "match", word: "no", translation: "no", options: ["no", "yes", "not", "never"] },
  { type: "match", word: "y", translation: "and", options: ["and", "or", "but", "with"] },
  { type: "match", word: "o", translation: "or", options: ["or", "and", "but", "with"] },
  { type: "match", word: "en", translation: "in", options: ["in", "on", "at", "to"] },
  { type: "match", word: "de", translation: "of/from", options: ["of", "to", "for", "with"] },
  { type: "match", word: "es", translation: "is", options: ["is", "am", "are", "be"] },
  { type: "match", word: "soy", translation: "I am", options: ["I am", "you are", "he is", "we are"] },
];

export const sentencesPool = [
  { type: "build", english: "I am Maria", words: ["Soy", "María", "Yo", "es"], correct: ["Soy", "María"] },
  { type: "build", english: "The coffee", words: ["El", "café", "La", "es"], correct: ["El", "café"] },
  { type: "build", english: "A dog", words: ["Un", "perro", "Una", "el"], correct: ["Un", "perro"] },
  { type: "build", english: "You are here", words: ["Tú", "estás", "aquí", "eres", "allí"], correct: ["Tú", "estás", "aquí"] },
  { type: "build", english: "The house is big", words: ["La", "casa", "es", "grande", "pequeña", "El"], correct: ["La", "casa", "es", "grande"] },
  { type: "build", english: "I have a cat", words: ["Yo", "tengo", "un", "gato", "una", "perro"], correct: ["Yo", "tengo", "un", "gato"] },
  { type: "build", english: "Yes, tomorrow", words: ["Sí", "mañana", "No", "hoy"], correct: ["Sí", "mañana"] },
  { type: "build", english: "Good morning", words: ["Buenos", "días", "Buenas", "noches"], correct: ["Buenos", "días"] },
  { type: "build", english: "Thank you very much", words: ["Muchas", "gracias", "Mucho", "De", "nada"], correct: ["Muchas", "gracias"] },
  { type: "build", english: "Where is the bathroom?", words: ["¿Dónde", "está", "el", "baño?", "la", "casa"], correct: ["¿Dónde", "está", "el", "baño?"] },
];

// Helper function to generate a randomized lesson
export const generateLesson = (tinyWordCount = 7, sentenceCount = 5) => {
  const shuffledWords = [...tinyWordsPool].sort(() => Math.random() - 0.5).slice(0, tinyWordCount);
  const shuffledSentences = [...sentencesPool].sort(() => Math.random() - 0.5).slice(0, sentenceCount);
  
  // Combine and shuffle together
  const combined = [...shuffledWords, ...shuffledSentences].sort(() => Math.random() - 0.5);
  
  return combined;
};

// Stage configurations
// Stage configurations
export const spanishStages = {
  1: {
    name: "Character Set",
    description: "Learn the Spanish alphabet and special characters",
    requiredScore: 6,
    type: "sequential",
    exercises: characterStage.exercises
  },
  2: {
    name: "Basic Words",  // Changed name
    description: "Essential vocabulary",  // Changed description
    requiredScore: 7,
    type: "match",
    exercises: tinyWordsPool  // ADD THIS LINE - uses the pool you already defined above
  },
  3: {
    name: "Simple Sentences",  // Changed name
    description: "Practice building sentences",  // Changed description
    requiredScore: 5,
    type: "build",
    exercises: sentencesPool  // ADD THIS LINE - uses the pool you already defined above
  }
};