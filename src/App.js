import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LanguageHub from './components/LanguageHub';
import Hub from './components/Hub';
import BasicsLesson from './components/lessons/BasicsLesson';
import WordLesson from './components/lessons/WordLesson';
import SentencesLesson from './components/lessons/SentencesLesson';
import WritingLesson from './components/lessons/WritingLesson';
import { spanishStages } from './data/spanishData';
import { creekStages } from './data/creekData'; // Uncomment when you create this

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const handleBackToHub = () => {
    setSelectedLesson(null);
  };

  const handleBackToLanguageHub = () => {
    setSelectedLanguage(null);
    setSelectedLesson(null);
  };

  // Get the correct language data
  const getLanguageData = () => {
    if (selectedLanguage === 'spanish') {
      return spanishStages;
    }
    if (selectedLanguage === 'creek') {
      return creekStages;
    }
    return spanishStages; // default fallback
  };

  // If no language selected, show language hub
  if (!selectedLanguage) {
    return (
      <ThemeProvider>
        <LanguageHub onSelectLanguage={handleLanguageSelect} />
      </ThemeProvider>
    );
  }

  // If no lesson selected, show hub
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

  // Route to appropriate lesson with correct data
  const renderLesson = () => {
    const languageData = getLanguageData();
    
    switch(selectedLesson) {
      case 1:
        return <BasicsLesson onBack={handleBackToHub} languageData={languageData} />;
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
// import Hub from './components/Hub';
// import BasicsLesson from './components/lessons/BasicsLesson';
// import WordsLesson from './components/lessons/WordLesson';
// import SentencesLesson from './components/lessons/SentencesLesson';
// import WritingLesson from './components/lessons/WritingLesson';

// const SpanishLearningApp = () => {
//   const [selectedLesson, setSelectedLesson] = useState(null);

//   const handleBackToHub = () => {
//     setSelectedLesson(null);
//   };

//   // If no lesson selected, show hub
//   if (!selectedLesson) {
//     return <Hub onSelectLesson={setSelectedLesson} languageName="Spanish" />;
//   }

//   // Route to appropriate lesson
//   switch(selectedLesson) {
//     case 1:
//       return <BasicsLesson onBack={handleBackToHub} />;
//     case 2:
//       return <WordsLesson onBack={handleBackToHub} />;
//     case 3:
//       return <SentencesLesson onBack={handleBackToHub} />;
//     case 4:
//       return <WritingLesson onBack={handleBackToHub} />;
//     default:
//       return <Hub onSelectLesson={setSelectedLesson} languageName="Spanish" />;
//   }
// };

// export default SpanishLearningApp;