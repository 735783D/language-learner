import React, { useState, useEffect } from 'react';

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
  const availableWords = exercise.words.filter(w => !selectedWords.includes(w));
  const [attemptCount, setAttemptCount] = useState(0);
  const [shakingWord, setShakingWord] = useState(null);
  const [wordPositions, setWordPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [draggedWord, setDraggedWord] = useState(null);
  const maxAttempts = 3;

  // Check if two circles overlap
// Check if two circles overlap
const checkCollision = (x1, y1, x2, y2, minDist = 20) => {  // Increased from 15 to 20
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
        <div className="text-gray-600 mb-2">Translate to Spanish:</div>
        <div className="text-3xl font-bold text-stone-800">{exercise.english}</div>
      </div>

      {/* Construction area */}
      <div 
        onDragOver={handleDropZoneDragOver}
        onDragLeave={() => setDropZoneActive(false)}
        onDrop={handleDropZoneDrop}
        className={`min-h-24 p-4 rounded-2xl border-4 flex flex-wrap gap-3 items-center justify-center transition-all mb-6 ${
          dropZoneActive ? 'border-amber-400 bg-amber-50' :
          feedback === "correct" ? 'bg-green-100 border-green-500' : 
          feedback === "incorrect" ? 'bg-red-100 border-red-500' : 
          'border-stone-300 bg-stone-50'
        }`}
      >
        {selectedWords.length === 0 ? (
          <div className="text-stone-400 pointer-events-none">Tap or drag words to build your sentence</div>
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
                  : "bg-white text-stone-800 hover:bg-stone-100 shadow-md"
              }`}
            >
              {word}
            </div>
          ))
        )}
      </div>

      {/* Floating word bubbles - static until dragged */}
      <div className="flex-1 relative">
        {availableWords.map((word) => {
          const pos = wordPositions[word] || { x: 50, y: 50 };
          const isBeingDragged = isDragging && draggedWord === word;
          
          return (
            <div
              key={word}
              draggable={!feedback}
              onClick={() => handleWordClick(word)}
              onDragStart={(e) => handleWordDragStart(e, word)}
              onDragEnd={handleWordDragEnd}
              className={`absolute ${shakingWord === word ? 'animate-shake' : ''} ${isBeingDragged ? 'opacity-50 scale-110' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: feedback ? 'default' : 'grab',
                transition: 'opacity 0.2s, transform 0.2s',
                zIndex: isBeingDragged ? 1000 : 1
              }}
            >
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-2xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all select-none">
                {word}
              </div>
            </div>
          );
        })}
      </div>

      {/* Attempt counter */}
      {attemptCount > 0 && attemptCount < maxAttempts && !feedback && (
        <div className="text-center mt-4 text-orange-600 font-semibold">
          Attempt {attemptCount}/{maxAttempts} - Try again!
        </div>
      )}
    </div>
  );
};

export default BuildExercise;


// import React, { useState } from 'react';

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
//   const maxAttempts = 3;

//   const validateAndAddWord = (word) => {
//     if (!selectedWords.includes(word)) {
//       const nextPosition = selectedWords.length;
//       const correctWord = exercise.correct[nextPosition];
      
//       if (word === correctWord) {
//         // Correct!
//         const newSelected = [...selectedWords, word];
//         setSelectedWords(newSelected);
//         setAttemptCount(0);
        
//         // Check if complete
//         if (newSelected.length === exercise.correct.length) {
//           onComplete(true);
//         }
//       } else {
//         // Wrong - shake it
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

//   const handleWordDrop = (e) => {
//     e.preventDefault();
//     setDropZoneActive(false);
    
//     if (draggedItemRef.current && typeof draggedItemRef.current === 'string') {
//       validateAndAddWord(draggedItemRef.current);
//       draggedItemRef.current = null;
//     }
//   };

//   const handleWordClick = (word) => {
//     if (feedback) return;
//     validateAndAddWord(word);
//   };

//   const handleSelectedWordClick = (word) => {
//     if (feedback) return;
//     const wordIndex = selectedWords.indexOf(word);
//     setSelectedWords(selectedWords.slice(0, wordIndex));
//     setAttemptCount(0);
//   };

//   return (
//     <div className="flex flex-col h-full py-8">
//       <div className="text-center mb-8">
//         <div className="text-gray-600 mb-2">Translate to Spanish:</div>
//         <div className="text-3xl font-bold text-gray-900">{exercise.english}</div>
//       </div>

//       <div className="flex-1 flex flex-col justify-center space-y-8">
//         {/* Construction Zone */}
//         <div
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDropZoneActive(true);
//           }}
//           onDrop={handleWordDrop}
//           className={`min-h-32 p-6 rounded-xl border-4 border-dashed flex flex-wrap gap-3 items-center justify-center transition-all ${
//             dropZoneActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
//           } ${feedback === "correct" ? 'bg-green-100 border-green-500' : ''} ${feedback === "incorrect" ? 'bg-red-100 border-red-500' : ''}`}
//         >
//           {selectedWords.length === 0 ? (
//             <div className="text-gray-400 pointer-events-none">Click or drag words to build your sentence</div>
//           ) : (
//             selectedWords.map((word, idx) => (
//               <div
//                 key={`selected-${word}-${idx}`}
//                 onClick={() => handleSelectedWordClick(word)}
//                 className={`px-4 py-2 rounded-lg text-xl font-semibold transition cursor-pointer ${
//                   feedback === "correct"
//                     ? "bg-green-500 text-white"
//                     : feedback === "incorrect"
//                     ? "bg-red-500 text-white"
//                     : "bg-white text-gray-800 hover:bg-gray-100 shadow"
//                 }`}
//               >
//                 {word}
//               </div>
//             ))
//           )}
//         </div>

// {/* Available Words */}
//         <div className="flex flex-wrap gap-3 justify-center">
//           {availableWords.map((word, idx) => (
//             <div
//               key={`available-${word}-${idx}`}
//               draggable="true"
//               onDragStart={(e) => {
//                 e.dataTransfer.effectAllowed = 'move';
//                 draggedItemRef.current = word;
//               }}
//               onClick={() => handleWordClick(word)}
//               style={{touchAction: 'none', WebkitUserDrag: 'element'}}
//               className={`px-5 py-3 bg-blue-500 text-white rounded-xl text-xl font-semibold cursor-pointer hover:bg-blue-600 transition shadow-md active:scale-95 ${
//                 shakingWord === word ? 'animate-shake' : ''
//               }`}
//             >
//               {word}
//             </div>
//           ))}
//         </div>

//         {attemptCount > 0 && attemptCount < maxAttempts && !feedback && (
//           <div className="text-center text-orange-600 font-semibold">
//             Attempt {attemptCount}/{maxAttempts} - Try again!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuildExercise;

