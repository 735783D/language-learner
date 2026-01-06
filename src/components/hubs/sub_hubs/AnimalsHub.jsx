import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import ThemeToggle from '../../ThemeToggle';
import { useTheme } from '../../../contexts/ThemeContext';

const AnimalsHub = ({ onSelectPractice, onBack, languageName }) => {
  const { theme } = useTheme();
  const [expandedCard, setExpandedCard] = useState(null);
  
  const animalCategories = [
    {
      id: 'farm',
      title: "Farm Animals",
      description: "Domestic animals on the farm",
      color: "bg-amber-500",
      exercises: [
        { type: 'learn', label: 'Learn Farm Animals', icon: BookOpen },
        { type: 'practice', label: 'Practice Matching', icon: Zap }
      ]
    },
    {
      id: 'wild',
      title: "Wild Animals",
      description: "Animals in the wild",
      color: "bg-green-600",
      exercises: [
        { type: 'learn', label: 'Learn Wild Animals', icon: BookOpen },
        { type: 'practice', label: 'Practice Matching', icon: Zap }
      ]
    },
    {
      id: 'birds',
      title: "Birds",
      description: "All kinds of birds",
      color: "bg-sky-500",
      exercises: [
        { type: 'learn', label: 'Learn Birds', icon: BookOpen },
        { type: 'practice', label: 'Practice Matching', icon: Zap }
      ]
    },
    {
      id: 'insects',
      title: "Insects & Small Creatures",
      description: "Bugs, spiders, and small animals",
      color: "bg-purple-500",
      exercises: [
        { type: 'learn', label: 'Learn Insects', icon: BookOpen },
        { type: 'practice', label: 'Practice Matching', icon: Zap }
      ]
    },
    {
      id: 'aquatic',
      title: "Aquatic Animals",
      description: "Fish and water creatures",
      color: "bg-blue-500",
      exercises: [
        { type: 'learn', label: 'Learn Aquatic Animals', icon: BookOpen },
        { type: 'practice', label: 'Practice Matching', icon: Zap }
      ]
    },
    {
      id: 'reptiles',
      title: "Reptiles & Amphibians",
      description: "Snakes, turtles, frogs, and lizards",
      color: "bg-emerald-600",
      exercises: [
        { type: 'learn', label: 'Learn Reptiles', icon: BookOpen },
        { type: 'practice', label: 'Practice Matching', icon: Zap }
      ]
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleExerciseSelect = (categoryId, exerciseType) => {
    // Format: "farm-learn" or "birds-practice"
    const practiceId = `${categoryId}-${exerciseType}`;
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
            Animals
          </h1>
          <p className={`text-xl ${theme.textSecondary}`}>Choose an animal category</p>
        </div>

        <div className="space-y-4">
          {animalCategories.map((category) => {
            const isExpanded = expandedCard === category.id;
            
            return (
              <div key={category.id} className={`${theme.card} rounded-3xl shadow-lg transition-all duration-300`}>
                {/* Main Card - Clickable to expand/collapse */}
                <button
                  onClick={() => toggleCard(category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-opacity-90 transition-all rounded-3xl"
                >
                  <div className="flex items-center gap-6">
                    <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                      🦁
                    </div>
                    <div className="text-left">
                      <h2 className={`text-2xl font-bold ${theme.text}`}>
                        {category.title}
                      </h2>
                      <p className={`${theme.textSecondary}`}>
                        {category.description}
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
                    {category.exercises.map((exercise, idx) => {
                      const ExerciseIcon = exercise.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleExerciseSelect(category.id, exercise.type)}
                          className={`w-full p-4 rounded-xl ${theme.card} border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 hover:scale-102 transition-all flex items-center gap-4 group`}
                        >
                          <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
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
          background: linear-gradient(135deg, #10b981, #059669);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          top: 20%;
          right: -150px;
          animation-delay: 7s;
        }

        .blob-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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

export default AnimalsHub;