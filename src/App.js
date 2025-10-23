// import React, { useState, useRef } from 'react';
// import { X, Check, Star } from 'lucide-react';
// import { spanishStages } from './data/spanishData';
// import CharacterExercise from './components/CharacterExercise';
// import MatchExercise from './components/MatchExercise';
// import BuildExercise from './components/BuildExercise';
// import StageSelector from './components/StageSelector';

// const SpanishLearningApp = () => {
//   const [currentStage, setCurrentStage] = useState(1);
//   const [currentExercise, setCurrentExercise] = useState(0);
//   const [generatedExercises, setGeneratedExercises] = useState(null);
//   const [score, setScore] = useState(0);
//   const [strikes, setStrikes] = useState(0);
//   const [stageProgress, setStageProgress] = useState({ 1: 0, 2: 0, 3: 0 });
//   const [feedback, setFeedback] = useState(null);
//   const [unlockedStages, setUnlockedStages] = useState([1, 2, 3]);
//   const draggedItemRef = useRef(null);
//   const [dropZoneActive, setDropZoneActive] = useState(false);
//   const [selectedWords, setSelectedWords] = useState([]);

//   const stages = spanishStages;
//   const currentStageData = stages[currentStage];

//   // Generate exercises for randomized stages, or use sequential exercises
//   const exercises = currentStageData.type === "randomized" 
//     ? (generatedExercises || currentStageData.generateExercises())
//     : currentStageData.exercises;

//   const exercise = exercises[currentExercise];

//   // If this is a randomized stage and we haven't generated exercises yet, do it now
//   if (currentStageData.type === "randomized" && !generatedExercises) {
//     setGeneratedExercises(currentStageData.generateExercises());
//   }

//   if (!exercise) return null;

//   const handleStageChange = (newStage) => {
//     setCurrentStage(newStage);
//     setCurrentExercise(0);
//     setGeneratedExercises(null);
//     setSelectedWords([]);
//     setFeedback(null);
//   };

//   const handleDragStart = (e, item) => {
//     draggedItemRef.current = item;
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', item);
//   };

//   const handleDrop = (e, targetAnswer = null) => {
//     e.preventDefault();
//     setDropZoneActive(false);
    
//     if (!draggedItemRef.current) return;

//     let answersMatch = false;

//     if (exercise.type === "character") {
//       answersMatch = true;
//     } else if (exercise.type === "match" && targetAnswer) {
//       const translationParts = exercise.translation.toLowerCase().split(/[/,]/);
//       answersMatch = translationParts.some(part => part.trim() === targetAnswer.toLowerCase());
//     }

//     if (answersMatch) {
//       setFeedback("correct");
//       setScore(score + 1);
//       setStageProgress({
//         ...stageProgress,
//         [currentStage]: stageProgress[currentStage] + 1
//       });
//     } else {
//       setFeedback("incorrect");
//       const newStrikes = strikes + 1;
//       setStrikes(newStrikes);
      
//       if (newStrikes >= 3) {
//         setTimeout(() => {
//           setCurrentExercise(0);
//           setStageProgress({
//             ...stageProgress,
//             [currentStage]: 0
//           });
//           setStrikes(0);
//           setGeneratedExercises(null);
//           alert('Three strikes! Starting stage over.');
//         }, 1500);
//         return;
//       }
//     }

//     setTimeout(() => {
//       if (currentExercise < exercises.length - 1) {
//         setCurrentExercise(currentExercise + 1);
//       } else {
//         const finalScore = stageProgress[currentStage] + (answersMatch ? 1 : 0);
//         if (finalScore >= currentStageData.requiredScore && strikes < 3) {
//           if (!unlockedStages.includes(currentStage + 1) && stages[currentStage + 1]) {
//             setUnlockedStages([...unlockedStages, currentStage + 1]);
//           }
//         }
//         setCurrentExercise(0);
//         setStrikes(0);
//         setGeneratedExercises(null);
//       }
//       setFeedback(null);
//       draggedItemRef.current = null;
//       setSelectedWords([]);
//     }, 1500);
//   };

//   const handleBuildComplete = (isCorrect) => {
//     if (isCorrect) {
//       setFeedback("correct");
//       setScore(score + 1);
//       setStageProgress({
//         ...stageProgress,
//         [currentStage]: stageProgress[currentStage] + 1
//       });
//     } else {
//       setFeedback("incorrect");
//       const newStrikes = strikes + 1;
//       setStrikes(newStrikes);
      
//       if (newStrikes >= 3) {
//         setTimeout(() => {
//           setCurrentExercise(0);
//           setStageProgress({
//             ...stageProgress,
//             [currentStage]: 0
//           });
//           setStrikes(0);
//           setGeneratedExercises(null);
//           alert('Three strikes! Starting stage over.');
//         }, 1500);
//         return;
//       }
//     }

//     setTimeout(() => {
//       if (currentExercise < exercises.length - 1) {
//         setCurrentExercise(currentExercise + 1);
//       } else {
//         const finalScore = stageProgress[currentStage] + (isCorrect ? 1 : 0);
//         if (finalScore >= currentStageData.requiredScore && strikes < 3) {
//           if (!unlockedStages.includes(currentStage + 1) && stages[currentStage + 1]) {
//             setUnlockedStages([...unlockedStages, currentStage + 1]);
//           }
//         }
//         setCurrentExercise(0);
//         setStrikes(0);
//         setGeneratedExercises(null);
//       }
//       setFeedback(null);
//       setSelectedWords([]);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8" style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
//       <style>{`
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
//           20%, 40%, 60%, 80% { transform: translateX(10px); }
//         }
//         .animate-shake {
//           animation: shake 0.5s;
//           background-color: #ef4444 !important;
//         }
//       `}</style>
      
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Spanish Learning</h1>
//           <p className="text-gray-600">Progressive mastery-based approach</p>
//         </div>

//         {/* Stage Selector */}
//         <StageSelector 
//           stages={stages}
//           currentStage={currentStage}
//           setCurrentStage={handleStageChange}
//           unlockedStages={unlockedStages}
//           stageProgress={stageProgress}
//         />

//         {/* Exercise Area */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 min-h-[600px]">
//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm font-semibold text-gray-600">
//                 Exercise {currentExercise + 1} of {exercises.length}
//               </span>
//               <span className="text-sm font-semibold text-blue-600">
//                 <Star className="inline w-4 h-4" fill="currentColor" /> Score: {stageProgress[currentStage]}/{currentStageData.requiredScore}
//               </span>
//               <span className="text-sm font-semibold text-red-600">
//                 ❌ Strikes: {strikes}/3
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
//               />
//             </div>
//           </div>

//           <div className="h-[480px]">
//             {exercise.type === "character" && (
//               <CharacterExercise 
//                 exercise={exercise}
//                 dropZoneActive={dropZoneActive}
//                 setDropZoneActive={setDropZoneActive}
//                 handleDragStart={handleDragStart}
//                 handleDrop={handleDrop}
//               />
//             )}
//             {exercise.type === "match" && (
//               <MatchExercise 
//                 key={currentExercise}
//                 exercise={exercise}
//                 feedback={feedback}
//                 currentStage={currentStage}
//                 currentExercise={currentExercise}
//                 draggedItemRef={draggedItemRef}
//                 handleDragStart={handleDragStart}
//                 handleDrop={handleDrop}
//               />
//             )}
//             {exercise.type === "build" && (
//               <BuildExercise 
//                 exercise={exercise}
//                 feedback={feedback}
//                 selectedWords={selectedWords}
//                 setSelectedWords={setSelectedWords}
//                 draggedItemRef={draggedItemRef}
//                 dropZoneActive={dropZoneActive}
//                 setDropZoneActive={setDropZoneActive}
//                 onComplete={handleBuildComplete}
//               />
//             )}
//           </div>
//         </div>

//         {/* Feedback */}
//         {feedback && (
//           <div className={`text-center p-4 rounded-xl ${
//             feedback === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}>
//             {feedback === "correct" ? (
//               <div className="flex items-center justify-center gap-2">
//                 <Check className="w-6 h-6" />
//                 <span className="font-semibold text-xl">¡Correcto!</span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center gap-2">
//                 <X className="w-6 h-6" />
//                 <span className="font-semibold text-xl">Try again next time!</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpanishLearningApp;


// import React, { useState, useRef } from 'react';
// import { X, Check, Star } from 'lucide-react';
// import { spanishStages } from './data/spanishData';
// import Hub from './components/Hub';
// import CharacterExercise from './components/CharacterExercise';
// import MatchExercise from './components/MatchExercise';
// import BuildExercise from './components/BuildExercise';
// import StageSelector from './components/StageSelector';

// const SpanishLearningApp = () => {
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [currentStage, setCurrentStage] = useState(1);
//   const [currentExercise, setCurrentExercise] = useState(0);
//   const [generatedExercises, setGeneratedExercises] = useState(null);
//   const [score, setScore] = useState(0);
//   const [strikes, setStrikes] = useState(0);
//   const [stageProgress, setStageProgress] = useState({ 1: 0, 2: 0, 3: 0 });
//   const [feedback, setFeedback] = useState(null);
//   const [unlockedStages, setUnlockedStages] = useState([1, 2, 3]);
//   const draggedItemRef = useRef(null);
//   const [dropZoneActive, setDropZoneActive] = useState(false);
//   const [selectedWords, setSelectedWords] = useState([]);

//   // If no lesson selected, show hub
//   if (!selectedLesson) {
//     return <Hub onSelectLesson={setSelectedLesson} languageName="Spanish" />;
//   }

//   // Lesson is selected, show the learning interface
//   const stages = spanishStages;
//   const currentStageData = stages[currentStage];

//   const exercises = currentStageData.type === "randomized" 
//     ? (generatedExercises || currentStageData.generateExercises())
//     : currentStageData.exercises;

//   const exercise = exercises[currentExercise];

//   if (currentStageData.type === "randomized" && !generatedExercises) {
//     setGeneratedExercises(currentStageData.generateExercises());
//   }

//   if (!exercise) return null;

//   const handleBackToHub = () => {
//     setSelectedLesson(null);
//     setCurrentStage(1);
//     setCurrentExercise(0);
//     setGeneratedExercises(null);
//     setSelectedWords([]);
//     setFeedback(null);
//     setStrikes(0);
//   };

//   const handleStageChange = (newStage) => {
//     setCurrentStage(newStage);
//     setCurrentExercise(0);
//     setGeneratedExercises(null);
//     setSelectedWords([]);
//     setFeedback(null);
//   };

//   const handleDragStart = (e, item) => {
//     draggedItemRef.current = item;
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', item);
//   };

//   const handleDrop = (e, targetAnswer = null) => {
//     e.preventDefault();
//     setDropZoneActive(false);
    
//     if (!draggedItemRef.current) return;

//     let answersMatch = false;

//     if (exercise.type === "character") {
//       answersMatch = true;
//     } else if (exercise.type === "match" && targetAnswer) {
//       const translationParts = exercise.translation.toLowerCase().split(/[/,]/);
//       answersMatch = translationParts.some(part => part.trim() === targetAnswer.toLowerCase());
//     }

//     if (answersMatch) {
//       setFeedback("correct");
//       setScore(score + 1);
//       setStageProgress({
//         ...stageProgress,
//         [currentStage]: stageProgress[currentStage] + 1
//       });
//     } else {
//       setFeedback("incorrect");
//       const newStrikes = strikes + 1;
//       setStrikes(newStrikes);
      
//       if (newStrikes >= 3) {
//         setTimeout(() => {
//           setCurrentExercise(0);
//           setStageProgress({
//             ...stageProgress,
//             [currentStage]: 0
//           });
//           setStrikes(0);
//           setGeneratedExercises(null);
//           alert('Three strikes! Starting stage over.');
//         }, 1500);
//         return;
//       }
//     }

//     setTimeout(() => {
//       if (currentExercise < exercises.length - 1) {
//         setCurrentExercise(currentExercise + 1);
//       } else {
//         const finalScore = stageProgress[currentStage] + (answersMatch ? 1 : 0);
//         if (finalScore >= currentStageData.requiredScore && strikes < 3) {
//           if (!unlockedStages.includes(currentStage + 1) && stages[currentStage + 1]) {
//             setUnlockedStages([...unlockedStages, currentStage + 1]);
//           }
//         }
//         setCurrentExercise(0);
//         setStrikes(0);
//         setGeneratedExercises(null);
//       }
//       setFeedback(null);
//       draggedItemRef.current = null;
//       setSelectedWords([]);
//     }, 1500);
//   };

//   const handleBuildComplete = (isCorrect) => {
//     if (isCorrect) {
//       setFeedback("correct");
//       setScore(score + 1);
//       setStageProgress({
//         ...stageProgress,
//         [currentStage]: stageProgress[currentStage] + 1
//       });
//     } else {
//       setFeedback("incorrect");
//       const newStrikes = strikes + 1;
//       setStrikes(newStrikes);
      
//       if (newStrikes >= 3) {
//         setTimeout(() => {
//           setCurrentExercise(0);
//           setStageProgress({
//             ...stageProgress,
//             [currentStage]: 0
//           });
//           setStrikes(0);
//           setGeneratedExercises(null);
//           alert('Three strikes! Starting stage over.');
//         }, 1500);
//         return;
//       }
//     }

//     setTimeout(() => {
//       if (currentExercise < exercises.length - 1) {
//         setCurrentExercise(currentExercise + 1);
//       } else {
//         const finalScore = stageProgress[currentStage] + (isCorrect ? 1 : 0);
//         if (finalScore >= currentStageData.requiredScore && strikes < 3) {
//           if (!unlockedStages.includes(currentStage + 1) && stages[currentStage + 1]) {
//             setUnlockedStages([...unlockedStages, currentStage + 1]);
//           }
//         }
//         setCurrentExercise(0);
//         setStrikes(0);
//         setGeneratedExercises(null);
//       }
//       setFeedback(null);
//       setSelectedWords([]);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 p-8" style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
//       <style>{`
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
//           20%, 40%, 60%, 80% { transform: translateX(10px); }
//         }
//         .animate-shake {
//           animation: shake 0.5s;
//           background-color: #ef4444 !important;
//         }
//       `}</style>
      
//       <div className="max-w-4xl mx-auto">
//         {/* Back button */}
//         <button
//           onClick={handleBackToHub}
//           className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-stone-700 font-semibold"
//         >
//           ← Back to Lessons
//         </button>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-stone-800 mb-2">Spanish Learning</h1>
//           <p className="text-stone-600">Progressive mastery-based approach</p>
//         </div>

//         {/* Stage Selector */}
//         <StageSelector 
//           stages={stages}
//           currentStage={currentStage}
//           setCurrentStage={handleStageChange}
//           unlockedStages={unlockedStages}
//           stageProgress={stageProgress}
//         />

//         {/* Exercise Area */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 min-h-[600px]">
//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm font-semibold text-stone-600">
//                 Exercise {currentExercise + 1} of {exercises.length}
//               </span>
//               <span className="text-sm font-semibold text-amber-600">
//                 <Star className="inline w-4 h-4" fill="currentColor" /> Score: {stageProgress[currentStage]}/{currentStageData.requiredScore}
//               </span>
//               <span className="text-sm font-semibold text-red-600">
//                 ❌ Strikes: {strikes}/3
//               </span>
//             </div>
//             <div className="w-full bg-stone-200 rounded-full h-2">
//               <div
//                 className="bg-amber-600 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
//               />
//             </div>
//           </div>

//           <div className="h-[480px]">
//             {exercise.type === "character" && (
//               <CharacterExercise 
//                 exercise={exercise}
//                 dropZoneActive={dropZoneActive}
//                 setDropZoneActive={setDropZoneActive}
//                 handleDragStart={handleDragStart}
//                 handleDrop={handleDrop}
//               />
//             )}
//             {exercise.type === "match" && (
//               <MatchExercise 
//                 key={currentExercise}
//                 exercise={exercise}
//                 feedback={feedback}
//                 currentStage={currentStage}
//                 currentExercise={currentExercise}
//                 draggedItemRef={draggedItemRef}
//                 handleDragStart={handleDragStart}
//                 handleDrop={handleDrop}
//               />
//             )}
//             {exercise.type === "build" && (
//               <BuildExercise 
//                 exercise={exercise}
//                 feedback={feedback}
//                 selectedWords={selectedWords}
//                 setSelectedWords={setSelectedWords}
//                 draggedItemRef={draggedItemRef}
//                 dropZoneActive={dropZoneActive}
//                 setDropZoneActive={setDropZoneActive}
//                 onComplete={handleBuildComplete}
//               />
//             )}
//           </div>
//         </div>

//         {/* Feedback */}
//         {feedback && (
//           <div className={`text-center p-4 rounded-xl ${
//             feedback === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}>
//             {feedback === "correct" ? (
//               <div className="flex items-center justify-center gap-2">
//                 <Check className="w-6 h-6" />
//                 <span className="font-semibold text-xl">¡Correcto!</span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center gap-2">
//                 <X className="w-6 h-6" />
//                 <span className="font-semibold text-xl">Try again next time!</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpanishLearningApp;


import React, { useState } from 'react';
import Hub from './components/Hub';
import BasicsLesson from './components/lessons/BasicsLesson';
import WordsLesson from './components/lessons/WordLesson';
import SentencesLesson from './components/lessons/SentencesLesson';
import WritingLesson from './components/lessons/WritingLesson';

const SpanishLearningApp = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleBackToHub = () => {
    setSelectedLesson(null);
  };

  // If no lesson selected, show hub
  if (!selectedLesson) {
    return <Hub onSelectLesson={setSelectedLesson} languageName="Spanish" />;
  }

  // Route to appropriate lesson
  switch(selectedLesson) {
    case 1:
      return <BasicsLesson onBack={handleBackToHub} />;
    case 2:
      return <WordsLesson onBack={handleBackToHub} />;
    case 3:
      return <SentencesLesson onBack={handleBackToHub} />;
    case 4:
      return <WritingLesson onBack={handleBackToHub} />;
    default:
      return <Hub onSelectLesson={setSelectedLesson} languageName="Spanish" />;
  }
};

export default SpanishLearningApp;