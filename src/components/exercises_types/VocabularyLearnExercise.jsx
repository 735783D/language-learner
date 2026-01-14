import React, { useState, useRef, useEffect } from 'react';
import { Check, Volume2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const VocabularyLearnExercise = ({ 
  word,
  dropZoneActive,
  setDropZoneActive,
  handleDragStart,
  handleDrop,
  draggedItemRef
}) => {
  const { theme } = useTheme();
  const [dragPosition, setDragPosition] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const audioRef = useRef(null);

  // Play audio if available
  const playSound = () => {
    if (word?.sound_file && word.sound_file.trim() !== '' && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  // Auto-play audio when word changes
  useEffect(() => {
    // Small delay to ensure audio element is loaded
    const timer = setTimeout(() => {
      playSound();
    }, 100);

    return () => clearTimeout(timer);
  }, [word]); // Re-run whenever the word changes

  const startDrag = (e, mvskoke, clientX, clientY) => {
    isDragging.current = true;
    draggedItemRef.current = mvskoke;
    
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    setOffset({
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2)
    });
    
    setDragPosition({ 
      x: clientX - (clientX - (rect.left + rect.width / 2)), 
      y: clientY - (clientY - (rect.top + rect.height / 2)) 
    });
    
    if (e.dataTransfer) {
      handleDragStart(e, mvskoke);
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
      
      if (droppedInZone) {
        handleDrop(e);
      }
    }
    
    isDragging.current = false;
    setDragPosition(null);
    setDropZoneActive(false);
  };

  // Global mouse/touch event listeners
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-between px-8">
      {/* Audio element */}
      {word?.sound_file && word.sound_file.trim() !== '' && (
        <audio ref={audioRef} src={encodeURI(word.sound_file)} preload="auto" />
      )}
      
      {/* Top section - draggable word and translation */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {/* Draggable Mvskoke word */}
        <div
          draggable
          onDragStart={(e) => {
            startDrag(e, word.mvskoke, e.clientX, e.clientY);
            setDropZoneActive(false);
          }}
          onDragEnd={(e) => {
            setDropZoneActive(false);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            startDrag(e, word.mvskoke, e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            startDrag(e, word.mvskoke, touch.clientX, touch.clientY);
          }}
          className="cursor-move touch-none relative"
          style={{ 
            touchAction: 'none', 
            userSelect: 'none',
            opacity: dragPosition ? 0.3 : 1
          }}
        >
          <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold select-none ${theme.accent}`}>
            {word.mvskoke}
          </div>
        </div>

        {/* Translation with audio button */}
        <div className="space-y-3 text-center">
          <div className={`text-2xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
            <span className="font-semibold">{word.english}</span>
            {word.sound_file && word.sound_file.trim() !== '' && (
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

        <div className={`text-sm ${theme.textSecondary} mt-4`}>
          Drag to the circle below to continue
        </div>
      </div>

      {/* Drop zone circle */}
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
          dropZoneActive 
            ? 'border-amber-400 bg-amber-400/20 scale-110' 
            : `border-transparent ${theme.card}`
        }`}
      >
        <Check className={`w-16 h-16 ${dropZoneActive ? 'text-amber-400' : theme.textSecondary}`} />
      </div>

      {/* Drag ghost for mobile */}
      {dragPosition && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold select-none ${theme.accent} opacity-80`}>
            {word.mvskoke}
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyLearnExercise;




// import React, { useState, useRef, useEffect } from 'react';
// import { Check, Volume2 } from 'lucide-react';
// import { useTheme } from '../../contexts/ThemeContext';

// const VocabularyLearnExercise = ({ 
//   word,
//   dropZoneActive,
//   setDropZoneActive,
//   handleDragStart,
//   handleDrop,
//   draggedItemRef
// }) => {
//   const { theme } = useTheme();
//   const [dragPosition, setDragPosition] = useState(null);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const isDragging = useRef(false);
//   const audioRef = useRef(null);

//   // Play audio if available
//   const playSound = () => {
//     if (word?.sound_file && word.sound_file.trim() !== '' && audioRef.current) {
//       audioRef.current.play().catch(err => console.log('Audio play failed:', err));
//     }
//   };

//   const startDrag = (e, mvskoke, clientX, clientY) => {
//     isDragging.current = true;
//     draggedItemRef.current = mvskoke;
    
//     const target = e.currentTarget;
//     const rect = target.getBoundingClientRect();
//     setOffset({
//       x: clientX - (rect.left + rect.width / 2),
//       y: clientY - (rect.top + rect.height / 2)
//     });
    
//     setDragPosition({ 
//       x: clientX - (clientX - (rect.left + rect.width / 2)), 
//       y: clientY - (clientY - (rect.top + rect.height / 2)) 
//     });
    
//     if (e.dataTransfer) {
//       handleDragStart(e, mvskoke);
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
      
//       if (droppedInZone) {
//         handleDrop(e);
//       }
//     }
    
//     isDragging.current = false;
//     setDragPosition(null);
//     setDropZoneActive(false);
//   };

//   // Global mouse/touch event listeners
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
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="h-full w-full flex flex-col items-center justify-between px-8">
//       {/* Audio element */}
//       {word?.sound_file && word.sound_file.trim() !== '' && (
//         <audio ref={audioRef} src={encodeURI(word.sound_file)} preload="auto" />
//       )}
      
//       {/* Top section - draggable word and translation */}
//       <div className="flex-1 flex flex-col items-center justify-center space-y-6">
//         {/* Draggable Mvskoke word */}
//         <div
//           draggable
//           onDragStart={(e) => {
//             startDrag(e, word.mvskoke, e.clientX, e.clientY);
//             setDropZoneActive(false);
//           }}
//           onDragEnd={(e) => {
//             setDropZoneActive(false);
//           }}
//           onMouseDown={(e) => {
//             e.preventDefault();
//             startDrag(e, word.mvskoke, e.clientX, e.clientY);
//           }}
//           onTouchStart={(e) => {
//             e.preventDefault();
//             const touch = e.touches[0];
//             startDrag(e, word.mvskoke, touch.clientX, touch.clientY);
//           }}
//           className="cursor-move touch-none relative"
//           style={{ 
//             touchAction: 'none', 
//             userSelect: 'none',
//             opacity: dragPosition ? 0.3 : 1
//           }}
//         >
//           <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold select-none ${theme.accent}`}>
//             {word.mvskoke}
//           </div>
//         </div>

//         {/* Translation with audio button */}
//         <div className="space-y-3 text-center">
//           <div className={`text-2xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
//             <span className="font-semibold">{word.english}</span>
//             {word.sound_file && word.sound_file.trim() !== '' && (
//               <button
//                 onClick={playSound}
//                 className={`p-2 rounded-full ${theme.card} hover:scale-110 transition-transform`}
//                 aria-label="Play sound"
//               >
//                 <Volume2 className={`w-6 h-6 ${theme.accent}`} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className={`text-sm ${theme.textSecondary} mt-4`}>
//           Drag to the circle below to continue
//         </div>
//       </div>

//       {/* Drop zone circle */}
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
//           dropZoneActive 
//             ? 'border-amber-400 bg-amber-400/20 scale-110' 
//             : `border-transparent ${theme.card}`
//         }`}
//       >
//         <Check className={`w-16 h-16 ${dropZoneActive ? 'text-amber-400' : theme.textSecondary}`} />
//       </div>

//       {/* Drag ghost for mobile */}
//       {dragPosition && (
//         <div
//           className="fixed pointer-events-none z-50"
//           style={{
//             left: dragPosition.x,
//             top: dragPosition.y,
//             transform: 'translate(-50%, -50%)'
//           }}
//         >
//           <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold select-none ${theme.accent} opacity-80`}>
//             {word.mvskoke}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VocabularyLearnExercise;