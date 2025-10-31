import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  const [dragPosition, setDragPosition] = useState(null);
  const [draggedText, setDraggedText] = useState('');
  const isDragging = useRef(false);
  const dragSource = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const shuffledOptions = useMemo(() => {
    return [...exercise.options].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage, currentExercise]);

  useEffect(() => {
    setMatchDroppedOn(null);
    setMatchHoverZone(null);
  }, [currentExercise]);

  const checkAndSubmit = (draggedAnswer, droppedAnswer, targetOption) => {
    setMatchDroppedOn(targetOption);
    handleDrop({ preventDefault: () => {} }, targetOption);
  };

  const startDrag = (e, item, source, clientX, clientY) => {
    isDragging.current = true;
    dragSource.current = source;
    draggedItemRef.current = item;
    setDraggedText(item);
    
    // Calculate offset
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    setOffset({
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2)
    });
    
    setDragPosition({ x: clientX - (clientX - (rect.left + rect.width / 2)), y: clientY - (clientY - (rect.top + rect.height / 2)) });
    
    if (e.dataTransfer) {
      handleDragStart(e, item);
    }
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging.current) return;
    setDragPosition({ x: clientX - offset.x, y: clientY - offset.y });
    
    const zone = checkDropZone(clientX, clientY);
    setMatchHoverZone(zone);
  };

  const checkDropZone = (clientX, clientY) => {
    // Check center word
    const centerWord = document.querySelector('[data-center-word]');
    if (centerWord) {
      const rect = centerWord.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        return 'center';
      }
    }

    // Check corner options
    const options = document.querySelectorAll('[data-corner-option]');
    for (let option of options) {
      const rect = option.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        return option.getAttribute('data-option-value');
      }
    }

    return null;
  };

  const endDrag = (clientX, clientY) => {
    if (!isDragging.current) return;

    const dropZone = checkDropZone(clientX, clientY);
    
    if (dropZone) {
      if (dropZone === 'center' && draggedItemRef.current !== exercise.word) {
        checkAndSubmit(draggedItemRef.current, exercise.word, draggedItemRef.current);
      } else if (dropZone !== 'center' && draggedItemRef.current === exercise.word) {
        checkAndSubmit(dropZone, draggedItemRef.current, dropZone);
      }
    }

    isDragging.current = false;
    dragSource.current = null;
    setDragPosition(null);
    setMatchHoverZone(null);
  };

  // Document-level event listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        e.preventDefault();
        moveDrag(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = (e) => {
      if (isDragging.current) {
        endDrag(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging.current) {
        e.preventDefault();
        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (e) => {
      if (isDragging.current) {
        const touch = e.changedTouches[0];
        endDrag(touch.clientX, touch.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative h-full w-full pt-8">
      {/* Center word */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="text-center space-y-4">
          <div
            data-center-word
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              startDrag(e, exercise.word, 'center', e.clientX, e.clientY);
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
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(e, exercise.word, 'center', e.clientX, e.clientY);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              const touch = e.touches[0];
              startDrag(e, exercise.word, 'center', touch.clientX, touch.clientY);
            }}
            className={`cursor-move transition-all ${matchHoverZone === 'center' ? 'scale-110' : ''}`}
            style={{ 
              touchAction: 'none', 
              userSelect: 'none',
              opacity: dragPosition && dragSource.current === 'center' ? 0.3 : 1
            }}
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
            data-corner-option
            data-option-value={option}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              startDrag(e, option, 'corner', e.clientX, e.clientY);
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
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(e, option, 'corner', e.clientX, e.clientY);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              const touch = e.touches[0];
              startDrag(e, option, 'corner', touch.clientX, touch.clientY);
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
            style={{ 
              touchAction: 'none', 
              userSelect: 'none',
              opacity: dragPosition && dragSource.current === 'corner' && draggedText === option ? 0.3 : 1
            }}
          >
            {option}
          </div>
        );
      })}

      {/* Floating drag preview */}
      {dragPosition && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {dragSource.current === 'center' ? (
            <div className={`text-6xl font-bold px-8 py-6 rounded-2xl shadow-lg select-none ${theme.card} ${theme.text} opacity-80`}>
              {draggedText}
            </div>
          ) : (
            <div className={`w-36 h-28 p-3 rounded-xl text-lg font-semibold flex items-center justify-center text-center border-4 border-transparent ${theme.card} ${theme.textSecondary} opacity-80`}>
              {draggedText}
            </div>
          )}
        </div>
      )}
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

//   useEffect(() => {
//     // Clear immediately when exercise changes
//     setMatchDroppedOn(null);
//     setMatchHoverZone(null);
//   }, [currentExercise]);

//   const checkAndSubmit = (draggedAnswer, droppedAnswer, targetOption) => {
//     setMatchDroppedOn(targetOption);
//     handleDrop({ preventDefault: () => {} }, targetOption);
//   };

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
//             <div className={`text-6xl font-bold px-8 py-6 rounded-2xl shadow-lg select-none transition-all ${
//               matchHoverZone === 'center' ? `${theme.card} border-4 border-amber-400` : theme.card
//             } ${theme.text}`}>
//               {exercise.word}
//             </div>
//           </div>
//           <div className={`text-lg ${theme.textSecondary}`}>Drag word to answer or answer to word</div>
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
//                 ? `${theme.card} border-amber-400 border-solid scale-105 ${theme.text}`
//                 : `${theme.card} border-transparent ${theme.textSecondary}`
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
