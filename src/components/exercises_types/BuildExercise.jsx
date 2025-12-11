import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

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
  const dragStartPos = useRef(null);
  const maxAttempts = 3;

  const checkCollision = (x1, y1, x2, y2, minDist = 20) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < minDist;
  };

  useEffect(() => {
    const hasAnyCollision = (x, y, placedPositions) => {
      return placedPositions.some(pos => checkCollision(x, y, pos.x, pos.y, 25));
    };

    const findNonCollidingPosition = (placedPositions) => {
      let newX, newY;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        newX = Math.random() * 70 + 15;
        newY = Math.random() * 70 + 15;
        attempts++;
      } while (hasAnyCollision(newX, newY, placedPositions) && attempts < maxAttempts);
      
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
    if (feedback || isDragging) return;
    validateAndAddWord(word);
  };

  const startDrag = (word, clientX, clientY) => {
    if (feedback) return;
    setIsDragging(true);
    setDraggedWord(word);
    draggedItemRef.current = word;
    dragStartPos.current = { x: clientX, y: clientY };
  };

  const moveDrag = (clientX, clientY, container) => {
    if (!isDragging) return;
    
    const x = ((clientX - container.left) / container.width) * 100;
    const y = ((clientY - container.top) / container.height) * 100;
    
    if (x > 0 && x < 100 && y > 0 && y < 100) {
      setWordPositions(prev => ({
        ...prev,
        [draggedWord]: { x, y }
      }));
    }
  };

  const endDrag = (clientX, clientY) => {
    if (!isDragging) return;
    
    const dropZone = document.querySelector('[data-construction-zone]');
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const droppedInZone = (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
      
      if (droppedInZone) {
        validateAndAddWord(draggedWord);
      }
    }
    
    setIsDragging(false);
    setDraggedWord(null);
    draggedItemRef.current = null;
    dragStartPos.current = null;
  };

  const handleSelectedWordClick = (word) => {
    if (feedback) return;
    const wordIndex = selectedWords.indexOf(word);
    setSelectedWords(selectedWords.slice(0, wordIndex));
    setAttemptCount(0);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="text-center mb-6">
        <div className={`${theme.textSecondary} mb-2`}>Translate:</div>
        <div className={`text-3xl font-bold ${theme.text}`}>{exercise.english}</div>
      </div>

      <div 
        data-construction-zone
        className={`min-h-24 p-4 rounded-2xl border-4 flex flex-wrap gap-3 items-center justify-center transition-all mb-6 ${
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

      <div className="flex-1 relative">
        {availableWords.map((word) => {
          const pos = wordPositions[word] || { x: 50, y: 50 };
          const isBeingDragged = isDragging && draggedWord === word;
          
          return (
            <div
              key={word}
              onClick={() => handleWordClick(word)}
              onMouseDown={(e) => {
                e.preventDefault();
                startDrag(word, e.clientX, e.clientY);
              }}
              onMouseMove={(e) => {
                if (isBeingDragged) {
                  const container = e.currentTarget.parentElement.getBoundingClientRect();
                  moveDrag(e.clientX, e.clientY, container);
                }
              }}
              onMouseUp={(e) => {
                endDrag(e.clientX, e.clientY);
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                startDrag(word, touch.clientX, touch.clientY);
              }}
              onTouchMove={(e) => {
                if (isBeingDragged) {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const container = e.currentTarget.parentElement.getBoundingClientRect();
                  moveDrag(touch.clientX, touch.clientY, container);
                }
              }}
              onTouchEnd={(e) => {
                const touch = e.changedTouches[0];
                endDrag(touch.clientX, touch.clientY);
              }}
              className={`absolute ${shakingWord === word ? 'animate-shake' : ''} ${isBeingDragged ? 'opacity-70' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: feedback ? 'default' : 'grab',
                transition: isBeingDragged ? 'none' : 'all 0.3s ease',
                zIndex: isBeingDragged ? 1000 : 1,
                touchAction: 'none',
                userSelect: 'none'
              }}
            >
              <div className={`bg-gradient-to-br ${theme.bubble} text-white font-bold text-2xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all select-none`}>
                {word}
              </div>
            </div>
          );
        })}
      </div>

      {attemptCount > 0 && attemptCount < maxAttempts && !feedback && (
        <div className={`text-center mt-4 ${theme.accent} font-semibold`}>
          Attempt {attemptCount}/{maxAttempts} - Try again!
        </div>
      )}
    </div>
  );
};

export default BuildExercise;