import React, { createContext, useContext, useState } from 'react';
import { BookOpen, Layers, Hash, List, FileCheck, FileText, Files, ArrowLeft, Sun, Moon } from 'lucide-react';

const ThemeContext = createContext();

const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeToggle = () => {
  const context = useTheme();
  const isDark = context.isDark;
  const toggleTheme = context.toggleTheme;
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  );
};

const TwoLetterHub = ({ onSelectPractice, onBack, languageName }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  const theme = {
    bg: isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-pink-100',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
    card: isDark ? 'bg-gray-800' : 'bg-white',
    button: isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
    progressBg: isDark ? 'bg-gray-700' : 'bg-gray-200'
  };

  const practices = [
    {
      id: 'full',
      title: "Full Set",
      description: "All 156 two-letter sounds",
      icon: BookOpen,
      color: "bg-purple-500",
      progress: 0,
      locked: false
    },
    {
      id: 'cafv',
      title: "CA through FV",
      description: "C and F combinations",
      icon: Layers,
      color: "bg-violet-500",
      progress: 0,
      locked: false
    },
    {
      id: 'halv',
      title: "HA through LV",
      description: "H, K, L combinations",
      icon: Hash,
      color: "bg-fuchsia-500",
      progress: 0,
      locked: false
    },
    {
      id: 'mapv',
      title: "MA through PV",
      description: "M, N, P combinations",
      icon: List,
      color: "bg-pink-500",
      progress: 0,
      locked: false
    },
    {
      id: 'ratv',
      title: "RA through TV",
      description: "R, S, T combinations",
      icon: FileCheck,
      color: "bg-rose-500",
      progress: 0,
      locked: false
    },
    {
      id: 'wayv',
      title: "WA through YV",
      description: "W and Y combinations",
      icon: FileText,
      color: "bg-red-500",
      progress: 0,
      locked: false
    },
    {
      id: 'afet',
      title: "AF through ET",
      description: "A and E + consonants",
      icon: Files,
      color: "bg-orange-500",
      progress: 0,
      locked: false
    },
    {
      id: 'ifvt',
      title: "IF through VT",
      description: "I, O, U, V + consonants",
      icon: BookOpen,
      color: "bg-amber-500",
      progress: 0,
      locked: false
    }
  ];

  return (
    <ThemeContext.Provider value={{ isDark: isDark, toggleTheme: toggleTheme }}>
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

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-12">
          <div className="text-center mb-16">
            <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>
              Two-Letter Sounds
            </h1>
            <p className={`text-xl ${theme.textSecondary}`}>Choose a practice session</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practices.map((practice) => {
              const Icon = practice.icon;
              return (
                <button
                  key={practice.id}
                  onClick={() => !practice.locked && onSelectPractice(practice.id)}
                  disabled={practice.locked}
                  className={`relative group ${
                    practice.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                  } transition-all duration-300`}
                >
                  <div className={`${theme.card} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow h-full`}>
                    <div className={`${practice.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h2 className={`text-xl font-bold ${theme.text} mb-2 text-center`}>
                      {practice.title}
                    </h2>
                    <p className={`${theme.textSecondary} text-center text-sm mb-4`}>
                      {practice.description}
                    </p>

                    {!practice.locked && (
                      <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
                        <div
                          className={`${practice.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${practice.progress}%` }}
                        />
                      </div>
                    )}

                    {practice.locked && (
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
            background: linear-gradient(135deg, #a855f7, #9333ea);
            top: -100px;
            left: -100px;
            animation-delay: 0s;
          }

          .blob-2 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #ec4899, #db2777);
            top: 20%;
            right: -150px;
            animation-delay: 7s;
          }

          .blob-3 {
            width: 350px;
            height: 350px;
            background: linear-gradient(135deg, #f43f5e, #e11d48);
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
    </ThemeContext.Provider>
  );
};

export default TwoLetterHub;