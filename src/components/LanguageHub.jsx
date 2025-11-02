import React, { createContext, useContext, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

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

const LanguageHub = ({ onSelectLanguage }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  const theme = {
    bg: isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
    card: isDark ? 'bg-gray-800' : 'bg-white'
  };

  const languages = [
    {
      id: 'spanish',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      color: 'from-red-500 to-yellow-500'
    },
    {
      id: 'creek',
      name: 'Creek',
      nativeName: 'Mvskoke',
      flag: '🪶',
      color: 'from-amber-600 to-orange-800'
    }
  ];

  return (
    <ThemeContext.Provider value={{ isDark: isDark, toggleTheme: toggleTheme }}>
      <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center p-8`}>
        <ThemeToggle />
        
        <div className="max-w-4xl w-full space-y-12">
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
                  <div className="text-8xl">{language.flag}</div>
                  
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
      </div>
    </ThemeContext.Provider>
  );
};

export default LanguageHub;