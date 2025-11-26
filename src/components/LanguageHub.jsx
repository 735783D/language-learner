import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const LanguageHub = ({ onSelectLanguage }) => {
  const { theme } = useTheme();

  const languages = [
    // {
    //   id: 'spanish',
    //   name: 'Spanish',
    //   nativeName: 'Español',
    //   flag: '🇪🇸',
    //   isImage: false,
    //   color: 'from-red-500 to-yellow-500'
    // },
    {
      id: 'creek',
      name: 'Creek',
      nativeName: 'Mvskoke',
      flag: `${process.env.PUBLIC_URL}/mvskoke_flag.webp`,
      isImage: true,
      color: 'from-amber-600 to-orange-800'
    }
  ];

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
      <ThemeToggle />
      
      {/* Floating blobs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="max-w-4xl w-full space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h1 className={`text-5xl font-bold ${theme.text}`}>Choose Your Language</h1>
          <p className={`text-xl ${theme.textSecondary}`}>Select a language to start learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => onSelectLanguage(language.id)}
              className={`${theme.card} rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-4 border-transparent hover:border-amber-400 group`}
            >
              <div className="space-y-6">
                {/* Conditional rendering for image vs emoji */}
                {language.isImage ? (
                  <img 
                    src={language.flag} 
                    alt={`${language.name} logo`}
                    className="w-32 h-32 mx-auto object-contain"
                  />
                ) : (
                  <div className="text-8xl">{language.flag}</div>
                )}
                
                <div className="space-y-2">
                  <h2 className={`text-4xl font-bold ${theme.text}`}>
                    {language.name}
                  </h2>
                  <p className={`text-2xl ${theme.textSecondary}`}>
                    {language.nativeName}
                  </p>
                </div>

                <div className={`h-2 rounded-full bg-gradient-to-r ${language.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className={`text-sm ${theme.textSecondary}`}>
            More languages coming soon!
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

export default LanguageHub;