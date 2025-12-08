// Mvskoke Pronouns
// Source: Dictionary (needs verification from official Mvskoke Language Program)

export const pronouns = {
  firstPerson: {
    singular: {
      standalone: "v'nē",
      prefix: "vm-",  // Common verb prefix form
      forms: ["v'nē", "vm"]
    },
    plural: {
      standalone: "pumē",
      prefix: "pum-",
      forms: ["pumē", "pum", "pu"]
    }
  },
  
  secondPerson: {
    singular: {
      standalone: "yē",
      prefix: "cem-",
      forms: ["yē", "ec", "ece", "cem'ē", "cem", "cen", "cē"]
      // Multiple forms likely due to:
      // - Different grammatical cases (subject vs object)
      // - Position before consonants vs vowels
      // - Formality levels
    }
  },
  
  thirdPerson: {
    singular: {
      standalone: "ēmē",
      prefix: "em-",
      forms: ["ēmē"]
    }
  }
};

// Simplified reference for exercises
export const pronounSimple = {
  "I": "v'nē",
  "you": "yē",
  "he/she/it": "ēmē",
  "we": "pumē"
};

// Note: These pronouns often appear as prefixes on verbs rather than standalone words
// Example: hompetv (to eat) becomes:
// - vm-hompis (I eat)
// - cem-hompetskes (you eat)
// - hompis (he/she eats)
// - pum-hompēs (we eat)