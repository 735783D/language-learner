import React, { useState, useMemo } from 'react';
import { Star, X, Check } from 'lucide-react';
import CompletionModal from '../../CompletionModal';
import { useTheme } from '../../../contexts/ThemeContext';
import ThemeToggle from '../../ThemeToggle';

const FutureTenseLesson = ({ onBack, languageData }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionType, setQuestionType] = useState('first'); // 'first' or 'second'
  
  const stageData = languageData[4];

  // Generate randomized exercises
  const exercises = useMemo(() => {
    if (!stageData?.subLessons?.future?.exercises) return [];
    
    const allExercises = stageData.subLessons.future.exercises;
    
    // Create mixed exercises for both first person and second person
    const exerciseList = [];
    
    allExercises.forEach(verb => {
      // First person exercise
      exerciseList.push({
        infinitive: verb.infinitive,
        translation: verb.translation,
        root: verb.root,
        correctAnswer: verb.firstPerson,
        type: 'first',
        prompt: "I am going to..."
      });
      
      // Second person exercise
      exerciseList.push({
        infinitive: verb.infinitive,
        translation: verb.translation,
        root: verb.root,
        correctAnswer: verb.secondPerson,
        type: 'second',
        prompt: "You are going to..."
      });
    });
    
    // Shuffle and take 15 exercises
    return exerciseList
      .sort(() => Math.random() - 0.5)
      .slice(0, 15)
      .map(verb => {
        // Get 3 wrong answers of the same type
        const wrongAnswers = exerciseList
          .filter(v => v.type === verb.type && v.correctAnswer !== verb.correctAnswer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.correctAnswer);
        
        // Shuffle all options
        const options = [verb.correctAnswer, ...wrongAnswers]
          .sort(() => Math.random() - 0.5);
        
        return {
          ...verb,
          options
        };
      });
  }, [stageData]);

  const exercise = exercises[currentExercise];
  const requiredScore = 12;

  const handleAnswerClick = (answer) => {
    if (feedback) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === exercise.correctAnswer;
    
    if (isCorrect) {
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
        setSelectedAnswer(null);
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
    setShowCompletion(false);
    setShowFailure(false);
    setSelectedAnswer(null);
  };

  const handleFailureRestart = () => {
    setCurrentExercise(0);
    setScore(0);
    setStrikes(0);
    setFeedback(null);
    setShowFailure(false);
    setSelectedAnswer(null);
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

  if (!exercises || exercises.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>Loading exercises...</div>
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
        <h1 className={`text-2xl font-bold ${theme.text}`}>Future Tense</h1>
        <p className={`text-sm ${theme.textSecondary}`}>Using "vhan" - going to...</p>
      </div>

      {/* Progress bar */}
      <div className="fixed top-20 left-0 right-0 z-40 px-8">
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
      <div className="absolute inset-0 pt-32 pb-8 flex flex-col items-center justify-center">
        <div className="space-y-8 max-w-2xl w-full px-8">
          {/* Question */}
          <div className="text-center space-y-4">
            <p className={`text-xl ${theme.textSecondary}`}>
              How do you say:
            </p>
            <div className={`${theme.card} p-8 rounded-3xl shadow-lg space-y-3`}>
              <div className={`text-3xl font-bold ${theme.accent}`}>
                {exercise.prompt}
              </div>
              <div className={`text-4xl font-bold ${theme.text}`}>
                {exercise.infinitive}
              </div>
              <div className={`text-lg ${theme.textSecondary} italic`}>
                ({exercise.translation})
              </div>
            </div>
            <div className={`text-sm ${theme.textSecondary} bg-blue-100 dark:bg-blue-900 p-3 rounded-lg`}>
              💡 Tip: Drop "etv" from the infinitive, add "vhan" + person marker
            </div>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {exercise.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === exercise.correctAnswer;
              
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
                  className={`${buttonStyle} p-6 rounded-2xl text-2xl font-semibold hover:scale-105 transition-all shadow-lg disabled:cursor-not-allowed`}
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
        lessonName="Future Tense"
      />
    </div>
  );
};

export default FutureTenseLesson;