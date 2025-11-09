import React, { useState, useRef } from 'react';
import { Star, X, Check } from 'lucide-react';
// import { spanishStages } from '../../data/spanishData';
import CharacterExercise from '../CharacterExercise';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const BasicsLesson = ({ onBack, languageData, subLesson, practice, stageKey }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const draggedItemRef = useRef(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  // Get the correct stage based on subLesson type
  const actualStageKey = stageKey || 1; // Default to 1 for single letters
  const stageData = languageData[actualStageKey];
  
  console.log('BasicsLesson - stageKey:', actualStageKey);
  console.log('BasicsLesson - stageData:', stageData);
  console.log('BasicsLesson - practice:', practice);
  
  // Get exercises from the nested structure
  let exercises;
  if (stageData?.subLessons && practice) {
    exercises = stageData.subLessons[practice]?.exercises || [];
  } else {
    // Fallback for old structure
    exercises = stageData?.exercises || [];
  }

  console.log('BasicsLesson - exercises:', exercises);

  if (!exercises || exercises.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>No exercises found</div>
      </div>
    );
  }

  const exercise = exercises[currentExercise];
  
  // Rest of your code...
  const handleDragStart = (e, item) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  // ... rest of your code

const handleDrop = (e) => {
  console.log('handleDrop called, draggedItemRef.current:', draggedItemRef.current);
  e.preventDefault();
  setDropZoneActive(false);
  
  if (!draggedItemRef.current) {
    console.log('Early return: no draggedItemRef');
    return;
  }

  console.log('Setting feedback to correct');
  // Character exercises are always correct (exposure-based learning)
  setFeedback("correct");
  setScore(prevScore => prevScore + 1);

  setTimeout(() => {
    setCurrentExercise(prevExercise => {
      console.log('Timeout fired. prevExercise:', prevExercise, 'exercises.length:', exercises.length);
      if (prevExercise < exercises.length - 1) {
        console.log('Advancing to next exercise:', prevExercise + 1);
        return prevExercise + 1;
      } else {
        // Lesson complete!
        setScore(finalScore => {
          alert(`Lesson complete! Score: ${finalScore}/${exercises.length}`);
          return finalScore;
        });
        onBack();
        return prevExercise;
      }
    });
    setFeedback(null);
    draggedItemRef.current = null;
  }, 1500);
};

  return (
    <div className={`fixed inset-0 ${theme.bg} overflow-hidden`} style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
          background-color: #ef4444 !important;
        }
      `}</style>

      <ThemeToggle />

      {/* Back button - theme aware */}
      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button}`}
      >
        ← Back
      </button>

      {/* Header - theme aware text */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
        <h1 className={`text-2xl font-bold ${theme.text}`}>Basics</h1>
      </div>

      {/* Progress bar - theme aware */}
      <div className="fixed top-16 left-0 right-0 z-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className={`font-semibold ${theme.textSecondary}`}>
              {currentExercise + 1}/{exercises.length}
            </span>
            <span className={`font-semibold ${theme.accent}`}>
              <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{stageData.requiredScore}
            </span>
            {/* <span className="font-semibold text-red-400">
              ❌ {strikes}/3
            </span> */}
          </div>
          <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
            <div
              className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content area - full screen */}
      <div className="absolute inset-0 pt-32 pb-8">
        <CharacterExercise 
          exercise={exercise}
          dropZoneActive={dropZoneActive}
          setDropZoneActive={setDropZoneActive}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          draggedItemRef={draggedItemRef}
        />
      </div>

      {/* Feedback - fixed bottom */}
      {feedback && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-1.5 py-1 rounded-xl shadow-lg ${
          feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {feedback === "correct" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span className="font-bold text-xl">
              {feedback === "correct" ? "Correct!" : "Try again!"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicsLesson;


