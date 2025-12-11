import React, { useState } from 'react';
import { BookOpen, Book, FileText, ArrowLeft, ChevronDown, ChevronRight, Volume2 } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const SingleLettersHub = ({ onSelectPractice, onBack, languageName }) => {
  const { theme } = useTheme(); // ADD THIS LINE
  const [expandedCard, setExpandedCard] = useState(null);
  
  const practiceSets = [
    {
      id: 'full',
      title: "Full Alphabet",
      description: "All letters A-Y",
      icon: BookOpen,
      color: "bg-blue-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: BookOpen },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'firstHalf',
      title: "A through M",
      description: "First half of alphabet",
      icon: Book,
      color: "bg-cyan-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: Book },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'secondHalf',
      title: "N through Y",
      description: "Second half of alphabet",
      icon: FileText,
      color: "bg-teal-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: FileText },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleExerciseSelect = (setId, exerciseType) => {
    const practiceId = exerciseType === 'audio' ? `${setId}-audio` : setId;
    onSelectPractice(practiceId);
  };

  return (
    <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
      <ThemeToggle />

      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>
            Single Letters
          </h1>
          <p className={`text-xl ${theme.textSecondary}`}>Choose a practice session</p>
        </div>

        <div className="space-y-4">
          {practiceSets.map((set) => {
            const Icon = set.icon;
            const isExpanded = expandedCard === set.id;
            
            return (
              <div key={set.id} className={`${theme.card} rounded-3xl shadow-lg transition-all duration-300`}>
                {/* Main Card - Clickable to expand/collapse */}
                <button
                  onClick={() => toggleCard(set.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-opacity-90 transition-all rounded-3xl"
                >
                  <div className="flex items-center gap-6">
                    <div className={`${set.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className={`text-2xl font-bold ${theme.text}`}>
                        {set.title}
                      </h2>
                      <p className={`${theme.textSecondary}`}>
                        {set.description}
                      </p>
                    </div>
                  </div>
                  <div className={theme.textSecondary}>
                    {isExpanded ? (
                      <ChevronDown className="w-8 h-8" />
                    ) : (
                      <ChevronRight className="w-8 h-8" />
                    )}
                  </div>
                </button>

                {/* Expanded Exercise Options */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {set.exercises.map((exercise, idx) => {
                      const ExerciseIcon = exercise.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleExerciseSelect(set.id, exercise.type)}
                          className={`w-full p-4 rounded-xl ${theme.card} border-2 border-gray-200 hover:border-amber-400 hover:scale-102 transition-all flex items-center gap-4 group`}
                        >
                          <div className={`${set.color} w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <ExerciseIcon className="w-6 h-6 text-white" />
                          </div>
                          <span className={`text-lg font-semibold ${theme.text}`}>
                            {exercise.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .blob-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #d97706, #f59e0b);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #059669, #10b981);
          top: 20%;
          right: -150px;
          animation-delay: 7s;
        }

        .blob-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #0d9488, #14b8a6);
          bottom: -100px;
          left: 20%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default SingleLettersHub;