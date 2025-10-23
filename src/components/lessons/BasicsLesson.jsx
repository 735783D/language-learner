// import React from 'react';

// const BasicsLesson = ({ onBack }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={onBack}
//           className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-stone-700 font-semibold"
//         >
//           ← Back to Lessons
//         </button>

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-stone-800 mb-4">Basics - Character Learning</h1>
//           <p className="text-stone-600">Character exercises will go here...</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicsLesson;


import React, { useState, useRef } from 'react';
import { Star, X, Check } from 'lucide-react';
import { spanishStages } from '../../data/spanishData';
import CharacterExercise from '../CharacterExercise';

const BasicsLesson = ({ onBack }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 p-8" style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
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

      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-stone-700 font-semibold"
        >
          ← Back to Lessons
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Basics</h1>
          <p className="text-stone-600">Learn the Spanish alphabet and sounds</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 min-h-[600px]">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-stone-600">
                Exercise {currentExercise + 1} of {exercises.length}
              </span>
              <span className="text-sm font-semibold text-amber-600">
                <Star className="inline w-4 h-4" fill="currentColor" /> Required Score: {score}/{stageData.requiredScore}
              </span>
              {/* <span className="text-sm font-semibold text-red-600">
                ❌ Strikes: {strikes}/3
              </span> */}
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="h-[480px]">
            <CharacterExercise 
              exercise={exercise}
              dropZoneActive={dropZoneActive}
              setDropZoneActive={setDropZoneActive}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          </div>
        </div>

        {feedback && (
          <div className={`text-center p-4 rounded-xl ${
            feedback === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {feedback === "correct" ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-6 h-6" />
                <span className="font-semibold text-xl">¡Correcto!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <X className="w-6 h-6" />
                <span className="font-semibold text-xl">Try again!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicsLesson;