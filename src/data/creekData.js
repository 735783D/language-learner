// src/data/creekData.js

export const creekStages = {
  1: {
    name: "Character Set",
    description: "Learn the Mvskoke alphabet and sounds",
    requiredScore: 6,
    type: "sequential",
    exercises: [
      {
        char: "a",
        sound: "ah",
        example: "afa",
        translation: "dog"
      },
      {
        char: "e",
        sound: "eh",
        example: "eco",
        translation: "deer"
      },
      {
        char: "i",
        sound: "ee",
        example: "ifa",
        translation: "dog (his/her)"
      },
      {
        char: "o",
        sound: "oh",
        example: "oce",
        translation: "hickory nut"
      },
      {
        char: "u",
        sound: "oo",
        example: "uewv",
        translation: "water"
      },
      {
        char: "v",
        sound: "uh",
        example: "vpe",
        translation: "food"
      }
    ]
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
        correct: ["Hensci"]  // ADDED THIS - the correct answer(s)
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
  }
};