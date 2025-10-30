import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MatchExercise = ({ 
  exercise, 
  feedback,
  currentStage,
  currentExercise,
  draggedItemRef,
  handleDragStart,
  handleDrop
}) => {
  const { theme } = useTheme();
  const [matchDroppedOn, setMatchDroppedOn] = useState(null);
  const [matchHoverZone, setMatchHoverZone] = useState(null);

  const shuffledOptions = useMemo(() => {
    return [...exercise.options].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage, currentExercise]);

  useEffect(() => {
    // Clear immediately when exercise changes
    setMatchDroppedOn(null);
    setMatchHoverZone(null);
  }, [currentExercise]);

  const checkAndSubmit = (draggedAnswer, droppedAnswer, targetOption) => {
    setMatchDroppedOn(targetOption);
    handleDrop({ preventDefault: () => {} }, targetOption);
  };

  return (
    <div className="relative h-full w-full pt-8">
      {/* Center word */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="text-center space-y-4">
          <div
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(e, exercise.word);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMatchHoverZone('center');
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMatchHoverZone('center');
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX;
              const y = e.clientY;
              if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                if (matchHoverZone === 'center') setMatchHoverZone(null);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMatchHoverZone(null);
              if (draggedItemRef.current && draggedItemRef.current !== exercise.word) {
                checkAndSubmit(draggedItemRef.current, exercise.word, draggedItemRef.current);
              }
            }}
            className={`cursor-move transition-all ${matchHoverZone === 'center' ? 'scale-110' : ''}`}
          >
            <div className={`text-6xl font-bold px-8 py-6 rounded-2xl shadow-lg select-none transition-all ${
              matchHoverZone === 'center' ? `${theme.card} border-4 border-amber-400` : theme.card
            } ${theme.text}`}>
              {exercise.word}
            </div>
          </div>
          <div className={`text-lg ${theme.textSecondary}`}>Drag word to answer or answer to word</div>
        </div>
      </div>

      {/* Corner options */}
      {shuffledOptions.map((option, idx) => {
        const positions = [
          'top-8 left-8',
          'top-8 right-8',
          'bottom-8 left-8',
          'bottom-8 right-8'
        ];
        
        return (
          <div
            key={`${option}-${idx}`}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(e, option);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMatchHoverZone(option);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMatchHoverZone(option);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX;
              const y = e.clientY;
              if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                if (matchHoverZone === option) setMatchHoverZone(null);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMatchHoverZone(null);
              if (draggedItemRef.current === exercise.word) {
                checkAndSubmit(option, draggedItemRef.current, option);
              }
            }}
            className={`absolute ${positions[idx]} w-36 h-28 p-3 rounded-xl text-lg font-semibold flex items-center justify-center text-center transition-all border-4 cursor-move z-0 ${
              matchDroppedOn === option
                ? feedback === "correct"
                  ? "bg-green-500 text-white border-green-600 scale-110"
                  : "bg-red-500 text-white border-red-600"
                : matchHoverZone === option
                ? `${theme.card} border-amber-400 border-solid scale-105 ${theme.text}`
                : `${theme.card} border-transparent ${theme.textSecondary}`
            }`}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

export default MatchExercise;


// import React, { useState, useEffect, useMemo } from 'react';
// import { useTheme } from '../contexts/ThemeContext';

// const MatchExercise = ({ 
//   exercise, 
//   feedback,
//   currentStage,
//   currentExercise,
//   draggedItemRef,
//   handleDragStart,
//   handleDrop
// }) => {
//   const { theme } = useTheme();
//   const [matchDroppedOn, setMatchDroppedOn] = useState(null);
//   const [matchHoverZone, setMatchHoverZone] = useState(null);

//   const shuffledOptions = useMemo(() => {
//     return [...exercise.options].sort(() => Math.random() - 0.5);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentStage, currentExercise]);

// useEffect(() => {
//   // Clear immediately when exercise changes, no delay
//   setMatchDroppedOn(null);
//   setMatchHoverZone(null);
// }, [currentExercise]);

// const checkAndSubmit = (draggedAnswer, droppedAnswer, targetOption) => {
//   console.log('Target option box:', targetOption);
//   setMatchDroppedOn(targetOption);
  
//   handleDrop({ preventDefault: () => {} }, targetOption);
// };

//   return (
//     <div className="relative h-full w-full pt-8">
//       {/* Center word */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//         <div className="text-center space-y-4">
//           <div
//             draggable
//             onDragStart={(e) => {
//               e.stopPropagation();
//               handleDragStart(e, exercise.word);
//             }}
//             onDragOver={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMatchHoverZone('center');
//             }}
//             onDragEnter={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMatchHoverZone('center');
//             }}
//             onDragLeave={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               const rect = e.currentTarget.getBoundingClientRect();
//               const x = e.clientX;
//               const y = e.clientY;
//               if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
//                 if (matchHoverZone === 'center') setMatchHoverZone(null);
//               }
//             }}
//             onDrop={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMatchHoverZone(null);
//               if (draggedItemRef.current && draggedItemRef.current !== exercise.word) {
//                 checkAndSubmit(draggedItemRef.current, exercise.word, draggedItemRef.current);
//               }
//             }}
//             className={`cursor-move transition-all ${matchHoverZone === 'center' ? 'scale-110' : ''}`}
//           >
//             <div className={`text-6xl font-bold text-blue-900 px-8 py-6 rounded-2xl shadow-lg select-none transition-all ${
//               matchHoverZone === 'center' ? 'bg-blue-100 border-4 border-blue-400' : 'bg-white'
//             }`}>
//               {exercise.word}
//             </div>
//           </div>
//           <div className="text-lg text-gray-600">Drag word to answer or answer to word</div>
//         </div>
//       </div>

//       {/* Corner options */}
//       {shuffledOptions.map((option, idx) => {
//         const positions = [
//           'top-8 left-8',
//           'top-8 right-8',
//           'bottom-8 left-8',
//           'bottom-8 right-8'
//         ];
        
//         return (
//           <div
//             key={`${option}-${idx}`}
//             draggable
//             onDragStart={(e) => {
//               e.stopPropagation();
//               handleDragStart(e, option);
//             }}
//             onDragOver={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMatchHoverZone(option);
//             }}
//             onDragEnter={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMatchHoverZone(option);
//             }}
//             onDragLeave={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               const rect = e.currentTarget.getBoundingClientRect();
//               const x = e.clientX;
//               const y = e.clientY;
//               if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
//                 if (matchHoverZone === option) setMatchHoverZone(null);
//               }
//             }}
//             onDrop={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMatchHoverZone(null);
//               if (draggedItemRef.current === exercise.word) {
//                 checkAndSubmit(option, draggedItemRef.current, option);
//               }
//             }}
//             className={`absolute ${positions[idx]} w-36 h-28 p-3 rounded-xl text-lg font-semibold flex items-center justify-center text-center transition-all border-4 cursor-move z-0 ${
//               matchDroppedOn === option
//                 ? feedback === "correct"
//                   ? "bg-green-500 text-white border-green-600 scale-110"
//                   : "bg-red-500 text-white border-red-600"
//                 : matchHoverZone === option
//                 ? "border-blue-400 bg-blue-100 border-solid scale-105"
//                 : "border-gray-300 bg-gray-50 border-dashed"
//             }`}
//           >
//             {option}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MatchExercise;