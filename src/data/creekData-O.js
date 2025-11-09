export const creekStages = {
  1: {
    name: "Character Set",
    description: "Learn the Mvskoke alphabet and sounds",
    requiredScore: 15, // Adjusted for more characters
    type: "sequential",
    exercises: [
      {
        char: "A",
        sound: "ah",
        example: "afke",
        translation: "as in afke, ayo",
        sound_file: "/language-learner/sounds/creek/A-ah.mp3"
      },
      {
        char: "C",
        sound: "che",
        example: "cesse",
        translation: "as in cesse, cvse, cahkepen",
        sound_file: "/language-learner/sounds/creek/C-che.mp3"
      },
      {
        char: "E",
        sound: "eeh",
        example: "elv",
        translation: "as in elv, eto, epuce",
        sound_file: "/language-learner/sounds/creek/E-eeh.mp3"
      },
      {
        char: "Ē",
        sound: "eh",
        example: "ētvlwv",
        translation: "as in ētvlwv, ēkvnv, ēpāken",
        sound_file: "/language-learner/sounds/creek/E-eh.mp3"
      },
      {
        char: "F",
        sound: "fe",
        example: "feke",
        translation: "as in feke, fvfev, fuswv",
        sound_file: "/language-learner/sounds/creek/F-fe.mp3"
      },
      {
        char: "H",
        sound: "he",
        example: "hēnci",
        translation: "as in hēnci, hvtke, hvmken",
        sound_file: "/language-learner/sounds/creek/H-he.mp3"
      },
      {
        char: "I",
        sound: "ay",
        example: "hiye",
        translation: "as in hiye, liketv, piketv",
        sound_file: "/language-learner/sounds/creek/I-ay.mp3"
      },
      {
        char: "K",
        sound: "ke",
        example: "ke",
        translation: "as in ke, kvco, kvpe",
        sound_file: "/language-learner/sounds/creek/K-ke.mp3"
      },
      {
        char: "L",
        sound: "le",
        example: "letke",
        translation: "as in letke, lucv, lvmhē",
        sound_file: "/language-learner/sounds/creek/L-le.mp3"
      },
      {
        char: "M",
        sound: "me",
        example: "mahe",
        translation: "as in mahe, mvto, mecvs",
        sound_file: "/language-learner/sounds/creek/M-me.mp3"
      },
      {
        char: "N",
        sound: "ne",
        example: "nacōme",
        translation: "as in nacōme, naken, nute",
        sound_file: "/language-learner/sounds/creek/N-ne.mp3"
      },
      {
        char: "O",
        sound: "oh",
        example: "opy",
        translation: "as in opy, onke, owv",
        sound_file: "/language-learner/sounds/creek/O-oh.mp3"
      },
      {
        char: "P",
        sound: "pe",
        example: "pvrko",
        translation: "as in pvrko, purke, pume",
        sound_file: "/language-learner/sounds/creek/P-pe.mp3"
      },
      {
        char: "R",
        sound: "thle",
        example: "rakko",
        translation: "as in rakko, re, rvro",
        sound_file: "/language-learner/sounds/creek/R-thle.mp3"
      },
      {
        char: "S",
        sound: "se",
        example: "sasakwv",
        translation: "as in sasakwv, avtv, sutv",
        sound_file: "/language-learner/sounds/creek/S-se-say.mp3"
      },
      {
        char: "T",
        sound: "te",
        example: "tenetke",
        translation: "as in tenetke, totolose, tulcemēn",
        sound_file: "/language-learner/sounds/creek/T-te.mp3"
      },
      {
        char: "U",
        sound: "ooh",
        example: "eulv",
        translation: "as in eulv, kute, pucasē",
        sound_file: "/language-learner/sounds/creek/U-ooh.mp3"
      },
      {
        char: "V",
        sound: "uh",
        example: "ovsē",
        translation: "as in ovsē, pvcē, vcē",
        sound_file: "/language-learner/sounds/creek/V-uh.mp3"
      },
      {
        char: "W",
        sound: "we",
        example: "wasko",
        translation: "as in wasko, wakv, weso",
        sound_file: "/language-learner/sounds/creek/W-we-way.mp3"
      },
      {
        char: "Y",
        sound: "ye",
        example: "yvhv",
        translation: "as in yvhv, yvfke, yvmvsv",
        sound_file: "/language-learner/sounds/creek/Y-ye-yu.mp3"
      }
    ]
  },
  // ... rest of your stages (2 and 3)
};

// Add to creekData.js

// Two-letter sound combinations
export const twoLetterSounds = [
  // C + Vowels
  { combo: "CA", sound: "cha", example: "cate", translation: "red", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/CA.mp3` },
  { combo: "CE", sound: "che", example: "ceko", translation: "house", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/CE.mp3` },
  { combo: "CI", sound: "chi", example: "cife", translation: "rabbit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/CI.mp3` },
  { combo: "CO", sound: "cho", example: "coko", translation: "field", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/CO.mp3` },
  { combo: "CU", sound: "chu", example: "cuko", translation: "den", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/CU.mp3` },
  { combo: "CV", sound: "chuh", example: "cvko", translation: "tiger", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/CV.mp3` },

  // F + Vowels
  { combo: "FA", sound: "fa", example: "fane", translation: "long ago", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/FA.mp3` },
  { combo: "FE", sound: "fe", example: "fekhe", translation: "heart", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/FE.mp3` },
  { combo: "FI", sound: "fi", example: "fine", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/FI.mp3` },
  { combo: "FO", sound: "fo", example: "foke", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/FO.mp3` },
  { combo: "FU", sound: "fu", example: "fuke", translation: "fire", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/FU.mp3` },
  { combo: "FV", sound: "fuh", example: "fvke", translation: "smoke", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/FV.mp3` },

  // K + Vowels
  { combo: "KA", sound: "ka", example: "kaco", translation: "tiger", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/KA.mp3` },
  { combo: "KE", sound: "ke", example: "kero", translation: "can", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/KE.mp3` },
  { combo: "KI", sound: "ki", example: "kico", translation: "mouse", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/KI.mp3` },
  { combo: "KO", sound: "ko", example: "koco", translation: "toward", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/KO.mp3` },
  { combo: "KU", sound: "ku", example: "kuce", translation: "muskrat", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/KU.mp3` },
  { combo: "KV", sound: "kuh", example: "kvco", translation: "tiger", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/KV.mp3` },

  // H + Vowels
  { combo: "HA", sound: "ha", example: "hako", translation: "crazy", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/HA.mp3` },
  { combo: "HE", sound: "he", example: "here", translation: "foot", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/HE.mp3` },
  { combo: "HI", sound: "hi", example: "hiye", translation: "go", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/HI.mp3` },
  { combo: "HO", sound: "ho", example: "hoce", translation: "yesterday", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/HO.mp3` },
  { combo: "HU", sound: "hu", example: "huce", translation: "ear", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/HU.mp3` },
  { combo: "HV", sound: "huh", example: "hvce", translation: "ear", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/HV.mp3` },

  // L + Vowels
  { combo: "LA", sound: "la", example: "lake", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/LA.mp3` },
  { combo: "LE", sound: "le", example: "leke", translation: "sit down", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/LE.mp3` },
  { combo: "LI", sound: "li", example: "like", translation: "sit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/LI.mp3` },
  { combo: "LO", sound: "lo", example: "loke", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/LO.mp3` },
  { combo: "LU", sound: "lu", example: "luke", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/LU.mp3` },
  { combo: "LV", sound: "luh", example: "lvke", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/LV.mp3` },

  // M + Vowels
  { combo: "MA", sound: "ma", example: "mahe", translation: "all", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/MA.mp3` },
  { combo: "ME", sound: "me", example: "meko", translation: "chief", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/ME.mp3` },
  { combo: "MI", sound: "mi", example: "mike", translation: "baby", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/MI.mp3` },
  { combo: "MO", sound: "mo", example: "moce", translation: "to sleep", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/MO.mp3` },
  { combo: "MU", sound: "mu", example: "muce", translation: "new", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/MU.mp3` },
  { combo: "MV", sound: "muh", example: "mvto", translation: "thank you", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/MV.mp3` },

  // N + Vowels
  { combo: "NA", sound: "na", example: "nake", translation: "thing", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/NA.mp3` },
  { combo: "NE", sound: "ne", example: "nere", translation: "come here", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/NE.mp3` },
  { combo: "NI", sound: "ni", example: "nike", translation: "give it", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/NI.mp3` },
  { combo: "NO", sound: "no", example: "nokce", translation: "bear", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/NO.mp3` },
  { combo: "NU", sound: "nu", example: "nuke", translation: "milk", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/NU.mp3` },
  { combo: "NV", sound: "nuh", example: "nvke", translation: "road", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/NV.mp3` },

  // P + Vowels
  { combo: "PA", sound: "pa", example: "pase", translation: "bread", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/PA.mp3` },
  { combo: "PE", sound: "pe", example: "peko", translation: "duck", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/PE.mp3` },
  { combo: "PI", sound: "pi", example: "pike", translation: "to fall", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/PI.mp3` },
  { combo: "PO", sound: "po", example: "poke", translation: "grandmother", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/PO.mp3` },
  { combo: "PU", sound: "pu", example: "puke", translation: "book", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/PU.mp3` },
  { combo: "PV", sound: "puh", example: "pvke", translation: "only", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/PV.mp3` },

  // R + Vowels
  { combo: "RA", sound: "tha", example: "rake", translation: "to get up", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/RA.mp3` },
  { combo: "RE", sound: "the", example: "reso", translation: "to smile", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/RE.mp3` },
  { combo: "RI", sound: "thi", example: "rike", translation: "to sing", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/RI.mp3` },
  { combo: "RO", sound: "tho", example: "roke", translation: "to sit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/RO.mp3` },
  { combo: "RU", sound: "thu", example: "ruke", translation: "to make", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/RU.mp3` },
  { combo: "RV", sound: "thuh", example: "rvfo", translation: "good", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/RV.mp3` },

  // S + Vowels
  { combo: "SA", sound: "sa", example: "sakha", translation: "hello", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/SA.mp3` },
  { combo: "SE", sound: "se", example: "seko", translation: "pig", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/SE.mp3` },
  { combo: "SI", sound: "si", example: "sike", translation: "acorn", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/SI.mp3` },
  { combo: "SO", sound: "so", example: "soke", translation: "bag", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/SO.mp3` },
  { combo: "SU", sound: "su", example: "suke", translation: "hog", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/SU.mp3` },
  { combo: "SV", sound: "suh", example: "svke", translation: "arrow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/SV.mp3` },

  // T + Vowels
  { combo: "TA", sound: "ta", example: "take", translation: "bed", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/TA.mp3` },
  { combo: "TE", sound: "te", example: "teko", translation: "leg", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/TE.mp3` },
  { combo: "TI", sound: "ti", example: "tike", translation: "ice", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/TI.mp3` },
  { combo: "TO", sound: "to", example: "toke", translation: "fire", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/TO.mp3` },
  { combo: "TU", sound: "tu", example: "tuke", translation: "stone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/TU.mp3` },
  { combo: "TV", sound: "tuh", example: "tvke", translation: "to break", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/TV.mp3` },

  // W + Vowels
  { combo: "WA", sound: "wa", example: "wake", translation: "calf", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/WA.mp3` },
  { combo: "WE", sound: "we", example: "weko", translation: "water", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/WE.mp3` },
  { combo: "WI", sound: "wi", example: "wike", translation: "to look", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/WI.mp3` },
  { combo: "WO", sound: "wo", example: "woke", translation: "raccoon", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/WO.mp3` },
  { combo: "WU", sound: "wu", example: "wuke", translation: "to stand", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/WU.mp3` },
  { combo: "WV", sound: "wuh", example: "wvke", translation: "to lie down", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/WV.mp3` },

  // Y + Vowels
  { combo: "YA", sound: "ya", example: "yace", translation: "buffalo", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/YA.mp3` },
  { combo: "YE", sound: "ye", example: "yeko", translation: "fox", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/YE.mp3` },
  { combo: "YI", sound: "yi", example: "yike", translation: "meat", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/YI.mp3` },
  { combo: "YO", sound: "yo", example: "yoke", translation: "there", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/YO.mp3` },
  { combo: "YU", sound: "yu", example: "yuke", translation: "yesterday", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/YU.mp3` },
  { combo: "YV", sound: "yuh", example: "yvke", translation: "to go", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/YV.mp3` },

  // ===== SECOND SECTION: Vowels + Consonants =====
  
  // A + Consonants
  { combo: "AF", sound: "af", example: "afke", translation: "dog", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AF.mp3` },
  { combo: "AK", sound: "ak", example: "akse", translation: "cow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AK.mp3` },
  { combo: "AL", sound: "al", example: "alke", translation: "doctor", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AL.mp3` },
  { combo: "AM", sound: "am", example: "amke", translation: "rain", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AM.mp3` },
  { combo: "AN", sound: "an", example: "anke", translation: "mouth", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AN.mp3` },
  { combo: "AP", sound: "ap", example: "apke", translation: "here", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AP.mp3` },
  { combo: "AS", sound: "as", example: "aske", translation: "dish", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AS.mp3` },
  { combo: "AT", sound: "at", example: "atke", translation: "plum", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/AT.mp3` },

  // E + Consonants
  { combo: "EF", sound: "ef", example: "efke", translation: "his dog", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/EF.mp3` },
  { combo: "EK", sound: "ek", example: "ekse", translation: "his cow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/EK.mp3` },
  { combo: "EL", sound: "el", example: "elke", translation: "to die", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/EL.mp3` },
  { combo: "EM", sound: "em", example: "emke", translation: "to give", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/EM.mp3` },
  { combo: "EN", sound: "en", example: "enke", translation: "his hand", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/EN.mp3` },
  { combo: "EP", sound: "ep", example: "epke", translation: "to eat", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/EP.mp3` },
  { combo: "ES", sound: "es", example: "eske", translation: "mother", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/ES.mp3` },
  { combo: "ET", sound: "et", example: "etke", translation: "his bed", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/ET.mp3` },

  // I + Consonants
  { combo: "IF", sound: "if", example: "ifke", translation: "his dog", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IF.mp3` },
  { combo: "IK", sound: "ik", example: "ikse", translation: "to drink", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IK.mp3` },
  { combo: "IL", sound: "il", example: "ilke", translation: "to kill", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IL.mp3` },
  { combo: "IM", sound: "im", example: "imke", translation: "his rain", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IM.mp3` },
  { combo: "IN", sound: "in", example: "inke", translation: "his mouth", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IN.mp3` },
  { combo: "IP", sound: "ip", example: "ipke", translation: "to be", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IP.mp3` },
  { combo: "IS", sound: "is", example: "iske", translation: "to drink", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IS.mp3` },
  { combo: "IT", sound: "it", example: "itke", translation: "his bed", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/IT.mp3` },

  // O + Consonants
  { combo: "OF", sound: "of", example: "ofke", translation: "hickory nut", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OF.mp3` },
  { combo: "OK", sound: "ok", example: "okse", translation: "water", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OK.mp3` },
  { combo: "OL", sound: "ol", example: "olke", translation: "to tell", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OL.mp3` },
  { combo: "OM", sound: "om", example: "omke", translation: "to be", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OM.mp3` },
  { combo: "ON", sound: "on", example: "onke", translation: "his", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/ON.mp3` },
  { combo: "OP", sound: "op", example: "opke", translation: "owl", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OP.mp3` },
  { combo: "OS", sound: "os", example: "oske", translation: "to be in", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OS.mp3` },
  { combo: "OT", sound: "ot", example: "otke", translation: "to go out", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/OT.mp3` },

  // U + Consonants
  { combo: "UF", sound: "uf", example: "ufke", translation: "to blow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UF.mp3` },
  { combo: "UK", sound: "uk", example: "ukse", translation: "box", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UK.mp3` },
  { combo: "UL", sound: "ul", example: "ulke", translation: "to tell", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UL.mp3` },
  { combo: "UM", sound: "um", example: "umke", translation: "to give", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UM.mp3` },
  { combo: "UN", sound: "un", example: "unke", translation: "to say", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UN.mp3` },
  { combo: "UP", sound: "up", example: "upke", translation: "to be sweet", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UP.mp3` },
  { combo: "US", sound: "us", example: "uske", translation: "to take", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/US.mp3` },
  { combo: "UT", sound: "ut", example: "utke", translation: "wood", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/UT.mp3` },

  // V + Consonants
  { combo: "VF", sound: "uhf", example: "vfke", translation: "to blow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VF.mp3` },
  { combo: "VK", sound: "uhk", example: "vkse", translation: "box", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VK.mp3` },
  { combo: "VL", sound: "uhl", example: "vlke", translation: "to tell", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VL.mp3` },
  { combo: "VM", sound: "uhm", example: "vmke", translation: "to be", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VM.mp3` },
  { combo: "VN", sound: "uhn", example: "vnke", translation: "his", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VN.mp3` },
  { combo: "VP", sound: "uhp", example: "vpke", translation: "to eat", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VP.mp3` },
  { combo: "VS", sound: "uhs", example: "vske", translation: "to be in", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VS.mp3` },
  { combo: "VT", sound: "uht", example: "vtke", translation: "to come from", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/two-letter/VT.mp3` },
];

// Three-letter sound combinations
export const threeLetterSounds = [
  // First column from PDF
  { combo: "SAK", sound: "sak", example: "sakha", translation: "hello", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SAK.mp3` },
  { combo: "LAK", sound: "lak", example: "lakhe", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LAK.mp3` },
  { combo: "MAS", sound: "mas", example: "maske", translation: "easy", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MAS.mp3` },
  { combo: "MAT", sound: "mat", example: "matke", translation: "to push", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MAT.mp3` },
  { combo: "HAK", sound: "hak", example: "hakle", translation: "listen", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HAK.mp3` },
  { combo: "HAS", sound: "has", example: "hasse", translation: "sun", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HAS.mp3` },
  { combo: "MAK", sound: "mak", example: "makke", translation: "if", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MAK.mp3` },
  { combo: "MAN", sound: "man", example: "manne", translation: "many", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MAN.mp3` },
  { combo: "HAL", sound: "hal", example: "halle", translation: "stump", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HAL.mp3` },
  { combo: "NAK", sound: "nak", example: "nakke", translation: "thing", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NAK.mp3` },
  { combo: "FAS", sound: "fas", example: "fasse", translation: "bird", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FAS.mp3` },
  { combo: "CAS", sound: "chas", example: "casse", translation: "pumpkin", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CAS.mp3` },

  // Second column from PDF
  { combo: "SEK", sound: "sek", example: "sekke", translation: "pig", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SEK.mp3` },
  { combo: "LEK", sound: "lek", example: "lekke", translation: "sit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LEK.mp3` },
  { combo: "MES", sound: "mes", example: "messe", translation: "to sweep", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MES.mp3` },
  { combo: "MET", sound: "met", example: "mette", translation: "to meet", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MET.mp3` },
  { combo: "HEK", sound: "hek", example: "hekke", translation: "to know", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HEK.mp3` },
  { combo: "HES", sound: "hes", example: "hesse", translation: "morning", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HES.mp3` },
  { combo: "MEK", sound: "mek", example: "mekke", translation: "chief", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MEK.mp3` },
  { combo: "MEN", sound: "men", example: "menne", translation: "to do", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MEN.mp3` },
  { combo: "HEL", sound: "hel", example: "helle", translation: "to die", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HEL.mp3` },
  { combo: "NEK", sound: "nek", example: "nekke", translation: "day", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NEK.mp3` },
  { combo: "FES", sound: "fes", example: "fesse", translation: "heart", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FES.mp3` },
  { combo: "CES", sound: "ches", example: "cesse", translation: "mouse", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CES.mp3` },

  // Third column from PDF
  { combo: "SIK", sound: "sik", example: "sikke", translation: "acorn", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SIK.mp3` },
  { combo: "LIK", sound: "lik", example: "likke", translation: "to sit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LIK.mp3` },
  { combo: "MIS", sound: "mis", example: "misse", translation: "baby", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MIS.mp3` },
  { combo: "MIT", sound: "mit", example: "mitte", translation: "with", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MIT.mp3` },
  { combo: "HIK", sound: "hik", example: "hikke", translation: "to go", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HIK.mp3` },
  { combo: "HIS", sound: "his", example: "hisse", translation: "to give", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HIS.mp3` },
  { combo: "MIK", sound: "mik", example: "mikke", translation: "baby", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MIK.mp3` },
  { combo: "MIN", sound: "min", example: "minne", translation: "to give", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MIN.mp3` },
  { combo: "HIL", sound: "hil", example: "hille", translation: "to know", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HIL.mp3` },
  { combo: "NIK", sound: "nik", example: "nikke", translation: "to give", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NIK.mp3` },
  { combo: "FIS", sound: "fis", example: "fisse", translation: "bird", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FIS.mp3` },
  { combo: "CIS", sound: "chis", example: "cisse", translation: "rabbit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CIS.mp3` },

  // Fourth column from PDF
  { combo: "SOK", sound: "sok", example: "sokke", translation: "bag", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SOK.mp3` },
  { combo: "LOK", sound: "lok", example: "lokke", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LOK.mp3` },
  { combo: "MOS", sound: "mos", example: "mosse", translation: "to sleep", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MOS.mp3` },
  { combo: "MOT", sound: "mot", example: "motte", translation: "to sleep", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MOT.mp3` },
  { combo: "HOK", sound: "hok", example: "hokke", translation: "woman", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HOK.mp3` },
  { combo: "HOS", sound: "hos", example: "hosse", translation: "yesterday", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HOS.mp3` },
  { combo: "MOK", sound: "mok", example: "mokke", translation: "to sleep", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MOK.mp3` },
  { combo: "MON", sound: "mon", example: "monne", translation: "to feel", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MON.mp3` },
  { combo: "HOL", sound: "hol", example: "holle", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HOL.mp3` },
  { combo: "NOK", sound: "nok", example: "nokke", translation: "bear", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NOK.mp3` },
  { combo: "FOS", sound: "fos", example: "fosse", translation: "bird", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FOS.mp3` },
  { combo: "COS", sound: "chos", example: "cosse", translation: "field", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/COS.mp3` },

  // Fifth column from PDF
  { combo: "SUK", sound: "suk", example: "sukke", translation: "hog", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SUK.mp3` },
  { combo: "LUK", sound: "luk", example: "lukke", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LUK.mp3` },
  { combo: "MUS", sound: "mus", example: "musse", translation: "new", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MUS.mp3` },
  { combo: "MUT", sound: "mut", example: "mutte", translation: "to be new", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MUT.mp3` },
  { combo: "HUK", sound: "huk", example: "hukke", translation: "to take", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HUK.mp3` },
  { combo: "HUS", sound: "hus", example: "husse", translation: "ear", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HUS.mp3` },
  { combo: "MUK", sound: "muk", example: "mukke", translation: "new", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MUK.mp3` },
  { combo: "MUN", sound: "mun", example: "munne", translation: "to be", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MUN.mp3` },
  { combo: "HUL", sound: "hul", example: "hulle", translation: "to write", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HUL.mp3` },
  { combo: "NUK", sound: "nuk", example: "nukke", translation: "milk", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NUK.mp3` },
  { combo: "FUS", sound: "fus", example: "fusse", translation: "bird", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FUS.mp3` },
  { combo: "CUS", sound: "chus", example: "cusse", translation: "muskrat", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CUS.mp3` },

  // Sixth column from PDF
  { combo: "SVK", sound: "suhk", example: "svkke", translation: "arrow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SVK.mp3` },
  { combo: "LVK", sound: "luhk", example: "lvkke", translation: "turtle", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LVK.mp3` },
  { combo: "MVS", sound: "muhs", example: "mvsse", translation: "to be good", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MVS.mp3` },
  { combo: "MVT", sound: "muht", example: "mvtte", translation: "good", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MVT.mp3` },
  { combo: "HVK", sound: "huhk", example: "hvkke", translation: "woman", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HVK.mp3` },
  { combo: "HVS", sound: "huhs", example: "hvsse", translation: "ear", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HVS.mp3` },
  { combo: "MVK", sound: "muhk", example: "mvkke", translation: "to be good", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MVK.mp3` },
  { combo: "MVN", sound: "muhn", example: "mvnne", translation: "to do", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MVN.mp3` },
  { combo: "HVL", sound: "huhl", example: "hvlle", translation: "to write", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HVL.mp3` },
  { combo: "NVK", sound: "nuhk", example: "nvkke", translation: "road", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NVK.mp3` },
  { combo: "FVS", sound: "fuhs", example: "fvsse", translation: "bird", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FVS.mp3` },
  { combo: "CVS", sound: "chuhs", example: "cvsse", translation: "tiger", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CVS.mp3` },

  // Right side section from PDF
  { combo: "SPA", sound: "spa", example: "spane", translation: "to split", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SPA.mp3` },
  { combo: "SLA", sound: "sla", example: "slane", translation: "to be slippery", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SLA.mp3` },
  { combo: "YEL", sound: "yel", example: "yelle", translation: "to be yellow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YEL.mp3` },
  { combo: "CEM", sound: "chem", example: "cemme", translation: "to cut", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CEM.mp3` },
  { combo: "PUN", sound: "pun", example: "punne", translation: "to be full", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/PUN.mp3` },
  { combo: "HVL", sound: "huhl", example: "hvlle", translation: "to write", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HVL2.mp3` },
  { combo: "WIK", sound: "wik", example: "wikke", translation: "to look", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/WIK.mp3` },
  { combo: "KET", sound: "ket", example: "kette", translation: "leg", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/KET.mp3` },
  { combo: "POK", sound: "pok", example: "pokke", translation: "grandmother", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/POK.mp3` },

  { combo: "SPE", sound: "spe", example: "spene", translation: "to be complete", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SPE.mp3` },
  { combo: "SLE", sound: "sle", example: "slene", translation: "to slide", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SLE.mp3` },
  { combo: "YES", sound: "yes", example: "yesse", translation: "yesterday", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YES.mp3` },
  { combo: "FEN", sound: "fen", example: "fenne", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FEN.mp3` },
  { combo: "LOF", sound: "lof", example: "loffe", translation: "to warm", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LOF.mp3` },
  { combo: "HVT", sound: "huht", example: "hvtte", translation: "white", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HVT.mp3` },
  { combo: "SAP", sound: "sap", example: "sappe", translation: "to be brave", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SAP.mp3` },
  { combo: "FVT", sound: "fuht", example: "fvtte", translation: "to blow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/FVT.mp3` },
  { combo: "LVF", sound: "luhf", example: "lvffe", translation: "to be warm", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/LVF.mp3` },

  { combo: "SPI", sound: "spi", example: "spine", translation: "to be narrow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SPI.mp3` },
  { combo: "SLI", sound: "sli", example: "sline", translation: "to slip", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SLI.mp3` },
  { combo: "YET", sound: "yet", example: "yette", translation: "to go", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YET.mp3` },
  { combo: "KUT", sound: "kut", example: "kutte", translation: "muskrat", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/KUT.mp3` },
  { combo: "YAT", sound: "yat", example: "yatte", translation: "there", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YAT.mp3` },
  { combo: "HOM", sound: "hom", example: "homme", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HOM.mp3` },
  { combo: "NET", sound: "net", example: "nette", translation: "day", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/NET.mp3` },
  { combo: "YEN", sound: "yen", example: "yenne", translation: "tobacco", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YEN.mp3` },
  { combo: "HOP", sound: "hop", example: "hoppe", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HOP.mp3` },

  { combo: "SPO", sound: "spo", example: "spone", translation: "to be spotted", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SPO.mp3` },
  { combo: "SLO", sound: "slo", example: "slone", translation: "to be slow", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SLO.mp3` },
  { combo: "YEC", sound: "yech", example: "yecce", translation: "fox", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YEC.mp3` },
  { combo: "MAH", sound: "mah", example: "mahhe", translation: "all", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/MAH.mp3` },
  { combo: "KAT", sound: "kat", example: "katte", translation: "tiger", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/KAT.mp3` },
  { combo: "CET", sound: "chet", example: "cette", translation: "snake", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CET.mp3` },
  { combo: "PEL", sound: "pel", example: "pelle", translation: "to peel", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/PEL.mp3` },
  { combo: "SKA", sound: "ska", example: "skane", translation: "to be scared", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SKA.mp3` },
  { combo: "TAT", sound: "tat", example: "tatte", translation: "father", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/TAT.mp3` },

  { combo: "SPU", sound: "spu", example: "spune", translation: "to be speckled", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SPU.mp3` },
  { combo: "SLU", sound: "slu", example: "slune", translation: "to slide", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SLU.mp3` },
  { combo: "YUN", sound: "yun", example: "yunne", translation: "to go", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YUN.mp3` },
  { combo: "CON", sound: "chon", example: "conne", translation: "skunk", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CON.mp3` },
  { combo: "RES", sound: "thes", example: "resse", translation: "to smile", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/RES.mp3` },
  { combo: "CAK", sound: "chak", example: "cakke", translation: "red", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CAK.mp3` },
  { combo: "PON", sound: "pon", example: "ponne", translation: "to put", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/PON.mp3` },
  { combo: "CEF", sound: "chef", example: "ceffe", translation: "rabbit", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/CEF.mp3` },

  { combo: "SPV", sound: "spuh", example: "spvne", translation: "to be spotted", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SPV.mp3` },
  { combo: "SLV", sound: "sluh", example: "slvne", translation: "to be slippery", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/SLV.mp3` },
  { combo: "YVK", sound: "yuhk", example: "yvkke", translation: "to go", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/YVK.mp3` },
  { combo: "HON", sound: "hon", example: "honne", translation: "bone", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/HON.mp3` },
  { combo: "VOL", sound: "vol", example: "volle", translation: "to fall", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/VOL.mp3` },
  { combo: "WAK", sound: "wak", example: "wakke", translation: "calf", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/WAK.mp3` },
  { combo: "RAH", sound: "thah", example: "rahhe", translation: "to get", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/RAH.mp3` },
  { combo: "RAK", sound: "thak", example: "rakke", translation: "to get up", sound_file: `${process.env.PUBLIC_URL}/sounds/creek/three-letter/RAK.mp3` },
];