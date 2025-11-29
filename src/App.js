import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LanguageHub from './components/LanguageHub';
import Hub from './components/Hub';
import BasicsHub from './components/BasicsHub';
import SingleLettersHub from './components/SingleLettersHub';
import BasicsLesson from './components/lessons/BasicsLesson';
import WordLesson from './components/lessons/WordLesson';
import SentencesLesson from './components/lessons/SentencesLesson';
import WritingLesson from './components/lessons/WritingLesson';
import AudioMatchingExercise from './components/AudioMatchingExercise';
import StoryLesson from './components/lessons/StoryLesson';
import StoriesHub from './components/StoriesHub';
import { spanishStages } from './data/spanishData';
import { creekStages } from './data/creekData';
import { mvskokeStories } from './data/storyData';
import TwoLetterHub from './components/TwoLetterHub';
import ThreeLetterHub from './components/ThreeLetterHub';
import VerbsHub from './components/VerbsHub';
import GrammarHub from './components/GrammarHub';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubLesson, setSelectedSubLesson] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const handleBackToHub = () => {
    setSelectedLesson(null);
    setSelectedSubLesson(null);
    setSelectedPractice(null);
    setSelectedStory(null);
  };

  const handleBackToBasicsHub = () => {
    setSelectedSubLesson(null);
    setSelectedPractice(null);
  };

  const handleBackToSingleLettersHub = () => {
    setSelectedPractice(null);
  };

  const handleBackToLanguageHub = () => {
    setSelectedLanguage(null);
    setSelectedLesson(null);
    setSelectedSubLesson(null);
    setSelectedPractice(null);
    setSelectedStory(null);
  };

  const getLanguageData = () => {
    if (selectedLanguage === 'spanish') {
      return spanishStages;
    }
    if (selectedLanguage === 'creek') {
      return creekStages;
    }
    return spanishStages;
  };

  // No language selected - show language hub
  if (!selectedLanguage) {
    return (
      <ThemeProvider>
        <LanguageHub onSelectLanguage={handleLanguageSelect} />
      </ThemeProvider>
    );
  }

  // No lesson selected - show main hub
  if (!selectedLesson) {
    return (
      <ThemeProvider>
        <Hub 
          onSelectLesson={setSelectedLesson} 
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
          languageData={getLanguageData()}
          onBack={handleBackToLanguageHub}
        />
      </ThemeProvider>
    );
  }

  // ========================================
  // BASICS LESSON (Lesson 1) ROUTING
  // ========================================
  
  // Basics lesson selected but no sub-lesson - show BasicsHub
  if (selectedLesson === 1 && !selectedSubLesson) {
    return (
      <ThemeProvider>
        <BasicsHub
          onSelectSubLesson={setSelectedSubLesson}
          onBack={handleBackToHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }

  // Single Letters selected but no practice type - show SingleLettersHub
  if (selectedLesson === 1 && selectedSubLesson === 'single' && !selectedPractice) {
    return (
      <ThemeProvider>
        <SingleLettersHub
          onSelectPractice={setSelectedPractice}
          onBack={handleBackToBasicsHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }

  // Single Letters with practice selected
  if (selectedLesson === 1 && selectedSubLesson === 'single' && selectedPractice) {
    const languageData = getLanguageData();
    const isAudioPractice = selectedPractice.endsWith('-audio');
    
    if (isAudioPractice) {
      return (
        <ThemeProvider>
          <AudioMatchingExercise
            onBack={handleBackToSingleLettersHub}
            languageData={languageData}
            subLesson={selectedSubLesson}
            practice={selectedPractice}
            stageKey={1}
          />
        </ThemeProvider>
      );
    }
    
    return (
      <ThemeProvider>
        <BasicsLesson 
          onBack={handleBackToSingleLettersHub} 
          languageData={languageData}
          subLesson={selectedSubLesson}
          practice={selectedPractice}
        />
      </ThemeProvider>
    );
  }

  // Two-Letter Sounds selected but no practice type - show TwoLetterHub
  if (selectedLesson === 1 && selectedSubLesson === 'two-letter' && !selectedPractice) {
    return (
      <ThemeProvider>
        <TwoLetterHub
          onSelectPractice={setSelectedPractice}
          onBack={handleBackToBasicsHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }

  // Three-Letter Sounds selected but no practice type - show ThreeLetterHub
  if (selectedLesson === 1 && selectedSubLesson === 'three-letter' && !selectedPractice) {
    return (
      <ThemeProvider>
        <ThreeLetterHub
          onSelectPractice={setSelectedPractice}
          onBack={handleBackToBasicsHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }

  // Two-Letter or Three-Letter with practice selected
  if (selectedLesson === 1 && (selectedSubLesson === 'two-letter' || selectedSubLesson === 'three-letter') && selectedPractice) {
    const languageData = getLanguageData();
    const stageKey = selectedSubLesson === 'two-letter' ? '1b' : '1c';
    const isAudioPractice = selectedPractice.endsWith('-audio');
    
    if (isAudioPractice) {
      return (
        <ThemeProvider>
          <AudioMatchingExercise
            onBack={() => setSelectedPractice(null)}
            languageData={languageData}
            subLesson={selectedSubLesson}
            practice={selectedPractice}
            stageKey={stageKey}
          />
        </ThemeProvider>
      );
    }
    
    return (
      <ThemeProvider>
        <BasicsLesson 
          onBack={() => setSelectedPractice(null)} 
          languageData={languageData}
          subLesson={selectedSubLesson}
          practice={selectedPractice}
          stageKey={stageKey}
        />
      </ThemeProvider>
    );
  }

  // ========================================
  // WORDS LESSON (Lesson 2) ROUTING
  // ========================================
  
  if (selectedLesson === 2) {
    return (
      <ThemeProvider>
        <WordLesson 
          onBack={handleBackToHub} 
          languageData={getLanguageData()} 
        />
      </ThemeProvider>
    );
  }

  // ========================================
  // SENTENCES LESSON (Lesson 3) ROUTING
  // ========================================
  
  if (selectedLesson === 3) {
    return (
      <ThemeProvider>
        <SentencesLesson 
          onBack={handleBackToHub} 
          languageData={getLanguageData()} 
        />
      </ThemeProvider>
    );
  }

  // ========================================
  // WRITING LESSON (Lesson 4) ROUTING
  // ========================================
  
  // if (selectedLesson === 4) {
  //   return (
  //     <ThemeProvider>
  //       <WritingLesson 
  //         onBack={handleBackToHub} 
  //       />
  //     </ThemeProvider>
  //   );
  // }
  // Verbs lesson (4)
  if (selectedLesson === 4) {
    return (
      <ThemeProvider>
        <VerbsHub
          onSelectSubLesson={setSelectedSubLesson}
          onBack={handleBackToHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }

  // Grammar lesson (5)
  if (selectedLesson === 5) {
    return (
      <ThemeProvider>
        <GrammarHub
          onSelectSubLesson={setSelectedSubLesson}
          onBack={handleBackToHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }
  // ========================================
  // STORIES LESSON (Lesson 6) ROUTING
  // ========================================
  
  // Stories lesson selected but no story chosen - show StoriesHub
  if (selectedLesson === 6 && !selectedStory) {
    return (
      <ThemeProvider>
        <StoriesHub
          onSelectStory={setSelectedStory}
          onBack={handleBackToHub}
          languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        />
      </ThemeProvider>
    );
  }

  // Story selected - show StoryLesson
  if (selectedLesson === 6 && selectedStory) {
    const story = mvskokeStories.find(s => s.id === selectedStory);
    
    return (
      <ThemeProvider>
        <StoryLesson
          onBack={() => setSelectedStory(null)}
          story={story}
          languageData={getLanguageData()}
        />
      </ThemeProvider>
    );
  }

  // ========================================
  // FALLBACK - Should never reach here
  // ========================================
  
  return (
    <ThemeProvider>
      <Hub 
        onSelectLesson={setSelectedLesson} 
        languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
        languageData={getLanguageData()}
        onBack={handleBackToLanguageHub}
      />
    </ThemeProvider>
  );
};

export default App;



// import React, { useState } from 'react';
// import { ThemeProvider } from './contexts/ThemeContext';
// import LanguageHub from './components/LanguageHub';
// import Hub from './components/Hub';
// import BasicsHub from './components/BasicsHub';
// import SingleLettersHub from './components/SingleLettersHub';
// import BasicsLesson from './components/lessons/BasicsLesson';
// import WordLesson from './components/lessons/WordLesson';
// import SentencesLesson from './components/lessons/SentencesLesson';
// import WritingLesson from './components/lessons/WritingLesson';
// import AudioMatchingExercise from './components/AudioMatchingExercise';
// import { spanishStages } from './data/spanishData';
// import { creekStages } from './data/creekData';
// import TwoLetterHub from './components/TwoLetterHub';
// import ThreeLetterHub from './components/ThreeLetterHub';
// import StoryLesson from './components/lessons/StoryLesson';
// import StoriesHub from './components/StoriesHub';
// import { mvskokeStories } from './data/storyData';

// const App = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [selectedSubLesson, setSelectedSubLesson] = useState(null);
//   const [selectedPractice, setSelectedPractice] = useState(null);
//   const [selectedStory, setSelectedStory] = useState(null);


//   const handleLanguageSelect = (languageId) => {
//     setSelectedLanguage(languageId);
//   };

//   const handleBackToHub = () => {
//     setSelectedLesson(null);
//     setSelectedSubLesson(null);
//     setSelectedPractice(null);
//     setSelectedStory(null); // ADD THIS LINE

//   };

//   const handleBackToBasicsHub = () => {
//     setSelectedSubLesson(null);
//     setSelectedPractice(null);
//   };

//   const handleBackToSingleLettersHub = () => {
//     setSelectedPractice(null);
//   };

//   const handleBackToLanguageHub = () => {
//     setSelectedLanguage(null);
//     setSelectedLesson(null);
//     setSelectedSubLesson(null);
//     setSelectedPractice(null);
//   };

//   const getLanguageData = () => {
//     if (selectedLanguage === 'spanish') {
//       return spanishStages;
//     }
//     if (selectedLanguage === 'creek') {
//       return creekStages;
//     }
//     return spanishStages;
//   };

//   if (!selectedLanguage) {
//     return (
//       <ThemeProvider>
//         <LanguageHub onSelectLanguage={handleLanguageSelect} />
//       </ThemeProvider>
//     );
//   }

//   if (!selectedLesson) {
//     return (
//       <ThemeProvider>
//         <Hub 
//           onSelectLesson={setSelectedLesson} 
//           languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//           languageData={getLanguageData()}
//           onBack={handleBackToLanguageHub}
//         />
//       </ThemeProvider>
//     );
//   }

//   if (selectedLesson === 1 && !selectedSubLesson) {
//     return (
//       <ThemeProvider>
//         <BasicsHub
//           onSelectSubLesson={setSelectedSubLesson}
//           onBack={handleBackToHub}
//           languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//         />
//       </ThemeProvider>
//     );
//   }

//   if (selectedLesson === 1 && selectedSubLesson === 'single' && !selectedPractice) {
//     return (
//       <ThemeProvider>
//         <SingleLettersHub
//           onSelectPractice={setSelectedPractice}
//           onBack={handleBackToBasicsHub}
//           languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//         />
//       </ThemeProvider>
//     );
//   }

//   // ✅ FIXED: Check if it's an audio practice for Single Letters
//   if (selectedLesson === 1 && selectedSubLesson === 'single' && selectedPractice) {
//     const languageData = getLanguageData();
//     const isAudioPractice = selectedPractice.endsWith('-audio');
    
//     if (isAudioPractice) {
//       return (
//         <ThemeProvider>
//           <AudioMatchingExercise
//             onBack={handleBackToSingleLettersHub}
//             languageData={languageData}
//             subLesson={selectedSubLesson}
//             practice={selectedPractice}
//             stageKey={1}
//           />
//         </ThemeProvider>
//       );
//     }
    
//     return (
//       <ThemeProvider>
//         <BasicsLesson 
//           onBack={handleBackToSingleLettersHub} 
//           languageData={languageData}
//           subLesson={selectedSubLesson}
//           practice={selectedPractice}
//         />
//       </ThemeProvider>
//     );
//   }

//   if (selectedLesson === 1 && selectedSubLesson === 'two-letter' && !selectedPractice) {
//     return (
//       <ThemeProvider>
//         <TwoLetterHub
//           onSelectPractice={setSelectedPractice}
//           onBack={handleBackToBasicsHub}
//           languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//         />
//       </ThemeProvider>
//     );
//   }

//   if (selectedLesson === 1 && selectedSubLesson === 'three-letter' && !selectedPractice) {
//     return (
//       <ThemeProvider>
//         <ThreeLetterHub
//           onSelectPractice={setSelectedPractice}
//           onBack={handleBackToBasicsHub}
//           languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//         />
//       </ThemeProvider>
//     );
//   }

//   // ✅ FIXED: Check if it's an audio practice for Two-Letter or Three-Letter
//   if (selectedLesson === 1 && (selectedSubLesson === 'two-letter' || selectedSubLesson === 'three-letter') && selectedPractice) {
//     const languageData = getLanguageData();
//     const stageKey = selectedSubLesson === 'two-letter' ? '1b' : '1c';
//     const isAudioPractice = selectedPractice.endsWith('-audio');
    
//     if (isAudioPractice) {
//       return (
//         <ThemeProvider>
//           <AudioMatchingExercise
//             onBack={() => setSelectedPractice(null)}
//             languageData={languageData}
//             subLesson={selectedSubLesson}
//             practice={selectedPractice}
//             stageKey={stageKey}
//           />
//         </ThemeProvider>
//       );
//     }
    
//     return (
//       <ThemeProvider>
//         <BasicsLesson 
//           onBack={() => setSelectedPractice(null)} 
//           languageData={languageData}
//           subLesson={selectedSubLesson}
//           practice={selectedPractice}
//           stageKey={stageKey}
//         />
//       </ThemeProvider>
//     );
//   }

//   // If Stories lesson selected but no story chosen, show StoriesHub
// if (selectedLesson === 6 && !selectedStory) {
//   return (
//     <ThemeProvider>
//       <StoriesHub
//         onSelectStory={setSelectedStory}
//         onBack={handleBackToHub}
//         languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//       />
//     </ThemeProvider>
//   );
// }

// // If story selected, show StoryLesson
// if (selectedLesson === 6 && selectedStory) {
//   const story = mvskokeStories.find(s => s.id === selectedStory);
  
//   return (
//     <ThemeProvider>
//       <StoryLesson
//         onBack={() => setSelectedStory(null)}
//         story={story}
//         languageData={getLanguageData()}
//       />
//     </ThemeProvider>
//   );
// }

//   const renderLesson = () => {
//     const languageData = getLanguageData();
    
//     switch(selectedLesson) {
//       case 2:
//         return <WordLesson onBack={handleBackToHub} languageData={languageData} />;
//       case 3:
//         return <SentencesLesson onBack={handleBackToHub} languageData={languageData} />;
//       case 4:
//         return <WritingLesson onBack={handleBackToHub} languageData={languageData} />;
//       default:
//         return (
//           <Hub 
//             onSelectLesson={setSelectedLesson} 
//             languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
//             languageData={getLanguageData()}
//             onBack={handleBackToLanguageHub}
//           />
//         );
//     }
//   };

//   return (
//     <ThemeProvider>
//       {renderLesson()}
//     </ThemeProvider>
//   );
// };

// export default App;