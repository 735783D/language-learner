import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, Check, X, Star, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';
import CompletionModal from '../CompletionModal';

const AudioMatchingExercise = ({ onBack, languageData, subLesson, practice, stageKey }) => {
  const { theme } = useTheme();
  const [shuffledExercises, setShuffledExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const audioRef = useRef(null);

  // Get exercises with useCallback to satisfy linter
  const getExercises = useCallback(() => {
    const actualStageKey = stageKey || 1;
    const stageData = languageData[actualStageKey];
    
    let exercises = [];
    
    if (stageData?.subLessons && practice) {
      const practiceKey = practice.replace('-audio', '');
      exercises = stageData.subLessons[practiceKey]?.exercises || [];
    } else {
      exercises = stageData?.exercises || [];
    }
    
    return exercises;
  }, [languageData, practice, stageKey]);

  // Shuffle exercises on mount
  useEffect(() => {
    const exercises = getExercises();
    // Create a shuffled copy
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    setShuffledExercises(shuffled);
  }, [getExercises]);

  const exercise = shuffledExercises[currentExercise];
  const displayChar = exercise?.char || exercise?.combo;

  // Generate random options
  const generateOptions = useCallback(() => {
    if (!exercise || !shuffledExercises || shuffledExercises.length === 0) {
      return;
    }

    const correctAnswer = displayChar;
    
    // Get 3 random wrong answers from all exercises
    const otherExercises = shuffledExercises.filter(ex => {
      const char = ex.char || ex.combo;
      return char !== correctAnswer;
    });
    
    const wrongAnswers = otherExercises
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(ex => ex.char || ex.combo);
    
    // Shuffle all options
    const allOptions = [correctAnswer, ...wrongAnswers]
      .sort(() => Math.random() - 0.5);

    setOptions(allOptions);
  }, [exercise, shuffledExercises, displayChar]);

  // Play sound
  const playSound = useCallback(() => {
    if (exercise?.sound_file && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [exercise]);

  // Initialize options and play sound when exercise changes
  useEffect(() => {
    generateOptions();
    setSelectedAnswer(null);
    setFeedback(null);
    
    const timer = setTimeout(() => {
      playSound();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentExercise, generateOptions, playSound, exercise]);

  // Handle answer selection
  const handleAnswerClick = (option) => {
    if (feedback) return;

    setSelectedAnswer(option);
    const isCorrect = option === displayChar;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next after delay
    setTimeout(() => {
      if (currentExercise < shuffledExercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setFeedback(null);
      } else {
        // Show completion screen
        setShowCompletion(true);
      }
    }, 1500);
  };

  // Check if we have exercises
  if (!shuffledExercises || shuffledExercises.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center p-8`}>
        <div className="text-center">
          <div className={`text-2xl ${theme.text} mb-4`}>Loading exercises...</div>
          <button
            onClick={onBack}
            className={`px-6 py-3 rounded-lg ${theme.button}`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Final score is just the current score
  const finalScore = score;
  
  // Handle restart
  const handleRestart = () => {
    const exercises = getExercises();
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    setShuffledExercises(shuffled);
    setCurrentExercise(0);
    setScore(0);
    setShowCompletion(false);
    setFeedback(null);
    setSelectedAnswer(null);
  };

  if (!exercise) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>Loading exercise...</div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 ${theme.bg} overflow-hidden`}>
      <ThemeToggle />

      {/* Hidden audio element */}
      {exercise.sound_file && (
        <audio ref={audioRef} src={exercise.sound_file} preload="auto" />
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="fixed pt-8 top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
        <h1 className={`text-2xl font-bold ${theme.text}`}>Audio Matching</h1>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className={`font-semibold ${theme.textSecondary}`}>
              {currentExercise + 1}/{shuffledExercises.length}
            </span>
            <span className={`font-semibold ${theme.accent}`}>
              <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{shuffledExercises.length}
            </span>
          </div>
          <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
            <div
              className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(currentExercise / shuffledExercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 pb-8 flex flex-col items-center justify-center">
        <div className="space-y-8 max-w-2xl w-full px-8">
          {/* Instruction and replay button */}
          <div className="text-center space-y-4">
            <p className={`text-xl ${theme.textSecondary}`}>
              Listen to the sound and select the matching letter
            </p>
            <button
              onClick={playSound}
              className={`${theme.card} p-6 rounded-full hover:scale-110 transition-transform shadow-lg`}
            >
              <Volume2 className={`w-12 h-12 ${theme.accent}`} />
            </button>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === displayChar;
              
              let buttonStyle = `${theme.card} border-4 border-transparent`;
              
              if (feedback && isSelected) {
                if (feedback === 'correct') {
                  buttonStyle = 'bg-green-500 border-green-600';
                } else {
                  buttonStyle = 'bg-red-500 border-red-600';
                }
              } else if (feedback && isCorrect) {
                buttonStyle = 'bg-green-500 border-green-600';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerClick(option)}
                  disabled={!!feedback}
                  className={`${buttonStyle} p-2 pb-4 rounded-3xl text-6xl font-bold hover:scale-105 transition-all shadow-lg disabled:cursor-not-allowed`}
                >
                  <span className={feedback && (isSelected || isCorrect) ? 'text-white' : theme.text}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
          feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {feedback === 'correct' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
            <span className="font-bold text-xl">
              {feedback === 'correct' ? 'Mvto! (Correct!)' : 'Try again!'}
            </span>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        score={finalScore}
        totalQuestions={shuffledExercises.length}
        onRestart={handleRestart}
        onBack={onBack}
        lessonName="Audio Matching"
      />
    </div>
  );
};

export default AudioMatchingExercise;