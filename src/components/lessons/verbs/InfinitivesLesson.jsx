import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Star, X, Check, Volume2 } from 'lucide-react';
import CompletionModal from '../../CompletionModal';
import InstructionCard from '../../InstructionCard';
import { useTheme } from '../../../contexts/ThemeContext';
import ThemeToggle from '../../ThemeToggle';

const InfinitivesLesson = ({ onBack, languageData, practiceType = 'learn' }) => {
  const { theme } = useTheme();
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const draggedItemRef = useRef(null);
  const audioRef = useRef(null);
  const isDragging = useRef(false);
  const dragData = useRef(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const hasPlayedFirstAudio = useRef(false); // Track if first audio has played
  
  const stageData = languageData[4];

  // Instruction content based on practice type
  const instructionContent = practiceType === 'learn' ? {
    title: "Infinitive Verbs",
    subtitle: "The base form of verbs ending in '-etv'",
    icon: "📖",
    color: "border-blue-500",
    explanation: "Every Mvskoke verb has an infinitive form - the base form that means 'to [verb]'. All infinitives end in '-etv'. This is the starting point for creating all other verb forms like commands and present tense.",
    explanationTitle: "The Foundation of Verbs",
    rules: [
      {
        icon: "✅",
        text: "All infinitive verbs end in '-etv': Wiketv (to quit), Hompetv (to eat)"
      },
      {
        icon: "✂️",
        text: "Remove '-etv' to get the root, then add endings for different meanings"
      },
      {
        icon: "👂",
        text: "Listen to each pronunciation and drag the verb to continue"
      }
    ],
    examples: [
      {
        mvskoke: "Nucetv",
        english: "To sleep"
      },
      {
        mvskoke: "Hompetv",
        english: "To eat"
      },
      {
        mvskoke: "Liketv",
        english: "To sit"
      },
      {
        mvskoke: "Hecetv",
        english: "To see"
      }
    ],
    culturalNote: "Understanding verb roots is essential in Mvskoke. Once you know the infinitive, you can create many different forms by adding the appropriate endings.",
    buttonText: "Start Learning →"
  } : {
    title: "Practice Infinitives",
    subtitle: "Match Mvskoke verbs with their meanings",
    icon: "⚡",
    color: "border-green-500",
    explanation: "Now it's time to test your knowledge! You'll see infinitive verbs in Mvskoke and need to select their correct English meaning. This helps reinforce what you've learned.",
    explanationTitle: "How to Practice",
    rules: [
      {
        icon: "🎯",
        text: "Read the Mvskoke infinitive verb carefully"
      },
      {
        icon: "✓",
        text: "Select the correct English translation from four options"
      },
      {
        icon: "⚠️",
        text: "Be careful! You only get 3 mistakes (strikes) before you need to restart"
      },
      {
        icon: "⭐",
        text: "Get at least 12 correct to pass the lesson"
      }
    ],
    examples: [
      {
        mvskoke: "Kerretv",
        english: "To learn / To know"
      },
      {
        mvskoke: "Vtotketv",
        english: "To work"
      }
    ],
    culturalNote: "Regular practice helps these verb forms become natural. Don't worry about mistakes - they're part of learning!",
    buttonText: "Start Practice →"
  };

  // Get all infinitives
  const allInfinitives = useMemo(() => {
    if (!stageData?.subLessons?.infinitives?.exercises) return [];
    return stageData.subLessons.infinitives.exercises;
  }, [stageData]);

  // Generate randomized exercises for practice mode
  const exercises = useMemo(() => {
    if (!allInfinitives || allInfinitives.length === 0) return [];
    
    // Create matching exercises: show infinitive, pick translation
    return [...allInfinitives]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15)
      .map(verb => {
        // Get 3 wrong answers
        const wrongAnswers = allInfinitives
          .filter(v => v.translation !== verb.translation)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.translation);
        
        // Shuffle all options
        const options = [verb.translation, ...wrongAnswers]
          .sort(() => Math.random() - 0.5);
        
        return {
          infinitive: verb.infinitive,
          correctAnswer: verb.translation,
          options,
          category: verb.category
        };
      });
  }, [allInfinitives]);

  const exercise = exercises[currentExercise];
  const currentIntroVerb = allInfinitives[currentIntroIndex];
  
  // Get full verb data for current exercise (practice mode)
  const currentExerciseVerbData = useMemo(() => {
    if (practiceType === 'practice' && exercise) {
      return allInfinitives.find(v => v.infinitive === exercise.infinitive);
    }
    return null;
  }, [practiceType, exercise, allInfinitives]);
  
  const requiredScore = 12;

  // Audio playback - works for both modes
  const playSound = useCallback(() => {
    if (practiceType === 'learn') {
      if (currentIntroVerb?.sound_file && currentIntroVerb.sound_file.trim() !== '' && audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
    } else {
      if (currentExerciseVerbData?.sound_file && currentExerciseVerbData.sound_file.trim() !== '' && audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
    }
  }, [practiceType, currentIntroVerb, currentExerciseVerbData]);

  // Play sound when verb changes (learn mode only)
  useEffect(() => {
    if (practiceType === 'learn' && !showInstructions && currentIntroVerb?.sound_file && currentIntroVerb.sound_file.trim() !== '' && audioRef.current) {
      // Skip auto-play on first verb if audio hasn't been loaded yet
      if (currentIntroIndex === 0 && !hasPlayedFirstAudio.current) {
        hasPlayedFirstAudio.current = true;
        // Load audio but play after longer delay on first load
        audioRef.current.load();
        const timer = setTimeout(() => {
          playSound();
        }, 500);
        return () => clearTimeout(timer);
      } else {
        // For subsequent verbs, play normally
        audioRef.current.load();
        const timer = setTimeout(() => {
          playSound();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [currentIntroVerb, practiceType, playSound, currentIntroIndex, showInstructions]);

  // Play sound when exercise changes in practice mode
  useEffect(() => {
    if (practiceType === 'practice' && !showInstructions && currentExerciseVerbData?.sound_file && currentExerciseVerbData.sound_file.trim() !== '' && audioRef.current) {
      // Skip auto-play on first exercise if audio hasn't been loaded yet
      if (currentExercise === 0 && !hasPlayedFirstAudio.current) {
        hasPlayedFirstAudio.current = true;
        // Load audio but don't play automatically on first load
        audioRef.current.load();
        // Play after a delay to ensure audio is loaded
        const timer = setTimeout(() => {
          playSound();
        }, 500);
        return () => clearTimeout(timer);
      } else {
        // For subsequent exercises, play immediately
        audioRef.current.load();
        const timer = setTimeout(() => {
          playSound();
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentExerciseVerbData, practiceType, playSound, currentExercise, showInstructions]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    
    if (!draggedItemRef.current) return;

    // Always correct in learn mode (exposure-based learning)
    setFeedback("correct");

    setTimeout(() => {
      setCurrentIntroIndex((prevIndex) => {
        if (prevIndex < allInfinitives.length - 1) {
          setFeedback(null);
          draggedItemRef.current = null;
          return prevIndex + 1;
        } else {
          // Finished learning all verbs
          setShowCompletion(true);
          setFeedback(null);
          draggedItemRef.current = null;
          return prevIndex;
        }
      });
    }, 1500);
  };

  // Mobile drag handlers
  const startDrag = (e, infinitive, clientX, clientY) => {
    isDragging.current = true;
    dragData.current = infinitive;
    
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
    
    draggedItemRef.current = infinitive;
    
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', infinitive);
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
    dragData.current = null;
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

  const handleAnswerClick = (answer) => {
    if (feedback) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === exercise.correctAnswer;
    
    if (isCorrect) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("incorrect");
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      
      if (newStrikes >= 3) {
        setTimeout(() => {
          setShowFailure(true);
        }, 1500);
        return;
      }
    }

    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setFeedback(null);
        setSelectedAnswer(null);
      } else {
        setShowCompletion(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    if (practiceType === 'learn') {
      setCurrentIntroIndex(0);
    } else {
      setCurrentExercise(0);
      setScore(0);
      setStrikes(0);
      setSelectedAnswer(null);
    }
    setFeedback(null);
    setShowCompletion(false);
    setShowFailure(false);
  };

  const handleFailureRestart = () => {
    setCurrentExercise(0);
    setScore(0);
    setStrikes(0);
    setFeedback(null);
    setShowFailure(false);
    setSelectedAnswer(null);
  };

  // Show instructions first
  if (showInstructions) {
    return (
      <InstructionCard
        instruction={instructionContent}
        onClose={onBack}
        onStart={() => setShowInstructions(false)}
      />
    );
  }

  // Three Strikes Failure Modal
  if (showFailure) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center p-8 z-50`}>
        <div className={`${theme.card} rounded-3xl p-12 max-w-2xl w-full shadow-2xl text-center space-y-8`}>
          <div className="text-8xl">😔</div>
          
          <div>
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
              Three Strikes!
            </h1>
            <p className={`text-xl ${theme.textSecondary}`}>
              Don't give up - practice makes perfect!
            </p>
          </div>

          <div className={`${theme.card} border-4 border-red-500 rounded-2xl p-8`}>
            <div className="text-6xl font-bold mb-2 text-red-500">
              ❌ ❌ ❌
            </div>
            <div className={`text-2xl ${theme.textSecondary}`}>
              {score} / {exercises.length} Correct
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleFailureRestart}
              className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.button} hover:scale-105 transition-transform shadow-lg`}
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.card} border-2 border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform shadow-lg`}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!exercises || exercises.length === 0 || !allInfinitives || allInfinitives.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>Loading exercises...</div>
      </div>
    );
  }

  // LEARN MODE: Drag-and-drop flashcards
  if (practiceType === 'learn') {
    return (
      <div className={`fixed inset-0 ${theme.bg} overflow-hidden`} style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
        <ThemeToggle />

        {/* Audio element */}
        {currentIntroVerb?.sound_file && currentIntroVerb.sound_file.trim() !== '' && (
          <audio ref={audioRef} src={encodeURI(currentIntroVerb.sound_file)} preload="auto" />
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button}`}
        >
          ← Back
        </button>

        {/* Header */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
          <h1 className={`text-2xl font-bold ${theme.text}`}>Learn Infinitives</h1>
          <p className={`text-sm ${theme.textSecondary}`}>Drag each verb to the circle</p>
        </div>

        {/* Progress */}
        <div className="fixed top-20 left-0 right-0 z-40 px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className={`font-semibold ${theme.textSecondary}`}>
                {currentIntroIndex + 1}/{allInfinitives.length}
              </span>
            </div>
            <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
              <div
                className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${((currentIntroIndex + 1) / allInfinitives.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="absolute inset-0 pt-32 pb-8 flex flex-col items-center justify-between px-8">
          
          {/* Top section - draggable card and info */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            {/* Draggable verb */}
            <div
              draggable
              onDragStart={(e) => {
                startDrag(e, currentIntroVerb.infinitive, e.clientX, e.clientY);
                setDropZoneActive(false);
              }}
              onDragEnd={(e) => {
                setDropZoneActive(false);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                startDrag(e, currentIntroVerb.infinitive, e.clientX, e.clientY);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                startDrag(e, currentIntroVerb.infinitive, touch.clientX, touch.clientY);
              }}
              className="cursor-move touch-none relative"
              style={{ 
                touchAction: 'none', 
                userSelect: 'none',
                opacity: dragPosition ? 0.3 : 1
              }}
            >
              <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold select-none ${theme.accent}`}>
                {currentIntroVerb.infinitive}
              </div>
            </div>

            {/* Translation with audio button */}
            <div className="space-y-3 text-center">
              <div className={`text-2xl ${theme.textSecondary} flex items-center justify-center gap-3`}>
                <span className="font-semibold">{currentIntroVerb.translation}</span>
                {currentIntroVerb.sound_file && currentIntroVerb.sound_file.trim() !== '' && (
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

            {/* Example card */}
            {currentIntroVerb.example && currentIntroVerb.example.trim() !== '' && (
              <div className={`${theme.card} p-5 rounded-xl max-w-lg`}>
                <div className={`text-2xl font-bold ${theme.text} mb-1`}>
                  {currentIntroVerb.example}
                </div>
                {currentIntroVerb.exampleTranslation && currentIntroVerb.exampleTranslation.trim() !== '' && (
                  <div className={`text-lg ${theme.textSecondary}`}>
                    {currentIntroVerb.exampleTranslation}
                  </div>
                )}
              </div>
            )}

            {/* Category badge */}
            {currentIntroVerb.category && (
              <div className={`${theme.card} px-4 py-2 rounded-xl`}>
                <div className={`text-sm ${theme.accent} uppercase tracking-wider`}>
                  {currentIntroVerb.category}
                </div>
              </div>
            )}

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
              {currentIntroVerb.infinitive}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg bg-green-500 text-white`}>
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6" />
              <span className="font-bold text-xl">Mvto!</span>
            </div>
          </div>
        )}

        {/* Completion Modal for Learn mode */}
        <CompletionModal
          isOpen={showCompletion}
          score={allInfinitives.length}
          totalQuestions={allInfinitives.length}
          onRestart={handleRestart}
          onBack={onBack}
          lessonName="Learn Infinitives"
        />
      </div>
    );
  }

  // PRACTICE MODE: Quiz
  return (
    <div className={`fixed inset-0 ${theme.bg} overflow-hidden`} style={{userSelect: 'none', WebkitUserSelect: 'none'}}>
      <ThemeToggle />

      {/* Audio element for practice mode */}
      {currentExerciseVerbData?.sound_file && currentExerciseVerbData.sound_file.trim() !== '' && (
        <audio ref={audioRef} src={encodeURI(currentExerciseVerbData.sound_file)} preload="auto" />
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button}`}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 text-center">
        <h1 className={`text-2xl font-bold ${theme.text}`}>Practice Infinitives</h1>
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className={`font-semibold ${theme.textSecondary}`}>
              {currentExercise + 1}/{exercises.length}
            </span>
            <span className={`font-semibold ${theme.accent}`}>
              <Star className="inline w-4 h-4" fill="currentColor" /> {score}/{requiredScore}
            </span>
            <span className="font-semibold text-red-400">
              ❌ {strikes}/3
            </span>
          </div>
          <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
            <div
              className={`${theme.progress} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(currentExercise / exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="absolute inset-0 pt-32 pb-8 flex flex-col items-center justify-center">
        <div className="space-y-8 max-w-2xl w-full px-8">
          {/* Question */}
          <div className="text-center space-y-4">
            <p className={`text-xl ${theme.textSecondary}`}>
              What does this verb mean?
            </p>
            <div className={`${theme.card} p-8 rounded-3xl shadow-lg`}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`text-5xl font-bold ${theme.text}`}>
                  {exercise.infinitive}
                </div>
                {currentExerciseVerbData?.sound_file && currentExerciseVerbData.sound_file.trim() !== '' && (
                  <button
                    onClick={playSound}
                    className={`p-3 rounded-full ${theme.card} hover:scale-110 transition-transform shadow-lg`}
                    aria-label="Play sound"
                  >
                    <Volume2 className={`w-8 h-8 ${theme.accent}`} />
                  </button>
                )}
              </div>
              {exercise.category && (
                <div className={`text-sm ${theme.textSecondary} mt-2 uppercase tracking-wider`}>
                  {exercise.category}
                </div>
              )}
            </div>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {exercise.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === exercise.correctAnswer;
              
              let buttonStyle = `${theme.card} border-4 border-transparent`;
              
              if (feedback && isSelected) {
                if (feedback === 'correct') {
                  buttonStyle = 'bg-green-500 border-green-600';
                } else {
                  buttonStyle = 'bg-red-500 border-red-600';
                }
              } else if (feedback && isCorrect) {
                buttonStyle = 'bg-green-500 border-green-600 animate-pulse';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerClick(option)}
                  disabled={!!feedback}
                  className={`${buttonStyle} p-6 rounded-2xl text-xl font-semibold hover:scale-105 transition-all shadow-lg disabled:cursor-not-allowed`}
                >
                  <span className={feedback && (isSelected || isCorrect) ? 'text-white' : theme.text}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
          feedback === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
            <span className="font-bold text-xl">
              {feedback === "correct" ? "Mvto!" : "Incorrect"}
            </span>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletion}
        score={score}
        totalQuestions={exercises.length}
        onRestart={handleRestart}
        onBack={onBack}
        lessonName="Practice Infinitives"
      />
    </div>
  );
};

export default InfinitivesLesson;