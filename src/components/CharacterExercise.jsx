import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Check, Volume2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const CharacterExercise = ({ exercise, dropZoneActive, setDropZoneActive, handleDragStart, handleDrop, draggedItemRef }) => {
  const { theme } = useTheme();
  const isDragging = useRef(false);
  const dragData = useRef(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  // Support both single letters (char) and multi-letter combinations (combo)
  const displayChar = exercise.char || exercise.combo;

  const startDrag = (e, char, clientX, clientY) => {
    console.log('Starting drag:', char, 'draggedItemRef:', draggedItemRef);
    isDragging.current = true;
    dragData.current = char;
    
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    setOffset({
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2)
    });
    
    setDragPosition({ x: clientX - (clientX - (rect.left + rect.width / 2)), y: clientY - (clientY - (rect.top + rect.height / 2)) });
    
    if (e.dataTransfer) {
      handleDragStart(e, char);
    } else if (draggedItemRef) {
      draggedItemRef.current = char;
      console.log('Set draggedItemRef.current to:', char);
    }
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging.current) return;
    setDragPosition({ x: clientX - offset.x, y: clientY - offset.y });
    
    const dropZone = document.querySelector('[data-drop-circle]');
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const isOver = (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
      setDropZoneActive(isOver);
    }
  };

  const endDrag = (e, clientX, clientY) => {
    console.log('Ending drag, isDragging:', isDragging.current);
    if (!isDragging.current) return;
    
    const dropZone = document.querySelector('[data-drop-circle]');
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const droppedInZone = (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
      
      console.log('Dropped in zone:', droppedInZone);
      
      if (droppedInZone) {
        handleDrop(e);
      }
    }
    
    isDragging.current = false;
    dragData.current = null;
    setDragPosition(null);
    setDropZoneActive(false);
  };

  const playSound = useCallback(() => {
    console.log('playSound called');
    console.log('exercise.sound_file:', exercise.sound_file);
    console.log('audioRef.current:', audioRef.current);
    
    if (exercise.sound_file && audioRef.current) {
      console.log('Attempting to play:', exercise.sound_file);
      audioRef.current.play()
        .then(() => console.log('Audio played successfully'))
        .catch(err => {
          console.log('Audio play failed:', err);
        });
    } else {
      console.log('Cannot play - missing sound_file or audioRef');
    }
  }, [exercise.sound_file]);

  useEffect(() => {
    console.log('useEffect triggered, exercise:', exercise);
    if (exercise.sound_file && audioRef.current) {
      console.log('Loading audio file...');
      audioRef.current.load();
      const timer = setTimeout(() => {
        playSound();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      console.log('No sound file for this exercise');
    }
  }, [exercise, playSound]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        e.preventDefault();
        moveDrag(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = (e) => {
      if (isDragging.current) {
        endDrag(e, e.clientX, e.clientY);
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
        endDrag(e, touch.clientX, touch.clientY);
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
  }, );

  return (
    <div className="flex flex-col items-center justify-between h-full py-8">
      {exercise.sound_file && (
        <audio ref={audioRef} src={encodeURI(exercise.sound_file)} preload="auto" />
      )}

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div
          draggable
          onDragStart={(e) => {
            startDrag(e, displayChar, e.clientX, e.clientY);
            setDropZoneActive(false);
          }}
          onDragEnd={(e) => {
            setDropZoneActive(false);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            startDrag(e, displayChar, e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            startDrag(e, displayChar, touch.clientX, touch.clientY);
          }}
          className="cursor-move touch-none relative"
          style={{ 
            touchAction: 'none', 
            userSelect: 'none',
            opacity: dragPosition ? 0.3 : 1
          }}
        >
          <div className={`text-9xl font-bold select-none ${theme.accent}`}>{displayChar}</div>
        </div>
        <div className="space-y-3 text-center">
          <div className={`text-xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
            <span>Sounds like: <span className="font-semibold">{exercise.sound}</span></span>
            {exercise.sound_file && (
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
        <div className="space-y-3 text-center">
          <div className={`text-xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
            <span>English like: <span className="font-semibold">{exercise.e_sound}</span></span>
          </div>

          <div className={`${theme.card} p-5 rounded-xl`}>
            <div className={`text-2xl font-bold ${theme.text} mb-1`}>{exercise.example}</div>
            <div className={`text-lg ${theme.textSecondary}`}>{exercise.translation}</div>
          </div>
        </div>
        <div className={`text-sm ${theme.textSecondary} mt-4`}>Drag to the circle below to continue</div>
      </div>
      
      <div
        data-drop-circle
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropZoneActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(e);
        }}
        className={`w-40 h-40 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${
          dropZoneActive ? 'border-amber-400 bg-amber-400/20 scale-110' : `border-transparent ${theme.card}`
        }`}
      >
        <Check className={`w-16 h-16 ${dropZoneActive ? 'text-amber-400' : theme.textSecondary}`} />
      </div>

      {dragPosition && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className={`text-9xl font-bold select-none ${theme.accent} opacity-80`}>
            {displayChar}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterExercise;


// import React, { useRef, useState, useEffect, useCallback } from 'react';
// import { Check, Volume2 } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';

// const CharacterExercise = ({ exercise, dropZoneActive, setDropZoneActive, handleDragStart, handleDrop, draggedItemRef }) => {
//   const { theme } = useTheme();
//   const isDragging = useRef(false);
//   const dragData = useRef(null);
//   const [dragPosition, setDragPosition] = useState(null);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const audioRef = useRef(null);

//   const startDrag = (e, char, clientX, clientY) => {
//     console.log('Starting drag:', char, 'draggedItemRef:', draggedItemRef);
//     isDragging.current = true;
//     dragData.current = char;
    
//     const target = e.currentTarget;
//     const rect = target.getBoundingClientRect();
//     setOffset({
//       x: clientX - (rect.left + rect.width / 2),
//       y: clientY - (rect.top + rect.height / 2)
//     });
    
//     setDragPosition({ x: clientX - (clientX - (rect.left + rect.width / 2)), y: clientY - (clientY - (rect.top + rect.height / 2)) });
    
//     if (e.dataTransfer) {
//       handleDragStart(e, char);
//     } else if (draggedItemRef) {
//       draggedItemRef.current = char;
//       console.log('Set draggedItemRef.current to:', char);
//     }
//   };

//   const moveDrag = (clientX, clientY) => {
//     if (!isDragging.current) return;
//     setDragPosition({ x: clientX - offset.x, y: clientY - offset.y });
    
//     const dropZone = document.querySelector('[data-drop-circle]');
//     if (dropZone) {
//       const rect = dropZone.getBoundingClientRect();
//       const isOver = (
//         clientX >= rect.left &&
//         clientX <= rect.right &&
//         clientY >= rect.top &&
//         clientY <= rect.bottom
//       );
//       setDropZoneActive(isOver);
//     }
//   };

//   const endDrag = (e, clientX, clientY) => {
//     console.log('Ending drag, isDragging:', isDragging.current);
//     if (!isDragging.current) return;
    
//     const dropZone = document.querySelector('[data-drop-circle]');
//     if (dropZone) {
//       const rect = dropZone.getBoundingClientRect();
//       const droppedInZone = (
//         clientX >= rect.left &&
//         clientX <= rect.right &&
//         clientY >= rect.top &&
//         clientY <= rect.bottom
//       );
      
//       console.log('Dropped in zone:', droppedInZone);
      
//       if (droppedInZone) {
//         handleDrop(e);
//       }
//     }
    
//     isDragging.current = false;
//     dragData.current = null;
//     setDragPosition(null);
//     setDropZoneActive(false);
//   };

//   const playSound = useCallback(() => {
//     if (exercise.sound_file && audioRef.current) {
//       audioRef.current.play().catch(err => {
//         console.log('Audio play failed (this is normal on first load):', err);
//       });
//     }
//   }, [exercise.sound_file]);

//   useEffect(() => {
//     if (exercise.sound_file && audioRef.current) {
//       audioRef.current.load();
//       const timer = setTimeout(() => {
//         playSound();
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [exercise, playSound]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isDragging.current) {
//         e.preventDefault();
//         moveDrag(e.clientX, e.clientY);
//       }
//     };

//     const handleMouseUp = (e) => {
//       if (isDragging.current) {
//         endDrag(e, e.clientX, e.clientY);
//       }
//     };

//     const handleTouchMove = (e) => {
//       if (isDragging.current) {
//         e.preventDefault();
//         const touch = e.touches[0];
//         moveDrag(touch.clientX, touch.clientY);
//       }
//     };

//     const handleTouchEnd = (e) => {
//       if (isDragging.current) {
//         const touch = e.changedTouches[0];
//         endDrag(e, touch.clientX, touch.clientY);
//       }
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//     document.addEventListener('touchmove', handleTouchMove, { passive: false });
//     document.addEventListener('touchend', handleTouchEnd);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleTouchEnd);
//     };
//   });

//   return (
//     <div className="flex flex-col items-center justify-between h-full py-8">
//       {exercise.sound_file && (
//         <audio ref={audioRef} src={exercise.sound_file} preload="auto" />
//       )}

//       <div className="flex-1 flex flex-col items-center justify-center space-y-6">
//         <div
//           draggable
//           onDragStart={(e) => {
//             startDrag(e, exercise.char, e.clientX, e.clientY);
//             setDropZoneActive(false);
//           }}
//           onDragEnd={(e) => {
//             setDropZoneActive(false);
//           }}
//           onMouseDown={(e) => {
//             e.preventDefault();
//             startDrag(e, exercise.char, e.clientX, e.clientY);
//           }}
//           onTouchStart={(e) => {
//             e.preventDefault();
//             const touch = e.touches[0];
//             startDrag(e, exercise.char, touch.clientX, touch.clientY);
//           }}
//           className="cursor-move touch-none relative"
//           style={{ 
//             touchAction: 'none', 
//             userSelect: 'none',
//             opacity: dragPosition ? 0.3 : 1
//           }}
//         >
//           <div className={`text-9xl font-bold select-none ${theme.accent}`}>{exercise.char}</div>
//         </div>
//         <div className="space-y-3 text-center">
//           <div className={`text-xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
//             <span>Sounds like: <span className="font-semibold">{exercise.sound}</span></span>
//             {exercise.sound_file && (
//               <button
//                 onClick={playSound}
//                 className={`p-2 rounded-full ${theme.card} hover:scale-110 transition-transform`}
//                 aria-label="Play sound"
//               >
//                 <Volume2 className={`w-6 h-6 ${theme.accent}`} />
//               </button>
//             )}
//           </div>
//           <div className={`${theme.card} p-5 rounded-xl`}>
//             <div className={`text-2xl font-bold ${theme.text} mb-1`}>{exercise.example}</div>
//             <div className={`text-lg ${theme.textSecondary}`}>{exercise.translation}</div>
//           </div>
//         </div>
//         <div className={`text-sm ${theme.textSecondary} mt-4`}>Drag to the circle below to continue</div>
//       </div>
      
//       <div
//         data-drop-circle
//         onDragOver={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setDropZoneActive(true);
//         }}
//         onDragEnter={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setDropZoneActive(true);
//         }}
//         onDragLeave={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setDropZoneActive(false);
//         }}
//         onDrop={(e) => {
//           e.preventDefault();
//           handleDrop(e);
//         }}
//         className={`w-40 h-40 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${
//           dropZoneActive ? 'border-amber-400 bg-amber-400/20 scale-110' : `border-transparent ${theme.card}`
//         }`}
//       >
//         <Check className={`w-16 h-16 ${dropZoneActive ? 'text-amber-400' : theme.textSecondary}`} />
//       </div>

//       {dragPosition && (
//         <div
//           className="fixed pointer-events-none z-50"
//           style={{
//             left: dragPosition.x,
//             top: dragPosition.y,
//             transform: 'translate(-50%, -50%)'
//           }}
//         >
//           <div className={`text-9xl font-bold select-none ${theme.accent} opacity-80`}>
//             {exercise.char}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CharacterExercise;
