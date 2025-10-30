import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BuildExercise = ({ 
  exercise, 
  feedback, 
  selectedWords, 
  setSelectedWords,
  draggedItemRef,
  dropZoneActive,
  setDropZoneActive,
  onComplete
}) => {
  const { theme } = useTheme();
  const availableWords = exercise.words.filter(w => !selectedWords.includes(w));
  const [attemptCount, setAttemptCount] = useState(0);
  const [shakingWord, setShakingWord] = useState(null);
  const [wordPositions, setWordPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [draggedWord, setDraggedWord] = useState(null);
  const maxAttempts = 3;

  // Check if two circles overlap
  const checkCollision = (x1, y1, x2, y2, minDist = 20) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < minDist;
  };

  // Initialize random positions with collision detection
  useEffect(() => {
    const findNonCollidingPosition = (placedPositions) => {
      let newX, newY;
      let attempts = 0;
      const maxAttempts = 100;
      let hasCollision;
      
      // eslint-disable-next-line no-loop-func
      do {
        newX = Math.random() * 70 + 15;
        newY = Math.random() * 70 + 15;
        hasCollision = placedPositions.some(pos => checkCollision(newX, newY, pos.x, pos.y, 25));
        attempts++;
      } while (hasCollision && attempts < maxAttempts);
      
      return { x: newX, y: newY };
    };

    const positions = {};
    const placed = [];
    
    availableWords.forEach((word) => {
      const position = findNonCollidingPosition(placed);
      positions[word] = position;
      placed.push(position);
    });
    
    setWordPositions(positions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.english]);

  const validateAndAddWord = (word) => {
    if (!selectedWords.includes(word)) {
      const nextPosition = selectedWords.length;
      const correctWord = exercise.correct[nextPosition];
      
      if (word === correctWord) {
        const newSelected = [...selectedWords, word];
        setSelectedWords(newSelected);
        setAttemptCount(0);
        
        if (newSelected.length === exercise.correct.length) {
          onComplete(true);
        }
      } else {
        setShakingWord(word);
        const newAttempts = attemptCount + 1;
        setAttemptCount(newAttempts);
        
        setTimeout(() => setShakingWord(null), 500);
        
        if (newAttempts >= maxAttempts) {
          onComplete(false);
        }
      }
    }
  };

  const handleWordClick = (word) => {
    if (feedback) return;
    validateAndAddWord(word);
  };

  const handleWordDragStart = (e, word) => {
    if (feedback) return;
    setIsDragging(true);
    setDraggedWord(word);
    draggedItemRef.current = word;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleWordDragEnd = () => {
    setIsDragging(false);
    setDraggedWord(null);
  };

  const handleDropZoneDragOver = (e) => {
    e.preventDefault();
    setDropZoneActive(true);
  };

  const handleDropZoneDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (draggedItemRef.current) {
      validateAndAddWord(draggedItemRef.current);
      draggedItemRef.current = null;
    }
    
    setIsDragging(false);
    setDraggedWord(null);
  };

  const handleSelectedWordClick = (word) => {
    if (feedback) return;
    const wordIndex = selectedWords.indexOf(word);
    setSelectedWords(selectedWords.slice(0, wordIndex));
    setAttemptCount(0);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* English prompt at top */}
      <div className="text-center mb-6">
        <div className={`${theme.textSecondary} mb-2`}>Translate to Spanish:</div>
        <div className={`text-3xl font-bold ${theme.text}`}>{exercise.english}</div>
      </div>

      {/* Construction area */}
      <div 
        data-construction-zone
        onDragOver={handleDropZoneDragOver}
        onDragLeave={() => setDropZoneActive(false)}
        onDrop={handleDropZoneDrop}
        className={`min-h-24 p-4 rounded-2xl border-4 flex flex-wrap gap-3 items-center justify-center transition-all mb-6 ${
          dropZoneActive ? 'border-amber-400 bg-amber-400/10' :
          feedback === "correct" ? 'bg-green-500/20 border-green-500' : 
          feedback === "incorrect" ? 'bg-red-500/20 border-red-500' : 
          `${theme.card} border-transparent`
        }`}
      >
        {selectedWords.length === 0 ? (
          <div className={`${theme.textSecondary} pointer-events-none`}>Tap or drag words to build your sentence</div>
        ) : (
          selectedWords.map((word, idx) => (
            <div
              key={`selected-${word}-${idx}`}
              onClick={() => handleSelectedWordClick(word)}
              className={`px-4 py-2 rounded-xl text-xl font-bold transition cursor-pointer ${
                feedback === "correct"
                  ? "bg-green-500 text-white"
                  : feedback === "incorrect"
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-800 hover:bg-white shadow-md"
              }`}
            >
              {word}
            </div>
          ))
        )}
      </div>

      {/* Floating word bubbles - draggable anywhere */}
      <div className="flex-1 relative">
        {availableWords.map((word) => {
          const pos = wordPositions[word] || { x: 50, y: 50 };
          const isBeingDragged = isDragging && draggedWord === word;
          
          return (
            <div
              key={word}
              draggable={!feedback}
              onClick={() => handleWordClick(word)}
              onDragStart={(e) => {
                handleWordDragStart(e, word);
                const dragImg = e.currentTarget.cloneNode(true);
                dragImg.style.position = 'absolute';
                dragImg.style.top = '-1000px';
                document.body.appendChild(dragImg);
                e.dataTransfer.setDragImage(dragImg, e.currentTarget.offsetWidth / 2, e.currentTarget.offsetHeight / 2);
                setTimeout(() => document.body.removeChild(dragImg), 0);
              }}
              onDrag={(e) => {
                if (e.clientX === 0 && e.clientY === 0) return;
                
                const container = e.currentTarget.parentElement.getBoundingClientRect();
                const x = ((e.clientX - container.left) / container.width) * 100;
                const y = ((e.clientY - container.top) / container.height) * 100;
                
                if (x > 0 && x < 100 && y > 0 && y < 100) {
                  setWordPositions(prev => ({
                    ...prev,
                    [word]: { x, y }
                  }));
                }
              }}
              onDragEnd={(e) => {
                handleWordDragEnd();
                
                const dropZone = document.querySelector('[data-construction-zone]');
                if (dropZone) {
                  const rect = dropZone.getBoundingClientRect();
                  const droppedInZone = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                  );
                  
                  if (droppedInZone) {
                    validateAndAddWord(word);
                  }
                }
              }}
              className={`absolute ${shakingWord === word ? 'animate-shake' : ''} ${isBeingDragged ? 'opacity-70' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: feedback ? 'default' : 'grab',
                transition: isBeingDragged ? 'none' : 'all 0.3s ease',
                zIndex: isBeingDragged ? 1000 : 1
              }}
            >
              <div className={`bg-gradient-to-br ${theme.bubble} text-white font-bold text-2xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all select-none`}>
                {word}
              </div>
            </div>
          );
        })}
      </div>

      {/* Attempt counter */}
      {attemptCount > 0 && attemptCount < maxAttempts && !feedback && (
        <div className={`text-center mt-4 ${theme.accent} font-semibold`}>
          Attempt {attemptCount}/{maxAttempts} - Try again!
        </div>
      )}
    </div>
  );
};

export default BuildExercise;

// import React, { useState, useEffect } from 'react';

// const BuildExercise = ({ 
//   exercise, 
//   feedback, 
//   selectedWords, 
//   setSelectedWords,
//   draggedItemRef,
//   dropZoneActive,
//   setDropZoneActive,
//   onComplete
// }) => {
//   const availableWords = exercise.words.filter(w => !selectedWords.includes(w));
//   const [attemptCount, setAttemptCount] = useState(0);
//   const [shakingWord, setShakingWord] = useState(null);
//   const [wordPositions, setWordPositions] = useState({});
//   const [isDragging, setIsDragging] = useState(false);
//   const [draggedWord, setDraggedWord] = useState(null);
//   const maxAttempts = 3;

//   // Check if two circles overlap
// // Check if two circles overlap
// const checkCollision = (x1, y1, x2, y2, minDist = 20) => {  // Increased from 15 to 20
//   const dx = x1 - x2;
//   const dy = y1 - y2;
//   const distance = Math.sqrt(dx * dx + dy * dy);
//   return distance < minDist;
// };

// // Initialize random positions with collision detection
// useEffect(() => {
//   const findNonCollidingPosition = (placedPositions) => {
//     let newX, newY;
//     let attempts = 0;
//     const maxAttempts = 100;
//     let hasCollision;
    
//     // eslint-disable-next-line no-loop-func
//     do {
//       newX = Math.random() * 70 + 15;
//       newY = Math.random() * 70 + 15;
//       hasCollision = placedPositions.some(pos => checkCollision(newX, newY, pos.x, pos.y, 25));
//       attempts++;
//     } while (hasCollision && attempts < maxAttempts);
    
//     return { x: newX, y: newY };
//   };

//   const positions = {};
//   const placed = [];
  
//   availableWords.forEach((word) => {
//     const position = findNonCollidingPosition(placed);
//     positions[word] = position;
//     placed.push(position);
//   });
  
//   setWordPositions(positions);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [exercise.english]);

//   const validateAndAddWord = (word) => {
//     if (!selectedWords.includes(word)) {
//       const nextPosition = selectedWords.length;
//       const correctWord = exercise.correct[nextPosition];
      
//       if (word === correctWord) {
//         const newSelected = [...selectedWords, word];
//         setSelectedWords(newSelected);
//         setAttemptCount(0);
        
//         if (newSelected.length === exercise.correct.length) {
//           onComplete(true);
//         }
//       } else {
//         setShakingWord(word);
//         const newAttempts = attemptCount + 1;
//         setAttemptCount(newAttempts);
        
//         setTimeout(() => setShakingWord(null), 500);
        
//         if (newAttempts >= maxAttempts) {
//           onComplete(false);
//         }
//       }
//     }
//   };

//   const handleWordClick = (word) => {
//     if (feedback) return;
//     validateAndAddWord(word);
//   };

//   const handleWordDragStart = (e, word) => {
//     if (feedback) return;
//     setIsDragging(true);
//     setDraggedWord(word);
//     draggedItemRef.current = word;
//     e.dataTransfer.effectAllowed = 'move';
//   };

//   const handleWordDragEnd = () => {
//     setIsDragging(false);
//     setDraggedWord(null);
//   };

//   const handleDropZoneDragOver = (e) => {
//     e.preventDefault();
//     setDropZoneActive(true);
//   };

//   const handleDropZoneDrop = (e) => {
//     e.preventDefault();
//     setDropZoneActive(false);
    
//     if (draggedItemRef.current) {
//       validateAndAddWord(draggedItemRef.current);
//       draggedItemRef.current = null;
//     }
    
//     setIsDragging(false);
//     setDraggedWord(null);
//   };

//   const handleSelectedWordClick = (word) => {
//     if (feedback) return;
//     const wordIndex = selectedWords.indexOf(word);
//     setSelectedWords(selectedWords.slice(0, wordIndex));
//     setAttemptCount(0);
//   };

//   return (
//     <div className="flex flex-col h-full relative">
//       {/* English prompt at top */}
//       <div className="text-center mb-6">
//         <div className="text-gray-600 mb-2">Translate to Spanish:</div>
//         <div className="text-3xl font-bold text-stone-800">{exercise.english}</div>
//       </div>

//       {/* Construction area */}
//       <div 
//         onDragOver={handleDropZoneDragOver}
//         onDragLeave={() => setDropZoneActive(false)}
//         onDrop={handleDropZoneDrop}
//         className={`min-h-24 p-4 rounded-2xl border-4 flex flex-wrap gap-3 items-center justify-center transition-all mb-6 ${
//           dropZoneActive ? 'border-amber-400 bg-amber-50' :
//           feedback === "correct" ? 'bg-green-100 border-green-500' : 
//           feedback === "incorrect" ? 'bg-red-100 border-red-500' : 
//           'border-stone-300 bg-stone-50'
//         }`}
//       >
//         {selectedWords.length === 0 ? (
//           <div className="text-stone-400 pointer-events-none">Tap or drag words to build your sentence</div>
//         ) : (
//           selectedWords.map((word, idx) => (
//             <div
//               key={`selected-${word}-${idx}`}
//               onClick={() => handleSelectedWordClick(word)}
//               className={`px-4 py-2 rounded-xl text-xl font-bold transition cursor-pointer ${
//                 feedback === "correct"
//                   ? "bg-green-500 text-white"
//                   : feedback === "incorrect"
//                   ? "bg-red-500 text-white"
//                   : "bg-white text-stone-800 hover:bg-stone-100 shadow-md"
//               }`}
//             >
//               {word}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Floating word bubbles - static until dragged */}
//       <div className="flex-1 relative">
//         {availableWords.map((word) => {
//           const pos = wordPositions[word] || { x: 50, y: 50 };
//           const isBeingDragged = isDragging && draggedWord === word;
          
//           return (
//             <div
//               key={word}
//               draggable={!feedback}
//               onClick={() => handleWordClick(word)}
//               onDragStart={(e) => handleWordDragStart(e, word)}
//               onDragEnd={handleWordDragEnd}
//               className={`absolute ${shakingWord === word ? 'animate-shake' : ''} ${isBeingDragged ? 'opacity-50 scale-110' : ''}`}
//               style={{
//                 left: `${pos.x}%`,
//                 top: `${pos.y}%`,
//                 transform: 'translate(-50%, -50%)',
//                 cursor: feedback ? 'default' : 'grab',
//                 transition: 'opacity 0.2s, transform 0.2s',
//                 zIndex: isBeingDragged ? 1000 : 1
//               }}
//             >
//               <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-2xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all select-none">
//                 {word}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Attempt counter */}
//       {attemptCount > 0 && attemptCount < maxAttempts && !feedback && (
//         <div className="text-center mt-4 text-orange-600 font-semibold">
//           Attempt {attemptCount}/{maxAttempts} - Try again!
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuildExercise;
