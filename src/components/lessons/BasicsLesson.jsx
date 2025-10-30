import React, { useState, useRef } from 'react';
import { Star, X, Check } from 'lucide-react';
import { spanishStages } from '../../data/spanishData';
import CharacterExercise from '../CharacterExercise';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const BasicsLesson = ({ onBack }) => {
  const { theme } = useTheme();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  // const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const draggedItemRef = useRef(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  const stageData = spanishStages[1]; // Stage 1 is characters
  const exercises = stageData.exercises;
  const exercise = exercises[currentExercise];

  const handleDragStart = (e, item) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (!draggedItemRef.current) return;

    // Character exercises are always correct (exposure-based learning)
    setFeedback("correct");
    setScore(score + 1);

    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else {
        // Lesson complete!
        alert(`Lesson complete! Score: ${score + 1}/${exercises.length}`);
        onBack();
      }
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
        />
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

export default BasicsLesson;


// import React, { useState, useRef } from 'react';
// import { Star, X, Check } from 'lucide-react';
// import { spanishStages } from '../../data/spanishData';
// import CharacterExercise from '../CharacterExercise';

// const BasicsLesson = ({ onBack }) => {
//   const [currentExercise, setCurrentExercise] = useState(0);
//   const [score, setScore] = useState(0);
//   // const [strikes, setStrikes] = useState(0);
//   const [feedback, setFeedback] = useState(null);
//   const draggedItemRef = useRef(null);
//   const [dropZoneActive, setDropZoneActive] = useState(false);

//   const stageData = spanishStages[1]; // Stage 1 is characters
//   const exercises = stageData.exercises;
//   const exercise = exercises[currentExercise];

//   const handleDragStart = (e, item) => {
//     draggedItemRef.current = item;
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', item);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDropZoneActive(false);
    
//     if (!draggedItemRef.current) return;

//     // Character exercises are always correct (exposure-based learning)
//     setFeedback("correct");
//     setScore(score + 1);

//     setTimeout(() => {
//       if (currentExercise < exercises.length - 1) {
//         setCurrentExercise(currentExercise + 1);
//       } else {
//         // Lesson complete!
//         alert(`Lesson complete! Score: ${score + 1}/${exercises.length}`);
//         onBack();
//       }
//       setFeedback(null);
//       draggedItemRef.current = null;
//     }, 1500);
//   };

// return (
//   <div className="fixed inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 overflow-hidden" style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
//     <style>{`
//       @keyframes shake {
//         0%, 100% { transform: translateX(0); }
//         10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
//         20%, 40%, 60%, 80% { transform: translateX(10px); }
//       }
//       .animate-shake {
//         animation: shake 0.5s;
//         background-color: #ef4444 !important;
//       }
//     `}</style>

//     {/* Back button - fixed top left */}
//     <button
//       onClick={onBack}
//       className="fixed top-4 left-4 z-50 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-stone-700 font-semibold"
//     >
//       ← Back
//     </button>

//     {/* Header - fixed top center */}
//     <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
//       <h1 className="text-2xl font-bold text-stone-800">Basics</h1>
//     </div>

//     {/* Progress bar - fixed top */}
//     <div className="fixed top-16 left-0 right-0 z-40 px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex justify-between items-center mb-2 text-sm">
//           <span className="font-semibold text-stone-600">
//             {currentExercise + 1}/{exercises.length}
//           </span>
//           <span className="font-semibold text-amber-600">
//             <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{stageData.requiredScore}
//           </span>
//         </div>
//         <div className="w-full bg-stone-200 rounded-full h-2">
//           <div
//             className="bg-amber-600 h-2 rounded-full transition-all duration-500"
//             style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
//           />
//         </div>
//       </div>
//     </div>

//     {/* Main content area - full screen */}
//     <div className="absolute inset-0 pt-32 pb-8">
//       <CharacterExercise 
//         exercise={exercise}
//         dropZoneActive={dropZoneActive}
//         setDropZoneActive={setDropZoneActive}
//         handleDragStart={handleDragStart}
//         handleDrop={handleDrop}
//       />
//     </div>

//     {/* Feedback - fixed bottom */}
//     {feedback && (
//       <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
//         feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//       }`}>
//         <div className="flex items-center gap-2">
//           {feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
//           <span className="font-bold text-xl">
//             {feedback === "correct" ? "¡Correcto!" : "Try again!"}
//           </span>
//         </div>
//       </div>
//     )}
//   </div>
// );
// };

// export default BasicsLesson;