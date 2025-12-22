import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const InstructionCard = ({ instruction, onClose, onStart }) => {
  const { theme } = useTheme();

  if (!instruction) return null;

  return (
    <div className={`fixed inset-0 ${theme.bg} z-50 overflow-y-auto`}>
      {/* Close button */}
      <button
        onClick={onClose}
        className={`fixed top-4 right-4 p-2 rounded-lg ${theme.card} hover:scale-110 transition-transform`}
      >
        <X className={`w-6 h-6 ${theme.text}`} />
      </button>

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className={`${theme.card} rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-12 space-y-8`}>
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className={`inline-flex items-center gap-3 ${theme.accent} mb-4`}>
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className={`text-3xl sm:text-5xl font-bold ${theme.text}`}>
              {instruction.title}
            </h1>
            {instruction.subtitle && (
              <p className={`text-lg sm:text-xl ${theme.textSecondary}`}>
                {instruction.subtitle}
              </p>
            )}
          </div>

          {/* Main explanation */}
          {instruction.explanation && (
            <div className={`${theme.card} border-l-4 ${instruction.color || 'border-blue-500'} p-6 rounded-lg`}>
              <h2 className={`text-xl font-bold ${theme.text} mb-3 flex items-center gap-2`}>
                <span className="text-2xl">{instruction.icon || "💡"}</span>
                {instruction.explanationTitle || "What you'll learn"}
              </h2>
              <p className={`${theme.textSecondary} text-lg leading-relaxed`}>
                {instruction.explanation}
              </p>
            </div>
          )}

          {/* Examples */}
          {instruction.examples && instruction.examples.length > 0 && (
            <div className="space-y-4">
              <h3 className={`text-2xl font-bold ${theme.text}`}>Examples:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {instruction.examples.map((example, idx) => (
                  <div key={idx} className={`${theme.card} border-2 border-gray-200 dark:border-gray-700 p-4 rounded-xl`}>
                    <div className={`text-2xl font-bold ${theme.accent} mb-2`}>
                      {example.mvskoke}
                    </div>
                    <div className={`${theme.textSecondary}`}>
                      {example.english}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key rules/notes */}
          {instruction.rules && instruction.rules.length > 0 && (
            <div className="space-y-4">
              <h3 className={`text-2xl font-bold ${theme.text}`}>
                {instruction.rulesTitle || "Important to remember:"}
              </h3>
              <div className="space-y-3">
                {instruction.rules.map((rule, idx) => (
                  <div key={idx} className={`flex items-start gap-3 ${theme.card} p-4 rounded-lg`}>
                    <span className={`text-2xl ${theme.accent} flex-shrink-0`}>
                      {rule.icon || "✓"}
                    </span>
                    <p className={`${theme.textSecondary} text-lg`}>
                      {rule.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural note */}
          {instruction.culturalNote && (
            <div className={`bg-amber-100 dark:bg-amber-900 border-2 border-amber-400 p-6 rounded-xl`}>
              <h3 className={`text-xl font-bold ${theme.text} mb-2 flex items-center gap-2`}>
                <span className="text-2xl">🌟</span>
                Cultural Note
              </h3>
              <p className={`${theme.textSecondary} leading-relaxed`}>
                {instruction.culturalNote}
              </p>
            </div>
          )}

          {/* Start button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onStart}
              className={`px-8 py-4 rounded-xl text-xl font-bold ${theme.button} hover:scale-105 transition-transform shadow-lg`}
            >
              {instruction.buttonText || "Start Learning →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionCard;