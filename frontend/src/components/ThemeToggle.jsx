import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`group relative inline-flex items-center justify-center h-8 w-8 rounded-lg transition-all duration-150 border focus:outline-none ${
        isDark
          ? 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white hover:border-white/20 hover:bg-zinc-800'
          : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-45" />
      ) : (
        <Moon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-rotate-12" />
      )}
    </button>
  );
}
