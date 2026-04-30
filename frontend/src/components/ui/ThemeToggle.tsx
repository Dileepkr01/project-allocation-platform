// frontend/src/components/ui/ThemeToggle.tsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

interface Props {
  variant?: 'nav' | 'dashboard';
}

export const ThemeToggle: React.FC<Props> = ({ variant = 'nav' }) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  if (variant === 'dashboard') {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-all"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-cream-200 dark:bg-white/10 border border-cream-300 dark:border-white/10 text-stone-600 dark:text-slate-300 hover:bg-cream-300 dark:hover:bg-white/20 hover:text-stone-900 dark:hover:text-white transition-all"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
