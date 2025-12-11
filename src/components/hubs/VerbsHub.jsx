import React from 'react';
import { Activity, User, Clock, Calendar, ArrowLeft } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const VerbsHub = ({ onSelectSubLesson, onBack, languageName }) => {
  const { theme } = useTheme();

  const subLessons = [
    {
      id: 'infinitives',
      title: "Infinitives & Pronouns",
      description: "Learn verb forms and pronouns",
      icon: Activity,
      color: "bg-blue-500",
      progress: 0,
      locked: false
    },
    {
      id: 'present',
      title: "Present Tense",
      description: "Actions happening now",
      icon: User,
      color: "bg-green-500",
      progress: 0,
      locked: false
    },
    {
      id: 'past',
      title: "Past Tense",
      description: "Actions that already happened",
      icon: Clock,
      color: "bg-orange-500",
      progress: 0,
      locked: false
    },
    {
      id: 'future',
      title: "Future Tense",
      description: "Actions that will happen",
      icon: Calendar,
      color: "bg-purple-500",
      progress: 0,
      locked: false
    }
  ];

  return (
    <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
      <ThemeToggle />

      {/* Back button */}
      <button
        onClick={onBack}
        className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Floating blobs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>
            Verbs
          </h1>
          <p className={`text-xl ${theme.textSecondary}`}>Learn action words and conjugation</p>
        </div>

        {/* Sub-lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subLessons.map((lesson) => {
            const Icon = lesson.icon;
            return (
              <button
                key={lesson.id}
                onClick={() => !lesson.locked && onSelectSubLesson(lesson.id)}
                disabled={lesson.locked}
                className={`relative group ${
                  lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                } transition-all duration-300`}
              >
                <div className={`${theme.card} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow`}>
                  {/* Icon */}
                  <div className={`${lesson.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Text */}
                  <h2 className={`text-2xl font-bold ${theme.text} mb-2 text-center`}>
                    {lesson.title}
                  </h2>
                  <p className={`${theme.textSecondary} text-center mb-4`}>
                    {lesson.description}
                  </p>

                  {/* Progress bar */}
                  {!lesson.locked && (
                    <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
                      <div
                        className={`${lesson.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Lock indicator */}
                  {lesson.locked && (
                    <div className={`absolute top-4 right-4 ${theme.card} rounded-full p-2`}>
                      <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className={`${theme.card} rounded-2xl p-6 mt-8 border-l-4 border-blue-500`}>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>📚 Content In Progress</h3>
          <p className={`${theme.textSecondary}`}>
            Verb conjugation lessons are being developed. Check back soon!
          </p>
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
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          top: 20%;
          right: -150px;
          animation-delay: 7s;
        }

        .blob-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #14b8a6, #0d9488);
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

export default VerbsHub;