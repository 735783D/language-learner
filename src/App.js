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
import { spanishStages } from './data/spanishData';
import { creekStages } from './data/creekData';
import TwoLetterHub from './components/TwoLetterHub';
import ThreeLetterHub from './components/ThreeLetterHub';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubLesson, setSelectedSubLesson] = useState(null); // 'single', 'two-letter', 'three-letter'
  const [selectedPractice, setSelectedPractice] = useState(null); // 'full', 'firstHalf', 'secondHalf', etc.

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const handleBackToHub = () => {
    setSelectedLesson(null);
    setSelectedSubLesson(null);
    setSelectedPractice(null);
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
  };

  // Get the correct language data
  const getLanguageData = () => {
    if (selectedLanguage === 'spanish') {
      return spanishStages;
    }
    if (selectedLanguage === 'creek') {
      return creekStages;
    }
    return spanishStages;
  };

  // If no language selected, show language hub
  if (!selectedLanguage) {
    return (
      <ThemeProvider>
        <LanguageHub onSelectLanguage={handleLanguageSelect} />
      </ThemeProvider>
    );
  }

  // If no lesson selected, show main hub
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

  // If Basics lesson selected but no sub-lesson, show BasicsHub
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

  // If Single Letters selected but no practice type, show SingleLettersHub
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

  // If we have a practice selected for Single Letters, show the lesson
  if (selectedLesson === 1 && selectedSubLesson === 'single' && selectedPractice) {
    const languageData = getLanguageData();
    // const stageData = languageData[1];
    
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

// If Two-Letter Sounds selected but no practice type, show TwoLetterHub
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

  // If Three-Letter Sounds selected but no practice type, show ThreeLetterHub
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

// If we have a practice selected for Two-Letter or Three-Letter, show the lesson
if (selectedLesson === 1 && (selectedSubLesson === 'two-letter' || selectedSubLesson === 'three-letter') && selectedPractice) {
  const languageData = getLanguageData();
  const stageKey = selectedSubLesson === 'two-letter' ? '1b' : '1c';
  
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

  // Route to other lessons (Words, Sentences, Writing)
  const renderLesson = () => {
    const languageData = getLanguageData();
    
    switch(selectedLesson) {
      case 2:
        return <WordLesson onBack={handleBackToHub} languageData={languageData} />;
      case 3:
        return <SentencesLesson onBack={handleBackToHub} languageData={languageData} />;
      case 4:
        return <WritingLesson onBack={handleBackToHub} languageData={languageData} />;
      default:
        return (
          <Hub 
            onSelectLesson={setSelectedLesson} 
            languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
            languageData={getLanguageData()}
            onBack={handleBackToLanguageHub}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      {renderLesson()}
    </ThemeProvider>
  );
};

export default App;


// import React, { useState } from 'react';
// import { ThemeProvider } from './contexts/ThemeContext';
// import LanguageHub from './components/LanguageHub';
// import Hub from './components/Hub';
// import BasicsHub from './components/BasicsHub';
// import BasicsLesson from './components/lessons/BasicsLesson';
// import WordLesson from './components/lessons/WordLesson';
// import SentencesLesson from './components/lessons/SentencesLesson';
// import WritingLesson from './components/lessons/WritingLesson';
// import { spanishStages } from './data/spanishData';
// import { creekStages } from './data/creekData';

// const App = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [selectedSubLesson, setSelectedSubLesson] = useState(null);

//   const handleLanguageSelect = (languageId) => {
//     setSelectedLanguage(languageId);
//   };

//   const handleBackToHub = () => {
//     setSelectedLesson(null);
//     setSelectedSubLesson(null);
//   };

//   const handleBackToBasicsHub = () => {
//     setSelectedSubLesson(null);
//   };

//   const handleBackToLanguageHub = () => {
//     setSelectedLanguage(null);
//     setSelectedLesson(null);
//     setSelectedSubLesson(null);
//   };

//   // Get the correct language data
//   const getLanguageData = () => {
//     if (selectedLanguage === 'spanish') {
//       return spanishStages;
//     }
//     if (selectedLanguage === 'creek') {
//       return creekStages;
//     }
//     return spanishStages; // default fallback
//   };

//   // If no language selected, show language hub
//   if (!selectedLanguage) {
//     return (
//       <ThemeProvider>
//         <LanguageHub onSelectLanguage={handleLanguageSelect} />
//       </ThemeProvider>
//     );
//   }

//   // If no lesson selected, show hub
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

//   // If Basics lesson selected, show BasicsHub
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

//   // If in a Basics sub-lesson, show the appropriate lesson component
//   if (selectedLesson === 1 && selectedSubLesson) {
//     // For now, we'll route all sub-lessons to BasicsLesson
//     // Later we'll create separate components for each sub-lesson type
//     return (
//       <ThemeProvider>
//         <BasicsLesson 
//           onBack={handleBackToBasicsHub} 
//           languageData={getLanguageData()}
//           subLesson={selectedSubLesson}
//         />
//       </ThemeProvider>
//     );
//   }

//   // Route to other lessons
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
