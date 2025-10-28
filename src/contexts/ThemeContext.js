import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  earth: {
    name: 'Earth',
    bg: 'bg-gradient-to-br from-stone-700 via-amber-900 to-orange-900',
    card: 'bg-stone-800',
    text: 'text-amber-50',
    textSecondary: 'text-amber-200',
    accent: 'text-amber-400',
    progress: 'bg-amber-600',
    progressBg: 'bg-stone-600',
    button: 'bg-stone-700 hover:bg-stone-600 text-amber-50',
    bubble: 'from-amber-600 to-orange-700',
  },
  dark: {
    name: 'Dark',
    bg: 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900',
    card: 'bg-slate-800',
    text: 'text-slate-50',
    textSecondary: 'text-slate-300',
    accent: 'text-indigo-400',
    progress: 'bg-indigo-600',
    progressBg: 'bg-slate-700',
    button: 'bg-slate-700 hover:bg-slate-600 text-slate-50',
    bubble: 'from-indigo-600 to-purple-700',
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('earth');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  const toggleTheme = () => {
    const newTheme = currentTheme === 'earth' ? 'dark' : 'earth';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};