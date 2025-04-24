import { create } from 'zustand';
import { ThemeConfig } from '../types';

interface ThemeStore {
  theme: ThemeConfig;
  toggleDarkMode: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const DEFAULT_FONT_SIZE = 14;
const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 24;

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: {
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    fontSize: DEFAULT_FONT_SIZE,
  },
  
  toggleDarkMode: () => set((state) => {
    const newIsDarkMode = !state.theme.isDarkMode;
    
    // Apply dark mode to document
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return { theme: { ...state.theme, isDarkMode: newIsDarkMode } };
  }),
  
  increaseFontSize: () => set((state) => ({
    theme: {
      ...state.theme,
      fontSize: Math.min(state.theme.fontSize + 2, MAX_FONT_SIZE),
    },
  })),
  
  decreaseFontSize: () => set((state) => ({
    theme: {
      ...state.theme,
      fontSize: Math.max(state.theme.fontSize - 2, MIN_FONT_SIZE),
    },
  })),
  
  resetFontSize: () => set((state) => ({
    theme: { ...state.theme, fontSize: DEFAULT_FONT_SIZE },
  })),
}));

// Initialize theme on load
(() => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  }
})();