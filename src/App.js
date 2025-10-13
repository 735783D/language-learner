import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check, X, Lock, Star } from 'lucide-react';

const SpanishLearningApp = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [stageProgress, setStageProgress] = useState({ 1: 0, 2: 0, 3: 0 });
  const [feedback, setFeedback] = useState(null);
  const [unlockedStages, setUnlockedStages] = useState([1, 2, 3]); // All unlocked for testing
  const draggedItemRef = useRef(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  
  // Match exercise state
  const [matchDroppedOn, setMatchDroppedOn] = useState(null);
  const [matchHoverZone, setMatchHoverZone] = useState(null);

  // Language data structure
  const stages = {
    1: {
      name: "Character Set",
      description: "Learn the Spanish alphabet and special characters",
      requiredScore: 7,
      exercises: [
        { type: "character", char: "á", sound: "ah (stressed)", example: "más", translation: "more" },
        { type: "character", char: "é", sound: "eh (stressed)", example: "café", translation: "coffee" },
        { type: "character", char: "í", sound: "ee (stressed)", example: "sí", translation: "yes" },
        { type: "character", char: "ó", sound: "oh (stressed)", example: "adiós", translation: "goodbye" },
        { type: "character", char: "ú", sound: "oo (stressed)", example: "tú", translation: "you" },
        { type: "character", char: "ñ", sound: "ny (like canyon)", example: "mañana", translation: "tomorrow" },
        { type: "character", char: "ll", sound: "y/j sound", example: "llamar", translation: "to call" },
        { type: "character", char: "rr", sound: "rolled r", example: "perro", translation: "dog" },
        { type: "character", char: "ch", sound: "ch", example: "chocolate", translation: "chocolate" },
      ]
    },
    2: {
      name: "Tiny Words",
      description: "Master essential building blocks",
      requiredScore: 12,
      exercises: [
        { type: "match", word: "el", translation: "the", options: ["the", "a", "and", "or"] },
        { type: "match", word: "la", translation: "the", options: ["the", "a", "she", "he"] },
        { type: "match", word: "un", translation: "a/one", options: ["a", "the", "one", "some"] },
        { type: "match", word: "una", translation: "a/one", options: ["a", "the", "some", "one"] },
        { type: "match", word: "yo", translation: "I", options: ["I", "you", "he", "we"] },
        { type: "match", word: "tú", translation: "you", options: ["you", "I", "he", "they"] },
        { type: "match", word: "sí", translation: "yes", options: ["yes", "no", "maybe", "ok"] },
        { type: "match", word: "no", translation: "no", options: ["no", "yes", "not", "never"] },
        { type: "match", word: "y", translation: "and", options: ["and", "or", "but", "with"] },
        { type: "match", word: "o", translation: "or", options: ["or", "and", "but", "with"] },
        { type: "match", word: "en", translation: "in", options: ["in", "on", "at", "to"] },
        { type: "match", word: "de", translation: "of/from", options: ["of", "to", "for", "with"] },
        { type: "match", word: "es", translation: "is", options: ["is", "am", "are", "be"] },
        { type: "match", word: "soy", translation: "I am", options: ["I am", "you are", "he is", "we are"] },
      ]
    },
    3: {
      name: "Small Sentences",
      description: "Combine words into simple phrases",
      requiredScore: 10,
      exercises: [
        { 
          type: "build", 
          english: "I am Maria", 
          words: ["Soy", "María", "Yo", "es"],
          correct: ["Soy", "María"]
        },
        { 
          type: "build", 
          english: "The coffee", 
          words: ["El", "café", "La", "es"],
          correct: ["El", "café"]
        },
        { 
          type: "build", 
          english: "A dog", 
          words: ["Un", "perro", "Una", "el"],
          correct: ["Un", "perro"]
        },
        { 
          type: "build", 
          english: "You are here", 
          words: ["Tú", "estás", "aquí", "eres", "allí"],
          correct: ["Tú", "estás", "aquí"]
        },
        { 
          type: "build", 
          english: "The house is big", 
          words: ["La", "casa", "es", "grande", "pequeña", "El"],
          correct: ["La", "casa", "es", "grande"]
        },
        { 
          type: "build", 
          english: "I have a cat", 
          words: ["Yo", "tengo", "un", "gato", "una", "perro"],
          correct: ["Yo", "tengo", "un", "gato"]
        },
        { 
          type: "build", 
          english: "Yes, tomorrow", 
          words: ["Sí", "mañana", "No", "hoy"],
          correct: ["Sí", "mañana"]
        },
        { 
          type: "build", 
          english: "Good morning", 
          words: ["Buenos", "días", "Buenas", "noches"],
          correct: ["Buenos", "días"]
        },
        { 
          type: "build", 
          english: "Thank you very much", 
          words: ["Muchas", "gracias", "Mucho", "De", "nada"],
          correct: ["Muchas", "gracias"]
        },
        { 
          type: "build", 
          english: "Where is the bathroom?", 
          words: ["¿Dónde", "está", "el", "baño?", "la", "casa"],
          correct: ["¿Dónde", "está", "el", "baño?"]
        },
      ]
    }
  };

  const currentStageData = stages[currentStage];
  const exercise = currentStageData?.exercises[currentExercise];

  // Memoize shuffled options at the top level (before any returns)
  const shuffledOptions = useMemo(() => {
    if (!exercise || exercise.type !== 'match') return [];
    return [...exercise.options].sort(() => Math.random() - 0.5);
  }, [currentStage, currentExercise]);

  // Prevent rendering if exercise doesn't exist
  if (!exercise) return null;

  const handleDragStart = (e, item) => {
    draggedItemRef.current = item; // Use ref instead of state
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropZoneActive(true);
  };

  const handleDragLeave = (e) => {
    setDropZoneActive(false);
  };

  const handleDrop = (e, targetAnswer = null) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (!draggedItemRef.current) return;

    let isCorrect = false;

    if (exercise.type === "character") {
      isCorrect = true; // Character learning is exposure-based
    } else if (exercise.type === "match" && targetAnswer) {
      const translationParts = exercise.translation.toLowerCase().split(/[\/,]/);
      isCorrect = translationParts.some(part => part.trim() === targetAnswer.toLowerCase());
    } else if (exercise.type === "build" && Array.isArray(targetAnswer)) {
      // For build exercises, compare the arrays
      isCorrect = JSON.stringify(targetAnswer) === JSON.stringify(exercise.correct);
    }

    if (isCorrect) {
      setFeedback("correct");
      setScore(score + 1);
      setStageProgress({
        ...stageProgress,
        [currentStage]: stageProgress[currentStage] + 1
      });
      setStrikes(0); // Reset strikes on correct answer
    } else {
      setFeedback("incorrect");
      setStrikes(strikes + 1);
    }

    setTimeout(() => {
      if (currentExercise < currentStageData.exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else {
        // Stage complete - check if passed
        const finalScore = stageProgress[currentStage] + (isCorrect ? 1 : 0);
        if (finalScore >= currentStageData.requiredScore && strikes < 3) {
          if (!unlockedStages.includes(currentStage + 1) && stages[currentStage + 1]) {
            setUnlockedStages([...unlockedStages, currentStage + 1]);
          }
        }
        setCurrentExercise(0);
        setStrikes(0);
      }
      setFeedback(null);
      draggedItemRef.current = null;
      setSelectedWords([]);
    }, 1500);
  };

  const CharacterExercise = () => (
    <div className="flex flex-col items-center justify-between h-full py-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, exercise.char)}
          className="cursor-move touch-none"
        >
          <div className="text-9xl font-bold text-blue-600 select-none">{exercise.char}</div>
        </div>
        <div className="space-y-3 text-center">
          <div className="text-xl text-gray-700">Sounds like: <span className="font-semibold">{exercise.sound}</span></div>
          <div className="bg-blue-50 p-5 rounded-xl">
            <div className="text-2xl font-bold text-blue-900 mb-1">{exercise.example}</div>
            <div className="text-lg text-gray-600">{exercise.translation}</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-4">Drag to the circle below to continue</div>
      </div>
      
      <div
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
        onDrop={(e) => handleDrop(e)}
        className={`w-40 h-40 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${
          dropZoneActive ? 'border-blue-600 bg-blue-50 scale-110' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <Check className={`w-16 h-16 ${dropZoneActive ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
    </div>
  );

  const MatchExercise = () => {
    useEffect(() => {
      if (feedback) {
        setMatchDroppedOn(null);
      }
    }, [feedback]);

    const checkAndSubmit = (draggedAnswer, droppedAnswer) => {
      // Check if either the word was dragged to the answer, or the answer to the word
      const translationParts = exercise.translation.toLowerCase().split(/[\/,]/);
      const isCorrect = translationParts.some(part => part.trim() === draggedAnswer.toLowerCase() || part.trim() === droppedAnswer.toLowerCase());
      
      const answer = translationParts.includes(draggedAnswer.toLowerCase()) ? draggedAnswer : droppedAnswer;
      setMatchDroppedOn(answer);
      handleDrop({ preventDefault: () => {} }, answer);
    };

    return (
      <div className="relative h-full w-full pt-8">
        {/* Center word to drag - can receive drops too */}
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
                  checkAndSubmit(draggedItemRef.current, exercise.word);
                }
              }}
              className={`cursor-move transition-all ${matchHoverZone === 'center' ? 'scale-110' : ''}`}
            >
              <div className={`text-6xl font-bold text-blue-900 px-8 py-6 rounded-2xl shadow-lg select-none transition-all ${
                matchHoverZone === 'center' ? 'bg-blue-100 border-4 border-blue-400' : 'bg-white'
              }`}>
                {exercise.word}
              </div>
            </div>
            <div className="text-lg text-gray-600">Drag word to answer or answer to word</div>
          </div>
        </div>

        {/* Corner drop zones - also draggable */}
        {shuffledOptions.map((option, idx) => {
          const positions = [
            'top-8 left-8',      // top-left
            'top-8 right-8',     // top-right
            'bottom-8 left-8',   // bottom-left
            'bottom-8 right-8'   // bottom-right
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
                // Only clear if we're actually leaving this element
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
                  checkAndSubmit(option, draggedItemRef.current);
                }
              }}
              className={`absolute ${positions[idx]} w-36 h-28 p-3 rounded-xl text-lg font-semibold flex items-center justify-center text-center transition-all border-4 cursor-move z-0 ${
                matchDroppedOn === option
                  ? feedback === "correct"
                    ? "bg-green-500 text-white border-green-600 scale-110"
                    : "bg-red-500 text-white border-red-600"
                  : matchHoverZone === option
                  ? "border-blue-400 bg-blue-100 border-solid scale-105"
                  : "border-gray-300 bg-gray-50 border-dashed"
              }`}
            >
              {option}
            </div>
          );
        })}
      </div>
    );
  };

  const BuildExercise = () => {
    const availableWords = exercise.words.filter(w => !selectedWords.includes(w));

    const handleWordDrop = (e) => {
      e.preventDefault();
      setDropZoneActive(false);
      if (draggedItemRef.current && !selectedWords.includes(draggedItemRef.current)) {
        const newSelected = [...selectedWords, draggedItemRef.current];
        setSelectedWords(newSelected);
        draggedItemRef.current = null;
      }
    };

    const handleRemoveWord = (word) => {
      if (feedback) return;
      setSelectedWords(selectedWords.filter(w => w !== word));
    };

    const handleSelectedWordDragStart = (e, word) => {
      handleDragStart(e, word);
      // Remove from selected words when starting to drag
      setSelectedWords(selectedWords.filter(w => w !== word));
    };

    const handleCheckAnswer = () => {
      console.log('Selected words:', selectedWords);
      console.log('Correct answer:', exercise.correct);
      const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(exercise.correct);
      console.log('Match:', isCorrect);
      
      if (isCorrect) {
        setFeedback("correct");
        setScore(score + 1);
        setStageProgress({
          ...stageProgress,
          [currentStage]: stageProgress[currentStage] + 1
        });
      } else {
        setFeedback("incorrect");
      }

      setTimeout(() => {
        if (currentExercise < currentStageData.exercises.length - 1) {
          setCurrentExercise(currentExercise + 1);
        } else {
          if (stageProgress[currentStage] + (isCorrect ? 1 : 0) >= currentStageData.requiredScore) {
            if (!unlockedStages.includes(currentStage + 1) && stages[currentStage + 1]) {
              setUnlockedStages([...unlockedStages, currentStage + 1]);
            }
          }
          setCurrentExercise(0);
        }
        setFeedback(null);
        setSelectedWords([]);
      }, 1500);
    };

    useEffect(() => {
      if (feedback) {
        setTimeout(() => {
          setSelectedWords([]);
        }, 1500);
      }
    }, [feedback]);

    return (
      <div className="flex flex-col h-full py-8">
        <div className="text-center mb-8">
          <div className="text-gray-600 mb-2">Translate to Spanish:</div>
          <div className="text-3xl font-bold text-gray-900">{exercise.english}</div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          {/* Drop Zone for sentence building */}
          <div
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
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX;
              const y = e.clientY;
              if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                setDropZoneActive(false);
              }
            }}
            onDrop={handleWordDrop}
            className={`min-h-32 p-6 rounded-xl border-4 border-dashed flex flex-wrap gap-3 items-center justify-center transition-all ${
              dropZoneActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
            } ${feedback === "correct" ? 'bg-green-100 border-green-500' : ''} ${feedback === "incorrect" ? 'bg-red-100 border-red-500' : ''}`}
          >
            {selectedWords.length === 0 ? (
              <div className="text-gray-400">Drag words here to build your sentence</div>
            ) : (
              selectedWords.map((word, idx) => (
                <div
                  key={`${word}-${idx}`}
                  draggable={!feedback}
                  onDragStart={(e) => handleSelectedWordDragStart(e, word)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`px-4 py-2 rounded-lg text-xl font-semibold transition ${
                    feedback === "correct"
                      ? "bg-green-500 text-white"
                      : feedback === "incorrect"
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100 shadow cursor-move"
                  }`}
                >
                  {word}
                </div>
              ))
            )}
          </div>

          {/* Available words to drag */}
          <div className="flex flex-wrap gap-3 justify-center">
            {availableWords.map((word, idx) => (
              <div
                key={`${word}-${idx}`}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.dropEffect = 'move';
                  handleDragStart(e, word);
                }}
                onDragEnd={(e) => {
                  e.preventDefault();
                }}
                style={{touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none'}}
                className="px-5 py-3 bg-blue-500 text-white rounded-xl text-xl font-semibold cursor-grab hover:bg-blue-600 transition shadow-md active:cursor-grabbing"
              >
                {word}
              </div>
            ))}
          </div>

          {selectedWords.length > 0 && !feedback && (
            <div className="text-center">
              <button
                onClick={handleCheckAnswer}
                className="bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Check Answer <Check className="inline ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8" style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Spanish Learning</h1>
          <p className="text-gray-600">Progressive mastery-based approach</p>
        </div>

        {/* Stage Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-around">
            {[1, 2, 3].map((stage) => (
              <button
                key={stage}
                onClick={() => unlockedStages.includes(stage) && setCurrentStage(stage)}
                disabled={!unlockedStages.includes(stage)}
                className={`flex flex-col items-center p-4 rounded-xl transition ${
                  currentStage === stage
                    ? "bg-blue-100 border-2 border-blue-500"
                    : unlockedStages.includes(stage)
                    ? "hover:bg-gray-100"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  unlockedStages.includes(stage) ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                }`}>
                  {unlockedStages.includes(stage) ? stage : <Lock size={20} />}
                </div>
                <div className="font-semibold text-sm">{stages[stage].name}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {stageProgress[stage]}/{stages[stage].requiredScore}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 min-h-[600px]">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Exercise {currentExercise + 1} of {currentStageData.exercises.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                <Star className="inline w-4 h-4" fill="currentColor" /> Score: {stageProgress[currentStage]}/{currentStageData.requiredScore}
              </span>
              <span className="text-sm font-semibold text-red-600">
                ❌ Strikes: {strikes}/3
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentExercise / currentStageData.exercises.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="h-[480px]">
            {exercise.type === "character" && <CharacterExercise />}
            {exercise.type === "match" && <MatchExercise />}
            {exercise.type === "build" && <BuildExercise />}
          </div>
        </div>

        {/* Feedback */}
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
                <span className="font-semibold text-xl">Try again next time!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpanishLearningApp;