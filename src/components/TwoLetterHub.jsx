import React, { useState } from 'react';
import { BookOpen, Book, FileText, Layers, ArrowLeft, ChevronDown, ChevronRight, Volume2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const TwoLetterHub = ({ onSelectPractice, onBack, languageName }) => {
  const { theme } = useTheme();
  const [expandedCard, setExpandedCard] = useState(null);
  
  const practiceSets = [
    {
      id: 'full',
      title: "Full Set",
      description: "All two-letter sounds",
      icon: BookOpen,
      color: "bg-blue-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: BookOpen },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'cafv',
      title: "CA through FV",
      description: "C and F combinations",
      icon: Book,
      color: "bg-cyan-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: Book },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'halv',
      title: "HA through LV",
      description: "H, K, L combinations",
      icon: FileText,
      color: "bg-teal-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: FileText },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'mapv',
      title: "MA through PV",
      description: "M, N, P combinations",
      icon: Layers,
      color: "bg-purple-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: Layers },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'ratv',
      title: "RA through TV",
      description: "R, S, T combinations",
      icon: BookOpen,
      color: "bg-pink-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: BookOpen },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'wayv',
      title: "WA through YV",
      description: "W and Y combinations",
      icon: Book,
      color: "bg-indigo-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: Book },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'afet',
      title: "AF through ET",
      description: "A and E + consonants",
      icon: FileText,
      color: "bg-violet-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: FileText },
        { type: 'audio', label: 'Audio Matching', icon: Volume2 }
      ]
    },
    {
      id: 'ifvt',
      title: "IF through VT",
      description: "I, O, U, V + consonants",
      icon: Layers,
      color: "bg-fuchsia-500",
      exercises: [
        { type: 'drag', label: 'Drag to Learn', icon: Layers },
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
            Two-Letter Sounds
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

export default TwoLetterHub;



// import { BookOpen, Layers, List, FileCheck, FileText, Files, ArrowLeft } from 'lucide-react';
// import ThemeToggle from './ThemeToggle';
// import { useTheme } from '../contexts/ThemeContext';

// const TwoLetterHub = ({ onSelectPractice, onBack, languageName }) => {
//   const { theme } = useTheme();

//   const practices = [
//     {
//       id: 'full',
//       title: "Full Set",
//       description: "All 156 two-letter sounds",
//       icon: BookOpen,
//       color: "bg-purple-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'full-audio',
//       title: "Full Set - Audio",
//       description: "Match sounds to combinations",
//       icon: BookOpen,
//       color: "bg-purple-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'cafv',
//       title: "CA through FV",
//       description: "C and F combinations",
//       icon: Layers,
//       color: "bg-violet-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'cafv-audio',
//       title: "CA through FV - Audio",
//       description: "Match sounds",
//       icon: Layers,
//       color: "bg-violet-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'halv',
//       title: "HA through LV",
//       description: "H, K, L combinations",
//       icon: Layers,
//       color: "bg-fuchsia-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'halv-audio',
//       title: "HA through LV - Audio",
//       description: "Match sounds",
//       icon: Layers,
//       color: "bg-fuchsia-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'mapv',
//       title: "MA through PV",
//       description: "M, N, P combinations",
//       icon: List,
//       color: "bg-pink-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'mapv-audio',
//       title: "MA through PV - Audio",
//       description: "Match sounds",
//       icon: List,
//       color: "bg-pink-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'ratv',
//       title: "RA through TV",
//       description: "R, S, T combinations",
//       icon: FileCheck,
//       color: "bg-rose-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'ratv-audio',
//       title: "RA through TV - Audio",
//       description: "Match sounds",
//       icon: FileCheck,
//       color: "bg-rose-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'wayv',
//       title: "WA through YV",
//       description: "W and Y combinations",
//       icon: FileText,
//       color: "bg-red-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'wayv-audio',
//       title: "WA through YV - Audio",
//       description: "Match sounds",
//       icon: FileText,
//       color: "bg-red-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'afet',
//       title: "AF through ET",
//       description: "A and E + consonants",
//       icon: Files,
//       color: "bg-orange-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'afet-audio',
//       title: "AF through ET - Audio",
//       description: "Match sounds",
//       icon: Files,
//       color: "bg-orange-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     },
//     {
//       id: 'ifvt',
//       title: "IF through VT",
//       description: "I, O, U, V + consonants",
//       icon: BookOpen,
//       color: "bg-amber-500",
//       progress: 0,
//       locked: false,
//       type: "drag"
//     },
//     {
//       id: 'ifvt-audio',
//       title: "IF through VT - Audio",
//       description: "Match sounds",
//       icon: BookOpen,
//       color: "bg-amber-600",
//       progress: 0,
//       locked: false,
//       type: "audio"
//     }
//   ];

//   return (
//       <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
//         <ThemeToggle />

//         <button
//           onClick={onBack}
//           className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back</span>
//         </button>

//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="blob blob-1"></div>
//           <div className="blob blob-2"></div>
//           <div className="blob blob-3"></div>
//         </div>

//         <div className="relative z-10 max-w-6xl mx-auto px-8 py-12">
//           <div className="text-center mb-16">
//             <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>
//               Two-Letter Sounds
//             </h1>
//             <p className={`text-xl ${theme.textSecondary}`}>Choose a practice session</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {practices.map((practice) => {
//               const Icon = practice.icon;
//               return (
//                 <button
//                   key={practice.id}
//                   onClick={() => !practice.locked && onSelectPractice(practice.id)}
//                   disabled={practice.locked}
//                   className={`relative group ${
//                     practice.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
//                   } transition-all duration-300`}
//                 >
//                   <div className={`${theme.card} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow h-full`}>
//                     <div className={`${practice.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>

//                     <h2 className={`text-xl font-bold ${theme.text} mb-2 text-center`}>
//                       {practice.title}
//                     </h2>
//                     <p className={`${theme.textSecondary} text-center text-sm mb-4`}>
//                       {practice.description}
//                     </p>

//                     {!practice.locked && (
//                       <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
//                         <div
//                           className={`${practice.color} h-2 rounded-full transition-all duration-500`}
//                           style={{ width: `${practice.progress}%` }}
//                         />
//                       </div>
//                     )}

//                     {practice.locked && (
//                       <div className={`absolute top-4 right-4 ${theme.card} rounded-full p-2`}>
//                         <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//       <style>{`
//         .blob {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(40px);
//           opacity: 0.3;
//           animation: float 20s ease-in-out infinite;
//         }

//         .blob-1 {
//           width: 300px;
//           height: 300px;
//           background: linear-gradient(135deg, #3b82f6, #2563eb);
//           top: -100px;
//           left: -100px;
//           animation-delay: 0s;
//         }

//         .blob-2 {
//           width: 400px;
//           height: 400px;
//           background: linear-gradient(135deg, #06b6d4, #0891b2);
//           top: 20%;
//           right: -150px;
//           animation-delay: 7s;
//         }

//         .blob-3 {
//           width: 350px;
//           height: 350px;
//           background: linear-gradient(135deg, #14b8a6, #0d9488);
//           bottom: -100px;
//           left: 20%;
//           animation-delay: 14s;
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//           }
//           33% {
//             transform: translate(30px, -30px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TwoLetterHub;