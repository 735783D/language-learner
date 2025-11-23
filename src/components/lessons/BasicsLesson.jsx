import React, { useState, useRef } from 'react';
import { Star, X, Check } from 'lucide-react';
import CharacterExercise from '../CharacterExercise';
import CompletionModal from '../CompletionModal';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const BasicsLesson = ({ onBack, languageData, subLesson, practice, stageKey }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const draggedItemRef = useRef(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  // Get the correct stage based on subLesson type
  const actualStageKey = stageKey || 1;
  const stageData = languageData[actualStageKey];
  
  // Get exercises from the nested structure
  let exercises;
  if (stageData?.subLessons && practice) {
    exercises = stageData.subLessons[practice]?.exercises || [];
  } else {
    exercises = stageData?.exercises || [];
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>No exercises found</div>
      </div>
    );
  }

  const exercise = exercises[currentExercise];
  
  const handleDragStart = (e, item) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (!draggedItemRef.current) {
      return;
    }

    // Character exercises are always correct (exposure-based learning)
    setFeedback("correct");
    setScore(prevScore => prevScore + 1);

    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setFeedback(null);
        draggedItemRef.current = null;
      } else {
        // Lesson complete - show completion modal
        setShowCompletion(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setScore(0);
    setFeedback(null);
    setShowCompletion(false);
    draggedItemRef.current = null;
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

      {/* Back button */}
      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button}`}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
        <h1 className={`text-2xl font-bold ${theme.text}`}>Basics</h1>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className={`font-semibold ${theme.textSecondary}`}>
              {currentExercise + 1}/{exercises.length}
            </span>
            <span className={`font-semibold ${theme.accent}`}>
              <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{exercises.length}
            </span>
          </div>
          <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
            <div
              className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
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

      {/* Feedback */}
      {feedback && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-1.5 py-1 rounded-xl shadow-lg ${
          feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {feedback === "correct" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span className="font-bold text-xl">
              {feedback === "correct" ? "Mvto!" : "Try again!"}
            </span>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        score={score}
        totalQuestions={exercises.length}
        onRestart={handleRestart}
        onBack={onBack}
        lessonName="Character Practice"
      />
    </div>
  );
};

export default BasicsLesson;