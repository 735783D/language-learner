import { BookOpen, Box, Boxes, Hash, ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';


const ThreeLetterHub = ({ onSelectPractice, onBack, languageName }) => {
  const { theme } = useTheme();

  const practices = [
    {
      id: 'full',
      title: "Full Set",
      description: "All three-letter sounds",
      icon: BookOpen,
      color: "bg-pink-500",
      progress: 0,
      locked: false,
      type: "drag"
    },
    {
      id: 'full-audio',
      title: "Full Set - Audio",
      description: "Match sounds to combinations",
      icon: BookOpen,
      color: "bg-pink-600",
      progress: 0,
      locked: false,
      type: "audio"
    },
    {
      id: 'first',
      title: "SAK through FAS",
      description: "First set of combinations",
      icon: Box,
      color: "bg-rose-500",
      progress: 0,
      locked: false,
      type: "drag"
    },
    {
      id: 'first-audio',
      title: "SAK through FAS - Audio",
      description: "Match sounds",
      icon: Box,
      color: "bg-rose-600",
      progress: 0,
      locked: false,
      type: "audio"
    },
    {
      id: 'second',
      title: "CAS through HVL",
      description: "Second set of combinations",
      icon: Boxes,
      color: "bg-red-500",
      progress: 0,
      locked: false,
      type: "drag"
    },
    {
      id: 'second-audio',
      title: "CAS through HVL - Audio",
      description: "Match sounds",
      icon: Boxes,
      color: "bg-red-600",
      progress: 0,
      locked: false,
      type: "audio"
    },
    {
      id: 'third',
      title: "SPA through RAK",
      description: "Third set of combinations",
      icon: Hash,
      color: "bg-orange-500",
      progress: 0,
      locked: false,
      type: "drag"
    },
    {
      id: 'third-audio',
      title: "SPA through RAK - Audio",
      description: "Match sounds",
      icon: Hash,
      color: "bg-orange-600",
      progress: 0,
      locked: false,
      type: "audio"
    }
  ];

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
              Three-Letter Sounds
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
                  <div className={`${theme.card} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow h-full`}>
                    <div className={`${practice.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    <h2 className={`text-xl font-bold ${theme.text} mb-2 text-center`}>
                      {practice.title}
                    </h2>
                    <p className={`${theme.textSecondary} text-center mb-4`}>
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

export default ThreeLetterHub;
