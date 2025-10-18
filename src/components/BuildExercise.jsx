import React, { useState } from 'react';

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
  const maxAttempts = 3;

  const validateAndAddWord = (word) => {
    if (!selectedWords.includes(word)) {
      const nextPosition = selectedWords.length;
      const correctWord = exercise.correct[nextPosition];
      
      if (word === correctWord) {
        // Correct!
        const newSelected = [...selectedWords, word];
        setSelectedWords(newSelected);
        setAttemptCount(0);
        
        // Check if complete
        if (newSelected.length === exercise.correct.length) {
          onComplete(true);
        }
      } else {
        // Wrong - shake it
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

  const handleWordDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (draggedItemRef.current && typeof draggedItemRef.current === 'string') {
      validateAndAddWord(draggedItemRef.current);
      draggedItemRef.current = null;
    }
  };

  const handleWordClick = (word) => {
    if (feedback) return;
    validateAndAddWord(word);
  };

  const handleSelectedWordClick = (word) => {
    if (feedback) return;
    const wordIndex = selectedWords.indexOf(word);
    setSelectedWords(selectedWords.slice(0, wordIndex));
    setAttemptCount(0);
  };

  return (
    <div className="flex flex-col h-full py-8">
      <div className="text-center mb-8">
        <div className="text-gray-600 mb-2">Translate to Spanish:</div>
        <div className="text-3xl font-bold text-gray-900">{exercise.english}</div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-8">
        {/* Construction Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDropZoneActive(true);
          }}
          onDrop={handleWordDrop}
          className={`min-h-32 p-6 rounded-xl border-4 border-dashed flex flex-wrap gap-3 items-center justify-center transition-all ${
            dropZoneActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
          } ${feedback === "correct" ? 'bg-green-100 border-green-500' : ''} ${feedback === "incorrect" ? 'bg-red-100 border-red-500' : ''}`}
        >
          {selectedWords.length === 0 ? (
            <div className="text-gray-400 pointer-events-none">Click or drag words to build your sentence</div>
          ) : (
            selectedWords.map((word, idx) => (
              <div
                key={`selected-${word}-${idx}`}
                onClick={() => handleSelectedWordClick(word)}
                className={`px-4 py-2 rounded-lg text-xl font-semibold transition cursor-pointer ${
                  feedback === "correct"
                    ? "bg-green-500 text-white"
                    : feedback === "incorrect"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100 shadow"
                }`}
              >
                {word}
              </div>
            ))
          )}
        </div>

{/* Available Words */}
        <div className="flex flex-wrap gap-3 justify-center">
          {availableWords.map((word, idx) => (
            <div
              key={`available-${word}-${idx}`}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                draggedItemRef.current = word;
              }}
              onClick={() => handleWordClick(word)}
              style={{touchAction: 'none', WebkitUserDrag: 'element'}}
              className={`px-5 py-3 bg-blue-500 text-white rounded-xl text-xl font-semibold cursor-pointer hover:bg-blue-600 transition shadow-md active:scale-95 ${
                shakingWord === word ? 'animate-shake' : ''
              }`}
            >
              {word}
            </div>
          ))}
        </div>

        {attemptCount > 0 && attemptCount < maxAttempts && !feedback && (
          <div className="text-center text-orange-600 font-semibold">
            Attempt {attemptCount}/{maxAttempts} - Try again!
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildExercise;