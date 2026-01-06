import React, { useState, useRef, useMemo } from 'react';
import { Star, X, Check } from 'lucide-react';
import MatchExercise from '../exercises_types/MatchExercise';
import VocabularyLearnExercise from '../exercises_types/VocabularyLearnExercise';
import CompletionModal from '../CompletionModal';
import InstructionCard from '../InstructionCard';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const WordsLesson = ({ onBack, languageData, category = null, practiceType = 'practice' }) => {
  const { theme } = useTheme();
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const draggedItemRef = useRef(null);
  
  const stageData = languageData[2];

  // Get category name for display
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Words";

  // Instruction content based on practice type
  const instructionContent = practiceType === 'learn' ? {
    title: `Learn ${categoryName}`,
    subtitle: "Build your Mvskoke vocabulary",
    icon: "📚",
    color: "border-green-500",
    explanation: `In this lesson, you'll learn Mvskoke words for ${category}. Take your time to see each word and its meaning. There are no wrong answers - this is all about exposure and building familiarity!`,
    explanationTitle: "How it works",
    examples: stageData?.subLessons?.[category]?.exercises?.slice(0, 4).map(item => ({
      mvskoke: item.mvskoke,
      english: item.english
    })) || [],
    rules: [
      {
        icon: "👀",
        text: "Look at each word carefully and see how it's written in Mvskoke"
      },
      {
        icon: "🎯",
        text: "Drag each word to the circle to continue to the next one"
      },
      {
        icon: "✨",
        text: "No pressure - just focus on learning the vocabulary!"
      }
    ],
    culturalNote: "Building vocabulary is essential for communication. Each word you learn helps you express yourself and understand others in Mvskoke.",
    buttonText: "Start Learning →"
  } : {
    title: `Practice ${categoryName}`,
    subtitle: "Match Mvskoke words with their meanings",
    icon: "⚡",
    color: "border-blue-500",
    explanation: "Now test your knowledge! Match each Mvskoke word with its English meaning. The word is in the center, and you need to drag it to the correct translation in one of the corners (or drag a corner to the center).",
    explanationTitle: "How to practice",
    examples: stageData?.subLessons?.[category]?.exercises?.slice(0, 4).map(item => ({
      mvskoke: item.mvskoke,
      english: item.english
    })) || [],
    rules: [
      {
        icon: "↔️",
        text: "Drag the center word to the correct corner, OR drag a corner answer to the center word"
      },
      {
        icon: "⚠️",
        text: "Be careful! You only get 3 mistakes (strikes) before you need to restart"
      },
      {
        icon: "⭐",
        text: "Get at least 7 correct to pass the lesson"
      }
    ],
    culturalNote: "Regular practice helps these words become natural. Don't worry about mistakes - they're part of learning!",
    buttonText: "Start Practice →"
  };

  // Generate exercises based on mode
  const exercises = useMemo(() => {
    // Handle animal subcategories (e.g., "animals-farm")
    if (category?.startsWith('animals-')) {
      const subcategory = category.split('-')[1]; // Extract "farm" from "animals-farm"
      const subcategoryWords = stageData?.subLessons?.animals?.subCategories?.[subcategory]?.exercises || [];
      
      if (practiceType === 'learn') {
        return subcategoryWords;
      } else {
        // Create matching exercises for practice mode
        return subcategoryWords.map(item => {
          const otherItems = subcategoryWords.filter(v => v.mvskoke !== item.mvskoke);
          const wrongAnswers = otherItems
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(v => v.english);
          
          const options = [item.english, ...wrongAnswers].sort(() => Math.random() - 0.5);
          
          return {
            word: item.mvskoke,
            translation: item.english,
            options: options,
            sound_file: item.sound_file || null
          };
        }).sort(() => Math.random() - 0.5).slice(0, 10);
      }
    }
    
    // Regular categories (colors, family, food, etc.)
    if (!stageData?.subLessons?.[category]?.exercises) return [];
    
    const categoryWords = stageData.subLessons[category].exercises;
    
    if (practiceType === 'learn') {
      return categoryWords;
    } else {
      return categoryWords.map(item => {
        const otherItems = categoryWords.filter(v => v.mvskoke !== item.mvskoke);
        const wrongAnswers = otherItems
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.english);
        
        const options = [item.english, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        return {
          word: item.mvskoke,
          translation: item.english,
          options: options,
          sound_file: item.sound_file || null
        };
      }).sort(() => Math.random() - 0.5).slice(0, 10);
    }
  }, [stageData, category, practiceType]);

  const exercise = exercises[currentExercise];
  const requiredScore = 7;

  const handleDragStart = (e, item) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e, targetAnswer = null) => {
    e.preventDefault();
    
    if (!draggedItemRef.current) return;

    let answersMatch = false;

    if (practiceType === 'learn') {
      // In learn mode, always correct
      answersMatch = true;
    } else {
      // In practice mode, check if answer is correct
      if (targetAnswer) {
        const translationParts = exercise.translation.toLowerCase().split(/[/,]/);
        answersMatch = translationParts.some(part => part.trim() === targetAnswer.toLowerCase());
      }
    }

    if (answersMatch) {
      setFeedback("correct");
      if (practiceType === 'practice') {
        setScore(score + 1);
      }
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
      // Use functional update to avoid stale closure
      setCurrentExercise((prevExercise) => {
        if (prevExercise < exercises.length - 1) {
          setFeedback(null);
          draggedItemRef.current = null;
          return prevExercise + 1;
        } else {
          setShowCompletion(true);
          return prevExercise;
        }
      });
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

  // Show instructions first
  if (showInstructions) {
    return (
      <InstructionCard
        instruction={instructionContent}
        onClose={onBack}
        onStart={() => setShowInstructions(false)}
      />
    );
  }

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
        <h1 className={`text-2xl font-bold ${theme.text}`}>
          {practiceType === 'learn' ? 'Learn' : 'Practice'} {categoryName}
        </h1>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className={`font-semibold ${theme.textSecondary}`}>
              {currentExercise + 1}/{exercises.length}
            </span>
            {practiceType === 'practice' && (
              <>
                <span className={`font-semibold ${theme.accent}`}>
                  <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{requiredScore}
                </span>
                <span className="font-semibold text-red-400">
                  ❌ {strikes}/3
                </span>
              </>
            )}
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
        {practiceType === 'learn' ? (
          <VocabularyLearnExercise
            word={exercise}
            dropZoneActive={dropZoneActive}
            setDropZoneActive={setDropZoneActive}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            draggedItemRef={draggedItemRef}
          />
        ) : (
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
        )}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
          feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
            <span className="font-bold text-xl">
              {feedback === "correct" ? "Mvto!" : "Incorrect"}
            </span>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        score={practiceType === 'learn' ? exercises.length : score}
        totalQuestions={exercises.length}
        onRestart={handleRestart}
        onBack={onBack}
        lessonName={`${practiceType === 'learn' ? 'Learn' : 'Practice'} ${categoryName}`}
      />
    </div>
  );
};

export default WordsLesson;