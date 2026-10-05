'use client';

import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { initFavorites } from './slices/contentSlice';
import { initPreferences } from './slices/preferencesSlice';
import { setTheme } from './slices/themeSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // 1. Initialize Theme from localStorage or system preference
    const savedTheme = localStorage.getItem('pcd_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      store.dispatch(setTheme(savedTheme));
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      store.dispatch(setTheme('dark'));
    }

    // 2. Initialize Favorites from localStorage
    const savedFavorites = localStorage.getItem('pcd_favorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          store.dispatch(initFavorites(parsed));
        }
      } catch (e) {
        console.error('Failed to parse saved favorites:', e);
      }
    }

    // 3. Initialize Preferences from localStorage
    const savedPreferences = localStorage.getItem('pcd_user_preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        if (parsed && typeof parsed === 'object') {
          store.dispatch(initPreferences(parsed));
        }
      } catch (e) {
        console.error('Failed to parse saved preferences:', e);
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
