import React, { useState, useRef } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';
import CharacterExercise from '../CharacterExercise';
// import AudioMatchingExercise from '../AudioMatchingExercise';
import MatchExercise from '../MatchExercise';
import BuildExercise from '../BuildExercise';
import CompletionModal from '../CompletionModal';

const StoryLesson = ({ onBack, story, languageData }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const draggedItemRef = useRef(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);

  const exercise = story.exercises[currentExercise];
  const totalExercises = story.exercises.length;

  // Handle completion for different exercise types
  const handleExerciseComplete = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      setFeedback('incorrect');
      
      if (newStrikes >= 3) {
        setTimeout(() => {
          setShowFailure(true);
        }, 1500);
        return;
      }
    }

    setTimeout(() => {
      if (currentExercise < totalExercises - 1) {
        setCurrentExercise(currentExercise + 1);
        setFeedback(null);
        setSelectedWords([]);
        draggedItemRef.current = null;
      } else {
        setShowCompletion(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setScore(0);
    setStrikes(0);
    setFeedback(null);
    setSelectedWords([]);
    setShowCompletion(false);
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
              {score} / {totalExercises} Correct
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleRestart}
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

  // Render appropriate exercise component based on type
  const renderExercise = () => {
    switch (exercise.type) {
      case 'character':
        return (
          <CharacterExercise
            exercise={exercise.data}
            dropZoneActive={dropZoneActive}
            setDropZoneActive={setDropZoneActive}
            handleDragStart={(e, item) => {
              draggedItemRef.current = item;
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', item);
            }}
            handleDrop={(e) => {
              e.preventDefault();
              setDropZoneActive(false);
              if (draggedItemRef.current) {
                handleExerciseComplete(true);
              }
            }}
            draggedItemRef={draggedItemRef}
          />
        );

      case 'audio':
        // For audio, we need to handle it differently since it's self-contained
        // This is a simplified version - you'd need to adapt AudioMatchingExercise
        return (
          <div className="text-center">
            <p className={`text-xl ${theme.text}`}>Audio exercise (needs integration)</p>
          </div>
        );

      case 'match':
        return (
          <MatchExercise
            exercise={exercise.data}
            feedback={feedback}
            currentStage={2}
            currentExercise={currentExercise}
            draggedItemRef={draggedItemRef}
            handleDragStart={(e, item) => {
              draggedItemRef.current = item;
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', item);
            }}
            handleDrop={(e, targetAnswer) => {
              e.preventDefault();
              if (!draggedItemRef.current) return;

              const translationParts = exercise.data.translation.toLowerCase().split(/[/,]/);
              const answersMatch = translationParts.some(part => 
                part.trim() === targetAnswer?.toLowerCase()
              );

              handleExerciseComplete(answersMatch);
            }}
          />
        );

      case 'build':
        return (
          <BuildExercise
            exercise={exercise.data}
            feedback={feedback}
            selectedWords={selectedWords}
            setSelectedWords={setSelectedWords}
            draggedItemRef={draggedItemRef}
            dropZoneActive={dropZoneActive}
            setDropZoneActive={setDropZoneActive}
            onComplete={handleExerciseComplete}
          />
        );

      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return (
    <div className={`fixed inset-0 ${theme.bg} overflow-hidden`}>
      <ThemeToggle />

      {/* Back button */}
      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Story Title */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center max-w-md px-2 sm:px-4">
        <h1 className={`text-lg sm:text-2xl font-bold ${theme.text}`}>{story.name}</h1>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
            <span className={`font-semibold ${theme.textSecondary}`}>
              {currentExercise + 1}/{totalExercises}
            </span>
            <span className={`font-semibold ${theme.accent}`}>
              <Star className="inline w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" /> {score}/{totalExercises}
            </span>
            <span className="font-semibold text-red-400 text-xs sm:text-sm">
              ❌ {strikes}/3
            </span>
          </div>
          <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
            <div
              className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(currentExercise / totalExercises) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercise content */}
      <div className="absolute inset-0 pt-28 sm:pt-36 pb-8">{renderExercise()}</div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        score={score}
        totalQuestions={totalExercises}
        onRestart={handleRestart}
        onBack={onBack}
        lessonName={story.name}
      />
    </div>
  );
};

export default StoryLesson;