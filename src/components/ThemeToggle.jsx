import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/20 transition"
      aria-label="Toggle theme"
    >
      {currentTheme === 'earth' ? (
        <Moon className="w-6 h-6 text-amber-200" />
      ) : (
        <Sun className="w-6 h-6 text-indigo-300" />
      )}
    </button>
  );
};

export default ThemeToggle;