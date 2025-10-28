import React, { useState, useRef, useMemo } from 'react';
import { Star, X, Check } from 'lucide-react';
import { sentencesPool } from '../../data/spanishData';
import BuildExercise from '../BuildExercise';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const SentencesLesson = ({ onBack }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const draggedItemRef = useRef(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);

  // Generate a random set of sentence exercises
  const exercises = useMemo(() => {
    return [...sentencesPool].sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);

  const exercise = exercises[currentExercise];
  const requiredScore = 6; // Need 6 out of 8 to pass

  const handleBuildComplete = (isCorrect) => {
    if (isCorrect) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("incorrect");
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      
      if (newStrikes >= 3) {
        setTimeout(() => {
          alert('Three strikes! Restarting lesson.');
          setCurrentExercise(0);
          setScore(0);
          setStrikes(0);
          setSelectedWords([]);
        }, 1500);
        return;
      }
    }

    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else {
        // Lesson complete
        const finalScore = score + (isCorrect ? 1 : 0);
        if (finalScore >= requiredScore) {
          alert(`Lesson complete! You passed with ${finalScore}/${exercises.length}`);
        } else {
          alert(`Lesson complete. You got ${finalScore}/${exercises.length}. Need ${requiredScore} to pass. Try again!`);
        }
        onBack();
      }
      setFeedback(null);
      setSelectedWords([]);
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
      <h1 className={`text-2xl font-bold ${theme.text}`}>Sentences</h1>
    </div>

    {/* Progress bar - theme aware */}
    <div className="fixed top-16 left-0 right-0 z-40 px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className={`font-semibold ${theme.textSecondary}`}>
            {currentExercise + 1}/{exercises.length}
          </span>
          <span className={`font-semibold ${theme.accent}`}>
            <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{requiredScore}
          </span>
          <span className="font-semibold text-red-400">
            ❌ {strikes}/3
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

    {/* Main content area - full screen */}
    <div className="absolute inset-0 pt-32 pb-8 px-8">
      <div className="h-full max-w-6xl mx-auto">
        <BuildExercise 
          exercise={exercise}
          feedback={feedback}
          selectedWords={selectedWords}
          setSelectedWords={setSelectedWords}
          draggedItemRef={draggedItemRef}
          dropZoneActive={dropZoneActive}
          setDropZoneActive={setDropZoneActive}
          onComplete={handleBuildComplete}
        />
      </div>
    </div>

    {/* Feedback - fixed bottom */}
    {feedback && (
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
        feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}>
        <div className="flex items-center gap-2">
          {feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
          <span className="font-bold text-xl">
            {feedback === "correct" ? "¡Correcto!" : "Try again!"}
          </span>
        </div>
      </div>
    )}
  </div>
);
};

export default SentencesLesson;