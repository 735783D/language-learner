import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LanguageHub from './components/hubs/LanguageHub';
import Hub from './components/hubs/Hub';
import BasicsHub from './components/hubs/BasicsHub';
import SingleLettersHub from './components/hubs/SingleLettersHub';
import TwoLetterHub from './components/hubs/TwoLetterHub';
import ThreeLetterHub from './components/hubs/ThreeLetterHub';
import VerbsHub from './components/hubs/VerbsHub';
import GrammarHub from './components/hubs/GrammarHub';
import StoriesHub from './components/hubs/StoriesHub';
import WordsHub from './components/hubs/WordsHub';
import AnimalsHub from './components/hubs/sub_hubs/AnimalsHub';
import BasicsLesson from './components/lessons/BasicsLesson';
import WordLesson from './components/lessons/WordLesson';
import SentencesLesson from './components/lessons/SentencesLesson';
import StoryLesson from './components/lessons/StoryLesson';
import InfinitivesLesson from './components/lessons/verbs/InfinitivesLesson';
import PresentTenseLesson from './components/lessons/verbs/PresentTenseLesson';
import FutureTenseLesson from './components/lessons/verbs/FutureTenseLesson';
import AudioMatchingExercise from './components/exercises_types/AudioMatchingExercise';
import { spanishStages } from './data/spanishData';
import { creekStages } from './data';
import { mvskokeStories } from './data/storyData';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubLesson, setSelectedSubLesson] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  // const [selectedVerbLesson, setSelectedVerbLesson] = useState(null);

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const handleBackToHub = () => {
    setSelectedLesson(null);
    setSelectedSubLesson(null);
    setSelectedPractice(null);
    setSelectedStory(null);
    // setSelectedVerbLesson(null);
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
    // setSelectedVerbLesson(null);
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

// Words lesson selected but no practice chosen - show WordsHub
if (selectedLesson === 2 && !selectedPractice) {
  return (
    <ThemeProvider>
      <WordsHub
        onSelectPractice={setSelectedPractice}
        onBack={handleBackToHub}
        languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
      />
    </ThemeProvider>
  );
}

// ========================================
// ANIMALS SUB-HUB (within Words) - CHECK THIS FIRST!
// ========================================

// Animals selected but no subcategory - show AnimalsHub
if (selectedLesson === 2 && selectedPractice === 'animals' && !selectedSubLesson) {
  return (
    <ThemeProvider>
      <AnimalsHub
        onSelectPractice={setSelectedSubLesson}
        onBack={() => setSelectedPractice(null)}
        languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
      />
    </ThemeProvider>
  );
}

// Animal subcategory selected (e.g., "farm-learn")
if (selectedLesson === 2 && selectedPractice === 'animals' && selectedSubLesson) {
  const [subcategory, practiceType] = selectedSubLesson.split('-');
  
  return (
    <ThemeProvider>
      <WordLesson 
        onBack={() => setSelectedSubLesson(null)}
        languageData={getLanguageData()}
        category={`animals-${subcategory}`}
        practiceType={practiceType}
      />
    </ThemeProvider>
  );
}

// OTHER Words categories (colors, family, etc.)
if (selectedLesson === 2 && selectedPractice) {
  const [category, practiceType] = selectedPractice.split('-');
  
  return (
    <ThemeProvider>
      <WordLesson 
        onBack={() => setSelectedPractice(null)}
        languageData={getLanguageData()}
        category={category}
        practiceType={practiceType}
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
// Replace the VERBS LESSON (Lesson 4) ROUTING section in your App.js with this:

// ========================================
// VERBS LESSON (Lesson 4) ROUTING
// ========================================

// Verbs lesson selected but no practice chosen - show VerbsHub
if (selectedLesson === 4 && !selectedPractice) {
  return (
    <ThemeProvider>
      <VerbsHub
        onSelectPractice={setSelectedPractice}
        onBack={handleBackToHub}
        languageName={selectedLanguage === 'spanish' ? 'Spanish' : 'Creek'}
      />
    </ThemeProvider>
  );
}

// Infinitives selected
if (selectedLesson === 4 && selectedPractice?.startsWith('infinitives')) {
  const practiceType = selectedPractice.split('-')[1]; // 'learn' or 'practice'
  
  return (
    <ThemeProvider>
      <InfinitivesLesson
        onBack={() => setSelectedPractice(null)}
        languageData={getLanguageData()}
        practiceType={practiceType}
      />
    </ThemeProvider>
  );
}

// Present Tense selected
if (selectedLesson === 4 && selectedPractice?.startsWith('present')) {
  const practiceType = selectedPractice.split('-')[1]; // 'learn' or 'practice'
  
  return (
    <ThemeProvider>
      <PresentTenseLesson
        onBack={() => setSelectedPractice(null)}
        languageData={getLanguageData()}
        practiceType={practiceType}
      />
    </ThemeProvider>
  );
}

// Future Tense selected
if (selectedLesson === 4 && selectedPractice?.startsWith('future')) {
  const practiceType = selectedPractice.split('-')[1]; // 'learn' or 'practice'
  
  return (
    <ThemeProvider>
      <FutureTenseLesson
        onBack={() => setSelectedPractice(null)}
        languageData={getLanguageData()}
        practiceType={practiceType}
      />
    </ThemeProvider>
  );
}

//*******************WORKING ON THIS*******************
  // // Past tense - coming soon
  // if (selectedLesson === 4 && selectedVerbLesson === 'past') {
  //   return (
  //     <ThemeProvider>
  //       <div className={`fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center`}>
  //         <div className="text-center space-y-4">
  //           <div className="text-6xl">🚧</div>
  //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Coming Soon!</h2>
  //           <p className="text-xl text-gray-600 dark:text-gray-400">Past tense lessons are in development</p>
  //           <button
  //             onClick={() => setSelectedVerbLesson(null)}
  //             className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold"
  //           >
  //             Back to Verbs
  //           </button>
  //         </div>
  //       </div>
  //     </ThemeProvider>
  //   );
  // }
//*******************WORKING ON THIS*******************

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