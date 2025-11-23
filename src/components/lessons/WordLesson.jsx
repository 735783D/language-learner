import React, { useState, useRef, useMemo } from 'react';
import { Star, X, Check } from 'lucide-react';
import MatchExercise from '../MatchExercise';
import CompletionModal from '../CompletionModal';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const WordsLesson = ({ onBack, languageData }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const draggedItemRef = useRef(null);
  
  const stageData = languageData[2];

  // Generate a random set of word exercises from language data
  const exercises = useMemo(() => {
    if (!stageData?.exercises) return [];
    return [...stageData.exercises].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [stageData]);

  const exercise = exercises[currentExercise];
  const requiredScore = stageData?.requiredScore || 7;

  const handleDragStart = (e, item) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e, targetAnswer = null) => {
    e.preventDefault();
    
    if (!draggedItemRef.current) return;

    let answersMatch = false;

    if (targetAnswer) {
      const translationParts = exercise.translation.toLowerCase().split(/[/,]/);
      answersMatch = translationParts.some(part => part.trim() === targetAnswer.toLowerCase());
    }

    if (answersMatch) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("incorrect");
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      
      if (newStrikes >= 3) {
        setTimeout(() => {
          setShowFailure(true);
        }, 1500);
        return;
      }
    }

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
    setStrikes(0);
    setFeedback(null);
    setShowCompletion(false);
    setShowFailure(false);
    draggedItemRef.current = null;
  };

  const handleFailureRestart = () => {
    setCurrentExercise(0);
    setScore(0);
    setStrikes(0);
    setFeedback(null);
    setShowFailure(false);
    draggedItemRef.current = null;
  };

  // Three Strikes Failure Modal
  if (showFailure) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center p-8 z-50`}>
        <div className={`${theme.card} rounded-3xl p-12 max-w-2xl w-full shadow-2xl text-center space-y-8`}>
          <div className="text-8xl">😔</div>
          
          <div>
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
              Three Strikes!
            </h1>
            <p className={`text-xl ${theme.textSecondary}`}>
              Don't give up - practice makes perfect!
            </p>
          </div>

          <div className={`${theme.card} border-4 border-red-500 rounded-2xl p-8`}>
            <div className="text-6xl font-bold mb-2 text-red-500">
              ❌ ❌ ❌
            </div>
            <div className={`text-2xl ${theme.textSecondary}`}>
              {score} / {exercises.length} Correct
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleFailureRestart}
              className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.button} hover:scale-105 transition-transform shadow-lg`}
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.card} border-2 border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform shadow-lg`}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 ${theme.bg} overflow-hidden`} style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
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
        <h1 className={`text-2xl font-bold ${theme.text}`}>Words</h1>
      </div>

      {/* Progress bar */}
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

      {/* Main content area */}
      <div className="absolute inset-0 pt-32 pb-8">
        <MatchExercise 
          key={currentExercise}
          exercise={exercise}
          feedback={feedback}
          currentStage={2}
          currentExercise={currentExercise}
          draggedItemRef={draggedItemRef}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
          feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
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
        lessonName="Word Matching"
      />
    </div>
  );
};

export default WordsLesson;