import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, UserPreferences } from '@/types';

const defaultPreferences: UserPreferences = {
  name: 'Alex Morgan',
  email: 'alex.morgan@workspace.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  favoriteCategories: ['technology', 'finance', 'science', 'entertainment'],
  layoutMode: 'grid',
  notificationsEnabled: true,
  autoRefresh: false,
};

export interface PreferencesState {
  preferences: UserPreferences;
  isPreferencesModalOpen: boolean;
}

const initialState: PreferencesState = {
  preferences: defaultPreferences,
  isPreferencesModalOpen: false,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategoryPreference: (state, action: PayloadAction<Category>) => {
      const cat = action.payload;
      if (state.preferences.favoriteCategories.includes(cat)) {
        // Prevent deselecting all categories - keep at least one
        if (state.preferences.favoriteCategories.length > 1) {
          state.preferences.favoriteCategories = state.preferences.favoriteCategories.filter(
            (c) => c !== cat
          );
        }
      } else {
        state.preferences.favoriteCategories.push(cat);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(state.preferences));
      }
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.preferences.favoriteCategories = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(state.preferences));
      }
    },
    setLayoutMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.preferences.layoutMode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(state.preferences));
      }
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.preferences.notificationsEnabled = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(state.preferences));
      }
    },
    setAutoRefresh: (state, action: PayloadAction<boolean>) => {
      state.preferences.autoRefresh = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(state.preferences));
      }
    },
    updateProfile: (
      state,
      action: PayloadAction<Partial<Pick<UserPreferences, 'name' | 'email' | 'avatar'>>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(state.preferences));
      }
    },
    resetPreferences: (state) => {
      state.preferences = defaultPreferences;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_user_preferences', JSON.stringify(defaultPreferences));
      }
    },
    initPreferences: (state, action: PayloadAction<UserPreferences>) => {
      state.preferences = action.payload;
    },
    setPreferencesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPreferencesModalOpen = action.payload;
    },
  },
});

export const {
  toggleCategoryPreference,
  setCategories,
  setLayoutMode,
  setNotificationsEnabled,
  setAutoRefresh,
  updateProfile,
  resetPreferences,
  initPreferences,
  setPreferencesModalOpen,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
