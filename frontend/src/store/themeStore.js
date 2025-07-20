import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleTheme: () =>
        set((state) => {
          const newDarkMode = !state.darkMode;
          document.documentElement.classList.toggle('dark', newDarkMode);
          return { darkMode: newDarkMode };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
