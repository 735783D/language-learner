import React from 'react';
import { Book, Users, Hash, Music, Home, ArrowLeft } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const StoriesHub = ({ onSelectStory, onBack, languageName }) => {
  const { theme } = useTheme();

  const stories = [
    {
      id: 'greetings',
      title: "Meeting an Elder",
      description: "Learn traditional greetings",
      icon: Users,
      color: "bg-blue-500",
      culturalNote: "Greeting elders with respect",
      progress: 0,
      locked: false
    },
    {
      id: 'family',
      title: "Talking About Family",
      description: "Learn family member words",
      icon: Home,
      color: "bg-green-500",
      culturalNote: "Family is central to Mvskoke identity",
      progress: 0,
      locked: false
    },
    {
      id: 'numbers',
      title: "Counting in Mvskoke",
      description: "Learn numbers 1-5",
      icon: Hash,
      color: "bg-purple-500",
      culturalNote: "Traditional counting system",
      progress: 0,
      locked: false
    },
    {
      id: 'stomp-dance',
      title: "At the Stomp Dance",
      description: "Learn ceremonial vocabulary",
      icon: Music,
      color: "bg-pink-500",
      culturalNote: "Sacred social gathering",
      progress: 0,
      locked: false
    },
    {
      id: 'daily-life',
      title: "Daily Activities",
      description: "Common everyday phrases",
      icon: Book,
      color: "bg-amber-500",
      culturalNote: "Practical language use",
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
            Stories
          </h1>
          <p className={`text-xl ${theme.textSecondary}`}>
            Learn Mvskoke through cultural stories
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => {
            const Icon = story.icon;
            return (
              <button
                key={story.id}
                onClick={() => !story.locked && onSelectStory(story.id)}
                disabled={story.locked}
                className={`relative group ${
                  story.locked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                } transition-all duration-300`}
              >
                <div className={`${theme.card} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow`}>
                  {/* Icon */}
                  <div className={`${story.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Text */}
                  <h2 className={`text-2xl font-bold ${theme.text} mb-2 text-center`}>
                    {story.title}
                  </h2>
                  <p className={`${theme.textSecondary} text-center mb-3`}>
                    {story.description}
                  </p>
                  
                  {/* Cultural Note */}
                  <div className={`${theme.card} rounded-xl p-3 mb-4 border-l-4 ${story.color.replace('bg-', 'border-')}`}>
                    <p className={`text-sm ${theme.textSecondary} italic`}>
                      🪶 {story.culturalNote}
                    </p>
                  </div>

                  {/* Progress bar */}
                  {!story.locked && (
                    <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
                      <div
                        className={`${story.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${story.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Lock indicator */}
                  {story.locked && (
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

        {/* Info box */}
        <div className={`${theme.card} rounded-2xl p-6 mt-8 border-l-4 border-amber-500`}>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>About Story Mode</h3>
          <p className={`${theme.textSecondary}`}>
            Each story combines different exercise types to help you apply what you've learned in real cultural contexts. 
            You'll practice characters, sounds, vocabulary, and sentence building all in one lesson!
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

export default StoriesHub;