// import React from 'react';

// const SentencesLesson = ({ onBack }) => {
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
//           <h1 className="text-3xl font-bold text-stone-800 mb-4">Sentences - Building Practice</h1>
//           <p className="text-stone-600">Sentence building exercises will go here...</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SentencesLesson;


import React, { useState, useRef, useMemo } from 'react';
import { Star, X, Check } from 'lucide-react';
import { sentencesPool } from '../../data/spanishData';
import BuildExercise from '../BuildExercise';

const SentencesLesson = ({ onBack }) => {
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
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Sentences</h1>
          <p className="text-stone-600">Build Spanish sentences word by word</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 min-h-[600px]">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-stone-600">
                Exercise {currentExercise + 1} of {exercises.length}
              </span>
              <span className="text-sm font-semibold text-amber-600">
                <Star className="inline w-4 h-4" fill="currentColor" /> Required Score: {score}/{requiredScore}
              </span>
              <span className="text-sm font-semibold text-red-600">
                ❌ Strikes: {strikes}/3
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="h-[480px]">
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

export default SentencesLesson;