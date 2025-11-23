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
import { spanishStages } from './data/spanishData';
import { creekStages } from './data/creekData';
import TwoLetterHub from './components/TwoLetterHub';
import ThreeLetterHub from './components/ThreeLetterHub';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubLesson, setSelectedSubLesson] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);

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

  const getLanguageData = () => {
    if (selectedLanguage === 'spanish') {
      return spanishStages;
    }
    if (selectedLanguage === 'creek') {
      return creekStages;
    }
    return spanishStages;
  };

  if (!selectedLanguage) {
    return (
      <ThemeProvider>
        <LanguageHub onSelectLanguage={handleLanguageSelect} />
      </ThemeProvider>
    );
  }

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

  // ✅ FIXED: Check if it's an audio practice for Single Letters
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

  // ✅ FIXED: Check if it's an audio practice for Two-Letter or Three-Letter
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