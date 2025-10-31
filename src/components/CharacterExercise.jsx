import React, { useRef, useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const CharacterExercise = ({ exercise, dropZoneActive, setDropZoneActive, handleDragStart, handleDrop, draggedItemRef }) => {
  const { theme } = useTheme();
  const isDragging = useRef(false);
  const dragData = useRef(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e, char, clientX, clientY) => {
    console.log('Starting drag:', char, 'draggedItemRef:', draggedItemRef);
    isDragging.current = true;
    dragData.current = char;
    
    // Calculate offset from element center
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    setOffset({
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2)
    });
    
    // Set initial position
    setDragPosition({ x: clientX - (clientX - (rect.left + rect.width / 2)), y: clientY - (clientY - (rect.top + rect.height / 2)) });
    
    // Only call handleDragStart for actual drag events
    if (e.dataTransfer) {
      handleDragStart(e, char);
    } else if (draggedItemRef) {
      // For mouse/touch, set the ref immediately
      draggedItemRef.current = char;
      console.log('Set draggedItemRef.current to:', char);
    }
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging.current) return;
    setDragPosition({ x: clientX - offset.x, y: clientY - offset.y });
    
    // Check if over drop zone
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

  // Set up document-level event listeners for mouse/touch move and end
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full py-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div
          draggable
          onDragStart={(e) => {
            startDrag(e, exercise.char, e.clientX, e.clientY);
            setDropZoneActive(false);
          }}
          onDragEnd={(e) => {
            setDropZoneActive(false);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            startDrag(e, exercise.char, e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            startDrag(e, exercise.char, touch.clientX, touch.clientY);
          }}
          className="cursor-move touch-none relative"
          style={{ 
            touchAction: 'none', 
            userSelect: 'none',
            opacity: dragPosition ? 0.3 : 1
          }}
        >
          <div className={`text-9xl font-bold select-none ${theme.accent}`}>{exercise.char}</div>
        </div>
        <div className="space-y-3 text-center">
          <div className={`text-xl ${theme.textSecondary}`}>
            Sounds like: <span className="font-semibold">{exercise.sound}</span>
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

      {/* Floating drag preview for mouse/touch */}
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
            {exercise.char}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterExercise;

// import React from 'react';
// import { Check } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';

// const CharacterExercise = ({ exercise, dropZoneActive, setDropZoneActive, handleDragStart, handleDrop }) => {
//   const { theme } = useTheme();

//   return (
//     <div className="flex flex-col items-center justify-between h-full py-8">
//       <div className="flex-1 flex flex-col items-center justify-center space-y-6">
//         <div
//           draggable
//           onDragStart={(e) => handleDragStart(e, exercise.char)}
//           className="cursor-move touch-none"
//         >
//           <div className={`text-9xl font-bold select-none ${theme.accent}`}>{exercise.char}</div>
//         </div>
//         <div className="space-y-3 text-center">
//           <div className={`text-xl ${theme.textSecondary}`}>
//             Sounds like: <span className="font-semibold">{exercise.sound}</span>
//           </div>
//           <div className={`${theme.card} p-5 rounded-xl`}>
//             <div className={`text-2xl font-bold ${theme.text} mb-1`}>{exercise.example}</div>
//             <div className={`text-lg ${theme.textSecondary}`}>{exercise.translation}</div>
//           </div>
//         </div>
//         <div className={`text-sm ${theme.textSecondary} mt-4`}>Drag to the circle below to continue</div>
//       </div>
      
//       <div
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
//         onDrop={(e) => handleDrop(e)}
//         className={`w-40 h-40 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${
//           dropZoneActive ? 'border-amber-400 bg-amber-400/20 scale-110' : `border-transparent ${theme.card}`
//         }`}
//       >
//         <Check className={`w-16 h-16 ${dropZoneActive ? 'text-amber-400' : theme.textSecondary}`} />
//       </div>
//     </div>
//   );
// };

// export default CharacterExercise;