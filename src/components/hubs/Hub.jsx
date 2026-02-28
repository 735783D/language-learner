import React from 'react';
import { BookOpen, MessageCircle, Brain, Target, ArrowLeft, Book, Activity, Layers, BarChart2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';
import ThemeToggle from '../ThemeToggle';

// How many total exercises exist per lesson section (learn + practice counts)
// Used to calculate the progress bar percentage shown on each card
const LESSON_EXERCISE_COUNTS = {
  1: 0,   // Basics - complex sub-hubs, skip for now
  2: 16,  // Words: 8 categories × 2 (learn + practice)
  3: 0,   // Sentences - single lesson
  4: 6,   // Verbs: 3 types × 2
  5: 0,   // Grammar
  6: 0,   // Stories
};

// Which lesson IDs belong to each Hub lesson number
const LESSON_PRACTICE_PREFIXES = {
  2: ['colors', 'family', 'food', 'body', 'nature', 'home', 'people',
      'animals-birds', 'animals-farmAnimals', 'animals-wildAnimals',
      'animals-aquatic', 'animals-insects', 'animals-reptiles'],
  4: ['infinitives', 'present', 'future'],
};

const Hub = ({ onSelectLesson, onSelectProgress, languageName = "Spanish", languageData, onBack }) => {
  const { theme } = useTheme();
  const { isCompleted } = useProgress();

  // Calculate live progress % for a lesson
  const getLessonProgress = (lessonId) => {
    const prefixes = LESSON_PRACTICE_PREFIXES[lessonId];
    if (!prefixes) return 0;
    let done = 0;
    let total = 0;
    prefixes.forEach(prefix => {
      if (isCompleted(`${prefix}-learn`)) done++;
      if (isCompleted(`${prefix}-practice`)) done++;
      total += 2;
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const lessons = [
    {
      id: 1,
      title: "Basics",
      description: "Characters & Sounds",
      icon: BookOpen,
      color: "bg-amber-500",
      locked: false
    },
    {
      id: 2,
      title: "Words",
      description: "Essential Vocabulary",
      icon: MessageCircle,
      color: "bg-emerald-500",
      locked: false
    },
    {
      id: 3,
      title: "Sentences",
      description: "Basic Phrases",
      icon: Brain,
      color: "bg-teal-500",
      locked: false
    },
    {
      id: 4,
      title: "Verbs",
      description: "Actions & Conjugation",
      icon: Activity,
      color: "bg-blue-500",
      locked: false
    },
    {
      id: 5,
      title: "Grammar",
      description: "Rules & Structure",
      icon: Layers,
      color: "bg-indigo-500",
      locked: false
    },
    {
      id: 6,
      title: "Stories",
      description: "Cultural Contexts",
      icon: Book,
      color: "bg-purple-500",
      locked: false
    }
  ];

  return (
    <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
      <ThemeToggle />

      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Languages</span>
        </button>
      )}

      {/* Progress button */}
      {onSelectProgress && (
        <button
          onClick={onSelectProgress}
          className={`fixed top-4 right-16 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
        >
          <BarChart2 className="w-5 h-5" />
          <span>Progress</span>
        </button>
      )}

      {/* Floating blobs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>
            {languageName}
          </h1>
          <p className={`text-xl ${theme.textSecondary}`}>Choose a lesson to begin</p>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => {
            const Icon = lesson.icon;
            const progressPct = getLessonProgress(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => !lesson.locked && onSelectLesson(lesson.id)}
                disabled={lesson.locked}
                className={`relative group ${
                  lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                } transition-all duration-300`}
              >
                <div className={`${theme.card} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow`}>
                  {/* Icon */}
                  <div className={`${lesson.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Text */}
                  <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
                    {lesson.title}
                  </h2>
                  <p className={`${theme.textSecondary} mb-4`}>
                    {lesson.description}
                  </p>

                  {/* Progress bar */}
                  {!lesson.locked && (
                    <div className={`w-full ${theme.progressBg || 'bg-gray-200 dark:bg-gray-700'} rounded-full h-2`}>
                      <div
                        className={`${lesson.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${progressPct}%` }}
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
      </div>

      {/* Blob animations */}
      <style>{`
        .blob { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.3; animation: float 20s ease-in-out infinite; }
        .blob-1 { width: 300px; height: 300px; background: linear-gradient(135deg, #d97706, #f59e0b); top: -100px; left: -100px; animation-delay: 0s; }
        .blob-2 { width: 400px; height: 400px; background: linear-gradient(135deg, #059669, #10b981); top: 20%; right: -150px; animation-delay: 5s; }
        .blob-3 { width: 350px; height: 350px; background: linear-gradient(135deg, #0d9488, #14b8a6); bottom: -100px; left: 20%; animation-delay: 10s; }
        .blob-4 { width: 250px; height: 250px; background: linear-gradient(135deg, #ea580c, #f97316); bottom: 30%; right: 10%; animation-delay: 15s; }
        @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(30px, -30px) scale(1.1); } 50% { transform: translate(-20px, 20px) scale(0.9); } 75% { transform: translate(20px, 30px) scale(1.05); } }
      `}</style>
    </div>
  );
};

export default Hub;




// import React from 'react';
// import { BookOpen, MessageCircle, Brain, Target, ArrowLeft, Book, Activity, Layers } from 'lucide-react';
// import { useTheme } from '../../contexts/ThemeContext';
// import ThemeToggle from '../ThemeToggle';

// const Hub = ({ onSelectLesson, languageName = "Spanish", languageData, onBack }) => {
//   const { theme } = useTheme();

//   const lessons = [
//     {
//       id: 1,
//       title: "Basics",
//       description: "Characters & Sounds",
//       icon: BookOpen,
//       color: "bg-amber-500",
//       textColor: "text-amber-900",
//       progress: 0,
//       locked: false
//     },
//     {
//       id: 2,
//       title: "Words",
//       description: "Essential Vocabulary",
//       icon: MessageCircle,
//       color: "bg-emerald-500",
//       textColor: "text-emerald-900",
//       progress: 0,
//       locked: false
//     },
//     {
//       id: 3,
//       title: "Sentences",
//       description: "Basic Phrases",
//       icon: Brain,
//       color: "bg-teal-500",
//       textColor: "text-teal-900",
//       progress: 0,
//       locked: false
//     },
//     // {
//     //   id: 4,
//     //   title: "Writing",
//     //   description: "Practice Writing",
//     //   icon: Target,
//     //   color: "bg-orange-500",
//     //   textColor: "text-orange-900",
//     //   progress: 0,
//     //   locked: false
//     // },
//     {
//       id: 4,
//       title: "Verbs",
//       description: "Actions & Conjugation",
//       icon: Activity, // Import: import { Activity } from 'lucide-react';
//       color: "bg-blue-500",
//       progress: 0,
//       locked: false
//     },
//     {
//       id: 5,
//       title: "Grammar",
//       description: "Rules & Structure",
//       icon: Layers,
//       color: "bg-indigo-500",
//       progress: 0,
//       locked: false
//     },
//     {
//       id: 6,
//       title: "Stories",
//       description: "Cultural Contexts",
//       icon: Book,
//       color: "bg-indigo-500"
//     }
//   ];

//   return (
//     <div className={`min-h-screen ${theme.bg} relative overflow-hidden`}>
//       <ThemeToggle />

//       {/* Back button */}
//       {onBack && (
//         <button
//           onClick={onBack}
//           className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${theme.button} flex items-center gap-2`}
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Languages</span>
//         </button>
//       )}

//       {/* Floating blobs background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="blob blob-1"></div>
//         <div className="blob blob-2"></div>
//         <div className="blob blob-3"></div>
//         <div className="blob blob-4"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className={`text-5xl font-bold ${theme.text} mb-3`}>
//             {languageName}
//           </h1>
//           <p className={`text-xl ${theme.textSecondary}`}>Choose a lesson to begin</p>
//         </div>

//         {/* Lesson Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {lessons.map((lesson) => {
//             const Icon = lesson.icon;
//             return (
//               <button
//                 key={lesson.id}
//                 onClick={() => !lesson.locked && onSelectLesson(lesson.id)}
//                 disabled={lesson.locked}
//                 className={`relative group ${
//                   lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
//                 } transition-all duration-300`}
//               >
//                 <div className={`${theme.card} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow`}>
//                   {/* Icon */}
//                   <div className={`${lesson.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                     <Icon className="w-10 h-10 text-white" />
//                   </div>

//                   {/* Text */}
//                   <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
//                     {lesson.title}
//                   </h2>
//                   <p className={`${theme.textSecondary} mb-4`}>
//                     {lesson.description}
//                   </p>

//                   {/* Progress bar */}
//                   {!lesson.locked && (
//                     <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
//                       <div
//                         className={`${lesson.color} h-2 rounded-full transition-all duration-500`}
//                         style={{ width: `${lesson.progress}%` }}
//                       />
//                     </div>
//                   )}

//                   {/* Lock indicator */}
//                   {lesson.locked && (
//                     <div className={`absolute top-4 right-4 ${theme.card} rounded-full p-2`}>
//                       <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Blob animations */}
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
//           background: linear-gradient(135deg, #d97706, #f59e0b);
//           top: -100px;
//           left: -100px;
//           animation-delay: 0s;
//         }

//         .blob-2 {
//           width: 400px;
//           height: 400px;
//           background: linear-gradient(135deg, #059669, #10b981);
//           top: 20%;
//           right: -150px;
//           animation-delay: 5s;
//         }

//         .blob-3 {
//           width: 350px;
//           height: 350px;
//           background: linear-gradient(135deg, #0d9488, #14b8a6);
//           bottom: -100px;
//           left: 20%;
//           animation-delay: 10s;
//         }

//         .blob-4 {
//           width: 250px;
//           height: 250px;
//           background: linear-gradient(135deg, #ea580c, #f97316);
//           bottom: 30%;
//           right: 10%;
//           animation-delay: 15s;
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//           }
//           25% {
//             transform: translate(30px, -30px) scale(1.1);
//           }
//           50% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           75% {
//             transform: translate(20px, 30px) scale(1.05);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hub;