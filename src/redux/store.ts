import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import preferencesReducer from './slices/preferencesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    preferences: preferencesReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
