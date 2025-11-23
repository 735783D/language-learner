import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CompletionModal = ({ 
  isOpen, 
  score, 
  totalQuestions, 
  onRestart, 
  onBack,
  lessonName = "Lesson"
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Get encouragement message based on score
  const getEncouragementMessage = () => {
    if (percentage === 100) return "Perfect! You're a natural!";
    if (percentage >= 90) return "Excellent work!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 70) return "Good effort!";
    if (percentage >= 60) return "Keep practicing!";
    return "Don't give up - try again!";
  };

  // Get emoji based on score
  const getEmoji = () => {
    if (percentage === 100) return '🎉';
    if (percentage >= 80) return '⭐';
    if (percentage >= 60) return '👏';
    return '💪';
  };

  // Get color classes based on score
  const getColorClasses = () => {
    if (percentage >= 80) return {
      border: 'border-green-500',
      text: 'text-green-500'
    };
    if (percentage >= 60) return {
      border: 'border-yellow-500',
      text: 'text-yellow-500'
    };
    return {
      border: 'border-orange-500',
      text: 'text-orange-500'
    };
  };

  const colors = getColorClasses();

  return (
    <div className={`fixed inset-0 ${theme.bg} flex items-center justify-center p-8 z-50`}>
      <div className={`${theme.card} rounded-3xl p-12 max-w-2xl w-full shadow-2xl text-center space-y-8`}>
        {/* Celebration Icon */}
        <div className="text-8xl animate-bounce">
          {getEmoji()}
        </div>
        
        {/* Title */}
        <div>
          <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
            Mvto! {lessonName} Complete!
          </h1>
          <p className={`text-xl ${theme.textSecondary}`}>
            {getEncouragementMessage()}
          </p>
        </div>

        {/* Score Display */}
        <div className={`${theme.card} border-4 ${colors.border} rounded-2xl p-8`}>
          <div className={`text-6xl font-bold mb-2 ${colors.text}`}>
            {percentage}%
          </div>
          <div className={`text-2xl ${theme.textSecondary}`}>
            {score} / {totalQuestions} Correct
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          {onRestart && (
            <button
              onClick={onRestart}
              className={`px-8 py-4 rounded-xl text-lg font-semibold ${theme.button} hover:scale-105 transition-transform shadow-lg`}
            >
              Practice Again
            </button>
          )}
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
};

export default CompletionModal;