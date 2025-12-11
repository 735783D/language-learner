import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Star, X, Check, Volume2 } from 'lucide-react';
import CompletionModal from '../../CompletionModal';
import { useTheme } from '../../../contexts/ThemeContext';
import ThemeToggle from '../../ThemeToggle';

const InfinitivesLesson = ({ onBack, languageData }) => {
  const { theme } = useTheme();
  const [mode, setMode] = useState('intro'); // 'intro' or 'quiz'
  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const draggedItemRef = useRef(null);
  const audioRef = useRef(null);
  
  const stageData = languageData[4];

  // Get all infinitives for intro
  const allInfinitives = useMemo(() => {
    if (!stageData?.subLessons?.infinitives?.exercises) return [];
    return stageData.subLessons.infinitives.exercises;
  }, [stageData]);

  // Generate randomized exercises
  const exercises = useMemo(() => {
    if (!allInfinitives || allInfinitives.length === 0) return [];
    
    // Create matching exercises: show infinitive, pick translation
    return [...allInfinitives]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15)
      .map(verb => {
        // Get 3 wrong answers
        const wrongAnswers = allInfinitives
          .filter(v => v.translation !== verb.translation)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.translation);
        
        // Shuffle all options
        const options = [verb.translation, ...wrongAnswers]
          .sort(() => Math.random() - 0.5);
        
        return {
          infinitive: verb.infinitive,
          correctAnswer: verb.translation,
          options,
          category: verb.category
        };
      });
  }, [allInfinitives]);

  const exercise = exercises[currentExercise];
  const currentIntroVerb = allInfinitives[currentIntroIndex];
  const requiredScore = 12;

  // Audio playback
  const playSound = useCallback(() => {
    if (currentIntroVerb?.sound_file && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [currentIntroVerb]);

  // Play sound when verb changes
  useEffect(() => {
    if (mode === 'intro' && currentIntroVerb?.sound_file && audioRef.current) {
      audioRef.current.load();
      const timer = setTimeout(() => {
        playSound();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIntroVerb, mode, playSound]);

  // Handle drag start for intro
  const handleDragStart = (e, item) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  // Handle drop for intro
  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (!draggedItemRef.current) {
      return;
    }

    // Always correct in intro mode (exposure-based learning)
    setFeedback("correct");

    setTimeout(() => {
      if (currentIntroIndex < allInfinitives.length - 1) {
        setCurrentIntroIndex(currentIntroIndex + 1);
        setFeedback(null);
        draggedItemRef.current = null;
      } else {
        // Finished intro, move to quiz
        setMode('quiz');
        setFeedback(null);
        draggedItemRef.current = null;
      }
    }, 1500);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setDropZoneActive(false);
  };

  const handleSkipToQuiz = () => {
    setMode('quiz');
  };

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

  if (!exercises || exercises.length === 0 || !allInfinitives || allInfinitives.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>Loading exercises...</div>
      </div>
    );
  }

  // INTRO MODE: Drag-and-drop flashcards
  if (mode === 'intro') {
    return (
      <div className={`fixed inset-0 ${theme.bg} overflow-hidden`} style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
        <ThemeToggle />

        {/* Audio element */}
        {currentIntroVerb?.sound_file && (
          <audio ref={audioRef} src={encodeURI(currentIntroVerb.sound_file)} preload="auto" />
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button}`}
        >
          ← Back
        </button>

        {/* Header */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
          <h1 className={`text-2xl font-bold ${theme.text}`}>Learn Infinitives</h1>
          <p className={`text-sm ${theme.textSecondary}`}>Drag each verb to the circle</p>
        </div>

        {/* Progress */}
        <div className="fixed top-20 left-0 right-0 z-40 px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className={`font-semibold ${theme.textSecondary}`}>
                {currentIntroIndex + 1}/{allInfinitives.length}
              </span>
            </div>
            <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
              <div
                className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${((currentIntroIndex + 1) / allInfinitives.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main content - matching CharacterExercise layout */}
        <div className="absolute inset-0 pt-32 pb-8 flex flex-col items-center justify-between px-8">
          
          {/* Top section - draggable card and info */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            {/* Draggable verb */}
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, currentIntroVerb.infinitive)}
              className="cursor-move touch-none relative"
              style={{ touchAction: 'none', userSelect: 'none' }}
            >
              <div className={`text-9xl font-bold select-none ${theme.accent}`}>
                {currentIntroVerb.infinitive}
              </div>
            </div>

            {/* Sounds like section with audio button */}
            <div className="space-y-3 text-center">
              <div className={`text-xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
                <span>Sounds like: <span className="font-semibold">{currentIntroVerb.sound || 'N/A'}</span></span>
                {currentIntroVerb.sound_file && (
                  <button
                    onClick={playSound}
                    className={`p-2 rounded-full ${theme.card} hover:scale-110 transition-transform`}
                    aria-label="Play sound"
                  >
                    <Volume2 className={`w-6 h-6 ${theme.accent}`} />
                  </button>
                )}
              </div>
            </div>

            {/* English like section */}
            <div className="space-y-3 text-center">
              <div className={`text-xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
                <span>English like: <span className="font-semibold">{currentIntroVerb.e_sound || currentIntroVerb.translation}</span></span>
              </div>

              {/* Example card */}
              <div className={`${theme.card} p-5 rounded-xl`}>
                <div className={`text-2xl font-bold ${theme.text} mb-1`}>
                  {currentIntroVerb.example || currentIntroVerb.infinitive}
                </div>
                <div className={`text-lg ${theme.textSecondary}`}>
                  {currentIntroVerb.exampleTranslation || currentIntroVerb.translation}
                </div>
              </div>
            </div>

            <div className={`text-sm ${theme.textSecondary} mt-4`}>
              Drag to the circle below to continue
            </div>

            {/* Skip button */}
            <div className="text-center mt-2">
              <button
                onClick={handleSkipToQuiz}
                className={`${theme.textSecondary} hover:${theme.text} underline text-sm`}
              >
                Skip to quiz →
              </button>
            </div>
          </div>

          {/* Drop zone circle - matching CharacterExercise */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-40 h-40 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${
              dropZoneActive 
                ? 'border-amber-400 bg-amber-400/20 scale-110' 
                : `border-transparent ${theme.card}`
            }`}
          >
            <Check className={`w-16 h-16 ${dropZoneActive ? 'text-amber-400' : theme.textSecondary}`} />
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
      </div>
    );
  }

  // QUIZ MODE (rest of the existing component)

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
        <h1 className={`text-2xl font-bold ${theme.text}`}>Infinitives</h1>
        <p className={`text-sm ${theme.textSecondary}`}>Learn basic verb forms</p>
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
              What does this verb mean?
            </p>
            <div className={`${theme.card} p-8 rounded-3xl shadow-lg`}>
              <div className={`text-5xl font-bold ${theme.text}`}>
                {exercise.infinitive}
              </div>
              {exercise.category && (
                <div className={`text-sm ${theme.textSecondary} mt-2 uppercase tracking-wider`}>
                  {exercise.category}
                </div>
              )}
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
                  className={`${buttonStyle} p-6 rounded-2xl text-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:cursor-not-allowed`}
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
        lessonName="Infinitives"
      />
    </div>
  );
};

export default InfinitivesLesson;


// import React, { useState, useMemo } from 'react';
// import { Star, X, Check } from 'lucide-react';
// import CompletionModal from '../../CompletionModal';
// import { useTheme } from '../../../contexts/ThemeContext';
// import ThemeToggle from '../../ThemeToggle';

// const InfinitivesLesson = ({ onBack, languageData }) => {
//   const { theme } = useTheme();
//   const [currentExercise, setCurrentExercise] = useState(0);
//   const [score, setScore] = useState(0);
//   const [strikes, setStrikes] = useState(0);
//   const [feedback, setFeedback] = useState(null);
//   const [showCompletion, setShowCompletion] = useState(false);
//   const [showFailure, setShowFailure] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
  
//   const stageData = languageData[4];

//   // Generate randomized exercises
//   const exercises = useMemo(() => {
//     if (!stageData?.subLessons?.infinitives?.exercises) return [];
    
//     const allExercises = stageData.subLessons.infinitives.exercises;
    
//     // Create matching exercises: show infinitive, pick translation
//     return [...allExercises]
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 15)
//       .map(verb => {
//         // Get 3 wrong answers
//         const wrongAnswers = allExercises
//           .filter(v => v.translation !== verb.translation)
//           .sort(() => Math.random() - 0.5)
//           .slice(0, 3)
//           .map(v => v.translation);
        
//         // Shuffle all options
//         const options = [verb.translation, ...wrongAnswers]
//           .sort(() => Math.random() - 0.5);
        
//         return {
//           word: verb.word,
//           correctAnswer: verb.translation,
//           options,
//           category: verb.category
//         };
//       });
//   }, [stageData]);

//   const exercise = exercises[currentExercise];
//   const requiredScore = 12;

//   const handleAnswerClick = (answer) => {
//     if (feedback) return;
    
//     setSelectedAnswer(answer);
//     const isCorrect = answer === exercise.correctAnswer;
    
//     if (isCorrect) {
//       setFeedback("correct");
//       setScore(score + 1);
//     } else {
//       setFeedback("incorrect");
//       const newStrikes = strikes + 1;
//       setStrikes(newStrikes);
      
//       if (newStrikes >= 3) {
//         setTimeout(() => {
//           setShowFailure(true);
//         }, 1500);
//         return;
//       }
//     }

//     setTimeout(() => {
//       if (currentExercise < exercises.length - 1) {
//         setCurrentExercise(currentExercise + 1);
//         setFeedback(null);
//         setSelectedAnswer(null);
//       } else {
//         setShowCompletion(true);
//       }
//     }, 1500);
//   };

//   const handleRestart = () => {
//     setCurrentExercise(0);
//     setScore(0);
//     setStrikes(0);
//     setFeedback(null);
//     setShowCompletion(false);
//     setShowFailure(false);
//     setSelectedAnswer(null);
//   };

//   const handleFailureRestart = () => {
//     setCurrentExercise(0);
//     setScore(0);
//     setStrikes(0);
//     setFeedback(null);
//     setShowFailure(false);
//     setSelectedAnswer(null);
//   };

//   // Three Strikes Failure Modal
//   if (showFailure) {
//     return (
//       <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center p-8 z-50`}>
//         <div className={`${theme.card} rounded-3xl p-12 max-w-2xl w-full shadow-2xl text-center space-y-8`}>
//           <div className="text-8xl">😔</div>
          
//           <div>
//             <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
//               Three Strikes!
//             </h1>
//             <p className={`text-xl ${theme.textSecondary}`}>
//               Don't give up - practice makes perfect!
//             </p>
//           </div>

//           <div className={`${theme.card} border-4 border-red-500 rounded-2xl p-8`}>
//             <div className="text-6xl font-bold mb-2 text-red-500">
//               ❌ ❌ ❌
//             </div>
//             <div className={`text-2xl ${theme.textSecondary}`}>
//               {score} / {exercises.length} Correct
//             </div>
//           </div>

//           <div className="flex gap-4 justify-center flex-wrap">
//             <button
//               onClick={handleFailureRestart}
//               className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.button} hover:scale-105 transition-transform shadow-lg`}
//             >
//               Try Again
//             </button>
//             <button
//               onClick={onBack}
//               className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.card} border-2 border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform shadow-lg`}
//             >
//               Back to Menu
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!exercises || exercises.length === 0) {
//     return (
//       <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
//         <div className={`text-2xl ${theme.text}`}>Loading exercises...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`fixed inset-0 ${theme.bg} overflow-hidden`} style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
//       <ThemeToggle />

//       {/* Back button */}
//       <button
//         onClick={onBack}
//         className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button}`}
//       >
//         ← Back
//       </button>

//       {/* Header */}
//       <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
//         <h1 className={`text-2xl font-bold ${theme.text}`}>Infinitives</h1>
//         <p className={`text-sm ${theme.textSecondary}`}>Learn basic verb forms</p>
//       </div>

//       {/* Progress bar */}
//       <div className="fixed top-20 left-0 right-0 z-40 px-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex justify-between items-center mb-2 text-sm">
//             <span className={`font-semibold ${theme.textSecondary}`}>
//               {currentExercise + 1}/{exercises.length}
//             </span>
//             <span className={`font-semibold ${theme.accent}`}>
//               <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{requiredScore}
//             </span>
//             <span className="font-semibold text-red-400">
//               ❌ {strikes}/3
//             </span>
//           </div>
//           <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
//             <div
//               className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
//               style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className="absolute inset-0 pt-32 pb-8 flex flex-col items-center justify-center">
//         <div className="space-y-8 max-w-2xl w-full px-8">
//           {/* Question */}
//           <div className="text-center space-y-4">
//             <p className={`text-xl ${theme.textSecondary}`}>
//               What does this verb mean?
//             </p>
//             <div className={`${theme.card} p-8 rounded-3xl shadow-lg`}>
//               <div className={`text-5xl font-bold ${theme.text}`}>
//                 {exercise.word}
//               </div>
//               {exercise.category && (
//                 <div className={`text-sm ${theme.textSecondary} mt-2 uppercase tracking-wider`}>
//                   {exercise.category}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Answer options */}
//           <div className="grid grid-cols-2 gap-4">
//             {exercise.options.map((option, idx) => {
//               const isSelected = selectedAnswer === option;
//               const isCorrect = option === exercise.correctAnswer;
              
//               let buttonStyle = `${theme.card} border-4 border-transparent`;
              
//               if (feedback && isSelected) {
//                 if (feedback === 'correct') {
//                   buttonStyle = 'bg-green-500 border-green-600';
//                 } else {
//                   buttonStyle = 'bg-red-500 border-red-600';
//                 }
//               } else if (feedback && isCorrect) {
//                 buttonStyle = 'bg-green-500 border-green-600';
//               }

//               return (
//                 <button
//                   key={idx}
//                   onClick={() => handleAnswerClick(option)}
//                   disabled={!!feedback}
//                   className={`${buttonStyle} p-6 rounded-2xl text-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:cursor-not-allowed`}
//                 >
//                   <span className={feedback && (isSelected || isCorrect) ? 'text-white' : theme.text}>
//                     {option}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Feedback */}
//       {feedback && (
//         <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
//           feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//         }`}>
//           <div className="flex items-center gap-2">
//             {feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
//             <span className="font-bold text-xl">
//               {feedback === "correct" ? "Mvto!" : "Try again!"}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Completion Modal */}
//       <CompletionModal
//         isOpen={showCompletion}
//         score={score}
//         totalQuestions={exercises.length}
//         onRestart={handleRestart}
//         onBack={onBack}
//         lessonName="Infinitives"
//       />
//     </div>
//   );
// };

// export default InfinitivesLesson;