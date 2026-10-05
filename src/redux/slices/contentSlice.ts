import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, Category, ContentType } from '@/types';
import { fetchContentData } from '@/services/api';

export interface ContentState {
  items: ContentItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
  selectedCategory: Category | 'all';
  selectedType: ContentType | 'all';
  favorites: string[];
  liveUpdates: boolean;
  lastUpdated: string;
}

const initialState: ContentState = {
  items: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
  selectedType: 'all',
  favorites: [],
  liveUpdates: false,
  lastUpdated: new Date().toISOString(),
};

// Async thunk to fetch unified content based on user's preferred categories
export const fetchDashboardContent = createAsyncThunk(
  'content/fetchDashboardContent',
  async (categories: Category[] | undefined, { rejectWithValue }) => {
    try {
      const data = await fetchContentData(categories);
      return data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch content');
    }
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category | 'all'>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<ContentType | 'all'>) => {
      state.selectedType = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('pcd_favorites', JSON.stringify(state.favorites));
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pcd_favorites');
      }
    },
    initFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    reorderItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    addLiveItem: (state, action: PayloadAction<ContentItem>) => {
      // Prepend the new live item to the beginning of the feed
      state.items = [action.payload, ...state.items];
      state.lastUpdated = new Date().toISOString();
    },
    toggleLiveUpdates: (state) => {
      state.liveUpdates = !state.liveUpdates;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardContent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDashboardContent.fulfilled, (state, action: PayloadAction<ContentItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Could not load content. Please try again.';
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedType,
  toggleFavorite,
  clearFavorites,
  initFavorites,
  reorderItems,
  addLiveItem,
  toggleLiveUpdates,
} = contentSlice.actions;

export default contentSlice.reducer;
